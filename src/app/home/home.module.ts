import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { ArticlesService } from './articles.service';
import { ArticleDetailComponent } from './article-detail/article-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage, ArticleDetailComponent],
  entryComponents: [ArticleDetailComponent],
  providers: [ArticlesService]
})
export class HomePageModule {}
