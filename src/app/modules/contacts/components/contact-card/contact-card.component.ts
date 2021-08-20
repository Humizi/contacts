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
    for (const item in this.contact) {
      if (this.contact.hasOwnProperty(item)) {
        if (item.includes('phone_number')) {
          this.phoneNumbers.push(this.contact[item]);
        } else if (item.includes('link')) {
          this.links.push(this.contact[item]);
        } else if (item !== 'id' && item !== 'name' && item !== 'surname') {
          this.customFields[item] = this.contact[item];
        }
      }
    }
  }
}
