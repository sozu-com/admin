import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';
import { UserModel } from 'src/app/models/inhouse-users.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProperty } from 'src/app/common/property';
import { SellerSelections } from 'src/app/models/addProperty.model';
import { Constant } from 'src/app/common/constants';
import { ApiConstants } from 'src/app/common/api-constants';
import { AdminService } from 'src/app/services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from 'src/app/services/property.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Notes } from '../../models/leads.model';
import { CommonService } from '../../services/common.service';
import { NgForm, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ExcelDownload } from 'src/app/common/excelDownload';
import { Document } from 'src/app/models/document.model';
import { FormArray } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { DatePipe } from '@angular/common';
import { PricePipe } from 'src/app/pipes/price.pipe';
import { HttpClient } from '@angular/common/http';
import { count } from 'rxjs-compat/operator/count';
import { OnDestroy } from '@angular/core';
import { forkJoin } from 'rxjs';
import { GenerateOfferPdfService } from 'src/app/services/generate-offer-pdf.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
declare let swal: any;
declare var $: any;

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css'],
  providers: [Notes, Document, DatePipe, PricePipe]
})

export class CollectionsComponent implements OnInit, OnDestroy {
  mode: string;
  // input: CollectionReport;
  public parameter: IProperty = {};
  public location: IProperty = {};
  items: any = [];
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
  total: any = 0;
  configurations: any = [];
  countries: any;
  property_status: string;
  price_sort = 1;
  availability_sort = 1;
  lead_sort = 1;
  keyword: string;
  selecter_seller: SellerSelections;
  allSellers: Array<SellerSelections>;
  allExtBrokers: Array<UserModel>;
  allUsers: Array<UserModel>;
  property: any;
  reason: string;
  item: any;
  locale: any;
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
  today: Date;
  selectedItem: any;
  is_external_agent: any;
  collectionCommission: any;
  penaltyForm: FormGroup;
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
  private exportfinalData: Array<any>;
  folderId: number;
  payment_folder_id: number;
  sendEmailForm: FormGroup;
  dateTime: any;
  logoImageBase64: any;
  projectLogoImageBase64: any;
  base64: any;
  minimumDate = new Date();
  @ViewChild('viewDesModal') viewDesModal: ElementRef;
  @ViewChild('viewDesModalClose') viewDesModalClose: ElementRef;
  @ViewChild('applyPaymentChoiceId') applyPaymentChoiceId: ElementRef;
  @ViewChild('applyPaymentMethodId') applyPaymentMethodId: ElementRef;
  @ViewChild('applyPaymentChoiceId1') applyPaymentChoiceId1: ElementRef;
  @ViewChild('applyPaymentChoiceId2') applyPaymentChoiceId2: ElementRef;
  @ViewChild('applyPaymentMethodId1') applyPaymentMethodId1: ElementRef;
  @ViewChild('modalOpen') modalOpen: ElementRef;
  @ViewChild('modalClose') modalClose: ElementRef;
  @ViewChild('notesModalOpen') notesModalOpen: ElementRef;
  @ViewChild('notesadddModalOpen') notesadddModalOpen: ElementRef;
  @ViewChild('notesadddModalClose') notesadddModalClose: ElementRef;
  @ViewChild('notesModalClose') notesModalClose: ElementRef;
  @ViewChild('paymentModalOpen') paymentModalOpen: ElementRef;
  @ViewChild('paymentModalClose') paymentModalClose: ElementRef;
  @ViewChild('editPaymentModalOpen') editPaymentModalOpen: ElementRef;
  @ViewChild('editPaymentModalClose') editPaymentModalClose: ElementRef;
  @ViewChild('updatePaymentModalOpen') updatePaymentModalOpen: ElementRef;
  @ViewChild('updatePaymentModalClose') updatePaymentModalClose: ElementRef;
  @ViewChild('viewCollectionClose') viewCollectionClose: ElementRef;
  @ViewChild('collectionReceiptOpen') collectionReceiptOpen: ElementRef;
  @ViewChild('collectionReceiptClose') collectionReceiptClose: ElementRef;
  @ViewChild('editCollectionReceiptOpen') editCollectionReceiptOpen: ElementRef;
  @ViewChild('editCollectionReceiptClose') editCollectionReceiptClose: ElementRef;
  @ViewChild('penaltyModalOpen') penaltyModalOpen: ElementRef;
  @ViewChild('penaltyModalClose') penaltyModalClose: ElementRef;
  @ViewChild('collectionTypeSelect') collectionTypeSelect: ElementRef;
  @ViewChild('surplusMoneyModalOpen') surplusMoneyModalOpen: ElementRef;
  @ViewChild('surplusMoneyModalClose') surplusMoneyModalClose: ElementRef;
  @ViewChild('docsFile1') docsFile1: ElementRef;
  @ViewChild('docsFile2') docsFile2: ElementRef;
  @ViewChild('docsFile') docsFile: ElementRef;
  @ViewChild('foldersModalOpen') foldersModalOpen: ElementRef;
  @ViewChild('foldersModalClose') foldersModalClose: ElementRef;
  @ViewChild('localityOpen') localityOpen: ElementRef;
  @ViewChild('folderModalOpen') folderModalOpen: ElementRef;
  @ViewChild('folderModalClose') folderModalClose: ElementRef;
  @ViewChild('localityClose') localityClose: ElementRef;

  collectionStatusFilter = [
    { name: 'Up to Date', value: 1 },
    { name: 'Payment Period', value: 2 },
    { name: 'Overdue Payment', value: 3 },
    { name: 'Cancelled', value: 4 },
    { name: 'Settled', value: 5 },
    { name: 'Inconsistency', value: 6 },
    { name: 'Only Commission for sale', value: 7 }];
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
  is_back: boolean;
  footer_address: any;
  legal_name: any;
  parkingSpaceLotsArray: any[] = [];
  property_offer_id: any;
  constructor(
    public constant: Constant,
    public apiConstants: ApiConstants,
    public admin: AdminService,
    private propertyService: PropertyService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    public model: Notes,
    private cs: CommonService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public modelForDoc: Document,
    private datePipe: DatePipe,
    private http: HttpClient,
    private price: PricePipe,
    private offerPdf: GenerateOfferPdfService
  ) {
    // this.userForm = this.fb.group({
    //   email: this.fb.array([this.fb.control(null)])
    // });
  }

