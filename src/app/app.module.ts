import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BaseLayoutComponent } from './components/base-layout/base-layout.component';
import { BrowserModule } from '@angular/platform-browser';
import { ContactsModule } from './modules/contacts/contacts.module';
import { ContactsService } from './services/contacts/contacts.service';
import { DataResolver } from './resolvers/data.resolver';
import { HttpClientModule } from '@angular/common/http';
import { ICONTACTS_SERVICE } from './services/contacts/contacts-service.interface';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    BaseLayoutComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ContactsModule
  ],
  providers: [
    DataResolver,
    {
      provide: ICONTACTS_SERVICE,
      useClass: ContactsService,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
