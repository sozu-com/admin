import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { CommonService } from '../../../services/common.service';
import { IProperty } from '../../../common/property';
import { Constant } from './../../../common/constants';
import { Notes } from './../../../models/leads.model';
declare let swal: any;

@Component({
  selector: 'app-manual-lead-details',
  templateUrl: './manual-lead-details.component.html',
  styleUrls: ['./manual-lead-details.component.css'],
  providers: [Notes]
})
export class ManualLeadDetailsComponent implements OnInit {

  public parameter: IProperty = {};
  admin_id: string;
  public scrollbarOptions = { axis: 'y', theme: 'dark' };
  @ViewChild('modalOpen') modalOpen: ElementRef;
  @ViewChild('modalClose') modalClose: ElementRef;

  constructor(
    private route: ActivatedRoute,
    public admin: AdminService,
    private router: Router,
    private cs: CommonService,
    public constant: Constant,
    public model: Notes
  ) { }

  ngOnInit() {
    this.parameter.sent_as = this.constant.userType.csr_closer;

    this.admin.loginData$.subscribe(success => {
      this.admin_id = success['id'];
    });
    this.route.params.subscribe( params => {
      this.parameter.lead_id = params.id;
      this.admin.postDataApi('getManualLeadById', {id: this.parameter.lead_id, sent_as: this.parameter.sent_as}).subscribe(r => {
        this.parameter.data = r.data;
        this.parameter.user_id = this.parameter.data.user.id;
      });
    });
  }

  viewPropertyDetails(property) {
    this.cs.setPropertyDetails(property);
    this.router.navigate(['/dashboard/properties/details/' + property.id]);
  }


  closeModal() {
    this.modalClose.nativeElement.click();
  }

  addLeadNote() {
    this.admin.postDataApi('addManualLeadNote', {manual_lead_id: this.parameter.lead_id, note: this.model.note}).subscribe(r => {
      this.closeModal();
      // this.parameter.items.push(r.data);
      this.parameter.data.notes.unshift(r.data);
      swal('Success', this.constant.successMsg.NOTE_ADDED_SUCCESSFULLY, 'success');
    });
  }

  deleteLeadPopup(note_id, index) {
    swal({
      title: 'Are you sure?',
      text: 'You want to delete this note?',
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
    this.admin.postDataApi('deleteManualLeadNote', {note_id: note_id}).subscribe(r => {
      this.parameter.data.notes.splice(index, 1);
      swal('Success', this.constant.successMsg.NOTE_DELETED_SUCCESSFULLY, 'success');
    });
  }
}
