import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { IonSlides } from '@ionic/angular';

import { ArticlesService } from '../shared/articles.service';
import { Article } from './article';

import { Plugins } from '@capacitor/core';
import { StateService } from '../shared/state.service';
import { Subscription } from 'rxjs';
const { Browser } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {


  @ViewChild('articleSlider') slider: IonSlides;

  currentArticles: Article[] = [];
  private articlesSubscription: Subscription;

  constructor(
    private articlesService: ArticlesService,
    public state: StateService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.articlesSubscription = this.articlesService.getCurrentIssue().subscribe(result => {
      this.currentArticles = result;
      this.state.activeSlide.next(this.currentArticles[0]);
    });
    console.log('entering..');
  }

  ionViewWillLeave() {
    this.articlesSubscription.unsubscribe();
    console.log('leaving..');
  }


}
