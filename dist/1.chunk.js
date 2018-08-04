webpackJsonp([1],{

/***/ "../../../../../src/app/layout/leads/csr-buyer/csr-buyer.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/leads/csr-buyer/csr-buyer.component.html":
/***/ (function(module, exports) {

module.exports = "\n<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n\n<div class=\"container-fluid\">\n  <div class=\"row\">\n      <div class=\"col-md-3\">\n        <a class=\"view-all-2\" href=\"javascript://\"><i class=\"fa fa-angle-left\"></i><span>View all</span></a>\n      </div>\n      <div class=\"col-md-9\">\n        <div class=\"cust-tabs-2\">\n            <ul class=\"nav nav-tabs\">\n              <li class=\"nav-item\">\n                  <a class=\"nav-link\" [ngClass]=\"{'active':parameter.flag==1}\" (click)=\"changeFlag(1)\" >This Week</a>\n              </li>\n              <li class=\"nav-item\">\n                  <a class=\"nav-link\" [ngClass]=\"{'active':parameter.flag==2}\" (click)=\"changeFlag(2)\" >This Month</a>\n              </li>\n              <li class=\"nav-item\">\n                  <a class=\"nav-link\" [ngClass]=\"{'active':parameter.flag==3}\" (click)=\"changeFlag(3)\" >Last Month</a>\n              </li>\n              <li class=\"nav-item\">\n                  <a class=\"nav-link\" [ngClass]=\"{'active':parameter.flag==4}\" (click)=\"changeFlag(4)\" >Lifetime</a>\n              </li>\n              <li class=\"nav-item\">\n                  <a class=\"nav-link\" [ngClass]=\"{'active':parameter.flag==5}\" (click)=\"changeFlag(5)\" >Custom</a>\n              </li>\n            </ul>\n        </div>\n      </div>\n      <div class=\"col-12\">\n        <hr style=\"margin-top:0;\">\n      </div>\n  </div>\n\n  <div class=\"sigle-row-table\">\n    <table class=\"table table-striped\">\n        <tr>\n          <td> <img class=\"rounded-circle\" src=\"./../../../assets/img/default_img.png\" alt=\"img\"></td>\n          <td class=\"text-left\">\n              <span class=\"name\">Lillian Russell</span>\n          </td>\n          <td class=\"text-left\">\n              728-111-1874\n          </td>\n          <td class=\"text-left\">\n              eunice_aufderhar@yahoo.com\n          </td>\n          <td>\n              14\n          </td>\n          <td>\n              <a href=\"javascript://\" class=\"icon-block edit-icon\"><img src=\"./../../../assets/img/edit.png\" alt=\"img\"></a>\n              <a href=\"javascript://\" class=\"icon-block block-icon\"><img src=\"./../../../assets/img/unblock.png\" alt=\"img\"></a>\n          </td>\n        </tr>\n    </table>\n  </div>\n\n  <div class=\"row\">\n      <div class=\"col-lg-4 col-md-12 col-sm-12 col-12\">\n        <div class=\"info-box\">\n            <div class=\"one-row\">\n              <div class=\"o-block\">\n                  <h5>Buildings</h5>\n                  <small>Requests Pending</small>\n              </div>\n              <div class=\"o-block\">\n                  <a class=\"view-all\" href=\"javascript://\">View All</a>\n                  <h4>15</h4>\n              </div>\n            </div>\n            <div class=\"three-row\">\n              <div class=\"t-block\">\n                  <p><strong>3</strong></p>\n                  <p>Admin</p>\n              </div>\n              <div class=\"t-block\">\n                  <p><strong>6</strong></p>\n                  <p>CSR</p>\n              </div>\n              <div class=\"t-block\">\n                  <p><strong>5</strong></p>\n                  <p>User</p>\n              </div>\n            </div>\n        </div>\n      </div>\n    <div class=\"col-lg-4 col-md-12 col-sm-12 col-12\">\n        <div class=\"four-block\">\n            <div class=\"d-flex\">\n              <div class=\"f-block approved\">\n                  <h5>Approved</h5>\n                  <h3>25</h3>\n              </div>\n              <div class=\"f-block unapproved\">\n                  <h5>Unapproved</h5>\n                  <h3>02</h3>\n              </div>\n            </div>\n            <div class=\"d-flex\">\n              <div class=\"f-block pending active\">\n                  <h5>Pending</h5>\n                  <h3>01</h3>\n              </div>\n              <div class=\"f-block unapproved\">\n                  <h5>In Draft</h5>\n                  <h3>02</h3>\n              </div>\n            </div>\n        </div>\n      </div>\n      <div class=\"col-lg-4 col-md-12 col-sm-12 col-12\">\n        <div class=\"chat-msg\">\n            <div class=\"row\">\n              <div class=\"col-6\">\n                  <h5>Chat</h5>\n              </div>\n              <div class=\"col-6 text-right\"><a class=\"msg\" href=\"javascript://\">Message</a></div>\n            </div>\n            <p>Waiting for response</p>\n            <p>\n              <strong>Mario Hudson</strong>\n              When you are free to have a meeting\n              with interested customers?\n            </p>\n            <p>\n              <strong>Rosie Benson</strong>\n              Is there any availability in the localities\n              I was asking you tomorrow and also p…\n            </p>\n        </div>\n      </div>\n  </div>\n\n  <div class=\"row\">\n      <div class=\"col-12\">\n        <div class=\"spacer40\"></div>\n      </div>\n      <div class=\"col-12\">\n        <div class=\"title-group\">\n            <h5>All Leads (Information Filled)</h5>\n            <p>Showing 4 out of 4</p>\n        </div>\n      </div>\n  </div>\n\n  <div class=\"white-bg\">\n      <div class=\"tabel-section\">\n        <div class=\"table-responsive\">\n            <table class=\"table table-striped table-align-left vertical-align-top\">\n              <tr>\n                  <th>\n                    <div class=\"table-search\">\n                        <!-- <label>Image</label> -->\n                    </div>\n                  </th>\n                  <th style=\"width:20%\">\n                    <div class=\"table-search\">\n                        <label>Name</label>\n                        <input type=\"Search here\" (input)=\"changeFilter('name',$event.target.value)\">\n                    </div>\n                  </th>\n                  <th style=\"width:20%; text-align:left;\">\n                    <div class=\"table-search\">\n                        <label>Contact Number</label>\n                        <input type=\"Search here\" (input)=\"changeFilter('phone',$event.target.value)\">\n                    </div>\n                  </th>\n                  <th style=\"width:20%\">\n                    <div class=\"table-search\">\n                        <label>Email</label>\n                        <input type=\"Search here\" (input)=\"changeFilter('email',$event.target.value)\">\n                    </div>\n                  </th>\n                  <th style=\"width:10%\">\n                    Interested In\n                  </th>\n                  <th>\n                    Assignee\n                  </th>\n                  <th >\n                    <!-- Mark\n                    Complete -->\n                  </th>\n              </tr>\n              <tr *ngFor=\"let item of items| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.p, totalItems: parameter.total }\">\n                <td>\n                  <img *ngIf=\"item.image\" class=\"rounded-circle\" [src]=\"item.image\" alt=\"img\">\n                  <img *ngIf=\"!item.image\" class=\"rounded-circle\" src=\"./../../../assets/img/default_img.png\" alt=\"img\">\n                </td>\n                <td class=\"text-left\">\n                  <span class=\"name\">{{item.name}}</span>\n                </td>\n                <td class=\"text-left\" *ngIf=\"item.phone\">{{item.country_code}}-{{item.phone}}</td>\n                <td class=\"text-left\" *ngIf=\"!item.phone\">NA</td>\n                <td class=\"text-left\">{{item.email}}</td>\n                <td>2 BHK</td>\n                <td class=\"text-left\" *ngIf=\"item.admin.name\">{{item.admin.name}}</td>\n                <td class=\"text-left\" *ngIf=\"!item.admin.name\">Not Assigned</td>\n                <td>\n                  <a href=\"javascript://\" (click)=\"editUser(item)\" class=\"icon-block edit-icon\"><img src=\"./../../../../assets/img/edit.png\" alt=\"img\"></a>\n                  <a href=\"javascript://\" *ngIf=\"item.is_blocked == 1\" (click)=\"blockUnblockPopup(i, item.id, 0, parameter.type)\" title=\"Unblock user\" class=\"icon-block block-icon unblock-bg\"><img src=\"./../../../../assets/img/block.png\" alt=\"img\"></a>\n                  <a href=\"javascript://\" *ngIf=\"item.is_blocked == 0\" (click)=\"blockUnblockPopup(i, item.id, 1, parameter.type)\" title=\"Block user\" class=\"icon-block block-icon\"><img src=\"./../../../../assets/img/unblock.png\" alt=\"img\"></a>\n                </td>\n              </tr>\n            </table>\n        </div>\n      </div>\n  </div>\n\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/layout/leads/csr-buyer/csr-buyer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CsrBuyerComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CsrBuyerComponent = /** @class */ (function () {
    function CsrBuyerComponent(admin, router, constant) {
        this.admin = admin;
        this.router = router;
        this.constant = constant;
        this.parameter = {};
        this.items = [];
    }
    CsrBuyerComponent.prototype.ngOnInit = function () {
        this.parameter.page = this.constant.p;
        this.parameter.flag = 2;
        this.getListing();
    };
    CsrBuyerComponent.prototype.changeFlag = function (flag) {
        this.parameter.flag = flag;
        this.getListing();
    };
    CsrBuyerComponent.prototype.changeFilter = function (key, value) {
        this.parameter[key] = value;
        this.getListing();
    };
    CsrBuyerComponent.prototype.getListing = function () {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'leads/csr-buyer';
        var input = new FormData();
        if (this.parameter.page) {
            input.append('page', this.parameter.page.toString());
        }
        if (this.parameter.flag) {
            input.append('flag', this.parameter.flag.toString());
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
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log(success);
            _this.parameter.loading = false;
            _this.items = success.data;
            _this.parameter.total = success.total;
        }, function (error) {
            _this.parameter.loading = false;
            if (error.statusCode === 401) {
                swal('Error', error.message, 'error');
                _this.router.navigate(['']);
            }
            else {
                swal('Error', error.message, 'error');
            }
        });
    };
    var _a, _b, _c;
    CsrBuyerComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-csr-buyer',
            template: __webpack_require__("../../../../../src/app/layout/leads/csr-buyer/csr-buyer.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/leads/csr-buyer/csr-buyer.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_2__common_constants__["a" /* Constant */]]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" ? _a : Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === "function" ? _b : Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__common_constants__["a" /* Constant */]) === "function" ? _c : Object])
    ], CsrBuyerComponent);
    return CsrBuyerComponent;
}());

