webpackJsonp([15],{

/***/ "../../../../../src async recursive":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./acl/acl.module": [
		"../../../../../src/app/layout/acl/acl.module.ts",
		0,
		10
	],
	"./appointments/appointments.module": [
		"../../../../../src/app/layout/appointments/appointments.module.ts",
		13
	],
	"./banks/banks.module": [
		"../../../../../src/app/layout/banks/banks.module.ts",
		6
	],
	"./layout/layout.module": [
		"../../../../../src/app/layout/layout.module.ts"
	],
	"./leads/leads.module": [
		"../../../../../src/app/layout/leads/leads.module.ts",
		1
	],
	"./manual-leads/manual-leads.module": [
		"../../../../../src/app/layout/manual-leads/manual-leads.module.ts",
		9
	],
	"./notary/notary.module": [
		"../../../../../src/app/layout/notary/notary.module.ts",
		0,
		7
	],
	"./notifications/notifications.module": [
		"../../../../../src/app/layout/notifications/notifications.module.ts",
		12
	],
	"./projects/projects.module": [
		"../../../../../src/app/layout/projects/projects.module.ts",
		0,
		5
	],
	"./properties/properties.module": [
		"../../../../../src/app/layout/properties/properties.module.ts",
		0,
		4
	],
	"./reports/reports.module": [
		"../../../../../src/app/layout/reports/reports.module.ts",
		3
	],
	"./settings/settings.module": [
		"../../../../../src/app/layout/settings/settings.module.ts",
		0,
		2
	],
	"./templates/templates.module": [
		"../../../../../src/app/layout/templates/templates.module.ts",
		0,
		8
	],
	"./users/users.module": [
		"../../../../../src/app/layout/users/users.module.ts",
		0,
		11
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
module.exports = webpackAsyncContext;
webpackAsyncContext.id = "../../../../../src async recursive";

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

module.exports = "<!-- <router-outlet></router-outlet> -->\n<!-- \n<div class=\"preloader-backdrop\" *ngIf=\"loading\">\n    <div class=\"page-preloader\">Loading</div>\n</div> -->\n<!-- <ngbox></ngbox> -->\n<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<router-outlet></router-outlet>"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_http_interceptor__ = __webpack_require__("../../../../../src/app/services/http-interceptor.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
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




var AppComponent = /** @class */ (function () {
    function AppComponent(router, admin, interceptor) {
        // this.checkData().then(r => {
        //   console.log('checkkkkk----------------');
        //     // this.loading = false;
        // });
        var _this = this;
        this.router = router;
        this.admin = admin;
        this.interceptor = interceptor;
        this.parameter = {};
        this.loading = false;
        this.router.events.subscribe(function (event) {
            if (event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["NavigationStart"]) {
                _this.parameter.loading = true;
            }
            if (event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["NavigationEnd"]) {
                _this.parameter.loading = false;
                window.scrollTo(0, 0);
            }
            if (event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["NavigationCancel"]) {
                _this.parameter.loading = false;
            }
            if (event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["NavigationError"]) {
                _this.parameter.loading = false;
            }
        });
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.interceptor.loaderValue$.subscribe(function (res) {
            setTimeout(function () {
                _this.loading = Object.keys(res).length !== 0 ? res['value'] : false;
            }, 0);
        });
    };
    var _a, _b, _c;
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" ? _a : Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_admin_service__["a" /* AdminService */]) === "function" ? _b : Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_http_interceptor__["a" /* HttpInterceptor */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_http_interceptor__["a" /* HttpInterceptor */]) === "function" ? _c : Object])
    ], AppComponent);
    return AppComponent;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__guards_auth_guard__ = __webpack_require__("../../../../../src/app/guards/auth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_tel_input__ = __webpack_require__("../../../../ng2-tel-input/ng2-tel-input.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_tel_input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_ng2_tel_input__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__toverux_ngx_sweetalert2__ = __webpack_require__("../../../../@toverux/ngx-sweetalert2/@toverux/ngx-sweetalert2.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ngx_malihu_scrollbar__ = __webpack_require__("../../../../ngx-malihu-scrollbar/dist/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angularfire2__ = __webpack_require__("../../../../angularfire2/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_firebase__ = __webpack_require__("../../../../firebase/firebase-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__page_not_found_page_not_found_component__ = __webpack_require__("../../../../../src/app/page-not-found/page-not-found.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_ngx_loading__ = __webpack_require__("../../../../ngx-loading/ngx-loading/ngx-loading.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__layout_layout_module__ = __webpack_require__("../../../../../src/app/layout/layout.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__services_http_interceptor__ = __webpack_require__("../../../../../src/app/services/http-interceptor.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__forgot_password_forgot_password_component__ = __webpack_require__("../../../../../src/app/forgot-password/forgot-password.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__login_login_component__ = __webpack_require__("../../../../../src/app/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__services_common_service__ = __webpack_require__("../../../../../src/app/services/common.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__models_login_model__ = __webpack_require__("../../../../../src/app/models/login.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__modules_shared_module__ = __webpack_require__("../../../../../src/app/modules/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__lang_translate_service__ = __webpack_require__("../../../../../src/app/lang/translate.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











// firebase -start



__WEBPACK_IMPORTED_MODULE_13_firebase__["initializeApp"](__WEBPACK_IMPORTED_MODULE_12__environments_environment__["a" /* environment */].firebase);
// firebase -end












var appRoutes = [
    { path: '', pathMatch: 'full', component: __WEBPACK_IMPORTED_MODULE_20__login_login_component__["a" /* LoginComponent */] },
    { path: 'login', pathMatch: 'full', component: __WEBPACK_IMPORTED_MODULE_20__login_login_component__["a" /* LoginComponent */] },
    { path: 'forgot-password', component: __WEBPACK_IMPORTED_MODULE_19__forgot_password_forgot_password_component__["a" /* ForgotPasswordComponent */] },
    { path: 'dashboard', canActivate: [__WEBPACK_IMPORTED_MODULE_7__guards_auth_guard__["a" /* AuthGuard */]], loadChildren: './layout/layout.module#LayoutModule' },
    { path: '**', component: __WEBPACK_IMPORTED_MODULE_15__page_not_found_page_not_found_component__["a" /* PageNotFoundComponent */] },
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_14__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_19__forgot_password_forgot_password_component__["a" /* ForgotPasswordComponent */],
                __WEBPACK_IMPORTED_MODULE_20__login_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_15__page_not_found_page_not_found_component__["a" /* PageNotFoundComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_4__angular_router__["RouterModule"].forRoot(appRoutes),
                __WEBPACK_IMPORTED_MODULE_9__toverux_ngx_sweetalert2__["a" /* SweetAlert2Module */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["BrowserModule"],
                __WEBPACK_IMPORTED_MODULE_6__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["ReactiveFormsModule"],
                __WEBPACK_IMPORTED_MODULE_17__layout_layout_module__["LayoutModule"],
                __WEBPACK_IMPORTED_MODULE_24__modules_shared_module__["a" /* SharedModule */],
                __WEBPACK_IMPORTED_MODULE_16_ngx_loading__["a" /* LoadingModule */].forRoot({
                    animationType: __WEBPACK_IMPORTED_MODULE_16_ngx_loading__["b" /* ANIMATION_TYPES */].rectangleBounce,
                    primaryColour: '#00B96F'
                }),
                __WEBPACK_IMPORTED_MODULE_10_ngx_malihu_scrollbar__["a" /* MalihuScrollbarModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_8_ng2_tel_input__["Ng2TelInputModule"],
                __WEBPACK_IMPORTED_MODULE_11_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_12__environments_environment__["a" /* environment */].firebase),
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__services_admin_service__["a" /* AdminService */],
                // AngularFireDatabase,
                // AngularFireAuth,
                // MessagingService,
                __WEBPACK_IMPORTED_MODULE_21__services_common_service__["a" /* CommonService */],
                __WEBPACK_IMPORTED_MODULE_7__guards_auth_guard__["a" /* AuthGuard */],
                __WEBPACK_IMPORTED_MODULE_18__services_http_interceptor__["a" /* HttpInterceptor */],
                __WEBPACK_IMPORTED_MODULE_22__common_constants__["a" /* Constant */],
                __WEBPACK_IMPORTED_MODULE_23__models_login_model__["a" /* Login */],
                __WEBPACK_IMPORTED_MODULE_23__models_login_model__["b" /* AdminACL */],
                __WEBPACK_IMPORTED_MODULE_25__lang_translate_service__["a" /* TranslateService */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_14__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/common/constants.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Constant; });
var Constant = /** @class */ (function () {
    function Constant() {
        this.projectName = 'Kanguroo';
        this.itemsPerPage = 10;
        this.p = 1;
        this.country_code = 'mx';
        this.dial_code = '+52';
        this.propertyPlaceholder = 'assets/img/placeholder.png';
        this.floorMapPlaceholder = 'assets/img/placeholder.png';
        this.userPlaceholder = 'assets/img/default_usr.png';
        this.initialCountry = 'mx';
        this.minValue = 0;
        this.maxValue = 1000000; // 1000000000;
        this.fileSizeLimit = 25000000; // 25MB
        this.steps = 1000;
        this.months = [
            { id: 1, name: 'JAN' },
            { id: 2, name: 'FEB' },
            { id: 3, name: 'MAR' },
            { id: 4, name: 'APR' },
            { id: 5, name: 'MAY' },
            { id: 6, name: 'JUN' },
            { id: 7, name: 'JUL' },
            { id: 8, name: 'AUG' },
            { id: 9, name: 'SEP' },
            { id: 10, name: 'OCT' },
            { id: 11, name: 'NOV' },
            { id: 12, name: 'DEC' }
        ];
        this.confirmButtonColor = '#00b96f';
        this.cancelButtonColor = '#ee7b7c';
        this.phonePattern = '^[0-9]{5,15}$';
        this.emailPattern = '^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$';
        // public emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
        // ^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@(([0-9a-zA-Z])+([-\w]*[0-9a-zA-Z])*\.)+[a-zA-Z]{2,9})$
        // ^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$
        this.userType = {
            csr_buyer: 1,
            inhouse_broker: 2,
            csr_closer: 3,
            csr_seller: 4,
            bank: 5,
            notary: 6,
            user_buyer: 7,
            user_seller_dev: 8
        };
        this.buildingStatus = {
            1: 'Live',
            2: 'Pending Data',
            3: 'Submitted for approval',
            4: 'Rejected',
            5: 'Update requested',
            6: 'Hidden',
            7: 'Deleted'
        };
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
            SAVE_ENGLISH_COUNTRY_NAME: 'Please add country name in Spanish or we will update it same as in English.',
            SAVE_ENGLISH_STATE_NAME: 'Please add state name in Spanish or we will update it same as in English.',
            SAVE_ENGLISH_CITY_NAME: 'Please add city name in Spanish or we will update it same as in English.',
            SAVE_ENGLISH_PROPERTY_CONFIG: 'Please add property configuration in Spanish or we will update it same as in English.',
            SAVE_ENGLISH_PROPERTY_TYPE: 'Please add property type in Spanish or we will update it same as in English.',
            SAVE_ENGLISH_AMENITY: 'Please add amenity in Spanish or we will update it same as in English.',
            SAVE_ENGLISH_PROJECT_POSSESION: 'Please add possession status in Spanish or we will update it same as in English.',
            SAVE_ENGLISH_PROJECT_TYPE: 'Please add property type in Spanish or we will update it same as in English.',
            SAVE_ENGLISH_PROJECT_AMENITY: 'Please add amenity in Spanish or we will update it same as in English.',
            SAVE_ENGLISH_DOCUMENT_NAME: 'Please add document name in Spanish or we will update it same as in English.',
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
            NO_USER_FOUND: 'No user found!',
            NO_INTERESTED_PROPERTY_FOUND: 'No interests added by user.',
            NO_VIEWED_PROPERTY_FOUND: 'No property or project viewed by you.',
            NO_NOTE_FOUND: 'No notes to show.',
            FILE_SIZE_EXCEEDS: 'The file you have selected is too large. The maximum size is 25MB.'
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
            DOCUMENT_NAME_UPDATED_SUCCESSFULLY: 'Document name updated successfully',
            DOCUMENT_NAME_ADDED_SUCCESSFULLY: 'Document name added successfully',
            PROJECT_TYPE_UPDATED_SUCCESSFULLY: 'Project type updated successfully',
            PROJECT_TYPE_ADDED_SUCCESSFULLY: 'Project type added successfully',
            STATE_ADDED_SUCCESSFULLY: 'State added successfully',
            STATE_UPDATED_SUCCESSFULLY: 'State updated successfully',
            CITY_ADDED_SUCCESSFULLY: 'City added successfully',
            CITY_UPDATED_SUCCESSFULLY: 'City updated successfully',
            BLOCKED_SUCCESSFULLY: 'Blocked successfully',
            UNBLOCKED_SUCCESSFULLY: 'Unblocked successfully',
            NOTE_ADDED_SUCCESSFULLY: 'Note added successfully',
            NOTE_DELETED_SUCCESSFULLY: 'Note deleted successfully',
            DETAILS_UPDATED_SUCCESSFULLY: 'Details updated successfully',
        };
        this.title = {
            ARE_YOU_SURE: 'Are you sure',
            BLOCK_COUNTRY: 'You want to block this country?',
            UNBLOCK_COUNTRY: 'You want to unblock this country?',
            BLOCK_STATE: 'You want to block this state?',
            UNBLOCK_STATE: 'You want to unblock this state?',
            BLOCK_CITY: 'You want to block this city?',
            UNBLOCK_CITY: 'You want to unblock this city?',
            BLOCK_LOCALITY: 'You want to block this locality?',
            UNBLOCK_LOCALITY: 'You want to unblock this locality?',
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
            BLOCK_LEAD: 'You want to block this lead?',
            UNBLOCK_LEAD: 'You want to unblock this lead?',
            DELETE_BLOG: 'You want to delete this template?'
        };
    }
    return Constant;
}());

//# sourceMappingURL=constants.js.map

/***/ }),

/***/ "../../../../../src/app/common/generalFunctions.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GeneralFunctions; });
var GeneralFunctions = /** @class */ (function () {
    function GeneralFunctions() {
    }
    GeneralFunctions.prototype.generateRandomString = function () {
        var min = 1111111111;
        var max = 9999999999;
        var date3 = new Date();
        return 'img_' + date3.getUTCMilliseconds() + Math.floor(Math.random() * (max - min + 1) + min);
    };
    return GeneralFunctions;
}());

//# sourceMappingURL=generalFunctions.js.map

/***/ }),

/***/ "../../../../../src/app/directives/acl-permission.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AclPermissionDirective; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// import { AdminACL } from './../common/adminAcl';
var AclPermissionDirective = /** @class */ (function () {
    function AclPermissionDirective() {
        // console.log('yess');
        // console.log('aa', this.admin_acl);
        // this.admin_acl.forEach(element => {
        //   if (element.can_read === 0) {
        //     el.nativeElement.style.display = 'none';
        //   }
        // });
        // this.admin.loginData$.subscribe(success => {
        //   // console.log('succccccc', success);
        //   setTimeout(() => {
        //     this.admin_acl = success['admin_acl'];
        //     this.admin_acl.forEach(element => {
        //       // console.log(element);
        //       // console.log('aclId', this.aclId, element.acl_id);
        //       if (element.acl_id === this.aclId && element.can_read === 0) {
        //         el.nativeElement.style.display = 'none';
        //       }
        //       if (element.acl_id === this.adminAcl.permission.broker_management && element.can_read === 0 &&
        //         element.acl_id === this.adminAcl.permission.seller_management && element.can_read === 0 &&
        //         element.acl_id === this.adminAcl.permission.data_collector_management && element.can_read === 0) {
        //           el.nativeElement.style.display = 'none';
        //       }
        //     });
        //   }, 100);
        // });
    }
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('aclId'),
        __metadata("design:type", Object)
    ], AclPermissionDirective.prototype, "aclId", void 0);
    AclPermissionDirective = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[appAclPermission]'
        }),
        __metadata("design:paramtypes", [])
    ], AclPermissionDirective);
    return AclPermissionDirective;
}());

//# sourceMappingURL=acl-permission.directive.js.map

/***/ }),

/***/ "../../../../../src/app/fire-base/messaging.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase__ = __webpack_require__("../../../../firebase/firebase-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_take__ = __webpack_require__("../../../../rxjs/add/operator/take.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_take___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_take__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessagingService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MessagingService = /** @class */ (function () {
    function MessagingService() {
        this.messageSource = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["BehaviorSubject"](null);
        this.currentMessage$ = this.messageSource.asObservable();
        this.messaging = __WEBPACK_IMPORTED_MODULE_1_firebase__["messaging"]();
        this.getFcmToken();
        this.receiveMessage();
    }
    MessagingService.prototype.getFcmToken = function () {
        // console.log(this.getFcmToken);
        this.getPermission();
        return this.fcmTokens;
    };
    MessagingService.prototype.getPermission = function () {
        var _this = this;
        this.messaging.requestPermission()
            .then(function () {
            return _this.messaging.getToken();
        })
            .then(function (token) {
            console.log(token);
            return _this.fcmTokens = token;
        })
            .catch(function (err) {
            console.log(err);
        });
    };
    MessagingService.prototype.receiveMessage = function () {
        var _this = this;
        this.messaging.onMessage(function (payload) {
            console.log(payload);
            _this.messageSource.next(payload);
        });
    };
    MessagingService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], MessagingService);
    return MessagingService;
}());

//# sourceMappingURL=messaging.service.js.map

/***/ }),

/***/ "../../../../../src/app/forgot-password/forgot-password.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/forgot-password/forgot-password.component.html":
/***/ (function(module, exports) {

module.exports = "\n<section id=\"wrapper\">\n    <header>\n        <div class=\"row\">\n            <div class=\"col-6\">\n                <a class=\"logo\" href=\"\">\n                    <img class=\"app-logo\" src=\"assets/img/logo.png\" alt=\"img\">\n                </a>\n            </div>\n        </div>\n    </header>\n\n    <div class=\"login\">\n        <div class=\"container\">    \n            <div class=\"row\">\n                <div class=\"col-xl-8 col-lg-6 col-md-6 col-12\">\n                    <h2>One Easy Solution for Your Needs.</h2>\n                    <p class=\"p18\">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.</p>\n                </div>\n                <div class=\"col-xl-4 col-lg-6 col-md-6 col-12\">\n                    <form class=\"form-horizontal text-center\" #loginForm=\"ngForm\" role=\"form\" novalidate (ngSubmit)=\"forgotPassword(loginForm)\">\n                        <h3>Enter your email</h3>\n                        <p>Don't worry. Resetting your password is easy, just tell us the email\n                            address you registered with us.</p>\n                        <div class=\"form-group-3\">\n                            <input autocomplete=\"off\" [pattern]=\"constant.emailPattern\" class=\"form-control\" placeholder=\"Registered Email\" id=\"email\" required [(ngModel)]=\"model.email\" name=\"email\" #input1 #email=\"ngModel\">\n                            <div *ngIf=\"email.errors && (email.dirty || email.touched)\" class=\"show-error\">\n                                <div [hidden]=\"!email.errors.required\">\n                                    Please enter email.\n                                </div>\n                                <div [hidden]=\"!email.errors.pattern\">\n                                    Please enter valid email.\n                                </div>\n                            </div>\n                        </div>\n                        <a class=\"fgt-pswd\" href=\"/login\"> << Back to login.</a>\n                        <div class=\"btn-cont text-right\">\n                            <button type=\"submit\" [disabled]=\"loginForm.invalid\" class=\"btn btn-primary login-btn mgt-50\">SEND</button>\n                        </div>\n                        <!-- <button type=\"submit\" [disabled]=\"loginForm.invalid\" class=\"login-btn mgt-50\">SEND</button> -->\n                        <p class=\"text-center\">By login you are agree to <a href=\"javascript://\"> Terms & Condition </a>\n                            and <a href=\"javascript://\"> Privacy Policy</a> of {{projectName}}.</p>\n                    </form>\n                </div>\n            </div>\n        </div>\n    </div>\n</section>"

/***/ }),

/***/ "../../../../../src/app/forgot-password/forgot-password.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
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




var ForgotPasswordComponent = /** @class */ (function () {
    function ForgotPasswordComponent(admin, router, constant) {
        this.admin = admin;
        this.router = router;
        this.constant = constant;
        this.parameter = {};
        this.model = {
            email: ''
        };
        var token = localStorage.getItem('token');
        if (token) {
            this.router.navigate(['dashboard/view-inhouse-users/data-collectors']);
        }
    }
    ForgotPasswordComponent.prototype.ngOnInit = function () {
        this.projectName = this.constant.projectName;
    };
    ForgotPasswordComponent.prototype.forgotPassword = function (formData) {
        var _this = this;
        this.parameter.loading = true;
        var input = new FormData();
        input.append('email', formData.value.email);
        this.admin.postDataApi('forgotPassword', input)
            .subscribe(function (success) {
            _this.parameter.loading = false;
            swal('Success', success.message, 'success');
            formData.reset();
            _this.router.navigate(['']);
        });
    };
    var _a, _b, _c;
    ForgotPasswordComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-forgot-password',
            template: __webpack_require__("../../../../../src/app/forgot-password/forgot-password.component.html"),
            styles: [__webpack_require__("../../../../../src/app/forgot-password/forgot-password.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */]) === "function" ? _a : Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" ? _b : Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__common_constants__["a" /* Constant */]) === "function" ? _c : Object])
    ], ForgotPasswordComponent);
    return ForgotPasswordComponent;
}());

//# sourceMappingURL=forgot-password.component.js.map

/***/ }),

/***/ "../../../../../src/app/guards/acl-user.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AclUserGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AclUserGuard = /** @class */ (function () {
    function AclUserGuard(admin, location, router) {
        this.admin = admin;
        this.location = location;
        this.router = router;
    }
    AclUserGuard.prototype.canActivate = function (next, state) {
        var _this = this;
        this.admin.admin_acl = this.admin.admin_acl ? this.admin.admin_acl : {};
        this.admin.permissions = this.admin.permissions ? this.admin.permissions : {};
        if (Object.keys(this.admin.permissions).length === 0 && Object.keys(this.admin.admin_acl).length === 0) {
            return this.admin.getDetails().map(function (e) {
                if (e) {
                    return _this.checkData(next, state, _this.admin.admin_acl, _this.admin.permissions);
                }
            }).catch(function () {
                // this.location.back();
                return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of(false);
            });
        }
        else {
            return this.checkData(next, state, this.admin.admin_acl, this.admin.permissions);
        }
    };
    AclUserGuard.prototype.checkData = function (next, state, admin_acl, permissions) {
        var roles = next.data['roles'];
        var key = roles ? roles[0] : '';
        var subkey = roles ? roles[1] : '';
        var inhouseUserRole = roles ? roles[2] : '';
        // const admin_acl = JSON.parse(localStorage.getItem('admin_acl'));
        // const permissions = JSON.parse(localStorage.getItem('permissions'));
        if (permissions || admin_acl) {
            var obj = admin_acl[key];
            if (((state.url === '/dashboard/view-inhouse-users/data-collectors') &&
                (admin_acl['Data Collector Management']['can_read'] === 1)) ||
                ((state.url === '/dashboard/view-inhouse-users/csr-sellers') && (admin_acl['Seller Management']['can_read'] === 1)) ||
                ((state.url === '/dashboard/view-inhouse-users/csr-buyers') && (admin_acl['Buyer Management']['can_read'] === 1)) ||
                ((state.url === '/dashboard/view-inhouse-users/inhouse-broker') && (admin_acl['Broker Management']['can_read'] === 1)) ||
                ((state.url === '/dashboard/view-inhouse-users/csr-closers') && (admin_acl['Closer Management']['can_read'] === 1))) {
                return true;
            }
            else if ((obj && obj[subkey] === 1) || (permissions && permissions[inhouseUserRole] === 1)) {
                return true;
            }
            else {
                this.location.back();
                return false;
            }
        }
        else {
            return false;
        }
    };
    var _a, _b, _c;
    AclUserGuard = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_admin_service__["a" /* AdminService */]) === "function" ? _a : Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__angular_common__["Location"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_common__["Location"]) === "function" ? _b : Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" ? _c : Object])
    ], AclUserGuard);
    return AclUserGuard;
}());

//# sourceMappingURL=acl-user.guard.js.map

/***/ }),

/***/ "../../../../../src/app/guards/auth.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_login_model__ = __webpack_require__("../../../../../src/app/models/login.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_http_interceptor__ = __webpack_require__("../../../../../src/app/services/http-interceptor.ts");
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





var AuthGuard = /** @class */ (function () {
    function AuthGuard(router, interceptor, admin, loginModel, aclModel) {
        this.router = router;
        this.interceptor = interceptor;
        this.admin = admin;
        this.loginModel = loginModel;
        this.aclModel = aclModel;
    }
    AuthGuard.prototype.canActivate = function () {
        var _this = this;
        this.interceptor.loader.next({ value: true });
        // console.log('auth guard');
        var token = localStorage.getItem('token');
        if (token) {
            // return new Promise(resolve => {
            //   this.admin.login.subscribe(success => {
            //     this.interceptor.loader.next({value: true});
            //     console.log('outside', success);
            //     if (success['name'] === undefined) {
            //       this.interceptor.loader.next({value: true});
            //       console.log('inside');
            //       this.admin.postDataApi('get-details', {})
            //       .subscribe(
            //         success1 => {
            //           this.interceptor.loader.next({value: true});
            //           console.log('ssss1', success1);
            //           this.admin.login.next(success1.data);
            //           this.admin.permissions = success1.data.permissions ? success1.data.permissions : {};
            //           const aclData: any = {};
            //           const dd = success1.data.m.map((obj, index) => {
            //             const key =  Object.keys(obj)[0];
            //             this.admin.admin_acl[key] =  obj[key];
            //           });
            //           this.interceptor.loader.next({value: false});
            //           console.log('111111');
            //           resolve();
            //           return true;
            //         });
            //     } else {
            //       console.log('inside guard');
            //       resolve();
            //       return true;
            //     }
            //   });
            // });
            this.admin.login.subscribe(function (success) {
                _this.interceptor.loader.next({ value: true });
                // console.log('outside', success);
                if (success['name'] === undefined) {
                    _this.interceptor.loader.next({ value: true });
                    // console.log('inside');
                    _this.admin.postDataApi('get-details', {})
                        .subscribe(function (success1) {
                        _this.interceptor.loader.next({ value: true });
                        // console.log('ssss1', success1);
                        _this.admin.login.next(success1.data);
                        _this.admin.permissions = success1.data.permissions ? success1.data.permissions : {};
                        var aclData = {};
                        var dd = success1.data.m.map(function (obj, index) {
                            var key = Object.keys(obj)[0];
                            _this.admin.admin_acl[key] = obj[key];
                        });
                        _this.interceptor.loader.next({ value: false });
                        // console.log('111111');
                    });
                }
            });
            // this.admin.country.subscribe(success => {
            //   console.log('22222');
            //   if (!success[0]) {
            //     this.admin.postDataApi('getCountryLocality', {})
            //     .subscribe(
            //       success1 => {
            //         console.log('3333');
            //         this.admin.country.next(success1.data);
            //       });
            //   }
            // });
            // console.log('inside guard');
            return true;
        }
        // console.log('====');
        this.router.navigate(['']);
        return false;
    };
    var _a, _b, _c, _d, _e;
    AuthGuard = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" ? _a : Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__services_http_interceptor__["a" /* HttpInterceptor */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_http_interceptor__["a" /* HttpInterceptor */]) === "function" ? _b : Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */]) === "function" ? _c : Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__models_login_model__["a" /* Login */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__models_login_model__["a" /* Login */]) === "function" ? _d : Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__models_login_model__["b" /* AdminACL */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__models_login_model__["b" /* AdminACL */]) === "function" ? _e : Object])
    ], AuthGuard);
    return AuthGuard;
}());

//# sourceMappingURL=auth.guard.js.map

/***/ }),

/***/ "../../../../../src/app/lang/app.en.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return locale; });
var locale = {
    'lang': 'en',
    'data': {
        'app': {
            'Properties': 'Properties',
            'Property': 'Property',
            'Building': 'Building',
            'Projects': 'Projects',
            'Project': 'Project',
            'Localities': 'Localities',
            'Locality': 'Locality',
            'Developers': 'Developers',
            'Developer': 'Developer',
            'Customers': 'Customers',
            'Budget': 'Budget',
            'Min': 'Min',
            'Max': 'Max',
            'Configurations': 'Configurations',
            'Configuration': 'Configuration',
            'Configuration_type': 'Configuration type',
            'Listed_By': 'Listed By',
            'Possession': 'Possession',
            'Possession_Date': 'Possession Date',
            'Status': 'Status',
            'No_Results_found': 'No Results found',
            'Not_available': 'Not available',
            'Property_Status': 'Property Status',
            'Property_Type': 'Property Type',
            'Property_For': 'Property For',
            'Home': 'Home',
            'Base_Price': 'Base Price',
            'Price_on_Request': 'Price on Request',
            'View_Photos': 'View Photos',
            'Min_Price_per_Sq_feet': 'Min. Price per Sq. feet',
            'Carpet_Area': 'Carpet Area',
            'Overview': 'Overview',
            'Amenities': 'Amenities',
            'Home_Loans': 'Home Loans',
            'Fixed_Interest': 'Fixed Interest',
            'Contact_Developer': 'Contact Developer',
            'Contact': 'Contact',
            'Configs': 'Configs',
            'Contact_Developer_title': 'Find best quote on interested property.',
            'Contact_More_Text': 'I would like to know more about the property.',
            'Also_Register': 'Also register me on the platform',
            'Add': 'Add',
            'Title': 'Title',
            'Archived': 'Archived',
            'Inactive': 'Inactive',
            'Delete': 'Delete',
            'Buy': 'Buy',
            'Rent': 'Rent',
            'Sale': 'Sale',
            'i_want_to': 'I want to',
            'properties_in': 'properties in',
            'i_am_looking_to': 'I\'m looking to',
            'Search': 'Search',
            'home_search_placeholder': 'Enter an agent, neighborhood, address, ZIP code, or listing ID',
            'Home_Box_1_Title': 'Buy/Rent any property',
            'Home_Box_1_Desc': 'Your step-by-step guide through the long, complex journey of selling or renting your property. Here’s how you can navigate the 4 essential parts of the home buying journey.',
            'Home_Box_2_Title': 'Selling & Buying Guide',
            'Home_Box_2_Desc': 'Your step-by-step guide through the long, complex journey of home buying. Here’s how you can navigate the 4 essential parts of the home buying journey.',
            'EXPLORE': 'EXPLORE',
            'Recommended': 'Recommended',
            'Recommended_title_home': 'Properties you might be interested in',
            'Exclusive': 'Exclusive',
            'Exclusive_title': 'Our Top Developers',
            'FEATURED': 'FEATURED',
            'FEATURED_title': 'Our exclusives in The',
            'Trending': 'Trending',
            'Trending_title': 'Popular Projects in',
            'Localities_in': 'Localities in',
            'news_updates': 'News and Updates',
            'news_updates_title': 'Our Blogs & Articles',
            'view_all': 'View All',
            'Dated': 'Dated',
            'About_Us': 'About Us',
            'New_Projects': 'New Projects',
            'Our_Developers': 'Our Developers',
            'Contact_Us': 'Contact Us',
            'Get_Started': 'Get Started',
            'Hello': 'Hello',
            'Name': 'Name',
            'Email': 'Email',
            'Phone': 'Phone',
            'Contact_Number': 'Contact Number',
            'Available_for': 'Available for',
            'Area': 'Area',
            'Description': 'Description',
            'Specifications': 'Specifications',
            'Bedrooms': 'Bedrooms',
            'Bathrooms': 'Bathrooms',
            'Parking': 'Parking',
            'Furnished': 'Furnished',
            'Pets_Allowed': 'Pets Allowed',
            'Submit': 'Submit',
            /**/
            'FileSizeExceeds': 'The file you have selected is too large. The maximum size is 25MB',
            'NOTE_ADDED_SUCCESSFULLY': 'Note Added Successfully',
            'NOTE_DELETED_SUCCESSFULLY': 'Note Deleted Succesfully',
            /* Profile menus */
            'View_Profile': 'View Profile',
            'SwitchToSeller': 'Switch to Seller Profile',
            'SwitchToBuyer': 'Switch to Buyer Profile',
            'Profile_Preferences': 'Profile Preferences',
            'Buyer_Profile': 'Buyer Profile',
            'My_Favourites': 'My Favourites',
            'My_Properties': 'My Properties',
            'Interested_Properties': 'Interested Properties',
            'My_Chat': 'My Chat',
            'Notifications': 'Notifications',
            'Tools': 'Tools',
            'Deals_Finalised': 'Deals Finalised',
            'Logout': 'Logout',
            'Leads': 'Leads',
            'Chat': 'Chat',
        }
    }
};
//# sourceMappingURL=app.en.js.map

