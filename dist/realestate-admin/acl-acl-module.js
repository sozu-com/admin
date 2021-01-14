(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["acl-acl-module"],{

/***/ "./src/app/layout/acl/acl.component.css":
/*!**********************************************!*\
  !*** ./src/app/layout/acl/acl.component.css ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9hY2wvYWNsLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/layout/acl/acl.component.html":
/*!***********************************************!*\
  !*** ./src/app/layout/acl/acl.component.html ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container-fluid\">\n    <div class=\"row\">\n        <div class=\"col-md-6 col-6\">\n          <div class=\"title-group\">\n            <h5>{{'viewACL.label' | translate}}</h5>\n            <p>{{'table.pagination.showing' | translate}} {{parameter?.items?.length}} {{'table.pagination.outof' | translate}} {{parameter.total}}</p>\n          </div>\n        </div>\n        <div class=\"col-md-6 col-6\">\n          <div class=\"btn-cont text-right\">\n              <a *ngIf=\"admin?.admin_acl['Access Controls']?.can_create==1\" class=\"btn btn-primary\" href=\"javascript://\" routerLink=\"/dashboard/access-control-mgt/add-acl-user/0\">{{'table.addNewBtn' | translate}}</a>\n          </div>\n        </div>\n    </div>\n  \n    <div class=\"white-bg\">\n        <div class=\"tabel-section\">\n          <div class=\"table-responsive\">\n            <table class=\"table table-striped table-align-left\">\n              <tr>\n                <th style=\"width:6%\">&nbsp;</th>\n                <th style=\"width:20%\">\n                  <div class=\"table-search\">\n                      <label>{{'table.th.name' | translate}}</label>\n                      <div class=\"searh-3\">\n                        <input type=\"text\" [(ngModel)]=\"parameter.name\" (keyup.enter)=\"getAclUsers()\" name=\"\">\n                        <button *ngIf=\"parameter.name\" (click)=\"getAclUsers()\"><i class=\"fa fa-search\"></i></button>\n                      </div>\n                  </div>\n                </th>\n                <th style=\"width:20%; text-align:left;\">\n                  <div class=\"table-search\">\n                      <label>{{'table.th.contactNumber' | translate}}</label>\n                      <div class=\"searh-3\">\n                        <input type=\"text\" [(ngModel)]=\"parameter.phone\" (keyup.enter)=\"getAclUsers()\" name=\"\">\n                        <button *ngIf=\"parameter.phone\" (click)=\"getAclUsers()\"><i class=\"fa fa-search\"></i></button>\n                      </div>\n                  </div>\n                </th>\n                <th style=\"width:20%\">\n                  <div class=\"table-search\">\n                    <label>{{'table.th.emailAddress' | translate}}</label>\n                      <div class=\"searh-3\">\n                        <input type=\"text\" [(ngModel)]=\"parameter.email\" (keyup.enter)=\"getAclUsers()\" name=\"\">\n                        <button *ngIf=\"parameter.email\" (click)=\"getAclUsers()\"><i class=\"fa fa-search\"></i></button>\n                      </div>\n                  </div>\n                </th>\n                <th style=\"width:10%; vertical-align: top;\">\n                  <div class=\"table-search\">\n                    <label>{{'table.th.empId' | translate}}</label>\n                  </div>\n                </th>\n                <th style=\"width:5%; vertical-align: top;\">\n                  <div class=\"table-search\">\n                    <label>{{'table.th.type' | translate}}</label>\n                    <select [(ngModel)]=\"parameter.user_type\" (change)=\"getAclUsers()\">\n                      <option value=\"0\">{{'table.th.all' | translate}}</option>\n                      <option value=\"1\">{{'table.tr.td.customised' | translate}}</option>\n                      <option value=\"2\">{{'table.tr.td.predefined' | translate}}</option>\n                   </select>\n                  </div>\n                </th>\n                <th style=\"width:10%\">\n                  &nbsp;\n                </th>\n              </tr>\n        \n              <tr *ngFor=\"let item of parameter.items| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: parameter.total }; let i=index\">\n                <td> \n                    <img *ngIf=\"item.image\" [defaultImage]=\"item.image| img:'thumb'\" [lazyLoad]=\"item.image\" class=\"rounded-circle\" alt=\"img\">\n                    <img *ngIf=\"!item.image\" class=\"rounded-circle\" src=\"assets/img/default_img.png\" alt=\"img\">\n                </td>\n                <td class=\"text-left\">\n                  <span class=\"name\">\n                    <a data-toggle=\"popover\" data-placement=\"top\" title=\"{{item.name}}\">\n                      {{item.name | titlecase}}\n                      {{item?.first_surname | titlecase}}\n                      {{item?.second_surname ? (item?.second_surname | titlecase) : ''}}\n                      <!-- {{admin?.admin_acl['Access Controls']?.can_delete}} -->\n                    </a>\n                  </span>\n                </td>\n                <td class=\"text-left\" *ngIf=\"item.phone\">{{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}</td>\n                <td class=\"text-left\" *ngIf=\"!item.phone\">{{'table.tr.td.NA' | translate}}</td>\n                <td class=\"text-left\" *ngIf=\"item.email\">{{item.email}}</td>\n                <td class=\"text-left\" *ngIf=\"!item.email\">{{'table.tr.td.NA' | translate}}</td>\n                <td>{{item.id}}</td>\n                <td>{{item.user_type == 1 ? ('table.tr.td.customised' | translate) : ('table.tr.td.predefined' | translate)}}</td>\n                <td>\n                  <div class=\"table-actions\">\n                    <!-- <a href=\"javascript://\" routerLink=\"/dashboard/access-control-mgt/add-acl-user/{{item.id}}\" class=\"icon-block edit-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></a> -->\n                    <!-- <a [ngClass]=\"{'display-none':admin?.admin_acl['Access Controls']?.can_update==0}\" href=\"javascript://\" (click)=\"editData(item, item.id)\" class=\"icon-block edit-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></a> -->\n                    <!-- <a href=\"javascript://\" class=\"icon-block block-icon unblock-bg\"><img src=\"assets/img/block.png\" alt=\"img\"></a>\n                    <a href=\"javascript://\" class=\"icon-block block-icon\"><img src=\"assets/img/unblock.png\" alt=\"img\"></a> -->\n                    <button title=\"{{'table.title.editDetails' | translate}}\" [disabled]=\"admin?.admin_acl['Access Controls']?.can_update==0\" (click)=\"editData(item, item.id)\" class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></button>\n                    <button [disabled]=\"admin?.admin_acl['Access Controls']?.can_delete==0\"\n                        (click)=\"blockUnblockPopup(i, item.id, item.is_blocked==1?0:1, parameter.type)\" \n                        title=\"{{item.is_blocked==1 ? ('table.title.unblock' | translate) : ('table.title.block' | translate)}}\" [ngClass]=\"{'unblock-bg':item.is_blocked==1}\"\n                        class=\"action-icon\"><img src=\"assets/img/block.png\" alt=\"img\">\n                    </button>\n                    <button [disabled]=\"admin?.admin_acl['Access Controls']?.can_purge==0\" (click)=\"deletePopup(item, i)\" class=\"action-icon\" \n                    title=\"{{'table.title.delete' | translate}}\"><img src=\"assets/img/ic_delete.png\" alt=\"img\"></button>\n                  </div>\n                </td>\n              </tr>\n            </table>\n          </div>\n        </div>\n  \n        <div class=\"center\" *ngIf=\"parameter.total == 0\">\n          <img src=\"assets/img/404-error.png\">\n        </div>\n    </div>\n    \n    <div class=\"btn-cont text-right marginT15\" *ngIf=\"parameter.total\">\n      <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n    </div>\n    \n  </div>\n  \n"

/***/ }),

/***/ "./src/app/layout/acl/acl.component.ts":
/*!*********************************************!*\
  !*** ./src/app/layout/acl/acl.component.ts ***!
  \*********************************************/
/*! exports provided: AclComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AclComponent", function() { return AclComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var src_app_models_acl_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/acl.model */ "./src/app/models/acl.model.ts");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var AclComponent = /** @class */ (function () {
    function AclComponent(constant, admin, cs, sanitization, router, spinner, location, translate) {
        this.constant = constant;
        this.admin = admin;
        this.cs = cs;
        this.sanitization = sanitization;
        this.router = router;
        this.spinner = spinner;
        this.location = location;
        this.translate = translate;
        this.parameter = {};
        var dd = this.cs.checkAccess('Inhouse Agent Management', 'can_read');
        if (dd === 0) {
            this.location.back();
        }
    }
    AclComponent.prototype.ngOnInit = function () {
        this.model = new src_app_models_acl_model__WEBPACK_IMPORTED_MODULE_4__["ACL"]();
        this.model.country_code = this.constant.country_code;
        this.model.dial_code = this.constant.dial_code;
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        this.model.id = '';
        this.initialCountry = { initialCountry: this.constant.country_code };
        // this.getAclList();
        this.getAclUsers();
    };
    AclComponent.prototype.closeModal = function () {
        this.model = new src_app_models_acl_model__WEBPACK_IMPORTED_MODULE_4__["ACL"];
        this.modalClose.nativeElement.click();
    };
    AclComponent.prototype.getPage = function (page) {
        this.parameter.page = page;
        this.getAclUsers();
    };
    AclComponent.prototype.getAclList = function () {
        var _this = this;
        this.admin.postDataApi('getAclList', {})
            .subscribe(function (success) {
            success.data.forEach(function (element) {
                var e = new src_app_models_acl_model__WEBPACK_IMPORTED_MODULE_4__["Permission"]();
                e.acl_id = element.id;
                var acl = { name: element.name };
                e.acl = acl;
                e.can_create = 1;
                e.can_update = 1;
                e.can_read = 1;
                e.can_delete = 1;
                e.can_purge = 1;
                _this.model.admin_acl.push(e);
            });
        });
    };
    AclComponent.prototype.getAclUsers = function () {
        var _this = this;
        this.spinner.show();
        this.admin.postDataApi('getAclUsers', this.parameter)
            .subscribe(function (success) {
            _this.spinner.hide();
            _this.parameter.items = success.data;
            _this.parameter.total = success.total;
        }, function (error) {
            _this.spinner.hide();
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
                swal(_this.translate.instant('swal.error'), success.message, 'error');
            }
            else {
                _this.modalClose.nativeElement.click();
                formdata.reset();
                var text = _this.model.id === '' ?
                    _this.translate.instant('message.success.addedSuccessfully') :
                    _this.translate.instant('message.success.updatedSuccessfully');
                swal(_this.translate.instant('swal.success'), text, 'success');
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
        this.parameter.title = this.translate.instant('message.error.areYouSure');
        switch (flag) {
            case 0:
                this.parameter.text = this.translate.instant('message.error.wantToUnblockUser');
                this.parameter.successText = this.translate.instant('message.success.unblockedSuccessfully');
                break;
            case 1:
                this.parameter.text = this.translate.instant('message.error.wantToBlockUser');
                this.parameter.successText = this.translate.instant('message.success.blockedSuccessfully');
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
            swal(_this.translate.instant('swal.success'), _this.parameter.successText, 'success');
            _this.parameter.items[_this.parameter.index]['is_blocked'] = flag;
        });
    };
    AclComponent.prototype.deletePopup = function (item, index) {
        var _this = this;
        swal({
            html: this.translate.instant('message.error.areYouSure') + '<br>' +
                this.translate.instant('message.error.wantToDeleteUser'),
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.deleteUser(item, index);
            }
        });
    };
    AclComponent.prototype.deleteUser = function (item, index) {
        var _this = this;
        this.admin.postDataApi('deleteAclUser', { id: item.id }).subscribe(function (r) {
            swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.deletedSuccessfully'), 'success');
            _this.parameter.items.splice(index, 1);
        }, function (error) {
            swal(_this.translate.instant('swal.error'), error.error.message, 'error');
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalOpen'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AclComponent.prototype, "modalOpen", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AclComponent.prototype, "modalClose", void 0);
    AclComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-acl',
            template: __webpack_require__(/*! ./acl.component.html */ "./src/app/layout/acl/acl.component.html"),
            styles: [__webpack_require__(/*! ./acl.component.css */ "./src/app/layout/acl/acl.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["Constant"],
            src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_6__["AdminService"], src_app_services_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["DomSanitizer"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_8__["NgxSpinnerService"],
            _angular_common__WEBPACK_IMPORTED_MODULE_3__["Location"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__["TranslateService"]])
    ], AclComponent);
    return AclComponent;
}());



/***/ }),

/***/ "./src/app/layout/acl/acl.module.ts":
/*!******************************************!*\
  !*** ./src/app/layout/acl/acl.module.ts ***!
  \******************************************/
/*! exports provided: AclModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AclModule", function() { return AclModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var ng_lazyload_image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ng-lazyload-image */ "./node_modules/ng-lazyload-image/fesm5/ng-lazyload-image.js");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ng2_tel_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng2-tel-input */ "./node_modules/ng2-tel-input/ng2-tel-input.js");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");
/* harmony import */ var _acl_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./acl.component */ "./src/app/layout/acl/acl.component.ts");
/* harmony import */ var _add_acl_add_acl_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./add-acl/add-acl.component */ "./src/app/layout/acl/add-acl/add-acl.component.ts");
/* harmony import */ var src_app_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/guards/acl-user.guard */ "./src/app/guards/acl-user.guard.ts");
/* harmony import */ var src_app_modules_shared_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/modules/shared.module */ "./src/app/modules/shared.module.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _create_acl_create_acl_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./create-acl/create-acl.component */ "./src/app/layout/acl/create-acl/create-acl.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// third party libraries









