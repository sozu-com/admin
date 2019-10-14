import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as io from 'socket.io-client';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProperty } from 'src/app/common/property';
import { Chat } from 'src/app/models/chat.model';
import { ScheduleMeeting, NotaryAssigned, BankAssigned, SelectedProperties, Leads } from 'src/app/models/leads.model';
import { AdminService } from 'src/app/services/admin.service';
import { CommonService } from 'src/app/services/common.service';
import { Constant } from 'src/app/common/constants';
import { LeadsService } from 'src/app/services/leads.service';
import { TranslateService } from '@ngx-translate/core';
declare let swal: any;

@Component({
  selector: 'app-csr-closer-detail',
  templateUrl: './csr-closer-detail.component.html',
  styleUrls: ['./csr-closer-detail.component.css'],
  providers: [SelectedProperties, BankAssigned, NotaryAssigned, Chat, ScheduleMeeting]
})

export class CsrCloserDetailComponent implements OnInit, OnDestroy {
  @ViewChild('modalClose1') modalClose1: ElementRef;
  @ViewChild('modalClose2') modalClose2: ElementRef;
  @ViewChild('showBanks') showBanks: ElementRef;
  @ViewChild('hideBanks') hideBanks: ElementRef;

  @ViewChild('showNotaries') showNotaries: ElementRef;
  @ViewChild('hideNotaries') hideNotaries: ElementRef;
  @ViewChild('msgInput') msgInput: ElementRef;
  public parameter: IProperty = {};
  // meetingDate: any = {
  //   appointment_date: '',
  //   id: ''
  // };
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
  chat_admin_sent_as = this.constant.userType.user_buyer;
  loadmore = true;
  loadmoring: any = false;
  admin_id: string;
  showInput: false;
  pen_amount = 0;
  leadData: Leads;
  keyword: string;
  @ViewChild('chatWin') chatWin: ElementRef;
  @ViewChild('optionsButton') optionsButton: ElementRef;
  public scrollbarOptions = { axis: 'y', theme: 'dark' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public admin: AdminService,
    private cs: CommonService,
    public constant: Constant,
    public selectedProperties: SelectedProperties,
    public scheduleMeeting: ScheduleMeeting,
    public bankModel: BankAssigned,
    public notaryModel: NotaryAssigned,
    public model: Chat,
    private element: ElementRef,
    private spinner: NgxSpinnerService,
    public leadsService: LeadsService,
    private translate: TranslateService
  ) {
    this.admin.loginData$.subscribe(success => {
      this.parameter.admin_id = success['id'];
    });
  }

  closeModal1() {
    this.modalClose1.nativeElement.click();
  }

  closeModal2() {
    this.modalClose2.nativeElement.click();
  }

  ngOnInit() {
    // this.msgInput.nativeElement.focus();
    this.keyword = '';
    this.leadData = new Leads();
    // this.leadsService.leadData = this.leadsService.leadData;
    this.leadData.selected_properties = [new SelectedProperties()];
    this.parameter.sent_as = this.constant.userType.csr_closer;

    this.route.params.subscribe(params => {
      this.parameter.lead_id = params.id;
      this.spinner.show();
      this.admin.postDataApi('leads/details', { lead_id: this.parameter.lead_id, sent_as: this.parameter.sent_as }).subscribe(r => {
        this.spinner.hide();
        this.leadData = r.data.lead;
        this.getDocumentOptions();
        this.selectedProperties = r.data.lead.selected_properties[0];
        this.pen_amount = this.selectedProperties.pending_amount ?
          this.selectedProperties.pending_amount :
          (this.selectedProperties.total_amount - this.selectedProperties.token_money);
        this.parameter.user_id = this.leadData.user.id;

        if (this.leadData.appointments.length !== 0) {
          this.scheduleMeeting = this.leadData.appointments[0];
        }
        // if (this.leadData.appointments && this.leadData.appointments.length !== 0) {
        //   for (let index = 0; index < this.leadData.appointments.length; index++) {
        //     const element = this.leadData.appointments[index];
        //     if (element.sent_as === this.constant.userType.csr_closer) {
        //       this.meetingDate = {
        //         appointment_date: element.appointment_date,
        //         id: element.id
        //       };
        //       this.scheduleMeeting = this.meetingDate;
        //     }
        //   }
        // }

        // chatting
        this.chat_buyer = r.data.lead.user;
        this.chat_seller = r.data.lead.selected_properties[0].property.creator;
        this.chat_notary = r.data.lead.selected_properties[0].selected_noatary[0] ?
          r.data.lead.selected_properties[0].selected_noatary[0].noatary : [];
        this.chat_bank = r.data.lead.selected_properties[0].banks ? r.data.lead.selected_properties[0].banks[0] : [];

        this.getLeadConversation(this.constant.userType.user_buyer, false);
        // this.chat_bank = r.data.lead.banks[0];

        // this.lead.all_documents.map(item=>{
        //   if(this.lead_property.selected_documents.find(f=>item.id == f.id)){
        //     item.selected = true;
        //   }else{
        //     item.selected = false;
        //   }
        // });

      }, error => {
        this.spinner.hide();
      });
    });
  }

