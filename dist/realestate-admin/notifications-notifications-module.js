(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["notifications-notifications-module"],{

/***/ "./src/app/layout/notifications/notifications.component.css":
/*!******************************************************************!*\
  !*** ./src/app/layout/notifications/notifications.component.css ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/layout/notifications/notifications.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/layout/notifications/notifications.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n\n<div class=\"container-fluid\">\n  <div class=\"row\">\n      <div class=\"col-md-6\">\n        <div class=\"title-group\">\n            <h5>Notifications</h5>\n            <p>Showing {{parameter.items?.length}} out of {{parameter.total ? parameter.total : parameter?.items?.length}}</p>\n        </div>\n      </div>\n  </div>\n\n  <!-- <div class=\"white-bg padding20 profile-content-outer\">\n    <p class=\"p18\">Notifications</p>\n    <ul class=\"notifications\">\n      <li *ngFor=\"let item of parameter.items\">\n        <h5>{{item.notification_text}}</h5>\n        <p>{{item.notification_desc}}</p>\n      </li>\n    </ul>\n  </div> -->\n\n  <div class=\"white-bg padding20 profile-content-outer\">\n    <ul class=\"notifications\">\n      <li *ngFor=\"let item of parameter.items| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: parameter.total }\" (click)=\"redirect(item)\">\n        <h5>{{item.notification_text}}</h5>\n        <p>{{item.notification_desc}}\n          <span class=\"pull-right\">{{item.updated_at|moment}}</span>\n        </p>\n      </li>\n    </ul>\n\n    <div class=\"center\" *ngIf=\"parameter.total == 0\">\n      <img src=\"assets/img/404-error.png\">\n    </div>\n  </div>\n  \n  <div class=\"btn-cont text-right marginT15\" *ngIf=\"parameter.total\">\n    <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n  </div>\n  \n</div>\n\n"

/***/ }),

/***/ "./src/app/layout/notifications/notifications.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/layout/notifications/notifications.component.ts ***!
  \*****************************************************************/
/*! exports provided: NotificationsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationsComponent", function() { return NotificationsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_admin_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var NotificationsComponent = /** @class */ (function () {
    function NotificationsComponent(admin, constant, router, spinner) {
        this.admin = admin;
        this.constant = constant;
        this.router = router;
        this.spinner = spinner;
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
        this.spinner.show();
        this.admin.postDataApi('getNotifications', { page: this.parameter.page }).subscribe(function (r) {
            _this.spinner.hide();
            _this.parameter.items = r.data;
            _this.parameter.total = r.total_count;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    NotificationsComponent.prototype.redirect = function (item) {
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
    NotificationsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-notifications',
            template: __webpack_require__(/*! ./notifications.component.html */ "./src/app/layout/notifications/notifications.component.html"),
            styles: [__webpack_require__(/*! ./notifications.component.css */ "./src/app/layout/notifications/notifications.component.css")]
        }),
        __metadata("design:paramtypes", [_services_admin_service__WEBPACK_IMPORTED_MODULE_1__["AdminService"], _common_constants__WEBPACK_IMPORTED_MODULE_2__["Constant"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_4__["NgxSpinnerService"]])
    ], NotificationsComponent);
    return NotificationsComponent;
}());



/***/ }),

/***/ "./src/app/layout/notifications/notifications.module.ts":
/*!**************************************************************!*\
  !*** ./src/app/layout/notifications/notifications.module.ts ***!
  \**************************************************************/
/*! exports provided: NotificationsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationsModule", function() { return NotificationsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _modules_shared_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../modules/shared.module */ "./src/app/modules/shared.module.ts");
/* harmony import */ var _notifications_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./notifications.component */ "./src/app/layout/notifications/notifications.component.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var routes = [
    { path: '', component: _notifications_component__WEBPACK_IMPORTED_MODULE_6__["NotificationsComponent"] }
];
var NotificationsModule = /** @class */ (function () {
    function NotificationsModule() {
    }
    NotificationsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes),
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                ngx_spinner__WEBPACK_IMPORTED_MODULE_7__["NgxSpinnerModule"],
                ngx_pagination__WEBPACK_IMPORTED_MODULE_3__["NgxPaginationModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
                _modules_shared_module__WEBPACK_IMPORTED_MODULE_5__["SharedModule"]
            ],
            declarations: [
                _notifications_component__WEBPACK_IMPORTED_MODULE_6__["NotificationsComponent"]
            ]
        })
    ], NotificationsModule);
    return NotificationsModule;
}());



/***/ })

}]);
//# sourceMappingURL=notifications-notifications-module.js.map