import { Component, OnInit, ElementRef } from '@angular/core';
import { GeneralFunctions } from './../../common/generalFunctions';
import { CommonService } from './../../services/common.service';

@Component({
  selector: 'app-generate-thumb',
  templateUrl: './generate-thumb.component.html',
  styleUrls: ['./generate-thumb.component.css']
})
export class GenerateThumbComponent implements OnInit {


  video: any;
  editModel = false;
  seconds = true;
  isActive = true;
  gf: GeneralFunctions;
  imagePath: string;
  imgObj: Object = {
    thumbnail: '',
    original: ''
  };
  videoObj: Object = {
    thumbnail: '',
    original: ''
  };


  workoutVideo: Object = {
    file: '',
    thumbnail: ''
  };
  imgArray= [];
  showVideo = true;
  durationInSec;

  constructor(private element: ElementRef, private cs: CommonService) { }

  ngOnInit() {
    this.gf = new GeneralFunctions();
  }



// showCanvas(event) {
//   this.showVideo = false;

//   this.video = document.getElementById('video1');

//   const reader = new FileReader();
//   const image = this.element.nativeElement.querySelector('.video55');
//   reader.onload = function(e) {
//     const src = e.target['result'];
//     image.src = src;

//     const timer = setInterval( () => {
//       if (image.readyState === 4) {
//         this.durationInSec = image.duration.toFixed(0);
//         // console.log("The duration is: " + image.duration.toFixed(2) + " seconds");
//         clearInterval(timer);
//       }
//     }, 500);
//   }.bind(this);

//   reader.readAsDataURL(event.target.files[0]);

//   const videoFile = event.target.files[0];
//   setTimeout(() => {
//     this.newcanvas(image, videoFile);
//   }, 5000);
// }


// newcanvas(video, videoFile) {
//   const canvas = document.getElementById('canvas') as HTMLCanvasElement;
//   const ss = canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight,
//                                                     0, 0, canvas.width, canvas.height);

//   const ImageURL = canvas.toDataURL('image/jpeg');

//   const fileToUpload = this.dataURLtoFile(ImageURL, 'tempFile.png');

//   this.cs.saveImage(fileToUpload).subscribe(
//     success => {console.log('image', success); }
//   );
// }

// dataURLtoFile(dataurl, filename) {
//   const arr = dataurl.split(',');
//   const mime = arr[0].match(/:(.*?);/)[1];
//   const bstr = atob(arr[1]);
//   let n = bstr.length;
//   const u8arr = new Uint8Array(n);
//   while (n--) {
//       u8arr[n] = bstr.charCodeAt(n);
//   }
//   return new File([u8arr], filename, {type: mime});
// }
}
