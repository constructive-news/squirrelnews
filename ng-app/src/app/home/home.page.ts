import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

import { ArticlesService } from '../shared/articles.service';
import { Article } from './article';

import { Plugins } from '@capacitor/core';
import { StateService } from '../shared/state.service';
const { Browser } = Plugins;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {


  @ViewChild('articleSlider') slider: IonSlides;

  currentArticles: Article[] = [];

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

    this.state.activeSlide
    .subscribe( slide => this.url = slide ? slide.url : '');
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
