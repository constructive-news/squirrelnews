import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';

import { ArticlesService } from '../shared/articles.service';
import { Article } from './article';

import { Plugins } from '@capacitor/core';
import { StateService } from '../shared/state.service';
import { Subscription, combineLatest } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
const { Browser } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {


  currentArticles: Partial<Article>[];
  issue: any;
  private articlesSubscription: Subscription;

  constructor(
    private articlesService: ArticlesService,
    public state: StateService
  ) { }

    ngAfterViewInit() {
    }

  ionViewWillEnter() {
    this.articlesSubscription =
      combineLatest([this.articlesService.getCurrentIssue2(0), this.state.activeSlideIndex]).subscribe( (result: any) => {
        this.currentArticles = result[0].articles;
        this.issue = result[0].issue;
        const index = result[1];
        index === null
                          ? this.state.activeSlide.next(this.currentArticles[0])
                          : this.state.activeSlide.next(this.currentArticles[index])
    });

    this.state.activeTab.next('home');
  }


  ionViewWillLeave() {
    this.articlesSubscription.unsubscribe();
  }


}
