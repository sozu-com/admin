(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["legal-entity-legal-entity-module"],{

/***/ "./src/app/layout/legal-entity/add-legal-entity/add-legal-entity.component.css":
/*!*************************************************************************************!*\
  !*** ./src/app/layout/legal-entity/add-legal-entity/add-legal-entity.component.css ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".form-group-2 select{\n    padding-left: 10px;\n}\n.have_dev_panel_access{\n    width: 25px;\n    height: 25px;\n}\n.marginR10 {\n    margin-right: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L2xlZ2FsLWVudGl0eS9hZGQtbGVnYWwtZW50aXR5L2FkZC1sZWdhbC1lbnRpdHkuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLG1CQUFtQjtDQUN0QjtBQUNEO0lBQ0ksWUFBWTtJQUNaLGFBQWE7Q0FDaEI7QUFDRDtJQUNJLG1CQUFtQjtDQUN0QiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9sZWdhbC1lbnRpdHkvYWRkLWxlZ2FsLWVudGl0eS9hZGQtbGVnYWwtZW50aXR5LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZm9ybS1ncm91cC0yIHNlbGVjdHtcbiAgICBwYWRkaW5nLWxlZnQ6IDEwcHg7XG59XG4uaGF2ZV9kZXZfcGFuZWxfYWNjZXNze1xuICAgIHdpZHRoOiAyNXB4O1xuICAgIGhlaWdodDogMjVweDtcbn1cbi5tYXJnaW5SMTAge1xuICAgIG1hcmdpbi1yaWdodDogMTBweDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/layout/legal-entity/add-legal-entity/add-legal-entity.component.html":
/*!**************************************************************************************!*\
  !*** ./src/app/layout/legal-entity/add-legal-entity/add-legal-entity.component.html ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-12\">\n      <div class=\"title-group\">\n        <h5>{{model.id ? ('addLegalEntity.editEntity' | translate) : ('addLegalEntity.addEntity' | translate)}}</h5>\n        <div class=\"spacer30\"></div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"white-bg padding40\">\n    <div class=\"row\">\n      <form [formGroup]=\"addDataForm\" (ngSubmit)=\"add(addDataForm.value)\">\n        <div class=\"col-xl-12 col-lg-12 col-md-12 col-12\">\n          <div class=\"row\">\n\n            <div class=\"col-6\">\n              <div class=\"form-group-2\">\n                <h5>Legal Entity Information</h5>\n              </div>\n            </div>\n            <div class=\"col-6\">\n              <div class=\"btn-cont text-right\">\n                <button *ngIf=\"!model?.id\" type=\"submit\" (click)=\"setValue(1)\" [disabled]=\"!addDataForm.valid\"\n                  class=\"btn btn-primary marginR10\">{{'addForm.addSendMail' | translate}}</button>\n                <button *ngIf=\"model?.id\" type=\"submit\" (click)=\"setValue(1)\"\n                  class=\"btn btn-primary marginR10\">{{'addForm.editSendMail' | translate}}</button>\n                <button *ngIf=\"!model.id\" type=\"submit\" (click)=\"setValue(0)\" [disabled]=\"!addDataForm.valid\"\n                  class=\"btn btn-primary\">{{'addForm.addBtn' | translate}}</button>\n                <button *ngIf=\"model?.id\" type=\"submit\" (click)=\"setValue(0)\"\n                  class=\"btn btn-primary\">{{'addForm.updateBtn' | translate}}</button>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"spacer40\"></div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>Commercial Name<span class=\"color-red\">*</span></label>\n                <input autocomplete=\"off\" minlength=\"1\" maxlength=\"30\" [pattern]=\"constant.onlyWhiteSpaces\" required\n                  type=\"text\" class=\"form-control\" formControlName=\"comm_name\" name=\"comm_name\">\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>Legal Name <span class=\"color-red\">*</span></label>\n                <input autocomplete=\"off\" minlength=\"1\" maxlength=\"50\" [pattern]=\"constant.onlyWhiteSpaces\" required\n                  type=\"text\" class=\"form-control\" formControlName=\"legal_name\" name=\"legal_name\">\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.emailId' | translate}} <span class=\"color-red\">*</span></label>\n                <input (keydown.space)=\"$event.preventDefault();\" autocomplete=\"off\" required\n                  [pattern]=\"constant.emailPattern\" type=\"email\" class=\"form-control\" formControlName=\"email\"\n                  name=\"email\">\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.contactNumber' | translate}} <span class=\"color-red\">*</span></label>\n                <input minlength=\"8\" maxlength=\"15\" autocomplete=\"off\" type=\"text\" [pattern]=\"constant.phonePattern\"\n                  class=\"form-control\" id=\"phone\" required formControlName=\"phone\" name=\"phone\" ng2TelInput\n                  [ng2TelInputOptions]=\"initialCountry\" (countryChange)=\"onCountryChange($event)\" />\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.description' | translate}}\n                </label>\n                <textarea autocomplete=\"off\" rows=\"3\" class=\"form-control\" name=\"description\"\n                  formControlName=\"description\"></textarea>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.address' | translate}}\n                </label>\n                <!-- <input placeholder=\"{{'addForm.placeholder.searchForAddress' | translate}}\" \n                      autocorrect=\"off\" type=\"text\"\n                      class=\"form-control\" name=\"address\" formControlName=\"address\"> -->\n                <input placeholder=\"{{'addForm.placeholder.searchForAddress' | translate}}\" autocorrect=\"off\"\n                  autocapitalize=\"off\" spellcheck=\"off\" type=\"text\" class=\"form-control\" #search\n                  (input)=\"loadPlaces('address', 'lat', 'lng', 'searchElementRef')\" name=\"address\"\n                  formControlName=\"address\" autocomplete=\"off\">\n\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.locationPinOnMap' | translate}}\n                </label>\n                <agm-map class=\"height200\" [scrollwheel]=\"false\" [latitude]=\"model.lat\" [longitude]=\"model.lng\"\n                  (mapClick)=\"placeMarker($event, 'address', 'lat', 'lng')\" [zoom]=\"constant.zoom\">\n                  <agm-marker [latitude]=\"model.lat\" [longitude]=\"model.lng\"></agm-marker>\n                </agm-map>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addCollection.fedralTaxPayerRegistry' | translate}}\n                </label>\n                <input autocomplete=\"off\" minlength=\"12\" maxlength=\"13\" [pattern]=\"constant.onlyWhiteSpaces\" type=\"text\"\n                  class=\"form-control\" formControlName=\"fed_tax_pay\" name=\"fed_tax_pay\">\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.developerName' | translate}}</label>\n                <select name=\"developer_id\" class=\"form-control\" formControlName=\"developer_id\">\n                  <option value=\"\">{{'addForm.selectDeveloper' | translate}}</option>\n                  <option *ngFor=\"let d of all_developers\" value=\"{{d.id}}\">{{d.name}}</option>\n                </select>\n              </div>\n            </div>\n\n            <div class=\"col-12\">\n              <label>{{'addCollection.bankAccount' | translate}}\n                <span class=\"pull-right\"><a class=\"add\" (click)=\"addLegalEntityBank($event)\"\n                    href=\"javascript://\">{{'addCollection.addNewBankAccount' | translate}}</a></span>\n              </label>\n              <div formArrayName=\"legal_entity_banks\">\n                <ng-container *ngFor=\"let lebanks of addDataForm.get('legal_entity_banks')['controls']; let i=index\">\n\n                  <div class=\"row\" [formGroupName]=\"i\">\n                    <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n                      <div class=\"form-group-3\">\n                        <label>{{'addCollection.bankName' | translate}}</label>\n                        <div class=\"clearfix\"></div>\n                        <input required autocomplete=\"off\" minlength=\"1\" maxlength=\"30\" class=\"form-control\" type=\"text\"\n                          name=\"bank_name\" formControlName=\"bank_name\">\n                      </div>\n                    </div>\n                    <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n                      <div class=\"form-group-3\">\n                        <label>{{'addCollection.accountNumber' | translate}}</label>\n                        <div class=\"clearfix\"></div>\n                        <input required autocomplete=\"off\" class=\"form-control\" type=\"text\" minlength=\"9\" maxlength=\"20\"\n                          [pattern]=\"constant.accountPattern\" name=\"account_number\" formControlName=\"account_number\">\n                      </div>\n                    </div>\n                    <div class=\"col-lg-2 col-md-6 col-sm-6 col-12\">\n                      <div class=\"form-group-3\">\n                        <label>{{'addCollection.clabeSwift' | translate}}</label>\n                        <div class=\"clearfix\"></div>\n                        <input required autocomplete=\"off\" class=\"form-control\" type=\"text\" name=\"swift\"\n                          formControlName=\"swift\">\n                      </div>\n                    </div>\n                    <div class=\"col-lg-2 col-md-6 col-sm-6 col-12\">\n                      <div class=\"form-group-3\">\n                        <label>{{'addCollection.currency' | translate}}</label>\n                        <div class=\"clearfix\"></div>\n                        <select required name=\"currency_id\" class=\"form-control\" formControlName=\"currency_id\">\n                          <option value=\"\">{{'addCollection.currency' | translate}}</option>\n                          <option value=\"{{c.id}}\" *ngFor=\"let c of currencies\">{{ c?.code }} | {{c?.currency}}</option>\n                        </select>\n                      </div>\n                    </div>\n                    <div class=\"col-lg-2 col-md-6 col-sm-6 col-12\">\n                      <div class=\"form-group-3\">\n                        <label>{{'addCollection.remove' | translate}}</label>\n                        <div class=\"clearfix\"></div>\n                        <button type=\"button\"\n                          (click)=\"removeLegalEntityBank($event, i, lebanks)\">{{'addCollection.remove' |\n                          translate}}</button>\n                      </div>\n                    </div>\n                  </div>\n                </ng-container>\n              </div>\n\n            </div>\n          </div>\n\n          <div class=\"row\" formGroupName=\"legal_rep\">\n            <div class=\"col-12\">\n              <div class=\"spacer40\"></div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <h5>{{'addCollection.legalRepresentativeInfo' | translate}}</h5>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.names' | translate}}\n                </label>\n                <input autocomplete=\"off\" minlength=\"1\" maxlength=\"50\" [pattern]=\"constant.onlyWhiteSpaces\" type=\"text\"\n                  class=\"form-control\" formControlName=\"name\" name=\"name1\">\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.firstSurname' | translate}}\n                </label>\n                <input autocomplete=\"off\" minlength=\"1\" maxlength=\"30\" [pattern]=\"constant.onlyWhiteSpaces\" type=\"text\"\n                  class=\"form-control\" formControlName=\"first_surname\" name=\"first_surname\">\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.secondSurname' | translate}}\n                </label>\n                <input autocomplete=\"off\" minlength=\"1\" maxlength=\"30\" [pattern]=\"constant.onlyWhiteSpaces\" type=\"text\"\n                  class=\"form-control\" formControlName=\"second_surname\" name=\"second_surname\">\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.contactNumber' | translate}}\n                </label>\n                <input minlength=\"8\" maxlength=\"15\" autocomplete=\"off\" type=\"text\" [pattern]=\"constant.phonePattern\"\n                  class=\"form-control\" id=\"phone1\" formControlName=\"phone\" name=\"phone1\" ng2TelInput\n                  [ng2TelInputOptions]=\"initialCountry\" (countryChange)=\"onCountryChange($event)\" />\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.emailId' | translate}}\n                </label>\n                <input (keydown.space)=\"$event.preventDefault();\" autocomplete=\"off\" [pattern]=\"constant.emailPattern\"\n                  type=\"email\" class=\"form-control\" formControlName=\"email\" name=\"email1\">\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addCollection.fedralTaxPayerRegistry' | translate}}\n                </label>\n                <input autocomplete=\"off\" minlength=\"12\" maxlength=\"13\" [pattern]=\"constant.onlyWhiteSpaces\" type=\"text\"\n                  class=\"form-control\" formControlName=\"fed_tax_pay\" name=\"fed_tax_pay1\">\n              </div>\n            </div>\n\n            <div class=\"col-12\">\n              <div class=\"form-group-2 row\">\n                <label class=\"col-4\">{{'addForm.pleaseProvideAccessToSystem' | translate}}</label>\n                <input type=\"checkbox\" class=\"col-6 form-control have_dev_panel_access\"\n                  formControlName=\"have_dev_panel_access\" name=\"have_dev_panel_access\">\n              </div>\n            </div>\n\n            <div class=\"col-12\">\n              <div class=\"form-group-2 row\">\n                <label class=\"col-4\">{{'addForm.typeOfService' | translate}}</label>\n                <div class=\"col-1\">\n                  <div class=\"clearfix\"></div>\n                  <label class=\"cust-radio\">\n                    <input class=\"form-control\" type=\"radio\" (change)=\"setSaleComm(1)\"\n                      formControlName=\"sales_commission\" value=\"1\"\n                      [checked]=\"model.legal_rep.sales_commission == 1 ? 'checked' :''\" name=\"sales_commission\">\n                    <span class=\"checkmark\">{{'addForm.Sale' | translate}}</span>\n                  </label>\n                </div>\n                <div class=\"col-4\">\n                  <label class=\"cust-radio\">\n                    <input class=\"form-control\" type=\"radio\" (change)=\"setSaleComm(2)\"\n                      formControlName=\"sales_commission\" value=\"2\"\n                      [checked]=\"model.legal_rep.sales_commission == 2 ? 'checked' :''\" name=\"sales_commission\">\n                    <span class=\"checkmark\">{{'addForm.SaleCommission' | translate}}</span>\n                  </label>\n                  <div class=\"clearfix\"></div>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"col-12\">\n              <div class=\"form-group-2 row\" *ngIf=\"data_fetch\">\n                <label class=\"col-4\">{{'addForm.pleaseSelectProjects' | translate}}</label>\n                <div class=\"clearfix\"></div>\n                <ng-multiselect-dropdown *ngIf=\"projects.length>0\" class=\"col-3 section-section2 multi-select\"\n                  [placeholder]=\"''\" [data]=\"projects\" [(ngModel)]=\"selctedProjects\" formControlName=\"building_ids\"\n                  [settings]=\"multiDropdownSettings\" (onSelect)=\"setProject($event, 'selctedProjects')\"\n                  (onDeSelect)=\"unsetProject($event, 'selctedProjects')\" (onSelectAll)=\"onSelectAll($event)\">\n                </ng-multiselect-dropdown>\n                <div class=\"clearfix\"></div>\n              </div>\n            </div>\n\n            <div class=\"col-12\">\n              <label>{{'addCollection.bankAccount' | translate}}\n                <span class=\"pull-right\"><a class=\"add\" (click)=\"addLegalRepBank($event)\"\n                    href=\"javascript://\">{{'addCollection.addNewBankAccount' | translate}}</a></span>\n              </label>\n              <div formArrayName=\"legal_rep_banks\">\n                <ng-container\n                  *ngFor=\"let lrepbanks of addDataForm.get('legal_rep').get('legal_rep_banks')['controls']; let i=index\">\n\n                  <div class=\"row\" [formGroupName]=\"i\">\n                    <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n                      <div class=\"form-group-3\">\n                        <label>{{'addCollection.bankName' | translate}}</label>\n                        <div class=\"clearfix\"></div>\n                        <input required autocomplete=\"off\" minlength=\"1\" maxlength=\"30\" class=\"form-control\" type=\"text\"\n                          name=\"bank_name\" formControlName=\"bank_name\">\n                      </div>\n                    </div>\n                    <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n                      <div class=\"form-group-3\">\n                        <label>{{'addCollection.accountNumber' | translate}}</label>\n                        <div class=\"clearfix\"></div>\n                        <input required autocomplete=\"off\" class=\"form-control\" type=\"text\" minlength=\"9\" maxlength=\"20\"\n                          [pattern]=\"constant.accountPattern\" name=\"account_number\" formControlName=\"account_number\">\n                      </div>\n                    </div>\n                    <div class=\"col-lg-2 col-md-6 col-sm-6 col-12\">\n                      <div class=\"form-group-3\">\n                        <label>{{'addCollection.clabeSwift' | translate}}</label>\n                        <div class=\"clearfix\"></div>\n                        <input required autocomplete=\"off\" class=\"form-control\" type=\"text\" name=\"swift\"\n                          formControlName=\"swift\">\n                      </div>\n                    </div>\n                    <div class=\"col-lg-2 col-md-6 col-sm-6 col-12\">\n                      <div class=\"form-group-3\">\n                        <label>{{'addCollection.currency' | translate}}</label>\n                        <div class=\"clearfix\"></div>\n                        <select required name=\"currency_id\" class=\"form-control\" formControlName=\"currency_id\">\n                          <option value=\"\">{{'addCollection.currency' | translate}}</option>\n                          <option value=\"{{c.id}}\" *ngFor=\"let c of currencies\">{{ c?.code }} | {{c?.currency}}</option>\n                        </select>\n                      </div>\n                    </div>\n                    <div class=\"col-lg-2 col-md-6 col-sm-6 col-12\">\n                      <div class=\"form-group-3\">\n                        <label>{{'addCollection.remove' | translate}}</label>\n                        <div class=\"clearfix\"></div>\n                        <button type=\"button\" (click)=\"removeLegalRepBank($event, i)\">{{'addCollection.remove' |\n                          translate}}</button>\n                      </div>\n                    </div>\n                  </div>\n                </ng-container>\n              </div>\n            </div>\n          </div>\n        </div>\n      </form>\n      <!-- <div class=\"col-12\" *ngIf=\"selctedProjects.length > 0\">\n            <div class=\"form-group-2 row\">\n              <label class=\"col-4\">{{'addForm.pleaseSelectProjects' | translate}}</label>\n            <div class=\"clearfix\"></div>\n                  <ng-multiselect-dropdown *ngIf=\"projects?.length>0\" class=\"col-3 section-section2 multi-select\"\n                    #multiSelect\n                        [placeholder]=\"''\"\n                        [data]=\"projects\"\n                        [(ngModel)]=\"selctedProjects\"\n                        [settings]=\"multiDropdownSettings\"\n                        (onSelect)=\"setProject($event, 'selctedProjects')\"\n                        (onDeSelect)=\"unsetProject($event, 'selctedProjects')\"\n                        (onSelectAll)=\"onSelectAll($event)\">\n                  </ng-multiselect-dropdown>\n            <div class=\"clearfix\"></div>\n            </div>\n      </div> -->\n    </div>\n  </div>\n\n  <div class=\"white-bg padding40\">\n    <!-- <div class=\"row\"> -->\n    <form [formGroup]=\"this.system_dashboard_formGroup\" (ngSubmit)=\"this.addSystemDashboard()\">\n      <div class=\"col-xl-12 col-lg-12 col-md-12 col-12\">\n\n        <div class=\"row\">\n          <div class=\"col-lg-3 col-md-6 col-sm-6 col-3\">\n            <div class=\"form-group-2\">\n              <p>{{'addForm.createAccessToSystemDashboard' | translate}}</p>\n            </div>\n          </div>\n          <div class=\"col-6\">\n            <div class=\"btn-cont\">\n              <span><a class=\"add\" (click)=\"this.addSystemDashboardFormArray($event)\"\n                  href=\"javascript://\">{{'addForm.addNew' | translate}}</a></span>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"col-12\">\n          <div formArrayName=\"system_dashboard_formArray\">\n            <ng-container\n              *ngFor=\"let temp_system_dashboard_formArray of this.systemDashboardFormArray['controls']; let i=index\">\n              <div [formGroupName]=\"i\">\n                <div class=\"row\">\n                  <div class=\"col-lg-4 col-md-6 col-sm-6 col-12\">\n                    <div class=\"form-group-3\">\n                      <label>{{'addForm.names' | translate}} <span class=\"color-red\">*</span></label>\n                      <div class=\"clearfix\"></div>\n                      <input required autocomplete=\"off\" minlength=\"1\" maxlength=\"30\" class=\"form-control\" type=\"text\"\n                        name=\"name\" formControlName=\"name\">\n                    </div>\n                  </div>\n                  <div class=\"col-lg-4 col-md-6 col-sm-6 col-12\">\n                    <div class=\"form-group-3\">\n                      <label>{{'addForm.firstSurname' | translate}} <span class=\"color-red\">*</span></label>\n                      <div class=\"clearfix\"></div>\n                      <input required autocomplete=\"off\" minlength=\"1\" maxlength=\"30\" class=\"form-control\" type=\"text\"\n                        name=\"first_surname\" formControlName=\"first_surname\">\n                    </div>\n                  </div>\n                  <div class=\"col-lg-4 col-md-6 col-sm-6 col-12\">\n                    <div class=\"form-group-3\">\n                      <label>{{'addForm.secondSurname' | translate}}</label>\n                      <div class=\"clearfix\"></div>\n                      <input required autocomplete=\"off\" minlength=\"1\" maxlength=\"30\" class=\"form-control\" type=\"text\"\n                        name=\"second_surname\" formControlName=\"second_surname\">\n                    </div>\n                  </div>\n                </div>\n                <div class=\"row\">\n\n                  <div class=\"col-lg-4 col-md-6 col-sm-6 col-12\">\n                    <div class=\"form-group-3\">\n                      <label>{{'addForm.emailId' | translate}} <span class=\"color-red\">*</span></label>\n                      <input (keydown.space)=\"$event.preventDefault();\" autocomplete=\"off\" required\n                        [pattern]=\"constant.emailPattern\" type=\"email\" class=\"form-control\" formControlName=\"email_id\"\n                        name=\"email_id\">\n                    </div>\n                  </div>\n                  <div class=\"col-lg-4 col-md-6 col-sm-6 col-12\">\n                    <div class=\"form-group-3\">\n                      <label>{{'addForm.contactNumber' | translate}} <span class=\"color-red\">*</span></label>\n                      <input minlength=\"8\" maxlength=\"15\" autocomplete=\"off\" type=\"text\"\n                        [pattern]=\"constant.phonePattern\" class=\"form-control\" id=\"phone\" required\n                        formControlName=\"contact_number\" name=\"contact_number\" ng2TelInput\n                        [ng2TelInputOptions]=\"initialCountry\" (countryChange)=\"onCountryChange($event)\" />\n                    </div>\n                  </div>\n                  <div class=\"col-lg-2 col-md-6 col-sm-6 col-12\">\n                    <div class=\"btn-cont\" style=\"margin-top: 33px;\">\n                      <button type=\"submit\" class=\"btn btn-primary marginR10\">{{'addForm.sendEmail' |\n                        translate}}</button>\n                    </div>\n                  </div>\n                  <div class=\"col-lg-2 col-md-6 col-sm-6 col-12\">\n                    <div class=\"form-group-3\" style=\"margin-top: 15px;margin-left: 150px;\">\n                      <label>{{'addCollection.remove' | translate}}</label>\n                      <div class=\"clearfix\"></div>\n                      <button type=\"button\"\n                        (click)=\"this.removeSystemDashboardFormArray($event, i)\">{{'addCollection.remove' |\n                        translate}}</button>\n                    </div>\n                  </div>\n\n                </div>\n              </div>\n\n            </ng-container>\n          </div>\n\n        </div>\n\n      </div>\n    </form>\n    <!-- </div> -->\n  </div>"

/***/ }),

