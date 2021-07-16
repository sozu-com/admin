import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProperty } from 'src/app/common/property';
import { PropertyService } from 'src/app/services/property.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from 'src/app/services/admin.service';
import { TranslateService } from '@ngx-translate/core';
import { Constant } from 'src/app/common/constants';
import * as moment from 'moment';
import { ExcelDownload } from 'src/app/common/excelDownload';
import { PricePipe } from 'src/app/pipes/price.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';
declare let swal: any;

@Component({
  selector: 'app-manage-commissions',
  templateUrl: './manage-commissions.component.html',
  styleUrls: ['./manage-commissions.component.css']
})
export class ManageCommissionsComponent implements OnInit ,OnDestroy{
  public parameter: IProperty = {};
  public location: IProperty = {};
  is_back: boolean;
  locale: any;
  items: any = [];
  total: any = 0;
  today: Date;
  purchase__amount: any;
  agent_amount: any;
  outside_agent_payment: any;
  collection_amount: any;
  test_pay: any;
  test_agent: any;
  test1_agent: any;
  test_Collection: any;
  sameAmount: any;
  sumData: any;
  paid_amount: any;
  payment_amount: any;
  last_payment_approved:any;
  last_payment:any;
  commissionType: any;
  collection_commission:any;
  cancellation_commission:any;
  selectedLevel: any;
  pay_id: any = [];
  clicked = false;
  clickedTop = false;
  @ViewChild('collectionReceiptOpen') collectionReceiptOpen: ElementRef;
  @ViewChild('collectionReceiptClose') collectionReceiptClose: ElementRef;
  @ViewChild('collectionTypeSelect') collectionTypeSelect: ElementRef;
  @ViewChild('applyPaymentMethodId') applyPaymentMethodId: ElementRef;
  @ViewChild('applyPaymentChoiceId1') applyPaymentChoiceId1: ElementRef;
  @ViewChild('applyPaymentChoiceId2') applyPaymentChoiceId2: ElementRef;
  @ViewChild('applyPaymentMethodId1') applyPaymentMethodId1: ElementRef;
  @ViewChild('paymentModalClose') paymentModalClose: ElementRef;
  @ViewChild('surplusMoneyModalOpen') surplusMoneyModalOpen: ElementRef;
  @ViewChild('surplusMoneyModalClose') surplusMoneyModalClose: ElementRef;
  @ViewChild('docsFile1') docsFile1: ElementRef;
  @ViewChild('editPaymentModalOpen') editPaymentModalOpen: ElementRef;
  @ViewChild('editPaymentModalClose') editPaymentModalClose: ElementRef;
  @ViewChild('editCollectionReceiptOpen') editCollectionReceiptOpen: ElementRef;
  @ViewChild('editCollectionReceiptClose') editCollectionReceiptClose: ElementRef;
  public collectionStatusFilter: { name: string, value: number }[] = [
    { name: 'Up to Date', value: 1 },
    { name: 'Payment Period', value: 2 },
    { name: 'Overdue Payment', value: 3 },
    { name: 'Cancelled', value: 4 },
    { name: 'Settled', value: 5 },
    { name: 'Inconsistency', value: 6 },
    { name: 'Only Commission for sale', value: 7 }
  ];
  private exportfinalData: any[] = [];

  mode: string;
  selectedFolder: any = {};
  selectedNote: any = {};
  noteTitle: string;
  noteDesc: string;
  noteDate: any;
  noteIndex: number;
  noteEmails: any;
  oldEmails: any;
  colbarations: any = [];
  folderName: string;
  configurations: any = [];
  countries: any;
  property_status: string;
  price_sort = 1;
  availability_sort = 1;
  lead_sort = 1;
  keyword: string;
  property: any;
  reason: string;
  item: any;
  property_collection_id: string;
  reminder_date: any;
  docFile: string;
  payment_date: any = new Date();
  collection_commission_id: number;
  payment_choice_id: any;
  surplus_payment_choice_id: any;
  payment_method_id: any;
  bank_id: number;
  description: string;
  typeOfPayment: string;
  collectionIndex: number;
  last_payment_id: string;
  selectedPaymentConcept: any;
  public scrollbarOptions = { axis: 'y', theme: 'dark' };
  invoiceKeys: boolean;
  xml_url: any;
  pdf_url: any;
  invoice_id: string;
  invoice_date: any;
  currentAmount: any;
  penaltyPercent: number;
  paymentAmount: any;
  ivaAmount: any;
  cashSum: any;
  paymentConcepts: Array<any>;
  add_collection_commission: any;
  percent: number;
  amount: number;
  selectedCollectionCommission: any;
  payment_type: any;
  payment_id: any;
  surplus_payment_type: string;
  paymentMethods: Array<any>;
  pendingPayment: any;
  penaltyAmount: any;
  paymentDate: Date;
  calculatedPayAmount: any;
  commission_type: any;
  selectedItem: any;
  is_external_agent: any;
  collectionCommission: any;
  showError: boolean;
  surplus_amt: any;
  disablePayToRemaining = true;
  isApplyBtnClicked = false;
  title: any;
  collectionFolders: Array<any>;
  docs: Array<any>;
  docsName: string;
  folderIndex: number;
  paymentBanks: Array<any>;
  payment_bank: any;
  seller_type: any;
  isPenaltyFormSub: boolean;
  cashLimit: any;
  folderId: number;
  payment_folder_id: number;
  dateTime: any;
  logoImageBase64: any;
  projectLogoImageBase64: any;
  base64: any;
  minimumDate = new Date();
  collection_data: any;
  collection_payments = [];
  table_data = [];
  layaway_payments = [];
  down_payments = [];
  payments_upon_delivery = [];
  special_payments = [];
  monthly_installment: number = 0;
  monthly_installment_amunt = [];
  monthly_installment_amunts: number = 0;
  monthly_installment_no: number = 0;
  current_month_amount: number = 0;
  bill_month_date: string;
  bill_month: string;
  buyerDocumentationFoldersDetails: any[] = [];
  sellerDocumentationFoldersDetails: any[] = [];
  propertyDocumentationFoldersDetails: any[] = [];
  beneficiaryDocumentationFoldersDetails: any[] = [];
  allBeneficiaryDocuments = [];
  tutorDocumentationFoldersDetails: any[] = [];
  language_code: string;
  public paymentBankDetailsArray: any[] = [];
  private bankDetails: any;
  fedTaxPayer: any;
  local_storage_parameter: any;
  footer_address: any;
  legal_name: any;
  parkingSpaceLotsArray: any[] = [];
  property_offer_id: any;

