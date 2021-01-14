(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["settings-settings-module"],{

/***/ "./src/app/directives/match-value.directive.ts":
/*!*****************************************************!*\
  !*** ./src/app/directives/match-value.directive.ts ***!
  \*****************************************************/
/*! exports provided: MatchValueDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatchValueDirective", function() { return MatchValueDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _match_value_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./match-value.validator */ "./src/app/directives/match-value.validator.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MatchValueDirective = /** @class */ (function () {
    function MatchValueDirective() {
        this.appMatchValue = [];
    }
    MatchValueDirective_1 = MatchValueDirective;
    MatchValueDirective.prototype.validate = function (formGroup) {
        return Object(_match_value_validator__WEBPACK_IMPORTED_MODULE_2__["MatchValue"])(this.appMatchValue[0], this.appMatchValue[1])(formGroup);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('appMatchValue'),
        __metadata("design:type", Array)
    ], MatchValueDirective.prototype, "appMatchValue", void 0);
    MatchValueDirective = MatchValueDirective_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[appMatchValue]',
            providers: [
                { provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALIDATORS"], useExisting: MatchValueDirective_1, multi: true }
            ]
        }),
        __metadata("design:paramtypes", [])
    ], MatchValueDirective);
    return MatchValueDirective;
    var MatchValueDirective_1;
}());



/***/ }),

/***/ "./src/app/directives/match-value.validator.ts":
/*!*****************************************************!*\
  !*** ./src/app/directives/match-value.validator.ts ***!
  \*****************************************************/
/*! exports provided: MatchValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatchValue", function() { return MatchValue; });
// custom validator to check that two fields match
function MatchValue(firstControlName, secondControlName) {
    return function (formGroup) {
        var firstControl = formGroup.controls[firstControlName];
        var secondControl = formGroup.controls[secondControlName];
        // return null if controls haven't initialised yet
        if (!firstControl ||
            !secondControl ||
            !firstControl.value ||
            !secondControl.value) {
            return null;
        }
        if (secondControl.errors && !secondControl.errors.matchValueError) {
            return null;
        }
        if (firstControl.value !== secondControl.value) {
            secondControl.setErrors({ matchValueError: true });
        }
        else {
            secondControl.setErrors(null);
        }
    };
}


/***/ }),

/***/ "./src/app/layout/settings/change-password/change-password.component.css":
/*!*******************************************************************************!*\
  !*** ./src/app/layout/settings/change-password/change-password.component.css ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9zZXR0aW5ncy9jaGFuZ2UtcGFzc3dvcmQvY2hhbmdlLXBhc3N3b3JkLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/layout/settings/change-password/change-password.component.html":
/*!********************************************************************************!*\
  !*** ./src/app/layout/settings/change-password/change-password.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<!--content start-->\n<div class=\"container-fluid\">\n    <div class=\"breadcrumb-group\">\n    <h5>{{'settings.label' | translate}}</h5>\n    <nav class=\"breadcrumb\">\n        <a class=\"breadcrumb-item\">{{'settings.home' | translate}}</a>\n        <a class=\"breadcrumb-item\">{{'settings.label' | translate}}</a>\n        <span class=\"breadcrumb-item active\">{{'changePass.label' | translate}}</span>\n    </nav>\n    </div>\n\n    <form class=\"form-horizontal\" novalidate #addForm=\"ngForm\" \n        [appMatchValue]=\"['password', 'c_password']\" (ngSubmit)=\"changePassword(addForm)\">\n        \n        <div class=\"form-group-3 row\">\n            <label class=\"col-sm-3 col-form-label\">{{'changePass.newPassword' | translate}}:</label>\n\n            <div class=\"col-sm-9\">\n                <input autocomplete=\"off\" type=\"password\" class=\"form-control\" placeholder=\"{{'addForm.placeholder.newPassword' | translate}}\" minlength=\"6\" id=\"password\" required [(ngModel)]=\"model.password\" name=\"password\" #password=\"ngModel\">\n\n                <div *ngIf=\"password.errors && (password.dirty || password.touched)\" class=\"show-error\">\n                    <div [hidden]=\"!password.errors.required\">\n                        {{'changePass.passwordRequired' | translate}}\n                    </div>\n                    <div [hidden]=\"!password.errors.minlength\">\n                        {{'changePass.passwordMinLength' | translate}} {{6-model.password.length}}.\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"form-group-3 row\">\n            <label class=\"col-sm-3 col-form-label\">{{'changePass.confirmPassword' | translate}}:</label>\n            <div class=\"col-sm-9\">\n                <input type=\"password\" class=\"form-control\" placeholder=\"{{'addForm.placeholder.confirmPassword' | translate}}\" minlength=\"6\" id=\"c_password\" required [(ngModel)]=\"model.c_password\" name=\"c_password\" #c_password=\"ngModel\">\n\n                <div *ngIf=\"c_password.errors && (c_password.dirty || c_password.touched)\" class=\"show-error\">\n                    <div [hidden]=\"!c_password.errors.required\">\n                        {{'changePass.confirmPasswordRequired' | translate}}\n                    </div>\n                    <div [hidden]=\"!c_password.errors.minlength\">\n                        {{'changePass.confirmPasswordRequired' | translate}} {{6-model.c_password.length}}.\n                    </div>\n                    <div [hidden]=\"!c_password.errors.matchValueError\">\n                        {{'changePass.samePassAndConfirmPass' | translate}}\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"form-group btn-cont text-right\">\n            <button [disabled]=\"addForm.invalid\" class=\"btn btn-primary apply-btn\" type=\"submit\">{{'changePass.updatePass' | translate}}</button>\n        </div>\n    </form>\n</div>\n      "

/***/ }),

/***/ "./src/app/layout/settings/change-password/change-password.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/layout/settings/change-password/change-password.component.ts ***!
  \******************************************************************************/
/*! exports provided: ChangePasswordComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChangePasswordComponent", function() { return ChangePasswordComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
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





var ChangePasswordComponent = /** @class */ (function () {
    function ChangePasswordComponent(router, admin, spinner, translate) {
        this.router = router;
        this.admin = admin;
        this.spinner = spinner;
        this.translate = translate;
        this.parameter = {};
        this.model = {
            password: '',
            c_password: ''
        };
    }
    ChangePasswordComponent.prototype.ngOnInit = function () { };
    ChangePasswordComponent.prototype.changePassword = function (formData) {
        var _this = this;
        this.spinner.show();
        this.admin.postDataApi('changePassword', this.model)
            .subscribe(function (success) {
            _this.spinner.hide();
            swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.updatedSuccessfully'), 'success');
            localStorage.removeItem('token');
            _this.router.navigate(['']);
        }, function (error) {
            _this.spinner.hide();
        });
    };
    ChangePasswordComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-change-password',
            template: __webpack_require__(/*! ./change-password.component.html */ "./src/app/layout/settings/change-password/change-password.component.html"),
            styles: [__webpack_require__(/*! ./change-password.component.css */ "./src/app/layout/settings/change-password/change-password.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_2__["AdminService"], ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__["TranslateService"]])
    ], ChangePasswordComponent);
    return ChangePasswordComponent;
}());



/***/ }),

/***/ "./src/app/layout/settings/default-settings/default-settings.component.css":
/*!*********************************************************************************!*\
  !*** ./src/app/layout/settings/default-settings/default-settings.component.css ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9zZXR0aW5ncy9kZWZhdWx0LXNldHRpbmdzL2RlZmF1bHQtc2V0dGluZ3MuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/layout/settings/default-settings/default-settings.component.html":
/*!**********************************************************************************!*\
  !*** ./src/app/layout/settings/default-settings/default-settings.component.html ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<!--content start-->\n<div class=\"container-fluid\">\n    <div class=\"breadcrumb-group\">\n    <h5>{{'settings.label' | translate}}</h5>\n    <nav class=\"breadcrumb\">\n      <a class=\"breadcrumb-item\">{{'settings.home' | translate}}</a>\n        <a class=\"breadcrumb-item\">{{'settings.label' | translate}}</a>\n        <span class=\"breadcrumb-item active\">{{'defaultSettings.label' | translate}}</span>\n    </nav>\n    </div>\n\n    <form class=\"form-horizontal\" novalidate #addForm=\"ngForm\" (ngSubmit)=\"updateGlobalSetting()\">\n        \n        <div class=\"form-group-3 row\">\n            <label class=\"col-sm-6 col-form-label\">{{'defaultSettings.propertyWillBMarkedApproved' | translate}}:</label>\n            <div class=\"col-sm-6\">\n                <div class=\"clearfix\"></div>\n                <label class=\"cust-radio\">\n                  <input type=\"radio\" (change)=\"setValue('bulk_approve_property', 1)\" value=\"1\" [checked]=\"model.bulk_approve_property == 1 ? 'checked' : ''\" name=\"bulk_approve_property\">\n                  <span class=\"checkmark\">{{'defaultSettings.yes' | translate}}</span>\n                </label>\n                <label class=\"cust-radio\">\n                  <input type=\"radio\" (change)=\"setValue('bulk_approve_property', 0)\" value=\"0\" [checked]=\"model.bulk_approve_property == 0 ? 'checked' : ''\" name=\"bulk_approve_property\">\n                  <span class=\"checkmark\">{{'defaultSettings.no' | translate}}</span>\n                </label>\n                <div class=\"clearfix\"></div>\n            </div>\n        </div>\n\n        <div class=\"form-group-3 row\">\n            <label class=\"col-sm-6 col-form-label\">{{'defaultSettings.projectWillBMarkedApproved' | translate}}:</label>\n            <div class=\"col-sm-6\">\n                <div class=\"clearfix\"></div>\n                <label class=\"cust-radio\">\n                  <input type=\"radio\" (change)=\"setValue('bulk_approve_project', 1)\" value=\"1\" [checked]=\"model.bulk_approve_project == 1 ? 'checked' : ''\" name=\"bulk_approve_project\">\n                  <span class=\"checkmark\">{{'defaultSettings.yes' | translate}}</span>\n                </label>\n                <label class=\"cust-radio\">\n                  <input type=\"radio\" (change)=\"setValue('bulk_approve_project', 0)\" value=\"0\" [checked]=\"model.bulk_approve_project == 0 ? 'checked' : ''\" name=\"bulk_approve_project\">\n                  <span class=\"checkmark\">{{'defaultSettings.no' | translate}}</span>\n                </label>\n                <div class=\"clearfix\"></div>\n            </div>\n        </div>\n\n        <div class=\"form-group-3 row\">\n            <label class=\"col-sm-6 col-form-label\">{{'defaultSettings.cashLimit' | translate}}:</label>\n            <div class=\"col-sm-2\">\n              <input type=\"number\" class=\"form-control\" appUptoThreeDecimal step=\"0.001\" name=\"cash_limit\" [(ngModel)]=\"model.cash_limit\">\n            </div>\n        </div>\n        <div class=\"form-group btn-cont text-right\">\n            <button class=\"btn btn-primary apply-btn\" type=\"submit\">{{'defaultSettings.updateSettings' | translate}}</button>\n        </div>\n    </form>\n</div>\n      "

/***/ }),

/***/ "./src/app/layout/settings/default-settings/default-settings.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/layout/settings/default-settings/default-settings.component.ts ***!
  \********************************************************************************/
/*! exports provided: DefaultSettingsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultSettingsComponent", function() { return DefaultSettingsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var src_app_models_settings_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/settings.model */ "./src/app/models/settings.model.ts");
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





var DefaultSettingsComponent = /** @class */ (function () {
    function DefaultSettingsComponent(admin, model, spinner, translate) {
        this.admin = admin;
        this.model = model;
        this.spinner = spinner;
        this.translate = translate;
        this.parameter = {};
    }
    DefaultSettingsComponent.prototype.ngOnInit = function () {
        this.getGlobalSetting();
    };
    DefaultSettingsComponent.prototype.setValue = function (key, value) {
        this.model[key] = value;
    };
    DefaultSettingsComponent.prototype.getGlobalSetting = function () {
        var _this = this;
        this.admin.postDataApi('getGlobalSetting', {})
            .subscribe(function (success) {
            _this.model = success.data;
        }, function (error) {
        });
    };
    DefaultSettingsComponent.prototype.updateGlobalSetting = function () {
        var _this = this;
        this.spinner.show();
        this.admin.postDataApi('updateGlobalSetting', this.model)
            .subscribe(function (success) {
            _this.spinner.hide();
            _this.admin.globalSettings.next(success.data);
            swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.updatedSuccessfully'), 'success');
        }, function (error) {
            _this.spinner.hide();
        });
    };
    DefaultSettingsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-default-settings',
            template: __webpack_require__(/*! ./default-settings.component.html */ "./src/app/layout/settings/default-settings/default-settings.component.html"),
            styles: [__webpack_require__(/*! ./default-settings.component.css */ "./src/app/layout/settings/default-settings/default-settings.component.css")],
            providers: [src_app_models_settings_model__WEBPACK_IMPORTED_MODULE_2__["Settings"]]
        }),
        __metadata("design:paramtypes", [src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_1__["AdminService"], src_app_models_settings_model__WEBPACK_IMPORTED_MODULE_2__["Settings"], ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__["TranslateService"]])
    ], DefaultSettingsComponent);
    return DefaultSettingsComponent;
}());



/***/ }),

/***/ "./src/app/layout/settings/documents/documents.component.css":
/*!*******************************************************************!*\
  !*** ./src/app/layout/settings/documents/documents.component.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9zZXR0aW5ncy9kb2N1bWVudHMvZG9jdW1lbnRzLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/layout/settings/documents/documents.component.html":
/*!********************************************************************!*\
  !*** ./src/app/layout/settings/documents/documents.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container-fluid\">\n    <div class=\"breadcrumb-group\">\n      <h5>{{'settings.label' | translate}}</h5>\n        <nav class=\"breadcrumb\">\n          <a class=\"breadcrumb-item\">{{'settings.home' | translate}}</a>\n          <a class=\"breadcrumb-item\">{{'settings.label' | translate}}</a>\n          <span class=\"breadcrumb-item active\">{{'documents.label' | translate}}</span>\n        </nav>\n    </div>\n    <div class=\"white-bg\">\n        <div class=\"page-title\">\n          <h3>{{'documents.documents' | translate}}</h3>\n        </div>\n  \n        <div class=\"form-outer\">\n            <div class=\"inline-form-group\">\n               <div class=\"row\">\n                  <div class=\"col-md-4\">\n                      <label><strong>{{'documents.name' | translate}}</strong></label>\n                  </div>\n                  <div class=\"col-md-8\" *ngIf=\"admin?.admin_acl['Settings']?.can_create==1\">\n                     <form role=\"form\" novalidate #addForm1=\"ngForm\" (ngSubmit)=\"checkIfSpanishNameEntered(addForm1, '', addForm1.value.name_en, addForm1.value.name_es, 1, 'add');\">\n                        <div class=\"row\">\n                          <div class=\"col-lg-6 col-md-6\">\n                            <input type=\"text\" autocomplete=\"off\" class=\"form-control\" placeholder=\"{{'addForm.placeholder.nameEn' | translate}}\" id=\"name_en\" required [(ngModel)]=\"model.name_en\" name=\"name_en\">\n                          </div>\n                          <div class=\"col-lg-6 col-md-6\">\n                              <input type=\"text\" autocomplete=\"off\" class=\"form-control\" placeholder=\"{{'addForm.placeholder.nameEs' | translate}}\" [(ngModel)]=\"model.name_es\" name=\"name_es\">\n                          </div>\n                        </div>\n                      <button [disabled]=\"admin?.admin_acl['Settings']?.can_create==0 || addForm1.invalid\" type=\"submit\" class=\"add-btn btn\">\n                         <img src=\"assets/img/add.png\" alt=\"img\">\n                       </button>\n                     </form>\n                  </div>\n               </div>\n            </div>\n        </div>\n  \n        <div class=\"tabel-section padding40 paddingT0\">\n            <div class=\"table-responsive\">\n              <table class=\"table table-striped\">\n                  <tr>\n                    <th style=\"width:40%; text-align:left;\">{{'table.th.nameEn' | translate}}</th>\n                    <th style=\"width:40%; text-align:left;\">{{'table.th.nameEs' | translate}}</th>\n                    <th style=\"width:20%\">{{'table.th.actions.label' | translate}}</th>\n                  </tr>\n                  <tr *ngFor=\"let item of parameter.items; let i=index\">\n                    <td class=\"text-left\">\n                      {{item.name_en}}\n                    </td>\n                    <td class=\"text-left\">\n                      {{item.name_es}}\n                    </td>\n                  <td>\n                      <button title=\"{{'table.title.editDetails' | translate}}\" [disabled]=\"admin?.admin_acl['Settings']?.can_update==0\" \n                      (click)=\"openModal(addDocumentModal, item.id, item.name_en, item.name_es, item.status, i)\" class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></button>\n                    \n                      <!-- status = 1 means unblocked -->\n                      <button [disabled]=\"admin?.admin_acl['Settings']?.can_delete==0\"\n                        (click)=\"blockUnblock(item.id, item.name_en, item.name_es, item.status==1?0:1, i)\" \n                        title=\"{{item.status==1 ? ('table.title.block' | translate) : ('table.title.unblock' | translate)}}\" [ngClass]=\"{'unblock-bg':item.status==0}\"\n                        class=\"action-icon\"><img src=\"assets/img/block.png\" alt=\"img\">\n                      </button>\n                  </td>\n                  </tr>\n  \n                  <div *ngIf=\"parameter.total == 0\">\n                    <p class=\"show-not-found\">\n                        {{'message.error.noDocumentFound' | translate}}\n                    </p>\n                  </div>\n              </table>\n            </div>\n        </div>\n  \n    </div>\n  </div>\n  \n\n<!-- add document modal -->\n<ng-template #addDocumentModal>\n  <div class=\"modal-content\">\n    <div class=\"modal-header my-modal-header\">\n      <h4 class=\"modal-title\">{{'documents.editDocumentName' | translate}}</h4>\n      <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <form class=\"form-horizontal my-modal-form\" role=\"form\" novalidate #addForm=\"ngForm\" (ngSubmit)=\"checkIfSpanishNameEntered(addForm, model.id, addForm.value.name_en, addForm.value.name_es, model.status, 'edit')\">\n      <div class=\"modal-body my-modal-body\">\n        <div class=\"form-group\">\n          <input autocomplete=\"off\" type=\"text\" class=\"form-control\" placeholder=\"{{'addForm.placeholder.nameEn' | translate}}\" id=\"name_en\" required [(ngModel)]=\"model.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n        </div>\n        <div class=\"form-group\">\n          <input autocomplete=\"off\" type=\"text\" class=\"form-control\" placeholder=\"{{'addForm.placeholder.nameEs' | translate}}\" [(ngModel)]=\"model.name_es\" name=\"name_es\">\n        </div>\n      </div>\n      <div class=\"modal-footer btn-cont\">\n        <button type=\"submit\" [disabled]=\"admin?.admin_acl['Settings']?.can_create==0 || addForm.invalid\" class=\"btn btn-primary-new\">Submit</button>\n        <button type=\"button\" class=\"btn btn-default\" aria-label=\"Close\" (click)=\"modalRef.hide()\">Close</button>\n      </div>\n    </form>\n  </div>\n</ng-template>\n"

/***/ }),

/***/ "./src/app/layout/settings/documents/documents.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/layout/settings/documents/documents.component.ts ***!
  \******************************************************************/
/*! exports provided: DocumentsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentsComponent", function() { return DocumentsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/index.js");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var src_app_models_document_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/document.model */ "./src/app/models/document.model.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var DocumentsComponent = /** @class */ (function () {
    function DocumentsComponent(constant, modalService, admin, model, spinner, translate) {
        this.constant = constant;
        this.modalService = modalService;
        this.admin = admin;
        this.model = model;
        this.spinner = spinner;
        this.translate = translate;
        this.parameter = {};
    }
    DocumentsComponent.prototype.ngOnInit = function () {
        this.getDocumentOptions();
    };
    DocumentsComponent.prototype.closeModal = function () {
        this.modalRef.hide();
    };
    DocumentsComponent.prototype.openModal = function (template, id, name_en, name_es, status, index) {
        this.model.id = id;
        this.model.name_en = name_en;
        this.model.name_es = name_es;
        this.model.status = status;
        this.parameter.index = index;
        this.modalRef = this.modalService.show(template);
    };
    DocumentsComponent.prototype.addDocumentOptions = function (id, name_en, name_es, status, type) {
        var _this = this;
        if (type !== 'add') {
            this.modalRef.hide();
        }
        // this.spinner.show();
        var input = new FormData();
        input.append('name_en', name_en);
        input.append('name_es', name_es);
        input.append('status', status.toString());
        if (id) {
            input.append('id', id);
        }
        this.admin.postDataApi('addDocumentOptions', input)
            .subscribe(function (success) {
            _this.model = new src_app_models_document_model__WEBPACK_IMPORTED_MODULE_4__["Document"]();
            var text = id ?
                _this.translate.instant('message.success.updatedSuccessfully') :
                _this.translate.instant('message.success.addedSuccessfully');
            swal(_this.translate.instant('swal.success'), text, 'success');
            if (id === '') {
                _this.parameter.items.push(success.data);
            }
            else {
                _this.parameter.items[_this.parameter.index] = success.data;
            }
        });
    };
    DocumentsComponent.prototype.getDocumentOptions = function () {
        var _this = this;
        this.parameter.url = 'getDocumentOptions';
        this.spinner.show();
        this.admin.postDataApi(this.parameter.url, {})
            .subscribe(function (success) {
            _this.spinner.hide();
            _this.parameter.items = success.data;
            _this.parameter.total = success.data.length;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    // addPossessionStatusPopup(id: string, name_en: string, name_es: string, status: number, type: string) {
    //   const text = status === 1 ? this.constant.title.UNBLOCK_PROJECT_POSSESSION : this.constant.title.BLOCK_PROJECT_POSSESSION;
    //   swal({
    //     // title: this.constant.title.ARE_YOU_SURE,
    //     // text: status === 1 ? this.constant.title.UNBLOCK_PROJECT_POSSESSION : this.constant.title.BLOCK_PROJECT_POSSESSION,
    //     html: this.translate.instant('message.error.areYouSure') + '<br>' + text,
    //     type: 'warning',
    //     showCancelButton: true,
    //     confirmButtonColor: this.constant.confirmButtonColor,
    //     cancelButtonColor: this.constant.cancelButtonColor,
    //     confirmButtonText: 'Yes'
    //   }).then((result) => {
    //     if (result.value) {
    //       this.addDocumentOptions(id, name_en, name_es, status, type);
    //     }
    //   });
    // }
    DocumentsComponent.prototype.checkIfSpanishNameEntered = function (formdata, id, name_en, name_es, status, type) {
        var _this = this;
        formdata.reset();
        var self = this;
        if (name_es === undefined) {
            swal({
                text: this.translate.instant('message.error.saveEngDocumentName'),
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: this.constant.confirmButtonColor,
                cancelButtonColor: this.constant.cancelButtonColor,
                confirmButtonText: 'Yes'
            }).then(function (result) {
                if (result.value) {
                    _this.addDocumentOptions(id, name_en, name_en, status, type);
                }
            });
        }
        else {
            self.addDocumentOptions(id, name_en, name_es, status, type);
        }
    };
    DocumentsComponent.prototype.blockUnblock = function (id, name_en, name_es, status, index) {
        var _this = this;
        this.parameter.index = index;
        switch (status) {
            case 0:
                this.parameter.text = this.translate.instant('message.error.wantToBlockDocument');
                this.parameter.successText = this.translate.instant('message.success.blockedSuccessfully');
                break;
            case 1:
                this.parameter.text = this.translate.instant('message.error.wantToUnblockDocument');
                this.parameter.successText = this.translate.instant('message.success.unblockedSuccessfully');
                break;
        }
        swal({
            html: this.translate.instant('message.error.areYouSure') + '<br>' + this.parameter.text,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.addDocumentOptions(id, name_en, name_es, status, 'add');
            }
        });
    };
    DocumentsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-documents',
            template: __webpack_require__(/*! ./documents.component.html */ "./src/app/layout/settings/documents/documents.component.html"),
            styles: [__webpack_require__(/*! ./documents.component.css */ "./src/app/layout/settings/documents/documents.component.css")],
            providers: [src_app_common_constants__WEBPACK_IMPORTED_MODULE_3__["Constant"], src_app_models_document_model__WEBPACK_IMPORTED_MODULE_4__["Document"]]
        }),
        __metadata("design:paramtypes", [src_app_common_constants__WEBPACK_IMPORTED_MODULE_3__["Constant"],
            ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_2__["BsModalService"],
            src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_1__["AdminService"],
            src_app_models_document_model__WEBPACK_IMPORTED_MODULE_4__["Document"], ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__["TranslateService"]])
    ], DocumentsComponent);
    return DocumentsComponent;
}());



