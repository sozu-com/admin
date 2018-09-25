import { Component, OnInit } from '@angular/core';
import { AdminService } from './../../services/admin.service';
import { Router } from '@angular/router';
// import { SweetAlertService } from 'ngx-sweetalert2';
declare let swal: any;
// import { AdminACL } from './../../common/adminAcl';
// import { AclPermissionDirective } from './../../directives/acl-permission.directive';
import { Login, AdminACL } from './../../models/login.model';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css'],
  providers: [Login, AdminACL]
})

export class AppHeaderComponent {

  fullName: any;
  image: any;
  admin_acl: any;
  public scrollbarOptions = { axis: 'yx', theme: 'minimal-dark' };

  constructor(public admin: AdminService, private router: Router, public adminModel: AdminACL) {
    this.admin.loginData$.subscribe(success => {
      this.fullName = success['name'];
      this.image = success['image'];
      // console.log('admin_acl', success['admin_acl']);
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
    this.admin.admin_acl = {};
    this.admin.permissions = {};
    this.router.navigate(['']);
  }
}
