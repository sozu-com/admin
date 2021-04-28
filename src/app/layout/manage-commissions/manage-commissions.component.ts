import { Component, OnInit } from '@angular/core';
import { IProperty } from 'src/app/common/property';
import { PropertyService } from 'src/app/services/property.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from 'src/app/services/admin.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Constant } from 'src/app/common/constants';
import * as moment from 'moment';

@Component({
  selector: 'app-manage-commissions',
  templateUrl: './manage-commissions.component.html',
  styleUrls: ['./manage-commissions.component.css']
})
export class ManageCommissionsComponent implements OnInit {
  public parameter: IProperty = {};
  public location: IProperty = {};
  is_back: boolean;
  locale: any;
  items: any = [];
  total: any = 0;
  today: Date;

  collectionStatusFilter = [
    { name: 'Up to Date', value: 1 },
    { name: 'Payment Period', value: 2 },
    { name: 'Overdue Payment', value: 3 },
    { name: 'Cancelled', value: 4 },
    { name: 'Settled', value: 5 },
    { name: 'Inconsistency', value: 6 },
    { name: 'Only Commission for sale', value: 7 }];

  constructor(
    private propertyService: PropertyService,
    private spinner: NgxSpinnerService,
    public admin: AdminService,
    private translate: TranslateService,
    public constant: Constant,
  ) { }

  ngOnInit() {
    this.parameter.page = this.constant.p;
    this.parameter.dash_flag = this.constant.dash_flag;
    this.parameter.itemsPerPage = 25;
    this.parameter.flag = 1;
    this.parameter.commission_type = '1';
    this.today = new Date();
    this.getCountries();
    this.initCalendarLocale();
  }

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