//# sourceMappingURL=csr-buyer.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/leads/csr-closer/csr-closer.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/leads/csr-closer/csr-closer.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  csr-closer works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/layout/leads/csr-closer/csr-closer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CsrCloserComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CsrCloserComponent = /** @class */ (function () {
    function CsrCloserComponent() {
    }
    CsrCloserComponent.prototype.ngOnInit = function () {
    };
    CsrCloserComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-csr-closer',
            template: __webpack_require__("../../../../../src/app/layout/leads/csr-closer/csr-closer.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/leads/csr-closer/csr-closer.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], CsrCloserComponent);
    return CsrCloserComponent;
}());

//# sourceMappingURL=csr-closer.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/leads/csr-seller/csr-seller.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/leads/csr-seller/csr-seller.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  csr-seller works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/layout/leads/csr-seller/csr-seller.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CsrSellerComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CsrSellerComponent = /** @class */ (function () {
    function CsrSellerComponent() {
    }
    CsrSellerComponent.prototype.ngOnInit = function () {
    };
    CsrSellerComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-csr-seller',
            template: __webpack_require__("../../../../../src/app/layout/leads/csr-seller/csr-seller.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/leads/csr-seller/csr-seller.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], CsrSellerComponent);
    return CsrSellerComponent;
}());

