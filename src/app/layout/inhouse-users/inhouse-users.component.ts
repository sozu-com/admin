
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { FileUpload } from 'src/app/common/fileUpload';
import { Agency } from 'src/app/models/agency.model';
import { Constant } from 'src/app/common/constants';
import { User, Address, UserModel, Notes,Company } from 'src/app/models/inhouse-users.model';
import { IProperty } from 'src/app/common/property';
import { CommonService } from 'src/app/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { E } from '@angular/core/src/render3';
declare let swal: any;
declare const google;

@Component({
  selector: 'app-inhouse-users',
  templateUrl: './inhouse-users.component.html',
  styleUrls: ['./inhouse-users.component.css'],
  providers: [Constant, User, Address, UserModel,Notes,Company]
})

export class InhouseUsersComponent implements OnInit {

  @ViewChild('search1') searchElementRef: ElementRef;
  @ViewChild('outhouseUserModalOpen') outhouseUserModalOpen: ElementRef;
  @ViewChild('inhouseUserModalOpen') inhouseUserModalOpen: ElementRef;
  @ViewChild('modalClose') modalClose: ElementRef;
  @ViewChild('viewModalOpen') viewModalOpen: ElementRef;
  @ViewChild('viewModalClose') viewModalClose: ElementRef;
  @ViewChild('moreImgModalOpen') moreImgModalOpen: ElementRef;
  @ViewChild('moreImgModalClose') moreImgModalClose: ElementRef;
  @ViewChild('notesModalOpen') notesModalOpen: ElementRef;
  @ViewChild('notesModalClose') notesModalClose: ElementRef;
  obj: any;
  public parameter: IProperty = {};
  lead_sort = 2;
  property_sort = 2;
  initialCountry: any;
  addressIndex = 0;
  tempAdd: Object;
  url: any[];
  image: any;
  company_logo: any;
  logo: any;
  title: string;
  tab: number;
  // disabledLocalities = [];
  disabledBuildings = [];
  seenDuplicate = false;
  testObject = [];
  file1: FileUpload;
  agencies: Array<Agency>;
  language_code: string;
  items: Array<UserModel>;
  records: Array<UserModel>;
  predefinedUsers: Array<any>;
  user_type: any;
  constructor(public constant: Constant, private cs: CommonService,
    public model: UserModel, private route: ActivatedRoute,public noted: Notes,
    private spinner: NgxSpinnerService,
    public admin: AdminService, private router: Router,
    private ngZone: NgZone,
    private mapsAPILoader: MapsAPILoader,private toastr: ToastrService,
    private translate: TranslateService) {
    this.admin.countryData$.subscribe(success => {
      this.parameter.allCountry = success;
    });
  }

  ngOnInit() {
    this.tab = 0;
    this.language_code = localStorage.getItem('language_code');
    this.file1 = new FileUpload(false, this.admin);
    this.model.country_code = this.constant.country_code;
    this.model.dial_code = this.constant.dial_code;
    this.model.agency = new Agency();
    this.model.company = new Company();
    this.model.is_company = 'true';
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.p = this.constant.p;
    this.parameter.routeName = this.router.url;
    this.tempAdd = this.model.address;
    this.setCurrentPosition();
    this.parameter.sub = this.route.params.subscribe(params => {
      this.parameter.p = this.constant.p;
      this.parameter.userType = params['userType'];
      if (params.id) {
        this.parameter.id = params.id || '';
      }
      this.parameter.name = ''; this.parameter.phone = ''; this.parameter.email = '';
      this.parameter.items = []; this.parameter.total = 0;
      this.parameter.records = []; this.parameter.total = 0;
      this.getCountries();
      this.getInhouseUsers();
      if (this.parameter.userType === 'inhouse-broker' || this.parameter.userType === 'outside-broker') {
        this.property_sort = null;
        this.getAllAgencies();
      }
      this.initialCountry = { initialCountry: '' };
    });
  }

  checkPer(user_type: number){
     if(this.model.id){
      let input = {
        all: 1,
        admin_id: this.model.id,
        can_csr_buyer: 1,
        can_csr_seller: 1,
        can_in_house_broker:1,
        can_credit_agent:1,
      }
      this.spinner.show();
      this.admin.postDataApi('checkLeadAssign', input).subscribe(r => {
        if(r.success != '1'){
          this.model.user_type = this.user_type;
      this.toastr.warning(this.translate.instant('message.error.thisUserHasLeadsAssignedPleaseDeleteTheDependenciesFirst'), this.translate.instant('swal.warning'));
        }
        else{
          this.setUserType(user_type);
        }
        this.spinner.hide();
      },error=>{
        this.spinner.hide();
      });
    }
  }

  setPredefinedUsers(item, value, i: number) {
    if(this.model.id && !value && (item.title == 'CSR Buyer' || item.title == 'CSR Seller' || item.title == 'Inhouse Agent' ||  item.title == 'Outside Agent')){
      let input = {
        all: 0,
        admin_id: this.model.id,
        can_csr_buyer: item.title == 'CSR Buyer' ? 1 : 0,
        can_csr_seller: item.title == 'CSR Seller' ? 1 : 0,
        can_in_house_broker: item.title == 'Inhouse Agent' ? 1 : 0,
        can_credit_agent: item.title == 'Outside Agent' ? 1 : 0,
      }
      this.spinner.show();
      this.admin.postDataApi('checkLeadAssign', input).subscribe(r => {
        if(r.success != '1'){
          this.predefinedUsers[i].value = true;
          this.toastr.warning(this.translate.instant('message.error.thisUserHasLeadsAssignedPleaseDeleteTheDependenciesFirst'), this.translate.instant('swal.warning'));
        }
        else{
      this.model[item.key] = value;
      this.predefinedUsers[i].value = value;
        }
        this.spinner.hide();
      },error=>{
        this.predefinedUsers[i].value = true;
        this.spinner.hide();
      });
    }
    else{
      this.model[item.key] = value;
      this.predefinedUsers[i].value = value;
    }
  }

