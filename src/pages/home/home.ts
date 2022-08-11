import { Storage } from '@ionic/storage';
import { Clipboard } from '@ionic-native/clipboard';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  data;
  deviceId;

  id;
  nama;
  departemen;
  jabatan;
  image;

  
  constructor(
    public navCtrl: NavController,
    private clipboard: Clipboard,
    public toastCtrl: ToastController,
    public barcodeScanner : BarcodeScanner,
    public storage: Storage) {
      
  }
  copyText(){
    this.storage.get('deviceId').then(dt => {
      this.clipboard.copy(dt).then(()=>{
        this.presentToast('Copied');
      });
    });
    
  }
  presentToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      position: 'top',
      duration: 2300
    });
    toast.present();
  }
  ionViewDidEnter(){
    this.storage.get('profileData').then(data => {
      this.id = data.code;
      this.nama = data.name;
      this.departemen = data.departement;
      this.jabatan = data.level;
      this.image = 'http://hr.cinoxmedianet.id/files/images/profiles/'+ data.image;
    });
    this.storage.get('deviceId').then(dt => {
      this.deviceId = dt;
    });
  }

  pushPage(page){
    this.navCtrl.push(page);
  }

  scan(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
//      this.data = barcodeData.text;
      if(barcodeData.cancelled == false){
        this.storage.set('barcodeData',barcodeData);

        this.navCtrl.push('AbsentPhotoPage');
      }
      
      //this.id = dt.substring();
    }).catch(err => {
      console.log('Error', err);
    });

  }

  ionViewWillEnter(){
    this.storage.remove('barcodeData');
  }
}