/***/ }),

/***/ "./src/app/layout/settings/edit-profile/edit-profile.component.css":
/*!*************************************************************************!*\
  !*** ./src/app/layout/settings/edit-profile/edit-profile.component.css ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9zZXR0aW5ncy9lZGl0LXByb2ZpbGUvZWRpdC1wcm9maWxlLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/layout/settings/edit-profile/edit-profile.component.html":
/*!**************************************************************************!*\
  !*** ./src/app/layout/settings/edit-profile/edit-profile.component.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<!--content start-->\n<div class=\"container-fluid\">\n    <div class=\"breadcrumb-group\">\n      <h5>{{'settings.label' | translate}}</h5>\n      <nav class=\"breadcrumb\">\n        <a class=\"breadcrumb-item\">{{'settings.home' | translate}}</a>\n        <a class=\"breadcrumb-item\">{{'settings.label' | translate}}</a>\n          <span class=\"breadcrumb-item active\">{{'editProfile.label' | translate}}</span>\n      </nav>\n    </div>\n\n\n\n<div class=\"white-bg padding40\">\n  <div class=\"row\">\n  <form role=\"form\" ngNativeValidate #addForm=\"ngForm\" (ngSubmit)=\"updateProfile(addForm)\">\n    <div class=\"col-xl-12 col-lg-12 col-md-12 col-12\">\n        <div class=\"row\">\n          <div class=\"col-6\">\n              <div class=\"add-img\" style=\"display:flex;\">\n                  <img *ngIf=\"model?.image\" [src]=\"model?.image\" style=\"object-fit: cover; width: 100%;\">\n                  <label *ngIf=\"model?.image\">\n                    <input accept=\"image/*\" name=\"image\" class=\"image\" (change)=\"changeListner($event, 'img_loader', 'image')\" type=\"file\">\n                  </label>\n                  <label *ngIf=\"!model?.image\">{{'addForm.image' | translate}}</label>\n                  <input *ngIf=\"!model?.image\" accept=\"image/*\" name=\"image\" class=\"image\" (change)=\"changeListner($event, 'img_loader', 'image')\" type=\"file\">\n                  <div *ngIf=\"model.img_loader\" class=\"loaderr\"></div>\n              </div>\n          </div>\n          <div class=\"col-6\">\n              <div class=\"btn-cont text-right\">\n                  <button *ngIf=\"model.id==''\" type=\"submit\" [disabled]=\"!addForm.valid\" class=\"btn btn-primary\">{{'addForm.addBtn' | translate}}</button>\n                  <button *ngIf=\"model.id!=''\" type=\"submit\" class=\"btn btn-primary\">{{'addForm.updateBtn' | translate}}</button>\n              </div>\n          </div>\n          <div class=\"col-12\">\n              <div class=\"spacer40\"></div>\n          </div>\n          <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.name' | translate}} <span class=\"color-red\">*</span></label>\n                <input [pattern]=\"constant.onlyWhiteSpaces\" autocomplete=\"off\" required type=\"text\" class=\"form-control\" [(ngModel)]=\"model.name\" name=\"name\">\n              </div>\n          </div>\n          <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.contactNumber' | translate}} <span class=\"color-red\">*</span></label>\n                <input minlength=\"6\" maxlength=\"16\" autocomplete=\"off\" type=\"text\" [pattern]=\"constant.phonePattern\" class=\"form-control\" id=\"phone\" required minlength=\"1\" [(ngModel)]=\"model.phone\" name=\"phone\"\n                      ng2TelInput [ng2TelInputOptions]=\"initialCountry\" (countryChange)=\"onCountryChange($event)\" />\n              </div>\n          </div>\n          <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.emailId' | translate}} <span class=\"color-red\">*</span></label>\n                <input [disabled]=\"true\" (keydown.space)=\"$event.preventDefault();\" autocomplete=\"off\" required [pattern]=\"constant.emailPattern\" type=\"email\" class=\"form-control\" [(ngModel)]=\"model.email\" name=\"email\">\n              </div>\n          </div>\n        </div>\n    </div>\n    </form>\n  </div>\n</div>\n\n\n    <!-- <form class=\"form-horizontal\" novalidate #addForm=\"ngForm\" (ngSubmit)=\"updateProfile(addForm)\">\n        \n        <div class=\"form-group row\">\n            <label class=\"col-sm-2 col-form-label\">Image:</label>\n            <div class=\"col-sm-10\">\n                <input required accept=\"image/*\" class=\"image\" (change)=\"changeListner($event)\" type=\"file\">\n            </div>\n          </div>\n            <div class=\"form-group row\">\n              <label class=\"col-sm-2 col-form-label\">Name:</label>\n              <div class=\"col-sm-10\">\n  \n                  <input type=\"text\" class=\"form-control\" placeholder=\"Name\" id=\"name\" required minlength=\"1\" [(ngModel)]=\"model.name\" name=\"name\" #name=\"ngModel\">\n  \n                  <div *ngIf=\"name.errors && (name.dirty || name.touched)\" class=\"show-error\">\n                      <div [hidden]=\"!name.errors.required\">\n                          Name is required!\n                      </div>\n                      <div [hidden]=\"!name.errors.min\">\n                          Name must be at least 1.\n                      </div>\n                  </div>\n  \n              </div>\n            </div>\n              \n            <div class=\"form-group row\">\n              <label class=\"col-sm-2 col-form-label\">Contact Number:</label>\n              <div class=\"col-sm-10\">\n                <input type=\"text\" class=\"form-control\"\n                id=\"phone\" required minlength=\"1\" [(ngModel)]=\"model.phone\" \n                name=\"phone\" #phone=\"ngModel\"\nng2TelInput\n[ng2TelInputOptions]=\"initialCountry\"\n(countryChange)=\"onCountryChange($event)\" />\n\n\n                <div *ngIf=\"phone.errors && (phone.dirty || phone.touched)\" class=\"show-error\">\n                    <div [hidden]=\"!phone.errors.required\">\n                      Contact Phone Number is required!\n                    </div>\n                    <div [hidden]=\"!phone.errors.min\">\n                      Contact Phone Number must be at least 1.\n                    </div>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"form-group btn-cont text-right\">\n              <button class=\"btn btn-primary apply-btn\" type=\"submit\">Update Settings</button>\n            </div>\n      </form> -->\n</div>\n"

/***/ }),

/***/ "./src/app/layout/settings/edit-profile/edit-profile.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/layout/settings/edit-profile/edit-profile.component.ts ***!
  \************************************************************************/
/*! exports provided: EditProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditProfileComponent", function() { return EditProfileComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var src_app_models_acl_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/models/acl.model */ "./src/app/models/acl.model.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var EditProfileComponent = /** @class */ (function () {
    function EditProfileComponent(constant, admin, cs, spinner, translate) {
        this.constant = constant;
        this.admin = admin;
        this.cs = cs;
        this.spinner = spinner;
        this.translate = translate;
        this.parameter = {};
    }
    EditProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.model = new src_app_models_acl_model__WEBPACK_IMPORTED_MODULE_5__["ACL"]();
        this.model.img_loader = false;
        this.model.country_code = this.constant.country_code;
        this.model.dial_code = this.constant.dial_code;
        this.initialCountry = { initialCountry: this.constant.country_code };
        this.admin.loginData$.subscribe(function (success) {
            if (success['id']) {
                _this.model = success;
            }
            else {
                _this.loginData();
            }
        });
    };
    EditProfileComponent.prototype.loginData = function () {
        var _this = this;
        this.spinner.show();
        this.admin.postDataApi('loginData', {})
            .subscribe(function (success) {
            _this.spinner.hide();
            _this.model = success.data;
            _this.image = _this.model.image;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    EditProfileComponent.prototype.onCountryChange = function (e) {
        this.model.country_code = e.iso2;
        this.model.dial_code = '+' + e.dialCode;
        this.initialCountry = { initialCountry: e.iso2 };
    };
    EditProfileComponent.prototype.changeListner = function (event, paramLoader, param) {
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
    EditProfileComponent.prototype.updateProfile = function (formData) {
        var _this = this;
        if (this.model.img_loader) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.uploadingImage'), 'error');
            return;
        }
        var input = new FormData();
        input.append('name', formData.value.name);
        input.append('phone', formData.value.phone);
        input.append('country_code', this.model.country_code);
        input.append('dial_code', this.model.dial_code);
        input.append('image', this.model.image);
        this.spinner.show();
        this.admin.postDataApi('updateProfile', input)
            .subscribe(function (success) {
            _this.spinner.hide();
            _this.admin.login.next(success.data);
            swal(_this.translate.instant('swal.success'), success.message, 'success');
        }, function (error) {
            _this.spinner.hide();
        });
    };
    EditProfileComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-edit-profile',
            template: __webpack_require__(/*! ./edit-profile.component.html */ "./src/app/layout/settings/edit-profile/edit-profile.component.html"),
            styles: [__webpack_require__(/*! ./edit-profile.component.css */ "./src/app/layout/settings/edit-profile/edit-profile.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_common_constants__WEBPACK_IMPORTED_MODULE_3__["Constant"],
            src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_1__["AdminService"],
            src_app_services_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_2__["NgxSpinnerService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__["TranslateService"]])
    ], EditProfileComponent);
    return EditProfileComponent;
}());



/***/ }),

/***/ "./src/app/layout/settings/locality/locality.component.css":
/*!*****************************************************************!*\
  !*** ./src/app/layout/settings/locality/locality.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".selectedRow{\n    background: rgb(228, 224, 224)\n}\n.locality-name{\n    cursor: pointer;\n}\n.form-model0P{\n    padding: 0px !important;\n}\n.model-body10P{\n    padding: 10px !important;\n}\n.my-modal-header{\n    display: inline;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L3NldHRpbmdzL2xvY2FsaXR5L2xvY2FsaXR5LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSw4QkFBOEI7Q0FDakM7QUFDRDtJQUNJLGdCQUFnQjtDQUNuQjtBQUNEO0lBQ0ksd0JBQXdCO0NBQzNCO0FBQ0Q7SUFDSSx5QkFBeUI7Q0FDNUI7QUFDRDtJQUNJLGdCQUFnQjtDQUNuQiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9zZXR0aW5ncy9sb2NhbGl0eS9sb2NhbGl0eS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnNlbGVjdGVkUm93e1xuICAgIGJhY2tncm91bmQ6IHJnYigyMjgsIDIyNCwgMjI0KVxufVxuLmxvY2FsaXR5LW5hbWV7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xufVxuLmZvcm0tbW9kZWwwUHtcbiAgICBwYWRkaW5nOiAwcHggIWltcG9ydGFudDtcbn1cbi5tb2RlbC1ib2R5MTBQe1xuICAgIHBhZGRpbmc6IDEwcHggIWltcG9ydGFudDtcbn1cbi5teS1tb2RhbC1oZWFkZXJ7XG4gICAgZGlzcGxheTogaW5saW5lO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/layout/settings/locality/locality.component.html":
/*!******************************************************************!*\
  !*** ./src/app/layout/settings/locality/locality.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--content start-->\n<div class=\"container-fluid\">\n  <div class=\"breadcrumb-group\">\n    <h5>{{'settings.label' | translate}}</h5>\n    <nav class=\"breadcrumb\">\n      <a class=\"breadcrumb-item\">{{'settings.home' | translate}}</a>\n      <a class=\"breadcrumb-item\">{{'settings.label' | translate}}</a>\n      <span class=\"breadcrumb-item active\">{{'location.locality' | translate}}</span>\n    </nav>\n  </div>\n\n  <div class=\"white-bg\">\n    <div class=\"page-title\">\n      <h3>{{'location.locality' | translate}}</h3>\n    </div>\n\n    <!-- add city -->\n    <div class=\"form-outer marginT15\">\n      <div class=\"inline-form-group\">\n        <div class=\"row\">\n          <div class=\"col-md-12\">\n            <label><strong>{{'location.addLocality' | translate}}</strong></label>\n            <hr>\n          </div>\n          <div class=\"col-lg-3 col-md-3 col-sm-6 col-6\">\n            <div class=\"form-group marginB0\">\n              <label>{{'filters.location.country' | translate}}</label>\n              <select title=\"{{'filters.location.selectCountry' | translate}}\" class=\"form-control\" (change)=\"getStates($event.target.value, '')\">\n                <option value=\"\" disabled>{{'filters.location.selectCountry' | translate}}</option>\n                <option *ngFor=\"let country of parameter.countries\" value=\"{{country.id}}\"\n                  [selected]=\"country.id == parameter.country_id\">{{country.name_en}}</option>\n              </select>\n            </div>\n          </div>\n          <div class=\"col-lg-3 col-md-3 col-sm-6 col-6\">\n            <div class=\"form-group marginB0\">\n              <label>{{'filters.location.state' | translate}}</label>\n              <select title=\"{{'filters.location.selectState' | translate}}\" class=\"form-control\" (change)=\"getCities($event.target.value, '')\">\n                <option value=\"\" disabled>{{'filters.location.selectState' | translate}}</option>\n                <option *ngFor=\"let state of parameter.states\" value=\"{{state.id}}\"\n                  [selected]=\"state.id == parameter.state_id\">{{state.name_en}}</option>\n              </select>\n            </div>\n          </div>\n          <div class=\"col-lg-3 col-md-3 col-sm-6 col-6\">\n            <div class=\"form-group marginB0\">\n              <label>{{'filters.location.city' | translate}}</label>\n              <select title=\"{{'filters.location.selectCity' | translate}}\" class=\"form-control\" (change)=\"getLocalities($event.target.value)\">\n                <option value=\"\" disabled>{{'filters.location.selectCity' | translate}}</option>\n                <option *ngFor=\"let city of parameter.cities\" value=\"{{city.id}}\"\n                  [selected]=\"city.id == parameter.city_id\">{{city.name_en}}</option>\n              </select>\n            </div>\n          </div>\n          <div class=\"col-lg-3 col-md-3 col-sm-6 col-6\">\n            <div class=\"form-group marginB0\">\n              <label>{{'filters.location.searchLocality' | translate}}</label>\n              <input autocomplete=\"off\" required placeholder=\"{{'filters.location.searchLocality' | translate}}\" autocapitalize=\"off\"\n                spellcheck=\"off\" type=\"text\" class=\"form-control\" style=\"padding: 8px 25px 8px 15px;\n                height: 40px !important;\" (keyup.enter)=\"getLocalities(parameter.city_id, $event.target.value)\">\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <hr>\n\n    \n    <div class=\"form-outer marginT15 padding40\">\n      <div class=\"row\">\n        <table class=\"table table-striped\">\n          <tr>\n            <th style=\"width:30%; text-align:left;\">\n              <div class=\"table-search\">\n                  <label>{{'table.th.nameEn' | translate}}</label>\n                  <!-- <div class=\"searh-3\">\n                    <input autocomplete=\"off\" type=\"text\" style=\"height:28px; font-size: 14px;\"\n                      (keyup.enter)=\"getLocalities(parameter.city_id, $event.target.value)\" name=\"\"\n                      placeholder=\"Search here\">\n                    <button (click)=\"getLocalities(parameter.city_id, $event.target.value)\"><i\n                        class=\"fa fa-search\"></i></button>\n                  </div> -->\n              </div>\n            </th>\n            <th style=\"width:30%; text-align:left;\">\n              <div class=\"table-search\">\n                  <label>{{'table.th.nameEs' | translate}}</label>\n              </div>\n            </th>\n            <th style=\"width:10%; text-align:left;\">\n              <div class=\"table-search\">\n                  <label>{{'table.th.avgPrice' | translate}}</label>\n              </div>\n            </th>\n            <th style=\"width:30%\">{{'table.th.actions.label' | translate}}</th>\n          </tr>\n          <!-- (click)=\"markLocalityFeatured(index, locality.id, locality.is_featured==1?0:1)\" -->\n          <tr *ngFor=\"let locality of all_overlays; let index = index\" \n            (click)=\"setSelection(locality.overlay, locality.id)\">\n            <td class=\"text-left locality-name\" [ngClass]=\"locality.id == selectedLocality ? 'selectedRow' : ''\">\n              {{locality.name_en}}\n            </td>\n            <td class=\"text-left locality-name\" [ngClass]=\"locality.id == selectedLocality ? 'selectedRow' : ''\">\n              {{locality.name_es}}\n            </td>\n            <td class=\"text-left locality-name\" [ngClass]=\"locality.id == selectedLocality ? 'selectedRow' : ''\">\n              {{locality.avg_price | price}}\n            </td>\n            <!-- <td>\n              <a (click)=\"upadteSelection(locality, index)\" title=\"Unblock State\" class=\"icon-block block-icon\"><img src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n            </td> -->\n            <td [ngClass]=\"locality.id == selectedLocality ? 'selectedRow' : ''\">\n              <button [disabled]=\"admin?.admin_acl['Settings']?.can_update==0\" *ngIf=\"locality.is_featured==0\" \n                (click)=\"markLocalityFeatured(index, locality.id, locality.is_featured==1?0:1)\" class=\"action-icon\" title=\"{{'table.title.markFeauture' | translate}}\"><img src=\"assets/img/ic_featured.png\" alt=\"img\"></button>\n              <button [disabled]=\"admin?.admin_acl['Settings']?.can_update==0\" *ngIf=\"locality.is_featured==1\" \n                (click)=\"markLocalityFeatured(index, locality.id, locality.is_featured==1?0:1)\" class=\"action-icon\" title=\"{{'table.title.markUnfeauture' | translate}}\"><img src=\"assets/img/tick-selected.png\" alt=\"img\"></button>\n              <!-- <a *ngIf=\"locality.status == 0\" (click)=\"blockUnblockLocality(locality, index, 1)\"\n                title=\"Unblock Locality\" class=\"icon-block block-icon unblock-bg\"><img src=\"assets/img/block.png\"\n                  alt=\"img\"></a>\n              <a *ngIf=\"locality.status == 1\" (click)=\"blockUnblockLocality(locality, index, 0)\" title=\"Block Locality\"\n                class=\"icon-block block-icon\"><img src=\"assets/img/unblock.png\" alt=\"img\"></a> -->\n              <a (click)=\"editLocality(locality.id, locality.name_en, locality.name_es, locality.price_per_sqft, locality.status, locality.poly_coordinates)\"\n                title=\"{{'table.title.editDetails' | translate}}\" class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></a>\n              <a (click)=\"deleteLocality(locality, index)\" title=\"{{'table.title.delete' | translate}}\" class=\"action-icon\"><img\n                  src=\"assets/img/ic_delete.png\" alt=\"img\"></a>\n            </td>\n          </tr>\n        </table>\n\n        <div class=\"error-border\" [ngSwitch]=\"true\">\n          <p class=\"show-not-found\" *ngSwitchCase=\"parameter.states?.length == 0\">\n              {{'message.error.noStateFound' | translate}}\n          </p>\n          <p class=\"show-not-found\" *ngSwitchCase=\"parameter.states?.length != 0 && parameter.cities?.length == 0\">\n              {{'message.error.noCityFound' | translate}}</p>\n          <p class=\"show-not-found\"\n            *ngSwitchCase=\"parameter.states?.length != 0 && parameter.cities?.length != 0 && all_overlays?.length == 0\">\n            {{'message.error.noLocalityFound' | translate}}</p>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"form-outer marginT15 padding40\">\n      <div class=\"row\">\n        <!-- <div class=\"form-outer marginB10\">\n              <div class=\"row\">\n                <div class=\"offset-lg-3\"></div>\n                <div class=\"col-lg-3 col-md-6 col-sm-6 col-6\">\n                  <div class=\"form-group marginB0\"></div>\n                </div>\n                <div class=\"col-lg-6 col-md-6 col-sm-6 col-6\">\n                  <div class=\"form-group marginB0\">\n                    <input autocomplete=\"off\" required placeholder=\"Search area you want to mark.\" autocorrect=\"off\" autocapitalize=\"off\"\n                      spellcheck=\"off\" type=\"text\" class=\"form-control\" style=\"padding: 8px 25px 8px 15px;\n                      height: 40px !important;\" #searchLocality (input)=\"loadPlaces()\">\n                  </div>\n                </div>\n              </div>\n        </div> -->\n\n        <div class=\"col-lg-6 col-md-6 col-sm-6 col-6\">\n          <div class=\"form-group marginB10\"></div>\n        </div>\n        <div class=\"col-lg-6 col-md-6 col-sm-6 col-6\">\n          <div class=\"form-group marginB10\">\n              <input autocomplete=\"off\" required placeholder=\"{{'addForm.placeholder.searchTheAreaUWantToMark' | translate}}\" autocorrect=\"off\" autocapitalize=\"off\"\n              spellcheck=\"off\" type=\"text\" class=\"form-control\" style=\"padding: 8px 25px 8px 15px;\n              height: 40px !important;\" #searchLocality (input)=\"loadPlaces()\">\n          </div>\n        </div>\n        <div id=\"mapDiv\" style=\"height: 500px; width: 100%;\" #mapDiv></div>\n      </div>\n    </div>\n\n\n  </div>\n</div>\n<!--content end-->\n\n\n<!-- Trigger the modal with a button -->\n<button type=\"button\" style=\"display: none;\" class=\"btn btn-info\" data-toggle=\"modal\" data-target=\"#myModal\"\n  #localityOpen>Open Modal</button>\n\n<!-- Modal -->\n<div id=\"myModal\" class=\"modal fade\" role=\"dialog\">\n  <div class=\"modal-dialog\">\n\n    <!-- Modal content-->\n    <div class=\"modal-content\">\n      <div class=\"modal-header my-modal-header\">\n        <button type=\"button\" class=\"close\" (click)=\"closeModal()\">&times;</button>\n        <h4 class=\"modal-title\">{{model.id ? ('location.editLocalityDetails' | translate) : ('location.addLocalityDetails' | translate)}}</h4>\n      </div>\n      <form class=\"form-horizontal form-model0P\" role=\"form\" novalidate #addForm=\"ngForm\"\n        (ngSubmit)=\"checkIfLocalitySpanishNameEntered(addForm.value.name_en, addForm.value.name_es, addForm.value.price_per_sqft)\">\n        <div class=\"modal-body model-body10P\">\n          <div class=\"form-group\">\n            <input autocomplete=\"off\" type=\"text\" class=\"form-control\" placeholder=\"{{'location.localityNameEn' | translate}}\"\n              id=\"name_en\" required [(ngModel)]=\"model.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n            <!-- <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-not-found\">\n                <div [hidden]=\"!name_en.errors.required\">\n                  {{constant.errorMsg.COUNTRY_NAME_REQUIRED}}\n                </div>\n            </div> -->\n          </div>\n          <div class=\"form-group\">\n            <input autocomplete=\"off\" type=\"text\" name=\"name_es\" class=\"form-control\"\n              placeholder=\"{{'location.localityNameEs' | translate}}\" [(ngModel)]=\"model.name_es\">\n          </div>\n\n          <!-- <div class=\"form-group\">\n            <input autocomplete=\"off\" type=\"text\" class=\"form-control\" min=\"1\" placeholder=\"Price per sqmt\"\n              id=\"price_per_sqft\" required [(ngModel)]=\"model.price_per_sqft\" name=\"price_per_sqft\"\n              #price_per_sqft=\"ngModel\">\n          </div> -->\n\n        </div>\n        <div class=\"modal-footer btn-cont\">\n          <button type=\"submit\" [disabled]=\"addForm.invalid\" class=\"btn btn-primary-new\">{{'addForm.submit' | translate}}</button>\n          <button style=\"display:none;\" type=\"button\" class=\"btn btn-default\" #localityClose\n            data-dismiss=\"modal\">{{'addForm.close' | translate}}</button>\n          <button type=\"button\" class=\"btn btn-default\" (click)=\"closeModal()\">{{'addForm.close' | translate}}</button>\n        </div>\n      </form>\n\n    </div>\n\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/layout/settings/locality/locality.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/layout/settings/locality/locality.component.ts ***!
  \****************************************************************/
