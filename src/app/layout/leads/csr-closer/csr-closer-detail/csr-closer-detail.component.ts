import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { AdminService } from '../../../../services/admin.service';
import { CommonService } from '../../../../services/common.service';
import { IProperty } from '../../../../common/property';
import * as io from 'socket.io-client';
import { Constant } from './../../../../common/constants';
import { SelectedProperties, BankAssigned, NotaryAssigned } from './../../../../models/leads.model';
import { Chat } from '../../../../models/chat.model';
declare let swal: any;

@Component({
  selector: 'app-csr-closer-detail',
  templateUrl: './csr-closer-detail.component.html',
  styleUrls: ['./csr-closer-detail.component.css'],
  providers: [SelectedProperties, BankAssigned, NotaryAssigned, Chat]
})

export class CsrCloserDetailComponent implements OnInit, OnDestroy {

  @ViewChild('showBanks') showBanks: ElementRef;
  @ViewChild('hideBanks') hideBanks: ElementRef;

  @ViewChild('showNotaries') showNotaries: ElementRef;
  @ViewChild('hideNotaries') hideNotaries: ElementRef;

  public parameter: IProperty = {};

  id: any;

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
  imgArray= [];
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
  chat_admin_sent_as = this.constant.userType.user_seller_dev;
  loadmore= true;
  loadmoring: any = false;
  admin_id: string;

  @ViewChild('chatWin') chatWin: ElementRef;
  @ViewChild('optionsButton') optionsButton: ElementRef;
  public scrollbarOptions = { axis: 'y', theme: 'dark' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private admin: AdminService,
    private cs: CommonService,
    public constant: Constant,
    public selectedProperties: SelectedProperties,
    public bankModel: BankAssigned,
    public notaryModel: NotaryAssigned,
    public model: Chat,
    private element: ElementRef
  ) { }

  ngOnInit() {
    this.parameter.sent_as = 3;

    this.admin.loginData$.subscribe(success => {
      this.admin_id = success['id'];
    });
    this.route.params.subscribe( params => {
      this.parameter.lead_id = params.id;
      this.admin.postDataApi('leads/details', {lead_id: this.parameter.lead_id, sent_as: this.parameter.sent_as}).subscribe(r => {
        console.log('lead details', r);
        this.getDocumentOptions();
        this.parameter.lead = r.data.lead;
        this.selectedProperties = r.data.lead.selected_properties[0];
        this.parameter.user_id = this.parameter.lead.user.id;
        console.log('selected property', this.selectedProperties);



        // chatting
        // this.chat_buyer = r.data.lead.user;
        // this.chat_seller = r.data.lead.noataries[0];
        // this.chat_bank = r.data.lead.banks[0];

        // this.lead.all_documents.map(item=>{
        //   if(this.lead_property.selected_documents.find(f=>item.id == f.id)){
        //     item.selected = true;
        //   }else{
        //     item.selected = false;
        //   }
        // });
        // this.getLeadConversation(8);
      });
    });
  }

  ngOnDestroy() {
    // this.parameter.subscriber.uns
  }

