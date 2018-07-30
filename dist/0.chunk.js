webpackJsonp([0],{

/***/ "../../../../../src/app/common/agm.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AGMComponent; });
var AGMComponent = (function () {
    function AGMComponent(loader) {
        this.loader = loader;
        this.all_overlays = [];
    }
    AGMComponent.prototype.init = function (mapDiv) {
        var _this = this;
        // Wait for the google maps script to be loaded before using the "google" keyword
        this.loader.load().then(function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var map = new google.maps.Map(mapDiv.nativeElement, {
                        center: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        },
                        zoom: 18
                    });
                    _this.map = map;
                    google.maps.event.addListener(map, 'click', function (event) {
                        _this.placeMarker(event.latLng);
                        console.log(event.latLng.toUrlValue(5));
                    });
                    var drawingManager = new google.maps.drawing.DrawingManager({
                        drawingMode: google.maps.drawing.OverlayType.POLYGON,
                        drawingControl: true,
                        drawingControlOptions: {
                            position: google.maps.ControlPosition.TOP_CENTER,
                            drawingModes: [
                                // google.maps.drawing.OverlayType.MARKER,
                                google.maps.drawing.OverlayType.CIRCLE,
                                google.maps.drawing.OverlayType.POLYGON,
                                google.maps.drawing.OverlayType.RECTANGLE
                            ]
                        },
                        markerOptions: {
                            icon: 'images/beachflag.png'
                        },
                        circleOptions: {
                            fillColor: '#ffff00',
                            fillOpacity: 0.2,
                            strokeWeight: 3,
                            clickable: false,
                            editable: true,
                            zIndex: 1
                        },
                        polygonOptions: {
                            clickable: true,
                            draggable: true,
                            editable: true,
                            fillColor: '#00b96e',
                            fillOpacity: 0.5,
                        },
                        rectangleOptions: {
                            clickable: true,
                            draggable: true,
                            editable: true,
                            fillColor: '#ffff00',
                            fillOpacity: 0.5,
                        }
                    });
                    drawingManager.setMap(map);
                    google.maps.event.addListener(drawingManager, 'polygoncomplete', function (event) {
                        event.getPath().getLength();
                        google.maps.event.addListener(event.getPath(), 'insert_at', function () {
                            var len = event.getPath().getLength();
                            for (var i = 0; i < len; i++) {
                                console.log(event.getPath().getAt(i).toUrlValue(5));
                            }
                        });
                        google.maps.event.addListener(event.getPath(), 'set_at', function () {
                            var len = event.getPath().getLength();
                            for (var i = 0; i < len; i++) {
                                console.log(event.getPath().getAt(i).toUrlValue(5));
                            }
                        });
                    });
                    google.maps.event.addListener(drawingManager, 'overlaycomplete', function (event) {
                        _this.all_overlays.push(event);
                        if (event.type !== google.maps.drawing.OverlayType.MARKER) {
                            drawingManager.setDrawingMode(null);
                            // Write code to select the newly selected object.
                            var newShape_1 = event.overlay;
                            newShape_1.type = event.type;
                            google.maps.event.addListener(newShape_1, 'click', function () {
                                _this.setSelection(newShape_1);
                            });
                            _this.setSelection(newShape_1);
                        }
                    });
                    var centerControlDiv = document.createElement('div');
                    //    var centerControl = new centerControl(centerControlDiv, map);
                    var centerControl = _this.CenterControl(centerControlDiv, map);
                    // centerControlDiv.index = 1;
                    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(centerControlDiv);
                });
            }
        });
    };
    AGMComponent.prototype.getPolygonCoords = function (newShape) {
        var len = newShape.getPath().getLength();
        for (var i = 0; i < len; i++) {
            console.log(newShape.getPath().getAt(i).toUrlValue(6));
        }
    };
    AGMComponent.prototype.placeMarker = function (location) {
        var marker = new google.maps.Marker({
            position: location,
            map: this.map
        });
    };
    AGMComponent.prototype.clearSelection = function () {
        if (this.selectedShape) {
            this.selectedShape.setEditable(false);
            this.selectedShape = null;
        }
    };
    AGMComponent.prototype.setSelection = function (shape) {
        this.clearSelection();
        this.selectedShape = shape;
        shape.setEditable(true);
        // google.maps.event.addListener(selectedShape.getPath(), 'insert_at', getPolygonCoords(shape));
        // google.maps.event.addListener(selectedShape.getPath(), 'set_at', getPolygonCoords(shape));
    };
    AGMComponent.prototype.deleteSelectedShape = function () {
        if (this.selectedShape) {
            this.selectedShape.setMap(null);
        }
    };
    AGMComponent.prototype.deleteAllShape = function () {
        for (var i = 0; i < this.all_overlays.length; i++) {
            this.all_overlays[i].overlay.setMap(null);
        }
        this.all_overlays = [];
    };
    AGMComponent.prototype.CenterControl = function (controlDiv, map) {
        var _this = this;
        // Set CSS for the control border.
        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '3px';
        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginBottom = '22px';
        controlUI.style.textAlign = 'center';
        controlUI.title = 'Select to delete the shape';
        controlDiv.appendChild(controlUI);
        // Set CSS for the control interior.
        var controlText = document.createElement('div');
        controlText.style.color = 'rgb(25,25,25)';
        controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
        controlText.style.fontSize = '16px';
        controlText.style.lineHeight = '38px';
        controlText.style.paddingLeft = '5px';
        controlText.style.paddingRight = '5px';
        controlText.innerHTML = 'Delete Selected Area';
        controlUI.appendChild(controlText);
        // Setup the click event listeners: simply set the map to Chicago.
        controlUI.addEventListener('click', function () {
            _this.deleteSelectedShape();
        });
    };
    AGMComponent.prototype.getPolygons = function () {
        var _this = this;
        console.log(this.all_overlays);
        this.all_overlays.forEach(function (item, count) {
            console.log('overlay' + count);
            _this.getPolygonCoords(item.overlay);
        });
    };
    return AGMComponent;
}());

