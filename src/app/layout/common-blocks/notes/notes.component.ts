import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Notes } from 'src/app/models/leads.model';
import { IProperty } from 'src/app/common/property';
import { AdminService } from 'src/app/services/admin.service';
import { Constant } from 'src/app/common/constants';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
declare let swal: any;

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  providers: [Notes]
})

export class NotesComponent implements OnInit {

  @ViewChild('modalOpen') modalOpen: ElementRef;
  @ViewChild('modalClose') modalClose: ElementRef;

  @Input('sent_as') sent_as;
  @Input('lead_id') lead_id;
  @Input() user_id: number;
  public parameter: IProperty = {};
  public scrollbarOptions = { axis: 'y', theme: 'dark'};
  user: any;

  constructor(public admin: AdminService, public model: Notes, public constant: Constant,
    private translate: TranslateService, private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('all'));
    this.model.id = 0;
    this.getLeadNotes();
  }

  closeModal() {
    this.modalClose.nativeElement.click();
  }

  addLeadNote(formdata: NgForm, sent_as) {
    if(((this.user.data.permissions.can_csr_buyer == 1 || this.user.data.permissions.can_in_house_broker == 1 || 
     this.user.data.permissions.can_csr_coordinator == 1) && this.user.data.user_type == 2)){
    let param ={ 
      lead_id: this.lead_id,
      user_id: this.user_id,
      note: this.model.note, 
      sent_as: sent_as
    }

    let param1={
      user_id: this.user_id,
      note: this.model.note, 
      sent_as: sent_as
    }
    this.admin.postDataApi('leads/addLeadNote', param).subscribe(r => {
      this.closeModal();
      // this.parameter.items.push(r.data);
      this.parameter.items = r.data;
      swal(this.translate.instant('swal.success'), this.translate.instant('message.success.addedSuccessfully'), 'success');
    });
  }
  else{
    this.toastr.warning(this.translate.instant('message.error.SorryYouDoNotHaveThePermissionToGoThere'), this.translate.instant('swal.warning'));
  }
  }

  deleteLeadPopup(note_id, index) {
    this.parameter.text = this.translate.instant('message.error.wantToDeleteNote');
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Delete!'
    }).then((result) => {
      if (result.value) {
        this.deleteLeadNote(note_id, index);
      }
    });
  }

  deleteLeadNote(note_id, index) {
    this.admin.postDataApi('leads/deleteLeadNote', {note_id: note_id}).subscribe(r => {
      this.parameter.items.splice(index, 1);
      swal(this.translate.instant('swal.success'), this.translate.instant('message.success.deletedSuccessfully'), 'success');
    });
  }

  getLeadNotes() {
    let param ={ 
      lead_id: this.lead_id,
      user_id: this.user_id,
      note: this.model.note, 
      sent_as: this.sent_as
    }

    let param1={
      user_id: this.user_id,
      note: this.model.note, 
      sent_as: this.sent_as
    }
    this.admin.postDataApi('leads/getLeadNotes', param).subscribe(r => {
      this.parameter.items = r.data;
    });
  }
}
