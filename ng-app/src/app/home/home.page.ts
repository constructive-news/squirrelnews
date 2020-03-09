import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class HomePage implements OnInit, OnDestroy {

  currentArticles: Article[] = [];

  archive: Map<number, Article[]>;

  constructor(
    private articlesService: ArticlesService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.articlesService.getCurrentIssue().subscribe( result => {
      console.log(result);
      this.currentArticles = result;
    });

    this.articlesService.getArchiveList().subscribe( result => {
      this.archive = result;
  });
  }

  ngOnDestroy() {
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