//# sourceMappingURL=agm.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/settings/edit-profile/edit-profile.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/settings/edit-profile/edit-profile.component.html":
/***/ (function(module, exports) {

module.exports = "<!--content start-->\n<div class=\"container-fluid\">\n    <div class=\"breadcrumb-group\">\n      <h5>Settings</h5>\n      <nav class=\"breadcrumb\">\n          <a class=\"breadcrumb-item\" routerLink=\"/dashboard\">Home</a>\n          <a class=\"breadcrumb-item\">Settings</a>\n          <span class=\"breadcrumb-item active\">Edit Profile</span>\n      </nav>\n    </div>\n\n    <ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n    \n    <!-- <div class=\"white-bg\">\n      <div class=\"page-title\">\n          <h3>Edit Profile</h3>\n      </div>\n\n    </div> -->\n\n\n\n    <form class=\"form-horizontal\" novalidate #addForm=\"ngForm\" (ngSubmit)=\"updateProfile(addForm)\">\n        \n        <div class=\"form-group row\">\n            <label class=\"col-sm-2 col-form-label\">Image:</label>\n            <div class=\"col-sm-10\">\n                <input required accept=\"image/*\" class=\"image\" (change)=\"changeListner($event)\" type=\"file\">\n            </div>\n          </div>\n            <div class=\"form-group row\">\n              <label class=\"col-sm-2 col-form-label\">Name:</label>\n              <div class=\"col-sm-10\">\n  \n                  <input type=\"text\" class=\"form-control\" placeholder=\"Name\" id=\"name\" required minlength=\"1\" [(ngModel)]=\"model.name\" name=\"name\" #name=\"ngModel\">\n  \n                  <div *ngIf=\"name.errors && (name.dirty || name.touched)\" class=\"show-error\">\n                      <div [hidden]=\"!name.errors.required\">\n                          Name is required!\n                      </div>\n                      <div [hidden]=\"!name.errors.min\">\n                          Name must be at least 1.\n                      </div>\n                  </div>\n  \n              </div>\n            </div>\n              \n            <div class=\"form-group row\">\n              <label class=\"col-sm-2 col-form-label\">Contact Number:</label>\n              <div class=\"col-sm-10\">\n                <input type=\"text\" class=\"form-control\"\n                id=\"phone\" required minlength=\"1\" [(ngModel)]=\"model.phone\" \n                name=\"phone\" #phone=\"ngModel\"\nng2TelInput\n[ng2TelInputOptions]=\"initialCountry\"\n(countryChange)=\"onCountryChange($event)\" />\n\n\n                <div *ngIf=\"phone.errors && (phone.dirty || phone.touched)\" class=\"show-error\">\n                    <div [hidden]=\"!phone.errors.required\">\n                      Contact Phone Number is required!\n                    </div>\n                    <div [hidden]=\"!phone.errors.min\">\n                      Contact Phone Number must be at least 1.\n                    </div>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"form-group btn-cont text-right\">\n              <button [disabled]=\"parameter.loading\" class=\"btn btn-primary apply-btn\" type=\"submit\">Update Settings</button>\n            </div>\n      </form>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/layout/settings/edit-profile/edit-profile.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__ = __webpack_require__("../../../../ngx-sweetalert2/index.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditProfileComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EditProfileComponent = (function () {
    function EditProfileComponent(element, router, admin, swal) {
        this.element = element;
        this.router = router;
        this.admin = admin;
        this.swal = swal;
        this.parameter = {};
        this.model = {
            name: '',
            phone: '',
            image: ''
        };
    }
    EditProfileComponent.prototype.ngOnInit = function () {
    };
    EditProfileComponent.prototype.onCountryChange = function (e) {
        this.parameter.countryCode = e.iso2;
        this.parameter.dialCode = e.dialCode;
        this.initialCountry = { initialCountry: e.iso2 };
    };
    EditProfileComponent.prototype.changeListner = function (event) {
        var reader = new FileReader();
        var image = this.element.nativeElement.querySelector('.image');
        this.parameter.image = event.target.files[0];
        this.parameter.icon = this.parameter.image;
        reader.onload = function (e) {
            console.log(image);
            var src = e.target['result'];
            image.src = src;
            console.log(image.src);
        };
        reader.readAsDataURL(event.target.files[0]);
    };
    EditProfileComponent.prototype.updateProfile = function (formData) {
        var _this = this;
        console.log(formData);
        this.parameter.loading = true;
        this.parameter.url = 'updateProfile';
        var input = new FormData();
        input.append('name', formData.value.name);
        input.append('phone', formData.value.phone);
        // input.append("country_code", this.parameter.countryCode);
        input.append('image', this.parameter.image);
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('succccc', success);
            _this.parameter.loading = false;
            _this.admin.login.next(success.data);
            _this.swal.success({
                title: 'Success',
                text: 'Details updated successfully!'
            });
        }, function (error) {
            _this.parameter.loading = false;
            if (error.statusCode === 401) {
                _this.router.navigate(['']);
            }
            else {
                _this.swal.warning({ text: error.message });
            }
        });
    };
    return EditProfileComponent;
}());
EditProfileComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-edit-profile',
        template: __webpack_require__("../../../../../src/app/layout/settings/edit-profile/edit-profile.component.html"),
        styles: [__webpack_require__("../../../../../src/app/layout/settings/edit-profile/edit-profile.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__["a" /* SweetAlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__["a" /* SweetAlertService */]) === "function" && _d || Object])
], EditProfileComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=edit-profile.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/settings/locality/locality.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".selectedRow{\n    background: rgb(228, 224, 224)\n}\n.locality-name{\n    cursor: pointer;\n}\n.form-model0P{\n    padding: 0px !important;\n}\n.model-body10P{\n    padding: 10px !important;\n}\n.my-modal-header{\n    display: inline;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/settings/locality/locality.component.html":
/***/ (function(module, exports) {

module.exports = "<!--content start-->\n<div class=\"container-fluid\">\n  <div class=\"breadcrumb-group\">\n    <h5>Settings</h5>\n    <nav class=\"breadcrumb\">\n        <a class=\"breadcrumb-item\" routerLink=\"/dashboard\">Home</a>\n        <a class=\"breadcrumb-item\">Settings</a>\n        <!-- <a class=\"breadcrumb-item\">Location</a> -->\n        <span class=\"breadcrumb-item active\">Locality</span>\n    </nav>\n  </div>\n    \n  <ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n\n  <div class=\"white-bg\">\n    <div class=\"page-title\">\n        <h3>Locality</h3>\n    </div>\n\n    <!-- add city -->\n    <div class=\"form-outer marginT15\">\n      <div class=\"inline-form-group\">\n        <div class=\"row\">\n          <div class=\"col-md-12\">\n            <label><strong>Add Locality</strong></label>\n            <hr>\n          </div>\n          <div class=\"col-lg-3 col-md-3 col-sm-6 col-6\">\n            <div class=\"form-group marginB0\">\n              <label>Country</label>\n              <select title=\"Choose Country\" class=\"form-control\" (change)=\"getStates($event.target.value)\">\n                <option value=\"\" disabled>Select Country</option>\n                <option *ngFor=\"let country of parameter.countries\" value=\"{{country.id}}\" [selected]=\"country.id == parameter.country_id\">{{country.name_en}}</option>\n              </select>\n            </div>\n          </div>\n          <div class=\"col-lg-3 col-md-3 col-sm-6 col-6\">\n            <div class=\"form-group marginB0\">\n              <label>State</label>\n              <select title=\"Choose State\" class=\"form-control\" (change)=\"getCities($event.target.value)\">\n                <option value=\"\" disabled>Select State</option>\n                <option *ngFor=\"let state of parameter.states\" value=\"{{state.id}}\" [selected]=\"state.id == parameter.state_id\">{{state.name_en}}</option>\n              </select>\n            </div>\n          </div>\n          <div class=\"col-lg-3 col-md-3 col-sm-6 col-6\">\n            <div class=\"form-group marginB0\">\n              <label>City</label>\n              <select title=\"Choose City\" class=\"form-control\" (change)=\"getLocalities($event.target.value)\">\n                <option value=\"\" disabled>Select City</option>\n                <option *ngFor=\"let city of parameter.cities\" value=\"{{city.id}}\" [selected]=\"city.id == parameter.city_id\">{{city.name_en}}</option>\n              </select>\n            </div>\n          </div>\n          <div class=\"col-lg-3 col-md-3 col-sm-6 col-6\">\n\n          </div>\n        </div>\n      </div>\n  </div>\n  <hr>\n  \n  <div class=\"form-outer marginT15\">\n    <div class=\"row\">\n      <div class=\"col-md-4\">\n        <table class=\"table table-striped\">\n          <tr>\n            <th style=\"width:80%; text-align:left;\">\n                <div class=\"table-search\">\n                <input type=\"Search here\" (input)=\"getLocalities(parameter.city_id, $event.target.value)\" name=\"\" placeholder=\"Search here\">\n                </div>\n            </th>\n            <th style=\"width:20%\">Action</th>\n          </tr>\n          <tr *ngFor=\"let locality of all_overlays; let index = index\">\n            <td class=\"text-left locality-name\" [ngClass]=\"locality.id == selectedLocality ? 'selectedRow' : ''\" (click)=\"setSelection(locality.overlay, locality.id)\">\n              {{locality.name_en}}\n            </td>\n            <!-- <td>\n              <a (click)=\"upadteSelection(locality, index)\" title=\"Unblock State\" class=\"icon-block block-icon\"><img src=\"./../../../../assets/img/top-arrow.png\" alt=\"img\"></a>\n            </td> -->\n            <td [ngClass]=\"locality.id == selectedLocality ? 'selectedRow' : ''\">\n              <a *ngIf=\"locality.status == 0\" (click)=\"removeSelection(locality, index, 1)\" title=\"Unblock Locality\" class=\"icon-block block-icon unblock-bg\"><img src=\"./../../../../assets/img/block.png\" alt=\"img\"></a>\n              <a *ngIf=\"locality.status == 1\" (click)=\"removeSelection(locality, index, 0)\" title=\"Block Locality\" class=\"icon-block block-icon\"><img src=\"./../../../../assets/img/unblock.png\" alt=\"img\"></a>\n            </td>\n          </tr>\n\n          <div *ngIf=\"parameter.localityCount == 0\">\n            <p class=\"show-error\">\n              {{constant.errorMsg.NO_LOCALITY_FOUND}}\n            </p>\n          </div>\n\n        </table>\n      </div>\n\n      <!-- google map -->\n      <div class=\"col-md-8\">\n        <div id=\"mapDiv\" style=\"height: 500px; width: 100%;\" #mapDiv></div>\n      </div>\n\n    </div>\n  </div>\n\n  </div>\n</div>\n<!--content end-->\n\n\n<!-- Trigger the modal with a button -->\n<button type=\"button\" style=\"display: none;\" class=\"btn btn-info\" data-toggle=\"modal\" data-target=\"#myModal\" #localityOpen>Open Modal</button>\n\n<!-- Modal -->\n<div id=\"myModal\" class=\"modal fade\" role=\"dialog\">\n  <div class=\"modal-dialog\">\n\n    <!-- Modal content-->\n    <div class=\"modal-content\">\n      <div class=\"modal-header my-modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n        <h4 class=\"modal-title\">Add Locality Details</h4>\n      </div>\n      <form class=\"form-horizontal form-model0P\" role=\"form\" novalidate #addForm=\"ngForm\" (ngSubmit)=\"checkIfLocalitySpanishNameEntered(addForm.value.name_en, addForm.value.name_es, addForm.value.price_per_sqft)\">\n        <div class=\"modal-body model-body10P\">\n          <div class=\"form-group\">\n            <input type=\"text\" class=\"form-control\" placeholder=\"Locality name (English)\" id=\"name_en\" required [(ngModel)]=\"model.localityModel.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n            <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-error\">\n                <div [hidden]=\"!name_en.errors.required\">\n                  {{constant.errorMsg.COUNTRY_NAME_REQUIRED}}\n                </div>\n            </div>\n          </div>\n          <div class=\"form-group\">\n            <input type=\"text\" class=\"form-control\" placeholder=\"Locality name (Spanish)\" [(ngModel)]=\"model.localityModel.name_es\">\n          </div>\n\n          <div class=\"form-group\">\n            <input type=\"text\" class=\"form-control\" min=\"1\" placeholder=\"Price per sqft\" id=\"price_per_sqft\" required [(ngModel)]=\"model.localityModel.price_per_sqft\" name=\"price_per_sqft\" #price_per_sqft=\"ngModel\">\n            <div *ngIf=\"price_per_sqft.errors && (price_per_sqft.dirty || price_per_sqft.touched)\" class=\"show-error\">\n                <div [hidden]=\"!price_per_sqft.errors.required\">\n                  {{constant.errorMsg.PRICE_PER_SQFT_REQUIRED}}\n                </div>\n                <div [hidden]=\"!price_per_sqft.errors.min\">\n                  {{constant.errorMsg.PRICE_PER_SQFT_MIN}}\n                </div>\n            </div>\n          </div>\n\n        </div>\n        <div class=\"modal-footer\">\n          <button type=\"submit\" [disabled]=\"addForm.invalid\" class=\"btn btn-info\">Submit</button>\n          <button type=\"button\" class=\"btn btn-default\" #localityClose data-dismiss=\"modal\">Close</button>\n        </div>\n      </form>\n\n    </div>\n\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/layout/settings/locality/locality.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__ = __webpack_require__("../../../../ngx-sweetalert2/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__agm_core__ = __webpack_require__("../../../../@agm/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_locality_model__ = __webpack_require__("../../../../../src/app/models/locality.model.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocalityComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var LocalityComponent = (function () {
    function LocalityComponent(loader, admin, router, constant, model, swal) {
        this.loader = loader;
        this.admin = admin;
        this.router = router;
        this.constant = constant;
        this.model = model;
        this.swal = swal;
        this.parameter = {};
        this.all_overlays = [];
        this.showModal = true;
    }
    LocalityComponent.prototype.ngOnInit = function () {
        this.parameter.countryCount = 0;
        this.parameter.stateCount = 0;
        this.parameter.cityCount = 0;
        this.parameter.localities = [];
        this.getCountries('');
    };
    LocalityComponent.prototype.getCountries = function (keyword) {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'getCountries';
        var input = new FormData();
        if (keyword) {
            input.append('keyword', keyword);
        }
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('countries', success);
            _this.parameter.loading = false;
            _this.parameter.countries = success.data;
            _this.parameter.countryCount = success.data.length;
            if (_this.parameter.countries.length !== 0) {
                _this.parameter.country_id = _this.parameter.countries[0].id;
                _this.getStates(_this.parameter.countries[0].id, '');
            }
        }, function (error) {
            _this.parameter.loading = false;
            if (error.statusCode === 401) {
                _this.swal.warning({
                    title: 'Error',
                    text: error.message,
                });
                _this.router.navigate(['']);
            }
            else {
                _this.swal.warning({
                    title: 'Error',
                    text: error.message,
                });
            }
        });
    };
    LocalityComponent.prototype.getStates = function (country_id, keyword) {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'country/getStates';
        this.parameter.country_id = country_id;
        var input = new FormData();
        input.append('country_id', country_id);
        if (keyword) {
            input.append('keyword', keyword);
        }
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('states', success);
            _this.parameter.loading = false;
            _this.parameter.states = success.data;
            _this.parameter.stateCount = success.data.length;
            if (_this.parameter.states.length) {
                _this.parameter.state_id = _this.parameter.states[0].id;
                _this.getCities(_this.parameter.states[0].id, '');
            }
            else {
                _this.parameter.city_id = '0';
                _this.parameter.localityCount = 0;
                _this.parameter.cities = [];
                _this.parameter.localities = [];
                _this.all_overlays = [];
                _this.init();
            }
        }, function (error) {
            console.log(error);
            _this.parameter.loading = false;
            if (error.statusCode === 401) {
                _this.router.navigate(['']);
            }
            else {
                _this.swal.warning({
                    // title: 'Internet Connection',
                    text: error.messages,
                });
            }
        });
    };
    LocalityComponent.prototype.getCities = function (state_id, keyword) {
        var _this = this;
        console.log('mm', state_id, keyword);
        this.parameter.loading = true;
        this.parameter.url = 'getCities';
        this.parameter.state_id = state_id;
        var input = new FormData();
        input.append('state_id', state_id);
        if (keyword) {
            input.append('keyword', keyword);
        }
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('cities', success);
            _this.parameter.loading = false;
            _this.parameter.cities = success.data;
            _this.parameter.cityCount = success.data.length;
            if (_this.parameter.cities.length) {
                _this.parameter.city_id = _this.parameter.cities[0].id;
                console.log('cityid', _this.parameter.city_id);
                _this.getLocalities(_this.parameter.city_id, '');
            }
            else {
                _this.parameter.cityCount = 0;
                _this.parameter.localityCount = 0;
                _this.parameter.cities = [];
                _this.parameter.localities = [];
                _this.all_overlays = [];
                _this.init();
            }
        }, function (error) {
            console.log(error);
            _this.parameter.loading = false;
            if (error.statusCode === 401) {
                _this.router.navigate(['']);
            }
            else {
                _this.swal.warning({
                    // title: 'Internet Connection',
                    text: error.messages,
                });
            }
        });
    };
    LocalityComponent.prototype.getLocalities = function (city_id, keyword) {
        var _this = this;
        if (keyword === void 0) { keyword = ''; }
        console.log('mm', city_id, keyword);
        this.parameter.loading = true;
        this.parameter.url = 'getLocalities';
        this.parameter.city_id = city_id;
        var input = new FormData();
        input.append('city_id', city_id);
        if (keyword) {
            input.append('keyword', keyword);
        }
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('Localities', success);
            _this.parameter.loading = false;
            _this.parameter.localities = success.data;
            _this.all_overlays = _this.parameter.localities;
            _this.parameter.localityCount = success.data.length;
            if (_this.parameter.localities.length) {
                _this.selectedLocality = _this.parameter.localities[0].id;
            }
            else {
                _this.all_overlays = [];
            }
            _this.init();
        }, function (error) {
            console.log(error);
            _this.parameter.loading = false;
            if (error.statusCode === 401) {
                _this.router.navigate(['']);
            }
            else {
                _this.swal.warning({
                    // title: 'Internet Connection',
                    text: error.messages,
                });
            }
        });
    };
    LocalityComponent.prototype.init = function () {
        var _this = this;
        // Wait for the google maps script to be loaded before using the "google" keyword
        this.loader.load().then(function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var map = new google.maps.Map(_this.mapDiv.nativeElement, {
                        center: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        },
                        zoom: 18
                    });
                    _this.map = map;
                    var all_overlays_index = 0;
                    _this.all_overlays.forEach(function (locality) {
                        var poly_coordinates = JSON.parse(locality.poly_coordinates);
                        // console.log(poly_coordinates);
                        var polygon = poly_coordinates.map(function (ll) {
                            // console.log(ll);
                            var latlng = ll.split(',');
                            var coord = new google.maps.LatLng(parseFloat(latlng[0]), parseFloat(latlng[1]));
                            // console.log(coord);
                            return coord;
                        });
                        // this.setSelection(polygon);
                        var singlePolygon = new google.maps.Polygon({
                            paths: polygon,
                            editable: false,
                            strokeColor: '#FF0000',
                            strokeOpacity: 0.8,
                            strokeWeight: 2,
                            fillColor: '#FF0000',
                            fillOpacity: 0.35
                        });
                        locality.overlay = singlePolygon;
                        // showing selected first locality
                        if (all_overlays_index === 0) {
                            _this.setSelection(singlePolygon, locality.id);
                        }
                        all_overlays_index++;
                        // this.all_overlays.push(singlePolygon);
                        google.maps.event.addListener(singlePolygon, 'click', function () {
                            console.log('click', singlePolygon, locality.id);
                            _this.setSelection(singlePolygon, locality.id);
                        });
                        // google.maps.event.addListener(singlePolygon, 'mouseup', function(muEvent) {
                        //         console.log('33')
                        //   this.setSelection(singlePolygon);
                        // });
                        singlePolygon.setMap(map);
                    });
                    google.maps.event.addListener(map, 'click', function (event) {
                        console.log(event);
                        _this.placeMarker(event.latLng);
                        console.log(event.latLng.toUrlValue(5));
                    });
                    var drawingManager = new google.maps.drawing.DrawingManager({
                        drawingControl: true,
                        drawingControlOptions: {
                            position: google.maps.ControlPosition.TOP_CENTER,
                            drawingModes: [
                                // google.maps.drawing.OverlayType.MARKER,
                                // google.maps.drawing.OverlayType.CIRCLE,
                                google.maps.drawing.OverlayType.POLYGON,
                                google.maps.drawing.OverlayType.RECTANGLE
                            ]
                        },
                        polygonOptions: {
                            clickable: true,
                            draggable: true,
                            editable: true,
                            fillColor: '#00b96e',
                            fillOpacity: 0.5,
                        },
                        rectangleOptions: {
                            clickable: true,
                            draggable: true,
                            editable: true,
                            fillColor: '#ffff00',
                            fillOpacity: 0.5,
                        }
                    });
                    drawingManager.setMap(map);
                    google.maps.event.addListener(drawingManager, 'polygoncomplete', function (event) {
                        event.getPath().getLength();
                        google.maps.event.addListener(event.getPath(), 'insert_at', function () {
                            var len = event.getPath().getLength();
                            for (var i = 0; i < len; i++) {
                                console.log(event.getPath().getAt(i).toUrlValue(5));
                            }
                        });
                        google.maps.event.addListener(event.getPath(), 'set_at', function () {
                            var len = event.getPath().getLength();
                            for (var i = 0; i < len; i++) {
                                console.log(event.getPath().getAt(i).toUrlValue(5));
                            }
                        });
                    });
                    google.maps.event.addListener(drawingManager, 'overlaycomplete', function (event) {
                        _this.parameter.overlay = _this.getPolygonCoords(event.overlay);
                        _this.localityOpen.nativeElement.click();
                        console.log('xx', typeof _this.getPolygonCoords(event.overlay));
                        // this.swal.prompt({
                        //   text:''
                        // }).then(f=>{
                        //   this.shapeName = f;
                        //   var locality = {
                        //     name_en: this.shapeName,
                        //     name_es: this.shapeName,
                        //     coordinates: this.getPolygonCoords(event.overlay),
                        //     poly_coordinates: JSON.stringify(this.getPolygonCoords(event.overlay)),
                        //     status:'1',
                        //     city_id:this.parameter.city_id,
                        //     overlay: event.overlay
                        //   };
                        //   //console.log(locality);
                        //   //this.all_overlays.push(locality);
                        //   //this.all_overlays = this.all_overlays;
                        //   //this.all_overlays.splice(0,2);
                        //   //this.len = this.all_overlays.length;
                        //   console.log(this.all_overlays);
                        //   delete locality.overlay;
                        //   //console.log(locality);
                        //   this.admin.postDataApi('addLocality', locality).subscribe(
                        //       r => {
                        //         console.log(r);
                        //         this.all_overlays.push(r.data);
                        //         //this.getLocalities(this.parameter.city_id,'');
                        //       });
                        // });
                        // this.all_overlays = this.all_overlays;
                        if (event.type !== google.maps.drawing.OverlayType.MARKER) {
                            drawingManager.setDrawingMode(null);
                            // Write code to select the newly selected object.
                            var newShape_1 = event.overlay;
                            newShape_1.type = event.type;
                            google.maps.event.addListener(newShape_1, 'click', function () {
                                _this.setSelection(newShape_1);
                            });
                            _this.setSelection(newShape_1);
                        }
                    });
                    // var centerControlDiv = document.createElement('div');
                    //    var centerControl = new centerControl(centerControlDiv, map);
                    // var centerControl = this.CenterControl(centerControlDiv, map);
                    // centerControlDiv.index = 1;
                    // map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(centerControlDiv);
                });
            }
        });
    };
    LocalityComponent.prototype.checkIfLocalitySpanishNameEntered = function (name_en, name_es, price_per_sqft) {
        var self = this;
        if (name_es === '') {
            this.swal.confirm({
                text: this.constant.errorMsg.SAVE_ENGLISH_COUNTRY_NAME,
            }).then(function () {
                self.addLocality(name_en, name_en, price_per_sqft);
            })
                .catch(function () {
                // console.log('Logout cancelled by user');
            });
        }
        else {
            self.addLocality(name_en, name_es, price_per_sqft);
        }
    };
    LocalityComponent.prototype.addLocality = function (name_en, name_es, price_per_sqft) {
        var _this = this;
        this.localityClose.nativeElement.click();
        var locality = {
            name_en: name_en,
            name_es: name_es,
            price_per_sqft: price_per_sqft,
            coordinates: this.parameter.overlay,
            poly_coordinates: JSON.stringify(this.parameter.overlay),
            status: '1',
            city_id: this.parameter.city_id,
            overlay: this.parameter.overlay
        };
        console.log('locality', locality);
        delete locality.overlay;
        this.admin.postDataApi('addLocality', locality).subscribe(function (r) {
            console.log('zz', r);
            _this.all_overlays.push(r.data);
        });
    };
    LocalityComponent.prototype.getPolygonCoords = function (newShape) {
        console.log('new', newShape);
        // console.log('IN');
        var coordinates_array = [];
        var len = newShape.getPath().getLength();
        for (var i = 0; i < len; i++) {
            // console.log(newShape.getPath().getAt(i).toUrlValue(6));
            coordinates_array.push(newShape.getPath().getAt(i).toUrlValue(6));
        }
        // console.log(coordinates_array);
        return coordinates_array;
    };
    LocalityComponent.prototype.getLatLngFromString = function (ll) {
        var latlng = ll.split(/, ?/);
        return new google.maps.LatLng(parseFloat(latlng[0]), parseFloat(latlng[1]));
    };
    LocalityComponent.prototype.placeMarker = function (location) {
        var marker = new google.maps.Marker({
            position: location,
            map: this.map
        });
    };
    LocalityComponent.prototype.clearSelection = function () {
        if (this.selectedShape) {
            this.selectedShape.setEditable(false);
            this.selectedShape = null;
        }
    };
    LocalityComponent.prototype.setSelection = function (shape, locality) {
        if (locality === void 0) { locality = ''; }
        console.log('zzzzzzzzzzzz', shape);
        this.clearSelection();
        this.selectedLocality = locality;
        this.selectedShape = shape;
        shape.setEditable(true);
        var coords = this.getPolygonCoords(shape);
        var latlng = coords[0].split(',');
        var coord = new google.maps.LatLng(parseFloat(latlng[0]), parseFloat(latlng[1]));
        // console.log(coords);
        // var center = new google.maps.LatLngBounds(shape).getCenter();
        // let center = shape.my_getBounds().getCenter()
        this.map.setCenter(coord);
        // google.maps.event.addListener(selectedShape.getPath(), 'insert_at', getPolygonCoords(shape));
        // google.maps.event.addListener(shape.getPath(), 'set_at', this.getPolygonCoords(shape));
    };
    LocalityComponent.prototype.deleteSelectedShape = function () {
        if (this.selectedShape) {
            this.selectedShape.setMap(null);
        }
    };
    LocalityComponent.prototype.deleteAllShape = function () {
        for (var i = 0; i < this.all_overlays.length; i++) {
            this.all_overlays[i].overlay.setMap(null);
        }
        this.all_overlays = [];
    };
    LocalityComponent.prototype.getPolygons = function () {
        var _this = this;
        console.log(this.all_overlays);
        this.all_overlays.forEach(function (item, count) {
            console.log('overlay' + count);
            _this.getPolygonCoords(item.overlay.overlay);
        });
    };
    LocalityComponent.prototype.removeSelection = function (locality, index, status) {
        console.log('Removing...', locality);
        locality.status = status;
        // this.all_overlays.splice(index,1);
        // locality.overlay.setMap(null);
        delete locality.overlay;
        // locality.status = 0;
        this.admin.postDataApi('addLocality', locality).subscribe(function (r) {
            console.log(r);
            // this.all_overlays.push(r.data);
            // this.getLocalities(this.parameter.city_id,'');
        });
    };
    LocalityComponent.prototype.upadteSelection = function (locality, index) {
    };
    return LocalityComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('localityOpen'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object)
], LocalityComponent.prototype, "localityOpen", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('localityClose'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _b || Object)
], LocalityComponent.prototype, "localityClose", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('mapDiv'),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _c || Object)
], LocalityComponent.prototype, "mapDiv", void 0);
LocalityComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-locality',
        template: __webpack_require__("../../../../../src/app/layout/settings/locality/locality.component.html"),
        styles: [__webpack_require__("../../../../../src/app/layout/settings/locality/locality.component.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_5__common_constants__["a" /* Constant */], __WEBPACK_IMPORTED_MODULE_6__models_locality_model__["a" /* Locality */]]
    }),
    __metadata("design:paramtypes", [typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__agm_core__["b" /* MapsAPILoader */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__agm_core__["b" /* MapsAPILoader */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_5__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__common_constants__["a" /* Constant */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_6__models_locality_model__["a" /* Locality */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__models_locality_model__["a" /* Locality */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__["a" /* SweetAlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__["a" /* SweetAlertService */]) === "function" && _j || Object])
], LocalityComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j;
//# sourceMappingURL=locality.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/settings/location/location.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/settings/location/location.component.html":
/***/ (function(module, exports) {

module.exports = "<!--content start-->\n<div class=\"container-fluid\">\n    <div class=\"breadcrumb-group\">\n      <h5>Settings</h5>\n      <nav class=\"breadcrumb\">\n          <a class=\"breadcrumb-item\" routerLink=\"/dashboard\">Home</a>\n          <a class=\"breadcrumb-item\">Settings</a>\n          <span class=\"breadcrumb-item active\">Location</span>\n      </nav>\n    </div>\n\n    <ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n    \n    <div class=\"white-bg\">\n      <div class=\"page-title\">\n          <h3>Location</h3>\n      </div>\n\n      <!-- add country -->\n      <div class=\"form-outer\">\n          <div class=\"inline-form-group\">\n          <div class=\"row\">\n              <div class=\"col-md-12\">\n                <label><strong>Country</strong></label>\n              </div>\n              <div class=\"col-lg-3 col-md-3 col-sm-6 col-6 table-search\">\n                  <input type=\"text\" (input)=\"getCountries($event.target.value)\" name=\"keyword\" placeholder=\"Search here\">\n              </div>\n              <div class=\"col-lg-9 col-md-9 col-sm-6 col-6\">\n                 <div class=\"form-group marginB0\">\n                    <div class=\"add-new pull-right\">\n                        <a class=\"btn\" href=\"javascript://\" (click)=\"openCountryModal(addCountryModal, '', '', '', '1', -1)\">+ Add New</a>\n                    </div>\n                 </div>\n              </div>\n           </div>\n           <hr>\n          </div>\n      </div>\n\n      <!-- list country -->\n      <div class=\"tabel-section padding40 paddingT0\">\n          <div class=\"table-responsive\">\n            <table class=\"table table-striped\">\n                <tr>\n                  <th style=\"width:80%; text-align:left;\">Country</th>\n                  <th style=\"width:20%\">Action</th>\n                </tr>\n                <tr *ngFor=\"let country of parameter.countries; let c=index\">\n                  <td class=\"text-left\">\n                    {{country.name_en}}\n                  </td>\n                  <td>\n                    <a title=\"Edit Country\" (click)=\"openCountryModal(addCountryModal, country.id, country.name_en, country.name_es, country.status, c)\" class=\"icon-block edit-icon\"><img src=\"./../../../../assets/img/edit.png\" alt=\"img\"></a>\n                    <a *ngIf=\"country.status == 1\" (click)=\"blockUnblockCountry(country.id, country.name_en, country.name_es, 0, c)\" title=\"Block Country\" class=\"icon-block block-icon\"><img src=\"./../../../../assets/img/unblock.png\" alt=\"img\"></a>\n                    <a *ngIf=\"country.status == 0\" (click)=\"blockUnblockCountry(country.id, country.name_en, country.name_es, 1, c)\" title=\"Unblock Country\" class=\"icon-block block-icon unblock-bg\"><img src=\"./../../../../assets/img/block.png\" alt=\"img\"></a>\n                  </td>\n                </tr>\n\n                <div *ngIf=\"parameter.countryCount == 0\">\n                  <p class=\"show-error\">\n                    {{constant.errorMsg.NO_COUNTRY_FOUND}}\n                  </p>\n                </div>\n            </table>\n          </div>\n      </div>\n\n      <!-- add state -->\n        <div class=\"form-outer marginT15\">\n          <div class=\"inline-form-group\">\n          <div class=\"row\">\n              <div class=\"col-md-12\">\n                <label><strong>State</strong></label>\n                <hr>\n              </div>\n              <div class=\"col-lg-3 col-md-3 col-sm-6 col-6\">\n                 <div class=\"form-group marginB0\">\n                    <label>Country</label>\n                    <select class=\"form-control\" (change)=\"getStates($event.target.value)\">\n                       <option *ngFor=\"let country of parameter.countries\" value=\"{{country.id}}\">{{country.name_en}}</option>\n                    </select>\n                 </div>\n              </div>\n              <div class=\"col-lg-3 col-md-3 col-sm-6 col-6 table-search\">\n                <div class=\"form-group marginB0\">\n                  <label>Search</label>\n                  <input type=\"text\" (input)=\"getCountries($event.target.value)\" name=\"keyword\" placeholder=\"Search here\">\n                </div>\n              </div>\n              <div class=\"col-lg-4 col-md-4 col-sm-6 col-6\"></div>\n              <div class=\"col-lg-2 col-md-2 col-sm-6 col-6\">\n                 <div class=\"form-group marginB0\">\n                    <label>Add State</label>\n                    <div class=\"add-new\">\n                        <a class=\"btn\" href=\"javascript://\" (click)=\"openStateModal(addStateModal, '', '', '', '', '1', -1)\">+ Add New</a>\n                    </div>\n                 </div>\n              </div>\n           </div>\n          </div>\n      </div>\n\n      <!-- list state -->\n      <div class=\"tabel-section padding40 paddingT0\">\n          <div class=\"table-responsive\">\n            <table class=\"table table-striped\">\n                <tr>\n                  <th style=\"width:80%; text-align:left;\">State</th>\n                  <th style=\"width:20%\">Action</th>\n                </tr>\n                <tr *ngFor=\"let state of parameter.states; let s = index\">\n                \n                  <td class=\"text-left\">\n                    {{state.name_en}}\n                  </td>\n                <td>\n                      <a href=\"javascript://\" (click)=\"openStateModal(addStateModal, state.country_id, state.id, state.name_en, state.name_es, state.status, s)\" title=\"Edit State\" class=\"icon-block edit-icon\"><img src=\"./../../../../assets/img/edit.png\" alt=\"img\"></a>\n                      <a *ngIf=\"state.status == 1\" (click)=\"blockUnblockState(state.country_id, state.name_en, state.name_es, 0, state.id, s)\" title=\"Block State\" class=\"icon-block block-icon\"><img src=\"./../../../../assets/img/unblock.png\" alt=\"img\"></a>\n                      <a *ngIf=\"state.status == 0\" (click)=\"blockUnblockState(state.country_id, state.name_en, state.name_es, 1, state.id, s)\" title=\"Unblock State\" class=\"icon-block block-icon unblock-bg\"><img src=\"./../../../../assets/img/block.png\" alt=\"img\"></a>\n                  </td>\n                </tr>\n\n                <div *ngIf=\"parameter.stateCount == 0\">\n                  <p class=\"show-error\">\n                    {{constant.errorMsg.NO_STATE_FOUND}}\n                  </p>\n                </div>\n            </table>\n          </div>\n      </div>\n      \n\n      <!-- add city -->\n      <div class=\"form-outer marginT15\">\n        <div class=\"inline-form-group\">\n          <div class=\"row\">\n            <div class=\"col-md-12\">\n              <label><strong>City</strong></label>\n              <hr>\n            </div>\n            <div class=\"col-lg-3 col-md-3 col-sm-6 col-6\">\n               <div class=\"form-group marginB0\">\n                  <label>Country</label>\n                  <select class=\"form-control\" (change)=\"getStates($event.target.value)\">\n                    <option *ngFor=\"let country of parameter.countries\" value=\"{{country.id}}\">{{country.name_en}}</option>\n                 </select>\n               </div>\n            </div>\n            <div class=\"col-lg-3 col-md-3 col-sm-6 col-6\">\n               <div class=\"form-group marginB0\">\n                  <label>State</label>\n                  <select class=\"form-control\" (change)=\"getCities($event.target.value)\">\n                    <option *ngFor=\"let state of parameter.states\" value=\"{{state.id}}\">{{state.name_en}}</option>\n                 </select>\n               </div>\n            </div>\n            <div class=\"col-lg-3 col-md-3 col-sm-6 col-6 table-search\">\n              <div class=\"form-group marginB0\">\n                <label>Search</label>\n                <input type=\"text\" (input)=\"getCountries($event.target.value)\" name=\"keyword\" placeholder=\"Search here\">\n              </div>\n            </div>\n            <div class=\"col-lg-1 col-md-1 col-sm-6 col-6\"></div>\n            <div class=\"col-lg-2 col-md-2 col-sm-6 col-6\">\n               <div class=\"form-group marginB0\">\n                  <label>Add City</label>\n                  <div class=\"add-new\">\n                      <a class=\"btn\" href=\"javascript://\" (click)=\"openCityModal(addCityModal, '', '', '', '', '', 1, -1)\">+ Add New</a>\n                  </div>\n               </div>\n            </div>\n         </div>\n        </div>\n    </div>\n\n    <!-- list city -->\n    <div class=\"tabel-section padding40 paddingT0\">\n        <div class=\"table-responsive\">\n          <table class=\"table table-striped\">\n              <tr>\n                \n                <th style=\"width:80%; text-align:left;\">City</th>\n                <th style=\"width:20%\">Action</th>\n              </tr>\n              <tr *ngFor=\"let city of parameter.cities; let ci=index\">\n              \n                <td class=\"text-left\">\n                  {{city.name_en}}\n                </td>\n              <td>\n                    <a href=\"javascript://\" (click)=\"openCityModal(addCityModal, city.country_id, city.state_id, city.id, city.name_en, city.name_es, city.status, ci)\" title=\"Edit City\" class=\"icon-block edit-icon\"><img src=\"./../../../../assets/img/edit.png\" alt=\"img\"></a>\n                    <a *ngIf=\"city.status == 1\" (click)=\"blockUnblockCity(city.state_id, city.name_en, city.name_es, 0, city.id, ci)\" title=\"Block City\" class=\"icon-block block-icon\"><img src=\"./../../../../assets/img/unblock.png\" alt=\"img\"></a>\n                    <a *ngIf=\"city.status == 0\" (click)=\"blockUnblockCity(city.state_id, city.name_en, city.name_es, 1, city.id, ci)\" title=\"Unblock City\" class=\"icon-block block-icon unblock-bg\"><img src=\"./../../../../assets/img/block.png\" alt=\"img\"></a>\n                </td>\n              </tr>\n\n              <div *ngIf=\"parameter.cityCount == 0\">\n                <p class=\"show-error\">\n                  {{constant.errorMsg.NO_CITY_FOUND}}\n                </p>\n              </div>\n          </table>\n        </div>\n    </div>\n    \n\n\n      <!-- add locality -->\n      <!-- <div class=\"form-outer marginT15\">\n        <div class=\"inline-form-group\">\n          <div class=\"row\">\n            <div class=\"col-md-12\">\n              <label><strong>Locality</strong></label>\n              <hr>\n            </div>\n            <div class=\"col-lg-3 col-md-3 col-sm-6 col-6\">\n               <div class=\"form-group marginB0\">\n                  <label>Country</label>\n                  <select class=\"form-control\" (change)=\"getStates($event.target.value)\">\n                    <option *ngFor=\"let country of parameter.countries\" value=\"{{country.id}}\">{{country.name_en}}</option>\n                 </select>\n               </div>\n            </div>\n            <div class=\"col-lg-3 col-md-3 col-sm-6 col-6\">\n               <div class=\"form-group marginB0\">\n                  <label>State</label>\n                  <select class=\"form-control\" (change)=\"getCities($event.target.value)\">\n                    <option *ngFor=\"let state of parameter.states\" value=\"{{state.id}}\">{{state.name_en}}</option>\n                 </select>\n               </div>\n            </div>\n            <div class=\"col-lg-2 col-md-3 col-sm-6 col-6\">\n               <div class=\"form-group marginB0\">\n                  <label>Add Locality</label>\n                  <div class=\"add-new\">\n                      <a class=\"btn\" href=\"javascript://\" routerLink=\"/dashboard/locality\">+ Add New</a>\n                  </div>\n               </div>\n            </div>\n         </div>\n        </div>\n    </div> -->\n\n    <!-- list locality -->\n    <!-- <div class=\"tabel-section padding40 paddingT0\">\n        <div class=\"table-responsive\">\n          <table class=\"table table-striped\">\n              <tr>\n                \n                <th style=\"width:80%; text-align:left;\">\n                    <div class=\"table-search\">\n                    <input type=\"Search here\" (input)=\"getLocalities(parameter.city_id, $event.target.value)\" name=\"\" placeholder=\"Search here\">\n                    </div>\n                </th>\n                <th style=\"width:20%\">Action</th>\n              </tr>\n              <tr *ngFor=\"let locality of parameter.localities\">\n              \n                <td class=\"text-left\">\n                  {{locality.name_en}}\n                </td>\n              <td>\n                    <a href=\"javascript://\" (click)=\"openCityModal(addCityModal, locality.country_id, locality.state_id, locality.id, locality.name_en, city.name_es)\" title=\"Edit City\" class=\"icon-block edit-icon\"><img src=\"./../../../../assets/img/edit.png\" alt=\"img\"></a>\n                    <a *ngIf=\"locality.status == 1\" (click)=\"blockUnblockCity(locality.state_id, locality.name_en, locality.name_es, 0, locality.id)\" title=\"Block City\" class=\"icon-block block-icon\"><img src=\"./../../../../assets/img/unblock.png\" alt=\"img\"></a>\n                    <a *ngIf=\"locality.status == 0\" (click)=\"blockUnblockCity(locality.state_id, locality.name_en, locality.name_es, 1, locality.id)\" title=\"Unblock City\" class=\"icon-block block-icon unblock-bg\"><img src=\"./../../../../assets/img/block.png\" alt=\"img\"></a>\n                </td>\n              </tr>\n\n              <div *ngIf=\"parameter.cityCount == 0\">\n                <p class=\"show-error\">\n                  {{constant.errorMsg.NO_CITY_FOUND}}\n                </p>\n              </div>\n          </table>\n        </div>\n    </div>\n     -->\n    </div>\n</div>\n<!--content end-->\n\n\n<!-- add country modal -->\n<ng-template #addCountryModal>\n  <div class=\"modal-content\">\n    <div class=\"modal-header my-modal-header\">\n      <h4 class=\"modal-title\">Add Country</h4>\n      <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <form class=\"form-horizontal my-modal-form\" role=\"form\" novalidate #addForm=\"ngForm\" (ngSubmit)=\"checkIfCountrySpanishNameEntered(addForm.value.name_en, addForm.value.name_es)\">\n      <div class=\"modal-body my-modal-body\">\n        <div class=\"form-group\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"Country (English)\" id=\"name_en\" required [(ngModel)]=\"location.countryModel.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n          <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-error\">\n              <div [hidden]=\"!name_en.errors.required\">\n                {{constant.errorMsg.COUNTRY_NAME_REQUIRED}}\n              </div>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <!-- <input type=\"text\" class=\"form-control\" placeholder=\"Country (Spanish)\" id=\"name_es\" required [(ngModel)]=\"location.countryModel.name_es\" name=\"name_es\" #name_es=\"ngModel\">\n          <div *ngIf=\"name_es.errors && (name_es.dirty || name_es.touched)\" class=\"show-error\">\n              <div [hidden]=\"!name_es.errors.required\">\n                {{constant.errorMsg.COUNTRY_NAME_REQUIRED}}\n              </div>\n          </div> -->\n          <input type=\"text\" class=\"form-control\" placeholder=\"Country (Spanish)\" [(ngModel)]=\"location.countryModel.name_es\" name=\"name_es\">\n        </div>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"submit\" [disabled]=\"addForm.invalid\" class=\"btn btn-info\">Submit</button>\n        <button type=\"button\" class=\"btn btn-default\" aria-label=\"Close\" (click)=\"modalRef.hide()\">Close</button>\n      </div>\n    </form>\n  </div>\n</ng-template>\n\n\n<!-- add state modal -->\n<ng-template #addStateModal>\n  <div class=\"modal-content\">\n    <div class=\"modal-header my-modal-header\">\n      <h4 class=\"modal-title\">Add State</h4>\n      <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <form class=\"form-horizontal my-modal-form\" role=\"form\" novalidate #addForm=\"ngForm\" (ngSubmit)=\"checkIfStateSpanishNameEntered(addForm.value.country_id, addForm.value.name_en, addForm.value.name_es)\">\n      <div class=\"modal-body my-modal-body\">\n        <div class=\"form-group\">\n          <select title=\"Select Country\" id=\"country_id\" required [(ngModel)]=\"location.stateModel.country_id\" name=\"country_id\" #country_id=\"ngModel\" class=\"form-control\" required>\n            <option value=\"\" disabled>Select Country</option>\n            <option *ngFor=\"let c of parameter.countries\" value=\"{{c.id}}\">{{c.name}}</option>\n          </select>\n          <div *ngIf=\"country_id.errors && (country_id.dirty || country_id.touched)\" class=\"show-error\">\n            <div [hidden]=\"!country_id.errors.required\">\n              {{constant.errorMsg.COUNTRY_NAME_REQUIRED}}\n            </div>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"State (English)\" id=\"name_en\" required [(ngModel)]=\"location.stateModel.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n          <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-error\">\n              <div [hidden]=\"!name_en.errors.required\">\n                {{constant.errorMsg.STATE_NAME_REQUIRED}}\n              </div>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <!-- <input type=\"text\" class=\"form-control\" placeholder=\"State (Spanish)\" id=\"name_es\" required [(ngModel)]=\"location.countryModel.name_es\" name=\"name_es\" #name_es=\"ngModel\">\n          <div *ngIf=\"name_es.errors && (name_es.dirty || name_es.touched)\" class=\"show-error\">\n              <div [hidden]=\"!name_es.errors.required\">\n                {{constant.errorMsg.STATE_NAME_REQUIRED}}\n              </div>\n          </div> -->\n          <input type=\"text\" class=\"form-control\" placeholder=\"State (Spanish)\" [(ngModel)]=\"location.stateModel.name_es\" name=\"name_es\">\n        </div>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"submit\" [disabled]=\"addForm.invalid\" class=\"btn btn-info\">Submit</button>\n        <button type=\"button\" class=\"btn btn-default\" aria-label=\"Close\" (click)=\"modalRef.hide()\">Close</button>\n      </div>\n    </form>\n  </div>\n</ng-template>\n\n\n<!-- add city modal -->\n<ng-template #addCityModal>\n  <div class=\"modal-content\">\n    <div class=\"modal-header my-modal-header\">\n      <h4 class=\"modal-title\">Add City</h4>\n      <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <form class=\"form-horizontal my-modal-form\" role=\"form\" novalidate #addForm=\"ngForm\" (ngSubmit)=\"checkIfCitySpanishNameEntered(addForm.value.state_id, addForm.value.name_en, addForm.value.name_es)\">\n      <div class=\"modal-body my-modal-body\">\n        <div class=\"form-group\" *ngIf=\"location.cityModel.city_id == ''\">\n          <select title=\"Select Country\" id=\"country_id\" (change)=\"getStates($event.target.value)\" required [(ngModel)]=\"location.cityModel.country_id\" name=\"country_id\" #country_id=\"ngModel\" class=\"form-control\" required>\n            <option value=\"\" disabled>Select Country</option>\n            <option *ngFor=\"let c of parameter.countries\" value=\"{{c.id}}\">{{c.name}}</option>\n          </select>\n          <div *ngIf=\"country_id.errors && (country_id.dirty || country_id.touched)\" class=\"show-error\">\n            <div [hidden]=\"!country_id.errors.required\">\n              {{constant.errorMsg.COUNTRY_NAME_REQUIRED}}\n            </div>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <select title=\"Select State\" id=\"state_id\" required [(ngModel)]=\"location.cityModel.state_id\" name=\"state_id\" #state_id=\"ngModel\" class=\"form-control\" required>\n            <option value=\"\" disabled>Select State</option>\n            <option *ngFor=\"let s of parameter.states\" value=\"{{s.id}}\">{{s.name}}</option>\n          </select>\n          <div *ngIf=\"state_id.errors && (state_id.dirty || state_id.touched)\" class=\"show-error\">\n            <div [hidden]=\"!state_id.errors.required\">\n              {{constant.errorMsg.STATE_NAME_REQUIRED}}\n            </div>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"City (English)\" id=\"name_en\" required [(ngModel)]=\"location.cityModel.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n          <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-error\">\n              <div [hidden]=\"!name_en.errors.required\">\n                {{constant.errorMsg.CITY_NAME_REQUIRED}}\n              </div>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <!-- <input type=\"text\" class=\"form-control\" placeholder=\"State (Spanish)\" id=\"name_es\" required [(ngModel)]=\"location.countryModel.name_es\" name=\"name_es\" #name_es=\"ngModel\">\n          <div *ngIf=\"name_es.errors && (name_es.dirty || name_es.touched)\" class=\"show-error\">\n              <div [hidden]=\"!name_es.errors.required\">\n                {{constant.errorMsg.CITY_NAME_REQUIRED}}\n              </div>\n          </div> -->\n          <input type=\"text\" class=\"form-control\" placeholder=\"City (Spanish)\" [(ngModel)]=\"location.cityModel.name_es\" name=\"name_es\">\n        </div>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"submit\" [disabled]=\"addForm.invalid\" class=\"btn btn-info\">Submit</button>\n        <button type=\"button\" class=\"btn btn-default\" aria-label=\"Close\" (click)=\"modalRef.hide()\">Close</button>\n      </div>\n    </form>\n  </div>\n</ng-template>\n\n\n<!-- add city modal -->\n<ng-template #addLocalityModal>\n  <div class=\"modal-content\">\n    <div class=\"modal-header my-modal-header\">\n      <h4 class=\"modal-title\">Add Locality</h4>\n      <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <form class=\"form-horizontal my-modal-form\" role=\"form\" novalidate #addForm=\"ngForm\" (ngSubmit)=\"checkIfCitySpanishNameEntered(addForm.value.state_id, addForm.value.name_en, addForm.value.name_es)\">\n      <div class=\"modal-body my-modal-body\">\n        <div class=\"form-group\" *ngIf=\"location.cityModel.city_id == ''\">\n          <select title=\"Select Country\" id=\"country_id\" (change)=\"getStates($event.target.value)\" required [(ngModel)]=\"location.cityModel.country_id\" name=\"country_id\" #country_id=\"ngModel\" class=\"form-control\" required>\n            <option value=\"\" disabled>Select Country</option>\n            <option *ngFor=\"let c of parameter.countries\" value=\"{{c.id}}\">{{c.name}}</option>\n          </select>\n          <div *ngIf=\"country_id.errors && (country_id.dirty || country_id.touched)\" class=\"show-error\">\n            <div [hidden]=\"!country_id.errors.required\">\n              {{constant.errorMsg.COUNTRY_NAME_REQUIRED}}\n            </div>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <select title=\"Select State\" id=\"state_id\" required [(ngModel)]=\"location.cityModel.state_id\" name=\"state_id\" #state_id=\"ngModel\" class=\"form-control\" required>\n            <option value=\"\" disabled>Select State</option>\n            <option *ngFor=\"let s of parameter.states\" value=\"{{s.id}}\">{{s.name}}</option>\n          </select>\n          <div *ngIf=\"state_id.errors && (state_id.dirty || state_id.touched)\" class=\"show-error\">\n            <div [hidden]=\"!state_id.errors.required\">\n              {{constant.errorMsg.STATE_NAME_REQUIRED}}\n            </div>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"City (English)\" id=\"name_en\" required [(ngModel)]=\"location.cityModel.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n          <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-error\">\n              <div [hidden]=\"!name_en.errors.required\">\n                {{constant.errorMsg.CITY_NAME_REQUIRED}}\n              </div>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <!-- <input type=\"text\" class=\"form-control\" placeholder=\"State (Spanish)\" id=\"name_es\" required [(ngModel)]=\"location.countryModel.name_es\" name=\"name_es\" #name_es=\"ngModel\">\n          <div *ngIf=\"name_es.errors && (name_es.dirty || name_es.touched)\" class=\"show-error\">\n              <div [hidden]=\"!name_es.errors.required\">\n                {{constant.errorMsg.CITY_NAME_REQUIRED}}\n              </div>\n          </div> -->\n          <input type=\"text\" class=\"form-control\" placeholder=\"City (Spanish)\" [(ngModel)]=\"location.cityModel.name_es\" name=\"name_es\">\n        </div>\n\n        <div style=\"height: 600px; width: 600px;\" #mapDiv></div>\n        \n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"submit\" [disabled]=\"addForm.invalid\" class=\"btn btn-info\">Submit</button>\n        <button type=\"button\" class=\"btn btn-default\" aria-label=\"Close\" (click)=\"modalRef.hide()\">Close</button>\n      </div>\n    </form>\n  </div>\n</ng-template>"

/***/ }),

/***/ "../../../../../src/app/layout/settings/location/location.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__ = __webpack_require__("../../../../ngx-sweetalert2/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_modal__ = __webpack_require__("../../../../ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_location_model__ = __webpack_require__("../../../../../src/app/models/location.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__common_agm_component__ = __webpack_require__("../../../../../src/app/common/agm.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__agm_core__ = __webpack_require__("../../../../@agm/core/index.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocationComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var LocationComponent = (function () {
    function LocationComponent(loader, location, constant, modalService, admin, router, swal) {
        this.loader = loader;
        this.location = location;
        this.constant = constant;
        this.modalService = modalService;
        this.admin = admin;
        this.router = router;
        this.swal = swal;
        this.parameter = {};
        this.parameter.countryCount = 0;
        this.parameter.stateCount = 0;
        this.parameter.cityCount = 0;
    }
    LocationComponent.prototype.ngOnInit = function () {
        this.getCountries('');
        this.agm = new __WEBPACK_IMPORTED_MODULE_7__common_agm_component__["a" /* AGMComponent */](this.loader);
        // this.agm.init(this.mapDiv);
        // this.getStates();
    };
    LocationComponent.prototype.openCountryModal = function (template, country_id, name_en, name_es, status, index) {
        this.parameter.index = index;
        this.location.countryModel.country_id = country_id;
        this.location.countryModel.name_en = name_en;
        this.location.countryModel.name_es = name_es;
        this.location.countryModel.status = status;
        this.modalRef = this.modalService.show(template);
    };
    LocationComponent.prototype.openStateModal = function (template, country_id, state_id, name_en, name_es, status, index) {
        this.parameter.index = index;
        this.location.stateModel.country_id = country_id;
        this.location.stateModel.state_id = state_id;
        this.location.stateModel.name_en = name_en;
        this.location.stateModel.name_es = name_es;
        this.location.stateModel.status = status;
        this.modalRef = this.modalService.show(template);
    };
    LocationComponent.prototype.openCityModal = function (template, country_id, state_id, city_id, name_en, name_es, status, index) {
        this.parameter.index = index;
        this.location.cityModel.country_id = country_id;
        this.location.cityModel.state_id = state_id;
        this.location.cityModel.city_id = city_id;
        this.location.cityModel.name_en = name_en;
        this.location.cityModel.name_es = name_es;
        this.location.cityModel.status = status;
        this.modalRef = this.modalService.show(template);
    };
    LocationComponent.prototype.openLocalityModal = function (template, city_id, locality_id, name_en, name_es, poly_coordinates, status, index) {
        this.parameter.index = index;
        this.agm.init(this.mapDiv);
        this.location.localityModel.city_id = city_id;
        this.location.localityModel.locality_id = locality_id;
        this.location.localityModel.name_en = name_en;
        this.location.localityModel.name_es = name_es;
        this.location.localityModel.status = status;
        this.location.localityModel.poly_coordinates = poly_coordinates;
        this.modalRef = this.modalService.show(template);
    };
    LocationComponent.prototype.openModal = function (template) {
        this.modalRef = this.modalService.show(template); // {3}
    };
    LocationComponent.prototype.getCountries = function (keyword) {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'getCountries';
        var input = new FormData();
        if (keyword) {
            input.append('keyword', keyword);
        }
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('countries', success);
            _this.parameter.loading = false;
            _this.parameter.countries = success.data;
            _this.parameter.countryCount = success.data.length;
            if (_this.parameter.countries.length !== 0) {
                _this.parameter.country_id = _this.parameter.countries[0].id;
                _this.getStates(_this.parameter.countries[0].id, '');
            }
        }, function (error) {
            _this.parameter.loading = false;
            if (error.statusCode === 401) {
                _this.router.navigate(['']);
            }
            else {
                _this.swal.warning({
                    title: 'Error',
                    text: error.message,
                });
            }
        });
    };
    LocationComponent.prototype.getStates = function (country_id, keyword) {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'country/getStates';
        this.parameter.country_id = country_id;
        var input = new FormData();
        input.append('country_id', country_id);
        if (keyword) {
            input.append('keyword', keyword);
        }
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('states', success);
            _this.parameter.loading = false;
            _this.parameter.states = success.data;
            _this.parameter.stateCount = success.data.length;
            if (_this.parameter.states.length !== 0) {
                _this.parameter.state_id = _this.parameter.states[0].id;
                _this.getCities(_this.parameter.states[0].id, '');
            }
        }, function (error) {
            _this.parameter.loading = false;
            if (error.statusCode === 401) {
                _this.router.navigate(['']);
            }
            else {
                _this.swal.warning({
                    title: 'Error',
                    text: error.message,
                });
            }
        });
    };
    LocationComponent.prototype.getStatesWRTCountry = function (country_id, keyword) {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'country/getStates';
        this.parameter.country_id = country_id;
        var input = new FormData();
        input.append('country_id', country_id);
        if (keyword) {
            input.append('keyword', keyword);
        }
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('states', success);
            _this.parameter.loading = false;
            _this.parameter.states = success.data;
            _this.parameter.stateCount = success.data.length;
            if (_this.parameter.states.length !== 0) {
                _this.parameter.state_id = _this.parameter.states[0].id;
                _this.getCities(_this.parameter.states[0].id, '');
            }
        }, function (error) {
            _this.parameter.loading = false;
            if (error.statusCode === 401) {
                _this.router.navigate(['']);
            }
            else {
                _this.swal.warning({
                    title: 'Error',
                    text: error.message,
                });
            }
        });
    };
    LocationComponent.prototype.getCities = function (state_id, keyword) {
        var _this = this;
        console.log('mm', state_id, keyword);
        this.parameter.loading = true;
        this.parameter.url = 'getCities';
        this.parameter.state_id = state_id;
        var input = new FormData();
        input.append('state_id', state_id);
        if (keyword) {
            input.append('keyword', keyword);
        }
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('cities', success);
            _this.parameter.loading = false;
            _this.parameter.cities = success.data;
            _this.parameter.cityCount = success.data.length;
            if (_this.parameter.cities.length !== 0) {
                _this.parameter.city_id = _this.parameter.cities[0].id;
                _this.getLocalities(_this.parameter.cities[0].id, '');
            }
        }, function (error) {
            _this.parameter.loading = false;
            if (error.statusCode === 401) {
                _this.router.navigate(['']);
            }
            else {
                _this.swal.warning({
                    title: 'Error',
                    text: error.message,
                });
            }
        });
    };
    LocationComponent.prototype.getLocalities = function (city_id, keyword) {
        var _this = this;
        console.log('mm', city_id, keyword);
        this.parameter.loading = true;
        this.parameter.url = 'getLocalities';
        this.parameter.city_id = city_id;
        var input = new FormData();
        input.append('city_id', city_id);
        if (keyword) {
            input.append('keyword', keyword);
        }
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('cities', success);
            _this.parameter.loading = false;
            _this.parameter.localities = success.data;
            _this.parameter.localityCount = success.data.length;
        }, function (error) {
            _this.parameter.loading = false;
            if (error.statusCode === 401) {
                _this.router.navigate(['']);
            }
            else {
                _this.swal.warning({
                    title: 'Error',
                    text: error.message,
                });
            }
        });
    };
    LocationComponent.prototype.checkIfCountrySpanishNameEntered = function (name_en, name_es) {
        if (name_es === void 0) { name_es = ''; }
        var self = this;
        if (name_es === '') {
            this.swal.confirm({
                text: this.constant.errorMsg.SAVE_ENGLISH_COUNTRY_NAME,
            }).then(function () {
                self.addCountry(name_en, name_en, self.location.countryModel.status, '');
            })
                .catch(function () {
                // console.log('Logout cancelled by user');
            });
        }
        else {
            self.addCountry(name_en, name_es, self.location.countryModel.status, '');
        }
    };
    LocationComponent.prototype.addCountry = function (name_en, name_es, status, country_id) {
        var _this = this;
        if (country_id === '') {
            this.modalRef.hide();
        } // hide only when open
        this.parameter.loading = true;
        this.parameter.url = 'addCountry';
        var input = new FormData();
        input.append('name_es', name_es);
        input.append('name_en', name_en);
        input.append('status', status);
        if (this.location.countryModel.country_id) {
            input.append('country_id', this.location.countryModel.country_id);
        }
        else if (country_id) {
            input.append('country_id', country_id);
        }
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('success', success);
            _this.swal.success({
                title: 'Success',
                text: _this.location.countryModel.country_id || country_id ?
                    _this.constant.successMsg.COUNTRY_UPDATED_SUCCESSFULLY :
                    _this.constant.successMsg.COUNTRY_ADDED_SUCCESSFULLY,
            });
            _this.parameter.loading = false;
            // this.getCountries('');
            if (_this.parameter.index === -1) {
                _this.parameter.countries.push(success.data);
            }
            else {
                _this.parameter.countries[_this.parameter.index] = success.data;
            }
        }, function (error) {
            _this.parameter.loading = false;
            if (error.statusCode === 401) {
                _this.router.navigate(['']);
            }
            else {
                _this.swal.warning({
                    title: 'Error',
                    text: error.message,
                });
            }
        });
    };
    LocationComponent.prototype.checkIfStateSpanishNameEntered = function (country_id, name_en, name_es) {
        if (name_es === void 0) { name_es = ''; }
        var self = this;
        if (name_es === '') {
            this.swal.confirm({
                text: this.constant.errorMsg.SAVE_ENGLISH_STATE_NAME,
            }).then(function () {
                self.addState(country_id, name_en, name_en, self.location.stateModel.status, '');
            })
                .catch(function () {
                // console.log('Logout cancelled by user');
            });
        }
        else {
            self.addState(country_id, name_en, name_es, self.location.stateModel.status, '');
        }
    };
    LocationComponent.prototype.addState = function (country_id, name_en, name_es, status, state_id) {
        var _this = this;
        if (state_id === '') {
            this.modalRef.hide();
        }
        this.parameter.loading = true;
        this.parameter.url = 'country/addState';
        var input = new FormData();
        input.append('name_es', name_es);
        input.append('name_en', name_en);
        input.append('status', status);
        if (this.location.stateModel.country_id) {
            input.append('country_id', this.location.stateModel.country_id); // edit
        }
        else {
            input.append('country_id', country_id); // add
        }
        if (this.location.stateModel.state_id) {
            input.append('state_id', this.location.stateModel.state_id);
        }
        else if (state_id) {
            input.append('state_id', state_id);
        }
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('success1', success);
            _this.swal.success({
                title: 'Success',
                text: _this.location.stateModel.state_id || state_id ?
                    _this.constant.successMsg.STATE_UPDATED_SUCCESSFULLY :
                    _this.constant.successMsg.STATE_ADDED_SUCCESSFULLY,
            });
            _this.parameter.loading = false;
            // this.getStates(this.location.stateModel.country_id ? this.location.stateModel.country_id : country_id, '');
            if (_this.parameter.index === -1) {
                _this.parameter.states.push(success.data);
            }
            else {
                _this.parameter.states[_this.parameter.index] = success.data;
            }
            // formdata.reset();
        }, function (error) {
            _this.parameter.loading = false;
            if (error.statusCode === 401) {
                _this.router.navigate(['']);
            }
            else {
                _this.swal.warning({
                    title: 'Error',
                    text: error.message,
                });
            }
        });
    };
    LocationComponent.prototype.checkIfCitySpanishNameEntered = function (state_id, name_en, name_es) {
        if (name_es === void 0) { name_es = ''; }
        var self = this;
        if (name_es === '') {
            this.swal.confirm({
                text: this.constant.errorMsg.SAVE_ENGLISH_CITY_NAME,
            }).then(function () {
                self.addCity(state_id, name_en, name_en, self.location.cityModel.status, '');
            })
                .catch(function () {
                // console.log('Logout cancelled by user');
            });
        }
        else {
            self.addCity(state_id, name_en, name_es, self.location.cityModel.status, '');
        }
    };
    LocationComponent.prototype.addCity = function (state_id, name_en, name_es, status, city_id) {
        var _this = this;
        this.modalRef.hide();
        this.parameter.loading = true;
        this.parameter.url = 'addCity';
        var input = new FormData();
        input.append('name_es', name_es);
        input.append('name_en', name_en);
        input.append('status', status);
        if (this.location.cityModel.state_id) {
            input.append('state_id', this.location.cityModel.state_id); // edit
        }
        else {
            input.append('state_id', state_id); // add
        }
        if (this.location.cityModel.city_id) {
            input.append('city_id', this.location.cityModel.city_id); // edit
        }
        else if (city_id) {
            input.append('city_id', city_id); // edit
        }
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('success2', success);
            _this.swal.success({
                title: 'Success',
                text: _this.location.cityModel.city_id || city_id ?
                    _this.constant.successMsg.CITY_UPDATED_SUCCESSFULLY : _this.constant.successMsg.CITY_ADDED_SUCCESSFULLY,
            });
            _this.parameter.loading = false;
            // this.getCities(this.location.cityModel.state_id, '');
            if (_this.parameter.index === -1) {
                _this.parameter.cities.push(success.data);
            }
            else {
                _this.parameter.cities[_this.parameter.index] = success.data;
            }
            // formdata.reset();
        }, function (error) {
            _this.parameter.loading = false;
            if (error.statusCode === 401) {
                _this.router.navigate(['']);
            }
            else {
                _this.swal.warning({
                    title: 'Error',
                    text: error.message,
                });
            }
        });
    };
    LocationComponent.prototype.blockUnblockCountry = function (country_id, name_en, name_es, type, index) {
        this.parameter.index = index;
        this.parameter.title = this.constant.title.ARE_YOU_SURE;
        switch (type) {
            case 0:
                this.parameter.text = this.constant.title.BLOCK_COUNTRY;
                this.parameter.successText = this.constant.successMsg.BLOCKED_SUCCESSFULLY;
                break;
            case 1:
                this.parameter.text = this.constant.title.UNBLOCK_COUNTRY;
                this.parameter.successText = this.constant.successMsg.UNBLOCKED_SUCCESSFULLY;
                break;
        }
        var self = this;
        this.swal.confirm({
            title: this.parameter.title,
            text: this.parameter.text,
        }).then(function () {
            self.addCountry(name_en, name_es, type, country_id);
        })
            .catch(function () {
            // console.log('Logout cancelled by user');
        });
    };
    LocationComponent.prototype.blockUnblockState = function (country_id, name_en, name_es, type, state_id, index) {
        this.parameter.index = index;
        this.parameter.title = this.constant.title.ARE_YOU_SURE;
        switch (type) {
            case 0:
                this.parameter.text = this.constant.title.BLOCK_STATE;
                this.parameter.successText = this.constant.successMsg.BLOCKED_SUCCESSFULLY;
                break;
            case 1:
                this.parameter.text = this.constant.title.UNBLOCK_STATE;
                this.parameter.successText = this.constant.successMsg.UNBLOCKED_SUCCESSFULLY;
                break;
        }
        var self = this;
        this.swal.confirm({
            title: this.parameter.title,
            text: this.parameter.text,
        }).then(function () {
            self.addState(country_id, name_en, name_es, type, state_id);
        })
            .catch(function () {
            // console.log('Logout cancelled by user');
        });
    };
    LocationComponent.prototype.blockUnblockCity = function (state_id, name_en, name_es, type, city_id, index) {
        this.parameter.index = index;
        this.parameter.title = this.constant.title.ARE_YOU_SURE;
        switch (type) {
            case 0:
                this.parameter.text = this.constant.title.BLOCK_CITY;
                this.parameter.successText = this.constant.successMsg.BLOCKED_SUCCESSFULLY;
                break;
            case 1:
                this.parameter.text = this.constant.title.UNBLOCK_CITY;
                this.parameter.successText = this.constant.successMsg.UNBLOCKED_SUCCESSFULLY;
                break;
        }
        var self = this;
        this.swal.confirm({
            title: this.parameter.title,
            text: this.parameter.text,
        }).then(function () {
            self.addCity(state_id, name_en, name_es, type, city_id);
        })
            .catch(function () {
            // console.log('Logout cancelled by user');
        });
    };
    return LocationComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('mapDiv'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object)
], LocationComponent.prototype, "mapDiv", void 0);
LocationComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-location',
        template: __webpack_require__("../../../../../src/app/layout/settings/location/location.component.html"),
        styles: [__webpack_require__("../../../../../src/app/layout/settings/location/location.component.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_5__models_location_model__["a" /* Location */], __WEBPACK_IMPORTED_MODULE_6__common_constants__["a" /* Constant */]]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_8__agm_core__["b" /* MapsAPILoader */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__agm_core__["b" /* MapsAPILoader */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__models_location_model__["a" /* Location */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__models_location_model__["a" /* Location */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_6__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__common_constants__["a" /* Constant */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_modal__["b" /* BsModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_modal__["b" /* BsModalService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__["a" /* SweetAlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__["a" /* SweetAlertService */]) === "function" && _h || Object])
], LocationComponent);

