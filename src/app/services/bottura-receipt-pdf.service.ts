import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from './admin.service';
import { PricePipe } from '../pipes/price.pipe';
import { moment } from 'ngx-bootstrap/chronos/test/chain';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class BotturaReceiptPdfService {
  logoImageBase64: string | ArrayBuffer;
  payment_concept: any;
  payment: any;
  collection_data: any;
  base64: any;
  projectLogoImageBase64: string;

  constructor(
    private translate: TranslateService,
    private spinner: NgxSpinnerService,
    public admin: AdminService,
    private datePipe: DatePipe,
    private price: PricePipe,
    private http: HttpClient
  ) { 
    this.http.get('../../assets/img/sozu_black.png', { responseType: 'blob' })
      .subscribe(res => {
        const reader = new FileReader();
        reader.onloadend = () => {
          let base64data = reader.result;
          this.logoImageBase64 = base64data;
        }

        reader.readAsDataURL(res);
      });
  }

  getCollectionById(payment, id, index, payment_concept, loader) {
    //this.index = index;
    this.payment = payment;
    this.payment_concept = payment_concept;
    this.spinner.show();
    this.admin.postDataApi('getCollectionById', { id: id }).subscribe(
      success => {
        this.collection_data = success['data'];
        this.getBase64ImageFromUrl(this.collection_data.property.id);
      });
  }

  getBase64ImageFromUrl(id) {
    this.admin.postDataApi('getPdfImageBaseCode', { id: id }).subscribe((success: any) => {
    this.base64 = (success[0] || {}).data;
    if(( success || {}).data){
     this.projectLogoImageBase64 = 'data:image/jpeg;base64,' + this.base64;
    }
    this.spinner.hide();
    this.generatePaymentReceiptPDF();
    }, (error) => {
      this.spinner.hide();
    });
  }

  generatePaymentReceiptPDF() {
    let conver = require('numero-a-letras');
    let current_date = new Date();
    let concept = this.collection_data.payment_choices.find(item => item.id == this.payment_concept.id);
    this.payment = this.payment ? this.payment : concept.collection_paymentss[concept.collection_paymentss.length - 1];
    let month = moment(this.payment.date).month();
    let payment_concept_month = month == 1 ? ' Enero ' : month == 2 ? ' Febrero ' : month == 3 ? ' Marzo ' : month == 4 ? ' Abril ' : month == 5 ? ' Mayo ' : month == 6 ? 
    ' Junio ' : month == 7 ?' Julio ' : month == 8 ? ' Agosto ' : month == 9 ? ' Septiembre ' : month == 10 ? ' Octubre ' : month == 11 ? ' Noviembre ' : month == 12 ? ' Diciembre ' : ' N/A ';
    let buyer_name = this.collection_data.buyer && this.collection_data.buyer.name ? this.collection_data.buyer.name + ' ' + this.collection_data.buyer.first_surname + ' ' + this.collection_data.buyer.second_surname : this.collection_data.buyer_legal_entity ? this.collection_data.buyer_legal_entity.comm_name : 'N/A';
    let docDefinition = {
      pageSize: 'LEGAL',
      pageMargins: [40, 70, 40, 80],
      content: [
        {
          columns: [
            {
              image: this.logoImageBase64,
              width: 100
            },
            {
              text: '',
              margin: [75, 0, 0, 0]
            },
            this.projectLogoImageBase64 ?
            {
              image: this.projectLogoImageBase64,
              width: 100
            } : 
            {
              text: ''
            },
          ]
        },
        {
          columns: [
            {
              text: 'RECIBO',
              alignment: 'center',
              bold: true,
              fontSize: 12,
              margin: [0, 10, 0, 0]
            }
          ],
          margin: [0, 15, 0, 0] 
        },
        {
          columns: [
            { text: [
            { text: 'Bueno por: ', fontSize: 11 },
            { text: this.payment.amount ? this.price.transform(this.payment.amount) : 0, bold: true, fontSize: 11 },
            { text: (this.payment.amount ? (' (' + conver.NumerosALetras(this.payment.amount) + ')') : "N/A"), bold: true, fontSize: 11 },
            ]}
          ],
          margin: [0, 15, 0, 0]
        },
        {
          columns: [
            { text: [
            { text: 'Recibimos del/la Señor/a ', fontSize: 11 },
            { text: buyer_name, bold: true, fontSize: 11 },
            { text: ' la cantidad de ', fontSize: 11 },
            { text: this.payment.amount ? this.price.transform(this.payment.amount) : 0, bold: true, fontSize: 11 },
            { text: (this.payment.amount ? (' (' + conver.NumerosALetras(this.payment.amount) + ')') : "N/A"), bold: true, fontSize: 11 },
            { text: ', el día ', fontSize: 11 },
            { text: this.payment.date ? moment(this.payment.date).day() : 'N/A.', bold: true, fontSize: 11 },
            { text: ' de ', fontSize: 11 },
            { text: this.payment.date ? payment_concept_month : 'N/A.', bold: true, fontSize: 11 },
            { text: ' de ', fontSize: 11 },
            { text: this.payment.date ? moment(this.payment.date).format('YYYY') : 'N/A.', bold: true, fontSize: 11 },
            { text: ' por concepto de depósito en garantía de cumplimiento de conformidad que tiene como objetivo la gestión para la adquisición de una unidad condominal del desarrollo inmobiliario BOTTURA, al efecto de adquirir siguiente la unidad condominal, cuyas características serán: ', fontSize: 11 },
            ]}
          ],
          margin: [0, 15, 0, 15]
        }, 
        {
          columns: [
            { text: [
              { text: '1.', fontSize: 11, alignment: 'center' },
            ],
            width: 30,
            margin: [10, 0, 0, 0]
          },
          { text:[
            { text: 'Unidad condominal: ', fontSize: 11 },
            { text: this.collection_data.property.name, bold: true, fontSize: 11 },
          ]}
          ]
        },
        {
          columns: [
            { text: [
              { text: '2.', fontSize: 11, alignment: 'center' },
            ],
            width: 30,
            margin: [10, 0, 0, 0]
          },
            { text:[
            { text: 'Metros estimados: ', fontSize: 11 },
            { text: this.collection_data.property.max_area, bold: true, fontSize: 11 },
            { text: ' m2 ', fontSize: 11 },
            { text: (this.collection_data.property.max_area ? (' (' + conver.NumerosALetras( this.collection_data.property.max_area) + ' metros cuadrados ) ').replace('Pesos','') : " (N/A)"), bold: true, fontSize: 11 },
            ]}
          ]
      },
      {
        columns: [
          { text: [
            { text: '3.', fontSize: 11, alignment: 'center' },
          ],
          width: 30,
          margin: [10, 0, 0, 0]
        },
        { text:[
            { text: 'Monto total de depósito en garantía de cumplimiento al que se compromete el/la Señor/a ', fontSize: 11 },
            { text: buyer_name + ': ', bold: true, fontSize: 11 },
            { text: this.collection_data.final_price ? this.price.transform(this.collection_data.final_price) : 0, bold: true, fontSize: 11 },
            { text: (this.collection_data.final_price ? (' (' + conver.NumerosALetras(this.collection_data.final_price) + ')') : "N/A"), bold: true, fontSize: 11 },
          ]}
          ],
        },
        this.payment_concept.category_name == 'Layaway Payment' ? 
        {
          columns: [
            { text: 'La cantidad recibida en concepto de apartado será devuelta íntegramente en el evento de que la propuesta presentada, no sea aceptada por parte del desarrollador inmobiliario y/o el cliente no pueda cumplir con la obligación del primer deposito en garantía de cumplimiento.', fontSize: 11 }
          ],
          margin: [0, 15, 0, 0]
        } : 
        {
          columns: [
            { text: 'La cantidad aquí entregada y recibida será aplicada al depósito en garantía de cumplimiento, al momento de la celebración del contrato de promesa de compraventa.', fontSize: 11 }
          ],
          margin: [0, 15, 0, 0]
        },
        this.payment_concept.category_name == 'Layaway Payment' ? 
        {
          columns: [
            { text: 'En el evento de que la propuesta señalada sea aceptada por el desarrollador inmobiliario, la cantidad aquí entregada y recibida será aplicada al primer depósito en garantía, al momento de la celebración del contrato de promesa de compraventa.', fontSize: 11 }
          ],
          margin: [0, 15, 0, 0]
        } :
        {
          columns: [
            { text: 'Será obligación de la empresa mantener debidamente informado al aportante de la forma y términos en los que se lleve a cabo la gestión la adquisición de una unidad condominal del desarrollo inmobiliario BOTTURA.', fontSize: 11 }
          ],
          margin: [0, 15, 0, 0]
        },
        this.payment_concept.category_name == 'Layaway Payment' ? 
        {
          columns: [
            { text: 'Será obligación de la empresa mantener debidamente informado al aportante de la forma y términos en los que se lleve a cabo la gestión la adquisición de una unidad condominal del desarrollo inmobiliario BOTTURA. ', fontSize: 11 }
          ],
          margin: [0, 15, 0, 0]
        } : 
        {
          columns: [
            { text: '' }
          ],
          margin: [0, 0, 0, 0]
        },
        {
          columns: [
            {
              text: 'ATENTAMENTE',
              alignment: 'center',
              bold: true,
              fontSize: 12,
              margin: [0, 20, 0, 0]
            }
          ] 
        },
        {
          columns: [
            {
              text: 'Real Estate Ventures, S.A. de C.V. ',
              alignment: 'center',
              bold: true,
              fontSize: 12,
              margin: [0, 20, 0, 0]
            }
          ] 
        }
      ],
      defaultStyle: {
        alignment: 'justify',
        lineHeight: 1.3
      },
      }
      pdfMake.createPdf(docDefinition).download(this.translate.instant('generatePDF.paymentReceipt') + ' ' + current_date.toISOString() + '.pdf');
    }
}
