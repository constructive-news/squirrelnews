import { Injectable } from '@angular/core';
import { Article } from './article';
import { Observable, from } from 'rxjs';
import { filter, toArray, tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable()
export class ArticlesService {


  constructor(
    private db: AngularFirestore
  ) {}

  public getArticles(date: Date = new Date('yyyy-mm-dd')): Observable<Article[]> {

    return this.db.collection<Article>('news').valueChanges()
      .pipe(
        tap( data => console.log('firebase', data))
      );
  }
}