// general componets






var routes = [
    // { path: '', component: AclComponent, canActivate: [AclUserGuard]},
    // { path: 'add-acl-user/:id', component: AddAclComponent }
    { path: '', component: _acl_component__WEBPACK_IMPORTED_MODULE_9__["AclComponent"], canActivate: [src_app_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_11__["AclUserGuard"]], data: { roles: ['Access Controls', 'can_read', ''] } },
    {
        path: 'add-acl-user/:id', component: _add_acl_add_acl_component__WEBPACK_IMPORTED_MODULE_10__["AddAclComponent"],
        canActivate: [src_app_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_11__["AclUserGuard"]], data: { roles: ['Access Controls', 'can_create', ''] }
    }
];
var AclModule = /** @class */ (function () {
    function AclModule() {
    }
    AclModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes),
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerModule"],
                ng_lazyload_image__WEBPACK_IMPORTED_MODULE_4__["LazyLoadImageModule"],
                ngx_pagination__WEBPACK_IMPORTED_MODULE_5__["NgxPaginationModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"],
                ng2_tel_input__WEBPACK_IMPORTED_MODULE_7__["Ng2TelInputModule"],
                src_app_modules_shared_module__WEBPACK_IMPORTED_MODULE_12__["SharedModule"],
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__["TranslateModule"],
                _agm_core__WEBPACK_IMPORTED_MODULE_8__["AgmCoreModule"].forRoot({
                    apiKey: 'AIzaSyDykCJGMqHIwJluSmSiqKTJBVN2KauM_uQ',
                    libraries: ['drawing', 'places']
                }),
            ],
            declarations: [
                _acl_component__WEBPACK_IMPORTED_MODULE_9__["AclComponent"],
                _add_acl_add_acl_component__WEBPACK_IMPORTED_MODULE_10__["AddAclComponent"],
                _create_acl_create_acl_component__WEBPACK_IMPORTED_MODULE_14__["CreateAclComponent"]
            ]
        })
    ], AclModule);
    return AclModule;
}());



/***/ }),

/***/ "./src/app/layout/acl/add-acl/add-acl.component.css":
/*!**********************************************************!*\
  !*** ./src/app/layout/acl/add-acl/add-acl.component.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".form-group-2 .cust-radio {\n    float: left;\n    display: block;\n    font-size: 18px;\n    margin-right: 10px;\n    font-family: 'sf_ui_textregular';\n}\n.cust-radio {\n    display: block;\n    position: relative;\n    padding-left: 0;\n    margin-bottom: 12px;\n    cursor: pointer;\n    font-size: 18px;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L2FjbC9hZGQtYWNsL2FkZC1hY2wuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLFlBQVk7SUFDWixlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLG1CQUFtQjtJQUNuQixpQ0FBaUM7Q0FDcEM7QUFDRDtJQUNJLGVBQWU7SUFDZixtQkFBbUI7SUFDbkIsZ0JBQWdCO0lBQ2hCLG9CQUFvQjtJQUNwQixnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLDBCQUEwQjtJQUMxQix1QkFBdUI7SUFDdkIsc0JBQXNCO0lBQ3RCLGtCQUFrQjtDQUNyQiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9hY2wvYWRkLWFjbC9hZGQtYWNsLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZm9ybS1ncm91cC0yIC5jdXN0LXJhZGlvIHtcbiAgICBmbG9hdDogbGVmdDtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBmb250LXNpemU6IDE4cHg7XG4gICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xuICAgIGZvbnQtZmFtaWx5OiAnc2ZfdWlfdGV4dHJlZ3VsYXInO1xufVxuLmN1c3QtcmFkaW8ge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBwYWRkaW5nLWxlZnQ6IDA7XG4gICAgbWFyZ2luLWJvdHRvbTogMTJweDtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgZm9udC1zaXplOiAxOHB4O1xuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG59Il19 */"

/***/ }),

