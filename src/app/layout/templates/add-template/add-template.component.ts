import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import * as jquery from 'jquery';
import { HttpInterceptor } from 'src/app/services/http-interceptor';
import { FileUpload } from 'src/app/common/fileUpload';
import { ActivatedRoute } from '@angular/router';
import { IProperty } from 'src/app/common/property';
import { MainTemplateTypes } from 'src/app/models/template.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { Constant } from 'src/app/common/constants';
import { ToastrService } from 'ngx-toastr';
declare let swal: any;

@Component({
  selector: 'app-add-template',
  templateUrl: './add-template.component.html',
  styleUrls: ['./add-template.component.css']
})
export class AddTemplateComponent implements OnInit {

  public parameter: IProperty = {};
  public mainTemplateTypes: MainTemplateTypes;
  public imageLink = {
    link: ''
  };

  public post: any = {
    id: '',
    url: '',
    post_type: this.translate.instant('templates.post'),
    status: this.translate.instant('templates.publish'),
    title_en: '',
    title_es: '',
    description_en: '',
    description_es: '',
    meta_title_en: '',
    meta_title_es: '',
    meta_description_en: '',
    meta_description_es: '',
    image: '',
    publish_date: '',
    main_template_id: '',
    post_category_id: '',
    post_tag_id: [],
    autor_id: ''
  };
  file1: any;
  isShow: boolean = false;
  isPost: boolean = false;
  category_name: any;
  tag_name: any;
  list_cate: any = [];
  list_tag: any = [];
  users: any = [];
  new_array: any;
  category: Array<any>;
  linked_category: Array<any> = [];
  blog_metatags: Array<any> = [];
  loading = true;
  selectedObjects: any[];
  category_obj: any = '';
  constructor(
    private admin: AdminService,
    private constant: Constant,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private http: HttpInterceptor,
    private toastr: ToastrService,
    private translate: TranslateService) {

  }

  public editorContent = 'My Document\'s Title';
  // public imgObj: Object = {
  //   src: 'https://s3-us-west-2.amazonaws.com/testbagant/nequore/1533540803eRoUG6oE6q4noxtU10BqijCN6GJdBn.png'
  // };

  public options: Object = {
    charCounterCount: true,
    // Set the image upload parameter.
    imageUploadParam: 'image',

    // Set the image upload URL.
    imageUploadURL: this.admin.baseUrl + 'saveImageLink',

    // Additional upload params.
    // imageUploadParams: {id: 'my_editor'},

    // Set request type.
    imageUploadMethod: 'POST',

    // Set max image size to 5MB.
    // imageMaxSize: 5 * 1024 * 1024,

    // Allow to upload PNG and JPG.
    imageAllowedTypes: ['jpeg', 'jpg', 'png'],
    events: {
      'froalaEditor.initialized': function () {
        // console.log('initialized');
      },
      'froalaEditor.image.beforeUpload': function (e, editor, images) {
        // Your code
        // if  (images.length) {
        //   console.log('image length');
        //   // Create a File Reader.
        //   const  reader  =  new  FileReader();
        //   // Set the reader to insert images when they are loaded.
        //   reader.onload  =  (ev)  =>  {
        //     const  result  =  ev.target['result'];
        //     const response = editor.image.insert(result,  null,  null,  editor.image.get());
        //     // console.log(ev,  editor.image);
        //     // console.log('result', result);
        //     // console.log('response', response);
        //   };
        //   // Read image as base64.
        //   reader.readAsDataURL(images[0]);
        // }
        // Stop default upload chain.
        // return  false;
      },
      'froalaEditor.image.inserted': function (e, editor, file, response) {
        // console.log('inserted');
        // console.log('e', e);
        // console.log('editor', editor);
        // console.log('file', file);
        // console.log('response', response);
      },
      'froalaEditor.image.uploaded': function (e, editor, response) {
        // console.log('uploaded', JSON.parse(response));
        // response = JSON.parse(response);
        // this.imageLink = {link: response.data.image};
        // console.log('new response', this.imageLink);
      },
      'froalaEditor.image.error': function (e, editor, error, response) {
        // console.log('error');
        // console.log('e', e);
        // console.log('editor', editor);
        // console.log('error', error);
        // console.log('response', response);

        swal(this.translate.instant('swal.error'), error.message, 'error');
        // if (error.code === 1) {
        //   console.log('No link in upload response.');
        //   swal(this.translate.instant('swal.error'), 'No link in upload response.', 'error');
        // }

        // // No link in upload response.
        // else if (error.code == 2) { console.log('no link'); }

        // // Error during image upload.
        // else if (error.code == 3) { ... }

        // // Parsing response failed.
        // else if (error.code == 4) { ... }

        // // Image too text-large.
        // else if (error.code == 5) { ... }

        // // Invalid image type.
        // else if (error.code == 6) { ... }

        // // Image can be uploaded only to same domain in IE 8 and IE 9.
        // else if (error.code == 7) { ... }
      }
    }
  };