  setUserType(user_type: number,) {
    this.model.user_type = user_type;
    if (user_type == 2) {
      this.predefinedUsers = [
        {
          title: this.translate.instant('addForm.CSRBuyer'),
          key: 'is_buyer_renter',
          value: this.model.is_buyer_renter
        }, {
          title: this.translate.instant('addForm.CSRRenter'),
          key: 'is_csr_renter',
          value: this.model.is_csr_renter
        }, {
          title: this.translate.instant('addForm.inhouseAgent'),
          key: 'is_broker',
          value: this.model.is_broker
        },
        {
          title: this.translate.instant('addForm.outSideAgent'),
          key: 'is_external_agent',
          value: this.model.is_external_agent
        }, {
          title: this.translate.instant('addForm.CSRSeller'),
          key: 'is_broker_seller_dev',
          value: this.model.is_broker_seller_dev
        }, {
          title: this.translate.instant('addForm.dataCollector'),
          key: 'is_data_collector',
          value: this.model.is_data_collector
        }, {
          title: this.translate.instant('addForm.CSRClosure'),
          key: 'is_csr_closer',
          value: this.model.is_csr_closer
        }, {
          title: this.translate.instant('addForm.collectionAgent'),
          key: 'is_collection_agent',
          value: this.model.is_collection_agent
        }, {
          title: this.translate.instant('addForm.creditAgent'),
          key: 'is_credit_agent',
          value: this.model.is_credit_agent
        },{
          title: this.translate.instant('addForm.allianceAgent'),
          key: 'is_alliance_agent',
          value: this.model.is_alliance_agent
        }, {
          title: this.translate.instant('addForm.cordinatorAgent'),
          key: 'is_cordinator',
          value: this.model.is_cordinator
        }, {
          title: this.translate.instant('addForm.manageCommissions'),
          key: 'can_manage_commission',
          value: this.model.is_cordinator
        }

        // {
        //   title: this.translate.instant('addForm.developerName'),
        //   key: 'is_developer',
        //   value: this.model.is_developer || false
        // }
      ];
    } else {  
      this.predefinedUsers = [
        {
          title: this.translate.instant('addForm.acl'),
          key: 'is_acl',
          value: this.model.is_acl
        }
      ];
    }
  }
  getPage(page: any) {
    this.parameter.p = page;
    this.getInhouseUsers();
  }

  closeModal() {
    this.modalClose.nativeElement.click();
    this.emptyModel();
  }

  emptyModel() {
    this.model.country_code = this.constant.country_code;
    this.model.dial_code = this.constant.dial_code;
    this.model = new UserModel();
    this.initialCountry = { initialCountry: this.constant.initialCountry };
    this.disabledBuildings = [];

  }

  closeViewModal() {
    this.viewModalClose.nativeElement.click();
    this.emptyModel();
  }

  removeAddressObj(index) {
    this.model.address.splice(index, 1);
    this.disabledBuildings.splice(index, 1);
  }

  addEmptyObj() {
    this.addressIndex = this.model.address.length;
    this.addressIndex--;
    if (this.model.address[this.addressIndex].countries !== '' && this.model.address[this.addressIndex].states !== '' &&
      this.model.address[this.addressIndex].cities !== '' && this.model.address[this.addressIndex].localities !== '' &&
      this.model.address[this.addressIndex].buildings !== '') {
      const obj = {
        countries: '',
        states: '',
        cities: '',
        localities: '',
        buildings: ''
      };
      this.addressIndex++;
      this.model.address.push(obj);
    } else {
      swal('Missing fields', 'Complete current row before adding new.', 'error');
    }
  }

  disabledBuildingId(i) {
    this.disabledBuildings[i] = this.model.address[i].localities;
  }

  onCountryChange(e) {
    this.model.country_code = e.iso2;
    this.model.dial_code = '+' + e.dialCode;
    this.initialCountry = { initialCountry: e.iso2 };
  }

  showAclAddPage() {
    this.router.navigate(['/dashboard/access-control-mgt/add-acl-user', 0]);
  }
  testRoute(){
    const path = this.parameter.userType === 'outside-broker'
    this.router.navigate(['/dashboard/view-inhouse-users/outside-broker/out-side-add',0]);
  }
  openAddModal() {
    this.model.address = [];
    this.model.img_loader = false;
    // this.parameter.countries ? this.parameter.countries[0].id : 0;
    const obj = {
      countries: this.parameter.countries && this.parameter.countries[0] ? this.parameter.countries[0].id : 0,
      states: '0',
      cities: '0',
      localities: '0',
      buildings: '0'
    };
    this.model.address[0] = obj;

    switch (this.parameter.userType) {
      case 'data-collectors':
        this.parameter.url = 'getDataCollectors';
        this.model.is_data_collector = true;
        break;

      case 'csr-sellers':
        this.parameter.url = 'getCsrSellers';
        this.model.is_broker_seller_dev = true;
        break;

      case 'csr-buyers':
        this.parameter.url = 'getCsrBuyers';
        this.model.is_buyer_renter = true;
        break;

      case 'inhouse-broker':
        this.parameter.url = 'getInhouseBroker';
        this.model.is_broker = true;
        // this.model.is_external_agent = false;
        break;

      case 'outside-broker':
        this.parameter.url = 'getInhouseBroker';
        // this.model.is_broker = false;
        this.model.is_external_agent = true;
        break;

      case 'csr-closers':
        this.parameter.url = 'getCsrClosers';
        this.model.is_csr_closer = true;
        break;

      case 'csr-renters':
        this.parameter.url = 'getCsrRenter';
        this.model.is_csr_renter = true;
        break;


      case 'credit-agents':
        this.parameter.url = 'getCreditAgent';
        this.model.is_credit_agent = true;
        break;


      case 'collection-agents':
        this.parameter.url = 'getCollectionAgent';
        this.model.is_collection_agent = true;
        break;

      default:
        this.parameter.url = 'getDataCollectors';
        this.model.is_data_collector = true;
        break;
    }

    this.model.country_code = this.constant.country_code;
    this.model.dial_code = this.constant.dial_code;
    // this.initialCountry = { initialCountry: this.constant.initialCountry };

    this.inhouseUserModalOpen.nativeElement.click();
  }

