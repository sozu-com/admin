(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["banks-banks-module"],{

/***/ "./src/app/layout/banks/bank-leads/bank-lead-details/bank-lead-details.component.css":
/*!*******************************************************************************************!*\
  !*** ./src/app/layout/banks/bank-leads/bank-lead-details/bank-lead-details.component.css ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/layout/banks/bank-leads/bank-lead-details/bank-lead-details.component.html":
/*!********************************************************************************************!*\
  !*** ./src/app/layout/banks/bank-leads/bank-lead-details/bank-lead-details.component.html ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n    <div class=\"white-bg padding15\">\n        <div class=\"row\">\n            <div class=\"col-lg-3 col-md-12 col-sm-6 col-12\">\n                <div class=\"df-profile\">\n                    <a routerLink=\"../\"><i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i></a>\n                    <img [src]=\"parameter.lead?.user?.image| img:'small'\" onerror='src=\"assets/img/default_img.png\"'\n                        alt=\"img\">\n                    <div class=\"df-info\" *ngIf=\"parameter.lead?.user\">\n                        <p class=\"p14\">{{parameter.lead.user.name | titlecase}}</p>\n                        <p class=\"p12\">Status: Open</p>\n                    </div>\n                </div>\n            </div>\n            <div class=\"col-lg-7 col-md-12 col-sm-6 col-12\">\n                <div class=\"profile-list\">\n                    <ul>\n                        <li>\n                            <div class=\"df-info\">\n                                <p class=\"p14 marginB0\" *ngIf=\"parameter.lead?.admin\">\n                                    {{parameter.lead.admin.name | titlecase}}</p>\n                                <p class=\"p12\">CSR Buyer</p>\n                            </div>\n                        </li>\n                        <li>\n                            <div class=\"df-info\" *ngIf=\"parameter.lead?.broker\">\n                                <p class=\"p14 marginB0\">{{parameter.lead.broker.name | titlecase}}</p>\n                                <p class=\"p12\">\n                                    {{parameter.lead?.broker?.is_external_agent==1 ? 'Outside Agent' : 'Inhouse Agent'}}\n                                </p>\n                            </div>\n                        </li>\n                        <li>\n                            <div class=\"df-info\" *ngIf=\"parameter.lead?.closer\">\n                                <p class=\"p14 marginB0\">{{parameter.lead.closer.name | titlecase}}</p>\n                                <p class=\"p12\">CSR Closer</p>\n                            </div>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n            <div class=\"col-lg-2 col-md-12 col-sm-12 col-12\">\n                <div class=\"row\">\n                    <div class=\"col-sm-12 btn-cont text-right\">\n                        <a *ngIf=\"parameter?.lead?.lead_status_bank!=1 &&\n                      (admin?.admin_acl['Bank Lead Management']?.can_update==1 || admin?.permissions?.can_bank==1)\"\n                            (click)=\"markLeadClose()\" class=\"btn btn-fourth\" href=\"javascript://\">\n                            Close Lead\n                        </a>\n                        <a *ngIf=\"parameter?.lead?.lead_status_bank==1\" style=\"cursor: auto;\" class=\"btn btn-fourth\"\n                            href=\"javascript://\">\n                            Lead Closed\n                        </a>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"spacer30\"></div>\n    <div class=\"row\">\n        <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\">\n            <div class=\"white-bg padding30\">\n                <div class=\"row\">\n                <div class=\"col-md-6\">\n                    <h6>Details</h6>\n                </div>\n                <!-- <div class=\"col-md-6\">\n                    <div class=\"edit text-right\"><a href=\"javascript://\">Edit</a></div>\n                </div> -->\n                </div>\n                <div class=\"details-table\">\n                <table class=\"table\">\n                    <tr>\n                        <td style=\"padding-left:0\"><label>Full Name</label></td>\n                        <td colspan=\"2\" *ngIf=\"parameter.lead?.name\">{{parameter.lead.user.name | titlecase}}</td>\n                    </tr>\n                    <tr>\n                        <td style=\"padding-left:0\"><label>Contact Number</label></td>\n                        <td colspan=\"2\" *ngIf=\"parameter.lead?.phone\">{{parameter.lead.user.dial_code ? parameter.lead.user.dial_code : constant.dial_code}}-{{parameter.lead.user.phone}}</td>\n                    </tr>\n                    <tr>\n                        <td style=\"padding-left:0\"><label>Email address</label></td>\n                        <td colspan=\"2\" *ngIf=\"parameter.lead?.email\">{{parameter.lead.user.email}}</td>\n                    </tr>\n                    <tr>\n                        <td style=\"padding-left:0\"><label>Interested In</label></td>\n                        <td *ngIf=\"parameter.lead?.configuration\">\n                            <span *ngFor=\"let conf of parameter?.lead?.configuration; let ii=index\">\n                                <app-property-configuration [configuration]=\"conf\"></app-property-configuration>\n                                <!-- <span *ngIf=\"conf.bedroom!=0\">{{conf.bedroom}} Bed </span>\n                                <span *ngIf=\"conf.bathroom!=0\">&middot; {{conf?.bathroom}} Bath </span>\n                                <span *ngIf=\"conf.half_bathroom!=0\">&middot; {{conf.half_bathroom}} Half Bath</span> -->\n\n                                <span *ngIf=\"ii<parameter?.lead?.configuration?.length-1\"> | </span><br>\n                            </span>\n                            <span *ngIf=\"parameter?.lead?.configuration?.length==0\">NA</span>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td style=\"padding-left:0\"><label><strong>Property Selected</strong></label></td>\n                        <td *ngIf=\"parameter.lead?.selected_properties?.length!=0\">\n                            <p class=\"p14 marginB0\">\n                                <!-- {{parameter.lead?.selected_properties[0]?.property?.configuration.name}} -->\n                                <app-property-configuration *ngIf=\"parameter.lead?.selected_properties[0]?.property?.configuration\" [configuration]=\"parameter.lead?.selected_properties[0]?.property?.configuration\"></app-property-configuration>\n                                <!-- <span *ngIf=\"parameter.lead?.selected_properties[0]?.property?.configuration.bedroom!=0\">{{parameter.lead?.selected_properties[0]?.property?.configuration.bedroom}} Bed </span>\n                                <span *ngIf=\"parameter.lead?.selected_properties[0]?.property?.configuration.bathroom!=0\">&middot; {{parameter.lead?.selected_properties[0]?.property?.configuration?.bathroom}} Bath </span>\n                                <span *ngIf=\"parameter.lead?.selected_properties[0]?.property?.configuration.half_bathroom!=0\">&middot; {{parameter.lead?.selected_properties[0]?.property?.configuration.half_bathroom}} Half Bath</span> -->\n                            </p>\n                            <p title=\"Building\" class=\"p12 marginB0\"><strong>{{parameter.lead?.selected_properties[0]?.property?.building?.name}}</strong></p>\n                            <p title=\"Developer\" class=\"p11\"><i>{{parameter.lead?.selected_properties[0]?.property?.building?.developer?.name | titlecase}}</i></p>\n                            <p class=\"marginB0\" *ngIf=\"parameter.lead?.selected_properties?.length!=0\">\n                                <a class=\"view-all-2\" href=\"javascript://\" (click)=\"viewPropertyDetails(parameter.lead?.selected_properties[0])\"> View Property</a>\n                            </p>\n                        </td>\n                        <!-- <td *ngIf=\"parameter.lead?.selected_properties?.length!=0\">\n                            <a class=\"view-all-2\" href=\"javascript://\" (click)=\"viewPropertyDetails(parameter.lead?.selected_properties[0])\"> View Property</a>\n                        </td> -->\n                    </tr>\n                </table>\n                </div>\n            </div>\n\n            <!-- notes start -->\n            <app-notes [sent_as]=\"parameter.sent_as\" [lead_id]=\"parameter.lead_id\"></app-notes>\n            <!-- notes end -->\n\n        </div>\n\n\n        <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\">\n\n            <!-- chat start -->\n            <div *ngIf=\"parameter.lead?.user\">\n                <app-chat [other_sent_as]=\"3\" [lead_id]=\"parameter.lead_id\" [sent_as]=\"parameter.sent_as\"\n                    [user_id]=\"parameter.user_id\" [admin_id]=\"parameter.admin_id\"></app-chat>\n            </div>\n            <!-- chat end -->\n\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/layout/banks/bank-leads/bank-lead-details/bank-lead-details.component.ts":
/*!******************************************************************************************!*\
  !*** ./src/app/layout/banks/bank-leads/bank-lead-details/bank-lead-details.component.ts ***!
  \******************************************************************************************/
/*! exports provided: BankLeadDetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BankLeadDetailsComponent", function() { return BankLeadDetailsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var src_app_models_leads_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/leads.model */ "./src/app/models/leads.model.ts");
/* harmony import */ var src_app_models_chat_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/chat.model */ "./src/app/models/chat.model.ts");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
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