/***/ }),

/***/ "../../../../../src/app/lang/app.es.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return locale; });
var locale = {
    'lang': 'es',
    'data': {
        'app': {
            'Title': 'Título',
            'Archived': 'Archived',
            'Inactive': 'Archivado',
            'Delete': 'Borrar',
            'Buy': 'Comprar',
            'Rent': 'Alquilar',
            'i_want_to': 'Quiero',
            'properties_in': 'propiedades en',
            'i_am_looking_to': 'Estoy buscando',
            'Search': 'Buscar',
            'home_search_placeholder': 'Ingrese un agente, vecindario, dirección, código postal o ID de listado',
            'Home_Box_1_Title': 'Comprar/Alquilar cualquier propiedad',
            'Home_Box_1_Desc': 'Su guía paso a paso a través del largo y complejo viaje de vender o alquilar su propiedad. A continuación, le indicamos cómo puede navegar las 4 partes esenciales del recorrido de compra de una vivienda.',
            'Home_Box_2_Title': 'Guía de venta y compra',
            'Home_Box_2_Desc': 'Su guía paso a paso a través del largo y complejo recorrido de la compra de una casa. A continuación, le indicamos cómo puede navegar las 4 partes esenciales del recorrido de compra de una vivienda',
            'EXPLORE': 'EXPLORAR',
            'Recommended': 'Recomendado',
            'Recommended_title_home': 'Propiedades en las que podría estar interesado',
            'Exclusive': 'Exclusivo',
            'Exclusive_title': 'Nuestros mejores desarrolladores',
            'FEATURED': 'DESTACADO',
            'FEATURED_title': 'Nuestras exclusivas en The',
            'Trending': 'Tendencias',
            'Trending_title': 'Proyectos Populares en',
            'Localities': 'Localidades',
            'Localities_in': 'Localidades en',
            'news_updates': 'Noticias y Actualizaciones',
            'news_updates_title': 'Nuestros Blogs y Artículos',
            'view_all': 'Ver todo',
            'Dated': 'Anticuado',
            'About_Us': 'Sobre Nosotros ',
            'New_Projects': 'Proyectos nuevos',
            'Our_Developers': 'Nuestros desarrolladores',
            'Contact_Us': 'Contáctenos',
            'Get_Started': 'Empezar',
            'Hello': 'Hola',
            /* Profile menus */
            'View_Profile': 'Ver perfil',
            'SwitchToSeller': 'Cambiar al perfil del vendedor',
            'SwitchToBuyer': 'Cambiar al perfil del comprador',
            'Buyer_Profile': 'Perfil del comprador',
            'My_Favourites': 'Mis favoritos',
            'My_Properties': 'Mis propiedades',
            'Interested_Properties': 'Propiedades Interesadas',
            'My_Chat': 'Mi Chat',
            'Notifications': 'Notificaciones',
            'Tools': 'Herramientas',
            'Deals_Finalised': 'Deals Finalised',
            'Logout': 'Cerrar sesión',
            'Leads': 'Conductores',
            'Chat': 'Chat',
        }
    }
};
//# sourceMappingURL=app.es.js.map

/***/ }),

/***/ "../../../../../src/app/lang/translate.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_en__ = __webpack_require__("../../../../../src/app/lang/app.en.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_es__ = __webpack_require__("../../../../../src/app/lang/app.es.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TranslateService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TranslateService = /** @class */ (function () {
    function TranslateService() {
        this.dictionary = {
            'en': __WEBPACK_IMPORTED_MODULE_1__app_en__["a" /* locale */],
            'es': __WEBPACK_IMPORTED_MODULE_2__app_es__["a" /* locale */]
        };
        this.lang_code = 'en';
        //console.log(this.dictionary[this.lang_code]);
        this.lang = this.dictionary[this.lang_code].data.app;
    }
    TranslateService.prototype.setLanguage = function (code) {
        this.lang_code = code;
        this.lang = this.dictionary[this.lang_code].data.app;
        //console.log(this.dictionary[this.lang_code]);
    };
    TranslateService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], TranslateService);
    return TranslateService;
}());

//# sourceMappingURL=translate.service.js.map

/***/ }),

/***/ "../../../../../src/app/layout/common-blocks/block-get-property/block-get-property.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/common-blocks/block-get-property/block-get-property.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- add property to interested_properties -->\n<a class=\"btn btn-fourth\" #showPropertyWithSearchModal href=\"javascript://\" data-toggle=\"modal\" data-target=\"#add-property\"></a>\n<div *ngIf=\"location?.countries\" class=\"modal\" id=\"add-property\">\n  <div class=\"modal-dialog modal-lg\">\n    <div class=\"modal-content notary-avail\">\n        <div class=\"modal-header popup-header\">\n          <h4 class=\"modal-title\">Properties available</h4>\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #hidePropertyWithSearchModal>&times;</button>\n        </div>\n        <div class=\"modal-body\">\n            <div class=\"row\">\n                \n                <div class=\"col-3\">\n                    <div class=\"form-group\">\n                    <label>Country</label>\n                    <select class=\"form-control\" (change)=\"onCountryChange($event.target.value)\">\n                        <option value=\"0\">All</option>\n                        <option *ngFor=\"let item of location.countries\" [value]=\"item.id\">{{item.name}}</option>\n                    </select>\n                    </div>\n                </div>\n                <div class=\"col-3\">\n                    <div class=\"form-group\">\n                    <label>State</label>\n                    <select class=\"form-control\" (change)=\"onStateChange($event.target.value)\">\n                        <option value=\"0\">All</option>\n                        <option *ngFor=\"let item of location.states\" [value]=\"item.id\">{{item.name}}</option>\n                    </select>\n                    </div>\n                </div>\n                <div class=\"col-3\">\n                    <div class=\"form-group\">\n                    <label>City</label>\n                        <select class=\"form-control\" (change)=\"onCityChange($event.target.value)\">\n                        <option value=\"0\">All</option>\n                        <option *ngFor=\"let item of location.cities\" [value]=\"item.id\">{{item.name}}</option>\n                        </select>\n                    </div>\n                </div>\n                <div class=\"col-3\">\n                    <div class=\"form-group\">\n                    <label>Locality</label>\n                    <select class=\"form-control\" (change)=\"onLocalityChange($event.target.value)\">\n                        <option value=\"0\">All</option>\n                        <option *ngFor=\"let item of location.localities\" [value]=\"item.id\">{{item.name}}</option>\n                    </select>\n                    </div>\n                </div>\n                <div class=\"col-3\">\n                    <div class=\"form-group\">\n                    <label>Building</label>\n                    <select class=\"form-control\" (change)=\"onBuildingChange($event.target.value)\">\n                        <option value=\"0\">All</option>\n                        <option *ngFor=\"let item of location.buildings\" [value]=\"item.id\">{{item.name}}</option>\n                    </select>\n                    </div>\n                </div>\n                <div class=\"col-3\">\n                    <div class=\"form-group btn-cont\">\n                    <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n                    <button type=\"button\" (click)=\"getListing()\" class=\"btn btn-primary-new width100P\">Apply</button>\n                    </div>\n                </div>\n                <div class=\"col-3\">\n                    \n                </div>\n                <div class=\"col-3\">\n                    <div class=\"form-group\">\n                        <label>Search</label>\n                        <div class=\"d-flex\">\n                            <div class=\"searh-3\">\n                                <input class=\"form-control\" type=\"text\" [(ngModel)]=\"parameter.keyword\" (keyup.enter)=\"getListing()\" name=\"\">\n                                <button (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                \n            </div>\n\n            <div class=\"btn-cont text-right marginT15\" *ngIf=\"parameter.total\">\n                <!-- <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls> -->\n            </div>\n\n            <div *ngIf=\"loading\" class=\"padding20\">\n                <img src=\"assets/img/loading_content.gif\" alt=\"loading...\"/>\n            </div>\n            <div *ngIf=\"!loading && items?.length==0\">\n                <p class=\"show-not-found\">No property found for selected filters.</p>\n            </div>\n\n            <table class=\"table\" style=\"min-height:200px;\">\n              <tbody *ngIf=\"!loading && items.length > 0\">\n                <tr *ngFor=\"let item of items | paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: parameter.total }\">\n                  <td>\n                      <div class=\"n-avail-profile\">\n                        <img [src]=\"item.image\" onerror='src=\"assets/img/house.png\"' alt=\"img\">\n                        <div class=\"n-avail-info\">\n                            <p class=\"p12\">{{item.building.name}}</p>\n                            <p class=\"p10 marginB0\">{{item.building.address ? item.building.address : 'NA'}}</p>\n                            <p class=\"p10\">{{item.configuration.name}}</p>\n                        </div>\n                      </div>\n                  </td>\n                  <td>\n                      <!-- <label class=\"cust-check-bx float-right\">\n                      <input type=\"radio\" name=\"bank_id1\" (click)=\"selectItem(item)\">\n                      <span class=\"checkmark\"></span>\n                      </label> -->\n                      <div class=\"form-group btn-cont\">\n                          <button (click)=\"selectItem(item)\" class=\"btn btn-primary-new\">Send</button>\n                      </div>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n            \n            <div class=\"btn-cont text-right marginT15\" *ngIf=\"parameter.total\">\n                <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n            </div>\n\n        </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/layout/common-blocks/block-get-property/block-get-property.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BlockGetPropertyComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var BlockGetPropertyComponent = /** @class */ (function () {
    function BlockGetPropertyComponent(admin, constant) {
        this.admin = admin;
        this.constant = constant;
        this.itemSelect = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.parameter = {};
        this.location = {};
        this.items = [];
        this.loading = false;
    }
    BlockGetPropertyComponent.prototype.ngOnInit = function () {
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        this.getCountries();
        this.getListing();
    };
    BlockGetPropertyComponent.prototype.getListing = function () {
        var _this = this;
        this.loading = true;
        this.admin.postDataApi('propertySearch', this.parameter).subscribe(function (r) {
            console.log(r);
            _this.loading = false;
            _this.items = r['data'];
            _this.parameter.total = r['total'];
        }, function (error) {
            _this.loading = false;
            _this.parameter.total = 0;
        });
    };
    BlockGetPropertyComponent.prototype.getPage = function (page) {
        this.parameter.page = page;
        this.getListing();
    };
    BlockGetPropertyComponent.prototype.showModal = function () {
        this.showPropertyWithSearchModal.nativeElement.click();
    };
    BlockGetPropertyComponent.prototype.getCountries = function () {
        var _this = this;
        this.admin.postDataApi('getCountryLocality', {}).subscribe(function (r) {
            console.log(r);
            _this.location.countries = r['data'];
        });
    };
    BlockGetPropertyComponent.prototype.onCountryChange = function (id) {
        this.location.states = [];
        this.parameter.state_id = '0';
        this.location.cities = [];
        this.parameter.city_id = '0';
        this.location.localities = [];
        this.parameter.locality_id = '0';
        this.location.buildings = [];
        this.parameter.building_id = '0';
        if (!id || id === '0') {
            this.parameter.state_id = '0';
            return false;
        }
        this.parameter.country_id = id;
        var selectedCountry = this.location.countries.filter(function (x) { return x.id.toString() === id; });
        this.location.states = selectedCountry[0].states;
    };
    BlockGetPropertyComponent.prototype.onStateChange = function (id) {
        this.location.cities = [];
        this.parameter.city_id = '0';
        this.location.localities = [];
        this.parameter.locality_id = '0';
        this.location.buildings = [];
        this.parameter.building_id = '0';
        if (!id || id === '0') {
            this.parameter.city_id = '0';
            return false;
        }
        this.parameter.state_id = id;
        var selectedState = this.location.states.filter(function (x) { return x.id.toString() === id; });
        this.location.cities = selectedState[0].cities;
    };
    BlockGetPropertyComponent.prototype.onCityChange = function (id) {
        this.location.localities = [];
        this.parameter.locality_id = '0';
        this.location.buildings = [];
        this.parameter.building_id = '0';
        if (!id || id === '0') {
            this.parameter.locality_id = '0';
            return false;
        }
        this.parameter.city_id = id;
        var selectedCountry = this.location.cities.filter(function (x) { return x.id.toString() === id; });
        this.location.localities = selectedCountry[0].localities;
    };
    BlockGetPropertyComponent.prototype.onLocalityChange = function (id) {
        this.location.buildings = [];
        this.parameter.building_id = '0';
        if (!id || id === 0) {
            this.parameter.building_id = '0';
            return false;
        }
        this.parameter.locality_id = id;
        var selectedCountry = this.location.localities.filter(function (x) { return x.id.toString() === id; });
        this.location.buildings = selectedCountry[0].buildings;
    };
    BlockGetPropertyComponent.prototype.onBuildingChange = function (id) {
        if (!id || id === '0') {
            return false;
        }
        this.parameter.building_id = id;
        this.getListing();
    };
    BlockGetPropertyComponent.prototype.selectItem = function (item) {
        this.hidePropertyWithSearchModal.nativeElement.click();
        this.itemSelect.emit(item);
    };
    var _a, _b, _c, _d;
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('showPropertyWithSearchModal'),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _a : Object)
    ], BlockGetPropertyComponent.prototype, "showPropertyWithSearchModal", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('hidePropertyWithSearchModal'),
        __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _b : Object)
    ], BlockGetPropertyComponent.prototype, "hidePropertyWithSearchModal", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], BlockGetPropertyComponent.prototype, "itemSelect", void 0);
    BlockGetPropertyComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-block-get-property',
            template: __webpack_require__("../../../../../src/app/layout/common-blocks/block-get-property/block-get-property.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/common-blocks/block-get-property/block-get-property.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */]) === "function" ? _c : Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__common_constants__["a" /* Constant */]) === "function" ? _d : Object])
    ], BlockGetPropertyComponent);
    return BlockGetPropertyComponent;
}());

//# sourceMappingURL=block-get-property.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/common-blocks/chat/chat.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".new-loader{\n    /* float: right;\n    border-radius: 10px 0 10px 10px;\n    height: 120px;\n    position: relative; */\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/common-blocks/chat/chat.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"white-bg move-below\">\n    <div class=\"chat-area scrollbox\" malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\" style=\"height: 704px; width: 429px; padding-right: 17px; outline: none; overflow: hidden;\">\n      <div *ngIf=\"loadmore\" class=\"chat-load-more\" (click)=\"loadMore(admin_id)\" >\n        Previous Messages <img *ngIf=\"loadmoring\" src=\"assets/img/loading-p.gif\">\n      </div> \n\n      <div *ngFor=\"let m of parameter.messages; let i=index\" class=\"chat-user\" [ngClass]=\"m?.conversation_user?.admin_id == admin_id ? 'chat-user-one' : 'chat-user-two'\">\n          <p *ngIf=\"m.message_type == 1\" style=\"word-wrap: break-word;\">\n              <!-- <span *ngIf=\"m.loading\" class=\"m-loader\"><img src=\"assets/img/loading-p.gif\"></span> -->\n              <span>{{m.message}}</span>\n            </p>\n  \n            <!-- <a class=\"btn btn-sm btn-danger\" [group]=\"group\" ng-box href=\"{{lastReport.image.original}}\">View</a> -->\n            <!-- <a *ngIf=\"m.message_type == 2\" ng-box width=\"800\" height=\"800\" target=\"_blank\" href=\"{{m.image}}\">\n                <img src=\"{{m.image}}\">\n            </a> -->\n            <a *ngIf=\"m.message_type == 2\" href=\"{{m.image}}\" data-lightbox=\"image\" title=\"image\" >\n              <span>\n                <img class=\"ui bordered small image\" src=\"{{m.image}}\">\n                <div *ngIf=\"m.loading\" class=\"loaderr\"></div>\n              </span>\n            </a>\n            <!-- <a *ngIf=\"m.message_type == 2\" href=\"{{m.image}}\" data-lightbox=\"image\" data-title=\"My caption\">\n              <img class=\"ui bordered small image\" src=\"{{m.image}}\">\n              \n            </a> -->\n            <!-- <a *ngIf=\"m.message_type == 3\" href=\"{{m.video}}\" title=\"Video\" class=\"chat-vid\">\n              <span >\n                <img class=\"ui bordered small image\" src=\"{{m.image}}\">\n                <img *ngIf=\"!m.loading\" class=\"vid-icon\" (click)=\"playVideo(i)\" src=\"assets/img/play-button.png\" />\n                <div *ngIf=\"m.loading\" class=\"loaderr\"></div>\n              </span>\n            </a> -->\n            \n            <div class=\"chat-vid\" *ngIf=\"m.message_type == 3 && !m.play\">\n              <span>\n                  <img class=\"ui bordered small image\" src=\"{{m.image}}\" onerror=\"this.src='assets/img/placeholder.png'\">\n                  <img *ngIf=\"!m.loading\" class=\"vid-icon\" (click)=\"playVideo(i)\" src=\"assets/img/play-button.png\" />\n                  <div *ngIf=\"m.loading\" class=\"loaderr\"></div>\n                  <div class=\"clearfix\"></div>\n            </span>\n            </div>\n            <video *ngIf=\"m.message_type == 3 && m.play\" src=\"{{m.video}}\" autoplay type=\"video/mp4\" controls></video>\n            \n            <!-- <div class=\"chat-vid\" *ngIf=\"m.message_type == 3 && !m.play\">\n              <span>\n                <img class=\"vid-img\" src=\"{{m.image}}\">\n                <img class=\"vid-icon\" (click)=\"playVideo(i)\" src=\"assets/img/play-button (2).png\"/>\n                <div class=\"clearfix\"></div>\n            </span>\n            </div> -->\n            <!-- <video *ngIf=\"m.message_type == 3 && m.play\" src=\"{{m.video}}\" autoplay type=\"video/mp4\" controls></video> -->\n            \n            <div class=\"chat-shared-file\" *ngIf=\"m.message_type == 4\">\n              <span *ngIf=\"m.loading\" class=\"m-loader\">\n                <img class=\"ui bordered small image\" src='assets/img/placeholder.png'>\n                <div *ngIf=\"m.loading\" class=\"loaderr\"></div>\n              </span>\n              <span *ngIf=\"!m.loading\">\n                <a href=\"javascript://\" target=\"_blank\" href=\"{{m.attachment}}\"><span>{{m.attachment_name}} <img class=\"viewfull\" src=\"assets/img/viewfull.png\"></span>\n                </a>\n              </span>\n            </div>\n              \n            <a *ngIf=\"m.message_type == 5\" href=\"{{m.property_url}}\" target=\"_blank\" title=\"image\" >\n              <span>\n                <img class=\"ui bordered small image\" src=\"{{m.image}}\">\n                <div *ngIf=\"m.loading\" class=\"loaderr\"></div>\n              </span>\n              <h5>{{m.message}}</h5>\n            </a>\n        \n\n        <span class=\"time\" *ngIf=\"m.updated_at && m.id\">{{m.updated_at| moment}}</span>\n        <span class=\"time\" *ngIf=\"m.updated_at && !m.id\">{{m.updated_at|date:'h:mm a'|lowercase}}, {{m.updated_at|date: 'MMM d y'}}</span>\n        <span class=\"time\" *ngIf=\"m?.conversation_user?.admin_id != admin_id\">\n          <strong>By - {{m?.conversation_user?.user?.name?m?.conversation_user?.user?.name:m?.conversation_user?.admin?.name}}</strong>\n        </span>\n      </div>\n  </div>\n\n  <div style=\"position: absolute; z-index: 1; margin: 0px; padding: 0px; other: block; left: 581px; top: 91px;\"><div class=\"enscroll-track track3\" style=\"position: relative; height: 367px;\"><a href=\"\" class=\"handle3\" style=\"position: absolute; z-index: 1; height: 199.244px; top: 0px;\"><div class=\"top\"></div><div class=\"bottom\"></div></a></div></div>\n\n  <div class=\"chat-text\">\n    <div class=\"dropdown attach-items\">\n      <a *ngIf=\"(sent_as==constant.userType.csr_buyer && (admin?.admin_acl['Buyer Lead Management']?.can_update==1 || admin?.permissions?.can_csr_buyer==1)) ||\n      (sent_as==constant.userType.inhouse_broker && (admin?.admin_acl['Broker Lead Management']?.can_update==1 || admin?.permissions?.can_in_house_broker==1)) ||\n      (sent_as==constant.userType.notary && (admin?.admin_acl['Notary Lead Management']?.can_update==1 || admin?.permissions?.can_noatary==1)) ||\n      (sent_as==constant.userType.bank && (admin?.admin_acl['Bank Lead Management']?.can_update==1 || admin?.permissions?.can_bank==1)); else noPermissiom\" href=\"javascript://\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" #optionsButton>\n     <i class=\"fa fa-paperclip\" aria-hidden=\"true\"></i>\n      </a>\n\n      <ng-template #noPermissiom>\n        <a>\n          <i class=\"fa fa-paperclip\" aria-hidden=\"true\"></i>\n        </a>\n      </ng-template>\n\n      <div class=\"dropdown-menu\">\n        <div class=\"dropdown-item\">\n          <input type=\"file\" name=\"image\" accept=\"image/*\" (change)=\"onSelectFile('image', $event)\">\n          <i class=\"fa fa-camera\" aria-hidden=\"true\"></i>\n          <span>Photo</span>\n        </div>\n        <a class=\"dropdown-item\"> \n          <input type=\"file\" name=\"video1\" accept=\"video/mp4,video/x-m4v,video/*\" (change)=\"showCanvas($event)\">\n          <i class=\"fa fa-video-camera\" aria-hidden=\"true\"></i>\n          <span>Video</span>\n        </a>\n        <a class=\"dropdown-item\">    \n            <input type=\"file\" name=\"attachment\" accept=\".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf\" (change)=\"saveAttachment($event)\">\n          <i class=\"fa fa-file\" aria-hidden=\"true\"></i>\n          <span>Document</span>\n        </a>\n        <a class=\"dropdown-item cursor-pointer\" (click)=\"blockGetProperty.showModal()\">    \n          <i class=\"fa fa-file\" aria-hidden=\"true\"></i>\n          <span>Property</span>\n        </a>\n      </div>\n    </div>\n\n    <!-- <input id=\"message\" autocomplete=\"off\" (change)=\"setText($event.target.value, 1)\" [(ngModel)]=\"model.message\" (keyup.enter)=\"sendMessage()\" class=\"chat-input\" type=\"text\" name=\"message\" placeholder=\"Type your message here …\"> -->\n    <input id=\"message\" autocomplete=\"off\" [(ngModel)]=\"textMessage\" (keyup.enter)=\"setText()\" class=\"chat-input\" type=\"text\" name=\"message\" placeholder=\"Type your message here …\">\n<!-- \n    <div class=\"chat-attached-file\" *ngIf=\"model.message_type == 2\">\n      <div class=\"attached-inner\">\n        <a href=\"javascript://\" (click)=\"updateModel('image')\" class=\"close\">&times;</a>\n        <div class=\"fig-block\"><img class=\"img-fluid\" src=\"{{model.image}}\" alt=\"img\"></div>\n      </div>\n    </div>\n    <div class=\"chat-attached-file\" *ngIf=\"model.message_type == 3\">\n      <div class=\"attached-inner\">\n        <a href=\"javascript://\" (click)=\"updateModel('video')\" class=\"close\">&times;</a>\n        <div class=\"fig-block\">\n            <video style=\"width: 100%; height: 100%;\" src=\"{{model.video}}\" class=\"video55\" autoplay type=\"video/mp4\" controls></video>\n            <canvas style=\"display: none;\" width=\"800\" height=\"600\" id=\"canvas\"></canvas>\n        </div>\n      </div>\n    </div>\n    <div class=\"chat-attached-file\" *ngIf=\"model.message_type == 4\">\n      <div class=\"attached-inner\">\n        <a href=\"javascript://\" (click)=\"updateModel('video')\" class=\"close\">&times;</a>\n        <div class=\"fig-block\">\n          <div class=\"chat-shared-file\">\n            <a href=\"javascript://\"><span>{{model.attachment_name}}</span>\n            </a>\n          </div>\n        </div>\n      </div>\n    </div> -->\n    <video style=\"width: 100%; height: 100%;\" src=\"{{videoSrc}}\" class=\"video55\" autoplay type=\"video/mp4\" controls></video>\n    <canvas style=\"display: none;\" width=\"800\" height=\"600\" id=\"canvas\"></canvas>\n\n    <button [disabled]=\"(sent_as==constant.userType.csr_buyer && (admin?.admin_acl['Buyer Lead Management']?.can_update==0 || admin?.permissions?.can_csr_buyer==0)) ||\n    (sent_as==constant.userType.inhouse_broker && (admin?.admin_acl['Broker Lead Management']?.can_update==0 || admin?.permissions?.can_in_house_broker==0)) ||\n    (sent_as==constant.userType.notary && (admin?.admin_acl['Notary Lead Management']?.can_update==0 || admin?.permissions?.can_noatary==0)) ||\n    (sent_as==constant.userType.bank && (admin?.admin_acl['Bank Lead Management']?.can_update==0 || admin?.permissions?.can_bank==0))\" (click)=\"setText()\" class=\"btn\">Send</button>\n </div>\n</div>\n\n\n\n<app-block-get-property #blockGetProperty (itemSelect)=\"sendProperty($event)\"></app-block-get-property>"

/***/ }),

