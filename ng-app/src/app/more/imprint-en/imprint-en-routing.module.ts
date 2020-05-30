import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImprintEnPage } from './imprint-en.page';

const routes: Routes = [
  {
    path: '',
    component: ImprintEnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImprintEnPageRoutingModule {}
