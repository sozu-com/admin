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
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css'],
  providers: [Constant, Property]
})
export class NewProjectComponent implements OnInit {

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

  public openPropertyConfigModal(template: TemplateRef<any>, id, meta_title_en, meta_title_es, meta_description_en, meta_description_es) {
    // this.parameter.index = index;
    this.property.pro_tag.id = id;
    this.property.pro_tag.meta_title_en = meta_title_en;
    this.property.pro_tag.meta_title_es = meta_title_es == null ? meta_title_en : meta_title_es;
    this.property.pro_tag.meta_description_en = meta_description_en;
    this.property.pro_tag.meta_description_es = meta_description_es;
    //this.property.pro_tag.block_status = status;
    this.modalRef = this.modalService.show(template);
  }

  addPropertyConfiguration(id, meta_title_en, meta_title_es, meta_description_en, meta_description_es) {

    this.parameter.url = 'addProjectMetatag';
    if (this.property.pro_tag.id) {
      const input = new FormData();
      input.append('id', this.property.pro_tag.id);
      input.append('meta_title_en', meta_title_en);
      input.append('meta_title_es', meta_title_es);
      input.append('meta_description_en', meta_description_en);
      input.append('meta_description_es', meta_description_es);
      this.spinner.show();
      this.admin.postDataApi(this.parameter.url, input)
        .subscribe(
          success => {
            this.spinner.hide();
            this.toastr.success(this.translate.instant('message.success.updatedSuccessfully'), this.translate.instant('swal.success'));
            this.modalRef.hide()
            this.getConfigurations();
          }, error => {
            this.spinner.hide();
          }
        );
    } else {
      const input = new FormData();
      input.append('meta_title_en', meta_title_en);
      input.append('meta_title_es', meta_title_es);
      input.append('meta_description_en', meta_description_en);
      input.append('meta_description_es', meta_description_es);
      input.append('block_status', '0');
      this.spinner.show();
      this.admin.postDataApi(this.parameter.url, input)
        .subscribe(
          success => {
            this.spinner.hide();
            this.toastr.success(this.translate.instant('message.success.addedSuccessfully'), this.translate.instant('swal.success'));
            this.property.pro_tag.id = '';
            this.property.pro_tag.meta_title_en = '';
            this.property.pro_tag.meta_title_es = '';
            this.property.pro_tag.meta_description_en = '';
            this.property.pro_tag.meta_description_es = '';
            if (this.parameter.index !== -1) {
              this.parameter.pros[this.parameter.index] = success.data;
            } else {
              this.parameter.pros.push(success.data);
            }
            this.parameter.index = -1;
          }, error => {
            this.spinner.hide();
          }
        );
    }

  }

  getConfigurations() {
    this.spinner.show();
    this.parameter.url = 'getProjectMetatag';
    const input = new FormData();
    this.admin.postDataApi(this.parameter.url, { hide_blocked: 0 })
      .subscribe(
        success => {
          this.spinner.hide();
          this.parameter.pros = success.data;
          this.parameter.total = success.data.length;
        },
        error => {
          this.spinner.hide();
        }
      );
  }




  addPropertyConfigurationPopup(index, id, status) {
    this.parameter.index = index;
    const self = this;
    const text = status === 1 ? this.translate.instant('message.error.wantToBlockmetatag') :
      this.translate.instant('message.error.wantToUnblockunmeta');
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' + text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.addPropertyblockConfiguration(index, id, status);
      }
    });
  }
  addPropertyblockConfiguration(index, id, status) {
    this.parameter.url = 'blockProjectMetatag';
    this.admin.postDataApi(this.parameter.url, { id: id })
      .subscribe(
        success => {
          this.spinner.hide();
          if (status === 1) {
            this.toastr.success(this.translate.instant('message.success.blockSuccessfully'), this.translate.instant('swal.success'));
          } else {
            this.toastr.success(this.translate.instant('message.success.unblockSuccessfully'), this.translate.instant('swal.success'));
          }
          this.getConfigurations();
        }, error => {
          this.spinner.hide();
        }
      );
  }

  checkIfConfigSpanishNameEntered(formdata: NgForm, id, meta_title_en, meta_title_es, meta_description_en, meta_description_es, type, status) {
    const self = this;
    formdata.reset();
    if (meta_title_es === '') {
      swal({
        text: this.translate.instant('message.error.saveEngPropertyConfig'),
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: this.constant.confirmButtonColor,
        cancelButtonColor: this.constant.cancelButtonColor,
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          this.addPropertyConfiguration(id, meta_title_en, meta_title_es, meta_description_en, meta_description_es);
        }
      });
    } else {
      self.addPropertyConfiguration(id, meta_title_en, meta_title_es, meta_description_en, meta_description_es);
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
        (isDeletePropertyConfiguration ? this.translate.instant('message.error.wantToDeletemeta')
          : this.translate.instant('message.error.wantToDeletemeta')),
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
    this.admin.postDataApi('deleteProjectMetatag', { id: item.id }).subscribe((response) => {
      this.spinner.hide();
      if (response.success == '0') {
        this.toastr.error(this.translate.instant('message.error.youCannotDeleteThisPropertyConfiguration'), this.translate.instant('swal.error'));
      } else {
        this.toastr.success(this.translate.instant('message.success.deletedSuccessfully'), this.translate.instant('swal.success'));
        this.parameter.pros.splice(index, 1);
      }
    }, (error) => {
      this.spinner.hide();
      this.toastr.error(((error || {}).error || {}).message, this.translate.instant('swal.error'));
    });
  }


}