  ngOnDestroy() {
    // this.parameter.subscriber.uns
  }

  getNotaries(property_id: any, keyword: string, type: number) {
    if (property_id) {
      this.notaryModel.property_id = property_id;
    }
    this.notaryModel.lead_id = this.parameter.lead_id;
    const input = {keyword: ''};
    if (keyword) {
      input.keyword = keyword;
    }
    this.spinner.show();
    this.admin.postDataApi('getNoataries', input).subscribe(r => {
      this.spinner.hide();
      if (type === 1) {
        this.showNotaries.nativeElement.click();
      }
      this.parameter.items = r.data;
      for (let index = 0; index < this.parameter.items.length; index++) {
        const element = this.parameter.items[index];
        const id = this.selectedProperties.noataries[0] ? this.selectedProperties.noataries[0].id : 0;
        if (id !== 0 && element.id === id) {
          this.parameter.items.splice(index, 1);
        }
      }
    });
  }

  assignNoatary(notary) {
    this.notaryModel.noatary_id = notary.id;
    this.parameter.text = this.translate.instant('message.question.wantToAssignNotary');
    swal({
      html: this.translate.instant('message.question.areYouSure') + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        this.selectedProperties.noataries = [notary];
        this.chat_notary = notary;
        // this.chat_notary = r.data.lead.selected_properties[0].selected_noatary[0] ?
        // r.data.lead.selected_properties[0].selected_noatary[0].noatary : [];
        // this.chat_bank = r.data.lead.selected_properties[0].banks ? r.data.lead.selected_properties[0].banks[0] : [];

        this.admin.postDataApi('leads/assignNoatary', this.notaryModel).subscribe(r => {
          this.spinner.hide();
          swal('Success', this.translate.instant('message.success.notaryAssignedSuccessfully'), 'success');
          this.notaryModel = new NotaryAssigned();
          this.hideNotaries.nativeElement.click();
        }, error => {
          this.spinner.hide();
        });
      } else if (result.dismiss === 'cancel') {
        // alert('c');
      } else {
        // alert('ca');
      }
    }, function (dismiss) {
      // alert('csfd');
    }
      // if(dismiss == 'cancel'){
      //     // function when cancel button is clicked
      // }
    );
  }

  getBanks(property_id: any, keyword: string, type: number) {
    if (property_id) {
      this.bankModel.property_id = property_id;
    }
    this.bankModel.lead_id = this.parameter.lead_id;
    const input = {keyword: ''};
    if (keyword) {
      input.keyword = keyword;
    }
    this.spinner.show();
    this.admin.postDataApi('getBanks', input).subscribe(r => {
      this.spinner.hide();
      if (type === 1) {
        this.showBanks.nativeElement.click();
      }
      this.parameter.banks = r.data;
      for (let index = 0; index < this.parameter.banks.length; index++) {
        const element = this.parameter.banks[index];
        const selectedBankId = this.selectedProperties.banks[0] ? this.selectedProperties.banks[0].id : 0;
        if (selectedBankId !== 0 && element.id === selectedBankId) {
          this.parameter.banks.splice(index, 1);
        }
      }
    });
  }

  assignBank(bank) {
    this.bankModel.bank_id = bank.id;
    this.parameter.text = this.translate.instant('message.question.wantToAssignBank');
    swal({
      html: this.translate.instant('message.question.areYouSure') + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        this.selectedProperties.banks = [bank];
        this.chat_bank = bank;
        this.admin.postDataApi('leads/assignBank', this.bankModel).subscribe(r => {
          this.spinner.hide();
          swal('Success', this.translate.instant('message.success.bankAssignedSuccessfully'), 'success');
          this.bankModel = new BankAssigned();
          this.hideBanks.nativeElement.click();
        }, error => {
          this.spinner.hide();
        });
      }
    });
  }

  setValue(i) {
    this.selectedProperties.allDocuments[i].is_selected =
      this.selectedProperties.allDocuments[i].is_selected && this.selectedProperties.allDocuments[i].is_selected === 1 ? 0 : 1;
  }

  getDocumentOptions() {
    this.admin.postDataApi('getDocumentOptions', {}).subscribe(r => {
      this.selectedProperties.allDocuments = r.data;
      this.selectedProperties.allDocuments.forEach(element => {
        this.selectedProperties.selected_documents.forEach(pt => {
          if (pt.id === element.id) {
            element.is_selected = 1;
          }
        });
      });
    }
    );
  }

  blockThisLead() {
    this.admin.postDataApi('conversation/block', { lead_id: this.id }).subscribe(r => {
    });
  }

  updateDocumentChecklist() {
    const ids = this.selectedProperties.allDocuments.filter(d => d.is_selected === 1);
    const documents_ids = ids.map(d => d.id);
    const input = {
      lead_id: this.parameter.lead_id,
      property_id: this.selectedProperties.property_id,
      documents: documents_ids
    };
    this.admin.postDataApi('leads/updateDocumentChecklist', input).subscribe(r => {
      swal('Success', this.translate.instant('message.success.updatedSuccessfully'), 'success');
    }
    );
  }

  noDocumentUploaded() {
    swal('Error', this.translate.instant('message.error.noDocumentUploadedYet'), 'error');
  }

  viewPropertyDetails(property) {
    this.cs.setPropertyDetails(property);
    this.router.navigate(['/dashboard/properties/details/' + property.property_id]);
  }

  markLeadClose() {
    this.parameter.text = this.translate.instant('message.question.wantTocloseLead');
    swal({
      html: this.translate.instant('message.question.areYouSure') + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.admin.postDataApi('leads/closer-mark-lead-closed', { lead_id: this.parameter.lead_id }).subscribe(r => {
          this.leadData.lead_status_closer = 1;
          swal('Success', this.translate.instant('message.success.leadClosedSuccessfully'), 'success');
        });
      }
    });
  }








  selectConversation(conversation) {
    this.conversations.map(con => {
      con.selected = false;
      if (con === conversation) {
        con.selected = true;
        this.conversation_id = con.id;
      }
    });

    this.conversation = conversation;
    const data = {
      conversation_id: this.conversation_id
    };

    this.loadingMessages = true;
    this.admin.postDataApi('conversation/getMessages', data).subscribe(res => {
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

    // this.parameter.socket.on('connect', fun => {
    //   this.parameter.socket_id = this.parameter.socket.id;
    //   this.parameter.connected = this.parameter.socket.connected;

    //   const data = {
    //     admin_id: this.parameter.admin_id,
    //     socket_id: this.parameter.socket_id,
    //     device_id: this.admin.deviceId + '_' + this.parameter.admin_id
    //   };
    //   if (this.parameter.connected) {
    //     this.parameter.socket.emit('add-admin', data, (res: any) => {
    //     });
    //     this.parameter.socket.on('message', (response: any) => {
    //       if (response.data.conversation_id === this.parameter.conversation_id) {
    //         this.scrollToBottom();
    //         this.parameter.messages.push(response.data);
    //       }
    //     });
    //   }
    // });


    this.socket.on('connect', fun => {
      this.socket_id = this.socket.id;
      this.connected = this.socket.connected;

      const data = {
        admin_id: this.parameter.admin_id,
        socket_id: this.socket_id,
        device_id: this.admin.deviceId + '_' + this.parameter.admin_id
      };
      if (this.connected) {

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
      swal('Error', this.translate.instant('message.error.fileSizeExceeds'), 'error');
      return false;
    }

    const model = new Chat;
    model.message = this.textMessage;
    model.message_type = 2;
    model.loading = true;
    // model.uid = Math.random().toString(36).substr(2, 15);
    model.conversation_id = this.conversation_id;
    model.conversation_user = { admin_id: this.parameter.admin_id };
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
      swal('Error', this.translate.instant('message.error.fileSizeExceeds'), 'error');
      return false;
    }

    const model = new Chat;
    model.message = this.textMessage;
    model.message_type = 4;
    model.loading = true;
    model.uid = Math.random().toString(36).substr(2, 15);
    model.conversation_id = this.conversation_id;
    model.conversation_user = { admin_id: this.parameter.admin_id };
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
      swal('Error', this.translate.instant('message.error.fileSizeExceeds'), 'error');
      return false;
    }

    this.showVideo = true;
    const model = new Chat;
    model.message = this.textMessage;
    model.message_type = 3;
    model.loading = true;
    model.uid = Math.random().toString(36).substr(2, 15);
    model.conversation_id = this.conversation_id;
    model.conversation_user = { admin_id: this.parameter.admin_id };
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
      model.conversation_user = { admin_id: this.parameter.admin_id };
      const d = new Date();
      model.updated_at = d.toUTCString();
      this.messages.push(model);
      this.textMessage = '';
      setTimeout(() => {
        this.scrollToBottom();
      }, 100);
      this.sendMessage(model);


      // const model = new Chat;
      // model.message = this.textMessage;
      // model.message_type = 1;
      // model.conversation_id =  this.conversation_id;
      // model.conversation_user = {admin_id: this.admin_id};
      // model.updated_at = new Date();
      // this.messages.push(model);
      // // model.loading = true;
      // this.textMessage = '';
      // this.sendMessage(model);
    }
  }

  sendMessage(model) {
    model.sent_as = this.parameter.sent_as;
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
      swal('Success', this.translate.instant('message.success.uploadedSuccessfully'), 'success');
    });
  }

  getLeadConversation(admin_sent_as, showLoader: boolean) {
    this.chat_admin_sent_as = admin_sent_as;
    if (admin_sent_as === this.constant.userType.user_buyer) {
      this.chat_admin = this.chat_buyer;
    }
    if (admin_sent_as === this.constant.userType.user_seller_dev) {
      this.chat_admin = this.chat_seller;
    }
    if (admin_sent_as === this.constant.userType.notary) {
      this.chat_admin = this.chat_notary;
    }
    if (admin_sent_as === this.constant.userType.bank) {
      this.chat_admin = this.chat_bank;
    }
    const data = {
      lead_id: this.parameter.lead_id,
      other_sent_as: admin_sent_as,
      other_id: this.chat_admin.id,
      sent_as: this.constant.userType.csr_closer
    };

    if (showLoader) {
      this.spinner.show();
    }
    this.admin.postDataApi('conversation/getLeadConversation', data).subscribe(r => {
      this.spinner.hide();
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
      sent_as: this.constant.userType.csr_closer,
      conversation_id: this.conversation_id,
      lead_id: this.parameter.lead_id,
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
    model.message = property.name + ' ' + this.translate.instant('commonBlock.with') + ' ';
    if (property.configuration.bedroom) {
      model.message += property.configuration.bedroom + ' ' + this.translate.instant('commonBlock.bed') + ' ';
    }
    if (property.configuration.bathroom) {
      model.message += this.constant.middleDot + property.configuration.bathroom + ' ' + this.translate.instant('commonBlock.bath') + ' ';
    }
    if (property.configuration.half_bathroom) {
      model.message += this.constant.middleDot + property.configuration.half_bathroom + ' ' +
      this.translate.instant('commonBlock.halfBath') + ' ';
    }
    if (property.property_type.name) {
      model.message += this.constant.middleDot + property.property_type.name;
    }
    model.message += ' ' + this.translate.instant('commonBlock.in') + ' ' + property.building.name;

    model.message_type = 5;
    model.property_id = property.id;
    model.image = property.image;
    model.property_url = property.property_url;
    model.loading = true;
    model.updated_at = new Date();
    model.uid = Math.random().toString(36).substr(2, 15);
    model.conversation_id = this.conversation_id;
    model.conversation_user = { admin_id: this.parameter.admin_id };
    this.messages.push(model);
    this.sendMessage(model);
  }


  addAppointment(item) {
    this.parameter.text = this.translate.instant('message.question.wantToScheduleMeeting');
    swal({
      html: this.translate.instant('message.question.areYouSure') + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.scheduleMeeting.lead_id = this.parameter.lead_id;
        this.scheduleMeeting.property_id = this.selectedProperties.property_id;
        this.scheduleMeeting.appointment_date = item.date_time;
        this.scheduleMeeting.sent_as = this.constant.userType.csr_closer;

        if (this.scheduleMeeting.appointment_date) {
          this.scheduleMeeting.id = this.scheduleMeeting.id;
        }
        this.admin.postDataApi('leads/addAppointment', this.scheduleMeeting).subscribe(r => {
          this.scheduleMeeting = r.data;
          this.closeModal2();
          swal('Success', this.translate.instant('message.success.meetingScheduledSuccessfully'), 'success');
        });
      }
    });
  }

  updatePropertyAmount() {
    if (this.pen_amount > this.selectedProperties.total_amount && this.pen_amount < 0) {
      swal('Error', this.translate.instant('message.error.incorrectAmountEntered'), 'error');
      return false;
    }
    const input = {
      lead_id: this.parameter.lead_id,
      property_id: this.selectedProperties.property_id,
      pending_amount: this.pen_amount
    };
    this.admin.postDataApi('leads/updatePropertyAmount', input).subscribe(r => {
      this.showInput = false;
      this.selectedProperties.pending_amount = this.pen_amount;
      // this.leadData.lead_status_closer = 1;
      swal('Success', this.translate.instant('message.success.amountUpdatedSuccessfully'), 'success');
    });
  }
}
