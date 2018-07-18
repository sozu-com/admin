import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';
import { SweetAlertService } from 'ngx-sweetalert2';
import { IProperty } from '../../../common/property';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Constant } from './../../../common/constants';
import { Project } from './../../../models/project.model';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  providers: [Constant, Project]
})

export class ProjectComponent implements OnInit {

  public parameter: IProperty = {};
  public modalRef: BsModalRef;
  icon: any;

  constructor(private element: ElementRef, private constant: Constant, private project: Project, private modalService: BsModalService, private admin: AdminService, private router: Router, private swal: SweetAlertService) {   
    this.parameter.countryCount = 0
    this.parameter.stateCount = 0
    this.parameter.cityCount = 0
  }

  ngOnInit() {
    this.getPossessionStatuses();
    this.getBuildingTypes();
    this.getAmenities();
  }

  public openPossessionStatusModal(template: TemplateRef<any>, id, name_en, name_es, status) {
    this.project.possession.id = id;
    this.project.possession.name_en = name_en;
    this.project.possession.name_es = name_es==null? name_en : name_es;
    this.project.possession.status = status;
    this.modalRef = this.modalService.show(template);
  }

  public openBuildingTypeModal(template: TemplateRef<any>, id, name_en, name_es, status) {
    this.project.type.id = id;
    this.project.type.name_en = name_en;
    this.project.type.name_es = name_es;
    this.project.type.status = status;
    this.modalRef = this.modalService.show(template);
  }

  public openAmenityModal(template: TemplateRef<any>, id, icon, name_en, name_es, status) {
    console.log('00',template,id, icon, name_en, name_es, status)
    this.project.amenities.id = id;
    this.project.amenities.icon = icon;
    this.project.amenities.name_en = name_en;
    this.project.amenities.name_es = name_es;
    this.project.amenities.status = status;
    this.modalRef = this.modalService.show(template);
  }


