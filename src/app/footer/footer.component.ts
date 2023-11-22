import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: true,
    imports: [MatButtonModule]
})
export class FooterComponent {
  public message: string;

  constructor() {
    const year = new Date().getFullYear().toString();
    this.message = `\u00A9 ${year} Andrew Stuart Cross`
  }
}