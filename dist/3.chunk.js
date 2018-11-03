webpackJsonp([3],{

/***/ "../../../../../src/app/layout/reports/bank/bank.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/reports/bank/bank.component.html":
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<div class=\"container-fluid\">\n    <div class=\"row\">\n        <div class=\"col-12\">\n          <div class=\"title-group\">\n              <h5>Report - Bank</h5>\n          </div>\n        </div>\n    </div>\n  \n  <div class=\"white-bg marginT15 padding15\">\n      <div class=\"page-title-4\">\n          <h3>Stats and Trend Analytics</h3>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-12\">\n          <hr style=\"margin-top:0;\">\n          <div class=\"pull-right btn-cont\">\n            From: <p-calendar [(ngModel)]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n            To: <p-calendar [(ngModel)]=\"parameter.max\" [minDate]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n              <!-- From: <input class=\"date-input\" type=\"date\" [ngModel] =\"parameter.min | date:'yyyy-MM-dd'\" max=\"{{today| date:'yyyy-MM-dd'}}\" (ngModelChange)=\"parameter.min = $event; parameter.max=''\" />\n              To: <input class=\"date-input\" type=\"date\" [ngModel] =\"parameter.max | date:'yyyy-MM-dd'\" min=\"{{parameter.min | date:'yyyy-MM-dd'}}\" max=\"{{today| date:'yyyy-MM-dd'}}\" (ngModelChange)=\"parameter.max = $event\" /> -->\n              <button class=\"btn btn-primary-new new-btn\" href=\"javascript://\" (click)=\"getReportData()\"\n                  [disabled]=\"!parameter.min || !parameter.max\">Go</button>\n          </div>\n      </div>\n      </div>\n      <div class=\"row report-data\">\n        <div class=\"col-sm-5\">\n          <p class=\"report-data-title\">Total {{parameter.total>0 ? 'Banks' : 'Bank'}} On Platform</p>\n          <p class=\"report-data-value\">{{parameter.total}}</p>\n        </div>\n        <div class=\"col-sm-7\">\n            <div class=\"row\">\n                <div class=\"col-sm-6\">\n                    <span class=\"report-label report-red\">&nbsp;</span> <span> Sign Up ({{totalSignUpCount}})</span>\n                </div>\n                <div class=\"col-sm-6\">\n                    <span class=\"report-label report-yellow\">&nbsp;</span> <span> Properties ({{totalPropertyCount}})</span>\n                </div>\n            </div>\n        </div>\n      </div>\n      <div class=\"graph-area\">\n        <ngx-charts-bar-vertical-2d\n        [scheme]=\"colorScheme\"\n        [results]=\"chartView\"\n        [gradient]=\"false\"\n        [xAxis]=\"true\"\n        [yAxis]=\"true\"\n        [barPadding]=\"2\"\n        [groupPadding]=\"4\"\n        [legend]=\"false\"\n        [animations]=\"true\"\n        (select)=\"onSelect($event)\">\n      </ngx-charts-bar-vertical-2d>\n  \n      </div>\n    </div>\n      \n  </div>"

/***/ }),

/***/ "../../../../../src/app/layout/reports/bank/bank.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BankComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var BankComponent = /** @class */ (function () {
    function BankComponent(admin) {
        this.admin = admin;
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
        var date = new Date();
        this.parameter.min = new Date(date.getFullYear() + '-' + '01' + '-' + '01');
        this.parameter.max = date;
        // this.parameter.min = moment(date.getFullYear() + '-' + '01' + '-' + '01').format('YYYY-MM-DD');
        // this.parameter.max = moment().format('YYYY-MM-DD');
        this.getReportData();
    };
    BankComponent.prototype.getReportData = function () {
        var _this = this;
        this.totalSignUpCount = 0;
        this.totalPropertyCount = 0;
        // const input = {start_date: this.parameter.min, end_date: this.parameter.max};
        var input = { start_date: __WEBPACK_IMPORTED_MODULE_2_moment__(this.parameter.min).format('YYYY-MM-DD'), end_date: __WEBPACK_IMPORTED_MODULE_2_moment__(this.parameter.max).format('YYYY-MM-DD') };
        this.parameter.loading = true;
        this.admin.postDataApi('reports/bank', input).subscribe(function (r) {
            _this.parameter.loading = false;
            _this.parameter.items = r.data;
            var data = [];
            _this.parameter.items.forEach(function (element) {
                _this.totalSignUpCount = _this.totalSignUpCount + element.signup_count;
                _this.totalPropertyCount = _this.totalPropertyCount + element.property_count;
                data.push({
                    'name': element.month_name + ', ' + element.year,
                    'series': [
                        {
                            'name': 'Sign Up',
                            'value': element.signup_count
                        }, {
                            'name': 'Properties',
                            'value': element.property_count
                        }
                    ]
                });
            });
            _this.parameter.total = _this.totalSignUpCount + _this.totalPropertyCount;
            _this.chartView = data;
            // Object.assign(this, this.chartView);
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    var _a;
    BankComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-bank',
            template: __webpack_require__("../../../../../src/app/layout/reports/bank/bank.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/reports/bank/bank.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" ? _a : Object])
    ], BankComponent);
    return BankComponent;
}());

