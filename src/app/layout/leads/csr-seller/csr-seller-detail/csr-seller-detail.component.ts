import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from '../../../../services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IProperty } from '../../../../common/property';
import { NgForm } from '@angular/forms';
import { Constant } from '../../../../common/constants';
declare let swal: any;

@Component({
  selector: 'app-csr-seller-detail',
  templateUrl: './csr-seller-detail.component.html',
  styleUrls: ['./csr-seller-detail.component.css']
})
export class CsrSellerDetailComponent implements OnInit {

  public parameter: IProperty = {};
  public location: IProperty = {};

  items: any= [];
  total: any= 0;
  configurations: any= [];
  countries: any;

  price_sort = 1;
  availability_sort = 1;
  lead_sort = 1;

  seller_id: any;

  constructor(
    public constant: Constant,
    private element: ElementRef,
    private route: ActivatedRoute,
    public admin: AdminService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
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
    this.parameter.loading = true;
    this.items = [];
    this.parameter.noResultFound = false;
    this.admin.postDataApi('propertyHome', this.parameter).subscribe(
      success => {
        console.log('LIST', success);
        this.items = success.data;
        if (this.items.length <= 0){this.parameter.noResultFound = true; }
        this.total = success.total_count;
        this.parameter.loading = false;
      },
      error => {
        this.parameter.loading = false;
      });
  }

  getCountries() {
    this.admin.postDataApi('getCountryLocality', {}).subscribe(r => {
      console.log('Country', r);
      this.location.countries = r['data'];
    });
  }

  getPropertyConfigurations() {
    this.admin.postDataApi('getPropertyConfigurations', {}).subscribe(r => {
      console.log('Config', r);
      this.configurations = r['data'];
    });
  }

  onCountryChange(id) {
    console.log(id);
    this.location.cities = []; this.parameter.city_id = '0';
    this.location.localities = []; this.parameter.locality_id = '0';
    this.parameter.state_id = '';
    if (!id || id == 0) {
      this.parameter.state_id = '0';
      this.location.states = [];
      return false;
    }

    this.parameter.country_id = id;
    const selectedCountry = this.location.countries.filter(x => x.id == id);
    this.location.states = selectedCountry[0].states;
  }

  onStateChange(id) {
    console.log(id);
    this.location.localities = []; this.parameter.locality_id = '0';
    this.parameter.city_id = '';
    if (!id || id == 0) {
      this.parameter.city_id = '0';
      this.location.cities = [];
      return false;
    }

    this.parameter.state_id = id;
    const selectedState = this.location.states.filter(x => x.id == id);
    this.location.cities = selectedState[0].cities;
  }

  onCityChange(id) {
    console.log(id);
    this.parameter.locality_id = '';
    if (!id || id == 0) {
      this.parameter.locality_id = '0';
      return false;
    }

    this.parameter.city_id = id;
    const selectedCountry = this.location.cities.filter(x => x.id == id);
    this.location.localities = selectedCountry[0].localities;
  }

  onLocalityChange(id) {
    console.log(id);
    if (!id || id == 0) {
      return false;
    }

    this.parameter.locality_id = id;
    this.getListing();
  }

  changeFlag(flag) {
    this.parameter.flag = flag;
    this.getListing();
  }

  sort_by(sort_by){
    if (this.parameter.sort_by != sort_by){
      this.parameter.sort_by = sort_by;
      this.parameter.sort_by_order = 0;
    }else{
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
    this.admin.postDataApi('blockProperty', {property_id: item.id, flag: 1}).subscribe(r => {
      console.log(r);
      swal('Success', 'Property blocked successfully', 'success');
    },
    error => {
      swal('Error', error.error.message, 'error');
    });
  }

  unblock(item) {
    item.is_blocked = false;
    this.admin.postDataApi('blockProperty', {property_id: item.id, flag: 0 }).subscribe(r => {
      console.log(r);
      swal('Success', 'Property unblocked successfully', 'success');
    },
    error => {
      swal('Error', error.error.message, 'error');
    });
  }

  changeStatus(item, status) {
    item.status = status;
    this.admin.postDataApi('updatePropertyStatus', {property_id: item.id, status_id: status }).subscribe(r => {
      console.log(r);
      swal('Success', 'Property status changed', 'success');
    },
    error => {
      swal('Error', error.error.message, 'error');
    });
  }
}
