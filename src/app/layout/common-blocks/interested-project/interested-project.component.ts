import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constant } from 'src/app/common/constants';
import { IProperty } from 'src/app/common/property';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-interested-project',
  templateUrl: './interested-project.component.html',
  styleUrls: ['./interested-project.component.css']
})
export class InterestedProjectComponent implements OnInit {

  @Input('viewed_projects') viewed_projects;
  @Input('user_id') user_id;
  @ViewChild('showProjectModal') showProjectModal: ElementRef;

  public parameter: IProperty = {};
  public scrollbarOptions = { axis: 'y', theme: 'dark', scrollbarPosition: 'inside'};
  constructor(public constant: Constant, private admin: AdminService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.parameter.page = this.constant.p;
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
  }

  getPage(page) {
    this.parameter.page = page;
    this.viewProjects('', this.parameter.page, this.user_id);
  }

  viewProjects(data, page, user_id) {
    this.spinner.show();
    this.admin.postDataApi('leads/viewedProjects', {user_id: user_id, page: page}).subscribe(r => {
      this.spinner.hide();
      this.parameter.total = r.total;
      this.parameter.viewed_projects = r.data;
      if (this.parameter.page === 1) {
        this.showProjectModal.nativeElement.click();
      }
    }, error => {
      this.spinner.hide();
    });
  }
}
