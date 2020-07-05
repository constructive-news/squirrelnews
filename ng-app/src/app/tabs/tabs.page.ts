import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Plugins, PushNotificationToken, PushNotification, PushNotificationActionPerformed } from '@capacitor/core';
import { StateService } from '../shared/state.service';
import { ToastController, IonTabs, Platform } from '@ionic/angular';
import { TranslatePipe } from '../shared/translate.pipe';
import { combineLatest } from 'rxjs';

const {
  Share,
  Storage,
  PushNotifications
} = Plugins;
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
    private platform: Platform
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

    this.platform.ready().then(() => {
      if (this.platform.is('mobile') &&
        this.platform.is('ios') ||
        this.platform.is('android')
      ) {

        PushNotifications.requestPermission().then(result => {
          if (result.granted) {
            // Register with Apple / Google to receive push via APNS/FCM
            console.log('it was granted')
            PushNotifications.register();
          } else {
            // Show some error
            console.log('error requesting permission');
            // On success, we should be able to receive notifications
          }
        });

        PushNotifications.addListener('registration',
          (token: PushNotificationToken) => {
            console.log('registered', token.value);
            // alert('Push registration success, token: ' + token.value);
          }
        );

        // Some issue with our setup and push will not work
        PushNotifications.addListener('registrationError',
          (error: any) => {
            console.log('registration error', error);
            // alert('Error on registration: ' + JSON.stringify(error));
          }
        );

        // Show us the notification payload if the app is open on our device
        PushNotifications.addListener('pushNotificationReceived',
          (notification: PushNotification) => {
            console.log('push received', notification);
            // alert('Push received: ' + JSON.stringify(notification));
          }
        );

        // Method called when tapping on a notification
        PushNotifications.addListener('pushNotificationActionPerformed',
          (notification: PushNotificationActionPerformed) => {
            console.log('push performed', notification);
            // alert('Push action performed: ' + JSON.stringify(notification));
          }
        );
      }

    })
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
    const translate = new TranslatePipe(this.state);
    combineLatest([
      translate.transform('share.title'),
      translate.transform('share.text')]).subscribe(async translation => {
        await Share.share({
          dialogTitle: translation[0],
          title: translation[0],
          url: this.url,
          text: translation[1]
        }).catch(err => {
          this.noSharingOptionsAvailable();
        });
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
    if ((this.state.activeSlide.value === null || this.state.activeSlide.value === undefined) &&
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
