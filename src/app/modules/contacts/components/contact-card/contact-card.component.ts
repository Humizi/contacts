import { Component, HostBinding, Input, OnInit } from '@angular/core';

import { IContact } from 'src/app/services/contacts/contacts-service.interface';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
})
export class ContactCardComponent implements OnInit {
  @Input() contact!: IContact;

  @HostBinding('class') className = 'card'

  public phoneNumbers: string[] = [];
  public links: string[] = [];
  public customFields: {[key: string]: string} = {};

  ngOnInit(): void {
    for (const key in this.contact) {
      if (this.contact.hasOwnProperty(key)) {
        if (key.includes('phone_number')) {
          this.phoneNumbers.push(this.contact[key]);
        } else if (key.includes('link')) {
          this.links.push(this.contact[key]);
        } else if (key !== 'id' && key !== 'name' && key !== 'surname') {
          this.customFields[key] = this.contact[key];
        }
      }
    }
  }
}
