import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { IProperty } from '../../common/property';
import { Constant } from './../../common/constants';
import * as moment from 'moment';
import { SellerSelections } from './../../models/addProperty.model';
import { UserModel } from 'src/app/models/inhouse-users.model';
declare let swal: any;

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {

  public parameter: IProperty = {};
  public location: IProperty = {};

  items: any = [];
  total: any = 0;
  configurations: any = [];
  countries: any;

  price_sort = 1;
  availability_sort = 1;
  lead_sort = 1;
  keyword: string;
  selecter_seller: SellerSelections;
  allSellers: Array<SellerSelections>;
  allExtBrokers: Array<UserModel>;
  property: any;
  @ViewChild('linkSellerModal') linkSellerModal: ElementRef;
  @ViewChild('closeLinkSellerModal') closeLinkSellerModal: ElementRef;
  @ViewChild('linkExtBrokerModal') linkExtBrokerModal: ElementRef;
  @ViewChild('closeExtBrokerModal') closeExtBrokerModal: ElementRef;
  constructor(
    public constant: Constant,
    public admin: AdminService
  ) { }

  ngOnInit() {
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.parameter.dash_flag = 2;
    this.parameter.flag = 3;
    this.getCountries();
    this.getPropertyConfigurations();
    this.getListing();
  }

  getListing() {
    this.parameter.loading = true;
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
    this.admin.postDataApi('propertyHome', input).subscribe(
      success => {
        this.items = success.data;
        this.total = success.total_count;
        this.parameter.loading = false;
      },
      error => {
        this.parameter.loading = false;
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
    this.parameter.country_id = id;
    this.location.states = []; this.parameter.state_id = '0';
    this.location.cities = []; this.parameter.city_id = '0';
    this.location.localities = []; this.parameter.locality_id = '0';
    this.parameter.buildings = []; this.parameter.building_id = '0';
    if (!id || id.toString() === '0') {
      return false;
    }

    this.parameter.country_id = id;
    const selectedCountry = this.location.countries.filter(x => x.id.toString() === id);
    this.location.states = selectedCountry[0].states;
  }

  onStateChange(id) {
    this.location.cities = []; this.parameter.city_id = '0';
    this.location.localities = []; this.parameter.locality_id = '0';
    this.parameter.buildings = []; this.parameter.building_id = '0';
    if (!id || id.toString() === '0') {
      return false;
    }

    this.parameter.state_id = id;
    const selectedState = this.location.states.filter(x => x.id.toString() === id);
    this.location.cities = selectedState[0].cities;
  }

  onCityChange(id) {
    this.location.localities = []; this.parameter.locality_id = '0';
    this.parameter.buildings = []; this.parameter.building_id = '0';
    if (!id || id.toString() === '0') {
      return false;
    }

    this.parameter.city_id = id;
    const selectedCountry = this.location.cities.filter(x => x.id.toString() === id);
    this.location.localities = selectedCountry[0].localities;
  }

  onLocalityChange(id) {
    this.parameter.buildings = []; this.parameter.building_id = '0';
    if (!id || id.toString() === '0') {
      return false;
    }
    this.parameter.locality_id = id;
  }

  getLocalityBuildings(id) {
    if (!id || id.toString() === '0') {
      return false;
    }
    this.parameter.locality_id = id;
    this.parameter.loading = true;
    this.admin.postDataApi('getLocalityBuildings', this.parameter)
      .subscribe(
        success => {
          this.parameter.loading = false;
          this.parameter.buildings = success.data;
        }, error => {
          this.parameter.loading = false;
        });
  }

  setBuilding(building_id) {
    this.parameter.building_id = building_id;
  }

  changeFlag(flag) {
    this.parameter.dash_flag = flag;
    if (flag === 5) {
      return false;
    }
    this.resetDates();
    this.getListing();
  }

  changePropertyFlag(flag) {
    this.parameter.flag = flag;
    this.getListing();
  }

  sort_by(sort_by) {
    if (this.parameter.sort_by !== sort_by) {
      this.parameter.sort_by = sort_by;
      this.parameter.sort_by_order = 1;
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
      swal('Success', 'Property blocked successfully', 'success');
    },
      error => {
        swal('Error', error.error.message, 'error');
      });
  }

  unblock(item) {
    item.is_blocked = false;
    this.admin.postDataApi('blockProperty', { property_id: item.id, flag: 0 }).subscribe(r => {
      swal('Success', 'Property unblocked successfully', 'success');
    },
      error => {
        swal('Error', error.error.message, 'error');
      });
  }

  changeStatus(item, status) {
    item.status = status;
    this.admin.postDataApi('updatePropertyStatus', { property_id: item.id, status_id: status }).subscribe(r => {
      swal('Success', 'Property status changed', 'success');
    },
      error => {
        swal('Error', error.error.message, 'error');
      });
  }

  resetFilters() {
    this.location.countries = JSON.parse(JSON.stringify(this.location.countries));
    this.onCountryChange('0');
    this.parameter.is_selected = false;
    this.parameter.page = this.constant.p;
    this.parameter.dash_flag = 2;
    this.parameter.total = 0;
    this.parameter.count_flag = 1;
    this.resetDates();
    this.getListing();
  }

  resetDates() {
    this.parameter.min = '';
    this.parameter.max = '';
  }

  markPropertyFeatured(item, is_featured: number) {
    item.is_featured = is_featured;
    this.admin.postDataApi('markPropertyFeatured', { property_id: item.id, flag: is_featured }).subscribe(r => {
      const msg = is_featured === 1 ? 'Featured successfully.' : 'Unfeatured successfully.';
      swal('Success', msg, 'success');
    },
      error => {
        swal('Error', error.error.message, 'error');
      });
  }

  showAllSellers(property_id: any) {
    this.parameter.loading = true;
    this.admin.postDataApi('getSellerSelections', { property_id: property_id }).subscribe(r => {
      this.parameter.loading = false;
      this.linkSellerModal.nativeElement.click();
      this.allSellers = r['data'];
      this.selecter_seller = r['selecter_seller'];
    }, error => {
      this.parameter.loading = false;
      swal('Error', error.error.message, 'error');
    });
  }

  changeStatusPopUp(property_id: any, user_id: string, status: number) {
    this.parameter.title = this.constant.title.ARE_YOU_SURE;
    this.parameter.text = 'You want to link this seller?';

    swal({
      html: this.parameter.title + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.changeStatusSellerSelection(property_id, user_id, status);
      }
    });
  }

  changeStatusSellerSelection(property_id: any, user_id: string, status: number) {
    this.admin.postDataApi('changeStatusSellerSelection', { property_id: property_id, user_id: user_id, status: status }).subscribe(r => {
      this.closeLinkSellerModal.nativeElement.click();
      swal('Success', 'Linked successfully.', 'success');
    },
      error => {
        swal('Error', error.error.message, 'error');
      });
  }

  changeSoldStatusPopup(property: any, index: number) {
    this.parameter.title = this.constant.title.ARE_YOU_SURE;
    this.parameter.text = 'You want to change the status?';

    swal({
      html: this.parameter.title + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.changePropertySoldStatus(property, index);
      }
    });
  }

  changePropertySoldStatus(property: any, index: number) {
    this.admin.postDataApi('changePropertySoldStatus',
    { property_id: property.id, is_property_sold: property.is_property_sold === 0 ? 1 : 0 }).subscribe(r => {
      this.items[index].is_property_sold = this.items[index].is_property_sold === 1 ? 0 : 1;
      swal('Success', 'Changed successfully.', 'success');
    },
      error => {
        swal('Error', error.error.message, 'error');
      });
  }

  deletePopup(property: any, index: number) {
    this.parameter.title = this.constant.title.ARE_YOU_SURE;
    this.parameter.text = 'You want to delete this property?';

    swal({
      html: this.parameter.title + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.deleteProperty(property, index);
      }
    });
  }

  deleteProperty(property: any, index: number) {
    this.admin.postDataApi('deleteProperty',
    { property_id: property.id }).subscribe(r => {
      swal('Success', 'Deleted successfully.', 'success');
      this.items.splice(index, 1);
    },
    error => {
      swal('Error', error.error.message, 'error');
    });
  }

  getBothBroker(property: any, keyword: string) {
    this.parameter.loading = true;
    if (property) { this.property = property; }
    const input = {keyword: ''};
    input.keyword = keyword;
    this.admin.postDataApi('getBothBroker', input).subscribe(r => {
      this.parameter.loading = false;
      if (property) {this.linkExtBrokerModal.nativeElement.click(); }
      this.allExtBrokers = r['data'];
    }, error => {
      this.parameter.loading = false;
      swal('Error', error.error.message, 'error');
    });
  }

  attachExternalBrokerPopUp(broker: any) {
    this.parameter.title = this.constant.title.ARE_YOU_SURE;
    this.parameter.text = 'You want to assign this agent?';

    swal({
      html: this.parameter.title + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.attachExternalBroker(broker);
      }
    });
  }

  attachExternalBroker(broker: any) {
    this.admin.postDataApi('attachExternalBroker', { property_id: this.property.id,
      broker_id: broker.id }).subscribe(r => {
      this.closeExtBrokerModal.nativeElement.click();
      this.property.external_broker = broker;
      swal('Success', 'Assigned successfully.', 'success');
    },
      error => {
        swal('Error', error.error.message, 'error');
      });
  }
}
