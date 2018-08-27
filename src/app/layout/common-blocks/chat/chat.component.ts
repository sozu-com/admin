import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { AdminService } from './../../../services/admin.service';
import { IProperty } from './../../../common/property';
import * as io from 'socket.io-client';
import { Constant } from './../../../common/constants';
declare let swal: any;
// import * as $ from 'jquery';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [Constant]
})

export class ChatComponent implements OnInit {
  @Input('admin_id') admin_id;
  @Input('lead_id') lead_id;
  @Input('user_id') user_id;
  @ViewChild('malihuScrollBar') malihuScrollBar: ElementRef;

  message: any;

  public scrollbarOptions = { axis: 'y', theme: 'dark', scrollInertia: 0, scrollbar: 'bottom', scrollbarPosition: 'inside' };
  public parameter: IProperty = {};

  constructor(
    private admin: AdminService,
    private constant: Constant
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.getMessages();
      this.initSocket();
    }, 1000);
  }

  getMessages() {
    this.parameter.loading = true;
    this.admin.postDataApi('conversation/getMessages',
    {lead_id: this.lead_id, user_id: this.user_id}).subscribe(res => {
      console.log('getMessages', res);
      this.parameter.messages = res.data[0].messages;
      this.parameter.conversation_id = res.data[0].id;
      this.parameter.loading = false;
      this.scrollToBottom();
    });
  }

  public initSocket(): void {
    this.parameter.socket = io.connect(this.admin.socketUrl);
    this.parameter.socket.on('connect', fun => {
      this.parameter.socket_id = this.parameter.socket.id;
      this.parameter.connected = this.parameter.socket.connected;

      const data = {
        admin_id: this.admin_id,
        socket_id: this.parameter.socket_id,
      };
      console.log('add-admin-data', data);
      if (this.parameter.connected) {
        console.log('Socket Connected', this.parameter.socket_id);
        this.parameter.socket.emit('add-admin', data, (res: any) => {
          console.log('add-admin', res);
        });
        this.parameter.socket.on('message', (response: any) => {
          if (response.data.conversation_id === this.parameter.conversation_id) {
            console.log('message socket');
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

  sendMessage() {
    console.log('conversation_id', this.parameter.conversation_id);
    if (this.message) {
      this.admin.postDataApi('conversation/sendMessage',
      {conversation_id: this.parameter.conversation_id, message: this.message}).subscribe(r => {
        console.log('conversation/sendMessage', r);
        this.parameter.messages.push(r.data);
        this.scrollToBottom();
        this.message = '';
      });
    } else {
      swal('Error', 'Please enter some text.', 'error');
    }
  }
}
