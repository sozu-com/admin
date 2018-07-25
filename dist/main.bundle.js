webpackJsonp([1],{

/***/ "../../../../../src async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../../../src async recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- <router-outlet></router-outlet> -->\n<!-- \n<div class=\"preloader-backdrop\" *ngIf=\"loading\">\n    <div class=\"page-preloader\">Loading</div>\n</div> -->\n<router-outlet></router-outlet>"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = (function () {
    function AppComponent(router) {
        var _this = this;
        this.router = router;
        this.parameter = {};
        this.router.events.subscribe(function (event) {
            if (event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* NavigationStart */]) {
                _this.parameter.loading = true;
            }
            if (event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* NavigationEnd */]) {
                _this.parameter.loading = false;
                window.scrollTo(0, 0);
            }
            if (event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["f" /* NavigationCancel */]) {
                _this.parameter.loading = false;
            }
            if (event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["g" /* NavigationError */]) {
                _this.parameter.loading = false;
            }
        });
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object])
], AppComponent);

var _a;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_auth_guard__ = __webpack_require__("../../../../../src/app/services/auth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ngx_sweetalert2__ = __webpack_require__("../../../../ngx-sweetalert2/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_tel_input__ = __webpack_require__("../../../../ng2-tel-input/ng2-tel-input.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_tel_input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_ng2_tel_input__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__page_not_found_page_not_found_component__ = __webpack_require__("../../../../../src/app/page-not-found/page-not-found.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ngx_loading__ = __webpack_require__("../../../../ngx-loading/ngx-loading/ngx-loading.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__layout_layout_module__ = __webpack_require__("../../../../../src/app/layout/layout.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_http_interceptor__ = __webpack_require__("../../../../../src/app/services/http-interceptor.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










// import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// import { SignupComponent } from './signup/signup.component';


var appRoutes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'login', pathMatch: 'full', redirectTo: 'login' },
    // { path: 'forgot-password', component: ForgotPasswordComponent },
    // { path: 'dashboard', canActivate: [AuthGuard], loadChildren: './layout/layout.module#LayoutModule'},
    { path: '**', component: __WEBPACK_IMPORTED_MODULE_10__page_not_found_page_not_found_component__["a" /* PageNotFoundComponent */] }
    // { path: '**', pathMatch: 'full', redirectTo: 'login' },
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* AppComponent */],
            // ForgotPasswordComponent,
            // SignupComponent,
            __WEBPACK_IMPORTED_MODULE_10__page_not_found_page_not_found_component__["a" /* PageNotFoundComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* RouterModule */].forRoot(appRoutes),
            // NgbModule.forRoot(),
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_12__layout_layout_module__["a" /* LayoutModule */],
            __WEBPACK_IMPORTED_MODULE_11_ngx_loading__["a" /* LoadingModule */].forRoot({
                animationType: __WEBPACK_IMPORTED_MODULE_11_ngx_loading__["b" /* ANIMATION_TYPES */].rectangleBounce,
                // backdropBackgroundColour: 'rgba(0,0,0,0.5)',
                // backdropBorderRadius: '4px',
                primaryColour: '#00B96F'
            }),
            __WEBPACK_IMPORTED_MODULE_8_ng2_tel_input__["Ng2TelInputModule"]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_4__services_admin_service__["a" /* AdminService */], __WEBPACK_IMPORTED_MODULE_6__services_auth_guard__["a" /* AuthGuard */], __WEBPACK_IMPORTED_MODULE_7_ngx_sweetalert2__["a" /* SweetAlertService */], __WEBPACK_IMPORTED_MODULE_13__services_http_interceptor__["a" /* HttpInterceptor */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

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
                                //google.maps.drawing.OverlayType.MARKER,
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
                            //Write code to select the newly selected object.
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
                    //centerControlDiv.index = 1;
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

/***/ "../../../../../src/app/common/constants.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Constant; });
var Constant = (function () {
    function Constant() {
        this.itemsPerPage = 10;
        this.p = 1;
        this.userPlaceholder = '../../../assets/img/default_usr.png';
        this.errorMsg = {
            COUNTRY_NAME_REQUIRED: 'Please enter country.',
            STATE_NAME_REQUIRED: 'Please enter state.',
            CITY_NAME_REQUIRED: 'Please enter city.',
            PROPERTY_TYPE_REQUIRED: 'Please enter name.',
            PRICE_PER_SQFT_REQUIRED: 'Please enter price per sqft.',
            PRICE_PER_SQFT_MIN: 'Price per sqft must be greater than 1',
            FILE_REQUIRED: 'Please choose file.',
            PROPERTY_CONFIG_REQUIRED: 'Please enter name.',
            MISSING_COUNTRY_NAME_ES: 'Country name is missing in spanish.',
            SAVE_ENGLISH_COUNTRY_NAME: 'We\'ll save english country name in place of spanish.',
            SAVE_ENGLISH_STATE_NAME: 'We\'ll save english state name in place of spanish.',
            SAVE_ENGLISH_CITY_NAME: 'We\'ll save english city name in place of spanish.',
            SAVE_ENGLISH_PROPERTY_CONFIG: 'We\'ll save english property configuration in place of spanish.',
            SAVE_ENGLISH_PROPERTY_TYPE: 'We\'ll save english property type in place of spanish.',
            SAVE_ENGLISH_AMENITY: 'We\'ll save english amenity in place of spanish.',
            SAVE_ENGLISH_PROJECT_POSSESION: 'We\'ll save english project possession status in place of spanish.',
            SAVE_ENGLISH_PROJECT_TYPE: 'We\'ll save english project type in place of spanish.',
            SAVE_ENGLISH_PROJECT_AMENITY: 'We\'ll save english project amenity in place of spanish.',
            NO_COUNTRY_FOUND: 'No country found!',
            NO_STATE_FOUND: 'No state found!',
            NO_CITY_FOUND: 'No city found!',
            NO_LOCATION_FOUND: 'No location found!',
            NO_LOCALITY_FOUND: 'No locality found!',
            NO_CONFIGURATION_FOUND: 'No property configuration found!',
            NO_PROPERTY_TYPE_FOUND: 'No property type found!',
            NO_AMENITY_FOUND: 'No amenity found!',
            NO_POSSESSION_FOUND: 'No project possession status found!',
            NO_PROJECT_TYPE_FOUND: 'No project type found!',
            NO_PROJECT_AMENITY_FOUND: 'No amenity found!',
            NO_USER_FOUND: 'No user found!'
        };
        this.successMsg = {
            COUNTRY_ADDED_SUCCESSFULLY: 'Country added successfully',
            COUNTRY_UPDATED_SUCCESSFULLY: 'Country updated successfully',
            PROPERTY_CONFIG_UPDATED_SUCCESSFULLY: 'Property configuration updated successfully',
            PROPERTY_CONFIG_ADDED_SUCCESSFULLY: 'Property configuration added successfully',
            PROPERTY_TYPE_UPDATED_SUCCESSFULLY: 'Property type updated successfully',
            PROPERTY_TYPE_ADDED_SUCCESSFULLY: 'Property type added successfully',
            AMENITY_UPDATED_SUCCESSFULLY: 'Amenity updated successfully',
            AMENITY_ADDED_SUCCESSFULLY: 'Amenity added successfully',
            PROJECT_POSSESSION_UPDATED_SUCCESSFULLY: 'Project possession status updated successfully',
            PROJECT_POSSESSION_ADDED_SUCCESSFULLY: 'Project possession status added successfully',
            PROJECT_TYPE_UPDATED_SUCCESSFULLY: 'Project type updated successfully',
            PROJECT_TYPE_ADDED_SUCCESSFULLY: 'Project type added successfully',
            STATE_ADDED_SUCCESSFULLY: 'State added successfully',
            STATE_UPDATED_SUCCESSFULLY: 'State updated successfully',
            CITY_ADDED_SUCCESSFULLY: 'City added successfully',
            CITY_UPDATED_SUCCESSFULLY: 'City updated successfully',
            BLOCKED_SUCCESSFULLY: 'Blocked successfully',
            UNBLOCKED_SUCCESSFULLY: 'Unblocked successfully',
        };
        this.title = {
            ARE_YOU_SURE: 'Are you sure?',
            BLOCK_COUNTRY: 'You want to block this country?',
            UNBLOCK_COUNTRY: 'You want to unblock this country?',
            BLOCK_STATE: 'You want to block this state?',
            UNBLOCK_STATE: 'You want to unblock this state?',
            BLOCK_CITY: 'You want to block this city?',
            UNBLOCK_CITY: 'You want to unblock this city?',
            BLOCK_PROPERTY_TYPE: 'You want to block this property type?',
            UNBLOCK_PROPERTY_TYPE: 'You want to unblock this property type?',
            BLOCK_PROPERTY_CONFIG: 'You want to block this property configuration?',
            UNBLOCK_PROPERTY_CONFIG: 'You want to unblock this property configuration?',
            REMOVE_PROPERTY_CONFIGURATION: 'You want to block this configuration?',
            UNBLOCK_AMENITY: 'You want to unblock this amenity?',
            BLOCK_AMENITY: 'You want to block this amenity?',
            BLOCK_PROJECT_TYPE: 'You want to block this project type?',
            UNBLOCK_PROJECT_TYPE: 'You want to unblock this project type?',
            BLOCK_PROJECT_POSSESSION: 'You want to block this project possession status?',
            UNBLOCK_PROJECT_POSSESSION: 'You want to unblock this project possession status?',
            BLOCK_USER: 'You want to block this user?',
            UNBLOCK_USER: 'You want to unblock this user?',
        };
    }
    return Constant;
}());

//# sourceMappingURL=constants.js.map

/***/ }),

/***/ "../../../../../src/app/layout/dashboard/dashboard.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* .ibox-content .top-tag{\n    color: white;\n}\n.wrapper-content .row .col-lg-2 .my-blue-bg{\n    background: #5bc0de;\n}\n.wrapper-content .row .col-lg-2 .my-green-bg{\n    background: #5cb85c;\n}\n.wrapper-content .row .col-lg-2 .my-red-bg{\n    background: #0275d8;\n}\n.wrapper-content .row .col-lg-2 .my-sky-bg{\n    background: #d9534f;\n}\n.page-header .ibox-title{\n    background: #949090; color: #fff;\n} */\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/dashboard/dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  dashboard\n</p>\n<!-- <div class=\"page-content fade-in-up\">\n  <div class=\"row\">\n    <div class=\"col-lg-3 col-md-6\">\n      <div class=\"ibox widget-stat\">\n        <div class=\"ibox-body\">\n          <div class=\"row\">\n            <div class=\"col-lg-6\">\n              <h2 class=\"m-b-5\">878</h2>\n            </div>\n            <div class=\"col-lg-6\">\n                <i class=\"fa fa-3x fa-users pull-right text-success\"></i>\n            </div>\n          </div>\n          <div class=\"row\">\n              <div class=\"text-muted m-b-20 col-lg-6\">USERS</div>\n              <div class=\"d-flex justify-content-between col-lg-6\">\n                <span class=\"text-success font-12 pull-right\">\n                  <a routerLink=\"/dashboard/view-users\">VIEW ALL</a>\n                </span>\n              </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-lg-3 col-md-6\">\n      <div class=\"ibox widget-stat\">\n        <div class=\"ibox-body\">\n          <div class=\"row\">\n            <div class=\"col-lg-6\">\n              <h2 class=\"m-b-5\">{{dashboardModel.category}}</h2>\n            </div>\n            <div class=\"col-lg-6\">\n                <i class=\"fa fa-3x fa-bars pull-right text-success\"></i>\n            </div>\n          </div>\n          <div class=\"row\">\n              <div class=\"text-muted m-b-20 col-lg-6\">CATEGORIES</div>\n              <div class=\"d-flex justify-content-between col-lg-6\">\n                <span class=\"text-success font-12 pull-right\">\n                  <a routerLink=\"/dashboard/view-category\">VIEW ALL</a>\n                </span>\n              </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-lg-3 col-md-6\">\n      <div class=\"ibox widget-stat\">\n        <div class=\"ibox-body\">\n          <div class=\"row\">\n            <div class=\"col-lg-6\">\n              <h2 class=\"m-b-5\">763</h2>\n            </div>\n            <div class=\"col-lg-6\">\n              <i class=\"fa fa-3x fa-users pull-right text-success\"></i>\n            </div>\n          </div>\n          <div class=\"row\">\n              <div class=\"text-muted m-b-20 col-lg-6\">Users</div>\n              <div class=\"d-flex justify-content-between col-lg-6\">\n                <span class=\"text-success font-12 pull-right\">\n                  <a routerLink=\"/dashboard/view-workouts/1/1\">VIEW ALL</a>\n                </span>\n              </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div> -->\n"

/***/ }),

