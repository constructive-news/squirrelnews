import { Injectable } from '@angular/core';
import { Article } from './models/article.model';
import { Observable, from, combineLatest, zip } from 'rxjs';
import { toArray, tap, flatMap, take, map, skip, withLatestFrom } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { Plugins } from '@capacitor/core';
import { StateService } from './state.service';

const { Storage } = Plugins;
@Injectable()
export class ArticlesService {

  constructor(
    private db: AngularFirestore,
    private state: StateService
  ) { }


  /** returns articles from current issue */
  public getCurrentIssue(toSkip: number = 0): Observable<Article[]> {
    return zip(
      this.state.activeLang,
      this.db.collection<Article>('news', ref => ref
      .where( 'language', '==', this.state.activeLang.value)
      .orderBy('date', 'desc'))
      .valueChanges()).pipe(
      // filter current Issue
      tap(data => console.log('value', data)),
      map( ([lang, data]) => data),
      // map( (actions: DocumentChangeAction<Article>[]) => actions.map(action => action.payload.doc.data() as Article)),
      // tap(data => console.log('just data', data)),
      map(data => {
        // get filtered list of current issue by fitlering over the array
        let i = 0;
        const filtered = data.filter((article) => {
          let result = false;
          if( i < 10) {

            result = environment.flag === 'prod' ? article.published : true;
            if (result) {
              i++;
            }
          }

          return result;
        });
        return filtered;
      }),
      skip(toSkip * 10 ), // skip num of issues
      take(10), // take next 10 articles for the requested issue
      // toArray(),
      tap((data: Article[]) => data.sort((a, b) => a.position < b.position ? -1 : 1)),
      tap(data => console.log('current', data) ),
    );
  }

  public getArchiveList() {
    return this.db.collection<Article>('news', ref => ref
      .where( 'language', '==', this.state.activeLang.value)
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

  public getFavorites() {
    return combineLatest([this.db.collection<Article>('news').snapshotChanges(), from(Storage.get({ key: 'favorites' }))])
      .pipe(
        map(([actions, favorites]) => [actions.map(action => action.payload.doc.data() as Article), JSON.parse(favorites.value)]),
        map((data) => {
          const articles = data[0];
          const favorites = data[1];
          return articles.filter(article => favorites.titles.includes(article.title));
        }),
        tap(data => console.log(data)),
      );
  }

  public getPrevious() {
    return this.getArticles().pipe(
      // filter current Issue
      flatMap(data => {
        // get filtered list of current issue by fitlering over the array
        const filtered = data.filter((article: Article) =>
          environment.flag === 'prod' ? article.published
            : true);
        return filtered;
      }),
      skip(10),
      take(10),
      toArray(),
      tap((data: Article[]) => data.sort((a, b) => a.position < b.position ? -1 : 1)),
    );
  }

  private getArticles(date: Date = new Date('yyyy-mm-dd')): Observable<Article[]> {

    return this.state.activeLang.pipe(
        tap( data => console.log('trigger', data, this.state.activeLang.value)),
        withLatestFrom( this.db.collection<Article>('news', ref => ref
                                                                  .where( 'language', '==', this.state.activeLang.value)
                                                                  .orderBy('date', 'desc'))
          .valueChanges(), (lang, data) => data ),
        // map( (actions: DocumentChangeAction<Article>[]) => actions.map(action => action.payload.doc.data() as Article)),
        tap(data => console.log('getArticles', data)),
        // map( data => data[1]),
      );
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
