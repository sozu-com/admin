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
import { NgForm } from '@angular/forms';
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

  currentAmount: number;
  paymentAmount: number;
  paymentConcepts: Array<any>;
  add_collection_commission: any;
  percent: number;
  amount: number;
  selectedCollectionCommission: any;
  paymentMethods: Array<any>;
  pendingPayment: number;
  penaltyAmount: number;
  paymentDate: Date;
  commission_type: any;
  today: Date;
  selectedItem: any;

  @ViewChild('applyPaymentChoiceId') applyPaymentChoiceId: ElementRef;
  @ViewChild('applyPaymentMethodId') applyPaymentMethodId: ElementRef;
  @ViewChild('applyPaymentChoiceId1') applyPaymentChoiceId1: ElementRef;
  @ViewChild('applyPaymentChoiceId2') applyPaymentChoiceId2: ElementRef;
  @ViewChild('applyPaymentMethodId1') applyPaymentMethodId1: ElementRef;
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
  @ViewChild('viewCollectionOpen') viewCollectionOpen: ElementRef;
  @ViewChild('viewCollectionClose') viewCollectionClose: ElementRef;
  @ViewChild('collectionReceiptOpen') collectionReceiptOpen: ElementRef;
  @ViewChild('collectionReceiptClose') collectionReceiptClose: ElementRef;
  @ViewChild('penaltyModalOpen') penaltyModalOpen: ElementRef;
  @ViewChild('penaltyModalClose') penaltyModalClose: ElementRef;
  @ViewChild('collectionTypeSelect') collectionTypeSelect: ElementRef;
  @ViewChild('docsFile1') docsFile1: ElementRef;
  @ViewChild('docsFile2') docsFile2: ElementRef;

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
    this.today = new Date();
    this.commission_type = '';
    this.parameter.flag = 1;
    this.model = new Notes();
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
    this.getPaymentMethods();
    this.getCountries();
    // this.getPropertyConfigurations();
    this.initCalendarLocale();
    this.getListing();
  }
  initCalendarLocale() {
    if (this.translate.defaultLang == 'en') {
      this.locale = {
        firstDayOfWeek: 0,
        dayNames: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        dayNamesShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        dayNamesMin: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
          'November', 'December'],
        monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        today: 'Today',
        clear: 'Clear',
        dateFormat: 'mm/dd/yy',
        weekHeader: 'Wk'
      }
    } else {
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
        weekHeader: 'Sm'
      };
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
    input.is_approved = this.parameter.flag;
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
        this.parameter.text = this.translate.instant('message.error.wantToUnblockCollection');
        this.parameter.successText = this.translate.instant('message.success.unblockedSuccessfully');
        break;
      case 1:
      this.parameter.text = this.translate.instant('message.error.wantToBlockCollection');
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

  changeStatus(item: any, status: number) {
    item.is_approved = status;
    const input = { id: item.id, is_approved: status };
    this.admin.postDataApi('approveCollection', input).subscribe(r => {
      swal(this.translate.instant('swal.success'), this.translate.instant('message.success.collectionStatusChanged'), 'success');
      // this.closeModal();
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

  deletePopup(item: any, index: number) {

    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' +
        this.translate.instant('message.error.wantToDeleteCollection'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.deleteCollection(item, index);
      }
    });
  }

  deleteCollection(item: any, index: number) {
    this.admin.postDataApi('deleteCollection',
      { id: item.id }).subscribe(r => {
        swal(this.translate.instant('swal.success'), this.translate.instant('message.success.deletedSuccessfully'), 'success');
        this.items.splice(index, 1);
      },
        error => {
          swal(this.translate.instant('swal.error'), error.error.message, 'error');
        });
  }


  viewPropertyDetails(property_id: string, data: AddPropertyModel) {
    // this.propertyService.property = data;
    this.propertyService.setPropertyData(data);
    this.router.navigate(['/dashboard/properties/details', property_id]);
  }

  getNotes(item) {
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
    // this.paymentAmount = item.amount ? item.amount : 0;
    if (this.typeOfPayment == 'commission-popup') {
      if (this.commission_type == 1 && item.add_purchase_commission == 0) {
        swal('Error', 'Please enable the purchase commission checkbox from collection details', 'error');
        this.closeCollReceiptModal();
        return false;
      }
      if (this.commission_type == 2 && item.add_collection_commission == 0) {
        swal('Error', 'Please enable the collection commission checkbox from collection details', 'error');
        this.closeCollReceiptModal();
        return false;
      }
      this.paymentAmount = item.amount ? item.amount : 0;
      this.selectedCollectionCommission = item;
    } else {
      this.selectedPaymentConcept = item;
      let amt = 0; let penaltyamt = 0;
      let amtPaid = 0;
      let currentAmt = 0;
      let currentAmtPaid = 0;
      for (let index = 0; index < this.paymentConcepts.length; index++) {        
        const r = this.paymentConcepts[index];
        currentAmt = r['amount']; currentAmtPaid = r['collection_payment'] ? r['collection_payment']['amount'] : 0;
        // console.log(r['name'])
        if (r['id'] != item['id']) {
          penaltyamt = r['penalty'] ? r['penalty']['amount'] : 0;
          amt = amt + r['amount'] + penaltyamt;
          amtPaid = amtPaid + currentAmtPaid;
        } else {
          break;
        }
      }
      this.penaltyAmount = item.penalty ? item.penalty.amount : 0;
      this.pendingPayment = amt - amtPaid;
      this.currentAmount = currentAmt;
      this.paymentAmount = (currentAmt + this.pendingPayment + this.penaltyAmount);
      // console.log(this.penaltyAmount, this.pendingPayment, this.currentAmount, this.paymentAmount)
    }
  }

  closePaymentModal() {
    this.paymentModalClose.nativeElement.click();
  }

  onSelect(e) {
// console.log(e);
    this.paymentDate = moment.utc(e).toDate();
    // console.log(this.paymentDate)
  }

  applyCollectionPayment(formdata: NgForm) {
    if (!this.paymentDate) {
      swal('Error', 'Please select payment date', 'error');
      return false;
    }
    if (!this.docFile) {
      swal('Error', 'Please choose receipt', 'error');
      return false;
    }
    const input = {
      payment_method_id: this.payment_method_id,
      amount : this.paymentAmount,
      receipt: this.docFile,
      description: this.description,
      payment_date: this.paymentDate
    }
    if (this.typeOfPayment == 'commission-popup') {
      input['commission_type'] = this.commission_type;
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
        this.items[this.collectionIndex].last_payment = {
          name: this.items[this.collectionIndex].payment_choices[paymentChoiceIndex].name, 
          payment_date: r.data.payment_date,
          amount: r.data.amount
        }
        this.items[this.collectionIndex].next_payment = {
          name: this.items[this.collectionIndex].payment_choices[paymentChoiceIndex+1].name, 
          date: this.items[this.collectionIndex].payment_choices[paymentChoiceIndex+1].date,
          amount: this.items[this.collectionIndex].payment_choices[paymentChoiceIndex+1].amount
        }
        this.items[this.collectionIndex].payment_choices[paymentChoiceIndex]['collection_payment'] = r.data;
      } else {
        let collectionCommIndex = 0;
        // console.log(this.collectionIndex);
        // console.log(this.items[this.collectionIndex]);
        // console.log(this.items[this.collectionIndex].collection_commissions);
        for (let index = 0; index < this.items[this.collectionIndex].collection_commissions.length; index++) {
          // console.log(this.items[this.collectionIndex]);
          const element = this.items[this.collectionIndex].collection_commissions[index];
          if (element.id == this.selectedCollectionCommission.id) {
            collectionCommIndex = index;
          }
        }
        this.items[this.collectionIndex].collection_commissions[collectionCommIndex]['payment'] = r.data;
      }

      this.paymentAmount = 0; this.docFile = ''; this.description = '';
      this.penaltyAmount = 0; this.pendingPayment = 0; this.currentAmount = 0;
      if (this.typeOfPayment == 'apply-popup') {
        this.docsFile1.nativeElement.value = '';
      } else {
        this.docsFile2.nativeElement.value = '';
      }
      this.applyPaymentChoiceId.nativeElement.value = '';
      this.applyPaymentMethodId.nativeElement.value = '';
      this.paymentModalClose.nativeElement.click();
      this.closeCollReceiptModal();
      swal(this.translate.instant('swal.success'), this.translate.instant('message.success.savedSuccessfully'), 'success');
     
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

  setCommissionType(type: any) {
    this.paymentConcepts = [];
    for (let index = 0; index < this.selectedItem.collection_commissions.length; index++) {
      const element = this.selectedItem.collection_commissions[index];
      element['payment_made'] = 0;
      if (this.selectedItem.payment_choices[index] && this.selectedItem.payment_choices[index].collection_payment) {
        element['payment_made'] = 1;
      }
      if (type == 1) {
        if (element.add_purchase_commission == 1) {
          this.paymentConcepts.push(element);
        }
      } else {
        if (element.add_collection_commission == 1) {
          this.paymentConcepts.push(element);
        }
      }
    }

    // if (type == 1) {
    //   for (let index = 0; index < this.selectedItem.collection_commissions.length; index++) {
    //     const element = this.selectedItem.collection_commissions[index];
    //     if (this.selectedItem.payment_choices[index] && this.selectedItem.payment_choices[index].collection_payment) {
    //       element['payment_made'] = 1;
    //     }
    //     if () {
    //       if (element.add_purchase_commission == 1) {
    //         this.paymentConcepts.push(element);
    //       } else {
            
    //       }
    //     }
    //   }
    // } else {
    //   for (let index = 0; index < this.selectedItem.collection_commissions.length; index++) {
    //     const element = this.selectedItem.collection_commissions[index];
    //     if (this.selectedItem.payment_choices[index] && this.selectedItem.payment_choices[index].collection_payment) {
    //       element['payment_made'] = 1;
    //     }
    //     if (element.add_collection_commission == 1) {
    //       this.paymentConcepts.push(element);
    //     }
    //   }
    // }
  }

  showCollectionCommReceipt(item: any, i: number, type: string) {
    // if (!paymentConcepts[i].collection_payment.collection_commission) {
    //   swal('Error', 'Please fill the details before uploading receipt.', 'error');
    //   return false;
    // }
    this.selectedItem = item;
    this.collectionIndex = i;
    this.paymentConcepts = item.collection_commissions;
    this.viewCollectionClose.nativeElement.click();
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
    this.paymentAmount = 0; this.docFile = ''; this.description = '';
    this.penaltyAmount = 0; this.pendingPayment = 0; this.currentAmount = 0;
    // this.docsFile.nativeElement.value = '';
    if (this.commission_type == 1) {
      this.collectionTypeSelect.nativeElement.value = '';
      this.applyPaymentMethodId1.nativeElement.value = '';
      this.applyPaymentChoiceId1.nativeElement.value = '';
    } else if (this.commission_type == 2)  {
      this.collectionTypeSelect.nativeElement.value = '';
      this.applyPaymentMethodId1.nativeElement.value = '';
      this.applyPaymentChoiceId2.nativeElement.value = ''
    }
    this.commission_type = ''
    this.collectionReceiptClose.nativeElement.click();
  }

  closeCollCommissionModal() {
    this.viewCollectionClose.nativeElement.click();
  }

  showPenaltyPaymentPopup(item: any, i: number, type: string) {
    this.typeOfPayment = type;
    this.collectionIndex = i;
    this.paymentConcepts = item.payment_choices;
    this.penaltyModalOpen.nativeElement.click();
  }
  
  closePenaltyPaymentPopup() {
    this.penaltyModalClose.nativeElement.click();
  }

  applyCollectionPenalty(formdata) {
    if (!formdata.payment_choice.id && !formdata.paymentAmount)
    return false;
    const input = {
      collection_payment_choice_id: formdata.payment_choice.id,
      amount : formdata.paymentAmount,
      description: formdata.description ? formdata.description : ''
    }
    this.admin.postDataApi('applyCollectionPenalty', input).subscribe(r => {
      // formdata.reset();
      let paymentChoiceIndex = 0;
      for (let index = 0; index < this.items[this.collectionIndex].payment_choices.length; index++) {
        const element = this.items[this.collectionIndex].payment_choices[index];
        if (element.id == formdata.payment_choice.id) {
          paymentChoiceIndex = index;
        }
      }
      this.items[this.collectionIndex].payment_choices[paymentChoiceIndex]['penalty'] = r.data;
      this.payment_choice_id = 0; this.paymentAmount = 0; this.description = '';
      this.closePenaltyPaymentPopup();
      swal(this.translate.instant('swal.success'), this.translate.instant('message.success.savedSuccessfully'), 'success');
    });
  }

  
  quickCollectionView(item: any, i: number) {
    // redirecting
    this.router.navigate(['/dashboard/collections/quick-visualization', item.id])

    // showing here
    // this.collectionIndex = i;
    // this.paymentConcepts = item.payment_choices;
    // item.payment_choices.forEach(element => {
    //   if (element.collection_payment && element.collection_payment.collection_commission
    //     && element.collection_payment.collection_commission == null) {
    //     if (element.collection_payment && element.collection_payment.collection_commission) {
    //       element.collection_payment['collection_commission'] = {
    //         add_collection_commission: 0,
    //         percent: 0,
    //         amount: 0
    //       }
    //     } else {
    //       element['collection_payment'] = {
    //         collection_commission: {
    //           add_collection_commission: 0,
    //           percent: 0, amount: 0
    //         }
    //       }
    //     }
    //   }
    // });
    // this.viewCollectionOpen.nativeElement.click();
  }

}
