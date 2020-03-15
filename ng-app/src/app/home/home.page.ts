import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ModalController, IonSlides } from '@ionic/angular';
import { Observable } from 'rxjs';

import { ArticlesService } from './articles.service';
import { Article } from './article';
import { ArticleDetailComponent } from './article-detail/article-detail.component';

import { Plugins } from '@capacitor/core';
import { StateService } from '../shared/state.service';
import { tap } from 'rxjs/operators';
const { Browser } = Plugins;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {


  @ViewChild('articleSlider') slider: IonSlides;

  currentArticles: Article[] = [];

  archive: Map<number, Article[]>;
  url: string = null;

  constructor(
    private articlesService: ArticlesService,
    private state: StateService
  ) {}

  ngOnInit() {
    this.articlesService.getCurrentIssue().subscribe( result => {
      this.currentArticles = result;
      this.state.activeSlide.next(this.currentArticles[0]);
    });

    this.articlesService.getArchiveList().subscribe( result => {
      this.archive = result;
    });

    this.state.activeSlide
    // .pipe(
    //   tap( xx => console.log('url for browser', xx) )
    // )
    .subscribe( slide => this.url = slide ? slide.url : '');
  }

  ngOnDestroy() {
    
  }

  async handleSlideChange( ) {
    const index = await this.slider.getActiveIndex();
    this.state.activeSlide.next(this.currentArticles[index]);
  }

  async openBrowser() {
    console.log('open browser', this.url);
    await Browser.open({ url: this.url });
  }

}
