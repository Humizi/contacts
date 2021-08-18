import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";

interface IDataService {
  getContactsFromJSON(): Observable<IContact[]>;
  setContacts(data: IContact[]): void;
  getContacts(): IContact[];
}

interface IContact {
  id: number;
  name: string;
  surname: string;
  phone: string;
}

const IDATA_SERVICE = new InjectionToken<IDataService>('IDataService');

export { IDataService, IContact, IDATA_SERVICE}