import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StateService } from '../shared/state.service';
import { Plugins } from '@capacitor/core';
import { TranslatePipe } from '../shared/translate.pipe';
import { take } from 'rxjs/operators';


const { Browser } = Plugins;


@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss'],
})
export class MorePage implements OnInit {

  constructor(
    private state: StateService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.state.activeTab.next('more');
  }

  openInBrowser(id: string) {
    const translate = new TranslatePipe(this.state);
    translate.transform(id).pipe(
      take(1)
    ).subscribe( translation => {
      console.log('translated');
      Browser.open({url: translation});
    });
  }

  switchLanguage() {
    const lang = this.state.activeLang.value === 'de' ? 'en' : 'de';
    this.state.activeLang.next(lang);
  }
}
