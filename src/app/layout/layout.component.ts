import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})

export class LayoutComponent implements OnInit {
  $user: any;
  constructor(public admin: AdminService) {
    this.admin.userback.subscribe(user => {
      this.$user = user ? user : false;
    });
  }
  ngOnInit() { }
}
