import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProperty } from 'src/app/common/property';
import { Constant } from 'src/app/common/constants';
import { CommonService } from 'src/app/services/common.service';
import { AdminService } from 'src/app/services/admin.service';
import { ACL, Permission } from 'src/app/models/acl.model';
import { TranslateService } from '@ngx-translate/core';
import { Agency } from 'src/app/models/agency.model';
import { MapsAPILoader } from '@agm/core';
import { User, Address, UserModel } from 'src/app/models/inhouse-users.model';
import { ToastrService } from 'ngx-toastr';

declare let swal: any;
declare const google;

@Component({
  selector: 'app-add-acl',
  templateUrl: './add-acl.component.html',
  styleUrls: ['./add-acl.component.css']
})
export class AddAclComponent implements OnInit {

  @ViewChild('search1') searchElementRef: ElementRef;
  showOutside: boolean;
  public parameter: IProperty = {};
  initialCountry: any;
  show = false;
  image: any;
  model: ACL;
  allAcl = [];
  addressIndex = 0;
  tempAdd: Object;
  disabledBuildings = [];
  seenDuplicate = false;
  permission_show = false;
  permission_all = false;
  testObject = [];
  agencies: Array<Agency>;
  predefinedUsers: Array<any>;
  selected_valo: Array<any>;
  user_type: any;
  external_agent: any;
  value: any;
  value13: any; isWorking = false;
  constructor(public constant: Constant, private cs: CommonService,
    private admin: AdminService, private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
    private translate: TranslateService,
    private toastr: ToastrService
  ) {
    this.admin.countryData$.subscribe(success => {
      this.parameter.allCountry = success;
    });
    this.admin.loginData$.subscribe(res => {
      this.parameter.admin_id = res['id'];
    });
  }

  ngOnInit() {
    this.model = new ACL();
    this.getCountries();
    this.model.img_loader = false;
    this.model.country_code = this.constant.country_code;
    this.model.dial_code = this.constant.dial_code;
    this.model.agency = new Agency();
    this.model.is_company = 'true';
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.p = this.constant.p;
    this.initialCountry = { initialCountry: this.constant.country_code };
    this.parameter.routeName = this.router.url;
    this.tempAdd = this.model.address;
    this.setCurrentPosition();
    this.model.address = [];
    this.model.img_loader = false;
    this.parameter.sub = this.route.params.subscribe(params => {
      if (params['id'] !== '0') {
        this.model.id = params['id'];
        this.getAclUserById(this.model.id, '');
      } else {
        this.model.id = '';
        this.getAclList();
      }
      this.getAllAgencies();
    });
  }



