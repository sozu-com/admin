
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FileUpload } from 'src/app/common/fileUpload';
import { Manager, Company } from 'src/app/models/company.model';
import { CommonService } from 'src/app/services/common.service';
import { Constant } from 'src/app/common/constants';
import { IProperty } from 'src/app/common/property';
import { AdminService } from 'src/app/services/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare let swal: any;

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.css']
})
export class ManagersComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('inhouseUserModalOpen') inhouseUserModalOpen: ElementRef;
  @ViewChild('modalClose') modalClose: ElementRef;

  public parameter: IProperty = {};
  lead_sort = 2;
  initialCountry: any;
  image: any;
  logo: any;
  title: string;
  label: string;
  file1: FileUpload;
  items: Array<Manager>;
  model: Manager;
  companies: Array<Company>;
  constructor(public constant: Constant, private cs: CommonService,
    private route: ActivatedRoute,
    public admin: AdminService,
    private spinner: NgxSpinnerService,
    private ngZone: NgZone) {
    this.admin.countryData$.subscribe(success => {
      this.parameter.allCountry = success;
    });
  }

  ngOnInit() {
    this.label = 'Choose Managers File';
    this.file1 = new FileUpload(false, this.admin);
    this.model = new Manager();
    this.model.project_sort = 2;
    this.model.country_code = this.constant.country_code;
    this.model.dial_code = this.constant.dial_code;
    this.model.company = new Company();
    this.parameter.itemsPerPage = this.constant.itemsPerPage;

    // this.setCurrentPosition();
    this.parameter.sub = this.route.params.subscribe(params => {
      this.parameter.p = this.constant.p;
      this.parameter.name = ''; this.parameter.phone = ''; this.parameter.email = '';
      this.parameter.total = 0;
      this.getTowerManager();
      this.getAllCompanies();
      this.initialCountry = { initialCountry: this.constant.initialCountry };
    });
  }

  getPage(page: any) {
    this.parameter.p = page;
    this.getTowerManager();
  }

  getFileName() {
    const fi = this.fileInput.nativeElement;
    const uploadedFile = fi.files[0];
    this.label = uploadedFile.name;
  }

  closeModal() {
    this.modalClose.nativeElement.click();
    this.emptyModel();
  }

  emptyModel() {
    this.model.country_code = this.constant.country_code;
    this.model.dial_code = this.constant.dial_code;
    this.model = new Manager();
    this.image = '';
    this.logo = '';
    this.initialCountry = { initialCountry: this.constant.initialCountry };

  }

  onCountryChange(e) {
    this.model.country_code = e.iso2;
    this.model.dial_code = '+' + e.dialCode;
    this.initialCountry = { initialCountry: e.iso2 };
  }

  openAddModal() {
    this.model = new Manager();
    this.model.country_code = this.constant.country_code;
    this.model.dial_code = this.constant.dial_code;
    this.model.company = new Company();
    this.initialCountry = { initialCountry: this.constant.initialCountry };

    this.inhouseUserModalOpen.nativeElement.click();
  }

  telInputObject(obj) {
    obj.intlTelInput('setCountry', 'in');
  }

  initialcountryfunc() {
    return { initialCountry: this.constant.initialCountry };
  }

  setCompany(id: number) {
    this.model.company.id = id;
  }

  onFileChange(event: any, paramLoader: string, paramFile: string) {
    if (event.target.files && event.target.files[0]) {
      this.model[paramLoader] = true;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this[paramFile] = e.target.result;
        this.cs.saveImage(event.target.files[0]).subscribe(
          success => {
            this.model[paramLoader] = false;
            this.model[paramFile] = success['data'].image;
          }
        );
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }


  addNewUser(formdata: NgForm) {

    if (this.model.img_loader || this.model.logo_loader) {
      swal('Error', 'Uploading images', 'error');
      return false;
    }
    const input = new FormData();
    if (this.model.id) { input.append('id', this.model.id.toString()); }

    input.append('name', this.model.name);
    input.append('country_code', this.model.country_code ? this.model.country_code : this.constant.dial_code);
    input.append('dial_code', this.model.dial_code ? this.model.dial_code : this.constant.dial_code);
    input.append('phone', this.model.phone);
    input.append('email', this.model.email);

    if (this.model.company.id) {
      input.append('company_id', this.model.company.id.toString());
    }

    if (this.model.image) { input.append('image', this.model.image); }
    if (this.model.logo) { input.append('logo', this.model.logo); }

    this.spinner.show();
      this.admin.postDataApi('addTowerManager', input)
        .subscribe(
          success => {
            this.spinner.hide();
            if (success.success === '0') {
              swal('Error', success.message, 'error');
            } else {
              this.modalClose.nativeElement.click();
              const text = this.model.id ? 'Updated successfully.' : 'Added successfully.';
              swal('Success', text, 'success');
              if (this.model.id) {
                this.items[this.parameter.index] = success.data;
              } else {
                this.items.push(success.data);
                this.parameter.total++;
              }
              formdata.reset();
              this.emptyModel();
            }
          }, error => {
            this.spinner.hide();
          });
  }

  editUser(userdata: Manager, index: any) {
    this.parameter.index = index;
    this.model = userdata;
    this.model.company = userdata.company ? userdata.company : new Company();
    this.image = userdata.image;
    this.logo = userdata.logo;
    this.model.img_loader = false; this.model.logo_loader = false;
    this.inhouseUserModalOpen.nativeElement.click();
  }

  resetFilters() {
    this.parameter.p = this.constant.p;
    this.parameter.total = 0;
    this.getTowerManager();
  }

  searchUserByName(name: string) {
    this.parameter.name = name;
    this.getTowerManager();
  }
  searchUserByCompanyName(company_name: string) {
    this.parameter.company_name = company_name;
    this.getTowerManager();
  }
  searchUserByEmail(email: string) {
    this.parameter.email = email;
    this.getTowerManager();
  }
  searchUserByPhone(phone: string) {
    this.parameter.phone = phone;
    this.getTowerManager();
  }

  sortData(value: number) {
    this.model.project_sort = value;
    this.getTowerManager();
  }

  getTowerManager() {
    this.spinner.show();
    const input = new FormData();
    input.append('project_sort', this.model.project_sort);
    input.append('page', this.parameter.p.toString());
    if (this.parameter.name) { input.append('name', this.parameter.name); }
    if (this.parameter.email) { input.append('email', this.parameter.email); }
    if (this.parameter.phone) { input.append('phone', this.parameter.phone); }
    if (this.parameter.company_name) { input.append('company_name', this.parameter.company_name); }

    this.admin.postDataApi('getTowerManager', input)
      .subscribe(
        success => {
          this.spinner.hide();
          this.items = success.data;
          this.parameter.total = success.total;
        }, error => {
          this.spinner.hide();
        });
  }

  getAllCompanies() {
    this.admin.postDataApi('getAllCompanies', {})
      .subscribe(
        success => {
          this.companies = success.data;
        });
  }


  blockUnblockPopup(index, id, flag, user_type) {
    this.parameter.index = index;
    this.parameter.title = this.constant.title.ARE_YOU_SURE;
    switch (flag) {
      case 0:
        this.parameter.text = this.constant.title.UNBLOCK_USER;
        this.parameter.successText = this.constant.successMsg.UNBLOCKED_SUCCESSFULLY;
        break;
      case 1:
        this.parameter.text = this.constant.title.BLOCK_USER;
        this.parameter.successText = this.constant.successMsg.BLOCKED_SUCCESSFULLY;
        break;
    }

    swal({
      html: this.parameter.title + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.value) {
        this.blockAdmin(id, flag);
      }
    });
  }


  blockAdmin(id, flag) {
    const input = {
      id: id, flag: flag
    };

    this.admin.postDataApi('blockTowerManager', input)
      .subscribe(
        success => {
          swal('Success', this.parameter.successText, 'success');
          // this.items[this.parameter.index] = success.data;
          this.items[this.parameter.index]['is_blocked'] = flag;
        });
  }

  file1Select($event) {
    this.file1.onSelectFile($event);
  }

  deletePopup(item: any, index: number) {
    this.parameter.title = this.constant.title.ARE_YOU_SURE;
    this.parameter.text = 'You want to delete this manager?';

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
    this.admin.postDataApi('deleteTowerManager',
    { id: item.id }).subscribe(r => {
      this.items.splice(index, 1);
      this.parameter.total--;
      swal('Success', 'Deleted successfully.', 'success');
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
    this.spinner.show();
    const input = new FormData();
    input.append('attachment', attachment);
    this.admin.postDataApi('importTowerManager', input)
      .subscribe(
        success => {
          this.spinner.hide();
          this.fileInput.nativeElement.value = '';
          this.label = 'Choose Managers File';
          swal('Success', 'Imported successfully.', 'success');
          this.getTowerManager();
        }, error => {
          this.fileInput.nativeElement.value = '';
          this.spinner.hide();
        });
    } else {
      swal('Error', 'Please choose file', 'error');
      return false;
    }
  }
}
