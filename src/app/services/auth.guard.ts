import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { AdminService } from './admin.service';

@Injectable()

export class AuthGuard implements CanActivate {

  constructor (private router: Router, private admin: AdminService) {}

  canActivate () {
    const token =  localStorage.getItem('token');

    if (token) {
      this.admin.login.subscribe(success => {
        if (success['name'] === undefined) {
          this.admin.postDataApi('get-details', {})
          .subscribe(
            success1 => {
              this.admin.login.next(success1.data);
            });
        }
      });

      this.admin.country.subscribe(success => {
        if (!success[0]) {
          this.admin.postDataApi('getCountryLocality', {})
          .subscribe(
            success1 => {
              this.admin.country.next(success1.data);
            });
        }
      });
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}
