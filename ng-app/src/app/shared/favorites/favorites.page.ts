import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/shared/articles.service';
import { Article } from 'src/app/home/article';
import { ModalController, NavController,  } from '@ionic/angular';
import { Observable } from 'rxjs';
import { StateService } from '../state.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage {

  constructor(
    private nav: NavController,
    private state: StateService,
    public articles: ArticlesService,
  ) { }

  favorites: Observable<Article[]>;

  openDetail(article) {
    this.nav.navigateForward(`tabs/home/favorites/${article.title}`, { state: article });
  }

  ionViewWillEnter() {
    this.favorites = this.articles.getFavorites2();
    this.state.activeTab.next('fav-list');
    this.state.activeSlide.next(null);
    // this.articles.getFavorites2().subscribe();
  }

  ionViewWillLeave() {
    console.log('leaving favorites');

  }

}
