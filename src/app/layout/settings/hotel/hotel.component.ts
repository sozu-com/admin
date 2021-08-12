import { Component, OnInit, TemplateRef, ElementRef } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { IProperty } from 'src/app/common/property';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Constant } from 'src/app/common/constants';
import { Amenities, ParkingLotSpaces } from 'src/app/models/hotel.model';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Hotel } from 'src/app/models/hotel.model';
declare let swal: any;

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css'],
  providers: [Constant, Hotel, Amenities, ParkingLotSpaces]
})
export class HotelComponent implements OnInit {

  public parameter: IProperty = {};
  public modalRef: BsModalRef;
  icon: any;

  constructor(private element: ElementRef, private constant: Constant, public hotel: Hotel,
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
    this.getHotelPossessionStatuses();
    this.getHotelType();
    this.getHotelAmenities();
    this.getParkingLotSpaces();
  }

  closeModal() {
    this.amenityModel = new Amenities;
    this.modalRef.hide();
  }

  public openPossessionStatusModal(template: TemplateRef<any>, index, id, name_en, name_es, status) {
    this.parameter.index = index;
    this.hotel.possession.id = id;
    this.hotel.possession.name_en = name_en;
    this.hotel.possession.name_es = name_es == null ? name_en : name_es;
    this.hotel.possession.status = status;
    this.modalRef = this.modalService.show(template);
  }

  public openBuildingTypeModal(template: TemplateRef<any>, index, id, name_en, name_es, status) {
    this.parameter.index = index;
    this.hotel.type.id = id;
    this.hotel.type.name_en = name_en;
    this.hotel.type.name_es = name_es;
    this.hotel.type.status = status;
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


  addHotelParkingLotSpaces(id, name_en, name_es, status, type) {
    if (type === 'edit') { this.modalRef.hide(); }
    this.parameter.url = 'addHotelParkingLotSpaces';
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
          this.hotel.parkingLotSpaces.name_en = '';
          this.hotel.parkingLotSpaces.name_es = '';
          if (this.parameter.index !== -1) {
            this.parameter.parkingLotSpaces[this.parameter.index] = success.data;
          } else {
            this.parameter.parkingLotSpaces.push(success.data);
          }
          this.parameter.index = -1;
          // this.getHotelPossessionStatuses();
        }, error => {
          this.spinner.hide();
        });
  }

  addHotelPossessionStatus(id, name_en, name_es, status, type) {
    if (type === 'edit') { this.modalRef.hide(); }
    this.parameter.url = 'addHotelPossessionStatus';
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
          this.hotel.possession.name_en = '';
          this.hotel.possession.name_es = '';
          if (this.parameter.index !== -1) {
            this.parameter.items[this.parameter.index] = success.data;
          } else {
            this.parameter.items.push(success.data);
          }
          this.parameter.index = -1;
          // this.getHotelPossessionStatuses();
        }, error => {
          this.spinner.hide();
        });
  }

  addHotelType(id, name_en, name_es, status, type) {
    if (type === 'edit') { this.modalRef.hide(); }
    this.parameter.url = 'addHotelType';

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
          this.hotel.type.name_en = '';
          this.hotel.type.name_es = '';
          swal(this.translate.instant('swal.success'), text, 'success');
          if (this.parameter.index !== -1) {
            this.parameter.hotelTypes[this.parameter.index] = success.data;
          } else {
            this.parameter.hotelTypes.push(success.data);
          }
          this.parameter.index = -1;
          //this.amenityModel = new Amenities;
          //this.getHotelType();
        }, error => {
          this.spinner.hide();
        });
  }

  addHotelAmenity(id, icon, name_en, name_es, status, type) {
    if (type === 'edit') { this.modalRef.hide(); }
    const iconNew = this.icon ? this.icon : this.amenityModel.icon;
    this.parameter.url = 'addHotelAmenity';

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
          // this.getHotelAmenities();
        }, error => {
          this.spinner.hide();
        });
  }

  getParkingLotSpaces() {
    this.spinner.show();
    this.parameter.url = 'getHotelParkingspace';
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

  getHotelPossessionStatuses() {
    this.spinner.show();
    this.parameter.url = 'getHotelPossessionStatuses';
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

  getHotelType() {
    this.spinner.show();
    this.parameter.url = 'getHotelType';
    const input = new FormData();
    this.admin.postDataApi(this.parameter.url, { hide_blocked: 0 })
      .subscribe(
        success => {
          this.spinner.hide();
          this.parameter.hotelTypes = success.data;
          this.parameter.hotelTypesCount = success.data.length;
        }, error => {
          this.spinner.hide();
        }
      );
  }

  getHotelAmenities() {
    this.spinner.show();
    this.parameter.url = 'getHotelAmenities';
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

  addHotelPossessionStatusPopup(index, id, name_en, name_es, status, type) {
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
        this.addHotelPossessionStatus(id, name_en, name_es, status, type);
      }
    });
  }

  addHotelTypePopup(index, id, name_en, name_es, status, type) {
    this.parameter.index = index;
    const text = status === 1 ? this.translate.instant('message.error.wantToUnblockhotelType') :
      this.translate.instant('message.error.wantToBlockhotelType');
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.addHotelType(id, name_en, name_es, status, type);
      }
    });
  }

  addHotelAmenityPopup(index, id, icon, name_en, name_es, status, type) {
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
        this.addHotelAmenity(id, icon, name_en, name_es, status, type);
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
          this.addHotelPossessionStatus(id, name_en, name_en, status, type);
        }
      });
    } else {
      self.addHotelPossessionStatus(id, name_en, name_es, status, type);
    }
  }


  checkIfTypeSpanishNameEntered(formdata: NgForm, id, name_en, name_es, status, type) {
    const self = this;
    formdata.reset();
    if (name_es === '') {
      swal({
        text: this.translate.instant('message.error.saveEnghotelType'),
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: this.constant.confirmButtonColor,
        cancelButtonColor: this.constant.cancelButtonColor,
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          this.addHotelType(id, name_en, name_en, status, type);
        }
      });
    } else {
      self.addHotelType(id, name_en, name_es, status, type);
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
          this.addHotelAmenity(id, icon, name_en, name_en, status, type);
        }
      });
    } else {
      self.addHotelAmenity(id, icon, name_en, name_es, status, type);
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
          this.addHotelParkingLotSpaces(id, name_en, name_en, status, type);
        }
      });
    } else {
      self.addHotelParkingLotSpaces(id, name_en, name_es, status, type);
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
        text = this.translate.instant('message.error.wantToDeletehotelType')
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
            this.deletehotelType(data, index);
            break;
          case 3:
            this.deletehotelAmenities(data, index);
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

  deletehotelType = (item: any, index: number): void => {
    this.spinner.show();
    this.admin.postDataApi('HotelType', { id: item.id }).subscribe((response) => {
      this.spinner.hide();
      if (response.success == '0') {
        this.toastr.error(this.translate.instant('message.error.youCannotDeleteThishotelType'), this.translate.instant('swal.error'));
      } else {
        this.toastr.success(this.translate.instant('message.success.deletedSuccessfully'), this.translate.instant('swal.success'));
        this.parameter.hotelTypes.splice(index, 1);
      }
    }, (error) => {
      this.spinner.hide();
      this.toastr.error(error.error.message, this.translate.instant('swal.error'));
    });
  }

  deletehotelAmenities = (item: any, index: number): void => {
    this.spinner.show();
    this.admin.postDataApi('DeletehotelAmenities ', { id: item.id }).subscribe((response) => {
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
