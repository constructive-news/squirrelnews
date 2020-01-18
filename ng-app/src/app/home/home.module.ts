import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from '../../environments/environment';

import { HomePage } from './home.page';
import { ArticlesService } from './articles.service';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { SharedModule } from '../shared/shared.module';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ],
  declarations: [HomePage, ArticleDetailComponent],
  entryComponents: [ArticleDetailComponent],
  providers: [ArticlesService]
})
export class HomePageModule {}
