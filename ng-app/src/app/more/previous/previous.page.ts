import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticlesService } from 'src/app/shared/articles.service';
import { StateService } from 'src/app/shared/state.service';
import { Article } from 'src/app/home/article';
import { IonSlides } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { Browser } = Plugins;

@Component({
  selector: 'app-previous',
  templateUrl: './previous.page.html',
  styleUrls: ['./previous.page.scss'],
})
export class PreviousPage implements OnInit {

  @ViewChild('articleSlider') slider: IonSlides;

  articles: Article[] = [];
  url: string = null;

  constructor(
    private articlesService: ArticlesService,
    private state: StateService
  ) { }

  ngOnInit() {

    this.articlesService.getPrevious().subscribe( result => {
      this.articles = result;
    });

    this.state.activeSlide
    .subscribe( slide => this.url = slide ? slide.url : '');

    this.state.activeTab.next('previous');
  }

  async handleSlideChange( ) {
    const index = await this.slider.getActiveIndex();
    this.state.activeSlide.next(this.articles[index]);
  }

  async openBrowser() {
    console.log('open browser', this.url);
    await Browser.open({ url: this.url });
  }

}
