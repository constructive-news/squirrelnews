import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllPage } from './all.page';

const routes: Routes = [
  {
    path: '',
    component: AllPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllPageRoutingModule {}
