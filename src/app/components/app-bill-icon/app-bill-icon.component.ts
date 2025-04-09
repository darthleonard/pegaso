import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bill-icon',
  templateUrl: './app-bill-icon.component.html',
  styles: [
    `
      .tooltip {
        --width: auto;
      }
    `,
  ],
  standalone: false,
})
export class AppBillIconComponent {
  constructor() {}

  @Input() group = '';
  @Input() name = 'logo-ionic';
  @Input() value: number | undefined;
}
