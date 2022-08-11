import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AbsentPhotoPage } from './absent-photo';

@NgModule({
  declarations: [
    AbsentPhotoPage,
  ],
  imports: [
    IonicPageModule.forChild(AbsentPhotoPage),
  ],
})
export class AbsentPhotoPageModule {}
