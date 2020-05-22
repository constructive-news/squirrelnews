import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomePage } from './home.page';
import { ArticlesService } from '../shared/articles.service';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { SharedModule } from '../shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BackendInterceptor } from '../shared/backend.interceptor';

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
      },
      {
      path: 'previous/:issueId',
      loadChildren: () => import('../shared/previous/previous.module').then( m => m.PreviousPageModule)
      },
      {
        path: 'favorites',
        loadChildren: () => import('../shared/favorites/favorites.module').then( m => m.FavoritesPageModule)
      },
      {
        path: 'all',
        loadChildren: () => import('../shared/all/all.module').then( m => m.AllPageModule)
      }
    ])
  ],
  declarations: [HomePage, ArticleDetailComponent],
  entryComponents: [ArticleDetailComponent],
  providers: [
    ArticlesService,
    { provide: HTTP_INTERCEPTORS, useClass: BackendInterceptor, multi: true }
  ]
})
export class HomePageModule {}
