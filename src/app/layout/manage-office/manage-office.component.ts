import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiConstants } from 'src/app/common/api-constants';
import { Constant } from 'src/app/common/constants';
import { IProperty } from 'src/app/common/property';
import { PricePipe } from 'src/app/pipes/price.pipe';
import { AdminService } from 'src/app/services/admin.service';
import { ProjectService } from 'src/app/services/project.service';
import * as moment from 'moment';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
declare let swal: any;
declare var $: any;

@Component({
  selector: 'app-manage-office',
  templateUrl: './manage-office.component.html',
  styleUrls: ['./manage-office.component.css']
})
export class ManageOfficeComponent implements OnInit {
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
  baseUrl = this.admin.baseUrl + 'exportOffice';
  min_price: any;
  max_price: any;
  min_carpet_area: any;
  max_carpet_area: any;
  exportfinalData: Array<any>;
  //local_storage_parameter: any;
  is_back: boolean = false;
  public multiDropdownSettings = {};
  public language_code: string;
  public selectedLocation: { selectedCountry: string, selectedStates: any[], selectedCities: any[], selectedLocalities: any[] } =
    { selectedCountry: '', selectedStates: [], selectedCities: [], selectedLocalities: [] };
  @ViewChild('legalEnityListModelOpen') legalEnityListModelOpen: ElementRef;
  @ViewChild('legalEnityListModelClose') legalEnityListModelClose: ElementRef;
  @ViewChild('contributorListModelOpen') contributorListModelOpen: ElementRef;
  @ViewChild('contributorListModelClose') contributorListModelClose: ElementRef;
  @ViewChild('notesadddModalOpen') notesadddModalOpen: ElementRef;
  @ViewChild('notesadddModalClose') notesadddModalClose: ElementRef;
  legalEntities: any[] = [];
  contributor: any[] = [];
  public scrollbarOptions = { axis: 'y', theme: 'dark' };
  aloted_parking: any;
  total_parking: any;
  sales_parking_alots = [];
  parking_alots = [];

  @ViewChild('openSelectColumnsModal') openSelectColumnsModal: ElementRef;
  @ViewChild('closeSelectColumnsModal') closeSelectColumnsModal: ElementRef;
  public select_columns_list: any[] = [];
  public selectedColumnsToShow: any = {};
  public isSelectAllColumns: boolean = false;
  public keyword: string = '';
  possessionStatuses: Array<any>;

  constructor(
    public constant: Constant,
    public apiConstant: ApiConstants,
    private route: ActivatedRoute,
    public admin: AdminService,
    public projectService: ProjectService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService, 
    private router: Router,
    private price: PricePipe,
  ) { }