var _a, _b, _c, _d, _e, _f, _g, _h;
//# sourceMappingURL=location.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/settings/project/project.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".amenity-img{\n    text-align: center\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/settings/project/project.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container-fluid\">\n  <div class=\"breadcrumb-group\">\n      <h5>Settings</h5>\n      <nav class=\"breadcrumb\">\n          <a class=\"breadcrumb-item\" routerLink=\"/dashboard\">Home</a>\n        <a class=\"breadcrumb-item\">Settings</a>\n        <span class=\"breadcrumb-item active\">Project</span>\n      </nav>\n  </div>\n  <ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n  <div class=\"white-bg\">\n      <div class=\"page-title\">\n        <h3>Project</h3>\n      </div>\n\n      <div class=\"form-outer\">\n          <div class=\"inline-form-group\">\n             <div class=\"row\">\n                <div class=\"col-md-4\">\n                    <label><strong>Possession Status</strong></label>\n                </div>\n                <div class=\"col-md-8\">\n                   <form role=\"form\" novalidate #addPossessionForm=\"ngForm\" (ngSubmit)=\"checkIfPossessionSpanishNameEntered('', addPossessionForm.value.name_en, addPossessionForm.value.name_es, 1, 'add')\">\n                      <div class=\"row\">\n                        <div class=\"col-lg-6 col-md-6\">\n                          <input type=\"text\" class=\"form-control\" placeholder=\"Possession status (English)\" id=\"name_en\" required [(ngModel)]=\"project.possession.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n                          <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-error\">\n                            <div [hidden]=\"!name_en.errors.required\">\n                              {{constant.errorMsg.PROPERTY_CONFIG_REQUIRED}}\n                            </div>\n                          </div>      \n                        </div>\n                        <div class=\"col-lg-6 col-md-6\">\n                            <input type=\"text\" class=\"form-control\" placeholder=\"Possession status (Spanish)\" [(ngModel)]=\"project.possession.name_es\" name=\"name_es\">\n                        </div>\n                      </div>\n                    <button [disabled]=\"addPossessionForm.invalid\" type=\"submit\" class=\"add-btn btn\">\n                       <img src=\"./../../../../assets/img/add.png\" alt=\"img\">\n                     </button>\n                   </form>\n                </div>\n             </div>\n          </div>\n      </div>\n\n      <div class=\"tabel-section padding40 paddingT0\">\n          <div class=\"table-responsive\">\n            <table class=\"table table-striped\">\n                <tr>\n                  <th style=\"width:80%; text-align:left;\">Name</th>\n                  <th style=\"width:20%\">Action</th>\n                </tr>\n                <tr *ngFor=\"let item of parameter.items\">\n                  <td class=\"text-left\">\n                    {{item.name_en}}\n                  </td>\n                  <td>\n                    <a title=\"Edit Configuration\" (click)=\"openPossessionStatusModal(addPossessionStatusModal, item.id, item.name_en, item.name_es, item.status)\" class=\"icon-block edit-icon\"><img src=\"./../../../../assets/img/edit.png\" alt=\"img\"></a>\n                    <a *ngIf=\"item.status == 1\" (click)=\"addPossessionStatusPopup(item.id, item.name_en, item.name_es, 0, 'block')\" title=\"Block Configuration\" class=\"icon-block block-icon\"><img src=\"./../../../../assets/img/unblock.png\" alt=\"img\"></a>\n                    <a *ngIf=\"item.status == 0\" (click)=\"addPossessionStatusPopup(item.id, item.name_en, item.name_es, 1, 'unblock')\" title=\"Unblock Configuration\" class=\"icon-block block-icon unblock-bg\"><img src=\"./../../../../assets/img/block.png\" alt=\"img\"></a>\n                  </td>\n                </tr>\n\n                <div *ngIf=\"parameter.total == 0\">\n                  <p class=\"show-error\">\n                    {{constant.errorMsg.NO_POSSESSION_FOUND}}\n                  </p>\n                </div>\n            </table>\n          </div>\n      </div>\n\n\n      <div class=\"form-outer\">\n        <div class=\"inline-form-group\">\n           <div class=\"row\">\n              <div class=\"col-md-4\">\n                  <label><strong>Project Type</strong></label>\n              </div>\n              <div class=\"col-md-8\">\n                 <form role=\"form\" novalidate #addTypeForm=\"ngForm\" (ngSubmit)=\"checkIfTypeSpanishNameEntered('', addTypeForm.value.name_en, addTypeForm.value.name_es, 1, 'add')\">\n\n                  <div class=\"row\">\n                      <div class=\"col-md-6 col-lg-6\">\n                          <input type=\"text\" class=\"form-control\" placeholder=\"Project type name (English)\" id=\"name_en\" required [(ngModel)]=\"project.type.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n                          <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-error\">\n                            <div [hidden]=\"!name_en.errors.required\">\n                              {{constant.errorMsg.PROPERTY_TYPE_REQUIRED}}\n                            </div>\n                        </div>\n                      </div>\n                    \n                    <div class=\"col-lg-6 col-md-6\">\n                        <input type=\"text\" class=\"form-control\" placeholder=\"Project type name (Spanish)\" [(ngModel)]=\"project.type.name_es\" name=\"name_es\">\n                    </div>\n  \n                  </div>\n                  <button [disabled]=\"addTypeForm.invalid\" type=\"submit\" class=\"add-btn btn\">\n                     <img src=\"./../../../../assets/img/add.png\" alt=\"img\">\n                   </button>\n                 </form>\n              </div>\n           </div>\n        </div>\n    </div>\n\n    <div class=\"tabel-section padding40 paddingT0\">\n        <div class=\"table-responsive\">\n          <table class=\"table table-striped\">\n              <tr>\n                <th style=\"width:80%; text-align:left;\">Name</th>\n                <th style=\"width:20%\">Action</th>\n              </tr>\n              <tr *ngFor=\"let item of parameter.projectTypes\">\n                <td class=\"text-left\">\n                  {{item.name_en}}\n                </td>\n                <td>\n                  <a title=\"Edit Property Type\" (click)=\"openBuildingTypeModal(addBuildingTypeModal, item.id, item.name_en, item.name_es, item.status)\" class=\"icon-block edit-icon\"><img src=\"./../../../../assets/img/edit.png\" alt=\"img\"></a>\n                  <a *ngIf=\"item.status == 1\" (click)=\"addBuildingTypePopup(item.id, item.name_en, item.name_es, 0, 'block')\" title=\"Block Property Type\" class=\"icon-block block-icon\"><img src=\"./../../../../assets/img/unblock.png\" alt=\"img\"></a>\n                  <a *ngIf=\"item.status == 0\" (click)=\"addBuildingTypePopup(item.id, item.name_en, item.name_es, 1, 'unblock')\" title=\"Unblock Property Type\" class=\"icon-block block-icon unblock-bg\"><img src=\"./../../../../assets/img/block.png\" alt=\"img\"></a>\n                </td>\n              </tr>\n\n              <div *ngIf=\"parameter.projectTypesCount == 0\">\n                <p class=\"show-error\">\n                  {{constant.errorMsg.NO_PROJECT_TYPE_FOUND}}\n                </p>\n              </div>\n          </table>\n        </div>\n    </div>\n\n\n\n      <div class=\"form-outer\">\n        <div class=\"inline-form-group\">\n            <div class=\"row\">\n              <div class=\"col-md-4\">\n                  <label>Amenities</label>\n              </div>\n              <div class=\"col-md-8\">\n                 <form role=\"form\" novalidate #addAmenityForm=\"ngForm\" (ngSubmit)=\"checkIfAmenitySpanishNameEntered('', '', addAmenityForm.value.name_en, addAmenityForm.value.name_es, 1, 'add')\">\n                  <div class=\"browse-files\">\n                    <input accept=\"image/*\" (change)=\"changeListner($event)\" type=\"file\" class=\"image form-control\" placeholder=\"Amenity\" id=\"icon\" required [(ngModel)]=\"project.amenities.icon\" name=\"icon\" #icon=\"ngModel\">\n                    <div *ngIf=\"icon.errors && (icon.dirty || icon.touched)\" class=\"show-error\">\n                      <div [hidden]=\"!icon.errors.required\">\n                        {{constant.errorMsg.PROPERTY_TYPE_REQUIRED}}\n                      </div>\n                  </div>\n                    <span>Browse</span>\n                  </div>\n                  <!-- <input type=\"file\" class=\"form-control\" placeholder=\"Amenity\" id=\"icon\" required [(ngModel)]=\"property.amenities.icon\" name=\"icon\" #icon=\"ngModel\">\n                    <div *ngIf=\"icon.errors && (icon.dirty || icon.touched)\" class=\"show-error\">\n                      <div [hidden]=\"!icon.errors.required\">\n                        {{constant.errorMsg.PROPERTY_TYPE_REQUIRED}}\n                      </div>\n                  </div> -->\n                  \n                  <div class=\"row\">\n                    <div class=\"col-lg-6 col-md-6\">\n                        <input type=\"text\" class=\"form-control\" placeholder=\"Project amenity name (English)\" id=\"name_en\" required [(ngModel)]=\"project.amenities.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n                        <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-error\">\n                          <div [hidden]=\"!name_en.errors.required\">\n                            {{constant.errorMsg.PROPERTY_TYPE_REQUIRED}}\n                          </div>\n                      </div>    \n                    </div>\n                    <div class=\"col-lg-6 col-md-6\">\n                        <input type=\"text\" class=\"form-control\" placeholder=\"Project amenity name (Spanish)\" [(ngModel)]=\"project.amenities.name_es\" name=\"name_es\">\n                    </div>\n                  </div>\n                  <button [disabled]=\"addAmenityForm.invalid\" type=\"submit\" class=\"add-btn btn\">\n                     <img src=\"./../../../../assets/img/add.png\" alt=\"img\">\n                   </button>\n                 </form>\n              </div>\n              <!-- <div class=\"col-md-8\">\n                  <div class=\"browse-files\">\n                    <input type=\"file\" name=\"\">\n                    <span>Browse</span>\n                  </div>\n                  <input type=\"text\" name=\"\">\n                  <button class=\"add-btn\" (click)=\"openAmenitiesModal(addAmenitiesModal, '', '', '', '', 1)\">\n                    <img src=\"./../../../../assets/img/add.png\" alt=\"img\">\n                  </button>\n              </div> -->\n            </div>\n        </div>\n      </div>\n\n      <div class=\"tabel-section padding40\">\n        <div class=\"table-responsive\">\n            <table class=\"table table-striped\">\n              <tr>\n                  <th style=\"width:15%\">Image</th>\n                  <th style=\"width:65%; text-align:left;\">Amenity Name</th>\n                  <th style=\"width:20%\">Action</th>\n              </tr>\n              <tr *ngFor=\"let item of parameter.amenities\">\n                  <td>\n                    <!-- <i class=\"fa fa-building\"></i> -->\n                    <img alt=\"image\" height=\"30\" width=\"30\" src=\"{{item.icon}}\">\n                  </td>\n                  <td class=\"text-left\">\n                    {{item.name_en}}\n                  </td>\n                  <td>\n                    <a title=\"Edit Amenity\" (click)=\"openAmenityModal(addAmenityModal, item.id, item.icon, item.name_en, item.name_es, item.status)\" class=\"icon-block edit-icon\"><img src=\"./../../../../assets/img/edit.png\" alt=\"img\"></a>\n                    <a *ngIf=\"item.status == 1\" (click)=\"addAmenityPopup(item.id, item.icon, item.name_en, item.name_es, 0, 'block')\" title=\"Block Amenity\" class=\"icon-block block-icon\"><img src=\"./../../../../assets/img/unblock.png\" alt=\"img\"></a>\n                    <a *ngIf=\"item.status == 0\" (click)=\"addAmenityPopup(item.id, item.icon, item.name_en, item.name_es, 1, 'unblock')\" title=\"Unblock Amenity\" class=\"icon-block block-icon unblock-bg\"><img src=\"./../../../../assets/img/block.png\" alt=\"img\"></a>\n                  </td>\n              </tr>\n\n              <div *ngIf=\"parameter.amenitiesCount == 0\">\n                  <p class=\"show-error\">\n                    {{constant.errorMsg.NO_PROJECT_AMENITY_FOUND}}\n                  </p>\n                </div>\n            </table>\n        </div>\n      </div>\n      <!-- <div class=\"btn-cont text-right padding40 paddingT0\">\n        <button class=\"btn btn-primary\">Save</button>\n      </div> -->\n  </div>\n</div>\n\n\n<!-- add possession status modal -->\n<ng-template #addPossessionStatusModal>\n  <div class=\"modal-content\">\n    <div class=\"modal-header my-modal-header\">\n      <h4 class=\"modal-title\">Edit Property Configuration</h4>\n      <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <form class=\"form-horizontal my-modal-form\" role=\"form\" novalidate #addForm=\"ngForm\" (ngSubmit)=\"checkIfPossessionSpanishNameEntered(project.possession.id, addForm.value.name_en, addForm.value.name_es, project.possession.status, 'edit')\">\n      <div class=\"modal-body my-modal-body\">\n        <div class=\"form-group\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"Project possession status (English)\" id=\"name_en\" required [(ngModel)]=\"project.possession.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n          <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-error\">\n              <div [hidden]=\"!name_en.errors.required\">\n                {{constant.errorMsg.PROPERTY_TYPE_REQUIRED}}\n              </div>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"Project possession status (Spanish)\" [(ngModel)]=\"project.possession.name_es\" name=\"name_es\">\n        </div>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"submit\" [disabled]=\"addForm.invalid\" class=\"btn btn-info\">Submit</button>\n        <button type=\"button\" class=\"btn btn-default\" aria-label=\"Close\" (click)=\"modalRef.hide()\">Close</button>\n      </div>\n    </form>\n  </div>\n</ng-template>\n\n\n<!-- add PropertyTypeModal modal -->\n<ng-template #addBuildingTypeModal>\n  <div class=\"modal-content\">\n    <div class=\"modal-header my-modal-header\">\n      <h4 class=\"modal-title\">Edit Property Type</h4>\n      <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <form class=\"form-horizontal my-modal-form\" role=\"form\" novalidate #addForm=\"ngForm\" (ngSubmit)=\"checkIfTypeSpanishNameEntered(project.type.id, addForm.value.name_en, addForm.value.name_es, project.type.status, 'edit')\">\n      <div class=\"modal-body my-modal-body\">\n        <div class=\"form-group\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"Project type (English)\" id=\"name_en\" required [(ngModel)]=\"project.type.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n          <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-error\">\n              <div [hidden]=\"!name_en.errors.required\">\n                {{constant.errorMsg.PROPERTY_TYPE_REQUIRED}}\n              </div>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"Project type (Spanish)\" [(ngModel)]=\"project.type.name_es\" name=\"name_es\">\n        </div>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"submit\" [disabled]=\"addForm.invalid\" class=\"btn btn-info\">Submit</button>\n        <button type=\"button\" class=\"btn btn-default\" aria-label=\"Close\" (click)=\"modalRef.hide()\">Close</button>\n      </div>\n    </form>\n  </div>\n</ng-template>\n\n\n<!-- addAmenitiesModal -->\n<ng-template #addAmenityModal>\n    <div class=\"modal-content\">\n      <div class=\"modal-header my-modal-header\">\n        <h4 class=\"modal-title\">Edit Amenity</h4>\n        <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <form class=\"form-horizontal my-modal-form\" role=\"form\" novalidate #addForm=\"ngForm\" (ngSubmit)=\"checkIfAmenitySpanishNameEntered(project.amenities.id, '', addForm.value.name_en, addForm.value.name_es, project.amenities.status, 'edit')\">\n        <div class=\"modal-body my-modal-body\">\n          <div class=\"form-group amenity-img\">\n            <img [src]=\"project.amenities.icon\" class=\"image\" width=\"100\" height=\"100\">\n          </div>\n          <div class=\"form-group\">\n            <input accept=\"image/*\" (change)=\"changeListner($event)\" type=\"file\" class=\"form-control\">\n          </div>\n          \n          <div class=\"form-group\">\n            <input type=\"text\" class=\"form-control\" placeholder=\"Amenity (English)\" id=\"name_en\" required [(ngModel)]=\"project.amenities.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n            <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-error\">\n                <div [hidden]=\"!name_en.errors.required\">\n                  {{constant.errorMsg.PROPERTY_TYPE_REQUIRED}}\n                </div>\n            </div>\n          </div>\n          <div class=\"form-group\">\n            <input type=\"text\" class=\"form-control\" placeholder=\"Amenity (Spanish)\" [(ngModel)]=\"project.amenities.name_es\" name=\"name_es\">\n          </div>\n        </div>\n        <div class=\"modal-footer\">\n          <button type=\"submit\" [disabled]=\"addForm.invalid\" class=\"btn btn-info\">Submit</button>\n          <button type=\"button\" class=\"btn btn-default\" aria-label=\"Close\" (click)=\"modalRef.hide()\">Close</button>\n        </div>\n      </form>\n  </div>\n</ng-template>\n  "

