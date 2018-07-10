import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from '../../../admin.service';
import { Router } from '@angular/router';
import { SweetAlertService } from 'ngx-sweetalert2';
import { IProperty } from '../../common/property';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Constant } from './../../common/constants';
import { Property } from './property.model';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css'],
  providers: [Constant, Property]
})

export class PropertyComponent implements OnInit {

  public parameter: IProperty = {};
  public modalRef: BsModalRef;

  constructor(private constant: Constant, private property: Property, private modalService: BsModalService, private admin: AdminService, private router: Router, private swal: SweetAlertService) {   
    this.parameter.countryCount = 0
    this.parameter.stateCount = 0
    this.parameter.cityCount = 0
  }

  ngOnInit() {
    this.getConfigurations();
    this.getPropertyTypes();
    this.getAmenities();
  }

  public openPropertyTypeModal(template: TemplateRef<any>, id, name_en, name_es, status) {
    this.property.type.id = id;
    this.property.type.name_en = name_en;
    this.property.type.name_es = name_es;
    this.property.type.status = status;
    this.modalRef = this.modalService.show(template);
  }

  public openAmenitiesModal(template: TemplateRef<any>, id, name_en, name_es, icon, status) {
    this.property.amenities.id = id;
    this.property.amenities.name_en = name_en;
    this.property.amenities.name_es = name_es;
    this.property.amenities.icon = icon;
    this.property.amenities.status = status;
    this.modalRef = this.modalService.show(template);
  }

  addPropertyConfiguration(id, name, status){

    this.parameter.loading = true;
    this.parameter.url = 'addConfiguration';

    let input = new FormData();
    input.append("name", name);
    input.append("status", status);

    if(id)
      input.append("id", id);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('success',success)
          this.parameter.loading = false;
          this.swal.success({ 
            title: 'Success',
            // text: this.location.countryModel.country_id || country_id ? this.constant.successMsg.COUNTRY_UPDATED_SUCCESSFULLY : this.constant.successMsg.COUNTRY_ADDED_SUCCESSFULLY,
          })
          // let obje = {
          //   id: 11,
          //   name: name,
          //   status: status
          // }
          // this.parameter.items.push(obje)
          this.getConfigurations();
          // this.location.countryModel
          // formdata.reset();
        },
        error => {
          this.parameter.loading = false;
          this.swal.warning({ 
            title: 'Error',
            text: error.message,
          })
          this.router.navigate(['']);
        });
  }


  getConfigurations(){
    this.parameter.loading = true;
    this.parameter.url = 'getConfigurations';
    let input = new FormData();
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('getConfigurations',success)
          this.parameter.loading = false;
          this.parameter.items = success.data
          this.parameter.total = success.data.length;
        },
        error => {
          console.log(error)
          this.parameter.loading = false;
          if(error.statusCode==401) this.router.navigate(['']);
          else
            this.swal.warning({ 
              // title: 'Internet Connection',
              text: error.messages,
            })
        });
  }



  addPropertyConfigurationPopup(id, name, status){
    let self=this;
    this.swal.confirm({ 
      title: this.constant.title.ARE_YOU_SURE,
      text: this.constant.title.REMOVE_PROPERTY_CONFIGURATION,
    }).then(function(){
      self.addPropertyConfiguration(id, name, status)
    })
    .catch(function(){
    // console.log('Logout cancelled by user');
    })
  }


  checkIfTypeSpanishNameEntered(name_en, name_es){
    let self=this;
    if(name_es == ''){
      this.swal.confirm({ 
        text: this.constant.errorMsg.SAVE_ENGLISH_PROPERTY_TYPE,
      }).then(function(){
        self.addPropertyType('',name_en, name_en, self.property.type.status)
      })
      .catch(function(){
      // console.log('Logout cancelled by user');
      })
    }
    else{
      self.addPropertyType('',name_en, name_es, self.property.type.status)
    }
  }


  blockUnblockPropertyType(id, name_en, name_es, status){
    
    this.parameter.title = this.constant.title.ARE_YOU_SURE;
    switch (status) {
      case 0:
        this.parameter.text = this.constant.title.BLOCK_PROPERTY_TYPE;
        this.parameter.successText = this.constant.successMsg.BLOCKED_SUCCESSFULLY;
        break;
      case 1:
        this.parameter.text = this.constant.title.UNBLOCK_PROPERTY_TYPE;
        this.parameter.successText = this.constant.successMsg.UNBLOCKED_SUCCESSFULLY;
        break;
    }

    let self=this;
    this.swal.confirm({ 
        title: this.parameter.title,
        text: this.parameter.text,
    }).then(function(){
      self.addPropertyType(id, name_en, name_es, status);
    })
    .catch(function(){
      // console.log('Logout cancelled by user');
    })
  }


  addPropertyType(id, name_en, name_es, status){

    if(id=='') this.modalRef.hide();
    this.parameter.loading = true;
    this.parameter.url = 'addPropertyType';

    let input = new FormData();
    input.append("name_en", name_en);
    input.append("name_es", name_es);
    input.append("status", status);

    if(id)
      input.append("id", id);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('addPropertyType',success)
          this.parameter.loading = false;
          this.swal.success({ 
            title: 'Success',
            text: this.property.type.id || id ? this.constant.successMsg.PROPERTY_TYPE_UPDATED_SUCCESSFULLY : this.constant.successMsg.PROPERTY_TYPE_ADDED_SUCCESSFULLY,
          })
          this.getPropertyTypes();
          // this.location.countryModel
          // formdata.reset();
        },
        error => {
          this.parameter.loading = false;
          this.swal.warning({ 
            title: 'Error',
            text: error.message,
          })
          this.router.navigate(['']);
        });
  }


  getPropertyTypes(){
    this.parameter.loading = true;
    this.parameter.url = 'getPropertyTypes';
    let input = new FormData();
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('getPropertyTypes',success)
          this.parameter.loading = false;
          this.parameter.propertyTypes = success.data
          this.parameter.propertyTypesCount = success.data.length;
        },
        error => {
          console.log(error)
          this.parameter.loading = false;
          if(error.statusCode==401) this.router.navigate(['']);
          else
            this.swal.warning({ 
              // title: 'Internet Connection',
              text: error.messages,
            })
        });
  }



  addPropertyTypePopup(id, name_en, name_es, status){
    let self=this;
    this.swal.confirm({ 
      title: this.constant.title.ARE_YOU_SURE,
      text: this.constant.title.REMOVE_PROPERTY_CONFIGURATION,
    }).then(function(){
      self.addPropertyType('',name_en, name_es, self.property.type.status)
    })
    .catch(function(){
    // console.log('Logout cancelled by user');
    })
  }

  
  getAmenities(){
    this.parameter.loading = true;
    this.parameter.url = 'getAmenities';
    let input = new FormData();
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('getAmenities',success)
          this.parameter.loading = false;
          this.parameter.amenities = success.data
          this.parameter.amenitiesCount = success.data.length;
        },
        error => {
          console.log(error)
          this.parameter.loading = false;
          if(error.statusCode==401) this.router.navigate(['']);
          else
            this.swal.warning({ 
              // title: 'Internet Connection',
              text: error.messages,
            })
        });
  }


}
