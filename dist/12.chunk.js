webpackJsonp([12],{

/***/ "../../../../../src/app/layout/notifications/notifications.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/notifications/notifications.component.html":
/***/ (function(module, exports) {

module.exports = "\n<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<div class=\"container-fluid\">\n  <div class=\"row\">\n      <div class=\"col-md-6\">\n        <div class=\"title-group\">\n            <h5>Notifications</h5>\n            <p>Showing {{parameter.items?.length}} out of {{parameter.total ? parameter.total : parameter?.items?.length}}</p>\n        </div>\n      </div>\n  </div>\n\n  <!-- <div class=\"white-bg padding20 profile-content-outer\">\n    <p class=\"p18\">Notifications</p>\n    <ul class=\"notifications\">\n      <li *ngFor=\"let item of parameter.items\">\n        <h5>{{item.notification_text}}</h5>\n        <p>{{item.notification_desc}}</p>\n      </li>\n    </ul>\n  </div> -->\n\n  <div class=\"white-bg padding20 profile-content-outer\">\n    <ul class=\"notifications\">\n      <li *ngFor=\"let item of parameter.items| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: parameter.total }\" (click)=\"redirect(item)\">\n        <h5>{{item.notification_text}}</h5>\n        <p>{{item.notification_desc}}\n          <span class=\"pull-right\">{{item.updated_at|moment}}</span>\n        </p>\n      </li>\n    </ul>\n\n    <div class=\"center\" *ngIf=\"parameter.total == 0\">\n      <img src=\"assets/img/404-error.png\">\n    </div>\n  </div>\n  \n  <div class=\"btn-cont text-right marginT15\" *ngIf=\"parameter.total\">\n    <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n  </div>\n  \n</div>\n\n"

/***/ }),

/***/ "../../../../../src/app/layout/notifications/notifications.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NotificationsComponent = /** @class */ (function () {
    function NotificationsComponent(admin, constant, router) {
        this.admin = admin;
        this.constant = constant;
        this.router = router;
        this.parameter = {};
    }
    NotificationsComponent.prototype.ngOnInit = function () {
        this.parameter.page = this.constant.p;
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.getNotifications();
    };
    NotificationsComponent.prototype.getPage = function (page) {
        this.parameter.page = page;
        this.getNotifications();
    };
    NotificationsComponent.prototype.getNotifications = function () {
        var _this = this;
        this.parameter.loading = true;
        this.admin.postDataApi('getNotifications', { page: this.parameter.page }).subscribe(function (r) {
            _this.parameter.loading = false;
            _this.parameter.items = r.data;
            _this.parameter.total = r.total_count;
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    NotificationsComponent.prototype.redirect = function (item) {
        console.log('redirect', item.notification_type, item.notification_data);
        var redirectPath;
        switch (item.notification_type) {
            case 4:
                // new lead assigned to csr seller
                redirectPath = '/dashboard/leads/csr-sellers';
                break;
            case 5:
                // when developer schedule meeting
                redirectPath = '/dashboard/leads/csr-sellers';
                break;
            case 6:
                // new lead assigned to csr closer
                redirectPath = '/dashboard/leads/csr-closers';
                break;
            case 7:
                // new lead assigned to inhouse broker
                redirectPath = '/dashboard/leads/inhouse-broker';
                break;
            case 8:
                // new lead assigned to csr buyer
                redirectPath = '/dashboard/leads/csr-buyers';
                break;
            case 14:
                // token amount paid by user
                redirectPath = '/dashboard/leads/inhouse-broker';
                break;
            case 25:
                // new lead assigned to bank
                redirectPath = '/dashboard/banks/bank-leads';
                break;
            case 26:
                // new lead assigned to notary
                redirectPath = '/dashboard/notary/notary-leads';
                break;
        }
        if (item.notification_type !== 5) {
            this.router.navigate([redirectPath, item.notification_data.ref_id]);
        }
    };
    var _a, _b, _c;
    NotificationsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-notifications',
            template: __webpack_require__("../../../../../src/app/layout/notifications/notifications.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/notifications/notifications.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" ? _a : Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__common_constants__["a" /* Constant */]) === "function" ? _b : Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["Router"]) === "function" ? _c : Object])
    ], NotificationsComponent);
    return NotificationsComponent;
}());

//# sourceMappingURL=notifications.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/notifications/notifications.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_loading__ = __webpack_require__("../../../../ngx-loading/ngx-loading/ngx-loading.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_pagination__ = __webpack_require__("../../../../ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modules_shared_module__ = __webpack_require__("../../../../../src/app/modules/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__notifications_component__ = __webpack_require__("../../../../../src/app/layout/notifications/notifications.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationsModule", function() { return NotificationsModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_7__notifications_component__["a" /* NotificationsComponent */] }
];
var NotificationsModule = /** @class */ (function () {
    function NotificationsModule() {
    }
    NotificationsModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_router__["RouterModule"].forChild(routes),
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_3_ngx_loading__["a" /* LoadingModule */].forRoot({
                    animationType: __WEBPACK_IMPORTED_MODULE_3_ngx_loading__["b" /* ANIMATION_TYPES */].rectangleBounce,
                    primaryColour: '#00B96F'
                }),
                __WEBPACK_IMPORTED_MODULE_4_ngx_pagination__["a" /* NgxPaginationModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["ReactiveFormsModule"],
                __WEBPACK_IMPORTED_MODULE_6__modules_shared_module__["a" /* SharedModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__notifications_component__["a" /* NotificationsComponent */]
            ]
        })
    ], NotificationsModule);
    return NotificationsModule;
}());

//# sourceMappingURL=notifications.module.js.map

/***/ })

});
//# sourceMappingURL=12.chunk.js.map