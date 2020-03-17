(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["managers-managers-module"],{

/***/ "./src/app/layout/managers/managers.component.css":
/*!********************************************************!*\
  !*** ./src/app/layout/managers/managers.component.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/layout/managers/managers.component.html":
/*!*********************************************************!*\
  !*** ./src/app/layout/managers/managers.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-md-4 col-6\">\n      <div class=\"title-group\">\n          <h5>{{'viewManagers.label' | translate}}</h5>\n          <p>{{'table.pagination.showing' | translate}} {{items?.length}} {{'table.pagination.outof' | translate}} {{parameter.total}}</p>\n      </div>\n    </div>\n    <div class=\"col-md-5 col-6\">\n      <div class=\"btn-cont upload-excel pull-right\">\n        <a title=\"{{'table.title.downloadSampleFile' | translate}}\" href=\"assets/docx/BD_TowerManagerPerson_Sozu.xlsx\" class=\"btn\"><span\n            class=\"fa fa-download\"></span></a>\n        <label title=\"{{'table.title.chooseExcelFile' | translate}}\" class=\"img_label\">{{label}}\n          <input type=\"file\" #fileInput accept=\".xls,.xlsx\" (change)=\"getFileName()\">\n        </label>\n        <a title=\"{{'table.title.uploadSelectedFile' | translate}}\" (click)=\"importData()\" href=\"javascript://\" class=\"btn\"><span\n            class=\"fa fa-upload\"></span></a>\n      </div>\n    </div>\n    <div class=\"col-md-3 col-6\">\n      <div class=\"btn-cont text-right\">\n        <a class=\"btn\" href=\"javascript://\" style=\"display: none;\" data-toggle=\"modal\" data-target=\"#addInhouseUser\"\n          #inhouseUserModalOpen>{{'table.addNewBtn' | translate}}</a>\n        <a *ngIf=\"admin?.admin_acl['Managers Management']?.can_create==1\"\n          class=\"btn btn-primary\" href=\"javascript://\" (click)=\"openAddModal()\">{{'table.addNewBtn' | translate}}</a>\n      </div>\n    </div>\n  </div>\n\n  <hr>\n\n  <div class=\"white-bg\">\n    <div class=\"tabel-section\">\n      <div class=\"table-responsive\">\n\n        <table class=\"table table-striped\">\n          <tr>\n            <th style=\"width:6%\">&nbsp;</th>\n            <th style=\"width:20%\">\n              <div class=\"table-search\">\n                <label>{{'table.th.companyCommercialName' | translate}}</label>\n                <div class=\"searh-3\">\n                  <input type=\"text\" [(ngModel)]=\"parameter.company_name\"\n                    (keyup.enter)=\"searchUserByCompanyName(parameter.company_name)\" name=\"\">\n                  <button type=\"button\" *ngIf=\"parameter.company_name\"\n                    (click)=\"searchUserByCompanyName(parameter.company_name)\"><i class=\"fa fa-search\"></i></button>\n                </div>\n              </div>\n            </th>\n            <th style=\"width:15%\">\n              <div class=\"table-search\">\n                <label><br>&nbsp;{{'table.th.name' | translate}}</label>\n                <div class=\"searh-3\">\n                  <input type=\"text\" [(ngModel)]=\"parameter.name\" (keyup.enter)=\"searchUserByName(parameter.name)\"\n                    name=\"\">\n                  <button type=\"button\" *ngIf=\"parameter.name\" (click)=\"searchUserByName(parameter.name)\"><i\n                      class=\"fa fa-search\"></i></button>\n                </div>\n              </div>\n            </th>\n            <th style=\"width:15%; text-align:left;\">\n              <div class=\"table-search\">\n                <label><br>&nbsp;{{'table.th.contactNumber' | translate}}</label>\n                <div class=\"searh-3\">\n                  <input type=\"text\" [(ngModel)]=\"parameter.phone\" (keyup.enter)=\"searchUserByPhone(parameter.phone)\"\n                    name=\"\">\n                  <button type=\"button\" *ngIf=\"parameter.phone\" (click)=\"searchUserByPhone(parameter.phone)\"><i\n                      class=\"fa fa-search\"></i></button>\n                </div>\n              </div>\n            </th>\n            <th style=\"width:20%\">\n              <div class=\"table-search\">\n                <label><br>&nbsp;{{'table.th.emailAddress' | translate}}</label>\n                <div class=\"searh-3\">\n                  <input (keydown.space)=\"$event.preventDefault();\" type=\"text\" [(ngModel)]=\"parameter.email\"\n                    (keyup.enter)=\"searchUserByEmail(parameter.email)\" name=\"\">\n                  <button type=\"button\" *ngIf=\"parameter.email\" (click)=\"searchUserByEmail(parameter.email)\"><i\n                      class=\"fa fa-search\"></i></button>\n                </div>\n              </div>\n            </th>\n            <th style=\"width:5%; vertical-align: top;\">\n              <div class=\"table-search\">\n                <label>{{'table.th.linkedProjects' | translate}}</label>\n                <a (click)=\"sortData(model.project_sort==1?2:1)\" href=\"javascript://\"><img\n                    [ngClass]=\"{'upsidedown':model.project_sort==2}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n              </div>\n            </th>\n            <th style=\"width:19%\">\n              &nbsp;\n            </th>\n          </tr>\n          <tr\n            *ngFor=\"let item of items| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.p, totalItems: parameter.total }; let i = index\">\n            <td>\n              <img *ngIf=\"item.image\" [defaultImage]=\"item.image| img:'thumb'\" [lazyLoad]=\"item.image\"\n                class=\"rounded-circle\" alt=\"img\">\n              <img *ngIf=\"!item.image\" class=\"rounded-circle\" src=\"assets/img/default_img.png\" alt=\"img\">\n            </td>\n            <td class=\"text-left\">\n              <span class=\"name\">{{item?.company?.name ? item?.company?.name : ('table.th.freelancer' | translate)}}</span>\n            </td>\n            <td class=\"text-left text-ellipsis120\">\n              <span class=\"name\">{{item.name | titlecase}}</span>\n            </td>\n            <td class=\"text-left\" *ngIf=\"item.phone\">\n              {{item.dial_code && item.dial_code!=undefined ? item.dial_code : constant.dial_code}}-{{item.phone}}</td>\n            <td class=\"text-left\" *ngIf=\"!item.phone\">{{'table.tr.td.NA' | translate}}</td>\n            <td class=\"text-left\">{{item.email}}</td>\n            <td class=\"text-left\">\n              <a routerLink=\"/dashboard/projects/view-projects/manager/{{item.id}}\">\n                <span class=\"green-color\">{{item.project_count | numberWithCommas}}</span>\n              </a>\n            </td>\n            <!-- <td class=\"text-left\">{{item.project_count | numberWithCommas}}</td> -->\n            <td>\n              <div class=\"table-actions\">\n                <button \n                  [disabled]=\"admin?.admin_acl['Managers Management']?.can_update==0\"\n                  title=\"{{'table.title.editDetails' | translate}}\" (click)=\"editUser(item, i)\" class=\"action-icon\"><img\n                    src=\"assets/img/edit.png\" alt=\"img\"></button>\n                <button\n                  [disabled]=\"admin?.admin_acl['Managers Management']?.can_delete==0\"\n                  (click)=\"blockUnblockPopup(i, item.id, item.is_blocked==1?0:1)\"\n                  title=\"{{item.is_blocked==1 ? ('table.title.unblock' | translate) : ('table.title.block' | translate)}}\"\n                  [ngClass]=\"{'unblock-bg':item.is_blocked==1}\" class=\"action-icon\">\n                  <img src=\"assets/img/block.png\" alt=\"img\">\n                </button>\n                <button [disabled]=\"admin?.admin_acl['Managers Management']?.can_purge==0\"\n                  (click)=\"deletePopup(item, i);\" class=\"action-icon\" title=\"{{'table.title.delete' | translate}}\"><img\n                    src=\"assets/img/ic_delete.png\" alt=\"img\"></button>\n              </div>\n            </td>\n          </tr>\n        </table>\n      </div>\n    </div>\n\n    <div class=\"center\" *ngIf=\"parameter.total == 0\">\n      <img src=\"assets/img/404-error.png\">\n    </div>\n\n  </div>\n  <div class=\"btn-cont text-right marginT15\">\n\n    <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n  </div>\n</div>\n\n\n<div class=\"modal animated\" id=\"addInhouseUser\">\n  <div class=\"modal-dialog fadeIndown modal-lg\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" style=\"display: none;\" class=\"close\" data-dismiss=\"modal\" #modalClose>&times;</button>\n        <button type=\"button\" class=\"close\" (click)=\"closeModal(); addForm.reset()\">&times;</button>\n      </div>\n\n      <form class=\"form-horizontal form-model0P\" role=\"form\" ngNativeValidate #addForm=\"ngForm\"\n        (ngSubmit)=\"addNewUser(addForm)\">\n        <div class=\"modal-body\">\n          <div class=\"row\">\n            <div class=\"col-3\">\n              <div class=\"add-img\" style=\"display:flex;\">\n                <img *ngIf=\"image\" [src]=\"image\" [defaultImage]=\"image| img:'thumb'\" [lazyLoad]=\"image\"\n                  style=\"object-fit: cover; width: 100%;\">\n                <label *ngIf=\"model.image\">\n                  <input accept=\"image/*\" name=\"image\" class=\"image\"\n                    (change)=\"onFileChange($event, 'img_loader', 'image')\" type=\"file\">\n                </label>\n                <label *ngIf=\"!image\">{{'addForm.image' | translate}}</label>\n                <input *ngIf=\"!image\" accept=\"image/*\" name=\"image\" class=\"image\"\n                  (change)=\"onFileChange($event, 'img_loader', 'image')\" type=\"file\">\n                <div *ngIf=\"model.img_loader\" class=\"loaderr\"></div>\n              </div>\n            </div>\n            <div class=\"col-3\">\n              <div class=\"add-img\" style=\"display:flex;\">\n                <img *ngIf=\"logo\" [src]=\"logo\" [defaultImage]=\"logo| img:'thumb'\" [lazyLoad]=\"logo\"\n                  style=\"object-fit: cover; width: 100%;\">\n                <label *ngIf=\"model.logo\">\n                  <input accept=\"image/*\" name=\"logo\" class=\"image\"\n                    (change)=\"onFileChange($event, 'logo_loader', 'logo')\" type=\"file\">\n                </label>\n                <label *ngIf=\"!logo\">{{'addForm.logo' | translate}}</label>\n                <input *ngIf=\"!logo\" accept=\"image/*\" name=\"logo\" class=\"image\"\n                  (change)=\"onFileChange($event, 'logo_loader', 'logo')\" type=\"file\">\n                <div *ngIf=\"model.logo_loader\" class=\"loaderr\"></div>\n              </div>\n            </div>\n            <div class=\"col-6\">\n              <div class=\"btn-cont text-right\">\n                <button *ngIf=\"!model.id\" type=\"submit\" [disabled]=\"addForm.invalid\"\n                  class=\"btn btn-primary\">{{'addForm.addBtn' | translate}}</button>\n                <button *ngIf=\"model.id\" type=\"submit\" [disabled]=\"addForm.invalid\"\n                  class=\"btn btn-primary\">{{'addForm.updateBtn' | translate}}</button>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"spacer40\"></div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.name' | translate}} <span class=\"color-red\">*</span></label>\n                <div class=\"form-group\">\n                  <input autocomplete=\"off\" [pattern]=\"constant.onlyWhiteSpaces\" type=\"text\" class=\"form-control\" required [(ngModel)]=\"model.name\"\n                    name=\"name\">\n                </div>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.contactNumber' | translate}} <span class=\"color-red\">*</span></label>\n                <div class=\"form-group\">\n                  <input minlength=\"6\" maxlength=\"16\" autocomplete=\"off\" type=\"text\" [pattern]=\"constant.phonePattern\"\n                    class=\"form-control\" id=\"phone\" required minlength=\"1\" [(ngModel)]=\"model.phone\" name=\"phone\"\n                    ng2TelInput #phonetest (intlTelInputObject)=\"telInputObject($event)\"\n                    (countryChange)=\"onCountryChange($event)\" />\n                </div>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.emailId' | translate}} <span class=\"color-red\">*</span></label>\n                <div class=\"form-group\">\n                  <input (keydown.space)=\"$event.preventDefault();\" autocomplete=\"off\" [pattern]=\"constant.emailPattern\"\n                    type=\"email\" class=\"form-control\" required [(ngModel)]=\"model.email\" name=\"email\">\n                </div>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.companyName' | translate}}</label>\n                <select name=\"company\" class=\"form-control\"\n                  (change)=\"setCompany($event.target.value)\">\n                  <option value=\"\">{{'addForm.selectCompany' | translate}}</option>\n                  <option *ngFor=\"let company of companies\" value=\"{{company.id}}\"\n                    [selected]=\"model?.company?.id == company.id\">{{company.name}}</option>\n                </select>\n              </div>\n            </div>\n          </div>\n        </div>\n      </form>\n\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/layout/managers/managers.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/layout/managers/managers.component.ts ***!
  \*******************************************************/
/*! exports provided: ManagersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManagersComponent", function() { return ManagersComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_common_fileUpload__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/common/fileUpload */ "./src/app/common/fileUpload.ts");
/* harmony import */ var src_app_models_company_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/company.model */ "./src/app/models/company.model.ts");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var ManagersComponent = /** @class */ (function () {
    function ManagersComponent(constant, cs, route, admin, spinner, ngZone, translate) {
        var _this = this;
        this.constant = constant;
        this.cs = cs;
        this.route = route;
        this.admin = admin;
        this.spinner = spinner;
        this.ngZone = ngZone;
        this.translate = translate;
        this.parameter = {};
        this.lead_sort = 2;
        this.admin.countryData$.subscribe(function (success) {
            _this.parameter.allCountry = success;
        });
    }
    ManagersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.label = this.translate.instant('table.title.chooseManagersFile');
        this.file1 = new src_app_common_fileUpload__WEBPACK_IMPORTED_MODULE_2__["FileUpload"](false, this.admin);
        this.model = new src_app_models_company_model__WEBPACK_IMPORTED_MODULE_3__["Manager"]();
        this.model.project_sort = 2;
        this.model.country_code = this.constant.country_code;
        this.model.dial_code = this.constant.dial_code;
        this.model.company = new src_app_models_company_model__WEBPACK_IMPORTED_MODULE_3__["Company"]();
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        // this.setCurrentPosition();
        this.parameter.sub = this.route.params.subscribe(function (params) {
            _this.parameter.p = _this.constant.p;
            _this.parameter.name = '';
            _this.parameter.phone = '';
            _this.parameter.email = '';
            _this.parameter.total = 0;
            _this.getTowerManager();
            _this.getAllCompanies();
            _this.initialCountry = { initialCountry: _this.constant.initialCountry };
        });
    };
    ManagersComponent.prototype.telInputObject = function (obj) {
        this.obj = obj;
    };
    ManagersComponent.prototype.getPage = function (page) {
        this.parameter.p = page;
        this.getTowerManager();
    };
    ManagersComponent.prototype.getFileName = function () {
        var fi = this.fileInput.nativeElement;
        var uploadedFile = fi.files[0];
        this.label = uploadedFile.name;
    };
    ManagersComponent.prototype.closeModal = function () {
        this.modalClose.nativeElement.click();
        this.emptyModel();
    };
    ManagersComponent.prototype.emptyModel = function () {
        this.model.country_code = this.constant.country_code;
        this.model.dial_code = this.constant.dial_code;
        this.model = new src_app_models_company_model__WEBPACK_IMPORTED_MODULE_3__["Manager"]();
        this.image = '';
        this.logo = '';
        this.initialCountry = { initialCountry: this.constant.initialCountry };
    };
    ManagersComponent.prototype.onCountryChange = function (e) {
        this.model.country_code = e.iso2;
        this.model.dial_code = '+' + e.dialCode;
        this.initialCountry = { initialCountry: e.iso2 };
    };
    ManagersComponent.prototype.openAddModal = function () {
        this.model = new src_app_models_company_model__WEBPACK_IMPORTED_MODULE_3__["Manager"]();
        this.model.country_code = this.constant.country_code;
        this.model.dial_code = this.constant.dial_code;
        this.model.company = new src_app_models_company_model__WEBPACK_IMPORTED_MODULE_3__["Company"]();
        this.initialCountry = { initialCountry: this.constant.initialCountry };
        this.inhouseUserModalOpen.nativeElement.click();
    };
    ManagersComponent.prototype.initialcountryfunc = function () {
        return { initialCountry: this.constant.initialCountry };
    };
    ManagersComponent.prototype.setCompany = function (id) {
        this.model.company.id = id;
    };
    ManagersComponent.prototype.onFileChange = function (event, paramLoader, paramFile) {
        var _this = this;
        if (event.target.files && event.target.files[0]) {
            this.model[paramLoader] = true;
            var reader = new FileReader();
            reader.onload = function (e) {
                _this[paramFile] = e.target.result;
                _this.cs.saveImage(event.target.files[0]).subscribe(function (success) {
                    _this.model[paramLoader] = false;
                    _this.model[paramFile] = success['data'].image;
                });
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };
    ManagersComponent.prototype.addNewUser = function (formdata) {
        var _this = this;
        if (this.model.img_loader || this.model.logo_loader) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.uploadingImage'), 'error');
            return false;
        }
        var input = new FormData();
        if (this.model.id) {
            input.append('id', this.model.id.toString());
        }
        input.append('name', this.model.name);
        input.append('country_code', this.model.country_code ? this.model.country_code : this.constant.dial_code);
        input.append('dial_code', this.model.dial_code ? this.model.dial_code : this.constant.dial_code);
        input.append('phone', this.model.phone);
        input.append('email', this.model.email);
        if (this.model.company.id) {
            input.append('company_id', this.model.company.id.toString());
        }
        if (this.model.image) {
            input.append('image', this.model.image);
        }
        if (this.model.logo) {
            input.append('logo', this.model.logo);
        }
        this.spinner.show();
        this.admin.postDataApi('addTowerManager', input)
            .subscribe(function (success) {
            _this.spinner.hide();
            if (success.success === '0') {
                swal(_this.translate.instant('swal.error'), success.message, 'error');
            }
            else {
                _this.modalClose.nativeElement.click();
                var text = _this.model.id ?
                    _this.translate.instant('message.success.updatedSuccessfully') :
                    _this.translate.instant('message.success.addedSuccessfully');
                swal(_this.translate.instant('swal.success'), text, 'success');
                if (_this.model.id) {
                    _this.items[_this.parameter.index] = success.data;
                }
                else {
                    _this.items.push(success.data);
                    _this.parameter.total++;
                }
                formdata.reset();
                _this.emptyModel();
            }
        }, function (error) {
            _this.spinner.hide();
        });
    };
    ManagersComponent.prototype.editUser = function (userdata, index) {
        this.parameter.index = index;
        this.model = userdata;
        this.model.company = userdata.company ? userdata.company : new src_app_models_company_model__WEBPACK_IMPORTED_MODULE_3__["Company"]();
        this.image = userdata.image;
        this.logo = userdata.logo;
        this.model.img_loader = false;
        this.model.logo_loader = false;
        if (this.obj) {
            this.obj.intlTelInput('setCountry', this.model.country_code);
        }
        this.inhouseUserModalOpen.nativeElement.click();
    };
    ManagersComponent.prototype.resetFilters = function () {
        this.parameter.p = this.constant.p;
        this.parameter.total = 0;
        this.getTowerManager();
    };
    ManagersComponent.prototype.searchUserByName = function (name) {
        this.parameter.name = name;
        this.getTowerManager();
    };
    ManagersComponent.prototype.searchUserByCompanyName = function (company_name) {
        this.parameter.company_name = company_name;
        this.getTowerManager();
    };
    ManagersComponent.prototype.searchUserByEmail = function (email) {
        this.parameter.email = email;
        this.getTowerManager();
    };
    ManagersComponent.prototype.searchUserByPhone = function (phone) {
        this.parameter.phone = phone;
        this.getTowerManager();
    };
    ManagersComponent.prototype.sortData = function (value) {
        this.model.project_sort = value;
        this.getTowerManager();
    };
    ManagersComponent.prototype.getTowerManager = function () {
        var _this = this;
        this.spinner.show();
        var input = new FormData();
        input.append('project_sort', this.model.project_sort);
        input.append('page', this.parameter.p.toString());
        if (this.parameter.name) {
            input.append('name', this.parameter.name);
        }
        if (this.parameter.email) {
            input.append('email', this.parameter.email);
        }
        if (this.parameter.phone) {
            input.append('phone', this.parameter.phone);
        }
        if (this.parameter.company_name) {
            input.append('company_name', this.parameter.company_name);
        }
        this.admin.postDataApi('getTowerManager', input)
            .subscribe(function (success) {
            _this.spinner.hide();
            _this.items = success.data;
            _this.parameter.total = success.total;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    ManagersComponent.prototype.getAllCompanies = function () {
        var _this = this;
        this.admin.postDataApi('getAllCompanies', {})
            .subscribe(function (success) {
            _this.companies = success.data;
        });
    };
    ManagersComponent.prototype.blockUnblockPopup = function (index, id, flag, user_type) {
        var _this = this;
        this.parameter.index = index;
        this.parameter.title = this.translate.instant('message.question.areYouSure');
        switch (flag) {
            case 0:
                this.parameter.text = this.translate.instant('message.question.wantToUnblockManager');
                this.parameter.successText = this.translate.instant('message.success.unblockedSuccessfully');
                break;
            case 1:
                this.parameter.text = this.translate.instant('message.question.wantToBlockManager');
                this.parameter.successText = this.translate.instant('message.success.blockedSuccessfully');
                break;
        }
        swal({
            html: this.parameter.title + '<br>' + this.parameter.text,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes!'
        }).then(function (result) {
            if (result.value) {
                _this.blockAdmin(id, flag);
            }
        });
    };
    ManagersComponent.prototype.blockAdmin = function (id, flag) {
        var _this = this;
        var input = {
            id: id, flag: flag
        };
        this.admin.postDataApi('blockTowerManager', input)
            .subscribe(function (success) {
            swal(_this.translate.instant('swal.success'), _this.parameter.successText, 'success');
            // this.items[this.parameter.index] = success.data;
            _this.items[_this.parameter.index]['is_blocked'] = flag;
        });
    };
    ManagersComponent.prototype.file1Select = function ($event) {
        this.file1.onSelectFile($event);
    };
    ManagersComponent.prototype.deletePopup = function (item, index) {
        var _this = this;
        this.parameter.title = this.translate.instant('message.question.areYouSure');
        this.parameter.text = this.translate.instant('message.question.wantToDeleteManager');
        swal({
            html: this.parameter.title + '<br>' + this.parameter.text,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.deleteData(item, index);
            }
        });
    };
    ManagersComponent.prototype.deleteData = function (item, index) {
        var _this = this;
        this.admin.postDataApi('deleteTowerManager', { id: item.id }).subscribe(function (r) {
            _this.items.splice(index, 1);
            _this.parameter.total--;
            swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.deletedSuccessfully'), 'success');
        }, function (error) {
            swal(_this.translate.instant('swal.error'), error.error.message, 'error');
        });
    };
    ManagersComponent.prototype.importData = function () {
        var _this = this;
        var file = this.fileInput.nativeElement;
        var attachment;
        if (file.files && file.files[0]) {
            attachment = file.files[0];
            if (attachment.size > this.constant.fileSizeLimit) {
                swal(this.translate.instant('swal.error'), this.translate.instant('message.info.fileSizeLimit'), 'error');
                return false;
            }
            this.spinner.show();
            var input = new FormData();
            input.append('attachment', attachment);
            this.admin.postDataApi('importTowerManager', input)
                .subscribe(function (success) {
                _this.spinner.hide();
                _this.fileInput.nativeElement.value = '';
                _this.label = _this.translate.instant('table.title.chooseManagersFile');
                swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.importedSuccessfully'), 'success');
                _this.getTowerManager();
            }, function (error) {
                _this.fileInput.nativeElement.value = '';
                _this.spinner.hide();
            });
        }
        else {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.info.pleaseChooseFile'), 'error');
            return false;
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('fileInput'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], ManagersComponent.prototype, "fileInput", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('inhouseUserModalOpen'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], ManagersComponent.prototype, "inhouseUserModalOpen", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], ManagersComponent.prototype, "modalClose", void 0);
    ManagersComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-managers',
            template: __webpack_require__(/*! ./managers.component.html */ "./src/app/layout/managers/managers.component.html"),
            styles: [__webpack_require__(/*! ./managers.component.css */ "./src/app/layout/managers/managers.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["Constant"], src_app_services_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_6__["AdminService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_7__["NgxSpinnerService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__["TranslateService"]])
    ], ManagersComponent);
    return ManagersComponent;
}());



/***/ }),

/***/ "./src/app/layout/managers/managers.module.ts":
/*!****************************************************!*\
  !*** ./src/app/layout/managers/managers.module.ts ***!
  \****************************************************/
/*! exports provided: ManagersModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManagersModule", function() { return ManagersModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ng2_tel_input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ng2-tel-input */ "./node_modules/ng2-tel-input/ng2-tel-input.js");
/* harmony import */ var ng_lazyload_image__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng-lazyload-image */ "./node_modules/ng-lazyload-image/fesm5/ng-lazyload-image.js");
/* harmony import */ var src_app_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/guards/acl-user.guard */ "./src/app/guards/acl-user.guard.ts");
/* harmony import */ var src_app_modules_shared_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/modules/shared.module */ "./src/app/modules/shared.module.ts");
/* harmony import */ var _managers_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./managers.component */ "./src/app/layout/managers/managers.component.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
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
        path: '', component: _managers_component__WEBPACK_IMPORTED_MODULE_10__["ManagersComponent"],
        canActivate: [src_app_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_8__["AclUserGuard"]], data: { roles: ['Managers Management', 'can_read', ''] }
    }
];
var ManagersModule = /** @class */ (function () {
    function ManagersModule() {
    }
    ManagersModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes),
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerModule"],
                ngx_pagination__WEBPACK_IMPORTED_MODULE_4__["NgxPaginationModule"],
                ng_lazyload_image__WEBPACK_IMPORTED_MODULE_7__["LazyLoadImageModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
                ng2_tel_input__WEBPACK_IMPORTED_MODULE_6__["Ng2TelInputModule"],
                src_app_modules_shared_module__WEBPACK_IMPORTED_MODULE_9__["SharedModule"],
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__["TranslateModule"]
            ],
            declarations: [
                _managers_component__WEBPACK_IMPORTED_MODULE_10__["ManagersComponent"]
            ]
        })
    ], ManagersModule);
    return ManagersModule;
}());



/***/ })

}]);
//# sourceMappingURL=managers-managers-module.js.map