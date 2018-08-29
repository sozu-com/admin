webpackJsonp([10],{

/***/ "../../../../../src/app/layout/acl/acl.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/acl/acl.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container-fluid\">\n    <div class=\"row\">\n        <div class=\"col-md-6\">\n          <div class=\"title-group\">\n              <h5>Access Control Mgt.</h5>\n              <p>Showing {{parameter.items?.length}} out of {{parameter.total}}</p>\n          </div>\n        </div>\n        <div class=\"col-md-6\">\n          <div class=\"btn-cont text-right\">\n              <a class=\"btn btn-primary\" href=\"javascript://\" data-toggle=\"modal\" data-target=\"#add\" #modalOpen>Add New</a>\n          </div>\n        </div>\n    </div>\n  \n    <div class=\"white-bg\">\n        <div class=\"tabel-section\">\n          <div class=\"table-responsive\">\n            <table class=\"table table-striped table-align-left\">\n              <tr>\n                <th style=\"width:6%\">&nbsp;</th>\n                <th style=\"width:20%\">\n                  <div class=\"table-search\">\n                      <label>Name</label>\n                      <div class=\"searh-3\">\n                        <input type=\"text\" [(ngModel)]=\"parameter.name\" (keyup.enter)=\"getBuyers(parameter.type, parameter.p, parameter.name, parameter.phone, parameter.email)\" name=\"\">\n                        <button *ngIf=\"parameter.name\" (click)=\"getBuyers(parameter.type, parameter.p, parameter.name, parameter.phone, parameter.email)\"><i class=\"fa fa-search\"></i></button>\n                      </div>\n                  </div>\n                </th>\n                <th style=\"width:20%; text-align:left;\">\n                  <div class=\"table-search\">\n                      <label>Contact Number</label>\n                      <div class=\"searh-3\">\n                        <input type=\"text\" [(ngModel)]=\"parameter.phone\" (keyup.enter)=\"getBuyers(parameter.type, parameter.p, parameter.name, parameter.phone, parameter.email)\" name=\"\">\n                        <button *ngIf=\"parameter.phone\" (click)=\"getBuyers(parameter.type, parameter.p, parameter.name, parameter.phone, parameter.email)\"><i class=\"fa fa-search\"></i></button>\n                      </div>\n                  </div>\n                </th>\n                <th style=\"width:20%\">\n                  <div class=\"table-search\">\n                      <label>Email Address</label>\n                      <div class=\"searh-3\">\n                        <input type=\"text\" [(ngModel)]=\"parameter.email\" (keyup.enter)=\"getBuyers(parameter.type, parameter.p, parameter.name, parameter.phone, parameter.email)\" name=\"\">\n                        <button *ngIf=\"parameter.email\" (click)=\"getBuyers(parameter.type, parameter.p, parameter.name, parameter.phone, parameter.email)\"><i class=\"fa fa-search\"></i></button>\n                      </div>\n                  </div>\n                </th>\n                <th style=\"width:10%; vertical-align: top;\">\n                  Emp. ID\n                </th>\n                <th style=\"width:14%\">\n                  &nbsp;\n                </th>\n              </tr>\n        \n              <tr *ngFor=\"let item of parameter.items| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.p, totalItems: parameter.total }; let i=index\">\n                <td> \n                  <img *ngIf=\"item.image && item.image!='image'\" class=\"rounded-circle\" [src]=\"item.image\" alt=\"img\">\n                  <img *ngIf=\"!item.image || item.image=='image'\" class=\"rounded-circle\" src=\"./../../../assets/img/default_img.png\" alt=\"img\">\n                </td>\n                <td class=\"text-left\">\n                  <span class=\"name\">\n                    <a data-toggle=\"popover\" data-placement=\"top\" title=\"{{item.name}}\">{{item.name}}</a>\n                  </span>\n                </td>\n                <td class=\"text-left\" *ngIf=\"item.phone\">{{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}</td>\n                <td class=\"text-left\" *ngIf=\"!item.phone\">NA</td>\n                <td class=\"text-left\" *ngIf=\"item.email\">{{item.email}}</td>\n                <td class=\"text-left\" *ngIf=\"!item.email\">NA</td>\n                <td>435DFGD</td>\n                <td>\n                  <a href=\"javascript://\" (click)=\"editUser(item, i)\" class=\"icon-block edit-icon\"><img src=\"./../../../../assets/img/edit.png\" alt=\"img\"></a>\n                  <a href=\"javascript://\" *ngIf=\"item.is_blocked == 1\" (click)=\"blockUnblockPopup(i, item.id, 0, parameter.type)\" title=\"Unblock user\" class=\"icon-block block-icon unblock-bg\"><img src=\"./../../../../assets/img/block.png\" alt=\"img\"></a>\n                  <a href=\"javascript://\" *ngIf=\"item.is_blocked == 0\" (click)=\"blockUnblockPopup(i, item.id, 1, parameter.type)\" title=\"Block user\" class=\"icon-block block-icon\"><img src=\"./../../../../assets/img/unblock.png\" alt=\"img\"></a>\n                </td>\n              </tr>\n  \n            </table>\n          </div>\n        </div>\n  \n        <div class=\"center\" *ngIf=\"parameter.total == 0\">\n          <img src=\"./../../../assets/img/404-error.png\">\n        </div>\n    </div>\n    \n    <div class=\"btn-cont text-right marginT15\" *ngIf=\"parameter.total\">\n      <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n    </div>\n    \n  </div>\n  \n  \n  \n  <!-- add inhouse user modal -->\n  <div class=\"modal animated\" id=\"add\">\n    <div class=\"modal-dialog fadeIndown modal-lg\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n            <button style=\"display: none;\" type=\"button\" class=\"close\" data-dismiss=\"modal\" #modalClose>&times;</button>\n            <button type=\"button\" class=\"close\" (click)=\"closeModal()\">&times;</button>\n        </div>\n  \n        <form class=\"form-horizontal form-model0P\" role=\"form\" ngNativeValidate #addForm=\"ngForm\" (ngSubmit)=\"addNewUser(addForm)\">\n          <div class=\"modal-body\">\n            <div class=\"row\">\n              <div class=\"col-6\">\n                <div class=\"add-img\" [style.background-image]=\"image1\">\n                <input accept=\"image/*\" name=\"image\" class=\"image\" (change)=\"changeListner($event)\" type=\"file\">\n                <label *ngIf=\"!image1\">+ Add Image</label>\n                </div>\n              </div>\n              <div class=\"col-6\">\n                <div class=\"btn-cont text-right\">\n                    <button *ngIf=\"model.id==''\" type=\"submit\" class=\"btn btn-primary\">ADD</button>\n                    <button *ngIf=\"model.id!=''\" type=\"submit\" [disabled]=\"!addForm.valid\" class=\"btn btn-primary\">UPDATE</button>\n                </div>\n              </div>\n              <div class=\"col-12\">\n                <div class=\"spacer40\"></div>\n              </div>\n              <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                    <label>Name</label>\n                    <div class=\"form-group\">\n                    <input autocomplete=\"off\" required type=\"text\" class=\"form-control\" [(ngModel)]=\"model.name\" name=\"name\">\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                    <label>Contact number</label>\n                    <div class=\"form-group\">\n                    <input minlength=\"6\" maxlength=\"16\" autocomplete=\"off\" type=\"text\" [pattern]=\"constant.phonePattern\" class=\"form-control\" id=\"phone\" required minlength=\"1\" [(ngModel)]=\"model.phone\" name=\"phone\"\n                        ng2TelInput [ng2TelInputOptions]=\"initialCountry\" (countryChange)=\"onCountryChange($event)\" />\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                    <label>Email ID</label>\n                    <div class=\"form-group\">\n                    <input autocomplete=\"off\" required [pattern]=\"constant.emailPattern\" type=\"email\" class=\"form-control\" [(ngModel)]=\"model.email\" name=\"email\">\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"access-controls\">\n                <label [ngClass]=\"{'access-control11': true}\" class=\"cust-check-bx2\">Dashboard\n                  <input disabled type=\"checkbox\" name=\"is_broker_seller_dev\">\n                  <span class=\"checkmark\"></span>\n                </label>\n  \n                <label [ngClass]=\"{'access-control11': true}\" class=\"cust-check-bx2\">Broker Mgt.\n                  <input disabled type=\"checkbox\" name=\"is_buyer_renter\">\n                  <span class=\"checkmark\"></span>\n                </label>\n  \n                <label [ngClass]=\"{'access-control11': true}\" class=\"cust-check-bx2\">Seller Mgt.\n                  <input disabled type=\"checkbox\" name=\"is_broker\">\n                  <span class=\"checkmark\"></span>\n                </label>\n  \n                <label [ngClass]=\"{'access-control11': true}\" class=\"cust-check-bx2\">Bank Mgt.\n                  <input disabled type=\"checkbox\" name=\"is_data_collector\">\n                  <span class=\"checkmark\"></span>\n                </label>\n                <label [ngClass]=\"{'access-control11': true}\" class=\"cust-check-bx2\">Notary Mgt.\n                  <input disabled type=\"checkbox\" name=\"is_csr_closer\">\n                  <span class=\"checkmark\"></span>\n                </label>\n              </div>\n            </div>\n          </div>\n        </form>\n      </div>\n    </div>\n  </div>"

/***/ }),

