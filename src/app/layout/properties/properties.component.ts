import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';
import { UserModel } from 'src/app/models/inhouse-users.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProperty } from 'src/app/common/property';
import { SellerSelections, AddPropertyModel } from 'src/app/models/addProperty.model';
import { Constant } from 'src/app/common/constants';
import { AdminService } from 'src/app/services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from 'src/app/services/property.service';
import { TranslateService } from '@ngx-translate/core';
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
  property_status: string;
  price_sort = 1;
  availability_sort = 1;
  lead_sort = 1;
  keyword: string;
  selecter_seller: SellerSelections;
  selecter_buyer: SellerSelections;
  allSellers: Array<SellerSelections>;
  allExtBrokers: Array<UserModel>;
  allUsers: Array<UserModel>;
  property: any;
  reason: string;
  item: any;
  locale: any;
  floors: Array<any>;
  seller_type: number;
  user_type: string;
  public scrollbarOptions = { axis: 'y', theme: 'dark' };

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
    public admin: AdminService,
    private propertyService: PropertyService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.seller_type = 1;
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
      this.parameter.project_id = params.project_id;
      this.parameter.keyword = params.name;
      if (params.availability_filter) {
        this.parameter.availability_filter = params.availability_filter;
      }
      if (params.type === 'agent') {
        this.parameter.agent_id = params.id;
      } else if (params.type === 'agency') {
        this.parameter.agency_id = params.id;
      }
    });
    this.setFloors();
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.parameter.dash_flag = this.propertyService.dash_flag ? this.propertyService.dash_flag : this.constant.dash_flag;
    this.parameter.flag = 3;
    this.getCountries();
    this.getPropertyConfigurations();
    this.getListing();
  }

  setFloors() {
    var foo = new Array(30);
    this.floors = [];
    for(var i = 0; i < foo.length; i++){
      const obj = {
        id: i,
        name: i == 0 ? this.translate.instant('addForm.groundFloor') : this.translate.instant('addForm.floor') + i
      }
      this.floors.push(obj);
    }
  }

  getListing() {
    this.spinner.show();
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
    if (this.parameter.agent_id) {
      input.agent_id = this.parameter.agent_id;
    } else {
      delete input.agent_id;
    }
    if (this.parameter.agency_id) {
      input.agency_id = this.parameter.agency_id;
    } else {
      delete input.agency_id;
    }
    delete input.seller_id;
    delete input.buyer_id;
    this.admin.postDataApi('propertyHome', input).subscribe(
      success => {
        this.items = success.data;
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
    this.spinner.show();
    this.admin.postDataApi('getLocalityBuildings', this.parameter)
      .subscribe(
        success => {
          this.spinner.hide();
          this.parameter.buildings = success.data;
        }, error => {
          this.spinner.hide();
        });
  }

  setBuilding(building_id) {
    this.parameter.building_id = building_id;
  }

  changeFlag(flag: number) {
    this.parameter.dash_flag = flag;
    this.propertyService.dash_flag = flag;
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

  blockUnblock(item, flag: number) {
    switch (flag) {
      case 0:
        this.parameter.text = this.translate.instant('message.error.wantToUnblockProperty');
        this.parameter.successText = this.translate.instant('message.success.unblockedSuccessfully');
        break;
      case 1:
      this.parameter.text = this.translate.instant('message.error.wantToBlockProperty');
        this.parameter.successText = this.translate.instant('message.success.blockedSuccessfully');
        break;
    }

    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.blockProperty(item, flag);
      }
    });
  }

  blockProperty(item, flag: number) {
    this.admin.postDataApi('blockProperty', { property_id: item.id, flag: flag })
      .subscribe(
        success => {
          swal(this.translate.instant('swal.success'), this.parameter.successText, 'success');
          item.is_blocked = flag;
          // this.items[this.parameter.index] = success.data;
        },
        error => {
          swal(this.translate.instant('swal.error'), error.error.message, 'error');
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
      swal(this.translate.instant('swal.success'), this.translate.instant('message.success.propertyStatusChanged'), 'success');
      this.closeModal();
    },
      error => {
        swal(this.translate.instant('swal.error'), error.error.message, 'error');
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
      const msg = is_featured === 1 ? this.translate.instant('message.success.featuredSuccessfully') :
      this.translate.instant('message.success.unfeaturedSuccessfully');
      swal(this.translate.instant('swal.success'), msg, 'success');
    },
      error => {
        swal(this.translate.instant('swal.error'), error.error.message, 'error');
      });
  }

  showAllSellers(property_id: any, index: any) {
    this.spinner.show();
    if (index !== '') { this.parameter.index = index; }
    this.admin.postDataApi('getSellerSelections', { property_id: property_id }).subscribe(r => {
      this.spinner.hide();
      this.linkSellerModal.nativeElement.click();
      this.allSellers = r['data'];
      this.selecter_seller = r['selecter_seller'];
    }, error => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), error.error.message, 'error');
    });
  }

  getAllSellers(property: any, keyword: string, index, user_type: string, seller_type: number) {
    this.seller_type = seller_type;
    this.user_type = user_type;
    this.spinner.show();
    if (index !== '') { this.parameter.index = index; }
    if (property && user_type == 'seller') {
      delete this.selecter_buyer;
      this.parameter.property_id = property.id;
      this.parameter.seller_id = property.selected_seller_id;
      this.admin.postDataApi('getSellerSelections', { property_id: property.id }).subscribe(r => {
        this.allSellers = r['data'];
        this.selecter_seller = r['selecter_seller'];
      });
    }
    if (property && user_type == 'buyer') {
      delete this.selecter_seller;
      this.parameter.property_id = property.id;
      this.parameter.buyer_id = property.selected_buyer_id;
      this.selecter_buyer = property.selected_buyer;
    }

    const input = { name: '', user_type: 0 };
    input.name = keyword !== '1' ? keyword : '';
    input.user_type = seller_type;

    this.admin.postDataApi('getAllBuyers', input).subscribe(r => {
      this.spinner.hide();
      if (property) { this.linkUserModal.nativeElement.click(); }
      this.allUsers = r['data'];
    }, error => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), error.error.message, 'error');
    });
  }

  linkSellerPopUp(property_id: any, user_id: any, status: number) {
    this.parameter.property_id = property_id;
    this.parameter.user_id = user_id;
    this.parameter.status = status;
    this.parameter.title = this.translate.instant('message.error.areYouSure');
    this.parameter.text = status === 1 ? this.translate.instant('message.error.wantToAccessThisRequest') :
                          this.translate.instant('message.error.wantToRejectThisRequest');
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
    this.changeStatusSellerSelection();
    this.closeLinkSellerModal.nativeElement.click();
    this.closeLinkUserModal.nativeElement.click();
    // this.rejectModalOpen.nativeElement.click();
  }

  changeStatusPopUp(property_id: any, user_id: any, name: string, status: number, type: string) {
    this.parameter.property_id = property_id;
    this.parameter.user_id = user_id;
    this.parameter.fullName = name;
    this.parameter.status = status;
    this.parameter.title = this.translate.instant('message.error.areYouSure');
    if (type === 'request') {
      this.parameter.text = status === 1 ? this.translate.instant('message.error.wantToAccessThisRequest') :
                          this.translate.instant('message.error.wantToRejectThisRequest');
    } else {
      if(this.user_type == 'seller') {
        this.parameter.text = status === 1 ? this.translate.instant('message.error.wantToLinkSeller') :
                            this.translate.instant('message.error.wantToUnLinkSeller');
      } else {
        this.parameter.text = status === 1 ? this.translate.instant('message.error.wantToLinkBuyer') :
        this.translate.instant('message.error.wantToUnLinkBuyer');
      }
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
    const input = {
      type: this.seller_type,
      property_id: this.parameter.property_id,
      user_id: this.parameter.user_id,
      status: this.parameter.status,
      reason: ''
    };
    if (this.reason) {
      input.reason = this.reason;
    }
    const url = this.user_type == 'seller' ? 'changeStatusSellerSelection' : 'changeStatusBuyerSelection';
    this.admin.postDataApi(url, input).subscribe(r => {
      if (this.parameter.status === 1) {
        if (this.user_type == 'seller') {
          this.parameter.seller_id = this.parameter.user_id;
          this.items[this.parameter.index].selected_seller_id = this.parameter.user_id;
          const sel_user = {
            user: {name: ''}
          };
          this.items[this.parameter.index].selected_seller = sel_user;
          this.items[this.parameter.index].selected_seller.user.name = this.parameter.fullName;
        } else {
          this.parameter.buyer_id = this.parameter.user_id;
          this.items[this.parameter.index].selected_buyer_id = this.parameter.user_id;
          const sel_user = {
            user: {name: ''}
          };
          this.items[this.parameter.index].selected_buyer = sel_user;
          this.items[this.parameter.index].selected_buyer.user.name = this.parameter.fullName;
        }
      } else {
        // reject
        if (this.user_type == 'seller') {
          this.items[this.parameter.index].selected_seller_id = null;
          this.items[this.parameter.index].selected_seller = null;
        } else {
          this.items[this.parameter.index].selected_buyer_id = null;
          this.items[this.parameter.index].selected_buyer = null;
        }
      }
      swal(this.translate.instant('swal.success'), this.translate.instant('message.success.doneSuccessfully'), 'success');
      // accept => then close listing modal
      // if (this.parameter.status === 1) {
        this.closeLinkSellerModal.nativeElement.click();
        this.closeLinkUserModal.nativeElement.click();
      // }
      // else reason modal
      this.rejectModalClose.nativeElement.click();
    },
      error => {
        swal(this.translate.instant('swal.error'), error.error.message, 'error');
      });
  }

  changeSoldStatusPopup(property: any, index: number, event) {

    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' + this.translate.instant('message.error.wantToChangeStatus'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.changePropertySoldStatus(property, index, event.target.value);
      } else {
        if (property.for_sale === 1) {
          event.target.value = 1;
        } else if (property.for_rent === 1) {
          event.target.value = 2;
        } else {
          event.target.value = 3;
        }
      }
    });
  }

  changePropertySoldStatus(property: any, index: number, value: string) {
    this.property_status = value;
    this.items[index].for_sale = 0;
    this.items[index].for_rent = 0;
    this.items[index].for_hold = 0;
    const input = {
      property_id: property.id,
      for_hold: 0,
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
      this.items[index].for_hold = 1;
      input.for_hold = 1;
    }
    this.admin.postDataApi('changePropertySoldStatus', input).subscribe(r => {
      swal(this.translate.instant('swal.success'), this.translate.instant('message.success.changedSuccessfully'), 'success');
    },
      error => {
        swal(this.translate.instant('swal.error'), error.error.message, 'error');
      });
  }

  deletePopup(property: any, index: number) {

    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' +
        this.translate.instant('message.error.wantToDeleteProperty'),
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
        swal(this.translate.instant('swal.success'), this.translate.instant('message.success.deletedSuccessfully'), 'success');
        this.items.splice(index, 1);
      },
        error => {
          swal(this.translate.instant('swal.error'), error.error.message, 'error');
        });
  }

  getBothBroker(property: any, keyword: string) {
    this.spinner.show();
    if (property) { this.property = property; }
    const input = { keyword: '' };
    input.keyword = keyword;
    this.admin.postDataApi('getBothBroker', input).subscribe(r => {
      this.spinner.hide();
      if (property) { this.linkExtBrokerModal.nativeElement.click(); }
      this.allExtBrokers = r['data'];
    }, error => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), error.error.message, 'error');
    });
  }

  attachExternalBrokerPopUp(broker: any, flag: number) {

    this.parameter.text = flag === 1 ? this.translate.instant('message.error.wantToLinkAgent') :
    this.translate.instant('message.error.wantToUnLinkAgent');
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' + this.parameter.text,
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
    this.admin.postDataApi('attachExternalBroker', {
      property_id: this.property.id,
      broker_id: broker.id, flag: flag, name: broker.name
    }).subscribe(r => {
      this.closeExtBrokerModal.nativeElement.click();
      this.property.external_broker = flag === 1 ? broker : null;
      const text = flag === 1 ? this.translate.instant('message.success.linkedSuccessfully') :
                    this.translate.instant('message.success.unlinkedSuccessfully');
      swal(this.translate.instant('swal.success'), text, 'success');
    },
      error => {
        swal(this.translate.instant('swal.error'), error.error.message, 'error');
      });
  }

  editPricePopup(item: any, index: number) {
    this.parameter.title = this.translate.instant('message.error.areYouSure');
    swal({
      text: this.translate.instant('message.error.doYouWantToChangeThePrice'),
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        swal({
          text: this.translate.instant('message.error.pleaseEnterNewPropertyPrice'),
          input: 'number',
          showCancelButton: true,
          confirmButtonColor: this.constant.confirmButtonColor,
          cancelButtonColor: this.constant.cancelButtonColor,
          confirmButtonText: 'Update',
          inputValidator: (value) => {
            if (!value) {
              return this.translate.instant('message.error.pleaseEnterNewPrice');
            }
          }
        }).then((r) => {
          if (r.value) {
            this.admin.postDataApi('updatePrice', { id: item.id, price: r.value }).subscribe(success => {
              this.items[index].min_price = r.value;
              swal(this.translate.instant('swal.success'), this.translate.instant('message.success.updatedSuccessfully'), 'success');
            }, error => {
              swal(this.translate.instant('swal.error'), error.error.message, 'error');
            });
          }
        });
      }
    });
  }

  editAgentCommissionPopup(item: any, index: number, isBrokerCommissionEdited: boolean) {
    this.parameter.title = this.translate.instant('message.error.areYouSure');
    swal({
      text: this.translate.instant('message.error.doYouWantToChangeTheCommission'),
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        swal({
          text: this.translate.instant('message.error.pleaseEnterNewCommission') + ' -',
          input: 'number',
          showCancelButton: true,
          confirmButtonColor: this.constant.confirmButtonColor,
          cancelButtonColor: this.constant.cancelButtonColor,
          confirmButtonText: 'Update',
          inputValidator: (value) => {
            if (!value) {
              return this.translate.instant('message.error.pleaseEnterNewCommission');
            }
          }
        }).then((r) => {
          if (r.value) {
            const broker_commision = isBrokerCommissionEdited ? r.value : (item.broker_commision || 0);
            const total_commission = isBrokerCommissionEdited ? (item.total_commission || 0) : r.value;
            const input = {id: item.id, broker_commision: broker_commision, total_commission: total_commission};
            this.admin.postDataApi('updateBrokerCommision', input).subscribe(success => {
              this.items[index].broker_commision = broker_commision;
              this.items[index].total_commission = total_commission;
              swal(this.translate.instant('swal.success'), this.translate.instant('message.success.updatedSuccessfully'), 'success');
            }, error => {
              swal(this.translate.instant('swal.error'), error.error.message, 'error');
            });
          }
        });
      }
    });
  }

  viewPropertyDetails(property_id: string, data: AddPropertyModel) {
    // this.propertyService.property = data;
    this.propertyService.setPropertyData(data);
    this.router.navigate(['/dashboard/properties/details', property_id]);
  }
}
