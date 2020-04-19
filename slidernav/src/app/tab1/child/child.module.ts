import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChildPageRoutingModule } from './child-routing.module';

import { ChildPage } from './child.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChildPageRoutingModule
  ],
  declarations: [ChildPage]
})
export class ChildPageModule {}
