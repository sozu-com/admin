webpackJsonp([12],{

/***/ "../../../../../src async recursive":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./acl/acl.module": [
		"../../../../../src/app/layout/acl/acl.module.ts",
		8
	],
	"./banks/banks.module": [
		"../../../../../src/app/layout/banks/banks.module.ts",
		7
	],
	"./layout/layout.module": [
		"../../../../../src/app/layout/layout.module.ts"
	],
	"./leads/leads.module": [
		"../../../../../src/app/layout/leads/leads.module.ts",
		1,
		0
	],
	"./manual-leads/manual-leads.module": [
		"../../../../../src/app/layout/manual-leads/manual-leads.module.ts",
		10,
		0
	],
	"./notary/notary.module": [
		"../../../../../src/app/layout/notary/notary.module.ts",
		5,
		0
	],
	"./projects/projects.module": [
		"../../../../../src/app/layout/projects/projects.module.ts",
		6
	],
	"./properties/properties.module": [
		"../../../../../src/app/layout/properties/properties.module.ts",
		4,
		0
	],
	"./reports/reports.module": [
		"../../../../../src/app/layout/reports/reports.module.ts",
		3
	],
	"./settings/settings.module": [
		"../../../../../src/app/layout/settings/settings.module.ts",
		2
	],
	"./users/users.module": [
		"../../../../../src/app/layout/users/users.module.ts",
		9,
		0
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

module.exports = "<!-- <router-outlet></router-outlet> -->\n<!-- \n<div class=\"preloader-backdrop\" *ngIf=\"loading\">\n    <div class=\"page-preloader\">Loading</div>\n</div> -->\n<!-- <ngbox></ngbox> -->\n<ngx-loading [show]=\"loading\"></ngx-loading>\n<router-outlet></router-outlet>"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_http_interceptor__ = __webpack_require__("../../../../../src/app/services/http-interceptor.ts");
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
    function AppComponent(router, interceptor) {
        this.router = router;
        this.interceptor = interceptor;
        this.parameter = {};
        this.loading = false;
        this.router.events.subscribe(function (event) {
            if (event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* NavigationStart */]) {
                // this.parameter.loading = true;
            }
            if (event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* NavigationEnd */]) {
                // this.parameter.loading = false;
                window.scrollTo(0, 0);
            }
            if (event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["f" /* NavigationCancel */]) {
                // this.parameter.loading = false;
            }
            if (event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["g" /* NavigationError */]) {
                // this.parameter.loading = false;
            }
        });
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.interceptor.loaderValue$.subscribe(function (res) {
            setTimeout(function () {
                _this.loading = Object.keys(res).length !== 0 ? res['value'] : false;
                // if (res['value'] === true || res['value'] === false) {
                //   this.loading = res['value'];
                // } else {
                //   this.loading = false;
                // }
            }, 0);
        });
    };
    var _a, _b;
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" ? _a : Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_http_interceptor__["a" /* HttpInterceptor */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_http_interceptor__["a" /* HttpInterceptor */]) === "function" ? _b : Object])
    ], AppComponent);
    return AppComponent;
}());

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_tel_input__ = __webpack_require__("../../../../ng2-tel-input/ng2-tel-input.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_tel_input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_ng2_tel_input__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__toverux_ngx_sweetalert2__ = __webpack_require__("../../../../@toverux/ngx-sweetalert2/@toverux/ngx-sweetalert2.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ngx_malihu_scrollbar__ = __webpack_require__("../../../../ngx-malihu-scrollbar/dist/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__page_not_found_page_not_found_component__ = __webpack_require__("../../../../../src/app/page-not-found/page-not-found.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ngx_loading__ = __webpack_require__("../../../../ngx-loading/ngx-loading/ngx-loading.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__layout_layout_module__ = __webpack_require__("../../../../../src/app/layout/layout.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_http_interceptor__ = __webpack_require__("../../../../../src/app/services/http-interceptor.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__forgot_password_forgot_password_component__ = __webpack_require__("../../../../../src/app/forgot-password/forgot-password.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__login_login_component__ = __webpack_require__("../../../../../src/app/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__services_common_service__ = __webpack_require__("../../../../../src/app/services/common.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



















var appRoutes = [
    { path: '', pathMatch: 'full', component: __WEBPACK_IMPORTED_MODULE_16__login_login_component__["a" /* LoginComponent */] },
    { path: 'login', pathMatch: 'full', component: __WEBPACK_IMPORTED_MODULE_16__login_login_component__["a" /* LoginComponent */] },
    { path: 'forgot-password', component: __WEBPACK_IMPORTED_MODULE_15__forgot_password_forgot_password_component__["a" /* ForgotPasswordComponent */] },
    { path: 'dashboard', canActivate: [__WEBPACK_IMPORTED_MODULE_6__services_auth_guard__["a" /* AuthGuard */]], loadChildren: './layout/layout.module#LayoutModule' },
    { path: '**', component: __WEBPACK_IMPORTED_MODULE_11__page_not_found_page_not_found_component__["a" /* PageNotFoundComponent */] },
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_15__forgot_password_forgot_password_component__["a" /* ForgotPasswordComponent */],
                __WEBPACK_IMPORTED_MODULE_16__login_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_11__page_not_found_page_not_found_component__["a" /* PageNotFoundComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* RouterModule */].forRoot(appRoutes),
                __WEBPACK_IMPORTED_MODULE_8__toverux_ngx_sweetalert2__["a" /* SweetAlert2Module */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_13__layout_layout_module__["LayoutModule"],
                __WEBPACK_IMPORTED_MODULE_12_ngx_loading__["a" /* LoadingModule */].forRoot({
                    animationType: __WEBPACK_IMPORTED_MODULE_12_ngx_loading__["b" /* ANIMATION_TYPES */].rectangleBounce,
                    primaryColour: '#00B96F'
                }),
                __WEBPACK_IMPORTED_MODULE_9_ngx_malihu_scrollbar__["a" /* MalihuScrollbarModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_7_ng2_tel_input__["Ng2TelInputModule"],
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_4__services_admin_service__["a" /* AdminService */], __WEBPACK_IMPORTED_MODULE_17__services_common_service__["a" /* CommonService */], __WEBPACK_IMPORTED_MODULE_6__services_auth_guard__["a" /* AuthGuard */], __WEBPACK_IMPORTED_MODULE_14__services_http_interceptor__["a" /* HttpInterceptor */], __WEBPACK_IMPORTED_MODULE_18__common_constants__["a" /* Constant */],
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* AppComponent */]]
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
        this.itemsPerPage = 10;
        this.p = 1;
        this.country_code = 'mx';
        this.dial_code = '52';
        this.userPlaceholder = '../../../assets/img/default_usr.png';
        this.initialCountry = 'mx';
        this.minValue = 0;
        this.maxValue = 1000000000;
        this.fileSizeLimit = 25000000; // 25MB
        this.steps = 1000;
        this.phonePattern = '^[0-9]{5,15}$';
        this.emailPattern = '^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$';
        // public emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
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
            FILE_SIZE_EXCEEDS: 'Choosed file is more than 25MB.'
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

module.exports = "\n<section id=\"wrapper\">\n    <header>\n        <div class=\"row\">\n            <div class=\"col-6\">\n                <a class=\"logo\" href=\"\">\n                    <img class=\"app-logo\" src=\"assets/img/logo.png\" alt=\"img\">\n                </a>\n            </div>\n        </div>\n    </header>\n\n    <div class=\"login\">\n        <div class=\"container\">    \n            <div class=\"row\">\n                <div class=\"col-xl-8 col-lg-6 col-md-6 col-12\">\n                    <h2>One Easy Solution for Your Needs.</h2>\n                    <p class=\"p18\">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.</p>\n                </div>\n                <div class=\"col-xl-4 col-lg-6 col-md-6 col-12\">\n                    <form class=\"form-horizontal text-center\" #loginForm=\"ngForm\" role=\"form\" novalidate (ngSubmit)=\"forgotPassword(loginForm)\">\n                        <h3>Enter your email</h3>\n                        <p>Don't worry. Resetting your password is easy, just tell us the email\n                            address you registered with us.</p>\n                        <div class=\"form-group-3\">\n                            <input autocomplete=\"off\" [pattern]=\"constant.emailPattern\" class=\"form-control\" placeholder=\"Registered Email\" id=\"email\" required [(ngModel)]=\"model.email\" name=\"email\" #input1 #email=\"ngModel\">\n                            <div *ngIf=\"email.errors && (email.dirty || email.touched)\" class=\"show-error\">\n                                <div [hidden]=\"!email.errors.required\">\n                                    Please enter email.\n                                </div>\n                                <div [hidden]=\"!email.errors.pattern\">\n                                    Please enter valid email.\n                                </div>\n                            </div>\n                        </div>\n                        <a class=\"fgt-pswd\" href=\"/login\"> << Back to login.</a>\n                        <div class=\"btn-cont text-right\">\n                            <button type=\"submit\" [disabled]=\"loginForm.invalid\" class=\"btn btn-primary login-btn mgt-50\">SEND</button>\n                        </div>\n                        <!-- <button type=\"submit\" [disabled]=\"loginForm.invalid\" class=\"login-btn mgt-50\">SEND</button> -->\n                        <p class=\"text-center\">By login you are agree to <a href=\"javascript://\"> Terms & Condition </a>\n                            and <a href=\"javascript://\"> Privacy Policy</a> of Nequore.</p>\n                    </form>\n                </div>\n            </div>\n        </div>\n    </div>\n</section>"

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
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */]) === "function" ? _a : Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" ? _b : Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__common_constants__["a" /* Constant */]) === "function" ? _c : Object])
    ], ForgotPasswordComponent);
    return ForgotPasswordComponent;
}());

//# sourceMappingURL=forgot-password.component.js.map

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

module.exports = "<p>\n  dashboard\n</p>"

/***/ }),

/***/ "../../../../../src/app/layout/dashboard/dashboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
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
    function DashboardComponent() {
    }
    DashboardComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__("../../../../../src/app/layout/dashboard/dashboard.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/dashboard/dashboard.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], DashboardComponent);
    return DashboardComponent;
}());