/***/ "../../../../../src/app/layout/acl/acl.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_users_model__ = __webpack_require__("../../../../../src/app/models/users.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AclComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AclComponent = /** @class */ (function () {
    function AclComponent(constant, model, element, route, admin, router, sanitization) {
        this.constant = constant;
        this.model = model;
        this.element = element;
        this.route = route;
        this.admin = admin;
        this.router = router;
        this.sanitization = sanitization;
        this.parameter = {};
    }
    AclComponent.prototype.ngOnInit = function () {
        this.model.country_code = this.constant.country_code;
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.p = this.constant.p;
        this.parameter.type = 1;
        this.model.id = '';
        this.initialCountry = { initialCountry: 'mx' };
        this.getBuyers(this.parameter.type, this.parameter.p, '', '', '');
    };
    AclComponent.prototype.closeModal = function () {
        this.image1 = '';
        this.model.name = '';
        this.model.email = '';
        this.model.phone = '';
        this.modalClose.nativeElement.click();
    };
    AclComponent.prototype.getPage = function (page) {
        this.parameter.p = page;
        this.getBuyers(this.parameter.type, this.parameter.p, this.parameter.name, this.parameter.phone, this.parameter.email);
    };
    AclComponent.prototype.getBuyers = function (type, page, name, phone, email) {
        var _this = this;
        this.parameter.p = page;
        this.parameter.type = type;
        this.parameter.name = name;
        this.parameter.phone = phone;
        this.parameter.email = email;
        // this.parameter.loading = true;
        this.parameter.url = this.parameter.type === 1 ? 'getBuyers' : 'getSellers';
        var input = new FormData();
        input.append('page', this.parameter.p.toString());
        if (this.parameter.name) {
            input.append('name', this.parameter.name);
        }
        if (this.parameter.phone) {
            input.append('phone', this.parameter.phone);
        }
        if (this.parameter.email) {
            input.append('email', this.parameter.email);
        }
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('getBuyers', success);
            // this.parameter.loading = false;
            _this.parameter.items = success.data;
            _this.parameter.total = success.total;
        });
    };
    AclComponent.prototype.changeListner = function (event) {
        var _this = this;
        this.parameter.image = event.target.files[0];
        this.parameter.icon = this.parameter.image;
        var reader = new FileReader();
        reader.onload = function (e) {
            _this.url = e.target.result;
            _this.image1 = _this.sanitization.bypassSecurityTrustStyle("url(" + _this.url + ")");
        };
        reader.readAsDataURL(event.target.files[0]);
    };
    AclComponent.prototype.onCountryChange = function (e) {
        this.model.country_code = e.iso2;
        this.model.dial_code = e.dialCode;
        this.initialCountry = { initialCountry: e.iso2 };
    };
    AclComponent.prototype.addNewUser = function (formdata) {
        var _this = this;
        // this.parameter.loading = true;
        this.parameter.url = this.model.id !== '' ? 'updateNewUser' : 'addSeller';
        var input = new FormData();
        if (this.model.id !== '') {
            input.append('id', this.model.id);
        }
        input.append('name', this.model.name);
        input.append('country_code', this.model.country_code);
        input.append('dial_code', '+' + this.model.dial_code);
        input.append('phone', this.model.phone);
        input.append('email', this.model.email);
        if (this.parameter.image) {
            input.append('image', this.parameter.image);
        }
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('success', success);
            // this.parameter.loading = false;
            if (success.success === '0') {
                swal('Error', success.message, 'error');
            }
            else {
                _this.modalClose.nativeElement.click();
                // this.getBuyers(this.parameter.type, this.parameter.p, this.parameter.name, this.parameter.phone, this.parameter.email);
                formdata.reset();
                var text = _this.model.id === '' ? 'Added successfully.' : 'Updated successfully.';
                swal('Success', text, 'success');
                if (_this.parameter.items.length < 10) {
                    if (_this.model.id !== '') {
                        _this.parameter.items[_this.parameter.index] = success.data;
                    }
                    else {
                        _this.parameter.items.push(success.data);
                    }
                }
            }
        });
    };
    AclComponent.prototype.editUser = function (userdata, index) {
        console.log('edit user', userdata);
        this.parameter.index = index;
        this.modalOpen.nativeElement.click();
        this.model.id = userdata.id;
        this.model.name = userdata.name;
        this.model.email = userdata.email;
        this.model.phone = userdata.phone;
        this.model.country_code = userdata.country_code ? userdata.country_code : this.constant.country_code;
        this.model.dial_code = userdata.dial_code ? userdata.dial_code : this.constant.dial_code;
        var d = {
            areaCodes: null,
            dialCode: '91',
            iso2: userdata.country_code,
            priority: 0
        };
        this.onCountryChange(d);
        this.initialCountry = { initialCountry: userdata.country_code };
        console.log(this.initialCountry, this.model);
        this.model.image = userdata.image != null ? userdata.image : '';
        if (this.model.image) {
            this.image1 = this.sanitization.bypassSecurityTrustStyle("url(" + this.model.image + ")");
        }
    };
    AclComponent.prototype.blockUnblockPopup = function (index, id, flag, user_type) {
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
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.blockAdmin(index, id, flag, user_type);
            }
        });
    };
    AclComponent.prototype.blockAdmin = function (index, id, flag, user_type) {
        var _this = this;
        // this.parameter.loading = true;
        this.parameter.index = index;
        this.parameter.url = 'blockBuyerSeller';
        var input = new FormData();
        input.append('id', id);
        input.append('flag', flag);
        input.append('user_type', user_type);
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('success', success);
            // this.parameter.loading = false;
            swal('Success', success.message, 'success');
            _this.parameter.items[_this.parameter.index] = success.data;
        });
    };
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('modalOpen'),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _a : Object)
    ], AclComponent.prototype, "modalOpen", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('modalClose'),
        __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _b : Object)
    ], AclComponent.prototype, "modalClose", void 0);
    AclComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-acl',
            template: __webpack_require__("../../../../../src/app/layout/acl/acl.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/acl/acl.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_3__models_users_model__["a" /* Users */], __WEBPACK_IMPORTED_MODULE_4__common_constants__["a" /* Constant */]]
        }),
        __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__common_constants__["a" /* Constant */]) === "function" ? _c : Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__models_users_model__["a" /* Users */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__models_users_model__["a" /* Users */]) === "function" ? _d : Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _e : Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === "function" ? _f : Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" ? _g : Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" ? _h : Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__["c" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__["c" /* DomSanitizer */]) === "function" ? _j : Object])
    ], AclComponent);
    return AclComponent;
}());

//# sourceMappingURL=acl.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/acl/acl.module.ts":
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__acl_component__ = __webpack_require__("../../../../../src/app/layout/acl/acl.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AclModule", function() { return AclModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_7__acl_component__["a" /* AclComponent */] }
];
var AclModule = /** @class */ (function () {
    function AclModule() {
    }
    AclModule = __decorate([
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
                __WEBPACK_IMPORTED_MODULE_7__acl_component__["a" /* AclComponent */]
            ]
        })
    ], AclModule);
    return AclModule;
}());

//# sourceMappingURL=acl.module.js.map

/***/ })

});
//# sourceMappingURL=10.chunk.js.map