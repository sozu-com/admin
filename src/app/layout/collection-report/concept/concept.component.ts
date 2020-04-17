import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProperty } from 'src/app/common/property';
import { Constant } from 'src/app/common/constants';
import { AdminService } from 'src/app/services/admin.service';
import { TranslateService } from '@ngx-translate/core';
import { CollectionReport } from '../../../models/collection-report.model';
declare let swal: any;

@Component({
  selector: 'app-concept',
  templateUrl: './concept.component.html',
  styleUrls: ['./concept.component.css']
})
export class ConceptComponent implements OnInit {

  public parameter: IProperty = {};
  items: any = [];
  total: any = 0;
  item: any;
  locale: any;
  input: CollectionReport;
  data: any;
  paymentConcepts: Array<any>;
  allMonths: Array<any>;
  finalData: Array<any>;
  currencies: Array<any>;
  projects: Array<any>;
  developers: Array<any>;
  public scrollbarOptions = { axis: 'y', theme: 'dark' };

  constructor(
    public constant: Constant,
    public admin: AdminService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.input = new CollectionReport();
    this.input.start_date = moment().subtract(6, 'months').toDate();
    this.input.end_date = moment().toDate();
    this.getDevelopers();
    this.getCurrencies();
    this.locale = {
      firstDayOfWeek: 0,
      dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
      dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
      dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
      monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
      monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun',
        'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
      today: 'Hoy',
      clear: 'Clara',
      dateFormat: 'mm/dd/yy',
      weekHeader: 'Wk'
    };
    this.getListing();
  }

  getCurrencies() {
    this.admin.postDataApi('getCurrencies', {})
      .subscribe(
        success => {
          this.currencies = success.data;
        }, error => {
          this.spinner.hide();
        }
      );
  }
  
  getDevelopers() {
    const input = {
      user_type : 3
    };
    this.admin.postDataApi('getAllBuyers', input)
      .subscribe(
        success => {
          this.developers = success.data;
        }, error => {
          this.spinner.hide();
        }
      );
  }

  searchBuilding(developer_id: string) {
    this.spinner.show();
    const input = {
      "userType": "developer",
      "developer_id": developer_id
    };
    this.admin.postDataApi('projectHome', input)
      .subscribe(
        success => {
          this.spinner.hide();
          this.projects = success['data'];
        },
        error => {
          this.spinner.hide();
        }
      );
  }

  getListing() {
    this.spinner.show();

    const input: any = JSON.parse(JSON.stringify(this.input));
    input.start_date = moment(this.input.start_date).format('YYYY-MM-DD');
    input.end_date = moment(this.input.end_date).format('YYYY-MM-DD');

    this.admin.postDataApi('generateCollectionConceptReport', input).subscribe(
    // this.admin.getCollectionsData().subscribe(
      success => {
        this.paymentConcepts = success['payment_concepts'];
        this.data = success['data'];

        this.allMonths = [];
        for(var property in this.data) {
          this.allMonths.push(property);
        }

        this.finalData = [];
        for (let index = 0; index < this.paymentConcepts.length; index++) {
          const obj = {};
          obj['p'] = this.paymentConcepts[index];
          let total = 0;
          for (let i = 0; i < this.allMonths.length; i++) {
            const month = this.allMonths[i];
            let d = 0;
            this.data[month].map(o => {
              if (o.name == obj['p']) {
                d = o.total_payments;
                total = total + o.total_payments;
              }
            });
            obj[month] = d;
          }
          obj['total'] = total;
          this.finalData.push(obj);
        }
        // calculating grand total
        let grandTotal = 0;
        for(let i = 0; i < this.finalData.length; i++) {
          grandTotal = grandTotal + this.finalData[i].total
        }
        this.finalData.push({p: 'Total', total: grandTotal})
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      });
  }

  resetFilters() {
    // this.input = new CollectionReport();
    this.input.developer_id = 0;
    this.input.building_id = 0;
    this.input.currency_id = 0;
  }

}
