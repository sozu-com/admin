export class FileUpload {

    http: any; env: any; us: any;

    single = true;
    file: any;
    image: any;
    files: any;
    loading = false;
    backupArray: any;

    constructor(single, us) {
      this.us = us;
      this.single = single;
      if (this.single != true) {
        this.files = [];
      }
    }

    // upload = true means upload file just after reading
    onSelectFile(event, upload = false) {

       if (event.target.files && event.target.files[0]) {
         const total = event.target.files.length;
         for (let index = 0; index < event.target.files.length; index++) {
           this.loading = true;
           const reader = new FileReader();
           reader.onload = (e: any) => {
             // console.log('single',this.single,' index',index);
             if (this.single == true) {
               this.image = e.target.result;
               this.file = event.target.files[index];
             } else {
               const model: any = {};
               model.image = e.target.result;
               model.file = event.target.files[index];
               this.files.push(model);
               console.log(this.files);
             }

             this.loading = false;
             // if(upload == true && index== (total-1)){
             //   console.log('uploading');
             //   this.upload();
             // }
             if (index == (event.target.files.length - 1) && upload == true) {
                 this.upload().then(r => {
                     this.loading = false;
                 });
             }
           };
           reader.readAsDataURL(event.target.files[index]);
         }

       }

     }

     getFile() {
       return this.file;
     }

     getFiles() {
       return this.files;
     }

     upload(): Promise<any> {
       // console.log(this.single);
       return new Promise((resolve, reject) => {
               if (this.single == false) {
                 const total = this.files.length; let i = 1;
                 this.files.map((item) => {
                   if (item.file) {
                    const formData = new FormData();
                    formData.append('image', item.file);
                    // console.log(item);
                    this.us.postDataApi('saveImage', formData).subscribe(res => {
                      // console.log(res);
                      delete item.file;
                      item.image = res['data'].image;
                      if (i == total) {resolve(); }/* resolve on last loop */
                      i++;
                    },
                    error => {
                      if (i === total) { reject(error); }/* reject on last loop */
                      i++;
                    });
                   }else {
                     if (i >= total) {console.log(this.files); resolve(); }
                     i++;
                   }
                 });
               }
               if (this.single === true && this.file) {
                 const formData = new FormData();
                 formData.append('image', this.file);
                 this.us.postDataApi('saveImage', formData).subscribe(res => {
                   this.file = '';
                   this.image = res['data'].image;
                   resolve();
                 },
                 error => {
                   reject(error);
                 });
               } else {
                 resolve();
               }
        });
  }

  remove(index) {
    this.files.splice(index, 1);
  }

  backup(files) {
    this.backupArray = files;
    this.files = files;
  }

  reset() {
    this.files = JSON.parse(JSON.stringify(this.backup));
  }

}