//# sourceMappingURL=csr-seller.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/leads/data-collector/data-collector.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/leads/data-collector/data-collector.component.html":
/***/ (function(module, exports) {

module.exports = "\n<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n\n<div class=\"container-fluid\">\n  <div class=\"row\">\n      <div class=\"col-md-3\">\n        <a class=\"view-all-2\" href=\"javascript://\"><i class=\"fa fa-angle-left\"></i><span>View all</span></a>\n      </div>\n      <div class=\"col-md-9\">\n        <div class=\"cust-tabs-2\">\n            <ul class=\"nav nav-tabs\">\n              <li class=\"nav-item\">\n                  <a class=\"nav-link\" [ngClass]=\"{'active':parameter.flag==1}\" (click)=\"changeFlag(1)\" >This Week</a>\n              </li>\n              <li class=\"nav-item\">\n                  <a class=\"nav-link\" [ngClass]=\"{'active':parameter.flag==2}\" (click)=\"changeFlag(2)\" >This Month</a>\n              </li>\n              <li class=\"nav-item\">\n                  <a class=\"nav-link\" [ngClass]=\"{'active':parameter.flag==3}\" (click)=\"changeFlag(3)\" >Last Month</a>\n              </li>\n              <li class=\"nav-item\">\n                  <a class=\"nav-link\" [ngClass]=\"{'active':parameter.flag==4}\" (click)=\"changeFlag(4)\" >Lifetime</a>\n              </li>\n              <li class=\"nav-item\">\n                  <a class=\"nav-link\" [ngClass]=\"{'active':parameter.flag==5}\" (click)=\"changeFlag(5)\" >Custom</a>\n              </li>\n            </ul>\n        </div>\n      </div>\n      <div class=\"col-12\">\n        <hr style=\"margin-top:0;\">\n      </div>\n  </div>\n\n  <div class=\"sigle-row-table\">\n    <table class=\"table table-striped\">\n        <tr>\n          <td> <img class=\"rounded-circle\" src=\"./../../../assets/img/default_img.png\" alt=\"img\"></td>\n          <td class=\"text-left\">\n              <span class=\"name\">Lillian Russell</span>\n          </td>\n          <td class=\"text-left\">\n              728-111-1874\n          </td>\n          <td class=\"text-left\">\n              eunice_aufderhar@yahoo.com\n          </td>\n          <td>\n              14\n          </td>\n          <td>\n              <a href=\"javascript://\" class=\"icon-block edit-icon\"><img src=\"./../../../assets/img/edit.png\" alt=\"img\"></a>\n              <a href=\"javascript://\" class=\"icon-block block-icon\"><img src=\"./../../../assets/img/unblock.png\" alt=\"img\"></a>\n          </td>\n        </tr>\n    </table>\n  </div>\n\n  <div class=\"row\">\n      <div class=\"col-lg-4 col-md-12 col-sm-12 col-12\">\n        <div class=\"info-box\">\n            <div class=\"one-row\">\n              <div class=\"o-block\">\n                  <h5>Buildings</h5>\n                  <small>Requests Pending</small>\n              </div>\n              <div class=\"o-block\">\n                  <a class=\"view-all\" href=\"javascript://\">View All</a>\n                  <h4>15</h4>\n              </div>\n            </div>\n            <div class=\"three-row\">\n              <div class=\"t-block\">\n                  <p><strong>3</strong></p>\n                  <p>Admin</p>\n              </div>\n              <div class=\"t-block\">\n                  <p><strong>6</strong></p>\n                  <p>CSR</p>\n              </div>\n              <div class=\"t-block\">\n                  <p><strong>5</strong></p>\n                  <p>User</p>\n              </div>\n            </div>\n        </div>\n      </div>\n    <div class=\"col-lg-4 col-md-12 col-sm-12 col-12\">\n        <div class=\"four-block\">\n            <div class=\"d-flex\">\n              <div class=\"f-block approved\">\n                  <h5>Approved</h5>\n                  <h3>25</h3>\n              </div>\n              <div class=\"f-block unapproved\">\n                  <h5>Unapproved</h5>\n                  <h3>02</h3>\n              </div>\n            </div>\n            <div class=\"d-flex\">\n              <div class=\"f-block pending active\">\n                  <h5>Pending</h5>\n                  <h3>01</h3>\n              </div>\n              <div class=\"f-block unapproved\">\n                  <h5>In Draft</h5>\n                  <h3>02</h3>\n              </div>\n            </div>\n        </div>\n      </div>\n      <div class=\"col-lg-4 col-md-12 col-sm-12 col-12\">\n        <div class=\"chat-msg\">\n            <div class=\"row\">\n              <div class=\"col-6\">\n                  <h5>Chat</h5>\n              </div>\n              <div class=\"col-6 text-right\"><a class=\"msg\" href=\"javascript://\">Message</a></div>\n            </div>\n            <p>Waiting for response</p>\n            <p>\n              <strong>Mario Hudson</strong>\n              When you are free to have a meeting\n              with interested customers?\n            </p>\n            <p>\n              <strong>Rosie Benson</strong>\n              Is there any availability in the localities\n              I was asking you tomorrow and also p…\n            </p>\n        </div>\n      </div>\n  </div>\n\n  <div class=\"row\">\n      <div class=\"col-12\">\n        <div class=\"spacer40\"></div>\n      </div>\n      <div class=\"col-12\">\n        <div class=\"title-group\">\n            <h5>All Leads (Information Filled)</h5>\n            <p>Showing 4 out of 4</p>\n        </div>\n      </div>\n  </div>\n\n  <div class=\"white-bg\">\n      <div class=\"tabel-section\">\n        <div class=\"table-responsive\">\n            <table class=\"table table-striped table-align-left vertical-align-top\">\n              <tr>\n                  <th>\n                    <div class=\"table-search\">\n                        <!-- <label>Image</label> -->\n                    </div>\n                  </th>\n                  <th style=\"width:20%\">\n                    <div class=\"table-search\">\n                        <label>Name</label>\n                        <input type=\"Search here\" (input)=\"changeFilter('name',$event.target.value)\">\n                    </div>\n                  </th>\n                  <th style=\"width:20%; text-align:left;\">\n                    <div class=\"table-search\">\n                        <label>Contact Number</label>\n                        <input type=\"Search here\" (input)=\"changeFilter('phone',$event.target.value)\">\n                    </div>\n                  </th>\n                  <th style=\"width:20%\">\n                    <div class=\"table-search\">\n                        <label>Email</label>\n                        <input type=\"Search here\" (input)=\"changeFilter('email',$event.target.value)\">\n                    </div>\n                  </th>\n                  <th style=\"width:10%\">\n                    Interested In\n                  </th>\n                  <th>\n                    Assignee\n                  </th>\n                  <th >\n                    <!-- Mark\n                    Complete -->\n                  </th>\n              </tr>\n              <tr *ngFor=\"let item of items| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.p, totalItems: parameter.total }\">\n                <td>\n                  <img *ngIf=\"item.image\" class=\"rounded-circle\" [src]=\"item.image\" alt=\"img\">\n                  <img *ngIf=\"!item.image\" class=\"rounded-circle\" src=\"./../../../assets/img/default_img.png\" alt=\"img\">\n                </td>\n                <td class=\"text-left\">\n                  <span class=\"name\">{{item.name}}</span>\n                </td>\n                <td class=\"text-left\" *ngIf=\"item.phone\">{{item.country_code}}-{{item.phone}}</td>\n                <td class=\"text-left\" *ngIf=\"!item.phone\">NA</td>\n                <td class=\"text-left\">{{item.email}}</td>\n                <td>2 BHK</td>\n                <td class=\"text-left\" *ngIf=\"item.admin.name\">{{item.admin.name}}</td>\n                <td class=\"text-left\" *ngIf=\"!item.admin.name\">Not Assigned</td>\n                <td>\n                  <a href=\"javascript://\" (click)=\"editUser(item)\" class=\"icon-block edit-icon\"><img src=\"./../../../../assets/img/edit.png\" alt=\"img\"></a>\n                  <a href=\"javascript://\" *ngIf=\"item.is_blocked == 1\" (click)=\"blockUnblockPopup(i, item.id, 0, parameter.type)\" title=\"Unblock user\" class=\"icon-block block-icon unblock-bg\"><img src=\"./../../../../assets/img/block.png\" alt=\"img\"></a>\n                  <a href=\"javascript://\" *ngIf=\"item.is_blocked == 0\" (click)=\"blockUnblockPopup(i, item.id, 1, parameter.type)\" title=\"Block user\" class=\"icon-block block-icon\"><img src=\"./../../../../assets/img/unblock.png\" alt=\"img\"></a>\n                </td>\n              </tr>\n            </table>\n        </div>\n      </div>\n  </div>\n\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/layout/leads/data-collector/data-collector.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataCollectorComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DataCollectorComponent = /** @class */ (function () {
    function DataCollectorComponent(admin, router, constant) {
        this.admin = admin;
        this.router = router;
        this.constant = constant;
        this.parameter = {};
        this.items = [];
    }
    DataCollectorComponent.prototype.ngOnInit = function () {
        this.parameter.page = this.constant.p;
        this.parameter.flag = 2;
        this.getListing();
    };
    DataCollectorComponent.prototype.changeFlag = function (flag) {
        this.parameter.flag = flag;
        this.getListing();
    };
    DataCollectorComponent.prototype.changeFilter = function (key, value) {
        this.parameter[key] = value;
        this.getListing();
    };
    DataCollectorComponent.prototype.getListing = function () {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'leads/csr-buyer';
        var input = new FormData();
        if (this.parameter.page) {
            input.append('page', this.parameter.page.toString());
        }
        if (this.parameter.flag) {
            input.append('flag', this.parameter.flag.toString());
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
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log(success);
            _this.parameter.loading = false;
            _this.items = success.data;
            _this.parameter.total = success.total;
        }, function (error) {
            _this.parameter.loading = false;
            if (error.statusCode === 401) {
                swal('Error', error.message, 'error');
                _this.router.navigate(['']);
            }
            else {
                swal('Error', error.message, 'error');
            }
        });
    };
    var _a, _b, _c;
    DataCollectorComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-data-collector',
            template: __webpack_require__("../../../../../src/app/layout/leads/data-collector/data-collector.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/leads/data-collector/data-collector.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_2__common_constants__["a" /* Constant */]]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" ? _a : Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === "function" ? _b : Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__common_constants__["a" /* Constant */]) === "function" ? _c : Object])
    ], DataCollectorComponent);
    return DataCollectorComponent;
}());

