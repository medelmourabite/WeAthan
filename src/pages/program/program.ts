import { Component } from "@angular/core";
import { NavParams, ViewController } from "ionic-angular";
import langs from "./../../internationalization/langs";

@Component({
  selector: "page-program",
  templateUrl: "program.html"
})
export class ProgramPage {
  step = 1;

  quran = {
    prayers: [],
    audio: "ar.alafasy",
    trans: "en.asad",
    tafsir: "ar.muyassar",
    config: {
      autoPlay: false,
      repeat: 1,
      trans: true,
      tafsir: true,
      fontFamily: "Quran1"
    }
  };

  editionsAudio = [];
  editionsTrans = [];
  editionsTafsir = [];

  prayers = ["fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha"];

  lang = {};
  language = "en";
  dir = "ltr";

  constructor(public navParams: NavParams, public viewCtrl: ViewController) {
    let list = navParams.data.list;
    if (this.navParams.data.lang) this.language = this.navParams.data.lang;
    this.loadLang(this.language);
    this.getEditions(list);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ProgramPage");
  }

  next(step, val) {
    switch (step) {
      case 0:
        this.quran["program"] = val;
        this.step++;
        break;
      case 1:
        this.step++;
        break;
      case 2:
        this.quran["audio"] = val;
        this.step++;
        break;
      case 3:
        this.quran["trans"] = val;
        this.step++;
        break;
      case 4:
        this.quran["tafsir"] = val;
        this.step++;
        break;
      case 5:
        this.viewCtrl.dismiss(this.quran);
        break;
      default:
        break;
    }

    console.log(this.step, this.quran);
  }

  back() {
    if (this.step == 1) {
      this.viewCtrl.dismiss(null);
      return;
    }
    this.step--;
  }

  togglePrayer(ev, p) {
    console.log(ev, p);
    if (ev.checked) {
      this.quran.prayers.push(p);
    } else {
      this.quran.prayers = this.quran.prayers.filter(item => {
        return item != p;
      });
    }

    console.log(p, ev.checked, this.quran.prayers);
  }

  getEditions(list) {
    this.editionsAudio = list.filter(item => {
      return (
        item.format == "audio" &&
        (item.language == "ar" ||
          item.language == "en" ||
          item.language == "fr")
      );
    });

    this.editionsTrans = list.filter(item => {
      return (
        item.type == "translation" &&
        (item.language == "en" || item.language == "fr")
      );
    });

    this.editionsTafsir = list.filter(item => {
      return item.type == "tafsir";
    });
  }

  loadLang(l) {
    if (l == "ar") this.dir = "rtl";
    this.lang = langs[l].program;
    console.log(l, this.lang);
    this.prayers = langs[l].config.prayers;
  }
}
