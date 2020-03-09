import { Injectable } from '@angular/core';
import { Article } from './article';
import { Observable, from, concat } from 'rxjs';
import { filter, toArray, tap, flatMap, concatMap, take, map, distinct, mapTo } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable()
export class ArticlesService {


  constructor(
    private db: AngularFirestore
  ) { }


  /** returns articles from current issue */
  public getCurrentIssue(date: Date = new Date()): Observable<Article[]> {

    const currentIssue = this.getISO8601WeekNumber(date);
    console.log(currentIssue);
    return this.getArticles().pipe(
      // filter current Issue
      map(data => {
        // get filtered list of current issue by fitlering over the array
        const filtered = data.filter( (article: Article) => article.issue === currentIssue);
        return filtered;
      }),
      tap(data => console.log('current', currentIssue, data)),
      // toArray(),
      tap( (data: Article[]) => data.sort( (a, b) => a.position < b.position ? -1 : 1) ),
    );
  }

  public getArchiveList() {
    return this.db.collection<Article>('news').snapshotChanges().pipe(
      // take(1),
      map(actions => actions.map(action => action.payload.doc.data() as Article)),
      // concatMap( x => x),
      map( (data: Article[]) => {

        const result = new Map<number, Article[]>();
        data.forEach( item => {
          const value = [...result.get(item.issue) || [], item];
          result.set(item.issue, value.sort( (a, b) => a.position < b.position ? -1 : 1 ) );
        });
        return result;
      }),
      );
  }

  // public getIssue(issue: number): Observable<Article[]> {
  //   return this.getArticles().pipe(
  //     filter(article => article.issue === issue),
  //     toArray(),
  //   );
  // }


  private getArticles(date: Date = new Date('yyyy-mm-dd')): Observable<Article[]> {

    return this.db.collection<Article>('news').valueChanges()
      // .pipe(
        // converting Observable<Article[]> to stream of Article <Article> for further data transformation
        // concatMap(data => data),
        // there may be more, but only take 10 per issue
        // take(10),
      // );
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
