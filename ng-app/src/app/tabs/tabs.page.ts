import { Component, OnInit, OnDestroy } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { StateService } from '../shared/state.service';
import { ToastController } from '@ionic/angular';
import { tap } from 'rxjs/operators';

const { Share, Storage } = Plugins;
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit, OnDestroy {

  url: string = null;
  title: string = null;

  favorites: string[];

  favorite: boolean;

  constructor(
    private state: StateService,
    private toastController: ToastController
  ) { }


  ngOnInit() {
    this.state.activeSlide
      // .pipe(
      //   tap( x => console.log('sub ctive slide', x))
      // )
      .subscribe(slide => {
        this.url = slide ? slide.url : '';
        this.title = slide ? slide.title : '';

        this.checkFav().then( result => this.favorite = result );

      });

  }

  ngOnDestroy() {
    this.state.activeSlide.unsubscribe();
  }

  async handleShareTapped() {
    await Share.share({
      dialogTitle: 'Nachricht teilen mit...',
      title: 'Nachricht teilen mit...',
      url: this.url,
    }).catch(err => {
      this.noSharingOptionsAvailable();
    });
  }

  handleHeartTapped() {
    this.setFavorite();
  }

  private async checkFav() {
    const favs: { titles: string[] } = await this.getFavorites();
    console.log('favs', favs, 'active', this.title);
    return favs ? favs.titles.filter(item => item === this.title).length > 0 ? true : false
                : false;

  }

  private async getFavorites() {
    return JSON.parse((await Storage.get({ key: 'favorites' })).value);
  }

  private async setFavorite() {
    this.getFavorites().then(data => {
      const favs: string[] = data ? data.titles : [];
      let index = -1;
      favs.forEach((item, i) => {
        if (item === this.title) {
          index = i;
        }
      });
      
      console.log('set Favorite', favs, this.title, index);
      index < 0 ? favs.push(this.title)
        : favs.splice(index, 1);

      console.log({ titles: favs });

      Storage.set({
        key: 'favorites',
        value: JSON.stringify({ titles: favs })
      }).then(
        () => {
          this.checkFav().then( result => this.favorite = result );
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
