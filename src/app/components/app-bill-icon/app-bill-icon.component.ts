import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-app-bill-icon',
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

  @Input() name = 'logo-ionic';
  @Input() value: number | undefined;
}
