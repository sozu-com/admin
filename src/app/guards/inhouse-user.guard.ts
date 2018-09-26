import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AdminService } from './../services/admin.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Injectable()
export class InhouseUserGuard implements CanActivate {
  constructor(private admin: AdminService, private location: Location, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      console.log(state.url);
      const admin_acl = JSON.parse(localStorage.getItem('admin_acl'));
//       if (((state.url === '/dashboard/view-inhouse-users/data-collectors') &&
// (this.admin.admin_acl['Data Collector Management'] === 1)) ||
//           ((state.url === '/dashboard/view-inhouse-users/csr-sellers') && (this.admin.admin_acl['Seller Management'] === 1)) ||
//           ((state.url === '/dashboard/view-inhouse-users/csr-buyers') && (this.admin.admin_acl['Buyer Management'] === 1)) ||
//           ((state.url === '/dashboard/view-inhouse-users/inhouse-broker') && (this.admin.admin_acl['Broker Management'] === 1)) ||
//           ((state.url === '/dashboard/view-inhouse-users/csr-closers') && (this.admin.admin_acl['Closer Management'] === 1))) {
// console.log('===');
//             return true;
//       }


console.log('local storage admin acl', admin_acl['Seller Management']);
      if (((state.url === '/dashboard/view-inhouse-users/data-collectors') && (admin_acl['Data Collector Management']['can_read'] === 1)) ||
          ((state.url === '/dashboard/view-inhouse-users/csr-sellers') && (admin_acl['Seller Management']['can_read'] === 1)) ||
          ((state.url === '/dashboard/view-inhouse-users/csr-buyers') && (admin_acl['Buyer Management']['can_read'] === 1)) ||
          ((state.url === '/dashboard/view-inhouse-users/inhouse-broker') && (admin_acl['Broker Management']['can_read'] === 1)) ||
          ((state.url === '/dashboard/view-inhouse-users/csr-closers') && (admin_acl['Closer Management']['can_read'] === 1))) {
console.log('===');
            return true;
      } else {
        console.log('no');
        this.router.events.pairwise().subscribe((e) => {
          const previousUrl = e[1]['url'];
          console.log('inside router');
          console.log(previousUrl);
          this.router.navigate([previousUrl]);
          console.log('previous', previousUrl);
          return false;
        });
        // this.location.back();
        return false;
      }
  }
}
