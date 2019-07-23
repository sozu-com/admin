import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company.model';
import { IProperty } from 'src/app/common/property';
import { Constant } from 'src/app/common/constants';
import { AdminService } from 'src/app/services/admin.service';
import { Users } from 'src/app/models/users.model';
declare let swal: any;

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef;
  public parameter: IProperty = {};
  model: Company;
  items: Array<Company>;
  label: string;
  constructor(public constant: Constant, public admin: AdminService, private router: Router) { }

  ngOnInit() {
    this.label = 'Choose Companies File';
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
    this.parameter.loading = true;
    this.admin.postDataApi('getTowerManagerCompany', this.model)
      .subscribe(
        success => {
          this.parameter.loading = false;
          this.items = success.data;
          this.parameter.total = success.total;
        }, error => {
          this.parameter.loading = false;
        });
  }

  editUser(item: Users) {
    this.router.navigate(['/dashboard/companies/add-company', item.id]);
  }

  blockUnblockPopup(index: any, id: string, flag: number) {
    this.parameter.index = index;
    this.parameter.title = this.constant.title.ARE_YOU_SURE;
    switch (flag) {
      case 0:
        this.parameter.text = this.constant.title.UNBLOCK_COMPANY;
        this.parameter.successText = this.constant.successMsg.UNBLOCKED_SUCCESSFULLY;
        break;
      case 1:
        this.parameter.text = this.constant.title.BLOCK_COMPANY;
        this.parameter.successText = this.constant.successMsg.BLOCKED_SUCCESSFULLY;
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
          this.items[this.parameter.index] = success.data;
        });
  }

  deletePopup(item: any, index: number) {
    this.parameter.title = this.constant.title.ARE_YOU_SURE;
    this.parameter.text = 'You want to delete this company?';

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
      swal('Success', 'Deleted successfully.', 'success');
      this.items.splice(index, 1);
      this.parameter.total--;
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
        swal('Error', 'File size is more than 25MB.', 'error');
        return false;
      }
    this.parameter.loading = true;
    const input = new FormData();
    input.append('attachment', attachment);
    this.admin.postDataApi('importTowerManagerCompany', input)
      .subscribe(
        success => {
          this.parameter.loading = false;
          this.fileInput.nativeElement.value = '';
          this.label = 'Choose Companies File';
          swal('Success', 'Imported successfully.', 'success');
          this.getTowerManagerCompany();
        }, error => {
          this.parameter.loading = false;
        });
    } else {
      swal('Error', 'Please choose file', 'error');
      return false;
    }
  }
}
