import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiConstants } from 'src/app/common/api-constants';
import { Constant } from 'src/app/common/constants';
import { IProperty } from 'src/app/common/property';
import { AdminService } from 'src/app/services/admin.service';
import { ProjectService } from 'src/app/services/project.service';
import * as moment from 'moment';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { ContractPdfService } from 'src/app/services/contract-pdf.service';
import { LegalContractPdfService } from 'src/app/services/legal-contract-pdf.service';
import { Collection } from 'src/app/models/collection.model';
import { ToastrService } from 'ngx-toastr';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
declare let swal: any;
declare var $: any;

@Component({
  selector: 'app-manage-contracts',
  templateUrl: './manage-contracts.component.html',
  styleUrls: ['./manage-contracts.component.css']
})
export class ManageContractsComponent implements OnInit {

  @ViewChild('openSelectColumnsModal') openSelectColumnsModal: ElementRef;
  @ViewChild('closeSelectColumnsModal') closeSelectColumnsModal: ElementRef;
  @ViewChild('openLinkContractModal') openLinkContractModal: ElementRef;
  @ViewChild('closeLinkContractModal') closeLinkContractModal: ElementRef;

  public parameter: IProperty = {};
  public select_columns_list: any[] = [];
  public selectedColumnsToShow: any = {};
  public isSelectAllColumns: boolean = false;
  public keyword: string = '';
  public language_code: string;
  public scrollbarOptions = { axis: 'y', theme: 'dark' };
  items: any = [];
  total: any = 0;
  collectionId: any;
  searched_collection: Collection;
  step = 1;
  concept_layaway: any;
  concept_downpayment: any;
  concept_monthly: any;
  concept_monthly_no: any;
  concept_payment: any;
  locale: any;
  signatureDate: any;
  beneficiary_id: any[] = [];
  status: any;
  contract_type: any;
  beneficiary_list = [];
  is_edit: boolean = false;
  multiDropdownSettings = {};
  today: any;
  beneficiary_ids: any[];
  percent: any;
  contract_id: any;

  constructor(
    public constant: Constant,
    public apiConstant: ApiConstants,
    public admin: AdminService,
    public projectService: ProjectService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private contract: ContractPdfService,
    private legal_contract: LegalContractPdfService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.initCalendarLocale();
    this.initializedDropDownSetting();
    this.today = new Date();
    this.language_code = localStorage.getItem('language_code');
    this.parameter.flag = 1;
    this.parameter.dash_flag = this.projectService.dash_flag ? this.projectService.dash_flag : this.constant.dash_flag;
    this.getContractHome();
    this.getContract();
  }

