import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CutiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cuti',
  templateUrl: 'cuti.html',
})
export class CutiPage {
  cuti = [];
  constructor(public navCtrl: NavController, public storage: Storage, public navParams: NavParams) {
   
   
  }
  ionViewDidEnter(){
    this.storage.get('cuti').then(dt =>{
      if(dt){
        this.cuti = dt;
      }
     
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CutiPage');
  }
  pushPage(page){
    this.navCtrl.push(page);
  }
}
