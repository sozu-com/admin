webpackJsonp([2],{

/***/ "../../../../../src/app/layout/users/users.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/users/users.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container-fluid\">\n  <div class=\"row\">\n      <div class=\"col-md-6\">\n        <div class=\"title-group\">\n            <h5>Users</h5>\n            <p>Showing {{parameter.total}} out of {{parameter.total}}</p>\n        </div>\n      </div>\n      <div class=\"col-md-6\">\n        <div class=\"add-new text-right\">\n            <a class=\"btn\" href=\"javascript://\" data-toggle=\"modal\" data-target=\"#add\" #modalOpen>Add New</a>\n        </div>\n      </div>\n  </div>\n\n  <ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n\n  <div class=\"cust-tabs\">\n    <div class=\"row flex-wrap-reverse\">\n      <div class=\"col-xl-10 col-lg-12 col-md-12 col-sm-12 col-12\">\n        <ul class=\"nav nav-tabs\">\n          <li class=\"nav-item\">\n              <a class=\"nav-link active\" (click)=\"getBuyers(1, parameter.p, '', '', '')\" data-toggle=\"tab\" href=\"#approved\">BUYER</a>\n          </li>\n          <li class=\"nav-item\">\n              <a class=\"nav-link\" (click)=\"getBuyers(2, parameter.p, '', '', '')\" data-toggle=\"tab\" href=\"#unapproved\">SELLER</a>\n          </li>\n        </ul>\n      </div>\n    </div>\n\n    <div class=\"tab-content white-bg\">\n      <div class=\"tab-pane active\">\n        <div class=\"tabel-section\">\n          <div class=\"table-responsive\">\n            <table class=\"table table-striped table-align-left\">\n              <tr>\n                <th style=\"width:6%\">&nbsp;</th>\n                <th style=\"width:20%\">\n                  <div class=\"table-search\">\n                      <label>Name</label>\n                      <input type=\"Search here\" (input)=\"getBuyers(parameter.type, parameter.p, $event.target.value, parameter.phone, parameter.email)\" name=\"\">\n                  </div>\n                </th>\n                <th style=\"width:20%; text-align:left;\">\n                  <div class=\"table-search\">\n                      <label>Contact Number</label>\n                      <input type=\"Search here\" (input)=\"getBuyers(parameter.type, parameter.p, parameter.name, $event.target.value, parameter.email)\" name=\"\">\n                  </div>\n                </th>\n                <th style=\"width:20%\">\n                  <div class=\"table-search\">\n                      <label>Email Address</label>\n                      <input type=\"Search here\" (input)=\"getBuyers(parameter.type, parameter.p, parameter.name, parameter.phone, $event.target.value)\" name=\"\">\n                  </div>\n                </th>\n                <th style=\"width:20%; vertical-align: top;\">\n                  Building<a href=\"javascript://\"><img src=\"./../../../../assets/img/top-arrow.png\" alt=\"img\"></a>\n                </th>\n                <th style=\"width:14%\">\n                  &nbsp;\n                </th>\n              </tr>\n        \n              <tr *ngFor=\"let item of parameter.items| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.p, totalItems: parameter.total }\">\n                <td> \n                  <img *ngIf=\"item.image\" class=\"rounded-circle\" [src]=\"item.image\" alt=\"img\">\n                  <img *ngIf=\"!item.image\" class=\"rounded-circle\" src=\"./../../../assets/img/default_img.png\" alt=\"img\">\n                </td>\n                <td class=\"text-left\">\n                  <span class=\"name\">{{item.name}}</span>\n                </td>\n                <td class=\"text-left\" *ngIf=\"item.phone\">{{item.country_code}}-{{item.phone}}</td>\n                <td class=\"text-left\" *ngIf=\"!item.phone\">NA</td>\n                <td class=\"text-left\">{{item.email}}</td>\n                <td>14</td>\n                <td>\n                  <a href=\"javascript://\" (click)=\"editUser(item)\" class=\"icon-block edit-icon\"><img src=\"./../../../../assets/img/edit.png\" alt=\"img\"></a>\n                  <a href=\"javascript://\" *ngIf=\"item.is_blocked == 1\" (click)=\"blockUnblockPopup(i, item.id, 0, parameter.type)\" title=\"Unblock user\" class=\"icon-block block-icon unblock-bg\"><img src=\"./../../../../assets/img/block.png\" alt=\"img\"></a>\n                  <a href=\"javascript://\" *ngIf=\"item.is_blocked == 0\" (click)=\"blockUnblockPopup(i, item.id, 1, parameter.type)\" title=\"Block user\" class=\"icon-block block-icon\"><img src=\"./../../../../assets/img/unblock.png\" alt=\"img\"></a>\n                </td>\n              </tr>\n\n            </table>\n          </div>\n        </div>\n\n        <div class=\"center\" *ngIf=\"parameter.total == 0\">\n          <img src=\"./../../../assets/img/404-error.png\">\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"btn-cont text-right marginT15\" *ngIf=\"parameter.total\">\n    <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n  </div>\n  \n</div>\n\n\n\n<!-- add inhouse user modal -->\n<div class=\"modal animated\" id=\"add\">\n  <div class=\"modal-dialog fadeIndown modal-lg\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #modalClose>&times;</button>\n      </div>\n\n      <form class=\"form-horizontal form-model0P\" role=\"form\" ngNativeValidate #addForm=\"ngForm\" (ngSubmit)=\"addNewUser(addForm)\">\n        <div class=\"modal-body\">\n          <div class=\"row\">\n            <div class=\"col-6\">\n              <div class=\"add-img\">\n              <input required accept=\"image/*\" name=\"image\" class=\"image\" (change)=\"changeListner($event)\" type=\"file\">\n              <label>+ Add Image</label>\n              </div>\n            </div>\n            <div class=\"col-6\">\n              <div class=\"btn-cont text-right\">\n                  <button *ngIf=\"model.id==''\" type=\"submit\" [disabled]=\"addForm.invalid\" class=\"btn btn-primary\">ADD</button>\n                  <button *ngIf=\"model.id!=''\" type=\"submit\" [disabled]=\"addForm.invalid\" class=\"btn btn-primary\">UPDATE</button>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"spacer40\"></div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                  <label>Name</label>\n                  <div class=\"form-group\">\n                  <input autocomplete=\"off\" type=\"text\" class=\"form-control\" required [(ngModel)]=\"model.name\" name=\"name\">\n                </div>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                  <label>Contact number</label>\n                  <div class=\"form-group\">\n                  <input minlength=\"6\" maxlength=\"16\" autocomplete=\"off\" type=\"text\" class=\"form-control\" id=\"phone\" required minlength=\"1\" [(ngModel)]=\"model.phone\" name=\"phone\"\n                        ng2TelInput [ng2TelInputOptions]=\"initialCountry\" (countryChange)=\"onCountryChange($event)\" />\n                </div>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                  <label>Email ID</label>\n                  <div class=\"form-group\">\n                  <input autocomplete=\"off\" type=\"email\" class=\"form-control\" required [(ngModel)]=\"model.email\" name=\"email\">\n                </div>\n              </div>\n            </div>\n            <!-- <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>User type</label>\n                <select title=\"Choose user type\" [(ngModel)]=\"model.user_type\" name=\"user_type\" class=\"form-control\">\n                  <option value=\"buyer\">Buyer</option>\n                  <option value=\"seller\">Seller</option>\n                </select>\n              </div>\n            </div>\n            <div class=\"col-12\" *ngIf=\"model.user_type == 'seller'\">\n              <div class=\"form-group-2\">\n                <label>Interested In</label>\n                <select title=\"Choose user type\" name=\"interested_in\" class=\"form-control\">\n                  <option value=\"buyer\">Buyer</option>\n                  <option value=\"seller\">Seller</option>\n                </select>\n              </div>\n            </div> -->\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/layout/users/users.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__ = __webpack_require__("../../../../ngx-sweetalert2/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_users_model__ = __webpack_require__("../../../../../src/app/models/users.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var UsersComponent = (function () {
    function UsersComponent(constant, model, element, route, admin, router, swal) {
        this.constant = constant;
        this.model = model;
        this.element = element;
        this.route = route;
        this.admin = admin;
        this.router = router;
        this.swal = swal;
        this.parameter = {};
    }
    UsersComponent.prototype.ngOnInit = function () {
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.p = this.constant.p;
        this.parameter.type = 1;
        this.model.id = '';
        this.initialCountry = { initialCountry: 'mx' };
        this.getBuyers(this.parameter.type, this.parameter.p, '', '', '');
    };
    UsersComponent.prototype.getBuyers = function (type, page, name, phone, email) {
        var _this = this;
        this.parameter.p = page;
        this.parameter.type = type;
        this.parameter.name = name;
        this.parameter.phone = phone;
        this.parameter.email = email;
        this.parameter.loading = true;
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
            _this.parameter.loading = false;
            _this.parameter.items = success.data;
            _this.parameter.total = success.data.length;
        }, function (error) {
            console.log(error);
            _this.parameter.loading = false;
            if (error.statusCode === 401) {
                _this.router.navigate(['']);
            }
            else {
                _this.swal.warning({
                    text: error.messages,
                });
            }
        });
    };
    UsersComponent.prototype.changeListner = function (event) {
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
    UsersComponent.prototype.onCountryChange = function (e) {
        console.log('eeee', e);
        this.model.country_code = e.dialCode;
        this.initialCountry = { initialCountry: e.iso2 };
    };
    UsersComponent.prototype.addNewUser = function (formdata) {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = this.model.id !== '' ? 'updateNewUser' : 'addSeller';
        console.log(formdata);
        var input = new FormData();
        if (this.model.id !== '') {
            input.append('id', this.model.id);
        }
        input.append('name', formdata.value.name);
        input.append('country_code', '+' + this.model.country_code);
        input.append('phone', formdata.value.phone);
        input.append('image', this.parameter.image);
        input.append('email', formdata.value.email);
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('success', success);
            _this.parameter.loading = false;
            if (success.success === 0) {
                _this.swal.error({
                    title: 'Error',
                    text: success.message
                });
            }
            else {
                _this.modalClose.nativeElement.click();
                formdata.reset();
                _this.swal.success({
                    title: 'Success',
                    text: _this.model.id === '' ? 'Added successfully.' : 'Updated successfully.'
                });
            }
            // console.log('user add',success)
        }, function (error) {
            console.log(error);
            _this.parameter.loading = false;
            _this.swal.error({
                title: 'Error',
                text: error.message,
            });
        });
    };
    UsersComponent.prototype.blockUnblockPopup = function (index, id, flag, user_type) {
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
        var self = this;
        this.swal.confirm({
            title: this.parameter.title,
            text: this.parameter.text,
        }).then(function () {
            self.blockAdmin(index, id, flag, user_type);
        })
            .catch(function () {
            // console.log('Logout cancelled by user');
        });
    };
    UsersComponent.prototype.blockAdmin = function (index, id, flag, user_type) {
        var _this = this;
        this.parameter.index = index;
        this.parameter.url = 'blockBuyerSeller';
        var input = new FormData();
        input.append('id', id);
        input.append('flag', flag);
        input.append('user_type', user_type);
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('success', success);
            _this.parameter.loading = false;
            _this.parameter.items[_this.parameter.index] = success.data;
            _this.swal.success({
                title: 'Success',
                text: _this.parameter.successText
            });
        }, function (error) {
            console.log(error);
            _this.parameter.loading = false;
            _this.swal.error({
                title: 'Error',
                text: error.message,
            });
        });
    };
    return UsersComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('modalOpen'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object)
], UsersComponent.prototype, "modalOpen", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('modalClose'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _b || Object)
], UsersComponent.prototype, "modalClose", void 0);
UsersComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-users',
        template: __webpack_require__("../../../../../src/app/layout/users/users.component.html"),
        styles: [__webpack_require__("../../../../../src/app/layout/users/users.component.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_4__models_users_model__["a" /* Users */], __WEBPACK_IMPORTED_MODULE_5__common_constants__["a" /* Constant */]]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__common_constants__["a" /* Constant */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__models_users_model__["a" /* Users */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__models_users_model__["a" /* Users */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__["a" /* SweetAlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ngx_sweetalert2__["a" /* SweetAlertService */]) === "function" && _j || Object])
], UsersComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j;
//# sourceMappingURL=users.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/users/users.module.ts":
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__users_component__ = __webpack_require__("../../../../../src/app/layout/users/users.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersModule", function() { return UsersModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var routes = [
    { path: 'view-users', component: __WEBPACK_IMPORTED_MODULE_7__users_component__["a" /* UsersComponent */] }
];
var UsersModule = (function () {
    function UsersModule() {
    }
    return UsersModule;
}());
UsersModule = __decorate([
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
            __WEBPACK_IMPORTED_MODULE_7__users_component__["a" /* UsersComponent */]
        ]
    })
], UsersModule);

//# sourceMappingURL=users.module.js.map

/***/ }),

/***/ "../../../../../src/app/models/users.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Users; });
var Users = (function () {
    function Users() {
    }
    return Users;
}());

//# sourceMappingURL=users.model.js.map

/***/ })

});
//# sourceMappingURL=2.chunk.js.map