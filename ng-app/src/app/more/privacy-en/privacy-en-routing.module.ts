import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrivacyEnPage } from './privacy-en.page';

const routes: Routes = [
  {
    path: '',
    component: PrivacyEnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivacyEnPageRoutingModule {}
