(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["reports-reports-module"],{

/***/ "./src/app/layout/reports/bank/bank.component.css":
/*!********************************************************!*\
  !*** ./src/app/layout/reports/bank/bank.component.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9yZXBvcnRzL2JhbmsvYmFuay5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/layout/reports/bank/bank.component.html":
/*!*********************************************************!*\
  !*** ./src/app/layout/reports/bank/bank.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container-fluid\">\n    <div class=\"row\">\n        <div class=\"col-12\">\n          <div class=\"title-group\">\n              <h5>{{'reports.label' | translate}} - {{'reports.bank' | translate}}</h5>\n          </div>\n        </div>\n    </div>\n  \n  <div class=\"white-bg marginT15 padding15\">\n      <div class=\"page-title-4\">\n          <h3>{{'reports.statsAndTrendAnalytics' | translate}}</h3>\n      </div>\n      \n      <div class=\"row\">\n            <div class=\"col-lg-4 col-md-4 col-sm-4 col-12\"></div>\n            <div class=\"col-lg-8 col-md-8 col-sm-8 col-12\">\n            <!-- <hr style=\"margin-top:0;\"> -->\n            <!-- From: <input class=\"date-input\" type=\"date\" [ngModel] =\"parameter.min | date:'yyyy-MM-dd'\" max=\"{{today| date:'yyyy-MM-dd'}}\" (ngModelChange)=\"parameter.min = $event; parameter.max=''\" />\n                To: <input class=\"date-input\" type=\"date\" [ngModel] =\"parameter.max | date:'yyyy-MM-dd'\" min=\"{{parameter.min | date:'yyyy-MM-dd'}}\" max=\"{{today| date:'yyyy-MM-dd'}}\" (ngModelChange)=\"parameter.max = $event\" /> -->\n                \n            <!-- <div class=\"pull-right btn-cont\">\n                From: <p-calendar [(ngModel)]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2040\"></p-calendar>\n                To: <p-calendar [(ngModel)]=\"parameter.max\" [minDate]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2040\"></p-calendar>\n                <button class=\"btn btn-calender new-btn\" href=\"javascript://\" (click)=\"getReportData()\"\n                    [disabled]=\"!parameter.min || !parameter.max\">Apply</button>\n            </div> -->\n    \n    \n            <div class=\"pull-right row\">\n                <div class=\"col-lg-4 col-md-4 col-sm-5 col-5\">\n                  <div class=\"form-group marginB0\">\n                      <label>{{'reports.from' | translate}}:</label>\n                      <p-calendar [locale]=\"locale\" showIcon=\"true\" [(ngModel)]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2040\"></p-calendar>\n                  </div>\n                </div>\n                <div class=\"col-lg-4 col-md-4 col-sm-5 col-5\">\n                  <div class=\"form-group marginB0\">\n                      <label>{{'reports.to' | translate}}:</label>\n                      <p-calendar [locale]=\"locale\" showIcon=\"true\" [(ngModel)]=\"parameter.max\" [minDate]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2040\"></p-calendar>\n                  </div>\n                </div>\n                <div class=\"col-lg-4 col-md-4 col-sm-2 col-5\">\n                  <div class=\"form-group btn-cont\">\n                    <label class=\"addMT3\">&nbsp;</label>\n                    <button class=\"btn btn-calender\" href=\"javascript://\" (click)=\"getReportData()\"\n                  [disabled]=\"!parameter.min || !parameter.max\">{{'reports.apply' | translate}}</button>\n                  </div>\n                </div>\n            </div>\n        </div>\n        </div>\n\n        \n      <div class=\"row report-data\">\n        <div class=\"col-sm-5\">\n          <p class=\"report-data-title\">{{parameter.total>0 ? ('reports.totalBanksOnPlatform' | translate) : ('reports.totalBankOnPlatform' | translate) }}</p>\n          <p class=\"report-data-value\">{{parameter.total}}</p>\n        </div>\n        <div class=\"col-sm-7\">\n            <div class=\"row\">\n                <div class=\"col-sm-6\">\n                    <span class=\"report-label report-red\">&nbsp;</span> <span> {{'reports.signUp' | translate}} ({{totalSignUpCount}})</span>\n                </div>\n                <div class=\"col-sm-6\">\n                    <span class=\"report-label report-yellow\">&nbsp;</span> <span> {{'reports.properties' | translate}} ({{totalPropertyCount}})</span>\n                </div>\n            </div>\n        </div>\n      </div>\n      <div class=\"graph-area\">\n        <ngx-charts-bar-vertical-2d\n        [scheme]=\"colorScheme\"\n        [results]=\"chartView\"\n        [gradient]=\"false\"\n        [xAxis]=\"true\"\n        [yAxis]=\"true\"\n        [barPadding]=\"2\"\n        [groupPadding]=\"4\"\n        [legend]=\"false\"\n        [animations]=\"true\"\n        (select)=\"onSelect($event)\">\n      </ngx-charts-bar-vertical-2d>\n  \n      </div>\n    </div>\n      \n  </div>"

/***/ }),

/***/ "./src/app/layout/reports/bank/bank.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/layout/reports/bank/bank.component.ts ***!
  \*******************************************************/
/*! exports provided: BankComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BankComponent", function() { return BankComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BankComponent = /** @class */ (function () {
    function BankComponent(admin, spinner, translate) {
        this.admin = admin;
        this.spinner = spinner;
        this.translate = translate;
        this.parameter = {};
        this.today = new Date();
        this.chartView = [];
        this.colorScheme = {
            domain: ['#ee7b7c', '#f5d05c']
        };
        // Object.assign(this, this.chartView);
    }
    BankComponent.prototype.onSelect = function (event) { };
    BankComponent.prototype.ngOnInit = function () {
        this.locale = {
            firstDayOfWeek: 0,
            dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
            dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
            dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
            monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
            monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun',
                'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
            today: 'Hoy',
            clear: 'Clara',
            dateFormat: 'mm/dd/yy',
            weekHeader: 'Wk'
        };
        var date = new Date();
        // this.parameter.min = new Date(date.getFullYear() + '-' + '01' + '-' + '01');
        // this.parameter.max = date;
        // this.parameter.min = moment(date.getFullYear() + '-' + '01' + '-' + '01').format('YYYY-MM-DD');
        // this.parameter.max = moment().format('YYYY-MM-DD');
        this.parameter.min = moment__WEBPACK_IMPORTED_MODULE_2__().subtract(12, 'months').toDate();
        this.parameter.max = moment__WEBPACK_IMPORTED_MODULE_2__().toDate();
        this.getReportData();
    };
    BankComponent.prototype.getReportData = function () {
        var _this = this;
        this.totalSignUpCount = 0;
        this.totalPropertyCount = 0;
        // const input = {start_date: this.parameter.min, end_date: this.parameter.max};
        var input = { start_date: moment__WEBPACK_IMPORTED_MODULE_2__(this.parameter.min).format('YYYY-MM-DD'), end_date: moment__WEBPACK_IMPORTED_MODULE_2__(this.parameter.max).format('YYYY-MM-DD') };
        this.spinner.show();
        this.admin.postDataApi('reports/bank', input).subscribe(function (r) {
            _this.spinner.hide();
            _this.parameter.items = r.data;
            var data = [];
            _this.parameter.items.forEach(function (element) {
                _this.totalSignUpCount = _this.totalSignUpCount + element.signup_count;
                _this.totalPropertyCount = _this.totalPropertyCount + element.property_count;
                data.push({
                    'name': element.month_name + ', ' + element.year,
                    'series': [
                        {
                            'name': _this.translate.instant('reports.signUp'),
                            'value': element.signup_count
                        }, {
                            'name': _this.translate.instant('reports.properties'),
                            'value': element.property_count
                        }
                    ]
                });
            });
            _this.parameter.total = _this.totalSignUpCount + _this.totalPropertyCount;
            _this.chartView = data;
            // Object.assign(this, this.chartView);
        }, function (error) {
            _this.spinner.hide();
        });
    };
    BankComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-bank',
            template: __webpack_require__(/*! ./bank.component.html */ "./src/app/layout/reports/bank/bank.component.html"),
            styles: [__webpack_require__(/*! ./bank.component.css */ "./src/app/layout/reports/bank/bank.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_1__["AdminService"], ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__["TranslateService"]])
    ], BankComponent);
    return BankComponent;
}());



/***/ }),

