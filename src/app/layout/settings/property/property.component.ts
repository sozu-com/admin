import { Component, OnInit, TemplateRef, ElementRef } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';
import { SweetAlertService } from 'ngx-sweetalert2';
import { IProperty } from '../../../common/property';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Constant } from './../../../common/constants';
import { Property } from './../../../models/property.model';

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

  constructor(private element: ElementRef, private constant: Constant, private property: Property,
    private modalService: BsModalService, private admin: AdminService, private router: Router, private swal: SweetAlertService) {
    this.parameter.countryCount = 0;
    this.parameter.stateCount = 0;
    this.parameter.cityCount = 0;
  }

  ngOnInit() {
    this.getConfigurations();
    this.getPropertyTypes();
    this.getAmenities();
  }

  public openPropertyConfigModal(template: TemplateRef<any>, id, name_en, name_es, status) {
    this.property.configuration.id = id;
    this.property.configuration.name_en = name_en;
    this.property.configuration.name_es = name_es == null ? name_en : name_es;
    this.property.configuration.status = status;
    this.modalRef = this.modalService.show(template);
  }

  public openPropertyTypeModal(template: TemplateRef<any>, id, name_en, name_es, status) {
    this.property.type.id = id;
    this.property.type.name_en = name_en;
    this.property.type.name_es = name_es;
    this.property.type.status = status;
    this.modalRef = this.modalService.show(template);
  }

  public openAmenityModal(template: TemplateRef<any>, id, icon, name_en, name_es, status) {
    console.log('00', template, id, icon, name_en, name_es, status);
    this.property.amenities.id = id;
    this.property.amenities.icon = icon;
    this.property.amenities.name_en = name_en;
    this.property.amenities.name_es = name_es;
    this.property.amenities.status = status;
    this.modalRef = this.modalService.show(template);
  }


  addPropertyConfiguration(id, name_en, name_es, status, type) {

    if (type !== 'add') {this.modalRef.hide(); }

    this.parameter.loading = true;
    this.parameter.url = 'addConfiguration';

    const input = new FormData();
    input.append('name_en', name_en);
    input.append('name_es', name_es);
    input.append('status', status);

    if (id) {input.append('id', id); }

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('addConfigurations', success);
          this.parameter.loading = false;
          this.swal.success({
            title: 'Success',
            text: id ?
            this.constant.successMsg.PROPERTY_CONFIG_UPDATED_SUCCESSFULLY :
            this.constant.successMsg.PROPERTY_CONFIG_ADDED_SUCCESSFULLY,
          });
          this.getConfigurations();
        },
        error => {
          this.parameter.loading = false;
          this.swal.warning({
            title: 'Error',
            text: error.message,
          });
          this.router.navigate(['']);
        });
  }

  addPropertyType(id, name_en, name_es, status, type) {
    if (type !== 'add') {this.modalRef.hide(); }

    this.parameter.loading = true;
    this.parameter.url = 'addPropertyType';

    const input = new FormData();
    input.append('name_en', name_en);
    input.append('name_es', name_es);
    input.append('status', status);

    if (id) {input.append('id', id); }

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('addPropertyType', success);
          this.parameter.loading = false;
          this.swal.success({
            title: 'Success',
            text: id ?
            this.constant.successMsg.PROPERTY_TYPE_UPDATED_SUCCESSFULLY :
            this.constant.successMsg.PROPERTY_TYPE_ADDED_SUCCESSFULLY,
          });
          this.getPropertyTypes();
        },
        error => {
          this.parameter.loading = false;
          this.swal.warning({
            title: 'Error',
            text: error.message,
          });
          this.router.navigate(['']);
        });
  }


  addAmenity(id, icon, name_en, name_es, status, type) {
console.log('icon', id, icon, name_en, name_es, status, type);
    if (type !== 'add') {this.modalRef.hide(); }


    const iconNew = this.icon ? this.icon : this.property.amenities.icon;
console.log('mm', iconNew);
    this.parameter.loading = true;
    this.parameter.url = 'addPropertyAmenity';

    const input = new FormData();

    input.append('name_en', name_en);
    input.append('name_es', name_es);
    input.append('status', status);

    if (this.icon) {input.append('icon', iconNew); }

    if (id) {input.append('id', id); }

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('addPropertyAmenity', success);
          this.parameter.loading = false;
          this.swal.success({
            title: 'Success',
            text: id ? this.constant.successMsg.AMENITY_UPDATED_SUCCESSFULLY : this.constant.successMsg.AMENITY_ADDED_SUCCESSFULLY,
          });
          this.getAmenities();
        },
        error => {
          this.parameter.loading = false;
          this.swal.warning({
            title: 'Error',
            text: error.message,
          });
          this.router.navigate(['']);
        });
  }


  getConfigurations() {
    this.parameter.loading = true;
    this.parameter.url = 'getConfigurations';
    const input = new FormData();
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('getConfigurations', success);
          this.parameter.loading = false;
          this.parameter.items = success.data;
          this.parameter.total = success.data.length;
        },
        error => {
          console.log(error);
          this.parameter.loading = false;
          if (error.statusCode === 401) {
            this.router.navigate(['']);
          }else {
            this.swal.warning({
              // title: 'Internet Connection',
              text: error.messages,
            });
          }
        });
  }


  getPropertyTypes() {
    this.parameter.loading = true;
    this.parameter.url = 'getPropertyTypes';
    const input = new FormData();
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('getPropertyTypes', success);
          this.parameter.loading = false;
          this.parameter.propertyTypes = success.data;
          this.parameter.propertyTypesCount = success.data.length;
        },
        error => {
          console.log(error);
          this.parameter.loading = false;
          if (error.statusCode === 401) {
            this.router.navigate(['']);
          }else {
            this.swal.warning({
              // title: 'Internet Connection',
              text: error.messages,
            });
          }
        });
  }

  getAmenities() {
    this.parameter.loading = true;
    this.parameter.url = 'getPropertyAmenities';
    const input = new FormData();
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('getPropertyAmenities', success);
          this.parameter.loading = false;
          this.parameter.amenities = success.data;
          this.parameter.amenitiesCount = success.data.length;
        },
        error => {
          console.log(error);
          this.parameter.loading = false;
          if (error.statusCode === 401) {
            this.router.navigate(['']);
          }else {
            this.swal.warning({
              // title: 'Internet Connection',
              text: error.messages,
            });
          }
        });
  }

  addPropertyConfigurationPopup(id, name_en, name_es, status, type) {
    const self = this;
    this.swal.confirm({
      title: this.constant.title.ARE_YOU_SURE,
      text: status === 1 ? this.constant.title.UNBLOCK_PROPERTY_CONFIG : this.constant.title.BLOCK_PROPERTY_CONFIG,
    }).then(function(){
      self.addPropertyConfiguration(id, name_en, name_es, status, type);
    })
    .catch(function(){
    // console.log('Logout cancelled by user');
    });
  }

  addPropertyTypePopup(id, name_en, name_es, status, type) {
    const self = this;
    this.swal.confirm({
      title: this.constant.title.ARE_YOU_SURE,
      text: status === 1 ? this.constant.title.UNBLOCK_PROPERTY_TYPE : this.constant.title.BLOCK_PROPERTY_TYPE,
    }).then(function(){
      self.addPropertyType(id, name_en, name_es, status, type);
    })
    .catch(function(){
    // console.log('Logout cancelled by user');
    });
  }

  addAmenityPopup(id, icon, name_en, name_es, status, type) {
    const self = this;
    this.swal.confirm({
      title: this.constant.title.ARE_YOU_SURE,
      text: status === 1 ? this.constant.title.UNBLOCK_AMENITY : this.constant.title.BLOCK_AMENITY,
    }).then(function(){
      self.addAmenity(id, icon, name_en, name_es, status, type);
    })
    .catch(function(){
    // console.log('Logout cancelled by user');
    });
  }

  checkIfConfigSpanishNameEntered(id, name_en, name_es, status, type) {
    const self = this;
    if (name_es === '') {
      this.swal.confirm({
        text: this.constant.errorMsg.SAVE_ENGLISH_PROPERTY_CONFIG,
      }).then(function(){
        self.addPropertyConfiguration(id, name_en, name_en, status, type);
      })
      .catch(function(){
      // console.log('Logout cancelled by user');
      });
    }else {
      self.addPropertyConfiguration(id, name_en, name_es, status, type);
    }
  }


  checkIfTypeSpanishNameEntered(id, name_en, name_es, status, type) {
    const self = this;
    if (name_es === '') {
      this.swal.confirm({
        text: this.constant.errorMsg.SAVE_ENGLISH_PROPERTY_TYPE,
      }).then(function(){
        self.addPropertyType(id, name_en, name_en, status, type);
      })
      .catch(function(){
      // console.log('Logout cancelled by user');
      });
    }else {
      self.addPropertyType(id, name_en, name_es, status, type);
    }
  }


  checkIfAmenitySpanishNameEntered(id, icon, name_en, name_es, status, type) {
    console.log('00', id, icon, name_en, name_es, status, type);
    const self = this;
    if (name_es === '') {
      this.swal.confirm({
        text: this.constant.errorMsg.SAVE_ENGLISH_AMENITY,
      }).then(function(){
        self.addAmenity(id, icon, name_en, name_en, status, type);
      })
      .catch(function(){
      // console.log('Logout cancelled by user');
      });
    }else {
      self.addAmenity(id, icon, name_en, name_es, status, type);
    }
  }



  changeListner(event) {
    const reader = new FileReader();

    const image = this.element.nativeElement.querySelector('.image');
// console.log(image)
    const fileToUpload = event.target.files[0];
    this.icon = fileToUpload;

    reader.onload = function(e) {
        const src = e.target['result'];
        image.src = src;
        // console.log(image.src)
    };

    reader.readAsDataURL(event.target.files[0]);
  }


  changeListner1(event) {
    const reader = new FileReader();

    const image = this.element.nativeElement.querySelector('.image1');
console.log(image);
    const fileToUpload = event.target.files[0];
    this.icon = fileToUpload;

    reader.onload = function(e) {
        const src = e.target['result'];
        image.src = src;
        console.log(image.src);
    };

    reader.readAsDataURL(event.target.files[0]);
  }
}
