import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiConstants } from 'src/app/common/api-constants';
import { Constant } from 'src/app/common/constants';
import { IProperty } from 'src/app/common/property';
import { AdminService } from 'src/app/services/admin.service';
import { ProjectService } from 'src/app/services/project.service';
import * as moment from 'moment';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
declare let swal: any;
declare var $: any;

@Component({
  selector: 'app-manage-contracts',
  templateUrl: './manage-contracts.component.html',
  styleUrls: ['./manage-contracts.component.css']
})
export class ManageContractsComponent implements OnInit {

  @ViewChild('openSelectColumnsModal') openSelectColumnsModal: ElementRef;
  @ViewChild('closeSelectColumnsModal') closeSelectColumnsModal: ElementRef;
  
  public parameter: IProperty = {};
  public select_columns_list: any[] = [];
  public selectedColumnsToShow: any = {};
  public isSelectAllColumns: boolean = false;
  public keyword: string = '';
  public language_code: string;
  public scrollbarOptions = { axis: 'y', theme: 'dark' };
  items: any = [];
  total: any = 0;

  constructor(
    public constant: Constant,
    public apiConstant: ApiConstants,
    public admin: AdminService,
    public projectService: ProjectService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService, 
  ) { }

  ngOnInit() {
    this.parameter.flag = 1;
    this.parameter.dash_flag = this.projectService.dash_flag ? this.projectService.dash_flag : this.constant.dash_flag;
    this.getContractHome();
  }

  changePropertyFlag(tab){
    this.parameter.flag = tab;
      this.getContractHome();
  }

  getContractSelection  = (isFirstTime: boolean, keyword?: string): void => {
    this.spinner.show();
    let url = this.parameter.flag == 1 ? 'getContractSelection' : 'getContractTypeSelection';
    this.admin.postDataApi(url, { name: keyword }).subscribe((response) => {
      this.spinner.hide();
      this.select_columns_list = (response.data || []).sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
      (this.select_columns_list || []).forEach((data, index) => {
        this.makeSelectedColumns(data.id, index);
      });
      this.changeSelect();
      if (isFirstTime) {
        this.keyword = '';
        this.isSelectAllColumns = false;
        this.language_code = localStorage.getItem('language_code');
        this.openSelectColumnsModal.nativeElement.click();
      }
    }, (error) => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), ((error || {}).error || {}).message, 'error');
    });
  }

  changeSelect = (): void => {
    let index = 0;
    (this.select_columns_list || []).forEach((data) => {
      if (data.isCheckBoxChecked) {
        index += 1;
      }
    });
    if ((this.select_columns_list || []).length == index) {
      this.isSelectAllColumns = true;
    } else {
      this.isSelectAllColumns = false;
    }
  }

  makeSelectedColumns = (id: number, index: number): void => {
    switch (id) {
      case 1:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.collection_id;
        break;
      case 2:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.developer;
        break;
      case 3:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.project;
        break;  
      case 4:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.apartment;
        break;
      case 5:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.buyer;
        break;
      case 6:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.type_of_contract;
        break;
      case 7:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.signature_date;
        break;
      case 8:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.status;
        break;
      case 9:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.action;
        break;
      default:
        break;
    }

  }

  getContractHome = (): void => {
    //this.spinner.show();
    let url = this.parameter.flag == 1 ? 'getContractHome' : 'getContractTypeHome';
    this.admin.postDataApi(url, { user_id: JSON.parse(localStorage.getItem('user-id')) || 0 }).subscribe((response) => {
      this.selectedColumnsToShow = response.data || {};
      //this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), error.message, 'error');
    });
  }

  changeSelectAll = (): void => {
    (this.select_columns_list || []).forEach((data) => {
      data.isCheckBoxChecked = this.isSelectAllColumns;
    });
  }

  closeSelectColumnsPopup = (): void => {
    this.keyword = '';
    this.isSelectAllColumns = false;
    this.closeSelectColumnsModal.nativeElement.click();
  }

  applyShowSelectedColumns = (): void => {
    this.spinner.show();
    let url = this.parameter.flag == 1 ? 'updateContractHome' : 'updateContractTypeHome'
    this.admin.postDataApi(url, this.getPostRequestForColumn()).subscribe((response) => {
      this.spinner.hide();
      this.closeSelectColumnsPopup();
      this.getContractHome();
    }, (error) => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), error.error.message, 'error');
    });
  }

  getPostRequestForColumn = (): any => {
    if(this.parameter.flag == 1){
    return {
      user_id: JSON.parse(localStorage.getItem('user-id')) || 0,
      collection_id: (this.select_columns_list[3] || []).isCheckBoxChecked,
      developer: (this.select_columns_list[4] || []).isCheckBoxChecked,
      project: (this.select_columns_list[5] || []).isCheckBoxChecked,
      apartment: (this.select_columns_list[1] || []).isCheckBoxChecked,
      buyer: (this.select_columns_list[2] || []).isCheckBoxChecked,
      type_of_contract: (this.select_columns_list[8] || []).isCheckBoxChecked,
      signature_date: (this.select_columns_list[6] || []).isCheckBoxChecked,
      status: (this.select_columns_list[7] || []).isCheckBoxChecked,
      actions: (this.select_columns_list[0] || []).isCheckBoxChecked,
    };
  }
  else{
    return {
      user_id: JSON.parse(localStorage.getItem('user-id')) || 0,
      contract_id: (this.select_columns_list[1] || []).isCheckBoxChecked,
      developer: (this.select_columns_list[2] || []).isCheckBoxChecked,
      project: (this.select_columns_list[3] || []).isCheckBoxChecked,
      type_of_contract: (this.select_columns_list[5] || []).isCheckBoxChecked,
      status: (this.select_columns_list[4] || []).isCheckBoxChecked,
      actions: (this.select_columns_list[0] || []).isCheckBoxChecked,
    };
  }
  }

}
