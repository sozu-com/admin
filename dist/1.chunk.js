webpackJsonp([1],{

/***/ "../../../../../src/app/layout/common-blocks/fill-information/fill-information.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/common-blocks/fill-information/fill-information.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div class=\"white-bg padding15\">\n    <p class=\"p16 marginB0\">Fill in Information</p>\n</div>\n<hr class=\"margin0\" *ngIf=\"fillInfo\">\n<div class=\"white-bg padding40 fill-info\" malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\">\n    <form ngNativeValidate #addForm=\"ngForm\" (ngSubmit)=\"addPreferences()\">\n    <div class=\"form-group-4\">\n        <label>Close proximity needed to</label>\n        <div class=\"clearfix\"></div>\n        <label class=\"cust-radio\" *ngFor=\"let proximity_place of fillInfo.proximity_places_array; let i=index\">\n            <input type=\"checkbox\" (click)=\"setValue('proximity_places_array', i)\" [checked]=\"proximity_place.is_selected == 0 ? '' : 'checked'\" name=\"radio3\">\n            <span class=\"checkmark\">{{proximity_place.name}}</span>\n        </label>\n        <div class=\"clearfix\"></div>\n    </div>\n    <div class=\"form-group-4 marginT20\"></div>\n    <div class=\"row\">\n        <div class=\"col-sm-12 col-12\">\n            <div class=\"form-group-4\">\n                <label>Family Size</label>\n                <input min=\"1\" class=\"form-control\" [(ngModel)]=\"fillInfo.family_size\" type=\"number\" name=\"family_size\">\n            </div>\n        </div>\n    </div>\n    <div class=\"inline-form-group-2 marginT20\">\n        <div class=\"row\">\n            <div class=\"col-6\"><label class=\"float-left\">Do you have pets?</label></div>\n            <div class=\"col-5\">\n                <label class=\"cust-check-bx\">\n                <input type=\"checkbox\" value=\"{{fillInfo.pets == 1 ? 'true' : 'false'}}\" [(ngModel)]=\"fillInfo.pets\" name=\"pets\">\n                <span class=\"checkmark\"></span>\n                </label>\n            </div>\n        </div>\n    </div>\n    <div class=\"inline-form-group-2 marginT20\">\n        <div class=\"row\">\n            <div class=\"col-6\"><label class=\"float-left\">Do you have kids?</label></div>\n            <div class=\"col-5\">\n                <label class=\"cust-check-bx\">\n                <input type=\"checkbox\" value=\"{{fillInfo.kid_count == 1 ? 'true' : 'false'}}\" [(ngModel)]=\"fillInfo.kid_count\" name=\"kid_count\">\n                <span class=\"checkmark\"></span>\n                </label>\n            </div>\n        </div>\n    </div>\n    <div class=\"form-group-4 marginT20\">\n    <div class=\"row\">\n        <div class=\"col-sm-12 col-12\">\n            <div class=\"form-group-4\">\n                <label>Price range</label>\n                <nouislider *ngIf=\"fillInfo.price_range\" name=\"price_range\" [connect]=\"true\" [min]=\"constant.minValue\" [max]=\"constant.maxValue\" [step]=\"constant.steps\" [tooltips]=\"true\" [(ngModel)]=\"fillInfo.price_range\"></nouislider>\n            </div>\n        </div>\n    </div>\n    </div>\n    <div class=\"form-group-4 date-picker marginT20\">\n        <label>How soon planning to buy/rent</label>\n        <div class=\"clearfix\"></div>\n        <input type=\"date\" min=\"{{today|date:'yyyy-MM-dd'}}\" max='9999-12-31' [ngModel]=\"fillInfo.planning_to_buy  | date:'yyyy-MM-dd' \" (ngModelChange)=\"fillInfo.planning_to_buy = $event;\" name=\"planning_to_but\" class=\"form-control\" id=\"datetimepicker\">\n        <!-- <span class=\"sel-date\">Select date</span> -->\n        <!-- <div class=\"select-date select-date-small\">\n            <img *ngIf=\"model.floor_plan\" [src]=\"model.floor_plan\" class=\"floor-plan\">\n            <input type=\"file\" name=\"\" accept=\"image/*\" (change)=\"onSelectFile('floor_plan', $event)\">\n            <div class=\"select-date-caption\">\n                <p class=\"green-color marginT30\">Select date</p>\n            </div> \n        </div> -->\n        <div class=\"clearfix\"></div>\n    </div>\n    <div class=\"form-group-4 marginT20\">\n        <label>Number of Cars</label>\n        <div class=\"clearfix\"></div>\n        <label class=\"cust-radio\" *ngFor=\"let car_type of fillInfo.car_types; let i=index\">\n        <input type=\"radio\" (click)=\"setValue('car_types', i)\" [checked]=\"car_type.is_selected == 0 ? '' : 'checked'\" name=\"radio4\">\n        <span class=\"checkmark\">{{car_type.name}}</span>\n        </label>\n        <div class=\"clearfix\"></div>\n    </div>\n    <div class=\"form-group-4 marginT20\">\n        <label>Configuration</label>\n        <div class=\"clearfix\"></div>\n        <label class=\"cust-radio\" *ngFor=\"let configuration of fillInfo.configurations_array; let i=index\">\n            <input type=\"checkbox\" (click)=\"setValue('configurations_array', i)\" [checked]=\"configuration.is_selected == 0 ? '' : 'checked'\" name=\"radio2\">\n            <span class=\"checkmark\">{{configuration.name}}</span>\n        </label>\n        <div class=\"clearfix\"></div>\n    </div>\n    <div class=\"form-group-4 marginT20\">\n        <label>Property Type</label>\n        <div class=\"clearfix\"></div>\n        <label class=\"cust-radio\" *ngFor=\"let property_type of fillInfo.property_types_array; let i=index\">\n            <input type=\"checkbox\" (click)=\"setValue('property_types_array', i)\" [checked]=\"property_type.is_selected == 0 ? '' : 'checked'\" name=\"radio1\">\n            <span class=\"checkmark\">{{property_type.name}}</span>\n        </label>\n        <div class=\"clearfix\"></div>\n    </div>\n\n\n    <div class=\"btn-cont text-right\">\n        <!-- <button type=\"submit\" [disabled]=\"addForm.invalid\" class=\"btn btn-primary\">Save</button> -->\n        <!-- *ngIf=\"(!parameter.lead?.broker && parameter.lead?.user && admin?.admin_acl['Buyer Lead Management']?.can_update==1) || admin?.permissions?.can_csr_buyer==1\" -->\n        <!-- admin?.admin_acl['Buyer Management']?.can_create==1 && parameter.userType=='csr-buyers' ||\n                admin?.admin_acl['Broker Management']?.can_create==1 && parameter.userType=='inhouse-broker' ||\n                admin?.admin_acl['Closer Management']?.can_create==1 && parameter.userType=='csr-closers'\" -->\n\n        <button [disabled]=\"(sent_as==constant.userType.csr_buyer && (admin?.admin_acl['Buyer Lead Management']?.can_update==0 || admin?.permissions?.can_csr_buyer==0)) ||\n                            (sent_as==constant.userType.inhouse_broker && (admin?.admin_acl['Broker Lead Management']?.can_update==0 || admin?.permissions?.can_in_house_broker==0))\"\n                type=\"submit\" class=\"btn btn-primary\">Save</button>\n    </div>\n    </form>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/layout/common-blocks/fill-information/fill-information.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_leads_model__ = __webpack_require__("../../../../../src/app/models/leads.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pipes_chat_time_pipe__ = __webpack_require__("../../../../../src/app/pipes/chat-time.pipe.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FillInformationComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var FillInformationComponent = /** @class */ (function () {
    function FillInformationComponent(admin, constant, model) {
        this.admin = admin;
        this.constant = constant;
        this.model = model;
        this.parameter = {};
        this.scrollbarOptions = { axis: 'y', theme: 'dark', scrollbarPosition: 'inside' };
    }
    FillInformationComponent.prototype.ngOnInit = function () {
        this.today = new Date();
        this.getPrefOptions();
    };
    FillInformationComponent.prototype.getPrefOptions = function () {
        var _this = this;
        this.admin.postDataApi('leads/getPrefOptions', { lead_id: this.lead_id }).subscribe(function (r) {
            _this.parameter.proximity_places = r.data.proximity_places;
            _this.parameter.car_types = r.data.car_types;
        });
    };
    FillInformationComponent.prototype.setValue = function (param, i) {
        this.fillInfo[param][i].is_selected = this.fillInfo[param][i].is_selected === 1 ? 0 : 1;
    };
    FillInformationComponent.prototype.saveDate = function (s) {
        // console.log('save', s);
    };
    FillInformationComponent.prototype.addPreferences = function () {
        var _this = this;
        this.fillInfo.car_types.forEach(function (element) {
            if (element.is_selected === 1) {
                _this.fillInfo.car_type_id = element.id;
            }
        });
        this.fillInfo.proximity_places_array.forEach(function (element) {
            if (element.is_selected === 1) {
                _this.fillInfo.proximity_place_ids.push(element.id);
            }
        });
        this.fillInfo.property_types_array.forEach(function (element) {
            if (element.is_selected === 1) {
                _this.fillInfo.property_types.push(element.id);
            }
        });
        this.fillInfo.configurations_array.forEach(function (element) {
            if (element.is_selected === 1) {
                _this.fillInfo.configurations.push(element.id);
            }
        });
        this.fillInfo.pets = this.fillInfo.pets === true || this.fillInfo.pets.toString() === '1' ? '1' : '0';
        this.fillInfo.kid_count = this.fillInfo.kid_count === true || this.fillInfo.kid_count.toString() === '1' ? '1' : '0';
        this.fillInfo.min_price = this.fillInfo.price_range[0];
        this.fillInfo.max_price = this.fillInfo.price_range[1];
        // console.log('before', this.fillInfo);
        if (this.fillInfo.planning_to_buy === 'Invalid date') {
            // console.log('yes');
            this.fillInfo.planning_to_buy = '';
        }
        else {
            // console.log('np');
            this.fillInfo.planning_to_buy = new __WEBPACK_IMPORTED_MODULE_4__pipes_chat_time_pipe__["a" /* ChatTimePipe */]().transform(this.fillInfo.planning_to_buy, 'YYYY-MM-DD HH:MM:SS', 3);
        }
        // console.log('fil', this.fillInfo);
        this.admin.postDataApi('leads/addPreferences', this.fillInfo).subscribe(function (r) {
            swal('Success', _this.constant.successMsg.DETAILS_UPDATED_SUCCESSFULLY, 'success');
        });
    };
    var _a, _b, _c;
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('lead_id'),
        __metadata("design:type", Object)
    ], FillInformationComponent.prototype, "lead_id", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('fillInfo'),
        __metadata("design:type", Object)
    ], FillInformationComponent.prototype, "fillInfo", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('sent_as'),
        __metadata("design:type", Object)
    ], FillInformationComponent.prototype, "sent_as", void 0);
    FillInformationComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-fill-information',
            template: __webpack_require__("../../../../../src/app/layout/common-blocks/fill-information/fill-information.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/common-blocks/fill-information/fill-information.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_3__models_leads_model__["b" /* FillInformation */]]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" ? _a : Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__common_constants__["a" /* Constant */]) === "function" ? _b : Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__models_leads_model__["b" /* FillInformation */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__models_leads_model__["b" /* FillInformation */]) === "function" ? _c : Object])
    ], FillInformationComponent);
    return FillInformationComponent;
}());

//# sourceMappingURL=fill-information.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/common-blocks/interested-property/interested-property.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".has-error{\n    color: red;\n    border-bottom: 1px solid red;\n}\nlabel{\n    /* color: brown; */\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/common-blocks/interested-property/interested-property.component.html":
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n  <div class=\"spacer30\"></div>\n  <div class=\"row\">\n     <div class=\"col-6\">\n        <p class=\"p16\">Interested Properties</p>\n     </div>\n   <div class=\"col-6\">\n        <div class=\"btn-cont text-right\">\n          <!-- add -->\n          <a style=\"display: none;\" class=\"btn btn-fourth\" #showPropertyModal href=\"javascript://\" data-toggle=\"modal\" data-target=\"#add-property-popup\">Add</a>\n          <a *ngIf=\"(sent_as==constant.userType.csr_buyer && (admin?.admin_acl['Buyer Lead Management']?.can_update==1 || admin?.permissions?.can_csr_buyer==1)) ||\n          sent_as==constant.userType.inhouse_broker && (admin?.admin_acl['Broker Lead Management']?.can_update==1 || admin?.permissions?.can_in_house_broker==1); else noAddPermission\" class=\"btn btn-fourth\" href=\"javascript://\" (click)=\"getCountries(lead_id)\">Add</a>\n          \n          <ng-template #noAddPermission>\n            <a class=\"btn btn-fourth\" href=\"javascript://\">Add</a>\n          </ng-template>\n\n          <!-- view  -->\n          <a style=\"display: none;\" data-toggle=\"modal\" #showInterestedProperty data-target=\"#view-all-property\" class=\"btn btn-fourth\" href=\"javascript://\">View All</a>\n          <a *ngIf=\"interested_properties?.length!=0\" class=\"btn btn-fourth\" href=\"javascript://\" (click)=\"viewProperties(interested_properties)\">View All</a>\n        </div>\n     </div>\n  </div>\n  \n  <div class=\"spacer15\"></div>\n  <div class=\"row\" *ngIf=\"interested_properties?.length>0\">\n    <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\" *ngFor=\"let data of interested_properties; let in=index\">\n\n    <div *ngIf=\"data.property.building && data && in<2\" class=\"project-des-bx white-bg\">\n      <div class=\"price\">{{data.property.min_price|thousand}}+</div>\n      <div class=\"fig-block\">\n        <img [src]=\"data.property.image\" onerror='src=\"assets/img/placeholder-img.png\"' alt=\"img\">\n      </div>\n      <div class=\"project-des-content\">\n        <small>{{data?.property?.building?.developer?.name}}</small>\n        <a routerLink=\"/dashboard/properties/details/{{data.property.id}}\">\n          <h5>{{data?.property?.building?.name.slice(0, 35)}}</h5>\n        </a>\n        <p class=\"p12\">{{data.property.building.address.slice(0, 90)}}</p>\n        <p class=\"p13\" *ngIf=\"data && data.property\">{{data.property.configuration.name}}, {{data.property.property_type.name}}</p>\n        <!-- <p class=\"p13\" title=\"Property Type\" *ngIf=\"data && data.property\">{{data.property.property_type.name}}</p> -->\n        <p class=\"p13\" title=\"Type\"><strong>{{data.property.for_sale == 1 ? 'Buy' : 'Rent'}}</strong></p>\n        <div class=\"dropdown threeDots\">\n          <button type=\"button\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n            ...\n          </button>\n          <div class=\"dropdown-menu\">\n            <a style=\"display: none;\" class=\"dropdown-item\" href=\"javascript://\" #modalOpen data-toggle=\"modal\" data-target=\"#dealFinalize\">Deal Finalized</a>\n            \n            <!-- deal finalised -->\n            <a *ngIf=\"!is_deal_finalised && sent_as==constant.userType.inhouse_broker && (admin?.admin_acl['Broker Lead Management']?.can_update==1 || admin?.permissions?.can_in_house_broker==1)\"\n              class=\"dropdown-item\" href=\"javascript://\" (click)=\"openModal(data.property.id, data.lead_id)\">Deal Finalized</a>\n            \n            <!-- Remove from in-property -->\n            <a *ngIf=\"(sent_as==constant.userType.csr_buyer && (admin?.admin_acl['Buyer Lead Management']?.can_update==1 || admin?.permissions?.can_csr_buyer==1)) ||\n            sent_as==constant.userType.inhouse_broker && (admin?.admin_acl['Broker Lead Management']?.can_update==1 || admin?.permissions?.can_in_house_broker==1); else noRemovePermission\"\n              class=\"dropdown-item\" (click)=\"deleteLeadInterestedProperty(data.property.id, data.lead_id, in)\">Remove Property</a>\n\n            <ng-template #noRemovePermission>\n              <a class=\"dropdown-item\">Remove Property</a>\n            </ng-template>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    </div>\n  </div>\n  <div *ngIf=\"interested_properties?.length == 0\">\n    <p class=\"show-not-found\">\n      {{constant.errorMsg.NO_INTERESTED_PROPERTY_FOUND}}\n    </p>\n  </div>\n\n\n\n<!-- add property to interested_properties -->\n<div class=\"modal\" id=\"add-property-popup\">\n  <div class=\"modal-dialog modal-lg\">\n    <div class=\"modal-content notary-avail\">\n        <div class=\"modal-header popup-header\">\n          <h4 class=\"modal-title\">Properties available</h4>\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #hidePropertyModal>&times;</button>\n        </div>\n        <div class=\"modal-body\">\n            <div class=\"row\">\n              <div class=\"col-md-3\">\n                <div class=\"form-group\">\n                <label>Country</label>\n                <select class=\"form-control\" (change)=\"onCountryChange($event.target.value)\">\n                    <option value=\"0\">All</option>\n                    <option *ngFor=\"let item of location.countries\" [value]=\"item.id\">{{item.name}}</option>\n                </select>\n                </div>\n            </div>\n            <div class=\"col-md-3\">\n                <div class=\"form-group\">\n                <label>State</label>\n                <select class=\"form-control\" (change)=\"onStateChange($event.target.value)\">\n                    <option value=\"0\">All</option>\n                    <option *ngFor=\"let item of location.states\" [value]=\"item.id\">{{item.name}}</option>\n                </select>\n                </div>\n            </div>\n            <div class=\"col-md-3\">\n                <div class=\"form-group\">\n                <label>City</label>\n                    <select class=\"form-control\" (change)=\"onCityChange($event.target.value)\">\n                    <option value=\"0\">All</option>\n                    <option *ngFor=\"let item of location.cities\" [value]=\"item.id\">{{item.name}}</option>\n                    </select>\n                </div>\n            </div>\n            <div class=\"col-md-3\">\n                <div class=\"form-group\">\n                <label>Locality</label>\n                <select class=\"form-control\" (change)=\"onLocalityChange($event.target.value)\">\n                    <option value=\"0\">All</option>\n                    <option *ngFor=\"let item of location.localities\" [value]=\"item.id\">{{item.name}}</option>\n                </select>\n                </div>\n            </div>\n            </div>\n\n            <div class=\"row\">\n              <div class=\"col-md-3\">\n                <div class=\"form-group btn-cont\">\n                <button class=\"btn btn-primary\" (click)=\"propertySearch()\">View Properties</button>\n                </div>\n              </div>\n              <div class=\"col-md-9 pull-right\">\n                <pagination-controls *ngIf=\"parameter.total>constant.p\" class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n              </div>\n              <!-- <div class=\"col-md-3\">\n                  <div class=\"form-group btn-cont\">\n                  <button class=\"btn btn-primary\" (click)=\"addPropertyToInterest()\">Add Properties</button>\n                  </div>\n              </div> -->\n            </div>\n\n            <table class=\"table\" *ngIf=\"parameter?.items?.length!=0\">\n              <tbody>\n                <tr *ngFor=\"let item of parameter.items| paginate: { id:'page1', itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: parameter.total }; let i=index\">\n                  <td>\n                      <div class=\"n-avail-profile\">\n                        <img [src]=\"item.image\" onerror='src=\"assets/img/house.png\"' alt=\"img\">\n                        <div class=\"n-avail-info\">\n                            <p class=\"p12\">{{item.building.name}}</p>\n                            <p class=\"p10 marginB0\">{{item.building.address ? item.building.address : 'NA'}}</p>\n                            <p class=\"p10\">{{item.configuration.name}}</p>\n                        </div>\n                      </div>\n                  </td>\n                  <td>\n                      <!-- <label class=\"cust-check-bx float-right\">\n                      <input type=\"radio\" name=\"bank_id1\" (click)=\"addLeadInterestedProperty(item.id)\">\n                      <span class=\"checkmark\"></span>\n                      </label> -->\n                      <label class=\"cust-check-bx float-right\">\n                        <input [checked]=\"item.checked == true ? 'checked': ''\" type=\"checkbox\" name=\"bank_id1\" (click)=\"addLeadInterestedProperty(item.id)\">\n                        <span class=\"checkmark\"></span>\n                      </label>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n            <div *ngIf=\"parameter?.items?.length==0 && parameter.noResultFound\">\n              <p class=\"show-not-found\">No property found for selected filters.</p>\n            </div>\n            <div *ngIf=\"!parameter.noResultFound && parameter?.items?.length==0\">\n              <p class=\"show-not-found\">Select filters to view properties.</p>\n            </div>\n\n            <div *ngIf=\"property_ids.length>0\" class=\"row pull-right\">\n              <div class=\"form-group btn-cont\">\n              <button class=\"btn btn-primary\" (click)=\"addPropertyToInterest()\">Add Properties</button>\n              </div>\n            </div>\n        </div>\n    </div> \n  </div>\n</div>\n  \n<!-- deal finalize modal -->\n<div class=\"modal animated\" id=\"dealFinalize\">\n  <div class=\"modal-dialog fadeIndown\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n          <button style=\"display: none;\" type=\"button\" class=\"close\" data-dismiss=\"modal\" #modalClose>&times;</button>\n          <button type=\"button\" class=\"close\" (click)=\"closeModal()\">&times;</button>\n      </div>\n\n      <form class=\"form-horizontal form-model0P\" role=\"form\" ngNativeValidate #addForm=\"ngForm\" (ngSubmit)=\"attachProperty(addForm)\">\n        <div class=\"modal-body\">\n          <div class=\"row\">\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                  <label for=\"token_amount\">Amount to be paid by user</label>\n                  <div class=\"form-group\">\n                  <input id=\"token_amount\" #token_amount=ngModel autocomplete=\"off\" name=\"token_amount\" [(ngModel)]=\"model.token_amount\" type=\"number\" class=\"form-control\" required>\n                </div>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                  <label>Commission (in %)</label>\n                  <div class=\"form-group\">\n                    <input autocomplete=\"off\" min=\"0\" max=\"100\" type=\"number\" name=\"commision\" [(ngModel)]=\"model.commision\" class=\"form-control\" required>\n                </div>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                  <label>Total Amount</label>\n                  <div class=\"form-group\">\n                    <input autocomplete=\"off\" name=\"total_amount\" [(ngModel)]=\"model.total_amount\" type=\"number\" class=\"form-control\" required>\n                </div>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"spacer40\"></div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"btn-cont text-right\">\n                  <button style=\"width: 100%;\" type=\"submit\" class=\"btn btn-primary\">Finalize Deal</button>\n              </div>\n            </div>\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n</div>\n\n\n<!-- show interested_properties -->\n<div class=\"modal\" id=\"view-all-property\">\n  <div class=\"modal-dialog  modal-lg\">\n     <div class=\"modal-content\">\n        <div class=\"modal-header\">\n           <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n        </div>\n        <div class=\"modal-body\">\n          <h3>Interested Properties</h3>\n          <hr>\n          <div class=\"scrollbox fav-prop\">\n            <div class=\"row\">\n              <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\" *ngFor=\"let x of parameter.interested_properties| paginate: { id: 'page2', itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page2, totalItems: parameter.total2 }; let in=index\">\n                  <div class=\"project-des-bx white-bg-2\">\n                      <div class=\"price\">{{x.property.min_price|thousand}}+</div>\n                    <div class=\"fig-block\">\n                        <img [src]=\"x.property.image\" onerror='src=\"assets/img/bank.png\"' alt=\"img\">\n                    </div>\n                    <div class=\"project-des-content\">\n                        <small>{{x.property.building.developer.name}}</small>\n                        <a routerLink=\"/dashboard/properties/details/{{x.property.id}}\">\n                          <h5>{{x.property.building.name.slice(0, 15)}}</h5>\n                        </a>\n                        <p class=\"p12\">{{x.property.building.address.slice(0, 45)}}</p>\n                        <p class=\"p13\" *ngIf=\"x && x.property\">{{x.property.configuration.name}}, {{x.property.property_type.name}}</p>\n                        <!-- <p class=\"p13\" *ngIf=\"!x && !x.property\">NA</p>\n                        <p class=\"p13\" *ngIf=\"x && x.property\">{{x.property.property_type.name}}</p> -->\n                        <p class=\"p13\" *ngIf=\"x && x.property\">{{x.property.for_sale==1 ? 'Buy' : 'Rent'}}</p>\n                        <div class=\"dropdown threeDots\">\n                          <button type=\"button\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n                            ...\n                          </button>\n                          <div class=\"dropdown-menu\">\n                            <a style=\"display: none;\" *ngIf=\"sent_as==2\" class=\"dropdown-item\" href=\"javascript://\" #modalOpen data-toggle=\"modal\" data-target=\"#dealFinalize\">Deal Finalized</a>\n                            <!-- dela finalised -->\n                            <a *ngIf=\"!is_deal_finalised && sent_as==constant.userType.inhouse_broker && (admin?.admin_acl['Broker Lead Management']?.can_update==1 || admin?.permissions?.can_in_house_broker==1)\"\n                              class=\"dropdown-item\" href=\"javascript://\" (click)=\"openModal(x.property.id, x.lead_id)\">Deal Finalized</a>\n                            \n                            <!-- remove -->\n                              <a *ngIf=\"(sent_as==constant.userType.csr_buyer && (admin?.admin_acl['Buyer Lead Management']?.can_update==1 || admin?.permissions?.can_csr_buyer==1)) ||\n                            sent_as==constant.userType.inhouse_broker && (admin?.admin_acl['Broker Lead Management']?.can_update==1 || admin?.permissions?.can_in_house_broker==1); else noRemovePermission\"\n                              class=\"dropdown-item\" (click)=\"deleteLeadInterestedProperty(x.property.id, x.lead_id, in)\">Remove Property</a>\n                \n                            <ng-template #noRemovePermission>\n                              <a class=\"dropdown-item\">Remove Property</a>\n                            </ng-template>\n                          </div>\n                        </div>\n                    </div>\n                  </div>\n              </div>\n\n            </div>\n\n            <pagination-controls *ngIf=\"parameter.total2>constant.p\" class=\"my-pagination\" (pageChange)=\"getPage2($event)\"></pagination-controls>\n\n          </div>\n        </div>\n     </div>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/layout/common-blocks/interested-property/interested-property.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_leads_model__ = __webpack_require__("../../../../../src/app/models/leads.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_events__ = __webpack_require__("../../../../events/events.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_events___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_events__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InterestedPropertyComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var InterestedPropertyComponent = /** @class */ (function () {
    function InterestedPropertyComponent(model, admin, constant) {
        this.model = model;
        this.admin = admin;
        this.constant = constant;
        this.deal_finalised_success = new __WEBPACK_IMPORTED_MODULE_4_events__["EventEmitter"]();
        this.parameter = {};
        this.location = {};
        this.property_ids = [];
    }
    InterestedPropertyComponent.prototype.ngOnInit = function () {
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        this.parameter.page2 = this.constant.p;
        this.parameter.total = 0;
    };
    InterestedPropertyComponent.prototype.openModal = function (property_id, lead_id) {
        this.model.property_id = property_id;
        this.model.lead_id = lead_id;
        this.modalOpen.nativeElement.click();
    };
    InterestedPropertyComponent.prototype.closeModal = function () {
        this.modalClose.nativeElement.click();
    };
    InterestedPropertyComponent.prototype.getPage = function (page) {
        this.parameter.page = page;
        this.propertySearch();
    };
    InterestedPropertyComponent.prototype.getPage2 = function (page) {
        this.parameter.page2 = page;
        this.viewProperties('');
    };
    InterestedPropertyComponent.prototype.attachProperty = function (formdata) {
        var _this = this;
        if (this.model.total_amount < this.model.token_amount) {
            swal('Error', 'Total amount must be greater than token amount.', 'error');
            return false;
        }
        this.modalClose.nativeElement.click();
        this.parameter.loading = true;
        this.admin.postDataApi('leads/attach-property', this.model)
            .subscribe(function (success) {
            formdata.reset();
            _this.parameter.loading = false;
            _this.is_deal_finalised = true;
            _this.modalClose.nativeElement.click();
            swal('Success', 'Deal has been finalized successfully.', 'success');
            _this.deal_finalised_success.emit('true');
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    InterestedPropertyComponent.prototype.deleteLeadInterestedProperty = function (property_id, lead_id, index) {
        var _this = this;
        var test = this.selected_properties.map(function (i) { return i.property_id === property_id; });
        if (test[0]) {
            swal('Error', 'You cannot remove this property as this is finalized property.', 'error');
        }
        else {
            swal({
                html: this.constant.title.ARE_YOU_SURE + '<br>' + 'You want to remove this property?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: this.constant.confirmButtonColor,
                cancelButtonColor: this.constant.cancelButtonColor,
                confirmButtonText: 'Yes'
            }).then(function (result) {
                if (result.value) {
                    var input = { property_id: property_id, lead_id: _this.lead_id };
                    _this.admin.postDataApi('leads/deleteLeadInterestedProperty', { property_id: [property_id], lead_id: lead_id })
                        .subscribe(function (success) {
                        _this.parameter.interested_properties.splice(index, 1);
                        _this.interested_properties = _this.parameter.interested_properties;
                        swal('Success', 'Interested property removed successfully.', 'success');
                    });
                }
            });
        }
    };
    InterestedPropertyComponent.prototype.showModal = function () {
        this.showPropertyModal.nativeElement.click();
    };
    InterestedPropertyComponent.prototype.addLeadInterestedProperty = function (property_id) {
        var ids = this.interested_properties.map(function (d) { return d.property.id; });
        var ff = ids.filter(function (p) { return p === property_id; });
        console.log(property_id, ids, ff);
        if (ff.length !== 0) {
            swal('Error', 'This property is already added in your interests.', 'error');
        }
        else {
            var check_id = this.property_ids.indexOf(property_id);
            if (check_id === -1) {
                this.property_ids.push(property_id);
            }
            else {
                this.property_ids.splice(check_id, 1);
            }
        }
    };
    InterestedPropertyComponent.prototype.addPropertyToInterest = function () {
        var _this = this;
        console.log(this.property_ids);
        if (this.property_ids.length > 0) {
            swal({
                html: this.constant.title.ARE_YOU_SURE + '<br>' + 'You want to add selected properties to your interested properties?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: this.constant.confirmButtonColor,
                cancelButtonColor: this.constant.cancelButtonColor,
                confirmButtonText: 'Yes'
            }).then(function (result) {
                if (result.value) {
                    var input = { property_id: _this.property_ids, lead_id: _this.parameter.lead_id };
                    _this.admin.postDataApi('leads/addLeadInterestedProperty', input).subscribe(function (r) {
                        _this.showPropertyModal.nativeElement.click();
                        _this.property_ids = [];
                        swal('Success', 'Added Successfully', 'success');
                        _this.interested_properties.push(r.data);
                    });
                }
            });
        }
        else {
            swal('Error', 'Please choose any property.', 'error');
        }
    };
    InterestedPropertyComponent.prototype.checkIfAlreadyExist = function () {
        var ids = this.interested_properties.map(function (d) { return d.property.id; });
        // const ff = ids.filter(p => p === property_id);
    };
    InterestedPropertyComponent.prototype.checkIfExist = function (id) {
        return this.selected_properties.find(function (i) { return i.property_id === id; });
    };
    InterestedPropertyComponent.prototype.viewProperties = function (data) {
        var _this = this;
        // this.parameter.interested_properties = data;
        this.parameter.loading = true;
        this.admin.postDataApi('leads/getLeadInterestedProperty', { lead_id: this.lead_id, page: this.parameter.page2 }).subscribe(function (r) {
            _this.parameter.loading = false;
            console.log('Country', r);
            _this.parameter.interested_properties = r['data'];
            _this.parameter.total2 = r.total;
            _this.showInterestedProperty.nativeElement.click();
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    InterestedPropertyComponent.prototype.getCountries = function (lead_id) {
        var _this = this;
        this.location.cities = [];
        this.parameter.city_id = '0';
        this.location.localities = [];
        this.parameter.locality_id = '0';
        this.location.states = [];
        this.parameter.state_id = '0';
        this.parameter.items = [];
        this.parameter.total = 0;
        this.parameter.noResultFound = false;
        this.parameter.lead_id = lead_id;
        this.showPropertyModal.nativeElement.click();
        this.admin.postDataApi('getCountryLocality', {}).subscribe(function (r) {
            console.log('Country', r);
            _this.location.countries = r['data'];
        });
    };
    InterestedPropertyComponent.prototype.onCountryChange = function (id) {
        this.location.states = [];
        this.parameter.state_id = '0';
        this.location.cities = [];
        this.parameter.city_id = '0';
        this.location.localities = [];
        this.parameter.locality_id = '0';
        if (!id || id.toString() === '0') {
            this.parameter.state_id = '0';
            return false;
        }
        this.parameter.country_id = id;
        var selectedCountry = this.location.countries.filter(function (x) { return x.id.toString() === id; });
        console.log(selectedCountry);
        this.location.states = selectedCountry[0].states;
    };
    InterestedPropertyComponent.prototype.onStateChange = function (id) {
        console.log(id);
        this.location.cities = [];
        this.parameter.city_id = '0';
        this.location.localities = [];
        this.parameter.locality_id = '0';
        if (!id || id.toString() === '0') {
            this.parameter.city_id = '0';
            return false;
        }
        this.parameter.state_id = id;
        var selectedState = this.location.states.filter(function (x) { return x.id.toString() === id; });
        this.location.cities = selectedState[0].cities;
    };
    InterestedPropertyComponent.prototype.onCityChange = function (id) {
        console.log(id);
        this.location.localities = [];
        this.parameter.locality_id = '0';
        if (!id || id.toString() === '0') {
            this.parameter.locality_id = '0';
            return false;
        }
        this.parameter.city_id = id;
        var selectedCountry = this.location.cities.filter(function (x) { return x.id.toString() === id; });
        this.location.localities = selectedCountry[0].localities;
    };
    InterestedPropertyComponent.prototype.onLocalityChange = function (id) {
        console.log(id);
        if (!id || id.toString() === '0') {
            return false;
        }
        this.parameter.locality_id = id;
    };
    InterestedPropertyComponent.prototype.propertySearch = function () {
        var _this = this;
        this.admin.postDataApi('propertySearch', this.parameter).subscribe(function (r) {
            _this.parameter.items = r.data;
            if (_this.property_ids.length > 0) {
                _this.parameter.items.forEach(function (element) {
                    var check_id = _this.property_ids.indexOf(element.id);
                    if (check_id !== -1) {
                        element.checked = true;
                    }
                });
            }
            _this.parameter.total = r.total;
            if (_this.parameter.items.length <= 0) {
                _this.parameter.noResultFound = true;
            }
        });
    };
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], InterestedPropertyComponent.prototype, "deal_finalised_success", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('data'),
        __metadata("design:type", Object)
    ], InterestedPropertyComponent.prototype, "data", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('lead_id'),
        __metadata("design:type", Object)
    ], InterestedPropertyComponent.prototype, "lead_id", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('sent_as'),
        __metadata("design:type", Object)
    ], InterestedPropertyComponent.prototype, "sent_as", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('interested_properties'),
        __metadata("design:type", Object)
    ], InterestedPropertyComponent.prototype, "interested_properties", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('selected_properties'),
        __metadata("design:type", Object)
    ], InterestedPropertyComponent.prototype, "selected_properties", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('is_deal_finalised'),
        __metadata("design:type", Object)
    ], InterestedPropertyComponent.prototype, "is_deal_finalised", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('modalOpen'),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _a : Object)
    ], InterestedPropertyComponent.prototype, "modalOpen", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('modalClose'),
        __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _b : Object)
    ], InterestedPropertyComponent.prototype, "modalClose", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('showPropertyModal'),
        __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _c : Object)
    ], InterestedPropertyComponent.prototype, "showPropertyModal", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('hidePropertyModal'),
        __metadata("design:type", typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _d : Object)
    ], InterestedPropertyComponent.prototype, "hidePropertyModal", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('showInterestedProperty'),
        __metadata("design:type", typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _e : Object)
    ], InterestedPropertyComponent.prototype, "showInterestedProperty", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('hideInterestedProperty'),
        __metadata("design:type", typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _f : Object)
    ], InterestedPropertyComponent.prototype, "hideInterestedProperty", void 0);
    InterestedPropertyComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-interested-property',
            template: __webpack_require__("../../../../../src/app/layout/common-blocks/interested-property/interested-property.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/common-blocks/interested-property/interested-property.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_1__models_leads_model__["c" /* DealFinalize */]]
        }),
        __metadata("design:paramtypes", [typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1__models_leads_model__["c" /* DealFinalize */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__models_leads_model__["c" /* DealFinalize */]) === "function" ? _g : Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */]) === "function" ? _h : Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_3__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__common_constants__["a" /* Constant */]) === "function" ? _j : Object])
    ], InterestedPropertyComponent);
    return InterestedPropertyComponent;
}());

//# sourceMappingURL=interested-property.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/common-blocks/viewed-projects/viewed-projects.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/common-blocks/viewed-projects/viewed-projects.component.html":
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<div class=\"spacer30\"></div>\n<div class=\"row\">\n   <div class=\"col-6\">\n      <p class=\"p16\">Viewed Projects</p>\n   </div>\n <div class=\"col-6\">\n      <div class=\"btn-cont text-right\">\n        <a style=\"display: none;\" data-toggle=\"modal\" #showProjectModal data-target=\"#view-viewed-projects\" class=\"btn btn-fourth\" href=\"javascript://\">View All</a>\n        <a *ngIf=\"viewed_projects?.length!=0\" class=\"btn btn-fourth\" href=\"javascript://\" (click)=\"viewProjects(viewed_properties, user_id)\">View All</a>\n      </div>\n   </div>\n</div>\n\n<div class=\"spacer15\"></div>\n<div class=\"row\" *ngIf=\"viewed_projects?.length>0\">\n  <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\" *ngFor=\"let data of viewed_projects; let in=index\">\n\n  <div *ngIf=\"data && in<2\" class=\"project-des-bx white-bg\">\n    <div class=\"price\">{{data.starting_price|thousand}}+</div>\n    <div class=\"fig-block\">\n      <img [src]=\"data.main_image\" onerror='src=\"assets/img/placeholder-img.png\"' alt=\"img\">\n    </div>\n    <div class=\"project-des-content\">\n      <small>{{data?.developer?.name}}</small>\n      <a routerLink=\"/dashboard/projects/details/{{data.id}}\">\n      <h5>{{data.name.slice(0, 35)}}</h5>\n      </a>\n      <p class=\"p12\">{{data.address.slice(0, 90)}}</p>\n\n      <p class=\"p13\" *ngIf=\"data.configurations\">\n          <span *ngFor=\"let conf of data.configurations; let ii=index\">\n              {{conf.config.name}}<span *ngIf=\"ii<data?.configurations?.length-1\">,</span>\n          </span><span *ngIf=\"data.configurations?.length==0\">NA</span>\n      </p>\n      <!-- <p class=\"p13\" title=\"Type\"><strong>{{data.for_sale == 1 ? 'Buy' : 'Rent'}}</strong></p> -->\n    </div>\n  </div>\n\n  </div>\n</div>\n<div *ngIf=\"viewed_projects?.length == 0\">\n  <p class=\"show-not-found\">\n    {{constant.errorMsg.NO_VIEWED_PROPERTY_FOUND}}\n  </p>\n</div>\n\n\n<!-- show viewed_projects -->\n<div class=\"modal\" id=\"view-viewed-projects\">\n  <div class=\"modal-dialog  modal-lg\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n        </div>\n        <div class=\"modal-body\">\n          <h3>Viewed Projects</h3>\n          <hr>\n          <div class=\"scrollbox fav-prop\">\n            <div class=\"row\">\n              <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\" *ngFor=\"let x of parameter.viewed_projects\">\n                  <div class=\"project-des-bx white-bg-2\">\n                      <div class=\"price\">{{x.starting_price|thousand}}+</div>\n                    <div class=\"fig-block\">\n                        <img [src]=\"x.main_image\" onerror='src=\"assets/img/bank.png\"' alt=\"img\">\n                    </div>\n                    <div class=\"project-des-content\">\n                        <small>{{x.developer.name}}</small>\n                        <a routerLink=\"/dashboard/projects/details/{{x.id}}\">\n                          <h5>{{x.name.slice(0, 15)}}</h5>\n                        </a>\n                        <p class=\"p12\">{{x.address.slice(0, 45)}}</p>\n                        <p class=\"p13\">\n                            <span *ngFor=\"let conf of x.configurations; let ii=index\">\n                                {{conf.config.name}}<span *ngIf=\"ii<x?.configurations?.length-1\">,</span>\n                            </span>\n                            <span *ngIf=\"x.configurations?.length==0\">NA</span>\n                        </p>\n                        <!-- <p class=\"p13\" *ngIf=\"x\">{{x.for_sale==1 ? 'Buy' : 'Rent'}}</p> -->\n                    </div>\n                  </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/layout/common-blocks/viewed-projects/viewed-projects.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewedProjectsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ViewedProjectsComponent = /** @class */ (function () {
    function ViewedProjectsComponent(constant, admin) {
        this.constant = constant;
        this.admin = admin;
        this.parameter = {};
    }
    ViewedProjectsComponent.prototype.ngOnInit = function () {
        this.parameter.page = this.constant.p;
        // console.log('ip', this.viewed_projects);
    };
    ViewedProjectsComponent.prototype.viewProjects = function (data, user_id) {
        var _this = this;
        // this.parameter.viewed_projects = data;
        // this.showProjectModal.nativeElement.click();
        this.parameter.loading = true;
        this.admin.postDataApi('leads/viewedProjects', { user_id: user_id, page: this.parameter.page }).subscribe(function (r) {
            _this.parameter.loading = false;
            _this.parameter.viewed_projects = r.data;
            console.log('Country', _this.parameter.viewed_projects);
            _this.showProjectModal.nativeElement.click();
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    var _a, _b, _c;
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('viewed_projects'),
        __metadata("design:type", Object)
    ], ViewedProjectsComponent.prototype, "viewed_projects", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('user_id'),
        __metadata("design:type", Object)
    ], ViewedProjectsComponent.prototype, "user_id", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('showProjectModal'),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _a : Object)
    ], ViewedProjectsComponent.prototype, "showProjectModal", void 0);
    ViewedProjectsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-viewed-projects',
            template: __webpack_require__("../../../../../src/app/layout/common-blocks/viewed-projects/viewed-projects.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/common-blocks/viewed-projects/viewed-projects.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__common_constants__["a" /* Constant */]) === "function" ? _b : Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */]) === "function" ? _c : Object])
    ], ViewedProjectsComponent);
    return ViewedProjectsComponent;
}());

//# sourceMappingURL=viewed-projects.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/common-blocks/viewed-property/viewed-property.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".has-error{\n    color: red;\n    border-bottom: 1px solid red;\n}\nlabel{\n    /* color: brown; */\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/common-blocks/viewed-property/viewed-property.component.html":
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<div class=\"spacer30\"></div>\n<div class=\"row\">\n   <div class=\"col-6\">\n      <p class=\"p16\">Viewed Properties</p>\n   </div>\n <div class=\"col-6\">\n      <div class=\"btn-cont text-right\">\n        <a style=\"display: none;\" data-toggle=\"modal\" #showPropertyModal data-target=\"#view-viewed-property\" class=\"btn btn-fourth\" href=\"javascript://\">View All</a>\n        <a *ngIf=\"viewed_properties?.length!=0\" class=\"btn btn-fourth\" href=\"javascript://\" (click)=\"viewProperties(viewed_properties, user_id)\">View All</a>\n      </div>\n   </div>\n</div>\n\n<div class=\"spacer15\"></div>\n<div class=\"row\" *ngIf=\"viewed_properties?.length>0\">\n  <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\" *ngFor=\"let data of viewed_properties; let in=index\">\n\n  <div *ngIf=\"data.building && data && in<2\" class=\"project-des-bx white-bg\">\n    <div class=\"price\">{{data.min_price|thousand}}+</div>\n    <div class=\"fig-block\">\n      <img [src]=\"data.image\" onerror='src=\"assets/img/placeholder-img.png\"' alt=\"img\">\n    </div>\n    <div class=\"project-des-content\">\n      <small>{{data?.building?.developer?.name}}</small>\n      <a routerLink=\"/dashboard/properties/details/{{data.id}}\">\n      <h5>{{data.building.name.slice(0, 35)}}</h5>\n      </a>\n      <p class=\"p12\">{{data.building.address.slice(0, 90)}}</p>\n\n      <p class=\"p13\" *ngIf=\"data\">{{data.configuration.name}}, {{data.property_type.name}}</p>\n      <!-- <p class=\"p13\" title=\"Configuration\" *ngIf=\"!data\">NA</p> -->\n      <!-- <p class=\"p13\" title=\"Property Type\" *ngIf=\"data\">{{data.property_type.name}}</p> -->\n      <p class=\"p13\" title=\"Type\"><strong>{{data.for_sale == 1 ? 'Buy' : 'Rent'}}</strong></p>\n    </div>\n  </div>\n\n  </div>\n</div>\n<div *ngIf=\"viewed_properties?.length == 0\">\n  <p class=\"show-not-found\">\n    {{constant.errorMsg.NO_VIEWED_PROPERTY_FOUND}}\n  </p>\n</div>\n\n\n<!-- show viewed_properties -->\n<div class=\"modal\" id=\"view-viewed-property\">\n  <div class=\"modal-dialog  modal-lg\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n        </div>\n        <div class=\"modal-body\">\n          <h3>Viewed Properties</h3>\n          <hr>\n          <div class=\"scrollbox fav-prop\">\n            <div class=\"row\">\n              <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\" *ngFor=\"let x of parameter.viewed_properties\">\n                  <div class=\"project-des-bx white-bg-2\">\n                      <div class=\"price\">{{x.min_price|thousand}}+</div>\n                    <div class=\"fig-block\">\n                        <img [src]=\"x.image\" onerror='src=\"assets/img/bank.png\"' alt=\"img\">\n                    </div>\n                    <div class=\"project-des-content\">\n                        <small>{{x.building.developer.name}}</small>\n                        <a routerLink=\"/dashboard/properties/details/{{x.id}}\">\n                          <h5>{{x.building.name.slice(0, 15)}}</h5>\n                        </a>\n                        <p class=\"p12\">{{x.building.address.slice(0, 45)}}</p>\n                        <p class=\"p13\" *ngIf=\"x\">{{x.configuration.name}}, {{x.property_type.name}}</p>\n                        <!-- <p class=\"p13\" *ngIf=\"!x\">NA</p>\n                        <p class=\"p13\" *ngIf=\"x\">{{x.property_type.name}}</p> -->\n                        <p class=\"p13\" *ngIf=\"x\">{{x.for_sale==1 ? 'Buy' : 'Rent'}}</p>\n                    </div>\n                  </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/layout/common-blocks/viewed-property/viewed-property.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewedPropertyComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ViewedPropertyComponent = /** @class */ (function () {
    function ViewedPropertyComponent(constant, admin) {
        this.constant = constant;
        this.admin = admin;
        this.parameter = {};
    }
    ViewedPropertyComponent.prototype.ngOnInit = function () {
        this.parameter.page = this.constant.p;
        // console.log('ip', this.viewed_properties);
    };
    ViewedPropertyComponent.prototype.viewProperties = function (data, user_id) {
        var _this = this;
        // this.parameter.viewed_properties = data;
        // this.showPropertyModal.nativeElement.click();
        this.parameter.loading = true;
        this.admin.postDataApi('leads/viewedProperties', { user_id: user_id, page: this.parameter.page }).subscribe(function (r) {
            _this.parameter.loading = false;
            _this.parameter.viewed_properties = r.data;
            console.log('Country', _this.parameter.viewed_properties);
            _this.showPropertyModal.nativeElement.click();
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    var _a, _b, _c;
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('viewed_properties'),
        __metadata("design:type", Object)
    ], ViewedPropertyComponent.prototype, "viewed_properties", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('user_id'),
        __metadata("design:type", Object)
    ], ViewedPropertyComponent.prototype, "user_id", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('showPropertyModal'),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _a : Object)
    ], ViewedPropertyComponent.prototype, "showPropertyModal", void 0);
    ViewedPropertyComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-viewed-property',
            template: __webpack_require__("../../../../../src/app/layout/common-blocks/viewed-property/viewed-property.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/common-blocks/viewed-property/viewed-property.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__common_constants__["a" /* Constant */]) === "function" ? _b : Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */]) === "function" ? _c : Object])
    ], ViewedPropertyComponent);
    return ViewedPropertyComponent;
}());

//# sourceMappingURL=viewed-property.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/leads/csr-buyer/csr-buyer-detail/csr-buyer-detail.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/leads/csr-buyer/csr-buyer-detail/csr-buyer-detail.component.html":
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<div class=\"container-fluid\">\n  <div class=\"white-bg padding15\">\n     <div class=\"row\">\n         <div class=\"col-lg-3 col-md-12 col-sm-12 col-12\">\n           <div class=\"df-profile\">\n              <a routerLink=\"../\"><i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i></a>\n              <img [src]=\"parameter?.lead?.user?.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\">\n              <div class=\"df-info\">\n                  <p class=\"p14\">{{parameter?.lead?.user?.name ? parameter?.lead?.user?.name : parameter?.lead?.name}}</p>\n                  <p class=\"p12\">\n                    {{parameter?.lead?.user?.dial_code ? parameter?.lead?.user?.dial_code : parameter?.lead?.dial_code}}-{{parameter?.lead?.user?.phone ? parameter?.lead?.user?.phone : parameter?.lead?.phone}}\n                  </p>\n              </div>\n            </div>\n        </div>\n        <div class=\"col-lg-6 col-md-12 col-sm-6 col-12\">\n            <div class=\"profile-list\">\n            <ul>\n                <li>\n                    <div class=\"df-info\">\n                        <p class=\"p14 marginB0\" *ngIf=\"parameter.lead?.admin\">{{parameter.lead.admin.name}}</p>\n                        <p class=\"p12\">CSR Buyer</p>\n                    </div>\n                </li>\n                <li>\n                    <div class=\"df-info\" *ngIf=\"parameter.lead?.broker\">\n                        <p class=\"p14 marginB0\">{{parameter.lead.broker.name}}</p>\n                        <p class=\"p12\">Inhouse Broker</p>\n                    </div>\n                </li>\n            </ul>\n            </div>\n        </div>\n        \n        <div class=\"col-lg-3 col-md-12 col-sm-12 col-12\" *ngIf=\"admin?.admin_acl['Buyer Lead Management']?.can_update==1 || admin?.permissions?.can_csr_buyer==1\">\n           <div *ngIf=\"!parameter.lead?.broker && parameter.lead?.user && (admin?.admin_acl['Buyer Lead Management']?.can_update==1 || admin?.permissions?.can_csr_buyer==1)\" class=\"form-group d-flex marginT10 float-right right-side\">\n             <div class=\"dropdown btn-cont\">\n              <a (click)=\"assignToBroker()\" class=\"btn btn-primary\" href=\"javascript://\">Assign to broker</a>\n              <!-- <button type=\"button\" class=\"btn btn-primary dropdown-toggle\" data-toggle=\"dropdown\">\n                 Action\n               </button>\n               <div class=\"dropdown-menu dropdown-menu-right\">\n                 <a (click)=\"assignToBroker()\" *ngIf=\"!parameter.lead?.broker && parameter.lead?.user\" class=\"dropdown-item\" href=\"javascript://\">Assign to broker</a>\n                 <a (click)=\"blockThisLead()\" class=\"dropdown-item\" href=\"javascript://\">Block</a>\n               </div> -->\n            </div>\n           </div>\n           <div *ngIf=\"is_deal_finalised\" class=\"row\">\n              <div class=\"col-sm-7 btn-cont text-right\">\n                  <a style=\"cursor: auto;\" class=\"btn btn-fourth\" href=\"javascript://\">Deal Finalized</a>\n              </div>\n          </div>\n        </div>\n     </div>\n\n  </div>\n  <!-- <ngx-loading [show]=\"parameter.loading\"></ngx-loading> -->\n  <div class=\"spacer30\"></div>\n  <div class=\"row\">\n     <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\">\n        <div class=\"white-bg padding30\">\n\n           <div class=\"row\">\n              <div class=\"col-md-6\">\n                 <h6>Details</h6>\n              </div>\n              <!-- <div class=\"col-md-6\">\n                 <div class=\"edit text-right\"><a href=\"javascript://\">Edit</a></div>\n              </div> -->\n           </div>\n           <div class=\"details-table\">\n             <table class=\"table\">\n                <tbody><tr>\n                   <td style=\"padding-left:0\"><label>Full Name</label></td>\n                   <td *ngIf=\"parameter.lead?.name\">{{parameter?.lead?.user?.name ? parameter?.lead?.user?.name : parameter?.lead?.name}}</td>\n                </tr>\n                <tr>\n                   <td style=\"padding-left:0\"><label>Contact Number</label></td>\n                   <td *ngIf=\"parameter?.lead?.phone\">{{parameter?.lead?.user?.dial_code ? parameter?.lead?.user?.dial_code : parameter?.lead?.dial_code}} - {{parameter?.lead?.user?.phone ? parameter?.lead?.user?.phone : parameter?.lead?.phone}}</td>\n                </tr>\n                <tr>\n                   <td style=\"padding-left:0\"><label>Email address</label></td>\n                   <td *ngIf=\"parameter?.lead?.email\">{{parameter?.lead?.user?.email ? parameter?.lead?.user?.email : parameter?.lead?.email}}</td>\n                </tr>\n                <tr>\n                   <td style=\"padding-left:0\"><label>Interested In</label></td>\n                   <td *ngIf=\"parameter.lead?.configuration\">\n                     <span *ngFor=\"let conf of parameter.lead.configuration; let ii=index\">\n                       {{conf.name}}<span *ngIf=\"ii<parameter?.lead?.configuration?.length-1\">,</span>\n                     </span>\n                     <span *ngIf=\"parameter.lead.configuration?.length==0\">NA</span>\n                   </td>\n                </tr>\n                <tr>\n                   <td style=\"padding-left:0\"><label>Favorite Properties</label></td>\n                   <td>{{parameter.favorites?.length}} \n                      <a style=\"display: none;\" data-toggle=\"modal\" #showPropertyModal data-target=\"#view-fav-property\" class=\"view-all\" href=\"javascript://\">View All</a>\n                      <a *ngIf=\"parameter.favorites?.length!=0\" class=\"view-all\" href=\"javascript://\" (click)=\"viewFavProperties()\">View All</a>\n                    </td>\n                </tr>\n\n                <!-- Meeting Schedule -->\n                <tr *ngIf=\"parameter?.lead?.sale_rent==1\">\n                    <td  style=\"padding-left:0\"><label><strong>Meeting Schedule</strong></label></td>\n                    <td colspan=\"2\" class=\"cursor-pointer\">\n                        <p class=\"date\" *ngIf=\"appointment.appointment_date; else noAvailability4\">\n                            <span>{{appointment.appointment_date | moment}}</span>\n                        </p>\n                        <ng-template #noAvailability4>\n                            <p>Meeting not scheduled by broker.</p>\n                        </ng-template>\n                    </td>\n                </tr>          \n\n              </tbody>\n             </table>\n           </div>\n        </div>\n        <div class=\"spacer30\"></div>\n\n        <!-- fill information start -->\n        <app-fill-information [sent_as]=\"parameter.sent_as\" [fillInfo]=\"fillInfo\" [lead_id]=\"parameter.lead_id\"></app-fill-information>\n        <!-- fill information end -->\n\n     </div>\n     <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\">\n        <div *ngIf=\"!parameter.lead?.user\" class=\"white-bg padding20\">\n          User is not registered.\n        </div>\n\n        <!-- chat start -->\n        <div *ngIf=\"parameter.lead?.user\">\n          <app-chat [lead_id]=\"parameter.lead_id\" [sent_as]=\"parameter.sent_as\" [user_id]=\"parameter.user_id\" [admin_id]=\"parameter.admin_id\"></app-chat>\n        </div>\n        <!-- chat end -->\n\n        <!-- notes start -->\n        <app-notes [sent_as]=\"parameter.sent_as\" [lead_id]=\"parameter.lead_id\"></app-notes>\n        <!-- notes end -->\n\n     </div>\n  </div>\n\n  <!-- Interested Properties start -->\n  <app-interested-property [is_deal_finalised]=\"false\" [selected_properties]=\"parameter?.lead?.selected_properties\" [lead_id]=\"parameter.lead_id\" [interested_properties]=\"parameter.interested_properties\" [sent_as]=\"parameter.sent_as\"></app-interested-property>\n  <!-- Interested Properties end -->\n\n  <!-- viewed property start -->\n  <app-viewed-property [user_id]=\"parameter?.lead?.user_id\" [viewed_properties]=\"parameter.viewed_properties\"></app-viewed-property>\n  <!-- viewed property end -->\n\n  <!-- viewed projects start -->\n  <app-viewed-projects [user_id]=\"parameter?.lead?.user_id\" [viewed_projects]=\"parameter.viewed_projects\"></app-viewed-projects>\n  <!-- viewed projects end -->\n</div>\n\n\n\n<!-- show fav properties -->\n<div class=\"modal\" id=\"view-fav-property\">\n  <div class=\"modal-dialog  modal-lg\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n        </div>\n        <div class=\"modal-body\">\n          <h3>Favorite Properties</h3>\n          <hr>\n          <div class=\"scrollbox fav-prop\">\n            <div class=\"row\">\n              <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\" *ngFor=\"let x of parameter.favorites\">\n                  <div class=\"project-des-bx white-bg-2\">\n                      <div class=\"price\">${{x.min_price}}</div>\n                    <div class=\"fig-block\">\n                        <img [src]=\"x.image\" onerror='src=\"assets/img/bank.png\"' alt=\"img\">\n                    </div>\n                    <div class=\"project-des-content\">\n                        <small>{{x.building.developer.name}}</small>\n                        <h5>{{x.building.name.slice(0, 15)}}</h5>\n                        <p class=\"p12\">{{x.building.address.slice(0, 60)}}</p>\n                        <p class=\"p13\" *ngIf=\"x\">{{x.configuration.name}}</p>\n                        <p class=\"p13\" *ngIf=\"!x\">NA</p>\n                        <p class=\"p13\" *ngIf=\"x\">{{x.property_type.name}}</p>\n                    </div>\n                  </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/layout/leads/csr-buyer/csr-buyer-detail/csr-buyer-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_leads_model__ = __webpack_require__("../../../../../src/app/models/leads.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pipes_chat_time_pipe__ = __webpack_require__("../../../../../src/app/pipes/chat-time.pipe.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CsrBuyerDetailComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CsrBuyerDetailComponent = /** @class */ (function () {
    function CsrBuyerDetailComponent(route, admin, constant, fillInfo, appointment) {
        var _this = this;
        this.route = route;
        this.admin = admin;
        this.constant = constant;
        this.fillInfo = fillInfo;
        this.appointment = appointment;
        this.parameter = {};
        this.selected_prop_ids = [];
        this.admin.loginData$.subscribe(function (success) {
            _this.parameter.admin_id = success['id'];
        });
    }
    CsrBuyerDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.parameter.sent_as = this.constant.userType.csr_buyer;
        this.route.params.subscribe(function (params) {
            _this.parameter.lead_id = params.id;
            _this.parameter.loading = true;
            _this.admin.postDataApi('leads/details', { lead_id: _this.parameter.lead_id, sent_as: _this.parameter.sent_as }).subscribe(function (r) {
                _this.parameter.loading = false;
                _this.parameter.lead = r.data.lead;
                if (r.data.lead.appointments.length !== 0) {
                    _this.appointment = r.data.lead.appointments[0];
                }
                _this.parameter.favorites = r.data.favorites;
                _this.setFillInformationData(r);
                _this.parameter.proximity_places = r.data.lead.proximity_places;
                _this.parameter.interested_properties = r.data.interested_properties;
                _this.is_deal_finalised = _this.parameter.lead.selected_properties.length !== 0 ? true : false;
                _this.parameter.viewed_properties = r.data.viewed_properties;
                _this.parameter.viewed_projects = r.data.viewed_projects;
                _this.parameter.user_id = _this.parameter.lead.user ? _this.parameter.lead.user.id : 0;
            }, function (error) {
                _this.parameter.loading = false;
            });
        });
    };
    CsrBuyerDetailComponent.prototype.setFillInformationData = function (r) {
        var _this = this;
        this.admin.postDataApi('leads/getPrefOptions', { lead_id: this.parameter.lead_id }).subscribe(function (res) {
            _this.fillInfo.lead_id = _this.parameter.lead_id;
            _this.fillInfo.proximity_places_array = res.data.proximity_places;
            _this.fillInfo.car_types = res.data.car_types;
            _this.fillInfo.property_types_array = res.data.property_types;
            _this.fillInfo.configurations_array = res.data.configurations;
            _this.fillInfo.configurations = [];
            _this.fillInfo.proximity_place_ids = [];
            _this.fillInfo.property_types = [];
            _this.fillInfo.proximity_places_array.forEach(function (element) {
                r.data.lead.proximity_places.forEach(function (p) {
                    if (p.id === element.id) {
                        element.is_selected = 1;
                    }
                });
            });
            _this.fillInfo.car_types.forEach(function (element) {
                element.is_selected = (r.data.lead.prefs != null) &&
                    r.data.lead.prefs.car_type_id && (r.data.lead.prefs.car_type_id === element.id) ? 1 : 0;
            });
            _this.fillInfo.property_types_array.forEach(function (element) {
                r.data.lead.property_types.forEach(function (pt) {
                    if (pt.id === element.id) {
                        element.is_selected = 1;
                    }
                });
            });
            _this.fillInfo.configurations_array.forEach(function (element) {
                r.data.lead.configuration.forEach(function (c) {
                    if (c.id === element.id) {
                        element.is_selected = 1;
                    }
                });
            });
        });
        if (r.data.lead.prefs !== null) {
            this.fillInfo.family_size = r.data.lead.prefs.family_size;
            this.fillInfo.pets = r.data.lead.prefs.pets;
            this.fillInfo.kid_count = r.data.lead.prefs.kid_count;
            this.fillInfo.min_price = r.data.lead.prefs.min_price ? r.data.lead.prefs.min_price : this.constant.minValue;
            this.fillInfo.max_price = r.data.lead.prefs.max_price ? r.data.lead.prefs.max_price : this.constant.maxValue;
            this.fillInfo.price_range = [this.fillInfo.min_price, this.fillInfo.max_price];
            if (r.data.lead.prefs.planning_to_buy !== null) {
                this.fillInfo.planning_to_buy = new __WEBPACK_IMPORTED_MODULE_5__pipes_chat_time_pipe__["a" /* ChatTimePipe */]().transform(r.data.lead.prefs.planning_to_buy, 'YYYY-MM-DD HH:MM:SS', 4);
            }
        }
        else {
            this.fillInfo.family_size = 1;
            this.fillInfo.pets = '';
            this.fillInfo.kid_count = '';
            this.fillInfo.min_price = this.constant.minValue;
            this.fillInfo.max_price = this.constant.maxValue;
            this.fillInfo.price_range = [this.constant.minValue, this.constant.maxValue];
        }
    };
    CsrBuyerDetailComponent.prototype.assignToBroker = function () {
        var _this = this;
        this.admin.postDataApi('conversation/assignBroker', { lead_id: this.parameter.lead_id }).subscribe(function (r) {
            _this.parameter.lead = r.data;
            swal('Success', 'Broker assigned successfully', 'success');
        });
    };
    CsrBuyerDetailComponent.prototype.blockThisLead = function () {
        this.admin.postDataApi('conversation/block', { lead_id: this.parameter.lead_id }).subscribe(function (r) {
            // console.log('conversation/block', r);
        });
    };
    CsrBuyerDetailComponent.prototype.viewFavProperties = function () {
        this.showPropertyModal.nativeElement.click();
    };
    CsrBuyerDetailComponent.prototype.dealFinalisedReceived = function (value) {
        console.log(value);
    };
    var _a, _b, _c, _d, _e, _f;
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('showPropertyModal'),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _a : Object)
    ], CsrBuyerDetailComponent.prototype, "showPropertyModal", void 0);
    CsrBuyerDetailComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-csr-buyer-detail',
            template: __webpack_require__("../../../../../src/app/layout/leads/csr-buyer/csr-buyer-detail/csr-buyer-detail.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/leads/csr-buyer/csr-buyer-detail/csr-buyer-detail.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_4__models_leads_model__["b" /* FillInformation */], __WEBPACK_IMPORTED_MODULE_4__models_leads_model__["h" /* AddAppointment */]]
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"]) === "function" ? _b : Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */]) === "function" ? _c : Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__common_constants__["a" /* Constant */]) === "function" ? _d : Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__models_leads_model__["b" /* FillInformation */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__models_leads_model__["b" /* FillInformation */]) === "function" ? _e : Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_4__models_leads_model__["h" /* AddAppointment */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__models_leads_model__["h" /* AddAppointment */]) === "function" ? _f : Object])
    ], CsrBuyerDetailComponent);
    return CsrBuyerDetailComponent;
}());

//# sourceMappingURL=csr-buyer-detail.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/leads/csr-buyer/csr-buyer.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/leads/csr-buyer/csr-buyer.component.html":
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<div class=\"container-fluid\">\n    <div class=\"row\" *ngIf=\"admin?.admin_acl['Buyer Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n        <div class=\"col-md-4\">\n            <div class=\"form-group\">\n                <p class=\"p16\">Manage CSR Buyer's Lead</p>\n                <div class=\"d-flex\">\n                    <button (click)=\"removeCsrUser()\" class=\"all-btn\">All</button>\n                    <div class=\"autocomplete\">\n                    <input style=\"max-width:200px\" list=\"amenities\" [(ngModel)]=\"parameter.keyword\" (input)=\"getCsrListing()\" class=\"form-control\" type=\"text\" name=\"keyword\" (focusout)=\"closeCsrListing()\">\n                    <div id=\"myInputautocomplete-list\" class=\"autocomplete-items\">\n                        <div *ngFor=\"let item of users\" (click)=\"selectCsrUser(item)\">{{item.email}}</div>\n                    </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-md-2\">\n            <div class=\"form-group\">\n            <label>Country</label>\n            <select class=\"form-control\" (change)=\"onCountryChange($event.target.value)\">\n                <option value=\"0\">All</option>\n                <option *ngFor=\"let item of location.countries\" [value]=\"item.id\">{{item.name}}</option>\n            </select>\n            </div>\n        </div>\n        <div class=\"col-md-2\">\n            <div class=\"form-group\">\n            <label>State</label>\n            <select class=\"form-control\" (change)=\"onStateChange($event.target.value)\">\n                <option value=\"0\">All</option>\n                <option *ngFor=\"let item of location.states\" [value]=\"item.id\">{{item.name}}</option>\n            </select>\n            </div>\n        </div>\n        <div class=\"col-md-2\">\n            <div class=\"form-group\">\n            <label>City</label>\n                <select class=\"form-control\" (change)=\"onCityChange($event.target.value)\">\n                <option value=\"0\">All</option>\n                <option *ngFor=\"let item of location.cities\" [value]=\"item.id\">{{item.name}}</option>\n                </select>\n            </div>\n        </div>\n\n        <div class=\"col-md-2\">\n            <div class=\"form-group\">\n            <label>Locality</label>\n            <select class=\"form-control\" (change)=\"onLocalityChange($event.target.value)\">\n                <option value=\"0\">All</option>\n                <option *ngFor=\"let item of location.localities\" [value]=\"item.id\">{{item.name}}</option>\n            </select>\n            </div>\n        </div>\n    </div>\n\n    <!-- <div *ngIf=\"users?.length > 0 && initSelection\"class=\"row\">\n        <table class=\"table table-striped\">\n            <tbody><tr *ngFor=\"let item of users\" (click)=\"selectCsrUser(item)\">\n                <td> <img class=\"rounded-circle\" [src]=\"item.image\" onerror='this.src=\"http://via.placeholder.com/50x50\"' alt=\"img\"></td>\n                <td class=\"text-left\">\n                    <span class=\"name\">{{item.name}}</span>\n                </td>\n                <td class=\"text-left\">\n                    {{item.phone}}\n                </td>\n                <td class=\"text-left\">\n                    {{item.email}}\n                </td>\n                <td>\n                    <a href=\"javascript://\" class=\"icon-block edit-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></a>\n                    <a href=\"javascript://\" class=\"icon-block block-icon\"><img src=\"assets/img/block.png\" alt=\"img\"></a>\n                </td>\n                </tr>\n            </tbody>\n        </table>\n    </div> -->\n    <div class=\"listingResults\" >\n        <div class=\"row\">\n            <div class=\"col-12\">\n                <div class=\"cust-tabs-2\">\n                    <ul class=\"nav nav-tabs\">\n                    <li class=\"nav-item\">\n                        <a class=\"nav-link\" [ngClass]=\"{'active':parameter.flag==1}\" (click)=\"changeFlag(1)\" >This Week</a>\n                    </li>\n                    <li class=\"nav-item\">\n                        <a class=\"nav-link\" [ngClass]=\"{'active':parameter.flag==2}\" (click)=\"changeFlag(2)\" >This Month</a>\n                    </li>\n                    <li class=\"nav-item\">\n                        <a class=\"nav-link\" [ngClass]=\"{'active':parameter.flag==3}\" (click)=\"changeFlag(3)\" >Last Month</a>\n                    </li>\n                    <li class=\"nav-item\">\n                        <a class=\"nav-link\" [ngClass]=\"{'active':parameter.flag==4}\" (click)=\"changeFlag(4)\" >Lifetime</a>\n                    </li>\n                    <li class=\"nav-item\">\n                        <a class=\"nav-link\" [ngClass]=\"{'active':parameter.flag==5}\" (click)=\"parameter.flag=5\" >Custom</a>\n                    </li>\n                    </ul>\n                </div>\n            </div>\n            <div class=\"col-12\">\n                <hr style=\"margin-top:0;\">\n                <div *ngIf=\"parameter.flag == 5\" class=\"pull-right btn-cont\">\n                    From:<input type=\"date\" [ngModel] =\"parameter.min | date:'yyyy-MM-dd'\" max=\"{{today| date:'yyyy-MM-dd'}}\" (ngModelChange)=\"parameter.min = $event; parameter.max=''\" />\n                    To:<input type=\"date\" [ngModel] =\"parameter.max | date:'yyyy-MM-dd'\" min=\"{{parameter.min | date:'yyyy-MM-dd'}}\" max=\"{{today| date:'yyyy-MM-dd'}}\" (ngModelChange)=\"parameter.max = $event\" />\n                    <button class=\"btn btn-primary\" href=\"javascript://\" (click)=\"getListing()\" [disabled]=\"\n                    parameter.flag == 5 && (!parameter.min || !parameter.max)\n                    \">Go</button>\n                </div>\n            </div>\n        </div>\n        <div *ngIf=\"selectedUser as item\" class=\"sigle-row-table\">\n            <table class=\"table table-striped\">\n                <tbody>\n                    <tr>\n                        <td> <img class=\"rounded-circle\" [src]=\"item.image| img:'small'\" onerror='this.src=\"assets/img/default_img.png\"' alt=\"img\"></td>\n                        <td class=\"text-left\">\n                            <span class=\"name\">{{item.name}}</span>\n                        </td>\n                        <td class=\"text-left\">\n                            {{item.phone}}\n                        </td>\n                        <td class=\"text-left\">\n                            {{item.email}}\n                        </td>\n                        <td>\n                            <a (click)=\"removeCsrUser()\" href=\"javascript://\" class=\"icon-block edit-icon\"><img src=\"assets/img/remove-icon.png\" alt=\"remove\" title=\"remove\" /></a>\n                            <!-- <a href=\"javascript://\" class=\"icon-block edit-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></a>\n                            <a href=\"javascript://\" class=\"icon-block block-icon\"><img src=\"assets/img/block.png\" alt=\"img\"></a> -->\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-lg-8 col-md-12 col-sm-12 col-12\">\n                <div class=\"info-box all-leads\">\n                    <div class=\"row\">\n                        <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == '1'}\" (click)=\"changeCountFlag(1)\">\n                            <div class=\"one-row \">\n                            <div class=\"o-block\">\n                                <h5>Leads</h5>\n                                <small>Total</small>\n                            </div>\n                            <div class=\"o-block\">\n                                <a class=\"view-all\" href=\"javascript://\">View All</a>\n                                <h4>{{dash?.lead_total}}</h4>\n                            </div>\n                            </div>\n                        </div>\n                        <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == '2'}\" (click)=\"changeCountFlag(2)\">\n                            <div class=\"one-row\">\n                            <div class=\"o-block\">\n                                <h5>Leads</h5>\n                                <small>Without Broker</small>\n                            </div>\n                            <div class=\"o-block\">\n                                <a class=\"view-all\" href=\"javascript://\">View All</a>\n                                <h4>{{dash?.lead_without_broker}}</h4>\n                            </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"info-box all-leads\">\n                    <div class=\"row\">\n                        <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == '3'}\" (click)=\"changeCountFlag(3)\">\n                            <div class=\"one-row \">\n                            <div class=\"o-block\">\n                                <h5>Leads</h5>\n                                <small>Information Filled</small>\n                            </div>\n                            <div class=\"o-block\">\n                                <a class=\"view-all\" href=\"javascript://\">View All</a>\n                                <h4>{{dash?.lead_information_filled}}</h4>\n                            </div>\n                            </div>\n                        </div>\n                        <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == '4'}\" (click)=\"changeCountFlag(4)\">\n                            <div class=\"one-row\">\n                            <div class=\"o-block\">\n                                <h5>Leads</h5>\n                                <small>Broker Assigned</small>\n                            </div>\n                            <div class=\"o-block\">\n                                <a class=\"view-all\" href=\"javascript://\">View All</a>\n                                <h4>{{dash?.lead_broker_assigned}}</h4>\n                            </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"col-lg-4 col-md-12 col-sm-12 col-12\">\n                <div class=\"chat-msg all-leads\" style=\"padding:0px\">\n                    <div class=\"padding20\" *ngIf=\"dash?.lead_total == 0\">No records found</div>\n                    <ngx-charts-pie-chart [results]=\"chartView\"></ngx-charts-pie-chart>\n                </div>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-12\">\n            <div class=\"spacer40\"></div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-6\">\n            <div class=\"title-group\">\n                <h5>Leads \n                <span *ngIf=\"parameter.count_flag == 1\">(Total)</span>\n                <span *ngIf=\"parameter.count_flag == 2\">(Without Broker)</span>\n                <span *ngIf=\"parameter.count_flag == 3\">(Information Filled)</span>\n                <span *ngIf=\"parameter.count_flag == 4\">(Broker Assigned)</span>\n                </h5>\n                <p>\n                    <!-- Showing {{parameter.page}} out of {{parameter.total_count}} -->\n                </p>\n            </div>\n        </div>\n        <div class=\"col-6\">\n            <div class=\"add-new text-right\">\n                <a class=\"btn\" (click)=\"bulkAssign()\" href=\"javascript://\">Bulk Re-assign</a>\n            </div>\n        </div>\n    </div>\n    <div class=\"white-bg\">\n        <div class=\"tabel-section\">\n            <div class=\"table-responsive\">\n                <table class=\"table table-striped table-align-left vertical-align-top\">\n                    <tr>\n                        <th style=\"width:6%\">\n                            <div class=\"table-search\">\n                                <label>All</label>\n                                <div>\n                                    <label class=\"cust-check-bx\" >\n                                        <input class=\"width1\" type=\"checkbox\" (click)=\"selectAll(parameter.is_selected)\" name=\"document\">\n                                        <span class=\"checkmark\"></span>\n                                    </label>\n                                </div>\n                            </div>\n                        </th>\n                        <th style=\"width:6%\">\n                            <div class=\"table-search\"><label>Image</label></div>\n                        </th>\n                        <th style=\"width:15%\">\n                            <div class=\"table-search\">\n                                <label>Name</label>\n                                <div class=\"searh-3\">\n                                    <input autocomplete=\"off\" type=\"text\" [(ngModel)]=\"parameter.name\" (keyup.enter)=\"changeFilter('name',$event.target.value)\" name=\"\">\n                                    <button *ngIf=\"parameter.name\" (click)=\"changeFilter('name', parameter.name)\"><i class=\"fa fa-search\"></i></button>\n                                </div>\n                            </div>\n                        </th>\n                        <th style=\"width:20%; text-align:left;\">\n                            <div class=\"table-search\">\n                                <label>Contact Number</label>\n                                <div class=\"searh-3\">\n                                    <input autocomplete=\"off\" type=\"text\" [(ngModel)]=\"parameter.phone\" (keyup.enter)=\"changeFilter('phone',$event.target.value)\" name=\"\">\n                                    <button *ngIf=\"parameter.phone\" (click)=\"changeFilter('phone', parameter.phone)\"><i class=\"fa fa-search\"></i></button>\n                                </div>\n                            </div>\n                        </th>\n                        <th style=\"width:20%\">\n                            <div class=\"table-search\">\n                                <label>Email</label>\n                                <div class=\"searh-3\">\n                                    <input autocomplete=\"off\" type=\"text\" [(ngModel)]=\"parameter.email\" (keyup.enter)=\"changeFilter('email',$event.target.value)\" name=\"\">\n                                    <button *ngIf=\"parameter.email\" (click)=\"changeFilter('email', parameter.email)\"><i class=\"fa fa-search\"></i></button>\n                                </div>\n                            </div>\n                        </th>\n                        <th style=\"width:10%\">\n                            <div class=\"table-search\">\n                                <label>Interested In</label>\n                            </div>\n                        </th>\n                        <th style=\"width:10%\">\n                            <div class=\"table-search\">\n                                <label>Assignee</label>\n                            </div>\n                        </th>\n                        <th style=\"width:10%\">\n                            <div class=\"table-search\">\n                                <label>Property For</label>\n                            </div>\n                        </th>                        \n                        <!-- <th style=\"width:9%\"></th> -->\n                    </tr>\n                    <tr class=\"cursor-pointer\" title=\"Click to view details\" *ngFor=\"let item of items| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: parameter.total }\"\n                        routerLink=\"/dashboard/leads/csr-buyers/{{item.id}}\">\n                        <td (click)=\"$event.stopPropagation()\">\n                            <label class=\"cust-check-bx\" >\n                            <input type=\"checkbox\" [(ngModel)]=\"item.selected\" name=\"document\">\n                            <span class=\"checkmark\"></span>\n                            </label>\n                            <!-- <i class=\"fa\" [ngClass]=\"item.selected?'fa-check-square-o':'fa-square-o'\" (click)=\"item.selected = !item.selected\" aria-hidden=\"true\"></i> -->\n                        </td>\n                        <td>\n                        <img [src]=\"item.image| img:'small'\" class=\"rounded-circle\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\">\n                        </td>\n                        <td class=\"text-left\">\n                        <span *ngIf=\"item.name\" class=\"name\">{{item.name}}</span>\n                        <span class=\"name\" *ngIf=\"!item.name\">NA</span>\n                        </td>\n                        <td class=\"text-left\" *ngIf=\"item.phone\">{{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}</td>\n                        <td class=\"text-left\" *ngIf=\"!item.phone\">NA</td>\n                        <td class=\"text-left\" *ngIf=\"item.email\">{{item.email}}</td>\n                        <td class=\"text-left\" *ngIf=\"!item.email\">NA</td>\n                        <td>\n                            <span *ngFor=\"let conf of item.configuration; let ii=index\">\n                                {{conf.name}}<span *ngIf=\"ii<item?.configuration?.length-1\">,</span>\n                            </span>\n                            <span *ngIf=\"item.configuration?.length==0\">NA</span>\n                        </td>\n                        <td class=\"text-left\" title=\"CSR Buyer\" *ngIf=\"item.admin.name\">{{item.admin.name}}</td>\n                        <td class=\"text-left\" *ngIf=\"!item.admin.name\">Not Assigned</td>\n                        <td class=\"text-left\" *ngIf=\"item.sale_rent\">{{item.sale_rent==1 ? 'Buy' : 'Rent'}}</td>\n                        <!-- <td>\n                        <button title=\"View Details\" routerLink=\"/dashboard/leads/csr-buyers/{{item.id}}\" class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></button>\n                        </td> -->\n                    </tr>\n                </table>\n                <div class=\"padding20 center\" *ngIf=\"parameter.noResultFound\">\n                    <img src=\"assets/img/404-error.png\">\n                </div>\n            </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"btn-cont text-right marginT15\" *ngIf=\"parameter.total\">\n        <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n    </div>\n</div>\n\n<!-- Assignment model -->\n<a data-toggle=\"modal\" data-target=\"#assign-model\" #openAssignModel></a>\n<div class=\"modal\" id=\"assign-model\">\n        <div class=\"modal-dialog \">\n            <div class=\"modal-content notary-avail\">\n                <div class=\"modal-header popup-header\">\n                <h4 class=\"modal-title\">Re Assign to</h4>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #closeAssignModel>&times;</button>\n                </div>\n                <div class=\"modal-body\">\n                    <div class=\"row\">\n                        <div class=\"col-md-8\">\n                            <input style=\"max-width:200px\" list=\"amenities\" [(ngModel)]=\"assign.keyword\" (input)=\"getAssignListing()\" class=\"form-control\" type=\"text\" name=\"keyword\" placeholder=\"Search\">\n                        </div>\n                        <div class=\"col-md-4 btn-cont\">\n                            <a class=\"btn btn-primary pull-right\" href=\"javascript://\" (click)=\"assignNow()\">Assign</a>\n                        </div>\n                    </div>\n                    <div class=\"spacer40\"></div>\n                    <table class=\"table\">\n                        <tr *ngFor=\"let item of assign.items\">\n                            <td *ngIf=\"item.is_blocked!=1\">\n                                <div class=\"n-avail-profile\">\n                                <img [src]=\"item.image| img:'small'\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\">\n                                <div class=\"n-avail-info\">\n                                    <p class=\"p12\">{{item.name}}</p>\n                                    <p class=\"p10\">Phone : {{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}</p>\n                                </div>\n                                </div>\n                            </td>\n                            <td *ngIf=\"item.is_blocked!=1\">\n                                <label class=\"cust-check-bx float-right\">\n                                    <input type=\"radio\" name=\"notary_id\" (click)=\"assignItem = item\">\n                                    <span class=\"checkmark\"></span>\n                                </label>\n                            </td>\n                        </tr>\n                    </table>\n                </div>\n            </div>\n        </div>\n    </div>"

/***/ }),

/***/ "../../../../../src/app/layout/leads/csr-buyer/csr-buyer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CsrBuyerComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CsrBuyerComponent = /** @class */ (function () {
    function CsrBuyerComponent(admin, constant, route) {
        this.admin = admin;
        this.constant = constant;
        this.route = route;
        this.parameter = {};
        this.location = {};
        this.assign = {};
        this.items = [];
        this.today = new Date();
        this.users = [];
        this.initSelection = false;
        this.dash = {
            lead_total: 0,
            lead_without_broker: 0,
            lead_information_filled: 0,
            lead_broker_assigned: 0
        };
        this.chartView = [];
    }
    CsrBuyerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.parameter.is_selected = false;
        this.parameter.keyword = '';
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        this.parameter.flag = 2;
        this.parameter.total = 0;
        this.parameter.count_flag = 1;
        this.route.params.subscribe(function (params) {
            _this.parameter.assignee_id = params.id;
        });
        this.getCountries();
        this.getListing();
        this.getCsrSellerDash();
        Object.assign(this, this.chartView);
    };
    CsrBuyerComponent.prototype.getCountries = function () {
        var _this = this;
        this.admin.postDataApi('getCountryLocality', {}).subscribe(function (r) {
            console.log('Country', r);
            _this.location.countries = r['data'];
        });
    };
    CsrBuyerComponent.prototype.onCountryChange = function (id) {
        console.log(id);
        this.location.states = [];
        this.parameter.state_id = '0';
        this.location.cities = [];
        this.parameter.city_id = '0';
        this.location.localities = [];
        this.parameter.locality_id = '0';
        if (!id || id === '0') {
            this.parameter.state_id = '0';
            return false;
        }
        this.parameter.country_id = id;
        var selectedCountry = this.location.countries.filter(function (x) { return x.id.toString() === id; });
        this.location.states = selectedCountry[0].states;
    };
    CsrBuyerComponent.prototype.onStateChange = function (id) {
        console.log(id);
        this.location.cities = [];
        this.parameter.city_id = '0';
        this.location.localities = [];
        this.parameter.locality_id = '0';
        if (!id || id === '0') {
            this.parameter.city_id = '0';
            return false;
        }
        this.parameter.state_id = id;
        var selectedState = this.location.states.filter(function (x) { return x.id.toString() === id; });
        this.location.cities = selectedState[0].cities;
    };
    CsrBuyerComponent.prototype.onCityChange = function (id) {
        this.location.localities = [];
        this.parameter.locality_id = '0';
        console.log(id);
        if (!id || id === '0') {
            this.parameter.locality_id = '0';
            return false;
        }
        this.parameter.city_id = id;
        var selectedCountry = this.location.cities.filter(function (x) { return x.id.toString() === id; });
        this.location.localities = selectedCountry[0].localities;
    };
    CsrBuyerComponent.prototype.onLocalityChange = function (id) {
        console.log(id);
        if (!id || id === '0') {
            return false;
        }
        this.parameter.locality_id = id;
        this.getCsrListing();
    };
    CsrBuyerComponent.prototype.changeFlag = function (flag) {
        this.parameter.flag = flag;
        this.parameter.count_flag = 1;
        this.getListing();
        this.getCsrSellerDash();
    };
    CsrBuyerComponent.prototype.changeFilter = function (key, value) {
        this.parameter[key] = value;
        this.getListing();
    };
    CsrBuyerComponent.prototype.changeCountFlag = function (flag) {
        this.parameter.count_flag = flag;
        this.getListing();
    };
    CsrBuyerComponent.prototype.getCsrListing = function () {
        var _this = this;
        this.initSelection = true;
        this.users = [];
        var input = new FormData();
        if (this.parameter.keyword) {
            input.append('keyword', this.parameter.keyword);
        }
        if (this.parameter.country_id && this.parameter.country_id !== '-1') {
            input.append('countries', JSON.stringify([this.parameter.country_id]));
        }
        if (this.parameter.state_id && this.parameter.state_id !== '-1') {
            input.append('states', JSON.stringify([this.parameter.state_id]));
        }
        if (this.parameter.city_id && this.parameter.city_id !== '-1') {
            input.append('cities', JSON.stringify([this.parameter.city_id]));
        }
        if (this.parameter.locality_id && this.parameter.locality_id !== '-1') {
            input.append('localities', JSON.stringify([this.parameter.locality_id]));
        }
        this.admin.postDataApi('getCsrBuyers', input).subscribe(function (success) {
            _this.users = success.data;
        });
    };
    CsrBuyerComponent.prototype.closeCsrListing = function () {
        var _this = this;
        setTimeout(function () {
            _this.users = [];
        }, 200);
    };
    CsrBuyerComponent.prototype.selectCsrUser = function (user) {
        this.selectedUser = user;
        this.users = [];
        this.parameter.keyword = '';
        this.initSelection = false;
        this.getListing();
        this.getCsrSellerDash();
    };
    CsrBuyerComponent.prototype.removeCsrUser = function () {
        this.selectedUser = '';
        this.parameter.keyword = '';
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        // this.parameter.flag = 2;
        this.parameter.total = 0;
        this.parameter.count_flag = 1;
        this.getListing();
        this.getCsrSellerDash();
    };
    CsrBuyerComponent.prototype.getCsrSellerDash = function () {
        var _this = this;
        var input = new FormData();
        if (this.selectedUser) {
            input.append('assignee_id', this.selectedUser.id);
        }
        else if (this.parameter.assignee_id) {
            input.append('assignee_id', this.parameter.assignee_id);
        }
        if (this.parameter.flag) {
            input.append('flag', this.parameter.flag.toString());
        }
        this.admin.postDataApi('leads/csr-buyer-dash-count', input).subscribe(function (r) {
            _this.dash = r.data;
            _this.chartView = [
                {
                    'name': 'Lead information filled',
                    'value': parseInt(_this.dash.lead_information_filled, 10)
                },
                {
                    'name': 'Lead with broker assigned',
                    'value': parseInt(_this.dash.lead_broker_assigned, 10)
                },
                {
                    'name': 'Lead without broker assigned',
                    'value': parseInt(_this.dash.lead_without_broker, 10)
                }
            ];
        });
    };
    CsrBuyerComponent.prototype.getListing = function () {
        var _this = this;
        this.items = [];
        this.parameter.noResultFound = false;
        var input = JSON.parse(JSON.stringify(this.parameter));
        if (this.selectedUser) {
            input.assignee_id = this.selectedUser.id;
        }
        else if (this.parameter.assignee_id) {
            input.assignee_id = this.parameter.assignee_id;
        }
        this.parameter.loading = true;
        this.admin.postDataApi('leads/csr-buyer', input).subscribe(function (success) {
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
    CsrBuyerComponent.prototype.getPage = function (page) {
        this.parameter.page = page;
        this.getListing();
    };
    CsrBuyerComponent.prototype.sort_by = function (sort_by_flag) {
        if (this.parameter.sort_by_flag !== sort_by_flag) {
            this.parameter.sort_by_flag = sort_by_flag;
            this.parameter.sort_by_order = 0;
        }
        else {
            this.parameter.sort_by_order = this.parameter.sort_by_order ? 0 : 1;
        }
        this.getListing();
    };
    CsrBuyerComponent.prototype.selectAll = function (is_selected) {
        var _this = this;
        this.parameter.is_selected = !is_selected;
        this.items.forEach(function (item) {
            item.selected = _this.parameter.is_selected;
        });
    };
    CsrBuyerComponent.prototype.bulkAssign = function () {
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
    CsrBuyerComponent.prototype.getAssignListing = function () {
        var _this = this;
        // this.assign.items = [];
        var input = {
            keyword: this.assign.keyword
        };
        this.admin.postDataApi('getCsrBuyers', input).subscribe(function (success) {
            _this.assign.items = success.data;
        });
    };
    CsrBuyerComponent.prototype.assignNow = function () {
        var _this = this;
        var leads_ids = this.items.filter(function (x) { return x.selected; }).map(function (y) { return y.id; });
        var input = {
            csr_buyer_id: this.assignItem.id,
            leads: leads_ids
        };
        this.parameter.loading = true;
        this.admin.postDataApi('leads/bulkAssignBuyer', input).subscribe(function (r) {
            _this.parameter.loading = false;
            swal('Success', 'Assigned successfully', 'success');
            _this.closeAssignModel.nativeElement.click();
            console.log(r);
            _this.getListing();
        }, function (error) {
            _this.parameter.loading = false;
            _this.closeAssignModel.nativeElement.click();
            swal('Error', error.error.message, 'error');
        });
    };
    var _a, _b, _c, _d, _e;
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('openAssignModel'),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _a : Object)
    ], CsrBuyerComponent.prototype, "openAssignModel", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('closeAssignModel'),
        __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _b : Object)
    ], CsrBuyerComponent.prototype, "closeAssignModel", void 0);
    CsrBuyerComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-csr-buyer',
            template: __webpack_require__("../../../../../src/app/layout/leads/csr-buyer/csr-buyer.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/leads/csr-buyer/csr-buyer.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" ? _c : Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__common_constants__["a" /* Constant */]) === "function" ? _d : Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["ActivatedRoute"]) === "function" ? _e : Object])
    ], CsrBuyerComponent);
    return CsrBuyerComponent;
}());

//# sourceMappingURL=csr-buyer.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/leads/csr-closer/csr-closer-detail/csr-closer-detail.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/leads/csr-closer/csr-closer-detail/csr-closer-detail.component.html":
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<div class=\"container-fluid\">\n<div class=\"white-bg padding15\">\n    <div class=\"row\">\n        <div class=\"col-lg-3 col-md-12 col-sm-6 col-12\">\n            <div class=\"df-profile\">\n            <a routerLink=\"../\"><i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i></a>\n            <img [src]=\"parameter.lead?.user?.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\">\n            <div class=\"df-info\" *ngIf=\"parameter.lead?.user\">\n                <p class=\"p14\">{{parameter.lead.user.name}}</p>\n                <!-- <p class=\"p12\">Status: Open</p> -->\n                <p class=\"p12\">\n                    {{parameter?.lead?.user?.dial_code ? parameter?.lead?.user?.dial_code : parameter?.lead?.dial_code}}-{{parameter?.lead?.user?.phone ? parameter?.lead?.user?.phone : parameter?.lead?.phone}}\n                </p>\n            </div>\n            </div>\n        </div>\n        <div class=\"col-lg-5 col-md-12 col-sm-6 col-12\">\n            <div class=\"profile-list\">\n            <ul>\n                <li>\n                    <div class=\"df-info\">\n                        <p class=\"p14 marginB0\" *ngIf=\"parameter.lead?.admin\">{{parameter.lead.admin.name}}</p>\n                        <p class=\"p12\">CSR Buyer</p>\n                    </div>\n                </li>\n                <li>\n                    <div class=\"df-info\" *ngIf=\"parameter.lead?.broker\">\n                        <p class=\"p14 marginB0\">{{parameter.lead.broker.name}}</p>\n                        <p class=\"p12\">Inhouse Broker</p>\n                    </div>\n                </li>\n            </ul>\n            </div>\n        </div>\n        <div class=\"col-lg-4 col-md-12 col-sm-12 col-12\">\n            <div class=\"row\">\n                <div class=\"col-sm-12 btn-cont text-right\">\n                    <a *ngIf=\"parameter?.lead?.lead_status_closer!=1 &&\n                    (admin?.admin_acl['Closer Lead Management']?.can_update==1 || admin?.permissions?.can_csr_closer==1)\" (click)=\"markLeadClose()\" class=\"btn btn-fourth\" href=\"javascript://\">\n                        Close Lead\n                    </a>\n                    <a *ngIf=\"parameter?.lead?.lead_status_closer==1\" style=\"cursor: auto;\" class=\"btn btn-fourth\" href=\"javascript://\">\n                        Lead Closed\n                    </a>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class=\"spacer30\"></div>\n<div class=\"row\">\n    <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\">\n        <div class=\"white-bg padding30\">\n            <div class=\"row\">\n            <div class=\"col-md-6\">\n                <h6>Details</h6>\n            </div>\n            <!-- <div class=\"col-md-6\">\n                <div class=\"edit text-right\"><a href=\"javascript://\">Edit</a></div>\n            </div> -->\n            </div>\n            <div class=\"details-table\">\n            <table class=\"table\">\n                <tr>\n                    <td style=\"padding-left:0\"><label>Full Name</label></td>\n                    <td colspan=\"2\" *ngIf=\"parameter?.lead?.name\">{{parameter.lead.user.name}}</td>\n                </tr>\n                <tr>\n                    <td style=\"padding-left:0\"><label>Contact Number</label></td>\n                    <td colspan=\"2\" *ngIf=\"parameter?.lead?.phone\">{{parameter.lead.user.dial_code ? parameter.lead.user.dial_code : constant.dial_code}}-{{parameter.lead.user.phone}}</td>\n                </tr>\n                <tr>\n                    <td style=\"padding-left:0\"><label>Email address</label></td>\n                    <td colspan=\"2\" *ngIf=\"parameter?.lead?.email\">{{parameter.lead.user.email}}</td>\n                </tr>\n                <tr>\n                    <td style=\"padding-left:0\"><label>Interested In</label></td>\n                    <td *ngIf=\"parameter?.lead?.configuration\">\n                        <span *ngFor=\"let conf of parameter.lead.configuration; let ii=index\">\n                        {{conf.name}}<span *ngIf=\"ii<parameter?.lead?.configuration?.length-1\">,</span>\n                        </span>\n                        <span *ngIf=\"parameter.lead.configuration?.length == 0\">NA</span>\n                    </td>\n                </tr>\n                <tr>\n                    <td style=\"padding-left:0\"><label><strong>Property Selected</strong></label></td>\n                    <td *ngIf=\"parameter?.lead?.selected_properties?.length!=0\">\n                        <p class=\"p14 marginB0\">\n                            {{parameter.lead?.selected_properties[0]?.property?.configuration.name}}\n                        </p>\n                        <p class=\"p12 marginB0\"><strong>{{parameter.lead?.selected_properties[0]?.property?.building?.name}}</strong></p>\n                        <p class=\"p11\"><i>{{parameter.lead?.selected_properties[0]?.property?.building?.developer?.name}}</i></p>\n                    </td>\n                    <td *ngIf=\"parameter?.lead?.selected_properties?.length!=0\">\n                        <a class=\"view-all-2\" href=\"javascript://\" (click)=\"viewPropertyDetails(parameter?.lead?.selected_properties[0])\"> View Property</a>\n                    </td>\n                    <td *ngIf=\"parameter?.lead?.selected_properties?.length==0\">NA</td>\n                </tr>\n                \n                <!-- Notary Availabilities -->\n                <tr *ngIf=\"parameter?.lead?.sale_rent==1\">\n                    <td  style=\"padding-left:0\"><label><strong>Notary Availabilities</strong></label></td>\n                    <td colspan=\"2\" *ngIf=\"parameter?.lead?.selected_properties[0]?.selected_noatary!=0 && parameter?.lead?.selected_properties[0]?.selected_noatary[0]?.noatary_availability?.length!=0; else noAvailability3\">\n                        <p *ngFor=\"let na of parameter?.lead?.selected_properties[0]?.selected_noatary[0]?.noatary_availability; let m=index\" class=\"date\">\n                            <span *ngIf=\"m<2\">{{na.date_time | moment}}</span>\n                        </p>\n                        <span class=\"read-more\" *ngIf=\"parameter?.lead?.selected_properties[0]?.selected_noatary[0]?.noatary_availability.length>2\" data-toggle=\"modal\" data-target=\"#get-availability1\">Read more</span>\n                    </td>\n                    <ng-template #noAvailability3>\n                        <td colspan=\"2\"><p>No availability given by notary yet.</p></td>\n                    </ng-template>\n                </tr>\n\n                <!-- Meeting Schedule -->\n                <tr *ngIf=\"parameter?.lead?.sale_rent==1\">\n                    <td  style=\"padding-left:0\"><label><strong>Meeting Schedule</strong></label></td>\n                    <td colspan=\"2\" class=\"cursor-pointer\">\n                        <p class=\"date\" *ngIf=\"scheduleMeeting.appointment_date; else noAvailability4\" data-toggle=\"modal\" data-target=\"#get-availability2\">\n                            <span title=\"Reschedule meeting\">{{scheduleMeeting.appointment_date | moment}}</span>\n                        </p>\n                        <ng-template #noAvailability4>\n                            <p title=\"Schedule meeting\" data-toggle=\"modal\" data-target=\"#get-availability2\">Meeting not scheduled.</p>\n                        </ng-template>\n                    </td>\n                </tr>\n\n            </table>\n            </div>\n        </div>\n\n        <!-- notes start -->\n        <app-notes [sent_as]=\"parameter.sent_as\" [lead_id]=\"parameter.lead_id\"></app-notes>\n        <!-- notes end -->\n\n        <!-- <div class=\"spacer15\"></div> -->\n        <div *ngIf=\"parameter?.lead?.sale_rent==1\" class=\"bank-assigned-now white-bg\">\n            <div class=\"row\">\n                <div class=\"col-md-6 col-sm-6 col-12 b-left\">\n                <p class=\"p13\" *ngIf=\"selectedProperties?.noataries && selectedProperties.noataries.length==0\">No Notary assigned yet </p>\n                \n                <!-- Assign notary -->\n                <a style=\"display:none;\" #showNotaries href=\"javascript://\" class=\"green green-color\" data-toggle=\"modal\" data-target=\"#notary-avail\">Assign Now</a>\n                <a *ngIf=\"selectedProperties?.noataries && selectedProperties.noataries.length==0 && (admin?.admin_acl['Closer Lead Management']?.can_update==1 || admin?.permissions?.can_csr_closer==1); else noNotaryPermission\"\n                    href=\"javascript://\" class=\"green-color green\" (click)=\"getNotaries(selectedProperties.property_id)\">Assign Now</a>\n                \n                <ng-template *ngIf=\"selectedProperties?.noataries && selectedProperties.noataries.length==0\" #noNotaryPermission>\n                    <a class=\"green-color green\">Assign Now</a>\n                </ng-template>\n\n                <div class=\"d-flex\" *ngIf=\"selectedProperties?.noataries && selectedProperties.noataries.length!=0\">\n                    <img [src]=\"selectedProperties?.noataries && selectedProperties.noataries[0].image\" onerror='src=\"assets/img/house.png\"' alt=\"img\">\n                    <div class=\"bank-info\">\n                        <p title=\"Notary\" class=\"p14\">{{selectedProperties.noataries[0].name}}</p>\n                        <p class=\"p11\">{{selectedProperties.noataries[0].dial_code ? selectedProperties.noataries[0].dial_code : constant.dial_code}}-{{selectedProperties.noataries[0].phone}}</p>\n                        \n                        <!-- change notary -->\n                        <a href=\"javascript://\" #showNotaries style=\"display: none;\" data-toggle=\"modal\" data-target=\"#notary-avail\" class=\"green-color green\">Change</a>\n                        <a *ngIf=\"(admin?.admin_acl['Closer Lead Management']?.can_update==1 || admin?.permissions?.can_csr_closer==1); else noNotaryChangePermission\" href=\"javascript://\" class=\"green-color green\" (click)=\"getNotaries(selectedProperties.property_id)\">Change</a>\n                        <ng-template #noNotaryChangePermission>\n                            <a href=\"javascript://\" class=\"green-color green\">Change</a>\n                        </ng-template>\n                    </div>\n                    </div>\n                </div>\n                <div class=\"col-md-6 col-sm-6 col-12 b-right\">\n                <p class=\"p13\" *ngIf=\"selectedProperties?.banks && selectedProperties.banks.length==0\">No Bank assigned yet </p>\n                \n                <!-- Assign bank -->\n                <a style=\"display:none;\" #showBanks href=\"javascript://\" class=\"green green-color\" data-toggle=\"modal\" data-target=\"#bank-listing\">Assign Now</a>\n                <a *ngIf=\"selectedProperties?.banks && selectedProperties.banks.length==0 && (admin?.admin_acl['Closer Lead Management']?.can_update==1 || admin?.permissions?.can_csr_closer==1); else noBankPermission\"\n                href=\"javascript://\" class=\"green-color green\" (click)=\"getBanks(selectedProperties.property_id)\">Assign Now</a>\n                \n                <ng-template *ngIf=\"selectedProperties?.banks && selectedProperties.banks.length==0\" #noBankPermission>\n                    <a href=\"javascript://\" class=\"green-color green\">Assign Now</a>\n                </ng-template>\n\n                <div class=\"d-flex\" *ngIf=\"selectedProperties?.banks && selectedProperties.banks.length!=0\">\n                    <img [src]=\"selectedProperties?.banks && selectedProperties.banks[0].image\" onerror='src=\"assets/img/bank-building.png\"' alt=\"img\">\n                    <div class=\"bank-info\">\n                        <p title=\"Bank\" class=\"p14\">{{selectedProperties.banks[0].name}}</p>\n                        <p class=\"p11\">{{selectedProperties?.banks[0]?.branch ? selectedProperties?.banks[0]?.branch : 'NA'}}</p>\n                        \n                        <!-- change bank -->\n                        <a href=\"javascript://\" #showBanks style=\"display: none;\" data-toggle=\"modal\" data-target=\"#bank-listing\" class=\"green-color green\">Change</a>\n                        <a *ngIf=\"(admin?.admin_acl['Closer Lead Management']?.can_update==1 || admin?.permissions?.can_csr_closer==1); else noBankChangePermission\" href=\"javascript://\" class=\"green-color green\" (click)=\"getBanks(selectedProperties.property_id)\">Change</a>\n                        <ng-template #noBankChangePermission>\n                            <a href=\"javascript://\" class=\"green-color green\">Change</a>\n                        </ng-template>\n                    </div>\n                </div>\n                </div>\n            </div>\n        </div>\n\n        <!-- <div class=\"spacer15\"></div> -->\n        <!-- *ngIf=\"parameter?.lead?.sale_rent==1\" -->\n        <div class=\"payment-status-table white-bg\">\n            <div class=\"page-title-2 marginB0 border-0\">\n                <div class=\"row\">\n                <div class=\"col-md-6 col-sm-6 col-12\">\n                    <h4>Payment Status</h4>\n                </div>\n                    <div class=\"col-md-6 col-sm-6 col-12\">\n                    <div class=\"grand-total\">${{selectedProperties.total_amount}}</div>\n                </div>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-12\">\n                <table class=\"table\">\n                    <tr>\n                        <td style=\"width:40%\"><label>Token Amount</label></td>\n                        <td style=\"width:40%\"><strong>${{selectedProperties.token_money}}</strong></td>\n                        <td class=\"text-right\" style=\"width:20%\">\n                            <div class=\"pending-status\">{{selectedProperties.status==1?'Paid':'Pending'}}</div>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td style=\"width:40%\"><label>Commission (in %)</label></td>\n                        <td style=\"width:40%\"><strong>{{selectedProperties.commision}}%</strong></td>\n                        <td style=\"width:20%\">&nbsp;</td>\n                    </tr>\n                    <tr>\n                        <td style=\"width:40%\">\n                            <label>Pending Amount</label>\n                            <small>(Full property)</small>\n                        </td>\n                        <td style=\"width:40%\">\n                            <strong *ngIf=\"!showInput && selectedProperties.pending_amount==null\">${{selectedProperties.total_amount - selectedProperties.token_money}}</strong>\n                            <strong *ngIf=\"!showInput && selectedProperties.pending_amount!=null\">${{selectedProperties.pending_amount}}</strong>\n                            <input style=\"width: 90%;\" [(ngModel)]=\"pen_amount\" *ngIf=\"showInput\" type=\"number\" value=\"{{selectedProperties.total_amount - selectedProperties.token_money}}\">\n                        </td>\n                        <td style=\"width:20%\">\n                            <a *ngIf=\"!showInput\" title=\"Edit Amount\" (click)=\"showInput=true\" class=\"green-color fontW500\" href=\"javascript://\">Edit</a>\n                            <a *ngIf=\"showInput\" title=\"Save Amount\" (click)=\"updatePropertyAmount()\" class=\"green-color fontW500\" href=\"javascript://\">Save</a>\n                            <!-- <button *ngIf=\"!showInput\" title=\"Edit Amount\" (click)=\"showInput=true\">\n                                <img src=\"assets/img/edit.png\" alt=\"img\">\n                            </button>\n                            <button *ngIf=\"showInput\" (click)=\"updatePropertyAmount()\">Save</button> -->\n                        </td>\n                    </tr>\n                </table>\n                </div>\n            </div>\n\n        </div>\n    </div>\n\n\n\n    <!-- chatting -->\n    <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\">\n        <div class=\"white-bg\">\n            <div class=\"page-title-3 marginB0\">\n                <h4><i><img src=\"assets/img/chat-icon.png\" alt=\"img\"></i> Chat</h4>\n            </div>\n            <div class=\"cust-tabs-4\">\n                <ul class=\"nav nav-tabs\">\n                <li class=\"nav-item\">\n                    <a [ngClass]=\"{'active':chat_admin_sent_as==constant.userType.user_buyer}\" (click)=\"getLeadConversation(constant.userType.user_buyer)\" class=\"nav-link\">Buyer</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a [ngClass]=\"{'active':chat_admin_sent_as==constant.userType.user_seller_dev}\" (click)=\"getLeadConversation(constant.userType.user_seller_dev)\" class=\"nav-link\">Seller</a>\n                </li>\n                <li class=\"nav-item\" *ngIf=\"parameter?.lead?.sale_rent==1\">\n                    <a [ngClass]=\"{'active':chat_admin_sent_as==constant.userType.notary}\" (click)=\"getLeadConversation(constant.userType.notary)\" class=\"nav-link\">Notary</a>\n                </li>\n                <li class=\"nav-item\" *ngIf=\"parameter?.lead?.sale_rent==1\">\n                    <a [ngClass]=\"{'active':chat_admin_sent_as==constant.userType.bank}\" (click)=\"getLeadConversation(constant.userType.bank)\" class=\"nav-link\">Bank</a>\n                </li>\n                </ul>\n                \n                <div class=\"tab-content\">\n                    <div class=\"chat-window white-bg\">\n                    <div class=\"chat-top\">\n                        <a href=\"javascript://\">\n                        <div class=\"profile\">\n                            <div class=\"fig-block\">\n                            <img [src]=\"chat_admin?.image\" onerror=\"this.src='assets/img/default_img.png'\" alt=\"img\" />\n                            </div>\n                            <div class=\"profile-info\">\n                            <h6>{{chat_admin?.name}}</h6>\n                            <p *ngIf=\"chat_admin_sent_as == 3\" class=\"p12\">CSR Closure</p>\n                            <p *ngIf=\"chat_admin_sent_as == 6\" class=\"p12\">Notary</p>\n                            <p *ngIf=\"chat_admin_sent_as == 5\" class=\"p12\">Bank</p>\n                            </div>\n                        </div>\n                        </a>\n                    </div>\n                    <div malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\" class=\"chat-area scrollbox\" #chatWin>\n                        <div *ngFor=\"let m of messages; let i=index\" [ngClass]=\"m.conversation_user.admin_id == admin_id ? 'chat-user-one' :'chat-user-two'\" class=\"chat-user\">\n                            <p *ngIf=\"m.message_type == 1\" style=\"word-wrap: break-word;\">\n                                <span>{{m.message}}</span>\n                                <!-- <span *ngIf=\"m.loading\" class=\"m-loader\">\n                                    <img class=\"text-message\" src=\"assets/img/loading-p.gif\">\n                                </span>\n                                <span *ngIf=\"!m.loading\">{{m.message}}</span> -->\n                            </p>\n\n                            <a *ngIf=\"m.message_type == 2\" href=\"{{m.image}}\" data-lightbox=\"image\">\n                                <span *ngIf=\"!m.loading\">\n                                    <img class=\"ui bordered small image\" src=\"{{m.image}}\">\n                                </span>\n                                <!-- <div *ngIf=\"m.loading\" class=\"loaderr\"></div> -->\n                                <span *ngIf=\"m.loading\" class=\"m-loader\">\n                                    <img src=\"assets/img/loading_image_1.gif\">\n                                </span>\n                            </a>\n                            \n                            <div class=\"chat-vid\" *ngIf=\"m.message_type == 3 && !m.play\">\n                                <span>\n                                    <div *ngIf=\"m.loading\" class=\"loaderr\"></div>\n                                    <img *ngIf=\"m.image\" class=\"ui bordered small image\" src=\"{{m.image}}\">\n                                    <img *ngIf=\"!m.loading\" class=\"vid-icon\" (click)=\"playVideo(i)\" src=\"assets/img/play-button.png\" />\n                                    <div class=\"clearfix\"></div>\n                                </span>\n                            </div>\n                            <video *ngIf=\"m.message_type == 3 && m.play\" src=\"{{m.video}}\" autoplay type=\"video/mp4\" controls></video>\n                            \n                            <div class=\"chat-shared-file\" *ngIf=\"m.message_type == 4\">\n                                <p *ngIf=\"m.loading\" class=\"m-loader\">\n                                    <img class=\"text-message\" src=\"assets/img/loading-p.gif\">\n                                </p>\n                                <span *ngIf=\"!m.loading\">\n                                    <a href=\"javascript://\" href=\"{{m.attachment}}\"><span>{{m.attachment_name}}</span></a>\n                                </span>\n                            </div>\n\n                            <a *ngIf=\"m.message_type == 5\" href=\"{{m.property_url}}\" target=\"_blank\" title=\"Property Image\" >\n                                <span>\n                                    <img class=\"ui bordered small image\" src=\"{{m.image}}\">\n                                    <div *ngIf=\"m.loading\" class=\"loaderr\"></div>\n                                </span>\n                                <h5>{{m.message}}</h5>\n                            </a>\n            \n                            <span class=\"time\" *ngIf=\"m.id\">{{m.updated_at| moment}}</span>\n                            <span class=\"time\" *ngIf=\"!m.id\">{{m.updated_at|date:'h:mm a'|lowercase}}, {{m.updated_at|date: 'MMM d y'}}</span>\n                            \n                        </div>                \n                    </div>\n                                            \n                    <div style=\"position: absolute; z-index: 1; margin: 0px; padding: 0px; other: block; left: 581px; top: 91px;\"><div class=\"enscroll-track track3\" style=\"position: relative; height: 367px;\"><a href=\"\" class=\"handle3\" style=\"position: absolute; z-index: 1; height: 199.244px; top: 0px;\"><div class=\"top\"></div><div class=\"bottom\"></div></a></div></div>\n    \n                    <div class=\"chat-text\">\n                        <div class=\"dropdown attach-items\">\n                            <a *ngIf=\"(admin?.admin_acl['Closer Lead Management']?.can_update==1 || admin?.permissions?.can_csr_closer==1); else noPermissiom\" href=\"javascript://\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" #optionsButton>\n                                <i class=\"fa fa-paperclip\" aria-hidden=\"true\"></i>\n                            </a>\n\n                            <ng-template #noPermissiom>\n                                <a><i class=\"fa fa-paperclip\" aria-hidden=\"true\"></i></a>\n                            </ng-template>\n                            <div class=\"dropdown-menu\">\n                            <div class=\"dropdown-item\">\n                                <input type=\"file\" name=\"image\" accept=\"image/*\" (change)=\"onSelectFile('image', $event)\">\n                                <i class=\"fa fa-camera\" aria-hidden=\"true\"></i>\n                                <span>Photo</span>\n                            </div>\n                            <a class=\"dropdown-item\"> \n                                <input type=\"file\" name=\"video1\" accept=\"video/mp4,video/x-m4v,video/*\" (change)=\"showCanvas($event)\">\n                                <i class=\"fa fa-video-camera\" aria-hidden=\"true\"></i>\n                                <span>Video</span>\n                            </a>\n                            <a class=\"dropdown-item\">    \n                                <input type=\"file\" name=\"attachment\" accept=\".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf\" (change)=\"saveAttachment($event)\">\n                                <i class=\"fa fa-file\" aria-hidden=\"true\"></i>\n                                <span>Document</span>\n                            </a>\n                            <a class=\"dropdown-item\" (click)=\"blockGetProperty.showModal()\">    \n                                <i class=\"fa fa-file\" aria-hidden=\"true\"></i>\n                                <span>Property</span>\n                            </a>\n                            </div>\n                        </div>\n                        <input id=\"message\" autocomplete=\"off\" [(ngModel)]=\"textMessage\" (keyup.enter)=\"setText()\" class=\"chat-input\" type=\"text\" name=\"message\" placeholder=\"Type your message here …\">\n                        <video style=\"width: 100%; height: 100%;\" src=\"{{videoSrc}}\" class=\"video55\" autoplay type=\"video/mp4\" controls></video>\n                        <canvas style=\"display: none;\" width=\"800\" height=\"600\" id=\"canvas\"></canvas>\n    \n                        <button [disabled]=\"(admin?.admin_acl['Closer Lead Management']?.can_update==0 || admin?.permissions?.can_csr_closer==0)\" (click)=\"setText()\" class=\"btn\">Send</button>\n                        \n                    </div>\n                </div>\n    \n            </div>\n        </div>\n    </div>\n\n\n<app-block-get-property #blockGetProperty (itemSelect)=\"sendProperty($event)\"></app-block-get-property>\n\n\n    <div class=\"clearfix\"></div>\n    <div *ngIf=\"parameter?.lead?.sale_rent==1\" class=\"upload-document-block white-bg\">\n        <div class=\"page-title-2 border-0\">\n            <div class=\"row\">\n                <div class=\"col-9\">\n                <h4>Documents</h4>\n                </div>\n                <div class=\"col-3\">\n                <a *ngIf=\"(admin?.admin_acl['Closer Lead Management']?.can_update==1 || admin?.permissions?.can_csr_closer==1); else noDocumentPermission\" class=\"view pull-right\" href=\"javascript://\" (click)=\"updateDocumentChecklist()\">Save</a>\n                <ng-template #noDocumentPermission>\n                    <a class=\"view pull-right\" href=\"javascript://\">Save</a>\n                </ng-template>\n                </div>\n            </div>\n            <table class=\"table\">\n                <tr *ngFor=\"let document of selectedProperties.allDocuments; let i=index\">\n                <td>\n                    <label class=\"cust-check-bx\">{{document.name}}\n                    <input type=\"checkbox\" (click)=\"setValue(i)\" [checked]=\"document.is_selected == 1 ? 'checked' : ''\" name=\"document\">\n                    <span class=\"checkmark\"></span>\n                    </label>\n                </td>\n                </tr>\n            </table>\n        </div>\n    </div>\n    <div *ngIf=\"parameter?.lead?.sale_rent==1\" class=\"all-document-block white-bg\">\n        <div class=\"page-title-2 border-0\">\n        <div class=\"row\">\n        <div class=\"col-9\">\n            <h4>All Documents</h4>\n            <p class=\"p11 marginB0\">From both seller and buyer</p>\n\n            </div>\n            <div class=\"col-3 text-right\">\n                <a *ngIf=\"selectedProperties?.uploaded_documents?.length==0\" (click)=\"noDocumentUploaded()\" class=\"view\" href=\"javascript://\" >View</a>\n                <a *ngIf=\"selectedProperties?.uploaded_documents?.length!=0\" class=\"view\" data-toggle=\"modal\" data-target=\"#uploaded-documents\" href=\"javascript://\" >View</a>\n            </div>\n        </div>\n        </div>\n    </div>\n    </div>\n</div>\n</div>\n\n\n<div class=\"modal\" id=\"uploaded-documents\">\n    <div class=\"modal-dialog \">\n    <div class=\"modal-content notary-avail\">\n        <!-- <div class=\"modal-header modal-header-new\"> -->\n            <div class=\"modal-header modal-header-new\">\n            <h4 class=\"modal-title\">Uploaded Documents</h4>\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n        </div>\n        <div class=\"modal-body\">\n            <table class=\"table\">\n                <tr *ngFor=\"let upDocument of selectedProperties.uploaded_documents\">\n                <td>\n                    <div class=\"n-avail-profile\">\n                        <div class=\"n-avail-info\">\n                            <p class=\"p14 marginB0\" *ngIf=\"upDocument.attachment_name\">{{upDocument.attachment_name}}</p>\n                            <!-- <p class=\"p12\" *ngIf=\"!upDocument.attachment_name\">{{upDocument.attachment.substring(upDocument.attachment.lastIndexOf('/'), upDocument.attachment.length)}}</p> -->\n                            <p class=\"p14 marginB0\" *ngIf=\"!upDocument.attachment_name\">No name</p>\n                        </div>\n                    </div>\n                </td>\n                <td class=\"text-right\">\n                        \n                        <!-- <a target=\"_blank\" href=\"https://docs.google.com/viewer?url={{upDocument.attachment}}\">View</a> -->\n                        <a class=\"green-color\" target=\"_blank\" href=\"{{upDocument.attachment}}\">Download</a>\n                    \n                </td>\n                </tr>\n            </table>\n        </div>\n    </div>\n    </div>\n</div>\n\n<div class=\"modal\" id=\"bank-listing\">\n    <div class=\"modal-dialog \">\n    <div class=\"modal-content notary-avail\">\n        <div class=\"modal-header popup-header\">\n            <h4 class=\"modal-title\">Banks available</h4>\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #hideBanks>&times;</button>\n        </div>\n        <div class=\"modal-body\">\n            <table class=\"table\">\n                <tr *ngFor=\"let bank of parameter.banks\">\n                <td>\n                    <div class=\"n-avail-profile\">\n                        <img [src]=\"bank.image\" onerror='src=\"assets/img/bank.png\"' alt=\"img\">\n                        <div class=\"n-avail-info\">\n                            <p class=\"p12\">{{bank.name}}</p>\n                            <p class=\"p10\">Branch : {{bank.branch ? bank.branch : 'NA'}}</p>\n                        </div>\n                    </div>\n                </td>\n                <td>\n                    <label class=\"cust-check-bx float-right\">\n                    <input type=\"radio\" name=\"bank_id\" (click)=\"assignBank(bank)\">\n                    <span class=\"checkmark\"></span>\n                    </label>\n                </td>\n                </tr>\n                <div  *ngIf=\"parameter.banks?.length==0\" class=\"write-note white-bg\">\n                    <p class=\"show-not-found\">\n                      No bank is available.\n                    </p>\n                </div>\n            </table>\n        </div>\n    </div>\n    </div>\n</div>\n\n<div class=\"modal\" id=\"notary-avail\">\n    <div class=\"modal-dialog \">\n        <div class=\"modal-content notary-avail\">\n            <div class=\"modal-header popup-header\">\n            <h4 class=\"modal-title\">Notaries available</h4>\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #hideNotaries>&times;</button>\n            </div>\n            <div class=\"modal-body\">\n                <table class=\"table\">\n                    <tr *ngFor=\"let item of parameter.items\">\n                        <td>\n                            <div class=\"n-avail-profile\">\n                            <img [src]=\"item.image\" onerror='src=\"assets/img/house.png\"' alt=\"img\">\n                            <div class=\"n-avail-info\">\n                                <p class=\"p12\">{{item.name}}</p>\n                                <p class=\"p10\">Phone : {{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}</p>\n                            </div>\n                            </div>\n                        </td>\n                        <td>\n                            <label class=\"cust-check-bx float-right\">\n                                <input type=\"radio\" name=\"notary_id\" (click)=\"assignNoatary(item)\">\n                                <span class=\"checkmark\"></span>\n                            </label>\n                        </td>\n                    </tr>\n                    <div  *ngIf=\"parameter.items?.length==0\" class=\"write-note white-bg\">\n                        <p class=\"show-not-found\">\n                          No notary is available.\n                        </p>\n                    </div>\n                </table>\n            </div>\n        </div>\n    </div>\n</div>\n\n\n<div class=\"modal animated\" id=\"get-availability1\">\n    <div class=\"modal-dialog fadeIndown\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header modal-header-new\">\n                <h4 class=\"modal-title\">Notary Availabilities</h4>\n                <button type=\"button\" style=\"display: none;\" class=\"close\" data-dismiss=\"modal\" #modalClose1>&times;</button>\n                <button type=\"button\" class=\"close\" (click)=\"closeModal1()\">&times;</button>\n            </div>\n    \n            <div class=\"modal-body modal-body-new\">\n                <div class=\"row\">\n                    <div class=\"col-6\" *ngFor=\"let d of parameter?.lead?.selected_properties[0]?.selected_noatary[0]?.noatary_availability; let j=index\">\n                        <label class=\"notary-ava\">{{d.date_time | moment}}</label>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n\n<div class=\"modal animated\" id=\"get-availability2\">\n    <div class=\"modal-dialog fadeIndown\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header modal-header-new\">\n                <h4 class=\"modal-title\">Schedule Meeting</h4>\n                <button type=\"button\" style=\"display: none;\" class=\"close\" data-dismiss=\"modal\" #modalClose2>&times;</button>\n                <button type=\"button\" class=\"close\" (click)=\"closeModal2()\">&times;</button>\n            </div>\n    \n            <div class=\"modal-body modal-body-new\">\n                <table class=\"table\">\n                    <tr *ngFor=\"let d of parameter?.lead?.selected_properties[0]?.selected_noatary[0]?.noatary_availability; let j=index\">\n                        <td>\n                            <label class=\"notary-ava\">{{d.date_time | moment}}</label>\n                        </td>\n                        <td>\n                            <label class=\"cust-check-bx float-right\">\n                                <input [checked]=\"d.date_time==scheduleMeeting.appointment_date\" type=\"radio\" name=\"notary_id\" (click)=\"addAppointment(d)\">\n                                <span class=\"checkmark\"></span>\n                            </label>\n                        </td>\n                    </tr>\n                    <div *ngIf=\"parameter?.lead?.selected_properties[0]?.selected_noatary[0]?.noatary_availability==null\" class=\"write-note white-bg\">\n                        <p class=\"show-not-found\">\n                            No availability given by notary yet.\n                        </p>\n                    </div>\n                </table>\n            </div>\n    \n        </div>\n    </div>\n</div>\n    \n\n<app-block-get-property #blockGetProperty (itemSelect)=\"sendProperty($event)\"></app-block-get-property>"

/***/ }),

/***/ "../../../../../src/app/layout/leads/csr-closer/csr-closer-detail/csr-closer-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_common_service__ = __webpack_require__("../../../../../src/app/services/common.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_socket_io_client__ = __webpack_require__("../../../../socket.io-client/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_socket_io_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_leads_model__ = __webpack_require__("../../../../../src/app/models/leads.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_chat_model__ = __webpack_require__("../../../../../src/app/models/chat.model.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CsrCloserDetailComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var CsrCloserDetailComponent = /** @class */ (function () {
    function CsrCloserDetailComponent(route, router, admin, cs, constant, selectedProperties, scheduleMeeting, bankModel, notaryModel, model, element) {
        this.route = route;
        this.router = router;
        this.admin = admin;
        this.cs = cs;
        this.constant = constant;
        this.selectedProperties = selectedProperties;
        this.scheduleMeeting = scheduleMeeting;
        this.bankModel = bankModel;
        this.notaryModel = notaryModel;
        this.model = model;
        this.element = element;
        this.parameter = {};
        // meetingDate: any = {
        //   appointment_date: '',
        //   id: ''
        // };
        this.show = false;
        this.conversations = [];
        this.messages = [];
        this.loadingMessages = false;
        this.loadingConversation = false;
        /**************/
        this.editModel = false;
        this.seconds = true;
        this.isActive = true;
        this.imgObj = {
            thumbnail: '',
            original: ''
        };
        this.imgArray = [];
        this.durationInSec = 0;
        this.showVideo = true;
        this.videoObj = {
            thumbnail: '',
            original: ''
        };
        this.chat_admin_sent_as = this.constant.userType.user_buyer;
        this.loadmore = true;
        this.loadmoring = false;
        this.pen_amount = 0;
        this.scrollbarOptions = { axis: 'y', theme: 'dark' };
    }
    CsrCloserDetailComponent.prototype.closeModal1 = function () {
        console.log('close');
        this.modalClose1.nativeElement.click();
    };
    CsrCloserDetailComponent.prototype.closeModal2 = function () {
        console.log('close');
        this.modalClose2.nativeElement.click();
    };
    CsrCloserDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.parameter.sent_as = this.constant.userType.csr_closer;
        this.admin.loginData$.subscribe(function (success) {
            _this.admin_id = success['id'];
        });
        this.route.params.subscribe(function (params) {
            _this.parameter.lead_id = params.id;
            _this.parameter.loading = true;
            _this.admin.postDataApi('leads/details', { lead_id: _this.parameter.lead_id, sent_as: _this.parameter.sent_as }).subscribe(function (r) {
                _this.parameter.loading = false;
                _this.getDocumentOptions();
                _this.parameter.lead = r.data.lead;
                _this.selectedProperties = r.data.lead.selected_properties[0];
                _this.pen_amount = _this.selectedProperties.pending_amount ?
                    _this.selectedProperties.pending_amount :
                    (_this.selectedProperties.total_amount - _this.selectedProperties.token_money);
                _this.parameter.user_id = _this.parameter.lead.user.id;
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
                //       this.scheduleMeeting = this.meetingDate;
                //     }
                //   }
                // }
                // chatting
                _this.chat_buyer = r.data.lead.user;
                _this.chat_seller = r.data.lead.selected_properties[0].property.creator;
                _this.chat_notary = r.data.lead.selected_properties[0].selected_noatary[0] ?
                    r.data.lead.selected_properties[0].selected_noatary[0].noatary : [];
                _this.chat_bank = r.data.lead.selected_properties[0].banks ? r.data.lead.selected_properties[0].banks[0] : [];
                _this.getLeadConversation(_this.constant.userType.user_buyer);
                // this.chat_bank = r.data.lead.banks[0];
                // this.lead.all_documents.map(item=>{
                //   if(this.lead_property.selected_documents.find(f=>item.id == f.id)){
                //     item.selected = true;
                //   }else{
                //     item.selected = false;
                //   }
                // });
            }, function (error) {
                _this.parameter.loading = false;
            });
        });
    };
    CsrCloserDetailComponent.prototype.ngOnDestroy = function () {
        // this.parameter.subscriber.uns
    };
    CsrCloserDetailComponent.prototype.getNotaries = function (property_id) {
        var _this = this;
        this.notaryModel.property_id = property_id;
        this.notaryModel.lead_id = this.parameter.lead_id;
        this.admin.postDataApi('getNoataries', {}).subscribe(function (r) {
            _this.showNotaries.nativeElement.click();
            _this.parameter.items = r.data;
            for (var index = 0; index < _this.parameter.items.length; index++) {
                var element = _this.parameter.items[index];
                var id = _this.selectedProperties.noataries[0] ? _this.selectedProperties.noataries[0].id : 0;
                if (id !== 0 && element.id === id) {
                    _this.parameter.items.splice(index, 1);
                }
            }
        });
    };
    CsrCloserDetailComponent.prototype.assignNoatary = function (notary) {
        var _this = this;
        this.notaryModel.noatary_id = notary.id;
        swal({
            html: this.constant.title.ARE_YOU_SURE + '<br>' + 'You want to assign this notary?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.parameter.loading = true;
                _this.selectedProperties.noataries = [notary];
                _this.admin.postDataApi('leads/assignNoatary', _this.notaryModel).subscribe(function (r) {
                    _this.parameter.loading = false;
                    swal('Success', 'Notary is assigned successfully.', 'success');
                    _this.notaryModel = new __WEBPACK_IMPORTED_MODULE_6__models_leads_model__["d" /* NotaryAssigned */]();
                    _this.hideNotaries.nativeElement.click();
                }, function (error) {
                    _this.parameter.loading = false;
                });
            }
            else if (result.dismiss === 'cancel') {
                // alert('c');
            }
            else {
                // alert('ca');
            }
        }, function (dismiss) {
            // alert('csfd');
        }
        // if(dismiss == 'cancel'){
        //     // function when cancel button is clicked
        // }
        );
    };
    CsrCloserDetailComponent.prototype.getBanks = function (property_id) {
        var _this = this;
        this.bankModel.property_id = property_id;
        this.bankModel.lead_id = this.parameter.lead_id;
        this.admin.postDataApi('getBanks', {}).subscribe(function (r) {
            _this.showBanks.nativeElement.click();
            _this.parameter.banks = r.data;
            for (var index = 0; index < _this.parameter.banks.length; index++) {
                var element = _this.parameter.banks[index];
                var selectedBankId = _this.selectedProperties.banks[0] ? _this.selectedProperties.banks[0].id : 0;
                if (selectedBankId !== 0 && element.id === selectedBankId) {
                    _this.parameter.banks.splice(index, 1);
                }
            }
        });
    };
    CsrCloserDetailComponent.prototype.assignBank = function (bank) {
        var _this = this;
        this.bankModel.bank_id = bank.id;
        swal({
            html: this.constant.title.ARE_YOU_SURE + '<br>' + 'You want to assign this bank?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.parameter.loading = true;
                _this.selectedProperties.banks = [bank];
                _this.admin.postDataApi('leads/assignBank', _this.bankModel).subscribe(function (r) {
                    _this.parameter.loading = false;
                    swal('Success', 'Bank is assigned successfully.', 'success');
                    _this.bankModel = new __WEBPACK_IMPORTED_MODULE_6__models_leads_model__["e" /* BankAssigned */]();
                    _this.hideBanks.nativeElement.click();
                }, function (error) {
                    _this.parameter.loading = false;
                });
            }
        });
    };
    CsrCloserDetailComponent.prototype.setValue = function (i) {
        this.selectedProperties.allDocuments[i].is_selected =
            this.selectedProperties.allDocuments[i].is_selected && this.selectedProperties.allDocuments[i].is_selected === 1 ? 0 : 1;
    };
    CsrCloserDetailComponent.prototype.getDocumentOptions = function () {
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
    CsrCloserDetailComponent.prototype.blockThisLead = function () {
        this.admin.postDataApi('conversation/block', { lead_id: this.id }).subscribe(function (r) {
            // console.log(r);
        });
    };
    CsrCloserDetailComponent.prototype.updateDocumentChecklist = function () {
        var ids = this.selectedProperties.allDocuments.filter(function (d) { return d.is_selected === 1; });
        var documents_ids = ids.map(function (d) { return d.id; });
        // console.log('selected', this.selectedProperties);
        // console.log('ids', ids, documents_ids);
        var input = {
            lead_id: this.parameter.lead_id,
            property_id: this.selectedProperties.property_id,
            documents: documents_ids
        };
        this.admin.postDataApi('leads/updateDocumentChecklist', input).subscribe(function (r) {
            // console.log('updateDocumentChecklist', r);
            swal('Success', 'Updated successfully.', 'success');
        });
    };
    CsrCloserDetailComponent.prototype.noDocumentUploaded = function () {
        swal('Error', 'No document uploaded yet.', 'error');
    };
    CsrCloserDetailComponent.prototype.viewPropertyDetails = function (property) {
        this.cs.setPropertyDetails(property);
        this.router.navigate(['/dashboard/properties/details/' + property.property_id]);
    };
    CsrCloserDetailComponent.prototype.markLeadClose = function () {
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
                _this.admin.postDataApi('leads/closer-mark-lead-closed', { lead_id: _this.parameter.lead_id }).subscribe(function (r) {
                    console.log('r', r);
                    _this.parameter.lead.lead_status_closer = 1;
                    swal('Success', 'Lead closed successfully.', 'success');
                });
            }
        });
    };
    CsrCloserDetailComponent.prototype.selectConversation = function (conversation) {
        var _this = this;
        console.log('con', conversation);
        this.conversations.map(function (con) {
            con.selected = false;
            if (con === conversation) {
                con.selected = true;
                _this.conversation_id = con.id;
            }
        });
        this.conversation = conversation;
        console.log('con id', this.conversation_id);
        var data = {
            conversation_id: this.conversation_id
        };
        this.loadingMessages = true;
        this.admin.postDataApi('conversation/getMessages', data).subscribe(function (res) {
            // console.log(res);
            _this.messages = res['data'];
            _this.loadingMessages = false;
            setTimeout(function () {
                _this.scrollToBottom();
            }, 200);
        }, function (error) {
            _this.loadingMessages = false;
        });
    };
    CsrCloserDetailComponent.prototype.initSocket = function () {
        var _this = this;
        this.socket = __WEBPACK_IMPORTED_MODULE_4_socket_io_client__["connect"](this.admin.socketUrl);
        // this.parameter.socket.on('connect', fun => {
        //   console.log('connect');
        //   console.log('connect', this.parameter.socket);
        //   this.parameter.socket_id = this.parameter.socket.id;
        //   this.parameter.connected = this.parameter.socket.connected;
        //   const data = {
        //     admin_id: this.admin_id,
        //     socket_id: this.parameter.socket_id,
        //     device_id: this.admin.deviceId + '_' + this.admin_id
        //   };
        //   if (this.parameter.connected) {
        //     this.parameter.socket.emit('add-admin', data, (res: any) => {
        //     });
        //     this.parameter.socket.on('message', (response: any) => {
        //       if (response.data.conversation_id === this.parameter.conversation_id) {
        //         this.scrollToBottom();
        //         this.parameter.messages.push(response.data);
        //       }
        //     });
        //   }
        // });
        this.socket.on('connect', function (fun) {
            _this.socket_id = _this.socket.id;
            _this.connected = _this.socket.connected;
            var data = {
                admin_id: _this.admin_id,
                socket_id: _this.socket_id,
                device_id: _this.admin.deviceId + '_' + _this.admin_id
            };
            if (_this.connected) {
                console.log('Socket Connected', _this.socket_id);
                _this.socket.emit('add-admin', data, function (res) {
                    console.log('res', res);
                });
                _this.socket.on('message', function (response) {
                    if (response.data.conversation_id === _this.conversation_id) {
                        console.log('Socket conversation_id');
                        console.log('Socket conversation_id', _this.conversation_id);
                        _this.messages.push(response.data);
                        setTimeout(function () {
                            _this.scrollToBottom();
                        }, 200);
                    }
                });
            }
        });
    };
    CsrCloserDetailComponent.prototype.scrollToBottom = function () {
        if (this.chatWin) {
            $('.chat-area').mCustomScrollbar('scrollTo', 'bottom', { scrollInertia: 0 });
        }
    };
    CsrCloserDetailComponent.prototype.onSelectFile = function (param, event) {
        var _this = this;
        this.optionsButton.nativeElement.click();
        if (event.target.files[0].size > this.constant.fileSizeLimit) {
            swal('Error', this.constant.errorMsg.FILE_SIZE_EXCEEDS, 'error');
            return false;
        }
        var model = new __WEBPACK_IMPORTED_MODULE_7__models_chat_model__["a" /* Chat */];
        model.message = this.textMessage;
        model.message_type = 2;
        model.loading = true;
        // model.uid = Math.random().toString(36).substr(2, 15);
        model.conversation_id = this.conversation_id;
        model.conversation_user = { admin_id: this.admin_id };
        model.updated_at = new Date();
        this.messages.push(model);
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                _this.image = e.target.result;
                model[param] = e.target.result;
                setTimeout(function () {
                    _this.scrollToBottom();
                }, 100);
                _this.cs.saveImage(event.target.files[0]).subscribe(function (success) {
                    model.image = success['data'].image;
                    _this.sendMessage(model);
                });
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };
    CsrCloserDetailComponent.prototype.saveAttachment = function (event) {
        var _this = this;
        this.optionsButton.nativeElement.click();
        if (event.target.files[0].size > this.constant.fileSizeLimit) {
            swal('Error', this.constant.errorMsg.FILE_SIZE_EXCEEDS, 'error');
            return false;
        }
        var model = new __WEBPACK_IMPORTED_MODULE_7__models_chat_model__["a" /* Chat */];
        model.message = this.textMessage;
        model.message_type = 4;
        model.loading = true;
        model.uid = Math.random().toString(36).substr(2, 15);
        model.conversation_id = this.conversation_id;
        model.conversation_user = { admin_id: this.admin_id };
        model.attachment_name = event.target.files[0].name;
        var date = new Date();
        model.updated_at = date;
        this.messages.push(model);
        setTimeout(function () {
            _this.scrollToBottom();
        }, 100);
        this.cs.saveAttachment(event.target.files[0]).subscribe(function (success) {
            model.attachment = success['data'].name;
            // console.log('==>', model);
            _this.sendMessage(model);
        });
    };
    CsrCloserDetailComponent.prototype.playVideo = function (i) {
        this.messages[i].play = true;
    };
    CsrCloserDetailComponent.prototype.showCanvas = function (event) {
        var _this = this;
        this.optionsButton.nativeElement.click();
        if (event.target.files[0].size > this.constant.fileSizeLimit) {
            swal('Error', this.constant.errorMsg.FILE_SIZE_EXCEEDS, 'error');
            return false;
        }
        this.showVideo = true;
        var model = new __WEBPACK_IMPORTED_MODULE_7__models_chat_model__["a" /* Chat */];
        model.message = this.textMessage;
        model.message_type = 3;
        model.loading = true;
        model.uid = Math.random().toString(36).substr(2, 15);
        model.conversation_id = this.conversation_id;
        model.conversation_user = { admin_id: this.admin_id };
        var date = new Date();
        model.updated_at = date;
        this.messages.push(model);
        setTimeout(function () {
            _this.scrollToBottom();
        }, 100);
        setTimeout(function () {
            _this.video = document.getElementById('video1');
            var reader = new FileReader();
            var videoTest = _this.element.nativeElement.querySelector('.video55');
            reader.onload = function (e) {
                var _this = this;
                var src = e.target['result'];
                videoTest.src = src;
                var timer = setInterval(function () {
                    // find duration of video only of video is in ready state
                    if (videoTest.readyState === 4) {
                        _this.durationInSec = videoTest.duration.toFixed(0);
                        // setTimeout(() => {
                        //   // create canvas at middle of video
                        //   this.newcanvas(videoTest, event.target.files[0], model);
                        // }, (this.durationInSec / 2).toFixed(0));
                        setTimeout(function () {
                            // create canvas at middle of video
                            _this.newcanvas(videoTest, event.target.files[0], model);
                        }, 3000);
                        clearInterval(timer);
                    }
                }, 1000);
            }.bind(_this);
            reader.readAsDataURL(event.target.files[0]);
            // setTimeout(() => {
            //   this.newcanvas(videoTest, event.target.files[0]);
            // }, 4000);
        }, 1000);
    };
    CsrCloserDetailComponent.prototype.newcanvas = function (video, videoFile, model) {
        var _this = this;
        var canvas = document.getElementById('canvas');
        // console.log(canvas);
        var ss = canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, canvas.width, canvas.height);
        var ImageURL = canvas.toDataURL('image/jpeg');
        model.image = ImageURL;
        // console.log(model);
        var fileToUpload = this.dataURLtoFile(ImageURL, 'tempFile.png');
        this.cs.saveVideo(videoFile, fileToUpload).subscribe(function (success) {
            // console.log('image', success);
            model.video = success['data'].video;
            model.image = success['data'].thumb;
            _this.sendMessage(model);
        }
        //  error => {
        //   console.log(error);
        // }
        );
    };
    CsrCloserDetailComponent.prototype.dataURLtoFile = function (dataurl, filename) {
        var arr = dataurl.split(',');
        var mime = arr[0].match(/:(.*?);/)[1];
        var bstr = atob(arr[1]);
        var n = bstr.length;
        var u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };
    CsrCloserDetailComponent.prototype.setText = function () {
        if (!this.textMessage) {
            return false;
        }
        else if ((Object.keys(this.admin.admin_acl).length !== 0 && this.admin.admin_acl['Closer Lead Management'].can_update === 0)
            || this.admin.permissions.can_csr_closer === 0) {
            return false;
        }
        else {
            var model = new __WEBPACK_IMPORTED_MODULE_7__models_chat_model__["a" /* Chat */];
            model.message = this.textMessage;
            model.message_type = 1;
            model.conversation_id = this.conversation_id;
            model.conversation_user = { admin_id: this.admin_id };
            model.updated_at = new Date();
            this.messages.push(model);
            // model.loading = true;
            this.textMessage = '';
            this.sendMessage(model);
        }
    };
    CsrCloserDetailComponent.prototype.sendMessage = function (model) {
        var _this = this;
        if (model.message_type === 1 && !model.message) {
            swal('Error', 'Please enter some text.', 'error');
        }
        else {
            setTimeout(function () {
                _this.scrollToBottom();
            }, 100);
            this.admin.postDataApi('conversation/sendMessage', model).subscribe(function (r) {
                if (model.loading === true) {
                    model.loading = false;
                }
            });
        }
    };
    CsrCloserDetailComponent.prototype.uploadDocument = function (event) {
        var file = event.target.files[0];
        var input = new FormData();
        input.append('lead_id', this.params.lead_id);
        input.append('property_id', this.params.property_id);
        input.append('attachment', file);
        input.append('attachment_name', file.name);
        this.admin.postDataApi('uploadDealDocument', input).subscribe(function (r) {
            swal('Success', 'Successfully uploaded the document', 'success');
        });
    };
    CsrCloserDetailComponent.prototype.getLeadConversation = function (admin_sent_as) {
        var _this = this;
        this.chat_admin_sent_as = admin_sent_as;
        if (admin_sent_as === this.constant.userType.user_buyer) {
            this.chat_admin = this.chat_buyer;
        }
        if (admin_sent_as === this.constant.userType.user_seller_dev) {
            this.chat_admin = this.chat_seller;
        }
        if (admin_sent_as === this.constant.userType.notary) {
            this.chat_admin = this.chat_notary;
        }
        if (admin_sent_as === this.constant.userType.bank) {
            this.chat_admin = this.chat_bank;
        }
        console.log('chat_admin', this.chat_admin);
        var data = {
            lead_id: this.parameter.lead_id,
            other_sent_as: admin_sent_as,
            other_id: this.chat_admin.id,
            sent_as: this.constant.userType.csr_closer
        };
        console.log('=========', data);
        this.parameter.loading = true;
        this.admin.postDataApi('conversation/getLeadConversation', data).subscribe(function (r) {
            _this.parameter.loading = false;
            console.log('conversation/getLeadConversation', r);
            if (r['data']) {
                _this.conversation_id = r['data'][0].id;
                _this.initSocket();
                _this.model.conversation_id = _this.conversation_id;
                _this.messages = r['data'][0].messages;
                setTimeout(function () {
                    _this.scrollToBottom();
                }, 100);
            }
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    CsrCloserDetailComponent.prototype.loadMore = function () {
        var _this = this;
        this.loadmoring = true;
        var data = {
            sent_as: 2,
            conversation_id: this.conversation_id,
            lead_id: this.parameter.lead_id,
            last_message_id: this.messages[0].id
        };
        // console.log(data);
        this.admin.postDataApi('conversation/getMessages', data).subscribe(function (res) {
            // console.log(res);
            _this.loadmoring = false;
            if (res['data'].length < 30) {
                _this.loadmore = false;
            }
            _this.messages = res['data'].concat(_this.messages);
        }
        // error => {}
        );
    };
    CsrCloserDetailComponent.prototype.sendProperty = function (property) {
        var model = new __WEBPACK_IMPORTED_MODULE_7__models_chat_model__["a" /* Chat */];
        model.message = property.configuration.name + ' in ' + property.building.name;
        model.message_type = 5;
        model.property_id = property.id;
        model.image = property.image;
        model.property_url = property.property_url;
        model.loading = true;
        model.updated_at = new Date();
        model.uid = Math.random().toString(36).substr(2, 15);
        model.conversation_id = this.conversation_id;
        model.conversation_user = { admin_id: this.admin_id };
        this.messages.push(model);
        this.sendMessage(model);
    };
    CsrCloserDetailComponent.prototype.addAppointment = function (item) {
        var _this = this;
        swal({
            html: this.constant.title.ARE_YOU_SURE + '<br>' + 'You want to schedule this time for meeting?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.scheduleMeeting.lead_id = _this.parameter.lead_id;
                _this.scheduleMeeting.property_id = _this.selectedProperties.property_id;
                _this.scheduleMeeting.appointment_date = item.date_time;
                _this.scheduleMeeting.sent_as = _this.constant.userType.csr_closer;
                if (_this.scheduleMeeting.appointment_date) {
                    _this.scheduleMeeting.id = _this.scheduleMeeting.id;
                }
                _this.admin.postDataApi('leads/addAppointment', _this.scheduleMeeting).subscribe(function (r) {
                    console.log('r', r);
                    _this.scheduleMeeting = r.data;
                    _this.closeModal2();
                    swal('Success', 'Meeting scheduled successfully.', 'success');
                });
            }
        });
    };
    CsrCloserDetailComponent.prototype.updatePropertyAmount = function () {
        var _this = this;
        console.log('11');
        if (this.pen_amount > this.selectedProperties.total_amount && this.pen_amount < 0) {
            swal('Error', 'Incorrect amount entered', 'error');
            return false;
        }
        var input = {
            lead_id: this.parameter.lead_id,
            property_id: this.selectedProperties.property_id,
            pending_amount: this.pen_amount
        };
        this.admin.postDataApi('leads/updatePropertyAmount', input).subscribe(function (r) {
            console.log('r', r);
            _this.showInput = false;
            _this.selectedProperties.pending_amount = _this.pen_amount;
            // this.parameter.lead.lead_status_closer = 1;
            swal('Success', 'Amount updated successfully.', 'success');
        });
    };
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('modalClose1'),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _a : Object)
    ], CsrCloserDetailComponent.prototype, "modalClose1", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('modalClose2'),
        __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _b : Object)
    ], CsrCloserDetailComponent.prototype, "modalClose2", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('showBanks'),
        __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _c : Object)
    ], CsrCloserDetailComponent.prototype, "showBanks", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('hideBanks'),
        __metadata("design:type", typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _d : Object)
    ], CsrCloserDetailComponent.prototype, "hideBanks", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('showNotaries'),
        __metadata("design:type", typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _e : Object)
    ], CsrCloserDetailComponent.prototype, "showNotaries", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('hideNotaries'),
        __metadata("design:type", typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _f : Object)
    ], CsrCloserDetailComponent.prototype, "hideNotaries", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('chatWin'),
        __metadata("design:type", typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _g : Object)
    ], CsrCloserDetailComponent.prototype, "chatWin", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('optionsButton'),
        __metadata("design:type", typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _h : Object)
    ], CsrCloserDetailComponent.prototype, "optionsButton", void 0);
    CsrCloserDetailComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-csr-closer-detail',
            template: __webpack_require__("../../../../../src/app/layout/leads/csr-closer/csr-closer-detail/csr-closer-detail.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/leads/csr-closer/csr-closer-detail/csr-closer-detail.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_6__models_leads_model__["f" /* SelectedProperties */], __WEBPACK_IMPORTED_MODULE_6__models_leads_model__["e" /* BankAssigned */], __WEBPACK_IMPORTED_MODULE_6__models_leads_model__["d" /* NotaryAssigned */], __WEBPACK_IMPORTED_MODULE_7__models_chat_model__["a" /* Chat */], __WEBPACK_IMPORTED_MODULE_6__models_leads_model__["g" /* ScheduleMeeting */]]
        }),
        __metadata("design:paramtypes", [typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"]) === "function" ? _j : Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" ? _k : Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */]) === "function" ? _l : Object, typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_3__services_common_service__["a" /* CommonService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_common_service__["a" /* CommonService */]) === "function" ? _m : Object, typeof (_o = typeof __WEBPACK_IMPORTED_MODULE_5__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__common_constants__["a" /* Constant */]) === "function" ? _o : Object, typeof (_p = typeof __WEBPACK_IMPORTED_MODULE_6__models_leads_model__["f" /* SelectedProperties */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__models_leads_model__["f" /* SelectedProperties */]) === "function" ? _p : Object, typeof (_q = typeof __WEBPACK_IMPORTED_MODULE_6__models_leads_model__["g" /* ScheduleMeeting */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__models_leads_model__["g" /* ScheduleMeeting */]) === "function" ? _q : Object, typeof (_r = typeof __WEBPACK_IMPORTED_MODULE_6__models_leads_model__["e" /* BankAssigned */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__models_leads_model__["e" /* BankAssigned */]) === "function" ? _r : Object, typeof (_s = typeof __WEBPACK_IMPORTED_MODULE_6__models_leads_model__["d" /* NotaryAssigned */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__models_leads_model__["d" /* NotaryAssigned */]) === "function" ? _s : Object, typeof (_t = typeof __WEBPACK_IMPORTED_MODULE_7__models_chat_model__["a" /* Chat */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__models_chat_model__["a" /* Chat */]) === "function" ? _t : Object, typeof (_u = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _u : Object])
    ], CsrCloserDetailComponent);
    return CsrCloserDetailComponent;
}());

//# sourceMappingURL=csr-closer-detail.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/leads/csr-closer/csr-closer.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/leads/csr-closer/csr-closer.component.html":
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<div class=\"container-fluid\">\n    <div class=\"row\" *ngIf=\"admin?.admin_acl['Closer Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n        <div class=\"col-md-4\">\n            <div class=\"form-group\">\n                <p class=\"p16\">Manage CSR Closure's Lead</p>\n                <div class=\"d-flex\">\n                <button (click)=\"removeCsrUser()\" class=\"all-btn\">All</button>\n\n                <div class=\"autocomplete\">\n                <input style=\"max-width:200px\" list=\"amenities\" [(ngModel)]=\"parameter.keyword\" (input)=\"getCsrListing()\" class=\"form-control\" type=\"text\" name=\"keyword\" (focusout)=\"closeCsrListing()\">\n                <div id=\"myInputautocomplete-list\" class=\"autocomplete-items\">\n                    <div *ngFor=\"let item of users\" (click)=\"selectCsrUser(item)\">{{item.email}}</div>\n                </div>\n                </div>\n                \n                </div>\n            </div>\n        </div>\n        <div class=\"col-md-2\">\n            <div class=\"form-group\">\n            <label>Country</label>\n            <select class=\"form-control\" (change)=\"onCountryChange($event.target.value)\">\n                <option value=\"0\">All</option>\n                <option *ngFor=\"let item of location.countries\" [value]=\"item.id\">{{item.name}}</option>\n            </select>\n            </div>\n        </div>\n        <div class=\"col-md-2\">\n            <div class=\"form-group\">\n            <label>State</label>\n            <select class=\"form-control\" (change)=\"onStateChange($event.target.value)\">\n                <option value=\"0\">All</option>\n                <option *ngFor=\"let item of location.states\" [value]=\"item.id\">{{item.name}}</option>\n            </select>\n            </div>\n        </div>\n        <div class=\"col-md-2\">\n            <div class=\"form-group\">\n            <label>City</label>\n                <select class=\"form-control\" (change)=\"onCityChange($event.target.value)\">\n                <option value=\"0\">All</option>\n                <option *ngFor=\"let item of location.cities\" [value]=\"item.id\">{{item.name}}</option>\n                </select>\n            </div>\n        </div>\n        <div class=\"col-md-2\">\n            <div class=\"form-group\">\n            <label>Locality</label>\n            <select class=\"form-control\" (change)=\"onLocalityChange($event.target.value)\">\n                <option value=\"0\">All</option>\n                <option *ngFor=\"let item of location.localities\" [value]=\"item.id\">{{item.name}}</option>\n            </select>\n            </div>\n        </div>\n        </div>\n\n        <!-- <div *ngIf=\"users?.length > 0 && initSelection\"class=\"row\">\n            <table class=\"table table-striped\">\n                <tbody><tr *ngFor=\"let item of users\" (click)=\"selectCsrUser(item)\">\n                    <td> <img class=\"rounded-circle\" [src]=\"item.image\" onerror='this.src=\"http://via.placeholder.com/50x50\"' alt=\"img\"></td>\n                    <td class=\"text-left\">\n                        <span class=\"name\">{{item.name}}</span>\n                    </td>\n                    <td class=\"text-left\">\n                        {{item.phone}}\n                    </td>\n                    <td class=\"text-left\">\n                        {{item.email}}\n                    </td>\n                    <td>\n                        <a href=\"javascript://\" class=\"icon-block edit-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></a>\n                        <a href=\"javascript://\" class=\"icon-block block-icon\"><img src=\"assets/img/block.png\" alt=\"img\"></a>\n                    </td>\n                    </tr>\n                </tbody>\n            </table>\n        </div> -->\n      <div class=\"listingResults\" >\n      <div class=\"row\">\n         <div class=\"col-12\">\n            <div class=\"cust-tabs-2\">\n              <ul class=\"nav nav-tabs\">\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" [ngClass]=\"{'active':parameter.flag==1}\" (click)=\"changeFlag(1)\" >This Week</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" [ngClass]=\"{'active':parameter.flag==2}\" (click)=\"changeFlag(2)\" >This Month</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" [ngClass]=\"{'active':parameter.flag==3}\" (click)=\"changeFlag(3)\" >Last Month</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" [ngClass]=\"{'active':parameter.flag==4}\" (click)=\"changeFlag(4)\" >Lifetime</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" [ngClass]=\"{'active':parameter.flag==5}\" (click)=\"parameter.flag=5\" >Custom</a>\n                </li>\n              </ul>\n            </div>\n         </div>\n         <div class=\"col-12\">\n            <hr style=\"margin-top:0;\">\n            <div *ngIf=\"parameter.flag == 5\" class=\"pull-right btn-cont\">\n                From:<input type=\"date\" [ngModel] =\"parameter.min | date:'yyyy-MM-dd'\" max=\"{{today| date:'yyyy-MM-dd'}}\" (ngModelChange)=\"parameter.min = $event; parameter.max=''\" />\n                To:<input type=\"date\" [ngModel] =\"parameter.max | date:'yyyy-MM-dd'\" min=\"{{parameter.min | date:'yyyy-MM-dd'}}\" max=\"{{today| date:'yyyy-MM-dd'}}\" (ngModelChange)=\"parameter.max = $event\" />\n                <button class=\"btn btn-primary\" href=\"javascript://\" (click)=\"getListing()\" [disabled]=\"\n                parameter.flag == 5 && (!parameter.min || !parameter.max)\n                \">Go</button>\n            </div>\n         </div>\n      </div>\n      <div *ngIf=\"selectedUser as item\" class=\"sigle-row-table\">\n            <table class=\"table table-striped\">\n            <tbody><tr>\n                <td> <img class=\"rounded-circle\" [src]=\"item.image\" onerror='this.src=\"http://via.placeholder.com/50x50\"' alt=\"img\"></td>\n                <td class=\"text-left\">\n                    <span class=\"name\">{{item.name}}</span>\n                </td>\n                <td class=\"text-left\">\n                    {{item.phone}}\n                </td>\n                <td class=\"text-left\">\n                    {{item.email}}\n                </td>\n                <td>\n                    <a (click)=\"removeCsrUser()\" href=\"javascript://\" class=\"icon-block edit-icon\"><img src=\"assets/img/remove-icon.png\" alt=\"remove\" title=\"remove\" /></a>\n                    <!-- <a href=\"javascript://\" class=\"icon-block edit-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></a>\n                    <a href=\"javascript://\" class=\"icon-block block-icon\"><img src=\"assets/img/block.png\" alt=\"img\"></a> -->\n                </td>\n                </tr>\n            </tbody>\n            </table>\n      </div>\n      <div class=\"row\">\n         <div class=\"col-lg-8 col-md-12 col-sm-12 col-12\">\n            <div class=\"info-box all-leads\">\n               <div class=\"row\">\n                  <div class=\"col-md-6 col-sm-6 col-12 bdr-right\" [ngClass]=\"{'active':parameter.count_flag == '1'}\" (click)=\"changeCountFlag(1)\">\n                     <div class=\"one-row \">\n                        <div class=\"o-block\">\n                           <h5>All Leads</h5>\n                           <small>Total</small>\n                        </div>\n                        <div class=\"o-block\">\n                           <a class=\"view-all\" href=\"javascript://\">View All</a>\n                           <h4>{{dash?.lead_total}}</h4>\n                        </div>\n                     </div>\n                  </div>\n                  <div class=\"col-md-6 col-sm-6 col-12\">\n                    <div class=\"two-block\">\n                        <div class=\"d-flex\">\n                            <div class=\"f-block\" [ngClass]=\"{'active':parameter.count_flag == '2'}\" (click)=\"changeCountFlag(2)\">\n                                <h5>Notaries</h5>\n                                <small>Pending</small>\n                                <h3>{{dash?.noatary_pending}}</h3>\n                            </div>\n                            <div class=\"f-block\" [ngClass]=\"{'active':parameter.count_flag == '3'}\" (click)=\"changeCountFlag(3)\">\n                                <h5>Banks</h5>\n                                <small>Pending</small>\n                                <h3>{{dash?.bank_pending}}</h3>\n                            </div>\n                        </div>\n                        \n                        </div>\n                  </div>\n               </div>\n            </div>\n            <div class=\"info-box all-leads\">\n               <div class=\"row\">\n                  <div class=\"col-md-6 col-sm-6 col-12 bdr-right\" [ngClass]=\"{'active':parameter.count_flag == '4'}\" (click)=\"changeCountFlag(4)\">\n                     <div class=\"one-row \">\n                        <div class=\"o-block\">\n                           <h5>Leads</h5>\n                           <small>Open</small>\n                        </div>\n                        <div class=\"o-block\">\n                           <a class=\"view-all\" href=\"javascript://\">View All</a>\n                           <h4>{{dash?.lead_open}}</h4>\n                        </div>\n                     </div>\n                  </div>\n                  <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == '5'}\" (click)=\"changeCountFlag(5)\">\n                     <div class=\"one-row\">\n                        <div class=\"o-block\">\n                           <h5>Leads</h5>\n                           <small>Closed</small>\n                        </div>\n                        <div class=\"o-block\">\n                           <a class=\"view-all\" href=\"javascript://\">View All</a>\n                           <h4>{{dash?.lead_closed}}</h4>\n                        </div>\n                     </div>\n                  </div>\n               </div>\n            </div>\n    \n         </div>\n         <div class=\"col-lg-4 col-md-12 col-sm-12 col-12\">\n            <div class=\"chat-msg all-leads\" style=\"padding:0px\">\n                    <div class=\"padding20\" *ngIf=\"dash.lead_total == 0\">No records found</div>\n                    <ngx-charts-pie-chart [results]=\"chartView\"></ngx-charts-pie-chart>\n            </div>\n         </div>\n      </div>\n      <div class=\"row\">\n         <div class=\"col-12\">\n            <div class=\"spacer40\"></div>\n         </div>\n    \n      </div>\n      <div class=\"row\">\n         <div class=\"col-6\">\n            <div class=\"title-group\">\n               <h5>Leads \n                <span *ngIf=\"parameter.count_flag == 1\">(Total)</span>\n                <span *ngIf=\"parameter.count_flag == 2\">(Notary Pending)</span>\n                <span *ngIf=\"parameter.count_flag == 3\">(Bank Pending)</span>\n                <span *ngIf=\"parameter.count_flag == 4\">(Open)</span>\n                <span *ngIf=\"parameter.count_flag == 5\">(Closed)</span>\n               </h5>\n               <p>\n                   <!-- Showing {{parameter.page}} out of {{parameter.total_count}} -->\n                </p>\n            </div>\n         </div>\n         <div class=\"col-6\">\n            <div class=\"add-new text-right\">\n                <a class=\"btn\" (click)=\"bulkAssign()\" href=\"javascript://\">Bulk Re-assign</a>\n            </div>\n        </div>\n      </div>\n      <div class=\"white-bg\">\n         <div class=\"tabel-section\">\n            <div class=\"table-responsive\">\n                <table class=\"table table-striped\">\n                    <tr>\n                    <th style=\"width:6%\">\n                        <div class=\"table-search\">\n                            <label>All</label>\n                            <div>\n                                <label class=\"cust-check-bx\" >\n                                    <input class=\"width1\" type=\"checkbox\" (click)=\"selectAll(parameter.is_selected)\" name=\"document\">\n                                    <span class=\"checkmark\"></span>\n                                </label>\n                            </div>\n                        </div>\n                    </th>\n                    <!-- <th style=\"width:6%\">&nbsp;</th> -->\n                    <th style=\"width:6%\">\n                        <div class=\"table-search\">\n                            <label>Image</label>\n                            <div class=\"searh-3\">\n                                <!-- <input type=\"Search here\" name=\"name\" [(ngModel)]=\"parameter.name\" (keyup.enter)=\"getListing()\">\n                                <button *ngIf=\"parameter.name\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button> -->\n                            </div>\n                        </div>\n                    </th>\n                    <th style=\"width:18%\">\n                        <div class=\"table-search\">\n                            <label>Name</label>\n                            <div class=\"searh-3\">\n                                <input autocomplete=\"off\" type=\"text\" [(ngModel)]=\"parameter.name\" (keyup.enter)=\"changeFilter('name',$event.target.value)\" name=\"\">\n                                <button *ngIf=\"parameter.name\" (click)=\"changeFilter('name', parameter.name)\"><i class=\"fa fa-search\"></i></button>\n                            </div>\n                        </div>\n                    </th>\n                    <th style=\"width:20%; text-align:left;\">\n                        <div class=\"table-search\">\n                            <label>Contact Number</label>\n                            <div class=\"searh-3\">\n                                <input autocomplete=\"off\" type=\"text\" [(ngModel)]=\"parameter.phone\" (keyup.enter)=\"changeFilter('phone',$event.target.value)\" name=\"\">\n                                <button *ngIf=\"parameter.phone\" (click)=\"changeFilter('phone', parameter.phone)\"><i class=\"fa fa-search\"></i></button>\n                            </div>\n                        </div>\n                    </th>\n                    <th style=\"width:30%\" class=\"border-top-0\">\n                        <div class=\"table-search\">\n                            <label>Property</label>\n                            <!-- <div class=\"searh-3\">\n                                <input type=\"text\" [(ngModel)]=\"parameter.email\" (keyup.enter)=\"changeFilter('email',$event.target.value)\" name=\"\">\n                                <button *ngIf=\"parameter.email\" (click)=\"changeFilter('email', parameter.email)\"><i class=\"fa fa-search\"></i></button>\n                            </div> -->\n                        </div>\n                    </th>\n                    <th style=\"width:10%\" class=\"border-top-0\">\n                        <div class=\"table-search\">\n                            <label>Assignee</label>\n                            <div class=\"searh-3\"></div>\n                        </div>\n                    </th>\n                    <th style=\"width:10%\">\n                        <div class=\"table-search\">\n                            <label>Property For</label>\n                        </div>\n                    </th>\n                    <!-- <th style=\"width:14%\">\n                        &nbsp;\n                    </th> -->\n                </tr>\n                <tr class=\"cursor-pointer\" title=\"Click to view details\" *ngFor=\"let item of items| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: parameter.total }\"\n                    routerLink=\"/dashboard/leads/csr-closers/{{item.id}}\">\n                    <td (click)=\"$event.stopPropagation()\">\n                        <label class=\"cust-check-bx\" >\n                        <input type=\"checkbox\" [(ngModel)]=\"item.selected\" name=\"document\">\n                        <span class=\"checkmark\"></span>\n                        </label>\n                        <!-- <i class=\"fa\" [ngClass]=\"item.selected?'fa-check-square-o':'fa-square-o'\" (click)=\"item.selected = !item.selected\" aria-hidden=\"true\"></i> -->\n                    </td>\n                    <td>\n                        <img class=\"rounded-circle\" [src]=\"item.image\" onerror=\"this.src='assets/img/default_img.png'\" alt=\"img\">\n                    </td>\n                    <td class=\"text-left\">\n                        <span class=\"name\">{{item.name}}</span>\n                    </td>\n                    <td class=\"text-left\">\n                    {{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}<br>\n                    {{item.email}}\n                    </td>\n                    <td class=\"text-left\">\n                    <div class=\"property-selected\">\n                        <p class=\"p14 marginB0\">\n                            {{item?.selected_properties[0]?.property?.configuration.name}}\n                        </p>\n                        <p class=\"p12 marginB0\"><strong>{{item?.selected_properties[0]?.property?.building?.name}}</strong></p>\n                        <p class=\"p11\"><i>{{item?.selected_properties[0]?.property?.building?.developer?.name}}</i></p>\n                    </div>\n                    </td>\n                    <td class=\"text-left\" title=\"CSR Closer\">\n                        {{item.closer.name}}\n                    </td>\n                    <td class=\"text-left\" *ngIf=\"item.sale_rent\">{{item.sale_rent==1 ? 'Buy' : 'Rent'}}</td>\n                    <!-- <td>\n                        <a href=\"javascript://\" title=\"View Details\" routerLink=\"/dashboard/leads/csr-closers/{{item.id}}\" class=\"icon-block edit-icon\"><img src=\"assets/img/viewfull.png\" alt=\"img\"></a>\n                    </td> -->\n                </tr>\n            </table>\n            <div class=\"padding20 center\" *ngIf=\"parameter.noResultFound\">\n                <img src=\"assets/img/404-error.png\">\n            </div>\n            </div>\n         </div>\n    \n      </div>\n      </div>\n\n\n      <div class=\"btn-cont text-right marginT15\" *ngIf=\"parameter.total\">\n            <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n        </div>\n    </div>\n    \n\n    <!-- Assignment model -->\n<a data-toggle=\"modal\" data-target=\"#assign-model\" #openAssignModel></a>\n<div class=\"modal\" id=\"assign-model\">\n        <div class=\"modal-dialog \">\n            <div class=\"modal-content notary-avail\">\n                <div class=\"modal-header popup-header\">\n                <h4 class=\"modal-title\">Re Assign to</h4>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #closeAssignModel>&times;</button>\n                </div>\n                <div class=\"modal-body\">\n                    <div class=\"row\">\n                        <div class=\"col-md-8\">\n                            <input style=\"max-width:200px\" list=\"amenities\" [(ngModel)]=\"assign.keyword\" (input)=\"getAssignListing()\" class=\"form-control\" type=\"text\" name=\"keyword\" placeholder=\"Search\">\n                        </div>\n                        <div class=\"col-md-4 btn-cont\">\n                            <a class=\"btn btn-primary pull-right\" href=\"javascript://\" (click)=\"assignNow()\">Assign</a>\n                        </div>\n                    </div>\n                    <div class=\"spacer40\"></div>\n                    <table class=\"table\">\n                        <tr *ngFor=\"let item of assign.items\">\n                            <td *ngIf=\"item.is_blocked!=1\">\n                                <div class=\"n-avail-profile\">\n                                <img [src]=\"item.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\">\n                                <div class=\"n-avail-info\">\n                                    <p class=\"p12\">{{item.name}}</p>\n                                    <p class=\"p10\">Phone : {{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}</p>\n                                </div>\n                                </div>\n                            </td>\n                            <td *ngIf=\"item.is_blocked!=1\">\n                                <label class=\"cust-check-bx float-right\">\n                                    <input type=\"radio\" name=\"notary_id\" (click)=\"assignItem = item\">\n                                    <span class=\"checkmark\"></span>\n                                </label>\n                            </td>\n                        </tr>\n                    </table>\n                </div>\n            </div>\n        </div>\n    </div>"

/***/ }),

/***/ "../../../../../src/app/layout/leads/csr-closer/csr-closer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CsrCloserComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CsrCloserComponent = /** @class */ (function () {
    function CsrCloserComponent(admin, constant, route) {
        this.admin = admin;
        this.constant = constant;
        this.route = route;
        this.parameter = {};
        this.location = {};
        this.assign = {};
        this.items = [];
        this.today = new Date();
        this.users = [];
        this.initSelection = false;
        this.dash = {
            lead_total: 0,
            noatary_pending: 0,
            bank_pending: 0,
            lead_open: 0,
            lead_closed: 0
        };
        this.chartView = [];
    }
    CsrCloserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.parameter.is_selected = false;
        this.parameter.keyword = '';
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        this.parameter.flag = 2;
        this.parameter.total = 0;
        this.parameter.count_flag = 1;
        this.route.params.subscribe(function (params) {
            _this.parameter.assignee_id = params.id;
        });
        this.getCountries();
        this.getListing();
        this.getCsrSellerDash();
        Object.assign(this, this.chartView);
    };
    CsrCloserComponent.prototype.getCountries = function () {
        var _this = this;
        this.admin.postDataApi('getCountryLocality', {}).subscribe(function (r) {
            console.log('Country', r);
            _this.location.countries = r['data'];
        });
    };
    CsrCloserComponent.prototype.onCountryChange = function (id) {
        console.log(id);
        this.location.states = [];
        this.parameter.state_id = '0';
        this.location.cities = [];
        this.parameter.city_id = '0';
        this.location.localities = [];
        this.parameter.locality_id = '0';
        if (!id || id === '0') {
            this.parameter.state_id = '0';
            return false;
        }
        this.parameter.country_id = id;
        var selectedCountry = this.location.countries.filter(function (x) { return x.id.toString() === id; });
        this.location.states = selectedCountry[0].states;
    };
    CsrCloserComponent.prototype.onStateChange = function (id) {
        console.log(id);
        this.location.cities = [];
        this.parameter.city_id = '0';
        this.location.localities = [];
        this.parameter.locality_id = '0';
        if (!id || id === '0') {
            this.parameter.city_id = '0';
            return false;
        }
        this.parameter.state_id = id;
        var selectedState = this.location.states.filter(function (x) { return x.id.toString() === id; });
        this.location.cities = selectedState[0].cities;
    };
    CsrCloserComponent.prototype.onCityChange = function (id) {
        console.log(id);
        this.location.localities = [];
        this.parameter.locality_id = '0';
        if (!id || id === '0') {
            this.parameter.locality_id = '0';
            return false;
        }
        this.parameter.city_id = id;
        var selectedCountry = this.location.cities.filter(function (x) { return x.id.toString() === id; });
        this.location.localities = selectedCountry[0].localities;
    };
    CsrCloserComponent.prototype.onLocalityChange = function (id) {
        console.log(id);
        if (!id || id === '0') {
            return false;
        }
        this.parameter.locality_id = id;
        this.getCsrListing();
    };
    CsrCloserComponent.prototype.changeFlag = function (flag) {
        this.parameter.flag = flag;
        this.parameter.count_flag = 1;
        this.getListing();
        this.getCsrSellerDash();
    };
    CsrCloserComponent.prototype.changeFilter = function (key, value) {
        this.parameter[key] = value;
        this.getListing();
    };
    CsrCloserComponent.prototype.changeCountFlag = function (flag) {
        this.parameter.count_flag = flag;
        this.getListing();
    };
    CsrCloserComponent.prototype.getCsrListing = function () {
        var _this = this;
        this.initSelection = true;
        this.users = [];
        var input = new FormData();
        if (this.parameter.keyword) {
            input.append('keyword', this.parameter.keyword);
        }
        if (this.parameter.country_id && this.parameter.country_id !== '-1') {
            input.append('countries', JSON.stringify([this.parameter.country_id]));
        }
        if (this.parameter.state_id && this.parameter.state_id !== '-1') {
            input.append('states', JSON.stringify([this.parameter.state_id]));
        }
        if (this.parameter.city_id && this.parameter.city_id !== '-1') {
            input.append('cities', JSON.stringify([this.parameter.city_id]));
        }
        if (this.parameter.locality_id && this.parameter.locality_id !== '-1') {
            input.append('localities', JSON.stringify([this.parameter.locality_id]));
        }
        this.admin.postDataApi('getCsrClosers', input).subscribe(function (success) {
            _this.users = success.data;
        });
    };
    CsrCloserComponent.prototype.closeCsrListing = function () {
        var _this = this;
        setTimeout(function () {
            _this.users = [];
        }, 200);
    };
    CsrCloserComponent.prototype.selectCsrUser = function (user) {
        this.selectedUser = user;
        this.users = [];
        this.parameter.keyword = '';
        this.initSelection = false;
        this.getListing();
        this.getCsrSellerDash();
    };
    CsrCloserComponent.prototype.removeCsrUser = function () {
        this.selectedUser = '';
        this.parameter.keyword = '';
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        // this.parameter.flag = 2;
        this.parameter.total = 0;
        this.parameter.count_flag = 1;
        this.getListing();
        this.getCsrSellerDash();
    };
    CsrCloserComponent.prototype.getCsrSellerDash = function () {
        var _this = this;
        var input = new FormData();
        if (this.selectedUser) {
            input.append('assignee_id', this.selectedUser.id);
        }
        else if (this.parameter.assignee_id) {
            input.append('assignee_id', this.parameter.assignee_id);
        }
        if (this.parameter.flag) {
            input.append('flag', this.parameter.flag.toString());
        }
        this.admin.postDataApi('leads/csr-closer-dash-count', input).subscribe(function (r) {
            _this.dash = r.data;
            _this.chartView = [
                {
                    'name': 'Noataries Pending',
                    'value': parseInt(_this.dash.noatary_pending, 10)
                },
                {
                    'name': 'Bank Pending',
                    'value': parseInt(_this.dash.bank_pending, 10)
                },
                {
                    'name': 'Lead open',
                    'value': parseInt(_this.dash.lead_open, 10)
                },
                {
                    'name': 'Lead closed',
                    'value': parseInt(_this.dash.lead_closed, 10)
                }
            ];
        });
    };
    CsrCloserComponent.prototype.getListing = function () {
        var _this = this;
        this.users = [];
        this.parameter.noResultFound = false;
        var input = JSON.parse(JSON.stringify(this.parameter));
        if (this.selectedUser) {
            input.assignee_id = this.selectedUser.id;
        }
        else if (this.parameter.assignee_id) {
            input.assignee_id = this.parameter.assignee_id;
        }
        this.parameter.loading = true;
        this.admin.postDataApi('leads/csr-closer', input).subscribe(function (success) {
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
    CsrCloserComponent.prototype.getPage = function (page) {
        this.parameter.page = page;
        this.getListing();
    };
    CsrCloserComponent.prototype.sort_by = function (sort_by_flag) {
        if (this.parameter.sort_by_flag !== sort_by_flag) {
            this.parameter.sort_by_flag = sort_by_flag;
            this.parameter.sort_by_order = 0;
        }
        else {
            this.parameter.sort_by_order = this.parameter.sort_by_order ? 0 : 1;
        }
        this.getListing();
    };
    CsrCloserComponent.prototype.selectAll = function (is_selected) {
        var _this = this;
        this.parameter.is_selected = !is_selected;
        this.items.forEach(function (item) {
            item.selected = _this.parameter.is_selected;
        });
    };
    CsrCloserComponent.prototype.bulkAssign = function () {
        // this.assign.keyword = '';
        var leads_ids = this.items.filter(function (x) { return x.selected; }).map(function (y) { return y.id; });
        if (leads_ids.length === 0) {
            swal('Error', 'Please choose atleast one lead.', 'error');
            return false;
        }
        this.openAssignModel.nativeElement.click();
        // this.admin.postDataApi('getCsrClosers', {}).subscribe(
        //   success => {
        //     this.assign.items = success.data;
        //   });
    };
    CsrCloserComponent.prototype.getAssignListing = function () {
        var _this = this;
        // this.assign.items = [];
        var input = {
            keyword: this.assign.keyword
        };
        this.admin.postDataApi('getCsrClosers', input).subscribe(function (success) {
            _this.assign.items = success.data;
        });
    };
    CsrCloserComponent.prototype.assignNow = function () {
        var _this = this;
        var leads_ids = this.items.filter(function (x) { return x.selected; }).map(function (y) { return y.id; });
        var input = {
            closer_id: this.assignItem.id,
            leads: leads_ids
        };
        this.parameter.loading = true;
        this.admin.postDataApi('leads/bulkAssignCloser', input).subscribe(function (r) {
            _this.parameter.loading = false;
            swal('Success', 'Assigned successfully', 'success');
            _this.closeAssignModel.nativeElement.click();
            console.log(r);
            _this.getListing();
        }, function (error) {
            _this.parameter.loading = false;
            _this.closeAssignModel.nativeElement.click();
            swal('Error', error.error.message, 'error');
        });
    };
    var _a, _b, _c, _d, _e;
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('openAssignModel'),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _a : Object)
    ], CsrCloserComponent.prototype, "openAssignModel", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('closeAssignModel'),
        __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _b : Object)
    ], CsrCloserComponent.prototype, "closeAssignModel", void 0);
    CsrCloserComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-csr-closer',
            template: __webpack_require__("../../../../../src/app/layout/leads/csr-closer/csr-closer.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/leads/csr-closer/csr-closer.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_2__common_constants__["a" /* Constant */]]
        }),
        __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" ? _c : Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__common_constants__["a" /* Constant */]) === "function" ? _d : Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["ActivatedRoute"]) === "function" ? _e : Object])
    ], CsrCloserComponent);
    return CsrCloserComponent;
}());

//# sourceMappingURL=csr-closer.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/leads/csr-seller/csr-seller-detail/csr-seller-detail.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/leads/csr-seller/csr-seller-detail/csr-seller-detail.component.html":
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-md-4\">\n      <div class=\"form-group\">\n      <p class=\"p16\">Manage Properties</p>\n      <!-- <div class=\"d-flex\">\n      <button class=\"all-btn\">All</button>\n      <input style=\"max-width:200px\" class=\"form-control\" type=\"text\" name=\"\">\n      </div> -->\n      </div>\n    </div>\n    <div class=\"col-md-2\">\n  <div class=\"form-group\">\n  <label>Country</label>\n    <select class=\"form-control\" (change)=\"onCountryChange($event.target.value)\">\n      <option value=\"0\">All</option>\n      <option *ngFor=\"let item of location.countries\" [value]=\"item.id\">{{item.name}}</option>\n    </select>\n  </div>\n  </div>\n  <div class=\"col-md-2\">\n  <div class=\"form-group\">\n  <label>State</label>\n    <select class=\"form-control\" (change)=\"onStateChange($event.target.value)\">\n      <option value=\"0\">All</option>\n      <option *ngFor=\"let item of location.states\" [value]=\"item.id\">{{item.name}}</option>\n    </select>\n  </div>\n  </div>\n  <div class=\"col-md-2\">\n    <div class=\"form-group\">\n    <label>City</label>\n      <select class=\"form-control\" (change)=\"onCityChange($event.target.value)\">\n        <option value=\"0\">All</option>\n        <option *ngFor=\"let item of location.cities\" [value]=\"item.id\">{{item.name}}</option>\n      </select>\n    </div>\n  </div>\n\n  <div class=\"col-md-2\">\n  <div class=\"form-group\">\n  <label>Locality</label>\n  <select class=\"form-control\" (change)=\"onLocalityChange($event.target.value)\">\n      <option value=\"0\">All</option>\n      <option *ngFor=\"let item of location.localities\" [value]=\"item.id\">{{item.name}}</option>\n    </select>\n  </div>\n  </div>\n  </div>\n\n  <div class=\"row\">\n        <div class=\"col-md-12\">\n            <div class=\"cust-tabs-2\">\n              <ul class=\"nav nav-tabs float-right\">\n                  <li class=\"nav-item\">\n                    <a [ngClass]=\"{'active':parameter.dash_flag == 1}\" (click)=\"parameter.dash_flag=1;getListing()\" class=\"nav-link\" data-toggle=\"tab\" href=\"#tw\">This Week</a>\n                  </li>\n                  <li class=\"nav-item\">\n                    <a [ngClass]=\"{'active':parameter.dash_flag == 2}\" (click)=\"parameter.dash_flag=2;getListing()\" class=\"nav-link\" data-toggle=\"tab\" href=\"#tm\">This Month</a>\n                  </li>\n                  <li class=\"nav-item\">\n                    <a [ngClass]=\"{'active':parameter.dash_flag == 3}\" (click)=\"parameter.dash_flag=3;getListing()\" class=\"nav-link\" data-toggle=\"tab\" href=\"#lm\">Last Month</a>\n                  </li>\n                  <li class=\"nav-item\">\n                    <a [ngClass]=\"{'active':parameter.dash_flag == 4}\" (click)=\"parameter.dash_flag=4;getListing()\" class=\"nav-link\" data-toggle=\"tab\" href=\"#lt\">Lifetime</a>\n                  </li>\n                  <li class=\"nav-item\">\n                    <a [ngClass]=\"{'active':parameter.dash_flag == 5}\" (click)=\"parameter.dash_flag=5;getListing()\" class=\"nav-link\" data-toggle=\"tab\" href=\"#cust\">Custom</a>\n                  </li>\n              </ul>\n            </div>\n        </div>\n        <div class=\"col-12\">\n            <hr style=\"margin-top:0;\">\n        </div>\n      </div>\n\n      <div class=\"cust-tabs\">\n      <div class=\"row flex-wrap-reverse\">\n          \n      <div class=\"col-xl-10 col-lg-12 col-md-12 col-sm-12 col-12\">\n        <ul class=\"nav nav-tabs\">\n            <li class=\"nav-item\">\n              <a [ngClass]=\"{'active':parameter.flag==3}\" (click)=\"changeFlag(3)\" class=\"nav-link\" >Approved</a>\n            </li>\n            <li class=\"nav-item\">\n              <a [ngClass]=\"{'active':parameter.flag==4}\" (click)=\"changeFlag(4)\" class=\"nav-link\" >Unapproved</a>\n            </li>\n            <li class=\"nav-item\">\n              <a [ngClass]=\"{'active':parameter.flag==2}\" (click)=\"changeFlag(2)\" class=\"nav-link\" >Pending Review</a>\n            </li>\n            <li class=\"nav-item\">\n              <a [ngClass]=\"{'active':parameter.flag==1}\" (click)=\"changeFlag(1)\" class=\"nav-link\" >In Draft</a>\n            </li>\n        </ul>\n        </div>\n        <div class=\"col-xl-2 col-lg-12 col-md-12 col-sm-12 col-12\"><div class=\"add-new text-left\">\n              <a *ngIf=\"admin?.admin_acl['Property Management']?.can_create==1 || admin?.permissions?.can_csr_seller==1\" class=\"btn\" href=\"javascript://\" routerLink=\"/dashboard/properties/add-property/0/{{parameter.seller_id}}\">+Add New Property</a>\n            </div></div>\n            </div>\n        <div class=\"tab-content white-bg\">\n            <div class=\"tab-pane active\">\n              <div class=\"tabel-section\">\n                  <div class=\"table-responsive\">\n                    <table class=\"table table-striped table-align-left\">\n                        <tr>\n                          <th style=\"width:15%; text-align:left;\">\n                              <div class=\"table-search\">\n                                <label>Name of Building</label>\n                                <div class=\"searh-3\">\n                                  <input type=\"text\" [(ngModel)]=\"parameter.keyword\" (keyup.enter)=\"getListing()\" >\n                                  <button *ngIf=\"parameter.keyword\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                                </div>\n                              </div>\n                          </th>\n                          <th style=\"width:15%; text-align:left;\">\n                              <div class=\"table-search\">\n                                <label>Configuration</label>\n                                <select [(ngModel)]=\"parameter.configuration_id\" (change)=\"getListing()\">\n                                  <option value=\"0\">All configuration</option>\n                                  <option *ngFor=\"let c of configurations\" value=\"{{c.id}}\" >\n                                    {{c.name}}\n                                  </option>\n                                </select>\n                              </div>\n                          </th>\n                          <th style=\"width:20%; text-align:left;\">\n                              <div class=\"table-search\">\n                                  <label>Address</label>\n                                  <div class=\"searh-3\">\n                                    <input type=\"text\" [(ngModel)]=\"parameter.address\" (keyup.enter)=\"getListing()\" >\n                                    <button *ngIf=\"parameter.address\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                                  </div>\n                              </div>\n                          </th>\n                          <th style=\"width:10%; text-align:left;\">\n                              <div class=\"table-search\">\n                                <label>Sell / Rent</label>\n                                <select [(ngModel)]=\"parameter.property_for\" (change)=\"getListing()\" style=\"width:100px;\">\n                                  <option value=\"\">All</option>\n                                  <option value=\"1\">Sell</option>\n                                  <option value=\"2\">Rent</option>\n                                </select>\n                              </div>\n                          </th>\n                          <th style=\"width:6%; vertical-align:top;\">\n                              <div (click)=\"sort_by(1)\" class=\"d-flex pointer\"><span>Price</span>\n                              <a href=\"javascript://\"><img [ngClass]=\"{'upsidedown':parameter.sort_by==1 && parameter.sort_by_order==1}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a></div>\n                          </th>\n                          <th style=\"width:6%; vertical-align:top;\">\n                              <div (click)=\"sort_by(2)\" class=\"d-flex pointer\"><span>Availability</span>\n                              <a href=\"javascript://\"><img [ngClass]=\"{'upsidedown':parameter.sort_by==2 && parameter.sort_by_order==1}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n                              </div>\n                          </th>\n                          <th style=\"width:6%; vertical-align:top;\">\n                              <div (click)=\"sort_by(3)\" class=\"d-flex pointer\"><span>Leads</span>\n                              <a href=\"javascript://\"><img [ngClass]=\"{'upsidedown':parameter.sort_by==3 && parameter.sort_by_order==1}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a></div>\n                          </th>\n                          <th style=\"width:22%\">&nbsp;</th>\n                        </tr>\n                  \n                        <tr *ngFor=\"let p of items | paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: total }\">\n                            <td>\n                              <strong>{{p?.building?.name}}</strong>\n                              <div class=\"clearfix\"></div>\n                              <small *ngIf=\"p.quantity > 0\">\n                              {{p.quantity}} \n                              <span *ngIf=\"p.quantity == 1\">property</span>\n                              <span *ngIf=\"p.quantity > 1\">properties</span>\n                            </small>                                     \n\n                            </td>\n                            <td><span *ngIf=\"p && p.configuration\">{{p.configuration?.name}}</span></td>\n                            <td><span>{{p?.building?.address}}</span></td>\n                            <td>\n                              <span *ngIf=\"p.for_sale\">Sell</span>\n                              <span *ngIf=\"p.for_rent\">Rent</span>\n                            </td>\n                            <td><span>{{p.min_price}}</span></td>\n                            <td><span class=\"green-color\">\n                              <span *ngIf=\"p.for_sale\">Sell</span>\n                              <span *ngIf=\"p.for_rent\">Rent</span></span>\n                            </td>\n                            <td><span>{{p.lead_properties_count}}</span></td>\n                            <td>\n                              <div class=\"message\">\n                                <button [disabled]=\"admin?.admin_acl['Property Management']?.can_update==0\" *ngIf=\"parameter?.flag!=3\" routerLink=\"/dashboard/properties/edit-property/{{p.id}}\" title=\"Edit Details\" class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></button>\n                                <button [disabled]=\"admin?.admin_acl['Property Management']?.can_update==0\" *ngIf=\"parameter?.flag==3\" routerLink=\"/dashboard/properties/edit-property/{{p.id}}/edit\" title=\"Edit Details\" class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></button>\n                                <button [disabled]=\"admin?.admin_acl['Property Management']?.can_delete==0\" *ngIf=\"!p.is_blocked\" (click)=\"block(p);\" class=\"action-icon\" title=\"Block\"><img src=\"assets/img/block.png\" alt=\"img\"></button>\n                                <button [disabled]=\"admin?.admin_acl['Property Management']?.can_delete==0\" *ngIf=\"p.is_blocked == true\" (click)=\"unblock(p);\" class=\"action-icon unblock-bg\" title=\"UnBlock\"><img src=\"assets/img/unblock.png\" alt=\"img\"></button>\n                                <button [disabled]=\"admin?.admin_acl['Property Management']?.can_update==0\" *ngIf=\"p.status == 3\" (click)=\"changeStatus(p,2);\" class=\"action-icon\" title=\"Unapprove\"><img src=\"assets/img/tick-selected.png\" alt=\"img\"></button>\n                                <button [disabled]=\"admin?.admin_acl['Property Management']?.can_update==0\" *ngIf=\"p.status == 2\" (click)=\"changeStatus(p,3);\" class=\"action-icon\" title=\"Approve\"><img src=\"assets/img/tick.png\" alt=\"img\"></button>\n                              </div>\n\n                            </td>\n                        </tr>\n                        <!-- <tr *ngIf=\"parameter.loading == false && total == 0\">\n                          <td colspan=\"10\">\n                            <img src=\"assets/img/404-error.png\">\n                          </td>\n                        </tr> -->\n                    </table>\n                    <div class=\"padding20 center\" *ngIf=\"parameter.loading == false && total == 0\">\n                      <img src=\"assets/img/404-error.png\">\n                    </div>\n                  </div>\n              </div>\n              <!-- <div class=\"btn-cont text-right marginT15\">\n                  <button class=\"btn btn-secondary\">View All</button>\n              </div> -->\n              <!-- <div class=\"spacer30\"></div>\n\n              <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls> -->\n\n\n            </div>\n            <div class=\"tab-pane container fade\" id=\"seller\">Seller tab on</div>\n        </div>\n      </div>\n      <div class=\"btn-cont text-right marginT15\" *ngIf=\"parameter.total\">\n          <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n      </div>\n  </div>"

/***/ }),

/***/ "../../../../../src/app/layout/leads/csr-seller/csr-seller-detail/csr-seller-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CsrSellerDetailComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CsrSellerDetailComponent = /** @class */ (function () {
    function CsrSellerDetailComponent(constant, route, admin) {
        this.constant = constant;
        this.route = route;
        this.admin = admin;
        this.parameter = {};
        this.location = {};
        this.items = [];
        this.total = 0;
        this.configurations = [];
        this.price_sort = 1;
        this.availability_sort = 1;
        this.lead_sort = 1;
    }
    CsrSellerDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.parameter.seller_id = params.id;
            _this.parameter.itemsPerPage = _this.constant.itemsPerPage;
            _this.parameter.page = _this.constant.p;
            _this.parameter.dash_flag = 2;
            _this.parameter.flag = 3;
            _this.parameter.property_for = '';
            _this.getCountries();
            _this.getPropertyConfigurations();
            _this.getListing();
        });
    };
    CsrSellerDetailComponent.prototype.getListing = function () {
        var _this = this;
        this.parameter.loading = true;
        this.items = [];
        this.parameter.noResultFound = false;
        this.admin.postDataApi('propertyHome', this.parameter).subscribe(function (success) {
            _this.items = success.data;
            if (_this.items.length <= 0) {
                _this.parameter.noResultFound = true;
            }
            _this.total = success.total_count;
            _this.parameter.loading = false;
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    CsrSellerDetailComponent.prototype.getCountries = function () {
        var _this = this;
        this.admin.postDataApi('getCountryLocality', {}).subscribe(function (r) {
            _this.location.countries = r['data'];
        });
    };
    CsrSellerDetailComponent.prototype.getPropertyConfigurations = function () {
        var _this = this;
        this.admin.postDataApi('getPropertyConfigurations', {}).subscribe(function (r) {
            _this.configurations = r['data'];
        });
    };
    CsrSellerDetailComponent.prototype.onCountryChange = function (id) {
        this.location.states = [];
        this.parameter.state_id = '0';
        this.location.cities = [];
        this.parameter.city_id = '0';
        this.location.localities = [];
        this.parameter.locality_id = '0';
        this.parameter.state_id = '';
        if (!id || id === '0') {
            this.parameter.state_id = '0';
            this.location.states = [];
            return false;
        }
        this.parameter.country_id = id;
        var selectedCountry = this.location.countries.filter(function (x) { return x.id.toString() === id; });
        this.location.states = selectedCountry[0].states;
    };
    CsrSellerDetailComponent.prototype.onStateChange = function (id) {
        this.location.cities = [];
        this.parameter.city_id = '0';
        this.location.localities = [];
        this.parameter.locality_id = '0';
        this.parameter.city_id = '';
        if (!id || id === '0') {
            this.parameter.city_id = '0';
            this.location.cities = [];
            return false;
        }
        this.parameter.state_id = id;
        var selectedState = this.location.states.filter(function (x) { return x.id.toString() === id; });
        this.location.cities = selectedState[0].cities;
    };
    CsrSellerDetailComponent.prototype.onCityChange = function (id) {
        this.location.localities = [];
        this.parameter.locality_id = '0';
        this.parameter.locality_id = '';
        if (!id || id === '0') {
            this.parameter.locality_id = '0';
            return false;
        }
        this.parameter.city_id = id;
        var selectedCountry = this.location.cities.filter(function (x) { return x.id.toString() === id; });
        this.location.localities = selectedCountry[0].localities;
    };
    CsrSellerDetailComponent.prototype.onLocalityChange = function (id) {
        if (!id || id === '0') {
            return false;
        }
        this.parameter.locality_id = id;
        this.getListing();
    };
    CsrSellerDetailComponent.prototype.changeFlag = function (flag) {
        this.parameter.flag = flag;
        this.getListing();
    };
    CsrSellerDetailComponent.prototype.sort_by = function (sort_by) {
        if (this.parameter.sort_by !== sort_by) {
            this.parameter.sort_by = sort_by;
            this.parameter.sort_by_order = 0;
        }
        else {
            this.parameter.sort_by_order = this.parameter.sort_by_order ? 0 : 1;
        }
        this.getListing();
    };
    CsrSellerDetailComponent.prototype.getPage = function (page) {
        this.parameter.page = page;
        this.getListing();
    };
    CsrSellerDetailComponent.prototype.block = function (item) {
        item.is_blocked = true;
        this.admin.postDataApi('blockProperty', { property_id: item.id, flag: 1 }).subscribe(function (r) {
            swal('Success', 'Property blocked successfully', 'success');
        }, function (error) {
            swal('Error', error.error.message, 'error');
        });
    };
    CsrSellerDetailComponent.prototype.unblock = function (item) {
        item.is_blocked = false;
        this.admin.postDataApi('blockProperty', { property_id: item.id, flag: 0 }).subscribe(function (r) {
            swal('Success', 'Property unblocked successfully', 'success');
        }, function (error) {
            swal('Error', error.error.message, 'error');
        });
    };
    CsrSellerDetailComponent.prototype.changeStatus = function (item, status) {
        item.status = status;
        this.admin.postDataApi('updatePropertyStatus', { property_id: item.id, status_id: status }).subscribe(function (r) {
            swal('Success', 'Property status changed', 'success');
        }, function (error) {
            swal('Error', error.error.message, 'error');
        });
    };
    var _a, _b, _c;
    CsrSellerDetailComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-csr-seller-detail',
            template: __webpack_require__("../../../../../src/app/layout/leads/csr-seller/csr-seller-detail/csr-seller-detail.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/leads/csr-seller/csr-seller-detail/csr-seller-detail.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__common_constants__["a" /* Constant */]) === "function" ? _a : Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["ActivatedRoute"]) === "function" ? _b : Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" ? _c : Object])
    ], CsrSellerDetailComponent);
    return CsrSellerDetailComponent;
}());

//# sourceMappingURL=csr-seller-detail.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/leads/csr-seller/csr-seller-detail/seller-chat/seller-chat.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/leads/csr-seller/csr-seller-detail/seller-chat/seller-chat.component.html":
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<div class=\"row\">\n    <div class=\"col-lg-4 col-md-4 col-sm-12 col-12\">\n      <div malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\" class=\"chat-name-list white-bg\">\n         <div *ngIf=\"loadingConversation\" class=\"chat-window white-bg\"><img style=\"width:100%\" src=\"assets/img/loading_content.gif\"></div>\n         <div *ngIf=\"!loadingConversation && conversations.length == 0\" class=\"padding20\">No conversation found</div>\n         <a *ngFor=\"let con of conversations\" [ngClass]=\"{'active':con.selected == true}\" href=\"javascript://\">\n            <div class=\"profile\" (click)=\"selectConversation(con, '')\">\n               <div class=\"fig-block\">\n                  <img [src]=\"con.image\" onerror='src=\"http://via.placeholder.com/62x62\"' alt=\"img\" />\n               </div>\n               <div class=\"profile-info\">\n                  <h6>{{con.name}}</h6>\n                  <!-- <p class=\"p12\">{{con.phone}}</p> -->\n                  <p class=\"p12\">{{con.phone}}</p>\n                  <i class=\"fa fa-angle-right float-right\"></i>\n               </div>\n            </div>\n         </a>\n      </div>\n   </div>\n   \n   <div class=\"col-lg-8 col-md-8 col-sm-12 col-12\">\n      <div *ngIf=\"loadingMessages\" class=\"chat-window white-bg\"><img style=\"width:100%\" src=\"assets/img/loading_content.gif\"></div>\n      <div *ngIf=\"conversation && !loadingMessages\" class=\"chat-window white-bg\">\n         <div class=\"chat-top\">\n             <a href=\"javascript://\">\n               <div class=\"profile\">\n                  <div class=\"fig-block\">\n                     <img [src]=\"parameter.image\" onerror='src=\"http://via.placeholder.com/62x62\"' alt=\"img\">\n                  </div>\n                  <div class=\"profile-info\">\n                     <h6>{{parameter.name}}</h6>\n                     <!-- <p class=\"p12\">{{conversation.other.phone}}</p> -->\n                     <p class=\"p12\">{{parameter.phone}}</p>\n                  </div>\n               </div>\n            </a>\n  \n         </div>\n  \n         <div *ngIf=\"messages\" malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\" class=\"chat-area scrollbox\" #chatWin>\n          <div *ngIf=\"loadmore\" class=\"chat-load-more\" (click)=\"loadMore()\" >\n            Previous Messages <img *ngIf=\"loadmoring\" src=\"assets/img/loading-p.gif\">\n          </div> \n          <div *ngFor=\"let m of messages;let i = index\" [ngClass]=\"m?.conversation_user?.admin_id == admin_id ? 'chat-user-one' :'chat-user-two'\" class=\"chat-user\">\n            <p *ngIf=\"m.message_type == 1\" style=\"word-wrap: break-word;\">\n              <!-- <span *ngIf=\"m.loading\" class=\"m-loader\"><img src=\"assets/img/loading-p.gif\"></span> -->\n              <span>{{m.message}}</span>\n            </p>\n  \n            <!-- <a class=\"btn btn-sm btn-danger\" [group]=\"group\" ng-box href=\"{{lastReport.image.original}}\">View</a> -->\n            <!-- <a *ngIf=\"m.message_type == 2\" ng-box width=\"800\" height=\"800\" target=\"_blank\" href=\"{{m.image}}\">\n                <img src=\"{{m.image}}\">\n            </a> -->\n            <a *ngIf=\"m.message_type == 2\" href=\"{{m.image}}\" data-lightbox=\"image\" title=\"image\" >\n              <span>\n                <img class=\"ui bordered small image\" src=\"{{m.image}}\">\n                <div *ngIf=\"m.loading\" class=\"loaderr\"></div>\n              </span>\n            </a>\n            <!-- <a *ngIf=\"m.message_type == 2\" href=\"{{m.image}}\" data-lightbox=\"image\" data-title=\"My caption\">\n              <img class=\"ui bordered small image\" src=\"{{m.image}}\">\n              \n            </a> -->\n            <!-- <a *ngIf=\"m.message_type == 3\" href=\"{{m.video}}\" title=\"Video\" class=\"chat-vid\">\n              <span >\n                <img class=\"ui bordered small image\" src=\"{{m.image}}\">\n                <img *ngIf=\"!m.loading\" class=\"vid-icon\" (click)=\"playVideo(i)\" src=\"assets/img/play-button.png\" />\n                <div *ngIf=\"m.loading\" class=\"loaderr\"></div>\n              </span>\n            </a> -->\n            \n            <div class=\"chat-vid\" *ngIf=\"m.message_type == 3 && !m.play\">\n              <span>\n                  <img class=\"ui bordered small image\" src=\"{{m.image}}\" onerror=\"this.src='assets/img/placeholder.png'\">\n                  <img *ngIf=\"!m.loading\" class=\"vid-icon\" (click)=\"playVideo(i)\" src=\"assets/img/play-button.png\" />\n                  <div *ngIf=\"m.loading\" class=\"loaderr\"></div>\n                  <div class=\"clearfix\"></div>\n            </span>\n            </div>\n            <video *ngIf=\"m.message_type == 3 && m.play\" src=\"{{m.video}}\" autoplay type=\"video/mp4\" controls></video>\n            \n            <!-- <div class=\"chat-vid\" *ngIf=\"m.message_type == 3 && !m.play\">\n              <span>\n                <img class=\"vid-img\" src=\"{{m.image}}\">\n                <img class=\"vid-icon\" (click)=\"playVideo(i)\" src=\"assets/img/play-button (2).png\"/>\n                <div class=\"clearfix\"></div>\n            </span>\n            </div> -->\n            <!-- <video *ngIf=\"m.message_type == 3 && m.play\" src=\"{{m.video}}\" autoplay type=\"video/mp4\" controls></video> -->\n            \n            <div class=\"chat-shared-file\" *ngIf=\"m.message_type == 4\">\n              <span *ngIf=\"m.loading\" class=\"m-loader\">\n                <img class=\"ui bordered small image\" src='assets/img/placeholder.png'>\n                <div *ngIf=\"m.loading\" class=\"loaderr\"></div>\n              </span>\n              <span *ngIf=\"!m.loading\">\n                <a href=\"javascript://\" target=\"_blank\" href=\"{{m.attachment}}\"><span>{{m.attachment_name}} <img class=\"viewfull\" src=\"assets/img/viewfull.png\"></span>\n                </a>\n              </span>\n            </div>\n              \n            <a *ngIf=\"m.message_type == 5\" href=\"{{m.property_url}}\" target=\"_blank\" title=\"image\" >\n              <span>\n                <img class=\"ui bordered small image\" src=\"{{m.image}}\">\n                <div *ngIf=\"m.loading\" class=\"loaderr\"></div>\n              </span>\n              <h5>{{m.message}}</h5>\n            </a>\n            \n            <div class=\"time clearfix\" *ngIf=\"m.updated_at && !m.uid\">{{m.updated_at| moment}}</div>\n            <div class=\"time clearfix\" *ngIf=\"m.updated_at && m.uid\">\n                {{m.updated_at|date:'h:mm a, MMM d y'}}\n            </div>\n  \n           </div>\n  \n         </div>\n  \n         <div style=\"position: absolute; z-index: 1; margin: 0px; padding: 0px; other: block; left: 581px; top: 91px;\"><div class=\"enscroll-track track3\" style=\"position: relative; height: 367px;\"><a href=\"\" class=\"handle3\" style=\"position: absolute; z-index: 1; height: 199.244px; top: 0px;\"><div class=\"top\"></div><div class=\"bottom\"></div></a></div></div>\n  \n         <div class=\"chat-text\">\n          <div class=\"dropdown attach-items\">\n            <a href=\"javascript://\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" #optionsButton>\n              <i class=\"fa fa-paperclip\" aria-hidden=\"true\"></i>\n            </a>\n            <div class=\"dropdown-menu\">\n              <div class=\"dropdown-item\">\n                <input type=\"file\" name=\"image\" accept=\"image/*\" (change)=\"onSelectFile('image', $event)\">\n                <i class=\"fa fa-camera\" aria-hidden=\"true\"></i>\n                <span>Photo</span>\n              </div>\n              <a class=\"dropdown-item\"> \n                <!-- <input type=\"file\" name=\"video\" id=\"videoFileObject\" name=\"video\" accept=\"video/mp4,video/x-m4v,video/*\" (change)=\"showCanvas($event)\"> -->\n                <input type=\"file\" name=\"video1\" accept=\"video/mp4,video/x-m4v,video/*\" (change)=\"showCanvas($event)\">\n                <i class=\"fa fa-video-camera\" aria-hidden=\"true\"></i>\n                <span>Video</span>\n              </a>\n              <a class=\"dropdown-item\">    \n                  <input type=\"file\" name=\"attachment\" accept=\".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf\" (change)=\"saveAttachment($event)\">\n                <i class=\"fa fa-file\" aria-hidden=\"true\"></i>\n                <span>Document</span>\n              </a>\n              <a class=\"dropdown-item\" (click)=\"blockGetProperty.showModal()\">    \n                <i class=\"fa fa-file\" aria-hidden=\"true\"></i>\n                <span>Property</span>\n              </a>\n            </div>\n          </div>\n          <input id=\"message\" autocomplete=\"off\" [(ngModel)]=\"textMessage\" (keyup.enter)=\"setText()\" class=\"chat-input\" type=\"text\" name=\"message\" placeholder=\"Type your message here …\">\n          \n          <!-- <div class=\"chat-attached-file\" *ngIf=\"model.message_type == 2\">\n            <div class=\"attached-inner\">\n              <a href=\"javascript://\" (click)=\"updateModel('image')\" class=\"close\">&times;</a>\n              <div class=\"fig-block\"><img class=\"img-fluid\" src=\"{{model.image}}\" alt=\"img\"></div>\n            </div>\n          </div>\n          <div class=\"chat-attached-file\">\n            <div class=\"attached-inner\">\n              <a href=\"javascript://\" (click)=\"updateModel('video')\" class=\"close\">&times;</a>\n              <div class=\"fig-block\">\n                  <video style=\"width: 100%; height: 100%;\" src=\"{{model.video}}\" class=\"video55\" autoplay type=\"video/mp4\" controls></video>\n              </div>\n            </div>\n          </div>\n          <div class=\"chat-attached-file\" *ngIf=\"model.message_type == 4\">\n            <div class=\"attached-inner\">\n              <a href=\"javascript://\" (click)=\"updateModel('video')\" class=\"close\">&times;</a>\n              <div class=\"fig-block\">\n                <div class=\"chat-shared-file\">\n                  <a href=\"javascript://\"><span>{{model.attachment_name}}</span>\n                    <i class=\"fa fa-times\" (click)=\"updateModel('attachment')\" aria-hidden=\"true\"></i>\n                  </a>\n                </div>\n              </div>\n            </div>\n          </div> -->\n          <video style=\"width: 100%; height: 100%;\" src=\"{{videoSrc}}\" class=\"video55\" autoplay type=\"video/mp4\" controls></video>\n          <canvas style=\"display: none;\" width=\"800\" height=\"600\" id=\"canvas\"></canvas>\n  \n          <button (click)=\"setText()\" class=\"btn\">Send</button>\n          \n         </div>\n  \n      </div>\n      </div>\n    </div>\n  \n    <app-block-get-property #blockGetProperty (itemSelect)=\"sendProperty($event)\"></app-block-get-property>"

/***/ }),

/***/ "../../../../../src/app/layout/leads/csr-seller/csr-seller-detail/seller-chat/seller-chat.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_common_service__ = __webpack_require__("../../../../../src/app/services/common.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_chat_model__ = __webpack_require__("../../../../../src/app/models/chat.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_socket_io_client__ = __webpack_require__("../../../../socket.io-client/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_socket_io_client__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SellerChatComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SellerChatComponent = /** @class */ (function () {
    function SellerChatComponent(element, admin, cs, constant, route
    // private ts:TranslateService
    ) {
        this.element = element;
        this.admin = admin;
        this.cs = cs;
        this.constant = constant;
        this.route = route;
        this.parameter = {};
        this.conversations = [];
        this.messages = [];
        this.loadingMessages = false;
        this.loadingConversation = false;
        this.editModel = false;
        this.seconds = true;
        this.isActive = true;
        this.imgObj = {
            thumbnail: '',
            original: ''
        };
        this.imgArray = [];
        this.durationInSec = 0;
        this.showVideo = true;
        this.videoObj = {
            thumbnail: '',
            original: ''
        };
        this.loadmore = true;
        this.loadmoring = false;
        this.scrollbarOptions = { axis: 'y', theme: 'dark' };
    }
    SellerChatComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.csr_seller_id = params.id;
            _this.lead_id = params.user_id;
        });
        this.loginData$$ = this.admin.loginData$.subscribe(function (success) {
            _this.admin_id = success['id'];
        });
        this.loadingConversation = true;
        this.admin.postDataApi('leads/sellers', { csr_seller_id: this.csr_seller_id }).subscribe(function (r) {
            console.log('seelers', r);
            _this.conversations = r['data'];
            if (_this.conversations.length > 0) {
                _this.initSocket();
                _this.selectConversation(_this.conversations[0], _this.lead_id);
            }
            _this.loadingConversation = false;
        });
    };
    SellerChatComponent.prototype.selectConversation = function (conversation, user_id) {
        var _this = this;
        this.parameter.name = conversation.name;
        this.parameter.image = conversation.image;
        this.parameter.dialCode = conversation.dial_code;
        this.parameter.phone = conversation.phone;
        var data1 = {
            lead_id: this.lead_id,
            other_id: conversation.id,
            other_sent_as: this.constant.userType.user_seller_dev,
            sent_as: this.constant.userType.csr_seller
        };
        this.parameter.loading = true;
        this.admin.postDataApi('conversation/getLeadConversation', data1).subscribe(function (res) {
            _this.parameter.loading = false;
            console.log('===========', res);
            if (res.data) {
                _this.conversation = res.data;
                _this.conversation_id = res.data[0].id;
                _this.loadmore = true;
                _this.conversations.map(function (con) {
                    con.selected = false;
                    if (con === conversation) {
                        con.selected = true;
                        // this.conversation_id = con.id;
                    }
                });
                var data = {
                    sent_as: _this.constant.userType.inhouse_broker,
                    // lead_id: this.lead_id,
                    conversation_id: _this.conversation_id
                };
                _this.loadingMessages = true;
                _this.admin.postDataApi('conversation/getMessages', data).subscribe(function (r) {
                    console.log(r);
                    _this.messages = r.data[0].messages;
                    // this.messages.map(r=>{
                    //   r.loading = true;
                    //   return r;
                    // });
                    if (_this.messages.length < 30) {
                        _this.loadmore = false;
                    }
                    _this.loadingMessages = false;
                    setTimeout(function () {
                        _this.scrollToBottom();
                    }, 200);
                });
            }
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    SellerChatComponent.prototype.initSocket = function () {
        var _this = this;
        // this.socket = io.connect(environment.socket_url,{
        //   extraHeaders: {
        //     Authorization: "Bearer authorization_token_here"
        //   }
        // });
        this.socket = __WEBPACK_IMPORTED_MODULE_6_socket_io_client__["connect"](this.admin.socketUrl);
        this.socket.on('connect', function (fun) {
            _this.socket_id = _this.socket.id;
            _this.connected = _this.socket.connected;
            var data = {
                admin_id: _this.admin_id,
                socket_id: _this.socket_id,
                device_id: _this.admin.deviceId + '_' + _this.admin_id
            };
            if (_this.connected) {
                // console.log('Socket Connected', this.socket_id, data);
                _this.socket.emit('add-admin', data, function (res) {
                    // console.log('res', res);
                });
                _this.socket.on('message', function (response) {
                    if (response.data.conversation_id === _this.conversation_id) {
                        // console.log('Message received');
                        _this.messages.push(response.data);
                        setTimeout(function () {
                            _this.scrollToBottom();
                        }, 200);
                    }
                });
            }
        });
    };
    SellerChatComponent.prototype.scrollToBottom = function () {
        if (this.chatWin) {
            $('.chat-area').mCustomScrollbar('scrollTo', 'bottom', { scrollInertia: 0 });
        }
    };
    SellerChatComponent.prototype.onSelectFile = function (param, event) {
        var _this = this;
        this.optionsButton.nativeElement.click();
        if (event.target.files[0].size > this.constant.fileSizeLimit) {
            swal('Error', this.constant.errorMsg.FILE_SIZE_EXCEEDS, 'error');
            return false;
        }
        var model = new __WEBPACK_IMPORTED_MODULE_5__models_chat_model__["a" /* Chat */];
        model.message = this.textMessage;
        model.message_type = 2;
        model.loading = true;
        model.uid = Math.random().toString(36).substr(2, 15);
        model.conversation_id = this.conversation_id;
        model.conversation_user = { admin_id: this.admin_id };
        var d = new Date();
        model.updated_at = d.toUTCString();
        this.messages.push(model);
        setTimeout(function () {
            _this.scrollToBottom();
        }, 100);
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                _this.image = e.target.result;
                model[param] = e.target.result;
                _this.cs.saveImage(event.target.files[0]).subscribe(function (success) {
                    model.image = success['data'].image;
                    _this.sendMessage(model);
                });
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };
    SellerChatComponent.prototype.saveAttachment = function (event) {
        var _this = this;
        this.optionsButton.nativeElement.click();
        if (event.target.files[0].size > this.constant.fileSizeLimit) {
            swal('Error', this.constant.errorMsg.FILE_SIZE_EXCEEDS, 'error');
            return false;
        }
        var model = new __WEBPACK_IMPORTED_MODULE_5__models_chat_model__["a" /* Chat */];
        model.message = this.textMessage;
        model.message_type = 4;
        model.loading = true;
        model.uid = Math.random().toString(36).substr(2, 15);
        model.conversation_id = this.conversation_id;
        model.conversation_user = { admin_id: this.admin_id };
        model.attachment_name = event.target.files[0].name;
        var d = new Date();
        model.updated_at = d.toUTCString();
        this.messages.push(model);
        setTimeout(function () {
            _this.scrollToBottom();
        }, 100);
        this.cs.saveAttachment(event.target.files[0]).subscribe(function (success) {
            model.attachment = success['data'].name;
            // console.log('==>', model);
            _this.sendMessage(model);
        });
    };
    SellerChatComponent.prototype.playVideo = function (i) {
        this.messages[i].play = true;
    };
    SellerChatComponent.prototype.showCanvas = function (event) {
        var _this = this;
        this.optionsButton.nativeElement.click();
        if (event.target.files[0].size > this.constant.fileSizeLimit) {
            swal('Error', this.constant.errorMsg.FILE_SIZE_EXCEEDS, 'error');
            return false;
        }
        this.showVideo = true;
        var model = new __WEBPACK_IMPORTED_MODULE_5__models_chat_model__["a" /* Chat */];
        model.message = this.textMessage;
        model.message_type = 3;
        model.loading = true;
        model.uid = Math.random().toString(36).substr(2, 15);
        model.conversation_id = this.conversation_id;
        model.conversation_user = { admin_id: this.admin_id };
        var d = new Date();
        model.updated_at = d.toUTCString();
        this.messages.push(model);
        setTimeout(function () {
            _this.scrollToBottom();
        }, 100);
        setTimeout(function () {
            _this.video = document.getElementById('video1');
            var reader = new FileReader();
            var videoTest = _this.element.nativeElement.querySelector('.video55');
            reader.onload = function (e) {
                var _this = this;
                var src = e.target['result'];
                videoTest.src = src;
                var timer = setInterval(function () {
                    // find duration of video only of video is in ready state
                    if (videoTest.readyState === 4) {
                        _this.durationInSec = videoTest.duration.toFixed(0);
                        setTimeout(function () {
                            // create canvas at middle of video
                            _this.newcanvas(videoTest, event.target.files[0], model);
                        }, 3000);
                        // setTimeout(() => {
                        //   // create canvas at middle of video
                        //   this.newcanvas(videoTest, event.target.files[0], model);
                        // }, (this.durationInSec / 2).toFixed(0));
                        clearInterval(timer);
                    }
                }, 1000);
            }.bind(_this);
            reader.readAsDataURL(event.target.files[0]);
            // setTimeout(() => {
            //   this.newcanvas(videoTest, event.target.files[0]);
            // }, 4000);
        }, 1000);
    };
    SellerChatComponent.prototype.newcanvas = function (video, videoFile, model) {
        var _this = this;
        var canvas = document.getElementById('canvas');
        // console.log(canvas);
        var ss = canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, canvas.width, canvas.height);
        var ImageURL = canvas.toDataURL('image/jpeg');
        model.image = ImageURL;
        // console.log(model);
        var fileToUpload = this.dataURLtoFile(ImageURL, 'tempFile.png');
        this.cs.saveVideo(videoFile, fileToUpload).subscribe(function (success) {
            // console.log('image', success);
            model.video = success['data'].video;
            model.image = success['data'].thumb;
            _this.sendMessage(model);
        }
        //  error => {
        //   console.log(error);
        // }
        );
    };
    SellerChatComponent.prototype.dataURLtoFile = function (dataurl, filename) {
        var arr = dataurl.split(',');
        var mime = arr[0].match(/:(.*?);/)[1];
        var bstr = atob(arr[1]);
        var n = bstr.length;
        var u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };
    SellerChatComponent.prototype.setText = function () {
        if (!this.textMessage) {
            return false;
        }
        else if ((Object.keys(this.admin.admin_acl).length !== 0 && this.admin.admin_acl['Broker Lead Management'].can_update === 0) ||
            this.admin.permissions.can_in_house_broker === 0) {
            return false;
        }
        else {
            var model = new __WEBPACK_IMPORTED_MODULE_5__models_chat_model__["a" /* Chat */];
            model.message = this.textMessage;
            model.message_type = 1;
            model.loading = true;
            model.uid = Math.random().toString(36).substr(2, 15);
            model.conversation_id = this.conversation_id;
            model.conversation_user = { admin_id: this.admin_id };
            var d = new Date();
            model.updated_at = d.toUTCString();
            this.messages.push(model);
            this.textMessage = '';
            this.sendMessage(model);
        }
    };
    SellerChatComponent.prototype.sendMessage = function (model) {
        var _this = this;
        if (model.message_type === 1 && !model.message) {
            swal('Error', 'Please enter some text.', 'error');
        }
        else {
            setTimeout(function () {
                _this.scrollToBottom();
            }, 100);
            // console.log('Appending', model);
            this.admin.postDataApi('conversation/sendMessage', model).subscribe(function (r) {
                // console.log('sendMessage', r);
                if (model.loading == true) {
                    model.loading = false;
                    var foundIndex = _this.messages.findIndex(function (x) { return x.uid == model.uid; });
                    _this.messages[foundIndex] = r['data'];
                }
                setTimeout(function () {
                    _this.scrollToBottom();
                }, 100);
            });
        }
    };
    SellerChatComponent.prototype.loadMore = function () {
        var _this = this;
        this.loadmoring = true;
        var data = {
            sent_as: 2,
            conversation_id: this.conversation_id,
            lead_id: this.lead_id,
            last_message_id: this.messages[0].id
        };
        // console.log(data);
        this.admin.postDataApi('conversation/getMessages', data).subscribe(function (res) {
            // console.log(res);
            _this.loadmoring = false;
            if (res['data'].length < 30) {
                _this.loadmore = false;
            }
            _this.messages = res['data'].concat(_this.messages);
        }
        // error => {}
        );
    };
    SellerChatComponent.prototype.sendProperty = function (property) {
        console.log('M=>', property);
        var model = new __WEBPACK_IMPORTED_MODULE_5__models_chat_model__["a" /* Chat */];
        model.message = property.configuration.name + ' in ' + property.building.name;
        model.message_type = 5;
        model.property_id = property.id;
        model.image = property.image;
        model.property_url = property.property_url;
        model.loading = true;
        model.updated_at = new Date();
        model.uid = Math.random().toString(36).substr(2, 15);
        model.conversation_id = this.conversation_id;
        model.conversation_user = { admin_id: this.admin_id };
        this.messages.push(model);
        this.sendMessage(model);
    };
    SellerChatComponent.prototype.onDestroy = function () {
        if (this.loginData$$) {
            this.loginData$$.unsubscribe();
        }
    };
    var _a, _b, _c, _d, _e, _f, _g;
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('chatWin'),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _a : Object)
    ], SellerChatComponent.prototype, "chatWin", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('optionsButton'),
        __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _b : Object)
    ], SellerChatComponent.prototype, "optionsButton", void 0);
    SellerChatComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-seller-chat',
            template: __webpack_require__("../../../../../src/app/layout/leads/csr-seller/csr-seller-detail/seller-chat/seller-chat.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/leads/csr-seller/csr-seller-detail/seller-chat/seller-chat.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _c : Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */]) === "function" ? _d : Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__services_common_service__["a" /* CommonService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_common_service__["a" /* CommonService */]) === "function" ? _e : Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_4__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__common_constants__["a" /* Constant */]) === "function" ? _f : Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"]) === "function" ? _g : Object])
    ], SellerChatComponent);
    return SellerChatComponent;
}());

//# sourceMappingURL=seller-chat.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/leads/csr-seller/csr-seller.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/leads/csr-seller/csr-seller.component.html":
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<div class=\"container-fluid\">\n    <div class=\"row\" *ngIf=\"admin?.admin_acl['Seller Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n        <div class=\"col-md-4\">\n         <div class=\"form-group\">\n          <p class=\"p16\">Manage CSR Seller's Lead</p>\n          <div class=\"d-flex\">\n          <button (click)=\"removeCsrUser()\" class=\"all-btn\">All</button>\n\n          <div class=\"autocomplete\">\n            <input style=\"max-width:200px\" list=\"amenities\" [(ngModel)]=\"parameter.keyword\" (input)=\"getCsrListing()\" class=\"form-control\" type=\"text\" name=\"keyword\" (focusout)=\"closeCsrListing()\">\n            <!-- <input type=\"text\"  (keyup.enter)=\"addAmenity(amen)\" name=\"amen\" [(ngModel)]=\"amen\"> -->\n            <div id=\"myInputautocomplete-list\" class=\"autocomplete-items\">\n                <div *ngFor=\"let item of users\" (click)=\"selectCsrUser(item)\">{{item.email}}</div>\n            </div>\n           </div>\n          \n          </div>\n          </div>\n        </div>\n       <div class=\"col-md-2\">\n      <div class=\"form-group\">\n      <label>Country</label>\n       <select class=\"form-control\" (change)=\"onCountryChange($event.target.value)\">\n          <option value=\"0\">All</option>\n          <option *ngFor=\"let item of location.countries\" [value]=\"item.id\">{{item.name}}</option>\n       </select>\n      </div>\n      </div>\n      <div class=\"col-md-2\">\n      <div class=\"form-group\">\n      <label>State</label>\n       <select class=\"form-control\" (change)=\"onStateChange($event.target.value)\">\n          <option value=\"0\">All</option>\n          <option *ngFor=\"let item of location.states\" [value]=\"item.id\">{{item.name}}</option>\n       </select>\n      </div>\n      </div>\n      <div class=\"col-md-2\">\n        <div class=\"form-group\">\n        <label>City</label>\n          <select class=\"form-control\" (change)=\"onCityChange($event.target.value)\">\n            <option value=\"0\">All</option>\n            <option *ngFor=\"let item of location.cities\" [value]=\"item.id\">{{item.name}}</option>\n          </select>\n        </div>\n      </div>\n\n      <div class=\"col-md-2\">\n      <div class=\"form-group\">\n      <label>Locality</label>\n      <select class=\"form-control\" (change)=\"onLocalityChange($event.target.value)\">\n          <option value=\"0\">All</option>\n          <option *ngFor=\"let item of location.localities\" [value]=\"item.id\">{{item.name}}</option>\n        </select>\n      </div>\n      </div>\n      </div>\n\n    <!-- <div *ngIf=\"users?.length > 0 && initSelection\"class=\"row\">\n        <table class=\"table table-striped\">\n            <tbody><tr *ngFor=\"let item of users\" (click)=\"selectCsrUser(item)\">\n                <td> <img class=\"rounded-circle\" [src]=\"item.image\" onerror='this.src=\"http://via.placeholder.com/50x50\"' alt=\"img\"></td>\n                <td class=\"text-left\">\n                    <span class=\"name\">{{item.name}}</span>\n                </td>\n                <td class=\"text-left\">\n                    {{item.phone}}\n                </td>\n                <td class=\"text-left\">\n                    {{item.email}}\n                </td>\n                <td>\n                    <a href=\"javascript://\" class=\"icon-block edit-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></a>\n                    <a href=\"javascript://\" class=\"icon-block block-icon\"><img src=\"assets/img/block.png\" alt=\"img\"></a>\n                </td>\n                </tr>\n            </tbody>\n        </table>\n    </div> -->\n  <div class=\"listingResults\" >\n  <div class=\"row\">\n     <div class=\"col-12\">\n        <div class=\"cust-tabs-2\">\n          <ul class=\"nav nav-tabs\">\n            <li class=\"nav-item\">\n                <a class=\"nav-link\" [ngClass]=\"{'active':parameter.flag==1}\" (click)=\"changeFlag(1)\" >This Week</a>\n            </li>\n            <li class=\"nav-item\">\n                <a class=\"nav-link\" [ngClass]=\"{'active':parameter.flag==2}\" (click)=\"changeFlag(2)\" >This Month</a>\n            </li>\n            <li class=\"nav-item\">\n                <a class=\"nav-link\" [ngClass]=\"{'active':parameter.flag==3}\" (click)=\"changeFlag(3)\" >Last Month</a>\n            </li>\n            <li class=\"nav-item\">\n                <a class=\"nav-link\" [ngClass]=\"{'active':parameter.flag==4}\" (click)=\"changeFlag(4)\" >Lifetime</a>\n            </li>\n            <li class=\"nav-item\">\n                <a class=\"nav-link\" [ngClass]=\"{'active':parameter.flag==5}\" (click)=\"parameter.flag=5\" >Custom</a>\n            </li>\n          </ul>\n        </div>\n     </div>\n     <div class=\"col-12\">\n        <hr style=\"margin-top:0;\">\n        <div *ngIf=\"parameter.flag == 5\" class=\"pull-right btn-cont\">\n            From:<input type=\"date\" [ngModel] =\"parameter.min | date:'yyyy-MM-dd'\" max=\"{{today| date:'yyyy-MM-dd'}}\" (ngModelChange)=\"parameter.min = $event; parameter.max=''\" />\n            To:<input type=\"date\" [ngModel] =\"parameter.max | date:'yyyy-MM-dd'\" min=\"{{parameter.min | date:'yyyy-MM-dd'}}\" max=\"{{today| date:'yyyy-MM-dd'}}\" (ngModelChange)=\"parameter.max = $event\" />\n            <button class=\"btn btn-primary\" href=\"javascript://\" (click)=\"getListing()\" [disabled]=\"\n            parameter.flag == 5 && (!parameter.min || !parameter.max)\n            \">Go</button>\n        </div>\n     </div>\n  </div>\n  <div *ngIf=\"selectedUser as item\" class=\"sigle-row-table\">\n        <table class=\"table table-striped\">\n        <tbody><tr>\n            <td> <img class=\"rounded-circle\" [src]=\"item.image\" onerror='this.src=\"http://via.placeholder.com/50x50\"' alt=\"img\"></td>\n            <td class=\"text-left\">\n                <span class=\"name\">{{item.name}}</span>\n            </td>\n            <td class=\"text-left\">\n                {{item.phone}}\n            </td>\n            <td class=\"text-left\">\n                {{item.email}}\n            </td>\n            <td>\n                <a (click)=\"removeCsrUser()\" href=\"javascript://\" class=\"icon-block edit-icon\"><img src=\"assets/img/remove-icon.png\" alt=\"remove\" title=\"remove\" /></a>\n                <!-- <a href=\"javascript://\" class=\"icon-block edit-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></a>\n                <a href=\"javascript://\" class=\"icon-block block-icon\"><img src=\"assets/img/block.png\" alt=\"img\"></a> -->\n            </td>\n            </tr>\n        </tbody>\n        </table>\n  </div>\n  <div class=\"row\">\n     <div class=\"col-lg-8 col-md-12 col-sm-12 col-12\">\n        <div class=\"info-box all-leads\">\n           <div class=\"row\">\n              <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == '1'}\" (click)=\"changeCountFlag(1)\">\n                 <div class=\"one-row \">\n                    <div class=\"o-block\">\n                       <h5>Leads</h5>\n                       <small>Total</small>\n                    </div>\n                    <div class=\"o-block\">\n                       <a class=\"view-all\" href=\"javascript://\">View All</a>\n                       <h4>{{dash?.lead_total}}</h4>\n                    </div>\n                 </div>\n              </div>\n              <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == '2'}\" (click)=\"changeCountFlag(2)\">\n                 <div class=\"one-row\">\n                    <div class=\"o-block\">\n                       <h5>Leads</h5>\n                       <small>Without Properties</small>\n                    </div>\n                    <div class=\"o-block\">\n                       <a class=\"view-all\" href=\"javascript://\">View All</a>\n                       <h4>{{dash?.lead_without_property}}</h4>\n                    </div>\n                 </div>\n              </div>\n           </div>\n        </div>\n        <div class=\"info-box all-leads\">\n           <div class=\"row\">\n              <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == '3'}\" (click)=\"changeCountFlag(3)\">\n                 <div class=\"one-row \">\n                    <div class=\"o-block\">\n                       <h5>Leads</h5>\n                       <small>With Properties</small>\n                    </div>\n                    <div class=\"o-block\">\n                       <a class=\"view-all\" href=\"javascript://\">View All</a>\n                       <h4>{{dash?.lead_with_property}}</h4>\n                    </div>\n                 </div>\n              </div>\n              <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == '4'}\" (click)=\"changeCountFlag(4)\">\n                 <div class=\"one-row\">\n                    <div class=\"o-block\">\n                       <h5>Leads</h5>\n                       <small>Pending Properties (in Draft)</small>\n                    </div>\n                    <div class=\"o-block\">\n                       <a class=\"view-all\" href=\"javascript://\">View All</a>\n                       <h4>{{dash?.lead_property_pending}}</h4>\n                    </div>\n                 </div>\n              </div>\n           </div>\n        </div>\n\n     </div>\n     <div class=\"col-lg-4 col-md-12 col-sm-12 col-12\">\n        <div class=\"chat-msg all-leads\" style=\"padding:0px\">\n            <div class=\"padding20\" *ngIf=\"dash.lead_total == 0\">No records found</div>\n            <ngx-charts-pie-chart [results]=\"chartView\"></ngx-charts-pie-chart>\n              <!-- <ngx-charts-bar-vertical\n                [scheme]=\"colorScheme\"\n                [results]=\"chartView\"\n                [gradient]=\"gradient\"\n                [yAxis]=\"showYAxis\"\n                [showXAxisLabel]=\"showXAxisLabel\"\n                [showYAxisLabel]=\"showYAxisLabel\"\n                [xAxisLabel]=\"xAxisLabel\"\n                [yAxisLabel]=\"yAxisLabel\"\n                (select)=\"onSelect($event)\">\n                </ngx-charts-bar-vertical> -->\n        </div>\n     </div>\n  </div>\n  <div class=\"row\">\n     <div class=\"col-12\">\n        <div class=\"spacer40\"></div>\n     </div>\n\n  </div>\n  <div class=\"row\">\n     <div class=\"col-6\">\n        <div class=\"title-group\">\n           <h5>Leads \n            <span *ngIf=\"parameter.count_flag == 1\">(Total)</span>\n            <span *ngIf=\"parameter.count_flag == 2\">(Without Properties)</span>\n            <span *ngIf=\"parameter.count_flag == 3\">(With Properties)</span>\n            <span *ngIf=\"parameter.count_flag == 4\">(Pending Properties)</span>\n           </h5>\n           <p>\n               <!-- Showing {{parameter.page}} out of {{parameter.total_count}} -->\n            </p>\n        </div>\n     </div>\n     <div class=\"col-6\">\n        <div class=\"add-new text-right\">\n            <a class=\"btn\" (click)=\"bulkAssign()\" href=\"javascript://\">Bulk Re-assign</a>\n        </div>\n    </div>\n  </div>\n  <div class=\"white-bg\">\n     <div class=\"tabel-section\">\n        <div class=\"table-responsive\">\n           <table class=\"table table-striped border-0\">\n              <tbody>\n              <tr>\n                <th style=\"width:5%;\">\n                    <div class=\"table-search\">\n                        <label>All</label>\n                        <div>\n                            <label class=\"cust-check-bx marginT0\">\n                                <input class=\"width1\" type=\"checkbox\" (click)=\"selectAll(parameter.is_selected)\" name=\"document\">\n                                <span class=\"checkmark\"></span>\n                            </label>\n                        </div>\n                    </div>\n                </th>\n                <th style=\"width:5%;\">\n                    <div class=\"table-search\">\n                        <label>Image</label>\n                    </div>\n                </th>\n                <th style=\"width:15%;\">\n                    <div class=\"table-search\">\n                       <label>Name</label>\n                       <div class=\"searh-3\">\n                        <input autocomplete=\"off\" type=\"text\" name=\"name\" [(ngModel)]=\"parameter.name\" (keyup.enter)=\"getListing()\">\n                        <button *ngIf=\"parameter.name\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                      </div>\n                    </div>\n                </th>\n                <th style=\"width:15%;\">\n                    <div class=\"table-search\">\n                       <label>Contact Number</label>\n                       <div class=\"searh-3\">\n                            <input autocomplete=\"off\" type=\"text\" name=\"phone\" [(ngModel)]=\"parameter.phone\" (keyup.enter)=\"getListing()\">\n                            <button *ngIf=\"parameter.phone\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                        </div>\n                    </div>\n                </th>\n                <th style=\"width:20%;\">\n                    <div class=\"table-search\">\n                       <label>Email Address</label>\n                       <div class=\"searh-3\">\n                            <input autocomplete=\"off\" type=\"text\" name=\"email\" [(ngModel)]=\"parameter.email\" (keyup.enter)=\"getListing()\">\n                            <button *ngIf=\"parameter.email\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                       </div>\n                    </div>\n                 </th>\n                 <th style=\"width:10%;\">\n                    <div class=\"table-search\">\n                        <label>Assignee</label>\n                    </div>\n                 </th>\n                 <th style=\"width:5%;\">\n                    <div class=\"table-search\">\n                        <label>Chat with Seller</label>\n                    </div>\n                 </th>\n                 <th style=\"width:5%;\">\n                    <div class=\"table-search\">\n                        <label>Properties</label>\n                    </div>\n                    <div class=\"ppties\" title=\"Approved\">\n                        <a href=\"javascript://\" (click)=\"sort_by(3)\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Coming soon\">A<img [ngClass]=\"{'upsidedown':parameter.sort_by_flag==3 && parameter.sort_by_order==0}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n                    </div>\n                 </th>\n                 <th style=\"width:5%;\" title=\"Unapproved\">\n                   <label>&nbsp;</label>\n                  <div class=\"ppties\">\n                     <a href=\"javascript://\" (click)=\"sort_by(4)\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Coming soon\">U<img [ngClass]=\"{'upsidedown':parameter.sort_by_flag==3 && parameter.sort_by_order==0}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n                     </div>\n                 </th>\n                 <th style=\"width:5%;\" title=\"Pending Review\">\n                  <label>&nbsp;</label>\n                  <div class=\"ppties\">\n                     <a href=\"javascript://\" (click)=\"sort_by(2)\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Coming soon\">P<img [ngClass]=\"{'upsidedown':parameter.sort_by_flag==2 && parameter.sort_by_order==0}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n                     </div>\n                 </th>\n                 <th style=\"width:5%;\" title=\"In Draft\">\n                  <label>&nbsp;</label>\n                  <div class=\"ppties\">\n                     <a href=\"javascript://\" (click)=\"sort_by(1)\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"In Draft\">D<img [ngClass]=\"{'upsidedown':parameter.sort_by_flag==1 && parameter.sort_by_order==0}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n                     </div>\n                 </th>\n                 <th style=\"width:5%;\" title=\"Total\">\n                  <label>&nbsp;</label>\n                  <div class=\"ppties\">\n                     <a href=\"javascript://\" (click)=\"sort_by(5)\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Coming soon\">T<img [ngClass]=\"{'upsidedown':parameter.sort_by_flag==5 && parameter.sort_by_order==0}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n                     </div>\n                 </th>\n              </tr>\n              <tr class=\"cursor-pointer\" title=\"Click to view details\" *ngFor=\"let item of items| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: parameter.total }\">\n                <td (click)=\"$event.stopPropagation()\">\n                    <label class=\"cust-check-bx marginT0\">\n                    <input type=\"checkbox\" [(ngModel)]=\"item.selected\" name=\"document\">\n                    <span class=\"checkmark\"></span>\n                    </label>\n                    <!-- <i class=\"fa\" [ngClass]=\"item.selected?'fa-check-square-o':'fa-square-o'\" (click)=\"item.selected = !item.selected\" aria-hidden=\"true\"></i> -->\n                </td>\n                <td routerLink=\"{{item.id}}\">\n                    <img *ngIf=\"item.image\" class=\"rounded-circle\" [src]=\"item.image\" alt=\"img\">\n                    <img *ngIf=\"!item.image\" class=\"rounded-circle\" src=\"assets/img/default_img.png\" alt=\"img\">\n                </td>\n                <td class=\"text-left\" routerLink=\"{{item.id}}\">\n                  <span class=\"name\">{{item.name}}</span>\n                 </td>\n                 <td routerLink=\"{{item.id}}\" class=\"text-left\" *ngIf=\"item.phone\">{{item.dial_code}}-{{item.phone.trim()}}</td>\n                 <td routerLink=\"{{item.id}}\" class=\"text-left\" *ngIf=\"!item.phone\">NA</td>\n                <td routerLink=\"{{item.id}}\" class=\"text-left\">\n                    {{item.email}}\n                </td>\n                 <td routerLink=\"{{item.id}}\" class=\"text-left\">{{item.csr_seller_name?item.csr_seller_name:'NA'}}</td>\n                 <td class=\"text-left\" (click)=\"getCSRSellerChat($event, item.assigned_csr_seller_id, item.id)\">\n                     <a class=\"green-color fontW500\" href=\"javascript://\">Chat</a>\n                 </td>\n                 <td routerLink=\"{{item.id}}\">\n                  {{item.approved_count}}\n                 </td>\n                 <td routerLink=\"{{item.id}}\">\n                  {{item.rejected_count}}\n                 </td>\n                 <td routerLink=\"{{item.id}}\">\n                    {{item.pending_count}}\n                 </td>\n                 <td routerLink=\"{{item.id}}\">\n                    {{item.draft_count}}\n                 </td>\n                 <td routerLink=\"{{item.id}}\">\n                    {{item.total_count}}\n                 </td>\n              </tr>\n\n           </tbody></table>\n           <!-- <div class=\"padding20\" *ngIf=\"parameter.noResultFound\">No result found</div> -->\n           <div class=\"padding20 center\" *ngIf=\"parameter.noResultFound\">\n                <img src=\"assets/img/404-error.png\">\n            </div>\n\n        </div>\n     </div>\n\n  </div>\n  </div>\n\n    <div class=\"btn-cont text-right marginT15\" *ngIf=\"parameter.total\">\n        <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n    </div>\n</div>\n\n\n\n<!-- Assignment model -->\n<a data-toggle=\"modal\" data-target=\"#assign-model\" #openAssignModel></a>\n<div class=\"modal\" id=\"assign-model\">\n    <div class=\"modal-dialog \">\n        <div class=\"modal-content notary-avail\">\n            <div class=\"modal-header popup-header\">\n            <h4 class=\"modal-title\">Re Assign to</h4>\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #closeAssignModel>&times;</button>\n            </div>\n            <div class=\"modal-body\">\n                <div class=\"row\">\n                    <div class=\"col-md-8\">\n                        <input style=\"max-width:200px\" list=\"amenities\" [(ngModel)]=\"assign.keyword\" (input)=\"getAssignListing()\" class=\"form-control\" type=\"text\" name=\"keyword\" placeholder=\"Search\">\n                    </div>\n                    <div class=\"col-md-4 btn-cont\">\n                        <a class=\"btn btn-primary pull-right\" href=\"javascript://\" (click)=\"assignNow()\">Assign</a>\n                    </div>\n                </div>\n                <div class=\"spacer40\"></div>\n                <table class=\"table\">\n                    <tr *ngFor=\"let item of assign.items\">\n                        <td *ngIf=\"item.is_blocked!=1\">\n                            <div class=\"n-avail-profile\">\n                            <img [src]=\"item.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\">\n                            <div class=\"n-avail-info\">\n                                <p class=\"p12\">{{item.name}}</p>\n                                <p class=\"p10\">Phone : {{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}</p>\n                            </div>\n                            </div>\n                        </td>\n                        <td *ngIf=\"item.is_blocked!=1\">\n                            <label class=\"cust-check-bx float-right\">\n                                <input type=\"radio\" name=\"notary_id\" (click)=\"assignItem = item\">\n                                <span class=\"checkmark\"></span>\n                            </label>\n                        </td>\n                    </tr>\n                </table>\n            </div>\n        </div>\n    </div>\n</div>\n    "

/***/ }),

/***/ "../../../../../src/app/layout/leads/csr-seller/csr-seller.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CsrSellerComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CsrSellerComponent = /** @class */ (function () {
    function CsrSellerComponent(admin, constant, route, router) {
        this.admin = admin;
        this.constant = constant;
        this.route = route;
        this.router = router;
        this.parameter = {};
        this.location = {};
        this.assign = {};
        this.items = [];
        this.today = new Date();
        this.users = [];
        this.initSelection = false;
        this.dash = {
            lead_total: 0,
            lead_property_pending: 0,
            lead_with_property: 0,
            lead_without_property: 0
        };
        this.chartView = [];
    }
    CsrSellerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.parameter.is_selected = false;
        this.parameter.keyword = '';
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        this.parameter.flag = 2;
        this.parameter.total = 0;
        this.parameter.count_flag = 1;
        this.route.params.subscribe(function (params) {
            _this.parameter.assignee_id = params.id;
        });
        this.getCountries();
        this.getListing();
        this.getCsrSellerDash();
        Object.assign(this, this.chartView);
    };
    CsrSellerComponent.prototype.getCountries = function () {
        var _this = this;
        this.admin.postDataApi('getCountryLocality', {}).subscribe(function (r) {
            console.log('Country', r);
            _this.location.countries = r['data'];
        });
    };
    CsrSellerComponent.prototype.onCountryChange = function (id) {
        console.log(id);
        this.location.states = [];
        this.parameter.state_id = '0';
        this.location.cities = [];
        this.parameter.city_id = '0';
        this.location.localities = [];
        this.parameter.locality_id = '0';
        if (!id || id === '0') {
            this.parameter.state_id = '0';
            return false;
        }
        this.parameter.country_id = id;
        var selectedCountry = this.location.countries.filter(function (x) { return x.id.toString() === id; });
        this.location.states = selectedCountry[0].states;
    };
    CsrSellerComponent.prototype.onStateChange = function (id) {
        console.log(id);
        this.location.cities = [];
        this.parameter.city_id = '0';
        this.location.localities = [];
        this.parameter.locality_id = '0';
        if (!id || id === '0') {
            this.parameter.city_id = '0';
            return false;
        }
        this.parameter.state_id = id;
        var selectedState = this.location.states.filter(function (x) { return x.id.toString() === id; });
        this.location.cities = selectedState[0].cities;
    };
    CsrSellerComponent.prototype.onCityChange = function (id) {
        console.log(id);
        this.location.localities = [];
        this.parameter.locality_id = '0';
        if (!id || id === '0') {
            this.parameter.locality_id = '0';
            return false;
        }
        this.parameter.city_id = id;
        var selectedCountry = this.location.cities.filter(function (x) { return x.id.toString() === id; });
        this.location.localities = selectedCountry[0].localities;
    };
    CsrSellerComponent.prototype.onLocalityChange = function (id) {
        console.log(id);
        if (!id || id === '0') {
            return false;
        }
        this.parameter.locality_id = id;
        this.getCsrListing();
    };
    CsrSellerComponent.prototype.changeFlag = function (flag) {
        this.parameter.flag = flag;
        this.parameter.count_flag = 1;
        this.getListing();
        this.getCsrSellerDash();
    };
    CsrSellerComponent.prototype.changeFilter = function (key, value) {
        this.parameter[key] = value;
        this.getListing();
    };
    CsrSellerComponent.prototype.changeCountFlag = function (flag) {
        this.parameter.count_flag = flag;
        this.getListing();
    };
    CsrSellerComponent.prototype.getCsrListing = function () {
        var _this = this;
        this.initSelection = true;
        this.users = [];
        var input = new FormData();
        if (this.parameter.keyword) {
            input.append('keyword', this.parameter.keyword);
        }
        if (this.parameter.country_id && this.parameter.country_id !== '-1') {
            input.append('countries', JSON.stringify([this.parameter.country_id]));
        }
        if (this.parameter.state_id && this.parameter.state_id !== '-1') {
            input.append('states', JSON.stringify([this.parameter.state_id]));
        }
        if (this.parameter.city_id && this.parameter.city_id !== '-1') {
            input.append('cities', JSON.stringify([this.parameter.city_id]));
        }
        if (this.parameter.locality_id && this.parameter.locality_id !== '-1') {
            input.append('localities', JSON.stringify([this.parameter.locality_id]));
        }
        this.admin.postDataApi('getCsrSellers', input).subscribe(function (success) {
            console.log(success.data);
            _this.users = success.data;
        });
    };
    CsrSellerComponent.prototype.closeCsrListing = function () {
        var _this = this;
        setTimeout(function () {
            _this.users = [];
        }, 200);
    };
    CsrSellerComponent.prototype.selectCsrUser = function (user) {
        this.selectedUser = user;
        this.users = [];
        this.parameter.keyword = '';
        this.initSelection = false;
        this.getListing();
        this.getCsrSellerDash();
    };
    CsrSellerComponent.prototype.removeCsrUser = function () {
        this.selectedUser = '';
        this.parameter.keyword = '';
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        // this.parameter.flag = 2;
        this.parameter.total = 0;
        this.parameter.count_flag = 1;
        this.getListing();
        this.getCsrSellerDash();
    };
    CsrSellerComponent.prototype.getCsrSellerDash = function () {
        var _this = this;
        var input = new FormData();
        if (this.selectedUser) {
            input.append('assignee_id', this.selectedUser.id);
        }
        else if (this.parameter.assignee_id) {
            input.append('assignee_id', this.parameter.assignee_id);
        }
        if (this.parameter.flag) {
            input.append('flag', this.parameter.flag.toString());
        }
        this.admin.postDataApi('leads/csr-seller-dash-count', input).subscribe(function (r) {
            console.log('dash', r);
            _this.dash = r.data;
            _this.chartView = [
                {
                    'name': 'Lead Property pending',
                    'value': parseInt(_this.dash.lead_property_pending, 10)
                },
                {
                    'name': 'Lead with Property',
                    'value': parseInt(_this.dash.lead_with_property, 10)
                },
                {
                    'name': 'Lead without Property',
                    'value': parseInt(_this.dash.lead_without_property, 10)
                }
            ];
        });
    };
    CsrSellerComponent.prototype.getListing = function () {
        var _this = this;
        this.items = [];
        this.parameter.noResultFound = false;
        var input = JSON.parse(JSON.stringify(this.parameter));
        if (this.selectedUser) {
            input.assignee_id = this.selectedUser.id;
        }
        else if (this.parameter.assignee_id) {
            input.assignee_id = this.parameter.assignee_id;
        }
        this.parameter.loading = true;
        this.admin.postDataApi('leads/csr-seller', input).subscribe(function (success) {
            _this.parameter.loading = false;
            _this.items = success.data;
            if (_this.items.length <= 0) {
                _this.parameter.noResultFound = true;
            }
            console.log(success);
            _this.parameter.total = success.total_count;
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    CsrSellerComponent.prototype.getPage = function (page) {
        this.parameter.page = page;
        this.getListing();
    };
    CsrSellerComponent.prototype.sort_by = function (sort_by_flag) {
        if (this.parameter.sort_by_flag !== sort_by_flag) {
            this.parameter.sort_by_flag = sort_by_flag;
            this.parameter.sort_by_order = 0;
        }
        else {
            this.parameter.sort_by_order = this.parameter.sort_by_order ? 0 : 1;
        }
        this.getListing();
    };
    CsrSellerComponent.prototype.selectAll = function (is_selected) {
        var _this = this;
        this.parameter.is_selected = !is_selected;
        this.items.forEach(function (item) {
            item.selected = _this.parameter.is_selected;
        });
    };
    CsrSellerComponent.prototype.bulkAssign = function () {
        // this.assign.keyword = '';
        var leads_ids = this.items.filter(function (x) { return x.selected; }).map(function (y) { return y.id; });
        if (leads_ids.length === 0) {
            swal('Error', 'Please choose atleast one lead.', 'error');
            return false;
        }
        this.openAssignModel.nativeElement.click();
        // this.admin.postDataApi('getCsrSellers', {}).subscribe(
        //   success => {
        //     this.assign.items = success.data;
        //   });
    };
    CsrSellerComponent.prototype.getAssignListing = function () {
        var _this = this;
        // this.assign.items = [];
        var input = {
            keyword: this.assign.keyword
        };
        this.admin.postDataApi('getCsrSellers', input).subscribe(function (success) {
            _this.assign.items = success.data;
        });
    };
    CsrSellerComponent.prototype.assignNow = function () {
        var _this = this;
        var leads_ids = this.items.filter(function (x) { return x.selected; }).map(function (y) { return y.id; });
        var input = {
            csr_seller_id: this.assignItem.id,
            leads: leads_ids
        };
        this.parameter.loading = true;
        this.admin.postDataApi('leads/bulkAssignSeller', input).subscribe(function (r) {
            _this.parameter.loading = false;
            swal('Success', 'Assigned successfully', 'success');
            _this.closeAssignModel.nativeElement.click();
            console.log(r);
            _this.getListing();
        }, function (error) {
            _this.parameter.loading = false;
            _this.closeAssignModel.nativeElement.click();
            swal('Error', error.error.message, 'error');
        });
    };
    CsrSellerComponent.prototype.getCSRSellerChat = function ($event, csr_seller_id, user_id) {
        if (csr_seller_id) {
            this.router.navigate(['/dashboard/leads/chat-with-seller', csr_seller_id, user_id]);
        }
        else {
            swal('Error', 'No CSR Seller is assigned.', 'error');
        }
    };
    var _a, _b, _c, _d, _e, _f;
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('openAssignModel'),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _a : Object)
    ], CsrSellerComponent.prototype, "openAssignModel", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('closeAssignModel'),
        __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _b : Object)
    ], CsrSellerComponent.prototype, "closeAssignModel", void 0);
    CsrSellerComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-csr-seller',
            template: __webpack_require__("../../../../../src/app/layout/leads/csr-seller/csr-seller.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/leads/csr-seller/csr-seller.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_2__common_constants__["a" /* Constant */]]
        }),
        __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" ? _c : Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__common_constants__["a" /* Constant */]) === "function" ? _d : Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["ActivatedRoute"]) === "function" ? _e : Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["Router"]) === "function" ? _f : Object])
    ], CsrSellerComponent);
    return CsrSellerComponent;
}());

//# sourceMappingURL=csr-seller.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/leads/data-collector/data-collector.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/leads/data-collector/data-collector.component.html":
/***/ (function(module, exports) {

module.exports = "\n<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<div class=\"container-fluid\">\n    <div class=\"row\" *ngIf=\"admin?.admin_acl['Data Collector Lead Management']?.can_read==1\">\n        <div class=\"col-md-4\">\n            <div class=\"form-group\">\n            <p class=\"p16\">Manage Data Collector's Leads</p>\n            <div class=\"d-flex\">\n            <button (click)=\"removeCsrUser()\" class=\"all-btn\">All</button>\n\n            <div class=\"autocomplete\">\n            <input style=\"max-width:200px\" list=\"amenities\" [(ngModel)]=\"parameter.keyword\" (input)=\"getCsrListing()\" class=\"form-control\" type=\"text\" name=\"keyword\" (focusout)=\"closeCsrListing()\">\n            <!-- <input type=\"text\"  (keyup.enter)=\"addAmenity(amen)\" name=\"amen\" [(ngModel)]=\"amen\"> -->\n            <div id=\"myInputautocomplete-list\" class=\"autocomplete-items\">\n                <div *ngFor=\"let item of users\" (click)=\"selectCsrUser(item)\">{{item.email}}</div>\n            </div>\n            </div>\n            \n            </div>\n            </div>\n        </div>\n        <div class=\"col-md-2\">\n        <div class=\"form-group\">\n        <label>Country</label>\n        <select class=\"form-control\" (change)=\"onCountryChange($event.target.value)\">\n            <option value=\"0\">All</option>\n            <option *ngFor=\"let item of location.countries\" [value]=\"item.id\">{{item.name}}</option>\n        </select>\n        </div>\n        </div>\n        <div class=\"col-md-2\">\n        <div class=\"form-group\">\n        <label>State</label>\n        <select class=\"form-control\" (change)=\"onStateChange($event.target.value)\">\n            <option value=\"0\">All</option>\n            <option *ngFor=\"let item of location.states\" [value]=\"item.id\">{{item.name}}</option>\n        </select>\n        </div>\n        </div>\n        <div class=\"col-md-2\">\n        <div class=\"form-group\">\n        <label>City</label>\n            <select class=\"form-control\" (change)=\"onCityChange($event.target.value)\">\n            <option value=\"0\">All</option>\n            <option *ngFor=\"let item of location.cities\" [value]=\"item.id\">{{item.name}}</option>\n            </select>\n        </div>\n        </div>\n\n        <div class=\"col-md-2\">\n        <div class=\"form-group\">\n        <label>Locality</label>\n        <select class=\"form-control\" (change)=\"onLocalityChange($event.target.value)\">\n            <option value=\"0\">All</option>\n            <option *ngFor=\"let item of location.localities\" [value]=\"item.id\">{{item.name}}</option>\n        </select>\n        </div>\n        </div>\n    </div>\n\n  <div class=\"row\">\n      <div class=\"col-md-12\">\n        <div class=\"cust-tabs-2\">\n            <ul class=\"nav nav-tabs\">\n              <li class=\"nav-item\">\n                  <a class=\"nav-link\" [ngClass]=\"{'active':parameter.flag==1}\" (click)=\"changeFlag(1)\" >This Week</a>\n              </li>\n              <li class=\"nav-item\">\n                  <a class=\"nav-link\" [ngClass]=\"{'active':parameter.flag==2}\" (click)=\"changeFlag(2)\" >This Month</a>\n              </li>\n              <li class=\"nav-item\">\n                  <a class=\"nav-link\" [ngClass]=\"{'active':parameter.flag==3}\" (click)=\"changeFlag(3)\" >Last Month</a>\n              </li>\n              <li class=\"nav-item\">\n                  <a class=\"nav-link\" [ngClass]=\"{'active':parameter.flag==4}\" (click)=\"changeFlag(4)\" >Lifetime</a>\n              </li>\n              <li class=\"nav-item\">\n                  <a class=\"nav-link\" [ngClass]=\"{'active':parameter.flag==5}\" (click)=\"parameter.flag=5\" >Custom</a>\n              </li>\n            </ul>\n        </div>\n      </div>\n      <div class=\"col-12\">\n        <hr style=\"margin-top:0;\">\n        <div *ngIf=\"parameter.flag == 5\" class=\"pull-right btn-cont\">\n            From:<input type=\"date\" [ngModel] =\"parameter.min | date:'yyyy-MM-dd'\" max=\"{{today| date:'yyyy-MM-dd'}}\" (ngModelChange)=\"parameter.min = $event; parameter.max=''\" />\n            To:<input type=\"date\" [ngModel] =\"parameter.max | date:'yyyy-MM-dd'\" min=\"{{parameter.min | date:'yyyy-MM-dd'}}\" max=\"{{today| date:'yyyy-MM-dd'}}\" (ngModelChange)=\"parameter.max = $event\" />\n            <button class=\"btn btn-primary\" href=\"javascript://\" (click)=\"getListing()\" [disabled]=\"\n            parameter.flag == 5 && (!parameter.min || !parameter.max)\n            \">Go</button>\n        </div>\n      </div>\n  </div>\n\n  <div *ngIf=\"selectedUser as item\" class=\"sigle-row-table\">\n        <table class=\"table table-striped\">\n        <tbody><tr>\n            <td> <img class=\"rounded-circle\" [src]=\"item.image\" onerror='this.src=\"http://via.placeholder.com/50x50\"' alt=\"img\"></td>\n            <td class=\"text-left\">\n                <span class=\"name\">{{item.name}}</span>\n            </td>\n            <td class=\"text-left\">\n                {{item.phone}}\n            </td>\n            <td class=\"text-left\">\n                {{item.email}}\n            </td>\n            <td>\n                <a (click)=\"removeCsrUser()\" href=\"javascript://\" class=\"icon-block edit-icon\"><img src=\"assets/img/remove-icon.png\" alt=\"remove\" title=\"remove\" /></a>\n                <!-- <a href=\"javascript://\" class=\"icon-block edit-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></a>\n                <a href=\"javascript://\" class=\"icon-block block-icon\"><img src=\"assets/img/block.png\" alt=\"img\"></a> -->\n            </td>\n            </tr>\n        </tbody>\n        </table>\n  </div>\n\n  <div class=\"row\">\n      <div class=\"col-lg-4 col-md-12 col-sm-12 col-12\">\n        <div class=\"info-box\">\n            <div class=\"one-row\" [ngClass]=\"{'active':parameter.count_flag == '1'}\" (click)=\"changeCountFlag(1)\">\n              <div class=\"o-block\">\n                  <h5>Buildings</h5>\n                  <small>Requests Pending</small>\n              </div>\n              <div class=\"o-block\">\n                  <a class=\"view-all\" href=\"javascript://\">View All</a>\n                  <h4>{{dash.request_pending_total}}</h4>\n              </div>\n            </div>\n            <div class=\"three-row\">\n              <div class=\"t-block\" [ngClass]=\"{'active':parameter.count_flag == '2'}\" (click)=\"changeCountFlag(2)\">\n                  <p><strong>{{dash.request_pending_admin}}</strong></p>\n                  <p>Admin</p>\n              </div>\n              <div class=\"t-block\" [ngClass]=\"{'active':parameter.count_flag == '3'}\" (click)=\"changeCountFlag(3)\">\n                  <p><strong>{{dash.request_pending_csr}}</strong></p>\n                  <p>CSR</p>\n              </div>\n              <div class=\"t-block\" [ngClass]=\"{'active':parameter.count_flag == '4'}\" (click)=\"changeCountFlag(4)\">\n                  <p><strong>{{dash.request_pending_user}}</strong></p>\n                  <p>User</p>\n              </div>\n            </div>\n        </div>\n      </div>\n    <div class=\"col-lg-4 col-md-12 col-sm-12 col-12\">\n        <div class=\"four-block\">\n            <div class=\"d-flex\">\n              <div class=\"f-block approved\">\n                  <h5>Approved</h5>\n                  <h3>{{dash.building_approved}}</h3>\n              </div>\n              <div class=\"f-block unapproved\">\n                  <h5>Unapproved</h5>\n                  <h3>{{dash.building_unapproved}}</h3>\n              </div>\n            </div>\n            <div class=\"d-flex\">\n              <div class=\"f-block pending\">\n                  <h5>Pending</h5>\n                  <h3>{{dash.building_pending}}</h3>\n              </div>\n              <div class=\"f-block unapproved\">\n                  <h5>In Draft</h5>\n                  <h3>{{dash.building_draft}}</h3>\n              </div>\n            </div>\n        </div>\n      </div>\n      <div class=\"col-lg-4 col-md-12 col-sm-12 col-12\">\n            <div class=\"chat-msg all-leads\" style=\"padding:0px;height:185px;\">\n                <div class=\"padding20\" *ngIf=\"dash?.request_pending_total == 0\">No records found</div>\n                <ngx-charts-pie-chart [results]=\"chartView\"></ngx-charts-pie-chart>\n            </div>\n      </div>\n  </div>\n\n  <div class=\"row\">\n      <div class=\"col-12\">\n        <div class=\"spacer40\"></div>\n      </div>\n      <div class=\"col-6\">\n        <div class=\"title-group\">\n            <h5>Leads\n                <span *ngIf=\"parameter.count_flag == 1\">(Total Request)</span>\n                <span *ngIf=\"parameter.count_flag == 2\">(Admin Request)</span>\n                <span *ngIf=\"parameter.count_flag == 3\">(CSR Request)</span>\n                <span *ngIf=\"parameter.count_flag == 4\">(User Request)</span>\n            </h5>\n            <p>\n            <!-- Showing {{parameter.page}} out of {{parameter.total_count}} -->\n            </p>\n        </div>\n      </div>\n      <div class=\"col-6\">\n            <div class=\"add-new text-right\">\n                <a class=\"btn\" (click)=\"bulkAssign()\" href=\"javascript://\">Bulk Re-assign</a>\n            </div>\n        </div>\n  </div>\n\n  <div class=\"white-bg\">\n        <div class=\"tabel-section\">\n           <div class=\"table-responsive\">\n              <table class=\"table table-striped table-align-left vertical-align-top border-0\">\n                 <tr>\n                        <!-- class=\"border-top-0\" -->\n                    <th style=\"width:6%\">\n                        <div class=\"table-search\">\n                            <label>All</label>\n                            <div>\n                                <label class=\"cust-check-bx\" >\n                                    <input class=\"width1\" type=\"checkbox\" (click)=\"selectAll(parameter.is_selected)\" name=\"document\">\n                                    <span class=\"checkmark\"></span>\n                                </label>\n                            </div>\n                        </div>\n                    </th>\n\n                    <!-- <th>Image</th> -->\n                    <th style=\"width:20%\">\n                        <div class=\"table-search\">\n                        <label>Name of Building</label>\n                        <div class=\"searh-3\">\n                            <input autocomplete=\"off\" type=\"text\" name=\"name\" [(ngModel)]=\"parameter.name\" (keyup.enter)=\"getListing()\">\n                            <button *ngIf=\"parameter.name\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                        </div>\n                        </div>\n                    </th>\n                    <th style=\"width:20%; text-align:left;\">\n                        <div class=\"table-search\">\n                        <label>Address</label>\n                        <div class=\"searh-3\">\n                            <input autocomplete=\"off\" type=\"text\" name=\"name\" [(ngModel)]=\"parameter.location\" (keyup.enter)=\"getListing()\">\n                            <button *ngIf=\"parameter.address\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                        </div>\n                        </div>\n                    </th>\n                    <th style=\"width:20%\">\n                        <div class=\"table-search\">\n                        <label>Developer</label>\n                        <div class=\"searh-3\">\n                            <input autocomplete=\"off\" type=\"text\" name=\"name\" [(ngModel)]=\"parameter.developer\" (keyup.enter)=\"getListing()\">\n                            <button *ngIf=\"parameter.email\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                        </div>\n                        </div>\n                    </th>\n                    <th style=\"width:20%;\">\n                        <div class=\"table-search\">\n                            <label>Contact <br>Email</label>\n                        </div>\n                    </th>\n                    <th style=\"width:14%\">\n                        <div class=\"table-search\">\n                            <label>Assignee</label>\n                        </div>\n                    </th>\n                    <th style=\"width:14%\">\n                        <div class=\"table-search\">\n                            <label>Mark<br>Complete</label>\n                        </div>\n                    </th>\n                 </tr>\n                 <tr *ngFor=\"let item of items| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: parameter.total }\">\n                    <!-- <td>\n                        <a href=\"javascript://\"><img *ngIf=\"item.image\" class=\"rounded-circle\" [src]=\"item.image\" alt=\"img\">\n                        <img *ngIf=\"!item.image\" class=\"rounded-circle\" src=\"assets/img/default_img.png\" alt=\"img\">\n                        </a>\n                    </td> -->\n                    <td (click)=\"$event.stopPropagation()\">\n                        <label class=\"cust-check-bx\" >\n                        <input type=\"checkbox\" [(ngModel)]=\"item.selected\" name=\"document\">\n                        <span class=\"checkmark\"></span>\n                        </label>\n                    </td>\n                    <td><strong>{{item.name}}</strong></td>\n                    <td>{{item.address}}\n                    </td>\n                    <td>\n                        <span>{{item?.dev_name}}</span>\n                        <span *ngIf=\"!item.dev_name\" >NA</span>\n                    </td>\n                    <td *ngIf=\"item.dev_phone || item.dev_mail\">\n                        {{item?.dev_countrycode ? item.dev_countrycode : constant.dial_code}}-{{item?.dev_phone}}<br>\n                        {{item?.dev_mail}}\n                    </td>\n                    <td *ngIf=\"!item.dev_phone && !item.dev_mail\">NA</td>\n                    <td>{{item?.collector?.name}}</td>\n                    <td style=\"vertical-align:middle; \">\n                        <a title=\"Completed\" *ngIf=\"item.status==1\" style=\"cursor:auto;\" class=\"green-color fontW500\" href=\"javascript://\">Completed</a>\n                        <a style=\"cursor:auto;\" *ngIf=\"admin?.admin_acl['Data Collector Lead Management']?.can_update==0 || admin?.permissions?.can_data_collector==0\" class=\"green-color fontW500\" href=\"javascript://\">Mark Complete</a>\n                        <a title=\"Mark Complete\" *ngIf=\"item.status==0 && (admin?.admin_acl['Data Collector Lead Management']?.can_update==1 || admin?.permissions?.can_data_collector==1)\" class=\"green-color fontW500\" (click)=\"changeStatus(item, 1)\" href=\"javascript://\">Mark Complete</a>\n\n                       <!-- <button *ngIf=\"!item.status\" (click)=\"changeStatus(item, 1)\" class=\"action-icon\" title=\"Mark Complete\"><img alt=\"img\" src=\"assets/img/tick.png\"></button>\n                       <button *ngIf=\"item.status\" (click)=\"changeStatus(item, 2)\" class=\"action-icon\" title=\"Mark Incomplete\"><img alt=\"img\" src=\"assets/img/tick-selected.png\"></button> -->\n                    </td>\n                 </tr>\n              </table>\n              <!-- <div class=\"padding20\" *ngIf=\"parameter.noResultFound\">No result found</div> -->\n                <div class=\"padding20 center\" *ngIf=\"parameter.noResultFound\">\n                    <img src=\"assets/img/404-error.png\">\n                </div>\n\n           </div>\n\n           <!-- <div class=\"spacer30\"></div>\n           <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n\n            -->\n        </div>\n     </div>\n\n    <div class=\"btn-cont text-right marginT15\" *ngIf=\"parameter.total\">\n        <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n    </div>\n</div>\n\n\n<!-- Assignment model -->\n<a data-toggle=\"modal\" data-target=\"#assign-model\" #openAssignModel></a>\n<div class=\"modal\" id=\"assign-model\">\n        <div class=\"modal-dialog \">\n            <div class=\"modal-content notary-avail\">\n                <div class=\"modal-header popup-header\">\n                <h4 class=\"modal-title\">Re Assign to</h4>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #closeAssignModel>&times;</button>\n                </div>\n                <div class=\"modal-body\">\n                    <div class=\"row\">\n                        <div class=\"col-md-8\">\n                            <input style=\"max-width:200px\" list=\"amenities\" [(ngModel)]=\"assign.keyword\" (input)=\"getAssignListing()\" class=\"form-control\" type=\"text\" name=\"keyword\" placeholder=\"Search\">\n                        </div>\n                        <div class=\"col-md-4 btn-cont\">\n                            <a class=\"btn btn-primary pull-right\" href=\"javascript://\" (click)=\"assignNow()\">Assign</a>\n                        </div>\n                    </div>\n                    <div class=\"spacer40\"></div>\n                    <table class=\"table\">\n                        <tr *ngFor=\"let item of assign.items\">\n                            <td *ngIf=\"item.is_blocked!=1\">\n                                <div class=\"n-avail-profile\">\n                                <img [src]=\"item.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\">\n                                <div class=\"n-avail-info\">\n                                    <p class=\"p12\">{{item.name}}</p>\n                                    <p class=\"p10\">Phone : {{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}</p>\n                                </div>\n                                </div>\n                            </td>\n                            <td *ngIf=\"item.is_blocked!=1\">\n                                <label class=\"cust-check-bx float-right\">\n                                    <input type=\"radio\" name=\"notary_id\" (click)=\"assignItem = item\">\n                                    <span class=\"checkmark\"></span>\n                                </label>\n                            </td>\n                        </tr>\n                    </table>\n                </div>\n            </div>\n        </div>\n    </div>"

/***/ }),

/***/ "../../../../../src/app/layout/leads/data-collector/data-collector.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataCollectorComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DataCollectorComponent = /** @class */ (function () {
    function DataCollectorComponent(admin, constant) {
        this.admin = admin;
        this.constant = constant;
        this.parameter = {};
        this.location = {};
        this.assign = {};
        this.items = [];
        this.today = new Date();
        this.users = [];
        this.initSelection = false;
        this.dash = {
            request_pending_total: 0,
            request_pending_admin: 0,
            request_pending_csr: 0,
            request_pending_user: 0,
            building_approved: 0,
            building_draft: 0,
            building_pending: 0,
            building_unapproved: 0
        };
        this.chartView = [];
    }
    DataCollectorComponent.prototype.ngOnInit = function () {
        this.parameter.is_selected = false;
        this.parameter.keyword = '';
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        this.parameter.flag = 2;
        this.parameter.total = 0;
        this.parameter.count_flag = 1;
        this.getCountries();
        this.getListing();
        this.getCsrSellerDash();
        Object.assign(this, this.chartView);
    };
    DataCollectorComponent.prototype.getCountries = function () {
        var _this = this;
        this.admin.postDataApi('getCountryLocality', {}).subscribe(function (r) {
            _this.location.countries = r['data'];
        });
    };
    DataCollectorComponent.prototype.onCountryChange = function (id) {
        this.location.states = [];
        this.parameter.state_id = '0';
        this.location.cities = [];
        this.parameter.city_id = '0';
        this.location.localities = [];
        this.parameter.locality_id = '0';
        if (!id || id === '0') {
            this.parameter.state_id = '0';
            return false;
        }
        this.parameter.country_id = id;
        var selectedCountry = this.location.countries.filter(function (x) { return x.id.toString() === id; });
        this.location.states = selectedCountry[0].states;
    };
    DataCollectorComponent.prototype.onStateChange = function (id) {
        this.location.cities = [];
        this.parameter.city_id = '0';
        this.location.localities = [];
        this.parameter.locality_id = '0';
        if (!id || id === '0') {
            this.parameter.city_id = '0';
            return false;
        }
        this.parameter.state_id = id;
        var selectedState = this.location.states.filter(function (x) { return x.id.toString() === id; });
        this.location.cities = selectedState[0].cities;
    };
    DataCollectorComponent.prototype.onCityChange = function (id) {
        this.location.localities = [];
        this.parameter.locality_id = '0';
        if (!id || id === '0') {
            this.parameter.locality_id = '0';
            return false;
        }
        this.parameter.city_id = id;
        var selectedCountry = this.location.cities.filter(function (x) { return x.id.toString() === id; });
        this.location.localities = selectedCountry[0].localities;
    };
    DataCollectorComponent.prototype.onLocalityChange = function (id) {
        if (!id || id === '0') {
            return false;
        }
        this.parameter.locality_id = id;
        this.getCsrListing();
    };
    DataCollectorComponent.prototype.changeFlag = function (flag) {
        this.parameter.flag = flag;
        this.parameter.count_flag = 1;
        this.getListing();
        this.getCsrSellerDash();
    };
    DataCollectorComponent.prototype.changeFilter = function (key, value) {
        this.parameter[key] = value;
        this.getListing();
    };
    DataCollectorComponent.prototype.changeCountFlag = function (flag) {
        this.parameter.count_flag = flag;
        this.getListing();
    };
    DataCollectorComponent.prototype.getCsrListing = function () {
        var _this = this;
        this.initSelection = true;
        this.users = [];
        var input = new FormData();
        if (this.parameter.keyword) {
            input.append('keyword', this.parameter.keyword);
        }
        if (this.parameter.country_id && this.parameter.country_id !== '-1') {
            input.append('countries', JSON.stringify([this.parameter.country_id]));
        }
        if (this.parameter.state_id && this.parameter.state_id !== '-1') {
            input.append('states', JSON.stringify([this.parameter.state_id]));
        }
        if (this.parameter.city_id && this.parameter.city_id !== '-1') {
            input.append('cities', JSON.stringify([this.parameter.city_id]));
        }
        if (this.parameter.locality_id && this.parameter.locality_id !== '-1') {
            input.append('localities', JSON.stringify([this.parameter.locality_id]));
        }
        this.admin.postDataApi('getDataCollectors', input).subscribe(function (success) {
            console.log(success.data);
            _this.users = success.data;
        });
    };
    DataCollectorComponent.prototype.closeCsrListing = function () {
        var _this = this;
        setTimeout(function () {
            _this.users = [];
        }, 200);
    };
    DataCollectorComponent.prototype.selectCsrUser = function (user) {
        this.selectedUser = user;
        this.users = [];
        this.parameter.keyword = '';
        this.initSelection = false;
        this.getListing();
        this.getCsrSellerDash();
    };
    DataCollectorComponent.prototype.removeCsrUser = function () {
        this.selectedUser = '';
        this.parameter.keyword = '';
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        // this.parameter.flag = 2;
        this.parameter.total = 0;
        this.parameter.count_flag = 1;
        this.getListing();
        this.getCsrSellerDash();
    };
    DataCollectorComponent.prototype.getCsrSellerDash = function () {
        var _this = this;
        var input = new FormData();
        if (this.selectedUser) {
            input.append('assignee_id', this.selectedUser.id);
        }
        if (this.parameter.flag) {
            input.append('flag', this.parameter.flag.toString());
        }
        this.admin.postDataApi('leads/data-collector-dash-count', input).subscribe(function (r) {
            console.log('dash', r);
            _this.dash = r.data;
            _this.chartView = [
                {
                    'name': 'Lead information filled',
                    'value': parseInt(_this.dash.request_pending_admin, 10)
                },
                {
                    'name': 'Lead with broker assigned',
                    'value': parseInt(_this.dash.request_pending_csr, 10)
                },
                {
                    'name': 'Lead without broker assigned',
                    'value': parseInt(_this.dash.request_pending_user, 10)
                }
            ];
        });
    };
    DataCollectorComponent.prototype.getListing = function () {
        var _this = this;
        this.items = [];
        this.parameter.noResultFound = false;
        var input = JSON.parse(JSON.stringify(this.parameter));
        if (this.selectedUser) {
            input.assignee_id = this.selectedUser.id;
        }
        this.parameter.loading = true;
        this.admin.postDataApi('leads/data-collector', input).subscribe(function (success) {
            _this.parameter.loading = false;
            _this.items = success.data;
            if (_this.items.length <= 0) {
                _this.parameter.noResultFound = true;
            }
            console.log('listing', success);
            _this.parameter.total = success.total_count;
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    DataCollectorComponent.prototype.getPage = function (page) {
        this.parameter.page = page;
        this.getListing();
    };
    DataCollectorComponent.prototype.sort_by = function (sort_by_flag) {
        if (this.parameter.sort_by_flag !== sort_by_flag) {
            this.parameter.sort_by_flag = sort_by_flag;
            this.parameter.sort_by_order = 0;
        }
        else {
            this.parameter.sort_by_order = this.parameter.sort_by_order ? 0 : 1;
        }
        this.getListing();
    };
    DataCollectorComponent.prototype.changeStatus = function (item) {
        var _this = this;
        this.parameter.loading = true;
        this.admin.postDataApi('leads/markBuildingRequestComplete', { id: item.id }).subscribe(function (r) {
            _this.parameter.loading = false;
            item.status = 1;
        }, function (error) {
            _this.parameter.loading = false;
            swal('Error', error.error.message, 'error');
        });
    };
    DataCollectorComponent.prototype.selectAll = function (is_selected) {
        var _this = this;
        this.parameter.is_selected = !is_selected;
        this.items.forEach(function (item) {
            item.selected = _this.parameter.is_selected;
        });
    };
    DataCollectorComponent.prototype.bulkAssign = function () {
        // this.assign.keyword = '';
        var leads_ids = this.items.filter(function (x) { return x.selected; }).map(function (y) { return y.id; });
        if (leads_ids.length === 0) {
            swal('Error', 'Please choose atleast one lead.', 'error');
            return false;
        }
        this.openAssignModel.nativeElement.click();
        // this.admin.postDataApi('getDataCollectors', {}).subscribe(
        //   success => {
        //     this.assign.items = success.data;
        //   });
    };
    DataCollectorComponent.prototype.getAssignListing = function () {
        var _this = this;
        // this.assign.items = [];
        var input = {
            keyword: this.assign.keyword
        };
        this.admin.postDataApi('getDataCollectors ', input).subscribe(function (success) {
            _this.assign.items = success.data;
        });
    };
    DataCollectorComponent.prototype.assignNow = function () {
        var _this = this;
        var leads_ids = this.items.filter(function (x) { return x.selected; }).map(function (y) { return y.id; });
        var input = {
            data_collector_id: this.assignItem.id,
            leads: leads_ids
        };
        this.parameter.loading = true;
        this.admin.postDataApi('leads/bulkAssignCollector', input).subscribe(function (r) {
            _this.parameter.loading = false;
            swal('Success', 'Assigned successfully', 'success');
            _this.closeAssignModel.nativeElement.click();
            console.log(r);
            _this.getListing();
        }, function (error) {
            _this.parameter.loading = false;
            _this.closeAssignModel.nativeElement.click();
            swal('Error', error.error.message, 'error');
        });
    };
    var _a, _b, _c, _d;
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('openAssignModel'),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _a : Object)
    ], DataCollectorComponent.prototype, "openAssignModel", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('closeAssignModel'),
        __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _b : Object)
    ], DataCollectorComponent.prototype, "closeAssignModel", void 0);
    DataCollectorComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-data-collector',
            template: __webpack_require__("../../../../../src/app/layout/leads/data-collector/data-collector.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/leads/data-collector/data-collector.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_2__common_constants__["a" /* Constant */]]
        }),
        __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" ? _c : Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__common_constants__["a" /* Constant */]) === "function" ? _d : Object])
    ], DataCollectorComponent);
    return DataCollectorComponent;
}());

//# sourceMappingURL=data-collector.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/leads/inhouse-broker/inhouse-broker-detail/inhouse-broker-detail.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/leads/inhouse-broker/inhouse-broker-detail/inhouse-broker-detail.component.html":
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<div class=\"container-fluid\">\n  <div class=\"white-bg padding15\">\n     <div class=\"row\">\n      <div class=\"col-lg-3 col-md-12 col-sm-12 col-12\">\n         <div class=\"df-profile\">\n            <a routerLink=\"../\"><i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i></a>\n            <img [src]=\"parameter?.lead?.user?.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\">\n            <div class=\"df-info\">\n                <p class=\"p14\">{{parameter?.lead?.user?.name ? parameter?.lead?.user?.name : parameter?.lead?.name}}</p>\n                <p class=\"p12\">\n                    {{parameter?.lead?.user?.dial_code ? parameter?.lead?.user?.dial_code : parameter?.lead?.dial_code}}-{{parameter?.lead?.user?.phone ? parameter?.lead?.user?.phone : parameter?.lead?.phone}}\n                </p>\n            </div>\n        </div>\n      </div>\n      <div class=\"col-lg-5 col-md-12 col-sm-6 col-12\">\n          <div class=\"profile-list\">\n          <ul>\n              <li>\n                  <div class=\"df-info\">\n                      <p class=\"p14 marginB0\" *ngIf=\"parameter.lead?.admin\">{{parameter.lead.admin.name}}</p>\n                      <p class=\"p12\">CSR Buyer</p>\n                  </div>\n              </li>\n              <li>\n                  <div class=\"df-info\" *ngIf=\"parameter.lead?.broker\">\n                      <p class=\"p14 marginB0\">{{parameter.lead.broker.name}}</p>\n                      <p class=\"p12\">Inhouse Broker</p>\n                  </div>\n              </li>\n          </ul>\n          </div>\n      </div>\n\n      <div class=\"col-lg-4 col-md-12 col-sm-12 col-12\">\n        <div class=\"row\">\n            <div class=\"col-sm-7 btn-cont text-right\">\n                <a *ngIf=\"is_deal_finalised\" style=\"cursor: auto;\" class=\"btn btn-fourth\" href=\"javascript://\">Deal Finalized</a>\n            </div>\n            <div class=\"col-sm-5 btn-cont text-right\">\n                <a (click)=\"getInvoice()\" class=\"btn btn-fourth\" href=\"javascript://\">Invoice</a>\n                <!-- <button type=\"button\" class=\"btn btn-primary-new dropdown-toggle\" data-toggle=\"dropdown\">\n                 Action\n               </button>\n               <div class=\"dropdown-menu dropdown-menu-right\">\n                 <a *ngIf=\"is_deal_finalised\" (click)=\"getInvoice()\" class=\"dropdown-item\" href=\"javascript://\">Download Invoice</a>\n                 <a data-toggle=\"modal\" data-target=\"#set_appointment\" class=\"dropdown-item\" href=\"javascript://\">Schedule Meeting</a>\n               </div> -->\n            </div>\n        </div>\n     </div>\n\n     </div>\n  </div>\n  <div class=\"spacer30\"></div>\n  <div class=\"row\">\n     <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\">\n        <div class=\"white-bg padding30\">\n           <div class=\"row\">\n              <div class=\"col-md-6\">\n                 <h6>Details</h6>\n              </div>\n              <!-- <div class=\"col-md-6\">\n                 <div class=\"edit text-right\"><a href=\"javascript://\">Edit</a></div>\n              </div> -->\n           </div>\n           <div class=\"details-table\">\n             <table class=\"table\">\n                <tbody><tr>\n                   <td style=\"padding-left:0\"><label>Full Name</label></td>\n                   <td *ngIf=\"parameter?.lead?.name\">{{parameter.lead.user.name}}</td>\n                </tr>\n                <tr>\n                   <td style=\"padding-left:0\"><label>Contact Number</label></td>\n                   <td *ngIf=\"parameter?.lead?.phone\">{{parameter.lead.user.dial_code ? parameter.lead.user.dial_code : constant.dial_code}}-{{parameter.lead.phone}}</td>\n                </tr>\n                <tr>\n                   <td style=\"padding-left:0\"><label>Email address</label></td>\n                   <td *ngIf=\"parameter?.lead?.email\">{{parameter.lead.user.email}}</td>\n                </tr>\n                <tr>\n                   <td style=\"padding-left:0\"><label>Interested In</label></td>\n                   <td *ngIf=\"parameter?.lead?.configuration\">\n                     <span *ngFor=\"let conf of parameter.lead.configuration; let ii=index\">\n                       {{conf.name}}<span *ngIf=\"ii<parameter?.lead?.configuration.length-1\">,</span>\n                     </span>\n                     <span *ngIf=\"parameter.lead.configuration?.length==0\">NA</span>\n                   </td>\n                </tr>\n                <tr>\n                   <td style=\"padding-left:0\"><label>Favorite Projects</label></td>\n                   <td>{{parameter.favorites?.length}} \n                      <a style=\"display: none;\" data-toggle=\"modal\" #showPropertyModal data-target=\"#view-fav-property\" class=\"view-all\" href=\"javascript://\">View All</a>\n                      <a *ngIf=\"parameter.favorites?.length!=0\" class=\"view-all\" href=\"javascript://\" (click)=\"viewFavProperties()\">View All</a>\n                    </td>\n                </tr>\n\n                <!-- Meeting Schedule -->\n                <tr *ngIf=\"parameter?.lead?.sale_rent==1\">\n                    <td  style=\"padding-left:0\"><label><strong>Meeting Schedule</strong></label></td>\n                    <td *ngIf=\"is_deal_finalised\" colspan=\"2\" class=\"cursor-pointer\">\n                        <p class=\"date\" *ngIf=\"appointment.appointment_date; else noAvailability4\" data-toggle=\"modal\" data-target=\"#set_appointment\">\n                            <span title=\"Reschedule meeting\">{{app_date|moment}}</span>\n                        </p>\n                        <ng-template #noAvailability4>\n                            <p title=\"Schedule meeting\" data-toggle=\"modal\" data-target=\"#set_appointment\">Appointment not scheduled.</p>\n                        </ng-template>\n                    </td>\n                    <td *ngIf=\"!is_deal_finalised\" colspan=\"2\" class=\"cursor-pointer\">\n                        <p title=\"Schedule meeting\">Cannot schedule meeting as deal is not finalized.</p>\n                    </td>\n                </tr>\n    \n              </tbody>\n             </table>\n           </div>\n        </div>\n\n        <div class=\"spacer30\"></div>\n        <div *ngIf=\"parameter.lead?.user\">\n          <app-chat [lead_id]=\"parameter.lead_id\" [sent_as]=\"parameter.sent_as\" [user_id]=\"parameter.user_id\" [admin_id]=\"parameter.admin_id\"></app-chat>\n        </div>\n\n     </div>\n     <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\">\n        <div class=\"white-bg chat-with-developer padding15\">\n           <i class=\"float-left marginR15\"><img src=\"assets/img/chat-icon.png\" alt=\"img\"></i>\n           <a href=\"javascript://\" routerLink=\"/dashboard/leads/chat-with-developer/{{parameter.lead_id}}\">Chat with Developers <i class=\"fa fa-angle-right\"></i></a>\n        </div>\n        \n        <app-fill-information [sent_as]=\"parameter.sent_as\" [fillInfo]=\"fillInfo\" [lead_id]=\"parameter.lead_id\"></app-fill-information>\n\n        <app-notes [sent_as]=\"parameter.sent_as\" [lead_id]=\"parameter.lead_id\"></app-notes>\n\n     </div>\n  </div>\n\n  <!-- Interested Properties start -->\n  <!-- <app-interested-property (deal_finalised_success)=\"dealFinalisedReceived(v)\" [is_deal_finalised]=\"is_deal_finalised\" [selected_properties]=\"parameter?.lead?.selected_properties\" [lead_id]=\"parameter.lead_id\" [interested_properties]=\"parameter.interested_properties\" [sent_as]=\"parameter.sent_as\"></app-interested-property> -->\n  <app-interested-property [is_deal_finalised]=\"is_deal_finalised\" [selected_properties]=\"parameter?.lead?.selected_properties\" [lead_id]=\"parameter.lead_id\" [interested_properties]=\"parameter.interested_properties\" [sent_as]=\"parameter.sent_as\"></app-interested-property>\n  <!-- Interested Properties end -->\n\n  <!-- viewed property or projects start -->\n  <app-viewed-property [user_id]=\"parameter?.lead?.user_id\" [viewed_properties]=\"parameter.viewed_properties\"></app-viewed-property>\n  <!-- viewed property or projects end -->\n\n  <!-- viewed projects start -->\n  <app-viewed-projects [user_id]=\"parameter?.lead?.user_id\" [viewed_projects]=\"parameter.viewed_projects\"></app-viewed-projects>\n  <!-- viewed projects end -->\n</div>\n\n\n<!-- show fav properties -->\n<div class=\"modal\" id=\"view-fav-property\">\n  <div class=\"modal-dialog  modal-lg\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n        </div>\n        <div class=\"modal-body\">\n          <h3>Favorite Properties</h3>\n          <hr>\n          <div class=\"scrollbox fav-prop\">\n            <div class=\"row\">\n              <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\" *ngFor=\"let x of parameter.favorites\">\n                  <div class=\"project-des-bx white-bg-2\">\n                      <div class=\"price\">${{x.min_price}}</div>\n                    <div class=\"fig-block\">\n                        <img [src]=\"x.image\" onerror='src=\"assets/img/bank.png\"' alt=\"img\">\n                    </div>\n                    <div class=\"project-des-content\">\n                        <small>{{x.building.developer.name}}</small>\n                        <a routerLink=\"/dashboard/properties/details/{{x.id}}\">\n                            <h5>{{x.building.name.slice(0, 15)}}</h5>\n                        </a>\n                        <p class=\"p12\">{{x.building.address.slice(0, 50)}}</p>\n                        <p class=\"p13\" *ngIf=\"x\">{{x.configuration.name}}, {{x.property_type.name}}</p>\n                        <p class=\"p13\" *ngIf=\"x\">{{x.for_sale==1 ? 'Buy': 'Rent'}}</p>\n                        <!-- <p class=\"p13\" *ngIf=\"x\">{{x.property_type.name}}</p>\n                        <p class=\"p13\" *ngIf=\"!x\">NA</p> -->\n                    </div>\n                  </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n  </div>\n</div>\n\n\n<!-- add inhouse user modal -->\n<div class=\"modal animated\" id=\"set_appointment\">\n    <div class=\"modal-dialog fadeIndown\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header modal-header-new\">\n                <h4 class=\"modal-title\">Schedule Appointment</h4>\n                <button type=\"button\" style=\"display: none;\" class=\"close\" data-dismiss=\"modal\" #modalClose>&times;</button>\n                <button type=\"button\" class=\"close\" (click)=\"closeModal()\">&times;</button>\n            </div>\n    \n            <form class=\"form-horizontal form-model0P\" role=\"form\" ngNativeValidate #addForm=\"ngForm\" (ngSubmit)=\"add()\">\n            <div class=\"modal-body modal-body-new\">\n                <div class=\"row\">\n                    <div class=\"col-10\">\n                        <p-calendar title=\"Click to add\" name=\"app\" [(ngModel)]=\"appointment.appointment_date\" [minDate]=\"today\" showButtonBar=\"true\" showTime=\"true\" hourFormat=\"12\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n                    </div>\n                    <div class=\"col-2\">\n                        <div class=\"form-group-2\">\n                            <a *ngIf=\"!appointment.id && appointment.appointment_date\" class=\"green-color fontW500\" (click)=\"add()\" href=\"javascript://\">Save</a>\n                            <a *ngIf=\"appointment.id\" class=\"green-color fontW500\" (click)=\"add()\" href=\"javascript://\">Edit</a>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            </form>\n        </div>\n    </div>\n</div>\n    "

/***/ }),

/***/ "../../../../../src/app/layout/leads/inhouse-broker/inhouse-broker-detail/inhouse-broker-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_leads_model__ = __webpack_require__("../../../../../src/app/models/leads.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pipes_chat_time_pipe__ = __webpack_require__("../../../../../src/app/pipes/chat-time.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_file_saver__ = __webpack_require__("../../../../file-saver/FileSaver.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_file_saver___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_file_saver__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_moment__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InhouseBrokerDetailComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var InhouseBrokerDetailComponent = /** @class */ (function () {
    function InhouseBrokerDetailComponent(route, admin, constant, fillInfo, http, appointment) {
        var _this = this;
        this.route = route;
        this.admin = admin;
        this.constant = constant;
        this.fillInfo = fillInfo;
        this.http = http;
        this.appointment = appointment;
        this.parameter = {};
        this.selected_prop_ids = [];
        this.date = new Date();
        this.admin.loginData$.subscribe(function (success) {
            _this.parameter.admin_id = success['id'];
        });
    }
    InhouseBrokerDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.parameter.sent_as = this.constant.userType.inhouse_broker;
        this.route.params.subscribe(function (params) {
            _this.parameter.lead_id = params.id;
            _this.parameter.loading = true;
            _this.admin.postDataApi('leads/details', { lead_id: _this.parameter.lead_id, sent_as: _this.parameter.sent_as }).subscribe(function (r) {
                _this.parameter.loading = false;
                _this.parameter.lead = r.data.lead;
                if (r.data.lead.appointments.length !== 0) {
                    _this.appointment = r.data.lead.appointments[0];
                    _this.app_date = _this.appointment.appointment_date;
                    _this.appointment.appointment_date =
                        new Date(__WEBPACK_IMPORTED_MODULE_8_moment__(_this.appointment.appointment_date).utc(true).local().format('YYYY-MM-DD, h:mm a'));
                }
                _this.setFillInformationData(r);
                _this.parameter.favorites = r.data.favorites;
                _this.parameter.interested_properties = r.data.interested_properties;
                _this.is_deal_finalised = _this.parameter.lead.selected_properties.length !== 0 ? true : false;
                _this.parameter.viewed_properties = r.data.viewed_properties;
                _this.parameter.viewed_projects = r.data.viewed_projects;
                _this.parameter.user_id = _this.parameter.lead.user.id;
            }, function (error) {
                _this.parameter.loading = false;
            });
        });
    };
    InhouseBrokerDetailComponent.prototype.setFillInformationData = function (r) {
        var _this = this;
        this.admin.postDataApi('leads/getPrefOptions', { lead_id: this.parameter.lead_id }).subscribe(function (res) {
            _this.fillInfo.lead_id = _this.parameter.lead_id;
            _this.fillInfo.proximity_places_array = res.data.proximity_places;
            _this.fillInfo.car_types = res.data.car_types;
            _this.fillInfo.property_types_array = res.data.property_types;
            _this.fillInfo.configurations_array = res.data.configurations;
            _this.fillInfo.configurations = [];
            _this.fillInfo.proximity_place_ids = [];
            _this.fillInfo.property_types = [];
            _this.fillInfo.proximity_places_array.forEach(function (element) {
                r.data.lead.proximity_places.forEach(function (p) {
                    if (p.id === element.id) {
                        element.is_selected = 1;
                    }
                });
            });
            _this.fillInfo.car_types.forEach(function (element) {
                element.is_selected = (r.data.lead.prefs != null) &&
                    r.data.lead.prefs.car_type_id && (r.data.lead.prefs.car_type_id === element.id) ? 1 : 0;
            });
            _this.fillInfo.property_types_array.forEach(function (element) {
                r.data.lead.property_types.forEach(function (pt) {
                    if (pt.id === element.id) {
                        element.is_selected = 1;
                    }
                });
            });
            _this.fillInfo.configurations_array.forEach(function (element) {
                r.data.lead.configuration.forEach(function (c) {
                    if (c.id === element.id) {
                        element.is_selected = 1;
                    }
                });
            });
        });
        if (r.data.lead.prefs !== null) {
            this.fillInfo.family_size = r.data.lead.prefs.family_size;
            this.fillInfo.pets = r.data.lead.prefs.pets;
            this.fillInfo.kid_count = r.data.lead.prefs.kid_count;
            this.fillInfo.min_price = r.data.lead.min_price;
            this.fillInfo.max_price = r.data.lead.max_price;
            this.fillInfo.price_range = [r.data.lead.prefs.min_price, r.data.lead.prefs.max_price];
            if (r.data.lead.prefs.planning_to_buy !== null) {
                this.fillInfo.planning_to_buy = new __WEBPACK_IMPORTED_MODULE_5__pipes_chat_time_pipe__["a" /* ChatTimePipe */]().transform(r.data.lead.prefs.planning_to_buy, 'YYYY-MM-DD H:m:s', 4);
            }
            // this.fillInfo.configuration = r.data.lead.configuration;
            // this.parameter.prefs = r.data.lead.prefs;
        }
        else {
            this.fillInfo.family_size = 1;
            this.fillInfo.pets = '';
            this.fillInfo.kid_count = '';
            this.fillInfo.min_price = this.constant.minValue;
            this.fillInfo.max_price = this.constant.maxValue;
            this.fillInfo.price_range = [this.constant.minValue, this.constant.maxValue];
            // this.parameter.prefs = new FillInformation();
        }
    };
    InhouseBrokerDetailComponent.prototype.viewFavProperties = function () {
        this.showPropertyModal.nativeElement.click();
    };
    InhouseBrokerDetailComponent.prototype.getInvoice = function () {
        var _this = this;
        this.parameter.url = 'getInvoicePdf/' + this.parameter.lead_id;
        this.parameter.loading = true;
        this.admin.getInvoicePdf(this.parameter.url).subscribe(function (r) {
            _this.parameter.loading = false;
            if (r) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_file_saver__["saveAs"])(r, 'Invoice_' + __WEBPACK_IMPORTED_MODULE_8_moment__(new Date()).format('DD MMM YYYY, h:mm a') + '.pdf');
            }
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    InhouseBrokerDetailComponent.prototype.add = function () {
        var _this = this;
        var d = new Date(this.appointment.appointment_date);
        var f = __WEBPACK_IMPORTED_MODULE_8_moment__(d).utc().format('YYYY-MM-DD HH:mm:ss');
        this.input = {
            lead_id: this.parameter.lead_id,
            property_id: this.parameter.lead.selected_properties[0].property_id,
            appointment_date: f,
            sent_as: this.parameter.sent_as
        };
        if (this.appointment.id) {
            this.input.id = this.appointment.id;
        }
        this.parameter.loading = true;
        this.admin.postDataApi('leads/addAppointment', this.input)
            .subscribe(function (success) {
            console.log(success.data);
            _this.appointment = success.data;
            _this.app_date = _this.appointment.appointment_date;
            _this.appointment.appointment_date =
                new Date(__WEBPACK_IMPORTED_MODULE_8_moment__(_this.appointment.appointment_date).utc(true).local().format('YYYY-MM-DD, h:mm a'));
            _this.parameter.loading = false;
            _this.closeModal();
            swal('Success', 'Appointment scheduled successfully.', 'success');
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    InhouseBrokerDetailComponent.prototype.openModal = function () {
        this.modalOpen.nativeElement.click();
    };
    InhouseBrokerDetailComponent.prototype.closeModal = function () {
        this.modalClose.nativeElement.click();
    };
    InhouseBrokerDetailComponent.prototype.dealFinalisedReceived = function (value) {
        this.is_deal_finalised = true;
    };
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('modalOpen'),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _a : Object)
    ], InhouseBrokerDetailComponent.prototype, "modalOpen", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('modalClose'),
        __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _b : Object)
    ], InhouseBrokerDetailComponent.prototype, "modalClose", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('showPropertyModal'),
        __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _c : Object)
    ], InhouseBrokerDetailComponent.prototype, "showPropertyModal", void 0);
    InhouseBrokerDetailComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-inhouse-broker-detail',
            template: __webpack_require__("../../../../../src/app/layout/leads/inhouse-broker/inhouse-broker-detail/inhouse-broker-detail.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/leads/inhouse-broker/inhouse-broker-detail/inhouse-broker-detail.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_4__models_leads_model__["c" /* DealFinalize */], __WEBPACK_IMPORTED_MODULE_4__models_leads_model__["b" /* FillInformation */], __WEBPACK_IMPORTED_MODULE_4__models_leads_model__["h" /* AddAppointment */]]
        }),
        __metadata("design:paramtypes", [typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"]) === "function" ? _d : Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */]) === "function" ? _e : Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__common_constants__["a" /* Constant */]) === "function" ? _f : Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_4__models_leads_model__["b" /* FillInformation */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__models_leads_model__["b" /* FillInformation */]) === "function" ? _g : Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_7__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__angular_http__["b" /* Http */]) === "function" ? _h : Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_4__models_leads_model__["h" /* AddAppointment */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__models_leads_model__["h" /* AddAppointment */]) === "function" ? _j : Object])
    ], InhouseBrokerDetailComponent);
    return InhouseBrokerDetailComponent;
}());

//# sourceMappingURL=inhouse-broker-detail.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/leads/inhouse-broker/inhouse-broker-detail/my-chat/my-chat.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/leads/inhouse-broker/inhouse-broker-detail/my-chat/my-chat.component.html":
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<div class=\"row\">\n    <div class=\"col-lg-4 col-md-4 col-sm-12 col-12\">\n      <div malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\" class=\"chat-name-list white-bg\">\n         <div *ngIf=\"loadingConversation\" class=\"chat-window white-bg\"><img style=\"width:100%\" src=\"assets/img/loading_content.gif\"></div>\n         <div *ngIf=\"!loadingConversation && conversations.length == 0\" class=\"padding20\">No conversation found</div>\n         <a *ngFor=\"let con of conversations\" [ngClass]=\"{'active':con.selected == true}\" href=\"javascript://\">\n            <div class=\"profile\" (click)=\"selectConversation(con)\">\n               <div class=\"fig-block\">\n                  <img [src]=\"con.image\" onerror='src=\"http://via.placeholder.com/62x62\"' alt=\"img\" />\n               </div>\n               <div class=\"profile-info\">\n                  <h6>{{con.name}}</h6>\n                  <!-- <p class=\"p12\">{{con.phone}}</p> -->\n                  <p class=\"p12\">{{con.phone}}</p>\n                  <i class=\"fa fa-angle-right float-right\"></i>\n               </div>\n            </div>\n         </a>\n      </div>\n   </div>\n   \n   <div class=\"col-lg-8 col-md-8 col-sm-12 col-12\">\n      <div *ngIf=\"loadingMessages\" class=\"chat-window white-bg\"><img style=\"width:100%\" src=\"assets/img/loading_content.gif\"></div>\n      <div *ngIf=\"conversation && !loadingMessages\" class=\"chat-window white-bg\">\n         <div class=\"chat-top\">\n             <a href=\"javascript://\">\n               <div class=\"profile\">\n                  <div class=\"fig-block\">\n                     <img [src]=\"parameter.image\" onerror='src=\"http://via.placeholder.com/62x62\"' alt=\"img\">\n                  </div>\n                  <div class=\"profile-info\">\n                     <h6>{{parameter.name}}</h6>\n                     <!-- <p class=\"p12\">{{conversation.other.phone}}</p> -->\n                     <p class=\"p12\">{{parameter.phone}}</p>\n                  </div>\n               </div>\n            </a>\n  \n         </div>\n  \n         <div *ngIf=\"messages\" malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\" class=\"chat-area scrollbox\" #chatWin>\n          <div *ngIf=\"loadmore\" class=\"chat-load-more\" (click)=\"loadMore()\" >\n            Previous Messages <img *ngIf=\"loadmoring\" src=\"assets/img/loading-p.gif\">\n          </div> \n          <div *ngFor=\"let m of messages;let i = index\" [ngClass]=\"m?.conversation_user?.admin_id == admin_id ? 'chat-user-one' :'chat-user-two'\" class=\"chat-user\">\n            <p *ngIf=\"m.message_type == 1\" style=\"word-wrap: break-word;\">\n              <!-- <span *ngIf=\"m.loading\" class=\"m-loader\"><img src=\"assets/img/loading-p.gif\"></span> -->\n              <span>{{m.message}}</span>\n            </p>\n  \n            <!-- <a class=\"btn btn-sm btn-danger\" [group]=\"group\" ng-box href=\"{{lastReport.image.original}}\">View</a> -->\n            <!-- <a *ngIf=\"m.message_type == 2\" ng-box width=\"800\" height=\"800\" target=\"_blank\" href=\"{{m.image}}\">\n                <img src=\"{{m.image}}\">\n            </a> -->\n            <a *ngIf=\"m.message_type == 2\" href=\"{{m.image}}\" data-lightbox=\"image\" title=\"image\" >\n              <span>\n                <img class=\"ui bordered small image\" src=\"{{m.image}}\">\n                <div *ngIf=\"m.loading\" class=\"loaderr\"></div>\n              </span>\n            </a>\n            <!-- <a *ngIf=\"m.message_type == 2\" href=\"{{m.image}}\" data-lightbox=\"image\" data-title=\"My caption\">\n              <img class=\"ui bordered small image\" src=\"{{m.image}}\">\n              \n            </a> -->\n            <!-- <a *ngIf=\"m.message_type == 3\" href=\"{{m.video}}\" title=\"Video\" class=\"chat-vid\">\n              <span >\n                <img class=\"ui bordered small image\" src=\"{{m.image}}\">\n                <img *ngIf=\"!m.loading\" class=\"vid-icon\" (click)=\"playVideo(i)\" src=\"assets/img/play-button.png\" />\n                <div *ngIf=\"m.loading\" class=\"loaderr\"></div>\n              </span>\n            </a> -->\n            \n            <div class=\"chat-vid\" *ngIf=\"m.message_type == 3 && !m.play\">\n              <span>\n                  <img class=\"ui bordered small image\" src=\"{{m.image}}\" onerror=\"this.src='assets/img/placeholder.png'\">\n                  <img *ngIf=\"!m.loading\" class=\"vid-icon\" (click)=\"playVideo(i)\" src=\"assets/img/play-button.png\" />\n                  <div *ngIf=\"m.loading\" class=\"loaderr\"></div>\n                  <div class=\"clearfix\"></div>\n            </span>\n            </div>\n            <video *ngIf=\"m.message_type == 3 && m.play\" src=\"{{m.video}}\" autoplay type=\"video/mp4\" controls></video>\n            \n            <!-- <div class=\"chat-vid\" *ngIf=\"m.message_type == 3 && !m.play\">\n              <span>\n                <img class=\"vid-img\" src=\"{{m.image}}\">\n                <img class=\"vid-icon\" (click)=\"playVideo(i)\" src=\"assets/img/play-button (2).png\"/>\n                <div class=\"clearfix\"></div>\n            </span>\n            </div> -->\n            <!-- <video *ngIf=\"m.message_type == 3 && m.play\" src=\"{{m.video}}\" autoplay type=\"video/mp4\" controls></video> -->\n            \n            <div class=\"chat-shared-file\" *ngIf=\"m.message_type == 4\">\n              <span *ngIf=\"m.loading\" class=\"m-loader\">\n                <img class=\"ui bordered small image\" src='assets/img/placeholder.png'>\n                <div *ngIf=\"m.loading\" class=\"loaderr\"></div>\n              </span>\n              <span *ngIf=\"!m.loading\">\n                <a href=\"javascript://\" target=\"_blank\" href=\"{{m.attachment}}\"><span>{{m.attachment_name}} <img class=\"viewfull\" src=\"assets/img/viewfull.png\"></span>\n                </a>\n              </span>\n            </div>\n              \n            <a *ngIf=\"m.message_type == 5\" href=\"{{m.property_url}}\" target=\"_blank\" title=\"image\" >\n              <span>\n                <img class=\"ui bordered small image\" src=\"{{m.image}}\">\n                <div *ngIf=\"m.loading\" class=\"loaderr\"></div>\n              </span>\n              <h5>{{m.message}}</h5>\n            </a>\n            \n            <div class=\"time clearfix\" *ngIf=\"m.updated_at && !m.uid\">{{m.updated_at| moment}}</div>\n            <div class=\"time clearfix\" *ngIf=\"m.updated_at && m.uid\">\n                {{m.updated_at|date:'h:mm a, MMM d y'}}\n            </div>\n  \n           </div>\n  \n         </div>\n  \n         <div style=\"position: absolute; z-index: 1; margin: 0px; padding: 0px; other: block; left: 581px; top: 91px;\"><div class=\"enscroll-track track3\" style=\"position: relative; height: 367px;\"><a href=\"\" class=\"handle3\" style=\"position: absolute; z-index: 1; height: 199.244px; top: 0px;\"><div class=\"top\"></div><div class=\"bottom\"></div></a></div></div>\n  \n         <div class=\"chat-text\">\n          <div class=\"dropdown attach-items\">\n            <a href=\"javascript://\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" #optionsButton>\n              <i class=\"fa fa-paperclip\" aria-hidden=\"true\"></i>\n            </a>\n            <div class=\"dropdown-menu\">\n              <div class=\"dropdown-item\">\n                <input type=\"file\" name=\"image\" accept=\"image/*\" (change)=\"onSelectFile('image', $event)\">\n                <i class=\"fa fa-camera\" aria-hidden=\"true\"></i>\n                <span>Photo</span>\n              </div>\n              <a class=\"dropdown-item\"> \n                <!-- <input type=\"file\" name=\"video\" id=\"videoFileObject\" name=\"video\" accept=\"video/mp4,video/x-m4v,video/*\" (change)=\"showCanvas($event)\"> -->\n                <input type=\"file\" name=\"video1\" accept=\"video/mp4,video/x-m4v,video/*\" (change)=\"showCanvas($event)\">\n                <i class=\"fa fa-video-camera\" aria-hidden=\"true\"></i>\n                <span>Video</span>\n              </a>\n              <a class=\"dropdown-item\">    \n                  <input type=\"file\" name=\"attachment\" accept=\".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf\" (change)=\"saveAttachment($event)\">\n                <i class=\"fa fa-file\" aria-hidden=\"true\"></i>\n                <span>Document</span>\n              </a>\n              <a class=\"dropdown-item\" (click)=\"blockGetProperty.showModal()\">    \n                <i class=\"fa fa-file\" aria-hidden=\"true\"></i>\n                <span>Property</span>\n              </a>\n            </div>\n          </div>\n          <input id=\"message\" autocomplete=\"off\" [(ngModel)]=\"textMessage\" (keyup.enter)=\"setText()\" class=\"chat-input\" type=\"text\" name=\"message\" placeholder=\"Type your message here …\">\n          \n          <!-- <div class=\"chat-attached-file\" *ngIf=\"model.message_type == 2\">\n            <div class=\"attached-inner\">\n              <a href=\"javascript://\" (click)=\"updateModel('image')\" class=\"close\">&times;</a>\n              <div class=\"fig-block\"><img class=\"img-fluid\" src=\"{{model.image}}\" alt=\"img\"></div>\n            </div>\n          </div>\n          <div class=\"chat-attached-file\">\n            <div class=\"attached-inner\">\n              <a href=\"javascript://\" (click)=\"updateModel('video')\" class=\"close\">&times;</a>\n              <div class=\"fig-block\">\n                  <video style=\"width: 100%; height: 100%;\" src=\"{{model.video}}\" class=\"video55\" autoplay type=\"video/mp4\" controls></video>\n              </div>\n            </div>\n          </div>\n          <div class=\"chat-attached-file\" *ngIf=\"model.message_type == 4\">\n            <div class=\"attached-inner\">\n              <a href=\"javascript://\" (click)=\"updateModel('video')\" class=\"close\">&times;</a>\n              <div class=\"fig-block\">\n                <div class=\"chat-shared-file\">\n                  <a href=\"javascript://\"><span>{{model.attachment_name}}</span>\n                    <i class=\"fa fa-times\" (click)=\"updateModel('attachment')\" aria-hidden=\"true\"></i>\n                  </a>\n                </div>\n              </div>\n            </div>\n          </div> -->\n          <video style=\"width: 100%; height: 100%;\" src=\"{{videoSrc}}\" class=\"video55\" autoplay type=\"video/mp4\" controls></video>\n          <canvas style=\"display: none;\" width=\"800\" height=\"600\" id=\"canvas\"></canvas>\n  \n          <button (click)=\"setText()\" class=\"btn\">Send</button>\n          \n         </div>\n  \n      </div>\n      </div>\n    </div>\n  \n    <app-block-get-property #blockGetProperty (itemSelect)=\"sendProperty($event)\"></app-block-get-property>"

/***/ }),

/***/ "../../../../../src/app/layout/leads/inhouse-broker/inhouse-broker-detail/my-chat/my-chat.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_common_service__ = __webpack_require__("../../../../../src/app/services/common.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_chat_model__ = __webpack_require__("../../../../../src/app/models/chat.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_socket_io_client__ = __webpack_require__("../../../../socket.io-client/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_socket_io_client__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyChatComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyChatComponent = /** @class */ (function () {
    function MyChatComponent(element, admin, cs, constant, route
    // private ts:TranslateService
    ) {
        this.element = element;
        this.admin = admin;
        this.cs = cs;
        this.constant = constant;
        this.route = route;
        this.parameter = {};
        this.conversations = [];
        this.messages = [];
        this.loadingMessages = false;
        this.loadingConversation = false;
        this.editModel = false;
        this.seconds = true;
        this.isActive = true;
        this.imgObj = {
            thumbnail: '',
            original: ''
        };
        this.imgArray = [];
        this.durationInSec = 0;
        this.showVideo = true;
        this.videoObj = {
            thumbnail: '',
            original: ''
        };
        this.loadmore = true;
        this.loadmoring = false;
        this.scrollbarOptions = { axis: 'y', theme: 'dark' };
    }
    MyChatComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.lead_id = params.id;
        });
        this.loginData$$ = this.admin.loginData$.subscribe(function (success) {
            _this.admin_id = success['id'];
        });
        this.loadingConversation = true;
        this.admin.postDataApi('leads/developers', { lead_id: this.lead_id }).subscribe(function (r) {
            _this.conversations = r['data'];
            if (_this.conversations.length > 0) {
                _this.initSocket();
                _this.selectConversation(_this.conversations[0]);
            }
            _this.loadingConversation = false;
        });
    };
    MyChatComponent.prototype.selectConversation = function (conversation) {
        var _this = this;
        this.parameter.name = conversation.name;
        this.parameter.image = conversation.image;
        this.parameter.dialCode = conversation.dial_code;
        this.parameter.phone = conversation.phone;
        var data1 = {
            lead_id: this.lead_id,
            other_id: conversation.id,
            other_sent_as: this.constant.userType.user_seller_dev,
            sent_as: this.constant.userType.inhouse_broker
        };
        this.parameter.loading = true;
        this.admin.postDataApi('conversation/getLeadConversation', data1).subscribe(function (res) {
            _this.parameter.loading = false;
            console.log('===========', res);
            if (res.data) {
                _this.conversation = res.data;
                _this.conversation_id = res.data[0].id;
                _this.loadmore = true;
                _this.conversations.map(function (con) {
                    con.selected = false;
                    if (con === conversation) {
                        con.selected = true;
                        // this.conversation_id = con.id;
                    }
                });
                var data = {
                    sent_as: _this.constant.userType.inhouse_broker,
                    lead_id: _this.lead_id,
                    conversation_id: _this.conversation_id
                };
                _this.loadingMessages = true;
                _this.admin.postDataApi('conversation/getMessages', data).subscribe(function (r) {
                    console.log(r);
                    _this.messages = r.data[0].messages;
                    // this.messages.map(r=>{
                    //   r.loading = true;
                    //   return r;
                    // });
                    if (_this.messages.length < 30) {
                        _this.loadmore = false;
                    }
                    _this.loadingMessages = false;
                    setTimeout(function () {
                        _this.scrollToBottom();
                    }, 200);
                });
            }
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    MyChatComponent.prototype.initSocket = function () {
        var _this = this;
        // this.socket = io.connect(environment.socket_url,{
        //   extraHeaders: {
        //     Authorization: "Bearer authorization_token_here"
        //   }
        // });
        this.socket = __WEBPACK_IMPORTED_MODULE_6_socket_io_client__["connect"](this.admin.socketUrl);
        this.socket.on('connect', function (fun) {
            _this.socket_id = _this.socket.id;
            _this.connected = _this.socket.connected;
            var data = {
                admin_id: _this.admin_id,
                socket_id: _this.socket_id,
                device_id: _this.admin.deviceId + '_' + _this.admin_id
            };
            if (_this.connected) {
                // console.log('Socket Connected', this.socket_id, data);
                _this.socket.emit('add-admin', data, function (res) {
                    // console.log('res', res);
                });
                _this.socket.on('message', function (response) {
                    if (response.data.conversation_id === _this.conversation_id) {
                        // console.log('Message received');
                        _this.messages.push(response.data);
                        setTimeout(function () {
                            _this.scrollToBottom();
                        }, 200);
                    }
                });
            }
        });
    };
    MyChatComponent.prototype.scrollToBottom = function () {
        if (this.chatWin) {
            $('.chat-area').mCustomScrollbar('scrollTo', 'bottom', { scrollInertia: 0 });
        }
    };
    MyChatComponent.prototype.onSelectFile = function (param, event) {
        var _this = this;
        this.optionsButton.nativeElement.click();
        if (event.target.files[0].size > this.constant.fileSizeLimit) {
            swal('Error', this.constant.errorMsg.FILE_SIZE_EXCEEDS, 'error');
            return false;
        }
        var model = new __WEBPACK_IMPORTED_MODULE_5__models_chat_model__["a" /* Chat */];
        model.message = this.textMessage;
        model.message_type = 2;
        model.loading = true;
        model.uid = Math.random().toString(36).substr(2, 15);
        model.conversation_id = this.conversation_id;
        model.conversation_user = { admin_id: this.admin_id };
        var d = new Date();
        model.updated_at = d.toUTCString();
        this.messages.push(model);
        setTimeout(function () {
            _this.scrollToBottom();
        }, 100);
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                _this.image = e.target.result;
                model[param] = e.target.result;
                _this.cs.saveImage(event.target.files[0]).subscribe(function (success) {
                    model.image = success['data'].image;
                    _this.sendMessage(model);
                });
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };
    MyChatComponent.prototype.saveAttachment = function (event) {
        var _this = this;
        this.optionsButton.nativeElement.click();
        if (event.target.files[0].size > this.constant.fileSizeLimit) {
            swal('Error', this.constant.errorMsg.FILE_SIZE_EXCEEDS, 'error');
            return false;
        }
        var model = new __WEBPACK_IMPORTED_MODULE_5__models_chat_model__["a" /* Chat */];
        model.message = this.textMessage;
        model.message_type = 4;
        model.loading = true;
        model.uid = Math.random().toString(36).substr(2, 15);
        model.conversation_id = this.conversation_id;
        model.conversation_user = { admin_id: this.admin_id };
        model.attachment_name = event.target.files[0].name;
        var d = new Date();
        model.updated_at = d.toUTCString();
        this.messages.push(model);
        setTimeout(function () {
            _this.scrollToBottom();
        }, 100);
        this.cs.saveAttachment(event.target.files[0]).subscribe(function (success) {
            model.attachment = success['data'].name;
            // console.log('==>', model);
            _this.sendMessage(model);
        });
    };
    MyChatComponent.prototype.playVideo = function (i) {
        this.messages[i].play = true;
    };
    MyChatComponent.prototype.showCanvas = function (event) {
        var _this = this;
        this.optionsButton.nativeElement.click();
        if (event.target.files[0].size > this.constant.fileSizeLimit) {
            swal('Error', this.constant.errorMsg.FILE_SIZE_EXCEEDS, 'error');
            return false;
        }
        this.showVideo = true;
        var model = new __WEBPACK_IMPORTED_MODULE_5__models_chat_model__["a" /* Chat */];
        model.message = this.textMessage;
        model.message_type = 3;
        model.loading = true;
        model.uid = Math.random().toString(36).substr(2, 15);
        model.conversation_id = this.conversation_id;
        model.conversation_user = { admin_id: this.admin_id };
        var d = new Date();
        model.updated_at = d.toUTCString();
        this.messages.push(model);
        setTimeout(function () {
            _this.scrollToBottom();
        }, 100);
        setTimeout(function () {
            _this.video = document.getElementById('video1');
            var reader = new FileReader();
            var videoTest = _this.element.nativeElement.querySelector('.video55');
            reader.onload = function (e) {
                var _this = this;
                var src = e.target['result'];
                videoTest.src = src;
                var timer = setInterval(function () {
                    // find duration of video only of video is in ready state
                    if (videoTest.readyState === 4) {
                        _this.durationInSec = videoTest.duration.toFixed(0);
                        setTimeout(function () {
                            // create canvas at middle of video
                            _this.newcanvas(videoTest, event.target.files[0], model);
                        }, 3000);
                        // setTimeout(() => {
                        //   // create canvas at middle of video
                        //   this.newcanvas(videoTest, event.target.files[0], model);
                        // }, (this.durationInSec / 2).toFixed(0));
                        clearInterval(timer);
                    }
                }, 1000);
            }.bind(_this);
            reader.readAsDataURL(event.target.files[0]);
            // setTimeout(() => {
            //   this.newcanvas(videoTest, event.target.files[0]);
            // }, 4000);
        }, 1000);
    };
    MyChatComponent.prototype.newcanvas = function (video, videoFile, model) {
        var _this = this;
        var canvas = document.getElementById('canvas');
        // console.log(canvas);
        var ss = canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, canvas.width, canvas.height);
        var ImageURL = canvas.toDataURL('image/jpeg');
        model.image = ImageURL;
        // console.log(model);
        var fileToUpload = this.dataURLtoFile(ImageURL, 'tempFile.png');
        this.cs.saveVideo(videoFile, fileToUpload).subscribe(function (success) {
            // console.log('image', success);
            model.video = success['data'].video;
            model.image = success['data'].thumb;
            _this.sendMessage(model);
        }
        //  error => {
        //   console.log(error);
        // }
        );
    };
    MyChatComponent.prototype.dataURLtoFile = function (dataurl, filename) {
        var arr = dataurl.split(',');
        var mime = arr[0].match(/:(.*?);/)[1];
        var bstr = atob(arr[1]);
        var n = bstr.length;
        var u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };
    MyChatComponent.prototype.setText = function () {
        if (!this.textMessage) {
            return false;
        }
        else if ((Object.keys(this.admin.admin_acl).length !== 0 && this.admin.admin_acl['Broker Lead Management'].can_update === 0) ||
            this.admin.permissions.can_in_house_broker === 0) {
            return false;
        }
        else {
            var model = new __WEBPACK_IMPORTED_MODULE_5__models_chat_model__["a" /* Chat */];
            model.message = this.textMessage;
            model.message_type = 1;
            model.loading = true;
            model.uid = Math.random().toString(36).substr(2, 15);
            model.conversation_id = this.conversation_id;
            model.conversation_user = { admin_id: this.admin_id };
            var d = new Date();
            model.updated_at = d.toUTCString();
            this.messages.push(model);
            this.textMessage = '';
            this.sendMessage(model);
        }
    };
    MyChatComponent.prototype.sendMessage = function (model) {
        var _this = this;
        if (model.message_type === 1 && !model.message) {
            swal('Error', 'Please enter some text.', 'error');
        }
        else {
            setTimeout(function () {
                _this.scrollToBottom();
            }, 100);
            // console.log('Appending', model);
            this.admin.postDataApi('conversation/sendMessage', model).subscribe(function (r) {
                // console.log('sendMessage', r);
                if (model.loading == true) {
                    model.loading = false;
                    var foundIndex = _this.messages.findIndex(function (x) { return x.uid == model.uid; });
                    _this.messages[foundIndex] = r['data'];
                }
                setTimeout(function () {
                    _this.scrollToBottom();
                }, 100);
            });
        }
    };
    MyChatComponent.prototype.loadMore = function () {
        var _this = this;
        this.loadmoring = true;
        var data = {
            sent_as: 2,
            conversation_id: this.conversation_id,
            lead_id: this.lead_id,
            last_message_id: this.messages[0].id
        };
        // console.log(data);
        this.admin.postDataApi('conversation/getMessages', data).subscribe(function (res) {
            // console.log(res);
            _this.loadmoring = false;
            if (res['data'].length < 30) {
                _this.loadmore = false;
            }
            _this.messages = res['data'].concat(_this.messages);
        }
        // error => {}
        );
    };
    MyChatComponent.prototype.sendProperty = function (property) {
        console.log('M=>', property);
        var model = new __WEBPACK_IMPORTED_MODULE_5__models_chat_model__["a" /* Chat */];
        model.message = property.configuration.name + ' in ' + property.building.name;
        model.message_type = 5;
        model.property_id = property.id;
        model.image = property.image;
        model.property_url = property.property_url;
        model.loading = true;
        model.updated_at = new Date();
        model.uid = Math.random().toString(36).substr(2, 15);
        model.conversation_id = this.conversation_id;
        model.conversation_user = { admin_id: this.admin_id };
        this.messages.push(model);
        this.sendMessage(model);
    };
    MyChatComponent.prototype.onDestroy = function () {
        if (this.loginData$$) {
            this.loginData$$.unsubscribe();
        }
    };
    var _a, _b, _c, _d, _e, _f, _g;
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('chatWin'),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _a : Object)
    ], MyChatComponent.prototype, "chatWin", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('optionsButton'),
        __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _b : Object)
    ], MyChatComponent.prototype, "optionsButton", void 0);
    MyChatComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-my-chat',
            template: __webpack_require__("../../../../../src/app/layout/leads/inhouse-broker/inhouse-broker-detail/my-chat/my-chat.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/leads/inhouse-broker/inhouse-broker-detail/my-chat/my-chat.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_5__models_chat_model__["a" /* Chat */], __WEBPACK_IMPORTED_MODULE_4__common_constants__["a" /* Constant */]]
        }),
        __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _c : Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */]) === "function" ? _d : Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__services_common_service__["a" /* CommonService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_common_service__["a" /* CommonService */]) === "function" ? _e : Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_4__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__common_constants__["a" /* Constant */]) === "function" ? _f : Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"]) === "function" ? _g : Object])
    ], MyChatComponent);
    return MyChatComponent;
}());

//# sourceMappingURL=my-chat.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/leads/inhouse-broker/inhouse-broker.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/leads/inhouse-broker/inhouse-broker.component.html":
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<div class=\"container-fluid\">\n    <div class=\"row\" *ngIf=\"admin?.admin_acl['Broker Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n        <div class=\"col-md-4\">\n            <div class=\"form-group\">\n                <p class=\"p16\">Manage Inhouse Broker's Leads</p>\n                <div class=\"d-flex\">\n                <button (click)=\"removeCsrUser()\" class=\"all-btn\">All</button>\n\n                <div class=\"autocomplete\">\n                    <input style=\"max-width:200px\" list=\"amenities\" [(ngModel)]=\"parameter.keyword\" (input)=\"getCsrListing()\" class=\"form-control\" type=\"text\" name=\"keyword\" (focusout)=\"closeCsrListing()\">\n                    <div id=\"myInputautocomplete-list\" class=\"autocomplete-items\">\n                        <div *ngFor=\"let item of users\" (click)=\"selectCsrUser(item)\">{{item.email}}</div>\n                    </div>\n                </div>\n                \n                </div>\n            </div>\n        </div>\n        <div class=\"col-md-2\">\n            <div class=\"form-group\">\n                <label>Country</label>\n                <select class=\"form-control\" (change)=\"onCountryChange($event.target.value)\">\n                    <option value=\"0\">All</option>\n                    <option *ngFor=\"let item of location.countries\" [value]=\"item.id\">{{item.name}}</option>\n                </select>\n            </div>\n        </div>\n        <div class=\"col-md-2\">\n            <div class=\"form-group\">\n            <label>State</label>\n            <select class=\"form-control\" (change)=\"onStateChange($event.target.value)\">\n                <option value=\"0\">All</option>\n                <option *ngFor=\"let item of location.states\" [value]=\"item.id\">{{item.name}}</option>\n            </select>\n            </div>\n        </div>\n        <div class=\"col-md-2\">\n            <div class=\"form-group\">\n            <label>City</label>\n                <select class=\"form-control\" (change)=\"onCityChange($event.target.value)\">\n                <option value=\"0\">All</option>\n                <option *ngFor=\"let item of location.cities\" [value]=\"item.id\">{{item.name}}</option>\n                </select>\n            </div>\n        </div>\n    \n        <div class=\"col-md-2\">\n            <div class=\"form-group\">\n            <label>Locality</label>\n            <select class=\"form-control\" (change)=\"onLocalityChange($event.target.value)\">\n                <option value=\"0\">All</option>\n                <option *ngFor=\"let item of location.localities\" [value]=\"item.id\">{{item.name}}</option>\n            </select>\n            </div>\n        </div>\n    </div>\n    \n        <!-- <div *ngIf=\"users?.length > 0 && initSelection\"class=\"row\">\n            <table class=\"table table-striped\">\n                <tbody><tr *ngFor=\"let item of users\" (click)=\"selectCsrUser(item)\">\n                    <td> <img class=\"rounded-circle\" [src]=\"item.image\" onerror='this.src=\"http://via.placeholder.com/50x50\"' alt=\"img\"></td>\n                    <td class=\"text-left\">\n                        <span class=\"name\">{{item.name}}</span>\n                    </td>\n                    <td class=\"text-left\">\n                        {{item.phone}}\n                    </td>\n                    <td class=\"text-left\">\n                        {{item.email}}\n                    </td>\n                    <td>\n                        <a href=\"javascript://\" class=\"icon-block edit-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></a>\n                        <a href=\"javascript://\" class=\"icon-block block-icon\"><img src=\"assets/img/block.png\" alt=\"img\"></a>\n                    </td>\n                    </tr>\n                </tbody>\n            </table>\n        </div> -->\n    <div class=\"listingResults\" >\n        <div class=\"row\">\n            <div class=\"col-12\">\n                <div class=\"cust-tabs-2\">\n                <ul class=\"nav nav-tabs\">\n                    <li class=\"nav-item\">\n                        <a class=\"nav-link\" [ngClass]=\"{'active':parameter.flag==1}\" (click)=\"changeFlag(1)\" >This Week</a>\n                    </li>\n                    <li class=\"nav-item\">\n                        <a class=\"nav-link\" [ngClass]=\"{'active':parameter.flag==2}\" (click)=\"changeFlag(2)\" >This Month</a>\n                    </li>\n                    <li class=\"nav-item\">\n                        <a class=\"nav-link\" [ngClass]=\"{'active':parameter.flag==3}\" (click)=\"changeFlag(3)\" >Last Month</a>\n                    </li>\n                    <li class=\"nav-item\">\n                        <a class=\"nav-link\" [ngClass]=\"{'active':parameter.flag==4}\" (click)=\"changeFlag(4)\" >Lifetime</a>\n                    </li>\n                    <li class=\"nav-item\">\n                        <a class=\"nav-link\" [ngClass]=\"{'active':parameter.flag==5}\" (click)=\"parameter.flag=5\" >Custom</a>\n                    </li>\n                </ul>\n                </div>\n            </div>\n            <div class=\"col-12\">\n                <hr style=\"margin-top:0;\">\n                <div *ngIf=\"parameter.flag == 5\" class=\"pull-right btn-cont\">\n                    From:<input type=\"date\" [ngModel] =\"parameter.min | date:'yyyy-MM-dd'\" max=\"{{today| date:'yyyy-MM-dd'}}\" (ngModelChange)=\"parameter.min = $event; parameter.max=''\" />\n                    To:<input type=\"date\" [ngModel] =\"parameter.max | date:'yyyy-MM-dd'\" min=\"{{parameter.min | date:'yyyy-MM-dd'}}\" max=\"{{today| date:'yyyy-MM-dd'}}\" (ngModelChange)=\"parameter.max = $event\" />\n                    <button class=\"btn btn-primary\" href=\"javascript://\" (click)=\"getListing()\" [disabled]=\"\n                    parameter.flag == 5 && (!parameter.min || !parameter.max)\n                    \">Go</button>\n                </div>\n            </div>\n        </div>\n        <div *ngIf=\"selectedUser as item\" class=\"sigle-row-table\">\n            <table class=\"table table-striped\">\n                <tbody>\n                    <tr>\n                        <td> <img class=\"rounded-circle\" [src]=\"item.image\" onerror='this.src=\"http://via.placeholder.com/50x50\"' alt=\"img\"></td>\n                        <td class=\"text-left\">\n                            <span class=\"name\">{{item.name}}</span>\n                        </td>\n                        <td class=\"text-left\">\n                            {{item.phone}}\n                        </td>\n                        <td class=\"text-left\">\n                            {{item.email}}\n                        </td>\n                        <td>\n                            <a (click)=\"removeCsrUser()\" href=\"javascript://\" class=\"icon-block edit-icon\"><img src=\"assets/img/remove-icon.png\" alt=\"remove\" title=\"remove\" /></a>\n                            <!-- <a href=\"javascript://\" class=\"icon-block edit-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></a>\n                            <a href=\"javascript://\" class=\"icon-block block-icon\"><img src=\"assets/img/block.png\" alt=\"img\"></a> -->\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-lg-8 col-md-12 col-sm-12 col-12\">\n                <div class=\"info-box all-leads\">\n                <div class=\"row\">\n                    <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == '1'}\" (click)=\"changeCountFlag(1)\">\n                        <div class=\"one-row \">\n                            <div class=\"o-block\">\n                            <h5>Leads</h5>\n                            <small>Total</small>\n                            </div>\n                            <div class=\"o-block\">\n                            <a class=\"view-all\" href=\"javascript://\">View All</a>\n                            <h4>{{dash?.lead_total}}</h4>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == '2'}\" (click)=\"changeCountFlag(2)\">\n                        <div class=\"one-row\">\n                            <div class=\"o-block\">\n                            <h5>Properties</h5>\n                            <small>Dealing In</small>\n                            </div>\n                            <div class=\"o-block\">\n                            <a class=\"view-all\" href=\"javascript://\">View All</a>\n                            <h4>{{dash?.lead_properties}}</h4>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                </div>\n                <div class=\"info-box all-leads\">\n                <div class=\"row\">\n                    <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == '3'}\" (click)=\"changeCountFlag(3)\">\n                        <div class=\"one-row \">\n                            <div class=\"o-block\">\n                            <h5>Leads</h5>\n                            <small>Open</small>\n                            </div>\n                            <div class=\"o-block\">\n                            <a class=\"view-all\" href=\"javascript://\">View All</a>\n                            <h4>{{dash?.lead_open}}</h4>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == '4'}\" (click)=\"changeCountFlag(4)\">\n                        <div class=\"one-row\">\n                            <div class=\"o-block\">\n                            <h5>Leads</h5>\n                            <small>Closed</small>\n                            </div>\n                            <div class=\"o-block\">\n                            <a class=\"view-all\" href=\"javascript://\">View All</a>\n                            <h4>{{dash?.lead_closed}}</h4>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                </div>\n        \n            </div>\n            <div class=\"col-lg-4 col-md-12 col-sm-12 col-12\">\n                <div class=\"chat-msg all-leads\" style=\"padding:0px\">\n                    <div class=\"padding20\" *ngIf=\"dash.lead_total == 0\">No records found</div>\n                    <ngx-charts-pie-chart [results]=\"chartView\"></ngx-charts-pie-chart>\n                </div>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-12\">\n                <div class=\"spacer40\"></div>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-6\">\n                <div class=\"title-group\">\n                <h5>Leads \n                    <span *ngIf=\"parameter.count_flag == 1\">(Total)</span>\n                    <span *ngIf=\"parameter.count_flag == 2\">(Properties Dealing In)</span>\n                    <span *ngIf=\"parameter.count_flag == 3\">(Open)</span>\n                    <span *ngIf=\"parameter.count_flag == 4\">(Closed)</span>\n                </h5>\n                <p>\n                    <!-- Showing {{parameter.page}} out of {{parameter.total_count}} -->\n                    </p>\n                </div>\n            </div>\n            <div class=\"col-6\">\n                <div class=\"add-new text-right\">\n                    <a class=\"btn\" (click)=\"bulkAssign()\" href=\"javascript://\">Bulk Re-assign</a>\n                </div>\n            </div>\n        </div>\n        <div class=\"white-bg\">\n            <div class=\"tabel-section\">\n                <div class=\"table-responsive\">\n                    <table class=\"table table-striped table-align-left vertical-align-top\">\n                        <tr>\n                            <th style=\"width:6%\">\n                                <div class=\"table-search\">\n                                    <label>All</label>\n                                    <div>\n                                        <label class=\"cust-check-bx\" >\n                                            <input class=\"width1\" type=\"checkbox\" (click)=\"selectAll(parameter.is_selected)\" name=\"document\">\n                                            <span class=\"checkmark\"></span>\n                                        </label>\n                                    </div>\n                                </div>\n                            </th>\n\n                            <th style=\"width:6%\">\n                                <div class=\"table-search\"></div>\n                            </th>\n                            <th style=\"width:15%\">\n                                <div class=\"table-search\">\n                                    <label>Name</label>\n                                    <div class=\"searh-3\">\n                                        <input autocomplete=\"off\" type=\"text\" [(ngModel)]=\"parameter.name\" (keyup.enter)=\"changeFilter('name',$event.target.value)\" name=\"\">\n                                        <button *ngIf=\"parameter.name\" (click)=\"changeFilter('name', parameter.name)\"><i class=\"fa fa-search\"></i></button>\n                                    </div>\n                                </div>\n                            </th>\n                            <th style=\"width:15%; text-align:left;\">\n                                <div class=\"table-search\">\n                                    <label>Contact Number</label>\n                                    <div class=\"searh-3\">\n                                        <input autocomplete=\"off\" type=\"text\" [(ngModel)]=\"parameter.phone\" (keyup.enter)=\"changeFilter('phone',$event.target.value)\" name=\"\">\n                                        <button *ngIf=\"parameter.phone\" (click)=\"changeFilter('phone', parameter.phone)\"><i class=\"fa fa-search\"></i></button>\n                                    </div>\n                                </div>\n                            </th>\n                            <th style=\"width:20%\">\n                                <div class=\"table-search\">\n                                    <label>Email</label>\n                                    <div class=\"searh-3\">\n                                        <input autocomplete=\"off\" type=\"text\" [(ngModel)]=\"parameter.email\" (keyup.enter)=\"changeFilter('email',$event.target.value)\" name=\"\">\n                                        <button *ngIf=\"parameter.email\" (click)=\"changeFilter('email', parameter.email)\"><i class=\"fa fa-search\"></i></button>\n                                    </div>\n                                </div>\n                            </th>\n                            <th style=\"width:10%\">\n                                <div class=\"table-search\">\n                                    <label>Interested In</label>\n                                </div>\n                            </th>\n                            <th style=\"width:10%\">\n                                <div class=\"table-search\">\n                                    <label>Assignee</label>\n                                </div>\n                            </th>\n                            <th style=\"width:10%\">\n                                <div class=\"table-search\">\n                                    <label>User Choice</label>\n                                </div>\n                            </th>\n                            <th style=\"width:10%\">\n                                <div class=\"table-search\">\n                                    <label>Change Property For</label>\n                                </div>\n                            </th>\n                            <!-- <th style=\"width:4%\"></th> -->\n                        </tr>\n                        <tr class=\"cursor-pointer\" title=\"Click to view details\" *ngFor=\"let item of items| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: parameter.total }; let in=index\"\n                            routerLink=\"/dashboard/leads/inhouse-broker/{{item.id}}\">\n                        <td (click)=\"$event.stopPropagation()\">\n                            <label class=\"cust-check-bx\" >\n                            <input type=\"checkbox\" [(ngModel)]=\"item.selected\" name=\"document\">\n                            <span class=\"checkmark\"></span>\n                            </label>\n                            <!-- <i class=\"fa\" [ngClass]=\"item.selected?'fa-check-square-o':'fa-square-o'\" (click)=\"item.selected = !item.selected\" aria-hidden=\"true\"></i> -->\n                        </td>\n                        <td>\n                            <img *ngIf=\"item.image\" class=\"rounded-circle\" [src]=\"item.image\" alt=\"img\">\n                            <img *ngIf=\"!item.image\" class=\"rounded-circle\" src=\"./../../../assets/img/default_img.png\" alt=\"img\">\n                        </td>\n                        <td class=\"text-left\">\n                            <span class=\"name\">{{item.name}}</span>\n                        </td>\n                        <td class=\"text-left\" *ngIf=\"item.phone\">{{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}</td>\n                        <td class=\"text-left\" *ngIf=\"!item.phone\">NA</td>\n                        <td class=\"text-left\">{{item.email}}</td>\n                        <td>\n                            <span *ngFor=\"let conf of item.configuration; let ii=index\">\n                                {{conf.name}}<span *ngIf=\"ii<item?.configuration?.length-1\">,</span>\n                            </span>\n                            <span *ngIf=\"item.configuration?.length==0\">NA</span>\n                        </td>\n                        <td class=\"text-left\" title=\"Inhouse Broker\" *ngIf=\"item?.admin?.name\">{{item.broker.name}}</td>\n                        <td class=\"text-left\" *ngIf=\"!item?.admin?.name\">Not Assigned</td>\n                        <td class=\"text-left\" *ngIf=\"item.sale_rent\">{{item.sale_rent==1 ? 'Buy' : 'Rent'}}</td>\n                        <td class=\"text-left\">\n                            <a *ngIf=\"admin?.admin_acl['Buyer Lead Management']?.can_update==0\" class=\"green-color fontW500\" href=\"javascript://\">\n                                Change to {{item.sale_rent==1 ? 'Rent' : 'Buy'}}\n                            </a>\n                            <a *ngIf=\"admin?.admin_acl['Buyer Lead Management']?.can_update==1\" class=\"green-color fontW500\" (click)=\"updateLeadType($event, item.sale_rent==1?'2':'1', item.id, in)\" href=\"javascript://\">\n                                Change to {{item.sale_rent==1 ? 'Rent' : 'Buy'}}\n                            </a>\n                        </td>\n                        <!-- <td>\n                            <a href=\"javascript://\" title=\"View Details\" routerLink=\"/dashboard/leads/inhouse-broker/{{item.id}}\" class=\"icon-block edit-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></a>\n                        </td> -->\n                        </tr>\n                    </table>\n                    <div class=\"padding20 center\" *ngIf=\"parameter.noResultFound\">\n                            <img src=\"assets/img/404-error.png\">\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"btn-cont text-right marginT15\" *ngIf=\"parameter.total\">\n        <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n    </div>\n</div>\n\n\n\n<!-- Assignment model -->\n<a data-toggle=\"modal\" data-target=\"#assign-model\" #openAssignModel></a>\n<div class=\"modal\" id=\"assign-model\">\n        <div class=\"modal-dialog \">\n            <div class=\"modal-content notary-avail\">\n                <div class=\"modal-header popup-header\">\n                <h4 class=\"modal-title\">Re Assign to</h4>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #closeAssignModel>&times;</button>\n                </div>\n                <div class=\"modal-body\">\n                    <div class=\"row\">\n                        <div class=\"col-md-8\">\n                            <input style=\"max-width:200px\" list=\"amenities\" [(ngModel)]=\"assign.keyword\" (input)=\"getAssignListing()\" class=\"form-control\" type=\"text\" name=\"keyword\" placeholder=\"Search\">\n                        </div>\n                        <div class=\"col-md-4 btn-cont\">\n                            <a class=\"btn btn-primary pull-right\" href=\"javascript://\" (click)=\"assignNow()\">Assign</a>\n                        </div>\n                    </div>\n                    <div class=\"spacer40\"></div>\n                    <table class=\"table\">\n                        <tr *ngFor=\"let item of assign.items\">\n                            <td *ngIf=\"item.is_blocked!=1\">\n                                <div class=\"n-avail-profile\">\n                                <img [src]=\"item.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\">\n                                <div class=\"n-avail-info\">\n                                    <p class=\"p12\">{{item.name}}</p>\n                                    <p class=\"p10\">Phone : {{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}</p>\n                                </div>\n                                </div>\n                            </td>\n                            <td *ngIf=\"item.is_blocked!=1\">\n                                <label class=\"cust-check-bx float-right\">\n                                    <input type=\"radio\" name=\"notary_id\" (click)=\"assignItem = item\">\n                                    <span class=\"checkmark\"></span>\n                                </label>\n                            </td>\n                        </tr>\n                    </table>\n                </div>\n            </div>\n        </div>\n    </div>\n    "

/***/ }),

/***/ "../../../../../src/app/layout/leads/inhouse-broker/inhouse-broker.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InhouseBrokerComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var InhouseBrokerComponent = /** @class */ (function () {
    function InhouseBrokerComponent(admin, constant, route) {
        this.admin = admin;
        this.constant = constant;
        this.route = route;
        this.parameter = {};
        this.location = {};
        this.assign = {};
        this.items = [];
        this.today = new Date();
        this.users = [];
        this.initSelection = false;
        this.dash = {
            lead_total: 0,
            lead_lead_properties: 0,
            lead_open: 0,
            lead_closed: 0
        };
        this.chartView = [];
    }
    InhouseBrokerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.parameter.is_selected = false;
        this.parameter.keyword = '';
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        this.parameter.flag = 2;
        this.parameter.total = 0;
        this.parameter.count_flag = 1;
        this.route.params.subscribe(function (params) {
            _this.parameter.assignee_id = params.id;
        });
        this.getCountries();
        this.getListing();
        this.getCsrSellerDash();
        Object.assign(this, this.chartView);
    };
    InhouseBrokerComponent.prototype.getCountries = function () {
        var _this = this;
        this.admin.postDataApi('getCountryLocality', {}).subscribe(function (r) {
            _this.location.countries = r['data'];
        });
    };
    InhouseBrokerComponent.prototype.onCountryChange = function (id) {
        this.location.states = [];
        this.parameter.state_id = '0';
        this.location.cities = [];
        this.parameter.city_id = '0';
        this.location.localities = [];
        this.parameter.locality_id = '0';
        if (!id || id === '0') {
            this.parameter.state_id = '0';
            return false;
        }
        this.parameter.country_id = id;
        var selectedCountry = this.location.countries.filter(function (x) { return x.id.toString() === id; });
        this.location.states = selectedCountry[0].states;
    };
    InhouseBrokerComponent.prototype.onStateChange = function (id) {
        this.location.localities = [];
        this.parameter.locality_id = '0';
        if (!id || id === '0') {
            this.parameter.city_id = '0';
            return false;
        }
        this.parameter.state_id = id;
        var selectedState = this.location.states.filter(function (x) { return x.id.toString() === id; });
        this.location.cities = selectedState[0].cities;
    };
    InhouseBrokerComponent.prototype.onCityChange = function (id) {
        if (!id || id === '0') {
            this.parameter.locality_id = '0';
            return false;
        }
        this.parameter.city_id = id;
        var selectedCountry = this.location.cities.filter(function (x) { return x.id.toString() === id; });
        this.location.localities = selectedCountry[0].localities;
    };
    InhouseBrokerComponent.prototype.onLocalityChange = function (id) {
        if (!id || id === '0') {
            return false;
        }
        this.parameter.locality_id = id;
        this.getCsrListing();
    };
    InhouseBrokerComponent.prototype.changeFlag = function (flag) {
        this.parameter.flag = flag;
        this.parameter.count_flag = 1;
        this.getListing();
        this.getCsrSellerDash();
    };
    InhouseBrokerComponent.prototype.changeFilter = function (key, value) {
        this.parameter[key] = value;
        this.getListing();
    };
    InhouseBrokerComponent.prototype.changeCountFlag = function (flag) {
        this.parameter.count_flag = flag;
        this.getListing();
    };
    InhouseBrokerComponent.prototype.getCsrListing = function () {
        var _this = this;
        this.initSelection = true;
        this.users = [];
        var input = new FormData();
        if (this.parameter.keyword) {
            input.append('keyword', this.parameter.keyword);
        }
        if (this.parameter.country_id && this.parameter.country_id !== '-1') {
            input.append('countries', JSON.stringify([this.parameter.country_id]));
        }
        if (this.parameter.state_id && this.parameter.state_id !== '-1') {
            input.append('states', JSON.stringify([this.parameter.state_id]));
        }
        if (this.parameter.city_id && this.parameter.city_id !== '-1') {
            input.append('cities', JSON.stringify([this.parameter.city_id]));
        }
        if (this.parameter.locality_id && this.parameter.locality_id !== '-1') {
            input.append('localities', JSON.stringify([this.parameter.locality_id]));
        }
        this.admin.postDataApi('getInhouseBroker', input).subscribe(function (success) {
            _this.users = success.data;
        });
    };
    InhouseBrokerComponent.prototype.closeCsrListing = function () {
        var _this = this;
        setTimeout(function () {
            _this.users = [];
        }, 200);
    };
    InhouseBrokerComponent.prototype.selectCsrUser = function (user) {
        this.selectedUser = user;
        this.users = [];
        this.parameter.keyword = '';
        this.initSelection = false;
        this.getListing();
        this.getCsrSellerDash();
    };
    InhouseBrokerComponent.prototype.removeCsrUser = function () {
        this.selectedUser = '';
        this.parameter.keyword = '';
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        // this.parameter.flag = 2;
        this.parameter.total = 0;
        this.parameter.count_flag = 1;
        this.getListing();
        this.getCsrSellerDash();
    };
    InhouseBrokerComponent.prototype.getCsrSellerDash = function () {
        var _this = this;
        var input = new FormData();
        if (this.selectedUser) {
            input.append('assignee_id', this.selectedUser.id);
        }
        else if (this.parameter.assignee_id) {
            input.append('assignee_id', this.parameter.assignee_id);
        }
        if (this.parameter.flag) {
            input.append('flag', this.parameter.flag.toString());
        }
        this.admin.postDataApi('leads/in-house-broker-dash-count', input).subscribe(function (r) {
            _this.dash = r.data;
            _this.chartView = [
                {
                    'name': 'Total Leads',
                    'value': parseInt(_this.dash.lead_total, 10)
                },
                {
                    'name': 'Lead properties',
                    'value': parseInt(_this.dash.lead_properties, 10)
                },
                {
                    'name': 'Lead open',
                    'value': parseInt(_this.dash.lead_open, 10)
                },
                {
                    'name': 'Lead closed',
                    'value': parseInt(_this.dash.lead_closed, 10)
                }
            ];
        });
    };
    InhouseBrokerComponent.prototype.getListing = function () {
        var _this = this;
        this.items = [];
        this.parameter.noResultFound = false;
        var input = JSON.parse(JSON.stringify(this.parameter));
        if (this.selectedUser) {
            input.assignee_id = this.selectedUser.id;
        }
        else if (this.parameter.assignee_id) {
            input.assignee_id = this.parameter.assignee_id;
        }
        this.parameter.loading = true;
        this.admin.postDataApi('leads/in-house-broker', input).subscribe(function (success) {
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
    InhouseBrokerComponent.prototype.getPage = function (page) {
        this.parameter.page = page;
        this.getListing();
    };
    InhouseBrokerComponent.prototype.sort_by = function (sort_by_flag) {
        if (this.parameter.sort_by_flag !== sort_by_flag) {
            this.parameter.sort_by_flag = sort_by_flag;
            this.parameter.sort_by_order = 0;
        }
        else {
            this.parameter.sort_by_order = this.parameter.sort_by_order ? 0 : 1;
        }
        this.getListing();
    };
    InhouseBrokerComponent.prototype.updateLeadType = function ($event, sale_rent, lead_id, index) {
        var _this = this;
        $event.stopPropagation();
        console.log('----');
        this.parameter.url = 'leads/updateLeadType';
        swal({
            html: this.constant.title.ARE_YOU_SURE + '<br>' + 'You want to change availability for this property?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.parameter.loading = true;
                _this.admin.postDataApi(_this.parameter.url, { sale_rent: sale_rent, lead_id: lead_id })
                    .subscribe(function (success) {
                    _this.parameter.loading = false;
                    _this.items[index].sale_rent = sale_rent;
                    swal('Success', 'Availability for this property changed successfully.', 'success');
                }, function (error) {
                    _this.parameter.loading = false;
                });
            }
        });
    };
    InhouseBrokerComponent.prototype.selectAll = function (is_selected) {
        var _this = this;
        this.parameter.is_selected = !is_selected;
        this.items.forEach(function (item) {
            item.selected = _this.parameter.is_selected;
        });
    };
    InhouseBrokerComponent.prototype.bulkAssign = function () {
        // this.assign.keyword = '';
        var leads_ids = this.items.filter(function (x) { return x.selected; }).map(function (y) { return y.id; });
        if (leads_ids.length === 0) {
            swal('Error', 'Please choose atleast one lead.', 'error');
            return false;
        }
        this.openAssignModel.nativeElement.click();
        // this.admin.postDataApi('getInhouseBroker', {}).subscribe(
        //   success => {
        //     this.assign.items = success.data;
        //   });
    };
    InhouseBrokerComponent.prototype.getAssignListing = function () {
        var _this = this;
        // this.assign.items = [];
        var input = {
            keyword: this.assign.keyword
        };
        this.admin.postDataApi('getInhouseBroker', input).subscribe(function (success) {
            _this.assign.items = success.data;
        });
    };
    InhouseBrokerComponent.prototype.assignNow = function () {
        var _this = this;
        var leads_ids = this.items.filter(function (x) { return x.selected; }).map(function (y) { return y.id; });
        var input = {
            broker_id: this.assignItem.id,
            leads: leads_ids
        };
        this.parameter.loading = true;
        this.admin.postDataApi('leads/bulkAssignBroker', input).subscribe(function (r) {
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
    var _a, _b, _c, _d, _e;
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('openAssignModel'),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _a : Object)
    ], InhouseBrokerComponent.prototype, "openAssignModel", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('closeAssignModel'),
        __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _b : Object)
    ], InhouseBrokerComponent.prototype, "closeAssignModel", void 0);
    InhouseBrokerComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-inhouse-broker',
            template: __webpack_require__("../../../../../src/app/layout/leads/inhouse-broker/inhouse-broker.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/leads/inhouse-broker/inhouse-broker.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_2__common_constants__["a" /* Constant */]]
        }),
        __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" ? _c : Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__common_constants__["a" /* Constant */]) === "function" ? _d : Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["ActivatedRoute"]) === "function" ? _e : Object])
    ], InhouseBrokerComponent);
    return InhouseBrokerComponent;
}());

//# sourceMappingURL=inhouse-broker.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/leads/leads.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/leads/leads.component.html":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "../../../../../src/app/layout/leads/leads.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LeadsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LeadsComponent = /** @class */ (function () {
    function LeadsComponent(admin) {
        this.admin = admin;
        this.parameter = {};
        this.items = [];
    }
    LeadsComponent.prototype.ngOnInit = function () {
        this.parameter.page = 1;
        this.parameter.flag = 2;
        // this.getListing();
    };
    LeadsComponent.prototype.changeFlag = function (flag) {
        this.parameter.flag = flag;
        this.getListing();
    };
    LeadsComponent.prototype.changeFilter = function (key, value) {
        this.parameter[key] = value;
        this.getListing();
    };
    LeadsComponent.prototype.getListing = function () {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'leads/csr-buyer';
        var input = new FormData();
        if (this.parameter.page) {
            input.append('page', this.parameter.page.toString());
        }
        if (this.parameter.flag) {
            input.append('flag', this.parameter.flag.toString());
        }
        if (this.parameter.name) {
            input.append('name', this.parameter.name);
        }
        if (this.parameter.email) {
            input.append('email', this.parameter.email);
        }
        if (this.parameter.phone) {
            input.append('phone', this.parameter.phone);
        }
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            // console.log(success);
            _this.parameter.loading = false;
            _this.items = success.data;
            _this.parameter.total = success.total;
        });
    };
    var _a;
    LeadsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-leads',
            template: __webpack_require__("../../../../../src/app/layout/leads/leads.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/leads/leads.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" ? _a : Object])
    ], LeadsComponent);
    return LeadsComponent;
}());

//# sourceMappingURL=leads.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/leads/leads.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_loading__ = __webpack_require__("../../../../ngx-loading/ngx-loading/ngx-loading.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_tel_input__ = __webpack_require__("../../../../ng2-tel-input/ng2-tel-input.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_tel_input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ng2_tel_input__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ngx_pagination__ = __webpack_require__("../../../../ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ngx_malihu_scrollbar__ = __webpack_require__("../../../../ngx-malihu-scrollbar/dist/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_nouislider__ = __webpack_require__("../../../../ng2-nouislider/src/ng2-nouislider.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_nouislider___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_ng2_nouislider__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pipes_remove_comma_pipe__ = __webpack_require__("../../../../../src/app/pipes/remove-comma.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__leads_component__ = __webpack_require__("../../../../../src/app/layout/leads/leads.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__data_collector_data_collector_component__ = __webpack_require__("../../../../../src/app/layout/leads/data-collector/data-collector.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__csr_seller_csr_seller_component__ = __webpack_require__("../../../../../src/app/layout/leads/csr-seller/csr-seller.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__csr_buyer_csr_buyer_component__ = __webpack_require__("../../../../../src/app/layout/leads/csr-buyer/csr-buyer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__inhouse_broker_inhouse_broker_component__ = __webpack_require__("../../../../../src/app/layout/leads/inhouse-broker/inhouse-broker.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__csr_closer_csr_closer_component__ = __webpack_require__("../../../../../src/app/layout/leads/csr-closer/csr-closer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__csr_buyer_csr_buyer_detail_csr_buyer_detail_component__ = __webpack_require__("../../../../../src/app/layout/leads/csr-buyer/csr-buyer-detail/csr-buyer-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__inhouse_broker_inhouse_broker_detail_inhouse_broker_detail_component__ = __webpack_require__("../../../../../src/app/layout/leads/inhouse-broker/inhouse-broker-detail/inhouse-broker-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__csr_closer_csr_closer_detail_csr_closer_detail_component__ = __webpack_require__("../../../../../src/app/layout/leads/csr-closer/csr-closer-detail/csr-closer-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__common_blocks_interested_property_interested_property_component__ = __webpack_require__("../../../../../src/app/layout/common-blocks/interested-property/interested-property.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__common_blocks_viewed_property_viewed_property_component__ = __webpack_require__("../../../../../src/app/layout/common-blocks/viewed-property/viewed-property.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__common_blocks_fill_information_fill_information_component__ = __webpack_require__("../../../../../src/app/layout/common-blocks/fill-information/fill-information.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__inhouse_broker_inhouse_broker_detail_my_chat_my_chat_component__ = __webpack_require__("../../../../../src/app/layout/leads/inhouse-broker/inhouse-broker-detail/my-chat/my-chat.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__guards_acl_user_guard__ = __webpack_require__("../../../../../src/app/guards/acl-user.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__modules_shared_module__ = __webpack_require__("../../../../../src/app/modules/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__csr_seller_csr_seller_detail_csr_seller_detail_component__ = __webpack_require__("../../../../../src/app/layout/leads/csr-seller/csr-seller-detail/csr-seller-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__swimlane_ngx_charts__ = __webpack_require__("../../../../@swimlane/ngx-charts/release/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__swimlane_ngx_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_26__swimlane_ngx_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__common_blocks_viewed_projects_viewed_projects_component__ = __webpack_require__("../../../../../src/app/layout/common-blocks/viewed-projects/viewed-projects.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28_primeng_primeng__ = __webpack_require__("../../../../primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_28_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__csr_seller_csr_seller_detail_seller_chat_seller_chat_component__ = __webpack_require__("../../../../../src/app/layout/leads/csr-seller/csr-seller-detail/seller-chat/seller-chat.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LeadsModule", function() { return LeadsModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








// import { NgBoxModule } from 'ngbox/ngbox.module';
// import { NgBoxService } from 'ngbox/ngbox.service';






















var routes = [
    { path: 'data-collectors', component: __WEBPACK_IMPORTED_MODULE_11__data_collector_data_collector_component__["a" /* DataCollectorComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_23__guards_acl_user_guard__["a" /* AclUserGuard */]], data: { roles: ['Data Collector Lead Management', 'can_read', 'can_data_collector'] } },
    { path: 'csr-sellers', component: __WEBPACK_IMPORTED_MODULE_12__csr_seller_csr_seller_component__["a" /* CsrSellerComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_23__guards_acl_user_guard__["a" /* AclUserGuard */]], data: { roles: ['Seller Lead Management', 'can_read', 'can_csr_seller'] } },
    { path: 'csr-sellers-leads/:id', component: __WEBPACK_IMPORTED_MODULE_12__csr_seller_csr_seller_component__["a" /* CsrSellerComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_23__guards_acl_user_guard__["a" /* AclUserGuard */]], data: { roles: ['Seller Lead Management', 'can_read', 'can_csr_seller'] } },
    { path: 'csr-sellers/:id', component: __WEBPACK_IMPORTED_MODULE_25__csr_seller_csr_seller_detail_csr_seller_detail_component__["a" /* CsrSellerDetailComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_23__guards_acl_user_guard__["a" /* AclUserGuard */]], data: { roles: ['Seller Lead Management', 'can_read', 'can_csr_seller'] } },
    { path: 'chat-with-seller/:id/:user_id', component: __WEBPACK_IMPORTED_MODULE_29__csr_seller_csr_seller_detail_seller_chat_seller_chat_component__["a" /* SellerChatComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_23__guards_acl_user_guard__["a" /* AclUserGuard */]], data: { roles: ['Seller Lead Management', 'can_read', 'can_csr_seller'] } },
    { path: 'csr-buyers', component: __WEBPACK_IMPORTED_MODULE_13__csr_buyer_csr_buyer_component__["a" /* CsrBuyerComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_23__guards_acl_user_guard__["a" /* AclUserGuard */]], data: { roles: ['Buyer Lead Management', 'can_read', 'can_csr_buyer'] } },
    { path: 'csr-buyers-leads/:id', component: __WEBPACK_IMPORTED_MODULE_13__csr_buyer_csr_buyer_component__["a" /* CsrBuyerComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_23__guards_acl_user_guard__["a" /* AclUserGuard */]], data: { roles: ['Buyer Lead Management', 'can_read', 'can_csr_buyer'] } },
    { path: 'csr-buyers/:id', component: __WEBPACK_IMPORTED_MODULE_16__csr_buyer_csr_buyer_detail_csr_buyer_detail_component__["a" /* CsrBuyerDetailComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_23__guards_acl_user_guard__["a" /* AclUserGuard */]], data: { roles: ['Buyer Lead Management', 'can_read', 'can_csr_buyer'] } },
    { path: 'inhouse-broker', component: __WEBPACK_IMPORTED_MODULE_14__inhouse_broker_inhouse_broker_component__["a" /* InhouseBrokerComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_23__guards_acl_user_guard__["a" /* AclUserGuard */]], data: { roles: ['Broker Lead Management', 'can_read', 'can_in_house_broker'] } },
    { path: 'inhouse-broker-leads/:id', component: __WEBPACK_IMPORTED_MODULE_14__inhouse_broker_inhouse_broker_component__["a" /* InhouseBrokerComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_23__guards_acl_user_guard__["a" /* AclUserGuard */]], data: { roles: ['Broker Lead Management', 'can_read', 'can_in_house_broker'] } },
    { path: 'inhouse-broker/:id', component: __WEBPACK_IMPORTED_MODULE_17__inhouse_broker_inhouse_broker_detail_inhouse_broker_detail_component__["a" /* InhouseBrokerDetailComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_23__guards_acl_user_guard__["a" /* AclUserGuard */]], data: { roles: ['Broker Lead Management', 'can_read', 'can_in_house_broker'] } },
    { path: 'chat-with-developer/:id', component: __WEBPACK_IMPORTED_MODULE_22__inhouse_broker_inhouse_broker_detail_my_chat_my_chat_component__["a" /* MyChatComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_23__guards_acl_user_guard__["a" /* AclUserGuard */]], data: { roles: ['Broker Lead Management', 'can_read', 'can_in_house_broker'] } },
    { path: 'csr-closers', component: __WEBPACK_IMPORTED_MODULE_15__csr_closer_csr_closer_component__["a" /* CsrCloserComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_23__guards_acl_user_guard__["a" /* AclUserGuard */]], data: { roles: ['Closer Lead Management', 'can_read', 'can_csr_closer'] } },
    { path: 'csr-closers-leads/:id', component: __WEBPACK_IMPORTED_MODULE_15__csr_closer_csr_closer_component__["a" /* CsrCloserComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_23__guards_acl_user_guard__["a" /* AclUserGuard */]], data: { roles: ['Closer Lead Management', 'can_read', 'can_csr_closer'] } },
    { path: 'csr-closers/:id', component: __WEBPACK_IMPORTED_MODULE_18__csr_closer_csr_closer_detail_csr_closer_detail_component__["a" /* CsrCloserDetailComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_23__guards_acl_user_guard__["a" /* AclUserGuard */]], data: { roles: ['Closer Lead Management', 'can_read', 'can_csr_closer'] } }
];
// const routes: Routes = [
//   { path: 'data-collectors', component: DataCollectorComponent,
//     canActivate: [AuthGuard], data: {roles: ['Data Collector Lead Management', 'can_read', 'can_data_collector']}},
//   { path: 'csr-sellers', component: CsrSellerComponent,
//     canActivate: [AuthGuard], data: {roles: ['Seller Lead Management', 'can_read', 'can_csr_seller']}},
//   { path: 'csr-buyers', component: CsrBuyerComponent,
//     canActivate: [AuthGuard], data: {roles: ['Buyer Lead Management', 'can_read', 'can_csr_buyer']}},
//   { path: 'csr-buyers/:id', component: CsrBuyerDetailComponent,
//     canActivate: [AuthGuard], data: {roles: ['Buyer Lead Management', 'can_read', 'can_csr_buyer']}},
//   { path: 'inhouse-broker', component: InhouseBrokerComponent,
//     canActivate: [AuthGuard], data: {roles: ['Broker Lead Management', 'can_read', 'can_in_house_broker']}},
//   { path: 'inhouse-broker/:id', component: InhouseBrokerDetailComponent,
//     canActivate: [AuthGuard], data: {roles: ['Broker Lead Management', 'can_read', 'can_in_house_broker']}},
//   { path: 'chat-with-developer/:id', component: MyChatComponent,
//     canActivate: [AuthGuard], data: {roles: ['Broker Lead Management', 'can_update', 'can_in_house_broker']}},
//   { path: 'csr-closers', component: CsrCloserComponent,
//     canActivate: [AuthGuard], data: {roles: ['Closer Lead Management', 'can_read', 'can_csr_closer']}},
//   { path: 'csr-closers/:id', component: CsrCloserDetailComponent,
//     canActivate: [AuthGuard], data: {roles: ['Closer Lead Management', 'can_read', 'can_csr_closer']}}
// ];
var LeadsModule = /** @class */ (function () {
    function LeadsModule() {
    }
    LeadsModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_router__["RouterModule"].forChild(routes),
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_3_ngx_loading__["a" /* LoadingModule */].forRoot({
                    animationType: __WEBPACK_IMPORTED_MODULE_3_ngx_loading__["b" /* ANIMATION_TYPES */].rectangleBounce,
                    primaryColour: '#00B96F'
                }),
                __WEBPACK_IMPORTED_MODULE_6_ngx_pagination__["a" /* NgxPaginationModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["ReactiveFormsModule"],
                __WEBPACK_IMPORTED_MODULE_5_ng2_tel_input__["Ng2TelInputModule"],
                __WEBPACK_IMPORTED_MODULE_7_ngx_malihu_scrollbar__["a" /* MalihuScrollbarModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_8_ng2_nouislider__["NouisliderModule"],
                __WEBPACK_IMPORTED_MODULE_26__swimlane_ngx_charts__["NgxChartsModule"],
                __WEBPACK_IMPORTED_MODULE_24__modules_shared_module__["a" /* SharedModule */],
                __WEBPACK_IMPORTED_MODULE_28_primeng_primeng__["CalendarModule"]
                // LayoutModule
                // NgBoxModule
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_10__leads_component__["a" /* LeadsComponent */],
                __WEBPACK_IMPORTED_MODULE_11__data_collector_data_collector_component__["a" /* DataCollectorComponent */],
                __WEBPACK_IMPORTED_MODULE_12__csr_seller_csr_seller_component__["a" /* CsrSellerComponent */],
                __WEBPACK_IMPORTED_MODULE_25__csr_seller_csr_seller_detail_csr_seller_detail_component__["a" /* CsrSellerDetailComponent */],
                __WEBPACK_IMPORTED_MODULE_13__csr_buyer_csr_buyer_component__["a" /* CsrBuyerComponent */],
                __WEBPACK_IMPORTED_MODULE_14__inhouse_broker_inhouse_broker_component__["a" /* InhouseBrokerComponent */],
                __WEBPACK_IMPORTED_MODULE_15__csr_closer_csr_closer_component__["a" /* CsrCloserComponent */],
                __WEBPACK_IMPORTED_MODULE_16__csr_buyer_csr_buyer_detail_csr_buyer_detail_component__["a" /* CsrBuyerDetailComponent */],
                __WEBPACK_IMPORTED_MODULE_17__inhouse_broker_inhouse_broker_detail_inhouse_broker_detail_component__["a" /* InhouseBrokerDetailComponent */],
                __WEBPACK_IMPORTED_MODULE_18__csr_closer_csr_closer_detail_csr_closer_detail_component__["a" /* CsrCloserDetailComponent */],
                __WEBPACK_IMPORTED_MODULE_19__common_blocks_interested_property_interested_property_component__["a" /* InterestedPropertyComponent */],
                __WEBPACK_IMPORTED_MODULE_20__common_blocks_viewed_property_viewed_property_component__["a" /* ViewedPropertyComponent */],
                __WEBPACK_IMPORTED_MODULE_27__common_blocks_viewed_projects_viewed_projects_component__["a" /* ViewedProjectsComponent */],
                __WEBPACK_IMPORTED_MODULE_9__pipes_remove_comma_pipe__["a" /* RemoveCommaPipe */],
                __WEBPACK_IMPORTED_MODULE_21__common_blocks_fill_information_fill_information_component__["a" /* FillInformationComponent */],
                __WEBPACK_IMPORTED_MODULE_22__inhouse_broker_inhouse_broker_detail_my_chat_my_chat_component__["a" /* MyChatComponent */],
                __WEBPACK_IMPORTED_MODULE_29__csr_seller_csr_seller_detail_seller_chat_seller_chat_component__["a" /* SellerChatComponent */]
            ],
        })
    ], LeadsModule);
    return LeadsModule;
}());

//# sourceMappingURL=leads.module.js.map

/***/ }),

/***/ "../../../../../src/app/pipes/remove-comma.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RemoveCommaPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var RemoveCommaPipe = /** @class */ (function () {
    function RemoveCommaPipe() {
    }
    RemoveCommaPipe.prototype.transform = function (value, args) {
        return null;
    };
    RemoveCommaPipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'removeComma'
        })
    ], RemoveCommaPipe);
    return RemoveCommaPipe;
}());

//# sourceMappingURL=remove-comma.pipe.js.map

/***/ }),

/***/ "../../../../events/events.js":
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),

/***/ "../../../../file-saver/FileSaver.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/* FileSaver.js
 * A saveAs() FileSaver implementation.
 * 1.3.2
 * 2016-06-16 18:25:19
 *
 * By Eli Grey, http://eligrey.com
 * License: MIT
 *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
 */

/*global self */
/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

var saveAs = saveAs || (function(view) {
	"use strict";
	// IE <10 is explicitly unsupported
	if (typeof view === "undefined" || typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
		return;
	}
	var
		  doc = view.document
		  // only get URL when necessary in case Blob.js hasn't overridden it yet
		, get_URL = function() {
			return view.URL || view.webkitURL || view;
		}
		, save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
		, can_use_save_link = "download" in save_link
		, click = function(node) {
			var event = new MouseEvent("click");
			node.dispatchEvent(event);
		}
		, is_safari = /constructor/i.test(view.HTMLElement) || view.safari
		, is_chrome_ios =/CriOS\/[\d]+/.test(navigator.userAgent)
		, throw_outside = function(ex) {
			(view.setImmediate || view.setTimeout)(function() {
				throw ex;
			}, 0);
		}
		, force_saveable_type = "application/octet-stream"
		// the Blob API is fundamentally broken as there is no "downloadfinished" event to subscribe to
		, arbitrary_revoke_timeout = 1000 * 40 // in ms
		, revoke = function(file) {
			var revoker = function() {
				if (typeof file === "string") { // file is an object URL
					get_URL().revokeObjectURL(file);
				} else { // file is a File
					file.remove();
				}
			};
			setTimeout(revoker, arbitrary_revoke_timeout);
		}
		, dispatch = function(filesaver, event_types, event) {
			event_types = [].concat(event_types);
			var i = event_types.length;
			while (i--) {
				var listener = filesaver["on" + event_types[i]];
				if (typeof listener === "function") {
					try {
						listener.call(filesaver, event || filesaver);
					} catch (ex) {
						throw_outside(ex);
					}
				}
			}
		}
		, auto_bom = function(blob) {
			// prepend BOM for UTF-8 XML and text/* types (including HTML)
			// note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
			if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
				return new Blob([String.fromCharCode(0xFEFF), blob], {type: blob.type});
			}
			return blob;
		}
		, FileSaver = function(blob, name, no_auto_bom) {
			if (!no_auto_bom) {
				blob = auto_bom(blob);
			}
			// First try a.download, then web filesystem, then object URLs
			var
				  filesaver = this
				, type = blob.type
				, force = type === force_saveable_type
				, object_url
				, dispatch_all = function() {
					dispatch(filesaver, "writestart progress write writeend".split(" "));
				}
				// on any filesys errors revert to saving with object URLs
				, fs_error = function() {
					if ((is_chrome_ios || (force && is_safari)) && view.FileReader) {
						// Safari doesn't allow downloading of blob urls
						var reader = new FileReader();
						reader.onloadend = function() {
							var url = is_chrome_ios ? reader.result : reader.result.replace(/^data:[^;]*;/, 'data:attachment/file;');
							var popup = view.open(url, '_blank');
							if(!popup) view.location.href = url;
							url=undefined; // release reference before dispatching
							filesaver.readyState = filesaver.DONE;
							dispatch_all();
						};
						reader.readAsDataURL(blob);
						filesaver.readyState = filesaver.INIT;
						return;
					}
					// don't create more object URLs than needed
					if (!object_url) {
						object_url = get_URL().createObjectURL(blob);
					}
					if (force) {
						view.location.href = object_url;
					} else {
						var opened = view.open(object_url, "_blank");
						if (!opened) {
							// Apple does not allow window.open, see https://developer.apple.com/library/safari/documentation/Tools/Conceptual/SafariExtensionGuide/WorkingwithWindowsandTabs/WorkingwithWindowsandTabs.html
							view.location.href = object_url;
						}
					}
					filesaver.readyState = filesaver.DONE;
					dispatch_all();
					revoke(object_url);
				}
			;
			filesaver.readyState = filesaver.INIT;

			if (can_use_save_link) {
				object_url = get_URL().createObjectURL(blob);
				setTimeout(function() {
					save_link.href = object_url;
					save_link.download = name;
					click(save_link);
					dispatch_all();
					revoke(object_url);
					filesaver.readyState = filesaver.DONE;
				});
				return;
			}

			fs_error();
		}
		, FS_proto = FileSaver.prototype
		, saveAs = function(blob, name, no_auto_bom) {
			return new FileSaver(blob, name || blob.name || "download", no_auto_bom);
		}
	;
	// IE 10+ (native saveAs)
	if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
		return function(blob, name, no_auto_bom) {
			name = name || blob.name || "download";

			if (!no_auto_bom) {
				blob = auto_bom(blob);
			}
			return navigator.msSaveOrOpenBlob(blob, name);
		};
	}

	FS_proto.abort = function(){};
	FS_proto.readyState = FS_proto.INIT = 0;
	FS_proto.WRITING = 1;
	FS_proto.DONE = 2;

	FS_proto.error =
	FS_proto.onwritestart =
	FS_proto.onprogress =
	FS_proto.onwrite =
	FS_proto.onabort =
	FS_proto.onerror =
	FS_proto.onwriteend =
		null;

	return saveAs;
}(
	   typeof self !== "undefined" && self
	|| typeof window !== "undefined" && window
	|| this.content
));
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window

if (typeof module !== "undefined" && module.exports) {
  module.exports.saveAs = saveAs;
} else if (("function" !== "undefined" && __webpack_require__("../../../../webpack/buildin/amd-define.js") !== null) && (__webpack_require__("../../../../webpack/buildin/amd-options.js") !== null)) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
    return saveAs;
  }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}


/***/ }),

/***/ "../../../../ng2-nouislider/src/ng2-nouislider.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var noUiSlider = __webpack_require__("../../../../nouislider/distribute/nouislider.js");
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var forms_1 = __webpack_require__("../../../forms/@angular/forms.es5.js");
var DefaultFormatter = (function () {
    function DefaultFormatter() {
    }
    DefaultFormatter.prototype.to = function (value) {
        // formatting with http://stackoverflow.com/a/26463364/478584
        return String(parseFloat(parseFloat(String(value)).toFixed(2)));
    };
    ;
    DefaultFormatter.prototype.from = function (value) {
        return parseFloat(value);
    };
    return DefaultFormatter;
}());
exports.DefaultFormatter = DefaultFormatter;
var NouisliderComponent = (function () {
    function NouisliderComponent(el, renderer) {
        var _this = this;
        this.el = el;
        this.renderer = renderer;
        this.config = {};
        this.change = new core_1.EventEmitter(true);
        this.update = new core_1.EventEmitter(true);
        this.slide = new core_1.EventEmitter(true);
        this.set = new core_1.EventEmitter(true);
        this.start = new core_1.EventEmitter(true);
        this.end = new core_1.EventEmitter(true);
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
        this.eventHandler = function (emitter, values, handle, unencoded) {
            var v = _this.toValues(values);
            var emitEvents = false;
            if (_this.value === undefined) {
                _this.value = v;
                return;
            }
            if (Array.isArray(v) && _this.value[handle] != v[handle]) {
                emitEvents = true;
            }
            if (!Array.isArray(v) && _this.value != v) {
                emitEvents = true;
            }
            if (emitEvents) {
                emitter.emit(v);
                _this.onChange(v);
            }
            if (Array.isArray(v)) {
                _this.value[handle] = v[handle];
            }
            else {
                _this.value = v;
            }
        };
        this.defaultKeyHandler = function (e) {
            var stepSize = _this.slider.steps();
            var index = parseInt(e.target.getAttribute('data-handle'));
            var sign = 1;
            var multiplier = 1;
            var step = 0;
            var delta = 0;
            switch (e.which) {
                case 34:// PageDown
                    multiplier = _this.config.pageSteps;
                case 40: // ArrowDown
                case 37:// ArrowLeft
                    sign = -1;
                    step = stepSize[index][0];
                    e.preventDefault();
                    break;
                case 33:// PageUp
                    multiplier = _this.config.pageSteps;
                case 38: // ArrowUp
                case 39:// ArrowRight
                    step = stepSize[index][1];
                    e.preventDefault();
                    break;
                default:
                    break;
            }
            delta = sign * multiplier * step;
            var newValue;
            if (Array.isArray(_this.value)) {
                newValue = [].concat(_this.value);
                newValue[index] = newValue[index] + delta;
            }
            else {
                newValue = _this.value + delta;
            }
            _this.slider.set(newValue);
        };
    }
    NouisliderComponent.prototype.ngOnInit = function () {
        var _this = this;
        var inputsConfig = JSON.parse(JSON.stringify({
            behaviour: this.behaviour,
            connect: this.connect,
            limit: this.limit,
            start: this.formControl !== undefined ? this.formControl.value : this.ngModel,
            step: this.step,
            pageSteps: this.pageSteps,
            keyboard: this.keyboard,
            onKeydown: this.onKeydown,
            range: this.range || this.config.range || { min: this.min, max: this.max },
            tooltips: this.tooltips,
            snap: this.snap,
            animate: this.animate
        }));
        inputsConfig.tooltips = this.tooltips || this.config.tooltips;
        inputsConfig.format = this.format || this.config.format || new DefaultFormatter();
        this.slider = noUiSlider.create(this.el.nativeElement.querySelector('div'), Object.assign(this.config, inputsConfig));
        this.handles = [].slice.call(this.el.nativeElement.querySelectorAll('.noUi-handle'));
        if (this.config.keyboard) {
            if (this.config.pageSteps === undefined) {
                this.config.pageSteps = 10;
            }
            var _loop_1 = function (handle) {
                handle.setAttribute('tabindex', 0);
                handle.addEventListener('click', function () {
                    handle.focus();
                });
                if (this_1.config.onKeydown === undefined) {
                    handle.addEventListener('keydown', this_1.defaultKeyHandler);
                }
                else {
                    handle.addEventListener('keydown', this_1.config.onKeydown);
                }
            };
            var this_1 = this;
            for (var _i = 0, _a = this.handles; _i < _a.length; _i++) {
                var handle = _a[_i];
                _loop_1(handle);
            }
        }
        this.slider.on('set', function (values, handle, unencoded) {
            _this.eventHandler(_this.set, values, handle, unencoded);
        });
        this.slider.on('update', function (values, handle, unencoded) {
            _this.update.emit(_this.toValues(values));
        });
        this.slider.on('change', function (values, handle, unencoded) {
            _this.change.emit(_this.toValues(values));
        });
        this.slider.on('slide', function (values, handle, unencoded) {
            _this.eventHandler(_this.slide, values, handle, unencoded);
        });
        this.slider.on('start', function (values, handle, unencoded) {
            _this.start.emit(_this.toValues(values));
        });
        this.slider.on('end', function (values, handle, unencoded) {
            _this.end.emit(_this.toValues(values));
        });
    };
    NouisliderComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (this.slider && (changes.min || changes.max || changes.step || changes.range)) {
            setTimeout(function () {
                _this.slider.updateOptions({
                    range: Object.assign({}, {
                        min: _this.min,
                        max: _this.max
                    }, _this.range || {}),
                    step: _this.step
                });
            });
        }
    };
    NouisliderComponent.prototype.toValues = function (values) {
        var v = values.map(this.config.format.from);
        return (v.length == 1 ? v[0] : v);
    };
    NouisliderComponent.prototype.writeValue = function (value) {
        var _this = this;
        if (this.slider) {
            setTimeout(function () {
                _this.slider.set(value);
            });
        }
    };
    NouisliderComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    NouisliderComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    NouisliderComponent.prototype.setDisabledState = function (isDisabled) {
        isDisabled
            ? this.renderer.setAttribute(this.el.nativeElement.childNodes[0], 'disabled', 'true')
            : this.renderer.removeAttribute(this.el.nativeElement.childNodes[0], 'disabled');
    };
    NouisliderComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'nouislider',
                    host: {
                        '[class.ng2-nouislider]': 'true'
                    },
                    template: '<div [attr.disabled]="disabled ? true : undefined"></div>',
                    styles: ["\n    :host {\n      display: block;\n      margin-top: 1rem;\n      margin-bottom: 1rem;\n    }\n  "],
                    providers: [
                        {
                            provide: forms_1.NG_VALUE_ACCESSOR,
                            useExisting: core_1.forwardRef(function () { return NouisliderComponent; }),
                            multi: true
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    NouisliderComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: core_1.Renderer2, },
    ]; };
    NouisliderComponent.propDecorators = {
        'disabled': [{ type: core_1.Input },],
        'behaviour': [{ type: core_1.Input },],
        'connect': [{ type: core_1.Input },],
        'limit': [{ type: core_1.Input },],
        'min': [{ type: core_1.Input },],
        'max': [{ type: core_1.Input },],
        'snap': [{ type: core_1.Input },],
        'animate': [{ type: core_1.Input },],
        'range': [{ type: core_1.Input },],
        'step': [{ type: core_1.Input },],
        'format': [{ type: core_1.Input },],
        'pageSteps': [{ type: core_1.Input },],
        'config': [{ type: core_1.Input },],
        'ngModel': [{ type: core_1.Input },],
        'keyboard': [{ type: core_1.Input },],
        'onKeydown': [{ type: core_1.Input },],
        'formControl': [{ type: core_1.Input },],
        'tooltips': [{ type: core_1.Input },],
        'change': [{ type: core_1.Output },],
        'update': [{ type: core_1.Output },],
        'slide': [{ type: core_1.Output },],
        'set': [{ type: core_1.Output },],
        'start': [{ type: core_1.Output },],
        'end': [{ type: core_1.Output },],
    };
    return NouisliderComponent;
}());
exports.NouisliderComponent = NouisliderComponent;
var NouisliderModule = (function () {
    function NouisliderModule() {
    }
    NouisliderModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [],
                    exports: [NouisliderComponent],
                    declarations: [NouisliderComponent],
                },] },
    ];
    /** @nocollapse */
    NouisliderModule.ctorParameters = function () { return []; };
    return NouisliderModule;
}());
exports.NouisliderModule = NouisliderModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5nMi1ub3Vpc2xpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQXlDO0FBQ3pDLHNDQVd1QjtBQUN2Qix3Q0FJd0I7QUFPeEI7SUFBQTtJQVNBLENBQUM7SUFSQyw2QkFBRSxHQUFGLFVBQUcsS0FBYTtRQUNkLDZEQUE2RDtRQUM3RCxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBQUEsQ0FBQztJQUVGLCtCQUFJLEdBQUosVUFBSyxLQUFhO1FBQ2hCLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUNILHVCQUFDO0FBQUQsQ0FUQSxBQVNDLElBQUE7QUFUWSw0Q0FBZ0I7QUFZN0I7SUFnQ0UsNkJBQW9CLEVBQWMsRUFBVSxRQUFvQjtRQUFoRSxpQkFBcUU7UUFBakQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVk7UUFoQnhELFdBQU0sR0FBUSxFQUFFLENBQUM7UUFNakIsV0FBTSxHQUFzQixJQUFJLG1CQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkQsV0FBTSxHQUFzQixJQUFJLG1CQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkQsVUFBSyxHQUFzQixJQUFJLG1CQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEQsUUFBRyxHQUFzQixJQUFJLG1CQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEQsVUFBSyxHQUFzQixJQUFJLG1CQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEQsUUFBRyxHQUFzQixJQUFJLG1CQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFaEQsYUFBUSxHQUFRLFFBQVEsQ0FBQyxTQUFTLENBQUM7UUFDbkMsY0FBUyxHQUFRLFFBQVEsQ0FBQyxTQUFTLENBQUM7UUFnSHBDLGlCQUFZLEdBQUcsVUFBQyxPQUEwQixFQUFFLE1BQWdCLEVBQUUsTUFBYyxFQUFFLFNBQW1CO1lBQ3ZHLElBQUksQ0FBQyxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDOUIsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLEVBQUUsQ0FBQSxDQUFDLEtBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDNUIsS0FBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQ2YsTUFBTSxDQUFDO1lBQ1QsQ0FBQztZQUNELEVBQUUsQ0FBQSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2RCxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLENBQUM7WUFDRCxFQUFFLENBQUEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLENBQUM7WUFDRCxFQUFFLENBQUEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUNkLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkIsQ0FBQztZQUNELEVBQUUsQ0FBQSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNqQyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sS0FBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDakIsQ0FBQztRQUNILENBQUMsQ0FBQTtRQUVPLHNCQUFpQixHQUFHLFVBQUMsQ0FBZ0I7WUFDM0MsSUFBSSxRQUFRLEdBQVUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUMxQyxJQUFJLEtBQUssR0FBRyxRQUFRLENBQWUsQ0FBQyxDQUFDLE1BQU8sQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUMxRSxJQUFJLElBQUksR0FBRyxDQUFDLENBQUM7WUFDYixJQUFJLFVBQVUsR0FBVyxDQUFDLENBQUM7WUFDM0IsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBRWQsTUFBTSxDQUFDLENBQUUsQ0FBQyxDQUFDLEtBQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLEtBQUssRUFBRSxDQUFHLFdBQVc7b0JBQ25CLFVBQVUsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztnQkFDckMsS0FBSyxFQUFFLENBQUMsQ0FBRSxZQUFZO2dCQUN0QixLQUFLLEVBQUUsQ0FBRyxZQUFZO29CQUNwQixJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ1YsSUFBSSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDMUIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUNuQixLQUFLLENBQUM7Z0JBRVIsS0FBSyxFQUFFLENBQUcsU0FBUztvQkFDakIsVUFBVSxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO2dCQUNyQyxLQUFLLEVBQUUsQ0FBQyxDQUFFLFVBQVU7Z0JBQ3BCLEtBQUssRUFBRSxDQUFHLGFBQWE7b0JBQ3JCLElBQUksR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzFCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDbkIsS0FBSyxDQUFDO2dCQUVSO29CQUNFLEtBQUssQ0FBQztZQUNWLENBQUM7WUFFRCxLQUFLLEdBQUcsSUFBSSxHQUFHLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDakMsSUFBSSxRQUEyQixDQUFDO1lBRWhDLEVBQUUsQ0FBQSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsUUFBUSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNqQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUM1QyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sUUFBUSxHQUFHLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ2hDLENBQUM7WUFFRCxLQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUE7SUEvS21FLENBQUM7SUFFckUsc0NBQVEsR0FBUjtRQUFBLGlCQWlFQztRQWhFQyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDM0MsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQ3pCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsS0FBSyxFQUFFLElBQUksQ0FBQyxXQUFXLEtBQUssU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPO1lBQzdFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQ3pCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLEVBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUM7WUFDeEUsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztTQUN0QixDQUFDLENBQUMsQ0FBQztRQUNKLFlBQVksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUM5RCxZQUFZLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO1FBRWxGLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FDN0IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUMxQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQ3pDLENBQUM7UUFFRixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFFckYsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztZQUM3QixDQUFDO29DQUNPLE1BQU07Z0JBQ1osTUFBTSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7b0JBQy9CLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDakIsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsRUFBRSxDQUFBLENBQUMsT0FBSyxNQUFNLENBQUMsU0FBUyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsT0FBSyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUM3RCxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsT0FBSyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzVELENBQUM7WUFDSCxDQUFDOztZQVZELEdBQUcsQ0FBQSxDQUFlLFVBQVksRUFBWixLQUFBLElBQUksQ0FBQyxPQUFPLEVBQVosY0FBWSxFQUFaLElBQVk7Z0JBQTFCLElBQUksTUFBTSxTQUFBO3dCQUFOLE1BQU07YUFVYjtRQUNILENBQUM7UUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsVUFBQyxNQUFnQixFQUFFLE1BQWMsRUFBRSxTQUFtQjtZQUMxRSxLQUFJLENBQUMsWUFBWSxDQUFDLEtBQUksQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN6RCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFDLE1BQWdCLEVBQUUsTUFBYyxFQUFFLFNBQW1CO1lBQzdFLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFDLE1BQWdCLEVBQUUsTUFBYyxFQUFFLFNBQW1CO1lBQzdFLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFDLE1BQWdCLEVBQUUsTUFBYyxFQUFFLFNBQW1CO1lBQzVFLEtBQUksQ0FBQyxZQUFZLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzNELENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQUMsTUFBZ0IsRUFBRSxNQUFjLEVBQUUsU0FBbUI7WUFDNUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLFVBQUMsTUFBZ0IsRUFBRSxNQUFjLEVBQUUsU0FBbUI7WUFDMUUsS0FBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHlDQUFXLEdBQVgsVUFBWSxPQUFZO1FBQXhCLGlCQVlDO1FBWEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsSUFBSSxPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakYsVUFBVSxDQUFDO2dCQUNULEtBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDO29CQUN4QixLQUFLLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUU7d0JBQ3ZCLEdBQUcsRUFBRSxLQUFJLENBQUMsR0FBRzt3QkFDYixHQUFHLEVBQUUsS0FBSSxDQUFDLEdBQUc7cUJBQ2QsRUFBRSxLQUFJLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztvQkFDcEIsSUFBSSxFQUFFLEtBQUksQ0FBQyxJQUFJO2lCQUNoQixDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7SUFDSCxDQUFDO0lBRUQsc0NBQVEsR0FBUixVQUFTLE1BQWdCO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCx3Q0FBVSxHQUFWLFVBQVcsS0FBVTtRQUFyQixpQkFNQztRQUxDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLFVBQVUsQ0FBQztnQkFDVCxLQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7SUFDSCxDQUFDO0lBRUQsOENBQWdCLEdBQWhCLFVBQWlCLEVBQXdCO1FBQ3ZDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCwrQ0FBaUIsR0FBakIsVUFBa0IsRUFBWTtRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsOENBQWdCLEdBQWhCLFVBQWlCLFVBQW1CO1FBQ2xDLFVBQVU7Y0FDTixJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sQ0FBQztjQUNuRixJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDckYsQ0FBQztJQW9FSSw4QkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN4QixRQUFRLEVBQUUsWUFBWTtvQkFDdEIsSUFBSSxFQUFFO3dCQUNKLHdCQUF3QixFQUFFLE1BQU07cUJBQ2pDO29CQUNELFFBQVEsRUFBRSwyREFBMkQ7b0JBQ3JFLE1BQU0sRUFBRSxDQUFDLHNHQU1SLENBQUM7b0JBQ0YsU0FBUyxFQUFFO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSx5QkFBaUI7NEJBQzFCLFdBQVcsRUFBRSxpQkFBVSxDQUFDLGNBQU0sT0FBQSxtQkFBbUIsRUFBbkIsQ0FBbUIsQ0FBQzs0QkFDbEQsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0Y7aUJBQ0YsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLGtDQUFjLEdBQW1FLGNBQU0sT0FBQTtRQUM5RixFQUFDLElBQUksRUFBRSxpQkFBVSxHQUFHO1FBQ3BCLEVBQUMsSUFBSSxFQUFFLGdCQUFTLEdBQUc7S0FDbEIsRUFINkYsQ0FHN0YsQ0FBQztJQUNLLGtDQUFjLEdBQTJDO1FBQ2hFLFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQUssRUFBRSxFQUFFO1FBQzlCLFdBQVcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQUssRUFBRSxFQUFFO1FBQy9CLFNBQVMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQUssRUFBRSxFQUFFO1FBQzdCLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQUssRUFBRSxFQUFFO1FBQzNCLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQUssRUFBRSxFQUFFO1FBQ3pCLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQUssRUFBRSxFQUFFO1FBQ3pCLE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQUssRUFBRSxFQUFFO1FBQzFCLFNBQVMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQUssRUFBRSxFQUFFO1FBQzdCLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQUssRUFBRSxFQUFFO1FBQzNCLE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQUssRUFBRSxFQUFFO1FBQzFCLFFBQVEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQUssRUFBRSxFQUFFO1FBQzVCLFdBQVcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQUssRUFBRSxFQUFFO1FBQy9CLFFBQVEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQUssRUFBRSxFQUFFO1FBQzVCLFNBQVMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQUssRUFBRSxFQUFFO1FBQzdCLFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQUssRUFBRSxFQUFFO1FBQzlCLFdBQVcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQUssRUFBRSxFQUFFO1FBQy9CLGFBQWEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQUssRUFBRSxFQUFFO1FBQ2pDLFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQUssRUFBRSxFQUFFO1FBQzlCLFFBQVEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLGFBQU0sRUFBRSxFQUFFO1FBQzdCLFFBQVEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLGFBQU0sRUFBRSxFQUFFO1FBQzdCLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLGFBQU0sRUFBRSxFQUFFO1FBQzVCLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLGFBQU0sRUFBRSxFQUFFO1FBQzFCLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLGFBQU0sRUFBRSxFQUFFO1FBQzVCLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLGFBQU0sRUFBRSxFQUFFO0tBQ3pCLENBQUM7SUFDRiwwQkFBQztDQXRRRCxBQXNRQyxJQUFBO0FBdFFZLGtEQUFtQjtBQTBRaEM7SUFBQTtJQVVBLENBQUM7SUFWc0MsMkJBQVUsR0FBMEI7UUFDM0UsRUFBRSxJQUFJLEVBQUUsZUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN2QixPQUFPLEVBQUUsRUFBRTtvQkFDWCxPQUFPLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztvQkFDOUIsWUFBWSxFQUFFLENBQUMsbUJBQW1CLENBQUM7aUJBQ3BDLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCwrQkFBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQztJQUNGLHVCQUFDO0NBVkQsQUFVQyxJQUFBO0FBVlksNENBQWdCIiwiZmlsZSI6Im5nMi1ub3Vpc2xpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIG5vVWlTbGlkZXIgZnJvbSAnbm91aXNsaWRlcic7XG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT25DaGFuZ2VzLFxuICBPdXRwdXQsXG4gIE5nTW9kdWxlLFxuICBSZW5kZXJlcjJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgRm9ybUNvbnRyb2wsXG4gIE5HX1ZBTFVFX0FDQ0VTU09SXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuZXhwb3J0IGludGVyZmFjZSBOb3VpRm9ybWF0dGVyIHtcbiAgdG8odmFsdWU6IG51bWJlcik6IHN0cmluZztcbiAgZnJvbSh2YWx1ZTogc3RyaW5nKTogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgRGVmYXVsdEZvcm1hdHRlciBpbXBsZW1lbnRzIE5vdWlGb3JtYXR0ZXIge1xuICB0byh2YWx1ZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAvLyBmb3JtYXR0aW5nIHdpdGggaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY0NjMzNjQvNDc4NTg0XG4gICAgcmV0dXJuIFN0cmluZyhwYXJzZUZsb2F0KHBhcnNlRmxvYXQoU3RyaW5nKHZhbHVlKSkudG9GaXhlZCgyKSkpO1xuICB9O1xuXG4gIGZyb20odmFsdWU6IHN0cmluZyk6IG51bWJlciB7XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQodmFsdWUpO1xuICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIE5vdWlzbGlkZXJDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0LCBPbkNoYW5nZXMge1xuXG4gIHB1YmxpYyBzbGlkZXI6IGFueTtcbiAgcHVibGljIGhhbmRsZXM6IGFueVtdO1xuICAgcHVibGljIGRpc2FibGVkOiBib29sZWFuOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXG4gICBwdWJsaWMgYmVoYXZpb3VyOiBzdHJpbmc7XG4gICBwdWJsaWMgY29ubmVjdDogYm9vbGVhbltdO1xuICAgcHVibGljIGxpbWl0OiBudW1iZXI7XG4gICBwdWJsaWMgbWluOiBudW1iZXI7XG4gICBwdWJsaWMgbWF4OiBudW1iZXI7XG4gICBwdWJsaWMgc25hcDogYm9vbGVhbjtcbiAgIHB1YmxpYyBhbmltYXRlOiBib29sZWFuIHwgYm9vbGVhbltdO1xuICAgcHVibGljIHJhbmdlOiBhbnk7XG4gICBwdWJsaWMgc3RlcDogbnVtYmVyO1xuICAgcHVibGljIGZvcm1hdDogTm91aUZvcm1hdHRlcjtcbiAgIHB1YmxpYyBwYWdlU3RlcHM6IG51bWJlcjtcbiAgIHB1YmxpYyBjb25maWc6IGFueSA9IHt9O1xuICAgcHVibGljIG5nTW9kZWw6IG51bWJlciB8IG51bWJlcltdO1xuICAgcHVibGljIGtleWJvYXJkOiBib29sZWFuO1xuICAgcHVibGljIG9uS2V5ZG93bjogYW55O1xuICAgcHVibGljIGZvcm1Db250cm9sOiBGb3JtQ29udHJvbDtcbiAgIHB1YmxpYyB0b29sdGlwczogQXJyYXk8YW55PjtcbiAgIHB1YmxpYyBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcih0cnVlKTtcbiAgIHB1YmxpYyB1cGRhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcih0cnVlKTtcbiAgIHB1YmxpYyBzbGlkZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKHRydWUpO1xuICAgcHVibGljIHNldDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKHRydWUpO1xuICAgcHVibGljIHN0YXJ0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIodHJ1ZSk7XG4gICBwdWJsaWMgZW5kOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIodHJ1ZSk7XG4gIHByaXZhdGUgdmFsdWU6IGFueTtcbiAgcHJpdmF0ZSBvbkNoYW5nZTogYW55ID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuICBwcml2YXRlIG9uVG91Y2hlZDogYW55ID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXIgOiBSZW5kZXJlcjIpIHsgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGxldCBpbnB1dHNDb25maWcgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIGJlaGF2aW91cjogdGhpcy5iZWhhdmlvdXIsXG4gICAgICBjb25uZWN0OiB0aGlzLmNvbm5lY3QsXG4gICAgICBsaW1pdDogdGhpcy5saW1pdCxcbiAgICAgIHN0YXJ0OiB0aGlzLmZvcm1Db250cm9sICE9PSB1bmRlZmluZWQgPyB0aGlzLmZvcm1Db250cm9sLnZhbHVlIDogdGhpcy5uZ01vZGVsLFxuICAgICAgc3RlcDogdGhpcy5zdGVwLFxuICAgICAgcGFnZVN0ZXBzOiB0aGlzLnBhZ2VTdGVwcyxcbiAgICAgIGtleWJvYXJkOiB0aGlzLmtleWJvYXJkLFxuICAgICAgb25LZXlkb3duOiB0aGlzLm9uS2V5ZG93bixcbiAgICAgIHJhbmdlOiB0aGlzLnJhbmdlIHx8IHRoaXMuY29uZmlnLnJhbmdlIHx8IHttaW46IHRoaXMubWluLCBtYXg6IHRoaXMubWF4fSxcbiAgICAgIHRvb2x0aXBzOiB0aGlzLnRvb2x0aXBzLFxuICAgICAgc25hcDogdGhpcy5zbmFwLFxuICAgICAgYW5pbWF0ZTogdGhpcy5hbmltYXRlXG4gICAgfSkpO1xuICAgIGlucHV0c0NvbmZpZy50b29sdGlwcyA9IHRoaXMudG9vbHRpcHMgfHwgdGhpcy5jb25maWcudG9vbHRpcHM7XG4gICAgaW5wdXRzQ29uZmlnLmZvcm1hdCA9IHRoaXMuZm9ybWF0IHx8IHRoaXMuY29uZmlnLmZvcm1hdCB8fCBuZXcgRGVmYXVsdEZvcm1hdHRlcigpO1xuXG4gICAgdGhpcy5zbGlkZXIgPSBub1VpU2xpZGVyLmNyZWF0ZShcbiAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdkaXYnKSxcbiAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5jb25maWcsIGlucHV0c0NvbmZpZylcbiAgICApO1xuXG4gICAgdGhpcy5oYW5kbGVzID0gW10uc2xpY2UuY2FsbCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm5vVWktaGFuZGxlJykpO1xuXG4gICAgaWYodGhpcy5jb25maWcua2V5Ym9hcmQpIHtcbiAgICAgIGlmKHRoaXMuY29uZmlnLnBhZ2VTdGVwcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuY29uZmlnLnBhZ2VTdGVwcyA9IDEwO1xuICAgICAgfVxuICAgICAgZm9yKGxldCBoYW5kbGUgb2YgdGhpcy5oYW5kbGVzKSB7XG4gICAgICAgIGhhbmRsZS5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgMCk7XG4gICAgICAgIGhhbmRsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICBoYW5kbGUuZm9jdXMoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmKHRoaXMuY29uZmlnLm9uS2V5ZG93biA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaGFuZGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmRlZmF1bHRLZXlIYW5kbGVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBoYW5kbGUuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuY29uZmlnLm9uS2V5ZG93bik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnNsaWRlci5vbignc2V0JywgKHZhbHVlczogc3RyaW5nW10sIGhhbmRsZTogbnVtYmVyLCB1bmVuY29kZWQ6IG51bWJlcltdKSA9PiB7XG4gICAgICB0aGlzLmV2ZW50SGFuZGxlcih0aGlzLnNldCwgdmFsdWVzLCBoYW5kbGUsIHVuZW5jb2RlZCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNsaWRlci5vbigndXBkYXRlJywgKHZhbHVlczogc3RyaW5nW10sIGhhbmRsZTogbnVtYmVyLCB1bmVuY29kZWQ6IG51bWJlcltdKSA9PiB7XG4gICAgICB0aGlzLnVwZGF0ZS5lbWl0KHRoaXMudG9WYWx1ZXModmFsdWVzKSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNsaWRlci5vbignY2hhbmdlJywgKHZhbHVlczogc3RyaW5nW10sIGhhbmRsZTogbnVtYmVyLCB1bmVuY29kZWQ6IG51bWJlcltdKSA9PiB7XG4gICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMudG9WYWx1ZXModmFsdWVzKSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNsaWRlci5vbignc2xpZGUnLCAodmFsdWVzOiBzdHJpbmdbXSwgaGFuZGxlOiBudW1iZXIsIHVuZW5jb2RlZDogbnVtYmVyW10pID0+IHtcbiAgICAgIHRoaXMuZXZlbnRIYW5kbGVyKHRoaXMuc2xpZGUsIHZhbHVlcywgaGFuZGxlLCB1bmVuY29kZWQpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zbGlkZXIub24oJ3N0YXJ0JywgKHZhbHVlczogc3RyaW5nW10sIGhhbmRsZTogbnVtYmVyLCB1bmVuY29kZWQ6IG51bWJlcltdKSA9PiB7XG4gICAgICB0aGlzLnN0YXJ0LmVtaXQodGhpcy50b1ZhbHVlcyh2YWx1ZXMpKTtcbiAgICB9KTtcblxuICAgIHRoaXMuc2xpZGVyLm9uKCdlbmQnLCAodmFsdWVzOiBzdHJpbmdbXSwgaGFuZGxlOiBudW1iZXIsIHVuZW5jb2RlZDogbnVtYmVyW10pID0+IHtcbiAgICAgIHRoaXMuZW5kLmVtaXQodGhpcy50b1ZhbHVlcyh2YWx1ZXMpKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSkge1xuICAgIGlmICh0aGlzLnNsaWRlciAmJiAoY2hhbmdlcy5taW4gfHwgY2hhbmdlcy5tYXggfHwgY2hhbmdlcy5zdGVwIHx8IGNoYW5nZXMucmFuZ2UpKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5zbGlkZXIudXBkYXRlT3B0aW9ucyh7XG4gICAgICAgICAgcmFuZ2U6IE9iamVjdC5hc3NpZ24oe30sIHtcbiAgICAgICAgICAgIG1pbjogdGhpcy5taW4sXG4gICAgICAgICAgICBtYXg6IHRoaXMubWF4XG4gICAgICAgICAgfSwgdGhpcy5yYW5nZSB8fCB7fSksXG4gICAgICAgICAgc3RlcDogdGhpcy5zdGVwXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgdG9WYWx1ZXModmFsdWVzOiBzdHJpbmdbXSk6IGFueSB8IGFueVtdIHtcbiAgICBsZXQgdiA9IHZhbHVlcy5tYXAodGhpcy5jb25maWcuZm9ybWF0LmZyb20pO1xuICAgIHJldHVybiAodi5sZW5ndGggPT0gMSA/IHZbMF0gOiB2KTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIGlmICh0aGlzLnNsaWRlcikge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuc2xpZGVyLnNldCh2YWx1ZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCkge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB7fSk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpc0Rpc2FibGVkXG4gICAgICA/IHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZE5vZGVzWzBdLCAnZGlzYWJsZWQnLCAndHJ1ZScpXG4gICAgICA6IHRoaXMucmVuZGVyZXIucmVtb3ZlQXR0cmlidXRlKHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZE5vZGVzWzBdLCAnZGlzYWJsZWQnKTtcbiAgfVxuXG4gIHByaXZhdGUgZXZlbnRIYW5kbGVyID0gKGVtaXR0ZXI6IEV2ZW50RW1pdHRlcjxhbnk+LCB2YWx1ZXM6IHN0cmluZ1tdLCBoYW5kbGU6IG51bWJlciwgdW5lbmNvZGVkOiBudW1iZXJbXSkgPT4ge1xuICAgIGxldCB2ID0gdGhpcy50b1ZhbHVlcyh2YWx1ZXMpO1xuICAgIGxldCBlbWl0RXZlbnRzID0gZmFsc2U7XG4gICAgaWYodGhpcy52YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnZhbHVlID0gdjtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYoQXJyYXkuaXNBcnJheSh2KSAmJiB0aGlzLnZhbHVlW2hhbmRsZV0gIT0gdltoYW5kbGVdKSB7XG4gICAgICBlbWl0RXZlbnRzID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYoIUFycmF5LmlzQXJyYXkodikgJiYgdGhpcy52YWx1ZSAhPSB2KSB7XG4gICAgICBlbWl0RXZlbnRzID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYoZW1pdEV2ZW50cykge1xuICAgICAgZW1pdHRlci5lbWl0KHYpO1xuICAgICAgdGhpcy5vbkNoYW5nZSh2KTtcbiAgICB9XG4gICAgaWYoQXJyYXkuaXNBcnJheSh2KSkge1xuICAgICAgdGhpcy52YWx1ZVtoYW5kbGVdID0gdltoYW5kbGVdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZhbHVlID0gdjtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRlZmF1bHRLZXlIYW5kbGVyID0gKGU6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICBsZXQgc3RlcFNpemU6IGFueVtdID0gdGhpcy5zbGlkZXIuc3RlcHMoKTtcbiAgICBsZXQgaW5kZXggPSBwYXJzZUludCgoPEhUTUxFbGVtZW50PmUudGFyZ2V0KS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaGFuZGxlJykpO1xuICAgIGxldCBzaWduID0gMTtcbiAgICBsZXQgbXVsdGlwbGllcjogbnVtYmVyID0gMTtcbiAgICBsZXQgc3RlcCA9IDA7XG4gICAgbGV0IGRlbHRhID0gMDtcblxuICAgIHN3aXRjaCAoIGUud2hpY2ggKSB7XG4gICAgICBjYXNlIDM0OiAgLy8gUGFnZURvd25cbiAgICAgICAgbXVsdGlwbGllciA9IHRoaXMuY29uZmlnLnBhZ2VTdGVwcztcbiAgICAgIGNhc2UgNDA6ICAvLyBBcnJvd0Rvd25cbiAgICAgIGNhc2UgMzc6ICAvLyBBcnJvd0xlZnRcbiAgICAgICAgc2lnbiA9IC0xO1xuICAgICAgICBzdGVwID0gc3RlcFNpemVbaW5kZXhdWzBdO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDMzOiAgLy8gUGFnZVVwXG4gICAgICAgIG11bHRpcGxpZXIgPSB0aGlzLmNvbmZpZy5wYWdlU3RlcHM7XG4gICAgICBjYXNlIDM4OiAgLy8gQXJyb3dVcFxuICAgICAgY2FzZSAzOTogIC8vIEFycm93UmlnaHRcbiAgICAgICAgc3RlcCA9IHN0ZXBTaXplW2luZGV4XVsxXTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgZGVsdGEgPSBzaWduICogbXVsdGlwbGllciAqIHN0ZXA7XG4gICAgbGV0IG5ld1ZhbHVlOiBudW1iZXIgfCBudW1iZXJbXTtcblxuICAgIGlmKEFycmF5LmlzQXJyYXkodGhpcy52YWx1ZSkpIHtcbiAgICAgIG5ld1ZhbHVlID0gW10uY29uY2F0KHRoaXMudmFsdWUpO1xuICAgICAgbmV3VmFsdWVbaW5kZXhdID0gbmV3VmFsdWVbaW5kZXhdICsgZGVsdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld1ZhbHVlID0gdGhpcy52YWx1ZSArIGRlbHRhO1xuICAgIH1cblxuICAgIHRoaXMuc2xpZGVyLnNldChuZXdWYWx1ZSk7XG4gIH1cbnN0YXRpYyBkZWNvcmF0b3JzOiBEZWNvcmF0b3JJbnZvY2F0aW9uW10gPSBbXG57IHR5cGU6IENvbXBvbmVudCwgYXJnczogW3tcbiAgc2VsZWN0b3I6ICdub3Vpc2xpZGVyJyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MubmcyLW5vdWlzbGlkZXJdJzogJ3RydWUnXG4gIH0sXG4gIHRlbXBsYXRlOiAnPGRpdiBbYXR0ci5kaXNhYmxlZF09XCJkaXNhYmxlZCA/IHRydWUgOiB1bmRlZmluZWRcIj48L2Rpdj4nLFxuICBzdHlsZXM6IFtgXG4gICAgOmhvc3Qge1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICBtYXJnaW4tdG9wOiAxcmVtO1xuICAgICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbiAgICB9XG4gIGBdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5vdWlzbGlkZXJDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWVcbiAgICB9XG4gIF1cbn0sIF0gfSxcbl07XG4vKiogQG5vY29sbGFwc2UgKi9cbnN0YXRpYyBjdG9yUGFyYW1ldGVyczogKCkgPT4gKHt0eXBlOiBhbnksIGRlY29yYXRvcnM/OiBEZWNvcmF0b3JJbnZvY2F0aW9uW119fG51bGwpW10gPSAoKSA9PiBbXG57dHlwZTogRWxlbWVudFJlZiwgfSxcbnt0eXBlOiBSZW5kZXJlcjIsIH0sXG5dO1xuc3RhdGljIHByb3BEZWNvcmF0b3JzOiB7W2tleTogc3RyaW5nXTogRGVjb3JhdG9ySW52b2NhdGlvbltdfSA9IHtcbidkaXNhYmxlZCc6IFt7IHR5cGU6IElucHV0IH0sXSxcbidiZWhhdmlvdXInOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4nY29ubmVjdCc6IFt7IHR5cGU6IElucHV0IH0sXSxcbidsaW1pdCc6IFt7IHR5cGU6IElucHV0IH0sXSxcbidtaW4nOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4nbWF4JzogW3sgdHlwZTogSW5wdXQgfSxdLFxuJ3NuYXAnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4nYW5pbWF0ZSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbidyYW5nZSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbidzdGVwJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuJ2Zvcm1hdCc6IFt7IHR5cGU6IElucHV0IH0sXSxcbidwYWdlU3RlcHMnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4nY29uZmlnJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuJ25nTW9kZWwnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4na2V5Ym9hcmQnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4nb25LZXlkb3duJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuJ2Zvcm1Db250cm9sJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuJ3Rvb2x0aXBzJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuJ2NoYW5nZSc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4ndXBkYXRlJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbidzbGlkZSc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4nc2V0JzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbidzdGFydCc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4nZW5kJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbn07XG59XG5cblxuXG5leHBvcnQgY2xhc3MgTm91aXNsaWRlck1vZHVsZSB7IHN0YXRpYyBkZWNvcmF0b3JzOiBEZWNvcmF0b3JJbnZvY2F0aW9uW10gPSBbXG57IHR5cGU6IE5nTW9kdWxlLCBhcmdzOiBbe1xuICBpbXBvcnRzOiBbXSxcbiAgZXhwb3J0czogW05vdWlzbGlkZXJDb21wb25lbnRdLFxuICBkZWNsYXJhdGlvbnM6IFtOb3Vpc2xpZGVyQ29tcG9uZW50XSxcbn0sIF0gfSxcbl07XG4vKiogQG5vY29sbGFwc2UgKi9cbnN0YXRpYyBjdG9yUGFyYW1ldGVyczogKCkgPT4gKHt0eXBlOiBhbnksIGRlY29yYXRvcnM/OiBEZWNvcmF0b3JJbnZvY2F0aW9uW119fG51bGwpW10gPSAoKSA9PiBbXG5dO1xufVxuXG5pbnRlcmZhY2UgRGVjb3JhdG9ySW52b2NhdGlvbiB7XG4gIHR5cGU6IEZ1bmN0aW9uO1xuICBhcmdzPzogYW55W107XG59XG4iXX0=

/***/ }),

/***/ "../../../../nouislider/distribute/nouislider.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! nouislider - 11.1.0 - 2018-04-02 11:18:13 */

(function (factory) {

    if ( true ) {

        // AMD. Register as an anonymous module.
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

    } else if ( typeof exports === 'object' ) {

        // Node/CommonJS
        module.exports = factory();

    } else {

        // Browser globals
        window.noUiSlider = factory();
    }

}(function( ){

	'use strict';

	var VERSION = '11.1.0';


	function isValidFormatter ( entry ) {
		return typeof entry === 'object' && typeof entry.to === 'function' && typeof entry.from === 'function';
	}

	function removeElement ( el ) {
		el.parentElement.removeChild(el);
	}

	function isSet ( value ) {
		return value !== null && value !== undefined;
	}

	// Bindable version
	function preventDefault ( e ) {
		e.preventDefault();
	}

	// Removes duplicates from an array.
	function unique ( array ) {
		return array.filter(function(a){
			return !this[a] ? this[a] = true : false;
		}, {});
	}

	// Round a value to the closest 'to'.
	function closest ( value, to ) {
		return Math.round(value / to) * to;
	}

	// Current position of an element relative to the document.
	function offset ( elem, orientation ) {

		var rect = elem.getBoundingClientRect();
		var doc = elem.ownerDocument;
		var docElem = doc.documentElement;
		var pageOffset = getPageOffset(doc);

		// getBoundingClientRect contains left scroll in Chrome on Android.
		// I haven't found a feature detection that proves this. Worst case
		// scenario on mis-match: the 'tap' feature on horizontal sliders breaks.
		if ( /webkit.*Chrome.*Mobile/i.test(navigator.userAgent) ) {
			pageOffset.x = 0;
		}

		return orientation ? (rect.top + pageOffset.y - docElem.clientTop) : (rect.left + pageOffset.x - docElem.clientLeft);
	}

	// Checks whether a value is numerical.
	function isNumeric ( a ) {
		return typeof a === 'number' && !isNaN( a ) && isFinite( a );
	}

	// Sets a class and removes it after [duration] ms.
	function addClassFor ( element, className, duration ) {
		if (duration > 0) {
		addClass(element, className);
			setTimeout(function(){
				removeClass(element, className);
			}, duration);
		}
	}

	// Limits a value to 0 - 100
	function limit ( a ) {
		return Math.max(Math.min(a, 100), 0);
	}

	// Wraps a variable as an array, if it isn't one yet.
	// Note that an input array is returned by reference!
	function asArray ( a ) {
		return Array.isArray(a) ? a : [a];
	}

	// Counts decimals
	function countDecimals ( numStr ) {
		numStr = String(numStr);
		var pieces = numStr.split(".");
		return pieces.length > 1 ? pieces[1].length : 0;
	}

	// http://youmightnotneedjquery.com/#add_class
	function addClass ( el, className ) {
		if ( el.classList ) {
			el.classList.add(className);
		} else {
			el.className += ' ' + className;
		}
	}

	// http://youmightnotneedjquery.com/#remove_class
	function removeClass ( el, className ) {
		if ( el.classList ) {
			el.classList.remove(className);
		} else {
			el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
		}
	}

	// https://plainjs.com/javascript/attributes/adding-removing-and-testing-for-classes-9/
	function hasClass ( el, className ) {
		return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
	}

	// https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY#Notes
	function getPageOffset ( doc ) {

		var supportPageOffset = window.pageXOffset !== undefined;
		var isCSS1Compat = ((doc.compatMode || "") === "CSS1Compat");
		var x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? doc.documentElement.scrollLeft : doc.body.scrollLeft;
		var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? doc.documentElement.scrollTop : doc.body.scrollTop;

		return {
			x: x,
			y: y
		};
	}

	// we provide a function to compute constants instead
	// of accessing window.* as soon as the module needs it
	// so that we do not compute anything if not needed
	function getActions ( ) {

		// Determine the events to bind. IE11 implements pointerEvents without
		// a prefix, which breaks compatibility with the IE10 implementation.
		return window.navigator.pointerEnabled ? {
			start: 'pointerdown',
			move: 'pointermove',
			end: 'pointerup'
		} : window.navigator.msPointerEnabled ? {
			start: 'MSPointerDown',
			move: 'MSPointerMove',
			end: 'MSPointerUp'
		} : {
			start: 'mousedown touchstart',
			move: 'mousemove touchmove',
			end: 'mouseup touchend'
		};
	}

	// https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
	// Issue #785
	function getSupportsPassive ( ) {

		var supportsPassive = false;

		try {

			var opts = Object.defineProperty({}, 'passive', {
				get: function() {
					supportsPassive = true;
				}
			});

			window.addEventListener('test', null, opts);

		} catch (e) {}

		return supportsPassive;
	}

	function getSupportsTouchActionNone ( ) {
		return window.CSS && CSS.supports && CSS.supports('touch-action', 'none');
	}


// Value calculation

	// Determine the size of a sub-range in relation to a full range.
	function subRangeRatio ( pa, pb ) {
		return (100 / (pb - pa));
	}

	// (percentage) How many percent is this value of this range?
	function fromPercentage ( range, value ) {
		return (value * 100) / ( range[1] - range[0] );
	}

	// (percentage) Where is this value on this range?
	function toPercentage ( range, value ) {
		return fromPercentage( range, range[0] < 0 ?
			value + Math.abs(range[0]) :
				value - range[0] );
	}

	// (value) How much is this percentage on this range?
	function isPercentage ( range, value ) {
		return ((value * ( range[1] - range[0] )) / 100) + range[0];
	}


// Range conversion

	function getJ ( value, arr ) {

		var j = 1;

		while ( value >= arr[j] ){
			j += 1;
		}

		return j;
	}

	// (percentage) Input a value, find where, on a scale of 0-100, it applies.
	function toStepping ( xVal, xPct, value ) {

		if ( value >= xVal.slice(-1)[0] ){
			return 100;
		}

		var j = getJ( value, xVal );
		var va = xVal[j-1];
		var vb = xVal[j];
		var pa = xPct[j-1];
		var pb = xPct[j];

		return pa + (toPercentage([va, vb], value) / subRangeRatio (pa, pb));
	}

	// (value) Input a percentage, find where it is on the specified range.
	function fromStepping ( xVal, xPct, value ) {

		// There is no range group that fits 100
		if ( value >= 100 ){
			return xVal.slice(-1)[0];
		}

		var j = getJ( value, xPct );
		var va = xVal[j-1];
		var vb = xVal[j];
		var pa = xPct[j-1];
		var pb = xPct[j];

		return isPercentage([va, vb], (value - pa) * subRangeRatio (pa, pb));
	}

	// (percentage) Get the step that applies at a certain value.
	function getStep ( xPct, xSteps, snap, value ) {

		if ( value === 100 ) {
			return value;
		}

		var j = getJ( value, xPct );
		var a = xPct[j-1];
		var b = xPct[j];

		// If 'snap' is set, steps are used as fixed points on the slider.
		if ( snap ) {

			// Find the closest position, a or b.
			if ((value - a) > ((b-a)/2)){
				return b;
			}

			return a;
		}

		if ( !xSteps[j-1] ){
			return value;
		}

		return xPct[j-1] + closest(
			value - xPct[j-1],
			xSteps[j-1]
		);
	}


// Entry parsing

	function handleEntryPoint ( index, value, that ) {

		var percentage;

		// Wrap numerical input in an array.
		if ( typeof value === "number" ) {
			value = [value];
		}

		// Reject any invalid input, by testing whether value is an array.
		if ( !Array.isArray(value) ){
			throw new Error("noUiSlider (" + VERSION + "): 'range' contains invalid value.");
		}

		// Covert min/max syntax to 0 and 100.
		if ( index === 'min' ) {
			percentage = 0;
		} else if ( index === 'max' ) {
			percentage = 100;
		} else {
			percentage = parseFloat( index );
		}

		// Check for correct input.
		if ( !isNumeric( percentage ) || !isNumeric( value[0] ) ) {
			throw new Error("noUiSlider (" + VERSION + "): 'range' value isn't numeric.");
		}

		// Store values.
		that.xPct.push( percentage );
		that.xVal.push( value[0] );

		// NaN will evaluate to false too, but to keep
		// logging clear, set step explicitly. Make sure
		// not to override the 'step' setting with false.
		if ( !percentage ) {
			if ( !isNaN( value[1] ) ) {
				that.xSteps[0] = value[1];
			}
		} else {
			that.xSteps.push( isNaN(value[1]) ? false : value[1] );
		}

		that.xHighestCompleteStep.push(0);
	}

	function handleStepPoint ( i, n, that ) {

		// Ignore 'false' stepping.
		if ( !n ) {
			return true;
		}

		// Factor to range ratio
		that.xSteps[i] = fromPercentage([that.xVal[i], that.xVal[i+1]], n) / subRangeRatio(that.xPct[i], that.xPct[i+1]);

		var totalSteps = (that.xVal[i+1] - that.xVal[i]) / that.xNumSteps[i];
		var highestStep = Math.ceil(Number(totalSteps.toFixed(3)) - 1);
		var step = that.xVal[i] + (that.xNumSteps[i] * highestStep);

		that.xHighestCompleteStep[i] = step;
	}


// Interface

	function Spectrum ( entry, snap, singleStep ) {

		this.xPct = [];
		this.xVal = [];
		this.xSteps = [ singleStep || false ];
		this.xNumSteps = [ false ];
		this.xHighestCompleteStep = [];

		this.snap = snap;

		var index;
		var ordered = []; // [0, 'min'], [1, '50%'], [2, 'max']

		// Map the object keys to an array.
		for ( index in entry ) {
			if ( entry.hasOwnProperty(index) ) {
				ordered.push([entry[index], index]);
			}
		}

		// Sort all entries by value (numeric sort).
		if ( ordered.length && typeof ordered[0][0] === "object" ) {
			ordered.sort(function(a, b) { return a[0][0] - b[0][0]; });
		} else {
			ordered.sort(function(a, b) { return a[0] - b[0]; });
		}


		// Convert all entries to subranges.
		for ( index = 0; index < ordered.length; index++ ) {
			handleEntryPoint(ordered[index][1], ordered[index][0], this);
		}

		// Store the actual step values.
		// xSteps is sorted in the same order as xPct and xVal.
		this.xNumSteps = this.xSteps.slice(0);

		// Convert all numeric steps to the percentage of the subrange they represent.
		for ( index = 0; index < this.xNumSteps.length; index++ ) {
			handleStepPoint(index, this.xNumSteps[index], this);
		}
	}

	Spectrum.prototype.getMargin = function ( value ) {

		var step = this.xNumSteps[0];

		if ( step && ((value / step) % 1) !== 0 ) {
			throw new Error("noUiSlider (" + VERSION + "): 'limit', 'margin' and 'padding' must be divisible by step.");
		}

		return this.xPct.length === 2 ? fromPercentage(this.xVal, value) : false;
	};

	Spectrum.prototype.toStepping = function ( value ) {

		value = toStepping( this.xVal, this.xPct, value );

		return value;
	};

	Spectrum.prototype.fromStepping = function ( value ) {

		return fromStepping( this.xVal, this.xPct, value );
	};

	Spectrum.prototype.getStep = function ( value ) {

		value = getStep(this.xPct, this.xSteps, this.snap, value );

		return value;
	};

	Spectrum.prototype.getNearbySteps = function ( value ) {

		var j = getJ(value, this.xPct);

		return {
			stepBefore: { startValue: this.xVal[j-2], step: this.xNumSteps[j-2], highestStep: this.xHighestCompleteStep[j-2] },
			thisStep: { startValue: this.xVal[j-1], step: this.xNumSteps[j-1], highestStep: this.xHighestCompleteStep[j-1] },
			stepAfter: { startValue: this.xVal[j-0], step: this.xNumSteps[j-0], highestStep: this.xHighestCompleteStep[j-0] }
		};
	};

	Spectrum.prototype.countStepDecimals = function () {
		var stepDecimals = this.xNumSteps.map(countDecimals);
		return Math.max.apply(null, stepDecimals);
	};

	// Outside testing
	Spectrum.prototype.convert = function ( value ) {
		return this.getStep(this.toStepping(value));
	};

/*	Every input option is tested and parsed. This'll prevent
	endless validation in internal methods. These tests are
	structured with an item for every option available. An
	option can be marked as required by setting the 'r' flag.
	The testing function is provided with three arguments:
		- The provided value for the option;
		- A reference to the options object;
		- The name for the option;

	The testing function returns false when an error is detected,
	or true when everything is OK. It can also modify the option
	object, to make sure all values can be correctly looped elsewhere. */

	var defaultFormatter = { 'to': function( value ){
		return value !== undefined && value.toFixed(2);
	}, 'from': Number };

	function validateFormat ( entry ) {

		// Any object with a to and from method is supported.
		if ( isValidFormatter(entry) ) {
			return true;
		}

		throw new Error("noUiSlider (" + VERSION + "): 'format' requires 'to' and 'from' methods.");
	}

	function testStep ( parsed, entry ) {

		if ( !isNumeric( entry ) ) {
			throw new Error("noUiSlider (" + VERSION + "): 'step' is not numeric.");
		}

		// The step option can still be used to set stepping
		// for linear sliders. Overwritten if set in 'range'.
		parsed.singleStep = entry;
	}

	function testRange ( parsed, entry ) {

		// Filter incorrect input.
		if ( typeof entry !== 'object' || Array.isArray(entry) ) {
			throw new Error("noUiSlider (" + VERSION + "): 'range' is not an object.");
		}

		// Catch missing start or end.
		if ( entry.min === undefined || entry.max === undefined ) {
			throw new Error("noUiSlider (" + VERSION + "): Missing 'min' or 'max' in 'range'.");
		}

		// Catch equal start or end.
		if ( entry.min === entry.max ) {
			throw new Error("noUiSlider (" + VERSION + "): 'range' 'min' and 'max' cannot be equal.");
		}

		parsed.spectrum = new Spectrum(entry, parsed.snap, parsed.singleStep);
	}

	function testStart ( parsed, entry ) {

		entry = asArray(entry);

		// Validate input. Values aren't tested, as the public .val method
		// will always provide a valid location.
		if ( !Array.isArray( entry ) || !entry.length ) {
			throw new Error("noUiSlider (" + VERSION + "): 'start' option is incorrect.");
		}

		// Store the number of handles.
		parsed.handles = entry.length;

		// When the slider is initialized, the .val method will
		// be called with the start options.
		parsed.start = entry;
	}

	function testSnap ( parsed, entry ) {

		// Enforce 100% stepping within subranges.
		parsed.snap = entry;

		if ( typeof entry !== 'boolean' ){
			throw new Error("noUiSlider (" + VERSION + "): 'snap' option must be a boolean.");
		}
	}

	function testAnimate ( parsed, entry ) {

		// Enforce 100% stepping within subranges.
		parsed.animate = entry;

		if ( typeof entry !== 'boolean' ){
			throw new Error("noUiSlider (" + VERSION + "): 'animate' option must be a boolean.");
		}
	}

	function testAnimationDuration ( parsed, entry ) {

		parsed.animationDuration = entry;

		if ( typeof entry !== 'number' ){
			throw new Error("noUiSlider (" + VERSION + "): 'animationDuration' option must be a number.");
		}
	}

	function testConnect ( parsed, entry ) {

		var connect = [false];
		var i;

		// Map legacy options
		if ( entry === 'lower' ) {
			entry = [true, false];
		}

		else if ( entry === 'upper' ) {
			entry = [false, true];
		}

		// Handle boolean options
		if ( entry === true || entry === false ) {

			for ( i = 1; i < parsed.handles; i++ ) {
				connect.push(entry);
			}

			connect.push(false);
		}

		// Reject invalid input
		else if ( !Array.isArray( entry ) || !entry.length || entry.length !== parsed.handles + 1 ) {
			throw new Error("noUiSlider (" + VERSION + "): 'connect' option doesn't match handle count.");
		}

		else {
			connect = entry;
		}

		parsed.connect = connect;
	}

	function testOrientation ( parsed, entry ) {

		// Set orientation to an a numerical value for easy
		// array selection.
		switch ( entry ){
			case 'horizontal':
				parsed.ort = 0;
				break;
			case 'vertical':
				parsed.ort = 1;
				break;
			default:
				throw new Error("noUiSlider (" + VERSION + "): 'orientation' option is invalid.");
		}
	}

	function testMargin ( parsed, entry ) {

		if ( !isNumeric(entry) ){
			throw new Error("noUiSlider (" + VERSION + "): 'margin' option must be numeric.");
		}

		// Issue #582
		if ( entry === 0 ) {
			return;
		}

		parsed.margin = parsed.spectrum.getMargin(entry);

		if ( !parsed.margin ) {
			throw new Error("noUiSlider (" + VERSION + "): 'margin' option is only supported on linear sliders.");
		}
	}

	function testLimit ( parsed, entry ) {

		if ( !isNumeric(entry) ){
			throw new Error("noUiSlider (" + VERSION + "): 'limit' option must be numeric.");
		}

		parsed.limit = parsed.spectrum.getMargin(entry);

		if ( !parsed.limit || parsed.handles < 2 ) {
			throw new Error("noUiSlider (" + VERSION + "): 'limit' option is only supported on linear sliders with 2 or more handles.");
		}
	}

	function testPadding ( parsed, entry ) {

		if ( !isNumeric(entry) && !Array.isArray(entry) ){
			throw new Error("noUiSlider (" + VERSION + "): 'padding' option must be numeric or array of exactly 2 numbers.");
		}

		if ( Array.isArray(entry) && !(entry.length === 2 || isNumeric(entry[0]) || isNumeric(entry[1])) ) {
			throw new Error("noUiSlider (" + VERSION + "): 'padding' option must be numeric or array of exactly 2 numbers.");
		}

		if ( entry === 0 ) {
			return;
		}

		if ( !Array.isArray(entry) ) {
			entry = [entry, entry];
		}

		// 'getMargin' returns false for invalid values.
		parsed.padding = [parsed.spectrum.getMargin(entry[0]), parsed.spectrum.getMargin(entry[1])];

		if ( parsed.padding[0] === false || parsed.padding[1] === false ) {
			throw new Error("noUiSlider (" + VERSION + "): 'padding' option is only supported on linear sliders.");
		}

		if ( parsed.padding[0] < 0 || parsed.padding[1] < 0 ) {
			throw new Error("noUiSlider (" + VERSION + "): 'padding' option must be a positive number(s).");
		}

		if ( parsed.padding[0] + parsed.padding[1] >= 100 ) {
			throw new Error("noUiSlider (" + VERSION + "): 'padding' option must not exceed 100% of the range.");
		}
	}

	function testDirection ( parsed, entry ) {

		// Set direction as a numerical value for easy parsing.
		// Invert connection for RTL sliders, so that the proper
		// handles get the connect/background classes.
		switch ( entry ) {
			case 'ltr':
				parsed.dir = 0;
				break;
			case 'rtl':
				parsed.dir = 1;
				break;
			default:
				throw new Error("noUiSlider (" + VERSION + "): 'direction' option was not recognized.");
		}
	}

	function testBehaviour ( parsed, entry ) {

		// Make sure the input is a string.
		if ( typeof entry !== 'string' ) {
			throw new Error("noUiSlider (" + VERSION + "): 'behaviour' must be a string containing options.");
		}

		// Check if the string contains any keywords.
		// None are required.
		var tap = entry.indexOf('tap') >= 0;
		var drag = entry.indexOf('drag') >= 0;
		var fixed = entry.indexOf('fixed') >= 0;
		var snap = entry.indexOf('snap') >= 0;
		var hover = entry.indexOf('hover') >= 0;

		if ( fixed ) {

			if ( parsed.handles !== 2 ) {
				throw new Error("noUiSlider (" + VERSION + "): 'fixed' behaviour must be used with 2 handles");
			}

			// Use margin to enforce fixed state
			testMargin(parsed, parsed.start[1] - parsed.start[0]);
		}

		parsed.events = {
			tap: tap || snap,
			drag: drag,
			fixed: fixed,
			snap: snap,
			hover: hover
		};
	}

	function testTooltips ( parsed, entry ) {

		if ( entry === false ) {
			return;
		}

		else if ( entry === true ) {

			parsed.tooltips = [];

			for ( var i = 0; i < parsed.handles; i++ ) {
				parsed.tooltips.push(true);
			}
		}

		else {

			parsed.tooltips = asArray(entry);

			if ( parsed.tooltips.length !== parsed.handles ) {
				throw new Error("noUiSlider (" + VERSION + "): must pass a formatter for all handles.");
			}

			parsed.tooltips.forEach(function(formatter){
				if ( typeof formatter !== 'boolean' && (typeof formatter !== 'object' || typeof formatter.to !== 'function') ) {
					throw new Error("noUiSlider (" + VERSION + "): 'tooltips' must be passed a formatter or 'false'.");
				}
			});
		}
	}

	function testAriaFormat ( parsed, entry ) {
		parsed.ariaFormat = entry;
		validateFormat(entry);
	}

	function testFormat ( parsed, entry ) {
		parsed.format = entry;
		validateFormat(entry);
	}

	function testCssPrefix ( parsed, entry ) {

		if ( typeof entry !== 'string' && entry !== false ) {
			throw new Error("noUiSlider (" + VERSION + "): 'cssPrefix' must be a string or `false`.");
		}

		parsed.cssPrefix = entry;
	}

	function testCssClasses ( parsed, entry ) {

		if ( typeof entry !== 'object' ) {
			throw new Error("noUiSlider (" + VERSION + "): 'cssClasses' must be an object.");
		}

		if ( typeof parsed.cssPrefix === 'string' ) {
			parsed.cssClasses = {};

			for ( var key in entry ) {
				if ( !entry.hasOwnProperty(key) ) { continue; }

				parsed.cssClasses[key] = parsed.cssPrefix + entry[key];
			}
		} else {
			parsed.cssClasses = entry;
		}
	}

	// Test all developer settings and parse to assumption-safe values.
	function testOptions ( options ) {

		// To prove a fix for #537, freeze options here.
		// If the object is modified, an error will be thrown.
		// Object.freeze(options);

		var parsed = {
			margin: 0,
			limit: 0,
			padding: 0,
			animate: true,
			animationDuration: 300,
			ariaFormat: defaultFormatter,
			format: defaultFormatter
		};

		// Tests are executed in the order they are presented here.
		var tests = {
			'step': { r: false, t: testStep },
			'start': { r: true, t: testStart },
			'connect': { r: true, t: testConnect },
			'direction': { r: true, t: testDirection },
			'snap': { r: false, t: testSnap },
			'animate': { r: false, t: testAnimate },
			'animationDuration': { r: false, t: testAnimationDuration },
			'range': { r: true, t: testRange },
			'orientation': { r: false, t: testOrientation },
			'margin': { r: false, t: testMargin },
			'limit': { r: false, t: testLimit },
			'padding': { r: false, t: testPadding },
			'behaviour': { r: true, t: testBehaviour },
			'ariaFormat': { r: false, t: testAriaFormat },
			'format': { r: false, t: testFormat },
			'tooltips': { r: false, t: testTooltips },
			'cssPrefix': { r: true, t: testCssPrefix },
			'cssClasses': { r: true, t: testCssClasses }
		};

		var defaults = {
			'connect': false,
			'direction': 'ltr',
			'behaviour': 'tap',
			'orientation': 'horizontal',
			'cssPrefix' : 'noUi-',
			'cssClasses': {
				target: 'target',
				base: 'base',
				origin: 'origin',
				handle: 'handle',
				handleLower: 'handle-lower',
				handleUpper: 'handle-upper',
				horizontal: 'horizontal',
				vertical: 'vertical',
				background: 'background',
				connect: 'connect',
				connects: 'connects',
				ltr: 'ltr',
				rtl: 'rtl',
				draggable: 'draggable',
				drag: 'state-drag',
				tap: 'state-tap',
				active: 'active',
				tooltip: 'tooltip',
				pips: 'pips',
				pipsHorizontal: 'pips-horizontal',
				pipsVertical: 'pips-vertical',
				marker: 'marker',
				markerHorizontal: 'marker-horizontal',
				markerVertical: 'marker-vertical',
				markerNormal: 'marker-normal',
				markerLarge: 'marker-large',
				markerSub: 'marker-sub',
				value: 'value',
				valueHorizontal: 'value-horizontal',
				valueVertical: 'value-vertical',
				valueNormal: 'value-normal',
				valueLarge: 'value-large',
				valueSub: 'value-sub'
			}
		};

		// AriaFormat defaults to regular format, if any.
		if ( options.format && !options.ariaFormat ) {
			options.ariaFormat = options.format;
		}

		// Run all options through a testing mechanism to ensure correct
		// input. It should be noted that options might get modified to
		// be handled properly. E.g. wrapping integers in arrays.
		Object.keys(tests).forEach(function( name ){

			// If the option isn't set, but it is required, throw an error.
			if ( !isSet(options[name]) && defaults[name] === undefined ) {

				if ( tests[name].r ) {
					throw new Error("noUiSlider (" + VERSION + "): '" + name + "' is required.");
				}

				return true;
			}

			tests[name].t( parsed, !isSet(options[name]) ? defaults[name] : options[name] );
		});

		// Forward pips options
		parsed.pips = options.pips;

		// All recent browsers accept unprefixed transform.
		// We need -ms- for IE9 and -webkit- for older Android;
		// Assume use of -webkit- if unprefixed and -ms- are not supported.
		// https://caniuse.com/#feat=transforms2d
		var d = document.createElement("div");
		var msPrefix = d.style.msTransform !== undefined;
		var noPrefix = d.style.transform !== undefined;

		parsed.transformRule = noPrefix ? 'transform' : (msPrefix ? 'msTransform' : 'webkitTransform');

		// Pips don't move, so we can place them using left/top.
		var styles = [['left', 'top'], ['right', 'bottom']];

		parsed.style = styles[parsed.dir][parsed.ort];

		return parsed;
	}


function scope ( target, options, originalOptions ){

	var actions = getActions();
	var supportsTouchActionNone = getSupportsTouchActionNone();
	var supportsPassive = supportsTouchActionNone && getSupportsPassive();

	// All variables local to 'scope' are prefixed with 'scope_'
	var scope_Target = target;
	var scope_Locations = [];
	var scope_Base;
	var scope_Handles;
	var scope_HandleNumbers = [];
	var scope_ActiveHandlesCount = 0;
	var scope_Connects;
	var scope_Spectrum = options.spectrum;
	var scope_Values = [];
	var scope_Events = {};
	var scope_Self;
	var scope_Pips;
	var scope_Document = target.ownerDocument;
	var scope_DocumentElement = scope_Document.documentElement;
	var scope_Body = scope_Document.body;


	// For horizontal sliders in standard ltr documents,
	// make .noUi-origin overflow to the left so the document doesn't scroll.
	var scope_DirOffset = (scope_Document.dir === 'rtl') || (options.ort === 1) ? 0 : 100;

/*! In this file: Construction of DOM elements; */

	// Creates a node, adds it to target, returns the new node.
	function addNodeTo ( addTarget, className ) {

		var div = scope_Document.createElement('div');

		if ( className ) {
			addClass(div, className);
		}

		addTarget.appendChild(div);

		return div;
	}

	// Append a origin to the base
	function addOrigin ( base, handleNumber ) {

		var origin = addNodeTo(base, options.cssClasses.origin);
		var handle = addNodeTo(origin, options.cssClasses.handle);

		handle.setAttribute('data-handle', handleNumber);

		// https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
		// 0 = focusable and reachable
		handle.setAttribute('tabindex', '0');
		handle.setAttribute('role', 'slider');
		handle.setAttribute('aria-orientation', options.ort ? 'vertical' : 'horizontal');

		if ( handleNumber === 0 ) {
			addClass(handle, options.cssClasses.handleLower);
		}

		else if ( handleNumber === options.handles - 1 ) {
			addClass(handle, options.cssClasses.handleUpper);
		}

		return origin;
	}

	// Insert nodes for connect elements
	function addConnect ( base, add ) {

		if ( !add ) {
			return false;
		}

		return addNodeTo(base, options.cssClasses.connect);
	}

	// Add handles to the slider base.
	function addElements ( connectOptions, base ) {

		var connectBase = addNodeTo(base, options.cssClasses.connects);

		scope_Handles = [];
		scope_Connects = [];

		scope_Connects.push(addConnect(connectBase, connectOptions[0]));

		// [::::O====O====O====]
		// connectOptions = [0, 1, 1, 1]

		for ( var i = 0; i < options.handles; i++ ) {
			// Keep a list of all added handles.
			scope_Handles.push(addOrigin(base, i));
			scope_HandleNumbers[i] = i;
			scope_Connects.push(addConnect(connectBase, connectOptions[i + 1]));
		}
	}

	// Initialize a single slider.
	function addSlider ( addTarget ) {

		// Apply classes and data to the target.
		addClass(addTarget, options.cssClasses.target);

		if ( options.dir === 0 ) {
			addClass(addTarget, options.cssClasses.ltr);
		} else {
			addClass(addTarget, options.cssClasses.rtl);
		}

		if ( options.ort === 0 ) {
			addClass(addTarget, options.cssClasses.horizontal);
		} else {
			addClass(addTarget, options.cssClasses.vertical);
		}

		scope_Base = addNodeTo(addTarget, options.cssClasses.base);
	}


	function addTooltip ( handle, handleNumber ) {

		if ( !options.tooltips[handleNumber] ) {
			return false;
		}

		return addNodeTo(handle.firstChild, options.cssClasses.tooltip);
	}

	// The tooltips option is a shorthand for using the 'update' event.
	function tooltips ( ) {

		// Tooltips are added with options.tooltips in original order.
		var tips = scope_Handles.map(addTooltip);

		bindEvent('update', function(values, handleNumber, unencoded) {

			if ( !tips[handleNumber] ) {
				return;
			}

			var formattedValue = values[handleNumber];

			if ( options.tooltips[handleNumber] !== true ) {
				formattedValue = options.tooltips[handleNumber].to(unencoded[handleNumber]);
			}

			tips[handleNumber].innerHTML = formattedValue;
		});
	}


	function aria ( ) {

		bindEvent('update', function ( values, handleNumber, unencoded, tap, positions ) {

			// Update Aria Values for all handles, as a change in one changes min and max values for the next.
			scope_HandleNumbers.forEach(function( index ){

				var handle = scope_Handles[index];

				var min = checkHandlePosition(scope_Locations, index, 0, true, true, true);
				var max = checkHandlePosition(scope_Locations, index, 100, true, true, true);

				var now = positions[index];
				var text = options.ariaFormat.to(unencoded[index]);

				handle.children[0].setAttribute('aria-valuemin', min.toFixed(1));
				handle.children[0].setAttribute('aria-valuemax', max.toFixed(1));
				handle.children[0].setAttribute('aria-valuenow', now.toFixed(1));
				handle.children[0].setAttribute('aria-valuetext', text);
			});
		});
	}


	function getGroup ( mode, values, stepped ) {

		// Use the range.
		if ( mode === 'range' || mode === 'steps' ) {
			return scope_Spectrum.xVal;
		}

		if ( mode === 'count' ) {

			if ( values < 2 ) {
				throw new Error("noUiSlider (" + VERSION + "): 'values' (>= 2) required for mode 'count'.");
			}

			// Divide 0 - 100 in 'count' parts.
			var interval = values - 1;
			var spread = ( 100 / interval );

			values = [];

			// List these parts and have them handled as 'positions'.
			while ( interval-- ) {
				values[ interval ] = ( interval * spread );
			}

			values.push(100);

			mode = 'positions';
		}

		if ( mode === 'positions' ) {

			// Map all percentages to on-range values.
			return values.map(function( value ){
				return scope_Spectrum.fromStepping( stepped ? scope_Spectrum.getStep( value ) : value );
			});
		}

		if ( mode === 'values' ) {

			// If the value must be stepped, it needs to be converted to a percentage first.
			if ( stepped ) {

				return values.map(function( value ){

					// Convert to percentage, apply step, return to value.
					return scope_Spectrum.fromStepping( scope_Spectrum.getStep( scope_Spectrum.toStepping( value ) ) );
				});

			}

			// Otherwise, we can simply use the values.
			return values;
		}
	}

	function generateSpread ( density, mode, group ) {

		function safeIncrement(value, increment) {
			// Avoid floating point variance by dropping the smallest decimal places.
			return (value + increment).toFixed(7) / 1;
		}

		var indexes = {};
		var firstInRange = scope_Spectrum.xVal[0];
		var lastInRange = scope_Spectrum.xVal[scope_Spectrum.xVal.length-1];
		var ignoreFirst = false;
		var ignoreLast = false;
		var prevPct = 0;

		// Create a copy of the group, sort it and filter away all duplicates.
		group = unique(group.slice().sort(function(a, b){ return a - b; }));

		// Make sure the range starts with the first element.
		if ( group[0] !== firstInRange ) {
			group.unshift(firstInRange);
			ignoreFirst = true;
		}

		// Likewise for the last one.
		if ( group[group.length - 1] !== lastInRange ) {
			group.push(lastInRange);
			ignoreLast = true;
		}

		group.forEach(function ( current, index ) {

			// Get the current step and the lower + upper positions.
			var step;
			var i;
			var q;
			var low = current;
			var high = group[index+1];
			var newPct;
			var pctDifference;
			var pctPos;
			var type;
			var steps;
			var realSteps;
			var stepsize;

			// When using 'steps' mode, use the provided steps.
			// Otherwise, we'll step on to the next subrange.
			if ( mode === 'steps' ) {
				step = scope_Spectrum.xNumSteps[ index ];
			}

			// Default to a 'full' step.
			if ( !step ) {
				step = high-low;
			}

			// Low can be 0, so test for false. If high is undefined,
			// we are at the last subrange. Index 0 is already handled.
			if ( low === false || high === undefined ) {
				return;
			}

			// Make sure step isn't 0, which would cause an infinite loop (#654)
			step = Math.max(step, 0.0000001);

			// Find all steps in the subrange.
			for ( i = low; i <= high; i = safeIncrement(i, step) ) {

				// Get the percentage value for the current step,
				// calculate the size for the subrange.
				newPct = scope_Spectrum.toStepping( i );
				pctDifference = newPct - prevPct;

				steps = pctDifference / density;
				realSteps = Math.round(steps);

				// This ratio represents the amount of percentage-space a point indicates.
				// For a density 1 the points/percentage = 1. For density 2, that percentage needs to be re-devided.
				// Round the percentage offset to an even number, then divide by two
				// to spread the offset on both sides of the range.
				stepsize = pctDifference/realSteps;

				// Divide all points evenly, adding the correct number to this subrange.
				// Run up to <= so that 100% gets a point, event if ignoreLast is set.
				for ( q = 1; q <= realSteps; q += 1 ) {

					// The ratio between the rounded value and the actual size might be ~1% off.
					// Correct the percentage offset by the number of points
					// per subrange. density = 1 will result in 100 points on the
					// full range, 2 for 50, 4 for 25, etc.
					pctPos = prevPct + ( q * stepsize );
					indexes[pctPos.toFixed(5)] = ['x', 0];
				}

				// Determine the point type.
				type = (group.indexOf(i) > -1) ? 1 : ( mode === 'steps' ? 2 : 0 );

				// Enforce the 'ignoreFirst' option by overwriting the type for 0.
				if ( !index && ignoreFirst ) {
					type = 0;
				}

				if ( !(i === high && ignoreLast)) {
					// Mark the 'type' of this point. 0 = plain, 1 = real value, 2 = step value.
					indexes[newPct.toFixed(5)] = [i, type];
				}

				// Update the percentage count.
				prevPct = newPct;
			}
		});

		return indexes;
	}

	function addMarking ( spread, filterFunc, formatter ) {

		var element = scope_Document.createElement('div');

		var valueSizeClasses = [
			options.cssClasses.valueNormal,
			options.cssClasses.valueLarge,
			options.cssClasses.valueSub
		];
		var markerSizeClasses = [
			options.cssClasses.markerNormal,
			options.cssClasses.markerLarge,
			options.cssClasses.markerSub
		];
		var valueOrientationClasses = [
			options.cssClasses.valueHorizontal,
			options.cssClasses.valueVertical
		];
		var markerOrientationClasses = [
			options.cssClasses.markerHorizontal,
			options.cssClasses.markerVertical
		];

		addClass(element, options.cssClasses.pips);
		addClass(element, options.ort === 0 ? options.cssClasses.pipsHorizontal : options.cssClasses.pipsVertical);

		function getClasses( type, source ){
			var a = source === options.cssClasses.value;
			var orientationClasses = a ? valueOrientationClasses : markerOrientationClasses;
			var sizeClasses = a ? valueSizeClasses : markerSizeClasses;

			return source + ' ' + orientationClasses[options.ort] + ' ' + sizeClasses[type];
		}

		function addSpread ( offset, values ){

			// Apply the filter function, if it is set.
			values[1] = (values[1] && filterFunc) ? filterFunc(values[0], values[1]) : values[1];

			// Add a marker for every point
			var node = addNodeTo(element, false);
				node.className = getClasses(values[1], options.cssClasses.marker);
				node.style[options.style] = offset + '%';

			// Values are only appended for points marked '1' or '2'.
			if ( values[1] ) {
				node = addNodeTo(element, false);
				node.className = getClasses(values[1], options.cssClasses.value);
				node.setAttribute('data-value', values[0]);
				node.style[options.style] = offset + '%';
				node.innerText = formatter.to(values[0]);
			}
		}

		// Append all points.
		Object.keys(spread).forEach(function(a){
			addSpread(a, spread[a]);
		});

		return element;
	}

	function removePips ( ) {
		if ( scope_Pips ) {
			removeElement(scope_Pips);
			scope_Pips = null;
		}
	}

	function pips ( grid ) {

		// Fix #669
		removePips();

		var mode = grid.mode;
		var density = grid.density || 1;
		var filter = grid.filter || false;
		var values = grid.values || false;
		var stepped = grid.stepped || false;
		var group = getGroup( mode, values, stepped );
		var spread = generateSpread( density, mode, group );
		var format = grid.format || {
			to: Math.round
		};

		scope_Pips = scope_Target.appendChild(addMarking(
			spread,
			filter,
			format
		));

		return scope_Pips;
	}

/*! In this file: Browser events (not slider events like slide, change); */

	// Shorthand for base dimensions.
	function baseSize ( ) {
		var rect = scope_Base.getBoundingClientRect();
		var alt = 'offset' + ['Width', 'Height'][options.ort];
		return options.ort === 0 ? (rect.width||scope_Base[alt]) : (rect.height||scope_Base[alt]);
	}

	// Handler for attaching events trough a proxy.
	function attachEvent ( events, element, callback, data ) {

		// This function can be used to 'filter' events to the slider.
		// element is a node, not a nodeList

		var method = function ( e ){

			e = fixEvent(e, data.pageOffset, data.target || element);

			// fixEvent returns false if this event has a different target
			// when handling (multi-) touch events;
			if ( !e ) {
				return false;
			}

			// doNotReject is passed by all end events to make sure released touches
			// are not rejected, leaving the slider "stuck" to the cursor;
			if ( scope_Target.hasAttribute('disabled') && !data.doNotReject ) {
				return false;
			}

			// Stop if an active 'tap' transition is taking place.
			if ( hasClass(scope_Target, options.cssClasses.tap) && !data.doNotReject ) {
				return false;
			}

			// Ignore right or middle clicks on start #454
			if ( events === actions.start && e.buttons !== undefined && e.buttons > 1 ) {
				return false;
			}

			// Ignore right or middle clicks on start #454
			if ( data.hover && e.buttons ) {
				return false;
			}

			// 'supportsPassive' is only true if a browser also supports touch-action: none in CSS.
			// iOS safari does not, so it doesn't get to benefit from passive scrolling. iOS does support
			// touch-action: manipulation, but that allows panning, which breaks
			// sliders after zooming/on non-responsive pages.
			// See: https://bugs.webkit.org/show_bug.cgi?id=133112
			if ( !supportsPassive ) {
				e.preventDefault();
			}

			e.calcPoint = e.points[ options.ort ];

			// Call the event handler with the event [ and additional data ].
			callback ( e, data );
		};

		var methods = [];

		// Bind a closure on the target for every event type.
		events.split(' ').forEach(function( eventName ){
			element.addEventListener(eventName, method, supportsPassive ? { passive: true } : false);
			methods.push([eventName, method]);
		});

		return methods;
	}

	// Provide a clean event with standardized offset values.
	function fixEvent ( e, pageOffset, eventTarget ) {

		// Filter the event to register the type, which can be
		// touch, mouse or pointer. Offset changes need to be
		// made on an event specific basis.
		var touch = e.type.indexOf('touch') === 0;
		var mouse = e.type.indexOf('mouse') === 0;
		var pointer = e.type.indexOf('pointer') === 0;

		var x;
		var y;

		// IE10 implemented pointer events with a prefix;
		if ( e.type.indexOf('MSPointer') === 0 ) {
			pointer = true;
		}

		// In the event that multitouch is activated, the only thing one handle should be concerned
		// about is the touches that originated on top of it.
		if ( touch ) {

			// Returns true if a touch originated on the target.
			var isTouchOnTarget = function (checkTouch) {
				return checkTouch.target === eventTarget || eventTarget.contains(checkTouch.target);
			};

			// In the case of touchstart events, we need to make sure there is still no more than one
			// touch on the target so we look amongst all touches.
			if (e.type === 'touchstart') {

				var targetTouches = Array.prototype.filter.call(e.touches, isTouchOnTarget);

				// Do not support more than one touch per handle.
				if ( targetTouches.length > 1 ) {
					return false;
				}

				x = targetTouches[0].pageX;
				y = targetTouches[0].pageY;

			} else {

				// In the other cases, find on changedTouches is enough.
				var targetTouch = Array.prototype.find.call(e.changedTouches, isTouchOnTarget);

				// Cancel if the target touch has not moved.
				if ( !targetTouch ) {
					return false;
				}

				x = targetTouch.pageX;
				y = targetTouch.pageY;
			}
		}

		pageOffset = pageOffset || getPageOffset(scope_Document);

		if ( mouse || pointer ) {
			x = e.clientX + pageOffset.x;
			y = e.clientY + pageOffset.y;
		}

		e.pageOffset = pageOffset;
		e.points = [x, y];
		e.cursor = mouse || pointer; // Fix #435

		return e;
	}

	// Translate a coordinate in the document to a percentage on the slider
	function calcPointToPercentage ( calcPoint ) {
		var location = calcPoint - offset(scope_Base, options.ort);
		var proposal = ( location * 100 ) / baseSize();

		// Clamp proposal between 0% and 100%
		// Out-of-bound coordinates may occur when .noUi-base pseudo-elements
		// are used (e.g. contained handles feature)
		proposal = limit(proposal);

		return options.dir ? 100 - proposal : proposal;
	}

	// Find handle closest to a certain percentage on the slider
	function getClosestHandle ( proposal ) {

		var closest = 100;
		var handleNumber = false;

		scope_Handles.forEach(function(handle, index){

			// Disabled handles are ignored
			if ( handle.hasAttribute('disabled') ) {
				return;
			}

			var pos = Math.abs(scope_Locations[index] - proposal);

			if ( pos < closest || (pos === 100 && closest === 100) ) {
				handleNumber = index;
				closest = pos;
			}
		});

		return handleNumber;
	}

	// Fire 'end' when a mouse or pen leaves the document.
	function documentLeave ( event, data ) {
		if ( event.type === "mouseout" && event.target.nodeName === "HTML" && event.relatedTarget === null ){
			eventEnd (event, data);
		}
	}

	// Handle movement on document for handle and range drag.
	function eventMove ( event, data ) {

		// Fix #498
		// Check value of .buttons in 'start' to work around a bug in IE10 mobile (data.buttonsProperty).
		// https://connect.microsoft.com/IE/feedback/details/927005/mobile-ie10-windows-phone-buttons-property-of-pointermove-event-always-zero
		// IE9 has .buttons and .which zero on mousemove.
		// Firefox breaks the spec MDN defines.
		if ( navigator.appVersion.indexOf("MSIE 9") === -1 && event.buttons === 0 && data.buttonsProperty !== 0 ) {
			return eventEnd(event, data);
		}

		// Check if we are moving up or down
		var movement = (options.dir ? -1 : 1) * (event.calcPoint - data.startCalcPoint);

		// Convert the movement into a percentage of the slider width/height
		var proposal = (movement * 100) / data.baseSize;

		moveHandles(movement > 0, proposal, data.locations, data.handleNumbers);
	}

	// Unbind move events on document, call callbacks.
	function eventEnd ( event, data ) {

		// The handle is no longer active, so remove the class.
		if ( data.handle ) {
			removeClass(data.handle, options.cssClasses.active);
			scope_ActiveHandlesCount -= 1;
		}

		// Unbind the move and end events, which are added on 'start'.
		data.listeners.forEach(function( c ) {
			scope_DocumentElement.removeEventListener(c[0], c[1]);
		});

		if ( scope_ActiveHandlesCount === 0 ) {
			// Remove dragging class.
			removeClass(scope_Target, options.cssClasses.drag);
			setZindex();

			// Remove cursor styles and text-selection events bound to the body.
			if ( event.cursor ) {
				scope_Body.style.cursor = '';
				scope_Body.removeEventListener('selectstart', preventDefault);
			}
		}

		data.handleNumbers.forEach(function(handleNumber){
			fireEvent('change', handleNumber);
			fireEvent('set', handleNumber);
			fireEvent('end', handleNumber);
		});
	}

	// Bind move events on document.
	function eventStart ( event, data ) {

		var handle;
		if ( data.handleNumbers.length === 1 ) {

			var handleOrigin = scope_Handles[data.handleNumbers[0]];

			// Ignore 'disabled' handles
			if ( handleOrigin.hasAttribute('disabled') ) {
				return false;
			}

			handle = handleOrigin.children[0];
			scope_ActiveHandlesCount += 1;

			// Mark the handle as 'active' so it can be styled.
			addClass(handle, options.cssClasses.active);
		}

		// A drag should never propagate up to the 'tap' event.
		event.stopPropagation();

		// Record the event listeners.
		var listeners = [];

		// Attach the move and end events.
		var moveEvent = attachEvent(actions.move, scope_DocumentElement, eventMove, {
			// The event target has changed so we need to propagate the original one so that we keep
			// relying on it to extract target touches.
			target: event.target,
			handle: handle,
			listeners: listeners,
			startCalcPoint: event.calcPoint,
			baseSize: baseSize(),
			pageOffset: event.pageOffset,
			handleNumbers: data.handleNumbers,
			buttonsProperty: event.buttons,
			locations: scope_Locations.slice()
		});

		var endEvent = attachEvent(actions.end, scope_DocumentElement, eventEnd, {
			target: event.target,
			handle: handle,
			listeners: listeners,
			doNotReject: true,
			handleNumbers: data.handleNumbers
		});

		var outEvent = attachEvent("mouseout", scope_DocumentElement, documentLeave, {
			target: event.target,
			handle: handle,
			listeners: listeners,
			doNotReject: true,
			handleNumbers: data.handleNumbers
		});

		// We want to make sure we pushed the listeners in the listener list rather than creating
		// a new one as it has already been passed to the event handlers.
		listeners.push.apply(listeners, moveEvent.concat(endEvent, outEvent));

		// Text selection isn't an issue on touch devices,
		// so adding cursor styles can be skipped.
		if ( event.cursor ) {

			// Prevent the 'I' cursor and extend the range-drag cursor.
			scope_Body.style.cursor = getComputedStyle(event.target).cursor;

			// Mark the target with a dragging state.
			if ( scope_Handles.length > 1 ) {
				addClass(scope_Target, options.cssClasses.drag);
			}

			// Prevent text selection when dragging the handles.
			// In noUiSlider <= 9.2.0, this was handled by calling preventDefault on mouse/touch start/move,
			// which is scroll blocking. The selectstart event is supported by FireFox starting from version 52,
			// meaning the only holdout is iOS Safari. This doesn't matter: text selection isn't triggered there.
			// The 'cursor' flag is false.
			// See: http://caniuse.com/#search=selectstart
			scope_Body.addEventListener('selectstart', preventDefault, false);
		}

		data.handleNumbers.forEach(function(handleNumber){
			fireEvent('start', handleNumber);
		});
	}

	// Move closest handle to tapped location.
	function eventTap ( event ) {

		// The tap event shouldn't propagate up
		event.stopPropagation();

		var proposal = calcPointToPercentage(event.calcPoint);
		var handleNumber = getClosestHandle(proposal);

		// Tackle the case that all handles are 'disabled'.
		if ( handleNumber === false ) {
			return false;
		}

		// Flag the slider as it is now in a transitional state.
		// Transition takes a configurable amount of ms (default 300). Re-enable the slider after that.
		if ( !options.events.snap ) {
			addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
		}

		setHandle(handleNumber, proposal, true, true);

		setZindex();

		fireEvent('slide', handleNumber, true);
		fireEvent('update', handleNumber, true);
		fireEvent('change', handleNumber, true);
		fireEvent('set', handleNumber, true);

		if ( options.events.snap ) {
			eventStart(event, { handleNumbers: [handleNumber] });
		}
	}

	// Fires a 'hover' event for a hovered mouse/pen position.
	function eventHover ( event ) {

		var proposal = calcPointToPercentage(event.calcPoint);

		var to = scope_Spectrum.getStep(proposal);
		var value = scope_Spectrum.fromStepping(to);

		Object.keys(scope_Events).forEach(function( targetEvent ) {
			if ( 'hover' === targetEvent.split('.')[0] ) {
				scope_Events[targetEvent].forEach(function( callback ) {
					callback.call( scope_Self, value );
				});
			}
		});
	}

	// Attach events to several slider parts.
	function bindSliderEvents ( behaviour ) {

		// Attach the standard drag event to the handles.
		if ( !behaviour.fixed ) {

			scope_Handles.forEach(function( handle, index ){

				// These events are only bound to the visual handle
				// element, not the 'real' origin element.
				attachEvent ( actions.start, handle.children[0], eventStart, {
					handleNumbers: [index]
				});
			});
		}

		// Attach the tap event to the slider base.
		if ( behaviour.tap ) {
			attachEvent (actions.start, scope_Base, eventTap, {});
		}

		// Fire hover events
		if ( behaviour.hover ) {
			attachEvent (actions.move, scope_Base, eventHover, { hover: true });
		}

		// Make the range draggable.
		if ( behaviour.drag ){

			scope_Connects.forEach(function( connect, index ){

				if ( connect === false || index === 0 || index === scope_Connects.length - 1 ) {
					return;
				}

				var handleBefore = scope_Handles[index - 1];
				var handleAfter = scope_Handles[index];
				var eventHolders = [connect];

				addClass(connect, options.cssClasses.draggable);

				// When the range is fixed, the entire range can
				// be dragged by the handles. The handle in the first
				// origin will propagate the start event upward,
				// but it needs to be bound manually on the other.
				if ( behaviour.fixed ) {
					eventHolders.push(handleBefore.children[0]);
					eventHolders.push(handleAfter.children[0]);
				}

				eventHolders.forEach(function( eventHolder ) {
					attachEvent ( actions.start, eventHolder, eventStart, {
						handles: [handleBefore, handleAfter],
						handleNumbers: [index - 1, index]
					});
				});
			});
		}
	}

/*! In this file: Slider events (not browser events); */

	// Attach an event to this slider, possibly including a namespace
	function bindEvent ( namespacedEvent, callback ) {
		scope_Events[namespacedEvent] = scope_Events[namespacedEvent] || [];
		scope_Events[namespacedEvent].push(callback);

		// If the event bound is 'update,' fire it immediately for all handles.
		if ( namespacedEvent.split('.')[0] === 'update' ) {
			scope_Handles.forEach(function(a, index){
				fireEvent('update', index);
			});
		}
	}

	// Undo attachment of event
	function removeEvent ( namespacedEvent ) {

		var event = namespacedEvent && namespacedEvent.split('.')[0];
		var namespace = event && namespacedEvent.substring(event.length);

		Object.keys(scope_Events).forEach(function( bind ){

			var tEvent = bind.split('.')[0];
			var tNamespace = bind.substring(tEvent.length);

			if ( (!event || event === tEvent) && (!namespace || namespace === tNamespace) ) {
				delete scope_Events[bind];
			}
		});
	}

	// External event handling
	function fireEvent ( eventName, handleNumber, tap ) {

		Object.keys(scope_Events).forEach(function( targetEvent ) {

			var eventType = targetEvent.split('.')[0];

			if ( eventName === eventType ) {
				scope_Events[targetEvent].forEach(function( callback ) {

					callback.call(
						// Use the slider public API as the scope ('this')
						scope_Self,
						// Return values as array, so arg_1[arg_2] is always valid.
						scope_Values.map(options.format.to),
						// Handle index, 0 or 1
						handleNumber,
						// Unformatted slider values
						scope_Values.slice(),
						// Event is fired by tap, true or false
						tap || false,
						// Left offset of the handle, in relation to the slider
						scope_Locations.slice()
					);
				});
			}
		});
	}

/*! In this file: Mechanics for slider operation */

	function toPct ( pct ) {
		return pct + '%';
	}

	// Split out the handle positioning logic so the Move event can use it, too
	function checkHandlePosition ( reference, handleNumber, to, lookBackward, lookForward, getValue ) {

		// For sliders with multiple handles, limit movement to the other handle.
		// Apply the margin option by adding it to the handle positions.
		if ( scope_Handles.length > 1 ) {

			if ( lookBackward && handleNumber > 0 ) {
				to = Math.max(to, reference[handleNumber - 1] + options.margin);
			}

			if ( lookForward && handleNumber < scope_Handles.length - 1 ) {
				to = Math.min(to, reference[handleNumber + 1] - options.margin);
			}
		}

		// The limit option has the opposite effect, limiting handles to a
		// maximum distance from another. Limit must be > 0, as otherwise
		// handles would be unmoveable.
		if ( scope_Handles.length > 1 && options.limit ) {

			if ( lookBackward && handleNumber > 0 ) {
				to = Math.min(to, reference[handleNumber - 1] + options.limit);
			}

			if ( lookForward && handleNumber < scope_Handles.length - 1 ) {
				to = Math.max(to, reference[handleNumber + 1] - options.limit);
			}
		}

		// The padding option keeps the handles a certain distance from the
		// edges of the slider. Padding must be > 0.
		if ( options.padding ) {

			if ( handleNumber === 0 ) {
				to = Math.max(to, options.padding[0]);
			}

			if ( handleNumber === scope_Handles.length - 1 ) {
				to = Math.min(to, 100 - options.padding[1]);
			}
		}

		to = scope_Spectrum.getStep(to);

		// Limit percentage to the 0 - 100 range
		to = limit(to);

		// Return false if handle can't move
		if ( to === reference[handleNumber] && !getValue ) {
			return false;
		}

		return to;
	}

	// Uses slider orientation to create CSS rules. a = base value;
	function inRuleOrder ( v, a ) {
		var o = options.ort;
		return (o?a:v) + ', ' + (o?v:a);
	}

	// Moves handle(s) by a percentage
	// (bool, % to move, [% where handle started, ...], [index in scope_Handles, ...])
	function moveHandles ( upward, proposal, locations, handleNumbers ) {

		var proposals = locations.slice();

		var b = [!upward, upward];
		var f = [upward, !upward];

		// Copy handleNumbers so we don't change the dataset
		handleNumbers = handleNumbers.slice();

		// Check to see which handle is 'leading'.
		// If that one can't move the second can't either.
		if ( upward ) {
			handleNumbers.reverse();
		}

		// Step 1: get the maximum percentage that any of the handles can move
		if ( handleNumbers.length > 1 ) {

			handleNumbers.forEach(function(handleNumber, o) {

				var to = checkHandlePosition(proposals, handleNumber, proposals[handleNumber] + proposal, b[o], f[o], false);

				// Stop if one of the handles can't move.
				if ( to === false ) {
					proposal = 0;
				} else {
					proposal = to - proposals[handleNumber];
					proposals[handleNumber] = to;
				}
			});
		}

		// If using one handle, check backward AND forward
		else {
			b = f = [true];
		}

		var state = false;

		// Step 2: Try to set the handles with the found percentage
		handleNumbers.forEach(function(handleNumber, o) {
			state = setHandle(handleNumber, locations[handleNumber] + proposal, b[o], f[o]) || state;
		});

		// Step 3: If a handle moved, fire events
		if ( state ) {
			handleNumbers.forEach(function(handleNumber){
				fireEvent('update', handleNumber);
				fireEvent('slide', handleNumber);
			});
		}
	}

	// Takes a base value and an offset. This offset is used for the connect bar size.
	// In the initial design for this feature, the origin element was 1% wide.
	// Unfortunately, a rounding bug in Chrome makes it impossible to implement this feature
	// in this manner: https://bugs.chromium.org/p/chromium/issues/detail?id=798223
	function transformDirection ( a, b ) {
		return options.dir ? 100 - a - b : a;
	}

	// Updates scope_Locations and scope_Values, updates visual state
	function updateHandlePosition ( handleNumber, to ) {

		// Update locations.
		scope_Locations[handleNumber] = to;

		// Convert the value to the slider stepping/range.
		scope_Values[handleNumber] = scope_Spectrum.fromStepping(to);

		var rule = 'translate(' + inRuleOrder(toPct(transformDirection(to, 0) - scope_DirOffset), '0') + ')';
		scope_Handles[handleNumber].style[options.transformRule] = rule;

		updateConnect(handleNumber);
		updateConnect(handleNumber + 1);
	}

	// Handles before the slider middle are stacked later = higher,
	// Handles after the middle later is lower
	// [[7] [8] .......... | .......... [5] [4]
	function setZindex ( ) {

		scope_HandleNumbers.forEach(function(handleNumber){
			var dir = (scope_Locations[handleNumber] > 50 ? -1 : 1);
			var zIndex = 3 + (scope_Handles.length + (dir * handleNumber));
			scope_Handles[handleNumber].style.zIndex = zIndex;
		});
	}

	// Test suggested values and apply margin, step.
	function setHandle ( handleNumber, to, lookBackward, lookForward ) {

		to = checkHandlePosition(scope_Locations, handleNumber, to, lookBackward, lookForward, false);

		if ( to === false ) {
			return false;
		}

		updateHandlePosition(handleNumber, to);

		return true;
	}

	// Updates style attribute for connect nodes
	function updateConnect ( index ) {

		// Skip connects set to false
		if ( !scope_Connects[index] ) {
			return;
		}

		var l = 0;
		var h = 100;

		if ( index !== 0 ) {
			l = scope_Locations[index - 1];
		}

		if ( index !== scope_Connects.length - 1 ) {
			h = scope_Locations[index];
		}

		// We use two rules:
		// 'translate' to change the left/top offset;
		// 'scale' to change the width of the element;
		// As the element has a width of 100%, a translation of 100% is equal to 100% of the parent (.noUi-base)
		var connectWidth = h - l;
		var translateRule = 'translate(' + inRuleOrder(toPct(transformDirection(l, connectWidth)), '0') + ')';
		var scaleRule = 'scale(' + inRuleOrder(connectWidth / 100, '1') + ')';

		scope_Connects[index].style[options.transformRule] = translateRule + ' ' + scaleRule;
	}

/*! In this file: All methods eventually exposed in slider.noUiSlider... */

	// Parses value passed to .set method. Returns current value if not parse-able.
	function resolveToValue ( to, handleNumber ) {

		// Setting with null indicates an 'ignore'.
		// Inputting 'false' is invalid.
		if ( to === null || to === false || to === undefined ) {
			return scope_Locations[handleNumber];
		}

		// If a formatted number was passed, attempt to decode it.
		if ( typeof to === 'number' ) {
			to = String(to);
		}

		to = options.format.from(to);
		to = scope_Spectrum.toStepping(to);

		// If parsing the number failed, use the current value.
		if ( to === false || isNaN(to) ) {
			return scope_Locations[handleNumber];
		}

		return to;
	}

	// Set the slider value.
	function valueSet ( input, fireSetEvent ) {

		var values = asArray(input);
		var isInit = scope_Locations[0] === undefined;

		// Event fires by default
		fireSetEvent = (fireSetEvent === undefined ? true : !!fireSetEvent);

		// Animation is optional.
		// Make sure the initial values were set before using animated placement.
		if ( options.animate && !isInit ) {
			addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
		}

		// First pass, without lookAhead but with lookBackward. Values are set from left to right.
		scope_HandleNumbers.forEach(function(handleNumber){
			setHandle(handleNumber, resolveToValue(values[handleNumber], handleNumber), true, false);
		});

		// Second pass. Now that all base values are set, apply constraints
		scope_HandleNumbers.forEach(function(handleNumber){
			setHandle(handleNumber, scope_Locations[handleNumber], true, true);
		});

		setZindex();

		scope_HandleNumbers.forEach(function(handleNumber){

			fireEvent('update', handleNumber);

			// Fire the event only for handles that received a new value, as per #579
			if ( values[handleNumber] !== null && fireSetEvent ) {
				fireEvent('set', handleNumber);
			}
		});
	}

	// Reset slider to initial values
	function valueReset ( fireSetEvent ) {
		valueSet(options.start, fireSetEvent);
	}

	// Get the slider value.
	function valueGet ( ) {

		var values = scope_Values.map(options.format.to);

		// If only one handle is used, return a single value.
		if ( values.length === 1 ){
			return values[0];
		}

		return values;
	}

	// Removes classes from the root and empties it.
	function destroy ( ) {

		for ( var key in options.cssClasses ) {
			if ( !options.cssClasses.hasOwnProperty(key) ) { continue; }
			removeClass(scope_Target, options.cssClasses[key]);
		}

		while (scope_Target.firstChild) {
			scope_Target.removeChild(scope_Target.firstChild);
		}

		delete scope_Target.noUiSlider;
	}

	// Get the current step size for the slider.
	function getCurrentStep ( ) {

		// Check all locations, map them to their stepping point.
		// Get the step point, then find it in the input list.
		return scope_Locations.map(function( location, index ){

			var nearbySteps = scope_Spectrum.getNearbySteps( location );
			var value = scope_Values[index];
			var increment = nearbySteps.thisStep.step;
			var decrement = null;

			// If the next value in this step moves into the next step,
			// the increment is the start of the next step - the current value
			if ( increment !== false ) {
				if ( value + increment > nearbySteps.stepAfter.startValue ) {
					increment = nearbySteps.stepAfter.startValue - value;
				}
			}


			// If the value is beyond the starting point
			if ( value > nearbySteps.thisStep.startValue ) {
				decrement = nearbySteps.thisStep.step;
			}

			else if ( nearbySteps.stepBefore.step === false ) {
				decrement = false;
			}

			// If a handle is at the start of a step, it always steps back into the previous step first
			else {
				decrement = value - nearbySteps.stepBefore.highestStep;
			}


			// Now, if at the slider edges, there is not in/decrement
			if ( location === 100 ) {
				increment = null;
			}

			else if ( location === 0 ) {
				decrement = null;
			}

			// As per #391, the comparison for the decrement step can have some rounding issues.
			var stepDecimals = scope_Spectrum.countStepDecimals();

			// Round per #391
			if ( increment !== null && increment !== false ) {
				increment = Number(increment.toFixed(stepDecimals));
			}

			if ( decrement !== null && decrement !== false ) {
				decrement = Number(decrement.toFixed(stepDecimals));
			}

			return [decrement, increment];
		});
	}

	// Updateable: margin, limit, padding, step, range, animate, snap
	function updateOptions ( optionsToUpdate, fireSetEvent ) {

		// Spectrum is created using the range, snap, direction and step options.
		// 'snap' and 'step' can be updated.
		// If 'snap' and 'step' are not passed, they should remain unchanged.
		var v = valueGet();

		var updateAble = ['margin', 'limit', 'padding', 'range', 'animate', 'snap', 'step', 'format'];

		// Only change options that we're actually passed to update.
		updateAble.forEach(function(name){
			if ( optionsToUpdate[name] !== undefined ) {
				originalOptions[name] = optionsToUpdate[name];
			}
		});

		var newOptions = testOptions(originalOptions);

		// Load new options into the slider state
		updateAble.forEach(function(name){
			if ( optionsToUpdate[name] !== undefined ) {
				options[name] = newOptions[name];
			}
		});

		scope_Spectrum = newOptions.spectrum;

		// Limit, margin and padding depend on the spectrum but are stored outside of it. (#677)
		options.margin = newOptions.margin;
		options.limit = newOptions.limit;
		options.padding = newOptions.padding;

		// Update pips, removes existing.
		if ( options.pips ) {
			pips(options.pips);
		}

		// Invalidate the current positioning so valueSet forces an update.
		scope_Locations = [];
		valueSet(optionsToUpdate.start || v, fireSetEvent);
	}

/*! In this file: Calls to functions. All other scope_ files define functions only; */

	// Create the base element, initialize HTML and set classes.
	// Add handles and connect elements.
	addSlider(scope_Target);
	addElements(options.connect, scope_Base);

	// Attach user events.
	bindSliderEvents(options.events);

	// Use the public value method to set the start values.
	valueSet(options.start);

	scope_Self = {
		destroy: destroy,
		steps: getCurrentStep,
		on: bindEvent,
		off: removeEvent,
		get: valueGet,
		set: valueSet,
		reset: valueReset,
		// Exposed for unit testing, don't use this in your application.
		__moveHandles: function(a, b, c) { moveHandles(a, b, scope_Locations, c); },
		options: originalOptions, // Issue #600, #678
		updateOptions: updateOptions,
		target: scope_Target, // Issue #597
		removePips: removePips,
		pips: pips // Issue #594
	};

	if ( options.pips ) {
		pips(options.pips);
	}

	if ( options.tooltips ) {
		tooltips();
	}

	aria();

	return scope_Self;

}


	// Run the standard initializer
	function initialize ( target, originalOptions ) {

		if ( !target || !target.nodeName ) {
			throw new Error("noUiSlider (" + VERSION + "): create requires a single element, got: " + target);
		}

		// Throw an error if the slider was already initialized.
		if ( target.noUiSlider ) {
			throw new Error("noUiSlider (" + VERSION + "): Slider was already initialized.");
		}

		// Test the options and create the slider environment;
		var options = testOptions( originalOptions, target );
		var api = scope( target, options, originalOptions );

		target.noUiSlider = api;

		return api;
	}

	// Use an object instead of a function for future expandability;
	return {
		version: VERSION,
		create: initialize
	};

}));

/***/ }),

/***/ "../../../../webpack/buildin/amd-define.js":
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),

/***/ "../../../../webpack/buildin/amd-options.js":
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ })

});
//# sourceMappingURL=1.chunk.js.map