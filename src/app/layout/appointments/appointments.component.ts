import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { IProperty } from '../../common/property';
import { Constant } from '../../common/constants';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  @ViewChild('modalOpen') modalOpen: ElementRef;
  @ViewChild('modalClose') modalClose: ElementRef;

  parameter: IProperty= {};
  appointmentDates: any= [];
  appointStatuses: any= [];
  meetings: any= [];
  yearList: any= [];
  appointmentBack: any;
  appointmentNew: any= {};

  constructor(
    private admin: AdminService,
    public constant: Constant
  ) {
    const d = new Date();
    console.log(d);
    this.parameter.year = d.getFullYear();
    this.parameter.month = d.getMonth() + 1;
    this.getAppointments();
    this.getAppointmentStatuses();
    this.yearList.push(this.parameter.year);
    this.yearList.push(this.parameter.year + 1);
    // this.yearList.push(this.parameter.year + 2);
    this.yearList.unshift(this.parameter.year - 1);
    console.log(this.parameter);
   }

  ngOnInit() {

  }
  getAppointmentStatuses() {
    this.admin.postDataApi('getAppointmentStatuses', {}).subscribe(r => {
      console.log('Status', r);
      this.appointStatuses = r['data'];
    });

  }

  getAppointments() {
    this.meetings = [];
    this.parameter.loading = true;
    this.admin.postDataApi('leads/getAllAppointments', this.parameter).subscribe(r => {
      console.log('appointments', r);
      this.parameter.loading = false;
      this.appointmentDates = r['data'];
    }, error => {
      this.parameter.loading = false;
    });
  }

  openAppintment(item) {
    this.modalOpen.nativeElement.click();
    this.appointmentBack = item;
    this.appointmentNew = JSON.parse(JSON.stringify(item));
    this.appointmentNew.status_id = this.appointmentNew.status.id;
  }

  saveAppointment() {
    this.appointmentDates = [];
    this.meetings = [];

    this.modalClose.nativeElement.click();
    console.log(this.appointmentNew);
    const input = {
      appointment_id: this.appointmentNew.id,
      status_id: this.appointmentNew.status_id,
      appointment_date: this.appointmentNew.appointment_date
    };
    this.parameter.loading = true;
    this.admin.postDataApi('leads/updateAppointmentStatus', input).subscribe(r => {
      // this.parameter.loading = false;
      console.log('Updated', r);
      this.getAppointments();
    }, error => {
      this.parameter.loading = false;
      console.log(error);
    });
  }

}
