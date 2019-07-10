(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["agencies-agencies-module"],{

/***/ "./src/app/layout/agencies/add-agency/add-agency.component.css":
/*!*********************************************************************!*\
  !*** ./src/app/layout/agencies/add-agency/add-agency.component.css ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/layout/agencies/add-agency/add-agency.component.html":
/*!**********************************************************************!*\
  !*** ./src/app/layout/agencies/add-agency/add-agency.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<div class=\"container-fluid\">\n<div class=\"row\">\n    <div class=\"col-12\">\n      <div class=\"title-group\">\n          <h5>{{model.id ? 'Edit' : 'Add'}} Agency</h5>\n          <div class=\"spacer30\"></div>\n      </div>\n    </div>\n</div>\n\n<div class=\"white-bg padding40\">\n    <div class=\"row\">\n    <form role=\"form\" ngNativeValidate #addForm=\"ngForm\" (ngSubmit)=\"add(addForm)\">\n      <div class=\"col-xl-12 col-lg-12 col-md-12 col-12\">\n          <div class=\"row\">\n            <div class=\"col-2\">\n                <div class=\"add-img\" style=\"display:flex;\">\n                    <img *ngIf=\"image\" [src]=\"image\" style=\"object-fit: cover; width: 100%;\">\n                    <label *ngIf=\"model?.image\">\n                      <input accept=\"image/*\" name=\"image\" class=\"image\" (change)=\"changeListner($event, 'image')\" type=\"file\">\n                    </label>\n                    <label *ngIf=\"!image\">+ Add Image</label>\n                    <input *ngIf=\"!image\" accept=\"image/*\" name=\"image\" class=\"image\" (change)=\"changeListner($event, 'image')\" type=\"file\">\n                </div>\n            </div>\n            <!-- <div class=\"col-2\">\n                <div class=\"add-img\" style=\"display:flex;\">\n                    <img *ngIf=\"developer_image\" [src]=\"developer_image\" style=\"object-fit: cover; width: 100%;\">\n                    <label *ngIf=\"model?.developer_image\">\n                      <input accept=\"image/*\" name=\"image\" class=\"image\" (change)=\"changeListner($event, 'developer_image')\" type=\"file\">\n                    </label>\n                    <label *ngIf=\"!developer_image\">+ Add Cover Image</label>\n                    <input *ngIf=\"!developer_image\" accept=\"image/*\" name=\"image\" class=\"image\" (change)=\"changeListner($event, 'developer_image')\" type=\"file\">\n                </div>\n            </div> -->\n            <div class=\"col-8\">\n                <div class=\"btn-cont text-right\">\n                    <button *ngIf=\"!model?.id\" type=\"submit\" [disabled]=\"!addForm.valid\" class=\"btn btn-primary\">ADD</button>\n                    <button *ngIf=\"model?.id\" type=\"submit\" class=\"btn btn-primary\">UPDATE</button>\n                </div>\n            </div>\n            <div class=\"col-12\">\n                <div class=\"spacer40\"></div>\n            </div>\n            <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                  <label>Company Name <span class=\"color-red\">*</span></label>\n                  <input autocomplete=\"off\" required type=\"text\" class=\"form-control\" [(ngModel)]=\"model.name\" name=\"name\">\n                </div>\n            </div>\n            <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                  <label>Contact number <span class=\"color-red\">*</span></label>\n                  <input minlength=\"6\" maxlength=\"16\" autocomplete=\"off\" type=\"text\" [pattern]=\"constant.phonePattern\" class=\"form-control\" id=\"phone\" required minlength=\"1\" [(ngModel)]=\"model.phone\" name=\"phone\"\n                        ng2TelInput [ng2TelInputOptions]=\"initialCountry\" (countryChange)=\"onCountryCodeChange($event)\" />\n                </div>\n            </div>\n            <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                  <label>Email ID <span class=\"color-red\">*</span></label>\n                  <input (keydown.space)=\"$event.preventDefault();\" autocomplete=\"off\" required [pattern]=\"constant.emailPattern\" type=\"email\" class=\"form-control\" [(ngModel)]=\"model.email\" name=\"email\">\n                </div>\n            </div>\n            <!-- <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                  <label>Company Name <span class=\"color-red\">*</span></label>\n                  <input autocomplete=\"off\" required type=\"text\" class=\"form-control\" [(ngModel)]=\"model.developer_company\" name=\"developer_company\">\n                </div>\n            </div> -->\n\n            <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                  <label>Address <span class=\"color-red\">*</span></label>\n                  <input placeholder=\"Search for address\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"off\" type=\"text\" class=\"form-control\" #search (input)=\"loadPlaces('address', 'lat', 'lng', 'searchElementRef')\" name=\"address\" [(ngModel)]=\"model.address\" autocomplete=\"off\">\n                </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                  <label>Location Pin on Map<span class=\"color-red\">*</span></label>\n                  <agm-map class=\"height200\" [latitude]=\"model.lat\" [longitude]=\"model.lng\" [scrollwheel]=\"false\" (mapClick)=\"placeMarker($event, 'lat', 'lng')\" [zoom]=\"constant.zoom\">\n                    <agm-marker [latitude]=\"model.lat\" [longitude]=\"model.lng\"></agm-marker>\n                  </agm-map>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>Description <span class=\"color-red\">*</span></label>\n                <textarea autocomplete=\"off\" required rows=\"3\" class=\"form-control\" name=\"description\" [(ngModel)]=\"model.description\"></textarea>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>Branch Office</label>\n                <input placeholder=\"Search for branch office\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"off\" type=\"text\" class=\"form-control\" #search1 (input)=\"loadPlaces('branch_office', 'branch_lat', 'branch_lng', 'search1ElementRef')\" name=\"branch_office\" [(ngModel)]=\"model.branch_office\" autocomplete=\"off\">\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                  <label>Location Pin on Map</label>\n                  <agm-map class=\"height200\" [latitude]=\"model.branch_lat\" [longitude]=\"model.branch_lng\" [scrollwheel]=\"false\" (mapClick)=\"placeMarker($event, 'branch_lat', 'branch_lng')\" [zoom]=\"constant.zoom\">\n                    <agm-marker [latitude]=\"model.branch_lat\" [longitude]=\"model.branch_lng\"></agm-marker>\n                  </agm-map>\n              </div>\n            </div>\n            \n\n\n          </div>\n      </div>\n      </form>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/layout/agencies/add-agency/add-agency.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/layout/agencies/add-agency/add-agency.component.ts ***!
  \********************************************************************/
/*! exports provided: AddAgencyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddAgencyComponent", function() { return AddAgencyComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_admin_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var _services_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../../services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../../common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");
/* harmony import */ var src_app_models_agency_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/models/agency.model */ "./src/app/models/agency.model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AddAgencyComponent = /** @class */ (function () {
    function AddAgencyComponent(constant, cs, mapsAPILoader, ngZone, admin, route) {
        this.constant = constant;
        this.cs = cs;
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.admin = admin;
        this.route = route;
        this.parameter = {};
        this.show = false;
    }
    AddAgencyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.model = new src_app_models_agency_model__WEBPACK_IMPORTED_MODULE_6__["Agency"]();
        this.setCurrentPosition();
        this.model.country_code = this.constant.country_code;
        this.model.dial_code = this.constant.dial_code;
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.p = this.constant.p;
        this.initialCountry = { initialCountry: this.constant.country_code };
        this.parameter.sub = this.route.params.subscribe(function (params) {
            if (params['id'] !== '0') {
                console.log('aaa', _this.model);
                _this.model.id = params['id'];
                _this.getAgencyById(_this.model.id);
            }
            else {
                console.log('aaa', _this.model);
                _this.model.id = '';
            }
        });
    };
    AddAgencyComponent.prototype.getAgencyById = function (id) {
        var _this = this;
        this.parameter.loading = true;
        this.admin.postDataApi('getAgencyById', { 'id': id })
            .subscribe(function (success) {
            _this.parameter.loading = false;
            _this.model = success.data;
            _this.image = _this.model.image;
            console.log('==', _this.model);
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    AddAgencyComponent.prototype.set = function () {
        this.show = true;
    };
    AddAgencyComponent.prototype.changeListner = function (event, param) {
        var _this = this;
        var reader = new FileReader();
        reader.onload = function (e) {
            _this[param] = e.target.result;
            _this.parameter.loading = true;
            _this.cs.saveImage(event.target.files[0]).subscribe(function (success) {
                _this.parameter.loading = false;
                _this.model[param] = success['data'].image;
            });
        };
        reader.readAsDataURL(event.target.files[0]);
        console.log(this.model);
    };
    AddAgencyComponent.prototype.onCountryCodeChange = function (e) {
        this.model.country_code = e.iso2;
        this.model.dial_code = '+' + e.dialCode;
        this.initialCountry = { initialCountry: e.iso2 };
    };
    AddAgencyComponent.prototype.add = function (formData) {
        var _this = this;
        var modelSave = JSON.parse(JSON.stringify(this.model));
        if (!modelSave.lat || !modelSave.lng) {
            swal('Error', 'Please choose address from dropdown.', 'error');
            return;
        }
        this.parameter.loading = true;
        this.admin.postDataApi('addAgency', modelSave)
            .subscribe(function (success) {
            _this.parameter.loading = false;
            if (success.success === '0') {
                swal('Error', success.message, 'error');
                return;
            }
            else {
                var text = _this.model.id === '' ? 'Added successfully.' : 'Updated successfully.';
                swal('Success', text, 'success');
                if (_this.model.id === '') {
                    formData.reset();
                    _this.image = '';
                    _this.developer_image = '';
                }
            }
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    AddAgencyComponent.prototype.loadPlaces = function (paramAdd, paramLat, paramLng, searchRef) {
        var _this = this;
        // load Places Autocomplete
        this.model[paramLat] = null;
        this.model[paramLng] = null;
        this.mapsAPILoader.load().then(function () {
            var autocomplete = new google.maps.places.Autocomplete(_this[searchRef].nativeElement, {
                types: []
            });
            autocomplete.addListener('place_changed', function () {
                _this.ngZone.run(function () {
                    // get the place result
                    // const place: google.maps.places.PlaceResult = autocomplete.getPlace();
                    var place = autocomplete.getPlace();
                    // verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    // set latitude, longitude and zoom
                    _this.model[paramLat] = place.geometry.location.lat();
                    _this.model[paramLng] = place.geometry.location.lng();
                    if (place.formatted_address) {
                        _this.model[paramAdd] = place.formatted_address;
                    }
                });
            });
        });
    };
    AddAgencyComponent.prototype.setCurrentPosition = function () {
        var _this = this;
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                // setting address lat lng
                _this.model.lat = position.coords.latitude;
                _this.model.lng = position.coords.longitude;
                // setting branch office lat lng
                _this.model.branch_lat = position.coords.latitude;
                _this.model.branch_lng = position.coords.longitude;
            });
        }
    };
    AddAgencyComponent.prototype.placeMarker = function ($event, paramLat, paramLng) {
        this.model[paramLat] = $event.coords.lat;
        this.model[paramLng] = $event.coords.lng;
        this.getGeoLocation(this.model[paramLat], this.model[paramLng]);
    };
    AddAgencyComponent.prototype.getGeoLocation = function (lat, lng) {
        var _this = this;
        if (navigator.geolocation) {
            var geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(lat, lng);
            var request = { latLng: latlng };
            geocoder.geocode(request, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    var result = results[0];
                    if (result != null) {
                        _this.model.address = result.formatted_address;
                    }
                    else {
                        _this.model.address = lat + ',' + lng;
                    }
                }
            });
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('mapDiv'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddAgencyComponent.prototype, "mapDiv", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('search'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddAgencyComponent.prototype, "searchElementRef", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('search1'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddAgencyComponent.prototype, "search1ElementRef", void 0);
    AddAgencyComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-add-agency',
            template: __webpack_require__(/*! ./add-agency.component.html */ "./src/app/layout/agencies/add-agency/add-agency.component.html"),
            styles: [__webpack_require__(/*! ./add-agency.component.css */ "./src/app/layout/agencies/add-agency/add-agency.component.css")]
        }),
        __metadata("design:paramtypes", [_common_constants__WEBPACK_IMPORTED_MODULE_4__["Constant"],
            _services_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"],
            _agm_core__WEBPACK_IMPORTED_MODULE_5__["MapsAPILoader"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"],
            _services_admin_service__WEBPACK_IMPORTED_MODULE_1__["AdminService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], AddAgencyComponent);
    return AddAgencyComponent;
}());



/***/ }),

/***/ "./src/app/layout/agencies/agencies.component.css":
/*!********************************************************!*\
  !*** ./src/app/layout/agencies/agencies.component.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/layout/agencies/agencies.component.html":
/*!*********************************************************!*\
  !*** ./src/app/layout/agencies/agencies.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<div class=\"container-fluid\">\n  <div class=\"row\">\n      <div class=\"col-md-4 col-6\">\n        <div class=\"title-group\">\n            <h5>Agencies</h5>\n            <p>Showing {{parameter.items?.length}} out of {{parameter.total}}</p>\n        </div>\n      </div>\n      <div class=\"col-md-5 col-6\">\n        <div class=\"btn-cont upload-excel pull-right\">\n            <a title=\"Download Sample File\" href=\"assets/docx/Sozu_Agencies_Sample.xlsx\" class=\"btn\"><span class=\"fa fa-download\"></span></a>\n            <label title=\"Choose Excel File\" class=\"img_label\">{{label}}\n                <input type=\"file\" #fileInput accept=\".xls,.xlsx\" (change)=\"getFileName()\">\n            </label>\n            <a title=\"Upload Selected File\" (click)=\"importAgency()\" href=\"javascript://\" class=\"btn\"><span class=\"fa fa-upload\"></span></a>\n        </div>\n      </div>\n      <div class=\"col-md-3 col-6\">\n        <div class=\"btn-cont text-right\">\n            <a *ngIf=\"admin?.admin_acl['Developers Management']?.can_create==1\" class=\"btn btn-primary\" href=\"javascript://\" routerLink=\"/dashboard/agencies/add-agency/0\">+Add New</a>\n        </div>\n      </div>\n  </div>\n\n  <div class=\"white-bg\">\n      <div class=\"tabel-section\">\n        <div class=\"table-responsive\">\n          <table class=\"table table-striped table-align-left\">\n            <tr>\n              <th style=\"width:6%\">&nbsp;</th>\n              <th style=\"width:25%\">\n                <div class=\"table-search\">\n                    <label>Company Name</label>\n                    <div class=\"searh-3\">\n                      <input type=\"text\" [(ngModel)]=\"model.name\" (keyup.enter)=\"getAgencies()\" name=\"\">\n                      <button *ngIf=\"model.name\" (click)=\"getAgencies()\"><i class=\"fa fa-search\"></i></button>\n                    </div>\n                </div>\n              </th>\n              <th style=\"width:20%; text-align:left;\">\n                <div class=\"table-search\">\n                    <label>Contact Number</label>\n                    <div class=\"searh-3\">\n                      <input type=\"text\" [(ngModel)]=\"model.phone\" (keyup.enter)=\"getAgencies()\" name=\"\">\n                      <button *ngIf=\"model.phone\" (click)=\"getAgencies()\"><i class=\"fa fa-search\"></i></button>\n                    </div>\n                </div>\n              </th>\n              <th style=\"width:20%\">\n                <div class=\"table-search\">\n                    <label>Email</label>\n                    <div class=\"searh-3\">\n                      <input type=\"text\" [(ngModel)]=\"model.email\" (keyup.enter)=\"getAgencies()\" name=\"\">\n                      <button *ngIf=\"model.email\" (click)=\"getAgencies()\"><i class=\"fa fa-search\"></i></button>\n                    </div>\n                </div>\n              </th>\n              <th style=\"width:15%; vertical-align: top;\">\n                  Agent Count\n                  <a (click)=\"setBuildingsSort(model.buildings_sort==1?2:1)\" href=\"javascript://\"><img [ngClass]=\"{'upsidedown':model.buildings_sort==2}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n              </th>\n              <th style=\"width:20%\">\n                &nbsp;\n              </th>\n            </tr>\n      \n            <tr *ngFor=\"let item of parameter.items| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: parameter.total }; let i=index\">\n              <td> \n                  <img [src]=\"item.developer_image| img:'small'\" class=\"rounded-circle\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\">\n              </td>\n              <td class=\"text-left\">\n                <span class=\"name\">\n                  <a data-toggle=\"popover\" data-placement=\"top\" title=\"{{item.name}}\">{{item.name | titlecase}}</a>\n                </span>\n              </td>\n              <td class=\"text-left\" *ngIf=\"item.phone\">{{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}</td>\n              <td class=\"text-left\" *ngIf=\"!item.phone\">NA</td>\n              <td class=\"text-left\">{{item.email}}</td>\n              <td class=\"text-left\">{{item.buildings_count}}</td>\n              <td>\n                <button title=\"Edit Details\" [disabled]=\"admin?.admin_acl['Developers Management']?.can_update==0\" (click)=\"editUser(item)\" class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></button>\n                <button [disabled]=\"admin?.admin_acl['Developers Management']?.can_delete==0\"\n                  (click)=\"blockUnblockPopup(i, item.id, item.is_blocked==1?0:1)\" \n                  title=\"{{item.is_blocked==1?'Unblock Developer':'Block Developer'}}\" [ngClass]=\"{'unblock-bg':item.is_blocked==1}\"\n                  class=\"action-icon\"><img src=\"assets/img/block.png\" alt=\"img\">\n                </button>\n\n              </td>\n            </tr>\n\n          </table>\n        </div>\n      </div>\n\n      <div class=\"center\" *ngIf=\"parameter.total == 0\">\n        <img src=\"assets/img/404-error.png\">\n      </div>\n  </div>\n  \n  <div class=\"btn-cont text-right marginT15\" *ngIf=\"parameter.total\">\n    <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n  </div>\n  \n</div>\n"

/***/ }),

/***/ "./src/app/layout/agencies/agencies.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/layout/agencies/agencies.component.ts ***!
  \*******************************************************/
/*! exports provided: AgenciesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgenciesComponent", function() { return AgenciesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_admin_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var _models_users_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../models/users.model */ "./src/app/models/users.model.ts");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AgenciesComponent = /** @class */ (function () {
    function AgenciesComponent(constant, admin, router) {
        this.constant = constant;
        this.admin = admin;
        this.router = router;
        this.parameter = {};
    }
    AgenciesComponent.prototype.ngOnInit = function () {
        this.label = 'Choose Agencies File';
        this.model = new _models_users_model__WEBPACK_IMPORTED_MODULE_2__["Users"]();
        this.model.buildings_sort = 2; // 2 means desc
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        this.getAgencies();
    };
    AgenciesComponent.prototype.getPage = function (page) {
        this.parameter.page = page;
        this.getAgencies();
    };
    AgenciesComponent.prototype.getFileName = function () {
        var fi = this.fileInput.nativeElement;
        var uploadedFile = fi.files[0];
        this.label = uploadedFile.name;
    };
    AgenciesComponent.prototype.setBuildingsSort = function (buildings_sort) {
        this.model.buildings_sort = buildings_sort;
        this.getAgencies();
    };
    AgenciesComponent.prototype.getAgencies = function () {
        var _this = this;
        this.model.page = this.parameter.page;
        // this.parameter.loading = true;
        this.admin.postDataApi('getAgencies', this.model)
            .subscribe(function (success) {
            // this.parameter.loading = false;
            _this.parameter.items = success.data;
            _this.parameter.total = success.total_count;
        }, function (error) {
            // this.parameter.loading = false;
        });
    };
    AgenciesComponent.prototype.editUser = function (item) {
        this.router.navigate(['/dashboard/agencies/add-agency', item.id]);
    };
    AgenciesComponent.prototype.blockUnblockPopup = function (index, id, flag) {
        var _this = this;
        this.parameter.index = index;
        this.parameter.title = this.constant.title.ARE_YOU_SURE;
        switch (flag) {
            case 0:
                this.parameter.text = this.constant.title.UNBLOCK_AGENCY;
                this.parameter.successText = this.constant.successMsg.UNBLOCKED_SUCCESSFULLY;
                break;
            case 1:
                this.parameter.text = this.constant.title.BLOCK_AGENCY;
                this.parameter.successText = this.constant.successMsg.BLOCKED_SUCCESSFULLY;
                break;
        }
        swal({
            html: this.parameter.title + '<br>' + this.parameter.text,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.blockAgency(index, id, flag);
            }
        });
    };
    AgenciesComponent.prototype.blockAgency = function (index, id, flag) {
        var _this = this;
        this.parameter.index = index;
        this.parameter.url = 'blockAgency';
        var input = new FormData();
        input.append('agency_id', id);
        input.append('flag', flag);
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('success', success);
            swal('Success', _this.parameter.successText, 'success');
            _this.parameter.items[_this.parameter.index] = success.data;
        });
    };
    AgenciesComponent.prototype.importAgency = function () {
        var _this = this;
        var file = this.fileInput.nativeElement;
        var attachment;
        if (file.files && file.files[0]) {
            attachment = file.files[0];
            if (attachment.size > this.constant.fileSizeLimit) {
                swal('Error', 'File size is more than 25MB.', 'error');
                return false;
            }
            this.parameter.loading = true;
            var input = new FormData();
            input.append('attachment', attachment);
            this.admin.postDataApi('importAgency', input)
                .subscribe(function (success) {
                _this.parameter.loading = false;
                _this.fileInput.nativeElement.value = '';
                _this.label = 'Choose Agencies File';
                swal('Success', 'Imported successfully.', 'success');
                _this.getAgencies();
            }, function (error) {
                _this.parameter.loading = false;
            });
        }
        else {
            swal('Error', 'Please choose file', 'error');
            return false;
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('fileInput'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AgenciesComponent.prototype, "fileInput", void 0);
    AgenciesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-agencies',
            template: __webpack_require__(/*! ./agencies.component.html */ "./src/app/layout/agencies/agencies.component.html"),
            styles: [__webpack_require__(/*! ./agencies.component.css */ "./src/app/layout/agencies/agencies.component.css")]
        }),
        __metadata("design:paramtypes", [_common_constants__WEBPACK_IMPORTED_MODULE_3__["Constant"], _services_admin_service__WEBPACK_IMPORTED_MODULE_1__["AdminService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], AgenciesComponent);
    return AgenciesComponent;
}());



/***/ }),

