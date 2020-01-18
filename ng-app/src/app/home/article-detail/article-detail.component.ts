import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit {
  @Input() url: string
  constructor(private modal: ModalController) { }

  ngOnInit() {}

  dismiss() {
    this.modal.dismiss();
  }

}
