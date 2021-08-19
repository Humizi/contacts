import { Inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of, throwError } from "rxjs";
import { mergeMap, take } from "rxjs/operators";
import { ICONTACTS_SERVICE } from "../services/contacts/contacts-service.interface";
import { ContactsService } from "../services/contacts/contacts.service";

@Injectable()
export class DataResolver implements Resolve<any> {
  constructor(@Inject(ICONTACTS_SERVICE) public contactsService: ContactsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.contactsService.getContactsFromJSON().pipe(
      take(1),
      mergeMap((data) => (data ? of(data) : throwError('no data'))),
    );
  }
}