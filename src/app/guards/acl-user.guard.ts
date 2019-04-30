import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AdminService } from './../services/admin.service';
import { Location } from '@angular/common';
import { of, Observable } from 'rxjs';

@Injectable()
export class AclUserGuard implements CanActivate {
  constructor(private admin: AdminService, private location: Location, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      this.admin.admin_acl = this.admin.admin_acl ? this.admin.admin_acl : {};
      this.admin.permissions = this.admin.permissions ? this.admin.permissions : {};
      console.log('111');
      if (Object.keys(this.admin.permissions).length === 0 && Object.keys(this.admin.admin_acl).length === 0) {
        console.log('2222');
        return this.admin.getDetails().map(e => {
          if (e) {

            console.log('3333');
            return this.checkData(next, state, this.admin.admin_acl, this.admin.permissions);
          }
        }).catch(() => {
          console.log('44');
          this.location.back();
          // return Observable.of(false); // used for angular4
          return of(false);
        });
      } else {
        console.log('5555');
        return this.checkData(next, state, this.admin.admin_acl, this.admin.permissions);
      }
  }

  checkData (next, state, admin_acl, permissions) {
    const roles = next.data['roles'] as Array<string>;
    const key = roles ? roles[0] : '';
    const subkey = roles ? roles[1] : '';
    const inhouseUserRole = roles ? roles[2] : '';
    // const admin_acl = JSON.parse(localStorage.getItem('admin_acl'));
    // const permissions = JSON.parse(localStorage.getItem('permissions'));
    if (permissions || admin_acl) {
      console.log('66666');
      const obj = admin_acl[key];
      if (((state.url === '/dashboard/view-inhouse-users/data-collectors') && (admin_acl['Data Collector Management']['can_read'] === 1)) ||
        ((state.url === '/dashboard/view-inhouse-users/csr-sellers') && (admin_acl['Seller Management']['can_read'] === 1)) ||
        ((state.url === '/dashboard/view-inhouse-users/csr-buyers') && (admin_acl['Buyer Management']['can_read'] === 1)) ||
        ((state.url === '/dashboard/view-inhouse-users/inhouse-broker') && (admin_acl['Broker Management']['can_read'] === 1)) ||
        ((state.url === '/dashboard/view-inhouse-users/outside-broker') && (admin_acl['Outside Broker Management']['can_read'] === 1)) ||
        ((state.url === '/dashboard/view-inhouse-users/csr-closers') && (admin_acl['Closer Management']['can_read'] === 1))) {
          console.log('77777');
          return true;
      } else if ((obj && obj[subkey] === 1) || (permissions && permissions[inhouseUserRole] === 1)) {
        console.log('8888');
        return true;
      } else {
        console.log('9999');
        this.location.back();
        return false;
      }
    } else {
      console.log('4101010101');
      return false;
    }
  }
}
