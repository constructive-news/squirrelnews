import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';

import { ArticlesService } from '../shared/articles.service';
import { Article } from './article';

import { Plugins } from '@capacitor/core';
import { StateService } from '../shared/state.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
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
    private router: Router,
    public state: StateService
  ) { }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.articlesSubscription = this.articlesService.getCurrentIssue().subscribe(result => {
      this.currentArticles = result;
      this.state.activeSlide.next(this.currentArticles[0]);
    });

  }

  ionViewWillLeave() {
    this.articlesSubscription.unsubscribe();
  }


}
