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
import { TranslateService } from '@ngx-translate/core';
import { ExcelService } from 'src/app/services/excel.service';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
@Component({
  selector: 'app-account-statement',
  templateUrl: './account-statement.component.html',
  styleUrls: ['./account-statement.component.css'],
  providers: [Collection, NumberWithCommasPipe]
})

export class AccountStatementComponent implements OnInit {

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
    private translate: TranslateService,
    private excelService: ExcelService
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
    // this.generateExcel();
    // return;
    if (this.paymentConcepts) {
      const finalData = [];
      // const concept = this.translate.instant('quickVisualization.concept');
      // const month = this.translate.instant('quickVisualization.month');
      // const paymentDate = this.translate.instant('quickVisualization.paymentDate');
      // const paid = this.translate.instant('quickVisualization.paid');
      // const paymentMethods = this.translate.instant('quickVisualization.paymentMethods');
      // const outstandingPayment = this.translate.instant('quickVisualization.outstandingPayment');
      // const paymentAttachment = this.translate.instant('quickVisualization.paymentAttachment');
      // const penaltyFLP = this.translate.instant('quickVisualization.penaltyFLP');
      // const penaltyDescription = this.translate.instant('quickVisualization.penaltyDescription');

      for (let index = 0; index < this.paymentConcepts.length; index++) {
        const p = this.paymentConcepts[index];
        const pcAmount = this.collectionCommission[index]['purchase_payment'] ?
        this.model.currency.symbol + this.numberWithCommas.transform(this.collectionCommission[index]['purchase_payment']['amount']) : '';

        const pcDate = this.collectionCommission[index]['purchase_payment'] ? this.collectionCommission[index]['purchase_payment']['payment_date'] : '';

        const ccAmount = this.collectionCommission[index]['payment'] ?
        this.model.currency.symbol + this.numberWithCommas.transform(this.collectionCommission[index]['payment']['amount']) : '';

        const ccDate = this.collectionCommission[index]['payment'] ? this.collectionCommission[index]['payment']['payment_date'] : '';
        
        finalData.push({});

        finalData.push({
          'Concept': p.name || '',
          'Month': p.date || '',
          'Payment Date': p.collection_payment ? p.collection_payment.payment_date : '',
          'Paid': p.collection_payment ? 
                this.model.currency.symbol + this.numberWithCommas.transform(p.collection_payment.amount) : '',
          'Payment Method': p.collection_payment && p.collection_payment.payment_method ? p.collection_payment.payment_method.name : '',
          'Outstanding Payment': p.key == 'total' ?
                (this.model.currency.symbol + this.numberWithCommas.transform(p.amount))  :
                ( p.collection_payment ? '' : this.model.currency.symbol + this.numberWithCommas.transform(p.amount)),
          'Payment Attachment': p.collection_payment ? p.collection_payment.receipt : '',
          'Penalty FLP': p.penalty ? 
                this.model.currency.symbol + this.numberWithCommas.transform(p.penalty.amount) : '',
          'Penalty Description': p.penalty && p.penalty.description ? p.penalty.description : ''
        });
      }
      this.exportAsExcelFile(finalData, 'AccountStatement-');
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


}