/***/ }),

/***/ "../../../../../src/app/layout/settings/project/project.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__ = __webpack_require__("../../../../ngx-sweetalert2/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_modal__ = __webpack_require__("../../../../ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_project_model__ = __webpack_require__("../../../../../src/app/models/project.model.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ProjectComponent = (function () {
    function ProjectComponent(element, constant, project, modalService, admin, router, swal) {
        this.element = element;
        this.constant = constant;
        this.project = project;
        this.modalService = modalService;
        this.admin = admin;
        this.router = router;
        this.swal = swal;
        this.parameter = {};
        this.parameter.countryCount = 0;
        this.parameter.stateCount = 0;
        this.parameter.cityCount = 0;
    }
    ProjectComponent.prototype.ngOnInit = function () {
        this.getPossessionStatuses();
        this.getBuildingTypes();
        this.getAmenities();
    };
    ProjectComponent.prototype.openPossessionStatusModal = function (template, id, name_en, name_es, status) {
        this.project.possession.id = id;
        this.project.possession.name_en = name_en;
        this.project.possession.name_es = name_es == null ? name_en : name_es;
        this.project.possession.status = status;
        this.modalRef = this.modalService.show(template);
    };
    ProjectComponent.prototype.openBuildingTypeModal = function (template, id, name_en, name_es, status) {
        this.project.type.id = id;
        this.project.type.name_en = name_en;
        this.project.type.name_es = name_es;
        this.project.type.status = status;
        this.modalRef = this.modalService.show(template);
    };
    ProjectComponent.prototype.openAmenityModal = function (template, id, icon, name_en, name_es, status) {
        console.log('00', template, id, icon, name_en, name_es, status);
        this.project.amenities.id = id;
        this.project.amenities.icon = icon;
        this.project.amenities.name_en = name_en;
        this.project.amenities.name_es = name_es;
        this.project.amenities.status = status;
        this.modalRef = this.modalService.show(template);
    };
    ProjectComponent.prototype.addPossessionStatus = function (id, name_en, name_es, status, type) {
        var _this = this;
        if (type !== 'add') {
            this.modalRef.hide();
        }
        this.parameter.loading = true;
        this.parameter.url = 'addPossessionStatus';
        var input = new FormData();
        input.append('name_en', name_en);
        input.append('name_es', name_es);
        input.append('status', status);
        if (id) {
            input.append('id', id);
        }
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('addPossessionStatus', success);
            _this.parameter.loading = false;
            _this.swal.success({
                title: 'Success',
                text: id ?
                    _this.constant.successMsg.PROJECT_POSSESSION_UPDATED_SUCCESSFULLY :
                    _this.constant.successMsg.PROJECT_POSSESSION_ADDED_SUCCESSFULLY,
            });
            _this.getPossessionStatuses();
        }, function (error) {
            _this.parameter.loading = false;
            _this.swal.warning({
                title: 'Error',
                text: error.message,
            });
            _this.router.navigate(['']);
        });
    };
    ProjectComponent.prototype.addBuildingType = function (id, name_en, name_es, status, type) {
        var _this = this;
        if (type !== 'add') {
            this.modalRef.hide();
        }
        this.parameter.loading = true;
        this.parameter.url = 'addBuildingType';
        var input = new FormData();
        input.append('name_en', name_en);
        input.append('name_es', name_es);
        input.append('status', status);
        if (id) {
            input.append('id', id);
        }
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('addBuildingType', success);
            _this.parameter.loading = false;
            _this.swal.success({
                title: 'Success',
                text: id ?
                    _this.constant.successMsg.PROJECT_TYPE_UPDATED_SUCCESSFULLY :
                    _this.constant.successMsg.PROJECT_TYPE_ADDED_SUCCESSFULLY,
            });
            _this.getBuildingTypes();
        }, function (error) {
            _this.parameter.loading = false;
            _this.swal.warning({
                title: 'Error',
                text: error.message,
            });
            _this.router.navigate(['']);
        });
    };
    ProjectComponent.prototype.addAmenity = function (id, icon, name_en, name_es, status, type) {
        var _this = this;
        console.log('icon', id, icon, name_en, name_es, status, type);
        if (type !== 'add') {
            this.modalRef.hide();
        }
        var iconNew = this.icon ? this.icon : this.project.amenities.icon;
        console.log('mm', iconNew);
        this.parameter.loading = true;
        this.parameter.url = 'addAmenity';
        var input = new FormData();
        input.append('name_en', name_en);
        input.append('name_es', name_es);
        input.append('status', status);
        if (this.icon) {
            input.append('icon', iconNew);
        }
        if (id) {
            input.append('id', id);
        }
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('addAmenity', success);
            _this.parameter.loading = false;
            _this.swal.success({
                title: 'Success',
                text: id ? _this.constant.successMsg.AMENITY_UPDATED_SUCCESSFULLY : _this.constant.successMsg.AMENITY_ADDED_SUCCESSFULLY,
            });
            _this.getAmenities();
        }, function (error) {
            _this.parameter.loading = false;
            _this.swal.warning({
                title: 'Error',
                text: error.message,
            });
            _this.router.navigate(['']);
        });
    };
    ProjectComponent.prototype.getPossessionStatuses = function () {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'getPossessionStatuses';
        var input = new FormData();
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('getPossessionStatuses', success);
            _this.parameter.loading = false;
            _this.parameter.items = success.data;
            _this.parameter.total = success.data.length;
        }, function (error) {
            console.log(error);
            _this.parameter.loading = false;
            if (error.statusCode === 401) {
                _this.router.navigate(['']);
            }
            else {
                _this.swal.warning({
                    // title: 'Internet Connection',
                    text: error.messages,
                });
            }
        });
    };
    ProjectComponent.prototype.getBuildingTypes = function () {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'getBuildingTypes';
        var input = new FormData();
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('getBuildingTypes', success);
            _this.parameter.loading = false;
            _this.parameter.projectTypes = success.data;
            _this.parameter.projectTypesCount = success.data.length;
        }, function (error) {
            console.log(error);
            _this.parameter.loading = false;
            if (error.statusCode === 401) {
                _this.router.navigate(['']);
            }
            else {
                _this.swal.warning({
                    // title: 'Internet Connection',
                    text: error.messages,
                });
            }
        });
    };
    ProjectComponent.prototype.getAmenities = function () {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'getAmenities';
        var input = new FormData();
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('getAmenities', success);
            _this.parameter.loading = false;
            _this.parameter.amenities = success.data;
            _this.parameter.amenitiesCount = success.data.length;
        }, function (error) {
            console.log(error);
            _this.parameter.loading = false;
            if (error.statusCode === 401) {
                _this.router.navigate(['']);
            }
            else {
                _this.swal.warning({
                    // title: 'Internet Connection',
                    text: error.messages,
                });
            }
        });
    };
    ProjectComponent.prototype.addPossessionStatusPopup = function (id, name_en, name_es, status, type) {
        var self = this;
        this.swal.confirm({
            title: this.constant.title.ARE_YOU_SURE,
            text: status === 1 ? this.constant.title.UNBLOCK_PROJECT_POSSESSION : this.constant.title.BLOCK_PROJECT_POSSESSION,
        }).then(function () {
            self.addPossessionStatus(id, name_en, name_es, status, type);
        })
            .catch(function () {
            // console.log('Logout cancelled by user');
        });
    };
    ProjectComponent.prototype.addBuildingTypePopup = function (id, name_en, name_es, status, type) {
        console.log(id, name_en, name_es, status, type);
        var self = this;
        this.swal.confirm({
            title: this.constant.title.ARE_YOU_SURE,
            text: status === 1 ? this.constant.title.UNBLOCK_PROJECT_TYPE : this.constant.title.BLOCK_PROJECT_TYPE,
        }).then(function () {
            self.addBuildingType(id, name_en, name_es, status, type);
        })
            .catch(function () {
            // console.log('Logout cancelled by user');
        });
    };
    ProjectComponent.prototype.addAmenityPopup = function (id, icon, name_en, name_es, status, type) {
        var self = this;
        this.swal.confirm({
            title: this.constant.title.ARE_YOU_SURE,
            text: status === 1 ? this.constant.title.UNBLOCK_AMENITY : this.constant.title.BLOCK_AMENITY,
        }).then(function () {
            self.addAmenity(id, icon, name_en, name_es, status, type);
        })
            .catch(function () {
            // console.log('Logout cancelled by user');
        });
    };
    ProjectComponent.prototype.checkIfPossessionSpanishNameEntered = function (id, name_en, name_es, status, type) {
        var self = this;
        if (name_es === '') {
            this.swal.confirm({
                text: this.constant.errorMsg.SAVE_ENGLISH_PROJECT_POSSESION,
            }).then(function () {
                self.addPossessionStatus(id, name_en, name_en, status, type);
            })
                .catch(function () {
                // console.log('Logout cancelled by user');
            });
        }
        else {
            self.addPossessionStatus(id, name_en, name_es, status, type);
        }
    };
    ProjectComponent.prototype.checkIfTypeSpanishNameEntered = function (id, name_en, name_es, status, type) {
        var self = this;
        if (name_es === '') {
            this.swal.confirm({
                text: this.constant.errorMsg.SAVE_ENGLISH_PROJECT_TYPE,
            }).then(function () {
                self.addBuildingType(id, name_en, name_en, status, type);
            })
                .catch(function () {
                // console.log('Logout cancelled by user');
            });
        }
        else {
            self.addBuildingType(id, name_en, name_es, status, type);
        }
    };
    ProjectComponent.prototype.checkIfAmenitySpanishNameEntered = function (id, icon, name_en, name_es, status, type) {
        console.log('00', id, icon, name_en, name_es, status, type);
        var self = this;
        if (name_es === '') {
            this.swal.confirm({
                text: this.constant.errorMsg.SAVE_ENGLISH_AMENITY,
            }).then(function () {
                self.addAmenity(id, icon, name_en, name_en, status, type);
            })
                .catch(function () {
                // console.log('Logout cancelled by user');
            });
        }
        else {
            self.addAmenity(id, icon, name_en, name_es, status, type);
        }
    };
    ProjectComponent.prototype.changeListner = function (event) {
        var reader = new FileReader();
        var image = this.element.nativeElement.querySelector('.image');
        var fileToUpload = event.target.files[0];
        this.icon = fileToUpload;
        reader.onload = function (e) {
            console.log(image);
            var src = e.target['result'];
            image.src = src;
            console.log(image.src);
        };
        reader.readAsDataURL(event.target.files[0]);
    };
    return ProjectComponent;
}());
ProjectComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-project',
        template: __webpack_require__("../../../../../src/app/layout/settings/project/project.component.html"),
        styles: [__webpack_require__("../../../../../src/app/layout/settings/project/project.component.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_5__common_constants__["a" /* Constant */], __WEBPACK_IMPORTED_MODULE_6__models_project_model__["a" /* Project */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__common_constants__["a" /* Constant */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6__models_project_model__["a" /* Project */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__models_project_model__["a" /* Project */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_modal__["b" /* BsModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_modal__["b" /* BsModalService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__["a" /* SweetAlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__["a" /* SweetAlertService */]) === "function" && _g || Object])
], ProjectComponent);

