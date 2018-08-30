import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from './../../services/admin.service';
declare let swal: any;

@Component({
  selector: 'app-edit-template',
  templateUrl: './edit-template.component.html',
  styleUrls: ['./edit-template.component.css']
})
export class EditTemplateComponent implements OnInit {

  public imageLink = {
    link: ''
  };
  @ViewChild('edt') edt;
  public editorContent = 'My Document\'s Title';
  public imgObj: Object = {
    src: 'https://s3-us-west-2.amazonaws.com/testbagant/nequore/1533540803eRoUG6oE6q4noxtU10BqijCN6GJdBn.png'
  };
  public options: Object = {
    charCounterCount: true,
    // Set the image upload parameter.
    imageUploadParam: 'image',

    // Set the image upload URL.
    imageUploadURL: this.admin.baseUrl + 'saveImage',

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
        if  (images.length) {
          console.log('image length');
          // Create a File Reader.
          const  reader  =  new  FileReader();
          // Set the reader to insert images when they are loaded.
          reader.onload  =  (ev)  =>  {
            const  result  =  ev.target['result'];
            const response = editor.image.insert(result,  null,  null,  editor.image.get());
            // console.log(ev,  editor.image);
            console.log('result', result);
            console.log('response', response);
          };
          // Read image as base64.
          reader.readAsDataURL(images[0]);
        }
        // Stop default upload chain.
        // return  false;
      },
      'froalaEditor.image.inserted':  function  (e,  editor, file, response) {
        console.log('inserted');
        console.log('e', e);
        console.log('editor', editor);
        console.log('file', file);
        console.log('response', response);
      },
      'froalaEditor.image.uploaded':  function  (e,  editor,  response) {
        console.log('uploaded', JSON.parse(response));
        response = JSON.parse(response);
        this.imageLink = {link: response.data.image};
        console.log('new response', this.imageLink);
      },
      'froalaEditor.image.error':  function  (e,  editor, error, response) {
        console.log('error');
        console.log('e', e);
        console.log('editor', editor);
        console.log('error', error);
        console.log('response', response);

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

  constructor(private admin: AdminService) { }

  ngOnInit() {
  }


  submitData() {
    console.log('Data - ', this.editorContent);
  }

}