  set() {
    this.show = true;
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

  getAclList() {
    this.spinner.show();
    this.admin.postDataApi('getAclList', {})
      .subscribe(
        success => {
          this.allAcl = success.data;
          this.spinner.hide();
          success.data.forEach(element => {
            const e = new Permission();
            const acl = { name: element.name };
            e.acl_id = element.id; e.acl = acl; e.show = false;
            e.can_create = 1; e.can_update = 1; e.can_read = 1; e.can_delete = 1; e.can_purge = 1; e.can_crud = 1;
            this.model.admin_acl.push(e);
            this.model.admin_estend.push(e);
            this.permission_all = true;
          });
        }, error => {
          this.spinner.hide();
        });
  }

  expandBox(index: any) {
    this.model.admin_acl[index].show = this.model.admin_acl[index].show === true ? false : true;
    // this.model.admin_estend[index].show = this.model.admin_estend[index].show === true ? false : true;
  }

  setPermission(param: any, index: any) {
    if (param === 'can_crud') {
      this.model.admin_acl[index]['can_create'] = this.model.admin_acl[index]['can_crud'] === 1 ? 0 : 1;
      this.model.admin_acl[index]['can_read'] = this.model.admin_acl[index]['can_crud'] === 1 ? 0 : 1;
      this.model.admin_acl[index]['can_update'] = this.model.admin_acl[index]['can_crud'] === 1 ? 0 : 1;
      this.model.admin_acl[index]['can_delete'] = this.model.admin_acl[index]['can_crud'] === 1 ? 0 : 1;
      this.model.admin_acl[index]['can_purge'] = this.model.admin_acl[index]['can_crud'] === 1 ? 0 : 1;
      this.model.admin_acl[index]['can_crud'] = this.model.admin_acl[index]['can_crud'] === 1 ? 0 : 1;
      //another
      // this.model.admin_estend[index]['can_create'] = this.model.admin_estend[index]['can_crud'] === 1 ? 0 : 1;
      // this.model.admin_estend[index]['can_read'] = this.model.admin_estend[index]['can_crud'] === 1 ? 0 : 1;
      // this.model.admin_estend[index]['can_update'] = this.model.admin_estend[index]['can_crud'] === 1 ? 0 : 1;
      // this.model.admin_estend[index]['can_delete'] = this.model.admin_estend[index]['can_crud'] === 1 ? 0 : 1;
      // this.model.admin_estend[index]['can_purge'] = this.model.admin_estend[index]['can_crud'] === 1 ? 0 : 1;
      // this.model.admin_estend[index]['can_crud'] = this.model.admin_estend[index]['can_crud'] === 1 ? 0 : 1;
    } else {
      this.model.admin_acl[index][param] = this.model.admin_acl[index][param] &&
        this.model.admin_acl[index][param] === 1 ? 0 : 1;
      this.model.admin_acl[index]['can_crud'] = this.model.admin_acl[index]['can_create'] === 1 &&
        this.model.admin_acl[index]['can_read'] === 1 && this.model.admin_acl[index]['can_update'] === 1 &&
        this.model.admin_acl[index]['can_delete'] === 1 && this.model.admin_acl[index]['can_purge'] === 1 ? 1 : 0;

      //another
      // this.model.admin_estend[index][param] = this.model.admin_estend[index][param] &&
      //   this.model.admin_estend[index][param] === 1 ? 0 : 1;
      // this.model.admin_estend[index]['can_crud'] = this.model.admin_estend[index]['can_create'] === 1 &&
      //   this.model.admin_estend[index]['can_read'] === 1 && this.model.admin_estend[index]['can_update'] === 1 &&
      //   this.model.admin_estend[index]['can_delete'] === 1 && this.model.admin_estend[index]['can_purge'] === 1 ? 1 : 0;
    }
  }

  add(formdata: NgForm) {
    // if (this.model.adr && this.model.adr.trim() && !this.model.lat && !this.model.lng) {
    //   swal(this.translate.instant('swal.error'), 'Please choose address from dropdown.', 'error');
    //   return;
    // }
    // if (this.model.branch_office && this.model.branch_office.trim() && !this.model.branch_lat && !this.model.branch_lng) {
    //   swal(this.translate.instant('swal.error'), 'Please choose branch address from dropdown.', 'error');
    //   return;
    // }
    if (this.model.img_loader) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.uploadingImage'), 'error');
      return false;
    }
    if (this.model.is_broker && this.model.is_external_agent) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseSelectEitherInhouseOrOutsideAgent'), 'error');
      return false;
    }
    this.parameter.url = this.model.id ? 'updateAclUser' : 'addAclUser';
    this.seenDuplicate = false;
    const input = new FormData();
    if (this.model.id !== '') { input.append('id', this.model.id); }

