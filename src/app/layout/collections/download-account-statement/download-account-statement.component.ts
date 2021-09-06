import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { PricePipe } from 'src/app/pipes/price.pipe';
import { AdminService } from 'src/app/services/admin.service';
import * as moment from 'moment';
import { forkJoin } from 'rxjs';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
declare let swal: any;

@Component({
  selector: 'app-download-account-statement',
  templateUrl: './download-account-statement.component.html',
  styleUrls: ['./download-account-statement.component.css'],
  providers: [DatePipe, PricePipe]
})
export class DownloadAccountStatementComponent implements OnInit {

  collection_data: any;
  collection_payments = [];
  table_data = [];
  layaway_payments = [];
  down_payments = [];
  payments_upon_delivery = [];
  special_payments = [];
  monthly_installment: number = 0;
  monthly_installment_amunt = [];
  monthly_installment_amunts: number = 0;
  monthly_installment_no: number = 0;
  current_month_amount: number = 0;
  bill_month_date: string;
  bill_month: string;
  language_code: string;
  logoImageBase64: any;
  projectLogoImageBase64: any;
  base64: any;
  public paymentBankDetailsArray: any[] = [];
  private bankDetails: any;
  footer_address: any;
  legal_name: any;
  fedTaxPayer: any;
  cashLimit: any;
  parkingSpaceLotsArray: any[] = [];

  constructor(
    public admin: AdminService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private datePipe: DatePipe,
    private http: HttpClient,
    private price: PricePipe
  ) { }

  ngOnInit() {
    this.admin.globalSettings$.subscribe(success => {
      this.cashLimit = success['cash_limit'];
    });
    this.route.params.subscribe(params => {
      this.collection_data = params['id'];
      this.language_code = params['lang'];
      this.translate.setDefaultLang(this.language_code == '1'? 'en' : 'es');
      if(this.collection_data){
      this.generateAccountStatementPdf(this.collection_data);
    }
    });

    this.http.get('../../../assets/img/sozu_black.png', { responseType: 'blob' })
      .subscribe(res => {
        const reader = new FileReader();
        reader.onloadend = () => {
          let base64data = reader.result;
          this.logoImageBase64 = base64data;
        }

        reader.readAsDataURL(res);
      });
  }

