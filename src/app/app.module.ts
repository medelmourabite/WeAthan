import { QuotesPage } from "./../pages/quotes/quotes";
import { LocalNotifications } from "@ionic-native/local-notifications";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { WeatherProvider } from "../providers/weather/weather";
import { NativeAudio } from "@ionic-native/native-audio";

import { IonicStorageModule } from "@ionic/storage";
import { ConfigPage } from "./../pages/config/config";
import { AddLocationPage } from "./../pages/add-location/add-location";
import { AthanProvider } from "../providers/athan/athan";
import { HijriProvider } from "../providers/hijri/hijri";
import { GoodquotesProvider } from "../providers/goodquotes/goodquotes";
import { SocialSharing } from "@ionic-native/social-sharing";
import { SurahListPage } from "../pages/surah-list/surah-list";
import { SurahPage } from "../pages/surah/surah";
import { Media } from "@ionic-native/media";
import { ProgramPage } from "./../pages/program/program";
import { QuranConfigPage } from "./../pages/quran-config/quran-config";
import { QuranProvider } from "./../providers/quran/quran";


@NgModule({
  declarations: [MyApp, HomePage, AddLocationPage, ConfigPage, QuotesPage,  
    SurahListPage,
    SurahPage,
    QuranConfigPage,
    ProgramPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, AddLocationPage, ConfigPage, QuotesPage,SurahListPage,
    SurahPage,
    QuranConfigPage,
    ProgramPage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LocalNotifications,
    NativeAudio,
    SocialSharing,
    WeatherProvider,
    AthanProvider,
    HijriProvider,
    GoodquotesProvider,
    QuranProvider, 
    Media
  ]
})
export class AppModule {}
