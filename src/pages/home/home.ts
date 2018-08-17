import { SurahPage } from "./../surah/surah";
import { QuotesPage } from "./../quotes/quotes";
import { GoodquotesProvider } from "./../../providers/goodquotes/goodquotes";
import { HijriProvider } from "./../../providers/hijri/hijri";
import { AthanProvider } from "./../../providers/athan/athan";
import { AddLocationPage } from "./../add-location/add-location";
import { WeatherProvider } from "./../../providers/weather/weather";
import { Component, ViewChild } from "@angular/core";
import {
  NavController,
  Platform,
  ModalController,
  NavParams,
  Slides,
  MenuController,
  AlertController,
  ToastController
} from "ionic-angular";
import { LocalNotifications } from "@ionic-native/local-notifications";
import { Storage } from "@ionic/storage";
import { ConfigPage } from "../config/config";
import * as tz from "tz-lookup";
import * as mtz from "moment-timezone";
import langs from "./../../internationalization/langs";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  width = 360;

  location;

  @ViewChild("slider")
  slider: Slides;
  @ViewChild("wIcon")
  wIcon;

  slideIndex = 0;
  iconStyle = {
    // margin: "auto",
    // top: 10,
    // right: 0,
    left: 0,
    bottom: 0
  };

  month_abbrs = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  days_abbr = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  prayers = { fajr: 0, sunrise: 1, dhuhr: 2, asr: 3, maghrib: 4, isha: 5 };

  today: any;
  hijriDay: any;
  currentTemp: any;

  settings = {
    calculation_method: "MuslimWorldLeague",
    daylight: false,
    madhab: "Shafi",
    unit: "Metric",
    adjust: -1,
    lang: "en",
    athan: "",
    prayers: [],
    before: 0
  };

  days = [];

  loading = false;

  lang = {};

  dir = "ltr";

  quotes = [];
  quote: any;
  quotesObserver: any;

  now = new Date();

  imgQuote: any;

  position: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public weather: WeatherProvider,
    public athan: AthanProvider,
    public quotesProvider: GoodquotesProvider,
    platform: Platform,
    public mdlCtrl: ModalController,
    public storage: Storage,
    public menuCtrl: MenuController,
    public hijri: HijriProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public localNotifications: LocalNotifications
  ) {
    this.width = platform.width();
    this.loadLang("en");

    // this.quotesObserver.next(null);
  }

  ionViewDidLoad() {
    console.log("ION VIEW DID LOAD");
    this.refreshData();
    // this.updateCities();

    // setInterval(() => {
    //   this.now = new Date();
    // }, 1000);

    // this.animate();
  }

  ionViewDidEnter() {
    this.getPosition();
  }

  addLocation() {
    var mdl = this.mdlCtrl.create(AddLocationPage, {
      lang: this.settings["lang"]
    });
    mdl.present();
    mdl.onDidDismiss(data => {
      if (data) {
        this.loading = true;
        this.weather
          .getData(data.name, this.settings["unit"], this.settings["lang"])
          .subscribe(
            ret => {
              this.weather
                .getCurrentWeather(
                  ret["city"].id,
                  this.settings.unit,
                  this.settings.lang
                )
                .subscribe(cur => {
                  this.loading = false;
                  let now = new Date();
                  now.setMinutes(0);
                  now.setSeconds(0);
                  now.setHours(Math.floor(now.getHours() / 3) * 3);
                  cur["dt"] = Math.floor(now.getTime() / 1000);
                  cur["dt_txt"] = this.dateToYMD(now);
                  if (ret["city"] && ret["city"].id) {
                    this.storage.set("myCity", ret["city"]["id"]);
                    this.fixTime(ret["city"]["coord"], ret["list"], list => {
                      let t = list[0]["dt"] * 1000;
                      if (now.getTime() < t) list.unshift(cur);
                      ret["list"] = list;
                      this.loadData(ret);
                    });
                  }
                });
            },
            error => {
              this.loading = false;
              this.presentAlert(
                this.lang["alerts"].unknown_city.title,
                this.lang["alerts"].unknown_city.text
              );
            }
          );
      }
    });
  }
  refreshData() {
    this.updateSetting(set => {
      this.settings = set;
      this.loadLang(set.lang);
      this.storage
        .get("myCity")
        .then(myCity => {
          if (myCity) {
            this.getLocationData(myCity);
          } else {
            this.addLocation();
          }
        })
        .catch(err => {
          this.location = null;
          this.addLocation();
        });
    });

    this.getQuotes();
    this.getPosition();
  }

  updateSetting(cb) {
    this.storage
      .get("settings")
      .then(set => {
        if (set) cb(set);
        else
          cb({
            calculation_method: "MuslimWorldLeague",
            daylight: false,
            madhab: "Shafi",
            unit: "Metric",
            adjust: -1,
            lang: "en",
            athan: "mekkah.wav",
            prayers: ["fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha"],
            before: 0
          });
      })
      .catch(err => {
        cb({
          calculation_method: "MuslimWorldLeague",
          daylight: false,
          madhab: "Shafi",
          unit: "Metric",
          adjust: -1,
          lang: "en",
          athan: "mekkah.wav",
          prayers: ["fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha"],
          before: 0
        });
      });
  }

  getLocationData(city) {
    this.loading = true;
    this.weather
      .getData(city, this.settings["unit"], this.settings["lang"])
      .subscribe(
        ret => {
          this.weather
            .getCurrentWeather(
              ret["city"].id,
              this.settings.unit,
              this.settings.lang
            )
            .subscribe(cur => {
              this.loading = false;

              let now = new Date();
              now.setMinutes(0);
              now.setSeconds(0);
              now.setHours(Math.floor(now.getHours() / 3) * 3);
              cur["dt"] = Math.floor(now.getTime() / 1000);
              cur["dt_txt"] = this.dateToYMD(now);
              if (ret["city"] && ret["city"].id) {
                this.fixTime(ret["city"]["coord"], ret["list"], list => {
                  let t = list[0]["dt"] * 1000;
                  if (now.getTime() < t) list.unshift(cur);
                  ret["list"] = list;
                  this.loadData(ret);
                });
              }
            });
        },
        error => {
          this.loading = false;
          this.showToast(this.lang["toast"].non_connection);
          this.storage
            .get(city)
            .then(city => {
              if (city) this.loadData(city);
              else {
                this.presentAlert(
                  this.lang["alerts"].data_unavailable.title,
                  this.lang["alerts"].data_unavailable.text
                );
              }
            })
            .catch(err => {
              console.log("ERROR", err);
              // this.location = null;
            });
        }
      );
  }

  goToConfig() {
    this.navCtrl.push(ConfigPage);
  }

  loadData(data) {
    if (data) {
      data["list"] = this.athan.calculatePrayersTime(data, this.settings);

      this.location = data;
      this.storage.set(data["city"].id, data);
      this.days = this.getDays(data.list);

      let today = this.getToDay(data.list, new Date());
      this.getCurrentTemp(data.city.id, today["hours"]);

      this.scheduleAllNotif(
        data["list"],
        this.settings.athan,
        this.settings.prayers,
        this.settings.before,
        this.settings.lang,
        this.settings["quran"]
      );

      // this.quotesProvider.getRandomQuotes(this.settings.lang).subscribe(
      //   data => {
      //     this.storage.set("quotes", data["quotes"]);
      //     this.quotes = data && data["quotes"] ? data["quotes"] : [];
      //     this.loadRandomQuote();
      //   },
      //   () => {
      //     this.storage.get("quotes").then(quotes => {
      //       this.quotes = quotes && quotes.length > 0 ? quotes : [];
      //       this.loadRandomQuote();
      //     });
      //   }
      // );
    } else {
      console.log("NON DATA");
    }
  }

  updateLocations() {
    this.storage.forEach((val, key) => {
      this.weather
        .getData(key, this.settings["unit"], this.settings["lang"])
        .subscribe(ret => {
          if (ret["city"] && ret["city"].id) {
            this.storage.set(ret["city"].id, ret);
          }
        });
    });
  }

  max = -27300;
  min = 27300;

  getToDay(list, time) {
    let date = this.dateToYMD(time);
    let today = {};
    today["date"] = time;
    today["hijri"] = this.hijri.calculateHijriDate(
      time,
      this.settings["adjust"]
    );

    today["hours"] = [];

    let now = new Date();
    Object.keys(list).forEach((i, index, arr) => {
      let dt_txt = list[i].dt_txt.split(" ")[0];
      if (dt_txt == date) {
        today["hours"].push(list[i]);
        if (date == this.dateToYMD(now)) {
          const t_max = list[i].main.temp_max;
          const t_min = list[i].main.temp_min;
          if (t_max > this.max) this.max = t_max;
          if (t_min < this.min) this.min = t_min;
        }
      }
    });

    this.today = today;

    return today;
  }

  getDays(list) {
    let days = [];
    let test = [];
    let nowTime = new Date().getTime();
    Object.keys(list).forEach((i, index, arr) => {
      let d = list[i].dt;
      const time = new Date(d * 1000).getTime();
      let day = new Date(d * 1000).getDate();
      if (time >= nowTime && test.indexOf(day) <= -1) {
        test.push(day);
        days.push(d);
      }
    });
    return days;
  }

  getCurrentTemp(city, hours) {
    this.weather
      .getCurrentWeather(city, this.settings["unit"], this.settings["lang"])
      .subscribe(
        cur => {
          cur["updated"] = new Date();
          this.currentTemp = cur;
        },
        error => {
          // this.showToast(this.lang["toast"].not_connected);
          let now = new Date();
          let hour = now.getHours() * 60 + now.getMinutes();
          for (let i = 0; i < hours.length; i++) {
            const item = hours[i];
            let d = new Date(item.dt * 1000);
            let min = d.getHours() * 60;
            let max = (d.getHours() + 2) * 60;

            if (hour >= min && hour < max) {
              if (!item["date"]) item["date"] = d;
              this.currentTemp = item;
              break;
            }
          }
        }
      );
  }

  dateToYMD(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    return "" + y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d);
  }

  floor(number) {
    return Math.floor(number);
  }

  onSlideChanged() {
    this.slideIndex = this.slider.getActiveIndex();
    const d = new Date(this.days[this.slideIndex] * 1000);

    if (this.slideIndex >= 0 && this.slideIndex < this.days.length)
      this.getToDay(this.location.list, d);
  }

  animate() {
    console.log("ANIMATE");

    let angle = 0;
    let l = 360;
    setInterval(() => {
      angle += 0.01;
      this.iconStyle.bottom = l * Math.sin(angle);
      this.iconStyle.left = 360 + l * Math.cos(angle);
    }, 100);
  }

  openSideMenu() {
    this.menuCtrl.toggle();
  }

  fixTime(coord, list, cb) {
    let timeZone = tz(coord.lat, coord.lon);
    const now = new Date();
    for (let i = 0; i < list.length; i++) {
      list[i].dt -= 3600;
      var a = mtz(list[i].dt * 1000).tz(timeZone);
      list[i].dt = a._i / 1000;
      list[i]["updated"] = now;
    }
    cb(list);
  }

  presentAlert(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [this.lang["alerts"].ok]
    });
    alert.present();
    setTimeout(() => alert.dismiss(), 3000);
  }

  showToast(message, position = "top") {
    let toast = this.toastCtrl.create({
      message,
      position,
      duration: 2000
    });
    toast.present();
  }

  loadLang(l) {
    this.lang = langs[l].home;

    if (l == "ar") this.dir = "rtl";
    else this.dir = "ltr";
  }

  loadRandomQuote() {
    let timeOut = 1000;
    if (this.quotes && this.quotes.length > 0) {
      let q = this.quotes[Math.floor(Math.random() * this.quotes.length)];
      timeOut = q && q.quote ? q.quote.length * 300 : 3000;
      if (q && timeOut < 180000) {
        this.quote = q;
      }
      if (timeOut >= 180000) {
        timeOut = 2000;
      }
    }
    setTimeout(() => {
      this.loadRandomQuote();
    }, timeOut);
  }

  scheduleAllNotif(list, athan, notifs, before, lang, quran) {
    let now = new Date();
    let nowTime = now.getTime();
    this.localNotifications.cancelAll().then(ok => {
      let id = 0;
      list.forEach(item => {
        if (item && item.prayers) {
          item.prayers.forEach(prayer => {
            id++;
            let date = prayer.dt;
            let time = date.getTime();

            let prayerName = lang == "ar" ? prayer.name_ar : prayer.name;

            if (time > nowTime && notifs && notifs.indexOf(prayer.name) > -1) {
              let txt = `${prayerName} -- ${date.getHours()}:${date.getMinutes()} -- ${Math.floor(
                item.main.temp
              )}° -- ${item.weather[0].description}`;

              this.localNotifications.schedule({
                id: id,
                title: `${prayerName} -- ${date.getHours()}:${date.getMinutes()}`,
                text: txt,
                sound:
                  "file://assets/audio/" +
                  (prayer.name == "fajr" ? "fajr_" : "") +
                  athan,
                trigger: {
                  at: new Date(date.getTime() - before * 60000)
                },
                // attachments: ["file://assets/imgs/inna-s-salata.jpg"],
                vibrate: true
              });

              if (
                quran &&
                quran["prayers"] &&
                quran["prayers"].indexOf(prayer.name) > -1
              ) {
                this.localNotifications.schedule({
                  id: id + 1000,
                  title: `The Holy Quran Reminder`,
                  text: `${prayerName} in ${before + 15} minutes`,
                  trigger: {
                    at: new Date(date.getTime() - (before + 15) * 60000)
                  },
                  vibrate: true
                });
              }
            }
          });
        }
      });
    });
  }

  accessQuotes() {
    this.navCtrl.push(QuotesPage);
  }

  getQuotes() {
    this.quotesProvider.getLastQuote().subscribe(data => {
      this.imgQuote = data["data"][0];
      console.log("IMG QUOTE", this.imgQuote);
    });
  }

  accessQuran() {
    let id = 1;
    if (this.position && this.position.surah) id = this.position.surah.number;
    let currentAyah = 1;
    if (this.position && this.position.ayah)
      currentAyah = this.position.ayah.numberInSurah;
    this.navCtrl.push(SurahPage, { id, currentAyah });
  }

  getPosition() {
    this.storage.get("position").then(position => {
      this.position = position ? position : null;
    });
  }
}
