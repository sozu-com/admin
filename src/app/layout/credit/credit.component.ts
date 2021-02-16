import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constant } from 'src/app/common/constants';
import { IProperty } from 'src/app/common/property';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.css']
})
export class CreditComponent implements OnInit {
  public parameter: IProperty = {};
  public location: IProperty = {};
  locale: any;
  creditsUserlistCount: number = 0;
  finalData: Array<any>;
  reportData: any;

  constructor(
    private translate: TranslateService,
    public admin: AdminService,
    private spinnerService: NgxSpinnerService,
    private constant: Constant
  ) { }

  ngOnInit() {
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.parameter.dash_flag = this.constant.dash_flag;
    this.parameter.user = new Array();
    this.getCountryLocality();
    this.initCalendarLocale();
    // this.getCreditsUser();
    this.getBuyers();
  }

  getCountryLocality = (): void => {
    this.admin.postDataApi('getCountryLocality', {}).subscribe((response) => {
      this.location.countries = response.data || [];
    });
  }

  initCalendarLocale = (): void => {
    if (this.translate.defaultLang === 'en') {
      this.locale = {
        firstDayOfWeek: 0,
        dayNames: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        dayNamesShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        dayNamesMin: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
          'November', 'December'],
        monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        today: 'Today',
        clear: 'Clear',
        dateFormat: 'mm/dd/yy',
        weekHeader: 'Wk',
        dataType: 'string'
      };
    } else {
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
        weekHeader: 'Sm',
        dataType: 'string'
      };
    }
  }

  onCountryChange = (countryId: string): boolean => {
    this.parameter.country_id = countryId;
    this.location.states = [];
    this.parameter.state_id = '0';
    this.location.cities = [];
    this.parameter.city_id = '0';
    this.location.localities = [];
    this.parameter.locality_id = '0';
    this.parameter.buildings = [];
    this.parameter.building_id = '0';
    if (!countryId || countryId.toString() === '0') {
      return false;
    }
    this.parameter.country_id = countryId;
    const selectedCountry = this.location.countries.filter(x => x.id.toString() === countryId);
    this.location.states = selectedCountry[0].states;
  }

  onStateChange = (stateId: string): boolean => {
    this.location.cities = [];
    this.parameter.city_id = '0';
    this.location.localities = [];
    this.parameter.locality_id = '0';
    this.parameter.buildings = [];
    this.parameter.building_id = '0';
    if (!stateId || stateId.toString() === '0') {
      return false;
    }
    this.parameter.state_id = stateId;
    const selectedState = this.location.states.filter(x => x.id.toString() === stateId);
    this.location.cities = selectedState[0].cities;
  }

  onCityChange = (cityId: string): boolean => {
    this.location.localities = [];
    this.parameter.locality_id = '0';
    this.parameter.buildings = [];
    this.parameter.building_id = '0';
    if (!cityId || cityId.toString() === '0') {
      return false;
    }
    this.parameter.city_id = cityId;
    const selectedCountry = this.location.cities.filter(x => x.id.toString() === cityId);
    this.location.localities = selectedCountry[0].localities;
  }

  onLocalityChange = (localityId: string): boolean => {
    this.parameter.buildings = []; this.parameter.building_id = '0';
    if (!localityId || localityId.toString() === '0') {
      return false;
    }
    this.parameter.locality_id = localityId;
  }


  resetDatesInput = (): void => {
    this.parameter.min = '';
    this.parameter.max = '';
  }

  getBuyers(){
    this.spinnerService.show();
    this.admin.postDataApi('getCreditsUser', {}).subscribe(
      success => {
       this.parameter.items = success.data;
       console.log(this.parameter.items,"user data")
        this.parameter.total = success.total;
      }, error => {
   });
  }

  getPage(page) {
    this.parameter.page = page;
    this.getBuyers();
  }

}
