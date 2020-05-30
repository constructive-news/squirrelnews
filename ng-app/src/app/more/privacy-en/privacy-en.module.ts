import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrivacyEnPageRoutingModule } from './privacy-en-routing.module';

import { PrivacyEnPage } from './privacy-en.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrivacyEnPageRoutingModule
  ],
  declarations: [PrivacyEnPage]
})
export class PrivacyEnPageModule {}
