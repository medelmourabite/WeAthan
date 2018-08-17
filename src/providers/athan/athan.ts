import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as adhan from "adhan";

@Injectable()
export class AthanProvider {
  apiUrl = "http://api.aladhan.com/v1/calendarByCity?";
  apiHijri = "http://api.aladhan.com/v1/gToH?date=07-12-2014";

  salates_ar = {
    fajr: "الفجر",
    sunrise: "الشروق",
    dhuhr: "الظهر",
    asr: "العصر",
    maghrib: "المغرب",
    isha: "العشاء"
  };

  prayers = ["fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha"];

  constructor(public http: HttpClient) {}

  getData(city, country, settings) {
    let today = new Date();
    var url =
      this.apiUrl +
      "city=" +
      this.encodeURI(city) +
      "&country=" +
      this.encodeURI(country) +
      "&method=" +
      settings.calculation_method +
      "&month=" +
      today.getMonth() +
      +"&year=" +
      today.getFullYear();

    return this.http.get(url);
  }

  calculatePrayersTime(data, settings) {
    var coordinates = new adhan.Coordinates(
      data.city.coord.lat,
      data.city.coord.lon
    );
    let times = data.list;

    var params = adhan.CalculationMethod[settings.calculation_method]();
    params.madhab = adhan.Madhab[settings.madhab];

    for (let i = 0; i < times.length; i++) {
      const hour = times[i];
      let date = new Date(hour.dt * 1000);

      let prayerTimes = new adhan.PrayerTimes(coordinates, date, params);

      this.getPrayersPer3Hours(prayerTimes, hour.dt, ret => {
        if (!times[i]["prayers"]) times[i]["prayers"] = [];

        if (ret && ret.length > 0) {
          times[i]["prayers"] = ret;
        } else {
          times[i]["prayers"] = [];
        }
      });
    }

    return times;
  }

  getPrayersPer3Hours(prayerTimes, dt, cb) {
    let date = new Date(dt * 1000);
    let min = date.getHours() * 60;
    let max = min + 3 * 60;

    let prayersPer3Hours = [];
    let now = new Date().getTime();

    Object.keys(prayerTimes).forEach(salate => {
      let d = new Date(prayerTimes[salate]);
      let h = d.getHours() * 60 + d.getMinutes();

      const time = d.getTime();

      if (time >= now && h >= min && h < max) {
        prayersPer3Hours.push({
          name: salate,
          dt: prayerTimes[salate],
          name_ar: this.salates_ar[salate]
        });
      }
    });

    cb(prayersPer3Hours);
  }

  calculatePrayersByNext(prayerTimes, date) {
    let p = prayerTimes.nextPrayer(date);
    return {
      name: this.prayers[p],
      dt: prayerTimes[this.prayers[p]],
      name_ar: this.salates_ar[this.prayers[p]]
    };
  }

  calculateNextPrayer(data, settings) {
    if (!data) return null;
    var coordinates = new adhan.Coordinates(
      data.city.coord.lat,
      data.city.coord.lon
    );
    // let times = data.list;

    var params = adhan.CalculationMethod[settings.calculation_method]();
    params.madhab = adhan.Madhab[settings.madhab];

    const now = new Date();
    let prayerTimes = new adhan.PrayerTimes(coordinates, now, params);

    let p = prayerTimes.nextPrayer(now);
    return {
      name: this.prayers[p],
      dt: prayerTimes[this.prayers[p]],
      name_ar: this.salates_ar[this.prayers[p]]
    };
  }

  getTheNearest(prayerTimes, dt, cb) {
    let near = "fajr";
    let min = 1000000000000000;
    Object.keys(prayerTimes).forEach(salate => {
      let time = new Date(prayerTimes[salate]).getTime();
      let dist = Math.abs(dt - time);

      if (dist <= min) {
        near = salate;
        min = dist;
      }
    });
    cb(near);
  }

  encodeURI(string) {
    return encodeURIComponent(string)
      .replace(/\"/g, "%22")
      .replace(/\ /g, "%20")
      .replace(/[!'()]/g, encodeURI);
  }
}
