import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImprintDePageRoutingModule } from './imprint-de-routing.module';

import { ImprintDePage } from './imprint-de.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImprintDePageRoutingModule
  ],
  declarations: [ImprintDePage]
})
export class ImprintDePageModule {}
