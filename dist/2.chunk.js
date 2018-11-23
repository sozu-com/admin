webpackJsonp([2],{

/***/ "../../../../../src/app/layout/settings/change-password/change-password.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/settings/change-password/change-password.component.html":
/***/ (function(module, exports) {

module.exports = "\n<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<!--content start-->\n<div class=\"container-fluid\">\n    <div class=\"breadcrumb-group\">\n    <h5>Settings</h5>\n    <nav class=\"breadcrumb\">\n        <a class=\"breadcrumb-item\">Home</a>\n        <a class=\"breadcrumb-item\">Settings</a>\n        <span class=\"breadcrumb-item active\">Edit Profile</span>\n    </nav>\n    </div>\n\n    <form class=\"form-horizontal\" novalidate #addForm=\"ngForm\" (ngSubmit)=\"changePassword(addForm)\">\n        \n        <div class=\"form-group-3 row\">\n            <label class=\"col-sm-3 col-form-label\">New Password:</label>\n\n            <div class=\"col-sm-9\">\n                <input autocomplete=\"off\" type=\"password\" class=\"form-control\" placeholder=\"New Password\" minlength=\"6\" id=\"password\" required [(ngModel)]=\"model.password\" name=\"password\" #password=\"ngModel\">\n<!-- \n                <div *ngIf=\"password.errors && (password.dirty || password.touched)\" class=\"show-error\">\n                    <div [hidden]=\"!password.errors.required\">\n                        Old Password is required!\n                    </div>\n                    <div [hidden]=\"!password.errors.minlength\">\n                        Old Password's length must be at least {{6-model.password.length}}.\n                    </div>\n                </div> -->\n            </div>\n        </div>\n\n        <div class=\"form-group-3 row\">\n            <label class=\"col-sm-3 col-form-label\">Confirm Password:</label>\n            <div class=\"col-sm-9\">\n                <input type=\"password\" class=\"form-control\" placeholder=\"Confirm Password\" minlength=\"6\" id=\"c_password\" required [(ngModel)]=\"model.c_password\" name=\"c_password\" #c_password=\"ngModel\">\n\n                <!-- <div *ngIf=\"c_password.errors && (c_password.dirty || c_password.touched)\" class=\"show-error\">\n                    <div [hidden]=\"!c_password.errors.required\">\n                        New Password is required!\n                    </div>\n                    <div [hidden]=\"!c_password.errors.minlength\">\n                        New Password's length must be at least {{6-model.c_password.length}}.\n                    </div>\n                </div> -->\n            </div>\n        </div>\n        <div class=\"form-group btn-cont text-right\">\n            <button [disabled]=\"parameter.loading\" class=\"btn btn-primary apply-btn\" type=\"submit\">Update Settings</button>\n        </div>\n    </form>\n</div>\n      "

/***/ }),

/***/ "../../../../../src/app/layout/settings/change-password/change-password.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChangePasswordComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ChangePasswordComponent = /** @class */ (function () {
    function ChangePasswordComponent(router, admin) {
        this.router = router;
        this.admin = admin;
        this.parameter = {};
        this.model = {
            password: '',
            c_password: ''
        };
    }
    ChangePasswordComponent.prototype.ngOnInit = function () { };
    ChangePasswordComponent.prototype.changePassword = function (formData) {
        var _this = this;
        this.parameter.loading = true;
        this.admin.postDataApi('changePassword', this.model)
            .subscribe(function (success) {
            _this.parameter.loading = false;
            swal('Success', 'Password is changed successfully!', 'success');
            localStorage.removeItem('token');
            _this.router.navigate(['']);
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    var _a, _b;
    ChangePasswordComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-change-password',
            template: __webpack_require__("../../../../../src/app/layout/settings/change-password/change-password.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/settings/change-password/change-password.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" ? _a : Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */]) === "function" ? _b : Object])
    ], ChangePasswordComponent);
    return ChangePasswordComponent;
}());

//# sourceMappingURL=change-password.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/settings/default-settings/default-settings.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/settings/default-settings/default-settings.component.html":
/***/ (function(module, exports) {

module.exports = "\n<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<!--content start-->\n<div class=\"container-fluid\">\n    <div class=\"breadcrumb-group\">\n    <h5>Settings</h5>\n    <nav class=\"breadcrumb\">\n        <a class=\"breadcrumb-item\">Home</a>\n        <a class=\"breadcrumb-item\">Settings</a>\n        <span class=\"breadcrumb-item active\">Default Settings</span>\n    </nav>\n    </div>\n\n    <form class=\"form-horizontal\" novalidate #addForm=\"ngForm\" (ngSubmit)=\"updateGlobalSetting()\">\n        \n        <div class=\"form-group-3 row\">\n            <label class=\"col-sm-6 col-form-label\">By default, added property will be marked approved:</label>\n            <div class=\"col-sm-6\">\n                <div class=\"clearfix\"></div>\n                <label class=\"cust-radio\">\n                  <input type=\"radio\" (change)=\"setValue('bulk_approve_property', 1)\" value=\"1\" [checked]=\"model.bulk_approve_property == 1 ? 'checked' : ''\" name=\"bulk_approve_property\">\n                  <span class=\"checkmark\">Yes</span>\n                </label>\n                <label class=\"cust-radio\">\n                  <input type=\"radio\" (change)=\"setValue('bulk_approve_property', 0)\" value=\"0\" [checked]=\"model.bulk_approve_property == 0 ? 'checked' : ''\" name=\"bulk_approve_property\">\n                  <span class=\"checkmark\">No</span>\n                </label>\n                <div class=\"clearfix\"></div>\n            </div>\n        </div>\n\n        <div class=\"form-group-3 row\">\n            <label class=\"col-sm-6 col-form-label\">By default, added project will be marked approved:</label>\n            <div class=\"col-sm-6\">\n                <div class=\"clearfix\"></div>\n                <label class=\"cust-radio\">\n                  <input type=\"radio\" (change)=\"setValue('bulk_approve_project', 1)\" value=\"1\" [checked]=\"model.bulk_approve_project == 1 ? 'checked' : ''\" name=\"bulk_approve_project\">\n                  <span class=\"checkmark\">Yes</span>\n                </label>\n                <label class=\"cust-radio\">\n                  <input type=\"radio\" (change)=\"setValue('bulk_approve_project', 0)\" value=\"0\" [checked]=\"model.bulk_approve_project == 0 ? 'checked' : ''\" name=\"bulk_approve_project\">\n                  <span class=\"checkmark\">No</span>\n                </label>\n                <div class=\"clearfix\"></div>\n            </div>\n        </div>\n        <div class=\"form-group btn-cont text-right\">\n            <button [disabled]=\"parameter.loading\" class=\"btn btn-primary apply-btn\" type=\"submit\">Update Settings</button>\n        </div>\n    </form>\n</div>\n      "

/***/ }),

/***/ "../../../../../src/app/layout/settings/default-settings/default-settings.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_settings_model__ = __webpack_require__("../../../../../src/app/models/settings.model.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DefaultSettingsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DefaultSettingsComponent = /** @class */ (function () {
    function DefaultSettingsComponent(admin, model) {
        this.admin = admin;
        this.model = model;
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
            _this.parameter.loading = false;
            _this.model = success.data;
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    DefaultSettingsComponent.prototype.updateGlobalSetting = function () {
        var _this = this;
        this.parameter.loading = true;
        this.admin.postDataApi('updateGlobalSetting', this.model)
            .subscribe(function (success) {
            _this.parameter.loading = false;
            swal('Success', 'Details updated successfully!', 'success');
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    var _a, _b;
    DefaultSettingsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-default-settings',
            template: __webpack_require__("../../../../../src/app/layout/settings/default-settings/default-settings.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/settings/default-settings/default-settings.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_2__models_settings_model__["a" /* Settings */]]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" ? _a : Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__models_settings_model__["a" /* Settings */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__models_settings_model__["a" /* Settings */]) === "function" ? _b : Object])
    ], DefaultSettingsComponent);
    return DefaultSettingsComponent;
}());

//# sourceMappingURL=default-settings.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/settings/documents/documents.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/settings/documents/documents.component.html":
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<div class=\"container-fluid\">\n    <div class=\"breadcrumb-group\">\n        <h5>Settings</h5>\n        <nav class=\"breadcrumb\">\n            <a class=\"breadcrumb-item\">Home</a>\n            <!-- <a class=\"breadcrumb-item\" routerLink=\"/dashboard\">Home</a> -->\n          <a class=\"breadcrumb-item\">Settings</a>\n          <span class=\"breadcrumb-item active\">Documents Listing</span>\n        </nav>\n    </div>\n    <div class=\"white-bg\">\n        <div class=\"page-title\">\n          <h3>Documents</h3>\n        </div>\n  \n        <div class=\"form-outer\">\n            <div class=\"inline-form-group\">\n               <div class=\"row\">\n                  <div class=\"col-md-4\">\n                      <label><strong>Document Name</strong></label>\n                  </div>\n                  <div class=\"col-md-8\" *ngIf=\"admin?.admin_acl['Settings']?.can_create==1\">\n                     <form role=\"form\" novalidate #addForm1=\"ngForm\" (ngSubmit)=\"checkIfSpanishNameEntered(addForm1, '', addForm1.value.name_en, addForm1.value.name_es, 1, 'add');\">\n                        <div class=\"row\">\n                          <div class=\"col-lg-6 col-md-6\">\n                            <input type=\"text\" class=\"form-control\" placeholder=\"Name (English)\" id=\"name_en\" required [(ngModel)]=\"model.name_en\" name=\"name_en\">\n                          </div>\n                          <div class=\"col-lg-6 col-md-6\">\n                              <input type=\"text\" class=\"form-control\" placeholder=\"Name (Spanish)\" [(ngModel)]=\"model.name_es\" name=\"name_es\">\n                          </div>\n                        </div>\n                      <button [disabled]=\"admin?.admin_acl['Settings']?.can_create==0 || addForm1.invalid\" type=\"submit\" class=\"add-btn btn\">\n                         <img src=\"./../../../../assets/img/add.png\" alt=\"img\">\n                       </button>\n                     </form>\n                  </div>\n               </div>\n            </div>\n        </div>\n  \n        <div class=\"tabel-section padding40 paddingT0\">\n            <div class=\"table-responsive\">\n              <table class=\"table table-striped\">\n                  <tr>\n                    <th style=\"width:40%; text-align:left;\">Name (English)</th>\n                    <th style=\"width:40%; text-align:left;\">Name (Spanish)</th>\n                    <!-- <th style=\"width:20%\">Action</th> -->\n                  </tr>\n                  <tr *ngFor=\"let item of parameter.items\">\n                    <td class=\"text-left\">\n                      {{item.name_en}}\n                    </td>\n                    <td class=\"text-left\">\n                      {{item.name_es}}\n                    </td>\n                  </tr>\n  \n                  <div *ngIf=\"parameter.total == 0\">\n                    <p class=\"show-error\">\n                      {{constant.errorMsg.NO_POSSESSION_FOUND}}\n                    </p>\n                  </div>\n              </table>\n            </div>\n        </div>\n  \n    </div>\n  </div>\n  "

/***/ }),

/***/ "../../../../../src/app/layout/settings/documents/documents.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal__ = __webpack_require__("../../../../ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_document_model__ = __webpack_require__("../../../../../src/app/models/document.model.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DocumentsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DocumentsComponent = /** @class */ (function () {
    function DocumentsComponent(constant, modalService, admin, model) {
        this.constant = constant;
        this.modalService = modalService;
        this.admin = admin;
        this.model = model;
        this.parameter = {};
    }
    DocumentsComponent.prototype.ngOnInit = function () {
        this.getDocumentOptions();
    };
    DocumentsComponent.prototype.closeModal = function () {
        // this.amenityModel = new Amenities;
        this.modalRef.hide();
    };
    // public openPossessionStatusModal(template: TemplateRef<any>, id, name_en, name_es, status) {
    //   this.project.possession.id = id;
    //   this.project.possession.name_en = name_en;
    //   this.project.possession.name_es = name_es == null ? name_en : name_es;
    //   this.project.possession.status = status;
    //   this.modalRef = this.modalService.show(template);
    // }
    DocumentsComponent.prototype.addDocumentOptions = function (id, name_en, name_es, status, type) {
        var _this = this;
        if (type !== 'add') {
            this.modalRef.hide();
        }
        // this.parameter.loading = true;
        this.parameter.url = 'addDocumentOptions';
        var input = new FormData();
        input.append('name_en', name_en);
        input.append('name_es', name_es);
        input.append('status', status);
        if (id) {
            input.append('id', id);
        }
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.model = new __WEBPACK_IMPORTED_MODULE_4__models_document_model__["a" /* Document */]();
            // console.log('addDocumentOptions', success);
            var text = id ?
                _this.constant.successMsg.DOCUMENT_NAME_UPDATED_SUCCESSFULLY :
                _this.constant.successMsg.DOCUMENT_NAME_ADDED_SUCCESSFULLY;
            swal('Success', text, 'success');
            _this.parameter.items.push(success.data);
        });
    };
    DocumentsComponent.prototype.getDocumentOptions = function () {
        var _this = this;
        this.parameter.url = 'getDocumentOptions';
        this.parameter.loading = true;
        this.admin.postDataApi(this.parameter.url, {})
            .subscribe(function (success) {
            _this.parameter.loading = false;
            // console.log('getDocumentOptions', success);
            _this.parameter.items = success.data;
            _this.parameter.total = success.data.length;
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    DocumentsComponent.prototype.addPossessionStatusPopup = function (id, name_en, name_es, status, type) {
        var _this = this;
        var text = status === 1 ? this.constant.title.UNBLOCK_PROJECT_POSSESSION : this.constant.title.BLOCK_PROJECT_POSSESSION;
        swal({
            // title: this.constant.title.ARE_YOU_SURE,
            // text: status === 1 ? this.constant.title.UNBLOCK_PROJECT_POSSESSION : this.constant.title.BLOCK_PROJECT_POSSESSION,
            html: this.constant.title.ARE_YOU_SURE + '<br>' + text,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.addDocumentOptions(id, name_en, name_es, status, type);
            }
        });
    };
    DocumentsComponent.prototype.checkIfSpanishNameEntered = function (formdata, id, name_en, name_es, status, type) {
        var _this = this;
        // console.log('id, name_en, name_es, status, type', id, name_en, name_es, status, type);
        formdata.reset();
        var self = this;
        if (name_es === undefined) {
            swal({
                text: this.constant.errorMsg.SAVE_ENGLISH_DOCUMENT_NAME,
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
    var _a, _b, _c, _d;
    DocumentsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-documents',
            template: __webpack_require__("../../../../../src/app/layout/settings/documents/documents.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/settings/documents/documents.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_3__common_constants__["a" /* Constant */], __WEBPACK_IMPORTED_MODULE_4__models_document_model__["a" /* Document */]]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__common_constants__["a" /* Constant */]) === "function" ? _a : Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal__["b" /* BsModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal__["b" /* BsModalService */]) === "function" ? _b : Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" ? _c : Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__models_document_model__["a" /* Document */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__models_document_model__["a" /* Document */]) === "function" ? _d : Object])
    ], DocumentsComponent);
    return DocumentsComponent;
}());

//# sourceMappingURL=documents.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/settings/edit-profile/edit-profile.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/settings/edit-profile/edit-profile.component.html":
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<!--content start-->\n<div class=\"container-fluid\">\n    <div class=\"breadcrumb-group\">\n      <h5>Settings</h5>\n      <nav class=\"breadcrumb\">\n          <a class=\"breadcrumb-item\">Home</a>\n          <!-- <a class=\"breadcrumb-item\" routerLink=\"/dashboard\">Home</a> -->\n          <a class=\"breadcrumb-item\">Settings</a>\n          <span class=\"breadcrumb-item active\">Edit Profile</span>\n      </nav>\n    </div>\n\n    <form class=\"form-horizontal\" novalidate #addForm=\"ngForm\" (ngSubmit)=\"updateProfile(addForm)\">\n        \n        <div class=\"form-group row\">\n            <label class=\"col-sm-2 col-form-label\">Image:</label>\n            <div class=\"col-sm-10\">\n                <input required accept=\"image/*\" class=\"image\" (change)=\"changeListner($event)\" type=\"file\">\n            </div>\n          </div>\n            <div class=\"form-group row\">\n              <label class=\"col-sm-2 col-form-label\">Name:</label>\n              <div class=\"col-sm-10\">\n  \n                  <input type=\"text\" class=\"form-control\" placeholder=\"Name\" id=\"name\" required minlength=\"1\" [(ngModel)]=\"model.name\" name=\"name\" #name=\"ngModel\">\n  \n                  <div *ngIf=\"name.errors && (name.dirty || name.touched)\" class=\"show-error\">\n                      <div [hidden]=\"!name.errors.required\">\n                          Name is required!\n                      </div>\n                      <div [hidden]=\"!name.errors.min\">\n                          Name must be at least 1.\n                      </div>\n                  </div>\n  \n              </div>\n            </div>\n              \n            <div class=\"form-group row\">\n              <label class=\"col-sm-2 col-form-label\">Contact Number:</label>\n              <div class=\"col-sm-10\">\n                <input type=\"text\" class=\"form-control\"\n                id=\"phone\" required minlength=\"1\" [(ngModel)]=\"model.phone\" \n                name=\"phone\" #phone=\"ngModel\"\nng2TelInput\n[ng2TelInputOptions]=\"initialCountry\"\n(countryChange)=\"onCountryChange($event)\" />\n\n\n                <div *ngIf=\"phone.errors && (phone.dirty || phone.touched)\" class=\"show-error\">\n                    <div [hidden]=\"!phone.errors.required\">\n                      Contact Phone Number is required!\n                    </div>\n                    <div [hidden]=\"!phone.errors.min\">\n                      Contact Phone Number must be at least 1.\n                    </div>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"form-group btn-cont text-right\">\n              <button [disabled]=\"parameter.loading\" class=\"btn btn-primary apply-btn\" type=\"submit\">Update Settings</button>\n            </div>\n      </form>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/layout/settings/edit-profile/edit-profile.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditProfileComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EditProfileComponent = /** @class */ (function () {
    function EditProfileComponent(element, admin) {
        this.element = element;
        this.admin = admin;
        this.parameter = {};
        this.model = {
            name: '',
            phone: '',
            image: ''
        };
    }
    EditProfileComponent.prototype.ngOnInit = function () { };
    EditProfileComponent.prototype.onCountryChange = function (e) {
        this.parameter.countryCode = e.iso2;
        this.parameter.dialCode = e.dialCode;
        this.initialCountry = { initialCountry: e.iso2 };
    };
    EditProfileComponent.prototype.changeListner = function (event) {
        var reader = new FileReader();
        var image = this.element.nativeElement.querySelector('.image');
        this.parameter.image = event.target.files[0];
        this.parameter.icon = this.parameter.image;
        reader.onload = function (e) {
            var src = e.target['result'];
            image.src = src;
        };
        reader.readAsDataURL(event.target.files[0]);
    };
    EditProfileComponent.prototype.updateProfile = function (formData) {
        var _this = this;
        this.parameter.url = 'updateProfile';
        var input = new FormData();
        input.append('name', formData.value.name);
        input.append('phone', formData.value.phone);
        // input.append("country_code", this.parameter.countryCode);
        input.append('image', this.parameter.image);
        this.parameter.loading = true;
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.parameter.loading = false;
            _this.admin.login.next(success.data);
            swal('Success', success.message, 'success');
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    var _a, _b;
    EditProfileComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-edit-profile',
            template: __webpack_require__("../../../../../src/app/layout/settings/edit-profile/edit-profile.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/settings/edit-profile/edit-profile.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _a : Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" ? _b : Object])
    ], EditProfileComponent);
    return EditProfileComponent;
}());

