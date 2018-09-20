import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-acl-permission',
  templateUrl: './acl-permission.component.html',
  styleUrls: ['./acl-permission.component.css']
})
export class AclPermissionComponent implements OnInit {

  // @Input('id') id;
  // @Input('type') type;
  constructor() { }

  ngOnInit() {
    console.log('yes');
  }

}
