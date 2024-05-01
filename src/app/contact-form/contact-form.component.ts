import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ContactFormService } from './contact-form.service';
import { Subject, finalize, first, takeUntil } from 'rxjs';
import { IContactForm } from './i-contact-form.dto';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule]
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

    try {
      const model = this._mapToModel();

      this.requesting = true;

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
    catch {
      this.submitProgress = 'error';
    }
  }

  private _createForm(): void {
    this.contactForm = this._fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  private _mapToModel(): IContactForm {
    const model = <IContactForm>{
      name: this.contactForm.value.name,
      email: this.contactForm.value.email,
      message: this.contactForm.value.message
    };

    return model;
  }
}