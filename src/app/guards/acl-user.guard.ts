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
      console.log('inside acl user guard');
      console.log('next', next, state);
      const roles = next.data['roles'] as Array<string>;
      console.log('roles', roles);
      const key = roles ? roles[0] : '';
      const subkey = roles ? roles[1] : '';
      const inhouseUserRole = roles ? roles[2] : '';
      // return true;
      // const obj = this.admin.admin_acl[key];

      const admin_acl = JSON.parse(localStorage.getItem('admin_acl'));
      const obj = admin_acl[key];
      const permissions = JSON.parse(localStorage.getItem('permissions'));
      console.log('admin_acl', admin_acl);
      console.log('obj', obj);
      console.log('permiss', permissions);
      console.log('inhouseUserRole', inhouseUserRole);
      console.log('obj', obj, subkey);
      console.log('state url', state.url);
      // return true;
      if (((state.url === '/dashboard/view-inhouse-users/data-collectors') && (admin_acl['Data Collector Management']['can_read'] === 1)) ||
          ((state.url === '/dashboard/view-inhouse-users/csr-sellers') && (admin_acl['Seller Management']['can_read'] === 1)) ||
          ((state.url === '/dashboard/view-inhouse-users/csr-buyers') && (admin_acl['Buyer Management']['can_read'] === 1)) ||
          ((state.url === '/dashboard/view-inhouse-users/inhouse-broker') && (admin_acl['Broker Management']['can_read'] === 1)) ||
          ((state.url === '/dashboard/view-inhouse-users/csr-closers') && (admin_acl['Closer Management']['can_read'] === 1))) {
    console.log('===');
            return true;
      } else if ((obj && obj[subkey] === 1) || (permissions && permissions[inhouseUserRole] === 1)) {
        console.log('yes');
        return true;
      } else {
          // this.router.events.pairwise().subscribe((e) => {
          //   const previousUrl = e[1]['url'];
          //   console.log('inside router');
          //   console.log(previousUrl);
          //   this.router.navigate([previousUrl]);
          //   console.log('previous', previousUrl);
          //   return false;
          // });
        this.router.navigate(['']);
        return false;
      }
  }
}
