(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["developers-developers-module"],{

/***/ "./src/app/layout/developers/add-developer/add-developer.component.css":
/*!*****************************************************************************!*\
  !*** ./src/app/layout/developers/add-developer/add-developer.component.css ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n.have_dev_panel_access{\n    width: 25px;\n    height: 25px;\n}\n.marginR10 {\n    margin-right: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L2RldmVsb3BlcnMvYWRkLWRldmVsb3Blci9hZGQtZGV2ZWxvcGVyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBO0lBQ0ksWUFBWTtJQUNaLGFBQWE7Q0FDaEI7QUFDRDtJQUNJLG1CQUFtQjtDQUN0QiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9kZXZlbG9wZXJzL2FkZC1kZXZlbG9wZXIvYWRkLWRldmVsb3Blci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXG4uaGF2ZV9kZXZfcGFuZWxfYWNjZXNze1xuICAgIHdpZHRoOiAyNXB4O1xuICAgIGhlaWdodDogMjVweDtcbn1cbi5tYXJnaW5SMTAge1xuICAgIG1hcmdpbi1yaWdodDogMTBweDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/layout/developers/add-developer/add-developer.component.html":
/*!******************************************************************************!*\
  !*** ./src/app/layout/developers/add-developer/add-developer.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-12\">\n      <div class=\"title-group\">\n        <h5>{{model.id ? ('viewDevelopers.editDeveloper' | translate) : ('viewDevelopers.addDeveloper' | translate)}}\n        </h5>\n        <div class=\"spacer30\"></div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"white-bg padding40\">\n    <div class=\"row\">\n      <form role=\"form\" ngNativeValidate #addForm=\"ngForm\" (ngSubmit)=\"add(addForm)\">\n        <div class=\"col-xl-12 col-lg-12 col-md-12 col-12\">\n          <div class=\"row\">\n            <div class=\"col-2\">\n              <div class=\"add-img\" style=\"display:flex;\">\n                <img *ngIf=\"image\" [src]=\"image\" style=\"object-fit: cover; width: 100%;\">\n                <label *ngIf=\"model?.image\">\n                  <input accept=\"image/*\" name=\"image\" class=\"image\" (change)=\"changeListner($event, 'image')\"\n                    type=\"file\">\n                </label>\n                <label *ngIf=\"!image\">{{'addForm.image' | translate}}</label>\n                <input *ngIf=\"!image\" accept=\"image/*\" name=\"image\" class=\"image\"\n                  (change)=\"changeListner($event, 'image')\" type=\"file\">\n              </div>\n            </div>\n            <div class=\"col-2\">\n              <div class=\"add-img\" style=\"display:flex;\">\n                <img *ngIf=\"developer_image\" [src]=\"developer_image\" style=\"object-fit: cover; width: 100%;\">\n                <label *ngIf=\"model?.developer_image\">\n                  <input accept=\"image/*\" name=\"image\" class=\"image\" (change)=\"changeListner($event, 'developer_image')\"\n                    type=\"file\">\n                </label>\n                <label *ngIf=\"!developer_image\">{{'addForm.coverImage' | translate}}</label>\n                <input *ngIf=\"!developer_image\" accept=\"image/*\" name=\"image\" class=\"image\"\n                  (change)=\"changeListner($event, 'developer_image')\" type=\"file\">\n              </div>\n            </div>\n            <div class=\"col-8\">\n              <div class=\"btn-cont text-right\">\n                <button *ngIf=\"!model?.id\" type=\"submit\" (click)=\"setValue(1)\" [disabled]=\"!addForm.valid\"\n                  class=\"btn btn-primary marginR10\">{{'addForm.addSendMail' | translate}}</button>\n                <button *ngIf=\"model?.id\" type=\"submit\" (click)=\"setValue(1)\"\n                  class=\"btn btn-primary marginR10\">{{'addForm.editSendMail' | translate}}</button>\n                <button *ngIf=\"!model?.id\" type=\"submit\" (click)=\"setValue(0)\" [disabled]=\"!addForm.valid\"\n                  class=\"btn btn-primary\">{{'addForm.addBtn' | translate}}</button>\n                <button *ngIf=\"model?.id\" type=\"submit\" (click)=\"setValue(0)\"\n                  class=\"btn btn-primary\">{{'addForm.updateBtn' | translate}}</button>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"spacer40\"></div>\n            </div>\n            <!-- https://basecamp.com/2370215/projects/14983041/messages/90854936 -->\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <!-- name is commercial name -->\n                <label>{{'addForm.commercialName' | translate}} <span class=\"color-red\">*</span></label>\n                <input autocomplete=\"off\" minlength=\"1\" maxlength=\"80\" [pattern]=\"constant.onlyWhiteSpaces\" required\n                  type=\"text\" class=\"form-control\" [(ngModel)]=\"model.name\" name=\"name\">\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.contactNumber' | translate}} <span class=\"color-red\">*</span></label>\n                <input minlength=\"8\" maxlength=\"15\" autocomplete=\"off\" type=\"text\" [pattern]=\"constant.phonePattern\"\n                  class=\"form-control\" id=\"phone\" required minlength=\"1\" [(ngModel)]=\"model.phone\" name=\"phone\"\n                  ng2TelInput [ng2TelInputOptions]=\"initialCountry\" (countryChange)=\"onCountryChange($event)\" />\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.emailId' | translate}} <span class=\"color-red\">*</span></label>\n                <input (keydown.space)=\"$event.preventDefault();\" autocomplete=\"off\" required\n                  [pattern]=\"constant.emailPattern\" type=\"email\" class=\"form-control\" [(ngModel)]=\"model.email\"\n                  name=\"email\">\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <!-- company name is legal name -->\n              <div class=\"form-group-2\">\n                <label>{{'addForm.legalName' | translate}}\n                  <!-- <span class=\"color-red\">*</span> -->\n                </label>\n                <input autocomplete=\"off\" minlength=\"1\" maxlength=\"30\" [pattern]=\"constant.onlyWhiteSpaces\" type=\"text\"\n                  class=\"form-control\" [(ngModel)]=\"model.developer_company\" name=\"developer_company\">\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.fedralTaxPayerRegistry' | translate}}\n                  <!-- <span class=\"color-red\">*</span> -->\n                </label>\n                <input autocomplete=\"off\" minlength=\"12\" maxlength=\"13\" [pattern]=\"constant.onlyWhiteSpaces\" type=\"text\"\n                  class=\"form-control\" [(ngModel)]=\"model.fed_tax_pay\" name=\"fed_tax_pay\">\n              </div>\n            </div>\n\n\n            <div class=\"col-12\">\n              <label>{{'addCollection.bankName' | translate}}\n                <!-- <span class=\"color-red\">*</span> -->\n                <span class=\"pull-right\"><a class=\"add\" (click)=\"addDeveloperBank($event)\"\n                    href=\"javascript://\">{{'addCollection.addNewBankAccount' | translate}}</a></span>\n              </label>\n              <div class=\"row\" *ngFor=\"let bankAccount of model.legal_rep_banks; let i=index\">\n                <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n                  <div class=\"form-group-3\">\n                    <label>{{'addCollection.bankName' | translate}}</label>\n                    <div class=\"clearfix\"></div>\n                    <input autocomplete=\"off\" minlength=\"1\" maxlength=\"30\" class=\"form-control\" type=\"text\"\n                      [(ngModel)]=\"bankAccount.bank_name\" name=\"bank_name{{i}}\">\n                  </div>\n                </div>\n                <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n                  <div class=\"form-group-3\">\n                    <label>{{'addCollection.accountNumber' | translate}}</label>\n                    <div class=\"clearfix\"></div>\n                    <input autocomplete=\"off\" class=\"form-control\" type=\"text\" minlength=\"10\" maxlength=\"20\"\n                      [pattern]=\"constant.accountPattern\" [(ngModel)]=\"bankAccount.account_number\"\n                      name=\"account_number{{i}}\">\n                  </div>\n                </div>\n                <div class=\"col-lg-2 col-md-6 col-sm-6 col-12\">\n                  <div class=\"form-group-3\">\n                    <label>{{'addCollection.clabeSwift' | translate}}</label>\n                    <div class=\"clearfix\"></div>\n                    <input autocomplete=\"off\" class=\"form-control\" type=\"text\" [(ngModel)]=\"bankAccount.swift\"\n                      name=\"swift{{i}}\">\n                  </div>\n                </div>\n                <div class=\"col-lg-2 col-md-6 col-sm-6 col-12\">\n                  <div class=\"form-group-3\">\n                    <label>{{'addCollection.currency' | translate}}</label>\n                    <div class=\"clearfix\"></div>\n                    <select name=\"currency_id{{i}}\" [(ngModel)]=\"bankAccount.currency_id\" class=\"form-control\">\n                      <option value=\"\">{{'addCollection.currency' | translate}}</option>\n                      <option value=\"{{c.id}}\" *ngFor=\"let c of currencies\">{{ c?.code }} | {{c?.currency}}</option>\n                    </select>\n                  </div>\n                </div>\n                <div class=\"col-lg-2 col-md-6 col-sm-6 col-12\">\n                  <div class=\"form-group-3\">\n                    <label>Remove</label>\n                    <div class=\"clearfix\"></div>\n                    <button type=\"button\" (click)=\"removeDeveloperBank($event, bankAccount, i)\">Remove</button>\n                  </div>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.legalAddress' | translate}}\n                </label>\n                <input type=\"text\" class=\"form-control\" name=\"legal_address\" [(ngModel)]=\"model.legal_address\"\n                  autocomplete=\"off\">\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.address' | translate}}\n                  <!-- <span class=\"color-red\">*</span> -->\n                </label>\n                <input placeholder=\"{{'addForm.placeholder.searchForAddress' | translate}}\" autocorrect=\"off\"\n                  autocapitalize=\"off\" spellcheck=\"off\" type=\"text\" class=\"form-control\" #search\n                  (input)=\"loadPlaces('developer_address', 'lat', 'lng', 'searchElementRef')\" name=\"developer_address\"\n                  [(ngModel)]=\"model.developer_address\" autocomplete=\"off\">\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.locationPinOnMap' | translate}}\n                  <!-- <span class=\"color-red\">*</span> -->\n                </label>\n                <agm-map class=\"height200\" [latitude]=\"model.lat\" [longitude]=\"model.lng\" [scrollwheel]=\"false\"\n                  (mapClick)=\"placeMarker($event, 'developer_address', 'lat', 'lng')\" [zoom]=\"constant.zoom\">\n                  <agm-marker [latitude]=\"model.lat\" [longitude]=\"model.lng\"></agm-marker>\n                </agm-map>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.websiteURL' | translate}}\n                  <!-- <span class=\"color-red\">*</span> -->\n                </label>\n                <input (keydown.space)=\"$event.preventDefault();\" autocomplete=\"off\" type=\"text\" class=\"form-control\"\n                  [(ngModel)]=\"model.developer_url\" name=\"developer_url\"> </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.description' | translate}}\n                  <!-- <span class=\"color-red\">*</span> -->\n                </label>\n                <textarea autocomplete=\"off\" rows=\"3\" class=\"form-control\" name=\"developer_desc\"\n                  [(ngModel)]=\"model.developer_desc\"></textarea>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.branchOffice' | translate}}</label>\n                <input placeholder=\"{{'addForm.placeholder.searchForBranch' | translate}}\" autocorrect=\"off\"\n                  autocapitalize=\"off\" spellcheck=\"off\" type=\"text\" class=\"form-control\" #search1\n                  (input)=\"loadPlaces('branch_office', 'branch_lat', 'branch_lng', 'search1ElementRef')\"\n                  name=\"branch_office\" [(ngModel)]=\"model.branch_office\" autocomplete=\"off\">\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.locationPinOnMap' | translate}}</label>\n                <agm-map class=\"height200\" [latitude]=\"model.branch_lat\" [longitude]=\"model.branch_lng\"\n                  [scrollwheel]=\"false\" (mapClick)=\"placeMarker($event, 'branch_office', 'branch_lat', 'branch_lng')\"\n                  [zoom]=\"constant.zoom\">\n                  <agm-marker [latitude]=\"model.branch_lat\" [longitude]=\"model.branch_lng\"></agm-marker>\n                </agm-map>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.addMoreImages' | translate}}</label>\n                <div class=\"add-project-img-more marginT0\">\n                  <img *ngIf=\"model.images?.length>0\" [src]=\"model.images[0]?.image\"\n                    onerror=\"this.src='assets/img/placeholder.png'\" class=\"img-fluid\">\n                  <div class=\"upload-caption\">\n                    <p *ngIf=\"model?.images?.length > 1\" class=\"number\" (click)=\"modelOpenFun()\">\n                      +{{model?.images?.length-1}}</p>\n                    <p *ngIf=\"model?.images?.length <= 1\" class=\"green-color\" (click)=\"modelOpenFun()\">\n                      {{'addForm.moreImages.addMoreBtn' | translate}}</p>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"row\">\n            <div class=\"col-12\">\n              <div class=\"spacer40\"></div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <h5>{{'addForm.legalRepresentativeInfo' | translate}}</h5>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.names' | translate}}\n                  <!-- <span class=\"color-red\">*</span> -->\n                </label>\n                <input autocomplete=\"off\" minlength=\"1\" maxlength=\"30\" [pattern]=\"constant.onlyWhiteSpaces\" type=\"text\"\n                  class=\"form-control\" [(ngModel)]=\"model.legal_representative.name\" name=\"rep_name\">\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.firstSurname' | translate}}\n                  <!-- <span class=\"color-red\">*</span> -->\n                </label>\n                <input autocomplete=\"off\" minlength=\"1\" maxlength=\"30\" [pattern]=\"constant.onlyWhiteSpaces\" type=\"text\"\n                  class=\"form-control\" [(ngModel)]=\"model.legal_representative.first_surname\" name=\"first_surname\">\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.secondSurname' | translate}}\n                  <!-- <span class=\"color-red\">*</span> -->\n                </label>\n                <input autocomplete=\"off\" minlength=\"1\" maxlength=\"30\" [pattern]=\"constant.onlyWhiteSpaces\" type=\"text\"\n                  class=\"form-control\" [(ngModel)]=\"model.legal_representative.second_surname\" name=\"second_surname\">\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.contactNumber' | translate}}\n                  <!-- <span class=\"color-red\">*</span> -->\n                </label>\n                <input minlength=\"8\" maxlength=\"15\" autocomplete=\"off\" type=\"text\" [pattern]=\"constant.phonePattern\"\n                  class=\"form-control\" id=\"phone\" [(ngModel)]=\"model.legal_representative.phone\"\n                  name=\"legal_representative_phone\" ng2TelInput [ng2TelInputOptions]=\"initialCountry\"\n                  (countryChange)=\"onCountryChange($event)\" />\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.emailId' | translate}}\n                  <!-- <span class=\"color-red\">*</span> -->\n                </label>\n                <input (keydown.space)=\"$event.preventDefault();\" autocomplete=\"off\" [pattern]=\"constant.emailPattern\"\n                  type=\"email\" class=\"form-control\" [(ngModel)]=\"model.legal_representative.email\" name=\"rep_email\">\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>{{'addForm.fedralTaxPayerRegistry' | translate}}\n                  <!-- <span class=\"color-red\">*</span> -->\n                </label>\n                <input autocomplete=\"off\" minlength=\"12\" maxlength=\"13\" [pattern]=\"constant.onlyWhiteSpaces\" type=\"text\"\n                  class=\"form-control\" [(ngModel)]=\"model.legal_representative.fed_tax_pay\" name=\"le_fed_tax_pay\">\n              </div>\n            </div>\n\n            <div class=\"col-12\">\n              <div class=\"form-group-2 row\">\n                <label class=\"col-4\">{{'addForm.pleaseProvideAccessToSystem' | translate}}</label>\n                <input type=\"checkbox\" class=\"col-6 form-control have_dev_panel_access\"\n                  [(ngModel)]=\"model.legal_representative.have_dev_panel_access\" name=\"have_dev_panel_access\">\n              </div>\n            </div>\n\n            <div class=\"col-12\">\n              <div class=\"form-group-2 row\">\n                <label class=\"col-4\">{{'addForm.typeOfService' | translate}}</label>\n                <div class=\"col-1\">\n                  <div class=\"clearfix\"></div>\n                  <label class=\"cust-radio\">\n                    <input class=\"form-control\" type=\"radio\" (change)=\"setSaleComm(1)\" value=\"1\"\n                      [checked]=\"model.legal_representative.sales_commission == 1 ? 'checked' :''\"\n                      name=\"sales_commission\">\n                    <span class=\"checkmark\">{{'addForm.Sale' | translate}}</span>\n                  </label>\n                </div>\n                <div class=\"col-4\">\n                  <label class=\"cust-radio\">\n                    <input class=\"form-control\" type=\"radio\" (change)=\"setSaleComm(2)\" value=\"2\"\n                      [checked]=\"model.legal_representative.sales_commission == 2 ? 'checked' :''\"\n                      name=\"sales_commission\">\n                    <span class=\"checkmark\">{{'addForm.SaleCommission' | translate}}</span>\n                  </label>\n                  <div class=\"clearfix\"></div>\n                </div>\n              </div>\n            </div>\n\n            <!-- <div class=\"col-12\">\n              <div class=\"form-group-2 row\">\n                <label class=\"col-4\">{{'addForm.pleaseSelectProjects' | translate}}</label>\n                <div class=\"clearfix\"></div>\n                <ng-multiselect-dropdown *ngIf=\"projects?.length>0\" \n                  class=\"col-3 section-section2 multi-select\"\n                  [placeholder]=\"''\" \n                  [data]=\"projects\" \n                  [(ngModel)]=\"model.legal_representative.legal_rep_buildings\"\n                  [settings]=\"multiDropdownSettings\" \n                  (onSelect)=\"setProject($event, 'selctedProjects')\"\n                  (onDeSelect)=\"unsetProject($event, 'selctedProjects')\" \n                  (onSelectAll)=\"onSelectAll($event)\">\n                </ng-multiselect-dropdown>\n                <div class=\"clearfix\"></div>\n              </div>\n            </div> -->\n\n            <div class=\"col-12\">\n              <label>{{'addCollection.bankAccount' | translate}}\n                <!-- <span class=\"color-red\">*</span> -->\n                <span class=\"pull-right\"><a class=\"add\" (click)=\"addLegalEntityBank($event)\"\n                    href=\"javascript://\">{{'addCollection.addNewBankAccount' | translate}}</a></span>\n              </label>\n              <div class=\"row\" *ngFor=\"let leBankAccount of model.legal_representative.legal_rep_banks; let i=index\">\n                <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n                  <div class=\"form-group-3\">\n                    <label>{{'addCollection.bankName' | translate}}</label>\n                    <div class=\"clearfix\"></div>\n                    <input autocomplete=\"off\" minlength=\"1\" maxlength=\"30\" class=\"form-control\" type=\"text\"\n                      [(ngModel)]=\"leBankAccount.bank_name\" name=\"le_bank_name{{i}}\">\n                  </div>\n                </div>\n                <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n                  <div class=\"form-group-3\">\n                    <label>{{'addCollection.accountNumber' | translate}}</label>\n                    <div class=\"clearfix\"></div>\n                    <input autocomplete=\"off\" class=\"form-control\" type=\"text\" minlength=\"9\" maxlength=\"20\"\n                      [pattern]=\"constant.accountPattern\" [(ngModel)]=\"leBankAccount.account_number\"\n                      name=\"le_account_number{{i}}\">\n                  </div>\n                </div>\n                <div class=\"col-lg-2 col-md-6 col-sm-6 col-12\">\n                  <div class=\"form-group-3\">\n                    <label>{{'addCollection.clabeSwift' | translate}}</label>\n                    <div class=\"clearfix\"></div>\n                    <input autocomplete=\"off\" class=\"form-control\" type=\"text\" [(ngModel)]=\"leBankAccount.swift\"\n                      name=\"le_swift{{i}}\">\n                  </div>\n                </div>\n                <div class=\"col-lg-2 col-md-6 col-sm-6 col-12\">\n                  <div class=\"form-group-3\">\n                    <label>{{'addCollection.currency' | translate}}</label>\n                    <div class=\"clearfix\"></div>\n                    <select name=\"le_currency_id{{i}}\" [(ngModel)]=\"leBankAccount.currency_id\" class=\"form-control\">\n                      <option value=\"\">{{'addCollection.currency' | translate}}</option>\n                      <option value=\"{{c.id}}\" *ngFor=\"let c of currencies\">{{ c?.code }} | {{c?.currency}}</option>\n                    </select>\n                  </div>\n                </div>\n                <div class=\"col-lg-2 col-md-6 col-sm-6 col-12\">\n                  <div class=\"form-group-3\">\n                    <label>{{'addCollection.remove' | translate}}</label>\n                    <div class=\"clearfix\"></div>\n                    <button type=\"button\"\n                      (click)=\"removeLegalEntityBank($event, leBankAccount, i)\">{{'addCollection.remove' | translate}}</button>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </form>\n      <div class=\"col-12\">\n        <div class=\"form-group-2 row\" *ngIf=\"data_fetch\">\n          <label class=\"col-4\">{{'addForm.pleaseSelectProjects' | translate}}</label>\n          <div class=\"clearfix\"></div>\n          <ng-multiselect-dropdown *ngIf=\"projects?.length>0\" \n            class=\"col-3 section-section2 multi-select\"\n            [placeholder]=\"''\" \n            [data]=\"projects\" \n            [(ngModel)]=\"selctedProjects\"\n            [settings]=\"multiDropdownSettings\" \n            (onSelect)=\"setProject($event, 'selctedProjects')\"\n            (onDeSelect)=\"unsetProject($event, 'selctedProjects')\" \n            (onSelectAll)=\"onSelectAll($event)\">\n          </ng-multiselect-dropdown>\n          <div class=\"clearfix\"></div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n\n  <span data-target=\"#add-more-img\" data-toggle=\"modal\" #modalOpen></span>\n  <div class=\"modal add-more-popup\" id=\"add-more-img\">\n    <div class=\"modal-dialog modal-lg\">\n      <div class=\"modal-content\">\n\n        <!-- Modal Header -->\n        <div class=\"modal-header\">\n          <h4 class=\"modal-title\">{{'addForm.moreImages.label' | translate}}</h4>\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #modalClose>&times;</button>\n        </div>\n\n        <!-- Modal body -->\n        <div class=\"modal-body\">\n          <div class=\"uploaded-img-block\" *ngIf=\"file4.files?.length > 0\">\n            <div class=\"uploaded-img\" *ngFor=\"let item of file4.files; let i=index\">\n              <a class=\"remove\" (click)=\"file4.remove(i)\"><img src=\"assets/img/remove-icon.png\" alt=\"img\"></a>\n              <img *ngIf=\"item\" class=\"u-img\" [src]=\"item.image\" alt=\"img\">\n              <img *ngIf=\"!item\" class=\"u-img\" src=\"http://via.placeholder.com/300x300\" alt=\"img\">\n            </div>\n          </div>\n          <div class=\"add-more-images\">\n            <input type=\"file\" name=\"add-more\" multiple max=\"6\" accept=\"image/*\" (change)=\"file4Select($event)\">\n            <span>{{'addForm.moreImages.addMoreBtn' | translate}}</span>\n          </div>\n        </div>\n\n        <!-- Modal footer -->\n        <div class=\"modal-footer btn-cont\">\n          <button type=\"button\" (click)=\"saveImages()\"\n            class=\"btn btn-primary\">{{'addForm.moreImages.submitBtn' | translate}}</button>\n        </div>\n\n      </div>\n    </div>\n  </div>"

/***/ }),

