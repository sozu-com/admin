import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { IProperty } from '../../common/property';
import { Constant } from './../../common/constants';
import { Router } from '@angular/router';
import { Agency } from 'src/app/models/agency.model';
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
  constructor(public constant: Constant, public admin: AdminService, private router: Router) { }

  ngOnInit() {
    this.label = 'Choose Agencies File';
    this.model = new Agency();
    this.model.property_sort = 2; // desc
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
    this.parameter.loading = true;
    this.admin.postDataApi('getAgencies', this.model)
      .subscribe(
        success => {
          this.parameter.loading = false;
          this.parameter.items = success.data;
          this.parameter.total = success.total_count;
        }, error => {
          this.parameter.loading = false;
        });
  }

  editUser(item: Agency) {
    this.router.navigate(['/dashboard/agencies/add-agency', item.id]);
  }

  blockUnblockPopup(index: any, id: string, flag: number) {
    this.parameter.index = index;
    this.parameter.title = this.constant.title.ARE_YOU_SURE;
    switch (flag) {
      case 0:
        this.parameter.text = this.constant.title.UNBLOCK_AGENCY;
        this.parameter.successText = this.constant.successMsg.UNBLOCKED_SUCCESSFULLY;
        break;
      case 1:
        this.parameter.text = this.constant.title.BLOCK_AGENCY;
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
          console.log('success', success);
          swal('Success', this.parameter.successText, 'success');
          this.parameter.items[this.parameter.index] = success.data;
        });
  }

  deletePopup(item: any, index: number) {
    this.parameter.title = this.constant.title.ARE_YOU_SURE;
    this.parameter.text = 'You want to delete this agency?';

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
      swal('Success', 'Deleted successfully.', 'success');
      this.items.splice(index, 1);
      this.parameter.total--;
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
        swal('Error', 'File size is more than 25MB.', 'error');
        return false;
      }
    this.parameter.loading = true;
    const input = new FormData();
    input.append('attachment', attachment);
    this.admin.postDataApi('importAgency', input)
      .subscribe(
        success => {
          this.parameter.loading = false;
          this.fileInput.nativeElement.value = '';
          this.label = 'Choose Agencies File';
          swal('Success', 'Imported successfully.', 'success');
          this.getAgencies();
        }, error => {
          this.parameter.loading = false;
        });
    } else {
      swal('Error', 'Please choose file', 'error');
      return false;
    }
  }
}
