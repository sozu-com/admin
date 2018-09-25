import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AdminService } from './../services/admin.service';
import { Location } from '@angular/common';

@Injectable()
export class CsrBuyerGuard implements CanActivate {
  constructor(private admin: AdminService, private location: Location) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.admin.permissions.can_csr_buyer === 1) {
        return true;
      } else {
        this.location.back();
        return false;
      }
  }
}
