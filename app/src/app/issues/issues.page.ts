import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ArticlesService } from '../articles.service';
import { Article } from '../models/article.model';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.page.html',
  styleUrls: ['./issues.page.scss'],
})
export class IssuesPage implements OnInit, OnDestroy {

  currentArticles: Article[];

  constructor(
    private router: Router,
    private articles: ArticlesService
  ) { }

  ngOnInit() {
    const urlSegments = this.router.routerState.snapshot.url.split('/');
    const toSkip = parseInt(urlSegments[urlSegments.length - 1], 10);
    console.log('toSkip', toSkip);
    this.articles.getCurrentIssue(toSkip).subscribe( result => this.currentArticles = result);
  }

  ngOnDestroy() {
  }

}
