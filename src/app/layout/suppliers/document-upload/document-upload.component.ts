import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constant } from 'src/app/common/constants';
import { IProperty } from 'src/app/common/property';
import { AdminService } from 'src/app/services/admin.service';
import { CommonService } from 'src/app/services/common.service';
import { LegalEntity, LegalRepresentative } from '../../../models/legalEntity.model';
import { ToastrService } from 'ngx-toastr';
import { Supplier } from 'src/app/models/supplier.model';
declare const google;
declare let swal: any;

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.css']
})
export class DocumentUploadComponent implements OnInit {

  @ViewChild('mapDiv') mapDiv: ElementRef;
  @ViewChild('search') searchElementRef: ElementRef;
  @ViewChild('docsModalClose') docsModalClose: ElementRef;
  @ViewChild('docsFile') docsFile: ElementRef;
  public parameter: IProperty = {};
  @ViewChild('docsModalOpen') docsModalOpen: ElementRef;
  @ViewChild('folderModalOpen') folderModalOpen: ElementRef;
  @ViewChild('folderModalClose') folderModalClose: ElementRef;

  model: Supplier;
  data_fetch: boolean = false;
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
  language_code: string;

  constructor(
    private route: ActivatedRoute,
    public constant: Constant,
    private cs: CommonService,
    private toastr: ToastrService,
    private admin: AdminService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,private router: Router,
  ) { }

  ngOnInit() {
    this.language_code = localStorage.getItem('language_code');
    this.model = new Supplier();
    this.model.suppliers_linked_documents = new Array();
    this.parameter.sub = this.route.params.subscribe(params => {
      if (params['id'] !== '0') {
        this.model.id = params['id'];
        this.getSuppliersById(this.model.id);
      } else {
        this.model.id = '';
      }
    });
  }



  getSuppliersById(id: string) {
    let self = this;
    this.data_fetch = false;
    this.spinner.show();
    this.admin.postDataApi('getSuppliersById', { id: id })
      .subscribe(
        success => {
          this.spinner.hide();
          this.model = success.data;
          this.model.suppliers_linked_documents = success.data.suppliers_linked_documents;
          console.log(this.model.suppliers_linked_documents, "doc")
        }, error => {
          this.spinner.hide();
        });
  }

  noDataAvailable(data) {
    this.dataNotAvailable = data ? true : false;
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
    this.admin.postDataApi('deleteSuppliersDocument', input)
      .subscribe(
        success => {
          swal(this.translate.instant('swal.success'), this.translate.instant('message.success.deletedSuccessfully'), 'success');
          this.getSuppliersById(this.model.id);
          this.parameter.items.splice(index, 1);
        });
  }

  closeModal() {
    this.docsModalClose.nativeElement.click();
  }

  onSelectFile(files, folderId) {
    this.parameter.loading = true;
    this.cs.saveAttachment7(files[0], folderId).subscribe(
      success => {
        this.parameter.loading = false;
        this.docFile = success['data'].name;
        this.folderId = success['data'].id;
      }, error => {
        this.parameter.loading = false;
      }
    );
  }


  addDocs() {
    if (!this.docFile) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseEnterDocuFile'), this.translate.instant('swal.error'));
      return;
    }

    this.docs.push({ display_name: this.docFile });
    this.docFile = '';
    this.docsFile.nativeElement.value = '';
    this.getSuppliersById(this.model.id);
  }

  openAddFolder(folder, index: number) {
    this.folderName = folder.suppliers_document.name_en;
    this.folderId = folder.id;
    this.folderModalOpen.nativeElement.click();
  }
  goBack(userdata){ 
    this.router.navigate(['/dashboard/suppliers/add-supplier', userdata.id])
  }

}