/***/ "../../../../../src/app/layout/dashboard/dashboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__ = __webpack_require__("../../../../ngx-sweetalert2/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_dashboard_model__ = __webpack_require__("../../../../../src/app/models/dashboard.model.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DashboardComponent = (function () {
    function DashboardComponent(dashModel, admin, router, swal) {
        this.dashModel = dashModel;
        this.admin = admin;
        this.router = router;
        this.swal = swal;
        this.parameter = {};
    }
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-dashboard',
        template: __webpack_require__("../../../../../src/app/layout/dashboard/dashboard.component.html"),
        styles: [__webpack_require__("../../../../../src/app/layout/dashboard/dashboard.component.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_4__models_dashboard_model__["a" /* DashboardModel */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__models_dashboard_model__["a" /* DashboardModel */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__models_dashboard_model__["a" /* DashboardModel */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__["a" /* SweetAlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__["a" /* SweetAlertService */]) === "function" && _d || Object])
], DashboardComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=dashboard.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/forgot-password/forgot-password.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/forgot-password/forgot-password.component.html":
/***/ (function(module, exports) {

module.exports = "\n<section id=\"wrapper\">\n    <header>\n        <div class=\"row\">\n            <div class=\"col-6\">\n                <a class=\"logo\" href=\"\">\n                    <img class=\"app-logo\" src=\"./../../../assets/img/logo.png\" alt=\"img\">\n                </a>\n            </div>\n        </div>\n    </header>\n    <ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n    <div class=\"login\">\n        <div class=\"container\">\n            <div class=\"row\">\n                <div class=\"col-xl-8 col-lg-6 col-md-6 col-12\">\n                    <h2>One Easy Solution for Your Needs.</h2>\n                    <p class=\"p18\">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.</p>\n                </div>\n                <div class=\"col-xl-4 col-lg-6 col-md-6 col-12\">\n                    <form class=\"form-horizontal text-center\" role=\"form\" novalidate #loginForm=\"ngForm\" (ngSubmit)=\"forgotPassword(loginForm)\">\n                        <h3>Forgot Password</h3>\n                        <div class=\"form-group-3\">\n                            <input autocomplete=\"off\" [pattern]=\"emailPattern\" class=\"form-control\" placeholder=\"Registered Email\" id=\"email\" required [(ngModel)]=\"model.email\" name=\"email\" #input1 #email=\"ngModel\">\n                            <div *ngIf=\"email.errors && (email.dirty || email.touched)\" class=\"show-error\">\n                                <div [hidden]=\"!email.errors.required\">\n                                    Please enter email.\n                                </div>\n                                <div [hidden]=\"!email.errors.pattern\">\n                                    Please enter valid email.\n                                </div>\n                            </div>\n                        </div>\n                        <a class=\"fgt-pswd\" href=\"\">Back to login.</a>\n                        <div class=\"btn-cont text-right\">\n                            <button type=\"submit\" [disabled]=\"loginForm.invalid\" class=\"btn btn-primary login-btn mgt-50\">SUBMIT</button>\n                        </div>\n                        <p class=\"text-center\">We'll send reset password link to your registered email.</p>\n                    </form>\n                </div>\n            </div>\n        </div>\n    </div>\n</section>"

/***/ }),

/***/ "../../../../../src/app/layout/forgot-password/forgot-password.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_sweetalert2__ = __webpack_require__("../../../../ngx-sweetalert2/index.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgotPasswordComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ForgotPasswordComponent = (function () {
    function ForgotPasswordComponent(admin, swal) {
        this.admin = admin;
        this.swal = swal;
        this.parameter = {};
        this.emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
        this.model = {
            email: ''
        };
    }
    ForgotPasswordComponent.prototype.ngOnInit = function () { };
    ForgotPasswordComponent.prototype.forgotPassword = function (formData) {
        var _this = this;
        this.parameter.loading = true;
        var input = new FormData();
        input.append('email', formData.value.email);
        this.admin.postDataApi('forgotPassword', input)
            .subscribe(function (success) {
            _this.parameter.loading = false;
            _this.swal.success({
                title: 'Success',
                text: success.message,
            });
        }, function (error) {
            _this.parameter.loading = false;
            _this.swal.error({
                title: 'Error',
                text: error.message,
            });
        });
    };
    return ForgotPasswordComponent;
}());
ForgotPasswordComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-forgot-password',
        template: __webpack_require__("../../../../../src/app/layout/forgot-password/forgot-password.component.html"),
        styles: [__webpack_require__("../../../../../src/app/layout/forgot-password/forgot-password.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_ngx_sweetalert2__["a" /* SweetAlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ngx_sweetalert2__["a" /* SweetAlertService */]) === "function" && _b || Object])
], ForgotPasswordComponent);

var _a, _b;
//# sourceMappingURL=forgot-password.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/inhouse-users/address/address.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/inhouse-users/address/address.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div class=\"row\" *ngIf=\"address\">\n  <div class=\"col-sm-3 col-12\">\n    <div class=\"form-group-2\">\n      <label>Country</label>\n      <select required title=\"Choose Country\" class=\"form-control\" (change)=\"getStatesNew($event.target.value, i)\">\n        <option value=\"\" disabled>Select Country</option>\n        <option *ngFor=\"let countryAdd of parameter.countriesAdd\" [selected]=\"countryAdd.id == address.countries\" value=\"{{countryAdd.id}}\">{{countryAdd.name_en}}</option>\n      </select>\n    </div>\n  </div>\n  <div class=\"col-sm-3 col-12\">\n    <div class=\"form-group-2\">\n      <label>State</label>\n      <select required title=\"Choose State\" class=\"form-control\" (change)=\"getCitiesNew($event.target.value, i)\">\n        <option value=\"\" disabled>Select State</option>\n        <option *ngFor=\"let stateAdd of parameter.statesAdd\" [selected]=\"stateAdd.id == address.states\" value=\"{{stateAdd.id}}\">{{stateAdd.name_en}}</option>\n      </select>\n    </div>\n  </div>\n  <div class=\"col-sm-3 col-12\">\n    <div class=\"form-group-2\">\n      <label>City</label>\n      <select required title=\"Choose City\" class=\"form-control\" (change)=\"getLocalitiesNew($event.target.value, i)\">\n      <option value=\"\" disabled>Select City</option>\n      <option *ngFor=\"let cityAdd of parameter.citiesAdd\" [selected]=\"cityAdd.id == address.cities\" value=\"{{cityAdd.id}}\">{{cityAdd.name_en}}</option>\n    </select>\n    </div>\n  </div>\n  <div class=\"col-sm-3 col-12\">\n    <div class=\"row\">\n      <div class=\"col-9\">\n      <div class=\"form-group-2\">\n        <label>Locality</label>\n        <select required title=\"Choose Locality\" class=\"form-control\" (change)=\"setLocality($event.target.value, i)\">\n          <option value=\"\" disabled>Select Locality</option>\n          <option *ngFor=\"let localityAdd of parameter.localitiesAdd\" [selected]=\"localityAdd.id == address.localities\" value=\"{{localityAdd.id}}\">{{localityAdd.name_en}}</option>\n        </select>\n      </div>\n      </div>\n      <div class=\"col-3\">\n        <div class=\"inline-form-group padding0 marginT10\" *ngIf=\"index!=0\"> \n          <button class=\"add-btn margin0\" (click)=\"removeRow()\"><img src=\"./../../../assets/img/close-tag.png\" alt=\"img\"></button>\n        </div>\n    </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/layout/inhouse-users/address/address.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__ = __webpack_require__("../../../../ngx-sweetalert2/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_inhouse_users_model__ = __webpack_require__("../../../../../src/app/models/inhouse-users.model.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddressComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AddressComponent = (function () {
    function AddressComponent(model, element, route, admin, router, swal) {
        this.model = model;
        this.element = element;
        this.route = route;
        this.admin = admin;
        this.router = router;
        this.swal = swal;
        this.parameter = {};
        this.removeAddress = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    AddressComponent.prototype.ngOnInit = function () {
        this.getCountriesNew(0);
        // console.log('this.address',this.address)
        if (this.address.countries) {
            this.getStatesNew(this.address.countries, 0);
            this.getCitiesNew(this.address.states, 0);
            this.getLocalitiesNew(this.address.cities, 0);
        }
    };
    AddressComponent.prototype.removeRow = function () {
        this.removeAddress.emit(this.index);
    };
    AddressComponent.prototype.getCountriesNew = function (index) {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'getCountries';
        var input = new FormData();
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.parameter.loading = false;
            _this.parameter.countriesAdd = success.data;
        }, function (error) {
            _this.parameter.loading = false;
            _this.swal.warning({
                title: 'Error',
                text: error.message,
            });
        });
    };
    AddressComponent.prototype.getStatesNew = function (country_id, index) {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'country/getStates';
        this.parameter.country_id = country_id;
        var input = new FormData();
        input.append('country_id', country_id);
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.parameter.loading = false;
            _this.parameter.statesAdd = success.data;
            _this.address.countries = country_id;
        }, function (error) {
            console.log(error);
            _this.parameter.loading = false;
            _this.swal.warning({
                title: 'Error',
                text: error.message,
            });
        });
    };
    AddressComponent.prototype.getCitiesNew = function (state_id, index) {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'getCities';
        this.parameter.state_id = state_id;
        var input = new FormData();
        input.append('state_id', state_id);
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.parameter.loading = false;
            _this.parameter.citiesAdd = success.data;
            _this.address.states = state_id;
        }, function (error) {
            _this.parameter.loading = false;
            if (error.statusCode == 401)
                _this.router.navigate(['']);
            else
                _this.swal.warning({
                    // title: 'Internet Connection',
                    text: error.message,
                });
        });
    };
    AddressComponent.prototype.getLocalitiesNew = function (city_id, index) {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'getLocalities';
        this.parameter.city_id = city_id;
        var input = new FormData();
        input.append('city_id', city_id);
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.parameter.loading = false;
            _this.parameter.localitiesAdd = success.data;
            _this.address.cities = city_id;
        }, function (error) {
            console.log(error);
            _this.parameter.loading = false;
            if (error.statusCode == 401)
                _this.router.navigate(['']);
            else
                _this.swal.warning({
                    text: error.message,
                });
        });
    };
    AddressComponent.prototype.setLocality = function (locality_id, index) {
        this.address.localities = locality_id;
    };
    return AddressComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('address'),
    __metadata("design:type", Object)
], AddressComponent.prototype, "address", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('index'),
    __metadata("design:type", Object)
], AddressComponent.prototype, "index", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], AddressComponent.prototype, "removeAddress", void 0);
AddressComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-address',
        template: __webpack_require__("../../../../../src/app/layout/inhouse-users/address/address.component.html"),
        styles: [__webpack_require__("../../../../../src/app/layout/inhouse-users/address/address.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__models_inhouse_users_model__["a" /* InhouseUsers */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__models_inhouse_users_model__["a" /* InhouseUsers */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__["a" /* SweetAlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__["a" /* SweetAlertService */]) === "function" && _f || Object])
], AddressComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=address.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/inhouse-users/inhouse-users.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".access-control11{\n    background-color: rgba(0,185,111,0.22);\n    color: #00B96F;\n}\n.apply-btn{\n    padding: 4px 15px !important;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/inhouse-users/inhouse-users.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container-fluid\">\n    <div class=\"row\">\n        <div class=\"col-md-6\">\n          <div class=\"title-group\">\n              <h5>Inhouse Users</h5>\n              <p>Showing {{parameter.total}} out of {{parameter.total}}</p>\n          </div>\n        </div>\n        <div class=\"col-md-6\">\n          <div class=\"add-new text-right\">\n              <a class=\"btn\" href=\"javascript://\" style=\"display: none;\" data-toggle=\"modal\" data-target=\"#add\" #modalOpen>Add New</a>\n              <a class=\"btn\" href=\"javascript://\" (click)=\"openAddModal()\">Add New</a>\n          </div>\n        </div>\n    </div>\n  \n    <ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n  \n    <div class=\"row\">\n        <!-- <div  class=\"col-lg-2 col-md-12\"></div> -->\n        <div class=\"col-lg-2 col-md-3 col-sm-6 col-6\">\n          <div class=\"form-group marginB0\">\n              <label>Country</label>\n              <!-- <select class=\"form-control\">\n                <option>All</option>\n                <option>All</option>\n                <option>All</option>\n              </select> -->\n              <select title=\"Choose Country\" class=\"form-control\" (change)=\"getStates($event.target.value)\">\n                <option value=\"-1\">All</option>\n                <option *ngFor=\"let country of parameter.countries\" value=\"{{country.id}}\">{{country.name_en}}</option>\n                <!-- <option *ngFor=\"let country of parameter.countries\" value=\"{{country.id}}\" [selected]=\"country.id == parameter.country_id\">{{country.name_en}}</option> -->\n              </select>\n          </div>\n        </div>\n        <div class=\"col-lg-2 col-md-3 col-sm-6 col-6\">\n          <div class=\"form-group marginB0\">\n              <label>State</label>\n              <!-- <select class=\"form-control\">\n                <option>All</option>\n                <option>All</option>\n                <option>All</option>\n              </select> -->\n              <select title=\"Choose State\" class=\"form-control\" (change)=\"getCities($event.target.value)\">\n                <option value=\"-1\">All</option>\n                <option *ngFor=\"let state of parameter.states\" value=\"{{state.id}}\">{{state.name_en}}</option>\n                <!-- <option *ngFor=\"let state of parameter.states\" value=\"{{state.id}}\" [selected]=\"state.id == parameter.state_id\">{{state.name_en}}</option> -->\n              </select>\n          </div>\n        </div>\n        <div class=\"col-lg-2 col-md-3 col-sm-6 col-6\">\n          <div class=\"form-group marginB0\">\n              <label>City</label>\n              <!-- <select class=\"form-control\">\n                <option>All</option>\n                <option>All</option>\n                <option>All</option>\n              </select> -->\n              <select title=\"Choose City\" class=\"form-control\" (change)=\"getLocalities($event.target.value)\">\n                <option value=\"-1\">All</option>\n                <option *ngFor=\"let city of parameter.cities\" value=\"{{city.id}}\">{{city.name_en}}</option>\n                <!-- <option *ngFor=\"let city of parameter.cities\" value=\"{{city.id}}\" [selected]=\"city.id == parameter.city_id\">{{city.name_en}}</option> -->\n              </select>\n          </div>\n        </div>\n        <div class=\"col-lg-2 col-md-3 col-sm-6 col-6\">\n          <div class=\"form-group marginB0\">\n              <label>Locality</label>\n              <!-- <select class=\"form-control\">\n                <option>All</option>\n                <option>All</option>\n                <option>All</option>\n              </select> -->\n              <select title=\"Choose Locality\" class=\"form-control\" (change)=\"getLocalityBuildings($event.target.value)\">\n                <option value=\"-1\">All</option>\n                <option *ngFor=\"let locality of parameter.localities\" value=\"{{locality.id}}\">{{locality.name_en}}</option>\n                <!-- <option *ngFor=\"let locality of parameter.localities\" value=\"{{locality.id}}\" [selected]=\"locality.id == parameter.locality_id\">{{locality.name_en}}</option> -->\n              </select>\n          </div>\n        </div>\n        <div class=\"col-lg-2 col-md-3 col-sm-6 col-6\">\n          <div class=\"form-group marginB0\">\n              <label>Building</label>\n              <select title=\"Choose Building\" class=\"form-control\" (change)=\"setBuilding($event.target.value)\">\n                <option value=\"-1\">All</option>\n                <option *ngFor=\"let building of parameter.buildings\" value=\"{{building.id}}\">{{building.name_en}}</option>\n                <!-- <option *ngFor=\"let locality of parameter.localities\" value=\"{{locality.id}}\" [selected]=\"locality.id == parameter.locality_id\">{{locality.name_en}}</option> -->\n              </select>\n          </div>\n        </div>\n        <div class=\"col-lg-2 col-md-3 col-sm-6 col-6\">\n          <div class=\"form-group btn-cont text-right\">\n            <label>Apply Filters</label>\n            <button (click)=\"getInhouseUsers()\" class=\"btn btn-primary apply-btn\">Apply</button>\n          </div>\n          <!-- <div class=\"btn-cont text-right\">\n            <button type=\"submit\" [disabled]=\"addForm.invalid\" class=\"btn btn-primary\">ADD</button>\n         </div> -->\n        </div>\n    </div>\n    <hr>\n\n\n    \n    <div class=\"white-bg\">\n      <div class=\"tabel-section\">\n        <div class=\"table-responsive\">\n\n        <table class=\"table table-striped\">\n            <tr>\n            <th style=\"width:6%\">&nbsp;</th>\n                <th style=\"width:20%\">\n                  <div class=\"table-search\">\n                      <label>Name</label>\n                      <input type=\"Search here\" (input)=\"searchUserByName($event.target.value)\" name=\"\">\n                  </div>\n                </th>\n                <th style=\"width:20%; text-align:left;\">\n                  <div class=\"table-search\">\n                      <label>Contact Number</label>\n                      <input type=\"Search here\" (input)=\"searchUserByPhone($event.target.value)\" name=\"\">\n                  </div>\n                </th>\n                <th style=\"width:20%\">\n                  <div class=\"table-search\">\n                      <label>Email Address</label>\n                      <input type=\"Search here\" (input)=\"searchUserByEmail($event.target.value)\" name=\"\">\n                  </div>\n                </th>\n                <th style=\"width:20%; vertical-align: top;\">\n                  Building<a href=\"javascript://\"><img src=\"./../../../../assets/img/top-arrow.png\" alt=\"img\"></a>\n                </th>\n                <th style=\"width:14%\">\n                  &nbsp;\n                </th>\n            </tr>\n\n            <tr *ngFor=\"let item of parameter.items| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.p, totalItems: parameter.total }; let i = index\">\n              <td> \n                <img *ngIf=\"item.image\" class=\"rounded-circle\" [src]=\"item.image\" alt=\"img\">\n                <img *ngIf=\"!item.image\" class=\"rounded-circle\" src=\"./../../../assets/img/default_img.png\" alt=\"img\">\n              </td>\n              <td class=\"text-left\">\n                <span class=\"name\">{{item.name}}</span>\n              </td>\n              <td class=\"text-left\" *ngIf=\"item.phone\">{{item.country_code}}-{{item.phone}}</td>\n              <td class=\"text-left\" *ngIf=\"!item.phone\">NA</td>\n              <td class=\"text-left\">{{item.email}}</td>\n              <td>14</td>\n              <td>\n                <a href=\"javascript://\" (click)=\"editUser(item)\" class=\"icon-block edit-icon\"><img src=\"./../../../../assets/img/edit.png\" alt=\"img\"></a>\n                <a href=\"javascript://\" *ngIf=\"item.is_blocked == 1\" (click)=\"blockUnblockPopup(i, item.id, 0, parameter.type)\" title=\"Unblock user\" class=\"icon-block block-icon unblock-bg\"><img src=\"./../../../../assets/img/block.png\" alt=\"img\"></a>\n                <a href=\"javascript://\" *ngIf=\"item.is_blocked == 0\" (click)=\"blockUnblockPopup(i, item.id, 1, parameter.type)\" title=\"Block user\" class=\"icon-block block-icon\"><img src=\"./../../../../assets/img/unblock.png\" alt=\"img\"></a>\n              </td>\n            </tr>\n          </table>\n        </div>\n      </div>\n\n      <div class=\"center\" *ngIf=\"parameter.total == 0\">\n        <img src=\"./../../../assets/img/404-error.png\">\n      </div>\n\n  </div>\n  <div class=\"btn-cont text-right marginT15\">\n      <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n  </div>\n</div>\n\n\n\n<!-- add inhouse user modal -->\n<div class=\"modal animated\" id=\"add\">\n  <div class=\"modal-dialog fadeIndown modal-lg\">\n     <div class=\"modal-content\">\n        <div class=\"modal-header\">\n           <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #modalClose>&times;</button>\n        </div>\n\n        <form class=\"form-horizontal form-model0P\" role=\"form\" ngNativeValidate #addForm=\"ngForm\" (ngSubmit)=\"addNewUser(addForm)\">\n        <div class=\"modal-body\">\n            <div class=\"row\">\n               <div class=\"col-6\">\n                  <div class=\"add-img\">\n                  <input required accept=\"image/*\" class=\"image\" (change)=\"changeListner($event)\" type=\"file\">\n                  <label>+ Add Image</label>\n                  </div>\n               </div>\n               <div class=\"col-6\">\n                  <div class=\"btn-cont text-right\">\n                     <button *ngIf=\"model.userModel.id==''\" type=\"submit\" [disabled]=\"addForm.invalid\" class=\"btn btn-primary\">ADD</button>\n                     <button *ngIf=\"model.userModel.id!=''\" type=\"submit\" [disabled]=\"addForm.invalid\" class=\"btn btn-primary\">UPDATE</button>\n                  </div>\n               </div>\n               <div class=\"col-12\">\n                  <div class=\"spacer40\"></div>\n               </div>\n               <div class=\"col-12\">\n                  <div class=\"form-group-2\">\n                     <label>Name</label>\n                     <div class=\"form-group\">\n                      <!-- <input type=\"text\" class=\"form-control\" id=\"name\" required [(ngModel)]=\"model.userModel.name\" name=\"name\" #name=\"ngModel\">\n                      <div *ngIf=\"name.errors && (name.dirty || name.touched)\" class=\"show-error\">\n                          <div [hidden]=\"!name.errors.required\">\n                            {{constant.errorMsg.COUNTRY_NAME_REQUIRED}}\n                          </div>\n                      </div> -->\n                      <input autocomplete=\"off\" type=\"text\" class=\"form-control\" required [(ngModel)]=\"model.userModel.name\" name=\"name\">\n                    </div>\n                  </div>\n               </div>\n               <div class=\"col-12\">\n                  <div class=\"form-group-2\">\n                     <label>Contact number</label>\n                     <div class=\"form-group\">\n                        <!-- <input type=\"text\" class=\"form-control\"\n                        id=\"phone\" required minlength=\"1\" [(ngModel)]=\"model.userModel.phone\" \n                        name=\"phone\" #phone=\"ngModel\"\n    ng2TelInput\n    [ng2TelInputOptions]=\"initialCountry\"\n    (countryChange)=\"onCountryChange($event)\" />\n                      <div *ngIf=\"phone.errors && (phone.dirty || phone.touched)\" class=\"show-error\">\n                          <div [hidden]=\"!phone.errors.required\">\n                            {{constant.errorMsg.COUNTRY_NAME_REQUIRED}}\n                          </div>\n                      </div> -->\n                      <input minlength=\"6\" maxlength=\"16\" autocomplete=\"off\" type=\"text\" class=\"form-control\" id=\"phone\" required minlength=\"1\" [(ngModel)]=\"model.userModel.phone\" name=\"phone\"\n                            ng2TelInput [ng2TelInputOptions]=\"initialCountry\" (countryChange)=\"onCountryChange($event)\" />\n                    </div>\n                  </div>\n               </div>\n               <div class=\"col-12\">\n                  <div class=\"form-group-2\">\n                     <label>Email ID</label>\n                     <div class=\"form-group\">\n                      <!-- <input type=\"text\" class=\"form-control\" id=\"email\" required [(ngModel)]=\"model.userModel.email\" name=\"email\" #email=\"ngModel\">\n                      <div *ngIf=\"email.errors && (email.dirty || email.touched)\" class=\"show-error\">\n                          <div [hidden]=\"!email.errors.required\">\n                            {{constant.errorMsg.COUNTRY_NAME_REQUIRED}}\n                          </div>\n                      </div> -->\n                      <input autocomplete=\"off\" type=\"email\" class=\"form-control\" required [(ngModel)]=\"model.userModel.email\" name=\"email\">\n                    </div>\n                  </div>\n               </div>\n            </div>\n            \n            <div *ngFor=\"let add of model.address; let j=index\">\n              <app-address [address]=\"add\" [index]=\"j\" (removeAddress)=\"removeAddressObj($event)\"></app-address>\n            </div>\n\n            <button class=\"add-btn margin0\" (click)=\"addEmptyObj()\"><img src=\"./../../../assets/img/add.png\" alt=\"img\"></button>\n            \n            <div class=\"access-controls\">\n               <label [ngClass]=\"{'access-control11': model.userModel.is_broker_seller_dev == true}\" class=\"cust-check-bx2\">Broker/Seller/Developer\n                 <input type=\"checkbox\" name=\"is_broker_seller_dev\" [(ngModel)]=\"model.userModel.is_broker_seller_dev\">\n                 <span class=\"checkmark\"></span>\n               </label>\n \n               <label [ngClass]=\"{'access-control11': model.userModel.is_buyer_renter == true}\" class=\"cust-check-bx2\">Buyer/Renter\n                 <input type=\"checkbox\" [(ngModel)]=\"model.userModel.is_buyer_renter\" name=\"is_buyer_renter\">\n                 <span class=\"checkmark\"></span>\n               </label>\n \n               <label [ngClass]=\"{'access-control11': model.userModel.is_broker == true}\" class=\"cust-check-bx2\">Broker\n                 <input type=\"checkbox\" [(ngModel)]=\"model.userModel.is_broker\" name=\"is_broker\">\n                 <span class=\"checkmark\"></span>\n               </label>\n \n               <label [ngClass]=\"{'access-control11': model.userModel.is_data_collector == true}\" class=\"cust-check-bx2\">Data Collector\n                 <input type=\"checkbox\" [(ngModel)]=\"model.userModel.is_data_collector\" name=\"is_data_collector\">\n                 <span class=\"checkmark\"></span>\n               </label>\n               <label [ngClass]=\"{'access-control11': model.userModel.is_csr_closer == true}\" class=\"cust-check-bx2\">CSR Closer\n                 <input type=\"checkbox\" [(ngModel)]=\"model.userModel.is_csr_closer\" name=\"is_csr_closer\">\n                 <span class=\"checkmark\"></span>\n               </label>\n            </div>\n         </div>\n        </form>\n\n     </div>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/layout/inhouse-users/inhouse-users.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__ = __webpack_require__("../../../../ngx-sweetalert2/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_inhouse_users_model__ = __webpack_require__("../../../../../src/app/models/inhouse-users.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InhouseUsersComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var InhouseUsersComponent = (function () {
    function InhouseUsersComponent(constant, address, user, model, element, route, admin, router, swal) {
        this.constant = constant;
        this.address = address;
        this.user = user;
        this.model = model;
        this.element = element;
        this.route = route;
        this.admin = admin;
        this.router = router;
        this.swal = swal;
        this.parameter = {};
        this.addressIndex = 0;
    }
    InhouseUsersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.p = this.constant.p;
        this.parameter.routeName = this.router.url;
        this.tempAdd = this.model.address;
        this.parameter.sub = this.route.params.subscribe(function (params) {
            _this.parameter.userType = params['userType'];
            _this.getInhouseUsers();
            _this.getCountries();
            _this.initialCountry = { initialCountry: 'mx' };
        });
    };
    InhouseUsersComponent.prototype.getPage = function (page) {
        this.parameter.p = page;
        this.getInhouseUsers();
    };
    InhouseUsersComponent.prototype.removeAddressObj = function (index) {
        this.model.address.splice(index, 1);
    };
    InhouseUsersComponent.prototype.addEmptyObj = function () {
        if (this.model.address[this.addressIndex].countries && this.model.address[this.addressIndex].states && this.model.address[this.addressIndex].cities && this.model.address[this.addressIndex].localities) {
            var obj = {
                countries: '',
                states: '',
                cities: '',
                localities: ''
            };
            this.addressIndex++;
            this.model.address.push(obj);
        }
        else {
            this.swal.error({
                title: 'Missing fields',
                text: 'Complete current row before adding new.',
            });
        }
    };
    InhouseUsersComponent.prototype.onCountryChange = function (e) {
        console.log('eeee', e);
        this.model.userModel.country_code = e.dialCode;
        this.initialCountry = { initialCountry: e.iso2 };
    };
    InhouseUsersComponent.prototype.openAddModal = function () {
        this.modalOpen.nativeElement.click();
    };
    InhouseUsersComponent.prototype.changeListner = function (event) {
        var reader = new FileReader();
        var image = this.element.nativeElement.querySelector('.image');
        this.parameter.image = event.target.files[0];
        this.parameter.icon = this.parameter.image;
        reader.onload = function (e) {
            var src = e.target['result'];
            image.src = src;
        };
        reader.readAsDataURL(event.target.files[0]);
    };
    InhouseUsersComponent.prototype.addNewUser = function (formdata) {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = this.model.userModel.id != '' ? 'updateNewUser' : 'addNewUser';
        console.log('add newuser params', formdata, JSON.stringify(this.model.address), '+' + this.model.userModel.country_code);
        var input = new FormData();
        if (this.model.userModel.id != '')
            input.append('id', this.model.userModel.id);
        input.append('name', formdata.value.name);
        input.append('country_code', '+' + this.model.userModel.country_code);
        input.append('phone', formdata.value.phone);
        input.append('image', this.parameter.image);
        input.append('email', formdata.value.email);
        input.append('address', JSON.stringify(this.model.address));
        input.append('is_broker_seller_dev', formdata.value.is_broker_seller_dev == true ? '1' : '0');
        input.append('is_buyer_renter', formdata.value.is_buyer_renter == true ? '1' : '0');
        input.append('is_broker', formdata.value.is_broker == true ? '1' : '0');
        input.append('is_data_collector', formdata.value.is_data_collector == true ? '1' : '0');
        input.append('is_csr_closer', formdata.value.is_csr_closer == true ? '1' : '0');
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('success', success);
            _this.parameter.loading = false;
            if (success.success == 0) {
                _this.swal.error({
                    title: 'Error',
                    text: success.message
                });
            }
            else {
                _this.modalClose.nativeElement.click();
                formdata.reset();
                _this.swal.success({
                    title: 'Success',
                    text: _this.model.userModel.id == '' ? 'Added successfully.' : 'Updated successfully.'
                });
            }
            // console.log('user add',success)
        }, function (error) {
            console.log(error);
            _this.parameter.loading = false;
            _this.swal.error({
                title: 'Error',
                text: error.message,
            });
        });
    };
    InhouseUsersComponent.prototype.editUser = function (userdata) {
        console.log('edit user', userdata);
        this.model.userModel.id = userdata.id;
        this.modalOpen.nativeElement.click();
        this.model.userModel.name = userdata.name;
        this.model.userModel.email = userdata.email;
        this.model.userModel.phone = userdata.phone;
        this.model.userModel.country_code = userdata.country_code;
        this.model.userModel.image = userdata.image;
        this.model.userModel.is_broker_seller_dev = userdata.permissions && userdata.permissions.can_csr_seller == 1 ? true : false;
        this.model.userModel.is_buyer_renter = userdata.permissions && userdata.permissions.can_csr_buyer == 1 ? true : true;
        this.model.userModel.is_broker = userdata.permissions && userdata.permissions.can_in_house_broker == 1 ? true : true;
        this.model.userModel.is_data_collector = userdata.permissions && userdata.permissions.can_data_collector == 1 ? true : false;
        this.model.userModel.is_csr_closer = userdata.permissions && userdata.permissions.can_csr_closer == 1 ? true : true;
        userdata.countries = ['19', '19'];
        userdata.states = ['4', '4'];
        userdata.cities = ['4', '4'];
        userdata.localities = ['3', '4'];
        for (var ind = 0; ind < 2; ind++) {
            var tempAdd = {
                countries: userdata.countries[ind],
                states: userdata.states[ind],
                cities: userdata.cities[ind],
                localities: userdata.localities[ind]
            };
            this.model.address[ind] = tempAdd;
        }
        // console.log('usermodel', this.model.userModel)
        // updateNewUser
    };
    InhouseUsersComponent.prototype.getCountries = function () {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'getCountries';
        var input = new FormData();
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.parameter.loading = false;
            _this.parameter.countries = success.data;
            _this.parameter.countryCount = success.data.length;
            if (_this.parameter.countryCount != 0) {
                // this.parameter.country_id = this.parameter.countries[0].id;
                // this.getStates(this.parameter.countries[0].id, type);
            }
        }, function (error) {
            _this.parameter.loading = false;
            _this.swal.error({
                title: 'Error',
                text: error.message,
            });
        });
    };
    InhouseUsersComponent.prototype.getStates = function (country_id) {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'country/getStates';
        this.parameter.country_id = country_id;
        console.log('countryid', country_id);
        if (country_id === '-1') {
            console.log('ssssss');
            this.parameter.states = [];
            this.parameter.cities = [];
            this.parameter.localities = [];
            this.parameter.buildings = [];
            this.parameter.stateCount = 0;
            this.parameter.cityCount = 0;
            this.parameter.localityCount = 0;
            this.parameter.buildingCount = 0;
            this.parameter.state_id = '-1';
            this.parameter.city_id = '-1';
            this.parameter.locality_id = '-1';
            this.parameter.building_id = '-1';
            this.parameter.loading = false;
        }
        else {
            var input = new FormData();
            input.append('country_id', country_id);
            this.admin.postDataApi(this.parameter.url, input)
                .subscribe(function (success) {
                _this.parameter.loading = false;
                _this.parameter.states = success.data;
                _this.parameter.stateCount = success.data.length;
                if (_this.parameter.stateCount != 0) {
                    // this.parameter.state_id = this.parameter.states[0].id;
                    // this.getCities(this.parameter.states[0].id, type);
                }
            }, function (error) {
                _this.parameter.loading = false;
                _this.swal.error({
                    title: 'Error',
                    text: error.message,
                });
            });
        }
    };
    InhouseUsersComponent.prototype.getCities = function (state_id) {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'getCities';
        this.parameter.state_id = state_id;
        if (state_id == -1) {
            this.parameter.cities = [];
            this.parameter.localities = [];
            this.parameter.buildings = [];
            this.parameter.cityCount = 0;
            this.parameter.localityCount = 0;
            this.parameter.buildingCount = 0;
            this.parameter.city_id = '-1';
            this.parameter.locality_id = '-1';
            this.parameter.building_id = '-1';
            this.parameter.loading = false;
        }
        else {
            var input = new FormData();
            input.append('state_id', state_id);
            this.admin.postDataApi(this.parameter.url, input)
                .subscribe(function (success) {
                _this.parameter.loading = false;
                // console.log('cities1',success)
                _this.parameter.cities = success.data;
                _this.parameter.cityCount = success.data.length;
                if (_this.parameter.cityCount != 0) {
                    // this.parameter.city_id = this.parameter.cities[0].id;
                    // this.getLocalities(this.parameter.cities[0].id, 'view');
                }
            }, function (error) {
                // console.log(error)
                _this.parameter.loading = false;
                if (error.statusCode == 401)
                    _this.router.navigate(['']);
                else
                    _this.swal.error({
                        // title: 'Internet Connection',
                        text: error.messages,
                    });
            });
        }
    };
    InhouseUsersComponent.prototype.getLocalities = function (city_id) {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'getLocalities';
        this.parameter.city_id = city_id;
        if (city_id == -1) {
            this.parameter.localities = [];
            this.parameter.buildings = [];
            this.parameter.localityCount = 0;
            this.parameter.buildingCount = 0;
            this.parameter.locality_id = '-1';
            this.parameter.building_id = '-1';
            this.parameter.loading = false;
        }
        else {
            var input = new FormData();
            input.append('city_id', city_id);
            this.admin.postDataApi(this.parameter.url, input)
                .subscribe(function (success) {
                _this.parameter.loading = false;
                // console.log('Localities1',success);
                _this.parameter.localities = success.data;
                _this.parameter.localityCount = success.data.length;
                // if (success.data.length != 0)
                //   this.parameter.locality_id = success.data[0].id;
                // this.getInhouseUsers();
            }, function (error) {
                // console.log(error)
                _this.parameter.loading = false;
                if (error.statusCode == 401)
                    _this.router.navigate(['']);
                else
                    _this.swal.error({
                        // title: 'Internet Connection',
                        text: error.messages,
                    });
            });
        }
    };
    InhouseUsersComponent.prototype.getLocalityBuildings = function (locality_id) {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'getLocalityBuildings';
        this.parameter.locality_id = locality_id;
        if (locality_id == -1) {
            this.parameter.buildings = [];
            this.parameter.buildingCount = 0;
            this.parameter.building_id = '-1';
            this.parameter.loading = false;
        }
        else {
            var input = new FormData();
            input.append('locality_id', locality_id);
            this.admin.postDataApi(this.parameter.url, input)
                .subscribe(function (success) {
                _this.parameter.loading = false;
                // console.log('Localities1',success);
                _this.parameter.buildings = success.data;
                _this.parameter.buildingCount = success.data.length;
                // if (success.data.length != 0)
                //   this.parameter.locality_id = success.data[0].id;
                // this.getInhouseUsers();
            }, function (error) {
                // console.log(error)
                _this.parameter.loading = false;
                if (error.statusCode == 401)
                    _this.router.navigate(['']);
                else
                    _this.swal.error({
                        // title: 'Internet Connection',
                        text: error.messages,
                    });
            });
        }
    };
    InhouseUsersComponent.prototype.setBuilding = function (building_id) {
        this.parameter.building_id = building_id;
    };
    InhouseUsersComponent.prototype.searchUserByName = function (name) {
        this.parameter.name = name;
        this.getInhouseUsers();
    };
    InhouseUsersComponent.prototype.searchUserByEmail = function (email) {
        this.parameter.email = email;
        this.getInhouseUsers();
    };
    InhouseUsersComponent.prototype.searchUserByPhone = function (phone) {
        this.parameter.phone = phone;
        this.getInhouseUsers();
    };
    InhouseUsersComponent.prototype.getInhouseUsers = function () {
        var _this = this;
        this.parameter.loading = true;
        switch (this.parameter.userType) {
            case 'data-collectors':
                this.parameter.url = 'getDataCollectors';
                this.parameter.type = 1;
                break;
            case 'csr-sellers':
                this.parameter.url = 'getCsrSellers';
                this.parameter.type = 2;
                break;
            case 'csr-buyers':
                this.parameter.url = 'getCsrBuyers';
                this.parameter.type = 3;
                break;
            case 'inhouse-broker':
                this.parameter.url = 'getInhouseBroker';
                this.parameter.type = 4;
                break;
            case 'csr-closers':
                this.parameter.url = 'getCsrClosers';
                this.parameter.type = 5;
                break;
            default:
                this.parameter.url = 'getDataCollectors';
                this.parameter.type = 1;
                break;
        }
        var input = new FormData();
        input.append('page', this.parameter.p.toString());
        if (this.parameter.name)
            input.append('name', this.parameter.name);
        if (this.parameter.email)
            input.append('email', this.parameter.email);
        if (this.parameter.phone)
            input.append('phone', this.parameter.phone);
        if (this.parameter.country_id && this.parameter.country_id != '-1')
            input.append('countries', JSON.stringify([this.parameter.country_id]));
        if (this.parameter.state_id && this.parameter.state_id != '-1')
            input.append('states', JSON.stringify([this.parameter.state_id]));
        if (this.parameter.city_id && this.parameter.city_id != '-1')
            input.append('cities', JSON.stringify([this.parameter.city_id]));
        if (this.parameter.locality_id && this.parameter.locality_id != '-1')
            input.append('localities', JSON.stringify[this.parameter.locality_id]);
        // if (this.parameter.locality_id && this.parameter.locality_id != '-1')
        //   input.append('localities', JSON.stringify[this.parameter.locality_id]);
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('succc', success);
            _this.parameter.loading = false;
            _this.parameter.items = success.data;
            _this.parameter.total = success.total;
        }, function (error) {
            _this.parameter.loading = false;
            if (error.statusCode == 401)
                _this.router.navigate(['']);
            else
                _this.swal.error({
                    // title: 'Internet Connection',
                    text: error.messages,
                });
        });
    };
    InhouseUsersComponent.prototype.addRow = function () {
        var obj = {
            countries: '',
            states: '',
            cities: '',
            localities: ''
        };
        this.model.address.push(obj);
    };
    InhouseUsersComponent.prototype.blockUnblockPopup = function (index, id, flag, user_type) {
        this.parameter.index = index;
        this.parameter.title = this.constant.title.ARE_YOU_SURE;
        switch (flag) {
            case 0:
                this.parameter.text = this.constant.title.UNBLOCK_USER;
                this.parameter.successText = this.constant.successMsg.UNBLOCKED_SUCCESSFULLY;
                break;
            case 1:
                this.parameter.text = this.constant.title.BLOCK_USER;
                this.parameter.successText = this.constant.successMsg.BLOCKED_SUCCESSFULLY;
                break;
        }
        var self = this;
        this.swal.confirm({
            title: this.parameter.title,
            text: this.parameter.text,
        }).then(function () {
            self.blockAdmin(index, id, flag, user_type);
        })
            .catch(function () {
            // console.log('Logout cancelled by user');
        });
    };
    InhouseUsersComponent.prototype.blockAdmin = function (index, id, flag, user_type) {
        var _this = this;
        this.parameter.url = 'blockAdmin';
        var input = new FormData();
        input.append('id', id);
        input.append('flag', flag);
        input.append('user_type', user_type);
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('success', success);
            _this.parameter.loading = false;
            _this.swal.success({
                title: 'Success',
                text: _this.parameter.successText
            });
            _this.parameter.items[_this.parameter.index] = success.data;
        }, function (error) {
            console.log(error);
            _this.parameter.loading = false;
            _this.swal.error({
                title: 'Error',
                text: error.message,
            });
        });
    };
    return InhouseUsersComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('modalOpen'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object)
], InhouseUsersComponent.prototype, "modalOpen", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('modalClose'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _b || Object)
], InhouseUsersComponent.prototype, "modalClose", void 0);
InhouseUsersComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-inhouse-users',
        template: __webpack_require__("../../../../../src/app/layout/inhouse-users/inhouse-users.component.html"),
        styles: [__webpack_require__("../../../../../src/app/layout/inhouse-users/inhouse-users.component.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_4__models_inhouse_users_model__["a" /* InhouseUsers */], __WEBPACK_IMPORTED_MODULE_5__common_constants__["a" /* Constant */], __WEBPACK_IMPORTED_MODULE_4__models_inhouse_users_model__["b" /* user */], __WEBPACK_IMPORTED_MODULE_4__models_inhouse_users_model__["c" /* address */]]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__common_constants__["a" /* Constant */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__models_inhouse_users_model__["c" /* address */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__models_inhouse_users_model__["c" /* address */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__models_inhouse_users_model__["b" /* user */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__models_inhouse_users_model__["b" /* user */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_4__models_inhouse_users_model__["a" /* InhouseUsers */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__models_inhouse_users_model__["a" /* InhouseUsers */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__["a" /* SweetAlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__["a" /* SweetAlertService */]) === "function" && _l || Object])
], InhouseUsersComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
//# sourceMappingURL=inhouse-users.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/layout-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__layout_component__ = __webpack_require__("../../../../../src/app/layout/layout.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dashboard_dashboard_component__ = __webpack_require__("../../../../../src/app/layout/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__settings_change_password_change_password_component__ = __webpack_require__("../../../../../src/app/layout/settings/change-password/change-password.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login_component__ = __webpack_require__("../../../../../src/app/layout/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_auth_guard__ = __webpack_require__("../../../../../src/app/services/auth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__settings_location_location_component__ = __webpack_require__("../../../../../src/app/layout/settings/location/location.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__forgot_password_forgot_password_component__ = __webpack_require__("../../../../../src/app/layout/forgot-password/forgot-password.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__settings_property_property_component__ = __webpack_require__("../../../../../src/app/layout/settings/property/property.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__settings_project_project_component__ = __webpack_require__("../../../../../src/app/layout/settings/project/project.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__settings_locality_locality_component__ = __webpack_require__("../../../../../src/app/layout/settings/locality/locality.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__inhouse_users_inhouse_users_component__ = __webpack_require__("../../../../../src/app/layout/inhouse-users/inhouse-users.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__settings_edit_profile_edit_profile_component__ = __webpack_require__("../../../../../src/app/layout/settings/edit-profile/edit-profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__users_users_component__ = __webpack_require__("../../../../../src/app/layout/users/users.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LayoutRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


// importing components













var routes = [
    {
        path: 'login', component: __WEBPACK_IMPORTED_MODULE_5__login_login_component__["a" /* LoginComponent */],
    },
    {
        path: 'forgot-password', component: __WEBPACK_IMPORTED_MODULE_8__forgot_password_forgot_password_component__["a" /* ForgotPasswordComponent */],
    },
    {
        path: 'dashboard', component: __WEBPACK_IMPORTED_MODULE_2__layout_component__["a" /* LayoutComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_6__services_auth_guard__["a" /* AuthGuard */]],
        children: [
            { path: '', component: __WEBPACK_IMPORTED_MODULE_3__dashboard_dashboard_component__["a" /* DashboardComponent */] },
            { path: 'view-users', component: __WEBPACK_IMPORTED_MODULE_14__users_users_component__["a" /* UsersComponent */] },
            { path: 'view-inhouse-users/:userType', component: __WEBPACK_IMPORTED_MODULE_12__inhouse_users_inhouse_users_component__["a" /* InhouseUsersComponent */] },
            { path: 'edit-profile', component: __WEBPACK_IMPORTED_MODULE_13__settings_edit_profile_edit_profile_component__["a" /* EditProfileComponent */] },
            { path: 'change-password', component: __WEBPACK_IMPORTED_MODULE_4__settings_change_password_change_password_component__["a" /* ChangePasswordComponent */] },
            { path: 'setting-location', component: __WEBPACK_IMPORTED_MODULE_7__settings_location_location_component__["a" /* LocationComponent */] },
            { path: 'setting-locality', component: __WEBPACK_IMPORTED_MODULE_11__settings_locality_locality_component__["a" /* LocalityComponent */] },
            { path: 'setting-property', component: __WEBPACK_IMPORTED_MODULE_9__settings_property_property_component__["a" /* PropertyComponent */] },
            { path: 'setting-project', component: __WEBPACK_IMPORTED_MODULE_10__settings_project_project_component__["a" /* ProjectComponent */] }
        ]
    }
];
var LayoutRoutingModule = (function () {
    function LayoutRoutingModule() {
    }
    return LayoutRoutingModule;
}());
LayoutRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]]
    })
], LayoutRoutingModule);

