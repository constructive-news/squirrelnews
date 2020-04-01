import { Injectable } from '@angular/core';
import { Article } from '../home/article';
import { Observable, from, concat, of, combineLatest, forkJoin } from 'rxjs';
import { filter, toArray, tap, flatMap, concatMap, take, map, distinct, mapTo, combineAll, skip } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;
@Injectable()
export class ArticlesService {

  constructor(
    private db: AngularFirestore,
  ) { }


  /** returns articles from current issue */
  public getCurrentIssue(date: Date = new Date()): Observable<Article[]> {

    return this.getArticles().pipe(
      // filter current Issue
      flatMap(data => {
        // get filtered list of current issue by fitlering over the array
        const filtered = data.filter((article: Article) =>
          environment.flag === 'prod' ? article.published
            : true);
        return filtered;
      }),
      take(10),
      toArray(),
      tap((data: Article[]) => data.sort((a, b) => a.position < b.position ? -1 : 1)),
    );
  }

  public getArchiveList() {
    return this.db.collection<Article>('news', ref => ref.orderBy('issue', 'asc')).snapshotChanges().pipe(
      map(actions => actions.map(action => action.payload.doc.data() as Article)),
      map((data: Article[]) => {
        const result = new Map<number, Article[]>();
        data.forEach(item => {
          const value = [...result.get(item.issue) || [], item];
          result.set(item.issue, value.sort((a, b) => a.position < b.position ? -1 : 1));
        });
        return result;
      }),
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

    return this.db.collection<Article>('news', ref => ref.orderBy('date', 'desc'))
      .valueChanges();
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