  ngOnInit() {
    this.selectedObjects = [];
    // this.category_obj = '';
    this.http.loader.next({ value: false });
    this.file1 = new FileUpload(true, this.admin);
    this.listCate();
    this.listTags();
    this.autors();
    this.route.params.subscribe(params => {
      this.post.id = params.id;
      if (this.post.id > 0) {
        this.getBlog(this.post.id);
      } else {
        delete this.post.id;
      }
    });
  }

  comparer(o1: any, o2: any): boolean {
    return o1 && o2 ? o1.label === o2.label : o2 === o2;
  }

  getBlog(id) {
    this.spinner.show();
    this.loading = true;
    this.admin.postDataApi('getBlogById', { id: id }).subscribe(r => {
      this.spinner.hide();
      this.post = r['data'];
      this.linked_category = this.post ? this.post.linked_category : [];
      this.blog_metatags = this.post ? this.post.blog_metatag : [];
      (this.post.linked_category || []).forEach(r => {
        if (r.cat_name) {
          this.category_obj = r.cat_name;
        }
      });
      (this.post.blog_metatag || []).forEach(r => {
        if (r.tag_name) {
          this.selectedObjects.push({ id: r.tag_name.id, name_en: r.tag_name.name_en, name_es: r.tag_name.name_es, created_at: r.tag_name.created_at, updated_at: r.tag_name.updated_at });
        }
      });
      this.file1.image = this.post.image;
      this.loading = false;
    }, error => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), error, 'error');
    });
  }



  toggleShow() {
    this.isShow = !this.isShow;
  }
  togglePost() {
    this.isPost = !this.isPost;
  }
  autors() {
    this.spinner.show();
    this.admin.postDataApi('getCreatorUsers', {}).subscribe(r => {
      this.spinner.hide();
      this.users = r['data'];
    },
      error => {
        this.spinner.hide();
        swal(this.translate.instant('swal.error'), error.message, 'error');
      });
  }
  addCategory() {
    const input = {
      name_en: this.category_name
    }
    this.spinner.show();
    this.admin.postDataApi('addPostCategory', input).subscribe(r => {
      let newArray = [];
      newArray.push(r['data']);
      localStorage.setItem("key", JSON.stringify(newArray));
      this.spinner.hide();
      this.category_name = '';
      this.listCate();
    },
      error => {
        this.spinner.hide();
        swal(this.translate.instant('swal.error'), error.message, 'error');
      });
  }

  listCate() {
    this.spinner.show();
    this.admin.postDataApi('getPostCategory', {}).subscribe(r => {
      this.spinner.hide();
      this.list_cate = r['data'];
      this.isShow = false;
    },
      error => {
        this.spinner.hide();
        swal(this.translate.instant('swal.error'), error.message, 'error');
      });
  }

  addTag() {
    const input = {
      name_en: this.tag_name
    }
    this.spinner.show();
    this.admin.postDataApi('addPostTag', input).subscribe(r => {
      this.spinner.hide();
      this.tag_name = '';
      this.listTags();
    },
      error => {
        this.spinner.hide();
        swal(this.translate.instant('swal.error'), error.message, 'error');
      });
  }

  listTags() {
    this.spinner.show();
    this.admin.postDataApi('getPostTag', {}).subscribe(r => {
      this.spinner.hide();
      this.list_tag = r['data'];
      this.isPost = false;
    },
      error => {
        this.spinner.hide();
        swal(this.translate.instant('swal.error'), error.message, 'error');
      });
  }

  openDeletePopup = (data: any, index: number): void => {
    let text = this.translate.instant('message.error.wantToDeleteTag')
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' + text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.deletemainTag(data, index);
      }
    });
  }
  deletemainTag = (item: any, index: number): void => {
    this.spinner.show();
    this.admin.postDataApi('deleteLinkedPostTag', { id: item.id }).subscribe((response) => {
      this.spinner.hide();
      if (response.success == '0') {
        this.toastr.error(this.translate.instant('message.error.youCannotDeleteThisPossessionStatus'), this.translate.instant('swal.error'));
      } else {
        this.toastr.success(this.translate.instant('message.success.deletedSuccessfully'), this.translate.instant('swal.success'));
        this.selectedObjects.splice(index, 1);
        this.blog_metatags.splice(index, 1);
        this.listTags();
        //this.getBlog(this.post.id);
      }
    }, (error) => {
      this.spinner.hide();
      this.toastr.error(error.error.message, this.translate.instant('swal.error'));
    });
  }

  deleteTag = (item: any, index: number): void => {
    this.spinner.show();
    this.admin.postDataApi('deletePostTag', { id: item.id }).subscribe((response) => {
      this.spinner.hide();
      if (response.success == '0') {
        this.toastr.error(this.translate.instant('message.error.youCannotDeleteThisTagStatus'), this.translate.instant('swal.error'));
      } else {
        this.toastr.success(this.translate.instant('message.success.deletedSuccessfully'), this.translate.instant('swal.success'));
        this.list_tag.splice(index, 1);
        this.selectedObjects.splice(index, 1);
        this.blog_metatags.splice(index, 1);
        this.listTags();
      }
    }, (error) => {
      this.spinner.hide();
      this.toastr.error(error.error.message, this.translate.instant('swal.error'));
    });
  }

  openDeleteConfirmationPopup = (data: any, index: number): void => {
    let text = this.translate.instant('message.error.wantToDeleteCate')
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' + text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.deleteBlog(data, index);
      }
    });
  }


  deleteBlog = (item: any, index: number): void => {
    this.spinner.show();
    this.admin.postDataApi('deleteLinkedCat', { id: item.id }).subscribe((response) => {
      this.spinner.hide();
      if (response.success == '0') {
        this.toastr.error(this.translate.instant('message.error.youCannotDeleteThisPossessionStatus'), this.translate.instant('swal.error'));
      } else {
        this.toastr.success(this.translate.instant('message.success.deletedSuccessfully'), this.translate.instant('swal.success'));
        this.category_obj = '';
        this.linked_category.splice(index, 1);
      }
    }, (error) => {
      this.spinner.hide();
      this.toastr.error(error.error.message, this.translate.instant('swal.error'));
    });
  }

  deleteCategory = (item: any, index: number): void => {
    this.spinner.show();
    this.admin.postDataApi('deletePostCategory', { id: item.id }).subscribe((response) => {
      this.spinner.hide();
      if (response.success == '0') {
        this.toastr.error(this.translate.instant('message.error.youCannotDeleteThisCateStatus'), this.translate.instant('swal.error'));
      } else {
        this.toastr.success(this.translate.instant('message.success.deletedSuccessfully'), this.translate.instant('swal.success'));
        this.list_cate.splice(index, 1);
        this.category_obj = '';
        this.linked_category.splice(index, 1);
        this.listCate();
      }
    }, (error) => {
      this.spinner.hide();
      this.toastr.error(error.error.message, this.translate.instant('swal.error'));
    });
  }


  submitAll() {

    if (!this.post.post_type) { swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterPostType'), 'error'); return false; }
    if (!this.post.title_en) { swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterTitleEng'), 'error'); return false; }
    if (!this.post.description_en && !this.post.description_es) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterDesc'), 'error'); return false;
    }
    if (!this.post.meta_title_en && !this.post.meta_title_es) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterMetaTitle'), 'error'); return false;
    }
    if (!this.post.meta_description_en && !this.post.meta_description_es) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterMetaDesc'), 'error'); return false;
    }

    this.post.image = this.file1.image;
    if (this.selectedObjects) {
      console.log(this.selectedObjects, "selectedObjects");
      const d = this.selectedObjects.map(o => o.id);
      this.post.post_tag_id = d;
    }
    this.post.post_category_id = this.category_obj.id;
    if (this.post.id) {
      if (!this.post.slug) { swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterSlug'), 'error'); return false; }
      this.post.blog_id = this.post.id;
    }
    this.spinner.show();
    this.admin.postDataApi('addBlog', this.post).subscribe(r => {
      this.spinner.hide();
      this.post.id ? swal(this.translate.instant('swal.success'),
        this.translate.instant('message.success.updatedSuccessfully'), 'success') :
        swal('Sucsess', this.translate.instant('message.success.addedSuccessfully'), 'success');
      this.post = r['data'];
      this.linked_category = this.post ? this.post.linked_category : [];
      this.blog_metatags = this.post ? this.post.blog_metatag : [];
    },
      error => {
        this.spinner.hide();
        // swal(this.translate.instant('swal.error'), error.message, 'error');
      });
  }

  previewPost(blog_url: string) {
    // window.open(encodeURI(blog_url), '_blank');
    let url = '';
    if (!/^http[s]?:\/\//.test(blog_url)) {
      url += 'http://';
    }

    url += blog_url;
    window.open(encodeURIComponent(blog_url), '_blank');
  }

  getMainTemplatesType() {
    this.admin.postDataApi('getMainTemplatesType', {})
      .subscribe(
        success => {
          this.mainTemplateTypes = success['data'];
        }
      );
  }

  showMainTemplatesType(type: number) {
    this.post.post_type = type;
  }



}
