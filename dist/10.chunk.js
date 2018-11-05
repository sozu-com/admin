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

module.exports = "<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<div class=\"container-fluid\">\n    <div class=\"row\">\n        <div class=\"col-md-6\">\n          <div class=\"title-group\">\n              <h5>Access Control Mgt.</h5>\n              <p>Showing {{parameter.items?.length}} out of {{parameter.total}}</p>\n          </div>\n        </div>\n        <div class=\"col-md-6\">\n          <div class=\"btn-cont text-right\">\n              <a *ngIf=\"admin?.admin_acl['Access Controls']?.can_create==1\" class=\"btn btn-primary\" href=\"javascript://\" routerLink=\"/dashboard/access-control-mgt/add-acl-user/0\">+Add New</a>\n              <!-- <a *ngIf=\"admin?.admin_acl['Access Controls']?.can_create==1\" class=\"btn btn-primary\" href=\"javascript://\" routerLink=\"/dashboard/access-control-mgt/add-acl-user/0\">+Add New</a> -->\n              <!-- <a class=\"btn btn-primary\" href=\"javascript://\" data-toggle=\"modal\" data-target=\"#add\" #modalOpen>Add Popup</a> -->\n          </div>\n        </div>\n    </div>\n  \n    <div class=\"white-bg\">\n        <div class=\"tabel-section\">\n          <div class=\"table-responsive\">\n            <table class=\"table table-striped table-align-left\">\n              <tr>\n                <th style=\"width:6%\">&nbsp;</th>\n                <th style=\"width:20%\">\n                  <div class=\"table-search\">\n                      <label>Name</label>\n                      <div class=\"searh-3\">\n                        <input type=\"text\" [(ngModel)]=\"parameter.name\" (keyup.enter)=\"getAclUsers(parameter.page, parameter.name, parameter.phone, parameter.email)\" name=\"\">\n                        <button *ngIf=\"parameter.name\" (click)=\"getAclUsers(parameter.page, parameter.name, parameter.phone, parameter.email)\"><i class=\"fa fa-search\"></i></button>\n                      </div>\n                  </div>\n                </th>\n                <th style=\"width:20%; text-align:left;\">\n                  <div class=\"table-search\">\n                      <label>Contact Number</label>\n                      <div class=\"searh-3\">\n                        <input type=\"text\" [(ngModel)]=\"parameter.phone\" (keyup.enter)=\"getAclUsers(parameter.page, parameter.name, parameter.phone, parameter.email)\" name=\"\">\n                        <button *ngIf=\"parameter.phone\" (click)=\"getAclUsers(parameter.page, parameter.name, parameter.phone, parameter.email)\"><i class=\"fa fa-search\"></i></button>\n                      </div>\n                  </div>\n                </th>\n                <th style=\"width:20%\">\n                  <div class=\"table-search\">\n                      <label>Email Address</label>\n                      <div class=\"searh-3\">\n                        <input type=\"text\" [(ngModel)]=\"parameter.email\" (keyup.enter)=\"getAclUsers(parameter.page, parameter.name, parameter.phone, parameter.email)\" name=\"\">\n                        <button *ngIf=\"parameter.email\" (click)=\"getAclUsers(parameter.page, parameter.name, parameter.phone, parameter.email)\"><i class=\"fa fa-search\"></i></button>\n                      </div>\n                  </div>\n                </th>\n                <th style=\"width:10%; vertical-align: top;\">\n                  <div class=\"table-search\">\n                    <label>Emp. ID</label>\n                  </div>\n                </th>\n                <th style=\"width:14%\">\n                  &nbsp;\n                </th>\n              </tr>\n        \n              <tr *ngFor=\"let item of parameter.items| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: parameter.total }; let i=index\">\n                <td> \n                  <!-- <img *ngIf=\"item.image && item.image!='image'\" class=\"rounded-circle\" [src]=\"item.image\" alt=\"img\">\n                  <img *ngIf=\"!item.image || item.image=='image'\" class=\"rounded-circle\" src=\"assets/img/default_img.png\" alt=\"img\"> -->\n                  <img [src]=\"item.image| img:'small'\" class=\"rounded-circle\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\">\n                </td>\n                <td class=\"text-left\">\n                  <span class=\"name\">\n                    <a data-toggle=\"popover\" data-placement=\"top\" title=\"{{item.name}}\">\n                      {{item.name}}\n                      <!-- {{admin?.admin_acl['Access Controls']?.can_delete}} -->\n                    </a>\n                  </span>\n                </td>\n                <td class=\"text-left\" *ngIf=\"item.phone\">{{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}</td>\n                <td class=\"text-left\" *ngIf=\"!item.phone\">NA</td>\n                <td class=\"text-left\" *ngIf=\"item.email\">{{item.email}}</td>\n                <td class=\"text-left\" *ngIf=\"!item.email\">NA</td>\n                <td>{{item.id}}</td>\n                <td>\n                  <!-- <a href=\"javascript://\" routerLink=\"/dashboard/access-control-mgt/add-acl-user/{{item.id}}\" class=\"icon-block edit-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></a> -->\n                  <!-- <a [ngClass]=\"{'display-none':admin?.admin_acl['Access Controls']?.can_update==0}\" href=\"javascript://\" (click)=\"editData(item, item.id)\" class=\"icon-block edit-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></a> -->\n                  <!-- <a href=\"javascript://\" class=\"icon-block block-icon unblock-bg\"><img src=\"assets/img/block.png\" alt=\"img\"></a>\n                  <a href=\"javascript://\" class=\"icon-block block-icon\"><img src=\"assets/img/unblock.png\" alt=\"img\"></a> -->\n                  <button title=\"Edit Details\" [disabled]=\"admin?.admin_acl['Access Controls']?.can_update==0\" (click)=\"editData(item, item.id)\" class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></button>\n                  <button [disabled]=\"admin?.admin_acl['Access Controls']?.can_delete==0\"\n                      (click)=\"blockUnblockPopup(i, item.id, item.is_blocked==1?0:1, parameter.type)\" \n                      title=\"{{item.is_blocked==1?'Unblock User':'Block User'}}\" [ngClass]=\"{'unblock-bg':item.is_blocked==1}\"\n                      class=\"action-icon\"><img src=\"assets/img/block.png\" alt=\"img\">\n                  </button>\n                </td>\n              </tr>\n            </table>\n          </div>\n        </div>\n  \n        <div class=\"center\" *ngIf=\"parameter.total == 0\">\n          <img src=\"assets/img/404-error.png\">\n        </div>\n    </div>\n    \n    <div class=\"btn-cont text-right marginT15\" *ngIf=\"parameter.total\">\n      <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n    </div>\n    \n  </div>\n  \n  \n  \n  <!-- add inhouse user modal -->\n  <div class=\"modal animated\" id=\"add\">\n    <div class=\"modal-dialog fadeIndown modal-lg\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n            <button style=\"display: none;\" type=\"button\" class=\"close\" data-dismiss=\"modal\" #modalClose>&times;</button>\n            <button type=\"button\" class=\"close\" (click)=\"closeModal()\">&times;</button>\n        </div>\n  \n        <form class=\"form-horizontal form-model0P\" role=\"form\" ngNativeValidate #addForm=\"ngForm\" (ngSubmit)=\"add(addForm)\">\n          <div class=\"modal-body\">\n            <div class=\"row\">\n              <div class=\"col-6\">\n                <div class=\"add-img\" [style.background-image]=\"image1\">\n                <input accept=\"image/*\" name=\"image\" class=\"image\" (change)=\"changeListner($event)\" type=\"file\">\n                <label *ngIf=\"!image1\">+ Add Image</label>\n                </div>\n              </div>\n              <div class=\"col-6\">\n                <div class=\"btn-cont text-right\">\n                    <button *ngIf=\"model.id==''\" type=\"submit\" class=\"btn btn-primary\">ADD</button>\n                    <button *ngIf=\"model.id!=''\"  type=\"submit\" [disabled]=\"!addForm.valid\" class=\"btn btn-primary\">UPDATE</button>\n                </div>\n              </div>\n              <div class=\"col-12\">\n                <div class=\"spacer40\"></div>\n              </div>\n              <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                    <label>Name</label>\n                    <div class=\"form-group\">\n                    <input autocomplete=\"off\" required type=\"text\" class=\"form-control\" [(ngModel)]=\"model.name\" name=\"name\">\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                    <label>Contact number</label>\n                    <div class=\"form-group\">\n                    <input minlength=\"6\" maxlength=\"16\" autocomplete=\"off\" type=\"text\" [pattern]=\"constant.phonePattern\" class=\"form-control\" id=\"phone\" required minlength=\"1\" [(ngModel)]=\"model.phone\" name=\"phone\"\n                        ng2TelInput [ng2TelInputOptions]=\"initialCountry\" (countryChange)=\"onCountryChange($event)\" />\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                    <label>Email ID</label>\n                    <div class=\"form-group\">\n                    <input autocomplete=\"off\" required [pattern]=\"constant.emailPattern\" type=\"email\" class=\"form-control\" [(ngModel)]=\"model.email\" name=\"email\">\n                  </div>\n                </div>\n              </div>\n\n              <!-- <div class=\"access-controls\">\n                <label *ngFor=\"let permission of model.acl; let i=index\" class=\"cust-check-bx2\">{{permission.name}}\n                  <input (click)=\"setPermission(permission.id, i)\" type=\"checkbox\" name=\"acl{{i}}\">\n                  <span class=\"checkmark\"></span>\n                </label>\n              </div> -->\n\n              <div class=\"row\">\n                <div class=\"col-12\" *ngFor=\"let permission of model.admin_acl; let i=index\">\n                  <label><strong>{{permission?.acl?.name}}</strong></label><br>\n                  <label>Can Create\n                    <input type=\"checkbox\" [checked]=\"permission.can_create == 1 ? 'checked': ''\" (click)=\"setPermission('can_create', i)\" name=\"can_create{{i}}\">\n                  </label>\n                  <label>Can Read\n                    <input type=\"checkbox\" [checked]=\"permission.can_read == 1 ? 'checked': ''\" (click)=\"setPermission('can_read', i)\" name=\"can_read{{i}}\">\n                  </label>\n                  <label>Can Update\n                    <input type=\"checkbox\" [checked]=\"permission.can_update == 1 ? 'checked': ''\" (click)=\"setPermission('can_update', i)\" name=\"can_update{{i}}\">\n                  </label>\n                  <label>Can Block/Unblock\n                    <input type=\"checkbox\" [checked]=\"permission.can_delete == 1 ? 'checked': ''\" (click)=\"setPermission('can_delete', i)\" name=\"can_delete{{i}}\">\n                  </label>\n                </div>\n                <br>\n              </div>\n            </div>\n          </div>\n        </form>\n      </div>\n    </div>\n  </div>"