/***/ "../../../../../src/app/layout/common-blocks/chat/chat.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_common_service__ = __webpack_require__("../../../../../src/app/services/common.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_chat_model__ = __webpack_require__("../../../../../src/app/models/chat.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_socket_io_client__ = __webpack_require__("../../../../socket.io-client/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_socket_io_client__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ChatComponent = /** @class */ (function () {
    function ChatComponent(element, admin, cs, model, constant) {
        this.element = element;
        this.admin = admin;
        this.cs = cs;
        this.model = model;
        this.constant = constant;
        this.durationInSec = 0;
        this.videoObj = {
            thumbnail: '',
            original: ''
        };
        this.loadmore = true;
        this.loadmoring = false;
        this.scrollbarOptions = { axis: 'y', theme: 'dark' };
        this.parameter = {};
    }
    ChatComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this.admin.loginData$.subscribe(success => {
        //   this.model.conversation_user = {admin_id: success['id']};
        // });
        this.parameter.messages = [];
        setTimeout(function () {
            var input = { lead_id: _this.lead_id, user_id: _this.user_id, sent_as: _this.sent_as };
            _this.initSocket();
            if ((_this.sent_as === _this.constant.userType.notary) || (_this.sent_as === _this.constant.userType.bank)) {
                _this.getLeadConversation();
            }
            else {
                _this.getMessages();
            }
        }, 100);
    };
    ChatComponent.prototype.getLeadConversation = function () {
        var _this = this;
        var data = {
            lead_id: this.lead_id,
            other_sent_as: this.constant.userType.csr_closer,
            other_id: this.user_id,
            sent_as: this.sent_as
        };
        this.parameter.loading = true;
        this.admin.postDataApi('conversation/getLeadConversation', data).subscribe(function (r) {
            _this.parameter.loading = false;
            console.log('conversation/getLeadConversation', r);
            if (r['data']) {
                _this.parameter.messages = r.data[0].messages;
                if (_this.parameter.messages.length < 30) {
                    _this.loadmore = false;
                }
                _this.parameter.conversation_id = r.data[0].id;
                _this.scrollToBottom();
            }
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    ChatComponent.prototype.getMessages = function () {
        var _this = this;
        var i = {};
        if ((this.sent_as === this.constant.userType.notary) || (this.sent_as === this.constant.userType.bank)) {
            i = {
                lead_id: this.lead_id,
                user_id: this.user_id,
                sent_as: this.sent_as
            };
        }
        else {
            i = {
                lead_id: this.lead_id,
                user_id: this.user_id,
                sent_as: this.sent_as
            };
        }
        this.admin.postDataApi('conversation/getMessages', i).subscribe(function (res) {
            _this.parameter.messages = res.data[0].messages;
            // this.parameter.messages.map(r=>{
            //   r.loading = true;
            //   return r;
            // });
            console.log('messages', _this.parameter.messages);
            if (_this.parameter.messages.length < 30) {
                _this.loadmore = false;
            }
            _this.parameter.conversation_id = res.data[0].id;
            _this.scrollToBottom();
        });
    };
    ChatComponent.prototype.initSocket = function () {
        var _this = this;
        this.parameter.socket = __WEBPACK_IMPORTED_MODULE_5_socket_io_client__["connect"](this.admin.socketUrl);
        // this.parameter.socket.on('disconnect', fun => {
        //   console.log('disconnect');
        //   console.log('disconnect', this.parameter.socket);
        // });
        this.parameter.socket.on('connect', function (fun) {
            console.log('connect');
            console.log('connect', _this.parameter.socket);
            _this.parameter.socket_id = _this.parameter.socket.id;
            _this.parameter.connected = _this.parameter.socket.connected;
            var data = {
                admin_id: _this.admin_id,
                socket_id: _this.parameter.socket_id,
                device_id: _this.admin.deviceId + '_' + _this.admin_id
            };
            if (_this.parameter.connected) {
                _this.parameter.socket.emit('add-admin', data, function (res) {
                });
                _this.parameter.socket.on('message', function (response) {
                    if (response.data.conversation_id === _this.parameter.conversation_id) {
                        _this.scrollToBottom();
                        _this.parameter.messages.push(response.data);
                    }
                });
            }
        });
    };
    ChatComponent.prototype.scrollToBottom = function () {
        setTimeout(function () {
            $('.chat-area').mCustomScrollbar('scrollTo', 'bottom');
        }, 200);
    };
    ChatComponent.prototype.updateModel = function (param) {
        this.model[param] = '';
        this.model.message_type = 1;
    };
    ChatComponent.prototype.js_yyyy_mm_dd_hh_mm_ss = function () {
        var now = new Date();
        var year = '' + now.getFullYear();
        var month = '' + (now.getMonth() + 1);
        if (month.length === 1) {
            month = '0' + month;
        }
        var day = '' + now.getDate();
        if (day.length === 1) {
            day = '0' + day;
        }
        var hour = '' + now.getHours();
        if (hour.length === 1) {
            hour = '0' + hour;
        }
        var minute = '' + now.getMinutes();
        if (minute.length === 1) {
            minute = '0' + minute;
        }
        var second = '' + now.getSeconds();
        if (second.length === 1) {
            second = '0' + second;
        }
        return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    };
    ChatComponent.prototype.onSelectFile = function (param, event) {
        var _this = this;
        if (event.target.files[0].size > this.constant.fileSizeLimit) {
            swal('Error', this.constant.errorMsg.FILE_SIZE_EXCEEDS, 'error');
        }
        else {
            this.optionsButton.nativeElement.click();
            var model_1 = new __WEBPACK_IMPORTED_MODULE_4__models_chat_model__["a" /* Chat */];
            model_1.message = this.textMessage;
            model_1.message_type = 2;
            model_1.loading = true;
            model_1.uid = Math.random().toString(36).substr(2, 15);
            model_1.conversation_id = this.parameter.conversation_id;
            model_1.conversation_user = { admin_id: this.admin_id };
            model_1.admin_id = this.admin_id;
            var d = new Date();
            model_1.updated_at = d.toUTCString();
            this.parameter.messages.push(model_1);
            setTimeout(function () {
                _this.scrollToBottom();
            }, 100);
            if (event.target.files && event.target.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    _this.image = e.target.result;
                    model_1[param] = e.target.result;
                    setTimeout(function () {
                        _this.scrollToBottom();
                    }, 100);
                    _this.cs.saveImage(event.target.files[0]).subscribe(function (success) {
                        model_1.image = success['data'].image;
                        _this.sendMessage(model_1);
                    });
                };
                reader.readAsDataURL(event.target.files[0]);
            }
        }
    };
    ChatComponent.prototype.saveAttachment = function (event) {
        var _this = this;
        if (event.target.files[0].size > this.constant.fileSizeLimit) {
            swal('Error', this.constant.errorMsg.FILE_SIZE_EXCEEDS, 'error');
        }
        else {
            this.optionsButton.nativeElement.click();
            var model_2 = new __WEBPACK_IMPORTED_MODULE_4__models_chat_model__["a" /* Chat */];
            model_2.message = this.textMessage;
            model_2.message_type = 4;
            model_2.loading = true;
            model_2.uid = Math.random().toString(36).substr(2, 15);
            model_2.conversation_id = this.parameter.conversation_id;
            model_2.conversation_user = { admin_id: this.admin_id };
            model_2.admin_id = this.admin_id;
            model_2.attachment_name = event.target.files[0].name;
            var d = new Date();
            model_2.updated_at = d.toUTCString();
            this.parameter.messages.push(model_2);
            setTimeout(function () {
                _this.scrollToBottom();
            }, 100);
            this.cs.saveAttachment(event.target.files[0]).subscribe(function (success) {
                model_2.attachment = success['data'].name;
                _this.sendMessage(model_2);
            });
        }
    };
    ChatComponent.prototype.playVideo = function (i) {
        this.parameter.messages[i].play = true;
    };
    ChatComponent.prototype.showCanvas = function (event) {
        var _this = this;
        if (event.target.files[0].size > this.constant.fileSizeLimit) {
            swal('Error', this.constant.errorMsg.FILE_SIZE_EXCEEDS, 'error');
        }
        else {
            this.optionsButton.nativeElement.click();
            var model_3 = new __WEBPACK_IMPORTED_MODULE_4__models_chat_model__["a" /* Chat */];
            model_3.message = this.textMessage;
            model_3.message_type = 3;
            model_3.loading = true;
            model_3.uid = Math.random().toString(36).substr(2, 15);
            model_3.conversation_id = this.parameter.conversation_id;
            var d = new Date();
            model_3.updated_at = d.toUTCString();
            model_3.conversation_user = { admin_id: this.admin_id };
            model_3.admin_id = this.admin_id;
            this.parameter.messages.push(model_3);
            setTimeout(function () {
                _this.scrollToBottom();
            }, 100);
            setTimeout(function () {
                _this.video = document.getElementById('video1');
                var reader = new FileReader();
                var videoTest = _this.element.nativeElement.querySelector('.video55');
                reader.onload = function (e) {
                    var _this = this;
                    var src = e.target['result'];
                    videoTest.src = src;
                    var timer = setInterval(function () {
                        // find duration of video only of video is in ready state
                        if (videoTest.readyState === 4) {
                            _this.durationInSec = videoTest.duration.toFixed(0);
                            setTimeout(function () {
                                // create canvas at middle of video
                                _this.newcanvas(videoTest, event.target.files[0], model_3);
                            }, 3000);
                            clearInterval(timer);
                        }
                    }, 1000);
                }.bind(_this);
                reader.readAsDataURL(event.target.files[0]);
                // setTimeout(() => {
                //   this.newcanvas(videoTest, event.target.files[0]);
                // }, 4000);
            }, 1000);
        }
    };
    ChatComponent.prototype.newcanvas = function (video, videoFile, model) {
        var _this = this;
        var canvas = document.getElementById('canvas');
        var ss = canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, canvas.width, canvas.height);
        var ImageURL = canvas.toDataURL('image/jpeg');
        model.image = ImageURL;
        var fileToUpload = this.dataURLtoFile(ImageURL, 'tempFile.png');
        this.cs.saveVideo(videoFile, fileToUpload).subscribe(function (success) {
            model.video = success['data'].video;
            model.image = success['data'].thumb;
            _this.sendMessage(model);
        }, function (error) {
            // console.log(error);
        });
    };
    ChatComponent.prototype.dataURLtoFile = function (dataurl, filename) {
        var arr = dataurl.split(',');
        var mime = arr[0].match(/:(.*?);/)[1];
        var bstr = atob(arr[1]);
        var n = bstr.length;
        var u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };
    ChatComponent.prototype.toUTCDate = function (date) {
        var _utc = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
        return _utc;
    };
    ChatComponent.prototype.setText = function () {
        var _this = this;
        console.log('====', this.sent_as, this.admin.admin_acl);
        if (!this.textMessage) {
            return false;
        }
        else if ((this.sent_as === this.constant.userType.csr_buyer &&
            ((Object.keys(this.admin.admin_acl).length !== 0 && this.admin.admin_acl['Buyer Lead Management'].can_update === 0)
                || this.admin.permissions.can_csr_buyer === 0)) ||
            this.sent_as === this.constant.userType.inhouse_broker &&
                ((Object.keys(this.admin.admin_acl).length !== 0 && this.admin.admin_acl['Broker Lead Management'].can_update === 0) ||
                    this.admin.permissions.can_in_house_broker === 0) ||
            this.sent_as === this.constant.userType.notary &&
                ((Object.keys(this.admin.admin_acl).length !== 0 && this.admin.admin_acl['Notary Lead Management'].can_update === 0) ||
                    this.admin.permissions.can_noatary === 0) ||
            this.sent_as === this.constant.userType.bank &&
                ((Object.keys(this.admin.admin_acl).length !== 0 && this.admin.admin_acl['Bank Lead Management'].can_update === 0)
                    || this.admin.permissions.can_bank === 0)) {
            return false;
        }
        else {
            var model = new __WEBPACK_IMPORTED_MODULE_4__models_chat_model__["a" /* Chat */];
            model.message = this.textMessage;
            model.message_type = 1;
            model.loading = true;
            model.uid = Math.random().toString(36).substr(2, 15);
            model.conversation_id = this.parameter.conversation_id;
            model.conversation_user = { admin_id: this.admin_id };
            var d = new Date();
            console.log('11', d);
            model.updated_at = d.toUTCString();
            console.log('22', model.updated_at);
            model.admin_id = this.admin_id;
            this.parameter.messages.push(model);
            this.textMessage = '';
            setTimeout(function () {
                _this.scrollToBottom();
            }, 100);
            this.sendMessage(model);
        }
    };
    ChatComponent.prototype.sendMessage = function (model) {
        var _this = this;
        if (model.message_type == 1 && !model.message) {
            swal('Error', 'Please enter some text.', 'error');
        }
        else {
            console.log('Appending', model);
            this.admin.postDataApi('conversation/sendMessage', model).subscribe(function (r) {
                console.log('sendMessage', r);
                if (model.loading == true) {
                    model.loading = false;
                    var foundIndex = _this.parameter.messages.findIndex(function (x) { return x.uid == model.uid; });
                    _this.parameter.messages[foundIndex] = r['data'];
                }
                setTimeout(function () {
                    _this.scrollToBottom();
                }, 100);
            }, function (error) {
                swal('Error', error.error.message, 'error');
            });
        }
        // if (model.message_type === 1 && !model.message) {
        //   swal('Error', 'Please enter some text.', 'error');
        // } else {
        //   model.conversation_id =  this.parameter.conversation_id;
        //   this.admin.postDataApi('conversation/sendMessage', model).subscribe(r => {
        //     setTimeout(() => {
        //       this.scrollToBottom();
        //     }, 100);
        //     if (model.loading === true) {
        //       model.loading = false;
        //     }
        //   },
        //   error => {
        //     swal('Error', error.error.message, 'error');
        //   });
        // }
    };
    ChatComponent.prototype.loadMore = function (admin_id) {
        var _this = this;
        this.loadmoring = true;
        var input = { lead_id: this.lead_id, user_id: this.user_id,
            sent_as: this.sent_as, last_message_id: this.parameter.messages[0].id };
        this.admin.postDataApi('conversation/getMessages', { lead_id: this.lead_id, user_id: this.user_id,
            sent_as: this.sent_as, last_message_id: this.parameter.messages[0].id }).subscribe(function (res) {
            _this.loadmoring = false;
            _this.admin_id = admin_id;
            if (res.data[0].messages.length < 30) {
                _this.loadmore = false;
            }
            _this.parameter.messages = res.data[0].messages.concat(_this.parameter.messages);
        });
    };
    ChatComponent.prototype.sendProperty = function (property) {
        var model = new __WEBPACK_IMPORTED_MODULE_4__models_chat_model__["a" /* Chat */];
        model.message = property.configuration.name + ' in ' + property.building.name;
        model.message_type = 5;
        model.property_id = property.id;
        model.image = property.image;
        model.property_url = property.property_url;
        model.loading = true;
        model.uid = Math.random().toString(36).substr(2, 15);
        model.conversation_id = this.parameter.conversation_id;
        model.conversation_user = { admin_id: this.admin_id };
        this.parameter.messages.push(model);
        var d = new Date();
        model.updated_at = d.toUTCString();
        this.sendMessage(model);
    };
    var _a, _b, _c, _d, _e, _f;
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('admin_id'),
        __metadata("design:type", Object)
    ], ChatComponent.prototype, "admin_id", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('lead_id'),
        __metadata("design:type", Object)
    ], ChatComponent.prototype, "lead_id", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('user_id'),
        __metadata("design:type", Object)
    ], ChatComponent.prototype, "user_id", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('sent_as'),
        __metadata("design:type", Object)
    ], ChatComponent.prototype, "sent_as", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('optionsButton'),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _a : Object)
    ], ChatComponent.prototype, "optionsButton", void 0);
    ChatComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-chat',
            template: __webpack_require__("../../../../../src/app/layout/common-blocks/chat/chat.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/common-blocks/chat/chat.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_4__models_chat_model__["a" /* Chat */]]
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _b : Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" ? _c : Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__services_common_service__["a" /* CommonService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_common_service__["a" /* CommonService */]) === "function" ? _d : Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__models_chat_model__["a" /* Chat */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__models_chat_model__["a" /* Chat */]) === "function" ? _e : Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__common_constants__["a" /* Constant */]) === "function" ? _f : Object])
    ], ChatComponent);
    return ChatComponent;
}());

//# sourceMappingURL=chat.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/common-blocks/notes/notes.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/common-blocks/notes/notes.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div class=\"spacer30\"></div>\n<div class=\"white-bg padding15\">\n    <div class=\"row\">\n      <div class=\"col-6\">\n          <p class=\"p16 marginB0\">Write a Note</p>\n      </div>\n      <div class=\"col-6 text-right\">\n        <a *ngIf=\"(sent_as==constant.userType.csr_buyer && (admin?.admin_acl['Buyer Lead Management']?.can_update==1 || admin?.permissions?.can_csr_buyer==1)) ||\n        (sent_as==constant.userType.inhouse_broker && (admin?.admin_acl['Broker Lead Management']?.can_update==1 || admin?.permissions?.can_in_house_broker==1)) ||\n        (sent_as==constant.userType.csr_closer && (admin?.admin_acl['Closer Lead Management']?.can_update==1 || admin?.permissions?.can_csr_closer==1)) ||\n        (sent_as==constant.userType.notary && (admin?.admin_acl['Notary Lead Management']?.can_update==1 || admin?.permissions?.can_noatary==1)) ||\n        (sent_as==constant.userType.bank && (admin?.admin_acl['Bank Lead Management']?.can_update==1 || admin?.permissions?.can_bank==1)); else noAddPermissiom\"\n        class=\"add\" href=\"javascript://\" data-toggle=\"modal\" data-target=\"#addNote\" #modalOpen>Add</a>\n\n        <ng-template #noAddPermissiom>\n          <a class=\"add\" href=\"javascript://\">Add</a>\n        </ng-template>\n      </div>\n    </div>\n</div>\n<hr class=\"margin0\">\n\n<div *ngIf=\"parameter.items?.length!=0\" [ngStyle]=\"{'max-height':sent_as === 1 ? '250px' : '' }\" class=\"write-note white-bg padding40\" malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\">\n  <div class=\"wn-block\" *ngFor=\"let item of parameter.items; let i=index\">\n      <div class=\"circle\">\n        <span></span>\n      </div>\n      <a *ngIf=\"(sent_as==constant.userType.csr_buyer && (admin?.admin_acl['Buyer Lead Management']?.can_update==1 || admin?.permissions?.can_csr_buyer==1)) ||\n      sent_as==constant.userType.inhouse_broker && (admin?.admin_acl['Broker Lead Management']?.can_update==1 || admin?.permissions?.can_in_house_broker==1) ||\n      sent_as==constant.userType.csr_closer && (admin?.admin_acl['Closer Lead Management']?.can_update==1 || admin?.permissions?.can_csr_closer==1) ||\n      sent_as==constant.userType.notary && (admin?.admin_acl['Notary Lead Management']?.can_update==1 || admin?.permissions?.can_noatary==1) ||\n      sent_as==constant.userType.bank && (admin?.admin_acl['Bank Lead Management']?.can_update==1 || admin?.permissions?.can_bank==1); else noDeletePermissiom\"\n        class=\"delete\" href=\"javascript://\" (click)=\"deleteLeadPopup(item.id, i)\">Delete</a>\n      \n      <ng-template #noDeletePermissiom>\n        <a class=\"delete\" href=\"javascript://\">Delete</a>\n      </ng-template>\n      <p class=\"time\">{{item.updated_at  | chatTime: 'YYYY-MM-DD H:m:s': 2}}</p>\n      <pre class=\"p13\" *ngIf=\"!item.show\">{{item.note.slice(0, 90)}} <span class=\"read-more\" *ngIf=\"item.note.length>100\" (click)=\"item.show=true\">Read more</span></pre>\n      <pre class=\"p13\" *ngIf=\"item.show\">{{item.note}}</pre>\n  </div>\n</div>\n<div  *ngIf=\"parameter.items?.length==0\" class=\"write-note white-bg\" [ngStyle]=\"{'height':sent_as === 1 ? '230px' : '245px' }\">\n  <p class=\"show-not-found\">\n    {{constant.errorMsg.NO_NOTE_FOUND}}\n  </p>\n</div>\n\n\n<!-- add note modal -->\n<div class=\"modal animated\" id=\"addNote\">\n    <div class=\"modal-dialog fadeIndown\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header modal-header-new\">\n            <h4 class=\"modal-title\">Add Note</h4>\n            <button style=\"display: none;\" type=\"button\" class=\"close\" data-dismiss=\"modal\" #modalClose>&times;</button>\n            <button type=\"button\" class=\"close\" (click)=\"closeModal()\">&times;</button>\n        </div>\n  \n        <form class=\"form-horizontal form-model0P form-model-newP\" role=\"form\" ngNativeValidate #addForm=\"ngForm\" (ngSubmit)=\"addLeadNote(addForm, sent_as); addForm.reset();\">\n          <div class=\"modal-body modal-body-new\">\n            <div class=\"row\">\n              <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                    <div class=\"form-group\">\n                      <textarea rows=\"4\" required class=\"form-control note\" name=\"note\" #note=\"ngModel\" [(ngModel)]=\"model.note\"></textarea>\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-12\">\n                  <div class=\"btn-cont text-right\">\n                      <button *ngIf=\"model.id==0 else UpdateNote\" [disabled]=\"!addForm.valid\" type=\"submit\" class=\"btn btn-primary\">ADD</button>\n                      <ng-template #UpdateNote>\n                          <button type=\"submit\" [disabled]=\"!addForm.valid\" class=\"btn btn-primary\">UPDATE</button>\n                      </ng-template>\n                  </div>\n              </div>\n            </div>\n          </div>\n        </form>\n      </div>\n    </div>\n  </div>"

/***/ }),

/***/ "../../../../../src/app/layout/common-blocks/notes/notes.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_leads_model__ = __webpack_require__("../../../../../src/app/models/leads.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotesComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NotesComponent = /** @class */ (function () {
    function NotesComponent(admin, model, constant) {
        this.admin = admin;
        this.model = model;
        this.constant = constant;
        this.parameter = {};
        this.scrollbarOptions = { axis: 'y', theme: 'dark' };
    }
    NotesComponent.prototype.ngOnInit = function () {
        this.model.id = 0;
        this.getLeadNotes();
    };
    NotesComponent.prototype.closeModal = function () {
        this.modalClose.nativeElement.click();
    };
    NotesComponent.prototype.addLeadNote = function (formdata, sent_as) {
        var _this = this;
        this.admin.postDataApi('leads/addLeadNote', { lead_id: this.lead_id, note: this.model.note, sent_as: sent_as }).subscribe(function (r) {
            _this.closeModal();
            // this.parameter.items.push(r.data);
            _this.parameter.items = r.data;
            swal('Success', _this.constant.successMsg.NOTE_ADDED_SUCCESSFULLY, 'success');
        });
    };
    NotesComponent.prototype.deleteLeadPopup = function (note_id, index) {
        var _this = this;
        swal({
            title: 'Are you sure?',
            text: 'You want to delete this note?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Delete!'
        }).then(function (result) {
            if (result.value) {
                _this.deleteLeadNote(note_id, index);
            }
        });
    };
    NotesComponent.prototype.deleteLeadNote = function (note_id, index) {
        var _this = this;
        this.admin.postDataApi('leads/deleteLeadNote', { note_id: note_id }).subscribe(function (r) {
            _this.parameter.items.splice(index, 1);
            swal('Success', _this.constant.successMsg.NOTE_DELETED_SUCCESSFULLY, 'success');
        });
    };
    NotesComponent.prototype.getLeadNotes = function () {
        var _this = this;
        this.admin.postDataApi('leads/getLeadNotes', { lead_id: this.lead_id, sent_as: this.sent_as }).subscribe(function (r) {
            _this.parameter.items = r.data;
        });
    };
    var _a, _b, _c, _d, _e;
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('modalOpen'),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _a : Object)
    ], NotesComponent.prototype, "modalOpen", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('modalClose'),
        __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _b : Object)
    ], NotesComponent.prototype, "modalClose", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('sent_as'),
        __metadata("design:type", Object)
    ], NotesComponent.prototype, "sent_as", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('lead_id'),
        __metadata("design:type", Object)
    ], NotesComponent.prototype, "lead_id", void 0);
    NotesComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-notes',
            template: __webpack_require__("../../../../../src/app/layout/common-blocks/notes/notes.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/common-blocks/notes/notes.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_2__models_leads_model__["a" /* Notes */]]
        }),
        __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" ? _c : Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__models_leads_model__["a" /* Notes */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__models_leads_model__["a" /* Notes */]) === "function" ? _d : Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__common_constants__["a" /* Constant */]) === "function" ? _e : Object])
    ], NotesComponent);
    return NotesComponent;
}());

//# sourceMappingURL=notes.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/dashboard/dashboard.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/dashboard/dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-md-4\">\n      <div class=\"title-group\">\n          <h5>Hello {{fullName}}</h5>\n      </div>\n    </div>\n    <div class=\"col-md-8\">\n      <!-- <div class=\"pull-right btn-cont\">\n        From: <input class=\"date-input\" type=\"date\" [ngModel] =\"parameter.min | date:'yyyy-MM-dd'\" max=\"{{today| date:'yyyy-MM-dd'}}\" (ngModelChange)=\"parameter.min = $event; parameter.max=''\" />\n        To: <input class=\"date-input\" type=\"date\" [ngModel] =\"parameter.max | date:'yyyy-MM-dd'\" min=\"{{parameter.min | date:'yyyy-MM-dd'}}\" max=\"{{today| date:'yyyy-MM-dd'}}\" (ngModelChange)=\"parameter.max = $event\" />\n        <button class=\"btn btn-primary new-btn\" href=\"javascript://\" (click)=\"getReportData()\"\n            [disabled]=\"!parameter.min || !parameter.max\">Go</button>\n      </div> -->\n      <!-- <div class=\"pull-right btn-cont row\">\n        <div class=\"col-sm-5\">\n          <label>From:</label>\n          <p-calendar showIcon=\"true\" [(ngModel)]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n        </div>\n        <div class=\"col-sm-5\">\n            <label>To:</label>\n          <p-calendar showIcon=\"true\" [(ngModel)]=\"parameter.max\" [minDate]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n        </div>\n        <div class=\"col-sm-2\">\n          <label>Apply:</label>\n          <button class=\"btn btn-calender\" href=\"javascript://\" (click)=\"getReportData()\"\n          [disabled]=\"!parameter.min || !parameter.max\">Apply</button>\n        </div>\n      </div> -->\n\n\n    <div class=\"row\">\n        <div class=\"col-lg-4 col-md-4 col-sm-5 col-5\">\n          <div class=\"form-group marginB0\">\n              <label>From:</label>\n              <p-calendar showIcon=\"true\" [(ngModel)]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n          </div>\n        </div>\n        <div class=\"col-lg-4 col-md-4 col-sm-5 col-5\">\n          <div class=\"form-group marginB0\">\n              <label>To:</label>\n              <p-calendar showIcon=\"true\" [(ngModel)]=\"parameter.max\" [minDate]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n          </div>\n        </div>\n        <div class=\"col-lg-4 col-md-4 col-sm-2 col-5\">\n          <div class=\"form-group btn-cont\">\n            <label class=\"addMT3\">&nbsp;</label>\n            <button class=\"btn btn-calender\" href=\"javascript://\" (click)=\"getReportData()\"\n          [disabled]=\"!parameter.min || !parameter.max\">Apply</button>\n          </div>\n        </div>\n    </div>\n\n\n    </div>\n  </div>\n<div class=\"row\">\n      <div class=\"col-md-4 col-sm-12 col-12\">\n        <div class=\"info-box dashboard-bx\">\n          <p class=\"p14\">All Properties</p>\n          <h3>{{all_properties_count|numberWithCommas}}</h3>\n        </div>\n      </div>\n      <div class=\"col-md-4 col-sm-12 col-12\">\n        <div class=\"info-box dashboard-bx\">\n          <p class=\"p14\">Property for Sale</p>\n          <h3>{{sale_properties_count|numberWithCommas}}</h3>\n        </div>\n      </div>\n      <div class=\"col-md-4 col-sm-12 col-12\">\n        <div class=\"info-box dashboard-bx\">\n          <p class=\"p14\">Property for Rent</p>\n          <h3>{{rent_properties_count|numberWithCommas}}</h3>\n        </div>\n      </div>\n\n</div>\n<div class=\"spacer30\"></div>\n<div class=\"white-bg padding40\">\n      <h3>Stats and Trend Analytics</h3>\n      <hr>\n      <!-- <div class=\"row\">\n      <div class=\"col-12\">\n      <div class=\"cust-tabs-2 dashboard-tabs\">\n            <ul class=\"nav nav-tabs\">\n              <li class=\"nav-item marginL0\">\n                  <a class=\"nav-link active\" data-toggle=\"tab\" href=\"#prop\">Properties</a>\n              </li>\n            </ul>\n          </div>\n\n        </div>\n        </div> -->\n          <div class=\"clearfix\"></div>\n\n        <div class=\"tab-content\">\n          <div id=\"prop\" class=\"tab-pane fade in active show\">\n          <div class=\"row\">\n            <div class=\"col-lg-5 col-md-6 col-sm-12 col-12\">\n            <div class=\"stats-block\">\n                  <p class=\"p14\">Total Commission on platform</p>\n                  <h2>${{total_commission|numberWithCommas}}</h2>\n            </div>\n            </div>\n              <div class=\"col-lg-5 col-md-6 col-sm-12 col-12\">\n              <div class=\"stats-block\">\n                  <p class=\"p14\">Your Sales</p>\n                  <h2>${{total_sales|numberWithCommas}}</h2>\n            </div>\n            </div>\n            </div>\n            <div class=\"spacer30\"></div>\n            <div class=\"row\">\n              <div class=\"col-md-6 col-sm-12 col-12\">\n                <div style=\"height:300px\">\n                  <ngx-charts-bar-vertical\n                  [scheme]=\"colorScheme\"\n                  [results]=\"chartCommision\"\n                  [gradient]=\"false\"\n                  [xAxis]=\"true\"\n                  [yAxis]=\"true\"\n                  [showXAxisLabel]=\"true\"\n                  [showYAxisLabel]=\"true\">\n                </ngx-charts-bar-vertical>\n                </div>\n              </div>\n                <div class=\"col-md-6 col-sm-12 col-12\">\n                <div style=\"height:300px\">\n                    <ngx-charts-area-chart\n                      [scheme]=\"colorScheme\"\n                      [results]=\"chartSales\"\n                      [gradient]=\"false\"\n                      [xAxis]=\"true\"\n                      [yAxis]=\"true\"\n                      [showXAxisLabel]=\"true\"\n                      [showYAxisLabel]=\"true\">\n                    </ngx-charts-area-chart>\n                </div>\n              </div>\n\n            </div>\n              </div>\n        </div>\n\n        <div class=\"clearfix\"></div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/layout/dashboard/dashboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
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



var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(admin) {
        var _this = this;
        this.admin = admin;
        this.today = new Date();
        this.chartCommision = [];
        this.chartSales = [];
        this.total_commission = 0;
        this.total_sales = 0;
        this.all_properties_count = 0;
        this.rent_properties_count = 0;
        this.sale_properties_count = 0;
        this.colorScheme = {
            domain: ['#4eb96f']
        };
        this.parameter = {};
        var date = new Date();
        // this.parameter.min = new Date(date.getFullYear() + '-' + (date.getMonth() - 4) + '-' + '01');
        // this.parameter.max = date;
        this.parameter.min = __WEBPACK_IMPORTED_MODULE_2_moment__().subtract(6, 'months').toDate();
        this.parameter.max = __WEBPACK_IMPORTED_MODULE_2_moment__().toDate();
        this.admin.loginData$.subscribe(function (success) {
            _this.fullName = success['name'];
        });
        this.getReportData();
    }
    DashboardComponent.prototype.getReportData = function () {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.noResultFound = false;
        // const input = {start_date: this.parameter.min, end_date: this.parameter.max};
        var input = { start_date: __WEBPACK_IMPORTED_MODULE_2_moment__(this.parameter.min).format('YYYY-MM-DD'), end_date: __WEBPACK_IMPORTED_MODULE_2_moment__(this.parameter.max).format('YYYY-MM-DD') };
        this.admin.postDataApi('dashboard', input).subscribe(function (success) {
            _this.parameter.loading = false;
            _this.all_properties_count = success.data.all_properties_count;
            _this.rent_properties_count = success.data.rent_properties_count;
            _this.sale_properties_count = success.data.sale_properties_count;
            var data = [];
            var data1 = [];
            // commission graph data
            success.data.commission_graph.forEach(function (element) {
                _this.total_commission = _this.total_commission + element.commission;
                data.push({
                    'name': element.month_name + ', ' + element.year,
                    'value': element.commission
                });
            });
            _this.chartCommision = data;
            // sale graph data
            success.data.sale_graph.forEach(function (element) {
                _this.total_sales = _this.total_sales + element.sale;
                data1.push({
                    'name': element.month_name + ', ' + element.year,
                    'value': element.sale
                });
            });
            _this.chartSales = [{
                    name: 'Sales',
                    series: data1
                }];
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    var _a;
    DashboardComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__("../../../../../src/app/layout/dashboard/dashboard.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/dashboard/dashboard.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" ? _a : Object])
    ], DashboardComponent);
    return DashboardComponent;
}());

//# sourceMappingURL=dashboard.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/generate-thumb/generate-thumb.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/generate-thumb/generate-thumb.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- <input type=\"file\" name=\"video1\" accept=\"video/mp4,video/x-m4v,video/*\" (change)=\"showCanvas($event)\">\n\n<div class=\"col-sm-offset-2 col-sm-4\">\n  <video src=\"{{workoutVideo.file}}\" class=\"video55\" autoplay type=\"video/mp4\" controls></video><br/>\n</div>\n\n<div class=\"col-sm-4\" style=\"display: none;\">\n  <canvas width=\"800\" height=\"600\" id=\"canvas\"></canvas> <br/><br/>\n</div> -->"

/***/ }),

/***/ "../../../../../src/app/layout/generate-thumb/generate-thumb.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_generalFunctions__ = __webpack_require__("../../../../../src/app/common/generalFunctions.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_common_service__ = __webpack_require__("../../../../../src/app/services/common.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GenerateThumbComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GenerateThumbComponent = /** @class */ (function () {
    function GenerateThumbComponent(element, cs) {
        this.element = element;
        this.cs = cs;
        this.editModel = false;
        this.seconds = true;
        this.isActive = true;
        this.imgObj = {
            thumbnail: '',
            original: ''
        };
        this.videoObj = {
            thumbnail: '',
            original: ''
        };
        this.workoutVideo = {
            file: '',
            thumbnail: ''
        };
        this.imgArray = [];
        this.showVideo = true;
    }
    GenerateThumbComponent.prototype.ngOnInit = function () {
        this.gf = new __WEBPACK_IMPORTED_MODULE_1__common_generalFunctions__["a" /* GeneralFunctions */]();
    };
    var _a, _b;
    GenerateThumbComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-generate-thumb',
            template: __webpack_require__("../../../../../src/app/layout/generate-thumb/generate-thumb.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/generate-thumb/generate-thumb.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _a : Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_common_service__["a" /* CommonService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_common_service__["a" /* CommonService */]) === "function" ? _b : Object])
    ], GenerateThumbComponent);
    return GenerateThumbComponent;
}());

