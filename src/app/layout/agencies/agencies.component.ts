import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { IProperty } from 'src/app/common/property';
import { Constant } from 'src/app/common/constants';
import { Router } from '@angular/router';
import { Agency } from 'src/app/models/agency.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
declare let swal: any;

@Component({
  selector: 'app-agencies',
  templateUrl: './agencies.component.html',
  styleUrls: ['./agencies.component.css']
})
export class AgenciesComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef;
  public parameter: IProperty = {};
  model: Agency;
  items: Array<Agency>;
  label: string;
  constructor(public constant: Constant,
    private spinner: NgxSpinnerService,
    public admin: AdminService, private router: Router,
    private translate: TranslateService) { }

  ngOnInit() {
    this.label = this.translate.instant('table.title.chooseAgenciesFile');
    this.model = new Agency();
    this.model.property_sort = null; // desc
    this.model.agent_sort = 2; // desc
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.getAgencies();
  }

  getPage(page: number) {
    this.parameter.page = page;
    this.getAgencies();
  }

  getFileName() {
    const fi = this.fileInput.nativeElement;
    const uploadedFile = fi.files[0];
    this.label = uploadedFile.name;
  }

  sortData(value: number, param: string) {
    this.model[param] = value;
    if (param === 'property_sort') {
      this.model.agent_sort = null;
    } else {
      this.model.property_sort = null;
    }
    this.getAgencies();
  }

  getAgencies() {
    this.model.page = this.parameter.page;
    this.spinner.show();
    this.admin.postDataApi('getAgencies', this.model)
      .subscribe(
        success => {
          this.spinner.hide();
          this.items = success.data;
          this.parameter.total = success.total_count;
        }, error => {
          this.spinner.hide();
        });
  }

  editUser(item: Agency) {
    this.router.navigate(['/dashboard/agencies/add-agency', item.id]);
  }

  blockUnblockPopup(index: any, id: string, flag: number) {
    this.parameter.index = index;
    this.parameter.title = this.translate.instant('message.question.areYouSure');
    switch (flag) {
      case 0:
      this.parameter.text = this.translate.instant('message.question.wantToUnblockAgency');
      this.parameter.successText = this.translate.instant('message.success.unblockedSuccessfully');
      break;
    case 1:
      this.parameter.text = this.translate.instant('message.question.wantToBlockAgency');
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
        this.blockAgency(index, id, flag);
      }
    });
  }


  blockAgency(index: number, id: any, flag: any) {
    this.parameter.index = index;
    this.parameter.url = 'blockAgency';
    const input = new FormData();
    input.append('agency_id', id);
    input.append('flag', flag);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          swal('Success', this.parameter.successText, 'success');
          this.items[this.parameter.index]['is_blocked'] = flag;
        });
  }

  deletePopup(item: any, index: number) {
    this.parameter.title = this.translate.instant('message.question.areYouSure');
    this.parameter.text = this.translate.instant('message.question.wantToDeleteAgency');

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
    this.admin.postDataApi('deleteAgency',
      { agency_id: item.id }).subscribe(r => {
        this.items.splice(index, 1);
        this.parameter.total--;
        swal('Success', this.translate.instant('message.success.deletedSuccessfully'), 'success');
      },
        error => {
          swal('Error', error.error.message, 'error');
        });
  }


  importAgency() {
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
      this.admin.postDataApi('importAgency', input)
        .subscribe(
          success => {
            this.spinner.hide();
            this.fileInput.nativeElement.value = '';
            this.label = this.translate.instant('table.title.chooseAgenciesFile');
            swal('Success', this.translate.instant('message.success.importedSuccessfully'), 'success');
            this.getAgencies();
          }, error => {
            this.fileInput.nativeElement.value = '';
            this.spinner.hide();
          });
    } else {
      swal('Error', this.translate.instant('message.info.pleaseChooseFile'), 'error');
      return false;
    }
  }
}
