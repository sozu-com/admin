import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as io from 'socket.io-client';
import { saveAs as importedSaveAs } from 'file-saver';
import { Http } from '@angular/http';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { DealFinalize, AddAppointment, AddAppointmentMultiple, Leads,
  BuyerAmenities, Prefs } from 'src/app/models/leads.model';
import { IProperty } from 'src/app/common/property';
import { AdminService } from 'src/app/services/admin.service';
import { Constant } from 'src/app/common/constants';
import { ChatTimePipe } from 'src/app/pipes/chat-time.pipe';
import { TranslateService } from 'src/app/lang/translate.service';
declare let swal: any;

@Component({
  selector: 'app-inhouse-broker-detail',
  templateUrl: './inhouse-broker-detail.component.html',
  styleUrls: ['./inhouse-broker-detail.component.css'],
  providers: [DealFinalize, AddAppointment, AddAppointmentMultiple]
})

export class InhouseBrokerDetailComponent implements OnInit {

  @ViewChild('modalOpen') modalOpen: ElementRef;
  @ViewChild('modalClose') modalClose: ElementRef;
  @ViewChild('showPropertyModal') showPropertyModal: ElementRef;

  showOtherTextBox: boolean;
  allAmenities: Array<BuyerAmenities> = [];
  selectedAmenities: Array<BuyerAmenities> = [];
  app_date: any;
  date: any;
  data = [];
  leadData: Leads;
  public parameter: IProperty = {};
  public selected_prop_ids = [];
  is_deal_finalised: boolean;
  today = new Date();
  input: any;
  public scrollbarOptions = { axis: 'y', theme: 'dark' };
  constructor(
    private route: ActivatedRoute,
    public admin: AdminService,
    public constant: Constant,
    private http: Http,
    public appointment: AddAppointmentMultiple,
    private spinner: NgxSpinnerService,
    public ts: TranslateService
  ) {
    this.admin.loginData$.subscribe(success => {
      this.parameter.admin_id = success['id'];
    });
  }