//# sourceMappingURL=generate-thumb.component.js.map

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

module.exports = "\n<div class=\"row\" *ngIf=\"address\">\n  <div class=\"col-sm-3 col-12\">\n    <div class=\"form-group-2\">\n      <label>Country <span class=\"color-red\">*</span></label>\n      <select required title=\"Choose Country\" class=\"form-control\" (change)=\"getStatesNew($event.target.value, 1)\">\n        <option value=\"\" disabled>Select Country</option>\n        <!-- <option value=\"0\" [selected]=\"address.countries==0 && address.countries!=''\">All</option> -->\n        <option *ngFor=\"let countryAdd of countries\" [selected]=\"countryAdd.id == address.countries\" value=\"{{countryAdd.id}}\">{{countryAdd.name}}</option>\n      </select>\n    </div>\n  </div>\n  <div class=\"col-sm-3 col-12\">\n    <div class=\"form-group-2\">\n      <label>State <span class=\"color-red\">*</span></label>\n      <select [disabled]=\"status\" required title=\"Choose State\" class=\"form-control\" (change)=\"getCitiesNew($event.target.value, 1)\">\n        <option value=\"\" disabled>Select State</option>\n        <option value=\"0\" [selected]=\"address.states!='' && address.states==0\">All</option>\n        <option *ngFor=\"let stateAdd of parameter.statesAdd\" [selected]=\"stateAdd.id == address.states\" value=\"{{stateAdd.id}}\">{{stateAdd.name}}</option>\n      </select>\n    </div>\n  </div>\n  <div class=\"col-sm-3 col-12\">\n    <div class=\"form-group-2\">\n      <label>City <span class=\"color-red\">*</span></label>\n      <select [disabled]=\"status\" required title=\"Choose City\" class=\"form-control\" (change)=\"getLocalitiesNew($event.target.value, 1)\">\n      <option value=\"\" disabled>Select City</option>\n      <option value=\"0\" [selected]=\"address.cities!='' && address.cities==0\">All</option>\n      <option *ngFor=\"let cityAdd of parameter.citiesAdd\" [selected]=\"cityAdd.id == address.cities\" value=\"{{cityAdd.id}}\">{{cityAdd.name}}</option>\n    </select>\n    </div>\n  </div>\n  <div class=\"col-sm-3 col-12\">\n    <div class=\"form-group-2\">\n      <label>Locality <span class=\"color-red\">*</span></label>\n      <select [disabled]=\"status\" required title=\"Choose Locality\" class=\"form-control\" (change)=\"getLocalityBuildings($event.target.value, 1)\">\n      <option value=\"\" disabled>Select Locality</option>\n      <option value=\"0\" [selected]=\"address.localities != '' && address.localities==0\">All</option>\n      <option *ngFor=\"let localityAdd of parameter.localitiesAdd\" [selected]=\"localityAdd.id == address.localities\" value=\"{{localityAdd.id}}\">{{localityAdd.name}}</option>\n    </select>\n    </div>\n  </div>\n  <div class=\"col-sm-3 col-12\">\n    <div class=\"row\">\n      <div class=\"col-10\">\n      <div class=\"form-group-2\">\n        <label>Building <span class=\"color-red\">*</span></label>\n        <select [disabled]=\"status\" required title=\"Choose Building\" class=\"form-control\" (change)=\"setBuilding($event.target.value, i)\">\n          <option value=\"\" disabled>Select Building</option>\n          <option value=\"0\" [selected]=\"address.buildings!='' && address.buildings==0\">All</option>\n          <option *ngFor=\"let buildingAdd of parameter.buildingsAdd\" [disabled]=\"buildingAdd.disabled\" [selected]=\"buildingAdd.id == address.buildings\" value=\"{{buildingAdd.id}}\">{{buildingAdd.name}}</option>\n        </select>\n      </div>\n      </div>\n      <a href=\"javascript://\" (click)=\"removeRow()\" class=\"close\" *ngIf=\"index!=0\">\n        <img src=\"assets/img/close-tag.png\" alt=\"img\">\n      </a>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/layout/inhouse-users/address/address.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
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


var AddressComponent = /** @class */ (function () {
    function AddressComponent(admin) {
        this.admin = admin;
        this.parameter = {};
        this.removeAddress = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.disabledBuilding = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.getCountriesNew(0);
    }
    AddressComponent.prototype.ngOnInit = function () {
        if (this.address && this.address.countries) {
            this.getStatesNew(this.address.countries, 0);
            this.getCitiesNew(this.address.states, 0);
            this.getLocalitiesNew(this.address.cities, 0);
            this.getLocalityBuildings(this.address.localities, 0);
        }
    };
    AddressComponent.prototype.removeRow = function () {
        this.removeAddress.emit(this.index);
    };
    AddressComponent.prototype.getCountriesNew1 = function (index) {
        var _this = this;
        this.parameter.statesAdd = [];
        this.parameter.citiesAdd = [];
        this.parameter.localitiesAdd = [];
        this.parameter.buildingsAdd = [];
        this.parameter.url = 'getCountries';
        this.admin.postDataApi(this.parameter.url, {})
            .subscribe(function (success) { _this.parameter.countriesAdd = success.data; });
    };
    AddressComponent.prototype.getCountriesNew = function (index) {
        this.parameter.statesAdd = [];
        this.parameter.citiesAdd = [];
        this.parameter.localitiesAdd = [];
        this.parameter.buildingsAdd = [];
    };
    AddressComponent.prototype.getStatesNew1 = function (country_id, index) {
        var _this = this;
        this.parameter.citiesAdd = [];
        this.parameter.localitiesAdd = [];
        this.parameter.buildingsAdd = [];
        this.parameter.url = 'country/getStates';
        this.parameter.country_id = country_id;
        if (country_id !== '' && country_id !== '0') {
            this.admin.postDataApi(this.parameter.url, { country_id: country_id })
                .subscribe(function (success) {
                _this.parameter.statesAdd = success.data;
                _this.address.countries = country_id;
                // this.parameter.statesAdd.push({id: '0', name: 'All', status: 1});
                // this.parameter.citiesAdd.push({id: '0', name: 'All', status: 1});
                // this.parameter.localitiesAdd.push({id: '0', name: 'All', status: 1});
                // this.parameter.buildingsAdd.push({id: '0', name: 'All', status: 1});
                _this.address.states = '0';
                _this.address.cities = '0';
                _this.address.localities = '0';
                _this.address.buildings = '0';
            });
        }
        else {
            this.parameter.statesAdd = [];
            this.address.countries = country_id;
            this.address.states = '0';
            this.address.cities = '0';
            this.address.localities = '0';
            this.address.buildings = '0';
        }
    };
    AddressComponent.prototype.getStatesNew = function (country_id, setZero) {
        this.parameter.statesAdd = [];
        this.parameter.citiesAdd = [];
        this.parameter.localitiesAdd = [];
        this.parameter.buildingsAdd = [];
        this.parameter.country_id = country_id;
        this.address.countries = country_id;
        this.address.states = this.address.states && setZero === 1 ? '0' : this.address.states;
        this.address.cities = this.address.cities && setZero === 1 ? '0' : this.address.cities;
        this.address.localities = this.address.localities && setZero === 1 ? '0' : this.address.localities;
        this.address.buildings = this.address.buildings && setZero === 1 ? '0' : this.address.buildings;
        // if (setZero === 1) {
        //   this.address.states = '0';
        //   this.address.cities = '0';
        //   this.address.localities = '0';
        //   this.address.buildings = '0';
        // }
        console.log('pppp', this.address);
        if (country_id === '' || country_id === '0') {
            return false;
        }
        else {
            this.parameter.country_id = country_id;
            // console.log('this', this.countries);
            if (this.countries) {
                var selectedCountry = this.countries.filter(function (x) { return x.id.toString() === country_id.toString(); });
                this.parameter.statesAdd = selectedCountry[0].states;
            }
        }
    };
    AddressComponent.prototype.getCitiesNew1 = function (state_id, index) {
        var _this = this;
        this.parameter.localitiesAdd = [];
        this.parameter.url = 'getCities';
        this.parameter.state_id = state_id;
        if (state_id !== '' && state_id !== '0') {
            this.admin.postDataApi(this.parameter.url, { state_id: state_id })
                .subscribe(function (success) {
                _this.parameter.citiesAdd = success.data;
                // this.parameter.citiesAdd.push({id: '0', name: 'All', status: 1});
                // this.parameter.localitiesAdd.push({id: '0', name: 'All', status: 1});
                // this.parameter.buildingsAdd.push({id: '0', name: 'All', status: 1});
                _this.address.states = state_id;
                _this.address.cities = '0';
                _this.address.localities = '0';
                _this.address.buildings = '0';
            });
        }
        else {
            this.parameter.citiesAdd = [];
            this.address.states = state_id;
            this.address.cities = '0';
            this.address.localities = '0';
            this.address.buildings = '0';
        }
    };
    AddressComponent.prototype.getCitiesNew = function (state_id, setZero) {
        this.parameter.localitiesAdd = [];
        this.parameter.buildingsAdd = [];
        this.parameter.citiesAdd = [];
        this.address.states = state_id;
        this.address.cities = this.address.cities && setZero === 1 ? '0' : this.address.cities;
        this.address.localities = this.address.localities && setZero === 1 ? '0' : this.address.localities;
        this.address.buildings = this.address.buildings && setZero === 1 ? '0' : this.address.buildings;
        // this.address.cities = this.address.cities ? this.address.cities : '0';
        // this.address.localities = this.address.localities ? this.address.localities : '0';
        // this.address.buildings = this.address.buildings ? this.address.buildings : '0';
        // if (setZero === 1) {
        //   this.address.cities = '0';
        //   this.address.localities = '0';
        //   this.address.buildings = '0';
        // }
        if (state_id === '' || state_id === '0') {
            return false;
        }
        if (this.parameter.statesAdd.length !== 0) {
            var selectedState = this.parameter.statesAdd.filter(function (x) { return x.id.toString() === state_id.toString(); });
            this.parameter.citiesAdd = selectedState[0].cities;
        }
    };
    AddressComponent.prototype.getLocalitiesNew1 = function (city_id, index) {
        var _this = this;
        this.parameter.url = 'getLocalities';
        this.parameter.city_id = city_id;
        if (city_id !== '' && city_id !== '0') {
            this.admin.postDataApi(this.parameter.url, { city_id: city_id })
                .subscribe(function (success) {
                _this.parameter.localitiesAdd = success.data;
                // this.parameter.localitiesAdd.push({id: '0', name: 'All', status: 1});
                // this.parameter.buildingsAdd.push({id: '0', name: 'All', status: 1});
                _this.address.cities = city_id;
                _this.address.localities = '0';
                _this.address.buildings = '0';
            });
        }
        else {
            this.parameter.localitiesAdd = [];
            this.address.cities = city_id;
            this.address.localities = '0';
            this.address.buildings = '0';
        }
    };
    AddressComponent.prototype.getLocalitiesNew = function (city_id, setZero) {
        this.parameter.city_id = city_id;
        this.parameter.localitiesAdd = [];
        this.parameter.buildingsAdd = [];
        this.address.cities = city_id;
        this.address.localities = this.address.localities && setZero === 1 ? '0' : this.address.localities;
        this.address.buildings = this.address.buildings && setZero === 1 ? '0' : this.address.buildings;
        // this.address.localities = this.address.localities ? this.address.localities : '0';
        // this.address.buildings = this.address.buildings ? this.address.buildings : '0';
        // if (setZero === 1) {
        //   this.address.localities = '0';
        //   this.address.buildings = '0';
        // }
        if (city_id === '' || city_id === '0') {
            return false;
        }
        if (this.parameter.citiesAdd.length !== 0) {
            var selectedCountry = this.parameter.citiesAdd.filter(function (x) { return x.id.toString() === city_id.toString(); });
            this.parameter.localitiesAdd = selectedCountry[0].localities;
        }
    };
    AddressComponent.prototype.getLocalityBuildings = function (locality_id, setZero) {
        var _this = this;
        this.parameter.url = 'getLocalityBuildings';
        this.parameter.locality_id = locality_id;
        this.parameter.buildingsAdd = [];
        this.admin.postDataApi(this.parameter.url, { locality_id: locality_id })
            .subscribe(function (success) {
            _this.parameter.buildingsAdd = success.data;
            _this.address.localities = locality_id;
            // this.address.buildings = '0';
            _this.address.buildings = _this.address.buildings && setZero === 1 ? '0' : _this.address.buildings;
            // if (setZero === 1) {
            //   this.address.buildings = '0';
            // }
            // this.address.buildings = this.address.buildings ? this.address.buildings : '0';
            // this.parameter.buildingsAdd.push({id: '0', name: 'All', status: 1});
            for (var c = 0; c < _this.parameter.buildingsAdd.length; c++) {
                _this.parameter.buildingsAdd[c].disabled = false;
                // if (this.disabledBuildings !== undefined) {
                for (var d = 0; d < _this.disabledBuildings.length; d++) {
                    if (_this.disabledBuildings[d] === (_this.parameter.buildingsAdd[c].id).toString()) {
                        _this.parameter.buildingsAdd[c].disabled = true;
                    }
                }
                // }
            }
        });
    };
    AddressComponent.prototype.setBuilding = function (building_id, index) {
        this.address.buildings = building_id;
        this.disabledBuilding.emit(this.index);
    };
    var _a;
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('address'),
        __metadata("design:type", Object)
    ], AddressComponent.prototype, "address", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('index'),
        __metadata("design:type", Object)
    ], AddressComponent.prototype, "index", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('status'),
        __metadata("design:type", Object)
    ], AddressComponent.prototype, "status", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('disabledBuildings'),
        __metadata("design:type", Object)
    ], AddressComponent.prototype, "disabledBuildings", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('countries'),
        __metadata("design:type", Object)
    ], AddressComponent.prototype, "countries", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], AddressComponent.prototype, "removeAddress", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], AddressComponent.prototype, "disabledBuilding", void 0);
    AddressComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-address',
            template: __webpack_require__("../../../../../src/app/layout/inhouse-users/address/address.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/inhouse-users/address/address.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" ? _a : Object])
    ], AddressComponent);
    return AddressComponent;
}());

//# sourceMappingURL=address.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/inhouse-users/inhouse-users.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/inhouse-users/inhouse-users.component.html":
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<div class=\"container-fluid\">\n    <div class=\"row\">\n        <div class=\"col-lg-10 col-md-6 col-6\">\n          <div class=\"title-group\">\n              <h5>{{title}}</h5>\n              <p>Showing {{parameter.items?.length}} out of {{parameter.total}}</p>\n          </div>\n        </div>\n        <div class=\"col-lg-2 col-md-6 col-6\">\n          <div class=\"btn-cont text-right\">\n              <a class=\"btn\" href=\"javascript://\" style=\"display: none;\" data-toggle=\"modal\" data-target=\"#add\" #modalOpen>Add New</a>\n              <a *ngIf=\"admin?.admin_acl['Data Collector Management']?.can_create==1 && parameter.userType=='data-collectors' ||\n                admin?.admin_acl['Seller Management']?.can_create==1 && parameter.userType=='csr-sellers' ||\n                admin?.admin_acl['Buyer Management']?.can_create==1 && parameter.userType=='csr-buyers' ||\n                admin?.admin_acl['Broker Management']?.can_create==1 && parameter.userType=='inhouse-broker' ||\n                admin?.admin_acl['Closer Management']?.can_create==1 && parameter.userType=='csr-closers'\" class=\"btn btn-primary-new width100P\" href=\"javascript://\" (click)=\"openAddModal()\">Add New</a>\n          </div>\n        </div>\n    </div>\n  \n    <div class=\"row\">\n      <div class=\"col-lg-2 col-md-3 col-sm-6 col-6\">\n        <div class=\"form-group marginB0\">\n            <label>Country</label>\n            <select title=\"Choose Country\" class=\"form-control\" (change)=\"getStates($event.target.value)\">\n              <option value=\"-1\">All</option>\n              <option *ngFor=\"let country of parameter.countries\" value=\"{{country.id}}\">{{country.name_en}}</option>\n            </select>\n        </div>\n      </div>\n      <div class=\"col-lg-2 col-md-3 col-sm-6 col-6\">\n        <div class=\"form-group marginB0\">\n            <label>State</label>\n            <select title=\"Choose State\" class=\"form-control\" (change)=\"getCities($event.target.value)\">\n              <option value=\"-1\">All</option>\n              <option *ngFor=\"let state of parameter.states\" value=\"{{state.id}}\">{{state.name_en}}</option>\n            </select>\n        </div>\n      </div>\n      <div class=\"col-lg-2 col-md-3 col-sm-6 col-6\">\n        <div class=\"form-group marginB0\">\n            <label>City</label>\n            <select title=\"Choose City\" class=\"form-control\" (change)=\"getLocalities($event.target.value)\">\n              <option value=\"-1\">All</option>\n              <option *ngFor=\"let city of parameter.cities\" value=\"{{city.id}}\">{{city.name_en}}</option>\n            </select>\n        </div>\n      </div>\n      <div class=\"col-lg-2 col-md-3 col-sm-6 col-6\">\n        <div class=\"form-group marginB0\">\n            <label>Locality</label>\n            <select title=\"Choose Locality\" class=\"form-control\" (change)=\"getLocalityBuildings($event.target.value)\">\n              <option value=\"-1\">All</option>\n              <option *ngFor=\"let locality of parameter.localities\" value=\"{{locality.id}}\">{{locality.name_en}}</option>\n            </select>\n        </div>\n      </div>\n      <div class=\"col-lg-2 col-md-3 col-sm-6 col-6\">\n        <div class=\"form-group marginB0\">\n            <label>Building</label>\n            <select title=\"Choose Building\" class=\"form-control\" (change)=\"setBuilding($event.target.value)\">\n              <option value=\"-1\">All</option>\n              <option *ngFor=\"let building of parameter.buildings\" value=\"{{building.id}}\">{{building.name}}</option>\n            </select>\n        </div>\n      </div>\n      <div class=\"col-lg-1 col-md-3 col-sm-6 col-6\">\n        <div class=\"form-group btn-cont\">\n          <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n          <button type=\"button\" (click)=\"getInhouseUsers()\" class=\"btn btn-primary-new width100P P86\">Apply</button>\n        </div>\n      </div>\n      <div class=\"col-lg-1 col-md-3 col-sm-6 col-6\">\n        <div class=\"form-group btn-cont\">\n          <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n          <button type=\"button\" (click)=\"resetFilters()\" class=\"btn btn-primary-new width100P P86\">Reset</button>\n        </div>\n      </div>\n  </div>\n    <hr>\n\n\n    \n    <div class=\"white-bg\">\n      <div class=\"tabel-section\">\n        <div class=\"table-responsive\">\n\n        <table class=\"table table-striped\">\n          <tr>\n            <th style=\"width:6%\">&nbsp;</th>\n            <th style=\"width:15%\">\n              <div class=\"table-search\">\n                  <label>Name</label>\n                  <div class=\"searh-3\">\n                    <input type=\"text\" [(ngModel)]=\"parameter.name\" (keyup.enter)=\"searchUserByName(parameter.name)\" name=\"\">\n                    <button type=\"button\" *ngIf=\"parameter.name\" (click)=\"searchUserByName(parameter.name)\"><i class=\"fa fa-search\"></i></button>\n                  </div>\n              </div>\n            </th>\n            <th style=\"width:18%; text-align:left;\">\n              <div class=\"table-search\">\n                  <label>Contact Number</label>\n                  <div class=\"searh-3\">\n                    <input type=\"text\" [(ngModel)]=\"parameter.phone\" (keyup.enter)=\"searchUserByPhone(parameter.phone)\" name=\"\">\n                    <button type=\"button\" *ngIf=\"parameter.phone\" (click)=\"searchUserByPhone(parameter.phone)\"><i class=\"fa fa-search\"></i></button>\n                  </div>\n              </div>\n            </th>\n            <th style=\"width:20%\">\n              <div class=\"table-search\">\n                  <label>Email Address</label>\n                  <div class=\"searh-3\">\n                    <input type=\"text\" [(ngModel)]=\"parameter.email\" (keyup.enter)=\"searchUserByEmail(parameter.email)\" name=\"\">\n                    <button type=\"button\" *ngIf=\"parameter.email\" (click)=\"searchUserByEmail(parameter.email)\"><i class=\"fa fa-search\"></i></button>\n                  </div>\n              </div>\n            </th>\n            <th *ngIf=\"parameter.userType == 'inhouse-broker' || parameter.userType == 'csr-closers' ||\n            parameter.userType == 'csr-sellers' || parameter.userType == 'csr-buyers'\" style=\"width:8%; vertical-align: top;\">\n              Leads<a (click)=\"setLeadSort()\" href=\"javascript://\"><img [ngClass]=\"{'upsidedown':this.lead_sort==2}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n            </th>\n            <th *ngIf=\"parameter.userType == 'data-collectors'\" style=\"width:22%; vertical-align: top;\">\n              Building<a (click)=\"setLeadSort()\" href=\"javascript://\"><img [ngClass]=\"{'upsidedown':this.lead_sort==2}\" [ngClass]=\"{'upsidedown':this.price_sort==2}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n            </th>\n            <th style=\"width:19%\">\n              &nbsp;\n            </th>\n          </tr>\n\n            <tr *ngFor=\"let item of parameter.items| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.p, totalItems: parameter.total }; let i = index\">\n              <td> \n                  <img [src]=\"item.image\" class=\"rounded-circle\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\">\n                <!-- <img [src]=\"item.image| img:'small'\" class=\"rounded-circle\" onerror='src=\"constant.userPlaceholder\"' alt=\"img\"> -->\n              </td>\n              <td class=\"text-left text-ellipsis120\">\n                <span class=\"name\">{{item.name}}</span>\n              </td>\n              <td class=\"text-left\" *ngIf=\"item.phone\">{{item.dial_code && item.dial_code!=undefined ? item.dial_code : constant.dial_code}}-{{item.phone}}</td>\n              <td class=\"text-left\" *ngIf=\"!item.phone\">NA</td>\n              <td class=\"text-left\">{{item.email}}</td>\n              <td *ngIf=\"parameter.userType == 'csr-sellers' || parameter.userType == 'csr-buyers' ||\n                    parameter.userType == 'inhouse-broker' || parameter.userType == 'csr-closers'; else showBuildings\">{{item.lead_count?item.lead_count:'0'}}</td>\n              <td *ngIf=\"parameter.userType == 'data-collectors'\" >{{item.added_buildings_count?item.added_buildings_count:'0'}}</td>\n              <td>\n                <a *ngIf=\"admin?.admin_acl['Building Management']?.can_read==1 && parameter.userType == 'data-collectors'\" title=\"View Projects\" href=\"javascript://\" routerLink=\"/dashboard/projects/view-projects/{{item.id}}\" class=\"icon-block edit-icon\">\n                  <img src=\"assets/img/ic_projects_manage.png\" alt=\"img\">\n                </a>\n                <a *ngIf=\"admin?.admin_acl['Seller Lead Management']?.can_read==1 && parameter.userType == 'csr-sellers'\" title=\"View Leads\" href=\"javascript://\" routerLink=\"/dashboard/leads/csr-sellers-leads/{{item.id}}\" class=\"icon-block edit-icon\">\n                  <img src=\"assets/img/ic_leads.png\" alt=\"img\">\n                </a>\n                <a *ngIf=\"admin?.admin_acl['Buyer Lead Management']?.can_read==1 && parameter.userType == 'csr-buyers'\" title=\"View Leads\" href=\"javascript://\" routerLink=\"/dashboard/leads/csr-buyers-leads/{{item.id}}\" class=\"icon-block edit-icon\">\n                  <img src=\"assets/img/ic_leads.png\" alt=\"img\">\n                </a>\n                <a *ngIf=\"admin?.admin_acl['Broker Lead Management']?.can_read==1 && parameter.userType == 'inhouse-broker'\" title=\"View Leads\" href=\"javascript://\" routerLink=\"/dashboard/leads/inhouse-broker-leads/{{item.id}}\" class=\"icon-block edit-icon\">\n                  <img src=\"assets/img/ic_leads.png\" alt=\"img\">\n                </a>\n                <a *ngIf=\"admin?.admin_acl['Closer Lead Management']?.can_read==1 && parameter.userType == 'csr-closers'\" title=\"View Leads\" href=\"javascript://\" routerLink=\"/dashboard/leads/csr-closers-leads/{{item.id}}\" class=\"icon-block edit-icon\">\n                  <img src=\"assets/img/ic_leads.png\" alt=\"img\">\n                </a>\n                \n                <a class=\"btn\" href=\"javascript://\" style=\"display: none;\" data-toggle=\"modal\" data-target=\"#view\" #viewModalOpen></a>\n                <a title=\"View Roles\" href=\"javascript://\" (click)=\"viewDetails(item, i)\" class=\"icon-block edit-icon\"><img src=\"assets/img/eye-icon.png\" alt=\"img\"></a>\n\n                <button title=\"Edit Details\" [disabled]=\"admin?.admin_acl['Data Collector Management']?.can_update==0 && parameter.userType=='data-collectors' ||\n                  admin?.admin_acl['Seller Management']?.can_update==0 && parameter.userType=='csr-sellers' ||\n                  admin?.admin_acl['Buyer Management']?.can_update==0 && parameter.userType=='csr-buyers' ||\n                  admin?.admin_acl['Broker Management']?.can_update==0 && parameter.userType=='inhouse-broker' ||\n                  admin?.admin_acl['Closer Management']?.can_update==0 && parameter.userType=='csr-closers'\" \n                (click)=\"editUser(item, i)\" class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></button>\n\n                <button [disabled]=\"admin?.admin_acl['Data Collector Management']?.can_delete==0 && parameter.userType=='data-collectors' ||\n                  admin?.admin_acl['Seller Management']?.can_delete==0 && parameter.userType=='csr-sellers' ||\n                  admin?.admin_acl['Buyer Management']?.can_delete==0 && parameter.userType=='csr-buyers' ||\n                  admin?.admin_acl['Broker Management']?.can_delete==0 && parameter.userType=='inhouse-broker' ||\n                  admin?.admin_acl['Closer Management']?.can_delete==0 && parameter.userType=='csr-closers'\"\n                (click)=\"blockUnblockPopup(i, item.id, item.is_blocked==1?0:1, parameter.type)\" \n                title=\"{{item.is_blocked==1?'Unblock User':'Block User'}}\" \n                [ngClass]=\"{'unblock-bg':item.is_blocked==1}\"\n                class=\"action-icon\">\n                <img src=\"assets/img/block.png\" alt=\"img\">\n              </button>\n\n              </td>\n            </tr>\n          </table>\n        </div>\n      </div>\n\n      <div class=\"center\" *ngIf=\"parameter.total == 0\">\n        <img src=\"assets/img/404-error.png\">\n      </div>\n\n  </div>\n  <div class=\"btn-cont text-right marginT15\">\n  \n      <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n  </div>\n</div>\n\n\n<div class=\"modal animated\" id=\"add\">\n    <div class=\"modal-dialog fadeIndown modal-lg\">\n       <div class=\"modal-content\">\n          <div class=\"modal-header\">\n             <button type=\"button\" style=\"display: none;\" class=\"close\" data-dismiss=\"modal\" #modalClose>&times;</button>\n             <button type=\"button\" class=\"close\" (click)=\"closeModal(); addForm.reset()\">&times;</button>\n          </div>\n  \n          <form class=\"form-horizontal form-model0P\" role=\"form\" ngNativeValidate #addForm=\"ngForm\" (ngSubmit)=\"addNewUser(addForm)\">\n          <div class=\"modal-body\">\n              <div class=\"row\">\n                 <div class=\"col-6\">\n                    <div class=\"add-img\" style=\"background-size: cover;\" [style.background-image]=\"image1\">\n                    <input accept=\"image/*\" type=\"file\" name=\"\" (change)=\"onSelectFile1($event)\">\n                    <label *ngIf=\"!image1\">+ Add Image</label>\n                    </div>\n                 </div>\n                 <div class=\"col-6\">\n                    <div class=\"btn-cont text-right\">\n                      <button *ngIf=\"!model.id\" type=\"submit\" [disabled]=\"addForm.invalid\" class=\"btn btn-primary\">ADD</button>\n                       <button *ngIf=\"model.id\" type=\"submit\" [disabled]=\"addForm.invalid\" class=\"btn btn-primary\">UPDATE</button>\n                    </div>\n                 </div>\n                 <div class=\"col-12\">\n                    <div class=\"spacer40\"></div>\n                 </div>\n                 <div class=\"col-12\">\n                    <div class=\"form-group-2\">\n                       <label>Name <span class=\"color-red\">*</span></label>\n                       <div class=\"form-group\">\n                        <input autocomplete=\"off\" type=\"text\" class=\"form-control\" required [(ngModel)]=\"model.name\" name=\"name\">\n                      </div>\n                    </div>\n                 </div>\n                 <div class=\"col-12\">\n                    <div class=\"form-group-2\">\n                       <label>Contact number <span class=\"color-red\">*</span></label>\n                       <div class=\"form-group\">\n                        <input minlength=\"6\" maxlength=\"16\" autocomplete=\"off\" type=\"text\" \n                          [pattern]=\"constant.phonePattern\" class=\"form-control\" id=\"phone\" \n                          required minlength=\"1\" [(ngModel)]=\"model.phone\" name=\"phone\"\n                          ng2TelInput #phonetest\n                          (intlTelInputObject)=\"telInputObject($event)\"\n                          [ng2TelInputOptions]=\"initialCountry\" \n                          (countryChange)=\"onCountryChange($event)\" />\n                      </div>\n                    </div>\n                 </div>\n                 <div class=\"col-12\">\n                    <div class=\"form-group-2\">\n                       <label>Email ID <span class=\"color-red\">*</span></label>\n                       <div class=\"form-group\">\n                        <input autocomplete=\"off\" [pattern]=\"constant.emailPattern\" type=\"email\" class=\"form-control\" required [(ngModel)]=\"model.email\" name=\"email\">\n                      </div>\n                    </div>\n                 </div>\n              </div>\n              <div *ngFor=\"let add of model.address; let j=index\">\n                <app-address [countries]=\"parameter.countries\" [address]=\"add\" [index]=\"j\" [status]=\"false\" [disabledBuildings]=\"disabledBuildings\" (disabledBuilding)=\"disabledBuildingId(j)\" (removeAddress)=\"removeAddressObj($event)\"></app-address>\n              </div>\n  \n              <div class=\"col-12\" *ngIf=\"model.address?.length!=0\">\n                  <div class=\"btn-cont center\">\n                    <button type=\"button\" class=\"btn btn-primary margin0\" (click)=\"addEmptyObj()\">\n                      <img src=\"assets/img/add.png\" alt=\"img\">\n                    </button>\n                  </div>\n               </div>\n              \n              <div class=\"access-controls\">\n                 <label [ngClass]=\"{'access-control11': model.is_broker_seller_dev == true}\" class=\"cust-check-bx2\">CSR Seller/Developer\n                   <input type=\"checkbox\" name=\"is_broker_seller_dev\" [(ngModel)]=\"model.is_broker_seller_dev\">\n                   <span class=\"checkmark\"></span>\n                 </label>\n   \n                 <label [ngClass]=\"{'access-control11': model.is_buyer_renter == true}\" class=\"cust-check-bx2\">CSR Buyer/Renter\n                   <input type=\"checkbox\" [(ngModel)]=\"model.is_buyer_renter\" name=\"is_buyer_renter\">\n                   <span class=\"checkmark\"></span>\n                 </label>\n   \n                 <label [ngClass]=\"{'access-control11': model.is_broker == true}\" class=\"cust-check-bx2\">Inhouse Broker\n                   <input type=\"checkbox\" [(ngModel)]=\"model.is_broker\" name=\"is_broker\">\n                   <span class=\"checkmark\"></span>\n                 </label>\n   \n                 <label [ngClass]=\"{'access-control11': model.is_data_collector == true}\" class=\"cust-check-bx2\">Data Collector\n                   <input type=\"checkbox\" [(ngModel)]=\"model.is_data_collector\" name=\"is_data_collector\">\n                   <span class=\"checkmark\"></span>\n                 </label>\n                 <label [ngClass]=\"{'access-control11': model.is_csr_closer == true}\" class=\"cust-check-bx2\">CSR Closure\n                   <input type=\"checkbox\" [(ngModel)]=\"model.is_csr_closer\" name=\"is_csr_closer\">\n                   <span class=\"checkmark\"></span>\n                 </label>\n              </div>\n           </div>\n          </form>\n  \n       </div>\n    </div>\n  </div>\n\n\n<!-- view inhouse user modal -->\n<div class=\"modal animated\" id=\"view\">\n    <div class=\"modal-dialog fadeIndown modal-lg\">\n       <div class=\"modal-content\">\n          <div class=\"modal-header\" style=\"padding: 5%; padding-bottom: 0;\">\n            <h4 class=\"modal-title\">Assigned Roles</h4>\n            <button type=\"button\" style=\"display: none;\" class=\"close\" data-dismiss=\"modal\" #viewModalClose>&times;</button>\n            <button type=\"button\" class=\"close\" (click)=\"closeViewModal()\">&times;</button>\n          </div>\n  \n          <form class=\"form-horizontal form-model0P\" role=\"form\" ngNativeValidate #addForm1=\"ngForm\" (ngSubmit)=\"addNewUser(addForm1)\">\n          <div class=\"modal-body\">\n              <!-- <div *ngFor=\"let add of model.address; let j=index\">\n                <app-address [address]=\"add\" [index]=\"j\" [status]=\"true\" (removeAddress)=\"removeAddressObj($event)\"></app-address>\n              </div> -->\n  \n              <div class=\"access-controls\">\n                 <label [ngClass]=\"{'access-control11': model.is_broker_seller_dev == true}\" class=\"cust-check-bx2\">CSR Broker/Seller/Developer\n                   <input disabled type=\"checkbox\" name=\"is_broker_seller_dev\" [(ngModel)]=\"model.is_broker_seller_dev\">\n                   <span class=\"checkmark\"></span>\n                 </label>\n   \n                 <label [ngClass]=\"{'access-control11': model.is_buyer_renter == true}\" class=\"cust-check-bx2\">CSR Buyer/Renter\n                   <input disabled type=\"checkbox\" [(ngModel)]=\"model.is_buyer_renter\" name=\"is_buyer_renter\">\n                   <span class=\"checkmark\"></span>\n                 </label>\n   \n                 <label [ngClass]=\"{'access-control11': model.is_broker == true}\" class=\"cust-check-bx2\">Broker\n                   <input disabled type=\"checkbox\" [(ngModel)]=\"model.is_broker\" name=\"is_broker\">\n                   <span class=\"checkmark\"></span>\n                 </label>\n   \n                 <label [ngClass]=\"{'access-control11': model.is_data_collector == true}\" class=\"cust-check-bx2\">Data Collector\n                   <input disabled type=\"checkbox\" [(ngModel)]=\"model.is_data_collector\" name=\"is_data_collector\">\n                   <span class=\"checkmark\"></span>\n                 </label>\n                 <label [ngClass]=\"{'access-control11': model.is_csr_closer == true}\" class=\"cust-check-bx2\">CSR Closure\n                   <input disabled type=\"checkbox\" [(ngModel)]=\"model.is_csr_closer\" name=\"is_csr_closer\">\n                   <span class=\"checkmark\"></span>\n                 </label>\n              </div>\n           </div>\n          </form>\n  \n       </div>\n    </div>\n  </div>\n  "