/*! exports provided: LocalityComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocalityComponent", function() { return LocalityComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var src_app_models_locality_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/locality.model */ "./src/app/models/locality.model.ts");
/* harmony import */ var rxjs_Observable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/Observable */ "./node_modules/rxjs-compat/_esm5/Observable.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var LocalityComponent = /** @class */ (function () {
    function LocalityComponent(loader, admin, ngZone, constant, model, spinner, translate) {
        this.loader = loader;
        this.admin = admin;
        this.ngZone = ngZone;
        this.constant = constant;
        this.model = model;
        this.spinner = spinner;
        this.translate = translate;
        this.parameter = {};
        this.all_overlays = [];
        this.showModal = true;
        this.editOverlay = null;
        this.isaddNewLocality = false;
    }
    LocalityComponent.prototype.ngOnInit = function () {
        this.parameter.localities = [];
        this.getCountries('');
    };
    LocalityComponent.prototype.getCountries = function (keyword) {
        var _this = this;
        this.spinner.show();
        this.parameter.url = 'getCountries';
        var input = new FormData();
        if (keyword) {
            input.append('keyword', keyword);
        }
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.spinner.hide();
            _this.parameter.countries = success.data;
            if (_this.parameter.countries.length !== 0) {
                _this.parameter.country_id = _this.parameter.countries[0].id;
                _this.getStates(_this.parameter.countries[0].id, '');
            }
        }, function (error) {
            _this.spinner.hide();
        });
    };
    LocalityComponent.prototype.getStates = function (country_id, keyword) {
        var _this = this;
        this.spinner.show();
        this.parameter.url = 'country/getStates';
        this.parameter.country_id = country_id;
        var input = new FormData();
        input.append('country_id', country_id);
        if (keyword) {
            input.append('keyword', keyword);
        }
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.spinner.hide();
            _this.parameter.states = success.data;
            if (_this.parameter.states.length) {
                _this.parameter.state_id = _this.parameter.states[0].id;
                _this.getCities(_this.parameter.states[0].id, '');
            }
            else {
                _this.parameter.city_id = '0';
                _this.parameter.localityCount = 0;
                _this.parameter.cities = [];
                _this.parameter.localities = [];
                _this.all_overlays = [];
                _this.init();
            }
        }, function (error) {
            _this.spinner.hide();
        });
    };
    LocalityComponent.prototype.getCities = function (state_id, keyword) {
        var _this = this;
        this.spinner.show();
        this.parameter.url = 'getCities';
        this.parameter.state_id = state_id;
        var input = new FormData();
        input.append('state_id', state_id);
        if (keyword) {
            input.append('keyword', keyword);
        }
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.spinner.hide();
            _this.parameter.cities = success.data;
            if (_this.parameter.cities.length) {
                _this.parameter.city_id = _this.parameter.cities[0].id;
                _this.getLatLan(_this.parameter.cities[0].name_en);
                _this.getLocalities(_this.parameter.city_id, '');
            }
            else {
                _this.parameter.localityCount = 0;
                _this.parameter.cities = [];
                _this.parameter.localities = [];
                _this.all_overlays = [];
                _this.init();
            }
        }, function (error) {
            _this.spinner.hide();
        });
    };
    LocalityComponent.prototype.getLatLngFromAddress = function () {
        // https://maps.googleapis.com/maps/api/geocode/json?address=adress&key=YOUR_API_KEY
    };
    LocalityComponent.prototype.getLocalities = function (city_id, keyword) {
        var _this = this;
        if (keyword === void 0) { keyword = ''; }
        this.spinner.show();
        this.parameter.url = 'getLocalities';
        this.parameter.city_id = city_id;
        var input = new FormData();
        input.append('city_id', city_id);
        if (keyword) {
            input.append('keyword', keyword);
        }
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.spinner.hide();
            _this.parameter.localities = success.data;
            _this.all_overlays = _this.parameter.localities;
            _this.parameter.localityCount = success.data.length;
            if (_this.parameter.localities.length) {
                _this.selectedLocality = _this.parameter.localities[0].id;
            }
            else {
                _this.all_overlays = [];
            }
            _this.init();
        }, function (error) {
            _this.spinner.hide();
        });
    };
    LocalityComponent.prototype.init = function () {
        var _this = this;
        // Wait for the google maps script to be loaded before using the "google" keyword
        this.loader.load().then(function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var map = new google.maps.Map(_this.mapDiv.nativeElement, {
                        center: {
                            lat: _this.latitude ? _this.latitude : position.coords.latitude,
                            lng: _this.longitude ? _this.longitude : position.coords.longitude
                        },
                        zoom: 18
                    });
                    _this.map = map;
                    //let all_overlays_index = 0;
                    _this.all_overlays.forEach(function (locality, overlays_index) {
                        var poly_coordinates = JSON.parse(locality.poly_coordinates);
                        var polygon = poly_coordinates.map(function (ll) {
                            var latlng = ll.split(',');
                            var coord = new google.maps.LatLng(parseFloat(latlng[0]), parseFloat(latlng[1]));
                            return coord;
                        });
                        // this.setSelection(polygon);
                        var singlePolygon = new google.maps.Polygon({
                            paths: polygon,
                            editable: true,
                            strokeColor: '#FF0000',
                            strokeOpacity: 0.8,
                            strokeWeight: 2,
                            fillColor: '#FF0000',
                            fillOpacity: 0.35
                        });
                        locality.overlay = singlePolygon;
                        // showing selected first locality
                        if (_this.isaddNewLocality) {
                            if ((overlays_index + 1) === _this.all_overlays.length) {
                                _this.setSelection(singlePolygon, locality.id);
                            }
                            else {
                                singlePolygon.setEditable(false);
                            }
                        }
                        else if (_this.editOverlay) {
                            if (locality.id === _this.editOverlay.id) {
                                _this.setSelection(singlePolygon, locality.id);
                            }
                            else {
                                singlePolygon.setEditable(false);
                            }
                        }
                        else {
                            if (overlays_index === 0) {
                                _this.setSelection(singlePolygon, locality.id);
                            }
                            else {
                                singlePolygon.setEditable(false);
                            }
                        }
                        //all_overlays_index++;
                        google.maps.event.addListener(singlePolygon, 'click', function () {
                            _this.setSelection(singlePolygon, locality.id);
                        });
                        var self = _this;
                        google.maps.event.addListener(singlePolygon, 'mouseup', function (muEvent) {
                            // console.log(singlePolygon);
                            // console.log(muEvent.latLng.lat(),"current_lat", muEvent.latLng.lng(),"current_lng");
                            var overlay = self.all_overlays.find(function (x) { return x.id == self.selectedLocality; });
                            self.editOverlay = overlay;
                            // console.log(overlay.poly_coordinates,"save db")
                            // const newPoint = new google.maps.LatLng(muEvent.latLng.lat(), muEvent.latLng.lng());
                            // let p = JSON.parse(overlay.poly_coordinates);
                            // if(muEvent.vertex >= 0){
                            //   p[muEvent.vertex] = newPoint.toUrlValue();
                            // }else if(muEvent.edge>=0){
                            //   p.splice(muEvent.edge + 1, 0, newPoint.toUrlValue());
                            // } 
                            // console.log(self.getPolygonCoords(singlePolygon)) ;
                            self.editLocality(overlay.id, overlay.name_en, overlay.name_es, overlay.price_per_sqft, overlay.status, JSON.stringify(self.getPolygonCoords(singlePolygon)));
                            // self.editLocality(overlay.id, overlay.name_en, overlay.name_es, overlay.price_per_sqft, overlay.status, JSON.stringify(p));
                            // self.editLocality(overlay.id, overlay.name_en, overlay.name_es, overlay.price_per_sqft, overlay.status, overlay.poly_coordinates);
                            self.localityOpen.nativeElement.click();
                        });
                        singlePolygon.setMap(map);
                    });
                    google.maps.event.addListener(map, 'click', function (event) {
                        _this.placeMarker(event.latLng);
                    });
                    var drawingManager = new google.maps.drawing.DrawingManager({
                        drawingControl: true,
                        drawingControlOptions: {
                            position: google.maps.ControlPosition.TOP_CENTER,
                            drawingModes: [
                                // google.maps.drawing.OverlayType.MARKER,
                                // google.maps.drawing.OverlayType.CIRCLE,
                                google.maps.drawing.OverlayType.POLYGON,
                                google.maps.drawing.OverlayType.RECTANGLE
                            ]
                        },
                        polygonOptions: {
                            clickable: true,
                            draggable: true,
                            editable: true,
                            fillColor: '#00b96e',
                            fillOpacity: 0.5,
                        },
                        rectangleOptions: {
                            clickable: true,
                            draggable: true,
                            editable: true,
                            fillColor: '#ffff00',
                            fillOpacity: 0.5,
                        }
                    });
                    drawingManager.setMap(map);
                    google.maps.event.addListener(drawingManager, 'polygoncomplete', function (event) {
                        event.getPath().getLength();
                        google.maps.event.addListener(event.getPath(), 'insert_at', function () {
                            var len = event.getPath().getLength();
                            for (var i = 0; i < len; i++) {
                                // console.log(event.getPath().getAt(i).toUrlValue(5));
                            }
                        });
                        google.maps.event.addListener(event.getPath(), 'set_at', function () {
                            var len = event.getPath().getLength();
                            for (var i = 0; i < len; i++) {
                                // console.log(event.getPath().getAt(i).toUrlValue(5));
                            }
                        });
                    });
                    google.maps.event.addListener(drawingManager, 'overlaycomplete', function (event) {
                        _this.parameter.overlay = _this.getPolygonCoords(event.overlay);
                        _this.model.status = '1';
                        _this.localityOpen.nativeElement.click();
                        // this.swal.prompt({
                        //   text:''
                        // }).then(f=>{
                        //   this.shapeName = f;
                        //   var locality = {
                        //     name_en: this.shapeName,
                        //     name_es: this.shapeName,
                        //     coordinates: this.getPolygonCoords(event.overlay),
                        //     poly_coordinates: JSON.stringify(this.getPolygonCoords(event.overlay)),
                        //     status:'1',
                        //     city_id:this.parameter.city_id,
                        //     overlay: event.overlay
                        //   };
                        //   //this.all_overlays.push(locality);
                        //   //this.all_overlays = this.all_overlays;
                        //   //this.all_overlays.splice(0,2);
                        //   //this.len = this.all_overlays.length;
                        //   delete locality.overlay;
                        //   this.admin.postDataApi('addLocality', locality).subscribe(
                        //       r => {
                        //         this.all_overlays.push(r.data);
                        //         //this.getLocalities(this.parameter.city_id,'');
                        //       });
                        // });
                        // this.all_overlays = this.all_overlays;
                        if (event.type !== google.maps.drawing.OverlayType.MARKER) {
                            drawingManager.setDrawingMode(null);
                            // Write code to select the newly selected object.
                            var newShape_1 = event.overlay;
                            newShape_1.type = event.type;
                            google.maps.event.addListener(newShape_1, 'click', function () {
                                _this.setSelection(newShape_1);
                            });
                            _this.setSelection(newShape_1);
                        }
                    });
                    // var centerControlDiv = document.createElement('div');
                    //    var centerControl = new centerControl(centerControlDiv, map);
                    // var centerControl = this.CenterControl(centerControlDiv, map);
                    // centerControlDiv.index = 1;
                    // map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(centerControlDiv);
                });
            }
        });
    };
    LocalityComponent.prototype.editLocality = function (id, name_en, name_es, price_per_sqft, status, poly_coordinates) {
        this.model.id = id;
        this.model.name_en = name_en;
        this.model.name_es = name_es;
        this.model.price_per_sqft = price_per_sqft;
        this.model.status = status;
        this.parameter.overlay = JSON.parse(poly_coordinates);
        this.localityOpen.nativeElement.click();
    };
    LocalityComponent.prototype.checkIfLocalitySpanishNameEntered = function (name_en, name_es, price_per_sqft) {
        var _this = this;
        var self = this;
        if (name_es === '') {
            swal({
                text: this.translate.instant('message.error.saveEngCountryName'),
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: this.constant.confirmButtonColor,
                cancelButtonColor: this.constant.cancelButtonColor,
                confirmButtonText: 'Yes'
            }).then(function (result) {
                if (result.value) {
                    _this.addLocality(name_en, name_en, price_per_sqft);
                }
            });
        }
        else {
            self.addLocality(name_en, name_es, price_per_sqft);
        }
    };
    LocalityComponent.prototype.closeModal = function () {
        this.model = new src_app_models_locality_model__WEBPACK_IMPORTED_MODULE_4__["Locality"]();
        this.localityClose.nativeElement.click();
        this.getLocalities(this.parameter.city_id, '');
    };
    LocalityComponent.prototype.addLocality = function (name_en, name_es, price_per_sqft) {
        var _this = this;
        // this.localityClose.nativeElement.click();
        this.isaddNewLocality = false;
        if (this.model.id) {
            this.isaddNewLocality = false;
        }
        else {
            this.isaddNewLocality = true;
        }
        this.spinner.show();
        var locality = {
            name_en: name_en,
            name_es: name_es,
            price_per_sqft: price_per_sqft,
            coordinates: this.parameter.overlay,
            poly_coordinates: JSON.stringify(this.parameter.overlay),
            status: this.model.status,
            city_id: this.parameter.city_id,
            overlay: this.parameter.overlay,
            id: this.model.id ? this.model.id : ''
        };
        delete locality.overlay;
        this.spinner.show();
        this.admin.postDataApi('addLocality', locality).subscribe(function (r) {
            _this.spinner.hide();
            _this.closeModal();
            _this.init();
        }, function (error) {
            _this.spinner.hide();
        });
    };
    LocalityComponent.prototype.getPolygonCoords = function (newShape) {
        var coordinates_array = [];
        var len = newShape.getPath().getLength();
        for (var i = 0; i < len; i++) {
            coordinates_array.push(newShape.getPath().getAt(i).toUrlValue(6));
        }
        return coordinates_array;
    };
    LocalityComponent.prototype.getLatLngFromString = function (ll) {
        var latlng = ll.split(/, ?/);
        return new google.maps.LatLng(parseFloat(latlng[0]), parseFloat(latlng[1]));
    };
    LocalityComponent.prototype.placeMarker = function (location) {
        var marker = new google.maps.Marker({
            position: location,
            map: this.map
        });
    };
    LocalityComponent.prototype.clearSelection = function () {
        if (this.selectedShape) {
            this.selectedShape.setEditable(false);
            this.selectedShape = null;
        }
    };
    LocalityComponent.prototype.setSelection = function (shape, locality) {
        if (locality === void 0) { locality = ''; }
        this.clearSelection();
        this.selectedLocality = locality;
        this.selectedShape = shape;
        shape.setEditable(true);
        var coords = this.getPolygonCoords(shape);
        var latlng = coords[0].split(',');
        if (this.latitude && this.longitude) {
            latlng = [this.latitude, this.longitude];
        }
        var coord = new google.maps.LatLng(parseFloat(latlng[0]), parseFloat(latlng[1]));
        // var center = new google.maps.LatLngBounds(shape).getCenter();
        // let center = shape.my_getBounds().getCenter()
        this.map.setCenter(coord);
        // google.maps.event.addListener(selectedShape.getPath(), 'insert_at', getPolygonCoords(shape));
        // google.maps.event.addListener(shape.getPath(), 'set_at', this.getPolygonCoords(shape));
    };
    LocalityComponent.prototype.setSelectionNonEditable = function (shape, locality) {
        if (locality === void 0) { locality = ''; }
        this.clearSelection();
        this.selectedLocality = locality;
        this.selectedShape = shape;
        shape.setEditable(false);
        var coords = this.getPolygonCoords(shape);
        var latlng = coords[0].split(',');
        var coord = new google.maps.LatLng(parseFloat(latlng[0]), parseFloat(latlng[1]));
        // var center = new google.maps.LatLngBounds(shape).getCenter();
        // let center = shape.my_getBounds().getCenter()
        this.map.setCenter(coord);
        // google.maps.event.addListener(selectedShape.getPath(), 'insert_at', getPolygonCoords(shape));
        // google.maps.event.addListener(shape.getPath(), 'set_at', this.getPolygonCoords(shape));
    };
    LocalityComponent.prototype.deleteSelectedShape = function () {
        if (this.selectedShape) {
            this.selectedShape.setMap(null);
        }
    };
    LocalityComponent.prototype.deleteAllShape = function () {
        for (var i = 0; i < this.all_overlays.length; i++) {
            this.all_overlays[i].overlay.setMap(null);
        }
        this.all_overlays = [];
    };
    LocalityComponent.prototype.getPolygons = function () {
        var _this = this;
        this.all_overlays.forEach(function (item, count) {
            _this.getPolygonCoords(item.overlay.overlay);
        });
    };
    LocalityComponent.prototype.blockUnblockLocality = function (locality, index, type) {
        var _this = this;
        this.parameter.index = index;
        switch (type) {
            case 0:
                this.parameter.text = this.translate.instant('message.error.wantToBlockLocality');
                this.parameter.successText = this.translate.instant('message.success.blockedSuccessfully');
                break;
            case 1:
                this.parameter.text = this.translate.instant('message.error.wantToUnblockLocality');
                this.parameter.successText = this.translate.instant('message.success.unblockedSuccessfully');
                break;
        }
        swal({
            html: this.translate.instant('message.error.areYouSure') + '<br>' + this.parameter.text,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.removeSelection(locality, index, type);
                swal(_this.translate.instant('swal.success'), _this.parameter.successText, 'success');
            }
        });
    };
    LocalityComponent.prototype.deleteLocality = function (locality, index) {
        var _this = this;
        this.parameter.index = index;
        this.parameter.text = this.translate.instant('message.error.wantToDeleteLocality');
        swal({
            html: this.translate.instant('message.error.areYouSure') + '<br>' + this.parameter.text,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.admin.postDataApi('deleteLocality', { id: locality.id }).subscribe(function (r) {
                    _this.parameter.localities.splice(index, 1);
                    swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.deletedSuccessfully'), 'success');
                });
            }
        });
    };
    LocalityComponent.prototype.removeSelection = function (locality, index, status) {
        locality.status = status;
        // this.all_overlays.splice(index,1);
        // locality.overlay.setMap(null);
        delete locality.overlay;
        this.admin.postDataApi('addLocality', locality).subscribe(function (r) {
            // this.all_overlays.push(r.data);
            // this.getLocalities(this.parameter.city_id,'');
        });
    };
    LocalityComponent.prototype.upadteSelection = function (locality, index) {
    };
    LocalityComponent.prototype.markLocalityFeatured = function (index, locality_id, flag) {
        var _this = this;
        var title = '';
        if (flag === 1) {
            title = this.translate.instant('message.error.wantToFeatureLocality');
        }
        else {
            title = this.translate.instant('message.error.wantToUnFeatureLocality');
        }
        swal({
            html: this.translate.instant('message.error.areYouSure') + '<br>' + title,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.admin.postDataApi('markLocalityFeatured', { locality_id: locality_id, flag: flag }).subscribe(function (r) {
                    _this.parameter.localities[index] = r.data;
                    swal(_this.translate.instant('swal.success'), _this.parameter.successText, 'success');
                });
            }
        });
    };
    LocalityComponent.prototype.getLatLan = function (address) {
        // this.admin.googleApi('https://maps.googleapis.com/maps/api/geocode/json?address=' + address)
        //   .subscribe(
        //     success => {
        //       console.log('-----', success);
        //     }, error => {
        //       this.spinner.hide();
        //     });
        this.loader.load().then(function () {
            var geocoder = new google.maps.Geocoder();
            return rxjs_Observable__WEBPACK_IMPORTED_MODULE_5__["Observable"].create(function (observer) {
                geocoder.geocode({ 'address': address }, function (results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        observer.next(results[0].geometry.location);
                        observer.complete();
                    }
                    else {
                        observer.next({});
                        observer.complete();
                    }
                });
            });
            // const geocoder = new google.maps.Geocode();
        });
    };
    LocalityComponent.prototype.loadPlaces = function () {
        var _this = this;
        // load Places Autocomplete
        this.loader.load().then(function () {
            var autocomplete = new google.maps.places.Autocomplete(_this.searchElementRef.nativeElement, {
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
                    _this.latitude = place.geometry.location.lat();
                    _this.longitude = place.geometry.location.lng();
                    _this.zoom = 12;
                    if (place.formatted_address) {
                        // console.log('==', place.formatted_address);
                    }
                    var map = new google.maps.Map(_this.mapDiv.nativeElement, {
                        center: {
                            lat: _this.latitude,
                            lng: _this.longitude
                        },
                        zoom: 18
                    });
                    _this.map = map;
                    _this.init();
                });
            });
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('searchLocality'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], LocalityComponent.prototype, "searchElementRef", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('localityOpen'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], LocalityComponent.prototype, "localityOpen", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('localityClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], LocalityComponent.prototype, "localityClose", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('mapDiv'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], LocalityComponent.prototype, "mapDiv", void 0);
    LocalityComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-locality',
            template: __webpack_require__(/*! ./locality.component.html */ "./src/app/layout/settings/locality/locality.component.html"),
            styles: [__webpack_require__(/*! ./locality.component.css */ "./src/app/layout/settings/locality/locality.component.css")],
            providers: [src_app_common_constants__WEBPACK_IMPORTED_MODULE_3__["Constant"], src_app_models_locality_model__WEBPACK_IMPORTED_MODULE_4__["Locality"]]
        }),
        __metadata("design:paramtypes", [_agm_core__WEBPACK_IMPORTED_MODULE_2__["MapsAPILoader"],
            src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_1__["AdminService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"],
            src_app_common_constants__WEBPACK_IMPORTED_MODULE_3__["Constant"],
            src_app_models_locality_model__WEBPACK_IMPORTED_MODULE_4__["Locality"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_6__["NgxSpinnerService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateService"]])
    ], LocalityComponent);
    return LocalityComponent;
}());



/***/ }),

