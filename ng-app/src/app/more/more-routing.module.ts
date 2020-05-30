import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MorePage } from './more.page';

const routes: Routes = [
  {
    path: '',
    component: MorePage
  },
  {
    path: 'privacy-de',
    loadChildren: () => import('./privacy-de/privacy-de.module').then( m => m.PrivacyDePageModule)
  },
  {
    path: 'privacy-en',
    loadChildren: () => import('./privacy-en/privacy-en.module').then( m => m.PrivacyEnPageModule)
  },
  {
    path: 'imprint-de',
    loadChildren: () => import('./imprint-de/imprint-de.module').then( m => m.ImprintDePageModule)
  },
  {
    path: 'imprint-en',
    loadChildren: () => import('./imprint-en/imprint-en.module').then( m => m.ImprintEnPageModule)
  },
  {
    path: 'about-en',
    loadChildren: () => import('./about-en/about-en.module').then( m => m.AboutEnPageModule)
  },
  {
    path: 'about-de',
    loadChildren: () => import('./about-de/about-de.module').then( m => m.AboutDePageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MorePageRoutingModule {}