/***/ }),

/***/ "../../../../../src/app/layout/acl/acl.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_acl_model__ = __webpack_require__("../../../../../src/app/models/acl.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_common_service__ = __webpack_require__("../../../../../src/app/services/common.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
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
    function AclComponent(constant, model, admin, cs, sanitization, router, location) {
        this.constant = constant;
        this.model = model;
        this.admin = admin;
        this.cs = cs;
        this.sanitization = sanitization;
        this.router = router;
        this.location = location;
        this.parameter = {};
        var dd = this.cs.checkAccess('Broker Management', 'can_read');
        if (dd === 0) {
            this.location.back();
        }
    }
    AclComponent.prototype.ngOnInit = function () {
        this.model.country_code = this.constant.country_code;
        this.model.dial_code = this.constant.dial_code;
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        this.model.id = '';
        this.initialCountry = { initialCountry: this.constant.country_code };
        // this.getAclList();
        this.getAclUsers(this.parameter.page, '', '', '');
    };
    AclComponent.prototype.closeModal = function () {
        this.model = new __WEBPACK_IMPORTED_MODULE_2__models_acl_model__["a" /* ACL */];
        this.modalClose.nativeElement.click();
    };
    AclComponent.prototype.getPage = function (page) {
        this.parameter.page = page;
        this.getAclUsers(this.parameter.page, this.parameter.name, this.parameter.phone, this.parameter.email);
    };
    AclComponent.prototype.getAclList = function () {
        var _this = this;
        this.admin.postDataApi('getAclList', {})
            .subscribe(function (success) {
            success.data.forEach(function (element) {
                var e = new __WEBPACK_IMPORTED_MODULE_2__models_acl_model__["b" /* Permission */]();
                e.acl_id = element.id;
                var acl = { name: element.name };
                e.acl = acl;
                e.can_create = 1;
                e.can_update = 1;
                e.can_read = 1;
                e.can_delete = 1;
                _this.model.admin_acl.push(e);
            });
        });
    };
    AclComponent.prototype.getAclUsers = function (page, name, phone, email) {
        var _this = this;
        this.parameter.loading = true;
        this.admin.postDataApi('getAclUsers', this.parameter)
            .subscribe(function (success) {
            _this.parameter.loading = false;
            _this.parameter.items = success.data;
            _this.parameter.total = success.total;
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    AclComponent.prototype.setPermission = function (param, index) {
        this.model.admin_acl[index][param] = this.model.admin_acl[index][param] &&
            this.model.admin_acl[index][param] === 1 ? 0 : 1;
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
        this.model.dial_code = '+' + e.dialCode;
        this.initialCountry = { initialCountry: e.iso2 };
    };
    AclComponent.prototype.add = function (formdata) {
        var _this = this;
        this.parameter.url = this.model.id !== '' ? 'updateAclUser' : 'addAclUser';
        this.admin.postDataApi(this.parameter.url, this.model)
            .subscribe(function (success) {
            if (success.success === '0') {
                swal('Error', success.message, 'error');
            }
            else {
                _this.modalClose.nativeElement.click();
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
    AclComponent.prototype.editData = function (item, id) {
        this.cs.data = item;
        this.router.navigate(['/dashboard/access-control-mgt/add-acl-user', id]);
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
            html: this.parameter.title + '<br>' + this.parameter.text,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.blockAdmin(index, id, flag, user_type);
            }
        });
    };
    AclComponent.prototype.blockAdmin = function (index, id, flag, user_type) {
        var _this = this;
        this.parameter.index = index;
        this.admin.postDataApi('blockAclUser', { id: id, flag: flag })
            .subscribe(function (success) {
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
            providers: [__WEBPACK_IMPORTED_MODULE_2__models_acl_model__["a" /* ACL */]]
        }),
        __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__common_constants__["a" /* Constant */]) === "function" ? _c : Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__models_acl_model__["a" /* ACL */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__models_acl_model__["a" /* ACL */]) === "function" ? _d : Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" ? _e : Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_5__services_common_service__["a" /* CommonService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_common_service__["a" /* CommonService */]) === "function" ? _f : Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["DomSanitizer"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["DomSanitizer"]) === "function" ? _g : Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_6__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__angular_router__["Router"]) === "function" ? _h : Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_7__angular_common__["Location"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__angular_common__["Location"]) === "function" ? _j : Object])
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__add_acl_add_acl_component__ = __webpack_require__("../../../../../src/app/layout/acl/add-acl/add-acl.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__guards_acl_user_guard__ = __webpack_require__("../../../../../src/app/guards/acl-user.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__modules_shared_module__ = __webpack_require__("../../../../../src/app/modules/shared.module.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AclModule", function() { return AclModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var routes = [
    // { path: '', component: AclComponent, canActivate: [AclUserGuard]},
    // { path: 'add-acl-user/:id', component: AddAclComponent }
    { path: '', component: __WEBPACK_IMPORTED_MODULE_7__acl_component__["a" /* AclComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_9__guards_acl_user_guard__["a" /* AclUserGuard */]], data: { roles: ['Access Controls', 'can_read', ''] } },
    { path: 'add-acl-user/:id', component: __WEBPACK_IMPORTED_MODULE_8__add_acl_add_acl_component__["a" /* AddAclComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_9__guards_acl_user_guard__["a" /* AclUserGuard */]], data: { roles: ['Access Controls', 'can_create', ''] } }
];
var AclModule = /** @class */ (function () {
    function AclModule() {
    }
    AclModule = __decorate([
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
                __WEBPACK_IMPORTED_MODULE_6_ng2_tel_input__["Ng2TelInputModule"],
                __WEBPACK_IMPORTED_MODULE_10__modules_shared_module__["a" /* SharedModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__acl_component__["a" /* AclComponent */],
                __WEBPACK_IMPORTED_MODULE_8__add_acl_add_acl_component__["a" /* AddAclComponent */]
            ]
        })
    ], AclModule);
    return AclModule;
}());

//# sourceMappingURL=acl.module.js.map

/***/ }),

/***/ "../../../../../src/app/layout/acl/add-acl/add-acl.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/acl/add-acl/add-acl.component.html":
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<div class=\"container-fluid\">\n<div class=\"row\">\n    <div class=\"col-12\">\n      <div class=\"title-group\">\n          <h5>{{model.id!='' ? 'Edit' : 'Add'}} ACL User</h5>\n          <div class=\"spacer30\"></div>\n      </div>\n    </div>\n</div>\n<div class=\"white-bg padding40\">\n    <div class=\"row\">\n    <form role=\"form\" ngNativeValidate #addForm=\"ngForm\" (ngSubmit)=\"add(addForm)\">\n      <div class=\"col-xl-12 col-lg-12 col-md-12 col-12\">\n          <div class=\"row\">\n            <div class=\"col-6\">\n                <div class=\"add-img\">\n                  <input type=\"file\" name=\"\">\n                  <label>+ Add Image</label>\n                </div>\n            </div>\n            <div class=\"col-6\">\n                <div class=\"btn-cont text-right\">\n                    <button *ngIf=\"model.id==''\" type=\"submit\" [disabled]=\"!addForm.valid\" class=\"btn btn-primary\">ADD</button>\n                    <button *ngIf=\"model.id!=''\" type=\"submit\" class=\"btn btn-primary\">UPDATE</button>\n                </div>\n            </div>\n            <div class=\"col-12\">\n                <div class=\"spacer40\"></div>\n            </div>\n            <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                  <label>Name <span class=\"color-red\">*</span></label>\n                  <input autocomplete=\"off\" required type=\"text\" class=\"form-control\" [(ngModel)]=\"model.name\" name=\"name\">\n                </div>\n            </div>\n            <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                  <label>Contact number <span class=\"color-red\">*</span></label>\n                  <input minlength=\"6\" maxlength=\"16\" autocomplete=\"off\" type=\"text\" [pattern]=\"constant.phonePattern\" class=\"form-control\" id=\"phone\" required minlength=\"1\" [(ngModel)]=\"model.phone\" name=\"phone\"\n                        ng2TelInput [ng2TelInputOptions]=\"initialCountry\" (countryChange)=\"onCountryChange($event)\" />\n                </div>\n            </div>\n            <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                  <label>Email ID <span class=\"color-red\">*</span></label>\n                  <input autocomplete=\"off\" required [pattern]=\"constant.emailPattern\" type=\"email\" class=\"form-control\" [(ngModel)]=\"model.email\" name=\"email\">\n                </div>\n            </div>\n          </div>\n          <!-- <div class=\"row\">\n            <div class=\"col-sm-3 col-12\">\n                <div class=\"form-group-2\">\n                  <label>Country</label>\n                  <select class=\"form-control\">\n                      <option>1BHK</option>\n                      <option>2BHK</option>\n                      <option>3BHK</option>\n                  </select>\n                </div>\n            </div>\n            <div class=\"col-sm-3 col-12\">\n                <div class=\"form-group-2\">\n                  <label>City</label>\n                  <select class=\"form-control\">\n                      <option>1BHK</option>\n                      <option>2BHK</option>\n                      <option>3BHK</option>\n                  </select>\n                </div>\n            </div>\n            <div class=\"col-sm-6 col-12\">\n                <div class=\"row\">\n                  <div class=\"col-9\">\n                      <div class=\"form-group-2\">\n                        <label>Neighbourhood</label>\n                        <select class=\"form-control\">\n                            <option>1BHK</option>\n                            <option>2BHK</option>\n                            <option>3BHK</option>\n                        </select>\n                      </div>\n                  </div>\n                  <div class=\"col-3\">\n                      <div class=\"inline-form-group padding0 marginT10\"> <button class=\"add-btn margin0\"><img src=\"img/add.png\" alt=\"img\"></button></div>\n                  </div>\n                </div>\n            </div>\n          </div> -->\n          <!-- <div class=\"row\">\n            <div class=\"col-sm-3 col-12\">\n                <div class=\"form-group-2\">\n                  <label>Country</label>\n                  <select class=\"form-control\">\n                      <option>1BHK</option>\n                      <option>2BHK</option>\n                      <option>3BHK</option>\n                  </select>\n                </div>\n            </div>\n            <div class=\"col-sm-3 col-12\">\n                <div class=\"form-group-2\">\n                  <label>City</label>\n                  <select class=\"form-control\">\n                      <option>1BHK</option>\n                      <option>2BHK</option>\n                      <option>3BHK</option>\n                  </select>\n                </div>\n            </div>\n            <div class=\"col-sm-6 col-12\">\n                <div class=\"row\">\n                  <div class=\"col-9\">\n                      <div class=\"form-group-2\">\n                        <label>Neighbourhood</label>\n                        <select class=\"form-control\">\n                            <option>1BHK</option>\n                            <option>2BHK</option>\n                            <option>3BHK</option>\n                        </select>\n                      </div>\n                  </div>\n                  <div class=\"col-3\">\n                      <div class=\"inline-form-group padding0 marginT10\"> <button class=\"add-btn margin0\"><img src=\"img/add.png\" alt=\"img\"></button></div>\n                  </div>\n                </div>\n            </div>\n          </div> -->\n        \n          <div class=\"access-controls\">\n              <div class=\"select-controls\" *ngFor=\"let permission of model.admin_acl; let i=index\">\n              <label class=\"cust-check-bx2\" [ngClass]=\"{'access-control11':permission.can_create==1 || permission.can_read==1 || permission.can_update==1 || permission.can_delete==1}\">{{permission?.acl?.name}}\n              <input (click)=\"expandBox(i)\" type=\"checkbox\" [checked]=\"permission.can_create == 1 || permission.can_read==1 || permission.can_update==1 || permission.can_delete==1 ? 'checked': ''\">\n              <span class=\"checkmark\"></span>\n              </label>\n              \n              <div class=\"clearfix\"></div>\n              <div *ngIf=\"permission.show\" id=\"broker-seller-dev\" class=\"inner-select\">\n                <label class=\"cust-check-bx\" [ngClass]=\"{'inner-checked':permission.can_create==1}\">Can Create\n                    <input type=\"checkbox\" [checked]=\"permission.can_create == 1 ? 'checked': ''\"  (click)=\"setPermission('can_create', i)\">\n                    <span class=\"checkmark\"></span>\n                </label>\n                <label class=\"cust-check-bx\" [ngClass]=\"{'inner-checked':permission.can_read==1}\">Can Read\n                    <input type=\"checkbox\" [checked]=\"permission.can_read == 1 ? 'checked': ''\"  (click)=\"setPermission('can_read', i)\">\n                    <span class=\"checkmark\"></span>\n                </label>\n                <label class=\"cust-check-bx\" [ngClass]=\"{'inner-checked':permission.can_update==1}\">Can Update\n                    <input type=\"checkbox\" [checked]=\"permission.can_update == 1 ? 'checked': ''\"  (click)=\"setPermission('can_update', i)\">\n                    <span class=\"checkmark\"></span>\n                </label>\n                <label class=\"cust-check-bx\" [ngClass]=\"{'inner-checked':permission.can_delete==1}\">Can Block/Unblock\n                    <input type=\"checkbox\" [checked]=\"permission.can_delete == 1 ? 'checked': ''\"  (click)=\"setPermission('can_delete', i)\">\n                    <span class=\"checkmark\"></span>\n                </label>\n                <label class=\"cust-check-bx\" [ngClass]=\"{'inner-checked':permission.can_crud==1}\">CRUD\n                    <input type=\"checkbox\" [checked]=\"permission.can_crud == 1 ? 'checked': ''\"  (click)=\"setPermission('can_crud', i)\">\n                    <span class=\"checkmark\"></span>\n                </label>\n                <br>\n              </div>\n              <div class=\"clearfix\"></div>\n            </div>\n            \n            <!-- inner-checked -->\n                  <!-- <div class=\"select-controls\">\n              <label class=\"cust-check-bx2\">Data Collector\n              <input id=\"dc\" type=\"checkbox\">\n              <span class=\"checkmark\"></span>\n              </label>\n              <div class=\"clearfix\"></div>\n                    <div style=\"display:none;\" id=\"data-collector\" class=\"inner-select\">\n                <label class=\"cust-check-bx\">Abc\n                              <input type=\"checkbox\">\n                              <span class=\"checkmark\"></span>\n                  </label>\n                  <label class=\"cust-check-bx inner-checked\">Lorem ipsum\n                              <input type=\"checkbox\" checked=\"checked\">\n                              <span class=\"checkmark\"></span>\n                  </label>\n                  <label class=\"cust-check-bx\">xyz\n                              <input type=\"checkbox\">\n                              <span class=\"checkmark\"></span>\n                  </label>\n                  <label class=\"cust-check-bx\">Abc\n                              <input type=\"checkbox\">\n                              <span class=\"checkmark\"></span>\n                  </label>\n                  <label class=\"cust-check-bx inner-checked\">Lorem ipsum\n                              <input type=\"checkbox\" checked=\"checked\">\n                              <span class=\"checkmark\"></span>\n                  </label>\n                  <label class=\"cust-check-bx\">xyz\n                              <input type=\"checkbox\">\n                              <span class=\"checkmark\"></span>\n                  </label>\n  \n              </div>\n                </div> -->\n  \n  \n                \n            </div>\n      </div>\n      </form>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/layout/acl/add-acl/add-acl.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_common_service__ = __webpack_require__("../../../../../src/app/services/common.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_acl_model__ = __webpack_require__("../../../../../src/app/models/acl.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddAclComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AddAclComponent = /** @class */ (function () {
    function AddAclComponent(constant, model, cs, admin, route) {
        this.constant = constant;
        this.model = model;
        this.cs = cs;
        this.admin = admin;
        this.route = route;
        this.parameter = {};
        this.show = false;
    }
    AddAclComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.model.country_code = this.constant.country_code;
        this.model.dial_code = this.constant.dial_code;
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.p = this.constant.p;
        this.initialCountry = { initialCountry: this.constant.country_code };
        this.parameter.sub = this.route.params.subscribe(function (params) {
            if (params['id'] !== '0') {
                _this.model.id = params['id'];
                _this.getAclUserById(_this.model.id);
            }
            else {
                _this.model.id = '';
                _this.getAclList();
            }
        });
    };
    AddAclComponent.prototype.getAclUserById = function (id) {
        var _this = this;
        this.parameter.loading = true;
        this.admin.postDataApi('getAclUserById', { 'id': id })
            .subscribe(function (success) {
            _this.parameter.loading = false;
            _this.model = success.data;
            _this.model.admin_acl = success.data.admin_acl;
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    AddAclComponent.prototype.set = function () {
        this.show = true;
    };
    AddAclComponent.prototype.changeListner = function (event) {
        this.parameter.image = event.target.files[0];
        this.parameter.icon = this.parameter.image;
        var reader = new FileReader();
        reader.onload = function (e) {
            // this.url = e.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
    };
    AddAclComponent.prototype.onCountryChange = function (e) {
        this.model.country_code = e.iso2;
        this.model.dial_code = '+' + e.dialCode;
        this.initialCountry = { initialCountry: e.iso2 };
    };
    AddAclComponent.prototype.getAclList = function () {
        var _this = this;
        this.parameter.loading = true;
        this.admin.postDataApi('getAclList', {})
            .subscribe(function (success) {
            _this.parameter.loading = false;
            success.data.forEach(function (element) {
                var e = new __WEBPACK_IMPORTED_MODULE_3__models_acl_model__["b" /* Permission */]();
                var acl = { name: element.name };
                e.acl_id = element.id;
                e.acl = acl;
                e.show = false;
                e.can_create = 1;
                e.can_update = 1;
                e.can_read = 1;
                e.can_delete = 1;
                e.can_crud = 1;
                _this.model.admin_acl.push(e);
            });
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    AddAclComponent.prototype.expandBox = function (index) {
        this.model.admin_acl[index].show = this.model.admin_acl[index].show === true ? false : true;
    };
    AddAclComponent.prototype.setPermission = function (param, index) {
        if (param === 'can_crud') {
            this.model.admin_acl[index]['can_create'] = this.model.admin_acl[index]['can_crud'] === 1 ? 0 : 1;
            this.model.admin_acl[index]['can_read'] = this.model.admin_acl[index]['can_crud'] === 1 ? 0 : 1;
            this.model.admin_acl[index]['can_update'] = this.model.admin_acl[index]['can_crud'] === 1 ? 0 : 1;
            this.model.admin_acl[index]['can_delete'] = this.model.admin_acl[index]['can_crud'] === 1 ? 0 : 1;
            this.model.admin_acl[index]['can_crud'] = this.model.admin_acl[index]['can_crud'] === 1 ? 0 : 1;
        }
        else {
            this.model.admin_acl[index][param] = this.model.admin_acl[index][param] &&
                this.model.admin_acl[index][param] === 1 ? 0 : 1;
            this.model.admin_acl[index]['can_crud'] = this.model.admin_acl[index]['can_create'] === 1 &&
                this.model.admin_acl[index]['can_read'] === 1 && this.model.admin_acl[index]['can_update'] === 1 &&
                this.model.admin_acl[index]['can_delete'] === 1 ? 1 : 0;
        }
    };
    AddAclComponent.prototype.add = function (formData) {
        var _this = this;
        this.parameter.loading = true;
        this.admin.postDataApi('addAclUser', this.model)
            .subscribe(function (success) {
            _this.parameter.loading = false;
            if (success.success === '0') {
                swal('Error', success.message, 'error');
            }
            else {
                var text = _this.model.id === '' ? 'Added successfully.' : 'Updated successfully.';
                swal('Success', text, 'success');
                if (_this.model.id === '') {
                    formData.reset();
                }
            }
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    var _a, _b, _c, _d, _e;
    AddAclComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-add-acl',
            template: __webpack_require__("../../../../../src/app/layout/acl/add-acl/add-acl.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/acl/add-acl/add-acl.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_3__models_acl_model__["a" /* ACL */]]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__common_constants__["a" /* Constant */]) === "function" ? _a : Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__models_acl_model__["a" /* ACL */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__models_acl_model__["a" /* ACL */]) === "function" ? _b : Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_common_service__["a" /* CommonService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_common_service__["a" /* CommonService */]) === "function" ? _c : Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" ? _d : Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_router__["ActivatedRoute"]) === "function" ? _e : Object])
    ], AddAclComponent);
    return AddAclComponent;
}());

//# sourceMappingURL=add-acl.component.js.map

/***/ })

});
//# sourceMappingURL=10.chunk.js.map