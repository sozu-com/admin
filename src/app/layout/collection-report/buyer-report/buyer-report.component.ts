import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProperty } from 'src/app/common/property';
import { Constant } from 'src/app/common/constants';
import { AdminService } from 'src/app/services/admin.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { CollectionReport } from '../../../models/collection-report.model';
import { Towers } from 'src/app/models/addProject.model';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { ExcelDownload } from 'src/app/common/excelDownload';
import { PricePipe } from 'src/app/pipes/price.pipe';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-buyer-report',
  templateUrl: './buyer-report.component.html',
  styleUrls: ['./buyer-report.component.css']
})
export class BuyerReportComponent implements OnInit {

  public parameter: IProperty = {};
  singleDropdownSettings: any;
  multiDropdownSettings: any;
  legalRepDropdownSettings: any;
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
  exportfinalData: Array<any>;
  buyers: Array<any>;
  buyersAsDev: Array<any>;
  legalReps: Array<any>;
  selectedBuilding: any;
  previousMonth: any;
  nextMonth: any;
  projects: Array<any>;
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
  paymentMethods = new Array<any>();

  public scrollbarOptions = { axis: 'y', theme: 'dark' };

  constructor(
    public constant: Constant,
    public admin: AdminService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private price: PricePipe
  ) { }

  ngOnInit() {
    this.finalData = [];
    this.getPaymentMethods();
    this.iniDropDownSetting();
    this.today = new Date();
    this.input = new CollectionReport();
    this.towers = [new Towers()];
    this.previousMonth = moment().subtract(1, 'months').toDate();
    this.input.start_date = moment().subtract(3, 'months').toDate();
    this.input.end_date = moment().toDate();
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
    input.end_date = moment(this.input.end_date).format('YYYY-MM-DD');
    input.page = this.parameter.page;

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
    this.admin.postDataApi('generateCollectionbuyerReport', input).subscribe(
      success => {
        this.total = success['total'];
        this.finalData = success['data'];
        for (let index = 0; index < this.finalData.length; index++) {
          const element = this.finalData[index];
          let b = '';
          if (element.payment_received_by == 1) {
            if (element.bank_id) {
              b = element.agency_bank_name;
            } else {
              b = element.legal_representative_banks_name;
            }
          } else {
            if (element.seller_type != 2) {  // seller as person or developer
              if (element.bank_id) {
                b = element.legal_representative_banks_name;
              } else if (element.legal_rep_bank_id) {
                b = element.legal_representative_banks_name;
              }
            } else {  // seller as legal entity
              if (element.bank_id) {
                b = element.legal_entitiy_bank_name;
              } else if (element.legal_rep_bank_id) {
                b = element.legal_representative_banks_name;
              }
            }
          }

          if (b) {
            const bn = b.split(',');
            element.bank_name = bn[0];
            element.account_number = bn[1];
            element.swift = bn[2];
            element.bank_currency = bn[3];
          }
        }
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
  }
  exportData() {
    let self = this;
    if (this.exportfinalData) {
      const exportfinalData = [];
      for (let index = 0; index < this.exportfinalData.length; index++) {
        const item = self.exportfinalData[index];

        exportfinalData.push({
          'Buyer Name': (item.buyer_type != 2) ? ((item.buyer || {}).name) ? ((item.buyer || {}).name + ' ' + (item.buyer || {}).first_surname + ' ' + (item.buyer || {}).second_surname) : '' :
            (item.buyer_legal_entity || {}).comm_name || '',
          'Seller Name': (item.seller_type != 2) ? ((item.seller || {}).name) ? ((item.seller || {}).name + ' ' + (item.seller || {}).first_surname + ' ' + (item.seller || {}).second_surname) : '' :
            (item.seller_legal_entity || {}).comm_name || '',
          'Destiny Bank': item.payment_received_by == 1 ? (((item.property || {}).building || {}).agency || {}).name : 'Seller',
          'Project': ((item.property || {}).building || {}).name || '',
          'Tower': ((item.property || {}).building_towers || {}).tower_name || '',
          'Model': ((item.property || {}).building_configuration || {}).name || '',
          'Property Name': (item.property || {}).name || '',
          'Currency': (item.currency || {}).code || '',
          'Date': item.payment_date,
          'Amount Paid By User':  item.amt_paid || 0,
          'Payment Method': (item.payment_method || {}).name || '',
          'Bank Name': item.bank_name || '',
          'Account Number': item.account_number || '',
          'Clabe Swift': item.swift || '',
          'Bank Currency': item.bank_currency || '',
          'Total Paid':  (item.deal_price || 0 - (item.remaning_amount || 0)) || 0,
          'Remaining':  item.remaning_amount || 0,
        });
      }
      new ExcelDownload().exportAsExcelFile(exportfinalData, 'buyerReport');
    }
  }

  // getTransformedAmount(value: any) {
  //   return (this.price.transform(Number(value).toFixed(2)).toString()).substring(1);
  // }

  getExportlisting() {
    this.spinner.show();

    const input: any = JSON.parse(JSON.stringify(this.input));
    input.start_date = moment(this.input.start_date).format('YYYY-MM-DD');
    input.end_date = moment(this.input.end_date).format('YYYY-MM-DD');
    input.page = 0;

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
    this.admin.postDataApi('generateCollectionbuyerReport', input).subscribe(
      success => {
        this.exportfinalData = success['data'];
        for (let index = 0; index < this.exportfinalData.length; index++) {
          const element = this.exportfinalData[index];
          let b = '';
          if (element.payment_received_by == 1) {
            if (element.bank_id) {
              b = element.agency_bank_name;
            } else {
              b = element.legal_representative_banks_name;
            }
          } else {
            if (element.seller_type != 2) {  // seller as person or developer
              if (element.bank_id) {
                b = element.legal_representative_banks_name;
              } else if (element.legal_rep_bank_id) {
                b = element.legal_representative_banks_name;
              }
            } else {  // seller as legal entity
              if (element.bank_id) {
                b = element.legal_entitiy_bank_name;
              } else if (element.legal_rep_bank_id) {
                b = element.legal_representative_banks_name;
              }
            }
          }

          if (b) {
            const bn = b.split(',');
            element.bank_name = bn[0];
            element.account_number = bn[1];
            element.swift = bn[2];
            element.bank_currency = bn[3];
          }
        }
        this.exportData();
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      });
  }

  getPaymentMethods() {
    this.admin.postDataApi('getPaymentMethods', {})
      .subscribe(
        success => {
          this.paymentMethods = success.data;
        }, error => {
          this.spinner.hide();
        }
      );
  }
}