/***/ "./src/app/layout/reports/buyer/buyer.component.css":
/*!**********************************************************!*\
  !*** ./src/app/layout/reports/buyer/buyer.component.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9yZXBvcnRzL2J1eWVyL2J1eWVyLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/layout/reports/buyer/buyer.component.html":
/*!***********************************************************!*\
  !*** ./src/app/layout/reports/buyer/buyer.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container-fluid\">\n    <div class=\"row\">\n        <div class=\"col-12\">\n          <div class=\"title-group\">\n            <h5>{{'reports.label' | translate}} - {{'reports.buyer' | translate}}</h5>\n          </div>\n        </div>\n    </div>\n  \n  <div class=\"white-bg marginT15 padding15\">\n      <div class=\"page-title-4\">\n        <h3>{{'reports.statsAndTrendAnalytics' | translate}}</h3>\n      </div>\n     \n      <div class=\"row\">\n            <div class=\"col-lg-4 col-md-4 col-sm-4 col-12\"></div>\n            <div class=\"col-lg-8 col-md-8 col-sm-8 col-12\">\n            <!-- <hr style=\"margin-top:0;\"> -->\n            <!-- From: <input class=\"date-input\" type=\"date\" [ngModel] =\"parameter.min | date:'yyyy-MM-dd'\" max=\"{{today| date:'yyyy-MM-dd'}}\" (ngModelChange)=\"parameter.min = $event; parameter.max=''\" />\n                To: <input class=\"date-input\" type=\"date\" [ngModel] =\"parameter.max | date:'yyyy-MM-dd'\" min=\"{{parameter.min | date:'yyyy-MM-dd'}}\" max=\"{{today| date:'yyyy-MM-dd'}}\" (ngModelChange)=\"parameter.max = $event\" /> -->\n                \n            <!-- <div class=\"pull-right btn-cont\">\n                From: <p-calendar [(ngModel)]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2040\"></p-calendar>\n                To: <p-calendar [(ngModel)]=\"parameter.max\" [minDate]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2040\"></p-calendar>\n                <button class=\"btn btn-calender new-btn\" href=\"javascript://\" (click)=\"getReportData()\"\n                    [disabled]=\"!parameter.min || !parameter.max\">Apply</button>\n            </div> -->\n    \n    \n            <div class=\"pull-right row\">\n                <div class=\"col-lg-4 col-md-4 col-sm-5 col-5\">\n                  <div class=\"form-group marginB0\">\n                    <label>{{'reports.from' | translate}}:</label>\n                      <p-calendar [locale]=\"locale\" showIcon=\"true\" [(ngModel)]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2040\"></p-calendar>\n                  </div>\n                </div>\n                <div class=\"col-lg-4 col-md-4 col-sm-5 col-5\">\n                  <div class=\"form-group marginB0\">\n                    <label>{{'reports.to' | translate}}:</label>\n                      <p-calendar [locale]=\"locale\" showIcon=\"true\" [(ngModel)]=\"parameter.max\" [minDate]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2040\"></p-calendar>\n                  </div>\n                </div>\n                <div class=\"col-lg-4 col-md-4 col-sm-2 col-5\">\n                  <div class=\"form-group btn-cont\">\n                    <label class=\"addMT3\">&nbsp;</label>\n                    <button class=\"btn btn-calender\" href=\"javascript://\" (click)=\"getReportData()\"\n                  [disabled]=\"!parameter.min || !parameter.max\">{{'reports.apply' | translate}}</button>\n                  </div>\n                </div>\n            </div>\n        </div>\n        </div>\n\n      <div class=\"row report-data\">\n        <div class=\"col-sm-5\">\n          <p class=\"report-data-title\">{{parameter.total>0 ? ('reports.totalBuyersOnPlatform' | translate) : ('reports.totalBuyerOnPlatform' | translate) }}</p>\n          <p class=\"report-data-value\">{{parameter.total}}</p>\n        </div>\n        <div class=\"col-sm-7\">\n            <div class=\"row\">\n                <div class=\"col-sm-6\">\n                    <span class=\"report-label report-green\">&nbsp;</span> <span> {{'reports.signUp' | translate}} ({{totalSignUpCount}})</span>\n                </div>\n                <div class=\"col-sm-6\">\n                    <span class=\"report-label report-blue\">&nbsp;</span> <span> {{'reports.addedInformation' | translate}} ({{totalInfoCount}})</span>\n                </div>\n            </div>\n            <div class=\"row marginT15\">\n                <div class=\"col-sm-6\">\n                    <span class=\"report-label report-red\">&nbsp;</span> <span> {{'reports.inhouseAgentsAssigned' | translate}} ({{totalBrokerCount}})</span>\n                </div>\n                <div class=\"col-sm-6\">\n                    <span class=\"report-label report-yellow\">&nbsp;</span> <span> {{'reports.sold' | translate}} ({{totalSold}})</span>\n                </div>\n            </div>\n        </div>\n      </div>\n      <div class=\"graph-area\">\n        <ngx-charts-bar-vertical-2d\n        [scheme]=\"colorScheme\"\n        [results]=\"chartView\"\n        [gradient]=\"false\"\n        [xAxis]=\"true\"\n        [yAxis]=\"true\"\n        [barPadding]=\"2\"\n        [groupPadding]=\"4\"\n        [legend]=\"false\"\n        [animations]=\"true\"\n        (select)=\"onSelect($event)\">\n      </ngx-charts-bar-vertical-2d>\n  \n      </div>\n    </div>\n      \n  </div>"

/***/ }),

/***/ "./src/app/layout/reports/buyer/buyer.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/layout/reports/buyer/buyer.component.ts ***!
  \*********************************************************/
