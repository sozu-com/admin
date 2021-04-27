import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AdminService } from './../services/admin.service';
import { Location } from '@angular/common';
import { of, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class AclUserGuard implements CanActivate {
  previousUrl: any = null;
  constructor(private admin: AdminService, private location: Location, private router: Router
    , private toastrService: ToastrService, private translateService: TranslateService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.admin.admin_acl = this.admin.admin_acl ? this.admin.admin_acl : {};
    this.admin.permissions = this.admin.permissions ? this.admin.permissions : {};
    if (Object.keys(this.admin.permissions).length === 0 && Object.keys(this.admin.admin_acl).length === 0) {
      return this.admin.getDetails().map(e => {
        if (e) {
          return this.checkData(next, state, this.admin.admin_acl, this.admin.permissions);
        }
      }).catch(() => {
        this.location.back();
        // return Observable.of(false); // used for angular4
        return of(false);
      });
    } else {
      return this.checkData(next, state, this.admin.admin_acl, this.admin.permissions);
    }
  }

  checkData(next, state, admin_acl, permissions) {
    const roles = next.data['roles'] as Array<string>;
    const key = roles ? roles[0] : '';
    const subkey = roles ? roles[1] : '';
    const inhouseUserRole = roles ? roles[2] : '';
    if (permissions || admin_acl) {
      const obj = admin_acl[key];
      if (((state.url === '/dashboard/view-inhouse-users/data-collectors') && (admin_acl['Data Collector Management']['can_read'] === 1)) ||
        ((state.url === '/dashboard/view-inhouse-users/csr-sellers') && (admin_acl['Seller Management']['can_read'] === 1)) ||
        ((state.url === '/dashboard/view-inhouse-users/csr-buyers') && (admin_acl['Buyer Management']['can_read'] === 1)) ||
        ((state.url === '/dashboard/view-inhouse-users/inhouse-broker') && (admin_acl['Inhouse Agent Management']['can_read'] === 1)) ||
        ((state.url === '/dashboard/view-inhouse-users/outside-broker') && (admin_acl['Outside Agent Management']['can_read'] === 1)) ||
        ((state.url === '/dashboard/view-inhouse-users/csr-renters') && (admin_acl['Renter Management']['can_read'] === 1)) ||
        ((state.url === '/dashboard/view-inhouse-users/collection-agents') && (admin_acl['Collection Agent Management']['can_read'] === 1)) ||
        ((state.url === '/dashboard/view-inhouse-users/credit-agents') && (admin_acl['Credit Agent Management']['can_read'] === 1)) ||
        ((state.url === '/dashboard/view-inhouse-users/csr-closers') && (admin_acl['Closer Management']['can_read'] === 1)) ||
        ((state.url === '/dashboard/view-inhouse-users/alliance-agents') && (admin_acl['Alliance Agent Management']['can_read'] === 1)) ||
        ((state.url === '/dashboard/view-inhouse-users/cordinator-agents') && (admin_acl['Cordinator Agent Management']['can_read'] === 1)) ||
        ((state.url === `${'/dashboard/view-inhouse-users/'}${next.params.userType}${'/'}${next.params.id}`) && (admin_acl['Inhouse Agent Management']['can_read'] === 1)) ||
        ((state.url === `${'/dashboard/view-inhouse-users/'}${next.params.userType}${'/'}${next.params.id}`) && (admin_acl['Outside Agent Management']['can_read'] === 1))
      ) {
        this.previousUrl = state.url;
        return true;
      } else if ((obj && obj[subkey] === 1) || (permissions && permissions[inhouseUserRole] === 1)) {
        this.previousUrl = state.url;
        return true;
      } else if (obj && obj[subkey] === 0) {
        if (this.previousUrl) {
          this.toastrService.clear();
          this.toastrService.warning(
            this.translateService.instant('message.error.SorryYouDoNotHaveThePermissionToGoThere'),
            this.translateService.instant('swal.warning')
          );
          return false;
        } else {
          this.location.back();
          //this.router.navigate(['/dashboard']);
          return false;
        }
      } else {
        this.location.back();
        return false;
        // if (state) {
        //   return this.hasPermissionToRoute(next, state);
        // } else {
        //   return false;
        // }
      }
    } else {
      return false;
    }
  }

  // hasPermissionToRoute(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  //   const route = state.url.split('/');
  //   switch (route[2]) {
  //     case 'projects':
  //       return this.canRead('Project Management');
  //     case 'legal-entities':
  //       return this.canRead('Manage Legal Entity');
  //     case 'collections':
  //       return this.canRead('Manage Collections');
  //     case 'properties':
  //       return this.canRead('Property Management');
  //     case 'developers':
  //       return this.canRead('Developers Management');
  //     case 'leads':
  //       switch (route[3]) {
  //         case 'inhouse-broker-leads':
  //           return this.canRead('Inhouse Agent Lead Management');
  //         case 'outside-broker-leads':
  //           return this.canRead('Outside Agent Lead Management');
  //       }
  //     case 'managers':
  //       return this.canRead('Managers Management');
  //     // case 'projects':
  //     //   return this.canRead('Project Management');
  //     //break;
  //     default:
  //       this.location.back();
  //       return false;
  //   }
  // }

  // canRead(managementName: any): boolean {
  //   if (this.admin.admin_acl[managementName].can_read == 1) {
  //     return true;
  //   } else {
  //     this.toastrService.clear();
  //     this.toastrService.warning(
  //       this.translateService.instant('message.error.SorryYouDoNotHaveThePermissionToGoThere'),
  //       this.translateService.instant('swal.warning')
  //     );
  //     return false;
  //   }
  // }
}