/***/ "./src/app/layout/settings/location/location.component.css":
/*!*****************************************************************!*\
  !*** ./src/app/layout/settings/location/location.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9zZXR0aW5ncy9sb2NhdGlvbi9sb2NhdGlvbi5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/layout/settings/location/location.component.html":
/*!******************************************************************!*\
  !*** ./src/app/layout/settings/location/location.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n  <div class=\"breadcrumb-group\">\n    <h5>{{'settings.label' | translate}}</h5>\n    <nav class=\"breadcrumb\">\n      <a class=\"breadcrumb-item\">{{'settings.home' | translate}}</a>\n      <a class=\"breadcrumb-item\">{{'settings.label' | translate}}</a>\n      <span class=\"breadcrumb-item active\">{{'location.location' | translate}}</span>\n    </nav>\n  </div>\n\n  <div class=\"white-bg\">\n    <div class=\"page-title\">\n      <h3>{{'location.location' | translate}}</h3>\n    </div>\n\n    <!-- add country -->\n    <div class=\"form-outer\">\n      <div class=\"inline-form-group\">\n        <div class=\"row\">\n          <div class=\"col-md-12\">\n            <label><strong>{{'filters.location.country' | translate}}</strong></label>\n          </div>\n\n          <div class=\"col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6 table-search\">\n            <div class=\"form-group marginB0\">\n              <div class=\"searh-2\">\n                <input autocomplete=\"off\" type=\"text\" name=\"keyword\" [(ngModel)]=\"searchCountry\"\n                  (keyup.enter)=\"getCountries(searchCountry, 1)\"\n                  placeholder=\"{{'addForm.placeholder.searchHere' | translate}}\">\n                <button (click)=\"getCountries(searchCountry, 1)\"><i class=\"fa fa-search\"></i></button>\n              </div>\n            </div>\n          </div>\n          <div class=\"col-xl-9 col-lg-3 col-md-3 col-sm-6 col-6\">\n            <div class=\"form-group marginB0\">\n              <div class=\"btn-cont text-right\">\n                <a *ngIf=\"admin?.admin_acl['Settings']?.can_create==1\" class=\"btn btn-primary\" href=\"javascript://\"\n                  (click)=\"openCountryModal(addCountryModal, '', '', '', '1', -1)\">{{'location.addNew' | translate}}</a>\n              </div>\n            </div>\n          </div>\n        </div>\n        <hr>\n      </div>\n    </div>\n\n    <!-- list country -->\n    <div class=\"tabel-section padding40 paddingT0\">\n      <div class=\"table-responsive\">\n        <table class=\"table table-striped\">\n          <tr>\n            <th style=\"width:40%; text-align:left;\">{{'table.th.countryEn' | translate}}</th>\n            <th style=\"width:40%; text-align:left;\">{{'table.th.countryEs' | translate}}</th>\n            <th style=\"width:20%\">{{'table.th.actions.label' | translate}}</th>\n          </tr>\n          <tr *ngFor=\"let country of parameter.countries1; let c=index\">\n            <td class=\"text-left\">\n              {{country.name_en}}\n            </td>\n            <td class=\"text-left\">\n              {{country.name_es}}\n            </td>\n            <td>\n              <button title=\"{{'table.title.editDetails' | translate}}\"\n                [disabled]=\"admin?.admin_acl['Settings']?.can_update==0\"\n                (click)=\"openCountryModal(addCountryModal, country.id, country.name_en, country.name_es, country.status, c)\"\n                class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></button>\n\n              <!-- status = 1 means unblocked -->\n              <button [disabled]=\"admin?.admin_acl['Settings']?.can_delete==0\"\n                (click)=\"blockUnblockCountry(country.id, country.name_en, country.name_es, country.status==1?0:1, c)\"\n                title=\"{{country.status==1 ? ('table.title.block' | translate) : ('table.title.unblock' | translate)}}\"\n                [ngClass]=\"{'unblock-bg':country.status==0}\" class=\"action-icon\"><img src=\"assets/img/block.png\"\n                  alt=\"img\">\n              </button>\n              <!-- <button [disabled]=\"admin?.admin_acl['Project Management']?.can_purge==0\"\n                      (click)=\"deletePopup(country, i);\" class=\"action-icon\" title=\"{{'table.title.delete' | translate}}\"><img\n                        src=\"assets/img/ic_delete.png\" alt=\"img\"></button> -->\n              <button [disabled]=\"admin?.admin_acl['Settings']?.can_delete==0\"\n                (click)=\"deletePopup(country, c, 'Country')\" class=\"action-icon\"\n                title=\"{{'table.title.delete' | translate}}\"><img src=\"assets/img/ic_delete.png\" alt=\"img\">\n              </button>\n            </td>\n          </tr>\n        </table>\n\n        <div class=\"error-border\" *ngIf=\"parameter.countries1?.length == 0\">\n          <p class=\"show-not-found\">\n            {{'message.error.noCountryFound' | translate}}\n          </p>\n        </div>\n      </div>\n    </div>\n\n    <!-- add state -->\n    <div class=\"form-outer marginT15\">\n      <div class=\"inline-form-group\">\n        <div class=\"row\">\n          <div class=\"col-md-12\">\n            <label><strong>{{'filters.location.state' | translate}}</strong></label>\n            <hr>\n          </div>\n          <div class=\"col-lg-3 col-md-3 col-sm-6 col-6\">\n            <div class=\"form-group marginB0\">\n              <label>{{'filters.location.country' | translate}}</label>\n              <select class=\"form-control\" (change)=\"getStates($event.target.value, '', 1)\">\n                <option *ngFor=\"let country of parameter.countries2\" value=\"{{country.id}}\">{{country.name_en}}</option>\n              </select>\n            </div>\n          </div>\n          <div class=\"col-lg-3 col-md-3 col-sm-6 col-6 table-search\">\n            <div class=\"form-group marginB0\">\n              <label>{{'filters.location.search' | translate}}</label>\n              <div class=\"searh-2\">\n                <input autocomplete=\"off\" type=\"text\" [(ngModel)]=\"searchState\"\n                  (keyup.enter)=\"getStates(parameter.country_id, searchState, 1)\" name=\"keyword\"\n                  placeholder=\"{{'addForm.placeholder.searchHere' | translate}}\">\n                <button (click)=\"getStates(parameter.country_id, searchState, 1)\"><i class=\"fa fa-search\"></i></button>\n              </div>\n            </div>\n          </div>\n          <div class=\"col-lg-3 col-md-3 col-sm-6 col-6\"></div>\n          <div class=\"col-lg-3 col-md-3 col-sm-6 col-6\">\n            <div class=\"form-group marginB0\">\n              <label style=\"display: block;\">&nbsp;</label>\n              <div class=\"btn-cont pull-right\">\n                <a *ngIf=\"admin?.admin_acl['Settings']?.can_create==1\" class=\"btn btn-primary\" href=\"javascript://\"\n                  (click)=\"openStateModal(addStateModal, '', '', '', '', '1', -1)\">{{'location.addNew' | translate}}</a>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <!-- list state -->\n    <div class=\"tabel-section padding40 paddingT0\">\n      <div class=\"table-responsive\">\n        <table class=\"table table-striped\">\n          <tr>\n            <th style=\"width:40%; text-align:left;\">{{'table.th.stateEn' | translate}}</th>\n            <th style=\"width:40%; text-align:left;\">{{'table.th.stateEs' | translate}}</th>\n            <th style=\"width:20%\">{{'table.th.actions.label' | translate}}</th>\n          </tr>\n          <tr *ngFor=\"let state of parameter.states1; let s = index\">\n            <td class=\"text-left\">\n              {{state.name_en}}\n            </td>\n            <td class=\"text-left\">\n              {{state.name_es}}\n            </td>\n            <td>\n              <button title=\"{{'table.title.editDetails' | translate}}\"\n                [disabled]=\"admin?.admin_acl['Settings']?.can_update==0\"\n                (click)=\"openStateModal(addStateModal, state.country_id, state.id, state.name_en, state.name_es, state.status, s)\"\n                class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></button>\n\n              <!-- status = 1 means unblocked -->\n              <button [disabled]=\"admin?.admin_acl['Settings']?.can_delete==0\"\n                (click)=\"blockUnblockState(state.country_id, state.name_en, state.name_es, state.status==1?0:1, state.id, s)\"\n                title=\"{{state.status==1 ? ('table.title.block' | translate) : ('table.title.unblock' | translate)}}\"\n                [ngClass]=\"{'unblock-bg':state.status==0}\" class=\"action-icon\"><img src=\"assets/img/block.png\"\n                  alt=\"img\">\n              </button>\n\n\n              <button [disabled]=\"admin?.admin_acl['Settings']?.can_delete==0\" (click)=\"deletePopup(state,s,'State')\"\n                class=\"action-icon\" title=\"{{'table.title.delete' | translate}}\"><img src=\"assets/img/ic_delete.png\"\n                  alt=\"img\">\n              </button>\n            </td>\n          </tr>\n        </table>\n\n        <div class=\"error-border\" *ngIf=\"parameter.states1?.length == 0\">\n          <p class=\"show-not-found\">\n            {{'message.error.noStateFound' | translate}}\n          </p>\n        </div>\n      </div>\n    </div>\n\n\n    <!-- add city -->\n    <div class=\"form-outer marginT15\">\n      <div class=\"inline-form-group\">\n        <div class=\"row\">\n          <div class=\"col-md-12\">\n            <label><strong>{{'filters.location.city' | translate}}</strong></label>\n            <hr>\n          </div>\n          <div class=\"col-lg-3 col-md-3 col-sm-6 col-6\">\n            <div class=\"form-group marginB0\">\n              <label>{{'filters.location.country' | translate}}</label>\n              <select class=\"form-control\" (change)=\"getStates($event.target.value, '', 2)\">\n                <option *ngFor=\"let country of parameter.countries3\" value=\"{{country.id}}\">{{country.name_en}}</option>\n              </select>\n            </div>\n          </div>\n          <div class=\"col-lg-3 col-md-3 col-sm-6 col-6\">\n            <div class=\"form-group marginB0\">\n              <label>{{'filters.location.state' | translate}}</label>\n              <select class=\"form-control\" (change)=\"getCities($event.target.value, '', 1)\">\n                <option *ngFor=\"let state of parameter.states2\" value=\"{{state.id}}\">{{state.name_en}}</option>\n              </select>\n            </div>\n          </div>\n          <div class=\"col-lg-3 col-md-3 col-sm-6 col-6 table-search\">\n            <div class=\"form-group marginB0\">\n              <label>{{'filters.location.search' | translate}}</label>\n              <div class=\"searh-2\">\n                <input autocomplete=\"off\" type=\"text\" [(ngModel)]=\"searchCity\"\n                  (keyup.enter)=\"getCities(parameter.state_id, searchCity, 1)\" name=\"keyword\"\n                  placeholder=\"{{'addForm.placeholder.searchHere' | translate}}\">\n                <button (click)=\"getCities(parameter.state_id, searchCity, 1)\"><i class=\"fa fa-search\"></i></button>\n              </div>\n            </div>\n          </div>\n          <div class=\"col-lg-3 col-md-3 col-sm-6 col-6\">\n            <div class=\"form-group marginB0\">\n              <label style=\"display: block;\">&nbsp;</label>\n              <div class=\"btn-cont pull-right\">\n                <a *ngIf=\"admin?.admin_acl['Settings']?.can_create==1\" class=\"btn btn-primary\" href=\"javascript://\"\n                  (click)=\"openCityModal(addCityModal, '', '', '', '', '', 1, -1)\">{{'location.addNew' | translate}}</a>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <!-- list city -->\n    <div class=\"tabel-section padding40 paddingT0\">\n      <div class=\"table-responsive\">\n        <table class=\"table table-striped\">\n          <tr>\n            <th style=\"width:40%; text-align:left;\">{{'table.th.cityEn' | translate}}</th>\n            <th style=\"width:40%; text-align:left;\">{{'table.th.cityEs' | translate}}</th>\n            <th style=\"width:20%\">{{'table.th.actions.label' | translate}}</th>\n          </tr>\n          <tr *ngFor=\"let city of parameter.cities1; let ci=index\">\n            <td class=\"text-left\">\n              {{city.name_en}}\n            </td>\n            <td class=\"text-left\">\n              {{city.name_es}}\n            </td>\n            <td>\n              <button title=\"{{'table.title.editDetails' | translate}}\"\n                [disabled]=\"admin?.admin_acl['Settings']?.can_update==0\"\n                (click)=\"openCityModal(addCityModal, city.country_id, city.state_id, city.id, city.name_en, city.name_es, city.status, ci)\"\n                class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></button>\n\n              <!-- status = 1 means unblocked -->\n              <button [disabled]=\"admin?.admin_acl['Settings']?.can_delete==0\"\n                (click)=\"blockUnblockCity(city.state_id, city.name_en, city.name_es, city.status==1?0:1, city.id, ci)\"\n                title=\"{{city.status==1 ? ('table.title.block' | translate) : ('table.title.unblock' | translate)}}\"\n                [ngClass]=\"{'unblock-bg':city.status==0}\" class=\"action-icon\"><img src=\"assets/img/block.png\" alt=\"img\">\n              </button>\n\n              <button [disabled]=\"admin?.admin_acl['Settings']?.can_delete==0\" (click)=\"deletePopup(city,ci,'City')\"\n                class=\"action-icon\" title=\"{{'table.title.delete' | translate}}\">\n                <img src=\"assets/img/ic_delete.png\" alt=\"img\">\n              </button>\n            </td>\n          </tr>\n        </table>\n\n        <div class=\"error-border\" *ngIf=\"parameter.states2?.length == 0; else cityNotFound\">\n          <p class=\"show-not-found\">\n            {{'message.error.noStateFound' | translate}}\n          </p>\n        </div>\n\n        <ng-template #cityNotFound>\n          <div class=\"error-border\" *ngIf=\"parameter.cities1?.length == 0\">\n            <p class=\"show-not-found\">\n              {{'message.error.noCityFound' | translate}}\n            </p>\n          </div>\n        </ng-template>\n\n      </div>\n    </div>\n\n  </div>\n</div>\n<!--content end-->\n\n\n<!-- add country modal -->\n<ng-template #addCountryModal>\n  <div class=\"modal-content\">\n    <div class=\"modal-header my-modal-header\">\n      <h4 class=\"modal-title\">{{'location.addCountry' | translate}}</h4>\n      <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <form class=\"form-horizontal my-modal-form\" role=\"form\" novalidate #addForm=\"ngForm\"\n      (ngSubmit)=\"checkIfCountrySpanishNameEntered(addForm.value.name_en, addForm.value.name_es)\">\n      <div class=\"modal-body my-modal-body\">\n        <div class=\"form-group\">\n          <input autocomplete=\"off\" type=\"text\" class=\"form-control\"\n            placeholder=\"{{'addForm.placeholder.countryEn' | translate}}\" id=\"name_en\" required\n            [(ngModel)]=\"location.countryModel.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n          <!-- <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-not-found\">\n              <div [hidden]=\"!name_en.errors.required\">\n                {{constant.errorMsg.COUNTRY_NAME_REQUIRED}}\n              </div>\n          </div> -->\n        </div>\n        <div class=\"form-group\">\n          <input autocomplete=\"off\" type=\"text\" class=\"form-control\"\n            placeholder=\"{{'addForm.placeholder.countryEs' | translate}}\" [(ngModel)]=\"location.countryModel.name_es\"\n            name=\"name_es\">\n        </div>\n      </div>\n      <div class=\"modal-footer btn-cont\">\n        <button type=\"submit\" [disabled]=\"admin?.admin_acl['Settings']?.can_create==0 || addForm.invalid\"\n          class=\"btn btn-primary-new\">{{'addForm.submit' | translate}}</button>\n        <button type=\"button\" class=\"btn btn-default\" aria-label=\"Close\" (click)=\"modalRef.hide()\">{{'addForm.close' |\n          translate}}</button>\n      </div>\n    </form>\n  </div>\n</ng-template>\n\n\n<!-- add state modal -->\n<ng-template #addStateModal>\n  <div class=\"modal-content\">\n    <div class=\"modal-header my-modal-header\">\n      <h4 class=\"modal-title\">{{'location.addState' | translate}}</h4>\n      <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <form class=\"form-horizontal my-modal-form\" role=\"form\" novalidate #addForm=\"ngForm\"\n      (ngSubmit)=\"checkIfStateSpanishNameEntered(addForm.value.country_id, addForm.value.name_en, addForm.value.name_es)\">\n      <div class=\"modal-body my-modal-body\">\n        <div class=\"form-group\" *ngIf=\"location.stateModel.state_id == ''\">\n          <select title=\"{{'filters.location.selectCountry' | translate}}\" id=\"country_id\" required\n            [(ngModel)]=\"location.stateModel.country_id\" name=\"country_id\" #country_id=\"ngModel\" class=\"form-control\"\n            required>\n            <option value=\"\" disabled>{{'filters.location.selectCountry' | translate}}</option>\n            <option *ngFor=\"let c of parameter.countries4\" value=\"{{c.id}}\">{{c.name}}</option>\n          </select>\n          <!-- <div *ngIf=\"country_id.errors && (country_id.dirty || country_id.touched)\" class=\"show-not-found\">\n            <div [hidden]=\"!country_id.errors.required\">\n              {{constant.errorMsg.COUNTRY_NAME_REQUIRED}}\n            </div>\n          </div> -->\n        </div>\n        <div class=\"form-group\">\n          <input autocomplete=\"off\" type=\"text\" class=\"form-control\"\n            placeholder=\"{{'addForm.placeholder.stateEn' | translate}}\" id=\"name_en\" required\n            [(ngModel)]=\"location.stateModel.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n          <!-- <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-not-found\">\n              <div [hidden]=\"!name_en.errors.required\">\n                {{constant.errorMsg.STATE_NAME_REQUIRED}}\n              </div>\n          </div> -->\n        </div>\n        <div class=\"form-group\">\n          <input autocomplete=\"off\" type=\"text\" class=\"form-control\"\n            placeholder=\"{{'addForm.placeholder.stateEs' | translate}}\" [(ngModel)]=\"location.stateModel.name_es\"\n            name=\"name_es\">\n        </div>\n      </div>\n      <div class=\"modal-footer btn-cont\">\n        <button type=\"submit\" [disabled]=\"admin?.admin_acl['Settings']?.can_create==0 || addForm.invalid\"\n          class=\"btn btn-primary-new\">{{'addForm.submit' | translate}}</button>\n        <button type=\"button\" class=\"btn btn-default\" aria-label=\"Close\" (click)=\"modalRef.hide()\">{{'addForm.close' |\n          translate}}</button>\n      </div>\n    </form>\n  </div>\n</ng-template>\n\n\n<!-- add city modal -->\n<ng-template #addCityModal>\n  <div class=\"modal-content\">\n    <div class=\"modal-header my-modal-header\">\n      <h4 class=\"modal-title\">{{'location.addCity' | translate}}</h4>\n      <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <form class=\"form-horizontal my-modal-form\" role=\"form\" novalidate #addForm=\"ngForm\"\n      (ngSubmit)=\"checkIfCitySpanishNameEntered(addForm.value.state_id, addForm.value.name_en, addForm.value.name_es)\">\n      <div class=\"modal-body my-modal-body\">\n        <div class=\"form-group\" *ngIf=\"location.cityModel.city_id == ''\">\n          <select title=\"{{'filters.location.selectCountry' | translate}}\" id=\"country_id\"\n            (change)=\"getStates($event.target.value, '', 3)\" required [(ngModel)]=\"location.cityModel.country_id\"\n            name=\"country_id\" #country_id=\"ngModel\" class=\"form-control\" required>\n            <option value=\"\" disabled>{{'filters.location.selectCountry' | translate}}</option>\n            <option *ngFor=\"let c of parameter.countries5\" value=\"{{c.id}}\">{{c.name}}</option>\n          </select>\n          <!-- <div *ngIf=\"country_id.errors && (country_id.dirty || country_id.touched)\" class=\"show-not-found\">\n            <div [hidden]=\"!country_id.errors.required\">\n              {{constant.errorMsg.COUNTRY_NAME_REQUIRED}}\n            </div>\n          </div> -->\n        </div>\n        <div class=\"form-group\" *ngIf=\"location.cityModel.city_id == ''\">\n          <select title=\"{{'filters.location.selectState' | translate}}\" id=\"state_id\" required\n            [(ngModel)]=\"location.cityModel.state_id\" name=\"state_id\" #state_id=\"ngModel\" class=\"form-control\" required>\n            <option value=\"\" disabled>{{'filters.location.selectState' | translate}}</option>\n            <option *ngFor=\"let s of parameter.states3\" value=\"{{s.id}}\">{{s.name}}</option>\n          </select>\n          <!-- <div *ngIf=\"state_id.errors && (state_id.dirty || state_id.touched)\" class=\"show-not-found\">\n            <div [hidden]=\"!state_id.errors.required\">\n              {{constant.errorMsg.STATE_NAME_REQUIRED}}\n            </div>\n          </div> -->\n        </div>\n        <div class=\"form-group\">\n          <input autocomplete=\"off\" type=\"text\" class=\"form-control\"\n            placeholder=\"{{'addForm.placeholder.cityEn' | translate}}\" id=\"name_en\" required\n            [(ngModel)]=\"location.cityModel.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n          <!-- <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-not-found\">\n              <div [hidden]=\"!name_en.errors.required\">\n                {{constant.errorMsg.CITY_NAME_REQUIRED}}\n              </div>\n          </div> -->\n        </div>\n        <div class=\"form-group\">\n          <input autocomplete=\"off\" type=\"text\" class=\"form-control\"\n            placeholder=\"{{'addForm.placeholder.cityEs' | translate}}\" [(ngModel)]=\"location.cityModel.name_es\"\n            name=\"name_es\">\n        </div>\n      </div>\n      <div class=\"modal-footer btn-cont\">\n        <button type=\"submit\" [disabled]=\"admin?.admin_acl['Settings']?.can_create==0 || addForm.invalid\"\n          class=\"btn btn-primary-new\">{{'addForm.submit' | translate}}</button>\n        <button type=\"button\" class=\"btn btn-default\" aria-label=\"Close\" (click)=\"modalRef.hide()\">{{'addForm.close' |\n          translate}}</button>\n      </div>\n    </form>\n  </div>\n</ng-template>"

/***/ }),

/***/ "./src/app/layout/settings/location/location.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/layout/settings/location/location.component.ts ***!
  \****************************************************************/
