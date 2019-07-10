(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["notary-notary-module"],{

/***/ "./src/app/layout/notary/notary-leads/notary-leads-details/notary-leads-details.component.css":
/*!****************************************************************************************************!*\
  !*** ./src/app/layout/notary/notary-leads/notary-leads-details/notary-leads-details.component.css ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/layout/notary/notary-leads/notary-leads-details/notary-leads-details.component.html":
/*!*****************************************************************************************************!*\
  !*** ./src/app/layout/notary/notary-leads/notary-leads-details/notary-leads-details.component.html ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<div class=\"container-fluid\">\n        <div class=\"white-bg padding15\">\n            <div class=\"row\">\n                <div class=\"col-lg-3 col-md-12 col-sm-6 col-12\">\n                    <div class=\"df-profile\">\n                    <a routerLink=\"../\"><i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i></a>\n                    <img [src]=\"parameter.lead?.user?.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\">\n                    <div class=\"df-info\" *ngIf=\"parameter.lead?.user\">\n                        <p class=\"p14\">{{parameter.lead.user.name | titlecase}}</p>\n                        <p class=\"p12\">Status: Open</p>\n                    </div>\n                    </div>\n                </div>\n                <div class=\"col-lg-7 col-md-12 col-sm-6 col-12\">\n                    <div class=\"profile-list\">\n                    <ul>\n                        <li>\n                            <div class=\"df-info\">\n                                <p class=\"p14 marginB0\" *ngIf=\"parameter.lead?.admin\">{{parameter.lead.admin.name | titlecase}}</p>\n                                <p class=\"p12\">CSR Buyer</p>\n                            </div>\n                        </li>\n                        <li>\n                            <div class=\"df-info\" *ngIf=\"parameter.lead?.broker\">\n                                <p class=\"p14 marginB0\">{{parameter.lead.broker.name | titlecase}}</p>\n                                <p class=\"p12\">Inhouse Agent</p>\n                            </div>\n                        </li>\n                        <li>\n                            <div class=\"df-info\" *ngIf=\"parameter.lead?.closer\">\n                                <p class=\"p14 marginB0\">{{parameter.lead.closer.name | titlecase}}</p>\n                                <p class=\"p12\">CSR Closer</p>\n                            </div>\n                        </li>\n                    </ul>\n                    </div>\n                </div>\n                <div class=\"col-lg-2 col-md-12 col-sm-12 col-12\">\n                    <div class=\"row\">\n                        <div class=\"col-sm-12 btn-cont text-right\">\n                            <a *ngIf=\"parameter?.lead?.lead_status_noatary!=1 &&\n                            (admin?.admin_acl['Notary Lead Management']?.can_update==1 || admin?.permissions?.can_noatary==1)\" (click)=\"markLeadClose()\" class=\"btn btn-fourth\" href=\"javascript://\">\n                                Close Lead\n                            </a>\n                            <a *ngIf=\"parameter?.lead?.lead_status_noatary==1\" style=\"cursor: auto;\" class=\"btn btn-fourth\" href=\"javascript://\">\n                                Lead Closed\n                            </a>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        \n        <div class=\"spacer30\"></div>\n        <div class=\"row\">\n            <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\">\n                <div class=\"white-bg padding30\">\n                    <div class=\"row\">\n                    <div class=\"col-md-6\">\n                        <h6>Details</h6>\n                    </div>\n                    <!-- <div class=\"col-md-6\">\n                        <div class=\"edit text-right\"><a href=\"javascript://\">Edit</a></div>\n                    </div> -->\n                    </div>\n                    <div class=\"details-table\">\n                    <table class=\"table\">\n                        <tr>\n                            <td style=\"padding-left:0\"><label>Full Name</label></td>\n                            <td colspan=\"2\" *ngIf=\"parameter?.lead?.name\">{{parameter.lead.name | titlecase}}</td>\n                        </tr>\n                        <tr>\n                            <td style=\"padding-left:0\"><label>Contact Number</label></td>\n                            <td colspan=\"2\" *ngIf=\"parameter?.lead?.phone\">{{parameter.lead.dial_code ? parameter.lead.dial_code : constant.dial_code}}-{{parameter.lead.phone}}</td>\n                        </tr>\n                        <tr>\n                            <td style=\"padding-left:0\"><label>Email address</label></td>\n                            <td colspan=\"2\" *ngIf=\"parameter?.lead?.email\">{{parameter.lead.email}}</td>\n                        </tr>\n                        <tr>\n                            <td style=\"padding-left:0\"><label>Interested In</label></td>\n                            <td *ngIf=\"parameter?.lead?.configuration\">\n                                <span *ngFor=\"let conf of parameter.lead.configuration; let ii=index\">\n                                {{conf.name}}<span *ngIf=\"ii<parameter?.lead?.configuration?.length-1\">,</span>\n                                </span>\n                                <span *ngIf=\"parameter.lead.configuration?.length == 0\">NA</span>\n                            </td>\n                        </tr>\n                        <tr>\n                            <td style=\"padding-left:0\"><label><strong>Property Selected</strong></label></td>\n                            <td *ngIf=\"parameter?.lead?.selected_properties?.length!=0\">\n                                <p class=\"p14 marginB0\">\n                                    {{parameter.lead?.selected_properties[0]?.property?.configuration.name}}\n                                </p>\n                                <p class=\"p12 marginB0\"><strong>{{parameter.lead?.selected_properties[0]?.property?.building?.name}}</strong></p>\n                                <p class=\"p11\"><i>{{parameter.lead?.selected_properties[0]?.property?.building?.developer?.name}}</i></p>\n                            </td>\n                            <td *ngIf=\"parameter?.lead?.selected_properties?.length!=0\">\n                                <a class=\"view-all-2\" href=\"javascript://\" (click)=\"viewPropertyDetails(parameter?.lead?.selected_properties[0])\"> View Property</a>\n                            </td>\n                            <td *ngIf=\"parameter?.lead?.selected_properties?.length==0\">NA</td>\n                        </tr>\n                        \n                        <!-- My Availabilities -->\n                        <tr *ngIf=\"parameter?.lead?.sale_rent==1\">\n                            <td  style=\"padding-left:0\"><label><strong>Availabilities</strong></label></td>\n                            <td colspan=\"2\" *ngIf=\"parameter?.lead?.selected_properties[0]?.selected_noatary!=0 && parameter?.lead?.selected_properties[0]?.selected_noatary[0]?.noatary_availability?.length!=0; else noAvailability1\">\n                                <p *ngFor=\"let na of parameter?.lead?.selected_properties[0]?.selected_noatary[0]?.noatary_availability; let m=index\" class=\"date\">\n                                    <span *ngIf=\"m<2\">{{na.date_time | moment}}</span>\n                                    <!-- <span *ngIf=\"m>1 && show==true\">{{na.date_time | moment}}</span> -->\n                                </p>\n                                <!-- <span class=\"read-more\" *ngIf=\"show==false && parameter?.lead?.selected_properties[0]?.selected_noatary[0]?.noatary_availability.length>2\" (click)=\"show=true\">Read more</span> -->\n                                <span class=\"read-more\" *ngIf=\"parameter?.lead?.selected_properties[0]?.selected_noatary[0]?.noatary_availability.length>2\" data-toggle=\"modal\" data-target=\"#get-availability1\">Read more</span>\n                            </td>\n                            <ng-template #noAvailability1>\n                                <td colspan=\"2\"><p>No availability given by notary yet.</p></td>\n                            </ng-template>\n                        </tr>\n\n                        <!-- Meeting Schedule -->\n                        <tr *ngIf=\"parameter?.lead?.sale_rent==1\">\n                            <td  style=\"padding-left:0\"><label><strong>Meeting Schedule</strong></label></td>\n                            <td colspan=\"2\" class=\"cursor-pointer\">\n                                <p class=\"date\" *ngIf=\"scheduleMeeting.appointment_date; else noAvailability4\">\n                                    <span>{{scheduleMeeting.appointment_date | moment}}</span>\n                                </p>\n                                <ng-template #noAvailability4>\n                                    <p>Meeting not scheduled by closure.</p>\n                                </ng-template>\n                            </td>\n                        </tr>          \n        \n                    </table>\n                    </div>\n                </div>\n        \n                <!-- notes start -->\n                <app-notes [sent_as]=\"parameter.sent_as\" [lead_id]=\"parameter.lead_id\"></app-notes>\n                <!-- notes end -->\n        \n                <div *ngIf=\"parameter?.lead?.sale_rent==1\" class=\"bank-assigned-now white-bg\">\n                    <div class=\"row\">\n                        <div class=\"col-md-6 col-sm-6 col-12 b-left\">\n                        <p class=\"p13\" *ngIf=\"selectedProperties?.noataries && selectedProperties.noataries.length==0\">No Notary assigned yet </p>\n        \n                        <div class=\"d-flex\" *ngIf=\"selectedProperties?.noataries && selectedProperties.noataries.length!=0\">\n                            <img [src]=\"selectedProperties?.noataries && selectedProperties.noataries[0].image\" onerror='src=\"assets/img/house.png\"' alt=\"img\">\n                            <div class=\"bank-info\">\n                                <p title=\"Notary\" class=\"p14\">{{selectedProperties.noataries[0].name}}</p>\n                                <p class=\"p11\">{{selectedProperties.noataries[0].dial_code ? selectedProperties.noataries[0].dial_code : constant.dial_code}}-{{selectedProperties.noataries[0].phone}}</p>\n                            </div>\n                            </div>\n                        </div>\n                        <div class=\"col-md-6 col-sm-6 col-12 b-right\">\n                        <p class=\"p13\" *ngIf=\"selectedProperties?.banks && selectedProperties.banks.length==0\">No Bank assigned yet </p>\n        \n                        <div class=\"d-flex\" *ngIf=\"selectedProperties?.banks && selectedProperties.banks.length!=0\">\n                            <img [src]=\"selectedProperties?.banks && selectedProperties.banks[0].image\" onerror='src=\"assets/img/bank-building.png\"' alt=\"img\">\n                            <div class=\"bank-info\">\n                                <p title=\"Bank\" class=\"p14\">{{selectedProperties.banks[0].name}}</p>\n                                <p class=\"p11\">{{selectedProperties?.banks[0]?.branch ? selectedProperties?.banks[0]?.branch : 'NA'}}</p>\n                            </div>\n                        </div>\n                        </div>\n                    </div>\n                </div>\n        \n            </div>\n        \n        \n            <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\">\n            \n            <!-- chat start -->\n            <div *ngIf=\"parameter.lead?.user\">\n                <app-chat [lead_id]=\"parameter.lead_id\" [sent_as]=\"parameter.sent_as\" [user_id]=\"parameter.user_id\" [admin_id]=\"parameter.admin_id\"></app-chat>\n            </div>\n            <!-- chat end -->\n        \n            <div class=\"clearfix\"></div>\n            <div class=\"upload-document-block white-bg\">\n                <div class=\"page-title-2 border-0\">\n                    <div class=\"row\">\n                        <div class=\"col-9\">\n                        <h4>Documents</h4>\n                        </div>\n                        <div class=\"col-3\">\n                            <a *ngIf=\"(admin?.admin_acl['Notary Lead Management']?.can_update==1 || admin?.permissions?.can_noatary==1); else noDocumentPermission\" class=\"view pull-right\" href=\"javascript://\" (click)=\"updateDocumentChecklist()\">Save</a>\n                            <ng-template #noDocumentPermission>\n                                <a class=\"view pull-right\" href=\"javascript://\">Save</a>\n                            </ng-template>\n                        </div>\n                    </div>\n                    <table class=\"table\">\n                        <tr *ngFor=\"let document of selectedProperties.allDocuments; let i=index\">\n                        <td>\n                            <label class=\"cust-check-bx\">{{document.name}}\n                            <input type=\"checkbox\" (click)=\"setValue(i)\" [checked]=\"document.is_selected == 1 ? 'checked' : ''\" name=\"document\">\n                            <span class=\"checkmark\"></span>\n                            </label>\n                        </td>\n                        </tr>\n                    </table>\n                </div>\n            </div>\n                <div class=\"all-document-block white-bg\">\n                <div class=\"page-title-2 border-0\">\n                <div class=\"row\">\n                <div class=\"col-9\">\n                    <h4>All Documents</h4>\n                    <p class=\"p11 marginB0\">From both seller and buyer</p>\n        \n                    </div>\n                    <div class=\"col-3 text-right\">\n                        <a *ngIf=\"selectedProperties?.uploaded_documents?.length==0\" (click)=\"noDocumentUploaded()\" class=\"view\" href=\"javascript://\" >View</a>\n                        <a *ngIf=\"selectedProperties?.uploaded_documents?.length!=0\" class=\"view\" data-toggle=\"modal\" data-target=\"#uploaded-documents\" href=\"javascript://\" >View</a>\n                    </div>\n                </div>\n                </div>\n                </div>\n            </div>\n        </div>\n        </div>\n        \n        \n        <div class=\"modal\" id=\"uploaded-documents\">\n            <div class=\"modal-dialog \">\n            <div class=\"modal-content notary-avail\">\n                <!-- <div class=\"modal-header modal-header-new\"> -->\n                    <div class=\"modal-header modal-header-new\">\n                    <h4 class=\"modal-title\">Uploaded Documents</h4>\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n                </div>\n                <div class=\"modal-body\">\n                    <table class=\"table\">\n                        <tr *ngFor=\"let upDocument of selectedProperties.uploaded_documents\">\n                        <td>\n                            <div class=\"n-avail-profile\">\n                                <div class=\"n-avail-info\">\n                                    <p class=\"p14 marginB0\" *ngIf=\"upDocument.attachment_name\">{{upDocument.attachment_name}}</p>\n                                    <!-- <p class=\"p12\" *ngIf=\"!upDocument.attachment_name\">{{upDocument.attachment.substring(upDocument.attachment.lastIndexOf('/'), upDocument.attachment.length)}}</p> -->\n                                    <p class=\"p14 marginB0\" *ngIf=\"!upDocument.attachment_name\">No name</p>\n                                </div>\n                            </div>\n                        </td>\n                        <td class=\"text-right\">\n                            <a class=\"green-color\" target=\"_blank\" href=\"{{upDocument.attachment}}\">Download</a>\n                        </td>\n                        </tr>\n                    </table>\n                </div>\n            </div>\n            </div>\n        </div>\n        \n        <div class=\"modal\" id=\"bank-listing\">\n            <div class=\"modal-dialog \">\n            <div class=\"modal-content notary-avail\">\n                <div class=\"modal-header popup-header\">\n                    <h4 class=\"modal-title\">Banks available</h4>\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #hideBanks>&times;</button>\n                </div>\n                <div class=\"modal-body\">\n                    <table class=\"table\">\n                        <tr *ngFor=\"let bank of parameter.banks\">\n                        <td>\n                            <div class=\"n-avail-profile\">\n                                <img [src]=\"bank.image\" onerror='src=\"assets/img/bank.png\"' alt=\"img\">\n                                <div class=\"n-avail-info\">\n                                    <p class=\"p12\">{{bank.name}}</p>\n                                    <p class=\"p10\">Branch : {{bank.branch ? bank.branch : 'NA'}}</p>\n                                </div>\n                            </div>\n                        </td>\n                        <td>\n                            <label class=\"cust-check-bx float-right\">\n                            <input type=\"radio\" name=\"bank_id\" (click)=\"assignBank(bank)\">\n                            <span class=\"checkmark\"></span>\n                            </label>\n                        </td>\n                        </tr>\n                    </table>\n                </div>\n            </div>\n            </div>\n        </div>\n        \n        <div class=\"modal\" id=\"notary-avail\">\n            <div class=\"modal-dialog \">\n                <div class=\"modal-content notary-avail\">\n                    <div class=\"modal-header popup-header\">\n                    <h4 class=\"modal-title\">Notaries available</h4>\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #hideNotaries>&times;</button>\n                    </div>\n                    <div class=\"modal-body\">\n                        <table class=\"table\">\n                            <tr *ngFor=\"let item of parameter.items\">\n                                <td>\n                                    <div class=\"n-avail-profile\">\n                                    <img [src]=\"item.image\" onerror='src=\"assets/img/house.png\"' alt=\"img\">\n                                    <div class=\"n-avail-info\">\n                                        <p class=\"p12\">{{item.name}}</p>\n                                        <p class=\"p10\">Phone : {{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}</p>\n                                    </div>\n                                    </div>\n                                </td>\n                                <td>\n                                    <label class=\"cust-check-bx float-right\">\n                                        <input type=\"radio\" name=\"notary_id\" (click)=\"assignNoatary(item)\">\n                                        <span class=\"checkmark\"></span>\n                                    </label>\n                                </td>\n                            </tr>\n                        </table>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n\n\n<div class=\"modal animated\" id=\"get-availability1\">\n    <div class=\"modal-dialog fadeIndown\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header modal-header-new\">\n                <h4 class=\"modal-title\">Notary Availabilities</h4>\n                <button type=\"button\" style=\"display: none;\" class=\"close\" data-dismiss=\"modal\" #modalClose>&times;</button>\n                <button type=\"button\" class=\"close\" (click)=\"closeModal()\">&times;</button>\n            </div>\n    \n            <div class=\"modal-body modal-body-new\">\n                <div class=\"row\">\n                    <div class=\"col-6\" *ngFor=\"let d of parameter?.lead?.selected_properties[0]?.selected_noatary[0]?.noatary_availability; let j=index\">\n                        <label class=\"notary-ava\">{{d.date_time | moment}}</label>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n            "

/***/ }),

