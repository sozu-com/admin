import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/models/company.model';
import { IProperty } from 'src/app/common/property';
import { Constant } from 'src/app/common/constants';
import { AdminService } from 'src/app/services/admin.service';
import { Users } from 'src/app/models/users.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { ExcelDownload } from 'src/app/common/excelDownload';
declare let swal: any;

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  @ViewChild('viewManagersModal') viewManagersModal: ElementRef;
  @ViewChild('fileInput') fileInput: ElementRef;
  public scrollbarOptions = { axis: 'y', theme: 'dark'};
  public parameter: IProperty = {};
  model: Company;
  items: Array<Company>;
  label: string;
  private exportfinalData: any[] = [];
  constructor(public constant: Constant, public admin: AdminService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private translate: TranslateService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.label = this.translate.instant('table.title.chooseCompaniesFile');
    this.model = new Company();
    this.model.project_sort = 2;  // 2 means desc
    this.model.sort_manager = null;
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.route.params.subscribe(params => {
      if (params.name) {
        this.model.name = params.name; 
      }
    });
    this.getTowerManagerCompany();
  }

  getPage(page: number) {
    this.parameter.page = page;
    this.getTowerManagerCompany();
  }

  getFileName() {
    const fi = this.fileInput.nativeElement;
    const uploadedFile = fi.files[0];
    this.label = uploadedFile.name;
  }

  sortData(value: number, param: string) {
    this.model[param] = value;
    if (param === 'sort_manager') {
      this.model.project_sort = null;
    } else {
      this.model.sort_manager = null;
    }
    this.getTowerManagerCompany();
  }

  getTowerManagerCompany() {
    this.model.page = this.parameter.page;
    this.spinner.show();
    this.admin.postDataApi('getTowerManagerCompany', this.model)
      .subscribe(
        success => {
          this.spinner.hide();
          this.items = success.data;
          this.parameter.total = success.total;
        }, error => {
          this.spinner.hide();
        });
  }

  editUser(item: Users) {
    this.router.navigate(['/dashboard/companies/add-company', item.id]);
  }

  blockUnblockPopup(index: any, id: string, flag: number) {
    this.parameter.index = index;
    this.parameter.title = this.translate.instant('message.error.areYouSure');
    switch (flag) {
      case 0:
      this.parameter.text = this.translate.instant('message.error.wantToUnblockCompany');
      this.parameter.successText = this.translate.instant('message.success.unblockedSuccessfully');
      break;
    case 1:
      this.parameter.text = this.translate.instant('message.error.wantToBlockCompany');
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
        this.blockTowerManagerCompany(index, id, flag);
      }
    });
  }


  blockTowerManagerCompany(index: number, id: any, flag: any) {
    this.parameter.index = index;
    const input = {
      id: id,
      flag: flag
    };

    this.admin.postDataApi('blockTowerManagerCompany', input)
      .subscribe(
        success => {
          swal(this.translate.instant('swal.success'), this.parameter.successText, 'success');
          this.items[this.parameter.index]['is_blocked'] = flag;
        });
  }

  deletePopup(item: any, index: number) {
    this.parameter.title = this.translate.instant('message.error.areYouSure');
    this.parameter.text = this.translate.instant('message.error.wantToDeleteCompany');

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
    this.admin.postDataApi('deleteTowerManagerCompany',
      { id: item.id }).subscribe(r => {
        this.items.splice(index, 1);
        this.parameter.total--;
        swal(this.translate.instant('swal.success'), this.translate.instant('message.success.deletedSuccessfully'), 'success');
      },
        error => {
          swal(this.translate.instant('swal.error'), error.error.message, 'error');
        });
  }

  importData() {
    const file = this.fileInput.nativeElement;
    let attachment: File;
    if (file.files && file.files[0]) {
      attachment = file.files[0];
      if (attachment.size > this.constant.fileSizeLimit) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.fileSizeLimit'), 'error');
        return false;
      }
      this.spinner.show();
      const input = new FormData();
      input.append('attachment', attachment);
      this.admin.postDataApi('importTowerManagerCompany', input)
        .subscribe(
          success => {
            this.spinner.hide();
            this.fileInput.nativeElement.value = '';
            this.label = this.translate.instant('table.title.chooseCompaniesFile');
            swal(this.translate.instant('swal.success'), this.translate.instant('message.success.importedSuccessfully'), 'success');
            this.getTowerManagerCompany();
          }, error => {
            this.fileInput.nativeElement.value = '';
            this.spinner.hide();
          });
    } else {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseFile'), 'error');
      return false;
    }
  }

  getManagers(company: any) {
    this.router.navigate(['/dashboard/managers/view-all', 'company', company.name]);
    // this.spinner.show();
    // this.admin.postDataApi('getCompanyManagers', {company_id: company_id})
    //   .subscribe(
    //     success => {
    //       this.spinner.hide();
    //       this.viewManagersModal.nativeElement.click();
    //       this.parameter.items = success.data;
    //     }, error => {
    //       this.spinner.hide();
    //     });
  }

  getExportlisting = (): void => {
    this.spinner.show();
    const input: any = JSON.parse(JSON.stringify(this.model));
    input.page = 0;
    this.admin.postDataApi('getTowerManagerCompany', input).subscribe((success) => {
      this.exportfinalData = success['data'] || [];
      this.exportData();
      this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
    });
  }

  exportData = (): void => {
    if (this.exportfinalData.length > 0) {
      const exportfinalData = [];
      for (let index = 0; index < this.exportfinalData.length; index++) {
        const p = this.exportfinalData[index];

        exportfinalData.push({
          'Company name (Commercial Name)': p.name || '',
          'Contact number': p.phone ? p.dial_code + ' ' + p.phone : '',
          'Email Address': p.email || ''  
        });
      }
      new ExcelDownload().exportAsExcelFile(exportfinalData, 'Companies');
    }
  }
}
