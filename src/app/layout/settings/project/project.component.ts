import { Component, OnInit, TemplateRef, ElementRef } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';
import { IProperty } from 'src/app/common/property';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Constant } from 'src/app/common/constants';
import { Project, Amenities, ParkingLotSpaces } from 'src/app/models/project.model';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
declare let swal: any;

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  providers: [Constant, Project, Amenities, ParkingLotSpaces]
})

export class ProjectComponent implements OnInit {

  public parameter: IProperty = {};
  public modalRef: BsModalRef;
  icon: any;

  constructor(private element: ElementRef, private constant: Constant, public project: Project,
    private modalService: BsModalService, public admin: AdminService,
    public amenityModel: Amenities, private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private parkingLotSpacesModel: ParkingLotSpaces,
    private toastr: ToastrService,
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
    this.getParkingLotSpaces();
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

  public openParkingLotSpaces(template: TemplateRef<any>, index, id, name_en, name_es, status) {
    this.parameter.index = index;
    this.parkingLotSpacesModel.id = id;
    this.parkingLotSpacesModel.name_en = name_en;
    this.parkingLotSpacesModel.name_es = name_es;
    this.parkingLotSpacesModel.status = status;
    this.modalRef = this.modalService.show(template);
  }


  addParkingLotSpaces(id, name_en, name_es, status, type) {
    if (type === 'edit') { this.modalRef.hide(); }
    this.parameter.url = 'addParkingLotSpaces';
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
          this.project.parkingLotSpaces.name_en = '';
          this.project.parkingLotSpaces.name_es = '';
          if (this.parameter.index !== -1) {
            this.parameter.parkingLotSpaces[this.parameter.index] = success.data;
          } else {
            this.parameter.parkingLotSpaces.push(success.data);
          }
          this.parameter.index = -1;
          // this.getPossessionStatuses();
        }, error => {
          this.spinner.hide();
        });
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
            this.translate.instant('message.success.updatedSuccessfully') :
            this.translate.instant('message.success.addedSuccessfully');
          swal(this.translate.instant('swal.success'), text, 'success');
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
            this.translate.instant('message.success.updatedSuccessfully') :
            this.translate.instant('message.success.addedSuccessfully');
          this.project.type.name_en = '';
          this.project.type.name_es = '';
          swal(this.translate.instant('swal.success'), text, 'success');
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
          const text = id ?
            this.translate.instant('message.success.updatedSuccessfully') :
            this.translate.instant('message.success.addedSuccessfully');
          swal(this.translate.instant('swal.success'), text, 'success');
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

  getParkingLotSpaces() {
    this.spinner.show();
    this.parameter.url = 'getParkingspace';
    const input = new FormData();
    this.admin.postDataApi(this.parameter.url, { hide_blocked: 0 })
      .subscribe(
        success => {
          this.spinner.hide();
          this.parameter.parkingLotSpaces = success.data;
          this.parameter.parkingLotSpacesTotal = success.data.length;
        }, error => {
          this.spinner.hide();
        }
      );
  }

  getPossessionStatuses() {
    this.spinner.show();
    this.parameter.url = 'getPossessionStatuses';
    const input = new FormData();
    this.admin.postDataApi(this.parameter.url, { hide_blocked: 0 })
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
    this.admin.postDataApi(this.parameter.url, { hide_blocked: 0 })
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

  addPossessionStatusPopup(index, id, name_en, name_es, status, type) {
    this.parameter.index = index;
    const text = status === 1 ? this.translate.instant('message.error.wantToUnblockPossessionStatus') :
      this.translate.instant('message.error.wantToBlockPossessionStatus');
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' + this.parameter.text,
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
    const text = status === 1 ? this.translate.instant('message.error.wantToUnblockProjectType') :
      this.translate.instant('message.error.wantToBlockProjectType');
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' + this.parameter.text,
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

  checkIfPossessionSpanishNameEntered(formdata: NgForm, id, name_en, name_es, status, type) {
    const self = this;
    formdata.reset();
    if (name_es === '') {
      swal({
        text: this.translate.instant('message.error.saveEngParkingLotSpaces'),
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
        text: this.translate.instant('message.error.saveEngProjectType'),
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

  checkIfParkingLotSpacesSpanishNameEntered(formdata: NgForm, id, name_en, name_es, status, type) {
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
          this.addParkingLotSpaces(id, name_en, name_en, status, type);
        }
      });
    } else {
      self.addParkingLotSpaces(id, name_en, name_es, status, type);
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

  openDeleteConfirmationPopup = (data: any, index: number, deleteIndex: number): void => {
    let text = '';
    switch (deleteIndex) {
      case 1:
        text = this.translate.instant('message.error.wantToDeletePossessionStatus1')
        break;
      case 2:
        text = this.translate.instant('message.error.wantToDeleteProjectType')
        break;
      case 3:
        text = this.translate.instant('message.error.wantToDeleteAmenities')
        break;
    }
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' + text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        switch (deleteIndex) {
          case 1:
            this.deletePossessionStatus(data, index);
            break;
          case 2:
            this.deleteProjectType(data, index);
            break;
          case 3:
            this.deleteProjectAmenities(data, index);
            break;
        }
      }
    });
  }

  deletePossessionStatus = (item: any, index: number): void => {
    this.spinner.show();
    this.admin.postDataApi('deletePossessionStatus', { id: item.id }).subscribe((response) => {
      this.spinner.hide();
      if (response.success == '0') {
        this.toastr.error(this.translate.instant('message.error.youCannotDeleteThisPossessionStatus'), this.translate.instant('swal.error'));
      } else {
        this.toastr.success(this.translate.instant('message.success.deletedSuccessfully'), this.translate.instant('swal.success'));
        this.parameter.items.splice(index, 1);
      }
    }, (error) => {
      this.spinner.hide();
      this.toastr.error(error.error.message, this.translate.instant('swal.error'));
    });
  }

  deleteProjectType = (item: any, index: number): void => {
    this.spinner.show();
    this.admin.postDataApi('ProjectType', { id: item.id }).subscribe((response) => {
      this.spinner.hide();
      if (response.success == '0') {
        this.toastr.error(this.translate.instant('message.error.youCannotDeleteThisProjectType'), this.translate.instant('swal.error'));
      } else {
        this.toastr.success(this.translate.instant('message.success.deletedSuccessfully'), this.translate.instant('swal.success'));
        this.parameter.projectTypes.splice(index, 1);
      }
    }, (error) => {
      this.spinner.hide();
      this.toastr.error(error.error.message, this.translate.instant('swal.error'));
    });
  }

  deleteProjectAmenities = (item: any, index: number): void => {
    this.spinner.show();
    this.admin.postDataApi('DeleteProjectAmenities ', { id: item.id }).subscribe((response) => {
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