//# sourceMappingURL=layout-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/layout/layout.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/layout.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- <div class=\"page-wrapper\">\n  <app-header class=\"header clf\" app-header></app-header>\n  <app-sidebar class=\"page-sidebar\" id=\"sidebar\" app-sidebar></app-sidebar>\n  <ngbox></ngbox>\n  <div class=\"wrapper content-wrapper\">\n    <router-outlet></router-outlet>\n  </div>\n</div> -->\n\n\n\n\n\n\n<section id=\"wrapper\">\n    <app-header></app-header>\n    <!--header start start-->\n    <!-- <header>\n       <div class=\"row\">\n          <app-header></app-header>\n          <app-sidebar class=\"page-sidebar\" id=\"sidebar\" app-sidebar></app-sidebar>\n       </div>\n    </header> -->\n    <!--header start end-->\n    <section id=\"main\">\n        <!--content start-->\n        <div  id=\"content\">\n          <router-outlet></router-outlet>\n        </div>\n    </section>\n </section>"

/***/ }),

/***/ "../../../../../src/app/layout/layout.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LayoutComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LayoutComponent = (function () {
    function LayoutComponent() {
    }
    LayoutComponent.prototype.ngOnInit = function () { };
    return LayoutComponent;
}());
LayoutComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-layout',
        template: __webpack_require__("../../../../../src/app/layout/layout.component.html"),
        styles: [__webpack_require__("../../../../../src/app/layout/layout.component.css")]
    }),
    __metadata("design:paramtypes", [])
], LayoutComponent);

//# sourceMappingURL=layout.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/layout.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_moment__ = __webpack_require__("../../../../angular2-moment/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angular2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ngx_pagination__ = __webpack_require__("../../../../ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ngx_sweetalert2__ = __webpack_require__("../../../../ngx-sweetalert2/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ngx_loading__ = __webpack_require__("../../../../ngx-loading/ngx-loading/ngx-loading.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ngbox_ngbox_module__ = __webpack_require__("../../../../ngbox/ngbox.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ngbox_ngbox_service__ = __webpack_require__("../../../../ngbox/ngbox.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ngx_mydatepicker__ = __webpack_require__("../../../../ngx-mydatepicker/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ngx_malihu_scrollbar__ = __webpack_require__("../../../../ngx-malihu-scrollbar/dist/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ngx_bootstrap_modal__ = __webpack_require__("../../../../ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__agm_core__ = __webpack_require__("../../../../@agm/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_ng2_tel_input__ = __webpack_require__("../../../../ng2-tel-input/ng2-tel-input.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_ng2_tel_input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_ng2_tel_input__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__login_login_component__ = __webpack_require__("../../../../../src/app/layout/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__forgot_password_forgot_password_component__ = __webpack_require__("../../../../../src/app/layout/forgot-password/forgot-password.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__layout_routing_module__ = __webpack_require__("../../../../../src/app/layout/layout-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__layout_component__ = __webpack_require__("../../../../../src/app/layout/layout.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__shared_app_header_app_header_component__ = __webpack_require__("../../../../../src/app/shared/app-header/app-header.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__shared_app_sidebar_app_sidebar_component__ = __webpack_require__("../../../../../src/app/shared/app-sidebar/app-sidebar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__dashboard_dashboard_component__ = __webpack_require__("../../../../../src/app/layout/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__shared_app_footer_app_footer_component__ = __webpack_require__("../../../../../src/app/shared/app-footer/app-footer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__settings_change_password_change_password_component__ = __webpack_require__("../../../../../src/app/layout/settings/change-password/change-password.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__settings_location_location_component__ = __webpack_require__("../../../../../src/app/layout/settings/location/location.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__settings_property_property_component__ = __webpack_require__("../../../../../src/app/layout/settings/property/property.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__settings_project_project_component__ = __webpack_require__("../../../../../src/app/layout/settings/project/project.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__settings_locality_locality_component__ = __webpack_require__("../../../../../src/app/layout/settings/locality/locality.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__inhouse_users_inhouse_users_component__ = __webpack_require__("../../../../../src/app/layout/inhouse-users/inhouse-users.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__inhouse_users_address_address_component__ = __webpack_require__("../../../../../src/app/layout/inhouse-users/address/address.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__settings_edit_profile_edit_profile_component__ = __webpack_require__("../../../../../src/app/layout/settings/edit-profile/edit-profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__users_users_component__ = __webpack_require__("../../../../../src/app/layout/users/users.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LayoutModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















// importing shared components








// importing general component









