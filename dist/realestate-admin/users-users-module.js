(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["users-users-module"],{

/***/ "./src/app/layout/users/users.component.css":
/*!**************************************************!*\
  !*** ./src/app/layout/users/users.component.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".add-img{\n    background-size: cover;background-repeat: no-repeat;\n}"

/***/ }),

/***/ "./src/app/layout/users/users.component.html":
/*!***************************************************!*\
  !*** ./src/app/layout/users/users.component.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container-fluid\">\n  <div class=\"row\">\n      <div class=\"col-md-6 col-6\">\n        <div class=\"title-group\">\n            <h5>Users</h5>\n            <p>Showing {{parameter.items?.length}} out of {{parameter.total}}</p>\n        </div>\n      </div>\n      <div class=\"col-md-6 col-6\">\n        <div class=\"btn-cont text-right\">\n            <a style=\"display: none;\" class=\"btn btn-primary\" href=\"javascript://\" data-toggle=\"modal\" data-target=\"#add\" #modalOpen>Add New</a>\n            <a *ngIf=\"admin?.admin_acl['User Management']?.can_create==1\" (click)=\"openModal()\" class=\"btn btn-primary\" href=\"javascript://\">Add New</a>\n            <!-- <a *ngIf=\"admin?.admin_acl['User Management']?.can_create==1\" class=\"btn btn-primary\" href=\"javascript://\" data-toggle=\"modal\" data-target=\"#add\" #modalOpen>Add New</a> -->\n        </div>\n      </div>\n  </div>\n\n  <div class=\"cust-tabs\">\n    <div class=\"row flex-wrap-reverse\">\n      <div class=\"col-xl-10 col-lg-12 col-md-12 col-sm-12 col-12\">\n        <ul class=\"nav nav-tabs\">\n          <li class=\"nav-item\">\n              <a class=\"nav-link active\" (click)=\"getBuyers(1, 1, '', '', '')\" data-toggle=\"tab\" href=\"#approved\">BUYER</a>\n          </li>\n          <li class=\"nav-item\">\n              <a class=\"nav-link\" (click)=\"getBuyers(2, 1, '', '', '')\" data-toggle=\"tab\" href=\"#unapproved\">SELLER</a>\n          </li>\n        </ul>\n      </div>\n    </div>\n\n    <div class=\"tab-content white-bg\">\n      <div class=\"tab-pane active\">\n        <div class=\"tabel-section\">\n          <div class=\"table-responsive\">\n            <table class=\"table table-striped table-align-left\">\n              <tr>\n                <th style=\"width:6%\">&nbsp;</th>\n                <th style=\"width:20%\">\n                  <div class=\"table-search\">\n                      <label>Name</label>\n                      <div class=\"searh-3\">\n                        <input type=\"text\" [(ngModel)]=\"parameter.name\" (keyup.enter)=\"getBuyers(parameter.type, parameter.page, parameter.name, parameter.phone, parameter.email)\" name=\"\">\n                        <button *ngIf=\"parameter.name\" (click)=\"getBuyers(parameter.type, parameter.page, parameter.name, parameter.phone, parameter.email)\"><i class=\"fa fa-search\"></i></button>\n                      </div>\n                  </div>\n                </th>\n                <th style=\"width:20%; text-align:left;\">\n                  <div class=\"table-search\">\n                      <label>Contact Number</label>\n                      <div class=\"searh-3\">\n                        <input type=\"text\" [(ngModel)]=\"parameter.phone\" (keyup.enter)=\"getBuyers(parameter.type, parameter.page, parameter.name, parameter.phone, parameter.email)\" name=\"\">\n                        <button *ngIf=\"parameter.phone\" (click)=\"getBuyers(parameter.type, parameter.page, parameter.name, parameter.phone, parameter.email)\"><i class=\"fa fa-search\"></i></button>\n                      </div>\n                  </div>\n                </th>\n                <th style=\"width:20%\">\n                  <div class=\"table-search\">\n                      <label>Email Address</label>\n                      <div class=\"searh-3\">\n                        <input (keydown.space)=\"$event.preventDefault();\" type=\"text\" [(ngModel)]=\"parameter.email\" (keyup.enter)=\"getBuyers(parameter.type, parameter.page, parameter.name, parameter.phone, parameter.email)\" name=\"\">\n                        <button *ngIf=\"parameter.email\" (click)=\"getBuyers(parameter.type, parameter.page, parameter.name, parameter.phone, parameter.email)\"><i class=\"fa fa-search\"></i></button>\n                      </div>\n                  </div>\n                </th>\n                <th style=\"width:20%; vertical-align: top;\" *ngIf=\"parameter.type==1\">\n                  <div class=\"table-search\">\n                    <label>Interested In</label>\n                  </div>\n                </th>\n                <th style=\"width:20%; vertical-align: top;\" *ngIf=\"parameter.type==2\">\n                  <div class=\"table-search\">\n                    <label>Properties</label>\n                    <a (click)=\"sortData(parameter.property_sort==2?1:2, 'property_sort')\" href=\"javascript://\"><img [ngClass]=\"{'upsidedown':parameter.property_sort==2}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n                  </div>\n                </th>\n                <th style=\"width:14%\">\n                  &nbsp;\n                </th>\n              </tr>\n        \n              <tr *ngFor=\"let item of parameter.items| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: parameter.total }; let i=index\">\n                <td> \n                    <img *ngIf=\"item.image\" [defaultImage]=\"item.image| img:'thumb'\" [lazyLoad]=\"item.image\" class=\"rounded-circle\" alt=\"img\">\n                    <img *ngIf=\"!item.image\" class=\"rounded-circle\" src=\"assets/img/default_img.png\" alt=\"img\">\n                </td>\n                <td class=\"text-left\">\n                    <a class=\"text-ellipsis\" data-toggle=\"popover\" data-placement=\"top\" title=\"{{item.name}}\">\n                      {{item.name | titlecase}}\n                    </a>\n                </td>\n                <td class=\"text-left\" *ngIf=\"item.phone\">{{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}</td>\n                <td class=\"text-left\" *ngIf=\"!item.phone\">NA</td>\n                <td class=\"text-left\">{{item.email}}</td>\n                <td *ngIf=\"parameter.type==1\">\n                  <span *ngFor=\"let interest of item.interests; let ii=index\">\n                    <app-property-configuration *ngIf=\"interest\" [configuration]=\"interest\"></app-property-configuration>\n                    <span *ngIf=\"ii<item.interests?.length-1\">, </span>\n                  </span>\n                  <span *ngIf=\"item.interests?.length == 0\">NA</span>\n                </td>\n                <td *ngIf=\"parameter.type==2\">{{item.properties_count}}</td>\n                <td>\n                  <div class=\"table-actions\">\n                      <!-- <a href=\"javascript://\" (click)=\"editUser(item, i)\" class=\"icon-block edit-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></a>\n                      <a href=\"javascript://\" *ngIf=\"item.is_blocked == 1\" (click)=\"blockUnblockPopup(i, item.id, 0, parameter.type)\" title=\"Unblock user\" class=\"icon-block block-icon unblock-bg\"><img src=\"assets/img/block.png\" alt=\"img\"></a>\n                      <a href=\"javascript://\" *ngIf=\"item.is_blocked == 0\" (click)=\"blockUnblockPopup(i, item.id, 1, parameter.type)\" title=\"Block user\" class=\"icon-block block-icon\"><img src=\"assets/img/unblock.png\" alt=\"img\"></a> -->\n                      <button title=\"Edit Details\" [disabled]=\"admin?.admin_acl['User Management']?.can_update==0\" (click)=\"editUser(item, i)\" class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></button>\n                      <button [disabled]=\"admin?.admin_acl['User Management']?.can_delete==0\"\n                        (click)=\"blockUnblockPopup(i, item.id, item.is_blocked==1?0:1, parameter.type)\" \n                        title=\"{{item.is_blocked==1?'Unblock User':'Block User'}}\" [ngClass]=\"{'unblock-bg':item.is_blocked==1}\"\n                        class=\"action-icon\"><img src=\"assets/img/block.png\" alt=\"img\">\n                      </button>\n                      <button [disabled]=\"admin?.admin_acl['User Management']?.can_purge==0\"\n                        (click)=\"deletePopup(i, item.id, parameter.type)\" \n                        title=\"Delete User\"\n                        class=\"action-icon\"><img src=\"assets/img/ic_delete.png\" alt=\"img\">\n                      </button>\n                  </div>\n                </td>\n              </tr>\n\n            </table>\n          </div>\n        </div>\n\n        <div class=\"center\" *ngIf=\"parameter.total == 0\">\n          <img src=\"assets/img/404-error.png\">\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"btn-cont text-right marginT15\" *ngIf=\"parameter.total\">\n    <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n  </div>\n  \n</div>\n\n\n<!-- add inhouse user modal -->\n<div class=\"modal animated\" id=\"add\">\n  <div class=\"modal-dialog fadeIndown\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n          <button style=\"display: none;\" type=\"button\" class=\"close\" data-dismiss=\"modal\" #modalClose>&times;</button>\n          <button type=\"button\" class=\"close\" (click)=\"closeModal(); addForm.reset()\">&times;</button>\n      </div>\n\n      <form class=\"form-horizontal form-model0P\" role=\"form\" ngNativeValidate #addForm=\"ngForm\" (ngSubmit)=\"addNewUser(addForm)\">\n        <div class=\"modal-body\">\n          <div class=\"row\">\n            <div class=\"col-8\">\n              <!-- <div class=\"add-img\" [style.background-image]=\"image1\">\n              <input accept=\"image/*\" name=\"image\" class=\"image\" (change)=\"changeListner($event)\" type=\"file\">\n              <label *ngIf=\"!image1\">+ Add Image</label>\n              </div> -->\n              <div class=\"add-img\" style=\"display:flex;\">\n                <img *ngIf=\"image\" [src]=\"image\" style=\"object-fit: cover; width: 100%;\">\n                <label *ngIf=\"model.image\">\n                  <input accept=\"image/*\" name=\"image\" class=\"image\" (change)=\"changeListner($event, 1)\" type=\"file\">\n                </label>\n                <label *ngIf=\"!image\">+ Add Image</label>\n                <input *ngIf=\"!image\" accept=\"image/*\" name=\"image\" class=\"image\" (change)=\"changeListner($event, 1)\" type=\"file\">\n              </div>\n            </div>\n            <!-- <div *ngIf=\"parameter.type==2\" class=\"col-4\">\n              <div class=\"add-img\" style=\"display:flex;\">\n                <img *ngIf=\"developer_image\" [src]=\"developer_image\" style=\"object-fit: cover; width: 100%;\">\n                <label *ngIf=\"model.developer_image\">\n                  <input accept=\"image/*\" name=\"developer_image\" class=\"image\" (change)=\"changeListner($event, 2)\" type=\"file\">\n                </label>\n                <label *ngIf=\"!developer_image\">+ Add Cover Image</label>\n                <input *ngIf=\"!developer_image\" accept=\"image/*\" name=\"developer_image\" class=\"image\" (change)=\"changeListner($event, 2)\" type=\"file\">\n              </div>\n            </div> -->\n            <div class=\"col-4\">\n              <div class=\"btn-cont text-right\">\n                  <button *ngIf=\"!model.id\" type=\"submit\" class=\"btn btn-primary-new\">ADD</button>\n                  <button *ngIf=\"model.id\" type=\"submit\" [disabled]=\"!addForm.valid\" class=\"btn btn-primary-new\">UPDATE</button>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"spacer40\"></div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                  <label>Name <span class=\"color-red\">*</span></label>\n                  <div class=\"form-group\">\n                  <input autocomplete=\"off\" required type=\"text\" class=\"form-control\" #name=\"ngModel\" [(ngModel)]=\"model.name\" name=\"name\">\n                </div>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                  <label>Contact number <span class=\"color-red\">*</span></label>\n                  <div class=\"form-group\">\n                  <input minlength=\"6\" maxlength=\"16\" autocomplete=\"off\" type=\"text\" [pattern]=\"constant.phonePattern\" class=\"form-control\" id=\"phone\" required minlength=\"1\" [(ngModel)]=\"model.phone\" name=\"phone\"\n                      ng2TelInput\n                      (intlTelInputObject)=\"telInputObject($event)\" [ng2TelInputOptions]=\"initialCountry\" (countryChange)=\"onCountryChange($event)\" />\n                </div>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                  <label>Email ID <span class=\"color-red\">*</span></label>\n                  <div class=\"form-group\">\n                  <input (keydown.space)=\"$event.preventDefault();\" autocomplete=\"off\" required [pattern]=\"constant.emailPattern\" type=\"email\" class=\"form-control\" [(ngModel)]=\"model.email\" name=\"email\">\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/layout/users/users.component.ts":
/*!*************************************************!*\
  !*** ./src/app/layout/users/users.component.ts ***!
  \*************************************************/