/***/ "./src/app/layout/acl/add-acl/add-acl.component.html":
/*!***********************************************************!*\
  !*** ./src/app/layout/acl/add-acl/add-acl.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container-fluid\">\n  <div class=\"row\">\n      <div class=\"col-12\">\n        <div class=\"title-group\">\n            <h5>{{model.id!='' ? ('viewACL.editACLUser' | translate) : ('viewACL.addACLUser' | translate)}}</h5>\n            <div class=\"spacer30\"></div>\n        </div>\n      </div>\n  </div>\n  <div class=\"white-bg padding40\">\n      <div class=\"row\">\n      <form role=\"form\" ngNativeValidate #addForm=\"ngForm\" (ngSubmit)=\"add(addForm)\">\n        <div class=\"col-xl-12 col-lg-12 col-md-12 col-12\">\n            <div class=\"row\">\n              <div class=\"col-6\">\n                  <div class=\"add-img\" style=\"display:flex;\">\n                      <img *ngIf=\"model?.image\" [src]=\"model?.image\" [defaultImage]=\"model?.image| img:'thumb'\" [lazyLoad]=\"model?.image\" style=\"object-fit: cover; width: 100%;\">\n                      <label *ngIf=\"model?.image\">\n                        <input accept=\"image/*\" name=\"image\" class=\"image\" (change)=\"changeListner($event, 'img_loader', 'image')\" type=\"file\">\n                      </label>\n                      <label *ngIf=\"!model?.image\">{{'addForm.image' | translate}}</label>\n                      <input *ngIf=\"!model?.image\" accept=\"image/*\" name=\"image\" class=\"image\" (change)=\"changeListner($event, 'img_loader', 'image')\" type=\"file\">\n                      <div *ngIf=\"model.img_loader\" class=\"loaderr\"></div>\n                  </div>\n              </div>\n              <div class=\"col-6\">\n                  <div class=\"btn-cont text-right\">\n                      <button *ngIf=\"model.id==''\" type=\"submit\" [disabled]=\"!addForm.valid\" class=\"btn btn-primary\">{{'addForm.addBtn' | translate}}</button>\n                      <button *ngIf=\"model.id!=''\" type=\"submit\" class=\"btn btn-primary\">{{'addForm.updateBtn' | translate}}</button>\n                  </div>\n              </div>\n              <div class=\"col-12\">\n                  <div class=\"spacer40\"></div>\n              </div>\n              <div class=\"col-12\">\n                  <div class=\"form-group-2\">\n                    <label>{{'addForm.names' | translate}} <span class=\"color-red\">*</span></label>\n                    <input [pattern]=\"constant.onlyWhiteSpaces\" autocomplete=\"off\" maxlength=\"50\" required type=\"text\" class=\"form-control\" [(ngModel)]=\"model.name\" name=\"name\">\n                  </div>\n              </div>\n              <div class=\"col-12\">\n                  <div class=\"form-group-2\">\n                    <label>{{'addForm.firstSurname' | translate}} <span class=\"color-red\">*</span></label>\n                    <input [pattern]=\"constant.onlyWhiteSpaces\" autocomplete=\"off\" maxlength=\"30\" required type=\"text\" class=\"form-control\" [(ngModel)]=\"model.first_surname\" name=\"first_surname\">\n                  </div>\n              </div>\n              <div class=\"col-12\">\n                  <div class=\"form-group-2\">\n                    <label>{{'addForm.secondSurname' | translate}} </label>\n                    <input [pattern]=\"constant.onlyWhiteSpaces\" autocomplete=\"off\" maxlength=\"30\" type=\"text\" class=\"form-control\" [(ngModel)]=\"model.second_surname\" name=\"second_surname\">\n                  </div>\n              </div>\n              <div class=\"col-12\">\n                  <div class=\"form-group-2\">\n                    <label>{{'addForm.contactNumber' | translate}} <span class=\"color-red\">*</span></label>\n                    <input minlength=\"6\" maxlength=\"16\" autocomplete=\"off\" type=\"text\" [pattern]=\"constant.phonePattern\" class=\"form-control\" id=\"phone\" required minlength=\"1\" [(ngModel)]=\"model.phone\" name=\"phone\"\n                          ng2TelInput [ng2TelInputOptions]=\"initialCountry\" (countryChange)=\"onCountryChange($event)\" />\n                  </div>\n              </div>\n              <div class=\"col-12\">\n                  <div class=\"form-group-2\">\n                    <label>{{'addForm.emailId' | translate}} <span class=\"color-red\">*</span></label>\n                    <input (keydown.space)=\"$event.preventDefault();\" autocomplete=\"off\" required [pattern]=\"constant.emailPattern\" type=\"email\" class=\"form-control\" [(ngModel)]=\"model.email\" name=\"email\">\n                  </div>\n              </div>\n            </div>\n  \n  \n            <div class=\"row\">\n           <!-- new addition -->\n           <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                 <label>{{'addForm.chooseUserType' | translate}}<span class=\"color-red\">*</span></label>\n                 <div class=\"form-group\">\n                  <select class=\"form-control\" required (change)=\"setUserType($event.target.value)\" [(ngModel)]=\"model.user_type\" name=\"user_type\">\n                    <option value=\"\">{{'addForm.chooseUserType' | translate}}</option>\n                    <option value=\"1\">{{'addForm.customisedRole' | translate}}</option>\n                    <option value=\"2\">{{'addForm.predefinedRole' | translate}}</option>\n                  </select>\n                </div>\n              </div>\n           </div>\n           <div class=\"col-12\" *ngIf=\"model.user_type\">\n              <div class=\"form-group-2\">\n                 <label>{{'addForm.chooseUserRoles' | translate}} <span class=\"color-red\">*</span></label>\n                  <div class=\"clearfix\"></div>\n                  <div>\n                  <label class=\"cust-radio\" *ngFor=\"let user of predefinedUsers; let ii=index\">\n                    <input type=\"checkbox\" (change)=\"setPredefinedUsers(user, !user.value, ii)\"\n                      [value]=\"user.value\" [checked]=\"user.value ? 'checked' : ''\"\n                      name=\"user_id\">\n                    <span class=\"checkmark\">{{user.title}}</span>\n                  </label>       \n                </div>\n                  <div class=\"clearfix\"></div>\n              </div>\n           </div>\n           <br>\n            <div class=\"col-12\" *ngIf=\"model.is_external_agent\">\n               <div class=\"form-group-2\">\n                <div class=\"clearfix\"></div>\n                  <label>{{'addForm.freeLancerOrComapny' | translate}} <span class=\"color-red\">*</span></label>\n                  <div class=\"form-group\">\n                   <select class=\"form-control\" required (change)=\"setIsCompany($event.target.value)\" [(ngModel)]=\"model.is_company\" name=\"is_company\">\n                     <option value=\"true\">{{'addForm.company' | translate}}</option>\n                     <option value=\"false\">{{'addForm.freelancer' | translate}}</option>\n                   </select>\n                 </div>\n               </div>\n            </div>\n            <div class=\"col-12\" *ngIf=\"model.is_external_agent && model.is_company=='true'\">\n             <div class=\"form-group-2\">\n               <label>{{'addForm.agencyCommercialName' | translate}}</label>\n               <div class=\"form-group marginB0\">\n                 <select required title=\"{{'table.title.chooseAgency' | translate}}\" name=\"agency\" class=\"form-control\" (change)=\"setAgency($event.target.value)\">\n                   <option value=\"\">{{'addForm.selectAgency' | translate}}</option>\n                   <option *ngFor=\"let agency of agencies\" value=\"{{agency.id}}\" [selected]=\"model?.agency?.id == agency.id\">{{agency.name}}</option>\n                 </select>\n               </div>\n             </div>\n           </div>\n           </div>\n           <div class=\"row\" *ngIf=\"model.is_external_agent && model.is_company=='false'\">\n              <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                   <label>{{'addForm.rfcLegalId' | translate}} \n                     <!-- <span class=\"color-red\">*</span> -->\n                    </label>\n                   <div class=\"form-group\">\n                    <input autocomplete=\"off\" type=\"text\" class=\"form-control\" name=\"rfc_legal_id\" [(ngModel)]=\"model.rfc_legal_id\">\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                   <label>{{'addForm.address' | translate}}  \n                     <!-- <span class=\"color-red\">*</span> -->\n                  </label>\n                   <div class=\"form-group\">\n                    <input placeholder=\"Search for address\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"off\" type=\"text\" class=\"form-control\" #search1 (input)=\"loadPlaces('adr', 'lat', 'lng', 'searchElementRef')\" name=\"adr\" [(ngModel)]=\"model.adr\" autocomplete=\"off\">\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                    <label>{{'addForm.locationPinOnMap' | translate}} \n                      <!-- <span class=\"color-red\">*</span> -->\n                    </label>\n                   <div class=\"form-group\">\n                    <agm-map class=\"height200\" [latitude]=\"model.lat\" [longitude]=\"model.lng\" [scrollwheel]=\"false\" (mapClick)=\"placeMarker($event, 'lat', 'lng', 'adr')\" [zoom]=\"constant.zoom\">\n                      <agm-marker [latitude]=\"model.lat\" [longitude]=\"model.lng\"></agm-marker>\n                    </agm-map>\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                   <label>{{'addForm.description' | translate}} \n                     <!-- <span class=\"color-red\">*</span> -->\n                  </label>\n                   <div class=\"form-group\">\n                    <textarea autocomplete=\"off\" rows=\"3\" class=\"form-control\" name=\"description\" [(ngModel)]=\"model.description\"></textarea>\n                  </div>\n                </div>\n              </div>\n              </div>\n  \n              <div class=\"row\">      \n                <div class=\"col-12\">\n                  <div class=\"form-group-2\">\n                    <label>{{'addForm.locationTitle' | translate}}<span class=\"color-red\">*</span></label>\n                    <div class=\"row\">\n                      <div class=\"col-10\" *ngFor=\"let add of model.address; let j=index\">\n                        <app-address [countries]=\"parameter.countries\" [address]=\"add\" [index]=\"j\" [status]=\"false\" [disabledBuildings]=\"disabledBuildings\" (disabledBuilding)=\"disabledBuildingId(j)\" (removeAddress)=\"removeAddressObj($event)\"></app-address>\n                      </div>\n                      <div class=\"col-2\" *ngIf=\"model.address?.length!=0\">\n                        <div class=\"btn-cont center\">\n                          <button type=\"button\" class=\"btn btn-primary-new margin0\" (click)=\"addEmptyObj()\">\n                            <img src=\"assets/img/add.png\" alt=\"img\">\n                          </button>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n  \n              <div class=\"clearfix\"></div>\n              <div class=\"access-controls\">\n                <div class=\"select-controls select-controls-1\" *ngFor=\"let permission of model.admin_acl; let i=index\">\n                <label class=\"cust-check-bx2\" [ngClass]=\"{'access-control11':permission.can_create==1 || permission.can_read==1 || permission.can_update==1 || permission.can_delete==1 || permission.can_purge==1}\">{{permission?.acl?.name}}\n                <input (click)=\"expandBox(i)\" type=\"checkbox\" [checked]=\"permission.can_create == 1 || permission.can_read==1 || permission.can_update==1 || permission.can_delete==1 || permission.can_purge==1 ? 'checked': ''\">\n                <span class=\"checkmark\"></span>\n                </label>\n                \n                <div class=\"clearfix\"></div>\n                <div *ngIf=\"permission.show\" id=\"broker-seller-dev\" class=\"inner-select\">\n                  <label class=\"cust-check-bx\" [ngClass]=\"{'inner-checked':permission.can_create==1}\">{{'addForm.canCreate' | translate}}\n                      <input type=\"checkbox\" [checked]=\"permission.can_create == 1 ? 'checked': ''\"  (click)=\"setPermission('can_create', i)\">\n                      <span class=\"checkmark\"></span>\n                  </label>\n                  <label class=\"cust-check-bx\" [ngClass]=\"{'inner-checked':permission.can_read==1}\">{{'addForm.canRead' | translate}}\n                      <input type=\"checkbox\" [checked]=\"permission.can_read == 1 ? 'checked': ''\"  (click)=\"setPermission('can_read', i)\">\n                      <span class=\"checkmark\"></span>\n                  </label>\n                  <label class=\"cust-check-bx\" [ngClass]=\"{'inner-checked':permission.can_update==1}\">{{'addForm.canUpdate' | translate}}\n                      <input type=\"checkbox\" [checked]=\"permission.can_update == 1 ? 'checked': ''\"  (click)=\"setPermission('can_update', i)\">\n                      <span class=\"checkmark\"></span>\n                  </label>\n                  <label class=\"cust-check-bx\" [ngClass]=\"{'inner-checked':permission.can_delete==1}\">{{'addForm.canBlockUnblock' | translate}}\n                      <input type=\"checkbox\" [checked]=\"permission.can_delete == 1 ? 'checked': ''\"  (click)=\"setPermission('can_delete', i)\">\n                      <span class=\"checkmark\"></span>\n                  </label>\n                  <label *ngIf=\"permission?.acl?.name == 'User Management' || permission?.acl?.name == 'Property Management'\n                  || permission?.acl?.name == 'Agencies Management'\n                  || permission?.acl?.name == 'Companies Management'\n                  || permission?.acl?.name == 'Managers Management'\n                  || permission?.acl?.name == 'Developers Management'\n                  || permission?.acl?.name == 'Outside Agent Management'\n                  || permission?.acl?.name == 'Seller Management'\n                  || permission?.acl?.name == 'Buyer Management'\n                  || permission?.acl?.name == 'Inhouse Agent Management'\n                  || permission?.acl?.name == 'Closer Management'\n                  || permission?.acl?.name == 'Data Collector Management'\n                  || permission?.acl?.name == 'Bank Management'\n                  || permission?.acl?.name == 'Templates'\n                  || permission?.acl?.name == 'Project Management' || permission?.acl?.name == 'Notaries Management'\" \n                    class=\"cust-check-bx\" [ngClass]=\"{'inner-checked':permission.can_purge==1}\">{{'addForm.canDelete' | translate}}\n                      <input type=\"checkbox\" [checked]=\"permission.can_purge == 1 ? 'checked': ''\"  (click)=\"setPermission('can_purge', i)\">\n                      <span class=\"checkmark\"></span>\n                  </label>\n                  <label class=\"cust-check-bx\" [ngClass]=\"{'inner-checked':permission.can_crud==1}\">{{'addForm.canCRUD' | translate}}\n                      <input type=\"checkbox\" [checked]=\"permission.can_crud == 1 ? 'checked': ''\"  (click)=\"setPermission('can_crud', i)\">\n                      <span class=\"checkmark\"></span>\n                  </label>\n                  <br>\n                </div>\n                <div class=\"clearfix\"></div>\n              </div>\n                   \n              </div>\n        </div>\n        </form>\n      </div>\n  </div>"

/***/ }),

/***/ "./src/app/layout/acl/add-acl/add-acl.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/layout/acl/add-acl/add-acl.component.ts ***!
  \*********************************************************/
