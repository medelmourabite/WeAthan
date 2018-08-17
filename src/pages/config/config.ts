import { HomePage } from "./../home/home";
import { Storage } from "@ionic/storage";
import { Component } from "@angular/core";
import { NavController, NavParams, ToastController } from "ionic-angular";
import langs from "./../../internationalization/langs";
import { NativeAudio } from "../../../node_modules/@ionic-native/native-audio";

@Component({
  selector: "page-config",
  templateUrl: "config.html"
})
export class ConfigPage {
  languages = [{ key: "ar", name: "العربية" }, { key: "en", name: "English" }];

  methods = {
    MuslimWorldLeague: "Muslim World League.",
    Egyptian: "Egyptian General Authority of Survey.",
    Karachi: "University of Islamic Sciences, Karachi.",
    UmmAlQura: "Umm al-Qura University, Makkah.",
    Gulf: "Modified version of Umm al-Qura used in UAE.",
    Qatar: "Modified version of Umm al-Qura used in Qatar.",
    Kuwait: "Method used by the country of Kuwait.",
    MoonsightingCommittee: "Moonsighting Committee.",
    NorthAmerica: "Referred to as the ISNA method."
  };

  madhabs = [
    {
      key: "Shafi",
      name: "Shafi : Earlier Asr time"
    },
    {
      key: "Hanafi",
      name: "Hanafi : Later Asr time"
    }
  ];

  units = [
    {
      key: "Metric",
      name: "Celsius, m/s"
    },
    {
      key: "Imperial",
      name: "Fahrenheit, mph"
    }
  ];

  athans = [];

  settings = {
    calculation_method: "MuslimWorldLeague",
    daylight: false,
    madhab: "Shafi",
    unit: "Metric",
    adjust: -1,
    lang: "en",
    athan: "mekkah.wav",
    prayers: ["fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha"],
    before: 0
  };

  options = [];
  lang = {};

  prayers = [];

  dir = "ltr";

  playing = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public strg: Storage,
    public toastCtrl: ToastController,
    public nativeAudio: NativeAudio
  ) {
    // this.loadLang("en");
  }

  ionViewDidLoad() {
    this.strg.get("settings").then(settings => {
      if (settings) {
        this.settings = settings;
      }
      if (this.settings.lang == "ar") this.dir = "rtl";
      this.loadLang(this.settings.lang);
    });
  }
  submitChanges() {
    this.strg.set("settings", this.settings);
    this.stop(this.playing);
    this.navCtrl.push(HomePage);

    // this.ShowToast(this.lang["toast"].updated);
  }

  ShowToast(message, position = "top") {
    let toast = this.toastCtrl.create({
      message,
      position,
      duration: 2000
    });
    toast.present();
  }

  loadLang(l) {
    this.lang = langs[l].config;

    this.madhabs = this.lang["madhabs"];
    this.methods = this.lang["methods"];
    this.options = [];
    this.prayers = this.lang["prayers"];
    this.athans = this.lang["athans"];

    Object.keys(this.methods).forEach(key => {
      let method = {
        name: this.methods[key],
        key
      };
      this.options.push(method);
    });
  }

  playAthan(athan) {
    this.stop(this.playing);
    this.playing = athan;
    console.log("PLAY", this.playing);
    this.nativeAudio
      .preloadComplex(this.playing, "assets/audio/" + this.playing, 1, 1, 0)
      .then(() => {
        this.nativeAudio.play(this.playing);
      })
      .catch(() => {});
  }
  stop(athan = "") {
    console.log("STOP", athan);
    this.nativeAudio.stop(athan);
  }
}
