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
      console.log('getMessages', res);
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

  saveAttachment(event) {
    this.model.message_type = 4;
    this.cs.saveAttachment(event.target.files[0]).subscribe(
      success => {
        this.model.attachment = success.data.name;
        this.model.attachment_name = event.target.files[0].name;
      }
    );
  }

  playVideo(i) {
    this.parameter.messages[i].play = true;
    console.log('messages', this.parameter.messages);
  }

  show(event) {
        // On selecting a video file
        document.querySelector('#videoFileObject').addEventListener('change', function() {
          // Set object URL as the video <source>
          document.querySelector('#video-element source')
          .setAttribute('src', URL.createObjectURL(event.target.files[0]));
        });
    console.log('===');

        const _VIDEO = document.querySelector('#video-element') as HTMLVideoElement,
            _CANVAS = document.querySelector('#canvas-element') as HTMLCanvasElement;

        // Video metadata is loaded
        _VIDEO.addEventListener('loadedmetadata', function() {
            // Set canvas dimensions same as video dimensions
            _CANVAS.width = _VIDEO.videoWidth;
            _CANVAS.height = _VIDEO.videoHeight;
        });

  }

  showCanvas(event) {
    this.model.message_type = 3;
    this.parameter.loading = true;
    this.showVideo = true;

    this.video = document.getElementById('videoFileObject');
    console.log('this.video', this.video);

    // const reader = new FileReader();
    const image = this.element.nativeElement.querySelector('.video55');
    console.log('image', image);
    const reader = new FileReader();
    reader.onload = (e: any) => {
      console.log('target');
      console.log('target', e.target);
      const src = e.target['result'];
      image.src = src;
      console.log('image_src', image.src);
    };

    // reader.onload = function(e) {
    //   const src = e.target['result'];
    //   image.src = src;
    //   console.log('image_src', image.src);
    //   // const timer = setInterval( () => {
    //   //   console.log('image_readyState');
    //   //   console.log('image_readyState', image.readyState);
    //   //   if (image.readyState === 4) {
    //   //     this.durationInSec = image.duration.toFixed(0);
    //   //     console.log('The duration is: ' + image.duration.toFixed(2) + ' seconds');
    //   //     clearInterval(timer);
    //   //   }
    //   // }, 500);
    // }.bind(this);

    reader.readAsDataURL(event.target.files[0]);

    const videoFile = event.target.files[0];
    setTimeout(() => {
      this.newcanvas(image, videoFile);
    }, 5000);
  }

  newcanvas1(video) {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;

    // const video = document.getElementById('video') as HTMLVideoElement;
    // console.log('videooooooo', video);
    // canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

    canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    console.log('zzzz', canvas);
  }

  newcanvas(video, videoFile) {
    console.log('video', video, videoFile);
    console.log('value', this.model.message_type, this.showVideo);
    // const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    // const ctx = canvas.getContext('2d');
    // const ss = ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight,
    //                                                   0, 0, canvas.width, canvas.height);


    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = function(){
        // ctx.drawImage(img, 0, 0);
        ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight,
                                                            0, 0, canvas.width, canvas.height);
    };

    img.src = URL.createObjectURL(videoFile);
console.log('img src', img.src);

    const ImageURL = canvas.toDataURL('image/jpeg');
    const fileToUpload = this.dataURLtoFile(ImageURL, 'tempFile.png');
    this.cs.saveVideo(videoFile, fileToUpload).subscribe(
      success => {
        console.log('video uploaded', success);
        this.model.video = success.data.video;
        this.model.image = success.data.thumb;
      }
    );
  }

  dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
    // const file = new File([u8arr], filename, {type: mime});
    // this.cs.saveImage(file).subscribe(
    //   success => {
    //     console.log('image uploaded', success);
    //     this.model.image = success.data.image;
    //     return this.model.image;
    //   }
    // );
  }

  sendMessage() {
    if (this.model.message_type === 1 && !this.model.message) {
      swal('Error', 'Please enter some text.', 'error');
    } else {
      console.log('this.model', this.model);
      this.admin.postDataApi('conversation/sendMessage', this.model).subscribe(r => {
        this.parameter.messages.push(r.data);
        this.scrollToBottom();
        this.model = new Chat;
      });
    }
  }
}
