import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { AdminService } from '../../../../services/admin.service';
import { IProperty } from '../../../../common/property';
import * as io from 'socket.io-client';
import { Constant } from './../../../../common/constants';

declare let swal: any;

@Component({
  selector: 'app-inhouse-broker-detail',
  templateUrl: './inhouse-broker-detail.component.html',
  styleUrls: ['./inhouse-broker-detail.component.css'],
  providers: [Constant]
})

export class InhouseBrokerDetailComponent implements OnInit {

  public parameter: IProperty = {};

  // id: any;
  // lead: any;
  // conversation: any;
  // conversation_id: number;
  // message: any;
  // admin_id: number;
  // messages: any = [];

  // private socket;
  // socket_id: any;
  // connected: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private admin: AdminService,
    private constant: Constant
  ) {
    this.admin.loginData$.subscribe(success => {
      this.parameter.admin_id = success['id'];
      console.log('admin_id', this.parameter.admin_id);
    });
  }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.parameter.id = params.id;
      this.parameter.loading = true;
      this.admin.postDataApi('leads/details', {lead_id: this.parameter.id}).subscribe(r => {
        // console.log(r);
        this.parameter.lead = r.data.lead;
        this.parameter.interested_properties = r.data.interested_properties;
        console.log('leads/details', r);
        if (this.parameter.lead.user) {
          this.parameter.loading = true;
          this.admin.postDataApi('conversation/getMessages',
          {lead_id: this.parameter.id, user_id: this.parameter.lead.user.id}).subscribe(res => {
            this.parameter.loading = false;
            this.parameter.messages = res.data[0].messages;
            this.parameter.conversation_id = res.data[0].id;
            console.log('conversation/getMessages', res, this.parameter.messages);
          });

          // this.initSocket();
        }else {
          this.parameter.loading = false;
        }
      });
  });
  }

  sendMessage() {
    console.log('message', this.parameter.conversation_id, this.parameter.message);
    if (this.parameter.message) {
      this.admin.postDataApi('conversation/sendMessage',
      {conversation_id: this.parameter.conversation_id, message: this.parameter.message}).subscribe(r => {
        console.log('conversation/sendMessage', r);
        this.parameter.message = '';
      });
    } else {
      swal('Error', 'Please enter some text.', 'error');
    }
  }

  public initSocket(): void {
    this.parameter.socket = io.connect(this.constant.SERVER_URL);
    this.parameter.socket.on('connect', fun => {
      this.parameter.socket_id = this.parameter.socket.id;
      this.parameter.connected = this.parameter.socket.connected;


      const data = {
        admin_id: this.parameter.admin_id,
        socket_id: this.parameter.socket_id,
      };

      if (this.parameter.connected) {
        console.log('Socket Connected', this.parameter.socket_id);
        console.log('dataa', data);
        this.parameter.socket.emit('add-admin', data, (res: any) => {
          console.log('res', res);
        });
        this.parameter.socket.on('message', (response: any) => {
          console.log('response', response, this.parameter.messages, this.parameter.conversation_id);
          if (response.data.conversation_id === this.parameter.conversation_id) {
            this.parameter.messages.push(response.data);
          }
          console.log('mess', this.parameter.messages);
        });
      }
    });
}

}