//# sourceMappingURL=edit-profile.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/settings/locality/locality.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".selectedRow{\n    background: rgb(228, 224, 224)\n}\n.locality-name{\n    cursor: pointer;\n}\n.form-model0P{\n    padding: 0px !important;\n}\n.model-body10P{\n    padding: 10px !important;\n}\n.my-modal-header{\n    display: inline;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/settings/locality/locality.component.html":
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<!--content start-->\n<div class=\"container-fluid\">\n  <div class=\"breadcrumb-group\">\n    <h5>Settings</h5>\n    <nav class=\"breadcrumb\">\n        <a class=\"breadcrumb-item\">Home</a>\n        <!-- <a class=\"breadcrumb-item\" routerLink=\"/dashboard\">Home</a> -->\n        <a class=\"breadcrumb-item\">Settings</a>\n        <span class=\"breadcrumb-item active\">Locality</span>\n    </nav>\n  </div>\n    \n  <div class=\"white-bg\">\n    <div class=\"page-title\">\n        <h3>Locality</h3>\n    </div>\n\n    <!-- add city -->\n    <div class=\"form-outer marginT15\">\n      <div class=\"inline-form-group\">\n        <div class=\"row\">\n          <div class=\"col-md-12\">\n            <label><strong>Add Locality</strong></label>\n            <hr>\n          </div>\n          <div class=\"col-lg-3 col-md-3 col-sm-6 col-6\">\n            <div class=\"form-group marginB0\">\n              <label>Country</label>\n              <select title=\"Choose Country\" class=\"form-control\" (change)=\"getStates($event.target.value, '')\">\n                <option value=\"\" disabled>Select Country</option>\n                <option *ngFor=\"let country of parameter.countries\" value=\"{{country.id}}\" [selected]=\"country.id == parameter.country_id\">{{country.name_en}}</option>\n              </select>\n            </div>\n          </div>\n          <div class=\"col-lg-3 col-md-3 col-sm-6 col-6\">\n            <div class=\"form-group marginB0\">\n              <label>State</label>\n              <select title=\"Choose State\" class=\"form-control\" (change)=\"getCities($event.target.value, '')\">\n                <option value=\"\" disabled>Select State</option>\n                <option *ngFor=\"let state of parameter.states\" value=\"{{state.id}}\" [selected]=\"state.id == parameter.state_id\">{{state.name_en}}</option>\n              </select>\n            </div>\n          </div>\n          <div class=\"col-lg-3 col-md-3 col-sm-6 col-6\">\n            <div class=\"form-group marginB0\">\n              <label>City</label>\n              <select title=\"Choose City\" class=\"form-control\" (change)=\"getLocalities($event.target.value)\">\n                <option value=\"\" disabled>Select City</option>\n                <option *ngFor=\"let city of parameter.cities\" value=\"{{city.id}}\" [selected]=\"city.id == parameter.city_id\">{{city.name_en}}</option>\n              </select>\n            </div>\n          </div>\n          <div class=\"col-lg-3 col-md-3 col-sm-6 col-6\">\n            <div class=\"form-group marginB0\">\n              <label>Search Locality</label>\n              <input required placeholder=\"Search Locality\" autocorrect=\"off\" autocapitalize=\"off\"\n                spellcheck=\"off\" type=\"text\" class=\"form-control\" style=\"padding: 8px 25px 8px 15px;\n                height: 40px !important;\" #searchLocality (input)=\"loadPlaces()\">\n            </div>\n          </div>\n        </div>\n      </div>\n  </div>\n  <hr>\n  \n  <div class=\"form-outer marginT15 padding40\">\n    <div class=\"row\">\n      <div class=\"col-md-4\">\n        <table class=\"table table-striped\">\n          <tr>\n            <th style=\"width:80%; text-align:left;\">\n                <div class=\"table-search\">\n                <input type=\"Search here\" style=\"height:32px;\" (input)=\"getLocalities(parameter.city_id, $event.target.value)\" name=\"\" placeholder=\"Search here\">\n                </div>\n            </th>\n            <th style=\"width:20%\">Action</th>\n          </tr>\n          <tr *ngFor=\"let locality of all_overlays; let index = index\" (click)=\"markLocalityFeatured(index, locality.id, locality.is_featured==1?0:1)\" title=\"{{locality.is_featured==1?'Click to unfeature.':'Click to feature.'}}\">\n            <td class=\"text-left locality-name\" [ngClass]=\"locality.id == selectedLocality ? 'selectedRow' : ''\" (click)=\"setSelection(locality.overlay, locality.id)\">\n              {{locality.name_en}}\n            </td>\n            <!-- <td>\n              <a (click)=\"upadteSelection(locality, index)\" title=\"Unblock State\" class=\"icon-block block-icon\"><img src=\"./../../../../assets/img/top-arrow.png\" alt=\"img\"></a>\n            </td> -->\n            <td [ngClass]=\"locality.id == selectedLocality ? 'selectedRow' : ''\">\n              <a *ngIf=\"locality.status == 0\" (click)=\"blockUnblockLocality(locality, index, 1)\" title=\"Unblock Locality\" class=\"icon-block block-icon unblock-bg\"><img src=\"./../../../../assets/img/block.png\" alt=\"img\"></a>\n              <a *ngIf=\"locality.status == 1\" (click)=\"blockUnblockLocality(locality, index, 0)\" title=\"Block Locality\" class=\"icon-block block-icon\"><img src=\"./../../../../assets/img/unblock.png\" alt=\"img\"></a>\n            </td>\n          </tr>\n        </table>\n\n        <div class=\"error-border\" [ngSwitch]=\"true\">\n          <p class=\"show-error\" *ngSwitchCase=\"parameter.states?.length == 0\">{{constant.errorMsg.NO_STATE_FOUND}}</p>\n          <p class=\"show-error\" *ngSwitchCase=\"parameter.states?.length != 0 && parameter.cities?.length == 0\">{{constant.errorMsg.NO_CITY_FOUND}}</p>\n          <p class=\"show-error\" *ngSwitchCase=\"parameter.states?.length != 0 && parameter.cities?.length != 0 && all_overlays?.length == 0\">{{constant.errorMsg.NO_LOCALITY_FOUND}}</p>\n        </div>\n\n        <!-- <div class=\"error-border\" *ngIf=\"parameter.states?.length == 0; else localityNotFound\">\n          <p class=\"show-error\">{{constant.errorMsg.NO_STATE_FOUND}}</p>\n        </div>\n        <ng-template #localityNotFound>\n          <div class=\"error-border\" *ngIf=\"parameter.cities?.length == 0\">\n            <p class=\"show-error\">{{constant.errorMsg.NO_LOCALITY_FOUND}}</p>\n          </div>\n          <ng-container *ngIf=\"bar === 99; else elseif2\">bar === 99</ng-container>\n        </ng-template> -->\n        <!-- <div class=\"error-border\" *ngIf=\"all_overlays?.length == 0\">\n          <p class=\"show-error\">{{constant.errorMsg.NO_LOCALITY_FOUND}}</p>\n        </div> -->\n\n\n      </div>\n\n      <!-- google map -->\n      <div class=\"col-md-8\">\n        <div id=\"mapDiv\" style=\"height: 500px; width: 100%;\" #mapDiv></div>\n      </div>\n\n    </div>\n  </div>\n\n  </div>\n</div>\n<!--content end-->\n\n\n<!-- Trigger the modal with a button -->\n<button type=\"button\" style=\"display: none;\" class=\"btn btn-info\" data-toggle=\"modal\" data-target=\"#myModal\" #localityOpen>Open Modal</button>\n\n<!-- Modal -->\n<div id=\"myModal\" class=\"modal fade\" role=\"dialog\">\n  <div class=\"modal-dialog\">\n\n    <!-- Modal content-->\n    <div class=\"modal-content\">\n      <div class=\"modal-header my-modal-header\">\n        <button type=\"button\" class=\"close\" (click)=\"closeModal()\">&times;</button>\n        <h4 class=\"modal-title\">Add Locality Details</h4>\n      </div>\n      <form class=\"form-horizontal form-model0P\" role=\"form\" novalidate #addForm=\"ngForm\" (ngSubmit)=\"checkIfLocalitySpanishNameEntered(addForm.value.name_en, addForm.value.name_es, addForm.value.price_per_sqft)\">\n        <div class=\"modal-body model-body10P\">\n          <div class=\"form-group\">\n            <input type=\"text\" class=\"form-control\" placeholder=\"Locality name (English)\" id=\"name_en\" required [(ngModel)]=\"model.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n            <!-- <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-error\">\n                <div [hidden]=\"!name_en.errors.required\">\n                  {{constant.errorMsg.COUNTRY_NAME_REQUIRED}}\n                </div>\n            </div> -->\n          </div>\n          <div class=\"form-group\">\n            <input type=\"text\" name=\"name_es\" class=\"form-control\" placeholder=\"Locality name (Spanish)\" [(ngModel)]=\"model.name_es\">\n          </div>\n\n          <div class=\"form-group\">\n            <input type=\"text\" class=\"form-control\" min=\"1\" placeholder=\"Price per sqft\" id=\"price_per_sqft\" required [(ngModel)]=\"model.price_per_sqft\" name=\"price_per_sqft\" #price_per_sqft=\"ngModel\">\n            <!-- <div *ngIf=\"price_per_sqft.errors && (price_per_sqft.dirty || price_per_sqft.touched)\" class=\"show-error\">\n                <div [hidden]=\"!price_per_sqft.errors.required\">\n                  {{constant.errorMsg.PRICE_PER_SQFT_REQUIRED}}\n                </div>\n                <div [hidden]=\"!price_per_sqft.errors.min\">\n                  {{constant.errorMsg.PRICE_PER_SQFT_MIN}}\n                </div>\n            </div> -->\n          </div>\n\n        </div>\n        <div class=\"modal-footer\">\n          <button type=\"submit\" [disabled]=\"addForm.invalid\" class=\"btn btn-info\">Submit</button>\n          <button style=\"display:none;\" type=\"button\" class=\"btn btn-default\" #localityClose data-dismiss=\"modal\">Close</button>\n          <button type=\"button\" class=\"btn btn-default\" (click)=\"closeModal()\">Close</button>\n        </div>\n      </form>\n\n    </div>\n\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/layout/settings/locality/locality.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__agm_core__ = __webpack_require__("../../../../@agm/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_locality_model__ = __webpack_require__("../../../../../src/app/models/locality.model.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocalityComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LocalityComponent = /** @class */ (function () {
    function LocalityComponent(loader, admin, ngZone, constant, model) {
        this.loader = loader;
        this.admin = admin;
        this.ngZone = ngZone;
        this.constant = constant;
        this.model = model;
        this.parameter = {};
        this.all_overlays = [];
        this.showModal = true;
    }
    LocalityComponent.prototype.ngOnInit = function () {
        this.parameter.localities = [];
        this.getCountries('');
    };
    LocalityComponent.prototype.getCountries = function (keyword) {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'getCountries';
        var input = new FormData();
        if (keyword) {
            input.append('keyword', keyword);
        }
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.parameter.loading = false;
            _this.parameter.countries = success.data;
            if (_this.parameter.countries.length !== 0) {
                _this.parameter.country_id = _this.parameter.countries[0].id;
                _this.getStates(_this.parameter.countries[0].id, '');
            }
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    LocalityComponent.prototype.getStates = function (country_id, keyword) {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'country/getStates';
        this.parameter.country_id = country_id;
        var input = new FormData();
        input.append('country_id', country_id);
        if (keyword) {
            input.append('keyword', keyword);
        }
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            // console.log('states', success);
            _this.parameter.loading = false;
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
            _this.parameter.loading = false;
        });
    };
    LocalityComponent.prototype.getCities = function (state_id, keyword) {
        var _this = this;
        // console.log('mm', state_id, keyword);
        this.parameter.loading = true;
        this.parameter.url = 'getCities';
        this.parameter.state_id = state_id;
        var input = new FormData();
        input.append('state_id', state_id);
        if (keyword) {
            input.append('keyword', keyword);
        }
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            // console.log('cities', success);
            _this.parameter.loading = false;
            _this.parameter.cities = success.data;
            if (_this.parameter.cities.length) {
                _this.parameter.city_id = _this.parameter.cities[0].id;
                // console.log('cityid', this.parameter.city_id);
                _this.getGeoLocation(_this.parameter.cities[0].name_en);
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
            _this.parameter.loading = false;
        });
    };
    LocalityComponent.prototype.getLatLngFromAddress = function () {
        // https://maps.googleapis.com/maps/api/geocode/json?address=adress&key=YOUR_API_KEY
    };
    LocalityComponent.prototype.getLocalities = function (city_id, keyword) {
        var _this = this;
        if (keyword === void 0) { keyword = ''; }
        // console.log('mm', city_id, keyword);
        this.parameter.loading = true;
        this.parameter.url = 'getLocalities';
        this.parameter.city_id = city_id;
        var input = new FormData();
        input.append('city_id', city_id);
        if (keyword) {
            input.append('keyword', keyword);
        }
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            // console.log('Localities', success);
            _this.parameter.loading = false;
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
            _this.parameter.loading = false;
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
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        },
                        zoom: 18
                    });
                    _this.map = map;
                    var all_overlays_index = 0;
                    _this.all_overlays.forEach(function (locality) {
                        var poly_coordinates = JSON.parse(locality.poly_coordinates);
                        // console.log(poly_coordinates);
                        var polygon = poly_coordinates.map(function (ll) {
                            // console.log(ll);
                            var latlng = ll.split(',');
                            var coord = new google.maps.LatLng(parseFloat(latlng[0]), parseFloat(latlng[1]));
                            // console.log(coord);
                            return coord;
                        });
                        // this.setSelection(polygon);
                        var singlePolygon = new google.maps.Polygon({
                            paths: polygon,
                            editable: false,
                            strokeColor: '#FF0000',
                            strokeOpacity: 0.8,
                            strokeWeight: 2,
                            fillColor: '#FF0000',
                            fillOpacity: 0.35
                        });
                        locality.overlay = singlePolygon;
                        // showing selected first locality
                        if (all_overlays_index === 0) {
                            _this.setSelection(singlePolygon, locality.id);
                        }
                        all_overlays_index++;
                        // this.all_overlays.push(singlePolygon);
                        google.maps.event.addListener(singlePolygon, 'click', function () {
                            // console.log('click', singlePolygon, locality.id);
                            _this.setSelection(singlePolygon, locality.id);
                        });
                        // google.maps.event.addListener(singlePolygon, 'mouseup', function(muEvent) {
                        //         console.log('33')
                        //   this.setSelection(singlePolygon);
                        // });
                        singlePolygon.setMap(map);
                    });
                    google.maps.event.addListener(map, 'click', function (event) {
                        // console.log(event);
                        _this.placeMarker(event.latLng);
                        // console.log(event.latLng.toUrlValue(5));
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
                                console.log(event.getPath().getAt(i).toUrlValue(5));
                            }
                        });
                        google.maps.event.addListener(event.getPath(), 'set_at', function () {
                            var len = event.getPath().getLength();
                            for (var i = 0; i < len; i++) {
                                console.log(event.getPath().getAt(i).toUrlValue(5));
                            }
                        });
                    });
                    google.maps.event.addListener(drawingManager, 'overlaycomplete', function (event) {
                        _this.parameter.overlay = _this.getPolygonCoords(event.overlay);
                        _this.localityOpen.nativeElement.click();
                        console.log('xx', typeof _this.getPolygonCoords(event.overlay));
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
                        //   //console.log(locality);
                        //   //this.all_overlays.push(locality);
                        //   //this.all_overlays = this.all_overlays;
                        //   //this.all_overlays.splice(0,2);
                        //   //this.len = this.all_overlays.length;
                        //   console.log(this.all_overlays);
                        //   delete locality.overlay;
                        //   //console.log(locality);
                        //   this.admin.postDataApi('addLocality', locality).subscribe(
                        //       r => {
                        //         console.log(r);
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
    LocalityComponent.prototype.checkIfLocalitySpanishNameEntered = function (name_en, name_es, price_per_sqft) {
        var _this = this;
        var self = this;
        if (name_es === '') {
            swal({
                text: this.constant.errorMsg.SAVE_ENGLISH_COUNTRY_NAME,
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
        this.model = new __WEBPACK_IMPORTED_MODULE_4__models_locality_model__["a" /* Locality */]();
        this.localityClose.nativeElement.click();
    };
    LocalityComponent.prototype.addLocality = function (name_en, name_es, price_per_sqft) {
        var _this = this;
        // this.localityClose.nativeElement.click();
        var locality = {
            name_en: name_en,
            name_es: name_es,
            price_per_sqft: price_per_sqft,
            coordinates: this.parameter.overlay,
            poly_coordinates: JSON.stringify(this.parameter.overlay),
            status: '1',
            city_id: this.parameter.city_id,
            overlay: this.parameter.overlay
        };
        delete locality.overlay;
        this.admin.postDataApi('addLocality', locality).subscribe(function (r) {
            _this.all_overlays.push(r.data);
            _this.closeModal();
        });
    };
    LocalityComponent.prototype.getPolygonCoords = function (newShape) {
        // console.log('new', newShape);
        // console.log('IN');
        var coordinates_array = [];
        var len = newShape.getPath().getLength();
        for (var i = 0; i < len; i++) {
            // console.log(newShape.getPath().getAt(i).toUrlValue(6));
            coordinates_array.push(newShape.getPath().getAt(i).toUrlValue(6));
        }
        // console.log(coordinates_array);
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
        // console.log('zzzzzzzzzzzz', shape);
        this.clearSelection();
        this.selectedLocality = locality;
        this.selectedShape = shape;
        shape.setEditable(true);
        var coords = this.getPolygonCoords(shape);
        var latlng = coords[0].split(',');
        var coord = new google.maps.LatLng(parseFloat(latlng[0]), parseFloat(latlng[1]));
        // console.log(coords);
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
        // console.log(this.all_overlays);
        this.all_overlays.forEach(function (item, count) {
            // console.log('overlay' + count);
            _this.getPolygonCoords(item.overlay.overlay);
        });
    };
    LocalityComponent.prototype.blockUnblockLocality = function (locality, index, type) {
        var _this = this;
        this.parameter.index = index;
        this.parameter.title = this.constant.title.ARE_YOU_SURE;
        switch (type) {
            case 0:
                this.parameter.text = this.constant.title.BLOCK_LOCALITY;
                this.parameter.successText = this.constant.successMsg.BLOCKED_SUCCESSFULLY;
                break;
            case 1:
                this.parameter.text = this.constant.title.UNBLOCK_LOCALITY;
                this.parameter.successText = this.constant.successMsg.UNBLOCKED_SUCCESSFULLY;
                break;
        }
        swal({
            // title: this.parameter.title,
            // text: this.parameter.text,
            html: this.parameter.title + '<br>' + this.parameter.text,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.removeSelection(locality, index, type);
                swal('Success', _this.parameter.successText, 'success');
            }
        });
    };
    LocalityComponent.prototype.removeSelection = function (locality, index, status) {
        // console.log('Removing...', locality);
        locality.status = status;
        // this.all_overlays.splice(index,1);
        // locality.overlay.setMap(null);
        delete locality.overlay;
        this.admin.postDataApi('addLocality', locality).subscribe(function (r) {
            // console.log(r);
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
            title = 'You want to feature this locality?';
        }
        else {
            title = 'You want to unfeature this locality?';
        }
        swal({
            html: 'Are you sure' + '<br>' + title,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.admin.postDataApi('markLocalityFeatured', { locality_id: locality_id, flag: flag }).subscribe(function (r) {
                    _this.parameter.localities[index] = r.data;
                    swal('Success', _this.parameter.successText, 'success');
                });
            }
        });
    };
    LocalityComponent.prototype.getGeoLocation = function (address) {
        console.log('Getting address: ', address);
        // const geocoder = new google.maps.Geocode();
        this.loader.load().then(function () {
            console.log('--');
            // const geocoder = new google.maps.Geocode();
        });
        // return Observable.create(observer => {
        //     geocoder.geocode({
        //         'address': address
        //     }, (results, status) => {
        //         if (status == google.maps.GeocoderStatus.OK) {
        //           console.log('====');
        //           console.log('reposnee', results[0].geometry.location);
        //             observer.next(results[0].geometry.location);
        //             observer.complete();
        //         } else {
        //             console.log('Error: ', results, ' & Status: ', status);
        //             observer.error();
        //         }
        //     });
        // });
    };
    LocalityComponent.prototype.loadPlaces = function () {
        var _this = this;
        console.log('locality', this.searchElementRef.nativeElement);
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
                    console.log('place', place);
                    // verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    // set latitude, longitude and zoom
                    _this.latitude = place.geometry.location.lat();
                    _this.longitude = place.geometry.location.lng();
                    _this.zoom = 12;
                    if (place.formatted_address) {
                        console.log('==', place.formatted_address);
                    }
                    var map = new google.maps.Map(_this.mapDiv.nativeElement, {
                        center: {
                            lat: _this.latitude,
                            lng: _this.longitude
                        },
                        zoom: 18
                    });
                    _this.map = map;
                });
            });
        });
    };
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('searchLocality'),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _a : Object)
    ], LocalityComponent.prototype, "searchElementRef", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('localityOpen'),
        __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _b : Object)
    ], LocalityComponent.prototype, "localityOpen", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('localityClose'),
        __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _c : Object)
    ], LocalityComponent.prototype, "localityClose", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('mapDiv'),
        __metadata("design:type", typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _d : Object)
    ], LocalityComponent.prototype, "mapDiv", void 0);
    LocalityComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-locality',
            template: __webpack_require__("../../../../../src/app/layout/settings/locality/locality.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/settings/locality/locality.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_3__common_constants__["a" /* Constant */], __WEBPACK_IMPORTED_MODULE_4__models_locality_model__["a" /* Locality */]]
        }),
        __metadata("design:paramtypes", [typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__agm_core__["b" /* MapsAPILoader */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__agm_core__["b" /* MapsAPILoader */]) === "function" ? _e : Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" ? _f : Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]) === "function" ? _g : Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_3__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__common_constants__["a" /* Constant */]) === "function" ? _h : Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_4__models_locality_model__["a" /* Locality */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__models_locality_model__["a" /* Locality */]) === "function" ? _j : Object])
    ], LocalityComponent);
    return LocalityComponent;
}());

