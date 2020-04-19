import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { ChildPage } from './child/child.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([
      { path: '', component: Tab1Page },
      { path: 'child', loadChildren: () => import('./child/child.module').then(module => module.ChildPageModule) }
    ])
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
