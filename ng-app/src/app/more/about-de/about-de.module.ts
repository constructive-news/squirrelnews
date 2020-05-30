import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutDePageRoutingModule } from './about-de-routing.module';

import { AboutDePage } from './about-de.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutDePageRoutingModule
  ],
  declarations: [AboutDePage]
})
export class AboutDePageModule {}