  telInputObject(obj) {
    this.obj = obj;
  }

  setAgency(id: string) {
    this.model.agency = new Agency();
    this.model.agency.id = id;
  }
  addManagerNote() {
      this.outhouseUserModalOpen.nativeElement.click();
  }
  
  changeListner(event: any, paramLoader: string, param: any) {
    if (event.target.files[0].size > this.constant.fileSizeLimit) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.fileSizeExceeds'), 'error');
      return false;
    }
    this.model[paramLoader] = true;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.model[param] = e.target.result;
      this.cs.saveImage(event.target.files[0]).subscribe(
        success => {
          this.model[paramLoader] = false;
          this.model[param] = success['data'].image;
        }
      );
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  addNewUser(formdata: NgForm) {
    if (this.model.img_loader) {
      swal(this.translate.instant('swal.error'), 'Uploading image.', 'error');
      return false;
    }
    this.parameter.url = this.model.id ? 'updateNewUser' : 'addNewUser';
    this.seenDuplicate = false;
    const input = new FormData();
    if (this.model.id !== '') { input.append('id', this.model.id); }

    input.append('name', this.model.name);
    input.append('country_code', this.model.country_code ? this.model.country_code : this.constant.dial_code);
    input.append('dial_code', this.model.dial_code ? this.model.dial_code : this.constant.dial_code);
    input.append('phone', this.model.phone);
    input.append('email', this.model.email);
    input.append('address', JSON.stringify(this.model.address));
    input.append('is_broker_seller_dev', formdata.value.is_broker_seller_dev === true ? '1' : '0');
    input.append('is_buyer_renter', formdata.value.is_buyer_renter === true ? '1' : '0');
    // input.append('is_broker', formdata.value.is_broker === true ? '1' : '0');
    input.append('is_broker', this.model.is_broker ? '1' : '0');
    input.append('is_data_collector', formdata.value.is_data_collector === true ? '1' : '0');
    input.append('is_csr_closer', formdata.value.is_csr_closer === true ? '1' : '0');
    input.append('is_external_agent', this.model.is_external_agent ? '1' : '0');
    input.append('is_credit_agent', this.model.is_credit_agent ? '1' : '0');
    input.append('is_collection_agent', this.model.is_collection_agent ? '1' : '0');
    input.append('is_csr_renter', this.model.is_csr_renter ? '1' : '0');

    if ((this.parameter.userType == 'outside-broker' || this.model.is_external_agent) && (this.model.is_company == 'false')) {
      input.append('adr', this.model.adr || '');
      input.append('lat', this.model.lat);
      input.append('lng', this.model.lng);
      input.append('rfc_legal_id', this.model.rfc_legal_id || '');
      input.append('description', this.model.description || '');
    }

    if (this.model.is_external_agent) {
      input.append('agency_id', this.model.agency.id);
    } else {
      // input.append('is_broker', '1');
      input.append('company_name', '');
      input.append('company_logo', '');
      input.append('description', '');
      input.append('adr', '');
      input.append('lat', '');
      input.append('lat', '');
      input.append('branches', JSON.stringify([]));
    }
    if (this.model.image) { input.append('image', this.model.image); }

    // checking if locality is same or not
    this.model.address.map((item) => {
      let value = item['buildings'];
      value = value.toString();
      if (value === '0') {
        this.testObject.push(value);
      } else {
        if (this.testObject.indexOf(value) === -1) {
          this.testObject.push(value);
        } else {
          this.seenDuplicate = true;
        }
      }
    });
    if (this.model.address[0].countries === '' || this.model.address[0].states === '' ||
      this.model.address[0].cities === '' || this.model.address[0].localities === '' || this.model.address[0].buildings === '') {
      swal(this.translate.instant('swal.error'), 'Please choose location.', 'error');
    } else if (this.seenDuplicate) {
      this.testObject = [];
      this.seenDuplicate = false;
      swal(this.translate.instant('swal.error'), 'Please choose different localities.', 'error');
    } else if ((formdata.value.is_broker_seller_dev === false && formdata.value.is_buyer_renter === false &&
      formdata.value.is_broker === false && formdata.value.is_data_collector === false &&
      formdata.value.is_csr_closer === false && formdata.value.is_external_agent === false) ||
      (formdata.value.is_broker_seller_dev === null && formdata.value.is_buyer_renter === null &&
        formdata.value.is_broker === null && formdata.value.is_data_collector === null &&
        formdata.value.is_csr_closer === null && formdata.value.is_external_agent === null)) {
      swal(this.translate.instant('swal.error'), 'Please choose a role for inhouse user.', 'error');
    } else {
      this.spinner.show();
      this.admin.postDataApi(this.parameter.url, input)
        .subscribe(
          success => {
            this.spinner.hide();
            if (success.success === '0') {
              swal(this.translate.instant('swal.error'), success.message, 'error');
            } else {
              this.modalClose.nativeElement.click();
              const text = this.model.id ? 'Updated successfully.' : 'Added successfully.';
              swal(this.translate.instant('swal.success'), text, 'success');
              if (this.model.id) {
                // edit -- replace
                this.parameter.items[this.parameter.index] = success.data;
                formdata.reset();
                this.getInhouseUsers();
              } else {
                // add - push
                if ((formdata.value.is_broker_seller_dev === true && this.parameter.userType === 'csr-sellers') ||
                  (formdata.value.is_buyer_renter === true && this.parameter.userType === 'csr-buyers') ||
                  (formdata.value.is_broker === true && this.parameter.userType === 'inhouse-broker') ||
                  (formdata.value.is_external_agent === true && this.parameter.userType === 'outside-broker') ||
                  (formdata.value.is_data_collector === true && this.parameter.userType === 'data-collectors') ||
                  (formdata.value.is_csr_renter === true && this.parameter.userType === 'csr-renters') ||
                  (formdata.value.is_credit_agent === true && this.parameter.userType === 'credit-agents') ||
                  (formdata.value.is_collection_agent === true && this.parameter.userType === 'collection-agents') ||
                  (formdata.value.is_csr_closer === true && this.parameter.userType === 'csr-closers')) {
                  this.parameter.items.push(success.data);
                  this.parameter.total++;
                }
                formdata.reset();
              }
              this.emptyModel();
              this.getInhouseUsers();
            }
          }, error => {
            this.spinner.hide();
          });
    }
  }

