import { Component, OnInit } from '@angular/core';
import * as CanvasJS from 'src/assets/js/canvasjs.min.js';
import { IProperty } from 'src/app/common/property';
import { AdminService } from 'src/app/services/admin.service';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { CollectionReport } from 'src/app/models/collection-report.model';

@Component({
  selector: 'app-project-report',
  templateUrl: './project-report.component.html',
  styleUrls: ['./project-report.component.css']
})
export class ProjectReportComponent implements OnInit {

  public parameter: IProperty = {};
  multiDropdownSettings: any;
  input: CollectionReport;
  projects: Array<any>;
  selctedProjects: Array<any>;
  colorScheme = {
    domain: ['#ee7b7c', '#f5d05c']
  };
  locale: any;
  reportData: any;
  agentData: Array<any>;
  dataPoints1: Array<any>;

  constructor(public admin: AdminService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService) {
  }

  onSelect(event) {}

  ngOnInit() {
    this.input = new CollectionReport();
    this.input.start_date = moment().subtract(12, 'months').toDate();
    this.input.end_date = moment().toDate();
    this.iniDropDownSetting();
    this.searchBuilding();
    this.initCalendarLocale();
    // this.getReportData();

    this.translate.onDefaultLangChange.subscribe((event: LangChangeEvent) => {
      this.initCalendarLocale();
    });
  }

  initCalendarLocale() {
    if (this.translate.defaultLang === 'en') {
      this.locale = {
        firstDayOfWeek: 0,
        dayNames: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        dayNamesShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        dayNamesMin: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
            'November', 'December'],
        monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        today: 'Today',
        clear: 'Clear',
        dateFormat: 'mm/dd/yy',
        weekHeader: 'Wk'
      };
    } else {
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
        weekHeader: 'Sm'
      };
    }
  }

  iniDropDownSetting() {
    this.multiDropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: this.translate.instant('commonBlock.selectAll'),
      unSelectAllText: this.translate.instant('commonBlock.unselectAll'),
      searchPlaceholderText: this.translate.instant('commonBlock.search'),
      allowSearchFilter: true,
      itemsShowLimit: 1
    };
  }

  onItemDeSelect(arrayNAme: any, obj: any) {
    this[arrayNAme].push(obj);
  }

  onItemSelect(param: any, obj: any) {
    this[param] = [obj];
  }

  onSelectAll(obj: any) {
  }

  searchBuilding() {
    this.spinner.show();
    this.admin.postDataApi('getProjectsForCollections', {})
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
    const v = this.selctedProjects.length > 0 ? this.selctedProjects[0].id : '';
    if (!v) {
      return false;
    }
    this.spinner.show();
    this.admin.postDataApi('projectReport', {building_id: v}).subscribe(r => {
      this.spinner.hide();
      this.reportData = r['data'];
      this.agentData = r['agent_data'];
      const obj = {};
      for (let index = 0; index < this.reportData.length; index++) {
        const element = this.reportData[index];
        element.available_units = element.total_units - element.sold_units;
        element.sold_per = ((element.sold_units / element.total_units) * 100).toFixed(2);
        element.available_per = ((element.available_units / element.total_units) * 100).toFixed(2);
        element.available_per = ((element.available_units / element.total_units) * 100).toFixed(2);
        obj['total_units'] = element.total_units + (obj['total_units'] || 0);
        obj['sold_units'] = element.sold_units + (obj['sold_units'] || 0);
        obj['available_units'] = element.available_units + (obj['available_units'] || 0);
        obj['sold_per'] = parseFloat(element.sold_per) + (obj['sold_per'] || 0);
        obj['available_per'] = parseFloat(element.available_per) + (obj['available_per'] || 0);
        // obj['total_per'] = parseFloat(element.total_per) + (obj['total_per'] || 0);
      }
      this.dataPoints1 = [];
      for (let index = 0; index < this.reportData.length; index++) {
        this.dataPoints1.push({
          indexLabel: this.reportData[index].model,
          y: ((this.reportData[index].total_units / obj['total_units']) * 100).toFixed(2) });
      }

      const externalAgent = {indexLabel: 'Outside Agent', y: 0};
      const total = {indexLabel: 'Total', y: 0};
      const removeValFromIndex = [];
      for (let index = 0; index < this.agentData.length; index++) { 
        const r1 = this.agentData[index];
        total.y =  total.y + r1.y;
        if (r1.is_external_agent) {
          externalAgent.y = externalAgent.y + r1.y;
          removeValFromIndex.push(index);
        }
      }

      for (let i = removeValFromIndex.length - 1; i >= 0; i--) {
        this.agentData.splice(removeValFromIndex[i], 1);
      }

      this.agentData.push(externalAgent);
      this.agentData.push(total);

      this.reportData.push(obj);
      this.plotData();
    }, error => {
      this.spinner.hide();
    });
  }

  plotData() {

    const chart = new CanvasJS.Chart('chartContainer', {
      title: {
        text: this.translate.instant('collectionReport.percentPerModelName')
      },
      legend: {
        maxWidth: 350,
        itemWidth: 120
      },
      data: [
      {
        type: 'pie',
        showInLegend: true,
        legendText: '{indexLabel}',
        dataPoints: this.dataPoints1
      }
      ]
    });
    chart.render();
    const chart1 = new CanvasJS.Chart('agentContainer', {
      title: {
        text: this.translate.instant('collectionReport.percentagePerAgent')
      },
      legend: {
        maxWidth: 350,
        itemWidth: 120
      },
      data: [
      {
        type: 'pie',
        showInLegend: true,
        legendText: '{indexLabel}',
        dataPoints: this.agentData
      }
      ]
    });
    chart1.render();
  }

  resetFilters() {
    this.input = new CollectionReport();
    this.selctedProjects = [];
  }
}

