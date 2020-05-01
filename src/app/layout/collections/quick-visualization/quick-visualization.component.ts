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
@Component({
  selector: 'app-quick-visualization',
  templateUrl: './quick-visualization.component.html',
  styleUrls: ['./quick-visualization.component.css'],
  providers: [Collection, NumberWithCommasPipe]
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
    private numberWithCommas: NumberWithCommasPipe
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
          this.totalPaid = 0;
          this.totalOutstanding = 0;
          this.paymentConcepts.forEach(m => {
            // calculating paid and outstatnding payment
            // if (m.is_paid_calculated == 1) {

            // }

            // calculating total paid and total outstanding payment
            if (m.collection_payment) {
              this.totalPaid = this.totalPaid + m.collection_payment.amount;
            } else {
              this.totalOutstanding = this.totalOutstanding + m.amount;
            }
          })
          const collection_payment = {amount: this.totalPaid};
          this.paymentConcepts.push({
            key: 'total',
            name: 'Total',
            collection_payment: collection_payment,
            is_paid_calculated: 1,
            amount: this.totalOutstanding
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
        this.model.currency.symbol + this.numberWithCommas.transform(this.collectionCommission[index]['purchase_payment']['amount']) : '';

        const pcDate = this.collectionCommission[index]['purchase_payment'] ? this.collectionCommission[index]['purchase_payment']['payment_date'] : '';

        const ccAmount = this.collectionCommission[index]['payment'] ?
        this.model.currency.symbol + this.numberWithCommas.transform(this.collectionCommission[index]['payment']['amount']) : '';

        const ccDate = this.collectionCommission[index]['payment'] ? this.collectionCommission[index]['payment']['payment_date'] : '';

        finalData.push({
          'Concept': p.name || '',
          'Month': p.date || '',
          'Payment Date': p.collection_payment ? p.collection_payment.payment_date : '',
          'Paid': p.collection_payment ? 
                this.model.currency.symbol + this.numberWithCommas.transform(p.collection_payment.amount) : '',
          'Outstanding Payment': p.key == 'total' ?
                (this.model.currency.symbol + this.numberWithCommas.transform(p.amount))  :
                ( p.collection_payment ? '' : this.model.currency.symbol + this.numberWithCommas.transform(p.amount)),
          'Penalty FLP': p.penalty ? 
                this.model.currency.symbol + this.numberWithCommas.transform(p.penalty.amount) : '',
          'Purchased Commission': pcAmount,
          'Date Of PC': pcDate,
          'Collection Commission': ccAmount,
          'Date Of CC': ccDate
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
