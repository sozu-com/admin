import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from './admin.service';
import { PricePipe } from '../pipes/price.pipe';
import { forkJoin } from 'rxjs';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PropertiesPdfService {
  projectLogoImageBase64: any;
  signatureImageBase64: any;
  addressImageBase64: any;
  base64: any;
  base64_address: any;
  base64_signature: any;
  collection_data: any;
  index: any;
  payment_concept: any;
  language_code: string;
  payment: any;
  constructor(
    private translate: TranslateService,
    private spinner: NgxSpinnerService,
    public admin: AdminService,
    private datePipe: DatePipe,
    private price: PricePipe,
  ) {
  }

  getPropertiesByIds(payment, id, index, payment_concept, loader) {
    this.index = index;
    this.payment = payment;
    this.payment_concept = payment_concept;
    if (loader) {
      this.spinner.show();
    }
    this.admin.postDataApi('getPropertyExportByIds', { id: id }).subscribe(
      success => {
        this.collection_data = success['data'];
        this.getBase64ImageFromUrl(this.collection_data.property.id);
      });
  }

  getBase64ImageFromUrl(id) {
    forkJoin([
      this.admin.postDataApi('getPdfImage', { id: id })
    ]).subscribe((success: any) => {
      this.base64 = (success[0] || {}).data;
      this.projectLogoImageBase64 = 'data:image/jpeg;base64,' + this.base64;
      this.base64_address = (success[0] || {}).address;
      this.base64_signature = (success[0] || {}).signature;
      this.signatureImageBase64 = 'data:image/jpeg;base64,' + this.base64_signature;
      this.addressImageBase64 = 'data:image/jpeg;base64,' + this.base64_address;
      this.spinner.hide();
      this.generatePaymentReceiptPDF();
    }, (error) => {
    });
  }

  generatePaymentReceiptPDF() {
    let docDefinition = {
      pageSize: 'LEGAL',
      pageMargins: [40, 70, 40, 80],
      content: [
        {
          columns: [
            {
              //image: this.logoImageBase64,
              width: 100
            }
          ]
        },
        {
          alignment: 'justify',
          columns: [
            [
            {
              text: 'Ap Name'
            },
            {
              text: 'config'
            },
            {
              text: '(Appartment)'
            },
            {
              text: 'Ap Name'
            }
          ],
          [
            {
              text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.'
            }
          ]
          ]
        }
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15]
        },
        table: {
          margin: [15, 0, 15, 0]
        },
        table1: {
          margin: [45, 0, 15, 0]
        },
        table2: {
          alignment: 'center'
        }
      }
    }
    pdfMake.createPdf(docDefinition).download(this.translate.instant('generatePDF.paymentReceipt') + ' '
   // + current_date.toISOString() + '.pdf'
    );
  }
}
