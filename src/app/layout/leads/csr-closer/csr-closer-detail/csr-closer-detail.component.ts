import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { AdminService } from '../../../../services/admin.service';
import { IProperty } from '../../../../common/property';
import * as io from 'socket.io-client';
import { Constant } from './../../../../common/constants';

declare let swal: any;

@Component({
  selector: 'app-csr-closer-detail',
  templateUrl: './csr-closer-detail.component.html',
  styleUrls: ['./csr-closer-detail.component.css'],
  providers: [Constant]
})

export class CsrCloserDetailComponent implements OnInit {

  public parameter: IProperty = {};

  id: any;
  lead: any;
  conversation: any;
  message: any;

  private socket;
  socket_id: any;
  connected: any;

  constructor(
    private route: ActivatedRoute,
    private admin: AdminService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
        this.id = params.id;
        this.admin.postDataApi('leads/details', {lead_id: this.id}).subscribe(r => {
          this.lead = r.data.lead;
          if (this.lead.user) {
            this.admin.postDataApi('conversation/getMessages', {lead_id: this.id, user_id: this.lead.user.id}).subscribe(res => {
              this.conversation = res.data[0];
            });
            this.initSocket();
          }
        });
    });
  }

  assignToBroker() {
    this.admin.postDataApi('conversation/assignBroker', {lead_id: this.id}).subscribe(r => {
      this.lead = r.data;
    }
  );
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
      this.socket = io.connect(this.admin.socketUrl);
      this.socket.on('connect', fun => {
        this.socket_id = this.socket.id;
        this.connected = this.socket.connected;
        if (this.connected) {
          this.socket.on('message', (res: any) => {
            console.log(res);
          });
        }
      });
  }

}
