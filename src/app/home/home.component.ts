import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    // styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [RouterLink]
})
export class HomeComponent { }