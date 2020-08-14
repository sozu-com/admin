import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IProperty } from 'src/app/common/property';
import { ActivatedRoute } from '@angular/router';
import { Collection } from 'src/app/models/collection.model';
import { AdminService } from 'src/app/services/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import { CurrencyPipe, DatePipe } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-quick-visualization',
  templateUrl: './quick-visualization.component.html',
  styleUrls: ['./quick-visualization.component.css'],
  providers: [Collection, CurrencyPipe, DatePipe]
})
export class QuickVisualizationComponent implements OnInit {

  @ViewChild('viewDesModal') viewDesModal: ElementRef;
  @ViewChild('viewDesModalClose') viewDesModalClose: ElementRef;
  description: string;
  title: any;
  paymentConcepts: Array<any>;
  collectionCommission: Array<any>;
  totalPaid: number;
  totalOutstanding: number;
  public parameter: IProperty = {};
  newPaymentConcepts: Array<any>;
  constructor(
    private route: ActivatedRoute,
    public model: Collection,
    private admin: AdminService,
    private spinner: NgxSpinnerService,
    private currencyPipe: CurrencyPipe,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.parameter.sub = this.route.params.subscribe(params => {
      this.model.id = params['id'];
      this.getCollectionDetails();


      // window.onscroll = function() {myFunction()};
  
      // var header = document.getElementById("myHeader");
      // var sticky = header.offsetTop;
      
      // function myFunction() {
      //   if (window.pageYOffset > sticky) {
      //     header.classList.add("sticky");
      //   } else {
      //     header.classList.remove("sticky");
      //   }
      // }
    });
  }

  // getCollectionDetails() {
  //   this.spinner.show();
  //   this.admin.postDataApi('getCollectionById', {id: this.model.id})
  //     .subscribe(
  //       success => {
  //         this.spinner.hide();
  //         this.model = success['data'];
  //         this.paymentConcepts = success['data']['payment_choices'];
  //         this.collectionCommission = success['data']['collection_commissions'];
  //         this.totalPaid = 0.00;
  //         this.totalOutstanding = 0.00;
  //         // this.model.totalPenalty = 0;

  //         const reducingP = [];
  //         for (let index = 0; index < this.paymentConcepts.length; index++) {
  //           const m = this.paymentConcepts[index];
  //           m.payment_date = m.collection_payment ? this.getDateWRTTimezone(m.collection_payment.payment_date) : '';
  //           //  calculating total penalty
  //           // if (m.penalty){
  //           //   this.model.totalPenalty = this.model.totalPenalty + parseInt(m.penalty.amount || 0)
  //           // }


  //           // m.paid_amount = m.is_paid_calculated == 1 ? m.amount : (m.collection_payment ? (m.collection_payment.amount) : '');
  //           // m.paid_amount = m.collection_payment ? m.collection_payment.amount : '';
  //           m.paid_amount = m.calc_payment_amount || 0;
  //           // if type=2 means reducing payment => add one more row
  //           // console.log(m)
  //           if(m.type==2) {
  //             const c = {
  //               key: 'remaining_amt',
  //               name: 'Payment to remaining (amount)',
  //               paid_amount: m.extra_amount,
  //               is_paid_calculated: 0,
  //               outstanding_amount: 0,
  //               index: index,
  //               payment_date: m.collection_payment ? this.getDateWRTTimezone(m.collection_payment.payment_date) : ''
  //             };
  //             // console.log(c)
  //             reducingP.push(c);     
  //           }

  //           if(m.type==3) {
  //             const c = {
  //               key: 'remaining_amt',
  //               name: 'Payment to remaining (schedule)',
  //               paid_amount: m.extra_amount,
  //               is_paid_calculated: 0,
  //               outstanding_amount: 0,
  //               index: index,
  //               payment_date: m.collection_payment ? this.getDateWRTTimezone(m.collection_payment.payment_date) : ''
  //             };
  //             // console.log(c)
  //             reducingP.push(c);     
  //           }

