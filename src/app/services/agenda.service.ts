import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contato } from '../interfaces/contato';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  private URL = `${environment.url_api}`;

  constructor(
    private http: HttpClient,
  ) { }

  saveContact(contact: Contato): Observable<any> {
    return this.http.post(`${this.URL}/salvar`, contact, { responseType: 'text' });
  }
}