/***/ "./src/app/layout/notary/notary-leads/notary-leads-details/notary-leads-details.component.ts":
/*!***************************************************************************************************!*\
  !*** ./src/app/layout/notary/notary-leads/notary-leads-details/notary-leads-details.component.ts ***!
  \***************************************************************************************************/
/*! exports provided: NotaryLeadsDetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotaryLeadsDetailsComponent", function() { return NotaryLeadsDetailsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_admin_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var _services_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../../../common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var _models_leads_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../../../models/leads.model */ "./src/app/models/leads.model.ts");
/* harmony import */ var _models_chat_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../models/chat.model */ "./src/app/models/chat.model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var NotaryLeadsDetailsComponent = /** @class */ (function () {
    function NotaryLeadsDetailsComponent(route, router, admin, cs, constant, selectedProperties, model, scheduleMeeting) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.admin = admin;
        this.cs = cs;
        this.constant = constant;
        this.selectedProperties = selectedProperties;
        this.model = model;
        this.scheduleMeeting = scheduleMeeting;
        this.show = false;
        this.parameter = {};
        this.scrollbarOptions = { axis: 'y', theme: 'dark' };
        this.admin.loginData$.subscribe(function (success) {
            _this.parameter.admin_id = success['id'];
        });
    }
    NotaryLeadsDetailsComponent.prototype.closeModal = function () {
        this.modalClose.nativeElement.click();
    };
    NotaryLeadsDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.parameter.sent_as = this.constant.userType.notary;
        this.route.params.subscribe(function (params) {
            _this.parameter.lead_id = params.id;
            _this.parameter.loading = true;
            _this.admin.postDataApi('leads/details', { lead_id: _this.parameter.lead_id, sent_as: _this.parameter.sent_as }).subscribe(function (r) {
                _this.parameter.loading = false;
                // console.log('lead details', r);
                _this.getDocumentOptions();
                _this.parameter.lead = r.data.lead;
                _this.selectedProperties = r.data.lead.selected_properties[0];
                if (_this.parameter.lead.appointments.length !== 0) {
                    _this.scheduleMeeting = _this.parameter.lead.appointments[0];
                }
                // if (this.parameter.lead.appointments && this.parameter.lead.appointments.length !== 0) {
                //   for (let index = 0; index < this.parameter.lead.appointments.length; index++) {
                //     const element = this.parameter.lead.appointments[index];
                //     if (element.sent_as === this.constant.userType.csr_closer) {
                //       this.meetingDate = {
                //         appointment_date: element.appointment_date,
                //         id: element.id
                //       };
                //     }
                //   }
                // }
                // notary will chat with closer
                _this.parameter.user_id = _this.parameter.lead.closer.id;
            }, function (error) {
                _this.parameter.loading = false;
            });
        });
    };
    NotaryLeadsDetailsComponent.prototype.setValue = function (i) {
        this.selectedProperties.allDocuments[i].is_selected =
            this.selectedProperties.allDocuments[i].is_selected && this.selectedProperties.allDocuments[i].is_selected === 1 ? 0 : 1;
    };
    NotaryLeadsDetailsComponent.prototype.getDocumentOptions = function () {
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
    NotaryLeadsDetailsComponent.prototype.updateDocumentChecklist = function () {
        var _this = this;
        var ids = this.selectedProperties.allDocuments.filter(function (d) { return d.is_selected === 1; });
        var documents_ids = ids.map(function (d) { return d.id; });
        var input = {
            lead_id: this.parameter.lead_id,
            property_id: this.selectedProperties.property_id,
            documents: documents_ids
        };
        this.parameter.loading = true;
        this.admin.postDataApi('leads/updateDocumentChecklist', input).subscribe(function (r) {
            _this.parameter.loading = false;
            swal('Success', 'Successfully saved', 'success');
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    NotaryLeadsDetailsComponent.prototype.noDocumentUploaded = function () {
        swal('Error', 'No document uploaded yet.', 'error');
    };
    NotaryLeadsDetailsComponent.prototype.viewPropertyDetails = function (property) {
        console.log('--', property.property_id);
        this.cs.setPropertyDetails(property);
        this.router.navigate(['/dashboard/properties/details/' + property.property_id]);
    };
    NotaryLeadsDetailsComponent.prototype.markLeadClose = function () {
        var _this = this;
        swal({
            html: this.constant.title.ARE_YOU_SURE + '<br>' + 'You want to close this lead?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.admin.postDataApi('leads/noatary-mark-lead-closed', { lead_id: _this.parameter.lead_id }).subscribe(function (r) {
                    console.log('r', r);
                    _this.parameter.lead.lead_status_noatary = 1;
                    swal('Success', 'Lead closed successfully.', 'success');
                });
            }
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], NotaryLeadsDetailsComponent.prototype, "modalClose", void 0);
    NotaryLeadsDetailsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-notary-leads-details',
            template: __webpack_require__(/*! ./notary-leads-details.component.html */ "./src/app/layout/notary/notary-leads/notary-leads-details/notary-leads-details.component.html"),
            styles: [__webpack_require__(/*! ./notary-leads-details.component.css */ "./src/app/layout/notary/notary-leads/notary-leads-details/notary-leads-details.component.css")],
            providers: [_models_leads_model__WEBPACK_IMPORTED_MODULE_5__["SelectedProperties"], _models_leads_model__WEBPACK_IMPORTED_MODULE_5__["BankAssigned"], _models_leads_model__WEBPACK_IMPORTED_MODULE_5__["NotaryAssigned"], _models_chat_model__WEBPACK_IMPORTED_MODULE_6__["Chat"], _models_leads_model__WEBPACK_IMPORTED_MODULE_5__["ScheduleMeeting"]]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _services_admin_service__WEBPACK_IMPORTED_MODULE_2__["AdminService"],
            _services_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"],
            _common_constants__WEBPACK_IMPORTED_MODULE_4__["Constant"],
            _models_leads_model__WEBPACK_IMPORTED_MODULE_5__["SelectedProperties"],
            _models_chat_model__WEBPACK_IMPORTED_MODULE_6__["Chat"],
            _models_leads_model__WEBPACK_IMPORTED_MODULE_5__["ScheduleMeeting"]])
    ], NotaryLeadsDetailsComponent);
    return NotaryLeadsDetailsComponent;
}());



