
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IProperty } from '../../common/property';
import { NgForm } from '@angular/forms';
import { Constant } from './../../common/constants';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonService } from '../../services/common.service';
import { FileUpload } from 'src/app/common/fileUpload';
import { Agency } from 'src/app/models/agency.model';
import { Manager, Company } from 'src/app/models/company';
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
    public admin: AdminService, private router: Router,
    private ngZone: NgZone,
    private sanitization: DomSanitizer) {
    this.admin.countryData$.subscribe(success => {
      this.parameter.allCountry = success;
    });
  }

  ngOnInit() {
    this.label = 'Choose Managers File';
    this.file1 = new FileUpload(false, this.admin);
    this.model = new Manager();
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

    this.model.country_code = this.constant.country_code;
    this.model.dial_code = this.constant.dial_code;
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

  onFileChange(event: any, paramUrl: string, paramFile: string) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      // this.parameter.image = event.target.files[0];
      reader.onload = (e: any) => {
        this[paramUrl] = e.target.result;
        this[paramFile] = this.sanitization.bypassSecurityTrustStyle(`url(${this[paramUrl]})`);
        this.cs.saveImage(event.target.files[0]).subscribe(
          success => {
            this.model[paramFile] = success['data'].image;
          }
        );
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }


  addNewUser(formdata: NgForm) {
    const input = new FormData();
    if (this.model.id) { input.append('id', this.model.id); }

    input.append('name', this.model.name);
    input.append('country_code', this.model.country_code ? this.model.country_code : this.constant.dial_code);
    input.append('dial_code', this.model.dial_code ? this.model.dial_code : this.constant.dial_code);
    input.append('phone', this.model.phone);
    input.append('email', this.model.email);
    input.append('company_id', this.model.company.id.toString());

    if (this.model.image) { input.append('image', this.model.image); }
    if (this.model.logo) { input.append('logo', this.model.logo); }

    this.parameter.loading = true;
      this.admin.postDataApi('addTowerManager', input)
        .subscribe(
          success => {
            this.parameter.loading = false;
            if (success.success === '0') {
              swal('Error', success.message, 'error');
            } else {
              this.modalClose.nativeElement.click();
              const text = this.model.id ? 'Updated successfully.' : 'Added successfully.';
              swal('Success', text, 'success');
              if (this.model.id) {
                // edit -- replace
                this.items[this.parameter.index] = success.data;
                console.log('ssssss');
                console.log(this.items[this.parameter.index]);
                formdata.reset();
              } else {
                // add - push
                this.items.push(success.data);
                formdata.reset();
              }
              this.emptyModel();
            }
          }, error => {
            this.parameter.loading = false;
          });
  }

  editUser(userdata: Manager, index: any) {
    // this.parameter.loading = true;
    this.parameter.index = index;
    this.model = userdata;
    this.model.company = userdata.company ? userdata.company : new Company();
    console.log('sss', userdata);
    this.inhouseUserModalOpen.nativeElement.click();
    // this.admin.postDataApi('getNewUserById', { id: userdata.id }).subscribe(r => {
    //   this.parameter.loading = false;
    //   userdata = r['data'];
    //   this.parameter.index = index;
    //   this.model.id = userdata.id;
    //   this.model.name = userdata.name;
    //   this.model.email = userdata.email;
    //   this.model.phone = userdata.phone;
    //   this.model.country_code = userdata.country_code;
    //   // this.model.company = userdata.country_code;

    //   this.model.image = userdata.image != null ? userdata.image : '';
    //   if (this.model.image) {
    //     this.image = this.sanitization.bypassSecurityTrustStyle(`url(${this.model.image})`);
    //   }

    //   this.inhouseUserModalOpen.nativeElement.click();
    // }, erorr => {
    //   this.parameter.loading = false;
    // });
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

  setLeadSort() {
    this.lead_sort = this.lead_sort === 1 ? 2 : 1;
    this.getTowerManager();
  }

  getTowerManager() {
    this.parameter.loading = true;
    const input = new FormData();
    input.append('page', this.parameter.p.toString());
    if (this.lead_sort) { input.append('lead_sort', this.lead_sort.toString()); }
    if (this.parameter.name) { input.append('name', this.parameter.name); }
    if (this.parameter.email) { input.append('email', this.parameter.email); }
    if (this.parameter.phone) { input.append('phone', this.parameter.phone); }
    if (this.parameter.company_name) { input.append('company_name', this.parameter.company_name); }

    this.admin.postDataApi('getTowerManager', input)
      .subscribe(
        success => {
          this.parameter.loading = false;
          this.items = success.data;
          this.parameter.total = success.total;
        }, error => {
          this.parameter.loading = false;
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
      // title: this.parameter.title,
      // text: this.parameter.text,
      html: this.parameter.title + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.value) {
        this.blockAdmin(index, id, flag, user_type);
      }
    });
  }


  blockAdmin(index, id, flag, user_type) {
    // this.parameter.loading = true;
    this.parameter.url = 'blockTowerManager';
    const input = new FormData();
    input.append('id', id);
    input.append('flag', flag);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          // this.parameter.loading = false;
          swal('Success', this.parameter.successText, 'success');
          this.items[this.parameter.index] = success.data;

        });
  }

  file1Select($event) {
    this.file1.onSelectFile($event);
  }

  deletePopup(item: any, index: number) {
    this.parameter.title = this.constant.title.ARE_YOU_SURE;
    this.parameter.text = 'You want to delete this inhouse user?';

    swal({
      html: this.parameter.title + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.deleteNewUser(item, index);
      }
    });
  }

  deleteNewUser(item: any, index: number) {
    this.admin.postDataApi('deleteNewUser',
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
          this.label = 'Choose Managers File';
          swal('Success', 'Imported successfully.', 'success');
          this.getTowerManager();
        }, error => {
          this.parameter.loading = false;
        });
    } else {
      swal('Error', 'Please choose file', 'error');
      return false;
    }
  }
}
