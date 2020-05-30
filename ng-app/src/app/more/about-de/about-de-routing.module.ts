import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutDePage } from './about-de.page';

const routes: Routes = [
  {
    path: '',
    component: AboutDePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutDePageRoutingModule {}
