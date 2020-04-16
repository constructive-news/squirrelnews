import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/home/article';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from 'src/app/shared/state.service';
import { firestore } from 'firebase';
import { ArticlesService } from '../../articles.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.page.html',
  styleUrls: ['./article-detail.page.scss'],
})
export class ArticleDetailPage implements OnInit {

  routerState: { issue: string };
  currentArticles: Article[];

  constructor(
    private router: Router,
    private state: StateService,
    private articles: ArticlesService
  ) { }

  ngOnInit() {

    this.routerState = this.router.getCurrentNavigation().extras.state as { issue: string };
    this.state.activeTab.next('all-detail');
    this.articles.getArchiveList().pipe(
      map( data => data.get(this.routerState.issue))
    ).subscribe( result => this.currentArticles = result);

  }

  handleBack() {
    this.state.activeTab.next('all');
  }

}
