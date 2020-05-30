import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImprintEnPageRoutingModule } from './imprint-en-routing.module';

import { ImprintEnPage } from './imprint-en.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImprintEnPageRoutingModule
  ],
  declarations: [ImprintEnPage]
})
export class ImprintEnPageModule {}