/*! exports provided: LocationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocationComponent", function() { return LocationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/index.js");
/* harmony import */ var src_app_models_location_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/location.model */ "./src/app/models/location.model.ts");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var LocationComponent = /** @class */ (function () {
    function LocationComponent(location, constant, modalService, admin, spinner, translate) {
        this.location = location;
        this.constant = constant;
        this.modalService = modalService;
        this.admin = admin;
        this.spinner = spinner;
        this.translate = translate;
        this.parameter = {};
        this.items = [];
    }
    LocationComponent.prototype.ngOnInit = function () {
        this.searchCountry = '';
        this.searchState = '';
        this.searchCity = '';
        this.getCountries(this.searchCountry, '');
    };
    LocationComponent.prototype.openCountryModal = function (template, country_id, name_en, name_es, status, index) {
        this.parameter.index = index;
        this.location.countryModel.country_id = country_id;
        this.location.countryModel.name_en = name_en;
        this.location.countryModel.name_es = name_es;
        this.location.countryModel.status = status;
        this.modalRef = this.modalService.show(template);
    };
    LocationComponent.prototype.openStateModal = function (template, country_id, state_id, name_en, name_es, status, index) {
        this.parameter.index = index;
        this.location.stateModel.country_id = country_id;
        this.location.stateModel.state_id = state_id;
        this.location.stateModel.name_en = name_en;
        this.location.stateModel.name_es = name_es;
        this.location.stateModel.status = status;
        this.modalRef = this.modalService.show(template);
    };
    LocationComponent.prototype.openCityModal = function (template, country_id, state_id, city_id, name_en, name_es, status, index) {
        this.parameter.index = index;
        this.location.cityModel.country_id = country_id;
        this.location.cityModel.state_id = state_id;
        this.location.cityModel.city_id = city_id;
        this.location.cityModel.name_en = name_en;
        this.location.cityModel.name_es = name_es;
        this.location.cityModel.status = status;
        this.modalRef = this.modalService.show(template);
    };
    LocationComponent.prototype.openModal = function (template) {
        this.modalRef = this.modalService.show(template); // {3}
    };
    // used for country listing and country search
    LocationComponent.prototype.getCountries = function (keyword, keyname) {
        var _this = this;
        var input = new FormData();
        if (keyword) {
            input.append('keyword', keyword);
        }
        this.admin.postDataApi('getCountries', input)
            .subscribe(function (success) {
            if (keyname === '') {
                _this.parameter.countries1 = success.data.reverse();
                _this.parameter.countries2 = success.data.reverse();
                _this.parameter.countries3 = success.data.reverse();
                _this.parameter.countries4 = success.data.reverse();
                _this.parameter.countries5 = success.data.reverse();
                _this.getStates(_this.parameter.countries2[0].id, '', '');
            }
            else if (keyname === 1) {
                _this.parameter.countries1 = success.data.reverse();
            }
            else if (keyname === 2) {
                _this.parameter.countries2 = success.data.reverse();
                if (_this.parameter.countries2.length > 0) {
                    // this.getStates(this.parameter.countries2[0].id, '', '1');
                }
            }
            else if (keyname === 3) {
                _this.parameter.countries3 = success.data.reverse();
            }
            else if (keyname === 4) {
                _this.parameter.countries4 = success.data.reverse();
            }
            else if (keyname === 5) {
                _this.parameter.countries5 = success.data.reverse();
            }
        }, function (error) {
            // this.spinner.hide();
        });
    };
    // used on click of country -- city
    LocationComponent.prototype.getStates = function (country_id, keyword, keyname) {
        var _this = this;
        this.parameter.country_id = country_id;
        var input = new FormData();
        input.append('country_id', country_id);
        if (keyword) {
            input.append('keyword', keyword);
        }
        this.admin.postDataApi('country/getStates', input)
            .subscribe(function (success) {
            if (keyname === '') {
                _this.parameter.country_id1 = country_id;
                _this.parameter.country_id2 = country_id;
                _this.parameter.states1 = success.data.reverse();
                _this.parameter.states2 = success.data.reverse();
                _this.parameter.states3 = success.data.reverse();
                _this.getCities(_this.parameter.states1[0].id, '', '');
            }
            else if (keyname === 1) {
                _this.parameter.country_id1 = country_id;
                _this.parameter.states1 = success.data.reverse();
                // this.getCities(this.parameter.states1[0].id, '', '1');
            }
            else if (keyname === 2) {
                _this.parameter.country_id2 = country_id;
                _this.parameter.states2 = success.data.reverse();
                if (_this.parameter.states2.length > 0) {
                    _this.getCities(_this.parameter.states2[0].id, '', 1);
                }
                else {
                    _this.parameter.cities1 = [];
                }
            }
            else if (keyname === 3) {
                _this.parameter.states3 = success.data.reverse();
            }
            // if (this.parameter.states1.length !== 0) {
            //   this.parameter.state_id = this.parameter.states1[0].id;
            //   this.getCities(this.parameter.states1[0].id, '', '1');
            // }else { this.parameter.cities = []; }
        });
    };
    LocationComponent.prototype.getCities = function (state_id, keyword, keyname) {
        var _this = this;
        this.parameter.state_id = state_id;
        this.searchCity = keyword;
        var input = new FormData();
        input.append('state_id', state_id);
        if (keyword) {
            input.append('keyword', keyword);
        }
        this.admin.postDataApi('getCities', input)
            .subscribe(function (success) {
            // this.parameter.cities = success.data.reverse();
            if (keyname === '') {
                _this.parameter.state_id1 = state_id;
                _this.parameter.cities1 = success.data.reverse();
                _this.parameter.cities2 = success.data.reverse();
            }
            else if (keyname === 1) {
                _this.parameter.state_id1 = state_id;
                _this.parameter.cities1 = success.data.reverse();
            }
            else if (keyname === 2) {
                _this.parameter.cities2 = success.data.reverse();
            }
        }, function (error) {
            // this.spinner.hide();
        });
    };
    LocationComponent.prototype.checkIfCountrySpanishNameEntered = function (name_en, name_es) {
        var _this = this;
        if (name_es === void 0) { name_es = ''; }
        var self = this;
        if (name_es === '') {
            swal({
                text: this.translate.instant('message.error.saveEngCountryName'),
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: this.constant.confirmButtonColor,
                cancelButtonColor: this.constant.cancelButtonColor,
                confirmButtonText: 'Yes'
            }).then(function (result) {
                if (result.value) {
                    _this.addCountry(name_en, name_en, self.location.countryModel.status, '');
                }
            });
        }
        else {
            self.addCountry(name_en, name_es, self.location.countryModel.status, '');
        }
    };
    LocationComponent.prototype.addCountry = function (name_en, name_es, status, country_id) {
        var _this = this;
        if (country_id === '') {
            this.modalRef.hide();
        } // hide only when open
        var input = new FormData();
        input.append('name_es', name_es);
        input.append('name_en', name_en);
        input.append('status', status);
        if (this.location.countryModel.country_id) {
            input.append('country_id', this.location.countryModel.country_id);
        }
        else if (country_id) {
            input.append('country_id', country_id);
        }
        this.admin.postDataApi('addCountry', input)
            .subscribe(function (success) {
            var text = _this.location.countryModel.country_id || country_id ?
                _this.translate.instant('message.success.updatedSuccessfully') :
                _this.translate.instant('message.success.addedSuccessfully');
            swal(_this.translate.instant('swal.success'), text, 'success');
            _this.getCountries('', '');
            // this.getAllCountries('', 'added-country');   // loading dropdown
            // if (this.parameter.index === -1) {
            //   this.parameter.countries1.push(success.data);
            // }else {
            //   this.parameter.countries1[this.parameter.index] = success.data;
            // }
        });
    };
    LocationComponent.prototype.checkIfStateSpanishNameEntered = function (country_id, name_en, name_es) {
        var _this = this;
        if (name_es === void 0) { name_es = ''; }
        var self = this;
        if (name_es === '') {
            swal({
                text: this.translate.instant('message.error.saveEngStateName'),
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: this.constant.confirmButtonColor,
                cancelButtonColor: this.constant.cancelButtonColor,
                confirmButtonText: 'Yes'
            }).then(function (result) {
                if (result.value) {
                    _this.addState(country_id, name_en, name_en, self.location.stateModel.status, '');
                }
            });
        }
        else {
            self.addState(country_id, name_en, name_es, self.location.stateModel.status, '');
        }
    };
    LocationComponent.prototype.addState = function (country_id, name_en, name_es, status, state_id) {
        var _this = this;
        if (state_id === '') {
            this.modalRef.hide();
        }
        var input = new FormData();
        input.append('name_es', name_es);
        input.append('name_en', name_en);
        input.append('status', status);
        if (this.location.stateModel.country_id) {
            input.append('country_id', this.location.stateModel.country_id); // edit
        }
        else {
            input.append('country_id', country_id); // add
        }
        if (this.location.stateModel.state_id) {
            input.append('state_id', this.location.stateModel.state_id);
        }
        else if (state_id) {
            input.append('state_id', state_id);
        }
        this.admin.postDataApi('country/addState', input)
            .subscribe(function (success) {
            var text = _this.location.stateModel.state_id || state_id ?
                _this.translate.instant('message.success.updatedSuccessfully') :
                _this.translate.instant('message.success.addedSuccessfully');
            swal(_this.translate.instant('swal.success'), text, 'success');
            _this.getStates(_this.parameter.country_id1, '', 1);
            _this.getStates(_this.parameter.country_id2, '', 2);
            // this.getStatesWRTCountry(this.parameter.country_id, '');
            // if (this.parameter.index === -1) {
            //   this.parameter.states.push(success.data);
            // }else {
            //   this.parameter.states[this.parameter.index] = success.data;
            // }
        });
    };
    LocationComponent.prototype.checkIfCitySpanishNameEntered = function (state_id, name_en, name_es) {
        var _this = this;
        if (name_es === void 0) { name_es = ''; }
        var self = this;
        if (name_es === '') {
            swal({
                text: this.translate.instant('message.error.saveEngCityName'),
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: this.constant.confirmButtonColor,
                cancelButtonColor: this.constant.cancelButtonColor,
                confirmButtonText: 'Yes'
            }).then(function (result) {
                if (result.value) {
                    _this.addCity(state_id, name_en, name_en, self.location.cityModel.status, '');
                }
            });
        }
        else {
            self.addCity(state_id, name_en, name_es, self.location.cityModel.status, '');
        }
    };
    LocationComponent.prototype.addCity = function (state_id, name_en, name_es, status, city_id) {
        var _this = this;
        if (city_id === '') {
            this.modalRef.hide();
        }
        var input = new FormData();
        input.append('name_es', name_es);
        input.append('name_en', name_en);
        input.append('status', status);
        if (this.location.cityModel.state_id) {
            input.append('state_id', this.location.cityModel.state_id); // edit
        }
        else {
            input.append('state_id', state_id); // add
        }
        if (this.location.cityModel.city_id) {
            input.append('city_id', this.location.cityModel.city_id); // edit
        }
        else if (city_id) {
            input.append('city_id', city_id); // edit
        }
        this.admin.postDataApi('addCity', input)
            .subscribe(function (success) {
            var text = _this.location.cityModel.city_id || city_id ?
                _this.translate.instant('message.success.updatedSuccessfully') :
                _this.translate.instant('message.success.addedSuccessfully');
            swal(_this.translate.instant('swal.success'), text, 'success');
            _this.getCities(_this.parameter.state_id1, '', 1);
        });
    };
    LocationComponent.prototype.blockUnblockCountry = function (country_id, name_en, name_es, type, index) {
        var _this = this;
        this.parameter.index = index;
        switch (type) {
            case 0:
                this.parameter.text = this.translate.instant('message.error.wantToBlockCountry');
                this.parameter.successText = this.translate.instant('message.success.blockedSuccessfully');
                break;
            case 1:
                this.parameter.text = this.translate.instant('message.error.wantToUnblockCountry');
                this.parameter.successText = this.translate.instant('message.success.unblockedSuccessfully');
                break;
        }
        swal({
            html: this.translate.instant('message.error.areYouSure') + '<br>' + this.parameter.text,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.addCountry(name_en, name_es, type, country_id);
            }
        });
    };
    LocationComponent.prototype.blockUnblockState = function (country_id, name_en, name_es, type, state_id, index) {
        var _this = this;
        this.parameter.index = index;
        switch (type) {
            case 0:
                this.parameter.text = this.translate.instant('message.error.wantToBlockState');
                this.parameter.successText = this.translate.instant('message.success.blockedSuccessfully');
                break;
            case 1:
                this.parameter.text = this.translate.instant('message.error.wantToUnblockState');
                this.parameter.successText = this.translate.instant('message.success.unblockedSuccessfully');
                break;
        }
        // const self = this;
        swal({
            // title: this.parameter.title,
            // text: this.parameter.text,
            html: this.translate.instant('message.error.areYouSure') + '<br>' + this.parameter.text,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.addState(country_id, name_en, name_es, type, state_id);
            }
        });
    };
    LocationComponent.prototype.blockUnblockCity = function (state_id, name_en, name_es, type, city_id, index) {
        var _this = this;
        this.parameter.index = index;
        switch (type) {
            case 0:
                this.parameter.text = this.translate.instant('message.error.wantToBlockCity');
                this.parameter.successText = this.translate.instant('message.success.blockedSuccessfully');
                break;
            case 1:
                this.parameter.text = this.translate.instant('message.error.wantToUnblockCity');
                this.parameter.successText = this.translate.instant('message.success.unblockedSuccessfully');
                break;
        }
        swal({
            // title: this.parameter.title,
            // text: this.parameter.text,
            html: this.translate.instant('message.error.areYouSure') + '<br>' + this.parameter.text,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.addCity(state_id, name_en, name_es, type, city_id);
            }
        });
    };
    // delete country , state , city
    LocationComponent.prototype.deletePopup = function (data, index, value) {
        var _this = this;
        swal({
            html: this.translate.instant('message.error.areYouSure') + '<br>' +
                this.translate.instant('message.error.wantToDelete' + value),
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                value == 'Country' ? _this.deleteCountry(data, index) : value == 'State' ?
                    _this.deleteState(data, index) : value == 'City' ?
                    _this.deleteCity(data, index) : undefined;
            }
        });
    };
    LocationComponent.prototype.deleteCountry = function (country, index) {
        var _this = this;
        this.admin.postDataApi('deleteCountry', { country_id: country.id }).subscribe(function (r) {
            swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.deletedSuccessfully'), 'success');
            _this.getCountries('', '');
            _this.items.splice(index, 1);
        }, function (error) {
            swal(_this.translate.instant('swal.error'), error.message, 'error');
        });
    };
    LocationComponent.prototype.deleteState = function (state, index) {
        var _this = this;
        this.admin.postDataApi('deleteState', { state_id: state.id }).subscribe(function (r) {
            swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.deletedSuccessfully'), 'success');
            _this.getStates(_this.parameter.country_id1, '', 1);
            _this.getStates(_this.parameter.country_id2, '', 2);
            _this.items.splice(index, 1);
        }, function (error) {
            swal(_this.translate.instant('swal.error'), error.message, 'error');
        });
    };
    LocationComponent.prototype.deleteCity = function (city, index) {
        var _this = this;
        this.admin.postDataApi('deleteCity', { city_id: city.id }).subscribe(function (r) {
            swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.deletedSuccessfully'), 'success');
            _this.getCities(_this.parameter.state_id1, '', 1);
            _this.items.splice(index, 1);
        }, function (error) {
            swal(_this.translate.instant('swal.error'), error.message, 'error');
        });
    };
    LocationComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-location',
            template: __webpack_require__(/*! ./location.component.html */ "./src/app/layout/settings/location/location.component.html"),
            styles: [__webpack_require__(/*! ./location.component.css */ "./src/app/layout/settings/location/location.component.css")],
            providers: [src_app_models_location_model__WEBPACK_IMPORTED_MODULE_3__["Location"], src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["Constant"]]
        }),
        __metadata("design:paramtypes", [src_app_models_location_model__WEBPACK_IMPORTED_MODULE_3__["Location"], src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["Constant"],
            ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_2__["BsModalService"], src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_1__["AdminService"], ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__["TranslateService"]])
    ], LocationComponent);
    return LocationComponent;
}());



/***/ }),

/***/ "./src/app/layout/settings/profile/profile.component.css":
/*!***************************************************************!*\
  !*** ./src/app/layout/settings/profile/profile.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9zZXR0aW5ncy9wcm9maWxlL3Byb2ZpbGUuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/layout/settings/profile/profile.component.html":
/*!****************************************************************!*\
  !*** ./src/app/layout/settings/profile/profile.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container-fluid\">\n<div class=\"row\">\n    <div class=\"col-12\">\n      <div class=\"title-group\">\n          <h5>{{'myProfile.label' | translate}}</h5>\n          <div class=\"spacer30\"></div>\n      </div>\n    </div>\n</div>\n<div class=\"white-bg padding40\">\n    <div class=\"row\">\n    <form role=\"form\" ngNativeValidate #addForm=\"ngForm\">\n      <div class=\"col-xl-12 col-lg-12 col-md-12 col-12\">\n          <div class=\"row\">\n            <div class=\"col-6\">\n                <div class=\"add-img\" style=\"display:flex;\">\n                    <img *ngIf=\"image\" [src]=\"image\" style=\"object-fit: cover; width: 100%;\">\n                    <label *ngIf=\"!image\">{{'myProfile.noImage' | translate}}</label>\n                </div>\n            </div>\n            <div class=\"col-12\">\n                <div class=\"spacer40\"></div>\n            </div>\n            <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                  <label>{{'addForm.name' | translate}}</label>\n                  <input disabled autocomplete=\"off\" required type=\"text\" class=\"form-control\" [(ngModel)]=\"model.name\" name=\"name\">\n                </div>\n            </div>\n            <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                  <label>{{'addForm.contactNumber' | translate}}</label>\n                  <input disabled minlength=\"6\" maxlength=\"16\" autocomplete=\"off\" type=\"text\" [pattern]=\"constant.phonePattern\" class=\"form-control\" id=\"phone\" required minlength=\"1\" [(ngModel)]=\"model.phone\" name=\"phone\"\n                        ng2TelInput [ng2TelInputOptions]=\"initialCountry\" />\n                </div>\n            </div>\n            <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                  <label>{{'addForm.emailId' | translate}}</label>\n                  <input disabled autocomplete=\"off\" required [pattern]=\"constant.emailPattern\" type=\"email\" class=\"form-control\" [(ngModel)]=\"model.email\" name=\"email\">\n                </div>\n            </div>\n          </div>\n          <div class=\"access-controls\">\n              <div class=\"select-controls select-controls-1\" *ngFor=\"let permission of model.admin_acl; let i=index\">\n              <label class=\"cust-check-bx2\" [ngClass]=\"{'access-control11':permission.can_create==1 || permission.can_read==1 || permission.can_update==1 || permission.can_delete==1 || permission.can_purge==1}\">{{permission?.acl?.name}}\n              <input (click)=\"expandBox(i)\" type=\"checkbox\" [checked]=\"permission.can_create == 1 || permission.can_read==1 || permission.can_update==1 || permission.can_delete==1 || permission.can_purge==1 ? 'checked': ''\">\n              <span class=\"checkmark\"></span>\n              </label>\n              \n              <div class=\"clearfix\"></div>\n              <div *ngIf=\"permission.show\" id=\"broker-seller-dev\" class=\"inner-select\">\n                <label class=\"cust-check-bx\" [ngClass]=\"{'inner-checked':permission.can_create==1}\">{{'addForm.canCreate' | translate}}\n                    <input [disabled]=\"true\" type=\"checkbox\" [checked]=\"permission.can_create == 1 ? 'checked': ''\" >\n                    <span class=\"checkmark\"></span>\n                </label>\n                <label class=\"cust-check-bx\" [ngClass]=\"{'inner-checked':permission.can_read==1}\">{{'addForm.canRead' | translate}}\n                    <input [disabled]=\"true\" type=\"checkbox\" [checked]=\"permission.can_read == 1 ? 'checked': ''\" >\n                    <span class=\"checkmark\"></span>\n                </label>\n                <label class=\"cust-check-bx\" [ngClass]=\"{'inner-checked':permission.can_update==1}\">{{'addForm.canUpdate' | translate}}\n                    <input [disabled]=\"true\" type=\"checkbox\" [checked]=\"permission.can_update == 1 ? 'checked': ''\" >\n                    <span class=\"checkmark\"></span>\n                </label>\n                <label class=\"cust-check-bx\" [ngClass]=\"{'inner-checked':permission.can_delete==1}\">{{'addForm.canBlockUnblock' | translate}}\n                    <input [disabled]=\"true\" type=\"checkbox\" [checked]=\"permission.can_delete == 1 ? 'checked': ''\" >\n                    <span class=\"checkmark\"></span>\n                </label>\n                <label class=\"cust-check-bx\" [ngClass]=\"{'inner-checked':permission.can_crud==1}\">{{'addForm.canCRUD' | translate}}\n                    <input [disabled]=\"true\" type=\"checkbox\" [checked]=\"permission.can_crud == 1 ? 'checked': ''\" >\n                    <span class=\"checkmark\"></span>\n                </label>\n                <br>\n              </div>\n              <div class=\"clearfix\"></div>\n            </div>\n        </div>\n\n\n        <div class=\"row\" *ngFor=\"let add of model.address; let j=index\">\n            <div class=\"col-sm-2 col-12\">\n                <div class=\"form-group-2\">\n                  <label>{{'filters.location.country' | translate}}</label>\n                  <select class=\"form-control\">\n                      <option>{{add.countries}}</option>\n                  </select>\n                </div>\n            </div>\n            <div class=\"col-sm-2 col-12\">\n                <div class=\"form-group-2\">\n                  <label>{{'filters.location.state' | translate}}</label>\n                  <select class=\"form-control\" disabled>\n                      <option>{{add.states}}</option>\n                  </select>\n                </div>\n            </div>\n            <div class=\"col-sm-2 col-12\">\n                <div class=\"form-group-2\">\n                  <label>{{'filters.location.city' | translate}}</label>\n                  <select class=\"form-control\" disabled>\n                      <option>{{add.cities}}</option>\n                  </select>\n                </div>\n            </div>\n            <div class=\"col-sm-2 col-12\">\n                <div class=\"form-group-2\">\n                  <label>{{'filters.location.locality' | translate}}</label>\n                  <select class=\"form-control\" disabled>\n                      <option>{{add.localities}}</option>\n                  </select>\n                </div>\n            </div>\n            <div class=\"col-sm-2 col-12\">\n                <div class=\"form-group-2\">\n                  <label>{{'filters.location.building' | translate}}</label>\n                  <select class=\"form-control\" disabled>\n                      <option>{{add.buildings}}</option>\n                  </select>\n                </div>\n            </div>\n          </div>\n                 \n      </div>\n      </form>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/layout/settings/profile/profile.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/layout/settings/profile/profile.component.ts ***!
  \**************************************************************/
/*! exports provided: ProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileComponent", function() { return ProfileComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var src_app_models_acl_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/acl.model */ "./src/app/models/acl.model.ts");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
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





var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(constant, model, admin, spinner) {
        this.constant = constant;
        this.model = model;
        this.admin = admin;
        this.spinner = spinner;
        this.parameter = {};
        this.show = false;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        this.model.country_code = this.constant.country_code;
        this.model.dial_code = this.constant.dial_code;
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.p = this.constant.p;
        this.initialCountry = { initialCountry: this.constant.country_code };
        this.loginData();
    };
    ProfileComponent.prototype.loginData = function () {
        var _this = this;
        this.spinner.show();
        this.admin.postDataApi('loginData', {})
            .subscribe(function (success) {
            _this.spinner.hide();
            _this.model = success.data;
            _this.image = _this.model.image;
            _this.model.admin_acl = success.data.admin_acl;
            _this.model.address = [];
            for (var ind = 0; ind < success.data.countries.length; ind++) {
                var tempAdd = {
                    countries: success.data.countries[ind].name_en,
                    states: success.data.states !== null && success.data.states[ind] ? success.data.states[ind].name_en : 'All',
                    cities: success.data.cities !== null && success.data.cities[ind] ? success.data.cities[ind].name_en : 'All',
                    localities: success.data.localities !== null && success.data.localities[ind] ? success.data.localities[ind].name_en : 'All',
                    buildings: success.data.buildings !== null && success.data.buildings[ind] ? success.data.buildings[ind].name_en : 'All'
                };
                _this.model.address[ind] = tempAdd;
            }
        }, function (error) {
            _this.spinner.hide();
        });
    };
    ProfileComponent.prototype.expandBox = function (index) {
        this.model.admin_acl[index].show = this.model.admin_acl[index].show === true ? false : true;
    };
    ProfileComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-profile',
            template: __webpack_require__(/*! ./profile.component.html */ "./src/app/layout/settings/profile/profile.component.html"),
            styles: [__webpack_require__(/*! ./profile.component.css */ "./src/app/layout/settings/profile/profile.component.css")],
            providers: [src_app_models_acl_model__WEBPACK_IMPORTED_MODULE_2__["ACL"]]
        }),
        __metadata("design:paramtypes", [src_app_common_constants__WEBPACK_IMPORTED_MODULE_3__["Constant"], src_app_models_acl_model__WEBPACK_IMPORTED_MODULE_2__["ACL"],
            src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_1__["AdminService"], ngx_spinner__WEBPACK_IMPORTED_MODULE_4__["NgxSpinnerService"]])
    ], ProfileComponent);
    return ProfileComponent;
}());



/***/ }),

