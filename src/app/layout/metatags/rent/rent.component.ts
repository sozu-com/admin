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
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css'],
  providers: [Constant, Property]
})
export class RentComponent implements OnInit {

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
    this.getConfigurations();
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
    this.spinner.show();
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.spinner.hide();
          const text = id ?
            this.translate.instant('message.success.updatedSuccessfully') :
            this.translate.instant('message.success.addedSuccessfully');
          // this.getConfigurations();
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

  getConfigurations() {
    this.spinner.show();
    this.parameter.url = 'getConfigurations';
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

}

