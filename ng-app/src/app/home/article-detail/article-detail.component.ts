import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';

const { Browser } = Plugins;

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit {
  @Input() url: string;



  constructor(private modal: ModalController) { }

  ngOnInit() {
    this.openBrowser();
  }

  async openBrowser() {
    await Browser.open({ url: this.url });
  }

  dismiss() {
    this.modal.dismiss();
  }

}
