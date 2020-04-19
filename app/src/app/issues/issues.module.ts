import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IssuesPageRoutingModule } from './issues-routing.module';

import { IssuesPage } from './issues.page';

import { SharedModule } from '../shared/shared.module';
import { ArticlesService } from '../articles.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IssuesPageRoutingModule,
    SharedModule
  ],
  declarations: [IssuesPage],
  providers: [ArticlesService]
})
export class IssuesPageModule {}
