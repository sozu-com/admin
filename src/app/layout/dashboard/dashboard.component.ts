import { Component } from '@angular/core';
import { IProperty } from 'src/app/common/property';
import { AdminService } from 'src/app/services/admin.service';
import * as CanvasJS from 'src/assets/js/canvasjs.min.js';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  locale: any;
  today = new Date();
  //items: any = [];
  // total: any = 0;
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
  selctedLocalities: Array<any> = [];
  selctedCities: Array<any> = [];
  multiDropdownSettings = {};
  public parameter: IProperty = {};
  public location: IProperty = {};
  language_code:string;

  constructor (private admin: AdminService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,) {
    //const date = new Date();

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
    // this.parameter.min = moment().subtract(6, 'months').toDate();
    // this.parameter.max = moment().toDate();

    this.admin.loginData$.subscribe(success => {
      this.fullName = success['name'];
    });
    this.getCountries();
    //this.getReportData();
    this.iniDropDownSetting();
    this.getListing();
    this.selctedLocalities = [];
    this.selctedCities = [];
  }

  ngOnInit() {
    this.language_code = localStorage.getItem('language_code');
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
    this.spinner.show();
    const postData = {
      country_id: this.parameter.country_id || '',
      states: this.parameter.states || '',
      localities : this.selctedLocalities.length > 0 ? this.selctedLocalities.map(o => o.id) : '',
      cities : this.selctedCities.length > 0 ? this.selctedCities.map(o => o.id) :''
    };
    this.admin.postDataApi('getDashboardDetails', postData).subscribe(
      success => {
        this.location.buildings = success.building;
        this.location.locality = success.locality
        this.plotData();
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      });
  }

  getLocalityBuildings( data){

  }

  resetFilters(){
    this.selctedCities = [];
    this.selctedLocalities = [];
    this.getListing();
  }

  getCountries() {
    this.spinner.show();
    this.admin.postDataApi('getCountryLocality', {}).subscribe(r => {
      this.location.countries = r['data'];
      this.spinner.hide();
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
    this.selctedCities = [];
    this.selctedLocalities = [];
    this.location.cities = []; this.parameter.city_id = '0';
    this.location.localities = []; this.parameter.locality_id = '0';
    this.parameter.buildings = []; this.parameter.building_id = '0';
    if (!id || id.toString() === '0') {
      return false;
    }

    this.parameter.states = id;
    const selectedState = this.location.states.filter(x => x.id.toString() === id);
    this.location.cities = selectedState[0].cities;
  }

  onCityChangeAll=(data:any[]):void=>{
    this.selctedCities = data;
    this.onCityChange();
  }

  onCityChange=():void=> {
    this.location.localities = [];
    // this.location.localities = []; this.parameter.locality_id = '0';
    // this.parameter.buildings = []; this.parameter.building_id = '0';
    // if (!data.id || data.id.toString() === '0') {
    //   return false;
    // }
    //this.parameter.city_id = data.id;
    const localities = [];
    this.selctedCities.forEach((cityObject)=>{
      const selectedCountry = this.location.cities.filter(x => x.id == cityObject.id);
      (selectedCountry[0].localities || []).forEach((localityObject)=>{
        localities.push(localityObject);
      });
    });
   this.location.localities = localities;
  }

  onLocalityChange(id) {
    this.parameter.buildings = []; this.parameter.building_id = '0';
    if (!id || id.toString() === '0') {
      return false;
    }
    this.parameter.locality_id = id;
  }

  getReportData() {
    //this.parameter.noResultFound = false;
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
      //this.plotData();
    }, error => {
      this.spinner.hide();
    });
  }

  plotData() {
    const agentData = [
      { id: 779, y: 0, indexLabel: "Presale  ", is_external_agent: 0 },
      { id: 781, y: 0, indexLabel: "For Sale  ", is_external_agent: 0 }
    ];
    const agentData1 = [
      { id: 779, y: (this.location.buildings || {}).without_information, indexLabel: "Without  ", is_external_agent: 0 },
      { id: 781, y: (this.location.buildings || {}).basic_information, indexLabel: "Basic  ", is_external_agent: 0 },
      { id: 781, y: (this.location.buildings || {}).semi_complete, indexLabel: "Semi  ", is_external_agent: 0 },
      { id: 781, y: (this.location.buildings || {}).complete, indexLabel: "Complete  ", is_external_agent: 0 }
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
        
        dataPoints: this.getMaxFiveLocality('without_information')
      },
      {
        type: 'stackedColumn',
        showInLegend: true,
        name: 'Basic',
        
        dataPoints: this.getMaxFiveLocality('basic_information')
      },
      {
        type: 'stackedColumn',
        showInLegend: true,
        name: 'Semicomplete',
        
        dataPoints: this.getMaxFiveLocality('semi_complete')
      },
      {
        type: 'stackedColumn',
        showInLegend: true,
        name: 'Complete',
       
        dataPoints: this.getMaxFiveLocality('complete')
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

  getParseInt(firstValue:number,secondValue:number){
    return parseInt(((firstValue / secondValue)*100 || '0').toString());
  }

  getMaxFiveLocality(text:string){
    const data = [];
    for (let index = 0; index < 5; index++) {
      const element = this.location.locality[index];
      data.push({label:this.language_code == 'en' ? element.locality_id.name_en : element.locality_id.name_es,
      y: element[text]});      
    }
    return data;
  }
  
}
