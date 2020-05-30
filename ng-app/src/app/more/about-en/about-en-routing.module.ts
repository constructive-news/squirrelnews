import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutEnPage } from './about-en.page';

const routes: Routes = [
  {
    path: '',
    component: AboutEnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutEnPageRoutingModule {}
