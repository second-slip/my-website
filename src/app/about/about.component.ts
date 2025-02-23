import { Component } from '@angular/core';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  imports: [ContactFormComponent, NgOptimizedImage],
})
export class AboutComponent {}