var LayoutModule = (function () {
    function LayoutModule() {
    }
    return LayoutModule;
}());
LayoutModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["k" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_17__layout_routing_module__["a" /* LayoutRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["a" /* TranslateModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* ReactiveFormsModule */],
            // NgbModule.forRoot(),
            __WEBPACK_IMPORTED_MODULE_12_ngx_bootstrap_modal__["a" /* ModalModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_5_ngx_pagination__["a" /* NgxPaginationModule */],
            __WEBPACK_IMPORTED_MODULE_7_ngx_loading__["a" /* LoadingModule */].forRoot({
                animationType: __WEBPACK_IMPORTED_MODULE_7_ngx_loading__["b" /* ANIMATION_TYPES */].rectangleBounce,
                // backdropBackgroundColour: 'rgba(0,0,0,0.5)',
                // backdropBorderRadius: '4px',
                primaryColour: '#00B96F'
            }),
            __WEBPACK_IMPORTED_MODULE_4_angular2_moment__["MomentModule"],
            __WEBPACK_IMPORTED_MODULE_8_ngbox_ngbox_module__["a" /* NgBoxModule */],
            __WEBPACK_IMPORTED_MODULE_10_ngx_mydatepicker__["NgxMyDatePickerModule"].forRoot(),
            __WEBPACK_IMPORTED_MODULE_11_ngx_malihu_scrollbar__["a" /* MalihuScrollbarModule */].forRoot(),
            // AgmCoreModule.forRoot({
            //     apiKey: "AIzaSyDRS3KuVS6OZrVrjCCVpGZ4zYPZHFwYIso",
            //     libraries: ['drawing']
            // }),
            __WEBPACK_IMPORTED_MODULE_13__agm_core__["a" /* AgmCoreModule */].forRoot({
                apiKey: 'AIzaSyCYv_zELZGVo2Ehzgp8eh8UeSIidhMCmH8',
                libraries: ['drawing']
            }),
            __WEBPACK_IMPORTED_MODULE_14_ng2_tel_input__["Ng2TelInputModule"]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_18__layout_component__["a" /* LayoutComponent */],
            __WEBPACK_IMPORTED_MODULE_19__shared_app_header_app_header_component__["a" /* AppHeaderComponent */],
            __WEBPACK_IMPORTED_MODULE_20__shared_app_sidebar_app_sidebar_component__["a" /* AppSidebarComponent */],
            __WEBPACK_IMPORTED_MODULE_15__login_login_component__["a" /* LoginComponent */],
            __WEBPACK_IMPORTED_MODULE_16__forgot_password_forgot_password_component__["a" /* ForgotPasswordComponent */],
            __WEBPACK_IMPORTED_MODULE_21__dashboard_dashboard_component__["a" /* DashboardComponent */],
            __WEBPACK_IMPORTED_MODULE_23__settings_change_password_change_password_component__["a" /* ChangePasswordComponent */],
            __WEBPACK_IMPORTED_MODULE_22__shared_app_footer_app_footer_component__["a" /* AppFooterComponent */],
            __WEBPACK_IMPORTED_MODULE_24__settings_location_location_component__["a" /* LocationComponent */],
            __WEBPACK_IMPORTED_MODULE_25__settings_property_property_component__["a" /* PropertyComponent */],
            __WEBPACK_IMPORTED_MODULE_26__settings_project_project_component__["a" /* ProjectComponent */],
            __WEBPACK_IMPORTED_MODULE_27__settings_locality_locality_component__["a" /* LocalityComponent */],
            __WEBPACK_IMPORTED_MODULE_28__inhouse_users_inhouse_users_component__["a" /* InhouseUsersComponent */],
            __WEBPACK_IMPORTED_MODULE_29__inhouse_users_address_address_component__["a" /* AddressComponent */],
            __WEBPACK_IMPORTED_MODULE_30__settings_edit_profile_edit_profile_component__["a" /* EditProfileComponent */],
            __WEBPACK_IMPORTED_MODULE_31__users_users_component__["a" /* UsersComponent */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_6_ngx_sweetalert2__["a" /* SweetAlertService */], __WEBPACK_IMPORTED_MODULE_9_ngbox_ngbox_service__["a" /* NgBoxService */]],
    })
], LayoutModule);

//# sourceMappingURL=layout.module.js.map

/***/ }),

/***/ "../../../../../src/app/layout/login/login.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "\n<section id=\"wrapper\">\n    <header>\n        <div class=\"row\">\n            <div class=\"col-6\">\n                <a class=\"logo\" href=\"\">\n                <img class=\"app-logo\" src=\"./../../../assets/img/logo.png\" alt=\"img\">\n                </a>\n            </div>\n        </div>\n    </header>\n    <ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n    <div class=\"login\">\n        <div class=\"container\">\n            <div class=\"row\">\n                <div class=\"col-xl-8 col-lg-6 col-md-6 col-12\">\n                    <h2>One Easy Solution for Your Needs.</h2>\n                    <p class=\"p18\">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.</p>\n                </div>\n                <div class=\"col-xl-4 col-lg-6 col-md-6 col-12\">\n                    <form class=\"form-horizontal text-center\" role=\"form\" novalidate #loginForm=\"ngForm\" (ngSubmit)=\"loginUser(loginForm)\">\n                        <h3>Login</h3>\n                        <div class=\"form-group-3\">\n                            <input autocomplete=\"off\" [pattern]=\"emailPattern\" class=\"form-control\" placeholder=\"Username/Email\" id=\"email\" required [(ngModel)]=\"model.email\" name=\"email\" #input1 #email=\"ngModel\">\n                            <div *ngIf=\"email.errors && (email.dirty || email.touched)\" class=\"show-error\">\n                                <div [hidden]=\"!email.errors.required\">\n                                    Please enter email.\n                                </div>\n                                <div [hidden]=\"!email.errors.pattern\">\n                                    Please enter valid email.\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"form-group-3\">\n                            <input autocomplete=\"off\" type=\"password\" class=\"form-control\" placeholder=\"Password\" minlength=\"8\" id=\"password\" required [(ngModel)]=\"model.password\" name=\"password\" #password=\"ngModel\">\n                            <div *ngIf=\"password.errors && (password.dirty || password.touched)\" class=\"show-error\">\n                                <div [hidden]=\"!password.errors.required\">\n                                    Please enter password.\n                                </div>\n                                <div [hidden]=\"!password.errors.minlength\">\n                                    Password's length must be at least {{8-model.password.length}}.\n                                </div>\n                            </div>\n                        </div>\n                        <a class=\"fgt-pswd\" href=\"/forgot-password\">Forgot Password?</a>\n                        <div class=\"btn-cont text-right\">\n                            <button type=\"submit\" [disabled]=\"loginForm.invalid\" class=\"btn btn-primary login-btn mgt-50\">LOGIN</button>\n                        </div>\n\n                        <p class=\"text-center\">By login you are agree to <a href=\"javascript://\"> Terms & Condition </a>\n                        and <a href=\"javascript://\"> Privacy Policy</a> of Nequore.</p>\n                    </form>\n                </div>\n            </div>\n        </div>\n    </div>\n</section>"

/***/ }),

/***/ "../../../../../src/app/layout/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__ = __webpack_require__("../../../../ngx-sweetalert2/index.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginComponent = (function () {
    function LoginComponent(router, admin, swal) {
        this.router = router;
        this.admin = admin;
        this.swal = swal;
        this.model = {
            email: '',
            password: ''
        };
        this.parameter = {};
        this.emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
        this.parameter.loading = false;
    }
    LoginComponent.prototype.ngOnInit = function () { };
    LoginComponent.prototype.ngAfterViewInit = function () {
        this.input1.nativeElement.focus();
    };
    LoginComponent.prototype.loginUser = function (formData) {
        var _this = this;
        this.parameter.loading = true;
        var email = formData.value.email;
        var password = formData.value.password;
        this.admin.adminLogin(email, password)
            .subscribe(function (success) {
            console.log('---', success);
            _this.admin.setUserLoggedIn();
            // this.router.navigate(['dashboard']);
            _this.router.navigate(['dashboard/view-inhouse-users/data-collectors']);
            _this.parameter.loading = false;
        }, function (error) {
            console.log('---', error);
            _this.parameter.loading = false;
            _this.swal.error({
                title: 'Error',
                text: error.message,
            });
        });
    };
    return LoginComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('input1'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object)
], LoginComponent.prototype, "input1", void 0);
LoginComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-login',
        template: __webpack_require__("../../../../../src/app/layout/login/login.component.html"),
        styles: [__webpack_require__("../../../../../src/app/layout/login/login.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__["a" /* SweetAlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__["a" /* SweetAlertService */]) === "function" && _d || Object])
], LoginComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/settings/change-password/change-password.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/settings/change-password/change-password.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div class=\"page-heading\">\n    <div class=\"row\">\n        <div class=\"col-lg-6\">\n            <h1 class=\"page-title\">Settings</h1>\n            <ol class=\"breadcrumb\">\n                <li class=\"breadcrumb-item\"><a routerLink=\"/dashboard\">Home</a></li>\n                <li class=\"breadcrumb-item active\">Change Password</li>\n            </ol>\n        </div>\n    </div>\n</div>\n      \n      <div class=\"page-content fade-in-up\">\n        \n        <ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n        \n        <div class=\"ibox\">\n          <div class=\"ibox-body\">\n            <form class=\"form-horizontal\" novalidate #addForm=\"ngForm\" (ngSubmit)=\"changePassword(addForm)\">\n              <ul class=\"nav nav-tabs tabs-line\" style=\"margin-bottom:30px;\">\n                <li class=\"nav-item\"><a class=\"nav-link active\" data-toggle=\"tab\">Change Password</a></li>\n              </ul>\n              <div class=\"tab-content\">\n                <div class=\"tab-pane fade active\">\n                \n                    <div class=\"form-group row\">\n                      <label class=\"col-sm-2 col-form-label\">Old Password:</label>\n\n                      <div class=\"col-sm-10\">\n                        <input autocomplete=\"off\" type=\"password\" class=\"form-control\" placeholder=\"Old Password\" minlength=\"6\" id=\"oldPassword\" required [(ngModel)]=\"model.oldPassword\" name=\"oldPassword\" #oldPassword=\"ngModel\">\n      \n                        <div *ngIf=\"oldPassword.errors && (oldPassword.dirty || oldPassword.touched)\" class=\"show-error\">\n                            <div [hidden]=\"!oldPassword.errors.required\">\n                                Old Password is required!\n                            </div>\n                            <div [hidden]=\"!oldPassword.errors.minlength\">\n                                Old Password's length must be at least {{6-model.oldPassword.length}}.\n                            </div>\n                        </div>\n                      </div>\n                  </div>\n\n                    <div class=\"form-group row\">\n                      <label class=\"col-sm-2 col-form-label\">New Password:</label>\n\n                      <div class=\"col-sm-10\">\n                        <input type=\"password\" class=\"form-control\" placeholder=\"New Password\" minlength=\"6\" id=\"newPassword\" required [(ngModel)]=\"model.newPassword\" name=\"newPassword\" #newPassword=\"ngModel\">\n      \n                        <div *ngIf=\"newPassword.errors && (newPassword.dirty || newPassword.touched)\" class=\"show-error\">\n                            <div [hidden]=\"!newPassword.errors.required\">\n                                New Password is required!\n                            </div>\n                            <div [hidden]=\"!newPassword.errors.minlength\">\n                                New Password's length must be at least {{6-model.newPassword.length}}.\n                            </div>\n                        </div>\n                      </div>\n                  </div>\n\n                  <div class=\"d-flex justify-content-end btn-right\">\n                    <button [disabled]=\"addForm.invalid\" class=\"btn btn-info\" type=\"submit\">Update Password</button>\n                  </div>\n                </div>\n      \n              </div>\n            </form>\n          </div>\n        </div>\n      </div>"

/***/ }),

/***/ "../../../../../src/app/layout/settings/change-password/change-password.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__ = __webpack_require__("../../../../ngx-sweetalert2/index.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChangePasswordComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ChangePasswordComponent = (function () {
    function ChangePasswordComponent(router, admin, swal) {
        this.router = router;
        this.admin = admin;
        this.swal = swal;
        this.parameter = {};
        this.model = {
            oldPassword: '',
            newPassword: ''
        };
    }
    ChangePasswordComponent.prototype.ngOnInit = function () { };
    ChangePasswordComponent.prototype.changePassword = function (formData) {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'changePassword';
        var input = new FormData();
        input.append('oldPassword', formData.value.oldPassword);
        input.append('newPassword', formData.value.newPassword);
        this.admin.putDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.parameter.loading = false;
            _this.swal.success({
                title: 'Success',
                text: 'Password is changed successfully!'
            });
            localStorage.removeItem('accessToken');
            localStorage.removeItem('countryCode');
            localStorage.removeItem('dialCode');
            localStorage.removeItem('helpAndSupportEmail');
            localStorage.removeItem('helpAndSupportPhone');
            _this.admin.unsetUserLoggedIn();
            _this.router.navigate(['']);
        }, function (error) {
            _this.parameter.loading = false;
            if (error.statusCode == 401)
                _this.router.navigate(['']);
            else
                _this.swal.warning({ text: error.message });
        });
    };
    return ChangePasswordComponent;
}());
ChangePasswordComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-change-password',
        template: __webpack_require__("../../../../../src/app/layout/settings/change-password/change-password.component.html"),
        styles: [__webpack_require__("../../../../../src/app/layout/settings/change-password/change-password.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__["a" /* SweetAlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__["a" /* SweetAlertService */]) === "function" && _c || Object])
], ChangePasswordComponent);

