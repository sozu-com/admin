import { Component, OnInit, TemplateRef, ElementRef } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { IProperty } from '../../../common/property';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Constant } from './../../../common/constants';
import { Document } from './../../../models/document.model';
import { NgForm } from '@angular/forms';
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
    public model: Document
  ) {
  }

  ngOnInit() {
    this.getDocumentOptions();
  }

  closeModal() {
    // this.amenityModel = new Amenities;
    this.modalRef.hide();
  }

  // public openPossessionStatusModal(template: TemplateRef<any>, id, name_en, name_es, status) {
  //   this.project.possession.id = id;
  //   this.project.possession.name_en = name_en;
  //   this.project.possession.name_es = name_es == null ? name_en : name_es;
  //   this.project.possession.status = status;
  //   this.modalRef = this.modalService.show(template);
  // }


  addDocumentOptions(id, name_en, name_es, status, type) {

    if (type !== 'add') {this.modalRef.hide(); }

    // this.parameter.loading = true;
    this.parameter.url = 'addDocumentOptions';

    const input = new FormData();
    input.append('name_en', name_en);
    input.append('name_es', name_es);
    input.append('status', status);

    if (id) {input.append('id', id); }

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.model = new Document();
          // console.log('addDocumentOptions', success);
          const text = id ?
          this.constant.successMsg.DOCUMENT_NAME_UPDATED_SUCCESSFULLY :
          this.constant.successMsg.DOCUMENT_NAME_ADDED_SUCCESSFULLY;
          swal('Success', text, 'success');
          this.parameter.items.push(success.data);
        }
      );
  }


  getDocumentOptions() {
    this.parameter.url = 'getDocumentOptions';
    this.parameter.loading = true;
    this.admin.postDataApi(this.parameter.url, {})
      .subscribe(
        success => {
          this.parameter.loading = false;
          // console.log('getDocumentOptions', success);
          this.parameter.items = success.data;
          this.parameter.total = success.data.length;
        }, error => {
          this.parameter.loading = false;
        }
      );
  }



  addPossessionStatusPopup(id, name_en, name_es, status, type) {
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
        this.addDocumentOptions(id, name_en, name_es, status, type);
      }
    });
  }


  checkIfSpanishNameEntered(formdata: NgForm, id, name_en, name_es, status, type) {
    // console.log('id, name_en, name_es, status, type', id, name_en, name_es, status, type);
    formdata.reset();
    const self = this;
    if (name_es === undefined) {
      swal({
        text: this.constant.errorMsg.SAVE_ENGLISH_DOCUMENT_NAME,
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
    }else {
      self.addDocumentOptions(id, name_en, name_es, status, type);
    }
  }
}
