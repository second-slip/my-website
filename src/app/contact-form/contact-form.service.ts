import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IContactForm } from './i-contact-form.dto';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const url =
  'https://birder-server.azurewebsites.net/api/message/send-contact-message';

@Injectable({
  providedIn: 'root',
})
export class ContactFormService {
  constructor(private readonly _http: HttpClient) {}

  public postContactForm(
    model: IContactForm
  ): Observable<{ success: boolean }> {
    return this._http.post<{ success: boolean }>(url, model, httpOptions);
  }
}