/***/ "./src/app/layout/settings/project/project.component.css":
/*!***************************************************************!*\
  !*** ./src/app/layout/settings/project/project.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".amenity-img{\n    text-align: center\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L3NldHRpbmdzL3Byb2plY3QvcHJvamVjdC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksa0JBQWtCO0NBQ3JCIiwiZmlsZSI6InNyYy9hcHAvbGF5b3V0L3NldHRpbmdzL3Byb2plY3QvcHJvamVjdC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmFtZW5pdHktaW1ne1xuICAgIHRleHQtYWxpZ246IGNlbnRlclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/layout/settings/project/project.component.html":
/*!****************************************************************!*\
  !*** ./src/app/layout/settings/project/project.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container-fluid\">\n  <div class=\"breadcrumb-group\">\n      <h5>{{'settings.label' | translate}}</h5>\n      <nav class=\"breadcrumb\">\n        <a class=\"breadcrumb-item\">{{'settings.home' | translate}}</a>\n        <a class=\"breadcrumb-item\">{{'settings.label' | translate}}</a>\n        <span class=\"breadcrumb-item active\">{{'project.label' | translate}}</span>\n      </nav>\n  </div>\n  <div class=\"white-bg\">\n      <div class=\"page-title\">\n        <h3>{{'project.label' | translate}}</h3>\n      </div>\n\n      <div class=\"form-outer\">\n          <div class=\"inline-form-group\">\n             <div class=\"row\">\n                <div class=\"col-md-4\">\n                    <label><strong>{{'project.possessionStatus' | translate}}</strong></label>\n                </div>\n                <div class=\"col-md-8\" *ngIf=\"admin?.admin_acl['Settings']?.can_create==1\">\n                   <form role=\"form\" novalidate #addPossessionForm=\"ngForm\" (ngSubmit)=\"checkIfPossessionSpanishNameEntered(addPossessionForm, '', addPossessionForm.value.name_en, addPossessionForm.value.name_es, 1, 'add')\">\n                      <div class=\"row\">\n                        <div class=\"col-lg-6 col-md-6\">\n                          <input type=\"text\" class=\"form-control\" placeholder=\"{{'addForm.placeholder.possessionStatusEn' | translate}}\" id=\"name_en\" required [(ngModel)]=\"project.possession.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n                          <!-- <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-not-found\">\n                            <div [hidden]=\"!name_en.errors.required\">\n                              {{constant.errorMsg.PROPERTY_CONFIG_REQUIRED}}\n                            </div>\n                          </div>       -->\n                        </div>\n                        <div class=\"col-lg-6 col-md-6\">\n                            <input type=\"text\" class=\"form-control\" placeholder=\"{{'addForm.placeholder.possessionStatusEs' | translate}}\" [(ngModel)]=\"project.possession.name_es\" name=\"name_es\">\n                        </div>\n                      </div>\n                    <button [disabled]=\"admin?.admin_acl['Settings']?.can_create==0 || addPossessionForm.invalid\" type=\"submit\" class=\"add-btn btn\">\n                       <img src=\"assets/img/add.png\" alt=\"img\">\n                     </button>\n                   </form>\n                </div>\n             </div>\n          </div>\n      </div>\n\n      <div class=\"tabel-section padding40 paddingT0\">\n          <div class=\"table-responsive\">\n            <table class=\"table table-striped\">\n                <tr>\n                  <th style=\"width:40%; text-align:left;\">{{'table.th.nameEn' | translate}}</th>\n                  <th style=\"width:40%; text-align:left;\">{{'table.th.nameEs' | translate}}</th>\n                  <th style=\"width:20%\">{{'table.th.actions.label' | translate}}</th>\n                </tr>\n                <tr *ngFor=\"let item of parameter.items; let i=index\">\n                  <td class=\"text-left\">\n                    {{item.name_en}}\n                  </td>\n                  <td class=\"text-left\">\n                    {{item.name_es}}\n                  </td>\n                  <td>\n                      <button title=\"{{'table.title.editDetails' | translate}}\" [disabled]=\"admin?.admin_acl['Settings']?.can_update==0\" \n                      (click)=\"openPossessionStatusModal(addPossessionStatusModal, i, item.id, item.name_en, item.name_es, item.status)\" class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></button>\n                    \n                      <!-- status = 1 means unblocked -->\n                      <button [disabled]=\"admin?.admin_acl['Settings']?.can_delete==0\"\n                        (click)=\"addPossessionStatusPopup(i, item.id, item.name_en, item.name_es, item.status==1?0:1, item.status==1?'block':'unblock')\" \n                        title=\"{{item.status==1 ? ('table.title.block' | translate) : ('table.title.unblock' | translate)}}\" [ngClass]=\"{'unblock-bg':item.status==0}\"\n                        class=\"action-icon\"><img src=\"assets/img/block.png\" alt=\"img\">\n                      </button>\n                    <!-- <a title=\"Edit Configuration\" (click)=\"openPossessionStatusModal(addPossessionStatusModal, item.id, item.name_en, item.name_es, item.status)\" class=\"icon-block edit-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></a>\n                    <a *ngIf=\"item.status == 1\" (click)=\"addPossessionStatusPopup(item.id, item.name_en, item.name_es, 0, 'block')\" title=\"Block Configuration\" class=\"icon-block block-icon\"><img src=\"assets/img/unblock.png\" alt=\"img\"></a>\n                    <a *ngIf=\"item.status == 0\" (click)=\"addPossessionStatusPopup(item.id, item.name_en, item.name_es, 1, 'unblock')\" title=\"Unblock Configuration\" class=\"icon-block block-icon unblock-bg\"><img src=\"assets/img/block.png\" alt=\"img\"></a> -->\n                  </td>\n                </tr>\n\n                <div *ngIf=\"parameter.total == 0\">\n                  <p class=\"show-not-found\">\n                      {{'message.error.noPossessionFound' | translate}}\n                  </p>\n                </div>\n            </table>\n          </div>\n      </div>\n\n\n      <div class=\"form-outer\">\n        <div class=\"inline-form-group\">\n           <div class=\"row\">\n              <div class=\"col-md-4\">\n                  <label><strong>{{'project.projectType' | translate}}</strong></label>\n              </div>\n              <div class=\"col-md-8\" *ngIf=\"admin?.admin_acl['Settings']?.can_create==1\">\n                 <form role=\"form\" novalidate #addTypeForm=\"ngForm\" (ngSubmit)=\"checkIfTypeSpanishNameEntered(addTypeForm, '', addTypeForm.value.name_en, addTypeForm.value.name_es, 1, 'add')\">\n\n                  <div class=\"row\">\n                      <div class=\"col-md-6 col-lg-6\">\n                          <input type=\"text\" class=\"form-control\" placeholder=\"{{'addForm.placeholder.projectTypeEn' | translate}}\" id=\"name_en\" required [(ngModel)]=\"project.type.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n                          <!-- <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-not-found\">\n                            <div [hidden]=\"!name_en.errors.required\">\n                              {{constant.errorMsg.PROPERTY_TYPE_REQUIRED}}\n                            </div>\n                        </div> -->\n                      </div>\n                    \n                    <div class=\"col-lg-6 col-md-6\">\n                        <input type=\"text\" class=\"form-control\" placeholder=\"{{'addForm.placeholder.projectTypeEs' | translate}}\" [(ngModel)]=\"project.type.name_es\" name=\"name_es\">\n                    </div>\n  \n                  </div>\n                  <button [disabled]=\"admin?.admin_acl['Settings']?.can_create==0 || addTypeForm.invalid\" type=\"submit\" class=\"add-btn btn\">\n                     <img src=\"assets/img/add.png\" alt=\"img\">\n                   </button>\n                 </form>\n              </div>\n           </div>\n        </div>\n    </div>\n\n    <div class=\"tabel-section padding40 paddingT0\">\n        <div class=\"table-responsive\">\n          <table class=\"table table-striped\">\n              <tr>\n                <th style=\"width:40%; text-align:left;\">{{'table.th.nameEn' | translate}}</th>\n                <th style=\"width:40%; text-align:left;\">{{'table.th.nameEs' | translate}}</th>\n                <th style=\"width:20%\">{{'table.th.actions.label' | translate}}</th>\n              </tr>\n              <tr *ngFor=\"let item of parameter.projectTypes; let j=index\">\n                <td class=\"text-left\">\n                  {{item.name_en}}\n                </td>\n                <td class=\"text-left\">\n                  {{item.name_es}}\n                </td>\n                <td>\n                    <button title=\"{{'table.title.editDetails' | translate}}\" [disabled]=\"admin?.admin_acl['Settings']?.can_update==0\" \n                    (click)=\"openBuildingTypeModal(addBuildingTypeModal, j, item.id, item.name_en, item.name_es, item.status)\" class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></button>\n                  \n                    <!-- status = 1 means unblocked -->\n                    <button [disabled]=\"admin?.admin_acl['Settings']?.can_delete==0\"\n                      (click)=\"addBuildingTypePopup(j, item.id, item.name_en, item.name_es, item.status==1?0:1, item.status==1?'block':'unblock')\" \n                      title=\"{{item.status==1 ? ('table.title.block' | translate) : ('table.title.unblock' | translate)}}\" [ngClass]=\"{'unblock-bg':item.status==0}\"\n                      class=\"action-icon\"><img src=\"assets/img/block.png\" alt=\"img\">\n                    </button>\n                  <!-- <a title=\"Edit Property Type\" (click)=\"openBuildingTypeModal(addBuildingTypeModal, item.id, item.name_en, item.name_es, item.status)\" class=\"icon-block edit-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></a>\n                  <a *ngIf=\"item.status == 1\" (click)=\"addBuildingTypePopup(item.id, item.name_en, item.name_es, 0, 'block')\" title=\"Block Property Type\" class=\"icon-block block-icon\"><img src=\"assets/img/unblock.png\" alt=\"img\"></a>\n                  <a *ngIf=\"item.status == 0\" (click)=\"addBuildingTypePopup(item.id, item.name_en, item.name_es, 1, 'unblock')\" title=\"Unblock Property Type\" class=\"icon-block block-icon unblock-bg\"><img src=\"assets/img/block.png\" alt=\"img\"></a> -->\n                </td>\n              </tr>\n\n              <div *ngIf=\"parameter.projectTypesCount == 0\">\n                <p class=\"show-not-found\">\n                    {{'message.error.noProjectTypeFound' | translate}}\n                </p>\n              </div>\n          </table>\n        </div>\n    </div>\n\n\n\n      <div class=\"form-outer\">\n        <div class=\"inline-form-group\">\n            <div class=\"row\">\n              <div class=\"col-md-4\">\n                  <label>{{'project.amenities' | translate}}</label>\n              </div>\n              <div class=\"col-md-8\" *ngIf=\"admin?.admin_acl['Settings']?.can_create==1\">\n                 <form role=\"form\" novalidate #addAmenityForm=\"ngForm\" (ngSubmit)=\"checkIfAmenitySpanishNameEntered(addAmenityForm, '', '', addAmenityForm.value.name_en, addAmenityForm.value.name_es, 1, 'add')\">\n                  <div class=\"browse-files\">\n                    <input accept=\"image/*\" (change)=\"changeListner($event)\" type=\"file\" class=\"image form-control\" placeholder=\"{{'addForm.placeholder.amenity' | translate}}\" id=\"icon\" required [(ngModel)]=\"amenityModel.icon\" name=\"icon\" #icon=\"ngModel\">\n                    <span>{{'project.browse' | translate}}</span>\n                  </div>\n                  <!-- <div *ngIf=\"icon.errors && (icon.dirty || icon.touched)\" class=\"show-not-found\">\n                    <div [hidden]=\"!icon.errors.required\">\n                      {{constant.errorMsg.FILE_REQUIRED}}\n                    </div>\n                  </div> -->\n                  \n                  <div class=\"row\">\n                    <div class=\"col-lg-6 col-md-6\">\n                        <input type=\"text\" class=\"form-control\" placeholder=\"{{'addForm.placeholder.projectAmenityEn' | translate}}\" id=\"name_en\" required [(ngModel)]=\"amenityModel.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n                        <!-- <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-not-found\">\n                          <div [hidden]=\"!name_en.errors.required\">\n                            {{constant.errorMsg.PROPERTY_TYPE_REQUIRED}}\n                          </div>\n                      </div>     -->\n                    </div>\n                    <div class=\"col-lg-6 col-md-6\">\n                        <input type=\"text\" class=\"form-control\" placeholder=\"{{'addForm.placeholder.projectAmenityEs' | translate}}\" [(ngModel)]=\"amenityModel.name_es\" name=\"name_es\">\n                    </div>\n                  </div>\n                  <button [disabled]=\"admin?.admin_acl['Settings']?.can_create==0 || addAmenityForm.invalid\" type=\"submit\" class=\"add-btn btn\">\n                     <img src=\"assets/img/add.png\" alt=\"img\">\n                   </button>\n                 </form>\n              </div>\n              <!-- <div class=\"col-md-8\">\n                  <div class=\"browse-files\">\n                    <input type=\"file\" name=\"\">\n                    <span>Browse</span>\n                  </div>\n                  <input type=\"text\" name=\"\">\n                  <button class=\"add-btn\" (click)=\"openAmenitiesModal(addAmenitiesModal, '', '', '', '', 1)\">\n                    <img src=\"assets/img/add.png\" alt=\"img\">\n                  </button>\n              </div> -->\n            </div>\n        </div>\n      </div>\n\n      <div class=\"tabel-section padding40\">\n        <div class=\"table-responsive\">\n            <table class=\"table table-striped\">\n              <tr>\n                  <th style=\"width:20%\">{{'table.th.image' | translate}}</th>\n                  <th style=\"width:30%; text-align:left;\">{{'table.th.nameEn' | translate}}</th>\n                  <th style=\"width:30%; text-align:left;\">{{'table.th.nameEs' | translate}}</th>\n                  <th style=\"width:20%\">{{'table.th.actions.label' | translate}}</th>\n              </tr>\n              <tr *ngFor=\"let item of parameter.amenities; let k=index\">\n                  <td>\n                    <!-- <i class=\"fa fa-building\"></i> -->\n                    <img alt=\"image\" height=\"30\" width=\"30\" src=\"{{item.icon}}\">\n                  </td>\n                  <td class=\"text-left\">\n                    {{item.name_en}}\n                  </td>\n                  <td class=\"text-left\">\n                    {{item.name_es}}\n                  </td>\n                  <td>\n                      <button title=\"{{'table.title.editDetails' | translate}}\" [disabled]=\"admin?.admin_acl['Settings']?.can_update==0\" \n                      (click)=\"openAmenityModal(addAmenityModal, k, item.id, item.icon, item.name_en, item.name_es, item.status)\" class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></button>\n                    \n                      <!-- status = 1 means unblocked -->\n                      <button [disabled]=\"admin?.admin_acl['Settings']?.can_delete==0\"\n                        (click)=\"addAmenityPopup(k ,item.id, item.icon, item.name_en, item.name_es, item.status==1?0:1, item.status==1?'block':'unblock')\" \n                        title=\"{{item.status==1 ? ('table.title.block' | translate) : ('table.title.unblock' | translate)}}\" [ngClass]=\"{'unblock-bg':item.status==0}\"\n                        class=\"action-icon\"><img src=\"assets/img/block.png\" alt=\"img\">\n                      </button>\n\n                    <!-- <a title=\"Edit Amenity\" (click)=\"openAmenityModal(addAmenityModal, item.id, item.icon, item.name_en, item.name_es, item.status)\" class=\"icon-block edit-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></a>\n                    <a *ngIf=\"item.status == 1\" (click)=\"addAmenityPopup(item.id, item.icon, item.name_en, item.name_es, 0, 'block')\" title=\"Block Amenity\" class=\"icon-block block-icon\"><img src=\"assets/img/unblock.png\" alt=\"img\"></a>\n                    <a *ngIf=\"item.status == 0\" (click)=\"addAmenityPopup(item.id, item.icon, item.name_en, item.name_es, 1, 'unblock')\" title=\"Unblock Amenity\" class=\"icon-block block-icon unblock-bg\"><img src=\"assets/img/block.png\" alt=\"img\"></a> -->\n                  </td>\n              </tr>\n\n              <div *ngIf=\"parameter.amenitiesCount == 0\">\n                  <p class=\"show-not-found\">\n                      {{'message.error.noProjectAmenityFound' | translate}}\n                  </p>\n                </div>\n            </table>\n        </div>\n      </div>\n      <!-- <div class=\"btn-cont text-right padding40 paddingT0\">\n        <button class=\"btn btn-primary\">Save</button>\n      </div> -->\n  </div>\n</div>\n\n\n<!-- add possession status modal -->\n<ng-template #addPossessionStatusModal>\n  <div class=\"modal-content\">\n    <div class=\"modal-header my-modal-header\">\n      <h4 class=\"modal-title\">{{'project.editPropertyConfig' | translate}}</h4>\n      <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <form class=\"form-horizontal my-modal-form\" role=\"form\" novalidate #addForm=\"ngForm\" (ngSubmit)=\"checkIfPossessionSpanishNameEntered(addForm, project.possession.id, addForm.value.name_en, addForm.value.name_es, project.possession.status, 'edit')\">\n      <div class=\"modal-body my-modal-body\">\n        <div class=\"form-group\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"{{'addForm.placeholder.projectPossessionStatusEn' | translate}}\" id=\"name_en\" required [(ngModel)]=\"project.possession.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n          <!-- <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-not-found\">\n              <div [hidden]=\"!name_en.errors.required\">\n                {{constant.errorMsg.PROPERTY_TYPE_REQUIRED}}\n              </div>\n          </div> -->\n        </div>\n        <div class=\"form-group\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"{{'addForm.placeholder.projectPossessionStatusEs' | translate}}\" [(ngModel)]=\"project.possession.name_es\" name=\"name_es\">\n        </div>\n      </div>\n      <div class=\"modal-footer btn-cont\">\n        <button type=\"submit\" [disabled]=\"admin?.admin_acl['Settings']?.can_update==0 || addForm.invalid\" class=\"btn btn-primary-new\">{{'addForm.submit' | translate}}</button>\n        <button type=\"button\" class=\"btn btn-default\" aria-label=\"Close\" (click)=\"modalRef.hide()\">{{'addForm.close' | translate}}</button>\n      </div>\n    </form>\n  </div>\n</ng-template>\n\n\n<!-- add PropertyTypeModal modal -->\n<ng-template #addBuildingTypeModal>\n  <div class=\"modal-content\">\n    <div class=\"modal-header my-modal-header\">\n      <h4 class=\"modal-title\">{{'project.editPropertyType' | translate}}</h4>\n      <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <form class=\"form-horizontal my-modal-form\" role=\"form\" novalidate #addForm1=\"ngForm\" (ngSubmit)=\"checkIfTypeSpanishNameEntered(addForm1, project.type.id, addForm1.value.name_en, addForm1.value.name_es, project.type.status, 'edit')\">\n      <div class=\"modal-body my-modal-body\">\n        <div class=\"form-group\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"{{'addForm.placeholder.projectTypeEn' | translate}}\" id=\"name_en\" required [(ngModel)]=\"project.type.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n          <!-- <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-not-found\">\n              <div [hidden]=\"!name_en.errors.required\">\n                {{constant.errorMsg.PROPERTY_TYPE_REQUIRED}}\n              </div>\n          </div> -->\n        </div>\n        <div class=\"form-group\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"{{'addForm.placeholder.projectTypeEs' | translate}}\" [(ngModel)]=\"project.type.name_es\" name=\"name_es\">\n        </div>\n      </div>\n      <div class=\"modal-footer btn-cont\">\n        <button type=\"submit\" [disabled]=\"admin?.admin_acl['Settings']?.can_update==0 || addForm1.invalid\" class=\"btn btn-primary-new\">{{'addForm.submit' | translate}}</button>\n        <button type=\"button\" class=\"btn btn-default\" aria-label=\"Close\" (click)=\"modalRef.hide()\">{{'addForm.close' | translate}}</button>\n      </div>\n    </form>\n  </div>\n</ng-template>\n\n\n<!-- addAmenitiesModal -->\n<ng-template #addAmenityModal>\n    <div class=\"modal-content\">\n      <div class=\"modal-header my-modal-header\">\n        <h4 class=\"modal-title\">{{'project.editAmenity' | translate}}</h4>\n        <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <form class=\"form-horizontal my-modal-form\" role=\"form\" novalidate #addForm2=\"ngForm\" (ngSubmit)=\"checkIfAmenitySpanishNameEntered(addForm2, amenityModel.id, '', addForm2.value.name_en, addForm2.value.name_es, amenityModel.status, 'edit')\">\n        <div class=\"modal-body my-modal-body\">\n          <div class=\"form-group amenity-img\">\n            <img [src]=\"amenityModel.icon\" class=\"image\" width=\"100\" height=\"100\">\n          </div>\n          <div class=\"form-group\">\n            <input accept=\"image/*\" (change)=\"changeListner($event)\" type=\"file\" class=\"form-control\">\n          </div>\n          \n          <div class=\"form-group\">\n            <input type=\"text\" class=\"form-control\" placeholder=\"{{'addForm.placeholder.amenityEn' | translate}}\" id=\"name_en\" required [(ngModel)]=\"amenityModel.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n            <!-- <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-not-found\">\n                <div [hidden]=\"!name_en.errors.required\">\n                  {{constant.errorMsg.PROPERTY_TYPE_REQUIRED}}\n                </div>\n            </div> -->\n          </div>\n          <div class=\"form-group\">\n            <input type=\"text\" class=\"form-control\" placeholder=\"{{'addForm.placeholder.amenityEn' | translate}}\" [(ngModel)]=\"amenityModel.name_es\" name=\"name_es\">\n          </div>\n        </div>\n        <div class=\"modal-footer btn-cont\">\n          <button type=\"submit\" [disabled]=\"admin?.admin_acl['Settings']?.can_update==0 || addForm2.invalid\" class=\"btn btn-primary-new\">{{'addForm.submit' | translate}}</button>\n          <button type=\"button\" class=\"btn btn-default\" aria-label=\"Close\" (click)=\"closeModal()\">{{'addForm.close' | translate}}</button>\n        </div>\n      </form>\n  </div>\n</ng-template>\n  "

/***/ }),

/***/ "./src/app/layout/settings/project/project.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/layout/settings/project/project.component.ts ***!
  \**************************************************************/
/*! exports provided: ProjectComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectComponent", function() { return ProjectComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/index.js");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var src_app_models_project_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/project.model */ "./src/app/models/project.model.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ProjectComponent = /** @class */ (function () {
    function ProjectComponent(element, constant, project, modalService, admin, amenityModel, spinner, translate) {
        this.element = element;
        this.constant = constant;
        this.project = project;
        this.modalService = modalService;
        this.admin = admin;
        this.amenityModel = amenityModel;
        this.spinner = spinner;
        this.translate = translate;
        this.parameter = {};
        this.parameter.index = -1;
        this.parameter.countryCount = 0;
        this.parameter.stateCount = 0;
        this.parameter.cityCount = 0;
    }
    ProjectComponent.prototype.ngOnInit = function () {
        this.getPossessionStatuses();
        this.getBuildingTypes();
        this.getAmenities();
    };
    ProjectComponent.prototype.closeModal = function () {
        this.amenityModel = new src_app_models_project_model__WEBPACK_IMPORTED_MODULE_4__["Amenities"];
        this.modalRef.hide();
    };
    ProjectComponent.prototype.openPossessionStatusModal = function (template, index, id, name_en, name_es, status) {
        this.parameter.index = index;
        this.project.possession.id = id;
        this.project.possession.name_en = name_en;
        this.project.possession.name_es = name_es == null ? name_en : name_es;
        this.project.possession.status = status;
        this.modalRef = this.modalService.show(template);
    };
    ProjectComponent.prototype.openBuildingTypeModal = function (template, index, id, name_en, name_es, status) {
        this.parameter.index = index;
        this.project.type.id = id;
        this.project.type.name_en = name_en;
        this.project.type.name_es = name_es;
        this.project.type.status = status;
        this.modalRef = this.modalService.show(template);
    };
    ProjectComponent.prototype.openAmenityModal = function (template, index, id, icon, name_en, name_es, status) {
        this.parameter.index = index;
        this.amenityModel.id = id;
        this.amenityModel.icon = icon;
        this.amenityModel.name_en = name_en;
        this.amenityModel.name_es = name_es;
        this.amenityModel.status = status;
        this.modalRef = this.modalService.show(template);
    };
    ProjectComponent.prototype.addPossessionStatus = function (id, name_en, name_es, status, type) {
        var _this = this;
        if (type === 'edit') {
            this.modalRef.hide();
        }
        this.parameter.url = 'addPossessionStatus';
        var input = new FormData();
        input.append('name_en', name_en);
        input.append('name_es', name_es);
        input.append('status', status);
        if (id) {
            input.append('id', id);
        }
        this.spinner.show();
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.spinner.hide();
            var text = id ?
                _this.translate.instant('message.success.updatedSuccessfully') :
                _this.translate.instant('message.success.addedSuccessfully');
            swal(_this.translate.instant('swal.success'), text, 'success');
            _this.project.possession.name_en = '';
            _this.project.possession.name_es = '';
            if (_this.parameter.index !== -1) {
                _this.parameter.items[_this.parameter.index] = success.data;
            }
            else {
                _this.parameter.items.push(success.data);
            }
            _this.parameter.index = -1;
            // this.getPossessionStatuses();
        }, function (error) {
            _this.spinner.hide();
        });
    };
    ProjectComponent.prototype.addBuildingType = function (id, name_en, name_es, status, type) {
        var _this = this;
        if (type === 'edit') {
            this.modalRef.hide();
        }
        this.parameter.url = 'addBuildingType';
        var input = new FormData();
        input.append('name_en', name_en);
        input.append('name_es', name_es);
        input.append('status', status);
        if (id) {
            input.append('id', id);
        }
        this.spinner.show();
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.spinner.hide();
            var text = id ?
                _this.translate.instant('message.success.updatedSuccessfully') :
                _this.translate.instant('message.success.addedSuccessfully');
            _this.project.type.name_en = '';
            _this.project.type.name_es = '';
            swal(_this.translate.instant('swal.success'), text, 'success');
            if (_this.parameter.index !== -1) {
                _this.parameter.projectTypes[_this.parameter.index] = success.data;
            }
            else {
                _this.parameter.projectTypes.push(success.data);
            }
            _this.parameter.index = -1;
            // this.getBuildingTypes();
        }, function (error) {
            _this.spinner.hide();
        });
    };
    ProjectComponent.prototype.addAmenity = function (id, icon, name_en, name_es, status, type) {
        var _this = this;
        if (type === 'edit') {
            this.modalRef.hide();
        }
        var iconNew = this.icon ? this.icon : this.amenityModel.icon;
        this.parameter.url = 'addAmenity';
        var input = new FormData();
        input.append('name_en', name_en);
        input.append('name_es', name_es);
        input.append('status', status);
        if (this.icon) {
            input.append('icon', iconNew);
        }
        if (id) {
            input.append('id', id);
        }
        this.spinner.show();
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.spinner.hide();
            var text = id ?
                _this.translate.instant('message.success.updatedSuccessfully') :
                _this.translate.instant('message.success.addedSuccessfully');
            swal(_this.translate.instant('swal.success'), text, 'success');
            if (_this.parameter.index !== -1) {
                _this.parameter.amenities[_this.parameter.index] = success.data;
            }
            else {
                _this.parameter.amenities.push(success.data);
            }
            _this.parameter.index = -1;
            _this.amenityModel = new src_app_models_project_model__WEBPACK_IMPORTED_MODULE_4__["Amenities"];
            // this.getAmenities();
        }, function (error) {
            _this.spinner.hide();
        });
    };
    ProjectComponent.prototype.getPossessionStatuses = function () {
        var _this = this;
        this.spinner.show();
        this.parameter.url = 'getPossessionStatuses';
        var input = new FormData();
        this.admin.postDataApi(this.parameter.url, { hide_blocked: 0 })
            .subscribe(function (success) {
            _this.spinner.hide();
            _this.parameter.items = success.data;
            _this.parameter.total = success.data.length;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    ProjectComponent.prototype.getBuildingTypes = function () {
        var _this = this;
        this.spinner.show();
        this.parameter.url = 'getBuildingTypes';
        var input = new FormData();
        this.admin.postDataApi(this.parameter.url, { hide_blocked: 0 })
            .subscribe(function (success) {
            _this.spinner.hide();
            _this.parameter.projectTypes = success.data;
            _this.parameter.projectTypesCount = success.data.length;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    ProjectComponent.prototype.getAmenities = function () {
        var _this = this;
        this.spinner.show();
        this.parameter.url = 'getAmenities';
        var input = new FormData();
        this.admin.postDataApi(this.parameter.url, { hide_blocked: 0 })
            .subscribe(function (success) {
            _this.spinner.hide();
            _this.parameter.amenities = success.data;
            _this.parameter.amenitiesCount = success.data.length;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    ProjectComponent.prototype.addPossessionStatusPopup = function (index, id, name_en, name_es, status, type) {
        var _this = this;
        this.parameter.index = index;
        var text = status === 1 ? this.translate.instant('message.error.wantToUnblockPossessionStatus') :
            this.translate.instant('message.error.wantToBlockPossessionStatus');
        swal({
            html: this.translate.instant('message.error.areYouSure') + '<br>' + this.parameter.text,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.addPossessionStatus(id, name_en, name_es, status, type);
            }
        });
    };
    ProjectComponent.prototype.addBuildingTypePopup = function (index, id, name_en, name_es, status, type) {
        var _this = this;
        this.parameter.index = index;
        var text = status === 1 ? this.translate.instant('message.error.wantToUnblockProjectType') :
            this.translate.instant('message.error.wantToBlockProjectType');
        swal({
            html: this.translate.instant('message.error.areYouSure') + '<br>' + this.parameter.text,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.addBuildingType(id, name_en, name_es, status, type);
            }
        });
    };
    ProjectComponent.prototype.addAmenityPopup = function (index, id, icon, name_en, name_es, status, type) {
        var _this = this;
        this.parameter.index = index;
        var text = status === 1 ? this.translate.instant('message.error.wantToUnblockAmenity') :
            this.translate.instant('message.error.wantToBlockAmenity');
        swal({
            html: this.translate.instant('message.error.areYouSure') + '<br>' + this.parameter.text,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.addAmenity(id, icon, name_en, name_es, status, type);
            }
        });
    };
    ProjectComponent.prototype.checkIfPossessionSpanishNameEntered = function (formdata, id, name_en, name_es, status, type) {
        var _this = this;
        var self = this;
        formdata.reset();
        if (name_es === '') {
            swal({
                text: this.translate.instant('message.error.saveEngProjectPossession'),
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: this.constant.confirmButtonColor,
                cancelButtonColor: this.constant.cancelButtonColor,
                confirmButtonText: 'Yes'
            }).then(function (result) {
                if (result.value) {
                    _this.addPossessionStatus(id, name_en, name_en, status, type);
                }
            });
        }
        else {
            self.addPossessionStatus(id, name_en, name_es, status, type);
        }
    };
    ProjectComponent.prototype.checkIfTypeSpanishNameEntered = function (formdata, id, name_en, name_es, status, type) {
        var _this = this;
        var self = this;
        formdata.reset();
        if (name_es === '') {
            swal({
                text: this.translate.instant('message.error.saveEngProjectType'),
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: this.constant.confirmButtonColor,
                cancelButtonColor: this.constant.cancelButtonColor,
                confirmButtonText: 'Yes'
            }).then(function (result) {
                if (result.value) {
                    _this.addBuildingType(id, name_en, name_en, status, type);
                }
            });
        }
        else {
            self.addBuildingType(id, name_en, name_es, status, type);
        }
    };
    ProjectComponent.prototype.checkIfAmenitySpanishNameEntered = function (formdata, id, icon, name_en, name_es, status, type) {
        var _this = this;
        var self = this;
        formdata.reset();
        if (name_es === '') {
            swal({
                text: this.translate.instant('message.error.saveEngAmenity'),
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: this.constant.confirmButtonColor,
                cancelButtonColor: this.constant.cancelButtonColor,
                confirmButtonText: 'Yes'
            }).then(function (result) {
                if (result.value) {
                    _this.addAmenity(id, icon, name_en, name_en, status, type);
                }
            });
        }
        else {
            self.addAmenity(id, icon, name_en, name_es, status, type);
        }
    };
    ProjectComponent.prototype.changeListner = function (event) {
        var reader = new FileReader();
        var image = this.element.nativeElement.querySelector('.image');
        var fileToUpload = event.target.files[0];
        this.icon = fileToUpload;
        reader.onload = function (e) {
            var src = e.target['result'];
            image.src = src;
        };
        reader.readAsDataURL(event.target.files[0]);
    };
    ProjectComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-project',
            template: __webpack_require__(/*! ./project.component.html */ "./src/app/layout/settings/project/project.component.html"),
            styles: [__webpack_require__(/*! ./project.component.css */ "./src/app/layout/settings/project/project.component.css")],
            providers: [src_app_common_constants__WEBPACK_IMPORTED_MODULE_3__["Constant"], src_app_models_project_model__WEBPACK_IMPORTED_MODULE_4__["Project"], src_app_models_project_model__WEBPACK_IMPORTED_MODULE_4__["Amenities"]]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], src_app_common_constants__WEBPACK_IMPORTED_MODULE_3__["Constant"], src_app_models_project_model__WEBPACK_IMPORTED_MODULE_4__["Project"],
            ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_2__["BsModalService"], src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_1__["AdminService"],
            src_app_models_project_model__WEBPACK_IMPORTED_MODULE_4__["Amenities"], ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__["TranslateService"]])
    ], ProjectComponent);
    return ProjectComponent;
}());



