import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class QuranProvider {
  apiUrl = "http://api.alquran.cloud";

  constructor(public http: HttpClient) {
    console.log("Hello QuranProvider Provider");
  }

  getSurahsList() {
    const url = this.apiUrl + "/surah";
    return this.http.get(url);
  }
  getSurah(id, audio) {
    const url = this.apiUrl + "/surah/" + id + "/" + audio;
    return this.http.get(url);
  }

  getTrans(id, trans) {
    const url = this.apiUrl + "/surah/" + id + "/" + trans;
    return this.http.get(url);
  }

  getTafsir(id, tafsir) {
    const url = this.apiUrl + "/surah/" + id + "/" + tafsir;
    return this.http.get(url);
  }

  getQuarter(id) {
    const url = this.apiUrl + "/hizbQuarter/" + id;
    return this.http.get(url);
  }

  getEditions() {
    let url = this.apiUrl + "/edition";
    // var headers = new HttpHeaders();
    // headers.append("Access-Control-Allow-Origin", "*");
    // headers.append("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT");
    // headers.append("Accept", "application/json");
    // headers.append("content-type", "application/json");

    // return this.http.get(url, { headers: headers });
    return this.http.get(url);
  }
}
