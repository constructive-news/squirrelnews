import { Component } from '@angular/core';
import {  Location } from '@angular/common';
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
  App
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
    private location: Location
  ) {
    this.initializeApp();

    timer(3000).subscribe(() => this.showSplash = false);

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.state.activeLang.pipe(
        skip(1),
        tap(() => {
          this.showSplash = true;
        }),
        switchMap(() => timer(2000)),
        tap(() => {
          this.nav.navigateRoot('/');
          this.showSplash = false;
        }),
      ).subscribe();

      if (this.platform.is('mobile') && (this.platform.is('ios') || this.platform.is('android'))) {
        StatusBar.setStyle({
          style: StatusBarStyle.Dark
        });

        this.platform.backButton.subscribeWithPriority(-1, () => {
          if(!(window.history.length > 1)) App.exitApp();
        })
      }


      this.state.loading
        .pipe(
          tap(event => this.showSplash = event)
        )
        .subscribe();
    });
  }
}
