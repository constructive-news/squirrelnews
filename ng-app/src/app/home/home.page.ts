import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';

import { ArticlesService } from '../shared/articles.service';
import { Article } from './article';

import { Plugins } from '@capacitor/core';
import { StateService } from '../shared/state.service';
import { Subscription, combineLatest } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { PushNotificationsService } from '../shared/push-notifications.service';
const { Browser } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {


  currentArticles: Article[] = [];
  private articlesSubscription: Subscription;

  constructor(
    private articlesService: ArticlesService,
    public state: StateService,
    protected pushNotificationService: PushNotificationsService
  ) { }

  ngOnInit(){
  }

  ngAfterViewInit() {
  }

  ionViewWillEnter() {
    this.articlesSubscription = combineLatest([this.articlesService.getCurrentIssue(), this.state.activeSlideIndex]).subscribe(result => {
      this.currentArticles = result[0];
      const index = result[1];
      index === null
                        ? this.state.activeSlide.next(this.currentArticles[0])
                        : this.state.activeSlide.next(this.currentArticles[index])
    });
  }


  ionViewWillLeave() {
    this.articlesSubscription.unsubscribe();
  }


}
