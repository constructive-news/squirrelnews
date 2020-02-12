import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { ArticlesService } from './articles.service';
import { Article } from './article';
import { ArticleDetailComponent } from './article-detail/article-detail.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  articles: Observable<Article[]>

  constructor( 
    private articalsService: ArticlesService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.articles = this.articalsService.getArticles()
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

}