/*! exports provided: AddAclComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddAclComponent", function() { return AddAclComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var src_app_models_acl_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/models/acl.model */ "./src/app/models/acl.model.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var src_app_models_agency_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/models/agency.model */ "./src/app/models/agency.model.ts");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");
/* harmony import */ var src_app_models_inhouse_users_model__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/models/inhouse-users.model */ "./src/app/models/inhouse-users.model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var AddAclComponent = /** @class */ (function () {
    function AddAclComponent(constant, cs, admin, route, spinner, mapsAPILoader, ngZone, router, translate) {
        var _this = this;
        this.constant = constant;
        this.cs = cs;
        this.admin = admin;
        this.route = route;
        this.spinner = spinner;
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.router = router;
        this.translate = translate;
        this.parameter = {};
        this.show = false;
        this.allAcl = [];
        this.addressIndex = 0;
        this.disabledBuildings = [];
        this.seenDuplicate = false;
        this.testObject = [];
        this.admin.countryData$.subscribe(function (success) {
            _this.parameter.allCountry = success;
        });
        this.admin.loginData$.subscribe(function (res) {
            _this.parameter.admin_id = res['id'];
        });
    }
    AddAclComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.model = new src_app_models_acl_model__WEBPACK_IMPORTED_MODULE_6__["ACL"]();
        this.model.img_loader = false;
        this.model.country_code = this.constant.country_code;
        this.model.dial_code = this.constant.dial_code;
        this.model.agency = new src_app_models_agency_model__WEBPACK_IMPORTED_MODULE_8__["Agency"]();
        this.model.is_company = 'true';
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.p = this.constant.p;
        this.initialCountry = { initialCountry: this.constant.country_code };
        this.parameter.routeName = this.router.url;
        this.tempAdd = this.model.address;
        this.setCurrentPosition();
        this.getCountries();
        // checking => after that place in add/edit
        this.model.address = [];
        this.model.img_loader = false;
        // this.parameter.countries ? this.parameter.countries[0].id : 0;
        var obj = {
            countries: this.parameter.countries && this.parameter.countries[0] ? this.parameter.countries[0].id : 0,
            states: '0',
            cities: '0',
            localities: '0',
            buildings: '0'
        };
        this.model.address[0] = obj;
        this.parameter.sub = this.route.params.subscribe(function (params) {
            if (params['id'] !== '0') {
                _this.model.id = params['id'];
                _this.getAclUserById(_this.model.id);
            }
            else {
                _this.model.id = '';
                _this.getAclList();
            }
            _this.getAllAgencies();
        });
    };
    // getAclUserById(id: string) {
    //   this.spinner.show();
    //   this.admin.postDataApi('getAclUserById', {'id': id})
    //   .subscribe(
    //     success => {
    //       this.spinner.hide();
    //       this.model = success.data;
    //       this.image = this.model.image;
    //       this.model.admin_acl = success.data.admin_acl;
    //     }, error => {
    //       this.spinner.hide();
    //     });
    // }
    AddAclComponent.prototype.set = function () {
        this.show = true;
    };
    AddAclComponent.prototype.changeListner = function (event, paramLoader, param) {
        var _this = this;
        if (event.target.files[0].size > this.constant.fileSizeLimit) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.fileSizeExceeds'), 'error');
            return false;
        }
        this.model[paramLoader] = true;
        var reader = new FileReader();
        reader.onload = function (e) {
            _this.model[param] = e.target.result;
            _this.cs.saveImage(event.target.files[0]).subscribe(function (success) {
                _this.model[paramLoader] = false;
                _this.model[param] = success['data'].image;
            });
        };
        reader.readAsDataURL(event.target.files[0]);
    };
    AddAclComponent.prototype.getAclList = function () {
        var _this = this;
        this.spinner.show();
        this.admin.postDataApi('getAclList', {})
            .subscribe(function (success) {
            _this.allAcl = success.data;
            _this.spinner.hide();
            success.data.forEach(function (element) {
                var e = new src_app_models_acl_model__WEBPACK_IMPORTED_MODULE_6__["Permission"]();
                var acl = { name: element.name };
                e.acl_id = element.id;
                e.acl = acl;
                e.show = false;
                e.can_create = 1;
                e.can_update = 1;
                e.can_read = 1;
                e.can_delete = 1;
                e.can_purge = 1;
                e.can_crud = 1;
                _this.model.admin_acl.push(e);
            });
        }, function (error) {
            _this.spinner.hide();
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
            this.model.admin_acl[index]['can_purge'] = this.model.admin_acl[index]['can_crud'] === 1 ? 0 : 1;
            this.model.admin_acl[index]['can_crud'] = this.model.admin_acl[index]['can_crud'] === 1 ? 0 : 1;
        }
        else {
            this.model.admin_acl[index][param] = this.model.admin_acl[index][param] &&
                this.model.admin_acl[index][param] === 1 ? 0 : 1;
            this.model.admin_acl[index]['can_crud'] = this.model.admin_acl[index]['can_create'] === 1 &&
                this.model.admin_acl[index]['can_read'] === 1 && this.model.admin_acl[index]['can_update'] === 1 &&
                this.model.admin_acl[index]['can_delete'] === 1 && this.model.admin_acl[index]['can_purge'] === 1 ? 1 : 0;
        }
    };
    AddAclComponent.prototype.add = function (formdata) {
        var _this = this;
        // if (this.model.adr && this.model.adr.trim() && !this.model.lat && !this.model.lng) {
        //   swal(this.translate.instant('swal.error'), 'Please choose address from dropdown.', 'error');
        //   return;
        // }
        // if (this.model.branch_office && this.model.branch_office.trim() && !this.model.branch_lat && !this.model.branch_lng) {
        //   swal(this.translate.instant('swal.error'), 'Please choose branch address from dropdown.', 'error');
        //   return;
        // }
        if (this.model.img_loader) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.uploadingImage'), 'error');
            return false;
        }
        if (this.model.is_broker && this.model.is_external_agent) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseSelectEitherInhouseOrOutsideAgent'), 'error');
            return false;
        }
        this.parameter.url = this.model.id ? 'updateAclUser' : 'addAclUser';
        this.seenDuplicate = false;
        var input = new FormData();
        if (this.model.id !== '') {
            input.append('id', this.model.id);
        }
        input.append('user_type', this.model.user_type);
        input.append('name', this.model.name);
        input.append('first_surname', this.model.first_surname ? this.model.first_surname : '');
        input.append('second_surname', this.model.second_surname ? this.model.second_surname : '');
        input.append('country_code', this.model.country_code ? this.model.country_code : this.constant.dial_code);
        input.append('dial_code', this.model.dial_code ? this.model.dial_code : this.constant.dial_code);
        input.append('phone', this.model.phone);
        input.append('email', this.model.email);
        input.append('address', JSON.stringify(this.model.address));
        input.append('is_broker_seller_dev', this.model.is_broker_seller_dev ? '1' : '0');
        input.append('is_buyer_renter', this.model.is_buyer_renter ? '1' : '0');
        input.append('is_broker', this.model.is_broker ? '1' : '0');
        input.append('is_data_collector', this.model.is_data_collector ? '1' : '0');
        input.append('is_csr_closer', this.model.is_csr_closer ? '1' : '0');
        input.append('is_external_agent', this.model.is_external_agent ? '1' : '0');
        input.append('is_credit_agent', this.model.is_credit_agent ? '1' : '0');
        input.append('is_collection_agent', this.model.is_collection_agent ? '1' : '0');
        input.append('is_csr_renter', this.model.is_csr_renter ? '1' : '0');
        if (this.model.is_external_agent && this.model.is_company == 'false') {
            input.append('adr', this.model.adr || '');
            input.append('lat', this.model.lat || null);
            input.append('lng', this.model.lng || null);
            input.append('rfc_legal_id', this.model.rfc_legal_id || '');
            input.append('description', this.model.description || '');
            input.append('agency_id', '');
        }
        if (this.model.is_external_agent && this.model.is_company == 'true') {
            input.append('agency_id', this.model.agency.id);
        }
        else {
            input.append('company_name', '');
            input.append('company_logo', '');
            input.append('description', '');
            input.append('adr', '');
            input.append('lat', '');
            input.append('lat', '');
            input.append('branches', JSON.stringify([]));
        }
        if (this.model.image) {
            input.append('image', this.model.image);
        }
        input.append('admin_acl', JSON.stringify(this.model.admin_acl));
        // checking if locality is same or not
        this.model.address.map(function (item) {
            var value = item['buildings'];
            value = value.toString();
            if (value === '0') {
                _this.testObject.push(value);
            }
            else {
                if (_this.testObject.indexOf(value) === -1) {
                    _this.testObject.push(value);
                }
                else {
                    _this.seenDuplicate = true;
                }
            }
        });
        if (this.model.address[0].countries === '' || this.model.address[0].states === '' ||
            this.model.address[0].cities === '' || this.model.address[0].localities === '' || this.model.address[0].buildings === '') {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseLocation'), 'error');
        }
        else if (this.seenDuplicate) {
            this.testObject = [];
            this.seenDuplicate = false;
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseDiffLocality'), 'error');
        }
        else if ((formdata.value.is_broker_seller_dev === false && formdata.value.is_buyer_renter === false &&
            formdata.value.is_broker === false && formdata.value.is_data_collector === false &&
            formdata.value.is_csr_closer === false && formdata.value.is_external_agent === false) ||
            (formdata.value.is_broker_seller_dev === null && formdata.value.is_buyer_renter === null &&
                formdata.value.is_broker === null && formdata.value.is_data_collector === null &&
                formdata.value.is_csr_closer === null && formdata.value.is_external_agent === null)) {
            swal(this.translate.instant('swal.error'), 'Please choose a role for inhouse user.', 'error');
        }
        else {
            this.spinner.show();
            this.admin.postDataApi(this.parameter.url, input)
                .subscribe(function (success) {
                _this.spinner.hide();
                if (success.success === '0') {
                    swal(_this.translate.instant('swal.error'), success.message, 'error');
                }
                else {
                    var text = _this.model.id ? 'Updated successfully.' : 'Added successfully.';
                    swal(_this.translate.instant('swal.success'), text, 'success');
                    _this.router.navigate(['/dashboard/access-control-mgt']);
                    // if (this.model.id) {
                    //   // edit -- replace
                    //   this.parameter.items[this.parameter.index] = success.data;
                    //   formdata.reset();
                    // } else {
                    //   // add - push
                    //   if ((formdata.value.is_broker_seller_dev === true && this.parameter.userType === 'csr-sellers') ||
                    //     (formdata.value.is_buyer_renter === true && this.parameter.userType === 'csr-buyers') ||
                    //     (formdata.value.is_broker === true && this.parameter.userType === 'inhouse-broker') ||
                    //     (formdata.value.is_external_agent === true && this.parameter.userType === 'outside-broker') ||
                    //     (formdata.value.is_data_collector === true && this.parameter.userType === 'data-collectors') ||
                    //     (formdata.value.is_csr_renter === true && this.parameter.userType === 'csr-renters') ||
                    //     (formdata.value.is_credit_agent === true && this.parameter.userType === 'credit-agents') ||
                    //     (formdata.value.is_collection_agent === true && this.parameter.userType === 'collection-agents') ||
                    //     (formdata.value.is_csr_closer === true && this.parameter.userType === 'csr-closers')) {
                    //     this.parameter.items.push(success.data);
                    //     this.parameter.total++;
                    //   }
                    //   formdata.reset();
                    // }
                    // this.emptyModel();
                }
            }, function (error) {
                _this.spinner.hide();
            });
        }
    };
    AddAclComponent.prototype.getAclUserById = function (id) {
        var _this = this;
        this.spinner.show();
        this.model.img_loader = false;
        this.admin.postDataApi('getNewUserById', { id: id }).subscribe(function (r) {
            _this.spinner.hide();
            var userdata = r['data'];
            for (var index = 0; index < userdata.admin_acls.length; index++) {
                var element = userdata.admin_acls[index];
                element['acl'] = { name: element.name, id: element.acl_id };
            }
            _this.model.address = [];
            _this.model.id = userdata.id;
            _this.model.name = userdata.name;
            _this.model.first_surname = userdata.first_surname;
            _this.model.second_surname = userdata.second_surname;
            _this.model.email = userdata.email;
            _this.model.phone = userdata.phone;
            if (userdata.agency_id != null && userdata.agency_id != 0) {
                _this.model.is_company = 'true';
            }
            else {
                _this.model.is_company = 'false';
            }
            _this.model.country_code = userdata.country_code;
            // if (this.obj) {
            //   this.obj.intlTelInput('setCountry', this.model.country_code ? this.model.country_code : this.constant.country_code);
            // }
            // this.model.company_name = userdata.company_name;
            _this.model.description = userdata.description;
            // this.model.is_external_agent = userdata.is_external_agent;
            _this.model.agency = userdata.agency ? userdata.agency : new src_app_models_agency_model__WEBPACK_IMPORTED_MODULE_8__["Agency"]();
            _this.model.adr = userdata.address;
            _this.model.lat = userdata.lat;
            _this.model.lng = userdata.lng;
            _this.model.rfc_legal_id = userdata.rfc_legal_id;
            // branch
            // if (userdata.branches && userdata.branches.length > 0) {
            //   this.model.branch_office = userdata.branches[0].address;
            //   this.model.branch_lat = userdata.branches[0].lat;
            //   this.model.branch_lng = userdata.branches[0].lng;
            // }
            _this.model.image = userdata.image != null ? userdata.image : '';
            _this.model.is_broker_seller_dev = userdata.permissions && userdata.permissions.can_csr_seller == 1 ? true : false;
            _this.model.is_buyer_renter = userdata.permissions && userdata.permissions.can_csr_buyer == 1 ? true : false;
            _this.model.is_broker = userdata.permissions && userdata.permissions.can_in_house_broker == 1 ? true : false;
            _this.model.is_data_collector = userdata.permissions && userdata.permissions.can_data_collector == 1 ? true : false;
            _this.model.is_csr_closer = userdata.permissions && userdata.permissions.can_csr_closer == 1 ? true : false;
            _this.model.is_external_agent = userdata.permissions && userdata.permissions.can_outside_broker == 1 ? true : false;
            _this.model.is_csr_renter = userdata.permissions && userdata.permissions.can_csr_renter == 1 ? true : false;
            _this.model.is_collection_agent = userdata.permissions && userdata.permissions.can_collection_agent == 1 ? true : false;
            _this.model.is_credit_agent = userdata.permissions && userdata.permissions.can_credit_agent == 1 ? true : false;
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
            if (_this.model.address.length < 1) {
                var obj = {
                    countries: _this.parameter.countries && _this.parameter.countries[0] ? _this.parameter.countries[0].id : 0,
                    states: '0',
                    cities: '0',
                    localities: '0',
                    buildings: '0'
                };
                _this.model.address[0] = obj;
            }
            _this.model.admin_acl = userdata.admin_acls;
            for (var index = 0; index < userdata.admin_acls.length; index++) {
                var element = userdata.admin_acls[index];
                element.can_create = element.can_create || 0,
                    element.can_delete = element.can_delete || 0,
                    element.can_update = element.can_update || 0,
                    element.can_read = element.can_read || 0,
                    element.can_crud = element.can_crud || 0,
                    element.can_purge = element.can_purge || 0;
            }
            _this.setUserType(userdata.user_type);
        }, function (erorr) {
            _this.spinner.hide();
        });
    };
    AddAclComponent.prototype.emptyModel = function () {
        this.model.country_code = this.constant.country_code;
        this.model.dial_code = this.constant.dial_code;
        this.model = new src_app_models_inhouse_users_model__WEBPACK_IMPORTED_MODULE_10__["UserModel"]();
        this.initialCountry = { initialCountry: this.constant.initialCountry };
        this.disabledBuildings = [];
    };
    // add(formData: NgForm) {
    //   if (this.model.img_loader) {
    //     swal(this.translate.instant('swal.error'), this.translate.instant('message.error.uploadingImage'), 'error');
    //     return;
    //   }
    //   console.log(this.model);
    //   this.spinner.show();
    //   this.admin.postDataApi('addAclUser', this.model)
    //     .subscribe(
    //       success => {
    //         this.spinner.hide();
    //         if (success.success === '0') {
    //           swal(this.translate.instant('swal.error'), success.message, 'error');
    //         } else {
    //           const text = this.model.id === '' ?
    //                   this.translate.instant('message.success.addedSuccessfully') :
    //                   this.translate.instant('message.success.updatedSuccessfully');
    //           swal(this.translate.instant('swal.success'), text, 'success');
    //           if (this.model.id === '') {
    //             // this.model.image = '';
    //             // formData.reset();
    //             // this.getAclList();
    //             this.router.navigate(['/dashboard/access-control-mgt']);
    //           } else {
    //             if (this.parameter.admin_id === this.model.id) {
    //               this.admin.login.next(success.data);
    //               this.admin.permissions = success.data.permissions ? success.data.permissions : {};
    //               const dd = success.data.m.map((obj, index) => {
    //                 const key =  Object.keys(obj)[0];
    //                 this.admin.admin_acl[key] =  obj[key];
    //               });
    //             }
    //           }
    //         }
    //       }, error => {
    //         this.spinner.hide();
    //       });
    // }
    AddAclComponent.prototype.removeAddressObj = function (index) {
        this.model.address.splice(index, 1);
        this.disabledBuildings.splice(index, 1);
    };
    AddAclComponent.prototype.addEmptyObj = function () {
        this.addressIndex = this.model.address.length;
        this.addressIndex--;
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
    AddAclComponent.prototype.disabledBuildingId = function (i) {
        this.disabledBuildings[i] = this.model.address[i].localities;
    };
    AddAclComponent.prototype.onCountryChange = function (e) {
        this.model.country_code = e.iso2;
        this.model.dial_code = '+' + e.dialCode;
        this.initialCountry = { initialCountry: e.iso2 };
    };
    AddAclComponent.prototype.getCountries = function () {
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
            _this.parameter.countries = r['data'];
        });
    };
    AddAclComponent.prototype.getStates = function (country_id) {
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
    AddAclComponent.prototype.getCities = function (state_id) {
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
    AddAclComponent.prototype.getLocalities = function (city_id) {
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
    AddAclComponent.prototype.getLocalityBuildings = function (locality_id) {
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
    AddAclComponent.prototype.setBuilding = function (building_id) {
        this.parameter.building_id = building_id;
    };
    AddAclComponent.prototype.getAllAgencies = function () {
        var _this = this;
        this.admin.postDataApi('getAllAgencies', {})
            .subscribe(function (success) {
            _this.agencies = success.data;
        });
    };
    AddAclComponent.prototype.addRow = function () {
        var obj = {
            countries: '',
            states: '',
            cities: '',
            localities: '',
            buildings: ''
        };
        this.model.address.push(obj);
    };
    AddAclComponent.prototype.getCountryLocality = function () {
        var _this = this;
        this.admin.postDataApi('getCountryLocality', {}).subscribe(function (r) {
            _this.parameter.countries = r['data'];
        });
    };
    AddAclComponent.prototype.onCountryChange1 = function (id) {
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
    AddAclComponent.prototype.onStateChange = function (id) {
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
    AddAclComponent.prototype.onCityChange = function (id) {
        if (!id || id === 0) {
            this.parameter.locality_id = '0';
            return false;
        }
        this.parameter.city_id = id;
        var selectedCountry = this.parameter.cities.filter(function (x) { return x.id === id; });
        this.parameter.localities = selectedCountry[0].localities;
    };
    AddAclComponent.prototype.onLocalityChange = function (id) {
        if (!id || id === 0) {
            return false;
        }
        this.parameter.locality_id = id;
        // let selectedLocation = this.location.localities.filter(x=>x.id == id);
        // this.location.locality = selectedLocation[0];
    };
    AddAclComponent.prototype.loadPlaces = function (paramAdd, paramLat, paramLng, searchRef) {
        var _this = this;
        // load Places Autocomplete
        this.model[paramLat] = null;
        this.model[paramLng] = null;
        this.mapsAPILoader.load().then(function () {
            var autocomplete = new google.maps.places.Autocomplete(_this[searchRef].nativeElement, {
                types: []
            });
            autocomplete.addListener('place_changed', function () {
                _this.ngZone.run(function () {
                    // get the place result
                    // const place: google.maps.places.PlaceResult = autocomplete.getPlace();
                    var place = autocomplete.getPlace();
                    // verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    // set latitude, longitude and zoom
                    _this.model[paramLat] = place.geometry.location.lat();
                    _this.model[paramLng] = place.geometry.location.lng();
                    if (place.formatted_address) {
                        _this.model[paramAdd] = place.formatted_address;
                    }
                });
            });
        });
    };
    AddAclComponent.prototype.setCurrentPosition = function () {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                // setting address lat lng
                // this.model.lat = position.coords.latitude;
                // this.model.lng = position.coords.longitude;
                // setting branch office lat lng
                // this.model.branch_lat = position.coords.latitude;
                // this.model.branch_lng = position.coords.longitude;
            });
        }
    };
    AddAclComponent.prototype.placeMarker = function ($event, paramLat, paramLng, param) {
        this.model[paramLat] = $event.coords.lat;
        this.model[paramLng] = $event.coords.lng;
        this.getGeoLocation(this.model[paramLat], this.model[paramLng], param);
    };
    AddAclComponent.prototype.getGeoLocation = function (lat, lng, param) {
        var _this = this;
        if (navigator.geolocation) {
            var geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(lat, lng);
            var request = { latLng: latlng };
            geocoder.geocode(request, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    var result = results[0];
                    if (result != null) {
                        _this.model[param] = result.formatted_address;
                    }
                    else {
                        _this.model[param] = lat + ',' + lng;
                    }
                }
            });
        }
    };
    AddAclComponent.prototype.setUserType = function (user_type) {
        this.model.user_type = user_type;
        if (user_type == 2) {
            this.predefinedUsers = [
                {
                    title: this.translate.instant('addForm.CSRBuyer'),
                    key: 'is_buyer_renter',
                    value: this.model.is_buyer_renter
                }, {
                    title: this.translate.instant('addForm.CSRRenter'),
                    key: 'is_csr_renter',
                    value: this.model.is_csr_renter
                }, {
                    title: this.translate.instant('addForm.inhouseAgent'),
                    key: 'is_broker',
                    value: this.model.is_broker
                },
                {
                    title: this.translate.instant('addForm.outSideAgent'),
                    key: 'is_external_agent',
                    value: this.model.is_external_agent
                }, {
                    title: this.translate.instant('addForm.CSRSeller'),
                    key: 'is_broker_seller_dev',
                    value: this.model.is_broker_seller_dev
                }, {
                    title: this.translate.instant('addForm.dataCollector'),
                    key: 'is_data_collector',
                    value: this.model.is_data_collector
                }, {
                    title: this.translate.instant('addForm.CSRClosure'),
                    key: 'is_csr_closer',
                    value: this.model.is_csr_closer
                }, {
                    title: this.translate.instant('addForm.collectionAgent'),
                    key: 'is_collection_agent',
                    value: this.model.is_collection_agent
                }, {
                    title: this.translate.instant('addForm.creditAgent'),
                    key: 'is_credit_agent',
                    value: this.model.is_credit_agent
                },
            ];
        }
        else {
            this.predefinedUsers = [
                {
                    title: this.translate.instant('addForm.acl'),
                    key: 'is_acl',
                    value: this.model.is_acl
                }
            ];
        }
    };
    AddAclComponent.prototype.setPredefinedUsers = function (item, value, i) {
        console.log(item.key, this.model[item.key]);
        console.log(item, value);
        this.model[item.key] = value;
        this.predefinedUsers[i].value = value;
        console.log(item, value);
        console.log(item.key, this.model[item.key]);
    };
    AddAclComponent.prototype.setIsCompany = function (is_company) {
        this.model.is_company = is_company;
    };
    AddAclComponent.prototype.setAgency = function (id) {
        this.model.agency = new src_app_models_agency_model__WEBPACK_IMPORTED_MODULE_8__["Agency"]();
        this.model.agency.id = id;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('search1'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddAclComponent.prototype, "searchElementRef", void 0);
    AddAclComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-add-acl',
            template: __webpack_require__(/*! ./add-acl.component.html */ "./src/app/layout/acl/add-acl/add-acl.component.html"),
            styles: [__webpack_require__(/*! ./add-acl.component.css */ "./src/app/layout/acl/add-acl/add-acl.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_common_constants__WEBPACK_IMPORTED_MODULE_3__["Constant"], src_app_services_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"],
            src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_5__["AdminService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_2__["NgxSpinnerService"],
            _agm_core__WEBPACK_IMPORTED_MODULE_9__["MapsAPILoader"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateService"]])
    ], AddAclComponent);
    return AddAclComponent;
}());



/***/ }),