var _a, _b, _c;
//# sourceMappingURL=change-password.component.js.map

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
        // this.admin.loginData$
        // this.model.countryCode = localStorage.getItem('countryCode')
        // this.model.dialCode = localStorage.getItem('dialCode')
        // this.model.helpAndSupportPhone = localStorage.getItem('helpAndSupportPhone')
        // this.model.helpAndSupportEmail = localStorage.getItem('helpAndSupportEmail')
        // this.initialCountry = {initialCountry: this.model.countryCode}
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
            var input = new FormData();
            _this.admin.login.next(success.data);
            _this.swal.success({
                title: 'Success',
                text: 'Details updated successfully!'
            });
        }, function (error) {
            _this.parameter.loading = false;
            if (error.statusCode === 401)
                _this.router.navigate(['']);
            else
                _this.swal.warning({ text: error.message });
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
        if (keyword)
            input.append('keyword', keyword);
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('countries', success);
            _this.parameter.loading = false;
            _this.parameter.countries = success.data;
            _this.parameter.countryCount = success.data.length;
            if (_this.parameter.countries.length != 0) {
                _this.parameter.country_id = _this.parameter.countries[0].id;
                _this.getStates(_this.parameter.countries[0].id, '');
            }
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
    LocalityComponent.prototype.getStates = function (country_id, keyword) {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'country/getStates';
        this.parameter.country_id = country_id;
        var input = new FormData();
        input.append('country_id', country_id);
        if (keyword)
            input.append('keyword', keyword);
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
            if (error.statusCode == 401)
                _this.router.navigate(['']);
            else
                _this.swal.warning({
                    // title: 'Internet Connection',
                    text: error.messages,
                });
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
        if (keyword)
            input.append('keyword', keyword);
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
            if (error.statusCode == 401)
                _this.router.navigate(['']);
            else
                _this.swal.warning({
                    // title: 'Internet Connection',
                    text: error.messages,
                });
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
        if (keyword)
            input.append('keyword', keyword);
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
            if (error.statusCode == 401)
                _this.router.navigate(['']);
            else
                _this.swal.warning({
                    // title: 'Internet Connection',
                    text: error.messages,
                });
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
                        //console.log(poly_coordinates);
                        var polygon = poly_coordinates.map(function (ll) {
                            //console.log(ll);
                            var latlng = ll.split(',');
                            var coord = new google.maps.LatLng(parseFloat(latlng[0]), parseFloat(latlng[1]));
                            //console.log(coord);
                            return coord;
                        });
                        //this.setSelection(polygon);
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
                        if (all_overlays_index == 0)
                            _this.setSelection(singlePolygon, locality.id);
                        all_overlays_index++;
                        //this.all_overlays.push(singlePolygon);
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
                                //google.maps.drawing.OverlayType.MARKER,
                                //google.maps.drawing.OverlayType.CIRCLE,
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
                        //this.all_overlays = this.all_overlays;
                        if (event.type !== google.maps.drawing.OverlayType.MARKER) {
                            drawingManager.setDrawingMode(null);
                            //Write code to select the newly selected object.
                            var newShape_1 = event.overlay;
                            newShape_1.type = event.type;
                            google.maps.event.addListener(newShape_1, 'click', function () {
                                _this.setSelection(newShape_1);
                            });
                            _this.setSelection(newShape_1);
                        }
                    });
                    //var centerControlDiv = document.createElement('div');
                    //    var centerControl = new centerControl(centerControlDiv, map);
                    //var centerControl = this.CenterControl(centerControlDiv, map);
                    //centerControlDiv.index = 1;
                    //map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(centerControlDiv);
                });
            }
        });
    };
    LocalityComponent.prototype.checkIfLocalitySpanishNameEntered = function (name_en, name_es, price_per_sqft) {
        var self = this;
        if (name_es == '') {
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
        //console.log('IN');
        var coordinates_array = [];
        var len = newShape.getPath().getLength();
        for (var i = 0; i < len; i++) {
            //console.log(newShape.getPath().getAt(i).toUrlValue(6));
            coordinates_array.push(newShape.getPath().getAt(i).toUrlValue(6));
        }
        //console.log(coordinates_array);
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
        //console.log(coords);
        //var center = new google.maps.LatLngBounds(shape).getCenter();
        //let center = shape.my_getBounds().getCenter()
        this.map.setCenter(coord);
        //google.maps.event.addListener(selectedShape.getPath(), 'insert_at', getPolygonCoords(shape));
        //google.maps.event.addListener(shape.getPath(), 'set_at', this.getPolygonCoords(shape));
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
            //this.all_overlays.push(r.data);
            //this.getLocalities(this.parameter.city_id,'');
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

module.exports = "<!--content start-->\n<div class=\"container-fluid\">\n    <div class=\"breadcrumb-group\">\n      <h5>Settings</h5>\n      <nav class=\"breadcrumb\">\n          <a class=\"breadcrumb-item\" routerLink=\"/dashboard\">Home</a>\n          <a class=\"breadcrumb-item\">Settings</a>\n          <span class=\"breadcrumb-item active\">Location</span>\n      </nav>\n    </div>\n\n    <ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n    \n    <div class=\"white-bg\">\n      <div class=\"page-title\">\n          <h3>Location</h3>\n      </div>\n\n      <!-- add country -->\n      <div class=\"form-outer\">\n          <div class=\"inline-form-group\">\n          <div class=\"row\">\n              <div class=\"col-md-12\">\n                <label><strong>Country</strong></label>\n              </div>\n              <div class=\"col-lg-3 col-md-3 col-sm-6 col-6 table-search\">\n                  <input type=\"text\" (input)=\"getCountries($event.target.value)\" name=\"keyword\" placeholder=\"Search here\">\n              </div>\n              <div class=\"col-lg-2 col-md-3 col-sm-6 col-6\">\n                 <div class=\"form-group marginB0\">\n                    <!-- <label>Add Country</label> -->\n                    <div class=\"add-new\">\n                        <a class=\"btn\" href=\"javascript://\" (click)=\"openCountryModal(addCountryModal, '', '', '', '1', -1)\">+ Add New</a>\n                    </div>\n                 </div>\n              </div>\n           </div>\n           <hr>\n          </div>\n      </div>\n\n      <!-- list country -->\n      <div class=\"tabel-section padding40 paddingT0\">\n          <div class=\"table-responsive\">\n            <table class=\"table table-striped\">\n                <tr>\n                  <th style=\"width:80%; text-align:left;\">Country</th>\n                  <th style=\"width:20%\">Action</th>\n                </tr>\n                <tr *ngFor=\"let country of parameter.countries; let c=index\">\n                  <td class=\"text-left\">\n                    {{country.name_en}}\n                  </td>\n                  <td>\n                    <a title=\"Edit Country\" (click)=\"openCountryModal(addCountryModal, country.id, country.name_en, country.name_es, country.status, c)\" class=\"icon-block edit-icon\"><img src=\"./../../../../assets/img/edit.png\" alt=\"img\"></a>\n                    <a *ngIf=\"country.status == 1\" (click)=\"blockUnblockCountry(country.id, country.name_en, country.name_es, 0, c)\" title=\"Block Country\" class=\"icon-block block-icon\"><img src=\"./../../../../assets/img/unblock.png\" alt=\"img\"></a>\n                    <a *ngIf=\"country.status == 0\" (click)=\"blockUnblockCountry(country.id, country.name_en, country.name_es, 1, c)\" title=\"Unblock Country\" class=\"icon-block block-icon unblock-bg\"><img src=\"./../../../../assets/img/block.png\" alt=\"img\"></a>\n                  </td>\n                </tr>\n\n                <div *ngIf=\"parameter.countryCount == 0\">\n                  <p class=\"show-error\">\n                    {{constant.errorMsg.NO_COUNTRY_FOUND}}\n                  </p>\n                </div>\n            </table>\n          </div>\n      </div>\n\n      <!-- add state -->\n        <div class=\"form-outer marginT15\">\n          <div class=\"inline-form-group\">\n          <div class=\"row\">\n              <div class=\"col-md-12\">\n                <label><strong>State</strong></label>\n                <hr>\n              </div>\n              <div class=\"col-lg-3 col-md-3 col-sm-6 col-6\">\n                 <div class=\"form-group marginB0\">\n                    <label>Country</label>\n                    <select class=\"form-control\" (change)=\"getStates($event.target.value)\">\n                       <option *ngFor=\"let country of parameter.countries\" value=\"{{country.id}}\">{{country.name_en}}</option>\n                    </select>\n                 </div>\n              </div>\n              <div class=\"col-lg-2 col-md-3 col-sm-6 col-6\">\n                 <div class=\"form-group marginB0\">\n                    <label>Add State</label>\n                    <div class=\"add-new\">\n                        <a class=\"btn\" href=\"javascript://\" (click)=\"openStateModal(addStateModal, '', '', '', '', '1', -1)\">+ Add New</a>\n                    </div>\n                 </div>\n              </div>\n           </div>\n          </div>\n      </div>\n\n      <!-- list state -->\n      <div class=\"tabel-section padding40 paddingT0\">\n          <div class=\"table-responsive\">\n            <table class=\"table table-striped\">\n                <tr>\n                  <th style=\"width:80%; text-align:left;\">\n                      <div class=\"table-search\">\n                      <input type=\"Search here\" (input)=\"getStates(parameter.country_id, $event.target.value)\" name=\"\" placeholder=\"Search here\">\n                      </div>\n                  </th>\n                  <th style=\"width:20%\">Action</th>\n                </tr>\n                <tr *ngFor=\"let state of parameter.states; let s = index\">\n                \n                  <td class=\"text-left\">\n                    {{state.name_en}}\n                  </td>\n                <td>\n                      <a href=\"javascript://\" (click)=\"openStateModal(addStateModal, state.country_id, state.id, state.name_en, state.name_es, state.status, s)\" title=\"Edit State\" class=\"icon-block edit-icon\"><img src=\"./../../../../assets/img/edit.png\" alt=\"img\"></a>\n                      <a *ngIf=\"state.status == 1\" (click)=\"blockUnblockState(state.country_id, state.name_en, state.name_es, 0, state.id, s)\" title=\"Block State\" class=\"icon-block block-icon\"><img src=\"./../../../../assets/img/unblock.png\" alt=\"img\"></a>\n                      <a *ngIf=\"state.status == 0\" (click)=\"blockUnblockState(state.country_id, state.name_en, state.name_es, 1, state.id, s)\" title=\"Unblock State\" class=\"icon-block block-icon unblock-bg\"><img src=\"./../../../../assets/img/block.png\" alt=\"img\"></a>\n                  </td>\n                </tr>\n\n                <div *ngIf=\"parameter.stateCount == 0\">\n                  <p class=\"show-error\">\n                    {{constant.errorMsg.NO_STATE_FOUND}}\n                  </p>\n                </div>\n            </table>\n          </div>\n      </div>\n      \n\n      <!-- add city -->\n      <div class=\"form-outer marginT15\">\n        <div class=\"inline-form-group\">\n          <div class=\"row\">\n            <div class=\"col-md-12\">\n              <label><strong>City</strong></label>\n              <hr>\n            </div>\n            <div class=\"col-lg-3 col-md-3 col-sm-6 col-6\">\n               <div class=\"form-group marginB0\">\n                  <label>Country</label>\n                  <select class=\"form-control\" (change)=\"getStates($event.target.value)\">\n                    <option *ngFor=\"let country of parameter.countries\" value=\"{{country.id}}\">{{country.name_en}}</option>\n                 </select>\n               </div>\n            </div>\n            <div class=\"col-lg-3 col-md-3 col-sm-6 col-6\">\n               <div class=\"form-group marginB0\">\n                  <label>State</label>\n                  <select class=\"form-control\" (change)=\"getCities($event.target.value)\">\n                    <option *ngFor=\"let state of parameter.states\" value=\"{{state.id}}\">{{state.name_en}}</option>\n                 </select>\n               </div>\n            </div>\n            <div class=\"col-lg-2 col-md-3 col-sm-6 col-6\">\n               <div class=\"form-group marginB0\">\n                  <label>Add City</label>\n                  <div class=\"add-new\">\n                      <a class=\"btn\" href=\"javascript://\" (click)=\"openCityModal(addCityModal, '', '', '', '', '', 1, -1)\">+ Add New</a>\n                  </div>\n               </div>\n            </div>\n         </div>\n        </div>\n    </div>\n\n    <!-- list city -->\n    <div class=\"tabel-section padding40 paddingT0\">\n        <div class=\"table-responsive\">\n          <table class=\"table table-striped\">\n              <tr>\n                \n                <th style=\"width:80%; text-align:left;\">\n                    <div class=\"table-search\">\n                    <input type=\"Search here\" (input)=\"getCities(parameter.state_id, $event.target.value)\" name=\"\" placeholder=\"Search here\">\n                    </div>\n                </th>\n                <th style=\"width:20%\">Action</th>\n              </tr>\n              <tr *ngFor=\"let city of parameter.cities; let ci=index\">\n              \n                <td class=\"text-left\">\n                  {{city.name_en}}\n                </td>\n              <td>\n                    <a href=\"javascript://\" (click)=\"openCityModal(addCityModal, city.country_id, city.state_id, city.id, city.name_en, city.name_es, city.status, ci)\" title=\"Edit City\" class=\"icon-block edit-icon\"><img src=\"./../../../../assets/img/edit.png\" alt=\"img\"></a>\n                    <a *ngIf=\"city.status == 1\" (click)=\"blockUnblockCity(city.state_id, city.name_en, city.name_es, 0, city.id, ci)\" title=\"Block City\" class=\"icon-block block-icon\"><img src=\"./../../../../assets/img/unblock.png\" alt=\"img\"></a>\n                    <a *ngIf=\"city.status == 0\" (click)=\"blockUnblockCity(city.state_id, city.name_en, city.name_es, 1, city.id, ci)\" title=\"Unblock City\" class=\"icon-block block-icon unblock-bg\"><img src=\"./../../../../assets/img/block.png\" alt=\"img\"></a>\n                </td>\n              </tr>\n\n              <div *ngIf=\"parameter.cityCount == 0\">\n                <p class=\"show-error\">\n                  {{constant.errorMsg.NO_CITY_FOUND}}\n                </p>\n              </div>\n          </table>\n        </div>\n    </div>\n    \n\n\n      <!-- add locality -->\n      <!-- <div class=\"form-outer marginT15\">\n        <div class=\"inline-form-group\">\n          <div class=\"row\">\n            <div class=\"col-md-12\">\n              <label><strong>Locality</strong></label>\n              <hr>\n            </div>\n            <div class=\"col-lg-3 col-md-3 col-sm-6 col-6\">\n               <div class=\"form-group marginB0\">\n                  <label>Country</label>\n                  <select class=\"form-control\" (change)=\"getStates($event.target.value)\">\n                    <option *ngFor=\"let country of parameter.countries\" value=\"{{country.id}}\">{{country.name_en}}</option>\n                 </select>\n               </div>\n            </div>\n            <div class=\"col-lg-3 col-md-3 col-sm-6 col-6\">\n               <div class=\"form-group marginB0\">\n                  <label>State</label>\n                  <select class=\"form-control\" (change)=\"getCities($event.target.value)\">\n                    <option *ngFor=\"let state of parameter.states\" value=\"{{state.id}}\">{{state.name_en}}</option>\n                 </select>\n               </div>\n            </div>\n            <div class=\"col-lg-2 col-md-3 col-sm-6 col-6\">\n               <div class=\"form-group marginB0\">\n                  <label>Add Locality</label>\n                  <div class=\"add-new\">\n                      <a class=\"btn\" href=\"javascript://\" routerLink=\"/dashboard/locality\">+ Add New</a>\n                  </div>\n               </div>\n            </div>\n         </div>\n        </div>\n    </div> -->\n\n    <!-- list locality -->\n    <!-- <div class=\"tabel-section padding40 paddingT0\">\n        <div class=\"table-responsive\">\n          <table class=\"table table-striped\">\n              <tr>\n                \n                <th style=\"width:80%; text-align:left;\">\n                    <div class=\"table-search\">\n                    <input type=\"Search here\" (input)=\"getLocalities(parameter.city_id, $event.target.value)\" name=\"\" placeholder=\"Search here\">\n                    </div>\n                </th>\n                <th style=\"width:20%\">Action</th>\n              </tr>\n              <tr *ngFor=\"let locality of parameter.localities\">\n              \n                <td class=\"text-left\">\n                  {{locality.name_en}}\n                </td>\n              <td>\n                    <a href=\"javascript://\" (click)=\"openCityModal(addCityModal, locality.country_id, locality.state_id, locality.id, locality.name_en, city.name_es)\" title=\"Edit City\" class=\"icon-block edit-icon\"><img src=\"./../../../../assets/img/edit.png\" alt=\"img\"></a>\n                    <a *ngIf=\"locality.status == 1\" (click)=\"blockUnblockCity(locality.state_id, locality.name_en, locality.name_es, 0, locality.id)\" title=\"Block City\" class=\"icon-block block-icon\"><img src=\"./../../../../assets/img/unblock.png\" alt=\"img\"></a>\n                    <a *ngIf=\"locality.status == 0\" (click)=\"blockUnblockCity(locality.state_id, locality.name_en, locality.name_es, 1, locality.id)\" title=\"Unblock City\" class=\"icon-block block-icon unblock-bg\"><img src=\"./../../../../assets/img/block.png\" alt=\"img\"></a>\n                </td>\n              </tr>\n\n              <div *ngIf=\"parameter.cityCount == 0\">\n                <p class=\"show-error\">\n                  {{constant.errorMsg.NO_CITY_FOUND}}\n                </p>\n              </div>\n          </table>\n        </div>\n    </div>\n     -->\n    </div>\n</div>\n<!--content end-->\n\n\n<!-- add country modal -->\n<ng-template #addCountryModal>\n  <div class=\"modal-content\">\n    <div class=\"modal-header my-modal-header\">\n      <h4 class=\"modal-title\">Add Country</h4>\n      <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <form class=\"form-horizontal my-modal-form\" role=\"form\" novalidate #addForm=\"ngForm\" (ngSubmit)=\"checkIfCountrySpanishNameEntered(addForm.value.name_en, addForm.value.name_es)\">\n      <div class=\"modal-body my-modal-body\">\n        <div class=\"form-group\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"Country (English)\" id=\"name_en\" required [(ngModel)]=\"location.countryModel.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n          <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-error\">\n              <div [hidden]=\"!name_en.errors.required\">\n                {{constant.errorMsg.COUNTRY_NAME_REQUIRED}}\n              </div>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <!-- <input type=\"text\" class=\"form-control\" placeholder=\"Country (Spanish)\" id=\"name_es\" required [(ngModel)]=\"location.countryModel.name_es\" name=\"name_es\" #name_es=\"ngModel\">\n          <div *ngIf=\"name_es.errors && (name_es.dirty || name_es.touched)\" class=\"show-error\">\n              <div [hidden]=\"!name_es.errors.required\">\n                {{constant.errorMsg.COUNTRY_NAME_REQUIRED}}\n              </div>\n          </div> -->\n          <input type=\"text\" class=\"form-control\" placeholder=\"Country (Spanish)\" [(ngModel)]=\"location.countryModel.name_es\" name=\"name_es\">\n        </div>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"submit\" [disabled]=\"addForm.invalid\" class=\"btn btn-info\">Submit</button>\n        <button type=\"button\" class=\"btn btn-default\" aria-label=\"Close\" (click)=\"modalRef.hide()\">Close</button>\n      </div>\n    </form>\n  </div>\n</ng-template>\n\n\n<!-- add state modal -->\n<ng-template #addStateModal>\n  <div class=\"modal-content\">\n    <div class=\"modal-header my-modal-header\">\n      <h4 class=\"modal-title\">Add State</h4>\n      <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <form class=\"form-horizontal my-modal-form\" role=\"form\" novalidate #addForm=\"ngForm\" (ngSubmit)=\"checkIfStateSpanishNameEntered(addForm.value.country_id, addForm.value.name_en, addForm.value.name_es)\">\n      <div class=\"modal-body my-modal-body\">\n        <div class=\"form-group\">\n          <select title=\"Select Country\" id=\"country_id\" required [(ngModel)]=\"location.stateModel.country_id\" name=\"country_id\" #country_id=\"ngModel\" class=\"form-control\" required>\n            <option value=\"\" disabled>Select Country</option>\n            <option *ngFor=\"let c of parameter.countries\" value=\"{{c.id}}\">{{c.name}}</option>\n          </select>\n          <div *ngIf=\"country_id.errors && (country_id.dirty || country_id.touched)\" class=\"show-error\">\n            <div [hidden]=\"!country_id.errors.required\">\n              {{constant.errorMsg.COUNTRY_NAME_REQUIRED}}\n            </div>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"State (English)\" id=\"name_en\" required [(ngModel)]=\"location.stateModel.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n          <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-error\">\n              <div [hidden]=\"!name_en.errors.required\">\n                {{constant.errorMsg.STATE_NAME_REQUIRED}}\n              </div>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <!-- <input type=\"text\" class=\"form-control\" placeholder=\"State (Spanish)\" id=\"name_es\" required [(ngModel)]=\"location.countryModel.name_es\" name=\"name_es\" #name_es=\"ngModel\">\n          <div *ngIf=\"name_es.errors && (name_es.dirty || name_es.touched)\" class=\"show-error\">\n              <div [hidden]=\"!name_es.errors.required\">\n                {{constant.errorMsg.STATE_NAME_REQUIRED}}\n              </div>\n          </div> -->\n          <input type=\"text\" class=\"form-control\" placeholder=\"State (Spanish)\" [(ngModel)]=\"location.stateModel.name_es\" name=\"name_es\">\n        </div>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"submit\" [disabled]=\"addForm.invalid\" class=\"btn btn-info\">Submit</button>\n        <button type=\"button\" class=\"btn btn-default\" aria-label=\"Close\" (click)=\"modalRef.hide()\">Close</button>\n      </div>\n    </form>\n  </div>\n</ng-template>\n\n\n<!-- add city modal -->\n<ng-template #addCityModal>\n  <div class=\"modal-content\">\n    <div class=\"modal-header my-modal-header\">\n      <h4 class=\"modal-title\">Add City</h4>\n      <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <form class=\"form-horizontal my-modal-form\" role=\"form\" novalidate #addForm=\"ngForm\" (ngSubmit)=\"checkIfCitySpanishNameEntered(addForm.value.state_id, addForm.value.name_en, addForm.value.name_es)\">\n      <div class=\"modal-body my-modal-body\">\n        <div class=\"form-group\" *ngIf=\"location.cityModel.city_id == ''\">\n          <select title=\"Select Country\" id=\"country_id\" (change)=\"getStates($event.target.value)\" required [(ngModel)]=\"location.cityModel.country_id\" name=\"country_id\" #country_id=\"ngModel\" class=\"form-control\" required>\n            <option value=\"\" disabled>Select Country</option>\n            <option *ngFor=\"let c of parameter.countries\" value=\"{{c.id}}\">{{c.name}}</option>\n          </select>\n          <div *ngIf=\"country_id.errors && (country_id.dirty || country_id.touched)\" class=\"show-error\">\n            <div [hidden]=\"!country_id.errors.required\">\n              {{constant.errorMsg.COUNTRY_NAME_REQUIRED}}\n            </div>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <select title=\"Select State\" id=\"state_id\" required [(ngModel)]=\"location.cityModel.state_id\" name=\"state_id\" #state_id=\"ngModel\" class=\"form-control\" required>\n            <option value=\"\" disabled>Select State</option>\n            <option *ngFor=\"let s of parameter.states\" value=\"{{s.id}}\">{{s.name}}</option>\n          </select>\n          <div *ngIf=\"state_id.errors && (state_id.dirty || state_id.touched)\" class=\"show-error\">\n            <div [hidden]=\"!state_id.errors.required\">\n              {{constant.errorMsg.STATE_NAME_REQUIRED}}\n            </div>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"City (English)\" id=\"name_en\" required [(ngModel)]=\"location.cityModel.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n          <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-error\">\n              <div [hidden]=\"!name_en.errors.required\">\n                {{constant.errorMsg.CITY_NAME_REQUIRED}}\n              </div>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <!-- <input type=\"text\" class=\"form-control\" placeholder=\"State (Spanish)\" id=\"name_es\" required [(ngModel)]=\"location.countryModel.name_es\" name=\"name_es\" #name_es=\"ngModel\">\n          <div *ngIf=\"name_es.errors && (name_es.dirty || name_es.touched)\" class=\"show-error\">\n              <div [hidden]=\"!name_es.errors.required\">\n                {{constant.errorMsg.CITY_NAME_REQUIRED}}\n              </div>\n          </div> -->\n          <input type=\"text\" class=\"form-control\" placeholder=\"City (Spanish)\" [(ngModel)]=\"location.cityModel.name_es\" name=\"name_es\">\n        </div>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"submit\" [disabled]=\"addForm.invalid\" class=\"btn btn-info\">Submit</button>\n        <button type=\"button\" class=\"btn btn-default\" aria-label=\"Close\" (click)=\"modalRef.hide()\">Close</button>\n      </div>\n    </form>\n  </div>\n</ng-template>\n\n\n<!-- add city modal -->\n<ng-template #addLocalityModal>\n  <div class=\"modal-content\">\n    <div class=\"modal-header my-modal-header\">\n      <h4 class=\"modal-title\">Add Locality</h4>\n      <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <form class=\"form-horizontal my-modal-form\" role=\"form\" novalidate #addForm=\"ngForm\" (ngSubmit)=\"checkIfCitySpanishNameEntered(addForm.value.state_id, addForm.value.name_en, addForm.value.name_es)\">\n      <div class=\"modal-body my-modal-body\">\n        <div class=\"form-group\" *ngIf=\"location.cityModel.city_id == ''\">\n          <select title=\"Select Country\" id=\"country_id\" (change)=\"getStates($event.target.value)\" required [(ngModel)]=\"location.cityModel.country_id\" name=\"country_id\" #country_id=\"ngModel\" class=\"form-control\" required>\n            <option value=\"\" disabled>Select Country</option>\n            <option *ngFor=\"let c of parameter.countries\" value=\"{{c.id}}\">{{c.name}}</option>\n          </select>\n          <div *ngIf=\"country_id.errors && (country_id.dirty || country_id.touched)\" class=\"show-error\">\n            <div [hidden]=\"!country_id.errors.required\">\n              {{constant.errorMsg.COUNTRY_NAME_REQUIRED}}\n            </div>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <select title=\"Select State\" id=\"state_id\" required [(ngModel)]=\"location.cityModel.state_id\" name=\"state_id\" #state_id=\"ngModel\" class=\"form-control\" required>\n            <option value=\"\" disabled>Select State</option>\n            <option *ngFor=\"let s of parameter.states\" value=\"{{s.id}}\">{{s.name}}</option>\n          </select>\n          <div *ngIf=\"state_id.errors && (state_id.dirty || state_id.touched)\" class=\"show-error\">\n            <div [hidden]=\"!state_id.errors.required\">\n              {{constant.errorMsg.STATE_NAME_REQUIRED}}\n            </div>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"City (English)\" id=\"name_en\" required [(ngModel)]=\"location.cityModel.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n          <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-error\">\n              <div [hidden]=\"!name_en.errors.required\">\n                {{constant.errorMsg.CITY_NAME_REQUIRED}}\n              </div>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <!-- <input type=\"text\" class=\"form-control\" placeholder=\"State (Spanish)\" id=\"name_es\" required [(ngModel)]=\"location.countryModel.name_es\" name=\"name_es\" #name_es=\"ngModel\">\n          <div *ngIf=\"name_es.errors && (name_es.dirty || name_es.touched)\" class=\"show-error\">\n              <div [hidden]=\"!name_es.errors.required\">\n                {{constant.errorMsg.CITY_NAME_REQUIRED}}\n              </div>\n          </div> -->\n          <input type=\"text\" class=\"form-control\" placeholder=\"City (Spanish)\" [(ngModel)]=\"location.cityModel.name_es\" name=\"name_es\">\n        </div>\n\n        <div style=\"height: 600px; width: 600px;\" #mapDiv></div>\n        \n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"submit\" [disabled]=\"addForm.invalid\" class=\"btn btn-info\">Submit</button>\n        <button type=\"button\" class=\"btn btn-default\" aria-label=\"Close\" (click)=\"modalRef.hide()\">Close</button>\n      </div>\n    </form>\n  </div>\n</ng-template>"

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
        if (keyword)
            input.append('keyword', keyword);
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('countries', success);
            _this.parameter.loading = false;
            _this.parameter.countries = success.data;
            _this.parameter.countryCount = success.data.length;
            if (_this.parameter.countries.length != 0) {
                _this.parameter.country_id = _this.parameter.countries[0].id;
                _this.getStates(_this.parameter.countries[0].id, '');
            }
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
    LocationComponent.prototype.getStates = function (country_id, keyword) {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'country/getStates';
        this.parameter.country_id = country_id;
        var input = new FormData();
        input.append('country_id', country_id);
        if (keyword)
            input.append('keyword', keyword);
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('states', success);
            _this.parameter.loading = false;
            _this.parameter.states = success.data;
            _this.parameter.stateCount = success.data.length;
            if (_this.parameter.states.length != 0) {
                _this.parameter.state_id = _this.parameter.states[0].id;
                _this.getCities(_this.parameter.states[0].id, '');
            }
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
    LocationComponent.prototype.getStatesWRTCountry = function (country_id, keyword) {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'country/getStates';
        this.parameter.country_id = country_id;
        var input = new FormData();
        input.append('country_id', country_id);
        if (keyword)
            input.append('keyword', keyword);
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('states', success);
            _this.parameter.loading = false;
            _this.parameter.states = success.data;
            _this.parameter.stateCount = success.data.length;
            if (_this.parameter.states.length != 0) {
                _this.parameter.state_id = _this.parameter.states[0].id;
                _this.getCities(_this.parameter.states[0].id, '');
            }
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
    LocationComponent.prototype.getCities = function (state_id, keyword) {
        var _this = this;
        console.log('mm', state_id, keyword);
        this.parameter.loading = true;
        this.parameter.url = 'getCities';
        this.parameter.state_id = state_id;
        var input = new FormData();
        input.append('state_id', state_id);
        if (keyword)
            input.append('keyword', keyword);
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('cities', success);
            _this.parameter.loading = false;
            _this.parameter.cities = success.data;
            _this.parameter.cityCount = success.data.length;
            if (_this.parameter.cities.length != 0) {
                _this.parameter.city_id = _this.parameter.cities[0].id;
                _this.getLocalities(_this.parameter.cities[0].id, '');
            }
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
    LocationComponent.prototype.getLocalities = function (city_id, keyword) {
        var _this = this;
        console.log('mm', city_id, keyword);
        this.parameter.loading = true;
        this.parameter.url = 'getLocalities';
        this.parameter.city_id = city_id;
        var input = new FormData();
        input.append('city_id', city_id);
        if (keyword)
            input.append('keyword', keyword);
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('cities', success);
            _this.parameter.loading = false;
            _this.parameter.localities = success.data;
            _this.parameter.localityCount = success.data.length;
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
    LocationComponent.prototype.checkIfCountrySpanishNameEntered = function (name_en, name_es) {
        if (name_es === void 0) { name_es = ''; }
        var self = this;
        if (name_es == '') {
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
        if (country_id == '')
            this.modalRef.hide(); // hide only when open
        this.parameter.loading = true;
        this.parameter.url = 'addCountry';
        var input = new FormData();
        input.append('name_es', name_es);
        input.append('name_en', name_en);
        input.append('status', status);
        if (this.location.countryModel.country_id)
            input.append('country_id', this.location.countryModel.country_id);
        else if (country_id)
            input.append('country_id', country_id);
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('success', success);
            _this.swal.success({
                title: 'Success',
                text: _this.location.countryModel.country_id || country_id ? _this.constant.successMsg.COUNTRY_UPDATED_SUCCESSFULLY : _this.constant.successMsg.COUNTRY_ADDED_SUCCESSFULLY,
            });
            _this.parameter.loading = false;
            // this.getCountries('');
            if (_this.parameter.index == -1)
                _this.parameter.countries.push(success.data);
            else
                _this.parameter.countries[_this.parameter.index] = success.data;
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
    LocationComponent.prototype.checkIfStateSpanishNameEntered = function (country_id, name_en, name_es) {
        if (name_es === void 0) { name_es = ''; }
        var self = this;
        if (name_es == '') {
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
        if (state_id == '')
            this.modalRef.hide();
        this.parameter.loading = true;
        this.parameter.url = 'country/addState';
        var input = new FormData();
        input.append('name_es', name_es);
        input.append('name_en', name_en);
        input.append('status', status);
        if (this.location.stateModel.country_id)
            input.append('country_id', this.location.stateModel.country_id); // edit
        else
            input.append('country_id', country_id); // add
        if (this.location.stateModel.state_id)
            input.append('state_id', this.location.stateModel.state_id);
        else if (state_id)
            input.append('state_id', state_id);
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('success1', success);
            _this.swal.success({
                title: 'Success',
                text: _this.location.stateModel.state_id || state_id ? _this.constant.successMsg.STATE_UPDATED_SUCCESSFULLY : _this.constant.successMsg.STATE_ADDED_SUCCESSFULLY,
            });
            _this.parameter.loading = false;
            // this.getStates(this.location.stateModel.country_id ? this.location.stateModel.country_id : country_id, '');
            if (_this.parameter.index == -1)
                _this.parameter.states.push(success.data);
            else
                _this.parameter.states[_this.parameter.index] = success.data;
            // formdata.reset();
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
    LocationComponent.prototype.checkIfCitySpanishNameEntered = function (state_id, name_en, name_es) {
        if (name_es === void 0) { name_es = ''; }
        var self = this;
        if (name_es == '') {
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
        if (this.location.cityModel.state_id)
            input.append('state_id', this.location.cityModel.state_id); // edit
        else
            input.append('state_id', state_id); // add
        if (this.location.cityModel.city_id)
            input.append('city_id', this.location.cityModel.city_id); // edit
        else if (city_id)
            input.append('city_id', city_id); // edit
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('success2', success);
            _this.swal.success({
                title: 'Success',
                text: _this.location.cityModel.city_id || city_id ? _this.constant.successMsg.CITY_UPDATED_SUCCESSFULLY : _this.constant.successMsg.CITY_ADDED_SUCCESSFULLY,
            });
            _this.parameter.loading = false;
            // this.getCities(this.location.cityModel.state_id, '');
            if (_this.parameter.index == -1)
                _this.parameter.cities.push(success.data);
            else
                _this.parameter.cities[_this.parameter.index] = success.data;
            // formdata.reset();
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
        if (type != 'add')
            this.modalRef.hide();
        this.parameter.loading = true;
        this.parameter.url = 'addPossessionStatus';
        var input = new FormData();
        input.append('name_en', name_en);
        input.append('name_es', name_es);
        input.append('status', status);
        if (id)
            input.append('id', id);
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('addPossessionStatus', success);
            _this.parameter.loading = false;
            _this.swal.success({
                title: 'Success',
                text: id ? _this.constant.successMsg.PROJECT_POSSESSION_UPDATED_SUCCESSFULLY : _this.constant.successMsg.PROJECT_POSSESSION_ADDED_SUCCESSFULLY,
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
        if (type != 'add')
            this.modalRef.hide();
        this.parameter.loading = true;
        this.parameter.url = 'addBuildingType';
        var input = new FormData();
        input.append('name_en', name_en);
        input.append('name_es', name_es);
        input.append('status', status);
        if (id)
            input.append('id', id);
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('addBuildingType', success);
            _this.parameter.loading = false;
            _this.swal.success({
                title: 'Success',
                text: id ? _this.constant.successMsg.PROJECT_TYPE_UPDATED_SUCCESSFULLY : _this.constant.successMsg.PROJECT_TYPE_ADDED_SUCCESSFULLY,
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
        if (type != 'add')
            this.modalRef.hide();
        var iconNew = this.icon ? this.icon : this.project.amenities.icon;
        console.log('mm', iconNew);
        this.parameter.loading = true;
        this.parameter.url = 'addAmenity';
        var input = new FormData();
        input.append('name_en', name_en);
        input.append('name_es', name_es);
        input.append('status', status);
        if (this.icon)
            input.append('icon', iconNew);
        if (id)
            input.append('id', id);
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
            if (error.statusCode == 401)
                _this.router.navigate(['']);
            else
                _this.swal.warning({
                    // title: 'Internet Connection',
                    text: error.messages,
                });
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
            if (error.statusCode == 401)
                _this.router.navigate(['']);
            else
                _this.swal.warning({
                    // title: 'Internet Connection',
                    text: error.messages,
                });
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
            if (error.statusCode == 401)
                _this.router.navigate(['']);
            else
                _this.swal.warning({
                    // title: 'Internet Connection',
                    text: error.messages,
                });
        });
    };
    ProjectComponent.prototype.addPossessionStatusPopup = function (id, name_en, name_es, status, type) {
        var self = this;
        this.swal.confirm({
            title: this.constant.title.ARE_YOU_SURE,
            text: status == 1 ? this.constant.title.UNBLOCK_PROJECT_POSSESSION : this.constant.title.BLOCK_PROJECT_POSSESSION,
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
            text: status == 1 ? this.constant.title.UNBLOCK_PROJECT_TYPE : this.constant.title.BLOCK_PROJECT_TYPE,
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
            text: status == 1 ? this.constant.title.UNBLOCK_AMENITY : this.constant.title.BLOCK_AMENITY,
        }).then(function () {
            self.addAmenity(id, icon, name_en, name_es, status, type);
        })
            .catch(function () {
            // console.log('Logout cancelled by user');
        });
    };
    ProjectComponent.prototype.checkIfPossessionSpanishNameEntered = function (id, name_en, name_es, status, type) {
        var self = this;
        if (name_es == '') {
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
        if (name_es == '') {
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
        if (name_es == '') {
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
        if (type != 'add')
            this.modalRef.hide();
        this.parameter.loading = true;
        this.parameter.url = 'addConfiguration';
        var input = new FormData();
        input.append('name_en', name_en);
        input.append('name_es', name_es);
        input.append('status', status);
        if (id)
            input.append('id', id);
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('addConfigurations', success);
            _this.parameter.loading = false;
            _this.swal.success({
                title: 'Success',
                text: id ? _this.constant.successMsg.PROPERTY_CONFIG_UPDATED_SUCCESSFULLY : _this.constant.successMsg.PROPERTY_CONFIG_ADDED_SUCCESSFULLY,
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
        if (type != 'add')
            this.modalRef.hide();
        this.parameter.loading = true;
        this.parameter.url = 'addPropertyType';
        var input = new FormData();
        input.append('name_en', name_en);
        input.append('name_es', name_es);
        input.append('status', status);
        if (id)
            input.append('id', id);
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('addPropertyType', success);
            _this.parameter.loading = false;
            _this.swal.success({
                title: 'Success',
                text: id ? _this.constant.successMsg.PROPERTY_TYPE_UPDATED_SUCCESSFULLY : _this.constant.successMsg.PROPERTY_TYPE_ADDED_SUCCESSFULLY,
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
        if (type != 'add')
            this.modalRef.hide();
        var iconNew = this.icon ? this.icon : this.property.amenities.icon;
        console.log('mm', iconNew);
        this.parameter.loading = true;
        this.parameter.url = 'addPropertyAmenity';
        var input = new FormData();
        input.append('name_en', name_en);
        input.append('name_es', name_es);
        input.append('status', status);
        if (this.icon)
            input.append('icon', iconNew);
        if (id)
            input.append('id', id);
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
            if (error.statusCode == 401)
                _this.router.navigate(['']);
            else
                _this.swal.warning({
                    // title: 'Internet Connection',
                    text: error.messages,
                });
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
            if (error.statusCode == 401)
                _this.router.navigate(['']);
            else
                _this.swal.warning({
                    // title: 'Internet Connection',
                    text: error.messages,
                });
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
            if (error.statusCode == 401)
                _this.router.navigate(['']);
            else
                _this.swal.warning({
                    // title: 'Internet Connection',
                    text: error.messages,
                });
        });
    };
    PropertyComponent.prototype.addPropertyConfigurationPopup = function (id, name_en, name_es, status, type) {
        var self = this;
        this.swal.confirm({
            title: this.constant.title.ARE_YOU_SURE,
            text: status == 1 ? this.constant.title.UNBLOCK_PROPERTY_CONFIG : this.constant.title.BLOCK_PROPERTY_CONFIG,
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
            text: status == 1 ? this.constant.title.UNBLOCK_PROPERTY_TYPE : this.constant.title.BLOCK_PROPERTY_TYPE,
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
            text: status == 1 ? this.constant.title.UNBLOCK_AMENITY : this.constant.title.BLOCK_AMENITY,
        }).then(function () {
            self.addAmenity(id, icon, name_en, name_es, status, type);
        })
            .catch(function () {
            // console.log('Logout cancelled by user');
        });
    };
    PropertyComponent.prototype.checkIfConfigSpanishNameEntered = function (id, name_en, name_es, status, type) {
        var self = this;
        if (name_es == '') {
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
        if (name_es == '') {
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
        if (name_es == '') {
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

/***/ "../../../../../src/app/layout/users/users.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/users/users.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container-fluid\">\n  <div class=\"row\">\n      <div class=\"col-md-6\">\n        <div class=\"title-group\">\n            <h5>Users</h5>\n            <p>Showing {{parameter.total}} out of {{parameter.total}}</p>\n        </div>\n      </div>\n      <div class=\"col-md-6\">\n        <div class=\"add-new text-right\">\n            <a class=\"btn\" href=\"javascript://\" data-toggle=\"modal\" data-target=\"#add\" #modalOpen>Add New</a>\n        </div>\n      </div>\n  </div>\n\n  <ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n\n  <div class=\"cust-tabs\">\n    <div class=\"row flex-wrap-reverse\">\n      <div class=\"col-xl-10 col-lg-12 col-md-12 col-sm-12 col-12\">\n        <ul class=\"nav nav-tabs\">\n          <li class=\"nav-item\">\n              <a class=\"nav-link active\" (click)=\"getBuyers(1, parameter.p, '', '', '')\" data-toggle=\"tab\" href=\"#approved\">BUYER</a>\n          </li>\n          <li class=\"nav-item\">\n              <a class=\"nav-link\" (click)=\"getBuyers(2, parameter.p, '', '', '')\" data-toggle=\"tab\" href=\"#unapproved\">SELLER</a>\n          </li>\n        </ul>\n      </div>\n    </div>\n\n    <div class=\"tab-content white-bg\">\n      <div class=\"tab-pane active\">\n        <div class=\"tabel-section\">\n          <div class=\"table-responsive\">\n            <table class=\"table table-striped table-align-left\">\n              <tr>\n                <th style=\"width:6%\">&nbsp;</th>\n                <th style=\"width:20%\">\n                  <div class=\"table-search\">\n                      <label>Name</label>\n                      <input type=\"Search here\" (input)=\"getBuyers(parameter.type, parameter.p, $event.target.value, parameter.phone, parameter.email)\" name=\"\">\n                  </div>\n                </th>\n                <th style=\"width:20%; text-align:left;\">\n                  <div class=\"table-search\">\n                      <label>Contact Number</label>\n                      <input type=\"Search here\" (input)=\"getBuyers(parameter.type, parameter.p, parameter.name, $event.target.value, parameter.email)\" name=\"\">\n                  </div>\n                </th>\n                <th style=\"width:20%\">\n                  <div class=\"table-search\">\n                      <label>Email Address</label>\n                      <input type=\"Search here\" (input)=\"getBuyers(parameter.type, parameter.p, parameter.name, parameter.phone, $event.target.value)\" name=\"\">\n                  </div>\n                </th>\n                <th style=\"width:20%; vertical-align: top;\">\n                  Building<a href=\"javascript://\"><img src=\"./../../../../assets/img/top-arrow.png\" alt=\"img\"></a>\n                </th>\n                <th style=\"width:14%\">\n                  &nbsp;\n                </th>\n              </tr>\n        \n              <tr *ngFor=\"let item of parameter.items| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.p, totalItems: parameter.total }\">\n                <td> \n                  <img *ngIf=\"item.image\" class=\"rounded-circle\" [src]=\"item.image\" alt=\"img\">\n                  <img *ngIf=\"!item.image\" class=\"rounded-circle\" src=\"./../../../assets/img/default_img.png\" alt=\"img\">\n                </td>\n                <td class=\"text-left\">\n                  <span class=\"name\">{{item.name}}</span>\n                </td>\n                <td class=\"text-left\" *ngIf=\"item.phone\">{{item.country_code}}-{{item.phone}}</td>\n                <td class=\"text-left\" *ngIf=\"!item.phone\">NA</td>\n                <td class=\"text-left\">{{item.email}}</td>\n                <td>14</td>\n                <td>\n                  <a href=\"javascript://\" (click)=\"editUser(item)\" class=\"icon-block edit-icon\"><img src=\"./../../../../assets/img/edit.png\" alt=\"img\"></a>\n                  <a href=\"javascript://\" *ngIf=\"item.is_blocked == 1\" (click)=\"blockUnblockPopup(i, item.id, 0, parameter.type)\" title=\"Unblock user\" class=\"icon-block block-icon unblock-bg\"><img src=\"./../../../../assets/img/block.png\" alt=\"img\"></a>\n                  <a href=\"javascript://\" *ngIf=\"item.is_blocked == 0\" (click)=\"blockUnblockPopup(i, item.id, 1, parameter.type)\" title=\"Block user\" class=\"icon-block block-icon\"><img src=\"./../../../../assets/img/unblock.png\" alt=\"img\"></a>\n                </td>\n              </tr>\n\n            </table>\n          </div>\n        </div>\n\n        <div class=\"center\" *ngIf=\"parameter.total == 0\">\n          <img src=\"./../../../assets/img/404-error.png\">\n        </div>\n\n        <div class=\"btn-cont text-right marginT15\" *ngIf=\"parameter.total\">\n          <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n        </div>\n      </div>\n      <!-- <div class=\"tab-pane container fade\" id=\"seller\">Seller tab on</div> -->\n    </div>\n  </div>\n</div>\n\n\n\n<!-- add inhouse user modal -->\n<div class=\"modal animated\" id=\"add\">\n  <div class=\"modal-dialog fadeIndown modal-lg\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #modalClose>&times;</button>\n      </div>\n\n      <form class=\"form-horizontal form-model0P\" role=\"form\" ngNativeValidate #addForm=\"ngForm\" (ngSubmit)=\"addNewUser(addForm)\">\n        <div class=\"modal-body\">\n          <div class=\"row\">\n            <div class=\"col-6\">\n              <div class=\"add-img\">\n              <input required accept=\"image/*\" name=\"image\" class=\"image\" (change)=\"changeListner($event)\" type=\"file\">\n              <label>+ Add Image</label>\n              </div>\n            </div>\n            <div class=\"col-6\">\n              <div class=\"btn-cont text-right\">\n                  <button *ngIf=\"model.id==''\" type=\"submit\" [disabled]=\"addForm.invalid\" class=\"btn btn-primary\">ADD</button>\n                  <button *ngIf=\"model.id!=''\" type=\"submit\" [disabled]=\"addForm.invalid\" class=\"btn btn-primary\">UPDATE</button>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"spacer40\"></div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                  <label>Name</label>\n                  <div class=\"form-group\">\n                  <input autocomplete=\"off\" type=\"text\" class=\"form-control\" required [(ngModel)]=\"model.name\" name=\"name\">\n                </div>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                  <label>Contact number</label>\n                  <div class=\"form-group\">\n                  <input minlength=\"6\" maxlength=\"16\" autocomplete=\"off\" type=\"text\" class=\"form-control\" id=\"phone\" required minlength=\"1\" [(ngModel)]=\"model.phone\" name=\"phone\"\n                        ng2TelInput [ng2TelInputOptions]=\"initialCountry\" (countryChange)=\"onCountryChange($event)\" />\n                </div>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                  <label>Email ID</label>\n                  <div class=\"form-group\">\n                  <input autocomplete=\"off\" type=\"email\" class=\"form-control\" required [(ngModel)]=\"model.email\" name=\"email\">\n                </div>\n              </div>\n            </div>\n            <!-- <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>User type</label>\n                <select title=\"Choose user type\" [(ngModel)]=\"model.user_type\" name=\"user_type\" class=\"form-control\">\n                  <option value=\"buyer\">Buyer</option>\n                  <option value=\"seller\">Seller</option>\n                </select>\n              </div>\n            </div>\n            <div class=\"col-12\" *ngIf=\"model.user_type == 'seller'\">\n              <div class=\"form-group-2\">\n                <label>Interested In</label>\n                <select title=\"Choose user type\" name=\"interested_in\" class=\"form-control\">\n                  <option value=\"buyer\">Buyer</option>\n                  <option value=\"seller\">Seller</option>\n                </select>\n              </div>\n            </div> -->\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/layout/users/users.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__ = __webpack_require__("../../../../ngx-sweetalert2/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_users_model__ = __webpack_require__("../../../../../src/app/models/users.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var UsersComponent = (function () {
    function UsersComponent(constant, model, element, route, admin, router, swal) {
        this.constant = constant;
        this.model = model;
        this.element = element;
        this.route = route;
        this.admin = admin;
        this.router = router;
        this.swal = swal;
        this.parameter = {};
    }
    UsersComponent.prototype.ngOnInit = function () {
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.p = this.constant.p;
        this.model.id = '';
        this.initialCountry = { initialCountry: 'mx' };
        this.getBuyers(1, this.parameter.p, '', '', '');
    };
    UsersComponent.prototype.getBuyers = function (type, page, name, phone, email) {
        var _this = this;
        this.parameter.p = page;
        this.parameter.type = type;
        this.parameter.name = name;
        this.parameter.phone = phone;
        this.parameter.email = email;
        this.parameter.loading = true;
        this.parameter.url = this.parameter.type == 1 ? 'getBuyers' : 'getSellers';
        var input = new FormData();
        input.append('page', this.parameter.p.toString());
        if (this.parameter.name)
            input.append('name', this.parameter.name);
        if (this.parameter.phone)
            input.append('phone', this.parameter.phone);
        if (this.parameter.email)
            input.append('email', this.parameter.email);
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('getBuyers', success);
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
    UsersComponent.prototype.changeListner = function (event) {
        var reader = new FileReader();
        var image = this.element.nativeElement.querySelector('.image');
        this.parameter.image = event.target.files[0];
        this.parameter.icon = this.parameter.image;
        reader.onload = function (e) {
            var src = e.target['result'];
            image.src = src;
        };
        reader.readAsDataURL(event.target.files[0]);
    };
    UsersComponent.prototype.onCountryChange = function (e) {
        console.log('eeee', e);
        this.model.country_code = e.dialCode;
        this.initialCountry = { initialCountry: e.iso2 };
    };
    UsersComponent.prototype.addNewUser = function (formdata) {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = this.model.id != '' ? 'updateNewUser' : 'addSeller';
        console.log(formdata);
        var input = new FormData();
        if (this.model.id != '')
            input.append('id', this.model.id);
        input.append('name', formdata.value.name);
        input.append('country_code', '+' + this.model.country_code);
        input.append('phone', formdata.value.phone);
        input.append('image', this.parameter.image);
        input.append('email', formdata.value.email);
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('success', success);
            _this.parameter.loading = false;
            if (success.success == 0) {
                _this.swal.error({
                    title: 'Error',
                    text: success.message
                });
            }
            else {
                _this.modalClose.nativeElement.click();
                formdata.reset();
                _this.swal.success({
                    title: 'Success',
                    text: _this.model.id == '' ? 'Added successfully.' : 'Updated successfully.'
                });
            }
            // console.log('user add',success)
        }, function (error) {
            console.log(error);
            _this.parameter.loading = false;
            _this.swal.error({
                title: 'Error',
                text: error.message,
            });
        });
    };
    return UsersComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('modalOpen'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object)
], UsersComponent.prototype, "modalOpen", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('modalClose'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _b || Object)
], UsersComponent.prototype, "modalClose", void 0);
UsersComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-users',
        template: __webpack_require__("../../../../../src/app/layout/users/users.component.html"),
        styles: [__webpack_require__("../../../../../src/app/layout/users/users.component.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_4__models_users_model__["a" /* Users */], __WEBPACK_IMPORTED_MODULE_5__common_constants__["a" /* Constant */]]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__common_constants__["a" /* Constant */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__models_users_model__["a" /* Users */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__models_users_model__["a" /* Users */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__["a" /* SweetAlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__["a" /* SweetAlertService */]) === "function" && _j || Object])
], UsersComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j;
//# sourceMappingURL=users.component.js.map

/***/ }),

/***/ "../../../../../src/app/models/dashboard.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardModel; });
var DashboardModel = (function () {
    function DashboardModel() {
        this.dashboardModel = {
            category: 0,
            user: 0,
            post: 0,
            order: 0,
            returned_with_damaged: 0,
            not_returned: 0
        };
    }
    return DashboardModel;
}());

//# sourceMappingURL=dashboard.model.js.map

/***/ }),

/***/ "../../../../../src/app/models/inhouse-users.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InhouseUsers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return user; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return address; });
var InhouseUsers = (function () {
    function InhouseUsers() {
        this.address = [
            {
                countries: '',
                states: '',
                cities: '',
                localities: ''
            }
        ];
        this.userModel = {
            id: '',
            name: '',
            country_code: '52',
            phone: '',
            image: '',
            email: '',
            address: this.address,
            is_broker_seller_dev: false,
            is_buyer_renter: false,
            is_broker: false,
            is_data_collector: false,
            is_csr_closer: false
        };
    }
    return InhouseUsers;
}());

var user = (function () {
    function user() {
    }
    return user;
}());

var address = (function () {
    function address() {
    }
    return address;
}());

//# sourceMappingURL=inhouse-users.model.js.map

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

/***/ }),

/***/ "../../../../../src/app/models/users.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Users; });
var Users = (function () {
    function Users() {
    }
    return Users;
}());

//# sourceMappingURL=users.model.js.map

/***/ }),

/***/ "../../../../../src/app/page-not-found/page-not-found.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/page-not-found/page-not-found.component.html":
/***/ (function(module, exports) {

module.exports = "\n<section id=\"wrapper\">\n    <header>\n        <div class=\"row\">\n            <div class=\"col-6\">\n                <a class=\"logo\" href=\"\">\n                    <img class=\"app-logo\" src=\"./../../../assets/img/logo.png\" alt=\"img\">\n                </a>\n            </div>\n        </div>\n    </header>\n        \n    <div class=\"login\">\n        <div class=\"container\">\n            <div class=\"row\">\n                <div class=\"col-xl-8 col-lg-6 col-md-6 col-12\">\n                    <h2>One Easy Solution for Your Needs.</h2>\n                    <p class=\"p18\">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.</p>\n                </div>\n                <div class=\"col-xl-4 col-lg-6 col-md-6 col-12\">\n                    <div class=\"ibox-content\">        \n                        <h2>Page Not Found</h2>\n                        <p class=\"not-found-text\">Sorry, but the page you are looking for has not been found. \n                        Try checking the URL for error, then hit the refresh button on \n                        your browser or click below button to navigate to home page.</p>\n                        <a routerLink=\"\" class=\"btn btn-info login-btn mgt-50\">HOME</a>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</section>"

/***/ }),

/***/ "../../../../../src/app/page-not-found/page-not-found.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageNotFoundComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PageNotFoundComponent = (function () {
    function PageNotFoundComponent() {
    }
    PageNotFoundComponent.prototype.ngOnInit = function () {
    };
    return PageNotFoundComponent;
}());
PageNotFoundComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-page-not-found',
        template: __webpack_require__("../../../../../src/app/page-not-found/page-not-found.component.html"),
        styles: [__webpack_require__("../../../../../src/app/page-not-found/page-not-found.component.css")]
    }),
    __metadata("design:paramtypes", [])
], PageNotFoundComponent);

//# sourceMappingURL=page-not-found.component.js.map

/***/ }),

/***/ "../../../../../src/app/services/admin.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_throw__ = __webpack_require__("../../../../rxjs/add/observable/throw.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ngx_sweetalert2__ = __webpack_require__("../../../../ngx-sweetalert2/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__http_interceptor__ = __webpack_require__("../../../../../src/app/services/http-interceptor.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var AdminService = (function () {
    // loginData$ = new BehaviorSubject({});
    // loginData$: Observable<{}>;
    function AdminService(http, swal) {
        this.http = http;
        this.swal = swal;
        this.isUserLogin = false;
        this.baseUrl = __WEBPACK_IMPORTED_MODULE_6__environments_environment__["a" /* environment */].baseUrl;
        this.login = new __WEBPACK_IMPORTED_MODULE_7_rxjs_BehaviorSubject__["BehaviorSubject"]({});
        this.loginData$ = this.login.asObservable();
    }
    // starting of general functions
    AdminService.prototype.setUserLoggedIn = function () { this.isUserLogin = true; };
    AdminService.prototype.unsetUserLoggedIn = function () { this.isUserLogin = false; };
    AdminService.prototype.getUserLoggedIn = function () { return this.isUserLogin; };
    AdminService.prototype.getHeadersForLogin = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* Headers */]();
        // headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return headers;
    };
    AdminService.prototype.getHeaders = function () {
        var token = localStorage.getItem('token');
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* Headers */]();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', 'Bearer ' + token);
        return headers;
    };
    AdminService.prototype.getHeadersForMultipart = function () {
        var token = localStorage.getItem('token');
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* Headers */]();
        // headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', 'Bearer ' + token);
        return headers;
    };
    AdminService.prototype.errorHandler = function (error) {
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json() || 'Server error');
        // // console.log('errorrrrrrr', error)
        // var tt = Observable.throw(error.json() || "Server error");
        // // console.log(tt.error.message)
        // var tttt = this.swal.error({
        //   title: 'Error',
        //   // text: tt.error.message
        // })
        // return tttt
    };
    AdminService.prototype.getCountries = function () {
        return this.http.get('assets/countries.json')
            .map(function (response) { return response.json(); })
            .catch(this.errorHandler);
    };
    // ending of general functions
    // login
    AdminService.prototype.adminLogin = function (email, password) {
        var _this = this;
        var headers = this.getHeadersForLogin();
        var input = new FormData();
        input.append('email', email);
        input.append('password', password);
        return this.http.post(this.baseUrl + 'login', input, { headers: headers })
            .map(function (response) {
            var r = response.json();
            localStorage.setItem('token', r.data.token);
            _this.login.next(r.data);
            return r;
        })
            .catch(this.errorHandler);
    };
    AdminService.prototype.logoutApi = function () {
        var headers = this.getHeaders();
        return this.http.put(this.baseUrl + 'logout', { headers: headers })
            .map(function (response) { response.json(); })
            .catch(this.errorHandler);
    };
    AdminService.prototype.getDataApi = function (url) {
        var headers = this.getHeaders();
        return this.http.get(this.baseUrl + url, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(this.errorHandler);
    };
    AdminService.prototype.putDataApi = function (url, input) {
        var headers = this.getHeadersForMultipart();
        return this.http.put(this.baseUrl + url, input, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(this.errorHandler);
    };
    AdminService.prototype.postDataApi = function (url, input) {
        // console.log('admin', url, input)
        var headers = this.getHeadersForMultipart();
        return this.http.post(this.baseUrl + url, input, { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(this.errorHandler);
    };
    AdminService.prototype.deleteDataApi = function (url) {
        var headers = this.getHeaders();
        return this.http.delete(this.baseUrl + url, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(this.errorHandler);
    };
    return AdminService;
}());
AdminService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_9__http_interceptor__["a" /* HttpInterceptor */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__http_interceptor__["a" /* HttpInterceptor */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_8_ngx_sweetalert2__["a" /* SweetAlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8_ngx_sweetalert2__["a" /* SweetAlertService */]) === "function" && _b || Object])
], AdminService);

var _a, _b;
//# sourceMappingURL=admin.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/auth.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__ = __webpack_require__("../../../../ngx-sweetalert2/index.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthGuard = (function () {
    function AuthGuard(router, admin, swal) {
        this.router = router;
        this.admin = admin;
        this.swal = swal;
    }
    AuthGuard.prototype.canActivate = function () {
        var _this = this;
        var token = localStorage.getItem('token');
        this.admin.login.subscribe(function (success) {
            if (success['name'] === undefined) {
                var input = new FormData();
                _this.admin.postDataApi('get-details', input)
                    .subscribe(function (success) {
                    _this.admin.login.next(success.data);
                });
            }
        });
        if (token) {
            return true;
        }
        this.router.navigate(['']);
        return false;
    };
    return AuthGuard;
}());
AuthGuard = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__admin_service__["a" /* AdminService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__["a" /* SweetAlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__["a" /* SweetAlertService */]) === "function" && _c || Object])
], AuthGuard);

