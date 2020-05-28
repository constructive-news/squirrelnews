import { Component, OnInit, Input, ViewChild, OnDestroy, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Article } from 'src/app/home/article';
import { Plugins } from '@capacitor/core';
import { StateService } from '../state.service';
import { IonSlides } from '@ionic/angular';
import { skip, tap } from 'rxjs/operators';


const { Browser } = Plugins;

@Component({
  selector: 'app-article-teaser',
  templateUrl: './article-teaser.component.html',
  styleUrls: ['./article-teaser.component.scss'],
})
export class ArticleTeaserComponent implements AfterViewInit {

  @Input() articles: Article[];
  @Input() issue: any;
  @Input() hasMore: boolean;
  @Input() intended: boolean;
  
  @Output() notifySlideChanged = new EventEmitter<number>();

  @ViewChild('articleSlider') slider: IonSlides;

  constructor(
    private state: StateService
  ) { }

  ngAfterViewInit() {
    this.slider.getActiveIndex().then( index => {
      this.state.activeSlideIndex.next(0);
    } );

    this.state.activeLang.pipe(
      skip(1),
      tap( () => this.slider.slideTo(0))
    ).subscribe()
  }

  async openBrowser(url) {
    await Browser.open({ url });
  }

  handleSlideChange() {
    this.slider.getActiveIndex().then( index => {
      this.state.activeSlideIndex.next(index);


    }, (err) => {
      console.log('something went wrong', err);
    });
  }



}
