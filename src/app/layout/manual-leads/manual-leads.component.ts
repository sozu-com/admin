import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { IProperty } from 'src/app/common/property';
import { Constant } from 'src/app/common/constants';
import { NgxSpinnerService } from 'ngx-spinner';
declare let swal: any;

@Component({
  selector: 'app-manual-leads',
  templateUrl: './manual-leads.component.html',
  styleUrls: ['./manual-leads.component.css']
})

export class ManualLeadsComponent implements OnInit {

  public parameter: IProperty = {};
  public items: any[] = [];

  constructor(
    public admin: AdminService,
    private constant: Constant,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.getListing();
  }

  getPage = (pageNumber: number): void => {
    this.parameter.page = pageNumber;
    this.getListing();
  }

  getListing = (): void => {
    this.parameter.url = 'getManualLeads';
    this.spinner.show();
    this.admin.postDataApi(this.parameter.url, this.parameter).subscribe((success) => {
      this.spinner.hide();
      this.items = success.data;
      this.parameter.total = success.total_count;
    }, (error) => {
      this.spinner.hide();
    });
  }

  changeFilter(value, data){

  }

}
