import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Users } from 'src/app/models/users.model';
import { IProperty } from 'src/app/common/property';
import { Constant } from 'src/app/common/constants';
import { AdminService } from 'src/app/services/admin.service';
import { TranslateService } from '@ngx-translate/core';
declare let swal: any;
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.css'],
  providers: [Users]
})
export class DevelopersComponent implements OnInit {

  public parameter: IProperty = {};
  model: Users;
  items: Array<Users>;
  local_storage_parameter: any;
  is_back: boolean;
  exportfinalData: Array<any>;
  constructor(public constant: Constant, public admin: AdminService, private router: Router,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
  private route: ActivatedRoute) { }

  ngOnInit() {
    this.model = new Users();
    this.model.buildings_sort = 2;  // 2 means desc
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.route.params.subscribe(params => {
      this.model.name = params.name;
      if(params.for){
        this.is_back = true;
      }
    });
    this.local_storage_parameter = JSON.parse(localStorage.getItem('parametersForDeveloper'));
    this.model = this.local_storage_parameter && this.is_back ? this.local_storage_parameter : this.model;
    this.getDevelopersFrAdmin();
  }

  getPage(page: number) {
    this.parameter.page = page;
    this.getDevelopersFrAdmin();
  }

  setBuildingsSort(buildings_sort: number) {
    delete this.model.legal_entities_sort;
    this.model.buildings_sort = buildings_sort;
    this.getDevelopersFrAdmin();
  }

  setLegalEntitySort(legal_entities_sort: number) {
    delete this.model.buildings_sort;
    this.model.legal_entities_sort = legal_entities_sort;
    this.getDevelopersFrAdmin();
  }

  getDevelopersFrAdmin() {
    this.model.page = this.parameter.page;
    this.spinner.show();
    this.admin.postDataApi('getDevelopersFrAdmin', this.model)
      .subscribe(
        success => {
          this.spinner.hide();
          localStorage.setItem('parametersForDeveloper', JSON.stringify(this.model));
          this.items = success.data;
          this.parameter.total = success.total;
          console.log(success.data,"all developers data")
        }, error => {
          this.spinner.hide();
        });
  }

  editUser(item: Users) {
    this.router.navigate(['/dashboard/developers/add-developer', item.id]);
  }

  blockUnblockPopup(index: any, id: string, flag: number, user_type: string = '3') {
    this.parameter.index = index;
    this.parameter.title = this.translate.instant('message.error.areYouSure');
    switch (flag) {
      case 0:
      this.parameter.text = this.translate.instant('message.error.wantToUnblockDeveloper');
      this.parameter.successText = this.translate.instant('message.success.unblockedSuccessfully');
      break;
    case 1:
      this.parameter.text = this.translate.instant('message.error.wantToBlockDeveloper');
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
        this.blockAdmin(index, id, flag, user_type);
      }
    });
  }


  blockAdmin(index: number, id: any, flag: any, user_type: any) {
    this.parameter.index = index;
    this.parameter.url = 'blockBuyerSeller';
    const input = new FormData();
    input.append('id', id);
    input.append('flag', flag);
    input.append('user_type', user_type);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          swal(this.translate.instant('swal.success'), this.parameter.successText, 'success');
          this.items[this.parameter.index]['is_blocked'] = flag;
        });
  }

  deletePopup(item: any, index: number) {
    this.parameter.title = this.translate.instant('message.error.areYouSure');
    this.parameter.text = this.translate.instant('message.error.wantToDeleteDeveloper');

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
    this.admin.postDataApi('deleteBuyerSeller',
    { id: item.id, user_type: 3 }).subscribe(r => {
      this.items.splice(index, 1);
      this.parameter.total--;
      swal(this.translate.instant('swal.success'), this.translate.instant('message.success.deletedSuccessfully'), 'success');
    },
    error => {
      swal(this.translate.instant('swal.error'), error.error.message, 'error');
    });
  }

  changeStatus(item: any, status: number) {
    item.is_approved = status;
    const input = { id: item.id, is_approved: status };
    this.admin.postDataApi('approveDeveloper', input).subscribe(r => {
      swal(this.translate.instant('swal.success'), this.translate.instant('message.success.updatedSuccessfully'), 'success');
    },
      error => {
        swal(this.translate.instant('swal.error'), error.error.message, 'error');
      });
  }
  getExportlisting() {
    this.spinner.show();
    const input: any = JSON.parse(JSON.stringify(this.parameter));
    input.page = -1;
    this.admin.postDataApi('getDevelopersFrAdmin', input).subscribe(
      success => {
        this.exportfinalData = success['data'];
        this.exportData();
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      });
  }

  exportData() {
    if (this.exportfinalData) {
      const exportfinalData = [];
      for (let index = 0; index < this.exportfinalData.length; index++) {
        const p = this.exportfinalData[index];

        exportfinalData.push({
          'Commercial name': p.name || '',
          'Location': p.developer_address || '',
          'Latitude': p.lat || '',
          'Longitude': p.lng || '',
          'Legal name': p.developer_company || '',
          'email': p.email || '',
          'contact number': p.phone || '',
          'Projects linked': p.buildings_count || 0
        });
      }
      this.exportAsExcelFile(exportfinalData, 'developers-');
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

}
