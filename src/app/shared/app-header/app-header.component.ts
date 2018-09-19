import { Component, OnInit } from '@angular/core';
import { AdminService } from './../../services/admin.service';
import { Router } from '@angular/router';
// import { SweetAlertService } from 'ngx-sweetalert2';
declare let swal: any;

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})

export class AppHeaderComponent {

  fullName: any;
  image: any;
  public scrollbarOptions = { axis: 'yx', theme: 'minimal-dark' };

  constructor(private admin: AdminService, private router: Router) {
    this.admin.loginData$.subscribe(success => {
      this.fullName = success['name'];
      this.image = success['image'];
    });
  }

  onLoggedout() {
    swal({
      title: 'Are you sure?',
      text: 'You want to logout?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Logout!'
    }).then((result) => {
      if (result.value) {
        this.logout();
      }
    });
  }


  logout() {
    swal('Success', 'Logout successfully.', 'success');
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedin');
    // this.admin.unsetUserLoggedIn();
    this.router.navigate(['']);
  }
}
