import { Platform } from "ionic-angular";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";

@Injectable()
export class GoodquotesProvider {
  //apiUrl =    "http://localhost:1337/preprod.seocom.ma/weather-athan/public/api/v1/quotes";
  apiUrl = "http://preprod.seocom.ma/weather-athan/public/api/v1/quotes";

  constructor(public http: HttpClient, platform: Platform) {
    if (!platform.is("android")) {
      this.apiUrl = "/weather-athan/public/api/v1/quotes";
    }
  }

  getQuotes(page = 1) {
    const url = this.apiUrl + "?page=" + page;
    var headers = new HttpHeaders();
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT");
    headers.append("Accept", "application/json");
    headers.append("content-type", "application/json");

    return this.http.get(url, { headers: headers });
  }

  getLastQuote() {
    return this.http.get(this.apiUrl);
  }
  getRandomQuotes(lang) {
    if (lang == "ar") {
      return this.http.get("../../assets/quotes.json");
    } else {
      // let tag = this.tags[Math.floor(Math.random() * this.tags.length)];
      // var url = "https://goodquotesapi.herokuapp.com/tag/" + tag;
      return this.http.get("../../assets/quotes_en.json");
    }
  }
}
