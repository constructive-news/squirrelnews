import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StateService } from '../../state.service';
import { Plugins } from '@capacitor/core';
import { TranslatePipe } from '../../translate.pipe';

const { Browser } = Plugins;

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss'],
})
export class MoreComponent implements OnInit {

  constructor(
    private nav: NavController,
    private state: StateService
  ) { }

  ngOnInit() { }

  ionViewDidEnter() {
    this.state.activeTab.next('more');
  }

  openAll() {
    this.nav.navigateForward('tabs/home/all');
  }

  openPrevious() {
    this.nav.navigateForward('tabs/home/previous');
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