//# sourceMappingURL=dashboard.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/edit-template/edit-template.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".save-btn{\n    margin-top: 20px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/edit-template/edit-template.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div [froalaEditor]=\"options\" [(froalaModel)]=\"editorContent\"></div>\n<!-- <img [froalaEditor] [(froalaModel)]=\"imgObj\"/> -->\n<!-- <div [froalaView]=\"editorContent\"></div> -->\n\n<div class=\"row save-btn\">\n    <div class=\"col-sm-12 col-lg-12\">\n        <button class=\"btn btn-default\" (click)=\"submitData()\">Click To Save</button>\n    </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/layout/edit-template/edit-template.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditTemplateComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EditTemplateComponent = /** @class */ (function () {
    function EditTemplateComponent(admin) {
        this.admin = admin;
        this.imageLink = {
            link: ''
        };
        this.editorContent = 'My Document\'s Title';
        // public imgObj: Object = {
        //   src: 'https://s3-us-west-2.amazonaws.com/testbagant/nequore/1533540803eRoUG6oE6q4noxtU10BqijCN6GJdBn.png'
        // };
        this.options = {
            charCounterCount: true,
            // Set the image upload parameter.
            imageUploadParam: 'image',
            // Set the image upload URL.
            imageUploadURL: this.admin.baseUrl + 'saveImage',
            // Additional upload params.
            // imageUploadParams: {id: 'my_editor'},
            // Set request type.
            imageUploadMethod: 'POST',
            // Set max image size to 5MB.
            // imageMaxSize: 5 * 1024 * 1024,
            // Allow to upload PNG and JPG.
            imageAllowedTypes: ['jpeg', 'jpg', 'png'],
            events: {
                'froalaEditor.initialized': function () {
                    console.log('initialized');
                },
                'froalaEditor.image.beforeUpload': function (e, editor, images) {
                    // Your code
                    if (images.length) {
                        console.log('image length');
                        // Create a File Reader.
                        var reader = new FileReader();
                        // Set the reader to insert images when they are loaded.
                        reader.onload = function (ev) {
                            var result = ev.target['result'];
                            var response = editor.image.insert(result, null, null, editor.image.get());
                            // console.log(ev,  editor.image);
                            console.log('result', result);
                            console.log('response', response);
                        };
                        // Read image as base64.
                        reader.readAsDataURL(images[0]);
                    }
                    // Stop default upload chain.
                    // return  false;
                },
                'froalaEditor.image.inserted': function (e, editor, file, response) {
                    console.log('inserted');
                    console.log('e', e);
                    console.log('editor', editor);
                    console.log('file', file);
                    console.log('response', response);
                },
                'froalaEditor.image.uploaded': function (e, editor, response) {
                    console.log('uploaded', JSON.parse(response));
                    response = JSON.parse(response);
                    this.imageLink = { link: response.data.image };
                    console.log('new response', this.imageLink);
                },
                'froalaEditor.image.error': function (e, editor, error, response) {
                    console.log('error');
                    console.log('e', e);
                    console.log('editor', editor);
                    console.log('error', error);
                    console.log('response', response);
                    swal('Error', error.message, 'error');
                    // if (error.code === 1) {
                    //   console.log('No link in upload response.');
                    //   swal('Error', 'No link in upload response.', 'error');
                    // }
                    // // No link in upload response.
                    // else if (error.code == 2) { console.log('no link'); }
                    // // Error during image upload.
                    // else if (error.code == 3) { ... }
                    // // Parsing response failed.
                    // else if (error.code == 4) { ... }
                    // // Image too text-large.
                    // else if (error.code == 5) { ... }
                    // // Invalid image type.
                    // else if (error.code == 6) { ... }
                    // // Image can be uploaded only to same domain in IE 8 and IE 9.
                    // else if (error.code == 7) { ... }
                }
            }
        };
    }
    EditTemplateComponent.prototype.ngOnInit = function () {
    };
    EditTemplateComponent.prototype.submitData = function () {
        console.log('Data - ', this.editorContent);
    };
    var _a;
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('edt'),
        __metadata("design:type", Object)
    ], EditTemplateComponent.prototype, "edt", void 0);
    EditTemplateComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-edit-template',
            template: __webpack_require__("../../../../../src/app/layout/edit-template/edit-template.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/edit-template/edit-template.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" ? _a : Object])
    ], EditTemplateComponent);
    return EditTemplateComponent;
}());

//# sourceMappingURL=edit-template.component.js.map

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

