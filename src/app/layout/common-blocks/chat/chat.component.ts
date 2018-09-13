import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { AdminService } from './../../../services/admin.service';
import { CommonService } from './../../../services/common.service';
import { IProperty } from './../../../common/property';
import { GeneralFunctions } from './../../../common/generalFunctions';
import { Chat, ConversationUser } from './../../../models/chat.model';
import * as io from 'socket.io-client';
import { ChatTimePipe } from '../../../pipes/chat-time.pipe';
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
  // loadingMessages = false;
  durationInSec = 0;
  showVideo = true;
  video: any;
  image: any;
  videoObj: Object = {
    thumbnail: '',
    original: ''
  };
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
    public model: Chat
  ) { }

  ngOnInit() {
    // this.admin.loginData$.subscribe(success => {
    //   this.model.conversation_user = {admin_id: success['id']};
    // });
    setTimeout(() => {
      const input = {lead_id: this.lead_id, user_id: this.user_id, sent_as: this.sent_as};
      this.initSocket();
      this.getMessages();
    }, 1000);
  }

  getMessages() {
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
    this.optionsButton.nativeElement.click();
    this.model = new Chat();
    this.model.loading = true;
    console.log('model', this.model);
    this.model.message_type = 2;
    this.model.conversation_user = {admin_id: this.admin_id};
    this.model.admin_id = this.admin_id;
    console.log('model', this.model);
    this.parameter.messages.push(this.model);
    setTimeout(() => {
      this.scrollToBottom();
    }, 100);

    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
          this.image = e.target.result;
          this.model[param] = e.target.result;
          this.cs.saveImage(event.target.files[0]).subscribe(
            success => {
              this.model.image = success['data'].image;
              this.sendMessage();
            }
          );
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  saveAttachment(event) {
    this.optionsButton.nativeElement.click();
    this.model = new Chat();
    this.model.loading = true;
    this.model.message_type = 4;
    this.model.conversation_user = {admin_id: this.admin_id};
    this.model.admin_id = this.admin_id;
    console.log('model', this.model);
    this.parameter.messages.push(this.model);
    setTimeout(() => {
      this.scrollToBottom();
    }, 100);

    this.cs.saveAttachment(event.target.files[0]).subscribe(
      success => {
        this.model.attachment = success['data'].name;
        this.model.attachment_name = event.target.files[0].name;
        this.sendMessage();
      }
    );
  }

  playVideo(i) {
    this.parameter.messages[i].play = true;
  }


  showCanvas(event) {
    this.optionsButton.nativeElement.click();
    this.showVideo = true;
    this.model.message_type = 3;
    this.model.conversation_user = {admin_id: this.admin_id};
    this.model.admin_id =  this.admin_id;
    this.model.loading = true;
    console.log('model', this.model);
    this.parameter.messages.push(this.model);

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
              this.newcanvas(videoTest, event.target.files[0]);

            }, (this.durationInSec / 2).toFixed(0));
            clearInterval(timer);
          }
        }, 1000);
      }.bind(this);
      reader.readAsDataURL(event.target.files[0]);
    }, 1000);
  }

  newcanvas(video, videoFile) {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ss = canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight,
                                                      0, 0, canvas.width, canvas.height);

    const ImageURL = canvas.toDataURL('image/jpeg');
    this.model.image = ImageURL;
    const fileToUpload = this.dataURLtoFile(ImageURL, 'tempFile.png');
    this.cs.saveVideo(videoFile, fileToUpload).subscribe(
      success => {
        this.model.video = success['data'].video;
        this.model.image = success['data'].thumb;
        this.sendMessage();
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

  setText (message, mt) {
    this.text = '';
    this.model = new Chat();
    this.model.loading = true;
    this.model.conversation_user = {admin_id: this.admin_id};
    // const today = (new Date()).toUTCString();
    // console.log('today', today);
    // const today1 = new Date(today);
    // console.log('today', today1);
    // const r = (new Date()).getMilliseconds();
    // console.log('date', this.toUTCDate(new Date(r)));
    // // today = new ChatTimePipe().transform(today, 'YYYY-MM-DD HH:MM:SS', 3);
    // this.model.updated_at = today;
    // this.model.updated_at = this.js_yyyy_mm_dd_hh_mm_ss();
    this.model.admin_id = this.admin_id;
    this.model.message_type = mt;
    this.model.message = message;
    this.model.image = '';
    this.model.video = '';
    this.parameter.messages.push(this.model);
    console.log(this.model, '=========');
    this.scrollToBottom();
  }

  sendMessage() {
    if (this.model.message_type === 1 && !this.model.message) {
      // swal('Error', 'Please enter some text.', 'error');
    } else {
      this.model.conversation_id =  this.parameter.conversation_id;

      // if (this.model.message_type === 1) {
      //   this.model.conversation_user = {admin_id: this.admin_id};
      //   this.model.admin_id = this.admin_id;
      //   this.parameter.messages.push(this.model);
      //   this.model.loading = true;
      // }
      this.admin.postDataApi('conversation/sendMessage', this.model).subscribe(r => {
        setTimeout(() => {
          this.scrollToBottom();
        }, 200);
        if (this.model.message_type !== 1) {
          if (this.model.loading === true) {
            this.model.loading = false;
            this.parameter.messages.splice(-1, 1);
            this.parameter.messages.push(r['data']);
          }else {
            this.parameter.messages.push(r['data']);
          }
        }
        this.model = new Chat;
        // this.model.conversation_user.user_id = this.loginData.id;
      },
      error => {
        swal('Error', error.error.message, 'error');
      });
    }

  }

  // onSelectFile(param, event) {
  //   if (event.target.files && event.target.files[0]) {
  //     this.model.message_type = 2;
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //         this.parameter.image = e.target.result;
  //         this.model[param] = e.target.result;
  //     };
  //     reader.readAsDataURL(event.target.files[0]);
  //     this.cs.saveImage(event.target.files[0]).subscribe(
  //       success => {this.model.image = success.data.image; }
  //     );
  //   }
  // }

  // saveAttachment(event) {
  //   this.model.message_type = 4;
  //   this.cs.saveAttachment(event.target.files[0]).subscribe(
  //     success => {
  //       this.model.attachment = success.data.name;
  //       this.model.attachment_name = event.target.files[0].name;
  //     }
  //   );
  // }

  // playVideo(i) {
  //   this.parameter.messages[i].play = true;
  // }


  // showCanvas(event) {
  //   this.showVideo = true;
  //   this.model.message_type = 3;

  //   setTimeout(() => {
  //     this.video = document.getElementById('video1');
  //     const reader = new FileReader();
  //     const videoTest = this.element.nativeElement.querySelector('.video55');
  //     reader.onload = function(e) {
  //       const src = e.target['result'];
  //       videoTest.src = src;
  //       const timer = setInterval( () => {
  //         // find duration of video only of video is in ready state
  //         if (videoTest.readyState === 4) {
  //           this.durationInSec = videoTest.duration.toFixed(0);
  //           setTimeout(() => {
  //             // create canvas at middle of video
  //             this.newcanvas(videoTest, event.target.files[0]);
  //           }, (this.durationInSec / 2).toFixed(0));
  //           clearInterval(timer);
  //         }
  //       }, 500);
  //     }.bind(this);
  //     reader.readAsDataURL(event.target.files[0]);
  //     // setTimeout(() => {
  //     //   this.newcanvas(videoTest, event.target.files[0]);
  //     // }, 4000);
  //   }, 1000);
  // }

  // newcanvas(video, videoFile) {
  //   const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  //   const ss = canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight,
  //                                                     0, 0, canvas.width, canvas.height);
  //   const ImageURL = canvas.toDataURL('image/jpeg');
  //   const fileToUpload = this.dataURLtoFile(ImageURL, 'tempFile.png');
  //   this.cs.saveVideo(videoFile, fileToUpload).subscribe(
  //     success => {
  //       this.model.video = success.data.video;
  //       this.model.image = success.data.thumb;
  //     }
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

  // sendMessage() {
  //   if (this.model.message_type === 1 && !this.model.message) {
  //     swal('Error', 'Please enter some text.', 'error');
  //   } else {
  //     this.model.conversation_id = this.parameter.conversation_id;
  //     this.admin.postDataApi('conversation/sendMessage', this.model).subscribe(r => {
  //       this.parameter.messages.push(r.data);
  //       this.scrollToBottom();
  //       this.model = new Chat;
  //     });
  //   }
  // }
}




// import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
// import { AdminService } from './../../../services/admin.service';
// import { CommonService } from './../../../services/common.service';
// import { IProperty } from './../../../common/property';
// import { GeneralFunctions } from './../../../common/generalFunctions';
// import { Chat, ConversationUser } from './../../../models/chat.model';
// import * as io from 'socket.io-client';
// import { ChatTimePipe } from '../../../pipes/chat-time.pipe';
// declare let swal: any;
// // import * as $ from 'jquery';
// // declare var $: any;
// // const $ = require('jquery');
// // window.jQuery = $;
// // import * as jquery from 'jquery';

// @Component({
//   selector: 'app-chat',
//   templateUrl: './chat.component.html',
//   styleUrls: ['./chat.component.css'],
//   providers: [Chat]
// })

// export class ChatComponent implements OnInit {
//   @Input('admin_id') admin_id;
//   @Input('lead_id') lead_id;
//   @Input('user_id') user_id;
//   @Input('sent_as') sent_as;
//   // loadingMessages = false;

//   durationInSec = 0;
//   showVideo = true;
//   video: any;
//   image: any;
//   videoObj: Object = {
//     thumbnail: '',
//     original: ''
//   };
//   loadmore = true;
//   loadmoring = false;
//   public scrollbarOptions = { axis: 'y', theme: 'dark'};
//   public parameter: IProperty = {};
//   @ViewChild('optionsButton') optionsButton: ElementRef;
//   text: string;

//   new_model: Chat;
//   constructor(
//     private element: ElementRef,
//     private admin: AdminService,
//     private cs: CommonService,
//     public model: Chat
//   ) { }

//   ngOnInit() {

//   this.new_model = new Chat();
//     // this.admin.loginData$.subscribe(success => {
//     //   this.model.conversation_user = {admin_id: success['id']};
//     // });
//     setTimeout(() => {
//       const input = {lead_id: this.lead_id, user_id: this.user_id, sent_as: this.sent_as};
//       this.initSocket();
//       this.getMessages();
//     }, 1000);
//   }

//   getMessages() {
//     this.admin.postDataApi('conversation/getMessages',
//     {lead_id: this.lead_id, user_id: this.user_id, sent_as: this.sent_as}).subscribe(res => {
//       console.log('getMessages', res);
//       this.parameter.messages = res.data[0].messages;
//       if (this.parameter.messages.length < 30) {this.loadmore = false; }
//       console.log('loadmore', this.loadmore);
//       this.parameter.conversation_id = res.data[0].id;
//       this.scrollToBottom();
//     });
//   }

//   public initSocket(): void {
//     this.parameter.socket = io.connect(this.admin.socketUrl);
//     this.parameter.socket.on('connect', fun => {
//       console.log('Socket Connected');
//       this.parameter.socket_id = this.parameter.socket.id;
//       this.parameter.connected = this.parameter.socket.connected;

//       const data = {
//         admin_id: this.admin_id,
//         socket_id: this.parameter.socket_id,
//         device_id: this.admin.deviceId + '_' + this.admin_id
//       };
//       if (this.parameter.connected) {
//         console.log('data', data);
//         this.parameter.socket.emit('add-admin', data, (res: any) => {
//         });
//         this.parameter.socket.on('message', (response: any) => {
//           console.log('message socket', response.data.conversation_id, this.parameter.conversation_id);
//           console.log('response', response);
//           if (response.data.conversation_id === this.parameter.conversation_id) {
//             this.scrollToBottom();
//             this.parameter.messages.push(response.data);
//           }
//         });
//       }
//     });
//   }

//   scrollToBottom() {
//     setTimeout(() => {
//       $('.chat-area').mCustomScrollbar('scrollTo', 'bottom');
//     }, 200);
//   }

//   updateModel(param) {
//     this.model[param] = '';
//     this.model.message_type = 1;
//   }

//   js_yyyy_mm_dd_hh_mm_ss () {
//     const now = new Date();
//     const year = '' + now.getFullYear();
//     let month = '' + (now.getMonth() + 1); if (month.length === 1) { month = '0' + month; }
//     let day = '' + now.getDate(); if (day.length === 1) { day = '0' + day; }
//     let hour = '' + now.getHours(); if (hour.length === 1) { hour = '0' + hour; }
//     let minute = '' + now.getMinutes(); if (minute.length === 1) { minute = '0' + minute; }
//     let second = '' + now.getSeconds(); if (second.length === 1) { second = '0' + second; }
//     return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
//   }

//   onSelectFile(param, event) {
//     this.optionsButton.nativeElement.click();
//     this.model = new Chat();
//     this.model.loading = true;
//     console.log('model', this.model);
//     this.model.message_type = 2;
//     this.model.conversation_user = {admin_id: this.admin_id};
//     this.model.admin_id = this.admin_id;
//     console.log('model', this.model);
//     this.parameter.messages.push(this.model);
//     setTimeout(() => {
//       this.scrollToBottom();
//     }, 100);

//     if (event.target.files && event.target.files[0]) {
//       const reader = new FileReader();
//       reader.onload = (e: any) => {
//           this.image = e.target.result;
//           this.model[param] = e.target.result;
//           this.cs.saveImage(event.target.files[0]).subscribe(
//             success => {
//               this.model.image = success['data'].image;
//               this.sendMessage(this.model);
//             }
//           );
//       };
//       reader.readAsDataURL(event.target.files[0]);
//     }
//   }

//   saveAttachment(event) {
//     this.optionsButton.nativeElement.click();
//     this.model = new Chat();
//     this.model.loading = true;
//     this.model.message_type = 4;
//     this.model.conversation_user = {admin_id: this.admin_id};
//     this.model.admin_id = this.admin_id;
//     console.log('model', this.model);
//     this.parameter.messages.push(this.model);
//     setTimeout(() => {
//       this.scrollToBottom();
//     }, 100);

//     this.cs.saveAttachment(event.target.files[0]).subscribe(
//       success => {
//         this.model.attachment = success['data'].name;
//         this.model.attachment_name = event.target.files[0].name;
//         this.sendMessage(this.model);
//       }
//     );
//   }

//   playVideo(i) {
//     this.parameter.messages[i].play = true;
//   }


//   showCanvas(event) {
//     this.optionsButton.nativeElement.click();
//     this.showVideo = true;
//     this.model.message_type = 3;
//     this.model.conversation_user = {admin_id: this.admin_id};
//     this.model.admin_id =  this.admin_id;
//     this.model.loading = true;
//     console.log('model', this.model);
//     this.parameter.messages.push(this.model);

//     setTimeout(() => {
//       this.scrollToBottom();
//     }, 100);

//     setTimeout(() => {
//       this.video = document.getElementById('video1');
//       const reader = new FileReader();
//       const videoTest = this.element.nativeElement.querySelector('.video55');
//       reader.onload = function(e) {
//         const src = e.target['result'];
//         videoTest.src = src;
//         const timer = setInterval( () => {
//           // find duration of video only of video is in ready state
//           if (videoTest.readyState === 4) {
//             this.durationInSec = videoTest.duration.toFixed(0);
//             setTimeout(() => {
//               // create canvas at middle of video
//               this.newcanvas(videoTest, event.target.files[0]);

//             }, (this.durationInSec / 2).toFixed(0));
//             clearInterval(timer);
//           }
//         }, 1000);
//       }.bind(this);
//       reader.readAsDataURL(event.target.files[0]);
//     }, 1000);
//   }

//   newcanvas(video, videoFile) {
//     const canvas = document.getElementById('canvas') as HTMLCanvasElement;
//     const ss = canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight,
//                                                       0, 0, canvas.width, canvas.height);

//     const ImageURL = canvas.toDataURL('image/jpeg');
//     this.model.image = ImageURL;
//     const fileToUpload = this.dataURLtoFile(ImageURL, 'tempFile.png');
//     this.cs.saveVideo(videoFile, fileToUpload).subscribe(
//       success => {
//         this.model.video = success['data'].video;
//         this.model.image = success['data'].thumb;
//         this.sendMessage(this.model);
//       }, error => {
//         console.log(error);
//       }
//     );
//   }

//   dataURLtoFile(dataurl, filename) {
//     const arr = dataurl.split(',');
//     const mime = arr[0].match(/:(.*?);/)[1];
//     const bstr = atob(arr[1]);
//     let n = bstr.length;
//     const u8arr = new Uint8Array(n);
//     while (n--) {
//         u8arr[n] = bstr.charCodeAt(n);
//     }
//     return new File([u8arr], filename, {type: mime});
//   }

//   toUTCDate(date) {
//     const _utc = new Date(date.getUTCFullYear(), date.getUTCMonth(),
//     date.getUTCDate(),  date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
//     return _utc;
//   }

//   setText (message, mt) {
//     this.text = '';
//     this.model = new Chat();
//     this.model.loading = true;
//     this.model.conversation_user = {admin_id: this.admin_id};
//     this.model.random = Math.random();
//     // const today = (new Date()).toUTCString();
//     // console.log('today', today);
//     // const today1 = new Date(today);
//     // console.log('today', today1);
//     // const r = (new Date()).getMilliseconds();
//     // console.log('date', this.toUTCDate(new Date(r)));
//     // // today = new ChatTimePipe().transform(today, 'YYYY-MM-DD HH:MM:SS', 3);
//     // this.model.updated_at = today;
//     // this.model.updated_at = this.js_yyyy_mm_dd_hh_mm_ss();
//     this.model.admin_id = this.admin_id;
//     this.model.message_type = mt;
//     this.model.message = message;
//     this.model.image = '';
//     this.model.video = '';
//     console.log(this.model, '=========');
//     this.parameter.messages.push(this.model);
//     this.scrollToBottom();
//   }

//   sendMessage(new_model) {
//     this.new_model = new_model;
//     console.log('new-model', new_model);
//     if (this.new_model.message_type === 1 && !this.new_model.message) {
//       // swal('Error', 'Please enter some text.', 'error');
//     } else {
//       this.new_model.conversation_id =  this.parameter.conversation_id;

//       this.admin.postDataApi('conversation/sendMessage', this.new_model).subscribe(r => {
//         setTimeout(() => {
//           this.scrollToBottom();
//         }, 200);
//         if (this.new_model.message_type !== 1) {
//           if (this.new_model.loading === true) {
//             this.new_model.loading = false;
//             this.parameter.messages.splice(-1, 1);
//             this.parameter.messages.push(r['data']);
//           }else {
//             this.parameter.messages.push(r['data']);
//           }
//         }
//         // this.model = new Chat;
//         // this.model.conversation_user.user_id = this.loginData.id;
//       },
//       error => {
//         swal('Error', error.error.message, 'error');
//       });
//     }

//   }

//   // onSelectFile(param, event) {
//   //   if (event.target.files && event.target.files[0]) {
//   //     this.model.message_type = 2;
//   //     const reader = new FileReader();
//   //     reader.onload = (e: any) => {
//   //         this.parameter.image = e.target.result;
//   //         this.model[param] = e.target.result;
//   //     };
//   //     reader.readAsDataURL(event.target.files[0]);
//   //     this.cs.saveImage(event.target.files[0]).subscribe(
//   //       success => {this.model.image = success.data.image; }
//   //     );
//   //   }
//   // }

//   // saveAttachment(event) {
//   //   this.model.message_type = 4;
//   //   this.cs.saveAttachment(event.target.files[0]).subscribe(
//   //     success => {
//   //       this.model.attachment = success.data.name;
//   //       this.model.attachment_name = event.target.files[0].name;
//   //     }
//   //   );
//   // }

//   // playVideo(i) {
//   //   this.parameter.messages[i].play = true;
//   // }


//   // showCanvas(event) {
//   //   this.showVideo = true;
//   //   this.model.message_type = 3;

//   //   setTimeout(() => {
//   //     this.video = document.getElementById('video1');
//   //     const reader = new FileReader();
//   //     const videoTest = this.element.nativeElement.querySelector('.video55');
//   //     reader.onload = function(e) {
//   //       const src = e.target['result'];
//   //       videoTest.src = src;
//   //       const timer = setInterval( () => {
//   //         // find duration of video only of video is in ready state
//   //         if (videoTest.readyState === 4) {
//   //           this.durationInSec = videoTest.duration.toFixed(0);
//   //           setTimeout(() => {
//   //             // create canvas at middle of video
//   //             this.newcanvas(videoTest, event.target.files[0]);
//   //           }, (this.durationInSec / 2).toFixed(0));
//   //           clearInterval(timer);
//   //         }
//   //       }, 500);
//   //     }.bind(this);
//   //     reader.readAsDataURL(event.target.files[0]);
//   //     // setTimeout(() => {
//   //     //   this.newcanvas(videoTest, event.target.files[0]);
//   //     // }, 4000);
//   //   }, 1000);
//   // }

//   // newcanvas(video, videoFile) {
//   //   const canvas = document.getElementById('canvas') as HTMLCanvasElement;
//   //   const ss = canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight,
//   //                                                     0, 0, canvas.width, canvas.height);
//   //   const ImageURL = canvas.toDataURL('image/jpeg');
//   //   const fileToUpload = this.dataURLtoFile(ImageURL, 'tempFile.png');
//   //   this.cs.saveVideo(videoFile, fileToUpload).subscribe(
//   //     success => {
//   //       this.model.video = success.data.video;
//   //       this.model.image = success.data.thumb;
//   //     }
//   //   );
//   // }

//   // dataURLtoFile(dataurl, filename) {
//   //   const arr = dataurl.split(',');
//   //   const mime = arr[0].match(/:(.*?);/)[1];
//   //   const bstr = atob(arr[1]);
//   //   let n = bstr.length;
//   //   const u8arr = new Uint8Array(n);
//   //   while (n--) {
//   //       u8arr[n] = bstr.charCodeAt(n);
//   //   }
//   //   return new File([u8arr], filename, {type: mime});
//   // }


//   loadMore(admin_id) {
//     this.loadmoring = true;
//     // const data = {
//     //   sent_as: 7,
//     //   conversation_id: this.conversation_id,
//     //   last_message_id: this.messages[0].id
//     // };
//     const input = {lead_id: this.lead_id, user_id: this.user_id,
//       sent_as: this.sent_as, last_message_id: this.parameter.messages[0].id};
//     this.admin.postDataApi('conversation/getMessages',
//     {lead_id: this.lead_id, user_id: this.user_id,
//       sent_as: this.sent_as, last_message_id: this.parameter.messages[0].id}).subscribe(res => {
//       console.log(res);
//       this.loadmoring = false;
//       this.admin_id = admin_id;
//       if (res.data[0].messages.length < 30) {this.loadmore = false; }
//       this.parameter.messages = res.data[0].messages.concat(this.parameter.messages);
//       console.log('new data', this.parameter.messages);
//     });
//   }

//   // sendMessage() {
//   //   if (this.model.message_type === 1 && !this.model.message) {
//   //     swal('Error', 'Please enter some text.', 'error');
//   //   } else {
//   //     this.model.conversation_id = this.parameter.conversation_id;
//   //     this.admin.postDataApi('conversation/sendMessage', this.model).subscribe(r => {
//   //       this.parameter.messages.push(r.data);
//   //       this.scrollToBottom();
//   //       this.model = new Chat;
//   //     });
//   //   }
//   // }
// }
