import { Component, OnInit } from '@angular/core';
import { AdminService } from './../../services/admin.service';
import * as jquery from 'jquery';
import { HttpInterceptor } from '../../services/http-interceptor';
import { IProperty } from '../../common/property';
import { Constant } from '../../common/constants';
import { NgxSpinnerService } from 'ngx-spinner';
declare let swal: any;

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {

  public parameter: IProperty = {};
  items: any = [];
  total: any = 0;

  public status = {
    1: 'draft',
    2: 'publish'
  };

  constructor(
    public admin: AdminService,
    public constant: Constant,
    private http: HttpInterceptor,
    private spinner: NgxSpinnerService
  ) { }


  ngOnInit() {
    this.http.loader.next({ value: false });
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.parameter.post_type = '1';
    this.getListing();
  }

  getListing() {
    this.spinner.show();
    this.admin.postDataApi('getBlogs', this.parameter).subscribe(
      success => {
        this.items = success.data;
        this.total = success.total_count;
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      });
  }

  getPage(page) {
    this.parameter.page = page;
    this.getListing();
  }

  changeFlag(post_type) {
    this.parameter.post_type = post_type;
    this.getListing();
  }

  sort_by(sort_by_flag) {
    if (this.parameter.sort_by_flag !== sort_by_flag) {
      this.parameter.sort_by_flag = sort_by_flag;
      this.parameter.sort_by_order = 0;
    } else {
      this.parameter.sort_by_order = this.parameter.sort_by_order ? 0 : 1;
    }
    this.getListing();
  }


  deleteBlogPopUp(id: any, index: number) {
    this.parameter.title = this.constant.title.ARE_YOU_SURE;
    this.items.splice(1, index);
    this.parameter.text = this.constant.title.DELETE_BLOG;
    this.parameter.successText = this.constant.successMsg.BLOCKED_SUCCESSFULLY;

    swal({
      html: this.parameter.title + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.deleteBlog(id, index);
      }
    });
  }

  deleteBlog(id: any, index: number) {
    this.admin.postDataApi('deleteBlog', { id: id }).subscribe(
      success => {
        swal('Success', 'Deleted successfully.', 'success');
      },
      error => {
        swal('Error', 'Error while deleting.', 'error');
      });
  }

}