/***/ "./src/app/layout/legal-entity/add-legal-entity/add-legal-entity.component.ts":
/*!************************************************************************************!*\
  !*** ./src/app/layout/legal-entity/add-legal-entity/add-legal-entity.component.ts ***!
  \************************************************************************************/
/*! exports provided: AddLegalEntityComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddLegalEntityComponent", function() { return AddLegalEntityComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _models_legalEntity_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../models/legalEntity.model */ "./src/app/models/legalEntity.model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var AddLegalEntityComponent = /** @class */ (function () {
    function AddLegalEntityComponent(constant, router, admin, mapsAPILoader, ngZone, route, spinner, translate, fb) {
        var _this = this;
        this.constant = constant;
        this.router = router;
        this.admin = admin;
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.route = route;
        this.spinner = spinner;
        this.translate = translate;
        this.fb = fb;
        this.scrollbarOptions = { axis: 'y', theme: 'dark' };
        this.parameter = {};
        this.show = false;
        this.projects = Array();
        this.selctedProjects = Array();
        this.data_fetch = false;
        this.addSystemDashboardFormArray = function ($event) {
            $event.stopPropagation();
            _this.systemDashboardFormArray.push(_this.newFormGroup());
        };
        this.newFormGroup = function () {
            return _this.fb.group({
                name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
                first_surname: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
                second_surname: [''],
                email_id: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
                contact_number: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]]
            });
        };
        this.addSystemDashboard = function () {
        };
        this.system_dashboard_formGroup = this.fb.group({
            system_dashboard_formArray: this.fb.array([])
        });
    }
    AddLegalEntityComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.iniDropDownSetting();
        this.model = new _models_legalEntity_model__WEBPACK_IMPORTED_MODULE_8__["LegalEntity"]();
        this.model.legal_rep = new _models_legalEntity_model__WEBPACK_IMPORTED_MODULE_8__["LegalRepresentative"]();
        this.model.country_code = this.constant.country_code;
        this.model.dial_code = this.constant.dial_code;
        this.model.legal_rep.country_code = this.constant.country_code;
        this.model.legal_rep.dial_code = this.constant.dial_code;
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.p = this.constant.p;
        this.initForm();
        this.getDevelopers('');
        this.initialCountry = { initialCountry: this.constant.country_code };
        this.parameter.sub = this.route.params.subscribe(function (params) {
            if (params['id'] !== '0') {
                _this.model.id = params['id'];
                _this.getLegalEntityAllProjects(_this.model.id);
            }
            else {
                _this.model.id = '';
            }
        });
        this.getCurrencies();
    };
    AddLegalEntityComponent.prototype.iniDropDownSetting = function () {
        this.multiDropdownSettings = {
            singleSelection: false,
            idField: 'id',
            textField: 'name',
            selectAllText: this.translate.instant('commonBlock.selectAll'),
            unSelectAllText: this.translate.instant('commonBlock.unselectAll'),
            searchPlaceholderText: this.translate.instant('commonBlock.search'),
            allowSearchFilter: true,
            itemsShowLimit: 2
        };
    };
    AddLegalEntityComponent.prototype.initForm = function () {
        this.addDataForm = this.fb.group({
            id: [''],
            comm_name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            legal_name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            phone: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            country_code: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            dial_code: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            address: [''],
            description: [''],
            lat: [''],
            lng: [''],
            // mapvalue: [''],
            fed_tax_pay: [''],
            legal_entity_banks: this.fb.array([]),
            developer_id: [''],
            legal_rep: this.fb.group({
                id: [''],
                name: [''],
                first_surname: [''],
                second_surname: [''],
                phone: [''],
                country_code: [''],
                dial_code: [''],
                email: [''],
                have_dev_panel_access: [''],
                // fed_tax_pay: ['', [Validators.required]],
                fed_tax_pay: [''],
                legal_rep_banks: this.fb.array([]),
                building_ids: [''],
                sales_commission: ['']
            })
        });
        var countryDialCode = {
            country_code: this.model.country_code,
            dial_code: this.model.dial_code
        };
        this.addDataForm.controls.country_code.patchValue(this.model.country_code);
        this.addDataForm.controls.dial_code.patchValue(this.model.dial_code);
        this.addDataForm.patchValue({ legal_rep: countryDialCode });
        this.setCurrentPosition();
    };
    AddLegalEntityComponent.prototype.getDevelopers = function (name) {
        var _this = this;
        this.spinner.show();
        this.admin.postDataApi('getUnblockedDevelopers', { name: name }).subscribe(function (r) {
            _this.spinner.hide();
            _this.all_developers = r.data;
        });
    };
    AddLegalEntityComponent.prototype.getCurrencies = function () {
        var _this = this;
        this.admin.postDataApi('getCurrencies', {})
            .subscribe(function (success) {
            _this.currencies = success.data;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    AddLegalEntityComponent.prototype.addLegalEntityBank = function ($event) {
        $event.stopPropagation();
        this.legalEntityBanks.push(this.newBanks());
    };
    Object.defineProperty(AddLegalEntityComponent.prototype, "legalEntityBanks", {
        get: function () {
            return this.addDataForm.get('legal_entity_banks');
        },
        enumerable: true,
        configurable: true
    });
    AddLegalEntityComponent.prototype.removeLegalEntityBank = function ($event, i, item) {
        var _this = this;
        console.log(item);
        $event.stopPropagation();
        this.legalEntityBanks.removeAt(i);
        if (item && item.value.id) {
            this.admin.postDataApi('deleteLegalEntityBank', { id: item.value.id }).subscribe(function (success) {
                _this.spinner.hide();
            }, function (error) {
                _this.spinner.hide();
            });
        }
    };
    AddLegalEntityComponent.prototype.addLegalRepBank = function ($event) {
        $event.stopPropagation();
        this.legalRepBanks.push(this.newBanks());
    };
    Object.defineProperty(AddLegalEntityComponent.prototype, "legalRepBanks", {
        get: function () {
            var legalRep = this.addDataForm.get('legal_rep');
            return legalRep.get('legal_rep_banks');
        },
        enumerable: true,
        configurable: true
    });
    AddLegalEntityComponent.prototype.removeLegalRepBank = function ($event, i) {
        $event.stopPropagation();
        this.legalRepBanks.removeAt(i);
    };
    AddLegalEntityComponent.prototype.newBanks = function () {
        return this.fb.group({
            bank_name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            account_number: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            swift: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            currency_id: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]]
        });
    };
    AddLegalEntityComponent.prototype.getLegalEntityAllProjects = function (id) {
        var _this = this;
        this.spinner.show();
        this.admin.postDataApi('getLegalEntityAllProjects', { 'legal_entity_id': id })
            .subscribe(function (success) {
            _this.projects = success['data'];
            _this.getLegalEntityById(_this.model.id);
        }, function (error) {
            _this.spinner.hide();
        });
    };
    AddLegalEntityComponent.prototype.setProject = function (item) {
        this.selctedProjects.push(item);
    };
    AddLegalEntityComponent.prototype.unsetProject = function (item) {
        var _this = this;
        var i = 0;
        this.selctedProjects.map(function (r) {
            if (r.id == item.id) {
                _this.selctedProjects.splice(i, 1);
            }
            i = i + 1;
        });
    };
    AddLegalEntityComponent.prototype.onSelectAll = function (obj) {
    };
    AddLegalEntityComponent.prototype.getLegalEntityById = function (id) {
        var _this = this;
        var self = this;
        this.data_fetch = false;
        this.spinner.show();
        this.admin.postDataApi('getLegalEntityById', { id: id })
            .subscribe(function (success) {
            _this.spinner.hide();
            // this.model = success.data;
            if (success.data.legal_reps && success.data.legal_reps.legal_rep_buildings) {
                var _loop_1 = function (index) {
                    var element = success.data.legal_reps.legal_rep_buildings[index];
                    var d = _this.projects.filter(function (r) { return r.id == element.building_id; });
                    var projectIndex = self.selctedProjects.find(function (item) { return item.id == d[0].id; });
                    if (!projectIndex) {
                        self.selctedProjects.push({ id: d[0].id, name: d[0].name });
                    }
                };
                for (var index = 0; index < success.data.legal_reps.legal_rep_buildings.length; index++) {
                    _loop_1(index);
                }
            }
            _this.patchForm(success.data);
            self.data_fetch = true;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    AddLegalEntityComponent.prototype.patchForm = function (data) {
        var _this = this;
        this.addDataForm.patchValue(data);
        if (data.lat && data.lng) {
            this.model.lat = data.lat;
            this.model.lng = data.lng;
        }
        var control = this.addDataForm.get('legal_entity_banks');
        if (data.legal_entity_banks) {
            data.legal_entity_banks.forEach(function (x) {
                control.push(_this.fb.group(x));
            });
        }
        this.addDataForm.patchValue({ legal_rep: data.legal_reps });
        if (data.legal_reps) {
            this.model.legal_rep.sales_commission = data.legal_reps.sales_commission;
        }
        var repBanks = this.addDataForm.get('legal_rep').get('legal_rep_banks');
        if (data.legal_reps && data.legal_reps.legal_rep_banks) {
            data.legal_reps.legal_rep_banks.forEach(function (x) {
                repBanks.push(_this.fb.group(x));
            });
        }
    };
    AddLegalEntityComponent.prototype.setSaleComm = function (sales_commission) {
        this.model.legal_rep.sales_commission = sales_commission;
    };
    AddLegalEntityComponent.prototype.set = function () {
        this.show = true;
    };
    AddLegalEntityComponent.prototype.onCountryChange = function (e) {
        this.model.country_code = e.iso2;
        this.model.dial_code = '+' + e.dialCode;
        this.initialCountry = { initialCountry: e.iso2 };
    };
    AddLegalEntityComponent.prototype.add = function (formData) {
        var _this = this;
        formData['country_code'] = this.model.country_code;
        formData['dial_code'] = this.model.dial_code;
        formData['legal_rep']['country_code'] = this.model.country_code;
        formData['legal_rep']['dial_code'] = this.model.dial_code;
        formData['legal_rep']['have_dev_panel_access'] = formData['legal_rep']['have_dev_panel_access'] ? 1 : 0;
        formData['send_mail'] = this.model.send_mail ? this.model.send_mail : 0;
        if (this.model.id) {
            formData['id'] = this.model.id;
        }
        if (this.model.lat && this.model.lng) {
            formData['lat'] = this.model.lat;
            formData['lng'] = this.model.lng;
            formData['address'] = this.model.address;
        }
        if (formData['legal_rep'].name || formData['legal_rep'].first_surname || formData['legal_rep'].phone
            || formData['legal_rep'].email) {
            // if any of key present, then all must be entered
            if (!formData['legal_rep'].name) {
                swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterLegalRepresentativeName'), 'error');
                return;
            }
            if (!formData['legal_rep'].first_surname) {
                swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterLegalRepresentativeFirstName'), 'error');
                return;
            }
            if (!formData['legal_rep'].phone) {
                swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterLegalRepresentativePhone'), 'error');
                return;
            }
            if (!formData['legal_rep'].email) {
                swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterLegalRepresentativeEmail'), 'error');
                return;
            }
            // if (!formData['legal_rep'].fed_tax_pay) {
            //   swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterLegalRepresentativeFTPR'), 'error');
            //   return;
            // }
        }
        if (!formData['legal_rep'].name || !formData['legal_rep'].first_surname || !formData['legal_rep'].phone
            || !formData['legal_rep'].email) {
            delete formData['legal_rep'];
        }
        if (formData['legal_entity_banks'] && formData['legal_entity_banks'].length > 0) {
            var i = 0;
            for (var index = 0; index < formData['legal_entity_banks'].length; index++) {
                var element = formData['legal_entity_banks'][index];
                if (!element.bank_name || !element.account_number || !element.swift || !element.currency_id) {
                    i = i + 1;
                    swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterBankDetails'), 'error');
                    return;
                }
            }
        }
        if (formData['legal_rep'] && formData['legal_rep']['legal_rep_banks'] && formData['legal_rep']['legal_rep_banks'].length > 0) {
            var i = 0;
            for (var index = 0; index < formData['legal_rep']['legal_rep_banks'].length; index++) {
                var element = formData['legal_rep']['legal_rep_banks'][index];
                if (!element.bank_name || !element.account_number || !element.swift || !element.currency_id) {
                    i = i + 1;
                    swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterBankDetails'), 'error');
                    return;
                }
            }
        }
        if (formData['legal_rep'] && this.selctedProjects && this.selctedProjects.length > 0) {
            var d = this.selctedProjects.map(function (o) { return o.id; });
            formData['legal_rep']['building_ids'] = d;
        }
        this.spinner.show();
        this.admin.postDataApi('addLegalEntity', formData)
            .subscribe(function (success) {
            _this.spinner.hide();
            if (success.success === '0') {
                swal(_this.translate.instant('swal.error'), success.message, 'error');
                return;
            }
            else {
                var text = _this.model.id === '' ?
                    _this.translate.instant('message.success.addedSuccessfully') :
                    _this.translate.instant('message.success.updatedSuccessfully');
                swal(_this.translate.instant('swal.success'), text, 'success');
                _this.router.navigate(['/dashboard/legal-entities/view-all']);
                // if (this.model.id === '') {
                //   formData.reset();
                // }
            }
        }, function (error) {
            _this.spinner.hide();
        });
    };
    AddLegalEntityComponent.prototype.loadPlaces = function (paramAdd, paramLat, paramLng, searchRef) {
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
    AddLegalEntityComponent.prototype.setCurrentPosition = function () {
        var _this = this;
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                // setting address lat lng
                _this.model.lat = _this.model.lat ? _this.model.lat : position.coords.latitude;
                _this.model.lng = _this.model.lng ? _this.model.lng : position.coords.longitude;
            });
        }
    };
    AddLegalEntityComponent.prototype.placeMarker = function ($event, addParam, paramLat, paramLng) {
        this.model[paramLat] = $event.coords.lat;
        this.model[paramLng] = $event.coords.lng;
        this.getGeoLocation(addParam, this.model[paramLat], this.model[paramLng]);
    };
    AddLegalEntityComponent.prototype.getGeoLocation = function (addParam, lat, lng) {
        var _this = this;
        if (navigator.geolocation) {
            var geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(lat, lng);
            var request = { latLng: latlng };
            geocoder.geocode(request, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    var result = results[0];
                    if (result != null) {
                        _this.model[addParam] = result.formatted_address;
                    }
                    else {
                        _this.model[addParam] = lat + ',' + lng;
                    }
                }
            });
        }
    };
    AddLegalEntityComponent.prototype.setValue = function (send_mail) {
        this.model.send_mail = send_mail;
    };
    Object.defineProperty(AddLegalEntityComponent.prototype, "systemDashboardFormArray", {
        get: function () {
            return this.system_dashboard_formGroup.get('system_dashboard_formArray');
        },
        enumerable: true,
        configurable: true
    });
    AddLegalEntityComponent.prototype.removeSystemDashboardFormArray = function ($event, i, item) {
        console.log(item);
        $event.stopPropagation();
        this.systemDashboardFormArray.removeAt(i);
        // if (item && item.value.id) {
        //   this.admin.postDataApi('deleteLegalEntityBank', { id: item.value.id }).subscribe(success => {
        //     this.spinner.hide();
        //   }, error => {
        //     this.spinner.hide();
        //   });
        // }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('mapDiv'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddLegalEntityComponent.prototype, "mapDiv", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('search'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddLegalEntityComponent.prototype, "searchElementRef", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('openDeveloperModel'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddLegalEntityComponent.prototype, "openDeveloperModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('closeDeveloperModel'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddLegalEntityComponent.prototype, "closeDeveloperModel", void 0);
    AddLegalEntityComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-add-legal-entity',
            template: __webpack_require__(/*! ./add-legal-entity.component.html */ "./src/app/layout/legal-entity/add-legal-entity/add-legal-entity.component.html"),
            styles: [__webpack_require__(/*! ./add-legal-entity.component.css */ "./src/app/layout/legal-entity/add-legal-entity/add-legal-entity.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["Constant"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_6__["AdminService"],
            _agm_core__WEBPACK_IMPORTED_MODULE_3__["MapsAPILoader"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_4__["NgxSpinnerService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"]])
    ], AddLegalEntityComponent);
    return AddLegalEntityComponent;
}());



