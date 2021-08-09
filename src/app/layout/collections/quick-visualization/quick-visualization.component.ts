import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { IProperty } from 'src/app/common/property';
import { ActivatedRoute } from '@angular/router';
import { Collection } from 'src/app/models/collection.model';
import { AdminService } from 'src/app/services/admin.service';
import { CommonService } from 'src/app/services/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import { CurrencyPipe } from '@angular/common';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { ApiConstants } from 'src/app/common/api-constants';
import { Constant } from 'src/app/common/constants';
import { forkJoin } from 'rxjs';
declare let swal: any;

@Component({
  selector: 'app-quick-visualization',
  templateUrl: './quick-visualization.component.html',
  styleUrls: ['./quick-visualization.component.css'],
  providers: [Collection, CurrencyPipe]
})
export class QuickVisualizationComponent implements OnInit {

  @ViewChild('viewDesModal') viewDesModal: ElementRef;
  @ViewChild('viewDesModalClose') viewDesModalClose: ElementRef;
  @ViewChild('viewBankDetailsModal') viewBankDetailsModal: ElementRef;
  @ViewChild('closeBankDetailsModal') closeBankDetailsModal: ElementRef;
  @ViewChild('updatePaymentModalOpen') updatePaymentModalOpen: ElementRef;
  @ViewChild('updatePaymentModalClose') updatePaymentModalClose: ElementRef;
  @ViewChild('paymentModalOpen') paymentModalOpen: ElementRef;
  @ViewChild('paymentModalClose') paymentModalClose: ElementRef;
  @ViewChild('surplusMoneyModalOpen') surplusMoneyModalOpen: ElementRef;
  @ViewChild('surplusMoneyModalClose') surplusMoneyModalClose: ElementRef;
  @ViewChild('applyPaymentChoiceId') applyPaymentChoiceId: ElementRef;
  @ViewChild('applyPaymentMethodId') applyPaymentMethodId: ElementRef;
  @ViewChild('docsFile1') docsFile1: ElementRef;
  purchase_payments: any[];
  collection_payments: any[];
  agent_payments: any[];
  description: string;
  title: any;
  paymentConcepts: Array<any>;
  allPaymentConcepts: Array<any>;
  collectionCommission: Array<any>;
  totalPaid: number;
  remainingAmt: number;
  totalOutstanding: number;
  public parameter: IProperty = {};
  newPaymentConcepts: Array<any>;
  payment_type: any;
  payment_id: any;
  docFile: string;
  payment_method_id: number;
  today1: Date;
  payment_date: any = new Date();
  locale: any;
  mainIndex: number;
  index: number;
  item: any;
  paymentMethods: Array<any>;
  surplus_payment_type: string;
  cashSum: any;
  payment_choice_id: any;
  surplus_payment_choice_id: any;
  selectedPaymentConcept: any;
  property_collection_id: string;
  collectionIndex: number;
  disablePayToRemaining = true;
  isApplyBtnClicked = false;
  pendingPayment: any;
  paymentAmount: any;
  paymentDate: Date;
  calculatedPayAmount: any;
  penaltyAmount: any;
  currentAmount: any;
  surplus_amt: any;
  sellerBanks: Array<any>;
  buyerBanks: Array<any>;
  sellerRepBanks: Array<any>;
  buyerRepBanks: Array<any>;
  paymentBanks: Array<any>;
  payment_bank: any;
  paymentBank: any;
  data2: any;
  cashLimit: any;agent_minus:any;
  collection_minus:any;
  pay_minus:any;commission_type: any;
  purchase_payment_sum: any;
  agent_payment_sum: any;
  sumData:any; payment_sum: any;
  @ViewChild('stickyMenu') menuElement: ElementRef;
  language_code: string;
  public parkingLotIncludedDetails: any;
  public parkingLotSaleDetails: any;
  private parkingSpaceLotsArray: any[] = [];
  private parkingSpaceRentArray: any[] = [];
  constructor(
    private route: ActivatedRoute,
    public constant: Constant,
    public model: Collection,
    public apiConstants: ApiConstants,
    public admin: AdminService,
    private spinner: NgxSpinnerService,
    private currencyPipe: CurrencyPipe,
    private translate: TranslateService,
    private toastr: ToastrService,
    private cs: CommonService
  ) { }

