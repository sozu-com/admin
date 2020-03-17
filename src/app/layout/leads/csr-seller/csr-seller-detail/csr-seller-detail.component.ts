import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProperty } from 'src/app/common/property';
import { Constant } from 'src/app/common/constants';
import { AdminService } from 'src/app/services/admin.service';
import { TranslateService } from '@ngx-translate/core';
declare let swal: any;

@Component({
  selector: 'app-csr-seller-detail',
  templateUrl: './csr-seller-detail.component.html',
  styleUrls: ['./csr-seller-detail.component.css']
})
export class CsrSellerDetailComponent implements OnInit {

  public parameter: IProperty = {};
  public location: IProperty = {};

  items: any = [];
  total: any = 0;
  configurations: any = [];
  countries: any;

  price_sort = 1;
  availability_sort = 1;
  lead_sort = 1;

  seller_id: any;

  constructor(
    public constant: Constant,
    private route: ActivatedRoute,
    public admin: AdminService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.parameter.seller_id = params.id;
      this.parameter.itemsPerPage = this.constant.itemsPerPage;
      this.parameter.page = this.constant.p;
      this.parameter.dash_flag = 2;
      this.parameter.flag = 3;
      this.parameter.property_for = '';
      this.getCountries();
      this.getPropertyConfigurations();
      this.getListing();
    });
  }

  getListing() {
    this.spinner.show();
    this.items = [];
    this.parameter.noResultFound = false;
    this.admin.postDataApi('propertyHome', this.parameter).subscribe(
      success => {
        this.items = success.data;
        if (this.items.length <= 0) { this.parameter.noResultFound = true; }
        this.total = success.total_count;
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      });
  }

  getCountries() {
    this.admin.postDataApi('getCountryLocality', {}).subscribe(r => {
      this.location.countries = r['data'];
    });
  }

  getPropertyConfigurations() {
    this.admin.postDataApi('getPropertyConfigurations', {}).subscribe(r => {
      this.configurations = r['data'];
    });
  }

  onCountryChange(id) {
    this.location.states = []; this.parameter.state_id = '0';
    this.location.cities = []; this.parameter.city_id = '0';
    this.location.localities = []; this.parameter.locality_id = '0';
    this.parameter.state_id = '';
    if (!id || id === '0') {
      this.parameter.state_id = '0';
      this.location.states = [];
      return false;
    }

    this.parameter.country_id = id;
    const selectedCountry = this.location.countries.filter(x => x.id.toString() === id);
    this.location.states = selectedCountry[0].states;
  }

  onStateChange(id) {
    this.location.cities = []; this.parameter.city_id = '0';
    this.location.localities = []; this.parameter.locality_id = '0';
    this.parameter.city_id = '';
    if (!id || id === '0') {
      this.parameter.city_id = '0';
      this.location.cities = [];
      return false;
    }

    this.parameter.state_id = id;
    const selectedState = this.location.states.filter(x => x.id.toString() === id);
    this.location.cities = selectedState[0].cities;
  }

  onCityChange(id) {
    this.location.localities = []; this.parameter.locality_id = '0';
    this.parameter.locality_id = '';
    if (!id || id === '0') {
      this.parameter.locality_id = '0';
      return false;
    }

    this.parameter.city_id = id;
    const selectedCountry = this.location.cities.filter(x => x.id.toString() === id);
    this.location.localities = selectedCountry[0].localities;
  }

  onLocalityChange(id) {
    if (!id || id === '0') {
      return false;
    }

    this.parameter.locality_id = id;
    this.getListing();
  }

  changeFlag(flag) {
    this.parameter.flag = flag;
    this.getListing();
  }

  sort_by(sort_by) {
    if (this.parameter.sort_by !== sort_by) {
      this.parameter.sort_by = sort_by;
      this.parameter.sort_by_order = 0;
    } else {
      this.parameter.sort_by_order = this.parameter.sort_by_order ? 0 : 1;
    }
    this.getListing();
  }

  getPage(page) {
    this.parameter.page = page;
    this.getListing();
  }

  block(item) {
    item.is_blocked = true;
    this.admin.postDataApi('blockProperty', { property_id: item.id, flag: 1 }).subscribe(r => {
      swal(this.translate.instant('swal.success'), this.translate.instant('message.success.propertyBlockedSuccessfully'), 'success');
    },
      error => {
        swal(this.translate.instant('swal.error'), error.error.message, 'error');
      });
  }

  unblock(item) {
    item.is_blocked = false;
    this.admin.postDataApi('blockProperty', { property_id: item.id, flag: 0 }).subscribe(r => {
      swal(this.translate.instant('swal.success'), this.translate.instant('message.success.propertyUnblockedSuccessfully'), 'success');
    },
      error => {
        swal(this.translate.instant('swal.error'), error.error.message, 'error');
      });
  }

  changeStatus(item, status) {
    item.status = status;
    this.admin.postDataApi('updatePropertyStatus', { property_id: item.id, status_id: status }).subscribe(r => {
      swal(this.translate.instant('swal.success'), this.translate.instant('message.success.propertyStatusChanged'), 'success');
    },
      error => {
        swal(this.translate.instant('swal.error'), error.error.message, 'error');
      });
  }
}
