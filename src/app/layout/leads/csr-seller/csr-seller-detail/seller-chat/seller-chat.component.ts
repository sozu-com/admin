import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from './../../../../../services/admin.service';
import { CommonService } from './../../../../../services/common.service';
import { IProperty } from './../../../../../common/property';
import { Constant } from './../../../../../common/constants';
import { Chat } from './../../../../../models/chat.model';
import * as io from 'socket.io-client';
declare let swal: any;

@Component({
  selector: 'app-seller-chat',
  templateUrl: './seller-chat.component.html',
  styleUrls: ['./seller-chat.component.css']
})
export class SellerChatComponent implements OnInit {

  public parameter: IProperty = {};
  conversations: any = [];
  conversation: any;
  conversation_id: any;
  conversation_user_id: any;

  messages: any= [];
  message: any;
  textMessage: any;
  videoSrc: any;
  loadingMessages: any = false;
  loadingConversation: any = false;

  socket: any;
  socket_id: any;
  connected: any;
  loginData: any;
  loginData$$: any;
  /**************/

  admin_id: any;

  editModel = false;
  seconds = true;
  isActive = true;
  imagePath: string;
  imgObj: Object = {
    thumbnail: '',
    original: ''
  };
  image: any;
  imgArray= [];
  durationInSec: any = 0;
  showVideo = true;
  video: any;
  videoObj: Object = {
    thumbnail: '',
    original: ''
  };
  loadmore: any= true;
  loadmoring: any= false;
  lead_id: any;
  csr_seller_id: any;

  @ViewChild('chatWin') chatWin: ElementRef;
  @ViewChild('optionsButton') optionsButton: ElementRef;

  public scrollbarOptions = { axis: 'y', theme: 'dark' };

  constructor(
    private element: ElementRef,
    public admin: AdminService,
    private cs: CommonService,
    public constant: Constant,
    private route: ActivatedRoute
    // private ts:TranslateService
  ) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.csr_seller_id = params.id;
      this.lead_id = params.user_id;
    });
    this.loginData$$ = this.admin.loginData$.subscribe(success => {
      this.admin_id = success['id'];
    });
    this.loadingConversation = true;
    this.admin.postDataApi('leads/sellers', {csr_seller_id: this.csr_seller_id}).subscribe(r => {
      console.log('seelers', r);
      this.conversations = r['data'];
      if (this.conversations.length > 0) {
        this.initSocket();
        this.selectConversation(this.conversations[0], this.lead_id);
      }
      this.loadingConversation = false;
    });
  }

  selectConversation(conversation, user_id) {

    this.parameter.name = conversation.name;
    this.parameter.image = conversation.image;
    this.parameter.dialCode = conversation.dial_code;
    this.parameter.phone = conversation.phone;

    const data1 = {
      lead_id: this.lead_id,
      other_id: user_id ? user_id : conversation.id,
      other_sent_as: this.constant.userType.user_seller_dev,
      sent_as: this.constant.userType.csr_seller
    };
    this.parameter.loading = true;
    this.admin.postDataApi('conversation/getLeadConversation', data1).subscribe(res => {
      this.parameter.loading = false;
      console.log('===========', res);
      if (res.data) {

        this.conversation = res.data;
        this.conversation_id = res.data[0].id;

        this.loadmore = true;
        this.conversations.map(con => {
          con.selected = false;
          if (con === conversation) {
            con.selected = true;
            // this.conversation_id = con.id;
          }
        });


        const data = {
            sent_as: this.constant.userType.inhouse_broker,
            lead_id: this.lead_id,
            conversation_id: this.conversation_id
          };

          this.loadingMessages = true;
          this.admin.postDataApi('conversation/getMessages', data).subscribe(r => {
            console.log(r);
            this.messages = r.data[0].messages;
            // this.messages.map(r=>{
            //   r.loading = true;
            //   return r;
            // });
            if (this.messages.length < 30) {this.loadmore = false; }
            this.loadingMessages = false;
            setTimeout(() => {
              this.scrollToBottom();
            }, 200);
          });
      }
    }, error => {
      this.parameter.loading = false;
    });
  }


  public initSocket(): void {
      // this.socket = io.connect(environment.socket_url,{
      //   extraHeaders: {
      //     Authorization: "Bearer authorization_token_here"
      //   }
      // });
      this.socket = io.connect(this.admin.socketUrl);
      this.socket.on('connect', fun => {
        this.socket_id = this.socket.id;
        this.connected = this.socket.connected;

        const data = {
          admin_id: this.admin_id,
          socket_id: this.socket_id,
          device_id: this.admin.deviceId + '_' + this.admin_id
        };
        if (this.connected) {
          // console.log('Socket Connected', this.socket_id, data);

          this.socket.emit('add-admin', data, (res: any) => {
            // console.log('res', res);
          });

          this.socket.on('message', (response: any) => {
          if (response.data.conversation_id === this.conversation_id) {
            // console.log('Message received');
            this.messages.push(response.data);
            setTimeout(() => {
              this.scrollToBottom();
            }, 200);
          }
          });
        }
      });
  }

  scrollToBottom() {
    if (this.chatWin) {
      $('.chat-area').mCustomScrollbar('scrollTo', 'bottom', {scrollInertia: 0});
    }
  }

  onSelectFile(param, event) {
    this.optionsButton.nativeElement.click();
    if (event.target.files[0].size > this.constant.fileSizeLimit) {
      swal('Error', this.constant.errorMsg.FILE_SIZE_EXCEEDS, 'error');
      return false;
    }

    const model = new Chat;
    model.message = this.textMessage;
    model.message_type = 2;
    model.loading = true;
    model.uid = Math.random().toString(36).substr(2, 15);
    model.conversation_id =  this.conversation_id;
    model.conversation_user = {admin_id: this.admin_id};
    const d = new Date();
    model.updated_at = d.toUTCString();
    this.messages.push(model);

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

  saveAttachment(event) {
    this.optionsButton.nativeElement.click();

    if (event.target.files[0].size > this.constant.fileSizeLimit) {
      swal('Error', this.constant.errorMsg.FILE_SIZE_EXCEEDS, 'error');
      return false;
    }

    const model = new Chat;
    model.message = this.textMessage;
    model.message_type = 4;
    model.loading = true;
    model.uid = Math.random().toString(36).substr(2, 15);
    model.conversation_id =  this.conversation_id;
    model.conversation_user = {admin_id: this.admin_id};
    model.attachment_name = event.target.files[0].name;
    const d = new Date();
    model.updated_at = d.toUTCString();
    this.messages.push(model);

    setTimeout(() => {
      this.scrollToBottom();
    }, 100);

    this.cs.saveAttachment(event.target.files[0]).subscribe(
      success => {
        model.attachment = success['data'].name;
        // console.log('==>', model);
        this.sendMessage(model);
      }
    );
  }

  playVideo(i) {
    this.messages[i].play = true;
  }


  showCanvas(event) {
    this.optionsButton.nativeElement.click();

    if (event.target.files[0].size > this.constant.fileSizeLimit) {
      swal('Error', this.constant.errorMsg.FILE_SIZE_EXCEEDS, 'error');
      return false;
    }

    this.showVideo = true;
    const model = new Chat;
    model.message = this.textMessage;
    model.message_type = 3;
    model.loading = true;
    model.uid = Math.random().toString(36).substr(2, 15);
    model.conversation_id =  this.conversation_id;
    model.conversation_user = {admin_id: this.admin_id};
    const d = new Date();
    model.updated_at = d.toUTCString();
    this.messages.push(model);


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
            // setTimeout(() => {
            //   // create canvas at middle of video
            //   this.newcanvas(videoTest, event.target.files[0], model);
            // }, (this.durationInSec / 2).toFixed(0));
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

  newcanvas(video, videoFile, model) {

    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    // console.log(canvas);
    const ss = canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight,
                                                      0, 0, canvas.width, canvas.height);

    const ImageURL = canvas.toDataURL('image/jpeg');
    model.image = ImageURL;
    // console.log(model);
    const fileToUpload = this.dataURLtoFile(ImageURL, 'tempFile.png');
    this.cs.saveVideo(videoFile, fileToUpload).subscribe(
      success => {
        // console.log('image', success);
        model.video = success['data'].video;
        model.image = success['data'].thumb;
        this.sendMessage(model);
      }
      //  error => {
      //   console.log(error);
      // }
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

  setText() {
    if (!this.textMessage) {
      return false;
    } else if ((Object.keys(this.admin.admin_acl).length !== 0 && this.admin.admin_acl['Broker Lead Management'].can_update === 0) ||
    this.admin.permissions.can_in_house_broker === 0) {
        return false;
    } else {
      const model = new Chat;
      model.message = this.textMessage;
      model.message_type = 1;
      model.loading = true;
      model.uid = Math.random().toString(36).substr(2, 15);
      model.conversation_id =  this.conversation_id;
      model.conversation_user = {admin_id: this.admin_id};
      const d = new Date();
      model.updated_at = d.toUTCString();
      this.messages.push(model);
      this.textMessage = '';
      this.sendMessage(model);
    }
  }

  sendMessage(model) {
    if (model.message_type === 1 && !model.message) {
      swal('Error', 'Please enter some text.', 'error');
    } else {

      setTimeout(() => {
        this.scrollToBottom();
      }, 100);

      // console.log('Appending', model);
      this.admin.postDataApi('conversation/sendMessage', model).subscribe(r => {
        // console.log('sendMessage', r);
        if (model.loading == true){
          model.loading = false;
          const foundIndex = this.messages.findIndex(x => x.uid == model.uid);
          this.messages[foundIndex] = r['data'];
        }
        setTimeout(() => {
          this.scrollToBottom();
        }, 100);

      });
    }
  }

  loadMore() {
    this.loadmoring = true;
    const data = {
      sent_as: 2,
      conversation_id: this.conversation_id,
      lead_id: this.lead_id,
      last_message_id: this.messages[0].id
    };
    // console.log(data);
    this.admin.postDataApi('conversation/getMessages', data).subscribe(res => {
      // console.log(res);
      this.loadmoring = false;
      if (res['data'].length < 30) {this.loadmore = false; }
      this.messages = res['data'].concat(this.messages);
    }
    // error => {}
    );
  }

  sendProperty(property){
    console.log('M=>', property);
    const model = new Chat;
    model.message = property.configuration.name + ' in ' + property.building.name;
    model.message_type = 5;
    model.property_id = property.id;
    model.image = property.image;
    model.property_url = property.property_url;
    model.loading = true;
    model.updated_at = new Date();
    model.uid = Math.random().toString(36).substr(2, 15);
    model.conversation_id =  this.conversation_id;
    model.conversation_user = {admin_id: this.admin_id};
    this.messages.push(model);
    this.sendMessage(model);
  }

  onDestroy(){
    if (this.loginData$$){
      this.loginData$$.unsubscribe();
    }
  }

}