/***/ }),

/***/ "../../../../../src/app/layout/inhouse-users/inhouse-users.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_inhouse_users_model__ = __webpack_require__("../../../../../src/app/models/inhouse-users.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_common_service__ = __webpack_require__("../../../../../src/app/services/common.service.ts");
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







var InhouseUsersComponent = /** @class */ (function () {
    function InhouseUsersComponent(constant, cs, model, route, admin, router, sanitization) {
        var _this = this;
        this.constant = constant;
        this.cs = cs;
        this.model = model;
        this.route = route;
        this.admin = admin;
        this.router = router;
        this.sanitization = sanitization;
        this.parameter = {};
        this.lead_sort = 1;
        this.addressIndex = 0;
        // disabledLocalities = [];
        this.disabledBuildings = [];
        this.seenDuplicate = false;
        this.testObject = [];
        this.admin.countryData$.subscribe(function (success) {
            _this.parameter.allCountry = success;
            // console.log('allCountry', success);
        });
    }
    InhouseUsersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.model.country_code = this.constant.country_code;
        this.model.dial_code = this.constant.dial_code;
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.p = this.constant.p;
        this.parameter.routeName = this.router.url;
        this.tempAdd = this.model.address;
        this.parameter.sub = this.route.params.subscribe(function (params) {
            _this.parameter.p = _this.constant.p;
            _this.parameter.userType = params['userType'];
            _this.parameter.name = '';
            _this.parameter.phone = '';
            _this.parameter.email = '';
            _this.parameter.items = [];
            _this.parameter.total = 0;
            _this.getCountries();
            _this.getInhouseUsers();
            _this.initialCountry = { initialCountry: _this.constant.initialCountry };
        });
    };
    InhouseUsersComponent.prototype.getPage = function (page) {
        this.parameter.p = page;
        this.getInhouseUsers();
    };
    InhouseUsersComponent.prototype.closeModal = function () {
        this.modalClose.nativeElement.click();
        this.emptyModel();
    };
    InhouseUsersComponent.prototype.emptyModel = function () {
        this.model.country_code = this.constant.country_code;
        this.model.dial_code = this.constant.dial_code;
        this.model = new __WEBPACK_IMPORTED_MODULE_3__models_inhouse_users_model__["a" /* UserModel */]();
        this.image1 = '';
        this.initialCountry = { initialCountry: this.constant.initialCountry };
        this.disabledBuildings = [];
    };
    InhouseUsersComponent.prototype.closeViewModal = function () {
        this.viewModalClose.nativeElement.click();
        this.emptyModel();
    };
    InhouseUsersComponent.prototype.removeAddressObj = function (index) {
        this.model.address.splice(index, 1);
        this.disabledBuildings.splice(index, 1);
    };
    InhouseUsersComponent.prototype.addEmptyObj = function () {
        console.log('aaaa', this.model.address, this.model.address.length);
        this.addressIndex = this.model.address.length;
        this.addressIndex--;
        console.log('==', this.addressIndex);
        console.log(this.model.address, this.addressIndex);
        if (this.model.address[this.addressIndex].countries !== '' && this.model.address[this.addressIndex].states !== '' &&
            this.model.address[this.addressIndex].cities !== '' && this.model.address[this.addressIndex].localities !== '' &&
            this.model.address[this.addressIndex].buildings !== '') {
            var obj = {
                countries: '',
                states: '',
                cities: '',
                localities: '',
                buildings: ''
            };
            this.addressIndex++;
            this.model.address.push(obj);
        }
        else {
            swal('Missing fields', 'Complete current row before adding new.', 'error');
        }
    };
    InhouseUsersComponent.prototype.disabledBuildingId = function (i) {
        this.disabledBuildings[i] = this.model.address[i].localities;
    };
    InhouseUsersComponent.prototype.onCountryChange = function (e) {
        this.model.country_code = e.iso2;
        this.model.dial_code = '+' + e.dialCode;
        this.initialCountry = { initialCountry: e.iso2 };
    };
    InhouseUsersComponent.prototype.openAddModal = function () {
        console.log(this.parameter.countries);
        this.model.address = [];
        // this.parameter.countries ? this.parameter.countries[0].id : 0;
        var obj = {
            countries: this.parameter.countries ? this.parameter.countries[0].id : 0,
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
                break;
            case 'csr-closers':
                this.parameter.url = 'getCsrClosers';
                this.model.is_csr_closer = true;
                break;
            default:
                this.parameter.url = 'getDataCollectors';
                this.model.is_data_collector = true;
                break;
        }
        this.model.country_code = this.constant.country_code;
        this.model.dial_code = this.constant.dial_code;
        console.log('==', this.model);
        this.initialCountry = { initialCountry: this.constant.initialCountry };
        this.modalOpen.nativeElement.click();
    };
    InhouseUsersComponent.prototype.telInputObject = function (obj) {
        obj.intlTelInput('setCountry', 'in');
    };
    InhouseUsersComponent.prototype.initialcountryfunc = function () {
        return { initialCountry: this.constant.initialCountry };
    };
    InhouseUsersComponent.prototype.onSelectFile1 = function (event) {
        var _this = this;
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            // this.parameter.image = event.target.files[0];
            reader.onload = function (e) {
                _this.url = e.target.result;
                _this.image1 = _this.sanitization.bypassSecurityTrustStyle("url(" + _this.url + ")");
                _this.cs.saveImage(event.target.files[0]).subscribe(function (success) {
                    _this.parameter.image = success['data'].image;
                    console.log('----', _this.parameter.image);
                });
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };
    InhouseUsersComponent.prototype.addNewUser = function (formdata) {
        var _this = this;
        this.parameter.url = this.model.id ? 'updateNewUser' : 'addNewUser';
        this.seenDuplicate = false;
        var input = new FormData();
        console.log('===', formdata);
        if (this.model.id !== '') {
            input.append('id', this.model.id);
        }
        input.append('name', this.model.name);
        input.append('country_code', this.model.country_code ? this.model.country_code : this.constant.dial_code);
        input.append('dial_code', this.model.dial_code ? this.model.dial_code : this.constant.dial_code);
        input.append('phone', this.model.phone);
        input.append('email', this.model.email);
        input.append('address', JSON.stringify(this.model.address));
        input.append('is_broker_seller_dev', formdata.value.is_broker_seller_dev === true ? '1' : '0');
        input.append('is_buyer_renter', formdata.value.is_buyer_renter === true ? '1' : '0');
        input.append('is_broker', formdata.value.is_broker === true ? '1' : '0');
        input.append('is_data_collector', formdata.value.is_data_collector === true ? '1' : '0');
        input.append('is_csr_closer', formdata.value.is_csr_closer === true ? '1' : '0');
        if (this.parameter.image) {
            input.append('image', this.parameter.image);
        }
        // checking if locality is same or not
        this.model.address.map(function (item) {
            var value = item['buildings'];
            value = value.toString();
            console.log('value', value);
            if (value === '0') {
                console.log('zz');
                _this.testObject.push(value);
            }
            else {
                if (_this.testObject.indexOf(value) === -1) {
                    console.log('ssssss', _this.testObject.indexOf(value));
                    _this.testObject.push(value);
                }
                else {
                    _this.seenDuplicate = true;
                }
            }
        });
        if (this.model.address[0].countries === '' || this.model.address[0].states === '' ||
            this.model.address[0].cities === '' || this.model.address[0].localities === '' || this.model.address[0].buildings === '') {
            swal('Error', 'Please choose location.', 'error');
        }
        else if (this.seenDuplicate) {
            this.testObject = [];
            this.seenDuplicate = false;
            swal('Error', 'Please choose different localities.', 'error');
        }
        else if ((formdata.value.is_broker_seller_dev === false && formdata.value.is_buyer_renter === false &&
            formdata.value.is_broker === false && formdata.value.is_data_collector === false &&
            formdata.value.is_csr_closer === false) ||
            (formdata.value.is_broker_seller_dev === null && formdata.value.is_buyer_renter === null &&
                formdata.value.is_broker === null && formdata.value.is_data_collector === null &&
                formdata.value.is_csr_closer === null)) {
            swal('Error', 'Please choose a role for inhouse user.', 'error');
        }
        else {
            this.parameter.loading = true;
            this.admin.postDataApi(this.parameter.url, input)
                .subscribe(function (success) {
                _this.parameter.loading = false;
                if (success.success === '0') {
                    swal('Error', success.message, 'error');
                }
                else {
                    _this.modalClose.nativeElement.click();
                    var text = _this.model.id ? 'Updated successfully.' : 'Added successfully.';
                    swal('Success', text, 'success');
                    if (_this.model.id) {
                        // edit -- replace
                        _this.parameter.items[_this.parameter.index] = success.data;
                        formdata.reset();
                    }
                    else {
                        // add - push
                        if ((formdata.value.is_broker_seller_dev === true && _this.parameter.userType === 'csr-sellers') ||
                            (formdata.value.is_buyer_renter === true && _this.parameter.userType === 'csr-buyers') ||
                            (formdata.value.is_broker === true && _this.parameter.userType === 'inhouse-broker') ||
                            (formdata.value.is_data_collector === true && _this.parameter.userType === 'data-collectors') ||
                            (formdata.value.is_csr_closer === true && _this.parameter.userType === 'csr-closers')) {
                            _this.parameter.items.push(success.data);
                        }
                        formdata.reset();
                    }
                    _this.emptyModel();
                }
            }, function (error) {
                _this.parameter.loading = false;
            });
        }
    };
    InhouseUsersComponent.prototype.editUser = function (userdata, index) {
        var _this = this;
        this.parameter.loading = true;
        this.admin.postDataApi('getNewUserById', { id: userdata.id }).subscribe(function (r) {
            _this.parameter.loading = false;
            userdata = r['data'];
            _this.parameter.index = index;
            _this.model.address = [];
            _this.model.id = userdata.id;
            _this.model.name = userdata.name;
            _this.model.email = userdata.email;
            _this.model.phone = userdata.phone;
            _this.model.country_code = userdata.country_code;
            _this.model.image = userdata.image != null ? userdata.image : '';
            if (_this.model.image) {
                _this.image1 = _this.sanitization.bypassSecurityTrustStyle("url(" + _this.model.image + ")");
            }
            _this.model.is_broker_seller_dev = userdata.permissions && userdata.permissions.can_csr_seller === 1 ? true : false;
            _this.model.is_buyer_renter = userdata.permissions && userdata.permissions.can_csr_buyer === 1 ? true : false;
            _this.model.is_broker = userdata.permissions && userdata.permissions.can_in_house_broker === 1 ? true : false;
            _this.model.is_data_collector = userdata.permissions && userdata.permissions.can_data_collector === 1 ? true : false;
            _this.model.is_csr_closer = userdata.permissions && userdata.permissions.can_csr_closer === 1 ? true : false;
            for (var ind = 0; ind < userdata.countries.length; ind++) {
                var tempAdd = {
                    countries: userdata.countries[ind].id.toString(),
                    states: userdata.states !== null && userdata.states[ind] ? userdata.states[ind].id.toString() : '0',
                    cities: userdata.cities !== null && userdata.cities[ind] ? userdata.cities[ind].id.toString() : '0',
                    localities: userdata.localities !== null && userdata.localities[ind] ? userdata.localities[ind].id.toString() : '0',
                    buildings: userdata.buildings !== null && userdata.buildings[ind] ? userdata.buildings[ind].id.toString() : '0'
                };
                _this.model.address[ind] = tempAdd;
            }
            _this.modalOpen.nativeElement.click();
        }, function (erorr) {
            _this.parameter.loading = false;
        });
    };
    InhouseUsersComponent.prototype.viewDetails = function (userdata, index) {
        this.model.address = [];
        this.viewModalOpen.nativeElement.click();
        this.model.is_broker_seller_dev = userdata.permissions && userdata.permissions.can_csr_seller === 1 ? true : false;
        this.model.is_buyer_renter = userdata.permissions && userdata.permissions.can_csr_buyer === 1 ? true : false;
        this.model.is_broker = userdata.permissions && userdata.permissions.can_in_house_broker === 1 ? true : false;
        this.model.is_data_collector = userdata.permissions && userdata.permissions.can_data_collector === 1 ? true : false;
        this.model.is_csr_closer = userdata.permissions && userdata.permissions.can_csr_closer === 1 ? true : false;
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
    };
    // getCountries() {
    //   this.parameter.url = 'getCountries';
    //   const input = new FormData();
    //   this.parameter.states = []; this.parameter.cities = []; this.parameter.localities = []; this.parameter.buildings = [];
    //   this.parameter.state_id = '-1'; this.parameter.city_id = '-1'; this.parameter.locality_id = '-1'; this.parameter.building_id = '-1';
    //   this.admin.postDataApi(this.parameter.url, input)
    //     .subscribe(
    //       success => {
    //         this.parameter.countries = success.data;
    //       });
    // }
    // getStates(country_id) {
    //   this.parameter.url = 'country/getStates';
    //   this.parameter.country_id = country_id;
    //   this.parameter.states = []; this.parameter.cities = []; this.parameter.localities = []; this.parameter.buildings = [];
    //   this.parameter.state_id = '-1'; this.parameter.city_id = '-1'; this.parameter.locality_id = '-1'; this.parameter.building_id = '-1';
    //   const input = new FormData();
    //   input.append('country_id', country_id);
    //   this.admin.postDataApi(this.parameter.url, input)
    //     .subscribe(
    //       success => {
    //         this.parameter.states = success.data;
    //       });
    // }
    // getCities(state_id) {
    //   this.parameter.url = 'getCities';
    //   this.parameter.state_id = state_id;
    //   this.parameter.cities = []; this.parameter.localities = []; this.parameter.buildings = [];
    //   this.parameter.city_id = '-1'; this.parameter.locality_id = '-1'; this.parameter.building_id = '-1';
    //   const input = new FormData();
    //   input.append('state_id', state_id);
    //   this.admin.postDataApi(this.parameter.url, input)
    //     .subscribe(
    //       success => {
    //         this.parameter.cities = success.data;
    //       });
    // }
    // getLocalities(city_id) {
    //   this.parameter.url = 'getLocalities';
    //   this.parameter.city_id = city_id;
    //   this.parameter.localities = []; this.parameter.buildings = [];
    //   this.parameter.locality_id = '-1'; this.parameter.building_id = '-1';
    //   const input = new FormData();
    //   input.append('city_id', city_id);
    //   this.admin.postDataApi(this.parameter.url, input)
    //     .subscribe(
    //       success => {
    //         this.parameter.localities = success.data;
    //       });
    // }
    // getLocalityBuildings(locality_id) {
    //   this.parameter.url = 'getLocalityBuildings';
    //   this.parameter.locality_id = locality_id;
    //   this.parameter.buildings = [];
    //   this.parameter.building_id = '-1';
    //   const input = new FormData();
    //   input.append('locality_id', locality_id);
    //   this.admin.postDataApi(this.parameter.url, input)
    //     .subscribe(
    //       success => {
    //         this.parameter.buildings = success.data;
    //       });
    // }
    InhouseUsersComponent.prototype.resetFilters = function () {
        this.parameter.countries = JSON.parse(JSON.stringify(this.parameter.countries));
        this.getStates('-1');
        this.parameter.p = this.constant.p;
        this.parameter.total = 0;
        this.getInhouseUsers();
    };
    InhouseUsersComponent.prototype.getCountries = function () {
        var _this = this;
        this.parameter.countries = [];
        this.parameter.country_id = '-1';
        this.parameter.states = [];
        this.parameter.cities = [];
        this.parameter.localities = [];
        this.parameter.buildings = [];
        this.parameter.state_id = '-1';
        this.parameter.city_id = '-1';
        this.parameter.locality_id = '-1';
        this.parameter.building_id = '-1';
        this.admin.postDataApi('getCountryLocality', {}).subscribe(function (r) {
            console.log('Country', r);
            _this.parameter.countries = r['data'];
        });
    };
    InhouseUsersComponent.prototype.getStates = function (country_id) {
        this.parameter.country_id = country_id;
        this.parameter.states = [];
        this.parameter.cities = [];
        this.parameter.localities = [];
        this.parameter.buildings = [];
        this.parameter.state_id = '-1';
        this.parameter.city_id = '-1';
        this.parameter.locality_id = '-1';
        this.parameter.building_id = '-1';
        if (!country_id || country_id === '-1') {
            return false;
        }
        var selectedCountry = this.parameter.countries.filter(function (x) { return x.id.toString() === country_id; });
        this.parameter.states = selectedCountry[0].states;
    };
    InhouseUsersComponent.prototype.getCities = function (state_id) {
        this.parameter.cities = [];
        this.parameter.localities = [];
        this.parameter.buildings = [];
        this.parameter.city_id = '-1';
        this.parameter.locality_id = '-1';
        this.parameter.building_id = '-1';
        if (!state_id || state_id === '-1') {
            return false;
        }
        this.parameter.state_id = state_id;
        var selectedState = this.parameter.states.filter(function (x) { return x.id.toString() === state_id; });
        this.parameter.cities = selectedState[0].cities;
    };
    InhouseUsersComponent.prototype.getLocalities = function (city_id) {
        this.parameter.localities = [];
        this.parameter.buildings = [];
        this.parameter.locality_id = '-1';
        this.parameter.building_id = '-1';
        if (!city_id || city_id === '-1') {
            return false;
        }
        this.parameter.city_id = city_id;
        var selectedCountry = this.parameter.cities.filter(function (x) { return x.id.toString() === city_id; });
        this.parameter.localities = selectedCountry[0].localities;
    };
    InhouseUsersComponent.prototype.getLocalityBuildings = function (locality_id) {
        var _this = this;
        this.parameter.url = 'getLocalityBuildings';
        this.parameter.locality_id = locality_id;
        this.parameter.buildings = [];
        this.parameter.building_id = '-1';
        var input = new FormData();
        input.append('locality_id', locality_id);
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.parameter.buildings = success.data;
        });
    };
    // getLocalityBuildings(locality_id) {
    //   console.log(locality_id);
    //   this.parameter.buildings = [];
    //   this.parameter.building_id = '-1';
    //   if (!locality_id || locality_id === '-1') {
    //     return false;
    //   }
    //   this.parameter.locality_id = locality_id;
    //   const selectedCountry = this.parameter.cities.filter(x => x.id.toString() === locality_id);
    //   this.parameter.buildings = selectedCountry[0].localities;
    // }
    InhouseUsersComponent.prototype.setBuilding = function (building_id) {
        console.log(building_id);
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
    InhouseUsersComponent.prototype.setLeadSort = function () {
        this.lead_sort = this.lead_sort === 1 ? 2 : 1;
        this.getInhouseUsers();
    };
    InhouseUsersComponent.prototype.getInhouseUsers = function () {
        var _this = this;
        this.parameter.loading = true;
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
                this.title = 'Inhouse Brokers';
                this.parameter.type = 4;
                break;
            case 'csr-closers':
                this.parameter.url = 'getCsrClosers';
                this.title = 'CSR Closures';
                this.parameter.type = 5;
                break;
            default:
                this.parameter.url = 'getDataCollectors';
                this.parameter.type = 1;
                break;
        }
        var input = new FormData();
        input.append('page', this.parameter.p.toString());
        if (this.lead_sort) {
            input.append('lead_sort', this.lead_sort.toString());
        }
        if (this.parameter.name) {
            input.append('name', this.parameter.name);
        }
        if (this.parameter.email) {
            input.append('email', this.parameter.email);
        }
        if (this.parameter.phone) {
            input.append('phone', this.parameter.phone);
        }
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
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.parameter.loading = false;
            // console.log('data', success);
            _this.parameter.items = success.data;
            _this.parameter.total = success.total;
            // this.parameter.items.reverse();
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    InhouseUsersComponent.prototype.addRow = function () {
        var obj = {
            countries: '',
            states: '',
            cities: '',
            localities: '',
            buildings: ''
        };
        this.model.address.push(obj);
    };
    InhouseUsersComponent.prototype.blockUnblockPopup = function (index, id, flag, user_type) {
        var _this = this;
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
        swal({
            // title: this.parameter.title,
            // text: this.parameter.text,
            html: this.parameter.title + '<br>' + this.parameter.text,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes!'
        }).then(function (result) {
            if (result.value) {
                _this.blockAdmin(index, id, flag, user_type);
            }
        });
    };
    InhouseUsersComponent.prototype.blockAdmin = function (index, id, flag, user_type) {
        var _this = this;
        // this.parameter.loading = true;
        this.parameter.url = 'blockAdmin';
        var input = new FormData();
        input.append('id', id);
        input.append('flag', flag);
        input.append('user_type', user_type);
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            // this.parameter.loading = false;
            swal('Success', _this.parameter.successText, 'success');
            _this.parameter.items[_this.parameter.index] = success.data;
        });
    };
    InhouseUsersComponent.prototype.getCountryLocality = function () {
        var _this = this;
        this.admin.postDataApi('getCountryLocality', {}).subscribe(function (r) {
            console.log('Country', r);
            _this.parameter.countries = r['data'];
        });
    };
    InhouseUsersComponent.prototype.onCountryChange1 = function (id) {
        console.log(id);
        this.parameter.cities = [];
        this.parameter.city_id = '0';
        this.parameter.localities = [];
        this.parameter.locality_id = '0';
        if (!id || id === 0) {
            this.parameter.state_id = '0';
            return false;
        }
        this.parameter.country_id = id;
        var selectedCountry = this.parameter.countries.filter(function (x) { return x.id === id; });
        this.parameter.states = selectedCountry[0].states;
    };
    InhouseUsersComponent.prototype.onStateChange = function (id) {
        console.log(id);
        this.parameter.localities = [];
        this.parameter.locality_id = '0';
        if (!id || id === 0) {
            this.parameter.city_id = '0';
            return false;
        }
        this.parameter.state_id = id;
        var selectedState = this.parameter.states.filter(function (x) { return x.id === id; });
        this.parameter.cities = selectedState[0].cities;
    };
    InhouseUsersComponent.prototype.onCityChange = function (id) {
        console.log(id);
        if (!id || id === 0) {
            this.parameter.locality_id = '0';
            return false;
        }
        this.parameter.city_id = id;
        var selectedCountry = this.parameter.cities.filter(function (x) { return x.id === id; });
        this.parameter.localities = selectedCountry[0].localities;
    };
    InhouseUsersComponent.prototype.onLocalityChange = function (id) {
        console.log(id);
        if (!id || id === 0) {
            return false;
        }
        this.parameter.locality_id = id;
        // let selectedLocation = this.location.localities.filter(x=>x.id == id);
        // this.location.locality = selectedLocation[0];
    };
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('modalOpen'),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _a : Object)
    ], InhouseUsersComponent.prototype, "modalOpen", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('modalClose'),
        __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _b : Object)
    ], InhouseUsersComponent.prototype, "modalClose", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('viewModalOpen'),
        __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _c : Object)
    ], InhouseUsersComponent.prototype, "viewModalOpen", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('viewModalClose'),
        __metadata("design:type", typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _d : Object)
    ], InhouseUsersComponent.prototype, "viewModalClose", void 0);
    InhouseUsersComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-inhouse-users',
            template: __webpack_require__("../../../../../src/app/layout/inhouse-users/inhouse-users.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/inhouse-users/inhouse-users.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_4__common_constants__["a" /* Constant */], __WEBPACK_IMPORTED_MODULE_3__models_inhouse_users_model__["b" /* User */], __WEBPACK_IMPORTED_MODULE_3__models_inhouse_users_model__["c" /* Address */], __WEBPACK_IMPORTED_MODULE_3__models_inhouse_users_model__["a" /* UserModel */]]
        }),
        __metadata("design:paramtypes", [typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__common_constants__["a" /* Constant */]) === "function" ? _e : Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6__services_common_service__["a" /* CommonService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__services_common_service__["a" /* CommonService */]) === "function" ? _f : Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_3__models_inhouse_users_model__["a" /* UserModel */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__models_inhouse_users_model__["a" /* UserModel */]) === "function" ? _g : Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["ActivatedRoute"]) === "function" ? _h : Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" ? _j : Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"]) === "function" ? _k : Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__["DomSanitizer"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__["DomSanitizer"]) === "function" ? _l : Object])
    ], InhouseUsersComponent);
    return InhouseUsersComponent;
}());

//# sourceMappingURL=inhouse-users.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/layout-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__layout_component__ = __webpack_require__("../../../../../src/app/layout/layout.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dashboard_dashboard_component__ = __webpack_require__("../../../../../src/app/layout/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__guards_auth_guard__ = __webpack_require__("../../../../../src/app/guards/auth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__inhouse_users_inhouse_users_component__ = __webpack_require__("../../../../../src/app/layout/inhouse-users/inhouse-users.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__generate_thumb_generate_thumb_component__ = __webpack_require__("../../../../../src/app/layout/generate-thumb/generate-thumb.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__guards_acl_user_guard__ = __webpack_require__("../../../../../src/app/guards/acl-user.guard.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LayoutRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


// importing components


// import { ChangePasswordComponent } from './settings/change-password/change-password.component';


// import { EditTemplateComponent } from './edit-template/edit-template.component';


