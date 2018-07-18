import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { AdminService } from './services/admin.service'
import { SweetAlertService } from 'ngx-sweetalert2';

@Injectable()

export class AuthGuard implements CanActivate {
  
  constructor(private router: Router, private admin: AdminService, private swal: SweetAlertService){}

  canActivate(){
    let token =  localStorage.getItem('token');

    if(this.admin.loginData$ == undefined){
      let input = new FormData();
      this.admin.loginData$ = this.admin.postDataApi('get-details', input);
    }

    if (token) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}