  initializedDropDownSetting = (): void => {
    this.multiDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'beneficiary_name',
      selectAllText: this.translate.instant('commonBlock.selectAll'),
      unSelectAllText: this.translate.instant('commonBlock.unselectAll'),
      searchPlaceholderText: this.translate.instant('commonBlock.search'),
      allowSearchFilter: true,
      itemsShowLimit: 2
    };
  }

  initCalendarLocale() {
    if (this.translate.defaultLang === 'en') {
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
      };
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


  changePropertyFlag(tab) {
    this.parameter.flag = tab;
    this.getContractHome();
  }

  getContract(){
    this.spinner.show();
    this.admin.postDataApi('getContracts', this.parameter)
    .subscribe(
      success => {
        this.items = success['data'];
        this.spinner.hide();
      });
  }

  getExportlisting() {

  }
  getProjectSelection(data, data1) {

  }
  changeFlag(value) {

  }
  getContractSelection = (isFirstTime: boolean, keyword?: string): void => {
    this.spinner.show();
    let url = this.parameter.flag == 1 ? 'getContractSelection' : 'getContractTypeSelection';
    this.admin.postDataApi(url, { name: keyword }).subscribe((response) => {
      this.spinner.hide();
      this.select_columns_list = (response.data || []).sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
      (this.select_columns_list || []).forEach((data, index) => {
        this.makeSelectedColumns(data.id, index);
      });
      this.changeSelect();
      if (isFirstTime) {
        this.keyword = '';
        this.isSelectAllColumns = false;
        this.language_code = localStorage.getItem('language_code');
        this.openSelectColumnsModal.nativeElement.click();
      }
    }, (error) => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), ((error || {}).error || {}).message, 'error');
    });
  }

  changeSelect = (): void => {
    let index = 0;
    (this.select_columns_list || []).forEach((data) => {
      if (data.isCheckBoxChecked) {
        index += 1;
      }
    });
    if ((this.select_columns_list || []).length == index) {
      this.isSelectAllColumns = true;
    } else {
      this.isSelectAllColumns = false;
    }
  }

  makeSelectedColumns = (id: number, index: number): void => {
    switch (id) {
      case 1:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.collection_id;
        break;
      case 2:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.developer;
        break;
      case 3:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.project;
        break;
      case 4:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.apartment;
        break;
      case 5:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.buyer;
        break;
      case 6:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.type_of_contract;
        break;
      case 7:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.signature_date;
        break;
      case 8:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.status;
        break;
      case 9:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedColumnsToShow.action;
        break;
      default:
        break;
    }

  }

  getContractHome = (): void => {
    //this.spinner.show();
    let url = this.parameter.flag == 1 ? 'getContractHome' : 'getContractTypeHome';
    this.admin.postDataApi(url, { user_id: JSON.parse(localStorage.getItem('user-id')) || 0 }).subscribe((response) => {
      this.selectedColumnsToShow = response.data || {};
      //this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), error.message, 'error');
    });
  }

  changeSelectAll = (): void => {
    (this.select_columns_list || []).forEach((data) => {
      data.isCheckBoxChecked = this.isSelectAllColumns;
    });
  }

  closeSelectColumnsPopup = (): void => {
    this.keyword = '';
    this.isSelectAllColumns = false;
    this.closeSelectColumnsModal.nativeElement.click();
  }

  applyShowSelectedColumns = (): void => {
    this.spinner.show();
    let url = this.parameter.flag == 1 ? 'updateContractHome' : 'updateContractTypeHome'
    this.admin.postDataApi(url, this.getPostRequestForColumn()).subscribe((response) => {
      this.spinner.hide();
      this.closeSelectColumnsPopup();
      this.getContractHome();
    }, (error) => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), error.error.message, 'error');
    });
  }

  getPostRequestForColumn = (): any => {
    if (this.parameter.flag == 1) {
      return {
        user_id: JSON.parse(localStorage.getItem('user-id')) || 0,
        collection_id: (this.select_columns_list[3] || []).isCheckBoxChecked,
        developer: (this.select_columns_list[4] || []).isCheckBoxChecked,
        project: (this.select_columns_list[5] || []).isCheckBoxChecked,
        apartment: (this.select_columns_list[1] || []).isCheckBoxChecked,
        buyer: (this.select_columns_list[2] || []).isCheckBoxChecked,
        type_of_contract: (this.select_columns_list[8] || []).isCheckBoxChecked,
        signature_date: (this.select_columns_list[6] || []).isCheckBoxChecked,
        status: (this.select_columns_list[7] || []).isCheckBoxChecked,
        actions: (this.select_columns_list[0] || []).isCheckBoxChecked,
      };
    }
    else {
      return {
        user_id: JSON.parse(localStorage.getItem('user-id')) || 0,
        contract_id: (this.select_columns_list[1] || []).isCheckBoxChecked,
        developer: (this.select_columns_list[2] || []).isCheckBoxChecked,
        project: (this.select_columns_list[3] || []).isCheckBoxChecked,
        type_of_contract: (this.select_columns_list[5] || []).isCheckBoxChecked,
        status: (this.select_columns_list[4] || []).isCheckBoxChecked,
        actions: (this.select_columns_list[0] || []).isCheckBoxChecked,
      };
    }
  }

  downloadContract(){
   this.contract.getCollectionById(504);
  }

  downloadLegalContract(){
    this.legal_contract.getCollectionById(504);
   }

   searchCollectionById() {
    this.spinner.show();
    this.admin.postDataApi('getCollectionById', { id: this.collectionId })
      .subscribe(
        success => {
          this.spinner.hide();
          this.getUserById(success['data'].buyer_id);
          this.searched_collection = success['data'];
          this.concept_payment = this.searched_collection.payment_choices.find(item=> item.category_name == 'Payment upon Delivery');
          this.concept_layaway = this.searched_collection.payment_choices.find(item=> item.category_name == 'Layaway Payment');
          this.concept_downpayment = this.searched_collection.payment_choices.find(item=> item.category_name == 'Down Payment');
          this.concept_monthly = this.searched_collection.payment_choices.find(item=> item.category_name == 'Monthly Installment 1');
          let concept_monthly_ins= this.searched_collection.payment_choices.filter(item=> item.payment_choice.name == 'Monthly Installment');
          this.concept_monthly_no = concept_monthly_ins.length;
        });
  }

  openContractModal(){
    this.collectionId = undefined; 
    this.contract = undefined; 
    this.signatureDate = undefined, 
    this.beneficiary_id = undefined, 
    this.status = undefined;      
    this.openLinkContractModal.nativeElement.click();
    
  }

  continueModal(step){
    this.step = step;
  }

  selectContract(value){
  this.contract = value;
  }

  getUserById(id: string) {
    let self = this;
    this.admin.postDataApi('getUserById', { 'user_id': id })
      .subscribe(
        success => {
          this.beneficiary_list = success['data'].beneficiary;
          let ids = this.beneficiary_id;
          this.beneficiary_id = [];
          this.beneficiary_list.forEach(item=>{
            ids.forEach(data=>{
              if(item.id == data){
                self.beneficiary_id.push(item);
               }
            })
          })
        });
  }

  createContract(){
    this.spinner.show();
    let input ={
      property_collection_id: this.collectionId, 
      type_of_contract: this.contract, 
      signature_date: this.signatureDate, 
      beneficiary_id: this.beneficiary_ids,
      percentage: this.percent,
      status: this.status
    }
    let input1 ={
      contract_id: this.contract_id,
      property_collection_id: this.collectionId, 
      type_of_contract: this.contract, 
      signature_date: this.signatureDate, 
      beneficiary_id: this.beneficiary_ids,
      percentage: this.percent,
      status: this.status
    }
    this.admin.postDataApi(this.is_edit ? 'updateContract' : 'addContract',this.is_edit ? input1 : input)
      .subscribe(
        success => {
          this.getContract();
          this.spinner.hide();
          this.closeLinkContractModal.nativeElement.click();
        });
  }

  editContract(data){
    this.is_edit = true;
    this.step = 1;
    this.beneficiary_id = data.beneficiary_id,
    this.contract_id = data.id;
    this.collectionId = data.property_collection_id;
    this.searchCollectionById();
    this.contract = data.type_of_contract; 
    this.contract_type = data.type_of_contract;
    this.signatureDate = new Date(data.signature_date),  
    this.status = data.status;
    this.percent = data.percentage;     
    this.openLinkContractModal.nativeElement.click();
  }

  
  deletePopup(item: any, index: number) {
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' +
        this.translate.instant('message.error.wantToDeleteContract'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.deleteContract(item, index);
      }
    });
  }

  deleteContract(item: any, index: number) {
    this.admin.postDataApi('deleteContract', { contract_id: item.id }).subscribe(r => {
      this.toastr.success(this.translate.instant('message.success.deletedSuccessfully'), this.translate.instant('swal.success'));
      this.items.splice(index, 1);
    },
      error => {
        this.toastr.error(error.error.message, this.translate.instant('swal.error'));
      });
  }

  selectBeneficairy(data, value){
    if(value && value.length > 0){
     this.percent = (100 / value.length); 
    }
    else if(value && !value.length){
    value =[value];
    this.percent = (100 / value.length); 
    }
    if (data == "all") {
      const d = value.map(o => o.id);
      let id = [];
      d.forEach(item=>{
       id.push(item.id)
      });
      this.beneficiary_ids = d;
    } else if (data == "select") {
      const d = value.map(o => o.id);
      let id = [];
      d.forEach(item=>{
       id.push(item.id)
      });
      this.beneficiary_ids = d;
    } else if (data == "unselect") {
      this.beneficiary_ids = [];
    }
  }
}
