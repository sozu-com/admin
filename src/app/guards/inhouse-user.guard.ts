import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class InhouseUserGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true;
    // if (this.admin.permissions.can_in_house_broker === 1 || this.admin.admin_acl['Broker Lead Management'].can_read === 1) {
    //   return true;
    // } else {
    //   this.location.back();
    //   return false;
    // }
  }
}
