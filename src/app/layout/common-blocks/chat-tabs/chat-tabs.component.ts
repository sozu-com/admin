import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as io from 'socket.io-client';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProperty } from 'src/app/common/property';
import { Chat } from 'src/app/models/chat.model';
import { ScheduleMeeting, NotaryAssigned, BankAssigned, SelectedProperties } from 'src/app/models/leads.model';
import { AdminService } from 'src/app/services/admin.service';
import { CommonService } from 'src/app/services/common.service';
import { Constant } from 'src/app/common/constants';
declare let swal: any;

@Component({
  selector: 'app-chat-tabs',
  templateUrl: './chat-tabs.component.html',
  styleUrls: ['./chat-tabs.component.css']
})

export class ChatTabsComponent implements OnInit {
  @Input('admin_id') admin_id;
  @Input('lead_id') lead_id;
  @Input('user_id') user_id;
  @Input('sent_as') sent_as;
  @Input('other_sent_as') other_sent_as;
  @Input('leadData') leadData;

  public parameter: IProperty = {};
  show = false;
  videoSrc: any;
  id: any;
  textMessage: any;
  conversations: any = [];
  conversation: any;
  conversation_id: any;
  conversation_user_id: any;

  messages: any = [];
  message: any;
  loadingMessages: any = false;
  loadingConversation: any = false;

  socket: any;
  socket_id: any;
  connected: any;
  loginData: any;

  /**************/

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
  durationInSec = 0;
  showVideo = true;
  video: any;
  videoObj: Object = {
    thumbnail: '',
    original: ''
  };
  params: any;

  chat_closer: any;
  chat_notary: any;
  chat_bank: any;
  chat_admin: any;
  chat_seller: any;
  chat_buyer: any;
  chat_csr_buyer: any;
  chat_admin_sent_as = this.constant.userType.user_buyer;
  loadmore = true;
  loadmoring: any = false;
  // admin_id: string;
  showInput: false;
  pen_amount = 0;
  keyword: string;
  @ViewChild('chatWin') chatWin: ElementRef;
  @ViewChild('optionsButton') optionsButton: ElementRef;
  public scrollbarOptions = { axis: 'y', theme: 'dark' };

  model: Chat;
  selectedProperties: SelectedProperties;
  constructor(
    public admin: AdminService,
    private cs: CommonService,
    public constant: Constant,
    // public scheduleMeeting: ScheduleMeeting,
    // public bankModel: BankAssigned,
    // public notaryModel: NotaryAssigned,
    // public model: Chat,
    private element: ElementRef,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.model = new Chat();
    this.selectedProperties = new SelectedProperties();
    this.keyword = '';
    this.parameter.sent_as = this.constant.userType.inhouse_broker;

    setTimeout(() => {
      const input = {lead_id: this.lead_id, user_id: this.user_id, sent_as: this.sent_as};
      this.initSocket();
      this.chat_buyer = this.leadData.user;
      this.chat_seller = this.leadData.selected_properties[0].property.creator;
      this.chat_notary = this.leadData.selected_properties[0].selected_noatary[0] ?
      this.leadData.selected_properties[0].selected_noatary[0].noatary : [];
      this.chat_bank = this.leadData.selected_properties[0].banks ? this.leadData.selected_properties[0].banks[0] : [];
      this.chat_csr_buyer = this.leadData.admin;
      this.getLeadConversation(this.constant.userType.user_buyer);
    }, 100);

    // this.route.params.subscribe(params => {
    //   this.parameter.lead_id = params.id;
    //   this.spinner.show();
    //   this.admin.postDataApi('leads/details', { lead_id: this.parameter.lead_id, sent_as: this.parameter.sent_as }).subscribe(r => {
    //     this.spinner.hide();
    //     // chatting
    //     this.chat_buyer = r.data.lead.user;
    //     this.chat_seller = r.data.lead.selected_properties[0].property.creator;
    //     this.chat_notary = r.data.lead.selected_properties[0].selected_noatary[0] ?
    //       r.data.lead.selected_properties[0].selected_noatary[0].noatary : [];
    //     this.chat_bank = r.data.lead.selected_properties[0].banks ? r.data.lead.selected_properties[0].banks[0] : [];

    //     this.getLeadConversation(this.constant.userType.user_buyer);

    //   }, error => {
    //     this.spinner.hide();
    //   });
    // });
  }






  selectConversation(conversation) {
    console.log('con', conversation);
    this.conversations.map(con => {
      con.selected = false;
      if (con === conversation) {
        con.selected = true;
        this.conversation_id = con.id;
      }
    });

    this.conversation = conversation;
    console.log('con id', this.conversation_id);
    const data = {
      conversation_id: this.conversation_id
    };

    this.loadingMessages = true;
    this.admin.postDataApi('conversation/getMessages', data).subscribe(res => {
      // console.log(res);
      this.messages = res['data'];
      this.loadingMessages = false;
      setTimeout(() => {
        this.scrollToBottom();
      }, 200);
    },
      error => {
        this.loadingMessages = false;
      });

  }

