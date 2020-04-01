import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllPageRoutingModule } from './all-routing.module';

import { AllPage } from './all.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ArticlesService } from 'src/app/shared/articles.service';
import { ExpandableComponent } from './expandable/expandable.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    AllPageRoutingModule
  ],
  declarations: [AllPage, ExpandableComponent],
  providers: [ ArticlesService ]
})
export class AllPageModule {}