  addPossessionStatus(id, name_en, name_es, status, type){

    if(type != 'add') this.modalRef.hide()

    this.parameter.loading = true;  
    this.parameter.url = 'addPossessionStatus';

    let input = new FormData();
    input.append("name_en", name_en);
    input.append("name_es", name_es);
    input.append("status", status);

    if(id)
      input.append("id", id);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('addPossessionStatus',success)
          this.parameter.loading = false;
          this.swal.success({ 
            title: 'Success',
            text: id ? this.constant.successMsg.PROJECT_POSSESSION_UPDATED_SUCCESSFULLY : this.constant.successMsg.PROJECT_POSSESSION_ADDED_SUCCESSFULLY,
          })
          this.getPossessionStatuses();
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

  addBuildingType(id, name_en, name_es, status, type){
    if(type != 'add') this.modalRef.hide()

    this.parameter.loading = true;  
    this.parameter.url = 'addBuildingType';

    let input = new FormData();
    input.append("name_en", name_en);
    input.append("name_es", name_es);
    input.append("status", status);

    if(id)
      input.append("id", id);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('addBuildingType',success)
          this.parameter.loading = false;
          this.swal.success({ 
            title: 'Success',
            text: id ? this.constant.successMsg.PROJECT_TYPE_UPDATED_SUCCESSFULLY : this.constant.successMsg.PROJECT_TYPE_ADDED_SUCCESSFULLY,
          })
          this.getBuildingTypes();
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


  addAmenity(id, icon, name_en, name_es, status, type){
console.log('icon',id, icon, name_en, name_es, status, type)
    if(type != 'add') this.modalRef.hide()


    let iconNew = this.icon ? this.icon : this.project.amenities.icon;
console.log('mm', iconNew)
    this.parameter.loading = true;  
    this.parameter.url = 'addAmenity';

    let input = new FormData();
    
    input.append("name_en", name_en);
    input.append("name_es", name_es);
    input.append("status", status);

    if(this.icon)
      input.append("icon", iconNew);

    if(id)
      input.append("id", id);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('addAmenity',success)
          this.parameter.loading = false;
          this.swal.success({ 
            title: 'Success',
            text: id ? this.constant.successMsg.AMENITY_UPDATED_SUCCESSFULLY : this.constant.successMsg.AMENITY_ADDED_SUCCESSFULLY,
          })
          this.getAmenities();
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


  getPossessionStatuses(){
    this.parameter.loading = true;
    this.parameter.url = 'getPossessionStatuses';
    let input = new FormData();
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('getPossessionStatuses',success)
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


  getBuildingTypes(){
    this.parameter.loading = true;
    this.parameter.url = 'getBuildingTypes';
    let input = new FormData();
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('getBuildingTypes',success)
          this.parameter.loading = false;
          this.parameter.projectTypes = success.data
          this.parameter.projectTypesCount = success.data.length;
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

  addPossessionStatusPopup(id, name_en, name_es, status, type){
    let self=this;
    this.swal.confirm({ 
      title: this.constant.title.ARE_YOU_SURE,
      text: status == 1 ? this.constant.title.UNBLOCK_PROJECT_POSSESSION : this.constant.title.BLOCK_PROJECT_POSSESSION,
    }).then(function(){
      self.addPossessionStatus(id, name_en, name_es, status, type)
    })
    .catch(function(){
    // console.log('Logout cancelled by user');
    })
  }

  addBuildingTypePopup(id, name_en, name_es, status, type){
    console.log(id, name_en, name_es, status, type)
    let self=this;
    this.swal.confirm({ 
      title: this.constant.title.ARE_YOU_SURE,
      text: status == 1 ? this.constant.title.UNBLOCK_PROJECT_TYPE : this.constant.title.BLOCK_PROJECT_TYPE,
    }).then(function(){
      self.addBuildingType(id, name_en, name_es, status, type)
    })
    .catch(function(){
    // console.log('Logout cancelled by user');
    })
  }

  addAmenityPopup(id, icon, name_en, name_es, status, type){
    let self=this;
    this.swal.confirm({ 
      title: this.constant.title.ARE_YOU_SURE,
      text: status == 1 ? this.constant.title.UNBLOCK_AMENITY : this.constant.title.BLOCK_AMENITY,
    }).then(function(){
      self.addAmenity(id, icon, name_en, name_es, status, type)
    })
    .catch(function(){
    // console.log('Logout cancelled by user');
    })
  }

  checkIfPossessionSpanishNameEntered(id, name_en, name_es, status, type){
    let self=this;
    if(name_es == ''){
      this.swal.confirm({ 
        text: this.constant.errorMsg.SAVE_ENGLISH_PROJECT_POSSESION,
      }).then(function(){
        self.addPossessionStatus(id, name_en, name_en, status, type)
      })
      .catch(function(){
      // console.log('Logout cancelled by user');
      })
    }
    else{
      self.addPossessionStatus(id, name_en, name_es, status, type)
    }
  }


  checkIfTypeSpanishNameEntered(id, name_en, name_es, status, type){
    let self=this;
    if(name_es == ''){
      this.swal.confirm({ 
        text: this.constant.errorMsg.SAVE_ENGLISH_PROJECT_TYPE,
      }).then(function(){
        self.addBuildingType(id, name_en, name_en, status, type)
      })
      .catch(function(){
      // console.log('Logout cancelled by user');
      })
    }
    else{
      self.addBuildingType(id, name_en, name_es, status, type)
    }
  }


  checkIfAmenitySpanishNameEntered(id, icon, name_en, name_es, status, type){
    console.log('00',id, icon, name_en, name_es, status, type)
    let self=this;
    if(name_es == ''){
      this.swal.confirm({ 
        text: this.constant.errorMsg.SAVE_ENGLISH_AMENITY,
      }).then(function(){
        self.addAmenity(id, icon, name_en, name_en, status, type)
      })
      .catch(function(){
      // console.log('Logout cancelled by user');
      })
    }
    else{
      self.addAmenity(id, icon, name_en, name_es, status, type)
    }
  }



  changeListner(event) {
    var reader = new FileReader();
    
    var image = this.element.nativeElement.querySelector('.image');

    var fileToUpload = event.target.files[0];
    this.icon = fileToUpload;

    reader.onload = function(e) {
      console.log(image)
      var src = e.target['result'];
        image.src = src;
        console.log(image.src)
    };

    reader.readAsDataURL(event.target.files[0]);
  }
}
