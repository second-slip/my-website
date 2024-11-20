import { Component } from '@angular/core';
import { ContactFormComponent } from '../contact-form/contact-form.component';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    imports: [ContactFormComponent]
})
export class AboutComponent { }