var _a, _b, _c, _d, _e, _f, _g;
//# sourceMappingURL=project.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/settings/property/property.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".amenity-img{\n    text-align: center\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/settings/property/property.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container-fluid\">\n  <div class=\"breadcrumb-group\">\n      <h5>Settings</h5>\n      <nav class=\"breadcrumb\">\n          <a class=\"breadcrumb-item\" routerLink=\"/dashboard\">Home</a>\n        <a class=\"breadcrumb-item\">Settings</a>\n        <span class=\"breadcrumb-item active\">Property</span>\n      </nav>\n  </div>\n  <ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n  <div class=\"white-bg\">\n      <div class=\"page-title\">\n        <h3>Property</h3>\n      </div>\n\n\n      <div class=\"form-outer\">\n          <div class=\"inline-form-group\">\n             <div class=\"row\">\n                <div class=\"col-md-4\">\n                    <label><strong>Property Configuration</strong></label>\n                </div>\n                <div class=\"col-md-8\">\n                   <form role=\"form\" novalidate #addConfigForm=\"ngForm\" (ngSubmit)=\"checkIfConfigSpanishNameEntered('', addConfigForm.value.name_en, addConfigForm.value.name_es, 1, 'add')\">\n                    <div class=\"row\">\n                        <div class=\"col-lg-6 col-md-6\">\n                            <input type=\"text\" class=\"form-control\" placeholder=\"Configuration name (English)\" id=\"name_en\" required [(ngModel)]=\"property.configuration.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n                            <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-error\">\n                              <div [hidden]=\"!name_en.errors.required\">\n                                {{constant.errorMsg.PROPERTY_CONFIG_REQUIRED}}\n                              </div>\n                          </div>      \n                        </div>\n                        <div class=\"col-lg-6 col-md-6\">\n                            <input type=\"text\" class=\"form-control\" placeholder=\"Configuration name (Spanish)\" [(ngModel)]=\"property.configuration.name_es\" name=\"name_es\">\n                        </div>\n                      </div>\n                    <button [disabled]=\"addConfigForm.invalid\" type=\"submit\" class=\"add-btn btn\">\n                       <img src=\"./../../../../assets/img/add.png\" alt=\"img\">\n                     </button>\n                   </form>\n                </div>\n             </div>\n          </div>\n      </div>\n\n      <div class=\"tabel-section padding40 paddingT0\">\n          <div class=\"table-responsive\">\n            <table class=\"table table-striped\">\n                <tr>\n                  <th style=\"width:80%; text-align:left;\">Name</th>\n                  <th style=\"width:20%\">Action</th>\n                </tr>\n                <tr *ngFor=\"let item of parameter.items\">\n                  <td class=\"text-left\">\n                    {{item.name_en}}\n                  </td>\n                  <td>\n                    <a title=\"Edit Configuration\" (click)=\"openPropertyConfigModal(addPropertyConfigModal, item.id, item.name_en, item.name_es, item.status)\" class=\"icon-block edit-icon\"><img src=\"./../../../../assets/img/edit.png\" alt=\"img\"></a>\n                    <a *ngIf=\"item.status == 1\" (click)=\"addPropertyConfigurationPopup(item.id, item.name_en, item.name_es, 0, 'block')\" title=\"Block Configuration\" class=\"icon-block block-icon\"><img src=\"./../../../../assets/img/unblock.png\" alt=\"img\"></a>\n                    <a *ngIf=\"item.status == 0\" (click)=\"addPropertyConfigurationPopup(item.id, item.name_en, item.name_es, 1, 'unblock')\" title=\"Unblock Configuration\" class=\"icon-block block-icon unblock-bg\"><img src=\"./../../../../assets/img/block.png\" alt=\"img\"></a>\n                  </td>\n                </tr>\n\n                <div *ngIf=\"parameter.total == 0\">\n                  <p class=\"show-error\">\n                    {{constant.errorMsg.NO_CONFIGURATION_FOUND}}\n                  </p>\n                </div>\n            </table>\n          </div>\n      </div>\n\n\n      <div class=\"form-outer\">\n        <div class=\"inline-form-group\">\n           <div class=\"row\">\n              <div class=\"col-md-4\">\n                  <label><strong>Property Type</strong></label>\n              </div>\n              <div class=\"col-md-8\">\n                 <form role=\"form\" novalidate #addTypeForm=\"ngForm\" (ngSubmit)=\"checkIfTypeSpanishNameEntered('', addTypeForm.value.name_en, addTypeForm.value.name_es, 1, 'add')\">\n                  <div class=\"row\">\n                    <div class=\"col-lg-6 col-md-6\">\n                        <input type=\"text\" class=\"form-control\" placeholder=\"Property type name (English)\" id=\"name_en\" required [(ngModel)]=\"property.type.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n                        <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-error\">\n                          <div [hidden]=\"!name_en.errors.required\">\n                            {{constant.errorMsg.PROPERTY_TYPE_REQUIRED}}\n                          </div>\n                      </div>    \n                    </div>\n                    <div class=\"col-lg-6 col-md-6\">\n                      <input type=\"text\" class=\"form-control\" placeholder=\"Property type name (Spanish)\" [(ngModel)]=\"property.type.name_es\" name=\"name_es\">\n                    </div>\n                  </div>\n                  <button [disabled]=\"addTypeForm.invalid\" type=\"submit\" class=\"add-btn btn\">\n                     <img src=\"./../../../../assets/img/add.png\" alt=\"img\">\n                   </button>\n                 </form>\n              </div>\n           </div>\n        </div>\n    </div>\n\n    <div class=\"tabel-section padding40 paddingT0\">\n        <div class=\"table-responsive\">\n          <table class=\"table table-striped\">\n              <tr>\n                <th style=\"width:80%; text-align:left;\">Name</th>\n                <th style=\"width:20%\">Action</th>\n              </tr>\n              <tr *ngFor=\"let item of parameter.propertyTypes\">\n                <td class=\"text-left\">\n                  {{item.name_en}}\n                </td>\n                <td>\n                  <a title=\"Edit Property Type\" (click)=\"openPropertyTypeModal(addPropertyTypeModal, item.id, item.name_en, item.name_es, item.status)\" class=\"icon-block edit-icon\"><img src=\"./../../../../assets/img/edit.png\" alt=\"img\"></a>\n                  <a *ngIf=\"item.status == 1\" (click)=\"addPropertyTypePopup(item.id, item.name_en, item.name_es, 0, 'block')\" title=\"Block Property Type\" class=\"icon-block block-icon\"><img src=\"./../../../../assets/img/unblock.png\" alt=\"img\"></a>\n                  <a *ngIf=\"item.status == 0\" (click)=\"addPropertyTypePopup(item.id, item.name_en, item.name_es, 1, 'unblock')\" title=\"Unblock Property Type\" class=\"icon-block block-icon unblock-bg\"><img src=\"./../../../../assets/img/block.png\" alt=\"img\"></a>\n                </td>\n              </tr>\n\n              <div *ngIf=\"parameter.total == 0\">\n                <p class=\"show-error\">\n                  {{constant.errorMsg.NO_PROPERTY_TYPE_FOUND}}\n                </p>\n              </div>\n          </table>\n        </div>\n    </div>\n\n\n      <div class=\"form-outer\">\n        <div class=\"inline-form-group\">\n            <div class=\"row\">\n              <div class=\"col-md-4\">\n                  <label>Amenities</label>\n              </div>\n              <div class=\"col-md-8\">\n                 <form role=\"form\" novalidate #addAmenityForm=\"ngForm\" (ngSubmit)=\"checkIfAmenitySpanishNameEntered('', '', addAmenityForm.value.name_en, addAmenityForm.value.name_es, 1, 'add')\">\n                  <div class=\"browse-files\">\n                    <input accept=\"image/*\" (change)=\"changeListner($event)\" type=\"file\" class=\"image form-control\" placeholder=\"Amenity\" id=\"icon\" required [(ngModel)]=\"property.amenities.icon\" name=\"icon\" #icon=\"ngModel\">\n                    <div *ngIf=\"icon.errors && (icon.dirty || icon.touched)\" class=\"show-error\">\n                      <div [hidden]=\"!icon.errors.required\">\n                        {{constant.errorMsg.FILE_REQUIRED}}\n                      </div>\n                  </div>\n                    <!-- <span>Browse</span> -->\n                  </div>\n                  <!-- <input type=\"file\" class=\"form-control\" placeholder=\"Amenity\" id=\"icon\" required [(ngModel)]=\"property.amenities.icon\" name=\"icon\" #icon=\"ngModel\">\n                    <div *ngIf=\"icon.errors && (icon.dirty || icon.touched)\" class=\"show-error\">\n                      <div [hidden]=\"!icon.errors.required\">\n                        {{constant.errorMsg.PROPERTY_TYPE_REQUIRED}}\n                      </div>\n                  </div> -->\n                  \n                  <div class=\"row\">\n                    <div class=\"col-lg-6 col-md-6\">\n                        <input type=\"text\" class=\"form-control\" placeholder=\"Amenity name (English)\" id=\"name_en\" required [(ngModel)]=\"property.amenities.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n                        <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-error\">\n                          <div [hidden]=\"!name_en.errors.required\">\n                            {{constant.errorMsg.PROPERTY_TYPE_REQUIRED}}\n                          </div>\n                      </div>    \n                    </div>\n                    <div class=\"col-lg-6 col-md-6\">\n                        <input type=\"text\" class=\"form-control\" placeholder=\"Amenity name (Spanish)\" [(ngModel)]=\"property.amenities.name_es\" name=\"name_es\">\n                    </div>\n                  </div>\n                  <button [disabled]=\"addAmenityForm.invalid\" type=\"submit\" class=\"add-btn btn\">\n                     <img src=\"./../../../../assets/img/add.png\" alt=\"img\">\n                   </button>\n                 </form>\n              </div>\n              <!-- <div class=\"col-md-8\">\n                  <div class=\"browse-files\">\n                    <input type=\"file\" name=\"\">\n                    <span>Browse</span>\n                  </div>\n                  <input type=\"text\" name=\"\">\n                  <button class=\"add-btn\" (click)=\"openAmenitiesModal(addAmenitiesModal, '', '', '', '', 1)\">\n                    <img src=\"./../../../../assets/img/add.png\" alt=\"img\">\n                  </button>\n              </div> -->\n            </div>\n        </div>\n      </div>\n\n      <div class=\"tabel-section padding40\">\n        <div class=\"table-responsive\">\n            <table class=\"table table-striped\">\n              <tr>\n                  <th style=\"width:15%\">Image</th>\n                  <th style=\"width:65%; text-align:left;\">Amenity Name</th>\n                  <th style=\"width:20%\">Action</th>\n              </tr>\n              <tr *ngFor=\"let item of parameter.amenities\">\n                  <td>\n                    <!-- <i class=\"fa fa-building\"></i> -->\n                    <img alt=\"image\" height=\"30\" width=\"30\" src=\"{{item.icon}}\">\n                  </td>\n                  <td class=\"text-left\">\n                    {{item.name_en}}\n                  </td>\n                  <td>\n                    <a title=\"Edit Amenity\" (click)=\"openAmenityModal(addAmenityModal, item.id, item.icon, item.name_en, item.name_es, item.status)\" class=\"icon-block edit-icon\"><img src=\"./../../../../assets/img/edit.png\" alt=\"img\"></a>\n                    <a *ngIf=\"item.status == 1\" (click)=\"addAmenityPopup(item.id, item.icon, item.name_en, item.name_es, 0, 'block')\" title=\"Block Amenity\" class=\"icon-block block-icon\"><img src=\"./../../../../assets/img/unblock.png\" alt=\"img\"></a>\n                    <a *ngIf=\"item.status == 0\" (click)=\"addAmenityPopup(item.id, item.icon, item.name_en, item.name_es, 1, 'unblock')\" title=\"Unblock Amenity\" class=\"icon-block block-icon unblock-bg\"><img src=\"./../../../../assets/img/block.png\" alt=\"img\"></a>\n                  </td>\n              </tr>\n            </table>\n        </div>\n      </div>\n      <!-- <div class=\"btn-cont text-right padding40 paddingT0\">\n        <button class=\"btn btn-primary\">Save</button>\n      </div> -->\n  </div>\n</div>\n\n\n<!-- add configuration modal -->\n<ng-template #addPropertyConfigModal>\n  <div class=\"modal-content\">\n    <div class=\"modal-header my-modal-header\">\n      <h4 class=\"modal-title\">Edit Property Configuration</h4>\n      <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <form class=\"form-horizontal my-modal-form\" role=\"form\" novalidate #addForm=\"ngForm\" (ngSubmit)=\"checkIfConfigSpanishNameEntered(property.configuration.id, addForm.value.name_en, addForm.value.name_es, property.configuration.status, 'edit')\">\n      <div class=\"modal-body my-modal-body\">\n        <div class=\"form-group\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"Property Configuration (English)\" id=\"name_en\" required [(ngModel)]=\"property.configuration.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n          <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-error\">\n              <div [hidden]=\"!name_en.errors.required\">\n                {{constant.errorMsg.PROPERTY_TYPE_REQUIRED}}\n              </div>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"Property Configuration (Spanish)\" [(ngModel)]=\"property.configuration.name_es\" name=\"name_es\">\n        </div>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"submit\" [disabled]=\"addForm.invalid\" class=\"btn btn-info\">Submit</button>\n        <button type=\"button\" class=\"btn btn-default\" aria-label=\"Close\" (click)=\"modalRef.hide()\">Close</button>\n      </div>\n    </form>\n  </div>\n</ng-template>\n\n\n<!-- add PropertyTypeModal modal -->\n<ng-template #addPropertyTypeModal>\n  <div class=\"modal-content\">\n    <div class=\"modal-header my-modal-header\">\n      <h4 class=\"modal-title\">Edit Property Type</h4>\n      <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <form class=\"form-horizontal my-modal-form\" role=\"form\" novalidate #addForm=\"ngForm\" (ngSubmit)=\"checkIfTypeSpanishNameEntered(property.type.id, addForm.value.name_en, addForm.value.name_es, property.type.status, 'edit')\">\n      <div class=\"modal-body my-modal-body\">\n        <div class=\"form-group\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"Property type (English)\" id=\"name_en\" required [(ngModel)]=\"property.type.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n          <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-error\">\n              <div [hidden]=\"!name_en.errors.required\">\n                {{constant.errorMsg.PROPERTY_TYPE_REQUIRED}}\n              </div>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"Property type (Spanish)\" [(ngModel)]=\"property.type.name_es\" name=\"name_es\">\n        </div>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"submit\" [disabled]=\"addForm.invalid\" class=\"btn btn-info\">Submit</button>\n        <button type=\"button\" class=\"btn btn-default\" aria-label=\"Close\" (click)=\"modalRef.hide()\">Close</button>\n      </div>\n    </form>\n  </div>\n</ng-template>\n\n\n<!-- addAmenitiesModal -->\n<ng-template #addAmenityModal>\n    <div class=\"modal-content\">\n      <div class=\"modal-header my-modal-header\">\n        <h4 class=\"modal-title\">Edit Amenity</h4>\n        <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <form class=\"form-horizontal my-modal-form\" role=\"form\" novalidate #addForm=\"ngForm\" (ngSubmit)=\"checkIfAmenitySpanishNameEntered(property.amenities.id, '', addForm.value.name_en, addForm.value.name_es, property.amenities.status, 'edit')\">\n        <div class=\"modal-body my-modal-body\">\n          <div class=\"form-group amenity-img\">\n            <img src=\"{{property.amenities.icon}}\" width=\"100\" height=\"100\" class=\"image1\">\n          </div>\n          <div class=\"form-group\">\n            <input accept=\"image/*\" (change)=\"changeListner1($event)\" type=\"file\" class=\"form-control\">\n          </div>\n          <div class=\"form-group\">\n            <input type=\"text\" class=\"form-control\" placeholder=\"Amenity (English)\" id=\"name_en\" required [(ngModel)]=\"property.amenities.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n            <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-error\">\n                <div [hidden]=\"!name_en.errors.required\">\n                  {{constant.errorMsg.PROPERTY_TYPE_REQUIRED}}\n                </div>\n            </div>\n          </div>\n          <div class=\"form-group\">\n            <input type=\"text\" class=\"form-control\" placeholder=\"Amenity (Spanish)\" [(ngModel)]=\"property.amenities.name_es\" name=\"name_es\">\n          </div>\n        </div>\n        <div class=\"modal-footer\">\n          <button type=\"submit\" [disabled]=\"addForm.invalid\" class=\"btn btn-info\">Submit</button>\n          <button type=\"button\" class=\"btn btn-default\" aria-label=\"Close\" (click)=\"modalRef.hide()\">Close</button>\n        </div>\n      </form>\n  </div>\n</ng-template>\n  "

