import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as io from 'socket.io-client';
import { saveAs as importedSaveAs } from 'file-saver';
import { Http } from '@angular/http';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { DealFinalize, FillInformation, AddAppointment, AddAppointmentMultiple, Leads } from 'src/app/models/leads.model';
import { IProperty } from 'src/app/common/property';
import { AdminService } from 'src/app/services/admin.service';
import { Constant } from 'src/app/common/constants';
import { ChatTimePipe } from 'src/app/pipes/chat-time.pipe';
declare let swal: any;

@Component({
  selector: 'app-inhouse-broker-detail',
  templateUrl: './inhouse-broker-detail.component.html',
  styleUrls: ['./inhouse-broker-detail.component.css'],
  providers: [DealFinalize, FillInformation, AddAppointment, AddAppointmentMultiple]
})

export class InhouseBrokerDetailComponent implements OnInit {
  @ViewChild('modalOpen') modalOpen: ElementRef;
  @ViewChild('modalClose') modalClose: ElementRef;
  @ViewChild('showPropertyModal') showPropertyModal: ElementRef;
  app_date: any;
  date: any;
  data = [];
  leadData: Leads;
  public parameter: IProperty = {};
  public selected_prop_ids = [];
  is_deal_finalised: boolean;
  today = new Date();
  input: any;
  constructor(
    private route: ActivatedRoute,
    public admin: AdminService,
    public constant: Constant,
    public fillInfo: FillInformation,
    private http: Http,
    public appointment: AddAppointmentMultiple,
    private spinner: NgxSpinnerService
  ) {
    this.admin.loginData$.subscribe(success => {
      this.parameter.admin_id = success['id'];
    });
  }

  ngOnInit() {
    this.leadData = new Leads();
    this.parameter.sent_as = this.constant.userType.inhouse_broker;
    this.route.params.subscribe( params => {
      this.parameter.lead_id = params.id;
      this.spinner.show();
      this.admin.postDataApi('leads/details', {lead_id: this.parameter.lead_id, sent_as: this.parameter.sent_as}).subscribe(r => {
        this.spinner.hide();
        this.leadData = r.data.lead;
        if (r.data.lead.appointments.length !== 0) {
          // this.appointment = r.data.lead.appointments;
          // this.app_date = this.appointment.appointment_date;
          // this.appointment.appointment_date =
          // new Date(moment(this.appointment.appointment_date).utc(true).local().format('YYYY-MM-DD, h:mm a'));
          this.data = r.data.lead.appointments;
// r.data.lead.appointments.forEach(element1 => {
//   this.data.push(moment(this.appointment.appointment_date).utc(true).local().format('YYYY-MM-DD, h:mm a'));
// });
console.log('apoiinn', this.appointment);
        }
        this.setFillInformationData(r);
        this.parameter.favorites = r.data.favorites;
        this.parameter.interested_properties = r.data.interested_properties;
        this.is_deal_finalised = this.leadData.selected_properties.length !== 0 ? true : false;
        this.parameter.viewed_properties = r.data.viewed_properties;
        this.parameter.viewed_projects = r.data.viewed_projects;
        this.parameter.user_id = this.leadData.user.id;
      }, error => {
        this.spinner.hide();
      });
    });
  }


