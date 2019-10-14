import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Notes } from 'src/app/models/leads.model';
import { IProperty } from 'src/app/common/property';
import { AdminService } from 'src/app/services/admin.service';
import { Constant } from 'src/app/common/constants';
import { TranslateService } from '@ngx-translate/core';
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
  public parameter: IProperty = {};
  public scrollbarOptions = { axis: 'y', theme: 'dark'};

  constructor(public admin: AdminService, public model: Notes, public constant: Constant,
    private translate: TranslateService) { }

  ngOnInit() {
    this.model.id = 0;
    this.getLeadNotes();
  }

  closeModal() {
    this.modalClose.nativeElement.click();
  }

  addLeadNote(formdata: NgForm, sent_as) {
    this.admin.postDataApi('leads/addLeadNote', {lead_id: this.lead_id, note: this.model.note, sent_as: sent_as}).subscribe(r => {
      this.closeModal();
      // this.parameter.items.push(r.data);
      this.parameter.items = r.data;
      swal('Success', this.translate.instant('message.success.addedSuccessfully'), 'success');
    });
  }

  deleteLeadPopup(note_id, index) {
    this.parameter.text = this.translate.instant('message.question.wantToDeleteNote');
    swal({
      html: this.translate.instant('message.question.areYouSure') + '<br>' + this.parameter.text,
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
      swal('Success', this.translate.instant('message.success.deletedSuccessfully'), 'success');
    });
  }

  getLeadNotes() {
    this.admin.postDataApi('leads/getLeadNotes', {lead_id: this.lead_id, sent_as: this.sent_as}).subscribe(r => {
      this.parameter.items = r.data;
    });
  }
}
