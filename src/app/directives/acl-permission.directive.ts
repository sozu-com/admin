import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appAclPermission]'
})

export class AclPermissionDirective {
  // @Input('aclId') aclId;
  constructor() {
    console.log('yess');
    // console.log('aclId', this.aclId);
  }

}
