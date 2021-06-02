import { Component, OnInit } from '@angular/core';
import { AdminService } from './../../services/admin.service';
import { Router } from '@angular/router';
import { Constant } from '../../common/constants';
import { IProperty } from '../../common/property';
import { MessagingService } from 'src/app/fire-base/messaging.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
// import { MessagingService } from '../../fire-base/messaging.service';

declare let swal: any;

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})

export class AppHeaderComponent {

  message: any;
  public parameter: IProperty = {};
  fullName: string;
  image: string;
  admin_acl: any;
  msg_count = 0;
  public scrollbarOptions = { axis: 'yx', theme: 'minimal-dark' };

  constructor(public admin: AdminService,
    private router: Router,
    public constant: Constant,
    private messagingService: MessagingService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService
    ) {

    this.admin.loginData$.subscribe(success => {
      this.fullName = success['name'];
      this.image = success['image'];

      this.messagingService.requestPermission(success['id']);
      this.messagingService.receiveMessage();
      this.message = this.messagingService.currentMessage;
      // if (this.messagingService.fcmTokens) {
      //   this.updateDeviceToken();
      // }
    });

    // this.msg.currentMessage$.subscribe(r => {
    //   if ( r != null && r.data.notification_type !== 100) {
    //     /* count if not a push of chat messages */
    //     this.msg_count++;
    //   }
    // });
    this.getNotifications();
  }

  updateDeviceToken() {
    this.admin.postDataApi('updateDeviceToken', {device_id: this.admin.deviceId, device_token: this.messagingService.fcmTokens})
      .subscribe(
        success1 => {
          // console.log('suc', success1);
        });
  }

  setData() {
    this.admin.postDataApi('get-details', {})
      .subscribe(
        success1 => {
          localStorage.setItem('all', JSON.stringify(success1));
          localStorage.setItem('user-id', JSON.stringify(((success1 || {}).data || {}).id));
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
      html: this.translate.instant('message.error.areYouSure') + '<br>' +
      this.translate.instant('message.error.wantToLogout'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: this.translate.instant('message.error.logoutBtn')
    }).then((result) => {
      if (result.value) {
        this.logout();
      }
    });
  }


  logout() {
    this.spinner.show();
    this.admin.postDataApi('logout', {}).subscribe(r => {
      this.spinner.hide();
      if (r) {
        swal(this.translate.instant('swal.success'), this.translate.instant('message.success.logoutSuccessfully'), 'success');
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
      this.spinner.hide();
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
