import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss'],
})
export class MorePage implements OnInit {

  constructor(private nav: NavController) { }

  ngOnInit() {
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
