import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/home/article';
import { StateService } from 'src/app/shared/state.service';
import { Plugins } from '@capacitor/core';

const { Browser } = Plugins;

@Component({
  selector: 'app-favorite-detail',
  templateUrl: './favorite-detail.page.html',
  styleUrls: ['./favorite-detail.page.scss'],
})
export class FavoriteDetailPage implements OnInit {

  article: Article;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private state: StateService
  ) { }

  ngOnInit() {

    this.article = this.router.getCurrentNavigation().extras.state as Article;
    this.state.activeTab.next('fav');
    this.state.activeSlide.next(this.article);
  }

  handleBack() {
    this.state.activeTab.next('fav-list');
    this.state.activeSlide.next(null);
  }

  async openBrowser(url) {
    await Browser.open({ url });
  }

}