/***/ "./src/app/layout/agencies/agencies.module.ts":
/*!****************************************************!*\
  !*** ./src/app/layout/agencies/agencies.module.ts ***!
  \****************************************************/
/*! exports provided: AgenciesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgenciesModule", function() { return AgenciesModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_loading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-loading */ "./node_modules/ngx-loading/fesm5/ngx-loading.js");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ng2_tel_input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ng2-tel-input */ "./node_modules/ng2-tel-input/ng2-tel-input.js");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");
/* harmony import */ var _guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../guards/acl-user.guard */ "./src/app/guards/acl-user.guard.ts");
/* harmony import */ var _modules_shared_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../modules/shared.module */ "./src/app/modules/shared.module.ts");
/* harmony import */ var _agencies_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./agencies.component */ "./src/app/layout/agencies/agencies.component.ts");
/* harmony import */ var _add_agency_add_agency_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./add-agency/add-agency.component */ "./src/app/layout/agencies/add-agency/add-agency.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// third party libraries












var routes = [
    { path: '', component: _agencies_component__WEBPACK_IMPORTED_MODULE_10__["AgenciesComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_8__["AclUserGuard"]], data: { roles: ['User Management', 'can_read', ''] } },
    { path: 'add-agency/:id', component: _add_agency_add_agency_component__WEBPACK_IMPORTED_MODULE_11__["AddAgencyComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_8__["AclUserGuard"]], data: { roles: ['User Management', 'can_read', ''] } }
];
var AgenciesModule = /** @class */ (function () {
    function AgenciesModule() {
    }
    AgenciesModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes),
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                ngx_loading__WEBPACK_IMPORTED_MODULE_3__["NgxLoadingModule"].forRoot({
                    animationType: ngx_loading__WEBPACK_IMPORTED_MODULE_3__["ngxLoadingAnimationTypes"].rectangleBounce,
                    primaryColour: '#00B96F'
                }),
                _agm_core__WEBPACK_IMPORTED_MODULE_7__["AgmCoreModule"].forRoot({
                    apiKey: 'AIzaSyDykCJGMqHIwJluSmSiqKTJBVN2KauM_uQ',
                    libraries: ['drawing', 'places']
                }),
                ngx_pagination__WEBPACK_IMPORTED_MODULE_4__["NgxPaginationModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
                ng2_tel_input__WEBPACK_IMPORTED_MODULE_6__["Ng2TelInputModule"],
                _modules_shared_module__WEBPACK_IMPORTED_MODULE_9__["SharedModule"]
            ],
            declarations: [
                _agencies_component__WEBPACK_IMPORTED_MODULE_10__["AgenciesComponent"],
                _add_agency_add_agency_component__WEBPACK_IMPORTED_MODULE_11__["AddAgencyComponent"]
            ]
        })
    ], AgenciesModule);
    return AgenciesModule;
}());



/***/ })

}]);
//# sourceMappingURL=agencies-agencies-module.js.map