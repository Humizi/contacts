import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

import { Component, Inject } from '@angular/core';
import { IContact, ICONTACTS_SERVICE } from 'src/app/services/contacts/contacts-service.interface';
import { ContactsService } from 'src/app/services/contacts/contacts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contacts-edit',
  templateUrl: './contacts-edit.component.html'
})
export class ContactsEditComponent {
  public status!: 'add' | 'edit';
  private id?: string;
  private contact?: IContact;
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

  constructor(@Inject(ICONTACTS_SERVICE) private contactsService: ContactsService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.url.subscribe(data => {
      this.status = data[0].path as 'add' | 'edit';

      if (this.status === 'edit') {
        this.id = data[1].path;

        this.contact = this.contactsService.getContacts().find(contact => contact.id === this.id);

        for (const key in this.contact) {
          if (this.contact.hasOwnProperty(key)) {
            this.form.get(key)?.setValue(this.contact[key]);
            if (!this.fields.includes(key) && key !== 'id') {
              this.fieldsPush(key, this.contact[key])
            }
          }
        }

        this.phoneFieldsCount = this.fields.filter(field => field.includes('phone_number')).length;
        this.linkFieldsCount = this.fields.filter(field => field.includes('link')).length;
      }
    });
  }

  getFormControl(controlName: string): FormControl {
    return (this.form.get(controlName) as FormControl);
  }

  toggleBuilder(): void {
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

    this.fieldsPush(fieldName);
    this.customFieldName.setValue('')
    this.toggleBuilder();
  }

  fieldsPush(fieldKey: string, fieldValue: string = ''): void {
    this.form.addControl(fieldKey, new FormControl(fieldValue, this.fieldValidators(fieldKey)));
    this.fields.push(fieldKey);
    this.customFields.push(fieldKey);
  }

  fieldValidators(fieldKey: string): ValidatorFn[] {
    if (fieldKey.includes('phone_number')) {
      return [Validators.required, Validators.pattern(/^(?!\+{2,})(\+[0-9]+)$/)]
    } else if (fieldKey.includes('link')) {
      return [Validators.required, Validators.pattern(/(^https?:\/\/)[\w. /%=&#@*(){}+?!^$-\\]+$/i)]
    } else {
      return [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern(/^[a-zA-Z '-]+$/)]
    }
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

    if (fieldName.includes('phone_number')) {
      this.phoneFieldsCount--;
    } else if (fieldName.includes('link')) {
      this.linkFieldsCount--;
    }
  }

  isInvalidCustomField(): boolean {
    return this.customFieldType.value === 'text' && this.customFieldName.invalid 
            ? true
            : false
  }

  save(): void {
    const contacts = this.contactsService.getContacts();
    const id = this.contactsService.getLastId() + 1;
    const formData = {id: id.toString(), ...this.form.getRawValue()};
    contacts.push(formData);
    this.contactsService.setContacts(contacts);
    this.router.navigate(['/app/contacts']);
  }
}