  ngOnInit() {

    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page2 = this.constant.p;
    this.parameter.total2 = 0;

    // Initialising
    this.leadData = new Leads();
    this.leadData.prefs = new Prefs();

    this.parameter.sent_as = this.constant.userType.inhouse_broker;
    this.route.params.subscribe(params => {
      this.parameter.lead_id = params.id;
      this.spinner.show();
      this.admin.postDataApi('leads/details', { lead_id: this.parameter.lead_id, sent_as: this.parameter.sent_as }).subscribe(r => {
        this.spinner.hide();
        this.leadData = r.data.lead;
        this.setFillInformationData(this.leadData);
        if (r.data.lead.appointments.length !== 0) {
          // this.appointment = r.data.lead.appointments;
          // this.app_date = this.appointment.appointment_date;
          // this.appointment.appointment_date =
          // new Date(moment(this.appointment.appointment_date).utc(true).local().format('YYYY-MM-DD, h:mm a'));
          this.data = r.data.lead.appointments;
          // r.data.lead.appointments.forEach(element1 => {
          //   this.data.push(moment(this.appointment.appointment_date).utc(true).local().format('YYYY-MM-DD, h:mm a'));
          // });

        }
        this.parameter.favorites = r.data.favorites;
        this.parameter.fav_properties_count = r.data.fav_properties_count;
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

  getPage2(page) {
    this.parameter.page2 = page;
    this.viewFavProperties();
  }

  setFillInformationData(leadData: Leads) {
    this.allAmenities = leadData.buyer_amenities;
    leadData.buyer_amenities.forEach(element => {
      if (element.is_selected) {
        this.selectedAmenities.push(element);
      }
    });
    if (leadData.prefs) {
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

  // setFillInformationData(r) {
  //   this.admin.postDataApi('leads/getPrefOptions', {lead_id: this.parameter.lead_id}).subscribe(res => {
  //     this.fillInfo.lead_id = this.parameter.lead_id;
  //     this.fillInfo.proximity_places_array = res.data.proximity_places;
  //     this.fillInfo.car_types = res.data.car_types;
  //     this.fillInfo.property_types_array = res.data.property_types;
  //     this.fillInfo.configurations_array = res.data.configurations;
  //     this.fillInfo.configurations = [];
  //     this.fillInfo.proximity_place_ids = [];
  //     this.fillInfo.property_types = [];
  //     this.fillInfo.proximity_places_array.forEach(element => {
  //       r.data.lead.proximity_places.forEach(p => {
  //         if (p.id === element.id) {
  //           element.is_selected = 1;
  //         }
  //       });
  //     });
  //     this.fillInfo.car_types.forEach(element => {
  //       element.is_selected = (r.data.lead.prefs != null) &&
  //       r.data.lead.prefs.car_type_id && (r.data.lead.prefs.car_type_id === element.id) ? 1 : 0;
  //     });

  //     this.fillInfo.property_types_array.forEach(element => {
  //       r.data.lead.property_types.forEach(pt => {
  //         if (pt.id === element.id) {
  //           element.is_selected = 1;
  //         }
  //       });
  //     });

  //     this.fillInfo.configurations_array.forEach(element => {
  //       r.data.lead.configuration.forEach(c => {
  //         if (c.id === element.id) {
  //           element.is_selected = 1;
  //         }
  //       });
  //     });
  //   });

  //   if (r.data.lead.prefs !== null) {
  //     this.fillInfo.family_size = r.data.lead.prefs.family_size;
  //     this.fillInfo.pets = r.data.lead.prefs.pets;
  //     this.fillInfo.kid_count = r.data.lead.prefs.kid_count;
  //     this.fillInfo.min_price = r.data.lead.min_price;
  //     this.fillInfo.max_price = r.data.lead.max_price;
  //     this.fillInfo.price_range = [r.data.lead.prefs.min_price, r.data.lead.prefs.max_price];

  //     if (r.data.lead.prefs.planning_to_buy !== null) {
  //       this.fillInfo.planning_to_buy = moment.utc(r.data.lead.prefs.planning_to_buy).toDate();
  //       // this.fillInfo.planning_to_buy = new ChatTimePipe().transform(r.data.lead.prefs.planning_to_buy, 'YYYY-MM-DD H:m:s', 4);
  //     }
  //     // this.fillInfo.configuration = r.data.lead.configuration;

  //     // this.parameter.prefs = r.data.lead.prefs;
  //   } else {
  //     this.fillInfo.family_size = 1;
  //     this.fillInfo.pets = '';
  //     this.fillInfo.kid_count = '';
  //     this.fillInfo.min_price = this.constant.minValue;
  //     this.fillInfo.max_price = this.constant.maxValue;
  //     this.fillInfo.price_range = [this.constant.minValue, this.constant.maxValue];
  //     // this.parameter.prefs = new FillInformation();
  //   }
  // }

  viewFavProperties() {
    this.spinner.show();
    this.admin.postDataApi('leads/favoriteProperties', {lead_id: this.parameter.lead_id, page: this.parameter.page2}).subscribe(r => {
      this.spinner.hide();
      this.parameter.favorites = r.data;
      this.parameter.total2 = r.total;
      if (this.parameter.page2 === 1) {
        this.showPropertyModal.nativeElement.click();
      }
    }, error => {
      this.spinner.hide();
    });
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
      swal('Error', 'Deal is not finalised.', 'error');
    });
  }

  addDateTime() {
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

  openModal() {
    this.appointment = new AddAppointmentMultiple();
    this.appointment.lead_id = this.parameter.lead_id;
    this.appointment.property_id = this.leadData.selected_properties[0] && this.leadData.selected_properties[0].property_id ?
      this.leadData.selected_properties[0].property_id : '';
    this.appointment.sent_as = this.constant.userType.inhouse_broker;
    this.modalOpen.nativeElement.click();
  }

  closeModal() {
    this.modalClose.nativeElement.click();
  }

  dealFinalisedReceived(e, response) {
    this.is_deal_finalised = true;
    this.leadData.selected_properties[0].property_id = response.property_id;
  }


  deleteAppointment(id, j) {
    this.admin.postDataApi('leads/deleteAppointment', { id: id })
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