//# sourceMappingURL=data-collector.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/leads/inhouse-broker/inhouse-broker.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/leads/inhouse-broker/inhouse-broker.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  inhouse-broker works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/layout/leads/inhouse-broker/inhouse-broker.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InhouseBrokerComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var InhouseBrokerComponent = /** @class */ (function () {
    function InhouseBrokerComponent() {
    }
    InhouseBrokerComponent.prototype.ngOnInit = function () {
    };
    InhouseBrokerComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-inhouse-broker',
            template: __webpack_require__("../../../../../src/app/layout/leads/inhouse-broker/inhouse-broker.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/leads/inhouse-broker/inhouse-broker.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], InhouseBrokerComponent);
    return InhouseBrokerComponent;
}());

//# sourceMappingURL=inhouse-broker.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/leads/leads.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/leads/leads.component.html":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "../../../../../src/app/layout/leads/leads.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LeadsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LeadsComponent = /** @class */ (function () {
    function LeadsComponent(admin, router) {
        this.admin = admin;
        this.router = router;
        this.parameter = {};
        this.items = [];
    }
    LeadsComponent.prototype.ngOnInit = function () {
        this.parameter.page = 1;
        this.parameter.flag = 2;
        this.getListing();
    };
    LeadsComponent.prototype.changeFlag = function (flag) {
        this.parameter.flag = flag;
        this.getListing();
    };
    LeadsComponent.prototype.changeFilter = function (key, value) {
        this.parameter[key] = value;
        this.getListing();
    };
    LeadsComponent.prototype.getListing = function () {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'leads/csr-buyer';
        var input = new FormData();
        if (this.parameter.page) {
            input.append('page', this.parameter.page.toString());
        }
        if (this.parameter.flag) {
            input.append('flag', this.parameter.flag.toString());
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
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log(success);
            _this.parameter.loading = false;
            _this.items = success.data;
            _this.parameter.total = success.total;
        }, function (error) {
            _this.parameter.loading = false;
            if (error.statusCode === 401) {
                swal('Error', error.message, 'error');
                _this.router.navigate(['']);
            }
            else {
                swal('Error', error.message, 'error');
            }
        });
    };
    var _a, _b;
    LeadsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-leads',
            template: __webpack_require__("../../../../../src/app/layout/leads/leads.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/leads/leads.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" ? _a : Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" ? _b : Object])
    ], LeadsComponent);
    return LeadsComponent;
}());