/***/ }),

/***/ "../../../../../src/app/layout/settings/property/property.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__ = __webpack_require__("../../../../ngx-sweetalert2/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_modal__ = __webpack_require__("../../../../ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_property_model__ = __webpack_require__("../../../../../src/app/models/property.model.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PropertyComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var PropertyComponent = (function () {
    function PropertyComponent(element, constant, property, modalService, admin, router, swal) {
        this.element = element;
        this.constant = constant;
        this.property = property;
        this.modalService = modalService;
        this.admin = admin;
        this.router = router;
        this.swal = swal;
        this.parameter = {};
        this.parameter.countryCount = 0;
        this.parameter.stateCount = 0;
        this.parameter.cityCount = 0;
    }
    PropertyComponent.prototype.ngOnInit = function () {
        this.getConfigurations();
        this.getPropertyTypes();
        this.getAmenities();
    };
    PropertyComponent.prototype.openPropertyConfigModal = function (template, id, name_en, name_es, status) {
        this.property.configuration.id = id;
        this.property.configuration.name_en = name_en;
        this.property.configuration.name_es = name_es == null ? name_en : name_es;
        this.property.configuration.status = status;
        this.modalRef = this.modalService.show(template);
    };
    PropertyComponent.prototype.openPropertyTypeModal = function (template, id, name_en, name_es, status) {
        this.property.type.id = id;
        this.property.type.name_en = name_en;
        this.property.type.name_es = name_es;
        this.property.type.status = status;
        this.modalRef = this.modalService.show(template);
    };
    PropertyComponent.prototype.openAmenityModal = function (template, id, icon, name_en, name_es, status) {
        console.log('00', template, id, icon, name_en, name_es, status);
        this.property.amenities.id = id;
        this.property.amenities.icon = icon;
        this.property.amenities.name_en = name_en;
        this.property.amenities.name_es = name_es;
        this.property.amenities.status = status;
        this.modalRef = this.modalService.show(template);
    };
    PropertyComponent.prototype.addPropertyConfiguration = function (id, name_en, name_es, status, type) {
        var _this = this;
        if (type !== 'add') {
            this.modalRef.hide();
        }
        this.parameter.loading = true;
        this.parameter.url = 'addConfiguration';
        var input = new FormData();
        input.append('name_en', name_en);
        input.append('name_es', name_es);
        input.append('status', status);
        if (id) {
            input.append('id', id);
        }
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('addConfigurations', success);
            _this.parameter.loading = false;
            _this.swal.success({
                title: 'Success',
                text: id ?
                    _this.constant.successMsg.PROPERTY_CONFIG_UPDATED_SUCCESSFULLY :
                    _this.constant.successMsg.PROPERTY_CONFIG_ADDED_SUCCESSFULLY,
            });
            _this.getConfigurations();
        }, function (error) {
            _this.parameter.loading = false;
            _this.swal.warning({
                title: 'Error',
                text: error.message,
            });
            _this.router.navigate(['']);
        });
    };
    PropertyComponent.prototype.addPropertyType = function (id, name_en, name_es, status, type) {
        var _this = this;
        if (type !== 'add') {
            this.modalRef.hide();
        }
        this.parameter.loading = true;
        this.parameter.url = 'addPropertyType';
        var input = new FormData();
        input.append('name_en', name_en);
        input.append('name_es', name_es);
        input.append('status', status);
        if (id) {
            input.append('id', id);
        }
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('addPropertyType', success);
            _this.parameter.loading = false;
            _this.swal.success({
                title: 'Success',
                text: id ?
                    _this.constant.successMsg.PROPERTY_TYPE_UPDATED_SUCCESSFULLY :
                    _this.constant.successMsg.PROPERTY_TYPE_ADDED_SUCCESSFULLY,
            });
            _this.getPropertyTypes();
        }, function (error) {
            _this.parameter.loading = false;
            _this.swal.warning({
                title: 'Error',
                text: error.message,
            });
            _this.router.navigate(['']);
        });
    };
    PropertyComponent.prototype.addAmenity = function (id, icon, name_en, name_es, status, type) {
        var _this = this;
        console.log('icon', id, icon, name_en, name_es, status, type);
        if (type !== 'add') {
            this.modalRef.hide();
        }
        var iconNew = this.icon ? this.icon : this.property.amenities.icon;
        console.log('mm', iconNew);
        this.parameter.loading = true;
        this.parameter.url = 'addPropertyAmenity';
        var input = new FormData();
        input.append('name_en', name_en);
        input.append('name_es', name_es);
        input.append('status', status);
        if (this.icon) {
            input.append('icon', iconNew);
        }
        if (id) {
            input.append('id', id);
        }
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('addPropertyAmenity', success);
            _this.parameter.loading = false;
            _this.swal.success({
                title: 'Success',
                text: id ? _this.constant.successMsg.AMENITY_UPDATED_SUCCESSFULLY : _this.constant.successMsg.AMENITY_ADDED_SUCCESSFULLY,
            });
            _this.getAmenities();
        }, function (error) {
            _this.parameter.loading = false;
            _this.swal.warning({
                title: 'Error',
                text: error.message,
            });
            _this.router.navigate(['']);
        });
    };
    PropertyComponent.prototype.getConfigurations = function () {
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
            if (error.statusCode === 401) {
                _this.router.navigate(['']);
            }
            else {
                _this.swal.warning({
                    // title: 'Internet Connection',
                    text: error.messages,
                });
            }
        });
    };
    PropertyComponent.prototype.getPropertyTypes = function () {
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
            if (error.statusCode === 401) {
                _this.router.navigate(['']);
            }
            else {
                _this.swal.warning({
                    // title: 'Internet Connection',
                    text: error.messages,
                });
            }
        });
    };
    PropertyComponent.prototype.getAmenities = function () {
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
            if (error.statusCode === 401) {
                _this.router.navigate(['']);
            }
            else {
                _this.swal.warning({
                    // title: 'Internet Connection',
                    text: error.messages,
                });
            }
        });
    };
    PropertyComponent.prototype.addPropertyConfigurationPopup = function (id, name_en, name_es, status, type) {
        var self = this;
        this.swal.confirm({
            title: this.constant.title.ARE_YOU_SURE,
            text: status === 1 ? this.constant.title.UNBLOCK_PROPERTY_CONFIG : this.constant.title.BLOCK_PROPERTY_CONFIG,
        }).then(function () {
            self.addPropertyConfiguration(id, name_en, name_es, status, type);
        })
            .catch(function () {
            // console.log('Logout cancelled by user');
        });
    };
    PropertyComponent.prototype.addPropertyTypePopup = function (id, name_en, name_es, status, type) {
        var self = this;
        this.swal.confirm({
            title: this.constant.title.ARE_YOU_SURE,
            text: status === 1 ? this.constant.title.UNBLOCK_PROPERTY_TYPE : this.constant.title.BLOCK_PROPERTY_TYPE,
        }).then(function () {
            self.addPropertyType(id, name_en, name_es, status, type);
        })
            .catch(function () {
            // console.log('Logout cancelled by user');
        });
    };
    PropertyComponent.prototype.addAmenityPopup = function (id, icon, name_en, name_es, status, type) {
        var self = this;
        this.swal.confirm({
            title: this.constant.title.ARE_YOU_SURE,
            text: status === 1 ? this.constant.title.UNBLOCK_AMENITY : this.constant.title.BLOCK_AMENITY,
        }).then(function () {
            self.addAmenity(id, icon, name_en, name_es, status, type);
        })
            .catch(function () {
            // console.log('Logout cancelled by user');
        });
    };
    PropertyComponent.prototype.checkIfConfigSpanishNameEntered = function (id, name_en, name_es, status, type) {
        var self = this;
        if (name_es === '') {
            this.swal.confirm({
                text: this.constant.errorMsg.SAVE_ENGLISH_PROPERTY_CONFIG,
            }).then(function () {
                self.addPropertyConfiguration(id, name_en, name_en, status, type);
            })
                .catch(function () {
                // console.log('Logout cancelled by user');
            });
        }
        else {
            self.addPropertyConfiguration(id, name_en, name_es, status, type);
        }
    };
    PropertyComponent.prototype.checkIfTypeSpanishNameEntered = function (id, name_en, name_es, status, type) {
        var self = this;
        if (name_es === '') {
            this.swal.confirm({
                text: this.constant.errorMsg.SAVE_ENGLISH_PROPERTY_TYPE,
            }).then(function () {
                self.addPropertyType(id, name_en, name_en, status, type);
            })
                .catch(function () {
                // console.log('Logout cancelled by user');
            });
        }
        else {
            self.addPropertyType(id, name_en, name_es, status, type);
        }
    };
    PropertyComponent.prototype.checkIfAmenitySpanishNameEntered = function (id, icon, name_en, name_es, status, type) {
        console.log('00', id, icon, name_en, name_es, status, type);
        var self = this;
        if (name_es === '') {
            this.swal.confirm({
                text: this.constant.errorMsg.SAVE_ENGLISH_AMENITY,
            }).then(function () {
                self.addAmenity(id, icon, name_en, name_en, status, type);
            })
                .catch(function () {
                // console.log('Logout cancelled by user');
            });
        }
        else {
            self.addAmenity(id, icon, name_en, name_es, status, type);
        }
    };
    PropertyComponent.prototype.changeListner = function (event) {
        var reader = new FileReader();
        var image = this.element.nativeElement.querySelector('.image');
        // console.log(image)
        var fileToUpload = event.target.files[0];
        this.icon = fileToUpload;
        reader.onload = function (e) {
            var src = e.target['result'];
            image.src = src;
            // console.log(image.src)
        };
        reader.readAsDataURL(event.target.files[0]);
    };
    PropertyComponent.prototype.changeListner1 = function (event) {
        var reader = new FileReader();
        var image = this.element.nativeElement.querySelector('.image1');
        console.log(image);
        var fileToUpload = event.target.files[0];
        this.icon = fileToUpload;
        reader.onload = function (e) {
            var src = e.target['result'];
            image.src = src;
            console.log(image.src);
        };
        reader.readAsDataURL(event.target.files[0]);
    };
    return PropertyComponent;
}());
PropertyComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-property',
        template: __webpack_require__("../../../../../src/app/layout/settings/property/property.component.html"),
        styles: [__webpack_require__("../../../../../src/app/layout/settings/property/property.component.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_5__common_constants__["a" /* Constant */], __WEBPACK_IMPORTED_MODULE_6__models_property_model__["a" /* Property */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__common_constants__["a" /* Constant */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6__models_property_model__["a" /* Property */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__models_property_model__["a" /* Property */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_modal__["b" /* BsModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_modal__["b" /* BsModalService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__["a" /* SweetAlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__["a" /* SweetAlertService */]) === "function" && _g || Object])
], PropertyComponent);

