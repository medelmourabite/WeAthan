import { ViewController } from "ionic-angular";
import { Component } from "@angular/core";
import { NavParams } from "ionic-angular";
import langs from "./../../internationalization/langs";

@Component({
  selector: "page-quran-config",
  templateUrl: "quran-config.html"
})
export class QuranConfigPage {
  contentEle: any;
  background: string;
  fontSize = 16;
  fontColor;
  textEle: any;
  fontFamily;

  colors = {
    white: {
      bg: "rgb(255, 255, 255)",
      fg: "rgb(0, 0, 0)"
    },
    tan: {
      bg: "rgb(249, 241, 228)",
      fg: "rgb(0, 0, 0)"
    },
    grey: {
      bg: "rgb(76, 75, 80)",
      fg: "rgb(255, 255, 255)"
    },
    black: {
      bg: "rgb(0, 0, 0)",
      fg: "rgb(255, 255, 255)"
    }
  };

  fonts = [
    { key: "Othmani", name: "Othmani" },
    { key: "Quran1", name: "Quran" },
    { key: "Madina", name: "Madina" },
    { key: "Noorehidayat", name: "Noor el Hidayat" },
    { key: "Scheherazade", name: "Scheherazade" },
    { key: "Saleem", name: "Saleem" },
    { key: "AlQalam", name: "Al Qalam" }
  ];

  config = {
    autoPlay: false,
    repeat: 1,
    trans: true,
    tafsir: true,
    fontFamily: "Quran1"
  };

  lang = {};
  language = "en";
  dir = "ltr";

  constructor(private navParams: NavParams, public viewCtrl: ViewController) {
    if (this.navParams.data.lang) this.language = this.navParams.data.lang;
    this.loadLang(this.language);
    if (this.navParams.data.config) {
      this.config = this.navParams.data.config;
      if (this.config["color"]) {
        this.fontColor = this.config["color"];
      }
      if (this.config["background"]) {
        this.background = this.config["background"];
      }
      if (this.config["fontSize"]) {
        this.fontSize = this.config["fontSize"];
      }
      if (this.config["repeat"] >= 1000) {
        this.config["repeat"] = 0;
      }
    }
  }

  getColorName(background) {
    let colorName = "white";

    if (!background) return "white";

    for (var key in this.colors) {
      if (this.colors[key].bg == background) {
        colorName = key;
      }
    }

    return colorName;
  }

  // setFontFamily() {
  //   if (this.textEle.style.fontFamily) {
  //     this.fontFamily = this.textEle.style.fontFamily.replace(/'/g, "");
  //   }
  // }

  changeBackground(color) {
    this.background = this.colors[color].bg;
    this.fontColor = this.colors[color].fg;
  }

  changeFontSize(direction) {
    // this.textEle.style.fontSize = direction;
    if (direction == "smaller") this.fontSize -= 2;
    else {
      this.fontSize += 2;
    }
    console.log(this.fontSize);
  }

  // changeFontFamily() {
  //   if (this.fontFamily) this.textEle.style.fontFamily = this.fontFamily;
  // }

  validate() {
    console.log(this.config);
    if (this.config.repeat == 0) this.config.repeat = 1000;
    this.config["background"] = this.background;
    this.config["fontSize"] = this.fontSize;
    this.config["color"] = this.fontColor;
    this.viewCtrl.dismiss(this.config);
  }

  loadLang(l) {
    if (l == "ar") this.dir = "rtl";
    this.lang = langs[l].configQuran;
    console.log(l, langs[l], this.lang);
  }
}