module.exports = "\n<div class=\"row\" *ngIf=\"address\">\n  <div class=\"col-sm-3 col-12\">\n    <div class=\"form-group-2\">\n      <label>Country</label>\n      <select [disabled]=\"status\" required title=\"Choose Country\" class=\"form-control\" (change)=\"getStatesNew($event.target.value, i)\">\n        <option value=\"\">Select Country</option>\n        <!-- <option *ngFor=\"let countryAdd of parameter.countriesAdd\" value=\"{{countryAdd.id}}\">{{countryAdd.name}}</option> -->\n        <option *ngFor=\"let countryAdd of parameter.countriesAdd\" [selected]=\"countryAdd.id == address.countries\" value=\"{{countryAdd.id}}\">{{countryAdd.name}}</option>\n        <!-- <option *ngIf=\"parameter?.countriesAdd?.length!=0\" value=\"0\">All</option> -->\n      </select>\n    </div>\n  </div>\n  <div class=\"col-sm-3 col-12\">\n    <div class=\"form-group-2\">\n      <label>State</label>\n      <select [disabled]=\"status\" required title=\"Choose State\" class=\"form-control\" (change)=\"getCitiesNew($event.target.value, i)\">\n        <option value=\"\">Select State</option>\n        <!-- <option *ngFor=\"let stateAdd of parameter.statesAdd\" value=\"{{stateAdd.id}}\">{{stateAdd.name}}</option> -->\n        <option *ngFor=\"let stateAdd of parameter.statesAdd\" [selected]=\"stateAdd.id == address.states\" value=\"{{stateAdd.id}}\">{{stateAdd.name}}</option>\n        <!-- <option *ngIf=\"parameter?.statesAdd?.length==0\" value=\"0\">All</option> -->\n      </select>\n    </div>\n  </div>\n  <div class=\"col-sm-3 col-12\">\n    <div class=\"form-group-2\">\n      <label>City</label>\n      <select [disabled]=\"status\" required title=\"Choose City\" class=\"form-control\" (change)=\"getLocalitiesNew($event.target.value, i)\">\n      <option value=\"\">Select City</option>\n      <option *ngFor=\"let cityAdd of parameter.citiesAdd\" [selected]=\"cityAdd.id == address.cities\" value=\"{{cityAdd.id}}\">{{cityAdd.name}}</option>\n      <!-- <option *ngIf=\"parameter?.citiesAdd?.length==0\" value=\"0\">All</option> -->\n      <!-- <option *ngFor=\"let cityAdd of parameter.citiesAdd\" value=\"{{cityAdd.id}}\">{{cityAdd.name}}</option> -->\n    </select>\n    </div>\n  </div>\n  <div class=\"col-sm-3 col-12\">\n    <div class=\"form-group-2\">\n      <label>Locality</label>\n      <select [disabled]=\"status\" required title=\"Choose Locality\" class=\"form-control\" (change)=\"getLocalityBuildings($event.target.value, i)\">\n      <option value=\"\">Select Locality</option>\n      <option *ngFor=\"let localityAdd of parameter.localitiesAdd\" [selected]=\"localityAdd.id == address.localities\" value=\"{{localityAdd.id}}\">{{localityAdd.name}}</option>\n      <!-- <option *ngIf=\"parameter?.citiesAdd?.length==0\" value=\"0\">All</option> -->\n      <!-- <option *ngFor=\"let cityAdd of parameter.citiesAdd\" value=\"{{cityAdd.id}}\">{{cityAdd.name}}</option> -->\n    </select>\n    </div>\n  </div>\n  <div class=\"col-sm-3 col-12\">\n    <div class=\"row\">\n      <div class=\"col-10\">\n      <div class=\"form-group-2\">\n        <label>Building</label>\n        <select [disabled]=\"status\" required title=\"Choose Building\" class=\"form-control\" (change)=\"setBuilding($event.target.value, i)\">\n          <option value=\"\">Select Building</option>\n          <!-- <option *ngFor=\"let localityAdd of parameter.localitiesAdd\" value=\"{{localityAdd.id}}\">{{localityAdd.name}}</option> -->\n          <option *ngFor=\"let buildingAdd of parameter.buildingsAdd\" [disabled]=\"buildingAdd.disabled\" [selected]=\"buildingAdd.id == address.buildings\" value=\"{{buildingAdd.id}}\">{{buildingAdd.name}}</option>\n          <!-- <option *ngIf=\"parameter?.localitiesAdd?.length==0\" value=\"0\">All</option> -->\n        </select>\n      </div>\n      </div>\n      <a href=\"javascript://\" (click)=\"removeRow()\" class=\"close\" *ngIf=\"index!=0\">\n        <img src=\"assets/img/close-tag.png\" alt=\"img\">\n      </a>\n    </div>\n  </div>\n</div>"

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
        // @Output() disabledLocality = new EventEmitter();
        this.disabledBuilding = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    AddressComponent.prototype.ngOnInit = function () {
        this.getCountriesNew(0);
        if (this.address && this.address.countries) {
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
        this.parameter.statesAdd = [];
        this.parameter.citiesAdd = [];
        this.parameter.localitiesAdd = [];
        this.parameter.buildingsAdd = [];
        this.parameter.url = 'getCountries';
        // const input = new FormData();
        this.admin.postDataApi(this.parameter.url, {})
            .subscribe(function (success) { _this.parameter.countriesAdd = success.data; });
    };
    AddressComponent.prototype.getStatesNew = function (country_id, index) {
        var _this = this;
        console.log('=====', country_id, index);
        this.parameter.citiesAdd = [];
        this.parameter.localitiesAdd = [];
        this.parameter.buildingsAdd = [];
        this.parameter.url = 'country/getStates';
        this.parameter.country_id = country_id;
        // const input = new FormData();
        // input.append('country_id', country_id);
        if (country_id !== '' && country_id !== '0') {
            this.admin.postDataApi(this.parameter.url, { country_id: country_id })
                .subscribe(function (success) {
                console.log('getStates', success);
                _this.parameter.statesAdd = success.data;
                _this.address.countries = country_id;
                _this.parameter.statesAdd.push({ id: '0', name: 'All', status: 1 });
                _this.parameter.citiesAdd.push({ id: '0', name: 'All', status: 1 });
                _this.parameter.localitiesAdd.push({ id: '0', name: 'All', status: 1 });
                _this.parameter.buildingsAdd.push({ id: '0', name: 'All', status: 1 });
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
    AddressComponent.prototype.getCitiesNew = function (state_id, index) {
        var _this = this;
        this.parameter.localitiesAdd = [];
        this.parameter.url = 'getCities';
        this.parameter.state_id = state_id;
        // const input = new FormData();
        // input.append('state_id', state_id);
        if (state_id !== '' && state_id !== '0') {
            this.admin.postDataApi(this.parameter.url, { state_id: state_id })
                .subscribe(function (success) {
                _this.parameter.citiesAdd = success.data;
                _this.parameter.citiesAdd.push({ id: '0', name: 'All', status: 1 });
                _this.parameter.localitiesAdd.push({ id: '0', name: 'All', status: 1 });
                _this.parameter.buildingsAdd.push({ id: '0', name: 'All', status: 1 });
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
    AddressComponent.prototype.getLocalitiesNew = function (city_id, index) {
        var _this = this;
        this.parameter.url = 'getLocalities';
        this.parameter.city_id = city_id;
        // const input = new FormData();
        // input.append('city_id', city_id);
        if (city_id !== '' && city_id !== '0') {
            this.admin.postDataApi(this.parameter.url, { city_id: city_id })
                .subscribe(function (success) {
                _this.parameter.localitiesAdd = success.data;
                _this.parameter.localitiesAdd.push({ id: '0', name: 'All', status: 1 });
                _this.parameter.buildingsAdd.push({ id: '0', name: 'All', status: 1 });
                _this.address.cities = city_id;
                _this.address.localities = '0';
                _this.address.buildings = '0';
                // for (let c = 0; c < this.parameter.localitiesAdd.length; c++) {
                //   this.parameter.localitiesAdd[c].disabled = false;
                //   for (let d = 0; d < this.disabledLocalities.length; d++) {
                //     if (this.disabledLocalities[d] === (this.parameter.localitiesAdd[c].id).toString()) {
                //       this.parameter.localitiesAdd[c].disabled = true;
                //     }
                //   }
                // }
            });
        }
        else {
            this.parameter.localitiesAdd = [];
            this.address.cities = city_id;
            this.address.localities = '0';
            this.address.buildings = '0';
        }
    };
    AddressComponent.prototype.getLocalityBuildings = function (locality_id, index) {
        var _this = this;
        this.parameter.url = 'getLocalityBuildings';
        this.parameter.locality_id = locality_id;
        this.admin.postDataApi(this.parameter.url, { locality_id: locality_id })
            .subscribe(function (success) {
            _this.parameter.buildingsAdd = success.data;
            _this.address.localities = locality_id;
            _this.address.buildings = '0';
            _this.parameter.buildingsAdd.push({ id: '0', name: 'All', status: 1 });
            for (var c = 0; c < _this.parameter.buildingsAdd.length; c++) {
                _this.parameter.buildingsAdd[c].disabled = false;
                for (var d = 0; d < _this.disabledBuildings.length; d++) {
                    if (_this.disabledBuildings[d] === (_this.parameter.buildingsAdd[c].id).toString()) {
                        _this.parameter.buildingsAdd[c].disabled = true;
                    }
                }
            }
        });
    };
    // setLocality(locality_id, index) {
    //   this.address.localities = locality_id;
    //   this.disabledLocality.emit(this.index);
    // }
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

module.exports = "\n<div class=\"container-fluid\">\n    <div class=\"row\">\n        <div class=\"col-md-6\">\n          <div class=\"title-group\">\n              <h5>{{title}}</h5>\n              <p>Showing {{parameter.items?.length}} out of {{parameter.total}}</p>\n          </div>\n        </div>\n        <div class=\"col-md-6\">\n          <div class=\"btn-cont text-right\">\n              <a class=\"btn\" href=\"javascript://\" style=\"display: none;\" data-toggle=\"modal\" data-target=\"#add\" #modalOpen>Add New</a>\n              <a class=\"btn btn-primary\" href=\"javascript://\" (click)=\"openAddModal()\">Add New</a>\n          </div>\n        </div>\n    </div>\n  \n    <!-- <ngx-loading [show]=\"parameter.loading\"></ngx-loading> -->\n<!--   \n    <div class=\"row\">\n        <div class=\"col-lg-2 col-md-3 col-sm-6 col-6\">\n          <div class=\"form-group marginB0\">\n              <label>Country</label>\n              <select title=\"Choose Country\" class=\"form-control\" (change)=\"getStates($event.target.value)\">\n                <option value=\"-1\">All</option>\n                <option *ngFor=\"let country of parameter.countries\" value=\"{{country.id}}\">{{country.name_en}}</option>\n              </select>\n          </div>\n        </div>\n        <div class=\"col-lg-2 col-md-3 col-sm-6 col-6\">\n          <div class=\"form-group marginB0\">\n              <label>State</label>\n              <select title=\"Choose State\" class=\"form-control\" (change)=\"getCities($event.target.value)\">\n                <option value=\"-1\">All</option>\n                <option *ngFor=\"let state of parameter.states\" value=\"{{state.id}}\">{{state.name_en}}</option>\n              </select>\n          </div>\n        </div>\n        <div class=\"col-lg-2 col-md-3 col-sm-6 col-6\">\n          <div class=\"form-group marginB0\">\n              <label>City</label>\n              <select title=\"Choose City\" class=\"form-control\" (change)=\"getLocalities($event.target.value)\">\n                <option value=\"-1\">All</option>\n                <option *ngFor=\"let city of parameter.cities\" value=\"{{city.id}}\">{{city.name_en}}</option>\n              </select>\n          </div>\n        </div>\n        <div class=\"col-lg-2 col-md-3 col-sm-6 col-6\">\n          <div class=\"form-group marginB0\">\n              <label>Locality</label>\n              <select title=\"Choose Locality\" class=\"form-control\" (change)=\"getLocalityBuildings($event.target.value)\">\n                <option value=\"-1\">All</option>\n                <option *ngFor=\"let locality of parameter.localities\" value=\"{{locality.id}}\">{{locality.name_en}}</option>\n              </select>\n          </div>\n        </div>\n        <div class=\"col-lg-2 col-md-3 col-sm-6 col-6\">\n          <div class=\"form-group marginB0\">\n              <label>Building</label>\n              <select title=\"Choose Building\" class=\"form-control\" (change)=\"setBuilding($event.target.value)\">\n                <option value=\"-1\">All</option>\n                <option *ngFor=\"let building of parameter.buildings\" value=\"{{building.id}}\">{{building.name}}</option>\n              </select>\n          </div>\n        </div>\n        <div class=\"col-lg-2 col-md-3 col-sm-6 col-6\">\n          <div class=\"form-group btn-cont text-right\">\n            <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n            <button (click)=\"getInhouseUsers()\" class=\"btn btn-primary\">Apply</button>\n          </div>\n        </div>\n    </div> -->\n\n\n    <div class=\"row\">\n      <div class=\"col-lg-2 col-md-3 col-sm-6 col-6\">\n        <div class=\"form-group marginB0\">\n            <label>Country</label>\n            <select title=\"Choose Country\" class=\"form-control\" (change)=\"getStates($event.target.value)\">\n              <option value=\"-1\">All</option>\n              <option *ngFor=\"let country of parameter.countries\" value=\"{{country.id}}\">{{country.name_en}}</option>\n            </select>\n        </div>\n      </div>\n      <div class=\"col-lg-2 col-md-3 col-sm-6 col-6\">\n        <div class=\"form-group marginB0\">\n            <label>State</label>\n            <select title=\"Choose State\" class=\"form-control\" (change)=\"getCities($event.target.value)\">\n              <option value=\"-1\">All</option>\n              <option *ngFor=\"let state of parameter.states\" value=\"{{state.id}}\">{{state.name_en}}</option>\n            </select>\n        </div>\n      </div>\n      <div class=\"col-lg-2 col-md-3 col-sm-6 col-6\">\n        <div class=\"form-group marginB0\">\n            <label>City</label>\n            <select title=\"Choose City\" class=\"form-control\" (change)=\"getLocalities($event.target.value)\">\n              <option value=\"-1\">All</option>\n              <option *ngFor=\"let city of parameter.cities\" value=\"{{city.id}}\">{{city.name_en}}</option>\n            </select>\n        </div>\n      </div>\n      <div class=\"col-lg-2 col-md-3 col-sm-6 col-6\">\n        <div class=\"form-group marginB0\">\n            <label>Locality</label>\n            <select title=\"Choose Locality\" class=\"form-control\" (change)=\"getLocalityBuildings($event.target.value)\">\n              <option value=\"-1\">All</option>\n              <option *ngFor=\"let locality of parameter.localities\" value=\"{{locality.id}}\">{{locality.name_en}}</option>\n            </select>\n        </div>\n      </div>\n      <div class=\"col-lg-2 col-md-3 col-sm-6 col-6\">\n        <div class=\"form-group marginB0\">\n            <label>Building</label>\n            <select title=\"Choose Building\" class=\"form-control\" (change)=\"setBuilding($event.target.value)\">\n              <option value=\"-1\">All</option>\n              <option *ngFor=\"let building of parameter.buildings\" value=\"{{building.id}}\">{{building.name}}</option>\n            </select>\n        </div>\n      </div>\n      <div class=\"col-lg-2 col-md-3 col-sm-6 col-6\">\n        <div class=\"form-group btn-cont text-right\">\n          <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n          <button (click)=\"getInhouseUsers()\" class=\"btn btn-primary\">Apply</button>\n        </div>\n      </div>\n  </div>\n    <hr>\n\n\n    \n    <div class=\"white-bg\">\n      <div class=\"tabel-section\">\n        <div class=\"table-responsive\">\n\n        <table class=\"table table-striped\">\n            <tr>\n            <th style=\"width:6%\">&nbsp;</th>\n                <th style=\"width:18%\">\n                  <div class=\"table-search\">\n                      <label>Name</label>\n                      <div class=\"searh-3\">\n                        <input type=\"text\" [(ngModel)]=\"parameter.name\" (keyup.enter)=\"searchUserByName(parameter.name)\" name=\"\">\n                        <button *ngIf=\"parameter.name\" (click)=\"searchUserByName(parameter.name)\"><i class=\"fa fa-search\"></i></button>\n                      </div>\n                  </div>\n                </th>\n                <th style=\"width:20%; text-align:left;\">\n                  <div class=\"table-search\">\n                      <label>Contact Number</label>\n                      <div class=\"searh-3\">\n                        <input type=\"text\" [(ngModel)]=\"parameter.phone\" (keyup.enter)=\"searchUserByPhone(parameter.phone)\" name=\"\">\n                        <button *ngIf=\"parameter.phone\" (click)=\"searchUserByPhone(parameter.phone)\"><i class=\"fa fa-search\"></i></button>\n                      </div>\n                  </div>\n                </th>\n                <th style=\"width:20%\">\n                  <div class=\"table-search\">\n                      <label>Email Address</label>\n                      <div class=\"searh-3\">\n                        <input type=\"text\" [(ngModel)]=\"parameter.email\" (keyup.enter)=\"searchUserByEmail(parameter.email)\" name=\"\">\n                        <button *ngIf=\"parameter.email\" (click)=\"searchUserByEmail(parameter.email)\"><i class=\"fa fa-search\"></i></button>\n                      </div>\n                  </div>\n                </th>\n                <th *ngIf=\"parameter.userType == 'inhouse-broker' || parameter.userType == 'csr-closers'\" style=\"width:8%; vertical-align: top;\">\n                  Leads<a href=\"javascript://\"><img src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n                </th>\n                <th *ngIf=\"parameter.userType == 'inhouse-broker' || parameter.userType == 'csr-closers'\" style=\"width:14%; vertical-align: top;\">\n                  Properties<a href=\"javascript://\"><img src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n                </th>\n                <th *ngIf=\"parameter.userType == 'data-collectors'\" style=\"width:22%; vertical-align: top;\">\n                  Building<a href=\"javascript://\"><img src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n                </th>\n                <th *ngIf=\"parameter.userType == 'csr-sellers' || parameter.userType == 'csr-buyers'\" style=\"width:22%; vertical-align: top;\">\n                  Leads<a href=\"javascript://\"><img src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n                </th>\n                <th style=\"width:14%\">\n                  &nbsp;\n                </th>\n            </tr>\n\n            <tr *ngFor=\"let item of parameter.items| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.p, totalItems: parameter.total }; let i = index\">\n              <td> \n                <img [src]=\"item.image\" class=\"rounded-circle\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\">\n                <!-- <img *ngIf=\"item.image\" class=\"rounded-circle\" [src]=\"item.image\" alt=\"img\">\n                <img *ngIf=\"!item.image\" class=\"rounded-circle\" src=\"assets/img/default_img.png\" alt=\"img\"> -->\n              </td>\n              <td class=\"text-left\">\n                <span class=\"name\">{{item.name}}</span>\n              </td>\n              <td class=\"text-left\" *ngIf=\"item.phone\">{{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}</td>\n              <td class=\"text-left\" *ngIf=\"!item.phone\">NA</td>\n              <td class=\"text-left\">{{item.email}}</td>\n              <td *ngIf=\"parameter.userType == 'inhouse-broker' || parameter.userType == 'csr-closers'; else showBuildings\">14</td>\n              <td *ngIf=\"parameter.userType == 'inhouse-broker' || parameter.userType == 'csr-closers'; else showBuildings\">14</td>\n              <td *ngIf=\"parameter.userType == 'data-collectors'\" >14</td>\n              <td *ngIf=\"parameter.userType == 'csr-sellers' || parameter.userType == 'csr-buyers'\" >14</td>\n              <td>\n                <a class=\"btn\" href=\"javascript://\" style=\"display: none;\" data-toggle=\"modal\" data-target=\"#view\" #viewModalOpen></a>\n                <a title=\"View Details\" href=\"javascript://\" (click)=\"viewDetails(item, i)\" class=\"icon-block edit-icon\"><img src=\"assets/img/eye-icon.png\" alt=\"img\"></a>\n                <a title=\"Edit Details\" href=\"javascript://\" (click)=\"editUser(item, i)\" class=\"icon-block edit-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></a>\n                <a href=\"javascript://\" *ngIf=\"item.is_blocked == 1\" (click)=\"blockUnblockPopup(i, item.id, 0, parameter.type)\" title=\"Unblock user\" class=\"icon-block block-icon unblock-bg\"><img src=\"assets/img/block.png\" alt=\"img\"></a>\n                <a href=\"javascript://\" *ngIf=\"item.is_blocked == 0\" (click)=\"blockUnblockPopup(i, item.id, 1, parameter.type)\" title=\"Block user\" class=\"icon-block block-icon\"><img src=\"assets/img/unblock.png\" alt=\"img\"></a>\n              </td>\n            </tr>\n          </table>\n        </div>\n      </div>\n\n      <div class=\"center\" *ngIf=\"parameter.total == 0\">\n        <img src=\"assets/img/404-error.png\">\n      </div>\n\n  </div>\n  <div class=\"btn-cont text-right marginT15\">\n  \n      <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n  </div>\n</div>\n\n\n\n<!-- add inhouse user modal -->\n<div class=\"modal animated\" id=\"add\">\n  <div class=\"modal-dialog fadeIndown modal-lg\">\n     <div class=\"modal-content\">\n        <div class=\"modal-header\">\n           <button type=\"button\" style=\"display: none;\" class=\"close\" data-dismiss=\"modal\" #modalClose>&times;</button>\n           <button type=\"button\" class=\"close\" (click)=\"closeModal()\">&times;</button>\n        </div>\n\n        <form class=\"form-horizontal form-model0P\" role=\"form\" ngNativeValidate #addForm=\"ngForm\" (ngSubmit)=\"addNewUser(addForm)\">\n        <div class=\"modal-body\">\n            <div class=\"row\">\n               <div class=\"col-6\">\n                  <div class=\"add-img\" style=\"background-size: cover;\" [style.background-image]=\"image1\">\n                  <input accept=\"image/*\" type=\"file\" name=\"\" (change)=\"onSelectFile1($event)\">\n                  <label *ngIf=\"!image1\">+ Add Image</label>\n                  </div>\n               </div>\n               <div class=\"col-6\">\n                  <div class=\"btn-cont text-right\">\n                     <button *ngIf=\"model.userModel.id==''\" type=\"submit\" [disabled]=\"addForm.invalid\" class=\"btn btn-primary\">ADD</button>\n                     <button *ngIf=\"model.userModel.id!=''\" type=\"submit\" [disabled]=\"addForm.invalid\" class=\"btn btn-primary\">UPDATE</button>\n                  </div>\n               </div>\n               <div class=\"col-12\">\n                  <div class=\"spacer40\"></div>\n               </div>\n               <div class=\"col-12\">\n                  <div class=\"form-group-2\">\n                     <label>Name</label>\n                     <div class=\"form-group\">\n                      <input autocomplete=\"off\" type=\"text\" class=\"form-control\" required [(ngModel)]=\"model.userModel.name\" name=\"name\">\n                    </div>\n                  </div>\n               </div>\n               <div class=\"col-12\">\n                  <div class=\"form-group-2\">\n                     <label>Contact number</label>\n                     <div class=\"form-group\">\n                      <input minlength=\"6\" maxlength=\"16\" autocomplete=\"off\" type=\"text\" \n                        [pattern]=\"constant.phonePattern\" class=\"form-control\" id=\"phone\" \n                        required minlength=\"1\" [(ngModel)]=\"model.userModel.phone\" name=\"phone\"\n                        ng2TelInput #phonetest\n                        (intlTelInputObject)=\"telInputObject($event)\"\n                        [ng2TelInputOptions]=\"initialCountry\" \n                        (countryChange)=\"onCountryChange($event)\" />\n                    </div>\n                  </div>\n               </div>\n               <div class=\"col-12\">\n                  <div class=\"form-group-2\">\n                     <label>Email ID</label>\n                     <div class=\"form-group\">\n                      <input autocomplete=\"off\" [pattern]=\"constant.emailPattern\" type=\"email\" class=\"form-control\" required [(ngModel)]=\"model.userModel.email\" name=\"email\">\n                    </div>\n                  </div>\n               </div>\n            </div>\n            \n            <div *ngFor=\"let add of model.address; let j=index\">\n              <app-address [address]=\"add\" [index]=\"j\" [status]=\"false\" [disabledBuildings]=\"disabledBuildings\" (disabledBuilding)=\"disabledBuildingId(j)\" (removeAddress)=\"removeAddressObj($event)\"></app-address>\n            </div>\n\n            <div class=\"col-12\" *ngIf=\"model.address?.length!=0\">\n                <div class=\"btn-cont center\">\n                  <button class=\"btn btn-primary margin0\" (click)=\"addEmptyObj()\">\n                    <img src=\"assets/img/add.png\" alt=\"img\">\n                  </button>\n                </div>\n             </div>\n            \n            <div class=\"access-controls\">\n               <label [ngClass]=\"{'access-control11': model.userModel.is_broker_seller_dev == true}\" class=\"cust-check-bx2\">CSR Broker/Seller/Developer\n                 <input type=\"checkbox\" name=\"is_broker_seller_dev\" [(ngModel)]=\"model.userModel.is_broker_seller_dev\">\n                 <span class=\"checkmark\"></span>\n               </label>\n \n               <label [ngClass]=\"{'access-control11': model.userModel.is_buyer_renter == true}\" class=\"cust-check-bx2\">CSR Buyer/Renter\n                 <input type=\"checkbox\" [(ngModel)]=\"model.userModel.is_buyer_renter\" name=\"is_buyer_renter\">\n                 <span class=\"checkmark\"></span>\n               </label>\n \n               <label [ngClass]=\"{'access-control11': model.userModel.is_broker == true}\" class=\"cust-check-bx2\">Broker\n                 <input type=\"checkbox\" [(ngModel)]=\"model.userModel.is_broker\" name=\"is_broker\">\n                 <span class=\"checkmark\"></span>\n               </label>\n \n               <label [ngClass]=\"{'access-control11': model.userModel.is_data_collector == true}\" class=\"cust-check-bx2\">Data Collector\n                 <input type=\"checkbox\" [(ngModel)]=\"model.userModel.is_data_collector\" name=\"is_data_collector\">\n                 <span class=\"checkmark\"></span>\n               </label>\n               <label [ngClass]=\"{'access-control11': model.userModel.is_csr_closer == true}\" class=\"cust-check-bx2\">CSR Closer\n                 <input type=\"checkbox\" [(ngModel)]=\"model.userModel.is_csr_closer\" name=\"is_csr_closer\">\n                 <span class=\"checkmark\"></span>\n               </label>\n            </div>\n         </div>\n        </form>\n\n     </div>\n  </div>\n</div>\n\n\n<!-- view inhouse user modal -->\n<div class=\"modal animated\" id=\"view\">\n  <div class=\"modal-dialog fadeIndown modal-lg\">\n     <div class=\"modal-content\">\n        <div class=\"modal-header\" style=\"padding: 5%; padding-bottom: 0;\">\n          <h4 class=\"modal-title\">{{title}}'s Details</h4>\n          <button type=\"button\" style=\"display: none;\" class=\"close\" data-dismiss=\"modal\" #viewModalClose>&times;</button>\n          <button type=\"button\" class=\"close\" (click)=\"closeViewModal()\">&times;</button>\n        </div>\n\n        <form class=\"form-horizontal form-model0P\" role=\"form\" ngNativeValidate #addForm=\"ngForm\" (ngSubmit)=\"addNewUser(addForm)\">\n        <div class=\"modal-body\">\n            <div *ngFor=\"let add of model.address; let j=index\">\n              <app-address [address]=\"add\" [index]=\"j\" [status]=\"true\" (removeAddress)=\"removeAddressObj($event)\"></app-address>\n            </div>\n\n            <div class=\"access-controls\">\n               <label [ngClass]=\"{'access-control11': model.userModel.is_broker_seller_dev == true}\" class=\"cust-check-bx2\">CSR Broker/Seller/Developer\n                 <input disabled type=\"checkbox\" name=\"is_broker_seller_dev\" [(ngModel)]=\"model.userModel.is_broker_seller_dev\">\n                 <span class=\"checkmark\"></span>\n               </label>\n \n               <label [ngClass]=\"{'access-control11': model.userModel.is_buyer_renter == true}\" class=\"cust-check-bx2\">CSR Buyer/Renter\n                 <input disabled type=\"checkbox\" [(ngModel)]=\"model.userModel.is_buyer_renter\" name=\"is_buyer_renter\">\n                 <span class=\"checkmark\"></span>\n               </label>\n \n               <label [ngClass]=\"{'access-control11': model.userModel.is_broker == true}\" class=\"cust-check-bx2\">Broker\n                 <input disabled type=\"checkbox\" [(ngModel)]=\"model.userModel.is_broker\" name=\"is_broker\">\n                 <span class=\"checkmark\"></span>\n               </label>\n \n               <label [ngClass]=\"{'access-control11': model.userModel.is_data_collector == true}\" class=\"cust-check-bx2\">Data Collector\n                 <input disabled type=\"checkbox\" [(ngModel)]=\"model.userModel.is_data_collector\" name=\"is_data_collector\">\n                 <span class=\"checkmark\"></span>\n               </label>\n               <label [ngClass]=\"{'access-control11': model.userModel.is_csr_closer == true}\" class=\"cust-check-bx2\">CSR Closer\n                 <input disabled type=\"checkbox\" [(ngModel)]=\"model.userModel.is_csr_closer\" name=\"is_csr_closer\">\n                 <span class=\"checkmark\"></span>\n               </label>\n            </div>\n         </div>\n        </form>\n\n     </div>\n  </div>\n</div>"

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
    function InhouseUsersComponent(constant, model, route, admin, router, sanitization) {
        var _this = this;
        this.constant = constant;
        this.model = model;
        this.route = route;
        this.admin = admin;
        this.router = router;
        this.sanitization = sanitization;
        this.parameter = {};
        this.addressIndex = 0;
        // disabledLocalities = [];
        this.disabledBuildings = [];
        this.seenDuplicate = false;
        this.testObject = [];
        this.admin.countryData$.subscribe(function (success) {
            _this.parameter.allCountry = success;
            console.log('allCountry', success);
        });
    }
    InhouseUsersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.model.userModel.country_code = this.constant.country_code;
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.p = this.constant.p;
        this.parameter.routeName = this.router.url;
        this.model.userModel.country_code = this.constant.country_code;
        this.tempAdd = this.model.address;
        this.parameter.sub = this.route.params.subscribe(function (params) {
            _this.parameter.userType = params['userType'];
            _this.parameter.name = '';
            _this.parameter.phone = '';
            _this.parameter.email = '';
            _this.parameter.items = [];
            _this.parameter.total = 0;
            _this.getInhouseUsers();
            _this.getCountries();
            _this.initialCountry = { initialCountry: _this.constant.initialCountry };
            // this.initialCountry = {initialCountry: 'in'};
        });
    };
    InhouseUsersComponent.prototype.getPage = function (page) {
        this.parameter.p = page;
        this.getInhouseUsers();
    };
    InhouseUsersComponent.prototype.closeModal = function () {
        this.modalClose.nativeElement.click();
        this.emptyModel();
        // this.model.userModel.country_code = this.constant.country_code;
        // this.model.address = [{
        //     countries: '',
        //     states : '',
        //     cities: '',
        //     localities: '',
        //     buildings: ''
        // }];
        // this.image1 = '';
        // this.model.userModel.id = '';
        // this.model.userModel.name = '';
        // this.model.userModel.email = '';
        // this.model.userModel.phone = '';
        // this.initialCountry = {initialCountry: this.constant.initialCountry};
        // this.model.userModel.is_broker_seller_dev = false;
        // this.model.userModel.is_buyer_renter = false;
        // this.model.userModel.is_broker = false;
        // this.model.userModel.is_data_collector = false;
        // this.model.userModel.is_csr_closer = false;
        // this.disabledLocalities = [];
    };
    InhouseUsersComponent.prototype.emptyModel = function () {
        this.model.userModel.country_code = this.constant.country_code;
        this.model.address = [{
                countries: '',
                states: '',
                cities: '',
                localities: '',
                buildings: ''
            }];
        this.image1 = '';
        this.model.userModel.id = '';
        this.model.userModel.name = '';
        this.model.userModel.email = '';
        this.model.userModel.phone = '';
        this.initialCountry = { initialCountry: this.constant.initialCountry };
        this.model.userModel.is_broker_seller_dev = false;
        this.model.userModel.is_buyer_renter = false;
        this.model.userModel.is_broker = false;
        this.model.userModel.is_data_collector = false;
        this.model.userModel.is_csr_closer = false;
        this.disabledBuildings = [];
    };
    InhouseUsersComponent.prototype.closeViewModal = function () {
        this.viewModalClose.nativeElement.click();
        this.emptyModel();
        // this.model.address = [{
        //     countries: '',
        //     states : '',
        //     cities: '',
        //     localities: '',
        //     buildings: ''
        // }];
        // this.disabledBuildings = [];
        // this.model.userModel.is_broker_seller_dev = false;
        // this.model.userModel.is_buyer_renter = false;
        // this.model.userModel.is_broker = false;
        // this.model.userModel.is_data_collector = false;
        // this.model.userModel.is_csr_closer = false;
    };
    InhouseUsersComponent.prototype.removeAddressObj = function (index) {
        this.addressIndex--;
        this.model.address.splice(index, 1);
        this.disabledBuildings.splice(index, 1);
    };
    InhouseUsersComponent.prototype.addEmptyObj = function () {
        if (this.model.address[this.addressIndex].countries !== '' && this.model.address[this.addressIndex].states !== '' &&
            this.model.address[this.addressIndex].cities !== '' && this.model.address[this.addressIndex].localities !== '') {
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
    // disabledLocalityId(i) {
    //   this.disabledLocalities[i] = this.model.address[i].localities;
    // }
    InhouseUsersComponent.prototype.disabledBuildingId = function (i) {
        this.disabledBuildings[i] = this.model.address[i].localities;
    };
    InhouseUsersComponent.prototype.onCountryChange = function (e) {
        this.model.userModel.country_code = e.iso2;
        this.model.userModel.dial_code = e.dialCode;
        this.initialCountry = { initialCountry: e.iso2 };
    };
    InhouseUsersComponent.prototype.openAddModal = function () {
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
            this.parameter.image = event.target.files[0];
            reader.onload = function (e) {
                _this.url = e.target.result;
                _this.image1 = _this.sanitization.bypassSecurityTrustStyle("url(" + _this.url + ")");
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };
    InhouseUsersComponent.prototype.addNewUser = function (formdata) {
        var _this = this;
        this.parameter.url = this.model.userModel.id !== '' ? 'updateNewUser' : 'addNewUser';
        var input = new FormData();
        if (this.model.userModel.id !== '') {
            input.append('id', this.model.userModel.id);
        }
        input.append('name', this.model.userModel.name);
        input.append('country_code', this.model.userModel.country_code);
        input.append('dial_code', '+' + this.model.userModel.dial_code);
        input.append('phone', this.model.userModel.phone);
        input.append('email', this.model.userModel.email);
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
            var value = item['localities'];
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
        console.log('address', this.model.address, this.seenDuplicate);
        if (this.model.address[0].countries === '' || this.model.address[0].states === '' ||
            this.model.address[0].cities === '' || this.model.address[0].localities === '') {
            swal('Error', 'Please choose location.', 'error');
            // this.parameter.loading = false;
        }
        else if (this.seenDuplicate) {
            this.testObject = [];
            // this.parameter.loading = false;
            this.seenDuplicate = false;
            swal('Error', 'Please choose different localities.', 'error');
        }
        else if (formdata.value.is_broker_seller_dev === false && formdata.value.is_buyer_renter === false &&
            formdata.value.is_broker === false && formdata.value.is_data_collector === false &&
            formdata.value.is_csr_closer === false) {
            swal('Error', 'Please choose a role for inhouse user.', 'error');
        }
        else {
            this.admin.postDataApi(this.parameter.url, input)
                .subscribe(function (success) {
                // this.parameter.loading = false;
                if (success.success === '0') {
                    swal('Error', success.message, 'error');
                }
                else {
                    _this.modalClose.nativeElement.click();
                    formdata.reset();
                    _this.model.userModel.country_code = _this.constant.country_code;
                    _this.initialCountry = { initialCountry: _this.constant.initialCountry };
                    _this.model.address = [{
                            countries: '',
                            states: '',
                            cities: '',
                            localities: '',
                            buildings: ''
                        }];
                    _this.disabledBuildings = [];
                    _this.image1 = '';
                    var text = _this.model.userModel.id === '' ? 'Added successfully.' : 'Updated successfully.';
                    swal('Success', text, 'success');
                    if ((formdata.value.is_broker_seller_dev === true && _this.parameter.userType === 'csr-sellers') ||
                        (formdata.value.is_buyer_renter === true && _this.parameter.userType === 'csr-buyers') ||
                        (formdata.value.is_broker === true && _this.parameter.userType === 'inhouse-broker') ||
                        (formdata.value.is_data_collector === true && _this.parameter.userType === 'data-collectors') ||
                        (formdata.value.is_csr_closer === true && _this.parameter.userType === 'csr-closers')) {
                        if (_this.model.userModel.id !== '') {
                            // edit -- replace
                            _this.parameter.items[_this.parameter.index] = success.data;
                        }
                        else {
                            // add - push
                            _this.parameter.items.push(success.data);
                        }
                    }
                }
            });
        }
    };
    InhouseUsersComponent.prototype.editUser = function (userdata, index) {
        this.parameter.index = index;
        this.model.address = [];
        this.model.userModel.id = userdata.id;
        this.modalOpen.nativeElement.click();
        this.model.userModel.name = userdata.name;
        this.model.userModel.email = userdata.email;
        this.model.userModel.phone = userdata.phone;
        this.model.userModel.country_code = userdata.country_code;
        this.model.userModel.image = userdata.image != null ? userdata.image : '';
        if (this.model.userModel.image) {
            this.image1 = this.sanitization.bypassSecurityTrustStyle("url(" + this.model.userModel.image + ")");
        }
        this.model.userModel.is_broker_seller_dev = userdata.permissions && userdata.permissions.can_csr_seller === 1 ? true : false;
        this.model.userModel.is_buyer_renter = userdata.permissions && userdata.permissions.can_csr_buyer === 1 ? true : true;
        this.model.userModel.is_broker = userdata.permissions && userdata.permissions.can_in_house_broker === 1 ? true : true;
        this.model.userModel.is_data_collector = userdata.permissions && userdata.permissions.can_data_collector === 1 ? true : false;
        this.model.userModel.is_csr_closer = userdata.permissions && userdata.permissions.can_csr_closer === 1 ? true : true;
        // userdata.countries = ['19', '19'];
        // userdata.states = ['4', '4'];
        // userdata.cities = ['4', '4'];
        // userdata.localities = ['3', '4'];
        for (var ind = 0; ind < userdata.countries.length; ind++) {
            var tempAdd = {
                countries: userdata.countries[ind].id,
                states: userdata.states[ind].id,
                cities: userdata.cities[ind].id,
                localities: userdata.localities[ind].id,
                buildings: userdata.buildings[ind].id
            };
            this.model.address[ind] = tempAdd;
        }
        // updateNewUser
    };
    InhouseUsersComponent.prototype.viewDetails = function (userdata, index) {
        this.model.address = [];
        this.viewModalOpen.nativeElement.click();
        this.model.userModel.is_broker_seller_dev = userdata.permissions && userdata.permissions.can_csr_seller === 1 ? true : false;
        this.model.userModel.is_buyer_renter = userdata.permissions && userdata.permissions.can_csr_buyer === 1 ? true : true;
        this.model.userModel.is_broker = userdata.permissions && userdata.permissions.can_in_house_broker === 1 ? true : true;
        this.model.userModel.is_data_collector = userdata.permissions && userdata.permissions.can_data_collector === 1 ? true : false;
        this.model.userModel.is_csr_closer = userdata.permissions && userdata.permissions.can_csr_closer === 1 ? true : true;
        for (var ind = 0; ind < userdata.countries.length; ind++) {
            var tempAdd = {
                countries: userdata.countries[ind].id,
                states: userdata.states[ind].id,
                cities: userdata.cities[ind].id,
                localities: userdata.localities[ind].id,
                buildings: userdata.buildings[ind].id
            };
            this.model.address[ind] = tempAdd;
        }
        // updateNewUser
    };
    InhouseUsersComponent.prototype.getCountries = function () {
        var _this = this;
        this.parameter.url = 'getCountries';
        var input = new FormData();
        this.parameter.states = [];
        this.parameter.cities = [];
        this.parameter.localities = [];
        this.parameter.buildings = [];
        this.parameter.state_id = '-1';
        this.parameter.city_id = '-1';
        this.parameter.locality_id = '-1';
        this.parameter.building_id = '-1';
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.parameter.countries = success.data;
        });
    };
    InhouseUsersComponent.prototype.getStates = function (country_id) {
        var _this = this;
        this.parameter.url = 'country/getStates';
        this.parameter.country_id = country_id;
        this.parameter.states = [];
        this.parameter.cities = [];
        this.parameter.localities = [];
        this.parameter.buildings = [];
        this.parameter.state_id = '-1';
        this.parameter.city_id = '-1';
        this.parameter.locality_id = '-1';
        this.parameter.building_id = '-1';
        var input = new FormData();
        input.append('country_id', country_id);
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.parameter.states = success.data;
        });
    };
    InhouseUsersComponent.prototype.getCities = function (state_id) {
        var _this = this;
        this.parameter.url = 'getCities';
        this.parameter.state_id = state_id;
        this.parameter.cities = [];
        this.parameter.localities = [];
        this.parameter.buildings = [];
        this.parameter.city_id = '-1';
        this.parameter.locality_id = '-1';
        this.parameter.building_id = '-1';
        var input = new FormData();
        input.append('state_id', state_id);
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.parameter.cities = success.data;
        });
    };
    InhouseUsersComponent.prototype.getLocalities = function (city_id) {
        var _this = this;
        this.parameter.url = 'getLocalities';
        this.parameter.city_id = city_id;
        this.parameter.localities = [];
        this.parameter.buildings = [];
        this.parameter.locality_id = '-1';
        this.parameter.building_id = '-1';
        var input = new FormData();
        input.append('city_id', city_id);
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.parameter.localities = success.data;
        });
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
                this.title = 'Inhouse Broker';
                this.parameter.type = 4;
                break;
            case 'csr-closers':
                this.parameter.url = 'getCsrClosers';
                this.title = 'CSR Closers';
                this.parameter.type = 5;
                break;
            default:
                this.parameter.url = 'getDataCollectors';
                this.parameter.type = 1;
                break;
        }
        var input = new FormData();
        input.append('page', this.parameter.p.toString());
        // input.append('page', '2');
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
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('data', success);
            _this.parameter.items = success.data;
            _this.parameter.total = success.total;
            // this.parameter.items.reverse();
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
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
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
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
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
            providers: [__WEBPACK_IMPORTED_MODULE_3__models_inhouse_users_model__["a" /* InhouseUsers */], __WEBPACK_IMPORTED_MODULE_4__common_constants__["a" /* Constant */], __WEBPACK_IMPORTED_MODULE_3__models_inhouse_users_model__["b" /* User */], __WEBPACK_IMPORTED_MODULE_3__models_inhouse_users_model__["c" /* Address */]]
        }),
        __metadata("design:paramtypes", [typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__common_constants__["a" /* Constant */]) === "function" ? _e : Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__models_inhouse_users_model__["a" /* InhouseUsers */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__models_inhouse_users_model__["a" /* InhouseUsers */]) === "function" ? _f : Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === "function" ? _g : Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" ? _h : Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" ? _j : Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__["c" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__["c" /* DomSanitizer */]) === "function" ? _k : Object])
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__settings_change_password_change_password_component__ = __webpack_require__("../../../../../src/app/layout/settings/change-password/change-password.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_auth_guard__ = __webpack_require__("../../../../../src/app/services/auth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__inhouse_users_inhouse_users_component__ = __webpack_require__("../../../../../src/app/layout/inhouse-users/inhouse-users.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__edit_template_edit_template_component__ = __webpack_require__("../../../../../src/app/layout/edit-template/edit-template.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__generate_thumb_generate_thumb_component__ = __webpack_require__("../../../../../src/app/layout/generate-thumb/generate-thumb.component.ts");
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
        path: 'dashboard', component: __WEBPACK_IMPORTED_MODULE_2__layout_component__["a" /* LayoutComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_5__services_auth_guard__["a" /* AuthGuard */]],
        children: [
            { path: '', component: __WEBPACK_IMPORTED_MODULE_3__dashboard_dashboard_component__["a" /* DashboardComponent */] },
            { path: 'view-inhouse-users/:userType', component: __WEBPACK_IMPORTED_MODULE_6__inhouse_users_inhouse_users_component__["a" /* InhouseUsersComponent */] },
            { path: 'change-password', component: __WEBPACK_IMPORTED_MODULE_4__settings_change_password_change_password_component__["a" /* ChangePasswordComponent */] },
            { path: 'notary', loadChildren: './notary/notary.module#NotaryModule' },
            { path: 'banks', loadChildren: './banks/banks.module#BanksModule' },
            { path: 'users', loadChildren: './users/users.module#UsersModule' },
            { path: 'leads', loadChildren: './leads/leads.module#LeadsModule' },
            { path: 'manual-leads', loadChildren: './manual-leads/manual-leads.module#ManualLeadsModule' },
            { path: 'edit-template', component: __WEBPACK_IMPORTED_MODULE_7__edit_template_edit_template_component__["a" /* EditTemplateComponent */] },
            { path: 'generate-thumb', component: __WEBPACK_IMPORTED_MODULE_8__generate_thumb_generate_thumb_component__["a" /* GenerateThumbComponent */] },
            { path: 'reports', loadChildren: './reports/reports.module#ReportsModule' },
            { path: 'access-control-mgt', loadChildren: './acl/acl.module#AclModule' },
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
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forChild(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]]
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

module.exports = "\n    <!-- <ngbox></ngbox> -->\n<section id=\"wrapper\">\n  <app-header></app-header>\n  <section id=\"main\">\n    <div id=\"content\">\n      <router-outlet></router-outlet>\n    </div>\n  </section>\n</section>\n"

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__layout_routing_module__ = __webpack_require__("../../../../../src/app/layout/layout-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__layout_component__ = __webpack_require__("../../../../../src/app/layout/layout.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__shared_app_header_app_header_component__ = __webpack_require__("../../../../../src/app/shared/app-header/app-header.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__dashboard_dashboard_component__ = __webpack_require__("../../../../../src/app/layout/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__shared_app_footer_app_footer_component__ = __webpack_require__("../../../../../src/app/shared/app-footer/app-footer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__settings_change_password_change_password_component__ = __webpack_require__("../../../../../src/app/layout/settings/change-password/change-password.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__inhouse_users_inhouse_users_component__ = __webpack_require__("../../../../../src/app/layout/inhouse-users/inhouse-users.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__inhouse_users_address_address_component__ = __webpack_require__("../../../../../src/app/layout/inhouse-users/address/address.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__edit_template_edit_template_component__ = __webpack_require__("../../../../../src/app/layout/edit-template/edit-template.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__services_common_service__ = __webpack_require__("../../../../../src/app/services/common.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__services_auth_guard__ = __webpack_require__("../../../../../src/app/services/auth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__services_http_interceptor__ = __webpack_require__("../../../../../src/app/services/http-interceptor.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__generate_thumb_generate_thumb_component__ = __webpack_require__("../../../../../src/app/layout/generate-thumb/generate-thumb.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutModule", function() { return LayoutModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





// import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';






// import { NgBoxModule } from 'ngbox/ngbox.module';
// import { NgBoxService } from 'ngbox/ngbox.service';
// importing shared components





// importing general component










// import { ViewedPropertyComponent } from './common-blocks/src/app/layout/common-blocks/viewed-property/viewed-property.component';
// import { FillInformationComponent } from './common-blocks/src/app/layout/common-blocks/fill-information/fill-information.component';
// import { NotesComponent } from './common-blocks/notes/notes.component';
var LayoutModule = /** @class */ (function () {
    function LayoutModule() {
    }
    LayoutModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["h" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_11__layout_routing_module__["a" /* LayoutRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["a" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["ReactiveFormsModule"],
                __WEBPACK_IMPORTED_MODULE_7_ngx_bootstrap_modal__["a" /* ModalModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_4_ngx_pagination__["a" /* NgxPaginationModule */],
                // LoadingModule.forRoot({
                //     animationType: ANIMATION_TYPES.rectangleBounce,
                //     primaryColour: '#00B96F'
                // }),
                __WEBPACK_IMPORTED_MODULE_5_ngx_mydatepicker__["NgxMyDatePickerModule"].forRoot(),
                __WEBPACK_IMPORTED_MODULE_6_ngx_malihu_scrollbar__["a" /* MalihuScrollbarModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_8__agm_core__["a" /* AgmCoreModule */].forRoot({
                    apiKey: 'AIzaSyCYv_zELZGVo2Ehzgp8eh8UeSIidhMCmH8',
                    libraries: ['drawing']
                }),
                __WEBPACK_IMPORTED_MODULE_9_ng2_tel_input__["Ng2TelInputModule"],
                __WEBPACK_IMPORTED_MODULE_10_angular_froala_wysiwyg__["a" /* FroalaEditorModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_10_angular_froala_wysiwyg__["b" /* FroalaViewModule */].forRoot(),
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_12__layout_component__["a" /* LayoutComponent */],
                __WEBPACK_IMPORTED_MODULE_13__shared_app_header_app_header_component__["a" /* AppHeaderComponent */],
                __WEBPACK_IMPORTED_MODULE_14__dashboard_dashboard_component__["a" /* DashboardComponent */],
                __WEBPACK_IMPORTED_MODULE_16__settings_change_password_change_password_component__["a" /* ChangePasswordComponent */],
                __WEBPACK_IMPORTED_MODULE_15__shared_app_footer_app_footer_component__["a" /* AppFooterComponent */],
                __WEBPACK_IMPORTED_MODULE_17__inhouse_users_inhouse_users_component__["a" /* InhouseUsersComponent */],
                __WEBPACK_IMPORTED_MODULE_18__inhouse_users_address_address_component__["a" /* AddressComponent */],
                __WEBPACK_IMPORTED_MODULE_19__edit_template_edit_template_component__["a" /* EditTemplateComponent */],
                __WEBPACK_IMPORTED_MODULE_25__generate_thumb_generate_thumb_component__["a" /* GenerateThumbComponent */],
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_20__services_admin_service__["a" /* AdminService */], __WEBPACK_IMPORTED_MODULE_21__services_common_service__["a" /* CommonService */], __WEBPACK_IMPORTED_MODULE_22__services_auth_guard__["a" /* AuthGuard */], __WEBPACK_IMPORTED_MODULE_24__services_http_interceptor__["a" /* HttpInterceptor */], __WEBPACK_IMPORTED_MODULE_23__common_constants__["a" /* Constant */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_12__layout_component__["a" /* LayoutComponent */]],
        })
    ], LayoutModule);
    return LayoutModule;
}());

//# sourceMappingURL=layout.module.js.map

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

module.exports = "\n<div class=\"page-heading\">\n    <div class=\"row\">\n        <div class=\"col-lg-6\">\n            <h1 class=\"page-title\">Settings</h1>\n            <ol class=\"breadcrumb\">\n                <a class=\"breadcrumb-item\">Home</a>\n                <!-- <li class=\"breadcrumb-item\"><a routerLink=\"/dashboard\">Home</a></li> -->\n                <li class=\"breadcrumb-item active\">Change Password</li>\n            </ol>\n        </div>\n    </div>\n</div>\n      \n      <div class=\"page-content fade-in-up\">\n        \n        <!-- <ngx-loading [show]=\"parameter.loading\"></ngx-loading> -->\n        \n        <div class=\"ibox\">\n          <div class=\"ibox-body\">\n            <form class=\"form-horizontal\" novalidate #addForm=\"ngForm\" (ngSubmit)=\"changePassword(addForm)\">\n              <ul class=\"nav nav-tabs tabs-line\" style=\"margin-bottom:30px;\">\n                <li class=\"nav-item\"><a class=\"nav-link active\" data-toggle=\"tab\">Change Password</a></li>\n              </ul>\n              <div class=\"tab-content\">\n                <div class=\"tab-pane fade active\">\n                \n                    <div class=\"form-group row\">\n                      <label class=\"col-sm-2 col-form-label\">Old Password:</label>\n\n                      <div class=\"col-sm-10\">\n                        <input autocomplete=\"off\" type=\"password\" class=\"form-control\" placeholder=\"Old Password\" minlength=\"6\" id=\"oldPassword\" required [(ngModel)]=\"model.oldPassword\" name=\"oldPassword\" #oldPassword=\"ngModel\">\n      \n                        <div *ngIf=\"oldPassword.errors && (oldPassword.dirty || oldPassword.touched)\" class=\"show-error\">\n                            <div [hidden]=\"!oldPassword.errors.required\">\n                                Old Password is required!\n                            </div>\n                            <div [hidden]=\"!oldPassword.errors.minlength\">\n                                Old Password's length must be at least {{6-model.oldPassword.length}}.\n                            </div>\n                        </div>\n                      </div>\n                  </div>\n\n                    <div class=\"form-group row\">\n                      <label class=\"col-sm-2 col-form-label\">New Password:</label>\n\n                      <div class=\"col-sm-10\">\n                        <input type=\"password\" class=\"form-control\" placeholder=\"New Password\" minlength=\"6\" id=\"newPassword\" required [(ngModel)]=\"model.newPassword\" name=\"newPassword\" #newPassword=\"ngModel\">\n      \n                        <div *ngIf=\"newPassword.errors && (newPassword.dirty || newPassword.touched)\" class=\"show-error\">\n                            <div [hidden]=\"!newPassword.errors.required\">\n                                New Password is required!\n                            </div>\n                            <div [hidden]=\"!newPassword.errors.minlength\">\n                                New Password's length must be at least {{6-model.newPassword.length}}.\n                            </div>\n                        </div>\n                      </div>\n                  </div>\n\n                  <div class=\"d-flex justify-content-end btn-right\">\n                    <button [disabled]=\"addForm.invalid\" class=\"btn btn-info\" type=\"submit\">Update Password</button>\n                  </div>\n                </div>\n      \n              </div>\n            </form>\n          </div>\n        </div>\n      </div>"

/***/ }),

/***/ "../../../../../src/app/layout/settings/change-password/change-password.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
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



var ChangePasswordComponent = /** @class */ (function () {
    function ChangePasswordComponent(router, admin) {
        this.router = router;
        this.admin = admin;
        this.parameter = {};
        this.model = {
            oldPassword: '',
            newPassword: ''
        };
    }
    ChangePasswordComponent.prototype.ngOnInit = function () { };
    ChangePasswordComponent.prototype.changePassword = function (formData) {
        var _this = this;
        // this.parameter.loading = true;
        this.parameter.url = 'changePassword';
        var input = new FormData();
        input.append('oldPassword', formData.value.oldPassword);
        input.append('newPassword', formData.value.newPassword);
        this.admin.putDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            // this.parameter.loading = false;
            swal('Success', 'Password is changed successfully!', 'success');
            // this.swal.success({
            //   title: 'Success',
            //   text: 'Password is changed successfully!'
            // });
            localStorage.removeItem('accessToken');
            localStorage.removeItem('countryCode');
            localStorage.removeItem('dialCode');
            localStorage.removeItem('helpAndSupportEmail');
            localStorage.removeItem('helpAndSupportPhone');
            _this.admin.unsetUserLoggedIn();
            _this.router.navigate(['']);
        }, function (error) {
            // this.parameter.loading = false;
            if (error.statusCode === 401) {
                _this.router.navigate(['']);
            }
            else {
                swal('Error', error.message, 'error');
                // this.swal.warning({ text: error.message });
            }
        });
    };
    var _a, _b;
    ChangePasswordComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-change-password',
            template: __webpack_require__("../../../../../src/app/layout/settings/change-password/change-password.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/settings/change-password/change-password.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" ? _a : Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */]) === "function" ? _b : Object])
    ], ChangePasswordComponent);
    return ChangePasswordComponent;
}());