  //           // calculating total paid and total outstanding payment
  //           // if (m.is_paid_calculated) {
  //           //   this.totalPaid = this.totalPaid + m.calc_payment_amount;
  //           // } 
  //           this.totalPaid = this.totalPaid + m.paid_amount;
  //           m['outstanding_amount'] = m.amount - (m.calc_payment_amount || 0);
  //           console.log(m.outstanding_amount)
  //           if ((m.amount - (m.calc_payment_amount||0))>=0) {
  //             // const a = (m.amount - (m.calc_payment_amount || 0) );
  //             // m['outstanding_amount'] = a > 0.01 ? a : 0;  // in a case difference was 0.02
  //             const a = (m.calc_payment_amount || 0);
  //             // console.log(a, m.amount)
  //             // calc_payment_amount now containes value => user need to pay if less than amount, else it will be equal to amt used has paid
  //             // m['outstanding_amount'] = m.amount==a ? 0 : (a == 0 ? m.amount : a);  // in a case difference was 0.02
  //             // m['outstanding_amount'] = m.amount==a ? 0 : (m.amount - a); 
  //             m['is_pending'] = a ? 1 : 0;
  //             this.totalOutstanding = this.totalOutstanding + m['outstanding_amount'];
  //           }
  //         }

  //         // now insert at reducing remaining payments at type=2 index
  //         for (let i = 0; i < reducingP.length; i++) {
  //           const element = reducingP[i];
  //           this.paymentConcepts.splice(element.index, 0, element);              
  //         }

  //         this.paymentConcepts.push({
  //           key: 'total',
  //           name: 'Total',
  //           paid_amount: this.totalPaid,
  //           is_paid_calculated: 1,
  //           outstanding_amount: this.totalOutstanding
  //         })

