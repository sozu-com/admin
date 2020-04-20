import { Component, OnInit } from '@angular/core';
import * as CanvasJS from 'src/assets/js/canvasjs.min.js';
import { IProperty } from 'src/app/common/property';
import { AdminService } from 'src/app/services/admin.service';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { CollectionReport } from 'src/app/models/collection-report.model';

@Component({
  selector: 'app-commission-income',
  templateUrl: './commission-income.component.html',
  styleUrls: ['./commission-income.component.css']
})
export class CommissionIncomeComponent implements OnInit {

  public parameter: IProperty = {};
  singleDropdownSettings: any;
  multiDropdownSettings: any;
  input: CollectionReport;
  projects: Array<any>;
  selctedProjects: Array<any>;
  developers: Array<any>;
  selectedDevelopers: Array<any>;
  colorScheme = {
    domain: ['#ee7b7c', '#f5d05c']
  };
  locale: any;
  today = new Date();
  constructor(public admin: AdminService, 
    private spinner: NgxSpinnerService,
    private translate: TranslateService) {
  }

  onSelect(event) {}

  ngOnInit() {
    this.input = new CollectionReport();
    this.input.start_date = moment().subtract(6, 'months').toDate();
    this.input.end_date = moment().toDate();
    this.iniDropDownSetting()
    this.getDevelopers();

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
    this.getReportData();
  }


  iniDropDownSetting() {
    this.singleDropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: this.translate.instant('commonBlock.selectAll'),
      unSelectAllText: this.translate.instant('commonBlock.unselectAll'),
      searchPlaceholderText: this.translate.instant('commonBlock.search'),
      allowSearchFilter: true
    };
    this.multiDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: this.translate.instant('commonBlock.selectAll'),
      unSelectAllText: this.translate.instant('commonBlock.unselectAll'),
      searchPlaceholderText: this.translate.instant('commonBlock.search'),
      allowSearchFilter: true
    };
  }

  onItemDeSelect(arrayNAme: any, obj: any) {
    this[arrayNAme].push(obj);
  }

  onItemSelect(param:any, obj: any) {
    this[param].push(obj);
  }

  onSelectAll(obj: any) {
  }

  
  getDevelopers() {
    this.admin.postDataApi('getUnblockedDevelopers', {})
      .subscribe(
        success => {
          this.developers = success.data;
        }, error => {
          this.spinner.hide();
        }
      );
  }

  onSelectDeveloper(isSelected: number, obj: any) {
    if (isSelected) {
      this.searchBuilding(obj.id);
    } else {
      this.projects = [];
      this.selctedProjects = [];
    }
  }

  searchBuilding(developer_id: string) {
    this.spinner.show();
    const input = {
      developer_id: developer_id
    };
    this.admin.postDataApi('getUnblockedProjects', input)
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


  getReportData () {
    const input: any = JSON.parse(JSON.stringify(this.input));
    input.start_date = moment(this.input.start_date).format('YYYY-MM-DD');
    input.end_date = moment(this.input.end_date).format('YYYY-MM-DD');

    if (this.selctedProjects) {
      const d = this.selctedProjects.map(o => o.id);
      input.building_id = d;
    }
    if (this.selectedDevelopers) {
      const d = this.selectedDevelopers.map(o => o.id);
      input.developer_id = d;
    }

    this.spinner.show();
    this.admin.postDataApi('reports/bank', input).subscribe(r => {
      this.spinner.hide();
      this.plotData();
    }, error => {
      this.spinner.hide();
    });
  }

  plotData() {

    var chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      theme: "light2", // "light1", "light2", "dark1", "dark2"
      title:{
        text: "Top Oil Reserves"
      },
      axisY: {
        title: "Reserves(MMbbl)"
      },
      data: [{        
        type: "column",  
        showInLegend: true, 
        legendMarkerColor: "grey",
        legendText: "MMbbl = one million barrels",
        dataPoints: [      
          { y: 300878, label: "Venezuela" },
          { y: 266455,  label: "Saudi" },
          { y: 169709,  label: "Canada" },
          { y: 158400,  label: "Iran" },
          { y: 142503,  label: "Iraq" },
          { y: 101500, label: "Kuwait" },
          { y: 97800,  label: "UAE" },
          { y: 80000,  label: "Russia" }
        ]
      }]
    });
    chart.render();
    
  }

  resetFilters() {
    this.input = new CollectionReport();
    this.input.start_date = moment().subtract(6, 'months').toDate();
    this.input.end_date = moment().toDate();
    this.selectedDevelopers = [];
    this.selctedProjects = [];
  }
}