//# sourceMappingURL=leads.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/leads/leads.module.ts":
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__leads_component__ = __webpack_require__("../../../../../src/app/layout/leads/leads.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__data_collector_data_collector_component__ = __webpack_require__("../../../../../src/app/layout/leads/data-collector/data-collector.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__csr_seller_csr_seller_component__ = __webpack_require__("../../../../../src/app/layout/leads/csr-seller/csr-seller.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__csr_buyer_csr_buyer_component__ = __webpack_require__("../../../../../src/app/layout/leads/csr-buyer/csr-buyer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__inhouse_broker_inhouse_broker_component__ = __webpack_require__("../../../../../src/app/layout/leads/inhouse-broker/inhouse-broker.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__csr_closer_csr_closer_component__ = __webpack_require__("../../../../../src/app/layout/leads/csr-closer/csr-closer.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LeadsModule", function() { return LeadsModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var routes = [
    { path: 'data-collectors', component: __WEBPACK_IMPORTED_MODULE_8__data_collector_data_collector_component__["a" /* DataCollectorComponent */] },
    { path: 'csr-sellers', component: __WEBPACK_IMPORTED_MODULE_9__csr_seller_csr_seller_component__["a" /* CsrSellerComponent */] },
    { path: 'csr-buyers', component: __WEBPACK_IMPORTED_MODULE_10__csr_buyer_csr_buyer_component__["a" /* CsrBuyerComponent */] },
    { path: 'inhouse-broker', component: __WEBPACK_IMPORTED_MODULE_11__inhouse_broker_inhouse_broker_component__["a" /* InhouseBrokerComponent */] },
    { path: 'csr-closers', component: __WEBPACK_IMPORTED_MODULE_12__csr_closer_csr_closer_component__["a" /* CsrCloserComponent */] }
];
var LeadsModule = /** @class */ (function () {
    function LeadsModule() {
    }
    LeadsModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* RouterModule */].forChild(routes),
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["h" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_3_ngx_loading__["a" /* LoadingModule */].forRoot({
                    animationType: __WEBPACK_IMPORTED_MODULE_3_ngx_loading__["b" /* ANIMATION_TYPES */].rectangleBounce,
                    primaryColour: '#00B96F'
                }),
                __WEBPACK_IMPORTED_MODULE_4_ngx_pagination__["a" /* NgxPaginationModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["b" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_6_ng2_tel_input__["Ng2TelInputModule"]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__leads_component__["a" /* LeadsComponent */],
                __WEBPACK_IMPORTED_MODULE_8__data_collector_data_collector_component__["a" /* DataCollectorComponent */],
                __WEBPACK_IMPORTED_MODULE_9__csr_seller_csr_seller_component__["a" /* CsrSellerComponent */],
                __WEBPACK_IMPORTED_MODULE_10__csr_buyer_csr_buyer_component__["a" /* CsrBuyerComponent */],
                __WEBPACK_IMPORTED_MODULE_11__inhouse_broker_inhouse_broker_component__["a" /* InhouseBrokerComponent */],
                __WEBPACK_IMPORTED_MODULE_12__csr_closer_csr_closer_component__["a" /* CsrCloserComponent */]
            ]
        })
    ], LeadsModule);
    return LeadsModule;
}());

//# sourceMappingURL=leads.module.js.map

/***/ })

});
//# sourceMappingURL=1.chunk.js.map