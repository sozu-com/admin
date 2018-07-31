import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { AdminService } from './admin.service';

@Injectable()

export class AuthGuard implements CanActivate {

  constructor (private router: Router, private admin: AdminService) {}

  canActivate () {
    const token =  localStorage.getItem('token');

    this.admin.login.subscribe(success => {
      if (success['name'] === undefined) {
        const input = new FormData();
        this.admin.postDataApi('get-details', input)
        .subscribe(
          success1 => {
            this.admin.login.next(success1.data);
          });
      }
    });

    if (token) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}
