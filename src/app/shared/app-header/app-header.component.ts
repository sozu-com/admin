import { Component, OnInit } from '@angular/core';
import { AppSidebarComponent } from '../app-sidebar/app-sidebar.component';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css'],
  providers: [AppSidebarComponent]
})

export class AppHeaderComponent {

  fullName: any;
  public scrollbarOptions = { axis: 'yx', theme: 'minimal-dark' };

  constructor(private sidebar: AppSidebarComponent) { }

  onLoggedout(){
    this.sidebar.onLoggedout();
  }
}
