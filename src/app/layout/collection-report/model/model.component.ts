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
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {

  public parameter: IProperty = {};
  items: any = [];
  total: any = 0;
  item: any;
  locale: any;
  input: CollectionReport;
  data: any;
  paymentConcepts: Array<any>;
  model: Array<any>;
  finalData: Array<any>;
  projects: Array<any>;
  properties: Array<any>;
  public scrollbarOptions = { axis: 'y', theme: 'dark' };

  constructor(
    public constant: Constant,
    public admin: AdminService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.finalData = [];
    this.input = new CollectionReport();
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
    // this.getListing();
  }

  
  searchBuilding(keyword: string) {
    this.spinner.show();
    this.admin.postDataApi('searchBuilding', {})
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
  
  getProperties($event) {
    const input = {
      'building_id' : this.parameter.building_id,
      // 'tower_id' : this.parameter.building_towers_id
    };
    this.admin.postDataApi('getProperties', input)
      .subscribe(
        success => {
          this.properties = success.data;
        }, error => {
          this.spinner.hide();
        }
      );
  }

  getListing() {
    this.spinner.show();
    const input: any = JSON.parse(JSON.stringify(this.input));
    if (this.input.start_date) {
      input.building_id = moment(this.input.start_date).format('YYYY-MM-DD');
    } else {
      delete input.start_date;
    }
    if (this.input.end_date) {
      input.bulding_towers_id = moment(this.input.end_date).format('YYYY-MM-DD');
    } else {
      delete input.end_date;
    }
    input.property_id = 1;
    
    this.admin.postDataApi('generateCollectionModelReport', {}).subscribe(
      success => {
        this.data = success['data'];
        this.model = [];
        for(var property in this.data) {
          this.model.push(property);
        }
        let grandTotal = 0; let grandPaidTotal = 0; let grandRemTotal = 0; let grandPenalty = 0;
        this.finalData = [];
        for (let index = 0; index < this.model.length; index++) {
          let m = this.model[index];
          let obj = {};
          let total = 0; let paidTotal = 0; let remainingTotal = 0; let penaltyTotal = 0;
          for (let i = 0; i < this.data[m].length; i++) {
            this.finalData.push(this.data[m][i]);
            total = total + this.data[m][i]['total'];
            paidTotal = paidTotal + this.data[m][i]['paid'];
            penaltyTotal = penaltyTotal + this.data[m][i]['penalty'];
            obj = {calculated: 1, model: 'total', total: total, paid: paidTotal, penalty: penaltyTotal}
            grandTotal = grandTotal + this.data[m][i]['total'];
            grandPaidTotal = grandPaidTotal + this.data[m][i]['paid'];
            grandPenalty = grandPenalty + this.data[m][i]['penalty'];
          }
          this.finalData.push(obj);
        }
        this.finalData.push({calculated: 1,model: 'grand total', total: grandTotal, paid: grandPaidTotal, penalty: grandPenalty});
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      });
  }

}
