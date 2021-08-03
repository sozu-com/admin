import { Component, OnInit, TemplateRef, ElementRef } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';
import { IProperty } from 'src/app/common/property';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Constant } from 'src/app/common/constants';
import { Property } from 'src/app/models/property.model';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
declare let swal: any;
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  providers: [Constant, Property]
})
export class RoomComponent implements OnInit {

  public parameter: IProperty = {};
  public modalRef: BsModalRef;
  icon: any;

  constructor(private element: ElementRef, private constant: Constant, public property: Property,
    private modalService: BsModalService, public admin: AdminService, private router: Router,
    private spinner: NgxSpinnerService, private toastr: ToastrService,
    private translate: TranslateService
  ) {
    this.parameter.index = -1;
    this.parameter.countryCount = 0;
    this.parameter.stateCount = 0;
    this.parameter.cityCount = 0;
  }

  ngOnInit() {
    this.getRoomConfigurations();
    this.getRoomTypes();
    this.getAmenities();
  }

  public openPropertyConfigModal(template: TemplateRef<any>, index, id, name_en, name_es, bedroom, bathroom, half_bathroom, status) {
    this.parameter.index = index;
    this.property.configuration.id = id;
    this.property.configuration.name_en = name_en;
    this.property.configuration.name_es = name_es == null ? name_en : name_es;
    this.property.configuration.bedroom = bedroom;
    this.property.configuration.bathroom = bathroom;
    this.property.configuration.half_bathroom = half_bathroom;
    this.property.configuration.status = status;
    this.modalRef = this.modalService.show(template);
  }

  public openPropertyTypeModal(template: TemplateRef<any>, index, id, name_en, name_es, status) {
    this.parameter.index = index;
    this.property.type.id = id;
    this.property.type.name_en = name_en;
    this.property.type.name_es = name_es;
    this.property.type.status = status;
    this.modalRef = this.modalService.show(template);
  }

  public openAmenityModal(template: TemplateRef<any>, index, id, icon, name_en, name_es, status) {
    this.parameter.index = index;
    this.property.amenities.id = id;
    this.property.amenities.icon = icon;
    this.property.amenities.name_en = name_en;
    this.property.amenities.name_es = name_es;
    this.property.amenities.status = status;
    this.modalRef = this.modalService.show(template);
  }


