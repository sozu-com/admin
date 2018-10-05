import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { IProperty } from '../../../common/property';
import { Constant } from './../../../common/constants';
import { Router } from '@angular/router';
import { Users } from '../../../models/users.model';


declare let swal: any;

@Component({
  selector: 'app-csr-seller',
  templateUrl: './csr-seller.component.html',
  styleUrls: ['./csr-seller.component.css'],
  providers: [Constant]
})
export class CsrSellerComponent implements OnInit {

  public parameter: IProperty = {};
  public location: IProperty = {};
  items: Array<Users> = [];

  users:any = [];
  selectedUser:any;
  initSelection = false;

  dash:any={
    lead_total: 0,
    lead_property_pending:0,
    lead_with_property: 0,
    lead_without_property: 0
  };
  
  chartView:any=[];

  constructor(
    private admin: AdminService,
    private constant: Constant,
  ) { }

  ngOnInit() {
    this.parameter.keyword='';
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.parameter.flag = 2;
    this.parameter.total = 0;
    this.parameter.count_flag = 1;
    this.getCountries();
    //this.getCsrListing();
    this.getListing();
    this.getCsrSellerDash();
    Object.assign(this,this.chartView);
    //this.myChart = new Chart(ctx,{});
  }

  getCountries() {
    this.admin.postDataApi('getCountryLocality', {}).subscribe(r => {
      console.log('Country', r);
      this.location.countries = r['data'];
    });
  }

  onCountryChange(id) {
    console.log(id);
    this.location.cities = []; this.parameter.city_id = '0';
    this.location.localities = []; this.parameter.locality_id = '0';
    if (!id || id === 0) {
      this.parameter.state_id = '0';
      return false;
    }
    this.parameter.country_id = id;
    const selectedCountry = this.location.countries.filter(x => x.id == id);
    this.location.states = selectedCountry[0].states;
    
  }

  onStateChange(id) {
    console.log(id);
    this.location.localities = []; this.parameter.locality_id = '0';
    if (!id || id === 0) {
      this.parameter.city_id = '0';
      return false;
    }
    this.parameter.state_id = id;
    const selectedState = this.location.states.filter(x => x.id == id);
    this.location.cities = selectedState[0].cities;
  }

  onCityChange(id) {
    console.log(id);
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
    this.getCsrListing();
  }

  changeFlag(flag) {
    this.parameter.flag = flag;
    this.parameter.count_flag = 1;
    this.getListing();
    this.getCsrSellerDash();
  }

  changeFilter(key, value) {
    this.parameter[key] = value;
    this.getListing();
  }

  changeCountFlag(flag){
    this.parameter.count_flag = flag;
    this.getListing();
  }

  getCsrListing(){
    this.initSelection = true;
    this.users = [];
    const input = new FormData();
    if (this.parameter.keyword) {
      input.append('keyword', this.parameter.keyword);
    }
    if (this.parameter.country_id && this.parameter.country_id !== '-1') {
      input.append('countries', JSON.stringify([this.parameter.country_id]));
    }

    if (this.parameter.state_id && this.parameter.state_id !== '-1') {
      input.append('states', JSON.stringify([this.parameter.state_id]));
    }

    if (this.parameter.city_id && this.parameter.city_id !== '-1') {
      input.append('cities', JSON.stringify([this.parameter.city_id]));
    }

    if (this.parameter.locality_id && this.parameter.locality_id !== '-1') {
      input.append('localities', JSON.stringify([this.parameter.locality_id]));
    }
    this.admin.postDataApi('getCsrSellers', input).subscribe(
      success => {
        console.log(success.data);
        this.users = success.data;
      });
  }

  selectCsrUser(user){
    this.selectedUser = user;
    this.users = [];
    this.parameter.keyword = '';
    this.initSelection = false;
    this.getListing();
    this.getCsrSellerDash();
  }

  removeCsrUser(){
    this.selectedUser = '';
    this.parameter.keyword='';
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.parameter.flag = 2;
    this.parameter.total = 0;
    this.parameter.count_flag = 1;
    this.getListing();
  }
  
  getCsrSellerDash(){
    const input = new FormData();
    if (this.selectedUser) {
      input.append('assignee_id', this.selectedUser.id);
    }
    if (this.parameter.flag) {
      input.append('flag', this.parameter.flag.toString());
    }

    this.admin.postDataApi('leads/csr-seller-dash-count',input).subscribe(r=>{
      console.log('dash',r);
      this.dash = r.data;
      this.chartView=[
        {
          "name": "Lead Property pending",
          "value": parseInt(this.dash.lead_property_pending,10)
        },
        {
          "name": "Lead with Property",
          "value": parseInt(this.dash.lead_with_property,10)
        },
        {
          "name": "Lead without Property",
          "value": parseInt(this.dash.lead_without_property,10)
        }
      ];
      //Object.assign(this,this.chartView);
    });
  }

  getListing() {
    this.items=[];
    let input:any = JSON.parse(JSON.stringify(this.parameter));
    if (this.selectedUser) {
      input.assignee_id = this.selectedUser.id;
    }
    this.admin.postDataApi('leads/csr-seller', input).subscribe(
    success => {
      this.items = success.data;
      console.log(success);
      this.parameter.total = success.total_count;
    });
  }


  getPage(page) {
    this.parameter.page = page;
    this.getListing();
  }

  sort_by(sort_by_flag){
    if(this.parameter.sort_by_flag != sort_by_flag){
      this.parameter.sort_by_flag = sort_by_flag;
      this.parameter.sort_by_order = 0;
    }else{
      this.parameter.sort_by_order = this.parameter.sort_by_order?0:1;
    }
    this.getListing();
  }

}