/*! exports provided: UsersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersComponent", function() { return UsersComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var src_app_models_users_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/users.model */ "./src/app/models/users.model.ts");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UsersComponent = /** @class */ (function () {
    function UsersComponent(constant, model, admin, spinner) {
        this.constant = constant;
        this.model = model;
        this.admin = admin;
        this.spinner = spinner;
        this.parameter = {};
    }
    UsersComponent.prototype.ngOnInit = function () {
        this.parameter.property_sort = 2;
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        this.parameter.type = 1;
        this.initialCountry = { initialCountry: this.constant.country_code };
        this.getBuyers(this.parameter.type, this.parameter.page, '', '', '');
    };
    UsersComponent.prototype.telInputObject = function (obj) {
        this.obj = obj;
    };
    UsersComponent.prototype.openModal = function () {
        this.model = new src_app_models_users_model__WEBPACK_IMPORTED_MODULE_2__["Users"]();
        this.image = '';
        this.developer_image = '';
        this.model.country_code = this.constant.country_code;
        this.model.dial_code = this.constant.dial_code;
        this.modalOpen.nativeElement.click();
    };
    UsersComponent.prototype.closeModal = function () {
        this.model = new src_app_models_users_model__WEBPACK_IMPORTED_MODULE_2__["Users"]();
        this.image = '';
        this.developer_image = '';
        this.modalClose.nativeElement.click();
    };
    UsersComponent.prototype.getPage = function (page) {
        this.parameter.page = page;
        this.getBuyers(this.parameter.type, this.parameter.page, this.parameter.name, this.parameter.phone, this.parameter.email);
    };
    UsersComponent.prototype.sortData = function (value, param) {
        this.parameter.property_sort = value;
        this.getBuyers(this.parameter.type, this.parameter.page, this.parameter.name, this.parameter.phone, this.parameter.email);
    };
    UsersComponent.prototype.getBuyers = function (type, page, name, phone, email) {
        var _this = this;
        this.parameter.page = page;
        this.parameter.type = type;
        this.parameter.name = name;
        this.parameter.phone = phone;
        this.parameter.email = email;
        this.parameter.url = this.parameter.type === 1 ? 'getBuyers' : 'getSellers';
        this.spinner.show();
        this.admin.postDataApi(this.parameter.url, this.parameter)
            .subscribe(function (success) {
            _this.spinner.hide();
            _this.parameter.items = success.data;
            _this.parameter.total = success.total;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    UsersComponent.prototype.changeListner = function (event, type) {
        var _this = this;
        if (event.target.files[0].size > this.constant.fileSizeLimit) {
            swal('Error', this.constant.errorMsg.FILE_SIZE_EXCEEDS, 'error');
            return false;
        }
        if (type === 1) {
            this.model.image = event.target.files[0];
        }
        else {
            this.model.developer_image = event.target.files[0];
        }
        var reader = new FileReader();
        reader.onload = function (e) {
            if (type === 1) {
                _this.image = e.target.result;
            }
            else {
                _this.developer_image = e.target.result;
            }
        };
        reader.readAsDataURL(event.target.files[0]);
    };
    UsersComponent.prototype.onCountryChange = function (e) {
        this.model.country_code = e.iso2;
        this.model.dial_code = '+' + e.dialCode;
        this.initialCountry = { initialCountry: e.iso2 };
    };
    UsersComponent.prototype.addNewUser = function (formdata) {
        var _this = this;
        this.parameter.url = 'addSeller';
        var input = new FormData();
        // dont send model, cuz need to send file
        if (this.model.id) {
            input.append('id', this.model.id);
        }
        input.append('name', this.model.name);
        input.append('country_code', this.model.country_code);
        input.append('dial_code', this.model.dial_code);
        input.append('phone', this.model.phone);
        input.append('email', this.model.email);
        if (this.model.image) {
            input.append('image', this.model.image);
        }
        if (this.model.developer_image) {
            input.append('developer_image', this.model.developer_image);
        }
        this.spinner.show();
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.spinner.hide();
            _this.modalClose.nativeElement.click();
            var text = _this.model.id ? 'Updated successfully.' : 'Added successfully.';
            swal('Success', text, 'success');
            if (_this.model.id) {
                _this.parameter.items[_this.parameter.index] = success.data;
            }
            else if (_this.parameter.items.length < 10 && !_this.model.id) {
                _this.parameter.items.push(success.data);
                _this.parameter.total++;
            }
            formdata.reset();
        }, function (error) {
            _this.spinner.hide();
        });
    };
    UsersComponent.prototype.editUser = function (userdata, index) {
        this.parameter.index = index;
        this.model = userdata;
        this.image = userdata.image;
        this.developer_image = userdata.developer_image;
        this.model.image = userdata.image != null ? userdata.image : '';
        this.model.developer_image = userdata.developer_image != null ? userdata.developer_image : '';
        if (this.obj) {
            this.obj.intlTelInput('setCountry', this.model.country_code);
        }
        this.modalOpen.nativeElement.click();
    };
    UsersComponent.prototype.blockUnblockPopup = function (index, id, flag, user_type) {
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
    UsersComponent.prototype.blockAdmin = function (index, id, flag, user_type) {
        var _this = this;
        this.parameter.index = index;
        var input = new FormData();
        input.append('id', id);
        input.append('flag', flag);
        input.append('user_type', user_type);
        this.admin.postDataApi('blockBuyerSeller', input)
            .subscribe(function (success) {
            swal('Success', _this.parameter.successText, 'success');
            _this.parameter.items[_this.parameter.index]['is_blocked'] = flag;
        });
    };
    UsersComponent.prototype.deletePopup = function (index, id, user_type) {
        var _this = this;
        this.parameter.index = index;
        this.parameter.title = this.constant.title.ARE_YOU_SURE;
        this.parameter.text = 'You want to delete user?';
        swal({
            html: this.parameter.title + '<br>' + this.parameter.text,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.deleteBuyerSeller(index, id, user_type);
            }
        });
    };
    UsersComponent.prototype.deleteBuyerSeller = function (index, id, user_type) {
        var _this = this;
        this.parameter.index = index;
        var input = new FormData();
        input.append('id', id);
        input.append('user_type', user_type);
        this.admin.postDataApi('deleteBuyerSeller', input)
            .subscribe(function (success) {
            swal('Success', 'Deleted successfully.', 'success');
            _this.parameter.items.splice(index, 1);
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalOpen'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], UsersComponent.prototype, "modalOpen", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], UsersComponent.prototype, "modalClose", void 0);
    UsersComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-users',
            template: __webpack_require__(/*! ./users.component.html */ "./src/app/layout/users/users.component.html"),
            styles: [__webpack_require__(/*! ./users.component.css */ "./src/app/layout/users/users.component.css")],
            providers: [src_app_models_users_model__WEBPACK_IMPORTED_MODULE_2__["Users"], src_app_common_constants__WEBPACK_IMPORTED_MODULE_3__["Constant"]]
        }),
        __metadata("design:paramtypes", [src_app_common_constants__WEBPACK_IMPORTED_MODULE_3__["Constant"], src_app_models_users_model__WEBPACK_IMPORTED_MODULE_2__["Users"], src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_4__["AdminService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_1__["NgxSpinnerService"]])
    ], UsersComponent);
    return UsersComponent;
}());



/***/ }),

/***/ "./src/app/layout/users/users.module.ts":
/*!**********************************************!*\
  !*** ./src/app/layout/users/users.module.ts ***!
  \**********************************************/
/*! exports provided: UsersModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersModule", function() { return UsersModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ng2_tel_input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ng2-tel-input */ "./node_modules/ng2-tel-input/ng2-tel-input.js");
/* harmony import */ var ng_lazyload_image__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng-lazyload-image */ "./node_modules/ng-lazyload-image/fesm5/ng-lazyload-image.js");
/* harmony import */ var _users_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./users.component */ "./src/app/layout/users/users.component.ts");
/* harmony import */ var _guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../guards/acl-user.guard */ "./src/app/guards/acl-user.guard.ts");
/* harmony import */ var _modules_shared_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../modules/shared.module */ "./src/app/modules/shared.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// third party libraries











var routes = [
    { path: '', component: _users_component__WEBPACK_IMPORTED_MODULE_8__["UsersComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_9__["AclUserGuard"]], data: { roles: ['User Management', 'can_read', ''] } }
];
var UsersModule = /** @class */ (function () {
    function UsersModule() {
    }
    UsersModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes),
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerModule"],
                ng_lazyload_image__WEBPACK_IMPORTED_MODULE_7__["LazyLoadImageModule"],
                ngx_pagination__WEBPACK_IMPORTED_MODULE_4__["NgxPaginationModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
                ng2_tel_input__WEBPACK_IMPORTED_MODULE_6__["Ng2TelInputModule"],
                _modules_shared_module__WEBPACK_IMPORTED_MODULE_10__["SharedModule"]
            ],
            declarations: [
                _users_component__WEBPACK_IMPORTED_MODULE_8__["UsersComponent"]
            ]
        })
    ], UsersModule);
    return UsersModule;
}());



/***/ })

}]);
//# sourceMappingURL=users-users-module.js.map