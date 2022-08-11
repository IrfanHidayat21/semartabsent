import { Clipboard } from '@ionic-native/clipboard';
import { HomePage } from './../home/home';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { Http } from '@angular/http';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  deviceId;
  

  constructor(public navCtrl: NavController, private clipboard: Clipboard, public toastCtrl: ToastController, private http: Http, public loadingCtrl: LoadingController, public storage : Storage, public uniqueDeviceID: UniqueDeviceID,  public navParams: NavParams) {
    this.uniqueDeviceID.get()
      .then(uuid => {
        this.deviceId = uuid;
      }).catch((error: any) => console.log(error));
  }
  copyText(){
    this.uniqueDeviceID.get()
      .then(uuid => {
        this.deviceId = uuid;
        this.clipboard.copy(uuid).then(()=>{
          this.presentToast('Copied');
        });
      }).catch((error: any) => console.log(error));
    
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  presentToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      position: 'top',
      duration: 2300
    });
    toast.present();
  }
  connect(){
    // let loading = this.loadingCtrl.create({
    //   spinner: 'circles',
    //   dismissOnPageChange: false,
    //   cssClass: 'my-loading-class'
    //   });
    //   loading.present();
    //   setTimeout( () => {
    //     this.uniqueDeviceID.get()
    //     .then(uuid => {
    //       console.log(uuid);
    //       let linkApi = 'http://hr.cinoxmedianet.id/android/connect/'+uuid;
    //       this.http.get(linkApi)
    //         .toPromise()
    //         .then(data => {
                
    //             console.log('hasil : ', data);
    //             let rs = data.json();
    //             this.storage.set('profileData',rs);
    //             this.storage.set('deviceId',uuid);
    //             loading.dismiss();
    //             this.presentToast('Successfully');
    //             this.navCtrl.setRoot(HomePage);
    //         })
    //         .catch(e => {
    //           console.log('tidak bisa : ', e);
    //           loading.dismiss();
    //           this.presentToast('Device Tidak Terdaftar');
    //         });
         
    //     })
    //     .catch((error: any) => console.log(error));
    // },2000);
    let linkApi = 'http://hr.cinoxmedianet.id/android/connect/'+"fa340dd4-dcbe-fb98-6893-903000970889";
    this.http.get(linkApi)
      .toPromise()
      .then(data => {
          
          console.log('hasil : ', data);
          let rs = data.json();
          this.storage.set('profileData',rs);
          
          this.navCtrl.setRoot(HomePage);
      })
    
  }
}
