import { HomePage } from './../pages/home/home';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform,public uniqueDeviceID: UniqueDeviceID, public storage: Storage, public app: App, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.uniqueDeviceID.get()
      .then(uuid => {
        console.log(uuid);
      }).catch((error: any) => console.log(error));
      this.protectPage();
    });
  }
  
  protectPage(){
    this.storage.get('deviceId').then(dt => {
      if(dt){
        let page = this.app.getActiveNav();
        page.setRoot(HomePage);
      }else{
        let page = this.app.getActiveNav();
        page.setRoot('LoginPage');
      }
    });
  }

}

