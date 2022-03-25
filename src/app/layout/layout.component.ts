import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})

export class LayoutComponent implements OnInit {
  $user: string;
  all: number;
  constructor(public admin: AdminService) {
    var all_data = JSON.parse(localStorage.getItem('all'));
    var keys = Object.keys(all_data.data.permissions);
    var filtered = keys.filter(function (key) {
      return all_data.data.permissions[key]
    });
    var theRemovedElement = filtered.slice(3);
    theRemovedElement.splice(-2);
    if (theRemovedElement.length > 1) {
      this.all = 0;
    } else if (theRemovedElement.length == 1) {
      const found = theRemovedElement.find(element => element == 'can_outside_broker');
      console.log(found, "found_layout");
      if (found == 'can_outside_broker') {
        this.all = 1;
      } else {
        this.all = 0;
      }
    } else {
      this.all = 0;
    }
  }
  ngOnInit() {
    this.admin.userback.subscribe(user => {
      this.$user = user;
      console.log(this.$user, "test");
    });
  }
}