/***/ "./src/app/layout/developers/add-developer/add-developer.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/layout/developers/add-developer/add-developer.component.ts ***!
  \****************************************************************************/
/*! exports provided: AddDeveloperComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddDeveloperComponent", function() { return AddDeveloperComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_models_users_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/users.model */ "./src/app/models/users.model.ts");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");
/* harmony import */ var src_app_common_fileUpload__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/common/fileUpload */ "./src/app/common/fileUpload.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var src_app_models_legalEntity_model__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/models/legalEntity.model */ "./src/app/models/legalEntity.model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var AddDeveloperComponent = /** @class */ (function () {
    function AddDeveloperComponent(constant, cs, mapsAPILoader, ngZone, admin, route, spinner, translate, router) {
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
        this.projects = Array();
        this.data_fetch = false;
    }
    AddDeveloperComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.selctedProjects = [];
        this.file4 = new src_app_common_fileUpload__WEBPACK_IMPORTED_MODULE_4__["FileUpload"](false, this.admin);
        this.initModel();
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.p = this.constant.p;
        this.getCurrencies();
        this.iniDropDownSetting();
        this.parameter.sub = this.route.params.subscribe(function (params) {
            if (params['id'] !== '0') {
                _this.model.id = params['id'];
                _this.getDeveloperAllProjects(_this.model.id);
            }
            else {
                _this.model.id = '';
                _this.model.images = [];
            }
        });
    };
    AddDeveloperComponent.prototype.iniDropDownSetting = function () {
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
    AddDeveloperComponent.prototype.setProject = function (item) {
        this.selctedProjects.push(item);
    };
    AddDeveloperComponent.prototype.unsetProject = function (item) {
        var _this = this;
        var i = 0;
        this.selctedProjects.map(function (r) {
            if (r.id == item.id) {
                _this.selctedProjects.splice(i, 1);
            }
            i = i + 1;
        });
    };
    AddDeveloperComponent.prototype.onSelectAll = function (obj) {
    };
    AddDeveloperComponent.prototype.initModel = function () {
        this.initialCountry = { initialCountry: this.constant.country_code };
        this.model = new src_app_models_users_model__WEBPACK_IMPORTED_MODULE_2__["Users"]();
        this.model.legal_rep_banks = new Array();
        this.model.legal_representative = new src_app_models_legalEntity_model__WEBPACK_IMPORTED_MODULE_10__["LegalRepresentative"]();
        this.setCurrentPosition();
        this.model.country_code = this.constant.country_code;
        this.model.dial_code = this.constant.dial_code;
    };
    AddDeveloperComponent.prototype.getCurrencies = function () {
        var _this = this;
        this.admin.postDataApi('getCurrencies', {})
            .subscribe(function (success) {
            _this.currencies = success.data;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    AddDeveloperComponent.prototype.getDeveloperAllProjects = function (id) {
        var _this = this;
        this.spinner.show();
        console.log('getDeveloperAllProjects');
        this.admin.postDataApi('getDeveloperAllProjects', { 'developer_id': id })
            .subscribe(function (success) {
            _this.projects = success['data'];
            _this.getUserById(_this.model.id);
        }, function (error) {
            _this.spinner.hide();
        });
    };
    AddDeveloperComponent.prototype.getUserById = function (id) {
        var _this = this;
        var self = this;
        this.data_fetch = false;
        this.spinner.show();
        this.admin.postDataApi('getUserById', { 'user_id': id })
            .subscribe(function (success) {
            _this.spinner.hide();
            _this.model = new src_app_models_users_model__WEBPACK_IMPORTED_MODULE_2__["Users"]();
            _this.model = success.data;
            console.log('getUserById ', success.data);
            // this.model.legal_representative = new LegalRepresentative();
            _this.model.legal_rep_banks = success.data.legal_rep_banks;
            _this.model.legal_representative = success.data.legal_representative || new src_app_models_legalEntity_model__WEBPACK_IMPORTED_MODULE_10__["LegalRepresentative"]();
            _this.model.legal_representative.legal_rep_banks = success.data.legal_representative.legal_rep_banks; // Array(new Banks());
            _this.image = _this.model.image;
            _this.developer_image = _this.model.developer_image;
            if (success.data.legal_representative && success.data.legal_representative.legal_rep_buildings) {
                var _loop_1 = function (index) {
                    var element = success.data.legal_representative.legal_rep_buildings[index];
                    var d = _this.projects.filter(function (r) { return r.id == element.building_id; });
                    if (d.length != 0) {
                        var projectIndex = self.selctedProjects.find(function (item) { return item.id == d[0].id; });
                        if (!projectIndex) {
                            _this.selctedProjects.push({ id: d[0].id, name: d[0].name });
                        }
                    }
                };
                for (var index = 0; index < success.data.legal_representative.legal_rep_buildings.length; index++) {
                    _loop_1(index);
                }
            }
            self.data_fetch = true;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    AddDeveloperComponent.prototype.setSaleComm = function (sales_commission) {
        this.model.legal_representative.sales_commission = sales_commission;
    };
    AddDeveloperComponent.prototype.setValue = function (send_mail) {
        this.model.send_mail = send_mail;
    };
    AddDeveloperComponent.prototype.set = function () {
        this.show = true;
    };
    AddDeveloperComponent.prototype.changeListner = function (event, param) {
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
    AddDeveloperComponent.prototype.onCountryChange = function (e) {
        this.model.country_code = e.iso2;
        this.model.dial_code = '+' + e.dialCode;
        this.initialCountry = { initialCountry: e.iso2 };
    };
    AddDeveloperComponent.prototype.add = function (formData) {
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
        if (modelSave.images) {
            modelSave.images = modelSave.images.map(function (r) { return r.image; });
        }
        // modelSave.legal_representative.have_dev_panel_access = modelSave.legal_representative.have_dev_panel_access ? 1 : 0;
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
        if (modelSave['legal_representative'] && modelSave['legal_representative']['legal_rep_banks'] &&
            modelSave['legal_representative']['legal_rep_banks'].length > 0) {
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
        modelSave.have_dev_panel_access = modelSave.have_dev_panel_access ? 1 : 0;
        console.log('model value in dev component ', this.model, modelSave);
        if (modelSave['legal_representative'] && this.selctedProjects && this.selctedProjects.length > 0) {
            var d = this.selctedProjects.map(function (o) { return o.id; });
            modelSave['legal_representative']['building_ids'] = d;
        }
        this.spinner.show();
        this.admin.postDataApi('addDeveloper', modelSave)
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
                    _this.router.navigate(['/dashboard/developers/view-all']);
                }
                else {
                    _this.model = success.data;
                    _this.model.legal_rep_banks = success.data.legal_rep_banks || [];
                    _this.model.legal_representative = success.data.legal_representative || new src_app_models_legalEntity_model__WEBPACK_IMPORTED_MODULE_10__["LegalRepresentative"]();
                    _this.model.legal_representative.legal_rep_banks = success.data.legal_representative.legal_rep_banks || [];
                }
            }
        }, function (error) {
            _this.spinner.hide();
        });
    };
    AddDeveloperComponent.prototype.loadPlaces = function (paramAdd, paramLat, paramLng, searchRef) {
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
    AddDeveloperComponent.prototype.setCurrentPosition = function () {
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
    AddDeveloperComponent.prototype.placeMarker = function ($event, addParam, paramLat, paramLng) {
        this.model[paramLat] = $event.coords.lat;
        this.model[paramLng] = $event.coords.lng;
        this.getGeoLocation(addParam, this.model[paramLat], this.model[paramLng]);
    };
    AddDeveloperComponent.prototype.getGeoLocation = function (addParam, lat, lng) {
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
    AddDeveloperComponent.prototype.file4Select = function ($event) {
        this.file4.onSelectFile($event);
    };
    AddDeveloperComponent.prototype.modelOpenFun = function () {
        this.modalOpen.nativeElement.click();
        this.file4.backup(JSON.parse(JSON.stringify(this.model.images)));
    };
    AddDeveloperComponent.prototype.modelCloseFun = function () {
        this.modalClose.nativeElement.click();
    };
    AddDeveloperComponent.prototype.saveImages = function () {
        var _this = this;
        if (this.file4.files.length < 1) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseAtleastOneImage'), 'error');
            return false;
        }
        this.modalClose.nativeElement.click();
        this.file4.upload().then(function (r) {
            _this.model.images = _this.file4.files;
        });
    };
    AddDeveloperComponent.prototype.addLegalEntityBank = function (e) {
        var bank = new src_app_models_legalEntity_model__WEBPACK_IMPORTED_MODULE_10__["Banks"]();
        this.model.legal_representative.legal_rep_banks = this.model.legal_representative.legal_rep_banks || [];
        this.model.legal_representative.legal_rep_banks.push(bank);
    };
    AddDeveloperComponent.prototype.removeLegalEntityBank = function ($event, item, i) {
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
    AddDeveloperComponent.prototype.addDeveloperBank = function (e) {
        var bank = new src_app_models_legalEntity_model__WEBPACK_IMPORTED_MODULE_10__["Banks"]();
        this.model.legal_rep_banks.push(bank);
    };
    AddDeveloperComponent.prototype.removeDeveloperBank = function ($event, item, i) {
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
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('mapDiv'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddDeveloperComponent.prototype, "mapDiv", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('search'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddDeveloperComponent.prototype, "searchElementRef", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('search1'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddDeveloperComponent.prototype, "search1ElementRef", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddDeveloperComponent.prototype, "modalClose", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalOpen'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddDeveloperComponent.prototype, "modalOpen", void 0);
    AddDeveloperComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-add-developer',
            template: __webpack_require__(/*! ./add-developer.component.html */ "./src/app/layout/developers/add-developer/add-developer.component.html"),
            styles: [__webpack_require__(/*! ./add-developer.component.css */ "./src/app/layout/developers/add-developer/add-developer.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_common_constants__WEBPACK_IMPORTED_MODULE_6__["Constant"],
            src_app_services_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"],
            _agm_core__WEBPACK_IMPORTED_MODULE_3__["MapsAPILoader"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"],
            src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_8__["AdminService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__["TranslateService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], AddDeveloperComponent);
    return AddDeveloperComponent;
}());



/***/ }),

/***/ "./src/app/layout/developers/developers.component.css":
/*!************************************************************!*\
  !*** ./src/app/layout/developers/developers.component.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".add-img{\n    background-size: cover;background-repeat: no-repeat;\n}\n.checkbox_size{\n  width: 25px;\n  height: 25px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L2RldmVsb3BlcnMvZGV2ZWxvcGVycy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksdUJBQXVCLDZCQUE2QjtDQUN2RDtBQUNEO0VBQ0UsWUFBWTtFQUNaLGFBQWE7Q0FDZCIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9kZXZlbG9wZXJzL2RldmVsb3BlcnMuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5hZGQtaW1ne1xuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7YmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbn1cbi5jaGVja2JveF9zaXple1xuICB3aWR0aDogMjVweDtcbiAgaGVpZ2h0OiAyNXB4O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/layout/developers/developers.component.html":
/*!*************************************************************!*\
  !*** ./src/app/layout/developers/developers.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container-fluid\">\n  <div class=\"row\">\n      <div class=\"col-md-6 col-6\">\n        <div class=\"title-group\">\n            <h5>{{'viewDevelopers.label' | translate}}</h5>\n            <p>{{'table.pagination.showing' | translate}} {{items?.length}} {{'table.pagination.outof' | translate}} {{parameter.total}}</p>\n        </div>\n      </div>\n      <div class=\"col-md-6 col-6\">\n        <div class=\"btn-cont text-right\">\n            <a *ngIf=\"admin?.admin_acl['Developers Management']?.can_create==1\" class=\"btn btn-primary\" href=\"javascript://\" routerLink=\"/dashboard/developers/add-developer/0\">{{'table.addNewBtn' | translate}}</a>\n        </div>\n      </div>\n  </div>\n\n  <div class=\"white-bg\">\n      <div class=\"tabel-section\">\n        <div class=\"table-responsive\">\n          <table class=\"table table-striped table-align-left\">\n            <tr>\n              <th style=\"width:6%\">&nbsp;</th>\n              <th style=\"width:20%\">\n                <div class=\"table-search\">\n                  <!-- name is commercial name -->\n                    <label>{{'table.th.commercialName' | translate}}</label>\n                    <div class=\"searh-3\">\n                      <input type=\"text\" [(ngModel)]=\"model.name\" (keyup.enter)=\"getDevelopersFrAdmin()\" name=\"\">\n                      <button *ngIf=\"model.name\" (click)=\"getDevelopersFrAdmin()\"><i class=\"fa fa-search\"></i></button>\n                    </div>\n                </div>\n              </th>\n              <th style=\"width:25%\">\n                <div class=\"table-search\">\n                  <!-- comapny name is legal name -->\n                    <label>{{'table.th.legalName' | translate}}</label>\n                    <div class=\"searh-3\">\n                      <input type=\"text\" [(ngModel)]=\"model.developer_company\" (keyup.enter)=\"getDevelopersFrAdmin()\" name=\"\">\n                      <button *ngIf=\"model.developer_company\" (click)=\"getDevelopersFrAdmin()\"><i class=\"fa fa-search\"></i></button>\n                    </div>\n                </div>\n              </th>\n              <th style=\"width:20%; text-align:left;\">\n                <div class=\"table-search\">\n                    <label>{{'table.th.contactNumber' | translate}}</label>\n                    <div class=\"searh-3\">\n                      <input type=\"text\" [(ngModel)]=\"model.phone\" (keyup.enter)=\"getDevelopersFrAdmin()\" name=\"\">\n                      <button *ngIf=\"model.phone\" (click)=\"getDevelopersFrAdmin()\"><i class=\"fa fa-search\"></i></button>\n                    </div>\n                </div>\n              </th>\n              <th style=\"width:7%; text-align:left;\">\n                <div class=\"table-search\">\n                    <label>{{'table.th.systemDashboardAccess' | translate}}</label>\n                </div>\n              </th>\n              <th style=\"width:7%; vertical-align: top;\">\n                  {{'table.th.projects' | translate}}\n                  <a (click)=\"setBuildingsSort(model.buildings_sort==1?2:1)\" href=\"javascript://\"><img [ngClass]=\"{'upsidedown':model.buildings_sort==2}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n              </th>\n              <th style=\"width:7%; vertical-align: top;\">\n                  {{'table.th.legalEntities' | translate}}\n                  <a (click)=\"setLegalEntitySort(model.legal_entities_sort==1?2:1)\" href=\"javascript://\"><img [ngClass]=\"{'upsidedown':model.legal_entities_sort==2}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n              </th>\n              <th style=\"width:20%\">\n                &nbsp;\n              </th>\n            </tr>\n      \n            <tr *ngFor=\"let item of items| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: parameter.total }; let i=index\">\n              <td> \n                  <img *ngIf=\"item.developer_image\" [defaultImage]=\"item.developer_image| img:'thumb'\" [lazyLoad]=\"item.developer_image\" class=\"rounded-circle\" alt=\"img\">\n                  <img *ngIf=\"!item.developer_image\" class=\"rounded-circle\" src=\"assets/img/default_img.png\" alt=\"img\">\n              </td>\n              <td class=\"text-left\">\n                <span class=\"name\">\n                  <a data-toggle=\"popover\" data-placement=\"top\" title=\"{{item.name}}\">{{item.name | titlecase}}</a>\n                </span>\n              </td>\n              <td class=\"text-left\">{{item.developer_company ? item.developer_company : ('table.tr.td.NA' | translate)}}</td>\n              <td class=\"text-left\" *ngIf=\"item.phone\">{{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}</td>\n              <td class=\"text-left\" *ngIf=\"!item.phone\">{{'table.tr.td.NA' | translate}}</td>\n              <td><input name=\"have_dev_panel_access{{i}}\" disabled class=\"form-control checkbox_size\" type=\"checkbox\" [checked]=\"item?.legal_representative?.have_dev_panel_access ? 'checked' : ''\" readonly> </td>\n              <td class=\"text-left\">\n                <a title=\"{{'table.title.clickToViewBuildings' | translate}}\" routerLink=\"/dashboard/projects/view-projects/developer/{{item.id}}\">\n                  <span class=\"green-color\">{{item.buildings_count | numberWithCommas}}</span></a>\n              </td>\n              <td class=\"text-left\">\n                <a title=\"{{'table.title.clickToViewDetails' | translate}}\" routerLink=\"/dashboard/legal-entities/view-all/{{item.name}}/{{item.id}}\">\n                  <span class=\"green-color\">{{item.legal_entity_count | numberWithCommas}}</span></a>\n              </td>\n              <td>\n                <div class=\"table-actions\">\n                    <!-- <a *ngIf=\"admin?.admin_acl['Notary Lead Management']?.can_read==1\" title=\"View Leads\" href=\"javascript://\"\n                    routerLink=\"/dashboard/notary/view-notary-leads/{{item.id}}\" class=\"icon-block edit-icon\">\n                    <img src=\"assets/img/ic_leads.png\" alt=\"img\">\n                  </a> -->\n\n                  <button *ngIf=\"item.is_approved == 1\"\n                  [disabled]=\"admin?.admin_acl['Developers Management']?.can_update==0\" (click)=\"changeStatus(item, 0);\"\n                  class=\"action-icon\" title=\"{{'table.title.unapprove' | translate}}\"><img\n                    src=\"assets/img/ic_disapprove.png\" alt=\"img\"></button>\n\n                <button *ngIf=\"item.is_approved == 0\"\n                  [disabled]=\"admin?.admin_acl['Developers Management']?.can_update==0\" (click)=\"changeStatus(item, 1);\"\n                  class=\"action-icon\" title=\"{{'table.title.approve' | translate}}\"><img src=\"assets/img/tick.png\"\n                    alt=\"img\"></button>\n\n                  <button title=\"{{'table.title.editDetails' | translate}}\" [disabled]=\"admin?.admin_acl['Developers Management']?.can_update==0\" (click)=\"editUser(item)\" class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></button>\n                  <button [disabled]=\"admin?.admin_acl['Developers Management']?.can_delete==0\"\n                    (click)=\"blockUnblockPopup(i, item.id, item.is_blocked==1?0:1)\" \n                    title=\"{{item.is_blocked==1 ? ('table.title.unblock' | translate) : ('table.title.block' | translate)}}\" [ngClass]=\"{'unblock-bg':item.is_blocked==1}\"\n                    class=\"action-icon\"><img src=\"assets/img/block.png\" alt=\"img\">\n                  </button>\n                  <button [disabled]=\"admin?.admin_acl['Developers Management']?.can_purge==0\"\n                    (click)=\"deletePopup(item, i);\" class=\"action-icon\" title=\"{{'table.title.delete' | translate}}\"><img src=\"assets/img/ic_delete.png\" alt=\"img\"></button>\n                </div>\n              </td>\n            </tr>\n\n          </table>\n        </div>\n      </div>\n\n      <div class=\"center\" *ngIf=\"parameter.total == 0\">\n        <img src=\"assets/img/404-error.png\">\n      </div>\n  </div>\n  \n  <div class=\"btn-cont text-right marginT15\" *ngIf=\"parameter.total\">\n    <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n  </div>\n  \n</div>\n"

/***/ }),

/***/ "./src/app/layout/developers/developers.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/layout/developers/developers.component.ts ***!
  \***********************************************************/
/*! exports provided: DevelopersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DevelopersComponent", function() { return DevelopersComponent; });
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







var DevelopersComponent = /** @class */ (function () {
    function DevelopersComponent(constant, admin, router, spinner, translate, route) {
        this.constant = constant;
        this.admin = admin;
        this.router = router;
        this.spinner = spinner;
        this.translate = translate;
        this.route = route;
        this.parameter = {};
    }
    DevelopersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.model = new src_app_models_users_model__WEBPACK_IMPORTED_MODULE_3__["Users"]();
        this.model.buildings_sort = 2; // 2 means desc
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        this.route.params.subscribe(function (params) {
            _this.model.name = params.name;
        });
        this.getDevelopersFrAdmin();
    };
    DevelopersComponent.prototype.getPage = function (page) {
        this.parameter.page = page;
        this.getDevelopersFrAdmin();
    };
    DevelopersComponent.prototype.setBuildingsSort = function (buildings_sort) {
        delete this.model.legal_entities_sort;
        this.model.buildings_sort = buildings_sort;
        this.getDevelopersFrAdmin();
    };
    DevelopersComponent.prototype.setLegalEntitySort = function (legal_entities_sort) {
        delete this.model.buildings_sort;
        this.model.legal_entities_sort = legal_entities_sort;
        this.getDevelopersFrAdmin();
    };
    DevelopersComponent.prototype.getDevelopersFrAdmin = function () {
        var _this = this;
        this.model.page = this.parameter.page;
        this.spinner.show();
        this.admin.postDataApi('getDevelopersFrAdmin', this.model)
            .subscribe(function (success) {
            _this.spinner.hide();
            _this.items = success.data;
            _this.parameter.total = success.total;
            console.log(success.data, "all developers data");
        }, function (error) {
            _this.spinner.hide();
        });
    };
    DevelopersComponent.prototype.editUser = function (item) {
        this.router.navigate(['/dashboard/developers/add-developer', item.id]);
    };
    DevelopersComponent.prototype.blockUnblockPopup = function (index, id, flag, user_type) {
        var _this = this;
        if (user_type === void 0) { user_type = '3'; }
        this.parameter.index = index;
        this.parameter.title = this.translate.instant('message.error.areYouSure');
        switch (flag) {
            case 0:
                this.parameter.text = this.translate.instant('message.error.wantToUnblockDeveloper');
                this.parameter.successText = this.translate.instant('message.success.unblockedSuccessfully');
                break;
            case 1:
                this.parameter.text = this.translate.instant('message.error.wantToBlockDeveloper');
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
                _this.blockAdmin(index, id, flag, user_type);
            }
        });
    };
    DevelopersComponent.prototype.blockAdmin = function (index, id, flag, user_type) {
        var _this = this;
        this.parameter.index = index;
        this.parameter.url = 'blockBuyerSeller';
        var input = new FormData();
        input.append('id', id);
        input.append('flag', flag);
        input.append('user_type', user_type);
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            swal(_this.translate.instant('swal.success'), _this.parameter.successText, 'success');
            _this.items[_this.parameter.index]['is_blocked'] = flag;
        });
    };
    DevelopersComponent.prototype.deletePopup = function (item, index) {
        var _this = this;
        this.parameter.title = this.translate.instant('message.error.areYouSure');
        this.parameter.text = this.translate.instant('message.error.wantToDeleteDeveloper');
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
    DevelopersComponent.prototype.deleteData = function (item, index) {
        var _this = this;
        this.admin.postDataApi('deleteBuyerSeller', { id: item.id, user_type: 3 }).subscribe(function (r) {
            _this.items.splice(index, 1);
            _this.parameter.total--;
            swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.deletedSuccessfully'), 'success');
        }, function (error) {
            swal(_this.translate.instant('swal.error'), error.error.message, 'error');
        });
    };
    DevelopersComponent.prototype.changeStatus = function (item, status) {
        var _this = this;
        item.is_approved = status;
        var input = { id: item.id, is_approved: status };
        this.admin.postDataApi('approveDeveloper', input).subscribe(function (r) {
            swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.updatedSuccessfully'), 'success');
        }, function (error) {
            swal(_this.translate.instant('swal.error'), error.error.message, 'error');
        });
    };
    DevelopersComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-developers',
            template: __webpack_require__(/*! ./developers.component.html */ "./src/app/layout/developers/developers.component.html"),
            styles: [__webpack_require__(/*! ./developers.component.css */ "./src/app/layout/developers/developers.component.css")],
            providers: [src_app_models_users_model__WEBPACK_IMPORTED_MODULE_3__["Users"]]
        }),
        __metadata("design:paramtypes", [src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["Constant"], src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_5__["AdminService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_2__["NgxSpinnerService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__["TranslateService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]])
    ], DevelopersComponent);
    return DevelopersComponent;
}());



/***/ }),

/***/ "./src/app/layout/developers/developers.module.ts":
/*!********************************************************!*\
  !*** ./src/app/layout/developers/developers.module.ts ***!
  \********************************************************/
/*! exports provided: DevelopersModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DevelopersModule", function() { return DevelopersModule; });
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
/* harmony import */ var ng_multiselect_dropdown__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ng-multiselect-dropdown */ "./node_modules/ng-multiselect-dropdown/fesm5/ng-multiselect-dropdown.js");
/* harmony import */ var src_app_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/guards/acl-user.guard */ "./src/app/guards/acl-user.guard.ts");
/* harmony import */ var src_app_modules_shared_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/modules/shared.module */ "./src/app/modules/shared.module.ts");
/* harmony import */ var _developers_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./developers.component */ "./src/app/layout/developers/developers.component.ts");
/* harmony import */ var _add_developer_add_developer_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./add-developer/add-developer.component */ "./src/app/layout/developers/add-developer/add-developer.component.ts");
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
        path: 'view-all', component: _developers_component__WEBPACK_IMPORTED_MODULE_13__["DevelopersComponent"],
        canActivate: [src_app_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_11__["AclUserGuard"]], data: { roles: ['Developers Management', 'can_read', ''] }
    }, {
        path: 'view-all/:name', component: _developers_component__WEBPACK_IMPORTED_MODULE_13__["DevelopersComponent"],
        canActivate: [src_app_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_11__["AclUserGuard"]], data: { roles: ['Developers Management', 'can_read', ''] }
    },
    {
        path: 'add-developer/:id', component: _add_developer_add_developer_component__WEBPACK_IMPORTED_MODULE_14__["AddDeveloperComponent"],
        canActivate: [src_app_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_11__["AclUserGuard"]], data: { roles: ['Developers Management', 'can_read', ''] }
    }
];
var DevelopersModule = /** @class */ (function () {
    function DevelopersModule() {
    }
    DevelopersModule = __decorate([
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
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__["TranslateModule"],
                ng_multiselect_dropdown__WEBPACK_IMPORTED_MODULE_10__["NgMultiSelectDropDownModule"].forRoot()
            ],
            declarations: [
                _developers_component__WEBPACK_IMPORTED_MODULE_13__["DevelopersComponent"],
                _add_developer_add_developer_component__WEBPACK_IMPORTED_MODULE_14__["AddDeveloperComponent"]
            ]
        })
    ], DevelopersModule);
    return DevelopersModule;
}());



/***/ })

}]);
//# sourceMappingURL=developers-developers-module.js.map