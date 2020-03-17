(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["developers-developers-module"],{

/***/ "./src/app/layout/developers/add-developer/add-developer.component.css":
/*!*****************************************************************************!*\
  !*** ./src/app/layout/developers/add-developer/add-developer.component.css ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/layout/developers/add-developer/add-developer.component.html":
/*!******************************************************************************!*\
  !*** ./src/app/layout/developers/add-developer/add-developer.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container-fluid\">\n<div class=\"row\">\n    <div class=\"col-12\">\n      <div class=\"title-group\">\n          <h5>{{model.id ? ('viewDevelopers.editDeveloper' | translate) : ('viewDevelopers.addDeveloper' | translate)}}</h5>\n          <div class=\"spacer30\"></div>\n      </div>\n    </div>\n</div>\n\n<div class=\"white-bg padding40\">\n    <div class=\"row\">\n    <form role=\"form\" ngNativeValidate #addForm=\"ngForm\" (ngSubmit)=\"add(addForm)\">\n      <div class=\"col-xl-12 col-lg-12 col-md-12 col-12\">\n          <div class=\"row\">\n            <div class=\"col-2\">\n                <div class=\"add-img\" style=\"display:flex;\">\n                    <img *ngIf=\"image\" [src]=\"image\" style=\"object-fit: cover; width: 100%;\">\n                    <label *ngIf=\"model?.image\">\n                      <input accept=\"image/*\" name=\"image\" class=\"image\" (change)=\"changeListner($event, 'image')\" type=\"file\">\n                    </label>\n                    <label *ngIf=\"!image\">{{'addForm.image' | translate}}</label>\n                    <input *ngIf=\"!image\" accept=\"image/*\" name=\"image\" class=\"image\" (change)=\"changeListner($event, 'image')\" type=\"file\">\n                </div>\n            </div>\n            <div class=\"col-2\">\n                <div class=\"add-img\" style=\"display:flex;\">\n                    <img *ngIf=\"developer_image\" [src]=\"developer_image\" style=\"object-fit: cover; width: 100%;\">\n                    <label *ngIf=\"model?.developer_image\">\n                      <input accept=\"image/*\" name=\"image\" class=\"image\" (change)=\"changeListner($event, 'developer_image')\" type=\"file\">\n                    </label>\n                    <label *ngIf=\"!developer_image\">{{'addForm.coverImage' | translate}}</label>\n                    <input *ngIf=\"!developer_image\" accept=\"image/*\" name=\"image\" class=\"image\" (change)=\"changeListner($event, 'developer_image')\" type=\"file\">\n                </div>\n            </div>\n            <div class=\"col-8\">\n                <div class=\"btn-cont text-right\">\n                    <button *ngIf=\"!model?.id\" type=\"submit\" [disabled]=\"!addForm.valid\" class=\"btn btn-primary\">{{'addForm.addBtn' | translate}}</button>\n                    <button *ngIf=\"model?.id\" type=\"submit\" class=\"btn btn-primary\">{{'addForm.updateBtn' | translate}}</button>\n                </div>\n            </div>\n            <div class=\"col-12\">\n                <div class=\"spacer40\"></div>\n            </div>\n            <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                  <label>{{'addForm.name' | translate}} <span class=\"color-red\">*</span></label>\n                  <input autocomplete=\"off\" [pattern]=\"constant.onlyWhiteSpaces\" required type=\"text\" class=\"form-control\" [(ngModel)]=\"model.name\" name=\"name\">\n                </div>\n            </div>\n            <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                  <label>{{'addForm.contactNumber' | translate}} <span class=\"color-red\">*</span></label>\n                  <input minlength=\"6\" maxlength=\"16\" autocomplete=\"off\" type=\"text\" [pattern]=\"constant.phonePattern\" class=\"form-control\" id=\"phone\" required minlength=\"1\" [(ngModel)]=\"model.phone\" name=\"phone\"\n                        ng2TelInput [ng2TelInputOptions]=\"initialCountry\" (countryChange)=\"onCountryChange($event)\" />\n                </div>\n            </div>\n            <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                  <label>{{'addForm.emailId' | translate}} <span class=\"color-red\">*</span></label>\n                  <input (keydown.space)=\"$event.preventDefault();\" autocomplete=\"off\" required [pattern]=\"constant.emailPattern\" type=\"email\" class=\"form-control\" [(ngModel)]=\"model.email\" name=\"email\">\n                </div>\n            </div>\n            <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                  <label>{{'addForm.companyName' | translate}} <span class=\"color-red\">*</span></label>\n                  <input autocomplete=\"off\" [pattern]=\"constant.onlyWhiteSpaces\" required type=\"text\" class=\"form-control\" [(ngModel)]=\"model.developer_company\" name=\"developer_company\">\n                </div>\n            </div>\n            <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                  <label>{{'addForm.address' | translate}} <span class=\"color-red\">*</span></label>\n                  <input placeholder=\"{{'addForm.placeholder.searchForAddress' | translate}}\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"off\" type=\"text\" class=\"form-control\" #search (input)=\"loadPlaces('developer_address', 'lat', 'lng', 'searchElementRef')\" name=\"developer_address\" [(ngModel)]=\"model.developer_address\" autocomplete=\"off\">\n                </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                  <label>{{'addForm.locationPinOnMap' | translate}} <span class=\"color-red\">*</span></label>\n                  <agm-map class=\"height200\" [latitude]=\"model.lat\" [longitude]=\"model.lng\" [scrollwheel]=\"false\" (mapClick)=\"placeMarker($event, 'lat', 'lng')\" [zoom]=\"constant.zoom\">\n                    <agm-marker [latitude]=\"model.lat\" [longitude]=\"model.lng\"></agm-marker>\n                  </agm-map>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.description' | translate}} <span class=\"color-red\">*</span></label>\n                <textarea autocomplete=\"off\" required rows=\"3\" class=\"form-control\" name=\"developer_desc\" [(ngModel)]=\"model.developer_desc\"></textarea>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.branchOffice' | translate}}</label>\n                <input placeholder=\"{{'addForm.placeholder.searchForBranch' | translate}}\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"off\" type=\"text\" class=\"form-control\" #search1 (input)=\"loadPlaces('branch_office', 'branch_lat', 'branch_lng', 'search1ElementRef')\" name=\"branch_office\" [(ngModel)]=\"model.branch_office\" autocomplete=\"off\">\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                  <label>{{'addForm.locationPinOnMap' | translate}}</label>\n                  <agm-map class=\"height200\" [latitude]=\"model.branch_lat\" [longitude]=\"model.branch_lng\" [scrollwheel]=\"false\" (mapClick)=\"placeMarker($event, 'branch_lat', 'branch_lng')\" [zoom]=\"constant.zoom\">\n                    <agm-marker [latitude]=\"model.branch_lat\" [longitude]=\"model.branch_lng\"></agm-marker>\n                  </agm-map>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                  <label>{{'addForm.addMoreImages' | translate}}</label>\n                  <div class=\"add-project-img-more marginT0\">\n                    <img *ngIf=\"model.images?.length>0\" [src]=\"model.images[0]?.image\" onerror=\"this.src='assets/img/placeholder.png'\" class=\"img-fluid\">\n                    <div class=\"upload-caption\">\n                      <p *ngIf=\"model?.images?.length > 1\" class=\"number\" (click)=\"modelOpenFun()\">+{{model?.images?.length-1}}</p>\n                      <p *ngIf=\"model?.images?.length <= 1\" class=\"green-color\"  (click)=\"modelOpenFun()\">{{'addForm.moreImages.addMoreBtn' | translate}}</p>\n                    </div>\n                  </div>\n              </div>\n            </div>\n\n            \n\n\n          </div>\n      </div>\n      </form>\n    </div>\n</div>\n\n\n<span data-target=\"#add-more-img\" data-toggle=\"modal\" #modalOpen></span>\n<div class=\"modal add-more-popup\" id=\"add-more-img\">\n  <div class=\"modal-dialog modal-lg\">\n    <div class=\"modal-content\">\n\n      <!-- Modal Header -->\n      <div class=\"modal-header\">\n        <h4 class=\"modal-title\">{{'addForm.moreImages.label' | translate}}</h4>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #modalClose>&times;</button>\n      </div>\n\n      <!-- Modal body -->\n      <div class=\"modal-body\">\n        <div class=\"uploaded-img-block\" *ngIf=\"file4.files?.length > 0\">\n          <div class=\"uploaded-img\" *ngFor=\"let item of file4.files; let i=index\">\n            <a class=\"remove\" (click)=\"file4.remove(i)\"><img src=\"assets/img/remove-icon.png\" alt=\"img\"></a>\n            <img *ngIf=\"item\" class=\"u-img\" [src]=\"item.image\" alt=\"img\">\n            <img *ngIf=\"!item\" class=\"u-img\" src=\"http://via.placeholder.com/300x300\" alt=\"img\">\n          </div>\n        </div>\n        <div class=\"add-more-images\">\n          <input type=\"file\" name=\"add-more\" multiple max=\"6\" accept=\"image/*\" (change)=\"file4Select($event)\">\n          <span>{{'addForm.moreImages.addMoreBtn' | translate}}</span>\n        </div>\n      </div>\n\n      <!-- Modal footer -->\n      <div class=\"modal-footer btn-cont\">\n        <button type=\"button\" (click)=\"saveImages()\" class=\"btn btn-primary\">{{'addForm.moreImages.submitBtn' | translate}}</button>\n      </div>\n\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/layout/developers/add-developer/add-developer.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/layout/developers/add-developer/add-developer.component.ts ***!
  \****************************************************************************/
/*! exports provided: AddDeveloperComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddDeveloperComponent", function() { return AddDeveloperComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_models_users_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/users.model */ "./src/app/models/users.model.ts");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");
/* harmony import */ var src_app_common_fileUpload__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/common/fileUpload */ "./src/app/common/fileUpload.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var AddDeveloperComponent = /** @class */ (function () {
    function AddDeveloperComponent(constant, cs, mapsAPILoader, ngZone, admin, route, spinner, translate) {
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
    AddDeveloperComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.file4 = new src_app_common_fileUpload__WEBPACK_IMPORTED_MODULE_4__["FileUpload"](false, this.admin);
        this.model = new src_app_models_users_model__WEBPACK_IMPORTED_MODULE_2__["Users"]();
        this.setCurrentPosition();
        this.model.country_code = this.constant.country_code;
        this.model.dial_code = this.constant.dial_code;
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.p = this.constant.p;
        this.initialCountry = { initialCountry: this.constant.country_code };
        this.parameter.sub = this.route.params.subscribe(function (params) {
            if (params['id'] !== '0') {
                _this.model.id = params['id'];
                _this.getUserById(_this.model.id);
            }
            else {
                _this.model.id = '';
                _this.model.images = [];
            }
        });
    };
    AddDeveloperComponent.prototype.getUserById = function (id) {
        var _this = this;
        this.spinner.show();
        this.admin.postDataApi('getUserById', { 'user_id': id })
            .subscribe(function (success) {
            _this.spinner.hide();
            _this.model = success.data;
            _this.image = _this.model.image;
            _this.developer_image = _this.model.developer_image;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    AddDeveloperComponent.prototype.set = function () {
        this.show = true;
    };
    AddDeveloperComponent.prototype.changeListner = function (event, param) {
        var _this = this;
        if (event.target.files[0].size > this.constant.fileSizeLimit) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.fileSizeExceeds'), 'error');
            return false;
        }
        var reader = new FileReader();
        reader.onload = function (e) {
            _this[param] = e.target.result;
            _this.spinner.show();
            _this.cs.saveImage(event.target.files[0]).subscribe(function (success) {
                _this.spinner.hide();
                _this.model[param] = success['data'].image;
            });
        };
        reader.readAsDataURL(event.target.files[0]);
    };
    AddDeveloperComponent.prototype.onCountryChange = function (e) {
        this.model.country_code = e.iso2;
        this.model.dial_code = '+' + e.dialCode;
        this.initialCountry = { initialCountry: e.iso2 };
    };
    AddDeveloperComponent.prototype.add = function (formData) {
        var _this = this;
        var modelSave = JSON.parse(JSON.stringify(this.model));
        if (!modelSave.lat || !modelSave.lng) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.info.pleaseChooseAddressFromDropdown'), 'error');
            return;
        }
        if (modelSave.images) {
            modelSave.images = modelSave.images.map(function (r) { return r.image; });
        }
        this.spinner.show();
        this.admin.postDataApi('addDeveloper', modelSave)
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
                if (_this.model.id === '') {
                    formData.reset();
                    _this.image = '';
                    _this.developer_image = '';
                }
            }
        }, function (error) {
            _this.spinner.hide();
        });
    };
    AddDeveloperComponent.prototype.loadPlaces = function (paramAdd, paramLat, paramLng, searchRef) {
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
    AddDeveloperComponent.prototype.setCurrentPosition = function () {
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
    AddDeveloperComponent.prototype.placeMarker = function ($event, paramLat, paramLng) {
        this.model[paramLat] = $event.coords.lat;
        this.model[paramLng] = $event.coords.lng;
        this.getGeoLocation(this.model[paramLat], this.model[paramLng]);
    };
    AddDeveloperComponent.prototype.getGeoLocation = function (lat, lng) {
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
    AddDeveloperComponent.prototype.file4Select = function ($event) {
        this.file4.onSelectFile($event);
    };
    AddDeveloperComponent.prototype.modelOpenFun = function () {
        this.modalOpen.nativeElement.click();
        this.file4.backup(JSON.parse(JSON.stringify(this.model.images)));
    };
    AddDeveloperComponent.prototype.modelCloseFun = function () {
        this.modalClose.nativeElement.click();
    };
    AddDeveloperComponent.prototype.saveImages = function () {
        var _this = this;
        if (this.file4.files.length < 1) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.info.pleaseChooseAtleastOneImage'), 'error');
            return false;
        }
        this.modalClose.nativeElement.click();
        this.file4.upload().then(function (r) {
            _this.model.images = _this.file4.files;
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('mapDiv'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddDeveloperComponent.prototype, "mapDiv", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('search'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddDeveloperComponent.prototype, "searchElementRef", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('search1'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddDeveloperComponent.prototype, "search1ElementRef", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddDeveloperComponent.prototype, "modalClose", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalOpen'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddDeveloperComponent.prototype, "modalOpen", void 0);
    AddDeveloperComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-add-developer',
            template: __webpack_require__(/*! ./add-developer.component.html */ "./src/app/layout/developers/add-developer/add-developer.component.html"),
            styles: [__webpack_require__(/*! ./add-developer.component.css */ "./src/app/layout/developers/add-developer/add-developer.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_common_constants__WEBPACK_IMPORTED_MODULE_6__["Constant"],
            src_app_services_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"],
            _agm_core__WEBPACK_IMPORTED_MODULE_3__["MapsAPILoader"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"],
            src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_8__["AdminService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__["TranslateService"]])
    ], AddDeveloperComponent);
    return AddDeveloperComponent;
}());



/***/ }),

/***/ "./src/app/layout/developers/developers.component.css":
/*!************************************************************!*\
  !*** ./src/app/layout/developers/developers.component.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".add-img{\n    background-size: cover;background-repeat: no-repeat;\n}"

/***/ }),

/***/ "./src/app/layout/developers/developers.component.html":
/*!*************************************************************!*\
  !*** ./src/app/layout/developers/developers.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container-fluid\">\n  <div class=\"row\">\n      <div class=\"col-md-6 col-6\">\n        <div class=\"title-group\">\n            <h5>{{'viewDevelopers.label' | translate}}</h5>\n            <p>{{'table.pagination.showing' | translate}} {{items?.length}} {{'table.pagination.outof' | translate}} {{parameter.total}}</p>\n        </div>\n      </div>\n      <div class=\"col-md-6 col-6\">\n        <div class=\"btn-cont text-right\">\n            <a *ngIf=\"admin?.admin_acl['Developers Management']?.can_create==1\" class=\"btn btn-primary\" href=\"javascript://\" routerLink=\"/dashboard/developers/add-developer/0\">{{'table.addNewBtn' | translate}}</a>\n        </div>\n      </div>\n  </div>\n\n  <div class=\"white-bg\">\n      <div class=\"tabel-section\">\n        <div class=\"table-responsive\">\n          <table class=\"table table-striped table-align-left\">\n            <tr>\n              <th style=\"width:6%\">&nbsp;</th>\n              <th style=\"width:25%\">\n                <div class=\"table-search\">\n                    <label>{{'table.th.companyName' | translate}}</label>\n                    <div class=\"searh-3\">\n                      <input type=\"text\" [(ngModel)]=\"model.developer_company\" (keyup.enter)=\"getDevelopersFrAdmin()\" name=\"\">\n                      <button *ngIf=\"model.developer_company\" (click)=\"getDevelopersFrAdmin()\"><i class=\"fa fa-search\"></i></button>\n                    </div>\n                </div>\n              </th>\n              <th style=\"width:20%\">\n                <div class=\"table-search\">\n                    <label>{{'table.th.name' | translate}}</label>\n                    <div class=\"searh-3\">\n                      <input type=\"text\" [(ngModel)]=\"model.name\" (keyup.enter)=\"getDevelopersFrAdmin()\" name=\"\">\n                      <button *ngIf=\"model.name\" (click)=\"getDevelopersFrAdmin()\"><i class=\"fa fa-search\"></i></button>\n                    </div>\n                </div>\n              </th>\n              <th style=\"width:20%; text-align:left;\">\n                <div class=\"table-search\">\n                    <label>{{'table.th.contactNumber' | translate}}</label>\n                    <div class=\"searh-3\">\n                      <input type=\"text\" [(ngModel)]=\"model.phone\" (keyup.enter)=\"getDevelopersFrAdmin()\" name=\"\">\n                      <button *ngIf=\"model.phone\" (click)=\"getDevelopersFrAdmin()\"><i class=\"fa fa-search\"></i></button>\n                    </div>\n                </div>\n              </th>\n              <th style=\"width:15%; vertical-align: top;\">\n                  {{'table.th.buildings' | translate}}\n                  <a (click)=\"setBuildingsSort(model.buildings_sort==1?2:1)\" href=\"javascript://\"><img [ngClass]=\"{'upsidedown':model.buildings_sort==2}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n              </th>\n              <th style=\"width:20%\">\n                &nbsp;\n              </th>\n            </tr>\n      \n            <tr *ngFor=\"let item of items| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: parameter.total }; let i=index\">\n              <td> \n                  <img *ngIf=\"item.developer_image\" [defaultImage]=\"item.developer_image| img:'thumb'\" [lazyLoad]=\"item.developer_image\" class=\"rounded-circle\" alt=\"img\">\n                  <img *ngIf=\"!item.developer_image\" class=\"rounded-circle\" src=\"assets/img/default_img.png\" alt=\"img\">\n              </td>\n              <td class=\"text-left\">{{item.developer_company ? item.developer_company : ('table.tr.td.NA' | translate)}}</td>\n              <td class=\"text-left\">\n                <span class=\"name\">\n                  <a data-toggle=\"popover\" data-placement=\"top\" title=\"{{item.name}}\">{{item.name | titlecase}}</a>\n                </span>\n              </td>\n              <td class=\"text-left\" *ngIf=\"item.phone\">{{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}</td>\n              <td class=\"text-left\" *ngIf=\"!item.phone\">{{'table.tr.td.NA' | translate}}</td>\n              <td class=\"text-left\">\n                <a title=\"{{'table.title.clickToViewBuildings' | translate}}\" routerLink=\"/dashboard/projects/view-projects/developer/{{item.id}}\">\n                  <span class=\"green-color\">{{item.buildings_count | numberWithCommas}}</span></a>\n              </td>\n              <td>\n                <div class=\"table-actions\">\n                    <!-- <a *ngIf=\"admin?.admin_acl['Notary Lead Management']?.can_read==1\" title=\"View Leads\" href=\"javascript://\"\n                    routerLink=\"/dashboard/notary/view-notary-leads/{{item.id}}\" class=\"icon-block edit-icon\">\n                    <img src=\"assets/img/ic_leads.png\" alt=\"img\">\n                  </a> -->\n                  <button title=\"{{'table.title.editDetails' | translate}}\" [disabled]=\"admin?.admin_acl['Developers Management']?.can_update==0\" (click)=\"editUser(item)\" class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></button>\n                  <button [disabled]=\"admin?.admin_acl['Developers Management']?.can_delete==0\"\n                    (click)=\"blockUnblockPopup(i, item.id, item.is_blocked==1?0:1)\" \n                    title=\"{{item.is_blocked==1 ? ('table.title.unblock' | translate) : ('table.title.block' | translate)}}\" [ngClass]=\"{'unblock-bg':item.is_blocked==1}\"\n                    class=\"action-icon\"><img src=\"assets/img/block.png\" alt=\"img\">\n                  </button>\n                  <button [disabled]=\"admin?.admin_acl['Developers Management']?.can_purge==0\"\n                    (click)=\"deletePopup(item, i);\" class=\"action-icon\" title=\"{{'table.title.delete' | translate}}\"><img src=\"assets/img/ic_delete.png\" alt=\"img\"></button>\n                </div>\n              </td>\n            </tr>\n\n          </table>\n        </div>\n      </div>\n\n      <div class=\"center\" *ngIf=\"parameter.total == 0\">\n        <img src=\"assets/img/404-error.png\">\n      </div>\n  </div>\n  \n  <div class=\"btn-cont text-right marginT15\" *ngIf=\"parameter.total\">\n    <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n  </div>\n  \n</div>\n"

/***/ }),

/***/ "./src/app/layout/developers/developers.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/layout/developers/developers.component.ts ***!
  \***********************************************************/
/*! exports provided: DevelopersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DevelopersComponent", function() { return DevelopersComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var src_app_models_users_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/users.model */ "./src/app/models/users.model.ts");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
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







var DevelopersComponent = /** @class */ (function () {
    function DevelopersComponent(constant, admin, router, spinner, translate) {
        this.constant = constant;
        this.admin = admin;
        this.router = router;
        this.spinner = spinner;
        this.translate = translate;
        this.parameter = {};
    }
    DevelopersComponent.prototype.ngOnInit = function () {
        this.model = new src_app_models_users_model__WEBPACK_IMPORTED_MODULE_3__["Users"]();
        this.model.buildings_sort = 2; // 2 means desc
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        this.getDevelopersFrAdmin();
    };
    DevelopersComponent.prototype.getPage = function (page) {
        this.parameter.page = page;
        this.getDevelopersFrAdmin();
    };
    DevelopersComponent.prototype.setBuildingsSort = function (buildings_sort) {
        this.model.buildings_sort = buildings_sort;
        this.getDevelopersFrAdmin();
    };
    DevelopersComponent.prototype.getDevelopersFrAdmin = function () {
        var _this = this;
        this.model.page = this.parameter.page;
        this.spinner.show();
        this.admin.postDataApi('getDevelopersFrAdmin', this.model)
            .subscribe(function (success) {
            _this.spinner.hide();
            _this.items = success.data;
            _this.parameter.total = success.total;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    DevelopersComponent.prototype.editUser = function (item) {
        this.router.navigate(['/dashboard/developers/add-developer', item.id]);
    };
    DevelopersComponent.prototype.blockUnblockPopup = function (index, id, flag, user_type) {
        var _this = this;
        if (user_type === void 0) { user_type = '3'; }
        this.parameter.index = index;
        this.parameter.title = this.translate.instant('message.question.areYouSure');
        switch (flag) {
            case 0:
                this.parameter.text = this.translate.instant('message.question.wantToUnblockDeveloper');
                this.parameter.successText = this.translate.instant('message.success.unblockedSuccessfully');
                break;
            case 1:
                this.parameter.text = this.translate.instant('message.question.wantToBlockDeveloper');
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
                _this.blockAdmin(index, id, flag, user_type);
            }
        });
    };
    DevelopersComponent.prototype.blockAdmin = function (index, id, flag, user_type) {
        var _this = this;
        this.parameter.index = index;
        this.parameter.url = 'blockBuyerSeller';
        var input = new FormData();
        input.append('id', id);
        input.append('flag', flag);
        input.append('user_type', user_type);
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            swal(_this.translate.instant('swal.success'), _this.parameter.successText, 'success');
            _this.items[_this.parameter.index]['is_blocked'] = flag;
        });
    };
    DevelopersComponent.prototype.deletePopup = function (item, index) {
        var _this = this;
        this.parameter.title = this.translate.instant('message.question.areYouSure');
        this.parameter.text = this.translate.instant('message.question.wantToDeleteDeveloper');
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
    DevelopersComponent.prototype.deleteData = function (item, index) {
        var _this = this;
        this.admin.postDataApi('deleteBuyerSeller', { id: item.id, user_type: 3 }).subscribe(function (r) {
            _this.items.splice(index, 1);
            _this.parameter.total--;
            swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.deletedSuccessfully'), 'success');
        }, function (error) {
            swal(_this.translate.instant('swal.error'), error.error.message, 'error');
        });
    };
    DevelopersComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-developers',
            template: __webpack_require__(/*! ./developers.component.html */ "./src/app/layout/developers/developers.component.html"),
            styles: [__webpack_require__(/*! ./developers.component.css */ "./src/app/layout/developers/developers.component.css")],
            providers: [src_app_models_users_model__WEBPACK_IMPORTED_MODULE_3__["Users"]]
        }),
        __metadata("design:paramtypes", [src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["Constant"], src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_5__["AdminService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_2__["NgxSpinnerService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__["TranslateService"]])
    ], DevelopersComponent);
    return DevelopersComponent;
}());



