import { Component, OnInit, Renderer2, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-expandable',
  templateUrl: './expandable.component.html',
  styleUrls: ['./expandable.component.scss'],
})
export class ExpandableComponent implements OnInit, AfterViewInit {

  @ViewChild('expandWrapper') expandWrapper: ElementRef;
  @Input() expanded: boolean;
  @Input() expandHeight = '150px';

  constructor(
    public renderer: Renderer2
  ) { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.renderer.setStyle(this.expandWrapper.nativeElement, 'max-height', this.expandHeight);
  }

}