//# sourceMappingURL=change-password.component.js.map

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

module.exports = "\n<section id=\"wrapper\">\n    <header>\n        <div class=\"row\">\n            <div class=\"col-6\">\n                <a class=\"logo\" href=\"\">\n                <img class=\"app-logo\" src=\"assets/img/logo.png\" alt=\"img\">\n                </a>\n            </div>\n        </div>\n    </header>\n    <ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n    <div class=\"login\">\n        <div class=\"container\">\n            <div class=\"row\">\n                <div class=\"col-xl-8 col-lg-6 col-md-6 col-12\">\n                    <h2>One Easy Solution for Your Needs.</h2>\n                    <p class=\"p18\">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.</p>\n                </div>\n                <div class=\"col-xl-4 col-lg-6 col-md-6 col-12\">\n                    <form class=\"form-horizontal text-center\" role=\"form\" novalidate #loginForm=\"ngForm\" (ngSubmit)=\"loginUser(loginForm)\">\n                        <h3>Login</h3>\n                        <div class=\"form-group-3\">\n                            <input autocomplete=\"off\" [pattern]=\"constant.emailPattern\" class=\"form-control\" placeholder=\"Username/Email\" id=\"email\" required [(ngModel)]=\"model.email\" name=\"email\" #input1 #email=\"ngModel\">\n                            <div *ngIf=\"email.errors && (email.dirty || email.touched)\" class=\"show-error\">\n                                <div [hidden]=\"!email.errors.required\">\n                                    Please enter email.\n                                </div>\n                                <div [hidden]=\"!email.errors.pattern\">\n                                    Please enter valid email.\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"form-group-3\">\n                            <input autocomplete=\"off\" type=\"password\" class=\"form-control\" placeholder=\"Password\" id=\"password\" required [(ngModel)]=\"model.password\" name=\"password\" #password=\"ngModel\">\n                            <div *ngIf=\"password.errors && (password.dirty || password.touched)\" class=\"show-error\">\n                                <div [hidden]=\"!password.errors.required\">\n                                    Please enter password.\n                                </div>\n                                <!-- <div [hidden]=\"!password.errors.minlength\">\n                                    Password's length must be at least {{8-model.password.length}}.\n                                </div> -->\n                            </div>\n                        </div>\n                        <a class=\"fgt-pswd\" href=\"/forgot-password\">Forgot Password?</a>\n                        <div class=\"btn-cont text-right\">\n                            <button type=\"submit\" [disabled]=\"loginForm.invalid\" class=\"btn btn-primary login-btn mgt-50\">LOGIN</button>\n                        </div>\n\n                        <p class=\"text-center\">By login you are agree to <a href=\"javascript://\"> Terms & Condition </a>\n                        and <a href=\"javascript://\"> Privacy Policy</a> of Nequore.</p>\n                    </form>\n                </div>\n            </div>\n        </div>\n    </div>\n</section>"

