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
import { ToastrService } from 'ngx-toastr';
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
  locale: any; total: any; pay_id: any;
  paymentConcepts: Array<any>; property_collection_id: string;
  reminder_date: any;
  paymentChoices: Array<any>;
  collectionIndex: number;
  last_payment_id: string;
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
  seller_type: any;
  paymentBanks: Array<any>; paymentMethods: Array<any>;
  payment_bank: any; building: any; paymentDate: Date;
  collection_commission: any; collection_payment_choice: any;
  selectedLevel: any; payment_id: any; payment_method_id: any; description: string;
  xml_url: any; property_collection: any;
  pdf_url: any; buyer: any; property: any; value: any;
  invoice_id: string; collection_commission_id: number; payment_date: any = new Date();
  invoice_date: any; docFile: string; amount: number; commission_type: any;
  @ViewChild('editPaymentModalOpen') editPaymentModalOpen: ElementRef;
  @ViewChild('editPaymentModalClose') editPaymentModalClose: ElementRef;
  @ViewChild('editCollectionReceiptOpen') editCollectionReceiptOpen: ElementRef;
  @ViewChild('editCollectionReceiptClose') editCollectionReceiptClose: ElementRef;
  constructor(
    public admin: AdminService, private propertyService: PropertyService,
    private translate: TranslateService, private toastr: ToastrService,
    public constant: Constant,
    private route: ActivatedRoute, private spinner: NgxSpinnerService,
    private router: Router, private price: PricePipe
  ) { }

  ngOnInit() {
    this.getProjectHome();
    this.getPayment();
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
    this.spinner.show();
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
    this.admin.postDataApi('getIncomeHomeData', input).subscribe(
      success => {
        this.items = success.data;
        for (let index = 0; index < this.items.length; index++) {
          const element = this.items[index];
          this.collection_payment_choice = element.collection_payment_choice;
          this.property_collection = this.collection_payment_choice.property_collection;
          this.buyer = this.property_collection.buyer;
          this.property = this.property_collection.property;
          this.building = this.property.building;
        }
        this.total = success.total;
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      });
  }
  userinfo = (userdata: any): void => {

    this.router.navigate(['/dashboard/users/edit-user', userdata.id]);
  }
  legalinfo = (userdata: any): void => {
    this.router.navigate(['/dashboard/legal-entities/add-legal-entity/', userdata.id]);
  }
  navigateToProperty = (collectionDetails: any): void => {
    console.log(collectionDetails, "userdata");
    this.router.navigate(['/dashboard/properties/view-properties/property', (collectionDetails || '')]);
  }
  viewDocument(item) {
    window.open(item.receipt, '_blank');
  }
  all(item) { }

  onSelectInvoiceDate(e) {
    this.invoice_date = moment.utc(e).toDate();
  }
  setPayAmount(item: any) {
    this.payment_id = item.id;
    this.payment_method_id = (item.payment_method || {}).id;
    this.description = item.description;
    this.docFile = item.receipt;
    this.amount = item.amount;
    this.commission_type = item.commission_type;
    this.collection_commission_id = item.collection_commission_id;
    this.payment_date = item.payment_date ? this.getDateWRTTimezone(item.payment_date, 'DD/MMM/YYYY') : '';
    this.invoice_date = item.invoice_date ? this.getDateWRTTimezone(item.invoice_date, 'DD/MMM/YYYY') : '';
    this.pdf_url = item.pdf_url;
    this.xml_url = item.xml_url;
    this.invoice_id = item.invoice_id;
  }
  closeEditCollReceiptModal() {
    this.editCollectionReceiptClose.nativeElement.click();
  }

  onSelect(e) {
    this.paymentDate = moment.utc(e).toDate();
  }


  setPaymentmethod(item: any) {
    let data = this.collection_commission.find(value => value.payment_method_id == item);
    this.pay_id = data;
    if (!this.pay_id) {
      this.payment_id = this.collection_commission ? this.collection_commission.id : [];
      this.payment_method_id = this.collection_commission ? (this.collection_commission.payment_method || {}).id : [];
      this.description = this.collection_commission ? this.collection_commission.description : [];
      this.docFile = this.collection_commission ? this.collection_commission.receipt : [];
      this.amount = this.collection_commission ? this.collection_commission.amount : [];
      this.commission_type = this.collection_commission ? this.collection_commission.commission_type : [];
      this.collection_commission_id = this.collection_commission ? this.collection_commission.collection_commission_id : [];
      this.payment_date = this.collection_commission ? this.collection_commission.payment_date : [];
      this.invoice_date = this.collection_commission ? this.collection_commission.invoice_date : [];
      this.pdf_url = this.collection_commission ? this.collection_commission.pdf_url : [];
      this.xml_url = this.collection_commission ? this.collection_commission.xml_url : [];
      this.invoice_id = this.collection_commission ? this.collection_commission.invoice_id : [];
    } else {
      this.selectedLevel = this.collection_commission[0];
      this.payment_id = this.collection_commission[0] ? this.collection_commission[0].id : [];
      this.payment_method_id = this.collection_commission[0] ? (this.collection_commission[0].payment_method || {}).id : [];
      this.description = this.collection_commission[0] ? this.collection_commission[0].description : [];
      this.docFile = this.collection_commission[0] ? this.collection_commission[0].receipt : [];
      this.amount = this.collection_commission[0] ? this.collection_commission[0].amount : [];
      this.commission_type = this.collection_commission[0] ? this.collection_commission[0].commission_type : [];
      this.collection_commission_id = this.collection_commission[0] ? this.collection_commission[0].collection_commission_id : [];
      this.payment_date = this.collection_commission[0] ? this.getDateWRTTimezone(this.collection_commission[0].payment_date, 'DD/MMM/YYYY') : [];
      this.invoice_date = this.collection_commission[0] ? this.getDateWRTTimezone(this.collection_commission[0].invoice_date, 'DD/MMM/YYYY') : [];
      this.pdf_url = this.collection_commission[0] ? this.collection_commission[0].pdf_url : [];
      this.xml_url = this.collection_commission[0] ? this.collection_commission[0].xml_url : [];
      this.invoice_id = this.collection_commission[0] ? this.collection_commission[0].invoice_id : [];
    }
  }

  updateCollectionCommPayment() {
    // checking if date selected and receipt selected
    if (this.commission_type != 4 && !this.collection_commission_id) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.payToCancel'), this.translate.instant('swal.error'));
      return false;
    }
    if (!this.docFile) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseChooseReceipt'), this.translate.instant('swal.error'));
      return false;
    }
    if (!this.payment_date) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseSelectPaymentDate'), this.translate.instant('swal.error'));
      return false;
    }
    const offset = new Date(this.payment_date).getTimezoneOffset();
    if (offset < 0) {
      this.payment_date = moment(this.payment_date).subtract(offset, 'minutes').toDate();
    } else {
      this.payment_date = moment(this.payment_date).add(offset, 'minutes').toDate();
    }

    // inpur params
    const input = {
      id: this.payment_id,
      payment_method_id: this.payment_method_id,
      receipt: this.docFile,
      description: this.description,
      payment_date: moment(this.payment_date).format('YYYY-MM-DD'),
      collection_commission_id: this.collection_commission_id,
      commission_type: this.commission_type,
      amount: this.amount
    };
    if (this.invoice_date) {
      const offset1 = new Date(this.invoice_date).getTimezoneOffset();
      if (offset1 < 0) {
        input['invoice_date'] = moment(this.invoice_date).subtract(offset1, 'minutes').toDate();
      } else {
        input['invoice_date'] = moment(this.invoice_date).add(offset1, 'minutes').toDate();
      }
    }
    input['invoice_id'] = this.invoice_id;
    input['pdf_url'] = this.pdf_url;
    input['xml_url'] = this.xml_url;
    // input['amount'] = amt - this.ivaAmount;
    // input['iva_amount'] = this.ivaAmount;

    if (this.invoice_date) {
      const offset1 = new Date(this.invoice_date).getTimezoneOffset();
      if (offset < 0) {
        input['invoice_date'] = moment(this.invoice_date).subtract(offset1, 'minutes').toDate();
      } else {
        input['invoice_date'] = moment(this.invoice_date).add(offset1, 'minutes').toDate();
      }
    }

    this.admin.postDataApi('applyCommissionPayment', input).subscribe(r => {
      this.router.navigate(['/dashboard/commissions/quick-visualization-commission', this.property_collection_id]);
      this.closeEditCollReceiptModal();
      this.toastr.clear();
      this.toastr.success(this.translate.instant('message.success.savedSuccessfully'), this.translate.instant('swal.success'));
    }, error => {
      this.toastr.error(error.message, this.translate.instant('swal.error'));
      return false;
    });
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
    this.admin.postDataApi('getIncomeHome', { user_id: JSON.parse(localStorage.getItem('user-id')) || 0 }).subscribe((response) => {
      this.selectedColumnsToShow = response.data || {};
    }, (error) => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), error.error.message, 'error');
    });
  }
  getPayment = (): void => {
    this.admin.postDataApi('getPaymentChoice', {}).subscribe((response) => {
      this.paymentChoices = response.data;
    }, (error) => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), error.error.message, 'error');
    });
  }
  changed(value) {
    this.value = value;
    console.log(value, "abc");
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

  showEditPaymentPopup(item: any, i: number) {
    this.paymentConcepts = [];
    //this.property_collection_id = item.id;
    this.collectionIndex = i;
    if (item.collection_commissions && item.collection_commissions.length > 0) {
      for (let index = 0; index < item.collection_commissions.length; index++) {
        const element = item.collection_commissions[index];
        if (item.payment_choices[index]) {
          item.payment_choices[index]['commission'] = element;
        }
      }
    }
    this.paymentConcepts = [...item.payment_choices];
    // this.last_payment_id = item.last_payment ? item.last_payment.collection_payment_id : '';
    //  this.last_payment_approved = item.last_payment ? item.last_payment.is_paid_calculated : 0;
    //this.last_payment = item.last_payment;
    this.last_payment_id = item.last_payment ? item.last_payment.parent_id : '';
    this.seller_type = item.seller_type;
    this.showPaymentBanks(item);
    this.getCollectionDetails();
    this.editPaymentModalOpen.nativeElement.click();
  }

  showPaymentBanks(item: any) {
    // payment banks
    this.paymentBanks = [];
    if (item.payment_received_by) {
      // payment directly received by agency
      if (item.property.building && item.property.building.agency_id) {
        // agency banks
        for (let index = 0; index < item.property.building.agency.agency_banks.length; index++) {
          const element = item.property.building.agency.agency_banks[index];
          element.name = 'Agency Bank | ' + element.bank_name;
          element.is_agency = 1;
          element.bank_id = element.id;
          element.legal_rep_bank_id = null;
          this.paymentBanks.push(element);
        }

        // agency legal representative banks
        if (item.property.building.agency.legal_representative) {
          for (let index = 0; index < item.property.building.agency.legal_representative.legal_rep_banks.length; index++) {
            const element = item.property.building.agency.legal_representative.legal_rep_banks[index];
            element.name = 'Agency Legal Rep Bank | ' + element.bank_name;
            element.is_agency = 1;
            element.bank_id = null;
            element.legal_rep_bank_id = element.id;
            this.paymentBanks.push(element);
          }
        }
      }
    } else {
      // payment directly received by seller
      if (item.seller_type != 2) {
        // seller (as a person or developer) banks
        for (let index = 0; index < item.seller.legal_rep_banks.length; index++) {
          const element = item.seller.legal_rep_banks[index];
          element.name = 'Seller Bank | ' + element.bank_name;
          element.is_agency = 2;
          element.bank_id = element.id;
          element.legal_rep_bank_id = null;
          this.paymentBanks.push(element);
        }

        // agency legal representative banks
        if (item.seller.legal_representative) {
          for (let index = 0; index < item.seller.legal_representative.legal_rep_banks.length; index++) {
            const element = item.seller.legal_representative.legal_rep_banks[index];
            element.name = 'Seller Legal Rep Bank | ' + element.bank_name;
            element.is_agency = 2;
            element.bank_id = null;
            element.legal_rep_bank_id = element.id;
            this.paymentBanks.push(element);
          }
        }
      } else {
        // seller (as a legal entity) banks
        if (item.seller_legal_entity && item.seller_legal_entity.legal_entity_banks) {
          for (let index = 0; index < item.seller_legal_entity.legal_entity_banks.length; index++) {
            const element = item.seller_legal_entity.legal_entity_banks[index];
            element.name = 'Seller Bank | ' + element.bank_name;
            element.is_agency = 2;
            element.bank_id = element.id;
            element.legal_rep_bank_id = null;
            this.paymentBanks.push(element);
          }

          // agency legal representative banks
          if (item.seller_legal_entity.legal_reps && item.seller_legal_entity.legal_reps.legal_rep_banks) {
            for (let index = 0; index < item.seller_legal_entity.legal_reps.legal_rep_banks.length; index++) {
              const element = item.seller_legal_entity.legal_reps.legal_rep_banks[index];
              element.name = 'Seller Legal Rep Bank | ' + element.bank_name;
              element.is_agency = 2;
              element.bank_id = null;
              element.legal_rep_bank_id = element.id;
              this.paymentBanks.push(element);
            }
          }
        }
      }
    }
  }

  getCollectionDetails() {
    const reducingP = [];
    for (let index = 0; index < this.paymentConcepts.length; index++) {
      const m = this.paymentConcepts[index];
      m.payment_date = m.collection_payment > 0 ? this.getDateWRTTimezone(m.collection_payment.payment_date, 'YYYY-MM-DD') : '';
      m.paid_amount = m.calc_payment_amount ? m.calc_payment_amount : 0;

      let c = {};
      // if type=2 means reducing payment => add one more row
      if (m.collection_paymentss && m.collection_paymentss.length > 0) {
        for (let i = 0; i < m.collection_paymentss.length; i++) {
          const paymnts = m.collection_paymentss[i];
          paymnts.payment_bank = null;
          // payment bank
          if (paymnts.is_agency == 1) {
            // payment directly received by agency
            if (paymnts.bank_id) {
              // agency bank
              paymnts['payment_bank'] = paymnts.agency_banks;
            } else if (paymnts.legal_rep_bank_id) {
              // agency legal rep bank
              paymnts['payment_bank'] = paymnts.legal_rep_bank;
            }
          } else {
            // payment directly received by seller
            if (this.seller_type != 2) {  // seller as person or developer
              if (paymnts.bank_id) {
                // seller bank
                paymnts['payment_bank'] = paymnts.legal_representative_banks;
              } else if (paymnts.legal_rep_bank_id) {
                // seller legal rep bank
                paymnts['payment_bank'] = paymnts.legal_rep_bank;
              }
            } else {  // seller as legal entity
              if (paymnts.bank_id) {
                // seller bank
                paymnts['payment_bank'] = paymnts.legal_entitiy_bank;
              } else if (paymnts.legal_rep_bank_id) {
                // seller legal rep bank
                paymnts['payment_bank'] = paymnts.legal_rep_bank;
              }
            }
          }
          c = {
            key: 'remaining_amt',
            name: '',
            paid_amount: paymnts.full_amount,
            is_paid_calculated: 0,
            outstanding_amount: 0,
            index: index + i,
            payment_type: 2,  // in real its 2
            receipt: paymnts.receipt,
            description: paymnts.description,
            display_choice_id: paymnts.display_choice_id,
            created_at: paymnts.created_at
          };
          if (paymnts.payment_type == 2) {
            c['name'] = 'Payment to remaining (Reduce Amount)';
            c['collection_paymentss'] = [{
              id: paymnts.id,
              parent_id: paymnts.parent_id,
              payment_type: 1,  // in real its 2
              paid_amount: paymnts.amount,
              amount: paymnts.amount,
              payment_date: this.getDateWRTTimezone(paymnts.payment_date, 'YYYY-MM-DD'),
              receipt: paymnts.receipt,
              description: paymnts.description,
              payment_method: paymnts.payment_method,
              payment_bank: paymnts.payment_bank
            }];
            reducingP.push(c);
          } else if (paymnts.payment_type == 3 && paymnts.display_choice_id) {
            c['name'] = 'Payment to remaining (Reduce Time)';
            c['collection_paymentss'] = [{
              id: paymnts.id,
              parent_id: paymnts.parent_id,
              payment_type: 3,  // in real its 3
              paid_amount: paymnts.full_amount,
              amount: paymnts.full_amount,
              payment_date: this.getDateWRTTimezone(paymnts.payment_date, 'YYYY-MM-DD'),
              receipt: paymnts.receipt,
              description: paymnts.description,
              payment_method: paymnts.payment_method,
              payment_bank: paymnts.payment_bank
            }];
            reducingP.push(c);
          } else if (paymnts.payment_type == 5 && paymnts.display_choice_id) {
            c['name'] = 'Total Payment';
            c['collection_paymentss'] = [{
              id: paymnts.id,
              parent_id: paymnts.parent_id,
              payment_type: 5,  // in real its 5
              paid_amount: paymnts.full_amount,
              amount: paymnts.full_amount,
              payment_date: this.getDateWRTTimezone(paymnts.payment_date, 'YYYY-MM-DD'),
              receipt: paymnts.receipt,
              description: paymnts.description,
              payment_method: paymnts.payment_method,
              payment_bank: paymnts.payment_bank
            }];
            reducingP.push(c);
          }
        }
      }

      m['outstanding_amount'] = m.amount - (m.calc_payment_amount || 0);
      if ((m.amount - (m.calc_payment_amount || 0)) >= 0) {
        const a = (m.calc_payment_amount || 0);
        m['is_pending'] = a ? 1 : 0;
      }
    }

    // now insert at reducing remaining payments at type=2 index
    // sorting reducingP according to date => in case user is paying using type 3 consecutively many times
    reducingP.sort(this.sortFunction);

    for (let i = 0; i < reducingP.length; i++) {
      const element = reducingP[i];
      // for payment_type 3,5 check display_choice_id
      // loop is for if need to insert 2 type 2 payments on same index
      for (let j = 0; j < this.paymentConcepts.length; j++) {
        const e = this.paymentConcepts[j];
        if (e.id == element.display_choice_id) {
          this.paymentConcepts.splice(j, 0, element);
          break;
        }
      }
    }

    // calculating new paid amt, by skipping type 2
    for (let index = 0; index < this.paymentConcepts.length; index++) {
      const element = this.paymentConcepts[index];
      if (element.collection_paymentss && element.collection_paymentss.length > 0) {
        for (let i = 0; i < element.collection_paymentss.length; i++) {
          const ele = element.collection_paymentss[i];
          if (ele.payment_type == 2) {
            const v = ele.amt_share || 0;
            const ids = ele.choices_ids.split(',');
            for (let j = 0; j < this.paymentConcepts.length; j++) {
              const e = this.paymentConcepts[j];
              if (e.id) {
                const d = e.id.toString();
                const h = ids.indexOf(d);
                if (h >= 0) {
                  const obj = {
                    id: ele.id,
                    amount: v,
                    name: 'Payment to remaining (Reduce Amount)',
                    payment_type: 1,  // in real its 3
                    paid_amount: v,
                    payment_date: this.getDateWRTTimezone(ele.payment_date, 'YYYY-MM-DD'),
                    receipt: ele.receipt,
                    description: ele.description,
                    payment_method: ele.payment_method,
                    payment_bank: ele.payment_bank
                  };
                  this.paymentConcepts[j].paid_amount = parseFloat(this.paymentConcepts[j].paid_amount) - parseFloat(v);
                }
              }
            }
          }
        }
      }
    }
  }

  sortFunction(a, b) {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return dateA > dateB ? 1 : -1;
  }

  editCollectionCommReceipt(item: any) {
    this.collection_commission = item;
    this.selectedLevel = this.collection_commission[0];
    this.payment_id = this.collection_commission[0] ? this.collection_commission[0].id : [];
    this.payment_method_id = this.collection_commission[0] ? (this.collection_commission[0].payment_method || {}).id : [];
    this.description = this.collection_commission[0] ? this.collection_commission[0].description : [];
    this.docFile = this.collection_commission[0] ? this.collection_commission[0].receipt : [];
    this.amount = this.collection_commission[0] ? this.collection_commission[0].amount : [];
    this.commission_type = this.collection_commission[0] ? this.collection_commission[0].commission_type : [];
    this.collection_commission_id = this.collection_commission[0] ? this.collection_commission[0].collection_commission_id : [];
    this.payment_date = this.collection_commission[0] ? this.getDateWRTTimezone(this.collection_commission[0].payment_date, 'DD/MMM/YYYY') : [];
    this.invoice_date = this.collection_commission[0] ? this.getDateWRTTimezone(this.collection_commission[0].invoice_date, 'DD/MMM/YYYY') : [];
    this.pdf_url = this.collection_commission[0] ? this.collection_commission[0].pdf_url : [];
    this.xml_url = this.collection_commission[0] ? this.collection_commission[0].xml_url : [];
    this.invoice_id = this.collection_commission[0] ? this.collection_commission[0].invoice_id : [];
    this.closeEditPaymentModal();
    this.editCollectionReceiptOpen.nativeElement.click();
  }

  closeEditPaymentModal() {
    this.paymentConcepts = [];
    this.editPaymentModalClose.nativeElement.click();
  }
}
