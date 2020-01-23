import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company.model';
import { IProperty } from 'src/app/common/property';
import { Constant } from 'src/app/common/constants';
import { AdminService } from 'src/app/services/admin.service';
import { Users } from 'src/app/models/users.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
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
  constructor(public constant: Constant, public admin: AdminService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private translate: TranslateService) { }

  ngOnInit() {
    this.label = this.translate.instant('table.title.chooseCompaniesFile');
    this.model = new Company();
    this.model.project_sort = 2;  // 2 means desc
    this.model.sort_manager = null;
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
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
    this.parameter.title = this.translate.instant('message.question.areYouSure');
    switch (flag) {
      case 0:
      this.parameter.text = this.translate.instant('message.question.wantToUnblockCompany');
      this.parameter.successText = this.translate.instant('message.success.unblockedSuccessfully');
      break;
    case 1:
      this.parameter.text = this.translate.instant('message.question.wantToBlockCompany');
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
          swal('Success', this.parameter.successText, 'success');
          this.items[this.parameter.index]['is_blocked'] = flag;
        });
  }

  deletePopup(item: any, index: number) {
    this.parameter.title = this.translate.instant('message.question.areYouSure');
    this.parameter.text = this.translate.instant('message.question.wantToDeleteCompany');

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
        swal('Success', this.translate.instant('message.success.deletedSuccessfully'), 'success');
      },
        error => {
          swal('Error', error.error.message, 'error');
        });
  }

  importData() {
    const file = this.fileInput.nativeElement;
    let attachment: File;
    if (file.files && file.files[0]) {
      attachment = file.files[0];
      if (attachment.size > this.constant.fileSizeLimit) {
        swal('Error', this.translate.instant('message.info.fileSizeLimit'), 'error');
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
            swal('Success', this.translate.instant('message.success.importedSuccessfully'), 'success');
            this.getTowerManagerCompany();
          }, error => {
            this.fileInput.nativeElement.value = '';
            this.spinner.hide();
          });
    } else {
      swal('Error', this.translate.instant('message.info.pleaseChooseFile'), 'error');
      return false;
    }
  }

  getManagers(company_id: string) {
    this.spinner.show();
    this.admin.postDataApi('getCompanyMangers', {company_id: company_id})
      .subscribe(
        success => {
          this.spinner.hide();
          this.viewManagersModal.nativeElement.click();
          this.parameter.items = success.data;
        }, error => {
          this.spinner.hide();
        });
  }
}
