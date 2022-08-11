import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LemburPage } from './lembur';

@NgModule({
  declarations: [
    LemburPage,
  ],
  imports: [
    IonicPageModule.forChild(LemburPage),
  ],
})
export class LemburPageModule {}
