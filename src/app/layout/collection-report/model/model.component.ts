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
  singleDropdownSettings: any;
  multiDropdownSettings: any;
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
  selctedProjects: Array<any>;
  developers: Array<any>;
  selectedDevelopers: Array<any>;  
  selectedProperties: Array<any>;
  selectedTowers: Array<any>;
  selectedFloors: Array<any>;
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
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.finalData = [];
    this.iniDropDownSetting();
    this.towers = [new Towers()];
    this.input = new CollectionReport();
    this.input.start_date = moment().subtract(6, 'months').toDate();
    this.input.end_date = moment().toDate();
    this.today = new Date();
    this.initCalendarLocale()
    this.getDevelopers();
    this.getCurrencies();
    this.getListing();
  }

  initCalendarLocale() {
    if (this.translate.defaultLang == 'en') {
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
      }
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

  getCurrencies() {
    this.admin.postDataApi('getCurrencies', {})
      .subscribe(
        success => {
          this.currencies = success.data;
          this.currencies.map(r => {
            r['name'] = r.code + ' | ' + r.currency
          })
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
      this.selectedTowers = [];
      this.selectedFloors = [];
      this.selectedProperties = [];
    }
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

  onSelectProject(isSelected: number, obj: any) {
    if (isSelected) {
      this.setBuildingId(obj.id);
    } else {
      this.input.building_id = [];
      this.selectedTowers = []
      this.selectedFloors = [];
      this.selectedProperties = [];
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

  setBuildingId(buildingId: any) {
    this.projects.map(r => {
      if (r.id == buildingId) {
        this.buildingTowers = r.building_towers ? r.building_towers : [];
      }
    })
    this.buildingTowers.map(s => {
      s.name = s.tower_name;
    })
    this.input.building_id = [buildingId];
  }

  onSelectTower(isSelected: number, obj: any) {
    if (isSelected) {
      this.setTower(obj.id);
    } else {
      this.input.building_towers_id = [];
      this.selectedFloors = []
      this.selectedProperties = [];
    }
  }

  setTower(building_towers_id: string) {
    this.floors = [];
    for (let index = 0; index < this.projects.length; index++) {
      if (this.projects[index].id == this.input.building_id) {
        const bt = this.projects[index].building_towers;
        for(let i = 0; i < bt.length; i++) {
          if (bt[i].id == building_towers_id) {
            this.towers = bt[i];
            this.towers['floors'] = [];
            // floors
            this.towers['unique_floors'].map(s => {
              let obj = {};
              obj = {id: s, name: s == 0 ? 'Ground Floor' : 'Floor '+s}
              this.towers['floors'].push(obj);
              this.floors.push(obj);
            })
          }
        }
      }
    }
  }

  onSelectFloor(isSelected: number, obj: any) {
    if (isSelected) {
      this.getProperties(obj.id);
    } else {
      this.properties = [];
      this.selectedProperties = [];
    }
  }
  
  getProperties($event) {
    let input = {};
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
    this.spinner.show()
    this.admin.postDataApi('getUnblockedProperties', input)
      .subscribe(
        success => {
          this.spinner.hide();
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
    if (this.selectedCurrencies) {
      const d = this.selectedCurrencies.map(o => o.id);
      input.currency_id = d;
    }
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

    this.selectedDevelopers = [];
    this.selctedProjects = [];
    this.selectedTowers = [];
    this.selectedFloors = [];
    this.selectedCurrencies = [];
    this.selectedProperties = [];
  }
}
