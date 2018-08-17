import { SurahListPage } from "./../surah-list/surah-list";
import { ProgramPage } from "./../program/program";
import { QuranConfigPage } from "./../quran-config/quran-config";
import { Storage } from "@ionic/storage";
import { QuranProvider } from "./../../providers/quran/quran";
import { Component, ViewChild } from "@angular/core";
import langs from "./../../internationalization/langs";
import {
  NavController,
  NavParams,
  Slides,
  PopoverController,
  ModalController
} from "ionic-angular";
import { Media, MediaObject } from "@ionic-native/media";

@Component({
  selector: "page-surah",
  templateUrl: "surah.html"
})
export class SurahPage {
  @ViewChild("slider")
  slider: Slides;
  slideIndex = 0;
  id = 1;
  currentAyah = 1;
  surah;
  tafsir;
  trans;
  aya;

  setting = {};

  background = "";
  fontSize = "";
  fontColor = "";

  config = {};

  looping = 1;
  playing = "";

  options;
  lang = {};

  language = "en";
  dir = "ltr";

  ayaAudio: MediaObject;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public quran: QuranProvider,
    public storage: Storage,
    public popoverCtrl: PopoverController,
    public mdlCtrl: ModalController,
    public media: Media
  ) {
    this.id = navParams.data.id;
    this.currentAyah = navParams.data.currentAyah;
  }

  ionViewDidLoad() {
    this.updateSetting(set => {
      this.setting = set;
      if (this.setting && this.setting["quran"]) {
        this.id =
          !this.id && this.setting["currentSurah"]
            ? this.setting["currentSurah"]
            : 1;
        const currentAya = this.currentAyah ? this.currentAyah : 1;
        this.config = this.setting["quran"]["config"];
        this.loadSurah(this.id, currentAya);
        this.language = this.setting["lang"];
        this.loadLang(this.language);
      } else {
        this.presentProgram(null);
        this.loadLang(this.language);
      }
    });
  }

  loadSurah(id, currentAya = 0) {
    this.id = id;
    this.storage.get(id + "_" + this.setting["quran"].audio).then(result => {
      if (result) {
        this.surah = result;
        this.aya = this.surah["ayahs"][currentAya];
        this.start();
        setTimeout(() => {
          if (this.slider) {
            this.slider.slideTo(currentAya - 1);
          }
        }, 600);
        console.log("SURAH", this.surah);
      } else {
        this.quran.getSurah(id, this.setting["quran"].audio).subscribe(data => {
          const result = data["data"];
          if (data && result) {
            this.surah = result;
            this.storage.set(id + "_" + this.setting["quran"].audio, result);
            this.aya = this.surah["ayahs"][0];
            this.start();
            setTimeout(() => {
              if (this.slider) {
                this.slider.slideTo(0);
              }
            }, 200);
          }
        });
      }
    });

    if (this.config && this.config["trans"])
      this.storage.get(id + "_" + this.setting["quran"].trans).then(result => {
        if (result) {
          this.trans = result;
          // console.log("TRANS", result);
        } else {
          this.quran
            .getTrans(id, this.setting["quran"].trans)
            .subscribe(data => {
              const result = data["data"];
              if (data && result) {
                this.trans = result;
                this.storage.set(
                  id + "_" + this.setting["quran"].trans,
                  result
                );
              }
            });
        }
      });
    else this.trans = null;

    if (this.config && this.config["tafsir"])
      this.storage.get(id + "_" + this.setting["quran"].tafsir).then(result => {
        if (result) {
          this.tafsir = result;
          // console.log("TAFSIR", result);
        } else {
          this.quran
            .getTafsir(id, this.setting["quran"].tafsir)
            .subscribe(data => {
              const result = data["data"];
              if (data && result) {
                this.tafsir = result;
                this.storage.set(
                  id + "_" + this.setting["quran"].tafsir,
                  result
                );
              }
            });
        }
      });
    else this.tafsir = null;
  }

  start() {
    console.log("Start", this.aya);
    this.looping =
      this.config && this.config["repeat"] != null ? this.config["repeat"] : 1;
    if (this.config && this.config["autoPlay"]) this.playAudio();
  }

  onSlideChanged() {
    this.stopAudio();
    this.slideIndex = this.slider.getActiveIndex();
    this.aya = this.surah["ayahs"][this.slideIndex];
    this.looping =
      this.config && this.config["repeat"] != null ? this.config["repeat"] : 1;
    if (this.config && this.config["autoPlay"]) this.playAudio();
  }

  next() {
    if (this.slider.isEnd()) {
      if (this.surah.number < 114) this.loadSurah(this.surah.number + 1);
    } else {
      this.slider.slideNext();
    }
  }

  previous() {
    if (this.slider.isBeginning()) {
      if (this.surah.number > 1) this.loadSurah(this.surah.number - 1);
    } else {
      this.slider.slidePrev();
    }
  }

  playAudio() {
    if (this.ayaAudio) this.stopAudio();
    const url = this.aya.audio;
    this.ayaAudio = this.media.create(url);
    this.ayaAudio.play();
    this.looping--;
    console.log("PLAY", url, this.looping);
    this.ayaAudio.onStatusUpdate.subscribe(status => {
      if (status == 2) {
      } else if (this.ayaAudio && status == 4 && this.looping > 0) {
        this.looping--;
        this.ayaAudio.play();
      } else if (
        status == 4 &&
        this.looping == 0 &&
        this.config &&
        this.config["autoPlay"]
      ) {
        this.next();
      }
    });
  }

  stopAudio() {
    console.log("stop");
    this.looping =
      this.config && this.config["repeat"] != null ? this.config["repeat"] : 1;
    // this.ayaAudio.stop();
    if (this.ayaAudio) this.ayaAudio.release();
    this.ayaAudio = null;
  }

  saveAyah(surah = null, ayah = null) {
    surah = surah ? surah : this.id;
    ayah = ayah ? ayah : this.aya ? this.aya.numberInSurah : 1;
    this.setting["currentSurah"] = surah;
    this.setting["currentAya"] = ayah;
    this.storage.set("position", {
      surah: {
        number: this.surah.number,
        name: this.surah.name,
        englishName: this.surah.englishName,
        englishNameTranslation: this.surah.englishNameTranslation
      },
      ayah: this.aya
    });
    this.storage.set("settings", this.setting);
    console.log("Save", this.setting);
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

  showList() {
    let mdl = this.mdlCtrl.create(SurahListPage);
    mdl.onDidDismiss(id => {
      if (id) {
        this.id = id;
        this.saveAyah(id, 1);
        this.loadSurah(id);
      }
    });
    mdl.present();
  }

  presentConfig(ev) {
    let popover = this.popoverCtrl.create(QuranConfigPage, {
      lang: this.language,
      config: this.config
    });
    popover.onDidDismiss(data => {
      if (data) {
        console.log("POP", data);
        this.setting["quran"]["config"] = data;
        this.storage.set("settings", this.setting);
        this.config = data;
        this.saveAyah(this.id, null);
        this.loadSurah(this.id);
      }
    });
    popover.present({
      ev
    });
  }

  presentProgram(ev) {
    this.quran.getEditions().subscribe(ret => {
      console.log(ret);
      if (ret && ret["data"]) {
        let modal = this.mdlCtrl.create(ProgramPage, {
          list: ret["data"],
          lang: this.language
        });
        modal.present();
        modal.onDidDismiss(ret => {
          if (ret) {
            ret["currentAya"] = 1;
            ret["currentSurah"] = 1;

            if (ret) this.setting["quran"] = ret;
            console.log("Setting", this.setting);
            this.storage
              .set("settings", this.setting)
              .then(() => this.loadSurah(1))
              .catch(err => console.error(err));
          }
        });
      }
    });
  }

  loadLang(l) {
    if (l == "ar") this.dir = "rtl";
    this.lang = langs[l].surah;
  }
}
