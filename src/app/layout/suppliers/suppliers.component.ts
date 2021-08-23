import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Users } from 'src/app/models/users.model';
import { IProperty } from 'src/app/common/property';
import { Constant } from 'src/app/common/constants';
import { AdminService } from 'src/app/services/admin.service';
import { TranslateService } from '@ngx-translate/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
declare let swal: any;
declare var $: any;

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {
  @ViewChild('openSelectColumnsModal') openSelectColumnsModal: ElementRef;
  @ViewChild('closeSelectColumnsModal') closeSelectColumnsModal: ElementRef;
  public parameter: IProperty = {};
  items: Array<Users>;
  comm_name: string;
  legal_name: string;
  name: string;
  email: string;
  phone: string;
  legal_rep_name: string;
  developer_name: string;
  developer_id: number;
  legal_entity_id: string;
  private exportfinalData: any[] = [];
  public select_columns_list: any[] = [];
  public selectedColumnsToShow: any = {};
  public isSelectAllColumns: boolean = false;
  public keyword: string = '';public language_code: string;
  constructor(
    public constant: Constant,
    public admin: AdminService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getProjectHome();
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.parameter.sub = this.route.params.subscribe((params) => {
      this.developer_name = params['developer_name'];
      this.developer_id = params['developer_id'];
      this.legal_entity_id = params['legal_entity_id'];
    });
    this.getSuppliers();
  }

  getPage(page: number) {
    this.parameter.page = page;
    this.getSuppliers();
  }

  getSuppliers = (): void => {
    const input = {
      comm_name: this.comm_name,
      legal_name: this.legal_name,
      phone: this.phone,
      email: this.email,
      name: this.name,
      developer_name: this.developer_name,
      legal_rep_name: this.legal_rep_name,
      developer_id: this.developer_id,
      page: this.parameter.page,
      legal_entity_id: this.legal_entity_id
    };
    this.spinner.show();
    this.admin.postDataApi('getSuppliers', input).subscribe((success) => {
      this.spinner.hide();
      this.items = success.data;
      this.parameter.total = success.total_count;
    }, (error) => {
      this.spinner.hide();
    });
  }

  editUser(item: Users) {
    this.router.navigate(['/dashboard/suppliers/add-supplier', item.id]);
    // this.router.navigate(['/dashboard/legal-entities/edit-legal-entity', item.id]);
  }

  blockUnblockPopup(index: any, id: string, flag: number) {
    this.parameter.index = index;
    this.parameter.title = this.translate.instant('message.error.areYouSure');
    switch (flag) {
      case 0:
        this.parameter.text = this.translate.instant('message.error.wantToUnblocksuppliers');
        this.parameter.successText = this.translate.instant('message.success.unblockedSuccessfully');
        break;
      case 1:
        this.parameter.text = this.translate.instant('message.error.wantToBlocksuppliers');
        this.parameter.successText = this.translate.instant('message.success.blockedSuccessfully');
        break;
    }

    swal({
      html: this.parameter.title + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.blockAdmin(index, id, flag);
      }
    });
  }


  blockAdmin(index: number, id: any, flag: any) {
    this.parameter.index = index;
    this.parameter.url = flag == 1 ? 'blockSuppliers' : 'unblockSuppliers';
    this.admin.postDataApi(this.parameter.url, { id: id })
      .subscribe(
        success => {
          swal(this.translate.instant('swal.success'), this.parameter.successText, 'success');
          this.items[this.parameter.index]['is_blocked'] = flag;
        });
  }

  deletePopup(item: any, index: number) {
    this.parameter.title = this.translate.instant('message.error.areYouSure');
    this.parameter.text = this.translate.instant('message.error.wantToDeletesuppliers');

    swal({
      html: this.parameter.title + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.deleteData(item, index);
      }
    });
  }

  deleteData(item: any, index: number) {
    this.admin.postDataApi('deleteSuppliers',
      { id: item.id }).subscribe(r => {
        this.items.splice(index, 1);
        this.parameter.total--;
        swal(this.translate.instant('swal.success'), this.translate.instant('message.success.deletedSuccessfully'), 'success');
      },
        error => {
          swal(this.translate.instant('swal.error'), error.error.message, 'error');
        });
  }

  viewDeveloper(item: any) {
    if (item.user && item.user.name) {
      this.router.navigate(['/dashboard/developers/view-all', item.user.name]);
    }
  }

  getExportlisting = (): void => {
    this.spinner.show();
    const input = {
      comm_name: this.comm_name,
      legal_name: this.legal_name,
      phone: this.phone,
      email: this.email,
      name: this.name,
      page: this.parameter.page,
      legal_entity_id: this.legal_entity_id
    };
    input.page = 0;
    this.admin.postDataApi('getSuppliers', input).subscribe((success) => {
      this.exportfinalData = success['data'] || [];
      this.exportData();
      this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
    });
  }
  exportData() {
    if (this.exportfinalData) {
      const exportfinalData = [];
      for (let index = 0; index < this.exportfinalData.length; index++) {
        const p = this.exportfinalData[index];
        let obj = {
          'Commercial Name': p.comm_name || '',
          'Supplier Name': p.legal_name || '',
          'Email': p.email || '',
          'Phone': p.phone ? p.dial_code + ' ' + p.phone : '' 
        };
        this.selectedColumnsToShow.commercial_name == 0 ? delete obj['Commercial Name'] : undefined;
        this.selectedColumnsToShow.supplier_name == 0 ? delete obj['Supplier Name'] : undefined;
        this.selectedColumnsToShow.email == 0 ? delete obj['Email'] : undefined;
        this.selectedColumnsToShow.phone == 0 ? delete obj['Phone'] : undefined;
        exportfinalData.push(obj);
      }
      this.exportAsExcelFile(exportfinalData, 'Suppliers-');
    }
  }
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data']
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });
    this.spinner.hide();
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    const today = new Date();
    const date =
      today.getDate() +
      '-' +
      today.getMonth() +
      '-' +
      today.getFullYear() +
      '_' +
      today.getHours() +
      '_' +
      today.getMinutes() +
      '_' +
      today.getSeconds();
    fileName = fileName + date;
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

 
  getProjectSelection = (isFirstTime: boolean, keyword?: string): void => {
    this.spinner.show();
    this.admin.postDataApi('getSuppliersSelection', { name: keyword }).subscribe((response) => {
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
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.commercial_name;
        break;
      case 2:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.supplier_name;
        break;
      case 3:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.email;
        break;
      case 4:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.phone;
        break;
      case 5:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.action;
        break;
      default:
        break;
    }

  }
  getProjectHome = (): void => {
    this.admin.postDataApi('getSuppliersHome', { user_id: JSON.parse(localStorage.getItem('user-id')) || 0 }).subscribe((response) => {
      this.selectedColumnsToShow = response.data || {};
    }, (error) => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), error.error.message, 'error');
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
    this.admin.postDataApi('updateSuppliersHome', this.getPostRequestForColumn()).subscribe((response) => {
      this.spinner.hide();
      this.closeSelectColumnsPopup();
      this.getProjectHome();
    }, (error) => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), error.error.message, 'error');
    });
  }

  getPostRequestForColumn = (): any => {
    return {
      user_id: JSON.parse(localStorage.getItem('user-id')) || 0,
      commercial_name: (this.select_columns_list[0] || []).isCheckBoxChecked,
      supplier_name: (this.select_columns_list[1] || []).isCheckBoxChecked,
      email: (this.select_columns_list[2] || []).isCheckBoxChecked,
      phone: (this.select_columns_list[3] || []).isCheckBoxChecked,
      action: (this.select_columns_list[4] || []).isCheckBoxChecked
    };
  }
}
