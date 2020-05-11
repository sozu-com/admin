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
import { NumberWithCommasPipe } from 'src/app/pipes/number-with-commas.pipe'
import { RoundNumberPipe } from 'src/app/pipes/round-number.pipe'

@Component({
  selector: 'app-quick-visualization',
  templateUrl: './quick-visualization.component.html',
  styleUrls: ['./quick-visualization.component.css'],
  providers: [Collection, NumberWithCommasPipe, RoundNumberPipe]
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
  constructor(
    private route: ActivatedRoute,
    public model: Collection,
    private admin: AdminService,
    private spinner: NgxSpinnerService,
    private numberWithCommas: NumberWithCommasPipe,
    private roundNumber: RoundNumberPipe
  ) { }

  ngOnInit() {
    this.parameter.sub = this.route.params.subscribe(params => {
      this.model.id = params['id'];
      this.getCollectionDetails();
    });
  }

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
          this.model.totalPenalty = 0;
          this.paymentConcepts.forEach(m => {
            //  calculating total penalty
            if (m.penalty){
              this.model.totalPenalty = this.model.totalPenalty + parseInt(m.penalty.amount || 0)
            }
            // calculating total paid and total outstanding payment
            if (m.is_paid_calculated) {
              m['paid_amount'] = m.calc_payment_amount;
              this.totalPaid = this.totalPaid + m.calc_payment_amount;
            } 
            if ((m.amount - (m.calc_payment_amount||0))>=0) {
              const a = (m.amount-(m.calc_payment_amount||0));
              m['outstanding_amount'] = a;
              m['is_pending'] = (a != m.amount && a!=0) ? 1 : 0;
              this.totalOutstanding = this.totalOutstanding + a;
            }
          })
          this.paymentConcepts.push({
            key: 'total',
            name: 'Total',
            paid_amount: Math.floor(this.totalPaid),
            is_paid_calculated: 1,
            outstanding_amount: Math.floor(this.totalOutstanding)
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
        this.model.currency.symbol + this.roundNumber.transform(this.collectionCommission[index]['purchase_payment']['amount']) : '';

        const pcDate = this.collectionCommission[index]['purchase_payment'] ? this.collectionCommission[index]['purchase_payment']['payment_date'] : '';

        const ccAmount = this.collectionCommission[index]['payment'] ?
        this.model.currency.symbol + this.roundNumber.transform(this.collectionCommission[index]['payment']['amount']) : '';

        const ccDate = this.collectionCommission[index]['payment'] ? this.collectionCommission[index]['payment']['payment_date'] : '';

        finalData.push({
          'Concept': p.name || '',
          'Month': p.date || '',
          'Payment Date': p.collection_payment ? p.collection_payment.payment_date : '',
          'Paid': p.paid_amount ? 
                this.model.currency.symbol + this.roundNumber.transform(p.paid_amount) : '',
          'Outstanding Payment': p.outstanding_amount ? this.model.currency.symbol + this.roundNumber.transform(p.outstanding_amount) : '',
          'Payment Method': p.collection_payment && p.collection_payment.payment_method ? p.collection_payment.payment_method.name : '',
          'Sozu Payment Receipt': p.collection_payment ? p.collection_payment.receipt : '',
          'Payment Description': p.collection_payment ? p.collection_payment.description : '',
          'Penalty FLP': p.penalty ? this.model.currency.symbol + this.roundNumber.transform(p.penalty.amount) : '',
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

}
