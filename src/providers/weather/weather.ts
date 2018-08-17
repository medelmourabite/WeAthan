import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class WeatherProvider {
  apiUrl = "http://api.openweathermap.org/data/2.5/forecast?";
  apiKey = "a8e0fddbecfdd37cd117cf8db7a6cc27";

  locations = [];

  constructor(public http: HttpClient) {}

  getData(city, unit, lang) {
    unit = unit ? unit : "Metric";
    lang = lang ? lang : "en";
    var url =
      this.apiUrl +
      (isNaN(city) ? "q=" : "id=") +
      this.encodeURI(city) +
      "&APPID=" +
      this.apiKey +
      "&units=" +
      unit +
      "&lang=" +
      lang;
    return this.http.get(url);
  }

  getCurrentWeather(city, unit, lang) {
    unit = unit ? unit : "Metric";
    lang = lang ? lang : "en";
    var url =
      "http://api.openweathermap.org/data/2.5/weather?" +
      (isNaN(city) ? "q=" : "id=") +
      this.encodeURI(city) +
      "&APPID=" +
      this.apiKey +
      "&units=" +
      unit +
      "&lang=" +
      lang;
    return this.http.get(url);
  }

  getDataFromYahou(city) {
    var query =
      "select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" +
      city +
      "')";

    let url =
      "http://query.yahooapis.com/v1/public/yql?q=" +
      this.encodeURI(query) +
      "&u=c&format=json";

    return this.http.get(url);
  }

  encodeURI(string) {
    return encodeURIComponent(string)
      .replace(/\"/g, "%22")
      .replace(/\ /g, "%20")
      .replace(/[!'()]/g, encodeURI);
  }
}
