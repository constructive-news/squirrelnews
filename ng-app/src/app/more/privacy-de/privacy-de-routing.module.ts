import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrivacyDePage } from './privacy-de.page';

const routes: Routes = [
  {
    path: '',
    component: PrivacyDePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivacyDePageRoutingModule {}
