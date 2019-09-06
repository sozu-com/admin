import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as io from 'socket.io-client';
import { NgxSpinnerService } from 'ngx-spinner';
import { Chat } from 'src/app/models/chat.model';
import { Constant } from 'src/app/common/constants';
import { IProperty } from 'src/app/common/property';
import { AdminService } from 'src/app/services/admin.service';
import { CommonService } from 'src/app/services/common.service';
declare let swal: any;

@Component({
  selector: 'app-my-chat',
  templateUrl: './my-chat.component.html',
  styleUrls: ['./my-chat.component.css'],
  providers: [Chat, Constant]
})
export class MyChatComponent implements OnInit {

  public parameter: IProperty = {};
  type: string;
  conversations: any = [];
  conversation: any;
  conversation_id: any;
  conversation_user_id: any;

  messages: any = [];
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
  imgArray = [];
  durationInSec: any = 0;
  showVideo = true;
  video: any;
  videoObj: Object = {
    thumbnail: '',
    original: ''
  };
  loadmore: any = true;
  loadmoring: any = false;
  lead_id: any;

  @ViewChild('chatWin') chatWin: ElementRef;
  @ViewChild('optionsButton') optionsButton: ElementRef;
  @ViewChild('msgInput1') msgInput1: ElementRef;
  public scrollbarOptions = { axis: 'y', theme: 'dark' };

  constructor(
    private element: ElementRef,
    public admin: AdminService,
    private cs: CommonService,
    public constant: Constant,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.loginData$$ = this.admin.loginData$.subscribe(success => {
      this.admin_id = success['id'];
    });
    this.route.params.subscribe(params => {
      this.lead_id = params.id;
      this.type = params.type;
      this.loadingConversation = true;
      // chat with seller
      if (this.type === '1') {
        this.admin.postDataApi('leads/developers', { lead_id: this.lead_id }).subscribe(r => {
          this.conversations = r['data'];
          if (this.conversations.length > 0) {
            this.initSocket();
            for (let index = 0; index < this.conversations.length; index++) {
              if (this.conversations[index].id.toString() === this.lead_id) {
                this.selectConversation(this.conversations[index]);
              }
            }
          }
          this.loadingConversation = false;
        });
      } else {
        // chat with csr seller
        this.admin.postDataApi('leads/leadCsrSellers', { lead_id: this.lead_id }).subscribe(r => {
          this.conversations = r['data'];
          if (this.conversations.length > 0) {
            this.initSocket();
            this.selectConversation(this.conversations[0]);
          }
          this.loadingConversation = false;
        });
      }
    });
    // setTimeout(() => {
    // this.msgInput1.nativeElement.focus();
    // }, 1000);
  }

  selectConversation(conversation) {

    this.parameter.name = conversation.name;
    this.parameter.image = conversation.image;
    this.parameter.dialCode = conversation.dial_code;
    this.parameter.phone = conversation.phone;

    const data1 = {
      lead_id: this.lead_id,
      other_id: conversation.id,
      other_sent_as: this.type === '1' ? this.constant.userType.user_seller_dev : this.constant.userType.csr_seller,
      sent_as: this.constant.userType.inhouse_broker
    };
    this.spinner.show();
    this.admin.postDataApi('conversation/getLeadConversation', data1).subscribe(res => {
      this.spinner.hide();
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
          this.messages = r.data[0].messages;
          // this.messages.map(r=>{
          //   r.loading = true;
          //   return r;
          // });
          if (this.messages.length < 30) { this.loadmore = false; }
          this.loadingMessages = false;
          setTimeout(() => {
            this.scrollToBottom();
          }, 200);
        });
      }
    }, error => {
      this.spinner.hide();
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
      $('.chat-area').mCustomScrollbar('scrollTo', 'bottom', { scrollInertia: 0 });
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
    model.conversation_id = this.conversation_id;
    model.conversation_user = { admin_id: this.admin_id };
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
    model.conversation_id = this.conversation_id;
    model.conversation_user = { admin_id: this.admin_id };
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
    model.conversation_id = this.conversation_id;
    model.conversation_user = { admin_id: this.admin_id };
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
      reader.onload = function (e) {
        const src = e.target['result'];
        videoTest.src = src;
        const timer = setInterval(() => {
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
    }, 1000);
  }

  newcanvas(video, videoFile, model) {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ss = canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight,
      0, 0, canvas.width, canvas.height);

    const ImageURL = canvas.toDataURL('image/jpeg');
    model.image = ImageURL;
    const fileToUpload = this.dataURLtoFile(ImageURL, 'tempFile.png');
    this.cs.saveVideo(videoFile, fileToUpload).subscribe(
      success => {
        model.video = success['data'].video;
        model.image = success['data'].thumb;
        this.sendMessage(model);
      });
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
    return new File([u8arr], filename, { type: mime });
  }

  setText() {
    if (!this.textMessage || !this.textMessage.trim()) {
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
      model.conversation_id = this.conversation_id;
      model.conversation_user = { admin_id: this.admin_id };
      const d = new Date();
      model.updated_at = d.toUTCString();
      this.messages.push(model);
      this.textMessage = '';
      this.sendMessage(model);
    }
  }

  sendMessage(model) {
    model.sent_as = this.constant.userType.inhouse_broker;
    if (model.message_type === 1 && !model.message) {
      swal('Error', 'Please enter some text.', 'error');
    } else {

      setTimeout(() => {
        this.scrollToBottom();
      }, 100);

      this.admin.postDataApi('conversation/sendMessage', model).subscribe(r => {
        if (model.loading == true) {
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
      sent_as: this.constant.userType.inhouse_broker,
      conversation_id: this.conversation_id,
      lead_id: this.lead_id,
      last_message_id: this.messages[0].id
    };
    this.admin.postDataApi('conversation/getMessages', data).subscribe(res => {
      this.loadmoring = false;
      if (res['data'].length < 30) { this.loadmore = false; }
      this.messages = res['data'].concat(this.messages);
    });
  }

  sendProperty(property) {
    const model = new Chat;
    model.message = property.name + ' with ';
    if (property.configuration.bedroom) {
      model.message += property.configuration.bedroom + ' Bed ';
    }
    if (property.configuration.bathroom) {
      model.message += this.constant.middleDot + property.configuration.bathroom + ' Bath';
    }
    if (property.configuration.half_bathroom) {
      model.message += this.constant.middleDot + property.configuration.half_bathroom + ' Half Bath';
    }
    if (property.property_type.name) {
      model.message += this.constant.middleDot + property.property_type.name;
    }
    model.message += ' in ' + property.building.name;

    model.message_type = 5;
    model.property_id = property.id;
    model.image = property.image;
    model.property_url = property.property_url;
    model.loading = true;
    model.updated_at = new Date();
    model.uid = Math.random().toString(36).substr(2, 15);
    model.conversation_id = this.conversation_id;
    model.conversation_user = { admin_id: this.admin_id };
    this.messages.push(model);
    this.sendMessage(model);
  }

  onDestroy() {
    if (this.loginData$$) {
      this.loginData$$.unsubscribe();
    }
  }
}
