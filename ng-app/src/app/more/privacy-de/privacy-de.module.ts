import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrivacyDePageRoutingModule } from './privacy-de-routing.module';

import { PrivacyDePage } from './privacy-de.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrivacyDePageRoutingModule
  ],
  declarations: [PrivacyDePage]
})
export class PrivacyDePageModule {}
