import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProperty } from 'src/app/common/property';
import { Constant } from 'src/app/common/constants';
import { AdminService } from 'src/app/services/admin.service';
import { TranslateService } from '@ngx-translate/core';
import { CollectionReport } from '../../../models/collection-report.model';
import { Towers } from 'src/app/models/addProject.model';
declare let swal: any;

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {

  public parameter: IProperty = {};
  items: any = [];
  today: any;
  total: any = 0;
  item: any;
  locale: any;
  input: CollectionReport;
  data: any;
  paymentConcepts: Array<any>;
  model: Array<any>;
  finalData: Array<any>;
  projects: Array<any>;
  towers: Array<Towers>;
  properties: Array<any>;
  currencies: Array<any>;
  developers: Array<any>;
  selectedBuilding: any;

  public scrollbarOptions = { axis: 'y', theme: 'dark' };

  constructor(
    public constant: Constant,
    public admin: AdminService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.finalData = [];
    this.towers = [new Towers()];
    this.input = new CollectionReport();
    this.input.start_date = moment().subtract(6, 'months').toDate();
    this.input.end_date = moment().toDate();
    this.today = new Date();
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
      developer_id: developer_id
      // keyword: 'marg'
    };
    
    // projectHome
    this.admin.postDataApi('searchBuilding', input)
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

  setBuildingId(buildingId: any) {
    this.projects.map(r => {
      if (r.id == buildingId) {
        this.selectedBuilding = r;
      }
    })
    this.input.building_id = buildingId;
  }

  setTower(building_towers_id: string) {
    for (let index = 0; index < this.projects.length; index++) {
      if (this.projects[index].id == this.input.building_id) {
        const bt = this.projects[index].building_towers;
        for(let i = 0; i < bt.length; i++) {
          if (bt[i].id == building_towers_id) {
            this.towers = bt[i];
          }
        }
      }
    }
  }
  
  getProperties($event) {
    const input = {
      'building_id' : this.input.building_id,
      'tower_id' : this.input.building_towers_id,
      floor_num: this.input.floor_num
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
    input.start_date = moment(this.input.start_date).format('YYYY-MM-DD');
    input.end_date = moment(this.input.end_date).format('YYYY-MM-DD');

    this.admin.postDataApi('generateCollectionModelReport', input).subscribe(
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

  resetFilters() {
    this.input = new CollectionReport();
    this.input.start_date = moment().subtract(6, 'months').toDate();
    this.input.end_date = moment().toDate();
  }
}
