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
import { ToastrService } from 'ngx-toastr';
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
  @ViewChild('docsModalClose') docsModalClose: ElementRef;
  @ViewChild('docsFile') docsFile: ElementRef;
  public parameter: IProperty = {};
  @ViewChild('docsModalOpen') docsModalOpen: ElementRef;
  @ViewChild('folderModalOpen') folderModalOpen: ElementRef;
  @ViewChild('folderModalClose') folderModalClose: ElementRef;

  // initialCountry: any;
  //show = false;
  image: any;
  file4: FileUpload;
  developer_image: any;
  model: Users;
  location: IProperty = {};
  language_code: string;
  showInput: boolean = false;
  dataNotAvailable: boolean;
  collectionFolders: Array<any>;
  folderIndex: number;
  folderName: string;
  docs = new Array<any>();
  folderId: number;
  docsName: string;
  docFile: any;
  mode: string;
  selectedFolder: any = {};

  routeDetaills: { userId: string, beneficiaryId: string, tutorId: string }
    = { userId: null, beneficiaryId: null, tutorId: null };
  currentDocumentIndex: number = 0; // bydefault 0 , 1 for user , 2 for beneficiary , 3 for tutor
  linked_documents: Array<any>;
  isDeletedDocument: boolean = false;

  constructor(
    public constant: Constant,
    private cs: CommonService,
    public admin: AdminService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private router: Router,
    private translate: TranslateService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.language_code = localStorage.getItem('language_code');
    this.initModel();
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.p = this.constant.p;
    //console.log(this.model, "model")
    this.parameter.sub = this.route.params.subscribe(params => {
      if (params['userId']) {
        this.model.id = params['userId'];
        this.routeDetaills.userId = params['userId'];
        this.currentDocumentIndex = 1;
        if (params['beneficiaryId']) {
          this.routeDetaills.beneficiaryId = params['beneficiaryId'];
          this.currentDocumentIndex = 2;
          if (params['tutorId']) {
            this.routeDetaills.tutorId = params['tutorId'];
            this.currentDocumentIndex = 3;
          }
        }
        this.getUserById(this.model.id);
      } else {
        this.model.id = '';
      }
    });
  }

  initModel() {
    //this.initialCountry = { initialCountry: this.constant.country_code };
    this.model = new Users();
    // this.model.legal_rep_banks = new Array();
    // this.model.user_linked_documents = new Array();
    // this.model.legal_representative = new LegalRepresentative();
    // this.model.country_code = this.constant.country_code;
    // this.model.dial_code = this.constant.dial_code;
  }



  getUserById = (id: string): void => {
    this.spinner.show();
    this.admin.postDataApi('getUserById', { 'user_id': id }).subscribe((success) => {
      this.spinner.hide();
      this.model = new Users();
      this.model = success.data;
      // // this.model.legal_representative = new LegalRepresentative();
      // this.model.legal_rep_banks = success.data.legal_rep_banks;
      // this.model.user_linked_documents = success.data.user_linked_documents;
      // //console.log(this.model.user_linked_documents, "doc")
      // this.model.legal_representative = success.data.legal_representative || new LegalRepresentative();
      // this.model.legal_representative.legal_rep_banks = success.data.legal_representative.legal_rep_banks; // Array(new Banks());
      // this.image = this.model.image;
      switch (this.currentDocumentIndex) {
        case 1:
          this.linked_documents = success.data.user_linked_documents || [];
          break;
        case 2:
          (success.data.beneficiary || []).forEach((data) => {
            if (data.id == parseInt(this.routeDetaills.beneficiaryId)) {
              this.linked_documents = data.beneficiary_linked_document || [];
            }
          });
          break;
        case 3:
          (success.data.beneficiary || []).forEach((data) => {
            if (data.tutor.id == parseInt(this.routeDetaills.tutorId)) {
              this.linked_documents = data.tutor.tutor_linked_document || [];
            }
          });
          break;
        default:
          break;
      }
      if (this.isDeletedDocument) {
        swal(this.translate.instant('swal.success'), this.translate.instant('message.success.deletedSuccessfully'), 'success');
        this.isDeletedDocument = false;
      }
    }, (error) => {
      this.spinner.hide();
    });
  }

  // set() {
  //   this.show = true;
  // }

  noDataAvailable(data) {
    this.dataNotAvailable = data ? true : false;
  }

  viewDocument = (documentLink: string): void => {
    window.open(documentLink, '_blank');
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
        switch (this.currentDocumentIndex) {
          case 1:
            this.deleteBuyerSeller(index, id);
            break;
          case 2:
            this.deleteBeneficiaryDocument(index, id);
            break;
          case 3:
            this.deleteTutorDocument(index, id);
            break;
          default:
            break;
        }
      }
    });
  }

  deleteBuyerSeller = (index: number, id: string): void => {
    this.parameter.loading = true;
    this.parameter.index = index;
    const input = new FormData();
    input.append('id', id);
    this.admin.postDataApi('deleteLinkedDocument', input).subscribe((success) => {
      this.parameter.loading = false;
      this.isDeletedDocument = true;
      this.getUserById(this.model.id);
      //this.parameter.items.splice(index, 1);
    });
  }

  deleteBeneficiaryDocument = (index: number, id: string): void => {
    this.parameter.loading = true;
    this.parameter.index = index;
    const input = new FormData();
    input.append('id', id);
    this.admin.postDataApi('deleteBeneficiaryDocument', input).subscribe((success) => {
      this.parameter.loading = false;
      this.isDeletedDocument = true;
      this.getUserById(this.model.id);
    });
  }

  deleteTutorDocument = (index: number, id: string): void => {
    this.parameter.loading = true;
    this.parameter.index = index;
    const input = new FormData();
    input.append('id', id);
    this.admin.postDataApi('deleteTutorDocument', input).subscribe((success) => {
      this.parameter.loading = false;
      this.isDeletedDocument = true;
      this.getUserById(this.model.id);
    });
  }

  closeModal() {
    this.docFile = '';
    this.docsFile.nativeElement.value = '';
    this.docsModalClose.nativeElement.click();
  }

  onSelectFile(files, folderId) {
    this.docFile = files[0];
    this.folderId = folderId;
    //this.parameter.loading = true;
    // this.cs.saveAttachment1(files[0], folderId).subscribe(
    //   success => {
    //     this.parameter.loading = false;
    //     this.docFile = success['data'].name;
    //     this.folderId = success['data'].id;
    //   }, error => {
    //     this.parameter.loading = false;
    //   }
    // );
  }


  addDocs() {
    if (!this.docFile) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseEnterDocuFile'), this.translate.instant('swal.error'));
      return;
    }

    switch (this.currentDocumentIndex) {
      case 1:
        this.parameter.loading = true;
        this.cs.saveAttachment1(this.docFile, this.folderId).subscribe((success) => {
          this.parameter.loading = false;
          // this.docFile = success['data'].name;
          // this.folderId = success['data'].id;
          this.docs.push({ display_name: this.docFile });
          this.docFile = '';
          this.docsFile.nativeElement.value = '';
          this.getUserById(this.model.id);
        }, (error) => {
          this.parameter.loading = false;
        });
        break;
      case 2:
        const input2 = new FormData();
        input2.append('attachment', this.docFile);
        input2.append('id', this.folderId.toString());
        this.parameter.loading = true;
        this.admin.postDataApi('addBeneficiaryDocument', input2).subscribe((success) => {
          this.parameter.loading = false;
          this.docs.push({ display_name: this.docFile });
          this.docFile = '';
          this.docsFile.nativeElement.value = '';
          this.getUserById(this.model.id);
        }, (error) => {
          this.parameter.loading = false;
        });
        break;
      case 3:
        const input3 = new FormData();
        input3.append('attachment', this.docFile);
        input3.append('id', this.folderId.toString());
        this.parameter.loading = true;
        this.admin.postDataApi('addTutorDocument', input3).subscribe((success) => {
          this.parameter.loading = false;
          this.docs.push({ display_name: this.docFile });
          this.docFile = '';
          this.docsFile.nativeElement.value = '';
          this.getUserById(this.model.id);
        }, (error) => {
          this.parameter.loading = false;
        });
        break;
      default:
        break;
    }
  }

  openAddFolder(folder, index: number) {
    switch (this.currentDocumentIndex) {
      case 1:
        this.folderName = this.language_code == 'en' ? folder.user_document.name_en : folder.user_document.name_es;
        break;
      case 2:
        this.folderName = this.language_code == 'en' ? folder.beneficiary_document.name_en : folder.beneficiary_document.name_es;
        break;
      case 3:
        this.folderName = this.language_code == 'en' ? folder.tutor_document.name_en : folder.tutor_document.name_es;
        break;
      default:
        break;
    }
    this.folderId = folder.id;
    this.folderModalOpen.nativeElement.click();
  }

  goBack = (): void => {
    this.router.navigate(['/dashboard/users/edit-user', this.model.id])
  }

}
