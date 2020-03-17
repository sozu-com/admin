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

module.exports = "\n<div class=\"container-fluid\">\n<div class=\"row\">\n    <div class=\"col-12\">\n      <div class=\"title-group\">\n        <h5>{{model.id!='' ? ('viewAgency.editAgency' | translate) : ('viewAgency.addAgency' | translate)}}</h5>\n        <div class=\"spacer30\"></div>\n      </div>\n    </div>\n</div>\n\n<div class=\"white-bg padding40\">\n    <div class=\"row\">\n    <form role=\"form\" ngNativeValidate #addForm=\"ngForm\" (ngSubmit)=\"add(addForm)\">\n      <div class=\"col-xl-12 col-lg-12 col-md-12 col-12\">\n          <div class=\"row\">\n            <div class=\"col-2\">\n              <div class=\"add-img\" style=\"display:flex;\">\n                  <img *ngIf=\"model?.image\" [src]=\"model?.image\" [defaultImage]=\"model?.image| img:'thumb'\" [lazyLoad]=\"model?.image\" style=\"object-fit: cover; width: 100%;\">\n                  <label *ngIf=\"model?.image\">\n                    <input accept=\"image/*\" name=\"image\" class=\"image\" (change)=\"changeListner($event, 'img_loader', 'image')\" type=\"file\">\n                  </label>\n                  <label *ngIf=\"!model?.image\">{{'addForm.image' | translate}}</label>\n                  <input *ngIf=\"!model?.image\" accept=\"image/*\" name=\"image\" class=\"image\" (change)=\"changeListner($event, 'img_loader', 'image')\" type=\"file\">\n                  <div *ngIf=\"model.img_loader\" class=\"loaderr\"></div>\n              </div>\n            </div>\n            <div class=\"col-2\">\n                <div class=\"add-img\" style=\"display:flex;\">\n                    <img *ngIf=\"model?.logo\" [src]=\"model?.logo\" [defaultImage]=\"model?.logo| img:'thumb'\" [lazyLoad]=\"model?.logo\" style=\"object-fit: cover; width: 100%;\">\n                    <label *ngIf=\"model?.logo\">\n                      <input accept=\"image/*\" name=\"image\" class=\"image\" (change)=\"changeListner($event, 'logo_loader', 'logo')\" type=\"file\">\n                    </label>\n                    <label *ngIf=\"!model?.logo\">{{'addForm.logo' | translate}}</label>\n                    <input *ngIf=\"!model?.logo\" accept=\"image/*\" name=\"image\" class=\"image\" (change)=\"changeListner($event, 'logo_loader', 'logo')\" type=\"file\">\n                    <div *ngIf=\"model.logo_loader\" class=\"loaderr\"></div>\n                </div>\n            </div>\n            <div class=\"col-8\">\n                <div class=\"btn-cont text-right\">\n                    <button *ngIf=\"!model?.id\" type=\"submit\" [disabled]=\"!addForm.valid\" class=\"btn btn-primary\">{{'addForm.addBtn' | translate}}</button>\n                    <button *ngIf=\"model?.id\" type=\"submit\" class=\"btn btn-primary\">{{'addForm.updateBtn' | translate}}</button>\n                </div>\n            </div>\n            <div class=\"col-12\">\n                <div class=\"spacer40\"></div>\n            </div>\n\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.companyCommercialName' | translate}}<span class=\"color-red\">*</span></label>\n                <input autocomplete=\"off\" [pattern]=\"constant.onlyWhiteSpaces\" required type=\"text\" class=\"form-control\" [(ngModel)]=\"model.name\" name=\"name\">\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.rfcLegalId' | translate}}\n                  <!-- <span class=\"color-red\">*</span> -->\n                </label>\n                <input autocomplete=\"off\" [pattern]=\"constant.onlyWhiteSpaces\" type=\"text\" class=\"form-control\" [(ngModel)]=\"model.rfc\" name=\"rfc\">\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.razonSocial' | translate}}\n                  <!-- <span class=\"color-red\">*</span> -->\n                </label>\n                <input autocomplete=\"off\" [pattern]=\"constant.onlyWhiteSpaces\" type=\"text\" class=\"form-control\" [(ngModel)]=\"model.razon_social\" name=\"razon_social\">\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.name' | translate}}\n                  <!-- <span class=\"color-red\">*</span> -->\n                </label>\n                <input autocomplete=\"off\" [pattern]=\"constant.onlyWhiteSpaces\" type=\"text\" class=\"form-control\" [(ngModel)]=\"model.person_in_charge\" name=\"person_in_charge\">\n              </div>\n            </div>\n            <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                  <label>{{'addForm.contactNumber' | translate}} \n                    <!-- <span class=\"color-red\">*</span> -->\n                  </label>\n                  <input minlength=\"6\" maxlength=\"16\" autocomplete=\"off\" type=\"text\" [pattern]=\"constant.phonePattern\" class=\"form-control\" id=\"phone\" minlength=\"1\" [(ngModel)]=\"model.phone\" name=\"phone\"\n                        ng2TelInput [ng2TelInputOptions]=\"initialCountry\" (countryChange)=\"onCountryCodeChange($event)\" />\n                </div>\n            </div>\n            <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                  <label>{{'addForm.emailId' | translate}} \n                    <!-- <span class=\"color-red\">*</span> -->\n                  </label>\n                  <input (keydown.space)=\"$event.preventDefault();\" autocomplete=\"off\" [pattern]=\"constant.emailPattern\" type=\"email\" class=\"form-control\" [(ngModel)]=\"model.email\" name=\"email\">\n                </div>\n            </div>\n            <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                  <label>{{'addForm.address' | translate}} \n                    <!-- <span class=\"color-red\">*</span> -->\n                  </label>\n                  <input placeholder=\"{{'addForm.placeholder.searchForAddress' | translate}}\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"off\" type=\"text\" class=\"form-control\" #search (input)=\"loadPlaces('address', 'lat', 'lng', 'searchElementRef')\" name=\"address\" [(ngModel)]=\"model.address\" autocomplete=\"off\">\n                </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                  <label>{{'addForm.locationPinOnMap' | translate}}\n                    <!-- <span class=\"color-red\">*</span> -->\n                  </label>\n                  <agm-map class=\"height200\" [latitude]=\"model.lat\" [longitude]=\"model.lng\" [scrollwheel]=\"false\" (mapClick)=\"placeMarker($event, 'address', 'lat', 'lng')\" [zoom]=\"constant.zoom\">\n                    <agm-marker [latitude]=\"model.lat\" [longitude]=\"model.lng\"></agm-marker>\n                  </agm-map>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.description' | translate}} \n                  <!-- <span class=\"color-red\">*</span> -->\n                </label>\n                <textarea autocomplete=\"off\" rows=\"3\" class=\"form-control\" name=\"description\" [(ngModel)]=\"model.description\"></textarea>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.branchOffice' | translate}}\n                  <!-- <span class=\"color-red\">*</span> -->\n                </label>\n                <input placeholder=\"{{'addForm.placeholder.searchForBranch' | translate}}\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"off\" type=\"text\" class=\"form-control\" #search1 (input)=\"loadPlaces('branch_office', 'branch_lat', 'branch_lng', 'search1ElementRef')\" name=\"branch_office\" [(ngModel)]=\"model.branch_office\" autocomplete=\"off\">\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                  <label>{{'addForm.locationPinOnMap' | translate}}</label>\n                  <agm-map class=\"height200\" [latitude]=\"model.branch_lat\" [longitude]=\"model.branch_lng\" [scrollwheel]=\"false\" (mapClick)=\"placeMarker($event, 'branch_office', 'branch_lat', 'branch_lng')\" [zoom]=\"constant.zoom\">\n                    <agm-marker [latitude]=\"model.branch_lat\" [longitude]=\"model.branch_lng\"></agm-marker>\n                  </agm-map>\n              </div>\n            </div>\n            \n          </div>\n      </div>\n      </form>\n    </div>\n</div>\n"

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
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");
/* harmony import */ var src_app_models_agency_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/agency.model */ "./src/app/models/agency.model.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
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
    function AddAgencyComponent(router, constant, cs, mapsAPILoader, ngZone, admin, route, spinner, translate) {
        this.router = router;
        this.constant = constant;
        this.cs = cs;
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.admin = admin;
        this.route = route;
        this.spinner = spinner;
        this.translate = translate;
        this.parameter = {};
        this.show = false;
    }
    AddAgencyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.model = new src_app_models_agency_model__WEBPACK_IMPORTED_MODULE_3__["Agency"]();
        this.setCurrentPosition();
        this.model.country_code = this.constant.country_code;
        this.model.dial_code = this.constant.dial_code;
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.p = this.constant.p;
        this.initialCountry = { initialCountry: this.constant.country_code };
        this.parameter.sub = this.route.params.subscribe(function (params) {
            if (params['id'] !== '0') {
                _this.model.id = params['id'];
                _this.getAgencyById(_this.model.id);
            }
            else {
                _this.model.id = '';
            }
        });
    };
    AddAgencyComponent.prototype.getAgencyById = function (id) {
        var _this = this;
        this.spinner.show();
        this.admin.postDataApi('getAgencyById', { 'id': id })
            .subscribe(function (success) {
            _this.spinner.hide();
            _this.model = success.data;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    AddAgencyComponent.prototype.set = function () {
        this.show = true;
    };
    AddAgencyComponent.prototype.changeListner = function (event, paramLoader, param) {
        var _this = this;
        if (event.target.files[0].size > this.constant.fileSizeLimit) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.fileSizeExceeds'), 'error');
            return false;
        }
        this.model[paramLoader] = true;
        var reader = new FileReader();
        reader.onload = function (e) {
            _this.model[param] = e.target.result;
            _this.cs.saveImage(event.target.files[0]).subscribe(function (success) {
                _this.model[paramLoader] = false;
                _this.model[param] = success['data'].image;
            });
        };
        reader.readAsDataURL(event.target.files[0]);
    };
    AddAgencyComponent.prototype.onCountryCodeChange = function (e) {
        this.model.country_code = e.iso2;
        this.model.dial_code = '+' + e.dialCode;
        this.initialCountry = { initialCountry: e.iso2 };
    };
    AddAgencyComponent.prototype.add = function (formData) {
        var _this = this;
        var modelSave = JSON.parse(JSON.stringify(this.model));
        // if (!modelSave.lat || !modelSave.lng) {
        //   swal(this.translate.instant('swal.error'), this.translate.instant('message.info.pleaseChooseAddressFromDropdown'), 'error');
        //   return;
        // }
        if (modelSave.img_loader || modelSave.logo_loader) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.uploadingImage'), 'error');
            return;
        }
        this.spinner.show();
        this.admin.postDataApi('addAgency', modelSave)
            .subscribe(function (success) {
            _this.spinner.hide();
            if (success.success === '0') {
                swal(_this.translate.instant('swal.error'), success.message, 'error');
                return;
            }
            else {
                var text = _this.model.id === '' ?
                    _this.translate.instant('message.success.addedSuccessfully') :
                    _this.translate.instant('message.success.updatedSuccessfully');
                swal(_this.translate.instant('swal.success'), text, 'success');
                _this.router.navigate(['/dashboard/agencies']);
                if (_this.model.id === '') {
                    _this.model.image = '';
                    _this.model.logo = '';
                    formData.reset();
                }
            }
        }, function (error) {
            _this.spinner.hide();
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
                _this.model.lat = _this.model.lat ? _this.model.lat : position.coords.latitude;
                _this.model.lng = _this.model.lng ? _this.model.lng : position.coords.longitude;
                // setting branch office lat lng
                _this.model.branch_lat = _this.model.branch_lat ? _this.model.branch_lat : position.coords.latitude;
                _this.model.branch_lng = _this.model.branch_lng ? _this.model.branch_lng : position.coords.longitude;
            });
        }
    };
    AddAgencyComponent.prototype.placeMarker = function ($event, param, paramLat, paramLng) {
        this.model[paramLat] = $event.coords.lat;
        this.model[paramLng] = $event.coords.lng;
        this.getGeoLocation(param, this.model[paramLat], this.model[paramLng]);
    };
    AddAgencyComponent.prototype.getGeoLocation = function (param, lat, lng) {
        var _this = this;
        if (navigator.geolocation) {
            var geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(lat, lng);
            var request = { latLng: latlng };
            geocoder.geocode(request, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    var result = results[0];
                    if (result != null) {
                        _this.model[param] = result.formatted_address;
                    }
                    else {
                        _this.model[param] = lat + ',' + lng;
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
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["Constant"],
            src_app_services_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"],
            _agm_core__WEBPACK_IMPORTED_MODULE_2__["MapsAPILoader"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"],
            src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_7__["AdminService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_4__["NgxSpinnerService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__["TranslateService"]])
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

module.exports = "\n<div class=\"container-fluid\">\n  <div class=\"row\">\n      <div class=\"col-md-4 col-6\">\n        <div class=\"title-group\">\n            <h5>{{'viewAgency.label' | translate}}</h5>\n            <p>{{'table.pagination.showing' | translate}} {{items?.length}} {{'table.pagination.outof' | translate}} {{parameter.total}}</p>\n        </div>\n      </div>\n      <div class=\"col-md-5 col-6\">\n        <div class=\"btn-cont upload-excel pull-right\">\n            <a title=\"{{'table.title.downloadSampleFile' | translate}}\" href=\"assets/docx/Sozu_Agencies_Sample.xlsx\" class=\"btn\"><span class=\"fa fa-download\"></span></a>\n            <label title=\"{{'table.title.chooseExcelFile' | translate}}\" class=\"img_label\">{{label}}\n                <input type=\"file\" #fileInput accept=\".xls,.xlsx\" (change)=\"getFileName()\">\n            </label>\n            <a title=\"{{'table.title.uploadSelectedFile' | translate}}\" (click)=\"importAgency()\" href=\"javascript://\" class=\"btn\"><span class=\"fa fa-upload\"></span></a>\n        </div>\n      </div>\n      <div class=\"col-md-3 col-6\">\n        <div class=\"btn-cont text-right\">\n            <a *ngIf=\"admin?.admin_acl['Agencies Management']?.can_create==1\" class=\"btn btn-primary\" href=\"javascript://\" routerLink=\"/dashboard/agencies/add-agency/0\">{{'table.addNewBtn' | translate}}</a>\n        </div>\n      </div>\n  </div>\n\n  <div class=\"white-bg\">\n      <div class=\"tabel-section\">\n        <div class=\"table-responsive\">\n          <table class=\"table table-striped table-align-left\">\n            <tr>\n              <th style=\"width:6%\">&nbsp;</th>\n              <th style=\"width:20%\">\n                <div class=\"table-search\">\n                    <label>{{'table.th.companyCommercialName' | translate}}</label>\n                    <div class=\"searh-3\">\n                      <input type=\"text\" [(ngModel)]=\"model.name\" (keyup.enter)=\"getAgencies()\" name=\"\">\n                      <button *ngIf=\"model.name\" (click)=\"getAgencies()\"><i class=\"fa fa-search\"></i></button>\n                    </div>\n                </div>\n              </th>\n              <th style=\"width:20%; text-align:left;\">\n                <div class=\"table-search\">\n                  <label>{{'table.th.contactNumber' | translate}}</label>\n                    <div class=\"searh-3\">\n                      <input type=\"text\" [(ngModel)]=\"model.phone\" (keyup.enter)=\"getAgencies()\" name=\"\">\n                      <button *ngIf=\"model.phone\" (click)=\"getAgencies()\"><i class=\"fa fa-search\"></i></button>\n                    </div>\n                </div>\n              </th>\n              <th style=\"width:20%\">\n                <div class=\"table-search\">\n                  <label>{{'table.th.emailAddress' | translate}}</label>\n                    <div class=\"searh-3\">\n                      <input type=\"text\" [(ngModel)]=\"model.email\" (keyup.enter)=\"getAgencies()\" name=\"\">\n                      <button *ngIf=\"model.email\" (click)=\"getAgencies()\"><i class=\"fa fa-search\"></i></button>\n                    </div>\n                </div>\n              </th>\n              <th style=\"width:7%; vertical-align: top;\">\n                  <div class=\"table-search\">\n                    <label>{{'table.th.linkedAgent' | translate}}</label>\n                <a (click)=\"sortData(model.agent_sort==2?1:2, 'agent_sort')\" href=\"javascript://\"><img [ngClass]=\"{'upsidedown':model.agent_sort==2}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n                </div>\n              </th>\n              <th style=\"width:7%; vertical-align: top;\">\n                <div class=\"table-search\">\n                  <label>{{'table.th.linkedProperties' | translate}}</label>\n                <a (click)=\"sortData(model.property_sort==2?1:2, 'property_sort')\" href=\"javascript://\"><img [ngClass]=\"{'upsidedown':model.property_sort==2}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n                  </div>\n              </th>\n              <th style=\"width:20%\">\n                &nbsp;\n              </th>\n            </tr>\n      \n            <tr *ngFor=\"let item of items| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: parameter.total }; let i=index\">\n              <td> \n                  <img *ngIf=\"item.image\" [defaultImage]=\"item.image| img:'thumb'\" [lazyLoad]=\"item.image\" class=\"rounded-circle\" alt=\"img\">\n                  <img *ngIf=\"!item.image\" class=\"rounded-circle\" src=\"assets/img/default_img.png\" alt=\"img\">\n              </td>\n              <td class=\"text-left\">\n                <span class=\"name\">\n                  <a data-toggle=\"popover\" data-placement=\"top\" title=\"{{item.name}}\">{{item.name | titlecase}}</a>\n                </span>\n              </td>\n              <td class=\"text-left\" *ngIf=\"item.phone\">{{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}</td>\n              <td class=\"text-left\" *ngIf=\"!item.phone\">{{'table.tr.td.NA' | translate}}</td>\n              <td class=\"text-left\">{{item.email}}</td>\n              <td class=\"text-left\">\n                <a class=\"cursor-pointer\" *ngIf=\"item.agents_count; else noAgentsLinked\" (click)=\"getAgencyAgents(item.id)\">\n                  <span class=\"green-color\">{{item.agents_count | numberWithCommas}}</span>\n                </a>\n                <ng-template #noAgentsLinked>\n                  {{item.agents_count | numberWithCommas}}\n                </ng-template>\n              </td>\n              <td class=\"text-left\">\n                <a *ngIf=\"item.property_count; else noPropertyLinked\" routerLink=\"/dashboard/properties/view-properties/{{item.id}}/agency\">\n                  <span class=\"green-color\">{{item.property_count | numberWithCommas}}</span>\n                </a>\n                <ng-template #noPropertyLinked>\n                    {{item.property_count | numberWithCommas}}\n                </ng-template>\n              </td>\n              <td>\n                <div class=\"table-actions\">\n                  <button title=\"{{'table.title.editDetails' | translate}}\" [disabled]=\"admin?.admin_acl['Agencies Management']?.can_update==0\" (click)=\"editUser(item)\" class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></button>\n                  <button [disabled]=\"admin?.admin_acl['Agencies Management']?.can_delete==0\"\n                    (click)=\"blockUnblockPopup(i, item.id, item.is_blocked==1?0:1)\" \n                    title=\"{{item.is_blocked==1 ? ('table.title.unblock' | translate) : ('table.title.block' | translate)}}\" [ngClass]=\"{'unblock-bg':item.is_blocked==1}\"\n                    class=\"action-icon\"><img src=\"assets/img/block.png\" alt=\"img\">\n                  </button>\n                  <button [disabled]=\"admin?.admin_acl['Agencies Management']?.can_purge==0\" (click)=\"deletePopup(item, i);\" class=\"action-icon\" title=\"{{'table.title.delete' | translate}}\"><img src=\"assets/img/ic_delete.png\" alt=\"img\"></button>\n                </div>\n              </td>\n            </tr>\n\n          </table>\n        </div>\n      </div>\n\n      <div class=\"center\" *ngIf=\"parameter.total == 0\">\n        <img src=\"assets/img/404-error.png\">\n      </div>\n  </div>\n  \n  <div class=\"btn-cont text-right marginT15\" *ngIf=\"parameter.total\">\n    <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n  </div>\n  \n</div>\n\n\n\n\n\n<a data-toggle=\"modal\" data-target=\"#view-agents-model\" #viewAgentsModel></a>\n<div class=\"modal\" id=\"view-agents-model\">\n    <div class=\"modal-dialog \">\n        <div class=\"modal-content notary-avail\">\n            <div class=\"modal-header popup-header\">\n                <h4 class=\"modal-title\">{{'addForm.linkedAgent' | translate}}</h4>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #closeViewAgentsModel>&times;</button>\n            </div>\n            <div class=\"modal-body\">\n                <div class=\"row\">\n                    <div class=\"col-md-8 col-6\">\n                        <!-- <input title=\"{{'table.title.clickEnterForSearch' | translate}}\" style=\"max-width:200px\" list=\"amenities\"\n                            class=\"form-control\" type=\"text\" name=\"keyword\"\n                            placeholder=\"{{'addForm.placeholder.search' | translate}}\"> -->\n                    </div>\n                    <!-- <div class=\"col-md-4 col-5 btn-cont\">\n                        <a class=\"btn btn-primary pull-right\" href=\"javascript://\" (click)=\"assignNow()\">{{'leads.assign' | translate}}</a>\n                    </div> -->\n                </div>\n                <!-- <div class=\"spacer40\"></div>\n                <div *ngIf=\"showSearchText\">\n                    <p class=\"show-not-found\">{{'leads.searchCSRBuyer' | translate}}</p>\n                </div> -->\n                <div class=\"modal-table-data\" malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\">\n                    <table class=\"table\">\n                        <tr *ngFor=\"let item of parameter.items\">\n                            <td *ngIf=\"item.is_blocked!=1\">\n                                <div class=\"n-avail-profile\">\n                                    <img [src]=\"item.image| img:'small'\" onerror='src=\"assets/img/default_img.png\"'\n                                        alt=\"img\">\n                                    <div class=\"n-avail-info\">\n                                        <p class=\"p12\">{{item.name | titlecase}}</p>\n                                        <p class=\"p10\">{{'leads.phone' | translate}} :\n                                            {{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone.trim()}}\n                                        </p>\n                                    </div>\n                                </div>\n                            </td>\n                            <!-- <td *ngIf=\"item.is_blocked!=1\">\n                                <label class=\"cust-check-bx float-right\">\n                                    <input type=\"radio\" name=\"notary_id\" (click)=\"assignItem = item\">\n                                    <span class=\"checkmark\"></span>\n                                </label>\n                            </td> -->\n                        </tr>\n                        <tr *ngIf=\"parameter?.items?.length==0\">\n                            <p class=\"show-not-found\">{{'viewAgency.noAgentsFound' | translate}}</p>\n                        </tr>\n                    </table>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

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
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_models_agency_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/agency.model */ "./src/app/models/agency.model.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
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
    function AgenciesComponent(constant, spinner, admin, router, translate) {
        this.constant = constant;
        this.spinner = spinner;
        this.admin = admin;
        this.router = router;
        this.translate = translate;
        this.parameter = {};
        this.scrollbarOptions = { axis: 'y', theme: 'dark' };
    }
    AgenciesComponent.prototype.ngOnInit = function () {
        this.label = this.translate.instant('table.title.chooseAgenciesFile');
        this.model = new src_app_models_agency_model__WEBPACK_IMPORTED_MODULE_4__["Agency"]();
        this.model.property_sort = null; // desc
        this.model.agent_sort = 2; // desc
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
    AgenciesComponent.prototype.sortData = function (value, param) {
        this.model[param] = value;
        if (param === 'property_sort') {
            this.model.agent_sort = null;
        }
        else {
            this.model.property_sort = null;
        }
        this.getAgencies();
    };
    AgenciesComponent.prototype.getAgencies = function () {
        var _this = this;
        this.model.page = this.parameter.page;
        this.spinner.show();
        this.admin.postDataApi('getAgencies', this.model)
            .subscribe(function (success) {
            _this.spinner.hide();
            _this.items = success.data;
            _this.parameter.total = success.total_count;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    AgenciesComponent.prototype.editUser = function (item) {
        this.router.navigate(['/dashboard/agencies/add-agency', item.id]);
    };
    AgenciesComponent.prototype.blockUnblockPopup = function (index, id, flag) {
        var _this = this;
        this.parameter.index = index;
        this.parameter.title = this.translate.instant('message.question.areYouSure');
        switch (flag) {
            case 0:
                this.parameter.text = this.translate.instant('message.question.wantToUnblockAgency');
                this.parameter.successText = this.translate.instant('message.success.unblockedSuccessfully');
                break;
            case 1:
                this.parameter.text = this.translate.instant('message.question.wantToBlockAgency');
                this.parameter.successText = this.translate.instant('message.success.blockedSuccessfully');
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
            swal(_this.translate.instant('swal.success'), _this.parameter.successText, 'success');
            _this.items[_this.parameter.index]['is_blocked'] = flag;
        });
    };
    AgenciesComponent.prototype.deletePopup = function (item, index) {
        var _this = this;
        this.parameter.title = this.translate.instant('message.question.areYouSure');
        this.parameter.text = this.translate.instant('message.question.wantToDeleteAgency');
        swal({
            html: this.parameter.title + '<br>' + this.parameter.text,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.deleteData(item, index);
            }
        });
    };
    AgenciesComponent.prototype.deleteData = function (item, index) {
        var _this = this;
        this.admin.postDataApi('deleteAgency', { agency_id: item.id }).subscribe(function (r) {
            _this.items.splice(index, 1);
            _this.parameter.total--;
            swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.deletedSuccessfully'), 'success');
        }, function (error) {
            swal(_this.translate.instant('swal.error'), error.error.message, 'error');
        });
    };
    AgenciesComponent.prototype.importAgency = function () {
        var _this = this;
        var file = this.fileInput.nativeElement;
        var attachment;
        if (file.files && file.files[0]) {
            attachment = file.files[0];
            if (attachment.size > this.constant.fileSizeLimit) {
                swal(this.translate.instant('swal.error'), this.translate.instant('message.info.fileSizeLimit'), 'error');
                return false;
            }
            this.spinner.show();
            var input = new FormData();
            input.append('attachment', attachment);
            this.admin.postDataApi('importAgency', input)
                .subscribe(function (success) {
                _this.spinner.hide();
                _this.fileInput.nativeElement.value = '';
                _this.label = _this.translate.instant('table.title.chooseAgenciesFile');
                swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.importedSuccessfully'), 'success');
                _this.getAgencies();
            }, function (error) {
                _this.fileInput.nativeElement.value = '';
                _this.spinner.hide();
            });
        }
        else {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.info.pleaseChooseFile'), 'error');
            return false;
        }
    };
    AgenciesComponent.prototype.getAgencyAgents = function (agency_id) {
        var _this = this;
        this.spinner.show();
        this.admin.postDataApi('getAgencyAgents', { agency_id: agency_id })
            .subscribe(function (success) {
            _this.spinner.hide();
            _this.viewAgentsModel.nativeElement.click();
            _this.parameter.items = success.data;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('viewAgentsModel'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AgenciesComponent.prototype, "viewAgentsModel", void 0);
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
        __metadata("design:paramtypes", [src_app_common_constants__WEBPACK_IMPORTED_MODULE_2__["Constant"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerService"],
            src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_1__["AdminService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__["TranslateService"]])
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
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ng2_tel_input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ng2-tel-input */ "./node_modules/ng2-tel-input/ng2-tel-input.js");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");
/* harmony import */ var ng_lazyload_image__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng-lazyload-image */ "./node_modules/ng-lazyload-image/fesm5/ng-lazyload-image.js");
/* harmony import */ var ngx_malihu_scrollbar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-malihu-scrollbar */ "./node_modules/ngx-malihu-scrollbar/fesm5/ngx-malihu-scrollbar.js");
/* harmony import */ var _guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../guards/acl-user.guard */ "./src/app/guards/acl-user.guard.ts");
/* harmony import */ var _modules_shared_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../modules/shared.module */ "./src/app/modules/shared.module.ts");
/* harmony import */ var _agencies_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./agencies.component */ "./src/app/layout/agencies/agencies.component.ts");
/* harmony import */ var _add_agency_add_agency_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./add-agency/add-agency.component */ "./src/app/layout/agencies/add-agency/add-agency.component.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// third party libraries










// general components





var routes = [
    {
        path: '', component: _agencies_component__WEBPACK_IMPORTED_MODULE_12__["AgenciesComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_10__["AclUserGuard"]], data: { roles: ['Agencies Management', 'can_read', ''] }
    },
    {
        path: 'add-agency/:id', component: _add_agency_add_agency_component__WEBPACK_IMPORTED_MODULE_13__["AddAgencyComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_10__["AclUserGuard"]], data: { roles: ['Agencies Management', 'can_read', ''] }
    }
];
var AgenciesModule = /** @class */ (function () {
    function AgenciesModule() {
    }
    AgenciesModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes),
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerModule"],
                _agm_core__WEBPACK_IMPORTED_MODULE_7__["AgmCoreModule"].forRoot({
                    apiKey: 'AIzaSyDykCJGMqHIwJluSmSiqKTJBVN2KauM_uQ',
                    libraries: ['drawing', 'places']
                }),
                ng_lazyload_image__WEBPACK_IMPORTED_MODULE_8__["LazyLoadImageModule"],
                ngx_pagination__WEBPACK_IMPORTED_MODULE_4__["NgxPaginationModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
                ng2_tel_input__WEBPACK_IMPORTED_MODULE_6__["Ng2TelInputModule"],
                ngx_malihu_scrollbar__WEBPACK_IMPORTED_MODULE_9__["MalihuScrollbarModule"].forRoot(),
                _modules_shared_module__WEBPACK_IMPORTED_MODULE_11__["SharedModule"],
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__["TranslateModule"]
            ],
            declarations: [
                _agencies_component__WEBPACK_IMPORTED_MODULE_12__["AgenciesComponent"],
                _add_agency_add_agency_component__WEBPACK_IMPORTED_MODULE_13__["AddAgencyComponent"]
            ]
        })
    ], AgenciesModule);
    return AgenciesModule;
}());



/***/ })

}]);
//# sourceMappingURL=agencies-agencies-module.js.map