/***/ }),

/***/ "./src/app/layout/legal-entity/legal-entity.component.css":
/*!****************************************************************!*\
  !*** ./src/app/layout/legal-entity/legal-entity.component.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n.checkbox_size{\n    width: 25px;\n    height: 25px;\n  }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L2xlZ2FsLWVudGl0eS9sZWdhbC1lbnRpdHkuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0E7SUFDSSxZQUFZO0lBQ1osYUFBYTtHQUNkIiwiZmlsZSI6InNyYy9hcHAvbGF5b3V0L2xlZ2FsLWVudGl0eS9sZWdhbC1lbnRpdHkuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLmNoZWNrYm94X3NpemV7XG4gICAgd2lkdGg6IDI1cHg7XG4gICAgaGVpZ2h0OiAyNXB4O1xuICB9Il19 */"

/***/ }),

/***/ "./src/app/layout/legal-entity/legal-entity.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/layout/legal-entity/legal-entity.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container-fluid\">\n  <div class=\"row\">\n      <div class=\"col-md-6 col-6\">\n        <div class=\"title-group\">\n            <h5>{{'manageLegalEntity.label' | translate}}</h5>\n            <p>{{'table.pagination.showing' | translate}} {{items?.length}} {{'table.pagination.outof' | translate}} {{parameter.total}}</p>\n        </div>\n      </div>\n      <div class=\"col-md-6 col-6\">\n        <div class=\"btn-cont text-right\">\n            <a *ngIf=\"admin?.admin_acl['Manage Legal Entity']?.can_create==1\" class=\"btn btn-primary\" \n            href=\"javascript://\" routerLink=\"/dashboard/legal-entities/add-legal-entity/0\">{{'table.addNewBtn' | translate}}</a>\n        </div>\n      </div>\n  </div>\n\n  <div class=\"white-bg\">\n      <div class=\"tabel-section\">\n        <div class=\"table-responsive\">\n          <table class=\"table table-striped table-align-left\">\n            <tr>\n              <th style=\"width:15%\">\n                <div class=\"table-search\">\n                    <label>{{'manageLegalEntity.commercialName' | translate}}</label>\n                    <div class=\"searh-3\">\n                      <input type=\"text\" [(ngModel)]=\"comm_name\" (keyup.enter)=\"getLegalEntity()\" name=\"\">\n                      <button *ngIf=\"comm_name\" (click)=\"getLegalEntity()\"><i class=\"fa fa-search\"></i></button>\n                    </div>\n                </div>\n              </th>\n              <th style=\"width:15%\">\n                <div class=\"table-search\">\n                    <label>{{'manageLegalEntity.legalName' | translate}}</label>\n                    <div class=\"searh-3\">\n                      <input type=\"text\" [(ngModel)]=\"legal_name\" (keyup.enter)=\"getLegalEntity()\" name=\"\">\n                      <button *ngIf=\"legal_name\" (click)=\"getLegalEntity()\"><i class=\"fa fa-search\"></i></button>\n                    </div>\n                </div>\n              </th>\n              <th style=\"width:20%; text-align:left;\">\n                <div class=\"table-search\">\n                    <label>{{'manageLegalEntity.email' | translate}}</label>\n                    <div class=\"searh-3\">\n                      <input type=\"text\" [(ngModel)]=\"email\" (keyup.enter)=\"getLegalEntity()\">\n                      <button *ngIf=\"email\" (click)=\"getLegalEntity()\"><i class=\"fa fa-search\"></i></button>\n                    </div>\n                </div>\n              </th>\n              <th style=\"width:20%; text-align:left;\">\n                <div class=\"table-search\">\n                    <label>{{'manageLegalEntity.phone' | translate}}</label>\n                    <div class=\"searh-3\">\n                      <input type=\"text\" [(ngModel)]=\"phone\" (keyup.enter)=\"getLegalEntity()\" name=\"\">\n                      <button *ngIf=\"phone\" (click)=\"getLegalEntity()\"><i class=\"fa fa-search\"></i></button>\n                    </div>\n                </div>\n              </th>\n              <th style=\"width:15%; vertical-align: top;\">\n                  <div class=\"table-search\">\n                    <label>{{'manageLegalEntity.legalRep' | translate}}</label>\n                    <div class=\"searh-3\">\n                      <input type=\"text\" [(ngModel)]=\"legal_rep_name\" (keyup.enter)=\"getLegalEntity()\" name=\"\">\n                      <button *ngIf=\"legal_rep_name\" (click)=\"getLegalEntity()\"><i class=\"fa fa-search\"></i></button>\n                    </div>\n                  </div>\n              </th>\n              <th style=\"width:15%; vertical-align: top;\">\n                  <div class=\"table-search\">\n                    <label>{{'manageLegalEntity.developer' | translate}}</label>\n                    <div class=\"searh-3\">\n                      <input type=\"text\" [(ngModel)]=\"developer_name\" (keyup.enter)=\"getLegalEntity()\" name=\"\">\n                      <button *ngIf=\"developer_name\" (click)=\"getLegalEntity()\"><i class=\"fa fa-search\"></i></button>\n                    </div>\n                  </div>\n              </th>\n              <th style=\"width:7%; text-align:left;\">\n                <div class=\"table-search\">\n                    <label>{{'table.th.systemDashboardAccess' | translate}}</label>\n                </div>\n              </th>\n              <th style=\"width:20%\">\n                &nbsp;\n              </th>\n            </tr>\n      \n            <tr *ngFor=\"let item of items| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: parameter.total }; let i=index\">\n              <td class=\"text-left\">{{item.comm_name ? item.comm_name : ('table.tr.td.NA' | translate)}}</td>\n              <td class=\"text-left\">{{item.legal_name ? item.legal_name : ('table.tr.td.NA' | translate)}}</td>\n              <td class=\"text-left\">{{item.email ? item.email : ('table.tr.td.NA' | translate)}}</td>\n              <td class=\"text-left\" *ngIf=\"item.phone\">{{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}</td>\n              <td class=\"text-left\" *ngIf=\"!item.phone\">{{'table.tr.td.NA' | translate}}</td>\n              <td class=\"text-left\">\n                {{item?.legal_reps?.name}} {{item?.legal_reps?.first_surname || ''}} {{item?.legal_reps?.second_surname || ''}}\n              </td>\n              <td [ngClass]=\"{'green-color cursor-pointer': item?.user?.name}\" (click)=\"viewDeveloper(item)\"><span>\n                {{item?.user?.name || ('table.tr.td.NA' | translate)}}</span></td>\n              <!-- <td class=\"text-left\" routerLink=\"/dashboard/projects/view-projects/developer/{{item.id}}\">{{item?.user?.name || ('table.tr.td.NA' | translate)}}</td> -->\n              <td><input name=\"have_dev_panel_access{{i}}\" disabled class=\"form-control checkbox_size\" type=\"checkbox\" [checked]=\"item?.legal_reps?.have_dev_panel_access ? 'checked' : ''\" readonly> </td>\n              <td>\n                <div class=\"table-actions\">\n                  <button title=\"{{'table.title.editDetails' | translate}}\" [disabled]=\"admin?.admin_acl['Manage Legal Entity']?.can_update==0\" \n                    (click)=\"editUser(item)\" class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></button>\n                  <button [disabled]=\"admin?.admin_acl['Manage Legal Entity']?.can_delete==0\"\n                    (click)=\"blockUnblockPopup(i, item.id, item.is_blocked==1?0:1)\" \n                    title=\"{{item.is_blocked==1 ? ('table.title.unblock' | translate) : ('table.title.block' | translate)}}\" [ngClass]=\"{'unblock-bg':item.is_blocked==1}\"\n                    class=\"action-icon\"><img src=\"assets/img/block.png\" alt=\"img\">\n                  </button>\n                  <button [disabled]=\"admin?.admin_acl['Manage Legal Entity']?.can_purge==0\"\n                    (click)=\"deletePopup(item, i);\" class=\"action-icon\" title=\"{{'table.title.delete' | translate}}\"><img src=\"assets/img/ic_delete.png\" alt=\"img\"></button>\n                </div>\n              </td>\n            </tr>\n\n          </table>\n        </div>\n      </div>\n\n      <div class=\"center\" *ngIf=\"parameter.total == 0\">\n        <img src=\"assets/img/404-error.png\">\n      </div>\n  </div>\n  \n  <div class=\"btn-cont text-right marginT15\" *ngIf=\"parameter.total\">\n    <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n  </div>\n  \n</div>\n"

