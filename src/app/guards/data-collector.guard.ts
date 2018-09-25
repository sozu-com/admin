import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AdminService } from '../services/admin.service';
import { Location } from '@angular/common';

@Injectable()
export class DataCollectorGuard implements CanActivate {
  constructor(private admin: AdminService, private location: Location) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.admin.permissions.can_data_collector === 1) {
      return true;
    } else {
      this.location.back();
      return false;
    }
  }
}
