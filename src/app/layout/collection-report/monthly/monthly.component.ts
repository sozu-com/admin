import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProperty } from 'src/app/common/property';
import { Constant } from 'src/app/common/constants';
import { AdminService } from 'src/app/services/admin.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { CollectionReport } from '../../../models/collection-report.model';
import { Towers } from '../../../models/addProject.model';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { ApiConstants } from 'src/app/common/api-constants';
import { element } from 'protractor';
import { forkJoin } from 'rxjs';
import { PricePipe } from 'src/app/pipes/price.pipe';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Component({
  selector: 'app-monthly',
  templateUrl: './monthly.component.html',
  styleUrls: ['./monthly.component.css']
})
export class MonthlyComponent implements OnInit {
  exportfinalData: Array<any>;
  public parameter: IProperty = {};
  singleDropdownSettings: any;
  multiDropdownSettings: any;
  legalRepDropdownSettings: any;
  paymentDropdownSettings: any;
  items: any = [];
  total: any = 0;
  today: any;
  item: any;
  locale: any;
  input: CollectionReport;
  data: any;
  paymentConcepts: Array<any>;
  model: Array<any>;
  finalData: Array<any>;
  buyers: Array<any>;
  buyersAsDev: Array<any>;
  legalReps: Array<any>;
  selectedBuilding: any;
  previousMonth: any;
  nextMonth: any;
  projects: Array<any>;

  selctedConcept: Array<any>;
  concepts = Array<any>();

  selctedProjects: Array<any>;
  developers: Array<any>;
  selectedDevelopers: Array<any>;
  selectedProperties: Array<any>;
  selectedTowers: Array<any>;
  selectedFloors: Array<any>;
  selectedBuyers: Array<any>;
  selectedBuyerDev: Array<any>;
  selectedLegalReps: Array<any>;
  selectedCurrencies: Array<any>;
  towers: Array<Towers>;
  properties: Array<any>;
  currencies: Array<any>;
  buildingTowers: any;
  floors: Array<any>;

  public scrollbarOptions = { axis: 'y', theme: 'dark' };

  constructor(
    public constant: Constant,
    public admin: AdminService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService, public apiConstant: ApiConstants,
    private price: PricePipe,
  ) { }

