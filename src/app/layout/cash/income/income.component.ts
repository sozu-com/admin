import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constant } from 'src/app/common/constants';
import { IProperty } from 'src/app/common/property';
import { AdminService } from 'src/app/services/admin.service';
import * as moment from 'moment';
import { PricePipe } from 'src/app/pipes/price.pipe';
import { ExcelDownload } from 'src/app/common/excelDownload';
import { PropertyService } from 'src/app/services/property.service';
declare let swal: any;
@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
  public scrollbarOptions = { axis: 'y', theme: 'dark' };
  public parameter: IProperty = {};
  @ViewChild('openSelectColumnsModal') openSelectColumnsModal: ElementRef;
  @ViewChild('closeSelectColumnsModal') closeSelectColumnsModal: ElementRef;
  public select_columns_list: any[] = [];
  public selectedColumnsToShow: any = {};
  public isSelectAllColumns: boolean = false;
  public keyword: string = ''; public language_code: string;
  is_back: boolean;
  locale: any;
  collectionStatusFilter = [
    { name: 'Up to Date', value: 1 },
    { name: 'Payment Period', value: 2 },
    { name: 'Overdue Payment', value: 3 },
    { name: 'Cancelled', value: 4 },
    { name: 'Settled', value: 5 },
    { name: 'Inconsistency', value: 6 },
    { name: 'Only Commission for sale', value: 7 }
  ];
  today: Date;
  public location: IProperty = {};
  private exportfinalData: any[] = [];
  items: any = [];
  constructor(
    public admin: AdminService, private propertyService: PropertyService,
    private translate: TranslateService,
    public constant: Constant,
    private route: ActivatedRoute, private spinner: NgxSpinnerService,
    private router: Router, private price: PricePipe
  ) { }

  ngOnInit() {
    this.getProjectHome();
    this.today = new Date();
    this.getCountries();
    this.initCalendarLocale();
    this.parameter.page = this.constant.p;
    this.parameter.dash_flag = this.constant.dash_flag;
    this.parameter.itemsPerPage = 10;
  }
  getPage(page) {
    this.parameter.page = page;
    this.getListing();
  }
  getListing() {

  }
  generateAccountStatementPdf(item) { }

  initCalendarLocale() {
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

  getCountries() {
    this.spinner.show();
    this.admin.postDataApi('getCountryLocality', {}).subscribe(r => {
      this.spinner.hide();
      this.location.countries = r['data'];
      if (this.is_back) {
        const selectedCountry = this.location.countries.filter(x => x.id.toString() === this.parameter.country_id);
        this.location.states = selectedCountry.length > 0 ? selectedCountry[0].states : [];
        const selectedState = this.location.states.filter(x => x.id.toString() === this.parameter.state_id);
        this.location.cities = selectedState.length > 0 ? selectedState[0].cities : [];
        const selectedlocality = this.location.cities.filter(x => x.id.toString() === this.parameter.city_id);
        this.location.localities = selectedlocality.length > 0 ? selectedlocality[0].localities : [];
      } else {
        this.parameter.country_id = '0';
        this.parameter.state_id = '0';
        this.parameter.city_id = '0';
        this.parameter.locality_id = '0';
        this.parameter.building_id = '0';
        this.parameter.commission_type = '1';
      }
      this.getListing();
    });
  }

  getProjectSelection = (isFirstTime: boolean, keyword?: string): void => {
    this.spinner.show();
    this.admin.postDataApi('getIncomeSelection', { name: keyword }).subscribe((response) => {
      this.spinner.hide();
      this.select_columns_list = (response.data || []).sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
      (this.select_columns_list || []).forEach((data, index) => {
        this.makeSelectedColumns(data.id, index);
      });
      this.changeSelect();
      if (isFirstTime) {
        this.keyword = '';
        this.isSelectAllColumns = false;
        this.language_code = localStorage.getItem('language_code');
        this.openSelectColumnsModal.nativeElement.click();
      }
    }, (error) => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), ((error || {}).error || {}).message, 'error');
    });
  }

  changeSelect = (): void => {
    let index = 0;
    (this.select_columns_list || []).forEach((data) => {
      if (data.isCheckBoxChecked) {
        index += 1;
      }
    });
    if ((this.select_columns_list || []).length == index) {
      this.isSelectAllColumns = true;
    } else {
      this.isSelectAllColumns = false;
    }
  }

  makeSelectedColumns = (id: number, index: number): void => {
    switch (id) {
      case 1:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.buyer_name;
        break;
      case 2:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.payment_concept;
        break;
      case 3:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.payment_date;
        break;
      case 4:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.amount_paid;
        break;
      case 5:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.project_name;
        break;
      case 6:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.property_name;
        break;
      case 7:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.payment_status;
        break;
      case 8:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.action;
        break;
      default:
        break;
    }

  }

  getProjectHome = (): void => {
    //this.spinner.show();
    this.admin.postDataApi('getIncomeHome', { user_id: JSON.parse(localStorage.getItem('user-id')) || 0 }).subscribe((response) => {
      this.selectedColumnsToShow = response.data || {};
      //this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), error.error.message, 'error');
    });
  }

  changeSelectAll = (): void => {
    (this.select_columns_list || []).forEach((data) => {
      data.isCheckBoxChecked = this.isSelectAllColumns;
    });
  }

  changeFlag(flag: number) {
    this.parameter.dash_flag = flag;
    this.propertyService.dash_flag = flag;
    if (flag === 5) {
      return false;
    }
    this.resetDates();
    this.getListing();
  }

  resetDates() {
    this.parameter.min = '';
    this.parameter.max = '';
  }

  closeSelectColumnsPopup = (): void => {
    this.keyword = '';
    this.isSelectAllColumns = false;
    this.closeSelectColumnsModal.nativeElement.click();
  }

  applyShowSelectedColumns = (): void => {
    this.spinner.show();
    this.admin.postDataApi('updateIncomeHome', this.getPostRequestForColumn()).subscribe((response) => {
      this.getListing();
      this.closeSelectColumnsPopup();
      this.getProjectHome();
      this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), error.error.message, 'error');
    });
  }

  getPostRequestForColumn = (): any => {
    return {
      user_id: JSON.parse(localStorage.getItem('user-id')) || 0,
      buyer_name: (this.select_columns_list[0] || []).isCheckBoxChecked,
      payment_concept: (this.select_columns_list[1] || []).isCheckBoxChecked,
      payment_date: (this.select_columns_list[2] || []).isCheckBoxChecked,
      amount_paid: (this.select_columns_list[3] || []).isCheckBoxChecked,
      project_name: (this.select_columns_list[4] || []).isCheckBoxChecked,
      property_name: (this.select_columns_list[5] || []).isCheckBoxChecked,
      payment_status: (this.select_columns_list[6] || []).isCheckBoxChecked,
      action: (this.select_columns_list[7] || []).isCheckBoxChecked
    };
  }

  getTransformedAmount(value: any) {
    return (this.price.transform(Number(value).toFixed(2)).toString()).substring(1);
  }

  getDateWRTTimezone(date: any, format: any) {
    const offset = new Date(date).getTimezoneOffset();
    if (offset < 0) {
      return moment(date).subtract(offset, 'minutes').format(format);
    } else {
      return moment(date).add(offset, 'minutes').format(format);
    }
  }

  getExportlisting = (): void => {
    this.spinner.show();
    this.exportfinalData = [];
    const input: any = JSON.parse(JSON.stringify(this.parameter));
    if (this.parameter.deal_to_date && this.parameter.deal_from_date) {
      input.deal_to_date = this.parameter.deal_to_date;
      input.deal_from_date = this.parameter.deal_from_date;
    }
    if (this.parameter.min) {
      input.min = moment(this.parameter.min).format('YYYY-MM-DD');
    } else {
      delete input.min;
    }
    if (this.parameter.max) {
      input.max = moment(this.parameter.max).format('YYYY-MM-DD');
    } else {
      delete input.max;
    }
    if (this.parameter.deal_purchase_date) {
      input.deal_purchase_date = moment(this.parameter.deal_purchase_date).format('YYYY-MM-DD');
    } else {
      delete input.deal_purchase_date;
    }

    input.is_approved = this.parameter.flag;
    input.page = 0;
    this.admin.postDataApi('getCommissions', input).subscribe((success) => {
      this.exportfinalData = success.data || [];

      for (let index = 0; index < this.items.length; index++) {
        const element = this.items[index];
        const dif = (element.property.final_price || 0).toFixed(2) - (element.total_deals_sum || 0).toFixed(2);
        const currency_id = element.currency_id;

        if (!element.total_deals_sum) {
          element.payment_status = 6;
        } else if ((dif >= 5 && currency_id == 78) || (dif >= 0.5 && currency_id == 124)) {
          element.payment_status = 6;
        } else if (element.next_payment && element.next_payment.date) {
          element.payment_status = element.collection_status;
        } else {
          element.payment_status = 5;
        }
      }

      this.makeExportData();
      this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
    });
  }

  makeExportData = (): void => {
    if (this.exportfinalData.length > 0) {
      const tempExportData = [];
      for (let index = 0; index < this.exportfinalData.length; index++) {
        const p = this.exportfinalData[index];

        tempExportData.push({
          'Payment ID': p.id || '',
          'Collection ID': p.id || '',
          'Buyer Name': (p.buyer_type == 2) ? (p.buyer_legal_entity || {}).comm_name || '' : (p.buyer || {}).name + ' ' + (p.buyer || {}).first_surname + ' ' + (p.buyer || {}).second_surname || '',
          'Payment concept': (p.buyer_type == 2) ? (((p.buyer_legal_entity || {}).legal_reps || {}).name) ? (((p.buyer_legal_entity || {}).legal_reps || {}).name + ' ' + ((p.buyer_legal_entity || {}).legal_reps || {}).first_surname + ' ' + ((p.buyer_legal_entity || {}).legal_reps || {}).second_surname) : ''
            : (((p.buyer || {}).legal_representative || {}).name) ? (((p.buyer || {}).legal_representative || {}).name + ' ' + ((p.buyer || {}).legal_representative || {}).first_surname + ' ' + ((p.buyer || {}).legal_representative || {}).second_surname) : '',
          'Payment date': (p.seller_type == 2) ? (p.seller_legal_entity || {}).comm_name || '' : (p.seller || {}).name + ' ' + (p.seller || {}).first_surname + ' ' + (p.seller || {}).second_surname,
          'Amount paid': (p.seller_type == 2) ? ((p.seller_legal_entity || {}).legal_reps || {}).name + ' ' + ((p.seller_legal_entity || {}).legal_reps || {}).first_surname + ' ' + ((p.seller_legal_entity || {}).legal_reps || {}).second_surname :
            ((p.seller || {}).legal_representative || {}).name + ' ' + ((p.seller || {}).legal_representative || {}).first_surname + ' ' + ((p.seller || {}).legal_representative || {}).second_surname,
          'Name of Building': ((p.property || {}).building || {}).name || '',
          'Apartment': ((p.property || {}).building_towers || {}).tower_name || '',
          'Payment status': (p.property || {}).name || ''
        });
      }
      new ExcelDownload().exportAsExcelFile(tempExportData, 'Income');
    }
  }
  onCountryChange(id) {
    this.parameter.country_id = id;
    this.parameter.state_id = '0';
    this.parameter.city_id = '0';
    this.parameter.locality_id = '0';
    this.location.states = [];
    this.location.cities = [];
    this.location.localities = [];
    this.parameter.buildings = [];
    this.parameter.building_id = '0';
    if (!id || id.toString() === '0') {
      return false;
    }

    this.parameter.country_id = id;
    const selectedCountry = this.location.countries.filter(x => x.id.toString() === id);
    this.location.states = selectedCountry[0].states;
  }

  onStateChange(id) {
    this.parameter.state_id = id;
    this.location.cities = []; this.parameter.city_id = '0';
    this.location.localities = []; this.parameter.locality_id = '0';
    this.parameter.buildings = []; this.parameter.building_id = '0';
    if (!id || id.toString() === '0') {
      return false;
    }

    this.parameter.state_id = id;
    const selectedState = this.location.states.filter(x => x.id.toString() === id);
    this.location.cities = selectedState[0].cities;
  }

  onCityChange(id) {
    this.parameter.city_id = id;
    this.location.localities = []; this.parameter.locality_id = '0';
    this.parameter.buildings = []; this.parameter.building_id = '0';
    if (!id || id.toString() === '0') {
      return false;
    }

    this.parameter.city_id = id;
    const selectedCountry = this.location.cities.filter(x => x.id.toString() === id);
    this.location.localities = selectedCountry[0].localities;
  }

  onLocalityChange(id) {
    this.parameter.buildings = []; this.parameter.building_id = '0';
    if (!id || id.toString() === '0') {
      return false;
    }
    this.parameter.locality_id = id;
  }

  getLocalityBuildings(id) {
    if (!id || id.toString() === '0') {
      this.parameter.localities = [];
      this.parameter.locality_id = '0';
      this.parameter.building_id = '0';
      this.parameter.buildings = [];
      return false;
    }
    this.parameter.locality_id = id;
    this.parameter.localities = [];
    this.parameter.localities.push(parseInt(this.parameter.locality_id));
    this.spinner.show();
    this.admin.postDataApi('getLocalityBuildings', this.parameter)
      .subscribe(
        success => {
          this.spinner.hide();
          this.parameter.buildings = success.data;
        }, error => {
          this.spinner.hide();
        });
  }
  setBuilding(building_id) {
    this.parameter.building_id = building_id;
  }
  resetFilters() {
    this.location.countries = JSON.parse(JSON.stringify(this.location.countries));
    this.onCountryChange('0');
    this.parameter.is_selected = false;
    this.parameter.page = this.constant.p;
    this.parameter.dash_flag = this.constant.dash_flag;
    this.parameter.total = 0;
    this.parameter.count_flag = 1;
    this.is_back = false
    this.parameter.itemsPerPage = 25;
    this.parameter.commission_type = '1';
    this.resetDates();
    this.getListing();
  }
}