  setFillInformationData(r) {
    this.admin.postDataApi('leads/getPrefOptions', {lead_id: this.parameter.lead_id}).subscribe(res => {
      this.fillInfo.lead_id = this.parameter.lead_id;
      this.fillInfo.proximity_places_array = res.data.proximity_places;
      this.fillInfo.car_types = res.data.car_types;
      this.fillInfo.property_types_array = res.data.property_types;
      this.fillInfo.configurations_array = res.data.configurations;
      this.fillInfo.configurations = [];
      this.fillInfo.proximity_place_ids = [];
      this.fillInfo.property_types = [];
      this.fillInfo.proximity_places_array.forEach(element => {
        r.data.lead.proximity_places.forEach(p => {
          if (p.id === element.id) {
            element.is_selected = 1;
          }
        });
      });
      this.fillInfo.car_types.forEach(element => {
        element.is_selected = (r.data.lead.prefs != null) &&
        r.data.lead.prefs.car_type_id && (r.data.lead.prefs.car_type_id === element.id) ? 1 : 0;
      });

      this.fillInfo.property_types_array.forEach(element => {
        r.data.lead.property_types.forEach(pt => {
          if (pt.id === element.id) {
            element.is_selected = 1;
          }
        });
      });

      this.fillInfo.configurations_array.forEach(element => {
        r.data.lead.configuration.forEach(c => {
          if (c.id === element.id) {
            element.is_selected = 1;
          }
        });
      });
    });

    if (r.data.lead.prefs !== null) {
      this.fillInfo.family_size = r.data.lead.prefs.family_size;
      this.fillInfo.pets = r.data.lead.prefs.pets;
      this.fillInfo.kid_count = r.data.lead.prefs.kid_count;
      this.fillInfo.min_price = r.data.lead.min_price;
      this.fillInfo.max_price = r.data.lead.max_price;
      this.fillInfo.price_range = [r.data.lead.prefs.min_price, r.data.lead.prefs.max_price];

      if (r.data.lead.prefs.planning_to_buy !== null) {
        this.fillInfo.planning_to_buy = moment.utc(r.data.lead.prefs.planning_to_buy).toDate();
        // this.fillInfo.planning_to_buy = new ChatTimePipe().transform(r.data.lead.prefs.planning_to_buy, 'YYYY-MM-DD H:m:s', 4);
      }
      // this.fillInfo.configuration = r.data.lead.configuration;

      // this.parameter.prefs = r.data.lead.prefs;
    } else {
      this.fillInfo.family_size = 1;
      this.fillInfo.pets = '';
      this.fillInfo.kid_count = '';
      this.fillInfo.min_price = this.constant.minValue;
      this.fillInfo.max_price = this.constant.maxValue;
      this.fillInfo.price_range = [this.constant.minValue, this.constant.maxValue];
      // this.parameter.prefs = new FillInformation();
    }
  }

  viewFavProperties() {
    this.showPropertyModal.nativeElement.click();
  }

  getInvoice() {
    this.parameter.url = 'getInvoicePdf/' + this.parameter.lead_id;
    this.spinner.show();
    this.admin.getInvoicePdf(this.parameter.url).subscribe(r => {
      this.spinner.hide();
      if (r) {
        importedSaveAs(r, 'Invoice_' + moment(new Date()).format('DD MMM YYYY, h:mm a') + '.pdf');
      }
    }, error => {
      this.spinner.hide();
    });
  }

  addDateTime () {
    if (this.date) {
      this.appointment.appointment_date_array.push(this.date);
      this.date = '';
    }
  }

  addOld() {
    // const d: any = new Date(this.appointment.appointment_date);
    // const f = moment(d).utc().format('YYYY-MM-DD HH:mm:ss');
    // this.input = {
    //   lead_id: this.parameter.lead_id,
    //   // property_id: this.leadData.selected_properties[0].property_id,
    //   appointment_date: f,
    //   sent_as: this.parameter.sent_as
    // };
    // if (this.appointment.id) {
    //   this.input.id = this.appointment.id;
    // }
    // this.spinner.show();
    // this.admin.postDataApi('leads/addAppointment', this.input)
    //   .subscribe(
    //     success => {
    //       console.log(success.data);
    //       this.appointment = success.data;
    //       this.app_date = this.appointment.appointment_date;
    //       this.appointment.appointment_date =
    //       new Date(moment(this.appointment.appointment_date).utc(true).local().format('YYYY-MM-DD, h:mm a'));
    //       this.spinner.hide();
    //       this.closeModal();
    //       swal('Success', 'Appointment scheduled successfully.', 'success');
    //     }, error => {
    //       this.spinner.hide();
    //     }
    //   );
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
    console.log('data', this.appointment);
    this.admin.postDataApi('leads/addAppointmentMultiple', this.appointment)
      .subscribe(
        success => {
          this.data.push.apply(this.data, success.data);
          console.log(this.data);
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
    this.appointment.property_id = this.leadData.selected_properties[0].property_id;
    this.appointment.sent_as = this.constant.userType.inhouse_broker;
    this.modalOpen.nativeElement.click();
  }

  closeModal() {
    this.modalClose.nativeElement.click();
  }

  dealFinalisedReceived(value) {
    this.is_deal_finalised = true;
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