var _a, _b, _c;
//# sourceMappingURL=auth.guard.js.map

/***/ }),

/***/ "../../../../../src/app/services/http-interceptor.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__ = __webpack_require__("../../../../ngx-sweetalert2/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_throw__ = __webpack_require__("../../../../rxjs/add/observable/throw.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpInterceptor; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





// operators



var HttpInterceptor = (function (_super) {
    __extends(HttpInterceptor, _super);
    function HttpInterceptor(backend, options, http, swal, router) {
        var _this = _super.call(this, backend, options) || this;
        _this.http = http;
        _this.swal = swal;
        _this.router = router;
        _this.handleError = function (error) {
            // console.log('interceptor', error);
            // if (error instanceof HttpErrorResponse) {
            //     console.log('erorrrrr==================', error)
            //     // this.router.navigate([ '/login' ]);
            // }
            // this.swal.warning({
            //         title: 'ee',
            //         text: 'sss'
            //     })
            // alert('ooooooooooooooooooooo')
            // Do messaging and error handling here
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error);
        };
        return _this;
    }
    HttpInterceptor.prototype.request = function (url, options) {
        return _super.prototype.request.call(this, url, options)
            .catch(this.handleError);
    };
    return HttpInterceptor;
}(__WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */]));
HttpInterceptor = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_http__["c" /* XHRBackend */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_http__["c" /* XHRBackend */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__["a" /* SweetAlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__["a" /* SweetAlertService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]) === "function" && _e || Object])
], HttpInterceptor);

var _a, _b, _c, _d, _e;
// import { Injectable } from '@angular/core';
// import { HttpEvent, HttpErrorResponse, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/throw';
// import 'rxjs/add/operator/catch';
// @Injectable()
// export class ErrorInterceptor implements HttpInterceptor {
//   constructor(private router: Router) {}
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     return next.handle(req).catch(
//       (err: HttpErrorResponse) => {
//         if (this.router.url !== '/login' && err.status === 401) {
//           this.router.navigate(['/logout']);
//         }
//         return Observable.throw(err);
//       }
//     );
//   }
// }
//# sourceMappingURL=http-interceptor.js.map

/***/ }),

/***/ "../../../../../src/app/shared/app-footer/app-footer.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/app-footer/app-footer.component.html":
/***/ (function(module, exports) {

module.exports = "2018 © <b>Real Estate</b>\n"

/***/ }),

/***/ "../../../../../src/app/shared/app-footer/app-footer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppFooterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppFooterComponent = (function () {
    function AppFooterComponent() {
    }
    AppFooterComponent.prototype.ngOnInit = function () {
    };
    return AppFooterComponent;
}());
AppFooterComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-footer',
        template: __webpack_require__("../../../../../src/app/shared/app-footer/app-footer.component.html"),
        styles: [__webpack_require__("../../../../../src/app/shared/app-footer/app-footer.component.css")]
    }),
    __metadata("design:paramtypes", [])
], AppFooterComponent);