//# sourceMappingURL=bank.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/reports/buyer/buyer.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/reports/buyer/buyer.component.html":
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<div class=\"container-fluid\">\n    <div class=\"row\">\n        <div class=\"col-12\">\n          <div class=\"title-group\">\n              <h5>Report - Buyer</h5>\n          </div>\n        </div>\n    </div>\n  \n  <div class=\"white-bg marginT15 padding15\">\n      <div class=\"page-title-4\">\n          <h3>Stats and Trend Analytics</h3>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-12\">\n          <hr style=\"margin-top:0;\">\n          <div class=\"pull-right btn-cont\">\n              <!-- From: <input class=\"date-input\" type=\"date\" [ngModel] =\"parameter.min | date:'yyyy-MM-dd'\" max=\"{{today| date:'yyyy-MM-dd'}}\" (ngModelChange)=\"parameter.min = $event; parameter.max=''\" />\n              To: <input class=\"date-input\" type=\"date\" [ngModel] =\"parameter.max | date:'yyyy-MM-dd'\" min=\"{{parameter.min | date:'yyyy-MM-dd'}}\" max=\"{{today| date:'yyyy-MM-dd'}}\" (ngModelChange)=\"parameter.max = $event\" /> -->\n              From: <p-calendar [(ngModel)]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n              To: <p-calendar [(ngModel)]=\"parameter.max\" [minDate]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n              <button class=\"btn btn-primary-new new-btn\" href=\"javascript://\" (click)=\"getReportData()\"\n                  [disabled]=\"!parameter.min || !parameter.max\">Go</button>\n          </div>\n      </div>\n      </div>\n      <div class=\"row report-data\">\n        <div class=\"col-sm-5\">\n          <p class=\"report-data-title\">Total {{parameter.total>0 ? 'Buyers' : 'Buyer'}} On Platform</p>\n          <p class=\"report-data-value\">{{parameter.total}}</p>\n        </div>\n        <div class=\"col-sm-7\">\n            <div class=\"row\">\n                <div class=\"col-sm-6\">\n                    <span class=\"report-label report-green\">&nbsp;</span> <span> Sign Up ({{totalSignUpCount}})</span>\n                </div>\n                <div class=\"col-sm-6\">\n                    <span class=\"report-label report-blue\">&nbsp;</span> <span> Added Information ({{totalInfoCount}})</span>\n                </div>\n            </div>\n            <div class=\"row marginT15\">\n                <div class=\"col-sm-6\">\n                    <span class=\"report-label report-red\">&nbsp;</span> <span> Brokers Assigned ({{totalBrokerCount}})</span>\n                </div>\n                <div class=\"col-sm-6\">\n                    <span class=\"report-label report-yellow\">&nbsp;</span> <span> Sold ({{totalSold}})</span>\n                </div>\n            </div>\n        </div>\n      </div>\n      <div class=\"graph-area\">\n        <ngx-charts-bar-vertical-2d\n        [scheme]=\"colorScheme\"\n        [results]=\"chartView\"\n        [gradient]=\"false\"\n        [xAxis]=\"true\"\n        [yAxis]=\"true\"\n        [barPadding]=\"2\"\n        [groupPadding]=\"4\"\n        [legend]=\"false\"\n        [animations]=\"true\"\n        (select)=\"onSelect($event)\">\n      </ngx-charts-bar-vertical-2d>\n  \n      </div>\n    </div>\n      \n  </div>"

/***/ }),

