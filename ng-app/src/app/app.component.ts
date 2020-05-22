import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { timer } from 'rxjs';

import { environment } from '../environments/environment';
import { StateService } from './shared/state.service';
import { switchMap, tap, skip } from 'rxjs/operators';

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
    private statusBar: StatusBar,
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
      ).subscribe( () => {
        console.log('lang switch')
      })
    });
  }
}
