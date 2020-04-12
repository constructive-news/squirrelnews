import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from './safe.pipe';
import { ArticleComponent } from './article-teaser/article/article.component';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslatePipe } from './translate.pipe';
import { ArticleTeaserComponent } from './article-teaser/article-teaser.component';
import { MoreComponent } from './article-teaser/more/more.component';


@NgModule({
  declarations: [
    SafePipe,
    TranslatePipe,
    ArticleTeaserComponent,
    ArticleComponent,
    MoreComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    HttpClientModule,
  ],
  exports: [SafePipe, TranslatePipe, ArticleTeaserComponent, ArticleComponent]
})
export class SharedModule { }