  setIsCompany(is_company: string) {
    this.model.is_company = is_company;
  }

  getACLById(id: string) {
    this.router.navigate(['/dashboard/access-control-mgt/add-acl-user', id]);
  }

  editUser(userdata, index) {
    this.spinner.show();
    this.model.img_loader = false;
    this.admin.postDataApi('getNewUserById', { id: userdata.id }).subscribe(r => {
      this.spinner.hide();
      userdata = r['data'];
      this.parameter.index = index;
      this.model.address = [];
      this.model.id = userdata.id;
      this.model.name = userdata.name;
      this.model.email = userdata.email;
      this.model.phone = userdata.phone;
      if (userdata.agency_id != null && userdata.agency_id != 0) {
        this.model.is_company = 'true';
      } else {
        this.model.is_company = 'false';
      }
      this.model.country_code = userdata.country_code;
      if (this.obj) {
        this.obj.intlTelInput('setCountry', this.model.country_code ? this.model.country_code : this.constant.country_code);
      }
      // this.model.company_name = userdata.company_name;
      this.model.description = userdata.description;
      this.model.is_external_agent = userdata.is_external_agent;
      this.model.agency = userdata.agency ? userdata.agency : new Agency();
      this.model.adr = userdata.address;
      this.model.lat = userdata.lat;
      this.model.lng = userdata.lng;
      this.model.rfc_legal_id = userdata.rfc_legal_id;

      // branch
      // if (userdata.branches && userdata.branches.length > 0) {
      //   this.model.branch_office = userdata.branches[0].address;
      //   this.model.branch_lat = userdata.branches[0].lat;
      //   this.model.branch_lng = userdata.branches[0].lng;
      // }

      this.model.image = userdata.image != null ? userdata.image : '';
      this.model.is_broker_seller_dev = userdata.permissions && userdata.permissions.can_csr_seller === 1 ? true : false;
      this.model.is_buyer_renter = userdata.permissions && userdata.permissions.can_csr_buyer === 1 ? true : false;
      this.model.is_broker = userdata.permissions && userdata.permissions.can_in_house_broker === 1 ? true : false;
      this.model.is_data_collector = userdata.permissions && userdata.permissions.can_data_collector === 1 ? true : false;
      this.model.is_csr_closer = userdata.permissions && userdata.permissions.can_csr_closer === 1 ? true : false;
      this.model.is_external_agent = userdata.is_external_agent && userdata.is_external_agent.toString() === '1' ? true : false;
      this.model.is_csr_renter = userdata.permissions && userdata.permissions.can_csr_renter === 1 ? true : false;
      this.model.is_collection_agent = userdata.permissions && userdata.permissions.can_collection_agent === 1 ? true : false;
      this.model.is_credit_agent = userdata.permissions && userdata.permissions.can_credit_agent === 1 ? true : false;

      for (let ind = 0; ind < userdata.countries.length; ind++) {
        const tempAdd = {
          countries: userdata.countries[ind].id.toString(),
          states: userdata.states !== null && userdata.states[ind] ? userdata.states[ind].id.toString() : '0',
          cities: userdata.cities !== null && userdata.cities[ind] ? userdata.cities[ind].id.toString() : '0',
          localities: userdata.localities !== null && userdata.localities[ind] ? userdata.localities[ind].id.toString() : '0',
          buildings: userdata.buildings !== null && userdata.buildings[ind] ? userdata.buildings[ind].id.toString() : '0'
        };
        this.model.address[ind] = tempAdd;
      }

      this.inhouseUserModalOpen.nativeElement.click();
    }, erorr => {
      this.spinner.hide();
    });
  }


  viewDetails(userdata, index) {
    this.model.address = [];
    this.viewModalOpen.nativeElement.click();

    this.model.is_broker_seller_dev = userdata.permissions && userdata.permissions.can_csr_seller === 1 ? true : false;
    this.model.is_buyer_renter = userdata.permissions && userdata.permissions.can_csr_buyer === 1 ? true : false;
    this.model.is_broker = userdata.permissions && userdata.permissions.can_in_house_broker === 1 ? true : false;
    this.model.is_external_agent = userdata.permissions && userdata.permissions.can_outside_broker === 1 ? true : false;
    this.model.is_data_collector = userdata.permissions && userdata.permissions.can_data_collector === 1 ? true : false;
    this.model.is_csr_closer = userdata.permissions && userdata.permissions.can_csr_closer === 1 ? true : false;
    this.model.is_csr_renter = userdata.permissions && userdata.permissions.can_csr_renter === 1 ? true : false;
    this.model.is_collection_agent = userdata.permissions && userdata.permissions.can_collection_agent === 1 ? true : false;
    this.model.is_credit_agent = userdata.permissions && userdata.permissions.can_credit_agent === 1 ? true : false;

    // for (let ind = 0; ind < userdata.countries.length; ind++) {
    //   const tempAdd = {
    //     countries: userdata.countries[ind].id.toString(),
    //     states: userdata.states !== null && userdata.states[ind] ? userdata.states[ind].id.toString() : '0',
    //     cities: userdata.cities !== null && userdata.cities[ind] ? userdata.cities[ind].id.toString() : '0',
    //     localities: userdata.localities !== null && userdata.localities[ind] ? userdata.localities[ind].id.toString() : '0',
    //     buildings: userdata.buildings !== null && userdata.buildings[ind] ? userdata.buildings[ind].id.toString() : '0'
    //   };
    //   this.model.address[ind] = tempAdd;
    // }
    // updateNewUser
  }

  resetFilters() {
    this.parameter.countries = JSON.parse(JSON.stringify(this.parameter.countries));
    this.getStates('-1');
    this.parameter.p = this.constant.p;
    this.parameter.total = 0;
    this.getInhouseUsers();
  }

