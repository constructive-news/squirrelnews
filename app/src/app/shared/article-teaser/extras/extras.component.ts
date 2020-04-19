import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StateService } from '../../../state.service';
import { Plugins } from '@capacitor/core';
import { TranslatePipe } from '../../translate.pipe';
import { Router } from '@angular/router';

const { Browser } = Plugins;

@Component({
  selector: 'app-extras',
  templateUrl: './extras.component.html',
  styleUrls: ['./extras.component.scss'],
})
export class ExtrasComponent implements OnInit {

  constructor(
    private nav: NavController,
    private state: StateService,
    private router: Router
  ) { }

  ngOnInit() { }

  ionViewDidEnter() {
    this.state.activeTab.next('more');
  }

  openAll() {
    this.nav.navigateForward('tabs/issues/all');
  }

  openPrevious() {
    const urlSplit = this.router.routerState.snapshot.url.split('/');
    const previous = parseInt(urlSplit[urlSplit.length - 1], 10) + 1;
    console.log(previous);
    this.nav.navigateForward(`tabs/issues/${previous}`);
  }

  openFavorites() {
    this.nav.navigateForward('tabs/home/favorites');
  }

  switchLanguage() {
    const lang = this.state.activeLang.value === 'de' ? 'en' : 'de';
    console.log('new lang', lang);
    this.state.activeLang.next(lang);
  }

  openInBrowser(id: string) {
    const translate = new TranslatePipe(this.state);
    translate.transform(id).subscribe( translation => {
      Browser.open({url: translation});
    });
  }
}