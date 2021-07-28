import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { IProperty } from 'src/app/common/property';
import { Constant } from 'src/app/common/constants';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
declare let swal: any;

@Component({
  selector: 'app-manual-leads',
  templateUrl: './manual-leads.component.html',
  styleUrls: ['./manual-leads.component.css']
})

export class ManualLeadsComponent implements OnInit {

  public parameter: IProperty = {};
  public items: any[] = [];
  lead_type: any;

  constructor(
    public admin: AdminService,
    private constant: Constant,
    private spinner: NgxSpinnerService,
    private translate: TranslateService
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

  changeFilter = (key: string, value: any): void => {
    this.parameter[key] = value;
    this.getListing();
  }

  deletePopup(item: any) {
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' +
        this.translate.instant('message.error.wantToDeleteLead'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: this.translate.instant('deleteSwal.yes'),
      cancelButtonText: this.translate.instant('deleteSwal.cancel')
    }).then((result) => {
      if (result.value) {
        this.deleteManualLead(item);
      }
    });
  }

  deleteManualLead(item){
    this.spinner.show();
    let index = this.items.findIndex(x=> x.id == item.id)
    this.admin.postDataApi('deleteManualLead',{ id: item.id }).subscribe(r => {
      swal(this.translate.instant('swal.success'), this.translate.instant('message.success.deletedSuccessfully'), 'success');
      this.items.splice(index, 1);
      this.parameter.total = this.items.length;
      this.spinner.hide();
    },
      error => {
        this.spinner.hide();
        swal(this.translate.instant('swal.error'), error.error.message, 'error');
      });
  }

  moveLead(item){
    this.spinner.show();
    this.admin.postDataApi('moveManualLead',{ lead_id: item.id }).subscribe(r => {
      this.getListing();
      this.spinner.hide();
  },
  error => {
    this.spinner.hide();
  });
}

}