  ngOnInit() {
    this.getProjectHome();
    this.language_code = localStorage.getItem('language_code');
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
      if (params.for) {
        this.is_back = true;
      }
    });
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.parameter.dash_flag = this.projectService.dash_flag ? this.projectService.dash_flag : this.constant.dash_flag;
    this.parameter.property_sort = 2;
    this.parameter.parking_sort = 2;
    this.parameter.possession_filter = 0; // 0-all, 9-presale, 8-sale
    this.parameter.Office_status_filter = this.apiConstant.projectStatus.all;
    this.parameter.min_price = 0;
    this.parameter.max_price = 0;
    this.parameter.min_carpet_area = 0;
    this.parameter.max_carpet_area = 0;
    this.parameter.country_id = '0';
    this.parameter.state_id = '0';
    // this.local_storage_parameter = JSON.parse(localStorage.getItem('parametersForProject'));
    // this.parameter = this.local_storage_parameter && this.is_back ? this.local_storage_parameter : this.parameter;
    // this.initializedDropDownSetting();
    // this.getCountries();
    // // this.getPropertyConfigurations(); 
    // this.getListing();
    this.getParametersForProject();
  }

  getParametersForProject = (): void => {
    if (this.is_back) {
      this.selectedLocation.selectedLocalities = JSON.parse(localStorage.getItem('selectedLocalitiesForOffice'));
      this.selectedLocation.selectedCities = JSON.parse(localStorage.getItem('selectedCitiesForOffice'));
      this.parameter = JSON.parse(localStorage.getItem('parametersForOffice')) ? JSON.parse(localStorage.getItem('parametersForOffice')) : this.parameter;
    }
    this.initializedDropDownSetting();
    this.getCountries();
  }

  sortData(value: number) {
    this.parameter.parking_sort = 0;
    this.parameter.property_sort = value;
    this.getListing();
  }

  sortData1(value: number) {
    this.parameter.property_sort = 0;
    this.parameter.parking_sort = value;
    this.getListing();
  }

  getListing() {
    this.spinner.show();
    this.getofficePossessionStatuses();
    this.makePostRequest();
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
    this.admin.postDataApi('getOffice', input).subscribe(
      success => {
        //localStorage.setItem('parametersForProject', JSON.stringify(this.parameter));
        this.items = success.data;
        this.items.forEach(function (element) {
          element['avgg_price'] = (((parseFloat(element.avg_price) || 0) / (parseFloat(element.avg_carpet_area) || 0)));
          element['avgg_price_hold'] = (((parseFloat(element.avg_price_hold) || 0) / (parseFloat(element.avg_carpet_area_hold) || 0)));
        });
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

  closeNotesadddModalModal = (): void => {
    this.notesadddModalClose.nativeElement.click();
    this.modalClose.nativeElement.click();
  }

  addNote(project) {
    this.aloted_parking = parseInt(project.parking_count || 0) + parseInt(project.parking_sale_count || 0);
    this.total_parking = parseInt(project.parking_for_rent || 0) + parseInt(project.parking_lots || 0);
    this.spinner.show();
    this.admin.postDataApi('getOfficeParkingCount', { office_id: project.id }).subscribe(r => {
      this.parking_alots = r.data.assign;
      this.sales_parking_alots = r.data.sale;
      this.spinner.hide();
      this.notesadddModalOpen.nativeElement.click();
    });
  }

  goWay(item) {
    localStorage.setItem('project_id', item.id);
    this.router.navigate(['/dashboard/office/view-office/', item.name, '0']);
  }

  getCountries() {
    this.spinner.show();
    this.admin.postDataApi('getCountryLocality', {}).subscribe(r => {
      this.location.countries = r['data'];
      if (this.is_back) {
        const selectedCountry = this.location.countries.filter(x => x.id.toString() === this.parameter.country_id);
        this.location.states = selectedCountry.length > 0 ? selectedCountry[0].states : [];
        const selectedState = this.location.states.filter(x => x.id.toString() === this.parameter.state_id);
        this.location.cities = selectedState.length > 0 ? selectedState[0].cities : [];
        const localities = [];
        this.selectedLocation.selectedCities.forEach((cityObject) => {
          const selectedlocality = this.location.cities.filter(x => x.id == cityObject.id);
          (selectedlocality[0].localities || []).forEach((localityObject) => {
            localities.push(localityObject);
          });
        });
        this.location.localities = localities;
      } else {
        this.parameter.country_id = '0';
        this.parameter.state_id = '0';
      }
      this.getListing();
    });
  }

  getPropertyConfigurations() {
    this.admin.postDataApi('getConfigurations', { hide_blocked: 1 }).subscribe(r => {
      this.configurations = r['data'];
    });
  }

  onCountryChange(id) {
    this.selectedLocation.selectedCities = [];
    this.location.cities = [];
    this.selectedLocation.selectedLocalities = [];
    this.location.localities = [];
    this.parameter.country_id = id;
    this.location.states = []; this.parameter.state_id = '0';
    this.parameter.city_id = '0';
    this.parameter.locality_id = '0';
    if (!id || id === '0') {
      this.parameter.state_id = '0';
      return false;
    }
    this.parameter.country_id = id;
    const selectedCountry = this.location.countries.filter(x => x.id.toString() === id);
    this.location.states = selectedCountry[0].states;
  }

  onStateChange(id) {
    this.selectedLocation.selectedCities = [];
    this.location.cities = [];
    this.selectedLocation.selectedLocalities = [];
    this.location.localities = [];
    this.parameter.city_id = '0';
    this.parameter.locality_id = '0';
    if (!id || id === '0') {
      this.parameter.city_id = '0';
      return false;
    }
    this.parameter.state_id = id;
    const selectedState = this.location.states.filter(x => x.id.toString() === id);
    this.location.cities = selectedState[0].cities;
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

  // onCityChange(id) {
  //   this.location.localities = []; this.parameter.locality_id = '0';
  //   if (!id || id === '0') {
  //     this.parameter.locality_id = '0';
  //     return false;
  //   }
  //   this.parameter.city_id = id;
  //   const selectedCountry = this.location.cities.filter(x => x.id.toString() === id);
  //   this.location.localities = selectedCountry[0].localities;
  // }

  // onLocalityChange(id) {
  //   this.parameter.locality_id = '';
  //   if (!id || id === '0') {
  //     return false;
  //   }
  //   this.parameter.locality_id = id;
  // }

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
        this.parameter.text = this.translate.instant('message.error.wantToUnBlockOffice');
        this.parameter.successText = this.translate.instant('message.success.unblockedSuccessfully');
        break;
      case 1:
        this.parameter.text = this.translate.instant('message.error.wantToBlockOffice');
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

  openunapprove(item) {
    this.parameter.text = this.translate.instant('message.error.wantToUnapproveOffice');

    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: this.translate.instant('propertyDetail.yes')
    }).then((result) => {
      if (result.value) {
        this.rejectProject(4)
      }
    });
  }

  blockProject(item, flag: number) {
    this.admin.postDataApi('blockOffice', { office_id: item.id, flag: flag })
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
    if (item.is_completed !== 1 && item.is_completed !== 3) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.cannotApproveOffice'), 'error');
      return false;
    }
    item.status = status;
    this.admin.postDataApi('approveOffice', { office_id: item.id }).subscribe(r => {
      swal(this.translate.instant('swal.success'), this.translate.instant('message.success.officeApprovedSuccessfully'), 'success');
    },
      error => {
        swal(this.translate.instant('swal.error'), error.error.message, 'error');
      });
  }

  rejectProject(status) {
    this.items[this.parameter.index].status = status;
    this.admin.postDataApi('rejectOffice', { office_id: this.parameter.office_id }).subscribe(r => {
      swal(this.translate.instant('swal.success'), this.translate.instant('message.success.officeUnapprovedSuccessfully'), 'success');
      this.closeModal();
    },
      error => {
        swal(this.translate.instant('swal.error'), error.error.message, 'error');
      });
  }

  openCancellationModal(item, index) {
    this.parameter.text = this.translate.instant('message.error.wantToUnapproveOffice');

    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: this.translate.instant('propertyDetail.yes')
    }).then((result) => {
      if (result.value) {
        this.parameter.office_id = item.id;
        this.parameter.index = index;
        this.rejectProject(4)
      }
    });
    // this.parameter.office_id = item.id;
    // this.parameter.index = index;
    // this.modalOpen.nativeElement.click();
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
    this.parameter.text = this.translate.instant('message.error.wantToDeleteOffice');

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
    this.admin.postDataApi('deleteOffice',
      { office_id: item.id }).subscribe(r => {
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
      this.router.navigate(['/dashboard/office/edit-office', item.id]);
    }
  }

  viewAgency(item: any) {
    if (item.agency && item.agency.name) {
      this.router.navigate(['/dashboard/agencies/view-all', item.agency.name]);
    } else {
      this.router.navigate(['/dashboard/office/edit-office', item.id]);
    }
  }

  // viewLegalEntity(item: any) {
  //   if (item.legal_entity && item.legal_entity.comm_name) {
  //     this.router.navigate(['/dashboard/legal-entities/view-all', item.legal_entity.comm_name]);
  //   } else {
  //     this.router.navigate(['/dashboard/projects/edit-project', item.id]);
  //   }
  // }

  viewCompanyManager(item: any) {
    if (item.manager && item.manager.id) {
      this.router.navigate(['/dashboard/managers/view-all', 'manager', item.manager.name]);
    } else if (item.company && item.company.id) {
      this.router.navigate(['/dashboard/companies/view-all', item.company.name]);
    } else {
      this.router.navigate(['/dashboard/office/edit-office', item.id]);
    }
  }

  viewDocument(document: string) {
    window.open(document, '_blank');
  }

  getExportlisting() {
    this.spinner.show();
    this.makePostRequest();
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
    this.admin.postDataApi('getOffice', input).subscribe(
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
        let obj = {
          'Office Name': p.name || '',
          'City': (p.city || {}).name || '',
          'Locality': (p.locality || {}).name || '',
          'Location': p.address || '',
          'Latitude': p.lat || '',
          'Longitude': p.lng || '',
          'Developer Name': p.developer && p.developer.name ? p.developer.name : '',
          'Agency Name': p.agency && p.agency.name ? p.agency.name : '',
          'Legal Entity Name': p.legal_entity && p.legal_entity.comm_name ? p.legal_entity.comm_name : '',
          'Manager Name': p.manager && p.manager.name ? p.manager.name : '',
          'Company Name': p.company && p.company.name ? p.company.name : '',
          'Possession Status': p.possession_status && this.language_code == 'en' ? p.possession_status.name_en : p.possession_status && this.language_code == 'es' ?
                               p.possession_status.name_es : '',
          'Parking Lots': this.totalParkingCount(p) || 0,
          'Total Square Meters': parseInt(p.total_square_meters) || 0
        };

        this.selectedColumnsToShow.office_name == 0 ? delete obj['Office Name'] : undefined;
        this.selectedColumnsToShow.developer == 0 ? delete obj['Developer Name'] : undefined;
        this.selectedColumnsToShow.agency == 0 ? delete obj['Agency Name'] : undefined;
        this.selectedColumnsToShow.legal_entity == 0 ? delete obj['Legal Entity Name'] : undefined;
        this.selectedColumnsToShow.contributor == 0 ? delete obj['Contributor'] : undefined;
        this.selectedColumnsToShow.managed_company == 0 && !p.manager ? delete obj['Manager Name'] : undefined;
        this.selectedColumnsToShow.managed_company == 0 && !p.company ? delete obj['Company Name'] : undefined;
        this.selectedColumnsToShow.possesion == 0 ? delete obj['Possession Status'] : undefined;
        this.selectedColumnsToShow.parking_lots == 0 ? delete obj['Parking Lots'] : undefined;
        this.selectedColumnsToShow.total_square_meters == 0 ? delete obj['Total Square Meters'] : undefined;

        exportfinalData.push(obj);
      }
      this.exportAsExcelFile(exportfinalData, 'Office-');
    }
  }

  // getTransformedAmount(value: any) {
  //   return (this.price.transform(Number(value).toFixed(2)).toString()).substring(1);
  // }

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

  makePostRequest = (): void => {
    this.parameter.localities = this.selectedLocation.selectedLocalities.length > 0 ? this.selectedLocation.selectedLocalities.map(o => o.id) : null;
    this.parameter.cities = this.selectedLocation.selectedCities.length > 0 ? this.selectedLocation.selectedCities.map(o => o.id) : null;
  }

  ngOnDestroy(): void {
    this.makePostRequest();
    localStorage.setItem('selectedLocalitiesForOffice', JSON.stringify(this.selectedLocation.selectedLocalities.length > 0 ? this.selectedLocation.selectedLocalities : []));
    localStorage.setItem('selectedCitiesForOffice', JSON.stringify(this.selectedLocation.selectedCities.length > 0 ? this.selectedLocation.selectedCities : []));
    localStorage.setItem('parametersForOffice', JSON.stringify(this.parameter));
  }

  openLegalEnityListModel = (legal_entity: any[]): void => {
    this.legalEntities = legal_entity;
    this.legalEnityListModelOpen.nativeElement.click();
  }

  closeLegalEnityListModel = (): void => {
    this.legalEnityListModelClose.nativeElement.click();
  }

  openContributorListModel = (contributor: any[]): void => {
    this.contributor = contributor;
    if (this.contributor.length > 0) {
      this.contributorListModelOpen.nativeElement.click();
    }
  }

  closeContributorListModel = (): void => {
    this.contributorListModelClose.nativeElement.click();
  }

  navigateToLegalEntity = (legal_entity: any): void => {
    this.closeLegalEnityListModel();
    this.router.navigate(['/dashboard/legal-entities/view-all', legal_entity.legal_entity_id]);
  }

  getLegalEntityInfo = (legal_entity_info: any[]): any => {
    if (legal_entity_info.length == 1) {
      return legal_entity_info[0].legal_entity.comm_name;
    } else {
      return (legal_entity_info[0].legal_entity.comm_name + '+' + (legal_entity_info.length - 1));
    }
  }

  getBuildingContributorsInfo = (contributor: any[]): any => {
    if (contributor.length == 1) {
      return contributor[0].user_type == 1 ? (contributor[0].users.name + " " + (contributor[0].users.first_name ? contributor[0].users.first_name + ' ' : '') + (contributor[0].users.second_name ? contributor[0].users.second_name : '')) : contributor[0].legal_entity.comm_name;
    }
    else if (contributor.length > 1) {
      return contributor[0].user_type == 1 ? (contributor[0].users.name + " " + (contributor[0].users.first_name ? contributor[0].users.first_name + ' ' : '') + (contributor[0].users.second_name ? contributor[0].users.second_name : '') + '+' + (contributor.length - 1)) : (contributor[0].legal_entity.comm_name + '+' + (contributor.length - 1));
    }
  }


  totalParkingCount(p: any) {
    let value = ((parseInt(p.parking_count) || 0) + (parseInt(p.parking_sale_count) || 0)) + '/' + ((parseInt(p.parking_for_rent) || 0) + (parseInt(p.parking_lots) || 0))
    return value;
  }

  getProjectSelection = (isFirstTime: boolean, keyword?: string): void => {
    this.spinner.show();
    this.admin.postDataApi('getOfficeSelection', { name: keyword }).subscribe((response) => {
      this.spinner.hide();
      this.select_columns_list = (response.data || []).sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
      (this.select_columns_list || []).forEach((data, index) => {
        this.makeSelectedColumns(data.id, index);
      });
      this.changeSelect();
      if (isFirstTime) {
        this.keyword = '';
        this.isSelectAllColumns = false;
        this.language_code = localStorage.getItem('language_code');
        this.openSelectColumnsModal.nativeElement.click();
      }
    }, (error) => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), ((error || {}).error || {}).message, 'error');
    });
  }

  changeSelect = (): void => {
    let index = 0;
    (this.select_columns_list || []).forEach((data) => {
      if (data.isCheckBoxChecked) {
        index += 1;
      }
    });
    if ((this.select_columns_list || []).length == index) {
      this.isSelectAllColumns = true;
    } else {
      this.isSelectAllColumns = false;
    }
  }

  makeSelectedColumns = (id: number, index: number): void => {
    switch (id) {
      case 1:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.office_name;
        break;
      case 2:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.developer;
        break;
      case 3:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.agency;
        break;
      case 4:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.legal_entity;
        break;
      case 5:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.contributor;
        break;
      case 6:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.managed_company;
        break;
      case 7:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.possesion;
        break;
      case 8:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.parking_lots;
        break;
      case 9:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.total_square_meters;
        break;
      case 17:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.action;
        break;
      case 21:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.image;
        break;
      default:
        break;
    }

  }

  getProjectHome = (): void => {
    //this.spinner.show();
    this.admin.postDataApi('getOfficeHome', { user_id: JSON.parse(localStorage.getItem('user-id')) || 0 }).subscribe((response) => {
      this.selectedColumnsToShow = response.data || {};
      //this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), error.message, 'error');
    });
  }

  changeSelectAll = (): void => {
    (this.select_columns_list || []).forEach((data) => {
      data.isCheckBoxChecked = this.isSelectAllColumns;
    });
  }

  closeSelectColumnsPopup = (): void => {
    this.keyword = '';
    this.isSelectAllColumns = false;
    this.closeSelectColumnsModal.nativeElement.click();
  }

  applyShowSelectedColumns = (): void => {
    this.spinner.show();
    this.admin.postDataApi('updateOfficeHome', this.getPostRequestForColumn()).subscribe((response) => {
      this.spinner.hide();
      this.closeSelectColumnsPopup();
      this.getProjectHome();
    }, (error) => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), error.error.message, 'error');
    });
  }

  getPostRequestForColumn = (): any => {
    return {
      user_id: JSON.parse(localStorage.getItem('user-id')) || 0,
      office_name: (this.select_columns_list[0] || []).isCheckBoxChecked,
      developer: (this.select_columns_list[1] || []).isCheckBoxChecked,
      agency: (this.select_columns_list[2] || []).isCheckBoxChecked,
      legal_entity: (this.select_columns_list[3] || []).isCheckBoxChecked,
      contributor: (this.select_columns_list[4] || []).isCheckBoxChecked,
      managed_company: (this.select_columns_list[5] || []).isCheckBoxChecked,
      possesion: (this.select_columns_list[6] || []).isCheckBoxChecked,
      parking_lots: (this.select_columns_list[7] || []).isCheckBoxChecked,
      total_square_meters: (this.select_columns_list[8] || []).isCheckBoxChecked,
      action: (this.select_columns_list[9] || []).isCheckBoxChecked,
      image: (this.select_columns_list[10] || []).isCheckBoxChecked,
    };
  }

  getofficePossessionStatuses() {
    this.admin.postDataApi('getOfficePossessionStatuses', {  }).subscribe(r => {
      this.possessionStatuses = r['data'];
    });
  }
}