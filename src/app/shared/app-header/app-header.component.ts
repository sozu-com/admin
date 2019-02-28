import { Component } from '@angular/core';
import { AdminService } from './../../services/admin.service';
import { Router } from '@angular/router';
import { Constant } from '../../common/constants';
import { IProperty } from '../../common/property';
// import { MessagingService } from '../../fire-base/messaging.service';

declare let swal: any;

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})

export class AppHeaderComponent {

  public parameter: IProperty = {};
  fullName: any;
  image: any;
  admin_acl: any;
  msg_count = 0;
  public scrollbarOptions = { axis: 'yx', theme: 'minimal-dark' };

  constructor(public admin: AdminService, private router: Router, private constant: Constant,
    // private msg: MessagingService
    ) {
    this.admin.loginData$.subscribe(success => {
      // console.log('success1', success);
      this.fullName = success['name'];
      this.image = success['image'];
    });

    // this.msg.currentMessage$.subscribe(r => {
    //   console.log('push', r);
    //   if ( r != null && r.data.notification_type !== 100) {
    //     /* count if not a push of chat messages */
    //     this.msg_count++;
    //   }
    // });
console.log('msg_count', this.msg_count);
    this.getNotifications();
  }

  setData() {
    this.admin.postDataApi('get-details', {})
      .subscribe(
        success1 => {
          this.fullName = success1.data.name;
          this.image = success1.data.image;
          const dd = success1.data.m.map((obj, index) => {
            const key =  Object.keys(obj)[0];
            this.admin.admin_acl[key] =  obj[key];
          });
        });
  }

  onLoggedout() {
    swal({
      title: 'Are you sure?',
      text: 'You want to logout?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Logout!'
    }).then((result) => {
      if (result.value) {
        this.logout();
      }
    });
  }


  logout() {
    this.parameter.loading = true;
    this.admin.postDataApi('logout', {}).subscribe(r => {
      this.parameter.loading = false;
      if (r) {
        swal('Success', 'Logout successfully.', 'success');
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedin');
        localStorage.removeItem('permissions');
        localStorage.removeItem('admin_acl');
        this.admin.admin_acl = {};
        this.admin.admin_acl_array = [];
        this.admin.permissions = {};
        this.router.navigate(['']);
      }
    }, error => {
      this.parameter.loading = false;
    });
  }


  getNotifications() {
    this.admin.postDataApi('getNotifications', {}).subscribe(r => {
      this.parameter.items = r.data;
      // this.msg_count = r.total_count;
    });
  }

  viewNotification () {
    this.msg_count = 0;
    this.router.navigate(['/dashboard/notifications']);
  }
}