  constructor(
    private propertyService: PropertyService,
    private spinner: NgxSpinnerService,
    public admin: AdminService,
    private translate: TranslateService,
    public constant: Constant,private cs: CommonService,
    private route: ActivatedRoute,
    private price: PricePipe,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.parameter.page = this.constant.p;
    this.parameter.dash_flag = this.constant.dash_flag;
    this.parameter.itemsPerPage = 10;
    this.parameter.flag = 1;
    this.parameter.commission_type = '1';
    this.today = new Date();
    this.getCountries();
    this.initCalendarLocale();
    this.getPaymentMethods();
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.parameter.collection_id = params['id'];
        this.parameter.dash_flag = 4;
      }
      if (params.for == 'back') {
        this.is_back = true;
        this.local_storage_parameter = JSON.parse(localStorage.getItem('parametersForCommission'));
        this.parameter = this.local_storage_parameter && this.is_back ? this.local_storage_parameter : this.parameter;
      }

    });
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
        this.parameter.commission_type = '1';
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
    this.parameter.itemsPerPage = 25;
    this.parameter.commission_type = '1';
    this.resetDates();
    this.getListing();
  }


  getListing() {
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
          if (this.parameter.commission_type == '1') {
            if ((element.iva_percent && element.add_iva_to_pc)) {
              element.total_commission = (parseFloat(element.iva_calculate || 0) + parseFloat(element.expected_payment_commission || 0)).toFixed(2);
              if(element.payment_commission){
                element.amount_paid = (parseFloat(element.iva_calculate || 0) + parseFloat(element.payment_commission || 0)).toFixed(2);
                element.remaining = (parseFloat(element.total_commission || 0) - parseFloat(element.amount_paid || 0));
              }else{
                element.amount_paid = (parseFloat(element.payment_commission || 0)).toFixed(2);
                element.remaining = (parseFloat(element.total_commission || 0) - parseFloat(element.payment_commission || 0));
              }
            }else{
              element.total_commission = (parseFloat(element.expected_payment_commission || 0)).toFixed(2);
              element.remaining = (parseFloat(element.total_commission || 0) - parseFloat(element.payment_commission || 0));
              element.amount_paid = (parseFloat(element.payment_commission || 0)).toFixed(2);
            }
          } else if (this.parameter.commission_type == '2') {
            if ((element.iva_percent && element.add_iva_to_ac)) {
              element.total_commission = (parseFloat(element.iva_calculate || 0) + parseFloat(element.expected_payment_commission || 0)).toFixed(2);
              if(element.payment_commission){
                element.amount_paid = (parseFloat(element.iva_calculate || 0) + parseFloat(element.payment_commission || 0)).toFixed(2);
                element.remaining = (parseFloat(element.total_commission || 0) - parseFloat(element.amount_paid || 0));
              }else{
                element.amount_paid = (parseFloat(element.payment_commission || 0)).toFixed(2);
                element.remaining = (parseFloat(element.total_commission || 0) - parseFloat(element.payment_commission || 0));
              }
              
            }else{
              element.total_commission = (parseFloat(element.expected_payment_commission || 0)).toFixed(2);
              element.remaining = (parseFloat(element.total_commission || 0) - parseFloat(element.payment_commission || 0));
              element.amount_paid = (parseFloat(element.payment_commission || 0)).toFixed(2);
            }
          } else if (this.parameter.commission_type == '5') {
            if ((element.iva_percent && element.add_iva_to_oac)) {
              element.total_commission = (parseFloat(element.iva_calculate || 0) + parseFloat(element.expected_payment_commission || 0)).toFixed(2);
              if(element.payment_commission){
                element.amount_paid = (parseFloat(element.iva_calculate || 0) + parseFloat(element.payment_commission || 0)).toFixed(2);
                element.remaining = (parseFloat(element.total_commission || 0) - parseFloat(element.amount_paid || 0));
              }else{
                element.amount_paid = (parseFloat(element.payment_commission || 0)).toFixed(2);
                element.remaining = (parseFloat(element.total_commission || 0) - parseFloat(element.payment_commission || 0));
              }
            }else{
              element.total_commission = (parseFloat(element.expected_payment_commission || 0)).toFixed(2);
              element.remaining = (parseFloat(element.total_commission || 0) - parseFloat(element.payment_commission || 0));
              element.amount_paid = (parseFloat(element.payment_commission || 0)).toFixed(2);
            }
          } else {
            if ((element.iva_percent && element.add_iva_to_cc)) {
              element.total_commission = (parseFloat(element.iva_calculate || 0) + parseFloat(element.expected_payment_commission || 0)).toFixed(2);
              if(element.payment_commission){
                element.amount_paid = (parseFloat(element.iva_calculate || 0) + parseFloat(element.payment_commission || 0)).toFixed(2);
                element.remaining = (parseFloat(element.total_commission || 0) - parseFloat(element.amount_paid || 0));
              }else{
                element.amount_paid = (parseFloat(element.payment_commission || 0)).toFixed(2);
                element.remaining = (parseFloat(element.total_commission || 0) - parseFloat(element.payment_commission || 0));
              }
            }else{
              element.total_commission = (parseFloat(element.expected_payment_commission || 0)).toFixed(2);
              element.remaining = (parseFloat(element.total_commission || 0) - parseFloat(element.payment_commission || 0));
              element.amount_paid = (parseFloat(element.payment_commission || 0)).toFixed(2);
            }
          }
          const dif = (element.deal_price || 0).toFixed(2) - (element.total_deals_sum || 0).toFixed(2);
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

        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      });
  }

  numberUptoNDecimal(num: any, n: number) {
    return num ? num.toFixed(n) : 0;
  }
  all(data: any) {
    this.router.navigate(['/dashboard/commissions/quick-visualization-commission', data.id]);
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
    // const v = (((p.deal_price || 0) + (p.penalty || 0)) - (p.total_payment_recieved || 0));
    const v = (parseFloat(p.expected_payment_commission || 0) - parseFloat(p.payment_commission || 0));
    return v > 0 ? v : 0;
  }

  getPage(page) {
    this.parameter.page = page;
    this.getListing();
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

        // // fetching commissions %
        // let cc_percent = 0, cc_received = 0, cc_receipt = 0, cc_invoice = 0, cc_active = 0;
        // let pc_received = 0, pc_receipt = 0, pc_invoice = 0, pc_active = 0;
        // let ac_receipt = 0, ac_invoice = 0, ac_active = 0;
        // for (let i = 0; i < element.collection_commissions.length; i++) {
        //   const ele = element.collection_commissions[i];
        //   cc_percent = cc_percent + (ele.add_collection_commission ? ele.percent : 0);
        //   cc_received = cc_received + (ele.add_collection_commission ? ele.amount : 0);
        //   pc_received = pc_received + (ele.add_purchase_commission ? ele.purchase_comm_amount : 0);
        //   // console.log('aaaaa', pc_received, ele.purchase_comm_amount)
        //   if (ele.add_collection_commission) {
        //     cc_active++;
        //   }
        //   if (ele.payment) {
        //     cc_receipt++;
        //     if (ele.payment.invoice_id) {
        //       cc_invoice++;
        //     }
        //   }

        //   if (ele.add_purchase_commission) {
        //     pc_active++;
        //   }
        //   if (ele.purchase_payment) {
        //     pc_receipt++;
        //     if (ele.purchase_payment.invoice_id && ele.purchase_payment.pdf_url && ele.purchase_payment.xml_url) {
        //       pc_invoice++;
        //     }
        //   }

        //   if (ele.add_agent_commission) {
        //     ac_active++;
        //   }
        //   if (ele.agent_payment) {
        //     ac_receipt++;
        //     if (ele.agent_payment.invoice_id) {
        //       ac_invoice++;
        //     }
        //   }
        // }
        // // console.log('pc_received', pc_received)
        // element['sum_pc'] = pc_received;
        // element['cc_percent'] = this.numberUptoNDecimal((cc_percent / cc_active), 3);
        // element['cc_received'] = element.iva_percent && element.add_iva_to_cc ?
        //   (cc_received + (cc_received * element.iva_percent) / 100) : cc_received;
        // element['cc_receipt'] = cc_receipt == cc_active && cc_receipt != 0 ? 1 : 0;
        // element['cc_invoice'] = cc_invoice == cc_active && cc_invoice != 0 ? 1 : 0;
        // element['pc_received'] = element.iva_percent && element.add_iva_to_pc ?
        //   (pc_received + (pc_received * element.iva_percent) / 100) : pc_received;
        // element['pc_receipt'] = pc_receipt == pc_active && pc_receipt != 0 ? 1 : 0;
        // element['pc_invoice'] = pc_invoice == pc_active && pc_invoice != 0 ? 1 : 0;

        // element['ac_receipt'] = ac_receipt == ac_active && ac_receipt != 0 ? 1 : 0;
        // element['ac_invoice'] = ac_invoice == ac_active && ac_invoice != 0 ? 1 : 0;
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
          'ID Account': p.id || '',
          'Buyer Name': (p.buyer_type == 2) ? (p.buyer_legal_entity || {}).comm_name || '' : (p.buyer || {}).name + ' ' + (p.buyer || {}).first_surname + ' ' + (p.buyer || {}).second_surname || '',
          'Buyer Legal Representative': (p.buyer_type == 2) ? (((p.buyer_legal_entity || {}).legal_reps || {}).name) ? (((p.buyer_legal_entity || {}).legal_reps || {}).name + ' ' + ((p.buyer_legal_entity || {}).legal_reps || {}).first_surname + ' ' + ((p.buyer_legal_entity || {}).legal_reps || {}).second_surname) : ''
            : (((p.buyer || {}).legal_representative || {}).name) ? (((p.buyer || {}).legal_representative || {}).name + ' ' + ((p.buyer || {}).legal_representative || {}).first_surname + ' ' + ((p.buyer || {}).legal_representative || {}).second_surname) : '',
          'Seller Name': (p.seller_type == 2) ? (p.seller_legal_entity || {}).comm_name || '' : (p.seller || {}).name + ' ' + (p.seller || {}).first_surname + ' ' + (p.seller || {}).second_surname,
          'Seller Legal Representative': (p.seller_type == 2) ? ((p.seller_legal_entity || {}).legal_reps || {}).name + ' ' + ((p.seller_legal_entity || {}).legal_reps || {}).first_surname + ' ' + ((p.seller_legal_entity || {}).legal_reps || {}).second_surname :
            ((p.seller || {}).legal_representative || {}).name + ' ' + ((p.seller || {}).legal_representative || {}).first_surname + ' ' + ((p.seller || {}).legal_representative || {}).second_surname,
          'Name of Building': ((p.property || {}).building || {}).name || '',
          'Name of Tower': ((p.property || {}).building_towers || {}).tower_name || '',
          'Name of Apartment': (p.property || {}).name || '',
          'Configuration': ((p.property || {}).building_configuration || {}).name || '',
          'Locality': ((p.property || {}).locality || {}).name || '',
          'Purchase Date': p.deal_purchase_date ? this.getDateWRTTimezone(p.deal_purchase_date, 'DD/MMM/YYYY') : '',
          'Agent Commission': this.getTransformedAmount(p.comm_shared_commission ? p.comm_shared_commission : 0),
          'Sozu Commission (in %)': this.getTransformedAmount(p.comm_total_commission ? p.comm_total_commission : 0),
          'Commission': '',
          'IVA': '',
          'Total': '',
          'Amount Paid': this.getTransformedAmount(p.total_payment_recieved || 0),
          'Remanining Amount': this.getTransformedAmount(this.getRemainingAmt(p) || 0),
        });
      }
      new ExcelDownload().exportAsExcelFile(tempExportData, 'commissions');
    }
  }

  getTransformedAmount(value: any) {
    return (this.price.transform(Number(value).toFixed(2)).toString()).substring(1);
  }

  onSelect(e) {
    this.paymentDate = moment.utc(e).toDate();
  }

  showCollectionCommReceipt(item: any, i: number, type: string) {
    this.property_collection_id = item.id;
    this.selectedItem = item;
    this.collectionIndex = i;
    this.paymentConcepts = item.collection_commissions;
    this.typeOfPayment = type;
    this.is_external_agent = item.deal_commission_agents && item.deal_commission_agents.length > 0 && item.deal_commission_agents[0].broker ?
      item.deal_commission_agents[0].broker.is_external_agent : 0;
    this.collectionReceiptOpen.nativeElement.click();
  }

  closeCollReceiptModal() {
    this.paymentAmount = 0; this.docFile = ''; this.description = '';
    this.penaltyAmount = 0; this.pendingPayment = 0; this.currentAmount = 0;
    // this.docsFile.nativeElement.value = '';
    if (this.commission_type == 1) {
      this.collectionTypeSelect.nativeElement.value = '';
      this.applyPaymentMethodId1.nativeElement.value = '';
      this.applyPaymentChoiceId1.nativeElement.value = '';
    } else if (this.commission_type == 2) {
      this.collectionTypeSelect.nativeElement.value = '';
      this.applyPaymentMethodId1.nativeElement.value = '';
      this.applyPaymentChoiceId2.nativeElement.value = '';
    }
    this.commission_type = '';
    this.collectionReceiptClose.nativeElement.click();
  }

  applyCollectionPayment() {
    if (this.commission_type == 4) {
      if (!this.paymentDate) {
        this.toastr.clear();
        this.toastr.error(this.translate.instant('message.error.pleaseSelectPaymentDate'), this.translate.instant('swal.error'));
        return false;
      }
    
      const offset = new Date(this.paymentDate).getTimezoneOffset();
      if (offset < 0) {
        this.paymentDate = moment(this.paymentDate).subtract(offset, 'minutes').toDate();
      } else {
        this.paymentDate = moment(this.paymentDate).add(offset, 'minutes').toDate();
      }
      const input = {
        property_collection_id: this.property_collection_id,
        payment_method_id: this.payment_method_id,
        invoice_id: this.invoice_id,
        pdf_url: this.pdf_url,
        xml_url: this.xml_url,
        payment_amount: this.payment_amount,
        receipt: this.docFile,
        description: this.description,
        payment_date: moment(this.paymentDate).format('YYYY-MM-DD'),
        iva_amount: this.ivaAmount, // sending real amount entered by user
      };
      if (this.invoice_date) {
        const offset1 = new Date(this.invoice_date).getTimezoneOffset();
        if (offset < 0) {
          input['invoice_date'] = moment(this.invoice_date).subtract(offset1, 'minutes').toDate();
        } else {
          input['invoice_date'] = moment(this.invoice_date).add(offset1, 'minutes').toDate();
        }
      }
      this.isApplyBtnClicked = true;
      this.admin.postDataApi('addCancellationCommission', input).subscribe(r => {
        this.isApplyBtnClicked = false;
        // this.closeCollReceiptModal();
        this.router.navigate(['/dashboard/commissions/quick-visualization-commission', this.property_collection_id]);
        this.paymentModalClose.nativeElement.click();
        this.closeCollReceiptModal();

        this.toastr.clear();
        this.toastr.success(this.translate.instant('message.success.cancellationSuccessfully'), this.translate.instant('swal.success'));
        //swal(this.translate.instant('swal.success'), this.translate.instant('message.success.cancellationSuccessfully'), 'success');
        // this.getListing();
        //this.spinner.hide();
        //this.all_developers = r.data;
      });

    } else {
      // checking if date selected and receipt selected
      let callApi = true;
      if (!this.paymentDate) {
        this.toastr.clear();
        this.toastr.error(this.translate.instant('message.error.pleaseSelectPaymentDate'), this.translate.instant('swal.error'));
        return false;
      }
      if (!this.docFile && this.payment_method_id != "1") {
        this.toastr.clear();
        this.toastr.error(this.translate.instant('message.error.pleaseChooseReceipt'), this.translate.instant('swal.error'));
        return false;
      }
      if (!this.paymentAmount || this.paymentAmount == 0) {
        this.toastr.clear();
        this.toastr.error(this.translate.instant('message.error.pleaseEnterValidAmt'), this.translate.instant('swal.error'));
        return false;
      }
      if (this.surplus_payment_type == '4' && !this.surplus_payment_choice_id) {
        this.toastr.clear();
        this.toastr.error(this.translate.instant('message.error.pleaseChoosePayments'), this.translate.instant('swal.error'));
        return false;
      }

      let amt = this.paymentAmount;
      // in case of pay to following, if user is paying surplus money ask the user, what he wants to do with durplus money
      if (this.payment_type == 1 && this.calculatedPayAmount < this.paymentAmount) {
        if (!this.surplus_payment_type) {
          this.askUserForSurplusMomey();
          return;
        } else {
          amt = this.calculatedPayAmount;
        }
      }

      // check for type 1, user can not pay more than the sum of all installments
      if (this.payment_type == '1') {
        let a = 0;
        this.paymentConcepts.map(v => {
          if (!v['is_paid_calculated']) {
            const remaining_amt = parseFloat(v['amount']) - parseFloat(v['calc_payment_amount']);
            a = a + remaining_amt + (v['penalty'] ? parseFloat(v['penalty']['amount']) : 0);
          }
        }, 0);
        if (this.paymentAmount > a) {
          this.toastr.clear();
          this.toastr.error(this.translate.instant('message.error.payToFollowingCheck'), this.translate.instant('swal.error'));
          return false;
        }
      }

      // check for type 2 abd 2, user cannot pay more than sum of remaining MI
      if (this.payment_type == '2' || this.payment_type == '3') {
        let a: any = 0;
        this.paymentConcepts.map(v => {
          if (!v['is_paid_calculated'] && v.name.includes('Monthly Installment')) {
            const remaining_amt = parseFloat(v['amount']) - parseFloat(v['calc_payment_amount']);
            a = parseFloat(a) + remaining_amt + (v['penalty'] ? parseFloat(v['penalty']['amount']) : 0);
            a = a.toFixed(2);
          }
        }, 0);
        if (this.paymentAmount > a) {
          this.toastr.clear();
          this.toastr.error(this.translate.instant('message.error.payToRemainingcheck'), this.translate.instant('swal.error'));
          return false;
        }
      }

      // check for type 3, user can only pay exact amount of M1, or sum of M1 & M2, or sum of M1,M2,M3 and soon
      const a1 = this.surplus_payment_type == '3' ? this.paymentAmount - this.calculatedPayAmount : this.paymentAmount;
      if (this.payment_type == '3' || this.surplus_payment_type == '3') {
        let a: any = 0;
        let index = this.paymentConcepts.length - 1;
        for (index; index >= 0; index--) {
          const v = this.paymentConcepts[index];
          if (!v['is_paid_calculated'] && v.name.includes('Monthly Installment')) {
            const remaining_amt = parseFloat(v['amount']) - parseFloat(v['calc_payment_amount']);
            a = parseFloat(a) + remaining_amt + (v['penalty'] ? parseFloat(v['penalty']['amount']) : 0);
            a = a.toFixed(2);
          }
          // using a1 and not this.paymentAmount because, need to check for both direct type 3 and type 3 in surplus popup
          if (a1 > a) {
            continue;
          } else if (a1 == a) {
            break;
          } else if (this.paymentAmount < a) {
            this.toastr.clear();
            this.toastr.error(this.translate.instant('message.error.payToRemainingReduceTimecheck'), this.translate.instant('swal.error'));
            this.surplus_payment_type == '3' ?
              this.surplusMoneyModalClose.nativeElement.click() :
              this.paymentModalClose.nativeElement.click();
            return false;
          }
        }
      }

      // in pay to specific, user is allowed to pay either exact amount or partial amt
      if (this.payment_type == 4 && this.calculatedPayAmount < this.paymentAmount) {
        this.toastr.clear();
        this.toastr.error(this.translate.instant('message.error.payToSpecificCheck'), this.translate.instant('swal.error'));
        return false;
      }

      // in total payment, user is allowed to pay sum of exact remaining amount (sum of installments and penalty)
      if (this.payment_type == 5 && this.calculatedPayAmount != this.paymentAmount) {
        this.toastr.clear();
        this.toastr.error(this.translate.instant('message.error.totalPayemntCheck'), this.translate.instant('swal.error'));
        return false;
      }

      const offset = new Date(this.paymentDate).getTimezoneOffset();
      if (offset < 0) {
        this.paymentDate = moment(this.paymentDate).subtract(offset, 'minutes').toDate();
      } else {
        this.paymentDate = moment(this.paymentDate).add(offset, 'minutes').toDate();
      }

      const input = {
        property_collection_id: this.property_collection_id,
        payment_method_id: this.payment_method_id,
        is_agency: this.payment_bank ? this.payment_bank.is_agency : null,
        bank_id: this.payment_bank ? this.payment_bank.bank_id : null,
        legal_rep_bank_id: this.payment_bank ? this.payment_bank.legal_rep_bank_id : null,
        amount: amt,
        receipt: this.docFile,
        description: this.description,
        payment_date: this.paymentDate,
        full_amount: this.paymentAmount, // sending real amount entered by user
      };
      if (this.commission_type == 1) {
        input['total_amount'] = this.test_pay
      } else if (this.commission_type == 3) {
        input['total_amount'] = this.test_agent
      }else if (this.commission_type == 5) {
        input['total_amount'] = this.test1_agent
      } else {
        input['total_amount'] = this.test_Collection
      }
      // send commission_type, collection_commission_id, percent incase of applying commission
      if (this.typeOfPayment === 'commission-popup') {

        delete input.amount;
        input['commission_type'] = this.commission_type;
        input['collection_commission_id'] = this.selectedCollectionCommission.id;
        input['percent'] = this.selectedCollectionCommission.percent;
        input['invoice_id'] = this.invoice_id;
        input['pdf_url'] = this.pdf_url;
        input['xml_url'] = this.xml_url;
        input['amount'] = amt - this.ivaAmount;
        input['iva_amount'] = this.ivaAmount;

        if (this.invoice_date) {
          const offset1 = new Date(this.invoice_date).getTimezoneOffset();
          if (offset < 0) {
            input['invoice_date'] = moment(this.invoice_date).subtract(offset1, 'minutes').toDate();
          } else {
            input['invoice_date'] = moment(this.invoice_date).add(offset1, 'minutes').toDate();
          }
        }
      } else {
        // applying payment
        // for edit the wrong amount uploaded
        // if (this.selectedPaymentConcept && this.selectedPaymentConcept['collection_payment']) {
        //   input['id'] = this.selectedPaymentConcept['collection_payment']['id']
        // }
        // for type==2&3, no need to pass collection_payment_choice_id
        if (this.payment_type == 1 || this.payment_type == 4) {
          input['collection_payment_choice_id'] = this.payment_choice_id['id'];
        }
        input['type'] = this.payment_type;
      }


      if (this.typeOfPayment == 'apply-popup' && (this.cashSum + this.paymentAmount > this.cashLimit)) {
        callApi = false;
        swal({
          html: this.translate.instant('message.error.cashLimitReached'),
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: this.constant.confirmButtonColor,
          cancelButtonColor: this.constant.cancelButtonColor,
          confirmButtonText: 'Ok'
        }).then((result) => {
          if (result.value) {
            // continue;
            this.callToPaymentApi(input);
          } else {
            return;
          }
        });
        // swal(this.translate.instant('swal.error'), this.translate.instant('message.error.cashLimitReached'), 'error');
        // this.toastr.clear();
        // this.toastr.error(this.translate.instant('message.error.cashLimitReached'), this.translate.instant('swal.error'));
        // return false;
      }
      const url = this.typeOfPayment === 'apply-popup' ? 'applyCollectionPayment' : 'applyCommissionPayment';
      // if (this.typeOfPayment) {
      //   this.typeOfPayment === 'apply-popup' ? 'applyCollectionPayment' : 'apply-popup';
      // } else {
      //   this.typeOfPayment === 'applyCommissionPayment' ? 'applyCollectionPayment1' : 'applyCommissionPayment';
      // }
      // const url = this.typeOfPayment

      if (callApi) {
        this.isApplyBtnClicked = true;
        this.admin.postDataApi(url, input).subscribe(r => {
          this.isApplyBtnClicked = false;
          if (this.surplus_payment_type) {
            input['amount'] = this.paymentAmount - this.calculatedPayAmount;
            input['type'] = this.surplus_payment_type;
            input['parent_id'] = r.data['id'];   // send parent_id in case of type 1 and surplus (to make parent delete)
            if (this.surplus_payment_type == '4') {
              input['collection_payment_choice_id'] = this.surplus_payment_choice_id;
            }

            this.admin.postDataApi(url, input).subscribe(r => {
              // if (this.surplus_payment_type == '1' || this.surplus_payment_type == '4') {
              //   input['collection_payment_choice_id'] = this.payment_choice_id['id']
              // }
            });
          }

          this.router.navigate(['/dashboard/commissions/quick-visualization-commission', this.property_collection_id]);
         // this.paymentModalClose.nativeElement.click();
          this.closeCollReceiptModal();

          this.toastr.clear();
          this.toastr.success(this.translate.instant('message.success.savedSuccessfully'), this.translate.instant('swal.success'));
        }, error => {
          this.paymentConcepts = [];
          this.isApplyBtnClicked = false;
          this.docsFile1.nativeElement.value = '';
          this.paymentModalClose.nativeElement.click();
          this.closeCollReceiptModal();
          // this.toastr.error(error.message, this.translate.instant('swal.error'));
          return false;
        });
      }
    }

  }

  showEditPaymentPopup(item: any, i: number) {
    this.paymentConcepts = [];
    this.property_collection_id = item.id;
    this.collectionIndex = i;
    //this.cancel_commission_status = item.cancellation_commission_status;
   // this.cancellation_commission = item.cancellation_commission;
    // adding purchase and collection commission in payment concept
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
    this.last_payment_approved = item.last_payment ? item.last_payment.is_paid_calculated : 0;
    //this.last_payment = item.last_payment;
    console.log(this.last_payment,"last")
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
    this.commissionType = item.commission_type;
  if(this.commissionType == '4'){
    this.payment_id = item.id 
    this.payment_method_id = item.payment_method_id;
    this.description = item.description;
    this.docFile = item.receipt;
    this.amount = item.payment_amount;
    this.commission_type = item.commission_type;
    if (item.invoice_date) {
      const offset1 = new Date(item.invoice_date).getTimezoneOffset();
      if (offset1 < 0) {
        this.invoice_date = moment(item.invoice_date).subtract(offset1, 'minutes').toDate();
      } else {
        this.invoice_date = moment(item.invoice_date).add(offset1, 'minutes').toDate();
      }
    }
    this.payment_date = this.getDateWRTTimezone(item.payment_date, 'DD/MMM/YYYY');
    //this.invoice_date = this.getDateWRTTimezone(item.invoice_date, 'DD/MMM/YYYY');
    this.pdf_url = item.pdf_url;
    this.xml_url = item.xml_url;
    this.invoice_id = item.invoice_id;
    this.closeEditPaymentModal();
    this.editCollectionReceiptOpen.nativeElement.click();
  } else {
    this.collection_commission = item;
    this.selectedLevel = this.collection_commission[0];
    this.payment_id = this.collection_commission[0] ? this.collection_commission[0].id : [];
    this.payment_method_id = this.collection_commission[0] ? (this.collection_commission[0].payment_method || {}).id : [];
    this.description = this.collection_commission[0] ? this.collection_commission[0].description : [];
    this.docFile = this.collection_commission[0] ? this.collection_commission[0].receipt : [];
    this.amount = this.collection_commission[0] ? this.collection_commission[0].amount : [];
    this.commission_type = this.collection_commission[0] ? this.collection_commission[0].commission_type : [];
    this.collection_commission_id = this.collection_commission[0] ? this.collection_commission[0].collection_commission_id : [];
    this.payment_date = this.collection_commission[0] ?  this.getDateWRTTimezone(this.collection_commission[0].payment_date, 'DD/MMM/YYYY')  : [];
    this.invoice_date = this.collection_commission[0] ? this.getDateWRTTimezone(this.collection_commission[0].invoice_date, 'DD/MMM/YYYY')  : [];
    this.pdf_url = this.collection_commission[0] ? this.collection_commission[0].pdf_url : [];
    this.xml_url = this.collection_commission[0] ? this.collection_commission[0].xml_url : [];
    this.invoice_id = this.collection_commission[0] ? this.collection_commission[0].invoice_id : [];
    this.closeEditPaymentModal();
    this.editCollectionReceiptOpen.nativeElement.click();
  }
  
}
setPayAmount(item: any){
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
setPaymentmethod(item:any){
  let data = this.collection_commission.find(value=> value.payment_method_id == item);
  this.pay_id = data;
  if(!this.pay_id){
   this.payment_id = this.collection_commission ? this.collection_commission.id : [];
   this.payment_method_id = this.collection_commission ? (this.collection_commission.payment_method || {}).id : [];
   this.description = this.collection_commission ? this.collection_commission.description : [];
    this.docFile = this.collection_commission ? this.collection_commission.receipt : [];
   this.amount = this.collection_commission ? this.collection_commission.amount : [];
   this.commission_type = this.collection_commission ? this.collection_commission.commission_type : [];
   this.collection_commission_id = this.collection_commission ? this.collection_commission.collection_commission_id : [];
   this.payment_date = this.collection_commission ?  this.collection_commission.payment_date : [];
   this.invoice_date = this.collection_commission ? this.collection_commission.invoice_date : [];
   this.pdf_url = this.collection_commission ? this.collection_commission.pdf_url : [];
   this.xml_url = this.collection_commission ? this.collection_commission.xml_url : [];
   this.invoice_id = this.collection_commission ? this.collection_commission.invoice_id : [];
  }else{
   this.selectedLevel = this.collection_commission[0];
   this.payment_id = this.collection_commission[0] ? this.collection_commission[0].id : [];
   this.payment_method_id = this.collection_commission[0] ? (this.collection_commission[0].payment_method || {}).id : [];
   this.description = this.collection_commission[0] ? this.collection_commission[0].description : [];
    this.docFile = this.collection_commission[0] ? this.collection_commission[0].receipt : [];
   this.amount = this.collection_commission[0] ? this.collection_commission[0].amount : [];
   this.commission_type = this.collection_commission[0] ? this.collection_commission[0].commission_type : [];
   this.collection_commission_id = this.collection_commission[0] ? this.collection_commission[0].collection_commission_id : [];
   this.payment_date = this.collection_commission[0] ?  this.getDateWRTTimezone(this.collection_commission[0].payment_date, 'DD/MMM/YYYY')  : [];
   this.invoice_date = this.collection_commission[0] ? this.getDateWRTTimezone(this.collection_commission[0].invoice_date, 'DD/MMM/YYYY')  : [];
   this.pdf_url = this.collection_commission[0] ? this.collection_commission[0].pdf_url : [];
   this.xml_url = this.collection_commission[0] ? this.collection_commission[0].xml_url : [];
   this.invoice_id = this.collection_commission[0] ? this.collection_commission[0].invoice_id : [];
  }
}

closeEditPaymentModal() {
  this.paymentConcepts = [];
  this.editPaymentModalClose.nativeElement.click();
}

deleteCollectionCommReceipt(item: any) {
  swal({
    html: this.translate.instant('message.error.areYouSure') + '<br>' +
      this.translate.instant('message.error.wantToDeleteCommission'),
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: this.constant.confirmButtonColor,
    cancelButtonColor: this.constant.cancelButtonColor,
    confirmButtonText: 'Yes'
  }).then((result) => {
    if (result.value) {
      this.admin.postDataApi('deleteCommissionPayment', { id: item.id, commission_type: item.commission_type })
        .subscribe(
          success => {
            this.router.navigate(['/dashboard/commissions/quick-visualization-commission', this.property_collection_id]);
            this.closeEditPaymentModal();
            this.toastr.clear();
            this.toastr.success(this.translate.instant('message.success.deletedSuccessfully'), this.translate.instant('swal.success'));
          },
          error => {
            this.toastr.error(error.error.message, this.translate.instant('swal.error'));
          });
    }
  });
}
updateCollectionCommPayment() {
  // checking if date selected and receipt selected
  if (this.commission_type !=4 && !this.collection_commission_id) {
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

onSelectFile(files, key: string) {
  this.parameter.loading = true;
  this.cs.saveAttachment(files[0]).subscribe(
    success => {
      this.parameter.loading = false;
      this[key] = success['data'].name;
    }, error => {
      this.parameter.loading = false;
    }
  );
}

closeEditCollReceiptModal() {
  this.editCollectionReceiptClose.nativeElement.click();
}

  setCommissionType(type: any) {
    this.paymentConcepts = [];
    for (let index = 0; index < this.selectedItem.collection_commissions.length; index++) {
      const element = this.selectedItem.collection_commissions[index];
      element['payment_made'] = 0;
      element['payment_made1'] = 0;
      element['payment_made2'] = 0;
      element['payment_made3'] = 0;
      // if (this.selectedItem.collection_commissions[index] && this.selectedItem.collection_commissions[index].purchase_payment_status) {
      //   element['payment_made'] = 1;
      // }
      // if (this.selectedItem.collection_commissions[index] && this.selectedItem.collection_commissions[index].collection_payment_status) {
      //   element['payment_made1'] = 1;
      // }
      if (this.selectedItem.collection_commissions[index].payment_choice.calc_payment_amount < this.selectedItem.collection_commissions[index].purchase_comm_amount) {
        element['payment_made'] = 1;
      }
      if (this.selectedItem.collection_commissions[index].payment_choice.calc_payment_amount < this.selectedItem.collection_commissions[index].amount) {
        element['payment_made1'] = 1;
      }
      if (this.selectedItem.collection_commissions[index].payment_choice.calc_payment_amount < this.selectedItem.collection_commissions[index].agent_comm_amount) {
        element['payment_made2'] = 1;
      }
      if (this.selectedItem.collection_commissions[index].payment_choice.calc_payment_amount < this.selectedItem.collection_commissions[index].agent_outside_comm_amount) {
        element['payment_made3'] = 1;
      }
      if (type == 1) {
        if (element.add_purchase_commission == 1) {
          this.paymentConcepts.push(element);
        }
      } 
      else if (type == 3) {
        if (element.add_agent_commission == 1) {
          this.paymentConcepts.push(element);
        }
      } 
      else if (type == 5) {
        if (element.add_agent_outside_commission == 1) {
          this.paymentConcepts.push(element);
        }
      }
      else {
        if (element.add_collection_commission == 1) {
          this.paymentConcepts.push(element);
        }
      }
    }
  }
  onSelectInvoiceDate(e) {
    this.invoice_date = moment.utc(e).toDate();
  }
  getValue(commission_type, item) {
    this.admin.postDataApi('addCollectionCommissionAmount', { id: item.id, commission_type: commission_type })
      .subscribe(
        success => {
          this.sumData = success['data'];
          if (this.commission_type == 1) {
            if ((this.selectedItem.iva_percent && this.selectedItem.add_iva_to_pc)) {
              const expected = parseFloat(this.sumData.iva_percent)  * parseFloat(this.sumData.ecpected) / 100;
              const total_expect = parseFloat(this.sumData.ecpected) + expected;
              this.paid_amount = (total_expect - parseFloat(this.sumData.paid_amount)).toFixed(2);
            }else{
              this.paid_amount = (parseFloat(item.purchase_comm_amount || 0) - parseFloat(this.sumData.paid_amount || 0)).toFixed(2);
            }
          } else if (this.commission_type == 3) {
           // this.paid_amount = (item.agent_comm_amount || 0);
            if ((this.selectedItem.iva_percent && this.selectedItem.add_iva_to_ac)) {
              const expected = parseFloat(this.sumData.iva_percent)  * parseFloat(this.sumData.ecpected) / 100;
              const total_expect = parseFloat(this.sumData.ecpected) + expected;
              this.paid_amount = (total_expect - parseFloat(this.sumData.paid_amount)).toFixed(2);
            }else{
              this.paid_amount = (parseFloat(item.agent_comm_amount || 0) - parseFloat(this.sumData.paid_amount || 0)).toFixed(2);
            }
          } else if (this.commission_type == 5) {
            //this.paid_amount = (item.agent_outside_comm_amount || 0);
            if ((this.selectedItem.iva_percent && this.selectedItem.add_iva_to_oac)) {
              const expected = parseFloat(this.sumData.iva_percent)  * parseFloat(this.sumData.ecpected) / 100;
              const total_expect = parseFloat(this.sumData.ecpected) + expected;
              this.paid_amount = (total_expect - parseFloat(this.sumData.paid_amount)).toFixed(2);
            }else{
              this.paid_amount = (parseFloat(item.agent_outside_comm_amount || 0) - parseFloat(this.sumData.paid_amount || 0)).toFixed(2);
            }
          } else {
            //this.paid_amount = (item.amount || 0);
            if ((this.selectedItem.iva_percent && this.selectedItem.add_iva_to_cc)) {
              const expected = parseFloat(this.sumData.iva_percent)  * parseFloat(this.sumData.ecpected) / 100;
              const total_expect = parseFloat(this.sumData.ecpected) + expected;
              this.paid_amount = (total_expect - parseFloat(this.sumData.paid_amount)).toFixed(2);
            }else{
              this.paid_amount = (parseFloat(item.amount || 0) - parseFloat(this.sumData.paid_amount || 0)).toFixed(2);
            }
          }
        })
  }
 
  setPaymentAmount(item: any) {
    if (this.commission_type == 1) {
      for (let i = 0; i < (item.purchase_payment || []).length; i++) {
        let sum: number = item.purchase_payment.map(a => a.amount).reduce(function (a, b) {
          return a + b;
        });
        this.purchase__amount = sum;
      }
    } else if (this.commission_type == 3) {
      for (let i = 0; i < (item.agent_payment || []).length; i++) {
        let sum1: number = item.agent_payment.map(a => a.amount).reduce(function (a, b) {
          return a + b;
        });
        this.agent_amount = sum1;
      }
    } else if (this.commission_type == 5) {
      for (let i = 0; i < (item.outside_agent_payment || []).length; i++) {
        let sum4: number = item.outside_agent_payment.map(a => a.amount).reduce(function (a, b) {
          return a + b;
        });
        this.outside_agent_payment = sum4;
      }
    }else {
      for (let i = 0; i < (item.payment || []).length; i++) {
        let sum2: number = item.payment.map(a => a.amount).reduce(function (a, b) {
          return a + b;
        });
        this.collection_amount = sum2;
      }
    }
    if (this.typeOfPayment === 'commission-popup') {
      if (this.commission_type == 1 && item.add_purchase_commission == 0) {
        this.toastr.clear();
        this.toastr.error(this.translate.instant('message.error.pleaseEnablePurchaseCommission'), this.translate.instant('swal.error'));
        this.closeCollReceiptModal();
        return false;
      }
      if (this.commission_type == 2 && item.add_collection_commission == 0) {
        this.toastr.clear();
        this.toastr.error(this.translate.instant('message.error.pleaseEnableCollectionCommission'), this.translate.instant('swal.error'));
        this.closeCollReceiptModal();
        return false;
      }
      if (this.commission_type == 3 && item.add_agent_commission == 0) {
        this.toastr.clear();
        this.toastr.error(this.translate.instant('message.error.pleaseEnableAgentCommission'), this.translate.instant('swal.error'));
        this.closeCollReceiptModal();
        return false;
      }
      if (this.commission_type == 5 && item.add_agent_outside_commission == 0) {
        this.toastr.clear();
        this.toastr.error(this.translate.instant('message.error.pleaseEnableAgentCommission'), this.translate.instant('swal.error'));
        this.closeCollReceiptModal();
        return false;
      }
      this.ivaAmount = 0;
      if (this.commission_type == 1) {
        this.paymentAmount = (item.purchase_comm_amount || 0);
        this.test_pay = item.purchase_comm_amount || 0;
        if ((this.selectedItem.iva_percent && this.selectedItem.add_iva_to_pc)) {
          this.ivaAmount = (parseFloat(this.paymentAmount) * parseFloat(this.selectedItem.iva_percent)) / 100;
          this.paymentAmount = (parseFloat(this.paymentAmount) + parseFloat(this.ivaAmount) - parseFloat(this.purchase__amount || 0)).toFixed(2);
        }
        this.getValue(this.commission_type, item);
      } else if (this.commission_type == 3) {
        this.paymentAmount = (item.agent_comm_amount || 0);
        this.test_agent = item.agent_comm_amount || 0;
        if ((this.selectedItem.iva_percent && this.selectedItem.add_iva_to_ac)) {
          this.ivaAmount = (parseFloat(this.paymentAmount) * parseFloat(this.selectedItem.iva_percent)) / 100;
          this.paymentAmount = (parseFloat(this.paymentAmount) + parseFloat(this.ivaAmount) - parseFloat(this.agent_amount || 0)).toFixed(2);
        }
        this.getValue(this.commission_type, item);
      } else if (this.commission_type == 5) {
        this.paymentAmount = (item.agent_outside_comm_amount || 0);
        this.test1_agent = item.agent_outside_comm_amount || 0;
        if ((this.selectedItem.iva_percent && this.selectedItem.add_iva_to_oac)) {
          this.ivaAmount = (parseFloat(this.paymentAmount) * parseFloat(this.selectedItem.iva_percent)) / 100;
          this.paymentAmount = (parseFloat(this.paymentAmount) + parseFloat(this.ivaAmount) - parseFloat(this.outside_agent_payment || 0)).toFixed(2);
          
        }
        this.getValue(this.commission_type, item);
      } else {
        this.paymentAmount = (item.amount || 0);
        this.test_Collection = item.amount || 0;
        if ((this.selectedItem.iva_percent && this.selectedItem.add_iva_to_cc)) {
          this.ivaAmount = (parseFloat(this.paymentAmount) * parseFloat(this.selectedItem.iva_percent)) / 100;
          this.paymentAmount = (parseFloat(this.paymentAmount) + parseFloat(this.ivaAmount) - parseFloat(this.collection_amount || 0)).toFixed(2);
        }
        this.getValue(this.commission_type, item);
      }
      this.selectedCollectionCommission = item;
    } else {
      this.selectedPaymentConcept = item;
      let amt: any = 0; let penaltyamt: any = 0;
      let amtPaid: any = 0;
      let currentAmt: any = 0;
      let currentAmtPaid: any = 0;
      // checking if method is pay to specific (4), then user will pay only for that specific installment
      // + user cannot pay more than the amount+penalty
      if (this.payment_type == 4) {
        currentAmt = item['amount'];
        currentAmtPaid = item['calc_payment_amount'] || 0;
        this.penaltyAmount = item.penalty ? parseFloat(item.penalty.amount).toFixed(2) : 0;
        this.pendingPayment = 0.00; // amt already paid
        this.currentAmount = (parseFloat(currentAmt) - parseFloat(currentAmtPaid)).toFixed(2);
        this.paymentAmount = (parseFloat(this.currentAmount) + parseFloat(this.pendingPayment) +
          parseFloat(this.penaltyAmount)).toFixed(2);
        this.calculatedPayAmount = [...this.paymentAmount];
      } else if (this.payment_type == 1) {
        for (let index = 0; index < this.paymentConcepts.length; index++) {
          const r = this.paymentConcepts[index];
          currentAmt = r['amount'];
          currentAmtPaid = r['calc_payment_amount'] || 0;
          if (r['id'] != item['id']) {
            penaltyamt = r['penalty'] ? parseFloat(r['penalty']['amount']) : 0;
            amt = parseFloat(amt) + parseFloat(r['amount']) + parseFloat(penaltyamt);
            amtPaid = parseFloat(amtPaid) + parseFloat(currentAmtPaid);
          } else {
            break;
          }
        }
        this.penaltyAmount = item.penalty ? parseFloat(item.penalty.amount).toFixed(2) : 0;
        this.pendingPayment = (amt - amtPaid).toFixed(2);
        this.currentAmount = (parseFloat(currentAmt) - parseFloat(currentAmtPaid)).toFixed(2);
        this.paymentAmount = (parseFloat(this.currentAmount) + parseFloat(this.pendingPayment) + parseFloat(this.penaltyAmount)).toFixed(2);
        this.calculatedPayAmount = [...this.paymentAmount];
      }
    }
  }


  askUserForSurplusMomey() {
    this.closePaymentModal();
    this.surplusMoneyModalOpen.nativeElement.click();
  }

  closePaymentModal() {
    this.paymentModalClose.nativeElement.click();
  }

  callToPaymentApi(input) {

    const url = this.typeOfPayment === 'apply-popup' ? 'applyCollectionPayment' : 'applyCommissionPayment';
    // if (this.typeOfPayment) {
    //   this.typeOfPayment === 'apply-popup' ? 'applyCollectionPayment' : 'apply-popup';
    // } else {
    //   this.typeOfPayment === 'applyCommissionPayment' ? 'applyCollectionPayment1' : 'applyCommissionPayment';
    // }
    // const url = this.typeOfPayment

    this.isApplyBtnClicked = true;
    this.admin.postDataApi(url, input).subscribe(r => {
      this.isApplyBtnClicked = false;
      if (this.surplus_payment_type) {
        input['amount'] = this.paymentAmount - this.calculatedPayAmount;
        input['type'] = this.surplus_payment_type;
        input['parent_id'] = r.data['id'];   // send parent_id in case of type 1 and surplus (to make parent delete)
        if (this.surplus_payment_type == '4') {
          input['collection_payment_choice_id'] = this.surplus_payment_choice_id;
        }

        this.admin.postDataApi(url, input).subscribe(r => {
          // if (this.surplus_payment_type == '1' || this.surplus_payment_type == '4') {
          //   input['collection_payment_choice_id'] = this.payment_choice_id['id']
          // }
        });
      }

      this.router.navigate(['/dashboard/commissions/quick-visualization-commission', this.property_collection_id]);
      this.paymentModalClose.nativeElement.click();
      this.closeCollReceiptModal();

      this.toastr.clear();
      this.toastr.success(this.translate.instant('message.success.savedSuccessfully'), this.translate.instant('swal.success'));
    }, error => {
      this.paymentConcepts = [];
      this.isApplyBtnClicked = false;
      this.docsFile1.nativeElement.value = '';
      this.paymentModalClose.nativeElement.click();
      this.closeCollReceiptModal();
      // this.toastr.error(error.message, this.translate.instant('swal.error'));
      return false;
    });
  }

  userinfo = (userdata: any): void => {
    this.router.navigate(['/dashboard/users/edit-user', userdata.buyer_id]);
  }
  legalinfo = (userdata: any): void => {
    this.router.navigate(['/dashboard/legal-entities/add-legal-entity/', userdata.buyer_legal_entity_id]);
  }
  ngOnDestroy(): void {
    localStorage.setItem('parametersForCommission', JSON.stringify(this.parameter));
  }
}