/***/ }),

/***/ "./src/app/layout/notary/notary-leads/notary-leads.component.css":
/*!***********************************************************************!*\
  !*** ./src/app/layout/notary/notary-leads/notary-leads.component.css ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/layout/notary/notary-leads/notary-leads.component.html":
/*!************************************************************************!*\
  !*** ./src/app/layout/notary/notary-leads/notary-leads.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<div class=\"container-fluid\">\n    <div class=\"row\">\n        <div class=\"col-md-4\">\n            <div class=\"form-group\">\n                <p class=\"p16\">Manage Notary's Leads</p>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-md-4\">\n            <div class=\"form-group\" *ngIf=\"admin?.admin_acl['Notary Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n                <div class=\"d-flex\">\n                <div class=\"autocomplete\">\n                    <input placeholder=\"Search Notary\" style=\"max-width:200px\" list=\"amenities\" [(ngModel)]=\"parameter.keyword\" (input)=\"getCsrListing()\" class=\"form-control\" type=\"text\" name=\"keyword\" (focusout)=\"closeCsrListing()\">\n                    <div id=\"myInputautocomplete-list\" class=\"autocomplete-items\">\n                        <div *ngFor=\"let item of users\" (click)=\"selectCsrUser(item)\">{{item.email}}</div>\n                    </div>\n                </div>\n            </div>\n            </div>\n        </div>\n        <div class=\"col-md-8 col-12\">\n            <div class=\"cust-tabs-2\">\n                <ul class=\"nav nav-tabs\">\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==1}\" (click)=\"changeFlag(1)\" >This Week</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==2}\" (click)=\"changeFlag(2)\" >This Month</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==3}\" (click)=\"changeFlag(3)\" >Last Month</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==4}\" (click)=\"changeFlag(4)\" >Lifetime</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==5}\" (click)=\"parameter.flag=5\" >Custom</a>\n                </li>\n                </ul>\n            </div>\n        </div>\n    </div>\n    \n    <div class=\"row\">\n        <div class=\"col-12\">\n            <div *ngIf=\"parameter.flag == 5\" class=\"row\">\n                <div class=\"offset-lg-7\"></div>\n                <div class=\"col-lg-2 col-md-2 col-sm-5 col-5\">\n                <div class=\"form-group marginB0\">\n                    <label>From:</label>\n                    <p-calendar showIcon=\"true\" [(ngModel)]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n                </div>\n                </div>\n                <div class=\"col-lg-2 col-md-2 col-sm-5 col-5\">\n                <div class=\"form-group marginB0\">\n                    <label>To:</label>\n                    <p-calendar showIcon=\"true\" [(ngModel)]=\"parameter.max\" [minDate]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n                </div>\n                </div>\n                <div class=\"col-lg-1 col-md-2 col-sm-2 col-6\">\n                <div class=\"form-group btn-cont\">\n                    <label class=\"addMT3\">&nbsp;</label>\n                    <button class=\"btn btn-calender\" href=\"javascript://\" (click)=\"getListing(); getCSRDashBoardData();\"\n                        [disabled]=\"!parameter.min || !parameter.max\">Apply</button>\n                </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"listingResults\" >\n      <div *ngIf=\"selectedUser as item\" class=\"sigle-row-table\">\n            <table class=\"table table-striped\">\n            <tbody><tr>\n                <td><img class=\"rounded-circle\" [src]=\"item.image| img:'small'\" onerror='this.src=\"assets/img/default_img.png\"' alt=\"img\"></td>\n                <td class=\"text-left\">\n                    <span class=\"name\">{{item.name}}</span>\n                </td>\n                <td class=\"text-left\">{{item.phone}}</td>\n                <td class=\"text-left\">{{item.email}}</td>\n                <td>\n                    <a (click)=\"removeCsrUser()\" href=\"javascript://\" class=\"icon-block edit-icon\"><img src=\"assets/img/remove-icon.png\" alt=\"remove\" title=\"remove\" /></a>\n                </td>\n                </tr>\n            </tbody>\n            </table>\n      </div>\n      <div class=\"spacer30\"></div>\n      <div class=\"row\">\n\n            <div class=\"col-lg-8 col-md-12 col-sm-12 col-12\" >\n            <div class=\"info-box all-leads marginT0\">\n                <div class=\"one-row\" [ngClass]=\"{'active':parameter.count_flag == '1'}\" (click)=\"changeCountFlag(1)\">\n                    <div class=\"o-block\">\n                        <h5>All Leads</h5>\n                        <small>Total</small>\n                    </div>\n                    <div class=\"o-block\">\n                        <a class=\"view-all\" href=\"javascript://\">View All</a>\n                        <h4>{{dash.all_count}}</h4>\n                    </div>\n                </div>\n            \n                </div>\n\n                        <div class=\"info-box all-leads\">\n                        <div class=\"row\">\n                        <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == '2'}\" (click)=\"changeCountFlag(2)\" >\n                <div class=\"one-row \">\n                    <div class=\"o-block\">\n                        <h5>Leads</h5>\n                        <small>Open</small>\n                    </div>\n                    <div class=\"o-block\">\n                        <a class=\"view-all\" href=\"javascript://\">View All</a>\n                        <h4>{{dash.open_count}}</h4>\n                    </div>\n                </div>\n                </div>\n    \n                    <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == '3'}\" (click)=\"changeCountFlag(3)\">\n                <div class=\"one-row\">\n                    <div class=\"o-block\">\n                        <h5>Leads</h5>\n                        <small>Closed</small>\n                    </div>\n                    <div class=\"o-block\">\n                        <a class=\"view-all\" href=\"javascript://\">View All</a>\n                        <h4>{{dash.close_count}}</h4>\n                    </div>\n                </div>\n                </div>\n                </div>\n                </div>\n            </div>\n            <div class=\"col-lg-4 col-md-12 col-sm-12 col-12\">\n                <div class=\"chat-msg all-leads marginT0\" style=\"padding:0px\">\n                    <div class=\"padding20\" *ngIf=\"dash.lead_total == 0\">No records found</div>\n                    <ngx-charts-pie-chart [results]=\"chartView\"></ngx-charts-pie-chart>\n                </div>\n            </div>\n        </div>\n        <div class=\"spacer15\"></div>\n\n      <div class=\"row\">\n         <div class=\"col-6\">\n            <div class=\"title-group\">\n               <h5>Leads \n                <span *ngIf=\"parameter.count_flag == 1\">(Total)</span>\n                <span *ngIf=\"parameter.count_flag == 2\">(Open)</span>\n                <span *ngIf=\"parameter.count_flag == 3\">(Closed)</span>\n               </h5>\n               <p>\n                   <!-- Showing {{parameter.page}} out of {{parameter.total_count}} -->\n                </p>\n            </div>\n         </div>\n         <div class=\"col-6\" *ngIf=\"admin?.admin_acl['Notary Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n            <div class=\"add-new text-right\">\n                <a class=\"btn\" (click)=\"bulkAssign()\" href=\"javascript://\">Bulk Re-assign</a>\n            </div>\n        </div>\n      </div>\n      <div class=\"white-bg\">\n         <div class=\"tabel-section\">\n            <div class=\"table-responsive\">\n                    <table class=\"table table-striped border-0\">\n                            <tbody><tr>\n                            <th *ngIf=\"admin?.admin_acl['Notary Lead Management']?.can_read==1 && !this.parameter.assignee_id\" style=\"width:6%\">\n                                <div class=\"table-search\">\n                                <a (click)=\"selectAll()\"><label>All</label></a>\n                                </div>\n                            </th>\n                            <th style=\"width:6%; border-top:0\">\n                                <div class=\"table-search\">\n                                    <label>Image</label>\n                                </div>\n                            </th>\n                                <th style=\"width:15%; border-top:0\">\n                                    <div class=\"table-search\">\n                                    <label>Name</label>\n                                    <div class=\"searh-3\">\n                                        <input type=\"text\" [(ngModel)]=\"parameter.name\" (keyup.enter)=\"changeFilter('name',$event.target.value)\" name=\"\">\n                                        <button *ngIf=\"parameter.name\" (click)=\"changeFilter('name', parameter.name)\"><i class=\"fa fa-search\"></i></button>\n                                    </div>\n                                    </div>\n                                </th>\n                                <th style=\"width:20%; text-align:left; border-top:0\">\n                                    <div class=\"table-search\">\n                                    <label>Contact Number</label>\n                                    <div class=\"searh-3\">\n                                        <input type=\"text\" [(ngModel)]=\"parameter.phone\" (keyup.enter)=\"changeFilter('phone',$event.target.value)\" name=\"\">\n                                        <button *ngIf=\"parameter.phone\" (click)=\"changeFilter('phone', parameter.phone)\"><i class=\"fa fa-search\"></i></button>\n                                    </div>\n                                    </div>\n                                </th>\n                                <th style=\"width:20%; border-top:0\">\n                                    <div class=\"table-search\">\n                                    <label>Email Address</label>\n                                    <div class=\"searh-3\">\n                                        <input type=\"text\" [(ngModel)]=\"parameter.email\" (keyup.enter)=\"changeFilter('email',$event.target.value)\" name=\"\">\n                                        <button *ngIf=\"parameter.email\" (click)=\"changeFilter('email', parameter.email)\"><i class=\"fa fa-search\"></i></button>\n                                    </div>\n                                    </div>\n                                </th>\n                                <th style=\"width:20%; border-top:0\">\n                                    <div class=\"table-search\">\n                                    <label>Assignee</label>\n                                    </div>\n                                </th>\n                                <th style=\"width:18%; border-top:0\">\n                                    &nbsp;  \n                                </th>\n                                <!-- <th style=\"width:9%; border-top:0\">\n                                    &nbsp;\n                                </th> -->\n                            </tr>\n                            <tr class=\"cursor-pointer\" title=\"Click to view details\" *ngFor=\"let item of items| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: parameter.total }; let i=index\"\n                            >\n                                <td *ngIf=\"admin?.admin_acl['Notary Lead Management']?.can_read==1 && !this.parameter.assignee_id\" (click)=\"$event.stopPropagation()\">\n                                    <label class=\"cust-check-bx\" >\n                                    <input type=\"checkbox\" [(ngModel)]=\"item.selected\" name=\"document\">\n                                    <span class=\"checkmark\"></span>\n                                    </label>\n                                    <!-- <i class=\"fa\" [ngClass]=\"item.selected?'fa-check-square-o':'fa-square-o'\" (click)=\"item.selected = !item.selected\" aria-hidden=\"true\"></i> -->\n                                </td>\n                                <td routerLink=\"/dashboard/notary/notary-leads/{{item.id}}\">\n                                    <img class=\"rounded-circle\" [src]=\"item.image| img:'small'\" onerror=\"this.src='assets/img/default_img.png'\" alt=\"img\">\n                                </td>\n                                <td class=\"text-left\" routerLink=\"/dashboard/notary/notary-leads/{{item.id}}\">\n                                    <span routerLink=\"/dashboard/leads/csr-closers/{{item.id}}\" class=\"name\">{{item.name}}</span>\n                                </td>\n                                <td class=\"text-left\" routerLink=\"/dashboard/notary/notary-leads/{{item.id}}\">\n                                    {{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}<br>\n                                </td>\n                                <td class=\"text-left\" routerLink=\"/dashboard/notary/notary-leads/{{item.id}}\">\n                                    {{item.email}}\n                                </td>\n                                <td class=\"text-left\" title=\"Notary\" routerLink=\"/dashboard/notary/notary-leads/{{item.id}}\">\n                                    {{item?.selected_properties[0]?.selected_noatary[0]?.noatary?.name}}\n                                </td>\n                                <td (click)=\"openModal($event, item, i)\">\n                                <a style=\"display:none;\" #modalOpen class=\"green-color fontW500\" data-toggle=\"modal\" data-target=\"#set-availability\" href=\"javascript://\">Change Availability</a>\n                                <a class=\"green-color fontW500\" href=\"javascript://\">Change Availability</a>\n                                </td>\n                                <!-- <td>\n                                    <a href=\"javascript://\" routerLink=\"/dashboard/notary/notary-leads/{{item.id}}\" class=\"icon-block edit-icon\"><img src=\"assets/img/viewfull.png\" alt=\"img\"></a> \n                                </td> -->\n                            </tr>\n                        </tbody></table>\n                    <div class=\"padding20 center\" *ngIf=\"parameter.noResultFound\">\n                        <img src=\"assets/img/404-error.png\">\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"btn-cont marginT15\" *ngIf=\"parameter.total\">\n        <div class=\"row\">\n            <div class=\"col-6\">\n                <div class=\"title-group\">\n                    <p>Showing {{items?.length}} out of {{parameter.total}}</p>\n                </div>\n            </div>\n            <div class=\"col-6 text-right\">\n                <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n            </div>\n        </div>\n    </div>\n</div>\n    \n\n    <!-- add inhouse user modal -->\n<div class=\"modal animated\" id=\"set-availability\">\n    <div class=\"modal-dialog fadeIndown\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header modal-header-new\">\n                <h4 class=\"modal-title\">View Availability</h4>\n                <button type=\"button\" style=\"display: none;\" class=\"close\" data-dismiss=\"modal\" #modalClose>&times;</button>\n                <button type=\"button\" class=\"close\" (click)=\"closeModal()\">&times;</button>\n            </div>\n    \n            <form class=\"form-horizontal form-model0P\" role=\"form\" ngNativeValidate #addForm=\"ngForm\" (ngSubmit)=\"add()\">\n            <div class=\"modal-body modal-body-new\">\n                <div class=\"row\">\n                    <div class=\"col-8\">\n                        <label>Choose Date & Time</label>\n                        <p-calendar title=\"Click to add\" name=\"app\" [(ngModel)]=\"date\" [minDate]=\"today\" showButtonBar=\"true\" showTime=\"true\" hourFormat=\"12\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n                    </div>\n                    <!-- <div class=\"col-5\">\n                        <div class=\"form-group-2\">\n                            <label>Date</label>\n                            <div class=\"form-group\">\n                            <input type=\"date\" min=\"{{today|date:'yyyy-MM-dd'}}\" max='9999-12-31' [(ngModel)]=\"date\" class=\"form-control\" name=\"date\">\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"col-5\">\n                        <div class=\"form-group-2\">\n                            <label>Time</label>\n                            <div class=\"form-group\">\n                            <input type=\"time\" [(ngModel)]=\"time\" class=\"form-control\" name=\"time\">\n                            </div>\n                        </div>\n                    </div> -->\n                    <div class=\"col-2\">\n                        <div class=\"form-group-2\">\n                            <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n                            <a class=\"green-color fontW500\" href=\"javascript://\" (click)=\"addDateTime()\">Add</a>\n                            <!-- <button type=\"button\" class=\"btn btn-primary green-bg\" (click)=\"addDateTime()\">+</button> -->\n                        </div>\n                    </div>\n                </div>\n                <div class=\"row\" *ngFor=\"let d of data; let j=index\">\n                    <div class=\"col-8\">\n                        <label class=\"notary-ava\">{{d.date_time | moment}}</label>\n                    </div>\n                    <div class=\"col-2\">\n                        <a class=\"green-color fontW500\" (click)=\"removeNoataryAvailability(d.id, j)\" href=\"javascript://\">\n                            Remove\n                        </a>\n                        <!-- <button type=\"button\" class=\"btn btn-primary\" (click)=\"removeNoataryAvailability(d.id, j)\">\n                            Remove\n                        </button> -->\n                    </div>\n                </div>\n                <div class=\"row\" *ngFor=\"let a of availability.date_time_array; let i=index\">\n                    <div class=\"col-8\">\n                        <label class=\"notary-ava\">{{a.date_time|date:'h:mm a'|lowercase}}, {{a.date_time|date: 'MMM d y'}}</label>\n                    </div>\n                    <div class=\"col-2\">\n                        <a class=\"green-color fontW500\" (click)=\"removeNoatary(i)\" href=\"javascript://\">\n                            Remove\n                        </a>\n                        <!-- <button type=\"button\" class=\"btn btn-primary\" (click)=\"removeNoatary(i)\">*</button> -->\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col-12\">\n                        <div class=\"btn-cont text-right\">\n                            <button type=\"submit\" class=\"btn btn-primary\">Save</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            </form>\n    \n        </div>\n    </div>\n</div>\n\n\n<!-- Assignment model -->\n<a data-toggle=\"modal\" data-target=\"#assign-model\" #openAssignModel></a>\n<div class=\"modal\" id=\"assign-model\">\n        <div class=\"modal-dialog \">\n            <div class=\"modal-content notary-avail\">\n                <div class=\"modal-header popup-header\">\n                <h4 class=\"modal-title\">Re Assign to</h4>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #closeAssignModel>&times;</button>\n                </div>\n                <div class=\"modal-body\">\n                    <div class=\"row\">\n                        <div class=\"col-md-8\">\n                            <input style=\"max-width:200px\" list=\"amenities\" [(ngModel)]=\"assign.keyword\" (input)=\"getAssignListing()\" class=\"form-control\" type=\"text\" name=\"keyword\" placeholder=\"Search\">\n                        </div>\n                        <div class=\"col-md-4 btn-cont\">\n                            <a class=\"btn btn-primary pull-right\" href=\"javascript://\" (click)=\"assignNow()\">Assign</a>\n                        </div>\n                    </div>\n                    <div class=\"spacer40\"></div>\n                    <div class=\"modal-data\">\n                        <table class=\"table\">\n                            <tr *ngFor=\"let item of assign.items\">\n                                <td *ngIf=\"item.is_blocked!=1\">\n                                    <div class=\"n-avail-profile\">\n                                    <img [src]=\"item.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\">\n                                    <div class=\"n-avail-info\">\n                                        <p class=\"p12\">{{item.name}}</p>\n                                        <p class=\"p10\">Phone : {{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}</p>\n                                    </div>\n                                    </div>\n                                </td>\n                                <td *ngIf=\"item.is_blocked!=1\">\n                                    <label class=\"cust-check-bx float-right\">\n                                        <input type=\"radio\" name=\"notary_id\" (click)=\"assignItem = item\">\n                                        <span class=\"checkmark\"></span>\n                                    </label>\n                                </td>\n                            </tr>\n                        </table>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>"

/***/ }),