/***/ }),

/***/ "./src/app/layout/settings/property/property.component.css":
/*!*****************************************************************!*\
  !*** ./src/app/layout/settings/property/property.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".amenity-img{\n    text-align: center\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L3NldHRpbmdzL3Byb3BlcnR5L3Byb3BlcnR5LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxrQkFBa0I7Q0FDckIiLCJmaWxlIjoic3JjL2FwcC9sYXlvdXQvc2V0dGluZ3MvcHJvcGVydHkvcHJvcGVydHkuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5hbWVuaXR5LWltZ3tcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXJcbn0iXX0= */"

/***/ }),

/***/ "./src/app/layout/settings/property/property.component.html":
/*!******************************************************************!*\
  !*** ./src/app/layout/settings/property/property.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container-fluid\">\n  <div class=\"breadcrumb-group\">\n    <h5>{{'settings.label' | translate}}</h5>\n      <nav class=\"breadcrumb\">\n        <a class=\"breadcrumb-item\">{{'settings.home' | translate}}</a>\n        <a class=\"breadcrumb-item\">{{'settings.label' | translate}}</a>\n        <span class=\"breadcrumb-item active\">{{'property.label' | translate}}</span>\n      </nav>\n  </div>\n  <div class=\"white-bg\">\n      <div class=\"page-title\">\n        <h3>{{'property.label' | translate}}</h3>\n      </div>\n\n\n      <div class=\"form-outer\">\n          <div class=\"inline-form-group\">\n             <div class=\"row\">\n                <div class=\"col-md-4\">\n                    <label><strong>{{'property.propertyConfiguration' | translate}}</strong></label>\n                </div>\n                <div class=\"col-md-8\" *ngIf=\"admin?.admin_acl['Settings']?.can_create==1\" >\n                   <!-- <form role=\"form\" novalidate #addConfigForm=\"ngForm\" (ngSubmit)=\"checkIfConfigSpanishNameEntered(addConfigForm, '', addConfigForm.value.name_en, addConfigForm.value.name_es, 1, 'add')\">\n                    <div class=\"row\">\n                        <div class=\"col-lg-6 col-md-6\">\n                            <input type=\"text\" class=\"form-control\" placeholder=\"Configuration name (English)\" id=\"name_en\" required [(ngModel)]=\"property.configuration.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n                        </div>\n                        <div class=\"col-lg-6 col-md-6\">\n                            <input type=\"text\" class=\"form-control\" placeholder=\"Configuration name (Spanish)\" [(ngModel)]=\"property.configuration.name_es\" name=\"name_es\">\n                        </div>\n                      </div>\n                    <button [disabled]=\"admin?.admin_acl['Settings']?.can_create==0 || addConfigForm.invalid\" type=\"submit\" class=\"add-btn btn\">\n                       <img src=\"assets/img/add.png\" alt=\"img\">\n                     </button>\n                   </form> -->\n\n                    <div class=\"form-group marginB0\">\n                      <div class=\"btn-cont text-right\">\n                          <a *ngIf=\"admin?.admin_acl['Settings']?.can_create==1\" class=\"btn btn-primary\" href=\"javascript://\" (click)=\"openPropertyConfigModal(addPropertyConfigModal, -1, '', '', '', '', '', '', 1)\">\n                            {{'location.addNew' | translate}}</a>\n                      </div>\n                    </div>\n                   <!-- <button [disabled]=\"admin?.admin_acl['Settings']?.can_create==0\" type=\"button\" class=\"add-btn btn\"\n                      (click)=\"openPropertyConfigModal(addPropertyConfigModal, -1, '', '', '', '', '', '', 1)\">\n                      <img src=\"assets/img/add.png\" alt=\"img\">\n                    </button> -->\n                </div>\n             </div>\n          </div>\n      </div>\n\n      <div class=\"tabel-section padding40 paddingT0\">\n          <div class=\"table-responsive\">\n            <table class=\"table table-striped\">\n                <tr>\n                  <th style=\"width:25%; text-align:left;\">{{'table.th.nameEn' | translate}}</th>\n                  <th style=\"width:25%; text-align:left;\">{{'table.th.nameEs' | translate}}</th>\n                  <th style=\"width:10%; text-align:left;\">{{'table.th.bedrooms' | translate}}</th>\n                  <th style=\"width:10%; text-align:left;\">{{'table.th.bathrooms' | translate}}</th>\n                  <th style=\"width:10%; text-align:left;\">{{'table.th.halfBathrooms' | translate}}</th>\n                  <th style=\"width:20%\">{{'table.th.actions.label' | translate}}</th>\n                </tr>\n                <tr *ngFor=\"let item of parameter.items; let i=index\">\n                  <td class=\"text-left\">\n                    {{item.name_en}}\n                  </td>\n                  <td class=\"text-left\">\n                    {{item.name_es}}\n                  </td>\n                  <td class=\"text-left\">\n                    {{item.bedroom}}\n                  </td>\n                  <td class=\"text-left\">\n                    {{item.bathroom}}\n                  </td>\n                  <td class=\"text-left\">\n                    {{item.half_bathroom}}\n                  </td>\n                  <td>\n                    <button title=\"{{'table.title.editDetails' | translate}}\" [disabled]=\"admin?.admin_acl['Settings']?.can_update==0\" \n                      (click)=\"openPropertyConfigModal(addPropertyConfigModal, i, item.id, item.name_en, item.name_es, item.bedroom, item.bathroom, item.half_bathroom, item.status)\" class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></button>\n                    \n                      <!-- status = 1 means unblocked -->\n                    <button [disabled]=\"admin?.admin_acl['Settings']?.can_delete==0\"\n                      (click)=\"addPropertyConfigurationPopup(i, item.id, item.name_en, item.name_es, item.bedroom, item.bathroom, item.half_bathroom, item.status==1?0:1, item.status==1?'block':'unblock')\" \n                      title=\"{{item.status==1 ? ('table.title.block' | translate) : ('table.title.unblock' | translate)}}\" [ngClass]=\"{'unblock-bg':item.status==0}\"\n                      class=\"action-icon\"><img src=\"assets/img/block.png\" alt=\"img\">\n                    </button>\n                  </td>\n                </tr>\n\n                <div *ngIf=\"parameter.total == 0\">\n                  <p class=\"show-not-found\">\n                      {{'message.error.noPropertyConfigFound' | translate}}\n                  </p>\n                </div>\n            </table>\n          </div>\n      </div>\n\n\n      <div class=\"form-outer\">\n        <div class=\"inline-form-group\">\n           <div class=\"row\">\n              <div class=\"col-md-4\">\n                  <label><strong>{{'property.propertyType' | translate}}</strong></label>\n              </div>\n              <div class=\"col-md-8\" *ngIf=\"admin?.admin_acl['Settings']?.can_create==1\">\n                 <form role=\"form\" novalidate #addTypeForm=\"ngForm\" (ngSubmit)=\"checkIfTypeSpanishNameEntered(addTypeForm, '', addTypeForm.value.name_en, addTypeForm.value.name_es, 1, 'add')\">\n                  <div class=\"row\">\n                    <div class=\"col-lg-6 col-md-6\">\n                        <input type=\"text\" class=\"form-control\" placeholder=\"{{'addForm.placeholder.propertyTypeEn' | translate}}\" id=\"name_en\" required [(ngModel)]=\"property.type.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n                        <!-- <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-not-found\">\n                          <div [hidden]=\"!name_en.errors.required\">\n                            {{constant.errorMsg.PROPERTY_TYPE_REQUIRED}}\n                          </div>\n                      </div>     -->\n                    </div>\n                    <div class=\"col-lg-6 col-md-6\">\n                      <input type=\"text\" class=\"form-control\" placeholder=\"{{'addForm.placeholder.propertyTypeEs' | translate}}\" [(ngModel)]=\"property.type.name_es\" name=\"name_es\">\n                    </div>\n                  </div>\n                  <button [disabled]=\"admin?.admin_acl['Settings']?.can_create==0 || addTypeForm.invalid\" type=\"submit\" class=\"add-btn btn\">\n                     <img src=\"assets/img/add.png\" alt=\"img\">\n                   </button>\n                 </form>\n              </div>\n           </div>\n        </div>\n    </div>\n\n    <div class=\"tabel-section padding40 paddingT0\">\n        <div class=\"table-responsive\">\n          <table class=\"table table-striped\">\n              <tr>\n                <th style=\"width:40%; text-align:left;\">{{'table.th.nameEn' | translate}}</th>\n                <th style=\"width:40%; text-align:left;\">{{'table.th.nameEs' | translate}}</th>\n                <th style=\"width:20%\">{{'table.th.actions.label' | translate}}</th>\n              </tr>\n              <tr *ngFor=\"let item of parameter.propertyTypes; let j=index\">\n                <td class=\"text-left\">\n                  {{item.name_en}}\n                </td>\n                <td class=\"text-left\">\n                  {{item.name_es}}\n                </td>\n                <td>\n                  <button title=\"{{'table.title.editDetails' | translate}}\" [disabled]=\"admin?.admin_acl['Settings']?.can_update==0\" \n                  (click)=\"openPropertyTypeModal(addPropertyTypeModal, j, item.id, item.name_en, item.name_es, item.status)\" class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></button>\n                \n                  <!-- status = 1 means unblocked -->\n                  <button [disabled]=\"admin?.admin_acl['Settings']?.can_delete==0\"\n                    (click)=\"addPropertyTypePopup(j, item.id, item.name_en, item.name_es, item.status==1?0:1, item.status==1?'block':'unblock')\" \n                    title=\"{{item.status==1 ? ('table.title.block' | translate) : ('table.title.unblock' | translate)}}\" [ngClass]=\"{'unblock-bg':item.status==0}\"\n                    class=\"action-icon\"><img src=\"assets/img/block.png\" alt=\"img\">\n                  </button>\n                </td>\n              </tr>\n\n              <div *ngIf=\"parameter.total == 0\">\n                <p class=\"show-not-found\">\n                    {{'message.error.noPropertyTypeFound' | translate}}\n                </p>\n              </div>\n          </table>\n        </div>\n    </div>\n\n\n      <div class=\"form-outer\">\n        <div class=\"inline-form-group\">\n            <div class=\"row\">\n              <div class=\"col-md-4\">\n                  <label>{{'property.amenities' | translate}}</label>\n              </div>\n              <div class=\"col-md-8\" *ngIf=\"admin?.admin_acl['Settings']?.can_create==1\">\n                 <form role=\"form\" novalidate #addAmenityForm=\"ngForm\" (ngSubmit)=\"checkIfAmenitySpanishNameEntered(addAmenityForm, '', '', addAmenityForm.value.name_en, addAmenityForm.value.name_es, 1, 'add')\">\n                  <div class=\"browse-files\">\n                    <input accept=\"image/*\" (change)=\"changeListner($event)\" type=\"file\" class=\"image form-control\" placeholder=\"{{'addForm.placeholder.amenity' | translate}}\" id=\"icon\" required [(ngModel)]=\"property.amenities.icon\" name=\"icon\" #icon=\"ngModel\">\n                    <span>{{'property.amenities' | translate}}</span>\n                    <!-- <div *ngIf=\"icon.errors && (icon.dirty || icon.touched)\" class=\"show-not-found\">\n                      <div [hidden]=\"!icon.errors.required\">\n                        {{constant.errorMsg.FILE_REQUIRED}}\n                      </div>\n                  </div> -->\n                  </div>\n                  <!-- <input type=\"file\" class=\"form-control\" placeholder=\"Amenity\" id=\"icon\" required [(ngModel)]=\"property.amenities.icon\" name=\"icon\" #icon=\"ngModel\">\n                    <div *ngIf=\"icon.errors && (icon.dirty || icon.touched)\" class=\"show-not-found\">\n                      <div [hidden]=\"!icon.errors.required\">\n                        {{constant.errorMsg.PROPERTY_TYPE_REQUIRED}}\n                      </div>\n                  </div> -->\n                  \n                  <div class=\"row\">\n                    <div class=\"col-lg-6 col-md-6\">\n                        <input type=\"text\" class=\"form-control\" placeholder=\"{{'addForm.placeholder.amenityEn' | translate}}\" id=\"name_en\" required [(ngModel)]=\"property.amenities.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n                        <!-- <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-not-found\">\n                          <div [hidden]=\"!name_en.errors.required\">\n                            {{constant.errorMsg.PROPERTY_TYPE_REQUIRED}}\n                          </div>\n                      </div>     -->\n                    </div>\n                    <div class=\"col-lg-6 col-md-6\">\n                        <input type=\"text\" class=\"form-control\" placeholder=\"{{'addForm.placeholder.amenityEs' | translate}}\" [(ngModel)]=\"property.amenities.name_es\" name=\"name_es\">\n                    </div>\n                  </div>\n                  <button [disabled]=\"admin?.admin_acl['Settings']?.can_create==0 || addAmenityForm.invalid\" type=\"submit\" class=\"add-btn btn\">\n                     <img src=\"assets/img/add.png\" alt=\"img\">\n                   </button>\n                 </form>\n              </div>\n              <!-- <div class=\"col-md-8\">\n                  <div class=\"browse-files\">\n                    <input type=\"file\" name=\"\">\n                    <span>Browse</span>\n                  </div>\n                  <input type=\"text\" name=\"\">\n                  <button class=\"add-btn\" (click)=\"openAmenitiesModal(addAmenitiesModal, '', '', '', '', 1)\">\n                    <img src=\"assets/img/add.png\" alt=\"img\">\n                  </button>\n              </div> -->\n            </div>\n        </div>\n      </div>\n\n      <div class=\"tabel-section padding40\">\n        <div class=\"table-responsive\">\n            <table class=\"table table-striped\">\n              <tr>\n                  <th style=\"width:20%\">{{'table.th.image' | translate}}</th>\n                  <th style=\"width:30%; text-align:left;\">{{'table.th.nameEn' | translate}}</th>\n                  <th style=\"width:30%; text-align:left;\">{{'table.th.nameEs' | translate}}</th>\n                  <th style=\"width:20%\">{{'table.th.actions.label' | translate}}</th>\n              </tr>\n              <tr *ngFor=\"let item of parameter.amenities; let k=index\">\n                  <td>\n                    <!-- <i class=\"fa fa-building\"></i> -->\n                    <img alt=\"image\" height=\"30\" width=\"30\" src=\"{{item.icon}}\">\n                  </td>\n                  <td class=\"text-left\">\n                    {{item.name_en}}\n                  </td>\n                  <td class=\"text-left\">\n                    {{item.name_es}}\n                  </td>\n                  <td>\n                      <button title=\"{{'table.title.editDetails' | translate}}\" [disabled]=\"admin?.admin_acl['Settings']?.can_update==0\" \n                      (click)=\"openAmenityModal(addAmenityModal, k, item.id, item.icon, item.name_en, item.name_es, item.status)\" class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></button>\n                    \n                      <!-- status = 1 means unblocked -->\n                      <button [disabled]=\"admin?.admin_acl['Settings']?.can_delete==0\"\n                        (click)=\"addAmenityPopup(k, item.id, item.icon, item.name_en, item.name_es, item.status==1?0:1, item.status==1?'block':'unblock')\" \n                        title=\"{{item.status==1 ? ('table.title.block' | translate) : ('table.title.unblock' | translate)}}\" [ngClass]=\"{'unblock-bg':item.status==0}\"\n                        class=\"action-icon\"><img src=\"assets/img/block.png\" alt=\"img\">\n                      </button>\n                  </td>\n              </tr>\n            </table>\n        </div>\n      </div>\n      <!-- <div class=\"btn-cont text-right padding40 paddingT0\">\n        <button class=\"btn btn-primary\">Save</button>\n      </div> -->\n  </div>\n</div>\n\n\n<!-- add configuration modal -->\n<ng-template #addPropertyConfigModal>\n  <div class=\"modal-content\">\n    <div class=\"modal-header my-modal-header\">\n      <h4 class=\"modal-title\">{{parameter.index!='-1' ? ('property.editPropertyConfig' | translate) : ('property.addPropertyConfig' | translate)}}</h4>\n      <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <form class=\"form-horizontal my-modal-form\" role=\"form\" novalidate #addForm=\"ngForm\" (ngSubmit)=\"checkIfConfigSpanishNameEntered(addForm, property.configuration.id, addForm.value.name_en, addForm.value.name_es, addForm.value.bedroom, addForm.value.bathroom, addForm.value.half_bathroom, property.configuration.status, 'edit')\">\n      <div class=\"modal-body my-modal-body\">\n        <div class=\"form-group\">\n          <input autocomplete=\"off\" type=\"text\" class=\"form-control\" placeholder=\"{{'addForm.placeholder.propertyConfigEn' | translate}}\" id=\"name_en\" required [(ngModel)]=\"property.configuration.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n          <!-- <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-not-found\">\n              <div [hidden]=\"!name_en.errors.required\">\n                {{constant.errorMsg.PROPERTY_TYPE_REQUIRED}}\n              </div>\n          </div> -->\n        </div>\n        <div class=\"form-group\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"{{'addForm.placeholder.propertyConfigEs' | translate}}\" [(ngModel)]=\"property.configuration.name_es\" name=\"name_es\">\n        </div>\n        <div class=\"form-group\">\n          <input type=\"number\" class=\"form-control\" required placeholder=\"{{'addForm.placeholder.bedrooms' | translate}}\" [(ngModel)]=\"property.configuration.bedroom\" name=\"bedroom\" #bedroom=\"ngModel\">\n        </div>\n        <div class=\"form-group\">\n          <input type=\"number\" class=\"form-control\" required placeholder=\"{{'addForm.placeholder.bathrooms' | translate}}\" [(ngModel)]=\"property.configuration.bathroom\" name=\"bathroom\" #bathroom=\"ngModel\">\n        </div>\n        <div class=\"form-group\">\n          <input type=\"number\" class=\"form-control\" required placeholder=\"{{'addForm.placeholder.halfBathrooms' | translate}}\" [(ngModel)]=\"property.configuration.half_bathroom\" name=\"half_bathroom\" #half_bathroom=\"ngModel\">\n        </div>\n      </div>\n      <div class=\"modal-footer btn-cont\">\n        <button type=\"submit\" [disabled]=\"admin?.admin_acl['Settings']?.can_update==0 || addForm.invalid\" class=\"btn btn-primary-new\">{{'addForm.submit' | translate}}</button>\n        <button type=\"button\" class=\"btn btn-default\" aria-label=\"Close\" (click)=\"modalRef.hide()\">{{'addForm.close' | translate}}</button>\n      </div>\n    </form>\n  </div>\n</ng-template>\n\n\n<!-- add PropertyTypeModal modal -->\n<ng-template #addPropertyTypeModal>\n  <div class=\"modal-content\">\n    <div class=\"modal-header my-modal-header\">\n      <h4 class=\"modal-title\">{{'property.editPropertyType' | translate}}</h4>\n      <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <form class=\"form-horizontal my-modal-form\" role=\"form\" novalidate #addForm1=\"ngForm\" (ngSubmit)=\"checkIfTypeSpanishNameEntered(addForm1, property.type.id, addForm1.value.name_en, addForm1.value.name_es, property.type.status, 'edit')\">\n      <div class=\"modal-body my-modal-body\">\n        <div class=\"form-group\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"{{'addForm.placeholder.propertyTypeEn' | translate}}\" id=\"name_en\" required [(ngModel)]=\"property.type.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n          <!-- <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-not-found\">\n              <div [hidden]=\"!name_en.errors.required\">\n                {{constant.errorMsg.PROPERTY_TYPE_REQUIRED}}\n              </div>\n          </div> -->\n        </div>\n        <div class=\"form-group\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"{{'addForm.placeholder.propertyTypeEs' | translate}}\" [(ngModel)]=\"property.type.name_es\" name=\"name_es\">\n        </div>\n      </div>\n      <div class=\"modal-footer btn-cont\">\n        <button type=\"submit\" [disabled]=\"admin?.admin_acl['Settings']?.can_update==0 || addForm1.invalid\" class=\"btn btn-primary-new\">{{'addForm.submit' | translate}}</button>\n        <button type=\"button\" class=\"btn btn-default\" aria-label=\"Close\" (click)=\"modalRef.hide()\">{{'addForm.close' | translate}}</button>\n      </div>\n    </form>\n  </div>\n</ng-template>\n\n\n<!-- addAmenitiesModal -->\n<ng-template #addAmenityModal>\n    <div class=\"modal-content\">\n      <div class=\"modal-header my-modal-header\">\n        <h4 class=\"modal-title\">{{'property.editAmenity' | translate}}</h4>\n        <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <form class=\"form-horizontal my-modal-form\" role=\"form\" novalidate #addForm2=\"ngForm\" (ngSubmit)=\"checkIfAmenitySpanishNameEntered(addForm2, property.amenities.id, '', addForm2.value.name_en, addForm2.value.name_es, property.amenities.status, 'edit')\">\n        <div class=\"modal-body my-modal-body\">\n          <div class=\"form-group amenity-img\">\n            <img src=\"{{property.amenities.icon}}\" width=\"100\" height=\"100\" class=\"image1\">\n          </div>\n          <div class=\"form-group\">\n            <input accept=\"image/*\" (change)=\"changeListner1($event)\" type=\"file\" class=\"form-control\">\n          </div>\n          <div class=\"form-group\">\n            <input type=\"text\" class=\"form-control\" placeholder=\"{{'addForm.placeholder.amenityEn' | translate}}\" id=\"name_en\" required [(ngModel)]=\"property.amenities.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n            <!-- <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-not-found\">\n                <div [hidden]=\"!name_en.errors.required\">\n                  {{constant.errorMsg.PROPERTY_TYPE_REQUIRED}}\n                </div>\n            </div> -->\n          </div>\n          <div class=\"form-group\">\n            <input type=\"text\" class=\"form-control\" placeholder=\"{{'addForm.placeholder.amenityEs' | translate}}\" [(ngModel)]=\"property.amenities.name_es\" name=\"name_es\">\n          </div>\n        </div>\n        <div class=\"modal-footer btn-cont\">\n          <button type=\"submit\" [disabled]=\"admin?.admin_acl['Settings']?.can_update==0 || addForm2.invalid\" class=\"btn btn-primary-new\">{{'addForm.submit' | translate}}</button>\n          <button type=\"button\" class=\"btn btn-default\" aria-label=\"Close\" (click)=\"modalRef.hide()\">{{'addForm.close' | translate}}</button>\n        </div>\n      </form>\n  </div>\n</ng-template>\n  "

/***/ }),

