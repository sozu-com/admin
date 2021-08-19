import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constant } from 'src/app/common/constants';
import { FileUpload } from 'src/app/common/fileUpload';
import { VideoUpload } from 'src/app/common/videoUpload';
import { AddProdutModel } from 'src/app/models/addProject.model';
import { AdminService } from 'src/app/services/admin.service';
import { CommonService } from 'src/app/services/common.service';

declare let swal: any;

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css'],
  providers: [AddProdutModel]
})
export class AddEditProductComponent implements OnInit {
  @ViewChild('modalAddMoreVideos') modalAddMoreVideos: ElementRef;
  @ViewChild('modalVideosClose') modalVideosClose: ElementRef;

  file1: FileUpload;
  amenVideo: VideoUpload;
  language_code: string;
  id: any;
  suppliers = [];

  constructor(
    public model: AddProdutModel,
    private admin: AdminService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    public constant: Constant,
    private cs: CommonService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.language_code = localStorage.getItem('language_code');
    this.file1 = new FileUpload(true, this.admin);
    this.amenVideo = new VideoUpload(false, this.admin);
    this.route.params.subscribe(params => {
      this.id = params.id;

      if (this.id) {
        /* if id exists edit mode */
        let self = this;
        this.spinner.show()
        this.admin.postDataApi('getProductById', { office_id: this.id }).subscribe(r => {
          this.spinner.hide();
          this.model = JSON.parse(JSON.stringify(r.data));
        }, error => {
          this.spinner.hide();
        });
      }
    });
  }

  addProduct(){
    this.model.supplier_id =1;
    let modelSave = this.model;
    if (this.id) {
      this.spinner.show();
      this.admin.postDataApi('updateProduct', modelSave).subscribe(success => {
        this.spinner.hide();
        swal(this.translate.instant('swal.success'), this.translate.instant('message.success.updatedSuccessfully'), 'success');
        // set model to avoid duplication creation of project
        this.setProductModel(success['data']);

        // this.router.navigate(['/dashboard/projects/view-projects']);
      }, error => {
        this.spinner.hide();
        swal(this.translate.instant('swal.error'), error.message, 'error');
      });
    } else {
      this.spinner.show();
      this.admin.postDataApi('addProduct', modelSave).subscribe(success => {
        this.spinner.hide();
        swal(this.translate.instant('swal.success'), this.translate.instant('message.success.addedSuccessfully'), 'success');
        // set model to avoid duplication creation of project
        this.id = success['data'].id;
        this.setProductModel(success['data']);
      }, error => {
        this.spinner.hide();
        swal(this.translate.instant('swal.error'), error.message, 'error');
      });
    }
  }

  setProductModel(data){

  }

  viewDocument(document: string) {
    window.open(document, '_blank');
  }

  modelOpenVideos() {
    this.modalAddMoreVideos.nativeElement.click();
    this.amenVideo.backup(JSON.parse(JSON.stringify(this.model.videos)));
  }

  saveVideos() {
    let count = 0;
    // if (this.amenVideo.files.length < 1) {
    //   swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseAtleastOneImage'), 'error');
    //   return false;
    // }
    this.amenVideo.upload().then(r => {
      this.model.videos = this.amenVideo.files;
    });
    this.amenVideo.files.forEach(element => {
      if (element.loading !== true) {
        count++;
      }
    });
    if (count === this.amenVideo.files.length) {
      this.modalAddMoreVideos.nativeElement.click();
    }
  }

  changeListner(event: any, paramLoader: string, param: any) {
    if (event.target.files[0].size > this.constant.pdfSizeLimit) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pdfSizeExceeds'), 'error');
      return false;
    }
    this.model[paramLoader] = true;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.cs.saveAttachment(event.target.files[0]).subscribe(
        success => {
          this.model[paramLoader] = false;
          this.model[param] = success['data'].name;
        }
      );
    };
    reader.readAsDataURL(event.target.files[0]);
  }

}
