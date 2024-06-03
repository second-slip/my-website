import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { ContactFormComponent } from './contact-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactFormService } from './contact-form.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatFormFieldHarness } from '@angular/material/form-field/testing'
import { name, email, message, contactFormModel } from '../test-helpers/contact-form-helpers';
import { of, throwError } from 'rxjs';

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let loader: HarnessLoader;
  let fixture: ComponentFixture<ContactFormComponent>;

  let fakeContactFormService: jasmine.SpyObj<ContactFormService>;

  const setup = async (
    fakeContactFormServiceReturnValues?: jasmine.SpyObjMethodNames<ContactFormService>) => {

    fakeContactFormService = jasmine.createSpyObj<ContactFormService>(
      'ContactFormService',
      {
        postContactForm: undefined,
        ...fakeContactFormServiceReturnValues
      }
    );

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, BrowserAnimationsModule, ContactFormComponent],
      providers: [{ provide: ContactFormService, useValue: fakeContactFormService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  };


  it('should create', async () => {
    await setup();
    expect(component).toBeTruthy();
  });

  describe('initial form setup', () => {

    it('should load all input harnesses', async () => {
      await setup();
      const inputs = await loader.getAllHarnesses(MatInputHarness);
      expect(inputs.length).toBe(3);
    });

    it('should load name input with correct setup', async () => {
      await setup();
      const input = await loader.getHarness(MatInputHarness.with({ selector: '#name' }));
      expect(await input.isRequired()).toBe(true);
      expect(await input.getType()).toBe('text');
      expect(await input.isDisabled()).toBe(false);
      expect(await input.getValue()).toBe('');
    });

    it('should load email input with correct setup', async () => {
      await setup();
      const input = await loader.getHarness(MatInputHarness.with({ selector: '#email' }));
      expect(await input.isRequired()).toBe(true);
      expect(await input.getType()).toBe('email');
      expect(await input.isDisabled()).toBe(false);
      expect(await input.getValue()).toBe('');
    });

    it('should load message input with correct setup', async () => {
      await setup();
      const input = await loader.getHarness(MatInputHarness.with({ selector: '#message' }));
      expect(await input.isRequired()).toBe(true);
      expect(await input.getType()).toBe('textarea');
      expect(await input.isDisabled()).toBe(false);
      expect(await input.getValue()).toBe('');
    });

    it('should render the Submit button - disabled as form is invalid', async () => {
      await setup();
      const submitBtn = await loader.getHarness(MatButtonHarness.with({ text: 'Submit' }));
      expect(await submitBtn.isDisabled()).toBe(true);
      expect(await submitBtn.getText()).toBe('Submit');
    });
  })

  describe('filling out the form', () => {

    it('should be able to set value of name input', async () => {
      await setup();
      const input = await loader.getHarness(MatInputHarness.with({ selector: '#name' }));

      expect(await input.getValue()).toBe('');
      await input.setValue(name);

      expect(await input.getValue()).toBe(name);
    });

    it('should show Name required validation messages when input is touched but empty', async () => {
      await setup();
      const formField = await loader.getHarness(MatFormFieldHarness.with({ selector: '#name' }));
      expect((await formField.getControl()) instanceof MatInputHarness).toBe(true);
      expect(await formField.getTextErrors()).toEqual([]);

      await ((await formField.getControl()) as MatInputHarness)?.blur();
      expect(await formField.getTextErrors()).toEqual(['Name is required']);

      fixture.componentInstance.contactForm.get('name')?.setValue('');
      expect(await formField.isControlValid()).toBe(false);

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('.validation-required-name')?.textContent).toBeDefined();
      expect(compiled.querySelector('.validation-required-name')?.textContent).toBe(' Name is required');
    });

    it('should show Email required validation messages when input is touched but empty', async () => {
      await setup();

      const formField = await loader.getHarness(MatFormFieldHarness.with({ selector: '#email' }));
      expect((await formField.getControl()) instanceof MatInputHarness).toBe(true);
      expect(await formField.getTextErrors()).toEqual([]);

      await ((await formField.getControl()) as MatInputHarness)?.blur();
      expect(await formField.getTextErrors()).toEqual(['Email is required']);

      fixture.componentInstance.contactForm.get('email')?.setValue('');
      expect(await formField.isControlValid()).toBe(false);

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('.validation-required-email')?.textContent).toBeDefined();
      expect(compiled.querySelector('.validation-required-email')?.textContent).toBe(' Email is required');
    });

    it('should show Email email format validation messages when input invalid', async () => {
      await setup();

      const formField = await loader.getHarness(MatFormFieldHarness.with({ selector: '#email' }));
      expect((await formField.getControl()) instanceof MatInputHarness).toBe(true);
      expect(await formField.getTextErrors()).toEqual([]);

      await ((await formField.getControl()) as MatInputHarness)?.blur();
      await ((await formField.getControl()) as MatInputHarness)?.setValue('k');
      expect(await formField.getTextErrors()).toEqual(['The email is not valid']);

      fixture.componentInstance.contactForm.get('email')?.setValue('k');
      expect(await formField.isControlValid()).toBe(false);

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('.validation-email-email')?.textContent).toBeDefined();
      expect(compiled.querySelector('.validation-email-email')?.textContent).toBe(' The email is not valid');
    });

    it('should show Message length validation messages when input is too short', async () => {
      await setup();

      const formField = await loader.getHarness(MatFormFieldHarness.with({ selector: '#message' }));
      expect((await formField.getControl()) instanceof MatInputHarness).toBe(true);
      expect(await formField.getTextErrors()).toEqual([]);

      await ((await formField.getControl()) as MatInputHarness)?.blur();
      await ((await formField.getControl()) as MatInputHarness)?.setValue('ghjkg');
      expect(await formField.getTextErrors()).toEqual(['The message is too short']);

      fixture.componentInstance.contactForm.get('message')?.setValue('ghjkg');
      expect(await formField.isControlValid()).toBe(false);

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('.validation-length-message')?.textContent).toBeDefined();
      expect(compiled.querySelector('.validation-length-message')?.textContent).toBe(' The message is too short');
    });

    it('should show Message required validation message when input is touched but empty', async () => {
      await setup();

      const formField = await loader.getHarness(MatFormFieldHarness.with({ selector: '#message' }));
      expect((await formField.getControl()) instanceof MatInputHarness).toBe(true);
      expect(await formField.getTextErrors()).toEqual([]);

      await ((await formField.getControl()) as MatInputHarness)?.blur();
      expect(await formField.getTextErrors()).toEqual(['Message is required']);

      fixture.componentInstance.contactForm.get('message')?.setValue('');
      expect(await formField.isControlValid()).toBe(false);

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('.validation-required-message')?.textContent).toBeDefined();
      expect(compiled.querySelector('.validation-required-message')?.textContent).toBe(' Message is required');
    });


    it('should be able to set value of email input', async () => {
      await setup();
      const input = await loader.getHarness(MatInputHarness.with({ selector: '#email' }));

      expect(await input.getValue()).toBe('');
      await input.setValue(email);

      expect(await input.getValue()).toBe(email);
    });

    it('should be able to set value of message input', async () => {
      await setup();
      const input = await loader.getHarness(MatInputHarness.with({ selector: '#message' }));

      expect(await input.getValue()).toBe('');
      await input.setValue(message);

      expect(await input.getValue()).toBe(message);
    });

    it('should not submit an invalid form', fakeAsync(async () => {
      await setup();

      const submitBtn = await loader.getHarness(MatButtonHarness.with({ text: 'Submit' }));
      expect(await submitBtn.isDisabled()).toBe(true);

      await submitBtn.click();

      expect(fakeContactFormService.postContactForm).not.toHaveBeenCalled();
      expect(fakeContactFormService.postContactForm).not.toHaveBeenCalledWith(contactFormModel);
    }));

    it('the Submit button should be disabled unless all inputs are valid', async () => {
      await setup();
      const submitBtn = await loader.getHarness(MatButtonHarness.with({ text: 'Submit' }));
      expect(await submitBtn.isDisabled()).toBe(true);

      const input1 = await loader.getHarness(MatInputHarness.with({ selector: '#name' }));
      await input1.setValue(name);
      expect(await submitBtn.isDisabled()).toBe(true);

      const input2 = await loader.getHarness(MatInputHarness.with({ selector: '#email' }));
      await input2.setValue(email);
      expect(await submitBtn.isDisabled()).toBe(true);

      const input3 = await loader.getHarness(MatInputHarness.with({ selector: '#message' }));
      await input3.setValue(message);

      expect(await submitBtn.isDisabled()).toBe(false);
    });

    it('should call the service on Submit', async () => {
      await setup();
      const submitBtn = await loader.getHarness(MatButtonHarness.with({ text: 'Submit' }));
      expect(await submitBtn.isDisabled()).toBe(true);

      const input1 = await loader.getHarness(MatInputHarness.with({ selector: '#name' }));
      await input1.setValue(name);

      const input2 = await loader.getHarness(MatInputHarness.with({ selector: '#email' }));
      await input2.setValue(email);

      const input3 = await loader.getHarness(MatInputHarness.with({ selector: '#message' }));
      await input3.setValue(message);

      expect(await submitBtn.isDisabled()).toBe(false);

      await submitBtn.click();

      expect(fakeContactFormService.postContactForm).toHaveBeenCalledTimes(1);
      expect(fakeContactFormService.postContactForm).toHaveBeenCalledWith(contactFormModel);
    });


  });


  describe('server responds successfully', () => {

    it('should update submitProgress to "success"', async () => {
      await setup({ postContactForm: of({ success: true }) });
      const submitBtn = await loader.getHarness(MatButtonHarness.with({ text: 'Submit' }));
      expect(await submitBtn.isDisabled()).toBe(true);

      const input1 = await loader.getHarness(MatInputHarness.with({ selector: '#name' }));
      await input1.setValue(name);

      const input2 = await loader.getHarness(MatInputHarness.with({ selector: '#email' }));
      await input2.setValue(email);

      const input3 = await loader.getHarness(MatInputHarness.with({ selector: '#message' }));
      await input3.setValue(message);

      expect(fixture.componentInstance.submitProgress()).toBe('idle');

      expect(await submitBtn.isDisabled()).toBe(false);
      await submitBtn.click();

      expect(fakeContactFormService.postContactForm).toHaveBeenCalledTimes(1);
      expect(fakeContactFormService.postContactForm).toHaveBeenCalledWith(contactFormModel);

      expect(fixture.componentInstance.submitProgress()).toBe('success');
    });


    it('should hide the form on successful submission & show alert-success message', async () => {
      await setup({ postContactForm: of({ success: true }) });
      const submitBtn = await loader.getHarness(MatButtonHarness.with({ text: 'Submit' }));
      expect(await submitBtn.isDisabled()).toBe(true);

      const input1 = await loader.getHarness(MatInputHarness.with({ selector: '#name' }));
      await input1.setValue(name);

      const input2 = await loader.getHarness(MatInputHarness.with({ selector: '#email' }));
      await input2.setValue(email);

      const input3 = await loader.getHarness(MatInputHarness.with({ selector: '#message' }));
      await input3.setValue(message);

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('.contact-form')?.textContent).toBeDefined();
      expect(compiled.querySelector('.alert-success')?.textContent).toBeUndefined();
      expect(compiled.querySelector('.alert-danger')?.textContent).toBeUndefined();

      await submitBtn.click();

      expect(fakeContactFormService.postContactForm).toHaveBeenCalledTimes(1);
      expect(fakeContactFormService.postContactForm).toHaveBeenCalledWith(contactFormModel);

      expect(compiled.querySelector('.contact-form')?.textContent).toBeUndefined();
      expect(compiled.querySelector('.alert-success')?.textContent).toBeDefined();
      expect(compiled.querySelector('.alert-danger')?.textContent).toBeUndefined();
    });

  });

  describe('server responds unsuccessfully', () => {

    it('should update submitProgress to "error"', async () => {
      await setup({ postContactForm: of({ success: false }) });

      const submitBtn = await loader.getHarness(MatButtonHarness.with({ text: 'Submit' }));
      expect(await submitBtn.isDisabled()).toBe(true);

      const input1 = await loader.getHarness(MatInputHarness.with({ selector: '#name' }));
      await input1.setValue(name);

      const input2 = await loader.getHarness(MatInputHarness.with({ selector: '#email' }));
      await input2.setValue(email);

      const input3 = await loader.getHarness(MatInputHarness.with({ selector: '#message' }));
      await input3.setValue(message);

      expect(fixture.componentInstance.submitProgress()).toBe('idle');

      expect(await submitBtn.isDisabled()).toBe(false);
      await submitBtn.click();

      expect(fakeContactFormService.postContactForm).toHaveBeenCalledTimes(1);
      expect(fakeContactFormService.postContactForm).toHaveBeenCalledWith(contactFormModel);

      expect(fixture.componentInstance.submitProgress()).toBe('error');
    });

    it('should NOT hide the form on successful submission & show alert-danger message', async () => {
      await setup({ postContactForm: of({ success: false }) });

      const submitBtn = await loader.getHarness(MatButtonHarness.with({ text: 'Submit' }));
      expect(await submitBtn.isDisabled()).toBe(true);

      const input1 = await loader.getHarness(MatInputHarness.with({ selector: '#name' }));
      await input1.setValue(name);

      const input2 = await loader.getHarness(MatInputHarness.with({ selector: '#email' }));
      await input2.setValue(email);

      const input3 = await loader.getHarness(MatInputHarness.with({ selector: '#message' }));
      await input3.setValue(message);

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('.contact-form')?.textContent).toBeDefined();
      expect(compiled.querySelector('.alert-success')?.textContent).toBeUndefined();
      expect(compiled.querySelector('.alert-danger')?.textContent).toBeUndefined();

      await submitBtn.click();

      expect(fakeContactFormService.postContactForm).toHaveBeenCalledTimes(1);
      expect(fakeContactFormService.postContactForm).toHaveBeenCalledWith(contactFormModel);

      expect(compiled.querySelector('.contact-form')?.textContent).toBeDefined();
      expect(compiled.querySelector('.alert-success')?.textContent).toBeUndefined();
      expect(compiled.querySelector('.alert-danger')?.textContent).toBeDefined();
    });

  });

  describe('server error', () => {

    it('should update submitProgress to "error"', async () => {
      await setup({ postContactForm: throwError(() => new Error('test')) });

      const submitBtn = await loader.getHarness(MatButtonHarness.with({ text: 'Submit' }));
      expect(await submitBtn.isDisabled()).toBe(true);

      const input1 = await loader.getHarness(MatInputHarness.with({ selector: '#name' }));
      await input1.setValue(name);

      const input2 = await loader.getHarness(MatInputHarness.with({ selector: '#email' }));
      await input2.setValue(email);

      const input3 = await loader.getHarness(MatInputHarness.with({ selector: '#message' }));
      await input3.setValue(message);

      expect(fixture.componentInstance.submitProgress()).toBe('idle');

      expect(await submitBtn.isDisabled()).toBe(false);
      await submitBtn.click();

      expect(fakeContactFormService.postContactForm).toHaveBeenCalledTimes(1);
      expect(fakeContactFormService.postContactForm).toHaveBeenCalledWith(contactFormModel);

      expect(fixture.componentInstance.submitProgress()).toBe('error');
    });

    it('should NOT hide the form on successful submission & show alert-danger message', async () => {
      await setup({ postContactForm: throwError(() => new Error('test')) });

      const submitBtn = await loader.getHarness(MatButtonHarness.with({ text: 'Submit' }));
      expect(await submitBtn.isDisabled()).toBe(true);

      const input1 = await loader.getHarness(MatInputHarness.with({ selector: '#name' }));
      await input1.setValue(name);

      const input2 = await loader.getHarness(MatInputHarness.with({ selector: '#email' }));
      await input2.setValue(email);

      const input3 = await loader.getHarness(MatInputHarness.with({ selector: '#message' }));
      await input3.setValue(message);

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('.contact-form')?.textContent).toBeDefined();
      expect(compiled.querySelector('.alert-success')?.textContent).toBeUndefined();
      expect(compiled.querySelector('.alert-danger')?.textContent).toBeUndefined();

      await submitBtn.click();

      expect(fakeContactFormService.postContactForm).toHaveBeenCalledTimes(1);
      expect(fakeContactFormService.postContactForm).toHaveBeenCalledWith(contactFormModel);

      expect(compiled.querySelector('.contact-form')?.textContent).toBeDefined();
      expect(compiled.querySelector('.alert-success')?.textContent).toBeUndefined();
      expect(compiled.querySelector('.alert-danger')?.textContent).toBeDefined();
    });


  });




});