var _a, _b, _c, _d, _e, _f, _g;
//# sourceMappingURL=property.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/settings/settings.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/settings/settings.component.html":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "../../../../../src/app/layout/settings/settings.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SettingsComponent = (function () {
    function SettingsComponent() {
    }
    SettingsComponent.prototype.ngOnInit = function () {
    };
    return SettingsComponent;
}());
SettingsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-settings',
        template: __webpack_require__("../../../../../src/app/layout/settings/settings.component.html"),
        styles: [__webpack_require__("../../../../../src/app/layout/settings/settings.component.css")]
    }),
    __metadata("design:paramtypes", [])
], SettingsComponent);

//# sourceMappingURL=settings.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/settings/settings.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_moment__ = __webpack_require__("../../../../angular2-moment/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angular2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ngx_loading__ = __webpack_require__("../../../../ngx-loading/ngx-loading/ngx-loading.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ngx_bootstrap_modal__ = __webpack_require__("../../../../ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__agm_core__ = __webpack_require__("../../../../@agm/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_tel_input__ = __webpack_require__("../../../../ng2-tel-input/ng2-tel-input.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_tel_input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_ng2_tel_input__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__location_location_component__ = __webpack_require__("../../../../../src/app/layout/settings/location/location.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__settings_component__ = __webpack_require__("../../../../../src/app/layout/settings/settings.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__locality_locality_component__ = __webpack_require__("../../../../../src/app/layout/settings/locality/locality.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__property_property_component__ = __webpack_require__("../../../../../src/app/layout/settings/property/property.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__project_project_component__ = __webpack_require__("../../../../../src/app/layout/settings/project/project.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__edit_profile_edit_profile_component__ = __webpack_require__("../../../../../src/app/layout/settings/edit-profile/edit-profile.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsModule", function() { return SettingsModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var routes = [
    { path: 'edit-profile', component: __WEBPACK_IMPORTED_MODULE_15__edit_profile_edit_profile_component__["a" /* EditProfileComponent */] },
    { path: 'setting-location', component: __WEBPACK_IMPORTED_MODULE_10__location_location_component__["a" /* LocationComponent */] },
    { path: 'setting-locality', component: __WEBPACK_IMPORTED_MODULE_12__locality_locality_component__["a" /* LocalityComponent */] },
    { path: 'setting-property', component: __WEBPACK_IMPORTED_MODULE_13__property_property_component__["a" /* PropertyComponent */] },
    { path: 'setting-project', component: __WEBPACK_IMPORTED_MODULE_14__project_project_component__["a" /* ProjectComponent */] }
];
var SettingsModule = (function () {
    function SettingsModule() {
    }
    return SettingsModule;
}());
SettingsModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_15__edit_profile_edit_profile_component__["a" /* EditProfileComponent */],
            __WEBPACK_IMPORTED_MODULE_10__location_location_component__["a" /* LocationComponent */],
            __WEBPACK_IMPORTED_MODULE_12__locality_locality_component__["a" /* LocalityComponent */],
            __WEBPACK_IMPORTED_MODULE_13__property_property_component__["a" /* PropertyComponent */],
            __WEBPACK_IMPORTED_MODULE_14__project_project_component__["a" /* ProjectComponent */],
            __WEBPACK_IMPORTED_MODULE_11__settings_component__["a" /* SettingsComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_9__angular_router__["a" /* RouterModule */].forChild(routes),
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["h" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["a" /* TranslateModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_6_ngx_bootstrap_modal__["a" /* ModalModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_5_ngx_loading__["a" /* LoadingModule */].forRoot({
                animationType: __WEBPACK_IMPORTED_MODULE_5_ngx_loading__["b" /* ANIMATION_TYPES */].rectangleBounce,
                // backdropBackgroundColour: 'rgba(0,0,0,0.5)',
                // backdropBorderRadius: '4px',
                primaryColour: '#00B96F'
            }),
            __WEBPACK_IMPORTED_MODULE_4_angular2_moment__["MomentModule"],
            __WEBPACK_IMPORTED_MODULE_7__agm_core__["a" /* AgmCoreModule */].forRoot({
                apiKey: 'AIzaSyCYv_zELZGVo2Ehzgp8eh8UeSIidhMCmH8',
                libraries: ['drawing']
            }),
            __WEBPACK_IMPORTED_MODULE_8_ng2_tel_input__["Ng2TelInputModule"]
        ],
        exports: [__WEBPACK_IMPORTED_MODULE_9__angular_router__["a" /* RouterModule */]]
    })
], SettingsModule);

