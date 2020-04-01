import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StateService } from '../shared/state.service';

@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss'],
})
export class MorePage implements OnInit {

  constructor(
    private nav: NavController,
    private state: StateService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.state.activeTab.next('more');
  }

  openAll() {
    this.nav.navigateForward('tabs/more/all');
  }

  openPrevious() {
    this.nav.navigateForward('tabs/more/previous');
  }

  openFavorites() {
    this.nav.navigateForward('tabs/more/favorites');
  }
}
