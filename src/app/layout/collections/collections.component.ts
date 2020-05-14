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
  payment_choice_id: number;
  payment_method_id: number;
  description: string;
  typeOfPayment: string;
  collectionIndex: number;
  selectedPaymentConcept: any;
  public scrollbarOptions = { axis: 'y', theme: 'dark' };

  currentAmount: number;
  penaltyPercent: number;
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

  // penalty form
  penaltyForm: FormGroup;
  showError: boolean;

  @ViewChild('applyPaymentChoiceId') applyPaymentChoiceId: ElementRef;
  @ViewChild('applyPaymentMethodId') applyPaymentMethodId: ElementRef;
  @ViewChild('applyPaymentChoiceId1') applyPaymentChoiceId1: ElementRef;
  @ViewChild('applyPaymentChoiceId2') applyPaymentChoiceId2: ElementRef;
  @ViewChild('applyPaymentMethodId1') applyPaymentMethodId1: ElementRef;
  @ViewChild('modalOpen') modalOpen: ElementRef;
  @ViewChild('modalClose') modalClose: ElementRef;
  // @ViewChild('rejectModalOpen') rejectModalOpen: ElementRef;
  // @ViewChild('rejectModalClose') rejectModalClose: ElementRef;

  @ViewChild('notesModalOpen') notesModalOpen: ElementRef;
  @ViewChild('notesModalClose') notesModalClose: ElementRef;
  @ViewChild('paymentModalOpen') paymentModalOpen: ElementRef;
  @ViewChild('paymentModalClose') paymentModalClose: ElementRef;
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

  initPenaltyForm() {
    this.penaltyForm = this.fb.group({
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

  // closeReasonModal() {
  //   this.rejectModalClose.nativeElement.click();
  // }

  changeStatus(item: any, status: number) {
    item.is_approved = status;
    const input = { id: item.id, is_approved: status };
    this.admin.postDataApi('approveCollection', input).subscribe(r => {
      this.toastr.clear();
      this.toastr.success(this.translate.instant('message.success.collectionStatusChanged'), this.translate.instant('swal.success'));
      // swal(this.translate.instant('swal.success'), this.translate.instant('message.success.collectionStatusChanged'), 'success');
      // this.closeModal();
    },
      error => {
      this.toastr.clear();
      this.toastr.error(error.error.message, this.translate.instant('swal.error'));
        // swal(this.translate.instant('swal.error'), error.error.message, 'error');
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
      // swal(this.translate.instant('swal.success'), this.translate.instant('message.success.addedSuccessfully'), 'success');
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
 
      // swal(this.translate.instant('swal.success'), this.translate.instant('message.success.deletedSuccessfully'), 'success');
    });
  }

  showApplyPaymentPopup(item: any, i: number, type: string) {
    this.typeOfPayment = type;
    this.collectionIndex = i;
    this.paymentConcepts = item.payment_choices;
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
    console.log(item);
    // this.paymentAmount = item.amount ? item.amount : 0;
    if (this.typeOfPayment == 'commission-popup') {
      if (this.commission_type == 1 && item.add_purchase_commission == 0) {
        
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseEnablePurchaseCommission'), this.translate.instant('swal.error'));
 
        // swal('Error', 'Please enable the purchase commission checkbox from collection details', 'error');
        this.closeCollReceiptModal();
        return false;
      }
      if (this.commission_type == 2 && item.add_collection_commission == 0) {
        
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseEnableCollectionCommission'), this.translate.instant('swal.error'));
 
        // swal('Error', 'Please enable the collection commission checkbox from collection details', 'error');
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
      
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseSelectPaymentDate'), this.translate.instant('swal.error'));
 
      // swal('Error', 'Please select payment date', 'error');
      return false;
    }
    if (!this.docFile) {
      
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseChooseReceipt'), this.translate.instant('swal.error'));
 
      // swal('Error', 'Please choose receipt', 'error');
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
      // for edit the wrong amount uploaded
      if (this.selectedPaymentConcept['collection_payment']) {
        input['id'] = this.selectedPaymentConcept['collection_payment']['id']
      }
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
        if (this.items[this.collectionIndex].payment_choices[paymentChoiceIndex+1]) {
          this.items[this.collectionIndex].next_payment = {
            name: this.items[this.collectionIndex].payment_choices[paymentChoiceIndex+1].name, 
            date: this.items[this.collectionIndex].payment_choices[paymentChoiceIndex+1].date,
            amount: this.items[this.collectionIndex].payment_choices[paymentChoiceIndex+1].amount
          }
        }
        this.items[this.collectionIndex].payment_choices[paymentChoiceIndex]['collection_payment'] = r.data;
        this.selectedPaymentConcept = {};
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
      
      this.toastr.clear();
      this.toastr.success(this.translate.instant('message.success.savedSuccessfully'), this.translate.instant('swal.success'));
 
      // swal(this.translate.instant('swal.success'), this.translate.instant('message.success.savedSuccessfully'), 'success');
     
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


  getPenaltyAmount(percent: number) {
    const paymentConceptAmount = this.penaltyForm.controls.payment_concept_amt.value;
    if (!paymentConceptAmount || paymentConceptAmount == 0) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseChoosePaymentConcept'), this.translate.instant('swal.error'));
      this.penaltyForm.controls.percent.patchValue(0);
      return;
    }
    const paymentAmount = Math.round((percent * paymentConceptAmount) / 100);
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
    const penaltyPercent = Math.round((amount * 100) / paymentConceptAmount);
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

  showPenaltyPaymentPopup(item: any, i: number, type: string) {
    this.typeOfPayment = type;
    this.collectionIndex = i;
    this.paymentConcepts = item.payment_choices;
    this.penaltyModalOpen.nativeElement.click();
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
      let paymentChoiceIndex = 0;
      for (let index = 0; index < this.items[this.collectionIndex].payment_choices.length; index++) {
        const element = this.items[this.collectionIndex].payment_choices[index];
        if (element.id == this.payment_choice_id) {
          paymentChoiceIndex = index;
        }
      }
      this.items[this.collectionIndex].payment_choices[paymentChoiceIndex]['penalty'] = r.data;
      // this.payment_choice_id = 0; this.paymentAmount = 0; this.description = '';
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
}
