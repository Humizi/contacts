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
  public customFieldName = new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(10), Validators.pattern(/^[a-zA-Z]+$/)]);
  public customFieldType = new FormControl('text');
  public fields = ['name', 'surname', 'phone_number'];
  private customFields: string[] = [];
  private phoneFieldsCount = 1;
  private linkFieldsCount = 0;
  public form = new FormGroup({
    name: new FormControl(null,[Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern(/^[a-zA-Z '-]+$/)]),
    surname: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern(/^[a-zA-Z '-]+$/)]),
    phone_number: new FormControl(null, [Validators.required, Validators.pattern(/^(?!\+{2,})(\+[0-9]+)$/)])
  })

  constructor(@Inject(ICONTACTS_SERVICE) private contactsService: ContactsService, private router: Router) {}

  getFormControl(controlName: string): FormControl {
    return (this.form.get(controlName) as FormControl);
  }

  toggleField(): void {
    this.isBuilder = !this.isBuilder;
  }

  addField(): void {
    let fieldName = '';

    switch (this.customFieldType.value) {
      case 'text':
        fieldName = this.customFieldName.value.toLowerCase();
        break;
      case 'phone_number':
        this.phoneFieldsCount++;
        fieldName = `phone_number_${this.phoneFieldsCount}`;
        break;
      case 'link':
        this.linkFieldsCount++;
        fieldName = `link_${this.linkFieldsCount}`;
        break;
    }

    this.form.addControl(fieldName, new FormControl(null, Validators.required));
    this.fields.push(fieldName);
    this.customFields.push(fieldName);
    this.customFieldName.setValue('')
    this.toggleField();
  }

  getFieldLabel(name: string): string {
    return name.includes('phone_number_')
            ? name.replace('phone_number_', 'phone number ')
            : name.replace('_', ' ') 
  }

  isCustomField(fieldName: string): boolean {
    return this.customFields.includes(fieldName);
  }

  removeField(fieldName: string): void {
    this.customFields = this.customFields.filter((field => field !== fieldName));
    this.fields = this.fields.filter((field => field !== fieldName));
    this.form.removeControl(fieldName);
  }

  isInvalidCustomField(): boolean {
    return this.customFieldType.value === 'text' && this.customFieldName.invalid 
            ? true
            : false
  }

  save(): void {
    console.log(this.form);
    const contacts = this.contactsService.getContacts();
    const id = this.contactsService.getLastId() + 1;
    const formData = {id, ...this.form.getRawValue()};
    contacts.push(formData);
    this.contactsService.setContacts(contacts);
    this.router.navigate(['/app/contacts']);

    console.log('Contacts: ', this.contactsService.getContacts());
    console.log('Contacts: ', this.contactsService.getLastId());
  }
}
