import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar as StatusBarConfig } from '@ionic-native/status-bar/ngx';

import { timer } from 'rxjs';

import { Plugins, StatusBarStyle } from '@capacitor/core';

import { environment } from '../environments/environment';
import { StateService } from './shared/state.service';
import { switchMap, tap, skip } from 'rxjs/operators';

const { 
  StatusBar,
} = Plugins;


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  showSplash = false;
  flag = environment.flag;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBarConfig,
    private state: StateService,
    private nav: NavController,
  ) {
    this.initializeApp();

    timer(3000).subscribe( () => this.showSplash = false);

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.state.activeLang.pipe(
        skip(1),
        tap( () => {
          this.showSplash = true;
        }),
        switchMap( () => timer(2000) ),
        tap( () => {
          this.showSplash = false;
          this.nav.navigateRoot('/');
        }),
      ).subscribe();

      StatusBar.setStyle({
        style: StatusBarStyle.Dark
      });

    });
  }
}
