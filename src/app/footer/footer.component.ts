import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: true,
    imports: [MatButtonModule]
})
export class FooterComponent {
  public message = signal('');

  constructor() {
    const year = new Date().getFullYear().toString();
    this.message.set(`\u00A9 2023 \u2014 ${year} Andrew Stuart Cross`);
  }
}