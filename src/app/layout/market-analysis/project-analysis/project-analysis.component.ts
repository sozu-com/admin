import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from 'src/app/services/admin.service';
import * as moment from 'moment';
import { PricePipe } from 'src/app/pipes/price.pipe';
import * as CanvasJS from 'src/assets/js/canvasjs.min.js';

@Component({
  selector: 'app-project-analysis',
  templateUrl: './project-analysis.component.html',
  styleUrls: ['./project-analysis.component.css'],
  providers: [PricePipe]
})
export class ProjectAnalysisComponent implements OnInit {
  min_date: any;
  max_date: any;
  selectedProject: any[] = [];
  selectedAvailability = 0;
  selectedModels: any[] = [];
  models: any;
  multiDropdownSettings = {};
  language_code: string;
  locale: any;
  projects: any;
  sold_property_details: any;
  graph_data: any;
  selectedGraph = 1;
  constructor(
    public admin: AdminService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.language_code = localStorage.getItem('language_code');
    this.min_date = moment().subtract(10, 'months').toDate();
    this.max_date = moment().toDate();
    this.iniDropDownSetting();
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
    this.searchBuilding();
    this.getdata();
  }

  iniDropDownSetting() {
    this.multiDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: this.translate.instant('commonBlock.selectAll'),
      unSelectAllText: this.translate.instant('commonBlock.unselectAll'),
      searchPlaceholderText: this.translate.instant('commonBlock.search'),
      allowSearchFilter: true,
      itemsShowLimit: 2
    };
  }

  searchBuilding() {
    this.spinner.show();
    this.admin.postDataApi('getProjectsForCollections', {})
      .subscribe(
        success => {
          this.projects = success['data'];
        },
        error => {
          this.spinner.hide();
        }
      );
  }

  getModelsByBuilding(ids) {
    this.admin.postDataApi('getModelsByBuilding', { project_id: ids }).subscribe(success => {
      this.models = success.data;
    }, error => {
      this.spinner.hide();
    });
  }
  onCityChange(){

  }
  onCityChangeAll(item){

  }
  getdata() {
    this.getMarketPricesByModels();
    this.getMarketPricesByMonth();
  }

  getMarketPricesByModels() {
    let projectIds= [];
    let modelIds= [];
    if(this.selectedProject.length > 0){
      this.selectedProject.forEach(item => {
        projectIds.push(item.id);
      });
    }

    if(this.selectedModels.length > 0){
      this.selectedModels.forEach(item => {
        modelIds.push(item.id);
      });
    }
    const input = {
      availability_filter: this.selectedAvailability,
      start_date: this.min_date,
      end_date: this.max_date,
      project_id: projectIds,
      model_id: modelIds
    }
    this.admin.postDataApi('getMarketPricesByModels', input)
      .subscribe(
        success => {
          this.sold_property_details = success.data;
          // console.log('suc', success1);
        });
  }

  getMarketPricesByMonth() {
    let projectIds= [];
    let modelIds= [];
    if(this.selectedProject.length > 0){
      this.selectedProject.forEach(item => {
        projectIds.push(item.id);
      });
    }

    if(this.selectedModels.length > 0){
      this.selectedModels.forEach(item => {
        modelIds.push(item.id);
      });
    }
    const input = {
      availability_filter: this.selectedAvailability,
      start_date: this.min_date,
      end_date: this.max_date,
      project_id: projectIds,
      model_id: modelIds,
      price_type: this.selectedGraph
    }
    this.spinner.show();
    this.admin.postDataApi('getMarketPricesByMonth', input)
      .subscribe(
        success => {
          this.graph_data = success.data;
          const chart = new CanvasJS.Chart('lineChartContainer', {
            animationEnabled: true,
            exportFileName: 'sales-booking',
            exportEnabled: true,
            theme: 'light2',
            toolTip: {
              shared: true,
              contentFormatter: function (e) {
                var content = " ";
                for (var i = 0; i < e.entries.length; i++) {
                  content += e.entries[i].dataPoint.label + ": " + e.entries[i].dataPoint.y;
                  content += "<br/>";
                  content += "Properties" + ": " + e.entries[i].dataPoint.properties_count;
                  content += "<br/>";
                }
                return content;
              }
            },
            title: {
              // text: "Simple Line Chart"
            },
            axisY: {
              includeZero: false
            },
            data: [{
              type: 'line',
              indexLabelFontSize: 16,
              dataPoints: this.graph_data
            }]
          });
          chart.render();
          this.spinner.hide();
        },error=>{
          this.spinner.hide();
        });
  }

  onProjectchange() {
    let ids = [];
    this.selectedProject.forEach(item => {
      ids.push(item.id);
    });
    if (ids.length > 0) {
      this.getModelsByBuilding(ids);
    }
    else {
      this.models = []
    }
  }


  onProjectChangeAll(item) {
    let ids = [];
    this.selectedProject.forEach(item => {
      ids.push(item.id);
    });
    if (ids.length > 0) {
      this.getModelsByBuilding(ids);
    }
    else {
      this.models = []
    }
  }

  onModelschange(){

  }

  onModelsChangeAll(){

  }

  onSelectGraph(){
  this.getMarketPricesByMonth();
  }
}
                                                          