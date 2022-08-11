import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';

/**
 * Generated class for the AddcutiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addcuti',
  templateUrl: 'addcuti.html',
})
export class AddcutiPage {
  cuti = [];
  constructor(public navCtrl: NavController,private http: Http, public toast: ToastController, public loadingCtrl: LoadingController, public storage: Storage, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddcutiPage');
  }
  addCuti(){
    let loading = this.loadingCtrl.create({
      spinner: 'circles',
      dismissOnPageChange: false,
      cssClass: 'my-loading-class'
      });
      loading.present();
      setTimeout( () => {

        
          //this.storage.get('deviceId').then(dvcid => {
            
            let linkApi = "http://hr.cinoxmedianet.id/android/cuti/fa340dd4-dcbe-fb98-6893-903000970889";
           
            let credentials = {
              leave_date : new Date(),
              code: "CT",
              amount: "3"
            }

            return this.http.post(linkApi, credentials)
            .toPromise()
            .then(data => {
                let rs = data.json();
                this.storage.get('cuti').then(dt =>{
                  if(dt){
                    this.cuti = dt;
                    this.cuti.push(credentials);
                    this.storage.set('cuti', this.cuti);
                  }else{
                    this.storage.set('cuti', credentials);
                  }
                });
               


                console.log('hasil : ', rs);
                loading.dismiss();
                this.presentToast('successfully');
                this.navCtrl.pop();
            })
            .catch(e => {
              console.log(e);
              loading.dismiss();
              this.presentToast('Try Again!');
            });
          //});
      
    },2000);
    
  }

  presentToast(msg) {
    const toast = this.toast.create({
      message: msg,
      position: 'top',
      duration: 2300
    });
    toast.present();
  }
}
