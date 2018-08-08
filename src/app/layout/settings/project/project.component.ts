import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';
// import { SweetAlertService } from 'ngx-sweetalert2';
import { IProperty } from '../../../common/property';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Constant } from './../../../common/constants';
import { Project, Amenities } from './../../../models/project.model';
declare let swal: any;

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  providers: [Constant, Project, Amenities]
})

export class ProjectComponent implements OnInit {

  public parameter: IProperty = {};
  public modalRef: BsModalRef;
  icon: any;

  constructor(private element: ElementRef, private constant: Constant, public project: Project,
    private modalService: BsModalService, private admin: AdminService, private router: Router,
    public amenityModel: Amenities
  ) {
    this.parameter.countryCount = 0;
    this.parameter.stateCount = 0;
    this.parameter.cityCount = 0;
  }

  ngOnInit() {
    this.getPossessionStatuses();
    this.getBuildingTypes();
    this.getAmenities();
  }

  closeModal() {
    this.amenityModel = new Amenities;
    this.modalRef.hide();
  }

  public openPossessionStatusModal(template: TemplateRef<any>, id, name_en, name_es, status) {
    this.project.possession.id = id;
    this.project.possession.name_en = name_en;
    this.project.possession.name_es = name_es == null ? name_en : name_es;
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
    // this.project.amenities.id = id;
    // this.project.amenities.icon = icon;
    // this.project.amenities.name_en = name_en;
    // this.project.amenities.name_es = name_es;
    // this.project.amenities.status = status;
    this.amenityModel.id = id;
    this.amenityModel.icon = icon;
    this.amenityModel.name_en = name_en;
    this.amenityModel.name_es = name_es;
    this.amenityModel.status = status;
    this.modalRef = this.modalService.show(template);
  }


