webpackJsonp([12],{

/***/ "../../../../../src/app/layout/appointments/appointments.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/appointments/appointments.component.html":
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<div class=\"container-fluid\">\n  <div class=\"row\">\n      <div class=\"col-md-6\">\n        <div class=\"title-group\">\n            <h5>Appointments</h5>\n            <p></p>\n        </div>\n      </div>\n  </div>\n\n<div class=\"white-bg padding20\">\n   <!-- <p class=\"p14\">My appointments</p> -->\n   <div class=\"row\">\n      <div class=\"col-4\">\n        <select class=\"form-control\" [(ngModel)]=\"parameter.year\">\n          <option *ngFor=\"let y of yearList\" [value]=\"y\">{{y}}</option>\n        </select> \n      </div>\n      <div class=\"col-4\">\n        <select class=\"form-control\" [(ngModel)]=\"parameter.month\" (change)=\"getAppointments()\">\n          <option *ngFor=\"let m of constant.months\" [value]=\"m.id\">{{m.name}}</option>\n        </select> \n      </div>\n   </div>\n   <div class=\"spacer30 clearfix\"></div>\n   <ul class=\"month-date\">\n     <li class=\"cursor-pointer\" *ngFor=\"let item of appointmentDates\" title=\"Click to view list\" (click)=\"meetings = item.meetings\">\n      <span>{{item.day}}</span>\n      <b>{{item.date}}</b>\n      <span class=\"meeting-count\" [ngClass]=\"{'green':item.meeting_count > 0}\">{{item.meeting_count}}</span>\n     </li>\n   </ul>\n   <div class=\"spacer30 clearfix\"></div>\n   <div *ngFor=\"let item of meetings\">\n      <div class=\"col-4 white-bg padding15 shadow-new\">\n          <div class=\"appoint  marginT0\">\n                        \n              <div class=\"ap-row\">\n                 <div class=\"ap-col\">\n                    <p class=\"a-text\">{{item?.appointment_date|date :'shortTime'}}</p>\n                    <p class=\"no-show\">{{item?.status?.name}}</p>\n                 </div>\n                 <div class=\"ap-col\">\n                    <p class=\"a-text\">{{item?.lead?.user.name}}</p>\n                    <p class=\"a-text\">{{item?.lead?.user.dial_code}} {{item?.lead?.user.phone}}</p>\n                 </div>\n                 <div class=\"ap-col\">\n                    <button title=\"Edit Appointment\" [disabled]=\"admin?.admin_acl['Appointments']?.can_update==0\" (click)=\"openAppintment(item)\" class=\"action-icon float-right\">\n                      <img src=\"./../../../../assets/img/edit.png\" alt=\"img\">\n                    </button>\n                 </div>\n              </div>      \n           </div>\n          \n        </div>\n   </div>\n</div>\n</div>\n\n\n<!-- add note modal -->\n<a data-toggle=\"modal\" data-target=\"#editAppointment\" #modalOpen></a>\n<div class=\"modal animated\" id=\"editAppointment\">\n    <div class=\"modal-dialog fadeIndown\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header modal-header-new\">\n            <h4 class=\"modal-title\">Appointment</h4>\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #modalClose>&times;</button>\n        </div>\n          <div class=\"modal-body modal-body-new model-appointment\">\n            <div class=\"row\">\n\n              <div class=\"col-sm-12 col-12\">\n                  <div class=\"user fig-block upload-cover-img\">\n                  <img class=\"floor-plan\" [src]=\"appointmentNew?.lead?.user?.image\" onerror=\"this.src='assets/img/default_img.png'\" />\n                  <input accept=\"image/*\" name=\"\" type=\"file\">\n                  </div>\n              </div>\n              <div class=\"col-sm-12 col-12 text-center\" >\n                  <p class=\"p18\">{{appointmentNew?.lead?.user?.name}}</p>\n                  <p class=\"p14\">{{appointmentNew?.lead?.user?.dial_code}} {{appointmentNew?.lead?.user?.phone}}</p>\n              </div>\n\n              <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                   <div class=\"form-group\">\n                    <label>Date and Time</label>\n                    <input class=\"form-control\" type=\"datetime-local\" [ngModel] =\"appointmentNew.appointment_date | date:'yyyy-MM-ddTHH:mm'\" (ngModelChange)=\"appointmentNew.appointment_date = $event\">\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                    <div class=\"form-group\">\n                      <label>Status</label>\n                      <select class=\"form-control\" [(ngModel)]=\"appointmentNew.status_id\">\n                        <option *ngFor=\"let item of appointStatuses\" [value]=\"item.id\">{{item.name}}</option>\n                      </select>\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-12\">\n                  <div class=\"btn-cont text-right\">\n                      <button (click)=\"saveAppointment()\" type=\"submit\" class=\"btn btn-primary\">Save Appointment</button>\n                  </div>\n              </div>\n            </div>\n          </div>\n  \n      </div>\n    </div>\n  </div>\n\n"

/***/ }),

