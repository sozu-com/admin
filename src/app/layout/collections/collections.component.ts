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
import { Notes } from '../../models/leads.model';
import { CommonService } from '../../services/common.service';
declare let swal: any;

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css'],
  providers: [Notes]
})
export class CollectionsComponent implements OnInit {

  public parameter: IProperty = {};
  public location: IProperty = {};
  @ViewChild('docsFile') docsFile: ElementRef;
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
  allSellers: Array<SellerSelections>;
  allExtBrokers: Array<UserModel>;
  allUsers: Array<UserModel>;
  property: any;
  reason: string;
  item: any;
  locale: any;
  property_collection_id: string;
  docFile: string;
  payment_choice_id: number;
  payment_method_id: number;
  description: string;
  typeOfPayment: string;
  collectionIndex: number;
  selectedPaymentConcept: any;
  public scrollbarOptions = { axis: 'y', theme: 'dark' };

  paymentAmount: number;
  paymentConcepts: Array<any>;
  add_collection_commission: any;
  percent: number;
  amount: number;
  selectedCollectionCommission: any;
  paymentMethods: Array<any>;

  @ViewChild('applyPaymentChoiceId') applyPaymentChoiceId: ElementRef;
  @ViewChild('applyPaymentMethodId') applyPaymentMethodId: ElementRef;
  @ViewChild('modalOpen') modalOpen: ElementRef;
  @ViewChild('modalClose') modalClose: ElementRef;
  @ViewChild('rejectModalOpen') rejectModalOpen: ElementRef;
  @ViewChild('rejectModalClose') rejectModalClose: ElementRef;

  @ViewChild('linkUserModal') linkUserModal: ElementRef;
  @ViewChild('closeLinkUserModal') closeLinkUserModal: ElementRef;
  @ViewChild('notesModalOpen') notesModalOpen: ElementRef;
  @ViewChild('notesModalClose') notesModalClose: ElementRef;
  @ViewChild('linkExtBrokerModal') linkExtBrokerModal: ElementRef;
  @ViewChild('closeExtBrokerModal') closeExtBrokerModal: ElementRef;
  @ViewChild('paymentModalOpen') paymentModalOpen: ElementRef;
  @ViewChild('paymentModalClose') paymentModalClose: ElementRef;
  @ViewChild('collectionCommissionOpen') collectionCommissionOpen: ElementRef;
  @ViewChild('collectionCommissionClose') collectionCommissionClose: ElementRef;
  @ViewChild('collectionReceiptOpen') collectionReceiptOpen: ElementRef;
  @ViewChild('collectionReceiptClose') collectionReceiptClose: ElementRef;

  constructor(
    public constant: Constant,
    public admin: AdminService,
    private propertyService: PropertyService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    public model: Notes,
    private cs: CommonService
  ) { }