  addPropertyConfiguration(id, name_en, name_es, bedroom, bathroom, half_bathroom, status, type) {
    if (type === 'edit') { this.modalRef.hide(); }
    this.parameter.url = 'addRoomConfiguration';
    const input = new FormData();
    input.append('name_en', name_en);
    input.append('name_es', name_es);
    input.append('bedroom', bedroom);
    input.append('bathroom', bathroom);
    input.append('half_bathroom', half_bathroom);
    input.append('status', status);

    if (id) { input.append('id', id); }
    this.spinner.show();
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.spinner.hide();
          const text = id ?
            this.translate.instant('message.success.updatedSuccessfully') :
            this.translate.instant('message.success.addedSuccessfully');
          // this.getRoomConfigurations();
          this.property.configuration.id = '';
          this.property.configuration.name_en = '';
          this.property.configuration.name_es = '';
          swal(this.translate.instant('swal.success'), text, 'success');
          if (this.parameter.index !== -1) {
            this.parameter.items[this.parameter.index] = success.data;
          } else {
            this.parameter.items.push(success.data);
          }
          this.parameter.index = -1;
        }, error => {
          this.spinner.hide();
        }
      );
  }

  addRoomType(id, name_en, name_es, status, type) {
    if (type === 'edit') { this.modalRef.hide(); }
    this.parameter.url = 'addRoomType';
    const input = new FormData();
    input.append('name_en', name_en);
    input.append('name_es', name_es);
    input.append('status', status);

    if (id) { input.append('id', id); }
    this.spinner.show();
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.spinner.hide();
          const text = id ?
            this.translate.instant('message.success.updatedSuccessfully') :
            this.translate.instant('message.success.addedSuccessfully');
          swal(this.translate.instant('swal.success'), text, 'success');
          this.property.type.id = '';
          this.property.type.name_en = '';
          this.property.type.name_es = '';
          if (this.parameter.index !== -1) {
            this.parameter.propertyTypes[this.parameter.index] = success.data;
          } else {
            this.parameter.propertyTypes.push(success.data);
          }
          this.parameter.index = -1;
        }, error => {
          this.spinner.hide();
        }
      );
  }


  addAmenity(id, icon, name_en, name_es, status, type) {
    if (type === 'edit') { this.modalRef.hide(); }
    const iconNew = this.icon ? this.icon : this.property.amenities.icon;
    this.parameter.url = 'addRoomAmenity';
    const input = new FormData();
    input.append('name_en', name_en);
    input.append('name_es', name_es);
    input.append('status', status);

    if (this.icon) { input.append('icon', iconNew); }

    if (id) { input.append('id', id); }
    this.spinner.show();
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.spinner.hide();
          const text = id ?
            this.translate.instant('message.success.updatedSuccessfully') :
            this.translate.instant('message.success.addedSuccessfully');
          swal(this.translate.instant('swal.success'), text, 'success');
          this.property.amenities.id = '';
          this.property.amenities.name_en = '';
          this.property.amenities.name_es = '';
          this.property.amenities.icon = '';
          if (this.parameter.index !== -1) {
            this.parameter.amenities[this.parameter.index] = success.data;
          } else {
            this.parameter.amenities.push(success.data);
          }
          this.parameter.index = -1;
        }, error => {
          this.spinner.hide();
        }
      );
  }


  getRoomConfigurations() {
    this.spinner.show();
    this.parameter.url = 'getRoomConfigurations';
    const input = new FormData();
    this.admin.postDataApi(this.parameter.url, { hide_blocked: 0 })
      .subscribe(
        success => {
          this.spinner.hide();
          this.parameter.items = success.data;
          this.parameter.total = success.data.length;
        },
        error => {
          this.spinner.hide();
        }
      );
  }


  getRoomTypes() {
    this.spinner.show();
    this.parameter.url = 'getRoomTypes';
    const input = new FormData();
    this.admin.postDataApi(this.parameter.url, { hide_blocked: 0 })
      .subscribe(
        success => {
          this.spinner.hide();
          this.parameter.propertyTypes = success.data;
          this.parameter.propertyTypesCount = success.data.length;
        },
        error => {
          this.spinner.hide();
        }
      );
  }

  getAmenities() {
    this.spinner.show();
    this.parameter.url = 'getRoomAmenities';
    const input = new FormData();
    this.admin.postDataApi(this.parameter.url, { hide_blocked: 0 })
      .subscribe(
        success => {
          this.spinner.hide();
          this.parameter.amenities = success.data;
          this.parameter.amenitiesCount = success.data.length;
        }, error => {
          this.spinner.hide();
        }
      );
  }

  addPropertyConfigurationPopup(index, id, name_en, name_es, bedroom, bathroom, half_bathroom, status, type) {
    this.parameter.index = index;
    const self = this;
    const text = status === 1 ? this.translate.instant('message.error.wantToUnblockPropertyConfig') :
      this.translate.instant('message.error.wantToBlockPropertyConfig');
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.addPropertyConfiguration(id, name_en, name_es, bedroom, bathroom, half_bathroom, status, type);
      }
    });
  }

  addRoomTypePopup(index, id, name_en, name_es, status, type) {
    this.parameter.index = index;
    const self = this;
    const text = status === 1 ? this.translate.instant('message.error.wantToUnblockPropertyType') :
      this.translate.instant('message.error.wantToBlockPropertyType');
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.addRoomType(id, name_en, name_es, status, type);
      }
    });
  }

  addAmenityPopup(index, id, icon, name_en, name_es, status, type) {
    this.parameter.index = index;
    const self = this;
    const text = status === 1 ? this.translate.instant('message.error.wantToUnblockAmenity') :
      this.translate.instant('message.error.wantToBlockAmenity');
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.addAmenity(id, icon, name_en, name_es, status, type);
      }
    });
  }

  checkIfConfigSpanishNameEntered(formdata: NgForm, id, name_en, name_es, bedroom, bathroom, half_bathroom, status, type) {
    const self = this;
    formdata.reset();
    if (name_es === '') {
      swal({
        text: this.translate.instant('message.error.saveEngPropertyConfig'),
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: this.constant.confirmButtonColor,
        cancelButtonColor: this.constant.cancelButtonColor,
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          this.addPropertyConfiguration(id, name_en, name_en, bedroom, bathroom, half_bathroom, status, type);
        }
      });
    } else {
      self.addPropertyConfiguration(id, name_en, name_es, bedroom, bathroom, half_bathroom, status, type);
    }
  }


  checkIfTypeSpanishNameEntered(formdata: NgForm, id, name_en, name_es, status, type) {
    const self = this;
    formdata.reset();
    if (name_es === '') {
      swal({
        text: this.translate.instant('message.error.saveEngPropertyType'),
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: this.constant.confirmButtonColor,
        cancelButtonColor: this.constant.cancelButtonColor,
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          this.addRoomType(id, name_en, name_en, status, type);
        }
      });
    } else {
      self.addRoomType(id, name_en, name_es, status, type);
    }
  }


  checkIfAmenitySpanishNameEntered(formdata: NgForm, id, icon, name_en, name_es, status, type) {
    const self = this;
    formdata.reset();
    if (name_es === '') {
      swal({
        text: this.translate.instant('message.error.saveEngAmenity'),
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: this.constant.confirmButtonColor,
        cancelButtonColor: this.constant.cancelButtonColor,
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          this.addAmenity(id, icon, name_en, name_en, status, type);
        }
      });
    } else {
      self.addAmenity(id, icon, name_en, name_es, status, type);
    }
  }


  changeListner(event) {
    const reader = new FileReader();
    const image = this.element.nativeElement.querySelector('.image');
    const fileToUpload = event.target.files[0];
    this.icon = fileToUpload;

    reader.onload = function (e) {
      const src = e.target['result'];
      image.src = src;
    };

    reader.readAsDataURL(event.target.files[0]);
  }


  changeListner1(event) {
    const reader = new FileReader();

    const image = this.element.nativeElement.querySelector('.image1');

    const fileToUpload = event.target.files[0];
    this.icon = fileToUpload;

    reader.onload = function (e) {
      const src = e.target['result'];
      image.src = src;
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  openDeleteConfirmationPopup = (item: any, index: number, isDeletePropertyConfiguration: boolean): void => {
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' +
        (isDeletePropertyConfiguration ? this.translate.instant('message.error.wantToDeletePropertyConfiguration')
        : this.translate.instant('message.error.wantToDeleteAmenities')),
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        if (isDeletePropertyConfiguration) {
          this.deletePropertyConfiguration(item, index);
        } else {
          this.deleteAmenities(item, index);
        }
      }
    });
  }

  deletePropertyConfiguration = (item: any, index: number): void => {
    this.spinner.show();
    this.admin.postDataApi('deletePropertyConfiguration', { id: item.id }).subscribe((response) => {
      this.spinner.hide();
      if (response.success == '0') {
        this.toastr.error(this.translate.instant('message.error.youCannotDeleteThisPropertyConfiguration'), this.translate.instant('swal.error'));
      } else {
        this.toastr.success(this.translate.instant('message.success.deletedSuccessfully'), this.translate.instant('swal.success'));
        this.parameter.items.splice(index, 1);
      }
    }, (error) => {
      this.spinner.hide();
      this.toastr.error(((error || {}).error || {}).message, this.translate.instant('swal.error'));
    });
  }

  deleteAmenities = (item: any, index: number): void => {
    this.spinner.show();
    this.admin.postDataApi('DeleteAmenities', { id: item.id }).subscribe((response) => {
      this.spinner.hide();
      if (response.success == '0') {
        this.toastr.error(this.translate.instant('message.error.youCannotDeleteThisAmenities'), this.translate.instant('swal.error'));
      } else {
        this.toastr.success(this.translate.instant('message.success.deletedSuccessfully'), this.translate.instant('swal.success'));
        this.parameter.amenities.splice(index, 1);
      }
    }, (error) => {
      this.spinner.hide();
      this.toastr.error(((error || {}).error || {}).message, this.translate.instant('swal.error'));
    });
  }


}
