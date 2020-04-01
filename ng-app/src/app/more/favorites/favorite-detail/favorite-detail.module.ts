import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoriteDetailPageRoutingModule } from './favorite-detail-routing.module';

import { FavoriteDetailPage } from './favorite-detail.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    FavoriteDetailPageRoutingModule
  ],
  declarations: [FavoriteDetailPage]
})
export class FavoriteDetailPageModule {}
