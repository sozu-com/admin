// import { Component, OnInit } from '@angular/core';
// import { AdminService } from '../../../services/admin.service';
// import { IProperty } from '../../../common/property';
// import { Constant } from './../../../common/constants';
// declare let swal: any;

// @Component({
//   selector: 'app-csr-buyer',
//   templateUrl: './csr-buyer.component.html',
//   styleUrls: ['./csr-buyer.component.css'],
//   providers: [Constant]
// })
// export class CsrBuyerComponent implements OnInit {

//   public parameter: IProperty = {};
//   items = [];

//   constructor(
//     private admin: AdminService,
//     private constant: Constant
//   ) { }

//   ngOnInit() {
//     this.parameter.itemsPerPage = this.constant.itemsPerPage;
//     this.parameter.page = this.constant.p;
//     this.parameter.flag = 2;
//     this.getListing();
//   }

//   changeFlag(flag) {
//     this.parameter.flag = flag;
//     this.getListing();
//   }

//   changeFilter(key, value) {
//     this.parameter[key] = value;
//     this.getListing();
//   }

//   getPage(page) {
//     this.parameter.page = page;
//     this.getListing();
//   }

//   getListing() {
//     this.parameter.url = 'leads/csr-buyer';
//     this.admin.postDataApi(this.parameter.url, this.parameter)
//       .subscribe(
//         success => {
//           this.items = success.data;
//           this.parameter.total = success.total_count;
//         });
//   }


//   blockUnblockPopup(index, id, flag, user_type) {
//     this.parameter.title = this.constant.title.ARE_YOU_SURE;
//     switch (flag) {
//       case 0:
//         this.parameter.text = this.constant.title.UNBLOCK_LEAD;
//         this.parameter.successText = this.constant.successMsg.UNBLOCKED_SUCCESSFULLY;
//         break;
//       case 1:
//         this.parameter.text = this.constant.title.BLOCK_LEAD;
//         this.parameter.successText = this.constant.successMsg.BLOCKED_SUCCESSFULLY;
//         break;
//     }

//     swal({
//       html: this.parameter.title + '<br>' + this.parameter.text,
//       type: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes!'
//     }).then((result) => {
//       if (result.value) {
//         this.block(index, id, flag, user_type);
//       }
//     });
//   }


//   block(index, id, flag, user_type) {
//     this.admin.postDataApi('leads/blockLead', {lead_id: id, flag: flag})
//       .subscribe(
//         success => {
//           swal('Success', this.parameter.successText, 'success');
//           this.items[index].is_blocked = flag;
//         });
//   }
// }



import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { IProperty } from '../../../common/property';
import { Constant } from './../../../common/constants';
import { Users } from '../../../models/users.model';
declare let swal: any;

@Component({
  selector: 'app-csr-buyer',
  templateUrl: './csr-buyer.component.html',
  styleUrls: ['./csr-buyer.component.css']
})
export class CsrBuyerComponent implements OnInit {

  public parameter: IProperty = {};
  public location: IProperty = {};
  items: Array<Users> = [];

  users: any = [];
  selectedUser: any;
  initSelection = false;

  dash: any= {
    lead_total: 0,
    lead_without_broker: 0,
    lead_information_filled: 0,
    lead_broker_assigned: 0
  };
  chartView: any= [];

  constructor(
    private admin: AdminService,
    private constant: Constant
  ) { }

  ngOnInit() {
    this.parameter.keyword = '';
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.parameter.flag = 2;
    this.parameter.total = 0;
    this.parameter.count_flag = 1;
    this.getCountries();
    this.getListing();
    this.getCsrSellerDash();
    Object.assign(this, this.chartView);
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
    const selectedCountry = this.location.countries.filter(x => x.id === id);
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
    const selectedState = this.location.states.filter(x => x.id === id);
    this.location.cities = selectedState[0].cities;
  }

  onCityChange(id) {
    console.log(id);
    if (!id || id === 0) {
      this.parameter.locality_id = '0';
      return false;
    }
    this.parameter.city_id = id;
    const selectedCountry = this.location.cities.filter(x => x.id === id);
    this.location.localities = selectedCountry[0].localities;
  }

  onLocalityChange(id) {
    console.log(id);
    if (!id || id === 0) {
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

  changeCountFlag(flag) {
    this.parameter.count_flag = flag;
    this.getListing();
  }

  getCsrListing() {
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
    this.admin.postDataApi('getCsrBuyers', input).subscribe(
      success => {
        console.log(success.data);
        this.users = success.data;
      });
  }

  selectCsrUser(user) {
    this.selectedUser = user;
    this.users = [];
    this.parameter.keyword = '';
    this.initSelection = false;
    this.getListing();
    this.getCsrSellerDash();
  }

  removeCsrUser() {
    this.selectedUser = '';
    this.parameter.keyword = '';
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.parameter.flag = 2;
    this.parameter.total = 0;
    this.parameter.count_flag = 1;
    this.getListing();
  }

  getCsrSellerDash() {
    const input = new FormData();
    if (this.selectedUser) {
      input.append('assignee_id', this.selectedUser.id);
    }
    if (this.parameter.flag) {
      input.append('flag', this.parameter.flag.toString());
    }

    this.admin.postDataApi('leads/csr-buyer-dash-count', input).subscribe(r => {
      console.log('dash', r);
      this.dash = r.data;

      this.chartView = [
        {
          'name': 'Lead information filled',
          'value': parseInt(this.dash.lead_information_filled, 10)
        },
        {
          'name': 'Lead with broker assigned',
          'value': parseInt(this.dash.lead_broker_assigned, 10)
        },
        {
          'name': 'Lead without broker assigned',
          'value': parseInt(this.dash.lead_without_broker, 10)
        }
      ];
    });
  }

  getListing() {
    this.items = [];
    this.parameter.noResultFound = false;
    const input: any = JSON.parse(JSON.stringify(this.parameter));
    if (this.selectedUser) {
      input.assignee_id = this.selectedUser.id;
    }
    this.admin.postDataApi('leads/csr-buyer', input).subscribe(
    success => {
      this.items = success.data;
      if (this.items.length <= 0) { this.parameter.noResultFound = true; }
      console.log(success);
      this.parameter.total = success.total_count;
    });
  }


  getPage(page) {
    this.parameter.page = page;
    this.getListing();
  }

  sort_by(sort_by_flag) {
    if (this.parameter.sort_by_flag !== sort_by_flag) {
      this.parameter.sort_by_flag = sort_by_flag;
      this.parameter.sort_by_order = 0;
    }else {
      this.parameter.sort_by_order = this.parameter.sort_by_order ? 0 : 1;
    }
    this.getListing();
  }

}