/*! exports provided: BuyerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BuyerComponent", function() { return BuyerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BuyerComponent = /** @class */ (function () {
    function BuyerComponent(admin, spinner, translate) {
        this.admin = admin;
        this.spinner = spinner;
        this.translate = translate;
        this.parameter = {};
        this.today = new Date();
        this.chartView = [];
        this.colorScheme = {
            domain: ['#4eb96f', '#4a85ff', '#ee7b7c', '#f5d05c']
        };
        // Object.assign(this, this.chartView);
    }
    BuyerComponent.prototype.onSelect = function (event) { };
    BuyerComponent.prototype.ngOnInit = function () {
        this.locale = {
            firstDayOfWeek: 0,
            dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
            dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
            dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
            monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
            monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun',
                'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
            today: 'Hoy',
            clear: 'Clara',
            dateFormat: 'mm/dd/yy',
            weekHeader: 'Wk'
        };
        var date = new Date();
        // this.parameter.min = new Date(date.getFullYear() + '-' + '01' + '-' + '01');
        // this.parameter.max = date;
        // this.parameter.min = moment(date.getFullYear() + '-' + '01' + '-' + '01').format('YYYY-MM-DD');
        // this.parameter.max = moment().format('YYYY-MM-DD');
        this.parameter.min = moment__WEBPACK_IMPORTED_MODULE_2__().subtract(12, 'months').toDate();
        this.parameter.max = moment__WEBPACK_IMPORTED_MODULE_2__().toDate();
        this.getReportData();
    };
    BuyerComponent.prototype.getReportData = function () {
        var _this = this;
        this.totalSignUpCount = 0;
        this.totalInfoCount = 0;
        this.totalBrokerCount = 0;
        this.totalSold = 0;
        // const input = {start_date: this.parameter.min, end_date: this.parameter.max};
        var input = { start_date: moment__WEBPACK_IMPORTED_MODULE_2__(this.parameter.min).format('YYYY-MM-DD'), end_date: moment__WEBPACK_IMPORTED_MODULE_2__(this.parameter.max).format('YYYY-MM-DD') };
        this.spinner.show();
        this.admin.postDataApi('reports/buyers', input).subscribe(function (r) {
            _this.spinner.hide();
            _this.parameter.items = r.data;
            var data = [];
            _this.parameter.items.forEach(function (element) {
                _this.totalSignUpCount = _this.totalSignUpCount + element.signup_count;
                _this.totalInfoCount = _this.totalInfoCount + element.info_count;
                _this.totalBrokerCount = _this.totalBrokerCount + element.broker_count;
                _this.totalSold = _this.totalSold + element.property_sold;
                data.push({
                    'name': element.month_name + ', ' + element.year,
                    'series': [
                        {
                            'name': _this.translate.instant('reports.signUp'),
                            'value': element.signup_count
                        }, {
                            'name': _this.translate.instant('reports.addedInformation'),
                            'value': element.info_count
                        }, {
                            'name': _this.translate.instant('reports.inhouseAgentsAssigned'),
                            'value': element.broker_count
                        }, {
                            'name': _this.translate.instant('reports.sold'),
                            'value': element.property_sold
                        }
                    ]
                });
            });
            _this.parameter.total = _this.totalSignUpCount + _this.totalInfoCount + _this.totalBrokerCount + _this.totalSold;
            _this.chartView = data;
            // Object.assign(this, this.chartView);
        }, function (error) {
            _this.spinner.hide();
        });
    };
    BuyerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-buyer',
            template: __webpack_require__(/*! ./buyer.component.html */ "./src/app/layout/reports/buyer/buyer.component.html"),
            styles: [__webpack_require__(/*! ./buyer.component.css */ "./src/app/layout/reports/buyer/buyer.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_1__["AdminService"], ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__["TranslateService"]])
    ], BuyerComponent);
    return BuyerComponent;
}());



/***/ }),