  getCountries() {
    this.parameter.countries = [];
    this.parameter.country_id = '-1';
    this.parameter.states = []; this.parameter.cities = []; this.parameter.localities = []; this.parameter.buildings = [];
    this.parameter.state_id = '-1'; this.parameter.city_id = '-1'; this.parameter.locality_id = '-1'; this.parameter.building_id = '-1';

    this.admin.postDataApi('getCountryLocality', {}).subscribe(r => {
      this.parameter.countries = r['data'];
    });
  }

  getStates(country_id) {
    this.parameter.country_id = country_id;
    this.parameter.states = []; this.parameter.cities = []; this.parameter.localities = []; this.parameter.buildings = [];
    this.parameter.state_id = '-1'; this.parameter.city_id = '-1'; this.parameter.locality_id = '-1'; this.parameter.building_id = '-1';

    if (!country_id || country_id === '-1') {
      return false;
    }
    const selectedCountry = this.parameter.countries.filter(x => x.id.toString() === country_id);
    this.parameter.states = selectedCountry[0].states;

  }

  getCities(state_id) {
    this.parameter.cities = []; this.parameter.localities = []; this.parameter.buildings = [];
    this.parameter.city_id = '-1'; this.parameter.locality_id = '-1'; this.parameter.building_id = '-1';

    if (!state_id || state_id === '-1') {
      return false;
    }
    this.parameter.state_id = state_id;
    const selectedState = this.parameter.states.filter(x => x.id.toString() === state_id);
    this.parameter.cities = selectedState[0].cities;
  }

  getLocalities(city_id) {
    this.parameter.localities = []; this.parameter.buildings = [];
    this.parameter.locality_id = '-1'; this.parameter.building_id = '-1';

    if (!city_id || city_id === '-1') {
      return false;
    }
    this.parameter.city_id = city_id;
    const selectedCountry = this.parameter.cities.filter(x => x.id.toString() === city_id);
    this.parameter.localities = selectedCountry[0].localities;
  }


