(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["users-users-module"],{

/***/ "./src/app/layout/users/add-user/add-user.component.css":
/*!**************************************************************!*\
  !*** ./src/app/layout/users/add-user/add-user.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".form-group label {\n    color: black;\n    font-size: 13px;\n    font-weight: bold;\n}\n.white-bg {\n    background-color: #fff;\n    border-radius: 2px;\n    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);\n}\ninput[type=\"radio\"] {\n    margin: 0 1.81em 0 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L3VzZXJzL2FkZC11c2VyL2FkZC11c2VyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxhQUFhO0lBQ2IsZ0JBQWdCO0lBQ2hCLGtCQUFrQjtDQUNyQjtBQUNEO0lBQ0ksdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJQUNuQix3Q0FBd0M7Q0FDM0M7QUFDRDtJQUNJLHFCQUFxQjtDQUN4QiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC91c2Vycy9hZGQtdXNlci9hZGQtdXNlci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZvcm0tZ3JvdXAgbGFiZWwge1xuICAgIGNvbG9yOiBibGFjaztcbiAgICBmb250LXNpemU6IDEzcHg7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG4ud2hpdGUtYmcge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgIGJveC1zaGFkb3c6IDAgNHB4IDhweCAwIHJnYmEoMCwwLDAsMC4yKTtcbn1cbmlucHV0W3R5cGU9XCJyYWRpb1wiXSB7XG4gICAgbWFyZ2luOiAwIDEuODFlbSAwIDA7XG59Il19 */"

/***/ }),

/***/ "./src/app/layout/users/add-user/add-user.component.html":
/*!***************************************************************!*\
  !*** ./src/app/layout/users/add-user/add-user.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-12\">\n      <div class=\"title-group\">\n        <h5>{{model.id ? ('viewUsers.editBtn' | translate) : ('viewUsers.addBtn' | translate)}}</h5>\n        <div class=\"spacer30\"></div>\n      </div>\n    </div>\n  </div>\n\n\n  <form role=\"form\" ngNativeValidate #addForm=\"ngForm\" (ngSubmit)=\"add(addForm)\">\n\n    <div class=\"col-12\">\n      <div class=\"btn-cont text-right\">\n        <button *ngIf=\"!model?.id\" type=\"submit\" [disabled]=\"!addForm.valid\" class=\"btn btn-primary\">{{'addForm.addBtn'\n          | translate}}</button>\n        <button *ngIf=\"model?.id\" type=\"submit\" class=\"btn btn-primary\">{{'addForm.updateBtn' | translate}}</button>\n      </div>\n    </div>\n    <div class=\"col-12\">\n      <div class=\"spacer40\"></div>\n    </div>\n\n    <!-- Street Address,External Number,Internal Number,Neighborhood,Municipality,City,ZIP code,State,Address -->\n    <div class=\"white-bg padding40\">\n      <h3>{{'addForm.generalData' | translate}}</h3>\n      <div class=\"col-12\">\n        <div class=\"spacer40\"></div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-4\">\n          <div class=\"form-group-3\">\n            <label>{{'addForm.names' | translate}} <span class=\"color-red\">*</span></label>\n            <input autocomplete=\"off\" minlength=\"1\" maxlength=\"30\" [pattern]=\"constant.onlyWhiteSpaces\" required\n              type=\"text\" class=\"form-control\" [(ngModel)]=\"model.name\" name=\"name1\">\n          </div>\n        </div>\n        <div class=\"col-4\">\n          <div class=\"form-group-3\">\n            <label>{{'addForm.firstSurname' | translate}}\n              <span class=\"color-red\">*</span>\n            </label>\n            <input autocomplete=\"off\" minlength=\"1\" maxlength=\"30\" [pattern]=\"constant.onlyWhiteSpaces\" type=\"text\"\n              class=\"form-control\" required [(ngModel)]=\"model.first_surname\" name=\"first_surname1\">\n          </div>\n        </div>\n        <div class=\"col-4\">\n          <div class=\"form-group-3\">\n            <label>{{'secondSurname' | translate}}\n              <!-- <span class=\"color-red\">*</span> -->\n            </label>\n            <input autocomplete=\"off\" minlength=\"1\" maxlength=\"30\" [pattern]=\"constant.onlyWhiteSpaces\" type=\"text\"\n              class=\"form-control\" [(ngModel)]=\"model.second_surname\" name=\"second_surname1\">\n          </div>\n        </div>\n      </div>\n      <div class=\"col-12\">\n        <div class=\"spacer40\"></div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-4\">\n          <div class=\"form-group-3\">\n            <label>{{'addForm.gender' | translate}}</label><br />\n            <input type=\"radio\" name=\"gender\" value=\"male\" [checked]=\"isChecked('male')\" (change)=\"selectGender($event.target.value)\">{{'addForm.male' | translate}} &nbsp;&nbsp;\n            <input type=\"radio\" name=\"gender\" value=\"female\" [checked]=\"isChecked('female')\" (change)=\"selectGender($event.target.value)\">{{'addForm.female' | translate}}\n          </div>\n        </div>\n        <div class=\"col-4\">\n          <div class=\"form-group-3\">\n            <label>{{'addForm.email' | translate}} <span class=\"color-red\">*</span></label>\n            <input (keydown.space)=\"$event.preventDefault();\" autocomplete=\"off\" required\n              [pattern]=\"constant.emailPattern\" type=\"email\" class=\"form-control\" [(ngModel)]=\"model.email\"\n              name=\"email\">\n          </div>\n        </div>\n        <div class=\"col-4\">\n          <div class=\"form-group-3\">\n            <label>{{'addForm.contact_number' | translate}} <span class=\"color-red\">*</span></label>\n            <input minlength=\"10\" maxlength=\"10\" autocomplete=\"off\" type=\"text\" [pattern]=\"constant.phonePattern\"\n              class=\"form-control\" id=\"phone\" required [(ngModel)]=\"model.phone\" name=\"phone\" ng2TelInput\n              [ng2TelInputOptions]=\"initialCountry\" (countryChange)=\"onCountryChange($event)\" />\n          </div>\n        </div>\n      </div>\n      <div class=\"col-12\">\n        <div class=\"spacer40\"></div>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-4\">\n          <div class=\"form-group-3\">\n            <label>{{'addForm.dateOfBirth' | translate}}</label>\n            <input class=\"form-control\" type=\"date\" name=\"dob\" [(ngModel)]=\"model.dob\">\n          </div>\n        </div>\n        <div class=\"col-4\">\n          <div class=\"form-group-3\">\n            <label>{{'addForm.CURP' | translate}}</label>\n            <input (keydown.space)=\"$event.preventDefault();\" autocomplete=\"off\"\n               type=\"text\" minlength=\"18\" maxlength=\"18\" class=\"form-control\" [(ngModel)]=\"model.curp\" name=\"curp\">\n          </div>\n        </div>\n        <div class=\"col-4\">\n          <div class=\"form-group-3\">\n            <label>{{'addForm.fedralTaxPayerRegistry' | translate}}</label>\n            <input autocomplete=\"off\" minlength=\"13\" maxlength=\"13\" [pattern]=\"constant.onlyWhiteSpaces\" type=\"text\"\n              class=\"form-control\" [(ngModel)]=\"model.fed_tax_pay\" name=\"fed_tax_pay\">\n          </div>\n        </div>\n      </div>\n\n      <div class=\"col-12\">\n        <div class=\"spacer40\"></div>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-4\">\n          <div class=\"form-group-3\">\n            <label>{{'addForm.nacionality' | translate}}</label>\n            <input (keydown.space)=\"$event.preventDefault();\" autocomplete=\"off\"\n              type=\"text\" class=\"form-control\" [(ngModel)]=\"model.nationality\" name=\"nationality\">\n          </div>\n        </div>\n        <div class=\"col-4\">\n          <div class=\"form-group-3\">\n            <label class=\"p16-two\">{{'addForm.marital_status' | translate}}</label>\n            <select title=\"Select Marital Status\" name=\"marital_status\" class=\"form-control\" (change)=\"getMaritalStatus($event.target.value)\">\n              <option value=\"0\" disabled>{{'addForm.maritalStatus.selectMaritalStatus' | translate}}</option>\n              <option *ngFor=\"let maritalStatus of marrital_status_list\" [selected]=\"maritalStatus.id == model.marital_statuses_id\" value=\"{{maritalStatus.id}}\">{{language_code == 'en'? maritalStatus.name_en : maritalStatus.name_es}}</option>\n            </select>\n\n          </div>\n        </div>\n      </div>\n      <div class=\"col-12\">\n        <div class=\"spacer40\"></div>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-12\">\n          <label>{{'addCollection.bankName' | translate}}\n            <span class=\"pull-right\"><a class=\"add\" (click)=\"addDeveloperBank($event)\"\n                href=\"javascript://\">{{'addCollection.addNewBankAccount' | translate}}</a></span>\n          </label>\n          <div class=\"row\" *ngFor=\"let bankAccount of model.legal_rep_banks; let i=index\">\n            <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n              <div class=\"form-group-3\">\n                <label>{{'addCollection.bankName' | translate}}</label>\n                <div class=\"clearfix\"></div>\n                <input autocomplete=\"off\" minlength=\"1\" maxlength=\"30\" class=\"form-control\" type=\"text\"\n                  [(ngModel)]=\"bankAccount.bank_name\" name=\"bank_name{{i}}\">\n              </div>\n            </div>\n            <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n              <div class=\"form-group-3\">\n                <label>{{'addCollection.accountNumber' | translate}}</label>\n                <div class=\"clearfix\"></div>\n                <input autocomplete=\"off\" class=\"form-control\" type=\"text\" minlength=\"10\" maxlength=\"20\"\n                  [pattern]=\"constant.accountPattern\" [(ngModel)]=\"bankAccount.account_number\"\n                  name=\"account_number{{i}}\">\n              </div>\n            </div>\n            <div class=\"col-lg-2 col-md-6 col-sm-6 col-12\">\n              <div class=\"form-group-3\">\n                <label>{{'addCollection.clabeSwift' | translate}}</label>\n                <div class=\"clearfix\"></div>\n                <input autocomplete=\"off\" class=\"form-control\" type=\"text\" [(ngModel)]=\"bankAccount.swift\"\n                  name=\"swift{{i}}\">\n              </div>\n            </div>\n            <div class=\"col-lg-2 col-md-6 col-sm-6 col-12\">\n              <div class=\"form-group-3\">\n                <label>{{'addCollection.currency' | translate}}</label>\n                <div class=\"clearfix\"></div>\n                <select name=\"currency_id{{i}}\" [(ngModel)]=\"bankAccount.currency_id\" class=\"form-control\">\n                  <option value=\"\">{{'addCollection.currency' | translate}}</option>\n                  <option value=\"{{c.id}}\" *ngFor=\"let c of currencies\">{{ c?.code }} | {{c?.currency}}</option>\n                </select>\n              </div>\n            </div>\n            <div class=\"col-lg-2 col-md-6 col-sm-6 col-12\">\n              <div class=\"form-group-3\">\n                <label>Remove</label>\n                <div class=\"clearfix\"></div>\n                <button type=\"button\" (click)=\"removeDeveloperBank($event, bankAccount, i)\">Remove</button>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"col-12\">\n      <div class=\"spacer40\"></div>\n    </div>\n\n    <div class=\"white-bg padding40\">\n      <h3>{{'addForm.address' | translate}}</h3>\n      <div class=\"col-12\">\n        <div class=\"spacer40\"></div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-3\">\n          <div class=\"form-group-3\">\n            <label>{{'addForm.streetAddress' | translate}}</label>\n            <input type=\"text\" class=\"form-control\"  name=\"street_address\" [(ngModel)]=\"model.street_address\"/>\n          </div>\n        </div>\n        <div class=\"col-sm-3\">\n          <div class=\"form-group-3\">\n            <label>{{'addForm.externalNumber' | translate}}</label>\n            <input type=\"text\" class=\"form-control\" name=\"external_number\" [pattern]=\"constant.numberPattern\" [(ngModel)]=\"model.external_number\"/>\n          </div>\n        </div>\n        <div class=\"col-sm-3\">\n          <div class=\"form-group-3\">\n            <label>{{'addForm.internalNumber' | translate}}</label>\n            <input type=\"text\" class=\"form-control\" name=\"internal_number\" [pattern]=\"constant.numberPattern\" [(ngModel)]=\"model.internal_number\"/>\n          </div>\n        </div>\n        <div class=\"col-3\">\n          <div class=\"form-group-3\">\n            <label>{{'addForm.neighborhood' | translate}}</label>\n            <input type=\"text\" class=\"form-control\" name=\"neighborhood\" [(ngModel)]=\"model.neighborhood\"/>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"col-12\">\n        <div class=\"spacer40\"></div>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-4\">\n          <div class=\"form-group-3\">\n            <label>{{'addForm.municipality' | translate}}</label>\n            <input (keydown.space)=\"$event.preventDefault();\" autocomplete=\"off\"  type=\"text\" class=\"form-control\" [(ngModel)]=\"model.municipality\"\n              name=\"municipality\">\n          </div>\n        </div>\n        <div class=\"col-4\">\n          <div class=\"form-group-3\">\n            <label>{{'filters.location.country' | translate}}</label>\n            <select class=\"form-control\" (change)=\"getStatesNew1($event.target.value)\" *ngIf=\"parameter?.countriesAdd\">\n              <option value=\"\" disabled>{{'filters.location.selectCountry' | translate}}</option>\n              <option value=\"0\" [selected]=\"location.countries!='' && location.countries==0\">{{'filters.location.allOption' | translate}}</option>\n              <option *ngFor=\"let countryAdd of parameter.countriesAdd\" [selected]=\"countryAdd.id == model.country_id\" value=\"{{countryAdd.id}}\">{{countryAdd.name}}</option>\n              <option value=\"other\">{{'filters.location.other' | translate}}</option>\n            </select>\n          <div>\n            <input *ngIf=\"showInput\" [(ngModel)]=\"model.country_name\" (ngModelChange)=\"modelChanged()\" name=\"country_name\" autocomplete=\"off\" type=\"text\" class=\"form-control\" placeholder=\"Enter Country Name\" style=\"margin-top: 20px;\">\n          </div>\n          </div>\n        </div>\n        <div class=\"col-4\">\n          <div class=\"form-group-3\">\n            <label>{{'filters.location.state' | translate}}</label>\n      <select class=\"form-control\" (change)=\"getCitiesNew1($event.target.value)\" *ngIf=\"!showInput && parameter?.statesAdd\">\n        <option value=\"\" disabled>{{'filters.location.selectState' | translate}}</option>\n        <option value=\"0\" [selected]=\"location.states!='' && location.states==0\">{{'filters.location.allOption' | translate}}</option>\n        <option *ngFor=\"let stateAdd of parameter.statesAdd\" [selected]=\"stateAdd.id == model.state_id\" value=\"{{stateAdd.id}}\">{{stateAdd.name}}</option>\n      </select>\n      <input *ngIf=\"showInput\" [attr.disabled]=\"stateDisable? '' : null\" [(ngModel)]=\"model.state_name\" (ngModelChange)=\"modelChanged()\" name=\"state_name\" autocomplete=\"off\" type=\"text\" class=\"form-control\" placeholder=\"Enter State Name\">\n          </div>\n        </div>\n      </div>\n\n      <div class=\"col-12\">\n        <div class=\"spacer40\"></div>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-4\">\n          <div class=\"form-group-3\">\n            <label>{{'filters.location.city' | translate}}</label>\n            <select class=\"form-control\" (change)=\"getLocalitiesNew($event.target.value)\" *ngIf=\"!showInput && parameter?.citiesAdd\">\n            <option value=\"\" disabled>{{'filters.location.selectCity' | translate}}</option>\n            <option value=\"0\" [selected]=\"location.cities!='' && location.cities==0\">{{'filters.location.allOption' | translate}}</option>\n            <option *ngFor=\"let cityAdd of parameter.citiesAdd\" [selected]=\"cityAdd.id == model.city_id\" value=\"{{cityAdd.id}}\">{{cityAdd.name}}</option>\n          </select>\n          <input *ngIf=\"showInput\" [attr.disabled]=\"cityDisable? '' : null\" [(ngModel)]=\"model.city_name\" name=\"city_name\" autocomplete=\"off\" type=\"text\" class=\"form-control\" placeholder=\"Enter City Name\">\n          </div>\n        </div>\n        <div class=\"col-4\">\n          <div class=\"form-group-3\">\n            <label>{{'addForm.ZIP' | translate}}</label>\n            <input minlength=\"8\" maxlength=\"15\" autocomplete=\"off\" type=\"text\" \n              class=\"form-control\" id=\"zipcode\" minlength=\"1\" [(ngModel)]=\"model.zipcode\" name=\"zipcode\"\n               />\n          </div>\n        </div>\n      </div>\n\n      <div class=\"col-12\">\n        <div class=\"spacer40\"></div>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-12\">\n          <div class=\"form-group-3-2\">\n            <label>{{'addForm.address' | translate}}\n            </label>\n            <input placeholder=\"{{'addForm.placeholder.searchForAddress' | translate}}\" autocorrect=\"off\"\n              autocapitalize=\"off\" spellcheck=\"off\" type=\"text\" class=\"form-control\" #search\n              (input)=\"loadPlaces('developer_address', 'lat', 'lng', 'searchElementRef')\" name=\"developer_address\"\n              [(ngModel)]=\"model.developer_address\" autocomplete=\"off\">\n          </div>\n        </div>\n        <div class=\"col-12\">\n          <div class=\"form-group-3-2\">\n            <label>{{'addForm.googleSearchAddress' | translate}}\n              <!-- <span class=\"color-red\">*</span> -->\n            </label>\n            <agm-map class=\"height200\" [latitude]=\"model.lat\" [longitude]=\"model.lng\" [scrollwheel]=\"false\"\n              (mapClick)=\"placeMarker($event, 'developer_address', 'lat', 'lng')\" [zoom]=\"constant.zoom\">\n              <agm-marker [latitude]=\"model.lat\" [longitude]=\"model.lng\"></agm-marker>\n            </agm-map>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"col-12\">\n      <div class=\"spacer40\"></div>\n    </div>\n\n    <div class=\"white-bg padding40\">\n      <h3>{{'addForm.legalRepresentativeInfo' | translate}}</h3>\n      <div class=\"col-12\">\n        <div class=\"spacer40\"></div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-4\">\n          <div class=\"form-group-3\">\n            <label>{{'addForm.names' | translate}}\n              <!-- <span class=\"color-red\">*</span> -->\n            </label>\n            <input autocomplete=\"off\" minlength=\"1\" maxlength=\"50\" [pattern]=\"constant.onlyWhiteSpaces\" type=\"text\"\n              class=\"form-control\" [(ngModel)]=\"model.legal_representative.name\" name=\"name\">\n          </div>\n        </div>\n        <div class=\"col-4\">\n          <div class=\"form-group-3\">\n            <label>{{'addForm.firstSurname' | translate}}\n              <!-- <span class=\"color-red\">*</span> -->\n            </label>\n            <input autocomplete=\"off\" minlength=\"1\" maxlength=\"30\" [pattern]=\"constant.onlyWhiteSpaces\" type=\"text\"\n              class=\"form-control\" [(ngModel)]=\"model.legal_representative.first_surname\" name=\"first_surname\">\n          </div>\n        </div>\n        <div class=\"col-4\">\n          <div class=\"form-group-3\">\n            <label>{{'addForm.secondSurname' | translate}}\n              <!-- <span class=\"color-red\">*</span> -->\n            </label>\n            <input autocomplete=\"off\" minlength=\"1\" maxlength=\"30\" [pattern]=\"constant.onlyWhiteSpaces\" type=\"text\"\n              class=\"form-control\" [(ngModel)]=\"model.legal_representative.second_surname\" name=\"second_surname\">\n          </div>\n        </div>\n      </div>\n\n      <div class=\"col-12\">\n        <div class=\"spacer40\"></div>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-4\">\n          <div class=\"form-group-3\">\n            <label>{{'addForm.contactNumber' | translate}}</label>\n            <input minlength=\"8\" maxlength=\"15\" autocomplete=\"off\" type=\"text\" [pattern]=\"constant.phonePattern\"\n              class=\"form-control\" id=\"phone\" [(ngModel)]=\"model.legal_representative.phone\"\n              name=\"legal_representative_phone\" ng2TelInput [ng2TelInputOptions]=\"initialCountry\"\n              (countryChange)=\"onCountryChange($event)\" />\n          </div>\n        </div>\n        <div class=\"col-4\">\n          <div class=\"form-group-3\">\n            <label>{{'addForm.emailId' | translate}}</label>\n            <input (keydown.space)=\"$event.preventDefault();\" autocomplete=\"off\" [pattern]=\"constant.emailPattern\"\n              type=\"email\" class=\"form-control\" [(ngModel)]=\"model.legal_representative.email\" name=\"rep_email\">\n          </div>\n        </div>\n        <div class=\"col-4\">\n          <div class=\"form-group-3\">\n            <label>{{'addForm.fedralTaxPayerRegistry' | translate}}</label>\n            <input autocomplete=\"off\" minlength=\"13\" maxlength=\"13\" [pattern]=\"constant.onlyWhiteSpaces\" type=\"text\"\n              class=\"form-control\" [(ngModel)]=\"model.legal_representative.fed_tax_pay\" name=\"le_fed_tax_pay\">\n          </div>\n        </div>\n      </div>\n\n      <div class=\"col-12\">\n        <div class=\"spacer40\"></div>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-12\">\n          <label>{{'addCollection.bankAccount' | translate}}\n            <!-- <span class=\"color-red\">*</span> -->\n            <span class=\"pull-right\"><a class=\"add\" (click)=\"addLegalEntityBank($event)\"\n                href=\"javascript://\">{{'addCollection.addNewBankAccount' | translate}}</a></span>\n          </label>\n          <div class=\"row\" *ngFor=\"let leBankAccount of model.legal_representative.legal_rep_banks; let i=index\">\n            <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n              <div class=\"form-group-3\">\n                <label>{{'addCollection.bankName' | translate}}</label>\n                <div class=\"clearfix\"></div>\n                <input autocomplete=\"off\" minlength=\"1\" maxlength=\"30\" class=\"form-control\" type=\"text\"\n                  [(ngModel)]=\"leBankAccount.bank_name\" name=\"le_bank_name{{i}}\">\n              </div>\n            </div>\n            <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n              <div class=\"form-group-3\">\n                <label>{{'addCollection.accountNumber' | translate}}</label>\n                <div class=\"clearfix\"></div>\n                <input autocomplete=\"off\" class=\"form-control\" type=\"text\" minlength=\"9\" maxlength=\"20\"\n                  [pattern]=\"constant.accountPattern\" [(ngModel)]=\"leBankAccount.account_number\"\n                  name=\"le_account_number{{i}}\">\n              </div>\n            </div>\n            <div class=\"col-lg-2 col-md-6 col-sm-6 col-12\">\n              <div class=\"form-group-3\">\n                <label>{{'addCollection.clabeSwift' | translate}}</label>\n                <div class=\"clearfix\"></div>\n                <input autocomplete=\"off\" class=\"form-control\" type=\"text\" [(ngModel)]=\"leBankAccount.swift\"\n                  name=\"le_swift{{i}}\">\n              </div>\n            </div>\n            <div class=\"col-lg-2 col-md-6 col-sm-6 col-12\">\n              <div class=\"form-group-3\">\n                <label>{{'addCollection.currency' | translate}}</label>\n                <div class=\"clearfix\"></div>\n                <select name=\"le_currency_id{{i}}\" [(ngModel)]=\"leBankAccount.currency_id\" class=\"form-control\">\n                  <option value=\"\">{{'addCollection.currency' | translate}}</option>\n                  <option value=\"{{c.id}}\" *ngFor=\"let c of currencies\">{{ c?.code }} | {{c?.currency}}</option>\n                </select>\n              </div>\n            </div>\n            <div class=\"col-lg-2 col-md-6 col-sm-6 col-12\">\n              <div class=\"form-group-3\">\n                <label>{{'addCollection.remove' | translate}}</label>\n                <div class=\"clearfix\"></div>\n                <button type=\"button\" (click)=\"removeLegalEntityBank($event, leBankAccount, i)\">{{'addCollection.remove'\n                  |\n                  translate}}</button>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </form>"

/***/ }),