/***/ "../../../../../src/app/layout/reports/buyer/buyer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BuyerComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var BuyerComponent = /** @class */ (function () {
    function BuyerComponent(admin) {
        this.admin = admin;
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
        var date = new Date();
        this.parameter.min = new Date(date.getFullYear() + '-' + '01' + '-' + '01');
        this.parameter.max = date;
        // this.parameter.min = moment(date.getFullYear() + '-' + '01' + '-' + '01').format('YYYY-MM-DD');
        // this.parameter.max = moment().format('YYYY-MM-DD');
        this.getReportData();
    };
    BuyerComponent.prototype.getReportData = function () {
        var _this = this;
        this.totalSignUpCount = 0;
        this.totalInfoCount = 0;
        this.totalBrokerCount = 0;
        this.totalSold = 0;
        // const input = {start_date: this.parameter.min, end_date: this.parameter.max};
        var input = { start_date: __WEBPACK_IMPORTED_MODULE_2_moment__(this.parameter.min).format('YYYY-MM-DD'), end_date: __WEBPACK_IMPORTED_MODULE_2_moment__(this.parameter.max).format('YYYY-MM-DD') };
        this.parameter.loading = true;
        this.admin.postDataApi('reports/buyers', input).subscribe(function (r) {
            _this.parameter.loading = false;
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
                            'name': 'Sign Up',
                            'value': element.signup_count
                        }, {
                            'name': 'Added Information',
                            'value': element.info_count
                        }, {
                            'name': 'Brokers Assigned',
                            'value': element.broker_count
                        }, {
                            'name': 'Sold',
                            'value': element.property_sold
                        }
                    ]
                });
            });
            _this.parameter.total = _this.totalSignUpCount + _this.totalInfoCount + _this.totalBrokerCount + _this.totalSold;
            _this.chartView = data;
            // Object.assign(this, this.chartView);
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    var _a;
    BuyerComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-buyer',
            template: __webpack_require__("../../../../../src/app/layout/reports/buyer/buyer.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/reports/buyer/buyer.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" ? _a : Object])
    ], BuyerComponent);
    return BuyerComponent;
}());

//# sourceMappingURL=buyer.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/reports/notary/notary.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/reports/notary/notary.component.html":
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<div class=\"container-fluid\">\n    <div class=\"row\">\n        <div class=\"col-12\">\n          <div class=\"title-group\">\n              <h5>Report - Notary</h5>\n          </div>\n        </div>\n    </div>\n  \n  <div class=\"white-bg marginT15 padding15\">\n      <div class=\"page-title-4\">\n          <h3>Stats and Trend Analytics</h3>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-12\">\n          <hr style=\"margin-top:0;\">\n          <div class=\"pull-right btn-cont\">\n              <!-- From: <input class=\"date-input\" type=\"date\" [ngModel] =\"parameter.min | date:'yyyy-MM-dd'\" max=\"{{today| date:'yyyy-MM-dd'}}\" (ngModelChange)=\"parameter.min = $event; parameter.max=''\" />\n              To: <input class=\"date-input\" type=\"date\" [ngModel] =\"parameter.max | date:'yyyy-MM-dd'\" min=\"{{parameter.min | date:'yyyy-MM-dd'}}\" max=\"{{today| date:'yyyy-MM-dd'}}\" (ngModelChange)=\"parameter.max = $event\" /> -->\n              From: <p-calendar [(ngModel)]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n              To: <p-calendar [(ngModel)]=\"parameter.max\" [minDate]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n              <button class=\"btn btn-primary-new new-btn\" href=\"javascript://\" (click)=\"getReportData()\"\n                  [disabled]=\"!parameter.min || !parameter.max\">Go</button>\n          </div>\n      </div>\n      </div>\n      <div class=\"row report-data\">\n        <div class=\"col-sm-5\">\n          <p class=\"report-data-title\">Total {{parameter.total>0 ? 'Notaries' : 'Notary'}} On Platform</p>\n          <p class=\"report-data-value\">{{parameter.total}}</p>\n        </div>\n        <div class=\"col-sm-7\">\n            <div class=\"row\">\n                <div class=\"col-sm-6\">\n                    <span class=\"report-label report-green\">&nbsp;</span> <span> Sign Up ({{totalSignUpCount}})</span>\n                </div>\n                <div class=\"col-sm-6\">\n                    <span class=\"report-label report-blue\">&nbsp;</span> <span> Properties ({{totalPropertyCount}})</span>\n                </div>\n            </div>\n        </div>\n      </div>\n      <div class=\"graph-area\">\n        <ngx-charts-bar-vertical-2d\n        [scheme]=\"colorScheme\"\n        [results]=\"chartView\"\n        [gradient]=\"false\"\n        [xAxis]=\"true\"\n        [yAxis]=\"true\"\n        [barPadding]=\"2\"\n        [groupPadding]=\"4\"\n        [legend]=\"false\"\n        [animations]=\"true\"\n        (select)=\"onSelect($event)\">\n      </ngx-charts-bar-vertical-2d>\n  \n      </div>\n    </div>\n      \n  </div>"

