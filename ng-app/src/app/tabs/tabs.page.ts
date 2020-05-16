import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { StateService } from '../shared/state.service';
import { ToastController, IonTabs } from '@ionic/angular';

const { Share, Storage } = Plugins;
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit, OnDestroy {

  @ViewChild('tabs') tabs: IonTabs;

  url: string = null;
  articleID: string = null;

  favorites: string[];
  favorite: boolean;
  activeTab: string;
  ACTIVE_TABS = ['home', 'fav', 'all', 'previous'];
  canActivate: boolean;

  constructor(
    public state: StateService,
    private toastController: ToastController,
  ) { }


  ngOnInit() {
    this.state.activeSlide
      .subscribe(slide => {
        this.url = slide ? slide.url : null;
        this.articleID = slide ? slide.articleId : null;
        this.checkFav().then(result => this.favorite = result);
        this.checkCanActivate().then(result => {
          this.canActivate = result;
        });
      });

    this.state.activeTab.subscribe(tab => {
      this.activeTab = tab;
      if (this.ACTIVE_TABS.includes(this.activeTab)) {
        this.checkFav().then(result => this.favorite = result);
        this.checkCanActivate().then(result => {
          this.canActivate = result;
        });
      } else {
        this.canActivate = false;
        this.favorite = false;
      }
    });
  }

  ngOnDestroy() {
    this.state.activeSlide.unsubscribe();
    this.state.activeTab.unsubscribe();
  }

  handleTabSwitch() {
    this.state.activeTab.next(this.tabs.getSelected());
  }

  handleDoubleClick() {
    this.state.activeSlideIndex.next(0);
  }

  async handleShareTapped() {
    await Share.share({
      dialogTitle: 'Nachricht teilen...',
      title: 'Nachricht teilen...',
      url: this.url,
      text: 'Schau dir das mal an'
    }).catch(err => {
      this.noSharingOptionsAvailable();
    });
  }

  handleHeartTapped() {
    this.setFavorite();
  }


  private async checkFav() {
    const favs: { articles: string[] } = await this.getFavorites();
    return favs ? favs.articles.filter(item => item === this.articleID).length > 0 ? true : false
      : false;

  }

  private async checkCanActivate() {
    if ( (this.state.activeSlide.value === null || this.state.activeSlide.value === undefined) &&
          this.ACTIVE_TABS.includes(this.activeTab)) {
      return false;
    } else if (this.ACTIVE_TABS.includes(this.activeTab)) {
      return true;
    } else {
      return false;
    }
  }

  private async getFavorites() {
    return JSON.parse((await Storage.get({ key: 'favorites' })).value);
  }

  private async setFavorite() {
    this.getFavorites().then(data => {
      const favs: string[] = data ? data.articles : [];
      let index = -1;
      favs.forEach((item, i) => {
        if (item === this.articleID) {
          index = i;
        }
      });

      index < 0 ? favs.push(this.articleID)
        : favs.splice(index, 1);

      Storage.set({
        key: 'favorites',
        value: JSON.stringify({ articles: favs })
      }).then(
        () => {
          this.checkFav().then(result => this.favorite = result);
        }
      );
    });
  }

  private async noSharingOptionsAvailable() {
    const toast = await this.toastController.create({
      header: 'Oops',
      message: 'Keine Funktion zum Teilen verfügbar',
      position: 'middle',
      // color: 'warn',
      duration: 3000
    });

    toast.present();
  }

}