/***/ "./src/app/layout/acl/create-acl/create-acl.component.css":
/*!****************************************************************!*\
  !*** ./src/app/layout/acl/create-acl/create-acl.component.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9hY2wvY3JlYXRlLWFjbC9jcmVhdGUtYWNsLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/layout/acl/create-acl/create-acl.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/layout/acl/create-acl/create-acl.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container-fluid\">\n  <div class=\"row\">\n      <div class=\"col-12\">\n        <div class=\"title-group\">\n            <h5>{{model.id!='' ? ('viewACL.editACLUser' | translate) : ('viewACL.addACLUser' | translate)}}</h5>\n            <div class=\"spacer30\"></div>\n        </div>\n      </div>\n  </div>\n  <div class=\"white-bg padding40\">\n      <div class=\"row\">\n      <form role=\"form\" ngNativeValidate #addForm=\"ngForm\" (ngSubmit)=\"add(addForm)\">\n        <div class=\"col-xl-12 col-lg-12 col-md-12 col-12\">\n            <div class=\"row\">\n              <div class=\"col-6\">\n                  <div class=\"add-img\" style=\"display:flex;\">\n                      <img *ngIf=\"model?.image\" [src]=\"model?.image\" [defaultImage]=\"model?.image| img:'thumb'\" [lazyLoad]=\"model?.image\" style=\"object-fit: cover; width: 100%;\">\n                      <label *ngIf=\"model?.image\">\n                        <input accept=\"image/*\" name=\"image\" class=\"image\" (change)=\"changeListner($event, 'img_loader', 'image')\" type=\"file\">\n                      </label>\n                      <label *ngIf=\"!model?.image\">{{'addForm.image' | translate}}</label>\n                      <input *ngIf=\"!model?.image\" accept=\"image/*\" name=\"image\" class=\"image\" (change)=\"changeListner($event, 'img_loader', 'image')\" type=\"file\">\n                      <div *ngIf=\"model.img_loader\" class=\"loaderr\"></div>\n                  </div>\n              </div>\n              <div class=\"col-6\">\n                  <div class=\"btn-cont text-right\">\n                      <button *ngIf=\"model.id==''\" type=\"submit\" [disabled]=\"!addForm.valid\" class=\"btn btn-primary\">{{'addForm.addBtn' | translate}}</button>\n                      <button *ngIf=\"model.id!=''\" type=\"submit\" class=\"btn btn-primary\">{{'addForm.updateBtn' | translate}}</button>\n                  </div>\n              </div>\n              <div class=\"col-12\">\n                  <div class=\"spacer40\"></div>\n              </div>\n              <div class=\"col-12\">\n                  <div class=\"form-group-2\">\n                    <label>{{'addForm.name' | translate}} <span class=\"color-red\">*</span></label>\n                    <input [pattern]=\"constant.onlyWhiteSpaces\" autocomplete=\"off\" required type=\"text\" class=\"form-control\" [(ngModel)]=\"model.name\" name=\"name\">\n                  </div>\n              </div>\n              <div class=\"col-12\">\n                  <div class=\"form-group-2\">\n                    <label>{{'addForm.contactNumber' | translate}} <span class=\"color-red\">*</span></label>\n                    <input minlength=\"6\" maxlength=\"16\" autocomplete=\"off\" type=\"text\" [pattern]=\"constant.phonePattern\" class=\"form-control\" id=\"phone\" required minlength=\"1\" [(ngModel)]=\"model.phone\" name=\"phone\"\n                          ng2TelInput [ng2TelInputOptions]=\"initialCountry\" (countryChange)=\"onCountryChange($event)\" />\n                  </div>\n              </div>\n              <div class=\"col-12\">\n                  <div class=\"form-group-2\">\n                    <label>{{'addForm.emailId' | translate}} <span class=\"color-red\">*</span></label>\n                    <input (keydown.space)=\"$event.preventDefault();\" autocomplete=\"off\" required [pattern]=\"constant.emailPattern\" type=\"email\" class=\"form-control\" [(ngModel)]=\"model.email\" name=\"email\">\n                  </div>\n              </div>\n            </div>\n  \n  \n           \n           <!-- new addition -->\n           <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                 <label>Choose User Type<span class=\"color-red\">*</span></label>\n                 <div class=\"form-group\">\n                  <select class=\"form-control\" required (change)=\"setUserType($event.target.value)\" [(ngModel)]=\"model.user_type\" name=\"user_type\">\n                    <option value=\"\">Choose User Type</option>\n                    <option value=\"true\">Customised Role</option>\n                    <option value=\"false\">Predefined Role</option>\n                  </select>\n                </div>\n              </div>\n           </div>\n           <!-- *ngIf=\"model.user_type == true || model.user_type == false\" -->\n           <div class=\"col-12\" >\n              <div class=\"form-group-3\">\n                 <label>Choose User Roles <span class=\"color-red\">*</span></label>\n                  <div class=\"clearfix\"></div>\n                  <div>\n                  <label class=\"cust-radio\" *ngFor=\"let user of predefinedUsers\">\n                    <input type=\"checkbox\" (change)=\"setPredefinedUsers(user, $event.target.value)\"\n                      value=\"{{user.value}}\" [checked]=\"user.value ? 'checked' : ''\"\n                      name=\"user_id\">\n                    <span class=\"checkmark\">{{user.title}}</span>\n                  </label>       \n                </div>\n                  <div class=\"clearfix\"></div>\n              </div>\n           </div>\n           <br>\n            <div class=\"col-12\" *ngIf=\"(parameter.userType=='outside-broker' || model.is_external_agent)\">\n               <div class=\"form-group-2\">\n                <div class=\"clearfix\"></div>\n                  <label>{{'addForm.freeLancerOrComapny' | translate}} <span class=\"color-red\">*</span></label>\n                  <div class=\"form-group\">\n                   <select class=\"form-control\" required (change)=\"setIsCompany($event.target.value)\" [(ngModel)]=\"model.is_company\" name=\"is_company\">\n                     <option value=\"true\">Company</option>\n                     <option value=\"false\">Freelancer</option>\n                   </select>\n                 </div>\n               </div>\n            </div>\n            <div class=\"col-12\" *ngIf=\"(parameter.userType=='outside-broker' || model.is_external_agent) && (model.is_company=='true')\">\n             <div class=\"form-group-2\">\n               <label>{{'addForm.agencyCommercialName' | translate}}</label>\n               <div class=\"form-group marginB0\">\n                 <select required title=\"{{'table.title.chooseAgency' | translate}}\" name=\"agency\" class=\"form-control\" (change)=\"setAgency($event.target.value)\">\n                   <option value=\"\">{{'addForm.selectAgency' | translate}}</option>\n                   <option *ngFor=\"let agency of agencies\" value=\"{{agency.id}}\" [selected]=\"model?.agency?.id == agency.id\">{{agency.name}}</option>\n                 </select>\n               </div>\n             </div>\n           </div>\n  \n           <div class=\"row\" *ngIf=\"(parameter.userType=='outside-broker' || model.is_external_agent) && (model.is_company=='false')\">\n              <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                   <label>{{'addForm.rfcLegalId' | translate}} \n                     <!-- <span class=\"color-red\">*</span> -->\n                    </label>\n                   <div class=\"form-group\">\n                    <input autocomplete=\"off\" type=\"text\" class=\"form-control\" name=\"rfc_legal_id\" [(ngModel)]=\"model.rfc_legal_id\">\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                   <label>{{'addForm.address' | translate}}  \n                     <!-- <span class=\"color-red\">*</span> -->\n                  </label>\n                   <div class=\"form-group\">\n                    <input placeholder=\"Search for address\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"off\" type=\"text\" class=\"form-control\" #search1 (input)=\"loadPlaces('adr', 'lat', 'lng', 'searchElementRef')\" name=\"adr\" [(ngModel)]=\"model.adr\" autocomplete=\"off\">\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                    <label>{{'addForm.locationPinOnMap' | translate}} \n                      <!-- <span class=\"color-red\">*</span> -->\n                    </label>\n                   <div class=\"form-group\">\n                    <agm-map class=\"height200\" [latitude]=\"model.lat\" [longitude]=\"model.lng\" [scrollwheel]=\"false\" (mapClick)=\"placeMarker($event, 'lat', 'lng', 'adr')\" [zoom]=\"constant.zoom\">\n                      <agm-marker [latitude]=\"model.lat\" [longitude]=\"model.lng\"></agm-marker>\n                    </agm-map>\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                   <label>{{'addForm.description' | translate}} \n                     <!-- <span class=\"color-red\">*</span> -->\n                  </label>\n                   <div class=\"form-group\">\n                    <textarea autocomplete=\"off\" rows=\"3\" class=\"form-control\" name=\"description\" [(ngModel)]=\"model.description\"></textarea>\n                  </div>\n                </div>\n              </div>\n              </div>\n  \n              <div class=\"clearfix\"></div>\n              <div *ngFor=\"let add of model.address; let j=index\">\n                <app-address [countries]=\"parameter.countries\" [address]=\"add\" [index]=\"j\" [status]=\"false\" [disabledBuildings]=\"disabledBuildings\" (disabledBuilding)=\"disabledBuildingId(j)\" (removeAddress)=\"removeAddressObj($event)\"></app-address>\n              </div>\n              <div class=\"clearfix\"></div>\n  \n              <div class=\"col-12\" *ngIf=\"model.address?.length!=0\">\n                <div class=\"btn-cont center\">\n                  <button type=\"button\" class=\"btn btn-primary-new margin0\" (click)=\"addEmptyObj()\">\n                    <img src=\"assets/img/add.png\" alt=\"img\">\n                  </button>\n                </div>\n              </div>\n  \n  \n  \n            <div class=\"access-controls\">\n                <div class=\"select-controls select-controls-1\" *ngFor=\"let permission of model.admin_acl; let i=index\">\n                <label class=\"cust-check-bx2\" [ngClass]=\"{'access-control11':permission.can_create==1 || permission.can_read==1 || permission.can_update==1 || permission.can_delete==1 || permission.can_purge==1}\">{{permission?.acl?.name}}\n                <input (click)=\"expandBox(i)\" type=\"checkbox\" [checked]=\"permission.can_create == 1 || permission.can_read==1 || permission.can_update==1 || permission.can_delete==1 || permission.can_purge==1 ? 'checked': ''\">\n                <span class=\"checkmark\"></span>\n                </label>\n                \n                <div class=\"clearfix\"></div>\n                <div *ngIf=\"permission.show\" id=\"broker-seller-dev\" class=\"inner-select\">\n                  <label class=\"cust-check-bx\" [ngClass]=\"{'inner-checked':permission.can_create==1}\">{{'addForm.canCreate' | translate}}\n                      <input type=\"checkbox\" [checked]=\"permission.can_create == 1 ? 'checked': ''\"  (click)=\"setPermission('can_create', i)\">\n                      <span class=\"checkmark\"></span>\n                  </label>\n                  <label class=\"cust-check-bx\" [ngClass]=\"{'inner-checked':permission.can_read==1}\">{{'addForm.canRead' | translate}}\n                      <input type=\"checkbox\" [checked]=\"permission.can_read == 1 ? 'checked': ''\"  (click)=\"setPermission('can_read', i)\">\n                      <span class=\"checkmark\"></span>\n                  </label>\n                  <label class=\"cust-check-bx\" [ngClass]=\"{'inner-checked':permission.can_update==1}\">{{'addForm.canUpdate' | translate}}\n                      <input type=\"checkbox\" [checked]=\"permission.can_update == 1 ? 'checked': ''\"  (click)=\"setPermission('can_update', i)\">\n                      <span class=\"checkmark\"></span>\n                  </label>\n                  <label class=\"cust-check-bx\" [ngClass]=\"{'inner-checked':permission.can_delete==1}\">{{'addForm.canBlockUnblock' | translate}}\n                      <input type=\"checkbox\" [checked]=\"permission.can_delete == 1 ? 'checked': ''\"  (click)=\"setPermission('can_delete', i)\">\n                      <span class=\"checkmark\"></span>\n                  </label>\n                  <label *ngIf=\"permission?.acl?.name == 'User Management' || permission?.acl?.name == 'Property Management'\n                  || permission?.acl?.name == 'Agencies Management'\n                  || permission?.acl?.name == 'Companies Management'\n                  || permission?.acl?.name == 'Managers Management'\n                  || permission?.acl?.name == 'Developers Management'\n                  || permission?.acl?.name == 'Outside Agent Management'\n                  || permission?.acl?.name == 'Seller Management'\n                  || permission?.acl?.name == 'Buyer Management'\n                  || permission?.acl?.name == 'Inhouse Agent Management'\n                  || permission?.acl?.name == 'Closer Management'\n                  || permission?.acl?.name == 'Data Collector Management'\n                  || permission?.acl?.name == 'Bank Management'\n                  || permission?.acl?.name == 'Templates'\n                  || permission?.acl?.name == 'Project Management' || permission?.acl?.name == 'Notaries Management'\" \n                    class=\"cust-check-bx\" [ngClass]=\"{'inner-checked':permission.can_purge==1}\">{{'addForm.canDelete' | translate}}\n                      <input type=\"checkbox\" [checked]=\"permission.can_purge == 1 ? 'checked': ''\"  (click)=\"setPermission('can_purge', i)\">\n                      <span class=\"checkmark\"></span>\n                  </label>\n                  <label class=\"cust-check-bx\" [ngClass]=\"{'inner-checked':permission.can_crud==1}\">{{'addForm.canCRUD' | translate}}\n                      <input type=\"checkbox\" [checked]=\"permission.can_crud == 1 ? 'checked': ''\"  (click)=\"setPermission('can_crud', i)\">\n                      <span class=\"checkmark\"></span>\n                  </label>\n                  <br>\n                </div>\n                <div class=\"clearfix\"></div>\n              </div>\n              \n              <!-- inner-checked -->\n                    <!-- <div class=\"select-controls\">\n                <label class=\"cust-check-bx2\">Data Collector\n                <input id=\"dc\" type=\"checkbox\">\n                <span class=\"checkmark\"></span>\n                </label>\n                <div class=\"clearfix\"></div>\n                      <div style=\"display:none;\" id=\"data-collector\" class=\"inner-select\">\n                  <label class=\"cust-check-bx\">Abc\n                                <input type=\"checkbox\">\n                                <span class=\"checkmark\"></span>\n                    </label>\n                    <label class=\"cust-check-bx inner-checked\">Lorem ipsum\n                                <input type=\"checkbox\" checked=\"checked\">\n                                <span class=\"checkmark\"></span>\n                    </label>\n                    <label class=\"cust-check-bx\">xyz\n                                <input type=\"checkbox\">\n                                <span class=\"checkmark\"></span>\n                    </label>\n                    <label class=\"cust-check-bx\">Abc\n                                <input type=\"checkbox\">\n                                <span class=\"checkmark\"></span>\n                    </label>\n                    <label class=\"cust-check-bx inner-checked\">Lorem ipsum\n                                <input type=\"checkbox\" checked=\"checked\">\n                                <span class=\"checkmark\"></span>\n                    </label>\n                    <label class=\"cust-check-bx\">xyz\n                                <input type=\"checkbox\">\n                                <span class=\"checkmark\"></span>\n                    </label>\n    \n                </div>\n                  </div> -->\n    \n    \n                  \n              </div>\n        </div>\n        </form>\n      </div>\n  </div>"

/***/ }),

