import { Component, OnInit } from '@angular/core';
import { UIService } from '../../services/ui.service';
import { AppSidebarComponent } from '../app-sidebar/app-sidebar.component';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css'],
  providers: [UIService, AppSidebarComponent]
})

export class AppHeaderComponent {

  fullName: any;
  public scrollbarOptions = { axis: 'yx', theme: 'minimal-dark' };

  constructor(private sidebar: AppSidebarComponent, public UIService: UIService) { }

  onLoggedout(){
    this.sidebar.onLoggedout();
  }
}
