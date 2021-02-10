import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ApiConstants } from 'src/app/common/api-constants';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProperty } from 'src/app/common/property';
import { Constant } from 'src/app/common/constants';
import { AdminService } from 'src/app/services/admin.service';
import { ProjectService } from 'src/app/services/project.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
declare let swal: any;
declare var $: any;
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  @ViewChild('modalOpen') modalOpen: ElementRef;
  @ViewChild('modalClose') modalClose: ElementRef;
  public parameter: IProperty = {};
  public location: IProperty = {};

  items: any = [];
  total: any = 0;
  configurations: any = [];
  countries: any;
  reason: string;
  locale: any;
  baseUrl = this.admin.baseUrl + 'exportProject';
  min_price: any;
  max_price: any;
  min_carpet_area: any;
  max_carpet_area: any;
  exportfinalData: Array<any>;
  local_storage_parameter: any;
  is_back: boolean;

  constructor(
    public constant: Constant,
    public apiConstant: ApiConstants,
    private route: ActivatedRoute,
    public admin: AdminService,
    public projectService: ProjectService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService, private http: HttpClient,
    private router: Router, private elementRef: ElementRef
  ) { 
  }

  ngOnInit() {
    //console.log('baseurl', this.admin.baseUrl);
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
    this.route.params.subscribe(params => {
      this.parameter.userType = params.type;
      this.parameter.id = params.id;
      if(params.for){
        this.is_back = true;
      }
    });
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.parameter.dash_flag = this.projectService.dash_flag ? this.projectService.dash_flag : this.constant.dash_flag;
    this.parameter.property_sort = 2;
    this.parameter.possession_filter = 0; // 0-all, 9-presale, 8-sale
    this.parameter.project_status_filter = this.apiConstant.projectStatus.all;
    this.parameter.min_price = 0;
    this.parameter.max_price = 0;
    this.parameter.min_carpet_area = 0;
    this.parameter.max_carpet_area = 0;
    this.local_storage_parameter = JSON.parse(localStorage.getItem('parametersForProject'));
    this.parameter = this.local_storage_parameter && this.is_back ? this.local_storage_parameter : this.parameter;
    this.getCountries();
    // this.getPropertyConfigurations(); 
    this.getListing();
  }

  sortData(value: number) {
    this.parameter.property_sort = value;
    this.getListing();
  }

  getListing() {
    this.spinner.show();
    const input: any = JSON.parse(JSON.stringify(this.parameter));
    if (this.parameter.min) {
      input.min = moment(this.parameter.min).format('YYYY-MM-DD');
    } else {
      delete input.min;
    }
    if (this.parameter.max) {
      input.max = moment(this.parameter.max).format('YYYY-MM-DD');
    } else {
      delete input.max;
    }
    input.min_price = this.parameter.min_price;
    input.max_price = this.parameter.max_price;
    input.min_carpet_area = this.parameter.min_carpet_area;
    input.max_carpet_area = this.parameter.max_carpet_area;

    if (this.parameter.userType === 'developer') {
      input.developer_id = this.parameter.id;
    }
    if (this.parameter.userType === 'data-collector') {
      input.data_collector_id = this.parameter.id;
    }
    if (this.parameter.userType === 'manager') {
      input.manager_id = this.parameter.id;
    }
    if (this.parameter.userType === 'company') {
      input.company_id = this.parameter.id;
    }
    if (this.parameter.userType === 'agency') {
      input.agency_id = this.parameter.id;
    }
    this.admin.postDataApi('projectHome', input).subscribe(
      success => {
        localStorage.setItem('parametersForProject', JSON.stringify(this.parameter));
        this.items = success.data;
        //console.log(this.items, "projectHome")
        this.total = success.total_count;
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      });
  }

  close() {
    $('.modal').modal('hide');
  }

  getCountries() {
    this.admin.postDataApi('getCountryLocality', {}).subscribe(r => {
      this.location.countries = r['data'];
    });
  }

  getPropertyConfigurations() {
    this.admin.postDataApi('getConfigurations', { hide_blocked: 1 }).subscribe(r => {
      this.configurations = r['data'];
    });
  }

  onCountryChange(id) {
    this.parameter.country_id = id;
    this.location.states = []; this.parameter.state_id = '0';
    this.location.cities = []; this.parameter.city_id = '0';
    this.location.localities = []; this.parameter.locality_id = '0';
    if (!id || id === '0') {
      this.parameter.state_id = '0';
      return false;
    }
    this.parameter.country_id = id;
    const selectedCountry = this.location.countries.filter(x => x.id.toString() === id);
    this.location.states = selectedCountry[0].states;

  }

  onStateChange(id) {
    this.location.cities = []; this.parameter.city_id = '0';
    this.location.localities = []; this.parameter.locality_id = '0';
    if (!id || id === '0') {
      this.parameter.city_id = '0';
      return false;
    }
    this.parameter.state_id = id;
    const selectedState = this.location.states.filter(x => x.id.toString() === id);
    this.location.cities = selectedState[0].cities;
  }

  onCityChange(id) {
    this.location.localities = []; this.parameter.locality_id = '0';
    if (!id || id === '0') {
      this.parameter.locality_id = '0';
      return false;
    }
    this.parameter.city_id = id;
    const selectedCountry = this.location.cities.filter(x => x.id.toString() === id);
    this.location.localities = selectedCountry[0].localities;
  }

  onLocalityChange(id) {
    this.parameter.locality_id = '';
    if (!id || id === '0') {
      return false;
    }
    this.parameter.locality_id = id;
  }

  changeFlag(flag: number) {
    this.parameter.dash_flag = flag;
    this.projectService.dash_flag = flag;
    if (flag === 5) {
      return false;
    }
    this.resetDates();
    this.getListing();
  }

  toggleAndSort(sort_by, sort_by_order) {
    if (this[sort_by_order] == 1) {
      this[sort_by_order] = 2;
    } else {
      this[sort_by_order] = 1;
    }

    this.parameter.sort_by = sort_by;
    this.parameter.sort_by_order = sort_by_order;
    this.getListing();
  }


  getPage(page) {
    this.parameter.page = page;
    this.getListing();
  }



  blockUnblock(item, flag: number) {
    this.parameter.title = this.translate.instant('message.error.areYouSure');
    switch (flag) {
      case 0:
        this.parameter.text = this.translate.instant('message.error.wantToUnBlockProject');
        this.parameter.successText = this.translate.instant('message.success.unblockedSuccessfully');
        break;
      case 1:
        this.parameter.text = this.translate.instant('message.error.wantToBlockProject');
        this.parameter.successText = this.translate.instant('message.success.blockedSuccessfully');
        break;
    }

    swal({
      html: this.parameter.title + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.blockProject(item, flag);
      }
    });
  }

  blockProject(item, flag: number) {
    this.admin.postDataApi('blockProject', { building_id: item.id, flag: flag })
      .subscribe(
        success => {
          swal(this.translate.instant('swal.success'), this.parameter.successText, 'success');
          item.is_blocked = flag;
        },
        error => {
          swal(this.translate.instant('swal.error'), error.error.message, 'error');
        });
  }

  approveProject(item, status) {
    if (item.is_completed !== 1) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.cannotApproveBuilding'), 'error');
      return false;
    }
    item.status = status;
    this.admin.postDataApi('approveProject', { building_id: item.id }).subscribe(r => {
      swal(this.translate.instant('swal.success'), this.translate.instant('message.success.projectApprovedSuccessfully'), 'success');
    },
      error => {
        swal(this.translate.instant('swal.error'), error.error.message, 'error');
      });
  }

  rejectProject(status) {
    this.items[this.parameter.index].status = status;
    this.admin.postDataApi('rejectProject', { building_id: this.parameter.building_id, reason: this.reason }).subscribe(r => {
      swal(this.translate.instant('swal.success'), this.translate.instant('message.success.projectUnapprovedSuccessfully'), 'success');
      this.closeModal();
    },
      error => {
        swal(this.translate.instant('swal.error'), error.error.message, 'error');
      });
  }

  openCancellationModal(item, index) {
    this.parameter.building_id = item.id;
    this.parameter.index = index;
    this.modalOpen.nativeElement.click();
  }

  searchProject() {
    this.close();
    this.getListing();
  }

  closeModal() {
    this.modalClose.nativeElement.click();
  }

  resetFilters() {
    this.location.countries = JSON.parse(JSON.stringify(this.location.countries));
    this.onCountryChange('0');
    this.parameter.is_selected = false;
    this.parameter.page = this.constant.p;
    this.parameter.dash_flag = this.constant.dash_flag;
    this.parameter.total = 0;
    // this.selectedUser = '';
    this.parameter.keyword = '';
    this.parameter.count_flag = 1;
    this.parameter.min_price = null;
    this.parameter.max_price = null;
    this.parameter.min_carpet_area = null;
    this.parameter.max_carpet_area = null;
    this.resetDates();
    this.getListing();
  }

  resetDates() {
    this.parameter.min = '';
    this.parameter.max = '';
  }

  deletePopup(item: any, index: number) {
    this.parameter.text = this.translate.instant('message.error.wantToDeleteProject');

    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.deleteProject(item, index);
      }
    });
  }

  deleteProject(item: any, index: number) {
    this.admin.postDataApi('deleteProject',
      { building_id: item.id }).subscribe(r => {
        swal(this.translate.instant('swal.success'), this.translate.instant('message.success.deletedSuccessfully'), 'success');
        this.items.splice(index, 1);
        this.total--;
      },
        error => {
          swal(this.translate.instant('swal.error'), error.error.message, 'error');
        });
  }

  viewDeveloper(item: any) {
    if (item.developer && item.developer.name) {
      this.router.navigate(['/dashboard/developers/view-all', item.developer.name]);
    } else {
      this.router.navigate(['/dashboard/projects/edit-project', item.id]);
    }
  }

  viewAgency(item: any) {
    if (item.agency && item.agency.name) {
      this.router.navigate(['/dashboard/agencies/view-all', item.agency.name]);
    } else {
      this.router.navigate(['/dashboard/projects/edit-project', item.id]);
    }
  }

  viewLegalEntity(item: any) {
    if (item.legal_entity && item.legal_entity.comm_name) {
      this.router.navigate(['/dashboard/legal-entities/view-all', item.legal_entity.comm_name]);
    } else {
      this.router.navigate(['/dashboard/projects/edit-project', item.id]);
    }
  }

  viewCompanyManager(item: any) {
    if (item.manager && item.manager.id) {
      this.router.navigate(['/dashboard/managers/view-all', 'manager', item.manager.name]);
    } else if (item.company && item.company.id) {
      this.router.navigate(['/dashboard/companies/view-all', item.company.name]);
    } else {
      this.router.navigate(['/dashboard/projects/edit-project', item.id]);
    }
  }

  viewDocument(document: string) {
    window.open(document, '_blank');
  }

  getExportlisting() {
    this.spinner.show();
    const input: any = JSON.parse(JSON.stringify(this.parameter));
    input.page = 0;
    if (this.parameter.min) {
      input.min = moment(this.parameter.min).format('YYYY-MM-DD');
    } else {
      delete input.min;
    }
    if (this.parameter.max) {
      input.max = moment(this.parameter.max).format('YYYY-MM-DD');
    } else {
      delete input.max;
    }

    if (this.parameter.userType === 'developer') {
      input.developer_id = this.parameter.id;
    }
    if (this.parameter.userType === 'data-collector') {
      input.data_collector_id = this.parameter.id;
    }
    if (this.parameter.userType === 'manager') {
      input.manager_id = this.parameter.id;
    }
    if (this.parameter.userType === 'company') {
      input.company_id = this.parameter.id;
    }
    if (this.parameter.userType === 'agency') {
      input.agency_id = this.parameter.id;
    }
    this.admin.postDataApi('projectHome', input).subscribe(
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
          'Name': p.name || '',
          'Location': p.address || '',
          'Latitude': p.lat || '',
          'Longitude': p.lng || '',
          'Developer Name': p.developer && p.developer.name ? p.developer.name : '',
          'Agency Name': p.agency && p.agency.name ? p.agency.name : '',
          'Legal Entity Name': p.legal_entity && p.legal_entity.comm_name ? p.legal_entity.comm_name : '',
          'Manager Name': p.manager && p.manager.name ? p.manager.name : '',
          'Company Name': p.company && p.company.name ? p.company.name : '',
          'Possession Status': p.possession_status_id == this.apiConstant.possessionStatus.sale ? 'Sale' : 'Presale',
          'Properties': p.properties_count_all || 0,
          'Properties available for rent': p.rent_count_all || 0,
          'Properties available for sale': p.sale_count_all || 0,
          'Min Price ($)': p.min_price || 0,
          'Max Price ($)': p.max_price || 0,
          'Avg Price ($)': p.avg_price || 0,
          'Min Carpet Area': p.min_carpet_area || 0,
          'Max Carpet Area': p.max_carpet_area || 0,
          'Avg Carpet Area': p.avg_carpet_area || 0,
          'Avg Price per m2': p.avg_price && p.avg_carpet_area ? p.avg_price / p.avg_carpet_area : 0,
          'Towers': p.building_towers ? p.building_towers.length : 0
        });
      }
      this.exportAsExcelFile(exportfinalData, 'projects-');
    }
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