  getNotaries(property_id) {
    this.notaryModel.property_id = property_id;
    this.notaryModel.lead_id = this.parameter.lead_id;
    this.admin.postDataApi('getNoataries', {}).subscribe(r => {
      console.log('getNoataries', r);
      this.showNotaries.nativeElement.click();
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
    console.log('====', notary);
    this.notaryModel.noatary_id = notary.id;
    console.log('==', this.notaryModel);
    swal({
      html: this.constant.title.ARE_YOU_SURE + '<br>' + 'You want to assign this notary?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      alert('csdfsdf');
      if (result.value) {
        this.selectedProperties.noataries = [notary];
        // this.hideNotaries.nativeElement.click();
        this.admin.postDataApi('leads/assignNoatary', this.notaryModel).subscribe(r => {
          console.log('assignBank', r);
          swal('Success', 'Notary is assigned successfully.', 'success');
          this.notaryModel = new NotaryAssigned();
          this.hideNotaries.nativeElement.click();
        });
      } else if (result.dismiss === 'cancel') {
        alert('c');
     }else {
      alert('ca');
      }
    }, function(dismiss){
      alert('csfd');
    }
      // if(dismiss == 'cancel'){
      //     // function when cancel button is clicked
      // }
      );
  }

  getBanks(property_id) {
    this.bankModel.property_id = property_id;
    this.bankModel.lead_id = this.parameter.lead_id;
    this.admin.postDataApi('getBanks', {}).subscribe(r => {
      console.log('getbanks', r);
      this.showBanks.nativeElement.click();
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
    swal({
      html: this.constant.title.ARE_YOU_SURE + '<br>' + 'You want to assign this bank?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.selectedProperties.banks = [bank];
        // this.hideBanks.nativeElement.click();
        this.admin.postDataApi('leads/assignBank', this.bankModel).subscribe(r => {
          console.log('assignBank', r);
          swal('Success', 'Bank is assigned successfully.', 'success');
          this.bankModel = new BankAssigned();
          this.hideBanks.nativeElement.click();
        });
      }
    });
  }

  setValue(i) {
    console.log('ss', i, this.selectedProperties.allDocuments);
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
    this.admin.postDataApi('conversation/block', {lead_id: this.id}).subscribe(r => {
      console.log(r);
    });
  }

  updateDocumentChecklist() {
    const ids = this.selectedProperties.allDocuments.filter(d => d.is_selected === 1);
    const documents_ids = ids.map(d => d.id);
    console.log('selected', this.selectedProperties);
    console.log('ids', ids, documents_ids);
    const input = {
      lead_id: this.parameter.lead_id,
      property_id: this.selectedProperties.property_id,
      documents: documents_ids
    };
    this.admin.postDataApi('leads/updateDocumentChecklist', input).subscribe(r => {
      console.log('updateDocumentChecklist', r);
    }
  );
  }

  noDocumentUploaded() {
    swal('Error', 'No document uploaded yet.', 'error');
  }

  viewPropertyDetails(property) {
    this.cs.setPropertyDetails(property);
    this.router.navigate(['/dashboard/properties/details/' + property.property_id]);
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
      console.log(res);
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
      // this.mCustomScrollbar;
      // this.chatWin.nativeElement.scrollTop = this.chatWin.nativeElement.scrollHeight;
    }
  }

  updateModel(param) {
    console.log('param', param);
    this.model[param] = '';
    this.model.message_type = 1;
  }

  onSelectFile(param, event) {
    this.optionsButton.nativeElement.click();
    this.model.conversation_id =  this.conversation_id;
    this.model.loading = true;
    this.messages.push(this.model);
    setTimeout(() => {
      this.scrollToBottom();
    }, 100);

    if (event.target.files && event.target.files[0]) {
      this.model.message_type = 2;
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
    this.model.conversation_id =  this.conversation_id;
    this.model.loading = true;
    this.model.message_type = 4;
    this.messages.push(this.model);
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
    this.messages[i].play = true;
  }


  showCanvas(event) {
    this.optionsButton.nativeElement.click();
    this.showVideo = true;
    this.model.message_type = 3;
    this.model.conversation_id =  this.conversation_id;
    this.model.loading = true;
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
      // setTimeout(() => {
      //   this.newcanvas(videoTest, event.target.files[0]);
      // }, 4000);
    }, 1000);
  }

  newcanvas(video, videoFile) {

    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    console.log(canvas);
    const ss = canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight,
                                                      0, 0, canvas.width, canvas.height);

    const ImageURL = canvas.toDataURL('image/jpeg');
    this.model.image = ImageURL;
    this.messages.push(this.model);
    console.log(this.model);
    const fileToUpload = this.dataURLtoFile(ImageURL, 'tempFile.png');
    console.log(videoFile, fileToUpload);
    this.cs.saveVideo(videoFile, fileToUpload).subscribe(
      success => {
        console.log('image', success);
        this.model.video = success['data'].video;
        this.model.image = success['data'].thumb;
        this.sendMessage();
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

  sendMessage() {
    if (this.model.message_type === 1 && !this.model.message) {
      swal('Error', 'Please enter some text.', 'error');
    } else {

      this.admin.postDataApi('/user/conversation/sendMessage', this.model).subscribe(r => {
        console.log('sendMessage', r);
        setTimeout(() => {
          this.scrollToBottom();
        }, 200);
        if (this.model.loading === true) {
          this.model.loading = false;
          this.messages.splice(-1, 1);
          this.messages.push(r['data']);
        }else {
          this.messages.push(r['data']);
        }
        this.model = new Chat;
        this.model.conversation_user.admin_id = this.loginData.id;
      }
      // error=>{
      //   swal('Error',error.error.message,'error');
      // }
      );
    }

  }

  uploadDocument(event) {
    const file = event.target.files[0];
    console.log(file);

    const input = new FormData();
    input.append('lead_id', this.params.lead_id);
    input.append('property_id', this.params.property_id);
    input.append('attachment', file);
    input.append('attachment_name', file.name);

    this.admin.postDataApi('uploadDealDocument', input).subscribe(r => {
      console.log(r);
      swal('Success', 'Successfully uploaded the document', 'success');
    }
    // ,error=>{
    //   swal('Error',error.error.message,'error');
    // }
    );
  }

  getLeadConversation(admin_sent_as) {
    this.chat_admin_sent_as = admin_sent_as;
    // if (admin_sent_as === 8) {
    //   this.chat_admin = this.chat_seller;
    // }
    // if (admin_sent_as === 7) {
    //   this.chat_admin = this.chat_buyer;
    // }
    // console.log(this.chat_admin);
    // const data = {
    //   lead_id: 1, // this.lead.id,
    //   admin_sent_as: admin_sent_as,
    //   admin_id: this.chat_admin.id
    // };

    // this.admin.postDataApi('/user/getLeadConversation', data).subscribe(r => {
    //   console.log(r);
    //   if (r['data']) {
    //     this.conversation_id = r['data'][0].id;
    //     this.model.conversation_id = this.conversation_id;
    //     this.messages = r['data'][0].messages;
    //   }
    // });
  }

  loadMore() {
    this.loadmoring = true;
    const data = {
      sent_as: 7,
      conversation_id: this.conversation_id,
      last_message_id: this.messages[0].id
    };
    console.log(data);
    this.admin.postDataApi('/user/conversation/getMessages', data).subscribe(res => {
      console.log(res);
      this.loadmoring = false;
      if (res['data'].length < 30) {this.loadmore = false; }
      this.messages = res['data'].concat(this.messages);

    }
    // error => {
    // }
    );
  }
}
