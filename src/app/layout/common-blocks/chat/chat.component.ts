import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { AdminService } from './../../../services/admin.service';
import { CommonService } from './../../../services/common.service';
import { IProperty } from './../../../common/property';
import { GeneralFunctions } from './../../../common/generalFunctions';
import { Chat } from './../../../models/chat.model';
import * as io from 'socket.io-client';
declare let swal: any;
// import * as $ from 'jquery';
// declare var $: any;
// const $ = require('jquery');
// window.jQuery = $;
// import * as jquery from 'jquery';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [Chat]
})

export class ChatComponent implements OnInit {
  @Input('admin_id') admin_id;
  @Input('lead_id') lead_id;
  @Input('user_id') user_id;
  @Input('sent_as') sent_as;


  editModel = false;
  seconds = true;
  isActive = true;
  imagePath: string;
  imgObj: Object = {
    thumbnail: '',
    original: ''
  };
  workoutVideo: Object = {
    file: '',
    thumbnail: ''
  };
  imgArray= [];
  durationInSec;


  gf: GeneralFunctions;
  showVideo = true;
  video: any;
  videoObj: Object = {
    thumbnail: '',
    original: ''
  };

  public scrollbarOptions = { axis: 'y', theme: 'dark'};
  public parameter: IProperty = {};

  constructor(
    private element: ElementRef,
    private admin: AdminService,
    private cs: CommonService,
    public model: Chat
  ) { }

  ngOnInit() {
    this.gf = new GeneralFunctions();
    this.model.message_type = 1;
    setTimeout(() => {
      this.getMessages();
      this.initSocket();
    }, 1000);
  }

  getMessages() {
    this.parameter.loading = true;
    this.admin.postDataApi('conversation/getMessages',
    {lead_id: this.lead_id, user_id: this.user_id, sent_as: this.sent_as}).subscribe(res => {
      this.parameter.messages = res.data[0].messages;
      this.model.conversation_id = res.data[0].id;
      this.parameter.loading = false;
      this.scrollToBottom();
    });
  }

  public initSocket(): void {
    this.parameter.socket = io.connect(this.admin.socketUrl);
    this.parameter.socket.on('connect', fun => {
      console.log('Socket Connected');
      this.parameter.socket_id = this.parameter.socket.id;
      this.parameter.connected = this.parameter.socket.connected;

      const data = {
        admin_id: this.admin_id,
        socket_id: this.parameter.socket_id,
      };
      if (this.parameter.connected) {
        this.parameter.socket.emit('add-admin', data, (res: any) => {
          console.log('Add Admin Success', data);
        });
        this.parameter.socket.on('message', (response: any) => {
          if (response.data.conversation_id === this.parameter.conversation_id) {
            console.log('Message', response);
            this.scrollToBottom();
            this.parameter.messages.push(response.data);
          }
        });
      }
    });
  }

  scrollToBottom() {
    setTimeout(() => {
      $('.chat-area').mCustomScrollbar('scrollTo', 'bottom');
    }, 200);
  }

  updateModel(param) {
    this.model[param] = '';
    this.model.message_type = 1;
  }

  onSelectFile(param, event) {
    if (event.target.files && event.target.files[0]) {
      this.model.message_type = 2;
      const reader = new FileReader();
      reader.onload = (e: any) => {
          this.parameter.image = e.target.result;
          this.model[param] = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      this.cs.saveImage(event.target.files[0]).subscribe(
        success => {this.model.image = success.data.image; }
      );
    }
  }


  showCanvas(event) {
    this.model.message_type = 3;
    this.parameter.loading = true;
    this.showVideo = true;

    this.video = document.getElementById('video1');
    console.log('this.video', this.video);
    const reader = new FileReader();
    const image = this.element.nativeElement.querySelector('.video55');
    console.log('image', image);
    reader.onload = function(e) {
      const src = e.target['result'];
      image.src = src;

      const timer = setInterval( () => {
        if (image.readyState === 4) {
          this.durationInSec = image.duration.toFixed(0);
          console.log('The duration is: ' + image.duration.toFixed(2) + ' seconds');
          clearInterval(timer);
        }
      }, 500);
    }.bind(this);

    reader.readAsDataURL(event.target.files[0]);

    const videoFile = event.target.files[0];
    setTimeout(() => {
      this.newcanvas(image, videoFile);
    }, 5000);
  }


  newcanvas(video, videoFile) {
    console.log('video', video, videoFile);
    console.log('value', this.model.message_type, this.showVideo);
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    console.log('canvas', canvas);
    // const ss = canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight,
    //                                                   0, 0, canvas.width, canvas.height);
    const ss = canvas.getContext('2d').drawImage(video, 0, 0, 40, 40,
      0, 0, canvas.width, canvas.height);
console.log('ss', ss);
    const ImageURL = canvas.toDataURL('image/jpeg');
    // const fileToUpload = this.dataURLtoFile(ImageURL, 'tempFile.png');
    const fileExtension = 'png';
    const fileNameS3 = this.gf.generateRandomString() + '.' + fileExtension;
console.log(ImageURL, fileExtension, fileNameS3);
    // // uploading video thumbnail
    // // this.uploader.upload(fileToUpload, fileNameS3).then((x) => {
    // //   this.imagePath = x;
    // // });

    // // uploading video file
    // const videoExtension = 'mp4';
    // const videofileNameS3 = this.gf.generateRandomString() + '.' + videoExtension;
    // // this.uploader.upload(videoFile, videofileNameS3).then((x) => {
    // //   this.imagePath = x;
    // // });

    // // creating image object
    // // this.videoObj = {
    // //   thumbnail: this.admin.imageBasePath + fileNameS3,
    // //   file: this.admin.imageBasePath + videofileNameS3
    // // };
    // this.parameter.loading = false;
    // console.log('mmmmmmmmmmmmmmmmmmmmm', this.videoObj);
    // this.cs.saveVideo(videoFile, 'd').subscribe(
    //   success => {
    //     console.log('video uploaded', success);
    //     // this.model.video = success.data.image;
    //   }
    // );
  }

  // dataURLtoFile(dataurl, filename) {
  //   const arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
  //       bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  //   while (n--) {
  //       u8arr[n] = bstr.charCodeAt(n);
  //   }
  //   return new File([u8arr], filename, {type: mime});
  // }

  sendMessage() {
    if (this.model.message) {
      // const params = {
      //   conversation_id: this.parameter.conversation_id,
      //   message: this.model.message,
      //   message_type: this.parameter.message_type,
      //   // image: 's',
      //   // video: 's',
      //   // attachment_name: 's',
      //   // attachment: 's'
      // };
      this.admin.postDataApi('conversation/sendMessage', this.model).subscribe(r => {
        this.parameter.messages.push(r.data);
        this.scrollToBottom();
        this.model = new Chat;
      });
    } else {
      swal('Error', 'Please enter some text.', 'error');
    }
  }
}
