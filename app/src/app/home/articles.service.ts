import { Injectable } from '@angular/core';
import { Article } from './models/article';
import { Observable, from } from 'rxjs';
import { filter, toArray, tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable()
export class ArticlesService {

  private data: Article[] = [
    { 
      id: 1,
      name: "Sternschnuppen Schauer am Wochenende", date: new Date('yyyy-mm-dd').toDateString(), 
      origin: "Spiegel Online", 
      originURL: 'https://www.spiegel.de/wissenschaft/natur/klimakonferenz-in-madrid-droht-zu-scheitern-a-1301283.html',
      teaser: `
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, 
      sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. 
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. 
      At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.`, 
      imageURL: 'https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      imageSource: '',
      category: 'weather'
    },
    { 
      id: 2,
      name: "Sternschnuppen Schauer am Wochenende", date: new Date('yyyy-mm-dd').toDateString(), 
      origin: "Spiegel Online", 
      originURL: 'https://www.spiegel.de/wissenschaft/natur/klimakonferenz-in-madrid-droht-zu-scheitern-a-1301283.html',
      teaser: `
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, 
      sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. 
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. 
      At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.`, 
      imageURL: 'https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      imageSource: ''
    },
    { 
      id: 3,
      name: "Sternschnuppen Schauer unter der Woche", date: new Date('yyyy-mm-dd').toDateString(), 
      origin: "Spiegel Online", 
      originURL: 'https://www.spiegel.de/wissenschaft/natur/klimakonferenz-in-madrid-droht-zu-scheitern-a-1301283.html',
      teaser: `
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, 
        sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. 
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. 
        At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.`, 
      imageURL: '',
      imageSource: ''
    }
  ]

  constructor(
    private db: AngularFirestore
  ) {

    this.db.collection('news').valueChanges()
      .pipe(
        tap( data => console.log(data))
      )
      .subscribe();
  }

  public getArticles(date: Date = new Date('yyyy-mm-dd')): Observable<Article[]> {

    return from(this.data).pipe(
      filter( (article: Article) => article.date === date.toDateString() ),
      toArray()
    )
  }
}
