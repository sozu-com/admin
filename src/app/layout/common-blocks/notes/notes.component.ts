import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from './../../../services/admin.service';
import { IProperty } from './../../../common/property';
import { Notes } from './../../../models/leads.model';
import { Constant } from './../../../common/constants';
import { NgForm } from '@angular/forms';
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

  @Input('lead_id') lead_id;
  public parameter: IProperty = {};
  public scrollbarOptions = { axis: 'y', theme: 'dark'};

  constructor(private admin: AdminService, public model: Notes, public constant: Constant) { }

  ngOnInit() {
    this.model.id = 0;
    this.getLeadNotes();
  }

  closeModal() {
    this.modalClose.nativeElement.click();
  }

  addLeadNote(formdata: NgForm) {
    this.admin.postDataApi('leads/addLeadNote', {lead_id: this.lead_id, note: this.model.note}).subscribe(r => {
      this.closeModal();
      this.parameter.items.push(r.data);
      swal('Success', this.constant.successMsg.NOTE_ADDED_SUCCESSFULLY, 'success');
    });
  }

  deleteLeadPopup(note_id, index) {
    swal({
      title: 'Are you sure?',
      text: 'You want to delete this note?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
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
      swal('Success', this.constant.successMsg.NOTE_DELETED_SUCCESSFULLY, 'success');
    });
  }

  getLeadNotes() {
    this.admin.postDataApi('leads/getLeadNotes', {lead_id: this.lead_id}).subscribe(r => {
      this.parameter.items = r.data;
    });
  }
}
