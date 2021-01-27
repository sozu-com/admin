import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Users } from 'src/app/models/users.model';
import { MapsAPILoader } from '@agm/core';
import { FileUpload } from 'src/app/common/fileUpload';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProperty } from 'src/app/common/property';
import { Constant } from 'src/app/common/constants';
import { CommonService } from 'src/app/services/common.service';
import { AdminService } from 'src/app/services/admin.service';
import { TranslateService } from '@ngx-translate/core';
import { LegalRepresentative, Banks } from 'src/app/models/legalEntity.model';
import { IMarritalStatus } from 'src/app/common/marrital-status-interface';
declare const google;
declare let swal: any;


@Component({
  selector: 'app-documents-upload',
  templateUrl: './documents-upload.component.html',
  styleUrls: ['./documents-upload.component.css']
})
export class DocumentsUploadComponent implements OnInit {
  @ViewChild('mapDiv') mapDiv: ElementRef;
  @ViewChild('search') searchElementRef: ElementRef;
  public parameter: IProperty = {};
  initialCountry: any;
  show = false;
  image: any;
  file4: FileUpload;
  developer_image: any;
  model: Users;
  location: IProperty = {};
  language_code: string;
  showInput: boolean = false;
  dataNotAvailable: boolean;

  constructor(
    public constant: Constant,
    private cs: CommonService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private admin: AdminService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private router: Router
  ) { }

  ngOnInit() {
    this.language_code = localStorage.getItem('language_code');
    this.initModel();
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.p = this.constant.p;
    console.log(this.model,"model")
      this.parameter.sub = this.route.params.subscribe(params => {
        if (params['id']) {
          this.model.id = params['id'];
          this.getUserById(this.model.id);
        } else {
          this.model.id = '';
        }
      });
  }

  initModel() {
    this.initialCountry = {initialCountry: this.constant.country_code};
    this.model = new Users();
    this.model.legal_rep_banks = new Array();
    this.model.user_linked_documents = new Array();
    this.model.legal_representative = new LegalRepresentative();
    this.model.country_code = this.constant.country_code;
    this.model.dial_code = this.constant.dial_code;
  }

 

  getUserById(id: string) {
    this.spinner.show();
    this.admin.postDataApi('getUserById', {'user_id': id})
    .subscribe(
      success => {
        this.spinner.hide();
        this.model = new Users();
        this.model = success.data;
        // this.model.legal_representative = new LegalRepresentative();
        this.model.legal_rep_banks = success.data.legal_rep_banks;
        this.model.user_linked_documents = success.data.user_linked_documents;
        console.log(this.model.user_linked_documents,"doc")
        this.model.legal_representative = success.data.legal_representative || new LegalRepresentative();
        this.model.legal_representative.legal_rep_banks = success.data.legal_representative.legal_rep_banks; // Array(new Banks());
        this.image = this.model.image;
      }, error => {
        this.spinner.hide();
      });
  }

  set() {
    this.show = true;
  }

  changeListner(event: any, param: any) {
    if (event.target.files[0].size > this.constant.fileSizeLimit) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.fileSizeExceeds'), 'error');
      return false;
    }
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this[param] = e.target.result;
      this.spinner.show();
      this.cs.saveImage(event.target.files[0]).subscribe(
        success => {
          this.spinner.hide();
          this.model[param] = success['data'].image;
        }
      );
    };
    reader.readAsDataURL(event.target.files[0]);
  }

 
  noDataAvailable(data){
   this.dataNotAvailable = data? true : false;
  }

  viewDocument(document: string) {
    window.open(document, '_blank');
  }
  
  deletePopup(index: number, id: string) {
    this.parameter.index = index;
    this.parameter.text = this.translate.instant('message.error.wantToDeleteFile');

    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.deleteBuyerSeller(index, id);
      }
    });
  }

  deleteBuyerSeller(index: number, id: string) {
    this.parameter.index = index;
    const input = new FormData();
    input.append('id', id);
    this.admin.postDataApi('deleteLinkedDocument', input)
      .subscribe(
        success => {
          swal(this.translate.instant('swal.success'), this.translate.instant('message.success.deletedSuccessfully'), 'success');
          this.parameter.items.splice(index, 1);
        });
  }
  
}
