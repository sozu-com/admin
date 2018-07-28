webpackJsonp([1],{

/***/ "../../../../../src/app/layout/properties/add-property/add-property.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".upload-cover-img{\n    background-size: contain;background-repeat: no-repeat;\n}\n.width100{\n    width: 100%;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/properties/add-property/add-property.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container-fluid\">\n  <div class=\"white-bg padding15\">\n    <div class=\"row\">\n      <div class=\"col-md-6\">\n        <div class=\"title-group\">\n          <h5>Add New Property</h5>\n        </div>\n      </div>\n      <div class=\"col-md-6\">\n        <div class=\"btn-cont text-right\">\n          <a class=\"btn-third btn\" href=\"javascript://\" (click)=\"setTab(tab+1)\" *ngIf=\"tab != 3\">Next</a>\n          <a class=\"btn-third btn\" href=\"javascript://\" *ngIf=\"tab == 3\">Submitt</a>\n        </div>\n      </div>\n    </div>\n  </div>\n  \n  <ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n\n  <div class=\"spacer10\"></div>\n  \n  <div class=\"white-bg padding15\">\n    <div class=\"steps\">\n      <ul class=\"d-flex\">\n        <li [ngClass]=\"{'current': tab == 1}\"><span></span><a (click)=\"addProperty(addForm, 1)\">Create Draft</a></li>\n        <li [ngClass]=\"{'current': tab == 2}\"><span></span><a (click)=\"addProperty(addForm, 2)\">Additional Info</a></li>\n        <li [ngClass]=\"{'current': tab == 3}\"><span></span><a (click)=\"addProperty(addForm, 3)\">Privacy Info</a></li>\n        <li [ngClass]=\"{'current': tab == 4}\"><span></span><a (click)=\"addProperty(addForm, 4)\">Tag a Building</a></li>\n        <li [ngClass]=\"{'current': tab == 5}\"><span></span><a (click)=\"addProperty(addForm, 5)\">Submit</a></li>\n      </ul>\n    </div>\n  </div>\n\n  <div class=\"spacer10\"></div>\n\n  <form  ngNativeValidate #addForm=\"ngForm\" (ngSubmit)=\"addNewUser(addForm)\">\n    \n    <!-- tab-1 -->\n    <div class=\"white-bg\" *ngIf=\"tab==1\">\n      <div class=\"page-title\">\n        <h3>Create Draft</h3>\n      </div>\n      <div class=\"padding40\">\n      <div class=\"form-group-3\">\n        <label>This Property is available for?</label>\n        <div class=\"clearfix\"></div>\n        <label class=\"cust-radio\">\n          <input [(ngModel)]=\"model.for_sale\" name=\"for_sale\" type=\"checkbox\" checked=\"model.for_sale == 1 ? checked: ''\">\n          <span class=\"checkmark\">Sell</span>\n        </label>\n        <label class=\"cust-radio\"> \n          <input [(ngModel)]=\"model.for_rent\" name=\"for_rent\" type=\"checkbox\" checked=\"model.for_rent == 1 ? checked: ''\">\n          <span class=\"checkmark\">Rent</span>\n        </label>\n        <div class=\"clearfix\"></div>\n      </div>\n        <div class=\"spacer15\"></div>\n        <div class=\"row\">\n          <div class=\"col-lg-3 col-md-12 col-sm-12 col-12\">\n            <div class=\"form-group-3\">\n              <label>Select Country</label>\n              <select title=\"Choose Country\" class=\"form-control\" (change)=\"getStates($event.target.value)\">\n                <option value=\"\" [selected]=\"model.country_id == ''\" disabled>Select Country</option>\n                <option *ngFor=\"let country of parameter.countries\" value=\"{{country.id}}\" [selected]=\"country.id == model.country_id\">{{country.name_en}}</option>\n              </select>\n            </div>   \n          </div>\n          <div class=\"col-lg-3 col-md-12 col-sm-12 col-12\">\n            <div class=\"form-group-3\">\n              <label>&nbsp;</label>\n              <select title=\"Choose State\" class=\"form-control\" (change)=\"getCities($event.target.value)\">\n                <option value=\"\" [selected]=\"model.state_id == ''\" disabled>Select State</option>\n                <option *ngFor=\"let state of parameter.states\" value=\"{{state.id}}\" [selected]=\"state.id == model.state_id\">{{state.name_en}}</option>\n              </select>\n            </div>   \n          </div>\n          <div class=\"col-lg-3 col-md-12 col-sm-12 col-12\">\n            <div class=\"form-group-3\">\n              <label>&nbsp;</label>\n              <select title=\"Choose City\" class=\"form-control\" (change)=\"getLocalities($event.target.value)\">\n                <option value=\"\" [selected]=\"model.city_id == ''\" disabled>Select City</option>\n                <option *ngFor=\"let city of parameter.cities\" value=\"{{city.id}}\" [selected]=\"city.id == model.city_id\">{{city.name_en}}</option>\n              </select>\n            </div>   \n          </div>\n          <div class=\"col-lg-3 col-md-12 col-sm-12 col-12\">\n            <div class=\"form-group-3\">\n              <label>&nbsp;</label>\n              <select title=\"Choose Locality\" class=\"form-control\" (change)=\"setLocality($event.target.value)\">\n                <option value=\"\" [selected]=\"model.locality_id == ''\" disabled>Select Locality</option>\n                <option *ngFor=\"let locality of parameter.localities\" value=\"{{locality.id}}\" [selected]=\"locality.id == model.locality_id\">{{locality.name_en}}</option>\n              </select>\n            </div>   \n          </div>\n        </div>\n      <div class=\"spacer15\"></div>\n\n      <div class=\"form-group-3\">\n        <label>Select Configuration?</label>\n        <div class=\"clearfix\"></div>\n        <label class=\"cust-radio\" *ngFor=\"let configuration of parameter.items\">\n          <input type=\"radio\" (change)=\"setConfiguration(configuration.id)\" value=\"{{configuration.id}}\" checked=\"model.configuration_id == configuration.id ? checked : ''\" name=\"configuration_id\">\n          <span class=\"checkmark\">{{configuration.name_en}}</span>\n        </label>\n        <div class=\"clearfix\"></div>\n      </div>\n      <div class=\"spacer15\"></div>\n\n      <div class=\"form-group-3\">\n        <label>Select Property Type?</label>\n        <div class=\"clearfix\"></div>\n        <label class=\"cust-radio\" *ngFor=\"let propertyType of parameter.propertyTypes\">\n          <input type=\"radio\" (change)=\"setPropertyType(propertyType.id)\" value=\"{{propertyType.id}}\" checked=\"model.property_type_id == propertyType.id ? checked : ''\" name=\"property_type_id\">\n          <span class=\"checkmark\">{{propertyType.name_en}}</span>\n        </label>\n        <div class=\"clearfix\"></div>\n      </div>\n\n      <div class=\"spacer15\"></div>\n        <div class=\"row\" *ngFor=\"let carpet_area of model.carpet_areas\">\n          <div class=\"col-md-4 col-sm-12 col-12\">\n            <div class=\"form-group-3\">\n              <label>Enter Area</label>\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"carpet_area.area\" name=\"area\" placeholder=\"Area should be in numbers\">\n            </div> \n          </div>\n          <div class=\"col-md-4 col-sm-12 col-12\">\n            <div class=\"form-group-3\">\n              <label>Enter Expected Price</label>\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"carpet_area.price\" name=\"price\" placeholder=\"Amount should be in $\">\n            </div> \n          </div>\n        </div>\n      </div>\n    </div>\n\n\n    <!-- tab-2 -->\n    <div class=\"white-bg\" *ngIf=\"tab==2\">\n      <div class=\"page-title\">\n        <h3>Additional Info</h3>\n      </div>\n      <div class=\"padding40\">\n        <div class=\"form-group-3\">\n        <label>Add Images of your Property</label>\n          <div class=\"row\">\n            <div class=\"col-md-7 col-sm-12 col-12\">\n              <div class=\"upload-cover-img\" [style.background-image]=\"image1\">\n                <!-- <img *ngIf=\"url\" [src]=\"url\" height=\"200\"> -->\n                <div class=\"upload-caption\">\n                  <div class=\"fig-block\"> \n                    <img src=\"./../../../../assets/img/placeholder-img.png\" alt=\"img\">\n                  </div>\n                  <p class=\"green-color marginT30\">+Upload Cover image for the project</p>\n                  <p>JPG or PNG. Image size should be 1920 × 1080 pixels (for HiDPI displays).</p>\n                </div>  \n                <input type=\"file\" name=\"\" (change)=\"onSelectFile1($event)\">\n              </div>\n            </div>\n            <div class=\"col-md-5 col-sm-12 col-12\">\n              <div class=\"upload-cover-img upload-cover-small\" [style.background-image]=\"image2\">\n                <input type=\"file\" name=\"\" (change)=\"onSelectFile2($event)\">\n              </div>\n\n              <div class=\"upload-cover-img upload-cover-small\" [style.background-image]=\"image3\">\n                <input type=\"file\" name=\"\" (change)=\"onSelectFile3($event)\">\n                <div class=\"upload-caption\">\n                  <p class=\"green-color marginT30\">+ Add more images</p>\n                </div> \n              </div>\n            </div>\n          </div>\n        </div> \n\n      <div class=\"row\">\n        <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n          <div class=\"form-group-3\">\n            <label>Total Area</label>\n            <input class=\"form-control\" type=\"number\" name=\"\" placeholder=\"in sq.ft.\">\n          </div>   \n        </div>\n        <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n          <div class=\"form-group-3\">\n            <label>Floor</label>\n            <input class=\"form-control\" [(ngModel)]=\"model.floor\" type=\"number\" name=\"floor\" placeholder=\"in numbers\">\n          </div>   \n        </div>\n\n        <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n          <div class=\"form-group-3\">\n            <label>Bedrooms</label>\n            <input class=\"form-control\" [(ngModel)]=\"model.bedroom\" type=\"number\" name=\"bedroom\" placeholder=\"in numbers\">\n          </div>   \n        </div>\n        <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n          <div class=\"form-group-3\">\n            <label>Bathrooms</label>\n            <input class=\"form-control\" [(ngModel)]=\"model.bathroom\" type=\"number\" name=\"bathroom\" placeholder=\"in numbers\">\n          </div>   \n        </div>\n      </div>\n      <div class=\"form-group-3\">\n        <label>Is Parking Available?</label>\n        <div class=\"clearfix\"></div>\n        <label class=\"cust-radio\">\n          <input type=\"radio\" value=\"1\" [(ngModel)]=\"model.parking\" checked=\"model.parking == 1 ? checked: ''\" name=\"parking\">\n          <span class=\"checkmark\">Yes</span>\n        </label>\n        <label class=\"cust-radio\"> \n          <input type=\"radio\" value=\"0\" [(ngModel)]=\"model.parking\" checked=\"model.parking == 0 ? checked: ''\" name=\"parking\">\n          <span class=\"checkmark\">No</span>\n        </label>\n        <div class=\"clearfix\"></div>\n      </div>\n      <div class=\"spacer15\"></div>\n      <div class=\"form-group-3\">\n        <label>Is Property Furnished?</label>\n        <div class=\"clearfix\"></div>\n        <label class=\"cust-radio\">\n          <input type=\"radio\" value=\"1\" name=\"furnished\" [(ngModel)]=\"model.furnished\" checked=\"model.furnished == 1 ? checked: ''\">\n          <span class=\"checkmark\">Yes</span>\n        </label>\n        <label class=\"cust-radio\"> \n          <input type=\"radio\" value=\"0\" name=\"furnished\" [(ngModel)]=\"model.furnished\" checked=\"model.furnished == 0 ? checked: ''\">\n          <span class=\"checkmark\">No</span>\n        </label>\n        <div class=\"clearfix\"></div>\n      </div>\n\n      <div class=\"form-group-3\">\n        <label>Description</label>\n        <textarea [(ngModel)]=\"model.description\" name=\"description\" class=\"form-control\"></textarea>\n      </div>\n\n      <div class=\"spacer15\"></div>\n      <div class=\"form-group-3\">\n        <label>This Property is available for?</label>\n        <div class=\"clearfix\"></div>\n        <label class=\"cust-radio\">\n          <input type=\"radio\" checked=\"model.quantity == 1 ? checked : ''\" name=\"quantity\">\n          <span class=\"checkmark\">1</span>\n        </label>\n        <label class=\"cust-radio\"> \n          <input type=\"radio\" checked=\"model.quantity == 2 ? checked : ''\" name=\"quantity\">\n          <span class=\"checkmark\">2</span>\n        </label>\n        <label class=\"cust-radio\">\n          <input type=\"radio\" checked=\"model.quantity == 3 ? checked : ''\" name=\"quantity\">\n          <span class=\"checkmark\">3</span>\n        </label>\n        <label class=\"cust-input\">\n          <input type=\"text\" [(ngModel)]=\"model.quantity\" name=\"quantity\" placeholder=\"Enter\">\n        </label>\n        <div class=\"clearfix\"></div>\n      </div>\n\n      <div class=\"spacer15\"></div>\n      <div class=\"form-group-3\">\n        <label>List of Amenties with this property</label>\n        <div class=\"list-group-items\">\n          <ul>\n            <li *ngFor=\"let amenity of parameter.amenities\" (click)=\"setAmenity(amenity.id)\">\n              <div class=\"fig-block\"><img [src]=\"amenity.icon\" alt=\"img\" class=\"width100\"></div>\n              <p class=\"p13\">{{amenity.name_en}}</p>\n            </li>\n          </ul>\n        </div>\n      </div>\n    </div>\n  </div>\n\n\n\n\n    <!-- tab-3 -->\n    <div class=\"white-bg\" *ngIf=\"tab==3\">\n        <div class=\"page-title\">\n          <h3>Additional Info</h3>\n        </div>\n        <div class=\"padding40\">\n        <div class=\"form-group-3\">\n          <label>Pets Allowed?</label>\n          <div class=\"clearfix\"></div>\n          <label class=\"cust-radio\">\n            <input type=\"radio\" value=\"1\" [(ngModel)]=\"model.pets\" checked=\"model.pets == 1 ? checked: ''\" name=\"parking\">\n            <span class=\"checkmark\">Yes</span>\n          </label>\n          <label class=\"cust-radio\"> \n            <input type=\"radio\" value=\"0\" [(ngModel)]=\"model.pets\" checked=\"model.pets == 0 ? checked: ''\" name=\"parking\">\n            <span class=\"checkmark\">No</span>\n          </label>\n          <div class=\"clearfix\"></div>\n        </div>\n        <div class=\"spacer15\"></div>\n        <div class=\"form-group-3\">\n          <label>Marital Status?</label>\n          <div class=\"clearfix\"></div>\n          <label class=\"cust-radio\">\n            <input type=\"radio\" value=\"1\" name=\"marital_status\" [(ngModel)]=\"model.marital_status\" checked=\"model.marital_status == 1 ? checked: ''\">\n            <span class=\"checkmark\">Yes</span>\n          </label>\n          <label class=\"cust-radio\"> \n            <input type=\"radio\" value=\"0\" name=\"marital_status\" [(ngModel)]=\"model.marital_status\" checked=\"model.marital_status == 0 ? checked: ''\">\n            <span class=\"checkmark\">No</span>\n          </label>\n          <div class=\"clearfix\"></div>\n        </div>\n      </div>\n    </div>\n\n    \n\n    <!-- tab-4 -->\n    <div class=\"white-bg\" *ngIf=\"tab==4\">\n      <div class=\"page-title\">\n        <h3>Tag a Building</h3>\n      </div>\n      <div class=\"padding40\">\n        <p class=\"p16\">Search your building in Our Database</p>\n        <div class=\"searh\">\n          <input type=\"text\" name=\"\">\n          <button>Search</button>\n        </div>\n        <div class=\"spacer50\"></div>\n        <p class=\"p18\">Didn’t Found your Building? <strong><span class=\"green-color\">Generate a Request to add a building by our Data collectors</span></strong></p>\n        <div class=\"spacer50\"></div>\n\n        <div class=\"row\">\n          <div class=\"col-lg-7 col-md-12 col-sm-12 col-12\">\n            <div class=\"row\">\n              <div class=\"col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                  <label>Name of Building</label>\n                  <input class=\"form-control\" type=\"text\" name=\"\">\n                </div>\n              </div>\n              <div class=\"col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                  <label>Where it is located?</label>\n                  <input class=\"form-control\" type=\"text\" name=\"\">\n                </div>\n              </div>\n            </div>\n            <label class=\"label-optional\">Developer Details (optional)</label>\n            <div class=\"row\">\n              <div class=\"col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                  <label>Name of Developer</label>\n                  <input class=\"form-control\" type=\"text\" name=\"\">\n                </div>\n              </div>\n              <div class=\"col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                  <label>Contact Number</label>\n                  <input class=\"form-control\" type=\"text\" name=\"\">\n                </div>\n              </div>\n            </div>\n            <div class=\"row\">\n              <div class=\"col-sm-12 col-12\">\n                <div class=\"form-group-3\">\n                  <label>Email Address</label>\n                  <input class=\"form-control\" type=\"text\" name=\"\">\n                </div>\n              </div>\n            </div>\n          </div>\n          <div class=\"col-lg-5 col-md-12 col-sm-12 col-12\">\n            <div class=\"form-group-3 mark-pin-map\">\n              <label>Mark Pin on Map</label>\n              <input class=\"form-control\" type=\"text\" name=\"\">\n            </div>\n            <div><img class=\"img-fluid\" src=\"img/map-img.png\" alt=\"img\"></div>\n          </div>\n        </div>\n      </div>\n    </div>\n  \n  </form>\n\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/layout/properties/add-property/add-property.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__ = __webpack_require__("../../../../ngx-sweetalert2/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_addProperty_model__ = __webpack_require__("../../../../../src/app/models/addProperty.model.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddPropertyComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AddPropertyComponent = (function () {
    function AddPropertyComponent(model, admin, swal, router, sanitization) {
        this.model = model;
        this.admin = admin;
        this.swal = swal;
        this.router = router;
        this.sanitization = sanitization;
        this.parameter = {};
    }
    AddPropertyComponent.prototype.ngOnInit = function () {
        this.tab = 1;
        this.getCountries('');
        this.getConfigurations();
        this.getPropertyTypes();
        this.getAmenities();
        console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzz', this.model);
    };
    AddPropertyComponent.prototype.setTab = function (tab) {
        this.tab = tab;
        console.log('zz11111111', this.model);
    };
    AddPropertyComponent.prototype.ngOnChanges = function () {
        console.log('zzzzzzzzzzzzzz', this.model);
    };
    AddPropertyComponent.prototype.getCountries = function (keyword) {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'getCountries';
        var input = new FormData();
        if (keyword)
            input.append('keyword', keyword);
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('countries', success);
            _this.parameter.loading = false;
            _this.parameter.countries = success.data;
            // this.parameter.countryCount = success.data.length;
            // if (this.parameter.countries.length != 0){
            //   this.parameter.country_id = this.parameter.countries[0].id;
            //   this.getStates(this.parameter.countries[0].id, '');
            // }
        }, function (error) {
            _this.parameter.loading = false;
            if (error.statusCode == 401) {
                _this.swal.warning({
                    title: 'Error',
                    text: error.message,
                });
                _this.router.navigate(['']);
            }
            else
                _this.swal.warning({
                    title: 'Error',
                    text: error.message,
                });
        });
    };
    AddPropertyComponent.prototype.getStates = function (country_id, keyword) {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'country/getStates';
        this.model.country_id = country_id;
        this.model.state_id = '';
        this.model.city_id = '';
        this.model.locality_id = '';
        var input = new FormData();
        input.append('country_id', country_id);
        if (keyword)
            input.append('keyword', keyword);
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('states', success);
            _this.parameter.loading = false;
            _this.parameter.states = success.data;
            // this.parameter.stateCount = success.data.length;
            // if (this.parameter.states.length){
            //   this.parameter.state_id = this.parameter.states[0].id;
            //   this.getCities(this.parameter.states[0].id, '');
            // }
        }, function (error) {
            console.log(error);
            _this.parameter.loading = false;
            if (error.statusCode == 401)
                _this.router.navigate(['']);
            else
                _this.swal.warning({
                    // title: 'Internet Connection',
                    text: error.messages,
                });
        });
    };
    AddPropertyComponent.prototype.getCities = function (state_id, keyword) {
        var _this = this;
        console.log('mm', state_id, keyword);
        this.parameter.loading = true;
        this.parameter.url = 'getCities';
        this.model.state_id = state_id;
        this.model.city_id = '';
        this.model.locality_id = '';
        var input = new FormData();
        input.append('state_id', state_id);
        if (keyword)
            input.append('keyword', keyword);
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('cities', success);
            _this.parameter.loading = false;
            _this.parameter.cities = success.data;
            // this.parameter.cityCount = success.data.length;
            // if (this.parameter.cities.length){
            //   this.parameter.city_id = this.parameter.cities[0].id;
            //   console.log('cityid', this.parameter.city_id);
            //   this.getLocalities(this.parameter.city_id, '');
            // }
        }, function (error) {
            console.log(error);
            _this.parameter.loading = false;
            if (error.statusCode == 401)
                _this.router.navigate(['']);
            else
                _this.swal.warning({
                    // title: 'Internet Connection',
                    text: error.messages,
                });
        });
    };
    AddPropertyComponent.prototype.getLocalities = function (city_id, keyword) {
        var _this = this;
        if (keyword === void 0) { keyword = ''; }
        console.log('mm', city_id, keyword);
        this.parameter.loading = true;
        this.parameter.url = 'getLocalities';
        this.model.city_id = city_id;
        this.model.locality_id = '';
        var input = new FormData();
        input.append('city_id', city_id);
        if (keyword)
            input.append('keyword', keyword);
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('Localities', success);
            _this.parameter.loading = false;
            _this.parameter.localities = success.data;
            // this.parameter.localityCount = success.data.length;
            // if(this.parameter.localities.length != 0)
            //   this.parameter.locality_id = this.parameter.localities[0].id;
        }, function (error) {
            console.log(error);
            _this.parameter.loading = false;
            if (error.statusCode == 401)
                _this.router.navigate(['']);
            else
                _this.swal.warning({
                    // title: 'Internet Connection',
                    text: error.messages,
                });
        });
    };
    AddPropertyComponent.prototype.setLocality = function (locality_id) {
        this.model.locality_id = locality_id;
    };
    AddPropertyComponent.prototype.setConfiguration = function (id) {
        this.model.configuration_id = id;
        console.log(id, this.model);
    };
    AddPropertyComponent.prototype.setPropertyType = function (id) {
        this.model.property_type_id = id;
        console.log('zz', this.model);
    };
    AddPropertyComponent.prototype.setAmenity = function (id) {
        this.model.amenities = [id];
        console.log('amenity', this.model.amenities);
    };
    AddPropertyComponent.prototype.getConfigurations = function () {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'getConfigurations';
        var input = new FormData();
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('getConfigurations', success);
            _this.parameter.loading = false;
            _this.parameter.items = success.data;
            _this.parameter.total = success.data.length;
        }, function (error) {
            console.log(error);
            _this.parameter.loading = false;
            if (error.statusCode == 401)
                _this.router.navigate(['']);
            else
                _this.swal.warning({
                    // title: 'Internet Connection',
                    text: error.messages,
                });
        });
    };
    AddPropertyComponent.prototype.getPropertyTypes = function () {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'getPropertyTypes';
        var input = new FormData();
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('getPropertyTypes', success);
            _this.parameter.loading = false;
            _this.parameter.propertyTypes = success.data;
            _this.parameter.propertyTypesCount = success.data.length;
        }, function (error) {
            console.log(error);
            _this.parameter.loading = false;
            if (error.statusCode == 401)
                _this.router.navigate(['']);
            else
                _this.swal.warning({
                    // title: 'Internet Connection',
                    text: error.messages,
                });
        });
    };
    AddPropertyComponent.prototype.getAmenities = function () {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'getPropertyAmenities';
        var input = new FormData();
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('getPropertyAmenities', success);
            _this.parameter.loading = false;
            _this.parameter.amenities = success.data;
            _this.parameter.amenitiesCount = success.data.length;
        }, function (error) {
            console.log(error);
            _this.parameter.loading = false;
            if (error.statusCode == 401)
                _this.router.navigate(['']);
            else
                _this.swal.warning({
                    // title: 'Internet Connection',
                    text: error.messages,
                });
        });
    };
    AddPropertyComponent.prototype.onSelectFile1 = function (event) {
        var _this = this;
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (event) {
                _this.url = event.target.result;
                _this.image1 = _this.sanitization.bypassSecurityTrustStyle("url(" + _this.url + ")");
            };
            var input = new FormData();
            input.append('image', event.target.files[0]);
            this.admin.newPostDataApi('http://45.232.252.136/api/data-collector/saveImage', input)
                .subscribe(function (success) {
                console.log('successimage', success);
                _this.model.cover_image = success.data.image;
                _this.parameter.loading = false;
            }, function (error) {
                console.log(error);
                _this.parameter.loading = false;
                _this.swal.error({
                    title: 'Error',
                    text: error.message,
                });
            });
            // this.model.cover_image = event.target.files[0];
            reader.readAsDataURL(event.target.files[0]);
        }
    };
    AddPropertyComponent.prototype.onSelectFile2 = function (event) {
        var _this = this;
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (event) {
                _this.url = event.target.result;
                _this.image2 = _this.sanitization.bypassSecurityTrustStyle("url(" + _this.url + ")");
            };
            var input = new FormData();
            input.append('image', event.target.files[0]);
            this.admin.newPostDataApi('http://45.232.252.136/api/data-collector/saveImage', input)
                .subscribe(function (success) {
                console.log('successimage', success);
                _this.model.images = success.data.image;
                _this.parameter.loading = false;
            }, function (error) {
                console.log(error);
                _this.parameter.loading = false;
                _this.swal.error({
                    title: 'Error',
                    text: error.message,
                });
            });
            // this.model.images = event.target.files;
            reader.readAsDataURL(event.target.files[0]);
        }
    };
    AddPropertyComponent.prototype.onSelectFile3 = function (event) {
        var _this = this;
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (event) {
                _this.url = event.target.result;
                _this.image3 = _this.sanitization.bypassSecurityTrustStyle("url(" + _this.url + ")");
            };
            var input = new FormData();
            input.append('image', event.target.files[0]);
            this.admin.newPostDataApi('http://45.232.252.136/api/data-collector/saveImage', input)
                .subscribe(function (success) {
                console.log('successimage', success);
                _this.model.floor_plan = success.data.image;
                _this.parameter.loading = false;
            }, function (error) {
                console.log(error);
                _this.parameter.loading = false;
                _this.swal.error({
                    title: 'Error',
                    text: error.message,
                });
            });
            // this.model.images = event.target.files;
            reader.readAsDataURL(event.target.files[0]);
        }
    };
    AddPropertyComponent.prototype.addProperty = function (formdata, tab) {
        var _this = this;
        console.log('formdata', formdata);
        console.log('api', this.model);
        this.tab = tab;
        this.parameter.loading = true;
        this.parameter.url = this.model.id != '' ? 'addProperty' : 'addProperty';
        var input = new FormData();
        // input.append('property_id', '241');242
        if (this.parameter.property_id)
            input.append('property_id', this.parameter.property_id);
        input.append('step', this.tab.toString());
        if (this.tab == 1) {
            input.append('for_rent', this.model.for_rent == true ? '1' : '0');
            input.append('for_sale', this.model.for_sale == true ? '1' : '0');
            input.append('country_id', this.model.country_id);
            input.append('state_id', this.model.state_id);
            input.append('city_id', this.model.city_id);
            input.append('locality_id', this.model.locality_id);
            input.append('configuration_id', this.model.configuration_id);
            input.append('carpet_areas', JSON.stringify(this.model.carpet_areas));
            input.append('property_type_id', this.model.property_type_id);
        }
        if (this.tab == 2) {
            input.append('cover_image', this.model.cover_image);
            input.append('images', JSON.stringify([this.model.images]));
            input.append('floor_plan', this.model.floor_plan);
            input.append('bedroom', this.model.bedroom);
            input.append('bathroom', this.model.bathroom);
            input.append('floor', this.model.floor);
            input.append('parking', this.model.parking);
            input.append('furnished', this.model.furnished);
            input.append('description', this.model.description);
            input.append('quantity', this.model.quantity);
            input.append('amenities', JSON.stringify(this.model.amenities));
            input.append('banks', JSON.stringify(this.model.banks));
        }
        if (this.tab == 3) {
            input.append('pets', this.model.pets);
            input.append('marital_status', this.model.marital_status);
        }
        if (this.tab == 4) {
            input.append('custom_attributes', JSON.stringify(this.model.carpet_areas));
        }
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('success', success);
            _this.parameter.property_id = success.data.id;
            _this.parameter.loading = false;
        }, function (error) {
            console.log(error);
            _this.parameter.loading = false;
            _this.swal.error({
                title: 'Error',
                text: error.message,
            });
        });
    };
    return AddPropertyComponent;
}());
AddPropertyComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-add-property',
        template: __webpack_require__("../../../../../src/app/layout/properties/add-property/add-property.component.html"),
        styles: [__webpack_require__("../../../../../src/app/layout/properties/add-property/add-property.component.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_5__models_addProperty_model__["a" /* AddPropertyModel */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5__models_addProperty_model__["a" /* AddPropertyModel */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__models_addProperty_model__["a" /* AddPropertyModel */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__["a" /* SweetAlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__["a" /* SweetAlertService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["c" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["c" /* DomSanitizer */]) === "function" && _e || Object])
], AddPropertyComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=add-property.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/properties/properties.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/properties/properties.component.html":
/***/ (function(module, exports) {

module.exports = "\n               <div class=\"container-fluid\">\n                  <div class=\"row\">\n                     <div class=\"col-md-6\">\n                     <div class=\"form-group\">\n                  <label>Manage Properties</label>\n                  <div class=\"d-flex\">\n                  <button class=\"all-btn\">All</button>\n                  <input style=\"max-width:200px\" class=\"form-control\" type=\"text\" name=\"\">\n                  </div>\n                  </div>\n                   </div>\n                   <div class=\"col-md-2\">\n                  <div class=\"form-group\">\n                  <label>Country</label>\n                   <select class=\"form-control\">\n                      <option>All</option>\n                      <option>All</option>\n                      <option>All</option>\n                   </select>\n                  </div>\n                  </div>\n                  <div class=\"col-md-2\">\n                  <div class=\"form-group\">\n                  <label>City</label>\n                   <select class=\"form-control\">\n                      <option>All</option>\n                      <option>All</option>\n                      <option>All</option>\n                   </select>\n                  </div>\n                  </div>\n   \n                  <div class=\"col-md-2\">\n                  <div class=\"form-group\">\n                  <label>Neighbourhood</label>\n                   <select class=\"form-control\">\n                      <option>All</option>\n                      <option>All</option>\n                      <option>All</option>\n                   </select>\n                  </div>\n                  </div>\n                  </div>\n   \n                  <div class=\"row\">\n                        <div class=\"col-md-12\">\n                           <div class=\"cust-tabs-2\">\n                              <ul class=\"nav nav-tabs float-left\">\n                                 <li class=\"nav-item\">\n                                    <a class=\"nav-link\" data-toggle=\"tab\" href=\"#tw\">This Week</a>\n                                 </li>\n                                 <li class=\"nav-item\">\n                                    <a class=\"nav-link\" data-toggle=\"tab\" href=\"#tm\">This Month</a>\n                                 </li>\n                                 <li class=\"nav-item\">\n                                    <a class=\"nav-link active\" data-toggle=\"tab\" href=\"#lm\">Last Month</a>\n                                 </li>\n                                 <li class=\"nav-item\">\n                                    <a class=\"nav-link\" data-toggle=\"tab\" href=\"#lt\">Lifetime</a>\n                                 </li>\n                                 <li class=\"nav-item\">\n                                    <a class=\"nav-link\" data-toggle=\"tab\" href=\"#cust\">Custom</a>\n                                 </li>\n                              </ul>\n                           </div>\n                        </div>\n                        <div class=\"col-12\">\n                           <hr style=\"margin-top:0;\">\n                        </div>\n                     </div>\n                \n                     <div class=\"row\">\n                        <div class=\"col-lg-4 col-md-12 col-sm-12 col-12\">\n                           <div class=\"info-box-2\">\n                              <div class=\"one-row\">\n                                 <div class=\"o-block\">\n                                    <h5>Properties</h5>\n                                    <small>Requests Pending</small>\n                                 </div>\n                                 <div class=\"o-block\">\n                                    <a class=\"view-all\" href=\"javascript://\">View All</a>\n                                    <h4>15</h4>\n                                 </div>\n                              </div>\n                                <div class=\"one-row\">\n                                 <div class=\"o-block\">\n                                    <h5>Buildings</h5>\n                                    <small>Total Available</small>\n                                 </div>\n                                 <div class=\"o-block\">\n                                    <span class=\"view-all\">&nbsp;</span>\n                                    <h4>15</h4>\n                                 </div>\n                              </div>\n                             \n                           </div>\n                        </div>\n                       <div class=\"col-lg-4 col-md-12 col-sm-12 col-12\">\n                           <div class=\"four-block\">\n                              <div class=\"d-flex\">\n                                 <div class=\"f-block approved\">\n                                    <h5>Approved</h5>\n                                    <h3>25</h3>\n                                 </div>\n                                 <div class=\"f-block unapproved\">\n                                    <h5>Unapproved</h5>\n                                    <h3>02</h3>\n                                 </div>\n                              </div>\n                              <div class=\"d-flex\">\n                                 <div class=\"f-block pending active\">\n                                    <h5>Pending</h5>\n                                    <h3>01</h3>\n                                 </div>\n                                 <div class=\"f-block unapproved\">\n                                    <h5>In Draft</h5>\n                                    <h3>02</h3>\n                                 </div>\n                              </div>\n                           </div>\n                        </div>\n                        <div class=\"col-lg-4 col-md-12 col-sm-12 col-12\">\n                           <div class=\"chat-msg\">\n                              <div class=\"row\">\n                                 <div class=\"col-6\">\n                                    <h5>Chat</h5>\n                                 </div>\n                                 <div class=\"col-6 text-right\"><a class=\"msg\" href=\"javascript://\">Message</a></div>\n                              </div>\n                              <p>Waiting for response</p>\n                              <p>\n                                 <strong>Mario Hudson</strong>\n                                 When you are free to have a meeting \n                                 with interested customers?\n                              </p>\n                              <p>\n                                 <strong>Rosie Benson</strong>\n                                 Is there any availability in the localities\n                                 I was asking you tomorrow and also p…\n                              </p>\n                           </div>\n                        </div>\n                     </div>\n                     <div class=\"spacer50\"></div>\n                      <div class=\"cust-tabs\">\n                      <div class=\"row flex-wrap-reverse\">\n                         \n                      <div class=\"col-xl-10 col-lg-12 col-md-12 col-sm-12 col-12\">\n                        <ul class=\"nav nav-tabs\">\n                           <li class=\"nav-item\">\n                              <a class=\"nav-link active\" data-toggle=\"tab\" href=\"#approved\">Approved</a>\n                           </li>\n                           <li class=\"nav-item\">\n                              <a class=\"nav-link\" data-toggle=\"tab\" href=\"#unapproved\">Unapproved</a>\n                           </li>\n                            <li class=\"nav-item\">\n                              <a class=\"nav-link\" data-toggle=\"tab\" href=\"#pending-review\">Pending Review</a>\n                           </li>\n                            <li class=\"nav-item\">\n                              <a class=\"nav-link\" data-toggle=\"tab\" href=\"#in-draft\">In Draft</a>\n                           </li>\n                        </ul>\n                        </div>\n\n                        <div class=\"col-xl-2 col-lg-12 col-md-12 col-sm-12 col-12\"><div class=\"add-new text-left\">\n                              <a class=\"btn\" href=\"javascript://\" routerLink=\"/dashboard/properties/add-property\">+Add New Property</a>\n                           </div></div>\n                           </div>\n                        <div class=\"tab-content\">\n                           <div class=\"tab-pane active\">\n                              <div class=\"tabel-section\">\n                                 <div class=\"table-responsive\">\n                                    <table class=\"table table-striped table-align-left\">\n                                       <tr>\n                                          <th>\n                                             <div class=\"table-search\">\n                                                <label>Name of Building</label>\n                                                <input type=\"Search here\" name=\"\">\n                                             </div>\n                                          </th>\n                                          <th>\n                                             <div class=\"table-search\">\n                                                <label>Configuration</label>\n                                                <input type=\"Search here\" name=\"\">\n                                             </div>\n                                          </th>\n                                          <th style=\"vertical-align:top;\">\n                                             <div class=\"d-flex\"><span>Price</span><a href=\"javascript://\"><img src=\"./../../../assets/img/top-arrow.png\" alt=\"img\"></a></div>\n                                          </th>\n                                         <th style=\"vertical-align:top;\">\n                                             <div class=\"d-flex\"><span>Availability</span>\n                                             <a href=\"javascript://\"><img src=\"./../../../assets/img/top-arrow.png\" alt=\"img\"></a>\n                                             </div>\n                                          </th>\n                                          <th style=\"vertical-align:top;\">\n                                             <div class=\"-d-flex\"><span>Leads</span><a href=\"javascript://\"><img src=\"./../../../assets/img/top-arrow.png\" alt=\"img\"></a></div>\n                                          </th>\n                                          <th>&nbsp;</th>\n                                       </tr>\n                                 \n                                       <tr>\n                                           <td>\n                                             <strong>Home Land Towers</strong>\n                                             <div class=\"clearfix\"></div>\n                                             <small>3 Properties</small>                                     \n   \n                                           </td>\n                                           <td>4 BHK</td>\n                                           <td>570 Balistreri Mews Apt. 293</td>\n                                           <td><span class=\"green-color\">3</span></td>\n                                           <td>14</td>\n                                           <td>\n                                             <div class=\"message\">\n                                             <span></span>\n                                             <i class=\"fa fa-envelope\" aria-hidden=\"true\"></i>\n   \n                                             </div>\n   \n                                           </td>\n                                       </tr>\n                                        <tr>\n                                           <td>\n                                             &nbsp; \n                                              </td>\n                                           <td>4 BHK</td>\n                                           <td>$56.6k</td>\n                                          <td><span class=\"green-color\">1</span></td>\n                                           <td>14</td>\n                                           <td>\n                                             <div class=\"message\">\n                                             <span></span>\n                                             <i class=\"fa fa-envelope\" aria-hidden=\"true\"></i>\n   \n                                             </div>\n                                       </tr>\n                                        <tr>\n                                           <td>\n                                             &nbsp; \n                                              </td>\n                                           <td>4 BHK</td>\n                                           <td>570 Balistreri Mews Apt. 293</td>\n                                           <td><span class=\"red-color\">0</span></td>\n                                           <td>14</td>\n                                          <td>\n                                             <div class=\"message\">\n                                           \n                                             <i class=\"fa fa-envelope\" aria-hidden=\"true\"></i>\n   \n                                             </div>\n                                       </tr>\n                                        <tr>\n                                           <td>\n                                             <strong>Home Land Towers</strong>\n                                             <div class=\"clearfix\"></div>\n                                             <small>3 Properties</small>                                     \n   \n                                           </td>\n                                           <td>Sell Only</td>\n                                           <td>$56.6k</td>\n                                              <td><span class=\"green-color\">2</span></td>\n   \n                                           <td>14</td>\n                                        <td>\n                                             <div class=\"message\">\n                                              \n                                             <i class=\"fa fa-envelope\" aria-hidden=\"true\"></i>\n   \n                                             </div>\n                                       </tr>\n                                        <tr>\n                                           <td>\n                                             &nbsp; \n                                              </td>\n                                           <td>4 BHK</td>\n                                           <td>570 Balistreri Mews Apt. 293</td>\n                                              <td><span class=\"green-color\">2</span></td>\n   \n                                           <td>14</td>\n                                           <td>\n                                             <div class=\"message\">\n                                             <span></span>\n                                             <i class=\"fa fa-envelope\" aria-hidden=\"true\"></i>\n   \n                                             </div>\n                                       </tr>\n                                        <tr>\n                                           <td>\n                                             &nbsp; \n                                              </td>\n                                           <td>4 BHK</td>\n                                           <td>570 Balistreri Mews Apt. 293</td>\n                                              <td><span class=\"green-color\">1</span></td>\n   \n                                           <td>14</td>\n                                          <td>\n                                             <div class=\"message\">\n                                             \n                                             <i class=\"fa fa-envelope\" aria-hidden=\"true\"></i>\n   \n                                             </div>\n                                       </tr>\n                                    </table>\n                                 </div>\n                              </div>\n                              <div class=\"btn-cont text-right marginT15\">\n                                 <button class=\"btn btn-secondary\">View All</button>\n                              </div>\n                           </div>\n                           <div class=\"tab-pane container fade\" id=\"seller\">Seller tab on</div>\n                        </div>\n                     </div>\n                     \n                  </div>"

/***/ }),

/***/ "../../../../../src/app/layout/properties/properties.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PropertiesComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PropertiesComponent = (function () {
    function PropertiesComponent() {
    }
    PropertiesComponent.prototype.ngOnInit = function () {
    };
    return PropertiesComponent;
}());
PropertiesComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-properties',
        template: __webpack_require__("../../../../../src/app/layout/properties/properties.component.html"),
        styles: [__webpack_require__("../../../../../src/app/layout/properties/properties.component.css")]
    }),
    __metadata("design:paramtypes", [])
], PropertiesComponent);