/***/ "./src/app/layout/reports/notary/notary.component.css":
/*!************************************************************!*\
  !*** ./src/app/layout/reports/notary/notary.component.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9yZXBvcnRzL25vdGFyeS9ub3RhcnkuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/layout/reports/notary/notary.component.html":
/*!*************************************************************!*\
  !*** ./src/app/layout/reports/notary/notary.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container-fluid\">\n    <div class=\"row\">\n        <div class=\"col-12\">\n          <div class=\"title-group\">\n            <h5>{{'reports.label' | translate}} - {{'reports.notary' | translate}}</h5>\n          </div>\n        </div>\n    </div>\n  \n  <div class=\"white-bg marginT15 padding15\">\n      <div class=\"page-title-4\">\n        <h3>{{'reports.statsAndTrendAnalytics' | translate}}</h3>\n      </div>\n      <div class=\"row\">\n            <div class=\"col-lg-4 col-md-4 col-sm-4 col-12\"></div>\n            <div class=\"col-lg-8 col-md-8 col-sm-8 col-12\">\n            <!-- <hr style=\"margin-top:0;\"> -->\n            <!-- From: <input class=\"date-input\" type=\"date\" [ngModel] =\"parameter.min | date:'yyyy-MM-dd'\" max=\"{{today| date:'yyyy-MM-dd'}}\" (ngModelChange)=\"parameter.min = $event; parameter.max=''\" />\n                To: <input class=\"date-input\" type=\"date\" [ngModel] =\"parameter.max | date:'yyyy-MM-dd'\" min=\"{{parameter.min | date:'yyyy-MM-dd'}}\" max=\"{{today| date:'yyyy-MM-dd'}}\" (ngModelChange)=\"parameter.max = $event\" /> -->\n                \n            <!-- <div class=\"pull-right btn-cont\">\n                From: <p-calendar [(ngModel)]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2040\"></p-calendar>\n                To: <p-calendar [(ngModel)]=\"parameter.max\" [minDate]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2040\"></p-calendar>\n                <button class=\"btn btn-calender new-btn\" href=\"javascript://\" (click)=\"getReportData()\"\n                    [disabled]=\"!parameter.min || !parameter.max\">Apply</button>\n            </div> -->\n    \n    \n            <div class=\"pull-right row\">\n                <div class=\"col-lg-4 col-md-4 col-sm-5 col-5\">\n                  <div class=\"form-group marginB0\">\n                      <label>{{'reports.from' | translate}}:</label>\n                      <p-calendar [locale]=\"locale\" showIcon=\"true\" [(ngModel)]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2040\"></p-calendar>\n                  </div>\n                </div>\n                <div class=\"col-lg-4 col-md-4 col-sm-5 col-5\">\n                  <div class=\"form-group marginB0\">\n                      <label>{{'reports.to' | translate}}:</label>\n                      <p-calendar [locale]=\"locale\" showIcon=\"true\" [(ngModel)]=\"parameter.max\" [minDate]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2040\"></p-calendar>\n                  </div>\n                </div>\n                <div class=\"col-lg-4 col-md-4 col-sm-2 col-5\">\n                  <div class=\"form-group btn-cont\">\n                    <label class=\"addMT3\">&nbsp;</label>\n                    <button class=\"btn btn-calender\" href=\"javascript://\" (click)=\"getReportData()\"\n                  [disabled]=\"!parameter.min || !parameter.max\">{{'reports.apply' | translate}}</button>\n                  </div>\n                </div>\n            </div>\n        </div>\n        </div>\n\n      <div class=\"row report-data\">\n        <div class=\"col-sm-5\">\n          <p class=\"report-data-title\">{{parameter.total>0 ? ('reports.totalNotariesOnPlatform' | translate) : ('reports.totalNotaryOnPlatform' | translate) }}</p>\n          <p class=\"report-data-value\">{{parameter.total}}</p>\n        </div>\n        <div class=\"col-sm-7\">\n            <div class=\"row\">\n                <div class=\"col-sm-6\">\n                    <span class=\"report-label report-green\">&nbsp;</span> <span> {{'reports.signUp' | translate}} ({{totalSignUpCount}})</span>\n                </div>\n                <div class=\"col-sm-6\">\n                    <span class=\"report-label report-blue\">&nbsp;</span> <span> {{'reports.properties' | translate}} ({{totalPropertyCount}})</span>\n                </div>\n            </div>\n        </div>\n      </div>\n      <div class=\"graph-area\">\n        <ngx-charts-bar-vertical-2d\n        [scheme]=\"colorScheme\"\n        [results]=\"chartView\"\n        [gradient]=\"false\"\n        [xAxis]=\"true\"\n        [yAxis]=\"true\"\n        [barPadding]=\"2\"\n        [groupPadding]=\"4\"\n        [legend]=\"false\"\n        [animations]=\"true\"\n        (select)=\"onSelect($event)\">\n      </ngx-charts-bar-vertical-2d>\n  \n      </div>\n    </div>\n      \n  </div>"

/***/ }),

/***/ "./src/app/layout/reports/notary/notary.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/layout/reports/notary/notary.component.ts ***!
  \***********************************************************/
/*! exports provided: NotaryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotaryComponent", function() { return NotaryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var NotaryComponent = /** @class */ (function () {
    function NotaryComponent(admin, spinner, translate) {
        this.admin = admin;
        this.spinner = spinner;
        this.translate = translate;
        this.parameter = {};
        this.today = new Date();
        this.chartView = [];
        this.colorScheme = {
            domain: ['#4eb96f', '#4a85ff']
        };
        // Object.assign(this, this.chartView);
    }
    NotaryComponent.prototype.onSelect = function (event) { };
    NotaryComponent.prototype.ngOnInit = function () {
        this.locale = {
            firstDayOfWeek: 0,
            dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
            dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
            dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
            monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
            monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun',
                'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
            today: 'Hoy',
            clear: 'Clara',
            dateFormat: 'mm/dd/yy',
            weekHeader: 'Wk'
        };
        var date = new Date();
        // this.parameter.min = new Date(date.getFullYear() + '-' + '01' + '-' + '01');
        // this.parameter.max = date;
        // this.parameter.min = moment(date.getFullYear() + '-' + '01' + '-' + '01').format('YYYY-MM-DD');
        // this.parameter.max = moment().format('YYYY-MM-DD');
        this.parameter.min = moment__WEBPACK_IMPORTED_MODULE_2__().subtract(12, 'months').toDate();
        this.parameter.max = moment__WEBPACK_IMPORTED_MODULE_2__().toDate();
        this.getReportData();
    };
    NotaryComponent.prototype.getReportData = function () {
        var _this = this;
        this.totalSignUpCount = 0;
        this.totalPropertyCount = 0;
        // const input = {start_date: this.parameter.min, end_date: this.parameter.max};
        var input = { start_date: moment__WEBPACK_IMPORTED_MODULE_2__(this.parameter.min).format('YYYY-MM-DD'), end_date: moment__WEBPACK_IMPORTED_MODULE_2__(this.parameter.max).format('YYYY-MM-DD') };
        this.spinner.show();
        this.admin.postDataApi('reports/noatary', input).subscribe(function (r) {
            _this.spinner.hide();
            _this.parameter.items = r.data;
            var data = [];
            _this.parameter.items.forEach(function (element) {
                _this.totalSignUpCount = _this.totalSignUpCount + element.signup_count;
                _this.totalPropertyCount = _this.totalPropertyCount + element.property_count;
                data.push({
                    'name': element.month_name + ', ' + element.year,
                    'series': [
                        {
                            'name': _this.translate.instant('reports.signUp'),
                            'value': element.signup_count
                        }, {
                            'name': _this.translate.instant('reports.properties'),
                            'value': element.property_count
                        }
                    ]
                });
            });
            _this.parameter.total = _this.totalSignUpCount + _this.totalPropertyCount;
            _this.chartView = data;
            // Object.assign(this, this.chartView);
        }, function (error) {
            _this.spinner.hide();
        });
    };
    NotaryComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-notary',
            template: __webpack_require__(/*! ./notary.component.html */ "./src/app/layout/reports/notary/notary.component.html"),
            styles: [__webpack_require__(/*! ./notary.component.css */ "./src/app/layout/reports/notary/notary.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_1__["AdminService"], ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__["TranslateService"]])
    ], NotaryComponent);
    return NotaryComponent;
}());



