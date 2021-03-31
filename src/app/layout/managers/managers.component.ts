
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { FileUpload } from 'src/app/common/fileUpload';
import { Manager, Company } from 'src/app/models/company.model';
import { CommonService } from 'src/app/services/common.service';
import { Constant } from 'src/app/common/constants';
import { IProperty } from 'src/app/common/property';
import { AdminService } from 'src/app/services/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
declare let swal: any;
declare const google;

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.css']
})
export class ManagersComponent implements OnInit {

  @ViewChild('search1') searchElementRef: ElementRef;
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('inhouseUserModalOpen') inhouseUserModalOpen: ElementRef;
  @ViewChild('modalClose') modalClose: ElementRef;
  @ViewChild('openAssignModel') openAssignModel: ElementRef;
  @ViewChild('closeAssignModel') closeAssignModel: ElementRef;

  @ViewChild('notesadddModalOpen') notesadddModalOpen: ElementRef;
  @ViewChild('notesadddModalClose') notesadddModalClose: ElementRef;
  public parameter: IProperty = {};
  obj: any;
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
  public scrollbarOptions = { axis: 'y', theme: 'dark' };
  public assign: IProperty = {};
  public assignItem: any;

  constructor(public constant: Constant, private cs: CommonService,
    private route: ActivatedRoute,
    public admin: AdminService,
    private spinner: NgxSpinnerService,
    private ngZone: NgZone,
    private translate: TranslateService,
    private mapsAPILoader: MapsAPILoader, private toastr: ToastrService,
    private router: Router) {
    this.admin.countryData$.subscribe(success => {
      this.parameter.allCountry = success;
    });
  }

  ngOnInit() {
    this.label = this.translate.instant('table.title.chooseManagersFile');
    this.file1 = new FileUpload(false, this.admin);
    this.model = new Manager();
    this.model.is_company = 'true';
    this.model.project_sort = 2;
    this.model.country_code = this.constant.country_code;
    this.model.dial_code = this.constant.dial_code;
    this.model.company = new Company();
    this.parameter.itemsPerPage = this.constant.itemsPerPage;

    this.setCurrentPosition();
    // this.setCurrentPosition();
    this.parameter.sub = this.route.params.subscribe(params => {
      if (params.type == 'manager') {
        this.parameter.name = params.name;
      } else if (params.type == 'company') {
        this.parameter.company_name = params.name;
      }
      this.parameter.p = this.constant.p;
      this.parameter.phone = ''; this.parameter.email = '';
      this.parameter.total = 0;
      this.getTowerManager();
      this.getAllCompanies();
      this.initialCountry = { initialCountry: this.constant.initialCountry };
    });
  }
  addNote() {
    this.notesadddModalOpen.nativeElement.click();
  }

  addManagerNote() {
    const input = { tower_managers_id: this.model.id, description: this.model.note };
    this.admin.postDataApi('addManagerNotes', input).subscribe(success => {
      console.log(success.data);
      this.closeNotesadddModalModal();
      this.getAllNotes(this.model.id);
      this.modalClose.nativeElement.click();
      this.inhouseUserModalOpen.nativeElement.click();
    });
  }
  getAllNotes(model) {
    this.admin.postDataApi('getManagerNotes', { tower_managers_id: model })
      .subscribe(
        success => {
          this.parameter.notes = success.data;
          console.log(success.data, "all notes")
        });
  }

  closeNotesadddModalModal = (): void => {
    this.notesadddModalClose.nativeElement.click();
    this.modalClose.nativeElement.click();
    this.inhouseUserModalOpen.nativeElement.click();
  }

