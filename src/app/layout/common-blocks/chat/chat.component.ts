import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { AdminService } from './../../../services/admin.service';
declare let swal: any;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
  @Input('messages') messages;
  @Input('admin_id') admin_id;
  @Input('conversation_id') conversation_id;
  @ViewChild('malihuScrollBar') malihuScrollBar: ElementRef;

  message: any;

  public scrollbarOptions = { axis: 'yx', theme: 'dark', setTop: 0, scrollbarPosition: 'inside' };

  constructor(
    private admin: AdminService
  ) { }

  ngOnInit() {
    console.log('messages_chat', this.messages);
    $('#mCSB_2').mCustomScrollbar('scrollTo', 'bottom', {scrollInertia: 0});
    console.log('malihuScrollBar', this.malihuScrollBar.nativeElement.scrollTop, this.malihuScrollBar.nativeElement.scrollHeight);
    this.malihuScrollBar.nativeElement.scrollTop = this.malihuScrollBar.nativeElement.scrollHeight;
  }

  sendMessage() {
    // const element = document.getElementById('malihu-scroll-bar');
    // element.scrollTop = element.scrollHeight;

    if (this.message) {
      this.admin.postDataApi('conversation/sendMessage', {conversation_id: this.conversation_id, message: this.message}).subscribe(r => {
        console.log('conversation/sendMessage', r);
        // $('#malihu-scroll-bar').scrollTop($('#malihu-scroll-bar')[0].scrollHeight);
        this.message = '';
      });
    } else {
      swal('Error', 'Please enter some text.', 'error');
    }
  }

}
