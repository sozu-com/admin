import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from './admin.service';
import { PricePipe } from '../pipes/price.pipe';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class CreditFormPdfService {
  user_data: any;
  logoImageBase64: any;
  valueScore007: any[] = [];
  valueScore004: any[] = [];
  frequencyPayments: any[] = [];
  contractType: any[] = [];
  accountType: any[] = [];

  constructor(
    private translate: TranslateService,
    private spinner: NgxSpinnerService,
    public admin: AdminService,
    private datePipe: DatePipe,
    private price: PricePipe,
    private http: HttpClient,
  ) {
    this.http.get('../../assets/img/sozu-new-logo.png', { responseType: 'blob' })
      .subscribe(res => {
        const reader = new FileReader();
        reader.onloadend = () => {
          let base64data = reader.result;
          this.logoImageBase64 = base64data;
        }

        reader.readAsDataURL(res);
      });
  }

  getValueScore(data) {
    this.spinner.show();
    forkJoin([
      this.admin.postDataApi('valueScore', { user_id: 13 }),
      this.admin.postDataApi('valueScore007', { user_id: 13 }),
      this.admin.postDataApi('frequencyPayments', { user_id: 13 }),
      this.admin.postDataApi('contractType', { user_id: 13 }),
      this.admin.postDataApi('accountType', { user_id: 13 })
    ]).subscribe(
      success => {
        this.valueScore004 = success[0]['data'];
        this.valueScore007 = success[1]['data'];
        this.frequencyPayments = success[2]['data'];
        this.contractType = success[3]['data'];
        this.accountType = success[4]['data'];
        this.getUserById(13)
      });
  }

  getUserById(data) {
    this.spinner.show();
    //this.getValueScore1();
    this.admin.postDataApi('getXmlFinalData', { user_id: 13 }).subscribe(
      success => {
        this.user_data = success['data'];
        this.generatePaymentReceiptPDF();
        this.spinner.hide();
      });
  }
  // getValueScore1() {
  //   this.admin.postDataApi('valueScore007', { user_id: 13 }).subscribe(
  //     success => {
  //       this.valueScore007 = success['data'];
  //     });
  // }

  generatePaymentReceiptPDF() {
    let self = this
    let current_date = new Date();
    let today_date = this.datePipe.transform(current_date, 'MMM d, y');
    today_date = today_date.includes('Jan') ? today_date.replace('Jan', 'ENE') : today_date.includes('Feb') ? today_date.replace('Feb', 'FEB') :
      today_date.includes('Mar') ? today_date.replace('Mar', 'MAR') : today_date.includes('Apr') ? today_date.replace('Apr', 'ABR') :
        today_date.includes('May') ? today_date.replace('May', 'MAY') : today_date.includes('Jun') ? today_date.replace('Jun', 'JUN') :
          today_date.includes('Jul') ? today_date.replace('Jul', 'JUL') : today_date.includes('Aug') ? today_date.replace('Aug', 'AGO') :
            today_date.includes('Sep') ? today_date.replace('Sep', 'SEP') : today_date.includes('Oct') ? today_date.replace('Oct', 'OCT') :
              today_date.includes('Nov') ? today_date.replace('Nov', 'NOV') : today_date.includes('Dec') ? today_date.replace('Dec', 'DIC') : ' ';
    let docDefinition: any = {
      pageSize: {
        width: 950,
        height: 1200
      },
      content: [
        {
          columns: [
            {
              image: this.logoImageBase64,
              width: 130
            },
            {
              text: '',
              margin: [350, 0, 0, 0]
            },
            {
              style: 'table1',
              table: {
                headerRows: 1,
                widths: [160],
                body: [
                  [
                    { text: 'Fecha de Consulta', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 11, alignment: 'center' }
                  ],
                  [
                    { text: today_date, border: [true, true, true, true], fontSize: 10, alignment: 'center' }
                  ],
                  [
                    { text: 'Número de Consulta', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 11, alignment: 'center' }
                  ],
                  [
                    { text: this.user_data.NumeroControlConsulta ? this.user_data.NumeroControlConsulta : '', border: [true, true, true, true], fontSize: 10, alignment: 'center' }
                  ]
                ],
              },
              layout: {
                hLineColor: function (i, node) {
                  return (i === 0 || i === node.table.body.length) ? '#cccccc' : '#cccccc';
                },
                vLineColor: function (i, node) {
                  return (i === 0 || i === node.table.widths.length) ? '#cccccc' : '#cccccc';
                }
              }
            },
          ]
        },
        {
          columns: [
            { text: 'REPORTE DE BURÓ', bold: true, fontSize: 18, alignment: 'center', margin: [0, 10, 0, 20] },
          ]
        },
        {
          columns: [
            {
              table: {
                headerRows: 1,
                widths: ['*'],
                body: [
                  [
                    { text: 'DATOS GENERALES:', fillColor: '#000000', color: 'white', bold: true, border: [true, true, true, true], fontSize: 12 }
                  ],
                  [
                    {
                      text: [
                        { text: '    Nombre: ', fontSize: 10 },
                        {
                          text: (this.user_data.xml_name && this.user_data.xml_name.PrimerNombre ? (this.user_data.xml_name.PrimerNombre + ' ') : '') +
                            (this.user_data.xml_name && this.user_data.xml_name.SegundoNombre ? (this.user_data.xml_name.SegundoNombre + ' ') : '') +
                            (this.user_data.xml_name && this.user_data.xml_name.ApellidoPaterno ? (this.user_data.xml_name.ApellidoPaterno + ' ') : '') +
                            (this.user_data.xml_name && this.user_data.xml_name.ApellidoMaterno ? (this.user_data.xml_name.ApellidoMaterno + ' ') : ''), fontSize: 11
                        },
                        { text: '                                                                       Fecha de Nacimiento: ', fontSize: 10 },
                        {
                          text: (this.user_data.xml_name && this.user_data.xml_name.FechaNacimiento ? ((this.user_data.xml_name.FechaNacimiento.substring(0, 2) + '/' +
                            this.user_data.xml_name.FechaNacimiento.substring(2, this.user_data.xml_name.FechaNacimiento.length)).substring(0, 5) + '/' +
                            this.user_data.xml_name.FechaNacimiento.substring(4, this.user_data.xml_name.FechaNacimiento.length)) : 'N/A'), fontSize: 11
                        },
                        { text: '                          RFC: ', fontSize: 10 },
                        { text: (this.user_data.xml_name && this.user_data.xml_name['RFC'] ? this.user_data.xml_name['RFC'] : 'N/A'), fontSize: 11 }
                      ], border: [false, false, false, false], margin: [0, 3, 0, 3]
                    }
                  ],
                ],
              }
            },
          ]
        },
        {
          columns: [
            {
              table: {
                headerRows: 1,
                widths: ['*'],
                body: [
                  [
                    { text: 'DOMICILIO (S):', fillColor: '#000000', color: 'white', bold: true, border: [true, true, true, true], fontSize: 12 }
                  ]
                ],
              }
            },
          ]
        },
        {
          columns: [
            {
              style: 'table2',
              table: {
                headerRows: 1,
                widths: ['*', '*', '*', '*', '*', '*', '*'],
                body: [
                  [
                    { text: 'Calle y Número', fillColor: '#cccccc', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: 'Colonia', fillColor: '#cccccc', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: 'Mpio / Ciudad', fillColor: '#cccccc', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: 'Estado', fillColor: '#cccccc', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: 'C.P.', fillColor: '#cccccc', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: 'Teléfono', fillColor: '#cccccc', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: 'Fecha de registro', fillColor: '#cccccc', bold: true, border: [false, false, false, false], fontSize: 10 },
                  ]
                ],
              },
              layout: {
                hLineColor: function (i, node) {
                  return (i === 0 || i === node.table.body.length) ? '#cccccc' : '#cccccc';
                },
                vLineColor: function (i, node) {
                  return (i === 0 || i === node.table.widths.length) ? '#cccccc' : '#cccccc';
                }
              }
            }
          ]
        },
        {
          columns: [
            {
              table: {
                headerRows: 1,
                widths: ['*'],
                body: [
                  [
                    { text: 'EMPLEO(S): ', fillColor: '#000000', color: 'white', bold: true, border: [true, true, true, true], fontSize: 12 }
                  ]
                ],
              }
            },
          ]
        },
        {
          columns: [
            {
              table: {
                headerRows: 1,
                widths: ['*', '*', 60, '*', 50, 40, 80, 60, 50, '*'],
                body: [
                  [
                    { text: 'Compañía', fillColor: '#cccccc', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: 'Calle y Número', fillColor: '#cccccc', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: 'Colonia', fillColor: '#cccccc', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: 'Mpio / Ciudad', fillColor: '#cccccc', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: 'Esta do', fillColor: '#cccccc', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: 'C.P.', fillColor: '#cccccc', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: 'Teléfono', fillColor: '#cccccc', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: 'Puesto', fillColor: '#cccccc', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: 'Sueldo', fillColor: '#cccccc', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: 'Fecha de registro', fillColor: '#cccccc', bold: true, border: [false, false, false, false], fontSize: 10 }
                  ]
                ],
              }
              ,
              layout: {
                hLineColor: function (i, node) {
                  return (i === 0 || i === node.table.body.length) ? '#cccccc' : '#cccccc';
                },
                vLineColor: function (i, node) {
                  return (i === 0 || i === node.table.widths.length) ? '#cccccc' : '#cccccc';
                }
              }
            },
          ]
        },
        {
          columns: [
            {
              style: 'table3',
              table: {
                headerRows: 1,
                widths: ['*'],
                body: [
                  [
                    { text: 'RESUMEN DE CRÉDITOS: ', fillColor: '#000000', color: 'white', bold: true, border: [true, true, true, true], fontSize: 12 }
                  ]
                ],
              }
            },
          ]
        },
        {
          columns: [
            {
              table: {
                style: 'table5',
                headerRows: 1,
                widths: [118, 33, 35, 35, 38, 35, 38, 38, 38, 33, 38, 42, 230],
                body: [
                  [
                    { text: 'Otorgante / Tipo cuenta / Tipo contrato / Clave monetaria', bold: true, border: [false, false, false, false], fontSize: 8 },
                    { text: 'Apertura', bold: true, border: [true, true, true, true], fontSize: 8 },
                    { text: 'Límite de crédito', fillColor: '#cccccc', bold: true, border: [true, true, true, true], fontSize: 8 },
                    { text: 'Crédito máximo', bold: true, border: [true, true, true, true], fontSize: 8 },
                    { text: 'Saldo actual', fillColor: '#cccccc', bold: true, border: [true, true, true, true], fontSize: 8 },
                    { text: 'Monto a pagar', bold: true, border: [true, true, true, true], fontSize: 8 },
                    { text: 'Frecuencia de pagos', fillColor: '#cccccc', bold: true, border: [true, true, true, true], fontSize: 8 },
                    { text: 'Fecha último pago', bold: true, border: [true, true, true, true], fontSize: 8 },
                    { text: 'Fecha última compra', fillColor: '#cccccc', bold: true, border: [true, true, true, true], fontSize: 8 },
                    { text: 'Saldo Vencido', bold: true, border: [true, true, true, true], fontSize: 8 },
                    { text: 'Calificación actual de pago', fillColor: '#cccccc', bold: true, border: [true, true, true, true], fontSize: 8 },
                    { text: 'Fecha actualización de cuenta', bold: true, border: [true, true, true, true], fontSize: 8 },
                    { text: 'Histórico de Pagos Clave de Observación', bold: true, border: [true, true, true, true], fontSize: 8 }
                  ]
                ],
              },
              layout: {
                hLineColor: function (i, node) {
                  return (i === 0 || i === node.table.body.length) ? '#cccccc' : '#cccccc';
                },
                vLineColor: function (i, node) {
                  return (i === 0 || i === node.table.widths.length) ? '#cccccc' : '#cccccc';
                }
              }
            }
          ]
        },
        {
          columns: [
            {
              style: 'table6',
              table: {
                headerRows: 1,
                widths: ['*'],
                body: [
                  [
                    { text: 'ÍNDICE DE CAPACIDAD:', fillColor: '#000000', color: 'white', bold: true, border: [true, true, true, true], fontSize: 12 }
                  ]
                ],
              }
            },
          ]
        },
        {
          columns: [
            {
              style: 'table2',
              table: {
                headerRows: 1,
                widths: [125, 38, 163, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38],
                body: [
                  [
                    { text: 'TOTAL DE CRÉDITOS:', fillColor: '#cccccc', bold: true, border: [true, true, true, true], fontSize: 10 },
                    { text: this.user_data.xml_report ? this.user_data.xml_report[0].NumeroCuentas : 'N/A', bold: true, border: [true, true, true, true], fontSize: 10 },
                    { text: 'Calificación MOP', fillColor: '#000000', color: 'white', bold: true, border: [true, true, true, true], fontSize: 10 },
                    { text: 'MOP0', fillColor: '#000000', color: 'white', bold: true, border: [true, true, true, true], fontSize: 10 },
                    { text: 'MOP1', fillColor: '#000000', color: 'white', bold: true, border: [true, true, true, true], fontSize: 10 },
                    { text: 'MOP2', fillColor: '#000000', color: 'white', bold: true, border: [true, true, true, true], fontSize: 10 },
                    { text: 'MOP3', fillColor: '#000000', color: 'white', bold: true, border: [true, true, true, true], fontSize: 10 },
                    { text: 'MOP4', fillColor: '#000000', color: 'white', bold: true, border: [true, true, true, true], fontSize: 10 },
                    { text: 'MOP5', fillColor: '#000000', color: 'white', bold: true, border: [true, true, true, true], fontSize: 10 },
                    { text: 'MOP6', fillColor: '#000000', color: 'white', bold: true, border: [true, true, true, true], fontSize: 10 },
                    { text: 'MOP7', fillColor: '#000000', color: 'white', bold: true, border: [true, true, true, true], fontSize: 10 },
                    { text: 'MOP96', fillColor: '#000000', color: 'white', bold: true, border: [true, true, true, true], fontSize: 10 },
                    { text: 'MOP97', fillColor: '#000000', color: 'white', bold: true, border: [true, true, true, true], fontSize: 10 },
                    { text: 'MOP99', fillColor: '#000000', color: 'white', bold: true, border: [true, true, true, true], fontSize: 10 },

                  ]
                ]
              },
              layout: {
                hLineColor: function (i, node) {
                  return (i === 0 || i === node.table.body.length) ? 'white' : 'white';
                },
                vLineColor: function (i, node) {
                  return (i === 0 || i === node.table.widths.length) ? 'white' : 'white';
                }
              }
            }
          ]
        },
        {
          columns: [
            {
              style: 'table6',
              table: {
                headerRows: 1,
                widths: [130, 130, 130, 140, 151, 135],
                body: [
                  [
                    { text: 'Créditos fijos e Hipotecarios', fillColor: '#000000', color: 'white', bold: true, border: [true, true, true, true], fontSize: 10 },
                    { text: 'Créditos revolventes ', fillColor: '#000000', color: 'white', bold: true, border: [true, true, true, true], fontSize: 10 },
                    { text: 'Créditos cerrados', fillColor: '#000000', color: 'white', bold: true, border: [true, true, true, true], fontSize: 10 },
                    { text: 'Créditos con morosidad actual', fillColor: '#000000', color: 'white', bold: true, border: [true, true, true, true], fontSize: 10 },
                    { text: 'Créditos con historial de morosidad', fillColor: '#000000', color: 'white', bold: true, border: [true, true, true, true], fontSize: 10 },
                    { text: 'Créditos en aclaración', fillColor: '#000000', color: 'white', bold: true, border: [true, true, true, true], fontSize: 10 }
                  ]
                ],
              },
              layout: {
                hLineColor: function (i, node) {
                  return (i === 0 || i === node.table.body.length) ? 'white' : 'white';
                },
                vLineColor: function (i, node) {
                  return (i === 0 || i === node.table.widths.length) ? 'white' : 'white';
                }
              }
            }
          ]
        },
        {
          columns: [
            {
              style: 'table6',
              table: {
                headerRows: 1,
                widths: [278],
                body: [
                  [
                    { text: 'Mensajes de alerta:', fillColor: '#cccccc', bold: true, border: [false, false, false, false], fontSize: 10 },
                  ]
                ],
              },
              layout: {
                hLineColor: function (i, node) {
                  return (i === 0 || i === node.table.body.length) ? '#cccccc' : '#cccccc';
                },
                vLineColor: function (i, node) {
                  return (i === 0 || i === node.table.widths.length) ? '#cccccc' : '#cccccc';
                }
              }
            },
            {
              style: 'table6',
              table: {
                headerRows: 1,
                widths: [136, 135, 135],
                body: [
                  [
                    { text: 'Fecha apertura crédito más antiguo', fillColor: '#cccccc', bold: true, border: [true, true, true, true], fontSize: 10 },
                    { text: 'Fecha de apertura crédito más reciente', fillColor: '#cccccc', bold: true, border: [true, true, true, true], fontSize: 10 },
                    { text: 'Fecha de la consulta más reciente', fillColor: '#cccccc', bold: true, border: [true, true, true, true], fontSize: 10 }
                  ]
                ],
              },
              layout: {
                hLineColor: function (i, node) {
                  return (i === 0 || i === node.table.body.length) ? '#cccccc' : '#cccccc';
                },
                vLineColor: function (i, node) {
                  return (i === 0 || i === node.table.widths.length) ? '#cccccc' : '#cccccc';
                }
              }
            }
          ]
        },
        {
          columns: [
            {
              style: 'table6',
              table: {
                headerRows: 1,
                widths: [120, 120, 115, 110, 110, 120, 110],
                body: [
                  [
                    { text: 'Historial créditos revolventes', fillColor: '#cccccc', bold: true, border: [true, true, true, true], fontSize: 10 },
                    { text: 'Créditos máximos', fillColor: '#cccccc', bold: true, border: [true, true, true, true], fontSize: 10 },
                    { text: 'Límites de crédito', fillColor: '#cccccc', bold: true, border: [true, true, true, true], fontSize: 10 },
                    { text: 'Saldos actuales', fillColor: '#cccccc', bold: true, border: [true, true, true, true], fontSize: 10 },
                    { text: 'Saldos vencidos', fillColor: '#cccccc', bold: true, border: [true, true, true, true], fontSize: 10 },
                    { text: 'Porcentaje usado de límites de crédito', fillColor: '#cccccc', bold: true, border: [true, true, true, true], fontSize: 10 },
                    { text: 'Total de pagos', fillColor: '#cccccc', bold: true, border: [true, true, true, true], fontSize: 10 }
                  ]
                ],
              },
              layout: {
                hLineColor: function (i, node) {
                  return (i === 0 || i === node.table.body.length) ? '#cccccc' : '#cccccc';
                },
                vLineColor: function (i, node) {
                  return (i === 0 || i === node.table.widths.length) ? '#cccccc' : '#cccccc';
                }
              }
            }
          ]
        },
        {
          columns: [
            {
              style: 'table6',
              table: {
                headerRows: 1,
                widths: [120, 120, 115, 110, 110],
                body: [
                  [
                    { text: 'Historial créditos fijos e hipotecarios', fillColor: '#cccccc', bold: true, border: [true, true, true, true], fontSize: 10 },
                    { text: 'Créditos máximos', fillColor: '#cccccc', bold: true, border: [true, true, true, true], fontSize: 10 },
                    { text: 'Saldos actuales', fillColor: '#cccccc', bold: true, border: [true, true, true, true], fontSize: 10 },
                    { text: 'Saldos vencidos', fillColor: '#cccccc', bold: true, border: [true, true, true, true], fontSize: 10 },
                    { text: 'Total de pagos', fillColor: '#cccccc', bold: true, border: [true, true, true, true], fontSize: 10 }
                  ]
                ],
              },
              layout: {
                hLineColor: function (i, node) {
                  return (i === 0 || i === node.table.body.length) ? '#cccccc' : '#cccccc';
                },
                vLineColor: function (i, node) {
                  return (i === 0 || i === node.table.widths.length) ? '#cccccc' : '#cccccc';
                }
              }
            }
          ]
        },
        {
          columns: [
            {
              style: 'table7',
              table: {
                headerRows: 1,
                widths: [120, 120],
                body: [
                  [
                    { text: 'SCORE:', fillColor: '#000000', color: 'white', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: '', fillColor: '#000000', bold: true, border: [false, false, false, false], fontSize: 10 }
                  ]
                ],
              },
              layout: {
                hLineColor: function (i, node) {
                  return (i === 0 || i === node.table.body.length) ? '#cccccc' : '#cccccc';
                },
                vLineColor: function (i, node) {
                  return (i === 0 || i === node.table.widths.length) ? '#cccccc' : '#cccccc';
                }
              }
            },
            {
              style: 'table6',
              table: {
                headerRows: 1,
                widths: [160, 130, 115],
                body: [
                  [
                    { text: 'ALERTAS HAWK:', fillColor: '#000000', color: 'white', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: '', fillColor: '#000000', border: [false, false, false, false], fontSize: 10 },
                    { text: '', fillColor: '#000000', border: [false, false, false, false], fontSize: 10 }
                  ],
                  [
                    { text: 'Institución:', fillColor: '#cccccc', bold: true, border: [true, true, true, true], fontSize: 10 },
                    { text: 'Mensaje', fillColor: '#cccccc', bold: true, border: [true, true, true, true], fontSize: 10 },
                    { text: 'Fecha de reporte', fillColor: '#cccccc', bold: true, border: [true, true, true, true], fontSize: 10 }
                  ]
                ],
              },
              layout: {
                hLineColor: function (i, node) {
                  return (i === 0 || i === node.table.body.length) ? '#cccccc' : '#cccccc';
                },
                vLineColor: function (i, node) {
                  return (i === 0 || i === node.table.widths.length) ? '#cccccc' : '#cccccc';
                }
              }
            }
          ]
        },
        {
          columns: [
            {
              pageBreak: 'before',
              style: 'table8',
              table: {
                headerRows: 1,
                widths: [120, 120, 115, 110, 110, 120, 110],
                body: [
                  [
                    { text: '', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: '', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: '', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: '', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: '', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: '', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: '', bold: true, border: [false, false, false, false], fontSize: 10 }
                  ],
                  [
                    { text: '', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: '', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: '', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: '', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: '', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: '', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: '', bold: true, border: [false, false, false, false], fontSize: 10 }
                  ]
                ],
              },
              layout: {
                hLineColor: function (i, node) {
                  return (i === 0 || i === node.table.body.length) ? '#cccccc' : '#cccccc';
                },
                vLineColor: function (i, node) {
                  return (i === 0 || i === node.table.widths.length) ? '#cccccc' : '#cccccc';
                }
              }
            }
          ]
        },
        {
          columns: [
            {
              table: {
                headerRows: 1,
                widths: [1, 10, 187],
                body: [
                  [
                    { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 0, 0, 3] },
                    { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 0, 0, 3] },
                    { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 0, 0, 3] }
                  ],
                  [
                    { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 3, 0, 3] },
                    { text: '¿Que significa el Histdrico de Pagos?', colSpan: 2, fillColor: '#cccccc', bold: true, border: [true, true, true, true], fontSize: 10, margin: [0, 3, 0, 3] },
                    { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 3, 0, 3] }
                  ],
                  [
                    { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 3, 0, 3] },
                    { text: '1', alignment: 'center', fillColor: 'white', border: [true, true, true, true], fontSize: 10, margin: [0, 3, 0, 3] },
                    { text: 'Cuenta al corriente', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 3, 0, 3] }
                  ],
                  [
                    { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 3, 0, 3] },
                    { text: '2', alignment: 'center', fillColor: 'yellow', border: [true, true, true, true], fontSize: 10, margin: [0, 3, 0, 3] },
                    { text: 'Cuenta al corCuenta con atraso de 1 a 29 dias', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 3, 0, 3] }
                  ],
                  [
                    { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 3, 0, 3] },
                    { text: '3', alignment: 'center', fillColor: 'yellow', border: [true, true, true, true], fontSize: 10, margin: [0, 3, 0, 3] },
                    { text: 'Cuenta con atraso de 30 a 50 dias', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 3, 0, 3] }
                  ],
                  [
                    { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 0, 0, 3] },
                    { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 0, 0, 3] },
                    { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 0, 0, 3] }
                  ]
                ],
              },
              layout: {
                hLineColor: function (i, node) {
                  return (i === 0 || i === node.table.body.length) ? '#cccccc' : '#cccccc';
                },
                vLineColor: function (i, node) {
                  return (i === 0 || i === node.table.widths.length) ? '#cccccc' : '#cccccc';
                }
              }
            },
            {
              table: {
                headerRows: 1,
                widths: [1, 10, 187],
                body: [
                  [
                    { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 0, 0, 3] },
                    { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 0, 0, 3] },
                    { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 0, 0, 3] }
                  ],
                  [
                    { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 3, 0, 3] },
                    { text: '4', alignment: 'center', fillColor: 'yellow', border: [true, true, true, true], fontSize: 10, margin: [0, 3, 0, 3] },
                    { text: 'Cuenta con atraso de 60 a 89 dias', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 3, 0, 3] }
                  ],
                  [
                    { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 3, 0, 3] },
                    { text: '5', alignment: 'center', fillColor: 'red', border: [true, true, true, true], fontSize: 10, margin: [0, 3, 0, 3] },
                    { text: 'Cuenta con atraso de 90 a 119 dias', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 3, 0, 3] }
                  ],
                  [
                    { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 3, 0, 3] },
                    { text: '6', alignment: 'center', fillColor: 'red', border: [true, true, true, true], fontSize: 10, margin: [0, 3, 0, 3] },
                    { text: 'Cuenta con atraso de 120 a 149 dias', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 3, 0, 3] }
                  ],
                  [
                    { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 3, 0, 3] },
                    { text: '7', alignment: 'center', fillColor: 'red', border: [true, true, true, true], fontSize: 10, margin: [0, 3, 0, 3] },
                    { text: 'Cuenta con atraso de 150 dias hasta 129 meses', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 3, 0, 3] }
                  ],
                  [
                    { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 0, 0, 3] },
                    { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 0, 0, 3] },
                    { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 0, 0, 3] }
                  ]
                ]
              },
              layout: {
                hLineColor: function (i, node) {
                  return (i === 0 || i === node.table.body.length) ? '#cccccc' : '#cccccc';
                },
                vLineColor: function (i, node) {
                  return (i === 0 || i === node.table.widths.length) ? '#cccccc' : '#cccccc';
                }
              }
            },
            {
              table: {
                headerRows: 1,
                widths: [1, 10, 187],
                body: [
                  [
                    { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 0, 0, 3] },
                    { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 0, 0, 3] },
                    { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 0, 0, 3] }
                  ],
                  [
                    { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 3, 0, 3] },
                    { text: '9', alignment: 'center', fillColor: 'red', border: [true, true, true, true], fontSize: 10, margin: [0, 3, 0, 3] },
                    { text: 'Puede significar:', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 3, 0, 3] },
                  ],
                  [
                    { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10 },
                    { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10 },
                    { text: '- Cuenta con atraso de mas de 12 meses', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10 }
                  ],
                  [
                    { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10 },
                    { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10 },
                    { text: '- Cuenta con deuda parical 0 total sin recuperar', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10 }
                  ],
                  [
                    { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10 },
                    { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10 },
                    { text: '- Fraude cometido por el consumidor', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 3, 0, 3] }
                  ],
                  [
                    { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 0, 0, 15] },
                    { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 0, 0, 15] },
                    { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 0, 0, 15] }
                  ]
                ]
              },
              layout: {
                hLineColor: function (i, node) {
                  return (i === 0 || i === node.table.body.length) ? '#cccccc' : '#cccccc';
                },
                vLineColor: function (i, node) {
                  return (i === 0 || i === node.table.widths.length) ? '#cccccc' : '#cccccc';
                }
              }
            },
            {
              table: {
                headerRows: 1,
                widths: [5, 10, 146],
                body: [
                  [
                    { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 0, 0, 3] },
                    { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 0, 0, 3] },
                    { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 0, 0, 3] }
                  ],
                  [
                    { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 3, 0, 3] },
                    { text: 'O', alignment: 'center', fillColor: 'white', border: [true, true, true, true], fontSize: 10, margin: [0, 3, 0, 3] },
                    { text: 'Cuenta muy reciente para ser informada', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10 }
                  ],
                  [
                    { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 3, 0, 3] },
                    { text: 'U', alignment: 'center', fillColor: 'white', border: [true, true, true, true], fontSize: 10, margin: [0, 3, 0, 3] },
                    { text: 'Cuenta sin informacion', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 3, 0, 3] }
                  ],
                  [
                    { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 3, 0, 3] },
                    { text: ' - ', alignment: 'center', fillColor: 'white', border: [true, true, true, true], fontSize: 10, margin: [0, 3, 0, 3] },
                    { text: 'Cuenta no reportada en este periodo', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 3, 0, 3] }
                  ],
                  [
                    { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 3, 0, 3] },
                    { text: '', fillColor: 'cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 3, 0, 3] },
                    { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 3, 0, 3] }
                  ],
                  [
                    { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 0, 0, 9] },
                    { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 0, 0, 9] },
                    { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10, margin: [0, 0, 0, 9] }
                  ]
                ],
              },
              layout: {
                hLineColor: function (i, node) {
                  return (i === 0 || i === node.table.body.length) ? '#cccccc' : '#cccccc';
                },
                vLineColor: function (i, node) {
                  return (i === 0 || i === node.table.widths.length) ? '#cccccc' : '#cccccc';
                }
              }
            }
          ]
        },
        {
          columns: [
            {
              style: 'table9',
              table: {
                headerRows: 1,
                widths: ['*'],
                body: [
                  [
                    { text: 'Para consulta de buro de crédito especial se puede realizar por los siguientes canales de forma gratuita una vez cada 12 meses:', border: [false, true, false, false], fontSize: 9 }
                  ],
                  [
                    {
                      text: [
                        { text: '-Internet:', border: [false, false, false, false], fontSize: 9 },
                        { text: ' www.burodecredito.com.mx', bold: true, decoration: 'underline', border: [false, false, false, false], fontSize: 9 }
                      ],
                      border: [false, false, false, false],
                      margin: [8, 0, 0, 0]
                    }
                  ],
                  [
                    { text: '-Teléfono en la Ciudad de México: 5449 4954', border: [false, false, false, false], fontSize: 9, margin: [8, 0, 0, 0] }
                  ],
                  [
                    { text: '-Del Interior Lada sin costo: 01 800 640 7920', border: [false, false, false, false], fontSize: 9, margin: [8, 0, 0, 0] }
                  ]
                ],
              }
            }
          ]
        }
      ],
      footer: function (currentPage, pageCount) {
        var t = [
          {
            layout: "noBorders",
            fontSize: 10,
            margin: [40, 0, 40, 0],
            columns: [
              {
                style: 'table6',
                table: {
                  headerRows: 1,
                  widths: ['*',],
                  body: [
                    [
                      { text: 'DOCUMENTO SIN VALOR PROBATORIO EN JUICIOS', fillColor: '#cccccc', alignment: 'center', border: [false, false, false, false], fontSize: 12 },

                    ]
                  ]
                },
                layout: {
                  hLineColor: function (i, node) {
                    return (i === 0 || i === node.table.body.length) ? '#cccccc' : '#cccccc';
                  },
                  vLineColor: function (i, node) {
                    return (i === 0 || i === node.table.widths.length) ? '#cccccc' : '#cccccc';
                  }
                }
              }
            ]
          }
        ];
        return t;
      },
      styles: {
        table1: {
          margin: [158, 0, 0, 0]
        },
        table2: {
          margin: [0, 2, 0, 6]
        },
        table3: {
          margin: [0, 10, 0, 8]
        },
        table4: {
          margin: [0, 0, 0, 8]
        },
        table5: {
          margin: [0, 0, 0, 0]
        },
        table6: {
          margin: [0, 10, 0, 10]
        },
        table7: {
          margin: [0, 10, 30, 10]
        },
        table8: {
          margin: [0, 500, 0, 413]
        },
        table9: {
          margin: [0, 8, 0, 0]
        }
      }
    }
    if (this.user_data.xml_address) {
      this.user_data.xml_address.forEach(item => {
        docDefinition.content[4].columns[0].table.body.push(
          [
            { text: item.Direccion1 ? item.Direccion1 : 'N/A', border: [true, true, true, true], fontSize: 10 },
            { text: item.ColoniaPoblacion ? item.ColoniaPoblacion : 'N/A', border: [true, true, true, true], fontSize: 10 },
            { text: item.DelegacionMunicipio ? item.DelegacionMunicipio : 'N/A', border: [true, true, true, true], fontSize: 10 },
            { text: item.Estado ? item.Estado : 'N/A', border: [true, true, true, true], fontSize: 10 },
            { text: item.CP ? item.CP : 'N/A', border: [true, true, true, true], fontSize: 10 },
            { text: item.NumeroTelefono ? item.NumeroTelefono : 'N/A', border: [true, true, true, true], fontSize: 10 },
            {
              text: item.FechaReporteDireccion ? ((item.FechaReporteDireccion.substring(0, 2) + '/' +
                item.FechaReporteDireccion.substring(2, item.FechaReporteDireccion.length)).substring(0, 5) + '/' +
                item.FechaReporteDireccion.substring(4, item.FechaReporteDireccion.length)) : 'N/A', border: [true, true, true, true], fontSize: 10
            }
          ]
        )
      })
    }
    if (this.user_data.xml_job) {
      if (this.user_data.xml_job && this.user_data.xml_job.length > 0) {
        this.user_data.xml_job.forEach(item => {
          docDefinition.content[6].columns[0].table.body.push(
            [
              { text: item.NombreEmpresa ? item.NombreEmpresa : 'N/A', border: [true, true, true, true], fontSize: 10 },
              { text: item.Direccion1 ? item.Direccion1 : 'N/A', border: [true, true, true, true], fontSize: 10 },
              { text: item.ColoniaPoblacion ? item.ColoniaPoblacion : 'N/A', border: [true, true, true, true], fontSize: 10 },
              { text: item.DelegacionMunicipio ? item.DelegacionMunicipio : 'N/A', border: [true, true, true, true], fontSize: 10 },
              { text: item.Estado ? item.Estado : 'N/A', border: [true, true, true, true], fontSize: 10 },
              { text: item.CP ? item.CP : 'N/A', border: [true, true, true, true], fontSize: 10 },
              { text: item.NumeroTelefono ? item.NumeroTelefono : 'N/A', border: [true, true, true, true], fontSize: 10 },
              { text: item.Cargo ? item.Cargo : 'N/A', border: [true, true, true, true], fontSize: 10 },
              { text: item.Salario ? item.Salario : 'N/A', border: [true, true, true, true], fontSize: 10 },
              { text: item.FechaReportoEmpleo ? item.FechaReportoEmpleo : 'N/A', border: [true, true, true, true], fontSize: 10 }
            ]
          );
        });
      }
      else {
        docDefinition.content[6].columns[0].table.body.push(
          [
            { text: 'N/A', border: [true, true, true, true], fontSize: 10 },
            { text: 'N/A', border: [true, true, true, true], fontSize: 10 },
            { text: 'N/A', border: [true, true, true, true], fontSize: 10 },
            { text: 'N/A', border: [true, true, true, true], fontSize: 10 },
            { text: 'N/A', border: [true, true, true, true], fontSize: 10 },
            { text: 'N/A', border: [true, true, true, true], fontSize: 10 },
            { text: 'N/A', border: [true, true, true, true], fontSize: 10 },
            { text: 'N/A', border: [true, true, true, true], fontSize: 10 },
            { text: 'N/A', border: [true, true, true, true], fontSize: 10 },
            { text: 'N/A', border: [true, true, true, true], fontSize: 10 }
          ]
        )
      }
    }
    if (this.user_data.xml_accounts) {
      this.user_data.xml_accounts.forEach((item, index) => {
        let value = this.frequencyPayments.find(data => data.code == item.FrecuenciaPagos);
        let value1 = this.contractType.find(data => data.code == item.TipoContrato);
        let value2 = this.accountType.find(data => data.code == item.TipoCuenta);
        docDefinition.content[8].columns[0].table.body.push(
          [
            {
              table: {
                style: 'table5',
                headerRows: 1,
                widths: [10, 92],
                body: [
                  [
                    { text: (index + 1) + '.', fontSize: 8, width: 10, fillColor: '#000000', color: 'white', border: [false, false, false, false] },
                    {
                      text: [
                        { text: (item.NombreOtorgante || 'N/A') + '\n', bold: true, fontSize: 8 },
                        { text: (value2.description || 'N/A') + '\n' + (value1.description || 'N/A') + '\n' + (item.ClaveUnidadMonetaria || 'N/A'), fontSize: 8 }
                      ], fillColor: '#cccccc', border: [false, false, false, false]
                    }
                  ]
                ]
              }, border: [false, false, false, false]
            },
            {
              text: (item.FechaAperturaCuenta ? ((item.FechaAperturaCuenta.substring(0, 2) + '/' +
                item.FechaAperturaCuenta.substring(2, item.FechaAperturaCuenta.length)).substring(0, 5) + '/' +
                item.FechaAperturaCuenta.substring(4, item.FechaAperturaCuenta.length)) : 'N/A'), border: [true, true, true, true], fontSize: 8
            },
            { text: (this.price.transform(Number(item.LimiteCredito)).replace('$', '') || 'N/A'), border: [true, true, true, true], fontSize: 8 },
            { text: (this.price.transform(Number(item.CreditoMaximo)).replace('$', '') || 'N/A'), border: [true, true, true, true], fontSize: 8 },
            { text: (this.price.transform(Number(item.SaldoActual.replace('+', ''))).replace('$', '') || 'N/A'), border: [true, true, true, true], fontSize: 8 },
            { text: (item.MontoPagar || 'N/A'), border: [true, true, true, true], fontSize: 8 },
            { text: (value.description || 'N/A'), border: [true, true, true, true], fontSize: 8 },
            {
              text: (item.FechaUltimoPago ? ((item.FechaUltimoPago.substring(0, 2) + '/' +
                item.FechaUltimoPago.substring(2, item.FechaUltimoPago.length)).substring(0, 5) + '/' +
                item.FechaUltimoPago.substring(4, item.FechaUltimoPago.length)) : 'N/A'), border: [true, true, true, true], fontSize: 8
            },
            {
              text: (item.FechaUltimaCompra ? ((item.FechaUltimaCompra.substring(0, 2) + '/' +
                item.FechaUltimaCompra.substring(2, item.FechaUltimaCompra.length)).substring(0, 5) + '/' +
                item.FechaUltimaCompra.substring(4, item.FechaUltimaCompra.length)) : 'N/A'), border: [true, true, true, true], fontSize: 8
            },
            { text: (item.SaldoVencido || 'N/A'), border: [true, true, true, true], fontSize: 8 },
            { text: (item.FormaPagoActual || 'N/A'), border: [true, true, true, true], fontSize: 8 },
            {
              text: (item.FechaActualizacion ? ((item.FechaActualizacion.substring(0, 2) + '/' +
                item.FechaActualizacion.substring(2, item.FechaActualizacion.length)).substring(0, 5) + '/' +
                item.FechaActualizacion.substring(4, item.FechaActualizacion.length)) : 'N/A'), border: [true, true, true, true], fontSize: 8
            },
            {
              table: {
                style: 'table5',
                headerRows: 1,
                widths: [17, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
                body:
                  [
                    [
                      { text: 'Mes', fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                      { text: 'E', fontSize: 7, border: [true, true, true, true] },
                      { text: 'F', fontSize: 7, border: [true, true, true, true] },
                      { text: 'M', fontSize: 7, border: [true, true, true, true] },
                      { text: 'A', fontSize: 7, border: [true, true, true, true] },
                      { text: 'M', fontSize: 7, border: [true, true, true, true] },
                      { text: 'J', fontSize: 7, border: [true, true, true, true] },
                      { text: 'J', fontSize: 7, border: [true, true, true, true] },
                      { text: 'A', fontSize: 7, border: [true, true, true, true] },
                      { text: 'S', fontSize: 7, border: [true, true, true, true] },
                      { text: 'O', fontSize: 7, border: [true, true, true, true] },
                      { text: 'N', fontSize: 7, border: [true, true, true, true] },
                      { text: 'D', fontSize: 7, border: [true, true, true, true] },
                    ],
                    [
                      { text: 'MOP histórico más alto: ' + (item.MopHistoricoMorosidadMasGrave || ''), colSpan: 13, fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                      { text: '', fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                      { text: '', fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                      { text: '', fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                      { text: '', fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                      { text: '', fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                      { text: '', fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                      { text: '', fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                      { text: '', fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                      { text: '', fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                      { text: '', fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                      { text: '', fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                      { text: '', fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                    ],
                  ]
              },
              layout: {
                hLineColor: function (i, node) {
                  return (i === 0 || i === node.table.body.length) ? 'white' : 'white';
                },
                vLineColor: function (i, node) {
                  return (i === 0 || i === node.table.widths.length) ? 'white' : 'white';
                }
              }
            }
          ]
        );
      })
    }
    if (this.user_data.xml_report) {
      this.user_data.xml_report.forEach(item => {
        docDefinition.content[10].columns[0].table.body.push(
          [
            { text: '', border: [true, true, true, true], fontSize: 10 },
            { text: '', border: [true, true, true, true], fontSize: 10 },
            { text: 'Número de créditos registrados', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10 },
            { text: item.NumeroMOP0 ? item.NumeroMOP0 : 'N/A', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10 },
            { text: item.NumeroMOP1 ? item.NumeroMOP1 : 'N/A', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10 },
            { text: item.NumeroMOP2 ? item.NumeroMOP2 : 'N/A', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10 },
            { text: item.NumeroMOP3 ? item.NumeroMOP3 : 'N/A', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10 },
            { text: item.NumeroMOP4 ? item.NumeroMOP4 : 'N/A', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10 },
            { text: item.NumeroMOP5 ? item.NumeroMOP5 : 'N/A', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10 },
            { text: item.NumeroMOP6 ? item.NumeroMOP6 : 'N/A', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10 },
            { text: item.NumeroMOP7 ? item.NumeroMOP7 : 'N/A', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10 },
            { text: item.NumeroMOP96 ? item.NumeroMOP96 : 'N/A', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10 },
            { text: item.NumeroMOP97 ? item.NumeroMOP97 : 'N/A', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10 },
            { text: item.NumeroMOP99 ? item.NumeroMOP99 : 'N/A', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10 }
          ]
        );
        docDefinition.content[11].columns[0].table.body.push(
          [
            { text: item.CuentasPagosFijosHipotecas ? item.CuentasPagosFijosHipotecas : 'N/A', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10 },
            { text: item.CuentasRevolventesAbiertas ? item.CuentasRevolventesAbiertas : 'N/A', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10 },
            { text: item.CuentasCerradas ? item.CuentasCerradas : 'N/A', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10 },
            { text: item.CuentasNegativasActuales ? item.CuentasNegativasActuales : 'N/A', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10 },
            { text: item.CuentasClavesHistoriaNegativa ? item.CuentasClavesHistoriaNegativa : 'N/A', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10 },
            { text: item.CuentasDisputa ? item.CuentasDisputa : 'N/A', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10 }
          ]
        );
        let value3Array = item.MensajesAlerta.split("");
        let value3 = '';
        value3Array.forEach((item, index) => {
          if (index == 0) {
            value3 = value3 + (item == 'Y' ? 'Aparece Fecha de defunción en la base de datos. ' : item == 'N' ? '' : '');
          }
          if (index == 1) {
            value3 = value3 + (item == 'Y' ? 'RFC del cliente no corresponde al RFC de la base de datos. ' : item == 'N' ? '' : '');
          }
          if (index == 2) {
            value3 = value3 + (item == 'Y' ? 'Dirección no corresponde a la de la base de datos. ' : item == 'N' ? '' : '');
          }
          if (index == 3) {
            value3 = value3 + (item == 'Y' ? 'Existe información adicional en el Buró de Crédito Comercial. ' : item == 'N' ? '' : '');
          }
          if (index == 4) {
            value3 = value3 + (item == 'Y' ? 'Dirección inválida en la consulta. ' : item == 'N' ? '' : '');
          }
          if (index == 5) {
            value3 = value3 + (item == 'Y' ? 'Usuario con menos de 5 mil registros en el expediente. ' : item == 'N' ? '' : '');
          }

        });
        docDefinition.content[12].columns[0].table.body.push(
          [
            { text: value3 ? value3 : 'N/A', border: [false, false, false, false], fontSize: 10 }
          ]
        );
        docDefinition.content[12].columns[1].table.body.push(
          [
            {
              text: item.FechaAperturaCuentaMasAntigua ? ((item.FechaAperturaCuentaMasAntigua.substring(0, 2) + '/' +
                item.FechaAperturaCuentaMasAntigua.substring(2, item.FechaAperturaCuentaMasAntigua.length)).substring(0, 5) + '/' +
                item.FechaAperturaCuentaMasAntigua.substring(4, item.FechaAperturaCuentaMasAntigua.length)) : 'N/A', border: [true, true, true, true], fontSize: 10
            },
            {
              text: item.FechaAperturaCuentaMasReciente ? ((item.FechaAperturaCuentaMasReciente.substring(0, 2) + '/' +
                item.FechaAperturaCuentaMasReciente.substring(2, item.FechaAperturaCuentaMasReciente.length)).substring(0, 5) + '/' +
                item.FechaAperturaCuentaMasReciente.substring(4, item.FechaAperturaCuentaMasReciente.length)) : 'N/A', border: [true, true, true, true], fontSize: 10
            },
            {
              text: item.FechaSolicitudReporteMasReciente ? ((item.FechaSolicitudReporteMasReciente.substring(0, 2) + '/' +
                item.FechaSolicitudReporteMasReciente.substring(2, item.FechaSolicitudReporteMasReciente.length)).substring(0, 5) + '/' +
                item.FechaSolicitudReporteMasReciente.substring(4, item.FechaSolicitudReporteMasReciente.length)) : 'N/A', border: [true, true, true, true], fontSize: 10
            }
          ]
        );
        docDefinition.content[13].columns[0].table.body.push(
          [
            { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10 },
            { text: item.TotalCreditosMaximosRevolventes ? (this.price.transform(Number(item.TotalCreditosMaximosRevolventes))).replace('$', '') : 'N/A', border: [true, true, true, true], fontSize: 10 },
            { text: item.TotalLimitesCreditoRevolventes ? (this.price.transform(Number(item.TotalLimitesCreditoRevolventes))).replace('$', '') : 'N/A', border: [true, true, true, true], fontSize: 10 },
            { text: item.TotalSaldosActualesRevolventes ? (this.price.transform(Number(item.TotalSaldosActualesRevolventes.replace('+', '')))).replace('$', '') : 'N/A', border: [true, true, true, true], fontSize: 10 },
            { text: item.TotalSaldosVencidosRevolventes ? (this.price.transform(Number(item.TotalSaldosVencidosRevolventes))).replace('$', '') : 'N/A', border: [true, true, true, true], fontSize: 10 },
            { text: item.PctLimiteCreditoUtilizadoRevolventes ? ((Number(item.PctLimiteCreditoUtilizadoRevolventes)) + '%') : 'N/A', border: [true, true, true, true], fontSize: 10 },
            { text: item.TotalPagosRevolventes ? (this.price.transform(Number(item.TotalPagosRevolventes))).replace('$', '') : 'N/A', border: [true, true, true, true], fontSize: 10 }
          ]
        );
        docDefinition.content[14].columns[0].table.body.push(
          [
            { text: '', fillColor: '#cccccc', border: [true, true, true, true], fontSize: 10 },
            { text: item.TotalCreditosMaximosPagosFijos ? (this.price.transform(Number(item.TotalCreditosMaximosPagosFijos))).replace('$', '') : 'N/A', border: [true, true, true, true], fontSize: 10 },
            { text: item.TotalSaldosActualesPagosFijos ? (this.price.transform(Number(item.TotalSaldosActualesPagosFijos))).replace('$', '') : 'N/A', border: [true, true, true, true], fontSize: 10 },
            { text: item.TotalSaldosVencidosPagosFijos ? (this.price.transform(Number(item.TotalSaldosVencidosPagosFijos))).replace('$', '') : 'N/A', border: [true, true, true, true], fontSize: 10 },
            { text: item.TotalPagosPagosFijos ? (this.price.transform(Number(item.TotalPagosPagosFijos))).replace('$', '') : 'N/A', border: [true, true, true, true], fontSize: 10 }
          ]
        )
      });
    }
    if (this.user_data.xml_alert_query) {
      this.user_data.xml_alert_query.forEach(item => {
        docDefinition.content[15].columns[1].table.body.push(
          [
            { text: item.TipoInstitucion ? item.TipoInstitucion : 'N/A', border: [true, true, true, true], fontSize: 10 },
            { text: item.Mensaje ? item.Mensaje : 'N/A', border: [true, true, true, true], fontSize: 10 },
            {
              text: item.FechaReporte ? ((item.FechaReporte.substring(0, 2) + '/' + item.FechaReporte.substring(2, item.FechaReporte.length)).substring(0, 5) + '/' +
                item.FechaReporte.substring(4, item.FechaReporte.length)) : 'N/A', border: [true, true, true, true], fontSize: 10
            }
          ]
        )
      });
    }
    if (this.user_data.xml_value_score) {
      this.user_data.xml_value_score.forEach(item => {
        if (item.CodigoScore == '007') {
          let value = this.valueScore007.find(data => data.code == item.ValorScore);
          docDefinition.content[15].columns[0].table.body.push(
            [
              { text: 'BC SCORE', border: [true, true, true, true], fontSize: 8 },
              { text: value.description, border: [true, true, true, true], fontSize: 6 }
            ]
          )
        }
      });
    }
    if (this.user_data.xml_value_score) {
      this.user_data.xml_value_score.forEach(item => {
        if (item.CodigoScore == '004') {
          let value = this.valueScore004.find(data => data.code == item.ValorScore);
          docDefinition.content[15].columns[0].table.body.push(
            [
              { text: 'SCORE CON INDICE CAPACIDAD CREDITICIA', border: [true, true, true, true], fontSize: 8 },
              { text: value.description, border: [true, true, true, true], fontSize: 6 }
            ]
          )
        }
      });
    }
    if (this.user_data.xml_accounts) {
      this.user_data.xml_accounts.forEach((item, index) => {
        let month_no1 = item.FechaMasRecienteHistoricoPagos.substring(2, 4);
        if (item.HistoricoPagos.length > 0) {
          if (month_no1 == '01') {
            docDefinition.content[8].columns[0].table.body[index + 1][12].table.body.splice(1, 0,
              [
                { text: item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length), fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                (item.HistoricoPagos.length - 1) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 1], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] }
              ]
            );
          }
          if (month_no1 == '02') {
            docDefinition.content[8].columns[0].table.body[index + 1][12].table.body.splice(1, 0,
              [
                { text: item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length), fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                (item.HistoricoPagos.length - 2) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 2], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 1) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 1], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] }
              ]
            );
          }
          if (month_no1 == '03') {
            docDefinition.content[8].columns[0].table.body[index + 1][12].table.body.splice(1, 0,
              [
                { text: item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length), fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                (item.HistoricoPagos.length - 3) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 3], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 2) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 2], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 1) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 1], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] }
              ]
            );
          }
          if (month_no1 == '04') {
            docDefinition.content[8].columns[0].table.body[index + 1][12].table.body.splice(1, 0,
              [
                { text: item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length), fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                (item.HistoricoPagos.length - 4) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 4], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 3) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 3], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 2) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 2], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 1) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 1], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] }
              ]
            );
          }
          if (month_no1 == '05') {
            docDefinition.content[8].columns[0].table.body[index + 1][12].table.body.splice(1, 0,
              [
                { text: item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length), fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                (item.HistoricoPagos.length - 5) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 5], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 4) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 4], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', item, fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 3) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 3], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 2) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 2], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 1) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 1], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] }
              ]
            );
          }
          if (month_no1 == '06') {
            docDefinition.content[8].columns[0].table.body[index + 1][12].table.body.splice(1, 0,
              [
                { text: item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length), fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                (item.HistoricoPagos.length - 6) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 1], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 5) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 2], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 4) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 3], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 3) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 4], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 2) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 5], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 1) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 6], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] }
              ]
            );
          }
          if (month_no1 == '07') {
            docDefinition.content[8].columns[0].table.body[index + 1][12].table.body.splice(1, 0,
              [
                { text: item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length), fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                (item.HistoricoPagos.length - 7) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 7], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 6) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 6], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 5) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 5], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 4) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 4], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 3) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 3], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 2) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 2], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 1) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 1], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] }
              ]
            );
          }
          if (month_no1 == '08') {
            docDefinition.content[8].columns[0].table.body[index + 1][12].table.body.splice(1, 0,
              [
                { text: item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length), fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                (item.HistoricoPagos.length - 8) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 8], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 7) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 7], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 6) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 6], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 5) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 5], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 4) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 4], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 3) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 3], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 2) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 2], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 1) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 1], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] }
              ]
            );
          }
          if (month_no1 == '09') {
            docDefinition.content[8].columns[0].table.body[index + 1][12].table.body.splice(1, 0,
              [
                { text: item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length), fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                (item.HistoricoPagos.length - 9) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 9], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 8) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 8], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 7) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 7], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 6) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 6], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 5) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 5], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 4) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 4], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 3) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 3], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 2) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 2], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 1) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 1], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] }
              ]
            );
          }
          if (month_no1 == '10') {
            docDefinition.content[8].columns[0].table.body[index + 1][12].table.body.splice(1, 0,
              [
                { text: item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length), fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                (item.HistoricoPagos.length - 10) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 10], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 9) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 9], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 8) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 8], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 7) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 7], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 6) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 6], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 5) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 5], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 4) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 4], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 3) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 3], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 2) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 2], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 1) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 1], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] }
              ]
            );
          }
          if (month_no1 == '11') {
            docDefinition.content[8].columns[0].table.body[index + 1][12].table.body.splice(1, 0,
              [
                { text: item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length), fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                (item.HistoricoPagos.length - 11) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 11], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 10) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 10], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 9) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 9], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 8) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 8], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 7) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 7], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 6) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 6], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 5) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 5], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 4) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 4], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 3) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 3], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 2) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 2], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 1) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 1], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                { text: '', fontSize: 7, border: [true, true, true, true] }
              ]
            );
          }
          if (month_no1 == '12') {
            docDefinition.content[8].columns[0].table.body[index + 1][12].table.body.splice(1, 0,
              [
                { text: item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length), fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                (item.HistoricoPagos.length - 12) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 12], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 11) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 11], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 10) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 10], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 9) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 9], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 8) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 8], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 7) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 7], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 6) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 6], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 5) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 5], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 4) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 4], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 3) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 3], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 2) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 2], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 1) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 1], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] }
              ]
            );
          }
        }
      })
    }
    if (this.user_data.xml_accounts) {
      this.user_data.xml_accounts.forEach((item, index) => {
        if (item.HistoricoPagos.length > 0) {
          let month_no1 = item.FechaMasRecienteHistoricoPagos.substring(2, 4);
          if (month_no1 == '01') {
            docDefinition.content[8].columns[0].table.body[index + 1][12].table.body.splice(2, 0,
              [
                { text: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 1, fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                (item.HistoricoPagos.length - 13) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 13], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 12) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 12], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 11) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 11], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 10) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 10], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 9) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 9], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 8) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 8], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 7) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 7], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 6) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 6], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 5) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 5], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 4) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 4], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 3) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 3], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 2) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 2], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] }
              ]
            );
          }
          if (month_no1 == '02') {
            docDefinition.content[8].columns[0].table.body[index + 1][12].table.body.splice(2, 0,
              [
                { text: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 1, fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                (item.HistoricoPagos.length - 14) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 14], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 13) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 13], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 12) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 12], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 11) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 11], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 10) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 10], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 9) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 9], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 8) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 8], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 7) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 7], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 6) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 6], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 5) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 5], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 4) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 4], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 3) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 3], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] }
              ]
            );
          }
          if (month_no1 == '03') {
            docDefinition.content[8].columns[0].table.body[index + 1][12].table.body.splice(2, 0,
              [
                { text: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 1, fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                (item.HistoricoPagos.length - 15) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 15], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 14) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 14], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 13) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 13], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 12) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 12], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 11) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 11], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 10) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 10], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 9) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 9], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 8) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 8], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 7) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 7], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 6) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 6], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 5) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 5], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 4) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 4], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] }
              ]
            );
          }
          if (month_no1 == '04') {
            docDefinition.content[8].columns[0].table.body[index + 1][12].table.body.splice(2, 0,
              [
                { text: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 1, fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                (item.HistoricoPagos.length - 16) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 16], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 15) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 15], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 14) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 14], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 13) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 13], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 12) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 12], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 11) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 11], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 10) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 10], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 9) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 9], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 8) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 8], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 7) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 7], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 6) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 6], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 5) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 5], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] }
              ]
            );
          }
          if (month_no1 == '05') {
            docDefinition.content[8].columns[0].table.body[index + 1][12].table.body.splice(2, 0,
              [
                { text: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 1, fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                (item.HistoricoPagos.length - 17) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 17], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 16) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 16], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 15) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 15], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 14) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 14], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 13) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 13], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 12) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 12], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 11) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 11], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 10) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 10], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 9) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 9], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 8) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 8], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 7) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 7], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 6) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 6], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] }
              ]
            );
          }
          if (month_no1 == '06') {
            docDefinition.content[8].columns[0].table.body[index + 1][12].table.body.splice(2, 0,
              [
                { text: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 1, fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                (item.HistoricoPagos.length - 18) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 18], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 17) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 17], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 16) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 16], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 15) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 15], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 14) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 14], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 13) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 13], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 12) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 12], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 11) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 11], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 10) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 10], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 9) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 9], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 8) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 8], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 7) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 7], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] }
              ]
            );
          }
          if (month_no1 == '07') {
            docDefinition.content[8].columns[0].table.body[index + 1][12].table.body.splice(2, 0,
              [
                { text: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 1, fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                (item.HistoricoPagos.length - 19) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 19], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 18) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 18], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 17) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 17], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 16) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 16], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 15) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 15], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 14) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 14], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 13) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 13], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 12) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 12], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 11) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 11], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 10) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 10], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 9) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 9], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 8) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 8], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] }
              ]
            );
          }
          if (month_no1 == '08') {
            docDefinition.content[8].columns[0].table.body[index + 1][12].table.body.splice(2, 0,
              [
                { text: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 1, fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                (item.HistoricoPagos.length - 20) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 20], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 19) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 19], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 18) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 18], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 17) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 17], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 16) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 16], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 15) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 15], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 14) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 14], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 13) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 13], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 12) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 12], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 11) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 11], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 10) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 10], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 9) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 9], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] }
              ]
            );
          }
          if (month_no1 == '09') {
            docDefinition.content[8].columns[0].table.body[index + 1][12].table.body.splice(2, 0,
              [
                { text: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 1, fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                (item.HistoricoPagos.length - 21) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 21], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 20) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 20], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 19) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 19], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 18) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 18], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 17) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 17], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 16) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 16], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 15) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 15], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 14) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 14], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 13) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 13], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 12) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 12], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 11) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 11], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 10) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 10], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] }
              ]
            );
          }
          if (month_no1 == '10') {
            docDefinition.content[8].columns[0].table.body[index + 1][12].table.body.splice(2, 0,
              [
                { text: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 1, fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                (item.HistoricoPagos.length - 22) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 22], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 21) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 21], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 20) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 20], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 19) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 19], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 18) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 18], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 17) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 17], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 16) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 16], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 15) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 15], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 14) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 14], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 13) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 13], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 12) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 12], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 11) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 11], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] }
              ]
            );
          }
          if (month_no1 == '11') {
            docDefinition.content[8].columns[0].table.body[index + 1][12].table.body.splice(2, 0,
              [
                { text: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 1, fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                (item.HistoricoPagos.length - 23) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 23], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 22) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 22], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 21) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 21], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 20) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 20], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 19) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 19], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 18) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 18], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 17) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 17], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 16) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 16], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 15) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 15], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 14) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 14], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 13) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 13], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 12) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 12], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] }
              ]
            );
          }
          if (month_no1 == '12') {
            docDefinition.content[8].columns[0].table.body[index + 1][12].table.body.splice(2, 0,
              [
                { text: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 1, fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                (item.HistoricoPagos.length - 24) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 24], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 23) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 23], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 22) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 22], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 21) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 21], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 20) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 20], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 19) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 19], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 18) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 18], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 17) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 17], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 16) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 16], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 15) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 15], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 14) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 14], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 13) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 13], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] }
              ]
            );
          }
        }
      })
    }
    if (this.user_data.xml_accounts) {
      this.user_data.xml_accounts.forEach((item, index) => {
        if (item.HistoricoPagos.length > 0) {
          let month_no1 = item.FechaMasRecienteHistoricoPagos.substring(2, 4);
          if (month_no1 == '01') {
            docDefinition.content[8].columns[0].table.body[index + 1][12].table.body.splice(3, 0,
              [
                { text: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 2, fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                (item.HistoricoPagos.length - 25) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 25], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 24) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 24], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 23) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 23], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 22) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 22], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 21) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 21], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 20) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 20], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 19) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 19], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 18) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 18], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 17) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 17], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 16) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 16], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 15) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 15], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 14) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 14], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] }
              ]
            );
          }
          if (month_no1 == '02') {
            docDefinition.content[8].columns[0].table.body[index + 1][12].table.body.splice(3, 0,
              [
                { text: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 2, fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                (item.HistoricoPagos.length - 26) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 26], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 25) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 25], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 24) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 24], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 23) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 23], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 22) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 22], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 21) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 21], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 20) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 20], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 19) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 19], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 18) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 18], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 17) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 17], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 16) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 16], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 15) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 15], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] }
              ]
            );
          }
          if (month_no1 == '03') {
            docDefinition.content[8].columns[0].table.body[index + 1][12].table.body.splice(3, 0,
              [
                { text: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 2, fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                (item.HistoricoPagos.length - 27) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 27], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 26) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 26], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 25) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 25], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 24) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 24], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 23) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 23], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 22) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 22], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 21) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 21], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 20) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 20], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 19) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 19], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 18) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 18], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 17) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 17], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 16) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 16], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] }
              ]
            );
          }
          if (month_no1 == '04') {
            docDefinition.content[8].columns[0].table.body[index + 1][12].table.body.splice(3, 0,
              [
                { text: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 2, fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                (item.HistoricoPagos.length - 28) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 28], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 27) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 27], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 26) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 26], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 25) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 25], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 24) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 24], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 23) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 23], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 22) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 22], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 21) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 21], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 20) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 20], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 19) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 19], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 18) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 18], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 17) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 17], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] }
              ]
            );
          }
          if (month_no1 == '05') {
            docDefinition.content[8].columns[0].table.body[index + 1][12].table.body.splice(3, 0,
              [
                { text: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 2, fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                (item.HistoricoPagos.length - 29) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 29], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 28) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 28], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 27) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 27], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 26) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 26], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 25) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 25], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 24) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 24], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 23) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 23], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 22) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 22], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 21) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 21], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 20) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 20], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 19) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 19], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 18) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 18], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] }
              ]
            );
          }
          if (month_no1 == '06') {
            docDefinition.content[8].columns[0].table.body[index + 1][12].table.body.splice(3, 0,
              [
                { text: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 2, fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                (item.HistoricoPagos.length - 30) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 30], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 29) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 29], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 28) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 28], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 27) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 27], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 26) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 26], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 25) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 25], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 24) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 24], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 23) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 23], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 22) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 22], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 21) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 21], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 20) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 20], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 19) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 19], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] }
              ]
            );
          }
          if (month_no1 == '07') {
            docDefinition.content[8].columns[0].table.body[index + 1][12].table.body.splice(3, 0,
              [
                { text: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 2, fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                (item.HistoricoPagos.length - 31) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 31], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 30) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 30], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 29) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 29], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 28) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 28], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 27) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 27], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 26) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 26], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 25) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 25], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 24) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 24], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 23) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 23], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 22) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 22], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 21) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 21], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 20) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 20], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] }
              ]
            );
          }
          if (month_no1 == '08') {
            docDefinition.content[8].columns[0].table.body[index + 1][12].table.body.splice(3, 0,
              [
                { text: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 2, fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                (item.HistoricoPagos.length - 32) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 32], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 31) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 31], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 30) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 30], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 29) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 29], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 28) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 28], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 27) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 27], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 26) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 26], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 25) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 25], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 24) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 24], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 23) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 23], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 22) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 22], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 21) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 21], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] }
              ]
            );
          }
          if (month_no1 == '09') {
            docDefinition.content[8].columns[0].table.body[index + 1][12].table.body.splice(3, 0,
              [
                { text: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 2, fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                (item.HistoricoPagos.length - 33) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 33], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 32) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 32], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 31) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 31], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 30) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 30], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 29) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 29], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 28) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 28], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 27) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 27], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 26) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 26], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 25) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 25], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 24) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 24], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 23) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 23], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 22) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 22], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] }
              ]
            );
          }
          if (month_no1 == '10') {
            docDefinition.content[8].columns[0].table.body[index + 1][12].table.body.splice(3, 0,
              [
                { text: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 2, fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                (item.HistoricoPagos.length - 34) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 34], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 33) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 33], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 32) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 32], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 31) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 31], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 30) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 30], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 29) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 29], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 28) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 28], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 27) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 27], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 26) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 26], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 25) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 25], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 24) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 24], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 23) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 23], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] }
              ]
            );
          }
          if (month_no1 == '11') {
            docDefinition.content[8].columns[0].table.body[index + 1][12].table.body.splice(3, 0,
              [
                { text: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 2, fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                (item.HistoricoPagos.length - 35) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 35], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 34) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 34], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 33) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 33], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 32) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 32], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 31) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 31], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 30) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 30], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 29) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 29], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 28) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 28], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 27) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 27], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 26) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 26], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 25) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 25], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 24) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 24], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] }
              ]
            );
          }
          if (month_no1 == '12') {
            docDefinition.content[8].columns[0].table.body[index + 1][12].table.body.splice(3, 0,
              [
                { text: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 2, fontSize: 7, fillColor: '#cccccc', border: [true, true, true, true] },
                (item.HistoricoPagos.length - 36) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 36], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 35) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 35], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 34) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 34], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 33) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 33], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 32) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 32], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 31) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 31], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 30) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 30], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 29) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 29], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 28) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 28], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 27) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 27], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 26) >= 0 ? ({ text: item.HistoricoPagos[item.HistoricoPagos.length - 26], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] }) :
                  { text: '', fontSize: 7, border: [true, true, true, true] },
                (item.HistoricoPagos.length - 25) >= 0 ? { text: item.HistoricoPagos[item.HistoricoPagos.length - 25], fillColor: '#cccccc', fontSize: 7, border: [true, true, true, true] } :
                  { text: '', fontSize: 7, border: [true, true, true, true] }
              ]
            );
          }
        }
      })
    }
    pdfMake.createPdf(docDefinition).download(this.translate.instant('Credito') + ' ' + current_date.toISOString() + '.pdf');
  }
}
