import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ArticleTeaserComponent } from './article-teaser/article-teaser.component';
import { ArticleComponent } from './article-teaser/article/article.component';
import { ExtrasComponent } from './article-teaser/extras/extras.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { TranslatePipe } from './translate.pipe';


@NgModule({
  declarations: [
    ArticleTeaserComponent,
    ArticleComponent,
    ExtrasComponent,
    SplashScreenComponent,
    TranslatePipe
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [ ArticleTeaserComponent, ArticleComponent, ExtrasComponent, TranslatePipe, SplashScreenComponent]
})
export class SharedModule { }
