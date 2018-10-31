webpackJsonp([10],{

/***/ "../../../../../src/app/layout/manual-leads/manual-lead-details/manual-lead-details.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/manual-leads/manual-lead-details/manual-lead-details.component.html":
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<div class=\"container-fluid\">\n    <div class=\"white-bg padding15\">\n        <div class=\"row\">\n            <div class=\"col-lg-3 col-md-12 col-sm-6 col-12\">\n                <div class=\"df-profile\">\n                <a routerLink=\"/dashboard/manual-leads/view-all\"><i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i></a>\n                <img [src]=\"parameter?.data?.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\">\n                <div class=\"df-info\" *ngIf=\"parameter?.data\">\n                    <p class=\"p14\">{{parameter.data.name}}</p>\n                    <p class=\"p12\">Status: {{parameter?.data?.status.name}}</p>\n                </div>\n                </div>\n            </div>\n        </div>\n    </div>\n        \n    <div class=\"spacer30\"></div>\n        <div class=\"row\">\n            <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\">\n                <div class=\"white-bg padding30\">\n                    <div class=\"row\">\n                    <div class=\"col-md-6\">\n                        <h6>Details</h6>\n                    </div>\n                    <!-- <div class=\"col-md-6\">\n                        <div class=\"edit text-right\"><a href=\"javascript://\">Edit</a></div>\n                    </div> -->\n                    </div>\n                    <div class=\"details-table\">\n                    <table class=\"table\">\n                        <tr>\n                            <td style=\"padding-left:0\"><label>Full Name</label></td>\n                            <td colspan=\"2\" *ngIf=\"parameter?.data?.name\">{{parameter.data.name}}</td>\n                        </tr>\n                        <tr>\n                            <td style=\"padding-left:0\"><label>Contact Number</label></td>\n                            <td colspan=\"2\" *ngIf=\"parameter?.data?.phone\">{{parameter.data.dial_code ? parameter.data.dial_code : constant.dial_code}}-{{parameter.data.phone}}</td>\n                        </tr>\n                        <tr>\n                            <td style=\"padding-left:0\"><label>Email address</label></td>\n                            <td colspan=\"2\" *ngIf=\"parameter?.data?.email\">{{parameter.data.email}}</td>\n                        </tr>\n                        <tr>\n                            <td style=\"padding-left:0\"><label>Type</label></td>\n                            <td *ngIf=\"parameter?.data?.type?.name\">{{parameter.data.type.name}}</td>\n                        </tr>\n                        <tr>\n                            <td style=\"padding-left:0\"><label><strong>Property Selected</strong></label></td>\n                            <td *ngIf=\"parameter?.data?.property?.length!=0\">\n                                <a class=\"view-all-2\" href=\"javascript://\" (click)=\"viewPropertyDetails(parameter?.data?.property)\"> View Property</a>\n                            </td>\n                            <td *ngIf=\"parameter?.data?.property?.length==0\">NA</td>\n                        </tr>\n                        <!-- <tr>\n                            <td  style=\"padding-left:0\"><label><strong>Meeting Schedule</strong></label></td>\n                            <td colspan=\"2\">\n                                <p class=\"date\">02-Oct-2018, 04:00pm</p>\n                            </td>\n                        </tr> -->\n                    </table>\n                    </div>\n                </div>\n            </div>\n        \n\n        <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\">\n            <div class=\"white-bg\">\n                <div class=\"white-bg padding15\">\n                    <div class=\"row\">\n                        <div class=\"col-6\">\n                            <p class=\"p16 marginB0\">Write a Note</p>\n                        </div>\n                        <div class=\"col-6 text-right\">\n                            <!-- add note -->\n                        <a *ngIf=\"admin?.admin_acl['Manual Leads']?.can_update==1; else noAddPermission\" class=\"add\" href=\"javascript://\" data-toggle=\"modal\" data-target=\"#addNote\" #modalOpen>Add</a>\n                        <ng-template #noAddPermission>\n                            <a class=\"add\" href=\"javascript://\">Add</a>\n                        </ng-template>\n                        </div>\n                    </div>\n                </div>\n                \n                <hr class=\"margin0\">\n\n                <div *ngIf=\"parameter?.data?.notes?.length!=0\" class=\"write-note white-bg padding40\" malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\">\n                    <div class=\"wn-block\" *ngFor=\"let item of parameter?.data?.notes; let i=index\">\n                        <div class=\"circle\">\n                        <span></span>\n                        </div>\n                        <!-- delete note -->\n                        <a *ngIf=\"admin?.admin_acl['Manual Leads']?.can_update==1; else noDeletePermission\" class=\"delete\" href=\"javascript://\" (click)=\"deleteLeadPopup(item.id, i)\">Delete</a>\n                        <ng-template #noDeletePermission>\n                            <a class=\"delete\" href=\"javascript://\">Delete</a>\n                        </ng-template>\n                        <p class=\"time\">{{item.updated_at  | chatTime: 'YYYY-MM-DD H:m:s': 2}}</p>\n                        <pre class=\"p13\" *ngIf=\"!item.show\">{{item.note.slice(0, 90)}} <span class=\"read-more\" *ngIf=\"item.note.length>100\" (click)=\"item.show=true\">Read more</span></pre>\n                        <pre class=\"p13\" *ngIf=\"item.show\">{{item.note}}</pre>\n                    </div>\n                </div>\n                <div  *ngIf=\"parameter?.data?.notes?.length==0\" class=\"write-note white-bg\" style=\"height:230px;\">\n                    <p class=\"show-not-found\">\n                        {{constant.errorMsg.NO_NOTE_FOUND}}\n                    </p>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n\n\n<!-- add note modal -->\n<div class=\"modal animated\" id=\"addNote\">\n    <div class=\"modal-dialog fadeIndown\">\n        <div class=\"modal-content\">\n        <div class=\"modal-header modal-header-new\">\n            <h4 class=\"modal-title\">Add Note</h4>\n            <button style=\"display: none;\" type=\"button\" class=\"close\" data-dismiss=\"modal\" #modalClose>&times;</button>\n            <button type=\"button\" class=\"close\" (click)=\"closeModal()\">&times;</button>\n        </div>\n    \n        <form class=\"form-horizontal form-model0P form-model-newP\" role=\"form\" ngNativeValidate #addForm=\"ngForm\" (ngSubmit)=\"addLeadNote(); addForm.reset();\">\n            <div class=\"modal-body modal-body-new\">\n            <div class=\"row\">\n                <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                    <div class=\"form-group\">\n                        <textarea rows=\"4\" required class=\"form-control note\" name=\"note\" #note=\"ngModel\" [(ngModel)]=\"model.note\"></textarea>\n                    </div>\n                </div>\n                </div>\n                <div class=\"col-12\">\n                    <div class=\"btn-cont text-right\">\n                        <button type=\"submit\" [disabled]=\"!addForm.valid\" class=\"btn btn-primary\">Add</button>\n                        <!-- <button *ngIf=\"model.id==0 else UpdateNote\" [disabled]=\"!addForm.valid\" type=\"submit\" class=\"btn btn-primary\">ADD</button>\n                        <ng-template #UpdateNote>\n                            <button type=\"submit\" [disabled]=\"!addForm.valid\" class=\"btn btn-primary\">UPDATE</button>\n                        </ng-template> -->\n                    </div>\n                </div>\n            </div>\n            </div>\n        </form>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/layout/manual-leads/manual-lead-details/manual-lead-details.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_common_service__ = __webpack_require__("../../../../../src/app/services/common.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_leads_model__ = __webpack_require__("../../../../../src/app/models/leads.model.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManualLeadDetailsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ManualLeadDetailsComponent = /** @class */ (function () {
    function ManualLeadDetailsComponent(route, admin, router, cs, constant, model) {
        this.route = route;
        this.admin = admin;
        this.router = router;
        this.cs = cs;
        this.constant = constant;
        this.model = model;
        this.parameter = {};
        this.scrollbarOptions = { axis: 'y', theme: 'dark' };
    }
    ManualLeadDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.parameter.sent_as = this.constant.userType.csr_closer;
        this.admin.loginData$.subscribe(function (success) {
            _this.admin_id = success['id'];
        });
        this.route.params.subscribe(function (params) {
            _this.parameter.lead_id = params.id;
            _this.parameter.loading = true;
            _this.admin.postDataApi('getManualLeadById', { id: _this.parameter.lead_id, sent_as: _this.parameter.sent_as }).subscribe(function (r) {
                _this.parameter.loading = false;
                _this.parameter.data = r.data;
                _this.parameter.user_id = _this.parameter.data.user.id;
            }, function (error) {
                _this.parameter.loading = false;
            });
        });
    };
    ManualLeadDetailsComponent.prototype.viewPropertyDetails = function (property) {
        this.cs.setPropertyDetails(property);
        this.router.navigate(['/dashboard/properties/details/' + property.id]);
    };
    ManualLeadDetailsComponent.prototype.closeModal = function () {
        this.modalClose.nativeElement.click();
    };
    ManualLeadDetailsComponent.prototype.addLeadNote = function () {
        var _this = this;
        this.admin.postDataApi('addManualLeadNote', { manual_lead_id: this.parameter.lead_id, note: this.model.note }).subscribe(function (r) {
            _this.closeModal();
            // this.parameter.items.push(r.data);
            _this.parameter.data.notes.unshift(r.data);
            swal('Success', _this.constant.successMsg.NOTE_ADDED_SUCCESSFULLY, 'success');
        });
    };
    ManualLeadDetailsComponent.prototype.deleteLeadPopup = function (note_id, index) {
        var _this = this;
        swal({
            title: 'Are you sure?',
            text: 'You want to delete this note?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Delete!'
        }).then(function (result) {
            if (result.value) {
                _this.deleteLeadNote(note_id, index);
            }
        });
    };
    ManualLeadDetailsComponent.prototype.deleteLeadNote = function (note_id, index) {
        var _this = this;
        this.admin.postDataApi('deleteManualLeadNote', { note_id: note_id }).subscribe(function (r) {
            _this.parameter.data.notes.splice(index, 1);
            swal('Success', _this.constant.successMsg.NOTE_DELETED_SUCCESSFULLY, 'success');
        });
    };
    var _a, _b, _c, _d, _e, _f, _g, _h;
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('modalOpen'),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _a : Object)
    ], ManualLeadDetailsComponent.prototype, "modalOpen", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('modalClose'),
        __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _b : Object)
    ], ManualLeadDetailsComponent.prototype, "modalClose", void 0);
    ManualLeadDetailsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-manual-lead-details',
            template: __webpack_require__("../../../../../src/app/layout/manual-leads/manual-lead-details/manual-lead-details.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/manual-leads/manual-lead-details/manual-lead-details.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_5__models_leads_model__["a" /* Notes */]]
        }),
        __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" ? _c : Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */]) === "function" ? _d : Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" ? _e : Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__services_common_service__["a" /* CommonService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_common_service__["a" /* CommonService */]) === "function" ? _f : Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_4__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__common_constants__["a" /* Constant */]) === "function" ? _g : Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_5__models_leads_model__["a" /* Notes */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__models_leads_model__["a" /* Notes */]) === "function" ? _h : Object])
    ], ManualLeadDetailsComponent);
    return ManualLeadDetailsComponent;
}());

