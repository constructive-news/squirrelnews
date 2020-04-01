import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from './safe.pipe';
import { ArticleComponent } from './article/article.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [SafePipe, ArticleComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [SafePipe, ArticleComponent]
})
export class SharedModule { }
