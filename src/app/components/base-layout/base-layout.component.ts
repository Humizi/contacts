import { ActivatedRoute } from '@angular/router';
import { Component, Inject } from '@angular/core';
import { ICONTACTS_SERVICE } from 'src/app/services/contacts/contacts-service.interface';
import { ContactsService } from 'src/app/services/contacts/contacts.service';

@Component({
  selector: 'app-base-layout',
  template: `
      <main class="base-layout">
        <router-outlet></router-outlet>
       </main>
  `
})
export class BaseLayoutComponent {

  constructor(@Inject(ICONTACTS_SERVICE) public contactsService: ContactsService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.data.subscribe((data) => {
      this.contactsService.setContacts(data?.dataContacts)
    })
   }
}
