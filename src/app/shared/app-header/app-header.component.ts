import { Component, OnInit } from '@angular/core';
import { AppSidebarComponent } from '../app-sidebar/app-sidebar.component';
import { AdminService } from './../../services/admin.service';
import { ActivatedRoute, Route, Router, NavigationEnd } from '@angular/router';

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
    router.events.subscribe((val) => {
      // see also 
      console.log('inside')
      console.log(val instanceof NavigationEnd) 
  });
    // console.log('header', this.admin.loginData$.getValue())
    // this.admin.loginData$.subscribe(success=>{
    //   console.log('header', success)
    //   // this.fullName = success['data'].name;
    // })
  }


  onLoggedout(){
    this.sidebar.onLoggedout();
  }
}
