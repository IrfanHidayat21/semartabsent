import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { FileTransferObject, FileUploadOptions, FileTransfer } from '@ionic-native/file-transfer';
import { Http } from '@angular/http';

/**
 * Generated class for the AbsentPhotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-absent-photo',
  templateUrl: 'absent-photo.html',
})
export class AbsentPhotoPage {
  captureDataUrl;
  public imageUri: any;
  historyData =[];
  constructor(
    public navCtrl: NavController, 
    public camera: Camera,
    private http: Http,
    public toastCtrl: ToastController,
    private transfer: FileTransfer,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public navParams: NavParams) {
    
    this.pickImage();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AbsentPhotoPage');
  }
  
  pickImage(){
    const cameraOptions: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      cameraDirection: 1,
      // sourceType: sourceType
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    
    this.camera.getPicture(cameraOptions)
     .then((captureDataUrl) => {
      // const filePath = `my-_${ new Date().getTime() }.jpg`;
      // this.captureDataUrl = (<any>window).Ionic.WebView.convertFileSrc(captureDataUrl);
      this.captureDataUrl = 'data:image/jpeg;base64,' + captureDataUrl;
      // this.imageUri = captureDataUrl;
      this.imageUri = 'data:image/jpeg;base64,' + captureDataUrl;
      console.log('gambar : ', this.imageUri);
      
    }, (err) => {
        console.log(err);
    });
  }

  absen(){
    let loading = this.loadingCtrl.create({
      spinner: 'circles',
      dismissOnPageChange: false,
      cssClass: 'my-loading-class'
      });
      loading.present();
      setTimeout( () => {

        
        this.storage.get('barcodeData').then(dt => {

          this.storage.get('deviceId').then(dvcid => {
            
            let linkApi = "http://hr.cinoxmedianet.id/android/post";
           
            let credentials = {
              deviceId: dvcid,
              qrcode: dt.text,
              image: this.imageUri
            }

            return this.http.post(linkApi, credentials)
            .toPromise()
            .then(data => {
                let rs = data.json();
                
                console.log('hasil : ', rs);
                loading.dismiss();
                this.forHistory();
                this.presentToast('Absent successfully');
                this.navCtrl.pop();
            })
            .catch(e => {
              console.log(e);
              loading.dismiss();
              this.presentToast('Try Again!');
            });
          });
        });
        
      
    },2000);
    
  }
  forHistory(){
    this.storage.get('history').then(dt =>{
      let tgl = new Date();
      let hari = tgl.getDate().toString() + '/' + (tgl.getMonth() + 1).toString() + '/' + tgl.getFullYear().toString();
      console.log('tgl : ', hari);
      
      if(dt){
        console.log('ada');
        this.historyData = dt;
        console.log('hola : ', this.historyData);
        let i = this.historyData.findIndex(item=>{
          return item.tanggal==hari
        });
        console.log('i: ',i);
        if(i >= 0){
          this.historyData[i].keluar = tgl;
          this.storage.set('history', this.historyData);
        }else{
          let data = {
              tanggal: hari,
              masuk: tgl,
              keluar: null
          }
          
          this.historyData.push(data);
          this.storage.set('history', this.historyData);
        }
      }else {
        console.log('tidak ada');
        let data = [
          {
            tanggal: hari,
            masuk: tgl,
            keluar: null
          }
        ]

        this.storage.set('history', data);

      }

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
}


// let loading = this.loadingCtrl.create({
    //   spinner: 'circles',
    //   dismissOnPageChange: true,
    //   cssClass: 'my-loading-class'
    //   });
    //   loading.present();
    //   setTimeout( () => {
    //     const fileTransfer: FileTransferObject = this.transfer.create();
    //     let options: FileUploadOptions = {
    //       fileKey: 'file',
    //       chunkedMode: false,
    //       mimeType: "multipart/form-data",
    //       // headers: {
    //       //   'Authorization': 'Bearer '+ id_token
    //       // },
    //       params : {'rel': 'USER'} //ini rel untuk foto profile, kalau rel yg lain silahkan ditanya bpknya
    //     }
    //     let linkApi = "";
    //     fileTransfer.upload(this.imageUri, linkApi, options) //ini ada link api 
    //       .then((data) => {
    //           console.log(data);
    //           let dtCont = JSON.parse(data.response);
    
    //           console.log(dtCont);
              
    //           let contentURL =  dtCont.contentUrl;
    //           console.log(contentURL);
    //           loading.dismiss();
    //         }, (err) => {
    //           loading.dismiss();
    //           console.log(err);
    //        });
    // },2000);