/***/ }),

/***/ "./src/app/layout/reports/reports.component.css":
/*!******************************************************!*\
  !*** ./src/app/layout/reports/reports.component.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9yZXBvcnRzL3JlcG9ydHMuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/layout/reports/reports.component.html":
/*!*******************************************************!*\
  !*** ./src/app/layout/reports/reports.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/layout/reports/reports.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/layout/reports/reports.component.ts ***!
  \*****************************************************/
/*! exports provided: ReportsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportsComponent", function() { return ReportsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ReportsComponent = /** @class */ (function () {
    function ReportsComponent() {
    }
    ReportsComponent.prototype.ngOnInit = function () {
    };
    ReportsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-reports',
            template: __webpack_require__(/*! ./reports.component.html */ "./src/app/layout/reports/reports.component.html"),
            styles: [__webpack_require__(/*! ./reports.component.css */ "./src/app/layout/reports/reports.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], ReportsComponent);
    return ReportsComponent;
}());



/***/ }),

/***/ "./src/app/layout/reports/reports.module.ts":
/*!**************************************************!*\
  !*** ./src/app/layout/reports/reports.module.ts ***!
  \**************************************************/
/*! exports provided: ReportsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportsModule", function() { return ReportsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ng2_tel_input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng2-tel-input */ "./node_modules/ng2-tel-input/ng2-tel-input.js");
/* harmony import */ var _swimlane_ngx_charts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @swimlane/ngx-charts */ "./node_modules/@swimlane/ngx-charts/release/esm.js");
/* harmony import */ var primeng_primeng__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/primeng */ "./node_modules/primeng/primeng.js");
/* harmony import */ var primeng_primeng__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(primeng_primeng__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _reports_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./reports.component */ "./src/app/layout/reports/reports.component.ts");
/* harmony import */ var _seller_seller_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./seller/seller.component */ "./src/app/layout/reports/seller/seller.component.ts");
/* harmony import */ var _buyer_buyer_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./buyer/buyer.component */ "./src/app/layout/reports/buyer/buyer.component.ts");
/* harmony import */ var _notary_notary_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./notary/notary.component */ "./src/app/layout/reports/notary/notary.component.ts");
/* harmony import */ var _bank_bank_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./bank/bank.component */ "./src/app/layout/reports/bank/bank.component.ts");
/* harmony import */ var _guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../guards/acl-user.guard */ "./src/app/guards/acl-user.guard.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
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
        path: 'seller', component: _seller_seller_component__WEBPACK_IMPORTED_MODULE_10__["SellerComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_14__["AclUserGuard"]], data: { roles: ['Reports', 'can_read', ''] }
    },
    {
        path: 'buyer', component: _buyer_buyer_component__WEBPACK_IMPORTED_MODULE_11__["BuyerComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_14__["AclUserGuard"]], data: { roles: ['Reports', 'can_read', ''] }
    },
    {
        path: 'notary', component: _notary_notary_component__WEBPACK_IMPORTED_MODULE_12__["NotaryComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_14__["AclUserGuard"]], data: { roles: ['Reports', 'can_read', ''] }
    },
    {
        path: 'bank', component: _bank_bank_component__WEBPACK_IMPORTED_MODULE_13__["BankComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_14__["AclUserGuard"]], data: { roles: ['Reports', 'can_read', ''] }
    }
];
var ReportsModule = /** @class */ (function () {
    function ReportsModule() {
    }
    ReportsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes),
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                ngx_spinner__WEBPACK_IMPORTED_MODULE_8__["NgxSpinnerModule"],
                ngx_pagination__WEBPACK_IMPORTED_MODULE_3__["NgxPaginationModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
                _swimlane_ngx_charts__WEBPACK_IMPORTED_MODULE_6__["NgxChartsModule"],
                ng2_tel_input__WEBPACK_IMPORTED_MODULE_5__["Ng2TelInputModule"],
                primeng_primeng__WEBPACK_IMPORTED_MODULE_7__["CalendarModule"],
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_15__["TranslateModule"]
            ],
            declarations: [
                _reports_component__WEBPACK_IMPORTED_MODULE_9__["ReportsComponent"],
                _seller_seller_component__WEBPACK_IMPORTED_MODULE_10__["SellerComponent"],
                _buyer_buyer_component__WEBPACK_IMPORTED_MODULE_11__["BuyerComponent"],
                _notary_notary_component__WEBPACK_IMPORTED_MODULE_12__["NotaryComponent"],
                _bank_bank_component__WEBPACK_IMPORTED_MODULE_13__["BankComponent"]
            ]
        })
    ], ReportsModule);
    return ReportsModule;
}());



