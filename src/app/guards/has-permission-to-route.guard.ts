import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { AdminService } from '../services/admin.service';

@Injectable({
  providedIn: 'root'
})
export class HasPermissionToRouteGuard implements CanActivate {

  constructor(
    private adminService: AdminService,
    private location: Location,
    private router: Router,
    private toastrService: ToastrService,
    private translateService: TranslateService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.adminService.admin_acl['Project Management'].can_read == 1) {
      return of(true);
    } else {
      this.toastrService.clear();
      this.toastrService.error(
        this.translateService.instant('message.error.SorryYouDoNotHaveThePermissionToGoThere'),
        this.translateService.instant('swal.error')
      );
      return of(false);
    }

  }

}
