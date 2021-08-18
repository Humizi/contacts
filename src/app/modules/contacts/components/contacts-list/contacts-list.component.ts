import { Component, Inject } from '@angular/core';
import { IContact, IDATA_SERVICE } from 'src/app/services/data-service.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html'
})
export class ContactsListComponent {
  contacts: IContact[] = []

  constructor(@Inject(IDATA_SERVICE) public dataService: DataService) {
    this.contacts = this.dataService.getContacts()
  }
}
