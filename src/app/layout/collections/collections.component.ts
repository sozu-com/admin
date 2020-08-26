import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';
import { UserModel } from 'src/app/models/inhouse-users.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProperty } from 'src/app/common/property';
import { SellerSelections } from 'src/app/models/addProperty.model';
import { Constant } from 'src/app/common/constants';
import { AdminService } from 'src/app/services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from 'src/app/services/property.service';
import { TranslateService } from '@ngx-translate/core';
import { Notes } from '../../models/leads.model';
import { CommonService } from '../../services/common.service';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
  payment_date: any = new Date();
  collection_commission_id: number;
  payment_choice_id: any;
  surplus_payment_choice_id: any;
  payment_method_id: number;
  description: string;
  typeOfPayment: string;
  collectionIndex: number;
  last_payment_id: string;
  selectedPaymentConcept: any;
  public scrollbarOptions = { axis: 'y', theme: 'dark' };

  currentAmount: any;
  penaltyPercent: number;
  paymentAmount: any;
  paymentConcepts: Array<any>;
  add_collection_commission: any;
  percent: number;
  amount: number;
  selectedCollectionCommission: any;
  payment_type: any;
  payment_id: any;
  surplus_payment_type: string;
  paymentMethods: Array<any>;
  pendingPayment: any;
  penaltyAmount: any;
  paymentDate: Date;
  calculatedPayAmount: any;
  commission_type: any;
  today: Date;
  selectedItem: any;
  collectionCommission: any;
  penaltyForm: FormGroup;
  showError: boolean;
  surplus_amt: any;
  disablePayToRemaining: boolean = true;
  isApplyBtnClicked: boolean = false;
  title: any;

  @ViewChild('viewDesModal') viewDesModal: ElementRef;
  @ViewChild('viewDesModalClose') viewDesModalClose: ElementRef;
  @ViewChild('applyPaymentChoiceId') applyPaymentChoiceId: ElementRef;
  @ViewChild('applyPaymentMethodId') applyPaymentMethodId: ElementRef;
  @ViewChild('applyPaymentChoiceId1') applyPaymentChoiceId1: ElementRef;
  @ViewChild('applyPaymentChoiceId2') applyPaymentChoiceId2: ElementRef;
  @ViewChild('applyPaymentMethodId1') applyPaymentMethodId1: ElementRef;
  @ViewChild('modalOpen') modalOpen: ElementRef;
  @ViewChild('modalClose') modalClose: ElementRef;
  @ViewChild('notesModalOpen') notesModalOpen: ElementRef;
  @ViewChild('notesModalClose') notesModalClose: ElementRef;
  @ViewChild('paymentModalOpen') paymentModalOpen: ElementRef;
  @ViewChild('paymentModalClose') paymentModalClose: ElementRef;
  @ViewChild('editPaymentModalOpen') editPaymentModalOpen: ElementRef;
  @ViewChild('editPaymentModalClose') editPaymentModalClose: ElementRef;
  @ViewChild('updatePaymentModalOpen') updatePaymentModalOpen: ElementRef;
  @ViewChild('updatePaymentModalClose') updatePaymentModalClose: ElementRef;
  @ViewChild('viewCollectionClose') viewCollectionClose: ElementRef;
  @ViewChild('collectionReceiptOpen') collectionReceiptOpen: ElementRef;
  @ViewChild('collectionReceiptClose') collectionReceiptClose: ElementRef;
  @ViewChild('editCollectionReceiptOpen') editCollectionReceiptOpen: ElementRef;
  @ViewChild('editCollectionReceiptClose') editCollectionReceiptClose: ElementRef;
  @ViewChild('penaltyModalOpen') penaltyModalOpen: ElementRef;
  @ViewChild('penaltyModalClose') penaltyModalClose: ElementRef;
  @ViewChild('collectionTypeSelect') collectionTypeSelect: ElementRef;
  @ViewChild('surplusMoneyModalOpen') surplusMoneyModalOpen: ElementRef;
  @ViewChild('surplusMoneyModalClose') surplusMoneyModalClose: ElementRef;
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
    private cs: CommonService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.showError = false;
    this.today = new Date();
    this.commission_type = '';
    this.parameter.flag = 1;
    this.model = new Notes();
    this.initPenaltyForm();
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.parameter.dash_flag = this.propertyService.dash_flag ? this.propertyService.dash_flag : this.constant.dash_flag;
    this.getPaymentMethods();
    this.getCountries();
    this.initCalendarLocale();
    
    this.route.params.subscribe(params => {
      if (params['id']){
        this.parameter.collection_id = params['id'];
        this.parameter.dash_flag = 4;
      }
    });
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
        weekHeader: 'Wk',
        dataType: 'string'
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
        weekHeader: 'Sm',
        dataType: 'string'
      };
    }
  }

  initPenaltyForm() {
    this.penaltyForm = this.fb.group({
      id: [''],
      collection_payment_choice_id: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      description: [''],
      percent: ['', Validators.required],
      payment_concept_amt: ['', Validators.required]
    });
  }

  get getPenaltyControls() {
    return this.penaltyForm.controls;
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

        // fetching payment status
        for (let index = 0; index < this.items.length; index++) {
          const element = this.items[index];
          if (element.next_payment && element.next_payment.date) {
            const date1 = moment();
            const date2 = moment(element.next_payment.date);
            const diff = date1.diff(date2, 'days');
            console.log(diff)
            if (diff>=0 && diff<5) {
              element.payment_status = 2;
            } else if (diff>=5) {
              element.payment_status = 3;
            } else if (diff<0) {
              element.payment_status = 1;
            } 
          } else {
            element.payment_status = 5;
          }
        }

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

  openCancellationModal(item, status) {
    this.item = item;
    this.parameter.status = status;
    this.modalOpen.nativeElement.click();
  }

  closeModal() {
    this.modalClose.nativeElement.click();
  }

  changeStatus(item: any, status: number) {
    item.is_approved = status;
    const input = { id: item.id, is_approved: status };
    this.admin.postDataApi('approveCollection', input).subscribe(r => {
      this.toastr.clear();
      this.toastr.success(this.translate.instant('message.success.collectionStatusChanged'), this.translate.instant('swal.success'));
    },
      error => {
      this.toastr.clear();
      this.toastr.error(error.error.message, this.translate.instant('swal.error'));
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
    this.admin.postDataApi('deleteCollection', { id: item.id }).subscribe(r => {
        this.toastr.success(this.translate.instant('message.success.deletedSuccessfully'), this.translate.instant('swal.success'));
        this.items.splice(index, 1);
      },
      error => {
        this.toastr.error(error.error.message, this.translate.instant('swal.error'));
      });
  }

  cancelPopup(item: any, index: number, status: number) {
    const t = status == 1 ? this.translate.instant('message.error.wantToCancelCollection') : this.translate.instant('message.error.wantToActiveCollection');
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' + t,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.cancelPropertyCollections(item, index, status);
      }
    });
  }

  cancelPropertyCollections(item: any, index: number, status: number) {
    this.admin.postDataApi('cancelPropertyCollections', { property_collection_id: item.id, status: status }).subscribe(r => {
      const t = status == 1 ? this.translate.instant('message.success.cancelledSuccessfully') : this.translate.instant('message.success.activedSuccessfully');
      this.toastr.success(t, this.translate.instant('swal.success'));
        this.items[index].is_cancelled = status;
      },
      error => {
        this.toastr.error(error.error.message, this.translate.instant('swal.error'));
      });
  }

  getNotes(item) {
    this.property_collection_id = item.id;
    const input = {property_collection_id: item.id};
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
      
      this.toastr.clear();
      this.toastr.success(this.translate.instant('message.success.addedSuccessfully'), this.translate.instant('swal.success'));
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
      this.toastr.clear();
      this.toastr.success(this.translate.instant('message.success.deletedSuccessfully'), this.translate.instant('swal.success'));
    });
  }

  showEditPaymentPopup(item: any, i: number) {
    this.paymentConcepts = [];
    this.property_collection_id = item.id;
    this.collectionIndex = i;
    // adding purchase and collection commission in payment concept
    if (item.collection_commissions && item.collection_commissions.length > 0) {
      for (let index = 0; index < item.collection_commissions.length; index++) {
        const element = item.collection_commissions[index];
        if (item.payment_choices[index]) {
          item.payment_choices[index]['commission'] = element;
        }
      }
    }
    this.paymentConcepts = [...item.payment_choices];
    // this.last_payment_id = item.last_payment ? item.last_payment.collection_payment_id : '';
    this.last_payment_id = item.last_payment ? item.last_payment.parent_id : '';
    this.getCollectionDetails()
    this.editPaymentModalOpen.nativeElement.click();
  }

  
  showUpdatePaymentPopup(item: any, i: number) {
    this.payment_id = item.id;
    this.payment_type = item.payment_type;
    this.payment_method_id = item.payment_method.id;
    this.description = item.description;
    this.docFile = item.receipt;
    this.payment_date = item.payment_date ? this.getDateWRTTimezone(item.payment_date, 'DD/MMM/YYYY') : '';
    this.closeEditPaymentModal();
    this.updatePaymentModalOpen.nativeElement.click();
  }

  closeUpdatePaymentModal() {
    this.updatePaymentModalClose.nativeElement.click();
  }


  updateCollectionPayment(formdata: NgForm) {
    // checking if date selected and receipt selected
    if (!this.payment_date) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseSelectPaymentDate'), this.translate.instant('swal.error'));
      return false;
    }
    if (!this.docFile) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseChooseReceipt'), this.translate.instant('swal.error'));
      return false;
    }

    var offset = new Date(this.payment_date).getTimezoneOffset();
    if (offset < 0) {
      this.payment_date = moment(this.payment_date).subtract(offset, 'minutes').toDate();
    } else {
      this.payment_date = moment(this.payment_date).add(offset, 'minutes').toDate();
    }

    // inpur params
    const input = {
      payment_id: this.payment_id,
      payment_method_id: this.payment_method_id,
      receipt: this.docFile,
      description: this.description,
      payment_date: this.payment_date
    }

    this.admin.postDataApi('updateCollectionPayment', input).subscribe(r => {
      this.router.navigate(['/dashboard/collections/quick-visualization', this.property_collection_id]);
      this.closeUpdatePaymentModal();
      this.toastr.clear();
      this.toastr.success(this.translate.instant('message.success.savedSuccessfully'), this.translate.instant('swal.success'));
    }, error => {
      this.toastr.error(error.message, this.translate.instant('swal.error'));
      return false;
    });
  }

  getCollectionDetails() {
    let reducingP = [];
    for (let index = 0; index < this.paymentConcepts.length; index++) {
      const m = this.paymentConcepts[index];
      m.payment_date = m.collection_payment>0 ? this.getDateWRTTimezone(m.collection_payment.payment_date, 'YYYY-MM-DD') : '';
      m.paid_amount = m.calc_payment_amount ? m.calc_payment_amount : 0;

      // if type=2 means reducing payment => add one more row
      if (m.collection_paymentss && m.collection_paymentss.length>0) {
        for (let i = 0; i < m.collection_paymentss.length; i++) {
          const paymnts = m.collection_paymentss[i];
          if (paymnts.payment_type == 2) {
            const c = {
              key: 'remaining_amt',
              name: 'Payment to remaining (Reduce Amount)',
              paid_amount: paymnts.amount,
              is_paid_calculated: 0,
              outstanding_amount: 0,
              index: index+i,
              payment_type: 2,  // in real its 2
              receipt: paymnts.receipt,
              description: paymnts.description
            };
            c['collection_paymentss'] = [{
              id: paymnts.id,
              parent_id: paymnts.parent_id,
              payment_type: 1,  // in real its 2
              paid_amount: paymnts.amount,
              amount: paymnts.amount,
              payment_date:  this.getDateWRTTimezone(paymnts.payment_date, 'YYYY-MM-DD'),
              receipt: paymnts.receipt,
              description: paymnts.description,
              payment_method: paymnts.payment_method
            }]
            reducingP.push(c);     
          }
          else if (paymnts.payment_type == 3 && paymnts.display_choice_id) {
            const c = {
              key: 'remaining_amt',
              name: 'Payment to remaining (Reduce Time)',
              paid_amount: paymnts.full_amount,
              is_paid_calculated: 0,
              outstanding_amount: 0,
              index: index+i,
              payment_type: 3,  // in real its 3
              receipt: paymnts.receipt,
              description: paymnts.description,
              display_choice_id: paymnts.display_choice_id
            };
            c['collection_paymentss'] = [{
              id: paymnts.id,
              parent_id: paymnts.parent_id,
              payment_type: 3,  // in real its 3
              paid_amount: paymnts.full_amount,
              amount: paymnts.full_amount,
              payment_date:  this.getDateWRTTimezone(paymnts.payment_date, 'YYYY-MM-DD'),
              receipt: paymnts.receipt,
              description: paymnts.description,
              payment_method: paymnts.payment_method
            }]
            reducingP.push(c);     
          }
          else if (paymnts.payment_type == 5 && paymnts.display_choice_id) {
            const c = {
              key: 'remaining_amt',
              name: 'Total Payment',
              paid_amount: paymnts.full_amount,
              is_paid_calculated: 0,
              outstanding_amount: 0,
              index: index+i,
              payment_type: 5,  // in real its 5
              receipt: paymnts.receipt,
              description: paymnts.description,
              display_choice_id: paymnts.display_choice_id
            };
            c['collection_paymentss'] = [{
              id: paymnts.id,
              parent_id: paymnts.parent_id,
              payment_type: 5,  // in real its 5
              paid_amount: paymnts.full_amount,
              amount: paymnts.full_amount,
              payment_date:  this.getDateWRTTimezone(paymnts.payment_date, 'YYYY-MM-DD'),
              receipt: paymnts.receipt,
              description: paymnts.description,
              payment_method: paymnts.payment_method
            }]
            reducingP.push(c);     
          }
        }
      }

      m['outstanding_amount'] = m.amount - (m.calc_payment_amount || 0);
      if ((m.amount - (m.calc_payment_amount||0))>=0) {
        const a = (m.calc_payment_amount || 0);
        m['is_pending'] = a ? 1 : 0;
      }
    }
    // now insert at reducing remaining payments at type=2 index
    // reducingP = reducingP.reverse();
    // for (let i = 0; i < reducingP.length; i++) {
    //   const element = reducingP[i];
    //   this.paymentConcepts.splice(element.index, 0, element);              
    // }

    for (let i = 0; i < reducingP.length; i++) {
      const element = reducingP[i];
      const newIndex = element.index; 
      if (element.payment_type == 2) {
        this.paymentConcepts.splice(newIndex, 0, element);    
      } else {
        // for payment_type 3,5 check display_choice_id
        let index = this.paymentConcepts.length - 1;
        for ( index ; index >= 0; index--) {
        // for (let index = 0; index < this.paymentConcepts.length; index++) {
          const e = this.paymentConcepts[index];
          if (e.id==element.display_choice_id) {
            this.paymentConcepts.splice(index, 0, element); 
            break;   
          }
        }
      }
    }

    // calculating new paid amt, by skipping type 2
    for (let index = 0; index < this.paymentConcepts.length; index++) {
      const element = this.paymentConcepts[index];
      let p_amt: any = 0;
      let extraAmt: any = 0;
      if (element.collection_paymentss && element.collection_paymentss.length>0) {
        for (let i = 0; i < element.collection_paymentss.length; i++) {
          const ele = element.collection_paymentss[i];
          if (ele.payment_type == 2) {
            let v = ele.amt_share || 0;
            const ids = ele.choices_ids.split(',');
            for (let j = 0; j < this.paymentConcepts.length; j++) {
              const e = this.paymentConcepts[j];
              if (e.id) {
                const d = e.id.toString();
                const h = ids.indexOf(d)
                if (h>=0) {
                  const obj = {
                    id: ele.id,
                    amount: v,
                    name: 'Payment to remaining (Reduce Amount)',
                    payment_type: 1,  // in real its 3
                    paid_amount: v,
                    payment_date:  this.getDateWRTTimezone(ele.payment_date, 'YYYY-MM-DD'),
                    receipt: ele.receipt,
                    description: ele.description,
                    payment_method: ele.payment_method
                  }
                  this.paymentConcepts[j].paid_amount = parseFloat(this.paymentConcepts[j].paid_amount) - parseFloat(v);
                }
              }
            }
          }
        }
      }
    }
  }

  deletePayment(payment_id: string, mainIndex: number, index: number){
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' +
        this.translate.instant('message.error.wantToDeletePayment'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        // this.admin.postDataApi('deleteCollectionPayment', {payment_id: payment_id})
        this.admin.postDataApi('deletePayment', {parent_id: payment_id})
          .subscribe(
            success => {
            // this.paymentConcepts[mainIndex].collection_paymentss.splice(index, 1);
              this.router.navigate(['/dashboard/collections/quick-visualization', this.property_collection_id]);
              this.closeEditPaymentModal();
              this.toastr.clear();
              this.toastr.success(this.translate.instant('message.success.deletedSuccessfully'), this.translate.instant('swal.success'));
            },
            error => {
              this.toastr.error(error.error.message, this.translate.instant('swal.error'));
            });
      }
    });
  }

  showApplyPaymentPopup(item: any, i: number, type: string) {
    this.paymentConcepts = [];
    this.surplus_payment_type = null;
    this.payment_type = null;
    this.paymentDate = null;
    this.payment_choice_id = null;
    this.property_collection_id = item.id;
    this.typeOfPayment = type;
    this.collectionIndex = i;
    this.paymentConcepts = [...item.payment_choices];
    const check = this.paymentConcepts.find(r => r.name.includes('Monthly Installment'));
    this.disablePayToRemaining = true;
    if (check) {
      this.disablePayToRemaining = false;
    }
    this.paymentModalOpen.nativeElement.click();
  }

  setPaymentConceptAmount(id: any) {
    this.paymentConcepts.map(r => {
      if (r.id == id) {
        this.penaltyForm.controls.payment_concept_amt.patchValue(r.amount || 0);        
      }
    }); 
  }

  setPaymentAmount(item: any) {
    if (this.typeOfPayment == 'commission-popup') {
      if (this.commission_type == 1 && item.add_purchase_commission == 0) {        
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseEnablePurchaseCommission'), this.translate.instant('swal.error'));
        this.closeCollReceiptModal();
        return false;
      }
      if (this.commission_type == 2 && item.add_collection_commission == 0) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseEnableCollectionCommission'), this.translate.instant('swal.error'));
        this.closeCollReceiptModal();
        return false;
      }
      this.paymentAmount = this.commission_type == 1 ? (item.purchase_comm_amount || 0) : (item.amount || 0);
      this.selectedCollectionCommission = item;
    } else {
      this.selectedPaymentConcept = item;
      let amt: any = 0; let penaltyamt: any = 0;
      let amtPaid: any = 0;
      let currentAmt: any = 0;
      let currentAmtPaid: any = 0;
      // checking if method is pay to specific (4), then user will pay only for that specific installment + user cannot pay more than the amount+penalty
      if (this.payment_type == 4) {
        currentAmt = item['amount']; 
        currentAmtPaid = item['calc_payment_amount'] || 0;
        this.penaltyAmount = item.penalty ? parseFloat(item.penalty.amount).toFixed(2) : 0;
        this.pendingPayment = 0.00 // amt already paid
        this.currentAmount = (parseFloat(currentAmt) - parseFloat(currentAmtPaid)).toFixed(2);
        this.paymentAmount = (parseFloat(this.currentAmount) + parseFloat(this.pendingPayment) + parseFloat(this.penaltyAmount)).toFixed(2);     
        this.calculatedPayAmount = [...this.paymentAmount];
      } else if (this.payment_type == 1){
        for (let index = 0; index < this.paymentConcepts.length; index++) {        
          const r = this.paymentConcepts[index];
          currentAmt = r['amount']; 
          currentAmtPaid = r['calc_payment_amount'] || 0;
          if (r['id'] != item['id']) {
            penaltyamt = r['penalty'] ? parseFloat(r['penalty']['amount']) : 0;
            amt = parseFloat(amt) + parseFloat(r['amount']) + parseFloat(penaltyamt);
            amtPaid = parseFloat(amtPaid) + parseFloat(currentAmtPaid);
          } else {
            break;
          }
        }
        this.penaltyAmount = item.penalty ? parseFloat(item.penalty.amount).toFixed(2) : 0;
        this.pendingPayment = (amt - amtPaid).toFixed(2);
        this.currentAmount = (parseFloat(currentAmt) - parseFloat(currentAmtPaid)).toFixed(2);
        this.paymentAmount = (parseFloat(this.currentAmount) + parseFloat(this.pendingPayment) + parseFloat(this.penaltyAmount)).toFixed(2);
        this.calculatedPayAmount = [...this.paymentAmount];
      } 
      // else if (this.payment_type == 5){
      //   for (let index = 0; index < this.paymentConcepts.length; index++) {        
      //     const r = this.paymentConcepts[index];
      //     currentAmt = r['amount']; 
      //     currentAmtPaid = r['calc_payment_amount'] || 0;
      //       penaltyamt = r['penalty'] ? parseFloat(r['penalty']['amount']) : 0;
      //       amt = parseFloat(amt) + parseFloat(r['amount']) + parseFloat(penaltyamt);
      //       amtPaid = parseFloat(amtPaid) + parseFloat(currentAmtPaid);
      //     // } else {
      //     //   break;
      //     // }
      //   }
      //   this.penaltyAmount = item.penalty ? parseFloat(item.penalty.amount).toFixed(2) : 0;
      //   this.pendingPayment = (amt - amtPaid).toFixed(2);
      //   this.currentAmount = (parseFloat(currentAmt) - parseFloat(currentAmtPaid)).toFixed(2);
      //   this.paymentAmount = (parseFloat(this.currentAmount) + parseFloat(this.pendingPayment) + parseFloat(this.penaltyAmount)).toFixed(2);
      //   this.calculatedPayAmount = [...this.paymentAmount];
      // }
    }
  }

  closePaymentModal() {
    this.paymentModalClose.nativeElement.click();
  }

  closeEditPaymentModal() {
    this.paymentConcepts = [];
    this.editPaymentModalClose.nativeElement.click();
  }

  onSelect(e) {
    this.paymentDate = moment.utc(e).toDate();
  }

  applyCollectionPayment() {
    // checking if date selected and receipt selected
    if (!this.paymentDate) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseSelectPaymentDate'), this.translate.instant('swal.error'));
      return false;
    }
    if (!this.docFile) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseChooseReceipt'), this.translate.instant('swal.error'));
      return false;
    }
    if (!this.paymentAmount || this.paymentAmount == 0) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseEnterValidAmt'), this.translate.instant('swal.error'));
      return false;
    }
    if (this.surplus_payment_type=='4' && !this.surplus_payment_choice_id) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseChoosePayments'), this.translate.instant('swal.error'));
      return false;
    }

    let amt = this.paymentAmount;
    // in case of pay to following, if user is paying surplus money ask the user, what he wants to do with durplus money
    if (this.payment_type == 1 && this.calculatedPayAmount < this.paymentAmount) {
      if (!this.surplus_payment_type) {
        this.askUserForSurplusMomey();
        return;
      } else {
        amt = this.calculatedPayAmount;
      }
    }

    // check for type 1, user can not pay more than the sum of all installments
    if (this.payment_type == '1') {
      let a = 0;
      this.paymentConcepts.map(v => {
        if (!v['is_paid_calculated']) {
          const remaining_amt = parseFloat(v['amount']) - parseFloat(v['calc_payment_amount']);
          a = a + remaining_amt + (v['penalty'] ? parseFloat(v['penalty']['amount']) : 0);
        }
      }, 0);
      if (this.paymentAmount > a) {
        this.toastr.clear();
        this.toastr.error(this.translate.instant('message.error.payToFollowingCheck'), this.translate.instant('swal.error'));
        return false;
      }
    }

    // check for type 2 abd 2, user cannot pay more than sum of remaining MI
    if (this.payment_type == '2' || this.payment_type == '3') {
      let a: any = 0;
      this.paymentConcepts.map(v => {
        if (!v['is_paid_calculated'] && v.name.includes('Monthly Installment')) {
          const remaining_amt = parseFloat(v['amount']) - parseFloat(v['calc_payment_amount']);
          a = parseFloat(a) + remaining_amt + (v['penalty'] ? parseFloat(v['penalty']['amount']) : 0);
          a = a.toFixed(2);
        }
      }, 0);
      if (this.paymentAmount > a) {
        this.toastr.clear();
        this.toastr.error(this.translate.instant('message.error.payToRemainingcheck'), this.translate.instant('swal.error'));
        return false;
      }
    }

    // check for type 3, user can only pay exact amount of M1, or sum of M1 & M2, or sum of M1,M2,M3 and soon
    let a1 = this.surplus_payment_type == '3' ? this.paymentAmount - this.calculatedPayAmount : this.paymentAmount;
    if (this.payment_type == '3' || this.surplus_payment_type == '3') {
      let a: any = 0;
      let index = this.paymentConcepts.length-1;
      for (index; index>=0; index--) { 
        const v = this.paymentConcepts[index]  ;
        if (!v['is_paid_calculated'] && v.name.includes('Monthly Installment')) {
          const remaining_amt = parseFloat(v['amount']) - parseFloat(v['calc_payment_amount']);
          a = parseFloat(a) + remaining_amt + (v['penalty'] ? parseFloat(v['penalty']['amount']) : 0);
          a = a.toFixed(2);
        }
        // using a1 and not this.paymentAmount because, need to check for both direct type 3 and type 3 in surplus popup
        if (a1 > a) {
          continue;
        } else if (a1 == a){
          break;
        } else if (this.paymentAmount < a){
          this.toastr.clear();
          this.toastr.error(this.translate.instant('message.error.payToRemainingReduceTimecheck'), this.translate.instant('swal.error'));
          this.surplus_payment_type == '3' ? this.surplusMoneyModalClose.nativeElement.click() : this.paymentModalClose.nativeElement.click();
          return false;
        }
      }
    }

    // in pay to specific, user is allowed to pay either exact amount or partial amt
    if (this.payment_type == 4 && this.calculatedPayAmount < this.paymentAmount) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.payToSpecificCheck'), this.translate.instant('swal.error'));
      return false;
    }

    // in total payment, user is allowed to pay sum of exact remaining amount (sum of installments and penalty)
    if (this.payment_type == 5 && this.calculatedPayAmount != this.paymentAmount) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.totalPayemntCheck'), this.translate.instant('swal.error'));
      return false;
    }

    var offset = new Date(this.paymentDate).getTimezoneOffset();
    if (offset < 0) {
      this.paymentDate = moment(this.paymentDate).subtract(offset, 'minutes').toDate();
    } else {
      this.paymentDate = moment(this.paymentDate).add(offset, 'minutes').toDate();
    }

    // inpur params
    const input = {
      property_collection_id: this.property_collection_id,
      payment_method_id: this.payment_method_id,
      amount : amt, 
      receipt: this.docFile,
      description: this.description,
      payment_date: this.paymentDate,
      full_amount: this.paymentAmount // sending real amount entered by user
    }

    // send commission_type, collection_commission_id, percent incase of applying commission
    if (this.typeOfPayment == 'commission-popup') {
      input['commission_type'] = this.commission_type;
      input['collection_commission_id'] = this.selectedCollectionCommission.id;
      input['percent'] = this.selectedCollectionCommission.percent;
    } else {
      // applying payment
      // for edit the wrong amount uploaded
      // if (this.selectedPaymentConcept && this.selectedPaymentConcept['collection_payment']) {
      //   input['id'] = this.selectedPaymentConcept['collection_payment']['id']
      // }
      // for type==2&3, no need to pass collection_payment_choice_id
      if (this.payment_type == 1 || this.payment_type == 4) {
        input['collection_payment_choice_id'] = this.payment_choice_id['id']
      }
      input['type'] = this.payment_type;
    }
    const url = this.typeOfPayment == 'apply-popup' ? 'applyCollectionPayment' : 'applyCommissionPayment';

    this.isApplyBtnClicked = true;
    this.admin.postDataApi(url, input).subscribe(r => {
      this.isApplyBtnClicked = false;
      if (this.surplus_payment_type) {
        input['amount'] = this.paymentAmount - this.calculatedPayAmount;
        input['type'] = this.surplus_payment_type;
        input['parent_id'] = r.data['id'];   // send parent_id in case of type 1 and surplus (to make parent delete)
        if (this.surplus_payment_type=='4') {
          input['collection_payment_choice_id'] = this.surplus_payment_choice_id 
        }

        this.admin.postDataApi(url, input).subscribe(r => {
          // if (this.surplus_payment_type == '1' || this.surplus_payment_type == '4') {
          //   input['collection_payment_choice_id'] = this.payment_choice_id['id']
          // }
        });
      }
  
      this.router.navigate(['/dashboard/collections/quick-visualization', this.property_collection_id]);
      this.paymentModalClose.nativeElement.click();
      this.closeCollReceiptModal();
      
      this.toastr.clear();
      this.toastr.success(this.translate.instant('message.success.savedSuccessfully'), this.translate.instant('swal.success'));
    }, error => {
      this.paymentConcepts = [];
      this.isApplyBtnClicked = false;
      this.docsFile1.nativeElement.value = '';
      this.paymentModalClose.nativeElement.click();
      this.closeCollReceiptModal();      
      // this.toastr.error(error.message, this.translate.instant('swal.error'));
      return false;
    });
  }

  askUserForSurplusMomey() {
    this.closePaymentModal();
    this.surplusMoneyModalOpen.nativeElement.click();
  }

  closeSurplusMoney() {
    this.surplusMoneyModalClose.nativeElement.click();
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
      if (this.selectedItem.payment_choices[index] && this.selectedItem.payment_choices[index].is_paid_calculated) {
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
  }

  showCollectionCommReceipt(item: any, i: number, type: string) {
    this.property_collection_id = item.id;
    this.selectedItem = item;
    this.collectionIndex = i;
    this.paymentConcepts = item.collection_commissions;
    this.typeOfPayment = type;
    this.collectionReceiptOpen.nativeElement.click();
  }

  editCollectionCommReceipt(item: any) {
    this.payment_id = item.id;
    this.payment_method_id = item.payment_method.id;
    this.description = item.description;
    this.docFile = item.receipt;
    this.amount = item.amount;
    this.commission_type = item.commission_type;
    this.collection_commission_id = item.collection_commission_id;
    this.payment_date = item.payment_date ? this.getDateWRTTimezone(item.payment_date, 'DD/MMM/YYYY') : '';
    this.closeEditPaymentModal();
    this.editCollectionReceiptOpen.nativeElement.click();
  }

  deleteCollectionCommReceipt(item: any) {
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' +
        this.translate.instant('message.error.wantToDeleteCommission'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.admin.postDataApi('deleteCommissionPayment', {id: item.id, commission_type: item.commission_type})
          .subscribe(
            success => {
              this.router.navigate(['/dashboard/collections/quick-visualization', this.property_collection_id]);
              this.closeEditPaymentModal();
              this.toastr.clear();
              this.toastr.success(this.translate.instant('message.success.deletedSuccessfully'), this.translate.instant('swal.success'));
            },
            error => {
              this.toastr.error(error.error.message, this.translate.instant('swal.error'));
            });
      }
    });

  }

  closeEditCollReceiptModal() {
    this.editCollectionReceiptClose.nativeElement.click();
  }

  updateCollectionCommPayment() {
    // checking if date selected and receipt selected
    if (!this.payment_date) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseSelectPaymentDate'), this.translate.instant('swal.error'));
      return false;
    }
    if (!this.docFile) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseChooseReceipt'), this.translate.instant('swal.error'));
      return false;
    }

    var offset = new Date(this.payment_date).getTimezoneOffset();
    if (offset < 0) {
      this.payment_date = moment(this.payment_date).subtract(offset, 'minutes').toDate();
    } else {
      this.payment_date = moment(this.payment_date).add(offset, 'minutes').toDate();
    }

    // inpur params
    const input = {
      id: this.payment_id,
      payment_method_id: this.payment_method_id,
      receipt: this.docFile,
      description: this.description,
      payment_date: this.payment_date,
      collection_commission_id: this.collection_commission_id,
      commission_type: this.commission_type,
      amount: this.amount
    }

    this.admin.postDataApi('applyCommissionPayment', input).subscribe(r => {
      this.router.navigate(['/dashboard/collections/quick-visualization', this.property_collection_id]);
      this.closeEditCollReceiptModal();
      this.toastr.clear();
      this.toastr.success(this.translate.instant('message.success.savedSuccessfully'), this.translate.instant('swal.success'));
    }, error => {
      this.toastr.error(error.message, this.translate.instant('swal.error'));
      return false;
    });
  }

  getPenaltyAmount(percent: number) {
    const paymentConceptAmount = this.penaltyForm.controls.payment_concept_amt.value;
    if (!paymentConceptAmount || paymentConceptAmount == 0) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseChoosePaymentConcept'), this.translate.instant('swal.error'));
      this.penaltyForm.controls.percent.patchValue(0);
      return;
    }
    const paymentAmount = ((percent * paymentConceptAmount) / 100).toFixed(2);
    this.penaltyForm.controls.amount.patchValue(paymentAmount);
  }

  getPenaltyPercentage(amount: number) {
    const paymentConceptAmount = this.penaltyForm.controls.payment_concept_amt.value;
    if (!paymentConceptAmount || paymentConceptAmount == 0) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseChoosePaymentConcept'), this.translate.instant('swal.error'), );
      this.penaltyForm.controls.amount.patchValue(0);
      return;
    }
    const penaltyPercent = ((amount * 100) / paymentConceptAmount).toFixed(3);
    this.penaltyForm.controls.percent.patchValue(penaltyPercent);
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

  showPenaltyPaymentPopup(item: any, i: number, type: string, collection_payment_choice_id: string) {
    if (collection_payment_choice_id) {
      this.editPaymentModalOpen.nativeElement.click();
      this.penaltyForm.controls.payment_concept_amt.patchValue(item.amount);
      this.penaltyForm.controls.amount.patchValue(item.penalty.amount);
      this.penaltyForm.controls.description.patchValue(item.penalty.description);
      this.penaltyForm.controls.percent.patchValue(((item.penalty.amount*100)/item.amount).toFixed(2));
      this.penaltyForm.controls.id.patchValue(item.penalty.id);
      this.penaltyForm.controls.collection_payment_choice_id.patchValue(item.penalty.collection_payment_choice_id);
    } else {
      this.property_collection_id = item.id;
      this.typeOfPayment = type;
      this.collectionIndex = i;
      this.paymentConcepts = item.payment_choices;
    }
    this.penaltyModalOpen.nativeElement.click();
  }


  deletePenaltyPaymentPopup(id: number) {
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' +
        this.translate.instant('message.error.wantToDeletePenalty'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.admin.postDataApi('deleteCollectionPenalty', {id: id})
          .subscribe(
            success => {
              this.router.navigate(['/dashboard/collections/quick-visualization', this.property_collection_id]);
              this.closeEditPaymentModal();
              this.toastr.clear();
              this.toastr.success(this.translate.instant('message.success.deletedSuccessfully'), this.translate.instant('swal.success'));
            },
            error => {
              this.toastr.error(error.error.message, this.translate.instant('swal.error'));
            });
      }
    });
  }
  
  closePenaltyPaymentPopup() {
    this.penaltyForm.reset();
    this.penaltyModalClose.nativeElement.click();
  }

  applyCollectionPenalty(formdata) {
    if (this.penaltyForm.invalid) {
      this.showError = true;
      return;
    }
    this.admin.postDataApi('applyCollectionPenalty', this.penaltyForm.value).subscribe(r => {
      // let paymentChoiceIndex = 0;
      // for (let index = 0; index < this.items[this.collectionIndex].payment_choices.length; index++) {
      //   const element = this.items[this.collectionIndex].payment_choices[index];
      //   if (element.id == this.payment_choice_id) {
      //     paymentChoiceIndex = index;
      //   }
      // }
      // this.items[this.collectionIndex].payment_choices[paymentChoiceIndex]['penalty'] = r.data;
      this.router.navigate(['/dashboard/collections/quick-visualization', this.property_collection_id]);
      this.closePenaltyPaymentPopup();
      this.toastr.clear();
      this.toastr.success(this.translate.instant('message.success.savedSuccessfully', this.translate.instant('swal.success')));
    });
  }

  
  quickCollectionView(item: any) {
    this.router.navigate(['/dashboard/collections/quick-visualization', item.id])
  }
  
  viewAccountStatement(item: any) {
    this.router.navigate(['/dashboard/collections/account-statement', item.id])
  }

  setPayMentType(payment_type: string) {
    this.payment_type = payment_type;
    if (payment_type == '1') {
      this.paymentConcepts.map(r => r.is_disabled = true);
      for (let index = 0; index < this.paymentConcepts.length; index++) {
        if (!this.paymentConcepts[index].is_paid_calculated) {
          this.paymentConcepts[index].is_disabled = false;
          break;
        }
      }
    }
    if (this.typeOfPayment == 'apply-popup') {
      this.docsFile1.nativeElement.value = '';
    } else {
      this.docsFile2.nativeElement.value = '';
    }
    if (this.payment_type && this.payment_type!='2' && this.payment_type !='3' && this.payment_type !='5') {
      this.applyPaymentChoiceId.nativeElement.value = '';
    }
    this.closeCollReceiptModal();
    if (this.payment_type == 5) {
      let amt: any = 0; let penaltyamt: any = 0;
        let amtPaid: any = 0;
        let currentAmt: any = 0;
        let currentAmtPaid: any = 0;
        this.penaltyAmount = 0;
        for (let index = 0; index < this.paymentConcepts.length; index++) {        
          const r = this.paymentConcepts[index];
          currentAmt = r['amount']; 
          currentAmtPaid = r['calc_payment_amount'] || 0;
          penaltyamt = r['penalty'] ? parseFloat(r['penalty']['amount']) : 0;
          amt = parseFloat(amt) + parseFloat(r['amount']) + parseFloat(penaltyamt);
          amtPaid = parseFloat(amtPaid) + parseFloat(currentAmtPaid);
        }
        this.paymentAmount = (amt - amtPaid).toFixed(2);
        this.calculatedPayAmount = [...this.paymentAmount];
    }
    this.applyPaymentMethodId.nativeElement.value = '';
  }

  setPayMentTypeSurplus(payment_type: string) {
    this.surplus_payment_type = payment_type;
    // incase user select type 4 in surplus popup => therefore, needs to disable selected concept in payment modal
    this.paymentConcepts.map(r => r.is_disabled = false);
    for (let index = 0; index < this.paymentConcepts.length; index++) {
      // paid and if selected concept => only then disable
      if (this.payment_choice_id['id'] == this.paymentConcepts[index].id) {
        this.paymentConcepts[index].is_disabled = true;
        break;
      }
    }
  }

  setPaymentSurplusAmount(item) {
    this.selectedPaymentConcept = item;
    this.surplus_payment_choice_id = item.id;
    let currentAmt: any = 0;
    let currentAmtPaid: any = 0;
    // checking if method is pay to specific (4), then user will pay only for that specific installment + user cannot pay more than the amount+penalty
    if (this.surplus_payment_type == '4') {
      currentAmt = item['amount']; 
      currentAmtPaid = item['calc_payment_amount'] || 0;
      const penaltyAmount: any = item.penalty ? parseFloat(item.penalty.amount).toFixed(2) : 0;
      const currentAmount: any = (parseFloat(currentAmt) - parseFloat(currentAmtPaid)).toFixed(2);
      this.surplus_amt = (parseFloat(currentAmount) + parseFloat(penaltyAmount)).toFixed(2);     
    }
    
    if ((this.paymentAmount - this.calculatedPayAmount)>this.surplus_amt) {
      this.surplus_payment_choice_id = '';
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.payToSpecificCheck'), this.translate.instant('swal.error'));
      return false;
    }
  }

  getDateWRTTimezone(date: any, format: any) {
    var offset = new Date(date).getTimezoneOffset();
    if (offset < 0) {
      return moment(date).subtract(offset, 'minutes').format(format);
    } else {
      return moment(date).add(offset, 'minutes').format(format);
    }
  }

  getLastPaymentConcept(item: any) {
    // payment_type == 1 means => pay to following => means show concept name
    // payment_type == 2 means => pay to remaining (reduce amt) => show same
    // payment_type == 3 means => pay to remaining (reduce time) => show same
    if (item.last_payment.payment_type == 1 || item.last_payment.payment_type == 4) {
      return item.last_payment.name;
    } else if (item.last_payment.payment_type == 2){
      return 'Payment to remaining (Reduce Amount)';
    } else if (item.last_payment.payment_type == 3){
      return 'Payment to remaining (Reduce Amount)';
    } else {
      return 'Total Payment';
    }
  }

  getRemainingAmt(p: any) {
    const v = (((p.deal_price || 0) + (p.penalty || 0)) - (p.total_payment_recieved || 0));
    return v > 0 ? v : 0;
  }

  showDescription(description: string, title: any) {
    if (description) {
      this.title = title;
      this.description = description;
      this.viewDesModal.nativeElement.click();
    }
  }

  closeDescModal() {
    this.viewDesModalClose.nativeElement.click();
  }

}
