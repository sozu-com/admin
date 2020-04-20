import { Component, OnInit } from '@angular/core';
import * as CanvasJS from 'src/assets/js/canvasjs.min.js';
import { IProperty } from 'src/app/common/property';
import { AdminService } from 'src/app/services/admin.service';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { CollectionReport } from 'src/app/models/collection-report.model';


@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {

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
      title:{
        // text: "Google - Consolidated Quarterly Revenue",
        fontFamily: "arial black",
        fontColor: "#695A42"
      },
      axisX: {
        interval: 1,
        intervalType: "year"
      },
      axisY:{
        valueFormatString:"$#0bn",
        gridColor: "#B6B1A8",
        tickColor: "#B6B1A8"
      },
      toolTip: {
        shared: true,
        content: toolTipContent
      },
      data: [{
        type: "stackedColumn",
        showInLegend: true,
        color: "#696661",
        name: "Q1",
        dataPoints: [
          { y: 6.75, x: new Date(2010,0) },
          { y: 8.57, x: new Date(2011,0) },
          { y: 10.64, x: new Date(2012,0) },
          { y: 13.97, x: new Date(2013,0) },
          { y: 15.42, x: new Date(2014,0) },
          { y: 17.26, x: new Date(2015,0) },
          { y: 20.26, x: new Date(2016,0) }
        ]
        },
        {        
          type: "stackedColumn",
          showInLegend: true,
          name: "Q4",
          color: "#B6B1A8",
          dataPoints: [
            { y: 8.44, x: new Date(2010,0) },
            { y: 10.58, x: new Date(2011,0) },
            { y: 14.41, x: new Date(2012,0) },
            { y: 16.86, x: new Date(2013,0) },
            { y: 10.64, x: new Date(2014,0) },
            { y: 21.32, x: new Date(2015,0) },
            { y: 26.06, x: new Date(2016,0) }
          ]
      }]
    });

    
    function toolTipContent(e) {
      var str = "";
      var total = 0;
      var str2, str3;
      for (var i = 0; i < e.entries.length; i++){
        var  str1 = "<span style= \"color:"+e.entries[i].dataSeries.color + "\"> "+e.entries[i].dataSeries.name+"</span>: $<strong>"+e.entries[i].dataPoint.y+"</strong>bn<br/>";
        total = e.entries[i].dataPoint.y + total;
        str = str.concat(str1);
      }
      str2 = "<span style = \"color:DodgerBlue;\"><strong>"+(e.entries[0].dataPoint.x).getFullYear()+"</strong></span><br/>";
      total = Math.round(total * 100) / 100;
      str3 = "<span style = \"color:Tomato\">Total:</span><strong> $"+total+"</strong>bn<br/>";
      return (str2.concat(str)).concat(str3);
    }

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
