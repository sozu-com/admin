import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from './admin.service';
import { PricePipe } from '../pipes/price.pipe';
import { moment } from 'ngx-bootstrap/chronos/test/chain';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class LegalContractPdfService {

  language_code: string;
  collection_data: any;
  
    constructor(
      private translate: TranslateService,
      private spinner: NgxSpinnerService,
      public admin: AdminService,
      private datePipe: DatePipe,
      private price: PricePipe,
    ) { }

  getCollectionById(id){
    this.spinner.show();
    this.admin.postDataApi('getCollectionById', { id: id }).subscribe(
      success => {
        this.collection_data = success['data'];
        this.generatePaymentReceiptPDF();
        this.spinner.hide();
      });
  }

  generatePaymentReceiptPDF() {
    let self = this
    var conver = require('numero-a-letras');
    this.language_code = localStorage.getItem('language_code');
    let current_date = new Date();
    let concept_layaway = this.collection_data.payment_choices.find(item=> item.category_name == 'Layaway Payment');
    let concept_downpayment = this.collection_data.payment_choices.find(item=> item.category_name == 'Down Payment');
    let concept_monthly = this.collection_data.payment_choices.find(item=> item.category_name == 'Monthly Installment 1');
    let concept_monthly_no = this.collection_data.payment_choices.filter(item=> item.payment_choice.name == 'Monthly Installment');
    let concept_payment = this.collection_data.payment_choices.find(item=> item.category_name == 'Payment upon Delivery');
    //  let concept_downpayment_date = this.datePipe.transform((concept_downpayment.payment_date? concept.collection_paymentss.payment_date : new Date()), 'dd/MM/yyyy');
    //  let monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    //       'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
    //  if (this.language_code != 'en') {
    //    date = date.includes('Jan') ? date.replace('Jan', 'enero') : date.includes('Feb') ? date.replace('Feb', 'febrero') :
    //    date.includes('Mar') ? date.replace('Mar', 'marzo') : date.includes('Apr') ? date.replace('Apr', 'abril') :
    //    date.includes('May') ? date.replace('May', 'mayo') : date.includes('Jun') ? date.replace('Jun', 'junio') :
    //    date.includes('Jul') ? date.replace('Jul', 'julio') : date.includes('Aug') ? date.replace('Aug', 'agosto') :
    //    date.includes('Sep') ? date.replace('Sep', 'septiembre') : date.includes('Oct') ? date.replace('Oct', 'octubre') :
    //    date.includes('Nov') ? date.replace('Nov', 'noviembre') : date.includes('Dec') ? date.replace('Dec', 'diciembre') : ' ';
    //   }
    let buyer_name = this.collection_data.buyer && this.collection_data.buyer.name ? this.collection_data.buyer.name + ' ' + this.collection_data.buyer.first_surname + ' ' + this.collection_data.buyer.second_surname : this.collection_data.buyer_legal_entity ? this.collection_data.buyer_legal_entity.comm_name : 'N/A';
    let buyer_name_first_letter = this.collection_data.buyer && this.collection_data.buyer.name ? this.collection_data.buyer.name[0] + this.collection_data.buyer.first_surname[0] + this.collection_data.buyer.second_surname[0] : this.collection_data.buyer_legal_entity ? this.collection_data.buyer_legal_entity.comm_name : 'N/A';
    let legal_rep_name = this.collection_data.buyer_legal_entity ? (this.collection_data.buyer_legal_entity.legal_reps.name + ' ' + 
                     this.collection_data.buyer_legal_entity.legal_reps.first_surname + '' + this.collection_data.buyer_legal_entity.legal_reps.second_surname) : 'N/A';
    let buyer_name_FTRP = this.collection_data.buyer && this.collection_data.buyer.name ? this.collection_data.buyer.fed_tax_pay : this.collection_data.buyer_legal_entity ? this.collection_data.buyer_legal_entity.fed_tax_pay : 'N/A';
    let docDefinition = {
      pageSize: 'LEGAL',
      pageMargins: [40, 40, 40, 60],
      content: [
        {
          columns: [
            {
              text: this.translate.instant('generatePDF.legalContractDetail') + buyer_name.toLocaleUpperCase() + this.translate.instant('generatePDF.legalContractDetail1'),
              bold: true,
              fontSize: 12,
              margin: [0, 30, 0, 0],
            }
          ]
        },
        {
          columns: [
            {
              text: this.translate.instant('generatePDF.contractDetail2'),
              bold: true,
              fontSize: 12,
              alignment: 'center',
              margin: [0, 35, 0, 0],
            }
          ]
        },
        {
          columns: [
            {
              text: this.translate.instant('generatePDF.contractDetail3'),
              bold: true,
              fontSize: 12,
              margin: [0, 35, 0, 0],
            }
          ]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.a'), bold: true, fontSize: 12},
                {text: this.translate.instant('generatePDF.contractDetail4'), fontSize: 12,},
                {text:this.translate.instant('generatePDF.contractDetail4a'), bold: true, fontSize: 12},
                {text:this.translate.instant('generatePDF.contractDetail4b'), fontSize: 12},
          ],
          margin: [0, 10, 0, 0]
        }
          ]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.b'), bold: true, fontSize: 12},
                {text: this.translate.instant('generatePDF.contractDetail5'), fontSize: 12},
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
              {text: this.translate.instant('generatePDF.c'), bold: true, fontSize: 12},
              {text: this.translate.instant('generatePDF.contractDetail6'), fontSize: 12},
              {text:this.translate.instant('generatePDF.contractDetail6a'), bold: true, fontSize: 12},
              {text:this.translate.instant('generatePDF.contractDetail6b'), fontSize: 12},
          ],
          margin: [0, 10, 0, 0]
        }
          ]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.d'), bold: true, fontSize: 12},
                {text: this.translate.instant('generatePDF.contractDetail7'), fontSize: 12},
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
              {text: this.translate.instant('generatePDF.e'), bold: true, fontSize: 12},
              {text: this.translate.instant('generatePDF.contractDetail8'), fontSize: 12},
              {text:this.translate.instant('generatePDF.contractDetail8a'), bold: true, fontSize: 12},
              {text:this.translate.instant('generatePDF.contractDetail8b'), fontSize: 12},
              {text:this.translate.instant('generatePDF.contractDetail8c'), bold: true, fontSize: 12},
          ],
          margin: [0, 10, 0, 0]
        }
          ]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.f'), bold: true, fontSize: 12},
                {text: this.translate.instant('generatePDF.contractDetail9'), fontSize: 12},
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.g'), bold: true, fontSize: 12},
                {text: this.translate.instant('generatePDF.contractDetail10'), fontSize: 12},
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.h'), bold: true, fontSize: 12},
                {text: this.translate.instant('generatePDF.contractDetail11'), fontSize: 12},
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: this.translate.instant('generatePDF.contractDetail12'),
              bold: true,
              fontSize: 12,
              margin: [0, 35, 0, 0],
            }
          ]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.a'), bold: true, fontSize: 12},
                {text: this.translate.instant('generatePDF.legalContractDetail3'), fontSize: 12},
                {text: buyer_name, fontSize: 12},
                {text: this.translate.instant('generatePDF.legalContractDetail4'), fontSize: 12},
                {text: 'N/A', bold: true, fontSize: 12},
                {text: this.translate.instant('generatePDF.legalContractDetail5'), fontSize: 12},
                {text: 'N/A', bold: true, fontSize: 12},
                {text: this.translate.instant('generatePDF.legalContractDetail6'), fontSize: 12},
                {text: 'N/A', bold: true, fontSize: 12},
                {text: this.translate.instant('generatePDF.legalContractDetail7'), fontSize: 12},
                {text: 'N/A', bold: true, fontSize: 12},
                {text: this.translate.instant('generatePDF.legalContractDetail8'), fontSize: 12},
                {text: 'N/A', bold: true, fontSize: 12},
                {text: this.translate.instant('generatePDF.legalContractDetail9'), fontSize: 12},
                {text: buyer_name_FTRP ? (buyer_name_FTRP + '.') : 'N/A.', bold: true, fontSize: 12}
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.b'), bold: true, fontSize: 12},
                {text: this.translate.instant('generatePDF.legalContractDetail10'), fontSize: 12},
                {text: this.translate.instant('generatePDF.legalContractDetail10a'), fontSize: 12},
                {text: legal_rep_name, fontSize: 12, bold: true, },
                {text: this.translate.instant('generatePDF.legalContractDetail11'), fontSize: 12},
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.c'), bold: true, fontSize: 12},
                {text: this.translate.instant('generatePDF.legalContractDetail12'), fontSize: 12},
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.d'), bold: true, fontSize: 12},
                {text: this.translate.instant('generatePDF.legalContractDetail13'), fontSize: 12},
                {text: 'N/A.', fontSize: 12, bold: true, },
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.e'), bold: true, fontSize: 12},
                {text: this.translate.instant('generatePDF.legalContractDetail14'), fontSize: 12},
                {text: buyer_name_FTRP ? (buyer_name_FTRP + '.') : 'N/A.', fontSize: 12, bold: true, },
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.f'), bold: true, fontSize: 12},
                {text: this.translate.instant('generatePDF.legalContractDetail15'), fontSize: 12},
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.g'), bold: true, fontSize: 12},
                {text: this.translate.instant('generatePDF.legalContractDetail16'), fontSize: 12},
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.h'), bold: true, fontSize: 12},
                {text: this.translate.instant('generatePDF.legalContractDetail17'), fontSize: 12},
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.i'), bold: true, fontSize: 12},
                {text: this.translate.instant('generatePDF.legalContractDetail18'), fontSize: 12},
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.j'), bold: true, fontSize: 12},
                {text: this.translate.instant('generatePDF.legalContractDetail19'), fontSize: 12},
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: this.translate.instant('generatePDF.contractDetail26'),
              bold: true,
              fontSize: 12,
              alignment: 'center',
              margin: [0, 20, 0, 5],
            }
          ]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail27'), bold: true, fontSize: 12},
                {text: this.translate.instant('generatePDF.contractDetail27a'), fontSize: 12},
                {text: this.translate.instant('generatePDF.contractDetail28'), bold: true, fontSize: 12},
                {text: this.collection_data.property.name, bold: true, fontSize: 12},
                {text: this.translate.instant('generatePDF.contractDetail29'), bold: true, fontSize: 12},
                {text: this.collection_data.property.floor_num, bold: true, fontSize: 12},
                {text: this.translate.instant('generatePDF.contractDetail30'), bold: true, fontSize: 12},
                {text: this.collection_data.property.building_configuration.name, bold: true, fontSize: 12},
                {text: this.translate.instant('generatePDF.contractDetail31'), bold: true, fontSize: 12},
                {text: this.collection_data.property.max_area, bold: true, fontSize: 12},
                {text: this.translate.instant('generatePDF.contractDetail32'), bold: true, fontSize: 12},
                {text: this.translate.instant('generatePDF.contractDetail33'), fontSize: 12},
                {text: this.collection_data.property.parking_for_sale + this.collection_data.property.parking_count, bold: true, fontSize: 12},
                {text: this.translate.instant('generatePDF.contractDetail34'), bold: true, fontSize: 12},
                {text: this.translate.instant('generatePDF.contractDetail35'), fontSize: 12},
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
              {
                text: this.translate.instant('generatePDF.contractDetail36'), 
                fontSize: 12
              }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
                {
                  text: this.translate.instant('generatePDF.contractDetail37'), 
                  fontSize: 12
                }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail38'), bold: true, fontSize: 12},
                {text: this.translate.instant('generatePDF.contractDetail39'), fontSize: 12},
                {text: this.collection_data.final_price ? this.price.transform(this.collection_data.final_price) : 'N/A', bold: true, fontSize: 12},
                {text: (this.collection_data.final_price ? (' (' + conver.NumerosALetras(this.collection_data.final_price) + ')') : "N/A"), bold: true, fontSize: 12},
                {text: this.translate.instant('generatePDF.contractDetail40'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail41') + '"', fontSize: 12},
                {text: this.translate.instant('generatePDF.contractDetail42'), fontSize: 12},
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: '  ' + this.translate.instant('generatePDF.a'), bold: true, fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail43'), fontSize: 12},
                {text: concept_layaway.amount ? this.price.transform(concept_layaway.amount) : 0 , bold: true, fontSize: 12},
                {text: (concept_layaway.amount ? (' (' + conver.NumerosALetras(concept_layaway.amount) + ')') : "N/A"), bold: true, fontSize: 12},
                {text: this.translate.instant('generatePDF.contractDetail44'), fontSize: 12}
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: '  ' + this.translate.instant('generatePDF.b'), bold: true, fontSize: 12 },
                {text: this.translate.instant('generatePDF.legalContractDetail20'), fontSize: 12},
                {text: concept_downpayment.amount ? this.price.transform(concept_downpayment.amount) : 0 , bold: true, fontSize: 12},
                {text: (concept_downpayment.amount ? (' (' + conver.NumerosALetras(concept_downpayment.amount) + ') ') : "N/A"), bold: true, fontSize: 12},
                {text: this.translate.instant('generatePDF.legalContractDetail21'), fontSize: 12},
                {text: concept_downpayment.date ? (this.datePipe.transform((concept_downpayment.date), 'dd/MM/yyyy') + '.') : 'N/A.', fontSize: 12}
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: '  ' + this.translate.instant('generatePDF.c'), bold: true, fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail47'), fontSize: 12},
                {text: concept_monthly.amount ? this.price.transform(concept_monthly.amount) : 0 , bold: true, fontSize: 12},
                {text: (concept_monthly.amount ? (' (' + conver.NumerosALetras(concept_monthly.amount) + ') ') : "N/A"), bold: true, fontSize: 12},
                {text: this.translate.instant('generatePDF.contractDetail48'), fontSize: 12},
                {text: concept_monthly_no ? (' ' + concept_monthly_no.length) : 'N/A' , bold: true, fontSize: 12},
                {text: this.translate.instant('generatePDF.contractDetail49'), fontSize: 12},
                {text: concept_monthly.date ? moment(concept_monthly.date).format('MMMM') : 'N/A', bold: true, fontSize: 12},
                {text: this.translate.instant('generatePDF.contractDetail50'), fontSize: 12},
                {text: concept_monthly.date ? (moment(concept_monthly.date).format('YYYY') + '.') : 'N/A.', bold: true, fontSize: 12},
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: '  ' + this.translate.instant('generatePDF.d'), bold: true, fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail45'), fontSize: 12},
                {text: concept_payment.amount ? concept_payment.amount : 0 , bold: true, fontSize: 12},
                {text: (concept_payment.amount ? (' (' + conver.NumerosALetras(concept_payment.amount) + ')') : "N/A"), bold: true, fontSize: 12},
                {text: this.translate.instant('generatePDF.contractDetail51'), fontSize: 12}
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail52'), fontSize: 12 },
                {text: concept_monthly_no ? (' ' + concept_monthly_no.length) : 'N/A' , bold: true, fontSize: 12},
                {text: this.translate.instant('generatePDF.contractDetail53'), fontSize: 12}
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail54'), fontSize: 12 }
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail55'), fontSize: 12 }
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail56'), fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail57'), bold: true,  fontSize: 12},
                {text: this.translate.instant('generatePDF.contractDetail59'), fontSize: 12}
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: '"' + this.translate.instant('generatePDF.contractDetail60') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail61'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail60') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail63'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail64') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail65'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail60') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail66'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail64') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail67'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail64') + '".', fontSize: 12 },
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail68'), fontSize: 12 }
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail69'), bold: true, fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail64') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail70'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail60') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail71'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail60') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail72'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail64') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail73'), fontSize: 12},
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail74'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail64') + '"', fontSize: 12, },
                {text: this.translate.instant('generatePDF.contractDetail75'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail60') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail76'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail60') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail77'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail64') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail78'), fontSize: 12},
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: '"' + this.translate.instant('generatePDF.contractDetail64') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail79'), fontSize: 12}
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail80'), bold: true, fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail81'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail64') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail82'), fontSize: 12}
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail83'), fontSize: 12 }
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail84'), fontSize: 12 }
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail85'), fontSize: 12 }
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail86'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail64') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail87'), fontSize: 12},
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail88'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail60') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail89'), fontSize: 12},
              ], 
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail90'), fontSize: 12 },
                {text: '"' + this.translate.instant('generatePDF.contractDetail60') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail91'), fontSize: 12},
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail92'), fontSize: 12 },
                {text: '"' + this.translate.instant('generatePDF.contractDetail64') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail93'), fontSize: 12},
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail94'), bold: true, fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail95'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail60') + '"', fontSize: 12, },
                {text: this.translate.instant('generatePDF.contractDetail96'), fontSize: 12},
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: '"' + this.translate.instant('generatePDF.contractDetail60') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail97'), fontSize: 12},
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail98'), bold: true, fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail99'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail60') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail100'), fontSize: 12},
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail101'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail60') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail102'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail64') + '".', fontSize: 12 }
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail103'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail64') + '".', fontSize: 12 }
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail104'), bold: true, fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail105'), fontSize: 12}
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail106'), fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail106a'), fontSize: 12}
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail107'), fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail107a'), fontSize: 12},
                {text: this.collection_data.final_price ? this.price.transform(this.collection_data.final_price) : 'N/A', bold: true, fontSize: 12},
                {text: (this.collection_data.final_price ? (' (' + conver.NumerosALetras(this.collection_data.final_price) + ')') : "N/A"), bold: true, fontSize: 12},
                {text: this.translate.instant('generatePDF.contractDetail108'), fontSize: 12 },
                {text: '"' + this.translate.instant('generatePDF.contractDetail109') + '"' + ')', fontSize: 12}
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail110'), fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail110a'), fontSize: 12}
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail111'), bold: true, fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail112'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail60') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail113'), fontSize: 12},
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail114'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail60') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail115'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail64') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail116'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail64') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail117'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail60') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail118'), fontSize: 12}
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.si'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail60') + '"', fontSize: 12, },
                {text: this.translate.instant('generatePDF.contractDetail119'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail64') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail120'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail64') + '"', fontSize: 12, },
                {text: this.translate.instant('generatePDF.contractDetail121'), fontSize: 12}
              ],
            }
          ],
          margin: [0, 10, 0, 4]
        },
        {
          columns: [
            {
              text: [
                {text: 'i', fontSize: 12, bold: true},
              ],
              width: 30
            },
            {
              text: [
                {text: this.translate.instant('generatePDF.si'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail60') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail122'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail64') + '".', fontSize: 12, }
              ],
            }
          ],
          margin: [0, 0, 0, 4]
        },
        {
          columns: [
            {
              text: [
                {text: 'ii', fontSize: 12, bold: true},
              ],
              width: 30
            },
            {
              text: [
                {text: this.translate.instant('generatePDF.si'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail60') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail123'), fontSize: 12},
              ],
            }
          ],
          margin: [0, 0, 0, 4]
        },
        {
          columns: [
            {
              text: [
                {text: 'iii', fontSize: 12, bold: true},
              ],
              width: 30
            },
            {
              text: [
                {text: this.translate.instant('generatePDF.si'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail60') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail124'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail64') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail125'), fontSize: 12},
              ],
            }
          ],
          margin: [0, 0, 0, 4]
        },
        {
          columns: [
            {
              text: [
                {text: 'iv', fontSize: 12, bold: true},
              ],
              width: 30
            },
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail126'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail60') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail127'), fontSize: 12},
              ],
            }
          ],
          margin: [0, 0, 0, 4]
        },
        {
          columns: [
            {
              text: [
                {text: 'v', fontSize: 12, bold: true},
              ],
              width: 30
            },
            {
              text: [
                {text: this.translate.instant('generatePDF.si'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail60') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail128'), fontSize: 12},
              ],
            }
          ],
          margin: [0, 0, 0, 4]
        },
        {
          columns: [
            {
              text: [
                {text: 'vi', fontSize: 12, bold: true},
              ],
              width: 30
            },
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail129'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail60') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail130'), fontSize: 12}
              ],
            }
          ],
          margin: [0, 0, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.si'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail64') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail131'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail64') + '"', fontSize: 12, },
                {text: this.translate.instant('generatePDF.contractDetail132'), fontSize: 12}
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail133'), fontSize: 12}
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail134'), fontSize: 12}
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.si'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail60') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail135'), fontSize: 12}
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail136'), bold: true, fontSize: 12 },
                {text: '"' + this.translate.instant('generatePDF.contractDetail64') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail137'), fontSize: 12}
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail138'), bold: true, fontSize: 12 },
                {text: '"' + this.translate.instant('generatePDF.contractDetail64') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail139'), fontSize: 12}
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail140'), fontSize: 12 },
                {text: '"' + this.translate.instant('generatePDF.contractDetail64') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail141'), fontSize: 12}
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail142'), bold: true, fontSize: 12 },
                {text: '"' + this.translate.instant('generatePDF.contractDetail60') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail143'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail64') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail144'), fontSize: 12},
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: '"' + this.translate.instant('generatePDF.contractDetail60') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail145'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail64') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail146'), fontSize: 12}
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail147'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail60') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail148'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail60') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail149'), fontSize: 12}
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail150'), bold: true, fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail151'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail152') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail153'), fontSize: 12},
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail154'), bold: true, fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail155'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail156') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail157'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail156') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail158'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail160') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail159'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail156') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail160'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail160') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail161'), fontSize: 12}
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: '"' + this.translate.instant('generatePDF.contractDetail60') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail162'), fontSize: 12}
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail163'), fontSize: 12}
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail164'), fontSize: 12}
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail165'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail160') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail166'), fontSize: 12}
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail167'), bold: true, fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail168'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail160') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail169'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail64') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail170'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail64') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail171'), fontSize: 12}
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail172'), fontSize: 12}
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail173'), bold: true, fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail174'), fontSize: 12}
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail175'), bold: true, fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail176'), fontSize: 12}
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: '"' + this.translate.instant('generatePDF.contractDetail64') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail177'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.contractDetail60') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail178'), fontSize: 12}
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail179'), bold: true, fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail180'), fontSize: 12}
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail181'), fontSize: 12}
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail182'), bold: true, fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail183'), fontSize: 12}
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail184'), fontSize: 12}
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail185'), bold: true, fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail186'), fontSize: 12}
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail187'), bold: true, fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail188'), fontSize: 12}
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail189'), fontSize: 12}
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail190'), bold: true, fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail191'), fontSize: 12}
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail192'), bold: true, fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail193'), fontSize: 12},
                {text: '"' + this.translate.instant('generatePDF.PROMITENTECOMPRADOR') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail194'), fontSize: 12 },
                {text: '"' + this.translate.instant('generatePDF.contractDetail64') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail195'), fontSize: 12 },
                {text: '"' + this.translate.instant('generatePDF.PROMITENTECOMPRADOR') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail196'), fontSize: 12 },
                {text: '"' + this.translate.instant('generatePDF.contractDetail64') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail197'), fontSize: 12 },
                {text: '"' + this.translate.instant('generatePDF.contractDetail64') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail198'), fontSize: 12 },
                {text: '"' + this.translate.instant('generatePDF.contractDetail64') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail199'), fontSize: 12 },
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail200'), fontSize: 12 },
                {text: '"' + this.translate.instant('generatePDF.PROMITENTECOMPRADOR') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail201'), fontSize: 12 },
                {text: '"' + this.translate.instant('generatePDF.LAPROMITENTEVENDEDORA') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail202'), fontSize: 12 },
                {text: '"' + this.translate.instant('generatePDF.PROMITENTECOMPRADOR') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail203'), fontSize: 12 },
                {text: '"' + this.translate.instant('generatePDF.64') + '"', fontSize: 12 },
                {text: this.translate.instant('generatePDF.contractDetail204'), fontSize: 12 },
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail205'), fontSize: 12 }
               
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail206'), fontSize: 12 }
               
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail207'), bold: true, fontSize: 12 }
               
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: this.translate.instant('generatePDF.contractDetail208'),
              bold: true,
              fontSize: 12,
              alignment: 'center',
              margin: [0, 35, 0, 0],
            }
          ]
        },
        {
          columns: [
            {
              text: buyer_name,
              bold: true,
              fontSize: 12,
              alignment: 'center',
            }
          ]
        },
        {
          style: 'table2',
          table: {
            headerRows: 1,
            widths: [200],
            body: [
              [
                { text: 'C. ' + legal_rep_name, border: [false, true, false, false], bold: true },    
              ],
              [
                { text: this.translate.instant('generatePDF.legalContractDetail24'), border: [false, false, false, false], bold: true },    
              ],
            ],
          }
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail64'), bold: true, fontSize: 12, alignment: 'center', }
               
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.contractDetail212'), bold: true, fontSize: 12, alignment: 'center', }
               
              ],
            }
          ]
        },
        {
        columns: [
        {
          style: 'table1',
          table: {
            headerRows: 1,
            widths: [225],
            body: [
              [
                { text: this.translate.instant('generatePDF.contractDetail209'), border: [false, true, false, false], bold: true},    
              ],
              [
                { text: this.translate.instant('generatePDF.contractDetail210'), border: [false, false, false, false], bold: true},    
              ],
            ],
          }
        },
        {
          style: 'table3',
          table: {
            headerRows: 1,
            widths: [225],
            body: [
              [
                { text: this.translate.instant('generatePDF.contractDetail211'), border: [false, true, false, false], bold: true},    
              ],
              [
                { text: this.translate.instant('generatePDF.contractDetail210'), border: [false, false, false, false], bold: true},    
              ],
            ],
          }
        }
      ]
    },
      ],
      footer: function (currentPage, pageCount) {
        var t = [
          {
          layout: "noBorders",
          fontSize: 10,
          margin: [40, 5, 40, 0],
          columns: [
          {
            text: self.translate.instant('generatePDF.contractFooter1') + buyer_name_first_letter + '/' + self.collection_data.id + '\n' +
            self.translate.instant('generatePDF.legalContractFooter1') + buyer_name + self.translate.instant('generatePDF.legalContractFooter2') + 
            '\n' + self.translate.instant('generatePDF.contractFooter3') + ' N/A ' +  self.translate.instant('generatePDF.contractFooter4') + ' N/A ' + 
            self.translate.instant('generatePDF.contractFooter5') + ' N/A'
          }
        ]
        },
        {
          layout: "noBorders",
          fontSize: 10,
          columns: [
          {
              text: currentPage,
              fontSize: 10,
              alignment: 'center'
          }
        ]
      }
      ]; 
        return t;
       },
      defaultStyle: {
        alignment: 'justify',
        lineHeight: 1.3
      },
      styles: {
        table:{
          margin: [15, 0, 15, 0]
        },
        table1:{
          alignment: 'center',
          margin: [10, 60, 0, 20]
        },
        table3:{
          alignment: 'center',
          margin: [0, 60, 0, 20]
        },
        table2:{
          alignment: 'center',
          margin: [160, 60, 0, 20]
        }
      }
    }
    pdfMake.createPdf(docDefinition).download(this.translate.instant('generatePDF.legalRespContract') + ' ' + current_date.toISOString() + '.pdf');
  }
}
