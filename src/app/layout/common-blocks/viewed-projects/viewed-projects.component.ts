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
  public scrollbarOptions = { axis: 'y', theme: 'dark', scrollbarPosition: 'inside'};
  constructor(public constant: Constant, private admin: AdminService) { }

  ngOnInit() {
    this.parameter.page = this.constant.p;
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
  }

  getPage(page) {
    this.parameter.page = page;
    this.viewProjects('', this.parameter.page, this.user_id);
  }

  viewProjects(data, page, user_id) {
    // this.parameter.viewed_projects = data;
    // this.showProjectModal.nativeElement.click();
    this.parameter.loading = true;
    this.admin.postDataApi('leads/viewedProjects', {user_id: user_id, page: page}).subscribe(r => {
      this.parameter.loading = false;
      this.parameter.total = r.total;
      this.parameter.viewed_projects = r.data;
      console.log('Country', this.parameter.viewed_projects);
      if (this.parameter.page === 1) {
        this.showProjectModal.nativeElement.click();
      }
    }, error => {
      this.parameter.loading = false;
    });
  }
}
