import { QuranProvider } from "./../../providers/quran/quran";
import { Component } from "@angular/core";
import { ViewController } from "ionic-angular";
import { Storage } from "@ionic/storage";

@Component({
  selector: "page-surah-list",
  templateUrl: "surah-list.html"
})
export class SurahListPage {
  surahs = [];

  constructor(
    public quran: QuranProvider,
    public storage: Storage,
    public viewCtrl: ViewController
  ) {
    this.getSurahsList();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SurahListPage");
  }

  getSurahsList() {
    this.storage
      .get("surahs")
      .then(result => {
        if (result != null) {
          console.log(result);

          this.surahs = result;
        } else {
          this.quran.getSurahsList().subscribe(
            ret => {
              this.surahs = ret["data"];
              this.storage.set("surahs", ret["data"]);
            },
            () => {}
          );
        }
      })
      .catch(() => {});
  }

  viewSurah(id) {
    this.viewCtrl.dismiss(id);
  }
}
