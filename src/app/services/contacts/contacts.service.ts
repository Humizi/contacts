import { IContact, IContactsService } from './contacts-service.interface';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ContactsService implements IContactsService {
  contacts!: IContact[];
  contacts$!: Observable<IContact[]>;

  constructor(private http: HttpClient) {}

  getContactsFromJSON(): Observable<IContact[]> {
    return this.http.get<IContact[]>('assets/data.json').pipe(map((data) => {
      return data
    }))
  }

  setContacts(data: IContact[]): void {
    this.contacts = data
  }

  getContacts(): IContact[] {
    return this.contacts
  }
}