  //         console.log(this.paymentConcepts);
  //         this.collectionCommission.push({})
  //       }, error => {
  //         this.spinner.hide();
  //       }
  //     );
  // }

  
  getCollectionDetails() {
    this.spinner.show();
    this.admin.postDataApi('getCollectionById', {id: this.model.id})
      .subscribe(
        success => {
          this.spinner.hide();
          this.model = success['data'];
          this.paymentConcepts = success['data']['payment_choices'];
          this.collectionCommission = success['data']['collection_commissions'];
          this.totalPaid = 0.00;
          this.totalOutstanding = 0.00;

          let reducingP = [];
          for (let index = 0; index < this.paymentConcepts.length; index++) {
            const m = this.paymentConcepts[index];
            // this.newPaymentConcepts.push(m);
            m.payment_date = m.collection_payment>0 ? this.getDateWRTTimezone(m.collection_payment.payment_date) : '';
            m.paid_amount = m.calc_payment_amount ? m.calc_payment_amount : 0;

            // if type=2 means reducing payment => add one more row
            if (m.collection_paymentss && m.collection_paymentss.length>0) {
              for (let i = 0; i < m.collection_paymentss.length; i++) {
                const paymnts = m.collection_paymentss[i];
                if (paymnts.payment_type == 2) {
                  const c = {
                    key: 'remaining_amt',
                    name: 'Payment to remaining (Reduce Amount)',
                    paid_amount: paymnts.amount,
                    is_paid_calculated: 0,
                    outstanding_amount: 0,
                    index: index+i,
                    payment_type: 1,  // in real its 2
                    // amount: paymnts.amount,
                    // payment_date:  this.getDateWRTTimezone(paymnts.payment_date),
                    receipt: paymnts.receipt,
                    description: paymnts.description
                  };
                  c['collection_paymentss'] = [{
                    payment_type: 1,  // in real its 2
                    paid_amount: paymnts.amount,
                    amount: paymnts.amount,
                    payment_date:  this.getDateWRTTimezone(paymnts.payment_date),
                    receipt: paymnts.receipt,
                    description: paymnts.description,
                    payment_method: paymnts.payment_method
                  }]
                  reducingP.push(c);     
                }
                else if (paymnts.payment_type == 3) {
                  const c = {
                    key: 'remaining_amt',
                    name: 'Payment to remaining (Reduce Time)',
                    paid_amount: paymnts.amount,
                    is_paid_calculated: 0,
                    outstanding_amount: 0,
                    index: index+i,
                    payment_type: 1,  // in real its 3
                    // amount: paymnts.amount,
                    // payment_date:  this.getDateWRTTimezone(paymnts.payment_date),
                    receipt: paymnts.receipt,
                    description: paymnts.description
                  };
                  c['collection_paymentss'] = [{
                    payment_type: 1,  // in real its 3
                    paid_amount: paymnts.amount,
                    amount: paymnts.amount,
                    payment_date:  this.getDateWRTTimezone(paymnts.payment_date),
                    receipt: paymnts.receipt,
                    description: paymnts.description,
                    payment_method: paymnts.payment_method
                  }]
                  console.log(c);
                  reducingP.push(c);     
                }
                else if (paymnts.payment_type == 5) {
                  const c = {
                    key: 'remaining_amt',
                    name: 'Total Payment',
                    paid_amount: paymnts.amount,
                    is_paid_calculated: 0,
                    outstanding_amount: 0,
                    index: index+i,
                    payment_type: 1,  // in real its 5
                    // amount: paymnts.amount,
                    // payment_date:  this.getDateWRTTimezone(paymnts.payment_date),
                    receipt: paymnts.receipt,
                    description: paymnts.description
                  };
                  c['collection_paymentss'] = [{
                    payment_type: 1,  // in real its 5
                    paid_amount: paymnts.amount,
                    amount: paymnts.amount,
                    payment_date:  this.getDateWRTTimezone(paymnts.payment_date),
                    receipt: paymnts.receipt,
                    description: paymnts.description,
                    payment_method: paymnts.payment_method
                  }]
                  console.log(c);
                  reducingP.push(c);     
                }
              }
            }

            // calculating total paid and total outstanding payment
            // if (m.is_paid_calculated) {
            //   this.totalPaid = this.totalPaid + m.calc_payment_amount;
            // } 
            this.totalPaid = this.totalPaid + m.paid_amount;
            m['outstanding_amount'] = m.amount - (m.calc_payment_amount || 0);
            if ((m.amount - (m.calc_payment_amount||0))>=0) {
              const a = (m.calc_payment_amount || 0);
              m['is_pending'] = a ? 1 : 0;
              this.totalOutstanding = this.totalOutstanding + m['outstanding_amount'];
            }
          }
          // now insert at reducing remaining payments at type=2 index
          // reducingP = reducingP.reverse();
          for (let i = 0; i < reducingP.length; i++) {
            const element = reducingP[i];
            this.paymentConcepts.splice(element.index, 0, element);              
          }

          // for (let index = 0; index < this.paymentConcepts.length; index++) {
          //   const element = this.paymentConcepts[index];

          // }

          // calculating new paid amt, by skipping type 2
          for (let index = 0; index < this.paymentConcepts.length; index++) {
            const element = this.paymentConcepts[index];
            let p_amt: any = 0;
            let extraAmt: any = 0;
            if (element.collection_paymentss && element.collection_paymentss.length>0) {
              for (let i = 0; i < element.collection_paymentss.length; i++) {
                const ele = element.collection_paymentss[i];
                // if (ele.payment_type != 2) {
                //   p_amt = parseFloat(p_amt) + parseFloat(ele.amount);
                // }
                if (ele.payment_type == 2) {
                  // console.log('1')
                  // extraAmt = parseFloat(extraAmt) + parseFloat(ele.amount);
                  let v = ele.amt_share || 0;
                  // for (let j = 0; j < this.paymentConcepts.length; j++) {
                  //   const e = this.paymentConcepts[j];
                  //   console.log(e, element)
                  //   if (e.id > element.id && element.name.includes('Monthly Installment')) {
                  //     v++;
                  //     console.log(v);
                  //   }
                  // }
                  const ids = ele.choices_ids.split(',');
                  for (let j = 0; j < this.paymentConcepts.length; j++) {
                    const e = this.paymentConcepts[j];
                    // console.log('1222', ids, e.id, v)
                    if (e.id) {
                      const d = e.id.toString();
                      const h = ids.indexOf(d)
                      if (h>=0) {
                        const obj = {
                          amount: v,
                          name: 'Payment to remaining (Reduce Amount)',
                          payment_type: 1,  // in real its 3
                          paid_amount: v,
                          payment_date:  this.getDateWRTTimezone(ele.payment_date),
                          receipt: ele.receipt,
                          description: ele.description,
                          payment_method: ele.payment_method
                        }
                        // console.log('dddddddddddddddddddd')
                        // console.log(obj)
                        // obj['amount'] = v;
                        // if (this.paymentConcepts[j].collection_paymentss && this.paymentConcepts[j].collection_paymentss.length > 0) {
                        //   this.paymentConcepts[j].collection_paymentss.unshift(obj)
                        // } else {
                        //   this.paymentConcepts[j].collection_paymentss = [obj];
                        // }
                        console.log(this.paymentConcepts[j].paid_amount, v);
                        this.paymentConcepts[j].paid_amount = parseFloat(this.paymentConcepts[j].paid_amount) - parseFloat(v);
                        // console.log(v,element,element.paid_amount);
                        // break;
                      }
                    }
                  }
                }
              }
            }


            element.new_paid_amt = p_amt;
          }

          this.paymentConcepts.push({
            key: 'total',
            name: 'Total',
            // paid_amount: this.totalPaid,
            paid_amount: this.model.total_payment_recieved,
            is_paid_calculated: 1,
            outstanding_amount: this.totalOutstanding
          })

          this.collectionCommission.push({})
        }, error => {
          this.spinner.hide();
        }
      );
  }

  
  exportData() {
    if (this.paymentConcepts) {
      const finalData = [];
      for (let index = 0; index < this.paymentConcepts.length; index++) {
        const p = this.paymentConcepts[index];

        const pcAmount = this.collectionCommission[index]['purchase_payment'] ?
        this.currencyPipe.transform(this.collectionCommission[index]['purchase_payment']['amount']) : '';

        const pcDate = this.collectionCommission[index]['purchase_payment'] ? this.collectionCommission[index]['purchase_payment']['payment_date'] : '';

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
          'Sozu PC Receipt': this.collectionCommission[index] && this.collectionCommission[index].purchase_payment ? this.collectionCommission[index].purchase_payment.receipt : '',
          'PC Description': this.collectionCommission[index] && this.collectionCommission[index].purchase_payment ? this.collectionCommission[index].purchase_payment.description : '',
          'Collection Commission': ccAmount,
          'Date Of CC': ccDate,
          'Sozu CC Receipt': this.collectionCommission[index] && this.collectionCommission[index].payment ? this.collectionCommission[index].payment.receipt : '',
          'CC Description': this.collectionCommission[index] && this.collectionCommission[index].payment ? this.collectionCommission[index].payment.description : '',
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
    if (description) {
      this.title = title;
      this.description = description;
      this.viewDesModal.nativeElement.click();
    }
  }

  closeDescModal() {
    this.viewDesModalClose.nativeElement.click();
  }

  getDateWRTTimezone(date: any) {
    var offset = new Date(date).getTimezoneOffset();
    // console.log(offset)
    if (offset < 0) {
      return moment(date).subtract(offset, 'minutes').format('YYYY-MM-DD');
    } else {
      return moment(date).add(offset, 'minutes').format('YYYY-MM-DD');
    }
  }
}
