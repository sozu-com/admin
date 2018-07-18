import { Component, OnInit } from '@angular/core';
import { AppSidebarComponent } from '../app-sidebar/app-sidebar.component';
import { AdminService } from './../../services/admin.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css'],
  providers: [AppSidebarComponent]
})

export class AppHeaderComponent {

  fullName: any;
  public scrollbarOptions = { axis: 'yx', theme: 'minimal-dark' };

  constructor(private sidebar: AppSidebarComponent, private admin: AdminService) { 
    this.admin.loginData$.subscribe(success=>{
      console.log('header', success['data'].name)
      this.fullName = success['data'].name;
    })
  }

  onLoggedout(){
    this.sidebar.onLoggedout();
  }
}