/***/ }),

/***/ "./src/app/layout/legal-entity/legal-entity.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/layout/legal-entity/legal-entity.component.ts ***!
  \***************************************************************/
/*! exports provided: LegalEntityComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LegalEntityComponent", function() { return LegalEntityComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var src_app_models_users_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/users.model */ "./src/app/models/users.model.ts");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
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







var LegalEntityComponent = /** @class */ (function () {
    function LegalEntityComponent(constant, admin, router, spinner, translate, route) {
        this.constant = constant;
        this.admin = admin;
        this.router = router;
        this.spinner = spinner;
        this.translate = translate;
        this.route = route;
        this.parameter = {};
    }
    LegalEntityComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        this.parameter.sub = this.route.params.subscribe(function (params) {
            _this.developer_name = params['developer_name'];
            _this.developer_id = params['developer_id'];
        });
        this.getLegalEntity();
    };
    LegalEntityComponent.prototype.getPage = function (page) {
        this.parameter.page = page;
        this.getLegalEntity();
    };
    LegalEntityComponent.prototype.getLegalEntity = function () {
        var _this = this;
        var input = {
            comm_name: this.comm_name,
            legal_name: this.legal_name,
            phone: this.phone,
            email: this.email,
            name: this.name,
            developer_name: this.developer_name,
            legal_rep_name: this.legal_rep_name,
            developer_id: this.developer_id,
            page: this.parameter.page
        };
        this.spinner.show();
        this.admin.postDataApi('getLegalEntity', input)
            .subscribe(function (success) {
            _this.spinner.hide();
            _this.items = success.data;
            _this.parameter.total = success.total_count;
            console.log(success.data, "getLegalEntity data");
        }, function (error) {
            _this.spinner.hide();
        });
    };
    LegalEntityComponent.prototype.editUser = function (item) {
        this.router.navigate(['/dashboard/legal-entities/add-legal-entity', item.id]);
    };
    LegalEntityComponent.prototype.blockUnblockPopup = function (index, id, flag) {
        var _this = this;
        this.parameter.index = index;
        this.parameter.title = this.translate.instant('message.error.areYouSure');
        switch (flag) {
            case 0:
                this.parameter.text = this.translate.instant('message.error.wantToUnblockLegalEntity');
                this.parameter.successText = this.translate.instant('message.success.unblockedSuccessfully');
                break;
            case 1:
                this.parameter.text = this.translate.instant('message.error.wantToBlockLegalEntity');
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
                _this.blockAdmin(index, id, flag);
            }
        });
    };
    LegalEntityComponent.prototype.blockAdmin = function (index, id, flag) {
        var _this = this;
        this.parameter.index = index;
        this.parameter.url = flag == 1 ? 'blockLegalEntity' : 'unblockLegalEntity';
        this.admin.postDataApi(this.parameter.url, { id: id })
            .subscribe(function (success) {
            swal(_this.translate.instant('swal.success'), _this.parameter.successText, 'success');
            _this.items[_this.parameter.index]['is_blocked'] = flag;
        });
    };
    LegalEntityComponent.prototype.deletePopup = function (item, index) {
        var _this = this;
        this.parameter.title = this.translate.instant('message.error.areYouSure');
        this.parameter.text = this.translate.instant('message.error.wantToDeleteLegalEntity');
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
    LegalEntityComponent.prototype.deleteData = function (item, index) {
        var _this = this;
        this.admin.postDataApi('deleteLegalEntity', { id: item.id }).subscribe(function (r) {
            _this.items.splice(index, 1);
            _this.parameter.total--;
            swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.deletedSuccessfully'), 'success');
        }, function (error) {
            swal(_this.translate.instant('swal.error'), error.error.message, 'error');
        });
    };
    LegalEntityComponent.prototype.viewDeveloper = function (item) {
        if (item.user && item.user.name) {
            this.router.navigate(['/dashboard/developers/view-all', item.user.name]);
        }
    };
    LegalEntityComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-legal-entity',
            template: __webpack_require__(/*! ./legal-entity.component.html */ "./src/app/layout/legal-entity/legal-entity.component.html"),
            styles: [__webpack_require__(/*! ./legal-entity.component.css */ "./src/app/layout/legal-entity/legal-entity.component.css")],
            providers: [src_app_models_users_model__WEBPACK_IMPORTED_MODULE_3__["Users"]]
        }),
        __metadata("design:paramtypes", [src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["Constant"], src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_5__["AdminService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_2__["NgxSpinnerService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__["TranslateService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]])
    ], LegalEntityComponent);
    return LegalEntityComponent;
}());