/***/ }),

/***/ "./src/app/layout/reports/seller/seller.component.css":
/*!************************************************************!*\
  !*** ./src/app/layout/reports/seller/seller.component.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9yZXBvcnRzL3NlbGxlci9zZWxsZXIuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/layout/reports/seller/seller.component.html":
/*!*************************************************************!*\
  !*** ./src/app/layout/reports/seller/seller.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container-fluid\">\n  <div class=\"row\">\n      <div class=\"col-12\">\n        <div class=\"title-group\">\n          <h5>{{'reports.label' | translate}} - {{'reports.seller' | translate}}</h5>\n        </div>\n      </div>\n  </div>\n\n<div class=\"white-bg marginT15 padding15\">\n    <div class=\"page-title-4\">\n      <h3>{{'reports.statsAndTrendAnalytics' | translate}}</h3>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-lg-4 col-md-4 col-sm-4 col-12\"></div>\n        <div class=\"col-lg-8 col-md-8 col-sm-8 col-12\">\n        <!-- <hr style=\"margin-top:0;\"> -->\n        <!-- From: <input class=\"date-input\" type=\"date\" [ngModel] =\"parameter.min | date:'yyyy-MM-dd'\" max=\"{{today| date:'yyyy-MM-dd'}}\" (ngModelChange)=\"parameter.min = $event; parameter.max=''\" />\n            To: <input class=\"date-input\" type=\"date\" [ngModel] =\"parameter.max | date:'yyyy-MM-dd'\" min=\"{{parameter.min | date:'yyyy-MM-dd'}}\" max=\"{{today| date:'yyyy-MM-dd'}}\" (ngModelChange)=\"parameter.max = $event\" /> -->\n            \n        <!-- <div class=\"pull-right btn-cont\">\n            From: <p-calendar [(ngModel)]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2040\"></p-calendar>\n            To: <p-calendar [(ngModel)]=\"parameter.max\" [minDate]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2040\"></p-calendar>\n            <button class=\"btn btn-calender new-btn\" href=\"javascript://\" (click)=\"getReportData()\"\n                [disabled]=\"!parameter.min || !parameter.max\">Apply</button>\n        </div> -->\n\n\n        <div class=\"pull-right row\">\n            <div class=\"col-lg-4 col-md-4 col-sm-5 col-5\">\n              <div class=\"form-group marginB0\">\n                  <label>{{'reports.from' | translate}}:</label>\n                  <p-calendar [locale]=\"locale\" showIcon=\"true\" [(ngModel)]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2040\"></p-calendar>\n              </div>\n            </div>\n            <div class=\"col-lg-4 col-md-4 col-sm-5 col-5\">\n              <div class=\"form-group marginB0\">\n                  <label>{{'reports.to' | translate}}:</label>\n                  <p-calendar [locale]=\"locale\" showIcon=\"true\" [(ngModel)]=\"parameter.max\" [minDate]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2040\"></p-calendar>\n              </div>\n            </div>\n            <div class=\"col-lg-4 col-md-4 col-sm-2 col-5\">\n              <div class=\"form-group btn-cont\">\n                <label class=\"addMT3\">&nbsp;</label>\n                <button class=\"btn btn-calender\" href=\"javascript://\" (click)=\"getReportData()\"\n              [disabled]=\"!parameter.min || !parameter.max\">{{'reports.apply' | translate}}</button>\n              </div>\n            </div>\n        </div>\n    </div>\n    </div>\n    <div class=\"row report-data\">\n      <div class=\"col-sm-5\">\n        <p class=\"report-data-title\">{{parameter.total>0 ? ('reports.totalSellersOnPlatform' | translate) : ('reports.totalSellerOnPlatform' | translate) }}</p>\n        <p class=\"report-data-value\">{{parameter.total}}</p>\n      </div>\n      <div class=\"col-sm-7\">\n          <div class=\"row\">\n              <div class=\"col-sm-6\">\n                  <span class=\"report-label report-green\">&nbsp;</span> <span> {{'reports.signUp' | translate}} ({{totalSignUpCount}})</span>\n              </div>\n              <div class=\"col-sm-6\">\n                  <span class=\"report-label report-blue\">&nbsp;</span> <span> {{'reports.addedProperty' | translate}} ({{totalAddedProperty}})</span>\n              </div>\n          </div>\n          <div class=\"row marginT15\">\n              <div class=\"col-sm-6\">\n                  <span class=\"report-label report-red\">&nbsp;</span> <span> {{'reports.approved' | translate}} ({{totalApproved}})</span>\n              </div>\n              <div class=\"col-sm-6\">\n                  <span class=\"report-label report-yellow\">&nbsp;</span> <span> {{'reports.sold' | translate}} ({{totalSold}})</span>\n              </div>\n          </div>\n      </div>\n    </div>\n    <div class=\"graph-area\">\n      <ngx-charts-bar-vertical-2d\n      [scheme]=\"colorScheme\"\n      [results]=\"chartView\"\n      [gradient]=\"false\"\n      [xAxis]=\"true\"\n      [yAxis]=\"true\"\n      [barPadding]=\"2\"\n      [groupPadding]=\"4\"\n      [legend]=\"false\"\n      [animations]=\"true\"\n      (select)=\"onSelect($event)\">\n    </ngx-charts-bar-vertical-2d>\n\n    </div>\n  </div>\n    \n</div>"

/***/ }),

