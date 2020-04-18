import { Component, OnInit, Input, ViewChild, OnDestroy, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Article } from 'src/app/home/article';
import { Plugins } from '@capacitor/core';
import { StateService } from '../state.service';
import { IonSlides } from '@ionic/angular';


const { Browser } = Plugins;

@Component({
  selector: 'app-article-teaser',
  templateUrl: './article-teaser.component.html',
  styleUrls: ['./article-teaser.component.scss'],
})
export class ArticleTeaserComponent implements AfterViewInit {

  @Input() articles: Article[];
  @Input() hasMore: boolean;
  @Output() notifySlideChanged = new EventEmitter<number>();

  @ViewChild('articleSlider') slider: IonSlides;

  constructor(
    private state: StateService
  ) { }

  ngAfterViewInit() {
    console.log('article teaser view init');
    this.slider.getActiveIndex().then( index => {
      console.log('index after init', index)
      this.state.activeSlideIndex.next(0);
    } );1

    // this.state.activeSlideIndex.subscribe( index => this.slider.slideTo(index));
  }

  async openBrowser(url) {
    await Browser.open({ url });
  }

  handleSlideChange() {
    console.log('slide changed');
    this.slider.getActiveIndex().then( index => {
      console.log('active index', index);
      this.state.activeSlideIndex.next(index);

    }, (err) => {
      console.log('something went wrong', err);
    });
    
  }

}
