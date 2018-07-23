import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { AdminService } from './admin.service';
import { SweetAlertService } from 'ngx-sweetalert2';

@Injectable()

export class AuthGuard implements CanActivate {

  constructor(private router: Router, private admin: AdminService, private swal: SweetAlertService){}

  canActivate(){
    const token =  localStorage.getItem('token');

    this.admin.login.subscribe(success=>{
      if (success['name'] === undefined){
        const input = new FormData();
        this.admin.postDataApi('get-details', input)
        .subscribe(
          success => {
            this.admin.login.next(success.data)
          });
      }
    })

    if (token) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}
