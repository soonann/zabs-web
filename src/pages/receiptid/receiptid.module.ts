import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReceiptidPage } from './receiptid';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  declarations: [
    ReceiptidPage,
    
  ],
  imports: [
    NgxQRCodeModule,
    IonicPageModule.forChild(ReceiptidPage),
  ],
})
export class ReceiptidPageModule {}