  ngOnInit(): void {
    this.language_code = localStorage.getItem('language_code');
    this.admin.globalSettings$.subscribe(success => {
      this.cashLimit = success['cash_limit'];
    });
    this.today1 = new Date();
    this.setDatePickerLocale();
    this.getPaymentMethods();
    this.parameter.sub = this.route.params.subscribe(params => {
      this.property_collection_id = params['id'];
      this.getCollectionDetails();
      this.getSum();
    });

    this.translate.onDefaultLangChange.subscribe((event: LangChangeEvent) => {
      this.setDatePickerLocale();
    });
  }

  setDatePickerLocale() {
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
  getSum(){
    this.admin.postDataApi('getComissionFinalAmount', { id: this.property_collection_id })
      .subscribe(
        success => {
          this.sumData = success['data'];
          this.purchase_payment_sum = this.sumData.purchase_amount;
          this.agent_payment_sum = this.sumData.agent_amount;
          this.payment_sum = this.sumData.commission_amount;
      })
  }
  getCollectionDetails() {
    this.spinner.show(); let self = this;
    this.admin.postDataApi('getCollectionById', { id: this.property_collection_id })
      .subscribe(
        success => {
          this.spinner.hide();
          this.model = success['data'];
          this.getParkingSpaceLots(((success.data || {}).property || {}).building_id);
          this.data2 = success['data2'];
          if (this.model.seller_type === 1) {
            // this.sellerBanks = this.model.collection_seller_banks;
            // this.sellerRepBanks = this.model.collection_seller_rep_banks;
            this.sellerBanks = this.model.seller.legal_rep_banks;
            this.sellerRepBanks = this.model.seller.legal_representative && this.model.seller.legal_representative.legal_rep_banks ?
              this.model.seller.legal_representative.legal_rep_banks : null;
          } else if (this.model.seller_type === 2) {
            this.sellerBanks = this.model.seller_legal_entity.legal_entity_banks;
            this.sellerRepBanks = this.model.seller_legal_entity.legal_reps && this.model.seller_legal_entity.legal_reps.legal_rep_banks ?
              this.model.seller_legal_entity.legal_reps.legal_rep_banks : null;
          } else {
            this.sellerBanks = this.model.seller.legal_rep_banks;
            this.sellerRepBanks = this.model.seller.legal_representative && this.model.seller.legal_representative.legal_rep_banks ?
              this.model.seller.legal_representative.legal_rep_banks : null;
          }
          if (this.model.buyer_type === 1) {
            // this.buyerBanks = this.model.collection_buyer_banks;
            // this.buyerRepBanks = this.model.collection_buyer_rep_banks;
            this.buyerBanks = this.model.buyer.legal_rep_banks;
            this.buyerRepBanks = this.model.buyer.legal_representative && this.model.buyer.legal_representative.legal_rep_banks ?
              this.model.buyer.legal_representative.legal_rep_banks : null;
          } else if (this.model.buyer_type === 2) {
            this.buyerBanks = this.model.buyer_legal_entity.legal_entity_banks;
            this.buyerRepBanks = this.model.buyer_legal_entity.legal_reps && this.model.buyer_legal_entity.legal_reps.legal_rep_banks ?
              this.model.buyer_legal_entity.legal_reps.legal_rep_banks : null;
          } else {
            this.buyerBanks = this.model.buyer.legal_rep_banks;
            this.buyerRepBanks = this.model.buyer.legal_representative && this.model.buyer.legal_representative.legal_rep_banks ?
              this.model.buyer.legal_representative.legal_rep_banks : null;
          }

          this.allPaymentConcepts = success['data']['payment_choices'];
          // for dropdown
          this.paymentConcepts = [...this.allPaymentConcepts];

          this.collectionCommission = success['data']['collection_commissions'];
          self.collectionCommission.forEach((r) => {
            // if(self.commission_type == 1){
              for (let i = 0; i < (r.purchase_payment || []).length; i++) {
                let sum: number = r.purchase_payment.map(a => a.amount).reduce(function(a, b)
                {
                  return a + b;
                });
                r.pay_minus = sum;
                console.log(sum,"purchase_sum");
            }
            // }else if(self.commission_type == 2){
              for (let i = 0; i < (r.agent_payment || []).length; i++) {
                  let sum1: number = r.agent_payment.map(a => a.amount).reduce(function(a, b)
                  {
                    return a + b;
                  });
                  r.agent_minus = sum1;
              }
            // }else {
              for (let i = 0; i < (r.payment || []).length; i++) {
                let sum2: number = r.payment.map(a => a.amount).reduce(function(a, b)
                {
                  return a + b;
                });
                r.collection_minus = sum2
                console.log(this.collection_minus,"payment_sum");
            }
          //  }
           
        });
          this.totalPaid = 0.00;
          this.totalOutstanding = 0.00;
          this.remainingAmt = (((this.model.property.final_price || 0) + (this.model.penalty || 0)) - (this.model.total_payment_recieved || 0));
          const reducingP = [];
          for (let index = 0; index < this.allPaymentConcepts.length; index++) {
            const m = this.allPaymentConcepts[index];
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
                  if (this.model.seller_type != 2) {  // seller as person or developer
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
                    payment_type: 3,
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
                    payment_type: 5,
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

            // calculating total paid and total outstanding payment
            this.totalPaid = this.totalPaid + m.paid_amount;
            m['outstanding_amount'] = m.amount - (m.calc_payment_amount || 0);
            if ((m.amount - (m.calc_payment_amount || 0)) >= 0) {
              const a = (m.calc_payment_amount || 0);
              m['is_pending'] = a ? 1 : 0;
              this.totalOutstanding = this.totalOutstanding + m['outstanding_amount'];
            }
          }
          // now insert at reducing remaining payments at type=2 index
          // sorting reducingP according to date => in case user is paying using type 3 consecutively many times
          reducingP.sort(this.sortFunction);

          for (let i = 0; i < reducingP.length; i++) {
            const element = reducingP[i];
            // for payment_type 3,5 check display_choice_id
            // loop is for if need to insert 2 type 2 payments on same index
            for (let j = 0; j < this.allPaymentConcepts.length; j++) {
              const e = this.allPaymentConcepts[j];
              if (e.id == element.display_choice_id) {
                this.allPaymentConcepts.splice(j, 0, element);
                this.collectionCommission.splice(j, 0, {})
                break;
              }
            }
          }

          // calculating new paid amt, by skipping type 2
          for (let index = 0; index < this.allPaymentConcepts.length; index++) {
            const element = this.allPaymentConcepts[index];
            const p_amt: any = 0;
            if (element.collection_paymentss && element.collection_paymentss.length > 0) {
              for (let i = 0; i < element.collection_paymentss.length; i++) {
                const ele = element.collection_paymentss[i];
                // if payment_type 2 then reduce the amount from all MI (only)
                if (ele.payment_type == 2) {
                  const v = ele.amt_share || 0;
                  const ids = ele.choices_ids.split(',');

                  // deleting the share of type 2 from main header
                  for (let j = 0; j < this.allPaymentConcepts.length; j++) {
                    const e = this.allPaymentConcepts[j];
                    if (e.id) {
                      const d = e.id.toString();
                      const h = ids.indexOf(d);
                      if (h >= 0) {
                        const obj = {
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
                        this.allPaymentConcepts[j].paid_amount = parseFloat(this.allPaymentConcepts[j].paid_amount) - parseFloat(v);
                      }
                    }
                  }
                }
              }
            }

            element.new_paid_amt = p_amt;
          }

          this.allPaymentConcepts.push({
            key: 'total',
            name: 'Total',
            // paid_amount: this.totalPaid,
            paid_amount: this.model.total_payment_recieved,
            is_paid_calculated: 1,
            outstanding_amount: this.totalOutstanding,
            purchase_comm_amount:self.purchase_payment_sum,
            amount:self.payment_sum,
            agent_comm_amount:self.agent_payment_sum,
          });

          this.collectionCommission.push({});
        }, error => {
          this.spinner.hide();
        }
      );
  }

  getInfo(item: any) {
    this.purchase_payments = [];
    this.collectionCommission.forEach((r) => {
      if (item == (r.payment_choice || {}).id) {
        for (let i = 0; i < (r.purchase_payment || []).length; i++) {
          const paymnts = r.purchase_payment[i];
          this.purchase_payments.push(paymnts);
        }
      }
    });
  }
  getCollectionInfo(item: any) {
    this.collection_payments = [];
    this.collectionCommission.forEach((r) => {
      if (item == (r.payment_choice || {}).id) {
        for (let i = 0; i < (r.payment || []).length; i++) {
          const paymntss = r.payment[i];
          this.collection_payments.push(paymntss);
        }
      }
    });
  }
  getAgentInfo(item: any) {
    this.agent_payments = [];
    this.collectionCommission.forEach((r) => {
      if (item == (r.payment_choice || {}).id) {
        for (let i = 0; i < (r.agent_payment || []).length; i++) {
          const paymntsss = r.agent_payment[i];
          this.agent_payments.push(paymntsss);
        }
      }
    });
  }

  exportData() {
    if (this.allPaymentConcepts) {
      const finalData = [];
      for (let index = 0; index < this.allPaymentConcepts.length; index++) {
        const p = this.allPaymentConcepts[index];

        const pcAmount = this.collectionCommission[index]['purchase_payment'] ?
          this.currencyPipe.transform(this.collectionCommission[index]['purchase_payment']['amount']) : '';

        const pcDate = this.collectionCommission[index]['purchase_payment'] ?
          this.collectionCommission[index]['purchase_payment']['payment_date'] : '';

        const ccAmount = this.collectionCommission[index]['payment'] ?
          this.currencyPipe.transform(this.collectionCommission[index]['payment']['amount']) : '';

        const ccDate = this.collectionCommission[index]['payment'] ? this.collectionCommission[index]['payment']['payment_date'] : '';

        finalData.push({
          'Concept': p.name || '',
          'Month': p.date || '',
          'Payment Date': p.collection_payment ? p.collection_payment.payment_date : '',
          'Paid': p.paid_amount ? this.currencyPipe.transform(p.paid_amount) : '',
          'Outstanding Payment': p.outstanding_amount ? this.currencyPipe.transform(p.outstanding_amount) : '',
          'Payment Method': p.collection_payment && p.collection_payment.payment_method ? p.collection_payment.payment_method.name : '',
          'Sozu Payment Receipt': p.collection_payment ? p.collection_payment.receipt : '',
          'Payment Description': p.collection_payment ? p.collection_payment.description : '',
          'Penalty FLP': p.penalty ? this.currencyPipe.transform(p.penalty.amount) : '',
          'Penalty Description': p.penalty ? p.penalty.description : '',
          'Purchased Commission': pcAmount,
          'Date Of PC': pcDate,
          'Sozu PC Receipt': this.collectionCommission[index] && this.collectionCommission[index].purchase_payment
            ? this.collectionCommission[index].purchase_payment.receipt : '',
          'PC Description': this.collectionCommission[index] && this.collectionCommission[index].purchase_payment
            ? this.collectionCommission[index].purchase_payment.description : '',
          'Collection Commission': ccAmount,
          'Date Of CC': ccDate,
          'Sozu CC Receipt': this.collectionCommission[index] && this.collectionCommission[index].payment
            ? this.collectionCommission[index].payment.receipt : '',
          'CC Description': this.collectionCommission[index] && this.collectionCommission[index].payment
            ? this.collectionCommission[index].payment.description : '',
        });
      }
      this.exportAsExcelFile(finalData, 'collection-');
    }
  }


  // will be used in case of excel
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data']
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    const today = new Date();
    const date =
      today.getDate() +
      '-' +
      today.getMonth() +
      '-' +
      today.getFullYear() +
      '_' +
      today.getHours() +
      '_' +
      today.getMinutes() +
      '_' +
      today.getSeconds();
    fileName = fileName + date;
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

  showDescription(description: string, title: any) {
    console.log('aaaa')
    if (description) {
      this.title = title;
      this.description = description;
      this.viewDesModal.nativeElement.click();
    }
  }

  closeDescModal() {
    this.viewDesModalClose.nativeElement.click();
  }

  showBank(payment_bank: any) {
    this.paymentBank = payment_bank;
    this.viewBankDetailsModal.nativeElement.click();
  }

  closeBankModal() {
    this.closeBankDetailsModal.nativeElement.click();
  }

  getDateWRTTimezone(date: any, format: any) {
    const offset = new Date(date).getTimezoneOffset();
    if (offset < 0) {
      return moment(date).subtract(offset, 'minutes').format(format);
    } else {
      return moment(date).add(offset, 'minutes').format(format);
    }
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

  onSelectFile(files) {
    this.parameter.loading = true;
    this.cs.saveAttachment(files[0]).subscribe(
      success => {
        this.parameter.loading = false;
        this.docFile = success['data'].name;
      }, error => {
        this.parameter.loading = false;
      }
    );
  }

  onSelect(e) {
    this.payment_date = moment.utc(e).toDate();
  }

  showUpdatePaymentPopup(item: any, i: number, s: number) {
    this.item = item;
    this.mainIndex = i;
    this.index = s;
    this.payment_id = item.id;
    this.payment_type = item.payment_type;
    this.payment_method_id = item.payment_method.id;
    this.description = item.description;
    this.docFile = item.receipt;
    this.payment_date = item.payment_date ? this.getDateWRTTimezone(item.payment_date, 'DD/MMM/YYYY') : '';
    this.updatePaymentModalOpen.nativeElement.click();
  }

  closeUpdatePaymentModal() {
    this.updatePaymentModalClose.nativeElement.click();
  }

  updateCollectionPayment() {
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

    this.item.payment_method_id = this.payment_method_id;
    this.item.payment_id = this.payment_id;
    this.item.receipt = this.docFile;
    this.item.description = this.description;
    this.item.payment_date = this.payment_date;

    this.admin.postDataApi('updateCollectionPayment', this.item).subscribe(r => {
      this.closeUpdatePaymentModal();
      this.allPaymentConcepts[this.mainIndex].collection_paymentss[this.index] = this.item;
      this.toastr.clear();
      this.toastr.success(this.translate.instant('message.success.savedSuccessfully'), this.translate.instant('swal.success'));
    }, error => {
      this.toastr.error(error.message, this.translate.instant('swal.error'));
      return false;
    });
  }

  showApplyPaymentPopup() {
    this.surplus_payment_type = null;
    this.payment_type = null;
    this.payment_date = null;
    this.payment_choice_id = null;
    const check = this.paymentConcepts.find(r => r.name.includes('Monthly Installment'));
    this.disablePayToRemaining = true;
    if (check) {
      this.disablePayToRemaining = false;
    }
    this.calculateCash();
    // payment banks
    this.paymentBanks = [];
    if (this.model.payment_received_by) {
      // payment directly received by agency
      if (this.model.property.building && this.model.property.building.agency_id) {
        // agency banks
        for (let index = 0; index < this.model.property.building.agency.agency_banks.length; index++) {
          const element = this.model.property.building.agency.agency_banks[index];
          element.name = 'Agency Bank | ' + element.bank_name;
          element.is_agency = 1;
          element.bank_id = element.id;
          element.legal_rep_bank_id = null;
          this.paymentBanks.push(element);
        }

        // agency legal representative banks
        if (this.model.property.building.agency.legal_representative) {
          for (let index = 0; index < this.model.property.building.agency.legal_representative.legal_rep_banks.length; index++) {
            const element = this.model.property.building.agency.legal_representative.legal_rep_banks[index];
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
      if (this.model.seller_type != 2) {
        // seller (as a person or developer) banks
        for (let index = 0; index < this.model.seller.legal_rep_banks.length; index++) {
          const element = this.model.seller.legal_rep_banks[index];
          element.name = 'Seller Bank | ' + element.bank_name;
          element.is_agency = 2;
          element.bank_id = element.id;
          element.legal_rep_bank_id = null;
          this.paymentBanks.push(element);
        }

        // agency legal representative banks
        if (this.model.seller.legal_representative) {
          for (let index = 0; index < this.model.seller.legal_representative.legal_rep_banks.length; index++) {
            const element = this.model.seller.legal_representative.legal_rep_banks[index];
            element.name = 'Seller Legal Rep Bank | ' + element.bank_name;
            element.is_agency = 2;
            element.bank_id = null;
            element.legal_rep_bank_id = element.id;
            this.paymentBanks.push(element);
          }
        }
      } else {
        // seller (as a legal entity) banks
        if (this.model.seller_legal_entity && this.model.seller_legal_entity.legal_entity_banks) {
          for (let index = 0; index < this.model.seller_legal_entity.legal_entity_banks.length; index++) {
            const element = this.model.seller_legal_entity.legal_entity_banks[index];
            element.name = 'Seller Bank | ' + element.bank_name;
            element.is_agency = 2;
            element.bank_id = element.id;
            element.legal_rep_bank_id = null;
            this.paymentBanks.push(element);
          }

          // agency legal representative banks
          if (this.model.seller_legal_entity.legal_reps && this.model.seller_legal_entity.legal_reps.legal_rep_banks) {
            for (let index = 0; index < this.model.seller_legal_entity.legal_reps.legal_rep_banks.length; index++) {
              const element = this.model.seller_legal_entity.legal_reps.legal_rep_banks[index];
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
    this.paymentModalOpen.nativeElement.click();
  }

  calculateCash() {
    this.cashSum = 0;
    for (let index = 0; index < this.paymentConcepts.length; index++) {
      const m = this.paymentConcepts[index];
      if (m.collection_paymentss && m.collection_paymentss.length > 0) {
        for (let i = 0; i < m.collection_paymentss.length; i++) {
          const paymnts = m.collection_paymentss[i];
          console.log(paymnts);
          if (paymnts.payment_method_id == this.apiConstants.payment_method_id) {
            this.cashSum = parseFloat(this.cashSum) + parseFloat(paymnts.amount);
          }
        }
      }
    }
  }
  applyCollectionPayment() {
    let callApi = true;
    // checking if date selected and receipt selected
    if (!this.paymentDate) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseSelectPaymentDate'), this.translate.instant('swal.error'));
      return false;
    }
    if (!this.docFile) {
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
    // if (this.cashSum + this.paymentAmount > this.cashLimit) {
    //   this.toastr.clear();
    //   this.toastr.error(this.translate.instant('message.error.cashLimitReached'), this.translate.instant('swal.error'));
    //   // return false;
    // }
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
      console.log('---');
      let a: any = 0;
      // this.paymentConcepts.map(v => {
      for (let index = 0; index < this.paymentConcepts.length; index++) {
        const v = this.paymentConcepts[index];
        if (!v['is_paid_calculated'] && v.name.includes('Monthly Installment')) {
          // calculating total amt to be paid
          const remaining_amt = parseFloat(v['amount']) - parseFloat(v['calc_payment_amount']);
          a = parseFloat(a) + remaining_amt + (v['penalty'] ? parseFloat(v['penalty']['amount']) : 0);
          console.log(a);
          a = a.toFixed(2);

          // checking if any pending monthly installment exist
          const paymnets = v['collection_paymentss'];
          const l = paymnets.length;
          if (l > 0) {
            const last_payment = paymnets[l - 1];
            if (last_payment['payment_type'] != 2) {
              console.log('complete first');
              this.toastr.clear();
              this.toastr.error(this.translate.instant('message.error.paytoRemainingPendingCheck'), this.translate.instant('swal.error'));
              return false;
            }
          }
        }
      }
      if (this.paymentAmount > a) {
        console.log('complete first');
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

        console.log(a1, a);
        if (a1 > a) {
          continue;
        } else if (a1 == a) {
          break;
        } else if (this.paymentAmount < a) {
          console.log(a1, a);
          this.toastr.clear();
          this.toastr.error(this.translate.instant('message.error.payToRemainingReduceTimecheck'), this.translate.instant('swal.error'));
          this.surplus_payment_type == '3'
            ? this.surplusMoneyModalClose.nativeElement.click()
            : this.paymentModalClose.nativeElement.click();
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

    // inpur params
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

    if (this.payment_type == 1 || this.payment_type == 4) {
      input['collection_payment_choice_id'] = this.payment_choice_id['id'];
    }
    input['type'] = this.payment_type;

    if ((this.cashSum + this.paymentAmount > this.cashLimit)) {
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


    if (callApi) {
      this.isApplyBtnClicked = true;
      this.admin.postDataApi('applyCollectionPayment', input).subscribe(r => {
        this.isApplyBtnClicked = false;
        if (this.surplus_payment_type) {
          input['amount'] = this.paymentAmount - this.calculatedPayAmount;
          input['type'] = this.surplus_payment_type;
          input['parent_id'] = r.data['id'];   // send parent_id in case of type 1 and surplus (to make parent delete)
          if (this.surplus_payment_type == '4') {
            input['collection_payment_choice_id'] = this.surplus_payment_choice_id;
          }

          this.admin.postDataApi('applyCollectionPayment', input).subscribe(r => {
            // if (this.surplus_payment_type == '1' || this.surplus_payment_type == '4') {
            //   input['collection_payment_choice_id'] = this.payment_choice_id['id']
            // }
          });
        }

        this.paymentModalClose.nativeElement.click();
        this.closeCollReceiptModal();
        this.getCollectionDetails();

        this.toastr.clear();
        this.toastr.success(this.translate.instant('message.success.savedSuccessfully'), this.translate.instant('swal.success'));
      }, error => {
        this.paymentConcepts = [];
        this.isApplyBtnClicked = false;
        this.paymentModalClose.nativeElement.click();
        this.closeCollReceiptModal();
        this.getCollectionDetails();
        return false;
      });
    }
  }

  callToPaymentApi(input) {
    this.isApplyBtnClicked = true;
    this.admin.postDataApi('applyCollectionPayment', input).subscribe(r => {
      this.isApplyBtnClicked = false;
      if (this.surplus_payment_type) {
        input['amount'] = this.paymentAmount - this.calculatedPayAmount;
        input['type'] = this.surplus_payment_type;
        input['parent_id'] = r.data['id'];   // send parent_id in case of type 1 and surplus (to make parent delete)
        if (this.surplus_payment_type == '4') {
          input['collection_payment_choice_id'] = this.surplus_payment_choice_id;
        }

        this.admin.postDataApi('applyCollectionPayment', input).subscribe(r => {
          // if (this.surplus_payment_type == '1' || this.surplus_payment_type == '4') {
          //   input['collection_payment_choice_id'] = this.payment_choice_id['id']
          // }
        });
      }

      this.paymentModalClose.nativeElement.click();
      this.closeCollReceiptModal();
      this.getCollectionDetails();

      this.toastr.clear();
      this.toastr.success(this.translate.instant('message.success.savedSuccessfully'), this.translate.instant('swal.success'));
    }, error => {
      this.paymentConcepts = [];
      this.isApplyBtnClicked = false;
      this.paymentModalClose.nativeElement.click();
      this.closeCollReceiptModal();
      this.getCollectionDetails();
      return false;
    });
  }

  askUserForSurplusMomey() {
    this.closePaymentModal();
    this.surplusMoneyModalOpen.nativeElement.click();
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
    this.docsFile1.nativeElement.value = '';
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

  setPaymentAmount(item: any) {
    this.selectedPaymentConcept = item;
    let amt: any = 0; let penaltyamt: any = 0;
    let amtPaid: any = 0;
    let currentAmt: any = 0;
    let currentAmtPaid: any = 0;
    // checking if method is pay to specific (4),
    // then user will pay only for that specific installment +
    // user cannot pay more than the amount+penalty
    if (this.payment_type == 4) {
      currentAmt = item['amount'];
      currentAmtPaid = item['calc_payment_amount'] || 0;
      this.penaltyAmount = item.penalty ? parseFloat(item.penalty.amount).toFixed(2) : 0;
      this.pendingPayment = 0.00; // amt already paid
      this.currentAmount = (parseFloat(currentAmt) - parseFloat(currentAmtPaid)).toFixed(2);
      this.paymentAmount = (parseFloat(this.currentAmount) + parseFloat(this.pendingPayment)
        + parseFloat(this.penaltyAmount)).toFixed(2);
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

  setPaymentSurplusAmount(item) {
    this.selectedPaymentConcept = item;
    this.surplus_payment_choice_id = item.id;
    let currentAmt: any = 0;
    let currentAmtPaid: any = 0;
    // checking if method is pay to specific (4),
    // then user will pay only for that specific installment +
    // user cannot pay more than the amount+penalty
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

  closeSurplusMoney() {
    this.surplusMoneyModalClose.nativeElement.click();
  }

  closePaymentModal() {
    this.paymentModalClose.nativeElement.click();
  }

  closeCollReceiptModal() {
    this.paymentAmount = 0; this.docFile = ''; this.description = '';
    this.penaltyAmount = 0; this.pendingPayment = 0; this.currentAmount = 0;
    this.paymentDate = null;
    this.docsFile1.nativeElement.value = '';
  }

  sortFunction(a, b) {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return dateA > dateB ? 1 : -1;
  }

  getParkingSpaceLots = (buildingId: any): void => {
    this.spinner.show();
    forkJoin([
      this.admin.postDataApi('parkingSpaceLots', { building_id: buildingId || 0 }), // included
      this.admin.postDataApi('parkingSpaceRent', { building_id: buildingId || 0 }), // for sale
    ]).subscribe((response: any[]) => {
      this.spinner.hide();
      this.parkingSpaceLotsArray = response[0].data || [];
      this.parkingSpaceRentArray = response[1].data || [];
      this.makeDetailsForPaking();
    });
  }

  makeDetailsForPaking = (): void => {
    this.parkingLotIncludedDetails = 'Tandem:100, Double:300';
    ((this.model.property || {}).property_parking_space || []).forEach((item) => {
      if (this.parkingLotIncludedDetails) {
        this.parkingLotIncludedDetails += ', ';
      } else {
        this.parkingLotIncludedDetails = '';
      }
      this.parkingLotIncludedDetails += (this.getParkingLotIncludedText(item.parking_type) + ':' + item.parking_count);
    });

    // (((this.model || {}).property || {}).property_offer_payment || []).forEach((item) => {
    //   if (this.parkingLotSaleDetails) {
    //     this.parkingLotSaleDetails += ',';
    //   } else {
    //     this.parkingLotSaleDetails = '';
    //   }
    //   this.parkingLotSaleDetails += (this.getParkingLotForSaleText(item.parking_type) + ':' + item.parking_count);
    // });
    // const property_parking_lot_sale_array = (((this.model || {}).property || {}).property_offer_payment || [])[(((this.model || {}).property || {}).property_offer_payment || []).length - 1];
    // ((property_parking_lot_sale_array || {}).property_parking_lot_sale || []).forEach((item) => {
    //   if (this.parkingLotSaleDetails) {
    //     this.parkingLotSaleDetails += ',';
    //   } else {
    //     this.parkingLotSaleDetails = '';
    //   }
    //   this.parkingLotSaleDetails += (this.getParkingLotForSaleText(item.parking_type) + ':' + item.parking_lots);
    // });
  }

  getParkingLotIncludedText = (parking_type: any): any => {
    const data = this.parkingSpaceLotsArray.find((item) => item.id == parking_type);
    return this.language_code == 'en' ? ((data || {}).name_en || '') : ((data || {}).name_es || '');
  }

  getParkingLotForSaleText = (parking_type: any): any => {
    const data = this.parkingSpaceRentArray.find((item) => item.id == parking_type);
    return this.language_code == 'en' ? ((data || {}).name_en || '') : ((data || {}).name_es || '');
  }

  getFormattedDate(delivery_date: string) {
    const date_array = delivery_date.split('/');
    let temp_date = '';
    switch (date_array[1]) {
      case '01':
        temp_date = date_array[0] + '/' + 'Jan' + '/' + date_array[2];
        break;
      case '02':
        temp_date = date_array[0] + '/' + 'Feb' + '/' + date_array[2];
        break;
      case '03':
        temp_date = date_array[0] + '/' + 'Mar' + '/' + date_array[2];
        break;
      case '04':
        temp_date = date_array[0] + '/' + 'Apr' + '/' + date_array[2];
        break;
      case '05':
        temp_date = date_array[0] + '/' + 'May' + '/' + date_array[2];
        break;
      case '06':
        temp_date = date_array[0] + '/' + 'Jun' + '/' + date_array[2];
        break;
      case '07':
        temp_date = date_array[0] + '/' + 'Jul' + '/' + date_array[2];
        break;
      case '08':
        temp_date = date_array[0] + '/' + 'Aug' + '/' + date_array[2];
        break;
      case '09':
        temp_date = date_array[0] + '/' + 'Sep' + '/' + date_array[2];
        break;
      case '10':
        temp_date = date_array[0] + '/' + 'Oct' + '/' + date_array[2];
        break;
      case '11':
        temp_date = date_array[0] + '/' + 'Nov' + '/' + date_array[2];
        break;
      case '12':
        temp_date = date_array[0] + '/' + 'Dec' + '/' + date_array[2];
        break;
      default:
        break;
    }
    return temp_date;
  }
}