//# sourceMappingURL=locality.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/settings/location/location.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/settings/location/location.component.html":
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<!--content start-->\n<div class=\"container-fluid\">\n    <div class=\"breadcrumb-group\">\n      <h5>Settings</h5>\n      <nav class=\"breadcrumb\">\n          <a class=\"breadcrumb-item\">Home</a>\n          <!-- <a class=\"breadcrumb-item\" routerLink=\"/dashboard\">Home</a> -->\n          <a class=\"breadcrumb-item\">Settings</a>\n          <span class=\"breadcrumb-item active\">Location</span>\n      </nav>\n    </div>\n\n    <!-- <ngx-loading [show]=\"parameter.loading\"></ngx-loading> -->\n    \n    <div class=\"white-bg\">\n      <div class=\"page-title\">\n          <h3>Location</h3>\n      </div>\n\n      <!-- add country -->\n      <div class=\"form-outer\">\n          <div class=\"inline-form-group\">\n          <div class=\"row\">\n              <div class=\"col-md-12\">\n                <label><strong>Country</strong></label>\n              </div>\n              <!-- <div class=\"col-xl-3 col-sm-6 col-12 table-search searh-2\">\n                  <input type=\"text\" name=\"keyword\" [(ngModel)]=\"searchCountry\" (keyup.enter)=\"getCountries(searchCountry)\" placeholder=\"Search here\">\n                  <button (click)=\"getCountries(searchCountry)\"><i class=\"fa fa-search\"></i></button>\n              </div>\n              <div class=\"col-xl-9 col-sm-6 col-12\">\n                 <div class=\"form-group marginB0\">\n                    <div class=\"btn-cont text-right\">\n                        <a *ngIf=\"admin?.admin_acl['Settings']?.can_create==1\" class=\"btn btn-primary\" href=\"javascript://\" (click)=\"openCountryModal(addCountryModal, '', '', '', '1', -1)\">+ Add New</a>\n                    </div>\n                 </div>\n              </div> -->\n\n              <div class=\"col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6 table-search\">\n                  <div class=\"form-group marginB0\">\n                    <div class=\"searh-2\">\n                        <input type=\"text\" name=\"keyword\" [(ngModel)]=\"searchCountry\" (keyup.enter)=\"getCountries(searchCountry)\" placeholder=\"Search here\">\n                        <button (click)=\"getCountries(searchCountry)\"><i class=\"fa fa-search\"></i></button>\n                    </div>\n                  </div>\n                </div>\n              <div class=\"col-xl-9 col-lg-3 col-md-3 col-sm-6 col-6\">\n                 <div class=\"form-group marginB0\">\n                    <div class=\"btn-cont text-right\">\n                        <a *ngIf=\"admin?.admin_acl['Settings']?.can_create==1\" class=\"btn btn-primary\" href=\"javascript://\" (click)=\"openCountryModal(addCountryModal, '', '', '', '1', -1)\">+ Add New</a>\n                    </div>\n                 </div>\n              </div>\n           </div>\n           <hr>\n          </div>\n      </div>\n\n      <!-- list country -->\n      <div class=\"tabel-section padding40 paddingT0\">\n          <div class=\"table-responsive\">\n            <table class=\"table table-striped\">\n                <tr>\n                  <th style=\"width:40%; text-align:left;\">Country (English)</th>\n                  <th style=\"width:40%; text-align:left;\">Country (Spanish)</th>\n                  <th style=\"width:20%\">Action</th>\n                </tr>\n                <tr *ngFor=\"let country of parameter.countries; let c=index\">\n                  <td class=\"text-left\">\n                    {{country.name_en}}\n                  </td>\n                  <td class=\"text-left\">\n                    {{country.name_es}}\n                  </td>\n                  <td>\n                      <button title=\"Edit\" [disabled]=\"admin?.admin_acl['Settings']?.can_update==0\" \n                      (click)=\"openCountryModal(addCountryModal, country.id, country.name_en, country.name_es, country.status, c)\" class=\"action-icon\"><img src=\"./../../../../assets/img/edit.png\" alt=\"img\"></button>\n                    \n                      <!-- status = 1 means unblocked -->\n                      <button [disabled]=\"admin?.admin_acl['Settings']?.can_delete==0\"\n                        (click)=\"blockUnblockCountry(country.id, country.name_en, country.name_es, country.status==1?0:1, c)\" \n                        title=\"{{country.status==1?'Block':'Unblock'}}\" [ngClass]=\"{'unblock-bg':country.status==0}\"\n                        class=\"action-icon\"><img src=\"assets/img/block.png\" alt=\"img\">\n                      </button>\n                    <!-- <a title=\"Edit Country\" (click)=\"openCountryModal(addCountryModal, country.id, country.name_en, country.name_es, country.status, c)\" class=\"icon-block edit-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></a>\n                    <a *ngIf=\"country.status == 1\" (click)=\"blockUnblockCountry(country.id, country.name_en, country.name_es, 0, c)\" title=\"Block Country\" class=\"icon-block block-icon\"><img src=\"assets/img/unblock.png\" alt=\"img\"></a>\n                    <a *ngIf=\"country.status == 0\" (click)=\"blockUnblockCountry(country.id, country.name_en, country.name_es, 1, c)\" title=\"Unblock Country\" class=\"icon-block block-icon unblock-bg\"><img src=\"assets/img/block.png\" alt=\"img\"></a> -->\n                  </td>\n                </tr>\n            </table>\n\n            <div class=\"error-border\" *ngIf=\"parameter.countries?.length == 0\">\n              <p class=\"show-error\">\n                {{constant.errorMsg.NO_COUNTRY_FOUND}}\n              </p>\n            </div>\n          </div>\n      </div>\n\n      <!-- add state -->\n        <div class=\"form-outer marginT15\">\n          <div class=\"inline-form-group\">\n          <div class=\"row\">\n              <div class=\"col-md-12\">\n                <label><strong>State</strong></label>\n                <hr>\n              </div>\n              <div class=\"col-lg-3 col-md-3 col-sm-6 col-6\">\n                 <div class=\"form-group marginB0\">\n                    <label>Country</label>\n                    <select class=\"form-control\" (change)=\"getStatesWRTCountry($event.target.value, '')\">\n                      <!-- <option value=\"\" disabled>Select Country</option> -->\n                       <option *ngFor=\"let country of parameter.countries1\" value=\"{{country.id}}\">{{country.name_en}}</option>\n                    </select>\n                 </div>\n              </div>\n              <div class=\"col-lg-3 col-md-3 col-sm-6 col-6 table-search\">\n                <div class=\"form-group marginB0\">\n                  <label>Search</label>\n                  <div class=\"searh-2\">\n                      <input type=\"text\" [(ngModel)]=\"searchState\" (keyup.enter)=\"getStatesWRTCountry(parameter.country_id, searchState)\" name=\"keyword\" placeholder=\"Search here\">\n                      <button (click)=\"getStatesWRTCountry(parameter.country_id, searchState)\"><i class=\"fa fa-search\"></i></button>\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-lg-3 col-md-3 col-sm-6 col-6\"></div>\n              <div class=\"col-lg-3 col-md-3 col-sm-6 col-6\">\n                 <div class=\"form-group marginB0\">\n                    <label style=\"display: block;\">&nbsp;</label>\n                    <div class=\"btn-cont pull-right\">\n                        <a *ngIf=\"admin?.admin_acl['Settings']?.can_create==1\" class=\"btn btn-primary\" href=\"javascript://\" (click)=\"openStateModal(addStateModal, '', '', '', '', '1', -1)\">+ Add New</a>\n                    </div>\n                 </div>\n              </div>\n           </div>\n          </div>\n      </div>\n\n      <!-- list state -->\n      <div class=\"tabel-section padding40 paddingT0\">\n          <div class=\"table-responsive\">\n            <table class=\"table table-striped\">\n                <tr>\n                  <th style=\"width:40%; text-align:left;\">State (English)</th>\n                  <th style=\"width:40%; text-align:left;\">State (Spanish)</th>\n                  <th style=\"width:20%\">Action</th>\n                </tr>\n                <tr *ngFor=\"let state of parameter.states; let s = index\">\n                  <td class=\"text-left\">\n                    {{state.name_en}}\n                  </td>\n                  <td class=\"text-left\">\n                    {{state.name_es}}\n                  </td>\n                <td>\n                    <button title=\"Edit\" [disabled]=\"admin?.admin_acl['Settings']?.can_update==0\" \n                    (click)=\"openStateModal(addStateModal, state.country_id, state.id, state.name_en, state.name_es, state.status, s)\" class=\"action-icon\"><img src=\"./../../../../assets/img/edit.png\" alt=\"img\"></button>\n                  \n                    <!-- status = 1 means unblocked -->\n                    <button [disabled]=\"admin?.admin_acl['Settings']?.can_delete==0\"\n                      (click)=\"blockUnblockState(state.country_id, state.name_en, state.name_es, state.status==1?0:1, state.id, s)\" \n                      title=\"{{state.status==1?'Block':'Unblock'}}\" [ngClass]=\"{'unblock-bg':state.status==0}\"\n                      class=\"action-icon\"><img src=\"assets/img/block.png\" alt=\"img\">\n                    </button>\n                      <!-- <a href=\"javascript://\" (click)=\"openStateModal(addStateModal, state.country_id, state.id, state.name_en, state.name_es, state.status, s)\" title=\"Edit State\" class=\"icon-block edit-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></a>\n                      <a *ngIf=\"state.status == 1\" (click)=\"blockUnblockState(state.country_id, state.name_en, state.name_es, 0, state.id, s)\" title=\"Block State\" class=\"icon-block block-icon\"><img src=\"assets/img/unblock.png\" alt=\"img\"></a>\n                      <a *ngIf=\"state.status == 0\" (click)=\"blockUnblockState(state.country_id, state.name_en, state.name_es, 1, state.id, s)\" title=\"Unblock State\" class=\"icon-block block-icon unblock-bg\"><img src=\"assets/img/block.png\" alt=\"img\"></a> -->\n                  </td>\n                </tr>\n            </table>\n\n            <div class=\"error-border\" *ngIf=\"parameter.states?.length == 0\">\n              <p class=\"show-error\">\n                {{constant.errorMsg.NO_STATE_FOUND}}\n              </p>\n            </div>\n          </div>\n      </div>\n      \n\n      <!-- add city -->\n      <div class=\"form-outer marginT15\">\n        <div class=\"inline-form-group\">\n          <div class=\"row\">\n            <div class=\"col-md-12\">\n              <label><strong>City</strong></label>\n              <hr>\n            </div>\n            <div class=\"col-lg-3 col-md-3 col-sm-6 col-6\">\n               <div class=\"form-group marginB0\">\n                  <label>Country</label>\n                  <select class=\"form-control\" (change)=\"getStates($event.target.value, '')\">\n                    <!-- <option value=\"\" disabled>Select Country</option> -->\n                    <option *ngFor=\"let country of parameter.countries1\" value=\"{{country.id}}\">{{country.name_en}}</option>\n                 </select>\n               </div>\n            </div>\n            <div class=\"col-lg-3 col-md-3 col-sm-6 col-6\">\n               <div class=\"form-group marginB0\">\n                  <label>State</label>\n                  <select class=\"form-control\" (change)=\"getCities($event.target.value, '')\">\n                    <!-- <option value=\"\" disabled>Select State</option> -->\n                    <option *ngFor=\"let state of parameter.states1\" value=\"{{state.id}}\">{{state.name_en}}</option>\n                 </select>\n               </div>\n            </div>\n            <div class=\"col-lg-3 col-md-3 col-sm-6 col-6 table-search\">\n              <div class=\"form-group marginB0\">\n                <label>Search</label>\n                <div class=\"searh-2\">\n                    <input type=\"text\" [(ngModel)]=\"searchCity\" (keyup.enter)=\"getCities(parameter.state_id, searchCity)\" name=\"keyword\" placeholder=\"Search here\">\n                    <button (click)=\"getCities(parameter.state_id, searchCity)\"><i class=\"fa fa-search\"></i></button>\n                </div>\n              </div>\n            </div>\n            <div class=\"col-lg-3 col-md-3 col-sm-6 col-6\">\n               <div class=\"form-group marginB0\">\n                  <label style=\"display: block;\">&nbsp;</label>\n                  <div class=\"btn-cont pull-right\">\n                      <a *ngIf=\"admin?.admin_acl['Settings']?.can_create==1\" class=\"btn btn-primary\" href=\"javascript://\" (click)=\"openCityModal(addCityModal, '', '', '', '', '', 1, -1)\">+ Add New</a>\n                  </div>\n               </div>\n            </div>\n         </div>\n        </div>\n    </div>\n\n    <!-- list city -->\n    <div class=\"tabel-section padding40 paddingT0\">\n        <div class=\"table-responsive\">\n          <table class=\"table table-striped\">\n              <tr>\n                <th style=\"width:40%; text-align:left;\">City (English)</th>\n                <th style=\"width:40%; text-align:left;\">City (Spanish)</th>\n                <th style=\"width:20%\">Action</th>\n              </tr>\n              <tr *ngFor=\"let city of parameter.cities; let ci=index\">\n                <td class=\"text-left\">\n                  {{city.name_en}}\n                </td>\n                <td class=\"text-left\">\n                  {{city.name_es}}\n                </td>\n              <td>\n                  <button title=\"Edit\" [disabled]=\"admin?.admin_acl['Settings']?.can_update==0\" \n                  (click)=\"openCityModal(addCityModal, city.country_id, city.state_id, city.id, city.name_en, city.name_es, city.status, ci)\" class=\"action-icon\"><img src=\"./../../../../assets/img/edit.png\" alt=\"img\"></button>\n                \n                  <!-- status = 1 means unblocked -->\n                  <button [disabled]=\"admin?.admin_acl['Settings']?.can_delete==0\"\n                    (click)=\"blockUnblockCity(city.state_id, city.name_en, city.name_es, city.status==1?0:1, city.id, ci)\" \n                    title=\"{{city.status==1?'Block':'Unblock'}}\" [ngClass]=\"{'unblock-bg':city.status==0}\"\n                    class=\"action-icon\"><img src=\"assets/img/block.png\" alt=\"img\">\n                  </button>\n                  <!-- <a href=\"javascript://\" (click)=\"openCityModal(addCityModal, city.country_id, city.state_id, city.id, city.name_en, city.name_es, city.status, ci)\" title=\"Edit City\" class=\"icon-block edit-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></a>\n                  <a *ngIf=\"city.status == 1\" (click)=\"blockUnblockCity(city.state_id, city.name_en, city.name_es, 0, city.id, ci)\" title=\"Block City\" class=\"icon-block block-icon\"><img src=\"assets/img/unblock.png\" alt=\"img\"></a>\n                  <a *ngIf=\"city.status == 0\" (click)=\"blockUnblockCity(city.state_id, city.name_en, city.name_es, 1, city.id, ci)\" title=\"Unblock City\" class=\"icon-block block-icon unblock-bg\"><img src=\"assets/img/block.png\" alt=\"img\"></a> -->\n              </td>\n              </tr>\n          </table>\n\n          <div class=\"error-border\" *ngIf=\"parameter.states1?.length == 0; else cityNotFound\">\n            <p class=\"show-error\">\n              {{constant.errorMsg.NO_STATE_FOUND}}\n            </p>\n          </div>\n\n          <ng-template #cityNotFound>\n            <div class=\"error-border\" *ngIf=\"parameter.cities?.length == 0\">\n              <p class=\"show-error\">\n                {{constant.errorMsg.NO_CITY_FOUND}}\n              </p>\n            </div>\n          </ng-template>\n        </div>\n    </div>\n    \n    </div>\n</div>\n<!--content end-->\n\n\n<!-- add country modal -->\n<ng-template #addCountryModal>\n  <div class=\"modal-content\">\n    <div class=\"modal-header my-modal-header\">\n      <h4 class=\"modal-title\">Add Country</h4>\n      <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <form class=\"form-horizontal my-modal-form\" role=\"form\" novalidate #addForm=\"ngForm\" (ngSubmit)=\"checkIfCountrySpanishNameEntered(addForm.value.name_en, addForm.value.name_es)\">\n      <div class=\"modal-body my-modal-body\">\n        <div class=\"form-group\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"Country (English)\" id=\"name_en\" required [(ngModel)]=\"location.countryModel.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n          <!-- <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-error\">\n              <div [hidden]=\"!name_en.errors.required\">\n                {{constant.errorMsg.COUNTRY_NAME_REQUIRED}}\n              </div>\n          </div> -->\n        </div>\n        <div class=\"form-group\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"Country (Spanish)\" [(ngModel)]=\"location.countryModel.name_es\" name=\"name_es\">\n        </div>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"submit\" [disabled]=\"admin?.admin_acl['Settings']?.can_create==0 || addForm.invalid\" class=\"btn btn-info\">Submit</button>\n        <button type=\"button\" class=\"btn btn-default\" aria-label=\"Close\" (click)=\"modalRef.hide()\">Close</button>\n      </div>\n    </form>\n  </div>\n</ng-template>\n\n\n<!-- add state modal -->\n<ng-template #addStateModal>\n  <div class=\"modal-content\">\n    <div class=\"modal-header my-modal-header\">\n      <h4 class=\"modal-title\">Add State</h4>\n      <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <form class=\"form-horizontal my-modal-form\" role=\"form\" novalidate #addForm=\"ngForm\" (ngSubmit)=\"checkIfStateSpanishNameEntered(addForm.value.country_id, addForm.value.name_en, addForm.value.name_es)\">\n      <div class=\"modal-body my-modal-body\">\n        <div class=\"form-group\" *ngIf=\"location.stateModel.state_id == ''\">\n          <select title=\"Select Country\" id=\"country_id\" required [(ngModel)]=\"location.stateModel.country_id\" name=\"country_id\" #country_id=\"ngModel\" class=\"form-control\" required>\n            <option value=\"\" disabled>Select Country</option>\n            <option *ngFor=\"let c of parameter.countries1\" value=\"{{c.id}}\">{{c.name}}</option>\n          </select>\n          <!-- <div *ngIf=\"country_id.errors && (country_id.dirty || country_id.touched)\" class=\"show-error\">\n            <div [hidden]=\"!country_id.errors.required\">\n              {{constant.errorMsg.COUNTRY_NAME_REQUIRED}}\n            </div>\n          </div> -->\n        </div>\n        <div class=\"form-group\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"State (English)\" id=\"name_en\" required [(ngModel)]=\"location.stateModel.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n          <!-- <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-error\">\n              <div [hidden]=\"!name_en.errors.required\">\n                {{constant.errorMsg.STATE_NAME_REQUIRED}}\n              </div>\n          </div> -->\n        </div>\n        <div class=\"form-group\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"State (Spanish)\" [(ngModel)]=\"location.stateModel.name_es\" name=\"name_es\">\n        </div>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"submit\" [disabled]=\"admin?.admin_acl['Settings']?.can_create==0 || addForm.invalid\" class=\"btn btn-info\">Submit</button>\n        <button type=\"button\" class=\"btn btn-default\" aria-label=\"Close\" (click)=\"modalRef.hide()\">Close</button>\n      </div>\n    </form>\n  </div>\n</ng-template>\n\n\n<!-- add city modal -->\n<ng-template #addCityModal>\n  <div class=\"modal-content\">\n    <div class=\"modal-header my-modal-header\">\n      <h4 class=\"modal-title\">Add City</h4>\n      <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <form class=\"form-horizontal my-modal-form\" role=\"form\" novalidate #addForm=\"ngForm\" (ngSubmit)=\"checkIfCitySpanishNameEntered(addForm.value.state_id, addForm.value.name_en, addForm.value.name_es)\">\n      <div class=\"modal-body my-modal-body\">\n        <div class=\"form-group\" *ngIf=\"location.cityModel.city_id == ''\">\n          <select title=\"Select Country\" id=\"country_id\" (change)=\"getStatesForCity($event.target.value)\" required [(ngModel)]=\"location.cityModel.country_id\" name=\"country_id\" #country_id=\"ngModel\" class=\"form-control\" required>\n            <option value=\"\" disabled>Select Country</option>\n            <option *ngFor=\"let c of parameter.countries1\" value=\"{{c.id}}\">{{c.name}}</option>\n          </select>\n          <!-- <div *ngIf=\"country_id.errors && (country_id.dirty || country_id.touched)\" class=\"show-error\">\n            <div [hidden]=\"!country_id.errors.required\">\n              {{constant.errorMsg.COUNTRY_NAME_REQUIRED}}\n            </div>\n          </div> -->\n        </div>\n        <div class=\"form-group\" *ngIf=\"location.cityModel.city_id == ''\">\n          <select title=\"Select State\" id=\"state_id\" required [(ngModel)]=\"location.cityModel.state_id\" name=\"state_id\" #state_id=\"ngModel\" class=\"form-control\" required>\n            <option value=\"\" disabled>Select State</option>\n            <option *ngFor=\"let s of parameter.states2\" value=\"{{s.id}}\">{{s.name}}</option>\n          </select>\n          <!-- <div *ngIf=\"state_id.errors && (state_id.dirty || state_id.touched)\" class=\"show-error\">\n            <div [hidden]=\"!state_id.errors.required\">\n              {{constant.errorMsg.STATE_NAME_REQUIRED}}\n            </div>\n          </div> -->\n        </div>\n        <div class=\"form-group\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"City (English)\" id=\"name_en\" required [(ngModel)]=\"location.cityModel.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n          <!-- <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-error\">\n              <div [hidden]=\"!name_en.errors.required\">\n                {{constant.errorMsg.CITY_NAME_REQUIRED}}\n              </div>\n          </div> -->\n        </div>\n        <div class=\"form-group\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"City (Spanish)\" [(ngModel)]=\"location.cityModel.name_es\" name=\"name_es\">\n        </div>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"submit\" [disabled]=\"admin?.admin_acl['Settings']?.can_create==0 || addForm.invalid\" class=\"btn btn-info\">Submit</button>\n        <button type=\"button\" class=\"btn btn-default\" aria-label=\"Close\" (click)=\"modalRef.hide()\">Close</button>\n      </div>\n    </form>\n  </div>\n</ng-template>\n"

