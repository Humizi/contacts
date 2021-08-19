import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Component, Inject } from '@angular/core';
import { ICONTACTS_SERVICE } from 'src/app/services/contacts/contacts-service.interface';
import { ContactsService } from 'src/app/services/contacts/contacts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts-edit',
  templateUrl: './contacts-edit.component.html'
})
export class ContactsEditComponent {
  public form = new FormGroup({
    name: new FormControl(null, Validators.required),
    surname: new FormControl(null, Validators.required),
    phone: new FormControl(null, Validators.required)
  })

  constructor(@Inject(ICONTACTS_SERVICE) public contactsService: ContactsService, private router: Router) { }

  get name(): FormControl {
    return (this.form.get('name') as FormControl);
  }

  get surname(): FormControl {
    return (this.form.get('surname') as FormControl);
  }

  get phone(): FormControl {
    return (this.form.get('phone') as FormControl);
  }

  addField(): void {

  }

  save(): void {
    const contacts = this.contactsService.getContacts();
    const id = this.contactsService.getLastId() + 1;
    const formData = {id, ...this.form.getRawValue()}
    contacts.push(formData);
    this.contactsService.setContacts(contacts);
    this.router.navigate(['/app/contacts'])

    console.log('Contacts: ', this.contactsService.getContacts())
    console.log('Contacts: ', this.contactsService.getLastId())
  }
}