  addPossessionStatus(id, name_en, name_es, status, type) {

    if (type !== 'add') {this.modalRef.hide(); }

    this.parameter.loading = true;
    this.parameter.url = 'addPossessionStatus';

    const input = new FormData();
    input.append('name_en', name_en);
    input.append('name_es', name_es);
    input.append('status', status);

    if (id) {input.append('id', id); }

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('addPossessionStatus', success);
          this.parameter.loading = false;
          const text = id ?
          this.constant.successMsg.PROJECT_POSSESSION_UPDATED_SUCCESSFULLY :
          this.constant.successMsg.PROJECT_POSSESSION_ADDED_SUCCESSFULLY;
          swal('Success', text, 'success');
          this.project.possession.name_en = '';
          this.project.possession.name_es = '';
          this.getPossessionStatuses();
        },
        error => {
          this.parameter.loading = false;
          swal('Error', error.message, 'error');
          this.router.navigate(['']);
        });
  }

  addBuildingType(id, name_en, name_es, status, type) {
    if (type !== 'add') {this.modalRef.hide(); }

    this.parameter.loading = true;
    this.parameter.url = 'addBuildingType';

    const input = new FormData();
    input.append('name_en', name_en);
    input.append('name_es', name_es);
    input.append('status', status);

    if (id) {input.append('id', id); }

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('addBuildingType', success);
          this.parameter.loading = false;
          const text = id ?
            this.constant.successMsg.PROJECT_TYPE_UPDATED_SUCCESSFULLY :
            this.constant.successMsg.PROJECT_TYPE_ADDED_SUCCESSFULLY;
            this.project.type.name_en = '';
            this.project.type.name_es = '';
          swal('Success', text, 'success');
          this.getBuildingTypes();
        },
        error => {
          this.parameter.loading = false;
          swal('Error', error.message, 'error');
          this.router.navigate(['']);
        });
  }


  addAmenity(id, icon, name_en, name_es, status, type) {

    if (type !== 'add') {this.modalRef.hide(); }

    // const iconNew = this.icon ? this.icon : this.project.amenities.icon;
    const iconNew = this.icon ? this.icon : this.amenityModel.icon;

    this.parameter.loading = true;
    this.parameter.url = 'addAmenity';

    const input = new FormData();

    input.append('name_en', name_en);
    input.append('name_es', name_es);
    input.append('status', status);

    if (this.icon) {input.append('icon', iconNew); }

    if (id) {input.append('id', id); }

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('addAmenity', success);
          this.parameter.loading = false;
          const text = id ? this.constant.successMsg.AMENITY_UPDATED_SUCCESSFULLY : this.constant.successMsg.AMENITY_ADDED_SUCCESSFULLY;
          swal('Success', text, 'success');
          // this.project.amenities.name_en = '';
          // this.project.amenities.name_es = '';
          // this.project.amenities.icon = '';
          this.amenityModel = new Amenities;
          this.getAmenities();
        },
        error => {
          this.parameter.loading = false;
          swal('Error', error.message, 'error');
          this.router.navigate(['']);
        });
  }


  getPossessionStatuses() {
    this.parameter.loading = true;
    this.parameter.url = 'getPossessionStatuses';
    const input = new FormData();
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('getPossessionStatuses', success);
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
            swal('Error', error.message, 'error');
          }
        });
  }


  getBuildingTypes() {
    this.parameter.loading = true;
    this.parameter.url = 'getBuildingTypes';
    const input = new FormData();
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('getBuildingTypes', success);
          this.parameter.loading = false;
          this.parameter.projectTypes = success.data;
          this.parameter.projectTypesCount = success.data.length;
        },
        error => {
          console.log(error);
          this.parameter.loading = false;
          if (error.statusCode === 401) {
            this.router.navigate(['']);
          }else {
            swal('Error', error.message, 'error');
          }
        });
  }

  getAmenities() {
    this.parameter.loading = true;
    this.parameter.url = 'getAmenities';
    const input = new FormData();
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('getAmenities', success);
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
            swal('Error', error.message, 'error');
          }
        });
  }

  addPossessionStatusPopup(id, name_en, name_es, status, type) {
    const text = status === 1 ? this.constant.title.UNBLOCK_PROJECT_POSSESSION : this.constant.title.BLOCK_PROJECT_POSSESSION;
    swal({
      // title: this.constant.title.ARE_YOU_SURE,
      // text: status === 1 ? this.constant.title.UNBLOCK_PROJECT_POSSESSION : this.constant.title.BLOCK_PROJECT_POSSESSION,
      html: this.constant.title.ARE_YOU_SURE + '<br>' + text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.addPossessionStatus(id, name_en, name_es, status, type);
      }
    });
  }

  addBuildingTypePopup(id, name_en, name_es, status, type) {
    const text = status === 1 ? this.constant.title.UNBLOCK_PROJECT_TYPE : this.constant.title.BLOCK_PROJECT_TYPE;
    swal({
      // title: this.constant.title.ARE_YOU_SURE,
      // text: status === 1 ? this.constant.title.UNBLOCK_PROJECT_TYPE : this.constant.title.BLOCK_PROJECT_TYPE,
      html: this.constant.title.ARE_YOU_SURE + '<br>' + text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.addBuildingType(id, name_en, name_es, status, type);
      }
    });
  }

  addAmenityPopup(id, icon, name_en, name_es, status, type) {
    const text = status === 1 ? this.constant.title.UNBLOCK_AMENITY : this.constant.title.BLOCK_AMENITY;
    swal({
      // title: this.constant.title.ARE_YOU_SURE,
      // text: status === 1 ? this.constant.title.UNBLOCK_AMENITY : this.constant.title.BLOCK_AMENITY,
      html: this.constant.title.ARE_YOU_SURE + '<br>' + text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.addAmenity(id, icon, name_en, name_es, status, type);
      }
    });
  }

  checkIfPossessionSpanishNameEntered(id, name_en, name_es, status, type) {
    const self = this;
    if (name_es === '') {
      swal({
        text: this.constant.errorMsg.SAVE_ENGLISH_PROJECT_POSSESION,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          this.addPossessionStatus(id, name_en, name_en, status, type);
        }
      });
    }else {
      self.addPossessionStatus(id, name_en, name_es, status, type);
    }
  }


  checkIfTypeSpanishNameEntered(id, name_en, name_es, status, type) {
    const self = this;
    if (name_es === '') {
      swal({
        text: this.constant.errorMsg.SAVE_ENGLISH_PROJECT_TYPE,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          this.addBuildingType(id, name_en, name_en, status, type);
        }
      });
    }else {
      self.addBuildingType(id, name_en, name_es, status, type);
    }
  }


  checkIfAmenitySpanishNameEntered(id, icon, name_en, name_es, status, type) {
    const self = this;
    if (name_es === '') {
      swal({
        text: this.constant.errorMsg.SAVE_ENGLISH_AMENITY,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          this.addAmenity(id, icon, name_en, name_en, status, type);
        }
      });
    }else {
      self.addAmenity(id, icon, name_en, name_es, status, type);
    }
  }



  changeListner(event) {
    const reader = new FileReader();
    const image = this.element.nativeElement.querySelector('.image');
    const fileToUpload = event.target.files[0];
    this.icon = fileToUpload;

    reader.onload = function(e) {
      const src = e.target['result'];
        image.src = src;
    };

    reader.readAsDataURL(event.target.files[0]);
  }
}
