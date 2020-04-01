import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/shared/articles.service';
import { Article } from 'src/app/home/article';
import { ModalController, NavController,  } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  constructor(
    private nav: NavController,
    public articles: ArticlesService
  ) { }

  favorites: Observable<Article[]>;

  ngOnInit() {
    console.log('favorites list');
  }

  openDetail(article) {
    this.nav.navigateForward(`tabs/more/favorites/${article.title}`, { state: article });
  }

  ionViewDidEnter() {
    this.favorites = this.articles.getFavorites();
    console.log('hello');
  }

}
