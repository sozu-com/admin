import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from './../../services/admin.service';
import * as jquery from 'jquery';
import { HttpInterceptor } from '../../services/http-interceptor';
import { IProperty } from '../../common/property';
import { Constant } from '../../common/constants';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {

  public parameter: IProperty = {};
  items: any= [];
  total: any= 0;

  public status= {
    1: 'draft',
    2: 'publish'
  };

  constructor(
    private admin: AdminService,
    public constant: Constant,
    private http: HttpInterceptor
  ) { }


  ngOnInit() {
    this.http.loader.next({value: false});
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.parameter.post_type = '1';
    this.getListing();
  }

  getListing() {
    this.parameter.loading = true;
    this.admin.postDataApi('getBlogs', this.parameter).subscribe(
      success => {
        console.log('LIST', success);
        this.items = success.data;
        this.total = success.total_count;
        this.parameter.loading = false;
      },
      error => {
        this.parameter.loading = false;
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
    }else {
      this.parameter.sort_by_order = this.parameter.sort_by_order ? 0 : 1;
    }
    this.getListing();
  }

}
