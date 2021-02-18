import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
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
import { AddPropertyModel } from 'src/app/models/addProperty.model';
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

  initialCountry: any;
  show = false;
  image: any;
  file4: FileUpload;
  developer_image: any;
  model: AddPropertyModel;
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

  constructor(
    public constant: Constant,
    private cs: CommonService,
    private admin: AdminService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService, private router: Router,
    private translate: TranslateService,  private toastr: ToastrService,
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
    this.model = new AddPropertyModel();
    this.model.property_linked_documents = new Array();
  }

 

  getUserById(id: string) {
    this.spinner.show();
    this.admin.postDataApi('getPropertyById', {'property_id': id})
    .subscribe(
      success => {
        this.spinner.hide();
        this.model = new AddPropertyModel();
        this.model = success.data;
        this.model.property_linked_documents = success.data.property_linked_documents;
        console.log(this.model.property_linked_documents,"doc")
      }, error => {
        this.spinner.hide();
      });
  }

  set() {
    this.show = true;
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
    this.admin.postDataApi('deletePropertyDocument', input)
      .subscribe(
        success => {
          swal(this.translate.instant('swal.success'), this.translate.instant('message.success.deletedSuccessfully'), 'success');
          this.getUserById(this.model.id);
          this.parameter.items.splice(index, 1);
        });
  }
  
  closeModal() {
    this.docsModalClose.nativeElement.click();
  }

  onSelectFile(files,folderId) {
    this.parameter.loading = true;
    this.cs.saveAttachment3(files[0],folderId).subscribe(
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
    
    console.log(this.docFile,"file")
    this.docs.push({display_name: this.docFile});
    this.docFile = ''; 
    this.docsFile.nativeElement.value = '';
    this.getUserById(this.model.id);
  }

  openAddFolder(folder, index: number) {
     this.folderName = folder.property_document.name_en;
    this.folderId = folder.id;
    this.folderModalOpen.nativeElement.click();
  }
  // goBack(userdata){ 
  //   this.router.navigate(['/dashboard/properties/edit-property/{{userdata.id}}/edit'])
  // }
}
