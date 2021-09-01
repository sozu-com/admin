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
  providers: [AddAppointmentMultiple]
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
  allPrices: Array<any> = [{}];
  allCities: Array<any> = [{}];
  CityLocalities: Array<any> = [{}];
  city_id: any;
  locality_id: any;
  city: any;
  locality: any;
  price: any; configurationCount: Array<string>;
  isShown: boolean = false;
  bedroom: any;
  bathroom: any;
  carpet_area: any;
  bedrooms: any = [
    { is_selected: false, name: '1' ,id:'1'},
    { is_selected: false, name: '2' ,id:'2'},
    { is_selected: false, name: '3' ,id:'3'},
    { is_selected: false, name: '4+' ,id:'4'}
  ];
  bathrooms: any = [
    { is_selected: false, name: '1' ,id:'1'},
    { is_selected: false, name: '2' ,id:'2'},
    { is_selected: false, name: '3' ,id:'3'},
    { is_selected: false, name: '4+' ,id:'4'}
  ];
  constructor(
    public admin: AdminService,
    public constant: Constant,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    public appointment: AddAppointmentMultiple,
  ) { }

  ngOnInit() {
    
    this.configurationCount = ['1', '2', '3', '4', '5+'];
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
    this.route.params.subscribe(params => {
      this.parameter.lead_id = params.id;
      let param = {
        lead_id: this.parameter.lead_id,
        sent_as: this.constant.userType.inhouse_broker
      };

      this.spinner.show();
      this.admin.postDataApi('leads/details', param).subscribe(r => {
        // this.user_id ? param1 : param
        this.spinner.hide();
        if (r.data) {
          this.leadData = r.data.lead;
          this.getcities();
         this.getprices();
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
  toggleShow() {
    this.isShown = !this.isShown;
    this.leadData.locality = this.leadData.locality ? this.leadData.locality : {};
    this.leadData.city = this.leadData.city ? this.leadData.city : {};
  }
  setPrefValue(item) {
    this.leadData.bedrooms = item;
  }
  setBath(item) {
    this.leadData.bathrooms = item;
  }
  closeModal() {}

  add() {}

  addDateTime() {
    if (this.date) {
      this.appointment.appointment_date_array.push(this.date);
      this.date = '';
    }
  }
  toggleOptions(item, items) {
    items.forEach(r => {
      r.is_selected = false;
    });
    item.is_selected = true;
  }
  getprices() {
    this.allPrices = [
      { id: 0, name_en: 'Price', name_es: 'Precio' },
      { id: 1, name_en: '0 - 2,000,000 MXN', name_es: '0 - 2,000,000 MXN' },
      { id: 2, name_en: '2,000,000 - 4,000,000 MXN', name_es: '2,000,000 - 4,000,000 MXN' },
      { id: 3, name_en: '4,000,000 - 5,000,000 MXN', name_es: '4,000,000 - 5,000,000 MXN' },
      { id: 4, name_en: '5,000,000 More', name_es: '5,000,000 Más' }
    ];
  }

  getcities() {
    this.admin.postDataApi('allCities', {})
      .subscribe(
        success => {
          this.allCities = success['data'];
            this.allCities.forEach(element => {
              if(element.name == this.leadData.city.name){
                this.city_id = element.id;
              }
            });
          this.getCityLocalities(this.city_id);
        }
      );
  }

  changeCity(city) {
    if(city){
      this.allCities.forEach(element => {
        if(element.name == city){
          this.city_id = element.id;
          this.getCityLocalities(this.city_id);
        }
      });
    }
  }

  getCityLocalities(item) {
    this.admin.postDataApi('getCityLocalities', { city_id: item })
      .subscribe(
        success => {
          this.CityLocalities = success['data'];
          //this.locality = this.CityLocalities[0];
        });
  }

  changeLocality(city) {
    if(city){
      this.CityLocalities.forEach(element => {
        if(element.name == city){
          this.locality_id = element.id;
        }
      });
    }
  }

  editPreferences() {
    if(this.leadData.city.name){
      this.allCities.forEach(element => {
        if(element.name == this.leadData.city.name){
          this.city_id = element.id;
        }
      });
    }
    if(this.leadData.locality){
      this.CityLocalities.forEach(element => {
        if(element.name == this.leadData.locality.name){
          this.locality_id = element.id;
        }
      });
    }
    const input = {
      lead_id: this.parameter.lead_id,
      city_id: this.city_id,
      locality_id: this.locality_id,
      price: this.leadData.price,
      bedrooms: this.leadData.bedrooms,
      bathrooms: this.leadData.bathrooms,
      carpet_area: this.leadData.carpet_area
    };

    this.admin.postDataApi('leads/updatePropertyInfo', input)
      .subscribe(
        r => {
          this.isShown = false;
          this.leadData = r.data.lead;
        });
  }
}