/***/ "./src/app/layout/acl/create-acl/create-acl.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/layout/acl/create-acl/create-acl.component.ts ***!
  \***************************************************************/
/*! exports provided: CreateAclComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateAclComponent", function() { return CreateAclComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var src_app_models_acl_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/models/acl.model */ "./src/app/models/acl.model.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var src_app_models_agency_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/models/agency.model */ "./src/app/models/agency.model.ts");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var CreateAclComponent = /** @class */ (function () {
    function CreateAclComponent(constant, cs, admin, route, spinner, mapsAPILoader, ngZone, router, translate) {
        var _this = this;
        this.constant = constant;
        this.cs = cs;
        this.admin = admin;
        this.route = route;
        this.spinner = spinner;
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.router = router;
        this.translate = translate;
        this.parameter = {};
        this.show = false;
        this.allAcl = [];
        this.addressIndex = 0;
        this.disabledBuildings = [];
        this.seenDuplicate = false;
        this.testObject = [];
        this.admin.countryData$.subscribe(function (success) {
            _this.parameter.allCountry = success;
        });
        this.admin.loginData$.subscribe(function (res) {
            _this.parameter.admin_id = res['id'];
        });
    }
    CreateAclComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.model = new src_app_models_acl_model__WEBPACK_IMPORTED_MODULE_6__["ACL"]();
        this.model.img_loader = false;
        this.model.country_code = this.constant.country_code;
        this.model.dial_code = this.constant.dial_code;
        this.model.agency = new src_app_models_agency_model__WEBPACK_IMPORTED_MODULE_8__["Agency"]();
        this.model.is_company = 'true';
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.p = this.constant.p;
        this.initialCountry = { initialCountry: this.constant.country_code };
        this.parameter.routeName = this.router.url;
        this.tempAdd = this.model.address;
        this.setCurrentPosition();
        this.getCountries();
        // checking => after that place in add/edit
        this.model.address = [];
        this.model.img_loader = false;
        // this.parameter.countries ? this.parameter.countries[0].id : 0;
        var obj = {
            countries: this.parameter.countries && this.parameter.countries[0] ? this.parameter.countries[0].id : 0,
            states: '0',
            cities: '0',
            localities: '0',
            buildings: '0'
        };
        this.model.address[0] = obj;
        this.parameter.sub = this.route.params.subscribe(function (params) {
            if (params['id'] !== '0') {
                _this.model.id = params['id'];
                _this.getAclUserById(_this.model.id);
            }
            else {
                _this.model.id = '';
                _this.getAclList();
            }
            if (_this.parameter.userType === 'inhouse-broker' || _this.parameter.userType === 'outside-broker') {
                _this.getAllAgencies();
            }
        });
    };
    CreateAclComponent.prototype.getAclUserById = function (id) {
        var _this = this;
        this.spinner.show();
        this.admin.postDataApi('getAclUserById', { 'id': id })
            .subscribe(function (success) {
            _this.spinner.hide();
            _this.model = success.data;
            _this.image = _this.model.image;
            _this.model.admin_acl = success.data.admin_acl;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    CreateAclComponent.prototype.set = function () {
        this.show = true;
    };
    CreateAclComponent.prototype.changeListner = function (event, paramLoader, param) {
        var _this = this;
        if (event.target.files[0].size > this.constant.fileSizeLimit) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.fileSizeExceeds'), 'error');
            return false;
        }
        this.model[paramLoader] = true;
        var reader = new FileReader();
        reader.onload = function (e) {
            _this.model[param] = e.target.result;
            _this.cs.saveImage(event.target.files[0]).subscribe(function (success) {
                _this.model[paramLoader] = false;
                _this.model[param] = success['data'].image;
            });
        };
        reader.readAsDataURL(event.target.files[0]);
    };
    CreateAclComponent.prototype.getAclList = function () {
        var _this = this;
        this.spinner.show();
        this.admin.postDataApi('getAclList', {})
            .subscribe(function (success) {
            _this.allAcl = success.data;
            _this.spinner.hide();
            success.data.forEach(function (element) {
                var e = new src_app_models_acl_model__WEBPACK_IMPORTED_MODULE_6__["Permission"]();
                var acl = { name: element.name };
                e.acl_id = element.id;
                e.acl = acl;
                e.show = false;
                e.can_create = 1;
                e.can_update = 1;
                e.can_read = 1;
                e.can_delete = 1;
                e.can_purge = 1;
                e.can_crud = 1;
                _this.model.admin_acl.push(e);
            });
        }, function (error) {
            _this.spinner.hide();
        });
    };
    CreateAclComponent.prototype.expandBox = function (index) {
        this.model.admin_acl[index].show = this.model.admin_acl[index].show === true ? false : true;
    };
    CreateAclComponent.prototype.setPermission = function (param, index) {
        if (param === 'can_crud') {
            this.model.admin_acl[index]['can_create'] = this.model.admin_acl[index]['can_crud'] === 1 ? 0 : 1;
            this.model.admin_acl[index]['can_read'] = this.model.admin_acl[index]['can_crud'] === 1 ? 0 : 1;
            this.model.admin_acl[index]['can_update'] = this.model.admin_acl[index]['can_crud'] === 1 ? 0 : 1;
            this.model.admin_acl[index]['can_delete'] = this.model.admin_acl[index]['can_crud'] === 1 ? 0 : 1;
            this.model.admin_acl[index]['can_purge'] = this.model.admin_acl[index]['can_crud'] === 1 ? 0 : 1;
            this.model.admin_acl[index]['can_crud'] = this.model.admin_acl[index]['can_crud'] === 1 ? 0 : 1;
        }
        else {
            this.model.admin_acl[index][param] = this.model.admin_acl[index][param] &&
                this.model.admin_acl[index][param] === 1 ? 0 : 1;
            this.model.admin_acl[index]['can_crud'] = this.model.admin_acl[index]['can_create'] === 1 &&
                this.model.admin_acl[index]['can_read'] === 1 && this.model.admin_acl[index]['can_update'] === 1 &&
                this.model.admin_acl[index]['can_delete'] === 1 && this.model.admin_acl[index]['can_purge'] === 1 ? 1 : 0;
        }
    };
    CreateAclComponent.prototype.add = function (formData) {
        var _this = this;
        if (this.model.img_loader) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.uploadingImage'), 'error');
            return;
        }
        console.log(this.model);
        this.spinner.show();
        this.admin.postDataApi('addAclUser', this.model)
            .subscribe(function (success) {
            _this.spinner.hide();
            if (success.success === '0') {
                swal(_this.translate.instant('swal.error'), success.message, 'error');
            }
            else {
                var text = _this.model.id === '' ?
                    _this.translate.instant('message.success.addedSuccessfully') :
                    _this.translate.instant('message.success.updatedSuccessfully');
                swal(_this.translate.instant('swal.success'), text, 'success');
                if (_this.model.id === '') {
                    // this.model.image = '';
                    // formData.reset();
                    // this.getAclList();
                    _this.router.navigate(['/dashboard/access-control-mgt']);
                }
                else {
                    if (_this.parameter.admin_id === _this.model.id) {
                        _this.admin.login.next(success.data);
                        _this.admin.permissions = success.data.permissions ? success.data.permissions : {};
                        var dd = success.data.m.map(function (obj, index) {
                            var key = Object.keys(obj)[0];
                            _this.admin.admin_acl[key] = obj[key];
                        });
                    }
                }
            }
        }, function (error) {
            _this.spinner.hide();
        });
    };
    CreateAclComponent.prototype.removeAddressObj = function (index) {
        this.model.address.splice(index, 1);
        this.disabledBuildings.splice(index, 1);
    };
    CreateAclComponent.prototype.addEmptyObj = function () {
        this.addressIndex = this.model.address.length;
        this.addressIndex--;
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
    CreateAclComponent.prototype.disabledBuildingId = function (i) {
        this.disabledBuildings[i] = this.model.address[i].localities;
    };
    CreateAclComponent.prototype.onCountryChange = function (e) {
        this.model.country_code = e.iso2;
        this.model.dial_code = '+' + e.dialCode;
        this.initialCountry = { initialCountry: e.iso2 };
    };
    CreateAclComponent.prototype.getCountries = function () {
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
            _this.parameter.countries = r['data'];
        });
    };
    CreateAclComponent.prototype.getStates = function (country_id) {
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
    CreateAclComponent.prototype.getCities = function (state_id) {
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
    CreateAclComponent.prototype.getLocalities = function (city_id) {
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
    CreateAclComponent.prototype.getLocalityBuildings = function (locality_id) {
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
    CreateAclComponent.prototype.setBuilding = function (building_id) {
        this.parameter.building_id = building_id;
    };
    CreateAclComponent.prototype.getAllAgencies = function () {
        var _this = this;
        this.admin.postDataApi('getAllAgencies', {})
            .subscribe(function (success) {
            _this.agencies = success.data;
        });
    };
    CreateAclComponent.prototype.addRow = function () {
        var obj = {
            countries: '',
            states: '',
            cities: '',
            localities: '',
            buildings: ''
        };
        this.model.address.push(obj);
    };
    CreateAclComponent.prototype.getCountryLocality = function () {
        var _this = this;
        this.admin.postDataApi('getCountryLocality', {}).subscribe(function (r) {
            _this.parameter.countries = r['data'];
        });
    };
    CreateAclComponent.prototype.onCountryChange1 = function (id) {
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
    CreateAclComponent.prototype.onStateChange = function (id) {
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
    CreateAclComponent.prototype.onCityChange = function (id) {
        if (!id || id === 0) {
            this.parameter.locality_id = '0';
            return false;
        }
        this.parameter.city_id = id;
        var selectedCountry = this.parameter.cities.filter(function (x) { return x.id === id; });
        this.parameter.localities = selectedCountry[0].localities;
    };
    CreateAclComponent.prototype.onLocalityChange = function (id) {
        if (!id || id === 0) {
            return false;
        }
        this.parameter.locality_id = id;
        // let selectedLocation = this.location.localities.filter(x=>x.id == id);
        // this.location.locality = selectedLocation[0];
    };
    CreateAclComponent.prototype.loadPlaces = function (paramAdd, paramLat, paramLng, searchRef) {
        var _this = this;
        // load Places Autocomplete
        this.model[paramLat] = null;
        this.model[paramLng] = null;
        this.mapsAPILoader.load().then(function () {
            var autocomplete = new google.maps.places.Autocomplete(_this[searchRef].nativeElement, {
                types: []
            });
            autocomplete.addListener('place_changed', function () {
                _this.ngZone.run(function () {
                    // get the place result
                    // const place: google.maps.places.PlaceResult = autocomplete.getPlace();
                    var place = autocomplete.getPlace();
                    // verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    // set latitude, longitude and zoom
                    _this.model[paramLat] = place.geometry.location.lat();
                    _this.model[paramLng] = place.geometry.location.lng();
                    if (place.formatted_address) {
                        _this.model[paramAdd] = place.formatted_address;
                    }
                });
            });
        });
    };
    CreateAclComponent.prototype.setCurrentPosition = function () {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                // setting address lat lng
                // this.model.lat = position.coords.latitude;
                // this.model.lng = position.coords.longitude;
                // setting branch office lat lng
                // this.model.branch_lat = position.coords.latitude;
                // this.model.branch_lng = position.coords.longitude;
            });
        }
    };
    CreateAclComponent.prototype.placeMarker = function ($event, paramLat, paramLng, param) {
        this.model[paramLat] = $event.coords.lat;
        this.model[paramLng] = $event.coords.lng;
        this.getGeoLocation(this.model[paramLat], this.model[paramLng], param);
    };
    CreateAclComponent.prototype.getGeoLocation = function (lat, lng, param) {
        var _this = this;
        if (navigator.geolocation) {
            var geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(lat, lng);
            var request = { latLng: latlng };
            geocoder.geocode(request, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    var result = results[0];
                    if (result != null) {
                        _this.model[param] = result.formatted_address;
                    }
                    else {
                        _this.model[param] = lat + ',' + lng;
                    }
                }
            });
        }
    };
    CreateAclComponent.prototype.setUserType = function (user_type) {
        this.model.user_type = user_type;
        if (user_type) {
            this.predefinedUsers = [
                {
                    title: this.translate.instant('addForm.CSRSeller'),
                    key: 'is_broker_seller_dev',
                    value: 0
                }, {
                    title: this.translate.instant('addForm.CSRBuyer'),
                    key: 'is_buyer_renter',
                    value: 0
                }, {
                    title: this.translate.instant('addForm.inhouseAgent'),
                    key: 'is_broker',
                    value: 0
                }, {
                    title: this.translate.instant('addForm.dataCollector'),
                    key: 'is_data_collector',
                    value: 0
                }, {
                    title: this.translate.instant('addForm.CSRClosure'),
                    key: 'is_csr_closer',
                    value: 0
                }, {
                    title: this.translate.instant('addForm.CSRRenter'),
                    key: 'is_csr_renter',
                    value: 0
                }, {
                    title: this.translate.instant('addForm.collectionAgent'),
                    key: 'is_collection_agent',
                    value: 0
                }, {
                    title: this.translate.instant('addForm.creditAgent'),
                    key: 'is_credit_agent',
                    value: 0
                },
            ];
        }
        else {
            this.predefinedUsers = [
                {
                    title: this.translate.instant('addForm.developer'),
                    key: 'is_credit_agent',
                    value: 0
                },
                {
                    title: this.translate.instant('addForm.outSideAgent'),
                    key: 'is_external_agent',
                    value: 0
                }
            ];
        }
        console.log(this.model.user_type);
    };
    CreateAclComponent.prototype.setPredefinedUsers = function (item, value) {
        this.model[item.key] = value;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('search1'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CreateAclComponent.prototype, "searchElementRef", void 0);
    CreateAclComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-create-acl',
            template: __webpack_require__(/*! ./create-acl.component.html */ "./src/app/layout/acl/create-acl/create-acl.component.html"),
            styles: [__webpack_require__(/*! ./create-acl.component.css */ "./src/app/layout/acl/create-acl/create-acl.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_common_constants__WEBPACK_IMPORTED_MODULE_3__["Constant"], src_app_services_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"],
            src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_5__["AdminService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_2__["NgxSpinnerService"],
            _agm_core__WEBPACK_IMPORTED_MODULE_9__["MapsAPILoader"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateService"]])
    ], CreateAclComponent);
    return CreateAclComponent;
}());



/***/ })

}]);
//# sourceMappingURL=acl-acl-module.js.map