/***/ }),

/***/ "../../../../../src/app/layout/reports/notary/notary.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotaryComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NotaryComponent = /** @class */ (function () {
    function NotaryComponent(admin) {
        this.admin = admin;
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
        var date = new Date();
        this.parameter.min = new Date(date.getFullYear() + '-' + '01' + '-' + '01');
        this.parameter.max = date;
        // this.parameter.min = moment(date.getFullYear() + '-' + '01' + '-' + '01').format('YYYY-MM-DD');
        // this.parameter.max = moment().format('YYYY-MM-DD');
        this.getReportData();
    };
    NotaryComponent.prototype.getReportData = function () {
        var _this = this;
        this.totalSignUpCount = 0;
        this.totalPropertyCount = 0;
        // const input = {start_date: this.parameter.min, end_date: this.parameter.max};
        var input = { start_date: __WEBPACK_IMPORTED_MODULE_2_moment__(this.parameter.min).format('YYYY-MM-DD'), end_date: __WEBPACK_IMPORTED_MODULE_2_moment__(this.parameter.max).format('YYYY-MM-DD') };
        this.parameter.loading = true;
        this.admin.postDataApi('reports/noatary', input).subscribe(function (r) {
            _this.parameter.loading = false;
            _this.parameter.items = r.data;
            var data = [];
            _this.parameter.items.forEach(function (element) {
                _this.totalSignUpCount = _this.totalSignUpCount + element.signup_count;
                _this.totalPropertyCount = _this.totalPropertyCount + element.property_count;
                data.push({
                    'name': element.month_name + ', ' + element.year,
                    'series': [
                        {
                            'name': 'Sign Up',
                            'value': element.signup_count
                        }, {
                            'name': 'Properties',
                            'value': element.property_count
                        }
                    ]
                });
            });
            _this.parameter.total = _this.totalSignUpCount + _this.totalPropertyCount;
            _this.chartView = data;
            // Object.assign(this, this.chartView);
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    var _a;
    NotaryComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-notary',
            template: __webpack_require__("../../../../../src/app/layout/reports/notary/notary.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/reports/notary/notary.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" ? _a : Object])
    ], NotaryComponent);
    return NotaryComponent;
}());

//# sourceMappingURL=notary.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/reports/reports.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/reports/reports.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- \n<div class=\"container-fluid\">\n  <div class=\"row\">\n      <div class=\"col-12\">\n        <div class=\"title-group\">\n            <h5>Reports - Seller</h5>\n            \n        </div>\n      </div>\n    \n  </div>\n\n  <div class=\"white-bg marginT15 padding15\">\n    <div class=\"page-title-4\">\n        <h3>Stats and Trend Analytics</h3>\n      </div>\n      <div class=\"graph-area\">\n        <img src=\"assets/img/graph-img.png\" alt=\"img\">\n\n      </div>\n  </div>\n    \n</div> -->"

/***/ }),

/***/ "../../../../../src/app/layout/reports/reports.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ReportsComponent = /** @class */ (function () {
    function ReportsComponent() {
    }
    ReportsComponent.prototype.ngOnInit = function () {
    };
    ReportsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-reports',
            template: __webpack_require__("../../../../../src/app/layout/reports/reports.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/reports/reports.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], ReportsComponent);
    return ReportsComponent;
}());

//# sourceMappingURL=reports.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/reports/reports.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_loading__ = __webpack_require__("../../../../ngx-loading/ngx-loading/ngx-loading.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_pagination__ = __webpack_require__("../../../../ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_tel_input__ = __webpack_require__("../../../../ng2-tel-input/ng2-tel-input.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_tel_input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ng2_tel_input__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__reports_component__ = __webpack_require__("../../../../../src/app/layout/reports/reports.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__seller_seller_component__ = __webpack_require__("../../../../../src/app/layout/reports/seller/seller.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__buyer_buyer_component__ = __webpack_require__("../../../../../src/app/layout/reports/buyer/buyer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__notary_notary_component__ = __webpack_require__("../../../../../src/app/layout/reports/notary/notary.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__bank_bank_component__ = __webpack_require__("../../../../../src/app/layout/reports/bank/bank.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__guards_acl_user_guard__ = __webpack_require__("../../../../../src/app/guards/acl-user.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__swimlane_ngx_charts__ = __webpack_require__("../../../../@swimlane/ngx-charts/release/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__swimlane_ngx_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13__swimlane_ngx_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_primeng_primeng__ = __webpack_require__("../../../../primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_primeng_primeng__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportsModule", function() { return ReportsModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















