import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { ContactsEditComponent } from './components/contacts-edit/contacts-edit.component';
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: ContactsListComponent
  },
  {
    path: 'add',
    component: ContactsEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactsRoutingModule { }
