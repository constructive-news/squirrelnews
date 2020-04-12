import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreviousPageRoutingModule } from './previous-routing.module';

import { PreviousPage } from './previous.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ArticlesService } from 'src/app/shared/articles.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PreviousPageRoutingModule
  ],
  declarations: [PreviousPage],
  providers: [ ArticlesService ]
})
export class PreviousPageModule {}