var routes = [
    { path: 'seller', component: __WEBPACK_IMPORTED_MODULE_8__seller_seller_component__["a" /* SellerComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_12__guards_acl_user_guard__["a" /* AclUserGuard */]], data: { roles: ['Reports', 'can_read', ''] } },
    { path: 'buyer', component: __WEBPACK_IMPORTED_MODULE_9__buyer_buyer_component__["a" /* BuyerComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_12__guards_acl_user_guard__["a" /* AclUserGuard */]], data: { roles: ['Reports', 'can_read', ''] } },
    { path: 'notary', component: __WEBPACK_IMPORTED_MODULE_10__notary_notary_component__["a" /* NotaryComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_12__guards_acl_user_guard__["a" /* AclUserGuard */]], data: { roles: ['Reports', 'can_read', ''] } },
    { path: 'bank', component: __WEBPACK_IMPORTED_MODULE_11__bank_bank_component__["a" /* BankComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_12__guards_acl_user_guard__["a" /* AclUserGuard */]], data: { roles: ['Reports', 'can_read', ''] } }
];
// const routes: Routes = [
//   { path: 'seller', component: SellerComponent,
//     canActivate: [AuthGuard], data: {roles: ['Reports', 'can_read', '']}},
//   { path: 'buyer', component: BuyerComponent,
//     canActivate: [AuthGuard], data: {roles: ['Reports', 'can_read', '']}},
//   { path: 'notary', component: NotaryComponent,
//     canActivate: [AuthGuard], data: {roles: ['Reports', 'can_read', '']}},
//   { path: 'bank', component: BankComponent,
//     canActivate: [AuthGuard], data: {roles: ['Reports', 'can_read', '']}}
// ];
var ReportsModule = /** @class */ (function () {
    function ReportsModule() {
    }
    ReportsModule = __decorate([
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
                __WEBPACK_IMPORTED_MODULE_13__swimlane_ngx_charts__["NgxChartsModule"],
                __WEBPACK_IMPORTED_MODULE_6_ng2_tel_input__["Ng2TelInputModule"],
                __WEBPACK_IMPORTED_MODULE_14_primeng_primeng__["CalendarModule"]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__reports_component__["a" /* ReportsComponent */],
                __WEBPACK_IMPORTED_MODULE_8__seller_seller_component__["a" /* SellerComponent */],
                __WEBPACK_IMPORTED_MODULE_9__buyer_buyer_component__["a" /* BuyerComponent */],
                __WEBPACK_IMPORTED_MODULE_10__notary_notary_component__["a" /* NotaryComponent */],
                __WEBPACK_IMPORTED_MODULE_11__bank_bank_component__["a" /* BankComponent */]
            ]
        })
    ], ReportsModule);
    return ReportsModule;
}());

//# sourceMappingURL=reports.module.js.map

/***/ }),