//# sourceMappingURL=manual-lead-details.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/manual-leads/manual-leads.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".add-img{\n    background-size: cover;background-repeat: no-repeat;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/manual-leads/manual-leads.component.html":
/***/ (function(module, exports) {

module.exports = "\n<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<div class=\"container-fluid\">\n\n    <div class=\"row\">\n        <div class=\"col-12\">\n        <div class=\"title-group\">\n            <h5>Manual Leads</h5>\n            <p>Showing {{items?.length}} out of {{parameter.total}}</p>\n        </div>\n        </div>\n    </div>\n\n    <div class=\"white-bg\">\n        <div class=\"tabel-section\">\n            <div class=\"table-responsive\">\n                <table class=\"table table-striped table-align-left vertical-align-top\">\n                <tr>\n                    <th style=\"width:10%\">\n                        <div class=\"table-search\"></div>\n                    </th>\n                    <th style=\"width:20%\">\n                        <div class=\"table-search\">\n                            <label>Name</label>\n                            <div class=\"searh-3\">\n                                <input type=\"text\" [(ngModel)]=\"parameter.name\" (keyup.enter)=\"changeFilter('name',$event.target.value)\" name=\"\">\n                                <button *ngIf=\"parameter.name\" (click)=\"changeFilter('name', parameter.name)\"><i class=\"fa fa-search\"></i></button>\n                            </div>\n                        </div>\n                    </th>\n                    <th style=\"width:20%; text-align:left;\">\n                        <div class=\"table-search\">\n                            <label>Contact Number</label>\n                            <div class=\"searh-3\">\n                                <input type=\"text\" [(ngModel)]=\"parameter.phone\" (keyup.enter)=\"changeFilter('phone',$event.target.value)\" name=\"\">\n                                <button *ngIf=\"parameter.phone\" (click)=\"changeFilter('phone', parameter.phone)\"><i class=\"fa fa-search\"></i></button>\n                            </div>\n                        </div>\n                    </th>\n                    <th style=\"width:20%\">\n                        <div class=\"table-search\">\n                            <label>Email</label>\n                            <div class=\"searh-3\">\n                                <input type=\"text\" [(ngModel)]=\"parameter.email\" (keyup.enter)=\"changeFilter('email',$event.target.value)\" name=\"\">\n                                <button *ngIf=\"parameter.email\" (click)=\"changeFilter('email', parameter.email)\"><i class=\"fa fa-search\"></i></button>\n                            </div>\n                        </div>\n                    </th>\n                    <th style=\"width:15%\">\n                        <div class=\"table-search\">\n                            <label>Status</label>\n                        </div>\n                    </th>\n                    <th style=\"width:15%\">\n                        <div class=\"table-search\">\n                            <label>Type</label>\n                        </div>\n                    </th>\n                    <!-- <th></th> -->\n                </tr>\n                <tr class=\"cursor-pointer\" title=\"Click to view details\" *ngFor=\"let item of items| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: parameter.total }\" routerLink=\"/dashboard/manual-leads/view-details/{{item.id}}\">\n                    <td><img [src]=\"item.image\" class=\"rounded-circle\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\"></td>\n                    <td class=\"text-left\">\n                        <span *ngIf=\"item.name\"class=\"name\">{{item.name}}</span>\n                        <span class=\"name\" *ngIf=\"!item.name\">NA</span>\n                    </td>\n                    <td class=\"text-left\" *ngIf=\"item.phone\">{{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}</td>\n                    <td class=\"text-left\" *ngIf=\"!item.phone\">NA</td>\n                    <td class=\"text-left\" *ngIf=\"item.email\">{{item.email}}</td>\n                    <td class=\"text-left\" *ngIf=\"!item.email\">NA</td>\n                    <td class=\"text-left\">\n                            <!-- background: #939292;\n                            padding: 4px 8px;\n                            color: #fff;\n                            border-radius: 12px; -->\n                        <span [style.color]=\"item?.status?.hex_code\">{{item?.status?.name}}</span>\n                    </td>\n                    <td class=\"text-left\" [style.color]=\"item?.type?.hex_code\">{{item?.type?.name}}</td>\n                    <!-- <td>\n                        <button title=\"View Details\" routerLink=\"/dashboard/manual-leads/view-details/{{item.id}}\" class=\"action-icon\"><img src=\"./../../../../assets/img/edit.png\" alt=\"img\"></button>\n                    </td> -->\n                </tr>\n                </table>\n            </div>\n        </div>\n\n        <div class=\"center\" *ngIf=\"items?.length == 0\">\n            <img src=\"assets/img/404-error.png\">\n        </div>\n    </div>         \n\n    <div class=\"btn-cont text-right marginT15\" *ngIf=\"parameter.total\">\n        <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n    </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/layout/manual-leads/manual-leads.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManualLeadsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ManualLeadsComponent = /** @class */ (function () {
    function ManualLeadsComponent(admin, constant) {
        this.admin = admin;
        this.constant = constant;
        this.parameter = {};
        this.items = [];
    }
    ManualLeadsComponent.prototype.ngOnInit = function () {
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        this.getListing();
    };
    ManualLeadsComponent.prototype.changeFlag = function (flag) {
        this.parameter.flag = flag;
        this.getListing();
    };
    ManualLeadsComponent.prototype.changeFilter = function (key, value) {
        this.parameter[key] = value;
        this.getListing();
    };
    ManualLeadsComponent.prototype.getPage = function (page) {
        this.parameter.page = page;
        this.getListing();
    };
    ManualLeadsComponent.prototype.getListing = function () {
        var _this = this;
        this.parameter.url = 'getManualLeads';
        this.parameter.loading = true;
        this.admin.postDataApi(this.parameter.url, this.parameter)
            .subscribe(function (success) {
            _this.parameter.loading = false;
            console.log('suceess', success);
            _this.items = success.data;
            _this.parameter.total = success.total_count;
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    var _a, _b;
    ManualLeadsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-manual-leads',
            template: __webpack_require__("../../../../../src/app/layout/manual-leads/manual-leads.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/manual-leads/manual-leads.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" ? _a : Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__common_constants__["a" /* Constant */]) === "function" ? _b : Object])
    ], ManualLeadsComponent);
    return ManualLeadsComponent;
}());

