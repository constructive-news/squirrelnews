import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoriteDetailPage } from './favorite-detail.page';

const routes: Routes = [
  {
    path: '',
    component: FavoriteDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoriteDetailPageRoutingModule {}
