import { Component, HostBinding, Input } from '@angular/core';

import { IContact } from 'src/app/services/contacts/contacts-service.interface';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
})
export class ContactCardComponent {
  @Input() contact!: IContact;

  @HostBinding('class') className = 'card'
}