/***/ }),

/***/ "./src/app/layout/legal-entity/legal-entity.module.ts":
/*!************************************************************!*\
  !*** ./src/app/layout/legal-entity/legal-entity.module.ts ***!
  \************************************************************/
/*! exports provided: LegalEntityModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LegalEntityModule", function() { return LegalEntityModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ng2_tel_input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ng2-tel-input */ "./node_modules/ng2-tel-input/ng2-tel-input.js");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");
/* harmony import */ var ng_lazyload_image__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng-lazyload-image */ "./node_modules/ng-lazyload-image/fesm5/ng-lazyload-image.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var ngx_malihu_scrollbar__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-malihu-scrollbar */ "./node_modules/ngx-malihu-scrollbar/fesm5/ngx-malihu-scrollbar.js");
/* harmony import */ var ng_multiselect_dropdown__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ng-multiselect-dropdown */ "./node_modules/ng-multiselect-dropdown/fesm5/ng-multiselect-dropdown.js");
/* harmony import */ var src_app_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/guards/acl-user.guard */ "./src/app/guards/acl-user.guard.ts");
/* harmony import */ var src_app_modules_shared_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/modules/shared.module */ "./src/app/modules/shared.module.ts");
/* harmony import */ var _legal_entity_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./legal-entity.component */ "./src/app/layout/legal-entity/legal-entity.component.ts");
/* harmony import */ var _add_legal_entity_add_legal_entity_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./add-legal-entity/add-legal-entity.component */ "./src/app/layout/legal-entity/add-legal-entity/add-legal-entity.component.ts");
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
        path: 'view-all', component: _legal_entity_component__WEBPACK_IMPORTED_MODULE_14__["LegalEntityComponent"],
        canActivate: [src_app_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_12__["AclUserGuard"]], data: { roles: ['Manage Legal Entity', 'can_read', ''] }
    }, {
        path: 'view-all/:developer_name/:developer_id', component: _legal_entity_component__WEBPACK_IMPORTED_MODULE_14__["LegalEntityComponent"],
        canActivate: [src_app_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_12__["AclUserGuard"]], data: { roles: ['Manage Legal Entity', 'can_read', ''] }
    },
    {
        path: 'add-legal-entity/:id', component: _add_legal_entity_add_legal_entity_component__WEBPACK_IMPORTED_MODULE_15__["AddLegalEntityComponent"],
        canActivate: [src_app_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_12__["AclUserGuard"]], data: { roles: ['Manage Legal Entity', 'can_read', ''] }
    }
];
var LegalEntityModule = /** @class */ (function () {
    function LegalEntityModule() {
    }
    LegalEntityModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes),
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerModule"],
                ng_lazyload_image__WEBPACK_IMPORTED_MODULE_8__["LazyLoadImageModule"],
                _agm_core__WEBPACK_IMPORTED_MODULE_7__["AgmCoreModule"].forRoot({
                    apiKey: 'AIzaSyDykCJGMqHIwJluSmSiqKTJBVN2KauM_uQ',
                    libraries: ['drawing', 'places']
                }),
                ngx_pagination__WEBPACK_IMPORTED_MODULE_4__["NgxPaginationModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
                ng2_tel_input__WEBPACK_IMPORTED_MODULE_6__["Ng2TelInputModule"],
                src_app_modules_shared_module__WEBPACK_IMPORTED_MODULE_13__["SharedModule"],
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__["TranslateModule"],
                ngx_malihu_scrollbar__WEBPACK_IMPORTED_MODULE_10__["MalihuScrollbarModule"].forRoot(),
                ng_multiselect_dropdown__WEBPACK_IMPORTED_MODULE_11__["NgMultiSelectDropDownModule"].forRoot()
            ],
            declarations: [
                _legal_entity_component__WEBPACK_IMPORTED_MODULE_14__["LegalEntityComponent"],
                _add_legal_entity_add_legal_entity_component__WEBPACK_IMPORTED_MODULE_15__["AddLegalEntityComponent"]
            ]
        })
    ], LegalEntityModule);
    return LegalEntityModule;
}());



/***/ })

}]);
//# sourceMappingURL=legal-entity-legal-entity-module.js.map