  sort_by(sort_by) {
    if (this.parameter.sort_by !== sort_by) {
      this.parameter.sort_by = sort_by;
      this.parameter.sort_by_order = 1;
    } else {
      this.parameter.sort_by_order = this.parameter.sort_by_order ? 0 : 1;
    }
    this.getListing();
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
      }
      this.getListing();
    });
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
    this.resetDates();
    this.getListing();
  }


  getListing(){
    this.spinner.show();
    const input: any = JSON.parse(JSON.stringify(this.parameter));
    if (this.parameter.deal_to_date && this.parameter.deal_from_date) {
      input.deal_to_date = this.parameter.deal_to_date;
      input.deal_from_date = this.parameter.deal_from_date;
      // console.log('this.parameter.deal_from_date', this.parameter.deal_from_date);
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
    this.admin.postDataApi('getCommissions', input).subscribe(
      success => {
        // localStorage.setItem('parametersForCollection', JSON.stringify(this.parameter));
        //  console.log('getcollection ', success);
        this.items = success.data;
        this.total = success.total_count;

        // fetching payment status
        for (let index = 0; index < this.items.length; index++) {
          const element = this.items[index];
          const dif = (element.deal_price || 0).toFixed(2) - (element.total_deals_sum || 0).toFixed(2);
          const currency_id = element.currency_id;

          if (!element.total_deals_sum) {
            element.payment_status = 6;
          } else if ((dif >= 5 && currency_id == 78) || (dif >= 0.5 && currency_id == 124)) {
            element.payment_status = 6;
          } else if (element.next_payment && element.next_payment.date) {
            // const diff: any = moment().diff(moment(element.next_payment.date, 'YYYY-MM-DD'), 'days', true);
            // if (diff > 0 && diff <= 5) {
            //   element.payment_status = 2;
            // } else if (diff > 5) {
            //   element.payment_status = 3;
            // } else if (diff <= 0) {
            //   element.payment_status = 1;
            // }
            element.payment_status = element.collection_status;
          } else {
            element.payment_status = 5;
          }

          // fetching commissions %
          let cc_percent = 0, cc_received = 0, cc_receipt = 0, cc_invoice = 0, cc_active = 0;
          let pc_received = 0, pc_receipt = 0, pc_invoice = 0, pc_active = 0;
          let ac_receipt = 0, ac_invoice = 0, ac_active = 0;
          for (let i = 0; i < element.collection_commissions.length; i++) {
            const ele = element.collection_commissions[i];
            cc_percent = cc_percent + (ele.add_collection_commission ? ele.percent : 0);
            cc_received = cc_received + (ele.add_collection_commission ? ele.amount : 0);
            pc_received = pc_received + (ele.add_purchase_commission ? ele.purchase_comm_amount : 0);
            // console.log('aaaaa', pc_received, ele.purchase_comm_amount)
            if (ele.add_collection_commission) {
              cc_active++;
            }
            if (ele.payment) {
              cc_receipt++;
              if (ele.payment.invoice_id) {
                cc_invoice++;
              }
            }

            if (ele.add_purchase_commission) {
              pc_active++;
            }
            if (ele.purchase_payment) {
              pc_receipt++;
              if (ele.purchase_payment.invoice_id && ele.purchase_payment.pdf_url && ele.purchase_payment.xml_url) {
                pc_invoice++;
              }
            }

            if (ele.add_agent_commission) {
              ac_active++;
            }
            if (ele.agent_payment) {
              ac_receipt++;
              if (ele.agent_payment.invoice_id) {
                ac_invoice++;
              }
            }
          }
          // console.log('pc_received', pc_received)
          element['sum_pc'] = pc_received;
          element['cc_percent'] = this.numberUptoNDecimal((cc_percent / cc_active), 3);
          element['cc_received'] = element.iva_percent && element.add_iva_to_cc ?
            (cc_received + (cc_received * element.iva_percent) / 100) : cc_received;
          element['cc_receipt'] = cc_receipt == cc_active && cc_receipt != 0 ? 1 : 0;
          element['cc_invoice'] = cc_invoice == cc_active && cc_invoice != 0 ? 1 : 0;
          element['pc_received'] = element.iva_percent && element.add_iva_to_pc ?
            (pc_received + (pc_received * element.iva_percent) / 100) : pc_received;
          element['pc_receipt'] = pc_receipt == pc_active && pc_receipt != 0 ? 1 : 0;
          element['pc_invoice'] = pc_invoice == pc_active && pc_invoice != 0 ? 1 : 0;

          element['ac_receipt'] = ac_receipt == ac_active && ac_receipt != 0 ? 1 : 0;
          element['ac_invoice'] = ac_invoice == ac_active && ac_invoice != 0 ? 1 : 0;
        }

        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      });
  }

  numberUptoNDecimal(num: any, n: number) {
    return num ? num.toFixed(n) : 0;
  }

  getDateWRTTimezone(date: any, format: any) {
    const offset = new Date(date).getTimezoneOffset();
    if (offset < 0) {
      return moment(date).subtract(offset, 'minutes').format(format);
    } else {
      return moment(date).add(offset, 'minutes').format(format);
    }
  }

  getLastPaymentConcept(item: any) {
    // payment_type == 1 means => pay to following => means show concept name
    // payment_type == 2 means => pay to remaining (reduce amt) => show same
    // payment_type == 3 means => pay to remaining (reduce time) => show same
    if (item.last_payment.payment_type == 1 || item.last_payment.payment_type == 4) {
      return item.last_payment.name;
    } else if (item.last_payment.payment_type == 2) {
      return 'Payment to remaining (Reduce Amount)';
    } else if (item.last_payment.payment_type == 3) {
      return 'Payment to remaining (Reduce Amount)';
    } else {
      return 'Total Payment';
    }
  }

  getRemainingAmt(p: any) {
    const v = (((p.deal_price || 0) + (p.penalty || 0)) - (p.total_payment_recieved || 0));
    //const v = ((p.deal_price || 0) - (p.total_payment_recieved || 0));
    return v > 0 ? v : 0;
  }

  getPage(page) {
    this.parameter.page = page;
    this.getListing();
  }

}
