import { IContact, IContactsService } from './contacts-service.interface';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ContactsService implements IContactsService {
  contacts!: IContact[];
  lastId = 0;

  constructor(private http: HttpClient) {}

  getContactsFromJSON(): Observable<IContact[]> {
    return this.http.get<IContact[]>('assets/data.json').pipe(map((data) => {
      return data
    }))
  }

  getContacts(): IContact[] {
    return this.contacts
  }

  setContacts(data: IContact[]): void {
    this.contacts = data

    this.setLastId(data);
  }

  getLastId(): number {
    return this.lastId;
  }

  setLastId(contacts: IContact[]): void {
    this.lastId = contacts.map(contacts => +contacts.id).reduce((contact, currentContact) => {
      return Math.max(contact, currentContact)
    })
  }
}
