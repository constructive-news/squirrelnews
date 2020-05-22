import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticlesService } from 'src/app/shared/articles.service';
import { StateService } from 'src/app/shared/state.service';
import { Article } from 'src/app/home/article';
import { Plugins } from '@capacitor/core';
import { Subscription, combineLatest } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
const { Browser } = Plugins;

@Component({
  selector: 'app-previous',
  templateUrl: './previous.page.html',
  styleUrls: ['./previous.page.scss'],
})
export class PreviousPage {

  currentArticles: Partial<Article>[];
  issue: any;
  private articlesSubscription: Subscription;

  constructor(
    private articlesService: ArticlesService,
    private route: ActivatedRoute,
    private state: StateService
  ) { }

  ionViewWillEnter() {
    this.articlesSubscription =
      combineLatest(
          [ this.articlesService.getCurrentIssue2(parseInt(this.route.snapshot.paramMap.get('issueId'), 10)),
            this.state.activeSlideIndex ]).subscribe( (result: any) => {

            this.currentArticles = result[0].articles;
            this.issue = result[0].issue;
            const index = result[1];
            index === null
                              ? this.state.activeSlide.next(this.currentArticles[0])
                              : this.state.activeSlide.next(this.currentArticles[index])
    });
  }


  ionViewWillLeave() {
    this.articlesSubscription.unsubscribe();
  }
  handleBack() {
    this.state.activeTab.next('home');
  }
}