/***/ }),

/***/ "../../../../../src/app/layout/settings/location/location.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal__ = __webpack_require__("../../../../ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_location_model__ = __webpack_require__("../../../../../src/app/models/location.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocationComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LocationComponent = /** @class */ (function () {
    function LocationComponent(location, constant, modalService, admin) {
        this.location = location;
        this.constant = constant;
        this.modalService = modalService;
        this.admin = admin;
        this.parameter = {};
    }
    LocationComponent.prototype.ngOnInit = function () {
        this.searchCountry = '';
        this.searchState = '';
        this.searchCity = '';
        this.getCountries(this.searchCountry);
        this.getAllCountries(this.searchCountry);
        this.getAllCountriesForCities(this.searchCountry);
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
    // used for dropdown for states
    LocationComponent.prototype.getAllCountries = function (keyword) {
        var _this = this;
        this.parameter.url = 'getCountries';
        var input = new FormData();
        if (keyword) {
            input.append('keyword', keyword);
        }
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.parameter.countries1 = success.data;
            if (_this.parameter.countries1.length !== 0) {
                _this.parameter.country_id = _this.parameter.countries1[0].id;
                _this.getStatesWRTCountry(_this.parameter.countries1[0].id, '');
            }
        });
    };
    // used for dropdown for cities
    LocationComponent.prototype.getAllCountriesForCities = function (keyword) {
        var _this = this;
        this.parameter.url = 'getCountries';
        var input = new FormData();
        if (keyword) {
            input.append('keyword', keyword);
        }
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.parameter.countries2 = success.data;
            if (_this.parameter.countries2.length !== 0) {
                _this.parameter.country_id = _this.parameter.countries2[0].id;
                _this.getStates(_this.parameter.countries2[0].id, '');
            }
        });
    };
    // used for country listing and country search
    LocationComponent.prototype.getCountries = function (keyword) {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'getCountries';
        var input = new FormData();
        if (keyword) {
            input.append('keyword', keyword);
        }
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.parameter.loading = false;
            _this.parameter.countries = success.data;
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    // used on click of country -- city
    LocationComponent.prototype.getStates = function (country_id, keyword) {
        var _this = this;
        // this.parameter.loading = true;
        this.parameter.url = 'country/getStates';
        this.parameter.country_id = country_id;
        var input = new FormData();
        input.append('country_id', country_id);
        if (keyword) {
            input.append('keyword', keyword);
        }
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.parameter.states1 = success.data;
            if (_this.parameter.states1.length !== 0) {
                _this.parameter.state_id = _this.parameter.states1[0].id;
                _this.getCities(_this.parameter.states1[0].id, '');
            }
            else {
                _this.parameter.cities = [];
            }
        });
    };
    // used for search and listing
    LocationComponent.prototype.getStatesWRTCountry = function (country_id, keyword) {
        var _this = this;
        // this.parameter.loading = true;
        this.parameter.url = 'country/getStates';
        this.parameter.country_id = country_id;
        this.searchState = keyword;
        var input = new FormData();
        input.append('country_id', country_id);
        if (keyword) {
            input.append('keyword', keyword);
        }
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            // console.log('states', success);
            // this.parameter.loading = false;
            _this.parameter.states = success.data;
        });
    };
    // used for search and listing
    LocationComponent.prototype.getStatesForCity = function (country_id, keyword) {
        var _this = this;
        // this.parameter.loading = true;
        this.parameter.url = 'country/getStates';
        this.parameter.country_id = country_id;
        var input = new FormData();
        input.append('country_id', country_id);
        if (keyword) {
            input.append('keyword', keyword);
        }
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            // console.log('states', success);
            // this.parameter.loading = false;
            _this.parameter.states2 = success.data;
        });
    };
    LocationComponent.prototype.getCities = function (state_id, keyword) {
        var _this = this;
        // this.parameter.loading = true;
        this.parameter.url = 'getCities';
        this.parameter.state_id = state_id;
        this.searchCity = keyword;
        var input = new FormData();
        input.append('state_id', state_id);
        if (keyword) {
            input.append('keyword', keyword);
        }
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            // console.log('cities', success);
            // this.parameter.loading = false;
            _this.parameter.cities = success.data;
        });
    };
    LocationComponent.prototype.checkIfCountrySpanishNameEntered = function (name_en, name_es) {
        var _this = this;
        if (name_es === void 0) { name_es = ''; }
        var self = this;
        if (name_es === '') {
            swal({
                text: this.constant.errorMsg.SAVE_ENGLISH_COUNTRY_NAME,
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
        // this.parameter.loading = true;
        this.parameter.url = 'addCountry';
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
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            // console.log('success', success);
            var text = _this.location.countryModel.country_id || country_id ?
                _this.constant.successMsg.COUNTRY_UPDATED_SUCCESSFULLY :
                _this.constant.successMsg.COUNTRY_ADDED_SUCCESSFULLY;
            swal('Success', text, 'success');
            // this.parameter.loading = false;
            _this.getAllCountries(''); // loading dropdown
            if (_this.parameter.index === -1) {
                _this.parameter.countries.push(success.data);
            }
            else {
                _this.parameter.countries[_this.parameter.index] = success.data;
            }
        });
    };
    LocationComponent.prototype.checkIfStateSpanishNameEntered = function (country_id, name_en, name_es) {
        var _this = this;
        if (name_es === void 0) { name_es = ''; }
        var self = this;
        if (name_es === '') {
            swal({
                text: this.constant.errorMsg.SAVE_ENGLISH_STATE_NAME,
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
        // this.parameter.loading = true;
        this.parameter.url = 'country/addState';
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
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            // console.log('success1', success);
            var text = _this.location.stateModel.state_id || state_id ?
                _this.constant.successMsg.STATE_UPDATED_SUCCESSFULLY :
                _this.constant.successMsg.STATE_ADDED_SUCCESSFULLY;
            swal('Success', text, 'success');
            // this.parameter.loading = false;
            // this.getStates(this.location.stateModel.country_id ? this.location.stateModel.country_id : country_id, '');
            _this.getStates(_this.parameter.country_id, '');
            if (_this.parameter.index === -1) {
                _this.parameter.states.push(success.data);
            }
            else {
                _this.parameter.states[_this.parameter.index] = success.data;
            }
            // formdata.reset();
        });
    };
    LocationComponent.prototype.checkIfCitySpanishNameEntered = function (state_id, name_en, name_es) {
        var _this = this;
        if (name_es === void 0) { name_es = ''; }
        var self = this;
        if (name_es === '') {
            swal({
                text: this.constant.errorMsg.SAVE_ENGLISH_CITY_NAME,
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
        // this.parameter.loading = true;
        this.parameter.url = 'addCity';
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
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            // console.log('success2', success);
            var text = _this.location.cityModel.city_id || city_id ?
                _this.constant.successMsg.CITY_UPDATED_SUCCESSFULLY : _this.constant.successMsg.CITY_ADDED_SUCCESSFULLY;
            swal('Success', text, 'success');
            // this.parameter.loading = false;
            // this.getCities(this.location.cityModel.state_id, '');
            if (_this.parameter.index === -1) {
                _this.parameter.cities.push(success.data);
            }
            else {
                _this.parameter.cities[_this.parameter.index] = success.data;
            }
            // formdata.reset();
        });
    };
    LocationComponent.prototype.blockUnblockCountry = function (country_id, name_en, name_es, type, index) {
        var _this = this;
        this.parameter.index = index;
        this.parameter.title = this.constant.title.ARE_YOU_SURE;
        switch (type) {
            case 0:
                this.parameter.text = this.constant.title.BLOCK_COUNTRY;
                this.parameter.successText = this.constant.successMsg.BLOCKED_SUCCESSFULLY;
                break;
            case 1:
                this.parameter.text = this.constant.title.UNBLOCK_COUNTRY;
                this.parameter.successText = this.constant.successMsg.UNBLOCKED_SUCCESSFULLY;
                break;
        }
        swal({
            // title: this.parameter.title,
            // text: this.parameter.text,
            html: this.parameter.title + '<br>' + this.parameter.text,
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
        this.parameter.title = this.constant.title.ARE_YOU_SURE;
        switch (type) {
            case 0:
                this.parameter.text = this.constant.title.BLOCK_STATE;
                this.parameter.successText = this.constant.successMsg.BLOCKED_SUCCESSFULLY;
                break;
            case 1:
                this.parameter.text = this.constant.title.UNBLOCK_STATE;
                this.parameter.successText = this.constant.successMsg.UNBLOCKED_SUCCESSFULLY;
                break;
        }
        // const self = this;
        swal({
            // title: this.parameter.title,
            // text: this.parameter.text,
            html: this.parameter.title + '<br>' + this.parameter.text,
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
        this.parameter.title = this.constant.title.ARE_YOU_SURE;
        switch (type) {
            case 0:
                this.parameter.text = this.constant.title.BLOCK_CITY;
                this.parameter.successText = this.constant.successMsg.BLOCKED_SUCCESSFULLY;
                break;
            case 1:
                this.parameter.text = this.constant.title.UNBLOCK_CITY;
                this.parameter.successText = this.constant.successMsg.UNBLOCKED_SUCCESSFULLY;
                break;
        }
        swal({
            // title: this.parameter.title,
            // text: this.parameter.text,
            html: this.parameter.title + '<br>' + this.parameter.text,
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
    var _a, _b, _c, _d;
    LocationComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-location',
            template: __webpack_require__("../../../../../src/app/layout/settings/location/location.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/settings/location/location.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_3__models_location_model__["a" /* Location */], __WEBPACK_IMPORTED_MODULE_4__common_constants__["a" /* Constant */]]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__models_location_model__["a" /* Location */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__models_location_model__["a" /* Location */]) === "function" ? _a : Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__common_constants__["a" /* Constant */]) === "function" ? _b : Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal__["b" /* BsModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal__["b" /* BsModalService */]) === "function" ? _c : Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" ? _d : Object])
    ], LocationComponent);
    return LocationComponent;
}());

//# sourceMappingURL=location.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/settings/profile/profile.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/settings/profile/profile.component.html":
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<div class=\"container-fluid\">\n<div class=\"row\">\n    <div class=\"col-12\">\n      <div class=\"title-group\">\n          <h5>My Profile</h5>\n          <div class=\"spacer30\"></div>\n      </div>\n    </div>\n</div>\n<div class=\"white-bg padding40\">\n    <div class=\"row\">\n    <form role=\"form\" ngNativeValidate #addForm=\"ngForm\">\n      <div class=\"col-xl-12 col-lg-12 col-md-12 col-12\">\n          <div class=\"row\">\n            <div class=\"col-6\">\n                <div class=\"add-img\" style=\"display:flex;\">\n                    <img *ngIf=\"image\" [src]=\"image\" style=\"object-fit: cover; width: 100%;\">\n                    <label *ngIf=\"!image\">No Image</label>\n                </div>\n            </div>\n            <div class=\"col-12\">\n                <div class=\"spacer40\"></div>\n            </div>\n            <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                  <label>Name</label>\n                  <input disabled autocomplete=\"off\" required type=\"text\" class=\"form-control\" [(ngModel)]=\"model.name\" name=\"name\">\n                </div>\n            </div>\n            <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                  <label>Contact number</label>\n                  <input disabled minlength=\"6\" maxlength=\"16\" autocomplete=\"off\" type=\"text\" [pattern]=\"constant.phonePattern\" class=\"form-control\" id=\"phone\" required minlength=\"1\" [(ngModel)]=\"model.phone\" name=\"phone\"\n                        ng2TelInput [ng2TelInputOptions]=\"initialCountry\" />\n                </div>\n            </div>\n            <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                  <label>Email ID</label>\n                  <input disabled autocomplete=\"off\" required [pattern]=\"constant.emailPattern\" type=\"email\" class=\"form-control\" [(ngModel)]=\"model.email\" name=\"email\">\n                </div>\n            </div>\n          </div>\n          <div class=\"access-controls\">\n              <div class=\"select-controls select-controls-1\" *ngFor=\"let permission of model.admin_acl; let i=index\">\n              <label class=\"cust-check-bx2\" [ngClass]=\"{'access-control11':permission.can_create==1 || permission.can_read==1 || permission.can_update==1 || permission.can_delete==1}\">{{permission?.acl?.name}}\n              <input (click)=\"expandBox(i)\" type=\"checkbox\" [checked]=\"permission.can_create == 1 || permission.can_read==1 || permission.can_update==1 || permission.can_delete==1 ? 'checked': ''\">\n              <span class=\"checkmark\"></span>\n              </label>\n              \n              <div class=\"clearfix\"></div>\n              <div *ngIf=\"permission.show\" id=\"broker-seller-dev\" class=\"inner-select\">\n                <label class=\"cust-check-bx\" [ngClass]=\"{'inner-checked':permission.can_create==1}\">Can Create\n                    <input type=\"checkbox\" [checked]=\"permission.can_create == 1 ? 'checked': ''\" >\n                    <span class=\"checkmark\"></span>\n                </label>\n                <label class=\"cust-check-bx\" [ngClass]=\"{'inner-checked':permission.can_read==1}\">Can Read\n                    <input type=\"checkbox\" [checked]=\"permission.can_read == 1 ? 'checked': ''\" >\n                    <span class=\"checkmark\"></span>\n                </label>\n                <label class=\"cust-check-bx\" [ngClass]=\"{'inner-checked':permission.can_update==1}\">Can Update\n                    <input type=\"checkbox\" [checked]=\"permission.can_update == 1 ? 'checked': ''\" >\n                    <span class=\"checkmark\"></span>\n                </label>\n                <label class=\"cust-check-bx\" [ngClass]=\"{'inner-checked':permission.can_delete==1}\">Can Block/Unblock\n                    <input type=\"checkbox\" [checked]=\"permission.can_delete == 1 ? 'checked': ''\" >\n                    <span class=\"checkmark\"></span>\n                </label>\n                <label class=\"cust-check-bx\" [ngClass]=\"{'inner-checked':permission.can_crud==1}\">CRUD\n                    <input type=\"checkbox\" [checked]=\"permission.can_crud == 1 ? 'checked': ''\" >\n                    <span class=\"checkmark\"></span>\n                </label>\n                <br>\n              </div>\n              <div class=\"clearfix\"></div>\n            </div>\n        </div>\n\n\n        <div class=\"row\" *ngFor=\"let add of model.address; let j=index\">\n            <div class=\"col-sm-2 col-12\">\n                <div class=\"form-group-2\">\n                  <label>Country</label>\n                  <select class=\"form-control\">\n                      <option>{{add.countries}}</option>\n                  </select>\n                </div>\n            </div>\n            <div class=\"col-sm-2 col-12\">\n                <div class=\"form-group-2\">\n                  <label>State</label>\n                  <select class=\"form-control\" disabled>\n                      <option>{{add.states}}</option>\n                  </select>\n                </div>\n            </div>\n            <div class=\"col-sm-2 col-12\">\n                <div class=\"form-group-2\">\n                  <label>City</label>\n                  <select class=\"form-control\" disabled>\n                      <option>{{add.cities}}</option>\n                  </select>\n                </div>\n            </div>\n            <div class=\"col-sm-2 col-12\">\n                <div class=\"form-group-2\">\n                  <label>Locality</label>\n                  <select class=\"form-control\" disabled>\n                      <option>{{add.localities}}</option>\n                  </select>\n                </div>\n            </div>\n            <div class=\"col-sm-2 col-12\">\n                <div class=\"form-group-2\">\n                  <label>Building</label>\n                  <select class=\"form-control\" disabled>\n                      <option>{{add.buildings}}</option>\n                  </select>\n                </div>\n            </div>\n          </div>\n                 \n      </div>\n      </form>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/layout/settings/profile/profile.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_acl_model__ = __webpack_require__("../../../../../src/app/models/acl.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(constant, model, admin) {
        this.constant = constant;
        this.model = model;
        this.admin = admin;
        this.parameter = {};
        this.show = false;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        this.model.country_code = this.constant.country_code;
        this.model.dial_code = this.constant.dial_code;
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.p = this.constant.p;
        this.initialCountry = { initialCountry: this.constant.country_code };
        // this.model.id = params['id'];
        this.loginData(this.model.id);
    };
    ProfileComponent.prototype.loginData = function (id) {
        var _this = this;
        this.parameter.loading = true;
        this.admin.postDataApi('loginData', {})
            .subscribe(function (success) {
            _this.parameter.loading = false;
            _this.model = success.data;
            _this.image = _this.model.image;
            _this.model.admin_acl = success.data.admin_acl;
            _this.model.address = [];
            console.log('success.data.countries.length', success.data.countries, success.data.countries.length);
            for (var ind = 0; ind < success.data.countries.length; ind++) {
                console.log('success.data.countries.length', success.data.countries[ind].name_en, success.data.countries.length);
                var tempAdd = {
                    countries: success.data.countries[ind].name_en,
                    states: success.data.states !== null && success.data.states[ind] ? success.data.states[ind].name_en : 'All',
                    cities: success.data.cities !== null && success.data.cities[ind] ? success.data.cities[ind].name_en : 'All',
                    localities: success.data.localities !== null && success.data.localities[ind] ? success.data.localities[ind].name_en : 'All',
                    buildings: success.data.buildings !== null && success.data.buildings[ind] ? success.data.buildings[ind].name_en : 'All'
                };
                console.log('temp', tempAdd);
                console.log('model', _this.model);
                console.log('in', ind);
                _this.model.address[ind] = tempAdd;
                console.log('model', _this.model);
            }
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    ProfileComponent.prototype.expandBox = function (index) {
        this.model.admin_acl[index].show = this.model.admin_acl[index].show === true ? false : true;
    };
    var _a, _b, _c;
    ProfileComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-profile',
            template: __webpack_require__("../../../../../src/app/layout/settings/profile/profile.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/settings/profile/profile.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_2__models_acl_model__["a" /* ACL */]]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__common_constants__["a" /* Constant */]) === "function" ? _a : Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__models_acl_model__["a" /* ACL */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__models_acl_model__["a" /* ACL */]) === "function" ? _b : Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" ? _c : Object])
    ], ProfileComponent);
    return ProfileComponent;
}());

//# sourceMappingURL=profile.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/settings/project/project.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".amenity-img{\n    text-align: center\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/settings/project/project.component.html":
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<div class=\"container-fluid\">\n  <div class=\"breadcrumb-group\">\n      <h5>Settings</h5>\n      <nav class=\"breadcrumb\">\n          <a class=\"breadcrumb-item\">Home</a>\n        <!-- <a class=\"breadcrumb-item\" routerLink=\"/dashboard\">Home</a> -->\n        <a class=\"breadcrumb-item\">Settings</a>\n        <span class=\"breadcrumb-item active\">Project</span>\n      </nav>\n  </div>\n  <div class=\"white-bg\">\n      <div class=\"page-title\">\n        <h3>Project</h3>\n      </div>\n\n      <div class=\"form-outer\">\n          <div class=\"inline-form-group\">\n             <div class=\"row\">\n                <div class=\"col-md-4\">\n                    <label><strong>Possession Status</strong></label>\n                </div>\n                <div class=\"col-md-8\" *ngIf=\"admin?.admin_acl['Settings']?.can_create==1\">\n                   <form role=\"form\" novalidate #addPossessionForm=\"ngForm\" (ngSubmit)=\"checkIfPossessionSpanishNameEntered(addPossessionForm, '', addPossessionForm.value.name_en, addPossessionForm.value.name_es, 1, 'add')\">\n                      <div class=\"row\">\n                        <div class=\"col-lg-6 col-md-6\">\n                          <input type=\"text\" class=\"form-control\" placeholder=\"Possession status (English)\" id=\"name_en\" required [(ngModel)]=\"project.possession.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n                          <!-- <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-error\">\n                            <div [hidden]=\"!name_en.errors.required\">\n                              {{constant.errorMsg.PROPERTY_CONFIG_REQUIRED}}\n                            </div>\n                          </div>       -->\n                        </div>\n                        <div class=\"col-lg-6 col-md-6\">\n                            <input type=\"text\" class=\"form-control\" placeholder=\"Possession status (Spanish)\" [(ngModel)]=\"project.possession.name_es\" name=\"name_es\">\n                        </div>\n                      </div>\n                    <button [disabled]=\"admin?.admin_acl['Settings']?.can_create==0 || addPossessionForm.invalid\" type=\"submit\" class=\"add-btn btn\">\n                       <img src=\"./../../../../assets/img/add.png\" alt=\"img\">\n                     </button>\n                   </form>\n                </div>\n             </div>\n          </div>\n      </div>\n\n      <div class=\"tabel-section padding40 paddingT0\">\n          <div class=\"table-responsive\">\n            <table class=\"table table-striped\">\n                <tr>\n                  <th style=\"width:40%; text-align:left;\">Name (English)</th>\n                  <th style=\"width:40%; text-align:left;\">Name (Spanish)</th>\n                  <th style=\"width:20%\">Action</th>\n                </tr>\n                <tr *ngFor=\"let item of parameter.items; let i=index\">\n                  <td class=\"text-left\">\n                    {{item.name_en}}\n                  </td>\n                  <td class=\"text-left\">\n                    {{item.name_es}}\n                  </td>\n                  <td>\n                      <button title=\"Edit\" [disabled]=\"admin?.admin_acl['Settings']?.can_update==0\" \n                      (click)=\"openPossessionStatusModal(addPossessionStatusModal, i, item.id, item.name_en, item.name_es, item.status)\" class=\"action-icon\"><img src=\"./../../../../assets/img/edit.png\" alt=\"img\"></button>\n                    \n                      <!-- status = 1 means unblocked -->\n                      <button [disabled]=\"admin?.admin_acl['Settings']?.can_delete==0\"\n                        (click)=\"addPossessionStatusPopup(i, item.id, item.name_en, item.name_es, item.status==1?0:1, item.status==1?'block':'unblock')\" \n                        title=\"{{item.status==1?'Block':'Unblock'}}\" [ngClass]=\"{'unblock-bg':item.status==0}\"\n                        class=\"action-icon\"><img src=\"assets/img/block.png\" alt=\"img\">\n                      </button>\n                    <!-- <a title=\"Edit Configuration\" (click)=\"openPossessionStatusModal(addPossessionStatusModal, item.id, item.name_en, item.name_es, item.status)\" class=\"icon-block edit-icon\"><img src=\"./../../../../assets/img/edit.png\" alt=\"img\"></a>\n                    <a *ngIf=\"item.status == 1\" (click)=\"addPossessionStatusPopup(item.id, item.name_en, item.name_es, 0, 'block')\" title=\"Block Configuration\" class=\"icon-block block-icon\"><img src=\"./../../../../assets/img/unblock.png\" alt=\"img\"></a>\n                    <a *ngIf=\"item.status == 0\" (click)=\"addPossessionStatusPopup(item.id, item.name_en, item.name_es, 1, 'unblock')\" title=\"Unblock Configuration\" class=\"icon-block block-icon unblock-bg\"><img src=\"./../../../../assets/img/block.png\" alt=\"img\"></a> -->\n                  </td>\n                </tr>\n\n                <div *ngIf=\"parameter.total == 0\">\n                  <p class=\"show-error\">\n                    {{constant.errorMsg.NO_POSSESSION_FOUND}}\n                  </p>\n                </div>\n            </table>\n          </div>\n      </div>\n\n\n      <div class=\"form-outer\">\n        <div class=\"inline-form-group\">\n           <div class=\"row\">\n              <div class=\"col-md-4\">\n                  <label><strong>Project Type</strong></label>\n              </div>\n              <div class=\"col-md-8\" *ngIf=\"admin?.admin_acl['Settings']?.can_create==1\">\n                 <form role=\"form\" novalidate #addTypeForm=\"ngForm\" (ngSubmit)=\"checkIfTypeSpanishNameEntered(addTypeForm, '', addTypeForm.value.name_en, addTypeForm.value.name_es, 1, 'add')\">\n\n                  <div class=\"row\">\n                      <div class=\"col-md-6 col-lg-6\">\n                          <input type=\"text\" class=\"form-control\" placeholder=\"Project type name (English)\" id=\"name_en\" required [(ngModel)]=\"project.type.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n                          <!-- <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-error\">\n                            <div [hidden]=\"!name_en.errors.required\">\n                              {{constant.errorMsg.PROPERTY_TYPE_REQUIRED}}\n                            </div>\n                        </div> -->\n                      </div>\n                    \n                    <div class=\"col-lg-6 col-md-6\">\n                        <input type=\"text\" class=\"form-control\" placeholder=\"Project type name (Spanish)\" [(ngModel)]=\"project.type.name_es\" name=\"name_es\">\n                    </div>\n  \n                  </div>\n                  <button [disabled]=\"admin?.admin_acl['Settings']?.can_create==0 || addTypeForm.invalid\" type=\"submit\" class=\"add-btn btn\">\n                     <img src=\"./../../../../assets/img/add.png\" alt=\"img\">\n                   </button>\n                 </form>\n              </div>\n           </div>\n        </div>\n    </div>\n\n    <div class=\"tabel-section padding40 paddingT0\">\n        <div class=\"table-responsive\">\n          <table class=\"table table-striped\">\n              <tr>\n                <th style=\"width:40%; text-align:left;\">Name (English)</th>\n                <th style=\"width:40%; text-align:left;\">Name (Spanish)</th>\n                <th style=\"width:20%\">Action</th>\n              </tr>\n              <tr *ngFor=\"let item of parameter.projectTypes; let j=index\">\n                <td class=\"text-left\">\n                  {{item.name_en}}\n                </td>\n                <td class=\"text-left\">\n                  {{item.name_es}}\n                </td>\n                <td>\n                    <button title=\"Edit\" [disabled]=\"admin?.admin_acl['Settings']?.can_update==0\" \n                    (click)=\"openBuildingTypeModal(addBuildingTypeModal, j, item.id, item.name_en, item.name_es, item.status)\" class=\"action-icon\"><img src=\"./../../../../assets/img/edit.png\" alt=\"img\"></button>\n                  \n                    <!-- status = 1 means unblocked -->\n                    <button [disabled]=\"admin?.admin_acl['Settings']?.can_delete==0\"\n                      (click)=\"addBuildingTypePopup(j, item.id, item.name_en, item.name_es, item.status==1?0:1, item.status==1?'block':'unblock')\" \n                      title=\"{{item.status==1?'Block':'Unblock'}}\" [ngClass]=\"{'unblock-bg':item.status==0}\"\n                      class=\"action-icon\"><img src=\"assets/img/block.png\" alt=\"img\">\n                    </button>\n                  <!-- <a title=\"Edit Property Type\" (click)=\"openBuildingTypeModal(addBuildingTypeModal, item.id, item.name_en, item.name_es, item.status)\" class=\"icon-block edit-icon\"><img src=\"./../../../../assets/img/edit.png\" alt=\"img\"></a>\n                  <a *ngIf=\"item.status == 1\" (click)=\"addBuildingTypePopup(item.id, item.name_en, item.name_es, 0, 'block')\" title=\"Block Property Type\" class=\"icon-block block-icon\"><img src=\"./../../../../assets/img/unblock.png\" alt=\"img\"></a>\n                  <a *ngIf=\"item.status == 0\" (click)=\"addBuildingTypePopup(item.id, item.name_en, item.name_es, 1, 'unblock')\" title=\"Unblock Property Type\" class=\"icon-block block-icon unblock-bg\"><img src=\"./../../../../assets/img/block.png\" alt=\"img\"></a> -->\n                </td>\n              </tr>\n\n              <div *ngIf=\"parameter.projectTypesCount == 0\">\n                <p class=\"show-error\">\n                  {{constant.errorMsg.NO_PROJECT_TYPE_FOUND}}\n                </p>\n              </div>\n          </table>\n        </div>\n    </div>\n\n\n\n      <div class=\"form-outer\">\n        <div class=\"inline-form-group\">\n            <div class=\"row\">\n              <div class=\"col-md-4\">\n                  <label>Amenities</label>\n              </div>\n              <div class=\"col-md-8\" *ngIf=\"admin?.admin_acl['Settings']?.can_create==1\">\n                 <form role=\"form\" novalidate #addAmenityForm=\"ngForm\" (ngSubmit)=\"checkIfAmenitySpanishNameEntered(addAmenityForm, '', '', addAmenityForm.value.name_en, addAmenityForm.value.name_es, 1, 'add')\">\n                  <div class=\"browse-files\">\n                    <input accept=\"image/*\" (change)=\"changeListner($event)\" type=\"file\" class=\"image form-control\" placeholder=\"Amenity\" id=\"icon\" required [(ngModel)]=\"amenityModel.icon\" name=\"icon\" #icon=\"ngModel\">\n                    <span>Browse</span>\n                  </div>\n                  <!-- <div *ngIf=\"icon.errors && (icon.dirty || icon.touched)\" class=\"show-error\">\n                    <div [hidden]=\"!icon.errors.required\">\n                      {{constant.errorMsg.FILE_REQUIRED}}\n                    </div>\n                  </div> -->\n                  \n                  <div class=\"row\">\n                    <div class=\"col-lg-6 col-md-6\">\n                        <input type=\"text\" class=\"form-control\" placeholder=\"Project amenity name (English)\" id=\"name_en\" required [(ngModel)]=\"amenityModel.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n                        <!-- <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-error\">\n                          <div [hidden]=\"!name_en.errors.required\">\n                            {{constant.errorMsg.PROPERTY_TYPE_REQUIRED}}\n                          </div>\n                      </div>     -->\n                    </div>\n                    <div class=\"col-lg-6 col-md-6\">\n                        <input type=\"text\" class=\"form-control\" placeholder=\"Project amenity name (Spanish)\" [(ngModel)]=\"amenityModel.name_es\" name=\"name_es\">\n                    </div>\n                  </div>\n                  <button [disabled]=\"admin?.admin_acl['Settings']?.can_create==0 || addAmenityForm.invalid\" type=\"submit\" class=\"add-btn btn\">\n                     <img src=\"./../../../../assets/img/add.png\" alt=\"img\">\n                   </button>\n                 </form>\n              </div>\n              <!-- <div class=\"col-md-8\">\n                  <div class=\"browse-files\">\n                    <input type=\"file\" name=\"\">\n                    <span>Browse</span>\n                  </div>\n                  <input type=\"text\" name=\"\">\n                  <button class=\"add-btn\" (click)=\"openAmenitiesModal(addAmenitiesModal, '', '', '', '', 1)\">\n                    <img src=\"./../../../../assets/img/add.png\" alt=\"img\">\n                  </button>\n              </div> -->\n            </div>\n        </div>\n      </div>\n\n      <div class=\"tabel-section padding40\">\n        <div class=\"table-responsive\">\n            <table class=\"table table-striped\">\n              <tr>\n                  <th style=\"width:20%\">Image</th>\n                  <th style=\"width:30%; text-align:left;\">Name (English)</th>\n                  <th style=\"width:30%; text-align:left;\">Name (Spanish)</th>\n                  <th style=\"width:20%\">Action</th>\n              </tr>\n              <tr *ngFor=\"let item of parameter.amenities; let k=index\">\n                  <td>\n                    <!-- <i class=\"fa fa-building\"></i> -->\n                    <img alt=\"image\" height=\"30\" width=\"30\" src=\"{{item.icon}}\">\n                  </td>\n                  <td class=\"text-left\">\n                    {{item.name_en}}\n                  </td>\n                  <td class=\"text-left\">\n                    {{item.name_es}}\n                  </td>\n                  <td>\n                      <button title=\"Edit\" [disabled]=\"admin?.admin_acl['Settings']?.can_update==0\" \n                      (click)=\"openAmenityModal(addAmenityModal, k, item.id, item.icon, item.name_en, item.name_es, item.status)\" class=\"action-icon\"><img src=\"./../../../../assets/img/edit.png\" alt=\"img\"></button>\n                    \n                      <!-- status = 1 means unblocked -->\n                      <button [disabled]=\"admin?.admin_acl['Settings']?.can_delete==0\"\n                        (click)=\"addAmenityPopup(k ,item.id, item.icon, item.name_en, item.name_es, item.status==1?0:1, item.status==1?'block':'unblock')\" \n                        title=\"{{item.status==1?'Block':'Unblock'}}\" [ngClass]=\"{'unblock-bg':item.status==0}\"\n                        class=\"action-icon\"><img src=\"assets/img/block.png\" alt=\"img\">\n                      </button>\n\n                    <!-- <a title=\"Edit Amenity\" (click)=\"openAmenityModal(addAmenityModal, item.id, item.icon, item.name_en, item.name_es, item.status)\" class=\"icon-block edit-icon\"><img src=\"./../../../../assets/img/edit.png\" alt=\"img\"></a>\n                    <a *ngIf=\"item.status == 1\" (click)=\"addAmenityPopup(item.id, item.icon, item.name_en, item.name_es, 0, 'block')\" title=\"Block Amenity\" class=\"icon-block block-icon\"><img src=\"./../../../../assets/img/unblock.png\" alt=\"img\"></a>\n                    <a *ngIf=\"item.status == 0\" (click)=\"addAmenityPopup(item.id, item.icon, item.name_en, item.name_es, 1, 'unblock')\" title=\"Unblock Amenity\" class=\"icon-block block-icon unblock-bg\"><img src=\"./../../../../assets/img/block.png\" alt=\"img\"></a> -->\n                  </td>\n              </tr>\n\n              <div *ngIf=\"parameter.amenitiesCount == 0\">\n                  <p class=\"show-error\">\n                    {{constant.errorMsg.NO_PROJECT_AMENITY_FOUND}}\n                  </p>\n                </div>\n            </table>\n        </div>\n      </div>\n      <!-- <div class=\"btn-cont text-right padding40 paddingT0\">\n        <button class=\"btn btn-primary\">Save</button>\n      </div> -->\n  </div>\n</div>\n\n\n<!-- add possession status modal -->\n<ng-template #addPossessionStatusModal>\n  <div class=\"modal-content\">\n    <div class=\"modal-header my-modal-header\">\n      <h4 class=\"modal-title\">Edit Property Configuration</h4>\n      <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <form class=\"form-horizontal my-modal-form\" role=\"form\" novalidate #addForm=\"ngForm\" (ngSubmit)=\"checkIfPossessionSpanishNameEntered(addForm, project.possession.id, addForm.value.name_en, addForm.value.name_es, project.possession.status, 'edit')\">\n      <div class=\"modal-body my-modal-body\">\n        <div class=\"form-group\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"Project possession status (English)\" id=\"name_en\" required [(ngModel)]=\"project.possession.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n          <!-- <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-error\">\n              <div [hidden]=\"!name_en.errors.required\">\n                {{constant.errorMsg.PROPERTY_TYPE_REQUIRED}}\n              </div>\n          </div> -->\n        </div>\n        <div class=\"form-group\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"Project possession status (Spanish)\" [(ngModel)]=\"project.possession.name_es\" name=\"name_es\">\n        </div>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"submit\" [disabled]=\"admin?.admin_acl['Settings']?.can_update==0 || addForm.invalid\" class=\"btn btn-info\">Submit</button>\n        <button type=\"button\" class=\"btn btn-default\" aria-label=\"Close\" (click)=\"modalRef.hide()\">Close</button>\n      </div>\n    </form>\n  </div>\n</ng-template>\n\n\n<!-- add PropertyTypeModal modal -->\n<ng-template #addBuildingTypeModal>\n  <div class=\"modal-content\">\n    <div class=\"modal-header my-modal-header\">\n      <h4 class=\"modal-title\">Edit Property Type</h4>\n      <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <form class=\"form-horizontal my-modal-form\" role=\"form\" novalidate #addForm1=\"ngForm\" (ngSubmit)=\"checkIfTypeSpanishNameEntered(addForm1, project.type.id, addForm1.value.name_en, addForm1.value.name_es, project.type.status, 'edit')\">\n      <div class=\"modal-body my-modal-body\">\n        <div class=\"form-group\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"Project type (English)\" id=\"name_en\" required [(ngModel)]=\"project.type.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n          <!-- <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-error\">\n              <div [hidden]=\"!name_en.errors.required\">\n                {{constant.errorMsg.PROPERTY_TYPE_REQUIRED}}\n              </div>\n          </div> -->\n        </div>\n        <div class=\"form-group\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"Project type (Spanish)\" [(ngModel)]=\"project.type.name_es\" name=\"name_es\">\n        </div>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"submit\" [disabled]=\"admin?.admin_acl['Settings']?.can_update==0 || addForm1.invalid\" class=\"btn btn-info\">Submit</button>\n        <button type=\"button\" class=\"btn btn-default\" aria-label=\"Close\" (click)=\"modalRef.hide()\">Close</button>\n      </div>\n    </form>\n  </div>\n</ng-template>\n\n\n<!-- addAmenitiesModal -->\n<ng-template #addAmenityModal>\n    <div class=\"modal-content\">\n      <div class=\"modal-header my-modal-header\">\n        <h4 class=\"modal-title\">Edit Amenity</h4>\n        <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <form class=\"form-horizontal my-modal-form\" role=\"form\" novalidate #addForm2=\"ngForm\" (ngSubmit)=\"checkIfAmenitySpanishNameEntered(addForm2, amenityModel.id, '', addForm2.value.name_en, addForm2.value.name_es, amenityModel.status, 'edit')\">\n        <div class=\"modal-body my-modal-body\">\n          <div class=\"form-group amenity-img\">\n            <img [src]=\"amenityModel.icon\" class=\"image\" width=\"100\" height=\"100\">\n          </div>\n          <div class=\"form-group\">\n            <input accept=\"image/*\" (change)=\"changeListner($event)\" type=\"file\" class=\"form-control\">\n          </div>\n          \n          <div class=\"form-group\">\n            <input type=\"text\" class=\"form-control\" placeholder=\"Amenity (English)\" id=\"name_en\" required [(ngModel)]=\"amenityModel.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n            <!-- <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-error\">\n                <div [hidden]=\"!name_en.errors.required\">\n                  {{constant.errorMsg.PROPERTY_TYPE_REQUIRED}}\n                </div>\n            </div> -->\n          </div>\n          <div class=\"form-group\">\n            <input type=\"text\" class=\"form-control\" placeholder=\"Amenity (Spanish)\" [(ngModel)]=\"amenityModel.name_es\" name=\"name_es\">\n          </div>\n        </div>\n        <div class=\"modal-footer\">\n          <button type=\"submit\" [disabled]=\"admin?.admin_acl['Settings']?.can_update==0 || addForm2.invalid\" class=\"btn btn-info\">Submit</button>\n          <button type=\"button\" class=\"btn btn-default\" aria-label=\"Close\" (click)=\"closeModal()\">Close</button>\n        </div>\n      </form>\n  </div>\n</ng-template>\n  "

/***/ }),

/***/ "../../../../../src/app/layout/settings/project/project.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal__ = __webpack_require__("../../../../ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_project_model__ = __webpack_require__("../../../../../src/app/models/project.model.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProjectComponent = /** @class */ (function () {
    function ProjectComponent(element, constant, project, modalService, admin, amenityModel) {
        this.element = element;
        this.constant = constant;
        this.project = project;
        this.modalService = modalService;
        this.admin = admin;
        this.amenityModel = amenityModel;
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
        this.amenityModel = new __WEBPACK_IMPORTED_MODULE_4__models_project_model__["a" /* Amenities */];
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
        this.parameter.loading = true;
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.parameter.loading = false;
            var text = id ?
                _this.constant.successMsg.PROJECT_POSSESSION_UPDATED_SUCCESSFULLY :
                _this.constant.successMsg.PROJECT_POSSESSION_ADDED_SUCCESSFULLY;
            swal('Success', text, 'success');
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
            _this.parameter.loading = false;
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
        this.parameter.loading = true;
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.parameter.loading = false;
            var text = id ?
                _this.constant.successMsg.PROJECT_TYPE_UPDATED_SUCCESSFULLY :
                _this.constant.successMsg.PROJECT_TYPE_ADDED_SUCCESSFULLY;
            _this.project.type.name_en = '';
            _this.project.type.name_es = '';
            swal('Success', text, 'success');
            if (_this.parameter.index !== -1) {
                _this.parameter.projectTypes[_this.parameter.index] = success.data;
            }
            else {
                _this.parameter.projectTypes.push(success.data);
            }
            _this.parameter.index = -1;
            // this.getBuildingTypes();
        }, function (error) {
            _this.parameter.loading = false;
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
        this.parameter.loading = true;
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.parameter.loading = false;
            var text = id ? _this.constant.successMsg.AMENITY_UPDATED_SUCCESSFULLY : _this.constant.successMsg.AMENITY_ADDED_SUCCESSFULLY;
            swal('Success', text, 'success');
            if (_this.parameter.index !== -1) {
                _this.parameter.amenities[_this.parameter.index] = success.data;
            }
            else {
                _this.parameter.amenities.push(success.data);
            }
            _this.parameter.index = -1;
            _this.amenityModel = new __WEBPACK_IMPORTED_MODULE_4__models_project_model__["a" /* Amenities */];
            // this.getAmenities();
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    ProjectComponent.prototype.getPossessionStatuses = function () {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'getPossessionStatuses';
        var input = new FormData();
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.parameter.loading = false;
            _this.parameter.items = success.data;
            _this.parameter.total = success.data.length;
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    ProjectComponent.prototype.getBuildingTypes = function () {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'getBuildingTypes';
        var input = new FormData();
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.parameter.loading = false;
            _this.parameter.projectTypes = success.data;
            _this.parameter.projectTypesCount = success.data.length;
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    ProjectComponent.prototype.getAmenities = function () {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'getAmenities';
        var input = new FormData();
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.parameter.loading = false;
            _this.parameter.amenities = success.data;
            _this.parameter.amenitiesCount = success.data.length;
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    ProjectComponent.prototype.addPossessionStatusPopup = function (index, id, name_en, name_es, status, type) {
        var _this = this;
        this.parameter.index = index;
        var text = status === 1 ? this.constant.title.UNBLOCK_PROJECT_POSSESSION : this.constant.title.BLOCK_PROJECT_POSSESSION;
        swal({
            // title: this.constant.title.ARE_YOU_SURE,
            // text: status === 1 ? this.constant.title.UNBLOCK_PROJECT_POSSESSION : this.constant.title.BLOCK_PROJECT_POSSESSION,
            html: this.constant.title.ARE_YOU_SURE + '<br>' + text,
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
        var text = status === 1 ? this.constant.title.UNBLOCK_PROJECT_TYPE : this.constant.title.BLOCK_PROJECT_TYPE;
        swal({
            // title: this.constant.title.ARE_YOU_SURE,
            // text: status === 1 ? this.constant.title.UNBLOCK_PROJECT_TYPE : this.constant.title.BLOCK_PROJECT_TYPE,
            html: this.constant.title.ARE_YOU_SURE + '<br>' + text,
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
        var text = status === 1 ? this.constant.title.UNBLOCK_AMENITY : this.constant.title.BLOCK_AMENITY;
        swal({
            // title: this.constant.title.ARE_YOU_SURE,
            // text: status === 1 ? this.constant.title.UNBLOCK_AMENITY : this.constant.title.BLOCK_AMENITY,
            html: this.constant.title.ARE_YOU_SURE + '<br>' + text,
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
                text: this.constant.errorMsg.SAVE_ENGLISH_PROJECT_POSSESION,
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
                text: this.constant.errorMsg.SAVE_ENGLISH_PROJECT_TYPE,
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
                text: this.constant.errorMsg.SAVE_ENGLISH_AMENITY,
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
    var _a, _b, _c, _d, _e, _f;
    ProjectComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-project',
            template: __webpack_require__("../../../../../src/app/layout/settings/project/project.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/settings/project/project.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_3__common_constants__["a" /* Constant */], __WEBPACK_IMPORTED_MODULE_4__models_project_model__["b" /* Project */], __WEBPACK_IMPORTED_MODULE_4__models_project_model__["a" /* Amenities */]]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _a : Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__common_constants__["a" /* Constant */]) === "function" ? _b : Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__models_project_model__["b" /* Project */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__models_project_model__["b" /* Project */]) === "function" ? _c : Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal__["b" /* BsModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal__["b" /* BsModalService */]) === "function" ? _d : Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" ? _e : Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_4__models_project_model__["a" /* Amenities */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__models_project_model__["a" /* Amenities */]) === "function" ? _f : Object])
    ], ProjectComponent);
    return ProjectComponent;
}());

//# sourceMappingURL=project.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/settings/property/property.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".amenity-img{\n    text-align: center\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/settings/property/property.component.html":
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<div class=\"container-fluid\">\n  <div class=\"breadcrumb-group\">\n      <h5>Settings</h5>\n      <nav class=\"breadcrumb\">\n          <a class=\"breadcrumb-item\">Home</a>\n          <!-- <a class=\"breadcrumb-item\" routerLink=\"/dashboard\">Home</a> -->\n        <a class=\"breadcrumb-item\">Settings</a>\n        <span class=\"breadcrumb-item active\">Property</span>\n      </nav>\n  </div>\n  <div class=\"white-bg\">\n      <div class=\"page-title\">\n        <h3>Property</h3>\n      </div>\n\n\n      <div class=\"form-outer\">\n          <div class=\"inline-form-group\">\n             <div class=\"row\">\n                <div class=\"col-md-4\">\n                    <label><strong>Property Configuration</strong></label>\n                </div>\n                <div class=\"col-md-8\" *ngIf=\"admin?.admin_acl['Settings']?.can_create==1\" >\n                   <form role=\"form\" novalidate #addConfigForm=\"ngForm\" (ngSubmit)=\"checkIfConfigSpanishNameEntered(addConfigForm, '', addConfigForm.value.name_en, addConfigForm.value.name_es, 1, 'add')\">\n                    <div class=\"row\">\n                        <div class=\"col-lg-6 col-md-6\">\n                            <input type=\"text\" class=\"form-control\" placeholder=\"Configuration name (English)\" id=\"name_en\" required [(ngModel)]=\"property.configuration.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n                            <!-- <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-error\">\n                              <div [hidden]=\"!name_en.errors.required\">\n                                {{constant.errorMsg.PROPERTY_CONFIG_REQUIRED}}\n                              </div>\n                          </div>       -->\n                        </div>\n                        <div class=\"col-lg-6 col-md-6\">\n                            <input type=\"text\" class=\"form-control\" placeholder=\"Configuration name (Spanish)\" [(ngModel)]=\"property.configuration.name_es\" name=\"name_es\">\n                        </div>\n                      </div>\n                    <button [disabled]=\"admin?.admin_acl['Settings']?.can_create==0 || addConfigForm.invalid\" type=\"submit\" class=\"add-btn btn\">\n                       <img src=\"./../../../../assets/img/add.png\" alt=\"img\">\n                     </button>\n                   </form>\n                </div>\n             </div>\n          </div>\n      </div>\n\n      <div class=\"tabel-section padding40 paddingT0\">\n          <div class=\"table-responsive\">\n            <table class=\"table table-striped\">\n                <tr>\n                  <th style=\"width:40%; text-align:left;\">Name (English)</th>\n                  <th style=\"width:40%; text-align:left;\">Name (Spanish)</th>\n                  <th style=\"width:20%\">Action</th>\n                </tr>\n                <tr *ngFor=\"let item of parameter.items; let i=index\">\n                  <td class=\"text-left\">\n                    {{item.name_en}}\n                  </td>\n                  <td class=\"text-left\">\n                    {{item.name_es}}\n                  </td>\n                  <td>\n                    <button title=\"Edit\" [disabled]=\"admin?.admin_acl['Settings']?.can_update==0\" \n                      (click)=\"openPropertyConfigModal(addPropertyConfigModal, i, item.id, item.name_en, item.name_es, item.status)\" class=\"action-icon\"><img src=\"./../../../../assets/img/edit.png\" alt=\"img\"></button>\n                    \n                      <!-- status = 1 means unblocked -->\n                    <button [disabled]=\"admin?.admin_acl['Settings']?.can_delete==0\"\n                      (click)=\"addPropertyConfigurationPopup(i, item.id, item.name_en, item.name_es, item.status==1?0:1, item.status==1?'block':'unblock')\" \n                      title=\"{{item.status==1?'Block':'Unblock'}}\" [ngClass]=\"{'unblock-bg':item.status==0}\"\n                      class=\"action-icon\"><img src=\"assets/img/block.png\" alt=\"img\">\n                    </button>\n\n                    <!-- <a title=\"Edit Configuration\" (click)=\"openPropertyConfigModal(addPropertyConfigModal, item.id, item.name_en, item.name_es, item.status)\" class=\"icon-block edit-icon\"><img src=\"./../../../../assets/img/edit.png\" alt=\"img\"></a>\n                    <a *ngIf=\"item.status == 1\" (click)=\"addPropertyConfigurationPopup(item.id, item.name_en, item.name_es, 0, 'block')\" title=\"Block Configuration\" class=\"icon-block block-icon\"><img src=\"./../../../../assets/img/unblock.png\" alt=\"img\"></a>\n                    <a *ngIf=\"item.status == 0\" (click)=\"addPropertyConfigurationPopup(item.id, item.name_en, item.name_es, 1, 'unblock')\" title=\"Unblock Configuration\" class=\"icon-block block-icon unblock-bg\"><img src=\"./../../../../assets/img/block.png\" alt=\"img\"></a> -->\n                  </td>\n                </tr>\n\n                <div *ngIf=\"parameter.total == 0\">\n                  <p class=\"show-error\">\n                    {{constant.errorMsg.NO_CONFIGURATION_FOUND}}\n                  </p>\n                </div>\n            </table>\n          </div>\n      </div>\n\n\n      <div class=\"form-outer\">\n        <div class=\"inline-form-group\">\n           <div class=\"row\">\n              <div class=\"col-md-4\">\n                  <label><strong>Property Type</strong></label>\n              </div>\n              <div class=\"col-md-8\" *ngIf=\"admin?.admin_acl['Settings']?.can_create==1\">\n                 <form role=\"form\" novalidate #addTypeForm=\"ngForm\" (ngSubmit)=\"checkIfTypeSpanishNameEntered(addTypeForm, '', addTypeForm.value.name_en, addTypeForm.value.name_es, 1, 'add')\">\n                  <div class=\"row\">\n                    <div class=\"col-lg-6 col-md-6\">\n                        <input type=\"text\" class=\"form-control\" placeholder=\"Property type name (English)\" id=\"name_en\" required [(ngModel)]=\"property.type.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n                        <!-- <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-error\">\n                          <div [hidden]=\"!name_en.errors.required\">\n                            {{constant.errorMsg.PROPERTY_TYPE_REQUIRED}}\n                          </div>\n                      </div>     -->\n                    </div>\n                    <div class=\"col-lg-6 col-md-6\">\n                      <input type=\"text\" class=\"form-control\" placeholder=\"Property type name (Spanish)\" [(ngModel)]=\"property.type.name_es\" name=\"name_es\">\n                    </div>\n                  </div>\n                  <button [disabled]=\"admin?.admin_acl['Settings']?.can_create==0 || addTypeForm.invalid\" type=\"submit\" class=\"add-btn btn\">\n                     <img src=\"./../../../../assets/img/add.png\" alt=\"img\">\n                   </button>\n                 </form>\n              </div>\n           </div>\n        </div>\n    </div>\n\n    <div class=\"tabel-section padding40 paddingT0\">\n        <div class=\"table-responsive\">\n          <table class=\"table table-striped\">\n              <tr>\n                <th style=\"width:40%; text-align:left;\">Name (English)</th>\n                <th style=\"width:40%; text-align:left;\">Name (Spanish)</th>\n                <th style=\"width:20%\">Action</th>\n              </tr>\n              <tr *ngFor=\"let item of parameter.propertyTypes; let j=index\">\n                <td class=\"text-left\">\n                  {{item.name_en}}\n                </td>\n                <td class=\"text-left\">\n                  {{item.name_es}}\n                </td>\n                <td>\n                  <button title=\"Edit\" [disabled]=\"admin?.admin_acl['Settings']?.can_update==0\" \n                  (click)=\"openPropertyTypeModal(addPropertyTypeModal, j, item.id, item.name_en, item.name_es, item.status)\" class=\"action-icon\"><img src=\"./../../../../assets/img/edit.png\" alt=\"img\"></button>\n                \n                  <!-- status = 1 means unblocked -->\n                  <button [disabled]=\"admin?.admin_acl['Settings']?.can_delete==0\"\n                    (click)=\"addPropertyTypePopup(j, item.id, item.name_en, item.name_es, item.status==1?0:1, item.status==1?'block':'unblock')\" \n                    title=\"{{item.status==1?'Block':'Unblock'}}\" [ngClass]=\"{'unblock-bg':item.status==0}\"\n                    class=\"action-icon\"><img src=\"assets/img/block.png\" alt=\"img\">\n                  </button>\n                  <!-- <a title=\"Edit Property Type\" (click)=\"openPropertyTypeModal(addPropertyTypeModal, item.id, item.name_en, item.name_es, item.status)\" class=\"icon-block edit-icon\"><img src=\"./../../../../assets/img/edit.png\" alt=\"img\"></a>\n                  <a *ngIf=\"item.status == 1\" (click)=\"addPropertyTypePopup(item.id, item.name_en, item.name_es, 0, 'block')\" title=\"Block Property Type\" class=\"icon-block block-icon\"><img src=\"./../../../../assets/img/unblock.png\" alt=\"img\"></a>\n                  <a *ngIf=\"item.status == 0\" (click)=\"addPropertyTypePopup(item.id, item.name_en, item.name_es, 1, 'unblock')\" title=\"Unblock Property Type\" class=\"icon-block block-icon unblock-bg\"><img src=\"./../../../../assets/img/block.png\" alt=\"img\"></a> -->\n                </td>\n              </tr>\n\n              <div *ngIf=\"parameter.total == 0\">\n                <p class=\"show-error\">\n                  {{constant.errorMsg.NO_PROPERTY_TYPE_FOUND}}\n                </p>\n              </div>\n          </table>\n        </div>\n    </div>\n\n\n      <div class=\"form-outer\">\n        <div class=\"inline-form-group\">\n            <div class=\"row\">\n              <div class=\"col-md-4\">\n                  <label>Amenities</label>\n              </div>\n              <div class=\"col-md-8\" *ngIf=\"admin?.admin_acl['Settings']?.can_create==1\">\n                 <form role=\"form\" novalidate #addAmenityForm=\"ngForm\" (ngSubmit)=\"checkIfAmenitySpanishNameEntered(addAmenityForm, '', '', addAmenityForm.value.name_en, addAmenityForm.value.name_es, 1, 'add')\">\n                  <div class=\"browse-files\">\n                    <input accept=\"image/*\" (change)=\"changeListner($event)\" type=\"file\" class=\"image form-control\" placeholder=\"Amenity\" id=\"icon\" required [(ngModel)]=\"property.amenities.icon\" name=\"icon\" #icon=\"ngModel\">\n                    <span>Browse</span>\n                    <!-- <div *ngIf=\"icon.errors && (icon.dirty || icon.touched)\" class=\"show-error\">\n                      <div [hidden]=\"!icon.errors.required\">\n                        {{constant.errorMsg.FILE_REQUIRED}}\n                      </div>\n                  </div> -->\n                  </div>\n                  <!-- <input type=\"file\" class=\"form-control\" placeholder=\"Amenity\" id=\"icon\" required [(ngModel)]=\"property.amenities.icon\" name=\"icon\" #icon=\"ngModel\">\n                    <div *ngIf=\"icon.errors && (icon.dirty || icon.touched)\" class=\"show-error\">\n                      <div [hidden]=\"!icon.errors.required\">\n                        {{constant.errorMsg.PROPERTY_TYPE_REQUIRED}}\n                      </div>\n                  </div> -->\n                  \n                  <div class=\"row\">\n                    <div class=\"col-lg-6 col-md-6\">\n                        <input type=\"text\" class=\"form-control\" placeholder=\"Amenity name (English)\" id=\"name_en\" required [(ngModel)]=\"property.amenities.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n                        <!-- <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-error\">\n                          <div [hidden]=\"!name_en.errors.required\">\n                            {{constant.errorMsg.PROPERTY_TYPE_REQUIRED}}\n                          </div>\n                      </div>     -->\n                    </div>\n                    <div class=\"col-lg-6 col-md-6\">\n                        <input type=\"text\" class=\"form-control\" placeholder=\"Amenity name (Spanish)\" [(ngModel)]=\"property.amenities.name_es\" name=\"name_es\">\n                    </div>\n                  </div>\n                  <button [disabled]=\"admin?.admin_acl['Settings']?.can_create==0 || addAmenityForm.invalid\" type=\"submit\" class=\"add-btn btn\">\n                     <img src=\"./../../../../assets/img/add.png\" alt=\"img\">\n                   </button>\n                 </form>\n              </div>\n              <!-- <div class=\"col-md-8\">\n                  <div class=\"browse-files\">\n                    <input type=\"file\" name=\"\">\n                    <span>Browse</span>\n                  </div>\n                  <input type=\"text\" name=\"\">\n                  <button class=\"add-btn\" (click)=\"openAmenitiesModal(addAmenitiesModal, '', '', '', '', 1)\">\n                    <img src=\"./../../../../assets/img/add.png\" alt=\"img\">\n                  </button>\n              </div> -->\n            </div>\n        </div>\n      </div>\n\n      <div class=\"tabel-section padding40\">\n        <div class=\"table-responsive\">\n            <table class=\"table table-striped\">\n              <tr>\n                  <th style=\"width:20%\">Image</th>\n                  <th style=\"width:30%; text-align:left;\">Name (English)</th>\n                  <th style=\"width:30%; text-align:left;\">Name (Spanish)</th>\n                  <th style=\"width:20%\">Action</th>\n              </tr>\n              <tr *ngFor=\"let item of parameter.amenities; let k=index\">\n                  <td>\n                    <!-- <i class=\"fa fa-building\"></i> -->\n                    <img alt=\"image\" height=\"30\" width=\"30\" src=\"{{item.icon}}\">\n                  </td>\n                  <td class=\"text-left\">\n                    {{item.name_en}}\n                  </td>\n                  <td class=\"text-left\">\n                    {{item.name_es}}\n                  </td>\n                  <td>\n                      <button title=\"Edit\" [disabled]=\"admin?.admin_acl['Settings']?.can_update==0\" \n                      (click)=\"openAmenityModal(addAmenityModal, k, item.id, item.icon, item.name_en, item.name_es, item.status)\" class=\"action-icon\"><img src=\"./../../../../assets/img/edit.png\" alt=\"img\"></button>\n                    \n                      <!-- status = 1 means unblocked -->\n                      <button [disabled]=\"admin?.admin_acl['Settings']?.can_delete==0\"\n                        (click)=\"addAmenityPopup(k, item.id, item.icon, item.name_en, item.name_es, item.status==1?0:1, item.status==1?'block':'unblock')\" \n                        title=\"{{item.status==1?'Block':'Unblock'}}\" [ngClass]=\"{'unblock-bg':item.status==0}\"\n                        class=\"action-icon\"><img src=\"assets/img/block.png\" alt=\"img\">\n                      </button>\n                    <!-- <a title=\"Edit Amenity\" (click)=\"openAmenityModal(addAmenityModal, item.id, item.icon, item.name_en, item.name_es, item.status)\" class=\"icon-block edit-icon\"><img src=\"./../../../../assets/img/edit.png\" alt=\"img\"></a>\n                    <a *ngIf=\"item.status == 1\" (click)=\"addAmenityPopup(item.id, item.icon, item.name_en, item.name_es, 0, 'block')\" title=\"Block Amenity\" class=\"icon-block block-icon\"><img src=\"./../../../../assets/img/unblock.png\" alt=\"img\"></a>\n                    <a *ngIf=\"item.status == 0\" (click)=\"addAmenityPopup(item.id, item.icon, item.name_en, item.name_es, 1, 'unblock')\" title=\"Unblock Amenity\" class=\"icon-block block-icon unblock-bg\"><img src=\"./../../../../assets/img/block.png\" alt=\"img\"></a> -->\n                  </td>\n              </tr>\n            </table>\n        </div>\n      </div>\n      <!-- <div class=\"btn-cont text-right padding40 paddingT0\">\n        <button class=\"btn btn-primary\">Save</button>\n      </div> -->\n  </div>\n</div>\n\n\n<!-- add configuration modal -->\n<ng-template #addPropertyConfigModal>\n  <div class=\"modal-content\">\n    <div class=\"modal-header my-modal-header\">\n      <h4 class=\"modal-title\">Edit Property Configuration</h4>\n      <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <form class=\"form-horizontal my-modal-form\" role=\"form\" novalidate #addForm=\"ngForm\" (ngSubmit)=\"checkIfConfigSpanishNameEntered(addForm, property.configuration.id, addForm.value.name_en, addForm.value.name_es, property.configuration.status, 'edit')\">\n      <div class=\"modal-body my-modal-body\">\n        <div class=\"form-group\">\n          <input autocomplete=\"off\" type=\"text\" class=\"form-control\" placeholder=\"Property Configuration (English)\" id=\"name_en\" required [(ngModel)]=\"property.configuration.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n          <!-- <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-error\">\n              <div [hidden]=\"!name_en.errors.required\">\n                {{constant.errorMsg.PROPERTY_TYPE_REQUIRED}}\n              </div>\n          </div> -->\n        </div>\n        <div class=\"form-group\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"Property Configuration (Spanish)\" [(ngModel)]=\"property.configuration.name_es\" name=\"name_es\">\n        </div>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"submit\" [disabled]=\"admin?.admin_acl['Settings']?.can_update==0 || addForm.invalid\" class=\"btn btn-info\">Submit</button>\n        <button type=\"button\" class=\"btn btn-default\" aria-label=\"Close\" (click)=\"modalRef.hide()\">Close</button>\n      </div>\n    </form>\n  </div>\n</ng-template>\n\n\n<!-- add PropertyTypeModal modal -->\n<ng-template #addPropertyTypeModal>\n  <div class=\"modal-content\">\n    <div class=\"modal-header my-modal-header\">\n      <h4 class=\"modal-title\">Edit Property Type</h4>\n      <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <form class=\"form-horizontal my-modal-form\" role=\"form\" novalidate #addForm1=\"ngForm\" (ngSubmit)=\"checkIfTypeSpanishNameEntered(addForm1, property.type.id, addForm1.value.name_en, addForm1.value.name_es, property.type.status, 'edit')\">\n      <div class=\"modal-body my-modal-body\">\n        <div class=\"form-group\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"Property type (English)\" id=\"name_en\" required [(ngModel)]=\"property.type.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n          <!-- <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-error\">\n              <div [hidden]=\"!name_en.errors.required\">\n                {{constant.errorMsg.PROPERTY_TYPE_REQUIRED}}\n              </div>\n          </div> -->\n        </div>\n        <div class=\"form-group\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"Property type (Spanish)\" [(ngModel)]=\"property.type.name_es\" name=\"name_es\">\n        </div>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"submit\" [disabled]=\"admin?.admin_acl['Settings']?.can_update==0 || addForm1.invalid\" class=\"btn btn-info\">Submit</button>\n        <button type=\"button\" class=\"btn btn-default\" aria-label=\"Close\" (click)=\"modalRef.hide()\">Close</button>\n      </div>\n    </form>\n  </div>\n</ng-template>\n\n\n<!-- addAmenitiesModal -->\n<ng-template #addAmenityModal>\n    <div class=\"modal-content\">\n      <div class=\"modal-header my-modal-header\">\n        <h4 class=\"modal-title\">Edit Amenity</h4>\n        <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <form class=\"form-horizontal my-modal-form\" role=\"form\" novalidate #addForm2=\"ngForm\" (ngSubmit)=\"checkIfAmenitySpanishNameEntered(addForm2, property.amenities.id, '', addForm2.value.name_en, addForm2.value.name_es, property.amenities.status, 'edit')\">\n        <div class=\"modal-body my-modal-body\">\n          <div class=\"form-group amenity-img\">\n            <img src=\"{{property.amenities.icon}}\" width=\"100\" height=\"100\" class=\"image1\">\n          </div>\n          <div class=\"form-group\">\n            <input accept=\"image/*\" (change)=\"changeListner1($event)\" type=\"file\" class=\"form-control\">\n          </div>\n          <div class=\"form-group\">\n            <input type=\"text\" class=\"form-control\" placeholder=\"Amenity (English)\" id=\"name_en\" required [(ngModel)]=\"property.amenities.name_en\" name=\"name_en\" #name_en=\"ngModel\">\n            <!-- <div *ngIf=\"name_en.errors && (name_en.dirty || name_en.touched)\" class=\"show-error\">\n                <div [hidden]=\"!name_en.errors.required\">\n                  {{constant.errorMsg.PROPERTY_TYPE_REQUIRED}}\n                </div>\n            </div> -->\n          </div>\n          <div class=\"form-group\">\n            <input type=\"text\" class=\"form-control\" placeholder=\"Amenity (Spanish)\" [(ngModel)]=\"property.amenities.name_es\" name=\"name_es\">\n          </div>\n        </div>\n        <div class=\"modal-footer\">\n          <button type=\"submit\" [disabled]=\"admin?.admin_acl['Settings']?.can_update==0 || addForm2.invalid\" class=\"btn btn-info\">Submit</button>\n          <button type=\"button\" class=\"btn btn-default\" aria-label=\"Close\" (click)=\"modalRef.hide()\">Close</button>\n        </div>\n      </form>\n  </div>\n</ng-template>\n  "

/***/ }),

/***/ "../../../../../src/app/layout/settings/property/property.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_bootstrap_modal__ = __webpack_require__("../../../../ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_property_model__ = __webpack_require__("../../../../../src/app/models/property.model.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PropertyComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var PropertyComponent = /** @class */ (function () {
    function PropertyComponent(element, constant, property, modalService, admin, router) {
        this.element = element;
        this.constant = constant;
        this.property = property;
        this.modalService = modalService;
        this.admin = admin;
        this.router = router;
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
    PropertyComponent.prototype.openPropertyConfigModal = function (template, index, id, name_en, name_es, status) {
        this.parameter.index = index;
        this.property.configuration.id = id;
        this.property.configuration.name_en = name_en;
        this.property.configuration.name_es = name_es == null ? name_en : name_es;
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
    PropertyComponent.prototype.addPropertyConfiguration = function (id, name_en, name_es, status, type) {
        var _this = this;
        if (type === 'edit') {
            this.modalRef.hide();
        }
        this.parameter.url = 'addConfiguration';
        var input = new FormData();
        input.append('name_en', name_en);
        input.append('name_es', name_es);
        input.append('status', status);
        if (id) {
            input.append('id', id);
        }
        this.parameter.loading = true;
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.parameter.loading = false;
            var text = id ?
                _this.constant.successMsg.PROPERTY_CONFIG_UPDATED_SUCCESSFULLY :
                _this.constant.successMsg.PROPERTY_CONFIG_ADDED_SUCCESSFULLY;
            // this.getConfigurations();
            _this.property.configuration.id = '';
            _this.property.configuration.name_en = '';
            _this.property.configuration.name_es = '';
            swal('Success', text, 'success');
            if (_this.parameter.index !== -1) {
                _this.parameter.items[_this.parameter.index] = success.data;
            }
            else {
                _this.parameter.items.push(success.data);
            }
            _this.parameter.index = -1;
        }, function (error) {
            _this.parameter.loading = false;
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
        this.parameter.loading = true;
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.parameter.loading = false;
            var text = id ?
                _this.constant.successMsg.PROPERTY_TYPE_UPDATED_SUCCESSFULLY :
                _this.constant.successMsg.PROPERTY_TYPE_ADDED_SUCCESSFULLY;
            swal('Success', text, 'success');
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
            _this.parameter.loading = false;
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
        this.parameter.loading = true;
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.parameter.loading = false;
            var text = id ?
                _this.constant.successMsg.AMENITY_UPDATED_SUCCESSFULLY :
                _this.constant.successMsg.AMENITY_ADDED_SUCCESSFULLY;
            swal('Success', text, 'success');
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
            _this.parameter.loading = false;
        });
    };
    PropertyComponent.prototype.getConfigurations = function () {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'getConfigurations';
        var input = new FormData();
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.parameter.loading = false;
            _this.parameter.items = success.data;
            _this.parameter.total = success.data.length;
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    PropertyComponent.prototype.getPropertyTypes = function () {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'getPropertyTypes';
        var input = new FormData();
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.parameter.loading = false;
            _this.parameter.propertyTypes = success.data;
            _this.parameter.propertyTypesCount = success.data.length;
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    PropertyComponent.prototype.getAmenities = function () {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'getPropertyAmenities';
        var input = new FormData();
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.parameter.loading = false;
            _this.parameter.amenities = success.data;
            _this.parameter.amenitiesCount = success.data.length;
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    PropertyComponent.prototype.addPropertyConfigurationPopup = function (index, id, name_en, name_es, status, type) {
        var _this = this;
        this.parameter.index = index;
        var self = this;
        var text = status === 1 ? this.constant.title.UNBLOCK_PROPERTY_CONFIG : this.constant.title.BLOCK_PROPERTY_CONFIG;
        swal({
            // title: this.constant.title.ARE_YOU_SURE,
            // text: status === 1 ? this.constant.title.UNBLOCK_PROPERTY_CONFIG : this.constant.title.BLOCK_PROPERTY_CONFIG,
            html: this.constant.title.ARE_YOU_SURE + '<br>' + text,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.addPropertyConfiguration(id, name_en, name_es, status, type);
            }
        });
    };
    PropertyComponent.prototype.addPropertyTypePopup = function (index, id, name_en, name_es, status, type) {
        var _this = this;
        this.parameter.index = index;
        var self = this;
        var text = status === 1 ? this.constant.title.UNBLOCK_PROPERTY_TYPE : this.constant.title.BLOCK_PROPERTY_TYPE;
        swal({
            // title: this.constant.title.ARE_YOU_SURE,
            // text: status === 1 ? this.constant.title.UNBLOCK_PROPERTY_TYPE : this.constant.title.BLOCK_PROPERTY_TYPE,
            html: this.constant.title.ARE_YOU_SURE + '<br>' + text,
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
        var text = status === 1 ? this.constant.title.UNBLOCK_AMENITY : this.constant.title.BLOCK_AMENITY;
        swal({
            // title: this.constant.title.ARE_YOU_SURE,
            // text: status === 1 ? this.constant.title.UNBLOCK_AMENITY : this.constant.title.BLOCK_AMENITY,
            html: this.constant.title.ARE_YOU_SURE + '<br>' + text,
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
    PropertyComponent.prototype.checkIfConfigSpanishNameEntered = function (formdata, id, name_en, name_es, status, type) {
        var _this = this;
        var self = this;
        formdata.reset();
        if (name_es === '') {
            swal({
                text: this.constant.errorMsg.SAVE_ENGLISH_PROPERTY_CONFIG,
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: this.constant.confirmButtonColor,
                cancelButtonColor: this.constant.cancelButtonColor,
                confirmButtonText: 'Yes'
            }).then(function (result) {
                if (result.value) {
                    _this.addPropertyConfiguration(id, name_en, name_en, status, type);
                }
            });
        }
        else {
            self.addPropertyConfiguration(id, name_en, name_es, status, type);
        }
    };
    PropertyComponent.prototype.checkIfTypeSpanishNameEntered = function (formdata, id, name_en, name_es, status, type) {
        var _this = this;
        var self = this;
        formdata.reset();
        if (name_es === '') {
            swal({
                text: this.constant.errorMsg.SAVE_ENGLISH_PROPERTY_TYPE,
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
                text: this.constant.errorMsg.SAVE_ENGLISH_AMENITY,
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
    var _a, _b, _c, _d, _e, _f;
    PropertyComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-property',
            template: __webpack_require__("../../../../../src/app/layout/settings/property/property.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/settings/property/property.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_4__common_constants__["a" /* Constant */], __WEBPACK_IMPORTED_MODULE_5__models_property_model__["a" /* Property */]]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _a : Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__common_constants__["a" /* Constant */]) === "function" ? _b : Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__models_property_model__["a" /* Property */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__models_property_model__["a" /* Property */]) === "function" ? _c : Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3_ngx_bootstrap_modal__["b" /* BsModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ngx_bootstrap_modal__["b" /* BsModalService */]) === "function" ? _d : Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" ? _e : Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"]) === "function" ? _f : Object])
    ], PropertyComponent);
    return PropertyComponent;
}());

//# sourceMappingURL=property.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/settings/settings.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/settings/settings.component.html":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "../../../../../src/app/layout/settings/settings.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SettingsComponent = /** @class */ (function () {
    function SettingsComponent() {
    }
    SettingsComponent.prototype.ngOnInit = function () {
    };
    SettingsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-settings',
            template: __webpack_require__("../../../../../src/app/layout/settings/settings.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/settings/settings.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], SettingsComponent);
    return SettingsComponent;
}());

//# sourceMappingURL=settings.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/settings/settings.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_loading__ = __webpack_require__("../../../../ngx-loading/ngx-loading/ngx-loading.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ngx_bootstrap_modal__ = __webpack_require__("../../../../ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__agm_core__ = __webpack_require__("../../../../@agm/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_tel_input__ = __webpack_require__("../../../../ng2-tel-input/ng2-tel-input.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_tel_input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_ng2_tel_input__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__location_location_component__ = __webpack_require__("../../../../../src/app/layout/settings/location/location.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__settings_component__ = __webpack_require__("../../../../../src/app/layout/settings/settings.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__locality_locality_component__ = __webpack_require__("../../../../../src/app/layout/settings/locality/locality.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__property_property_component__ = __webpack_require__("../../../../../src/app/layout/settings/property/property.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__project_project_component__ = __webpack_require__("../../../../../src/app/layout/settings/project/project.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__edit_profile_edit_profile_component__ = __webpack_require__("../../../../../src/app/layout/settings/edit-profile/edit-profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__documents_documents_component__ = __webpack_require__("../../../../../src/app/layout/settings/documents/documents.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__guards_acl_user_guard__ = __webpack_require__("../../../../../src/app/guards/acl-user.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__profile_profile_component__ = __webpack_require__("../../../../../src/app/layout/settings/profile/profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__change_password_change_password_component__ = __webpack_require__("../../../../../src/app/layout/settings/change-password/change-password.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__default_settings_default_settings_component__ = __webpack_require__("../../../../../src/app/layout/settings/default-settings/default-settings.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsModule", function() { return SettingsModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// third party libraries









// components











var routes = [
    { path: 'view-profile', component: __WEBPACK_IMPORTED_MODULE_17__profile_profile_component__["a" /* ProfileComponent */] },
    { path: 'change-password', component: __WEBPACK_IMPORTED_MODULE_18__change_password_change_password_component__["a" /* ChangePasswordComponent */] },
    { path: 'default-settings', component: __WEBPACK_IMPORTED_MODULE_19__default_settings_default_settings_component__["a" /* DefaultSettingsComponent */] },
    { path: 'edit-profile', component: __WEBPACK_IMPORTED_MODULE_14__edit_profile_edit_profile_component__["a" /* EditProfileComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_16__guards_acl_user_guard__["a" /* AclUserGuard */]], data: { roles: ['Settings', 'can_read', ''] } },
    { path: 'setting-location', component: __WEBPACK_IMPORTED_MODULE_9__location_location_component__["a" /* LocationComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_16__guards_acl_user_guard__["a" /* AclUserGuard */]], data: { roles: ['Settings', 'can_read', ''] } },
    { path: 'setting-locality', component: __WEBPACK_IMPORTED_MODULE_11__locality_locality_component__["a" /* LocalityComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_16__guards_acl_user_guard__["a" /* AclUserGuard */]], data: { roles: ['Settings', 'can_read', ''] } },
    { path: 'setting-property', component: __WEBPACK_IMPORTED_MODULE_12__property_property_component__["a" /* PropertyComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_16__guards_acl_user_guard__["a" /* AclUserGuard */]], data: { roles: ['Settings', 'can_read', ''] } },
    { path: 'setting-project', component: __WEBPACK_IMPORTED_MODULE_13__project_project_component__["a" /* ProjectComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_16__guards_acl_user_guard__["a" /* AclUserGuard */]], data: { roles: ['Settings', 'can_read', ''] } },
    { path: 'documents-listing', component: __WEBPACK_IMPORTED_MODULE_15__documents_documents_component__["a" /* DocumentsComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_16__guards_acl_user_guard__["a" /* AclUserGuard */]], data: { roles: ['Settings', 'can_read', ''] } }
];
var SettingsModule = /** @class */ (function () {
    function SettingsModule() {
    }
    SettingsModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_14__edit_profile_edit_profile_component__["a" /* EditProfileComponent */],
                __WEBPACK_IMPORTED_MODULE_9__location_location_component__["a" /* LocationComponent */],
                __WEBPACK_IMPORTED_MODULE_11__locality_locality_component__["a" /* LocalityComponent */],
                __WEBPACK_IMPORTED_MODULE_12__property_property_component__["a" /* PropertyComponent */],
                __WEBPACK_IMPORTED_MODULE_13__project_project_component__["a" /* ProjectComponent */],
                __WEBPACK_IMPORTED_MODULE_10__settings_component__["a" /* SettingsComponent */],
                __WEBPACK_IMPORTED_MODULE_15__documents_documents_component__["a" /* DocumentsComponent */],
                __WEBPACK_IMPORTED_MODULE_17__profile_profile_component__["a" /* ProfileComponent */],
                __WEBPACK_IMPORTED_MODULE_18__change_password_change_password_component__["a" /* ChangePasswordComponent */],
                __WEBPACK_IMPORTED_MODULE_19__default_settings_default_settings_component__["a" /* DefaultSettingsComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_8__angular_router__["RouterModule"].forChild(routes),
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["a" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["ReactiveFormsModule"],
                __WEBPACK_IMPORTED_MODULE_5_ngx_bootstrap_modal__["a" /* ModalModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_4_ngx_loading__["a" /* LoadingModule */].forRoot({
                    animationType: __WEBPACK_IMPORTED_MODULE_4_ngx_loading__["b" /* ANIMATION_TYPES */].rectangleBounce,
                    // backdropBackgroundColour: 'rgba(0,0,0,0.5)',
                    // backdropBorderRadius: '4px',
                    primaryColour: '#00B96F'
                }),
                __WEBPACK_IMPORTED_MODULE_6__agm_core__["a" /* AgmCoreModule */].forRoot({
                    apiKey: 'AIzaSyCYv_zELZGVo2Ehzgp8eh8UeSIidhMCmH8',
                    libraries: ['drawing', 'places']
                }),
                __WEBPACK_IMPORTED_MODULE_7_ng2_tel_input__["Ng2TelInputModule"]
            ],
            exports: [__WEBPACK_IMPORTED_MODULE_8__angular_router__["RouterModule"]]
        })
    ], SettingsModule);
    return SettingsModule;
}());

//# sourceMappingURL=settings.module.js.map

/***/ }),

/***/ "../../../../../src/app/models/document.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Document; });
var Document = /** @class */ (function () {
    function Document() {
    }
    return Document;
}());

//# sourceMappingURL=document.model.js.map

/***/ }),

/***/ "../../../../../src/app/models/locality.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Locality; });
var Locality = /** @class */ (function () {
    function Locality() {
    }
    return Locality;
}());

//# sourceMappingURL=locality.model.js.map

/***/ }),

/***/ "../../../../../src/app/models/location.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Location; });
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

//# sourceMappingURL=location.model.js.map

/***/ }),

/***/ "../../../../../src/app/models/project.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Project; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Amenities; });
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

//# sourceMappingURL=project.model.js.map

/***/ }),

/***/ "../../../../../src/app/models/property.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Property; });
var Property = /** @class */ (function () {
    function Property() {
        this.configuration = {
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
    return Property;
}());

//# sourceMappingURL=property.model.js.map

/***/ }),

/***/ "../../../../../src/app/models/settings.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Settings; });
var Settings = /** @class */ (function () {
    function Settings() {
    }
    return Settings;
}());

//# sourceMappingURL=settings.model.js.map

/***/ })

});
//# sourceMappingURL=2.chunk.js.map