var BankLeadDetailsComponent = /** @class */ (function () {
    function BankLeadDetailsComponent(route, router, admin, cs, constant, spinner, selectedProperties, model, translate) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.admin = admin;
        this.cs = cs;
        this.constant = constant;
        this.spinner = spinner;
        this.selectedProperties = selectedProperties;
        this.model = model;
        this.translate = translate;
        this.parameter = {};
        this.scrollbarOptions = { axis: 'y', theme: 'dark' };
        this.admin.loginData$.subscribe(function (success) {
            _this.parameter.admin_id = success['id'];
        });
    }
    BankLeadDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.parameter.sent_as = this.constant.userType.bank;
        this.route.params.subscribe(function (params) {
            _this.parameter.lead_id = params.id;
            _this.spinner.show();
            _this.admin.postDataApi('leads/details', { lead_id: _this.parameter.lead_id, sent_as: _this.parameter.sent_as }).subscribe(function (r) {
                _this.getDocumentOptions();
                _this.spinner.hide();
                _this.parameter.lead = r.data.lead;
                _this.selectedProperties = r.data.lead.selected_properties[0];
                // bank will chat with closer only
                _this.parameter.user_id = _this.parameter.lead.closer.id;
            }, function (error) {
                _this.spinner.hide();
            });
        });
    };
    BankLeadDetailsComponent.prototype.setValue = function (i) {
        this.selectedProperties.allDocuments[i].is_selected =
            this.selectedProperties.allDocuments[i].is_selected && this.selectedProperties.allDocuments[i].is_selected === 1 ? 0 : 1;
    };
    BankLeadDetailsComponent.prototype.getDocumentOptions = function () {
        var _this = this;
        this.admin.postDataApi('getDocumentOptions', {}).subscribe(function (r) {
            _this.selectedProperties.allDocuments = r.data;
            _this.selectedProperties.allDocuments.forEach(function (element) {
                _this.selectedProperties.selected_documents.forEach(function (pt) {
                    if (pt.id === element.id) {
                        element.is_selected = 1;
                    }
                });
            });
        });
    };
    BankLeadDetailsComponent.prototype.updateDocumentChecklist = function () {
        var _this = this;
        var ids = this.selectedProperties.allDocuments.filter(function (d) { return d.is_selected === 1; });
        var documents_ids = ids.map(function (d) { return d.id; });
        var input = {
            lead_id: this.parameter.lead_id,
            property_id: this.selectedProperties.property_id,
            documents: documents_ids
        };
        this.spinner.show();
        this.admin.postDataApi('leads/updateDocumentChecklist', input).subscribe(function (r) {
            _this.spinner.hide();
            swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.savedSuccessfully'), 'success');
        }, function (error) {
            _this.spinner.hide();
        });
    };
    BankLeadDetailsComponent.prototype.noDocumentUploaded = function () {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.noDocumentUploadedYet'), 'error');
    };
    BankLeadDetailsComponent.prototype.viewPropertyDetails = function (property) {
        this.cs.setPropertyDetails(property);
        this.router.navigate(['/dashboard/properties/details/' + property.property_id]);
    };
    BankLeadDetailsComponent.prototype.markLeadClose = function () {
        var _this = this;
        swal({
            html: this.translate.instant('message.question.areYouSure') + '<br>' +
                this.translate.instant('message.question.wantTocloseLead'),
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.spinner.show();
                _this.admin.postDataApi('leads/bank-mark-lead-closed', { lead_id: _this.parameter.lead_id }).subscribe(function (r) {
                    _this.spinner.hide();
                    _this.parameter.lead.lead_status_bank = 1;
                    swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.leadClosedSuccessfully'), 'success');
                }, function (error) {
                    _this.spinner.hide();
                });
            }
        });
    };
    BankLeadDetailsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-bank-lead-details',
            template: __webpack_require__(/*! ./bank-lead-details.component.html */ "./src/app/layout/banks/bank-leads/bank-lead-details/bank-lead-details.component.html"),
            styles: [__webpack_require__(/*! ./bank-lead-details.component.css */ "./src/app/layout/banks/bank-leads/bank-lead-details/bank-lead-details.component.css")],
            providers: [src_app_models_leads_model__WEBPACK_IMPORTED_MODULE_3__["SelectedProperties"], src_app_models_leads_model__WEBPACK_IMPORTED_MODULE_3__["BankAssigned"], src_app_models_leads_model__WEBPACK_IMPORTED_MODULE_3__["NotaryAssigned"], src_app_models_chat_model__WEBPACK_IMPORTED_MODULE_4__["Chat"]]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_5__["AdminService"],
            src_app_services_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"],
            src_app_common_constants__WEBPACK_IMPORTED_MODULE_7__["Constant"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_2__["NgxSpinnerService"],
            src_app_models_leads_model__WEBPACK_IMPORTED_MODULE_3__["SelectedProperties"],
            src_app_models_chat_model__WEBPACK_IMPORTED_MODULE_4__["Chat"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__["TranslateService"]])
    ], BankLeadDetailsComponent);
    return BankLeadDetailsComponent;
}());



/***/ }),

