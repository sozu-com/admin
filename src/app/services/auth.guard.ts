import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { AdminService } from './admin.service'
import { SweetAlertService } from 'ngx-sweetalert2';

@Injectable()

export class AuthGuard implements CanActivate {
  
  constructor(private router: Router, private admin: AdminService, private swal: SweetAlertService){}

  canActivate(){
    let token =  localStorage.getItem('token');
// console.log('vvvvvvvvvvv', this.admin.loginData$.data)
    if(this.admin.loginData$.data == undefined){
      let input = new FormData();
      // this.admin.loginData$ = this.admin.postDataApi('get-details', input)

      this.admin.postDataApi('get-details', input)
      .subscribe(
        success => {
          // console.log('zzzzzzzzzzzzzzzzzzz', success.data)
          this.admin.loginData$ = success.data;
        });
    }

    if (token) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}
