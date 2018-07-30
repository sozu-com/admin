import { Component, OnInit } from '@angular/core';
import { AdminService } from './../../services/admin.service';
import { Router } from '@angular/router';
import { SweetAlertService } from 'ngx-sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})

export class AppHeaderComponent {

  fullName: any;
  image: any;
  public scrollbarOptions = { axis: 'yx', theme: 'minimal-dark' };

  constructor(private admin: AdminService, private router: Router, private swal: SweetAlertService) {
    this.admin.loginData$.subscribe(success => {
      this.fullName = success['name'];
      this.image = success['image'];
    });
  }

  onLoggedout(){
      const self = this;
      this.swal.confirm({
          title: 'Are you sure?',
          text: 'You want to log-out?',
      }).then(function(){
      self.logout();
      })
      .catch(function(){
      // console.log('Logout cancelled by user');
      });
  }


  logout(){
      localStorage.removeItem('accessToken');
      localStorage.removeItem('isLoggedin');
      this.admin.unsetUserLoggedIn();
      this.router.navigate(['']);
  }
}
