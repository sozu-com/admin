(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["companies-companies-module"],{

/***/ "./src/app/layout/companies/add-company/add-company.component.css":
/*!************************************************************************!*\
  !*** ./src/app/layout/companies/add-company/add-company.component.css ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/layout/companies/add-company/add-company.component.html":
/*!*************************************************************************!*\
  !*** ./src/app/layout/companies/add-company/add-company.component.html ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container-fluid\">\n<div class=\"row\">\n    <div class=\"col-12\">\n      <div class=\"title-group\">\n          <h5>{{model.id ? ('viewCompanies.editCompany' | translate) : ('viewCompanies.addCompany' | translate)}}</h5>\n          <div class=\"spacer30\"></div>\n      </div>\n    </div>\n</div>\n\n<div class=\"white-bg padding40\">\n    <div class=\"row\">\n    <form role=\"form\" ngNativeValidate #addForm=\"ngForm\" (ngSubmit)=\"add(addForm)\">\n      <div class=\"col-xl-12 col-lg-12 col-md-12 col-12\">\n          <div class=\"row\">\n            <div class=\"col-2\">\n                <div class=\"add-img\" style=\"display:flex;\">\n                    <img *ngIf=\"image\" [src]=\"image\" [defaultImage]=\"image| img:'thumb'\" [lazyLoad]=\"image\" style=\"object-fit: cover; width: 100%;\">\n                    <label *ngIf=\"model?.image\">\n                      <input accept=\"image/*\" name=\"image\" class=\"image\" (change)=\"changeListner($event, 'img_loader', 'image')\" type=\"file\">\n                    </label>\n                    <label *ngIf=\"!image\">{{'addForm.image' | translate}}</label>\n                    <input *ngIf=\"!image\" accept=\"image/*\" name=\"image\" class=\"image\" (change)=\"changeListner($event, 'img_loader', 'image')\" type=\"file\">\n                    <div *ngIf=\"model.img_loader\" class=\"loaderr\"></div>\n                </div>\n            </div>\n            <div class=\"col-2\">\n                <div class=\"add-img\" style=\"display:flex;\">\n                    <img *ngIf=\"logo\" [src]=\"logo\" [defaultImage]=\"logo| img:'thumb'\" [lazyLoad]=\"logo\" style=\"object-fit: cover; width: 100%;\">\n                    <label *ngIf=\"model?.logo\">\n                      <input accept=\"image/*\" name=\"image\" class=\"image\" (change)=\"changeListner($event, 'logo_loader', 'logo')\" type=\"file\">\n                    </label>\n                    <label *ngIf=\"!logo\">{{'addForm.logo' | translate}}</label>\n                    <input *ngIf=\"!logo\" accept=\"image/*\" name=\"image\" class=\"image\" (change)=\"changeListner($event, 'logo_loader', 'logo')\" type=\"file\">\n                    <div *ngIf=\"model.logo_loader\" class=\"loaderr\"></div>\n                </div>\n            </div>\n            <div class=\"col-8\">\n                <div class=\"btn-cont text-right\">\n                    <button *ngIf=\"!model?.id\" type=\"submit\" [disabled]=\"!addForm.valid\" class=\"btn btn-primary\">{{'addForm.addBtn' | translate}}</button>\n                    <button *ngIf=\"model?.id\" type=\"submit\" class=\"btn btn-primary\">{{'addForm.updateBtn' | translate}}</button>\n                </div>\n            </div>\n            <div class=\"col-12\">\n                <div class=\"spacer40\"></div>\n            </div>\n            <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                  <label>{{'addForm.companyCommercialName' | translate}}\n                    <span class=\"color-red\">*</span>\n                  </label>\n                  <input autocomplete=\"off\" [pattern]=\"constant.onlyWhiteSpaces\" required type=\"text\" class=\"form-control\" [(ngModel)]=\"model.name\" name=\"name\">\n                </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.rfcLegalId' | translate}}\n                  <!-- <span class=\"color-red\">*</span> -->\n                </label>\n                <input autocomplete=\"off\" [pattern]=\"constant.onlyWhiteSpaces\" type=\"text\" class=\"form-control\" [(ngModel)]=\"model.rfc\" name=\"rfc\">\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.razonSocial' | translate}}\n                  <!-- <span class=\"color-red\">*</span> -->\n                </label>\n                <input autocomplete=\"off\" [pattern]=\"constant.onlyWhiteSpaces\" type=\"text\" class=\"form-control\" [(ngModel)]=\"model.razon_social\" name=\"razon_social\">\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.name' | translate}}\n                  <!-- <span class=\"color-red\">*</span> -->\n                </label>\n                <input autocomplete=\"off\" [pattern]=\"constant.onlyWhiteSpaces\" type=\"text\" class=\"form-control\" [(ngModel)]=\"model.person_in_charge\" name=\"person_in_charge\">\n              </div>\n            </div>\n            <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                  <label>{{'addForm.contactNumber' | translate}}\n                    <!-- <span class=\"color-red\">*</span> -->\n                  </label>\n                  <input minlength=\"6\" maxlength=\"16\" autocomplete=\"off\" type=\"text\" [pattern]=\"constant.phonePattern\" class=\"form-control\" id=\"phone\" minlength=\"1\" [(ngModel)]=\"model.phone\" name=\"phone\"\n                        ng2TelInput [ng2TelInputOptions]=\"initialCountry\" (countryChange)=\"onCountryCodeChange($event)\" />\n                </div>\n            </div>\n            <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                  <label>{{'addForm.emailId' | translate}} \n                    <!-- <span class=\"color-red\">*</span> -->\n                  </label>\n                  <input (keydown.space)=\"$event.preventDefault();\" autocomplete=\"off\" [pattern]=\"constant.emailPattern\" type=\"email\" class=\"form-control\" [(ngModel)]=\"model.email\" name=\"email\">\n                </div>\n            </div>\n            <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                  <label>{{'addForm.address' | translate}} \n                    <!-- <span class=\"color-red\">*</span> -->\n                  </label>\n                  <input placeholder=\"{{'addForm.placeholder.searchForAddress' | translate}}\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"off\" type=\"text\" class=\"form-control\" #search (input)=\"loadPlaces('address', 'lat', 'lng', 'searchElementRef')\" name=\"address\" [(ngModel)]=\"model.address\" autocomplete=\"off\">\n                </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                  <label>{{'addForm.locationPinOnMap' | translate}}\n                    <!-- <span class=\"color-red\">*</span> -->\n                  </label>\n                  <agm-map class=\"height200\" [latitude]=\"model.lat\" [longitude]=\"model.lng\" [scrollwheel]=\"false\" (mapClick)=\"placeMarker($event, 'address', 'lat', 'lng')\" [zoom]=\"constant.zoom\">\n                    <agm-marker [latitude]=\"model.lat\" [longitude]=\"model.lng\"></agm-marker>\n                  </agm-map>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.description' | translate}} \n                  <!-- <span class=\"color-red\">*</span> -->\n                </label>\n                <textarea autocomplete=\"off\" rows=\"3\" class=\"form-control\" name=\"description\" [(ngModel)]=\"model.description\"></textarea>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.branchOffice' | translate}}</label>\n                <input placeholder=\"{{'addForm.placeholder.searchForBranch' | translate}}\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"off\" type=\"text\" class=\"form-control\" #search1 (input)=\"loadPlaces('branch', 'branch_lat', 'branch_lng', 'search1ElementRef')\" name=\"branch\" [(ngModel)]=\"model.branch\" autocomplete=\"off\">\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                  <label>{{'addForm.locationPinOnMap' | translate}}</label>\n                  <agm-map class=\"height200\" [latitude]=\"model.branch_lat\" [longitude]=\"model.branch_lng\" [scrollwheel]=\"false\" (mapClick)=\"placeMarker($event, 'branch', 'branch_lat', 'branch_lng')\" [zoom]=\"constant.zoom\">\n                    <agm-marker [latitude]=\"model.branch_lat\" [longitude]=\"model.branch_lng\"></agm-marker>\n                  </agm-map>\n              </div>\n            </div>\n          </div>\n      </div>\n      </form>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/layout/companies/add-company/add-company.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/layout/companies/add-company/add-company.component.ts ***!
  \***********************************************************************/
/*! exports provided: AddCompanyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddCompanyComponent", function() { return AddCompanyComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");
/* harmony import */ var src_app_models_company_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/company.model */ "./src/app/models/company.model.ts");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
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









var AddCompanyComponent = /** @class */ (function () {
    function AddCompanyComponent(constant, cs, mapsAPILoader, ngZone, admin, route, spinner, translate) {
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
    AddCompanyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.model = new src_app_models_company_model__WEBPACK_IMPORTED_MODULE_3__["Company"]();
        this.setCurrentPosition();
        this.model.country_code = this.constant.country_code;
        this.model.dial_code = this.constant.dial_code;
        this.initialCountry = { initialCountry: this.constant.country_code };
        this.parameter.sub = this.route.params.subscribe(function (params) {
            if (params['id'] !== '0') {
                _this.model.id = params['id'];
                _this.getTowerManagerCompanyById(_this.model.id);
            }
        });
    };
    AddCompanyComponent.prototype.getTowerManagerCompanyById = function (id) {
        var _this = this;
        this.spinner.show();
        this.admin.postDataApi('getTowerManagerCompanyById', { 'id': id })
            .subscribe(function (success) {
            _this.spinner.hide();
            _this.model = success.data;
            _this.image = _this.model.image;
            _this.logo = _this.model.logo;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    AddCompanyComponent.prototype.changeListner = function (event, paramLoader, param) {
        var _this = this;
        if (event.target.files[0].size > this.constant.fileSizeLimit) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.fileSizeExceeds'), 'error');
            return false;
        }
        this.model[paramLoader] = true;
        var reader = new FileReader();
        reader.onload = function (e) {
            _this[param] = e.target.result;
            _this.cs.saveImage(event.target.files[0]).subscribe(function (success) {
                _this.model[paramLoader] = false;
                _this.model[param] = success['data'].image;
            });
        };
        reader.readAsDataURL(event.target.files[0]);
    };
    AddCompanyComponent.prototype.onCountryCodeChange = function (e) {
        this.model.country_code = e.iso2;
        this.model.dial_code = '+' + e.dialCode;
        this.initialCountry = { initialCountry: e.iso2 };
    };
    AddCompanyComponent.prototype.add = function (formData) {
        var _this = this;
        var modelSave = JSON.parse(JSON.stringify(this.model));
        // if (modelSave.address) {
        //   if (!modelSave.lat || !modelSave.lng) {
        //     swal(this.translate.instant('swal.error'), this.translate.instant('message.info.pleaseChooseAddressFromDropdown'), 'error');
        //     return;
        //   }
        // }
        // if (modelSave.branch) {
        //   if (!modelSave.branch_lat || !modelSave.branch_lng) {
        //     swal(this.translate.instant('swal.error'), this.translate.instant('message.info.pleaseChooseBranchAddressFromDropdown'), 'error');
        //     swal(this.translate.instant('swal.error'), '', 'error');
        //     return;
        //   }
        // }
        if (this.model.img_loader || this.model.logo_loader) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.uploadingImage'), 'error');
            return;
        }
        delete this.model.logo_loader;
        delete this.model.img_loader;
        this.spinner.show();
        this.admin.postDataApi('addTowerManagerCompany', modelSave)
            .subscribe(function (success) {
            _this.spinner.hide();
            if (success.success === '0') {
                swal(_this.translate.instant('swal.error'), success.message, 'error');
                return;
            }
            else {
                var text = _this.model.id ?
                    _this.translate.instant('message.success.updatedSuccessfully') :
                    _this.translate.instant('message.success.addedSuccessfully');
                swal(_this.translate.instant('swal.success'), text, 'success');
                if (!_this.model.id) {
                    formData.reset();
                    _this.image = '';
                    _this.logo = '';
                }
            }
        }, function (error) {
            _this.spinner.hide();
        });
    };
    AddCompanyComponent.prototype.loadPlaces = function (paramAdd, paramLat, paramLng, searchRef) {
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
    AddCompanyComponent.prototype.setCurrentPosition = function () {
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
    AddCompanyComponent.prototype.placeMarker = function ($event, param, paramLat, paramLng) {
        this.model[paramLat] = $event.coords.lat;
        this.model[paramLng] = $event.coords.lng;
        this.getGeoLocation(param, this.model[paramLat], this.model[paramLng]);
    };
    AddCompanyComponent.prototype.getGeoLocation = function (param, lat, lng) {
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
    ], AddCompanyComponent.prototype, "mapDiv", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('search'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddCompanyComponent.prototype, "searchElementRef", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('search1'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddCompanyComponent.prototype, "search1ElementRef", void 0);
    AddCompanyComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-add-company',
            template: __webpack_require__(/*! ./add-company.component.html */ "./src/app/layout/companies/add-company/add-company.component.html"),
            styles: [__webpack_require__(/*! ./add-company.component.css */ "./src/app/layout/companies/add-company/add-company.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["Constant"],
            src_app_services_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"],
            _agm_core__WEBPACK_IMPORTED_MODULE_2__["MapsAPILoader"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"],
            src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_6__["AdminService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_7__["NgxSpinnerService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__["TranslateService"]])
    ], AddCompanyComponent);
    return AddCompanyComponent;
}());



/***/ }),

/***/ "./src/app/layout/companies/companies.component.css":
/*!**********************************************************!*\
  !*** ./src/app/layout/companies/companies.component.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/layout/companies/companies.component.html":
/*!***********************************************************!*\
  !*** ./src/app/layout/companies/companies.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container-fluid\">\n  <div class=\"row\">\n      <div class=\"col-md-4 col-6\">\n        <div class=\"title-group\">\n            <h5>{{'viewCompanies.label' | translate}}</h5>\n            <p>{{'table.pagination.showing' | translate}} {{items?.length}} {{'table.pagination.outof' | translate}} {{parameter.total}}</p>\n        </div>\n      </div>\n      <div class=\"col-md-5 col-6\">\n        <div class=\"btn-cont upload-excel pull-right\">\n            <a title=\"{{'table.title.downloadSampleFile' | translate}}\" href=\"assets/docx/BD_TowerManagerCompany_Sozu.xlsx\" class=\"btn\"><span class=\"fa fa-download\"></span></a>\n            <label title=\"{{'table.title.chooseExcelFile' | translate}}\" class=\"img_label\">{{label}}\n                <input type=\"file\" #fileInput accept=\".xls,.xlsx\" (change)=\"getFileName()\">\n            </label>\n            <a title=\"{{'table.title.uploadSelectedFile' | translate}}\" (click)=\"importData()\" href=\"javascript://\" class=\"btn\"><span class=\"fa fa-upload\"></span></a>\n        </div>\n      </div>\n      <div class=\"col-md-3 col-6\">\n        <div class=\"btn-cont text-right\">\n            <a *ngIf=\"admin?.admin_acl['Companies Management']?.can_create==1\" class=\"btn btn-primary\" href=\"javascript://\" routerLink=\"/dashboard/companies/add-company/0\">{{'table.addNewBtn' | translate}}</a>\n        </div>\n      </div>\n  </div>\n\n  <div class=\"white-bg\">\n      <div class=\"tabel-section\">\n        <div class=\"table-responsive\">\n          <table class=\"table table-striped table-align-left\">\n            <tr>\n              <th style=\"width:6%\">&nbsp;</th>\n              <th style=\"width:20%\">\n                <div class=\"table-search\">\n                    <label>{{'table.th.companyCommercialName' | translate}}</label>\n                    <div class=\"searh-3\">\n                      <input type=\"text\" [(ngModel)]=\"model.name\" (keyup.enter)=\"getTowerManagerCompany()\" name=\"\">\n                      <button *ngIf=\"model.name\" (click)=\"getTowerManagerCompany()\"><i class=\"fa fa-search\"></i></button>\n                    </div>\n                </div>\n              </th>\n              <th style=\"width:20%; text-align:left;\">\n                <div class=\"table-search\">\n                    <label><br>&nbsp;{{'table.th.contactNumber' | translate}}</label>\n                    <div class=\"searh-3\">\n                      <input type=\"text\" [(ngModel)]=\"model.phone\" (keyup.enter)=\"getTowerManagerCompany()\" name=\"\">\n                      <button *ngIf=\"model.phone\" (click)=\"getTowerManagerCompany()\"><i class=\"fa fa-search\"></i></button>\n                    </div>\n                </div>\n              </th>\n              <th style=\"width:20%\">\n                <div class=\"table-search\">\n                    <label><br>&nbsp;{{'table.th.emailAddress' | translate}}</label>\n                    <div class=\"searh-3\">\n                      <input type=\"text\" [(ngModel)]=\"model.email\" (keyup.enter)=\"getTowerManagerCompany()\" name=\"\">\n                      <button *ngIf=\"model.email\" (click)=\"getTowerManagerCompany()\"><i class=\"fa fa-search\"></i></button>\n                    </div>\n                </div>\n              </th>\n              <th style=\"width:7%; vertical-align: top;\">\n                  <div class=\"table-search\">\n                      <label>{{'table.th.linkedProjects' | translate}}</label>\n                <a (click)=\"sortData(model.project_sort==2?1:2, 'project_sort')\" href=\"javascript://\"><img [ngClass]=\"{'upsidedown':model.project_sort==2}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n              </div>\n              </th>\n              <th style=\"width:7%; vertical-align: top;\">\n                  <div class=\"table-search\">\n                      <label>{{'table.th.linkedManagers' | translate}}</label>\n                <a (click)=\"sortData(model.sort_manager==2?1:2, 'sort_manager')\" href=\"javascript://\"><img [ngClass]=\"{'upsidedown':model.sort_manager==2}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n                </div>\n              </th>\n              <th style=\"width:20%\">\n                &nbsp;\n              </th>\n            </tr>\n      \n            <tr *ngFor=\"let item of items| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: parameter.total }; let i=index\">\n              <td> \n                  <img *ngIf=\"item.image\" [defaultImage]=\"item.image| img:'thumb'\" [lazyLoad]=\"item.image\" class=\"rounded-circle\" alt=\"img\">\n                  <img *ngIf=\"!item.image\" class=\"rounded-circle\" src=\"assets/img/default_img.png\" alt=\"img\">\n              </td>\n              <td class=\"text-left\">\n                <span class=\"name\">\n                  <a data-toggle=\"popover\" data-placement=\"top\" title=\"{{item.name}}\">{{item.name | titlecase}}</a>\n                </span>\n              </td>\n              <td class=\"text-left\" *ngIf=\"item.phone\">{{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}</td>\n              <td class=\"text-left\" *ngIf=\"!item.phone\">{{'table.tr.td.NA' | translate}}</td>\n              <td class=\"text-left\">{{item.email ? item.email : ('table.tr.td.NA' | translate)}}</td>\n              <td class=\"text-left\">\n                <a routerLink=\"/dashboard/projects/view-projects/company/{{item.id}}\">\n                  <span class=\"green-color\">{{item.project_count | numberWithCommas}}</span>\n                </a>\n              </td>\n              <td class=\"text-left\">\n                <a class=\"cursor-pointer\" *ngIf=\"item.managers_count; else noManagersLinked\" (click)=\"getManagers(item.id)\">\n                  <span class=\"green-color\">{{item.managers_count | numberWithCommas}}</span>\n                </a>\n                <ng-template #noManagersLinked>\n                  {{item.managers_count | numberWithCommas}}\n                </ng-template>\n              </td>\n              <!-- <td class=\"text-left\">{{item.project_count | numberWithCommas}}</td> -->\n              <!-- <td class=\"text-left\">{{item.managers_count | numberWithCommas}}</td> -->\n              <td>\n                <div class=\"table-actions\">\n                    <button title=\"{{'table.title.editDetails' | translate}}\" [disabled]=\"admin?.admin_acl['Companies Management']?.can_update==0\" (click)=\"editUser(item)\" class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></button>\n                  <button [disabled]=\"admin?.admin_acl['Companies Management']?.can_delete==0\"\n                    (click)=\"blockUnblockPopup(i, item.id, item.is_blocked==1?0:1)\" \n                    title=\"{{item.is_blocked==1 ? ('table.title.unblock' | translate) : ('table.title.block' | translate)}}\" [ngClass]=\"{'unblock-bg':item.is_blocked==1}\"\n                    class=\"action-icon\"><img src=\"assets/img/block.png\" alt=\"img\">\n                  </button>\n                  <button [disabled]=\"admin?.admin_acl['Companies Management']?.can_purge==0\"\n                    (click)=\"deletePopup(item, i);\" class=\"action-icon\" title=\"{{'table.title.delete' | translate}}\"><img src=\"assets/img/ic_delete.png\" alt=\"img\"></button>\n                </div>\n              </td>\n            </tr>\n\n          </table>\n        </div>\n      </div>\n\n      <div class=\"center\" *ngIf=\"parameter.total == 0\">\n        <img src=\"assets/img/404-error.png\">\n      </div>\n  </div>\n  \n  <div class=\"btn-cont text-right marginT15\" *ngIf=\"parameter.total\">\n    <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n  </div>\n  \n</div>\n\n\n\n<a data-toggle=\"modal\" data-target=\"#view-managers-modal\" #viewManagersModal></a>\n<div class=\"modal\" id=\"view-managers-modal\">\n    <div class=\"modal-dialog \">\n        <div class=\"modal-content notary-avail\">\n            <div class=\"modal-header popup-header\">\n                <h4 class=\"modal-title\">{{'addForm.linkedManagers' | translate}}</h4>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #closeviewManagersModal>&times;</button>\n            </div>\n            <div class=\"modal-body\">\n                <div class=\"row\">\n                    <div class=\"col-md-8 col-6\">\n                    </div>\n                </div>\n                <div class=\"modal-table-data\" malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\">\n                    <table class=\"table\">\n                        <tr *ngFor=\"let item of parameter.items\">\n                            <td *ngIf=\"item.is_blocked!=1\">\n                                <div class=\"n-avail-profile\">\n                                    <img [src]=\"item.image| img:'small'\" onerror='src=\"assets/img/default_img.png\"'\n                                        alt=\"img\">\n                                    <div class=\"n-avail-info\">\n                                        <p class=\"p12\">{{item.name | titlecase}}</p>\n                                        <p class=\"p10\">{{'leads.phone' | translate}} :\n                                            {{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone.trim()}}\n                                        </p>\n                                    </div>\n                                </div>\n                            </td>\n                        </tr>\n                        <tr *ngIf=\"parameter?.items?.length==0\">\n                            <p class=\"show-not-found\">{{'viewManagers.noManagerLinked' | translate}}</p>\n                        </tr>\n                    </table>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/layout/companies/companies.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/layout/companies/companies.component.ts ***!
  \*********************************************************/
/*! exports provided: CompaniesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompaniesComponent", function() { return CompaniesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_models_company_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/company.model */ "./src/app/models/company.model.ts");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
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







var CompaniesComponent = /** @class */ (function () {
    function CompaniesComponent(constant, admin, spinner, router, translate) {
        this.constant = constant;
        this.admin = admin;
        this.spinner = spinner;
        this.router = router;
        this.translate = translate;
        this.scrollbarOptions = { axis: 'y', theme: 'dark' };
        this.parameter = {};
    }
    CompaniesComponent.prototype.ngOnInit = function () {
        this.label = this.translate.instant('table.title.chooseCompaniesFile');
        this.model = new src_app_models_company_model__WEBPACK_IMPORTED_MODULE_2__["Company"]();
        this.model.project_sort = 2; // 2 means desc
        this.model.sort_manager = null;
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        this.getTowerManagerCompany();
    };
    CompaniesComponent.prototype.getPage = function (page) {
        this.parameter.page = page;
        this.getTowerManagerCompany();
    };
    CompaniesComponent.prototype.getFileName = function () {
        var fi = this.fileInput.nativeElement;
        var uploadedFile = fi.files[0];
        this.label = uploadedFile.name;
    };
    CompaniesComponent.prototype.sortData = function (value, param) {
        this.model[param] = value;
        if (param === 'sort_manager') {
            this.model.project_sort = null;
        }
        else {
            this.model.sort_manager = null;
        }
        this.getTowerManagerCompany();
    };
    CompaniesComponent.prototype.getTowerManagerCompany = function () {
        var _this = this;
        this.model.page = this.parameter.page;
        this.spinner.show();
        this.admin.postDataApi('getTowerManagerCompany', this.model)
            .subscribe(function (success) {
            _this.spinner.hide();
            _this.items = success.data;
            _this.parameter.total = success.total;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    CompaniesComponent.prototype.editUser = function (item) {
        this.router.navigate(['/dashboard/companies/add-company', item.id]);
    };
    CompaniesComponent.prototype.blockUnblockPopup = function (index, id, flag) {
        var _this = this;
        this.parameter.index = index;
        this.parameter.title = this.translate.instant('message.question.areYouSure');
        switch (flag) {
            case 0:
                this.parameter.text = this.translate.instant('message.question.wantToUnblockCompany');
                this.parameter.successText = this.translate.instant('message.success.unblockedSuccessfully');
                break;
            case 1:
                this.parameter.text = this.translate.instant('message.question.wantToBlockCompany');
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
                _this.blockTowerManagerCompany(index, id, flag);
            }
        });
    };
    CompaniesComponent.prototype.blockTowerManagerCompany = function (index, id, flag) {
        var _this = this;
        this.parameter.index = index;
        var input = {
            id: id,
            flag: flag
        };
        this.admin.postDataApi('blockTowerManagerCompany', input)
            .subscribe(function (success) {
            swal(_this.translate.instant('swal.success'), _this.parameter.successText, 'success');
            _this.items[_this.parameter.index]['is_blocked'] = flag;
        });
    };
    CompaniesComponent.prototype.deletePopup = function (item, index) {
        var _this = this;
        this.parameter.title = this.translate.instant('message.question.areYouSure');
        this.parameter.text = this.translate.instant('message.question.wantToDeleteCompany');
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
    CompaniesComponent.prototype.deleteData = function (item, index) {
        var _this = this;
        this.admin.postDataApi('deleteTowerManagerCompany', { id: item.id }).subscribe(function (r) {
            _this.items.splice(index, 1);
            _this.parameter.total--;
            swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.deletedSuccessfully'), 'success');
        }, function (error) {
            swal(_this.translate.instant('swal.error'), error.error.message, 'error');
        });
    };
    CompaniesComponent.prototype.importData = function () {
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
            this.admin.postDataApi('importTowerManagerCompany', input)
                .subscribe(function (success) {
                _this.spinner.hide();
                _this.fileInput.nativeElement.value = '';
                _this.label = _this.translate.instant('table.title.chooseCompaniesFile');
                swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.importedSuccessfully'), 'success');
                _this.getTowerManagerCompany();
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
    CompaniesComponent.prototype.getManagers = function (company_id) {
        var _this = this;
        this.spinner.show();
        this.admin.postDataApi('getCompanyManagers', { company_id: company_id })
            .subscribe(function (success) {
            _this.spinner.hide();
            _this.viewManagersModal.nativeElement.click();
            _this.parameter.items = success.data;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('viewManagersModal'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CompaniesComponent.prototype, "viewManagersModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('fileInput'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CompaniesComponent.prototype, "fileInput", void 0);
    CompaniesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-companies',
            template: __webpack_require__(/*! ./companies.component.html */ "./src/app/layout/companies/companies.component.html"),
            styles: [__webpack_require__(/*! ./companies.component.css */ "./src/app/layout/companies/companies.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_common_constants__WEBPACK_IMPORTED_MODULE_3__["Constant"], src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_4__["AdminService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__["TranslateService"]])
    ], CompaniesComponent);
    return CompaniesComponent;
}());



/***/ }),

/***/ "./src/app/layout/companies/companies.module.ts":
/*!******************************************************!*\
  !*** ./src/app/layout/companies/companies.module.ts ***!
  \******************************************************/
/*! exports provided: CompaniesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompaniesModule", function() { return CompaniesModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ng2_tel_input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ng2-tel-input */ "./node_modules/ng2-tel-input/ng2-tel-input.js");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");
/* harmony import */ var ng_lazyload_image__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng-lazyload-image */ "./node_modules/ng-lazyload-image/fesm5/ng-lazyload-image.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var src_app_modules_shared_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/modules/shared.module */ "./src/app/modules/shared.module.ts");
/* harmony import */ var _companies_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./companies.component */ "./src/app/layout/companies/companies.component.ts");
/* harmony import */ var src_app_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/guards/acl-user.guard */ "./src/app/guards/acl-user.guard.ts");
/* harmony import */ var _add_company_add_company_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./add-company/add-company.component */ "./src/app/layout/companies/add-company/add-company.component.ts");
/* harmony import */ var ngx_malihu_scrollbar__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ngx-malihu-scrollbar */ "./node_modules/ngx-malihu-scrollbar/fesm5/ngx-malihu-scrollbar.js");
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
        path: '', component: _companies_component__WEBPACK_IMPORTED_MODULE_11__["CompaniesComponent"],
        canActivate: [src_app_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_12__["AclUserGuard"]], data: { roles: ['Companies Management', 'can_read', ''] }
    },
    {
        path: 'add-company/:id', component: _add_company_add_company_component__WEBPACK_IMPORTED_MODULE_13__["AddCompanyComponent"],
        canActivate: [src_app_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_12__["AclUserGuard"]], data: { roles: ['Companies Management', 'can_read', ''] }
    }
];
var CompaniesModule = /** @class */ (function () {
    function CompaniesModule() {
    }
    CompaniesModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes),
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerModule"],
                _agm_core__WEBPACK_IMPORTED_MODULE_7__["AgmCoreModule"].forRoot({
                    apiKey: 'AIzaSyDykCJGMqHIwJluSmSiqKTJBVN2KauM_uQ',
                    libraries: ['drawing', 'places']
                }),
                ngx_pagination__WEBPACK_IMPORTED_MODULE_4__["NgxPaginationModule"],
                ng_lazyload_image__WEBPACK_IMPORTED_MODULE_8__["LazyLoadImageModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
                ng2_tel_input__WEBPACK_IMPORTED_MODULE_6__["Ng2TelInputModule"],
                src_app_modules_shared_module__WEBPACK_IMPORTED_MODULE_10__["SharedModule"],
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__["TranslateModule"],
                ngx_malihu_scrollbar__WEBPACK_IMPORTED_MODULE_14__["MalihuScrollbarModule"].forRoot(),
            ],
            declarations: [
                _companies_component__WEBPACK_IMPORTED_MODULE_11__["CompaniesComponent"],
                _add_company_add_company_component__WEBPACK_IMPORTED_MODULE_13__["AddCompanyComponent"]
            ]
        })
    ], CompaniesModule);
    return CompaniesModule;
}());



/***/ })

}]);
//# sourceMappingURL=companies-companies-module.js.map