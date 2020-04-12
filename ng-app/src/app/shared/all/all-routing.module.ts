import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllPage } from './all.page';

const routes: Routes = [
  {
    path: '',
    component: AllPage
  },
  {
    path: ':title',
    loadChildren: () => import('./article-detail/article-detail.module').then( m => m.ArticleDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllPageRoutingModule {}
