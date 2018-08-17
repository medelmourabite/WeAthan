import { Component, ViewChild } from "@angular/core";
import { NavParams, ViewController } from "ionic-angular";
import langs from "./../../internationalization/langs";

@Component({
  selector: "page-add-location",
  templateUrl: "add-location.html"
})
export class AddLocationPage {
  @ViewChild("cityField") cityField;

  city = { name: "", country: "" };
  ok;

  lang = {};

  dir = "ltr";

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    let l = navParams.data.lang;
    if (l == "ar") this.dir = "rtl";
    console.log("LANG", l);

    this.loadLang(l);
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.cityField.setFocus();
    }, 400);
  }

  addLocation() {
    if (this.city.name && this.city.name.length >= 3) {
      this.viewCtrl.dismiss(this.city);
    }
  }

  dismiss() {
    this.viewCtrl.dismiss(null);
  }

  loadLang(l) {
    this.lang = langs[l].addLocation;
  }
}