  ngOnInit() {
    this.parameter.flag = 1;
    this.model = new Notes();
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
      if (params.type === 'agent') {
        this.parameter.agent_id = params.id;
      } else if (params.type === 'agency') {
        this.parameter.agency_id = params.id;
      }
    });
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.parameter.dash_flag = this.propertyService.dash_flag ? this.propertyService.dash_flag : this.constant.dash_flag;
    this.parameter.flag = 3;
    this.getPaymentMethods();
    this.getCountries();
    // this.getPropertyConfigurations();
    this.getListing();
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
    this.admin.postDataApi('getCollection', input).subscribe(
      success => {
        this.items = success.data;
        this.total = success.total_count;
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      });
  }

  getPaymentMethods() {
    this.admin.postDataApi('getPaymentMethods', {})
      .subscribe(
        success => {
          this.paymentMethods = success.data;
        }, error => {
          this.spinner.hide();
        }
      );
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

  changeAppUnappFlag(flag) {
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
      // this.linkSellerModal.nativeElement.click();
      this.allSellers = r['data'];
      this.selecter_seller = r['selecter_seller'];
    }, error => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), error.error.message, 'error');
    });
  }

  getAllSellers(property: any, keyword: string, index) {
    this.spinner.show();
    if (index !== '') { this.parameter.index = index; }
    if (property) {
      this.parameter.property_id = property.id;
      this.parameter.seller_id = property.selected_seller_id;
      this.admin.postDataApi('getSellerSelections', { property_id: property.id }).subscribe(r => {
        this.allSellers = r['data'];
        this.selecter_seller = r['selecter_seller'];
      });
    }
    const input = { name: '' };
    input.name = keyword !== '1' ? keyword : '';

    this.admin.postDataApi('getAllSellers', input).subscribe(r => {
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
    // this.closeLinkSellerModal.nativeElement.click();
    this.closeLinkUserModal.nativeElement.click();
    this.rejectModalOpen.nativeElement.click();
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
      this.parameter.text = status === 1 ? this.translate.instant('message.error.wantToLinkSeller') :
                          this.translate.instant('message.error.wantToUnLinkSeller');
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
        const sel_user = {
          user: {name: ''}
        };
        this.items[this.parameter.index].selected_seller = sel_user;
        this.items[this.parameter.index].selected_seller.user.name = this.parameter.fullName;
      }
      // const text = this.parameter.status === 1 ? 'accepted' : 'rejected';
      swal(this.translate.instant('swal.success'), this.translate.instant('message.success.doneSuccessfully'), 'success');
      // accept => then close listing modal
      if (this.parameter.status === 1) {
        // this.closeLinkSellerModal.nativeElement.click();
        this.closeLinkUserModal.nativeElement.click();
      }
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
      broker_id: broker.id, flag: flag
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

  editAgentCommissionPopup(item: any, index: number) {
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
            this.admin.postDataApi('updateBrokerCommision', { id: item.id, broker_commision: r.value }).subscribe(success => {
              this.items[index].broker_commision = r.value;
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

  getLeadNotes(item) {
    this.property_collection_id = item.id;
    const input = {property_collection_id: item.id};
    // const input = {lead_id: 453, sent_as:1};
    this.admin.postDataApi('getCollectionNote', input).subscribe(r => {
      this.parameter.items = r.data;
      this.notesModalOpen.nativeElement.click();
    });
  }

  closeNotesModal() {
    this.notesModalClose.nativeElement.click();
  }

  
  addNote() {
    if (!this.model.note) {
      return;
    }
    this.spinner.show();
    this.admin.postDataApi('collectionNote', {property_collection_id: this.property_collection_id, note: this.model.note}).subscribe(r => {
      this.spinner.hide();
      this.model = new Notes();
      this.parameter.items.push(r.data);
      swal(this.translate.instant('swal.success'), this.translate.instant('message.success.addedSuccessfully'), 'success');
      this.closeNotesModal();
    });
  }

  deleteLeadPopup(note_id, index) {
    this.parameter.text = this.translate.instant('message.error.wantToDeleteNote');
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Delete!'
    }).then((result) => {
      if (result.value) {
        this.deleteLeadNote(note_id, index);
      }
    });
  }

  deleteLeadNote(note_id, index) {
    this.admin.postDataApi('deleteCollectionNote', {id: note_id}).subscribe(r => {
      this.parameter.items.splice(index, 1);
      swal(this.translate.instant('swal.success'), this.translate.instant('message.success.deletedSuccessfully'), 'success');
    });
  }

  showApplyPaymentPopup(item: any, i: number, type: string) {
    this.typeOfPayment = type;
    this.collectionIndex = i;
    this.paymentConcepts = item.payment_choices;
    this.paymentModalOpen.nativeElement.click();
  }

  setPaymentAmount(item: any) {
    this.paymentAmount = item.amount ? item.amount : 0;
    if (this.typeOfPayment == 'commission-popup') {
      if (item.add_collection_commission == 0) {
        swal('Error', 'Please enable the collection commission checkbox from collection details', 'error');
        this.closeCollReceiptModal();
        return false;
      }
      this.selectedCollectionCommission = item;
    } else {
      this.selectedPaymentConcept = item;
    }
  }

  closePaymentModal() {
    this.paymentModalClose.nativeElement.click();
  }

  applyCollectionPayment(formdata) {
    const input = {
      payment_method_id: this.payment_method_id,
      amount : this.paymentAmount,
      receipt: this.docFile,
      description: this.description
    }
    if (this.typeOfPayment == 'commission-popup') {
      input['collection_commission_id'] = this.selectedCollectionCommission.id;
      input['percent'] = this.selectedCollectionCommission.percent;
    } else {
      input['collection_payment_choice_id'] = this.payment_choice_id['id']
    }
    const url = this.typeOfPayment == 'apply-popup' ? 'applyCollectionPayment' : 'applyCommissionPayment';
    this.admin.postDataApi(url, input).subscribe(r => {
      this.applyPaymentChoiceId.nativeElement.value='';
      if (this.typeOfPayment == 'apply-popup') {
        let paymentChoiceIndex = 0;
        for (let index = 0; index < this.items[this.collectionIndex].payment_choices.length; index++) {
          const element = this.items[this.collectionIndex].payment_choices[index];
          if (element.id == this.selectedPaymentConcept.id) {
            paymentChoiceIndex = index;
          }
        }
        this.items[this.collectionIndex].payment_choices[paymentChoiceIndex]['collection_payment'] = r.data;
      } else {
        let collectionCommIndex = 0;
        for (let index = 0; index < this.items[this.collectionIndex].collection_commission.length; index++) {
          const element = this.items[this.collectionIndex].collection_commission[index];
          if (element.id == this.selectedCollectionCommission.id) {
            collectionCommIndex = index;
          }
        }
        this.items[this.collectionIndex].collection_commission[collectionCommIndex]['payment'] = r.data;
      }

      swal(this.translate.instant('swal.success'), this.translate.instant('message.success.savedSuccessfully'), 'success');
      this.paymentAmount = 0; this.docFile = ''; this.description = '';
      this.docsFile.nativeElement.value = '';
      this.applyPaymentChoiceId.nativeElement.value = '';
      this.applyPaymentMethodId.nativeElement.value = '';
      this.paymentModalClose.nativeElement.click();
      this.closeCollReceiptModal();
    });
  }
  
  onSelectFile(files) {
    this.parameter.loading = true;
    this.cs.saveAttachment(files[0]).subscribe(
      success => {
        this.parameter.loading = false;
        this.docFile = success['data'].name;
      }, error => {
        this.parameter.loading = false;
      }
    );
  }

  showCollectionCommissions(item: any, i: number) {
    this.collectionIndex = i;
    this.paymentConcepts = item.payment_choices;
    item.payment_choices.forEach(element => {
      if (element.collection_payment && element.collection_payment.collection_commission
        && element.collection_payment.collection_commission == null) {
        if (element.collection_payment && element.collection_payment.collection_commission) {
          element.collection_payment['collection_commission'] = {
            add_collection_commission: 0,
            percent: 0,
            amount: 0
          }
        } else {
          element['collection_payment'] = {
            collection_commission: {
              add_collection_commission: 0,
              percent: 0, amount: 0
            }
          }
        }
      }
    });
    this.collectionCommissionOpen.nativeElement.click();
  }

  showCollectionCommReceipt(item: any, i: number, type: string) {
    // if (!paymentConcepts[i].collection_payment.collection_commission) {
    //   swal('Error', 'Please fill the details before uploading receipt.', 'error');
    //   return false;
    // }
    this.paymentConcepts = item.collection_commissions;
    this.collectionCommissionClose.nativeElement.click();
    this.typeOfPayment = type;
    // this.collectionIndex = i;
    // this.paymentConcepts = paymentConcepts;
    this.collectionReceiptOpen.nativeElement.click();
  }

  saveCollectionCommAmount(p: any) {
    if (!p.collection_payment) {
      swal('Error', 'Payment not received.', 'error');
      return false;
    }
    if (!p.collection_payment.collection_commission.amount) {
      swal('Error', 'Add collection commission amount.', 'error');
      return false;
    }
    // if (!p.collection_payment.collection_commission.add_collection_commission) {
    //   swal('Error', 'Click on collection commission checkbox.', 'error');
    //   return false;
    // }
    const input = {
      collection_payment_id: p.collection_payment.id,
      add_collection_commission: 1, //this.add_collection_commission,
      percent : this.percent,
      amount : this.amount
      // receipt: this.docFile,
      // description: this.description
    }
    this.admin.postDataApi('applyCollectionPaymentCommission', input).subscribe(r => {
      swal(this.translate.instant('swal.success'), this.translate.instant('message.success.savedSuccessfully'), 'success');
      // this.paymentAmount = 0; this.docFile = ''; this.description = '';
      // this.docsFile.nativeElement.value = '';
      // this.paymentModalClose.nativeElement.click();
    });
  }

  getAmount(index: number, percent: number) {
    const amount = this.items[this.collectionIndex].payment_choices[index].collection_payment.amount;
    const collection_commission = {
      amount: Math.round((percent * amount) / 100),
      percent: percent
    }
    this.items[this.collectionIndex].payment_choices[index].collection_payment.collection_commission = collection_commission;
  }

  getPercentage(index: number, amount: number) {
    const Famount = this.items[this.collectionIndex].payment_choices[index].collection_payment.amount;
    const collection_commission = {
      percent: Math.round((amount * 100) / Famount),
      amount: amount
    }
    this.items[this.collectionIndex].payment_choices[index].collection_payment.collection_commission = collection_commission;
  }

  closeCollReceiptModal() {
    this.applyPaymentChoiceId.nativeElement.value = '';
    this.applyPaymentMethodId.nativeElement.value = '';
    this.collectionReceiptClose.nativeElement.click();
  }

  closeCollCommissionModal() {
    this.collectionCommissionClose.nativeElement.click();
  }
}
