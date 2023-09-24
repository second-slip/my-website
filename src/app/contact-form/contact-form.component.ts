import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactFormService } from './contact-form.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
  public contactForm!: FormGroup;

  constructor(private readonly _fb: FormBuilder, private readonly _service: ContactFormService) {
    this._createForm();
  }


  // public processForm(): void {}


  private _createForm(): void {
    this.contactForm = this._fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    })

    // public contactForm = new FormGroup({
    //   name: new FormControl('', Validators.required),
    //   email: new FormControl('', [Validators.required, Validators.email]),
    //   message: new FormControl('', [Validators.required, Validators.minLength(10)])
    // });
  }
}