/***/ "../../../../../src/app/layout/reports/seller/seller.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/reports/seller/seller.component.html":
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<div class=\"container-fluid\">\n  <div class=\"row\">\n      <div class=\"col-12\">\n        <div class=\"title-group\">\n            <h5>Report - Seller</h5>\n        </div>\n      </div>\n  </div>\n\n<div class=\"white-bg marginT15 padding15\">\n    <div class=\"page-title-4\">\n        <h3>Stats and Trend Analytics</h3>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-12\">\n        <hr style=\"margin-top:0;\">\n        <div class=\"pull-right btn-cont\">\n            <!-- From: <input class=\"date-input\" type=\"date\" [ngModel] =\"parameter.min | date:'yyyy-MM-dd'\" max=\"{{today| date:'yyyy-MM-dd'}}\" (ngModelChange)=\"parameter.min = $event; parameter.max=''\" />\n            To: <input class=\"date-input\" type=\"date\" [ngModel] =\"parameter.max | date:'yyyy-MM-dd'\" min=\"{{parameter.min | date:'yyyy-MM-dd'}}\" max=\"{{today| date:'yyyy-MM-dd'}}\" (ngModelChange)=\"parameter.max = $event\" /> -->\n            From: <p-calendar [(ngModel)]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n            To: <p-calendar [(ngModel)]=\"parameter.max\" [minDate]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n            <button class=\"btn btn-primary-new new-btn\" href=\"javascript://\" (click)=\"getReportData()\"\n                [disabled]=\"!parameter.min || !parameter.max\">Go</button>\n        </div>\n    </div>\n    </div>\n    <div class=\"row report-data\">\n      <div class=\"col-sm-5\">\n        <p class=\"report-data-title\">Total {{parameter.total>0 ? 'Sellers' : 'Seller'}} On Platform</p>\n        <p class=\"report-data-value\">{{parameter.total}}</p>\n      </div>\n      <div class=\"col-sm-7\">\n          <div class=\"row\">\n              <div class=\"col-sm-6\">\n                  <span class=\"report-label report-green\">&nbsp;</span> <span> Sign Up ({{totalSignUpCount}})</span>\n              </div>\n              <div class=\"col-sm-6\">\n                  <span class=\"report-label report-blue\">&nbsp;</span> <span> Added Property ({{totalAddedProperty}})</span>\n              </div>\n          </div>\n          <div class=\"row marginT15\">\n              <div class=\"col-sm-6\">\n                  <span class=\"report-label report-red\">&nbsp;</span> <span> Approved ({{totalApproved}})</span>\n              </div>\n              <div class=\"col-sm-6\">\n                  <span class=\"report-label report-yellow\">&nbsp;</span> <span> Sold ({{totalSold}})</span>\n              </div>\n          </div>\n      </div>\n    </div>\n    <div class=\"graph-area\">\n      <ngx-charts-bar-vertical-2d\n      [scheme]=\"colorScheme\"\n      [results]=\"chartView\"\n      [gradient]=\"false\"\n      [xAxis]=\"true\"\n      [yAxis]=\"true\"\n      [barPadding]=\"2\"\n      [groupPadding]=\"4\"\n      [legend]=\"false\"\n      [animations]=\"true\"\n      (select)=\"onSelect($event)\">\n    </ngx-charts-bar-vertical-2d>\n\n    </div>\n  </div>\n    \n</div>"

/***/ }),

/***/ "../../../../../src/app/layout/reports/seller/seller.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SellerComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SellerComponent = /** @class */ (function () {
    function SellerComponent(admin) {
        this.admin = admin;
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
        var date = new Date();
        this.parameter.min = new Date(date.getFullYear() + '-' + '01' + '-' + '01');
        this.parameter.max = date;
        // this.parameter.min = moment(date.getFullYear() + '-' + '01' + '-' + '01').format('YYYY-MM-DD');
        // this.parameter.max = moment().format('YYYY-MM-DD');
        this.getReportData();
    };
    SellerComponent.prototype.getReportData = function () {
        var _this = this;
        this.totalSignUpCount = 0;
        this.totalAddedProperty = 0;
        this.totalApproved = 0;
        this.totalSold = 0;
        // const input = {start_date: this.parameter.min, end_date: this.parameter.max};
        var input = { start_date: __WEBPACK_IMPORTED_MODULE_2_moment__(this.parameter.min).format('YYYY-MM-DD'), end_date: __WEBPACK_IMPORTED_MODULE_2_moment__(this.parameter.max).format('YYYY-MM-DD') };
        this.parameter.loading = true;
        this.admin.postDataApi('reports/sellers', input).subscribe(function (r) {
            _this.parameter.loading = false;
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
                            'name': 'Sign Up',
                            'value': element.signup_count
                        }, {
                            'name': 'Added Property',
                            'value': element.property_count
                        }, {
                            'name': 'Approved',
                            'value': element.property_approved
                        }, {
                            'name': 'Sold',
                            'value': element.property_sold
                        }
                    ]
                });
            });
            _this.parameter.total = _this.totalSignUpCount + _this.totalAddedProperty + _this.totalApproved + _this.totalSold;
            _this.chartView = data;
            // Object.assign(this, this.chartView);
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    var _a;
    SellerComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-seller',
            template: __webpack_require__("../../../../../src/app/layout/reports/seller/seller.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/reports/seller/seller.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" ? _a : Object])
    ], SellerComponent);
    return SellerComponent;
}());

//# sourceMappingURL=seller.component.js.map

/***/ })

});
//# sourceMappingURL=3.chunk.js.map