/***/ "./src/app/layout/reports/seller/seller.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/layout/reports/seller/seller.component.ts ***!
  \***********************************************************/
/*! exports provided: SellerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SellerComponent", function() { return SellerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SellerComponent = /** @class */ (function () {
    function SellerComponent(admin, spinner, translate) {
        this.admin = admin;
        this.spinner = spinner;
        this.translate = translate;
        this.parameter = {};
        this.today = new Date();
        this.chartView = [];
        this.colorScheme = {
            domain: ['#4eb96f', '#4a85ff', '#ee7b7c', '#f5d05c']
        };
        // Object.assign(this, this.chartView);
    }
    SellerComponent.prototype.onSelect = function (event) { };
    SellerComponent.prototype.ngOnInit = function () {
        this.locale = {
            firstDayOfWeek: 0,
            dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
            dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
            dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
            monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
            monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun',
                'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
            today: 'Hoy',
            clear: 'Clara',
            dateFormat: 'mm/dd/yy',
            weekHeader: 'Wk'
        };
        var date = new Date();
        // this.parameter.min = new Date(date.getFullYear() + '-' + '01' + '-' + '01');
        // this.parameter.max = date;
        // this.parameter.min = moment(date.getFullYear() + '-' + '01' + '-' + '01').format('YYYY-MM-DD');
        // this.parameter.max = moment().format('YYYY-MM-DD');
        this.parameter.min = moment__WEBPACK_IMPORTED_MODULE_2__().subtract(12, 'months').toDate();
        this.parameter.max = moment__WEBPACK_IMPORTED_MODULE_2__().toDate();
        this.getReportData();
    };
    SellerComponent.prototype.getReportData = function () {
        var _this = this;
        this.totalSignUpCount = 0;
        this.totalAddedProperty = 0;
        this.totalApproved = 0;
        this.totalSold = 0;
        // const input = {start_date: this.parameter.min, end_date: this.parameter.max};
        var input = { start_date: moment__WEBPACK_IMPORTED_MODULE_2__(this.parameter.min).format('YYYY-MM-DD'), end_date: moment__WEBPACK_IMPORTED_MODULE_2__(this.parameter.max).format('YYYY-MM-DD') };
        this.spinner.show();
        this.admin.postDataApi('reports/sellers', input).subscribe(function (r) {
            _this.spinner.hide();
            _this.parameter.items = r.data;
            var data = [];
            _this.parameter.items.forEach(function (element) {
                _this.totalSignUpCount = _this.totalSignUpCount + element.signup_count;
                _this.totalAddedProperty = _this.totalAddedProperty + element.property_count;
                _this.totalApproved = _this.totalApproved + element.property_approved;
                _this.totalSold = _this.totalSold + element.property_sold;
                data.push({
                    'name': element.month_name + ', ' + element.year,
                    'series': [
                        {
                            'name': _this.translate.instant('reports.signUp'),
                            'value': element.signup_count
                        }, {
                            'name': _this.translate.instant('reports.addedProperty'),
                            'value': element.property_count
                        }, {
                            'name': _this.translate.instant('reports.approved'),
                            'value': element.property_approved
                        }, {
                            'name': _this.translate.instant('reports.sold'),
                            'value': element.property_sold
                        }
                    ]
                });
            });
            _this.parameter.total = _this.totalSignUpCount + _this.totalAddedProperty + _this.totalApproved + _this.totalSold;
            _this.chartView = data;
            // Object.assign(this, this.chartView);
        }, function (error) {
            _this.spinner.hide();
        });
    };
    SellerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-seller',
            template: __webpack_require__(/*! ./seller.component.html */ "./src/app/layout/reports/seller/seller.component.html"),
            styles: [__webpack_require__(/*! ./seller.component.css */ "./src/app/layout/reports/seller/seller.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_1__["AdminService"], ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__["TranslateService"]])
    ], SellerComponent);
    return SellerComponent;
}());



/***/ })

}]);
//# sourceMappingURL=reports-reports-module.js.map