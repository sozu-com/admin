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
export class PaymentReceiptService {
  projectLogoImageBase64: any;
  base64: any;
  collection_data: any;
  index: any;
  payment_concept: any;
  language_code: string;
  constructor(
    private translate: TranslateService,
    private spinner: NgxSpinnerService,
    public admin: AdminService,
    private datePipe: DatePipe,
    private price: PricePipe,
  ) { 
  }

  getCollectionById(id, index, payment_concept, loader){
    this.index = index;
    this.payment_concept = payment_concept;
    if(loader){
      this.spinner.show();
    }
    this.admin.postDataApi('getCollectionById', { id: id }).subscribe(
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
      this.spinner.hide();
      this.generatePaymentReceiptPDF();
    }, (error) => {
    });
  }

  generatePaymentReceiptPDF() {
    var conver = require('numero-a-letras');
    this.language_code = localStorage.getItem('language_code');
    let current_date = new Date();
    let concept = this.collection_data.payment_choices.find(item=> item.id == this.payment_concept.id);
    let date = this.datePipe.transform((concept.collection_paymentss[concept.collection_paymentss.length - 1].payment_date? concept.collection_paymentss[concept.collection_paymentss.length - 1].payment_date : new Date()), 'MMM d, y');
    let monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
          'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
    if (this.language_code != 'en') {
      date = date.includes('Jan') ? date.replace('Jan', 'enero') : date.includes('Feb') ? date.replace('Feb', 'febrero') :
      date.includes('Mar') ? date.replace('Mar', 'marzo') : date.includes('Apr') ? date.replace('Apr', 'abril') :
      date.includes('May') ? date.replace('May', 'mayo') : date.includes('Jun') ? date.replace('Jun', 'junio') :
      date.includes('Jul') ? date.replace('Jul', 'julio') : date.includes('Aug') ? date.replace('Aug', 'agosto') :
      date.includes('Sep') ? date.replace('Sep', 'septiembre') : date.includes('Oct') ? date.replace('Oct', 'octubre') :
      date.includes('Nov') ? date.replace('Nov', 'noviembre') : date.includes('Dec') ? date.replace('Dec', 'diciembre') : ' ';

    }
    let buyer_name = this.collection_data.buyer && this.collection_data.buyer.name ? this.collection_data.buyer.name + ' ' + this.collection_data.buyer.first_surname + ' ' + this.collection_data.buyer.second_surname : this.collection_data.buyer_legal_entity ? this.collection_data.buyer_legal_entity.comm_name : 'N/A';
    let docDefinition = {
      pageSize: 'LEGAL',
      pageMargins: [40, 70, 40, 80],
      content: [
        {
          columns: [
            {
              text: this.translate.instant('generatePDF.receipt'),
              bold: true,
              fontSize: 26,
              margin: [0, 30, 0, 45],
            }
          ]
        },
        {
          style: 'table4',
          table: {
            headerRows: 1,
            widths: ['33%', '33%', '34%'],
            body: [
              [
                { text: this.translate.instant('generatePDF.date'), bold: true, border: [false, false, false, false] },
                { text: this.translate.instant('generatePDF.number'), bold: true, border: [false, false, false, false] },
                { text: this.collection_data.property.building.name ? this.collection_data.property.building.name : 'N/A', bold: true, border: [false, false, false, false] }
              ],
              [
                { text: date ? date : 'N/A', bold: true, border: [false, false, false, true], margin: [0, 0, 0, 100] },
                { text: this.index || this.index == 0 ? (this.index < 10 ? ('0'+ this.index): this.index) : 'N/A', bold: true, border: [false, false, false, true] },
                { text: this.collection_data.property.building.short_address ? this.collection_data.property.building.short_address : this.collection_data.property.building.address ? this.collection_data.property.building.address : 'N/A', bold: true, border: [false, false, false, true] }
              ],
            ],
          }
        },
        {
          columns: [
            {
              text: [
                {text: this.translate.instant('generatePDF.detail1') + (concept.calc_payment_amount ? this.price.transform(Number(concept.calc_payment_amount).toFixed(2)) : "N/A") + this.translate.instant('generatePDF.detail14') + 
                (concept.calc_payment_amount ? conver.NumerosALetras(concept.calc_payment_amount) : "N/A") + this.translate.instant('generatePDF.detail13') + this.translate.instant('generatePDF.detail2') + buyer_name + this.translate.instant('generatePDF.detail3')},
              {text:(this.language_code == 'en' ? concept.payment_choice.name_en :  this.language_code == 'es' ? concept.payment_choice.name_es : 'N/A'), bold: true},
              {text:this.translate.instant('generatePDF.detail4') + this.collection_data.property.building.name + this.translate.instant('generatePDF.detail5') + 
                    this.collection_data.property.building.full_address + '.'},
          ],
          margin: [0, 10, 0, 30]
        }
          ]
        },
        {
          columns: [
            {
              text: this.translate.instant('generatePDF.detail6') + this.collection_data.property.building_configuration.name + this.translate.instant('generatePDF.detail8') + 
              this.collection_data.property.floor_num + this.translate.instant('generatePDF.detail9') + this.collection_data.property.name + this.translate.instant('generatePDF.detail10') + 
              this.collection_data.property.max_area + this.translate.instant('generatePDF.detail11'),
              margin: [0, 0, 0, 30]
            }
          ]
        },
        {
          columns: [
            concept.payment_choice.id == 1 ?
            {
              text: this.translate.instant('generatePDF.detail12') + (concept.calc_payment_amount ? this.price.transform(Number(concept.calc_payment_amount).toFixed(2)) : "N/A") + this.translate.instant('generatePDF.detail14') + (concept.calc_payment_amount ? conver.NumerosALetras(concept.calc_payment_amount) : "N/A") + 
                    this.translate.instant('generatePDF.detail13') + this.translate.instant('generatePDF.detail15') + '.',
              margin: [0, 0, 0, 80]
            }
            : {
              text: '',
              margin: [0, 0, 0, 50]
            }
          ]
        },
        {
          style: 'table2',
          table: {
            headerRows: 1,
            widths: [510],
            body: [
              [
                { text: this.translate.instant('generatePDF.receipt'), border: [false, false, false, false], bold: true, fontSize: 12, },    
              ],
              [
                { text:this.collection_data.property.building.developer ? this.collection_data.property.building.developer.developer_company : 'N/A', border: [false, false, false, false], bold: true, margin: [0, 0, 0, 30] },    
              ],
            ],
          }
        }
      ],
      header: {
        columns: [
          {
            columns: [
              this.base64 && this.base64!= ''?
              {
                text:[
                  { text: this.collection_data.property.building.project_additional_url ? this.collection_data.property.building.project_additional_url : '' },
                  { text: this.collection_data.property.building.project_additional_url || this.collection_data.property.building.project_tagline? ' | ' : '' },
                  { text: this.collection_data.property.building.project_tagline ? this.collection_data.property.building.project_tagline : '' },
                ],
                width: 480,
                margin: [45, 20, 20, 20]
              } :
              {
                text:[
                  { text: this.collection_data.property.building.project_additional_url ? this.collection_data.property.building.project_additional_url : '' },
                  { text: this.collection_data.property.building.project_additional_url || this.collection_data.property.building.project_tagline? ' | ' : '' },
                  { text: this.collection_data.property.building.project_tagline ? this.collection_data.property.building.project_tagline : '' },
                ],
                width: 450,
                margin: [45, 20, 20, 20]
              }
              ,
              this.base64 && this.base64!= ''?
              {
                image: this.projectLogoImageBase64,
                alignment: 'right',
                margin: [20, 20, 20, 20],
                width: 150,
              } :
              {
                text: this.collection_data.property.building.name,
                bold: true,
                margin: [0, 20, 0, 0],
              },
            ]
          },
        ]
      },
      footer: {
        columns: [
          {
            style: 'table1',
            table: {
              widths: [130],
              headerRows: 1,
              body: [
                [
                  { text: '', border: [false, false, false, true], bold: true },
                ],
                [
                  { text: this.collection_data.property.building.short_address ? this.collection_data.property.building.short_address : this.collection_data.property.building.address ? this.collection_data.property.building.address : 'N/A', bold: true, border: [false, false, false, false] },
                ],
              ],
            }
          },
          {
            style: 'table',
            table: {
              headerRows: 1,
              widths: [130],
              body: [
                [
                  { text: '', border: [false, false, false, true], bold: true }
                ],
                [
                  { text: this.collection_data.property.building.project_email ? this.collection_data.property.building.project_email : 'N/A', bold: true, border: [false, false, false, false] }
                ],
              ],
            }
          },
          {
            style: 'table',
            table: {
              headerRows: 1,
              widths: [130],
              body: [
                [
                  { text: '', border: [false, false, false, true], bold: true }
                ],
                [
                  { text: '', bold: true, border: [false, false, false, false] }
                ],
              ],
            }
          },
        ]
      },
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15]
        },
        table:{
          margin: [15, 0, 15, 0]
        },
        table1:{
          margin: [45, 0, 15, 0]
        },
        table2:{
          alignment: 'center'
        }
      }
    }
    pdfMake.createPdf(docDefinition).download(this.translate.instant('generatePDF.paymentReceipt') + ' ' + current_date.toISOString() + '.pdf');
  }
}
