import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { AdminService } from '../../../../services/admin.service';
import { IProperty } from '../../../../common/property';
import * as io from 'socket.io-client';
import { Constant } from './../../../../common/constants';

declare let swal: any;
// const SERVER_URL = 'http://54.187.209.220:8080';

@Component({
  selector: 'app-csr-buyer-detail',
  templateUrl: './csr-buyer-detail.component.html',
  styleUrls: ['./csr-buyer-detail.component.css'],
  providers: [Constant]
})
export class CsrBuyerDetailComponent implements OnInit {

  public parameter: IProperty = {};

  admin_id: any;
  id: any;
  lead: any;
  conversation: any;
  message: any;

  private socket;
  socket_id: any;
  connected: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private admin: AdminService,
    private constant: Constant
  ) {
    this.admin.loginData$.subscribe(success => {
      this.admin_id = success['id'];
      console.log('admin_id', this.admin_id);
    });
  }

  ngOnInit() {
    this.route.params.subscribe( params => {
        this.id = params.id;
        this.admin.postDataApi('leads/details', {lead_id: this.id}).subscribe(r => {
          // console.log(r);
          this.lead = r.data.lead;
          console.log(this.lead);
          if (this.lead.user) {
            this.admin.postDataApi('conversation/getMessages', {lead_id: this.id, user_id: this.lead.user.id}).subscribe(res => {
              this.conversation = res.data[0];
              // console.log(this.conversation);
            });

            this.initSocket();
          }
        });
    });
  }

  assignToBroker() {
    this.admin.postDataApi('conversation/assignBroker', {lead_id: this.id}).subscribe(r => {
      console.log(r);
      this.lead = r.data;
      console.log(this.lead);
    },
    error => {
      swal('Error', error.message, 'error');
    });
  }

  blockThisLead() {
    this.admin.postDataApi('conversation/block', {lead_id: this.id}).subscribe(r => {
      console.log(r);
    });
  }

  sendMessage() {
    this.admin.postDataApi('conversation/sendMessage', {conversation_id: this.conversation.id, message: this.message}).subscribe(r => {
      console.log(r);
      this.message = '';
    });
  }

  public initSocket(): void {
      this.socket = io.connect(this.constant.SERVER_URL);
      this.socket.on('connect', fun => {
        this.socket_id = this.socket.id;
        this.connected = this.socket.connected;


        const data = {
          admin_id: this.admin_id,
          socket_id: this.socket_id,
        };

        if (this.connected) {
          console.log('Socket Connected', this.socket_id);
          console.log('dataa', data);
          this.socket.emit('add-admin', data, (res: any) => {
            console.log('res', res);
          });
          // this.socket.on('add-admin', (res: any) => {
          //   console.log(res);
          // });
        }
      });
  }


}
