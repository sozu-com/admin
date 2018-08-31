import { Component, OnInit, Input } from '@angular/core';
import { AdminService } from './../../../services/admin.service';
import { IProperty } from './../../../common/property';
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
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
  @Input('admin_id') admin_id;
  @Input('lead_id') lead_id;
  @Input('user_id') user_id;
  // @ViewChild('malihuScrollBar') malihuScrollBar: ElementRef;

  message: any;

  public scrollbarOptions = { axis: 'y', theme: 'dark', scrollInertia: 0, scrollbar: 'bottom', scrollbarPosition: 'inside' };
  public parameter: IProperty = {};

  constructor(
    private admin: AdminService
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
      if (this.parameter.connected) {
        this.parameter.socket.emit('add-admin', data, (res: any) => {
        });
        this.parameter.socket.on('message', (response: any) => {
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

  sendMessage() {
    if (this.message) {
      this.admin.postDataApi('conversation/sendMessage',
      {conversation_id: this.parameter.conversation_id, message: this.message}).subscribe(r => {
        this.parameter.messages.push(r.data);
        this.scrollToBottom();
        this.message = '';
      });
    } else {
      swal('Error', 'Please enter some text.', 'error');
    }
  }
}
