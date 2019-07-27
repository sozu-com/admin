import { Component, OnInit, TemplateRef, ElementRef } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';
import { IProperty } from '../../../common/property';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Constant } from './../../../common/constants';
import { Project, Amenities } from './../../../models/project.model';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
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
    private modalService: BsModalService, public admin: AdminService,
    public amenityModel: Amenities, private spinner: NgxSpinnerService
  ) {
    this.parameter.index = -1;
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

  public openPossessionStatusModal(template: TemplateRef<any>, index, id, name_en, name_es, status) {
    this.parameter.index = index;
    this.project.possession.id = id;
    this.project.possession.name_en = name_en;
    this.project.possession.name_es = name_es == null ? name_en : name_es;
    this.project.possession.status = status;
    this.modalRef = this.modalService.show(template);
  }

  public openBuildingTypeModal(template: TemplateRef<any>, index, id, name_en, name_es, status) {
    this.parameter.index = index;
    this.project.type.id = id;
    this.project.type.name_en = name_en;
    this.project.type.name_es = name_es;
    this.project.type.status = status;
    this.modalRef = this.modalService.show(template);
  }

  public openAmenityModal(template: TemplateRef<any>, index, id, icon, name_en, name_es, status) {
    this.parameter.index = index;
    this.amenityModel.id = id;
    this.amenityModel.icon = icon;
    this.amenityModel.name_en = name_en;
    this.amenityModel.name_es = name_es;
    this.amenityModel.status = status;
    this.modalRef = this.modalService.show(template);
  }


  addPossessionStatus(id, name_en, name_es, status, type) {
    if (type === 'edit') { this.modalRef.hide(); }
    this.parameter.url = 'addPossessionStatus';
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
            this.constant.successMsg.PROJECT_POSSESSION_UPDATED_SUCCESSFULLY :
            this.constant.successMsg.PROJECT_POSSESSION_ADDED_SUCCESSFULLY;
          swal('Success', text, 'success');
          this.project.possession.name_en = '';
          this.project.possession.name_es = '';
          if (this.parameter.index !== -1) {
            this.parameter.items[this.parameter.index] = success.data;
          } else {
            this.parameter.items.push(success.data);
          }
          this.parameter.index = -1;
          // this.getPossessionStatuses();
        }, error => {
          this.spinner.hide();
        });
  }

  addBuildingType(id, name_en, name_es, status, type) {
    if (type === 'edit') { this.modalRef.hide(); }
    this.parameter.url = 'addBuildingType';

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
            this.constant.successMsg.PROJECT_TYPE_UPDATED_SUCCESSFULLY :
            this.constant.successMsg.PROJECT_TYPE_ADDED_SUCCESSFULLY;
          this.project.type.name_en = '';
          this.project.type.name_es = '';
          swal('Success', text, 'success');
          if (this.parameter.index !== -1) {
            this.parameter.projectTypes[this.parameter.index] = success.data;
          } else {
            this.parameter.projectTypes.push(success.data);
          }
          this.parameter.index = -1;
          // this.getBuildingTypes();
        }, error => {
          this.spinner.hide();
        });
  }


  addAmenity(id, icon, name_en, name_es, status, type) {
    if (type === 'edit') { this.modalRef.hide(); }
    const iconNew = this.icon ? this.icon : this.amenityModel.icon;
    this.parameter.url = 'addAmenity';

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
          const text = id ? this.constant.successMsg.AMENITY_UPDATED_SUCCESSFULLY : this.constant.successMsg.AMENITY_ADDED_SUCCESSFULLY;
          swal('Success', text, 'success');
          if (this.parameter.index !== -1) {
            this.parameter.amenities[this.parameter.index] = success.data;
          } else {
            this.parameter.amenities.push(success.data);
          }
          this.parameter.index = -1;
          this.amenityModel = new Amenities;
          // this.getAmenities();
        }, error => {
          this.spinner.hide();
        });
  }


  getPossessionStatuses() {
    this.spinner.show();
    this.parameter.url = 'getPossessionStatuses';
    const input = new FormData();
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.spinner.hide();
          this.parameter.items = success.data;
          this.parameter.total = success.data.length;
        }, error => {
          this.spinner.hide();
        }
      );
  }


  getBuildingTypes() {
    this.spinner.show();
    this.parameter.url = 'getBuildingTypes';
    const input = new FormData();
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.spinner.hide();
          this.parameter.projectTypes = success.data;
          this.parameter.projectTypesCount = success.data.length;
        }, error => {
          this.spinner.hide();
        }
      );
  }

  getAmenities() {
    this.spinner.show();
    this.parameter.url = 'getAmenities';
    const input = new FormData();
    this.admin.postDataApi(this.parameter.url, input)
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

  addPossessionStatusPopup(index, id, name_en, name_es, status, type) {
    this.parameter.index = index;
    const text = status === 1 ? this.constant.title.UNBLOCK_PROJECT_POSSESSION : this.constant.title.BLOCK_PROJECT_POSSESSION;
    swal({
      // title: this.constant.title.ARE_YOU_SURE,
      // text: status === 1 ? this.constant.title.UNBLOCK_PROJECT_POSSESSION : this.constant.title.BLOCK_PROJECT_POSSESSION,
      html: this.constant.title.ARE_YOU_SURE + '<br>' + text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.addPossessionStatus(id, name_en, name_es, status, type);
      }
    });
  }

  addBuildingTypePopup(index, id, name_en, name_es, status, type) {
    this.parameter.index = index;
    const text = status === 1 ? this.constant.title.UNBLOCK_PROJECT_TYPE : this.constant.title.BLOCK_PROJECT_TYPE;
    swal({
      // title: this.constant.title.ARE_YOU_SURE,
      // text: status === 1 ? this.constant.title.UNBLOCK_PROJECT_TYPE : this.constant.title.BLOCK_PROJECT_TYPE,
      html: this.constant.title.ARE_YOU_SURE + '<br>' + text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.addBuildingType(id, name_en, name_es, status, type);
      }
    });
  }

  addAmenityPopup(index, id, icon, name_en, name_es, status, type) {
    this.parameter.index = index;
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

  checkIfPossessionSpanishNameEntered(formdata: NgForm, id, name_en, name_es, status, type) {
    const self = this;
    formdata.reset();
    if (name_es === '') {
      swal({
        text: this.constant.errorMsg.SAVE_ENGLISH_PROJECT_POSSESION,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: this.constant.confirmButtonColor,
        cancelButtonColor: this.constant.cancelButtonColor,
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          this.addPossessionStatus(id, name_en, name_en, status, type);
        }
      });
    } else {
      self.addPossessionStatus(id, name_en, name_es, status, type);
    }
  }


  checkIfTypeSpanishNameEntered(formdata: NgForm, id, name_en, name_es, status, type) {
    const self = this;
    formdata.reset();
    if (name_es === '') {
      swal({
        text: this.constant.errorMsg.SAVE_ENGLISH_PROJECT_TYPE,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: this.constant.confirmButtonColor,
        cancelButtonColor: this.constant.cancelButtonColor,
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          this.addBuildingType(id, name_en, name_en, status, type);
        }
      });
    } else {
      self.addBuildingType(id, name_en, name_es, status, type);
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
}
