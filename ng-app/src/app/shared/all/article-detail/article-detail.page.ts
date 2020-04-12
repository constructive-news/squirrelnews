import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/home/article';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from 'src/app/shared/state.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.page.html',
  styleUrls: ['./article-detail.page.scss'],
})
export class ArticleDetailPage implements OnInit {

  article: Article;

  constructor(
    private router: Router,
    private state: StateService
  ) { }

  ngOnInit() {

    this.article = this.router.getCurrentNavigation().extras.state as Article;
    this.state.activeTab.next('all');
    this.state.activeSlide.next(this.article);
  }

  handleBack() {
    this.state.activeTab.next('more');
  }

}
