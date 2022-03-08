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
export class BotturaContractPdfService {
  language_code: string;
  collection_data: any;
  nationalityDetails: any[] = [];
  signature: Date;

  constructor(
    private translate: TranslateService,
    private spinner: NgxSpinnerService,
    public admin: AdminService,
    private datePipe: DatePipe,
    private price: PricePipe,
  ) { }

  getCollectionById(data) {
    this.spinner.show();
    this.signature = data.signature_date ? new Date(data.signature_date) : undefined;
    this.getNationality();
    this.admin.postDataApi('getCollectionById', { id: data.property_collection.id }).subscribe(
      success => {
        this.collection_data = success['data'];
        this.generatePaymentReceiptPDF();
        this.spinner.hide();
      });
  }

  getNationality = (): void => {
    this.admin.postDataApi('getNationality', {}).subscribe((success) => {
      this.spinner.hide();
      this.nationalityDetails = success.data || [];
      this.nationalityDetails.push({ id: 0, name: 'Other' });
    }, (error) => {
    });
  }

  generatePaymentReceiptPDF() {
    let self = this
    var conver = require('numero-a-letras');
    this.language_code = localStorage.getItem('language_code');
    let current_date = new Date();
    let concept_layaway = this.collection_data.payment_choices.find(item => item.category_name == 'Layaway Payment');
    let concept_downpayment = this.collection_data.payment_choices.find(item => item.category_name == 'Down Payment');
    let concept_monthly = this.collection_data.payment_choices.find(item => item.category_name == 'Monthly Installment 1' || item.category_name == 'Monthly Installment1');
    concept_monthly = concept_monthly ? concept_monthly : {};
    let concept_monthly_no = this.collection_data.payment_choices.filter(item => item.payment_choice.name == 'Monthly Installment');
    let concept_last_monthly = this.collection_data.payment_choices[concept_monthly_no.length - 1];
    let concept_payment = this.collection_data.payment_choices.find(item => item.category_name == 'Payment upon Delivery');
    let buyer_name = this.collection_data.buyer && this.collection_data.buyer.name ? this.collection_data.buyer.name + ' ' + this.collection_data.buyer.first_surname + ' ' + this.collection_data.buyer.second_surname : this.collection_data.buyer_legal_entity ? this.collection_data.buyer_legal_entity.comm_name : 'N/A';
    let buyer_name_first_letter = this.collection_data.buyer && this.collection_data.buyer.name ? this.collection_data.buyer.name[0] + this.collection_data.buyer.first_surname[0] + this.collection_data.buyer.second_surname[0] : this.collection_data.buyer_legal_entity ? this.collection_data.buyer_legal_entity.comm_name : 'N/A';
    let buyer_name_FTRP = this.collection_data.buyer && this.collection_data.buyer.name ? this.collection_data.buyer.fed_tax_pay : this.collection_data.buyer_legal_entity ? this.collection_data.buyer_legal_entity.fed_tax_pay : 'N/A';
    let legal_rep_name = this.collection_data.seller_legal_entity ? this.collection_data.seller_legal_entity.legal_name : 'N/A';
    let legal_comm_name = this.collection_data.seller_legal_entity ? this.collection_data.seller_legal_entity.comm_name : 'N/A';
    let address;
    let nationality;
    if (this.collection_data.buyer_legal_entity) {
      address = (this.collection_data.buyer_legal_entity.tax_street_address && this.collection_data.buyer_legal_entity.tax_street_address != '0' ? this.collection_data.buyer_legal_entity.tax_street_address + ' ' : '') +
        (this.collection_data.buyer_legal_entity.tax_external_number ? this.collection_data.buyer_legal_entity.tax_external_number : '');
      nationality = this.nationalityDetails.find(item => item.id == this.collection_data.buyer_legal_entity.nationality_id);
    }
    else {
      address = (this.collection_data.buyer.tax_street_address && this.collection_data.buyer.tax_street_address != '0' ? this.collection_data.buyer.tax_street_address + ' ' : '') +
        (this.collection_data.buyer.tax_external_number ? this.collection_data.buyer.tax_external_number : '');
      nationality = this.nationalityDetails.find(item => item.id == this.collection_data.buyer.nationality_id);
    }
    let sign_day = this.signature ? (' ' + self.signature.getDay() + ' ') : ' N/A';
    let month = this.signature ? + self.signature.getMonth() : ' N/A';
    let sign_month = month == 1 ? ' Enero ' : month == 2 ? ' Febrero ' : month == 3 ? ' Marzo ' : month == 4 ? ' Abril ' : month == 5 ? ' Mayo ' : month == 6 ? ' Junio ' : month == 7 ?
      ' Julio ' : month == 8 ? ' Agosto ' : month == 9 ? ' Septiembre ' : month == 10 ? ' Octubre ' : month == 11 ? ' Noviembre ' : month == 12 ? ' Diciembre ' : ' N/A ';
    let concept_month_no = concept_monthly.date ? new Date(concept_monthly.date).getMonth() : 'N/A';
    let concept_month = concept_month_no == 1 ? 'Enero' : concept_month_no == 2 ? 'Febrero' : concept_month_no == 3 ? 'Marzo' : concept_month_no == 4 ? 'Abril' : 
    concept_month_no == 5 ? 'Mayo' : concept_month_no == 6 ? 'Junio' : concept_month_no == 7 ? 'Julio' : concept_month_no == 8 ? 'Agosto' : concept_month_no == 9 ? 
    'Septiembre' : concept_month_no == 10 ? 'Octubre' : concept_month_no == 11 ? 'Noviembre' : concept_month_no == 12 ? 'Diciembre' : 'N/A';
    let concept_last_month_no = concept_last_monthly.date ? new Date(concept_last_monthly.date).getMonth() : 'N/A';
    let concept_last_month = concept_last_month_no == 1 ? 'Enero' : concept_last_month_no == 2 ? 'Febrero' : concept_last_month_no == 3 ? 'Marzo' : 
    concept_last_month_no == 4 ? 'Abril' : concept_last_month_no == 5 ? 'Mayo' : concept_last_month_no == 6 ? 'Junio' : concept_last_month_no == 7 ? 'Julio' : 
    concept_last_month_no == 8 ? 'Agosto' : concept_last_month_no == 9 ? 'Septiembre' : concept_last_month_no == 10 ? 'Octubre' : concept_last_month_no == 11 ? 
    'Noviembre' : concept_last_month_no == 12 ? 'Diciembre' : 'N/A';
    let sign_year = this.signature ? (' ' + self.signature.getFullYear()) : ' N/A';
    let sign_year_letter = sign_year ? conver.NumerosALetras(sign_year).replace(' Pesos 00/100 M.N.','') : 'N/A';
    let docDefinition = {
      pageSize: 'LEGAL',
      pageMargins: [40, 40, 40, 60],
      content: [
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract1'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract2'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract2a'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract2b'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract2c'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract3'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract4'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract4a'), bold: true, fontSize: 12 },
                { text: buyer_name.toLocaleUpperCase(), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract5'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract6a'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract7'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract8'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract9'), fontSize: 12 },
              ],
              margin: [0, 15, 0, 0],
            }
          ]
        },
        {
          columns: [
            {
              text: this.translate.instant('generatePDF.botturaContract10'),
              bold: true,
              fontSize: 12,
              alignment: 'center',
              decoration: 'underline',
              margin: [0, 10, 0, 0],
            }
          ]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract11'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract12'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract13'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract14'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract15a'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract16'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract16a'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract17'), fontSize: 12 },
              ],
              margin: [0, 10, 0, 0],
            }
          ]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract18'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract19'), bold: true, fontSize: 12 }
              ],
              margin: [0, 10, 0, 0],
            }
          ]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract20'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract21'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract22'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract23'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract24'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract25'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract26'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract27'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract28'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract29'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract29a'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract29b'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract30'), fontSize: 12 },
                { text: legal_rep_name, bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract31'), bold: true, fontSize: 12 },
                { text: legal_comm_name, bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract32'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract33'),bold: true,  fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract34'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract35'),bold: true,  fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract36'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract37'),bold: true,  fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract38'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract39'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract40'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract41'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract41a'), fontSize: 12 }

              ],
              margin: [0, 10, 0, 0],
            }
          ]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract42'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract43'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract44'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract45'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract46'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract47'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract44'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract48'), fontSize: 12 }
              ],
              margin: [0, 10, 0, 0],
            }
          ]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract49'), fontSize: 12 },
                { text: this.collection_data.property.name, bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract50'), fontSize: 12 },
                { text: this.collection_data.property.floor_num, bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract51'), fontSize: 12 },
                { text: this.collection_data.property.building_configuration.name, bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract52'), fontSize: 12 },
                { text: this.collection_data.property.max_area, bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract53'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract54'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract55'), bold: true, fontSize: 12 }
              ],
              margin: [0, 10, 0, 0],
            }
          ]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract56'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract57'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract44'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract58'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract60'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract44'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract61'), fontSize: 12 }
              ],
              margin: [0, 10, 0, 0]
            }
          ]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract62'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract63'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract63a'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract63b'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract63c'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract63d'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract63a'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract63e'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract64'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract65'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract66'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract67'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract323') + ".", bold: true, fontSize: 12 }
              ],
              margin: [0, 10, 0, 0]
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
              decoration: 'underline',
              margin: [0, 10, 0, 0],
            }
          ]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract68'), bold: true, fontSize: 12, decoration: 'underline' }
              ],
              margin: [0, 10, 0, 0]
            }
          ]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.a'), fontSize: 12 },
              ],
              width: 30,
              margin: [5, 0, 0, 0]
            },
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract69'), fontSize: 12 }
              ],
            }
          ],
          margin: [30, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.b'), fontSize: 12 },
              ],
              width: 30,
              margin: [5, 0, 0, 0]
            },
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract70'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract71'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract72'), fontSize: 12 }
              ],
            }
          ],
          margin: [30, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.c'), fontSize: 12 },
              ],
              width: 30,
              margin: [5, 0, 0, 0]
            },
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract73'), fontSize: 12 }
              ],
            }
          ],
          margin: [30, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.d'), fontSize: 12 },
              ],
              width: 30,
              margin: [5, 0, 0, 0]
            },
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract74'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract75'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract76'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract63a'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract77'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract55'), bold: true, fontSize: 12 }
              ],
            }
          ],
          margin: [30, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.e'), fontSize: 12 },
              ],
              width: 30,
              margin: [5, 0, 0, 0]
            },
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract78'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract63a'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract79'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract63a'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract80'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract63c'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract81'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract63a'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract82'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract64'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract83'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract83a'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract83b'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract46') + ".", bold: true, fontSize: 12 }
              ],
            }
          ],
          margin: [30, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.f'), fontSize: 12 },
              ],
              width: 30,
              margin: [5, 0, 0, 0]
            },
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract84'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract44'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract85'), fontSize: 12 }
              ],
            }
          ],
          margin: [30, 10, 0, 0]
        },
        {
          columns: [
            {
              text: this.translate.instant('generatePDF.botturaContract86'),
              bold: true,
              fontSize: 12,
              decoration: 'underline',
              margin: [0, 10, 0, 5],
            }
          ]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.a'), fontSize: 12 },
              ],
              width: 30,
              margin: [5, 0, 0, 0]
            },
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract87'), fontSize: 12 },
                { text: buyer_name, bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract88'), fontSize: 12 },
                { text: nationality ? nationality.name : 'N/A', bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract89'), fontSize: 12 },
                { text: this.collection_data.buyer && this.collection_data.buyer.dob ? (this.collection_data.buyer.dob + ', ') : 'N/A, ', bold: true, fontSize: 12 },
                {
                  text: this.collection_data.buyer && this.collection_data.buyer.marital_statuses_id ? (this.collection_data.buyer.marital_statuses_id == 1 ?
                    'Soltero ,' : this.collection_data.buyer.marital_statuses_id == 2 ? 'Casado - Bienes mancomunados ,' : this.collection_data.buyer.marital_statuses_id == 2 ?
                      'Casado - Bienes separados ,' : 'N/A, ') : 'N/A, ', bold: true, fontSize: 12
                },
                { text: this.collection_data.buyer.ocupation ? this.collection_data.buyer.ocupation : 'N/A, ', bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract91'), fontSize: 12 },
                { text: address, bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract92'), fontSize: 12 }
              ],
            }
          ],
          margin: [30, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.b'), fontSize: 12 },
              ],
              width: 30,
              margin: [5, 0, 0, 0]
            },
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract93'), fontSize: 12 },
                { text: this.collection_data.buyer.curp ? (this.collection_data.buyer.curp + ', ') : 'N/A, ', bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract94'), fontSize: 12 },
                { text: buyer_name_FTRP + ".", bold: true, fontSize: 12 },
              ]
            }
          ],
          margin: [30, 10, 34, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.c'), fontSize: 12 },
              ],
              width: 30,
              margin: [5, 0, 0, 0]
            },
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract95'), fontSize: 12 },
                { text: this.collection_data.buyer.id_number ? (this.collection_data.buyer.id_number + '.') : 'N/A.', bold: true, fontSize: 12 }
              ],
            }
          ],
          margin: [30, 10, 34, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.d'), fontSize: 12 },
              ],
              width: 30,
              margin: [5, 0, 0, 0]
            },
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract96'), fontSize: 12 }
              ]
            }
          ],
          margin: [30, 10, 34, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.e'), fontSize: 12 },
              ],
              width: 30,
              margin: [5, 0, 0, 0]
            },
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract97'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract27'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract98'), fontSize: 12 }
              ]
            }
          ],
          margin: [30, 10, 34, 0]
        },
        {
          columns: [
            {
              text: [
                { text: '', fontSize: 12 },
              ],
              width: 30,
              margin: [5, 0, 0, 0]
            },
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract99'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract27'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract100'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract101'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract102'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract27'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract103'), fontSize: 12 }
              ]
            }
          ],
          margin: [30, 10, 34, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.f'), fontSize: 12 },
              ],
              width: 30,
              margin: [5, 0, 0, 0]
            },
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract104'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract27'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract105'), fontSize: 12 }
              ]
            }
          ],
          margin: [30, 10, 34, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.g'), fontSize: 12 },
              ],
              width: 30,
              margin: [5, 0, 0, 0]
            },
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract106'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract107'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract63c'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract107a'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract63a'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract107b'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract63c'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract107c'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract107d'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract55'), bold: true, fontSize: 12 }
              ]
            }
          ],
          margin: [30, 10, 34, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.h'), fontSize: 12 },
              ],
              width: 30,
              margin: [5, 0, 0, 0]
            },
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract108'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract27'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract109'), fontSize: 12 }
              ]
            }
          ],
          margin: [30, 10, 34, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.i'), fontSize: 12 },
              ],
              width: 30,
              margin: [5, 0, 0, 0]
            },
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract110'), fontSize: 12 }
              ]
            }
          ],
          margin: [30, 10, 34, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.j'), fontSize: 12 },
              ],
              width: 30,
              margin: [5, 0, 0, 0]
            },
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract110a'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract110b'), fontSize: 12 }
              ]
            }
          ],
          margin: [30, 10, 100, 0]
        },
        {
          columns: [
            {
              text: this.translate.instant('generatePDF.botturaContract111'),
              bold: true,
              fontSize: 12,
              decoration: 'underline',
              margin: [0, 10, 0, 5],
            }
          ]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.a'), fontSize: 12 },
              ],
              width: 30,
              margin: [5, 0, 0, 0]
            },
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract112'), fontSize: 12 }
              ]
            }
          ],
          margin: [30, 10, 34, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.b'), fontSize: 12 },
              ],
              width: 30,
              margin: [5, 0, 0, 0]
            },
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract113'), fontSize: 12 }
              ]
            }
          ],
          margin: [30, 10, 67, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.c'), fontSize: 12 },
              ],
              width: 30,
              margin: [5, 0, 0, 0]
            },
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract114'), fontSize: 12 }
              ]
            }
          ],
          margin: [30, 10, 67, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract115'), fontSize: 12 }
              ],
              margin: [0, 10, 67, 0]
            }
          ]
        },
        {
          columns: [
            {
              columns: [
                {
                  text: this.translate.instant('generatePDF.contractDetail26'),
                  bold: true,
                  fontSize: 12,
                  alignment: 'center',
                  decoration: 'underline',
                  margin: [0, 10, 67, 0],
                }
              ]
            },
          ]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract116'), bold: true, fontSize: 12, decoration: 'underline' },
                { text: this.translate.instant('generatePDF.botturaContract117'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract118'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract6'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract119'), fontSize: 12 }
              ],
            }
          ],
          margin: [0, 10, 67, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract120'), fontSize: 12 },
                { text: this.collection_data.property.name, bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract121'), fontSize: 12 },
                { text: this.collection_data.property.floor_num, bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract122'), fontSize: 12 },
                { text: this.collection_data.property.building_configuration.name, bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract123'), fontSize: 12 },
                { text: this.collection_data.property.max_area, bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract53'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract123a'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract55'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract124'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract63a'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract125'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract126'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract126a'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract126b'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract126c'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract63a'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract126d'), fontSize: 12 }
              ],
              margin: [0, 10, 67, 0]
            }
          ]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract127'), bold: true, fontSize: 12, decoration: 'underline' },
                { text: this.translate.instant('generatePDF.botturaContract128'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract129'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract130'), bold: true, fontSize: 12 }
              ],
              margin: [0, 10, 67, 0]
            }
          ]
        },
        {
          columns: [
            {
              text: [
                {text: '1)', fontSize: 12},
              ],
              width: 30,
              margin: [5, 0, 0, 0]
            },
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract131'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract6'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract132'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract322'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract133'), fontSize: 12 },
                { text: concept_layaway.amount ? this.price.transform(concept_layaway.amount) : 0, bold: true, fontSize: 12 },
                { text: (concept_layaway.amount ? (' (' + conver.NumerosALetras(concept_layaway.amount) + ')') : "N/A"), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract133a'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract323'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract133b'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract322'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract133c'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract133d'), bold: true, fontSize: 12 }
              ],
              margin: [10, 0, 0, 0]
            },
          ],
          margin: [0, 10, 67, 0]
        },
        {
          columns: [
            {
              text: [
                {text: '1.1', fontSize: 12},
              ],
              width: 70,
              margin: [40, 0, 0, 0]
            },
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract134'), fontSize: 12 },
                { text: concept_downpayment.amount ? this.price.transform(concept_downpayment.amount) : 0, bold: true, fontSize: 12 },
                { text: (concept_downpayment.amount ? (' (' + conver.NumerosALetras(concept_downpayment.amount) + ')') : "N/A"), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract135'), fontSize: 12 },
              ],
              margin: [5, 0, 0, 0]
            }
          ],
          margin: [0, 10, 67, 0]
        },
        {
          columns: [
            {
              text: [
                {text: '1.2', fontSize: 12},
              ],
              width: 70,
              margin: [40, 0, 0, 0]
            },
            {
              text: [
                { text: concept_monthly_no ? (' ' + concept_monthly_no.length) : 'N/A', bold: true, fontSize: 12 },
                { text: (concept_monthly_no ? (' (' + conver.NumerosALetras(concept_monthly_no.length) + ') ').replace(' Pesos 00/100 M.N.','') : " (N/A)"), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract135a'), fontSize: 12 },
                { text: concept_monthly.amount ? this.price.transform(concept_monthly.amount) : 0, bold: true, fontSize: 12 },
                { text: (concept_monthly.amount ? (' (' + conver.NumerosALetras(concept_monthly.amount) + ') ') : " (N/A)"), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract135b'), fontSize: 12 },
                { text: concept_month ? concept_month : 'N/A', bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract135c'), fontSize: 12 },
                { text: concept_monthly.date ? (moment(concept_monthly.date).format('YYYY') + '.') : 'N/A.', bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract135d'), fontSize: 12 },
                { text: concept_last_month ? (concept_last_month + '.') : 'N/A.', bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract135c'), fontSize: 12 },
                { text: concept_last_monthly.date ? (moment(concept_last_monthly.date).format('YYYY') + '.') : 'N/A.', bold: true, fontSize: 12 }, 
                { text: this.translate.instant('generatePDF.botturaContract135e'), fontSize: 12 }
              ],
              margin: [5, 0, 0, 0]
            }
          ],
          margin: [0, 10, 67, 0]
        },
        {
          columns: [
            {
              text: [
                {text: '1.3', fontSize: 12},
              ],
              width: 70,
              margin: [40, 0, 0, 0]
            },
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract135f'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract44'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract135g'), fontSize: 12 },
                { text: concept_payment.amount ? this.price.transform(concept_payment.amount) : 0, bold: true, fontSize: 12 },
                { text: (concept_payment.amount ? (' (' + conver.NumerosALetras(concept_payment.amount) + ')') : "N/A"), bold: true, fontSize: 12 },
                { text: ".", fontSize: 12 },
              ],
              margin: [5, 0, 0, 0]
            }
          ],
          margin: [0, 10, 67, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract136'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract44'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract136a'), fontSize: 12 }
              ],
            }
          ],
          margin: [15, 10, 67, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract136b'), fontSize: 12 },
                { text: this.collection_data.bank_reference_id ?  (this.collection_data.bank_reference_id + "\n") : ("N/A" + "\n"), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract137'), fontSize: 12 }
              ],
            }
          ],
          margin: [15, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract46'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract138'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract139'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract140'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract46'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract141'), fontSize: 12 }
              ],
            }
          ],
          margin: [0, 10, 67, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract142'), bold: true, fontSize: 12, decoration: 'underline' },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract143'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract144'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract145'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract63a'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract146'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract63a'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract147'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract63c'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract148'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract63a'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract149'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract64'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract150'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract151'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract151a'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract323') + ".", bold: true, fontSize: 12 }
              ],
            }
          ],
          margin: [0, 10, 67, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract152'), fontSize: 12, bold: true },
                { text: this.translate.instant('generatePDF.botturaContract153'), bold: true, fontSize: 12, decoration: 'underline' },
                { text: this.translate.instant('generatePDF.botturaContract154'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract155'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract156'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract323'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract157'), fontSize: 12 }
              ],
            }
          ],
          margin: [0, 10, 67, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract158'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract323'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract159'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract160'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract323'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract161'), fontSize: 12 }
              ],
            }
          ],
          margin: [0, 10, 67, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract162'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract63a'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract163'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract164'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract323'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract165'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract323'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract166'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract323'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract167'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract168'), fontSize: 12 }
              ],
            }
          ],
          margin: [0, 10, 67, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract169'), fontSize: 12},
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract170'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract63c'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract171'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract63a'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract172'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract64'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract173'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract66'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract174'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract63a'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract175'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract323') + '.', bold: true, fontSize: 12 }
              ],
            }
          ],
          margin: [0, 10, 67, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract176'), bold: true, fontSize: 12, decoration: 'underline' },
                { text: this.translate.instant('generatePDF.botturaContract177'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract178'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract323'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract178a'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract178b'), fontSize: 12 }

              ],
            }
          ],
          margin: [0, 10, 67, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract178c'), bold: true, fontSize: 12, decoration: 'underline' },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract178d'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract323'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract178e'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract178f'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract178g'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract323'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract178h'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract178i'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract178j'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract44'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract178k'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract44'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract178l'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract323'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract178m'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract155'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract178n'), fontSize: 12 }
              ],
            }
          ],
          margin: [0, 10, 67, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract178o'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract178p'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract44'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract178r'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract323'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract178s'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract323'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract178t'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract323'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract178u'), fontSize: 12 },
              ],
            }
          ],
          margin: [0, 10, 67, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract323'), bold: true, fontSize: 12},
                { text: this.translate.instant('generatePDF.botturaContract178v'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract44'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract178w'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract44'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract178x'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract323'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract178y'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract44'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract178z'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract178aa'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract63c'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract178ab'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract44') + ".", bold: true, fontSize: 12 },
              ],
            }
          ],
          margin: [0, 10, 67, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract178ac'), bold: true, fontSize: 12, decoration: 'underline'  },
                { text: this.translate.instant('generatePDF.botturaContract178ad'), fontSize: 12 }
              ],
            }
          ],
          margin: [0, 10, 67, 0]
        },
        {
          columns: [
            {
              text: [
                { text: "a.", fontSize: 12 },
              ],
              width: 70,
              margin: [55, 0, 0, 0]
            },
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract179'), bold: true, fontSize: 12, decoration: 'underline'  },
                { text: this.translate.instant('generatePDF.botturaContract180'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract63a'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract181'), fontSize: 12 }
              ],
              margin: [10, 0, 0, 0]
            },
          ],
          margin: [0, 10, 67, 0]
        },
        {
          columns: [
            {
              text: [
                { text: "b.", fontSize: 12 },
              ],
              width: 70,
              margin: [55, 0, 0, 0]
            },
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract182'), bold: true, fontSize: 12, decoration: 'underline'  },
                { text: this.translate.instant('generatePDF.botturaContract183'), fontSize: 12 },
                { text: this.collection_data.final_price ? this.price.transform(this.collection_data.final_price) : "N/A", bold: true, fontSize: 12 },
                { text: (this.collection_data.final_price ? (' (' + conver.NumerosALetras(this.collection_data.final_price) + ').') : "N/A."), bold: true, fontSize: 12 },
              ],
              margin: [10, 0, 0, 0]
            },
          ],
          margin: [0, 10, 67, 0]
        },
        {
          columns: [
            {
              text: [
                { text: "c.", fontSize: 12 },
              ],
              width: 70,
              margin: [55, 0, 0, 0]
            },
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract184'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract185'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract186'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract187'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract188'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract189'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract323'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract190'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59') + ".", bold: true, fontSize: 12 }
              ],
              margin: [10, 0, 0, 0]
            },
          ],
          margin: [0, 10, 67, 0]
        },
        {
          columns: [
            {
              text: [ 
                { text: this.translate.instant('generatePDF.botturaContract191'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract192'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract63c'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract193'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract194'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract63c'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract195'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract64'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract196'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract66'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract197'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract63a'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract175'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract323') + ".", bold: true, fontSize: 12 }
              ],
            }
          ],
          margin: [0, 10, 67, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract323'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract198'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract199'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract323'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract200'), fontSize: 12 }
              ],
              margin: [0, 10, 67, 0]
            },
          ]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract201'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract202'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract203'), fontSize: 12 }
              ],
              margin: [0, 10, 67, 0]
            },
          ]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract204'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract44'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract204a'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract63a'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract204b'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract46'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract205'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract44'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract206'), fontSize: 12 }
              ],
              margin: [0, 10, 67, 0]
            },
          ]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract207'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract44'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract208'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract46'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract209'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract63c') + ".", bold: true, fontSize: 12 }
              ],
              margin: [0, 0, 67, 0]
            },
          ]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract210'), bold: true, fontSize: 12, decoration: 'underline' },
                { text: this.translate.instant('generatePDF.botturaContract128'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract211'), fontSize: 12 },
              ],
              margin: [0, 10, 67, 0]
            },
          ]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract212'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract213'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract44'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract214'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract46'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract215'), fontSize: 12 }
              ],
              margin: [0, 10, 67, 0]
            },
          ]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract216'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract44'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract175'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract46'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract217'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract218'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract219'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract46'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract220'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract221'), fontSize: 12 }
              ],
              margin: [0, 10, 0, 0]
            },
          ]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract212'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract46'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract222'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract223'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract224'), fontSize: 12 }
              ],
              margin: [0, 10, 0, 0]
            },
          ]
        },
        {
          columns: [
            {
              text: [
                { text: "I.        ", bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract212'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract46'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract225'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59') + ".", bold: true, fontSize: 12 }
              ],
              margin: [0, 10, 0, 0]
            },
          ]
        },
        {
          columns: [
            {
              text: [
                { text: "II.        ", bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract212'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract46'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract226'), fontSize: 12 }
              ],
              margin: [0, 10, 0, 0]
            },
          ]
        },
        {
          columns: [
            {
              text: [
                { text: "III.        ", bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract212'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract46'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract227'), fontSize: 12 }
              ],
              margin: [0, 10, 0, 0]
            },
          ]
        },
        {
          columns: [
            {
              text: [
                { text: "IV.        ", bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract212'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract46'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract228'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract229'), fontSize: 12 },
              ],
              margin: [0, 10, 0, 0]
            },
          ]
        },
        {
          columns: [
            {
              text: [
                { text: "V.        ", bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract230'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract46'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract231'), fontSize: 12 }
              ],
              margin: [0, 10, 0, 0]
            },
          ]
        },
        {
          columns: [
            {
              text: [
                { text: "VI.        ", bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract212'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract46'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract232'), fontSize: 12 }
              ],
              margin: [0, 30, 0, 0]
            },
          ]
        },
        {
          columns: [
            {
              text: [
                { text: "VII.        ", bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract233'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract46'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract234'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract235'), fontSize: 12 }
              ],
              margin: [0, 10, 0, 0]
            },
          ]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract212'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract236'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract46'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract237'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract238'), fontSize: 12 }
              ],
              margin: [0, 10, 0, 0]
            },
          ]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract239'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract44'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract240'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract46'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract241'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract242'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract44'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract243'), fontSize: 12 }
              ],
              margin: [0, 10, 0, 0]
            },
          ]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract244'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract44'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract245'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract246'), fontSize: 12 }
              ],
              margin: [0, 0, 0, 0]
            },
          ]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract212'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract46'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract247'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract248'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract249'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract44'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract250'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract251'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract46'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract252'), fontSize: 12 },
              ],
              margin: [0, 10, 0, 0]
            },
          ]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract253'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract46'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract254'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract46'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract255'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract256'), fontSize: 12 },
              ],
              margin: [0, 10, 0, 0]
            },
          ]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract257'), bold: true, fontSize: 12, decoration: 'underline'  },
                { text: this.translate.instant('generatePDF.botturaContract46'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract258'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract46'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract259'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract260'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract46'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract261'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract262'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59') + ".", bold: true, fontSize: 12 }
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract263'), bold: true, fontSize: 12, decoration: 'underline'  },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract264'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract265'), fontSize: 12 }
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract266'), bold: true, fontSize: 12, decoration: 'underline'  },
                { text: this.translate.instant('generatePDF.botturaContract267'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract46'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract268'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract269'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract269a'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract270'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract59'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract271'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract128'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract272'), fontSize: 12 }

              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract273'), bold: true, fontSize: 12, decoration: 'underline' },
                { text: this.translate.instant('generatePDF.botturaContract274'), fontSize: 12 }
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract276') + "\n", bold: true, fontSize: 12,},
                { text: this.translate.instant('generatePDF.botturaContract277'), bold: true, fontSize: 12 },
                { text: address + "\n", bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract278'), bold: true, fontSize: 12 },
                { text: this.collection_data.buyer_legal_entity ? this.collection_data.buyer_legal_entity.email : this.collection_data.buyer.email, bold: true, fontSize: 12 },
                { text: "\n" + this.translate.instant('generatePDF.botturaContract279'), bold: true, fontSize: 12 },
                { text: this.collection_data.buyer_legal_entity ? (this.collection_data.buyer_legal_entity.dial_code + this.collection_data.buyer_legal_entity.phone) : 
                  (this.collection_data.buyer.dial_code + this.collection_data.buyer.phone), bold: true, fontSize: 12 }
                
              ],
              margin: [0, 10, 0, 0]
            },
          ]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract280') + "\n", bold: true, fontSize: 12,},
                { text: this.translate.instant('generatePDF.botturaContract281'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract282') + "\n", fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract283'), bold: true, fontSize: 12 },
                { text: this.collection_data.seller_legal_entity ? this.collection_data.seller_legal_entity.email : this.collection_data.seller.email, bold: true, fontSize: 12 },
                { text: "\n" + this.translate.instant('generatePDF.botturaContract284'), bold: true, fontSize: 12 },
                { text: this.collection_data.seller_legal_entity ? (this.collection_data.seller_legal_entity.dial_code + this.collection_data.seller_legal_entity.phone) : 
                  (this.collection_data.seller.dial_code + this.collection_data.seller.phone), bold: true, fontSize: 12 }
              ],
              margin: [0, 10, 0, 0]
            },
          ]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract285'), bold: true, fontSize: 12, decoration: 'underline' },
                { text: this.translate.instant('generatePDF.botturaContract286'), fontSize: 12 }
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract295'), bold: true, fontSize: 12, decoration: 'underline' },
                { text: this.translate.instant('generatePDF.botturaContract128'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract296'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract128'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract297'), fontSize: 12 }
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract298'), bold: true, fontSize: 12, decoration: 'underline' },
                { text: this.translate.instant('generatePDF.botturaContract299'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract128'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract300'), fontSize: 12 }
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract301'), bold: true, fontSize: 12, decoration: 'underline' },
                { text: this.translate.instant('generatePDF.botturaContract128'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract302'), fontSize: 12 }
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract303'), bold: true, fontSize: 12, decoration: 'underline' },
                { text: this.translate.instant('generatePDF.botturaContract128'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract304'), fontSize: 12 }
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract305'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract128'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract306'), fontSize: 12 }
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract3'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract307'), fontSize: 12 }
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract3'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract308'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract6'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract309'), fontSize: 12 }
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract310'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract6'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract311'), fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract3'), bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract312'), fontSize: 12 }
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract313'), bold: true, fontSize: 12, decoration: 'underline' },
                { text: this.translate.instant('generatePDF.botturaContract314'), fontSize: 12 }
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract315'), bold: true, fontSize: 12, decoration: 'underline' },
                { text: this.translate.instant('generatePDF.botturaContract316'), fontSize: 12 }
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              text: [
                { text: this.translate.instant('generatePDF.botturaContract317'), fontSize: 12 },
                { text: sign_day, bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract318'), fontSize: 12 },
                { text: sign_month, bold: true, fontSize: 12 },
                { text: this.translate.instant('generatePDF.botturaContract319'), fontSize: 12 },
                { text: sign_year, bold: true, fontSize: 12 },
                { text: " (" + sign_year_letter + ").", bold: true, fontSize: 12 }
              ],
            }
          ],
          margin: [0, 10, 0, 0]
        },
        {
          columns: [
            {
              style: 'table1',
              table: {
                headerRows: 1,
                widths: [245, 245],
                body: [
                  [
                    { text: [
                     { text: this.translate.instant('generatePDF.botturaContract3') + "\n", margin: [0, 5, 0, 5] },
                     { text: this.translate.instant('generatePDF.botturaContract320'), italics: true, color: 'gray', margin: [0, 5, 0, 30] },
                    ], border: [true, true, true, true], bold: true, margin: [0, 5, 0, 30] },
                    { text: this.translate.instant('generatePDF.botturaContract6'), border: [true, true, true, true], bold: true, margin: [0, 5, 0, 5] },
                  ],
                  [
                    { text: this.translate.instant('generatePDF.botturaContract321'), border: [true, true, true, true], bold: true, margin: [0, 5, 0, 5] },
                    { text: buyer_name.toUpperCase(), border: [true, true, true, true], bold: true, margin: [0, 5, 0, 5] },
                  ]
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
                text: [
                  { text: self.translate.instant('generatePDF.botturaContractFooter'), fontSize: 11 },
                  { text: buyer_name_first_letter + '/', fontSize: 11 },
                  { text: self.collection_data.id + '\n', fontSize: 11 },
                  { text: self.translate.instant('generatePDF.botturaContractFooter1'), fontSize: 11 },
                  { text: buyer_name , fontSize: 11 },
                  { text: self.translate.instant('generatePDF.botturaContractFooter2') + '\n', fontSize: 11 },
                  { text: self.translate.instant('generatePDF.contractFooter3'), fontSize: 11 },
                  { text: sign_day, fontSize: 11 },
                  { text: self.translate.instant('generatePDF.contractFooter4'), fontSize: 11 },
                  { text: sign_month, fontSize: 11 },
                  { text: self.translate.instant('generatePDF.contractFooter5'), fontSize: 11 },
                  { text: sign_year, fontSize: 11 }
                ]
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
        table: {
          margin: [15, 0, 15, 0]
        },
        table1: {
          alignment: 'center',
          margin: [0, 50, 0, 0]
        },
        table3: {
          alignment: 'center',
          margin: [0, 15, 0, 20]
        }
      }
    }
    pdfMake.createPdf(docDefinition).download(this.translate.instant('generatePDF.botturaPersonContract') + ' ' + current_date.toISOString() + '.pdf');
  }
}
