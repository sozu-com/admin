import { Component, OnInit } from '@angular/core';
import { AppSidebarComponent } from '../app-sidebar/app-sidebar.component';
import { AdminService } from './../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css'],
  providers: [AppSidebarComponent]
})

export class AppHeaderComponent {

  fullName: any;
  public scrollbarOptions = { axis: 'yx', theme: 'minimal-dark' };

  constructor(private sidebar: AppSidebarComponent, private admin: AdminService, private router: Router) {
    this.admin.loginData$.subscribe(success=>{
      this.fullName = success['name'];
    })
  }


  onLoggedout(){
    this.sidebar.onLoggedout();
  }
}
