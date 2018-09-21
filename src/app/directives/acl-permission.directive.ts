import { Directive, Input, ElementRef, HostListener } from '@angular/core';
import { AdminService } from '../services/admin.service';
// import { AdminACL } from './../common/adminAcl';

@Directive({
  selector: '[appAclPermission]'
})

export class AclPermissionDirective {
  @Input('aclId') aclId;
  // @Input('admin_acl') admin_acl;
  admin_acl: any;
  constructor(public el: ElementRef, private admin: AdminService) {
    // console.log('yess');
    // console.log('aa', this.admin_acl);
    // this.admin_acl.forEach(element => {
    //   if (element.can_read === 0) {
    //     el.nativeElement.style.display = 'none';
    //   }
    // });

    // this.admin.loginData$.subscribe(success => {
    //   // console.log('succccccc', success);
    //   setTimeout(() => {
    //     this.admin_acl = success['admin_acl'];
    //     this.admin_acl.forEach(element => {
    //       // console.log(element);
    //       // console.log('aclId', this.aclId, element.acl_id);
    //       if (element.acl_id === this.aclId && element.can_read === 0) {
    //         el.nativeElement.style.display = 'none';
    //       }
    //       if (element.acl_id === this.adminAcl.permission.broker_management && element.can_read === 0 &&
    //         element.acl_id === this.adminAcl.permission.seller_management && element.can_read === 0 &&
    //         element.acl_id === this.adminAcl.permission.data_collector_management && element.can_read === 0) {
    //           el.nativeElement.style.display = 'none';
    //       }
    //     });
    //   }, 100);
    // });
  }
}