/***/ "./src/app/layout/notary/notary-leads/notary-leads.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/layout/notary/notary-leads/notary-leads.component.ts ***!
  \**********************************************************************/
/*! exports provided: NotaryLeadsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotaryLeadsComponent", function() { return NotaryLeadsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_admin_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../../common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var _models_leads_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../models/leads.model */ "./src/app/models/leads.model.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_5__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var NotaryLeadsComponent = /** @class */ (function () {
    function NotaryLeadsComponent(admin, constant, availability, route) {
        this.admin = admin;
        this.constant = constant;
        this.availability = availability;
        this.route = route;
        this.parameter = {};
        this.location = {};
        this.assign = {};
        this.items = [];
        this.data = [];
        this.users = [];
        this.initSelection = false;
        this.dash = {
            all_count: 0,
            open_count: 0,
            close_count: 0
        };
        this.chartView = [];
    }
    NotaryLeadsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.today = new Date();
        this.parameter.keyword = '';
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        this.parameter.flag = 2;
        this.parameter.total = 0;
        this.parameter.count_flag = 1;
        this.route.params.subscribe(function (params) {
            _this.parameter.assignee_id = params.id;
        });
        this.getListing();
        this.getCSRDashBoardData();
        Object.assign(this, this.chartView);
    };
    NotaryLeadsComponent.prototype.changeFlag = function (flag) {
        this.parameter.flag = flag;
        this.parameter.count_flag = 1;
        this.resetDates();
        this.getListing();
        this.getCSRDashBoardData();
    };
    NotaryLeadsComponent.prototype.changeFilter = function (key, value) {
        this.parameter[key] = value;
        this.getListing();
    };
    NotaryLeadsComponent.prototype.changeCountFlag = function (flag) {
        this.parameter.count_flag = flag;
        this.getListing();
    };
    NotaryLeadsComponent.prototype.getCsrListing = function () {
        var _this = this;
        this.initSelection = true;
        this.users = [];
        var input = new FormData();
        if (this.parameter.keyword) {
            input.append('keyword', this.parameter.keyword);
        }
        // if (this.parameter.country_id && this.parameter.country_id !== '-1') {
        //   input.append('countries', JSON.stringify([this.parameter.country_id]));
        // }
        // if (this.parameter.state_id && this.parameter.state_id !== '-1') {
        //   input.append('states', JSON.stringify([this.parameter.state_id]));
        // }
        // if (this.parameter.city_id && this.parameter.city_id !== '-1') {
        //   input.append('cities', JSON.stringify([this.parameter.city_id]));
        // }
        // if (this.parameter.locality_id && this.parameter.locality_id !== '-1') {
        //   input.append('localities', JSON.stringify([this.parameter.locality_id]));
        // }
        this.admin.postDataApi('getNoataries', input).subscribe(function (success) {
            _this.users = success.data;
        });
    };
    NotaryLeadsComponent.prototype.resetFilters = function () {
        this.parameter.is_selected = false;
        this.parameter.page = this.constant.p;
        this.parameter.flag = 2;
        this.parameter.total = 0;
        // this.selectedUser = '';
        this.parameter.keyword = '';
        this.parameter.count_flag = 1;
        this.resetDates();
        this.getListing();
        this.getCSRDashBoardData();
    };
    NotaryLeadsComponent.prototype.resetDates = function () {
        this.parameter.min = '';
        this.parameter.max = '';
    };
    NotaryLeadsComponent.prototype.closeCsrListing = function () {
        var _this = this;
        setTimeout(function () {
            _this.users = [];
        }, 200);
    };
    NotaryLeadsComponent.prototype.selectCsrUser = function (user) {
        this.selectedUser = user;
        this.users = [];
        this.parameter.keyword = '';
        this.initSelection = false;
        this.getListing();
        this.getCSRDashBoardData();
    };
    NotaryLeadsComponent.prototype.removeCsrUser = function () {
        this.selectedUser = '';
        this.parameter.keyword = '';
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        // this.parameter.flag = 2;
        this.parameter.total = 0;
        this.parameter.count_flag = 1;
        this.getListing();
        this.getCSRDashBoardData();
    };
    NotaryLeadsComponent.prototype.getCSRDashBoardData = function () {
        var _this = this;
        // const input = new FormData();
        // if (this.selectedUser) {
        //   input.append('assignee_id', this.selectedUser.id);
        // } else if (this.parameter.assignee_id) {
        //   input.append('assignee_id', this.parameter.assignee_id);
        // }
        // if (this.parameter.flag) {
        //   input.append('flag', this.parameter.flag.toString());
        // }
        var input = JSON.parse(JSON.stringify(this.parameter));
        if (this.parameter.min) {
            input.min = moment__WEBPACK_IMPORTED_MODULE_5__(this.parameter.min).format('YYYY-MM-DD');
        }
        if (this.parameter.max) {
            input.max = moment__WEBPACK_IMPORTED_MODULE_5__(this.parameter.max).format('YYYY-MM-DD');
        }
        if (this.selectedUser) {
            input.assignee_id = this.selectedUser.id;
        }
        else if (this.parameter.assignee_id) {
            input.assignee_id = this.parameter.assignee_id;
        }
        this.admin.postDataApi('leads/noatary-dash-count', input).subscribe(function (r) {
            _this.dash = r.data;
            _this.chartView = [
                // {
                //   "name": "Total",
                //   "value": parseInt(this.dash.all_count,10)
                // },
                {
                    'name': 'Leads (Open)',
                    'value': parseInt(_this.dash.open_count, 10)
                },
                {
                    'name': 'Leads (Closed)',
                    'value': parseInt(_this.dash.close_count, 10)
                }
            ];
        });
    };
    NotaryLeadsComponent.prototype.getListing = function () {
        var _this = this;
        this.items = [];
        this.parameter.noResultFound = false;
        var input = JSON.parse(JSON.stringify(this.parameter));
        if (this.parameter.min) {
            input.min = moment__WEBPACK_IMPORTED_MODULE_5__(this.parameter.min).format('YYYY-MM-DD');
        }
        if (this.parameter.max) {
            input.max = moment__WEBPACK_IMPORTED_MODULE_5__(this.parameter.max).format('YYYY-MM-DD');
        }
        if (this.selectedUser) {
            input.assignee_id = this.selectedUser.id;
        }
        else if (this.parameter.assignee_id) {
            input.assignee_id = this.parameter.assignee_id;
        }
        this.parameter.loading = true;
        this.admin.postDataApi('leads/noataries', input).subscribe(function (success) {
            _this.parameter.loading = false;
            _this.items = success.data;
            if (_this.items.length <= 0) {
                _this.parameter.noResultFound = true;
            }
            _this.parameter.total = success.total_count;
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    NotaryLeadsComponent.prototype.getPage = function (page) {
        this.parameter.page = page;
        this.getListing();
    };
    NotaryLeadsComponent.prototype.sort_by = function (sort_by_flag) {
        if (this.parameter.sort_by_flag !== sort_by_flag) {
            this.parameter.sort_by_flag = sort_by_flag;
            this.parameter.sort_by_order = 0;
        }
        else {
            this.parameter.sort_by_order = this.parameter.sort_by_order ? 0 : 1;
        }
        this.getListing();
    };
    NotaryLeadsComponent.prototype.addDateTime = function () {
        // if (this.date && this.time) {
        //   const newdate = this.date + ' ' + this.time + ':00';
        //   // const d = new ChatTimePipe().transform(newdate, 'YYYY-MM-DD HH:MM:SS', 3);
        //   // this.availability.date_time_array.push({date_time: d});
        //   this.availability.date_time_array.push({date_time: newdate});
        //   this.date = ''; this.time = '';
        // }
        if (this.date) {
            this.availability.date_time_array.push({ date_time: this.date });
            this.date = '';
        }
    };
    NotaryLeadsComponent.prototype.openModal = function ($event, item, index) {
        console.log($event);
        // $event.stopPropagation();
        // this.availability.date_time_array = item.selected_properties[0].selected_noatary[0].noatary_availability;
        this.availability.property_id = item.selected_properties[0].property_id;
        this.availability.lead_id = item.id;
        this.parameter.index = index;
        this.data = item.selected_properties[0].selected_noatary[0].noatary_availability;
        this.modalOpen.nativeElement.click();
    };
    NotaryLeadsComponent.prototype.closeModal = function () {
        this.modalClose.nativeElement.click();
        this.availability = new _models_leads_model__WEBPACK_IMPORTED_MODULE_3__["AddNotaryAvailabilty"]();
    };
    NotaryLeadsComponent.prototype.add = function () {
        var _this = this;
        this.availability.date_time_array.forEach(function (element) {
            var d = new Date(element.date_time);
            var f = moment__WEBPACK_IMPORTED_MODULE_5__(d).utc().format('YYYY-MM-DD HH:mm:ss');
            _this.availability.date_time.push(f);
        });
        this.data.forEach(function (element1) {
            _this.availability.date_time.push(element1.date_time);
        });
        if (this.availability.date_time.length === 0) {
            swal('Error', 'Choose atleast one date.', 'error');
            return false;
        }
        this.parameter.loading = true;
        console.log('data', this.availability);
        this.admin.postDataApi('leads/addNoataryAvailability', this.availability)
            .subscribe(function (success) {
            _this.items[_this.parameter.index] = success.data;
            _this.parameter.loading = false;
            _this.closeModal();
            swal('Success', 'Availability added successfully.', 'success');
            // this.items = success.data;
            // this.parameter.total = success.total_count;
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    NotaryLeadsComponent.prototype.removeNoataryAvailability = function (id, j) {
        var _this = this;
        this.admin.postDataApi('leads/removeNoataryAvailability', { id: id })
            .subscribe(function (success) {
            _this.data.splice(j, 1);
            // this.items = success.data;
            // this.parameter.total = success.total_count;
        });
    };
    NotaryLeadsComponent.prototype.removeNoatary = function (i) {
        this.availability.date_time_array.splice(i, 1);
    };
    NotaryLeadsComponent.prototype.selectAll = function () {
        this.items.forEach(function (item) {
            item.selected = true;
        });
    };
    NotaryLeadsComponent.prototype.bulkAssign = function () {
        // this.assign.keyword = '';
        var leads_ids = this.items.filter(function (x) { return x.selected; }).map(function (y) { return y.id; });
        if (leads_ids.length === 0) {
            swal('Error', 'Please choose atleast one lead.', 'error');
            return false;
        }
        this.openAssignModel.nativeElement.click();
        // this.admin.postDataApi('getCsrBuyers', {}).subscribe(
        //   success => {
        //     this.assign.items = success.data;
        //   });
    };
    NotaryLeadsComponent.prototype.getAssignListing = function () {
        var _this = this;
        // this.assign.items = [];
        var input = {
            keyword: this.assign.keyword
        };
        this.admin.postDataApi('getNoataries', input).subscribe(function (success) {
            _this.assign.items = success.data;
        });
    };
    NotaryLeadsComponent.prototype.assignNow = function () {
        var _this = this;
        var leads_ids = this.items.filter(function (x) { return x.selected; }).map(function (y) { return y.id; });
        var input = {
            noatary_id: this.assignItem.id,
            leads: leads_ids
        };
        this.parameter.loading = true;
        this.admin.postDataApi('leads/bulkAssignNoatary', input).subscribe(function (r) {
            _this.parameter.loading = false;
            swal('Success', 'Assigned successfully', 'success');
            _this.closeAssignModel.nativeElement.click();
            _this.getListing();
        }, function (error) {
            _this.parameter.loading = false;
            _this.closeAssignModel.nativeElement.click();
            swal('Error', error.error.message, 'error');
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('openAssignModel'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], NotaryLeadsComponent.prototype, "openAssignModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('closeAssignModel'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], NotaryLeadsComponent.prototype, "closeAssignModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalOpen'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], NotaryLeadsComponent.prototype, "modalOpen", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], NotaryLeadsComponent.prototype, "modalClose", void 0);
    NotaryLeadsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-notary-leads',
            template: __webpack_require__(/*! ./notary-leads.component.html */ "./src/app/layout/notary/notary-leads/notary-leads.component.html"),
            styles: [__webpack_require__(/*! ./notary-leads.component.css */ "./src/app/layout/notary/notary-leads/notary-leads.component.css")],
            providers: [_models_leads_model__WEBPACK_IMPORTED_MODULE_3__["AddNotaryAvailabilty"], _models_leads_model__WEBPACK_IMPORTED_MODULE_3__["NotaryLeads"]]
        }),
        __metadata("design:paramtypes", [_services_admin_service__WEBPACK_IMPORTED_MODULE_1__["AdminService"],
            _common_constants__WEBPACK_IMPORTED_MODULE_2__["Constant"],
            _models_leads_model__WEBPACK_IMPORTED_MODULE_3__["AddNotaryAvailabilty"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"]])
    ], NotaryLeadsComponent);
    return NotaryLeadsComponent;
}());



/***/ }),

/***/ "./src/app/layout/notary/notary.component.css":
/*!****************************************************!*\
  !*** ./src/app/layout/notary/notary.component.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".add-img{\n    background-size: cover;background-repeat: no-repeat;\n}"

/***/ }),

/***/ "./src/app/layout/notary/notary.component.html":
/*!*****************************************************!*\
  !*** ./src/app/layout/notary/notary.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<div class=\"container-fluid\">\n  <div class=\"row\">\n      <div class=\"col-md-4 col-6\">\n        <div class=\"title-group\">\n            <h5>Notaries</h5>\n            <p>Showing {{parameter.items?.length}} out of {{parameter.total}}</p>\n        </div>\n      </div>\n      <div class=\"col-md-5 col-6\">\n        <div class=\"btn-cont upload-excel pull-right\">\n            <a title=\"Download Sample File\" href=\"assets/docx/Sozu_Notaries_Sample.xlsx\" class=\"btn\"><span class=\"fa fa-download\"></span></a>\n            <label title=\"Choose Excel File\" class=\"img_label\">{{label}}\n                <input type=\"file\" #fileInput accept=\".xls,.xlsx\" (change)=\"getFileName()\">\n            </label>\n            <a title=\"Upload Selected File\" (click)=\"importNoatary()\" href=\"javascript://\" class=\"btn\"><span class=\"fa fa-upload\"></span></a>\n        </div>\n      </div>\n      <div class=\"col-md-3 col-6\">\n        <div class=\"btn-cont text-right\">\n            <a style=\"display: none;\" class=\"btn btn-primary\" href=\"javascript://\" data-toggle=\"modal\" data-target=\"#add\" #modalOpen>Add New</a>\n            <a *ngIf=\"admin?.admin_acl['Notaries Management']?.can_create==1\" (click)=\"openModal()\" class=\"btn btn-primary\" href=\"javascript://\">Add New</a>\n        </div>\n      </div>\n  </div>\n\n  <div class=\"white-bg\">\n      <div class=\"tabel-section\">\n        <div class=\"table-responsive\">\n          <table class=\"table table-striped table-align-left\">\n            <tr>\n              <th style=\"width:5%\">&nbsp;</th>\n              <th style=\"width:20%\">\n                <div class=\"table-search\">\n                    <label>Company Name</label>\n                    <div class=\"searh-3\">\n                      <input type=\"text\" [(ngModel)]=\"parameter.company_name\" (keyup.enter)=\"getNoatariesListing(parameter.p, parameter.company_name, parameter.name, parameter.phone, parameter.email)\" name=\"\">\n                      <button *ngIf=\"parameter.company_name\" (click)=\"getNoatariesListing(parameter.p, parameter.company_name, parameter.name, parameter.phone, parameter.email)\"><i class=\"fa fa-search\"></i></button>\n                    </div>\n                </div>\n              </th>\n              <th style=\"width:15%\">\n                <div class=\"table-search\">\n                    <label>Name</label>\n                    <div class=\"searh-3\">\n                      <input type=\"text\" [(ngModel)]=\"parameter.name\" (keyup.enter)=\"getNoatariesListing(parameter.p, parameter.company_name, parameter.name, parameter.phone, parameter.email)\" name=\"\">\n                      <button *ngIf=\"parameter.name\" (click)=\"getNoatariesListing(parameter.p, parameter.company_name, parameter.name, parameter.phone, parameter.email)\"><i class=\"fa fa-search\"></i></button>\n                    </div>\n                </div>\n              </th>\n              <th style=\"width:15%; text-align:left;\">\n                <div class=\"table-search\">\n                    <label>Contact Number</label>\n                    <div class=\"searh-3\">\n                      <input type=\"text\" [(ngModel)]=\"parameter.phone\" (keyup.enter)=\"getNoatariesListing(parameter.p, parameter.company_name, parameter.name, parameter.phone, parameter.email)\" name=\"\">\n                      <button *ngIf=\"parameter.phone\" (click)=\"getNoatariesListing(parameter.p, parameter.company_name, parameter.name, parameter.phone, parameter.email)\"><i class=\"fa fa-search\"></i></button>\n                    </div>\n                </div>\n              </th>\n              <th style=\"width:15%\">\n                <div class=\"table-search\">\n                    <label>Email Address</label>\n                    <div class=\"searh-3\">\n                      <input type=\"text\" [(ngModel)]=\"parameter.email\" (keyup.enter)=\"getNoatariesListing(parameter.p, parameter.company_name, parameter.name, parameter.phone, parameter.email)\" name=\"\">\n                      <button *ngIf=\"parameter.email\" (click)=\"getNoatariesListing(parameter.p, parameter.company_name, parameter.name, parameter.phone, parameter.email)\"><i class=\"fa fa-search\"></i></button>\n                    </div>\n                </div>\n              </th>\n              <th style=\"width:15%; vertical-align: top;\">\n                <div class=\"table-search\">\n                    <label>Address</label>\n                </div>\n              </th>\n              <th style=\"width:15%\">\n                &nbsp;\n              </th>\n            </tr>\n      \n            <tr *ngFor=\"let item of parameter.items| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: parameter.total }; let i=index\">\n              <td> \n                  <img [src]=\"item.image| img:'small'\" class=\"rounded-circle\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\">\n              </td>\n              <td class=\"text-left\">\n                <span class=\"name\">\n                  <a data-toggle=\"popover\" data-placement=\"top\" title=\"{{item.company_name}}\">{{item.company_name ? item.company_name : 'NA'}}</a>\n                </span>\n              </td>\n              <td class=\"text-left\">\n                <span class=\"name\">\n                  <a data-toggle=\"popover\" data-placement=\"top\" title=\"{{item.name}}\">{{item.name}}</a>\n                </span>\n              </td>\n              <td class=\"text-left\" *ngIf=\"item.phone\">{{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}</td>\n              <td class=\"text-left\" *ngIf=\"!item.phone\">NA</td>\n              <td class=\"text-left\">{{item.email}}</td>\n              <td class=\"text-left\">{{item.address?item.address:'NA'}}</td>\n              <td>\n                <a *ngIf=\"admin?.admin_acl['Notary Lead Management']?.can_read==1\" title=\"View Leads\" href=\"javascript://\"\n                  routerLink=\"/dashboard/notary/view-notary-leads/{{item.id}}\" class=\"icon-block edit-icon\">\n                  <img src=\"assets/img/ic_leads.png\" alt=\"img\">\n                </a>\n                <button title=\"Edit Details\" [disabled]=\"admin?.admin_acl['Notaries Management']?.can_update==0\" (click)=\"editUser(item, i)\" class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></button>\n                <button [disabled]=\"admin?.admin_acl['Notaries Management']?.can_delete==0\"\n                  (click)=\"blockUnblockPopup(i, item.id, item.is_blocked==1?0:1)\" \n                  title=\"{{item.is_blocked==1?'Unblock Notary':'Block Notary'}}\" [ngClass]=\"{'unblock-bg':item.is_blocked==1}\"\n                  class=\"action-icon\"><img src=\"assets/img/block.png\" alt=\"img\">\n                </button>\n                <button [disabled]=\"admin?.admin_acl['Notaries Management']?.can_purge==0\" (click)=\"deletePopup(item, i);\" class=\"action-icon\" title=\"Delete Notary\"><img src=\"assets/img/ic_delete.png\" alt=\"img\"></button>\n              </td>\n            </tr>\n\n          </table>\n        </div>\n      </div>\n\n      <div class=\"center\" *ngIf=\"parameter.total == 0\">\n        <img src=\"assets/img/404-error.png\">\n      </div>\n  </div>\n  \n  <div class=\"btn-cont text-right marginT15\" *ngIf=\"parameter.total\">\n    <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n  </div>\n  \n</div>\n\n\n<!-- add inhouse user modal -->\n<div class=\"modal animated\" id=\"add\">\n  <div class=\"modal-dialog fadeIndown\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n          <button style=\"display: none;\" type=\"button\" class=\"close\" data-dismiss=\"modal\" #modalClose>&times;</button>\n          <button type=\"button\" class=\"close\" (click)=\"closeModal(); addForm.reset()\">&times;</button>\n      </div>\n\n      <form class=\"form-horizontal form-model0P\" role=\"form\" ngNativeValidate #addForm=\"ngForm\" (ngSubmit)=\"addNewUser(addForm)\">\n        <div class=\"modal-body\">\n          <div class=\"row\">\n            <div class=\"col-6\">\n              <div class=\"add-img\" style=\"display:flex;\">\n                <img *ngIf=\"model.image\" [src]=\"model.image\" style=\"object-fit: cover; width: 100%;\">\n                <label *ngIf=\"model.image\">\n                  <input accept=\"image/*\" name=\"image\" class=\"image\" (change)=\"changeListner($event)\" type=\"file\">\n                </label>\n                <label *ngIf=\"!model.image\">+ Add Image</label>\n                <input *ngIf=\"!model.image\" accept=\"image/*\" name=\"image\" class=\"image\" (change)=\"changeListner($event)\" type=\"file\">\n              </div>\n            </div>\n            <div class=\"col-6\">\n              <div class=\"btn-cont text-right\">\n                  <button *ngIf=\"!model.id\" type=\"submit\" class=\"btn btn-primary\">ADD</button>\n                  <button *ngIf=\"model.id\" type=\"submit\" [disabled]=\"!addForm.valid\" class=\"btn btn-primary\">UPDATE</button>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"spacer40\"></div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                  <label>Company Name <span class=\"color-red\">*</span></label>\n                  <div class=\"form-group\">\n                  <input autocomplete=\"off\" required type=\"text\" class=\"form-control\" [(ngModel)]=\"model.company_name\" name=\"company_name\">\n                </div>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                  <label>Name <span class=\"color-red\">*</span></label>\n                  <div class=\"form-group\">\n                  <input autocomplete=\"off\" required type=\"text\" class=\"form-control\" [(ngModel)]=\"model.name\" name=\"name\">\n                </div>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                  <label>Contact number <span class=\"color-red\">*</span></label>\n                  <div class=\"form-group\">\n                  <input minlength=\"6\" maxlength=\"16\" autocomplete=\"off\" type=\"text\" [pattern]=\"constant.phonePattern\" class=\"form-control\" id=\"phone\" required minlength=\"1\" [(ngModel)]=\"model.phone\" name=\"phone\"\n                      ng2TelInput [ng2TelInputOptions]=\"initialCountry\" (countryChange)=\"onCountryChange($event)\" />\n                </div>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                  <label>Email ID <span class=\"color-red\">*</span></label>\n                  <div class=\"form-group\">\n                  <input autocomplete=\"off\" required [pattern]=\"constant.emailPattern\" type=\"email\" class=\"form-control\" [(ngModel)]=\"model.email\" name=\"email\">\n                </div>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                  <label>Address <span class=\"color-red\">*</span></label>\n                  <div class=\"form-group\">\n                  <input autocomplete=\"off\" required type=\"text\" class=\"form-control\" [(ngModel)]=\"model.address\" name=\"address\">\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n</div>\n<!-- <router-outlet></router-outlet> -->"

/***/ }),

