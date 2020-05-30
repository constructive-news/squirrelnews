import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImprintDePage } from './imprint-de.page';

const routes: Routes = [
  {
    path: '',
    component: ImprintDePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImprintDePageRoutingModule {}
