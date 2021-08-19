import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Component, Inject } from '@angular/core';
import { ICONTACTS_SERVICE } from 'src/app/services/contacts/contacts-service.interface';
import { ContactsService } from 'src/app/services/contacts/contacts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts-edit',
  templateUrl: './contacts-edit.component.html'
})
export class ContactsEditComponent {
  public isBuilder = false;
  public customField = new FormControl();
  public customFieldType = new FormControl('text');
  public form = new FormGroup({
    name: new FormControl(null,[Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern(/^[a-zA-Z '-]+$/)]),
    surname: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern(/^[a-zA-Z '-]+$/)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^(?!\+{2,})(\+[0-9]+)$/)])
  })

  constructor(@Inject(ICONTACTS_SERVICE) public contactsService: ContactsService, private router: Router) {}

  getFormControl(controlName: string): FormControl {
    return (this.form.get(controlName) as FormControl);
  }

  toggleField(): void {
    this.isBuilder = !this.isBuilder;
    console.log(this.form)
  }

  addField(): void {
    const fieldName = this.customField.value.toLowerCase().replace(' ', '_');
    this.form.addControl(fieldName, new FormControl());
  }

  save(): void {
    console.log(this.form)
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