  generateAccountStatementPdf(id) {
    let self = this;
    this.table_data = [];
    this.monthly_installment = 0;
    this.current_month_amount = 0;
    this.bill_month = undefined;
    this.bill_month_date = undefined;
    this.monthly_installment_no = 0;
    this.layaway_payments = [];
    this.down_payments = [];
    this.payments_upon_delivery = [];
    this.special_payments = [];
    this.monthly_installment_amunt = [];
    this.monthly_installment_amunts = 0;
    this.spinner.show();
    this.admin.postDataApi('getCollectionByIdForAccount', { id: id })
      .subscribe(
        success => {
          this.getBase64ImageFromUrl(success.data.property.id);
          let count = 0;
          let count1 = 0;
          let count2 = 0;
          let count3 = 0;
          let count4 = 1;
          this.spinner.hide();
          this.collection_data = success['data'];
          this.collection_payments = success['data2'];
          const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ];
          const monthNamesES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
            'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
          ];
          this.collection_data.payment_choices.forEach(function (element, index) {
            let fill = index % 2;
            let month = new Date(element.date);
            let current_date = new Date();
            self.bill_month = self.translate.defaultLang === 'en' ? monthNames[current_date.getUTCMonth()] : monthNamesES[current_date.getUTCMonth()];
            self.bill_month_date = self.datePipe.transform(current_date.setDate(10), 'MMM d, y');

            if (element.is_paid_calculated == 0 && moment(new Date()).isAfter(month)) {
              self.current_month_amount = element.penalty ? self.current_month_amount + ((element.amount + element.penalty.amount) - element.calc_payment_amount) : self.current_month_amount + (element.amount - element.calc_payment_amount);
            }
            else if (index == 0 && element.is_paid_calculated == 0) {
              self.current_month_amount = element.amount;
              self.bill_month = self.translate.defaultLang === 'en' ? monthNames[month.getUTCMonth()] : monthNamesES[month.getUTCMonth()];
              self.bill_month_date = self.datePipe.transform(month.setDate(10), 'MMM d, y');
            }
            if (element.category_name.includes('Monthly Installment')) {
              element.payment_choice.name_en = element.payment_choice.name_en + ' ' + count4;
              element.payment_choice.name_es = element.payment_choice.name_es + ' ' + count4;
              self.monthly_installment = element.amount;
              count4 = count4 + 1;
            }
            self.monthly_installment_no = element.category_name.includes('Monthly Installment') ? self.monthly_installment_no + 1 : self.monthly_installment_no + 0;
            self.monthly_installment_amunts = element.category_name.includes('Monthly Installment') ? self.monthly_installment_amunts + element.amount : self.monthly_installment_amunts + 0;

            if (element.category_name == 'Layaway Payment') {
              let layaway_payments_per = Number((self.collection_data.deal_price ? element.amount * 100 / self.collection_data.deal_price : 0)).toFixed(3) + '%';
              layaway_payments_per = layaway_payments_per.includes('.000') ? layaway_payments_per.replace('.000', '') : layaway_payments_per;
              self.layaway_payments.push([
                { text: self.translate.instant('generatePDF.layaway') + ' ' + (count == 0 ? '' : count) + ':', border: [false, false, false, false], color: '#858291' },
                { text: layaway_payments_per || 'N/A', border: [false, false, false, false], bold: true },
                { text: self.price.transform(Number(element.amount).toFixed(2)), border: [false, false, false, false], bold: true }
              ]);
              count = count + 1;
            }
            else if (element.category_name == 'Down Payment') {
              let down_payments_per = Number((self.collection_data.deal_price ? element.amount * 100 / self.collection_data.deal_price : 0)).toFixed(3) + '%';
              down_payments_per = down_payments_per.includes('.000') ? down_payments_per.replace('.000', '') : down_payments_per;
              self.down_payments.push([
                { text: self.translate.instant('generatePDF.downpayment') + ' ' + (count1 == 0 ? '' : count1) + ':', border: [false, false, false, false], color: '#858291' },
                { text: down_payments_per || 'N/A', border: [false, false, false, false], bold: true },
                { text: self.price.transform(Number(element.amount).toFixed(2)), border: [false, false, false, false], bold: true }
              ]);
              count1 = count1 + 1;
            }
            else if (element.category_name == 'Payment upon Delivery') {
              let payments_upon_delivery_per = Number((self.collection_data.deal_price ? element.amount * 100 / self.collection_data.deal_price : 0)).toFixed(3) + '%';
              payments_upon_delivery_per = payments_upon_delivery_per.includes('.000') ? payments_upon_delivery_per.replace('.000', '') : payments_upon_delivery_per;
              self.payments_upon_delivery.push([
                { text: self.translate.instant('generatePDF.PaymentUponDelivery') + ' ' + (count2 == 0 ? '' : count2) + ':', border: [false, false, false, false], color: '#858291' },
                { text: payments_upon_delivery_per || 'N/A', border: [false, false, false, false], bold: true },
                { text: self.price.transform(Number(element.amount).toFixed(2)), border: [false, false, false, false], bold: true }
              ]);
              count2 = count2 + 1;
            }
            else if (element.category_name == 'Special payment') {
              self.special_payments.push([
                { text: self.translate.instant('generatePDF.specialPayment') + ' ' + (count3 == 0 ? '' : count3) + ':', border: [false, false, false, false], color: '#858291' },
                { text: '', border: [false, false, false, false] },
                { text: self.price.transform(Number(element.amount).toFixed(2)), border: [false, false, false, false], bold: true }
              ]);
              count3 = count3 + 1;
            }
            //self.current_month_amount = (self.current_month_amount || 0) + (element.outstanding_amount || 0);
            self.table_data.push([
              {
                text: element.category_name == 'Special payment' ? element.name : self.language_code == '1' && element.category_name != 'Special payment' ?
                  element.payment_choice.name_en : self.language_code == '2' && element.category_name != 'Special payment' ? element.payment_choice.name_es : element.name, border: [false, false, false, false], bold: true, color: 'white',
                fillColor: fill == 0 ? '#a9a9a9' : '#929292', fontSize: 11
              },
              { text: element.date, border: [false, false, false, false], bold: true, color: 'white', fillColor: fill == 0 ? '#a9a9a9' : '#929292' },
              {
                text: element.calc_payment_amount && element.calc_payment_amount > '0.1' ? self.price.transform(Number(element.calc_payment_amount).toFixed(2)) : '', border: [false, false, false, false], bold: true,
                color: 'white', fillColor: fill == 0 ? '#a9a9a9' : '#929292', fontSize: 11
              },
              {
                text: element.amount - (element.calc_payment_amount || 0) ? self.price.transform(Number(element.amount - (element.calc_payment_amount || 0)).toFixed(2)) : '-', border: [false, false, false, false],
                bold: true, color: 'white', fillColor: fill == 0 ? '#a9a9a9' : '#929292', fontSize: 11
              },
              {
                text: element.amount ? self.price.transform(Number(element.amount).toFixed(2)) : '', border: [false, false, false, false], bold: true, color: 'white',
                fillColor: fill == 0 ? '#a9a9a9' : '#929292', fontSize: 11
              },
              {
                text: element.penalty ? self.price.transform(Number(element.penalty.amount).toFixed(2)) : '', border: [false, false, false, false], bold: true, color: 'white',
                fillColor: fill == 0 ? '#a9a9a9' : '#929292', fontSize: 11
              },
              {
                text: element.penalty ? element.penalty.description : '', border: [false, false, false, false], bold: true, color: 'white', fillColor: fill == 0 ? '#a9a9a9' : '#929292',
                fontSize: 11
              }
            ]);
          });
          let monthly_installment_amunt_per = undefined;
          monthly_installment_amunt_per = Number((self.collection_data.deal_price ? self.monthly_installment_amunts * 100 / self.collection_data.deal_price : 0)).toFixed(3) + '%';
          monthly_installment_amunt_per = monthly_installment_amunt_per.includes('.000') ? monthly_installment_amunt_per.replace('.000', '') : monthly_installment_amunt_per;
          self.monthly_installment_amunt.push(
            { text: self.translate.instant('generatePDF.monthlyInstallmentAmt'), border: [false, false, false, false], color: '#858291' },
            { text: monthly_installment_amunt_per || 'N/A', border: [false, false, false, false], bold: true },
            { text: self.monthly_installment_amunts >= 0 ? self.price.transform(Number(self.monthly_installment_amunts).toFixed(2)) : 'N/A', border: [false, false, false, false], bold: true }
          );
          self.getBanks(this.collection_data.property.id);
          self.getParkingSpaceLots(this.collection_data.property.building_id);
        });
  }

  getBanks(id) {
    this.spinner.show();
    this.admin.postDataApi('getPropertyDetailsForAccount', { id: id }).subscribe((success) => {
      this.bankDetails = (success || {}).data;
      this.makePaymentBankDetailsArray(true);
      this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), error.error.message, 'error');
    });
  }

  getParkingSpaceLots = (buildingId: any): void => {
    this.spinner.show();
    forkJoin([
      this.admin.postDataApi('parkingSpaceLots', { building_id: buildingId || 0 }),
      //this.admin.postDataApi('parkingSpaceRent', { building_id: buildingId || 0 }),
    ]).subscribe((response: any[]) => {
      this.spinner.hide();
      this.parkingSpaceLotsArray = response[0].data || [];
      // this.parkingSpaceRentArray = response[1].data;
    });
  }

  makePaymentBankDetailsArray = (isFirstTimeClick: boolean): void => {
    this.paymentBankDetailsArray = [];
    if (this.collection_data.payment_received_by == 1) {
      this.footer_address = this.bankDetails.building.agency.address;
      this.fedTaxPayer = (((this.bankDetails || {}).building || {}).agency || {}).fed_tax_pay || '';
      // agency banks
      for (let index = 0; index < (((this.bankDetails.building || {}).agency || {}).agency_banks || []).length; index++) {
        if (this.bankDetails.building.agency.agency_banks[index].id == this.collection_data.bank_id) {
          const element = this.bankDetails.building.agency.agency_banks[index];
          element.name = 'Agency Bank | ' + element.bank_name;
          element.is_agency = 1;
          element.bank_id = element.id;
          element.legal_rep_bank_id = null;
          element.legal_name = (((this.bankDetails || {}).building || {}).agency || {}).razon_social || '';
          this.paymentBankDetailsArray.push(element);
        }
      }
    } else if (this.collection_data.payment_received_by == 0) {
      this.legal_name = ((this.bankDetails.selected_seller || {}).user || {}).developer_company ? this.bankDetails.selected_seller.user.developer_company :
        ((this.bankDetails.selected_seller || {}).user || {}).is_developer == 0 && !((this.bankDetails.selected_seller || {}).user || {}).legal_entity_id ? this.bankDetails.selected_seller.user.name + ' ' + this.bankDetails.selected_seller.user.first_surname
          + ' ' + this.bankDetails.selected_seller.user.second_surname : '';
      this.footer_address = this.collection_data.seller_type == 1 ? (this.bankDetails.selected_seller.user.tax_street_address && this.bankDetails.selected_seller.user.tax_street_address != '0' ? this.bankDetails.selected_seller.user.tax_street_address + ' ' : '') +
        (this.bankDetails.selected_seller.user.tax_external_number ? this.bankDetails.selected_seller.user.tax_external_number + '\n' : '')
        + (this.bankDetails.selected_seller.user.tax_internal_number ? this.bankDetails.selected_seller.user.tax_internal_number + ', ' : '') + (this.bankDetails.selected_seller.user.tax_neighborhood ? this.bankDetails.selected_seller.user.tax_neighborhood + '\n' : '')
        + (this.bankDetails.selected_seller.user.tax_zipcode && this.bankDetails.selected_seller.user.tax_zipcode != '0' ? this.bankDetails.selected_seller.user.tax_zipcode + ', ' : '') + (this.bankDetails.selected_seller.user.tax_city ? this.bankDetails.selected_seller.user.tax_city + ', ' : '')
        + (this.bankDetails.selected_seller.user.tax_state ? this.bankDetails.selected_seller.user.tax_state + ', ' : '') + (this.bankDetails.selected_seller.user.tax_country ? this.bankDetails.selected_seller.user.tax_country + ', ' : '') : this.collection_data.seller_type == 3 ? this.bankDetails.selected_seller.user.address : '';

      if (((this.bankDetails.selected_seller || {}).user || {}).developer_company || ((this.bankDetails.selected_seller || {}).user || {}).is_developer == 0 && !((this.bankDetails.selected_seller || {}).user || {}).legal_entity_id) {
        this.fedTaxPayer = (((this.bankDetails || {}).selected_seller || {}).user || {}).fed_tax_pay || '';
        ((((this.bankDetails || {}).selected_seller || {}).user || {}).legal_rep_banks || []).forEach((element, innerIndex) => {
          if (element.id == this.collection_data.bank_id) {
            element.name = 'Seller Bank | ' + element.bank_name;
            element.legal_name = this.bankDetails.selected_seller.user.developer_company ? this.bankDetails.selected_seller.user.developer_company :
              this.bankDetails.selected_seller.user.is_developer == 0 && !this.bankDetails.selected_seller.user.legal_entity_id ? this.bankDetails.selected_seller.user.name + ' ' + this.bankDetails.selected_seller.user.first_surname
                + ' ' + this.bankDetails.selected_seller.user.second_surname : '';
            this.paymentBankDetailsArray.push(element);
          }
        });
      }
      else {
        this.legal_name = (((this.bankDetails.selected_seller || {}).user ||{}).legal_entity || {}).legal_name;
        if(this.bankDetails.selected_seller){
        this.footer_address = (this.bankDetails.selected_seller.user.legal_entity.tax_street_address && this.bankDetails.selected_seller.user.legal_entity.tax_street_address != '0' ? this.bankDetails.selected_seller.user.legal_entity.tax_street_address + ' ' : '') +
          (this.bankDetails.selected_seller.user.legal_entity.tax_external_number ? this.bankDetails.selected_seller.user.legal_entity.tax_external_number + '\n' : '')
          + (this.bankDetails.selected_seller.user.legal_entity.tax_internal_number ? this.bankDetails.selected_seller.user.legal_entity.tax_internal_number + ', ' : '') + (this.bankDetails.selected_seller.user.legal_entity.tax_neighborhood ? this.bankDetails.selected_seller.user.legal_entity.tax_neighborhood + '\n' : '')
          + (this.bankDetails.selected_seller.user.legal_entity.tax_zipcode && this.bankDetails.selected_seller.user.legal_entity.tax_zipcode != '0' ? this.bankDetails.selected_seller.user.legal_entity.tax_zipcode + ', ' : '') + (this.bankDetails.selected_seller.user.legal_entity.tax_city ? this.bankDetails.selected_seller.user.legal_entity.tax_city + ', ' : '')
          + (this.bankDetails.selected_seller.user.legal_entity.tax_state ? this.bankDetails.selected_seller.user.legal_entity.tax_state + ', ' : '') + (this.bankDetails.selected_seller.user.legal_entity.tax_country ? this.bankDetails.selected_seller.user.legal_entity.tax_country + ', ' : '');
        }
        else{
          this.footer_address = undefined;
        }
          (((((this.bankDetails || {}).selected_seller || {}).user || {}).legal_entity || {}).legal_entity_banks || []).forEach((element, innerIndex) => {
          this.fedTaxPayer = ((((this.bankDetails || {}).selected_seller || {}).user || {}).legal_entity || {}).fed_tax_pay || '';
          if (element.id == this.collection_data.bank_id) {
            element.name = 'Seller Bank | ' + element.bank_name;
            element.legal_name = this.bankDetails.selected_seller.user.legal_entity.legal_name;
            this.paymentBankDetailsArray.push(element);
          }
        });
      }
    }
    this.generatePDF();
  }

  getBase64ImageFromUrl(id) { 
    this.admin.postDataApi('getPdfImages', { id: id }).subscribe((success) => {
      this.base64 = (success || {}).data;
      this.projectLogoImageBase64 = 'data:image/jpeg;base64,' + this.base64;
    }, (error) => {
    });
  }

  generatePDF() {
    let current_date = new Date();
    let date = this.datePipe.transform(current_date, 'd/M/y');
    let remaining_amount = this.collection_data.total - this.collection_data.total_amount_paid;
    let purchase_date = this.datePipe.transform(this.collection_data.deal_purchase_date, 'MMM d, y');
    if (this.translate.defaultLang != 'en') {
      purchase_date = purchase_date.includes('Jan') ? purchase_date.replace('Jan', 'ene') : purchase_date.includes('Feb') ? purchase_date.replace('Feb', 'feb') :
        purchase_date.includes('Mar') ? purchase_date.replace('Mar', 'mar') : purchase_date.includes('Apr') ? purchase_date.replace('Apr', 'abr') :
          purchase_date.includes('May') ? purchase_date.replace('May', 'may') : purchase_date.includes('Jun') ? purchase_date.replace('Jun', 'jun') :
            purchase_date.includes('Jul') ? purchase_date.replace('Jul', 'jul') : purchase_date.includes('Aug') ? purchase_date.replace('Aug', 'ago') :
              purchase_date.includes('Sep') ? purchase_date.replace('Sep', 'sep') : purchase_date.includes('Oct') ? purchase_date.replace('Oct', 'oct') :
                purchase_date.includes('Nov') ? purchase_date.replace('Nov', 'nov') : purchase_date.includes('Dec') ? purchase_date.replace('Dec', 'dic') : ' ';

      this.bill_month_date = this.bill_month_date.includes('Jan') ? this.bill_month_date.replace('Jan', 'ene') : this.bill_month_date.includes('Feb') ? this.bill_month_date.replace('Feb', 'feb') :
        this.bill_month_date.includes('Mar') ? this.bill_month_date.replace('Mar', 'mar') : this.bill_month_date.includes('Apr') ? this.bill_month_date.replace('Apr', 'abr') :
          this.bill_month_date.includes('May') ? this.bill_month_date.replace('May', 'may') : this.bill_month_date.includes('Jun') ? this.bill_month_date.replace('Jun', 'jun') :
            this.bill_month_date.includes('Jul') ? this.bill_month_date.replace('Jul', 'jul') : this.bill_month_date.includes('Aug') ? this.bill_month_date.replace('Aug', 'ago') :
              this.bill_month_date.includes('Sep') ? this.bill_month_date.replace('Sep', 'sep') : this.bill_month_date.includes('Oct') ? this.bill_month_date.replace('Oct', 'oct') :
                this.bill_month_date.includes('Nov') ? this.bill_month_date.replace('Nov', 'nov') : this.bill_month_date.includes('Dec') ? this.bill_month_date.replace('Dec', 'dic') : ' ';
    }
    let address = this.collection_data.buyer ? (this.collection_data.buyer.street_address && this.collection_data.buyer.street_address != '0' ? this.collection_data.buyer.street_address + ' ' : '') + (this.collection_data.buyer.external_number ? this.collection_data.buyer.external_number + '\n' : '')
      + (this.collection_data.buyer.internal_number ? this.collection_data.buyer.internal_number + ', ' : '') + (this.collection_data.buyer.neighborhood ? this.collection_data.buyer.neighborhood + '\n' : '')
      + (this.collection_data.buyer.zipcode && this.collection_data.buyer.zipcode != '0' ? this.collection_data.buyer.zipcode + ', ' : '') + (this.collection_data.buyer.city ? this.collection_data.buyer.city + ', ' : '')
      + (this.collection_data.buyer.state ? this.collection_data.buyer.state + ', ' : '') + (this.collection_data.buyer.country ? this.collection_data.buyer.country + ', ' : '') : undefined;
    
    let cash_limit_amount = this.collection_payments.find(x=> x.payment_mode_id == 1);
    let password = this.collection_data.buyer_type == '2' ? this.collection_data.buyer.phone.substr(this.collection_data.buyer_legal_entity.phone.length - 4): this.collection_data.buyer.phone.substr(this.collection_data.buyer.phone.length - 4);
    
    let docDefinition = {
      userPassword: password,
      ownerPassword: password,
      pageSize: 'LEGAL',
      pageMargins: [40, 70, 40, 155],
      permissions: {
        printing: 'highResolution', //'lowResolution'
        modifying: false,
        copying: false,
        annotating: true,
        fillingForms: true,
        contentAccessibility: true,
        documentAssembly: true
      },
      content: [
        {
          columns: [
            [
              {
                text: this.translate.instant('generatePDF.clientDetails'),
                bold: true,
                fontSize: 20,
                margin: [0, 0, 0, 20]
              },
              {
                style: 'address_table',
                table: {
                  headerRows: 1,
                  widths: ['auto', 'auto'],
                  body: [
                    [
                      { text: this.translate.instant('generatePDF.name'), border: [false, false, false, false], color: '#858291' },
                      { text: this.collection_data.buyer && this.collection_data.buyer.name ? this.collection_data.buyer.name + ' ' + this.collection_data.buyer.first_surname + ' ' + this.collection_data.buyer.second_surname : 'N/A', border: [false, false, false, false], bold: true }
                    ],
                    [
                      { text: this.translate.instant('generatePDF.purchaseDate'), border: [false, false, false, false], color: '#858291' },
                      { text: purchase_date || 'N/A', border: [false, false, false, false], bold: true }
                    ],
                    [
                      { text: this.translate.instant('generatePDF.email'), border: [false, false, false, false], color: '#858291' },
                      { text: this.collection_data.buyer ? this.collection_data.buyer.email : 'N/A', border: [false, false, false, false], bold: true }
                    ],
                    [
                      { text: this.translate.instant('generatePDF.contactNumber'), border: [false, false, false, false], color: '#858291' },
                      { text: this.collection_data.buyer && this.collection_data.buyer.phone ? this.collection_data.buyer.dial_code + ' ' + this.collection_data.buyer.phone : 'N/A', border: [false, false, false, false], bold: true }
                    ],
                    [
                      { text: this.translate.instant('generatePDF.addressLable'), border: [false, false, false, false], color: '#858291' },
                      {
                        text: address ? address : 'N/A', border: [false, false, false, false], bold: true
                      }
                    ]
                  ]
                }
              },
            ],
            [
              {
                text: this.translate.instant('generatePDF.paymentInformation'),
                bold: true,
                fontSize: 20,
                margin: [0, 0, 0, 20]
              },
              {
                style: 'table2',
                table: {
                  headerRows: 1,
                  widths: ['auto', 'auto'],
                  body: [
                    [
                      { text: this.translate.instant('generatePDF.totalPaymentCurrentMonth'), border: [false, false, false, false], color: '#858291' },
                      { text: this.price.transform(Number(this.current_month_amount).toFixed(2)), border: [false, false, false, false], bold: true }
                    ],
                    [
                      { text: this.translate.instant('generatePDF.payDayLimit'), border: [false, false, false, false], color: '#858291' },
                      { text: this.bill_month_date || 'N/A', border: [false, false, false, false], bold: true }
                    ],
                    [
                      { text: this.translate.instant('generatePDF.billMonth'), border: [false, false, false, false], color: '#858291' },
                      { text: this.bill_month || 'N/A', border: [false, false, false, false], bold: true }
                    ],
                    [
                      { text: this.translate.instant('generatePDF.CollectionId'), border: [false, false, false, false], color: '#858291' },
                      { text: this.collection_data.id || 'N/A', border: [false, false, false, false], bold: true }
                    ]
                  ]
                }
              },
            ]
          ],
          margin: [0, 35, 0, 5]
        },
        {
          columns: [
            [
              this.base64 ?
                {
                  image: this.projectLogoImageBase64,
                  width: 120,
                  height: 20,
                  margin: [0, 0, 0, 10]
                } : {
                  text: ''
                },
              {
                text: this.translate.instant('generatePDF.propertyDetails'),
                bold: true,
                fontSize: 20,
                margin: [0, 0, 0, 10]
              },
              {
                style: 'table',
                table: {
                  headerRows: 1,
                  widths: ['auto', '150'],

                  body: [
                    [
                      { text: this.translate.instant('generatePDF.project'), bold: true, border: [false, false, false, false], color: '#858291' },
                      { text: this.collection_data.property.building.name, border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.addressLable'), bold: true, border: [false, false, false, false], color: '#858291' },
                      { text: this.collection_data.property.building.address, border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.tower'), bold: true, border: [false, false, false, false], color: '#858291' },
                      { text: this.collection_data.property.building_towers.tower_name, border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.floor'), bold: true, border: [false, false, false, false], color: '#858291' },
                      { text: this.collection_data.property.floor_num == 0 ? 'Ground floor' : this.collection_data.property.floor_num + ' Floor', border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.model'), bold: true, border: [false, false, false, false], color: '#858291' },
                      { text: this.collection_data.property.building_configuration.name, border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.noOfProperty'), bold: true, border: [false, false, false, false], color: '#858291' },
                      { text: this.collection_data.property.name, border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.finalPrice'), bold: true, border: [false, false, false, false], color: '#858291' },
                      { text: this.price.transform(Number(this.collection_data.final_price).toFixed(2)), border: [false, false, false, false], bold: true },
                    ]
                  ]
                }
              },
              {
                text: this.translate.instant('generatePDF.generalBalance'),
                bold: true,
                fontSize: 20,
                margin: [0, 20, 0, 7]
              },
              {
                style: 'table2',
                table: {
                  headerRows: 1,
                  widths: ['auto', 'auto'],
                  body: [
                    [
                      { text: this.translate.instant('generatePDF.balancePayable'), border: [false, false, false, false], bold: true, fontSize: 16, margin: [0, 0, 0, 5] },
                      { text: remaining_amount >= 0 ? this.price.transform(Number(remaining_amount).toFixed(2)) : 'N/A', border: [false, false, false, false], bold: true, fontSize: 16, margin: [0, 0, 0, 5] }
                    ],
                    [
                      { text: this.translate.instant('generatePDF.totalPaid'), border: [false, false, false, false], color: '#858291' },
                      { text: this.collection_data.total_amount_paid ? this.price.transform(Number(this.collection_data.total_amount_paid).toFixed(2)) : 'N/A', border: [false, false, false, false], bold: true }
                    ],
                  ]
                }
              },
              this.cashLimit >= cash_limit_amount.total_amount?
                {
                  image: this.translate.instant('generatePDF.warning'),
                  width: 120,
                  height: 20,
                  margin: [0, 0, 0, 10]
                } : {
                  text: ''
                }
            ],
            [
              {
                text: this.translate.instant('generatePDF.dealInformation'),
                bold: true,
                fontSize: 20,
                margin: [0, 30, 0, 10]
              },
              {
                text: [
                  { text: this.translate.instant('generatePDF.purchaseDate'), margin: [20, 0, 30, 0] },
                  { text: '        ' + purchase_date || 'N/A' }
                ],
                bold: true,
                fontSize: 16
              },
              {
                style: 'table2',
                table: {
                  headerRows: 1,
                  widths: ['auto', 'auto', 'auto'],
                  body: [
                    [
                      { text: this.translate.instant('generatePDF.noInstallPayment'), border: [false, false, false, false], color: '#858291' },
                      { text: this.monthly_installment_no, border: [false, false, false, false], bold: true },
                      { text: '', border: [false, false, false, false] }
                    ],
                    [
                      { text: this.translate.instant('generatePDF.monthlyInstallment'), border: [false, false, false, false], color: '#858291' },
                      { text: '', border: [false, false, false, false] },
                      { text: this.monthly_installment >= 0 ? this.price.transform(Number(this.monthly_installment).toFixed(2)) : 'N/A', border: [false, false, false, false], bold: true }
                    ]
                  ]
                }
              },
              {
                style: 'banktable',
                unbreakable: true,
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
                      { text: this.paymentBankDetailsArray.length > 0 && this.paymentBankDetailsArray[0].bank_name ? this.paymentBankDetailsArray[0].bank_name : 'N/A', border: [false, false, false, false], bold: true }
                    ],
                    [
                      { text: this.translate.instant('generatePDF.accountInNameOf'), border: [false, false, false, false], color: '#858291' },
                      {
                        text: this.paymentBankDetailsArray.length > 0 && this.paymentBankDetailsArray[0].legal_name ? this.paymentBankDetailsArray[0].legal_name : 'N/A', border: [false, false, false, false], bold: true
                      },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.federalTaxPayer'), border: [false, false, false, false], color: '#858291' },
                      { text: this.paymentBankDetailsArray.length > 0 && this.paymentBankDetailsArray[0].bank_name && this.fedTaxPayer ? this.fedTaxPayer : 'N/A', border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.accountNumber'), border: [false, false, false, false], color: '#858291' },
                      { text: this.paymentBankDetailsArray.length > 0 && this.paymentBankDetailsArray[0].account_number ? this.paymentBankDetailsArray[0].account_number : 'N/A', border: [false, false, false, false], bold: true }
                    ],
                    [
                      { text: this.translate.instant('generatePDF.cLABE'), border: [false, false, false, false], color: '#858291' },
                      { text: this.paymentBankDetailsArray.length > 0 && this.paymentBankDetailsArray[0].swift ? this.paymentBankDetailsArray[0].swift : 'N/A', border: [false, false, false, false], bold: true }
                    ],
                    [
                      { text: this.translate.instant('generatePDF.bankReference'), border: [false, false, false, false], color: '#858291' },
                      { text: this.collection_data.bank_reference_id ? this.collection_data.bank_reference_id : 'N/A', border: [false, false, false, false], bold: true }
                    ],
                  ],
                }
              }
            ]
          ],
          margin: [0, 20, 0, 0]
        },
        {
          style: 'statement_table',
          table: {
            headerRows: 1,
            widths: ['14%', '14%', '14%', '14%', '14%', '14%', '14%'],
            body: [
              [
                { text: this.translate.instant('generatePDF.concept'), border: [false, false, false, false], bold: true, color: 'white', fillColor: '#525659' },
                { text: this.translate.instant('generatePDF.date'), border: [false, false, false, false], bold: true, color: 'white', fillColor: '#525659' },
                { text: this.translate.instant('generatePDF.paid'), border: [false, false, false, false], bold: true, color: 'white', fillColor: '#525659' },
                { text: this.translate.instant('generatePDF.pendingPayment'), border: [false, false, false, false], bold: true, color: 'white', fillColor: '#525659' },
                { text: this.translate.instant('generatePDF.amountPayable'), border: [false, false, false, false], bold: true, color: 'white', fillColor: '#525659' },
                { text: this.translate.instant('generatePDF.penalty'), border: [false, false, false, false], bold: true, color: 'white', fillColor: '#525659' },
                { text: this.translate.instant('generatePDF.description'), border: [false, false, false, false], bold: true, color: 'white', fillColor: '#525659' }
              ],
            ]
          }
        },
        {
          columns: [
            {
              text: '',
            },
            {
              text: '',
            }
          ]
        }
      ],
      header: {
        columns: [
          {
            image: this.logoImageBase64,
            width: 100,
            margin: [20, 20, 20, 20],
          },
          {
            text: this.translate.instant('generatePDF.address'),
            margin: [80, 20, 20, 20],
            color: '#858291'
          },
          {

            text: this.translate.instant('generatePDF.addressName') + '\n' + date,
            alignment: 'right',
            color: '#858291',
            margin: [20, 20, 20, 20],
          },
        ]
      },
      footer: {
        columns: [
          [
            {
              text: this.translate.instant('generatePDF.notReflected') + '\n' + this.translate.instant('generatePDF.notReflected1'),
              color: '#858291',
              margin: [30, 20, 0, 10]
            },
            {
              text: [
                { text: this.legal_name ? this.legal_name : '', bold: true },
                {
                  text: (this.legal_name && this.fedTaxPayer ? '\n' + this.fedTaxPayer : '') +
                    (this.footer_address ? '\n' + this.footer_address : '')
                  , color: '#858291'
                },
              ],
              margin: [30, 10, 0, 0]
            }
          ],
          [
            {
              text: '',
              margin: [0, 60, 0, 0]
            },
            {
              text: [
                { text: this.translate.instant('generatePDF.contactUS') + '\n' + this.translate.instant('generatePDF.contactUS2'), color: '#858291' },
                { text: ' ' + this.translate.instant('generatePDF.contactUS3'), bold: true },
                { text: '\n' + this.translate.instant('generatePDF.contactUS4'), color: '#858291' },
              ],
              margin: [20, 20, 0, 0]
            }
          ]
        ]
      },
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
        banktable: {
          margin: [0, 20, 0, 40],
          border: [false, false, false, false]
        },
        address_table: {
          margin: address ? [0, 15, 0, 15] : [0, 5, 0, 40],
          border: [false, false, false, false]
        },
        statement_table: {
          margin: [0, 35, 0, 15],
          border: [false, false, false, false]
        }
      },
    };
    this.table_data.forEach(element => {
      docDefinition.content[2].table.body.push(element);
    });
    if (this.layaway_payments.length > 0) {
      this.layaway_payments.forEach(element => {
        docDefinition.content[1].columns[1][2].table.body.push(element);
      });
    } else {
      docDefinition.content[1].columns[1][2].table.body.push([
        { text: this.translate.instant('generatePDF.layaway'), border: [false, false, false, false], color: '#858291' },
        { text: '', border: [false, false, false, false] },
        { text: 'N/A', border: [false, false, false, false], bold: true },
      ]);
    }
    if (this.down_payments.length > 0) {
      this.down_payments.forEach(element => {
        docDefinition.content[1].columns[1][2].table.body.push(element);
      });
    } else {
      docDefinition.content[1].columns[1][2].table.body.push([
        { text: this.translate.instant('generatePDF.downpayment'), border: [false, false, false, false], color: '#858291' },
        { text: '', border: [false, false, false, false] },
        { text: 'N/A', border: [false, false, false, false], bold: true },
      ]);
    }
    if (this.monthly_installment_amunt.length > 0) {
      docDefinition.content[1].columns[1][2].table.body.push(this.monthly_installment_amunt);
    } else {
      docDefinition.content[1].columns[1][2].table.body.push([
        { text: this.translate.instant('generatePDF.monthlyInstallmentAmt'), border: [false, false, false, false], color: '#858291' },
        { text: '', border: [false, false, false, false] },
        { text: 'N/A', border: [false, false, false, false], bold: true },
      ]);
    }
    if (this.payments_upon_delivery.length > 0) {
      this.payments_upon_delivery.forEach(element => {
        docDefinition.content[1].columns[1][2].table.body.push(element);
      });
    } else {
      docDefinition.content[1].columns[1][2].table.body.push([
        { text: this.translate.instant('generatePDF.PaymentUponDelivery'), border: [false, false, false, false], color: '#858291' },
        { text: '', border: [false, false, false, false] },
        { text: 'N/A', border: [false, false, false, false], bold: true },
      ]);
    }
    if (this.special_payments.length > 0) {
      this.special_payments.forEach(element => {
        docDefinition.content[1].columns[1][2].table.body.push(element);
      });
    } else {
      docDefinition.content[1].columns[1][2].table.body.push([
        { text: this.translate.instant('generatePDF.specialPayment'), border: [false, false, false, false], color: '#858291' },
        { text: '', border: [false, false, false, false] },
        { text: 'N/A', border: [false, false, false, false], bold: true },
      ]);
    }
    // this.collection_payments.forEach(element => {
    //   docDefinition.content[1].columns[0][4].table.body.push([
    //     { text: element.name_en + ':', border: [false, false, false, false], color: '#858291' },
    //     { text: element.total_amount? this.price.transform(Number(element.total_amount).toFixed(2)) : 'N/A', border: [false, false, false, false], bold: true }
    //   ])
    // });
    if (this.collection_data.property.property_parking_space && this.collection_data.property.property_parking_space.length > 0) {
      let no = 6;
      let count = 1;
      this.collection_data.property.property_parking_space.forEach(element => {
        let parkingName = this.parkingSpaceLotsArray.find(parking => parking.id == element.parking_type)
        docDefinition.content[1].columns[0][2].table.body.splice(no, 0, [
          { text: this.translate.instant('generatePDF.parkingForSale') + ' ' + (this.translate.defaultLang == 'en' ? parkingName.name_en : parkingName.name_es) + ':', bold: true, border: [false, false, false, false], color: '#858291' },
          { text: element.parking_count, border: [false, false, false, false], bold: true }
        ]);
        docDefinition.content[1].columns[0][2].table.body.splice(no + 1, 0, [
          { text: this.translate.instant('generatePDF.parkingPrice') + ' ' + (this.translate.defaultLang == 'en' ? parkingName.name_en : parkingName.name_es) + ':', bold: true, border: [false, false, false, false], color: '#858291' },
          { text: this.price.transform(Number(element.parkingLotsPrice ? element.parkingLotsPrice.replace('$', '') : 0).toFixed(2)), border: [false, false, false, false], bold: true }
        ]);
        no = no + 2;
        count = count + 1;
      });
    }
    pdfMake.createPdf(docDefinition).download(this.translate.instant('generatePDF.accountStatments') + ' ' + current_date.toISOString() + '.pdf');
    setTimeout(function(){ 
      window.open('','_self').close();
     }, 1000);
  }

}
