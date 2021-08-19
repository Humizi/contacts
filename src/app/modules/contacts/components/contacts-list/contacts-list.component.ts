import { Component, Inject } from '@angular/core';
import { IContact, ICONTACTS_SERVICE } from 'src/app/services/contacts/contacts-service.interface';
import { ContactsService } from 'src/app/services/contacts/contacts.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html'
})
export class ContactsListComponent {
  contacts: IContact[] = []

  constructor(@Inject(ICONTACTS_SERVICE) public contactsService: ContactsService) {
    this.contacts = this.contactsService.getContacts()
  }
}
