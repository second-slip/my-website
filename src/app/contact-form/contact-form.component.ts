import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactFormService } from './contact-form.service';
import { Subject, finalize, first, takeUntil } from 'rxjs';
import { IContactForm } from './i-contact-form.dto';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
  private _subscription = new Subject();

  public contactForm!: FormGroup;
  public requesting = false;
  public submitProgress: 'idle' | 'success' | 'error' = 'idle';

  constructor(private readonly _fb: FormBuilder, private readonly _service: ContactFormService) {
    this._createForm();
  }

  public onSubmit(): void {
    this.requesting = true;

    const model = this._mapToModel();

    this._service.postContactForm(model)
      .pipe(first(), finalize(() => { this.requesting = true; }), takeUntil(this._subscription))
      .subscribe({
        next: (r) => {
          if (r.success === true) { this.submitProgress = 'success'; }
          else { this.submitProgress = 'error' }
        },
        error: () => { this.submitProgress = 'error'; }
      });
  }

  private _createForm(): void {
    this.contactForm = this._fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  private _mapToModel(): IContactForm {  // todo: try / catch here: this.submitProgress = 'error';
    const form = <IContactForm>{
      name: this.contactForm.value.name,
      email: this.contactForm.value.email,
      message: this.contactForm.value.message
    };

    return form;
  }
}