import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllPageRoutingModule } from './all-routing.module';

import { AllPage } from './all.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllPageRoutingModule
  ],
  declarations: [AllPage]
})
export class AllPageModule {}
