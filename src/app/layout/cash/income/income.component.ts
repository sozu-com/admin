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
import { CommonService } from 'src/app/services/common.service';
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
  seller_type: any; selectedValue: any; thing_id: any;
  paymentBanks: Array<any>; paymentMethods: Array<any>;
  payment_bank: any; building: any; paymentDate: Date;
  collection_commission: any; collection_payment_choice: any;
  selectedLevel: any; payment_id: any; payment_method_id: any; description: string;
  xml_url: any; property_collection: any; payment_choice_id: any;
  pdf_url: any; buyer: any; property: any; value: any; payment_res: any;
  invoice_id: string; collection_commission_id: number; payment_date: any = new Date();
  invoice_date: any; docFile: string; amount: number; commission_type: any;
  @ViewChild('editPaymentModalOpen') editPaymentModalOpen: ElementRef;
  @ViewChild('editPaymentModalClose') editPaymentModalClose: ElementRef;
  @ViewChild('editCollectionReceiptOpen') editCollectionReceiptOpen: ElementRef;
  @ViewChild('editReceiptOpen') editReceiptOpen: ElementRef;
  @ViewChild('editReceiptClose') editReceiptClose: ElementRef;
  @ViewChild('editCollectionReceiptClose') editCollectionReceiptClose: ElementRef;
  constructor(
    public admin: AdminService, private propertyService: PropertyService,
    private translate: TranslateService, private toastr: ToastrService,
    public constant: Constant, public cs: CommonService,
    private route: ActivatedRoute, private spinner: NgxSpinnerService,
    private router: Router, private price: PricePipe
  ) { }

  ngOnInit() {
    this.getProjectHome();
    this.getPayment();
    this.getPaymentMethods();
    this.today = new Date();
    this.getCountries();
    this.initCalendarLocale();
    this.parameter.page = this.constant.p;
    this.parameter.dash_flag = 2;
    this.parameter.itemsPerPage = 10;
  }
  getPaymentMethods() {
    this.admin.postDataApi('getPaymentMethods', {})
      .subscribe(
        success => {
          this.paymentMethods = success.data;
        }, error => {
          this.spinner.hide();
        }
      );
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
    input.payment_choice_id = this.selectedValue;
    input.is_approved = this.parameter.flag;
    this.admin.postDataApi('getIncomeHomeData', input).subscribe(
      success => {
        // this.cs.incomes = success.data;
        this.items = success.data;
        for (let index = 0; index < this.items.length; index++) {
          const element = this.items[index];
          element['collection_payment_choice'] = element.collection_payment_choice;
          element['property_collection'] = element['collection_payment_choice'].property_collection;
          element['buyer'] = element['property_collection'].buyer;
          element['property'] = element['property_collection'].property;
          element['building'] = element['property'].building;
        }
        // this.cs.totalIncomes = success.total;
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
    //this.docFile = item.receipt;
    // this.editReceiptOpen.nativeElement.click();
    window.open(item.receipt, '_blank');
  }
  updateReceipt() {

    const input = {
      id: this.payment_id,
      receipt: this.docFile
    };

    this.admin.postDataApi('updatePaymentById', input).subscribe(r => {
      this.getListing();
      this.editReceiptClose.nativeElement.click();
      this.toastr.clear();
      this.toastr.success(this.translate.instant('message.success.savedSuccessfully'), this.translate.instant('swal.success'));
    }, error => {
      this.toastr.error(error.message, this.translate.instant('swal.error'));
      return false;
    });
  }

  all(data: any) {
    this.router.navigate(['dashboard/cash/income/quick-visualization-income', data.id]);
  }

  closeEditReceiptModal() {
    this.editReceiptClose.nativeElement.click();
  }
  closeEditCollReceiptModal() {
    this.editCollectionReceiptClose.nativeElement.click();
  }

  onSelect(e) {
    this.paymentDate = moment.utc(e).toDate();
  }
  //payment update
  updateCollectionCommPayment() {
    // checking if date selected and receipt selected
    if (!this.payment_date) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseSelectPaymentDate'), this.translate.instant('swal.error'));
      return false;
    }
    if (!this.docFile) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseChooseReceipt'), this.translate.instant('swal.error'));
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
      payment_date: this.payment_date,
      amount: this.amount
    };

    this.admin.postDataApi('updatePaymentById', input).subscribe(r => {
      this.router.navigate(['dashboard/cash/income/quick-visualization-income', r['data'].id]);
      this.closeEditCollReceiptModal();
      this.toastr.clear();
      this.toastr.success(this.translate.instant('message.success.savedSuccessfully'), this.translate.instant('swal.success'));
    }, error => {
      this.toastr.error(error.message, this.translate.instant('swal.error'));
      return false;
    });
  }
  //info payment
  editCollectionCommReceipt(item: any) {
    this.admin.postDataApi('getPaymentById', { id: item.id }).subscribe((response) => {
      this.editCollectionReceiptOpen.nativeElement.click();
      this.payment_res = response.data;
      if (this.payment_res) {
        this.payment_id = this.payment_res.id;
        this.payment_method_id = this.payment_res.payment_method_id;
        this.description = this.payment_res.description;
        this.docFile = this.payment_res.receipt;
        this.amount = this.payment_res.amount;
        this.payment_date = this.payment_res.payment_date ? this.getDateWRTTimezone(this.payment_res.payment_date, 'DD/MMM/YYYY') : '';
      }
    }, (error) => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), error.error.message, 'error');
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
      action: (this.select_columns_list[6] || []).isCheckBoxChecked
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
    this.admin.postDataApi('getIncomeHomeData', input).subscribe((success) => {
      this.exportfinalData = success.data || [];
      for (let index = 0; index < this.exportfinalData.length; index++) {
        const element = this.exportfinalData[index];
        element['collection_payment_choice'] = element.collection_payment_choice;
        element['property_collection'] = element['collection_payment_choice'].property_collection;
        element['buyer'] = element['property_collection'].buyer;
        element['property'] = element['property_collection'].property;
        element['building'] = element['property'].building;
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
          'Collection ID': p.collection_payment_choice.property_collection_id || '',
          'Buyer Name': (p.property_collection.buyer_type == 2) ? (p.buyer_legal_entity || {}).comm_name || '' : (p.buyer || {}).name + ' ' + (p.buyer || {}).first_surname + ' ' + (p.buyer || {}).second_surname || '',
          'Payment concept': p.collection_payment_choice.name || '',
          'Payment date': p.collection_payment_choice.date,
          'Amount paid': p.amount || '',
          'Name of Building': p.building.name || '',
          'Apartment': p.property.name || '',
        });
      }
      new ExcelDownload().exportAsExcelFile(tempExportData, 'Income');
    }
  }
  changeThing(index) {
    console.log(this.selectedValue, "selectedValue");
    console.log(this.paymentChoices[index], "hlo");
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
    this.parameter.dash_flag = 2;
    this.parameter.total = 0;
    this.parameter.count_flag = 1;
    this.is_back = false
    this.parameter.itemsPerPage = 25;
    this.parameter.commission_type = '1';
    this.resetDates();
    this.getListing();
  }

  closeEditPaymentModal() {
    this.paymentConcepts = [];
    this.editPaymentModalClose.nativeElement.click();
  }
}
