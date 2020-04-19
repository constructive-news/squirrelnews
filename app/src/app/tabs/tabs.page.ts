import { Component } from '@angular/core';
import { StateService } from '../state.service';
import { tap, delay } from 'rxjs/operators';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  showSplash = false;

  constructor(
    private state: StateService
  ) {}


  ionViewDidEnter() {
    this.state.activeLang.pipe(
      tap( () => this.showSplash = true ),
      delay(1000),
      tap( () => this.showSplash = false ),
      )
    .subscribe();
  }

}