/***/ "./src/app/layout/banks/bank-leads/bank-leads.component.css":
/*!******************************************************************!*\
  !*** ./src/app/layout/banks/bank-leads/bank-leads.component.css ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/layout/banks/bank-leads/bank-leads.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/layout/banks/bank-leads/bank-leads.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container-fluid\">\n    <div class=\"row\">\n        <div class=\"col-md-4\">\n            <div class=\"form-group\">\n                    <p class=\"p16\">{{'viewBanksLeads.label' | translate}}</p>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-md-4\">\n            <div class=\"form-group\" *ngIf=\"admin?.admin_acl['Bank Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n                <div class=\"d-flex\">\n                <div class=\"autocomplete\">\n                    <input placeholder=\"Search Bank\" style=\"max-width:200px\" list=\"amenities\" [(ngModel)]=\"parameter.keyword\" (input)=\"getCsrListing()\" class=\"form-control\" type=\"text\" name=\"keyword\" (focusout)=\"closeCsrListing()\">\n                    <div id=\"myInputautocomplete-list\" class=\"autocomplete-items\">\n                        <div *ngFor=\"let item of users\" (click)=\"selectCsrUser(item)\">{{item.email}}</div>\n                    </div>\n                </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-md-8 col-12\">\n            <div class=\"cust-tabs-2\">\n                <ul class=\"nav nav-tabs\">\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==1}\" (click)=\"changeFlag(1)\" >{{'filters.time.thisWeek' | translate}}</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==2}\" (click)=\"changeFlag(2)\" >{{'filters.time.thisMonth' | translate}}</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==3}\" (click)=\"changeFlag(3)\" >{{'filters.time.lastMonth' | translate}}</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==4}\" (click)=\"changeFlag(4)\" >{{'filters.time.lifetime' | translate}}</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==5}\" (click)=\"parameter.flag=5\" >{{'filters.time.custom.label' | translate}}</a>\n                </li>\n                </ul>\n            </div>\n        </div>\n    </div>\n    \n    <div class=\"row\">\n        <div class=\"col-12\">\n            <div *ngIf=\"parameter.flag == 5\" class=\"row\">\n                <div class=\"offset-lg-7\"></div>\n                <div class=\"col-lg-2 col-md-2 col-sm-5 col-5\">\n                <div class=\"form-group marginB0\">\n                    <label>{{'filters.time.custom.from' | translate}}</label>\n                    <p-calendar showIcon=\"true\" [locale]=\"locale\" [(ngModel)]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n                </div>\n                </div>\n                <div class=\"col-lg-2 col-md-2 col-sm-5 col-5\">\n                <div class=\"form-group marginB0\">\n                    <label>{{'filters.time.custom.to' | translate}}</label>\n                    <p-calendar showIcon=\"true\" [locale]=\"locale\" [(ngModel)]=\"parameter.max\" [minDate]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n                </div>\n                </div>\n                <div class=\"col-lg-1 col-md-2 col-sm-2 col-6\">\n                <div class=\"form-group btn-cont\">\n                    <label class=\"addMT3\">&nbsp;</label>\n                    <button class=\"btn btn-calender\" href=\"javascript://\" (click)=\"getListing(); getCSRDashBoardData();\"\n                        [disabled]=\"!parameter.min || !parameter.max\">{{'filters.time.custom.applyBtn' | translate}}</button>\n                </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"listingResults\">\n        <div *ngIf=\"selectedUser as item\" class=\"sigle-row-table\">\n            <table class=\"table table-striped\">\n            <tbody><tr>\n                <td>\n                    <img *ngIf=\"item.image\" [defaultImage]=\"item.image| img:'thumb'\" [lazyLoad]=\"item.image\" class=\"rounded-circle\" alt=\"img\">\n                    <img *ngIf=\"!item.image\" class=\"rounded-circle\" src=\"assets/img/default_img.png\" alt=\"img\">\n                </td>\n                <td class=\"text-left\">\n                    <span class=\"name\">{{item.name | titlecase}}</span>\n                </td>\n                <td class=\"text-left\">{{item.phone}}</td>\n                <td class=\"text-left\">{{item.email}}</td>\n                <td>\n                    <a (click)=\"removeCsrUser()\" href=\"javascript://\" class=\"icon-block edit-icon\"><img src=\"assets/img/remove-icon.png\" alt=\"remove\" title=\"{{'table.title.remove' | translate}}\" /></a>\n                </td>\n                </tr>\n            </tbody>\n            </table>\n        </div>\n        <div class=\"spacer30\"></div>\n        <div class=\"row\">\n            <div class=\"col-lg-8 col-md-12 col-sm-12 col-12\" >\n            <div class=\"info-box all-leads marginT0\">\n                <div class=\"one-row\" [ngClass]=\"{'active':parameter.count_flag == '1'}\" (click)=\"changeCountFlag(1)\">\n                    <div class=\"o-block\">\n                        <h5>{{'table.dashboard.allLeads' | translate}}</h5>\n                        <small>{{'table.dashboard.total' | translate}}</small>\n                    </div>\n                    <div class=\"o-block\">\n                        <a class=\"view-all\" href=\"javascript://\">{{'table.dashboard.viewAll' | translate}}</a>\n                        <h4>{{dash.all_count | numberWithCommas}}</h4>\n                    </div>\n                </div>\n            </div>\n            <div class=\"info-box all-leads\">\n                <div class=\"row\">\n                    <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == '2'}\" (click)=\"changeCountFlag(2)\" >\n                    <div class=\"one-row \">\n                        <div class=\"o-block\">\n                            <h5>{{'table.dashboard.leads' | translate}}</h5>\n                            <small>{{'table.dashboard.open' | translate}}</small>\n                        </div>\n                        <div class=\"o-block\">\n                            <a class=\"view-all\" href=\"javascript://\">{{'table.dashboard.viewAll' | translate}}</a>\n                            <h4>{{dash.open_count | numberWithCommas}}</h4>\n                        </div>\n                    </div>\n                    </div>\n                    <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == '3'}\" (click)=\"changeCountFlag(3)\">\n                    <div class=\"one-row\">\n                        <div class=\"o-block\">\n                            <h5>{{'table.dashboard.leads' | translate}}</h5>\n                            <small>{{'table.dashboard.closed' | translate}}</small>\n                        </div>\n                        <div class=\"o-block\">\n                            <a class=\"view-all\" href=\"javascript://\">{{'table.dashboard.viewAll' | translate}}</a>\n                            <h4>{{dash.close_count | numberWithCommas}}</h4>\n                        </div>\n                    </div>\n                    </div>\n                </div>\n            </div>\n            </div>\n            <div class=\"col-lg-4 col-md-12 col-sm-12 col-12\">\n                <div class=\"chat-msg all-leads marginT0\" style=\"padding:0px\">\n                    <div class=\"padding20\" *ngIf=\"dash.lead_total == 0\">{{'message.error.noRecordFound' | translate}}</div>\n                    <ngx-charts-pie-chart [results]=\"chartView\"></ngx-charts-pie-chart>\n                </div>\n            </div>\n        </div>\n      <div class=\"row\">\n         <div class=\"col-12\">\n            <div class=\"spacer40\"></div>\n         </div>\n      </div>\n      <div class=\"row\">\n         <div class=\"col-6\">\n            <div class=\"title-group\">\n                <h5>{{'table.dashboard.leads' | translate}} \n                    <span *ngIf=\"parameter.count_flag == 1\">({{'table.dashboard.total' | translate}})</span>\n                    <span *ngIf=\"parameter.count_flag == 2\">({{'table.dashboard.open' | translate}})</span>\n                    <span *ngIf=\"parameter.count_flag == 3\">({{'table.dashboard.closed' | translate}})</span>\n                </h5>\n               <p>\n                   <!-- Showing {{parameter.page}} out of {{parameter.total_count}} -->\n                </p>\n            </div>\n         </div>\n         <div class=\"col-6\" *ngIf=\"admin?.admin_acl['Bank Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n            <div class=\"add-new text-right\">\n                <a class=\"btn\" (click)=\"bulkAssign()\" href=\"javascript://\">{{'table.bulkReAssign' | translate}}</a>\n            </div>\n        </div>\n      </div>\n      <div class=\"white-bg\">\n         <div class=\"tabel-section\">\n            <div class=\"table-responsive\">\n                <table class=\"table table-striped border-0\">\n                    <tbody><tr>\n                    <th *ngIf=\"admin?.admin_acl['Bank Lead Management']?.can_read==1 && !this.parameter.assignee_id\" style=\"width:6%\">\n                        <div class=\"table-search\">\n                        <a (click)=\"selectAll()\"><label>{{'table.th.all' | translate}}</label></a>\n                        </div>\n                    </th>\n                    <th style=\"width:6%;\">\n                        <div class=\"table-search\">\n                            <label>{{'table.th.image' | translate}}</label>\n                        </div>\n                    </th>\n                        <th style=\"width:20%;\">\n                            <div class=\"table-search\">\n                            <label>{{'table.th.name' | translate}}</label>\n                            <div class=\"searh-3\">\n                                <input type=\"text\" [(ngModel)]=\"parameter.name\" (keyup.enter)=\"changeFilter('name',$event.target.value)\" name=\"\">\n                                <button *ngIf=\"parameter.name\" (click)=\"changeFilter('name', parameter.name)\"><i class=\"fa fa-search\"></i></button>\n                            </div>\n                            </div>\n                        </th>\n                        <th style=\"width:20%; text-align:left;\">\n                            <div class=\"table-search\">\n                            <label>{{'table.th.contactNumber' | translate}}</label>\n                            <div class=\"searh-3\">\n                                <input type=\"text\" [(ngModel)]=\"parameter.phone\" (keyup.enter)=\"changeFilter('phone',$event.target.value)\" name=\"\">\n                                <button *ngIf=\"parameter.phone\" (click)=\"changeFilter('phone', parameter.phone)\"><i class=\"fa fa-search\"></i></button>\n                            </div>\n                            </div>\n                        </th>\n                        <th style=\"width:25%;\">\n                            <div class=\"table-search\">\n                            <label>{{'table.th.emailAddress' | translate}}</label>\n                            <div class=\"searh-3\">\n                                <input type=\"text\" [(ngModel)]=\"parameter.email\" (keyup.enter)=\"changeFilter('email',$event.target.value)\" name=\"\">\n                                <button *ngIf=\"parameter.email\" (click)=\"changeFilter('email', parameter.email)\"><i class=\"fa fa-search\"></i></button>\n                            </div>\n                            </div>\n                        </th>\n                        <th style=\"width:20%;\">\n                            <div class=\"table-search\">\n                            <label>{{'table.th.assignee' | translate}}</label>\n                            </div>\n                        </th>\n                    </tr>\n                    <tr class=\"cursor-pointer\" title=\"{{'table.title.clickToViewDetails' | translate}}\" *ngFor=\"let item of items| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: parameter.total }; let i=index\"\n                        routerLink=\"/dashboard/banks/bank-leads/{{item.id}}\">\n                        <td *ngIf=\"admin?.admin_acl['Bank Lead Management']?.can_read==1 && !this.parameter.assignee_id\" (click)=\"$event.stopPropagation()\">\n                            <label class=\"cust-check-bx\" >\n                            <input type=\"checkbox\" [(ngModel)]=\"item.selected\" name=\"document\">\n                            <span class=\"checkmark\"></span>\n                            </label>\n                        </td>\n                        <td>\n                            <img class=\"rounded-circle\" [src]=\"item.user.image| img:'small'\" onerror=\"this.src='assets/img/default_img.png'\" alt=\"img\">\n                        </td>\n                        <td class=\"text-left\">\n                            <span class=\"name\">{{item.user.name | titlecase}}</span>\n                        </td>\n                        <td class=\"text-left\">\n                            {{item.user.dial_code ? item.user.dial_code : constant.dial_code}}-{{item.user.phone}}<br>\n                        </td>\n                        <td class=\"text-left\">\n                            {{item.user.email}}\n                        </td>\n                        <td class=\"text-left\" title=\"Bank\">\n                            {{item?.selected_properties[0]?.banks[0]?.name | titlecase}}\n                        </td>\n                        <!-- <td>\n                        <a style=\"display:none;\" #modalOpen class=\"green-color fontW500\" data-toggle=\"modal\" data-target=\"#set-availability\" href=\"javascript://\">Change Availability</a>\n                        <a class=\"green-color fontW500\" (click)=\"openModal(item, i)\" href=\"javascript://\">Change Availability</a>\n                        </td> -->\n                        <!-- <td>\n                            <a title=\"View Details\" href=\"javascript://\" routerLink=\"/dashboard/banks/bank-leads/{{item.id}}\" class=\"icon-block edit-icon\"><img src=\"assets/img/viewfull.png\" alt=\"img\"></a> \n                        </td> -->\n                    </tr>\n                </tbody>\n            </table>\n            <div class=\"padding20 center\" *ngIf=\"parameter.noResultFound\">\n            <img src=\"assets/img/404-error.png\">\n            </div>\n\n            </div>\n         </div>\n    \n        </div>\n    </div>\n    \n\n    <div class=\"btn-cont marginT15\" *ngIf=\"parameter.total\">\n        <div class=\"row\">\n            <div class=\"col-6\">\n                <div class=\"title-group\">\n                    <p>{{'table.pagination.showing' | translate}} {{items?.length}} {{'table.pagination.outof' | translate}} {{parameter.total}}</p>\n                </div>\n            </div>\n            <div class=\"col-6 text-right\">\n                <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n            </div>\n        </div>\n    </div>\n</div>\n\n\n<!-- Assignment model -->\n<a data-toggle=\"modal\" data-target=\"#assign-model\" #openAssignModel></a>\n<div class=\"modal\" id=\"assign-model\">\n        <div class=\"modal-dialog \">\n            <div class=\"modal-content notary-avail\">\n                <div class=\"modal-header popup-header\">\n                <h4 class=\"modal-title\">{{'viewBanksLeads.reAssisgnTo' | translate}}</h4>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #closeAssignModel>&times;</button>\n                </div>\n                <div class=\"modal-body\">\n                    <div class=\"row\">\n                        <div class=\"col-md-8\">\n                            <input style=\"max-width:200px\" list=\"amenities\" [(ngModel)]=\"assign.keyword\" (keyup.enter)=\"getAssignListing()\" class=\"form-control\" type=\"text\" name=\"keyword\" placeholder=\"Search\">\n                        </div>\n                        <div class=\"col-md-4 btn-cont\">\n                            <a class=\"btn btn-primary pull-right\" href=\"javascript://\" (click)=\"assignNow()\">{{'viewBanksLeads.assign' | translate}}</a>\n                        </div>\n                    </div>\n                    <div class=\"spacer40\"></div>\n                    <div class=\"modal-data\">\n                        <table class=\"table\">\n                            <tr *ngFor=\"let item of assign.items\">\n                                <td *ngIf=\"item.is_blocked!=1\">\n                                    <div class=\"n-avail-profile\">\n                                    <img [src]=\"item.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\">\n                                    <div class=\"n-avail-info\">\n                                        <p class=\"p12\">{{item.name | titlecase}}</p>\n                                        <p class=\"p10\">{{'viewBanksLeads.phone' | translate}} : {{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}</p>\n                                    </div>\n                                    </div>\n                                </td>\n                                <td *ngIf=\"item.is_blocked!=1\">\n                                    <label class=\"cust-check-bx float-right\">\n                                        <input type=\"radio\" name=\"notary_id\" (click)=\"assignItem = item\">\n                                        <span class=\"checkmark\"></span>\n                                    </label>\n                                </td>\n                            </tr>\n                        </table>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>"

/***/ }),

