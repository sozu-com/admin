export class VideoUpload {

  http: any; env: any; us: any;

  single = true;
  file: any;
  image: any;
  files: any;
  loading = false;
  backupArray: any;

  constructor(single: any, us) {
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
          const src = e.target['result'];
          // videoTest.src = src;
          const timer = setInterval(() => {
            // find duration of video only of video is in ready state
            // if (videoTest.readyState === 4) {
            //   setTimeout(() => {
            //     // create canvas at middle of video
            //     this.newcanvas(videoTest, event.target.files[0]);
            //   }, 3000);
            //   clearInterval(timer);
            // }
          }, 100);
          if (this.single == true) {
            this.image = e.target.result;
            this.file = event.target.files[index];
          } else {
            const model: any = {};
            model.image = e.target.result;
            model.video = event.target.files[index];
            model.thumb = event.target.files[index];
            model.loading = false;
            this.files.push(model);
            console.log(this.files);
          }

          this.loading = false;
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


  newcanvas(video: any, videoFile: File) {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ss = canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight,
      0, 0, canvas.width, canvas.height);
    const ImageURL = canvas.toDataURL('image/jpeg');
    // model.image = ImageURL;
    const fileToUpload = this.dataURLtoFile(ImageURL, 'tempFile.png');
    this.us.saveVideo(videoFile, fileToUpload).subscribe(
      success => {
        // const videoObj = {
        //   video: '', thumb: ''
        // };
        // videoObj.video = success['data'].video;
        // videoObj.thumb = success['data'].thumb;
        // this.model.videos = [videoObj];
      }, error => {
        // console.log(error);
      }
    );
  }

  dataURLtoFile(dataurl: any, filename: string) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  getFile() {
    return this.file;
  }

  getFiles() {
    return this.files;
  }

  upload(): Promise<any> {
    console.log(this.files, 'video-filesssssssssss');
    return new Promise((resolve, reject) => {
      if (this.single == false) {
        const total = this.files.length; let i = 1;
        this.files.map(async (item) => {
          if (item.fileToUpload) {
            // console.log('1111', item.file, item.file.type);
            const formData = new FormData();
            formData.append('video', item);
            formData.append('thumb', item.fileToUpload);
            // console.log(item);
            item.loading = true;
            await this.us.postDataApi('saveVideo', formData).subscribe(res => {
              console.log(res.data);
              delete item.fileToUpload;
              item.video = res['data'].video;
              item.thumb = res['data'].thumb;
              item.loading = false;
              if (i == total) { resolve(); }/* resolve on last loop */
              i++;
            }, error => {
              if (i === total) { reject(error); }/* reject on last loop */
              i++;
            });
          } else {
            if (i >= total) { console.log(this.files); resolve(); }
            i++;
          }
        });
      }
      // if (this.single === true && this.file) {
      //   console.log('22222', this.file);
      //   const formData = new FormData();
      //   formData.append('video', this.file);
      //   formData.append('thumb', this.file);
      //   this.image.loading = true;
      //   this.us.postDataApi('saveImage', formData).subscribe(res => {
      //     this.file = '';
      //     this.image = res['data'].image;
      //     this.image.loading = false;
      //     resolve();
      //   },
      //     error => {
      //       reject(error);
      //     });
      // } else {
      //   resolve();
      // }
    });
  }

  remove(index: any) {
    this.files.splice(index, 1);
  }

  backup(files: any) {
    this.backupArray = files;
    this.files = files;
  }

  reset() {
    this.files = JSON.parse(JSON.stringify(this.backup));
  }

}
