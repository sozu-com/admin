import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from 'src/app/models/users.model';
import { FileUpload } from 'src/app/common/fileUpload';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProperty } from 'src/app/common/property';
import { Constant } from 'src/app/common/constants';
import { AdminService } from 'src/app/services/admin.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
declare let swal: any;

@Component({
  selector: 'app-spouse-doc',
  templateUrl: './spouse-doc.component.html',
  styleUrls: ['./spouse-doc.component.css']
})
export class SpouseDocComponent implements OnInit {

  @ViewChild('mapDiv') mapDiv: ElementRef;
  @ViewChild('search') searchElementRef: ElementRef;
  @ViewChild('docsModalClose') docsModalClose: ElementRef;
  @ViewChild('docsFile') docsFile: ElementRef;
  public parameter: IProperty = {};
  @ViewChild('docsModalOpen') docsModalOpen: ElementRef;
  @ViewChild('folderModalOpen') folderModalOpen: ElementRef;
  @ViewChild('folderModalClose') folderModalClose: ElementRef;

  image: any;
  file4: FileUpload;
  developer_image: any;
  model: Users;
  location: IProperty = {};
  language_code: string;
  showInput: boolean = false;
  collectionFolders: Array<any>;
  folderIndex: number;
  folderName: string;
  docs = new Array<any>();
  folderId: number;
  docsName: string;
  docFile: any;
  mode: string;
  selectedFolder: any = {};

  public currentDocumentIndex: number = 0; // bydefault 0 , 1 for user , 2 for beneficiary , 3 for tutor
  public linked_documents: Array<any>;
  private routeDetaills: { userId: string, beneficiaryId: string, tutorId: string }
    = { userId: null, beneficiaryId: null, tutorId: null };
  private isDeletedDocument: boolean = false;
  // private isShowSpinner: boolean = true;

  constructor(
    public constant: Constant,
    public admin: AdminService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private router: Router,
    private translate: TranslateService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.language_code = localStorage.getItem('language_code');
    this.model = new Users();
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.p = this.constant.p;
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

  getUserById = (id: string): void => {
    // if (this.isShowSpinner || this.isDeletedDocument) {
    //   this.spinner.show();
    // } else {
    //   this.parameter.loading = true;
    // }
    this.spinner.show();
    this.admin.postDataApi('getUserById', { 'user_id': id }).subscribe((success) => {
      this.spinner.hide();
      this.model = new Users();
      this.model = success.data;
      switch (this.currentDocumentIndex) {
        case 1:
          this.linked_documents = success.data.spouse_user.spouse_linked_document || [];
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
      // this.parameter.loading = false;
      // this.isShowSpinner = false;
    });
  }

  viewDocument = (documentLink: string): void => {
    window.open(documentLink, '_blank');
  }

  deletePopup = (index: number, id: string): void => {
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
    this.spinner.show();
    this.admin.postDataApi('deleteSpouseLinkedDocument', this.getPostRequestToDeleteDocument(index, id)).
      subscribe((success) => {
        this.spinner.hide();
        this.getUserByIdAfterDeteleDocument();
      });
  }

  deleteBeneficiaryDocument = (index: number, id: string): void => {
    this.spinner.show();
    this.admin.postDataApi('deleteBeneficiaryDocument', this.getPostRequestToDeleteDocument(index, id)).
      subscribe((success) => {
        this.spinner.hide();
        this.getUserByIdAfterDeteleDocument();
      });
  }

  deleteTutorDocument = (index: number, id: string): void => {
    this.spinner.show();
    this.admin.postDataApi('deleteTutorDocument', this.getPostRequestToDeleteDocument(index, id)).
      subscribe((success) => {
        this.spinner.hide();
        this.getUserByIdAfterDeteleDocument();
      });
  }

  getPostRequestToDeleteDocument = (index: number, id: string): FormData => {
    this.parameter.index = index;
    const post = new FormData();
    post.append('id', id);
    return post;
  }

  getUserByIdAfterDeteleDocument = (): void => {
    this.isDeletedDocument = true;
    this.getUserById(this.model.id);
  }


  closeModal = (): void => {
    this.docFile = '';
    this.docsFile.nativeElement.value = '';
    this.docsModalClose.nativeElement.click();
  }

  onSelectFile = (files: any, folderId: number): void => {
    this.docFile = files[0];
    this.folderId = folderId;
  }


  addDocs = (): void => {
    if (!this.docFile) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseEnterDocuFile'), this.translate.instant('swal.error'));
    } else {
      switch (this.currentDocumentIndex) {
        case 1:
          this.parameter.loading = true;
          this.admin.postDataApi('addUserSpouseLinkedDocument', this.getPostRequestToAddDocument()).subscribe((success) => {
            this.parameter.loading = false;
            this.getUserByIdAfterAddDocument();
          }, (error) => {
            this.parameter.loading = false;
          });
          break;
        case 2:
          this.parameter.loading = true;
          this.admin.postDataApi('addBeneficiaryDocument', this.getPostRequestToAddDocument()).subscribe((success) => {
            this.parameter.loading = false;
            this.getUserByIdAfterAddDocument();
          }, (error) => {
            this.parameter.loading = false;
          });
          break;
        case 3:
          this.parameter.loading = true;
          this.admin.postDataApi('addTutorDocument', this.getPostRequestToAddDocument()).subscribe((success) => {
            this.parameter.loading = false;
            this.getUserByIdAfterAddDocument();
          }, (error) => {
            this.parameter.loading = false;
          });
          break;
        default:
          break;
      }
    }
  }

  getPostRequestToAddDocument = (): FormData => {
    const post = new FormData();
    post.append('attachment', this.docFile);
    post.append('id', this.folderId.toString());
    return post;
  }

  getUserByIdAfterAddDocument = (): void => {
    this.docs.push({ display_name: this.docFile });
    this.docFile = '';
    this.docsFile.nativeElement.value = '';
    this.getUserById(this.model.id);
  }

  openAddFolder = (folder: any): void => {
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

  goBackToUserListing = (): void => {
    this.router.navigate(['/dashboard/users/edit-user', this.model.id])
  }

}

