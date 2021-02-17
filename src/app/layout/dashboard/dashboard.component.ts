import { Component } from '@angular/core';
import { IProperty } from 'src/app/common/property';
import { AdminService } from 'src/app/services/admin.service';
import * as CanvasJS from 'src/assets/js/canvasjs.min.js';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {

  locale: any;
  today = new Date();
  chartCommision: any = [];
  chartSales: any = [];
  total_commission = 0;
  total_sales = 0;
  all_properties_count = 0;
  rent_properties_count = 0;
  sale_properties_count = 0;
  fullName: string;
  colorScheme = {
    domain: ['#4eb96f']
  };
  sellerRepBanks = [];
  amenities = Array<any>();
  selctedLocalities: Array<any>;
  selctedCities: Array<any>;
  multiDropdownSettings = {};
  public parameter: IProperty = {};
  public location: IProperty = {};

  constructor (private admin: AdminService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,) {
    const date = new Date();

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
    // this.parameter.min = new Date(date.getFullYear() + '-' + (date.getMonth() - 4) + '-' + '01');
    // this.parameter.max = date;
    this.parameter.min = moment().subtract(6, 'months').toDate();
    this.parameter.max = moment().toDate();

    this.admin.loginData$.subscribe(success => {
      this.fullName = success['name'];
    });
    this.getCountries();
    this.getReportData();
    this.iniDropDownSetting();
    this.selctedLocalities = [];
    this.selctedCities = [];
  }
  iniDropDownSetting() {
    this.multiDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name_en',
      selectAllText: this.translate.instant('commonBlock.selectAll'),
      unSelectAllText: this.translate.instant('commonBlock.unselectAll'),
      searchPlaceholderText: this.translate.instant('commonBlock.search'),
      allowSearchFilter: true,
      itemsShowLimit: 2
    };
  }

  unsetProject(item: any) {
    let i = 0;
    this.selctedLocalities.map(r => {
      if (r.id == item.id) {
        this.selctedLocalities.splice(i, 1);
      }
      i = i + 1;
    });
  }
  unsetCities(item: any) {
    let i = 0;
    this.selctedCities.map(r => {
      if (r.id == item.id) {
        this.selctedCities.splice(i, 1);
      }
      i = i + 1;
    });
  }
  onItemSelect(param: any, obj: any) {
    this[param].push(obj);
  }

  

  getListing(){
    const input: any = JSON.parse(JSON.stringify(this.parameter));
    if (this.selctedLocalities) {
      const d = this.selctedLocalities.map(o => o.id);
      // console.log(d, "filter")
      input.selctedLocalities = d;
    }
    if (this.selctedCities) {
      const d = this.selctedCities.map(o => o.id);
      // console.log(d, "filter")
      input.selctedCities = d;
    }
  }

  getLocalityBuildings( data){

  }

  resetFilters(){
    this.selctedLocalities = [];
  }

  getCountries() {
    this.admin.postDataApi('getCountryLocality', {}).subscribe(r => {
      this.location.countries = r['data'];
    });
  }

  onCountryChange(id) {
    this.parameter.country_id = id;
    this.location.states = []; this.parameter.state_id = '0';
    this.location.cities = []; this.parameter.city_id = '0';
    this.location.localities = []; this.parameter.locality_id = '0';
    this.parameter.buildings = []; this.parameter.building_id = '0';
    if (!id || id.toString() === '0') {
      return false;
    }

    this.parameter.country_id = id;
    const selectedCountry = this.location.countries.filter(x => x.id.toString() === id);
    this.location.states = selectedCountry[0].states;
  }

  onStateChange(id) {
    this.location.cities = []; this.parameter.city_id = '0';
    this.location.localities = []; this.parameter.locality_id = '0';
    this.parameter.buildings = []; this.parameter.building_id = '0';
    if (!id || id.toString() === '0') {
      return false;
    }

    this.parameter.state_id = id;
    const selectedState = this.location.states.filter(x => x.id.toString() === id);
    this.location.cities = selectedState[0].cities;
  }

  onCityChange(id) {
    this.location.localities = []; this.parameter.locality_id = '0';
    this.parameter.buildings = []; this.parameter.building_id = '0';
    if (!id || id.toString() === '0') {
      return false;
    }

    this.parameter.city_id = id;
    const selectedCountry = this.location.cities.filter(x => x.id.toString() === id);
    this.location.localities = selectedCountry[0].localities;
  }

  onLocalityChange(id) {
    this.parameter.buildings = []; this.parameter.building_id = '0';
    if (!id || id.toString() === '0') {
      return false;
    }
    this.parameter.locality_id = id;
  }

  getReportData() {
    this.parameter.noResultFound = false;
   // const input = {start_date: this.parameter.min, end_date: this.parameter.max};
    const input = {start_date: moment(this.parameter.min).format('YYYY-MM-DD'), end_date: moment(this.parameter.max).format('YYYY-MM-DD')};
    this.spinner.show();
    this.admin.postDataApi('dashboard', input).subscribe(
    success => {
      this.spinner.hide();
      this.all_properties_count = success.data.all_properties_count;
      this.rent_properties_count = success.data.rent_properties_count;
      this.sale_properties_count = success.data.sale_properties_count;
      const data = [];
      const data1 = [];
      // commission graph data
      success.data.commission_graph.forEach(element => {
        this.total_commission = this.total_commission + element.commission;
        data.push({
          'name': element.month_name + ', ' + element.year,
          'value': element.commission
        });
      });
      this.chartCommision = data;

      // sale graph data
      success.data.sale_graph.forEach(element => {
        this.total_sales = this.total_sales + element.sale;
        data1.push({
          'name': element.month_name + ', ' + element.year,
          'value': element.sale
        });
      });

      this.chartSales = [{
        name: 'Sales',
        series: data1
      }];
      this.plotData();
    }, error => {
      this.spinner.hide();
    });
  }

  plotData() {
    let agentData = [
      { id: 779, y: 3, indexLabel: "Presale  ", is_external_agent: 0 },
      { id: 781, y: 14, indexLabel: "For Sale  ", is_external_agent: 0 }
    ];
    let agentData1 = [
      { id: 779, y: 3, indexLabel: "Without  ", is_external_agent: 0 },
      { id: 781, y: 14, indexLabel: "Basic  ", is_external_agent: 0 },
      { id: 781, y: 14, indexLabel: "Semi  ", is_external_agent: 0 },
      { id: 781, y: 14, indexLabel: "Complete  ", is_external_agent: 0 }
    ];
    const chart = new CanvasJS.Chart('agentContainer', {
      title: {
        text: 'Project possesion'
      },
      subtitles: [{
        text: "Country/State/City/Locality",
      }],
      legend: {
        maxWidth: 350,
        itemWidth: 120
      },
      data: [
        {
          type: 'pie',
          showInLegend: true,
          legendText: '{indexLabel}',
          dataPoints: agentData
        }
      ]
    });
    chart.render();

    const chart1 = new CanvasJS.Chart('agentContainer1', {
      title: {
        text: 'Project status'
      },
      subtitles: [{
        text: "Country/State/City/Locality",
      }],
      legend: {
        maxWidth: 350,
        itemWidth: 120
      },
      data: [
        {
          type: 'pie',
          showInLegend: true,
          legendText: '{indexLabel}',
          dataPoints: agentData1
        }
      ]
    });
    chart1.render();

    const chart2 = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      exportFileName: 'commission-report',
      exportEnabled: true,
      theme: 'light2',
      dataPointWidth: 30,
      title: {
         text: "Localities with more project"
      },
      subtitles: [{
        text: "Country/State/City/Locality",
      }],
      axisY: {
        gridColor: '#222222ab',
        tickColor: '#222222ab'
      },
      toolTip: {
        shared: true
      },
      data: [{
        type: 'stackedColumn',
        showInLegend: true,
        name: 'Without info.',
        
        dataPoints: [
          { label: "Country Club", y: 6 },
          { label: "Amerciana", y: 3 },
          { label: "Colomos providencia", y: 5 },
          { label: "Parados providencia", y: 9 },
          { label: "Providencia 4ta", y: 1 },
        ]
      },
      {
        type: 'stackedColumn',
        showInLegend: true,
        name: 'Basic',
        
        dataPoints: [
          { label: "Country Club", y: 6 },
          { label: "Amerciana", y: 3 },
          { label: "Colomos providencia", y: 5 },
          { label: "Parados providencia", y: 9 },
          { label: "Providencia 4ta", y: 1 },
        ]
      },
      {
        type: 'stackedColumn',
        showInLegend: true,
        name: 'Semicomplete',
        
        dataPoints: [
          { label: "Country Club", y: 3 },
          { label: "Amerciana", y: 7 },
          { label: "Colomos providencia", y: 6 },
          { label: "Parados providencia", y: 7 },
          { label: "Providencia 4ta", y: 1 },
        ]
      },
      {
        type: 'stackedColumn',
        showInLegend: true,
        name: 'Complete',
       
        dataPoints: [
          { label: "Country Club", y: 3 },
          { label: "Amerciana", y: 7 },
          { label: "Colomos providencia", y: 6 },
          { label: "Parados providencia", y: 7 },
          { label: "Providencia 4ta", y: 1 },
        ]
      }]
    });
    chart2.render();

    const chart3 = new CanvasJS.Chart('chartContainer1', {
      animationEnabled: true,
      exportFileName: 'commission-report',
      exportEnabled: true,
      theme: 'light2',
      
      dataPointWidth: 30,
      title: {
         text: "Properties status"
      },
      
      axisY: {
        gridColor: '#222222ab',
        tickColor: '#222222ab'
      },
      toolTip: {
        shared: true
      },
      data: [{
        type: 'stackedColumn',
        showInLegend: true,
        name: 'Approved',
       
        dataPoints: [
          { label: "Guadalajara", y: 31 },
          { label: "Zapopan", y: 76 },
          { label: "Tlaquepaque", y: 65 },
          { label: "Vallarta", y: 70 },
          { label: "Tonala", y: 11 },
        ]
      },
      {
        type: 'stackedColumn',
        showInLegend: true,
        name: 'Unapproved',
        
        dataPoints: [
          { label: "Guadalajara", y: 31 },
          { label: "Zapopan", y: 76 },
          { label: "Tlaquepaque", y: 65 },
          { label: "Vallarta", y: 70 },
          { label: "Tonala", y: 11 },
        ]
      },
      {
        type: 'stackedColumn',
        showInLegend: true,
        name: 'P.review',
       
        dataPoints: [
          { label: "Guadalajara", y: 31 },
          { label: "Zapopan", y: 76 },
          { label: "Tlaquepaque", y: 65 },
          { label: "Vallarta", y: 70 },
          { label: "Tonala", y: 11 },
        ]
      },
      {
        type: 'stackedColumn',
        showInLegend: true,
        name: 'Expected IVA Amount',
        
        dataPoints: [
          { label: "Guadalajara", y: 3 },
          { label: "Zapopan", y: 7 },
          { label: "Tlaquepaque", y: 6 },
          { label: "Vallarta", y: 7 },
          { label: "Tonala", y: 1 },
        ]
      }]
    });
    chart3.render();
  }
  
}
