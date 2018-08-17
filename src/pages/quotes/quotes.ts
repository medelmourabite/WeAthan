import { GoodquotesProvider } from "./../../providers/goodquotes/goodquotes";
import { Component } from "@angular/core";
import { NavController, NavParams, ToastController } from "ionic-angular";
import { SocialSharing } from "@ionic-native/social-sharing";

@Component({
  selector: "page-quotes",
  templateUrl: "quotes.html"
})
export class QuotesPage {
  quotes = [];
  nextPage = 1;

  connected = true;

  errors = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public quotesProvider: GoodquotesProvider,
    public toastCtrl: ToastController,
    public socialSharing: SocialSharing
  ) {
    this.loadMore(null);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad QuotesPage");
  }

  loadMore(ev) {
    console.log("LOADING MORE");
    this.errors.push("loading");

    this.quotesProvider.getQuotes(this.nextPage).subscribe(
      ret => {
        console.log(this.nextPage, ret);

        if (ret && ret["data"] && ret["data"].length > 0) {
          this.errors.push("OK", ret["data"].length);
          ret["data"].forEach(q => {
            
            
            this.quotes.push(q);
          });
          this.nextPage++;
        } else if (ret && ret["data"] && ret["data"].length <= 0) {
          console.log("No MORE");
        }
        if (ev) ev.complete();
      },
      err => {
        if (ev) ev.complete();
        console.log("NOT CONNECTED", err);
        this.errors.push("Not connected");
        this.connected = false;
      }
    );
  }

  share(index) {
    let q = this.quotes[index];
    this.socialSharing
      .share(
        q.owner + " : \n " + q.body,
        "SEOCOM, Weather & Athan",
        ["http://preprod.seocom.ma/weather-athan/public/uploads/" + q.image],
        q.fb_link
      )
      .then(ok => {
        this.showToast("Shared");
      })
      .catch(err => {
        this.showToast("error " + err);
      });
  }

  shareViaFacebook(index) {
    let q = this.quotes[index];
    this.socialSharing
      .shareViaFacebook(
        q.owner + " : \n " + q.body,
        "http://preprod.seocom.ma/weather-athan/public/uploads/" + q.image,
        q.fb_link
      )
      .then(ok => {
        this.showToast("Shared");
      })
      .catch(err => {
        this.showToast("error " + err);
      });
  }

  shareViaFacebookHint(index) {
    let q = this.quotes[index];
    this.socialSharing
      .shareViaFacebookWithPasteMessageHint(
        q.owner + " : \n " + q.body,
        null,
        // "http://preprod.seocom.ma/weather-athan/public/uploads/" + q.image,
        q.fb_link,
        "SEOCOM: If you like you can paste a message from your clipboard"
      )
      .then(ok => {
        this.showToast("Shared");
      })
      .catch(err => {
        this.showToast("error " + err);
      });
  }

  shareViaTwitter(index) {
    let q = this.quotes[index];
    this.socialSharing
      .shareViaTwitter(
        q.owner + " : \n " + q.body,
        "http://preprod.seocom.ma/weather-athan/public/uploads/" + q.image,
        q.fb_link
      )
      .then(ok => {
        this.showToast("Shared");
      })
      .catch(err => {
        this.showToast("error " + err);
      });
  }

  shareViaInstagram(index) {
    let q = this.quotes[index];
    this.socialSharing
      .shareViaInstagram(
        q.owner + " : \n " + q.body,
        "http://preprod.seocom.ma/weather-athan/public/uploads/" + q.image
      )
      .then(ok => {
        this.showToast("Shared");
      })
      .catch(err => {
        this.showToast("error " + err);
      });
  }

  shareViaWhatsapp(index) {
    let q = this.quotes[index];
    this.socialSharing
      .shareViaWhatsApp(
        q.owner + " : \n " + q.body,
        "http://preprod.seocom.ma/weather-athan/public/uploads/" + q.image
      )
      .then(ok => {
        this.showToast("Shared");
      })
      .catch(err => {
        this.showToast("error " + err);
      });
  }

  save(index) {
    let q = this.quotes[index];
    this.socialSharing
      .saveToPhotoAlbum([
        "http://preprod.seocom.ma/weather-athan/public/uploads/" + q.image
      ])
      .then(ok => {
        this.showToast("Shared");
      })
      .catch(err => {
        this.showToast("error " + err);
      });
  }
  showToast(message, position = "top") {
    let toast = this.toastCtrl.create({
      message,
      position,
      duration: 2000
    });
    toast.present();
  }
}
