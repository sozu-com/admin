import { Component } from '@angular/core';
import { IProperty } from 'src/app/common/property';
import { AdminService } from 'src/app/services/admin.service';
import * as CanvasJS from 'src/assets/js/canvasjs.min.js';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  // locale: any;
  // today = new Date();
  // //items: any = [];
  // // total: any = 0;
  // chartCommision: any = [];
  // chartSales: any = [];
  // total_commission = 0;
  // total_sales = 0;
  // all_properties_count = 0;
  // rent_properties_count = 0;
  // sale_properties_count = 0;
  //fullName: string;
  reportType: number = 1;
  reportType1: number = 1;
  // colorScheme = {
  //   domain: ['#4eb96f']
  // };
  // sellerRepBanks = [];
  // amenities = Array<any>();
  // selctedLocalities: Array<any> = [];
  // selctedCities: Array<any> = [];
  //public parameter: IProperty = {};

  public multiDropdownSettings = {};
  public location: IProperty = {};
  public language_code: string;
  public selectedLocation: { selectedCountry: string, selectedStates: any[], selectedCities: any[], selectedLocalities: any[] } =
    { selectedCountry: '', selectedStates: [], selectedCities: [], selectedLocalities: [] };

  constructor(
    private adminService: AdminService,
    private spinnerService: NgxSpinnerService,
    private translate: TranslateService
  ) {
    //const date = new Date();
    // this.locale = {
    //   firstDayOfWeek: 0,
    //   dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    //   dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    //   dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    //   monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    //     'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    //   monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun',
    //     'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    //   today: 'Hoy',
    //   clear: 'Clara',
    //   dateFormat: 'mm/dd/yy',
    //   weekHeader: 'Wk'
    // };
    // this.parameter.min = new Date(date.getFullYear() + '-' + (date.getMonth() - 4) + '-' + '01');
    // this.parameter.max = date;
    // this.parameter.min = moment().subtract(6, 'months').toDate();
    // this.parameter.max = moment().toDate();
    // this.adminService.loginData$.subscribe(success => {
    //   this.fullName = success['name'];
    // });
    //this.getReportData();
    // this.selctedLocalities = [];
    // this.selctedCities = [];
  }

  ngOnInit(): void {
    this.language_code = localStorage.getItem('language_code');
    this.initializedDropDownSetting();
    this.getCountries();
    this.getDashboardDetails();
  }

  initializedDropDownSetting = (): void => {
    this.multiDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: this.language_code == 'en' ? 'name_en' : 'name_es',
      selectAllText: this.translate.instant('commonBlock.selectAll'),
      unSelectAllText: this.translate.instant('commonBlock.unselectAll'),
      searchPlaceholderText: this.translate.instant('commonBlock.search'),
      allowSearchFilter: true,
      itemsShowLimit: 1
    };
  }

  getCountries = (): void => {
    this.spinnerService.show();
    this.adminService.postDataApi('getCountryLocality', {}).subscribe((response) => {
      this.location.countries = response.data;
      this.spinnerService.hide();
    }, (error) => {
      this.spinnerService.hide();
    });
  }

  getDashboardDetails = (): void => {
    this.spinnerService.show();
    const postData = {
      country_id: this.selectedLocation.selectedCountry || null,
      states: this.selectedLocation.selectedStates.length > 0 ? this.selectedLocation.selectedStates.map(o => o.id) : null,
      cities: this.selectedLocation.selectedCities.length > 0 ? this.selectedLocation.selectedCities.map(o => o.id) : null,
      localities: this.selectedLocation.selectedLocalities.length > 0 ? this.selectedLocation.selectedLocalities.map(o => o.id) : null,
    };
    // this.adminService.postDataApi('getDashboardDetails', postData).subscribe((success) => {
    //   this.spinnerService.hide();
    //   this.location.buildings = success.building;
    //   this.location.locality = success.locality || [];
    //   this.location.cities1 = success.city || [];
    //   this.location.propertyDetails = success.property;
    //   this.plotData();
    // }, (error) => {
    //   this.spinnerService.hide();
    // });   
    forkJoin([
      this.adminService.postDataApi('getDashboardDetails-v2', postData), this.adminService.postDataApi('getDashboardDetails-v3', postData),
      this.adminService.postDataApi('getDashboardDetails-v4', postData), this.adminService.postDataApi('getDashboardDetails-v5', postData)
    ]).subscribe((response: any[]) => {
      this.spinnerService.hide();
      this.location.buildings = response[0].data;
      this.location.propertyDetails = response[1].data;
      this.location.locality = response[2].data || [];
      this.location.cities1 = response[3].data || [];
      this.plotData();
    }, (error) => {
      this.spinnerService.hide();
    });
  }

  resetSelectedLocation = (): void => {
    this.selectedLocation.selectedCountry = '';
    this.selectedLocation.selectedStates = [];
    this.location.states = [];
    this.selectedLocation.selectedCities = [];
    this.location.cities = [];
    this.selectedLocation.selectedLocalities = [];
    this.location.localities = [];
    this.getDashboardDetails();
  }

  onCountryChange = (): void => {
    this.selectedLocation.selectedStates = [];
    this.location.states = [];
    this.selectedLocation.selectedCities = [];
    this.location.cities = [];
    this.selectedLocation.selectedLocalities = [];
    this.location.localities = [];
    const selectedCountry = this.location.countries.filter(x => x.id.toString() === this.selectedLocation.selectedCountry.toString());
    this.location.states = selectedCountry.length > 0 ? selectedCountry[0].states : [];
  }

  onStateChangeAll = (data: any[]): void => {
    this.selectedLocation.selectedStates = data;
    this.onStateChange();
  }

  onStateChange = (): void => {
    this.selectedLocation.selectedCities = [];
    this.location.cities = [];
    this.selectedLocation.selectedLocalities = [];
    this.location.localities = [];
    const cities = [];
    this.selectedLocation.selectedStates.forEach((stateObject) => {
      const selectedCities = this.location.states.filter(x => x.id == stateObject.id);
      (selectedCities[0].cities || []).forEach((citiesObject) => {
        cities.push(citiesObject);
      });
    });
    this.location.cities = cities;
  }

  onCityChangeAll = (data: any[]): void => {
    this.selectedLocation.selectedCities = data;
    this.onCityChange();
  }

  onCityChange = (): void => {
    this.selectedLocation.selectedLocalities = [];
    this.location.localities = [];
    const localities = [];
    this.selectedLocation.selectedCities.forEach((cityObject) => {
      const selectedlocality = this.location.cities.filter(x => x.id == cityObject.id);
      (selectedlocality[0].localities || []).forEach((localityObject) => {
        localities.push(localityObject);
      });
    });
    this.location.localities = localities;
  }

  // getReportData() {
  //   //this.parameter.noResultFound = false;
  //   // const input = {start_date: this.parameter.min, end_date: this.parameter.max};
  //   const input = { start_date: moment(this.parameter.min).format('YYYY-MM-DD'), end_date: moment(this.parameter.max).format('YYYY-MM-DD') };
  //   this.spinner.show();
  //   this.admin.postDataApi('dashboard', input).subscribe(
  //     success => {
  //       this.spinner.hide();
  //       this.all_properties_count = success.data.all_properties_count;
  //       this.rent_properties_count = success.data.rent_properties_count;
  //       this.sale_properties_count = success.data.sale_properties_count;
  //       const data = [];
  //       const data1 = [];
  //       // commission graph data
  //       success.data.commission_graph.forEach(element => {
  //         this.total_commission = this.total_commission + element.commission;
  //         data.push({
  //           'name': element.month_name + ', ' + element.year,
  //           'value': element.commission
  //         });
  //       });
  //       this.chartCommision = data;

  //       // sale graph data
  //       success.data.sale_graph.forEach(element => {
  //         this.total_sales = this.total_sales + element.sale;
  //         data1.push({
  //           'name': element.month_name + ', ' + element.year,
  //           'value': element.sale
  //         });
  //       });

  //       this.chartSales = [{
  //         name: 'Sales',
  //         series: data1
  //       }];
  //       //this.plotData();
  //     }, error => {
  //       this.spinner.hide();
  //     });
  // }

  plotData = (): void => {
    const chart = new CanvasJS.Chart('agentContainer', {
      title: { text: this.translate.instant('deshboard.projectPossesion') ,fontFamily: "tahoma" , fontWeight: "500" },
      subtitles: [{ text: this.getselectedLocation() ,fontFamily: "tahoma" }],
      legend: { maxWidth: 350, itemWidth: 120 },
      data: [
        {
          type: 'pie', showInLegend: true, legendText: '{indexLabel}',
          dataPoints: [
            { id: 779, y: (this.location.buildings || {}).sale || 0, indexLabel: this.translate.instant('deshboard.Sale'), is_external_agent: 0 },
            { id: 781, y: (this.location.buildings || {}).presale || 0, indexLabel: this.translate.instant('deshboard.Presale'), is_external_agent: 0 }
          ]
        }
      ]
    });
    chart.render();

    const chart1 = new CanvasJS.Chart('agentContainer1', {
      title: { text: this.translate.instant('deshboard.Projectsstatus') ,fontFamily: "tahoma" , fontWeight: "500"},
      subtitles: [{ text: this.getselectedLocation(),fontFamily: "tahoma" }],
      legend: { maxWidth: 350, itemWidth: 120 },
      data: [
        {
          type: 'pie', showInLegend: true, legendText: '{indexLabel}',
          dataPoints: [
            { id: 779, y: (this.location.buildings || {}).without_information || 0, indexLabel: this.translate.instant('deshboard.Withoutinformation'), is_external_agent: 0 },
            { id: 781, y: (this.location.buildings || {}).basic_information || 0, indexLabel: this.translate.instant('deshboard.Basic'), is_external_agent: 0 },
            { id: 781, y: (this.location.buildings || {}).semi_complete || 0, indexLabel: this.translate.instant('deshboard.Semicomplete'), is_external_agent: 0 },
            { id: 781, y: (this.location.buildings || {}).complete || 0, indexLabel: this.translate.instant('deshboard.Complete'), is_external_agent: 0 }
          ]
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
      title: { text: this.translate.instant('deshboard.localitiesWithMoreProject'),fontFamily: "tahoma" , fontWeight: "500" },
      subtitles: [{ text: this.getselectedLocation() ,fontFamily: "tahoma"}],
      axisY: { gridColor: '#222222ab', tickColor: '#222222ab' },
      toolTip: { shared: true },
      data: [
        {
          type: 'stackedColumn', showInLegend: true,
          name: this.translate.instant('deshboard.Withoutinformation'), dataPoints: this.getMaxFiveLocality('without_information')
        },
        {
          type: 'stackedColumn', showInLegend: true,
          name: this.translate.instant('deshboard.Basic'), dataPoints: this.getMaxFiveLocality('basic_information')
        },
        {
          type: 'stackedColumn', showInLegend: true,
          name: this.translate.instant('deshboard.Semicomplete'), dataPoints: this.getMaxFiveLocality('semi_information')
        },
        {
          type: 'stackedColumn', showInLegend: true,
          name: this.translate.instant('deshboard.Complete'), dataPoints: this.getMaxFiveLocality('complete')
        }
      ]
    });
    chart2.render();

    const chart3 = new CanvasJS.Chart('chartContainer1', {
      animationEnabled: true,
      exportFileName: 'commission-report',
      exportEnabled: true,
      theme: 'light2',
      dataPointWidth: 30,
      title: { text: this.translate.instant('deshboard.propertiesStatus') ,fontFamily: "tahoma" , fontWeight: "500"},
      subtitles: [{ text: this.getselectedLocation() ,fontFamily: "tahoma"}],
      axisY: { gridColor: '#222222ab', tickColor: '#222222ab' },
      toolTip: { shared: true },
      data: [
        {
          type: 'stackedColumn', showInLegend: true,
          name: this.translate.instant('deshboard.Approved'), dataPoints: this.getMaxFiveCity('approved')
        },
        {
          type: 'stackedColumn', showInLegend: true,
          name: this.translate.instant('deshboard.Unapproved'), dataPoints: this.getMaxFiveCity('unapproved')
        },
        {
          type: 'stackedColumn', showInLegend: true,
          name: this.translate.instant('deshboard.pReview'), dataPoints: this.getMaxFiveCity('pending')
        },
        {
          type: 'stackedColumn', showInLegend: true,
          name: this.translate.instant('deshboard.expectedIVAAmount'), dataPoints: this.getMaxFiveCity('draft')
        }
      ]
    });
    chart3.render();

    const availabilityContainer = new CanvasJS.Chart('availabilityContainer', {
      title: { text: this.translate.instant('deshboard.propertyAvailability'),fontFamily: "tahoma" , fontWeight: "500" },
      subtitles: [{ text: this.getselectedLocation() ,fontFamily: "tahoma"}],
      legend: { maxWidth: 350, itemWidth: 120 },
      data: [
        {
          type: 'pie', showInLegend: true, legendText: '{indexLabel}',
          dataPoints: [
            { id: 779, y: (this.location.propertyDetails || {}).forSale || 0, indexLabel: this.translate.instant('deshboard.forSale'), is_external_agent: 0 },
            { id: 781, y: (this.location.propertyDetails || {}).forRent || 0, indexLabel: this.translate.instant('deshboard.Rent'), is_external_agent: 0 },
            { id: 781, y: (this.location.propertyDetails || {}).inventory || 0, indexLabel: this.translate.instant('deshboard.Inventory'), is_external_agent: 0 }
          ]
        }
      ]
    });
    availabilityContainer.render();

    const propertyStatusContainer = new CanvasJS.Chart('propertyStatusContainer', {
      title: { text: this.translate.instant('deshboard.propertyStatus') ,fontFamily: "tahoma" , fontWeight: "500"},
      subtitles: [{ text: this.getselectedLocation() ,fontFamily: "tahoma"}],
      legend: { maxWidth: 350, itemWidth: 120 },
      data: [
        {
          type: 'pie', showInLegend: true, legendText: '{indexLabel}',
          dataPoints: [
            { id: 779, y: (this.location.propertyDetails || {}).approved || 0, indexLabel: this.translate.instant('deshboard.Approved'), is_external_agent: 0 },
            { id: 781, y: (this.location.propertyDetails || {}).unapproved || 0, indexLabel: this.translate.instant('deshboard.Unapproved'), is_external_agent: 0 },
            { id: 781, y: (this.location.propertyDetails || {}).pending || 0, indexLabel: this.translate.instant('deshboard.PendingReview'), is_external_agent: 0 },
            { id: 781, y: (this.location.propertyDetails || {}).draft || 0, indexLabel: this.translate.instant('deshboard.InDraft'), is_external_agent: 0 }
          ]
        }
      ]
    });
    propertyStatusContainer.render();
  }

  getMaxFiveCity(text: string) {
    const data = [];
    for (let index = 0; index < 5; index++) {
      const element = this.location.cities1[index] || {};
      data.push({
        label: this.language_code == 'en' ? (element.city || {}).name_en : (element.city || {}).name_es,
        y: parseInt(element[text])
      });
    }
    return data;
  }

  getParseInt(firstValue: number, secondValue: number) {
    const data = Number.isNaN(firstValue / secondValue)  ? 0 : (firstValue / secondValue);
    return parseFloat(((data * 100).toFixed(2) || '0').toString());
  }

  getMaxFiveLocality(text: string) {
    const data = [];
    for (let index = 0; index < 5; index++) {
      const element = this.location.locality[index] || {};
      data.push({
        label: this.language_code == 'en' ? (element.locality || {}).name_en : (element.locality || {}).name_es,
        y: parseInt(element[text])
      });
    }
    return data;
  }

  getselectedLocation = (): any => {
    const country = this.selectedLocation.selectedCountry != '' ? this.location.countries.find(x => x.id.toString() === this.selectedLocation.selectedCountry.toString()) : 'All';
    const countryName = country === 'All' ? 'All' : this.language_code == 'en' ? country.name_en : country.name_es;
    const state = this.selectedLocation.selectedStates.length > 0 ? this.selectedLocation.selectedStates[0][this.language_code == 'en' ? 'name_en' : 'name_es'] : 'All';
    const stateName = state === 'All' ? 'All' : this.selectedLocation.selectedStates.length == 1 ? state : state + '+' + (this.selectedLocation.selectedStates.length - 1);
    const city = this.selectedLocation.selectedCities.length > 0 ? this.selectedLocation.selectedCities[0][this.language_code == 'en' ? 'name_en' : 'name_es'] : 'All';
    const cityName = city === 'All' ? 'All' : this.selectedLocation.selectedCities.length == 1 ? city : city + '+' + (this.selectedLocation.selectedCities.length - 1);
    const locality = this.selectedLocation.selectedLocalities.length > 0 ? this.selectedLocation.selectedLocalities[0][this.language_code == 'en' ? 'name_en' : 'name_es'] : 'All';
    const localityName = locality === 'All' ? 'All' : this.selectedLocation.selectedLocalities.length == 1 ? state : state + '+' + (this.selectedLocation.selectedLocalities.length - 1);
    return `${countryName}/${stateName}/${cityName}/${localityName}`;
  }

}