/***/ "../../../../../src/app/layout/appointments/appointments.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppointmentsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppointmentsComponent = /** @class */ (function () {
    function AppointmentsComponent(admin, constant) {
        this.admin = admin;
        this.constant = constant;
        this.parameter = {};
        this.appointmentDates = [];
        this.appointStatuses = [];
        this.meetings = [];
        this.yearList = [];
        this.appointmentNew = {};
        var d = new Date();
        console.log(d);
        this.parameter.year = d.getFullYear();
        this.parameter.month = d.getMonth() + 1;
        this.getAppointments();
        this.getAppointmentStatuses();
        this.yearList.push(this.parameter.year);
        this.yearList.push(this.parameter.year + 1);
        // this.yearList.push(this.parameter.year + 2);
        this.yearList.unshift(this.parameter.year - 1);
        console.log(this.parameter);
    }
    AppointmentsComponent.prototype.ngOnInit = function () {
    };
    AppointmentsComponent.prototype.getAppointmentStatuses = function () {
        var _this = this;
        this.admin.postDataApi('getAppointmentStatuses', {}).subscribe(function (r) {
            console.log('Status', r);
            _this.appointStatuses = r['data'];
        });
    };
    AppointmentsComponent.prototype.getAppointments = function () {
        var _this = this;
        this.meetings = [];
        this.parameter.loading = true;
        this.admin.postDataApi('leads/getAllAppointments', this.parameter).subscribe(function (r) {
            console.log('appointments', r);
            _this.parameter.loading = false;
            _this.appointmentDates = r['data'];
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    AppointmentsComponent.prototype.openAppintment = function (item) {
        this.modalOpen.nativeElement.click();
        this.appointmentBack = item;
        this.appointmentNew = JSON.parse(JSON.stringify(item));
        this.appointmentNew.status_id = this.appointmentNew.status.id;
    };
    AppointmentsComponent.prototype.saveAppointment = function () {
        var _this = this;
        this.appointmentDates = [];
        this.meetings = [];
        this.modalClose.nativeElement.click();
        console.log(this.appointmentNew);
        var input = {
            appointment_id: this.appointmentNew.id,
            status_id: this.appointmentNew.status_id,
            appointment_date: this.appointmentNew.appointment_date
        };
        this.parameter.loading = true;
        this.admin.postDataApi('leads/updateAppointmentStatus', input).subscribe(function (r) {
            // this.parameter.loading = false;
            console.log('Updated', r);
            _this.getAppointments();
        }, function (error) {
            _this.parameter.loading = false;
            console.log(error);
        });
    };
    var _a, _b, _c, _d;
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('modalOpen'),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _a : Object)
    ], AppointmentsComponent.prototype, "modalOpen", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('modalClose'),
        __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _b : Object)
    ], AppointmentsComponent.prototype, "modalClose", void 0);
    AppointmentsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-appointments',
            template: __webpack_require__("../../../../../src/app/layout/appointments/appointments.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/appointments/appointments.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" ? _c : Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__common_constants__["a" /* Constant */]) === "function" ? _d : Object])
    ], AppointmentsComponent);
    return AppointmentsComponent;
}());

//# sourceMappingURL=appointments.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/appointments/appointments.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_loading__ = __webpack_require__("../../../../ngx-loading/ngx-loading/ngx-loading.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_pagination__ = __webpack_require__("../../../../ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__guards_acl_user_guard__ = __webpack_require__("../../../../../src/app/guards/acl-user.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__appointments_component__ = __webpack_require__("../../../../../src/app/layout/appointments/appointments.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppointmentsModule", function() { return AppointmentsModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var routes = [
    // { path: '', component: AppointmentsComponent}
    { path: '', component: __WEBPACK_IMPORTED_MODULE_7__appointments_component__["a" /* AppointmentsComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_6__guards_acl_user_guard__["a" /* AclUserGuard */]], data: { roles: ['Appointments', 'can_read', ''] } }
];
var AppointmentsModule = /** @class */ (function () {
    function AppointmentsModule() {
    }
    AppointmentsModule = __decorate([
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
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["ReactiveFormsModule"]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__appointments_component__["a" /* AppointmentsComponent */]
            ]
        })
    ], AppointmentsModule);
    return AppointmentsModule;
}());

//# sourceMappingURL=appointments.module.js.map

/***/ })

});
//# sourceMappingURL=12.chunk.js.map