//# sourceMappingURL=properties.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/properties/properties.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__properties_component__ = __webpack_require__("../../../../../src/app/layout/properties/properties.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__add_property_add_property_component__ = __webpack_require__("../../../../../src/app/layout/properties/add-property/add-property.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ngx_loading__ = __webpack_require__("../../../../ngx-loading/ngx-loading/ngx-loading.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertiesModule", function() { return PropertiesModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var routes = [
    { path: 'add-property', component: __WEBPACK_IMPORTED_MODULE_4__add_property_add_property_component__["a" /* AddPropertyComponent */] },
    { path: 'view-properties', component: __WEBPACK_IMPORTED_MODULE_2__properties_component__["a" /* PropertiesComponent */] }
];
var PropertiesModule = (function () {
    function PropertiesModule() {
    }
    return PropertiesModule;
}());
PropertiesModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* RouterModule */].forChild(routes),
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["h" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_forms__["b" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_6_ngx_loading__["a" /* LoadingModule */].forRoot({
                animationType: __WEBPACK_IMPORTED_MODULE_6_ngx_loading__["b" /* ANIMATION_TYPES */].rectangleBounce,
                primaryColour: '#00B96F'
            }),
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__properties_component__["a" /* PropertiesComponent */],
            __WEBPACK_IMPORTED_MODULE_4__add_property_add_property_component__["a" /* AddPropertyComponent */]
        ]
    })
], PropertiesModule);