  ngOnInit() {
    this.language_code = localStorage.getItem('language_code');
    this.admin.globalSettings$.subscribe(success => {
      this.cashLimit = success['cash_limit'];
    });
    this.sendEmailForm = this.fb.group({
      'toAddress': ['', [Validators.required, this.commaSepEmail]]
    });
    this.isPenaltyFormSub = false;
    this.invoiceKeys = false;
    this.showError = false;
    this.today = new Date();
    this.commission_type = '';
    this.parameter.flag = 1;
    this.model = new Notes();
    this.initPenaltyForm();
    this.parameter.itemsPerPage = 25; // this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.parameter.dash_flag = this.propertyService.dash_flag ? this.propertyService.dash_flag : this.constant.dash_flag;
    this.parameter.country_id = '0';
    this.parameter.state_id = '0';
    this.parameter.city_id = '0';
    this.parameter.locality_id = '0';
    this.parameter.building_id = '0';
    // this.parameter.pc_receipt = '0';
    // this.parameter.pc_invoice = '0';
    // this.parameter.pc_amount = '0';
    this.getPaymentMethods();
    this.getCountries();
    this.initCalendarLocale();

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.parameter.collection_id = params['id'];
        this.parameter.dash_flag = 4;
      }
      if (params.for == 'back') {
        this.is_back = true;
        this.local_storage_parameter = JSON.parse(localStorage.getItem('parametersForCollection'));
        this.parameter = this.local_storage_parameter && this.is_back ? this.local_storage_parameter : this.parameter;
      }

    });
    //this.getListing();
    this.http.get('../../../assets/img/sozu_black.png', { responseType: 'blob' })
      .subscribe(res => {
        const reader = new FileReader();
        reader.onloadend = () => {
          let base64data = reader.result;
          this.logoImageBase64 = base64data;
        }

        reader.readAsDataURL(res);
      });

    this.translate.onDefaultLangChange.subscribe((event: LangChangeEvent) => {
      this.initCalendarLocale();
    });
  }
  userinfo(userdata) {
    console.log(userdata, "user id")
    this.router.navigate(['/dashboard/users/edit-user', userdata.buyer_id]);
  }
  legalinfo(userdata) {
    console.log(userdata, "user id")
    this.router.navigate(['/dashboard/legal-entities/add-legal-entity/', userdata.buyer_legal_entity_id]);
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

  initPenaltyForm() {
    this.penaltyForm = this.fb.group({
      id: [''],
      collection_payment_choice_id: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      description: [''],
      percent: ['', Validators.required],
      payment_concept_amt: ['', Validators.required]
    });
  }

  get getPenaltyControls() {
    return this.penaltyForm.controls;
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
    this.admin.postDataApi('getCollection', input).subscribe(
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

  getPropertyConfigurations() {
    this.admin.postDataApi('getPropertyConfigurations', {}).subscribe(r => {
      this.configurations = r['data'];
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

  changeFlag(flag: number) {
    this.parameter.dash_flag = flag;
    this.propertyService.dash_flag = flag;
    if (flag === 5) {
      return false;
    }
    this.resetDates();
    this.getListing();
  }

  changeAppUnappFlag(flag) {
    this.parameter.flag = flag;
    this.parameter.page = this.constant.p;
    this.getListing();
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

  getPage(page) {
    this.parameter.page = page;
    this.getListing();
  }

  openCancellationModal(item, status) {
    this.item = item;
    this.parameter.status = status;
    this.modalOpen.nativeElement.click();
  }

  closeModal() {
    this.modalClose.nativeElement.click();
  }

  changeStatus(item: any, status: number) {
    item.is_approved = status;
    const input = { id: item.id, is_approved: status };
    this.admin.postDataApi('approveCollection', input).subscribe(r => {
      this.toastr.clear();
      this.toastr.success(this.translate.instant('message.success.collectionStatusChanged'), this.translate.instant('swal.success'));
    },
      error => {
        this.toastr.clear();
        this.toastr.error(error.error.message, this.translate.instant('swal.error'));
      });
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

  resetDates() {
    this.parameter.min = '';
    this.parameter.max = '';
  }

  deletePopup(item: any, index: number) {
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' +
        this.translate.instant('message.error.wantToDeleteCollection'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.deleteCollection(item, index);
      }
    });
  }

  deleteCollection(item: any, index: number) {
    this.admin.postDataApi('deleteCollection', { id: item.id }).subscribe(r => {
      this.toastr.success(this.translate.instant('message.success.deletedSuccessfully'), this.translate.instant('swal.success'));
      this.items.splice(index, 1);
    },
      error => {
        this.toastr.error(error.error.message, this.translate.instant('swal.error'));
      });
  }

  cancelPopup(item: any, index: number, status: number) {
    const t = status == 1 ?
      this.translate.instant('message.error.wantToCancelCollection') :
      this.translate.instant('message.error.wantToActiveCollection');
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' + t,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.cancelPropertyCollections(item, index, status);
      }
    });
  }

  cancelPropertyCollections(item: any, index: number, status: number) {
    this.admin.postDataApi('cancelPropertyCollections',
      { property_collection_id: item.id, status: status }).subscribe(r => {
        const t = status == 1 ?
          this.translate.instant('message.success.cancelledSuccessfully') :
          this.translate.instant('message.success.activedSuccessfully');
        this.toastr.success(t, this.translate.instant('swal.success'));
        this.items[index].is_cancelled = status;
      },
        error => {
          this.toastr.error(error.error.message, this.translate.instant('swal.error'));
        });
  }

  getNotes(item) {
    this.property_collection_id = item.id;
    const input = { property_collection_id: item.id };
    this.admin.postDataApi('getCollectionNote', input).subscribe(r => {
      this.parameter.items = r.data;
      this.notesModalOpen.nativeElement.click();
    });
  }

  closeNotesModal() {
    this.notesModalClose.nativeElement.click();
  }

  reminderPopup(value) {
    this.parameter.text = this.translate.instant('message.success.wantToReminderNote');
    swal({
      html: this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.addNoteReminder(value);
      }
    });
  }
  addNoteReminder(value) {
    var nameArr = value.toAddress.split(',');
    if (!this.model.title) {
      return;
    }
    if (!this.model.note) {
      return;
    }
    this.spinner.show();
    this.admin.postDataApi('collectionNote', {
      property_collection_id: this.property_collection_id, note: this.model.note, title: this.model.title,
      reminder_date: this.reminder_date, collection_id: this.property_collection_id, email: nameArr
    }).subscribe(r => {
      this.spinner.hide();
      this.model = new Notes();
      this.parameter.items.push(r.data);

      this.toastr.clear();
      this.toastr.success(this.translate.instant('message.success.addedSuccessfully'), this.translate.instant('swal.success'));
      this.closeNotesModal();
    });
  }

  addNote(value) {
    // console.log(value,"value")
    var nameArr = value.toAddress != '' ? value.toAddress.split(',') : undefined;
    //console.log(nameArr,"nameArr")

    if (this.mode === 'edit') {
      if (this.selectedNote && this.selectedNote.id) {
        this.editNote(this.selectedNote);
      }
    } else {
      if (!nameArr) {
        if (!this.model.title) {
          return;
        }
        if (!this.model.note) {
          return;
        }
        // console.log("without mail create")
        this.spinner.show();
        this.admin.postDataApi('collectionNote', {
          property_collection_id: this.property_collection_id, note: this.model.note, title: this.model.title,
          reminder_date: this.reminder_date, collection_id: this.property_collection_id, email: nameArr
        }).subscribe(r => {
          this.spinner.hide();
          this.model = new Notes();
          this.parameter.items.push(r.data);

          this.toastr.clear();
          this.toastr.success(this.translate.instant('message.success.addedSuccessfully'), this.translate.instant('swal.success'));
          this.closeNotesModal();
        });

      } else {
        // console.log("popup")
        this.reminderPopup(value);
      }
    }
  }

  commaSepEmail = (control: AbstractControl): { [key: string]: any } | null => {
    const emails = control.value.split(',');
    const forbidden = emails.some(email => Validators.email(new FormControl(email)));
    // console.log(forbidden,"email fun");
    return forbidden ? { 'toAddress': { value: control.value } } : null;
  };


  editLeadPopup(mode: string, note_id, note, index) {
    this.mode = mode;
    // console.log(note,"note")
    // console.log(note.collection_reminder.collection_collaborators,"emails")

    this.noteIndex = index;
    this.selectedNote = note;
    this.noteTitle = note.title;
    this.noteDesc = note.note;
    this.reminder_date = new Date(note.reminder_date);
    this.notesadddModalOpen.nativeElement.click();
    this.property_collection_id = note.property_collection_id;
    let emails = note.collection_reminder.collection_collaborators
    let newArray = [];
    for (var i = 0; i < emails.length; i++) {
      let mails = emails[i].email;
      newArray.push(mails);
    }
    //console.log(newArray,"newArray"); 
    this.noteEmails = newArray
  }

  modelChange(value) {
    this.oldEmails = value;
  }

  editNote(value) {
    let str = this.oldEmails ? this.oldEmails.split(',') : this.noteEmails;
    this.admin.postDataApi('editcollectionNote', {
      id: this.selectedNote.id, collection_id: this.property_collection_id,
      title: this.noteTitle, note: this.noteDesc, email: str, reminder_date: this.reminder_date
    })
      .subscribe(
        (success) => {
          this.toastr.clear();
          this.toastr.success(this.translate.instant('message.success.updatedSuccessfully'), this.translate.instant('swal.success'));
          // this.parameter.items = this.parameter.items.map((data) => {
          //   if (data.id == this.selectedNote.id) {
          //     data.title =  this.noteTitle;
          //     data.note = this.noteDesc;
          //     data.reminder_date = this.reminder_date;
          //     // data.collection_reminder.collection_collaborators
          //   }
          //   return data;
          // });
          const input = { property_collection_id: this.property_collection_id };
          this.admin.postDataApi('getCollectionNote', input).subscribe(r => {
            this.parameter.items = r.data;
          });
          this.mode = null;
          this.closeNotesadddModalModal();
        }, (error) => {
          this.spinner.hide();
        }
      );
  }

  deleteLeadPopup(note_id, index) {
    this.parameter.text = this.translate.instant('message.error.wantToDeleteNote');
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Delete!'
    }).then((result) => {
      if (result.value) {
        this.deleteLeadNote(note_id, index);
      }
    });
  }


  deleteLeadNote(note_id, index) {
    this.admin.postDataApi('deleteCollectionNote', { id: note_id }).subscribe(r => {
      this.parameter.items.splice(index, 1);
      this.toastr.clear();
      this.toastr.success(this.translate.instant('message.success.deletedSuccessfully'), this.translate.instant('swal.success'));
    });
  }

  showEditPaymentPopup(item: any, i: number) {
    this.paymentConcepts = [];
    this.property_collection_id = item.id;
    this.collectionIndex = i;
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
    this.last_payment_id = item.last_payment ? item.last_payment.parent_id : '';
    this.seller_type = item.seller_type;
    this.showPaymentBanks(item);
    this.getCollectionDetails();
    this.editPaymentModalOpen.nativeElement.click();
  }

  showUpdatePaymentPopup(item: any, i: number) {
    this.payment_id = item.id;
    this.payment_type = item.payment_type;
    this.payment_method_id = item.payment_method.id;
    this.payment_bank = item.payment_bank ? item.payment_bank.id : 0;
    this.description = item.description;
    this.docFile = item.receipt;
    this.payment_date = item.payment_date ? this.getDateWRTTimezone(item.payment_date, 'DD/MMM/YYYY') : '';
    this.closeEditPaymentModal();
    this.updatePaymentModalOpen.nativeElement.click();
  }

  closeUpdatePaymentModal() {
    this.updatePaymentModalClose.nativeElement.click();
  }

  //update collection payment.
  updateCollectionPayment(formdata: NgForm) {
    // checking if date selected and receipt selected
    if (!this.payment_date) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseSelectPaymentDate'), this.translate.instant('swal.error'));
      return false;
    }
    if (!this.docFile && this.payment_method_id != "1") {
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
      payment_id: this.payment_id,
      payment_method_id: this.payment_method_id,
      // is_agency: this.payment_bank ? this.payment_bank.is_agency : null,
      // bank_id: this.payment_bank ? this.payment_bank.bank_id : null,
      // legal_rep_bank_id: this.payment_bank ? this.payment_bank.legal_rep_bank_id : null,
      receipt: this.docFile,
      description: this.description,
      payment_date: this.payment_date
    };

    this.admin.postDataApi('updateCollectionPayment', input).subscribe(r => {
      this.router.navigate(['/dashboard/collections/quick-visualization', this.property_collection_id]);
      this.closeUpdatePaymentModal();
      this.toastr.clear();
      this.toastr.success(this.translate.instant('message.success.savedSuccessfully'), this.translate.instant('swal.success'));
    }, error => {
      this.toastr.error(error.message, this.translate.instant('swal.error'));
      return false;
    });
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

  deletePayment(payment_id: string, mainIndex: number, index: number) {
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' +
        this.translate.instant('message.error.wantToDeletePayment'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        // this.admin.postDataApi('deleteCollectionPayment', {payment_id: payment_id})
        this.admin.postDataApi('deletePayment', { parent_id: payment_id })
          .subscribe(
            success => {
              // this.paymentConcepts[mainIndex].collection_paymentss.splice(index, 1);
              this.router.navigate(['/dashboard/collections/quick-visualization', this.property_collection_id]);
              this.closeEditPaymentModal();
              this.toastr.clear();
              this.toastr.success(this.translate.instant('message.success.deletedSuccessfully'), this.translate.instant('swal.success'));
            },
            error => {
              this.toastr.error(error.message, this.translate.instant('swal.error'));
            });
      }
    });
  }

  showApplyPaymentPopup(item: any, i: number, type: string) {
    this.paymentConcepts = [];
    this.surplus_payment_type = null;
    this.payment_type = null;
    this.paymentDate = null;
    this.payment_choice_id = null;
    this.property_collection_id = item.id;
    this.typeOfPayment = type;
    this.collectionIndex = i;
    this.paymentConcepts = [...item.payment_choices];
    const check = this.paymentConcepts.find(r => r.name.includes('Monthly Installment'));
    this.disablePayToRemaining = true;
    if (check) {
      this.disablePayToRemaining = false;
    }
    this.calculateCash();
    this.showPaymentBanks(item);
    this.paymentModalOpen.nativeElement.click();
  }

  calculateCash() {
    this.cashSum = 0;
    for (let index = 0; index < this.paymentConcepts.length; index++) {
      const m = this.paymentConcepts[index];
      if (m.collection_paymentss && m.collection_paymentss.length > 0) {
        for (let i = 0; i < m.collection_paymentss.length; i++) {
          const paymnts = m.collection_paymentss[i];
          // console.log(paymnts);
          if (paymnts.payment_method_id == this.apiConstants.payment_method_id) {
            this.cashSum = parseFloat(this.cashSum) + parseFloat(paymnts.amount);
          }
        }
      }
    }
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

  setPaymentConceptAmount(id: any) {
    this.paymentConcepts.map(r => {
      if (r.id == id) {
        this.penaltyForm.controls.payment_concept_amt.patchValue(r.amount || 0);
      }
    });
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

  closePaymentModal() {
    this.paymentModalClose.nativeElement.click();
  }

  closeEditPaymentModal() {
    this.paymentConcepts = [];
    this.editPaymentModalClose.nativeElement.click();
  }

  onSelect(e) {
    this.paymentDate = moment.utc(e).toDate();
  }
  onSelect1(e) {
    //  this.reminder_date = moment().format('YYYY-MM-DD hh:mm');
    this.reminder_date = moment.utc(e).toDate();
  }

  onSelect2(e) {
    this.reminder_date = e;
    this.reminder_date = moment.utc(e).toDate();
  }

  onSelectInvoiceDate(e) {
    this.invoice_date = moment.utc(e).toDate();
  }

  // apply payment, comision payment or supermoney payment function

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

  applyCollectionPayment1() {
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

  askUserForSurplusMomey() {
    this.closePaymentModal();
    this.surplusMoneyModalOpen.nativeElement.click();
  }

  closeSurplusMoney() {
    this.surplusMoneyModalClose.nativeElement.click();
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

  editCollectionCommReceipt(item: any) {
    this.payment_id = item.id;
    this.payment_method_id = item.payment_method.id;
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

    this.closeEditPaymentModal();
    this.editCollectionReceiptOpen.nativeElement.click();
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
              this.router.navigate(['/dashboard/collections/quick-visualization', this.property_collection_id]);
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

  closeEditCollReceiptModal() {
    this.editCollectionReceiptClose.nativeElement.click();
  }

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
      collection_commission_id: this.collection_commission_id,
      commission_type: this.commission_type,
      amount: this.amount
    };
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
      this.router.navigate(['/dashboard/collections/quick-visualization', this.property_collection_id]);
      this.closeEditCollReceiptModal();
      this.toastr.clear();
      this.toastr.success(this.translate.instant('message.success.savedSuccessfully'), this.translate.instant('swal.success'));
    }, error => {
      this.toastr.error(error.message, this.translate.instant('swal.error'));
      return false;
    });
  }

  getPenaltyAmount(percent: number) {
    const paymentConceptAmount = this.penaltyForm.controls.payment_concept_amt.value;
    if (!paymentConceptAmount || paymentConceptAmount == 0) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseChoosePaymentConcept'), this.translate.instant('swal.error'));
      this.penaltyForm.controls.percent.patchValue(0);
      return;
    }
    const paymentAmount = ((percent * paymentConceptAmount) / 100).toFixed(2);
    this.penaltyForm.controls.amount.patchValue(paymentAmount);
  }

  getPenaltyPercentage(amount: number) {
    const paymentConceptAmount = this.penaltyForm.controls.payment_concept_amt.value;
    if (!paymentConceptAmount || paymentConceptAmount == 0) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseChoosePaymentConcept'), this.translate.instant('swal.error'),);
      this.penaltyForm.controls.amount.patchValue(0);
      return;
    }
    const penaltyPercent = ((amount * 100) / paymentConceptAmount).toFixed(3);
    this.penaltyForm.controls.percent.patchValue(penaltyPercent);
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

  closeCollCommissionModal() {
    this.viewCollectionClose.nativeElement.click();
  }

  showPenaltyPaymentPopup(item: any, i: number, type: string, collection_payment_choice_id: string) {
    if (collection_payment_choice_id) {
      this.editPaymentModalOpen.nativeElement.click();
      this.penaltyForm.controls.payment_concept_amt.patchValue(item.amount);
      this.penaltyForm.controls.amount.patchValue(item.penalty.amount);
      this.penaltyForm.controls.description.patchValue(item.penalty.description);
      this.penaltyForm.controls.percent.patchValue(((item.penalty.amount * 100) / item.amount).toFixed(2));
      this.penaltyForm.controls.id.patchValue(item.penalty.id);
      this.penaltyForm.controls.collection_payment_choice_id.patchValue(item.penalty.collection_payment_choice_id);
    } else {
      this.property_collection_id = item.id;
      this.typeOfPayment = type;
      this.collectionIndex = i;
      this.paymentConcepts = item.payment_choices;
    }
    this.penaltyModalOpen.nativeElement.click();
  }


  deletePenaltyPaymentPopup(i: any) {
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' +
        this.translate.instant('message.error.wantToDeletePenalty'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.admin.postDataApi('deleteCollectionPenalty', { id: i.id, collection_payment_choice_id: i.collection_payment_choice_id })
          .subscribe(
            success => {
              this.router.navigate(['/dashboard/collections/quick-visualization', this.property_collection_id]);
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

  closePenaltyPaymentPopup() {
    this.penaltyForm.reset();
    this.penaltyModalClose.nativeElement.click();
  }

  applyCollectionPenalty(formdata) {
    if (this.penaltyForm.invalid) {
      this.showError = true;
      this.isPenaltyFormSub = false;
      return;
    }
    this.isPenaltyFormSub = true;
    this.admin.postDataApi('applyCollectionPenalty', this.penaltyForm.value).subscribe(r => {
      // let paymentChoiceIndex = 0;
      // for (let index = 0; index < this.items[this.collectionIndex].payment_choices.length; index++) {
      //   const element = this.items[this.collectionIndex].payment_choices[index];
      //   if (element.id == this.payment_choice_id) {
      //     paymentChoiceIndex = index;
      //   }
      // }
      // this.items[this.collectionIndex].payment_choices[paymentChoiceIndex]['penalty'] = r.data;
      this.router.navigate(['/dashboard/collections/quick-visualization', this.property_collection_id]);
      this.closePenaltyPaymentPopup();
      this.toastr.clear();
      this.toastr.success(this.translate.instant('message.success.savedSuccessfully', this.translate.instant('swal.success')));
    });
  }

  quickCollectionView(item: any) {
    this.router.navigate(['/dashboard/collections/quick-visualization', item.id]);
  }

  viewAccountStatement(item: any) {
    this.router.navigate(['/dashboard/collections/account-statement', item.id]);
  }

  setPayMentType(payment_type: string) {
    this.payment_type = payment_type;
    if (payment_type == '1') {
      this.paymentConcepts.map(r => r.is_disabled = true);
      for (let index = 0; index < this.paymentConcepts.length; index++) {
        if (!this.paymentConcepts[index].is_paid_calculated) {
          this.paymentConcepts[index].is_disabled = false;
          break;
        }
      }
    }
    if (this.typeOfPayment == 'apply-popup') {
      this.docsFile1.nativeElement.value = '';
    } else {
      this.docsFile2.nativeElement.value = '';
    }
    if (this.payment_type && this.payment_type != '2' && this.payment_type != '3' && this.payment_type != '5') {
      this.applyPaymentChoiceId.nativeElement.value = '';
    }
    this.closeCollReceiptModal();
    if (this.payment_type == 5) {
      let amt: any = 0; let penaltyamt: any = 0;
      let amtPaid: any = 0;
      let currentAmt: any = 0;
      let currentAmtPaid: any = 0;
      this.penaltyAmount = 0;
      for (let index = 0; index < this.paymentConcepts.length; index++) {
        const r = this.paymentConcepts[index];
        currentAmt = r['amount'];
        currentAmtPaid = r['calc_payment_amount'] || 0;
        penaltyamt = r['penalty'] ? parseFloat(r['penalty']['amount']) : 0;
        amt = parseFloat(amt) + parseFloat(r['amount']) + parseFloat(penaltyamt);
        amtPaid = parseFloat(amtPaid) + parseFloat(currentAmtPaid);
      }
      this.paymentAmount = (amt - amtPaid).toFixed(2);
      this.calculatedPayAmount = [...this.paymentAmount];
    }
    this.applyPaymentMethodId.nativeElement.value = '';
  }

  setPayMentTypeSurplus(payment_type: string) {
    this.surplus_payment_type = payment_type;
    // incase user select type 4 in surplus popup => therefore, needs to disable selected concept in payment modal
    this.paymentConcepts.map(r => r.is_disabled = false);
    for (let index = 0; index < this.paymentConcepts.length; index++) {
      // paid and if selected concept => only then disable
      if (this.payment_choice_id['id'] == this.paymentConcepts[index].id) {
        this.paymentConcepts[index].is_disabled = true;
        break;
      }
    }
  }

  setPaymentSurplusAmount(item) {
    this.selectedPaymentConcept = item;
    this.surplus_payment_choice_id = item.id;
    let currentAmt: any = 0;
    let currentAmtPaid: any = 0;
    // checking if method is pay to specific (4),
    // then user will pay only for that specific installment + user cannot pay more than the amount+penalty
    if (this.surplus_payment_type == '4') {
      currentAmt = item['amount'];
      currentAmtPaid = item['calc_payment_amount'] || 0;
      const penaltyAmount: any = item.penalty ? parseFloat(item.penalty.amount).toFixed(2) : 0;
      const currentAmount: any = (parseFloat(currentAmt) - parseFloat(currentAmtPaid)).toFixed(2);
      this.surplus_amt = (parseFloat(currentAmount) + parseFloat(penaltyAmount)).toFixed(2);
    }

    if ((this.paymentAmount - this.calculatedPayAmount) > this.surplus_amt) {
      this.surplus_payment_choice_id = '';
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.payToSpecificCheck'), this.translate.instant('swal.error'));
      return false;
    }
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
    //    const v = (((p.deal_price || 0) + (p.penalty || 0)) - (p.total_payment_recieved || 0));
    const v = ((p.deal_price || 0) - (p.total_payment_recieved || 0));
    return v > 0 ? v : 0;
  }

  showDescription(description: string, title: any) {
    if (description) {
      this.title = title;
      this.description = description;
      this.viewDesModal.nativeElement.click();
    }
  }

  closeDescModal() {
    this.viewDesModalClose.nativeElement.click();
  }

  sortFunction(a, b) {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return dateA > dateB ? 1 : -1;
  }

  openFoldersModal = (details: any): void => {
    let self = this;
    this.spinner.show();
    this.collectionFolders = [];
    this.collectionFolders = details.collection_folders || [];
    this.payment_folder_id = details.payment_folder_id;
    this.buyerDocumentationFoldersDetails = [];
    this.sellerDocumentationFoldersDetails = [];
    this.propertyDocumentationFoldersDetails = [];
    this.beneficiaryDocumentationFoldersDetails = [];
    this.tutorDocumentationFoldersDetails = [];
    const postData = {
      property_id: (details.property || {}).id,
      seller_id: details.seller_type == 2 ? (details.seller_legal_entity || {}).id : (details.seller || {}).id,
      seller_type: details.seller_type,
      buyer_id: details.buyer_type == 2 ? (details.buyer_legal_entity || {}).id : (details.buyer || {}).id,
      buyer_type: details.buyer_type
    };
    this.admin.postDataApi('getCollectionDocument', postData).subscribe((success) => {
      this.property_offer_id = success.offer_id;
      this.buyerDocumentationFoldersDetails = success.buyer || [];
      this.sellerDocumentationFoldersDetails = success.seller || [];
      this.propertyDocumentationFoldersDetails = success.property || [];
      let beneficiaryDocumentation = success.beneficiary || [];
      let tutorDocumentationFolders = [];
      beneficiaryDocumentation.forEach(function (element) {
        element.beneficiary_linked_document.forEach(function (x) {
          x.beneficiary_name = null;
          x.beneficiary_firstSurname = null;
          x.beneficiary_secondSurname = null;
          if (x.document_link) {
            x.beneficiary_name = element.beneficiary_name;
            x.beneficiary_firstSurname = element.beneficiary_firstSurname
            x.beneficiary_secondSurname = element.beneficiary_secondSurname;
            self.beneficiaryDocumentationFoldersDetails.push(x);
          }
        });
        if (element.tutor && element.tutor.tutor_name) {
          tutorDocumentationFolders.push(element.tutor);
        }
      });
      tutorDocumentationFolders.forEach(function (element) {
        element.tutor_linked_document.forEach(function (x) {
          x.tutor_name = null;
          x.tutor_firstSurname = null;
          x.tutor_secondSurname = null;
          if (x.document_link) {
            x.tutor_name = element.tutor_name;
            x.tutor_firstSurname = element.tutor_firstSurname;
            x.tutor_secondSurname = element.tutor_secondSurname;
            x.beneficiary_secondSurname = element.beneficiary_secondSurname;
            self.tutorDocumentationFoldersDetails.push(x);
          }
        });
      });
      self.beneficiaryDocumentationFoldersDetails.forEach(element => {
        let count = 1;
        self.beneficiaryDocumentationFoldersDetails.forEach(item => {
          item.last = null;
          if (element.beneficiary_document.name_en == item.beneficiary_document.name_en) {
            item.beneficiary_last = '_beneficiary_' + count;
            count = count + 1;
          }
        });
      });
      self.tutorDocumentationFoldersDetails.forEach(element => {
        let count = 1;
        self.tutorDocumentationFoldersDetails.forEach(item => {
          item.tutor_last = null;
          if (element.tutor_document.name_en == item.tutor_document.name_en) {
            item.tutor_last = '_tutor_' + count;
            count = count + 1;
          }
        });
      });
      this.foldersModalOpen.nativeElement.click();
      this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
    });
  }

  closeFoldersModal() {
    this.foldersModalClose.nativeElement.click();
  }

  addDocs(folderIndex: number, collection_folder_id: number) {
    if (!this.docsName) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseEnterDocuName'), this.translate.instant('swal.error'));
      return;
    }
    if (!this.docFile) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseEnterDocuFile'), this.translate.instant('swal.error'));
      return;
    }
    const input = { name: this.docsName, display_name: this.docFile, collection_folder_id: collection_folder_id };
    const allDocx: Array<any> = this.collectionFolders[folderIndex].folder_docs;
    this.admin.postDataApi('addFolderDoc', input).subscribe(success => {
      input['id'] = success['data'];
      allDocx.push(input);
      this.collectionFolders[folderIndex].folder_docs = allDocx;
      this.toastr.clear();
      this.toastr.success(this.translate.instant('message.success.addedSuccessfully'), this.translate.instant('swal.success'));
      this.docFile = ''; this.docsName = '';
      this.docsFile.nativeElement.value = '';
    });
  }

  deleteDocsPopup(item: any, folderIndex: number, docIndex: number) {
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' +
        this.translate.instant('message.error.wantToDeleteDocs'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.deleteDocs(item, folderIndex, docIndex);
      }
    });
  }

  deleteDocs(item: any, folderIndex: number, docIndex: number) {
    this.collectionFolders[folderIndex].folder_docs.splice(docIndex, 1);
    if (item.id) {
      this.admin.postDataApi('deleteFolderDoc', { id: item.id }).subscribe(success => {
        this.toastr.clear();
        this.toastr.success(this.translate.instant('message.success.deletedSuccessfully'), this.translate.instant('swal.success'));
      });
    }
  }

  showInvoicekeys() {
    this.invoiceKeys = this.invoiceKeys ? false : true;
  }

  numberUptoNDecimal(num: any, n: number) {
    return num ? num.toFixed(n) : 0;
  }

  getExportlisting = (): void => {
    this.spinner.show();
    this.exportfinalData = [];
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
    input.page = 0;
    this.admin.postDataApi('getCollection', input).subscribe((success) => {
      this.exportfinalData = success.data || [];

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

      this.makeExportData();
      this.spinner.hide();
    },
      (error) => {
        //  console.log(error);
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
          'Last Concept': p.last_payment ? this.getLastPaymentConcept(p) : '',
          'Last Date Of Payment': (p.last_payment || {}).payment_date ? (p.last_payment || {}).payment_date : '',//(p?.last_payment?.payment_date | date:'dd/MMM/yyyy') :
          'Last Amount': this.getTransformedAmount((p.last_payment || {}).collection_amount || 0),//'$ ' + parseInt((p.last_payment || {}).collection_amount || 0),
          'Next Concept': (p.next_payment || {}).name || '',
          'Next Date Of Payment': (p.next_payment || {}).date ? (p.next_payment || {}).date : '',//(p.next_payment?.date | date:'dd/MMM/yyyy') :
          'Next Amount': this.getTransformedAmount((((p.next_payment || {}).amount || 0) - ((p.next_payment || {}).calc_payment_amount || 0)) || 0),//'$ ' + (((p.next_payment || {}).amount || 0) - ((p.next_payment || {}).calc_payment_amount || 0)),
          'Currency': (p.currency || {}).code || '',
          'Sozu Commission (in %)': this.getTransformedAmount(p.comm_total_commission ? p.comm_total_commission : 0),//p.comm_total_commission ? p.comm_total_commission : 0,//(p.comm_total_commission | number : '1.2-3') :
          'IVA Added in Amount': p.add_iva_to_pc ? 'Yes' : 'No',
          'PC Amount': this.getTransformedAmount(p.pc_received || 0),//'$ ' + parseInt(p.pc_received || 0),
          'PC Receipt': p.pc_receipt ? 'Yes' : 'No',
          'PC Invoice': p.pc_invoice ? 'Yes' : 'No',
          'Collection Commission (in %)': this.getTransformedAmount(p.cc_percent || 0),//p.cc_percent || 0
          'IVA Added in Amount 2': p.add_iva_to_cc ? 'Yes' : 'No',
          'CC Amount': this.getTransformedAmount(p.cc_received || 0),//'$ ' + parseInt(p.cc_received || 0),
          'CC Receipt': p.cc_receipt ? 'Yes' : 'No',
          'CC Invoice': p.cc_invoice ? 'Yes' : 'No',
          'Agent Commission (in %)': this.getTransformedAmount(p.comm_shared_commission ? p.comm_shared_commission : 0),//p.comm_shared_commission ? p.comm_shared_commission : 0,//(p?.comm_shared_commission | number : '1.2-3') :
          'IVA Added in Amount 3': p.add_iva_to_ac ? 'Yes' : 'No',
          'AC Receipt': p.ac_receipt ? 'Yes' : 'No',
          'AC Invoice': p.ac_invoice ? 'Yes' : 'No',
          'Commission Agent': (((p.deal_commission_agents || [])[0] || []).broker || {}).name ? ((((p.deal_commission_agents || [])[0] || []).broker || {}).name + ' ' + (((p.deal_commission_agents || [])[0] || []).broker || {}).first_surname + ' ' + (((p.deal_commission_agents || [])[0] || []).broker || {}).second_surname) : '',
          'Price': this.getTransformedAmount(p.deal_price || 0),//'$ ' + parseInt(p.deal_price || 0),
          'Penalty': this.getTransformedAmount(p.penalty || 0),//'$ ' + parseInt(p.penalty || 0),
          'Amount Paid': this.getTransformedAmount(p.total_payment_recieved || 0),//'$ ' + parseInt(p.total_payment_recieved || 0),
          'Remanining Amount': this.getTransformedAmount(this.getRemainingAmt(p) || 0),//'$ ' + (this.getRemainingAmt(p) || 0),
          // 'Status Account': ''
        });

      }
      new ExcelDownload().exportAsExcelFile(tempExportData, 'collections');
    }
  }

  getTransformedAmount(value: any) {
    return (this.price.transform(Number(value).toFixed(2)).toString()).substring(1);
  }

  editDocsPopup(item: any, folderIndex: number, docIndex: number) {
    this.modelForDoc.name_en = item.name;
    this.modelForDoc.id = item.id
    this.folderId = this.collectionFolders[folderIndex].id;
    this.localityOpen.nativeElement.click();
  }

  editFolderName(folder) {
    this.collectionFolders[this.folderIndex]['name'] = this.folderName;
    this.admin.postDataApi('updateCollectionFolder', { id: this.selectedFolder.id, name: this.folderName })
      .subscribe(
        success => {
          // this.collectionFolders[this.folderIndex]['name'] = this.folderName;
        }, error => {
          this.spinner.hide();
        }
      );
  }
  // folder
  addFolder() {
    const input = {
      step: 6,
    };
    const folder_docs = {
      display_name: '',
      name: ''
    };
    if (this.mode === 'edit') {
      if (this.selectedFolder && this.selectedFolder.id) {
        this.editFolderName(this.selectedFolder);
      } else {
        this.collectionFolders[this.folderIndex].name = this.folderName;
      }
    }
    this.closeFolderModal();
  }

  closeFolderModal() {
    $('.modal').modal('hide');
  }

  openAddFolder(mode: string, folder, index: number) {
    this.mode = mode;
    if (folder) {
      this.folderIndex = index;
      this.selectedFolder = folder;
      this.folderName = folder.name;
    }
    this.folderModalOpen.nativeElement.click();
  }

  deleteFolderPopup(item: any, index: number) {
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' +
        this.translate.instant('message.error.wantToDeleteFolder'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.deleteFolder(item, index);
      }
    });
  }

  deleteFolder(item, index: number) {
    this.collectionFolders.splice(index, 1);
    if (item.id) {
      this.admin.postDataApi('deleteCollectionFolder', { id: item.id }).subscribe(success => {
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
      });
    }
  }

  checkIfLocalitySpanishNameEntered(document) {
    const self = this;
    if (document.name === '') {
      swal({
        text: this.translate.instant('message.error.saveName'),
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: this.constant.confirmButtonColor,
        cancelButtonColor: this.constant.cancelButtonColor,
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          this.editDocument(document);
        }
      });
    } else {
      self.editDocument(document);
    }
  }

  closeEditModal() {
    this.localityClose.nativeElement.click();
  }

  editDocument(document) {
    let self = this;
    this.spinner.show();
    let param = {
      id: this.modelForDoc.id,
      name: this.modelForDoc.name_en
    }
    this.admin.postDataApi('updateDocFolderName', param).subscribe(
      r => {
        self.spinner.hide();
        self.collectionFolders.filter(folder => {
          if (folder.id == self.folderId) {
            folder.folder_docs.filter(doc => {
              if (doc.id == self.modelForDoc.id) {
                doc.name = self.modelForDoc.name_en;
              }
            });
          }
        });
        self.closeEditModal();
      }, error => {
        self.spinner.hide();
      });
  }

  // addPhone(): void {
  //   (this.userForm.get('email') as FormArray).push(
  //     this.fb.control(null)
  //   );
  // }

  // removePhone(index) {
  //   (this.userForm.get('email') as FormArray).removeAt(index);
  // }

  // getPhonesFormControls(): AbstractControl[] {
  //   return (<FormArray> this.userForm.get('email')).controls
  // }

  // send(values) {
  //   console.log(values);
  //   const input = {
  //     collection_id: this.property_collection_id,
  //     email: values.email,
  //     reminder_date: this.reminder_date
  //   };
  //   this.admin.postDataApi('collectionNote',input).subscribe(r => {
  //     this.spinner.hide();
  //     this.toastr.clear();
  //     this.toastr.success(this.translate.instant('message.success.Reminder'), this.translate.instant('swal.success'));
  //     this.closeNotesModal();
  //     this.closeFolderModal();
  //   });
  // }

  closeNotesadddModalModal = (): void => {
    this.notesadddModalClose.nativeElement.click();
  }

  generateAccountStatementPdf(data) {
    let self = this;
    this.table_data = [];
    this.monthly_installment = 0;
    this.current_month_amount = 0;
    this.bill_month = undefined;
    this.bill_month_date = undefined;
    this.monthly_installment_no = 0;
    this.layaway_payments = [];
    this.down_payments = [];
    this.payments_upon_delivery = [];
    this.special_payments = [];
    this.monthly_installment_amunt = [];
    this.monthly_installment_amunts = 0;
    this.spinner.show();
    this.getBase64ImageFromUrl(data.property.id);
    this.admin.postDataApi('getCollectionById', { id: data.id })
      .subscribe(
        success => {
          let count = 0;
          let count1 = 0;
          let count2 = 0;
          let count3 = 0;
          let count4 = 1;
          this.spinner.hide();
          this.collection_data = success['data'];
          this.collection_payments = success['data2'];
          self.getParkingSpaceLots(this.collection_data.property.building_id);
          const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ];
          const monthNamesES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
            'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
          ];
          this.collection_data.payment_choices.forEach(function (element, index) {
            let fill = index % 2;
            let month = new Date(element.date);
            let current_date = new Date();
            self.bill_month = self.translate.defaultLang === 'en' ? monthNames[current_date.getUTCMonth()] : monthNamesES[current_date.getUTCMonth()];
            self.bill_month_date = self.datePipe.transform(current_date.setDate(10), 'MMM d, y');

            if (element.is_paid_calculated == 0 && moment(new Date()).isAfter(month)) {
              self.current_month_amount = element.penalty ? self.current_month_amount + ((element.amount + element.penalty.amount) - element.calc_payment_amount) : self.current_month_amount + (element.amount - element.calc_payment_amount);
            }
            else if (index == 0 && element.is_paid_calculated == 0) {
              self.current_month_amount = element.amount;
              self.bill_month = self.translate.defaultLang === 'en' ? monthNames[month.getUTCMonth()] : monthNamesES[month.getUTCMonth()];
              self.bill_month_date = self.datePipe.transform(month.setDate(10), 'MMM d, y');
            }
            if (element.category_name.includes('Monthly Installment')) {
              element.payment_choice.name_en = element.payment_choice.name_en + ' ' + count4;
              element.payment_choice.name_es = element.payment_choice.name_es + ' ' + count4;
              self.monthly_installment = element.amount;
              count4 = count4 + 1;
            }
            self.monthly_installment_no = element.category_name.includes('Monthly Installment') ? self.monthly_installment_no + 1 : self.monthly_installment_no + 0;
            self.monthly_installment_amunts = element.category_name.includes('Monthly Installment') ? self.monthly_installment_amunts + element.amount : self.monthly_installment_amunts + 0;

            if (element.category_name == 'Layaway Payment') {
              let layaway_payments_per = Number((self.collection_data.deal_price ? element.amount * 100 / self.collection_data.deal_price : 0)).toFixed(3) + '%';
              layaway_payments_per = layaway_payments_per.includes('.000') ? layaway_payments_per.replace('.000', '') : layaway_payments_per;
              self.layaway_payments.push([
                { text: self.translate.instant('generatePDF.layaway') + ' ' + (count == 0 ? '' : count) + ':', border: [false, false, false, false], color: '#858291' },
                { text: layaway_payments_per || 'N/A', border: [false, false, false, false], bold: true },
                { text: self.price.transform(Number(element.amount).toFixed(2)), border: [false, false, false, false], bold: true }
              ]);
              count = count + 1;
            }
            else if (element.category_name == 'Down Payment') {
              let down_payments_per = Number((self.collection_data.deal_price ? element.amount * 100 / self.collection_data.deal_price : 0)).toFixed(3) + '%';
              down_payments_per = down_payments_per.includes('.000') ? down_payments_per.replace('.000', '') : down_payments_per;
              self.down_payments.push([
                { text: self.translate.instant('generatePDF.downpayment') + ' ' + (count1 == 0 ? '' : count1) + ':', border: [false, false, false, false], color: '#858291' },
                { text: down_payments_per || 'N/A', border: [false, false, false, false], bold: true },
                { text: self.price.transform(Number(element.amount).toFixed(2)), border: [false, false, false, false], bold: true }
              ]);
              count1 = count1 + 1;
            }
            else if (element.category_name == 'Payment upon Delivery') {
              let payments_upon_delivery_per = Number((self.collection_data.deal_price ? element.amount * 100 / self.collection_data.deal_price : 0)).toFixed(3) + '%';
              payments_upon_delivery_per = payments_upon_delivery_per.includes('.000') ? payments_upon_delivery_per.replace('.000', '') : payments_upon_delivery_per;
              self.payments_upon_delivery.push([
                { text: self.translate.instant('generatePDF.PaymentUponDelivery') + ' ' + (count2 == 0 ? '' : count2) + ':', border: [false, false, false, false], color: '#858291' },
                { text: payments_upon_delivery_per || 'N/A', border: [false, false, false, false], bold: true },
                { text: self.price.transform(Number(element.amount).toFixed(2)), border: [false, false, false, false], bold: true }
              ]);
              count2 = count2 + 1;
            }
            else if (element.category_name == 'Special payment') {
              self.special_payments.push([
                { text: self.translate.instant('generatePDF.specialPayment') + ' ' + (count3 == 0 ? '' : count3) + ':', border: [false, false, false, false], color: '#858291' },
                { text: '', border: [false, false, false, false] },
                { text: self.price.transform(Number(element.amount).toFixed(2)), border: [false, false, false, false], bold: true }
              ]);
              count3 = count3 + 1;
            }
            //self.current_month_amount = (self.current_month_amount || 0) + (element.amount - (element.calc_payment_amount || 0));
            self.table_data.push([
              {
                text: element.category_name == 'Special payment' ? element.name : self.language_code == 'en' && element.category_name != 'Special payment' ?
                  element.payment_choice.name_en : self.language_code == 'es' && element.category_name != 'Special payment' ? element.payment_choice.name_es : element.name, border: [false, false, false, false], bold: true, color: 'white',
                fillColor: fill == 0 ? '#a9a9a9' : '#929292', fontSize: 11
              },
              { text: element.date, border: [false, false, false, false], bold: true, color: 'white', fillColor: fill == 0 ? '#a9a9a9' : '#929292' },
              {
                text: element.calc_payment_amount && element.calc_payment_amount > '0.1' ? self.price.transform(Number(element.calc_payment_amount).toFixed(2)) : '', border: [false, false, false, false], bold: true,
                color: 'white', fillColor: fill == 0 ? '#a9a9a9' : '#929292', fontSize: 11
              },
              {
                text: element.amount - (element.calc_payment_amount || 0) ? self.price.transform(Number(element.amount - (element.calc_payment_amount || 0)).toFixed(2)) : '-', border: [false, false, false, false],
                bold: true, color: 'white', fillColor: fill == 0 ? '#a9a9a9' : '#929292', fontSize: 11, alignment: 'center'
              },
              {
                text: element.amount ? self.price.transform(Number(element.amount).toFixed(2)) : '', border: [false, false, false, false], bold: true, color: 'white',
                fillColor: fill == 0 ? '#a9a9a9' : '#929292', fontSize: 11
              },
              {
                text: element.penalty ? self.price.transform(Number(element.penalty.amount).toFixed(2)) : '', border: [false, false, false, false], bold: true, color: 'white',
                fillColor: fill == 0 ? '#a9a9a9' : '#929292', fontSize: 11
              },
              {
                text: element.penalty ? element.penalty.description : '', border: [false, false, false, false], bold: true, color: 'white', fillColor: fill == 0 ? '#a9a9a9' : '#929292',
                fontSize: 11
              }
            ]);
          });
          let monthly_installment_amunt_per = undefined;
          monthly_installment_amunt_per = Number((self.collection_data.deal_price ? self.monthly_installment_amunts * 100 / self.collection_data.deal_price : 0)).toFixed(3) + '%';
          monthly_installment_amunt_per = monthly_installment_amunt_per.includes('.000') ? monthly_installment_amunt_per.replace('.000', '') : monthly_installment_amunt_per;
          self.monthly_installment_amunt.push(
            { text: self.translate.instant('generatePDF.monthlyInstallmentAmt'), border: [false, false, false, false], color: '#858291' },
            { text: monthly_installment_amunt_per || 'N/A', border: [false, false, false, false], bold: true },
            { text: self.monthly_installment_amunts >= 0 ? self.price.transform(Number(self.monthly_installment_amunts).toFixed(2)) : 'N/A', border: [false, false, false, false], bold: true }
          );
          self.getBanks(this.collection_data.property.id);
        });
  }

  getParkingSpaceLots = (buildingId: any): void => {
    this.spinner.show();
    forkJoin([
      //this.admin.postDataApi('parkingSpaceLots', { building_id: buildingId || 0 }),
      this.admin.postDataApi('parkingSpaceRent', { building_id: buildingId || 0 }),
    ]).subscribe((response: any[]) => {
      this.spinner.hide();
      this.parkingSpaceLotsArray = response[0].data || [];
      // this.parkingSpaceRentArray = response[1].data;
    });
  }

  getBanks(id) {
    this.spinner.show();
    this.admin.postDataApi('getPropertyDetails', { id: id }).subscribe((success) => {
      this.bankDetails = (success || {}).data;
      let index = this.collection_data.property.property_offer_payment.findIndex(x => x.random_id == this.collection_data.property.offer_id);
      let received_by = this.collection_data.property.offer_id ? (this.collection_data.property.property_offer_payment[index].account_type == 1 ? 1 : '0') : this.collection_data.payment_received_by;
      this.makePaymentBankDetailsArray(received_by);
      this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), error.error.message, 'error');
    });
  }

  makePaymentBankDetailsArray = (payment_received_by): void => {
    this.paymentBankDetailsArray = [];
    if (payment_received_by == 1) {
      this.footer_address = this.bankDetails.building.agency.address;
      this.fedTaxPayer = (((this.bankDetails || {}).building || {}).agency || {}).fed_tax_pay || '';
      // agency banks
      for (let index = 0; index < (((this.bankDetails.building || {}).agency || {}).agency_banks || []).length; index++) {
        if (this.bankDetails.building.agency.agency_banks[index].id == this.collection_data.bank_id) {
          const element = this.bankDetails.building.agency.agency_banks[index];
          element.name = 'Agency Bank | ' + element.bank_name;
          element.is_agency = 1;
          element.bank_id = element.id;
          element.legal_rep_bank_id = null;
          element.legal_name = (((this.bankDetails || {}).building || {}).agency || {}).razon_social || '';
          this.paymentBankDetailsArray.push(element);
        }
      }
    } else if (payment_received_by == 0) {
      this.legal_name = this.bankDetails.selected_seller.user.developer_company ? this.bankDetails.selected_seller.user.developer_company :
        this.bankDetails.selected_seller.user.is_developer == 0 && !this.bankDetails.selected_seller.user.legal_entity_id ? this.bankDetails.selected_seller.user.name + ' ' + this.bankDetails.selected_seller.user.first_surname
          + ' ' + this.bankDetails.selected_seller.user.second_surname : '';

      this.footer_address = this.collection_data.seller_type == 1 ? (this.bankDetails.selected_seller.user.tax_street_address && this.bankDetails.selected_seller.user.tax_street_address != '0' ? this.bankDetails.selected_seller.user.tax_street_address + ' ' : '') +
        (this.bankDetails.selected_seller.user.tax_external_number ? this.bankDetails.selected_seller.user.tax_external_number + '\n' : '')
        + (this.bankDetails.selected_seller.user.tax_internal_number ? this.bankDetails.selected_seller.user.tax_internal_number + ', ' : '') + (this.bankDetails.selected_seller.user.tax_neighborhood ? this.bankDetails.selected_seller.user.tax_neighborhood + '\n' : '')
        + (this.bankDetails.selected_seller.user.tax_zipcode && this.bankDetails.selected_seller.user.tax_zipcode != '0' ? this.bankDetails.selected_seller.user.tax_zipcode + ', ' : '') + (this.bankDetails.selected_seller.user.tax_city ? this.bankDetails.selected_seller.user.tax_city + ', ' : '')
        + (this.bankDetails.selected_seller.user.tax_state ? this.bankDetails.selected_seller.user.tax_state + ', ' : '') + (this.bankDetails.selected_seller.user.tax_country ? this.bankDetails.selected_seller.user.tax_country + ', ' : '') : this.collection_data.seller_type == 3 ? this.bankDetails.selected_seller.user.address : '';

      if (this.bankDetails.selected_seller.user.developer_company || this.bankDetails.selected_seller.user.is_developer == 0 && !this.bankDetails.selected_seller.user.legal_entity_id) {
        this.fedTaxPayer = (((this.bankDetails || {}).selected_seller || {}).user || {}).fed_tax_pay || '';
        ((((this.bankDetails || {}).selected_seller || {}).user || {}).legal_rep_banks || []).forEach((element, innerIndex) => {
          if (element.id == this.collection_data.bank_id) {
            element.name = 'Seller Bank | ' + element.bank_name;
            element.legal_name = this.bankDetails.selected_seller.user.developer_company ? this.bankDetails.selected_seller.user.developer_company :
              this.bankDetails.selected_seller.user.is_developer == 0 && !this.bankDetails.selected_seller.user.legal_entity_id ? this.bankDetails.selected_seller.user.name + ' ' + this.bankDetails.selected_seller.user.first_surname
                + ' ' + this.bankDetails.selected_seller.user.second_surname : '';
            this.paymentBankDetailsArray.push(element);
          }
        });
      }
      else {
        this.legal_name = this.bankDetails.selected_seller.user.legal_entity.legal_name;
        this.footer_address = (this.bankDetails.selected_seller.user.legal_entity.tax_street_address && this.bankDetails.selected_seller.user.legal_entity.tax_street_address != '0' ? this.bankDetails.selected_seller.user.legal_entity.tax_street_address + ' ' : '') +
          (this.bankDetails.selected_seller.user.legal_entity.tax_external_number ? this.bankDetails.selected_seller.user.legal_entity.tax_external_number + '\n' : '')
          + (this.bankDetails.selected_seller.user.legal_entity.tax_internal_number ? this.bankDetails.selected_seller.user.legal_entity.tax_internal_number + ', ' : '') + (this.bankDetails.selected_seller.user.legal_entity.tax_neighborhood ? this.bankDetails.selected_seller.user.legal_entity.tax_neighborhood + '\n' : '')
          + (this.bankDetails.selected_seller.user.legal_entity.tax_zipcode && this.bankDetails.selected_seller.user.legal_entity.tax_zipcode != '0' ? this.bankDetails.selected_seller.user.legal_entity.tax_zipcode + ', ' : '') + (this.bankDetails.selected_seller.user.legal_entity.tax_city ? this.bankDetails.selected_seller.user.legal_entity.tax_city + ', ' : '')
          + (this.bankDetails.selected_seller.user.legal_entity.tax_state ? this.bankDetails.selected_seller.user.legal_entity.tax_state + ', ' : '') + (this.bankDetails.selected_seller.user.legal_entity.tax_country ? this.bankDetails.selected_seller.user.legal_entity.tax_country + ', ' : '');
        (((((this.bankDetails || {}).selected_seller || {}).user || {}).legal_entity || {}).legal_entity_banks || []).forEach((element, innerIndex) => {
          this.fedTaxPayer = ((((this.bankDetails || {}).selected_seller || {}).user || {}).legal_entity || {}).fed_tax_pay || '';
          if (element.id == this.collection_data.bank_id) {
            element.name = 'Seller Bank | ' + element.bank_name;
            element.legal_name = this.bankDetails.selected_seller.user.legal_entity.legal_name;
            this.paymentBankDetailsArray.push(element);
          }
        });
      }
    }
    this.generatePDF();
  }

  getBase64ImageFromUrl(id) {
    this.admin.postDataApi('getPdfImage', { id: id }).subscribe((success) => {
      this.base64 = (success || {}).data;
      this.projectLogoImageBase64 = 'data:image/jpeg;base64,' + this.base64;
    }, (error) => {
    });
  }

  generatePDF() {
    let current_date = new Date();
    let date = this.datePipe.transform(current_date, 'd/M/y');
    let remaining_amount = this.collection_data.total - this.collection_data.total_amount_paid;
    let purchase_date = this.datePipe.transform(this.collection_data.deal_purchase_date, 'MMM d, y');
    if (this.translate.defaultLang != 'en') {
      purchase_date = purchase_date.includes('Jan') ? purchase_date.replace('Jan', 'ene') : purchase_date.includes('Feb') ? purchase_date.replace('Feb', 'feb') :
        purchase_date.includes('Mar') ? purchase_date.replace('Mar', 'mar') : purchase_date.includes('Apr') ? purchase_date.replace('Apr', 'abr') :
          purchase_date.includes('May') ? purchase_date.replace('May', 'may') : purchase_date.includes('Jun') ? purchase_date.replace('Jun', 'jun') :
            purchase_date.includes('Jul') ? purchase_date.replace('Jul', 'jul') : purchase_date.includes('Aug') ? purchase_date.replace('Aug', 'ago') :
              purchase_date.includes('Sep') ? purchase_date.replace('Sep', 'sep') : purchase_date.includes('Oct') ? purchase_date.replace('Oct', 'oct') :
                purchase_date.includes('Nov') ? purchase_date.replace('Nov', 'nov') : purchase_date.includes('Dec') ? purchase_date.replace('Dec', 'dic') : ' ';

      this.bill_month_date = this.bill_month_date.includes('Jan') ? this.bill_month_date.replace('Jan', 'ene') : this.bill_month_date.includes('Feb') ? this.bill_month_date.replace('Feb', 'feb') :
        this.bill_month_date.includes('Mar') ? this.bill_month_date.replace('Mar', 'mar') : this.bill_month_date.includes('Apr') ? this.bill_month_date.replace('Apr', 'abr') :
          this.bill_month_date.includes('May') ? this.bill_month_date.replace('May', 'may') : this.bill_month_date.includes('Jun') ? this.bill_month_date.replace('Jun', 'jun') :
            this.bill_month_date.includes('Jul') ? this.bill_month_date.replace('Jul', 'jul') : this.bill_month_date.includes('Aug') ? this.bill_month_date.replace('Aug', 'ago') :
              this.bill_month_date.includes('Sep') ? this.bill_month_date.replace('Sep', 'sep') : this.bill_month_date.includes('Oct') ? this.bill_month_date.replace('Oct', 'oct') :
                this.bill_month_date.includes('Nov') ? this.bill_month_date.replace('Nov', 'nov') : this.bill_month_date.includes('Dec') ? this.bill_month_date.replace('Dec', 'dic') : ' ';
    }
    let address = this.collection_data.buyer ? (this.collection_data.buyer.street_address && this.collection_data.buyer.street_address != '0' ? this.collection_data.buyer.street_address + ' ' : '') + (this.collection_data.buyer.external_number ? this.collection_data.buyer.external_number + '\n' : '')
      + (this.collection_data.buyer.internal_number ? this.collection_data.buyer.internal_number + ', ' : '') + (this.collection_data.buyer.neighborhood ? this.collection_data.buyer.neighborhood + '\n' : '')
      + (this.collection_data.buyer.zipcode && this.collection_data.buyer.zipcode != '0' ? this.collection_data.buyer.zipcode + ', ' : '') + (this.collection_data.buyer.city ? this.collection_data.buyer.city + ', ' : '')
      + (this.collection_data.buyer.state ? this.collection_data.buyer.state + ', ' : '') + (this.collection_data.buyer.country ? this.collection_data.buyer.country + ', ' : '') : undefined;

    let cash_limit_amount = this.collection_payments.find(x => x.payment_mode_id == 1);
    let index = this.collection_data.property.property_offer_payment.findIndex(x => x.random_id == this.collection_data.property.offer_id);
    let bank_index = this.paymentBankDetailsArray.findIndex(x => x.id == this.collection_data.bank_id);
    let docDefinition = {
      pageSize: 'LEGAL',
      pageMargins: [40, 70, 40, 180],
      content: [
        {
          columns: [
            [
              {
                text: this.translate.instant('generatePDF.clientDetails'),
                bold: true,
                fontSize: 20,
                margin: [0, 0, 0, 20]
              },
              {
                style: 'address_table',
                table: {
                  headerRows: 1,
                  widths: ['auto', 'auto'],
                  body: [
                    [
                      { text: this.translate.instant('generatePDF.name'), border: [false, false, false, false], color: '#858291' },
                      { text: this.collection_data.buyer && this.collection_data.buyer.name ? this.collection_data.buyer.name + ' ' + this.collection_data.buyer.first_surname + ' ' + this.collection_data.buyer.second_surname : 'N/A', border: [false, false, false, false], bold: true }
                    ],
                    [
                      { text: this.translate.instant('generatePDF.purchaseDate'), border: [false, false, false, false], color: '#858291' },
                      { text: purchase_date || 'N/A', border: [false, false, false, false], bold: true }
                    ],
                    [
                      { text: this.translate.instant('generatePDF.email'), border: [false, false, false, false], color: '#858291' },
                      { text: this.collection_data.buyer ? this.collection_data.buyer.email : 'N/A', border: [false, false, false, false], bold: true }
                    ],
                    [
                      { text: this.translate.instant('generatePDF.contactNumber'), border: [false, false, false, false], color: '#858291' },
                      { text: this.collection_data.buyer && this.collection_data.buyer.phone ? this.collection_data.buyer.dial_code + ' ' + this.collection_data.buyer.phone : 'N/A', border: [false, false, false, false], bold: true }
                    ],
                    [
                      { text: this.translate.instant('generatePDF.addressLable'), border: [false, false, false, false], color: '#858291' },
                      {
                        text: address ? address : 'N/A', border: [false, false, false, false], bold: true
                      }
                    ]
                  ]
                }
              },
            ],
            [
              {
                text: this.translate.instant('generatePDF.paymentInformation'),
                bold: true,
                fontSize: 20,
                margin: [0, 0, 5, 20]
              },
              {
                style: 'table2',
                table: {
                  headerRows: 1,
                  widths: ['auto', 'auto'],
                  body: [
                    [
                      { text: this.translate.instant('generatePDF.totalPaymentCurrentMonth'), border: [false, false, false, false], color: '#858291' },
                      { text: this.price.transform(Number(this.current_month_amount).toFixed(2)), border: [false, false, false, false], bold: true }
                    ],
                    [
                      { text: this.translate.instant('generatePDF.payDayLimit'), border: [false, false, false, false], color: '#858291' },
                      { text: this.bill_month_date || 'N/A', border: [false, false, false, false], bold: true }
                    ],
                    [
                      { text: this.translate.instant('generatePDF.billMonth'), border: [false, false, false, false], color: '#858291' },
                      { text: this.bill_month || 'N/A', border: [false, false, false, false], bold: true }
                    ],
                    [
                      { text: this.translate.instant('generatePDF.CollectionId'), border: [false, false, false, false], color: '#858291' },
                      { text: this.collection_data.id || 'N/A', border: [false, false, false, false], bold: true }
                    ]
                  ]
                }
              },
            ]
          ],
          margin: [0, 35, 0, 5]
        },
        {
          columns: [
            [
              this.base64 ?
                {
                  image: this.projectLogoImageBase64,
                  width: 120,
                  height: 20,
                  margin: [0, 0, 0, 10]
                } : {
                  text: ''
                },
              {
                text: this.translate.instant('generatePDF.propertyDetails'),
                bold: true,
                fontSize: 20,
                margin: [0, 0, 5, 10]
              },
              {
                style: 'table',
                table: {
                  headerRows: 1,
                  widths: ['auto', '150'],

                  body: [
                    [
                      { text: this.translate.instant('generatePDF.project'), bold: true, border: [false, false, false, false], color: '#858291' },
                      { text: this.collection_data.property.building.name, border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.addressLable'), bold: true, border: [false, false, false, false], color: '#858291' },
                      { text: this.collection_data.property.building.address, border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.tower'), bold: true, border: [false, false, false, false], color: '#858291' },
                      { text: this.collection_data.property.building_towers.tower_name, border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.floor'), bold: true, border: [false, false, false, false], color: '#858291' },
                      { text: this.collection_data.property.floor_num == 0 ? 'Ground floor' : this.collection_data.property.floor_num + ' Floor', border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.model'), bold: true, border: [false, false, false, false], color: '#858291' },
                      { text: this.collection_data.property.building_configuration.name, border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.noOfProperty'), bold: true, border: [false, false, false, false], color: '#858291' },
                      { text: this.collection_data.property.name, border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.listPrice'), bold: true, border: [false, false, false, false], color: '#858291' },
                      { text: this.price.transform(Number(this.collection_data.deal_price).toFixed(2)), border: [false, false, false, false], bold: true },
                    ]
                  ]
                }
              },
              {
                text: this.translate.instant('generatePDF.generalBalance'),
                bold: true,
                fontSize: 20,
                margin: [0, 20, 0, 15]
              },
              {
                style: 'table2',
                table: {
                  headerRows: 1,
                  widths: ['auto', 'auto'],
                  body: [
                    [
                      { text: this.translate.instant('generatePDF.balancePayable'), border: [false, false, false, false], bold: true, fontSize: 16, margin: [0, 0, 0, 15] },
                      { text: remaining_amount >= 0 ? this.price.transform(Number(remaining_amount).toFixed(2)) : 'N/A', border: [false, false, false, false], bold: true, fontSize: 16, margin: [0, 0, 0, 15] }
                    ],
                    [
                      { text: this.translate.instant('generatePDF.totalPaid'), border: [false, false, false, false], color: '#858291' },
                      { text: this.collection_data.total_amount_paid ? this.price.transform(Number(this.collection_data.total_amount_paid).toFixed(2)) : 'N/A', border: [false, false, false, false], bold: true }
                    ],
                  ]
                }
              },
              cash_limit_amount.total_amount >= this.cashLimit ?
                {
                  text: this.translate.instant('generatePDF.warning'), color: '#858291',
                } : {
                  text: ''
                }
            ],
            [
              {
                text: this.translate.instant('generatePDF.dealInformation'),
                bold: true,
                fontSize: 20,
                margin: [0, 30, 5, 10]
              },
              {
                text: [
                  { text: this.translate.instant('generatePDF.purchaseDate'), margin: [20, 0, 30, 0] },
                  { text: '        ' + purchase_date || 'N/A' }
                ],
                bold: true,
                fontSize: 16
              },
              {
                style: 'table2',
                table: {
                  headerRows: 1,
                  widths: ['auto', 'auto', 'auto'],
                  body: [
                    [
                      { text: this.translate.instant('generatePDF.noInstallPayment'), border: [false, false, false, false], color: '#858291' },
                      { text: this.monthly_installment_no, border: [false, false, false, false], bold: true },
                      { text: '', border: [false, false, false, false] }
                    ],
                    [
                      { text: this.translate.instant('generatePDF.monthlyInstallment'), border: [false, false, false, false], color: '#858291' },
                      { text: '', border: [false, false, false, false] },
                      { text: this.monthly_installment >= 0 ? this.price.transform(Number(this.monthly_installment).toFixed(2)) : 'N/A', border: [false, false, false, false], bold: true }
                    ]
                  ]
                }
              },
              {
                style: 'banktable',
                unbreakable: true,
                table: {
                  headerRows: 1,
                  widths: ['auto', 'auto'],
                  body: [
                    [
                      { text: this.translate.instant('generatePDF.bankDetails'), border: [false, false, false, false], bold: true, fontSize: 16 },
                      { text: '', border: [false, false, false, false] }
                    ],
                    [
                      { text: this.translate.instant('generatePDF.bank'), border: [false, false, false, false], color: '#858291' },
                      { text: this.paymentBankDetailsArray.length > 0 && this.paymentBankDetailsArray[bank_index].bank_name ? this.paymentBankDetailsArray[bank_index].bank_name : 'N/A', border: [false, false, false, false], bold: true }
                    ],
                    [
                      { text: this.translate.instant('generatePDF.accountInNameOf'), border: [false, false, false, false], color: '#858291' },
                      {
                        text: this.paymentBankDetailsArray.length > 0 && this.paymentBankDetailsArray[bank_index].legal_name ? this.paymentBankDetailsArray[bank_index].legal_name : 'N/A', border: [false, false, false, false], bold: true
                      },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.federalTaxPayer'), border: [false, false, false, false], color: '#858291' },
                      { text: this.paymentBankDetailsArray.length > 0 && this.paymentBankDetailsArray[bank_index].bank_name && this.fedTaxPayer ? this.fedTaxPayer : 'N/A', border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.accountNumber'), border: [false, false, false, false], color: '#858291' },
                      { text: this.paymentBankDetailsArray.length > 0 && this.paymentBankDetailsArray[bank_index].account_number ? this.paymentBankDetailsArray[bank_index].account_number : 'N/A', border: [false, false, false, false], bold: true }
                    ],
                    [
                      { text: this.translate.instant('generatePDF.cLABE'), border: [false, false, false, false], color: '#858291' },
                      { text: this.paymentBankDetailsArray.length > 0 && this.paymentBankDetailsArray[bank_index].swift ? this.paymentBankDetailsArray[bank_index].swift : 'N/A', border: [false, false, false, false], bold: true }
                    ],
                  ],
                }
              }
            ]
          ],
          margin: [0, 20, 0, 0]
        },
        {
          style: 'statement_table',
          table: {
            headerRows: 1,
            widths: ['14%', '14%', '14%', '14%', '14%', '14%', '14%'],
            body: [
              [
                { text: this.translate.instant('generatePDF.concept'), border: [false, false, false, false], bold: true, color: 'white', fillColor: '#525659' },
                { text: this.translate.instant('generatePDF.date'), border: [false, false, false, false], bold: true, color: 'white', fillColor: '#525659' },
                { text: this.translate.instant('generatePDF.paid'), border: [false, false, false, false], bold: true, color: 'white', fillColor: '#525659' },
                { text: this.translate.instant('generatePDF.pendingPayment'), border: [false, false, false, false], bold: true, color: 'white', fillColor: '#525659' },
                { text: this.translate.instant('generatePDF.amountPayable'), border: [false, false, false, false], bold: true, color: 'white', fillColor: '#525659' },
                { text: this.translate.instant('generatePDF.penalty'), border: [false, false, false, false], bold: true, color: 'white', fillColor: '#525659' },
                { text: this.translate.instant('generatePDF.description'), border: [false, false, false, false], bold: true, color: 'white', fillColor: '#525659' }
              ],
            ],
          }
        },
        {
          columns: [
            {
              text: '',
            },
            {
              text: '',
            }
          ]
        }
      ],
      header: {
        columns: [
          {
            image: this.logoImageBase64,
            width: 100,
            margin: [20, 20, 20, 20],
          },
          {
            text: this.translate.instant('generatePDF.address'),
            margin: [80, 20, 20, 20],
            color: '#858291'
          },
          {

            text: this.translate.instant('generatePDF.addressName') + '\n' + date,
            alignment: 'right',
            color: '#858291',
            margin: [20, 20, 20, 20],
          },
        ]
      },
      footer: {
        columns: [
          [
            {
              text: this.translate.instant('generatePDF.notReflected') + '\n' + this.translate.instant('generatePDF.notReflected1'),
              color: '#858291',
              margin: [30, 20, 0, 10]
            },
            {
              text: [
                { text: this.legal_name ? this.legal_name : '', bold: true },
                {
                  text: (this.legal_name && this.fedTaxPayer ? '\n' + this.fedTaxPayer : '') +
                    (this.footer_address ? '\n' + this.footer_address : '')
                  , color: '#858291'
                },
              ],
              margin: [30, 10, 0, 0]
            }
          ],
          [
            {
              text: '',
              margin: [0, 60, 0, 0]
            },
            {
              text: [
                { text: this.translate.instant('generatePDF.contactUS') + '\n' + this.translate.instant('generatePDF.contactUS2'), color: '#858291' },
                { text: ' ' + this.translate.instant('generatePDF.contactUS3'), bold: true },
                { text: '\n' + this.translate.instant('generatePDF.contactUS4'), color: '#858291' },
              ],
              margin: [20, 20, 0, 0]
            }
          ]
        ]
      },
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15]
        },
        table: {
          margin: [0, 5, 0, 15],
          border: [false, false, false, false]

        },
        table2: {
          margin: [0, 5, 0, 15],
          border: [false, false, false, false]
        },
        banktable: {
          margin: [0, 20, 0, 40],
          border: [false, false, false, false]
        },
        address_table: {
          margin: address ? [0, 15, 0, 15] : [0, 5, 0, 40],
          border: [false, false, false, false]
        },
        statement_table: {
          margin: [0, 35, 0, 15],
          border: [false, false, false, false]
        }
      },
    };
    this.table_data.forEach(element => {
      docDefinition.content[2].table.body.push(element);
    });
    if (this.layaway_payments.length > 0) {
      this.layaway_payments.forEach(element => {
        docDefinition.content[1].columns[1][2].table.body.push(element);
      });
    } else {
      docDefinition.content[1].columns[1][2].table.body.push([
        { text: this.translate.instant('generatePDF.layaway'), border: [false, false, false, false], color: '#858291' },
        { text: '', border: [false, false, false, false] },
        { text: 'N/A', border: [false, false, false, false], bold: true },
      ]);
    }
    if (this.down_payments.length > 0) {
      this.down_payments.forEach(element => {
        docDefinition.content[1].columns[1][2].table.body.push(element);
      });
    } else {
      docDefinition.content[1].columns[1][2].table.body.push([
        { text: this.translate.instant('generatePDF.downpayment'), border: [false, false, false, false], color: '#858291' },
        { text: '', border: [false, false, false, false] },
        { text: 'N/A', border: [false, false, false, false], bold: true },
      ]);
    }
    if (this.monthly_installment_amunt.length > 0) {
      docDefinition.content[1].columns[1][2].table.body.push(this.monthly_installment_amunt);
    } else {
      docDefinition.content[1].columns[1][2].table.body.push([
        { text: this.translate.instant('generatePDF.monthlyInstallmentAmt'), border: [false, false, false, false], color: '#858291' },
        { text: '', border: [false, false, false, false] },
        { text: 'N/A', border: [false, false, false, false], bold: true },
      ]);
    }
    if (this.payments_upon_delivery.length > 0) {
      this.payments_upon_delivery.forEach(element => {
        docDefinition.content[1].columns[1][2].table.body.push(element);
      });
    } else {
      docDefinition.content[1].columns[1][2].table.body.push([
        { text: this.translate.instant('generatePDF.PaymentUponDelivery'), border: [false, false, false, false], color: '#858291' },
        { text: '', border: [false, false, false, false] },
        { text: 'N/A', border: [false, false, false, false], bold: true },
      ]);
    }
    if (this.special_payments.length > 0) {
      this.special_payments.forEach(element => {
        docDefinition.content[1].columns[1][2].table.body.push(element);
      });
    } else {
      docDefinition.content[1].columns[1][2].table.body.push([
        { text: this.translate.instant('generatePDF.specialPayment'), border: [false, false, false, false], color: '#858291' },
        { text: '', border: [false, false, false, false] },
        { text: 'N/A', border: [false, false, false, false], bold: true },
      ]);
    }

    if (this.collection_data.property.property_offer_payment && this.collection_data.property.property_offer_payment.length > 0 &&
      this.collection_data.property.property_offer_payment[index].property_parking_lot_sale && this.collection_data.property.property_offer_payment[index].property_parking_lot_sale.length > 0) {
      let no = 6;
      let count = 1;
      this.collection_data.property.property_offer_payment[index].property_parking_lot_sale.forEach(element => {
        let parkingName = this.parkingSpaceLotsArray.find(parking => parking.id == element.parking_type);
        if (parkingName) {
          docDefinition.content[1].columns[0][2].table.body.splice(no, 0, [
            { text: this.translate.instant('generatePDF.parkingForSale') + ' ' + (this.translate.defaultLang == 'en' ? parkingName.name_en : parkingName.name_es) + ':', bold: true, border: [false, false, false, false], color: '#858291' },
            { text: element.parking_lots, border: [false, false, false, false], bold: true }
          ]);
          docDefinition.content[1].columns[0][2].table.body.splice(no + 1, 0, [
            { text: this.translate.instant('generatePDF.parkingPrice') + ' ' + (this.translate.defaultLang == 'en' ? parkingName.name_en : parkingName.name_es) + ':', bold: true, border: [false, false, false, false], color: '#858291' },
            { text: this.price.transform(Number(element.price).toFixed(2)), border: [false, false, false, false], bold: true }
          ]);
          no = no + 2;
          count = count + 1;
        }
      });
    }
    // this.collection_payments.forEach(element => {
    //   docDefinition.content[1].columns[0][4].table.body.push([
    //     { text: element.name_en + ':', border: [false, false, false, false], color: '#858291' },
    //     { text: element.total_amount? this.price.transform(Number(element.total_amount).toFixed(2)) : 'N/A', border: [false, false, false, false], bold: true }
    //   ])
    // });
    pdfMake.createPdf(docDefinition).download(this.translate.instant('generatePDF.accountStatments') + ' ' + current_date.toISOString() + '.pdf');
    // }else if(action === 'print'){
    //   pdfMake.createPdf(docDefinition).print();
    // }else{
    //   pdfMake.createPdf(docDefinition).open();
    // }
  }

  get buyerDocumentationFoldersDetailsLength(): number {
    let count = 0;
    this.buyerDocumentationFoldersDetails.forEach((item) => {
      if (item.document_link) {
        count = count + 1;
      }
    });
    return count;
  }

  get sellerDocumentationFoldersDetailsLength(): number {
    let count = 0;
    this.sellerDocumentationFoldersDetails.forEach((item) => {
      if (item.document_link) {
        count = count + 1;
      }
    });
    return count;
  }

  get propertyDocumentationFoldersDetailsLength(): number {
    let count = 0;
    this.propertyDocumentationFoldersDetails.forEach((item) => {
      if (item.document_link) {
        count = count + 1;
      }
    });
    return count;
  }

  navigateToProperty = (collectionDetails: any): void => {
    this.router.navigate(['/dashboard/properties/view-properties/property', ((collectionDetails || {}).property || {}).id || '']);
  }

  getOfferPdf() {
    this.offerPdf.offerID(this.property_offer_id);
  }

  ngOnDestroy(): void {
    localStorage.setItem('parametersForCollection', JSON.stringify(this.parameter));
  }

}
