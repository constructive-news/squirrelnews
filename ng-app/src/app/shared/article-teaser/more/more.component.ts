import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StateService } from '../../state.service';
import { Plugins } from '@capacitor/core';
import { TranslatePipe } from '../../translate.pipe';
import { ActivatedRoute } from '@angular/router';

const { Browser } = Plugins;

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss'],
})
export class MoreComponent implements OnInit {


  issueIdx: number;

  constructor(
    private nav: NavController,
    private route: ActivatedRoute,
    private state: StateService
  ) { }


  ngOnInit() {
    this.issueIdx = parseInt(this.route.snapshot.paramMap.get('issueId'), 10) || 0;
  }

  openAll() {
    this.nav.navigateForward('tabs/home/all');
  }

  openPrevious() {
    this.nav.navigateForward(`tabs/home/previous/${this.issueIdx + 1}`);
  }

  openFavorites() {
    this.nav.navigateForward('tabs/home/favorites');
  }

  switchLanguage() {
    const lang = this.state.activeLang.value === 'de' ? 'en' : 'de';
    this.state.activeLang.next(lang);
  }

  openInBrowser(id: string) {
    const translate = new TranslatePipe(this.state);
    translate.transform(id).subscribe( translation => {
      Browser.open({url: translation});
    });
  }
}