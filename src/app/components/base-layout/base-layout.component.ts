import { ActivatedRoute, Router } from '@angular/router';
import { Component, Inject } from '@angular/core';
import { IContact, IDATA_SERVICE } from 'src/app/services/data-service.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html'
})
export class BaseLayoutComponent {

  constructor(@Inject(IDATA_SERVICE) public dataService: DataService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.data.subscribe((data) => {
      this.dataService.setContacts(data?.dataContacts)
    })
   }
}
