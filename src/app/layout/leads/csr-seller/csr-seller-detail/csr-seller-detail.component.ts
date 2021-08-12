import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProperty } from 'src/app/common/property';
import { Constant } from 'src/app/common/constants';
import { AdminService } from 'src/app/services/admin.service';
import { TranslateService } from '@ngx-translate/core';
import { AddAppointmentMultiple, Leads, Prefs } from 'src/app/models/leads.model';
declare let swal: any;

@Component({
  selector: 'app-csr-seller-detail',
  templateUrl: './csr-seller-detail.component.html',
  styleUrls: ['./csr-seller-detail.component.css'],
  providers:[AddAppointmentMultiple]
})
export class CsrSellerDetailComponent implements OnInit {
  public parameter: IProperty = {};
  leadData: Leads;
  data = [];
  is_deal_finalised: boolean;
  locale = {};
  public scrollbarOptions = { axis: 'y', theme: 'dark' };
  today = new Date();
  date: any;
  user_id: any;

  constructor(
    public admin: AdminService,
    public constant: Constant,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    public appointment: AddAppointmentMultiple,
  ) { }

  ngOnInit() {
    this.locale = {
      firstDayOfWeek: 0,
      dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
      dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
      dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
      monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
      monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun',
        'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
      today: 'Hoy',
      clear: 'Clara',
      dateFormat: 'mm/dd/yy',
      weekHeader: 'Wk'
    };
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page2 = this.constant.p;
    this.parameter.total2 = 0;

    // Initialising
    this.leadData = new Leads();
    this.leadData.prefs = new Prefs();

    this.parameter.sent_as = this.constant.userType.csr_buyer;
    this.route.params.subscribe( params => {
     this.parameter.lead_id = params.id;
      let param= {
        lead_id: this.parameter.lead_id,
        sent_as: this.constant.userType.inhouse_broker
      };
     
      this.spinner.show();
        this.admin.postDataApi('leads/details',param).subscribe(r => {
          // this.user_id ? param1 : param
          this.spinner.hide();
          if(r.data){
          this.leadData = r.data.lead;
          this.leadData.broker = r.data.lead.broker;
          if (r.data.lead.appointments.length !== 0) {
            this.data = r.data.lead.appointments;
            // this.appointment = r.data.lead.appointments[0];
          }
          this.parameter.favorites = r.data.favorites;
          this.parameter.fav_properties_count = r.data.fav_properties_count;
          this.parameter.proximity_places = r.data.lead.proximity_places;
          this.parameter.interested_properties = r.data.interested_properties;
          this.is_deal_finalised = this.leadData.selected_properties.length !== 0 ? true : false;
          this.parameter.viewed_properties = r.data.viewed_properties;
          this.parameter.viewed_projects = r.data.viewed_projects;
          this.parameter.interested_projects = r.data.interested_projects;
          this.parameter.user_id = this.leadData.user ? this.leadData.user.id : 0;
        }
        }, error => {
          this.spinner.hide();
        });
    });
  }

  getPage2(page) {
    this.parameter.page2 = page;
  }

  closeModal() {
  }

  add() {

  }

  addDateTime () {
    if (this.date) {
      this.appointment.appointment_date_array.push(this.date);
      this.date = '';
    }
  }

}