/***/ "./src/app/layout/users/add-user/add-user.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/layout/users/add-user/add-user.component.ts ***!
  \*************************************************************/
/*! exports provided: AddUserComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddUserComponent", function() { return AddUserComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_models_users_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/users.model */ "./src/app/models/users.model.ts");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var src_app_models_legalEntity_model__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/models/legalEntity.model */ "./src/app/models/legalEntity.model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var AddUserComponent = /** @class */ (function () {
    function AddUserComponent(constant, cs, mapsAPILoader, ngZone, admin, route, spinner, translate, router) {
        this.constant = constant;
        this.cs = cs;
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.admin = admin;
        this.route = route;
        this.spinner = spinner;
        this.translate = translate;
        this.router = router;
        this.parameter = {};
        this.show = false;
        this.currencies = Array();
        this.location = {};
        this.marrital_status_list = Array();
        this.showInput = false;
    }
    AddUserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.language_code = localStorage.getItem('language_code');
        this.initModel();
        this.getCountries();
        this.getMarritalStatusList();
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.p = this.constant.p;
        this.getCurrencies();
        this.parameter.sub = this.route.params.subscribe(function (params) {
            if (params['id']) {
                _this.model.id = params['id'];
                _this.getUserById(_this.model.id);
            }
            else {
                _this.model.id = '';
            }
        });
    };
    AddUserComponent.prototype.initModel = function () {
        this.initialCountry = { initialCountry: this.constant.country_code };
        this.model = new src_app_models_users_model__WEBPACK_IMPORTED_MODULE_2__["Users"]();
        this.model.legal_rep_banks = new Array();
        this.model.legal_representative = new src_app_models_legalEntity_model__WEBPACK_IMPORTED_MODULE_9__["LegalRepresentative"]();
        this.setCurrentPosition();
        this.model.country_code = this.constant.country_code;
        this.model.dial_code = this.constant.dial_code;
    };
    AddUserComponent.prototype.getCurrencies = function () {
        var _this = this;
        this.admin.postDataApi('getCurrencies', {})
            .subscribe(function (success) {
            _this.currencies = success.data;
        });
    };
    AddUserComponent.prototype.getUserById = function (id) {
        var _this = this;
        this.spinner.show();
        this.admin.postDataApi('getUserById', { 'user_id': id })
            .subscribe(function (success) {
            _this.spinner.hide();
            _this.model = new src_app_models_users_model__WEBPACK_IMPORTED_MODULE_2__["Users"]();
            _this.model = success.data;
            // this.model.legal_representative = new LegalRepresentative();
            _this.model.legal_rep_banks = success.data.legal_rep_banks;
            _this.model.legal_representative = success.data.legal_representative || new src_app_models_legalEntity_model__WEBPACK_IMPORTED_MODULE_9__["LegalRepresentative"]();
            _this.model.legal_representative.legal_rep_banks = success.data.legal_representative.legal_rep_banks; // Array(new Banks());
            _this.image = _this.model.image;
            _this.model.country_id ? _this.getStatesNew1(_this.model.country_id) : undefined;
            _this.model.state_id ? _this.getCitiesNew1(_this.model.state_id) : undefined;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    AddUserComponent.prototype.set = function () {
        this.show = true;
    };
    AddUserComponent.prototype.changeListner = function (event, param) {
        var _this = this;
        if (event.target.files[0].size > this.constant.fileSizeLimit) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.fileSizeExceeds'), 'error');
            return false;
        }
        var reader = new FileReader();
        reader.onload = function (e) {
            _this[param] = e.target.result;
            _this.spinner.show();
            _this.cs.saveImage(event.target.files[0]).subscribe(function (success) {
                _this.spinner.hide();
                _this.model[param] = success['data'].image;
            });
        };
        reader.readAsDataURL(event.target.files[0]);
    };
    AddUserComponent.prototype.onCountryChange = function (e) {
        // this.model.country_code = e.iso2;
        // this.model.dial_code = '+' + e.dialCode;
        // this.initialCountry = {initialCountry: e.iso2};
    };
    AddUserComponent.prototype.add = function (formData) {
        var _this = this;
        var modelSave = JSON.parse(JSON.stringify(this.model));
        if (modelSave.legal_representative.phone) {
            modelSave.legal_representative.country_code = modelSave.legal_representative.country_code || this.constant.country_code;
            modelSave.legal_representative.dial_code = modelSave.legal_representative.dial_code || this.constant.dial_code;
        }
        if (modelSave.developer_address && (!modelSave.lat || !modelSave.lng)) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseAddressFromDropdown'), 'error');
            return;
        }
        // if (!modelSave.country_name && !modelSave.state_name && !modelSave.city_name && this.showInput) {
        //   swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterAllCountryStateAndCity'), 'error');
        //   return;
        // }
        if (this.showInput) {
            modelSave.country_id = 0;
            modelSave.state_id = 0;
            modelSave.city_id = 0;
        }
        if (modelSave.images) {
            modelSave.images = modelSave.images.map(function (r) { return r.image; });
        }
        if (modelSave.legal_representative.name || modelSave.legal_representative.first_surname || modelSave.legal_representative.phone
            || modelSave.legal_representative.email) {
            // if any of key present, then all must be entered
            if (!modelSave.legal_representative.name) {
                swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterLegalRepresentativeName'), 'error');
                return;
            }
            if (!modelSave.legal_representative.first_surname) {
                swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterLegalRepresentativeFirstName'), 'error');
                return;
            }
            if (!modelSave.legal_representative.phone) {
                swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterLegalRepresentativePhone'), 'error');
                return;
            }
            if (!modelSave.legal_representative.email) {
                swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterLegalRepresentativeEmail'), 'error');
                return;
            }
            // if (!modelSave.legal_representative.fed_tax_pay) {
            //   swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterLegalRepresentativeFTPR'), 'error');
            //   return;
            // }
        }
        if (!modelSave.legal_representative.name || !modelSave.legal_representative.first_surname || !modelSave.legal_representative.phone
            || !modelSave.legal_representative.email) {
            delete modelSave.legal_representative;
        }
        if (modelSave['legal_rep_banks'] && modelSave['legal_rep_banks'].length > 0) {
            var i = 0;
            for (var index = 0; index < modelSave['legal_rep_banks'].length; index++) {
                var element = modelSave['legal_rep_banks'][index];
                if (!element.bank_name || !element.account_number || !element.swift || !element.currency_id) {
                    i = i + 1;
                    swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterBankDetails'), 'error');
                    return;
                }
            }
        }
        if (modelSave['legal_representative'] &&
            modelSave['legal_representative']['legal_rep_banks'] && modelSave['legal_representative']['legal_rep_banks'].length > 0) {
            var i = 0;
            for (var index = 0; index < modelSave['legal_representative']['legal_rep_banks'].length; index++) {
                var element = modelSave['legal_representative']['legal_rep_banks'][index];
                if (!element.bank_name || !element.account_number || !element.swift || !element.currency_id) {
                    i = i + 1;
                    swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterBankDetails'), 'error');
                    return;
                }
            }
        }
        this.spinner.show();
        this.admin.postDataApi('addSeller', modelSave)
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
                if (_this.model.id === '') {
                    _this.router.navigate(['/dashboard/users']);
                }
                else {
                    _this.model = success.data;
                    _this.model.legal_rep_banks = success.data.legal_rep_banks || [];
                    _this.model.legal_representative = success.data.legal_representative || new src_app_models_legalEntity_model__WEBPACK_IMPORTED_MODULE_9__["LegalRepresentative"]();
                    _this.model.legal_representative.legal_rep_banks = success.data.legal_representative.legal_rep_banks || [];
                    _this.getCountries();
                    _this.model.country_id ? _this.getStatesNew1(_this.model.country_id) : undefined;
                    _this.model.state_id ? _this.getCitiesNew1(_this.model.state_id) : undefined;
                }
            }
        }, function (error) {
            _this.spinner.hide();
        });
    };
    AddUserComponent.prototype.loadPlaces = function (paramAdd, paramLat, paramLng, searchRef) {
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
    AddUserComponent.prototype.setCurrentPosition = function () {
        var _this = this;
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                // setting address lat lng
                _this.model.lat = _this.model.lat ? _this.model.lat : position.coords.latitude;
                _this.model.lng = _this.model.lng ? _this.model.lng : position.coords.longitude;
                // setting branch office lat lng
                _this.model.branch_lat = _this.model.branch_lat ? _this.model.branch_lat : position.coords.latitude;
                _this.model.branch_lng = _this.model.branch_lng ? _this.model.branch_lng : position.coords.longitude;
            });
        }
    };
    AddUserComponent.prototype.placeMarker = function ($event, addParam, paramLat, paramLng) {
        this.model[paramLat] = $event.coords.lat;
        this.model[paramLng] = $event.coords.lng;
        this.getGeoLocation(addParam, this.model[paramLat], this.model[paramLng]);
    };
    AddUserComponent.prototype.getGeoLocation = function (addParam, lat, lng) {
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
    AddUserComponent.prototype.addLegalEntityBank = function (e) {
        var bank = new src_app_models_legalEntity_model__WEBPACK_IMPORTED_MODULE_9__["Banks"]();
        this.model.legal_representative.legal_rep_banks = this.model.legal_representative.legal_rep_banks || [];
        this.model.legal_representative.legal_rep_banks.push(bank);
    };
    AddUserComponent.prototype.removeLegalEntityBank = function ($event, item, i) {
        var _this = this;
        $event.stopPropagation();
        this.model.legal_representative.legal_rep_banks.splice(i, 1);
        if (item.id) {
            this.admin.postDataApi('deleteLegalRepBank', { id: item.id }).subscribe(function (success) {
                _this.spinner.hide();
            }, function (error) {
                _this.spinner.hide();
            });
        }
    };
    AddUserComponent.prototype.addDeveloperBank = function (e) {
        var bank = new src_app_models_legalEntity_model__WEBPACK_IMPORTED_MODULE_9__["Banks"]();
        this.model.legal_rep_banks.push(bank);
    };
    AddUserComponent.prototype.removeDeveloperBank = function ($event, item, i) {
        var _this = this;
        $event.stopPropagation();
        this.model.legal_rep_banks.splice(i, 1);
        if (item.id) {
            this.admin.postDataApi('deleteLegalRepBank', { id: item.id }).subscribe(function (success) {
                _this.spinner.hide();
            }, function (error) {
                _this.spinner.hide();
            });
        }
    };
    AddUserComponent.prototype.selectGender = function (gender) {
        this.model.gender = gender;
    };
    AddUserComponent.prototype.isChecked = function (gender) {
        return gender == this.model.gender ? true : false;
    };
    AddUserComponent.prototype.getCountries = function () {
        var _this = this;
        var self = this;
        this.parameter.statesAdd = [];
        this.parameter.citiesAdd = [];
        this.parameter.localitiesAdd = [];
        this.parameter.buildingsAdd = [];
        this.admin.postDataApi('getUserCountries', {})
            .subscribe(function (success) {
            _this.parameter.countriesAdd = success.data;
            _this.location.countries = '0';
            _this.location.states = '0';
            _this.location.cities = '0';
        });
    };
    AddUserComponent.prototype.getMarritalStatusList = function () {
        var _this = this;
        this.admin.postDataApi('getmaritalStatus', {}).subscribe(function (r) {
            _this.marrital_status_list = r['data'];
        });
    };
    AddUserComponent.prototype.getMaritalStatus = function (maritalStatusId) {
        this.model.marital_statuses_id = maritalStatusId;
    };
    AddUserComponent.prototype.getStatesNew1 = function (countryId) {
        var _this = this;
        this.parameter.citiesAdd = [];
        this.parameter.localitiesAdd = [];
        this.parameter.buildingsAdd = [];
        this.parameter.country_id = countryId;
        if (countryId !== '' && countryId !== '0' && countryId != 'other') {
            this.admin.postDataApi('country/getUserStates', { country_id: countryId })
                .subscribe(function (success) {
                _this.showInput = false;
                _this.parameter.statesAdd = success.data;
                _this.location.countries = countryId;
                _this.model.country_id = countryId;
                _this.location.states = _this.model.state_id;
                _this.location.cities = '0';
                _this.location.localities = '0';
            });
        }
        else {
            if (countryId == 'other') {
                this.showInput = true;
                this.model.country_name = null;
                this.model.state_name = null;
                this.model.city_name = null;
                this.stateDisable = true;
                this.cityDisable = true;
            }
            else {
                this.showInput = false;
                this.parameter.statesAdd = [];
                this.location.countries = countryId;
                this.model.country_id = countryId;
                this.location.states = '0';
                this.location.cities = '0';
            }
        }
    };
    AddUserComponent.prototype.getCitiesNew1 = function (state_id) {
        var _this = this;
        this.parameter.localitiesAdd = [];
        this.parameter.state_id = state_id;
        if (state_id !== '' && state_id !== '0') {
            this.admin.postDataApi('UsergetCities', { state_id: state_id })
                .subscribe(function (success) {
                _this.parameter.citiesAdd = success.data;
                _this.location.states = state_id;
                _this.model.state_id = state_id;
                _this.location.cities = _this.model.city_id;
            });
        }
        else {
            this.parameter.citiesAdd = [];
            this.location.states = state_id;
            this.model.state_id = state_id;
            this.location.cities = '0';
        }
    };
    AddUserComponent.prototype.getLocalitiesNew = function (city_id) {
        this.parameter.city_id = city_id;
        this.model.city_id = city_id;
        this.location.cities = city_id;
        if (city_id === '' || city_id === '0') {
            return false;
        }
    };
    AddUserComponent.prototype.modelChanged = function () {
        if (!this.model.country_name) {
            this.stateDisable = true;
            this.cityDisable = true;
            this.model.state_name = null;
            this.model.city_name = null;
        }
        else if (this.model.country_name && !this.model.state_name) {
            this.stateDisable = false;
        }
        else if (this.model.country_name && this.model.state_name) {
            this.cityDisable = false;
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('mapDiv'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddUserComponent.prototype, "mapDiv", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('search'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddUserComponent.prototype, "searchElementRef", void 0);
    AddUserComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-add-user',
            template: __webpack_require__(/*! ./add-user.component.html */ "./src/app/layout/users/add-user/add-user.component.html"),
            styles: [__webpack_require__(/*! ./add-user.component.css */ "./src/app/layout/users/add-user/add-user.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["Constant"],
            src_app_services_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"],
            _agm_core__WEBPACK_IMPORTED_MODULE_3__["MapsAPILoader"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"],
            src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_7__["AdminService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_4__["NgxSpinnerService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__["TranslateService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], AddUserComponent);
    return AddUserComponent;
}());



/***/ }),

/***/ "./src/app/layout/users/edit-user/edit-user.component.css":
/*!****************************************************************!*\
  !*** ./src/app/layout/users/edit-user/edit-user.component.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".form-group label {\n    color: black;\n    font-size: 13px;\n    font-weight: bold;\n}\n.white-bg {\n    background-color: #fff;\n    border-radius: 2px;\n    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);\n}\ninput[type=\"radio\"] {\n    margin: 0 1.81em 0 0;\n}\n.profile-img {\n    width: 39px;\n}\n.profile-user {\n    margin-left: 12%;\n    margin-top: -8%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L3VzZXJzL2VkaXQtdXNlci9lZGl0LXVzZXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGFBQWE7SUFDYixnQkFBZ0I7SUFDaEIsa0JBQWtCO0NBQ3JCO0FBQ0Q7SUFDSSx1QkFBdUI7SUFDdkIsbUJBQW1CO0lBQ25CLHdDQUF3QztDQUMzQztBQUNEO0lBQ0kscUJBQXFCO0NBQ3hCO0FBQ0Q7SUFDSSxZQUFZO0NBQ2Y7QUFFRDtJQUNJLGlCQUFpQjtJQUNqQixnQkFBZ0I7Q0FDbkIiLCJmaWxlIjoic3JjL2FwcC9sYXlvdXQvdXNlcnMvZWRpdC11c2VyL2VkaXQtdXNlci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZvcm0tZ3JvdXAgbGFiZWwge1xuICAgIGNvbG9yOiBibGFjaztcbiAgICBmb250LXNpemU6IDEzcHg7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG4ud2hpdGUtYmcge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgIGJveC1zaGFkb3c6IDAgNHB4IDhweCAwIHJnYmEoMCwwLDAsMC4yKTtcbn1cbmlucHV0W3R5cGU9XCJyYWRpb1wiXSB7XG4gICAgbWFyZ2luOiAwIDEuODFlbSAwIDA7XG59XG4ucHJvZmlsZS1pbWcge1xuICAgIHdpZHRoOiAzOXB4O1xufVxuXG4ucHJvZmlsZS11c2VyIHtcbiAgICBtYXJnaW4tbGVmdDogMTIlO1xuICAgIG1hcmdpbi10b3A6IC04JTtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/layout/users/edit-user/edit-user.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/layout/users/edit-user/edit-user.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-12\">\n      <div class=\"title-group\">\n        <h5>{{model.id ? ('viewUsers.editBtn' | translate) : ('viewUsers.addBtn' | translate)}}</h5>\n        <div class=\"spacer30\"></div>\n      </div>\n    </div>\n  </div>\n\n\n  <form role=\"form\" ngNativeValidate #addForm=\"ngForm\" (ngSubmit)=\"add(addForm)\">\n      <div class=\"white-bg padding15\">\n          <div class=\"row\">\n              <div class=\"col-lg-3 col-md-12 col-sm-12 col-12\">\n                  <div class=\"df-profile\">\n                      <a routerLink=\"../\"><i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i></a>\n                      <img [src]=\"leadData?.user?.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\">\n                      <div class=\"df-info\">\n                          <p class=\"p14 text-ellipsis120\">\n                              test\n                              <!-- {{leadData?.user?.name ? leadData?.user?.name : leadData?.name}} -->\n                          </p>\n                          <p class=\"p12\">\n                              47734789758797\n                              <!-- {{leadData?.user?.dial_code?leadData?.user?.dial_code:leadData?.dial_code}}-{{leadData?.user?.phone ? leadData?.user?.phone:leadData?.phone}} -->\n                          </p>\n                      </div>\n                  </div>\n              </div>\n              <div class=\"col-lg-7 col-md-12 col-sm-6 col-12\">\n                  <div class=\"profile-list\">\n                      <ul>\n                          <li>\n                              <div class=\"df-info\">\n                                  <p class=\"p14 marginB0\">\n                                      csr test\n                                      <!-- {{leadData.admin.name | titlecase}} -->\n                                  </p>\n                                  <p class=\"p12\">{{'leadDetails.CSRBuyer' | translate}}</p>\n                              </div>\n                          </li>\n                      \n                      </ul>\n                  </div>\n              </div>\n  \n              <div class=\"col-lg-2 col-md-12 col-sm-12 col-12\">\n                  <div class=\"btn-cont text-right\">\n                      <button *ngIf=\"!model?.id\" type=\"submit\" [disabled]=\"!addForm.valid\" class=\"btn btn-primary\">{{'addForm.addBtn'\n                        | translate}}</button>\n                      <button *ngIf=\"model?.id\" type=\"submit\" class=\"btn btn-primary\">{{'addForm.updateBtn' | translate}}</button>\n                    </div>\n              </div>\n          </div>\n  \n      </div>\n     \n    <!-- space -->\n    <div class=\"col-12\">\n      <div class=\"spacer40\"></div>\n    </div>\n   <!-- space -->\n\n    <div class=\"white-bg padding40\">\n      <section id=\"tabs\" class=\"project-tab\">\n          <div class=\"container\">\n              <div class=\"row\">\n                  <div class=\"col-md-12\">\n                      <nav>\n                          <div class=\"nav nav-tabs nav-fill\" id=\"nav-tab\" role=\"tablist\">\n                              <a class=\"nav-item nav-link active\" id=\"nav-home-tab\" data-toggle=\"tab\" href=\"#nav-home\" role=\"tab\" aria-controls=\"nav-home\" aria-selected=\"true\">{{'addForm.buyer' | translate}}</a>\n                              <a class=\"nav-item nav-link\" id=\"nav-profile-tab\" data-toggle=\"tab\" href=\"#nav-profile\" role=\"tab\" aria-controls=\"nav-profile\" aria-selected=\"false\">{{'addForm.seller' | translate}}</a>\n                              <a class=\"nav-item nav-link\" id=\"nav-contact-tab\" data-toggle=\"tab\" href=\"#nav-contact\" role=\"tab\" aria-controls=\"nav-contact\" aria-selected=\"false\">{{'addForm.rent' | translate}}</a>\n                              <a class=\"nav-item nav-link\" id=\"nav-credit-tab\" data-toggle=\"tab\" href=\"#nav-credit\" role=\"tab\" aria-controls=\"nav-credit\" aria-selected=\"false\">{{'addForm.credit' | translate}}</a>\n                              <a class=\"nav-item nav-link\" id=\"nav-info-tab\" data-toggle=\"tab\" href=\"#nav-info\" role=\"tab\" aria-controls=\"nav-info\" aria-selected=\"false\">{{'addForm.info' | translate}}</a>\n                          </div>\n                      </nav>\n                      <div class=\"tab-content\" id=\"nav-tabContent\">\n                          <div class=\"tab-pane fade show active\" id=\"nav-home\" role=\"tabpanel\" aria-labelledby=\"nav-home-tab\">\n                            <div class=\"col-12\">\n                              <div class=\"spacer40\"></div>\n                            </div>\n                              <!-- <a [routerLink]=\"['/dashboard/leads/csr-buyers/1002']\" class=\"action-icon\">\n                              <img src=\"assets/img/edit.png\" alt=\"img\"></a> -->\n                              <app-csr-buyer-detail></app-csr-buyer-detail>\n                          </div>\n                          <div class=\"tab-pane fade\" id=\"nav-profile\" role=\"tabpanel\" aria-labelledby=\"nav-profile-tab\">\n                              <div class=\"col-12\">\n                                  <div class=\"spacer40\"></div>\n                                </div>\n                              <h6 style=\"text-align: center;\">{{'addForm.emptySeller' | translate}}</h6>\n                          </div>\n                          <div class=\"tab-pane fade\" id=\"nav-contact\" role=\"tabpanel\" aria-labelledby=\"nav-contact-tab\">\n                              <div class=\"col-12\">\n                                  <div class=\"spacer40\"></div>\n                                </div>\n                              <h6 style=\"text-align: center;\">{{'addForm.emptyRent' | translate}}</h6>\n                          </div>\n                          <div class=\"tab-pane fade\" id=\"nav-credit\" role=\"tabpanel\" aria-labelledby=\"nav-credit-tab\">\n                              <div class=\"col-12\">\n                                  <div class=\"spacer40\"></div>\n                                </div>\n                              <h6 style=\"text-align: center;\">{{'addForm.emptyCredit' | translate}}</h6>\n                          </div>\n                          <div class=\"tab-pane fade\" id=\"nav-info\" role=\"tabpanel\" aria-labelledby=\"nav-info-tab\">\n                              <div class=\"col-12\">\n                                  <div class=\"spacer40\"></div>\n                                </div>\n                              <div class=\"white-bg padding40\">\n                                  <h3>{{'addForm.generalData' | translate}}</h3>\n                                  <div class=\"col-12\">\n                                    <div class=\"spacer40\"></div>\n                                  </div>\n                                  <div class=\"row\">\n                                    <div class=\"col-4\">\n                                      <div class=\"form-group-3\">\n                                        <label>{{'addForm.names' | translate}} <span class=\"color-red\">*</span></label>\n                                        <input autocomplete=\"off\" minlength=\"1\" maxlength=\"30\" [pattern]=\"constant.onlyWhiteSpaces\" required\n                                          type=\"text\" class=\"form-control\" [(ngModel)]=\"model.name\" name=\"name1\">\n                                      </div>\n                                    </div>\n                                    <div class=\"col-4\">\n                                      <div class=\"form-group-3\">\n                                        <label>{{'addForm.firstSurname' | translate}}\n                                          <span class=\"color-red\">*</span>\n                                        </label>\n                                        <input autocomplete=\"off\" minlength=\"1\" maxlength=\"30\" [pattern]=\"constant.onlyWhiteSpaces\" type=\"text\"\n                                          class=\"form-control\" required [(ngModel)]=\"model.first_surname\" name=\"first_surname1\">\n                                      </div>\n                                    </div>\n                                    <div class=\"col-4\">\n                                      <div class=\"form-group-3\">\n                                        <label>{{'secondSurname' | translate}}\n                                          <!-- <span class=\"color-red\">*</span> -->\n                                        </label>\n                                        <input autocomplete=\"off\" minlength=\"1\" maxlength=\"30\" [pattern]=\"constant.onlyWhiteSpaces\" type=\"text\"\n                                          class=\"form-control\" [(ngModel)]=\"model.second_surname\" name=\"second_surname1\">\n                                      </div>\n                                    </div>\n                                  </div>\n                                  <div class=\"col-12\">\n                                    <div class=\"spacer40\"></div>\n                                  </div>\n                                  <div class=\"row\">\n                                    <div class=\"col-4\">\n                                      <div class=\"form-group-3\">\n                                        <label>{{'addForm.gender' | translate}}</label><br />\n                                        <input type=\"radio\" name=\"gender\" value=\"male\" [checked]=\"isChecked('male')\" (change)=\"selectGender($event.target.value)\">{{'addForm.male' | translate}} &nbsp;&nbsp;\n                                        <input type=\"radio\" name=\"gender\" value=\"female\" [checked]=\"isChecked('female')\" (change)=\"selectGender($event.target.value)\">{{'addForm.female' | translate}}\n                                      </div>\n                                    </div>\n                                    <div class=\"col-4\">\n                                      <div class=\"form-group-3\">\n                                        <label>{{'addForm.email' | translate}} <span class=\"color-red\">*</span></label>\n                                        <input (keydown.space)=\"$event.preventDefault();\" autocomplete=\"off\" required\n                                          [pattern]=\"constant.emailPattern\" type=\"email\" class=\"form-control\" [(ngModel)]=\"model.email\"\n                                          name=\"email\">\n                                      </div>\n                                    </div>\n                                    <div class=\"col-4\">\n                                      <div class=\"form-group-3\">\n                                        <label>{{'addForm.contact_number' | translate}} <span class=\"color-red\">*</span></label>\n                                        <input minlength=\"10\" maxlength=\"10\" autocomplete=\"off\" type=\"text\" [pattern]=\"constant.phonePattern\"\n                                          class=\"form-control\" id=\"phone\" required [(ngModel)]=\"model.phone\" name=\"phone\" ng2TelInput\n                                          [ng2TelInputOptions]=\"initialCountry\" (countryChange)=\"onCountryChange($event)\" />\n                                      </div>\n                                    </div>\n                                  </div>\n                                  <div class=\"col-12\">\n                                    <div class=\"spacer40\"></div>\n                                  </div>\n                            \n                                  <div class=\"row\">\n                                    <div class=\"col-4\">\n                                      <div class=\"form-group-3\">\n                                        <label>{{'addForm.dateOfBirth' | translate}}</label>\n                                        <input class=\"form-control\" type=\"date\" name=\"dob\" [(ngModel)]=\"model.dob\">\n                                      </div>\n                                    </div>\n                                    <div class=\"col-4\">\n                                      <div class=\"form-group-3\">\n                                        <label>{{'addForm.CURP' | translate}}</label>\n                                        <input (keydown.space)=\"$event.preventDefault();\" autocomplete=\"off\"\n                                           type=\"text\" minlength=\"18\" maxlength=\"18\" class=\"form-control\" [(ngModel)]=\"model.curp\" name=\"curp\">\n                                      </div>\n                                    </div>\n                                    <div class=\"col-4\">\n                                      <div class=\"form-group-3\">\n                                        <label>{{'addForm.fedralTaxPayerRegistry' | translate}}</label>\n                                        <input autocomplete=\"off\" minlength=\"13\" maxlength=\"13\" [pattern]=\"constant.onlyWhiteSpaces\" type=\"text\"\n                                          class=\"form-control\" [(ngModel)]=\"model.fed_tax_pay\" name=\"fed_tax_pay\">\n                                      </div>\n                                    </div>\n                                  </div>\n                            \n                                  <div class=\"col-12\">\n                                    <div class=\"spacer40\"></div>\n                                  </div>\n                            \n                                  <div class=\"row\">\n                                    <div class=\"col-4\">\n                                      <div class=\"form-group-3\">\n                                        <label>{{'addForm.nacionality' | translate}}</label>\n                                        <input (keydown.space)=\"$event.preventDefault();\" autocomplete=\"off\"\n                                          type=\"text\" class=\"form-control\" [(ngModel)]=\"model.nationality\" name=\"nationality\">\n                                      </div>\n                                    </div>\n                                    <div class=\"col-4\">\n                                      <div class=\"form-group-3\">\n                                        <label class=\"p16-two\">{{'addForm.marital_status' | translate}}</label>\n                                        <select title=\"Select Marital Status\" name=\"marital_status\" class=\"form-control\" (change)=\"getMaritalStatus($event.target.value)\">\n                                          <option value=\"0\" disabled>{{'addForm.maritalStatus.selectMaritalStatus' | translate}}</option>\n                                          <option *ngFor=\"let maritalStatus of marrital_status_list\" [selected]=\"maritalStatus.id == model.marital_statuses_id\" value=\"{{maritalStatus.id}}\">{{language_code == 'en'? maritalStatus.name_en : maritalStatus.name_es}}</option>\n                                        </select>\n                            \n                                      </div>\n                                    </div>\n                                  </div>\n                                  <div class=\"col-12\">\n                                    <div class=\"spacer40\"></div>\n                                  </div>\n                            \n                                  <div class=\"row\">\n                                    <div class=\"col-12\">\n                                      <label>{{'addCollection.bankName' | translate}}\n                                        <span class=\"pull-right\"><a class=\"add\" (click)=\"addDeveloperBank($event)\"\n                                            href=\"javascript://\">{{'addCollection.addNewBankAccount' | translate}}</a></span>\n                                      </label>\n                                      <div class=\"row\" *ngFor=\"let bankAccount of model.legal_rep_banks; let i=index\">\n                                        <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n                                          <div class=\"form-group-3\">\n                                            <label>{{'addCollection.bankName' | translate}}</label>\n                                            <div class=\"clearfix\"></div>\n                                            <input autocomplete=\"off\" minlength=\"1\" maxlength=\"30\" class=\"form-control\" type=\"text\"\n                                              [(ngModel)]=\"bankAccount.bank_name\" name=\"bank_name{{i}}\">\n                                          </div>\n                                        </div>\n                                        <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n                                          <div class=\"form-group-3\">\n                                            <label>{{'addCollection.accountNumber' | translate}}</label>\n                                            <div class=\"clearfix\"></div>\n                                            <input autocomplete=\"off\" class=\"form-control\" type=\"text\" minlength=\"10\" maxlength=\"20\"\n                                              [pattern]=\"constant.accountPattern\" [(ngModel)]=\"bankAccount.account_number\"\n                                              name=\"account_number{{i}}\">\n                                          </div>\n                                        </div>\n                                        <div class=\"col-lg-2 col-md-6 col-sm-6 col-12\">\n                                          <div class=\"form-group-3\">\n                                            <label>{{'addCollection.clabeSwift' | translate}}</label>\n                                            <div class=\"clearfix\"></div>\n                                            <input autocomplete=\"off\" class=\"form-control\" type=\"text\" [(ngModel)]=\"bankAccount.swift\"\n                                              name=\"swift{{i}}\">\n                                          </div>\n                                        </div>\n                                        <div class=\"col-lg-2 col-md-6 col-sm-6 col-12\">\n                                          <div class=\"form-group-3\">\n                                            <label>{{'addCollection.currency' | translate}}</label>\n                                            <div class=\"clearfix\"></div>\n                                            <select name=\"currency_id{{i}}\" [(ngModel)]=\"bankAccount.currency_id\" class=\"form-control\">\n                                              <option value=\"\">{{'addCollection.currency' | translate}}</option>\n                                              <option value=\"{{c.id}}\" *ngFor=\"let c of currencies\">{{ c?.code }} | {{c?.currency}}</option>\n                                            </select>\n                                          </div>\n                                        </div>\n                                        <div class=\"col-lg-2 col-md-6 col-sm-6 col-12\">\n                                          <div class=\"form-group-3\">\n                                            <label>Remove</label>\n                                            <div class=\"clearfix\"></div>\n                                            <button type=\"button\" (click)=\"removeDeveloperBank($event, bankAccount, i)\">Remove</button>\n                                          </div>\n                                        </div>\n                                      </div>\n                                    </div>\n                                  </div>\n                                </div>\n                            \n                                <div class=\"col-12\">\n                                  <div class=\"spacer40\"></div>\n                                </div>\n                            \n                                <div class=\"white-bg padding40\">\n                                  <h3>{{'addForm.address' | translate}}</h3>\n                                  <div class=\"col-12\">\n                                    <div class=\"spacer40\"></div>\n                                  </div>\n                                  <div class=\"row\">\n                                    <div class=\"col-3\">\n                                      <div class=\"form-group-3\">\n                                        <label>{{'addForm.streetAddress' | translate}}</label>\n                                        <input type=\"text\" class=\"form-control\"  name=\"street_address\" [(ngModel)]=\"model.street_address\"/>\n                                      </div>\n                                    </div>\n                                    <div class=\"col-sm-3\">\n                                      <div class=\"form-group-3\">\n                                        <label>{{'addForm.externalNumber' | translate}}</label>\n                                        <input type=\"text\" class=\"form-control\" name=\"external_number\" [pattern]=\"constant.numberPattern\" [(ngModel)]=\"model.external_number\"/>\n                                      </div>\n                                    </div>\n                                    <div class=\"col-sm-3\">\n                                      <div class=\"form-group-3\">\n                                        <label>{{'addForm.internalNumber' | translate}}</label>\n                                        <input type=\"text\" class=\"form-control\" name=\"internal_number\" [pattern]=\"constant.numberPattern\" [(ngModel)]=\"model.internal_number\"/>\n                                      </div>\n                                    </div>\n                                    <div class=\"col-3\">\n                                      <div class=\"form-group-3\">\n                                        <label>{{'addForm.neighborhood' | translate}}</label>\n                                        <input type=\"text\" class=\"form-control\" name=\"neighborhood\" [(ngModel)]=\"model.neighborhood\"/>\n                                      </div>\n                                    </div>\n                                  </div>\n                            \n                                  <div class=\"col-12\">\n                                    <div class=\"spacer40\"></div>\n                                  </div>\n                            \n                                  <div class=\"row\">\n                                    <div class=\"col-4\">\n                                      <div class=\"form-group-3\">\n                                        <label>{{'addForm.municipality' | translate}}</label>\n                                        <input (keydown.space)=\"$event.preventDefault();\" autocomplete=\"off\"  type=\"text\" class=\"form-control\" [(ngModel)]=\"model.municipality\"\n                                          name=\"municipality\">\n                                      </div>\n                                    </div>\n                                    <div class=\"col-4\">\n                                      <div class=\"form-group-3\">\n                                        <label>{{'filters.location.country' | translate}}</label>\n                                        <select class=\"form-control\" (change)=\"getStatesNew1($event.target.value)\" *ngIf=\"parameter?.countriesAdd\">\n                                          <option value=\"\" disabled>{{'filters.location.selectCountry' | translate}}</option>\n                                          <option value=\"0\" [selected]=\"location.countries!='' && location.countries==0\">{{'filters.location.allOption' | translate}}</option>\n                                          <option *ngFor=\"let countryAdd of parameter.countriesAdd\" [selected]=\"countryAdd.id == model.country_id\" value=\"{{countryAdd.id}}\">{{countryAdd.name}}</option>\n                                          <option value=\"other\">{{'filters.location.other' | translate}}</option>\n                                        </select>\n                                      <div>\n                                        <input *ngIf=\"showInput\" [(ngModel)]=\"model.country_name\" (ngModelChange)=\"modelChanged()\" name=\"country_name\" autocomplete=\"off\" type=\"text\" class=\"form-control\" placeholder=\"Enter Country Name\" style=\"margin-top: 20px;\">\n                                      </div>\n                                      </div>\n                                    </div>\n                                    <div class=\"col-4\">\n                                      <div class=\"form-group-3\">\n                                        <label>{{'filters.location.state' | translate}}</label>\n                                  <select class=\"form-control\" (change)=\"getCitiesNew1($event.target.value)\" *ngIf=\"!showInput && parameter?.statesAdd\">\n                                    <option value=\"\" disabled>{{'filters.location.selectState' | translate}}</option>\n                                    <option value=\"0\" [selected]=\"location.states!='' && location.states==0\">{{'filters.location.allOption' | translate}}</option>\n                                    <option *ngFor=\"let stateAdd of parameter.statesAdd\" [selected]=\"stateAdd.id == model.state_id\" value=\"{{stateAdd.id}}\">{{stateAdd.name}}</option>\n                                  </select>\n                                  <input *ngIf=\"showInput\" [attr.disabled]=\"stateDisable? '' : null\" [(ngModel)]=\"model.state_name\" (ngModelChange)=\"modelChanged()\" name=\"state_name\" autocomplete=\"off\" type=\"text\" class=\"form-control\" placeholder=\"Enter State Name\">\n                                      </div>\n                                    </div>\n                                  </div>\n                            \n                                  <div class=\"col-12\">\n                                    <div class=\"spacer40\"></div>\n                                  </div>\n                            \n                                  <div class=\"row\">\n                                    <div class=\"col-4\">\n                                      <div class=\"form-group-3\">\n                                        <label>{{'filters.location.city' | translate}}</label>\n                                        <select class=\"form-control\" (change)=\"getLocalitiesNew($event.target.value)\" *ngIf=\"!showInput && parameter?.citiesAdd\">\n                                        <option value=\"\" disabled>{{'filters.location.selectCity' | translate}}</option>\n                                        <option value=\"0\" [selected]=\"location.cities!='' && location.cities==0\">{{'filters.location.allOption' | translate}}</option>\n                                        <option *ngFor=\"let cityAdd of parameter.citiesAdd\" [selected]=\"cityAdd.id == model.city_id\" value=\"{{cityAdd.id}}\">{{cityAdd.name}}</option>\n                                      </select>\n                                      <input *ngIf=\"showInput\" [attr.disabled]=\"cityDisable? '' : null\" [(ngModel)]=\"model.city_name\" name=\"city_name\" autocomplete=\"off\" type=\"text\" class=\"form-control\" placeholder=\"Enter City Name\">\n                                      </div>\n                                    </div>\n                                    <div class=\"col-4\">\n                                      <div class=\"form-group-3\">\n                                        <label>{{'addForm.ZIP' | translate}}</label>\n                                        <input minlength=\"8\" maxlength=\"15\" autocomplete=\"off\" type=\"text\" \n                                          class=\"form-control\" id=\"zipcode\" minlength=\"1\" [(ngModel)]=\"model.zipcode\" name=\"zipcode\"\n                                           />\n                                      </div>\n                                    </div>\n                                  </div>\n                            \n                                  <div class=\"col-12\">\n                                    <div class=\"spacer40\"></div>\n                                  </div>\n                            \n                                  <div class=\"row\">\n                                    <div class=\"col-12\">\n                                      <div class=\"form-group-3-2\">\n                                        <label>{{'addForm.address' | translate}}\n                                        </label>\n                                        <input placeholder=\"{{'addForm.placeholder.searchForAddress' | translate}}\" autocorrect=\"off\"\n                                          autocapitalize=\"off\" spellcheck=\"off\" type=\"text\" class=\"form-control\" #search\n                                          (input)=\"loadPlaces('developer_address', 'lat', 'lng', 'searchElementRef')\" name=\"developer_address\"\n                                          [(ngModel)]=\"model.developer_address\" autocomplete=\"off\">\n                                      </div>\n                                    </div>\n                                    <div class=\"col-12\">\n                                      <div class=\"form-group-3-2\">\n                                        <label>{{'addForm.googleSearchAddress' | translate}}\n                                          <!-- <span class=\"color-red\">*</span> -->\n                                        </label>\n                                        <agm-map class=\"height200\" [latitude]=\"model.lat\" [longitude]=\"model.lng\" [scrollwheel]=\"false\"\n                                          (mapClick)=\"placeMarker($event, 'developer_address', 'lat', 'lng')\" [zoom]=\"constant.zoom\">\n                                          <agm-marker [latitude]=\"model.lat\" [longitude]=\"model.lng\"></agm-marker>\n                                        </agm-map>\n                                      </div>\n                                    </div>\n                                  </div>\n                                </div>\n                            \n                                <div class=\"col-12\">\n                                  <div class=\"spacer40\"></div>\n                                </div>\n                            \n                                <div class=\"white-bg padding40\">\n                                  <h3>{{'addForm.legalRepresentativeInfo' | translate}}</h3>\n                                  <div class=\"col-12\">\n                                    <div class=\"spacer40\"></div>\n                                  </div>\n                                  <div class=\"row\">\n                                    <div class=\"col-4\">\n                                      <div class=\"form-group-3\">\n                                        <label>{{'addForm.names' | translate}}\n                                          <!-- <span class=\"color-red\">*</span> -->\n                                        </label>\n                                        <input autocomplete=\"off\" minlength=\"1\" maxlength=\"50\" [pattern]=\"constant.onlyWhiteSpaces\" type=\"text\"\n                                          class=\"form-control\" [(ngModel)]=\"model.legal_representative.name\" name=\"name\">\n                                      </div>\n                                    </div>\n                                    <div class=\"col-4\">\n                                      <div class=\"form-group-3\">\n                                        <label>{{'addForm.firstSurname' | translate}}\n                                          <!-- <span class=\"color-red\">*</span> -->\n                                        </label>\n                                        <input autocomplete=\"off\" minlength=\"1\" maxlength=\"30\" [pattern]=\"constant.onlyWhiteSpaces\" type=\"text\"\n                                          class=\"form-control\" [(ngModel)]=\"model.legal_representative.first_surname\" name=\"first_surname\">\n                                      </div>\n                                    </div>\n                                    <div class=\"col-4\">\n                                      <div class=\"form-group-3\">\n                                        <label>{{'addForm.secondSurname' | translate}}\n                                          <!-- <span class=\"color-red\">*</span> -->\n                                        </label>\n                                        <input autocomplete=\"off\" minlength=\"1\" maxlength=\"30\" [pattern]=\"constant.onlyWhiteSpaces\" type=\"text\"\n                                          class=\"form-control\" [(ngModel)]=\"model.legal_representative.second_surname\" name=\"second_surname\">\n                                      </div>\n                                    </div>\n                                  </div>\n                            \n                                  <div class=\"col-12\">\n                                    <div class=\"spacer40\"></div>\n                                  </div>\n                            \n                                  <div class=\"row\">\n                                    <div class=\"col-4\">\n                                      <div class=\"form-group-3\">\n                                        <label>{{'addForm.contactNumber' | translate}}</label>\n                                        <input minlength=\"8\" maxlength=\"15\" autocomplete=\"off\" type=\"text\" [pattern]=\"constant.phonePattern\"\n                                          class=\"form-control\" id=\"phone\" [(ngModel)]=\"model.legal_representative.phone\"\n                                          name=\"legal_representative_phone\" ng2TelInput [ng2TelInputOptions]=\"initialCountry\"\n                                          (countryChange)=\"onCountryChange($event)\" />\n                                      </div>\n                                    </div>\n                                    <div class=\"col-4\">\n                                      <div class=\"form-group-3\">\n                                        <label>{{'addForm.emailId' | translate}}</label>\n                                        <input (keydown.space)=\"$event.preventDefault();\" autocomplete=\"off\" [pattern]=\"constant.emailPattern\"\n                                          type=\"email\" class=\"form-control\" [(ngModel)]=\"model.legal_representative.email\" name=\"rep_email\">\n                                      </div>\n                                    </div>\n                                    <div class=\"col-4\">\n                                      <div class=\"form-group-3\">\n                                        <label>{{'addForm.fedralTaxPayerRegistry' | translate}}</label>\n                                        <input autocomplete=\"off\" minlength=\"13\" maxlength=\"13\" [pattern]=\"constant.onlyWhiteSpaces\" type=\"text\"\n                                          class=\"form-control\" [(ngModel)]=\"model.legal_representative.fed_tax_pay\" name=\"le_fed_tax_pay\">\n                                      </div>\n                                    </div>\n                                  </div>\n                            \n                                  <div class=\"col-12\">\n                                    <div class=\"spacer40\"></div>\n                                  </div>\n                            \n                                  <div class=\"row\">\n                                    <div class=\"col-12\">\n                                      <label>{{'addCollection.bankAccount' | translate}}\n                                        <!-- <span class=\"color-red\">*</span> -->\n                                        <span class=\"pull-right\"><a class=\"add\" (click)=\"addLegalEntityBank($event)\"\n                                            href=\"javascript://\">{{'addCollection.addNewBankAccount' | translate}}</a></span>\n                                      </label>\n                                      <div class=\"row\" *ngFor=\"let leBankAccount of model.legal_representative.legal_rep_banks; let i=index\">\n                                        <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n                                          <div class=\"form-group-3\">\n                                            <label>{{'addCollection.bankName' | translate}}</label>\n                                            <div class=\"clearfix\"></div>\n                                            <input autocomplete=\"off\" minlength=\"1\" maxlength=\"30\" class=\"form-control\" type=\"text\"\n                                              [(ngModel)]=\"leBankAccount.bank_name\" name=\"le_bank_name{{i}}\">\n                                          </div>\n                                        </div>\n                                        <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n                                          <div class=\"form-group-3\">\n                                            <label>{{'addCollection.accountNumber' | translate}}</label>\n                                            <div class=\"clearfix\"></div>\n                                            <input autocomplete=\"off\" class=\"form-control\" type=\"text\" minlength=\"9\" maxlength=\"20\"\n                                              [pattern]=\"constant.accountPattern\" [(ngModel)]=\"leBankAccount.account_number\"\n                                              name=\"le_account_number{{i}}\">\n                                          </div>\n                                        </div>\n                                        <div class=\"col-lg-2 col-md-6 col-sm-6 col-12\">\n                                          <div class=\"form-group-3\">\n                                            <label>{{'addCollection.clabeSwift' | translate}}</label>\n                                            <div class=\"clearfix\"></div>\n                                            <input autocomplete=\"off\" class=\"form-control\" type=\"text\" [(ngModel)]=\"leBankAccount.swift\"\n                                              name=\"le_swift{{i}}\">\n                                          </div>\n                                        </div>\n                                        <div class=\"col-lg-2 col-md-6 col-sm-6 col-12\">\n                                          <div class=\"form-group-3\">\n                                            <label>{{'addCollection.currency' | translate}}</label>\n                                            <div class=\"clearfix\"></div>\n                                            <select name=\"le_currency_id{{i}}\" [(ngModel)]=\"leBankAccount.currency_id\" class=\"form-control\">\n                                              <option value=\"\">{{'addCollection.currency' | translate}}</option>\n                                              <option value=\"{{c.id}}\" *ngFor=\"let c of currencies\">{{ c?.code }} | {{c?.currency}}</option>\n                                            </select>\n                                          </div>\n                                        </div>\n                                        <div class=\"col-lg-2 col-md-6 col-sm-6 col-12\">\n                                          <div class=\"form-group-3\">\n                                            <label>{{'addCollection.remove' | translate}}</label>\n                                            <div class=\"clearfix\"></div>\n                                            <button type=\"button\" (click)=\"removeLegalEntityBank($event, leBankAccount, i)\">{{'addCollection.remove'\n                                              |\n                                              translate}}</button>\n                                          </div>\n                                        </div>\n                                      </div>\n                                    </div>\n                                  </div>\n                                </div>\n                          </div>\n                      </div>\n                  </div>\n              </div>\n          </div>\n      </section>\n    </div>\n\n     <!-- space -->\n    <div class=\"col-12\">\n      <div class=\"spacer40\"></div>\n    </div>\n     <!-- space -->\n    <!-- Street Address,External Number,Internal Number,Neighborhood,Municipality,City,ZIP code,State,Address -->\n   \n  </form>"

/***/ }),

/***/ "./src/app/layout/users/edit-user/edit-user.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/layout/users/edit-user/edit-user.component.ts ***!
  \***************************************************************/
/*! exports provided: EditUserComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditUserComponent", function() { return EditUserComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_models_users_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/users.model */ "./src/app/models/users.model.ts");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var src_app_models_legalEntity_model__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/models/legalEntity.model */ "./src/app/models/legalEntity.model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var EditUserComponent = /** @class */ (function () {
    function EditUserComponent(constant, cs, mapsAPILoader, ngZone, admin, route, spinner, translate, router) {
        this.constant = constant;
        this.cs = cs;
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.admin = admin;
        this.route = route;
        this.spinner = spinner;
        this.translate = translate;
        this.router = router;
        this.parameter = {};
        this.show = false;
        this.currencies = Array();
        this.location = {};
        this.marrital_status_list = Array();
        this.showInput = false;
    }
    EditUserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.language_code = localStorage.getItem('language_code');
        this.initModel();
        this.getCountries();
        this.getMarritalStatusList();
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.p = this.constant.p;
        this.getCurrencies();
        this.parameter.sub = this.route.params.subscribe(function (params) {
            if (params['id']) {
                _this.model.id = params['id'];
                _this.getUserById(_this.model.id);
            }
            else {
                _this.model.id = '';
            }
        });
    };
    EditUserComponent.prototype.initModel = function () {
        this.initialCountry = { initialCountry: this.constant.country_code };
        this.model = new src_app_models_users_model__WEBPACK_IMPORTED_MODULE_2__["Users"]();
        this.model.legal_rep_banks = new Array();
        this.model.legal_representative = new src_app_models_legalEntity_model__WEBPACK_IMPORTED_MODULE_9__["LegalRepresentative"]();
        this.setCurrentPosition();
        this.model.country_code = this.constant.country_code;
        this.model.dial_code = this.constant.dial_code;
    };
    EditUserComponent.prototype.getCurrencies = function () {
        var _this = this;
        this.admin.postDataApi('getCurrencies', {})
            .subscribe(function (success) {
            _this.currencies = success.data;
        });
    };
    EditUserComponent.prototype.getUserById = function (id) {
        var _this = this;
        this.spinner.show();
        this.admin.postDataApi('getUserById', { 'user_id': id })
            .subscribe(function (success) {
            _this.spinner.hide();
            _this.model = new src_app_models_users_model__WEBPACK_IMPORTED_MODULE_2__["Users"]();
            _this.model = success.data;
            // this.model.legal_representative = new LegalRepresentative();
            _this.model.legal_rep_banks = success.data.legal_rep_banks;
            _this.model.legal_representative = success.data.legal_representative || new src_app_models_legalEntity_model__WEBPACK_IMPORTED_MODULE_9__["LegalRepresentative"]();
            _this.model.legal_representative.legal_rep_banks = success.data.legal_representative.legal_rep_banks; // Array(new Banks());
            _this.image = _this.model.image;
            _this.model.country_id ? _this.getStatesNew1(_this.model.country_id) : undefined;
            _this.model.state_id ? _this.getCitiesNew1(_this.model.state_id) : undefined;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    EditUserComponent.prototype.set = function () {
        this.show = true;
    };
    EditUserComponent.prototype.changeListner = function (event, param) {
        var _this = this;
        if (event.target.files[0].size > this.constant.fileSizeLimit) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.fileSizeExceeds'), 'error');
            return false;
        }
        var reader = new FileReader();
        reader.onload = function (e) {
            _this[param] = e.target.result;
            _this.spinner.show();
            _this.cs.saveImage(event.target.files[0]).subscribe(function (success) {
                _this.spinner.hide();
                _this.model[param] = success['data'].image;
            });
        };
        reader.readAsDataURL(event.target.files[0]);
    };
    EditUserComponent.prototype.onCountryChange = function (e) {
        // this.model.country_code = e.iso2;
        // this.model.dial_code = '+' + e.dialCode;
        // this.initialCountry = {initialCountry: e.iso2};
    };
    EditUserComponent.prototype.add = function (formData) {
        var _this = this;
        var modelSave = JSON.parse(JSON.stringify(this.model));
        if (modelSave.legal_representative.phone) {
            modelSave.legal_representative.country_code = modelSave.legal_representative.country_code || this.constant.country_code;
            modelSave.legal_representative.dial_code = modelSave.legal_representative.dial_code || this.constant.dial_code;
        }
        if (modelSave.developer_address && (!modelSave.lat || !modelSave.lng)) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseAddressFromDropdown'), 'error');
            return;
        }
        // if (!modelSave.country_name && !modelSave.state_name && !modelSave.city_name && this.showInput) {
        //   swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterAllCountryStateAndCity'), 'error');
        //   return;
        // }
        if (this.showInput) {
            modelSave.country_id = 0;
            modelSave.state_id = 0;
            modelSave.city_id = 0;
        }
        if (modelSave.images) {
            modelSave.images = modelSave.images.map(function (r) { return r.image; });
        }
        if (modelSave.legal_representative.name || modelSave.legal_representative.first_surname || modelSave.legal_representative.phone
            || modelSave.legal_representative.email) {
            // if any of key present, then all must be entered
            if (!modelSave.legal_representative.name) {
                swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterLegalRepresentativeName'), 'error');
                return;
            }
            if (!modelSave.legal_representative.first_surname) {
                swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterLegalRepresentativeFirstName'), 'error');
                return;
            }
            if (!modelSave.legal_representative.phone) {
                swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterLegalRepresentativePhone'), 'error');
                return;
            }
            if (!modelSave.legal_representative.email) {
                swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterLegalRepresentativeEmail'), 'error');
                return;
            }
            // if (!modelSave.legal_representative.fed_tax_pay) {
            //   swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterLegalRepresentativeFTPR'), 'error');
            //   return;
            // }
        }
        if (!modelSave.legal_representative.name || !modelSave.legal_representative.first_surname || !modelSave.legal_representative.phone
            || !modelSave.legal_representative.email) {
            delete modelSave.legal_representative;
        }
        if (modelSave['legal_rep_banks'] && modelSave['legal_rep_banks'].length > 0) {
            var i = 0;
            for (var index = 0; index < modelSave['legal_rep_banks'].length; index++) {
                var element = modelSave['legal_rep_banks'][index];
                if (!element.bank_name || !element.account_number || !element.swift || !element.currency_id) {
                    i = i + 1;
                    swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterBankDetails'), 'error');
                    return;
                }
            }
        }
        if (modelSave['legal_representative'] &&
            modelSave['legal_representative']['legal_rep_banks'] && modelSave['legal_representative']['legal_rep_banks'].length > 0) {
            var i = 0;
            for (var index = 0; index < modelSave['legal_representative']['legal_rep_banks'].length; index++) {
                var element = modelSave['legal_representative']['legal_rep_banks'][index];
                if (!element.bank_name || !element.account_number || !element.swift || !element.currency_id) {
                    i = i + 1;
                    swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterBankDetails'), 'error');
                    return;
                }
            }
        }
        this.spinner.show();
        this.admin.postDataApi('addSeller', modelSave)
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
                if (_this.model.id === '') {
                    _this.router.navigate(['/dashboard/users']);
                }
                else {
                    _this.model = success.data;
                    _this.model.legal_rep_banks = success.data.legal_rep_banks || [];
                    _this.model.legal_representative = success.data.legal_representative || new src_app_models_legalEntity_model__WEBPACK_IMPORTED_MODULE_9__["LegalRepresentative"]();
                    _this.model.legal_representative.legal_rep_banks = success.data.legal_representative.legal_rep_banks || [];
                    _this.getCountries();
                    _this.model.country_id ? _this.getStatesNew1(_this.model.country_id) : undefined;
                    _this.model.state_id ? _this.getCitiesNew1(_this.model.state_id) : undefined;
                }
            }
        }, function (error) {
            _this.spinner.hide();
        });
    };
    EditUserComponent.prototype.loadPlaces = function (paramAdd, paramLat, paramLng, searchRef) {
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
    EditUserComponent.prototype.setCurrentPosition = function () {
        var _this = this;
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                // setting address lat lng
                _this.model.lat = _this.model.lat ? _this.model.lat : position.coords.latitude;
                _this.model.lng = _this.model.lng ? _this.model.lng : position.coords.longitude;
                // setting branch office lat lng
                _this.model.branch_lat = _this.model.branch_lat ? _this.model.branch_lat : position.coords.latitude;
                _this.model.branch_lng = _this.model.branch_lng ? _this.model.branch_lng : position.coords.longitude;
            });
        }
    };
    EditUserComponent.prototype.placeMarker = function ($event, addParam, paramLat, paramLng) {
        this.model[paramLat] = $event.coords.lat;
        this.model[paramLng] = $event.coords.lng;
        this.getGeoLocation(addParam, this.model[paramLat], this.model[paramLng]);
    };
    EditUserComponent.prototype.getGeoLocation = function (addParam, lat, lng) {
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
    EditUserComponent.prototype.addLegalEntityBank = function (e) {
        var bank = new src_app_models_legalEntity_model__WEBPACK_IMPORTED_MODULE_9__["Banks"]();
        this.model.legal_representative.legal_rep_banks = this.model.legal_representative.legal_rep_banks || [];
        this.model.legal_representative.legal_rep_banks.push(bank);
    };
    EditUserComponent.prototype.removeLegalEntityBank = function ($event, item, i) {
        var _this = this;
        $event.stopPropagation();
        this.model.legal_representative.legal_rep_banks.splice(i, 1);
        if (item.id) {
            this.admin.postDataApi('deleteLegalRepBank', { id: item.id }).subscribe(function (success) {
                _this.spinner.hide();
            }, function (error) {
                _this.spinner.hide();
            });
        }
    };
    EditUserComponent.prototype.addDeveloperBank = function (e) {
        var bank = new src_app_models_legalEntity_model__WEBPACK_IMPORTED_MODULE_9__["Banks"]();
        this.model.legal_rep_banks.push(bank);
    };
    EditUserComponent.prototype.removeDeveloperBank = function ($event, item, i) {
        var _this = this;
        $event.stopPropagation();
        this.model.legal_rep_banks.splice(i, 1);
        if (item.id) {
            this.admin.postDataApi('deleteLegalRepBank', { id: item.id }).subscribe(function (success) {
                _this.spinner.hide();
            }, function (error) {
                _this.spinner.hide();
            });
        }
    };
    EditUserComponent.prototype.selectGender = function (gender) {
        this.model.gender = gender;
    };
    EditUserComponent.prototype.isChecked = function (gender) {
        return gender == this.model.gender ? true : false;
    };
    EditUserComponent.prototype.getCountries = function () {
        var _this = this;
        var self = this;
        this.parameter.statesAdd = [];
        this.parameter.citiesAdd = [];
        this.parameter.localitiesAdd = [];
        this.parameter.buildingsAdd = [];
        this.admin.postDataApi('getUserCountries', {})
            .subscribe(function (success) {
            _this.parameter.countriesAdd = success.data;
            _this.location.countries = '0';
            _this.location.states = '0';
            _this.location.cities = '0';
        });
    };
    EditUserComponent.prototype.getMarritalStatusList = function () {
        var _this = this;
        this.admin.postDataApi('getmaritalStatus', {}).subscribe(function (r) {
            _this.marrital_status_list = r['data'];
        });
    };
    EditUserComponent.prototype.getMaritalStatus = function (maritalStatusId) {
        this.model.marital_statuses_id = maritalStatusId;
    };
    EditUserComponent.prototype.getStatesNew1 = function (countryId) {
        var _this = this;
        this.parameter.citiesAdd = [];
        this.parameter.localitiesAdd = [];
        this.parameter.buildingsAdd = [];
        this.parameter.country_id = countryId;
        if (countryId !== '' && countryId !== '0' && countryId != 'other') {
            this.admin.postDataApi('country/getUserStates', { country_id: countryId })
                .subscribe(function (success) {
                _this.showInput = false;
                _this.parameter.statesAdd = success.data;
                _this.location.countries = countryId;
                _this.model.country_id = countryId;
                _this.location.states = _this.model.state_id;
                _this.location.cities = '0';
                _this.location.localities = '0';
            });
        }
        else {
            if (countryId == 'other') {
                this.showInput = true;
                this.model.country_name = null;
                this.model.state_name = null;
                this.model.city_name = null;
                this.stateDisable = true;
                this.cityDisable = true;
            }
            else {
                this.showInput = false;
                this.parameter.statesAdd = [];
                this.location.countries = countryId;
                this.model.country_id = countryId;
                this.location.states = '0';
                this.location.cities = '0';
            }
        }
    };
    EditUserComponent.prototype.getCitiesNew1 = function (state_id) {
        var _this = this;
        this.parameter.localitiesAdd = [];
        this.parameter.state_id = state_id;
        if (state_id !== '' && state_id !== '0') {
            this.admin.postDataApi('UsergetCities', { state_id: state_id })
                .subscribe(function (success) {
                _this.parameter.citiesAdd = success.data;
                _this.location.states = state_id;
                _this.model.state_id = state_id;
                _this.location.cities = _this.model.city_id;
            });
        }
        else {
            this.parameter.citiesAdd = [];
            this.location.states = state_id;
            this.model.state_id = state_id;
            this.location.cities = '0';
        }
    };
    EditUserComponent.prototype.getLocalitiesNew = function (city_id) {
        this.parameter.city_id = city_id;
        this.model.city_id = city_id;
        this.location.cities = city_id;
        if (city_id === '' || city_id === '0') {
            return false;
        }
    };
    EditUserComponent.prototype.modelChanged = function () {
        if (!this.model.country_name) {
            this.stateDisable = true;
            this.cityDisable = true;
            this.model.state_name = null;
            this.model.city_name = null;
        }
        else if (this.model.country_name && !this.model.state_name) {
            this.stateDisable = false;
        }
        else if (this.model.country_name && this.model.state_name) {
            this.cityDisable = false;
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('mapDiv'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], EditUserComponent.prototype, "mapDiv", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('search'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], EditUserComponent.prototype, "searchElementRef", void 0);
    EditUserComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-edit-user',
            template: __webpack_require__(/*! ./edit-user.component.html */ "./src/app/layout/users/edit-user/edit-user.component.html"),
            styles: [__webpack_require__(/*! ./edit-user.component.css */ "./src/app/layout/users/edit-user/edit-user.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["Constant"],
            src_app_services_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"],
            _agm_core__WEBPACK_IMPORTED_MODULE_3__["MapsAPILoader"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"],
            src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_7__["AdminService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_4__["NgxSpinnerService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__["TranslateService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], EditUserComponent);
    return EditUserComponent;
}());



/***/ }),

/***/ "./src/app/layout/users/users.component.css":
/*!**************************************************!*\
  !*** ./src/app/layout/users/users.component.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".add-img{\n    background-size: cover;background-repeat: no-repeat;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L3VzZXJzL3VzZXJzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSx1QkFBdUIsNkJBQTZCO0NBQ3ZEIiwiZmlsZSI6InNyYy9hcHAvbGF5b3V0L3VzZXJzL3VzZXJzLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYWRkLWltZ3tcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO2JhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG59Il19 */"

/***/ }),

/***/ "./src/app/layout/users/users.component.html":
/*!***************************************************!*\
  !*** ./src/app/layout/users/users.component.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container-fluid\">\n  <div class=\"row\">\n      <div class=\"col-md-6 col-6\">\n        <div class=\"title-group\">\n            <h5>{{'viewUsers.label' | translate}}</h5>\n            <p>{{'table.pagination.showing' | translate}} {{parameter.items?.length}} {{'table.pagination.outof' | translate}} {{parameter.total}}</p>\n        </div>\n      </div>\n      <div class=\"col-md-6 col-6\">\n        <div class=\"btn-cont text-right\">\n            <a style=\"display: none;\" class=\"btn btn-primary\" href=\"javascript://\" data-toggle=\"modal\" data-target=\"#add\" #modalOpen>{{'table.addNewBtn' | translate}}</a>\n            <a *ngIf=\"admin?.admin_acl['User Management']?.can_create==1\" \n              routerLink=\"/dashboard/users/add-user\"\n              class=\"btn btn-primary\" href=\"javascript://\">{{'table.addNewBtn' | translate}}</a>\n            <!-- <a *ngIf=\"admin?.admin_acl['User Management']?.can_create==1\" class=\"btn btn-primary\" href=\"javascript://\" data-toggle=\"modal\" data-target=\"#add\" #modalOpen>Add New</a> -->\n        </div>\n      </div>\n  </div>\n\n  <div class=\"cust-tabs\">\n    <!-- <div class=\"row flex-wrap-reverse\">\n      <div class=\"col-xl-10 col-lg-12 col-md-12 col-sm-12 col-12\">\n        <ul class=\"nav nav-tabs\">\n          <li class=\"nav-item\">\n              <a class=\"nav-link active\" (click)=\"getBuyers(1, 1, '', '', '')\" data-toggle=\"tab\" href=\"#approved\">BUYER</a>\n          </li>\n          <li class=\"nav-item\">\n              <a class=\"nav-link\" (click)=\"getBuyers(2, 1, '', '', '')\" data-toggle=\"tab\" href=\"#unapproved\">SELLER</a>\n          </li>\n        </ul>\n      </div>\n    </div> -->\n\n    <div class=\"tab-content white-bg\">\n      <div class=\"tab-pane active\">\n        <div class=\"tabel-section\">\n          <div class=\"table-responsive\">\n            <table class=\"table table-striped table-align-left\">\n              <tr>\n                <th style=\"width:6%\">&nbsp;\n                  <div class=\"table-search\">\n                    <div class=\"searh-3\">\n                      <select (change)=\"setUserType($event.target.value)\">\n                        <option value=\"1\">All</option>\n                        <option value=\"2\">Credit User</option>\n                      </select>\n                    </div>\n                </div>\n                </th>\n                <th style=\"width:10%\">\n                  <div class=\"table-search\">\n                      <label>{{'table.th.name' | translate}}</label>\n                      <div class=\"searh-3\">\n                        <input type=\"text\" [(ngModel)]=\"parameter.name\" (keyup.enter)=\"getBuyers(parameter.type, parameter.page, parameter.name, parameter.phone, parameter.email)\" name=\"\">\n                        <button *ngIf=\"parameter.name\" (click)=\"getBuyers(parameter.type, parameter.page, parameter.name, parameter.phone, parameter.email)\"><i class=\"fa fa-search\"></i></button>\n                      </div>\n                  </div>\n                </th>\n                <th style=\"width:10%\">\n                  <div class=\"table-search\">\n                      <label>{{'table.th.firstSurname' | translate}}</label>\n                      <!-- <div class=\"searh-3\">\n                        <input type=\"text\" [(ngModel)]=\"parameter.name\" (keyup.enter)=\"getBuyers(parameter.type, parameter.page, parameter.name, parameter.phone, parameter.email)\" name=\"\">\n                        <button *ngIf=\"parameter.name\" (click)=\"getBuyers(parameter.type, parameter.page, parameter.name, parameter.phone, parameter.email)\"><i class=\"fa fa-search\"></i></button>\n                      </div> -->\n                  </div>\n                </th>\n                <th style=\"width:10%\">\n                  <div class=\"table-search\">\n                      <label>{{'table.th.secondSurname' | translate}}</label>\n                      <!-- <div class=\"searh-3\">\n                        <input type=\"text\" [(ngModel)]=\"parameter.name\" (keyup.enter)=\"getBuyers(parameter.type, parameter.page, parameter.name, parameter.phone, parameter.email)\" name=\"\">\n                        <button *ngIf=\"parameter.name\" (click)=\"getBuyers(parameter.type, parameter.page, parameter.name, parameter.phone, parameter.email)\"><i class=\"fa fa-search\"></i></button>\n                      </div> -->\n                  </div>\n                </th>\n                <th style=\"width:20%; text-align:left;\">\n                  <div class=\"table-search\">\n                      <label>{{'table.th.contactNumber' | translate}}</label>\n                      <div class=\"searh-3\">\n                        <input type=\"text\" [(ngModel)]=\"parameter.phone\" (keyup.enter)=\"getBuyers(parameter.type, parameter.page, parameter.name, parameter.phone, parameter.email)\" name=\"\">\n                        <button *ngIf=\"parameter.phone\" (click)=\"getBuyers(parameter.type, parameter.page, parameter.name, parameter.phone, parameter.email)\"><i class=\"fa fa-search\"></i></button>\n                      </div>\n                  </div>\n                </th>\n                <th style=\"width:20%\">\n                  <div class=\"table-search\">\n                      <label>{{'table.th.emailAddress' | translate}}</label>\n                      <div class=\"searh-3\">\n                        <input (keydown.space)=\"$event.preventDefault();\" type=\"text\" [(ngModel)]=\"parameter.email\" (keyup.enter)=\"getBuyers(parameter.type, parameter.page, parameter.name, parameter.phone, parameter.email)\" name=\"\">\n                        <button *ngIf=\"parameter.email\" (click)=\"getBuyers(parameter.type, parameter.page, parameter.name, parameter.phone, parameter.email)\"><i class=\"fa fa-search\"></i></button>\n                      </div>\n                  </div>\n                </th>\n                <th style=\"width:20%; vertical-align: top;\" *ngIf=\"parameter.type==1\">\n                  <div class=\"table-search\">\n                    <label>{{'table.th.interestedIn' | translate}}</label>\n                  </div>\n                </th>\n                <th style=\"width:10%; vertical-align: top;\" *ngIf=\"parameter.type==2\">\n                  <div class=\"table-search\">\n                    <label>{{'table.th.properties' | translate}}</label>\n                    <a (click)=\"sortData(parameter.property_sort==2?1:2, 'property_sort')\" href=\"javascript://\"><img [ngClass]=\"{'upsidedown':parameter.property_sort==2}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n                  </div>\n                </th>\n                <th style=\"width:14%\">\n                  &nbsp;\n                </th>\n              </tr>\n        \n              <tr *ngFor=\"let item of parameter.items| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: parameter.total }; let i=index\">\n                <td> \n                    <img *ngIf=\"item.image\" [defaultImage]=\"item.image| img:'thumb'\" [lazyLoad]=\"item.image\" class=\"rounded-circle\" alt=\"img\">\n                    <img *ngIf=\"!item.image\" class=\"rounded-circle\" src=\"assets/img/default_img.png\" alt=\"img\">\n                </td>\n                <td class=\"text-left\">\n                    <a class=\"text-ellipsis\" data-toggle=\"popover\" data-placement=\"top\" title=\"{{item.name}}\">\n                      {{item.name | titlecase}}\n                      <!-- {{item.first_surname ? (item.first_surname | titlecase) : ''}}\n                      {{item.second_surname ? (item.second_surname | titlecase) : ''}} -->\n                    </a>\n                </td>\n                <td class=\"text-left\">\n                  {{item.first_surname ? (item.first_surname | titlecase) : 'NA'}}\n                </td>\n                <td class=\"text-left\">\n                  {{item.second_surname ? (item.second_surname | titlecase) : 'NA'}}\n                </td>\n                <td class=\"text-left\" *ngIf=\"item.phone\">{{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}</td>\n                <td class=\"text-left\" *ngIf=\"!item.phone\">{{'table.tr.td.NA' | translate}}</td>\n                <td class=\"text-left\">{{item.email}}</td>\n                <td *ngIf=\"parameter.type==1\">\n                  <span *ngFor=\"let interest of item.interests; let ii=index\">\n                    <app-property-configuration *ngIf=\"interest\" [configuration]=\"interest\"></app-property-configuration>\n                    <span *ngIf=\"ii<item.interests?.length-1\">, </span>\n                  </span>\n                  <span *ngIf=\"item.interests?.length == 0\">{{'table.tr.td.NA' | translate}}</span>\n                </td>\n                <td *ngIf=\"parameter.type==2\">{{item.properties_count}}</td>\n                <td>\n                  <div class=\"table-actions\">\n                      <!-- <a href=\"javascript://\" (click)=\"editUser(item, i)\" class=\"icon-block edit-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></a>\n                      <a href=\"javascript://\" *ngIf=\"item.is_blocked == 1\" (click)=\"blockUnblockPopup(i, item.id, 0, parameter.type)\" title=\"Unblock user\" class=\"icon-block block-icon unblock-bg\"><img src=\"assets/img/block.png\" alt=\"img\"></a>\n                      <a href=\"javascript://\" *ngIf=\"item.is_blocked == 0\" (click)=\"blockUnblockPopup(i, item.id, 1, parameter.type)\" title=\"Block user\" class=\"icon-block block-icon\"><img src=\"assets/img/unblock.png\" alt=\"img\"></a> -->\n                      <button title=\"{{'table.title.editDetails' | translate}}\" [disabled]=\"admin?.admin_acl['User Management']?.can_update==0\" (click)=\"editUser(item, i)\" class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></button>\n                      <!-- <button title=\"{{'table.title.addLegalEntity' | translate}}\" \n                      [disabled]=\"admin?.admin_acl['User Management']?.can_update==0\" \n                      (click)=\"addLegalEntity(item, i)\" class=\"action-icon\"><img src=\"assets/img/stamp.png\" alt=\"img\"></button> -->\n                      <button [disabled]=\"admin?.admin_acl['User Management']?.can_delete==0\"\n                        (click)=\"blockUnblockPopup(i, item.id, item.is_blocked==1?0:1, parameter.type)\" \n                        title=\"{{item.is_blocked==1 ? ('table.title.unblock' | translate) : ('table.title.block' | translate)}}\" [ngClass]=\"{'unblock-bg':item.is_blocked==1}\"\n                        class=\"action-icon\"><img src=\"assets/img/block.png\" alt=\"img\">\n                      </button>\n                      <button [disabled]=\"admin?.admin_acl['User Management']?.can_purge==0\"\n                        (click)=\"deletePopup(i, item.id, parameter.type)\" \n                        title=\"{{'table.title.delete' | translate}}\"\n                        class=\"action-icon\"><img src=\"assets/img/ic_delete.png\" alt=\"img\">\n                      </button>\n                  </div>\n                </td>\n              </tr>\n\n            </table>\n          </div>\n        </div>\n\n        <div class=\"center\" *ngIf=\"parameter.total == 0\">\n          <img src=\"assets/img/404-error.png\">\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"btn-cont text-right marginT15\" *ngIf=\"parameter.total\">\n    <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n  </div>\n  \n</div>\n\n\n<!-- add inhouse user modal -->\n<div class=\"modal animated\" id=\"add\">\n  <div class=\"modal-dialog fadeIndown\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n          <button style=\"display: none;\" type=\"button\" class=\"close\" data-dismiss=\"modal\" #modalClose>&times;</button>\n          <button type=\"button\" class=\"close\" (click)=\"closeModal(); addForm.reset()\">&times;</button>\n      </div>\n\n      <form class=\"form-horizontal form-model0P\" role=\"form\" ngNativeValidate #addForm=\"ngForm\" (ngSubmit)=\"addNewUser(addForm)\">\n        <div class=\"modal-body\">\n          <div class=\"row\">\n            <div class=\"col-8\">\n              <div class=\"add-img\" style=\"display:flex;\">\n                <img *ngIf=\"image\" [src]=\"image\" style=\"object-fit: cover; width: 100%;\">\n                <label *ngIf=\"model.image\">\n                  <input accept=\"image/*\" name=\"image\" class=\"image\" (change)=\"changeListner($event, 1)\" type=\"file\">\n                </label>\n                <label *ngIf=\"!image\">{{'addForm.image' | translate}}</label>\n                <input *ngIf=\"!image\" accept=\"image/*\" name=\"image\" class=\"image\" (change)=\"changeListner($event, 1)\" type=\"file\">\n              </div>\n            </div>\n            <div class=\"col-4\">\n              <div class=\"btn-cont text-right\">\n                  <button *ngIf=\"!model.id\" type=\"submit\" class=\"btn btn-primary-new\">{{'addForm.addBtn' | translate}}</button>\n                  <button *ngIf=\"model.id\" type=\"submit\" [disabled]=\"!addForm.valid\" class=\"btn btn-primary-new\">{{'addForm.updateBtn' | translate}}</button>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"spacer40\"></div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                  <label>{{'addForm.name' | translate}} <span class=\"color-red\">*</span></label>\n                  <div class=\"form-group\">\n                  <input autocomplete=\"off\" required type=\"text\" class=\"form-control\" #name=\"ngModel\" [(ngModel)]=\"model.name\" name=\"name\">\n                </div>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                  <label>{{'addForm.contactNumber' | translate}} <span class=\"color-red\">*</span></label>\n                  <div class=\"form-group\">\n                  <input minlength=\"6\" maxlength=\"16\" autocomplete=\"off\" type=\"text\" [pattern]=\"constant.phonePattern\" class=\"form-control\" id=\"phone\" required minlength=\"1\" [(ngModel)]=\"model.phone\" name=\"phone\"\n                      ng2TelInput\n                      (intlTelInputObject)=\"telInputObject($event)\" [ng2TelInputOptions]=\"initialCountry\" (countryChange)=\"onCountryChange($event)\" />\n                </div>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                  <label>{{'addForm.emailId' | translate}} <span class=\"color-red\">*</span></label>\n                  <div class=\"form-group\">\n                  <input (keydown.space)=\"$event.preventDefault();\" autocomplete=\"off\" required [pattern]=\"constant.emailPattern\" type=\"email\" class=\"form-control\" [(ngModel)]=\"model.email\" name=\"email\">\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n</div>\n\n\n\n<a href=\"javascript://\" data-toggle=\"modal\" data-target=\"#entityModal\" #entityModalOpen></a>\n<div class=\"modal animated\" id=\"entityModal\">\n    <div class=\"modal-dialog fadeIndown\">\n        <div class=\"modal-content notary-avail\">\n              <div class=\"modal-header popup-header\">\n          <h4>{{'manageUsers.addLegalEntity' | translate}}</h4>\n            <button style=\"display: none;\" type=\"button\" class=\"close\" data-dismiss=\"modal\" #entityModalClose>&times;</button>\n            <button type=\"button\" class=\"close\" (click)=\"closeEntityModal(); addForm.reset()\">&times;</button>\n        </div>\n  \n        <form class=\"form-horizontal padding0\" role=\"form\" ngNativeValidate #addForm=\"ngForm\" (ngSubmit)=\"addNewUser(addForm)\">\n          <div class=\"modal-body\">\n            <div class=\"row\">\n              <div class=\"col-12\">\n                <div class=\"spacer40\"></div>\n              </div>\n              <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                    <label>Company Name <span class=\"color-red\">*</span></label>\n                    <div class=\"form-group\">\n                    <input autocomplete=\"off\" required type=\"text\" class=\"form-control\" #name=\"ngModel\" [(ngModel)]=\"model.name\" name=\"name\">\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                    <label>{{'addForm.contactNumber' | translate}} <span class=\"color-red\">*</span></label>\n                    <div class=\"form-group\">\n                    <input minlength=\"6\" maxlength=\"16\" autocomplete=\"off\" type=\"text\" [pattern]=\"constant.phonePattern\" class=\"form-control\" id=\"phone\" required minlength=\"1\" [(ngModel)]=\"model.phone\" name=\"phone\"\n                        ng2TelInput\n                        (intlTelInputObject)=\"telInputObject($event)\" [ng2TelInputOptions]=\"initialCountry\" (countryChange)=\"onCountryChange($event)\" />\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                    <label>Federal Tax Payer Registry <span class=\"color-red\">*</span></label>\n                    <div class=\"form-group\">\n                    <input (keydown.space)=\"$event.preventDefault();\" autocomplete=\"off\" required [pattern]=\"constant.emailPattern\" type=\"email\" class=\"form-control\" [(ngModel)]=\"model.email\" name=\"email\">\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-12\">\n                <div class=\"btn-cont text-right\">\n                    <!-- <button *ngIf=\"!model.id\" type=\"submit\" class=\"btn btn-primary-new\">{{'addForm.addBtn' | translate}}</button>\n                    <button *ngIf=\"model.id\" type=\"submit\" [disabled]=\"!addForm.valid\" class=\"btn btn-primary-new\">{{'addForm.updateBtn' | translate}}</button> -->\n                </div>\n              </div>\n            </div>\n          </div>\n        </form>\n      </div>\n    </div>\n  </div>"

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
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
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
    function UsersComponent(constant, model, admin, spinner, translate, router) {
        this.constant = constant;
        this.model = model;
        this.admin = admin;
        this.spinner = spinner;
        this.translate = translate;
        this.router = router;
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
    UsersComponent.prototype.closeEntityModal = function () {
        this.model = new src_app_models_users_model__WEBPACK_IMPORTED_MODULE_2__["Users"]();
        this.image = '';
        this.developer_image = '';
        this.entityModalClose.nativeElement.click();
    };
    UsersComponent.prototype.getPage = function (page) {
        this.parameter.page = page;
        this.getBuyers(this.parameter.type, this.parameter.page, this.parameter.name, this.parameter.phone, this.parameter.email);
    };
    UsersComponent.prototype.sortData = function (value, param) {
        this.parameter.property_sort = value;
        this.getBuyers(this.parameter.type, this.parameter.page, this.parameter.name, this.parameter.phone, this.parameter.email);
    };
    UsersComponent.prototype.setUserType = function (is_credit) {
        if (is_credit == 2) {
            this.parameter.is_credit = 1;
        }
        else {
            this.parameter.is_credit = '';
        }
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
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.fileSizeExceeds'), 'error');
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
            var text = _this.model.id ?
                _this.translate.instant('message.success.updatedSuccessfully') :
                _this.translate.instant('message.success.addedSuccessfully');
            swal(_this.translate.instant('swal.success'), text, 'success');
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
        this.router.navigate(['/dashboard/users/edit-user', userdata.id]);
        // this.parameter.index = index;
        // this.model = userdata;
        // this.image = userdata.image;
        // this.developer_image = userdata.developer_image;
        // this.model.image = userdata.image != null ? userdata.image : '';
        // this.model.developer_image = userdata.developer_image != null ? userdata.developer_image : '';
        // if (this.obj) {
        //   this.obj.intlTelInput('setCountry', this.model.country_code);
        // }
        // this.modalOpen.nativeElement.click();
    };
    UsersComponent.prototype.addLegalEntity = function (userdata, index) {
        this.parameter.index = index;
        this.model = userdata;
        this.image = userdata.image;
        this.developer_image = userdata.developer_image;
        this.model.image = userdata.image != null ? userdata.image : '';
        this.model.developer_image = userdata.developer_image != null ? userdata.developer_image : '';
        this.entityModalOpen.nativeElement.click();
    };
    UsersComponent.prototype.blockUnblockPopup = function (index, id, flag, user_type) {
        var _this = this;
        this.parameter.index = index;
        switch (flag) {
            case 0:
                this.parameter.text = this.translate.instant('message.error.wantToUnblockUser');
                this.parameter.successText = this.translate.instant('message.success.unblockedSuccessfully');
                break;
            case 1:
                this.parameter.text = this.translate.instant('message.error.wantToBlockUser');
                this.parameter.successText = this.translate.instant('message.success.blockedSuccessfully');
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
            swal(_this.translate.instant('swal.success'), _this.parameter.successText, 'success');
            _this.parameter.items[_this.parameter.index]['is_blocked'] = flag;
        });
    };
    UsersComponent.prototype.deletePopup = function (index, id, user_type) {
        var _this = this;
        this.parameter.index = index;
        this.parameter.text = this.translate.instant('message.error.wantToDeleteUser');
        swal({
            html: this.translate.instant('message.error.areYouSure') + '<br>' + this.parameter.text,
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
            swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.deletedSuccessfully'), 'success');
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
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('entityModalOpen'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], UsersComponent.prototype, "entityModalOpen", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('entityModalClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], UsersComponent.prototype, "entityModalClose", void 0);
    UsersComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-users',
            template: __webpack_require__(/*! ./users.component.html */ "./src/app/layout/users/users.component.html"),
            styles: [__webpack_require__(/*! ./users.component.css */ "./src/app/layout/users/users.component.css")],
            providers: [src_app_models_users_model__WEBPACK_IMPORTED_MODULE_2__["Users"], src_app_common_constants__WEBPACK_IMPORTED_MODULE_3__["Constant"]]
        }),
        __metadata("design:paramtypes", [src_app_common_constants__WEBPACK_IMPORTED_MODULE_3__["Constant"], src_app_models_users_model__WEBPACK_IMPORTED_MODULE_2__["Users"], src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_4__["AdminService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_1__["NgxSpinnerService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__["TranslateService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"]])
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
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");
/* harmony import */ var ng_lazyload_image__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng-lazyload-image */ "./node_modules/ng-lazyload-image/fesm5/ng-lazyload-image.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _users_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./users.component */ "./src/app/layout/users/users.component.ts");
/* harmony import */ var src_app_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/guards/acl-user.guard */ "./src/app/guards/acl-user.guard.ts");
/* harmony import */ var src_app_modules_shared_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/modules/shared.module */ "./src/app/modules/shared.module.ts");
/* harmony import */ var _add_user_add_user_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./add-user/add-user.component */ "./src/app/layout/users/add-user/add-user.component.ts");
/* harmony import */ var _edit_user_edit_user_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./edit-user/edit-user.component */ "./src/app/layout/users/edit-user/edit-user.component.ts");
/* harmony import */ var primeng_primeng__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! primeng/primeng */ "./node_modules/primeng/primeng.js");
/* harmony import */ var primeng_primeng__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(primeng_primeng__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var ngx_malihu_scrollbar__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ngx-malihu-scrollbar */ "./node_modules/ngx-malihu-scrollbar/fesm5/ngx-malihu-scrollbar.js");
/* harmony import */ var ng_multiselect_dropdown__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ng-multiselect-dropdown */ "./node_modules/ng-multiselect-dropdown/fesm5/ng-multiselect-dropdown.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// third party libraries