/***/ "./src/app/layout/notary/notary.component.ts":
/*!***************************************************!*\
  !*** ./src/app/layout/notary/notary.component.ts ***!
  \***************************************************/
/*! exports provided: NotaryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotaryComponent", function() { return NotaryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_admin_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var _models_users_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../models/users.model */ "./src/app/models/users.model.ts");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../common/constants */ "./src/app/common/constants.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NotaryComponent = /** @class */ (function () {
    function NotaryComponent(constant, model, admin) {
        this.constant = constant;
        this.model = model;
        this.admin = admin;
        this.parameter = {};
    }
    NotaryComponent.prototype.ngOnInit = function () {
        this.label = 'Choose Notaries File';
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        this.parameter.type = 1;
        this.initialCountry = { initialCountry: this.constant.country_code };
        this.getNoatariesListing(this.parameter.page, '', '', '', '');
    };
    NotaryComponent.prototype.closeModal = function () {
        this.model = new _models_users_model__WEBPACK_IMPORTED_MODULE_2__["Users"]();
        this.modalClose.nativeElement.click();
    };
    NotaryComponent.prototype.openModal = function () {
        this.model = new _models_users_model__WEBPACK_IMPORTED_MODULE_2__["Users"]();
        this.model.country_code = this.constant.country_code;
        this.model.dial_code = this.constant.dial_code;
        this.modalOpen.nativeElement.click();
    };
    NotaryComponent.prototype.getPage = function (page) {
        this.parameter.page = page;
        this.getNoatariesListing(this.parameter.page, this.parameter.company_name, this.parameter.name, this.parameter.phone, this.parameter.email);
    };
    NotaryComponent.prototype.getNoatariesListing = function (page, company_name, name, phone, email) {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.page = page;
        this.parameter.name = name;
        this.parameter.company_name = company_name;
        this.parameter.phone = phone;
        this.parameter.email = email;
        this.admin.postDataApi('getNoatariesListing', this.parameter)
            .subscribe(function (success) {
            _this.parameter.loading = false;
            _this.parameter.items = success.data;
            _this.parameter.total = success.total;
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    NotaryComponent.prototype.changeListner = function (event) {
        var _this = this;
        var reader = new FileReader();
        reader.onload = function (e) {
            // this.model.image = e.target.result;
        };
        var input = new FormData();
        input.append('image', event.target.files[0]);
        this.admin.postDataApi('saveImage', input).subscribe(function (res) { _this.model.image = res['data'].image; });
        reader.readAsDataURL(event.target.files[0]);
    };
    NotaryComponent.prototype.onCountryChange = function (e) {
        this.model.country_code = e.iso2;
        this.model.dial_code = '+' + e.dialCode;
        this.initialCountry = { initialCountry: e.iso2 };
    };
    NotaryComponent.prototype.importNoatary = function () {
        var _this = this;
        var file = this.fileInput.nativeElement;
        var attachment;
        if (file.files && file.files[0]) {
            attachment = file.files[0];
            if (attachment.size > this.constant.fileSizeLimit) {
                swal('Error', 'File size is more than 25MB.', 'error');
                return false;
            }
            this.parameter.loading = true;
            var input = new FormData();
            input.append('attachment', attachment);
            this.admin.postDataApi('importNoatary', input)
                .subscribe(function (success) {
                _this.parameter.loading = false;
                _this.fileInput.nativeElement.value = '';
                _this.label = 'Choose Notaries File';
                swal('Success', 'Imported successfully.', 'success');
                _this.getNoatariesListing(_this.parameter.page, '', '', '', '');
            }, function (error) {
                _this.parameter.loading = false;
            });
        }
        else {
            swal('Error', 'Please choose file', 'error');
            return false;
        }
    };
    NotaryComponent.prototype.addNewUser = function (formData) {
        var _this = this;
        this.parameter.loading = true;
        this.admin.postDataApi('addNoatary', this.model)
            .subscribe(function (success) {
            _this.parameter.loading = false;
            _this.modalClose.nativeElement.click();
            var text = _this.model.id ? 'Updated successfully.' : 'Added successfully.';
            swal('Success', text, 'success');
            if (_this.parameter.items.length < 10) {
                if (_this.model.id) {
                    _this.parameter.items[_this.parameter.index] = success.data;
                }
                else {
                    _this.parameter.items.push(success.data);
                    _this.parameter.total++;
                }
                _this.model = new _models_users_model__WEBPACK_IMPORTED_MODULE_2__["Users"]();
                formData.reset();
            }
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    NotaryComponent.prototype.editUser = function (userdata, index) {
        this.model = JSON.parse(JSON.stringify(userdata));
        this.parameter.index = index;
        this.modalOpen.nativeElement.click();
    };
    NotaryComponent.prototype.blockUnblockPopup = function (index, id, flag) {
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
                _this.blockNoatary(index, id, flag);
            }
        });
    };
    NotaryComponent.prototype.blockNoatary = function (index, id, flag) {
        var _this = this;
        this.parameter.index = index;
        this.admin.postDataApi('blockNoatary', { id: id, flag: flag })
            .subscribe(function (success) {
            swal('Success', _this.parameter.successText, 'success');
            _this.parameter.items[_this.parameter.index] = success.data;
        });
    };
    NotaryComponent.prototype.getFileName = function () {
        var fi = this.fileInput.nativeElement;
        var uploadedFile = fi.files[0];
        this.label = uploadedFile.name;
    };
    NotaryComponent.prototype.deletePopup = function (item, index) {
        var _this = this;
        this.parameter.title = this.constant.title.ARE_YOU_SURE;
        this.parameter.text = 'You want to delete this notary?';
        swal({
            html: this.parameter.title + '<br>' + this.parameter.text,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.deleteNoatary(item, index);
            }
        });
    };
    NotaryComponent.prototype.deleteNoatary = function (item, index) {
        var _this = this;
        this.admin.postDataApi('deleteNoatary', { id: item.id }).subscribe(function (r) {
            swal('Success', 'Deleted successfully.', 'success');
            _this.parameter.items.splice(index, 1);
            _this.parameter.total--;
        }, function (error) {
            swal('Error', error.error.message, 'error');
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalOpen'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], NotaryComponent.prototype, "modalOpen", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], NotaryComponent.prototype, "modalClose", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('fileInput'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], NotaryComponent.prototype, "fileInput", void 0);
    NotaryComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-notary',
            template: __webpack_require__(/*! ./notary.component.html */ "./src/app/layout/notary/notary.component.html"),
            styles: [__webpack_require__(/*! ./notary.component.css */ "./src/app/layout/notary/notary.component.css")],
            providers: [_models_users_model__WEBPACK_IMPORTED_MODULE_2__["Users"]]
        }),
        __metadata("design:paramtypes", [_common_constants__WEBPACK_IMPORTED_MODULE_3__["Constant"], _models_users_model__WEBPACK_IMPORTED_MODULE_2__["Users"], _services_admin_service__WEBPACK_IMPORTED_MODULE_1__["AdminService"]])
    ], NotaryComponent);
    return NotaryComponent;
}());



