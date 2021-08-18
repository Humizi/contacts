import { Inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of, throwError } from "rxjs";
import { mergeMap, take } from "rxjs/operators";
import { IDATA_SERVICE } from "../services/data-service.interface";
import { DataService } from "../services/data.service";

@Injectable()
export class DataResolver implements Resolve<any> {
  constructor(@Inject(IDATA_SERVICE) public dataService: DataService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    return this.dataService.getContactsFromJSON().pipe(
      take(1),
      mergeMap((data) => (data ? of(data) : throwError('no data'))),
    );
  }
}