/***/ }),

/***/ "./src/app/layout/developers/developers.module.ts":
/*!********************************************************!*\
  !*** ./src/app/layout/developers/developers.module.ts ***!
  \********************************************************/
/*! exports provided: DevelopersModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DevelopersModule", function() { return DevelopersModule; });
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
/* harmony import */ var src_app_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/guards/acl-user.guard */ "./src/app/guards/acl-user.guard.ts");
/* harmony import */ var src_app_modules_shared_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/modules/shared.module */ "./src/app/modules/shared.module.ts");
/* harmony import */ var _developers_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./developers.component */ "./src/app/layout/developers/developers.component.ts");
/* harmony import */ var _add_developer_add_developer_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./add-developer/add-developer.component */ "./src/app/layout/developers/add-developer/add-developer.component.ts");
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
        path: '', component: _developers_component__WEBPACK_IMPORTED_MODULE_12__["DevelopersComponent"],
        canActivate: [src_app_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_10__["AclUserGuard"]], data: { roles: ['Developers Management', 'can_read', ''] }
    },
    {
        path: 'add-developer/:id', component: _add_developer_add_developer_component__WEBPACK_IMPORTED_MODULE_13__["AddDeveloperComponent"],
        canActivate: [src_app_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_10__["AclUserGuard"]], data: { roles: ['Developers Management', 'can_read', ''] }
    }
];
var DevelopersModule = /** @class */ (function () {
    function DevelopersModule() {
    }
    DevelopersModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes),
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerModule"],
                ng_lazyload_image__WEBPACK_IMPORTED_MODULE_8__["LazyLoadImageModule"],
                _agm_core__WEBPACK_IMPORTED_MODULE_7__["AgmCoreModule"].forRoot({
                    apiKey: 'AIzaSyDykCJGMqHIwJluSmSiqKTJBVN2KauM_uQ',
                    libraries: ['drawing', 'places']
                }),
                ngx_pagination__WEBPACK_IMPORTED_MODULE_4__["NgxPaginationModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
                ng2_tel_input__WEBPACK_IMPORTED_MODULE_6__["Ng2TelInputModule"],
                src_app_modules_shared_module__WEBPACK_IMPORTED_MODULE_11__["SharedModule"],
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__["TranslateModule"]
            ],
            declarations: [
                _developers_component__WEBPACK_IMPORTED_MODULE_12__["DevelopersComponent"],
                _add_developer_add_developer_component__WEBPACK_IMPORTED_MODULE_13__["AddDeveloperComponent"]
            ]
        })
    ], DevelopersModule);
    return DevelopersModule;
}());



/***/ })

}]);
//# sourceMappingURL=developers-developers-module.js.map