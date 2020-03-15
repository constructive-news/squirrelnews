import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ModalController, IonSlides } from '@ionic/angular';
import { Observable } from 'rxjs';

import { ArticlesService } from './articles.service';
import { Article } from './article';
import { ArticleDetailComponent } from './article-detail/article-detail.component';

import { Plugins } from '@capacitor/core';
import { StateService } from '../shared/state.service';
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

  constructor(
    private articlesService: ArticlesService,
    private modalCtrl: ModalController,
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
  }

  ngOnDestroy() {
    
  }

  async handleSlideChange( ) {
    const index = await this.slider.getActiveIndex();
    this.state.activeSlide.next(this.currentArticles[index]);
  }

  async openDetailModal(articleURL: string) {
    console.log(articleURL);
    const modal = await this.modalCtrl.create({
      component: ArticleDetailComponent,
      componentProps: {
        url: articleURL
      }
    });

    return await modal.present();
  }

  async openBrowser() {
    await Browser.open({ url: 'this.url' });
  }

}
