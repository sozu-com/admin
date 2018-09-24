import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AdminService } from './../services/admin.service';

@Injectable()
export class CsrBuyerGuard implements CanActivate {
  constructor(private admin: AdminService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.admin.admin_acl['Noataries Management']) {
        return true;
      } else {
        // this.router.navigate(['']);
        return false;
      }
    // return true;
  }
}
