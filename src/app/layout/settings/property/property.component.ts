import { Component, OnInit, TemplateRef, ElementRef } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';
import { IProperty } from '../../../common/property';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Constant } from './../../../common/constants';
import { Property } from './../../../models/property.model';
import { NgForm } from '@angular/forms';
declare let swal: any;

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css'],
  providers: [Constant, Property]
})

export class PropertyComponent implements OnInit {

  public parameter: IProperty = {};
  public modalRef: BsModalRef;
  icon: any;

  constructor(private element: ElementRef, private constant: Constant, public property: Property,
    private modalService: BsModalService, public admin: AdminService, private router: Router
  ) {
    this.parameter.index = -1;
    this.parameter.countryCount = 0;
    this.parameter.stateCount = 0;
    this.parameter.cityCount = 0;
  }

  ngOnInit() {
    this.getConfigurations();
    this.getPropertyTypes();
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
    this.parameter.url = 'addConfiguration';
    const input = new FormData();
    input.append('name_en', name_en);
    input.append('name_es', name_es);
    input.append('bedroom', bedroom);
    input.append('bathroom', bathroom);
    input.append('half_bathroom', half_bathroom);
    input.append('status', status);

    if (id) { input.append('id', id); }
    this.parameter.loading = true;
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.parameter.loading = false;
          const text = id ?
            this.constant.successMsg.PROPERTY_CONFIG_UPDATED_SUCCESSFULLY :
            this.constant.successMsg.PROPERTY_CONFIG_ADDED_SUCCESSFULLY;
          // this.getConfigurations();
          this.property.configuration.id = '';
          this.property.configuration.name_en = '';
          this.property.configuration.name_es = '';
          swal('Success', text, 'success');
          if (this.parameter.index !== -1) {
            this.parameter.items[this.parameter.index] = success.data;
          } else {
            this.parameter.items.push(success.data);
          }
          this.parameter.index = -1;
        }, error => {
          this.parameter.loading = false;
        }
      );
  }

  addPropertyType(id, name_en, name_es, status, type) {
    if (type === 'edit') { this.modalRef.hide(); }
    this.parameter.url = 'addPropertyType';
    const input = new FormData();
    input.append('name_en', name_en);
    input.append('name_es', name_es);
    input.append('status', status);

    if (id) { input.append('id', id); }
    this.parameter.loading = true;
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.parameter.loading = false;
          const text = id ?
            this.constant.successMsg.PROPERTY_TYPE_UPDATED_SUCCESSFULLY :
            this.constant.successMsg.PROPERTY_TYPE_ADDED_SUCCESSFULLY;
          swal('Success', text, 'success');
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
          this.parameter.loading = false;
        }
      );
  }


  addAmenity(id, icon, name_en, name_es, status, type) {
    if (type === 'edit') { this.modalRef.hide(); }
    const iconNew = this.icon ? this.icon : this.property.amenities.icon;
    this.parameter.url = 'addPropertyAmenity';
    const input = new FormData();
    input.append('name_en', name_en);
    input.append('name_es', name_es);
    input.append('status', status);

    if (this.icon) { input.append('icon', iconNew); }

    if (id) { input.append('id', id); }
    this.parameter.loading = true;
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.parameter.loading = false;
          const text = id ?
            this.constant.successMsg.AMENITY_UPDATED_SUCCESSFULLY :
            this.constant.successMsg.AMENITY_ADDED_SUCCESSFULLY;
          swal('Success', text, 'success');
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
          this.parameter.loading = false;
        }
      );
  }


  getConfigurations() {
    this.parameter.loading = true;
    this.parameter.url = 'getConfigurations';
    const input = new FormData();
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.parameter.loading = false;
          this.parameter.items = success.data;
          this.parameter.total = success.data.length;
        },
        error => {
          this.parameter.loading = false;
        }
      );
  }


  getPropertyTypes() {
    this.parameter.loading = true;
    this.parameter.url = 'getPropertyTypes';
    const input = new FormData();
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.parameter.loading = false;
          this.parameter.propertyTypes = success.data;
          this.parameter.propertyTypesCount = success.data.length;
        },
        error => {
          this.parameter.loading = false;
        }
      );
  }

  getAmenities() {
    this.parameter.loading = true;
    this.parameter.url = 'getPropertyAmenities';
    const input = new FormData();
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.parameter.loading = false;
          this.parameter.amenities = success.data;
          this.parameter.amenitiesCount = success.data.length;
        }, error => {
          this.parameter.loading = false;
        }
      );
  }

  addPropertyConfigurationPopup(index, id, name_en, name_es, bedroom, bathroom, half_bathroom, status, type) {
    this.parameter.index = index;
    const self = this;
    const text = status === 1 ? this.constant.title.UNBLOCK_PROPERTY_CONFIG : this.constant.title.BLOCK_PROPERTY_CONFIG;
    swal({
      // title: this.constant.title.ARE_YOU_SURE,
      // text: status === 1 ? this.constant.title.UNBLOCK_PROPERTY_CONFIG : this.constant.title.BLOCK_PROPERTY_CONFIG,
      html: this.constant.title.ARE_YOU_SURE + '<br>' + text,
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

  addPropertyTypePopup(index, id, name_en, name_es, status, type) {
    this.parameter.index = index;
    const self = this;
    const text = status === 1 ? this.constant.title.UNBLOCK_PROPERTY_TYPE : this.constant.title.BLOCK_PROPERTY_TYPE;
    swal({
      // title: this.constant.title.ARE_YOU_SURE,
      // text: status === 1 ? this.constant.title.UNBLOCK_PROPERTY_TYPE : this.constant.title.BLOCK_PROPERTY_TYPE,
      html: this.constant.title.ARE_YOU_SURE + '<br>' + text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.addPropertyType(id, name_en, name_es, status, type);
      }
    });
  }

  addAmenityPopup(index, id, icon, name_en, name_es, status, type) {
    this.parameter.index = index;
    const self = this;
    const text = status === 1 ? this.constant.title.UNBLOCK_AMENITY : this.constant.title.BLOCK_AMENITY;
    swal({
      // title: this.constant.title.ARE_YOU_SURE,
      // text: status === 1 ? this.constant.title.UNBLOCK_AMENITY : this.constant.title.BLOCK_AMENITY,
      html: this.constant.title.ARE_YOU_SURE + '<br>' + text,
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
        text: this.constant.errorMsg.SAVE_ENGLISH_PROPERTY_CONFIG,
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
        text: this.constant.errorMsg.SAVE_ENGLISH_PROPERTY_TYPE,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: this.constant.confirmButtonColor,
        cancelButtonColor: this.constant.cancelButtonColor,
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          this.addPropertyType(id, name_en, name_en, status, type);
        }
      });
    } else {
      self.addPropertyType(id, name_en, name_es, status, type);
    }
  }


  checkIfAmenitySpanishNameEntered(formdata: NgForm, id, icon, name_en, name_es, status, type) {
    const self = this;
    formdata.reset();
    if (name_es === '') {
      swal({
        text: this.constant.errorMsg.SAVE_ENGLISH_AMENITY,
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
}
