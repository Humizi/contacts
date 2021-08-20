import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";

interface IContactsService {
  getContactsFromJSON(): Observable<IContact[]>;
  setContacts(data: IContact[]): void;
  getContacts(): IContact[];
  getLastId(): number;
}

interface IContact {
  id: string;
  name: string;
  surname: string;
  phone_number: string;
  [key: string]: string;
}

const ICONTACTS_SERVICE = new InjectionToken<IContactsService>('IDataService');

export { IContactsService, IContact, ICONTACTS_SERVICE}