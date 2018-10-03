import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AdminService } from './../services/admin.service';
import { Location } from '@angular/common';

@Injectable()
export class AclUserGuard implements CanActivate {
  constructor(private admin: AdminService, private location: Location, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


//       // return this.admin.getDetails().map(e => {
//       //   console.log('1');
//       //   if (e) {
//       //     console.log('2');
//       //     console.log(e);
//       //     return true;
//       //   }
//       // }).catch(() => {
//       //   console.log('3');
//       //   // this.location.back();
//       //   return Observable.of(false);
//       // });

      const roles = next.data['roles'] as Array<string>;

      const key = roles ? roles[0] : '';
      const subkey = roles ? roles[1] : '';
      const inhouseUserRole = roles ? roles[2] : '';
console.log('inside');
      const admin_acl = JSON.parse(localStorage.getItem('admin_acl'));
      const permissions = JSON.parse(localStorage.getItem('permissions'));
      // const admin_acl = this.admin.admin_acl;
      // const permissions = this.admin.permissions;
      console.log('adminacl', admin_acl);
      console.log('permission', permissions);
      if (permissions || admin_acl) {
        const obj = admin_acl[key];
        if (((state.url === '/dashboard/view-inhouse-users/data-collectors') &&
            (admin_acl['Data Collector Management']['can_read'] === 1)) ||
          ((state.url === '/dashboard/view-inhouse-users/csr-sellers') && (admin_acl['Seller Management']['can_read'] === 1)) ||
          ((state.url === '/dashboard/view-inhouse-users/csr-buyers') && (admin_acl['Buyer Management']['can_read'] === 1)) ||
          ((state.url === '/dashboard/view-inhouse-users/inhouse-broker') && (admin_acl['Broker Management']['can_read'] === 1)) ||
          ((state.url === '/dashboard/view-inhouse-users/csr-closers') && (admin_acl['Closer Management']['can_read'] === 1))) {
            return true;
        } else if ((obj && obj[subkey] === 1) || (permissions && permissions[inhouseUserRole] === 1)) {
          return true;
        } else {
          this.location.back();
          return false;
        }
      } else {
        return false;
      }
  }
}