    input.append('user_type', this.model.user_type);
    input.append('name', this.model.name);
    input.append('first_surname', this.model.first_surname ? this.model.first_surname : '');
    input.append('second_surname', this.model.second_surname ? this.model.second_surname : '');
    input.append('country_code', this.model.country_code ? this.model.country_code : this.constant.dial_code);
    input.append('dial_code', this.model.dial_code ? this.model.dial_code : this.constant.dial_code);
    input.append('phone', this.model.phone);
    input.append('email', this.model.email);
    input.append('address', JSON.stringify(this.model.address));
    input.append('is_broker_seller_dev', this.model.is_broker_seller_dev ? '1' : '0');
    input.append('is_buyer_renter', this.model.is_buyer_renter ? '1' : '0');
    input.append('is_broker', this.model.is_broker ? '1' : '0');
    input.append('is_data_collector', this.model.is_data_collector ? '1' : '0');
    input.append('is_csr_closer', this.model.is_csr_closer ? '1' : '0');
    input.append('is_external_agent', this.model.is_external_agent ? '1' : '0');
    input.append('is_credit_agent', this.model.is_credit_agent ? '1' : '0');
    input.append('is_collection_agent', this.model.is_collection_agent ? '1' : '0');
    input.append('is_csr_renter', this.model.is_csr_renter ? '1' : '0');
    input.append('is_alliance_agent', this.model.is_alliance_agent ? '1' : '0');
    input.append('is_cordinator', this.model.is_cordinator ? '1' : '0');
    input.append('contract_validator', this.model.contract_validator ? '1' : '0');
    input.append('contract_agent', this.model.contract_agent ? '1' : '0');
    input.append('can_csr_coordinator', this.model.can_csr_coordinator ? '1' : '0');
    input.append('can_credit_coordinator', this.model.can_credit_coordinator ? '1' : '0');
    input.append('can_content_creator', this.model.can_content_creator ? '1' : '0');
    input.append('have_access', '1');

    if (this.model.is_external_agent && this.model.is_company == 'false') {
      input.append('adr', this.model.adr || '');
      input.append('lat', this.model.lat || null);
      input.append('lng', this.model.lng || null);
      input.append('rfc_legal_id', this.model.rfc_legal_id || '');
      input.append('description', this.model.description || '');
      input.append('agency_id', '');
    }

    if (this.model.is_external_agent && this.model.is_company == 'true') {
      input.append('agency_id', this.model.agency.id);
    } else {
      input.append('company_name', '');
      input.append('company_logo', '');
      input.append('description', '');
      input.append('adr', '');
      input.append('lat', '');
      input.append('lat', '');
      input.append('branches', JSON.stringify([]));
    }
    if (this.model.image) { input.append('image', this.model.image); }
    // console.log(this.model.admin_acl, "this.model.admin_acl");
    // console.log(this.model.admin_estend, "this.model.admin_estend");
    input.append('admin_acl', JSON.stringify(this.model.admin_acl));