var routes = [
    {
        path: 'dashboard', component: __WEBPACK_IMPORTED_MODULE_2__layout_component__["a" /* LayoutComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_4__guards_auth_guard__["a" /* AuthGuard */]],
        children: [
            { path: '', component: __WEBPACK_IMPORTED_MODULE_3__dashboard_dashboard_component__["a" /* DashboardComponent */] },
            { path: 'view-inhouse-users/:userType', component: __WEBPACK_IMPORTED_MODULE_5__inhouse_users_inhouse_users_component__["a" /* InhouseUsersComponent */],
                canActivate: [__WEBPACK_IMPORTED_MODULE_7__guards_acl_user_guard__["a" /* AclUserGuard */]], data: { roles: ['', '', ''] } },
            // { path: 'change-password', component: ChangePasswordComponent},
            { path: 'notary', loadChildren: './notary/notary.module#NotaryModule' },
            { path: 'banks', loadChildren: './banks/banks.module#BanksModule' },
            { path: 'users', loadChildren: './users/users.module#UsersModule' },
            { path: 'leads', loadChildren: './leads/leads.module#LeadsModule' },
            { path: 'manual-leads', loadChildren: './manual-leads/manual-leads.module#ManualLeadsModule' },
            { path: 'templates', loadChildren: './templates/templates.module#TemplatesModule' },
            { path: 'generate-thumb', component: __WEBPACK_IMPORTED_MODULE_6__generate_thumb_generate_thumb_component__["a" /* GenerateThumbComponent */] },
            { path: 'reports', loadChildren: './reports/reports.module#ReportsModule' },
            { path: 'access-control-mgt', loadChildren: './acl/acl.module#AclModule' },
            { path: 'appointments', loadChildren: './appointments/appointments.module#AppointmentsModule' },
            // { path: 'notifications', component: NotificationsComponent},
            { path: 'notifications', loadChildren: './notifications/notifications.module#NotificationsModule' },
            { path: 'settings', loadChildren: './settings/settings.module#SettingsModule' },
            { path: 'properties', loadChildren: './properties/properties.module#PropertiesModule' },
            { path: 'projects', loadChildren: './projects/projects.module#ProjectsModule' },
        ]
    }
];
var LayoutRoutingModule = /** @class */ (function () {
    function LayoutRoutingModule() {
    }
    LayoutRoutingModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"].forChild(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"]]
        })
    ], LayoutRoutingModule);
    return LayoutRoutingModule;
}());

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

module.exports = "\n<section id=\"wrapper\">\n  <app-header></app-header>\n  <section id=\"main\">\n    <div id=\"content\">\n      <router-outlet></router-outlet>\n    </div>\n  </section>\n</section>\n"

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

var LayoutComponent = /** @class */ (function () {
    function LayoutComponent() {
    }
    LayoutComponent.prototype.ngOnInit = function () { };
    LayoutComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-layout',
            template: __webpack_require__("../../../../../src/app/layout/layout.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/layout.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], LayoutComponent);
    return LayoutComponent;
}());

//# sourceMappingURL=layout.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/layout.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_pagination__ = __webpack_require__("../../../../ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ngx_mydatepicker__ = __webpack_require__("../../../../ngx-mydatepicker/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ngx_malihu_scrollbar__ = __webpack_require__("../../../../ngx-malihu-scrollbar/dist/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ngx_bootstrap_modal__ = __webpack_require__("../../../../ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__agm_core__ = __webpack_require__("../../../../@agm/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ng2_tel_input__ = __webpack_require__("../../../../ng2-tel-input/ng2-tel-input.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ng2_tel_input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_ng2_tel_input__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angular_froala_wysiwyg__ = __webpack_require__("../../../../angular-froala-wysiwyg/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_primeng_primeng__ = __webpack_require__("../../../../primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ng_lazyload_image__ = __webpack_require__("../../../../ng-lazyload-image/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ng_lazyload_image___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_ng_lazyload_image__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__swimlane_ngx_charts__ = __webpack_require__("../../../../@swimlane/ngx-charts/release/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__swimlane_ngx_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13__swimlane_ngx_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_ngx_loading__ = __webpack_require__("../../../../ngx-loading/ngx-loading/ngx-loading.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__layout_routing_module__ = __webpack_require__("../../../../../src/app/layout/layout-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__layout_component__ = __webpack_require__("../../../../../src/app/layout/layout.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__shared_app_header_app_header_component__ = __webpack_require__("../../../../../src/app/shared/app-header/app-header.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__dashboard_dashboard_component__ = __webpack_require__("../../../../../src/app/layout/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__shared_app_footer_app_footer_component__ = __webpack_require__("../../../../../src/app/shared/app-footer/app-footer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__inhouse_users_inhouse_users_component__ = __webpack_require__("../../../../../src/app/layout/inhouse-users/inhouse-users.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__inhouse_users_address_address_component__ = __webpack_require__("../../../../../src/app/layout/inhouse-users/address/address.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__guards_auth_guard__ = __webpack_require__("../../../../../src/app/guards/auth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__generate_thumb_generate_thumb_component__ = __webpack_require__("../../../../../src/app/layout/generate-thumb/generate-thumb.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__directives_acl_permission_directive__ = __webpack_require__("../../../../../src/app/directives/acl-permission.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__guards_acl_user_guard__ = __webpack_require__("../../../../../src/app/guards/acl-user.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__fire_base_messaging_service__ = __webpack_require__("../../../../../src/app/fire-base/messaging.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__modules_shared_module__ = __webpack_require__("../../../../../src/app/modules/shared.module.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutModule", function() { return LayoutModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// third party libraries















// importing shared components





// importing general component








var LayoutModule = /** @class */ (function () {
    function LayoutModule() {
    }
    LayoutModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_15__layout_routing_module__["a" /* LayoutRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["a" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["ReactiveFormsModule"],
                __WEBPACK_IMPORTED_MODULE_7_ngx_bootstrap_modal__["a" /* ModalModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_4_ngx_pagination__["a" /* NgxPaginationModule */],
                __WEBPACK_IMPORTED_MODULE_14_ngx_loading__["a" /* LoadingModule */].forRoot({
                    animationType: __WEBPACK_IMPORTED_MODULE_14_ngx_loading__["b" /* ANIMATION_TYPES */].rectangleBounce,
                    primaryColour: '#00B96F'
                }),
                __WEBPACK_IMPORTED_MODULE_5_ngx_mydatepicker__["NgxMyDatePickerModule"].forRoot(),
                __WEBPACK_IMPORTED_MODULE_6_ngx_malihu_scrollbar__["a" /* MalihuScrollbarModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_8__agm_core__["a" /* AgmCoreModule */].forRoot({
                    apiKey: 'AIzaSyCYv_zELZGVo2Ehzgp8eh8UeSIidhMCmH8',
                    libraries: ['drawing']
                }),
                __WEBPACK_IMPORTED_MODULE_9_ng2_tel_input__["Ng2TelInputModule"],
                __WEBPACK_IMPORTED_MODULE_13__swimlane_ngx_charts__["NgxChartsModule"],
                __WEBPACK_IMPORTED_MODULE_27__modules_shared_module__["a" /* SharedModule */],
                __WEBPACK_IMPORTED_MODULE_10_angular_froala_wysiwyg__["a" /* FroalaEditorModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_10_angular_froala_wysiwyg__["b" /* FroalaViewModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_11_primeng_primeng__["CalendarModule"],
                __WEBPACK_IMPORTED_MODULE_12_ng_lazyload_image__["LazyLoadImageModule"]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_16__layout_component__["a" /* LayoutComponent */],
                __WEBPACK_IMPORTED_MODULE_17__shared_app_header_app_header_component__["a" /* AppHeaderComponent */],
                __WEBPACK_IMPORTED_MODULE_18__dashboard_dashboard_component__["a" /* DashboardComponent */],
                __WEBPACK_IMPORTED_MODULE_19__shared_app_footer_app_footer_component__["a" /* AppFooterComponent */],
                __WEBPACK_IMPORTED_MODULE_20__inhouse_users_inhouse_users_component__["a" /* InhouseUsersComponent */],
                __WEBPACK_IMPORTED_MODULE_21__inhouse_users_address_address_component__["a" /* AddressComponent */],
                __WEBPACK_IMPORTED_MODULE_23__generate_thumb_generate_thumb_component__["a" /* GenerateThumbComponent */],
                __WEBPACK_IMPORTED_MODULE_24__directives_acl_permission_directive__["a" /* AclPermissionDirective */],
            ],
            providers: [
                // AdminService,
                // CommonService,
                __WEBPACK_IMPORTED_MODULE_26__fire_base_messaging_service__["a" /* MessagingService */],
                __WEBPACK_IMPORTED_MODULE_22__guards_auth_guard__["a" /* AuthGuard */],
                __WEBPACK_IMPORTED_MODULE_25__guards_acl_user_guard__["a" /* AclUserGuard */],
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_16__layout_component__["a" /* LayoutComponent */]],
        })
    ], LayoutModule);
    return LayoutModule;
}());

//# sourceMappingURL=layout.module.js.map

/***/ }),

/***/ "../../../../../src/app/login/login.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "\n<section id=\"wrapper\">\n    <header>\n        <div class=\"row\">\n            <div class=\"col-6\">\n                <a class=\"logo\" href=\"\">\n                <img class=\"app-logo\" src=\"assets/img/logo.png\" alt=\"img\">\n                </a>\n            </div>\n        </div>\n    </header>\n    <ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n    <div class=\"login\">\n        <div class=\"container\">\n            <div class=\"row\">\n                <div class=\"col-xl-8 col-lg-6 col-md-6 col-12\">\n                    <h2>One Easy Solution for Your Needs.</h2>\n                    <p class=\"p18\">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.</p>\n                </div>\n                <div class=\"col-xl-4 col-lg-6 col-md-6 col-12\">\n                    <form class=\"form-horizontal text-center\" role=\"form\" novalidate #loginForm=\"ngForm\" (ngSubmit)=\"loginUser(loginForm)\">\n                        <h3>Login</h3>\n                        <div class=\"form-group-3\">\n                            <input autocomplete=\"off\" [pattern]=\"constant.emailPattern\" class=\"form-control\" placeholder=\"Username/Email\" id=\"email\" required [(ngModel)]=\"model.email\" name=\"email\" #input1 #email=\"ngModel\">\n                            <div *ngIf=\"email.errors && (email.dirty || email.touched)\" class=\"show-error\">\n                                <div [hidden]=\"!email.errors.required\">\n                                    Please enter email.\n                                </div>\n                                <div [hidden]=\"!email.errors.pattern\">\n                                    Please enter valid email.\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"form-group-3\">\n                            <input autocomplete=\"off\" type=\"password\" class=\"form-control\" placeholder=\"Password\" id=\"password\" required [(ngModel)]=\"model.password\" name=\"password\" #password=\"ngModel\">\n                            <div *ngIf=\"password.errors && (password.dirty || password.touched)\" class=\"show-error\">\n                                <div [hidden]=\"!password.errors.required\">\n                                    Please enter password.\n                                </div>\n                                <!-- <div [hidden]=\"!password.errors.minlength\">\n                                    Password's length must be at least {{8-model.password.length}}.\n                                </div> -->\n                            </div>\n                        </div>\n                        <a class=\"fgt-pswd\" href=\"/forgot-password\">Forgot Password?</a>\n                        <div class=\"btn-cont text-right\">\n                            <button type=\"submit\" [disabled]=\"loginForm.invalid\" class=\"btn btn-primary login-btn mgt-50\">LOGIN</button>\n                        </div>\n\n                        <p class=\"text-center\">By login you are agree to <a href=\"javascript://\"> Terms & Condition </a>\n                        and <a href=\"javascript://\"> Privacy Policy</a> of {{projectName}}.</p>\n                    </form>\n                </div>\n            </div>\n        </div>\n    </div>\n</section>"

/***/ }),

/***/ "../../../../../src/app/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_sweetalert2__ = __webpack_require__("../../../../sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_sweetalert2__);
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





var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, admin, constant) {
        this.router = router;
        this.admin = admin;
        this.constant = constant;
        this.model = {
            email: '',
            password: ''
        };
        this.parameter = {};
        // this.loginForm.reset();
        this.parameter.loading = false;
        this.projectName = this.constant.projectName;
        // const token =  localStorage.getItem('token');
        // if (token) {
        //   this.router.navigate(['dashboard/view-inhouse-users/data-collectors']);
        // }
    }
    LoginComponent.prototype.ngOnInit = function () { };
    LoginComponent.prototype.ngAfterViewInit = function () {
        // this.input1.nativeElement.focus();
    };
    LoginComponent.prototype.loginUser = function (formData) {
        var _this = this;
        this.parameter.loading = true;
        var email = formData.value.email;
        var password = formData.value.password;
        //     this.admin.adminLogin1(email.toLowerCase(), password)
        //     .subscribe(success => {
        //         this.parameter.loading = false;
        //         const responseData1 = success[0];
        //         const responseData2 = success[1];
        //         const loginReponse = responseData1.json();
        //         const countryResponse = responseData2.json();
        //         this.admin.login.next(loginReponse.data);
        //         this.admin.country.next(countryResponse.data);
        // console.log('login success', success);
        //         this.admin.setUserLoggedIn();
        //         this.router.navigate(['dashboard/view-inhouse-users/data-collectors']);
        //       },
        //       error => {
        //         this.parameter.loading = false;
        //       }
        //     );
        this.admin.adminLogin(email.toLowerCase(), password)
            .subscribe(function (success) {
            _this.parameter.loading = false;
            if (success.data.is_blocked === 1) {
                __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default()('Error', 'You are blocked by admin.', 'error');
                return false;
            }
            if (success.data.permissions) {
                if (success.data.permissions.can_csr_buyer === 1) {
                    _this.router.navigate(['dashboard/leads/csr-buyers']);
                }
                else if (success.data.permissions.can_data_collector === 1) {
                    _this.router.navigate(['dashboard/leads/data-collectors']);
                }
                else if (success.data.permissions.can_in_house_broker === 1) {
                    _this.router.navigate(['dashboard/leads/inhouse-broker']);
                }
                else if (success.data.permissions.can_csr_seller === 1) {
                    _this.router.navigate(['dashboard/leads/csr-sellers']);
                }
                else if (success.data.permissions.can_csr_closer === 1) {
                    _this.router.navigate(['dashboard/leads/csr-closers']);
                }
                else if (success.data.permissions.can_bank === 1) {
                    _this.router.navigate(['dashboard/banks/bank-leads']);
                }
                else if (success.data.permissions.can_noatary === 1) {
                    _this.router.navigate(['dashboard/notary/notary-leads']);
                }
            }
            else if (success.data.admin_acl) {
                var check_1 = true;
                var dd = _this.admin.admin_acl_array.map(function (obj, index) {
                    var key = Object.keys(obj)[0];
                    if (check_1 && obj[key]['can_read'] === 1) {
                        check_1 = false;
                        _this.router.navigate([obj[key]['acl'].path]);
                    }
                });
            }
            else {
                _this.router.navigate(['dashboard']);
            }
        }, function (error) {
            _this.parameter.loading = false;
        });
        // this.admin.adminLogin(email.toLowerCase(), password)
        // .then((data: any) => {
        //   this.admin.setUserLoggedIn();
        //   this.router.navigate(['dashboard/view-inhouse-users/data-collectors']);
        //   this.parameter.loading = false;
        // })
        // .catch((error: any) => {
        //   this.parameter.loading = false;
        // });
    };
    var _a, _b, _c, _d;
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('input1'),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _a : Object)
    ], LoginComponent.prototype, "input1", void 0);
    LoginComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-login',
            template: __webpack_require__("../../../../../src/app/login/login.component.html"),
            styles: [__webpack_require__("../../../../../src/app/login/login.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" ? _b : Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */]) === "function" ? _c : Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__common_constants__["a" /* Constant */]) === "function" ? _d : Object])
    ], LoginComponent);
    return LoginComponent;
}());

//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ "../../../../../src/app/models/chat.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Chat; });
/* unused harmony export ConversationUser */
var Chat = /** @class */ (function () {
    function Chat() {
        this.message_type = 1; // Text = 1, Image = 2, Video = 3, Attachement = 4
    }
    return Chat;
}());

var ConversationUser = /** @class */ (function () {
    function ConversationUser() {
    }
    return ConversationUser;
}());

//# sourceMappingURL=chat.model.js.map

/***/ }),

/***/ "../../../../../src/app/models/inhouse-users.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export InhouseUsers */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return User; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Address; });
/* unused harmony export NewAddress */
var InhouseUsers = /** @class */ (function () {
    function InhouseUsers() {
        this.address = [
            {
                countries: '',
                states: '',
                cities: '',
                localities: '',
                buildings: ''
            }
        ];
        this.userModel = {
            id: '',
            name: '',
            country_code: 'mx',
            dial_code: '+52',
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

var UserModel = /** @class */ (function () {
    function UserModel() {
    }
    return UserModel;
}());

var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());

var Address = /** @class */ (function () {
    function Address() {
    }
    return Address;
}());

var NewAddress = /** @class */ (function () {
    function NewAddress() {
    }
    return NewAddress;
}());

//# sourceMappingURL=inhouse-users.model.js.map

/***/ }),

/***/ "../../../../../src/app/models/leads.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return DealFinalize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Notes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FillInformation; });
/* unused harmony export ProximityPlaces */
/* unused harmony export CarTypes */
/* unused harmony export Configuration */
/* unused harmony export PropertyTypes */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return SelectedProperties; });
/* unused harmony export Documents */
/* unused harmony export UploadedDocuments */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return NotaryAssigned; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return BankAssigned; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return NotaryLeads; });
/* unused harmony export SelectedNotary */
/* unused harmony export NotaryAvailabilty */
/* unused harmony export Datetime */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return AddNotaryAvailabilty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return ScheduleMeeting; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return AddAppointment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return AddAppointmentMultiple; });
var DealFinalize = /** @class */ (function () {
    function DealFinalize() {
    }
    return DealFinalize;
}());

var Notes = /** @class */ (function () {
    function Notes() {
    }
    return Notes;
}());

var FillInformation = /** @class */ (function () {
    function FillInformation() {
    }
    return FillInformation;
}());

var ProximityPlaces = /** @class */ (function () {
    function ProximityPlaces() {
    }
    return ProximityPlaces;
}());

var CarTypes = /** @class */ (function () {
    function CarTypes() {
    }
    return CarTypes;
}());

var Configuration = /** @class */ (function () {
    function Configuration() {
    }
    return Configuration;
}());

var PropertyTypes = /** @class */ (function () {
    function PropertyTypes() {
    }
    return PropertyTypes;
}());

var SelectedProperties = /** @class */ (function () {
    function SelectedProperties() {
    }
    return SelectedProperties;
}());

var Documents = /** @class */ (function () {
    function Documents() {
    }
    return Documents;
}());

var UploadedDocuments = /** @class */ (function () {
    function UploadedDocuments() {
    }
    return UploadedDocuments;
}());

var NotaryAssigned = /** @class */ (function () {
    function NotaryAssigned() {
    }
    return NotaryAssigned;
}());

var BankAssigned = /** @class */ (function () {
    function BankAssigned() {
    }
    return BankAssigned;
}());

var NotaryLeads = /** @class */ (function () {
    function NotaryLeads() {
    }
    return NotaryLeads;
}());

var SelectedNotary = /** @class */ (function () {
    function SelectedNotary() {
    }
    return SelectedNotary;
}());

var NotaryAvailabilty = /** @class */ (function () {
    function NotaryAvailabilty() {
    }
    return NotaryAvailabilty;
}());

var Datetime = /** @class */ (function () {
    function Datetime() {
    }
    return Datetime;
}());

var AddNotaryAvailabilty = /** @class */ (function () {
    function AddNotaryAvailabilty() {
        this.date_time_array = [];
        this.date_time = [];
    }
    return AddNotaryAvailabilty;
}());

var ScheduleMeeting = /** @class */ (function () {
    function ScheduleMeeting() {
    }
    return ScheduleMeeting;
}());

var AddAppointment = /** @class */ (function () {
    function AddAppointment() {
    }
    return AddAppointment;
}());

var AddAppointmentMultiple = /** @class */ (function () {
    function AddAppointmentMultiple() {
        this.appointment_date_array = [];
        this.appointment_date = [];
    }
    return AddAppointmentMultiple;
}());

//# sourceMappingURL=leads.model.js.map

/***/ }),

/***/ "../../../../../src/app/models/login.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Login; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AdminACL; });
/* unused harmony export ACL */
/* unused harmony export Permissions */
var Login = /** @class */ (function () {
    function Login() {
    }
    return Login;
}());

var AdminACL = /** @class */ (function () {
    function AdminACL() {
    }
    return AdminACL;
}());

var ACL = /** @class */ (function () {
    function ACL() {
    }
    return ACL;
}());

var Permissions = /** @class */ (function () {
    function Permissions() {
    }
    return Permissions;
}());

//# sourceMappingURL=login.model.js.map

/***/ }),

/***/ "../../../../../src/app/modules/shared.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__layout_common_blocks_chat_chat_component__ = __webpack_require__("../../../../../src/app/layout/common-blocks/chat/chat.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pipes_chat_time_pipe__ = __webpack_require__("../../../../../src/app/pipes/chat-time.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__layout_common_blocks_notes_notes_component__ = __webpack_require__("../../../../../src/app/layout/common-blocks/notes/notes.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pipes_moment_pipe__ = __webpack_require__("../../../../../src/app/pipes/moment.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ngx_malihu_scrollbar__ = __webpack_require__("../../../../ngx-malihu-scrollbar/dist/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pipes_thousand_pipe__ = __webpack_require__("../../../../../src/app/pipes/thousand.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__layout_common_blocks_block_get_property_block_get_property_component__ = __webpack_require__("../../../../../src/app/layout/common-blocks/block-get-property/block-get-property.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ngx_pagination__ = __webpack_require__("../../../../ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pipes_img_pipe__ = __webpack_require__("../../../../../src/app/pipes/img.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pipes_number_with_commas_pipe__ = __webpack_require__("../../../../../src/app/pipes/number-with-commas.pipe.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["ReactiveFormsModule"],
                __WEBPACK_IMPORTED_MODULE_7_ngx_malihu_scrollbar__["a" /* MalihuScrollbarModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_10_ngx_pagination__["a" /* NgxPaginationModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__layout_common_blocks_chat_chat_component__["a" /* ChatComponent */],
                __WEBPACK_IMPORTED_MODULE_4__pipes_chat_time_pipe__["a" /* ChatTimePipe */],
                __WEBPACK_IMPORTED_MODULE_5__layout_common_blocks_notes_notes_component__["a" /* NotesComponent */],
                __WEBPACK_IMPORTED_MODULE_6__pipes_moment_pipe__["a" /* MomentPipe */],
                __WEBPACK_IMPORTED_MODULE_8__pipes_thousand_pipe__["a" /* ThousandPipe */],
                __WEBPACK_IMPORTED_MODULE_11__pipes_img_pipe__["a" /* ImgPipe */],
                __WEBPACK_IMPORTED_MODULE_9__layout_common_blocks_block_get_property_block_get_property_component__["a" /* BlockGetPropertyComponent */],
                __WEBPACK_IMPORTED_MODULE_12__pipes_number_with_commas_pipe__["a" /* NumberWithCommasPipe */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__layout_common_blocks_chat_chat_component__["a" /* ChatComponent */],
                __WEBPACK_IMPORTED_MODULE_4__pipes_chat_time_pipe__["a" /* ChatTimePipe */],
                __WEBPACK_IMPORTED_MODULE_5__layout_common_blocks_notes_notes_component__["a" /* NotesComponent */],
                __WEBPACK_IMPORTED_MODULE_6__pipes_moment_pipe__["a" /* MomentPipe */],
                __WEBPACK_IMPORTED_MODULE_8__pipes_thousand_pipe__["a" /* ThousandPipe */],
                __WEBPACK_IMPORTED_MODULE_11__pipes_img_pipe__["a" /* ImgPipe */],
                __WEBPACK_IMPORTED_MODULE_9__layout_common_blocks_block_get_property_block_get_property_component__["a" /* BlockGetPropertyComponent */],
                __WEBPACK_IMPORTED_MODULE_12__pipes_number_with_commas_pipe__["a" /* NumberWithCommasPipe */]
            ]
        })
    ], SharedModule);
    return SharedModule;
}());

//# sourceMappingURL=shared.module.js.map

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

var PageNotFoundComponent = /** @class */ (function () {
    function PageNotFoundComponent() {
    }
    PageNotFoundComponent.prototype.ngOnInit = function () {
    };
    PageNotFoundComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-page-not-found',
            template: __webpack_require__("../../../../../src/app/page-not-found/page-not-found.component.html"),
            styles: [__webpack_require__("../../../../../src/app/page-not-found/page-not-found.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], PageNotFoundComponent);
    return PageNotFoundComponent;
}());

//# sourceMappingURL=page-not-found.component.js.map

/***/ }),

/***/ "../../../../../src/app/pipes/chat-time.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatTimePipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var ChatTimePipe = /** @class */ (function () {
    function ChatTimePipe() {
    }
    ChatTimePipe.prototype.transform = function (created_at, format, type) {
        if (type === 1) {
            return __WEBPACK_IMPORTED_MODULE_1_moment__(created_at, format).utc(true).local().fromNow();
        }
        else if (type === 3) {
            // converting date to utc
            console.log(created_at, format);
            return __WEBPACK_IMPORTED_MODULE_1_moment__["utc"](created_at).format(format);
        }
        else if (type === 4) {
            // converting date to local
            return __WEBPACK_IMPORTED_MODULE_1_moment__(__WEBPACK_IMPORTED_MODULE_1_moment__["utc"](created_at).toDate()).local().format(format);
        }
        else if (type === 5) {
            // converting datetime to date
            return __WEBPACK_IMPORTED_MODULE_1_moment__(created_at, format).format('YYYY-MM-DD');
        }
        else {
            return __WEBPACK_IMPORTED_MODULE_1_moment__(created_at, format).utc(true).local().format('LLLL');
        }
    };
    ChatTimePipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'chatTime'
        })
    ], ChatTimePipe);
    return ChatTimePipe;
}());

//# sourceMappingURL=chat-time.pipe.js.map

/***/ }),

/***/ "../../../../../src/app/pipes/img.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImgPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ImgPipe = /** @class */ (function () {
    function ImgPipe() {
    }
    ImgPipe.prototype.transform = function (item, size) {
        if (!item) {
            return false;
        }
        if (item && item.name && (item.name !== undefined)) {
            return false;
        }
        if (size === 'thumb') {
            return item.replace('uploads\/', 'thumbs\/200x200\/');
        }
        if (size === 'small') {
            console.log('---');
            return item.replace('uploads\/', 'thumbs\/300x300\/');
        }
        if (size === 'medium') {
            return item.replace('uploads\/', 'thumbs\/400x400\/');
        }
        if (size === 'large') {
            return item;
        }
        return item;
    };
    ImgPipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'img'
        })
    ], ImgPipe);
    return ImgPipe;
}());

//# sourceMappingURL=img.pipe.js.map

/***/ }),

/***/ "../../../../../src/app/pipes/moment.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MomentPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var MomentPipe = /** @class */ (function () {
    function MomentPipe() {
    }
    MomentPipe.prototype.transform = function (dateTime, args) {
        if (args === void 0) { args = 'YYYY-MM-DD H:m:s'; }
        return __WEBPACK_IMPORTED_MODULE_1_moment__(dateTime, args).utc(true).local().format('h:mm a, MMM DD YYYY');
        // return moment(dateTime, args ).utc(true).local().fromNow();
    };
    MomentPipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'moment'
        })
    ], MomentPipe);
    return MomentPipe;
}());

//# sourceMappingURL=moment.pipe.js.map

/***/ }),

/***/ "../../../../../src/app/pipes/number-with-commas.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NumberWithCommasPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var NumberWithCommasPipe = /** @class */ (function () {
    function NumberWithCommasPipe() {
    }
    NumberWithCommasPipe.prototype.transform = function (value, args) {
        // return null;
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
    NumberWithCommasPipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'numberWithCommas'
        })
    ], NumberWithCommasPipe);
    return NumberWithCommasPipe;
}());

//# sourceMappingURL=number-with-commas.pipe.js.map

/***/ }),

/***/ "../../../../../src/app/pipes/thousand.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ThousandPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ThousandPipe = /** @class */ (function () {
    function ThousandPipe() {
    }
    ThousandPipe.prototype.transform = function (input, args) {
        var exp;
        var suffixes = ['K', 'M', 'B', 'T', 'P', 'E'];
        if (isNaN(input)) {
            return '$0';
        }
        if (input < 1000) {
            return '$' + input;
        }
        exp = Math.floor(Math.log(input) / Math.log(1000));
        return '$' + (input / Math.pow(1000, exp)).toFixed(2) + suffixes[exp - 1];
    };
    ThousandPipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'thousand'
        })
    ], ThousandPipe);
    return ThousandPipe;
}());

