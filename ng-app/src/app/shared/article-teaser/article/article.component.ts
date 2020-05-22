import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/home/article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {

  @Input() article: Article;
  @Input() issueTitle: string;
  @Input() intended: boolean;

  constructor() { }

  ngOnInit() {}

}
