import { Component, OnInit } from '@angular/core';
import { IProperty } from 'src/app/common/property';
import { PropertyService } from 'src/app/services/property.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from 'src/app/services/admin.service';
import { TranslateService } from '@ngx-translate/core';
import { Constant } from 'src/app/common/constants';
import * as moment from 'moment';
import { ExcelDownload } from 'src/app/common/excelDownload';
import { PricePipe } from 'src/app/pipes/price.pipe';
import { Router } from '@angular/router';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
declare let swal: any;

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
    public constant: Constant,
    private price: PricePipe,
    private router: Router,
    private toastr: ToastrService
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
  all(data: any) {
    console.log(data, "id item aa gi")
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
    const v = (((p.deal_price || 0) + (p.penalty || 0)) - (p.total_payment_recieved || 0));
    //const v = ((p.deal_price || 0) - (p.total_payment_recieved || 0));
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
      full_amount: this.paymentAmount // sending real amount entered by user
    };

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

        this.router.navigate(['/dashboard/collections/quick-visualization', this.property_collection_id]);
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
  }

  setCommissionType(type: any) {
    this.paymentConcepts = [];
    for (let index = 0; index < this.selectedItem.collection_commissions.length; index++) {
      const element = this.selectedItem.collection_commissions[index];
      element['payment_made'] = 0;
      if (this.selectedItem.payment_choices[index] && this.selectedItem.payment_choices[index].is_paid_calculated) {
        element['payment_made'] = 1;
      }
      if (type == 1) {
        if (element.add_purchase_commission == 1) {
          this.paymentConcepts.push(element);
        }
      } else if (type == 3) {
        if (element.add_agent_commission == 1) {
          this.paymentConcepts.push(element);
        }
      } else {
        if (element.add_collection_commission == 1) {
          this.paymentConcepts.push(element);
        }
      }
    }
  }

  setPaymentAmount(item: any) {
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
      this.ivaAmount = 0;
      if (this.commission_type == 1) {
        this.paymentAmount = item.purchase_comm_amount || 0;
        if ((this.selectedItem.iva_percent && this.selectedItem.add_iva_to_pc)) {
          this.ivaAmount = (this.paymentAmount * this.selectedItem.iva_percent) / 100;
          this.paymentAmount = this.paymentAmount + this.ivaAmount;
        }
      } else if (this.commission_type == 3) {
        this.paymentAmount = item.agent_comm_amount || 0;
        if ((this.selectedItem.iva_percent && this.selectedItem.add_iva_to_ac)) {
          this.ivaAmount = (this.paymentAmount * this.selectedItem.iva_percent) / 100;
          this.paymentAmount = this.paymentAmount + this.ivaAmount;
        }
      } else {
        this.paymentAmount = item.amount || 0;
        if ((this.selectedItem.iva_percent && this.selectedItem.add_iva_to_cc)) {
          this.ivaAmount = (this.paymentAmount * this.selectedItem.iva_percent) / 100;
          this.paymentAmount = this.paymentAmount + this.ivaAmount;
        }
      }
      // this.paymentAmount = this.commission_type == 1 ? (item.purchase_comm_amount || 0) : (item.amount || 0);
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

      this.router.navigate(['/dashboard/collections/quick-visualization', this.property_collection_id]);
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

  onSelect(data){

  }
}
