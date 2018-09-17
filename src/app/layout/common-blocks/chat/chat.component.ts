import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { AdminService } from './../../../services/admin.service';
import { CommonService } from './../../../services/common.service';
import { IProperty } from './../../../common/property';
import { Constant } from './../../../common/constants';
import { Chat, ConversationUser } from './../../../models/chat.model';
import * as io from 'socket.io-client';
import { ChatTimePipe } from '../../../pipes/chat-time.pipe';
declare let swal: any;

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
  // loadingMessages = false;
  textMessage: any;
  durationInSec = 0;
  showVideo = true;
  video: any;
  image: any;
  videoObj: Object = {
    thumbnail: '',
    original: ''
  };
  videoSrc: any;
  loadmore = true;
  loadmoring = false;
  public scrollbarOptions = { axis: 'y', theme: 'dark'};
  public parameter: IProperty = {};
  @ViewChild('optionsButton') optionsButton: ElementRef;
  text: string;

  constructor(
    private element: ElementRef,
    private admin: AdminService,
    private cs: CommonService,
    public model: Chat,
    public constant: Constant
  ) { }

  ngOnInit() {
    // this.admin.loginData$.subscribe(success => {
    //   this.model.conversation_user = {admin_id: success['id']};
    // });
    this.parameter.messages = [];
    setTimeout(() => {
      const input = {lead_id: this.lead_id, user_id: this.user_id, sent_as: this.sent_as};
      this.initSocket();
      this.getMessages();
    }, 100);
  }

  getMessages() {
    // const url = this.sent_as === 1 ? 'conversation/getMessages' : 'conversation/chatListingBroker';
    this.admin.postDataApi('conversation/getMessages',
    {lead_id: this.lead_id, user_id: this.user_id, sent_as: this.sent_as}).subscribe(res => {
      console.log('getMessages', res);
      this.parameter.messages = res.data[0].messages;
      if (this.parameter.messages.length < 30) {this.loadmore = false; }
      console.log('loadmore', this.loadmore);
      this.parameter.conversation_id = res.data[0].id;
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
        device_id: this.admin.deviceId + '_' + this.admin_id
      };
      if (this.parameter.connected) {
        console.log('data', data);
        this.parameter.socket.emit('add-admin', data, (res: any) => {
        });
        this.parameter.socket.on('message', (response: any) => {
          console.log('message socket', response.data.conversation_id, this.parameter.conversation_id);
          console.log('response', response);
          if (response.data.conversation_id === this.parameter.conversation_id) {
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

  js_yyyy_mm_dd_hh_mm_ss () {
    const now = new Date();
    const year = '' + now.getFullYear();
    let month = '' + (now.getMonth() + 1); if (month.length === 1) { month = '0' + month; }
    let day = '' + now.getDate(); if (day.length === 1) { day = '0' + day; }
    let hour = '' + now.getHours(); if (hour.length === 1) { hour = '0' + hour; }
    let minute = '' + now.getMinutes(); if (minute.length === 1) { minute = '0' + minute; }
    let second = '' + now.getSeconds(); if (second.length === 1) { second = '0' + second; }
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
  }

  onSelectFile(param, event) {
    if (event.target.files[0].size > this.constant.fileSizeLimit) {
      swal('Error', this.constant.errorMsg.FILE_SIZE_EXCEEDS, 'error');
    } else {
      const model = new Chat;
      model.message = this.textMessage;
      model.message_type = 2;
      model.loading = true;
      model.conversation_user = {admin_id: this.admin_id};
      model.admin_id = this.admin_id;
      const date = new Date();
      model.updated_at = date;
      this.parameter.messages.push(model);

      this.optionsButton.nativeElement.click();

      setTimeout(() => {
        this.scrollToBottom();
      }, 100);

      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.image = e.target.result;
            model[param] = e.target.result;
            this.cs.saveImage(event.target.files[0]).subscribe(
              success => {
                model.image = success['data'].image;
                this.sendMessage(model);
              }
            );
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    }
  }

  saveAttachment(event) {

    if (event.target.files[0].size > this.constant.fileSizeLimit) {
      swal('Error', this.constant.errorMsg.FILE_SIZE_EXCEEDS, 'error');
    } else {
      this.optionsButton.nativeElement.click();
      const model = new Chat;
      model.message = this.textMessage;
      model.message_type = 4;
      model.loading = true;
      model.conversation_user = {admin_id: this.admin_id};
      model.admin_id = this.admin_id;
      model.attachment_name = event.target.files[0].name;
      const date = new Date();
      model.updated_at = date;
      this.parameter.messages.push(model);

      setTimeout(() => {
        this.scrollToBottom();
      }, 100);

      this.cs.saveAttachment(event.target.files[0]).subscribe(
        success => {
          model.attachment = success['data'].name;
          console.log('==>', model);
          this.sendMessage(model);
        }
      );
    }
  }

  playVideo(i) {
    this.parameter.messages[i].play = true;
  }

  showCanvas(event) {
    if (event.target.files[0].size > this.constant.fileSizeLimit) {
      swal('Error', this.constant.errorMsg.FILE_SIZE_EXCEEDS, 'error');
    } else {
      this.optionsButton.nativeElement.click();
      this.showVideo = true;
      const model = new Chat;
      model.message = this.textMessage;
      model.message_type = 3;
      model.loading = true;
      const date = new Date();
      model.updated_at = date;
      model.conversation_user = {admin_id: this.admin_id};
      model.admin_id = this.admin_id;
      this.parameter.messages.push(model);

      setTimeout(() => {
        this.scrollToBottom();
      }, 100);

      setTimeout(() => {
        this.video = document.getElementById('video1');
        const reader = new FileReader();
        const videoTest = this.element.nativeElement.querySelector('.video55');
        reader.onload = function(e) {
          const src = e.target['result'];
          videoTest.src = src;
          const timer = setInterval( () => {
            // find duration of video only of video is in ready state
            if (videoTest.readyState === 4) {
              this.durationInSec = videoTest.duration.toFixed(0);
              setTimeout(() => {
                // create canvas at middle of video
                this.newcanvas(videoTest, event.target.files[0], model);
              }, 3000);
              clearInterval(timer);
            }
          }, 1000);
        }.bind(this);
        reader.readAsDataURL(event.target.files[0]);
        // setTimeout(() => {
        //   this.newcanvas(videoTest, event.target.files[0]);
        // }, 4000);
      }, 1000);
    }
  }

  newcanvas(video, videoFile, model) {

    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    console.log(canvas);
    const ss = canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight,
                                                      0, 0, canvas.width, canvas.height);
    const ImageURL = canvas.toDataURL('image/jpeg');
    model.image = ImageURL;
    const fileToUpload = this.dataURLtoFile(ImageURL, 'tempFile.png');
    this.cs.saveVideo(videoFile, fileToUpload).subscribe(
      success => {
        console.log('image', success);
        model.video = success['data'].video;
        model.image = success['data'].thumb;
        this.sendMessage(model);
      }, error => {
        console.log(error);
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
  }

  toUTCDate(date) {
    const _utc = new Date(date.getUTCFullYear(), date.getUTCMonth(),
    date.getUTCDate(),  date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    return _utc;
  }

  setText() {
    if (!this.textMessage) {
      return false;
    }
    const model = new Chat;
    model.message = this.textMessage;
    model.message_type = 1;
    model.loading = true;
    model.conversation_user = {admin_id: this.admin_id};
    const date = new Date();
    model.updated_at = date;
    model.admin_id = this.admin_id;
    this.parameter.messages.push(model);
    this.textMessage = '';
    this.sendMessage(model);
  }

  sendMessage(model) {
    if (model.message_type === 1 && !model.message) {
      swal('Error', 'Please enter some text.', 'error');
    } else {
      model.conversation_id =  this.parameter.conversation_id;
      console.log('Appending', model);
      this.admin.postDataApi('conversation/sendMessage', model).subscribe(r => {
        console.log('sendMessage', r);
        setTimeout(() => {
          this.scrollToBottom();
        }, 100);
        if (model.loading === true) {
          model.loading = false;
          // const date = new Date();
          // model.updated_at = date;
          // model.updated_at = new ChatTimePipe().transform(date, 'YYYY-MM-DD HH:MM:SS', 3);
        }
      },
      error => {
        swal('Error', error.error.message, 'error');
      });
    }
  }

  loadMore(admin_id) {
    this.loadmoring = true;
    // const data = {
    //   sent_as: 7,
    //   conversation_id: this.conversation_id,
    //   last_message_id: this.messages[0].id
    // };
    const input = {lead_id: this.lead_id, user_id: this.user_id,
      sent_as: this.sent_as, last_message_id: this.parameter.messages[0].id};
    this.admin.postDataApi('conversation/getMessages',
    {lead_id: this.lead_id, user_id: this.user_id,
      sent_as: this.sent_as, last_message_id: this.parameter.messages[0].id}).subscribe(res => {
      console.log(res);
      this.loadmoring = false;
      this.admin_id = admin_id;
      if (res.data[0].messages.length < 30) {this.loadmore = false; }
      this.parameter.messages = res.data[0].messages.concat(this.parameter.messages);
      console.log('new data', this.parameter.messages);
    });
  }
}