//# sourceMappingURL=thousand.pipe.js.map

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__http_interceptor__ = __webpack_require__("../../../../../src/app/services/http-interceptor.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__models_login_model__ = __webpack_require__("../../../../../src/app/models/login.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__fire_base_messaging_service__ = __webpack_require__("../../../../../src/app/fire-base/messaging.service.ts");
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











var AdminService = /** @class */ (function () {
    function AdminService(http, msg, loginModel, aclModel) {
        this.http = http;
        this.msg = msg;
        this.loginModel = loginModel;
        this.aclModel = aclModel;
        // private isUserLogin = false;
        this.baseUrl = __WEBPACK_IMPORTED_MODULE_6__environments_environment__["a" /* environment */].baseUrl;
        this.baseIP = __WEBPACK_IMPORTED_MODULE_6__environments_environment__["a" /* environment */].baseIP;
        this.deviceId = __WEBPACK_IMPORTED_MODULE_6__environments_environment__["a" /* environment */].deviceId;
        this.socketUrl = __WEBPACK_IMPORTED_MODULE_6__environments_environment__["a" /* environment */].socketUrl;
        this.permissions = {};
        this.admin_acl = {};
        this.admin_acl_array = [];
        this.login = new __WEBPACK_IMPORTED_MODULE_7_rxjs_BehaviorSubject__["BehaviorSubject"]({});
        this.loginData$ = this.login.asObservable();
        this.country = new __WEBPACK_IMPORTED_MODULE_7_rxjs_BehaviorSubject__["BehaviorSubject"]({});
        this.countryData$ = this.country.asObservable();
    }
    AdminService.prototype.getHeadersForLogin = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* Headers */]();
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
        headers.append('Authorization', 'Bearer ' + token);
        return headers;
    };
    AdminService.prototype.errorHandler = function (error) {
        // console.log('error handler');
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error || 'Server error');
        // return Observable.throw(error.json() || 'Server error');
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
        input.append('device_token', this.msg.fcmTokens ? this.msg.fcmTokens : '');
        input.append('device_id', this.deviceId);
        var tt = this.getCountryLocality('getCountryLocality');
        return this.http.post(this.baseUrl + 'login', input, { headers: headers })
            .map(function (response) {
            var r = response.json();
            localStorage.setItem('token', r.data.token);
            _this.login.next(r.data);
            _this.permissions = r.data.permissions;
            _this.admin_acl_array = r.data.m;
            var dd = r.data.m.map(function (obj, index) {
                var key = Object.keys(obj)[0];
                _this.admin_acl[key] = obj[key];
            });
            // console.log(this.admin_acl, this.permissions);
            // localStorage.setItem('permissions', r.data.permissions);
            // localStorage.setItem('admin_acl', this.admin_acl);
            return r;
        })
            .catch(this.errorHandler);
        // return new Promise((resolve: any, reject: any) => {
        //   this.http.post(this.baseUrl + 'login', input)
        //   .subscribe((response: any) => {
        //     const r = response.json();
        //     this.login.next(r.data);
        //     console.log('response', r.data);
        //     localStorage.setItem('token', r.data.token);
        //     resolve(response);
        //   }, (error: any) => {
        //     reject(error);
        //   });
        // });
    };
    AdminService.prototype.adminLogin1 = function (email, password) {
        var headers = this.getHeadersForLogin();
        var input = new FormData();
        input.append('email', email);
        input.append('password', password);
        var response1 = this.http.post(this.baseUrl + 'login', input, { headers: headers });
        var response2 = this.http.post(this.baseUrl + 'getCountryLocality', {}, { headers: headers });
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].forkJoin([response1, response2]);
    };
    AdminService.prototype.getCountryLocality = function (url) {
        var _this = this;
        var headers = this.getHeaders();
        var input = new FormData();
        return this.http.post(this.baseUrl + url, input, { headers: headers })
            .map(function (response) {
            // console.log('country', response);
            var r = response.json();
            _this.country.next(r.data);
            return r;
        })
            .catch(this.errorHandler);
    };
    AdminService.prototype.logoutApi = function () {
        var _this = this;
        var headers = this.getHeaders();
        return this.http.put(this.baseUrl + 'logout', { headers: headers })
            // .map(response => {response.json(); })
            .map(function (res) {
            _this.http.loader.next({ value: false });
            return res.json();
        })
            .catch(this.errorHandler);
    };
    AdminService.prototype.getDataApi = function (url) {
        var _this = this;
        var headers = this.getHeaders();
        return this.http.get(this.baseUrl + url, { headers: headers })
            // .map(response => response.json())
            .map(function (response) {
            var r = response.json();
            _this.login.next(r.data);
            _this.permissions = r.data.permissions;
            _this.admin_acl_array = r.data.m;
            var dd = r.data.m.map(function (obj, index) {
                var key = Object.keys(obj)[0];
                _this.admin_acl[key] = obj[key];
            });
            // console.log(this.admin_acl, this.permissions);
            return response.json();
        })
            .catch(this.errorHandler);
    };
    AdminService.prototype.getApi = function (url) {
        var headers = this.getHeaders();
        return this.http.get(this.baseUrl + url, { headers: headers })
            // .map(response => response.json())
            .map(function (res) {
            return res.json();
        })
            .catch(this.errorHandler);
    };
    AdminService.prototype.googleApi = function (url) {
        var headers = this.getHeaders();
        return this.http.get(url, { headers: headers })
            .map(function (res) {
            return res.json();
        })
            .catch(this.errorHandler);
    };
    AdminService.prototype.putDataApi = function (url, input) {
        var _this = this;
        var headers = this.getHeadersForMultipart();
        return this.http.put(this.baseUrl + url, input, { headers: headers })
            // .map(response => response.json())
            .map(function (res) {
            _this.http.loader.next({ value: false });
            return res.json();
        })
            .catch(this.errorHandler);
    };
    AdminService.prototype.postDataApi = function (url, input) {
        var _this = this;
        var headers = this.getHeadersForMultipart();
        return this.http.post(this.baseUrl + url, input, { headers: headers })
            .map(function (res) {
            _this.http.loader.next({ value: false });
            return res.json();
        })
            .catch(this.errorHandler);
    };
    AdminService.prototype.generalApi = function (url, input) {
        var _this = this;
        var headers = this.getHeadersForMultipart();
        return this.http.post(this.baseIP + url, input, { headers: headers })
            .map(function (res) {
            _this.http.loader.next({ value: false });
            return res.json();
        })
            .catch(this.errorHandler);
    };
    AdminService.prototype.deleteDataApi = function (url) {
        var _this = this;
        var headers = this.getHeaders();
        return this.http.delete(this.baseUrl + url, { headers: headers })
            // .map(response => response.json())
            .map(function (res) {
            _this.http.loader.next({ value: false });
            return res.json();
        })
            .catch(this.errorHandler);
    };
    AdminService.prototype.getDetails = function () {
        var _this = this;
        var headers = this.getHeadersForMultipart();
        return this.http.post(this.baseUrl + 'get-details', {}, { headers: headers })
            .map(function (response) {
            _this.http.loader.next({ value: false });
            var r = response.json();
            _this.login.next(r.data);
            _this.permissions = r.data.permissions ? r.data.permissions : {};
            var aclData = {};
            var dd = r.data.m.map(function (obj, index) {
                var key = Object.keys(obj)[0];
                _this.admin_acl[key] = obj[key];
            });
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of(true);
        })
            .catch(this.errorHandler);
    };
    AdminService.prototype.getInvoicePdf = function (url) {
        var _this = this;
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ responseType: __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* ResponseContentType */].Blob });
        return this.http.get(this.baseUrl + url, options)
            .map(function (response) {
            _this.http.loader.next({ value: false });
            return response.blob();
        })
            .catch(this.errorHandler);
    };
    var _a, _b, _c, _d;
    AdminService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_8__http_interceptor__["a" /* HttpInterceptor */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__http_interceptor__["a" /* HttpInterceptor */]) === "function" ? _a : Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_10__fire_base_messaging_service__["a" /* MessagingService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10__fire_base_messaging_service__["a" /* MessagingService */]) === "function" ? _b : Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_9__models_login_model__["a" /* Login */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__models_login_model__["a" /* Login */]) === "function" ? _c : Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_9__models_login_model__["b" /* AdminACL */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__models_login_model__["b" /* AdminACL */]) === "function" ? _d : Object])
    ], AdminService);
    return AdminService;
}());

//# sourceMappingURL=admin.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/common.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommonService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CommonService = /** @class */ (function () {
    function CommonService(admin, router) {
        this.admin = admin;
        this.router = router;
        this.data = {};
        this.country = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["BehaviorSubject"]({});
        this.countryData$ = this.country.asObservable();
        this.state = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["BehaviorSubject"]({});
        this.stateData$ = this.country.asObservable();
        this.city = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["BehaviorSubject"]({});
        this.cityData$ = this.country.asObservable();
        this.propertyDetails = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["BehaviorSubject"]({});
        this.propertyDetailsData$ = this.propertyDetails.asObservable();
        this.parameter = {};
    }
    CommonService.prototype.getCountries = function (keyword) {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'getCountries';
        var input = new FormData();
        if (keyword) {
            input.append('keyword', keyword);
        }
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            // console.log('countries', success);
            _this.parameter.loading = false;
            _this.country.next(success.data);
        }, function (error) {
            _this.parameter.loading = false;
            if (error.statusCode === 401) {
                _this.router.navigate(['']);
            }
            else {
                swal('Error', error.message, 'error');
            }
        });
    };
    CommonService.prototype.getStates = function (country_id, keyword) {
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
            // console.log('states', success);
            _this.parameter.loading = false;
            _this.state.next(success.data);
        }, function (error) {
            _this.parameter.loading = false;
            if (error.statusCode === 401) {
                _this.router.navigate(['']);
            }
            else {
                swal('Error', error.message, 'error');
            }
        });
    };
    CommonService.prototype.getCities = function (state_id, keyword) {
        var _this = this;
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
            // console.log('cities', success);
            _this.parameter.loading = false;
            _this.city.next(success.data);
        }, function (error) {
            _this.parameter.loading = false;
            if (error.statusCode === 401) {
                _this.router.navigate(['']);
            }
            else {
                swal('Error', error.message, 'error');
            }
        });
    };
    CommonService.prototype.saveImage = function (file) {
        var input = new FormData();
        input.append('image', file);
        return this.admin.postDataApi('saveImage', input);
    };
    CommonService.prototype.saveVideo = function (file, thumb) {
        var input = new FormData();
        input.append('video', file);
        input.append('thumb', thumb);
        return this.admin.postDataApi('saveVideo', input);
    };
    CommonService.prototype.saveAttachment = function (file) {
        var input = new FormData();
        input.append('attachment', file);
        return this.admin.postDataApi('saveAttachment', input);
    };
    CommonService.prototype.setPropertyDetails = function (data) {
        // console.log('data', data);
        this.propertyDetails.next(data);
    };
    CommonService.prototype.setData = function (object) {
        this.data = object;
    };
    CommonService.prototype.checkAccess = function (key, subkey) {
        console.log(key, subkey);
        var obj = this.admin.admin_acl[key];
        return obj ? obj[subkey] : 0;
    };
    var _a, _b;
    CommonService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__admin_service__["a" /* AdminService */]) === "function" ? _a : Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"]) === "function" ? _b : Object])
    ], CommonService);
    return CommonService;
}());

//# sourceMappingURL=common.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/http-interceptor.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_throw__ = __webpack_require__("../../../../rxjs/add/observable/throw.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpInterceptor; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
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



var HttpInterceptor = /** @class */ (function (_super) {
    __extends(HttpInterceptor, _super);
    function HttpInterceptor(backend, options, http, router) {
        var _this = _super.call(this, backend, options) || this;
        _this.http = http;
        _this.router = router;
        _this.parameter = {};
        _this.baseUrl = __WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].baseUrl;
        _this.baseIP = __WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].baseIP;
        _this.loader = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["BehaviorSubject"]({});
        _this.loaderValue$ = _this.loader.asObservable();
        _this.handleError = function (error) {
            console.log('=============', error);
            _this.loader.next({ value: false });
            var body = error['_body'];
            body = JSON.parse(body);
            swal('Error', body.message, 'error');
            if (body.message === 'Unauthenticated.') {
                _this.router.navigate(['']);
            }
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(body);
        };
        return _this;
    }
    HttpInterceptor.prototype.request = function (url, options) {
        if (url['url'] === this.baseUrl + 'conversation/sendMessage' ||
            url['url'] === this.baseUrl + 'getDocumentOptions' ||
            url['url'] === this.baseUrl + 'leads/getPrefOptions') {
            this.loader.next({ value: false });
        }
        else if (url['url'] === this.baseUrl + 'saveImage') {
            this.loader.next({ value: false });
        }
        else if (url['url'] === this.baseUrl + 'saveVideo') {
            this.loader.next({ value: false });
        }
        else if (url['url'] === this.baseUrl + 'saveAttachment') {
            this.loader.next({ value: false });
        }
        else {
            this.loader.next({ value: true });
        }
        return _super.prototype.request.call(this, url, options)
            .catch(this.handleError);
    };
    var _a, _b, _c, _d;
    HttpInterceptor = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_http__["c" /* XHRBackend */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_http__["c" /* XHRBackend */]) === "function" ? _a : Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]) === "function" ? _b : Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */]) === "function" ? _c : Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["Router"]) === "function" ? _d : Object])
    ], HttpInterceptor);
    return HttpInterceptor;
}(__WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */]));

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

var AppFooterComponent = /** @class */ (function () {
    function AppFooterComponent() {
    }
    AppFooterComponent.prototype.ngOnInit = function () {
    };
    AppFooterComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-footer',
            template: __webpack_require__("../../../../../src/app/shared/app-footer/app-footer.component.html"),
            styles: [__webpack_require__("../../../../../src/app/shared/app-footer/app-footer.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], AppFooterComponent);
    return AppFooterComponent;
}());

//# sourceMappingURL=app-footer.component.js.map

/***/ }),

/***/ "../../../../../src/app/shared/app-header/app-header.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.logout-btn{\n    cursor: pointer;\n}\n/* select::-ms-expand {\n    display: none;\n} */", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/app-header/app-header.component.html":
/***/ (function(module, exports) {

module.exports = "<header>\n  <div class=\"row\">\n    <!-- header -->\n      <div class=\"col-6\">\n        <a class=\"logo\">\n        <img class=\"app-logo\" src=\"assets/img/logo.png\" alt=\"img\">\n        </a>\n      </div>\n      <div class=\"col-4\">\n        <div class=\"user-profile notification float-right\">\n            <a class=\"count-info bell cursor-pointer\" (click)=\"viewNotification()\">\n                <i class=\"fa fa-bell\"></i>\n                <span *ngIf=\"msg_count!=0\" class=\"label label-warning\">{{msg_count}}</span>\n            </a>\n            <!-- <a (click)=\"viewNotification()\" class=\"dropdown-toggle count-info bell\" data-toggle=\"dropdown\" href=\"#\" aria-expanded=\"true\">\n                <i class=\"fa fa-bell\"></i>\n                <span *ngIf=\"msg_count!=0\" class=\"label label-warning\">{{msg_count}}</span>\n            </a> -->\n            <!-- <ul class=\"dropdown-menu dropdown-menu-left dropdown-messages\">\n                <li *ngFor=\"let noti of parameter.items; let i=index\">\n                    <div *ngIf=\"i<5\" class=\"dropdown-messages-box\">\n                        <div class=\"media-body\">\n                            <strong>{{noti.notification_desc}}</strong><br>\n                            {{noti.notification_text}}\n                            <br>\n                            <small class=\"text-muted\">{{noti.updated_at | moment}}</small>\n                        </div>\n                    </div>\n                </li>\n                <li class=\"divider\"></li>\n                <li *ngIf=\"parameter?.items?.length > 5\">\n                    <div class=\"text-center link-block\">\n                        <a routerLink=\"/dashboard/notifications\">\n                            <i class=\"fa fa-bell\"></i> \n                            <strong>Read All</strong>\n                        </a>\n                    </div>\n                </li>\n            </ul> -->\n        </div>\n      </div>\n      <div class=\"col-2\">\n        <div class=\"user-profile float-right\">\n           <!-- <a href=\"javascript://\">\n              <h4>{{fullName}}</h4>\n              <img (click)=\"onLoggedout()\" class=\"rounded-circle\" [src]=\"image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\">\n           </a> -->\n           <a class=\"dropdown-toggle count-info color-white animation\" data-toggle=\"dropdown\" href=\"#\" aria-expanded=\"true\">\n              <h4>{{fullName}}</h4>\n              <img class=\"rounded-circle\" [src]=\"image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\">\n          </a>\n          <ul class=\"dropdown-menu animated slideInDown\">\n            <li><a class=\"dropdown-item\" routerLink=\"/dashboard/settings/view-profile\"><i class=\"ti-user\"></i>Profile</a></li>\n            <li><a class=\"dropdown-item\" routerLink=\"/dashboard/settings/change-password\"><i class=\"ti-pencil\"></i>Change Password</a></li>\n            <!-- <li><a class=\"dropdown-item\" routerLink=\"/dashboard/settings/default-settings\"><i class=\"ti-settings\"></i>Default Settings</a></li> -->\n            <li class=\"dropdown-divider\"></li>\n            <li><a class=\"dropdown-item cursor-pointer\" (click)=\"onLoggedout()\"><i class=\"ti-power-off\"></i>Logout</a></li>\n          </ul>\n        </div>\n      </div>\n      <!-- <header end -->\n\n\n      <!--slide menu start-->\n      <div id=\"side-menu-bar\" >\n          <div class=\"scrollbox\" malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\">\n            <nav class=\"navbar navbar-expand-md navbar-dark\">\n                <!-- Brand -->\n                <a class=\"navbar-brand\">\n                  <img class=\"app-logo\" src=\"assets/img/logo.png\" alt=\"img\">\n                </a>\n                <!-- Toggler/collapsibe Button -->\n\n                <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapsibleNavbar\">\n                  <span class=\"navbar-toggler-icon\"></span>\n                </button>\n\n                <!-- sidebar-collapse -->\n                <div class=\"collapse navbar-collapse\" id=\"collapsibleNavbar\">\n                  <ul class=\"navbar-nav\">\n                      <!-- <li class=\"nav-item\">\n                        <a class=\"nav-link\" routerLink=\"/\"><i><img src=\"assets/img/dashboard.png\"></i><span>Dashboard</span></a>\n                      </li> -->\n                      <!-- <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"javascript://\" routerLink=\"generate-thumb\"><i><img src=\"assets/img/graph.png\"></i><span>Thumb</span></a>\n                      </li> -->\n                      <!-- <li class=\"nav-item dropdown\" [routerLinkActive]=\"'active'\" appAclPermission>\n                         <a class=\"nav-link dropdown-toggle\" data-toggle=\"dropdown\" href=\"javascript://\">\n                         <i><img src=\"assets/img/user.png\"></i><span>Manage Inhouse User</span></a>\n                         <div  class=\"dropdown-menu\">\n                            <ul>\n                               <li appAclPermission [aclId]=\"adminACL.permission.data_collector_management\" [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" routerLink=\"view-inhouse-users/data-collectors\">Data Collector</a></li>\n                               <li appAclPermission [aclId]=\"adminACL.permission.seller_management\" [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"view-inhouse-users/csr-sellers\">CSR Seller</a></li>\n                               <li appAclPermission [aclId]=\"adminACL.permission.buyer_management\" [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"view-inhouse-users/csr-buyers\">CSR Buyer</a></li>\n                               <li appAclPermission [aclId]=\"adminACL.permission.broker_management\" [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"view-inhouse-users/inhouse-broker\">Inhouse Broker</a></li>\n                               <li appAclPermission [aclId]=\"adminACL.permission.closer_management\" [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"view-inhouse-users/csr-closers\">CSR Closer</a></li>\n                            </ul>\n                         </div>\n                      </li>\n                      <li class=\"nav-item dropdown\" [routerLinkActive]=\"'active'\" appAclPermission>\n                        <a class=\"nav-link dropdown-toggle\" data-toggle=\"dropdown\" href=\"javascript://\">\n                        <i><img src=\"assets/img/stamp.png\"></i><span>Manage Notary</span></a>\n                        <div class=\"dropdown-menu\">\n                           <ul>\n                              <li appAclPermission [aclId]=\"adminACL.permission.notary_management\" [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" routerLink=\"notary/view-notary\">Notary</a></li>\n                              <li appAclPermission [aclId]=\"adminACL.permission.notary_lead_management\" [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" routerLink=\"notary/notary-leads\">Leads</a></li>\n                           </ul>\n                        </div>\n                     </li>\n                     <li class=\"nav-item dropdown\" [routerLinkActive]=\"'active'\" appAclPermission>\n                       <a class=\"nav-link dropdown-toggle\" data-toggle=\"dropdown\" href=\"javascript://\">\n                       <i><img src=\"assets/img/bank.png\"></i><span>Manage Banks</span></a>\n                       <div class=\"dropdown-menu\">\n                          <ul>\n                             <li appAclPermission [aclId]=\"adminACL.permission.bank_management\" [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" routerLink=\"banks/view-banks\">Banks</a></li>\n                          </ul>\n                       </div>\n                    </li>\n                      <li appAclPermission [aclId]=\"adminACL.permission.user_management\" class=\"nav-item\" [routerLinkActive]=\"'active'\">\n                        <a class=\"nav-link\" href=\"javascript://\" routerLink=\"users\"><i><img src=\"assets/img/users.png\"></i><span>Manage User</span></a>\n                      </li>\n                      <li appAclPermission [aclId]=\"adminACL.permission.manage_lead\" class=\"nav-item dropdown\" [routerLinkActive]=\"'active'\">\n                         <a class=\"nav-link dropdown-toggle\" data-toggle=\"dropdown\" href=\"javascript://\">\n                         <i><img src=\"assets/img/graph.png\"></i><span>Manage lead</span></a>\n                         <div class=\"dropdown-menu\">\n                            <ul>\n                               <li appAclPermission [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" routerLink=\"leads/data-collectors\">Data Collector</a></li>\n                               <li appAclPermission [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"leads/csr-sellers\">CSR Seller</a></li>\n                               <li appAclPermission [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"leads/csr-buyers\">CSR Buyer</a></li>\n                               <li appAclPermission [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"leads/inhouse-broker\">Inhouse Broker</a></li>\n                               <li appAclPermission [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"leads/csr-closers\">CSR Closer</a></li>\n                            </ul>\n                         </div>\n                      </li>\n                      <li appAclPermission class=\"nav-item\" [routerLinkActive]=\"'active'\">\n                        <a class=\"nav-link\" href=\"javascript://\" routerLink=\"projects/add-project\"><i><img src=\"assets/img/graph.png\"></i><span>Add Project</span></a>\n                      </li>\n                      <li appAclPermission class=\"nav-item\" [routerLinkActive]=\"'active'\">\n                        <a class=\"nav-link\" href=\"javascript://\" routerLink=\"properties/view-properties\"><i><img src=\"assets/img/graph.png\"></i><span>Magage Properties</span></a>\n                      </li>\n                      <li appAclPermission class=\"nav-item\" [routerLinkActive]=\"'active'\">\n                        <a class=\"nav-link\" href=\"javascript://\" routerLink=\"access-control-mgt\"><i><img src=\"assets/img/key.png\"></i><span>ACL</span></a>\n                      </li>\n                      <li appAclPermission class=\"nav-item dropdown\" [routerLinkActive]=\"'active'\">\n                          <a class=\"nav-link dropdown-toggle\" data-toggle=\"dropdown\" href=\"javascript://\">\n                          <i><img src=\"assets/img/graph2.png\"></i><span>Reports</span></a>\n                          <div class=\"dropdown-menu\">\n                             <ul>\n                                <li appAclPermission [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" routerLink=\"reports/seller\">Seller</a></li>\n                                <li appAclPermission [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"reports/buyer\">Buyer</a></li>\n                                <li appAclPermission [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"reports/notary\">Notary</a></li>\n                                <li appAclPermission [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"reports/bank\">Bank</a></li>\n                             </ul>\n                          </div>\n                       </li>\n                      <li appAclPermission class=\"nav-item\" [routerLinkActive]=\"'active'\">\n                        <a class=\"nav-link\" href=\"javascript://\" routerLink=\"manual-leads\"><i><img src=\"assets/img/graph.png\"></i><span>Manual Leads</span></a>\n                      </li>\n                      <li appAclPermission class=\"nav-item\" [routerLinkActive]=\"'active'\">\n                        <a class=\"nav-link\" href=\"javascript://\" routerLink=\"edit-template\"><i><img src=\"assets/img/users.png\"></i><span>Edit Template</span></a>\n                      </li>\n                      <li appAclPermission class=\"nav-item dropdown\" [routerLinkActive]=\"'active'\">\n                        <a class=\"nav-link dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\">\n                        <i><img src=\"assets/img/settings.png\"></i><span>Settings</span></a>\n                        <div class=\"dropdown-menu\">\n                          <ul>\n                            <li appAclPermission [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" routerLink=\"settings/setting-location\">Location</a></li>\n                            <li appAclPermission [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" routerLink=\"settings/setting-locality\">Locality</a></li>\n                            <li appAclPermission [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" routerLink=\"settings/setting-property\">Property</a></li>\n                            <li appAclPermission [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" routerLink=\"settings/setting-project\">Project</a></li>\n                            <li><a class=\"dropdown-item\" routerLink=\"settings/edit-profile\">Edit Profile</a></li>\n                            <li appAclPermission [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" routerLink=\"settings/documents-listing\">Documents Listing</a></li>\n                            <li appAclPermission [routerLinkActive]=\"'active'\"><a class=\"dropdown-item logout-btn\" (click)=\"onLoggedout()\">Logout</a></li>\n                          </ul>\n                        </div>\n                      </li> -->\n\n                      <!-- {{admin.admin_acl | json}} -->\n\n                      <!-- <li class=\"nav-item dropdown\" [routerLinkActive]=\"'active'\">\n                          <a class=\"nav-link dropdown-toggle\" data-toggle=\"dropdown\" href=\"javascript://\">\n                          <i><img src=\"assets/img/user.png\"></i><span>Manage Inhouse User</span></a>\n                          <div  class=\"dropdown-menu\">\n                             <ul>\n                                <li *ngIf=\"admin?.admin_acl['Data Collector Management']?.acl_id==7 && admin?.admin_acl['Data Collector Management']?.can_read==1\" [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" routerLink=\"view-inhouse-users/data-collectors\">Data Collector</a></li>\n                                <li *ngIf=\"admin?.admin_acl['Seller Management']?.acl_id==3 && admin?.admin_acl['Seller Management']?.can_read==1\" [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"view-inhouse-users/csr-sellers\">CSR Seller</a></li>\n                                <li *ngIf=\"admin?.admin_acl['Buyer Management']?.acl_id==15 && admin?.admin_acl['Buyer Management']?.can_read==1\" [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"view-inhouse-users/csr-buyers\">CSR Buyer</a></li>\n                                <li *ngIf=\"admin?.admin_acl['Broker Management']?.acl_id==2 && admin?.admin_acl['Broker Management']?.can_read==1\" [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"view-inhouse-users/inhouse-broker\">Inhouse Broker</a></li>\n                                <li *ngIf=\"admin?.admin_acl['Closer Management']?.acl_id==16 && admin?.admin_acl['Closer Management']?.can_read==1\" [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"view-inhouse-users/csr-closers\">CSR Closer</a></li>\n                             </ul>\n                          </div>\n                       </li>\n                       <li class=\"nav-item dropdown\" [routerLinkActive]=\"'active'\">\n                         <a class=\"nav-link dropdown-toggle\" data-toggle=\"dropdown\" href=\"javascript://\">\n                         <i><img src=\"assets/img/stamp.png\"></i><span>Manage Notary</span></a>\n                         <div class=\"dropdown-menu\">\n                            <ul>\n                               <li *ngIf=\"admin?.admin_acl['Noataries Management']?.acl_id==5 && admin?.admin_acl['Noataries Management']?.can_read==1\" [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" routerLink=\"notary/view-notary\">Notary</a></li>\n                               <li *ngIf=\"admin?.admin_acl['Notary Lead Management']?.acl_id==17 && admin?.admin_acl['Notary Lead Management']?.can_read==1\" [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" routerLink=\"notary/notary-leads\">Leads</a></li>\n                            </ul>\n                         </div>\n                      </li>\n                      <li *ngIf=\"admin?.admin_acl['Bank Management']?.acl_id==4 && admin?.admin_acl['Bank Management']?.can_read==1\" class=\"nav-item\" [routerLinkActive]=\"'active'\">\n                        <a class=\"nav-link\" href=\"javascript://\" routerLink=\"banks/view-banks\"><i><img src=\"assets/img/bank.png\"></i><span>Manage Banks</span></a>\n                      </li>\n                       <li *ngIf=\"admin?.admin_acl['User Management']?.acl_id==6 && admin?.admin_acl['User Management']?.can_read==1\" class=\"nav-item\" [routerLinkActive]=\"'active'\">\n                         <a class=\"nav-link\" href=\"javascript://\" routerLink=\"users\"><i><img src=\"assets/img/users.png\"></i><span>Manage Users</span></a>\n                       </li>\n                       <li class=\"nav-item dropdown\" [routerLinkActive]=\"'active'\">\n                          <a class=\"nav-link dropdown-toggle\" data-toggle=\"dropdown\" href=\"javascript://\">\n                          <i><img src=\"assets/img/graph.png\"></i><span>Manage lead</span></a>\n                          <div class=\"dropdown-menu\">\n                             <ul>\n                                <li *ngIf=\"admin?.admin_acl['Data Collector Lead Management']?.acl_id==18 && admin?.admin_acl['Data Collector Lead Management']?.can_read==1\" [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" routerLink=\"leads/data-collectors\">Data Collector</a></li>\n                                <li *ngIf=\"admin?.admin_acl['Seller Lead Management']?.acl_id==19 && admin?.admin_acl['Seller Lead Management']?.can_read==1\" [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"leads/csr-sellers\">CSR Seller</a></li>\n                                <li *ngIf=\"admin?.admin_acl['Buyer Lead Management']?.acl_id==20 && admin?.admin_acl['Buyer Lead Management']?.can_read==1\" [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"leads/csr-buyers\">CSR Buyer</a></li>\n                                <li *ngIf=\"admin?.admin_acl['Broker Lead Management']?.acl_id==21 && admin?.admin_acl['Broker Lead Management']?.can_read==1\" [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"leads/inhouse-broker\">Inhouse Broker</a></li>\n                                <li *ngIf=\"admin?.admin_acl['Closer Lead Management']?.acl_id==22 && admin?.admin_acl['Closer Lead Management']?.can_read==1\" [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"leads/csr-closers\">CSR Closer</a></li>\n                             </ul>\n                          </div>\n                       </li>\n                       <li *ngIf=\"admin?.admin_acl['Building Management']?.acl_id==10 && admin?.admin_acl['Building Management']?.can_read==1\" class=\"nav-item\" [routerLinkActive]=\"'active'\">\n                         <a class=\"nav-link\" href=\"javascript://\" routerLink=\"projects/add-project\"><i><img src=\"assets/img/graph.png\"></i><span>Manage Projects</span></a>\n                       </li>\n                       <li *ngIf=\"admin?.admin_acl['Property Management']?.acl_id==11 && admin?.admin_acl['Property Management']?.can_read==1\" class=\"nav-item\" [routerLinkActive]=\"'active'\">\n                         <a class=\"nav-link\" href=\"javascript://\" routerLink=\"properties/view-properties\"><i><img src=\"assets/img/graph.png\"></i><span>Magage Properties</span></a>\n                       </li>\n                       <li *ngIf=\"admin?.admin_acl['Access Controls']?.acl_id==14 && admin?.admin_acl['Access Controls']?.can_read==1\" class=\"nav-item\" [routerLinkActive]=\"'active'\">\n                         <a class=\"nav-link\" href=\"javascript://\" routerLink=\"access-control-mgt\"><i><img src=\"assets/img/key.png\"></i><span>ACL</span></a>\n                       </li>\n                       <li *ngIf=\"admin?.admin_acl['Reports']?.acl_id==23 && admin?.admin_acl['Reports']?.can_read==1\" class=\"nav-item dropdown\" [routerLinkActive]=\"'active'\">\n                           <a class=\"nav-link dropdown-toggle\" data-toggle=\"dropdown\" href=\"javascript://\">\n                           <i><img src=\"assets/img/graph2.png\"></i><span>Reports</span></a>\n                           <div class=\"dropdown-menu\">\n                              <ul>\n                                 <li [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" routerLink=\"reports/seller\">Seller</a></li>\n                                 <li [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"reports/buyer\">Buyer</a></li>\n                                 <li [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"reports/notary\">Notary</a></li>\n                                 <li [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"reports/bank\">Bank</a></li>\n                              </ul>\n                           </div>\n                        </li>\n                       <li *ngIf=\"admin?.admin_acl['Manual Leads']?.acl_id==24 && admin?.admin_acl['Manual Leads']?.can_read==1\" class=\"nav-item\" [routerLinkActive]=\"'active'\">\n                         <a class=\"nav-link\" href=\"javascript://\" routerLink=\"manual-leads\"><i><img src=\"assets/img/graph.png\"></i><span>Manual Leads</span></a>\n                       </li>\n                       <li *ngIf=\"admin?.admin_acl['Templates']?.acl_id==25 && admin?.admin_acl['Templates']?.can_read==1\" class=\"nav-item\" [routerLinkActive]=\"'active'\">\n                         <a class=\"nav-link\" href=\"javascript://\" routerLink=\"edit-template\"><i><img src=\"assets/img/users.png\"></i><span>Edit Template</span></a>\n                       </li>\n                       <li *ngIf=\"admin?.admin_acl['Settings']?.acl_id==26 && admin?.admin_acl['Settings']?.can_read==1\" class=\"nav-item dropdown\" [routerLinkActive]=\"'active'\">\n                         <a class=\"nav-link dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\">\n                         <i><img src=\"assets/img/settings.png\"></i><span>Settings</span></a>\n                         <div class=\"dropdown-menu\">\n                           <ul>\n                             <li [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" routerLink=\"settings/setting-location\">Location</a></li>\n                             <li [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" routerLink=\"settings/setting-locality\">Locality</a></li>\n                             <li [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" routerLink=\"settings/setting-property\">Property</a></li>\n                             <li [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" routerLink=\"settings/setting-project\">Project</a></li>\n                             <li><a class=\"dropdown-item\" routerLink=\"settings/edit-profile\">Edit Profile</a></li>\n                             <li [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" routerLink=\"settings/documents-listing\">Documents Listing</a></li>\n                             <li [routerLinkActive]=\"'active'\"><a class=\"dropdown-item logout-btn\" (click)=\"onLoggedout()\">Logout</a></li>\n                           </ul>\n                         </div>\n                       </li> -->\n\n\n                       <li *ngIf=\"admin?.admin_acl['Dashboard']?.can_read==1\" class=\"nav-item\"\n                        [routerLinkActive]=\"'active'\"\n                        [routerLinkActiveOptions]=\"{exact:true}\">\n                          <a class=\"nav-link\" href=\"javascript://\" routerLink=\"/dashboard\"><i><img src=\"assets/img/dashboard.png\"></i><span>Dashboard</span></a>\n                        </li>\n\n                       <li *ngIf=\"admin?.admin_acl['Data Collector Management']?.can_read==1 || admin?.admin_acl['Seller Management']?.can_read==1 ||\n                                  admin?.admin_acl['Buyer Management']?.can_read==1 || admin?.admin_acl['Broker Management']?.can_read==1 ||\n                                  admin?.admin_acl['Closer Management']?.can_read==1\" \n                          class=\"nav-item dropdown\" [routerLinkActive]=\"'active'\">\n                          <a class=\"nav-link dropdown-toggle\" data-toggle=\"dropdown\" href=\"javascript://\">\n                          <i><img src=\"assets/img/user.png\"></i><span>Manage Inhouse Users</span></a>\n                          <div  class=\"dropdown-menu\">\n                             <ul>\n                                <li *ngIf=\"admin?.admin_acl['Data Collector Management']?.can_read==1\" [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" routerLink=\"view-inhouse-users/data-collectors\">Data Collector</a></li>\n                                <li *ngIf=\"admin?.admin_acl['Seller Management']?.can_read==1\" [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"view-inhouse-users/csr-sellers\">CSR Seller</a></li>\n                                <li *ngIf=\"admin?.admin_acl['Buyer Management']?.can_read==1\" [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"view-inhouse-users/csr-buyers\">CSR Buyer</a></li>\n                                <li *ngIf=\"admin?.admin_acl['Broker Management']?.can_read==1\" [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"view-inhouse-users/inhouse-broker\">Inhouse Broker</a></li>\n                                <li *ngIf=\"admin?.admin_acl['Closer Management']?.can_read==1\" [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"view-inhouse-users/csr-closers\">CSR Closure</a></li>\n                             </ul>\n                          </div>\n                       </li>\n\n                       <li *ngIf=\"admin?.admin_acl['Noataries Management']?.can_read==1 ||\n                                  admin?.admin_acl['Notary Lead Management']?.can_read==1 ||\n                                  admin?.permissions?.can_noatary==1\" class=\"nav-item dropdown\" [routerLinkActive]=\"'active'\">\n                         <a class=\"nav-link dropdown-toggle\" data-toggle=\"dropdown\" href=\"javascript://\">\n                         <i><img src=\"assets/img/stamp.png\"></i><span>Manage Notaries</span></a>\n                         <div class=\"dropdown-menu\">\n                            <ul>\n                               <li *ngIf=\"admin?.admin_acl['Noataries Management']?.can_read==1\" [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" routerLink=\"notary/view-notary\">Notary</a></li>\n                               <li *ngIf=\"admin?.admin_acl['Notary Lead Management']?.can_read==1 || admin?.permissions?.can_noatary==1\" [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" routerLink=\"notary/notary-leads\">Leads</a></li>\n                            </ul>\n                         </div>\n                      </li>\n\n                      <li *ngIf=\"admin?.admin_acl['Bank Management']?.can_read==1 || \n                            admin?.admin_acl['Bank Lead Management']?.can_read==1 || \n                            admin?.permissions?.can_bank==1\" class=\"nav-item dropdown\" [routerLinkActive]=\"'active'\">\n                        <a class=\"nav-link dropdown-toggle\" data-toggle=\"dropdown\" href=\"javascript://\">\n                        <i><img src=\"assets/img/bank.png\"></i><span>Manage Banks</span></a>\n                        <div class=\"dropdown-menu\">\n                           <ul>\n                              <li *ngIf=\"admin?.admin_acl['Bank Management']?.can_read==1\" [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" routerLink=\"banks/view-banks\">Banks</a></li>\n                              <li *ngIf=\"admin?.admin_acl['Bank Lead Management']?.can_read==1 || admin?.permissions?.can_bank==1\" [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" routerLink=\"banks/bank-leads\">Leads</a></li>\n                           </ul>\n                        </div>\n                     </li>\n\n                      <li *ngIf=\"admin?.admin_acl['User Management']?.can_read==1\" class=\"nav-item\" [routerLinkActive]=\"'active'\">\n                        <a class=\"nav-link\" href=\"javascript://\" routerLink=\"users\"><i><img src=\"assets/img/users.png\"></i><span>Manage Users</span></a>\n                      </li>\n\n                      <li *ngIf=\"admin?.admin_acl['Data Collector Lead Management']?.can_read==1 || admin?.permissions?.can_data_collector==1 ||\n                                admin?.admin_acl['Seller Lead Management']?.can_read==1 || admin?.permissions?.can_csr_seller==1 ||\n                                admin?.admin_acl['Buyer Lead Management']?.can_read==1 || admin?.permissions?.can_csr_buyer==1 ||\n                                admin?.admin_acl['Broker Lead Management']?.can_read==1 || admin?.permissions?.can_in_house_broker==1 ||\n                                admin?.admin_acl['Closer Lead Management']?.can_read==1 || admin?.permissions?.can_csr_closer==1\"\n                        class=\"nav-item dropdown\" [routerLinkActive]=\"'active'\">\n                          <a class=\"nav-link dropdown-toggle\" data-toggle=\"dropdown\" href=\"javascript://\">\n                          <i><img src=\"assets/img/ic_leads.png\"></i><span>Manage Leads</span></a>\n                          <div class=\"dropdown-menu\">\n                             <ul>\n                                <li *ngIf=\"admin?.admin_acl['Data Collector Lead Management']?.can_read==1 || admin?.permissions?.can_data_collector==1\" [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" routerLink=\"leads/data-collectors\">Data Collector</a></li>\n                                <li *ngIf=\"admin?.admin_acl['Seller Lead Management']?.can_read==1 || admin?.permissions?.can_csr_seller==1\" [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"leads/csr-sellers\">CSR Seller</a></li>\n                                <li *ngIf=\"admin?.admin_acl['Buyer Lead Management']?.can_read==1 || admin?.permissions?.can_csr_buyer==1\" [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"leads/csr-buyers\">CSR Buyer</a></li>\n                                <li *ngIf=\"admin?.admin_acl['Broker Lead Management']?.can_read==1 || admin?.permissions?.can_in_house_broker==1\" [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"leads/inhouse-broker\">Inhouse Broker</a></li>\n                                <li *ngIf=\"admin?.admin_acl['Closer Lead Management']?.can_read==1 || admin?.permissions?.can_csr_closer==1\" [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"leads/csr-closers\">CSR Closure</a></li>\n                             </ul>\n                          </div>\n                       </li>\n                       <li *ngIf=\"admin?.admin_acl['Building Management']?.can_read==1\" class=\"nav-item\" [routerLinkActive]=\"'active'\">\n                         <a class=\"nav-link\" href=\"javascript://\" routerLink=\"projects/view-projects\"><i><img src=\"assets/img/ic_projects_manage.png\"></i><span>Manage Projects</span></a>\n                       </li>\n                       <li *ngIf=\"admin?.admin_acl['Property Management']?.can_read==1\" class=\"nav-item\" [routerLinkActive]=\"'active'\">\n                         <a class=\"nav-link\" href=\"javascript://\" routerLink=\"properties/view-properties\"><i><img src=\"assets/img/ic_properties_manage.png\"></i><span>Manage Properties</span></a>\n                       </li>\n                       <li *ngIf=\"admin?.admin_acl['Access Controls']?.can_read==1\" class=\"nav-item\" [routerLinkActive]=\"'active'\">\n                         <a class=\"nav-link\" href=\"javascript://\" routerLink=\"access-control-mgt\"><i><img src=\"assets/img/key.png\"></i><span>ACL</span></a>\n                       </li>\n                       <li *ngIf=\"admin?.admin_acl['Reports']?.can_read==1\" class=\"nav-item dropdown\" [routerLinkActive]=\"'active'\">\n                           <a class=\"nav-link dropdown-toggle\" data-toggle=\"dropdown\" href=\"javascript://\">\n                           <i><img src=\"assets/img/graph2.png\"></i><span>Reports</span></a>\n                           <div class=\"dropdown-menu\">\n                              <ul>\n                                 <li [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" routerLink=\"reports/seller\">Seller</a></li>\n                                 <li [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"reports/buyer\">Buyer</a></li>\n                                 <li [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"reports/notary\">Notary</a></li>\n                                 <li [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"reports/bank\">Bank</a></li>\n                              </ul>\n                           </div>\n                        </li>\n                       <li *ngIf=\"admin?.admin_acl['Manual Leads']?.can_read==1\" class=\"nav-item\" [routerLinkActive]=\"'active'\">\n                         <a class=\"nav-link\" href=\"javascript://\" routerLink=\"manual-leads/view-all\"><i><img src=\"assets/img/graph.png\"></i><span>Manual Leads</span></a>\n                       </li>\n                       <li *ngIf=\"admin?.admin_acl['Templates']?.can_read==1\" class=\"nav-item\" [routerLinkActive]=\"'active'\">\n                         <a class=\"nav-link\" href=\"javascript://\" routerLink=\"templates/view-all\"><i><img src=\"assets/img/users.png\"></i><span>Templates</span></a>\n                       </li>\n                       <li class=\"nav-item\" *ngIf=\"admin?.admin_acl['Appointments']?.can_read==1\" [routerLinkActive]=\"'active'\">\n                         <a class=\"nav-link\" href=\"javascript://\" routerLink=\"appointments\"><i><img src=\"assets/img/calender-icon.png\"></i><span>Appointments</span></a>\n                       </li>\n                       <li class=\"nav-item\" [routerLinkActive]=\"'active'\">\n                        <a class=\"nav-link\" href=\"javascript://\" routerLink=\"notifications\"><i><img src=\"assets/img/graph.png\"></i><span>Notifications</span></a>\n                      </li>\n                       <li *ngIf=\"admin?.admin_acl['Settings']?.can_read==1\" class=\"nav-item dropdown\" [routerLinkActive]=\"'active'\">\n                         <a class=\"nav-link dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\">\n                         <i><img src=\"assets/img/settings.png\"></i><span>Settings</span></a>\n                         <div class=\"dropdown-menu\">\n                           <ul>\n                             <li [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" routerLink=\"settings/setting-location\">Location</a></li>\n                             <li [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" routerLink=\"settings/setting-locality\">Locality</a></li>\n                             <li [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" routerLink=\"settings/setting-property\">Property</a></li>\n                             <li [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" routerLink=\"settings/setting-project\">Project</a></li>\n                             <li [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" routerLink=\"settings/default-settings\">Default Settings</a></li>\n                             <!-- <li><a class=\"dropdown-item\" routerLink=\"settings/edit-profile\">Edit Profile</a></li> -->\n                             <li [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" routerLink=\"settings/documents-listing\">Documents Listing</a></li>\n                             <li [routerLinkActive]=\"'active'\"><a class=\"dropdown-item logout-btn\" (click)=\"onLoggedout()\">Logout</a></li>\n                           </ul>\n                         </div>\n                       </li>\n                  </ul>\n                </div>\n            </nav>\n          </div>\n      </div>\n      <!--side menu end-->\n  </div>\n</header>\n\n\n<!-- \nyou are just perfect to me in many ways!\nand i wish God grace me with some of your rays!\nyou\n-->"

/***/ }),

