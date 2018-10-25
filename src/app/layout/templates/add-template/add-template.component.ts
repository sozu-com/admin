import { Component, OnInit } from '@angular/core';
import { AdminService } from './../../../services/admin.service';
import * as jquery from 'jquery';
import { HttpInterceptor } from './../../../services/http-interceptor';
import { FileUpload } from './../../../common/fileUpload';
import { ActivatedRoute } from '@angular/router';
import { IProperty } from '../../../common/property';

declare let swal: any;

@Component({
  selector: 'app-add-template',
  templateUrl: './add-template.component.html',
  styleUrls: ['./add-template.component.css']
})
export class AddTemplateComponent implements OnInit {

  public parameter: IProperty = {};
  public imageLink = {
    link: ''
  };

  public post: any = {
    id: '',
    url: '',
    post_type: 'post',
    status: 'publish',
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
  };

  file1: any;

  constructor(
    private admin: AdminService,
    private route: ActivatedRoute,
    private http: HttpInterceptor) {
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
    events:  {
      'froalaEditor.initialized':  function () {
        console.log('initialized');
      },
      'froalaEditor.image.beforeUpload':  function  (e,  editor,  images) {
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
      'froalaEditor.image.inserted':  function  (e,  editor, file, response) {
        // console.log('inserted');
        // console.log('e', e);
        // console.log('editor', editor);
        // console.log('file', file);
        // console.log('response', response);
      },
      'froalaEditor.image.uploaded':  function  (e,  editor,  response) {
        // console.log('uploaded', JSON.parse(response));
        // response = JSON.parse(response);
        // this.imageLink = {link: response.data.image};
        // console.log('new response', this.imageLink);
      },
      'froalaEditor.image.error':  function  (e,  editor, error, response) {
        // console.log('error');
        // console.log('e', e);
        // console.log('editor', editor);
        // console.log('error', error);
        // console.log('response', response);

        swal('Error', error.message, 'error');
        // if (error.code === 1) {
        //   console.log('No link in upload response.');
        //   swal('Error', 'No link in upload response.', 'error');
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
    this.http.loader.next({value: false});
    this.file1 = new FileUpload(true, this.admin);

    this.route.params.subscribe( params => {
      this.post.id = params.id;
      if (this.post.id > 0) {
        this.parameter.loading = true;
        this.admin.postDataApi('getBlogById', {id: this.post.id}).subscribe(r => {
          this.parameter.loading = false;
          console.log(r);
          this.post = r['data'];
          this.file1.image = this.post.image;
        }, error => {
          this.parameter.loading = false;
          swal('Error', error, 'error');
        });
      }else {
        delete this.post.id;
      }
    });
  }

  submitAll() {
    console.log(this.post);

    if (!this.post.post_type) {swal('Error', 'Please enter post type', 'error'); return false; }
    if (!this.post.title_en) {swal('Error', 'Please enter title in english', 'error'); return false; }
    if (!this.post.description_en && !this.post.description_es) {swal('Error', 'Please enter description', 'error'); return false; }
    if (!this.post.meta_title_en && !this.post.meta_title_es) {swal('Error', 'Please enter post type', 'error'); return false; }
    if (!this.post.meta_description_en && !this.post.meta_description_es) {swal('Error', 'Please enter post type', 'error'); return false; }

    this.post.image = this.file1.image;
    if (this.post.id) {
      if (!this.post.slug) {swal('Error', 'Please enter slug', 'error'); return false; }
      this.post.blog_id = this.post.id;
    }
    this.parameter.loading = true;
    this.admin.postDataApi('addBlog', this.post).subscribe(r => {
      this.parameter.loading = false;
      console.log(r);
    },
    error => {
      console.log('errorrrr', error);
      this.parameter.loading = false;
      // swal('Error', error.message, 'error');
    });
  }

}
