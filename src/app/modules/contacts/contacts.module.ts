import { CommonModule } from '@angular/common';
import { ContactCardComponent } from './components/contact-card/contact-card.component';
import { ContactsEditComponent } from './components/contacts-edit/contacts-edit.component';
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';
import { ContactsRoutingModule } from './contacts-routing.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    ContactCardComponent,
    ContactsListComponent,
    ContactsEditComponent,
  ],
  imports: [
    CommonModule,
    ContactsRoutingModule
  ]
})
export class ContactsModule { }