/***/ "../../../../../src/app/shared/app-header/app-header.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
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




var AppHeaderComponent = /** @class */ (function () {
    function AppHeaderComponent(admin, router, constant) {
        var _this = this;
        this.admin = admin;
        this.router = router;
        this.constant = constant;
        this.parameter = {};
        this.msg_count = 0;
        this.scrollbarOptions = { axis: 'yx', theme: 'minimal-dark' };
        this.admin.loginData$.subscribe(function (success) {
            // console.log('success1', success);
            _this.fullName = success['name'];
            _this.image = success['image'];
        });
        // this.msg.currentMessage$.subscribe(r => {
        //   console.log('push', r);
        //   if ( r != null && r.data.notification_type !== 100) {
        //     /* count if not a push of chat messages */
        //     this.msg_count++;
        //   }
        // });
        console.log('msg_count', this.msg_count);
        this.getNotifications();
    }
    AppHeaderComponent.prototype.setData = function () {
        var _this = this;
        this.admin.postDataApi('get-details', {})
            .subscribe(function (success1) {
            _this.fullName = success1.data.name;
            _this.image = success1.data.image;
            var dd = success1.data.m.map(function (obj, index) {
                var key = Object.keys(obj)[0];
                _this.admin.admin_acl[key] = obj[key];
            });
        });
    };
    AppHeaderComponent.prototype.onLoggedout = function () {
        var _this = this;
        swal({
            title: 'Are you sure?',
            text: 'You want to logout?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Logout!'
        }).then(function (result) {
            if (result.value) {
                _this.logout();
            }
        });
    };
    AppHeaderComponent.prototype.logout = function () {
        var _this = this;
        this.parameter.loading = true;
        this.admin.postDataApi('logout', {}).subscribe(function (r) {
            _this.parameter.loading = false;
            if (r) {
                swal('Success', 'Logout successfully.', 'success');
                localStorage.removeItem('token');
                localStorage.removeItem('isLoggedin');
                localStorage.removeItem('permissions');
                localStorage.removeItem('admin_acl');
                _this.admin.admin_acl = {};
                _this.admin.admin_acl_array = [];
                _this.admin.permissions = {};
                _this.router.navigate(['']);
            }
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    AppHeaderComponent.prototype.getNotifications = function () {
        var _this = this;
        this.admin.postDataApi('getNotifications', {}).subscribe(function (r) {
            _this.parameter.items = r.data;
            // this.msg_count = r.total_count;
        });
    };
    AppHeaderComponent.prototype.viewNotification = function () {
        this.msg_count = 0;
        this.router.navigate(['/dashboard/notifications']);
    };
    var _a, _b, _c;
    AppHeaderComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-header',
            template: __webpack_require__("../../../../../src/app/shared/app-header/app-header.component.html"),
            styles: [__webpack_require__("../../../../../src/app/shared/app-header/app-header.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" ? _a : Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"]) === "function" ? _b : Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__common_constants__["a" /* Constant */]) === "function" ? _c : Object])
    ], AppHeaderComponent);
    return AppHeaderComponent;
}());

//# sourceMappingURL=app-header.component.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false,
    // baseIP: 'https://api.sozul.com/api/',
    // baseUrl: 'https://api.sozul.com/api/admin/',
    // baseIP: 'http://45.232.252.136:8002/',
    // baseUrl: 'http://45.232.252.136:8002/api/admin/',
    baseIP: 'https://api.sozul.com/',
    baseUrl: 'https://api.sozul.com/api/admin/',
    socketUrl: 'http://45.232.252.136:8080',
    deviceId: 'ADMIN',
    firebase: {
        apiKey: 'AIzaSyAZMJdN4-tFi3vkKLz-c-BoFHMq7eAkoAc',
        authDomain: 'nequore-user.firebaseapp.com',
        databaseURL: 'https://nequore-user.firebaseio.com',
        projectId: 'nequore-user',
        storageBucket: 'nequore-user.appspot.com',
        messagingSenderId: '1056655786619'
    }
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
    window.console.log = function () { };
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ "../../../../moment/locale recursive ^\\.\\/.*$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "../../../../moment/locale/af.js",
	"./af.js": "../../../../moment/locale/af.js",
	"./ar": "../../../../moment/locale/ar.js",
	"./ar-dz": "../../../../moment/locale/ar-dz.js",
	"./ar-dz.js": "../../../../moment/locale/ar-dz.js",
	"./ar-kw": "../../../../moment/locale/ar-kw.js",
	"./ar-kw.js": "../../../../moment/locale/ar-kw.js",
	"./ar-ly": "../../../../moment/locale/ar-ly.js",
	"./ar-ly.js": "../../../../moment/locale/ar-ly.js",
	"./ar-ma": "../../../../moment/locale/ar-ma.js",
	"./ar-ma.js": "../../../../moment/locale/ar-ma.js",
	"./ar-sa": "../../../../moment/locale/ar-sa.js",
	"./ar-sa.js": "../../../../moment/locale/ar-sa.js",
	"./ar-tn": "../../../../moment/locale/ar-tn.js",
	"./ar-tn.js": "../../../../moment/locale/ar-tn.js",
	"./ar.js": "../../../../moment/locale/ar.js",
	"./az": "../../../../moment/locale/az.js",
	"./az.js": "../../../../moment/locale/az.js",
	"./be": "../../../../moment/locale/be.js",
	"./be.js": "../../../../moment/locale/be.js",
	"./bg": "../../../../moment/locale/bg.js",
	"./bg.js": "../../../../moment/locale/bg.js",
	"./bm": "../../../../moment/locale/bm.js",
	"./bm.js": "../../../../moment/locale/bm.js",
	"./bn": "../../../../moment/locale/bn.js",
	"./bn.js": "../../../../moment/locale/bn.js",
	"./bo": "../../../../moment/locale/bo.js",
	"./bo.js": "../../../../moment/locale/bo.js",
	"./br": "../../../../moment/locale/br.js",
	"./br.js": "../../../../moment/locale/br.js",
	"./bs": "../../../../moment/locale/bs.js",
	"./bs.js": "../../../../moment/locale/bs.js",
	"./ca": "../../../../moment/locale/ca.js",
	"./ca.js": "../../../../moment/locale/ca.js",
	"./cs": "../../../../moment/locale/cs.js",
	"./cs.js": "../../../../moment/locale/cs.js",
	"./cv": "../../../../moment/locale/cv.js",
	"./cv.js": "../../../../moment/locale/cv.js",
	"./cy": "../../../../moment/locale/cy.js",
	"./cy.js": "../../../../moment/locale/cy.js",
	"./da": "../../../../moment/locale/da.js",
	"./da.js": "../../../../moment/locale/da.js",
	"./de": "../../../../moment/locale/de.js",
	"./de-at": "../../../../moment/locale/de-at.js",
	"./de-at.js": "../../../../moment/locale/de-at.js",
	"./de-ch": "../../../../moment/locale/de-ch.js",
	"./de-ch.js": "../../../../moment/locale/de-ch.js",
	"./de.js": "../../../../moment/locale/de.js",
	"./dv": "../../../../moment/locale/dv.js",
	"./dv.js": "../../../../moment/locale/dv.js",
	"./el": "../../../../moment/locale/el.js",
	"./el.js": "../../../../moment/locale/el.js",
	"./en-au": "../../../../moment/locale/en-au.js",
	"./en-au.js": "../../../../moment/locale/en-au.js",
	"./en-ca": "../../../../moment/locale/en-ca.js",
	"./en-ca.js": "../../../../moment/locale/en-ca.js",
	"./en-gb": "../../../../moment/locale/en-gb.js",
	"./en-gb.js": "../../../../moment/locale/en-gb.js",
	"./en-ie": "../../../../moment/locale/en-ie.js",
	"./en-ie.js": "../../../../moment/locale/en-ie.js",
	"./en-il": "../../../../moment/locale/en-il.js",
	"./en-il.js": "../../../../moment/locale/en-il.js",
	"./en-nz": "../../../../moment/locale/en-nz.js",
	"./en-nz.js": "../../../../moment/locale/en-nz.js",
	"./eo": "../../../../moment/locale/eo.js",
	"./eo.js": "../../../../moment/locale/eo.js",
	"./es": "../../../../moment/locale/es.js",
	"./es-do": "../../../../moment/locale/es-do.js",
	"./es-do.js": "../../../../moment/locale/es-do.js",
	"./es-us": "../../../../moment/locale/es-us.js",
	"./es-us.js": "../../../../moment/locale/es-us.js",
	"./es.js": "../../../../moment/locale/es.js",
	"./et": "../../../../moment/locale/et.js",
	"./et.js": "../../../../moment/locale/et.js",
	"./eu": "../../../../moment/locale/eu.js",
	"./eu.js": "../../../../moment/locale/eu.js",
	"./fa": "../../../../moment/locale/fa.js",
	"./fa.js": "../../../../moment/locale/fa.js",
	"./fi": "../../../../moment/locale/fi.js",
	"./fi.js": "../../../../moment/locale/fi.js",
	"./fo": "../../../../moment/locale/fo.js",
	"./fo.js": "../../../../moment/locale/fo.js",
	"./fr": "../../../../moment/locale/fr.js",
	"./fr-ca": "../../../../moment/locale/fr-ca.js",
	"./fr-ca.js": "../../../../moment/locale/fr-ca.js",
	"./fr-ch": "../../../../moment/locale/fr-ch.js",
	"./fr-ch.js": "../../../../moment/locale/fr-ch.js",
	"./fr.js": "../../../../moment/locale/fr.js",
	"./fy": "../../../../moment/locale/fy.js",
	"./fy.js": "../../../../moment/locale/fy.js",
	"./gd": "../../../../moment/locale/gd.js",
	"./gd.js": "../../../../moment/locale/gd.js",
	"./gl": "../../../../moment/locale/gl.js",
	"./gl.js": "../../../../moment/locale/gl.js",
	"./gom-latn": "../../../../moment/locale/gom-latn.js",
	"./gom-latn.js": "../../../../moment/locale/gom-latn.js",
	"./gu": "../../../../moment/locale/gu.js",
	"./gu.js": "../../../../moment/locale/gu.js",
	"./he": "../../../../moment/locale/he.js",
	"./he.js": "../../../../moment/locale/he.js",
	"./hi": "../../../../moment/locale/hi.js",
	"./hi.js": "../../../../moment/locale/hi.js",
	"./hr": "../../../../moment/locale/hr.js",
	"./hr.js": "../../../../moment/locale/hr.js",
	"./hu": "../../../../moment/locale/hu.js",
	"./hu.js": "../../../../moment/locale/hu.js",
	"./hy-am": "../../../../moment/locale/hy-am.js",
	"./hy-am.js": "../../../../moment/locale/hy-am.js",
	"./id": "../../../../moment/locale/id.js",
	"./id.js": "../../../../moment/locale/id.js",
	"./is": "../../../../moment/locale/is.js",
	"./is.js": "../../../../moment/locale/is.js",
	"./it": "../../../../moment/locale/it.js",
	"./it.js": "../../../../moment/locale/it.js",
	"./ja": "../../../../moment/locale/ja.js",
	"./ja.js": "../../../../moment/locale/ja.js",
	"./jv": "../../../../moment/locale/jv.js",
	"./jv.js": "../../../../moment/locale/jv.js",
	"./ka": "../../../../moment/locale/ka.js",
	"./ka.js": "../../../../moment/locale/ka.js",
	"./kk": "../../../../moment/locale/kk.js",
	"./kk.js": "../../../../moment/locale/kk.js",
	"./km": "../../../../moment/locale/km.js",
	"./km.js": "../../../../moment/locale/km.js",
	"./kn": "../../../../moment/locale/kn.js",
	"./kn.js": "../../../../moment/locale/kn.js",
	"./ko": "../../../../moment/locale/ko.js",
	"./ko.js": "../../../../moment/locale/ko.js",
	"./ky": "../../../../moment/locale/ky.js",
	"./ky.js": "../../../../moment/locale/ky.js",
	"./lb": "../../../../moment/locale/lb.js",
	"./lb.js": "../../../../moment/locale/lb.js",
	"./lo": "../../../../moment/locale/lo.js",
	"./lo.js": "../../../../moment/locale/lo.js",
	"./lt": "../../../../moment/locale/lt.js",
	"./lt.js": "../../../../moment/locale/lt.js",
	"./lv": "../../../../moment/locale/lv.js",
	"./lv.js": "../../../../moment/locale/lv.js",
	"./me": "../../../../moment/locale/me.js",
	"./me.js": "../../../../moment/locale/me.js",
	"./mi": "../../../../moment/locale/mi.js",
	"./mi.js": "../../../../moment/locale/mi.js",
	"./mk": "../../../../moment/locale/mk.js",
	"./mk.js": "../../../../moment/locale/mk.js",
	"./ml": "../../../../moment/locale/ml.js",
	"./ml.js": "../../../../moment/locale/ml.js",
	"./mn": "../../../../moment/locale/mn.js",
	"./mn.js": "../../../../moment/locale/mn.js",
	"./mr": "../../../../moment/locale/mr.js",
	"./mr.js": "../../../../moment/locale/mr.js",
	"./ms": "../../../../moment/locale/ms.js",
	"./ms-my": "../../../../moment/locale/ms-my.js",
	"./ms-my.js": "../../../../moment/locale/ms-my.js",
	"./ms.js": "../../../../moment/locale/ms.js",
	"./mt": "../../../../moment/locale/mt.js",
	"./mt.js": "../../../../moment/locale/mt.js",
	"./my": "../../../../moment/locale/my.js",
	"./my.js": "../../../../moment/locale/my.js",
	"./nb": "../../../../moment/locale/nb.js",
	"./nb.js": "../../../../moment/locale/nb.js",
	"./ne": "../../../../moment/locale/ne.js",
	"./ne.js": "../../../../moment/locale/ne.js",
	"./nl": "../../../../moment/locale/nl.js",
	"./nl-be": "../../../../moment/locale/nl-be.js",
	"./nl-be.js": "../../../../moment/locale/nl-be.js",
	"./nl.js": "../../../../moment/locale/nl.js",
	"./nn": "../../../../moment/locale/nn.js",
	"./nn.js": "../../../../moment/locale/nn.js",
	"./pa-in": "../../../../moment/locale/pa-in.js",
	"./pa-in.js": "../../../../moment/locale/pa-in.js",
	"./pl": "../../../../moment/locale/pl.js",
	"./pl.js": "../../../../moment/locale/pl.js",
	"./pt": "../../../../moment/locale/pt.js",
	"./pt-br": "../../../../moment/locale/pt-br.js",
	"./pt-br.js": "../../../../moment/locale/pt-br.js",
	"./pt.js": "../../../../moment/locale/pt.js",
	"./ro": "../../../../moment/locale/ro.js",
	"./ro.js": "../../../../moment/locale/ro.js",
	"./ru": "../../../../moment/locale/ru.js",
	"./ru.js": "../../../../moment/locale/ru.js",
	"./sd": "../../../../moment/locale/sd.js",
	"./sd.js": "../../../../moment/locale/sd.js",
	"./se": "../../../../moment/locale/se.js",
	"./se.js": "../../../../moment/locale/se.js",
	"./si": "../../../../moment/locale/si.js",
	"./si.js": "../../../../moment/locale/si.js",
	"./sk": "../../../../moment/locale/sk.js",
	"./sk.js": "../../../../moment/locale/sk.js",
	"./sl": "../../../../moment/locale/sl.js",
	"./sl.js": "../../../../moment/locale/sl.js",
	"./sq": "../../../../moment/locale/sq.js",
	"./sq.js": "../../../../moment/locale/sq.js",
	"./sr": "../../../../moment/locale/sr.js",
	"./sr-cyrl": "../../../../moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "../../../../moment/locale/sr-cyrl.js",
	"./sr.js": "../../../../moment/locale/sr.js",
	"./ss": "../../../../moment/locale/ss.js",
	"./ss.js": "../../../../moment/locale/ss.js",
	"./sv": "../../../../moment/locale/sv.js",
	"./sv.js": "../../../../moment/locale/sv.js",
	"./sw": "../../../../moment/locale/sw.js",
	"./sw.js": "../../../../moment/locale/sw.js",
	"./ta": "../../../../moment/locale/ta.js",
	"./ta.js": "../../../../moment/locale/ta.js",
	"./te": "../../../../moment/locale/te.js",
	"./te.js": "../../../../moment/locale/te.js",
	"./tet": "../../../../moment/locale/tet.js",
	"./tet.js": "../../../../moment/locale/tet.js",
	"./tg": "../../../../moment/locale/tg.js",
	"./tg.js": "../../../../moment/locale/tg.js",
	"./th": "../../../../moment/locale/th.js",
	"./th.js": "../../../../moment/locale/th.js",
	"./tl-ph": "../../../../moment/locale/tl-ph.js",
	"./tl-ph.js": "../../../../moment/locale/tl-ph.js",
	"./tlh": "../../../../moment/locale/tlh.js",
	"./tlh.js": "../../../../moment/locale/tlh.js",
	"./tr": "../../../../moment/locale/tr.js",
	"./tr.js": "../../../../moment/locale/tr.js",
	"./tzl": "../../../../moment/locale/tzl.js",
	"./tzl.js": "../../../../moment/locale/tzl.js",
	"./tzm": "../../../../moment/locale/tzm.js",
	"./tzm-latn": "../../../../moment/locale/tzm-latn.js",
	"./tzm-latn.js": "../../../../moment/locale/tzm-latn.js",
	"./tzm.js": "../../../../moment/locale/tzm.js",
	"./ug-cn": "../../../../moment/locale/ug-cn.js",
	"./ug-cn.js": "../../../../moment/locale/ug-cn.js",
	"./uk": "../../../../moment/locale/uk.js",
	"./uk.js": "../../../../moment/locale/uk.js",
	"./ur": "../../../../moment/locale/ur.js",
	"./ur.js": "../../../../moment/locale/ur.js",
	"./uz": "../../../../moment/locale/uz.js",
	"./uz-latn": "../../../../moment/locale/uz-latn.js",
	"./uz-latn.js": "../../../../moment/locale/uz-latn.js",
	"./uz.js": "../../../../moment/locale/uz.js",
	"./vi": "../../../../moment/locale/vi.js",
	"./vi.js": "../../../../moment/locale/vi.js",
	"./x-pseudo": "../../../../moment/locale/x-pseudo.js",
	"./x-pseudo.js": "../../../../moment/locale/x-pseudo.js",
	"./yo": "../../../../moment/locale/yo.js",
	"./yo.js": "../../../../moment/locale/yo.js",
	"./zh-cn": "../../../../moment/locale/zh-cn.js",
	"./zh-cn.js": "../../../../moment/locale/zh-cn.js",
	"./zh-hk": "../../../../moment/locale/zh-hk.js",
	"./zh-hk.js": "../../../../moment/locale/zh-hk.js",
	"./zh-tw": "../../../../moment/locale/zh-tw.js",
	"./zh-tw.js": "../../../../moment/locale/zh-tw.js"
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
webpackContext.id = "../../../../moment/locale recursive ^\\.\\/.*$";

/***/ }),

/***/ 0:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[1]);
//# sourceMappingURL=main.bundle.js.map