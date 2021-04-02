import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { IProperty } from 'src/app/common/property';
import { ACL } from 'src/app/models/acl.model';
import { Constant } from 'src/app/common/constants';
import { NgxSpinnerService } from 'ngx-spinner';
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
    private admin: AdminService, private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.model.country_code = this.constant.country_code;
    this.model.dial_code = this.constant.dial_code;
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.p = this.constant.p;
    this.initialCountry = {initialCountry: this.constant.country_code};
    this.loginData();
  }

  loginData() {
    this.spinner.show();
    this.admin.postDataApi('loginData', {})
    .subscribe(
      success => {
        this.spinner.hide();
        this.model = success.data;
        this.image = this.model.image;
        this.model.admin_acl = success.data.admin_acl;
        this.model.address = [];
        for (let ind = 0; ind < success.data.countries.length; ind++) {
          const tempAdd = {
            countries: success.data.countries[ind].name_en,
            states: success.data.states !== null && success.data.states[ind] ? success.data.states[ind].name_en : 'All',
            cities: success.data.cities !== null && success.data.cities[ind] ? success.data.cities[ind].name_en : 'All',
            localities: success.data.localities !== null && success.data.localities[ind] ? success.data.localities[ind].name_en : 'All',
            buildings: success.data.buildings !== null && success.data.buildings[ind] ? success.data.buildings[ind].name_en : 'All'
          };
          this.model.address[ind] = tempAdd;
        }
      }, error => {
        this.spinner.hide();
      });
  }

  expandBox(index: number) {
    this.model.admin_acl[index].show = this.model.admin_acl[index].show === true ? false : true;
  }
}