/***/ }),

/***/ "../../../../../src/app/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
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
            _this.admin.setUserLoggedIn();
            _this.router.navigate(['dashboard/view-inhouse-users/data-collectors']);
            _this.parameter.loading = false;
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
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" ? _b : Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */]) === "function" ? _c : Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__common_constants__["a" /* Constant */]) === "function" ? _d : Object])
    ], LoginComponent);
    return LoginComponent;
}());

//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ "../../../../../src/app/models/inhouse-users.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InhouseUsers; });
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
            dial_code: '52',
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
    function AdminService(http) {
        this.http = http;
        this.isUserLogin = false;
        this.baseUrl = __WEBPACK_IMPORTED_MODULE_6__environments_environment__["a" /* environment */].baseUrl;
        this.baseIP = __WEBPACK_IMPORTED_MODULE_6__environments_environment__["a" /* environment */].baseIP;
        this.deviceId = __WEBPACK_IMPORTED_MODULE_6__environments_environment__["a" /* environment */].deviceId;
        this.socketUrl = __WEBPACK_IMPORTED_MODULE_6__environments_environment__["a" /* environment */].socketUrl;
        this.login = new __WEBPACK_IMPORTED_MODULE_7_rxjs_BehaviorSubject__["BehaviorSubject"]({});
        this.loginData$ = this.login.asObservable();
        this.country = new __WEBPACK_IMPORTED_MODULE_7_rxjs_BehaviorSubject__["BehaviorSubject"]({});
        this.countryData$ = this.country.asObservable();
    }
    // starting of general functions
    AdminService.prototype.setUserLoggedIn = function () { this.isUserLogin = true; };
    AdminService.prototype.unsetUserLoggedIn = function () { this.isUserLogin = false; };
    AdminService.prototype.getUserLoggedIn = function () { return this.isUserLogin; };
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
        console.log('error handler');
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
        input.append('device_id', this.deviceId);
        var tt = this.getCountryLocality('getCountryLocality');
        return this.http.post(this.baseUrl + 'login', input, { headers: headers })
            .map(function (response) {
            var r = response.json();
            localStorage.setItem('token', r.data.token);
            _this.login.next(r.data);
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
            console.log('country', response);
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
            .map(function (res) {
            _this.http.loader.next({ value: false });
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
    var _a;
    AdminService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_8__http_interceptor__["a" /* HttpInterceptor */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__http_interceptor__["a" /* HttpInterceptor */]) === "function" ? _a : Object])
    ], AdminService);
    return AdminService;
}());