//# sourceMappingURL=manual-leads.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/manual-leads/manual-leads.module.ts":
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__manual_leads_component__ = __webpack_require__("../../../../../src/app/layout/manual-leads/manual-leads.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__manual_lead_details_manual_lead_details_component__ = __webpack_require__("../../../../../src/app/layout/manual-leads/manual-lead-details/manual-lead-details.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__modules_shared_module__ = __webpack_require__("../../../../../src/app/modules/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__guards_acl_user_guard__ = __webpack_require__("../../../../../src/app/guards/acl-user.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ngx_malihu_scrollbar__ = __webpack_require__("../../../../ngx-malihu-scrollbar/dist/lib/index.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManualLeadsModule", function() { return ManualLeadsModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var routes = [
    // { path: '', component: ManualLeadsComponent }
    { path: 'view-all', component: __WEBPACK_IMPORTED_MODULE_7__manual_leads_component__["a" /* ManualLeadsComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_10__guards_acl_user_guard__["a" /* AclUserGuard */]], data: { roles: ['Manual Leads', 'can_read', ''] } },
    { path: 'view-details/:id', component: __WEBPACK_IMPORTED_MODULE_8__manual_lead_details_manual_lead_details_component__["a" /* ManualLeadDetailsComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_10__guards_acl_user_guard__["a" /* AclUserGuard */]], data: { roles: ['Manual Leads', 'can_read', ''] } }
];
var ManualLeadsModule = /** @class */ (function () {
    function ManualLeadsModule() {
    }
    ManualLeadsModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* RouterModule */].forChild(routes),
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_3_ngx_loading__["a" /* LoadingModule */].forRoot({
                    animationType: __WEBPACK_IMPORTED_MODULE_3_ngx_loading__["b" /* ANIMATION_TYPES */].rectangleBounce,
                    primaryColour: '#00B96F'
                }),
                __WEBPACK_IMPORTED_MODULE_4_ngx_pagination__["a" /* NgxPaginationModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["ReactiveFormsModule"],
                __WEBPACK_IMPORTED_MODULE_6_ng2_tel_input__["Ng2TelInputModule"],
                __WEBPACK_IMPORTED_MODULE_11_ngx_malihu_scrollbar__["a" /* MalihuScrollbarModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_9__modules_shared_module__["a" /* SharedModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__manual_leads_component__["a" /* ManualLeadsComponent */],
                __WEBPACK_IMPORTED_MODULE_8__manual_lead_details_manual_lead_details_component__["a" /* ManualLeadDetailsComponent */]
            ]
        })
    ], ManualLeadsModule);
    return ManualLeadsModule;
}());

//# sourceMappingURL=manual-leads.module.js.map

/***/ })

});
//# sourceMappingURL=10.chunk.js.map