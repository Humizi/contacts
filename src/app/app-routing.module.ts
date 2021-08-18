import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { BaseLayoutComponent } from './components/base-layout/base-layout.component';
import { DataResolver } from './resolvers/data.resolver';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'app',
    component: BaseLayoutComponent,
    resolve: {
      dataContacts: DataResolver
    },
    children: [
      {
        path: 'contacts',
        loadChildren: () => import('./modules/contacts/contacts.module').then((m) => m.ContactsModule),
      }
    ]
  },
  { path: '', redirectTo: 'app/contacts', pathMatch: 'full' },
  { path: '**', redirectTo: 'app/contacts' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      paramsInheritanceStrategy: 'always',
      onSameUrlNavigation: 'reload',
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
