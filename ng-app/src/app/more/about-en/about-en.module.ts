import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutEnPageRoutingModule } from './about-en-routing.module';

import { AboutEnPage } from './about-en.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutEnPageRoutingModule
  ],
  declarations: [AboutEnPage]
})
export class AboutEnPageModule {}