/***/ "./src/app/layout/settings/property/property.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/layout/settings/property/property.component.ts ***!
  \****************************************************************/
/*! exports provided: PropertyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyComponent", function() { return PropertyComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/index.js");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var src_app_models_property_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/models/property.model */ "./src/app/models/property.model.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var PropertyComponent = /** @class */ (function () {
    function PropertyComponent(element, constant, property, modalService, admin, router, spinner, translate) {
        this.element = element;
        this.constant = constant;
        this.property = property;
        this.modalService = modalService;
        this.admin = admin;
        this.router = router;
        this.spinner = spinner;
        this.translate = translate;
        this.parameter = {};
        this.parameter.index = -1;
        this.parameter.countryCount = 0;
        this.parameter.stateCount = 0;
        this.parameter.cityCount = 0;
    }
    PropertyComponent.prototype.ngOnInit = function () {
        this.getConfigurations();
        this.getPropertyTypes();
        this.getAmenities();
    };
    PropertyComponent.prototype.openPropertyConfigModal = function (template, index, id, name_en, name_es, bedroom, bathroom, half_bathroom, status) {
        this.parameter.index = index;
        this.property.configuration.id = id;
        this.property.configuration.name_en = name_en;
        this.property.configuration.name_es = name_es == null ? name_en : name_es;
        this.property.configuration.bedroom = bedroom;
        this.property.configuration.bathroom = bathroom;
        this.property.configuration.half_bathroom = half_bathroom;
        this.property.configuration.status = status;
        this.modalRef = this.modalService.show(template);
    };
    PropertyComponent.prototype.openPropertyTypeModal = function (template, index, id, name_en, name_es, status) {
        this.parameter.index = index;
        this.property.type.id = id;
        this.property.type.name_en = name_en;
        this.property.type.name_es = name_es;
        this.property.type.status = status;
        this.modalRef = this.modalService.show(template);
    };
    PropertyComponent.prototype.openAmenityModal = function (template, index, id, icon, name_en, name_es, status) {
        this.parameter.index = index;
        this.property.amenities.id = id;
        this.property.amenities.icon = icon;
        this.property.amenities.name_en = name_en;
        this.property.amenities.name_es = name_es;
        this.property.amenities.status = status;
        this.modalRef = this.modalService.show(template);
    };
    PropertyComponent.prototype.addPropertyConfiguration = function (id, name_en, name_es, bedroom, bathroom, half_bathroom, status, type) {
        var _this = this;
        if (type === 'edit') {
            this.modalRef.hide();
        }
        this.parameter.url = 'addConfiguration';
        var input = new FormData();
        input.append('name_en', name_en);
        input.append('name_es', name_es);
        input.append('bedroom', bedroom);
        input.append('bathroom', bathroom);
        input.append('half_bathroom', half_bathroom);
        input.append('status', status);
        if (id) {
            input.append('id', id);
        }
        this.spinner.show();
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.spinner.hide();
            var text = id ?
                _this.translate.instant('message.success.updatedSuccessfully') :
                _this.translate.instant('message.success.addedSuccessfully');
            // this.getConfigurations();
            _this.property.configuration.id = '';
            _this.property.configuration.name_en = '';
            _this.property.configuration.name_es = '';
            swal(_this.translate.instant('swal.success'), text, 'success');
            if (_this.parameter.index !== -1) {
                _this.parameter.items[_this.parameter.index] = success.data;
            }
            else {
                _this.parameter.items.push(success.data);
            }
            _this.parameter.index = -1;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    PropertyComponent.prototype.addPropertyType = function (id, name_en, name_es, status, type) {
        var _this = this;
        if (type === 'edit') {
            this.modalRef.hide();
        }
        this.parameter.url = 'addPropertyType';
        var input = new FormData();
        input.append('name_en', name_en);
        input.append('name_es', name_es);
        input.append('status', status);
        if (id) {
            input.append('id', id);
        }
        this.spinner.show();
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.spinner.hide();
            var text = id ?
                _this.translate.instant('message.success.updatedSuccessfully') :
                _this.translate.instant('message.success.addedSuccessfully');
            swal(_this.translate.instant('swal.success'), text, 'success');
            _this.property.type.id = '';
            _this.property.type.name_en = '';
            _this.property.type.name_es = '';
            if (_this.parameter.index !== -1) {
                _this.parameter.propertyTypes[_this.parameter.index] = success.data;
            }
            else {
                _this.parameter.propertyTypes.push(success.data);
            }
            _this.parameter.index = -1;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    PropertyComponent.prototype.addAmenity = function (id, icon, name_en, name_es, status, type) {
        var _this = this;
        if (type === 'edit') {
            this.modalRef.hide();
        }
        var iconNew = this.icon ? this.icon : this.property.amenities.icon;
        this.parameter.url = 'addPropertyAmenity';
        var input = new FormData();
        input.append('name_en', name_en);
        input.append('name_es', name_es);
        input.append('status', status);
        if (this.icon) {
            input.append('icon', iconNew);
        }
        if (id) {
            input.append('id', id);
        }
        this.spinner.show();
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.spinner.hide();
            var text = id ?
                _this.translate.instant('message.success.updatedSuccessfully') :
                _this.translate.instant('message.success.addedSuccessfully');
            swal(_this.translate.instant('swal.success'), text, 'success');
            _this.property.amenities.id = '';
            _this.property.amenities.name_en = '';
            _this.property.amenities.name_es = '';
            _this.property.amenities.icon = '';
            if (_this.parameter.index !== -1) {
                _this.parameter.amenities[_this.parameter.index] = success.data;
            }
            else {
                _this.parameter.amenities.push(success.data);
            }
            _this.parameter.index = -1;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    PropertyComponent.prototype.getConfigurations = function () {
        var _this = this;
        this.spinner.show();
        this.parameter.url = 'getConfigurations';
        var input = new FormData();
        this.admin.postDataApi(this.parameter.url, { hide_blocked: 0 })
            .subscribe(function (success) {
            _this.spinner.hide();
            _this.parameter.items = success.data;
            _this.parameter.total = success.data.length;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    PropertyComponent.prototype.getPropertyTypes = function () {
        var _this = this;
        this.spinner.show();
        this.parameter.url = 'getPropertyTypes';
        var input = new FormData();
        this.admin.postDataApi(this.parameter.url, { hide_blocked: 0 })
            .subscribe(function (success) {
            _this.spinner.hide();
            _this.parameter.propertyTypes = success.data;
            _this.parameter.propertyTypesCount = success.data.length;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    PropertyComponent.prototype.getAmenities = function () {
        var _this = this;
        this.spinner.show();
        this.parameter.url = 'getPropertyAmenities';
        var input = new FormData();
        this.admin.postDataApi(this.parameter.url, { hide_blocked: 0 })
            .subscribe(function (success) {
            _this.spinner.hide();
            _this.parameter.amenities = success.data;
            _this.parameter.amenitiesCount = success.data.length;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    PropertyComponent.prototype.addPropertyConfigurationPopup = function (index, id, name_en, name_es, bedroom, bathroom, half_bathroom, status, type) {
        var _this = this;
        this.parameter.index = index;
        var self = this;
        var text = status === 1 ? this.translate.instant('message.error.wantToUnblockPropertyConfig') :
            this.translate.instant('message.error.wantToBlockPropertyConfig');
        swal({
            html: this.translate.instant('message.error.areYouSure') + '<br>' + this.parameter.text,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.addPropertyConfiguration(id, name_en, name_es, bedroom, bathroom, half_bathroom, status, type);
            }
        });
    };
    PropertyComponent.prototype.addPropertyTypePopup = function (index, id, name_en, name_es, status, type) {
        var _this = this;
        this.parameter.index = index;
        var self = this;
        var text = status === 1 ? this.translate.instant('message.error.wantToUnblockPropertyType') :
            this.translate.instant('message.error.wantToBlockPropertyType');
        swal({
            html: this.translate.instant('message.error.areYouSure') + '<br>' + this.parameter.text,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.addPropertyType(id, name_en, name_es, status, type);
            }
        });
    };
    PropertyComponent.prototype.addAmenityPopup = function (index, id, icon, name_en, name_es, status, type) {
        var _this = this;
        this.parameter.index = index;
        var self = this;
        var text = status === 1 ? this.translate.instant('message.error.wantToUnblockAmenity') :
            this.translate.instant('message.error.wantToBlockAmenity');
        swal({
            html: this.translate.instant('message.error.areYouSure') + '<br>' + this.parameter.text,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.addAmenity(id, icon, name_en, name_es, status, type);
            }
        });
    };
    PropertyComponent.prototype.checkIfConfigSpanishNameEntered = function (formdata, id, name_en, name_es, bedroom, bathroom, half_bathroom, status, type) {
        var _this = this;
        var self = this;
        formdata.reset();
        if (name_es === '') {
            swal({
                text: this.translate.instant('message.error.saveEngPropertyConfig'),
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: this.constant.confirmButtonColor,
                cancelButtonColor: this.constant.cancelButtonColor,
                confirmButtonText: 'Yes'
            }).then(function (result) {
                if (result.value) {
                    _this.addPropertyConfiguration(id, name_en, name_en, bedroom, bathroom, half_bathroom, status, type);
                }
            });
        }
        else {
            self.addPropertyConfiguration(id, name_en, name_es, bedroom, bathroom, half_bathroom, status, type);
        }
    };
    PropertyComponent.prototype.checkIfTypeSpanishNameEntered = function (formdata, id, name_en, name_es, status, type) {
        var _this = this;
        var self = this;
        formdata.reset();
        if (name_es === '') {
            swal({
                text: this.translate.instant('message.error.saveEngPropertyType'),
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: this.constant.confirmButtonColor,
                cancelButtonColor: this.constant.cancelButtonColor,
                confirmButtonText: 'Yes'
            }).then(function (result) {
                if (result.value) {
                    _this.addPropertyType(id, name_en, name_en, status, type);
                }
            });
        }
        else {
            self.addPropertyType(id, name_en, name_es, status, type);
        }
    };
    PropertyComponent.prototype.checkIfAmenitySpanishNameEntered = function (formdata, id, icon, name_en, name_es, status, type) {
        var _this = this;
        var self = this;
        formdata.reset();
        if (name_es === '') {
            swal({
                text: this.translate.instant('message.error.saveEngAmenity'),
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: this.constant.confirmButtonColor,
                cancelButtonColor: this.constant.cancelButtonColor,
                confirmButtonText: 'Yes'
            }).then(function (result) {
                if (result.value) {
                    _this.addAmenity(id, icon, name_en, name_en, status, type);
                }
            });
        }
        else {
            self.addAmenity(id, icon, name_en, name_es, status, type);
        }
    };
    PropertyComponent.prototype.changeListner = function (event) {
        var reader = new FileReader();
        var image = this.element.nativeElement.querySelector('.image');
        var fileToUpload = event.target.files[0];
        this.icon = fileToUpload;
        reader.onload = function (e) {
            var src = e.target['result'];
            image.src = src;
        };
        reader.readAsDataURL(event.target.files[0]);
    };
    PropertyComponent.prototype.changeListner1 = function (event) {
        var reader = new FileReader();
        var image = this.element.nativeElement.querySelector('.image1');
        var fileToUpload = event.target.files[0];
        this.icon = fileToUpload;
        reader.onload = function (e) {
            var src = e.target['result'];
            image.src = src;
        };
        reader.readAsDataURL(event.target.files[0]);
    };
    PropertyComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-property',
            template: __webpack_require__(/*! ./property.component.html */ "./src/app/layout/settings/property/property.component.html"),
            styles: [__webpack_require__(/*! ./property.component.css */ "./src/app/layout/settings/property/property.component.css")],
            providers: [src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["Constant"], src_app_models_property_model__WEBPACK_IMPORTED_MODULE_5__["Property"]]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["Constant"], src_app_models_property_model__WEBPACK_IMPORTED_MODULE_5__["Property"],
            ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_3__["BsModalService"], src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_1__["AdminService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_6__["NgxSpinnerService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateService"]])
    ], PropertyComponent);
    return PropertyComponent;
}());



/***/ }),

/***/ "./src/app/layout/settings/settings.component.css":
/*!********************************************************!*\
  !*** ./src/app/layout/settings/settings.component.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9zZXR0aW5ncy9zZXR0aW5ncy5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/layout/settings/settings.component.html":
/*!*********************************************************!*\
  !*** ./src/app/layout/settings/settings.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/layout/settings/settings.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/layout/settings/settings.component.ts ***!
  \*******************************************************/
/*! exports provided: SettingsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsComponent", function() { return SettingsComponent; });
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

var SettingsComponent = /** @class */ (function () {
    function SettingsComponent() {
    }
    SettingsComponent.prototype.ngOnInit = function () {
    };
    SettingsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-settings',
            template: __webpack_require__(/*! ./settings.component.html */ "./src/app/layout/settings/settings.component.html"),
            styles: [__webpack_require__(/*! ./settings.component.css */ "./src/app/layout/settings/settings.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], SettingsComponent);
    return SettingsComponent;
}());



/***/ }),

/***/ "./src/app/layout/settings/settings.module.ts":
/*!****************************************************!*\
  !*** ./src/app/layout/settings/settings.module.ts ***!
  \****************************************************/
/*! exports provided: SettingsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsModule", function() { return SettingsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/index.js");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");
/* harmony import */ var ng2_tel_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng2-tel-input */ "./node_modules/ng2-tel-input/ng2-tel-input.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _location_location_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./location/location.component */ "./src/app/layout/settings/location/location.component.ts");
/* harmony import */ var _settings_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./settings.component */ "./src/app/layout/settings/settings.component.ts");
/* harmony import */ var _locality_locality_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./locality/locality.component */ "./src/app/layout/settings/locality/locality.component.ts");
/* harmony import */ var _property_property_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./property/property.component */ "./src/app/layout/settings/property/property.component.ts");
/* harmony import */ var _project_project_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./project/project.component */ "./src/app/layout/settings/project/project.component.ts");
/* harmony import */ var _edit_profile_edit_profile_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./edit-profile/edit-profile.component */ "./src/app/layout/settings/edit-profile/edit-profile.component.ts");
/* harmony import */ var _documents_documents_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./documents/documents.component */ "./src/app/layout/settings/documents/documents.component.ts");
/* harmony import */ var _guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../guards/acl-user.guard */ "./src/app/guards/acl-user.guard.ts");
/* harmony import */ var _profile_profile_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./profile/profile.component */ "./src/app/layout/settings/profile/profile.component.ts");
/* harmony import */ var _change_password_change_password_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./change-password/change-password.component */ "./src/app/layout/settings/change-password/change-password.component.ts");
/* harmony import */ var _default_settings_default_settings_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./default-settings/default-settings.component */ "./src/app/layout/settings/default-settings/default-settings.component.ts");
/* harmony import */ var src_app_directives_match_value_directive__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! src/app/directives/match-value.directive */ "./src/app/directives/match-value.directive.ts");
/* harmony import */ var src_app_modules_shared_module__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! src/app/modules/shared.module */ "./src/app/modules/shared.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// third party libraries









// components













var routes = [
    { path: 'view-profile', component: _profile_profile_component__WEBPACK_IMPORTED_MODULE_17__["ProfileComponent"] },
    { path: 'change-password', component: _change_password_change_password_component__WEBPACK_IMPORTED_MODULE_18__["ChangePasswordComponent"] },
    {
        path: 'default-settings', component: _default_settings_default_settings_component__WEBPACK_IMPORTED_MODULE_19__["DefaultSettingsComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_16__["AclUserGuard"]], data: { roles: ['Settings', 'can_read', ''] }
    },
    { path: 'edit-profile', component: _edit_profile_edit_profile_component__WEBPACK_IMPORTED_MODULE_14__["EditProfileComponent"] },
    {
        path: 'setting-location', component: _location_location_component__WEBPACK_IMPORTED_MODULE_9__["LocationComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_16__["AclUserGuard"]], data: { roles: ['Settings', 'can_read', ''] }
    },
    {
        path: 'setting-locality', component: _locality_locality_component__WEBPACK_IMPORTED_MODULE_11__["LocalityComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_16__["AclUserGuard"]], data: { roles: ['Settings', 'can_read', ''] }
    },
    {
        path: 'setting-property', component: _property_property_component__WEBPACK_IMPORTED_MODULE_12__["PropertyComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_16__["AclUserGuard"]], data: { roles: ['Settings', 'can_read', ''] }
    },
    {
        path: 'setting-project', component: _project_project_component__WEBPACK_IMPORTED_MODULE_13__["ProjectComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_16__["AclUserGuard"]], data: { roles: ['Settings', 'can_read', ''] }
    },
    {
        path: 'documents-listing', component: _documents_documents_component__WEBPACK_IMPORTED_MODULE_15__["DocumentsComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_16__["AclUserGuard"]], data: { roles: ['Settings', 'can_read', ''] }
    }
];
var SettingsModule = /** @class */ (function () {
    function SettingsModule() {
    }
    SettingsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [
                _edit_profile_edit_profile_component__WEBPACK_IMPORTED_MODULE_14__["EditProfileComponent"],
                _location_location_component__WEBPACK_IMPORTED_MODULE_9__["LocationComponent"],
                _locality_locality_component__WEBPACK_IMPORTED_MODULE_11__["LocalityComponent"],
                _property_property_component__WEBPACK_IMPORTED_MODULE_12__["PropertyComponent"],
                _project_project_component__WEBPACK_IMPORTED_MODULE_13__["ProjectComponent"],
                _settings_component__WEBPACK_IMPORTED_MODULE_10__["SettingsComponent"],
                _documents_documents_component__WEBPACK_IMPORTED_MODULE_15__["DocumentsComponent"],
                _profile_profile_component__WEBPACK_IMPORTED_MODULE_17__["ProfileComponent"],
                _change_password_change_password_component__WEBPACK_IMPORTED_MODULE_18__["ChangePasswordComponent"],
                _default_settings_default_settings_component__WEBPACK_IMPORTED_MODULE_19__["DefaultSettingsComponent"],
                src_app_directives_match_value_directive__WEBPACK_IMPORTED_MODULE_20__["MatchValueDirective"]
            ],
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_8__["RouterModule"].forChild(routes),
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_5__["ModalModule"].forRoot(),
                ngx_spinner__WEBPACK_IMPORTED_MODULE_4__["NgxSpinnerModule"],
                _agm_core__WEBPACK_IMPORTED_MODULE_6__["AgmCoreModule"].forRoot({
                    apiKey: 'AIzaSyDykCJGMqHIwJluSmSiqKTJBVN2KauM_uQ',
                    libraries: ['drawing', 'places']
                }),
                ng2_tel_input__WEBPACK_IMPORTED_MODULE_7__["Ng2TelInputModule"],
                src_app_modules_shared_module__WEBPACK_IMPORTED_MODULE_21__["SharedModule"]
            ],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_8__["RouterModule"]]
        })
    ], SettingsModule);
    return SettingsModule;
}());



/***/ }),

/***/ "./src/app/models/locality.model.ts":
/*!******************************************!*\
  !*** ./src/app/models/locality.model.ts ***!
  \******************************************/
/*! exports provided: Locality */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Locality", function() { return Locality; });
var Locality = /** @class */ (function () {
    function Locality() {
    }
    return Locality;
}());



/***/ }),

/***/ "./src/app/models/location.model.ts":
/*!******************************************!*\
  !*** ./src/app/models/location.model.ts ***!
  \******************************************/
/*! exports provided: Location, Country, State, City */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Location", function() { return Location; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Country", function() { return Country; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "State", function() { return State; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "City", function() { return City; });
var Location = /** @class */ (function () {
    function Location() {
        this.countryModel = {
            country_id: '',
            name_es: '',
            name_en: '',
            status: 0
        };
        this.stateModel = {
            country_id: '',
            state_id: '',
            name_es: '',
            name_en: '',
            status: 0
        };
        this.cityModel = {
            country_id: '',
            state_id: '',
            city_id: '',
            name_es: '',
            name_en: '',
            status: 0
        };
        this.localityModel = {
            city_id: '',
            locality_id: '',
            name_es: '',
            name_en: '',
            status: 0,
            poly_coordinates: []
        };
    }
    return Location;
}());

var Country = /** @class */ (function () {
    function Country() {
    }
    return Country;
}());

var State = /** @class */ (function () {
    function State() {
    }
    return State;
}());

var City = /** @class */ (function () {
    function City() {
    }
    return City;
}());



/***/ }),

/***/ "./src/app/models/project.model.ts":
/*!*****************************************!*\
  !*** ./src/app/models/project.model.ts ***!
  \*****************************************/
/*! exports provided: Project, Amenities */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Project", function() { return Project; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Amenities", function() { return Amenities; });
var Project = /** @class */ (function () {
    function Project() {
        this.possession = {
            id: '',
            name_es: '',
            name_en: '',
            status: 0
        };
        this.type = {
            id: '',
            name_es: '',
            name_en: '',
            status: 0
        };
        this.amenities = {
            id: '',
            icon: '',
            name_es: '',
            name_en: '',
            status: 0
        };
    }
    return Project;
}());

var Amenities = /** @class */ (function () {
    function Amenities() {
    }
    return Amenities;
}());



/***/ }),

/***/ "./src/app/models/property.model.ts":
/*!******************************************!*\
  !*** ./src/app/models/property.model.ts ***!
  \******************************************/
/*! exports provided: Property */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Property", function() { return Property; });
var Property = /** @class */ (function () {
    function Property() {
        this.configuration = {
            id: '',
            name_es: '',
            name_en: '',
            bedroom: 0,
            bathroom: 0,
            half_bathroom: 0,
            status: 0
        };
        this.type = {
            id: '',
            name_es: '',
            name_en: '',
            status: 0
        };
        this.amenities = {
            id: '',
            icon: '',
            name_es: '',
            name_en: '',
            status: 0
        };
    }
    return Property;
}());



/***/ }),

/***/ "./src/app/models/settings.model.ts":
/*!******************************************!*\
  !*** ./src/app/models/settings.model.ts ***!
  \******************************************/
/*! exports provided: Settings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Settings", function() { return Settings; });
var Settings = /** @class */ (function () {
    function Settings() {
    }
    return Settings;
}());



/***/ })

}]);
//# sourceMappingURL=settings-settings-module.js.map