  deleteNotePopup(note_id, index) {
    this.parameter.text = this.translate.instant('message.error.wantToDeleteNote');
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Delete!'
    }).then((result) => {
      if (result.value) {
        this.deleteLeadNote(note_id, index);
      }
    });
  }

  deleteLeadNote(note_id, index) {
    this.admin.postDataApi('deleteManagerNotes', { id: note_id }).subscribe(r => {
      this.getAllNotes(this.model.id);
      //  this.model.manager_notes.splice(index, 1);
      this.toastr.clear();
      this.toastr.success(this.translate.instant('message.success.deletedSuccessfully'), this.translate.instant('swal.success'));
    });
  }

  telInputObject(obj) {
    this.obj = obj;
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
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.uploadingImage'), 'error');
      return false;
    }
    const input = new FormData();
    if (this.model.id) { input.append('id', this.model.id.toString()); }

    input.append('name', this.model.name);
    input.append('first_surname', this.model.first_surname || '');
    input.append('second_surname', this.model.second_surname || '');

    if (this.model.phone) {
      input.append('country_code', this.model.country_code ? this.model.country_code : this.constant.dial_code);
      input.append('dial_code', this.model.dial_code ? this.model.dial_code : this.constant.dial_code);
      input.append('phone', this.model.phone);
    }
    if (this.model.email) {
      input.append('email', this.model.email);
    }

    if (this.model.company.id) {
      input.append('company_id', this.model.company.id.toString());
    }

    if (this.model.image) { input.append('image', this.model.image); }
    if (this.model.logo) { input.append('logo', this.model.logo); }

    if (this.model.is_company == 'false') {
      input.append('address', this.model.address);
      input.append('lat', this.model.lat);
      input.append('lng', this.model.lng);
      input.append('rfc_legal_id', this.model.rfc_legal_id);
      input.append('description', this.model.description || '');
    }

    this.spinner.show();
    this.admin.postDataApi('addTowerManager', input)
      .subscribe(
        success => {
          this.spinner.hide();
          if (success.success === '0') {
            swal(this.translate.instant('swal.error'), success.message, 'error');
          } else {
            this.modalClose.nativeElement.click();
            const text = this.model.id ?
              this.translate.instant('message.success.updatedSuccessfully') :
              this.translate.instant('message.success.addedSuccessfully');
            swal(this.translate.instant('swal.success'), text, 'success');
            if (this.model.id) {
              this.items[this.parameter.index] = success.data;
            } else {
              this.modalClose.nativeElement.click();
              const text = this.model.id ?
                this.translate.instant('message.success.updatedSuccessfully') :
                this.translate.instant('message.success.addedSuccessfully');
              swal(this.translate.instant('swal.success'), text, 'success');
              if (this.model.id) {
                this.items[this.parameter.index] = success.data;
                console.log(this.items, "edit resp")
              } else {
                this.items.push(success.data);
                this.parameter.total++;
              }
              formdata.reset();
              this.emptyModel();
            }
            formdata.reset();
            this.emptyModel();
          }
        }, error => {
          this.spinner.hide();
        });
  }

  setIsCompany(is_company: string) {
    this.model.is_company = is_company;
  }

  editUser(userdata: Manager, index: any) {
    this.getAllNotes(userdata.id);
    this.parameter.index = index;
    this.model = userdata;
    this.model.company = userdata.company ? userdata.company : new Company();
    this.image = userdata.image;
    this.logo = userdata.logo;
    if (userdata.company_id != null && userdata.company_id != 0) {
      this.model.is_company = 'true';
    } else {
      this.model.is_company = 'false';
    }
    this.model.rfc_legal_id = userdata.rfc_legal_id && userdata.rfc_legal_id != 'null' ? userdata.rfc_legal_id : '';
    this.model.address = userdata.address && userdata.address != 'null' ? userdata.address : '';
    this.model.img_loader = false; this.model.logo_loader = false;
    if (this.obj) {
      this.obj.intlTelInput('setCountry', this.model.country_code ? this.model.country_code : this.constant.country_code);
    }
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
  setIsFreelancer(is_freelancer: string) {
    this.parameter.is_freelancer = is_freelancer;
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
    if (this.parameter.is_freelancer) { input.append('is_freelancer', this.parameter.is_freelancer); }

    this.admin.postDataApi('getTowerManager', input)
      .subscribe(
        success => {
          this.spinner.hide();
          this.items = success.data;
          console.log(this.items, "all list")
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
    this.parameter.title = this.translate.instant('message.error.areYouSure');
    switch (flag) {
      case 0:
        this.parameter.text = this.translate.instant('message.error.wantToUnblockManager');
        this.parameter.successText = this.translate.instant('message.success.unblockedSuccessfully');
        break;
      case 1:
        this.parameter.text = this.translate.instant('message.error.wantToBlockManager');
        this.parameter.successText = this.translate.instant('message.success.blockedSuccessfully');
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
          swal(this.translate.instant('swal.success'), this.parameter.successText, 'success');
          // this.items[this.parameter.index] = success.data;
          this.items[this.parameter.index]['is_blocked'] = flag;
        });
  }

  file1Select($event) {
    this.file1.onSelectFile($event);
  }

  deletePopup(item: any, index: number) {
    this.parameter.title = this.translate.instant('message.error.areYouSure');
    this.parameter.text = this.translate.instant('message.error.wantToDeleteManager');

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
      this.admin.postDataApi('importTowerManager', input)
        .subscribe(
          success => {
            this.spinner.hide();
            this.fileInput.nativeElement.value = '';
            this.label = this.translate.instant('table.title.chooseManagersFile');
            swal(this.translate.instant('swal.success'), this.translate.instant('message.success.importedSuccessfully'), 'success');
            this.getTowerManager();
          }, error => {
            this.fileInput.nativeElement.value = '';
            this.spinner.hide();
          });
    } else {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseFile'), 'error');
      return false;
    }
  }

  loadPlaces(paramAdd: string, paramLat: string, paramLng: string, searchRef: any) {
    // load Places Autocomplete
    this.model[paramLat] = null;
    this.model[paramLng] = null;
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this[searchRef].nativeElement, {
        types: []
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          // const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          const place = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.model[paramLat] = place.geometry.location.lat();
          this.model[paramLng] = place.geometry.location.lng();
          if (place.formatted_address) {
            this.model[paramAdd] = place.formatted_address;
          }
        });
      });
    });
  }


  setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        // setting address lat lng
        // this.model.lat = position.coords.latitude;
        // this.model.lng = position.coords.longitude;

        // setting branch office lat lng
        // this.model.branch_lat = position.coords.latitude;
        // this.model.branch_lng = position.coords.longitude;
      });
    }
  }

  placeMarker($event: any, paramLat: string, paramLng: string, param: string) {
    this.model[paramLat] = $event.coords.lat;
    this.model[paramLng] = $event.coords.lng;
    this.getGeoLocation(this.model[paramLat], this.model[paramLng], param);
  }


  getGeoLocation(lat: number, lng: number, param: string) {
    if (navigator.geolocation) {
      const geocoder = new google.maps.Geocoder();
      const latlng = new google.maps.LatLng(lat, lng);
      const request = { latLng: latlng };

      geocoder.geocode(request, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          const result = results[0];
          if (result != null) {
            this.model[param] = result.formatted_address;
          } else {
            this.model[param] = lat + ',' + lng;
          }
        }
      });
    }
  }

  viewCompany(item: any) {
    if (item.company && item.company.id) {
      this.router.navigate(['/dashboard/companies/view-all', item.company.name]);
    }
  }

  bulkAssign = (): void => {
    //this.showSearchText = false;
    const leads_ids = this.items.filter(x => x.selected).map(y => y.id);
    if (leads_ids.length === 0) {
      //this.showSearchText = true;
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseAtleastOneManager'), 'error');
    } else if (!this.assign.items) {
      this.getAssignListing(true);
    } else {
      this.openAssignModel.nativeElement.click();
    }
  }

  getAssignListing = (openAssignedModel: boolean): void => {
    const postData = { keyword: this.assign.keyword };
    this.spinner.show();
    this.admin.postDataApi('getAllianceAgent', postData).subscribe((success) => {
      this.spinner.hide();
      this.assign.items = (success || {}).data || [];
      if (openAssignedModel) {
        this.openAssignModel.nativeElement.click();
      }
    });
  }

  assignNow = (): void => {
    if (!this.assignItem) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseAllianceAgent'), 'error');
    } else {
      const postData = [];
      this.items.forEach((data) => {
        if (data.selected) {
          postData.push({ id: (this.assignItem || {}).id, manager_id: data.id });
        }
      });
      this.spinner.show();
      this.admin.postDataApi('assignTowerManager', { agent_id: postData }).subscribe((response) => {
        this.spinner.hide();
        swal(this.translate.instant('swal.success'), this.translate.instant('message.success.assignedSuccessfully'), 'success');
        this.assignModelClose();
        this.getTowerManager();
      }, (error) => {
        this.spinner.hide();
        this.assignModelClose();
        swal(this.translate.instant('swal.error'), error.error.message, 'error');
      });
    }
  }

  assignModelClose = (): void => {
    this.assign.items = null;
    this.assignItem = null;
    this.closeAssignModel.nativeElement.click();
  }

}