    //input.append('admin_acl', JSON.stringify(this.model.admin_estend));
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
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseLocation'), 'error');
    } else if (this.seenDuplicate) {
      this.testObject = [];
      this.seenDuplicate = false;
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseDiffLocality'), 'error');
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
            //this.getAclUserById(this.model.id, 'update');

            console.log(success['data'].permissions, "success['data']");
            const user_list = JSON.parse(localStorage.getItem('all'));
            if (user_list.data) {
              user_list.data.permissions = success['data'].permissions;
              localStorage.setItem('all', JSON.stringify(user_list));
            }
            if (success.success === '0') {
              swal(this.translate.instant('swal.error'), success.message, 'error');
            } else {
              const text = this.model.id ? 'Updated successfully.' : 'Added successfully.';
              swal(this.translate.instant('swal.success'), text, 'success');
              this.router.navigate(['/dashboard/access-control-mgt']);
              // if (this.model.id) {
              //   // edit -- replace
              //   this.parameter.items[this.parameter.index] = success.data;
              //   formdata.reset();
              // } else {
              //   // add - push
              //   if ((formdata.value.is_broker_seller_dev === true && this.parameter.userType === 'csr-sellers') ||
              //     (formdata.value.is_buyer_renter === true && this.parameter.userType === 'csr-buyers') ||
              //     (formdata.value.is_broker === true && this.parameter.userType === 'inhouse-broker') ||
              //     (formdata.value.is_external_agent === true && this.parameter.userType === 'outside-broker') ||
              //     (formdata.value.is_data_collector === true && this.parameter.userType === 'data-collectors') ||
              //     (formdata.value.is_csr_renter === true && this.parameter.userType === 'csr-renters') ||
              //     (formdata.value.is_credit_agent === true && this.parameter.userType === 'credit-agents') ||
              //     (formdata.value.is_collection_agent === true && this.parameter.userType === 'collection-agents') ||
              //     (formdata.value.is_csr_closer === true && this.parameter.userType === 'csr-closers')) {
              //     this.parameter.items.push(success.data);
              //     this.parameter.total++;
              //   }
              //   formdata.reset();
              // }
              // this.emptyModel();
            }
          }, error => {
            this.spinner.hide();
          });
    }
  }

  getAclUserById(id: string, data) {
    this.spinner.show();
    this.model.img_loader = false;
    this.admin.postDataApi('getNewUserById', { id: id }).subscribe(r => {
      this.spinner.hide();
      const userdata = r['data'];
      for (let ind = 0; ind < userdata.countries.length; ind++) {
        if (data == 'true') {
          const tempAdd = {
            countries: userdata.countries[ind].id.toString(),
            states: userdata.states !== null && userdata.states[ind] ? userdata.states[ind].id.toString() : '0',
            cities: userdata.cities !== null && userdata.cities[ind] ? userdata.cities[ind].id.toString() : '0',
            localities: userdata.localities !== null && userdata.localities[ind] ? userdata.localities[ind].id.toString() : '0',
            buildings: userdata.buildings !== null && userdata.buildings[ind] ? userdata.buildings[ind].id.toString() : '0'
          };
          this.model.address[ind] = tempAdd;
        } else {
          const tempAdd = {
            countries: userdata.countries ? userdata.countries[ind].name_en : '',
            states: userdata.states !== null && userdata.states[ind] ? userdata.states[ind].name_en : 'All',
            cities: userdata.cities !== null && userdata.cities[ind] ? userdata.cities[ind].name_en : 'All',
            localities: userdata.localities !== null && userdata.localities[ind] ? userdata.localities[ind].name_en : 'All',
            buildings: userdata.buildings !== null && userdata.buildings[ind] ? userdata.buildings[ind].name : 'All'
          };
          this.model.address[ind] = tempAdd;
        }

      }
      this.model.adminAcls = userdata.admin_acls;
      if (data == 'update') {
        this.admin.setUser(userdata.admin_acls);
      }
      for (let index = 0; index < userdata.admin_acls.length; index++) {
        const element = userdata.admin_acls[index];
        element['acl'] = { name: element.name, id: element.acl_id };
      }
      this.user_type = userdata.user_type;
      // this.model.address = [];
      this.model.id = userdata.id;
      this.model.name = userdata.name;
      this.model.first_surname = userdata.first_surname;
      this.model.second_surname = userdata.second_surname;
      this.model.email = userdata.email;
      this.model.phone = userdata.phone;
      if (userdata.agency_id != null && userdata.agency_id != 0) {
        this.model.is_company = 'true';
      } else {
        this.model.is_company = 'false';
      }
      this.model.country_code = userdata.country_code;
      // if (this.obj) {
      //   this.obj.intlTelInput('setCountry', this.model.country_code ? this.model.country_code : this.constant.country_code);
      // }
      // this.model.company_name = userdata.company_name;
      this.model.description = userdata.description;
      // this.model.is_external_agent = userdata.is_external_agent;
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
      this.model.is_broker_seller_dev = userdata.permissions && userdata.permissions.can_csr_seller == 1 ? true : false;
      this.model.is_buyer_renter = userdata.permissions && userdata.permissions.can_csr_buyer == 1 ? true : false;
      this.model.is_broker = userdata.permissions && userdata.permissions.can_in_house_broker == 1 ? true : false;
      this.model.is_data_collector = userdata.permissions && userdata.permissions.can_data_collector == 1 ? true : false;
      this.model.is_csr_closer = userdata.permissions && userdata.permissions.can_csr_closer == 1 ? true : false;
      this.model.is_external_agent = userdata.permissions && userdata.permissions.can_outside_broker == 1 ? true : false;
      this.model.is_csr_renter = userdata.permissions && userdata.permissions.can_csr_renter == 1 ? true : false;
      this.model.is_collection_agent = userdata.permissions && userdata.permissions.can_collection_agent == 1 ? true : false;
      this.model.is_credit_agent = userdata.permissions && userdata.permissions.can_credit_agent == 1 ? true : false;
      this.model.is_alliance_agent = userdata.permissions && userdata.permissions.can_alliance_agent == 1 ? true : false;
      this.model.is_cordinator = userdata.permissions && userdata.permissions.can_cordinator == 1 ? true : false;
      this.model.can_csr_coordinator = userdata.permissions && userdata.permissions.can_csr_coordinator == 1 ? true : false;
      this.model.contract_validator = userdata.permissions && userdata.permissions.contract_validator == 1 ? true : false;
      this.model.contract_agent = userdata.permissions && userdata.permissions.contract_agent == 1 ? true : false;
      this.model.can_credit_coordinator = userdata.permissions && userdata.permissions.can_credit_coordinator == 1 ? true : false;
      this.model.can_content_creator = userdata.permissions && userdata.permissions.can_content_creator == 1 ? true : false;

      // if (this.model.address.length < 1) {
      //   const obj = {
      //     countries: this.parameter.countries && this.parameter.countries[0] ? this.parameter.countries[0].id : 0,
      //     states: '0',
      //     cities: '0',
      //     localities: '0',
      //     buildings: '0'
      //   };
      //   this.model.address[0] = obj;
      // }
      //outside
      var keys = Object.keys(userdata.permissions);
      var filtered = keys.filter(function (key) {
        return userdata.permissions[key]
      });
      var theRemovedElement = filtered.slice(3);
      theRemovedElement.splice(-2);

      if (theRemovedElement.length > 1) {
        this.model.admin_acl = userdata.admin_acls;
        for (let index = 0; index < this.model.admin_acl.length; index++) {
          const element = this.model.admin_acl[index];
          element.can_create = element.can_create || 0,
            element.can_delete = element.can_delete || 0,
            element.can_update = element.can_update || 0,
            element.can_read = element.can_read || 0,
            element.can_crud = element.can_crud || 0,
            element.can_purge = element.can_purge || 0;
        }
        this.permission_show = false;
        this.permission_all = true;
      } else if (theRemovedElement.length == 1) {
        const found = theRemovedElement.find(element => element == 'can_outside_broker');
        console.log(found, "found");
        if (found == 'can_outside_broker') {
          for (let index = 0; index < userdata.admin_acls.length; index++) {
            const element = userdata.admin_acls[index];
            if (element.acl.name == 'Properties For Sale Management') {
              this.permission_show = true;
              this.permission_all = false;
              let newArray = [];
              newArray.push(element);
              if (newArray.length > 1) {
                this.model.admin_estend = newArray[0];
              } else {
                this.model.admin_estend = newArray;
              }
              element.can_create = 0,
                element.can_delete = 0,
                element.can_update = 0,
                element.can_read = 1,
                element.can_crud = 0,
                element.can_purge = 0;
            }
          }
        } else {
          this.permission_show = false;
          this.permission_all = true;
          this.model.admin_acl = userdata.admin_acls;
          this.model.admin_acl = userdata.admin_acls;
          for (let index = 0; index < this.model.admin_acl.length; index++) {
            const element = this.model.admin_acl[index];
            element.can_create = element.can_create || 0,
              element.can_delete = element.can_delete || 0,
              element.can_update = element.can_update || 0,
              element.can_read = element.can_read || 0,
              element.can_crud = element.can_crud || 0,
              element.can_purge = element.can_purge || 0;
          }
        }
      } else {
        this.permission_show = false;
        this.permission_all = true;
        this.model.admin_acl = userdata.admin_acls;
        this.model.admin_acl = userdata.admin_acls;
        for (let index = 0; index < this.model.admin_acl.length; index++) {
          const element = this.model.admin_acl[index];
          element.can_create = element.can_create || 0,
            element.can_delete = element.can_delete || 0,
            element.can_update = element.can_update || 0,
            element.can_read = element.can_read || 0,
            element.can_crud = element.can_crud || 0,
            element.can_purge = element.can_purge || 0;
        }
      }

      this.setUserType(userdata.user_type);
    }, erorr => {
      this.spinner.hide();
    });
  }

  emptyModel() {
    this.model.country_code = this.constant.country_code;
    this.model.dial_code = this.constant.dial_code;
    this.model = new UserModel();
    this.initialCountry = { initialCountry: this.constant.initialCountry };
    this.disabledBuildings = [];
  }

  getNew(index) {
    if (index == '1') {
      this.isWorking = true;
      this.getAclUserById(this.model.id, 'true');
    } else {
      this.isWorking = false;
    }

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

  getCountries() {
    this.spinner.show();
    this.parameter.countries = [];
    this.parameter.country_id = '-1';
    this.parameter.states = []; this.parameter.cities = []; this.parameter.localities = []; this.parameter.buildings = [];
    this.parameter.state_id = '-1'; this.parameter.city_id = '-1'; this.parameter.locality_id = '-1'; this.parameter.building_id = '-1';

    this.admin.postDataApi('getCountryLocality', {}).subscribe(r => {
      this.parameter.countries = r['data'];
      if (this.model.id == '') {
        const obj = {
          countries: this.parameter.countries && this.parameter.countries[0] ? this.parameter.countries[0].id : 0,
          states: '0',
          cities: '0',
          localities: '0',
          buildings: '0'
        };
        this.model.address[0] = obj;
      }
      console.log(this.model.address, "getCountryLocality");
      this.spinner.hide();
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
    input.append('localities', locality_id);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.parameter.buildings = success.data;
        });
  }

  setBuilding(building_id: string) {
    this.parameter.building_id = building_id;
  }

  getAllAgencies() {
    this.admin.postDataApi('getAllAgencies', {})
      .subscribe(
        success => {
          this.agencies = success.data;
        });
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

  checkPer(user_type: number) {
    if (this.model.id && user_type == 1) {
      let input = {
        all: 1,
        admin_id: this.model.id,
        can_csr_buyer: 1,
        can_csr_seller: 1,
        can_in_house_broker: 1,
        can_credit_agent: 1,
      }
      this.spinner.show();
      this.admin.postDataApi('checkLeadAssign', input).subscribe(r => {
        if (r.success != '1') {
          this.model.user_type = this.user_type;
          this.toastr.warning(this.translate.instant('message.error.thisUserHasLeadsAssignedPleaseDeleteTheDependenciesFirst'), this.translate.instant('swal.warning'));
        }
        else {
          this.setUserType(user_type);
        }
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
      });
    }
    else {
      this.setUserType(user_type);
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
          value: this.model.is_external_agent === true
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
        }, {
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
        }, {
          title: this.translate.instant('addForm.csrCoordinator'),
          key: 'can_csr_coordinator',
          value: this.model.can_csr_coordinator
        }
        , {
          title: this.translate.instant('addForm.creditCoordinator'),
          key: 'can_credit_coordinator',
          value: this.model.can_credit_coordinator
        }, {
          title: this.translate.instant('addForm.contentCreator'),
          key: 'can_content_creator',
          value: this.model.can_content_creator
        }, {
          title: this.translate.instant('addForm.contractValidator'),
          key: 'contract_validator',
          value: this.model.contract_validator
        }
        , {
          title: this.translate.instant('addForm.contractAgent'),
          key: 'contract_agent',
          value: this.model.contract_agent
        }

        // {
        //   title: this.translate.instant('addForm.developerName'),
        //   key: 'is_developer',
        //   value: this.model.is_developer || false
        // }
      ];
      this.selected_valo = [
        {
          title: this.translate.instant('addForm.outSideAgent'),
          key: 'is_external_agent',
          value: this.model.is_external_agent === true
        },
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

  setPredefinedUsers(item, value, i: number) {
    item.value = !item.value
    var t = this.predefinedUsers
      .filter(opt => opt.value)
      .map(opt => opt);
    this.selected_valo = t;
    if (this.selected_valo.length > 1) {
      this.permission_show = false;
      this.permission_all = true;
      if (this.model.id) {
        this.model.admin_acl = this.model.adminAcls;
      } else {
        this.model.admin_acl;
        console.log(this.model.admin_acl, "this.selected_valo");
      }
    } else if (this.selected_valo.length == 1) {
      for (let i = 0; i < this.selected_valo.length; i++) {
        const ele = this.selected_valo[i];
        if (ele.title == "Outside Agent") {
          if (this.model.id) {
            for (let index = 0; index < this.model.adminAcls.length; index++) {
              const element = this.model.adminAcls[index];
              if (element.acl.name == 'Properties For Sale Management') {
                this.permission_all = false;
                this.permission_show = true;
                let newArray = [];
                newArray.push(element);
                if (newArray.length > 1) {
                  this.model.admin_estend = newArray[0];
                } else {
                  this.model.admin_estend = newArray;
                }
                element.can_create = 0,
                  element.can_delete = 0,
                  element.can_update = 0,
                  element.can_read = 1,
                  element.can_crud = 0,
                  element.can_purge = 0;
              }
            }
          } else {
            for (let index = 0; index < this.model.admin_acl.length; index++) {
              const element = this.model.admin_acl[index];
              if (element.acl.name == 'Properties For Sale Management') {
                this.permission_all = false;
                this.permission_show = true;
                let newArray = [];
                newArray.push(element);
                if (newArray.length > 1) {
                  this.model.admin_estend = newArray[0];
                } else {
                  this.model.admin_estend = newArray;
                }
                element.can_create = 0,
                  element.can_delete = 0,
                  element.can_update = 0,
                  element.can_read = 1,
                  element.can_crud = 0,
                  element.can_purge = 0;
              }
            }
          }

        } else {
          this.permission_show = false;
          this.permission_all = true;
          if (this.model.id) {
            this.model.admin_acl = this.model.adminAcls;
          } else {
            this.model.admin_acl;
          }
        }
      }
    } else {
      this.permission_show = false;
      this.permission_all = true;
      if (this.model.id) {
        this.model.admin_acl = this.model.adminAcls;
      } else {
        this.model.admin_acl;
      }
    }

    if (this.model.id && !value && (item.title == 'CSR Buyer' || item.title == 'CSR Seller' || item.title == 'Inhouse Agent')) {
      let input = {
        all: 0,
        admin_id: this.model.id,
        can_csr_buyer: item.title == 'CSR Buyer' ? 1 : 0,
        can_csr_seller: item.title == 'CSR Seller' ? 1 : 0,
        can_in_house_broker: item.title == 'Inhouse Agent' ? 1 : 0,
        //can_credit_agent: item.title == 'Outside Agent' ? 1 : 0,
      }
      this.spinner.show();
      this.admin.postDataApi('checkLeadAssign', input).subscribe(r => {
        if (r.success != '1') {
          this.predefinedUsers[i].value = true;
          this.toastr.warning(this.translate.instant('message.error.thisUserHasLeadsAssignedPleaseDeleteTheDependenciesFirst'), this.translate.instant('swal.warning'));
        }
        else {
          this.model[item.key] = value;
          this.predefinedUsers[i].value = value;
        }
        this.spinner.hide();
      }, error => {
        this.predefinedUsers[i].value = true;
        this.spinner.hide();
      });
    }
    else {
      this.model[item.key] = value;
      this.predefinedUsers[i].value = value;
    }
  }

  // add_valo() {
  //   var t = this.predefinedUsers
  //     .filter(opt => opt.value)
  //     .map(opt => opt);
  //   this.selected_valo = t;
  // }
  // getSel() {
  //   for (let i = 0; i < this.selected_valo.length; i++) {
  //     for (let j = 0; j < this.predefinedUsers.length; j++) {
  //       if (this.predefinedUsers[j].title === this.selected_valo[i].title) {
  //         this.predefinedUsers[j].value = true;
  //       }
  //     }
  //   }
  // }

  setIsCompany(is_company: string) {
    this.model.is_company = is_company;
  }

  setAgency(id: string) {
    this.model.agency = new Agency();
    this.model.agency.id = id;
  }

  goBack() {
    this.router.navigate(['/dashboard/access-control-mgt'])
  }
}
