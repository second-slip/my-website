import { Component } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./nav-bar/nav-bar.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [NavBarComponent, RouterOutlet, FooterComponent, NavBarComponent]
})
export class AppComponent {
  title = 'A S Cross';
}