// importing components








var routes = [
    {
        path: '', component: _users_component__WEBPACK_IMPORTED_MODULE_10__["UsersComponent"],
        canActivate: [src_app_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_11__["AclUserGuard"]], data: { roles: ['User Management', 'can_read', ''] }
    },
    {
        path: 'edit-user/:id', component: _edit_user_edit_user_component__WEBPACK_IMPORTED_MODULE_14__["EditUserComponent"],
        canActivate: [src_app_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_11__["AclUserGuard"]], data: { roles: ['User Management', 'can_read', ''] }
    },
    {
        path: 'add-user', component: _add_user_add_user_component__WEBPACK_IMPORTED_MODULE_13__["AddUserComponent"],
        canActivate: [src_app_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_11__["AclUserGuard"]], data: { roles: ['User Management', 'can_read', ''] }
    }
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
                ng_lazyload_image__WEBPACK_IMPORTED_MODULE_8__["LazyLoadImageModule"],
                _agm_core__WEBPACK_IMPORTED_MODULE_7__["AgmCoreModule"].forRoot({
                    apiKey: 'AIzaSyDykCJGMqHIwJluSmSiqKTJBVN2KauM_uQ',
                    libraries: ['drawing', 'places']
                }),
                ngx_pagination__WEBPACK_IMPORTED_MODULE_4__["NgxPaginationModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
                ng2_tel_input__WEBPACK_IMPORTED_MODULE_6__["Ng2TelInputModule"],
                src_app_modules_shared_module__WEBPACK_IMPORTED_MODULE_12__["SharedModule"],
                primeng_primeng__WEBPACK_IMPORTED_MODULE_15__["CalendarModule"],
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__["TranslateModule"],
                ngx_malihu_scrollbar__WEBPACK_IMPORTED_MODULE_16__["MalihuScrollbarModule"].forRoot(),
                ng_multiselect_dropdown__WEBPACK_IMPORTED_MODULE_17__["NgMultiSelectDropDownModule"].forRoot(),
            ],
            declarations: [
                _users_component__WEBPACK_IMPORTED_MODULE_10__["UsersComponent"],
                _add_user_add_user_component__WEBPACK_IMPORTED_MODULE_13__["AddUserComponent"],
                _edit_user_edit_user_component__WEBPACK_IMPORTED_MODULE_14__["EditUserComponent"]
            ]
        })
    ], UsersModule);
    return UsersModule;
}());



/***/ })

}]);
//# sourceMappingURL=users-users-module.js.map