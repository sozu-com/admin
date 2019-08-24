import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddAppointmentMultiple, Leads, Prefs, BuyerAmenities } from 'src/app/models/leads.model';
import { IProperty } from 'src/app/common/property';
import { AdminService } from 'src/app/services/admin.service';
import { Constant } from 'src/app/common/constants';
import { ChatTimePipe } from 'src/app/pipes/chat-time.pipe';
declare let swal: any;

@Component({
  selector: 'app-csr-buyer-detail',
  templateUrl: './csr-buyer-detail.component.html',
  styleUrls: ['./csr-buyer-detail.component.css'],
  providers: [AddAppointmentMultiple]
})

export class CsrBuyerDetailComponent implements OnInit {
  @ViewChild('showPropertyModal') showPropertyModal: ElementRef;
  @ViewChild('modalOpen') modalOpen: ElementRef;
  @ViewChild('modalClose') modalClose: ElementRef;

  public parameter: IProperty = {};
  today = new Date();
  date: any;
  data = [];
  selected_prop_ids = [];
  showOtherTextBox: boolean;
  is_deal_finalised: boolean;
  leadData: Leads;
  allAmenities: Array<BuyerAmenities> = [];
  selectedAmenities: Array<BuyerAmenities> = [];
  constructor(
    private route: ActivatedRoute,
    public admin: AdminService,
    public constant: Constant,
    public appointment: AddAppointmentMultiple,
    private spinner: NgxSpinnerService
  ) {
    this.admin.loginData$.subscribe(success => {
      this.parameter.admin_id = success['id'];
    });
  }

  ngOnInit() {

    // Initialising
    this.leadData = new Leads();
    this.leadData.prefs = new Prefs();

    this.parameter.sent_as = this.constant.userType.csr_buyer;
    this.route.params.subscribe( params => {
      this.parameter.lead_id = params.id;
      this.spinner.show();
        this.admin.postDataApi('leads/details', {lead_id: this.parameter.lead_id, sent_as: this.parameter.sent_as}).subscribe(r => {
          this.spinner.hide();
          this.leadData = r.data.lead;
          if (r.data.lead.appointments.length !== 0) {
            this.data = r.data.lead.appointments;
            // this.appointment = r.data.lead.appointments[0];
          }
          this.parameter.favorites = r.data.favorites;
          this.setFillInformationData(this.leadData);
          this.parameter.proximity_places = r.data.lead.proximity_places;
          this.parameter.interested_properties = r.data.interested_properties;
          this.is_deal_finalised = this.leadData.selected_properties.length !== 0 ? true : false;
          this.parameter.viewed_properties = r.data.viewed_properties;
          this.parameter.viewed_projects = r.data.viewed_projects;
          this.parameter.user_id = this.leadData.user ? this.leadData.user.id : 0;
        }, error => {
          this.spinner.hide();
        });
    });
  }

  setFillInformationData(leadData: Leads) {
    this.allAmenities = leadData.buyer_amenities;
    leadData.buyer_amenities.forEach(element => {
      if (element.is_selected) {
        this.selectedAmenities.push(element);
      }
    });
    if (leadData.prefs !== null) {
      this.showOtherTextBox = leadData.prefs.proximity_other ? true : false;
      if (leadData.prefs.planning_to_buy !== null) {
        this.leadData.prefs.planning_to_buy = moment.utc(leadData.prefs.planning_to_buy).toDate();
        // this.fillInfo.planning_to_buy = moment.utc(leadData.prefs.planning_to_buy).toDate();
      }
    } else {
      this.leadData.prefs = new Prefs();
      this.leadData.prefs.looking_for = 1;
      this.leadData.prefs.min_price = 0;
      this.leadData.prefs.max_price = 0;
      this.showOtherTextBox = false;
    }
  }

  assignToBroker() {
    this.spinner.show();
    this.admin.postDataApi('conversation/assignBroker', {lead_id: this.parameter.lead_id}).subscribe(r => {
      this.spinner.hide();
      this.leadData.user = r.data['user'];
      this.leadData.broker = r.data['broker'];
      this.leadData.admin = r.data['admin'];
      swal('Success', 'Agent assigned successfully', 'success');
    }
  );
  }

  blockThisLead() {
    this.admin.postDataApi('conversation/block', {lead_id: this.parameter.lead_id}).subscribe(r => {
      // console.log('conversation/block', r);
    });
  }

  viewFavProperties() {
    this.showPropertyModal.nativeElement.click();
  }

  dealFinalisedReceived(value) {
    // console.log(value);
  }

  addDateTime () {
    if (this.date) {
      this.appointment.appointment_date_array.push(this.date);
      this.date = '';
    }
  }


  add() {
    this.appointment.appointment_date_array.forEach(element => {
      const d: any = new Date(element);
      const f = moment(d).utc().format('YYYY-MM-DD HH:mm:ss');
      this.appointment.appointment_date.push(f);
    });
    if (this.appointment.appointment_date.length === 0) {
      swal('Error', 'Choose atleast one date.', 'error');
      return false;
    }
    this.spinner.show();
    this.admin.postDataApi('leads/addAppointmentMultiple', this.appointment)
      .subscribe(
        success => {
          this.data.push.apply(this.data, success.data);
          // this.app_date = this.appointment.appointment_date;
          // this.appointment.appointment_date =
          // new Date(moment(this.appointment.appointment_date).utc(true).local().format('YYYY-MM-DD, h:mm a'));
          this.spinner.hide();
          this.closeModal();
          swal('Success', 'Appointment scheduled successfully.', 'success');
        }, error => {
          this.spinner.hide();
        }
      );
  }

  openModal () {
    this.appointment = new AddAppointmentMultiple();
    this.appointment.lead_id = this.parameter.lead_id;
    this.appointment.property_id = this.leadData.selected_properties[0] && this.leadData.selected_properties[0].property_id ?
                this.leadData.selected_properties[0].property_id : '';
    this.appointment.sent_as = this.constant.userType.csr_buyer;
    this.modalOpen.nativeElement.click();
  }

  closeModal() {
    this.modalClose.nativeElement.click();
  }

  deleteAppointment(id, j) {
    this.admin.postDataApi('leads/deleteAppointment', {id: id})
      .subscribe(
        success => {
          this.data.splice(j, 1);
          // this.items = success.data;
          // this.parameter.total = success.total_count;
        }
      );
  }

  removeAppointment(i) {
    this.appointment.appointment_date_array.splice(i, 1);
  }
}
