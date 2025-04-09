import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  standalone: false
})
export class AppHeaderComponent {

  constructor() { }

  @Input() title: string = 'App Header';
  @Input() defaultHref?: string;

}
