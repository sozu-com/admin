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
  allUsers: Array<UserModel>;
  property: any;
  reason: string;
  item: any;
  @ViewChild('modalOpen') modalOpen: ElementRef;
  @ViewChild('modalClose') modalClose: ElementRef;
  @ViewChild('rejectModalOpen') rejectModalOpen: ElementRef;
  @ViewChild('rejectModalClose') rejectModalClose: ElementRef;

  @ViewChild('linkUserModal') linkUserModal: ElementRef;
  @ViewChild('closeLinkUserModal') closeLinkUserModal: ElementRef;
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

  openCancellationModal(item, status) {
    this.item = item;
    this.parameter.status = status;
    this.modalOpen.nativeElement.click();
  }

  closeModal() {
    this.modalClose.nativeElement.click();
  }

  closeReasonModal() {
    this.rejectModalClose.nativeElement.click();
  }

  changeStatus(item, status) {
    item.status = status;
    const input = { property_id: item.id, status_id: status, reason: '' };
    if (this.reason) {
      input.reason = this.reason;
    }
    this.admin.postDataApi('updatePropertyStatus', input).subscribe(r => {
      swal('Success', 'Property status changed', 'success');
      this.closeModal();
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

  showAllSellers(property_id: any, index: number) {
    this.parameter.loading = true;
    this.parameter.index = index;
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

  getAllSellers (property: any, keyword: string, index: number) {
    this.parameter.loading = true;
    if (index) {this.parameter.index = index; }
    if (property) {
      this.parameter.property_id = property.id;
      this.parameter.seller_id = property.selected_seller_id;
    }
    const input = {name: ''};
    input.name = keyword;
    this.admin.postDataApi('getAllSellers', input).subscribe(r => {
      this.parameter.loading = false;
      if (property) {this.linkUserModal.nativeElement.click(); }
      this.allUsers = r['data'];
      // this.selecter_seller = r['selecter_seller'];
    }, error => {
      this.parameter.loading = false;
      swal('Error', error.error.message, 'error');
    });
  }

  linkSellerPopUp(property_id: any, user_id: any, status: number) {
    this.parameter.property_id = property_id;
    this.parameter.user_id = user_id;
    this.parameter.status = status;
    this.parameter.title = this.constant.title.ARE_YOU_SURE;
    const text = status === 1 ? 'accept' : 'reject';
    this.parameter.text = 'You want to ' + text + ' this request?';

    swal({
      html: this.parameter.title + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.changeStatusSellerSelection();
      }
    });
  }

  showRejectSellerRequestModal(property_id: any, user_id: any, status: number) {
    this.parameter.property_id = property_id;
    this.parameter.user_id = user_id;
    this.parameter.status = status;
    this.closeLinkSellerModal.nativeElement.click();
    this.closeLinkUserModal.nativeElement.click();
    this.rejectModalOpen.nativeElement.click();
  }

  changeStatusPopUp(property_id: any, user_id: any, status: number, type: string) {
    this.parameter.property_id = property_id;
    this.parameter.user_id = user_id;
    this.parameter.status = status;
    this.parameter.title = this.constant.title.ARE_YOU_SURE;
    if (type === 'request') {
      const text = status === 1 ? 'accept' : 'reject';
      this.parameter.text = 'You want to ' + text + ' this request?';
    } else {
      const text = status === 1 ? 'link' : 'unlink';
      this.parameter.text = 'You want to ' + text + ' this seller?';
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
        this.changeStatusSellerSelection();
      }
    });
  }

  changeStatusSellerSelection() {
    const input = { property_id: this.parameter.property_id, user_id: this.parameter.user_id, status: this.parameter.status, reason: '' };
    if (this.reason) {
      input.reason = this.reason;
    }
    this.admin.postDataApi('changeStatusSellerSelection', input).subscribe(r => {
      if (this.parameter.status === 1) {
        this.parameter.seller_id = this.parameter.user_id;
        this.items[this.parameter.index].selected_seller_id = this.parameter.user_id;
      }
      // const text = this.parameter.status === 1 ? 'accepted' : 'rejected';
      swal('Success', 'Done successfully.', 'success');
      // accept => then close listing modal
      if (this.parameter.status === 1) {
        this.closeLinkSellerModal.nativeElement.click();
        this.closeLinkUserModal.nativeElement.click();
      }
      // else reason modal
      this.rejectModalClose.nativeElement.click();
    },
      error => {
        swal('Error', error.error.message, 'error');
      });
  }

  changeSoldStatusPopup(property: any, index: number, value: string) {
    console.log(property, index, value);
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
        this.changePropertySoldStatus(property, index, value);
      }
    });
  }

  changePropertySoldStatus(property: any, index: number, value: string) {
    const input = {
      property_id: property.id,
      is_property_sold: 0,
      for_sale: 0,
      for_rent: 0
    };
    if (value === '1') {
      this.items[index].for_sale = 1;
      input.for_sale = 1;
    } else if (value === '2') {
      this.items[index].for_rent = 1;
      input.for_rent = 1;
    } else {
      this.items[index].is_property_sold = 1;
      input.is_property_sold = 1;
    }
    this.admin.postDataApi('changePropertySoldStatus', input).subscribe(r => {
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

  attachExternalBrokerPopUp(broker: any, flag: number) {
    this.parameter.title = this.constant.title.ARE_YOU_SURE;
    const text = flag === 1 ? 'link' : 'unlink';
    this.parameter.text = 'You want to ' + text + ' this agent?';

    swal({
      html: this.parameter.title + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.attachExternalBroker(broker, flag);
      }
    });
  }

  attachExternalBroker(broker: any, flag: number) {
    this.admin.postDataApi('attachExternalBroker', { property_id: this.property.id,
      broker_id: broker.id, flag: flag }).subscribe(r => {
      this.closeExtBrokerModal.nativeElement.click();
      this.property.external_broker = flag === 1 ? broker : null;
      const text = flag === 1 ? 'Linked' : 'Unlinked';
      swal('Success', text + ' successfully.', 'success');
    },
      error => {
        swal('Error', error.error.message, 'error');
      });
  }
}
