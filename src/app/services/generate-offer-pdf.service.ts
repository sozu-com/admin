import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PricePipe } from '../pipes/price.pipe';
import { AdminService } from './admin.service';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { forkJoin } from 'rxjs';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

declare let swal: any;

@Injectable({
  providedIn: 'root',
})
export class GenerateOfferPdfService {
  public paymentBankDetailsArray: any[] = [];
  logoImageBase64: any;
  projectLogoImageBase64: any;
  private bankDetails: any;
  private fedTaxPayer: string;
  base64: any;
  property_array: any;
  offer_array: any;
  offer_id: any;
  is_for_Offer: boolean;
  fullName: string; 3
  public parkingSpaceLotsArray: any[] = [];
  property_count: any;
  offer: any;
  phone: any;
  email: any;

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
    this.admin.loginData$.subscribe(success => {
      this.fullName = success['name'] + ' ' + success['first_surname'] + ' ' + success['second_surname'];
      this.phone = success['phone'] ? success['dial_code'] + ' ' + success['phone'] : '';
      this.email = success['email'];
    });
  }

  makePaymentBankDetailsArray = (bankFor: boolean): void => {
    this.paymentBankDetailsArray = [];
    // this.installmentFormGroup.get('agencyOrSeller').value if true == seller or false == agency
    if (!bankFor) {
      this.fedTaxPayer = (((this.bankDetails || {}).building || {}).agency || {}).fed_tax_pay || '';
      // payment directly received by agency
      if (((this.bankDetails || {}).building || {}).agency_id) {
        // agency banks
        for (let index = 0; index < (((this.bankDetails.building || {}).agency || {}).agency_banks || []).length; index++) {
          const element = this.bankDetails.building.agency.agency_banks[index];
          element.name = 'Agency Bank | ' + element.bank_name;
          element.is_agency = 1;
          element.bank_id = element.id;
          element.legal_rep_bank_id = null;
          element.legal_name = (((this.bankDetails || {}).building || {}).agency || {}).razon_social || '';
          this.paymentBankDetailsArray.push(element);
        }

        // agency legal representative banks
        if (((this.bankDetails.building || {}).agency || {}).legal_representative) {
          for (let index = 0; index < ((this.bankDetails.building.agency.legal_representative || {}).legal_rep_banks || []).length; index++) {
            const element = this.bankDetails.building.agency.legal_representative.legal_rep_banks[index];
            element.name = 'Agency Legal Rep Bank | ' + element.bank_name;
            element.is_agency = 1;
            element.bank_id = null;
            element.legal_rep_bank_id = element.id;
            element.Legal_name = (((this.bankDetails || {}).building || {}).agency || {}).name || '';
            this.paymentBankDetailsArray.push(element);
          }
        }
      }
    } else if (bankFor) {
      if ((((this.bankDetails || {}).selected_seller || {}).user || {}).developer_company || (((this.bankDetails || {}).selected_seller || {}).user || {}).is_developer == 0 && !(((this.bankDetails || {}).selected_seller || {}).user || {}).legal_entity_id) {
        this.fedTaxPayer = (((this.bankDetails || {}).selected_seller || {}).user || {}).fed_tax_pay || '';
        ((((this.bankDetails || {}).selected_seller || {}).user || {}).legal_rep_banks || []).forEach((element, innerIndex) => {
          element.name = 'Seller Bank | ' + element.bank_name;
          element.legal_name = this.bankDetails.selected_seller.user.developer_company ? this.bankDetails.selected_seller.user.developer_company :
            this.bankDetails.selected_seller.user.is_developer == 0 && !this.bankDetails.selected_seller.user.legal_entity_id ? this.bankDetails.selected_seller.user.name + ' ' + this.bankDetails.selected_seller.user.first_surname
              + ' ' + this.bankDetails.selected_seller.user.second_surname : this.bankDetails.selected_seller.user.legal_entity.legal_name ? this.bankDetails.selected_seller.user.legal_entity.legal_name : '';
          this.paymentBankDetailsArray.push(element);
        });
      }
      else {
        this.fedTaxPayer = ((((this.bankDetails || {}).selected_seller || {}).user || {}).legal_entity || {}).fed_tax_pay || '';
        (((((this.bankDetails || {}).selected_seller || {}).user || {}).legal_entity || {}).legal_entity_banks || []).forEach((element, innerIndex) => {
          element.name = 'Seller Bank | ' + element.bank_name;
          element.legal_name = this.bankDetails.selected_seller.user.developer_company ? this.bankDetails.selected_seller.user.developer_company :
            this.bankDetails.selected_seller.user.is_developer == 0 && !this.bankDetails.selected_seller.user.legal_entity_id ? this.bankDetails.selected_seller.user.name + ' ' + this.bankDetails.selected_seller.user.first_surname
              + ' ' + this.bankDetails.selected_seller.user.second_surname : this.bankDetails.selected_seller.user.legal_entity.legal_name ? this.bankDetails.selected_seller.user.legal_entity.legal_name : '';
          this.paymentBankDetailsArray.push(element);
        });
      }
    }
  }

  getParkingSpaceLots = (buildingId: any): void => {
    this.spinner.show();
    forkJoin([
      //this.admin.postDataApi('parkingSpaceLots', { building_id: buildingId || 0 }),
      this.admin.postDataApi('parkingSpaceRent', { building_id: buildingId || 0 }),
    ]).subscribe((response: any[]) => {
      this.spinner.hide();
      this.parkingSpaceLotsArray = response[0].data || [];
      // this.parkingSpaceRentArray = response[1].data;
    });
  }

  offerID(item, propertyDetails, notSave) {
    this.offer = item;
    this.spinner.show();
    this.admin.postDataApi('getBuildingOfferInfo', { property_id: propertyDetails.id }).subscribe((success) => {
      this.spinner.hide();
      this.offer_array = (success || {}).data;
      if (this.offer.is_manual == 1) {
        this.offer_array = [
          {
            discount: item.discount,
            downpayment: item.downpayment,
            monthly_installment: item.monthly_installment,
            number_monthly_payments: item.number_monthly_payments,
            payment_upon_delivery: item.payment_upon_delivery,
            name: null
          }
        ];
        //  this.offer = {
        //     name: item.name,
        //     email: item.email,
        //     country_code: item.country_code,
        //     dial_code: item.dial_code,
        //     phone: item.phone,
        //     note: item.note,

        //  };
      }
      this.property_count = (success || {}).property_count
      // if(this.offer_array.id){
      this.openModaloffer(propertyDetails.id);
      // }
    }, (error) => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), error.error.message, 'error');
    });
  }

  openModaloffer = (property_id): void => {
    // (propertyDetails.property_offer_payment || []).forEach(e => {
    //   this.property_offer_payment = e;
    //  });
    this.spinner.show();
    this.admin.postDataApi('getPropertyDetails', { id: property_id }).subscribe((success) => {
      this.property_array = (success || {}).data;
      //let index = this.property_array.property_offer_payment.findIndex(x=> x.random_id == this.offer_id);
      // this.makePaymentBankDetailsArray(this.property_array.property_offer_payment[index].account_type == 1 ? false : true);
      //this.getParkingSpaceLots(((success || {}).data || {}).building_id);
      // this.is_for_Offer = true;
      this.getBase64ImageFromUrl(this.property_array.id);
      //this.generatePDF1()
      this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), error.error.message, 'error');
    });
  }

  getBase64ImageFromUrl(id) {
    forkJoin([
      this.admin.postDataApi('getPdfImageBaseCode', { id: id })
    ]).subscribe((success: any) => {
      this.base64 = (success[0] || {}).data;
      if (this.base64) {
        this.projectLogoImageBase64 = 'data:image/jpeg;base64,' + this.base64;
      }
      this.spinner.hide();
      this.generatePDF1();
    }, (error) => {
    });
  }

  generatePDF() {
    let current_date = new Date();
    let date = this.datePipe.transform(current_date, 'd/M/y');
    let least_price = this.property_array.min_price;
    let price = this.property_array.min_price;
    let pricePerM2;
    let downpayment;
    let payment_upon_delivery;
    let monthly_installments;
    let discountPer;
    let interestPer;
    let discount;
    let interest;
    let final_price;
    let monthly_installment_amount;
    let index;
    let add_variable = [];
    let bank_detail;
    let layaway_per;
    index = this.property_array.property_offer_payment.findIndex(x => x.random_id == this.offer_id);
    if (this.property_array.property_offer_payment[index].property_parking_lot_sale && this.property_array.property_offer_payment[index].property_parking_lot_sale.length > 0) {
      this.property_array.property_offer_payment[index].property_parking_lot_sale.forEach(element => {
        let parkingPrice = parseInt(element.price) * parseInt(element.parking_lots);
        price = price + parkingPrice;
        price = price + parseInt(element.price);

      });
    }
    discountPer = this.property_array.property_offer_payment[index].discount;
    interestPer = this.property_array.property_offer_payment[index].interest;
    discount = this.property_array.property_offer_payment[index].discount ? (this.property_array.property_offer_payment[index].discount * price) / 100 : 0;
    interest = this.property_array.property_offer_payment[index].interest ? (this.property_array.property_offer_payment[index].interest * price) / 100 : 0;
    final_price = this.property_array.property_offer_payment[index].final_price;
    pricePerM2 = final_price / this.property_array.max_area;
    layaway_per = 20000 * 100 / final_price;
    downpayment = (this.property_array.property_offer_payment[index].down_payment * final_price) / 100;
    monthly_installment_amount = (this.property_array.property_offer_payment[index].monthly_installment * final_price) / 100;
    payment_upon_delivery = (this.property_array.property_offer_payment[index].payment_upon_delivery * final_price) / 100;
    monthly_installments = monthly_installment_amount / this.property_array.property_offer_payment[index].number_of_month;
    let bank_index = this.paymentBankDetailsArray.findIndex(bank => bank.id == this.property_array.property_offer_payment[index].bank_id)
    bank_detail = this.paymentBankDetailsArray[bank_index];
    this.property_array.property_offer_payment[index].property_variable.forEach(element => {
      let variable_amount = element.variable_percentage ? (element.variable_percentage * final_price) / 100 : 0;
      add_variable.push([
        { text: element.variable_name, border: [false, false, false, false], color: '#858291' },
        { text: element.variable_percentage ? element.variable_percentage + '%' : 'N/A', border: [false, false, false, false], bold: true },
        { text: variable_amount ? this.price.transform(Number(variable_amount).toFixed(2)) : '', border: [false, false, false, false], bold: true }
      ]);
    });

    let docDefinition = {
      pageSize: {
        width: 891,
        height: 630
      },
      content: [
        {
          columns: [
            {
              image: this.logoImageBase64,
              width: 100
            },
            {
              text: this.translate.instant('generatePDF.address'),
              margin: [80, 0, 0, 0],
              color: '#858291'
            },
            {

              text: this.translate.instant('generatePDF.addressName') + '\n' + date + '\n' + this.translate.instant('generatePDF.comnercialOfferId') + ' ' + this.offer_id,
              alignment: 'right',
              color: '#858291'
            },
          ]
        },
        {
          columns: [
            [
              this.base64 ?
                {
                  image: this.projectLogoImageBase64,
                  width: 120,
                  height: 20,
                  margin: [0, 0, 0, 20]
                } : {
                  text: ''
                },
              {
                text: this.translate.instant('generatePDF.propertyDetails'),
                bold: true,
                fontSize: 20,
                margin: [0, 0, 0, 20]
              },
              {
                style: 'table',
                table: {
                  headerRows: 1,
                  widths: ['auto', 'auto'],

                  body: [
                    [
                      { text: this.translate.instant('generatePDF.tower'), bold: true, border: [false, false, false, false], color: '#858291' },
                      { text: this.property_array.building_towers.tower_name, border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.floor'), bold: true, border: [false, false, false, false], color: '#858291' },
                      { text: this.property_array.floor_num == 0 ? 'Ground Floor' : this.property_array.floor_num, border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.model'), bold: true, border: [false, false, false, false], color: '#858291' },
                      { text: this.property_array.building_configuration.name, border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.propertyName'), bold: true, border: [false, false, false, false], color: '#858291' },
                      { text: this.property_array.name || 0, border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.parkingPlaces'), bold: true, border: [false, false, false, false], color: '#858291' },
                      { text: this.property_array.parking_count || 0, border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.carpetArea'), bold: true, border: [false, false, false, false], color: '#858291' },
                      { text: this.property_array.max_area, border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.listPrice'), bold: true, border: [false, false, false, false], color: '#858291' },
                      { text: this.price.transform(Number(least_price).toFixed(2)), border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: discountPer ? this.translate.instant('generatePDF.discountP') : this.translate.instant('generatePDF.interestP'), bold: true, border: [false, false, false, false], color: '#858291' },
                      { text: discount ? discountPer + '%' : interest ? interestPer + '%' : 'N/A', border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: discountPer ? this.translate.instant('generatePDF.discountD') : this.translate.instant('generatePDF.interestD') || interestPer, bold: true, border: [false, false, false, false], color: '#858291' },
                      { text: this.price.transform(Number(discount ? discount : interest ? interest : 0).toFixed(2)) || 'N/A', border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.PricePerM2'), bold: true, border: [false, false, false, false], color: '#858291' },
                      { text: this.price.transform(Number(pricePerM2).toFixed(2)), border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.finalPrice'), bold: true, border: [false, false, false, false], color: '#858291' },
                      { text: this.price.transform(Number(final_price).toFixed(2)), border: [false, false, false, false], bold: true },
                    ]
                  ]
                }
              },
              {
                style: 'table2',
                table: {
                  headerRows: 1,
                  widths: ['auto', 'auto'],
                  body: [
                    [
                      { text: this.translate.instant('generatePDF.leadName'), border: [false, false, false, false], bold: true, color: '#858291' },
                      { text: this.property_array.property_offer_payment[index].lead_name || 'N/A', border: [false, false, false, false], bold: true }
                    ],
                    [
                      { text: this.translate.instant('generatePDF.agent'), border: [false, false, false, false], color: '#858291' },
                      { text: this.fullName || 'N/A', border: [false, false, false, false], bold: true }
                    ]
                  ]
                }
              },
            ],
            [
              {
                text: this.translate.instant('generatePDF.commercialOffer'),
                bold: true,
                fontSize: 20,
                margin: [0, 0, 0, 10]
              },
              {
                style: 'table2',
                table: {
                  headerRows: 1,
                  widths: ['auto', 'auto', 'auto'],
                  body: [
                    [
                      { text: this.translate.instant('generatePDF.monthlyPayments'), border: [false, false, false, false], color: '#858291' },
                      { text: this.property_array.property_offer_payment[index].number_of_month || 'N/A', border: [false, false, false, false], bold: true },
                      { text: '', border: [false, false, false, false] }
                    ],
                    [
                      { text: this.translate.instant('generatePDF.monthlyPayment'), border: [false, false, false, false], color: '#858291' },
                      { text: '', border: [false, false, false, false] },
                      { text: monthly_installments ? this.price.transform(Number(monthly_installments || 0).toFixed(2)) : 'N/A', border: [false, false, false, false], bold: true }
                    ],
                    [
                      { text: this.translate.instant('generatePDF.layaway') + ':', border: [false, false, false, false], color: '#858291' },
                      { text: layaway_per ? ((Number(layaway_per).toFixed(3)) + '%') : '', border: [false, false, false, false], bold: true },
                      { text: this.price.transform(20000), border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.downpayment') + ':', border: [false, false, false, false], color: '#858291' },
                      {
                        text: this.is_for_Offer && this.property_array.property_offer_payment[index].down_payment ? ((Number(this.property_array.property_offer_payment[index].down_payment).toFixed(3)) + '%') :
                          'N/A', border: [false, false, false, false], bold: true
                      },
                      { text: downpayment ? this.price.transform(Number(downpayment || 0).toFixed(2)) : '', border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.monthlyPaymentsAmount'), border: [false, false, false, false], color: '#858291' },
                      {
                        text: this.is_for_Offer && this.property_array.property_offer_payment[index].monthly_installment ? this.property_array.property_offer_payment[index].monthly_installment + '%' :
                          'N/A', border: [false, false, false, false], bold: true
                      },
                      { text: monthly_installment_amount ? this.price.transform(Number(monthly_installment_amount).toFixed(2)) : '', border: [false, false, false, false], bold: true }
                    ],
                    [
                      { text: this.translate.instant('generatePDF.PaymentUponDelivery') + ':', border: [false, false, false, true], color: '#858291' },
                      {
                        text: this.is_for_Offer && this.property_array.property_offer_payment[index].payment_upon_delivery ? this.property_array.property_offer_payment[index].payment_upon_delivery + '%' :
                          '', border: [false, false, false, true], bold: true
                      },
                      { text: payment_upon_delivery ? this.price.transform(Number(payment_upon_delivery).toFixed(2)) : 'N/A', border: [false, false, false, true], bold: true }
                    ],
                    [
                      { text: this.translate.instant('generatePDF.finalPrice'), border: [false, false, false, false], bold: true, fontSize: 14 },
                      { text: '', border: [false, false, false, false] },
                      { text: this.price.transform(Number(final_price).toFixed(2)), border: [false, false, false, false], bold: true, fontSize: 14 },
                    ],
                  ]
                }
              },
              {
                text: this.translate.instant('generatePDF.comments'),
                margin: [0, 10, 0, 3],
                bold: true
              },
              {
                text: this.property_array.property_offer_payment[index].notes || '',
                color: '#858291'
              },
              {
                style: 'table2',
                table: {
                  headerRows: 1,
                  widths: ['auto', 'auto'],
                  body: [
                    [
                      { text: this.translate.instant('generatePDF.bankDetails'), border: [false, false, false, false], bold: true, fontSize: 16 },
                      { text: '', border: [false, false, false, false] }
                    ],
                    [
                      { text: this.translate.instant('generatePDF.bank'), border: [false, false, false, false], color: '#858291' },
                      { text: bank_detail && bank_detail.bank_name ? bank_detail.bank_name : 'N/A', border: [false, false, false, false], bold: true }
                    ],
                    [
                      { text: this.translate.instant('generatePDF.accountInNameOf'), border: [false, false, false, false], color: '#858291' },
                      {
                        text: bank_detail && bank_detail.legal_name ? bank_detail.legal_name : 'N/A', border: [false, false, false, false], bold: true
                      },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.federalTaxPayer'), border: [false, false, false, false], color: '#858291' },
                      { text: bank_detail && this.fedTaxPayer ? this.fedTaxPayer : 'N/A', border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.accountNumber'), border: [false, false, false, false], color: '#858291' },
                      { text: bank_detail && bank_detail.account_number ? bank_detail.account_number : 'N/A', border: [false, false, false, false], bold: true }
                    ],
                    [
                      { text: this.translate.instant('generatePDF.cLABE'), border: [false, false, false, false], color: '#858291' },
                      { text: bank_detail && bank_detail.swift ? bank_detail.swift : 'N/A', border: [false, false, false, false], bold: true }
                    ],
                  ]
                }
              },
              {
                text: [
                  { text: this.translate.instant('generatePDF.contactUS') + '\n' + this.translate.instant('generatePDF.contactUS2'), color: '#858291' },
                  { text: ' ' + this.translate.instant('generatePDF.contactUS3'), bold: true },
                  { text: '\n' + this.translate.instant('generatePDF.contactUS4'), color: '#858291' },
                ],
                margin: [0, 10, 0, 10]
              }
            ]
          ],
          margin: [0, 40, 0, 0],
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
          margin: [0, 5, 0, 15],
          border: [false, false, false, false]

        },
        table2: {
          margin: [0, 5, 0, 15],
          border: [false, false, false, false]
        },
      },
    };
    if (add_variable.length > 0) {
      let no = 5;
      add_variable.forEach(element => {
        docDefinition.content[1].columns[1][1].table.body.splice(no, 0, element);
        no = no + 1;
      });
    }
    if (this.property_array.property_offer_payment[index].property_parking_lot_sale && this.property_array.property_offer_payment[index].property_parking_lot_sale.length > 0) {
      let no = 7;
      let count = 1;
      this.property_array.property_offer_payment[index].property_parking_lot_sale.forEach(element => {
        let parkingName = this.parkingSpaceLotsArray.find(parking => parking.id == element.parking_type);
        if (parkingName) {
          docDefinition.content[1].columns[0][2].table.body.splice(no, 0, [
            { text: this.translate.instant('generatePDF.parkingForSale') + ' ' + (this.translate.defaultLang == 'en' ? parkingName.name_en : parkingName.name_es) + ':', bold: true, border: [false, false, false, false], color: '#858291' },
            { text: element.parking_lots, border: [false, false, false, false], bold: true }
          ]);
          // docDefinition.content[1].columns[0][2].table.body.splice(no + 1, 0, [
          //   { text: this.translate.instant('generatePDF.parkingType') + ' ' + (this.translate.defaultLang == 'en'? parkingName.name_en : parkingName.name_es) + ':', bold: true, border: [false, false, false, false], color: '#858291' },
          //   { text: element.parkingLotsType, border: [false, false, false, false], bold: true }
          // ]); 
          docDefinition.content[1].columns[0][2].table.body.splice(no + 1, 0, [
            { text: this.translate.instant('generatePDF.parkingPrice') + ' ' + (this.translate.defaultLang == 'en' ? parkingName.name_en : parkingName.name_es) + ':', bold: true, border: [false, false, false, false], color: '#858291' },
            { text: this.price.transform(Number(element.price).toFixed(2)), border: [false, false, false, false], bold: true }
          ]);
          no = no + 2;
          count = count + 1;
        }
      });
    }
    pdfMake.createPdf(docDefinition).download(this.translate.instant('generatePDF.commercialOffer') + ' ' + current_date.toISOString() + '.pdf');
    // }else if(action === 'print'){
    //   pdfMake.createPdf(docDefinition).print();
    // }else{
    //   pdfMake.createPdf(docDefinition).open();
    // }
  }

  generatePDF1() {
    let current_date = new Date();
    let date = this.datePipe.transform(current_date, 'd/MM/y');
    let last_date = this.datePipe.transform(moment(current_date, "DD-MM-YYYY").add(5, 'days'), 'd/MM/y');;
    // let year = Number(date.substring(6, date.length));
    // let month = Number(date.substring(3, 5)) - 1;
    // let year1 = Number(this.property_array.building.launch_date.substring(0, 4));
    // let month1 = Number(this.property_array.building.launch_date.substring(5, 7)) - 1;
    // let monthCount = moment([year, month, 1]).diff(moment([year1, month, 1]), 'months', true);
    // let monthCount1 = moment([year1, month1, 1]).diff(moment([year, month, 1]), 'months', true);
    // let monthDiffCount = this.property_array.building.launch_date && monthCount > 0 ? monthCount + ' mensualidades:' : this.property_array.building.launch_date &&
    // monthCount1 > 0 ? monthCount1 + ' mensualidades:' : undefined;
    let bank;
    if (this.property_array.selected_seller && this.property_array.selected_seller.user.legal_entity) {
      bank = this.property_array.selected_seller.user.legal_entity.legal_entity_banks.find(item => item.status == 1);
    }
    let docDefinition = {
      pageSize: {
        width: 690,
        height: 980
      },
      content: [
        {
          columns: [
            this.projectLogoImageBase64 ? {
              image: this.projectLogoImageBase64,
              width: 150,
              margin: [0, 5, 0, 0]
            } : {
              text: '',
              width: 150,
              margin: [0, 5, 0, 0]
            },
            {
              image: this.logoImageBase64,
              width: 60,
              margin: [5, 5, 0, 0]
            },
            {
              table: {
                headerRows: 1,
                widths: [1],
                body: [
                  [
                    { text: '', bold: true, border: [false, false, false, false], fontSize: 12 }
                  ],
                ],
              }
            },
            {
              table: {
                style: 'table3',
                headerRows: 1,
                widths: [112, 62],
                body: [
                  [
                    { text: 'Guadalajara, Jalisco, México', colSpan: 2, border: [true, true, true, true], fontSize: 10, alignment: 'center', fillOpacity: 0.05, fillColor: '#575757' },
                    { text: '', border: [false, false, false, false], fontSize: 10, fillOpacity: 0.05, fillColor: '#575757' }
                  ],
                  [
                    { text: 'Fecha de expedición:', border: [true, true, true, true], fontSize: 10, fillOpacity: 0.05, fillColor: '#575757' },
                    { text: date, border: [true, true, true, true], fontSize: 10, fillOpacity: 0.05, fillColor: '#575757' }
                  ],
                  [
                    { text: 'ID de oferta comercial:', border: [true, true, true, true], fontSize: 10, fillOpacity: 0.05, fillColor: '#575757' },
                    { text: this.offer.random_id, border: [true, true, true, true], fontSize: 10, fillOpacity: 0.05, fillColor: '#575757' }
                  ],
                  [
                    { text: 'Oferta vigente hasta:', border: [true, true, true, true], fontSize: 10, fillOpacity: 0.05, fillColor: '#575757' },
                    { text: last_date, border: [true, true, true, true], fontSize: 10, fillOpacity: 0.05, fillColor: '#575757' }
                  ]
                ],
              },
              layout: {
                hLineColor: function (i, node) {
                  return (i === 0 || i === node.table.body.length) ? '#a9a9a9' : '#a9a9a9';
                },
                vLineColor: function (i, node) {
                  return (i === 0 || i === node.table.widths.length) ? '#a9a9a9' : '#a9a9a9';
                }
              }
            }
          ]
        },
        this.property_array.building.show_in_offer == 1 ?
        {
          columns: [
            {
              style: 'table2',
              table: {
                headerRows: 1,
                widths: [120, 80, 70, 80, 208],
                body: [
                  [
                    { text: 'Datos de la propiedad', bold: true, colSpan: 4, border: [false, false, false, false], fontSize: 12 },
                    { text: '', border: [false, false, false, false], fontSize: 10 },
                    { text: '', border: [false, false, false, false], fontSize: 10 },
                    { text: '', border: [false, false, false, false], fontSize: 10 },
                    { text: '', border: [false, false, false, false], fontSize: 10 }
                  ],
                  [
                    { text: 'Torre:', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: this.property_array.building_towers ? this.property_array.building_towers.tower_name : 'N/A', border: [false, false, false, false], fontSize: 10 },
                    { text: 'Precio de lista:', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: this.price.transform(Number(this.property_array.min_price).toFixed(2)), border: [false, false, false, false], fontSize: 10 },
                    { text: '', border: [false, false, false, false], fontSize: 10 }
                  ],
                  [
                    { text: 'Piso:', bold: true, border: [false, false, false, false], fontSize: 10 },
                    {
                      text: this.property_array.floor_num == 0 ? 'Gound Floor' : this.property_array.floor_num > 0 ? this.property_array.floor_num + ' Floor' : 'N?A',
                      border: [false, false, false, false], fontSize: 10
                    },
                    { text: 'Precio m2:', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: this.price.transform(Number(this.property_array.avgg_price).toFixed(2)), border: [false, false, false, false], fontSize: 10 },
                    { text: '', border: [false, false, false, false], fontSize: 10 }
                  ],
                  [
                    { text: 'Modelo:', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: this.property_array.building_configuration ? this.property_array.building_configuration.name : 'N/A', border: [false, false, false, false], fontSize: 10 },
                    { text: '', border: [false, false, false, false], fontSize: 10 },
                    { text: '', border: [false, false, false, false], fontSize: 10 },
                    { text: '', border: [false, false, false, false], fontSize: 10 }
                  ],
                  [
                    { text: 'N° de propiedad:', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: this.property_array ? this.property_array.name : '', border: [false, false, false, false], fontSize: 10 },
                    { text: '', border: [false, false, false, false], fontSize: 10 },
                    { text: '', border: [false, false, false, false], fontSize: 10 },
                    { text: '', border: [false, false, false, false], fontSize: 10 }
                  ],
                  [
                    { text: 'Lugares estacionamiento:', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: this.property_array.parking_count || this.property_array.parking_for_sale ? this.property_array.parking_count + this.property_array.parking_for_sale : '0', border: [false, false, false, false], fontSize: 10 },
                    { text: '', border: [false, false, false, false], fontSize: 10 },
                    { text: '', border: [false, false, false, false], fontSize: 10 },
                    { text: '', border: [false, false, false, false], fontSize: 10 }
                  ],
                  [
                    { text: 'Área:', bold: true, border: [false, false, false, true], fontSize: 10, margin: [0, 0, 0, 10] },
                    { text: this.property_array.max_area || 'N/A', border: [false, false, false, true], fontSize: 10 },
                    { text: '', border: [false, false, false, true], fontSize: 10 },
                    { text: '', border: [false, false, false, true], fontSize: 10 },
                    { text: '', border: [false, false, false, true], fontSize: 10 }
                  ]
                ],
              },
              layout: {
                hLineColor: function (i, node) {
                  return (i === 0 || i === node.table.body.length) ? '#57AE75' : '#57AE75';
                },
                vLineColor: function (i, node) {
                  return (i === 0 || i === node.table.widths.length) ? '#57AE75' : '#57AE75';
                }
              }
            }
          ]
        } : 
        {
          columns: [
            {
              style: 'table2',
              table: {
                headerRows: 1,
                widths: [120, 80, 70, 80, 208],
                body: [
                  [
                    { text: 'Datos de la propiedad', bold: true, colSpan: 4, border: [false, false, false, false], fontSize: 12 },
                    { text: '', border: [false, false, false, false], fontSize: 10 },
                    { text: '', border: [false, false, false, false], fontSize: 10 },
                    { text: '', border: [false, false, false, false], fontSize: 10 },
                    { text: '', border: [false, false, false, false], fontSize: 10 }
                  ],
                  [
                    { text: 'Torre:', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: this.property_array.building_towers ? this.property_array.building_towers.tower_name : 'N/A', border: [false, false, false, false], fontSize: 10 },
                    { text: 'Precio de lista:', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: this.price.transform(Number(this.property_array.min_price).toFixed(2)), border: [false, false, false, false], fontSize: 10 },
                    { text: '', border: [false, false, false, false], fontSize: 10 }
                  ],
                  [
                    { text: 'Piso:', bold: true, border: [false, false, false, false], fontSize: 10 },
                    {
                      text: this.property_array.floor_num == 0 ? 'Gound Floor' : this.property_array.floor_num > 0 ? this.property_array.floor_num + ' Floor' : 'N?A',
                      border: [false, false, false, false], fontSize: 10
                    },
                    { text: '', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: '', border: [false, false, false, false], fontSize: 10 },
                    { text: '', border: [false, false, false, false], fontSize: 10 }
                  ],
                  [
                    { text: 'Modelo:', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: this.property_array.building_configuration ? this.property_array.building_configuration.name : 'N/A', border: [false, false, false, false], fontSize: 10 },
                    { text: '', border: [false, false, false, false], fontSize: 10 },
                    { text: '', border: [false, false, false, false], fontSize: 10 },
                    { text: '', border: [false, false, false, false], fontSize: 10 }
                  ],
                  [
                    { text: 'N° de propiedad:', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: this.property_array ? this.property_array.name : '', border: [false, false, false, false], fontSize: 10 },
                    { text: '', border: [false, false, false, false], fontSize: 10 },
                    { text: '', border: [false, false, false, false], fontSize: 10 },
                    { text: '', border: [false, false, false, false], fontSize: 10 }
                  ],
                  [
                    { text: 'Lugares estacionamiento:', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: this.property_array.parking_count || this.property_array.parking_for_sale ? this.property_array.parking_count + this.property_array.parking_for_sale : '0', border: [false, false, false, false], fontSize: 10 },
                    { text: '', border: [false, false, false, false], fontSize: 10 },
                    { text: '', border: [false, false, false, false], fontSize: 10 },
                    { text: '', border: [false, false, false, false], fontSize: 10 }
                  ],
                  [
                    { text: 'Área:', bold: true, border: [false, false, false, true], fontSize: 10, margin: [0, 0, 0, 10] },
                    { text: this.property_array.max_area || 'N/A', border: [false, false, false, true], fontSize: 10 },
                    { text: '', border: [false, false, false, true], fontSize: 10 },
                    { text: '', border: [false, false, false, true], fontSize: 10 },
                    { text: '', border: [false, false, false, true], fontSize: 10 }
                  ]
                ],
              },
              layout: {
                hLineColor: function (i, node) {
                  return (i === 0 || i === node.table.body.length) ? '#57AE75' : '#57AE75';
                },
                vLineColor: function (i, node) {
                  return (i === 0 || i === node.table.widths.length) ? '#57AE75' : '#57AE75';
                }
              }
            }
          ]
        },
        {
          columns: [
            { text: 'Esquemas de pago', bold: true, fontSize: 12, margin: [5, 5, 0, 0] },
          ]
        },
        {
          columns: [
            {
              style: 'table4',
              table: {
                headerRows: 1,
                widths: [90, 160, 30, 90, 160, 20],
                body: [
                  [
                    { text: 'Datos del vendedor', bold: true, colSpan: 2, border: [false, true, false, false], fontSize: 12, margin: [0, 10, 0, 10] },
                    { text: '', border: [false, true, false, false], fontSize: 10 },
                    { text: '', border: [false, true, false, false], fontSize: 10 },
                    { text: 'Datos del cliente', bold: true, colSpan: 2, border: [false, true, false, false], fontSize: 12, margin: [0, 10, 0, 10] },
                    { text: '', border: [false, true, false, false], fontSize: 10 },
                    { text: '', border: [false, true, false, false], fontSize: 10 }
                  ],
                  [
                    { text: 'Nombre completo:', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: this.fullName, border: [false, false, false, false], fontSize: 10 },
                    { text: '', border: [false, false, false, false], fontSize: 10 },
                    { text: 'Nombre completo:', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: this.offer ? this.offer.name : '', border: [false, false, false, false], fontSize: 10 },
                    { text: '', border: [false, false, false, false], fontSize: 10 }
                  ],
                  [
                    { text: 'Teléfono:', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: this.phone, border: [false, false, false, false], fontSize: 10 },
                    { text: '', border: [false, false, false, false], fontSize: 10 },
                    { text: 'Teléfono:', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: this.offer && this.offer.phone ? this.offer.dial_code + ' ' + this.offer.phone : '', border: [false, false, false, false], fontSize: 10 },
                    { text: '', border: [false, false, false, false], fontSize: 10 }
                  ],
                  [
                    { text: 'Correo electrónico:', bold: true, border: [false, false, false, true], fontSize: 10, margin: [0, 0, 0, 10] },
                    { text: this.email, border: [false, false, false, true], fontSize: 10 },
                    { text: '', border: [false, false, false, true], fontSize: 10 },
                    { text: 'Correo electrónico:', bold: true, border: [false, false, false, true], fontSize: 10 },
                    { text: this.offer && this.offer.email ? this.offer.email : '', border: [false, false, false, true], fontSize: 10 },
                    { text: '', border: [false, false, false, true], fontSize: 10, margin: [0, 0, 0, 10] }
                  ],
                ],
              },
              layout: {
                hLineColor: function (i, node) {
                  return (i === 0 || i === node.table.body.length) ? '#57AE75' : '#57AE75';
                },
                vLineColor: function (i, node) {
                  return (i === 0 || i === node.table.widths.length) ? '#57AE75' : '#57AE75';
                },
                fillColor: function (rowIndex, node, columnIndex) {
                  return (rowIndex % 2 === 0) ? '#FFFFFF' : '#FFFFFF';
                },
                fillOpacity: function (rowIndex, node, columnIndex) {
                  return (rowIndex % 2 === 0) ? 0 : 0;
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
                widths: [90, 120, 70, 140, 137],
                body: [
                  [
                    { text: 'Datos bancarios', bold: true, colSpan: 2, border: [false, false, false, false], fontSize: 12, margin: [0, 10, 0, 10] },
                    { text: '', border: [false, false, false, false], fontSize: 10 },
                    { text: '', border: [false, false, false, false], fontSize: 10 },
                    { text: '', colSpan: 2, border: [false, false, false, false], fontSize: 10 },
                    { text: '', border: [false, false, false, false], fontSize: 10 }
                  ],
                  [
                    { text: 'Banco:', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: bank ? bank.bank_name : '', border: [false, false, false, false], fontSize: 10 },
                    { text: '', border: [false, false, false, false], fontSize: 10 },
                    { text: '', border: [false, false, false, false], fontSize: 10 },
                    { text: '', border: [false, false, false, false], fontSize: 10 }
                  ],
                  [
                    { text: 'Titular:', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: this.property_array.selected_seller && this.property_array.selected_seller.user.legal_entity ? this.property_array.selected_seller.user.legal_entity.legal_name : '', border: [false, false, false, false], fontSize: 10 },
                    { text: '', border: [false, false, false, false], fontSize: 10 },
                    { text: '', border: [false, false, false, false], fontSize: 10 },
                    { text: '', border: [false, false, false, false], fontSize: 10 }
                  ],
                  [
                    { text: 'Número de cuenta:', bold: true, border: [false, false, false, false], fontSize: 10 },
                    { text: bank ? bank.account_number : '', border: [false, false, false, false], fontSize: 10 },
                    { text: '', border: [false, false, false, false], fontSize: 10 },
                    { text: '', border: [false, false, false, false], fontSize: 10 },
                    { text: '', border: [false, false, false, false], fontSize: 10 }
                  ],
                  [
                    { text: 'Cuenta CLABE:', bold: true, border: [false, false, false, true], fontSize: 10, margin: [0, 0, 0, 10] },
                    { text: bank ? bank.swift : '', border: [false, false, false, true], fontSize: 10 },
                    { text: '', border: [false, false, false, true], fontSize: 10 },
                    { text: '', border: [false, false, false, true], fontSize: 10 },
                    { text: '', border: [false, false, false, true], fontSize: 10 }
                  ]
                ],
              },
              layout: {
                hLineColor: function (i, node) {
                  return (i === 0 || i === node.table.body.length) ? '#57AE75' : '#57AE75';
                },
                vLineColor: function (i, node) {
                  return (i === 0 || i === node.table.widths.length) ? '#57AE75' : '#57AE75';
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
                widths: [592],
                body: [
                  [
                    { text: 'Comentarios', bold: true, border: [false, false, false, false], fontSize: 12, margin: [0, 10, 0, 10] }
                  ],
                  [
                    { text: this.offer.note ? this.offer.note : '', border: [false, false, false, true], fontSize: 10, margin: [5, 0, 5, 20] }
                  ]
                ],
              },
              layout: {
                hLineColor: function (i, node) {
                  return (i === 0 || i === node.table.body.length) ? '#a9a9a9' : '#a9a9a9';
                },
                vLineColor: function (i, node) {
                  return (i === 0 || i === node.table.widths.length) ? '#a9a9a9' : '#a9a9a9';
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
                widths: [500],
                body: [
                  [
                    { text: 'Los precios en este documentos están sujetos a disponibilidad. Aplican cambios sin previo aviso.', border: [false, false, false, false], fontSize: 8, margin: [0, 10, 0, 10] }
                  ],
                ],
              }
            }
          ]
        }
      ],
      styles: {
        table2: {
          margin: [0, 25, 0, 0]
        },
        table1: {
          margin: [10, 10, 0, 10]
        },
        table3: {
          alignment: 'right',
          margin: [50, 0, 0, 0]
        },
        table4: {
          margin: [0, 10, 0, 0]
        }
      }
    }

    for (let i = 0; i < Math.round(this.offer_array.length / 2); i++) {
      if (this.offer_array.length == 1) {
        let price = this.property_array.min_price - (Number(this.offer_array[0].discount) * this.property_array.min_price) / 100;
        let diffCount = this.offer_array[0].number_monthly_payments ? this.offer_array[0].number_monthly_payments + ' mensualidades:' :
          'mensualidades:';
        let Monthpayment = Number((Number(this.offer_array[this.offer_array.length - (i + 1)].monthly_installment) * price) / 100);
        let installment = this.offer_array[0].number_monthly_payments ? this.price.transform(Monthpayment / (Number(this.offer_array[0].number_monthly_payments))) : undefined;

        docDefinition.content.splice(3, 0,
          {
            columns: [
              this.offer_array[0].monthly_installment ?
              {
                style: 'table1',
                table: {
                  headerRows: 1,
                  widths: [100, 100],
                  body: [
                    [
                      { text: this.offer_array[0].payment_name, bold: true, colSpan: 2, border: [false, false, false, false], fontSize: 11, margin: [0, 0, 0, 0] },
                      { text: '', border: [false, false, false, false], fontSize: 10 },
                    ],
                    [
                      { text: 'Precio con descuento:', bold: true, border: [false, false, false, false], fontSize: 10, margin: [0, 0, 0, 0] },
                      { text: this.offer_array[0].discount ? this.price.transform(Number(this.property_array.min_price - ((Number(this.offer_array[0].discount) * this.property_array.min_price) / 100)).toFixed(2)) : this.price.transform(Number(this.property_array.min_price).toFixed(2)), border: [false, false, false, false], fontSize: 10 },
                    ],
                    [
                      { text: 'Ahorro:', bold: true, border: [false, false, false, false], fontSize: 10, margin: [0, 0, 0, 0] },
                      { text: this.offer_array[0].discount ? this.price.transform(((Number(this.offer_array[0].discount) * this.property_array.min_price) / 100).toFixed(2)) : this.price.transform(Number(this.property_array.min_price).toFixed(2)), border: [false, false, false, false], fontSize: 10 },
                    ],
                    [
                      { text: 'Enganche:', bold: true, border: [false, false, false, false], fontSize: 10, margin: [0, 0, 0, 0] },
                      {
                        text: [
                          { text: this.offer_array[0].downpayment ? this.offer_array[0].downpayment + '%' : '', bold: true },
                          { text: this.offer_array[0].downpayment ? '  ' + this.price.transform(((Number(this.offer_array[0].downpayment) * price) / 100).toFixed(2)) : "  0" }
                        ], border: [false, false, false, false], fontSize: 10
                      },
                    ],
                    [
                      { text: 'Durante la obra:', bold: true, border: [false, false, false, false], fontSize: 10, margin: [0, 0, 0, 0] },
                      {
                        text: [
                          { text: this.offer_array[0].monthly_installment ? this.offer_array[0].monthly_installment + '%' : '', bold: true },
                          { text: this.offer_array[0].monthly_installment ? '  ' + this.price.transform(((Number(this.offer_array[0].monthly_installment) * price) / 100).toFixed(2)) : "  0" }
                        ], border: [false, false, false, false], fontSize: 10
                      },
                    ],
                    [
                      { text: diffCount, bold: true, border: [false, false, false, false], fontSize: 10, margin: [0, 0, 0, 0] },
                      { text: installment ? installment : '0', border: [false, false, false, false], fontSize: 10 },
                    ],
                    [
                      { text: 'A la entrega:', bold: true, border: [false, false, false, false], fontSize: 10, margin: [0, 0, 0, 0] },
                      {
                        text: [
                          { text: this.offer_array[0].payment_upon_delivery ? this.offer_array[0].payment_upon_delivery + '%' : '', bold: true },
                          { text: this.offer_array[0].payment_upon_delivery ? '  ' + this.price.transform(((Number(this.offer_array[0].payment_upon_delivery) * price) / 100).toFixed(2)) : "0" }
                        ], border: [false, false, false, false], fontSize: 10
                      }
                    ]
                  ],
                },
                layout: {
                  hLineColor: function (i, node) {
                    return (i === 0 || i === node.table.body.length) ? '#57AE75' : '#57AE75';
                  },
                  vLineColor: function (i, node) {
                    return (i === 0 || i === node.table.widths.length) ? '#57AE75' : '#57AE75';
                  },
                  fillColor: function (rowIndex, node, columnIndex) {
                    return (rowIndex % 2 === 0) ? '#57AE75' : '#57AE75';
                  },
                  fillOpacity: function (rowIndex, node, columnIndex) {
                    return (rowIndex % 2 === 0) ? 0.05 : 0.05;
                  }
                }
              } : 
              {
                style: 'table1',
                table: {
                  headerRows: 1,
                  widths: [100, 100],
                  body: [
                    [
                      { text: this.offer_array[0].payment_name, bold: true, colSpan: 2, border: [false, false, false, false], fontSize: 11, margin: [0, 0, 0, 0] },
                      { text: '', border: [false, false, false, false], fontSize: 10 },
                    ],
                    [
                      { text: 'Precio con descuento:', bold: true, border: [false, false, false, false], fontSize: 10, margin: [0, 0, 0, 0] },
                      { text: this.offer_array[0].discount ? this.price.transform(Number(this.property_array.min_price - ((Number(this.offer_array[0].discount) * this.property_array.min_price) / 100)).toFixed(2)) : this.price.transform(Number(this.property_array.min_price).toFixed(2)), border: [false, false, false, false], fontSize: 10 },
                    ],
                    [
                      { text: 'Ahorro:', bold: true, border: [false, false, false, false], fontSize: 10, margin: [0, 0, 0, 0] },
                      { text: this.offer_array[0].discount ? this.price.transform(((Number(this.offer_array[0].discount) * this.property_array.min_price) / 100).toFixed(2)) : this.price.transform(Number(this.property_array.min_price).toFixed(2)), border: [false, false, false, false], fontSize: 10 },
                    ],
                    [
                      { text: 'Enganche:', bold: true, border: [false, false, false, false], fontSize: 10, margin: [0, 0, 0, 0] },
                      { text: [
                        { text: this.offer_array[0].downpayment ? this.offer_array[0].downpayment + '%' : '', bold: true },
                        { text: this.offer_array[0].downpayment ? '  ' + this.price.transform(((Number(this.offer_array[0].downpayment) * price) / 100).toFixed(2)) : "  0" }
                      ],border: [false, false, false, false], fontSize: 10 },
                    ],
                    [
                      { text: 'Durante la obra:', bold: true, border: [false, false, false, false], fontSize: 10, margin: [0, 0, 0, 0] },
                      { text: [
                        { text: this.offer_array[0].monthly_installment ? this.offer_array[0].monthly_installment + '%' : '', bold: true },
                        { text: this.offer_array[0].monthly_installment ? '  ' + this.price.transform(((Number(this.offer_array[0].monthly_installment) * price) / 100).toFixed(2)) : "  0"}
                        ], border: [false, false, false, false], fontSize: 10 },
                    ],
                    [
                      { text: 'A la entrega:', bold: true, border: [false, false, false, false], fontSize: 10, margin: [0, 0, 0, 0] },
                      { text: [
                        { text: this.offer_array[0].payment_upon_delivery ? this.offer_array[0].payment_upon_delivery + '%' : '', bold: true },
                        { text: this.offer_array[0].payment_upon_delivery ? '  ' + this.price.transform(((Number(this.offer_array[0].payment_upon_delivery) * price) / 100).toFixed(2)) : "0"} 
                      ], border: [false, false, false, false], fontSize: 10 
                    }
                    ]
                  ],
                },
                layout: {
                  hLineColor: function (i, node) {
                    return (i === 0 || i === node.table.body.length) ? '#57AE75' : '#57AE75';
                  },
                  vLineColor: function (i, node) {
                    return (i === 0 || i === node.table.widths.length) ? '#57AE75' : '#57AE75';
                  },
                  fillColor: function (rowIndex, node, columnIndex) {
                    return (rowIndex % 2 === 0) ? '#57AE75' : '#57AE75';
                  },
                  fillOpacity: function (rowIndex, node, columnIndex) {
                    return (rowIndex % 2 === 0) ? 0.05 : 0.05;
                  }
                }
              }
            ]
          });
      }
      else {
        let price = this.property_array.min_price - (Number(this.offer_array[this.offer_array.length - (i + 1)].discount) * this.property_array.min_price) / 100;
        let diffCount = this.offer_array[this.offer_array.length - (i + 1)].number_monthly_payments ?
          this.offer_array[this.offer_array.length - (i + 1)].number_monthly_payments + ' mensualidades:' : 'mensualidades:';

        let Monthpayment = Number((Number(this.offer_array[this.offer_array.length - (i + 1)].monthly_installment) * price) / 100);

        let installment = this.offer_array[this.offer_array.length - (i + 1)].number_monthly_payments ? this.price.transform(Monthpayment / (Number(this.offer_array[this.offer_array.length - (i + 1)].number_monthly_payments))) : undefined;

        if (this.offer_array.length - (i + 2)) {
          let price1 = this.property_array.min_price - (Number(this.offer_array[this.offer_array.length - (i + 2)].discount) * this.property_array.min_price) / 100;
          let diffCount1 = this.offer_array[this.offer_array.length - (i + 2)].number_monthly_payments ? this.offer_array[this.offer_array.length - (i + 2)].number_monthly_payments + ' mensualidades:' : 'mensualidades:'
          let Monthpayment1 = Number((Number(this.offer_array[this.offer_array.length - (i + 2)].monthly_installment) * price) / 100);
          let installment1 = this.offer_array[this.offer_array.length - (i + 2)].number_monthly_payments ? this.price.transform(Monthpayment / (Number(this.offer_array[this.offer_array.length - (i + 2)].number_monthly_payments))) : undefined;

          docDefinition.content.splice(3 + i, 0,
            {
              columns: [
                this.offer_array[this.offer_array.length - (i + 1)].monthly_installment ? 
                {
                  style: 'table1',
                  table: {
                    headerRows: 1,
                    widths: [100, 100],
                    body: [
                      [
                        { text: this.offer_array[this.offer_array.length - (i + 1)].payment_name, bold: true, colSpan: 2, border: [false, false, false, false], fontSize: 11, margin: [0, 0, 0, 0] },
                        { text: '', border: [false, false, false, false], fontSize: 10 },
                      ],
                      [
                        { text: 'Precio con descuento:', bold: true, border: [false, false, false, false], fontSize: 10, margin: [0, 0, 0, 0] },
                        { text: this.offer_array[this.offer_array.length - (i + 1)].discount ? this.price.transform(Number(this.property_array.min_price - ((Number(this.offer_array[this.offer_array.length - (i + 1)].discount) * this.property_array.min_price) / 100)).toFixed(2)) : this.price.transform(Number(this.property_array.min_price).toFixed(2)), border: [false, false, false, false], fontSize: 10 },
                      ],
                      [
                        { text: 'Ahorro:', bold: true, border: [false, false, false, false], fontSize: 10, margin: [0, 0, 0, 0] },
                        { text: this.offer_array[this.offer_array.length - (i + 1)].discount ? this.price.transform(((Number(this.offer_array[this.offer_array.length - (i + 1)].discount) * this.property_array.min_price) / 100).toFixed(2)) : this.price.transform(Number(this.property_array.min_price).toFixed(2)), border: [false, false, false, false], fontSize: 10 },
                      ],
                      [
                        { text: 'Enganche:', bold: true, border: [false, false, false, false], fontSize: 10, margin: [0, 0, 0, 0] },
                        {
                          text: [
                            { text: this.offer_array[this.offer_array.length - (i + 1)].downpayment ? this.offer_array[this.offer_array.length - (i + 1)].downpayment + '%' : '', bold: true },
                            { text: this.offer_array[this.offer_array.length - (i + 1)].downpayment ? '  ' + this.price.transform(((Number(this.offer_array[this.offer_array.length - (i + 1)].downpayment) * price) / 100).toFixed(2)) : "0" }
                          ], border: [false, false, false, false], fontSize: 10
                        },
                      ],
                      [
                        { text: 'Durante la obra:', bold: true, border: [false, false, false, false], fontSize: 10, margin: [0, 0, 0, 0] },
                        {
                          text: [
                            { text: this.offer_array[this.offer_array.length - (i + 1)].monthly_installment ? this.offer_array[this.offer_array.length - (i + 1)].monthly_installment + '%' : '', bold: true },
                            { text: this.offer_array[this.offer_array.length - (i + 1)].monthly_installment ? '  ' + this.price.transform(((Number(this.offer_array[this.offer_array.length - (i + 1)].monthly_installment) * price) / 100).toFixed(2)) : "0" }
                          ], border: [false, false, false, false], fontSize: 10
                        },
                      ],
                      [
                        { text: diffCount, bold: true, border: [false, false, false, false], fontSize: 10, margin: [0, 0, 0, 0] },
                        { text: installment ? installment : '0', border: [false, false, false, false], fontSize: 10 },
                      ],
                      [
                        { text: 'A la entrega:', bold: true, border: [false, false, false, false], fontSize: 10, margin: [0, 0, 0, 0] },
                        {
                          text: [
                            { text: this.offer_array[this.offer_array.length - (i + 1)].payment_upon_delivery ? this.offer_array[this.offer_array.length - (i + 1)].payment_upon_delivery + '%' : '', bold: true },
                            { text: this.offer_array[this.offer_array.length - (i + 1)].payment_upon_delivery ? '  ' + this.price.transform(((Number(this.offer_array[this.offer_array.length - (i + 1)].payment_upon_delivery) * price) / 100).toFixed(2)) : "0" }
                          ], border: [false, false, false, false], fontSize: 10
                        },
                      ]
                    ],
                  },
                  layout: {
                    hLineColor: function (i, node) {
                      return (i === 0 || i === node.table.body.length) ? '#57AE75' : '#57AE75';
                    },
                    vLineColor: function (i, node) {
                      return (i === 0 || i === node.table.widths.length) ? '#57AE75' : '#57AE75';
                    },
                    fillColor: function (rowIndex, node, columnIndex) {
                      return (rowIndex % 2 === 0) ? '#57AE75' : '#57AE75';
                    },
                    fillOpacity: function (rowIndex, node, columnIndex) {
                      return (rowIndex % 2 === 0) ? 0.05 : 0.05;
                    }
                  }
                } : 
                {
                  style: 'table1',
                  table: {
                    headerRows: 1,
                    widths: [100, 100],
                    body: [
                      [
                        { text: this.offer_array[this.offer_array.length - (i + 1)].payment_name, bold: true, colSpan: 2, border: [false, false, false, false], fontSize: 11, margin: [0, 0, 0, 0] },
                        { text: '', border: [false, false, false, false], fontSize: 10 },
                      ],
                      [
                        { text: 'Precio con descuento:', bold: true, border: [false, false, false, false], fontSize: 10, margin: [0, 0, 0, 0] },
                        { text: this.offer_array[this.offer_array.length - (i + 1)].discount ? this.price.transform(Number(this.property_array.min_price - ((Number(this.offer_array[this.offer_array.length - (i + 1)].discount) * this.property_array.min_price) / 100)).toFixed(2)) : this.price.transform(Number(this.property_array.min_price).toFixed(2)), border: [false, false, false, false], fontSize: 10 },
                      ],
                      [
                        { text: 'Ahorro:', bold: true, border: [false, false, false, false], fontSize: 10, margin: [0, 0, 0, 0] },
                        { text: this.offer_array[this.offer_array.length - (i + 1)].discount ? this.price.transform(((Number(this.offer_array[this.offer_array.length - (i + 1)].discount) * this.property_array.min_price) / 100).toFixed(2)) : this.price.transform(Number(this.property_array.min_price).toFixed(2)), border: [false, false, false, false], fontSize: 10 },
                      ],
                      [
                        { text: 'Enganche:', bold: true, border: [false, false, false, false], fontSize: 10, margin: [0, 0, 0, 0] },
                        { text: [ 
                          { text: this.offer_array[this.offer_array.length - (i + 1)].downpayment ? this.offer_array[this.offer_array.length - (i + 1)].downpayment + '%' : '', bold: true},
                          { text: this.offer_array[this.offer_array.length - (i + 1)].downpayment ? '  ' + this.price.transform(((Number(this.offer_array[this.offer_array.length - (i + 1)].downpayment) * price) / 100).toFixed(2)) : "0" }
                        ], border: [false, false, false, false], fontSize: 10 },
                      ],
                      [
                        { text: 'Durante la obra:', bold: true, border: [false, false, false, false], fontSize: 10, margin: [0, 0, 0, 0] },
                        { text:[
                        { text:this.offer_array[this.offer_array.length - (i + 1)].monthly_installment ? this.offer_array[this.offer_array.length - (i + 1)].monthly_installment + '%' : '', bold: true },
                        { text: this.offer_array[this.offer_array.length - (i + 1)].monthly_installment ? '  ' + this.price.transform(((Number(this.offer_array[this.offer_array.length - (i + 1)].monthly_installment) * price) / 100).toFixed(2)) : "0" }
                        ], border: [false, false, false, false], fontSize: 10 },
                      ],
                      [
                        { text: 'A la entrega:', bold: true, border: [false, false, false, false], fontSize: 10, margin: [0, 0, 0, 0] },
                        { text: [
                          { text: this.offer_array[this.offer_array.length - (i + 1)].payment_upon_delivery ? this.offer_array[this.offer_array.length - (i + 1)].payment_upon_delivery + '%' : '', bold: true },
                          { text: this.offer_array[this.offer_array.length - (i + 1)].payment_upon_delivery ? '  ' + this.price.transform(((Number(this.offer_array[this.offer_array.length - (i + 1)].payment_upon_delivery) * price) / 100).toFixed(2)) : "0" }
                        ], border: [false, false, false, false], fontSize: 10 },
                      ]
                    ],
                  },
                  layout: {
                    hLineColor: function (i, node) {
                      return (i === 0 || i === node.table.body.length) ? '#57AE75' : '#57AE75';
                    },
                    vLineColor: function (i, node) {
                      return (i === 0 || i === node.table.widths.length) ? '#57AE75' : '#57AE75';
                    },
                    fillColor: function (rowIndex, node, columnIndex) {
                      return (rowIndex % 2 === 0) ? '#57AE75' : '#57AE75';
                    },
                    fillOpacity: function (rowIndex, node, columnIndex) {
                      return (rowIndex % 2 === 0) ? 0.05 : 0.05;
                    }
                  }
                },
                this.offer_array[this.offer_array.length - (i + 2)].monthly_installment ? 
                {
                  style: 'table1',
                  table: {
                    headerRows: 1,
                    widths: [100, 100],
                    body: [
                      [
                        { text: this.offer_array[this.offer_array.length - (i + 2)].payment_name, bold: true, colSpan: 2, border: [false, false, false, false], fontSize: 11, margin: [0, 0, 0, 0] },
                        { text: '', border: [false, false, false, false], fontSize: 10 },
                      ],
                      [
                        { text: 'Precio con descuento:', bold: true, border: [false, false, false, false], fontSize: 10, margin: [0, 0, 0, 0] },
                        { text: this.offer_array[this.offer_array.length - (i + 2)].discount ? this.price.transform(Number(this.property_array.min_price - ((Number(this.offer_array[this.offer_array.length - (i + 2)].discount) * this.property_array.min_price) / 100)).toFixed(2)) : this.price.transform(Number(this.property_array.min_price).toFixed(2)), border: [false, false, false, false], fontSize: 10 },
                      ],
                      [
                        { text: 'Ahorro:', bold: true, border: [false, false, false, false], fontSize: 10, margin: [0, 0, 0, 0] },
                        { text: this.offer_array[this.offer_array.length - (i + 2)].discount ? this.price.transform(((Number(this.offer_array[this.offer_array.length - (i + 2)].discount) * this.property_array.min_price) / 100).toFixed(2)) : this.price.transform(Number(this.property_array.min_price).toFixed(2)), border: [false, false, false, false], fontSize: 10 },
                      ],
                      [
                        { text: 'Enganche:', bold: true, border: [false, false, false, false], fontSize: 10, margin: [0, 0, 0, 0] },
                        {
                          text: [
                            { text: this.offer_array[this.offer_array.length - (i + 2)].downpayment ? this.offer_array[this.offer_array.length - (i + 2)].downpayment + '%' : '', bold: true },
                            { text: this.offer_array[this.offer_array.length - (i + 2)].downpayment ? '  ' + this.price.transform(((Number(this.offer_array[this.offer_array.length - (i + 2)].discount) * price1) / 100).toFixed(2)) : "0" }
                          ], border: [false, false, false, false], fontSize: 10
                        },
                      ],
                      [
                        { text: 'Durante la obra:', bold: true, border: [false, false, false, false], fontSize: 10, margin: [0, 0, 0, 0] },
                        {
                          text: [
                            { text: this.offer_array[this.offer_array.length - (i + 2)].monthly_installment ? this.offer_array[this.offer_array.length - (i + 2)].monthly_installment + '%' : '', bold: true },
                            { text: this.offer_array[this.offer_array.length - (i + 2)].monthly_installment ? '  ' + this.price.transform(((Number(this.offer_array[this.offer_array.length - (i + 2)].monthly_installment) * price1) / 100).toFixed(2)) : "0" }
                          ], border: [false, false, false, false], fontSize: 10
                        },
                      ],
                      [
                        { text: diffCount1, bold: true, border: [false, false, false, false], fontSize: 10, margin: [0, 0, 0, 0] },
                        { text: installment1 ? installment1 : '0', border: [false, false, false, false], fontSize: 10 },
                      ],
                      [
                        { text: 'A la entrega:', bold: true, border: [false, false, false, false], fontSize: 10, margin: [0, 0, 0, 0] },
                        {
                          text: [
                            { text: this.offer_array[this.offer_array.length - (i + 2)].payment_upon_delivery ? this.offer_array[this.offer_array.length - (i + 2)].payment_upon_delivery + '%' : '', bold: true },
                            { text: this.offer_array[this.offer_array.length - (i + 2)].payment_upon_delivery ? '  ' + this.price.transform(((Number(this.offer_array[this.offer_array.length - (i + 2)].payment_upon_delivery) * price1) / 100).toFixed(2)) : "0" }
                          ], border: [false, false, false, false], fontSize: 10
                        },
                      ]
                    ],
                  },
                  layout: {
                    hLineColor: function (i, node) {
                      return (i === 0 || i === node.table.body.length) ? '#57AE75' : '#57AE75';
                    },
                    vLineColor: function (i, node) {
                      return (i === 0 || i === node.table.widths.length) ? '#57AE75' : '#57AE75';
                    },
                    fillColor: function (rowIndex, node, columnIndex) {
                      return (rowIndex % 2 === 0) ? '#57AE75' : '#57AE75';
                    },
                    fillOpacity: function (rowIndex, node, columnIndex) {
                      return (rowIndex % 2 === 0) ? 0.05 : 0.05;
                    }
                  }
                } : 
                {
                  style: 'table1',
                  table: {
                    headerRows: 1,
                    widths: [100, 100],
                    body: [
                      [
                        { text: this.offer_array[this.offer_array.length - (i + 2)].payment_name, bold: true, colSpan: 2, border: [false, false, false, false], fontSize: 11, margin: [0, 0, 0, 0] },
                        { text: '', border: [false, false, false, false], fontSize: 10 },
                      ],
                      [
                        { text: 'Precio con descuento:', bold: true, border: [false, false, false, false], fontSize: 10, margin: [0, 0, 0, 0] },
                        { text: this.offer_array[this.offer_array.length - (i + 2)].discount ? this.price.transform(Number(this.property_array.min_price - ((Number(this.offer_array[this.offer_array.length - (i + 2)].discount) * this.property_array.min_price) / 100)).toFixed(2)) : this.price.transform(Number(this.property_array.min_price).toFixed(2)), border: [false, false, false, false], fontSize: 10 },
                      ],
                      [
                        { text: 'Ahorro:', bold: true, border: [false, false, false, false], fontSize: 10, margin: [0, 0, 0, 0] },
                        { text: this.offer_array[this.offer_array.length - (i + 2)].discount ? this.price.transform(((Number(this.offer_array[this.offer_array.length - (i + 2)].discount) * this.property_array.min_price) / 100).toFixed(2)) : this.price.transform(Number(this.property_array.min_price).toFixed(2)), border: [false, false, false, false], fontSize: 10 },
                      ],
                      [
                        { text: 'Enganche:', bold: true, border: [false, false, false, false], fontSize: 10, margin: [0, 0, 0, 0] },
                        { text: [
                        { text: this.offer_array[this.offer_array.length - (i + 2)].downpayment ? this.offer_array[this.offer_array.length - (i + 2)].downpayment + '%' : '', bold: true }, 
                        { text: this.offer_array[this.offer_array.length - (i + 2)].downpayment ? '  ' + this.price.transform(((Number(this.offer_array[this.offer_array.length - (i + 2)].discount) * price1) / 100).toFixed(2)) : "0" }
                        ], border: [false, false, false, false], fontSize: 10 },
                      ],
                      [
                        { text: 'Durante la obra:', bold: true, border: [false, false, false, false], fontSize: 10, margin: [0, 0, 0, 0] },
                        { text: [
                          { text: this.offer_array[this.offer_array.length - (i + 2)].monthly_installment ? this.offer_array[this.offer_array.length - (i + 2)].monthly_installment + '%' : '', bold: true  },
                          { text: this.offer_array[this.offer_array.length - (i + 2)].monthly_installment ? '  ' + this.price.transform(((Number(this.offer_array[this.offer_array.length - (i + 2)].monthly_installment) * price1) / 100).toFixed(2)) : "0" }
                        ], border: [false, false, false, false], fontSize: 10 },
                      ],
                      [
                        { text: 'A la entrega:', bold: true, border: [false, false, false, false], fontSize: 10, margin: [0, 0, 0, 0] },
                        { text: [
                          { text: this.offer_array[this.offer_array.length - (i + 2)].payment_upon_delivery ? this.offer_array[this.offer_array.length - (i + 2)].payment_upon_delivery + '%' : '', bold: true },
                          { text: this.offer_array[this.offer_array.length - (i + 2)].payment_upon_delivery ? '  ' + this.price.transform(((Number(this.offer_array[this.offer_array.length - (i + 2)].payment_upon_delivery) * price1) / 100).toFixed(2)) : "0" }
                        ], border: [false, false, false, false], fontSize: 10 },
                      ]
                    ],
                  },
                  layout: {
                    hLineColor: function (i, node) {
                      return (i === 0 || i === node.table.body.length) ? '#57AE75' : '#57AE75';
                    },
                    vLineColor: function (i, node) {
                      return (i === 0 || i === node.table.widths.length) ? '#57AE75' : '#57AE75';
                    },
                    fillColor: function (rowIndex, node, columnIndex) {
                      return (rowIndex % 2 === 0) ? '#57AE75' : '#57AE75';
                    },
                    fillOpacity: function (rowIndex, node, columnIndex) {
                      return (rowIndex % 2 === 0) ? 0.05 : 0.05;
                    }
                  }
                }
              ]
            });
        }
        else {
          let price2 = this.property_array.min_price - (Number(this.offer_array[0].discount) * this.property_array.min_price) / 100;
          let diffCount = this.offer_array[0].number_monthly_payments ? this.offer_array[0].number_monthly_payments + ' mensualidades:' :
            'mensualidades:';
          let Monthpayment = Number((Number(this.offer_array[0].monthly_installment) * price) / 100);
          let installment2 = this.offer_array[0].number_monthly_payments ? this.price.transform(Monthpayment / (Number(this.offer_array[0].number_monthly_payments))) : undefined;

          docDefinition.content.splice(3 + 1, 0,
            {
              columns: [
                this.offer_array[0].monthly_installment ? 
                {
                  style: 'table1',
                  table: {
                    headerRows: 1,
                    widths: [100, 100],
                    body: [
                      [
                        { text: this.offer_array[0].payment_name, bold: true, colSpan: 2, border: [false, false, false, false], fontSize: 11, margin: [0, 0, 0, 0] },
                        { text: '', border: [false, false, false, false], fontSize: 10 },
                      ],
                      [
                        { text: 'Precio con descuento:', bold: true, border: [false, false, false, false], fontSize: 10, margin: [0, 0, 0, 0] },
                        { text: this.offer_array[0].discount ? this.price.transform(Number(this.property_array.min_price - ((Number(this.offer_array[0].discount) * this.property_array.min_price) / 100)).toFixed(2)) : this.price.transform(Number(this.property_array.min_price).toFixed(2)), border: [false, false, false, false], fontSize: 10 },
                      ],
                      [
                        { text: 'Ahorro:', bold: true, border: [false, false, false, false], fontSize: 10, margin: [0, 0, 0, 0] },
                        { text: this.offer_array[0].discount ? this.price.transform(((Number(this.offer_array[0].discount) * this.property_array.min_price) / 100).toFixed(2)) : this.price.transform(Number(this.property_array.min_price).toFixed(2)), border: [false, false, false, false], fontSize: 10 },
                      ],
                      [
                        { text: 'Enganche:', bold: true, border: [false, false, false, false], fontSize: 10, margin: [0, 0, 0, 0] },
                        {
                          text: [
                            { text: this.offer_array[0].downpayment ? this.offer_array[0].downpayment + '%' : '', bold: true },
                            { text: this.offer_array[0].downpayment ? '  ' + this.price.transform(((Number(this.offer_array[0].downpayment) * price2) / 100).toFixed(2)) : "0" }
                          ], border: [false, false, false, false], fontSize: 10
                        },
                      ],
                      [
                        { text: 'Durante la obra:', bold: true, border: [false, false, false, false], fontSize: 10, margin: [0, 0, 0, 0] },
                        {
                          text: [
                            { text: this.offer_array[0].monthly_installment ? this.offer_array[0].monthly_installment + '%' : '', bold: true },
                            { text: this.offer_array[0].monthly_installment ? '  ' + this.price.transform(((Number(this.offer_array[0].monthly_installment) * price) / 100).toFixed(2)) : "  0" }
                          ], border: [false, false, false, false], fontSize: 10
                        },
                      ],
                      [
                        { text: diffCount, bold: true, border: [false, false, false, false], fontSize: 10, margin: [0, 0, 0, 0] },
                        { text: installment2 ? installment2 : '0', border: [false, false, false, false], fontSize: 10 },
                      ],
                      [
                        { text: 'A la entrega:', bold: true, border: [false, false, false, false], fontSize: 10, margin: [0, 0, 0, 0] },
                        {
                          text: [
                            { text: this.offer_array[0].payment_upon_delivery ? this.offer_array[0].payment_upon_delivery + '%' : '', bold: true },
                            { text: this.offer_array[0].payment_upon_delivery ? '  ' + this.price.transform(((Number(this.offer_array[0].payment_upon_delivery) * price) / 100).toFixed(2)) : "  0" }
                          ], border: [false, false, false, false], fontSize: 10
                        },
                      ]
                    ],
                  },
                  layout: {
                    hLineColor: function (i, node) {
                      return (i === 0 || i === node.table.body.length) ? '#57AE75' : '#57AE75';
                    },
                    vLineColor: function (i, node) {
                      return (i === 0 || i === node.table.widths.length) ? '#57AE75' : '#57AE75';
                    },
                    fillColor: function (rowIndex, node, columnIndex) {
                      return (rowIndex % 2 === 0) ? '#57AE75' : '#57AE75';
                    },
                    fillOpacity: function (rowIndex, node, columnIndex) {
                      return (rowIndex % 2 === 0) ? 0.05 : 0.05;
                    }
                  }
                } : 
                {
                  style: 'table1',
                  table: {
                    headerRows: 1,
                    widths: [100, 100],
                    body: [
                      [
                        { text: this.offer_array[0].payment_name, bold: true, colSpan: 2, border: [false, false, false, false], fontSize: 11, margin: [0, 0, 0, 0] },
                        { text: '', border: [false, false, false, false], fontSize: 10 },
                      ],
                      [
                        { text: 'Precio con descuento:', bold: true, border: [false, false, false, false], fontSize: 10, margin: [0, 0, 0, 0] },
                        { text: this.offer_array[0].discount ? this.price.transform(Number(this.property_array.min_price - ((Number(this.offer_array[0].discount) * this.property_array.min_price) / 100)).toFixed(2)) : this.price.transform(Number(this.property_array.min_price).toFixed(2)), border: [false, false, false, false], fontSize: 10 },
                      ],
                      [
                        { text: 'Ahorro:', bold: true, border: [false, false, false, false], fontSize: 10, margin: [0, 0, 0, 0] },
                        { text: this.offer_array[0].discount ? this.price.transform(((Number(this.offer_array[0].discount) * this.property_array.min_price) / 100).toFixed(2)) : this.price.transform(Number(this.property_array.min_price).toFixed(2)), border: [false, false, false, false], fontSize: 10 },
                      ],
                      [
                        { text: 'Enganche:', bold: true, border: [false, false, false, false], fontSize: 10, margin: [0, 0, 0, 0] },
                        { text: [
                          {text: this.offer_array[0].downpayment ? this.offer_array[0].downpayment + '%' : '', bold: true },
                          {text: this.offer_array[0].downpayment ? '  ' + this.price.transform(((Number(this.offer_array[0].downpayment) * price2) / 100).toFixed(2)) : "0" }
                        ], border: [false, false, false, false], fontSize: 10 },
                      ],
                      [
                        { text: 'Durante la obra:', bold: true, border: [false, false, false, false], fontSize: 10, margin: [0, 0, 0, 0] },
                        { text: [
                          { text: this.offer_array[0].monthly_installment ? this.offer_array[0].monthly_installment + '%' : '', bold: true },
                          { text: this.offer_array[0].monthly_installment ? '  ' + this.price.transform(((Number(this.offer_array[0].monthly_installment) * price) / 100).toFixed(2)) : "  0" }
                        ], border: [false, false, false, false], fontSize: 10 },
                      ],
                      [
                        { text: 'A la entrega:', bold: true, border: [false, false, false, false], fontSize: 10, margin: [0, 0, 0, 0] },
                        { text: [
                        { text: this.offer_array[0].payment_upon_delivery ? this.offer_array[0].payment_upon_delivery + '%' : '', bold: true },
                        { text: this.offer_array[0].payment_upon_delivery ? '  ' + this.price.transform(((Number(this.offer_array[0].payment_upon_delivery) * price) / 100).toFixed(2)) : "  0"}
                         ], border: [false, false, false, false], fontSize: 10 },
                      ]
                    ],
                  },
                  layout: {
                    hLineColor: function (i, node) {
                      return (i === 0 || i === node.table.body.length) ? '#57AE75' : '#57AE75';
                    },
                    vLineColor: function (i, node) {
                      return (i === 0 || i === node.table.widths.length) ? '#57AE75' : '#57AE75';
                    },
                    fillColor: function (rowIndex, node, columnIndex) {
                      return (rowIndex % 2 === 0) ? '#57AE75' : '#57AE75';
                    },
                    fillOpacity: function (rowIndex, node, columnIndex) {
                      return (rowIndex % 2 === 0) ? 0.05 : 0.05;
                    }
                  }
                }
              ]
            });
        }
      }
    };
    pdfMake.createPdf(docDefinition).download(this.translate.instant('generatePDF.commercialOffer') + ' ' + current_date.toISOString() + '.pdf');
  }
}