  ngOnInit() {
    this.selctedConcept = [];
    this.finalData = [];
    this.iniDropDownSetting();
    this.today = new Date();
    this.input = new CollectionReport();
    this.towers = [new Towers()];
    this.previousMonth = moment().subtract(1, 'months').toDate();
    this.input.start_date = moment().toDate();
    this.nextMonth = moment().add(1, 'months').toDate();
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.getDevelopers();
    this.getBuyers();
    this.getBuyersAsDev();
    this.getLegalRep();
    this.getCurrencies();
    this.initCalendarLocale();
    this.getListing();
    this.getPropertyAmenities();

    this.translate.onDefaultLangChange.subscribe((event: LangChangeEvent) => {
      this.initCalendarLocale();
    });
  }
  getPropertyAmenities() {
    this.admin.postDataApi('getPaymentChoices', {})
      .subscribe(
        success => {
          this.spinner.hide();
          this.concepts = success['data'];
        }
      );
  }
  unsetProject(item: any) {
    let i = 0;
    this.selctedConcept.map(r => {
      if (r.id == item.id) {
        this.selctedConcept.splice(i, 1);
      }
      i = i + 1;
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
      allowSearchFilter: true,
      itemsShowLimit: 1
    };
    this.paymentDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: this.translate.instant('commonBlock.selectAll'),
      unSelectAllText: this.translate.instant('commonBlock.unselectAll'),
      searchPlaceholderText: this.translate.instant('commonBlock.search'),
      allowSearchFilter: true,
      itemsShowLimit: 1
    };

    this.legalRepDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'comm_name',
      selectAllText: this.translate.instant('commonBlock.selectAll'),
      unSelectAllText: this.translate.instant('commonBlock.unselectAll'),
      searchPlaceholderText: this.translate.instant('commonBlock.search'),
      allowSearchFilter: true,
      itemsShowLimit: 1
    };
  }

  getPage(page) {
    this.parameter.page = page;
    this.getListing();
  }

  onItemDeSelect(arrayNAme: any, obj: any) {
    this[arrayNAme].push(obj);
  }

  onItemSelect(param: any, obj: any) {
    this[param].push(obj);
  }

  onSelectAll(obj: any) {
  }


  getCurrencies() {
    this.admin.postDataApi('getCurrencies', {})
      .subscribe(
        success => {
          this.currencies = success.data;
          this.currencies.map(r => {
            r['name'] = r.code + ' | ' + r.currency;
          });
        }, error => {
          this.spinner.hide();
        }
      );
  }

  onSelectDeveloper(isSelected: number, obj: any) {
    this.projects = [];
    this.selctedProjects = [];
    this.selectedTowers = [];
    this.selectedFloors = [];
    this.selectedProperties = [];
    if (isSelected) {
      this.searchBuilding(obj.id);
    }
  }

  getDevelopers() {
    this.admin.postDataApi('getDevelopersForCollections', {})
      .subscribe(
        success => {
          this.developers = success.data;
        });
  }

  onSelectProject(isSelected: number, obj: any) {
    this.input.building_id = [];
    this.selectedTowers = [];
    this.selectedFloors = [];
    this.selectedProperties = [];
    if (isSelected) {
      this.setBuildingId(obj.id);
    }
  }

  searchBuilding(developer_id: string) {
    this.spinner.show();
    const input = {
      developer_id: developer_id
    };

    this.admin.postDataApi('getProjectsForCollections', input)
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
        this.buildingTowers = r.building_towers ? r.building_towers : [];
      }
    });
    this.buildingTowers.map(s => {
      s.name = s.tower_name;
    });
    this.input.building_id = [buildingId];
  }

  onSelectTower(isSelected: number, obj: any) {
    this.input.building_towers_id = [];
    this.selectedFloors = [];
    this.selectedProperties = [];
    if (isSelected) {
      this.setTower(obj.id);
    }
  }

  setTower(building_towers_id: string) {
    this.floors = [];
    for (let index = 0; index < this.projects.length; index++) {
      if (this.projects[index].id == this.input.building_id) {
        const bt = this.projects[index].building_towers;
        for (let i = 0; i < bt.length; i++) {
          if (bt[i].id == building_towers_id) {
            this.towers = bt[i];
            this.towers['floors'] = [];
            // floors
            this.towers['unique_floors'].map(s => {
              let obj = {};
              obj = { id: s, name: s == 0 ? 'Ground Floor' : 'Floor ' + s };
              this.towers['floors'].push(obj);
              this.floors.push(obj);
            });
          }
        }
      }
    }
  }

  onSelectFloor(isSelected: number, obj: any) {
    this.properties = [];
    this.selectedProperties = [];
    if (isSelected) {
      this.getProperties(obj.id);
    }
  }

  getProperties($event) {
    const input = {};
    if (this.selctedProjects) {
      const d = this.selctedProjects.map(o => o.id);
      input['building_id'] = d[0];
    }
    if (this.selectedTowers) {
      const d = this.selectedTowers.map(o => o.id);
      input['building_towers_id'] = d[0];
    }
    if (this.selectedFloors) {
      const d = this.selectedFloors.map(o => o.id);
      input['floor_num'] = d[0];
    }
    this.spinner.show();
    this.admin.postDataApi('getPropertiesForCollections', input)
      .subscribe(
        success => {
          this.spinner.hide();
          this.properties = success.data;
        }, error => {
          this.spinner.hide();
        }
      );
  }

  getBuyers() {
    this.admin.postDataApi('getAllBuyersForCollections', { user_type: 1 })
      .subscribe(
        success => {
          this.buyers = success.data;
        });
  }

  getLegalRep() {
    this.admin.postDataApi('getAllBuyersForCollections', { user_type: 2 })
      .subscribe(
        success => {
          this.legalReps = success.data;
        });
  }

  getBuyersAsDev() {
    this.admin.postDataApi('getAllBuyersForCollections', { user_type: 3 })
      .subscribe(
        success => {
          this.buyersAsDev = success.data;
        });
  }
  getListing() {
    this.spinner.show();

    const input: any = JSON.parse(JSON.stringify(this.input));
    input.start_date = moment(this.input.start_date).format('YYYY-MM-DD');
    input.year = new Date(this.input.start_date).getFullYear(),
      input.month = new Date(this.input.start_date).getMonth() + 1;
    input.page = this.parameter.page;

    this.previousMonth = moment(this.input.start_date).subtract(1, 'months').toDate();
    this.nextMonth = moment(this.input.start_date).add(1, 'months').toDate();

    if (this.selectedDevelopers) {
      const d = this.selectedDevelopers.map(o => o.id);
      input.developer_id = d;
    }
    if (this.selctedProjects) {
      const d = this.selctedProjects.map(o => o.id);
      input.building_id = d;
    }
    if (this.selectedTowers) {
      const d = this.selectedTowers.map(o => o.id);
      input.building_towers_id = d;
    }
    if (this.selectedFloors) {
      const d = this.selectedFloors.map(o => o.id);
      input['floor_num'] = d;
    }
    if (this.selectedProperties) {
      const d = []
      this.selectedProperties.forEach((element, index) => {
        let id = d.find(id => id == element.id);
        if (!id) {
          d.push(element.id);
        }
      });
      input.property_id = d;
    }
    if (this.selectedBuyers) {
      const d = this.selectedBuyers.map(o => o.id);
      input.buyer_id = d;
    }
    if (this.selectedLegalReps) {
      const d = this.selectedLegalReps.map(o => o.id);
      input.legal_rep_id = d;
    }
    if (this.selectedBuyerDev) {
      const d = this.selectedBuyerDev.map(o => o.id);
      input.buyer_dev_id = d;
    }
    if (this.selectedCurrencies) {
      const d = this.selectedCurrencies.map(o => o.id);
      input.currency_id = d;
    }
    if (this.selctedConcept) {
      const d = [];
      this.selctedConcept.forEach((element, index) => {
        let id = d.find(id => id == element.id);
        if (!id) {
          d.push(element.id);
        }
      });
      input.paymentConcepts = d;
    }

    // this.admin.postDataApi('generateCollectionMonthlyReport', input).subscribe(
    //   success => {
    //     this.total = success['total_count'];
    //     this.finalData = success['data'] || [];
    //     let total_previous_month_amount = 0;
    //     let total_curent_month_amount = 0;
    //     let total_next_month_amount = 0;
    //     // (success['data'] || []).forEach((arrayData) => {
    //     //   total_previous_month_amount += (arrayData.previous_month_amount || 0) + (arrayData.previous_month_penalty || 0) - (arrayData.previous_month_paid || 0);
    //     //   total_curent_month_amount += (arrayData.curent_month_amount || 0) + (arrayData.curent_month_penalty || 0) - (arrayData.curent_month_paid || 0);
    //     //   total_next_month_amount += (arrayData.next_month_amount || 0) + (arrayData.next_month_penalty || 0) - (arrayData.next_month_paid || 0);
    //     // });
    //     this.finalData.length > 0 ? this.finalData.push({ 
    //       total: true, 
    //       total_previous_month_amount: total_previous_month_amount, 
    //       total_curent_month_amount: total_curent_month_amount, 
    //       total_next_month_amount: total_next_month_amount 
    //     }) : '';
    //     this.spinner.hide();
    //   },
    //   error => {
    //     this.spinner.hide();
    //   });
    forkJoin([
      this.admin.postDataApi('generateCollectionMonthlyReport', input),
      this.admin.postDataApi('generateCollectionMonthlyReports', input),
    ]).subscribe((response: any[]) => {
      this.spinner.hide();
      this.total = response[0].total_count;
      this.finalData = response[0].data || [];
      const totalDetails = response[1].data1;
      this.finalData.length > 0 ? this.finalData.push({
        total: true,
        total_previous_month_amount: (totalDetails.previous_month_amount || 0) + (totalDetails.previous_month_penalty || 0) - (totalDetails.previous_month_paid || 0),
        total_curent_month_amount: (totalDetails.curent_month_amount || 0) + (totalDetails.curent_month_penalty || 0) - (totalDetails.curent_month_paid || 0),
        total_next_month_amount: (totalDetails.next_month_amount || 0) + (totalDetails.next_month_penalty || 0) - (totalDetails.next_month_paid || 0)
      }) : '';
    });
  }

  resetFilters() {
    this.input = new CollectionReport();
    this.input.start_date = moment().subtract(6, 'months').toDate();
    this.input.end_date = moment().toDate();
    this.selectedBuyers = [];
    this.selectedDevelopers = [];
    this.selctedProjects = [];
    this.selectedTowers = [];
    this.selectedFloors = [];
    this.selectedCurrencies = [];
    this.selectedProperties = [];
    this.selectedBuyerDev = [];
    this.selectedProperties = [];
    this.selectedLegalReps = [];
    this.selctedConcept = [];
    this.getListing();
  }

  getExportlisting() {
    this.spinner.show();
    const input: any = JSON.parse(JSON.stringify(this.parameter));
    input.page = 0;
    input.start_date = moment(this.input.start_date).format('YYYY-MM-DD');
    input.year = new Date(this.input.start_date).getFullYear(),
      input.month = new Date(this.input.start_date).getMonth() + 1;

    this.previousMonth = moment(this.input.start_date).subtract(1, 'months').toDate();
    this.nextMonth = moment(this.input.start_date).add(1, 'months').toDate();

    if (this.selectedDevelopers) {
      const d = this.selectedDevelopers.map(o => o.id);
      input.developer_id = d;
    }
    if (this.selctedProjects) {
      const d = this.selctedProjects.map(o => o.id);
      input.building_id = d;
    }
    if (this.selectedTowers) {
      const d = this.selectedTowers.map(o => o.id);
      input.building_towers_id = d;
    }
    if (this.selectedFloors) {
      const d = this.selectedFloors.map(o => o.id);
      input['floor_num'] = d;
    }
    if (this.selectedProperties) {
      const d = this.selectedProperties.map(o => o.id);
      input.property_id = d;
    }
    if (this.selectedBuyers) {
      const d = this.selectedBuyers.map(o => o.id);
      input.buyer_id = d;
    }
    if (this.selectedLegalReps) {
      const d = this.selectedLegalReps.map(o => o.id);
      input.legal_rep_id = d;
    }
    if (this.selectedBuyerDev) {
      const d = this.selectedBuyerDev.map(o => o.id);
      input.buyer_dev_id = d;
    }
    if (this.selectedCurrencies) {
      const d = this.selectedCurrencies.map(o => o.id);
      input.currency_id = d;
    }
    if (this.selctedConcept) {
      const d = this.selctedConcept.map(o => o.id);
      // console.log(d, "filter")
      input.paymentConcepts = d;
    }
    this.admin.postDataApi('generateCollectionMonthlyReport', input).subscribe(
      success => {
        this.exportfinalData = success['data'];
        this.exportData();
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      });
  }

  exportData() {
    if (this.exportfinalData) {
      const exportfinalData = [];
      for (let index = 0; index < this.exportfinalData.length; index++) {
        const p = this.exportfinalData[index];

        exportfinalData.push({
          'Buyer Name': p.buyer_name || '',
          'Seller Name': p.seller_name || '',
          'Project': p.project_name || '',
          'Model': p.model || '',
          'Property Name': p.property_name || '',
          'Currency': p.code || '',
          'Previous Month': this.getTransformedAmount(p.previous_month_amount + p.previous_month_penalty - p.previous_month_paid || 0),//p.previous_month_amount + p.previous_month_penalty - p.previous_month_paid || 0,
          'Current Month': this.getTransformedAmount(p.curent_month_amount + p.curent_month_penalty - p.curent_month_paid || 0),//p.curent_month_amount + p.curent_month_penalty - p.curent_month_paid || 0,
          'Next Month': this.getTransformedAmount(p.next_month_amount + p.next_month_penalty - p.next_month_paid || 0),//p.next_month_amount + p.next_month_penalty - p.next_month_paid || 0,
        });
      }
      this.exportAsExcelFile(exportfinalData, 'MonthlyReport-');
    }
  }

  getTransformedAmount(value: any) {
    return (this.price.transform(Number(value).toFixed(2)).toString()).substring(1);
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data']
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });
    this.spinner.hide();
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    const today = new Date();
    const date =
      today.getDate() +
      '-' +
      today.getMonth() +
      '-' +
      today.getFullYear() +
      '_' +
      today.getHours() +
      '_' +
      today.getMinutes() +
      '_' +
      today.getSeconds();
    fileName = fileName + date;
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }
}
