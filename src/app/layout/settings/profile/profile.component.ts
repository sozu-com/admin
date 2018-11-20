import { Component, OnInit } from '@angular/core';
import { AdminService } from './../../../services/admin.service';
import { CommonService } from './../../../services/common.service';
import { IProperty } from './../../../common/property';
import { ACL } from './../../../models/acl.model';
import { Constant } from './../../../common/constants';
declare let swal: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ACL]
})
export class ProfileComponent implements OnInit {

  image: any;
  public parameter: IProperty = {};
  initialCountry: any;
  show = false;
  constructor(public constant: Constant, public model: ACL,
    private admin: AdminService
  ) { }

  ngOnInit() {
    this.model.country_code = this.constant.country_code;
    this.model.dial_code = this.constant.dial_code;
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.p = this.constant.p;
    this.initialCountry = {initialCountry: this.constant.country_code};
    // this.model.id = params['id'];
    this.loginData(this.model.id);
  }

  loginData(id) {
    this.parameter.loading = true;
    this.admin.postDataApi('loginData', {})
    .subscribe(
      success => {
        this.parameter.loading = false;
        this.model = success.data;
        this.image = this.model.image;
        this.model.admin_acl = success.data.admin_acl;
        this.model.address = [];
        console.log('success.data.countries.length', success.data.countries, success.data.countries.length);
        for (let ind = 0; ind < success.data.countries.length; ind++) {
          console.log('success.data.countries.length', success.data.countries[ind].name_en, success.data.countries.length);
          const tempAdd = {
            countries: success.data.countries[ind].name_en,
            states: success.data.states !== null && success.data.states[ind] ? success.data.states[ind].name_en : 'All',
            cities: success.data.cities !== null && success.data.cities[ind] ? success.data.cities[ind].name_en : 'All',
            localities: success.data.localities !== null && success.data.localities[ind] ? success.data.localities[ind].name_en : 'All',
            buildings: success.data.buildings !== null && success.data.buildings[ind] ? success.data.buildings[ind].name_en : 'All'
          };
          console.log('temp', tempAdd);
          console.log('model', this.model);
          console.log('in', ind);
          this.model.address[ind] = tempAdd;
          console.log('model', this.model);
        }
      }, error => {
        this.parameter.loading = false;
      });
  }

  expandBox(index) {
    this.model.admin_acl[index].show = this.model.admin_acl[index].show === true ? false : true;
  }
}
