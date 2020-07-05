import { Injectable } from '@angular/core';
import { Article } from '../home/article';
import { Observable, from, of, combineLatest, zip } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Plugins } from '@capacitor/core';
import { StateService } from './state.service';
import { REFERENCE_PREFIX } from '@angular/compiler/src/render3/view/util';

const { Storage } = Plugins;
@Injectable()
export class ArticlesService {

  constructor(
    private db: AngularFirestore,
    private state: StateService
  ) { }

  public getCurrentIssue2(issueIndex: number) {
    return zip(
      this.state.activeLang,
      this.db.collection('issues', ref => ref
        .where('language', '==', this.state.activeLang.value)
        .orderBy('publishedAt', 'desc')).valueChanges({ idField: 'issueId' }),
    ).pipe(
      // tap( data => console.log('query result', issueIndex, data, this.state.activeLang.value)),
      map(([lang, data]: any[]) => {
        // forget about the language and abort criteria: return empty array if index is out of issues
        const result = issueIndex < data.length ? data[issueIndex] : [];
        return result;
      }),
      // tap(data => console.log('issue', data)),
      switchMap((issue: any) =>
        // abort criteria: return empty stream if index is out of issueId does not exist
        zip(
          of(issue),
          issue.issueId ? this.db.collection(`issues/${issue.issueId}/articles`, ref => ref.orderBy('position')).valueChanges({ idField: 'articleId' }) : of([])
        )
      ),
      map(([issue, articles]) => ({ issue, articles })),
      tap(data => console.log('result', data))
    );
  }

  // public getAllissues() {
  //   return this.db.collection('issues', ref => ref.orderBy('publishedAt', 'desc'));
  // }


  public getArchiveList() {
    return this.db.collection<Article>('news', ref => ref
      .where('language', '==', this.state.activeLang.value)
      .orderBy('issue', 'asc')).snapshotChanges().pipe(
        map(actions => actions.map(action => action.payload.doc.data() as Article)),
        map((data: Article[]) => {
          const result = new Map<string, Article[]>();
          data.forEach(item => {
            const value = [...result.get(item.issue) || [], item];
            // const languageFiltered = value.filter( article => article.language === this.state.activeLang.value);
            result.set(item.issue, value.sort((a, b) => a.position < b.position ? -1 : 1));
          });
          return result;
        })
      );
  }

  public getFavorites2(): Observable<any> {
    return from(Storage.get({ key: 'favorites' })).pipe(
      map(favs => favs.value),
      switchMap(favs => {
        return zip( of(favs), this.db.collection('issues').valueChanges({idField: 'id'}))
      }),
      switchMap( ([favs, issues] ) =>
        zip(
          of(JSON.parse(favs).articles),
          combineLatest(
            [...issues.map(issue => this.db.collection(`issues/${issue.id}/articles`).valueChanges({ idField: 'articleId' }) ) ] )
            .pipe(
              map( data => data.reduce( (prev: any[], curr: any[]) => prev.concat(curr)) )
            )
        )
      ),
      map( ([favs, articles]) => articles.filter( article => favs.includes(article.articleId) )),
    )
  }


  private getISO8601WeekNumber(dt: Date) {
    const tdt = new Date(dt.valueOf());
    const dayn = (dt.getDay() + 6) % 7;
    tdt.setDate(tdt.getDate() - dayn + 3);
    const firstThursday = tdt.valueOf();
    tdt.setMonth(0, 1);
    if (tdt.getDay() !== 4) {
      tdt.setMonth(0, 1 + ((4 - tdt.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((firstThursday - tdt.getTime()) / 604800000);
  }

}
