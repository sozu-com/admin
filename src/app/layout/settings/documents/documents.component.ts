import { Component, OnInit, TemplateRef } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { IProperty } from 'src/app/common/property';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Constant } from 'src/app/common/constants';
import { Document } from 'src/app/models/document.model';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
declare let swal: any;

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
  providers: [Constant, Document]
})
export class DocumentsComponent implements OnInit {

  public parameter: IProperty = {};
  public modalRef: BsModalRef;
  icon: any;

  constructor(
    public constant: Constant,
    private modalService: BsModalService,
    public admin: AdminService,
    public model: Document, private spinner: NgxSpinnerService,
    private translate: TranslateService,private toastr: ToastrService,
  ) {
  }

  ngOnInit() {
    this.getDocumentOptions();
  }

  closeModal() {
    this.modalRef.hide();
  }

  public openModal(template: TemplateRef<any>, id: string, name_en: string, name_es: string, status: number, index: number) {
    this.model.id = id;
    this.model.name_en = name_en;
    this.model.name_es = name_es;
    this.model.status = status;
    this.parameter.index = index;
    this.modalRef = this.modalService.show(template);
  }


  addDocumentOptions(id: string, name_en: string, name_es: string, status: number, type: string) {

    if (type !== 'add') { this.modalRef.hide(); }

    // this.spinner.show();
    const input = new FormData();
    input.append('name_en', name_en);
    input.append('name_es', name_es);
    input.append('status', status.toString());

    if (id) { input.append('id', id); }

    this.admin.postDataApi('addDocumentOptions', input)
      .subscribe(
        success => {
          this.model = new Document();
          const text = id ?
          this.translate.instant('message.success.updatedSuccessfully') :
          this.translate.instant('message.success.addedSuccessfully');
          swal(this.translate.instant('swal.success'), text, 'success');
          if (id === '') {
            this.parameter.items.push(success.data);
          } else {
            this.parameter.items[this.parameter.index] = success.data;
          }
        }
      );
  }


  getDocumentOptions() {
    this.parameter.url = 'getDocumentOptions';
    this.spinner.show();
    this.admin.postDataApi(this.parameter.url, {})
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



  // addPossessionStatusPopup(id: string, name_en: string, name_es: string, status: number, type: string) {
  //   const text = status === 1 ? this.constant.title.UNBLOCK_PROJECT_POSSESSION : this.constant.title.BLOCK_PROJECT_POSSESSION;
  //   swal({
  //     // title: this.constant.title.ARE_YOU_SURE,
  //     // text: status === 1 ? this.constant.title.UNBLOCK_PROJECT_POSSESSION : this.constant.title.BLOCK_PROJECT_POSSESSION,
  //     html: this.translate.instant('message.error.areYouSure') + '<br>' + text,
  //     type: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: this.constant.confirmButtonColor,
  //     cancelButtonColor: this.constant.cancelButtonColor,
  //     confirmButtonText: 'Yes'
  //   }).then((result) => {
  //     if (result.value) {
  //       this.addDocumentOptions(id, name_en, name_es, status, type);
  //     }
  //   });
  // }


  checkIfSpanishNameEntered(formdata: NgForm, id: string, name_en: string, name_es: string, status: number, type: string) {
    formdata.reset();
    const self = this;
    if (name_es === undefined) {
      swal({
        text: this.translate.instant('message.error.saveEngDocumentName'),
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: this.constant.confirmButtonColor,
        cancelButtonColor: this.constant.cancelButtonColor,
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          this.addDocumentOptions(id, name_en, name_en, status, type);
        }
      });
    } else {
      self.addDocumentOptions(id, name_en, name_es, status, type);
    }
  }

  blockUnblock(id: string, name_en: string, name_es: string, status: number, index: number) {
    this.parameter.index = index;
    switch (status) {
      case 0:
        this.parameter.text = this.translate.instant('message.error.wantToBlockDocument');
        this.parameter.successText = this.translate.instant('message.success.blockedSuccessfully');
        break;
      case 1:
        this.parameter.text = this.translate.instant('message.error.wantToUnblockDocument');
        this.parameter.successText = this.translate.instant('message.success.unblockedSuccessfully');
        break;
    }

    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.addDocumentOptions(id, name_en, name_es, status, 'add');
      }
    });
  }
  deletePopup(item: any, index: number) {
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' +
        this.translate.instant('message.error.wantToDeleteDocument'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.deleteCollection(item, index);
      }
    });
  }

  deleteCollection(item: any, index: number) {
    this.admin.postDataApi('deleteDocument', { id: item.id }).subscribe(r => {
      this.toastr.success(this.translate.instant('message.success.deletedSuccessfully'), this.translate.instant('swal.success'));
      this.parameter.items.splice(index, 1);
    },
      error => {
        this.toastr.error(error.error.message, this.translate.instant('swal.error'));
      });
  }
}