//# sourceMappingURL=app-footer.component.js.map

/***/ }),

/***/ "../../../../../src/app/shared/app-header/app-header.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.logout-btn{\n    cursor: pointer;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/app-header/app-header.component.html":
/***/ (function(module, exports) {

module.exports = "<header>\n  <div class=\"row\">\n    <!-- header -->\n      <div class=\"col-6\">\n        <a class=\"logo\">\n        <img class=\"app-logo\" src=\"./../../../assets/img/logo.png\" alt=\"img\">\n        </a>\n\n      </div>\n      <div class=\"col-6\">\n        <div class=\"user-profile float-right\">\n           <a href=\"javascript://\">\n              <h4>{{fullName}}</h4>\n              <img *ngIf=\"!image\" class=\"rounded-circle\" src=\"./../../../assets/img/default_img.png\">\n              <img *ngIf=\"image\" class=\"rounded-circle\" src=\"{{image}}\">\n           </a>\n        </div>\n      </div>\n      <!-- <header end -->\n            \n\n      <!--slide menu start-->\n      <div id=\"side-menu-bar\">\n          <div class=\"scrollbox\" malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\">\n            <nav class=\"navbar navbar-expand-md navbar-dark\">\n                <!-- Brand -->\n                <a class=\"navbar-brand\" href=\"#\"><img src=\"http://via.placeholder.com/150x40\" alt=\"img\"></a> \n                <!-- Toggler/collapsibe Button -->\n                <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapsibleNavbar\">\n                <span class=\"navbar-toggler-icon\"></span>\n                </button>\n                <!-- Navbar links -->\n                <div class=\"collapse navbar-collapse\" id=\"collapsibleNavbar\">\n                  <ul class=\"navbar-nav\">\n                      <!-- <li class=\"nav-item\">\n                        <a class=\"nav-link\" routerLink=\"/\"><i><img src=\"./../../../assets/img/dashboard.png\"></i><span>Dashboard</span></a>\n                      </li> -->\n                      <li class=\"nav-item dropdown\">\n                         <a class=\"nav-link dropdown-toggle\" data-toggle=\"dropdown\" href=\"javascript://\">\n                         <i><img src=\"./../../../assets/img/user.png\"></i><span>Manage Inhouse User</span></a>\n                         <div class=\"dropdown-menu\">\n                            <ul>\n                               <li><a class=\"dropdown-item\" routerLink=\"view-inhouse-users/data-collectors\">Data Collector</a></li>\n                               <li><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"view-inhouse-users/csr-sellers\">CSR Seller</a></li>\n                               <li><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"view-inhouse-users/csr-buyers\">CSR Buyer</a></li>\n                               <li><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"view-inhouse-users/inhouse-broker\">Inhouse Broker</a></li>\n                               <li><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"view-inhouse-users/csr-closers\">CSR Closer</a></li>\n                            </ul>\n                         </div>\n                      </li>\n                      <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"javascript://\" routerLink=\"view-users\"><i><img src=\"./../../../assets/img/users.png\"></i><span>Manage User</span></a>\n                      </li>\n                      <!-- <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"javascript://\"><i><img src=\"./../../../assets/img/stamp.png\"></i><span>Manage Notary</span></a>\n                      </li>\n                      <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"javascript://\"><i><img src=\"./../../../assets/img/bank.png\"></i><span>Manage Banks</span></a>\n                      </li>\n                      <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"javascript://\"><i><img src=\"./../../../assets/img/key.png\"></i><span>ACL</span></a>\n                      </li>\n                      <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"javascript://\"><i><img src=\"./../../../assets/img/graph2.png\"></i><span>Report</span></a>\n                      </li>\n                      <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"javascript://\"><i><img src=\"./../../../assets/img/graph.png\"></i><span>Magage lead</span></a>\n                      </li>\n                      <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"javascript://\"><i><img src=\"./../../../assets/img/graph.png\"></i><span>Magage Properties</span></a>\n                      </li>\n                      <li class=\"nav-item active\">\n                        <a class=\"nav-link\" href=\"javascript://\"><i><img src=\"./../../../assets/img/graph.png\"></i><span>Magage Projects</span></a>\n                      </li> -->\n                      <li class=\"nav-item dropdown\">\n                        <a class=\"nav-link dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\">\n                        <i><img src=\"./../../../assets/img/settings.png\"></i><span>Settings</span></a>\n                        <div class=\"dropdown-menu\">\n                            <ul>\n                              <li><a class=\"dropdown-item\" routerLink=\"setting-location\">Location</a></li>\n                              <li><a class=\"dropdown-item\" routerLink=\"setting-locality\">Locality</a></li>\n                              <li><a class=\"dropdown-item\" routerLink=\"setting-property\">Property</a></li>\n                              <li><a class=\"dropdown-item\" routerLink=\"setting-project\">Project</a></li>\n                              <li><a class=\"dropdown-item\" routerLink=\"edit-profile\">Edit Profile</a></li>\n                              <li><a class=\"dropdown-item logout-btn\" (click)=\"onLoggedout()\">Logout</a></li>\n                              <!-- <li><a class=\"dropdown-item\" (click)=\"onLoggedout()\">Logout</a></li> -->\n                            </ul>\n                        </div>\n                      </li>\n                  </ul>\n                </div>\n            </nav>\n          </div>\n      </div>\n      <!--side menu end-->\n  </div>\n</header>"

/***/ }),

/***/ "../../../../../src/app/shared/app-header/app-header.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_sidebar_app_sidebar_component__ = __webpack_require__("../../../../../src/app/shared/app-sidebar/app-sidebar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppHeaderComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppHeaderComponent = (function () {
    function AppHeaderComponent(sidebar, admin, router) {
        var _this = this;
        this.sidebar = sidebar;
        this.admin = admin;
        this.router = router;
        this.scrollbarOptions = { axis: 'yx', theme: 'minimal-dark' };
        this.admin.loginData$.subscribe(function (success) {
            _this.fullName = success['name'];
            _this.image = success['image'];
        });
    }
    AppHeaderComponent.prototype.onLoggedout = function () {
        this.sidebar.onLoggedout();
    };
    return AppHeaderComponent;
}());
AppHeaderComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-header',
        template: __webpack_require__("../../../../../src/app/shared/app-header/app-header.component.html"),
        styles: [__webpack_require__("../../../../../src/app/shared/app-header/app-header.component.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_1__app_sidebar_app_sidebar_component__["a" /* AppSidebarComponent */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__app_sidebar_app_sidebar_component__["a" /* AppSidebarComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__app_sidebar_app_sidebar_component__["a" /* AppSidebarComponent */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === "function" && _c || Object])
], AppHeaderComponent);

var _a, _b, _c;
//# sourceMappingURL=app-header.component.js.map

/***/ }),

/***/ "../../../../../src/app/shared/app-sidebar/app-sidebar.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* .logo{\n    text-align: center;\n    padding: 20px;\n}\n.sidebar_nav_bc{\n    background-color: rgb(46, 59, 75);\n}\n.admin_name{\n    color: #fff;\n}\nnav{\n    background: #222;\n}\nnav ul{\n    background-color: #193952;\n}\nnav ul li a span{\n    font-size: 15px;\n}\nnav .nav-header{\n    text-align: center; background: #0d2d48 !important; padding: 0px; padding-top: 10px;\n}\nnav .nav-header span img{\n    width: 60%;\n}\n.nested-menu .list-group-item {\n    cursor: pointer; background-color: transparent; border: none; color: #b4bcc8;\n}\n.nested-menu .list-group-item .drop-down-nav{\n    padding-left: 15px; font-family: \"Poppins\"; font-size: 15px; line-height: 1.42857143; color: #b4bcc8;\n}\n.nested-menu .list-group-item .drop-down-nav:hover{\n    color: #fff;\n}\n.nested-menu .list-group-item:hover{\n    cursor: pointer; border: none; background-color: #45627f; color: #fff; transition: color .15s ease-in-out;\n}\n.nested-menu .nested {\n    list-style-type: none;\n}\n.nested-menu ul.submenu {\n    display: none; height: 0; background-color: #45627f; transition: color .15s ease-in-out;\n}\n.nested-menu .expand ul.submenu {\n    display: block; list-style-type: none; height: auto; background-color: #45627f; transition: color .15s ease-in-out;\n}       \n.nested-menu .expand ul.submenu li a {\n    color: #FFF; padding: 10px; display: block; \n}\n.nav > li > a {\n    color: #fff;\n} */", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/app-sidebar/app-sidebar.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- <div id=\"sidebar-collapse\">\n    <ul class=\"side-menu\">\n        <li class=\"logo\" routerLinkActive=\"active\">\n            <img src=\"../../assets/img/logo.png\" width=\"60\" height=\"60\">\n        </li>\n  \n        <li routerLinkActive=\"active\">\n            <a routerLink=\"/dashboard\" routerLinkActive=\"active\">\n                <i class=\"sidebar-item-icon fa fa-home\"></i> \n                <span class=\"nav-label\">Dashboard</span>\n            </a>\n        </li>\n\n        <li>\n            <a routerLink=\"view-users\"><i class=\"sidebar-item-icon fa fa-users\"></i> <span class=\"nav-label\">Users</span></a>\n        </li>\n  \n        <li>\n            <a routerLink=\"view-category\"><i class=\"sidebar-item-icon fa fa-bars\"></i> <span class=\"nav-label\">Categories</span></a>\n        </li>\n  \n        <li>\n            <a routerLink=\"change-password\"><i class=\"sidebar-item-icon ti-pencil\"></i> <span class=\"nav-label\">Change Password</span></a>\n        </li>\n    \n        <li>\n            <a (click)=\"onLoggedout()\"><i class=\"sidebar-item-icon ti-power-off\"></i><span class=\"nav-label\">Logout</span></a>\n        </li>\n\n      <li class=\"dropdown dropdown-user\"><a class=\"nav-link dropdown-toggle link\" data-toggle=\"dropdown\"><i class=\"sidebar-item-icon fa fa-cog\"></i><span>Settings</span></a>\n        <ul class=\"dropdown-menu dropdown-menu-right animated fadeInRight\">\n          <a class=\"dropdown-item\" href=\"profile.html\"><i class=\"ti-user\"></i>Profile</a>\n          <a class=\"dropdown-item\" href=\"javascript:;\"><i class=\"ti-support\"></i>Support</a>\n          <li class=\"dropdown-divider\"></li>\n          <a class=\"dropdown-item\" href=\"login.html\"><i class=\"ti-power-off\"></i>Logout</a>\n        </ul>\n      </li>\n\n      <li><a (click)=\"addExpandClass('settings')\"><i class=\"sidebar-item-icon fa fa-cog\"></i><span class=\"nav-label\">Settings</span></a>\n      <div class=\"nested-menu\">\n          <li class=\"nested\" [class.expand]=\"showMenu === 'settings'\">\n              <ul class=\"submenu\">\n                  <li>\n                      <a (click)=\"onLoggedout()\"><i class=\"fa fa-sign-out\"></i><span style=\"margin-left: 5px;\">Logout</span></a>\n                  </li>\n              </ul>\n          </li>\n      </div>\n      </li>\n  </ul>\n</div> -->\n\n\n\n\n\n"

/***/ }),

