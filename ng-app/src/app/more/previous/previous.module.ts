import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreviousPageRoutingModule } from './previous-routing.module';

import { PreviousPage } from './previous.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreviousPageRoutingModule
  ],
  declarations: [PreviousPage]
})
export class PreviousPageModule {}
