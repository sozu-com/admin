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
import { TranslateService } from '@ngx-translate/core';
import { ExcelService } from 'src/app/services/excel.service';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { CurrencyPipe, DatePipe } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-account-statement',
  templateUrl: './account-statement.component.html',
  styleUrls: ['./account-statement.component.css'],
  providers: [Collection, CurrencyPipe, DatePipe]
})

export class AccountStatementComponent implements OnInit {

  @ViewChild('viewDesModal') viewDesModal: ElementRef;
  @ViewChild('viewDesModalClose') viewDesModalClose: ElementRef;
  description: string;
  title: any;
  paymentConcepts: Array<any>;
  collectionCommission: Array<any>;
  totalPaid: number;
  remainingAmt: number;
  totalOutstanding: number;
  public parameter: IProperty = {};
  property_collection_id: string;
  constructor(
    private route: ActivatedRoute,
    public model: Collection,
    private admin: AdminService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private excelService: ExcelService,
    private currencyPipe: CurrencyPipe,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.parameter.sub = this.route.params.subscribe(params => {
      this.property_collection_id = params['id'];
      this.getCollectionDetails();
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


          
  //         const reducingP = [];
  //         for (let index = 0; index < this.paymentConcepts.length; index++) {
  //           const m = this.paymentConcepts[index];
  //           m.payment_date = m.collection_payment ? this.getDateWRTTimezone(m.collection_payment.payment_date) : '';
  //           //  calculating total penalty
  //           // if (m.penalty){
  //           //   this.model.totalPenalty = this.model.totalPenalty + parseInt(m.penalty.amount || 0)
  //           // }


  //           m.paid_amount = m.is_paid_calculated == 1 ? m.amount : (m.collection_payment ? (m.collection_payment.amount) : '');

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
  //               payment_date: this.getDateWRTTimezone(m.collection_payment.payment_date)
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
  //               payment_date: this.getDateWRTTimezone(m.collection_payment.payment_date)
  //             };
  //             // console.log(c)
  //             reducingP.push(c);     
  //           }

  //           // calculating total paid and total outstanding payment
  //           if (m.is_paid_calculated) {
  //             // m['paid_amount'] = m.calc_payment_amount;
  //             this.totalPaid = this.totalPaid + m.calc_payment_amount;
  //           } 
  //           if ((m.amount - (m.calc_payment_amount||0))>=0) {
  //             const a = (m.amount - (m.calc_payment_amount || 0) );
  //             m['outstanding_amount'] = a > 0.01 ? a : 0;  // in a case difference was 0.02
  //             m['is_pending'] = (a != m.amount && a!=0) ? 1 : 0;
  //             this.totalOutstanding = this.totalOutstanding + a;
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




  //         // // this.model.totalPenalty = 0;
  //         // this.paymentConcepts.forEach(m => {
  //         //   //  calculating total penalty
  //         //   // if (m.penalty){
  //         //   //   this.model.totalPenalty = this.model.totalPenalty + parseInt(m.penalty.amount || 0)
  //         //   // }
  //         //   // calculating total paid and total outstanding payment
  //         //   if (m.is_paid_calculated) {
  //         //     m['paid_amount'] = m.calc_payment_amount;
  //         //     this.totalPaid = this.totalPaid + m.calc_payment_amount;
  //         //   } 
  //         //   if ((m.amount - (m.calc_payment_amount||0))>=0) {
  //         //     const a = (m.amount - (m.calc_payment_amount || 0) );
  //         //     m['outstanding_amount'] = a > 0.01 ? a : 0;  // in a case difference was 0.02
  //         //     m['is_pending'] = (a != m.amount && a!=0) ? 1 : 0;
  //         //     this.totalOutstanding = this.totalOutstanding + a;
  //         //   }
  //         // })
  //         // this.paymentConcepts.push({
  //         //   key: 'total',
  //         //   name: 'Total',
  //         //   paid_amount: this.totalPaid,
  //         //   is_paid_calculated: 1,
  //         //   outstanding_amount: this.totalOutstanding
  //         // })
  //         this.collectionCommission.push({})
  //       }, error => {
  //         this.spinner.hide();
  //       }
  //     );
  // }


  getCollectionDetails() {
    this.spinner.show();
    this.admin.postDataApi('getCollectionById', {id: this.property_collection_id})
      .subscribe(
        success => {
          this.spinner.hide();
          this.model = success['data'];
          this.paymentConcepts = success['data']['payment_choices'];
          // for dropdown
          this.paymentConcepts = [...this.paymentConcepts];

          this.collectionCommission = success['data']['collection_commissions'];
          this.totalPaid = 0.00;
          this.totalOutstanding = 0.00;
          this.remainingAmt = (((this.model.deal_price || 0) + (this.model.penalty || 0)) - (this.model.total_payment_recieved || 0));
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
                    payment_date:  this.getDateWRTTimezone(paymnts.payment_date, 'YYYY-MM-DD'),
                    receipt: paymnts.receipt,
                    description: paymnts.description,
                    payment_method: paymnts.payment_method
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
                    payment_date:  this.getDateWRTTimezone(paymnts.payment_date, 'YYYY-MM-DD'),
                    receipt: paymnts.receipt,
                    description: paymnts.description,
                    payment_method: paymnts.payment_method
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
                    payment_date:  this.getDateWRTTimezone(paymnts.payment_date, 'YYYY-MM-DD'),
                    receipt: paymnts.receipt,
                    description: paymnts.description,
                    payment_method: paymnts.payment_method
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
            const p_amt: any = 0;
            if (element.collection_paymentss && element.collection_paymentss.length > 0) {
              for (let i = 0; i < element.collection_paymentss.length; i++) {
                const ele = element.collection_paymentss[i];
                // if payment_type 2 then reduce the amount from all MI (only)
                if (ele.payment_type == 2) {
                  const v = ele.amt_share || 0;
                  const ids = ele.choices_ids.split(',');

                  // deleting the share of type 2 from main header
                  for (let j = 0; j < this.paymentConcepts.length; j++) {
                    const e = this.paymentConcepts[j];
                    if (e.id) {
                      const d = e.id.toString();
                      const h = ids.indexOf(d);
                      if (h >= 0) {
                        const obj = {
                          amount: v,
                          name: 'Payment to remaining (Reduce Amount)',
                          payment_type: 1,  // in real its 3
                          paid_amount: v,
                          payment_date:  this.getDateWRTTimezone(ele.payment_date, 'YYYY-MM-DD'),
                          receipt: ele.receipt,
                          description: ele.description,
                          payment_method: ele.payment_method
                        };
                        this.paymentConcepts[j].paid_amount = parseFloat(this.paymentConcepts[j].paid_amount) - parseFloat(v);
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
          });

          this.collectionCommission.push({});
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
        finalData.push({
          'Concept': p.name || '',
          'Month': p.date || '',
          'Payment Date': p.collection_payment ? p.collection_payment.payment_date : '',
          'Paid': p.paid_amount ? this.currencyPipe.transform(p.paid_amount) : '',
          'Outstanding Payment': p.outstanding_amount ? this.currencyPipe.transform(p.outstanding_amount) : '',
          'Payment Method': p.collection_payment && p.collection_payment.payment_method ? p.collection_payment.payment_method.name : '',
          'Sozu Payment Receipt': p.collection_payment ? p.collection_payment.receipt : '',
          'Penalty FLP': p.penalty ? this.currencyPipe.transform(p.penalty.amount) : '',
          'Penalty Description': p.penalty ? p.penalty.description : '',
        });
      }
      this.exportAsExcelFile(finalData, 'accountStatement-');
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


  generateExcel() {
    const title = 'Account Statement';
    const header = ["Year", "Month", "Make", "Model", "Quantity", "Pct"]
    const data = [
      [2007, 1, "Volkswagen ", "Volkswagen Passat", 1267, 10],
      [2007, 1, "Toyota ", "Toyota Rav4", 819, 6.5],
      [2007, 1, "Toyota ", "Toyota Avensis", 787, 6.2],
      [2007, 1, "Volkswagen ", "Volkswagen Golf", 720, 5.7],
      [2007, 1, "Toyota ", "Toyota Corolla", 691, 5.4],
    ];


    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Account Statement');

    // Add new row
    let titleRow = worksheet.addRow([title]);

    // Set font, size and style in title row.
    titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true };

    // Blank Row
    worksheet.addRow([]);

    //Add row with current date
    // let subTitleRow = worksheet.addRow(['Date : ']);
    // let subTitleRow = worksheet.addRow(['Date : ' + this.datePipe.transform(new Date(), 'medium')]);
    worksheet.mergeCells('A2:D5');
    worksheet.addRow([]);


    // Add buyer info
    worksheet.mergeCells('A7:A9');
    worksheet.getCell('A5').value = 'Buyer Info';
    worksheet.getCell('B4').value = 'Name';
    worksheet.getCell('B5').value = 'Email';
    worksheet.getCell('B6').value = 'PhoneBuyer Info';
    worksheet.getCell('C4').value = '';
    worksheet.getCell('C5').value = '';
    worksheet.getCell('C6').value = '';

    worksheet.mergeCells('D4:D6');
    worksheet.getCell('D5').value = 'Seller Info';
    worksheet.getCell('E4').value = 'Name Info';
    worksheet.getCell('E5').value = 'Phone Info';
    worksheet.getCell('E6').value = 'Email Info';


    //Add Header Row
    let headerRow = worksheet.addRow(header);

    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' }
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    });
    // Add Data and Conditional Formatting
    data.forEach(d => {
      let row = worksheet.addRow(d);
      let qty = row.getCell(5);
      let color = 'FF99FF99';
      if (+qty.value < 500) {
        color = 'FF9999'
      }

      qty.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color }
      }
    }

    );

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'CarData.xlsx');
    });
  }


  getDateWRTTimezone(date: any, format: any) {
    const offset = new Date(date).getTimezoneOffset();
    if (offset < 0) {
      return moment(date).subtract(offset, 'minutes').format(format);
    } else {
      return moment(date).add(offset, 'minutes').format(format);
    }
  }

  sortFunction(a, b) {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return dateA > dateB ? 1 : -1;
  }
}
