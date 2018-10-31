import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Constant } from './../../../common/constants';
import { IProperty } from './../../../common/property';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-viewed-projects',
  templateUrl: './viewed-projects.component.html',
  styleUrls: ['./viewed-projects.component.css']
})
export class ViewedProjectsComponent implements OnInit {

  @Input('viewed_projects') viewed_projects;
  @Input('user_id') user_id;
  @ViewChild('showProjectModal') showProjectModal: ElementRef;

  public parameter: IProperty = {};
  constructor(public constant: Constant, private admin: AdminService) { }

  ngOnInit() {
    this.parameter.page = this.constant.p;
    // console.log('ip', this.viewed_projects);
  }

  viewProjects(data, user_id) {
    // this.parameter.viewed_projects = data;
    // this.showProjectModal.nativeElement.click();
    this.parameter.loading = true;
    this.admin.postDataApi('leads/viewedProjects', {user_id: user_id, page: this.parameter.page}).subscribe(r => {
      this.parameter.loading = false;
      this.parameter.viewed_projects = r.data;
      console.log('Country', this.parameter.viewed_projects);
      this.showProjectModal.nativeElement.click();
    }, error => {
      this.parameter.loading = false;
    });
  }
}
