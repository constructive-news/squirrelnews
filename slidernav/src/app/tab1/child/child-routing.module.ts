import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChildPage } from './child.page';

const routes: Routes = [
  {
    path: '',
    component: ChildPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChildPageRoutingModule {}
