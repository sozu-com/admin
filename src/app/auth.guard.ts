import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()

export class AuthGuard implements CanActivate {
  
  constructor(private router: Router){}

  canActivate(){
    let token =  localStorage.getItem('token');
    if (token) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}
