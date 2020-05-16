import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/shared/articles.service';
import { Observable } from 'rxjs';
import { Article } from 'src/app/home/article';
import { map } from 'rxjs/operators';
import { NavController } from '@ionic/angular';
import { StateService } from 'src/app/shared/state.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.page.html',
  styleUrls: ['./all.page.scss'],
})
export class AllPage implements OnInit {

  articles$: Map<number, { articles: Article[], expanded: boolean}>;
  issues = [];
  constructor(
    private nav: NavController,
    public articles: ArticlesService,
    private state: StateService
  ) { }

  ngOnInit() {
    this.articles.getArchiveList().pipe(
      // map( data => {
      //   const mapped = new Map<number, { articles: Article[], expanded: boolean}>();
      //   data.forEach( (value, key) => {
      //     mapped.set(key, { articles: value, expanded: false});
      //   });

      //   return mapped;
      // })
      map( data => [ ...data.keys() ])
    ).subscribe( result => this.issues = result );
  }

  expand(key) {
    const issue = this.articles$.get(key);
    issue.expanded = !issue.expanded;
    this.articles$.set(key, issue);
  }

  openDetails(issue: string) {
    this.nav.navigateForward(`tabs/home/all/${issue}`, { state: { issue } });
  }

  handleBack() {
    this.state.activeTab.next('all');
  }
}
