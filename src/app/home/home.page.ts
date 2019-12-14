import { Component, OnInit } from '@angular/core';
import { ArticlesService } from './articles.service';
import { Article } from './models/article';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  articles: Observable<Article[]>

  constructor( private articalsService: ArticlesService) {}

  ngOnInit() {
    this.articles = this.articalsService.getArticles()
  }

}
