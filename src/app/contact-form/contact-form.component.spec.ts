import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactFormComponent } from './contact-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactFormService } from './contact-form.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;

  let fakeContactFormService: jasmine.SpyObj<ContactFormService>;

  fakeContactFormService = jasmine.createSpyObj<ContactFormService>(
    'ContactFormService',
    {
      postContactForm: undefined
      // ...fakeAuthReturnValues
    }
  );


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactFormComponent],
      imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule],
      providers: [{ provide: ContactFormService, useValue: fakeContactFormService }],
    });
    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
