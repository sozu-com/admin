import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constant } from 'src/app/common/constants';
import { IProperty } from 'src/app/common/property';
import { AdminService } from 'src/app/services/admin.service';
declare let swal: any;
@Component({
  selector: 'app-expenditures',
  templateUrl: './expenditures.component.html',
  styleUrls: ['./expenditures.component.css']
})
export class ExpendituresComponent implements OnInit {
  public scrollbarOptions = { axis: 'y', theme: 'dark' };
  public parameter: IProperty = {};
  @ViewChild('openSelectColumnsModal') openSelectColumnsModal: ElementRef;
  @ViewChild('closeSelectColumnsModal') closeSelectColumnsModal: ElementRef;
  public select_columns_list: any[] = [];
  public selectedColumnsToShow: any = {};
  public isSelectAllColumns: boolean = false;
  public keyword: string = ''; public language_code: string;
  constructor(
    public admin: AdminService,
    private translate: TranslateService,
    public constant: Constant,
    private route: ActivatedRoute, private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.parameter.page = this.constant.p;
    this.parameter.dash_flag = this.constant.dash_flag;
    this.parameter.itemsPerPage = 10;
  }
  getPage(page) {
    this.parameter.page = page;
    this.getListing();
  }
  getListing() {

  }
  cancelPopup(item) { }

  getProjectSelection = (isFirstTime: boolean, keyword?: string): void => {
    this.spinner.show();
    this.admin.postDataApi('getProjectSelection', { name: keyword }).subscribe((response) => {
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
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.building_name;
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
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.properties;
        break;
      case 10:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.property_for_rent;
        break;
      case 11:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.property_for_sale;
        break;
      case 23:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.sale_rent;
        break;
      case 12:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.list_price;
        break;
      case 13:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.carpet_area;
        break;
      case 14:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.price_per_metter;
        break;
      case 15:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.document;
        break;
      case 16:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.project_status;
        break;
      case 17:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.action;
        break;
      case 18:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.inventory_list_price;
        break;
      case 19:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.inventory_carpet_area;
        break;
      case 20:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.inventory_per_metter;
        break;
      case 21:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.image;
        break;
      case 22:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.avg_price_rent;
        break;
      case 23:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.building_type;
        break;
      default:
        break;
    }

  }

  getProjectHome = (): void => {
    //this.spinner.show();
    this.admin.postDataApi('getProjectHome', { user_id: JSON.parse(localStorage.getItem('user-id')) || 0 }).subscribe((response) => {
      this.selectedColumnsToShow = response.data || {};
      //this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), error.error.message, 'error');
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
    this.admin.postDataApi('updateProjectHome', this.getPostRequestForColumn()).subscribe((response) => {
      this.getListing();
      this.closeSelectColumnsPopup();
      this.getProjectHome();
      this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), error.error.message, 'error');
    });
  }

  getPostRequestForColumn = (): any => {
    return {
      user_id: JSON.parse(localStorage.getItem('user-id')) || 0,
      building_name: (this.select_columns_list[0] || []).isCheckBoxChecked,
      developer: (this.select_columns_list[1] || []).isCheckBoxChecked,
      agency: (this.select_columns_list[2] || []).isCheckBoxChecked,
      legal_entity: (this.select_columns_list[3] || []).isCheckBoxChecked,
      contributor: (this.select_columns_list[4] || []).isCheckBoxChecked,
      managed_company: (this.select_columns_list[5] || []).isCheckBoxChecked,
      possesion: (this.select_columns_list[6] || []).isCheckBoxChecked,
      parking_lots: (this.select_columns_list[7] || []).isCheckBoxChecked,
      properties: (this.select_columns_list[8] || []).isCheckBoxChecked,
      property_for_rent: (this.select_columns_list[9] || []).isCheckBoxChecked,
      property_for_sale: (this.select_columns_list[10] || []).isCheckBoxChecked,
      sale_rent: (this.select_columns_list[22] || []).isCheckBoxChecked,
      list_price: (this.select_columns_list[11] || []).isCheckBoxChecked,
      carpet_area: (this.select_columns_list[12] || []).isCheckBoxChecked,
      price_per_metter: (this.select_columns_list[13] || []).isCheckBoxChecked,
      document: (this.select_columns_list[14] || []).isCheckBoxChecked,
      project_status: (this.select_columns_list[15] || []).isCheckBoxChecked,
      action: (this.select_columns_list[16] || []).isCheckBoxChecked,
      inventory_list_price: (this.select_columns_list[17] || []).isCheckBoxChecked,
      inventory_carpet_area: (this.select_columns_list[18] || []).isCheckBoxChecked,
      inventory_per_metter: (this.select_columns_list[19] || []).isCheckBoxChecked,
      image: (this.select_columns_list[20] || []).isCheckBoxChecked,
      avg_price_rent: (this.select_columns_list[21] || []).isCheckBoxChecked,
      building_type: (this.select_columns_list[23] || []).isCheckBoxChecked
    };
  }
}



