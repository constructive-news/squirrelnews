import { Component, OnInit, Input, ViewChild } from '@angular/core';
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
export class ArticleTeaserComponent implements OnInit {

  @Input() articles: Article[];
  @Input() hasMore: boolean;

  @ViewChild('articleSlider') slider: IonSlides;

  constructor(
    private state: StateService
  ) { }

  ngOnInit() {
    // this.state.activeSlide
    // .subscribe(slide => this.url = slide ? slide.url : '');
  }


  async openBrowser(url) {
    await Browser.open({ url });
  }

  async handleSlideChange() {
    const index = await this.slider.getActiveIndex();
    const data = this.articles[index] || null;
    this.state.activeSlide.next(data);
  }

}