/***/ }),

/***/ "./src/app/layout/notary/notary.module.ts":
/*!************************************************!*\
  !*** ./src/app/layout/notary/notary.module.ts ***!
  \************************************************/
/*! exports provided: NotaryModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotaryModule", function() { return NotaryModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_loading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-loading */ "./node_modules/ngx-loading/fesm5/ngx-loading.js");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ng2_tel_input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ng2-tel-input */ "./node_modules/ng2-tel-input/ng2-tel-input.js");
/* harmony import */ var _notary_leads_notary_leads_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./notary-leads/notary-leads.component */ "./src/app/layout/notary/notary-leads/notary-leads.component.ts");
/* harmony import */ var _notary_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./notary.component */ "./src/app/layout/notary/notary.component.ts");
/* harmony import */ var _notary_leads_notary_leads_details_notary_leads_details_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./notary-leads/notary-leads-details/notary-leads-details.component */ "./src/app/layout/notary/notary-leads/notary-leads-details/notary-leads-details.component.ts");
/* harmony import */ var _guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../guards/acl-user.guard */ "./src/app/guards/acl-user.guard.ts");
/* harmony import */ var _modules_shared_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../modules/shared.module */ "./src/app/modules/shared.module.ts");
/* harmony import */ var _swimlane_ngx_charts__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @swimlane/ngx-charts */ "./node_modules/@swimlane/ngx-charts/release/esm.js");
/* harmony import */ var primeng_primeng__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! primeng/primeng */ "./node_modules/primeng/primeng.js");
/* harmony import */ var primeng_primeng__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(primeng_primeng__WEBPACK_IMPORTED_MODULE_13__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var routes = [
    { path: 'view-notary', component: _notary_component__WEBPACK_IMPORTED_MODULE_8__["NotaryComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_10__["AclUserGuard"]], data: { roles: ['Notaries Management', 'can_read', 'can_noatary'] } },
    // all leads
    { path: 'notary-leads', component: _notary_leads_notary_leads_component__WEBPACK_IMPORTED_MODULE_7__["NotaryLeadsComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_10__["AclUserGuard"]], data: { roles: ['Notary Lead Management', 'can_read', 'can_noatary'] } },
    // leads wrt particular notary
    { path: 'view-notary-leads/:id', component: _notary_leads_notary_leads_component__WEBPACK_IMPORTED_MODULE_7__["NotaryLeadsComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_10__["AclUserGuard"]], data: { roles: ['Notary Lead Management', 'can_read', 'can_noatary'] } },
    // details
    { path: 'notary-leads/:id', component: _notary_leads_notary_leads_details_notary_leads_details_component__WEBPACK_IMPORTED_MODULE_9__["NotaryLeadsDetailsComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_10__["AclUserGuard"]], data: { roles: ['Notary Lead Management', 'can_read', 'can_noatary'] } }
];
var NotaryModule = /** @class */ (function () {
    function NotaryModule() {
    }
    NotaryModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes),
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                ngx_loading__WEBPACK_IMPORTED_MODULE_3__["NgxLoadingModule"].forRoot({
                    animationType: ngx_loading__WEBPACK_IMPORTED_MODULE_3__["ngxLoadingAnimationTypes"].rectangleBounce,
                    primaryColour: '#00B96F'
                }),
                ngx_pagination__WEBPACK_IMPORTED_MODULE_4__["NgxPaginationModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
                ng2_tel_input__WEBPACK_IMPORTED_MODULE_6__["Ng2TelInputModule"],
                _swimlane_ngx_charts__WEBPACK_IMPORTED_MODULE_12__["NgxChartsModule"],
                _modules_shared_module__WEBPACK_IMPORTED_MODULE_11__["SharedModule"],
                primeng_primeng__WEBPACK_IMPORTED_MODULE_13__["CalendarModule"]
            ],
            declarations: [
                _notary_component__WEBPACK_IMPORTED_MODULE_8__["NotaryComponent"],
                _notary_leads_notary_leads_component__WEBPACK_IMPORTED_MODULE_7__["NotaryLeadsComponent"],
                _notary_leads_notary_leads_details_notary_leads_details_component__WEBPACK_IMPORTED_MODULE_9__["NotaryLeadsDetailsComponent"]
            ]
        })
    ], NotaryModule);
    return NotaryModule;
}());



/***/ })

}]);
//# sourceMappingURL=notary-notary-module.js.map