//# sourceMappingURL=admin.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/auth.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
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
    function AuthGuard(router, admin) {
        this.router = router;
        this.admin = admin;
    }
    AuthGuard.prototype.canActivate = function () {
        var _this = this;
        var token = localStorage.getItem('token');
        this.admin.login.subscribe(function (success) {
            if (success['name'] === undefined) {
                _this.admin.postDataApi('get-details', {})
                    .subscribe(function (success1) {
                    _this.admin.login.next(success1.data);
                });
            }
        });
        this.admin.country.subscribe(function (success) {
            if (!success[0]) {
                _this.admin.postDataApi('getCountryLocality', {})
                    .subscribe(function (success1) {
                    _this.admin.country.next(success1.data);
                });
            }
        });
        if (token) {
            return true;
        }
        this.router.navigate(['']);
        return false;
    };
    var _a, _b;
    AuthGuard = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" ? _a : Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__admin_service__["a" /* AdminService */]) === "function" ? _b : Object])
    ], AuthGuard);
    return AuthGuard;
}());

//# sourceMappingURL=auth.guard.js.map

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
            console.log('countries', success);
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
            console.log('states', success);
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
            console.log('cities', success);
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
        console.log('data', data);
        this.propertyDetails.next(data);
    };
    var _a, _b;
    CommonService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__admin_service__["a" /* AdminService */]) === "function" ? _a : Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" ? _b : Object])
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
            _this.loader.next({ value: false });
            var body = error['_body'];
            body = JSON.parse(body);
            swal('Error', body.message, 'error');
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error);
        };
        return _this;
    }
    HttpInterceptor.prototype.request = function (url, options) {
        console.log('Request - ', url);
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
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* XHRBackend */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* XHRBackend */]) === "function" ? _a : Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_http__["c" /* RequestOptions */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_http__["c" /* RequestOptions */]) === "function" ? _b : Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* Http */]) === "function" ? _c : Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === "function" ? _d : Object])
    ], HttpInterceptor);
    return HttpInterceptor;
}(__WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* Http */]));

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
exports.push([module.i, "\n.logout-btn{\n    cursor: pointer;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/app-header/app-header.component.html":
/***/ (function(module, exports) {

module.exports = "<header>\n  <div class=\"row\">\n    <!-- header -->\n      <div class=\"col-6\">\n        <a class=\"logo\">\n        <img class=\"app-logo\" src=\"assets/img/logo.png\" alt=\"img\">\n        </a>\n\n      </div>\n      <div class=\"col-6\">\n        <div class=\"user-profile float-right\">\n           <a href=\"javascript://\">\n              <h4>{{fullName}}</h4>\n              <img class=\"rounded-circle\" [src]=\"image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\">\n           </a>\n        </div>\n      </div>\n      <!-- <header end -->\n\n\n      <!--slide menu start-->\n      <div id=\"side-menu-bar\">\n          <div class=\"scrollbox\" malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\">\n            <nav class=\"navbar navbar-expand-md navbar-dark\">\n                <!-- Brand -->\n                <a class=\"navbar-brand\" href=\"#\">\n                  <img class=\"app-logo\" src=\"assets/img/logo.png\" alt=\"img\">\n                </a>\n                <!-- Toggler/collapsibe Button -->\n\n                <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapsibleNavbar\">\n                  <span class=\"navbar-toggler-icon\"></span>\n                </button>\n\n                <!-- sidebar-collapse -->\n                <div class=\"collapse navbar-collapse\" id=\"collapsibleNavbar\">\n                  <ul class=\"navbar-nav\">\n                      <!-- <li class=\"nav-item\">\n                        <a class=\"nav-link\" routerLink=\"/\"><i><img src=\"assets/img/dashboard.png\"></i><span>Dashboard</span></a>\n                      </li> -->\n                      <!-- <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"javascript://\" routerLink=\"generate-thumb\"><i><img src=\"assets/img/graph.png\"></i><span>Thumb</span></a>\n                      </li> -->\n                      <li class=\"nav-item dropdown\" [routerLinkActive]=\"'active'\">\n                         <a class=\"nav-link dropdown-toggle\" data-toggle=\"dropdown\" href=\"javascript://\">\n                         <i><img src=\"assets/img/user.png\"></i><span>Manage Inhouse User</span></a>\n                         <div class=\"dropdown-menu\">\n                            <ul>\n                               <li [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" routerLink=\"view-inhouse-users/data-collectors\">Data Collector</a></li>\n                               <li [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"view-inhouse-users/csr-sellers\">CSR Seller</a></li>\n                               <li [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"view-inhouse-users/csr-buyers\">CSR Buyer</a></li>\n                               <li [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"view-inhouse-users/inhouse-broker\">Inhouse Broker</a></li>\n                               <li [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"view-inhouse-users/csr-closers\">CSR Closer</a></li>\n                            </ul>\n                         </div>\n                      </li>\n                      <li class=\"nav-item dropdown\" [routerLinkActive]=\"'active'\">\n                        <a class=\"nav-link dropdown-toggle\" data-toggle=\"dropdown\" href=\"javascript://\">\n                        <i><img src=\"assets/img/stamp.png\"></i><span>Manage Notary</span></a>\n                        <div class=\"dropdown-menu\">\n                           <ul>\n                              <li [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" routerLink=\"notary/view-notary\">Notary</a></li>\n                              <li [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" routerLink=\"notary/notary-leads\">Leads</a></li>\n                           </ul>\n                        </div>\n                     </li>\n                     <li class=\"nav-item dropdown\" [routerLinkActive]=\"'active'\">\n                       <a class=\"nav-link dropdown-toggle\" data-toggle=\"dropdown\" href=\"javascript://\">\n                       <i><img src=\"assets/img/bank.png\"></i><span>Manage Banks</span></a>\n                       <div class=\"dropdown-menu\">\n                          <ul>\n                             <li [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" routerLink=\"banks/view-banks\">Banks</a></li>\n                          </ul>\n                       </div>\n                    </li>\n                      <li class=\"nav-item\" [routerLinkActive]=\"'active'\">\n                        <a class=\"nav-link\" href=\"javascript://\" routerLink=\"users\"><i><img src=\"assets/img/users.png\"></i><span>Manage User</span></a>\n                      </li>\n                      <li class=\"nav-item dropdown\" [routerLinkActive]=\"'active'\">\n                         <a class=\"nav-link dropdown-toggle\" data-toggle=\"dropdown\" href=\"javascript://\">\n                         <i><img src=\"assets/img/graph.png\"></i><span>Manage lead</span></a>\n                         <div class=\"dropdown-menu\">\n                            <ul>\n                               <li [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" routerLink=\"leads/data-collectors\">Data Collector</a></li>\n                               <li [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"leads/csr-sellers\">CSR Seller</a></li>\n                               <li [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"leads/csr-buyers\">CSR Buyer</a></li>\n                               <li [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"leads/inhouse-broker\">Inhouse Broker</a></li>\n                               <li [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"leads/csr-closers\">CSR Closer</a></li>\n                            </ul>\n                         </div>\n                      </li>\n                      <!-- <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"javascript://\" routerLink=\"leads/view-leads\"><i><img src=\"assets/img/graph.png\"></i><span>Magage lead</span></a>\n                      </li> -->\n                      <li class=\"nav-item\" [routerLinkActive]=\"'active'\">\n                        <a class=\"nav-link\" href=\"javascript://\" routerLink=\"projects/add-project\"><i><img src=\"assets/img/graph.png\"></i><span>Add Project</span></a>\n                      </li>\n                      <li class=\"nav-item\" [routerLinkActive]=\"'active'\">\n                        <a class=\"nav-link\" href=\"javascript://\" routerLink=\"properties/view-properties\"><i><img src=\"assets/img/graph.png\"></i><span>Magage Properties</span></a>\n                      </li>\n                      <!-- \n                      <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"javascript://\"><i><img src=\"assets/img/key.png\"></i><span>ACL</span></a>\n                      </li>\n                      <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"javascript://\"><i><img src=\"assets/img/graph2.png\"></i><span>Report</span></a>\n                      </li>\n                      <li class=\"nav-item active\">\n                        <a class=\"nav-link\" href=\"javascript://\"><i><img src=\"assets/img/graph.png\"></i><span>Magage Projects</span></a>\n                      </li> -->\n                      <li class=\"nav-item\" [routerLinkActive]=\"'active'\">\n                        <a class=\"nav-link\" href=\"javascript://\" routerLink=\"access-control-mgt\"><i><img src=\"assets/img/key.png\"></i><span>ACL</span></a>\n                      </li>\n                      <li class=\"nav-item dropdown\" [routerLinkActive]=\"'active'\">\n                          <a class=\"nav-link dropdown-toggle\" data-toggle=\"dropdown\" href=\"javascript://\">\n                          <i><img src=\"assets/img/graph2.png\"></i><span>Reports</span></a>\n                          <div class=\"dropdown-menu\">\n                             <ul>\n                                <li [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" routerLink=\"reports/seller\">Seller</a></li>\n                                <li [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"reports/buyer\">Buyer</a></li>\n                                <li [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"reports/notary\">Notary</a></li>\n                                <li [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" href=\"javascript://\" routerLink=\"reports/bank\">Bank</a></li>\n                             </ul>\n                          </div>\n                       </li>\n                      <li class=\"nav-item\" [routerLinkActive]=\"'active'\">\n                        <a class=\"nav-link\" href=\"javascript://\" routerLink=\"manual-leads\"><i><img src=\"assets/img/graph.png\"></i><span>Manual Leads</span></a>\n                      </li>\n                      <li class=\"nav-item\" [routerLinkActive]=\"'active'\">\n                        <a class=\"nav-link\" href=\"javascript://\" routerLink=\"edit-template\"><i><img src=\"assets/img/users.png\"></i><span>Edit Template</span></a>\n                      </li>\n                      <li class=\"nav-item dropdown\" [routerLinkActive]=\"'active'\">\n                        <a class=\"nav-link dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\">\n                        <i><img src=\"assets/img/settings.png\"></i><span>Settings</span></a>\n                        <div class=\"dropdown-menu\">\n                          <ul>\n                            <li [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" routerLink=\"settings/setting-location\">Location</a></li>\n                            <li [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" routerLink=\"settings/setting-locality\">Locality</a></li>\n                            <li [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" routerLink=\"settings/setting-property\">Property</a></li>\n                            <li [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" routerLink=\"settings/setting-project\">Project</a></li>\n                            <!-- <li><a class=\"dropdown-item\" routerLink=\"settings/edit-profile\">Edit Profile</a></li> -->\n                            <li [routerLinkActive]=\"'active'\"><a class=\"dropdown-item\" routerLink=\"settings/documents-listing\">Documents Listing</a></li>\n                            <li [routerLinkActive]=\"'active'\"><a class=\"dropdown-item logout-btn\" (click)=\"onLoggedout()\">Logout</a></li>\n                          </ul>\n                        </div>\n                      </li>\n                  </ul>\n                </div>\n            </nav>\n          </div>\n      </div>\n      <!--side menu end-->\n  </div>\n</header>\n"

/***/ }),

/***/ "../../../../../src/app/shared/app-header/app-header.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
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
    function AppHeaderComponent(admin, router) {
        var _this = this;
        this.admin = admin;
        this.router = router;
        this.scrollbarOptions = { axis: 'yx', theme: 'minimal-dark' };
        this.admin.loginData$.subscribe(function (success) {
            _this.fullName = success['name'];
            _this.image = success['image'];
        });
    }
    AppHeaderComponent.prototype.onLoggedout = function () {
        var _this = this;
        swal({
            title: 'Are you sure?',
            text: 'You want to logout?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Logout!'
        }).then(function (result) {
            if (result.value) {
                _this.logout();
            }
        });
    };
    AppHeaderComponent.prototype.logout = function () {
        swal('Success', 'Logout successfully.', 'success');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('isLoggedin');
        this.admin.unsetUserLoggedIn();
        this.router.navigate(['']);
    };
    var _a, _b;
    AppHeaderComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-header',
            template: __webpack_require__("../../../../../src/app/shared/app-header/app-header.component.html"),
            styles: [__webpack_require__("../../../../../src/app/shared/app-header/app-header.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" ? _a : Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" ? _b : Object])
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
    // baseUrl: 'http://192.168.100.88:8500/api/admin/',
    // socketUrl: 'http://45.232.252.136:8080'
    baseUrl: 'http://45.232.252.136/api/admin/',
    baseIP: 'http://45.232.252.136/api/',
    socketUrl: 'http://45.232.252.136:8080',
    deviceId: 'ADMIN'
    // baseUrl: 'https://kanguroo.mx/api/admin/',
    // socketUrl: 'https://kanguroo.mx:8080'
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

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map