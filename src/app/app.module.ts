import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ContactsModule } from './modules/contacts/contacts.module';
import { DataResolver } from './resolvers/data.resolver';
import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { IDATA_SERVICE } from './services/data-service.interface';
import { NgModule } from '@angular/core';
import { BaseLayoutComponent } from './components/base-layout/base-layout.component';

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
      provide: IDATA_SERVICE,
      useClass: DataService,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
