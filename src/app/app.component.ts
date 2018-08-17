import { HomePage } from "./../pages/home/home";
import { LocalNotifications } from "@ionic-native/local-notifications";
import { Storage } from "@ionic/storage";
import { Component, ViewChild } from "@angular/core";
import { Nav, Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import langs from "./../internationalization/langs";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav)
  nav: Nav;

  rootPage: any = HomePage;

  cities = [];
  myCity = "";

  lang = {};

  dir = "ltr";

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public storage: Storage,
    public notif: LocalNotifications
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if (!this.notif.hasPermission()) {
        this.notif.requestPermission();
      }
      // this.getCities();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  getCities() {
    console.log("Getting cities");

    this.cities = [];
    this.storage.forEach((item, key) => {
      if (key == "myCity") {
        this.myCity = item;
      } else if (
        item != null &&
        key != "myCity" &&
        key != "settings" &&
        key != "hijriCalender" &&
        key != "quotes"
      ) {
        if (item.city) this.cities.push(item.city);
      }
      if (key == "settings") {
        let l = item && item.lang ? item.lang : "en";
        this.loadLang(l);
      }
    });
    console.log(this.cities);
  }

  setMyCity(key) {
    console.log("MYCITY", key);

    this.myCity = key;
    this.storage.set("myCity", key);
    this.nav.setRoot(HomePage, { myCity: key });
  }

  removeCity(city) {
    this.storage.set(city, null);
    this.getCities();
    if (this.cities[0] && this.cities[0].id != city) {
      this.setMyCity(this.cities[0].id);
    } else if (this.cities[1] && this.cities[1].id != city) {
      this.setMyCity(this.cities[1].id);
    }
  }

  loadLang(l) {
    this.lang = langs[l].sideMenu;
    if (l == "ar") this.dir = "rtl";
  }
}