//# sourceMappingURL=settings.module.js.map

/***/ }),

/***/ "../../../../../src/app/models/locality.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Locality; });
var Locality = (function () {
    function Locality() {
        this.localityModel = {
            id: '',
            name_es: '',
            name_en: '',
            status: 0,
            city_id: '',
            poly_coordinates: [],
            price_per_sqft: ''
        };
    }
    return Locality;
}());

//# sourceMappingURL=locality.model.js.map

/***/ }),

/***/ "../../../../../src/app/models/location.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Location; });
var Location = (function () {
    function Location() {
        this.countryModel = {
            country_id: '',
            name_es: '',
            name_en: '',
            status: 0
        };
        this.stateModel = {
            country_id: '',
            state_id: '',
            name_es: '',
            name_en: '',
            status: 0
        };
        this.cityModel = {
            country_id: '',
            state_id: '',
            city_id: '',
            name_es: '',
            name_en: '',
            status: 0
        };
        this.localityModel = {
            city_id: '',
            locality_id: '',
            name_es: '',
            name_en: '',
            status: 0,
            poly_coordinates: []
        };
    }
    return Location;
}());

//# sourceMappingURL=location.model.js.map

/***/ }),

/***/ "../../../../../src/app/models/project.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Project; });
var Project = (function () {
    function Project() {
        this.possession = {
            id: '',
            name_es: '',
            name_en: '',
            status: 0
        };
        this.type = {
            id: '',
            name_es: '',
            name_en: '',
            status: 0
        };
        this.amenities = {
            id: '',
            icon: '',
            name_es: '',
            name_en: '',
            status: 0
        };
    }
    return Project;
}());

//# sourceMappingURL=project.model.js.map

/***/ }),

/***/ "../../../../../src/app/models/property.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Property; });
var Property = (function () {
    function Property() {
        this.configuration = {
            id: '',
            name_es: '',
            name_en: '',
            status: 0
        };
        this.type = {
            id: '',
            name_es: '',
            name_en: '',
            status: 0
        };
        this.amenities = {
            id: '',
            icon: '',
            name_es: '',
            name_en: '',
            status: 0
        };
    }
    return Property;
}());

//# sourceMappingURL=property.model.js.map

/***/ })

});
//# sourceMappingURL=0.chunk.js.map