/***/ "./src/app/layout/banks/bank-leads/bank-leads.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/layout/banks/bank-leads/bank-leads.component.ts ***!
  \*****************************************************************/
/*! exports provided: BankLeadsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BankLeadsComponent", function() { return BankLeadsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var src_app_services_leads_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/leads.service */ "./src/app/services/leads.service.ts");
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








var BankLeadsComponent = /** @class */ (function () {
    function BankLeadsComponent(admin, leadsService, constant, route, spinner, translate) {
        this.admin = admin;
        this.leadsService = leadsService;
        this.constant = constant;
        this.route = route;
        this.spinner = spinner;
        this.translate = translate;
        this.parameter = {};
        this.location = {};
        this.assign = {};
        this.items = [];
        this.today = new Date();
        this.users = [];
        this.initSelection = false;
        this.dash = {
            all_count: 0,
            open_count: 0,
            close_count: 0
        };
        this.chartView = [];
    }
    BankLeadsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.locale = {
            firstDayOfWeek: 0,
            dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
            dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
            dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
            monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
            monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun',
                'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
            today: 'Hoy',
            clear: 'Clara',
            dateFormat: 'mm/dd/yy',
            weekHeader: 'Wk'
        };
        this.parameter.keyword = '';
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        this.parameter.flag = this.leadsService.bankLeadsFlag ? this.leadsService.bankLeadsFlag : this.constant.flag;
        this.parameter.total = 0;
        this.parameter.count_flag = this.leadsService.bankLeadsCountFlag ? this.leadsService.bankLeadsCountFlag : this.constant.count_flag;
        this.route.params.subscribe(function (params) {
            _this.parameter.assignee_id = params.id;
        });
        this.getListing();
        this.getCSRDashBoardData();
        Object.assign(this, this.chartView);
    };
    BankLeadsComponent.prototype.changeFlag = function (flag) {
        this.parameter.flag = flag;
        this.leadsService.bankLeadsFlag = flag;
        this.parameter.count_flag = 1;
        this.resetDates();
        this.getListing();
        this.getCSRDashBoardData();
    };
    BankLeadsComponent.prototype.changeFilter = function (key, value) {
        this.parameter[key] = value;
        this.getListing();
    };
    BankLeadsComponent.prototype.changeCountFlag = function (flag) {
        this.parameter.count_flag = flag;
        this.leadsService.bankLeadsCountFlag = flag;
        this.getListing();
    };
    BankLeadsComponent.prototype.getCsrListing = function () {
        var _this = this;
        this.initSelection = true;
        this.users = [];
        var input = new FormData();
        if (this.parameter.keyword) {
            input.append('keyword', this.parameter.keyword);
        }
        this.admin.postDataApi('getBanks', input).subscribe(function (success) {
            _this.users = success.data;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    BankLeadsComponent.prototype.resetFilters = function () {
        this.parameter.is_selected = false;
        this.parameter.page = this.constant.p;
        this.parameter.flag = 2;
        this.parameter.total = 0;
        this.parameter.keyword = '';
        this.parameter.count_flag = 1;
        this.resetDates();
        this.getListing();
        this.getCSRDashBoardData();
    };
    BankLeadsComponent.prototype.resetDates = function () {
        this.parameter.min = '';
        this.parameter.max = '';
    };
    BankLeadsComponent.prototype.closeCsrListing = function () {
        var _this = this;
        setTimeout(function () {
            _this.users = [];
        }, 200);
    };
    BankLeadsComponent.prototype.selectCsrUser = function (user) {
        this.selectedUser = user;
        this.users = [];
        this.parameter.keyword = '';
        this.initSelection = false;
        this.getListing();
        this.getCSRDashBoardData();
    };
    BankLeadsComponent.prototype.removeCsrUser = function () {
        this.selectedUser = '';
        this.parameter.keyword = '';
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        this.parameter.total = 0;
        this.parameter.count_flag = 1;
        this.getListing();
        this.getCSRDashBoardData();
    };
    BankLeadsComponent.prototype.getCSRDashBoardData = function () {
        var _this = this;
        var input = JSON.parse(JSON.stringify(this.parameter));
        if (this.parameter.min) {
            input.min = moment__WEBPACK_IMPORTED_MODULE_4__(this.parameter.min).format('YYYY-MM-DD');
        }
        if (this.parameter.max) {
            input.max = moment__WEBPACK_IMPORTED_MODULE_4__(this.parameter.max).format('YYYY-MM-DD');
        }
        if (this.selectedUser) {
            input.assignee_id = this.selectedUser.id;
        }
        else if (this.parameter.assignee_id) {
            input.assignee_id = this.parameter.assignee_id;
        }
        this.admin.postDataApi('leads/bank-dash-count', input).subscribe(function (r) {
            _this.dash = r.data;
            _this.chartView = [
                {
                    'name': _this.translate.instant('charts.leadsOpen'),
                    'value': parseInt(_this.dash.open_count, 10)
                },
                {
                    'name': _this.translate.instant('charts.leadsClosed'),
                    'value': parseInt(_this.dash.close_count, 10)
                }
            ];
        });
    };
    BankLeadsComponent.prototype.getListing = function () {
        var _this = this;
        this.items = [];
        this.parameter.noResultFound = false;
        var input = JSON.parse(JSON.stringify(this.parameter));
        if (this.parameter.min) {
            input.min = moment__WEBPACK_IMPORTED_MODULE_4__(this.parameter.min).format('YYYY-MM-DD');
        }
        if (this.parameter.max) {
            input.max = moment__WEBPACK_IMPORTED_MODULE_4__(this.parameter.max).format('YYYY-MM-DD');
        }
        if (this.selectedUser) {
            input.assignee_id = this.selectedUser.id;
        }
        else if (this.parameter.assignee_id) {
            input.assignee_id = this.parameter.assignee_id;
        }
        this.spinner.show();
        this.admin.postDataApi('leads/banks', input).subscribe(function (success) {
            _this.spinner.hide();
            _this.items = success.data;
            if (_this.items.length <= 0) {
                _this.parameter.noResultFound = true;
            }
            _this.parameter.total = success.total_count;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    BankLeadsComponent.prototype.getPage = function (page) {
        this.parameter.page = page;
        this.getListing();
    };
    BankLeadsComponent.prototype.sort_by = function (sort_by_flag) {
        if (this.parameter.sort_by_flag !== sort_by_flag) {
            this.parameter.sort_by_flag = sort_by_flag;
            this.parameter.sort_by_order = 0;
        }
        else {
            this.parameter.sort_by_order = this.parameter.sort_by_order ? 0 : 1;
        }
        this.getListing();
    };
    BankLeadsComponent.prototype.selectAll = function () {
        this.items.forEach(function (item) {
            item.selected = true;
        });
    };
    BankLeadsComponent.prototype.bulkAssign = function () {
        var leads_ids = this.items.filter(function (x) { return x.selected; }).map(function (y) { return y.id; });
        if (leads_ids.length === 0) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.info.pleaseChooseAtleastOneDate'), 'error');
            return false;
        }
        this.openAssignModel.nativeElement.click();
    };
    BankLeadsComponent.prototype.getAssignListing = function () {
        var _this = this;
        var input = {
            keyword: this.assign.keyword
        };
        this.spinner.show();
        this.admin.postDataApi('getBanks', input).subscribe(function (success) {
            _this.spinner.hide();
            _this.assign.items = success.data;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    BankLeadsComponent.prototype.assignNow = function () {
        var _this = this;
        var leads_ids = this.items.filter(function (x) { return x.selected; }).map(function (y) { return y.id; });
        var input = {
            bank_id: this.assignItem.id,
            leads: leads_ids
        };
        this.spinner.show();
        this.admin.postDataApi('leads/bulkAssignBank', input).subscribe(function (r) {
            _this.spinner.hide();
            swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.assignedSuccessfully'), 'success');
            _this.closeAssignModel.nativeElement.click();
            _this.getListing();
        }, function (error) {
            _this.spinner.hide();
            _this.closeAssignModel.nativeElement.click();
            swal(_this.translate.instant('swal.error'), error.error.message, 'error');
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('openAssignModel'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], BankLeadsComponent.prototype, "openAssignModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('closeAssignModel'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], BankLeadsComponent.prototype, "closeAssignModel", void 0);
    BankLeadsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-bank-leads',
            template: __webpack_require__(/*! ./bank-leads.component.html */ "./src/app/layout/banks/bank-leads/bank-leads.component.html"),
            styles: [__webpack_require__(/*! ./bank-leads.component.css */ "./src/app/layout/banks/bank-leads/bank-leads.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_1__["AdminService"],
            src_app_services_leads_service__WEBPACK_IMPORTED_MODULE_6__["LeadsService"],
            src_app_common_constants__WEBPACK_IMPORTED_MODULE_2__["Constant"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateService"]])
    ], BankLeadsComponent);
    return BankLeadsComponent;
}());



/***/ }),

/***/ "./src/app/layout/banks/banks.component.css":
/*!**************************************************!*\
  !*** ./src/app/layout/banks/banks.component.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".add-img{\n    background-size: cover;background-repeat: no-repeat;\n}"

/***/ }),

/***/ "./src/app/layout/banks/banks.component.html":
/*!***************************************************!*\
  !*** ./src/app/layout/banks/banks.component.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container-fluid\">\n  <div class=\"row\">\n      <div class=\"col-md-6 col-6\">\n        <div class=\"title-group\">\n            <h5>{{'viewBanks.label' | translate}}</h5>\n            <p>{{'table.pagination.showing' | translate}} {{items?.length}} {{'table.pagination.outof' | translate}} {{parameter.total ? parameter.total : parameter?.items?.length}}</p>\n        </div>\n      </div>\n      <div class=\"col-md-6 col-6\">\n        <div class=\"btn-cont text-right\">\n            <a style=\"display: none;\" class=\"btn btn-primary\" href=\"javascript://\" data-toggle=\"modal\" data-target=\"#add\" #modalOpen>{{'table.addNewBtn' | translate}}</a>\n            <a *ngIf=\"admin?.admin_acl['Bank Management']?.can_create==1\" (click)=\"openModal()\" class=\"btn btn-primary\" href=\"javascript://\">{{'table.addNewBtn' | translate}}</a>\n        </div>\n      </div>\n  </div>\n\n  <div class=\"white-bg\">\n      <div class=\"tabel-section\">\n        <div class=\"table-responsive\">\n          <table class=\"table table-striped table-align-left\">\n            <tr>\n              <th style=\"width:6%\">&nbsp;</th>\n              <th style=\"width:15%\">\n                <div class=\"table-search\">\n                    <label>{{'table.th.name' | translate}}</label>\n                    <div class=\"searh-3\">\n                      <input type=\"text\" [(ngModel)]=\"parameter.name\" (keyup.enter)=\"getBanks(parameter.p, parameter.name, parameter.phone, parameter.email)\" name=\"\">\n                      <button *ngIf=\"parameter.name\" (click)=\"getBanks(parameter.p, parameter.name, parameter.phone, parameter.email)\"><i class=\"fa fa-search\"></i></button>\n                    </div>\n                </div>\n              </th>\n              <th style=\"width:20%; text-align:left;\">\n                <div class=\"table-search\">\n                    <label>{{'table.th.contactNumber' | translate}}</label>\n                    <div class=\"searh-3\">\n                      <input type=\"text\" [(ngModel)]=\"parameter.phone\" (keyup.enter)=\"getBanks(parameter.p, parameter.name, parameter.phone, parameter.email)\" name=\"\">\n                      <button *ngIf=\"parameter.phone\" (click)=\"getBanks(parameter.p, parameter.name, parameter.phone, parameter.email)\"><i class=\"fa fa-search\"></i></button>\n                    </div>\n                </div>\n              </th>\n              <th style=\"width:20%\">\n                <div class=\"table-search\">\n                    <label>{{'table.th.emailAddress' | translate}}</label>\n                    <div class=\"searh-3\">\n                      <input (keydown.space)=\"$event.preventDefault();\" type=\"text\" [(ngModel)]=\"parameter.email\" (keyup.enter)=\"getBanks(parameter.p, parameter.name, parameter.phone, parameter.email)\" name=\"\">\n                      <button *ngIf=\"parameter.email\" (click)=\"getBanks(parameter.p, parameter.name, parameter.phone, parameter.email)\"><i class=\"fa fa-search\"></i></button>\n                    </div>\n                </div>\n              </th>\n              <th style=\"width:10%; vertical-align: top;\">\n                <div class=\"table-search\"><label>{{'table.th.branch' | translate}}</label></div>\n              </th>\n              <th style=\"width:10%; vertical-align: top;\">\n                <div class=\"table-search\"><label>{{'table.th.floatingInt' | translate}}</label></div>\n              </th>\n              <th style=\"width:5%; vertical-align: top;\">\n                <div class=\"d-flex table-search\">\n                  <label>{{'table.th.leads' | translate}}<a (click)=\"setLeadSort()\" href=\"javascript://\"><img [ngClass]=\"{'upsidedown':this.parameter.lead_sort==2}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a></label>\n                </div>\n              </th>\n              <th style=\"width:14%\">\n                &nbsp;\n              </th>\n            </tr>\n      \n            <tr *ngFor=\"let item of items| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: parameter.total }; let i=index\">\n              <td> \n                  <img *ngIf=\"item.image\" [defaultImage]=\"item.image| img:'thumb'\" [lazyLoad]=\"item.image\" class=\"rounded-circle\" alt=\"img\">\n                  <img *ngIf=\"!item.image\" class=\"rounded-circle\" src=\"assets/img/default_img.png\" alt=\"img\">\n              </td>\n              <td class=\"text-left\">\n                <span class=\"name\">\n                  <a data-toggle=\"popover\" data-placement=\"top\" title=\"{{item.name}}\">{{item.name | titlecase}}</a>\n                </span>\n              </td>\n              <td class=\"text-left\" *ngIf=\"item.phone\">{{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}</td>\n              <td class=\"text-left\" *ngIf=\"!item.phone\">{{'table.tr.td.NA' | translate}}</td>\n              <td class=\"text-left\">{{item.email && item.email!='null' ? item.email : ('table.tr.td.NA' | translate)}}</td>\n              <td>{{item.branch ? item.branch : ('table.tr.td.NA' | translate)}}</td>\n              <td>{{item.floating_int ? item.floating_int+'%' : '0 %'}}</td>\n              <td class=\"text-left\">{{item.lead_count}}</td>\n              <td>\n                <div class=\"table-actions\">\n                  <a *ngIf=\"admin?.admin_acl['Bank Lead Management']?.can_read==1\" title=\"{{'table.title.viewLeads' | translate}}\" href=\"javascript://\"\n                    routerLink=\"/dashboard/banks/view-bank-leads/{{item.id}}\" class=\"icon-block edit-icon\">\n                    <img src=\"assets/img/ic_leads.png\" alt=\"img\">\n                  </a>\n                  <button title=\"{{'table.title.editDetails' | translate}}\" [disabled]=\"admin?.admin_acl['Bank Management']?.can_update==0\" (click)=\"editUser(item, i)\" class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></button>\n                  <button [disabled]=\"admin?.admin_acl['Bank Management']?.can_delete==0\"\n                    (click)=\"blockUnblockPopup(i, item.id, item.is_blocked==1?0:1)\" \n                    title=\"{{item.is_blocked==1 ? ('table.title.unblock' | translate) : ('table.title.block' | translate)}}\" [ngClass]=\"{'unblock-bg':item.is_blocked==1}\"\n                    class=\"action-icon\"><img src=\"assets/img/block.png\" alt=\"img\">\n                  </button>\n                  <button [disabled]=\"admin?.admin_acl['Bank Management']?.can_purge==0\" (click)=\"deletePopup(item, i);\" class=\"action-icon\" title=\"{{'table.title.delete' | translate}}\"><img src=\"assets/img/ic_delete.png\" alt=\"img\"></button>\n                </div>\n              </td>\n            </tr>\n\n          </table>\n        </div>\n      </div>\n\n      <div class=\"center\" *ngIf=\"parameter.total == 0\">\n        <img src=\"assets/img/404-error.png\">\n      </div>\n  </div>\n  \n  <div class=\"btn-cont text-right marginT15\" *ngIf=\"parameter.total\">\n    <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n  </div>\n  \n</div>\n\n\n\n<!-- add inhouse user modal -->\n<div class=\"modal animated\" id=\"add\">\n  <div class=\"modal-dialog fadeIndown modal-lg\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n          <button style=\"display: none;\" type=\"button\" class=\"close\" data-dismiss=\"modal\" #modalClose>&times;</button>\n          <button type=\"button\" class=\"close\" (click)=\"closeModal(); addForm.reset()\">&times;</button>\n      </div>\n\n      <form class=\"form-horizontal form-model0P\" role=\"form\" ngNativeValidate #addForm=\"ngForm\" (ngSubmit)=\"addBank(addForm)\">\n        <div class=\"modal-body\">\n          <div class=\"row\">\n            <div class=\"col-6\">\n              <div class=\"add-img\" style=\"display:flex;\">\n                  <img *ngIf=\"model?.image\" [src]=\"model?.image\" [defaultImage]=\"model?.image| img:'thumb'\" [lazyLoad]=\"model?.image\" style=\"object-fit: cover; width: 100%;\">\n                  <label *ngIf=\"model?.image\">\n                    <input accept=\"image/*\" name=\"image\" class=\"image\" (change)=\"changeListner($event, 'img_loader', 'image')\" type=\"file\">\n                  </label>\n                  <label *ngIf=\"!model?.image\">{{'addForm.image' | translate}}</label>\n                  <input *ngIf=\"!model?.image\" accept=\"image/*\" name=\"image\" class=\"image\" (change)=\"changeListner($event, 'img_loader', 'image')\" type=\"file\">\n                  <div *ngIf=\"model.img_loader\" class=\"loaderr\"></div>\n              </div>\n            </div>\n            <div class=\"col-6\">\n              <div class=\"btn-cont text-right\">\n                  <button *ngIf=\"!model.id\" type=\"submit\" [disabled]=\"!addForm.valid\" class=\"btn btn-primary\">{{'addForm.addBtn' | translate}}</button>\n                  <button *ngIf=\"model.id\" type=\"submit\" [disabled]=\"!addForm.valid\" class=\"btn btn-primary\">{{'addForm.updateBtn' | translate}}</button>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"spacer40\"></div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                  <label>{{'addForm.name' | translate}} <span class=\"color-red\">*</span></label>\n                  <div class=\"form-group\">\n                  <input autocomplete=\"off\" [pattern]=\"constant.onlyWhiteSpaces\" required type=\"text\" class=\"form-control\" [(ngModel)]=\"model.name\" name=\"name\">\n                </div>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                  <label>{{'addForm.contactNumber' | translate}} <span class=\"color-red\">*</span></label>\n                  <div class=\"form-group\">\n                  <input minlength=\"6\" maxlength=\"16\" autocomplete=\"off\" type=\"text\" [pattern]=\"constant.phonePattern\" class=\"form-control\" id=\"phone\" required minlength=\"1\" [(ngModel)]=\"model.phone\" name=\"phone\"\n                      ng2TelInput\n                      (intlTelInputObject)=\"telInputObject($event)\"\n                       [ng2TelInputOptions]=\"initialCountry\" (countryChange)=\"onCountryChange($event)\" />\n                </div>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                  <label>{{'addForm.emailId' | translate}} <span class=\"color-red\">*</span></label>\n                  <div class=\"form-group\">\n                  <input (keydown.space)=\"$event.preventDefault();\" autocomplete=\"off\" required [pattern]=\"constant.emailPattern\" type=\"email\" class=\"form-control\" [(ngModel)]=\"model.email\" name=\"email\">\n                </div>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                  <label>{{'addForm.branch' | translate}} <span class=\"color-red\">*</span></label>\n                  <div class=\"form-group\">\n                  <input autocomplete=\"off\" [pattern]=\"constant.onlyWhiteSpaces\" required type=\"text\" class=\"form-control\" [(ngModel)]=\"model.branch\" name=\"branch\">\n                </div>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                  <label>{{'addForm.floatingInt' | translate}} <span class=\"color-red\">*</span></label>\n                  <div class=\"form-group\">\n                  <input autocomplete=\"off\" required type=\"number\" class=\"form-control\" [(ngModel)]=\"model.floating_int\" name=\"floating_int\">\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/layout/banks/banks.component.ts":
/*!*************************************************!*\
  !*** ./src/app/layout/banks/banks.component.ts ***!
  \*************************************************/
/*! exports provided: BanksComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BanksComponent", function() { return BanksComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var src_app_models_bank_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/bank.model */ "./src/app/models/bank.model.ts");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
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







var BanksComponent = /** @class */ (function () {
    function BanksComponent(constant, admin, spinner, cs, translate) {
        this.constant = constant;
        this.admin = admin;
        this.spinner = spinner;
        this.cs = cs;
        this.translate = translate;
        this.parameter = {};
    }
    BanksComponent.prototype.ngOnInit = function () {
        this.model = new src_app_models_bank_model__WEBPACK_IMPORTED_MODULE_2__["Bank"]();
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        this.parameter.lead_sort = 2;
        this.initialCountry = { initialCountry: this.constant.country_code };
        this.getBanks(this.parameter.page, '', '', '');
    };
    BanksComponent.prototype.telInputObject = function (obj) {
        this.obj = obj;
    };
    BanksComponent.prototype.closeModal = function () {
        this.model = new src_app_models_bank_model__WEBPACK_IMPORTED_MODULE_2__["Bank"]();
        this.modalClose.nativeElement.click();
    };
    BanksComponent.prototype.openModal = function () {
        this.model = new src_app_models_bank_model__WEBPACK_IMPORTED_MODULE_2__["Bank"]();
        this.model.country_code = this.constant.country_code;
        this.model.dial_code = this.constant.dial_code;
        this.modalOpen.nativeElement.click();
    };
    BanksComponent.prototype.getPage = function (page) {
        this.parameter.page = page;
        this.getBanks(this.parameter.page, this.parameter.name, this.parameter.phone, this.parameter.email);
    };
    BanksComponent.prototype.getBanks = function (page, name, phone, email) {
        var _this = this;
        this.spinner.show();
        this.parameter.page = page;
        this.parameter.name = name;
        this.parameter.phone = phone;
        this.parameter.email = email;
        this.admin.postDataApi('getBanksListing', this.parameter)
            .subscribe(function (success) {
            _this.spinner.hide();
            _this.items = success.data;
            _this.parameter.total = success.total_count;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    BanksComponent.prototype.setLeadSort = function () {
        this.parameter.lead_sort = this.parameter.lead_sort === 2 ? 1 : 2;
        this.getBanks(this.parameter.page, this.parameter.name, this.parameter.phone, this.parameter.email);
    };
    BanksComponent.prototype.changeListner = function (event, paramLoader, param) {
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
    BanksComponent.prototype.onCountryChange = function (e) {
        this.model.country_code = e.iso2;
        this.model.dial_code = '+' + e.dialCode;
        this.initialCountry = { initialCountry: e.iso2 };
    };
    BanksComponent.prototype.addBank = function (formData) {
        var _this = this;
        if (this.model.img_loader) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.uploadingImage'), 'error');
            return false;
        }
        this.spinner.show();
        this.admin.postDataApi('addBank', this.model)
            .subscribe(function (success) {
            _this.spinner.hide();
            if (success.success === '0') {
                swal(_this.translate.instant('swal.error'), success.message, 'error');
            }
            else {
                _this.modalClose.nativeElement.click();
                var text = _this.model.id ? _this.translate.instant('message.success.updatedSuccessfully') :
                    _this.translate.instant('message.success.addedSuccessfully');
                swal(_this.translate.instant('swal.success'), text, 'success');
                if (_this.model.id) {
                    _this.items[_this.parameter.index] = success.data;
                }
                else {
                    if (_this.items.length < 10) {
                        _this.items.push(success.data);
                        _this.parameter.total++;
                    }
                }
                formData.reset();
                _this.model = new src_app_models_bank_model__WEBPACK_IMPORTED_MODULE_2__["Bank"]();
            }
        }, function (error) {
            _this.spinner.hide();
        });
    };
    BanksComponent.prototype.editUser = function (userdata, index) {
        this.model = JSON.parse(JSON.stringify(userdata));
        this.model.img_loader = false;
        this.parameter.index = index;
        if (this.obj) {
            this.obj.intlTelInput('setCountry', this.model.country_code ? this.model.country_code : this.constant.country_code);
        }
        this.modalOpen.nativeElement.click();
    };
    BanksComponent.prototype.blockUnblockPopup = function (index, id, flag) {
        var _this = this;
        this.parameter.index = index;
        this.parameter.title = this.translate.instant('message.question.areYouSure');
        switch (flag) {
            case 0:
                this.parameter.text = this.translate.instant('message.question.wantToUnblockBank');
                this.parameter.successText = this.translate.instant('message.success.unblockedSuccessfully');
                break;
            case 1:
                this.parameter.text = this.translate.instant('message.question.wantToBlockBank');
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
                _this.blockNoatary(index, id, flag);
            }
        });
    };
    BanksComponent.prototype.blockNoatary = function (index, id, flag) {
        var _this = this;
        this.parameter.index = index;
        this.spinner.show();
        this.admin.postDataApi('blockNoatary', { id: id, flag: flag })
            .subscribe(function (success) {
            _this.spinner.hide();
            swal(_this.translate.instant('swal.success'), _this.parameter.successText, 'success');
            _this.items[_this.parameter.index]['is_blocked'] = flag;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    BanksComponent.prototype.deletePopup = function (item, index) {
        var _this = this;
        this.parameter.title = this.translate.instant('message.question.areYouSure');
        this.parameter.text = this.translate.instant('message.question.wantToDeleteBank');
        swal({
            html: this.parameter.title + '<br>' + this.parameter.text,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.deleteBank(item, index);
            }
        });
    };
    BanksComponent.prototype.deleteBank = function (item, index) {
        var _this = this;
        this.admin.postDataApi('deleteBank', { bank_id: item.id }).subscribe(function (r) {
            swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.deletedSuccessfully'), 'success');
            _this.items.splice(index, 1);
            _this.parameter.total--;
        }, function (error) {
            swal(_this.translate.instant('swal.error'), error.error.message, 'error');
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalOpen'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], BanksComponent.prototype, "modalOpen", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], BanksComponent.prototype, "modalClose", void 0);
    BanksComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-banks',
            template: __webpack_require__(/*! ./banks.component.html */ "./src/app/layout/banks/banks.component.html"),
            styles: [__webpack_require__(/*! ./banks.component.css */ "./src/app/layout/banks/banks.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_common_constants__WEBPACK_IMPORTED_MODULE_3__["Constant"],
            src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_4__["AdminService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerService"],
            src_app_services_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__["TranslateService"]])
    ], BanksComponent);
    return BanksComponent;
}());



/***/ }),

/***/ "./src/app/layout/banks/banks.module.ts":
/*!**********************************************!*\
  !*** ./src/app/layout/banks/banks.module.ts ***!
  \**********************************************/
/*! exports provided: BanksModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BanksModule", function() { return BanksModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ng2_tel_input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ng2-tel-input */ "./node_modules/ng2-tel-input/ng2-tel-input.js");
/* harmony import */ var ng_lazyload_image__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng-lazyload-image */ "./node_modules/ng-lazyload-image/fesm5/ng-lazyload-image.js");
/* harmony import */ var _swimlane_ngx_charts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @swimlane/ngx-charts */ "./node_modules/@swimlane/ngx-charts/release/esm.js");
/* harmony import */ var primeng_primeng__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! primeng/primeng */ "./node_modules/primeng/primeng.js");
/* harmony import */ var primeng_primeng__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(primeng_primeng__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _banks_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./banks.component */ "./src/app/layout/banks/banks.component.ts");
/* harmony import */ var src_app_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/guards/acl-user.guard */ "./src/app/guards/acl-user.guard.ts");
/* harmony import */ var _bank_leads_bank_leads_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./bank-leads/bank-leads.component */ "./src/app/layout/banks/bank-leads/bank-leads.component.ts");
/* harmony import */ var _bank_leads_bank_lead_details_bank_lead_details_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./bank-leads/bank-lead-details/bank-lead-details.component */ "./src/app/layout/banks/bank-leads/bank-lead-details/bank-lead-details.component.ts");
/* harmony import */ var src_app_modules_shared_module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/modules/shared.module */ "./src/app/modules/shared.module.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
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
        path: 'view-banks', component: _banks_component__WEBPACK_IMPORTED_MODULE_10__["BanksComponent"],
        canActivate: [src_app_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_11__["AclUserGuard"]], data: { roles: ['Bank Management', 'can_read', 'can_bank'] }
    },
    // all leads
    {
        path: 'bank-leads', component: _bank_leads_bank_leads_component__WEBPACK_IMPORTED_MODULE_12__["BankLeadsComponent"],
        canActivate: [src_app_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_11__["AclUserGuard"]], data: { roles: ['Bank Lead Management', 'can_read', 'can_bank'] }
    },
    // leads wrt particular bank
    {
        path: 'view-bank-leads/:id', component: _bank_leads_bank_leads_component__WEBPACK_IMPORTED_MODULE_12__["BankLeadsComponent"],
        canActivate: [src_app_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_11__["AclUserGuard"]], data: { roles: ['Bank Lead Management', 'can_read', 'can_bank'] }
    },
    // bank lead details
    {
        path: 'bank-leads/:id', component: _bank_leads_bank_lead_details_bank_lead_details_component__WEBPACK_IMPORTED_MODULE_13__["BankLeadDetailsComponent"],
        canActivate: [src_app_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_11__["AclUserGuard"]], data: { roles: ['Bank Lead Management', 'can_read', 'can_bank'] }
    }
];
var BanksModule = /** @class */ (function () {
    function BanksModule() {
    }
    BanksModule = __decorate([
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
                _swimlane_ngx_charts__WEBPACK_IMPORTED_MODULE_8__["NgxChartsModule"],
                src_app_modules_shared_module__WEBPACK_IMPORTED_MODULE_14__["SharedModule"],
                primeng_primeng__WEBPACK_IMPORTED_MODULE_9__["CalendarModule"],
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_15__["TranslateModule"]
            ],
            declarations: [
                _banks_component__WEBPACK_IMPORTED_MODULE_10__["BanksComponent"],
                _bank_leads_bank_leads_component__WEBPACK_IMPORTED_MODULE_12__["BankLeadsComponent"],
                _bank_leads_bank_lead_details_bank_lead_details_component__WEBPACK_IMPORTED_MODULE_13__["BankLeadDetailsComponent"]
            ]
        })
    ], BanksModule);
    return BanksModule;
}());



/***/ }),

/***/ "./src/app/models/bank.model.ts":
/*!**************************************!*\
  !*** ./src/app/models/bank.model.ts ***!
  \**************************************/
/*! exports provided: Bank */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bank", function() { return Bank; });
var Bank = /** @class */ (function () {
    function Bank() {
        this.interestsArray = [
            {
                min_price: 0,
                max_price: 0,
                interest: 0
            }
        ];
    }
    return Bank;
}());



/***/ })

}]);
//# sourceMappingURL=banks-banks-module.js.map