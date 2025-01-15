import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ContactFormService } from './contact-form.service';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import {
  contactFormModel,
  postContactFormResponse,
} from '../test-helpers/contact-form-helpers';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('ContactFormService', () => {
  let service: ContactFormService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection(),
      ],
    });
    service = TestBed.inject(ContactFormService);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('check the postContactForm http request', () => {
    let result: { success: boolean } | undefined;
    service.postContactForm(contactFormModel).subscribe((otherResult) => {
      result = otherResult;
    });

    const request = controller.expectOne({
      method: 'POST',
      url: 'https://birder-server.azurewebsites.net/api/message/send-contact-message',
    });
    expect(request.request.body).toEqual(contactFormModel);
    request.flush(postContactFormResponse);

    expect(result).toEqual(postContactFormResponse);
  });

  it('passes the errors through', () => {
    const errors: HttpErrorResponse[] = [];
    const recordError = (error: HttpErrorResponse) => {
      errors.push(error);
    };

    service
      .postContactForm(contactFormModel)
      .subscribe({ next: fail, error: recordError, complete: fail });
    const status = 500;
    const statusText = 'Internal Server Error';
    const errorEvent = new ErrorEvent('API error');

    const requests = controller.match(() => true);
    requests.forEach((request) => {
      request.error(errorEvent, { status, statusText });
    });

    expect(errors.length).toBe(1);
    errors.forEach((error) => {
      expect(error.error).toBe(errorEvent);
      expect(error.status).toBe(status);
      expect(error.statusText).toBe(statusText);
    });
  });
});