//# sourceMappingURL=properties.module.js.map

/***/ }),

/***/ "../../../../../src/app/models/addProperty.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export CarpetAreas */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddPropertyModel; });
var CarpetAreas = (function () {
    function CarpetAreas() {
        this.carpet_areas = [
            {
                area: 0,
                price: 0
            }
        ];
    }
    return CarpetAreas;
}());

var AddPropertyModel = (function () {
    function AddPropertyModel() {
        this.id = '';
        this.for_rent = false;
        this.for_sale = false;
        this.country_id = '';
        this.state_id = '';
        this.city_id = '';
        this.locality_id = '';
        this.configuration_id = '';
        this.carpet_areas = [
            {
                area: 0,
                price: 0
            }
        ];
        this.property_type_id = '';
        this.property_id = '';
        this.bedroom = '0';
        this.bathroom = '0';
        this.floor = '0';
        this.parking = '0';
        this.furnished = '0';
        this.description = '';
        this.quantity = '0';
        this.pets = '0';
        this.marital_status = '0';
        this.custom_attributes = [
            {
                name: '',
                value: ''
            }
        ];
    }
    return AddPropertyModel;
}());

//# sourceMappingURL=addProperty.model.js.map

/***/ })

});
//# sourceMappingURL=1.chunk.js.map