  getLocalityBuildings(locality_id) {
    this.parameter.url = 'getLocalityBuildings';
    this.parameter.locality_id = locality_id;

    this.parameter.buildings = [];
    this.parameter.building_id = '-1';

    const input = new FormData();
    input.append('locality_id', locality_id);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.parameter.buildings = success.data;
        });
  }

  setBuilding(building_id: string) {
    this.parameter.building_id = building_id;
  }

  searchUserByName(name: string) {
    this.parameter.name = name;
    this.getInhouseUsers();
  }
  searchUserByCompanyName(company_name: string) {
    this.parameter.company_name = company_name;
    this.getInhouseUsers();
  }
  searchUserByEmail(email: string) {
    this.parameter.email = email;
    this.getInhouseUsers();
  }
  searchUserByPhone(phone: string) {
    this.parameter.phone = phone;
    this.getInhouseUsers();
  }
  setIsFreelancer(is_freelancer: string) {
    this.parameter.is_freelancer = is_freelancer;
    this.getInhouseUsers();
  }

  setLeadSort() {
    this.lead_sort = this.lead_sort === 2 ? 1 : 2;
    this.property_sort = null;
    this.getInhouseUsers();
  }
  setPropertiesSort() {
    this.property_sort = this.property_sort === 2 ? 1 : 2;
    this.lead_sort = null;
    this.getInhouseUsers();
  }
  setBrokerType(is_external_agent: string) {
    this.model.is_external_agent = is_external_agent === '1' ? true : false;
    this.getInhouseUsers();
  }
  setBrokerForModel(is_external_agent: string) {
    this.model.is_external_agent = is_external_agent === '1' ? true : false;
  }
  setAgentType(key: string, key2: string, value: number) {
    this.model[key] = this.model[key] ? false : true;
    this.model[key2] = false;
  }
  getInhouseUsers() {
    switch (this.parameter.userType) {
      case 'data-collectors':
        this.parameter.url = 'getDataCollectors';
        this.title = 'Data Collectors';
        this.parameter.type = 1;
        break;

      case 'csr-sellers':
        this.parameter.url = 'getCsrSellers';
        this.title = 'CSR Sellers';
        this.parameter.type = 2;
        break;

      case 'csr-buyers':
        this.parameter.url = 'getCsrBuyers';
        this.title = 'CSR Buyers';
        this.parameter.type = 3;
        break;

      case 'inhouse-broker':
        this.parameter.url = 'getInhouseBroker';
        this.title = 'Inhouse Agents';
        this.parameter.type = 4;
        this.model.is_external_agent = false;
        // this.model.is_external_agent = false;
        // this.is_external_agent = '0';
        break;

      case 'outside-broker':
        this.parameter.url = 'getInhouseBroker';
        this.title = 'Outside Agents';
        this.parameter.type = 4;
        this.model.is_external_agent = true;
        // this.is_external_agent = '1';
        break;

      case 'csr-closers':
        this.parameter.url = 'getCsrClosers';
        this.title = 'CSR Closures';
        this.parameter.type = 5;
        break;

      case 'csr-renters':
        this.parameter.url = 'getCsrRenter';
        this.title = 'CSR Renters';
        this.parameter.type = 6;
        break;

      case 'credit-agents':
        this.parameter.url = 'getCreditAgent';
        this.title = 'Credit Agents';
        this.parameter.type = 7;
        break;

      case 'collection-agents':
        this.parameter.url = 'getCollectionAgent';
        this.title = 'Collection Agents';
        this.parameter.type = 8;
        break;

      case 'alliance-agents':
        this.parameter.url = 'getAllianceAgent';
        this.title = this.language_code == 'en' ? 'Alliance Agent' : 'Agente Alianza';
        this.parameter.type = 9;
        break;

      case 'cordinator-agents':
        this.parameter.url = 'getCordinators';
        this.title = this.language_code == 'en' ? 'Cordinator Agent' : 'Agente Coordinador';
        this.parameter.type = 9;
        break;

      default:
        this.parameter.url = 'getDataCollectors';
        this.parameter.type = 1;
        break;
    }

    const input = new FormData();
    input.append('page', this.parameter.p.toString());
    if (this.lead_sort) { input.append('lead_sort', this.lead_sort.toString()); }
    if (this.property_sort) { input.append('property_sort', this.property_sort.toString()); }
    if (this.parameter.name) { input.append('name', this.parameter.name); }
    if (this.parameter.email) { input.append('email', this.parameter.email); }
    if (this.parameter.phone) { input.append('phone', this.parameter.phone); }
    if (this.parameter.company_name) { input.append('company_name', this.parameter.company_name); }
    if (this.parameter.is_freelancer) { input.append('is_freelancer', this.parameter.is_freelancer); }
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
    if (this.parameter.building_id && this.parameter.building_id !== '-1') {
      input.append('buildings', JSON.stringify([this.parameter.building_id]));
    }
    input.append('is_external_agent', this.model.is_external_agent === true ? '1' : '0');
    if (this.parameter.id) { input.append('id', this.parameter.id); }
    this.spinner.show();
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.spinner.hide();
          this.parameter.items = success.data;
          this.parameter.total = success.total;
        }, error => {
          this.spinner.hide();
        });
  }

  getAllAgencies() {
    this.admin.postDataApi('getAllAgencies', {})
      .subscribe(
        success => {
          this.agencies = success.data;
        });
  }

  getOuthouseUsers(){
    const input = new FormData();
    input.append('page', this.parameter.p.toString());
    if (this.lead_sort) { input.append('lead_sort', this.lead_sort.toString()); }
    if (this.property_sort) { input.append('property_sort', this.property_sort.toString()); }
    if (this.parameter.name) { input.append('name', this.parameter.name); }
    if (this.parameter.email) { input.append('email', this.parameter.email); }
    if (this.parameter.phone) { input.append('phone', this.parameter.phone); }
    if (this.parameter.company_name) { input.append('company_name', this.parameter.company_name); }
    if (this.parameter.is_freelancer) { input.append('is_freelancer', this.parameter.is_freelancer); }
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
    if (this.parameter.building_id && this.parameter.building_id !== '-1') {
      input.append('buildings', JSON.stringify([this.parameter.building_id]));
    }
    input.append('is_external_agent', this.model.is_external_agent === true ? '1' : '0');
    if (this.parameter.id) { input.append('id', this.parameter.id); }
    this.admin.postDataApi('getOutsideAgent',input)
    .subscribe(
      success => {
        this.spinner.hide();
        this.parameter.records = success.data;
        this.parameter.total = success.total;
      }, error => {
        this.spinner.hide();
      });
  }

 
  onFileChange(event: any, paramLoader: string, paramFile: string) {
    if (event.target.files && event.target.files[0]) {
      this.model[paramLoader] = true;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this[paramFile] = e.target.result;
        this.cs.saveImage(event.target.files[0]).subscribe(
          success => {
            this.model[paramLoader] = false;
            this.model[paramFile] = success['data'].image;
          }
        );
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }


  addNewOutsideUser(formdata: NgForm) {
    const outside_agent = 1;
    const predefinedRole = 2;
    const is_external_agent = 1;
    let acl = [{"acl_id":1,"acl":{"name":"Dashboard"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":2,"acl":{"name":"Inhouse Agent Management"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":3,"acl":{"name":"Seller Management"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":4,"acl":{"name":"Bank Management"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":5,"acl":{"name":"Notaries Management"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":6,"acl":{"name":"User Management"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":7,"acl":{"name":"Data Collector Management"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":9,"acl":{"name":"Property Management"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":10,"acl":{"name":"Project Management"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":11,"acl":{"name":"Enquiries"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":12,"acl":{"name":"Manage Localities"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":13,"acl":{"name":"Admin Defaults"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":14,"acl":{"name":"Access Controls"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":15,"acl":{"name":"Buyer Management"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":16,"acl":{"name":"Closer Management"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":17,"acl":{"name":"Notary Lead Management"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":18,"acl":{"name":"Data Collector Lead Management"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":19,"acl":{"name":"Seller Lead Management"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":20,"acl":{"name":"Buyer Lead Management"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":21,"acl":{"name":"Inhouse Agent Lead Management"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":22,"acl":{"name":"Closer Lead Management"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":23,"acl":{"name":"Reports"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":24,"acl":{"name":"Manual Leads"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":25,"acl":{"name":"Templates"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":26,"acl":{"name":"Settings"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":27,"acl":{"name":"Bank Lead Management"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":28,"acl":{"name":"Appointments"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":29,"acl":{"name":"Notifications"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":30,"acl":{"name":"Developers Management"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":31,"acl":{"name":"Outside Agent Management"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":32,"acl":{"name":"Outside Agent Lead Management"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":33,"acl":{"name":"Agencies Management"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":34,"acl":{"name":"Companies Management"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":35,"acl":{"name":"Managers Management"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":36,"acl":{"name":"Manage Legal Entity"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":37,"acl":{"name":"Manage Collections"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":38,"acl":{"name":"Collection Reports"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":39,"acl":{"name":"Renter Management"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":40,"acl":{"name":"Collection Agent Management"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":41,"acl":{"name":"Credit Agent Management"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":42,"acl":{"name":"Renter Lead Management"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":43,"acl":{"name":"Credit Agent Lead Management"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":44,"acl":{"name":"Collection Agent Lead Management"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":45,"acl":{"name":"Manage Credits"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":46,"acl":{"name":"Alliance Agent Management"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":47,"acl":{"name":"Cordinator Agent Management"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":48,"acl":{"name":"Manage Commission"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1},{"acl_id":49,"acl":{"name":"Properties For Sale Management"},"show":false,"can_create":1,"can_update":1,"can_read":1,"can_delete":1,"can_purge":1,"can_crud":1}]
    if (this.model.img_loader || this.model.logo_loader) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.uploadingImage'), 'error');
      return false;
    }
    const input = new FormData();
    this.parameter.url = this.model.id ? 'updateAclUser' : 'addAclUser';
    this.seenDuplicate = false;
    if (this.model.id !== '') { input.append('id', this.model.id); }
    input.append('outside_agent', outside_agent.toString());
    input.append('user_type', predefinedRole.toString());
    input.append('name', this.model.name);
    input.append('first_surname', this.model.first_surname || '');
    input.append('second_surname', this.model.second_surname || '');
    input.append('is_broker_seller_dev', this.model.is_broker_seller_dev ? '1' : '0');
    input.append('is_buyer_renter', this.model.is_buyer_renter ? '1' : '0');
    input.append('is_broker', this.model.is_broker ? '1' : '0');
    input.append('is_data_collector', this.model.is_data_collector ? '1' : '0');
    input.append('is_csr_closer', this.model.is_csr_closer ? '1' : '0');
    input.append('is_external_agent', is_external_agent.toString());
    input.append('is_credit_agent', this.model.is_credit_agent ? '1' : '0');
    input.append('is_collection_agent', this.model.is_collection_agent ? '1' : '0');
    input.append('is_csr_renter', this.model.is_csr_renter ? '1' : '0');
    input.append('is_alliance_agent', this.model.is_alliance_agent ? '1' : '0');
    input.append('is_cordinator', this.model.is_cordinator ? '1' : '0');
    input.append('admin_acl', JSON.stringify(acl));
    if (this.model.phone) {
      input.append('country_code', this.model.country_code ? this.model.country_code : this.constant.dial_code);
      input.append('dial_code', this.model.dial_code ? this.model.dial_code : this.constant.dial_code);
      input.append('phone', this.model.phone);
    }
    if (this.model.email) {
      input.append('email', this.model.email);
    }
    if (this.model.is_company == 'true') {
      input.append('agency_id', this.model.agency.id.toString());
    
  } else {
    input.append('address', this.model.addresss || '');
      input.append('lat', this.model.lat);
      input.append('lng', this.model.lng);
      input.append('rfc_legal_id', this.model.rfc_legal_id);
      input.append('description', this.model.description || '');
  }

    if (this.model.image) { input.append('image', this.model.image); }
    if (this.model.logo) { input.append('logo', this.model.logo); }

  
   
    this.spinner.show();
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.spinner.hide();
          if (success.success === '0') {
            swal(this.translate.instant('swal.error'), success.message, 'error');
          } else {
            this.modalClose.nativeElement.click();
            const text = this.model.id ?
              this.translate.instant('message.success.updatedSuccessfully') :
              this.translate.instant('message.success.addedSuccessfully');
            swal(this.translate.instant('swal.success'), text, 'success');
            if (this.model.id) {
              this.records[this.parameter.index] = success.data;
              this.getInhouseUsers();
            } else {
              this.modalClose.nativeElement.click();
              const text = this.model.id ?
                this.translate.instant('message.success.updatedSuccessfully') :
                this.translate.instant('message.success.addedSuccessfully');
              swal(this.translate.instant('swal.success'), text, 'success');
              if (this.model.id) {
                this.records[this.parameter.index] = success.data;
              } else {
                this.parameter.records.push(success.data);
                this.parameter.total++;
              }
              formdata.reset();
              this.emptyModel();
              this.getInhouseUsers();
            }
            formdata.reset();
            this.emptyModel();
            this.getInhouseUsers();
          }
        }, error => {
          this.spinner.hide();
        });
  }

  getOutsideAgentById(userdata: UserModel, index: any) {
    this.parameter.index = index;
    this.model = userdata;
    this.model.company = userdata.company ? userdata.company : new Company();
    this.image = userdata.image;
    this.logo = userdata.logo;
    if (userdata.agency_id != null && userdata.agency_id != 0) {
      this.model.is_company = 'true';
    } else {
      this.model.is_company = 'false';
    }
    this.user_type = userdata.user_type;
    this.model.rfc_legal_id = userdata.rfc_legal_id && userdata.rfc_legal_id != 'null' ? userdata.rfc_legal_id : '';
    this.model.address = userdata.address;
    this.model.lat = userdata.lat;
    this.model.lng = userdata.lng;
    this.model.img_loader = false; this.model.logo_loader = false;
    if (this.obj) {
      this.obj.intlTelInput('setCountry', this.model.country_code ? this.model.country_code : this.constant.country_code);
    }
    this.outhouseUserModalOpen.nativeElement.click();
  }

  addRow() {
    const obj = {
      countries: '',
      states: '',
      cities: '',
      localities: '',
      buildings: ''
    };

    this.model.address.push(obj);
  }


  blockUnblockPopup(index, id, flag, user_type) {
    this.parameter.index = index;
    switch (flag) {
      case 0:
        this.parameter.text = this.translate.instant('message.error.wantToUnblockUser');
        this.parameter.successText = this.translate.instant('message.success.unblockedSuccessfully');
        break;
      case 1:
        this.parameter.text = this.translate.instant('message.error.wantToBlockUser');
        this.parameter.successText = this.translate.instant('message.success.blockedSuccessfully');
        break;
    }

    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.value) {
        this.blockAdmin(index, id, flag, user_type);
      }
    });
  }


  blockAdmin(index, id, flag, user_type) {
    // this.spinner.show();
    this.parameter.url = 'blockAdmin';
    const input = new FormData();
    input.append('id', id);
    input.append('flag', flag);
    input.append('user_type', user_type);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.spinner.hide();
          swal(this.translate.instant('swal.success'), this.parameter.successText, 'success');
          this.parameter.items[this.parameter.index]['is_blocked'] = flag;
          // this.parameter.items[this.parameter.index] = success.data;
        });
  }


  getCountryLocality() {
    this.admin.postDataApi('getCountryLocality', {}).subscribe(r => {
      this.parameter.countries = r['data'];
    });
  }


  onCountryChange1(id) {
    this.parameter.cities = []; this.parameter.city_id = '0';
    this.parameter.localities = []; this.parameter.locality_id = '0';
    if (!id || id === 0) {
      this.parameter.state_id = '0';
      return false;
    }

    this.parameter.country_id = id;
    const selectedCountry = this.parameter.countries.filter(x => x.id === id);
    this.parameter.states = selectedCountry[0].states;
  }

  onStateChange(id) {
    this.parameter.localities = []; this.parameter.locality_id = '0';
    if (!id || id === 0) {
      this.parameter.city_id = '0';
      return false;
    }

    this.parameter.state_id = id;
    const selectedState = this.parameter.states.filter(x => x.id === id);
    this.parameter.cities = selectedState[0].cities;
  }

  onCityChange(id) {
    if (!id || id === 0) {
      this.parameter.locality_id = '0';
      return false;
    }

    this.parameter.city_id = id;
    const selectedCountry = this.parameter.cities.filter(x => x.id === id);
    this.parameter.localities = selectedCountry[0].localities;
  }

  onLocalityChange(id) {
    if (!id || id === 0) {
      return false;
    }

    this.parameter.locality_id = id;
    // let selectedLocation = this.location.localities.filter(x=>x.id == id);
    // this.location.locality = selectedLocation[0];
  }


  loadPlaces(paramAdd: string, paramLat: string, paramLng: string, searchRef: any) {
    // load Places Autocomplete
    this.model[paramLat] = null;
    this.model[paramLng] = null;
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this[searchRef].nativeElement, {
        types: []
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          // const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          const place = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.model[paramLat] = place.geometry.location.lat();
          this.model[paramLng] = place.geometry.location.lng();
          if (place.formatted_address) {
            this.model[paramAdd] = place.formatted_address;
          }
        });
      });
    });
  }


  setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        // setting address lat lng
        // this.model.lat = position.coords.latitude;
        // this.model.lng = position.coords.longitude;

        // setting branch office lat lng
        // this.model.branch_lat = position.coords.latitude;
        // this.model.branch_lng = position.coords.longitude;
      });
    }
  }

  placeMarker($event: any, paramLat: string, paramLng: string, param: string) {
    this.model[paramLat] = $event.coords.lat;
    this.model[paramLng] = $event.coords.lng;
    this.getGeoLocation(this.model[paramLat], this.model[paramLng], param);
  }


  getGeoLocation(lat: number, lng: number, param: string) {
    if (navigator.geolocation) {
      const geocoder = new google.maps.Geocoder();
      const latlng = new google.maps.LatLng(lat, lng);
      const request = { latLng: latlng };

      geocoder.geocode(request, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          const result = results[0];
          if (result != null) {
            this.model[param] = result.formatted_address;
          } else {
            this.model[param] = lat + ',' + lng;
          }
        }
      });
    }
  }


  file1Select($event) {
    this.file1.onSelectFile($event);
  }

  modelOpenFun() {
    this.moreImgModalOpen.nativeElement.click();
    // this.file1.backup(JSON.parse(JSON.stringify(this.model.company_images)));
  }

  modelCloseFun() {
    this.moreImgModalClose.nativeElement.click();
  }

  saveImages() {
    if (this.file1.files.length < 1) {
      swal(this.translate.instant('swal.error'), 'Please select atleast one image', 'error'); return false;
    }
    this.moreImgModalClose.nativeElement.click();
    this.file1.upload().then(r => {
      // this.model.company_images = this.file1.files;
    });
  }

  deletePopup(item: any, index: number) {
    this.parameter.text = this.translate.instant('message.error.wantToDeleteUser');

    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.deleteNewUser(item, index);
      }
    });
  }

  deleteNewUser(item: any, index: number) {
    this.admin.postDataApi('deleteNewUser',
      { id: item.id }).subscribe(r => {
        swal(this.translate.instant('swal.success'), 'Deleted successfully.', 'success');
        this.parameter.items.splice(index, 1);
        this.parameter.total--;
      },
        error => {
          swal(this.translate.instant('swal.error'), error.error.message, 'error');
        });
  }

  showLeads(id: string) {
    let url = '';
    if (this.parameter.userType === 'csr-sellers') {
      url = '/dashboard/leads/csr-sellers-leads';
    } else if (this.parameter.userType === 'csr-buyers') {
      url = '/dashboard/leads/csr-buyers-leads';
    } else if (this.parameter.userType === 'inhouse-broker') {
      url = '/dashboard/leads/inhouse-broker-leads';
    } else if (this.parameter.userType === 'outside-broker') {
      url = '/dashboard/leads/outside-broker-leads';
    } else if (this.parameter.userType === 'csr-closers') {
      url = '/dashboard/leads/csr-closers-leads';
    }
    this.router.navigate([url, id]);
  }
  haveAccess(id: string){
    this.admin.postDataApi('updateOutsideAgentaccess', {id:id}).subscribe(r => {
      this.toastr.clear();
      this.toastr.success(this.translate.instant('message.success.access'), this.translate.instant('swal.success'));
      swal(this.translate.instant('swal.success'), this.translate.instant('message.success.outsideSuccessfully'), 'success');
    });
  }
  
  getNotes(item) {
     this.noted.agent_id = item.id;
    const input = { agent_id: item.id };
    this.admin.postDataApi('viewAgentNotes', input).subscribe(r => {
      this.parameter.notes = r.data;
      this.notesModalOpen.nativeElement.click();
    });
  }
  
  addNote() {
        this.spinner.show();
        this.admin.postDataApi('addOutsideAgentNote', { note: this.noted.note, title: this.noted.title,
           agent_id: this.noted.agent_id
        }).subscribe(r => {
          this.spinner.hide();
          this.noted = new Notes();
          this.parameter.notes.push(r.data);
          this.toastr.clear();
          this.toastr.success(this.translate.instant('message.success.addedSuccessfully'), this.translate.instant('swal.success'));
          this.closeNotesModal();
        }); 
  }

  closeNotesModal() {
    this.notesModalClose.nativeElement.click();
  }
  setTab(tab: any) {
    this.tab = tab;
  }
  deleteNote(note_id, index) {
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
    this.admin.postDataApi('deleteOutsideNotes', { id: note_id }).subscribe(r => {
      this.parameter.items.splice(index, 1);
      this.toastr.clear();
      this.toastr.success(this.translate.instant('message.success.deletedSuccessfully'), this.translate.instant('swal.success'));
      this.closeNotesModal();
    });
  }
}