  public initSocket(): void {
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
        console.log('Socket Connected', this.socket_id);

        this.socket.emit('add-admin', data, (res: any) => {
          console.log('res', res);
        });

        this.socket.on('message', (response: any) => {
          if (response.data.conversation_id === this.conversation_id) {
            console.log('Socket conversation_id');
            console.log('Socket conversation_id', this.conversation_id);
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
    // model.uid = Math.random().toString(36).substr(2, 15);
    model.conversation_id = this.conversation_id;
    model.conversation_user = { admin_id: this.admin_id };
    model.updated_at = new Date();
    this.messages.push(model);

    setTimeout(() => {
      this.scrollToBottom();
    }, 100);
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.image = e.target.result;
        model[param] = e.target.result;
        setTimeout(() => {
          this.scrollToBottom();
        }, 100);
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
    const date = new Date();
    model.updated_at = date;
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
    model.conversation_id = this.conversation_id;
    model.conversation_user = { admin_id: this.admin_id };
    const date = new Date();
    model.updated_at = date;
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
            // setTimeout(() => {
            //   // create canvas at middle of video
            //   this.newcanvas(videoTest, event.target.files[0], model);

            // }, (this.durationInSec / 2).toFixed(0));
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
    return new File([u8arr], filename, { type: mime });
  }

  setText() {
    if (!this.textMessage) {
      return false;
    } else if ((Object.keys(this.admin.admin_acl).length !== 0 && this.admin.admin_acl['Closer Lead Management'].can_update === 0)
      || this.admin.permissions.can_csr_closer === 0) {
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
      setTimeout(() => {
        this.scrollToBottom();
      }, 100);
      this.sendMessage(model);
    }
  }

  sendMessage(model) {
    if (model.message_type === 1 && !model.message) {
      swal('Error', 'Please enter some text.', 'error');
    } else {
      // setTimeout(() => {
      //   this.scrollToBottom();
      // }, 100);
      this.admin.postDataApi('conversation/sendMessage', model).subscribe(r => {
        if (model.loading === true) {
          model.loading = false;
        }
        setTimeout(() => {
          this.scrollToBottom();
        }, 100);
      });
    }
  }


  uploadDocument(event) {
    const file = event.target.files[0];
    const input = new FormData();
    input.append('lead_id', this.params.lead_id);
    input.append('property_id', this.params.property_id);
    input.append('attachment', file);
    input.append('attachment_name', file.name);

    this.admin.postDataApi('uploadDealDocument', input).subscribe(r => {
      swal('Success', 'Successfully uploaded the document', 'success');
    });
  }

  getLeadConversation(admin_sent_as: any) {
    this.chat_admin_sent_as = admin_sent_as;
    if (admin_sent_as === this.constant.userType.user_buyer) {
      this.chat_admin = this.chat_buyer;
    }
    if (admin_sent_as === this.constant.userType.user_seller_dev) {
      this.chat_admin = this.chat_seller;
    }
    if (admin_sent_as === this.constant.userType.csr_buyer) {
      this.chat_admin = this.chat_csr_buyer;
    }
    if (admin_sent_as === this.constant.userType.notary) {
      this.chat_admin = this.chat_notary;
    }
    if (admin_sent_as === this.constant.userType.bank) {
      this.chat_admin = this.chat_bank;
    }
    console.log('chat_admin', this.chat_admin);
    const data = {
      // other_id: this.chat_admin.id,
      // sent_as: this.constant.userType.csr_closer,
      lead_id: this.lead_id,
      other_sent_as: admin_sent_as, // closure chat with notary/bank
      other_id: this.chat_admin && this.chat_admin.id ? this.chat_admin.id : this.user_id,
      sent_as: this.sent_as
    };
    console.log('=========', data);
    this.spinner.show();
    this.admin.postDataApi('conversation/getLeadConversation', data).subscribe(r => {
      this.spinner.hide();
      console.log('conversation/getLeadConversation', r);
      if (r['data']) {
        this.conversation_id = r['data'][0].id;
        this.initSocket();
        this.model.conversation_id = this.conversation_id;
        this.messages = r['data'][0].messages;
        setTimeout(() => {
          this.scrollToBottom();
        }, 100);
      }
    }, error => {
      this.spinner.hide();
    });
  }

  loadMore() {
    this.loadmoring = true;
    const data = {
      sent_as: 2,
      conversation_id: this.conversation_id,
      lead_id: this.parameter.lead_id,
      last_message_id: this.messages[0].id
    };
    // console.log(data);
    this.admin.postDataApi('conversation/getMessages', data).subscribe(res => {
      // console.log(res);
      this.loadmoring = false;
      if (res['data'].length < 30) { this.loadmore = false; }
      this.messages = res['data'].concat(this.messages);
    }
      // error => {}
    );
  }

  sendProperty(property) {
    const model = new Chat;
    model.message = property.configuration.name + ' in ' + property.building.name;
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

}