/***/ "../../../../../src/app/shared/app-sidebar/app-sidebar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__ = __webpack_require__("../../../../ngx-sweetalert2/index.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppSidebarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppSidebarComponent = (function () {
    function AppSidebarComponent(admin, router, swal) {
        this.admin = admin;
        this.router = router;
        this.swal = swal;
        this.isActive = false;
        this.showMenu = '';
    }
    AppSidebarComponent.prototype.ngOnInit = function () {
    };
    AppSidebarComponent.prototype.eventCalled = function () {
        this.isActive = !this.isActive;
    };
    AppSidebarComponent.prototype.addExpandClass = function (element) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        }
        else {
            this.showMenu = element;
        }
    };
    AppSidebarComponent.prototype.onLoggedout = function () {
        var self = this;
        this.swal.confirm({
            title: 'Are you sure?',
            text: 'You want to log-out?',
        }).then(function () {
            self.logout();
        })
            .catch(function () {
            // console.log('Logout cancelled by user');
        });
    };
    AppSidebarComponent.prototype.logout = function () {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('isLoggedin');
        this.admin.unsetUserLoggedIn();
        this.router.navigate(['']);
    };
    AppSidebarComponent.prototype.getProducts = function (userId) {
        this.router.navigate(['/dashboard/view-product', userId]);
    };
    return AppSidebarComponent;
}());
AppSidebarComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-sidebar',
        template: __webpack_require__("../../../../../src/app/shared/app-sidebar/app-sidebar.component.html"),
        styles: [__webpack_require__("../../../../../src/app/shared/app-sidebar/app-sidebar.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__["a" /* SweetAlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__["a" /* SweetAlertService */]) === "function" && _c || Object])
], AppSidebarComponent);

var _a, _b, _c;
//# sourceMappingURL=app-sidebar.component.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false,
    // baseUrl: 'http://192.168.100.88:8500/api/admin/'
    baseUrl: 'http://45.232.252.136/api/admin/'
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ "../../../../angular2-moment/node_modules/moment/locale recursive ^\\.\\/.*$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "../../../../angular2-moment/node_modules/moment/locale/af.js",
	"./af.js": "../../../../angular2-moment/node_modules/moment/locale/af.js",
	"./ar": "../../../../angular2-moment/node_modules/moment/locale/ar.js",
	"./ar-dz": "../../../../angular2-moment/node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "../../../../angular2-moment/node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "../../../../angular2-moment/node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "../../../../angular2-moment/node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "../../../../angular2-moment/node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "../../../../angular2-moment/node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "../../../../angular2-moment/node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "../../../../angular2-moment/node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "../../../../angular2-moment/node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "../../../../angular2-moment/node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "../../../../angular2-moment/node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "../../../../angular2-moment/node_modules/moment/locale/ar-tn.js",
	"./ar.js": "../../../../angular2-moment/node_modules/moment/locale/ar.js",
	"./az": "../../../../angular2-moment/node_modules/moment/locale/az.js",
	"./az.js": "../../../../angular2-moment/node_modules/moment/locale/az.js",
	"./be": "../../../../angular2-moment/node_modules/moment/locale/be.js",
	"./be.js": "../../../../angular2-moment/node_modules/moment/locale/be.js",
	"./bg": "../../../../angular2-moment/node_modules/moment/locale/bg.js",
	"./bg.js": "../../../../angular2-moment/node_modules/moment/locale/bg.js",
	"./bm": "../../../../angular2-moment/node_modules/moment/locale/bm.js",
	"./bm.js": "../../../../angular2-moment/node_modules/moment/locale/bm.js",
	"./bn": "../../../../angular2-moment/node_modules/moment/locale/bn.js",
	"./bn.js": "../../../../angular2-moment/node_modules/moment/locale/bn.js",
	"./bo": "../../../../angular2-moment/node_modules/moment/locale/bo.js",
	"./bo.js": "../../../../angular2-moment/node_modules/moment/locale/bo.js",
	"./br": "../../../../angular2-moment/node_modules/moment/locale/br.js",
	"./br.js": "../../../../angular2-moment/node_modules/moment/locale/br.js",
	"./bs": "../../../../angular2-moment/node_modules/moment/locale/bs.js",
	"./bs.js": "../../../../angular2-moment/node_modules/moment/locale/bs.js",
	"./ca": "../../../../angular2-moment/node_modules/moment/locale/ca.js",
	"./ca.js": "../../../../angular2-moment/node_modules/moment/locale/ca.js",
	"./cs": "../../../../angular2-moment/node_modules/moment/locale/cs.js",
	"./cs.js": "../../../../angular2-moment/node_modules/moment/locale/cs.js",
	"./cv": "../../../../angular2-moment/node_modules/moment/locale/cv.js",
	"./cv.js": "../../../../angular2-moment/node_modules/moment/locale/cv.js",
	"./cy": "../../../../angular2-moment/node_modules/moment/locale/cy.js",
	"./cy.js": "../../../../angular2-moment/node_modules/moment/locale/cy.js",
	"./da": "../../../../angular2-moment/node_modules/moment/locale/da.js",
	"./da.js": "../../../../angular2-moment/node_modules/moment/locale/da.js",
	"./de": "../../../../angular2-moment/node_modules/moment/locale/de.js",
	"./de-at": "../../../../angular2-moment/node_modules/moment/locale/de-at.js",
	"./de-at.js": "../../../../angular2-moment/node_modules/moment/locale/de-at.js",
	"./de-ch": "../../../../angular2-moment/node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "../../../../angular2-moment/node_modules/moment/locale/de-ch.js",
	"./de.js": "../../../../angular2-moment/node_modules/moment/locale/de.js",
	"./dv": "../../../../angular2-moment/node_modules/moment/locale/dv.js",
	"./dv.js": "../../../../angular2-moment/node_modules/moment/locale/dv.js",
	"./el": "../../../../angular2-moment/node_modules/moment/locale/el.js",
	"./el.js": "../../../../angular2-moment/node_modules/moment/locale/el.js",
	"./en-au": "../../../../angular2-moment/node_modules/moment/locale/en-au.js",
	"./en-au.js": "../../../../angular2-moment/node_modules/moment/locale/en-au.js",
	"./en-ca": "../../../../angular2-moment/node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "../../../../angular2-moment/node_modules/moment/locale/en-ca.js",
	"./en-gb": "../../../../angular2-moment/node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "../../../../angular2-moment/node_modules/moment/locale/en-gb.js",
	"./en-ie": "../../../../angular2-moment/node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "../../../../angular2-moment/node_modules/moment/locale/en-ie.js",
	"./en-il": "../../../../angular2-moment/node_modules/moment/locale/en-il.js",
	"./en-il.js": "../../../../angular2-moment/node_modules/moment/locale/en-il.js",
	"./en-nz": "../../../../angular2-moment/node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "../../../../angular2-moment/node_modules/moment/locale/en-nz.js",
	"./eo": "../../../../angular2-moment/node_modules/moment/locale/eo.js",
	"./eo.js": "../../../../angular2-moment/node_modules/moment/locale/eo.js",
	"./es": "../../../../angular2-moment/node_modules/moment/locale/es.js",
	"./es-do": "../../../../angular2-moment/node_modules/moment/locale/es-do.js",
	"./es-do.js": "../../../../angular2-moment/node_modules/moment/locale/es-do.js",
	"./es-us": "../../../../angular2-moment/node_modules/moment/locale/es-us.js",
	"./es-us.js": "../../../../angular2-moment/node_modules/moment/locale/es-us.js",
	"./es.js": "../../../../angular2-moment/node_modules/moment/locale/es.js",
	"./et": "../../../../angular2-moment/node_modules/moment/locale/et.js",
	"./et.js": "../../../../angular2-moment/node_modules/moment/locale/et.js",
	"./eu": "../../../../angular2-moment/node_modules/moment/locale/eu.js",
	"./eu.js": "../../../../angular2-moment/node_modules/moment/locale/eu.js",
	"./fa": "../../../../angular2-moment/node_modules/moment/locale/fa.js",
	"./fa.js": "../../../../angular2-moment/node_modules/moment/locale/fa.js",
	"./fi": "../../../../angular2-moment/node_modules/moment/locale/fi.js",
	"./fi.js": "../../../../angular2-moment/node_modules/moment/locale/fi.js",
	"./fo": "../../../../angular2-moment/node_modules/moment/locale/fo.js",
	"./fo.js": "../../../../angular2-moment/node_modules/moment/locale/fo.js",
	"./fr": "../../../../angular2-moment/node_modules/moment/locale/fr.js",
	"./fr-ca": "../../../../angular2-moment/node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "../../../../angular2-moment/node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "../../../../angular2-moment/node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "../../../../angular2-moment/node_modules/moment/locale/fr-ch.js",
	"./fr.js": "../../../../angular2-moment/node_modules/moment/locale/fr.js",
	"./fy": "../../../../angular2-moment/node_modules/moment/locale/fy.js",
	"./fy.js": "../../../../angular2-moment/node_modules/moment/locale/fy.js",
	"./gd": "../../../../angular2-moment/node_modules/moment/locale/gd.js",
	"./gd.js": "../../../../angular2-moment/node_modules/moment/locale/gd.js",
	"./gl": "../../../../angular2-moment/node_modules/moment/locale/gl.js",
	"./gl.js": "../../../../angular2-moment/node_modules/moment/locale/gl.js",
	"./gom-latn": "../../../../angular2-moment/node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "../../../../angular2-moment/node_modules/moment/locale/gom-latn.js",
	"./gu": "../../../../angular2-moment/node_modules/moment/locale/gu.js",
	"./gu.js": "../../../../angular2-moment/node_modules/moment/locale/gu.js",
	"./he": "../../../../angular2-moment/node_modules/moment/locale/he.js",
	"./he.js": "../../../../angular2-moment/node_modules/moment/locale/he.js",
	"./hi": "../../../../angular2-moment/node_modules/moment/locale/hi.js",
	"./hi.js": "../../../../angular2-moment/node_modules/moment/locale/hi.js",
	"./hr": "../../../../angular2-moment/node_modules/moment/locale/hr.js",
	"./hr.js": "../../../../angular2-moment/node_modules/moment/locale/hr.js",
	"./hu": "../../../../angular2-moment/node_modules/moment/locale/hu.js",
	"./hu.js": "../../../../angular2-moment/node_modules/moment/locale/hu.js",
	"./hy-am": "../../../../angular2-moment/node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "../../../../angular2-moment/node_modules/moment/locale/hy-am.js",
	"./id": "../../../../angular2-moment/node_modules/moment/locale/id.js",
	"./id.js": "../../../../angular2-moment/node_modules/moment/locale/id.js",
	"./is": "../../../../angular2-moment/node_modules/moment/locale/is.js",
	"./is.js": "../../../../angular2-moment/node_modules/moment/locale/is.js",
	"./it": "../../../../angular2-moment/node_modules/moment/locale/it.js",
	"./it.js": "../../../../angular2-moment/node_modules/moment/locale/it.js",
	"./ja": "../../../../angular2-moment/node_modules/moment/locale/ja.js",
	"./ja.js": "../../../../angular2-moment/node_modules/moment/locale/ja.js",
	"./jv": "../../../../angular2-moment/node_modules/moment/locale/jv.js",
	"./jv.js": "../../../../angular2-moment/node_modules/moment/locale/jv.js",
	"./ka": "../../../../angular2-moment/node_modules/moment/locale/ka.js",
	"./ka.js": "../../../../angular2-moment/node_modules/moment/locale/ka.js",
	"./kk": "../../../../angular2-moment/node_modules/moment/locale/kk.js",
	"./kk.js": "../../../../angular2-moment/node_modules/moment/locale/kk.js",
	"./km": "../../../../angular2-moment/node_modules/moment/locale/km.js",
	"./km.js": "../../../../angular2-moment/node_modules/moment/locale/km.js",
	"./kn": "../../../../angular2-moment/node_modules/moment/locale/kn.js",
	"./kn.js": "../../../../angular2-moment/node_modules/moment/locale/kn.js",
	"./ko": "../../../../angular2-moment/node_modules/moment/locale/ko.js",
	"./ko.js": "../../../../angular2-moment/node_modules/moment/locale/ko.js",
	"./ky": "../../../../angular2-moment/node_modules/moment/locale/ky.js",
	"./ky.js": "../../../../angular2-moment/node_modules/moment/locale/ky.js",
	"./lb": "../../../../angular2-moment/node_modules/moment/locale/lb.js",
	"./lb.js": "../../../../angular2-moment/node_modules/moment/locale/lb.js",
	"./lo": "../../../../angular2-moment/node_modules/moment/locale/lo.js",
	"./lo.js": "../../../../angular2-moment/node_modules/moment/locale/lo.js",
	"./lt": "../../../../angular2-moment/node_modules/moment/locale/lt.js",
	"./lt.js": "../../../../angular2-moment/node_modules/moment/locale/lt.js",
	"./lv": "../../../../angular2-moment/node_modules/moment/locale/lv.js",
	"./lv.js": "../../../../angular2-moment/node_modules/moment/locale/lv.js",
	"./me": "../../../../angular2-moment/node_modules/moment/locale/me.js",
	"./me.js": "../../../../angular2-moment/node_modules/moment/locale/me.js",
	"./mi": "../../../../angular2-moment/node_modules/moment/locale/mi.js",
	"./mi.js": "../../../../angular2-moment/node_modules/moment/locale/mi.js",
	"./mk": "../../../../angular2-moment/node_modules/moment/locale/mk.js",
	"./mk.js": "../../../../angular2-moment/node_modules/moment/locale/mk.js",
	"./ml": "../../../../angular2-moment/node_modules/moment/locale/ml.js",
	"./ml.js": "../../../../angular2-moment/node_modules/moment/locale/ml.js",
	"./mn": "../../../../angular2-moment/node_modules/moment/locale/mn.js",
	"./mn.js": "../../../../angular2-moment/node_modules/moment/locale/mn.js",
	"./mr": "../../../../angular2-moment/node_modules/moment/locale/mr.js",
	"./mr.js": "../../../../angular2-moment/node_modules/moment/locale/mr.js",
	"./ms": "../../../../angular2-moment/node_modules/moment/locale/ms.js",
	"./ms-my": "../../../../angular2-moment/node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "../../../../angular2-moment/node_modules/moment/locale/ms-my.js",
	"./ms.js": "../../../../angular2-moment/node_modules/moment/locale/ms.js",
	"./mt": "../../../../angular2-moment/node_modules/moment/locale/mt.js",
	"./mt.js": "../../../../angular2-moment/node_modules/moment/locale/mt.js",
	"./my": "../../../../angular2-moment/node_modules/moment/locale/my.js",
	"./my.js": "../../../../angular2-moment/node_modules/moment/locale/my.js",
	"./nb": "../../../../angular2-moment/node_modules/moment/locale/nb.js",
	"./nb.js": "../../../../angular2-moment/node_modules/moment/locale/nb.js",
	"./ne": "../../../../angular2-moment/node_modules/moment/locale/ne.js",
	"./ne.js": "../../../../angular2-moment/node_modules/moment/locale/ne.js",
	"./nl": "../../../../angular2-moment/node_modules/moment/locale/nl.js",
	"./nl-be": "../../../../angular2-moment/node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "../../../../angular2-moment/node_modules/moment/locale/nl-be.js",
	"./nl.js": "../../../../angular2-moment/node_modules/moment/locale/nl.js",
	"./nn": "../../../../angular2-moment/node_modules/moment/locale/nn.js",
	"./nn.js": "../../../../angular2-moment/node_modules/moment/locale/nn.js",
	"./pa-in": "../../../../angular2-moment/node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "../../../../angular2-moment/node_modules/moment/locale/pa-in.js",
	"./pl": "../../../../angular2-moment/node_modules/moment/locale/pl.js",
	"./pl.js": "../../../../angular2-moment/node_modules/moment/locale/pl.js",
	"./pt": "../../../../angular2-moment/node_modules/moment/locale/pt.js",
	"./pt-br": "../../../../angular2-moment/node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "../../../../angular2-moment/node_modules/moment/locale/pt-br.js",
	"./pt.js": "../../../../angular2-moment/node_modules/moment/locale/pt.js",
	"./ro": "../../../../angular2-moment/node_modules/moment/locale/ro.js",
	"./ro.js": "../../../../angular2-moment/node_modules/moment/locale/ro.js",
	"./ru": "../../../../angular2-moment/node_modules/moment/locale/ru.js",
	"./ru.js": "../../../../angular2-moment/node_modules/moment/locale/ru.js",
	"./sd": "../../../../angular2-moment/node_modules/moment/locale/sd.js",
	"./sd.js": "../../../../angular2-moment/node_modules/moment/locale/sd.js",
	"./se": "../../../../angular2-moment/node_modules/moment/locale/se.js",
	"./se.js": "../../../../angular2-moment/node_modules/moment/locale/se.js",
	"./si": "../../../../angular2-moment/node_modules/moment/locale/si.js",
	"./si.js": "../../../../angular2-moment/node_modules/moment/locale/si.js",
	"./sk": "../../../../angular2-moment/node_modules/moment/locale/sk.js",
	"./sk.js": "../../../../angular2-moment/node_modules/moment/locale/sk.js",
	"./sl": "../../../../angular2-moment/node_modules/moment/locale/sl.js",
	"./sl.js": "../../../../angular2-moment/node_modules/moment/locale/sl.js",
	"./sq": "../../../../angular2-moment/node_modules/moment/locale/sq.js",
	"./sq.js": "../../../../angular2-moment/node_modules/moment/locale/sq.js",
	"./sr": "../../../../angular2-moment/node_modules/moment/locale/sr.js",
	"./sr-cyrl": "../../../../angular2-moment/node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "../../../../angular2-moment/node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "../../../../angular2-moment/node_modules/moment/locale/sr.js",
	"./ss": "../../../../angular2-moment/node_modules/moment/locale/ss.js",
	"./ss.js": "../../../../angular2-moment/node_modules/moment/locale/ss.js",
	"./sv": "../../../../angular2-moment/node_modules/moment/locale/sv.js",
	"./sv.js": "../../../../angular2-moment/node_modules/moment/locale/sv.js",
	"./sw": "../../../../angular2-moment/node_modules/moment/locale/sw.js",
	"./sw.js": "../../../../angular2-moment/node_modules/moment/locale/sw.js",
	"./ta": "../../../../angular2-moment/node_modules/moment/locale/ta.js",
	"./ta.js": "../../../../angular2-moment/node_modules/moment/locale/ta.js",
	"./te": "../../../../angular2-moment/node_modules/moment/locale/te.js",
	"./te.js": "../../../../angular2-moment/node_modules/moment/locale/te.js",
	"./tet": "../../../../angular2-moment/node_modules/moment/locale/tet.js",
	"./tet.js": "../../../../angular2-moment/node_modules/moment/locale/tet.js",
	"./tg": "../../../../angular2-moment/node_modules/moment/locale/tg.js",
	"./tg.js": "../../../../angular2-moment/node_modules/moment/locale/tg.js",
	"./th": "../../../../angular2-moment/node_modules/moment/locale/th.js",
	"./th.js": "../../../../angular2-moment/node_modules/moment/locale/th.js",
	"./tl-ph": "../../../../angular2-moment/node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "../../../../angular2-moment/node_modules/moment/locale/tl-ph.js",
	"./tlh": "../../../../angular2-moment/node_modules/moment/locale/tlh.js",
	"./tlh.js": "../../../../angular2-moment/node_modules/moment/locale/tlh.js",
	"./tr": "../../../../angular2-moment/node_modules/moment/locale/tr.js",
	"./tr.js": "../../../../angular2-moment/node_modules/moment/locale/tr.js",
	"./tzl": "../../../../angular2-moment/node_modules/moment/locale/tzl.js",
	"./tzl.js": "../../../../angular2-moment/node_modules/moment/locale/tzl.js",
	"./tzm": "../../../../angular2-moment/node_modules/moment/locale/tzm.js",
	"./tzm-latn": "../../../../angular2-moment/node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "../../../../angular2-moment/node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "../../../../angular2-moment/node_modules/moment/locale/tzm.js",
	"./ug-cn": "../../../../angular2-moment/node_modules/moment/locale/ug-cn.js",
	"./ug-cn.js": "../../../../angular2-moment/node_modules/moment/locale/ug-cn.js",
	"./uk": "../../../../angular2-moment/node_modules/moment/locale/uk.js",
	"./uk.js": "../../../../angular2-moment/node_modules/moment/locale/uk.js",
	"./ur": "../../../../angular2-moment/node_modules/moment/locale/ur.js",
	"./ur.js": "../../../../angular2-moment/node_modules/moment/locale/ur.js",
	"./uz": "../../../../angular2-moment/node_modules/moment/locale/uz.js",
	"./uz-latn": "../../../../angular2-moment/node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "../../../../angular2-moment/node_modules/moment/locale/uz-latn.js",
	"./uz.js": "../../../../angular2-moment/node_modules/moment/locale/uz.js",
	"./vi": "../../../../angular2-moment/node_modules/moment/locale/vi.js",
	"./vi.js": "../../../../angular2-moment/node_modules/moment/locale/vi.js",
	"./x-pseudo": "../../../../angular2-moment/node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "../../../../angular2-moment/node_modules/moment/locale/x-pseudo.js",
	"./yo": "../../../../angular2-moment/node_modules/moment/locale/yo.js",
	"./yo.js": "../../../../angular2-moment/node_modules/moment/locale/yo.js",
	"./zh-cn": "../../../../angular2-moment/node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "../../../../angular2-moment/node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "../../../../angular2-moment/node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "../../../../angular2-moment/node_modules/moment/locale/zh-hk.js",
	"./zh-tw": "../../../../angular2-moment/node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "../../../../angular2-moment/node_modules/moment/locale/zh-tw.js"
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "../../../../angular2-moment/node_modules/moment/locale recursive ^\\.\\/.*$";

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map