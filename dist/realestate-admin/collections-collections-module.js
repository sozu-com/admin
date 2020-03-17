(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["collections-collections-module"],{

/***/ "./src/app/layout/collections/add-edit-collection/add-edit-collection.component.css":
/*!******************************************************************************************!*\
  !*** ./src/app/layout/collections/add-edit-collection/add-edit-collection.component.css ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/layout/collections/add-edit-collection/add-edit-collection.component.html":
/*!*******************************************************************************************!*\
  !*** ./src/app/layout/collections/add-edit-collection/add-edit-collection.component.html ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"white-bg padding15\">\n  <div class=\"row\">\n    <div class=\"col-md-6\">\n      <div class=\"title-group\">\n        <h5 *ngIf=\"!editMode\"><a routerLink=\"/dashboard/properties/view-properties\" href=\"javascript://\"><i\n              class=\"fa fa-angle-double-left\"></i> </a> &nbsp;&nbsp;{{'addCollection.addLabel' | translate}}</h5>\n        <h5 *ngIf=\"editMode\"> <a routerLink=\"/dashboard/properties/view-properties\" href=\"javascript://\"><i\n              class=\"fa fa-angle-double-left\"></i> </a> &nbsp;&nbsp;{{'addCollection.editLabel' | translate}}: {{model?.name}}</h5>\n      </div>\n    </div>\n    <div class=\"col-md-6 btn-cont\">\n      <!-- <app-add-lead *ngIf=\"this.parameter?.property_id && editMode\"  [property_id]=\"parameter.property_id\"></app-add-lead> -->\n    </div>\n  </div>\n</div>\n\n<div class=\"spacer10\"></div>\n\n<div class=\"white-bg add-property padding20\">\n  <div class=\"steps\">\n    <ul class=\"d-flex\">\n      <li [ngClass]=\"{'current': tab == 0}\"><span></span><a (click)=\"setTab(0)\">{{'addCollection.tabs.property' | translate}}</a></li>\n      <li [ngClass]=\"{'current': tab == 1}\"><span></span><a (click)=\"setTab(1)\">{{'addCollection.tabs.seller' | translate}}</a></li>\n      <li [ngClass]=\"{'current': tab == 2}\"><span></span><a (click)=\"setTab(2)\">{{'addCollection.tabs.buyer' | translate}}</a></li>\n      <li [ngClass]=\"{'current': tab == 3}\"><span></span><a (click)=\"setTab(3)\">{{'addCollection.tabs.deal' | translate}}</a></li>\n      <li [ngClass]=\"{'current': tab == 4}\"><span></span><a (click)=\"setTab(0)\">{{'addCollection.tabs.commission' | translate}}</a></li>\n      <li [ngClass]=\"{'current': (tab == 5) || (tab == 6)}\"><span></span><a (click)=\"setTab(4)\">{{'addCollection.tabs.uploadDocuments' | translate}}</a></li>\n    </ul>\n  </div>\n</div>\n\n<div class=\"spacer10\"></div>\n\n\n\n<!-- Tag a building start -->\n<div class=\"white-bg\" *ngIf=\"tab==0\">\n  <div class=\"page-title\">\n    <h3>{{'addCollection.chooseYourProperty' | translate}}</h3>\n  </div>\n\n  <div class=\"padding40\" *ngIf=\"building.id && showSearch==false\">\n    <div class=\"row\">\n      <div class=\"col-sm-9 col-lg-9\">\n        <p class=\"p16\">{{'addCollection.taggedBuildingName' | translate}}</p>\n      </div>\n      <div class=\"col-sm-3 col-lg-3 btn-cont text-right\">\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"showSearchBox()\">{{'addCollection.change' | translate}}</button>\n      </div>\n    </div>\n    <p><b>{{building.name}}</b></p>\n\n    <div class=\"row\">\n      <div class=\"col-sm-9 col-lg-9\">\n        <p class=\"p16\">{{'addCollection.taggedTowerName' | translate}}</p>\n      </div>\n    </div>\n    <p><b>{{model?.building_towers?.tower_name ? model?.building_towers?.tower_name : ('table.tr.td.NA' | translate)}}</b></p>\n\n    <div class=\"row\" *ngIf=\"model?.building_towers\">\n      <div class=\"col-sm-9 col-lg-9\">\n        <p class=\"p16\">{{'addCollection.taggedFloor' | translate}}</p>\n      </div>\n    </div>\n    <p><b>{{model?.building_towers?.tower_name ? (model?.floor_num == 0 ? ('addCollection.groundFloor' | translate) : ('addCollection.floor' | translate) + ' ' + model?.floor_num) : 'NA'}}</b></p>\n    \n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <div class=\"btn-cont text-right\">\n          <button type=\"button\" (click)=\"tab=1\" class=\"btn btn-primary\">{{'addCollection.next' | translate}}</button>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"padding40\" *ngIf=\"showSearch\">\n    <h5 class=\"p16-two\">{{'addCollection.SearchYourBuildingInOurDatabase' | translate}}</h5>\n    <div class=\"searh d-flex\">\n      <input class=\"border-right-0\" autocomplete=\"off\" type=\"text\" #buildingname\n        (keyup.enter)=\"searchBuilding(buildingname.value)\" name=\"buildingName\" [(ngModel)]=\"buildingName\">\n      <button class=\"btn\" type=\"button\" (click)=\"searchBuilding(buildingname.value)\">{{'addCollection.search' | translate}}</button>\n    </div>\n    <div class=\"spacer50\"></div>\n    <div *ngIf=\"buildingLoading\">\n      <img src=\"assets/img/loading_content.gif\" />\n    </div>\n    <div *ngIf=\"!buildingLoading && parameter.buildingCount != 0\" class=\"white-bg\">\n      <form ngNativeValidate #tagABuilding=\"ngForm\" (ngSubmit)=\"getProjectById(0)\">\n        \n        <!-- buildings listing -->\n        <div class=\"row\">\n          <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\" \n          *ngFor=\"let item of searchedBuildings| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: parameter.buildingCount }; let i = index\">\n            <app-project-block (setBuilding)=\"setBuildingId($event)\" (buildingIndex)=\"getBuildingIndex($event)\" [data]=\"item\" [index]=\"i\"></app-project-block>\n          </div>\n        </div>\n\n        <div class=\"row\" *ngIf=\"searchedBuildings?.length>0\">\n          <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\"></div>\n          <div class=\"col-lg-6 col-md-12 col-sm-12 col-12 btn-cont text-right marginT15\">\n            <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n          </div>\n        </div>\n\n        <!-- towers listing wrt building id -->\n        <diV class=\"row marginT20\" *ngIf=\"building.id\">\n          <div class=\"col-lg-12 col-md-12 col-sm-12 col-12\">\n            <div class=\"form-group-3\">\n              <label class=\"p16-two\">{{'addCollection.selectTowerIn' | translate}} {{selectedBuilding?.name}} <span class=\"color-red\">*</span></label>\n              <select name=\"tower\" [(ngModel)]=\"selectedTower\" required class=\"form-control\" (change)=\"setTower(selectedTower)\">\n                <option value=\"\">{{'addCollection.selectTower' | translate}}</option>\n                <option *ngFor=\"let bt of selectedBuilding?.building_towers\" [ngValue]=\"bt\">\n                  {{bt.tower_name}}</option>\n              </select>\n            </div>\n          </div>  \n        </diV>\n\n        <!-- floor listing wrt tower id -->\n        <div class=\"row marginT20\" *ngIf=\"selectedTower\">\n          <div class=\"col-lg-12 col-md-12 col-sm-12 col-12\">\n            <div class=\"form-group-3\">\n              <label class=\"p16-two\">{{'addCollection.selectFloorIn' | translate}} {{selectedTower?.tower_name}} <span class=\"color-red\">*</span></label>\n              <select required class=\"form-control\" (change)=\"setFloor($event.target.value)\">\n                <option value=\"\">{{'addCollection.selectFloor' | translate}}</option>\n                <option *ngFor=\"let fa of selectedTower?.floor_array; let j=index\" [value]=\"fa\">\n                  {{j == 0 ? ('addCollection.groundFloor' | translate): ('addCollection.floor' | translate) + ' '+j}}</option>\n              </select>\n            </div>\n          </div>  \n        </div>\n        \n        <div class=\"row\">\n          <div class=\"col-md-12\">\n            <div class=\"btn-cont text-right\">\n              <button type=\"submit\" [disabled]=\"tagABuilding.invalid\" class=\"btn btn-primary\">{{'addCollection.next' | translate}}</button>\n            </div>\n          </div>\n        </div>\n      </form>\n    </div>\n\n    <p *ngIf=\"parameter.buildingCount == 0 && showText\" class=\"p18\">{{'addCollection.didntFoundyourBuilding' | translate}} <strong><span\n          (click)=\"showBuildingDetails(true)\" class=\"green-color cursor-pointer\">{{'addCollection.GenerateARequesttoAddABuildingByOurDataCollectors' | translate}}</span></strong></p>\n    <div *ngIf=\"showBuilding\" class=\"spacer50\"></div>\n\n    <form ngNativeValidate #buildingRequestForm=\"ngForm\" (ngSubmit)=\"buildingRequest()\">\n      <div *ngIf=\"showBuilding\" class=\"row\">\n        <div class=\"col-lg-7 col-md-12 col-sm-12 col-12\">\n          <div class=\"row\">\n            <div class=\"col-sm-6 col-12\">\n              <div class=\"form-group-3\">\n                <label>{{'addCollection.nameBuilding' | translate}}</label>\n                <input autocomplete=\"off\" required class=\"form-control\" [pattern]=\"constant.onlyWhiteSpaces\" type=\"text\" name=\"name\"\n                  [(ngModel)]=\"building.name\" placeholder=\"{{'addForm.placeholder.nameOfBuilding' | translate}}\">\n              </div>\n            </div>\n            <div class=\"col-sm-6 col-12\">\n              <div class=\"form-group-3\">\n                <label>{{'addCollection.whereItIsLocated' | translate}}</label>\n                <input required placeholder=\"{{'addForm.placeholder.searchForLocation' | translate}}\" autocorrect=\"off\" autocapitalize=\"off\"\n                  spellcheck=\"off\" type=\"text\" class=\"form-control\" #search (input)=\"loadPlaces()\"\n                  [formControl]=\"searchControl\" [(ngModel)]=\"building.address\" name=\"address\">\n              </div>\n            </div>\n          </div>\n          <label class=\"label-optional\">{{'addCollection.developerDetails' | translate}}</label>\n          <div class=\"row\">\n            <div class=\"col-sm-6 col-12\">\n              <div class=\"form-group-3\">\n                <label>{{'addCollection.nameOfDeveloper' | translate}}</label>\n                <input autocomplete=\"off\" class=\"form-control\" [pattern]=\"constant.onlyWhiteSpaces\" type=\"text\" name=\"dev_name\"\n                  [(ngModel)]=\"building.dev_name\">\n              </div>\n            </div>\n            <div class=\"col-sm-6 col-12\">\n              <div class=\"form-group-3\">\n                <label>{{'addCollection.contactNumber' | translate}}</label>\n                <input minlength=\"6\" maxlength=\"16\" autocomplete=\"off\" type=\"text\" class=\"form-control\" id=\"dev_phone\"\n                  [(ngModel)]=\"building.dev_phone\" name=\"dev_phone\" ng2TelInput [ng2TelInputOptions]=\"initialCountry\"\n                  (countryChange)=\"onCountryChange($event)\" />\n              </div>\n            </div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-sm-12 col-12\">\n              <div class=\"form-group-3\">\n                <label>{{'addCollection.emailId' | translate}}</label>\n                <input autocomplete=\"off\" class=\"form-control\" type=\"email\" name=\"dev_email\"\n                  [(ngModel)]=\"building.dev_email\">\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-lg-5 col-md-12 col-sm-12 col-12\">\n          <div class=\"form-group-3 mark-pin-map\">\n            <label>{{'addCollection.markPinonMap' | translate}}</label>\n          </div>\n          <div>\n            <agm-map [latitude]=\"latitude\" [longitude]=\"longitude\" [scrollwheel]=\"false\"\n              (mapClick)=\"placeMarker($event)\" [zoom]=\"zoom\">\n              <agm-marker [latitude]=\"latitude\" [longitude]=\"longitude\"></agm-marker>\n            </agm-map>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"row\" *ngIf=\"showBuilding\">\n        <div class=\"col-md-12\">\n          <div class=\"btn-cont text-right\">\n            <button type=\"submit\" [disabled]=\"buildingRequestForm.invalid\" class=\"btn btn-primary\">{{'addCollection.submitRequest' | translate}}</button>\n          </div>\n        </div>\n      </div>\n    </form>\n  </div>\n</div>\n<!-- Tag a building end -->\n\n\n\n<form ngNativeValidate #createDraft=\"ngForm\" (ngSubmit)=\"addProperty(createDraft, 2)\">\n  <div class=\"white-bg\" *ngIf=\"tab==1\">\n    <div class=\"page-title\">\n      <h3>{{'addCollection.chooseTheSeller' | translate}}</h3>\n    </div>\n    <div class=\"paddingT0 padding40\">\n\n      <!-- search seller -->\n        <h5 class=\"p16-two\">{{'addCollection.SearchASellerInOurDatabase' | translate}}</h5>\n        <div class=\"searh d-flex\">\n          <input class=\"border-right-0\" autocomplete=\"off\" type=\"text\" #buildingname\n            (keyup.enter)=\"searchBuilding(buildingname.value)\" name=\"buildingName\" [(ngModel)]=\"buildingName\">\n          <button class=\"btn\" type=\"button\" (click)=\"searchBuilding(buildingname.value)\">{{'addCollection.search' | translate}}</button>\n        </div>\n        <div class=\"spacer50\"></div>\n\n        <!-- complete seller details -->\n        <h5 class=\"p16-two\">{{'addCollection.completeTheSellerInfo' | translate}}</h5>\n        <div class=\"row\">\n          <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\" *ngIf=\"model.parking==1\">\n            <div class=\"form-group-3\">\n              <label>{{'addCollection.name' | translate}}</label>\n              <div class=\"clearfix\"></div>\n              <input class=\"form-control\" type=\"number\" [(ngModel)]=\"model.parking_count\" min=\"0\"\n                  name=\"parking_count\">\n            </div>\n          </div>\n          <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\" *ngIf=\"model.parking==1\">\n            <div class=\"form-group-3\">\n              <label>{{'addCollection.phonenumber' | translate}}</label>\n              <div class=\"clearfix\"></div>\n              <input class=\"form-control\" type=\"number\" [(ngModel)]=\"model.parking_count\" min=\"0\"\n                  name=\"parking_count\">\n            </div>\n          </div>\n          <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\" *ngIf=\"model.parking==1\">\n            <div class=\"form-group-3\">\n              <label>{{'addCollection.email' | translate}}</label>\n              <div class=\"clearfix\"></div>\n              <input class=\"form-control\" type=\"number\" [(ngModel)]=\"model.parking_count\" min=\"0\"\n                  name=\"parking_count\">\n            </div>\n          </div>\n          <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\" *ngIf=\"model.parking==1\">\n            <div class=\"form-group-3\">\n              <label>{{'addCollection.companyName' | translate}}</label>\n              <div class=\"clearfix\"></div>\n              <input class=\"form-control\" type=\"number\" [(ngModel)]=\"model.parking_count\" min=\"0\"\n                  name=\"parking_count\">\n            </div>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\" *ngIf=\"model.parking==1\">\n            <div class=\"form-group-3\">\n              <label>{{'addCollection.fedralTaxPayerRegistry' | translate}}</label>\n              <div class=\"clearfix\"></div>\n              <input class=\"form-control\" type=\"number\" [(ngModel)]=\"model.parking_count\" min=\"0\"\n                  name=\"parking_count\">\n            </div>\n          </div>\n        </div>\n\n        <div class=\"spacer50\"></div>\n        <!-- bank account -->\n        <h5 class=\"p16-two\">{{'addCollection.bankAccount' | translate}}\n          <span><a class=\"add\" href=\"javascript://\">{{'addCollection.addNewBankAccount' | translate}}</a></span>\n        </h5>\n        <div class=\"row\">\n          <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\" *ngIf=\"model.parking==1\">\n            <div class=\"form-group-3\">\n              <label>{{'addCollection.accountNumber' | translate}}</label>\n              <div class=\"clearfix\"></div>\n              <input class=\"form-control\" type=\"number\" [(ngModel)]=\"model.parking_count\" min=\"0\"\n                  name=\"parking_count\">\n            </div>\n          </div>\n          <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\" *ngIf=\"model.parking==1\">\n            <div class=\"form-group-3\">\n              <label>{{'addCollection.clabeSwift' | translate}}</label>\n              <div class=\"clearfix\"></div>\n              <input class=\"form-control\" type=\"number\" [(ngModel)]=\"model.parking_count\" min=\"0\"\n                  name=\"parking_count\">\n            </div>\n          </div>\n          <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\" *ngIf=\"model.parking==1\">\n            <div class=\"form-group-3\">\n              <label>{{'addCollection.currency' | translate}}</label>\n              <div class=\"clearfix\"></div>\n              <input class=\"form-control\" type=\"number\" [(ngModel)]=\"model.parking_count\" min=\"0\"\n                  name=\"parking_count\">\n            </div>\n          </div>\n        </div>\n\n\n        <div class=\"spacer50\"></div>\n        <!-- legal Representative Info -->\n        <h5 class=\"p16-two\">{{'addCollection.legalRepresentativeInfo' | translate}}</h5>\n        <div class=\"row\">\n          <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\" *ngIf=\"model.parking==1\">\n            <div class=\"form-group-3\">\n              <label>{{'addCollection.name' | translate}}</label>\n              <div class=\"clearfix\"></div>\n              <input class=\"form-control\" type=\"number\" [(ngModel)]=\"model.parking_count\" min=\"0\"\n                  name=\"parking_count\">\n            </div>\n          </div>\n          <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\" *ngIf=\"model.parking==1\">\n            <div class=\"form-group-3\">\n              <label>{{'addCollection.phonenumber' | translate}}</label>\n              <div class=\"clearfix\"></div>\n              <input class=\"form-control\" type=\"number\" [(ngModel)]=\"model.parking_count\" min=\"0\"\n                  name=\"parking_count\">\n            </div>\n          </div>\n          <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\" *ngIf=\"model.parking==1\">\n            <div class=\"form-group-3\">\n              <label>{{'addCollection.email' | translate}}</label>\n              <div class=\"clearfix\"></div>\n              <input class=\"form-control\" type=\"number\" [(ngModel)]=\"model.parking_count\" min=\"0\"\n                  name=\"parking_count\">\n            </div>\n          </div>\n          <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\" *ngIf=\"model.parking==1\">\n            <div class=\"form-group-3\">\n              <label>{{'addCollection.companyName' | translate}}</label>\n              <div class=\"clearfix\"></div>\n              <input class=\"form-control\" type=\"number\" [(ngModel)]=\"model.parking_count\" min=\"0\"\n                  name=\"parking_count\">\n            </div>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\" *ngIf=\"model.parking==1\">\n            <div class=\"form-group-3\">\n              <label>{{'addCollection.fedralTaxPayerRegistry' | translate}}</label>\n              <div class=\"clearfix\"></div>\n              <input class=\"form-control\" type=\"number\" [(ngModel)]=\"model.parking_count\" min=\"0\"\n                  name=\"parking_count\">\n            </div>\n          </div>\n        </div>\n        \n      <div class=\"spacer15\"></div>\n\n      <div class=\"spacer15\"></div>\n      <div class=\"row\">\n        <div class=\"col-md-12\">\n          <div class=\"btn-cont text-right\">\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"setTab(0)\">{{'addCollection.previous' | translate}}</button>\n            <button type=\"submit\" [disabled]=\"createDraft.invalid\" class=\"btn btn-primary marginL15\">{{'addCollection.next' | translate}}</button>\n          </div>\n        </div>\n      </div>\n\n    </div>\n  </div>\n</form>\n\n\n\n<form ngNativeValidate #additionalInfo=\"ngForm\" (ngSubmit)=\"addProperty(additionalInfo, 3)\">\n  <!-- tab-2 -->\n  <div class=\"white-bg\" *ngIf=\"tab==2\">\n    <div class=\"page-title\">\n      <h3>{{'addForm.tabs.additionalInfo' | translate}}</h3>\n    </div>\n    <div class=\"padding40\">\n      <div class=\"form-group-3\">\n        <h5 class=\"p16-two\">{{'addForm.addImagesofYourProperty' | translate}} <span class=\"color-red\">*</span></h5>\n        <div class=\"row\">\n          <div class=\"col-md-7 col-sm-12 col-12\">\n            <!-- <div class=\"upload-cover-img\" [style.background-image]=\"image1\"> -->\n            <div class=\"upload-cover-img\">\n\n              <img [src]=\"model.cover_image\" onerror=\"this.src='assets/img/placeholder.png'\" class=\"floor-plan\">\n              <div *ngIf=\"!model.cover_image\" class=\"upload-caption\">\n                <p class=\"green-color marginT30\">{{'addForm.uploadCoverImageForProperty' | translate}}</p>\n                <p>{{'addForm.imageSizeForCover' | translate}}</p>\n              </div>\n              <input type=\"file\" name=\"\" accept=\"image/*\" (change)=\"onSelectFile('cover_image', $event)\">\n            </div>\n          </div>\n          <div class=\"col-md-5 col-sm-12 col-12\">\n            <!-- <div class=\"upload-cover-img upload-cover-small\" [style.background-image]=\"image3\"> -->\n            <div class=\"upload-cover-img upload-cover-small\">\n              <img [src]=\"model.floor_plan\" onerror=\"this.src='assets/img/placeholder.png'\" class=\"floor-plan\">\n              <input type=\"file\" name=\"\" accept=\"image/*\" (change)=\"onSelectFile('floor_plan', $event)\">\n              <div *ngIf=\"!model.floor_plan\" class=\"upload-caption\">\n                <p class=\"green-color marginT30\">{{'addForm.addfloorPlan' | translate}}</p>\n              </div>\n            </div>\n            <div class=\"upload-cover-img upload-cover-small\">\n              <img [src]=\"model?.images?.length>0 ? model.images[0]?.image : ''\" onerror=\"this.src='assets/img/placeholder-img.png'\" class=\"img-fluid\">\n              <div class=\"upload-caption\">\n                <p *ngIf=\"model?.images?.length > 1\" class=\"number\" (click)=\"modelOpenFun()\">\n                  +{{model?.images?.length-1}}</p>\n                <p *ngIf=\"model?.images?.length <= 1\" class=\"green-color\" (click)=\"modelOpenFun()\">{{'addForm.moreImages.addMoreBtn' | translate}}</p>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-md-12\">\n          <div class=\"btn-cont text-right\">\n            <!-- <a class=\"btn-third btn\" href=\"javascript://\" (click)=\"addProperty(addForm, 3)\">Next</a> -->\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"setTab(1)\">{{'addForm.previous' | translate}}</button>\n            <button type=\"submit\" class=\"btn btn-primary marginL15\" [disabled]=\"\n          additionalInfo.invalid\n          || !model.cover_image\n          || !model.floor_plan\n          || !model.description\">{{'addForm.next' | translate}}</button>\n          </div>\n        </div>\n      </div>\n\n    </div>\n  </div>\n</form>\n\n\n<form ngNativeValidate #preferableBuyer=\"ngForm\" (ngSubmit)=\"addProperty(preferableBuyer, 4)\">\n  <!-- tab-3 -->\n  <div class=\"white-bg\" *ngIf=\"tab==3\">\n    <div class=\"page-title\">\n      <h3>{{'addForm.preferableBuyers.label' | translate}}</h3>\n    </div>\n    <div class=\"padding40\">\n      <div class=\"form-group-3\">\n        <label class=\"p16-two\">{{'addForm.preferableBuyers.maritalStatus' | translate}} <span class=\"color-red\">*</span></label>\n        <div class=\"clearfix\"></div>\n        <label class=\"cust-radio\" *ngFor=\"let m of testMarital; let mi=index\">\n          <input value=\"{{m.checked}}\" name=\"marital_status[{{mi}}]\" type=\"checkbox\"\n            (click)=\"addMaritalStatus(m.checked, mi)\" [checked]=\"m.checked == true ? 'checked': ''\">\n          <span class=\"checkmark\">{{m.name}}</span>\n        </label>\n        <div class=\"clearfix\"></div>\n      </div>\n\n\n      <div class=\"row\">\n        <div class=\"col-md-12\">\n          <div class=\"btn-cont text-right\">\n            <!-- <a class=\"btn-third btn\" href=\"javascript://\" (click)=\"addProperty(addForm, 4)\">Next</a> -->\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"setTab(2)\">{{'addForm.previous' | translate}}</button>\n            <button type=\"submit\" [disabled]=\"preferableBuyer.invalid\" class=\"btn btn-primary marginL15\">{{'addForm.next' | translate}}</button>\n          </div>\n        </div>\n      </div>\n\n    </div>\n  </div>\n</form>\n\n\n\n<form ngNativeValidate #custom=\"ngForm\" (ngSubmit)=\"addProperty(custom, 5)\">\n  <!-- tab-4 -->\n  <div class=\"white-bg\" *ngIf=\"tab==4 || tab==5\">\n    <div class=\"page-title\">\n      <h3>{{'addForm.tabs.Custom' | translate}}</h3>\n    </div>\n    <div class=\"padding40\">\n      <h5 class=\"marginB30\">{{'addForm.anyInformationWeMissedYouWantToAdd' | translate}}</h5>\n\n      <div class=\"row\">\n        <div class=\"col-md-4 col-sm-12 col-12\">\n          <div class=\"form-group-3\">\n            <label class=\"p16-two\">{{'addForm.enterParameter' | translate}}</label>\n            <input autocomplete=\"off\" class=\"form-control\" [pattern]=\"constant.onlyWhiteSpaces\" type=\"text\" [(ngModel)]=\"newcustom_attribute.name\"\n              name=\"name[{{c}}]\" placeholder=\"{{'addForm.placeholder.enterParameter' | translate}}\">\n          </div>\n        </div>\n        <div class=\"col-md-4 col-sm-12 col-12\">\n          <div class=\"form-group-3\">\n            <label class=\"p16-two\">{{'addForm.enterValue' | translate}}</label>\n            <input autocomplete=\"off\" class=\"form-control\" [pattern]=\"constant.onlyWhiteSpaces\" type=\"text\" [(ngModel)]=\"newcustom_attribute.value\"\n              name=\"value[{{c}}]\" placeholder=\"{{'addForm.placeholder.enterValue' | translate}}\">\n          </div>\n        </div>\n        <div class=\"col-md-2 btn-cont\">\n          <a href=\"javascript://\" class=\"add-more btn\" (click)=\"addCustomAttribute()\">Add More</a>\n        </div>\n      </div>\n\n      <div class=\"row\" *ngFor=\"let custom_attribute of model.custom_attributes; let c = index;\">\n        <div class=\"col-md-4 col-sm-12 col-12\">\n          <div class=\"form-group-3\">\n            <label class=\"p16-two\">{{'addForm.enterParameter' | translate}}</label>\n            <input autocomplete=\"off\" class=\"form-control\" [pattern]=\"constant.onlyWhiteSpaces\" type=\"text\" [value]=\"custom_attribute.name\" disabled />\n          </div>\n        </div>\n        <div class=\"col-md-4 col-sm-12 col-12\">\n          <div class=\"form-group-3\">\n            <label class=\"p16-two\">{{'addForm.enterValue' | translate}}</label>\n            <input autocomplete=\"off\" class=\"form-control\" [pattern]=\"constant.onlyWhiteSpaces\" type=\"text\" [value]=\"custom_attribute.value\" disabled />\n          </div>\n        </div>\n        <div class=\"col-md-4 col-sm-12 col-12\">\n          <div class=\"btn-cont \">\n            <a href=\"javascript://\" class=\"btn delete-button marginT30\" (click)=\"model.custom_attributes.splice(c, 1)\">\n              <img src=\"assets/img/delete-button.png\" width=\"40\" style=\"width: 20px; margin-top: 10px;\">\n            </a>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-md-12\">\n          <div class=\"btn-cont text-right\">\n            <!-- <a class=\"btn-third btn\" href=\"javascript://\" (click)=\"addProperty(addForm, 5)\">Next</a> -->\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"setTab(3)\">{{'addForm.previous' | translate}}</button>\n            <button type=\"submit\" class=\"btn btn-primary marginL15\">{{'addForm.submit' | translate}}</button>\n          </div>\n        </div>\n      </div>\n\n    </div>\n  </div>\n</form>\n\n"

/***/ }),

/***/ "./src/app/layout/collections/add-edit-collection/add-edit-collection.component.ts":
/*!*****************************************************************************************!*\
  !*** ./src/app/layout/collections/add-edit-collection/add-edit-collection.component.ts ***!
  \*****************************************************************************************/
/*! exports provided: AddEditCollectionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddEditCollectionComponent", function() { return AddEditCollectionComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");
/* harmony import */ var src_app_models_addProject_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/addProject.model */ "./src/app/models/addProject.model.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var src_app_models_addProperty_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/models/addProperty.model */ "./src/app/models/addProperty.model.ts");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var src_app_common_fileUpload__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/common/fileUpload */ "./src/app/common/fileUpload.ts");
/* harmony import */ var src_app_common_videoUpload__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/common/videoUpload */ "./src/app/common/videoUpload.ts");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_services_http_interceptor__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/services/http-interceptor */ "./src/app/services/http-interceptor.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};







// import { Building } from 'src/app/models/global.model';








var AddEditCollectionComponent = /** @class */ (function () {
    function AddEditCollectionComponent(model, us, cs, router, sanitization, mapsAPILoader, ngZone, building, constant, route, http, spinner, element, translate) {
        var _this = this;
        this.model = model;
        this.us = us;
        this.cs = cs;
        this.router = router;
        this.sanitization = sanitization;
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.building = building;
        this.constant = constant;
        this.route = route;
        this.http = http;
        this.spinner = spinner;
        this.element = element;
        this.translate = translate;
        this.parameter = {};
        this.url2 = [];
        this.urlImg360 = [];
        this.showBuilding = false;
        this.amenityList = [];
        this.amen = '';
        this.bankList = [];
        this.bank = '';
        this.testMarital = [
            {
                id: 1,
                name: this.translate.instant('addForm.maritalStatus.married'),
                checked: false
            },
            {
                id: 2,
                name: this.translate.instant('addForm.maritalStatus.unmarried'),
                checked: false
            },
            {
                id: 3,
                name: this.translate.instant('addForm.maritalStatus.divorced'),
                checked: false
            }
        ];
        this.availabilityStatus = [
            { id: '1', name: this.translate.instant('leadDetails.buy'), checked: false },
            { id: '2', name: this.translate.instant('leadDetails.rent'), checked: false },
            { id: '3', name: this.translate.instant('leadDetails.inventory'), checked: false }
        ];
        this.imageEvent = [];
        this.showText = false;
        this.showSearch = false;
        this.buildingName = '';
        this.propertyDetails = false;
        this.editMode = false;
        this.newcarpet_area = { area: '', price: '' };
        this.newcustom_attribute = { name: '', value: '' };
        this.buildingLoading = false;
        this.videoObj = {
            thumbnail: '',
            original: ''
        };
        this.us.globalSettings$.subscribe(function (suc1) {
            _this.parameter.bulk_approve_property = suc1['bulk_approve_property'];
        });
    }
    AddEditCollectionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.property_names = [];
        this.parameter.page = 1;
        this.parameter.itemsPerPage = this.constant.limit4;
        this.buildingData = new src_app_models_addProject_model__WEBPACK_IMPORTED_MODULE_4__["AddProjectModel"]();
        this.parameter.amenities = [];
        this.parameter.banks = [];
        this.http.loader.next({ value: true });
        this.details = new src_app_models_addProperty_model__WEBPACK_IMPORTED_MODULE_6__["PropertyDetails"];
        this.file2 = new src_app_common_fileUpload__WEBPACK_IMPORTED_MODULE_8__["FileUpload"](false, this.us);
        this.file360 = new src_app_common_fileUpload__WEBPACK_IMPORTED_MODULE_8__["FileUpload"](false, this.us);
        this.amenMoreImg = new src_app_common_fileUpload__WEBPACK_IMPORTED_MODULE_8__["FileUpload"](false, this.us);
        this.amen360Img = new src_app_common_fileUpload__WEBPACK_IMPORTED_MODULE_8__["FileUpload"](false, this.us);
        this.amenVideo = new src_app_common_videoUpload__WEBPACK_IMPORTED_MODULE_9__["VideoUpload"](false, this.us);
        this.parameter.sub = this.route.params.subscribe(function (params) {
            if (params['seller_id'] !== '0') {
                _this.parameter.seller_id = params['seller_id'];
            }
            if (params['edit'] === 'edit') {
                _this.editMode = true;
            }
            _this.parameter.property_id = params['id'];
            if (_this.parameter.property_id === '0') {
                _this.us.postDataApi('getPropertyAmenities', { hide_blocked: 1 }).subscribe(function (res) {
                    _this.parameter.amenities = res.data.map(function (item) {
                        item.selected = false;
                        item.images = [];
                        item.images_360 = [];
                        item.images_360 = [];
                        item.videos = [];
                        return item;
                    });
                });
                _this.parameter.property_id = '';
                _this.testMarital[0].checked = true;
                _this.model.marital_status = [1];
                _this.model.availabilityStatusId = _this.availabilityStatus[2].id;
                _this.availabilityStatus[2].checked = true;
                // set 0 bcz optional
                _this.model.quantity = 0;
                _this.model.half_bathroom = 0;
                _this.model.property_price = 0;
                _this.showSearch = true;
                _this.parameter.propertyDetails = new src_app_models_addProperty_model__WEBPACK_IMPORTED_MODULE_6__["AddPropertyModel"]();
            }
            else {
                _this.getPropertyById(_this.parameter.property_id);
            }
        });
        this.parameter.buildingCount = 0;
        this.initialCountry = { initialCountry: this.constant.initialCountry };
        this.building.dev_countrycode = this.constant.dial_code;
        this.tab = 0;
        // this.getCountries('');
        // this.getConfigurations();
        this.getPropertyTypes();
        this.getPropertyAmenities();
        // this.getBanks();
        // this.getBuildingSpecificTypes();
        // this.getPaymentStatuses();
        // set google maps defaults
        this.zoom = 4;
        // create search FormControl
        this.searchControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]();
        // set current position
        this.setCurrentPosition();
    };
    AddEditCollectionComponent.prototype.setAvailableStatus = function (aindex) {
        // this.availabilityStatus[aindex].checked = !this.availabilityStatus[aindex].checked;
        // handling this way because data already added in db
        if (aindex === 0) {
            this.availabilityStatus[0].checked = true;
            this.availabilityStatus[1].checked = false;
            this.availabilityStatus[2].checked = false;
            this.model.availabilityStatusId = this.availabilityStatus[0].id;
        }
        else if (aindex === 1) {
            this.availabilityStatus[0].checked = false;
            this.availabilityStatus[1].checked = true;
            this.availabilityStatus[2].checked = false;
            this.model.availabilityStatusId = this.availabilityStatus[1].id;
        }
        else {
            this.availabilityStatus[0].checked = false;
            this.availabilityStatus[1].checked = false;
            this.availabilityStatus[2].checked = true;
            this.model.availabilityStatusId = this.availabilityStatus[2].id;
        }
    };
    AddEditCollectionComponent.prototype.getPropertyById = function (property_id) {
        var _this = this;
        this.spinner.show();
        var input = new FormData();
        input.append('property_id', property_id);
        this.spinner.show();
        this.us.postDataApi('getPropertyById', input)
            .subscribe(function (success) {
            _this.spinner.hide();
            _this.spinner.hide();
            _this.parameter.propertyDetails = success['data'];
            _this.setModelData(success['data']);
            if (_this.parameter.propertyDetails.step < 5) {
                _this.tab = _this.parameter.propertyDetails.step;
            }
            _this.url2 = _this.parameter.propertyDetails.images.map(function (op) { return op.image; });
            if (_this.url2.length > 0) {
                _this.image2 = _this.url2[0];
            }
            // set 360 images
            _this.urlImg360 = _this.parameter.propertyDetails.images360.map(function (op) { return op.image; });
            if (_this.urlImg360.length > 0) {
                _this.image2 = _this.urlImg360[0];
            }
            // set configuarations
            _this.parameter.items = [];
            success['data'].building.configurations.forEach(function (element) {
                // adding configurations
                _this.parameter.items.push(element);
            });
        }, function (error) {
            _this.spinner.hide();
        });
    };
    AddEditCollectionComponent.prototype.getProjectById = function (step) {
        var _this = this;
        if (!this.building.id) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.info.pleaseSelectBuilding'), 'error');
            return false;
        }
        if (!this.model.floor_num) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.info.pleaseSelectFloor'), 'error');
            return false;
        }
        this.spinner.show();
        this.us.postDataApi('getProjectByIdWithCSC', { building_id: this.building.id })
            .subscribe(function (success) {
            _this.spinner.hide();
            _this.buildingData = success['data'];
            _this.parameter.propertyDetails.images = _this.buildingData.images;
            _this.parameter.propertyDetails.amenities = _this.buildingData.amenities;
            _this.parameter.items = [];
            _this.buildingData.configurations.forEach(function (element) {
                // adding configurations
                _this.parameter.items.push(element);
                // adding carpet area and price
                var obj = {
                    area: element.carpet_area,
                    price: element.base_price
                };
                _this.model.carpet_areas.push(obj);
            });
            // this.model.cover_image = this.buildingData.main_image;
            if (success['data'].locality.id) {
                // this.getStates(success['data'].locality.city.state.country.id, '');
                // this.getCities(success['data'].locality.city.state.id, '');
                // this.getLocalities(success['data'].locality.city.id, '');
                _this.model.country_id = success['data'].locality.city.state.country.id;
                _this.model.state_id = success['data'].locality.city.state.id;
                _this.model.city_id = success['data'].locality.city.id;
                _this.model.locality_id = success['data'].locality.id;
            }
            _this.model.pets = success['data'].pets !== null ? success['data'].pets : '1';
            _this.model.kids_friendly = success['data'].kids_friendly !== null ? success['data'].kids_friendly : '1';
            _this.model.students_friendly = success['data'].students_friendly !== null ? success['data'].students_friendly : '1';
            _this.model.lgtb_friendly = success['data'].lgtb_friendly !== null ? success['data'].lgtb_friendly : '1';
            _this.model.mature_people_friendly = success['data'].mature_people_friendly !== null ?
                success['data'].mature_people_friendly : '1';
            for (var index = 0; index < _this.testMarital.length; index++) {
                if (success['data'].marital_statuses.length !== 0) {
                    for (var i = 0; i < success['data'].marital_statuses.length; i++) {
                        if (_this.testMarital[index].name === success['data'].marital_statuses[i].name_en) {
                            _this.testMarital[index].checked = true;
                        }
                    }
                }
                else {
                    _this.testMarital[0].checked = true;
                }
                // this.model.marital_status[index] = data.marital_status[index].id;
            }
            _this.parameter.propertyDetails.custom_values = _this.buildingData.custom_values;
            _this.tab = step + 1;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    AddEditCollectionComponent.prototype.setModelData = function (data) {
        var _this = this;
        this.model.id = data.id;
        this.model.name = data.name;
        this.model.property_price = data.property_price;
        this.model.for_hold = data.for_hold;
        if (data.for_hold) {
            this.setAvailableStatus(2);
            // this.model.availabilityStatusId = this.availabilityStatus[2].id;
        }
        else if (data.for_rent) {
            this.setAvailableStatus(1);
            // this.model.availabilityStatusId = this.availabilityStatus[1].id;
        }
        else {
            this.setAvailableStatus(0);
            // this.model.availabilityStatusId = this.availabilityStatus[0].id;
        }
        this.model.amenities = data.amenities;
        this.model.building_id = data.building_id;
        this.model.building_towers_id = data.building_towers_id;
        this.model.floor_num = data.floor_num;
        this.model.pets = data.pets !== null ? data.pets : '1';
        this.model.kids_friendly = data.kids_friendly !== null ? data.kids_friendly : '1';
        this.model.students_friendly = data.students_friendly !== null ? data.students_friendly : '1';
        this.model.lgtb_friendly = data.lgtb_friendly !== null ? data.lgtb_friendly : '1';
        this.model.mature_people_friendly = data.mature_people_friendly !== null ? data.mature_people_friendly : '1';
        // this.model.for_rent = data.for_rent === 1 ? true : false;
        // this.model.for_sale = data.for_sale === 1 ? true : false;
        // this.getStates(data.locality.city.state.country.id, '');
        // this.getCities(data.locality.city.state.id, '');
        // this.getLocalities(data.locality.city.id, '');
        this.model.locality_id = data.locality.id;
        this.model.city_id = data.locality.city.id;
        this.model.state_id = data.locality.city.state.id;
        this.model.country_id = data.locality.city.state.country.id;
        this.model.configuration_id = data.configuration ? data.configuration.id : '';
        this.model.building_configuration_id = data.building_configuration_id ? data.building_configuration_id : '';
        this.model.property_type_id = data.property_type ? data.property_type.id : '';
        // images
        this.model.floor_plan = data.floor_plan;
        this.model.cover_image = data.image;
        this.model.images = data.images;
        this.model.images360 = data.images360;
        this.model.videos = data.videos;
        this.model.description = data.description;
        this.model.quantity = data.quantity;
        this.model.floor = data.floor;
        this.model.bedroom = data.configuration && data.configuration.bedroom ? data.configuration.bedroom : data.bedroom;
        this.model.bathroom = data.configuration && data.configuration.bathroom ? data.configuration.bathroom : data.bathroom;
        this.model.half_bathroom = data.configuration && data.configuration.bathroom ? data.configuration.half_bathroom : data.half_bathroom;
        this.model.parking = data.parking;
        this.model.parking_count = data.parking_count;
        this.model.parking_for_sale = data.parking_for_sale;
        this.model.furnished = data.furnished;
        this.model.property_quantity_details = data.details;
        this.model.for_hold = data.for_hold === 1 ? true : false;
        this.building.id = data.building ? data.building.id : '';
        this.building.name = data.building ? data.building.name : '';
        this.model.building_towers = data.building_towers ? data.building_towers : {};
        if (this.building.id === '') {
            this.showSearch = true;
        }
        this.us.postDataApi('getPropertyAmenities', { hide_blocked: 1 }).subscribe(function (res) {
            _this.parameter.amenities = res.data.map(function (item) {
                item.selected = false;
                item.images = [];
                item.images_360 = [];
                item.images_360 = [];
                item.videos = [];
                return item;
            });
            for (var index = 0; index < _this.parameter.amenities.length; index++) {
                if (_this.model.amenities && _this.model.amenities.length > 0) {
                    for (var i = 0; i < _this.model.amenities.length; i++) {
                        if (_this.model.amenities[i].id === _this.parameter.amenities[index].id) {
                            _this.parameter.amenities[index].selected = true;
                            var pivot = _this.model.amenities[i]['pivot'];
                            _this.parameter.amenities[index].images = pivot.images ? pivot.images : [];
                            _this.parameter.amenities[index].images_360 = pivot.images_360 ? pivot.images_360 : [];
                            _this.parameter.amenities[index].videos = pivot.videos ? pivot.videos : [];
                        }
                    }
                }
            }
        });
        // for (let index = 0; index < data.amenities.length; index++) {
        //   this.addAmenity(data.amenities[index]);
        // }
        for (var index = 0; index < data.banks.length; index++) {
            this.addBank(data.banks[index]);
        }
        for (var index = 0; index < this.testMarital.length; index++) {
            if (data.marital_statuses.length !== 0) {
                for (var i = 0; i < data.marital_statuses.length; i++) {
                    if (this.testMarital[index].name === data.marital_statuses[i].name_en) {
                        this.testMarital[index].checked = true;
                    }
                }
            }
            else {
                this.testMarital[0].checked = true;
            }
            // this.model.marital_status[index] = data.marital_status[index].id;
        }
        this.bankList = data.banks;
        for (var index = 0; index < data.banks.length; index++) {
            var element = data.banks[index];
            this.model.banks[index] = data.banks[index].id;
        }
        // this.image1 = this.sanitization.bypassSecurityTrustStyle(`url(${this.model.floor_plan})`);
        for (var index = 0; index < data.carpet_areas.length; index++) {
            var element = data.carpet_areas[index];
            this.model.carpet_areas[index] = { area: element.area, price: element.price };
            this.newcarpet_area = { area: element.area, price: element.price };
        }
        for (var index = 0; index < data.custom_values.length; index++) {
            var element = data.custom_values[index];
            this.model.custom_attributes[index] = { name: element.name, value: element.value };
        }
    };
    AddEditCollectionComponent.prototype.setTab = function (tab) {
        var _this = this;
        swal({
            html: this.translate.instant('message.question.areYouSure') + '<br>' +
                this.translate.instant('message.question.movingBackCanResetInformationEnteredOnCurrentTab'),
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.tab = tab;
            }
        });
    };
    AddEditCollectionComponent.prototype.showSearchBox = function () {
        this.showSearch = true;
    };
    AddEditCollectionComponent.prototype.onCountryChange = function (e) {
        this.building.dev_countrycode = e.dialCode;
        this.initialCountry = { initialCountry: e.iso2 };
    };
    AddEditCollectionComponent.prototype.getCountries = function (keyword) {
        var _this = this;
        this.us.postDataApi('getCountries', {})
            .subscribe(function (success) {
            _this.parameter.countries = success['data'];
        });
    };
    AddEditCollectionComponent.prototype.getStates = function (country_id, keyword) {
        var _this = this;
        // this.spinner.show();
        this.model.country_id = country_id;
        this.model.state_id = '';
        this.model.city_id = '';
        this.model.locality_id = '';
        this.parameter.cities = [];
        this.parameter.localities = [];
        var input = new FormData();
        input.append('country_id', country_id);
        this.us.postDataApi('country/getStates', input).subscribe(function (success) {
            _this.parameter.states = success['data'];
            // this.spinner.hide();
        }, function (error) {
            // this.spinner.hide();
        });
    };
    AddEditCollectionComponent.prototype.getCities = function (state_id, keyword) {
        var _this = this;
        // this.spinner.show();
        this.model.state_id = state_id;
        this.model.city_id = '';
        this.model.locality_id = '';
        this.parameter.localities = [];
        var input = new FormData();
        input.append('state_id', state_id);
        this.us.postDataApi('getCities', input).subscribe(function (success) {
            _this.parameter.cities = success['data'];
            // this.spinner.hide();
        }, function (error) {
            // this.spinner.hide();
        });
    };
    AddEditCollectionComponent.prototype.getLocalities = function (city_id, keyword) {
        var _this = this;
        if (keyword === void 0) { keyword = ''; }
        this.model.city_id = city_id;
        this.model.locality_id = '';
        var input = new FormData();
        input.append('city_id', city_id);
        if (keyword) {
            input.append('keyword', keyword);
        }
        this.us.postDataApi('getLocalities', input)
            .subscribe(function (success) {
            _this.parameter.localities = success['data'];
        });
    };
    AddEditCollectionComponent.prototype.setAmenity = function (id) {
        this.model.amenities = [id];
    };
    AddEditCollectionComponent.prototype.setConfiguration = function (con) {
        this.model.building_configuration_id = con.id;
        this.model.configuration_id = con.configuration_id;
        this.model.floor_plan = con.floor_map_image;
        this.model.images = con.images;
        this.model.images360 = con.images360;
        this.model.videos = con.videos;
        this.model.bedroom = con.config.bedroom;
        this.model.bathroom = con.config.bathroom;
        this.model.half_bathroom = con.config.half_bathroom;
    };
    AddEditCollectionComponent.prototype.setValue = function (key, value) {
        this.model[key] = value;
    };
    AddEditCollectionComponent.prototype.getConfigurations = function () {
        var _this = this;
        this.us.postDataApi('getConfigurations', { hide_blocked: 1 })
            .subscribe(function (success) {
            _this.parameter.items = success['data'];
            if (_this.parameter.items.length !== 0 && _this.parameter.property_id === '') {
                _this.model.configuration_id = _this.parameter.items[0].id;
            }
        });
    };
    AddEditCollectionComponent.prototype.getPropertyTypes = function () {
        var _this = this;
        this.us.postDataApi('getPropertyTypes', { hide_blocked: 1 })
            .subscribe(function (success) {
            _this.parameter.propertyTypes = success['data'];
            if (_this.parameter.propertyTypes.length !== 0 && _this.parameter.property_id === '') {
                _this.model.property_type_id = _this.parameter.propertyTypes[0].id;
            }
        });
    };
    AddEditCollectionComponent.prototype.getPropertyAmenities = function () {
        var _this = this;
        this.us.postDataApi('getPropertyAmenities', { hide_blocked: 1 })
            .subscribe(function (success) {
            _this.parameter.amenities = success['data'].map(function (item) {
                item.selected = false;
                item.images = [];
                item.images_360 = [];
                item.videos = [];
                return item;
            });
        });
    };
    AddEditCollectionComponent.prototype.modelAmenityOpenFun = function (amenityObj, index) {
        this.amenity_index = index;
        this.amenity_obj = amenityObj;
        this.modalAmenOpen.nativeElement.click();
        this.amenMoreImg.backup(JSON.parse(JSON.stringify(this.parameter.amenities[index].images ?
            this.parameter.amenities[index].images : [])));
        this.amen360Img.backup(JSON.parse(JSON.stringify(this.parameter.amenities[index].images_360 ?
            this.parameter.amenities[index].images_360 : [])));
        this.amenVideo.backup(JSON.parse(JSON.stringify(this.parameter.amenities[index].videos ? this.parameter.amenities[index].videos : [])));
    };
    AddEditCollectionComponent.prototype.modelAmenityCloseFun = function () {
        this.modalAmenClose.nativeElement.click();
    };
    AddEditCollectionComponent.prototype.addAmenity = function (amen) {
        if (!amen) {
            return false;
        }
        var index = this.amenityList.findIndex(function (x) { return x.id == amen.id; });
        if (index < 0) {
            this.model.amenities.push(amen.id);
            this.amenityList.push(amen);
            var removeIndex = this.parameter.amenities.findIndex(function (x) { return x.id == amen.id; });
            this.parameter.amenities.splice(removeIndex, 1);
        }
    };
    AddEditCollectionComponent.prototype.getSelectedAmenityByName = function (selectedName) {
        var r = this.amenityList.find(function (amenity) { return amenity.name_en === selectedName; });
        if (r) {
            return '';
        }
        else {
            return this.parameter.amenities.find(function (amenity) { return amenity.name_en === selectedName; });
        }
    };
    AddEditCollectionComponent.prototype.removeAmenity = function (amenity, index) {
        this.parameter.amenities.push(amenity);
        this.model.amenities.splice(index, 1);
        this.amenityList.splice(index, 1);
    };
    AddEditCollectionComponent.prototype.getBanks = function () {
        var _this = this;
        var input = new FormData();
        this.us.postDataApi('getBanks', input)
            .subscribe(function (success) {
            _this.parameter.banks = success['data'];
        });
    };
    AddEditCollectionComponent.prototype.getBuildingSpecificTypes = function () {
        var _this = this;
        var input = new FormData();
        this.us.postDataApi('getBuildingSpecificTypes', input)
            .subscribe(function (success) {
            _this.parameter.buildingSpecificTypes = success['data'];
        });
    };
    AddEditCollectionComponent.prototype.getPaymentStatuses = function () {
        var _this = this;
        var input = new FormData();
        this.us.postDataApi('getPaymentStatuses', input)
            .subscribe(function (success) {
            _this.parameter.paymentStatuses = success['data'];
        });
    };
    AddEditCollectionComponent.prototype.addBank = function (bank) {
        if (!bank) {
            return false;
        }
        var index = this.bankList.findIndex(function (x) { return x.id == bank.id; });
        if (index < 0) {
            this.model.banks.push(bank.id);
            this.bankList.push(bank);
            var removeIndex = this.parameter.banks.findIndex(function (x) { return x.id == bank.id; });
            this.parameter.banks.splice(removeIndex, 1);
        }
    };
    AddEditCollectionComponent.prototype.removeBank = function (bank, index) {
        this.parameter.banks.push(bank);
        this.model.banks.splice(index, 1);
        this.bankList.splice(index, 1);
    };
    AddEditCollectionComponent.prototype.addCarpetArea = function () {
        if (!this.newcarpet_area.area || !this.newcarpet_area.price) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.info.pleaseFillCarpetAreaFields'), 'error');
        }
        else {
            this.model.carpet_areas.push(JSON.parse(JSON.stringify(this.newcarpet_area)));
            this.newcarpet_area = { area: '', price: '' };
        }
    };
    AddEditCollectionComponent.prototype.addCustomAttribute = function () {
        if (!this.newcustom_attribute.name || !this.newcustom_attribute.value) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.info.pleaseFillCustomAttributeFields'), 'error');
        }
        else {
            this.model.custom_attributes.push(this.newcustom_attribute);
            this.newcustom_attribute = { name: '', value: '' };
        }
    };
    AddEditCollectionComponent.prototype.getSelectedBankByName = function (selectedName) {
        var r = this.bankList.find(function (bank) { return bank.name === selectedName; });
        if (r) {
            return '';
        }
        else {
            return this.parameter.banks.find(function (bank) { return bank.name === selectedName; });
        }
    };
    AddEditCollectionComponent.prototype.searchBuilding = function (keyword) {
        var _this = this;
        if (!keyword) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.info.pleaseEnterSomeText'), 'error');
            return false;
        }
        this.showBuilding = false;
        this.buildingLoading = true;
        var input = new FormData();
        input.append('keyword', keyword);
        this.us.postDataApi('searchBuilding', input)
            .subscribe(function (success) {
            _this.searchedBuildings = success['data'];
            _this.parameter.buildingCount = success['data'].length;
            if (_this.parameter.buildingCount === 0) {
                _this.showText = true;
            }
            _this.buildingLoading = false;
        }, function (error) {
            _this.buildingLoading = true;
        });
    };
    AddEditCollectionComponent.prototype.getPage = function (page) {
        this.parameter.page = page;
    };
    AddEditCollectionComponent.prototype.showBuildingDetails = function (showBuilding) {
        this.showBuilding = showBuilding;
        this.buildingName = '';
        this.loadPlaces();
    };
    AddEditCollectionComponent.prototype.onSelectFile2 = function (event) {
        var _this = this;
        if (event.target.files && event.target.files[0]) {
            if ((this.url2.length + event.target.files.length) > 6 || event.target.files.length > 6) {
                swal(this.translate.instant('swal.error'), this.translate.instant('message.info.youCanUploadMaximumof6Images'), 'error');
            }
            else {
                var _loop_1 = function (index) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        _this.imageEvent.push(event.target.files[index]);
                        _this.url2.push(e.target.result);
                        var tempurl = e.target.result;
                        _this.image2 = tempurl;
                    };
                    reader.readAsDataURL(event.target.files[index]);
                };
                for (var index = 0; index < event.target.files.length; index++) {
                    _loop_1(index);
                }
            }
        }
    };
    AddEditCollectionComponent.prototype.onSelect360File = function (event) {
        var _this = this;
        if (event.target.files && event.target.files[0]) {
            if ((this.urlImg360.length + event.target.files.length) > 6 || event.target.files.length > 6) {
                swal(this.translate.instant('message.info.limitExceeded'), this.translate.instant('message.info.youCanUploadMaximumof6Images'), 'error');
            }
            else {
                var _loop_2 = function (index) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        _this.imageEvent.push(event.target.files[index]);
                        _this.urlImg360.push(e.target.result);
                        var tempurl = e.target.result;
                        _this.image2 = tempurl;
                    };
                    reader.readAsDataURL(event.target.files[index]);
                };
                for (var index = 0; index < event.target.files.length; index++) {
                    _loop_2(index);
                }
            }
        }
    };
    AddEditCollectionComponent.prototype.onSelectFile = function (param, event) {
        var _this = this;
        //  const dd = this.uploader.onSelectFile(event);
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                _this.url = e.target.result;
                _this.model[param] = _this.url;
            };
            reader.readAsDataURL(event.target.files[0]);
            var input = new FormData();
            input.append('image', event.target.files[0]);
            this.us.postDataApi('saveImage', input).subscribe(function (success) {
                _this.model[param] = success['data'].image;
            });
        }
    };
    AddEditCollectionComponent.prototype.modelOpenFun = function () {
        this.modalOpen.nativeElement.click();
        this.file2.backup(JSON.parse(JSON.stringify(this.model.images)));
    };
    AddEditCollectionComponent.prototype.modelOpen360ImgFun = function () {
        this.modalOpen360Img.nativeElement.click();
        this.file360.backup(JSON.parse(JSON.stringify(this.model.images360)));
    };
    AddEditCollectionComponent.prototype.modelCloseFun = function () {
        this.modalClose.nativeElement.click();
    };
    AddEditCollectionComponent.prototype.saveImages = function () {
        var _this = this;
        var count = 0;
        // if (this.file2.files.length < 1) {
        //   swal(this.translate.instant('swal.error'), this.translate.instant('message.info.pleaseChooseAtleastOneImage'), 'error');
        //   return false;
        // }
        this.file2.upload().then(function (r) {
            _this.model.images = _this.file2.files;
        });
        this.file2.files.forEach(function (element) {
            if (element.loading !== true) {
                count++;
            }
        });
        if (count === this.file2.files.length) {
            this.modalClose.nativeElement.click();
        }
    };
    AddEditCollectionComponent.prototype.save360Images = function () {
        var _this = this;
        var count = 0;
        // if (this.file360.files.length < 1) {
        //   swal(this.translate.instant('swal.error'), this.translate.instant('message.info.pleaseChooseAtleastOneImage'), 'error');
        //   return false;
        // }
        this.file360.upload().then(function (r) {
            _this.model.images360 = _this.file360.files;
        });
        this.file360.files.forEach(function (element) {
            if (element.loading !== true) {
                count++;
            }
        });
        if (count === this.file360.files.length) {
            this.modalClose360Img.nativeElement.click();
        }
    };
    AddEditCollectionComponent.prototype.file2Select = function ($event) {
        if ((this.file2.files.length + $event.target.files.length) > 6) {
            swal(this.translate.instant('message.info.limitExceeded'), this.translate.instant('message.info.youCanUploadMaximumof6Images'), 'error');
            return false;
        }
        this.file2.onSelectFile($event);
    };
    AddEditCollectionComponent.prototype.file360Select = function ($event) {
        if ((this.file360.files.length + $event.target.files.length) > 6) {
            swal(this.translate.instant('message.info.limitExceeded'), this.translate.instant('message.info.youCanUploadMaximumof6Images'), 'error');
            return false;
        }
        this.file360.onSelectFile($event);
    };
    AddEditCollectionComponent.prototype.onSelectFile3 = function (event) {
        var _this = this;
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                _this.url = e.target.result;
                _this.image3 = _this.sanitization.bypassSecurityTrustStyle("url(" + _this.url + ")");
            };
            var input = new FormData();
            input.append('image', event.target.files[0]);
            this.us.postDataApi('saveImage', input)
                .subscribe(function (success) {
                _this.model.floor_plan = success['data'].image;
            });
            reader.readAsDataURL(event.target.files[0]);
        }
    };
    AddEditCollectionComponent.prototype.addMaritalStatus = function (checked, i) {
        this.testMarital[i].checked = this.testMarital[i].checked === true ? false : true;
    };
    AddEditCollectionComponent.prototype.addProperty = function (formdata, tab) {
        var _this = this;
        // return;
        if (this.model.parking_for_sale && this.model.parking_count) {
            if (this.model.parking_for_sale > this.model.parking_count) {
                swal(this.translate.instant('swal.error'), this.translate.instant('message.info.parkingForSaleCannotGreaterThanTotalParking'), 'error');
                return;
            }
        }
        this.model.floor = 0; // now static
        this.model.marital_status = [];
        if (this.model.videoLoader) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.uploadingVideo'), 'error');
            return;
        }
        for (var index = 0; index < this.testMarital.length; index++) {
            if (this.testMarital[index].checked === true) {
                this.model.marital_status.push(this.testMarital[index].id);
            }
        }
        this.model.step = tab - 1;
        // setting newcarpert area to carpert_areas bcz ealier it was array => now single carpertarea
        this.model.carpet_areas = [];
        this.model.carpet_areas.push(JSON.parse(JSON.stringify(this.newcarpet_area)));
        if (this.model.carpet_areas.length < 1 && this.tab == 1) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseAddCarpetArea'), 'error');
        }
        else if ((this.model.cover_image === null || this.model.cover_image === undefined) && (this.model.step == 2)) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseCoverImage'), 'error');
        }
        else if ((this.model.floor_plan === null || this.model.floor_plan === undefined) && (this.model.step == 2)) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseFloorPlan'), 'error');
        }
        else if ((this.model.marital_status.length === 0) && (this.model.step == 3)) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseMaritalStatus'), 'error');
        }
        else {
            var input = new FormData();
            if (this.parameter.property_id) {
                input.append('property_id', this.parameter.property_id);
            }
            if (this.parameter.seller_id && this.parameter.seller_id !== '0') {
                input.append('seller_id', this.parameter.seller_id);
            }
            input.append('step', this.model.step.toString());
            if (this.model.step === 1) {
                input.append('name', this.model.name);
                // input.append('for_sale', this.model.for_sale === true ? '1' : '0');
                // input.append('for_rent', this.model.for_sale === true ? '0' : '1');
                input.append('for_sale', this.availabilityStatus[0].checked === true ? '1' : '0');
                input.append('for_rent', this.availabilityStatus[1].checked === true ? '1' : '0');
                input.append('for_hold', this.availabilityStatus[2].checked === true ? '1' : '0');
                input.append('country_id', this.model.country_id);
                input.append('state_id', this.model.state_id);
                input.append('city_id', this.model.city_id);
                input.append('locality_id', this.model.locality_id);
                input.append('configuration_id', this.model.configuration_id);
                if (this.model.building_configuration_id) {
                    input.append('building_configuration_id', this.model.building_configuration_id);
                }
                input.append('carpet_areas', JSON.stringify(this.model.carpet_areas));
                input.append('property_type_id', this.model.property_type_id);
                input.append('building_id', this.model.building_id);
                input.append('step', this.model.step.toString());
                input.append('building_towers_id', this.model.building_towers_id);
                input.append('floor_num', this.model.floor_num);
            }
            if (this.model.step === 2) {
                var imagesString = this.model.images ? this.model.images.map(function (r) { return r.image; }) : [];
                var imagesString360 = this.model.images360 ? this.model.images360.map(function (r) { return r.image; }) : [];
                // const videoString = this.model.videos.map(r => r.image);
                if (this.model.parking === 0) {
                    this.model.parking_count = 0;
                    this.model.parking_for_sale = 0;
                }
                // amenities images
                console.log(this.parameter.amenities);
                if (this.parameter.amenities && this.parameter.amenities.length > 0) {
                    this.parameter.amenities.forEach(function (element) {
                        var img = [];
                        var img_360 = [];
                        var vid = [];
                        // amenities images
                        if (element.images && element.images.length > 0) {
                            element.images.forEach(function (e) {
                                img.push(e);
                            });
                        }
                        element.images = img;
                        // amenities 360 images
                        if (element.images_360 && element.images_360.length > 0) {
                            element.images_360.forEach(function (e) {
                                img_360.push(e);
                            });
                        }
                        element.images360 = img_360;
                        // amenities videos
                        if (element.videos && element.videos.length > 0) {
                            element.videos.forEach(function (e) {
                                var s = {};
                                s = { 'video': e.video, 'thumb': e.thumb };
                                vid.push(s);
                            });
                        }
                        element.videos = vid;
                    });
                    this.model.amenities = this.parameter.amenities.filter(function (op) {
                        if (op.selected === true) {
                            return op;
                        }
                    });
                }
                // added building_id and step cuz need to update sttaus and step
                input.append('building_id', this.model.building_id);
                input.append('step', this.model.step.toString());
                input.append('images', JSON.stringify(imagesString));
                input.append('images360', JSON.stringify(imagesString360));
                input.append('videos', JSON.stringify(this.model.videos));
                input.append('cover_image', this.model.cover_image);
                input.append('floor_plan', this.model.floor_plan);
                input.append('bedroom', this.model.bedroom.toString());
                input.append('bathroom', this.model.bathroom.toString());
                input.append('half_bathroom', this.model.half_bathroom ? this.model.half_bathroom.toString() : '0');
                input.append('floor', this.model.floor.toString());
                input.append('broker_commision', this.model.broker_commision.toString());
                input.append('property_price', this.model.property_price ? this.model.property_price.toString() : '0');
                input.append('parking', this.model.parking.toString());
                input.append('parking_count', this.model.parking_count ? this.model.parking_count.toString() : '0');
                input.append('parking_for_sale', this.model.parking_for_sale ? this.model.parking_for_sale.toString() : '0');
                input.append('furnished', this.model.furnished.toString());
                input.append('description', this.model.description);
                input.append('quantity', this.model.quantity ? this.model.quantity.toString() : '0');
                input.append('amenities', JSON.stringify(this.model.amenities ? this.model.amenities : []));
                input.append('banks', JSON.stringify(this.model.banks ? this.model.banks : []));
                input.append('property_quantity_details', JSON.stringify(this.model.property_quantity_details ? this.model.property_quantity_details : []));
            }
            if (this.model.step === 3) {
                // added building_id and step cuz need to update sttaus and step
                input.append('building_id', this.model.building_id);
                input.append('step', this.model.step.toString());
                input.append('pets', this.model.pets.toString());
                input.append('kids_friendly', this.model.kids_friendly.toString());
                input.append('students_friendly', this.model.students_friendly.toString());
                input.append('lgtb_friendly', this.model.lgtb_friendly.toString());
                input.append('mature_people_friendly', this.model.mature_people_friendly.toString());
                input.append('marital_status', JSON.stringify(this.model.marital_status));
            }
            if (this.model.step === 4) {
                // added building_id and step cuz need to update sttaus and step
                input.append('building_id', this.model.building_id);
                input.append('step', this.model.step.toString());
                input.append('custom_attributes', JSON.stringify(this.model.custom_attributes));
            }
            this.spinner.show();
            this.us.postDataApi('addProperty', input)
                .subscribe(function (success) {
                _this.spinner.hide();
                _this.spinner.hide();
                if (_this.model.step.toString() === '4') {
                    var successText = _this.parameter.bulk_approve_property ? '' :
                        _this.translate.instant('message.info.notifiedWhenAdminReview');
                    swal({
                        html: _this.translate.instant('message.success.submittedSccessfully') + '<br>' + successText, type: 'success'
                    });
                    // swal('Submitted successfully.',
                    //   'You will be notified once your property will be reviewed by them, you can view status in your properties.',
                    //   'success');
                    if (_this.router.url.indexOf('/dashboard/properties/edit-property') === -1) {
                        _this.router.navigate(['/dashboard/properties/view-properties']);
                    }
                }
                _this.parameter.property_id = success['data'].id;
                _this.tab = tab;
            }, function (error) {
                _this.spinner.hide();
            });
        }
    };
    AddEditCollectionComponent.prototype.getBuildingIndex = function (i) {
        this.searchedBuildings.forEach(function (e) {
            e.selected = false;
        });
        var searchindex = (this.parameter.page - 1) * 4 + i;
        this.searchedBuildings[searchindex].selected = true;
    };
    AddEditCollectionComponent.prototype.setBuildingId = function (building) {
        // this.scrollToTower.nativeElement.scrollTop = this.scrollToTower.nativeElement.scrollHeight;
        this.selectedBuilding = building;
        this.building.id = building.id;
        this.model.building_id = building.id;
        this.model.pets = building.pets !== null ? building.pets : '1';
        this.model.kids_friendly = building.kids_friendly !== null ? building.kids_friendly : '1';
        this.model.students_friendly = building.students_friendly !== null ? building.students_friendly : '1';
        this.model.lgtb_friendly = building.lgtb_friendly !== null ? building.lgtb_friendly : '1';
        this.model.mature_people_friendly = building.mature_people_friendly !== null ? building.mature_people_friendly : '1';
        for (var index = 0; index < this.testMarital.length; index++) {
            if (building.marital_statuses && building.marital_statuses.length !== 0) {
                for (var i = 0; i < building.marital_statuses.length; i++) {
                    if (this.testMarital[index].name === building.marital_statuses[i].name_en) {
                        this.testMarital[index].checked = true;
                    }
                }
            }
            else {
                this.testMarital[0].checked = true;
            }
        }
    };
    AddEditCollectionComponent.prototype.setTower = function (tower) {
        this.selectedTower = tower;
        this.model.building_towers_id = tower.id;
        this.selectedTower.floor_array = [];
        for (var index = 0; index <= this.selectedTower.num_of_floors; index++) {
            this.selectedTower.floor_array.push(index);
        }
    };
    AddEditCollectionComponent.prototype.setFloor = function (floor_num) {
        this.model.floor_num = floor_num;
    };
    AddEditCollectionComponent.prototype.tagBuilding = function () {
        var _this = this;
        var input = new FormData();
        if (this.parameter.property_id) {
            input.append('property_id', this.parameter.property_id);
        }
        input.append('building_id', this.building.id);
        this.spinner.show();
        this.us.postDataApi('tagBuilding', input)
            .subscribe(function (success) {
            _this.spinner.hide();
            swal({
                html: _this.translate.instant('message.success.submittedSccessfully') + '<br>' +
                    _this.translate.instant('message.info.notifiedWhenAdminReview'),
                type: 'success'
            });
            if (_this.router.url.indexOf('/dashboard/properties/edit-property') === -1) {
                _this.router.navigate(['/dashboard/properties/view-properties']);
            }
        }, function (error) {
            _this.spinner.hide();
        });
    };
    AddEditCollectionComponent.prototype.loadPlaces = function () {
        var _this = this;
        this.latitude = 0;
        this.longitude = 0;
        // load Places Autocomplete
        this.mapsAPILoader.load().then(function () {
            var autocomplete = new google.maps.places.Autocomplete(_this.searchElementRef.nativeElement, {
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
                    _this.latitude = place.geometry.location.lat();
                    _this.longitude = place.geometry.location.lng();
                    _this.zoom = 12;
                    if (place.formatted_address) {
                        _this.building.address = place.formatted_address;
                    }
                });
            });
        });
    };
    AddEditCollectionComponent.prototype.setCurrentPosition = function () {
        var _this = this;
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                _this.latitude = _this.latitude ? _this.latitude : position.coords.latitude;
                _this.longitude = _this.longitude ? _this.longitude : position.coords.longitude;
                _this.zoom = 12;
            });
        }
    };
    AddEditCollectionComponent.prototype.placeMarker = function ($event) {
        this.latitude = $event.coords.lat;
        this.longitude = $event.coords.lng;
        this.getGeoLocation(this.latitude, this.longitude);
    };
    AddEditCollectionComponent.prototype.getGeoLocation = function (lat, lng) {
        var _this = this;
        if (navigator.geolocation) {
            this.spinner.show();
            var geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(lat, lng);
            var request = { latLng: latlng };
            geocoder.geocode(request, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    var result = results[0];
                    if (result != null) {
                        _this.building.address = result.formatted_address;
                    }
                    else {
                        _this.building.address = lat + ',' + lng;
                    }
                }
                _this.spinner.hide();
            });
        }
    };
    AddEditCollectionComponent.prototype.buildingRequest = function () {
        var _this = this;
        if (this.building.dev_name && (!this.building.dev_phone || !this.building.dev_email || !this.building.dev_countrycode)) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseFillCompleteDevloperInformation'), 'error');
            return false;
        }
        if (!this.latitude && !this.longitude) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseSelectLocationFromTheDropdownList'), 'error');
            return false;
        }
        this.building.lat = this.latitude;
        this.building.lng = this.longitude;
        if (!this.building.lat || !this.building.lng) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseSelectLocation'), 'error');
            return false;
        }
        this.spinner.show();
        this.us.postDataApi('buildingRequest', this.building)
            .subscribe(function (success) {
            _this.spinner.hide();
            // swal('Submitted successfully.',
            //   'You will be notified once your property will be reviewed by them, you can view status in your properties.',
            //   'success');
            // if (this.router.url.indexOf('/dashboard/properties/edit-property') === -1) {
            //   this.router.navigate(['/dashboard/properties/view-properties']);
            // }
            // update tab=1 because we need to save property details, after adding property details
            // data collector will create project template and then edit property and tag that
            // particular project
            swal({
                html: 'Success' + '<br>' +
                    _this.translate.instant('message.success.dataCollectorWillLinkPropertyToBuilding'),
                type: 'success'
            });
            // this.tab = 1;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    AddEditCollectionComponent.prototype.addPropertyDetails = function () {
        this.model.property_quantity_details.push(JSON.parse(JSON.stringify(this.details)));
        this.details = new src_app_models_addProperty_model__WEBPACK_IMPORTED_MODULE_6__["PropertyDetails"];
    };
    AddEditCollectionComponent.prototype.checkEmptyDetails = function () {
        for (var _i = 0, _a = this.details; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item == '') {
                return false;
            }
        }
        return true;
    };
    AddEditCollectionComponent.prototype.removeDetails = function (i) {
        this.model.property_quantity_details.splice(i, 1);
    };
    AddEditCollectionComponent.prototype.clickOnSale = function () {
        // console.log(this.model.for_sale);
    };
    AddEditCollectionComponent.prototype.onSelectVideo = function (event) {
    };
    AddEditCollectionComponent.prototype.showCanvas = function (event) {
        var _this = this;
        if (event.target.files[0].size > this.constant.fileSizeLimit) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.fileSizeExceeds'), 'error');
        }
        else {
            setTimeout(function () {
                _this.model.videoLoader = true;
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
                            setTimeout(function () {
                                // create canvas at middle of video
                                _this.newcanvas(videoTest, event.target.files[0]);
                            }, 3000);
                            clearInterval(timer);
                        }
                    }, 100);
                }.bind(_this);
                reader.readAsDataURL(event.target.files[0]);
            }, 100);
        }
    };
    AddEditCollectionComponent.prototype.newcanvas = function (video, videoFile) {
        var _this = this;
        var canvas = document.getElementById('canvas');
        var ss = canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, canvas.width, canvas.height);
        var ImageURL = canvas.toDataURL('image/jpeg');
        // model.image = ImageURL;
        var fileToUpload = this.dataURLtoFile(ImageURL, 'tempFile.png');
        this.cs.saveVideo(videoFile, fileToUpload).subscribe(function (success) {
            _this.model.videoLoader = false;
            _this.model.videos = [];
            var videoObj = {
                video: '', thumb: ''
            };
            videoObj.video = success['data'].video;
            videoObj.thumb = success['data'].thumb;
            _this.model.videos = [videoObj];
        }, function (error) {
            // console.log(error);
        });
    };
    AddEditCollectionComponent.prototype.dataURLtoFile = function (dataurl, filename) {
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
    AddEditCollectionComponent.prototype.onEnteringNumOfProperty = function (e) {
        // this.property_names = Array(e).fill(1);
        this.property_names = [];
        for (var index = 0; index < e; index++) {
            var pn = { name: 0 };
            pn.name = index;
            this.property_names.push(pn);
        }
    };
    AddEditCollectionComponent.prototype.setPropertyName = function (value, index) {
        this.property_names[index] = value;
    };
    AddEditCollectionComponent.prototype.amenMoreImgSelect = function ($event) {
        if ((this.amenMoreImg.files.length + $event.target.files.length) > 6) {
            swal(this.translate.instant('message.info.limitExceeded'), this.translate.instant('message.info.youCanUploadMaximumof6Images'), 'error');
            return false;
        }
        this.amenMoreImg.onSelectFile($event);
    };
    AddEditCollectionComponent.prototype.amen360ImagesSelect = function ($event) {
        if ((this.amen360Img.files.length + $event.target.files.length) > 6) {
            swal(this.translate.instant('message.info.limitExceeded'), this.translate.instant('message.info.youCanUploadMaximumof6Images'), 'error');
            return false;
        }
        this.amen360Img.onSelectFile($event);
    };
    AddEditCollectionComponent.prototype.modelOpenVideos = function () {
        this.modalAddMoreVideos.nativeElement.click();
        this.amenVideo.backup(JSON.parse(JSON.stringify(this.model.videos)));
    };
    AddEditCollectionComponent.prototype.saveVideos = function () {
        var _this = this;
        var count = 0;
        // if (this.amenVideo.files.length < 1) {
        //   swal(this.translate.instant('swal.error'), this.translate.instant('message.info.pleaseChooseAtleastOneImage'), 'error');
        //   return false;
        // }
        this.amenVideo.upload().then(function (r) {
            _this.model.videos = _this.amenVideo.files;
        });
        this.amenVideo.files.forEach(function (element) {
            if (element.loading !== true) {
                count++;
            }
        });
        if (count === this.amenVideo.files.length) {
            this.modalAddMoreVideos.nativeElement.click();
        }
    };
    AddEditCollectionComponent.prototype.saveAmenitiesMedia = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var count, totalFilesCount;
            return __generator(this, function (_a) {
                count = 0;
                totalFilesCount = this.amenMoreImg.files.length + this.amen360Img.files.length + this.amenVideo.files.length;
                // if (totalFilesCount < 1) {
                //   swal(this.translate.instant('swal.error'), this.translate.instant('message.info.pleaseChooseAtleastOneImage'), 'error');
                //   return false;
                // }
                this.amenMoreImg.upload().then(function (r) {
                    _this.parameter.amenities[_this.amenity_index].images = _this.amenMoreImg.files;
                });
                this.amen360Img.upload().then(function (r) {
                    _this.parameter.amenities[_this.amenity_index].images_360 = _this.amen360Img.files;
                });
                this.amenVideo.upload().then(function (r) {
                    _this.parameter.amenities[_this.amenity_index].videos = _this.amenVideo.files;
                });
                this.amenMoreImg.files.forEach(function (element) {
                    if (element.loading !== true) {
                        count++;
                    }
                });
                this.amen360Img.files.forEach(function (element) {
                    if (element.loading !== true) {
                        count++;
                    }
                });
                this.amenVideo.files.forEach(function (element) {
                    if (element.loading !== true) {
                        count++;
                    }
                });
                if (count === totalFilesCount) {
                    this.modalAmenClose.nativeElement.click();
                }
                return [2 /*return*/];
            });
        });
    };
    AddEditCollectionComponent.prototype.amenVideosSelect = function ($event, type) {
        if ((this.amenVideo.files.length + $event.target.files.length) > 6) {
            swal(this.translate.instant('message.info.limitExceeded'), this.translate.instant('message.info.youCanUploadMaximumof6Videos'), 'error');
            return false;
        }
        this.showamenVideo($event, type);
    };
    AddEditCollectionComponent.prototype.showamenVideo = function (event, type) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var index;
            return __generator(this, function (_a) {
                for (index = 0; index < event.target.files.length; index++) {
                    if (event.target.files[index].size < this.constant.fileSizeLimit) {
                        this.amenVideo.files.push(event.target.files[index]);
                    }
                    else {
                        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.fileSizeExceeds'), 'error');
                    }
                }
                setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        this.amenVideo.files.forEach(function (item, index) { return __awaiter(_this, void 0, void 0, function () {
                            var reader;
                            return __generator(this, function (_a) {
                                if (!item.id) {
                                    if (!this.amenVideo.files[index]['fileToUpload'] &&
                                        !this.amenVideo.files[index]['thumb']) {
                                        this.amenVideo.files[index].loading = true;
                                    }
                                    reader = new FileReader();
                                    reader.onload = function (e) {
                                        var _this = this;
                                        var timer = setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                            var data;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, this.setVideoStaticThumb(index)];
                                                    case 1:
                                                        data = _a.sent();
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); }, 1000);
                                    }.bind(this);
                                    reader.readAsDataURL(this.amenVideo.files[index]);
                                }
                                return [2 /*return*/];
                            });
                        }); });
                        return [2 /*return*/];
                    });
                }); }, 1000);
                return [2 /*return*/];
            });
        });
    };
    AddEditCollectionComponent.prototype.setVideoStaticThumb = function (myIndex) {
        var fileToUpload = 'assets/img/video-file.svg';
        this.amenVideo.files[myIndex].loading = false;
        this.amenVideo.files[myIndex]['thumb'] = fileToUpload;
        this.amenVideo.files[myIndex]['fileToUpload'] = fileToUpload;
    };
    AddEditCollectionComponent.prototype.showamenVideoOld = function (event, type) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var arr, index;
            return __generator(this, function (_a) {
                arr = [];
                for (index = 0; index < event.target.files.length; index++) {
                    if (event.target.files[index].size < this.constant.fileSizeLimit) {
                        this.amenVideo.files.push(event.target.files[index]);
                    }
                    else {
                        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.fileSizeExceeds'), 'error');
                    }
                }
                setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        this.amenVideo.files.forEach(function (item, index) { return __awaiter(_this, void 0, void 0, function () {
                            var reader, videoTest_1;
                            return __generator(this, function (_a) {
                                if (!item.id) {
                                    if (!this.amenVideo.files[index]['fileToUpload'] &&
                                        !this.amenVideo.files[index]['thumb']) {
                                        this.amenVideo.files[index].loading = true;
                                    }
                                    reader = new FileReader();
                                    videoTest_1 = this.element.nativeElement.querySelector('.video' + index);
                                    reader.onload = function (e) {
                                        var _this = this;
                                        var src = e.target['result'];
                                        videoTest_1.src = src;
                                        var timer = setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                            var data;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        if (!(videoTest_1.readyState === 4)) return [3 /*break*/, 2];
                                                        return [4 /*yield*/, this.newcanvasamenVideo(videoTest_1, this.amenVideo.files[index], index, type)];
                                                    case 1:
                                                        data = _a.sent();
                                                        _a.label = 2;
                                                    case 2: return [2 /*return*/];
                                                }
                                            });
                                        }); }, 1000);
                                    }.bind(this);
                                    reader.readAsDataURL(this.amenVideo.files[index]);
                                    // await func(item);
                                }
                                return [2 /*return*/];
                            });
                        }); });
                        return [2 /*return*/];
                    });
                }); }, 1000);
                return [2 /*return*/];
            });
        });
    };
    // @ts-ignore
    AddEditCollectionComponent.prototype.newcanvasamenVideo = function (video, videoFile, myIndex, type) {
        var canvasID;
        if (type === 'amenity' ? canvasID = 'canvas' : (type === 'tower' ? canvasID = 'canvas2' : canvasID = 'canvas3'))
            if (myIndex !== undefined) {
                var canvas = document.getElementById(canvasID + (myIndex));
                var ss = canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, canvas.width, canvas.height);
                var ImageURL = canvas.toDataURL('image/jpeg');
                this.amenVideo.files[myIndex].canvasImage = ImageURL;
                var fileToUpload = this.dataURLtoFile(ImageURL, 'tempFile.png');
                var model = {};
                model.fileToUpload = fileToUpload;
                model.videoFile = videoFile;
                this.amenVideo.files[myIndex].loading = false;
                this.amenVideo.files[myIndex]['fileToUpload'] = fileToUpload;
                // this.amenVideo.files[myIndex]['videoFile'].push(videoFile);
            }
    };
    AddEditCollectionComponent.prototype.remove = function (index) {
        this.amenVideo.files.splice(index, 1);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddEditCollectionComponent.prototype, "modalClose", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalOpen'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddEditCollectionComponent.prototype, "modalOpen", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalOpen360Img'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddEditCollectionComponent.prototype, "modalOpen360Img", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalClose360Img'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddEditCollectionComponent.prototype, "modalClose360Img", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('mapDiv'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddEditCollectionComponent.prototype, "mapDiv", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('search'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddEditCollectionComponent.prototype, "searchElementRef", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalAmenClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddEditCollectionComponent.prototype, "modalAmenClose", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalAmenOpen'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddEditCollectionComponent.prototype, "modalAmenOpen", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalAddMoreVideos'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddEditCollectionComponent.prototype, "modalAddMoreVideos", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalVideosClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddEditCollectionComponent.prototype, "modalVideosClose", void 0);
    AddEditCollectionComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-add-edit-collection',
            template: __webpack_require__(/*! ./add-edit-collection.component.html */ "./src/app/layout/collections/add-edit-collection/add-edit-collection.component.html"),
            styles: [__webpack_require__(/*! ./add-edit-collection.component.css */ "./src/app/layout/collections/add-edit-collection/add-edit-collection.component.css")],
            providers: [src_app_models_addProperty_model__WEBPACK_IMPORTED_MODULE_6__["AddPropertyModel"], src_app_models_addProperty_model__WEBPACK_IMPORTED_MODULE_6__["Building"], src_app_common_constants__WEBPACK_IMPORTED_MODULE_7__["Constant"], src_app_services_http_interceptor__WEBPACK_IMPORTED_MODULE_13__["HttpInterceptor"]]
        }),
        __metadata("design:paramtypes", [src_app_models_addProperty_model__WEBPACK_IMPORTED_MODULE_6__["AddPropertyModel"], src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_10__["AdminService"], src_app_services_common_service__WEBPACK_IMPORTED_MODULE_11__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_12__["Router"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["DomSanitizer"], _agm_core__WEBPACK_IMPORTED_MODULE_3__["MapsAPILoader"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"], src_app_models_addProperty_model__WEBPACK_IMPORTED_MODULE_6__["Building"], src_app_common_constants__WEBPACK_IMPORTED_MODULE_7__["Constant"],
            _angular_router__WEBPACK_IMPORTED_MODULE_12__["ActivatedRoute"],
            src_app_services_http_interceptor__WEBPACK_IMPORTED_MODULE_13__["HttpInterceptor"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__["TranslateService"]])
    ], AddEditCollectionComponent);
    return AddEditCollectionComponent;
}());



/***/ }),

/***/ "./src/app/layout/collections/collections.component.css":
/*!**************************************************************!*\
  !*** ./src/app/layout/collections/collections.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/layout/collections/collections.component.html":
/*!***************************************************************!*\
  !*** ./src/app/layout/collections/collections.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container-fluid\">\n  <div class=\"row\">\n     <div class=\"col-md-4\">\n           <div class=\"form-group\">\n              <p class=\"p16\">{{'viewCollections.label' | translate}}</p>\n           </div>\n     </div>\n  </div>\n  <div class=\"row\">\n     <div class=\"offset-md-4\"></div>\n     <div class=\"col-md-8 col-12\">\n           <div class=\"cust-tabs-2\">\n              <ul class=\"nav nav-tabs float-right\">\n                 <li class=\"nav-item\">\n                    <a [ngClass]=\"{'active':parameter.dash_flag == 1}\" (click)=\"changeFlag(1)\" class=\"nav-link\" data-toggle=\"tab\" href=\"#tw\">{{'filters.time.thisWeek' | translate}}</a>\n                 </li>\n                 <li class=\"nav-item\">\n                    <a [ngClass]=\"{'active':parameter.dash_flag == 2}\" (click)=\"changeFlag(2)\" class=\"nav-link\" data-toggle=\"tab\" href=\"#tm\">{{'filters.time.thisMonth' | translate}}</a>\n                 </li>\n                 <li class=\"nav-item\">\n                    <a [ngClass]=\"{'active':parameter.dash_flag == 3}\" (click)=\"changeFlag(3)\" class=\"nav-link\" data-toggle=\"tab\" href=\"#lm\">{{'filters.time.lastMonth' | translate}}</a>\n                 </li>\n                 <li class=\"nav-item\">\n                    <a [ngClass]=\"{'active':parameter.dash_flag == 4}\" (click)=\"changeFlag(4)\" class=\"nav-link\" data-toggle=\"tab\" href=\"#lt\">{{'filters.time.lifetime' | translate}}</a>\n                 </li>\n                 <li class=\"nav-item\">\n                    <a [ngClass]=\"{'active':parameter.dash_flag == 5}\" (click)=\"changeFlag(5)\" class=\"nav-link\" data-toggle=\"tab\" href=\"#cust\">{{'filters.time.custom.label' | translate}}</a>\n                 </li>\n              </ul>\n           </div>\n     </div>\n  </div>\n\n  <div class=\"row\">\n  <div class=\"col-12\">\n        <div *ngIf=\"parameter.dash_flag == 5\" class=\"row\">\n           <div class=\"offset-lg-7\"></div>\n           <div class=\"col-lg-2 col-md-2 col-sm-5 col-5\">\n           <div class=\"form-group marginB0\">\n              <label>{{'filters.time.custom.from' | translate}}</label>\n              <p-calendar [locale]=\"locale\" showIcon=\"true\" [(ngModel)]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n           </div>\n           </div>\n           <div class=\"col-lg-2 col-md-2 col-sm-5 col-5\">\n           <div class=\"form-group marginB0\">\n              <label>{{'filters.time.custom.to' | translate}}</label>\n              <p-calendar [locale]=\"locale\" showIcon=\"true\" [(ngModel)]=\"parameter.max\" [minDate]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n           </div>\n           </div>\n           <div class=\"col-lg-1 col-md-2 col-sm-2 col-6\">\n           <div class=\"form-group btn-cont\">\n              <label class=\"addMT3\">&nbsp;</label>\n              <button class=\"btn btn-calender\" href=\"javascript://\" (click)=\"getListing()\"\n              [disabled]=\"!parameter.min || !parameter.max\">{{'filters.time.custom.applyBtn' | translate}}</button>\n           </div>\n           </div>\n        </div>\n  </div>\n</div>\n\n<div class=\"row\">\n  <div class=\"col-lg-2 col-md-2\">\n        <div class=\"form-group\">\n        <label>{{'filters.location.country' | translate}}</label>\n        <select class=\"form-control\" (change)=\"onCountryChange($event.target.value)\">\n           <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n           <option *ngFor=\"let item of location.countries\" [value]=\"item.id\">{{item.name}}</option>\n        </select>\n        </div>\n  </div>\n  <div class=\"col-lg-2 col-md-2\">\n        <div class=\"form-group\">\n        <label>{{'filters.location.state' | translate}}</label>\n        <select class=\"form-control\" (change)=\"onStateChange($event.target.value)\">\n           <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n           <option *ngFor=\"let item of location.states\" [value]=\"item.id\">{{item.name}}</option>\n        </select>\n        </div>\n  </div>\n  <div class=\"col-lg-2 col-md-2\">\n        <div class=\"form-group\">\n           <label>{{'filters.location.city' | translate}}</label>\n           <select class=\"form-control\" (change)=\"onCityChange($event.target.value)\">\n              <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n           <option *ngFor=\"let item of location.cities\" [value]=\"item.id\">{{item.name}}</option>\n           </select>\n        </div>\n  </div>\n\n  <div class=\"col-lg-2 col-md-2\">\n        <div class=\"form-group\">\n           <label>{{'filters.location.locality' | translate}}</label>\n        <select class=\"form-control\" (change)=\"getLocalityBuildings($event.target.value)\">\n           <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n           <option *ngFor=\"let item of location.localities\" [value]=\"item.id\">{{item.name}}</option>\n        </select>\n        </div>\n  </div>\n\n  <div class=\"col-lg-2 col-md-2\">\n     <div class=\"form-group marginB0\">\n        <label>{{'filters.location.building' | translate}}</label>\n           <select class=\"form-control\" (change)=\"setBuilding($event.target.value)\">\n              <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n           <option *ngFor=\"let building of parameter.buildings\" value=\"{{building.id}}\">{{building.name}}</option>\n           </select>\n     </div>\n  </div>\n  \n  <div class=\"col-lg-1 col-md-2\">\n        <div class=\"form-group btn-cont\">\n        <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n        <button type=\"button\" (click)=\"getListing()\" class=\"btn btn-primary-new width100P P86\">{{'filters.location.applyBtn' | translate}}</button>\n        </div>\n  </div>\n\n  <div class=\"col-lg-1 col-md-2\">\n        <div class=\"form-group btn-cont\">\n        <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n        <button type=\"button\" (click)=\"resetFilters()\" class=\"btn btn-primary-new width100P P86\">{{'filters.location.resetBtn' | translate}}</button>\n        </div>\n  </div>\n</div>\n\n     <div class=\"cust-tabs\">\n         <div class=\"row flex-wrap-reverse\">\n            <div class=\"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12\">\n               <div class=\"add-new pull-right\">\n                     <!-- *ngIf=\"admin?.admin_acl['Building Management']?.can_create==1 || admin?.permissions?.can_data_collector==1\"  -->\n                  <!-- <a \n                     class=\"btn\" href=\"javascript://\" routerLink=\"/dashboard/collections/add-collection/0\">{{'viewCollections.addNew' | translate}}</a> -->\n                     <a \n                     class=\"btn\" href=\"javascript://\" (click)=\"addcolle()\">{{'viewCollections.addNew' | translate}}</a>\n               </div>\n            </div>\n         </div>\n     <div class=\"tab-content white-bg\">\n        <div class=\"tab-pane active\">\n           <div class=\"tabel-section\">\n              <div class=\"table-responsive\">\n                 <table class=\"table table-striped table-align-left\">\n                    <tr>\n                       <th style=\"width:10%; text-align:left;\">\n                          <div class=\"table-search\">\n                             <label>{{'table.th.iDAccount' | translate}}</label>\n                             <div class=\"searh-3\">\n                                <input class=\"width100px\" type=\"text\" [(ngModel)]=\"parameter.keyword\" (keyup.enter)=\"getListing()\" >\n                                <button *ngIf=\"parameter.keyword\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                             </div>\n                          </div>\n                       </th>\n                       <th style=\"width:10%; text-align:left;\">\n                          <div class=\"table-search\">\n                             <label>{{'table.th.buyerName' | translate}}</label>\n                             <div class=\"searh-3\">\n                                <input class=\"width100px\" type=\"text\" [(ngModel)]=\"parameter.keyword\" (keyup.enter)=\"getListing()\" >\n                                <button *ngIf=\"parameter.keyword\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                             </div>\n                          </div>\n                       </th>\n                       <th style=\"width:10%; text-align:left;\">\n                          <div class=\"table-search\">\n                             <label>{{'table.th.buyerLegalRepresentative' | translate}}</label>\n                             <div class=\"searh-3\">\n                                <input class=\"width100px\" type=\"text\" [(ngModel)]=\"parameter.keyword\" (keyup.enter)=\"getListing()\" >\n                                <button *ngIf=\"parameter.keyword\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                             </div>\n                          </div>\n                       </th>\n                       <th style=\"width:10%; text-align:left;\">\n                          <div class=\"table-search\">\n                             <label>{{'table.th.sellerName' | translate}}</label>\n                             <div class=\"searh-3\">\n                                <input class=\"width100px\" type=\"text\" [(ngModel)]=\"parameter.keyword\" (keyup.enter)=\"getListing()\" >\n                                <button *ngIf=\"parameter.keyword\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                             </div>\n                          </div>\n                       </th>\n                       <th style=\"width:10%; text-align:left;\">\n                          <div class=\"table-search\">\n                             <label>{{'table.th.nameOfBuilding' | translate}}</label>\n                             <div class=\"searh-3\">\n                                <input class=\"width100px\" type=\"text\" [(ngModel)]=\"parameter.keyword\" (keyup.enter)=\"getListing()\" >\n                                <button *ngIf=\"parameter.keyword\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                             </div>\n                          </div>\n                       </th>\n                       <th style=\"width:10%; text-align:left;\">\n                          <div class=\"table-search\">\n                             <label>{{'table.th.nameOfTower' | translate}}</label>\n                             <div class=\"searh-3\">\n                                <input class=\"width100px\" type=\"text\" [(ngModel)]=\"parameter.tower_name\" (keyup.enter)=\"getListing()\" >\n                                <button *ngIf=\"parameter.tower_name\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                             </div>\n                          </div>\n                       </th>\n                       <th style=\"width:10%; text-align:left;\">\n                          <div class=\"table-search\">\n                             <label>{{'table.th.nameOfApartment' | translate}}</label>\n                             <div class=\"searh-3\">\n                                <input class=\"width120px\" type=\"text\" [(ngModel)]=\"parameter.name\" (keyup.enter)=\"getListing()\" >\n                                <button *ngIf=\"parameter.name\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                             </div>\n                          </div>\n                       </th>\n                       <th style=\"width:10%; text-align:left;\">\n                          <div class=\"table-search\">\n                             <label>{{'table.th.configuration' | translate}}</label>\n                             <select [(ngModel)]=\"parameter.configuration_id\" (change)=\"getListing()\">\n                                <option value=\"0\">{{'table.th.allConfiguration' | translate}}</option>\n                                <option *ngFor=\"let c of configurations\" value=\"{{c.id}}\" >\n                                   <!-- {{c.name}} -->\n                                   <span *ngIf=\"c.status\">\n                                      <app-property-configuration *ngIf=\"c\" [configuration]=\"c\"></app-property-configuration>\n                                   </span>\n                                </option>\n                             </select>\n                          </div>\n                       </th>\n                       <th style=\"width:10%; text-align:left;\">\n                          <div class=\"table-search\">\n                             <label>{{'table.th.locality' | translate}}</label>\n                             <div class=\"searh-3\">\n                                <input class=\"width100px\" type=\"text\" [(ngModel)]=\"parameter.keyword\" (keyup.enter)=\"getListing()\" >\n                                <button *ngIf=\"parameter.keyword\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                             </div>\n                          </div>\n                       </th>\n                       <th style=\"width:8%;vertical-align:top;\">\n                          <div (click)=\"sort_by(1)\" class=\"d-flex table-search\">\n                             <label>{{'table.th.purchaseDate' | translate}}</label>\n                             <a href=\"javascript://\"><img [ngClass]=\"{'upsidedown':parameter.sort_by==1 && parameter.sort_by_order==0}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a></div>\n                       </th>\n                       <th style=\"width:4%;vertical-align:top;\">\n                          <div class=\"d-flex table-search\">\n                             <label>{{'table.th.concept' | translate}}</label>\n                          </div>\n                       </th>\n                       <th style=\"width:8%;vertical-align:top;\">\n                          <div (click)=\"sort_by(1)\" class=\"d-flex table-search\">\n                             <label>{{'table.th.dateOfPayment' | translate}}</label></div>\n                       </th>\n                       <th style=\"width:4%;vertical-align:top;\">\n                          <div class=\"d-flex table-search\">\n                             <label>{{'table.th.amount' | translate}}</label>\n                          </div>\n                       </th>\n                       <th style=\"width:4%;vertical-align:top;\">\n                          <div (click)=\"sort_by(3)\" class=\"d-flex table-search\">\n                             <label>{{'table.th.concept' | translate}}</label>\n                             <a href=\"javascript://\"><img [ngClass]=\"{'upsidedown':parameter.sort_by==3 && parameter.sort_by_order==0}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n                          </div>\n                       </th>\n                       <th style=\"width:5%;vertical-align:top;\" *ngIf=\"parameter.flag==5\">\n                          <div class=\"d-flex table-search\">\n                             <label>{{'table.th.dateOfPayment' | translate}}</label>\n                          </div>\n                       </th>\n                       <th *ngIf=\"parameter.flag!=5\" style=\"width:5%;vertical-align:top;\">\n                          <div class=\"table-search\">\n                             <label>{{'table.th.amount' | translate}}</label>\n                             <div class=\"searh-3\">\n                                <input class=\"width100px\" type=\"text\" [(ngModel)]=\"parameter.seller_name\" (keyup.enter)=\"getListing()\" >\n                                <button *ngIf=\"parameter.seller_name\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                             </div>\n                          </div>\n                       </th>\n                       <th *ngIf=\"parameter.flag!=5\" style=\"width:6%;vertical-align:top;\">\n                          <div class=\"table-search\">\n                             <label>{{'table.th.totalCommission' | translate}}</label>\n                             <!-- <div class=\"searh-3\">\n                                <input class=\"width100px\" type=\"text\" [(ngModel)]=\"parameter.name\" (keyup.enter)=\"getListing()\" >\n                                <button *ngIf=\"parameter.name\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                             </div> -->\n                          </div>\n                       </th>\n                       <th *ngIf=\"parameter.flag!=5\" style=\"width:5%;vertical-align:top;\">\n                          <div class=\"table-search\">\n                             <label>{{'table.th.sharedCommission' | translate}}</label>\n                             <select [(ngModel)]=\"parameter.availability_filter\" (change)=\"getListing()\">\n                                <option value=\"0\">{{'table.th.all' | translate}}</option>\n                                <option value=\"1\">{{'table.th.buy' | translate}}</option>\n                                <option value=\"2\">{{'table.th.rent' | translate}}</option>\n                                <option value=\"3\">{{'table.th.inventory' | translate}}</option>\n                             </select>\n                          </div>\n                       </th>\n                       <th *ngIf=\"parameter.flag!=5\" style=\"width:5%;vertical-align:top;\">\n                          <div class=\"table-search\">\n                             <label>{{'table.th.commissionAgent' | translate}}</label>\n                             <select class=\"width100px\" [(ngModel)]=\"parameter.sold_filter\" (change)=\"getListing()\">\n                                <option value=\"0\">{{'table.th.all' | translate}}</option>\n                                <option value=\"1\">{{'table.th.yes' | translate}}</option>\n                                <option value=\"2\">{{'table.th.no' | translate}}</option>\n                             </select>\n                          </div>\n                       </th>\n                       <th style=\"width:10%; text-align:left;\">\n                          <div class=\"table-search\">\n                             <label>{{'table.th.amountPaid' | translate}}</label>\n                             <div class=\"searh-3\">\n                                <input class=\"width100px\" type=\"text\" [(ngModel)]=\"parameter.keyword\" (keyup.enter)=\"getListing()\" >\n                                <button *ngIf=\"parameter.keyword\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                             </div>\n                          </div>\n                       </th>\n                       <th style=\"width:10%; text-align:left;\">\n                           <div class=\"table-search\">\n                              <label>{{'table.th.remaniningAmount' | translate}}</label>\n                              <div class=\"searh-3\">\n                                 <input class=\"width100px\" type=\"text\" [(ngModel)]=\"parameter.keyword\" (keyup.enter)=\"getListing()\" >\n                                 <button *ngIf=\"parameter.keyword\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                              </div>\n                           </div>\n                        </th>\n                        <th style=\"width:10%; text-align:left;\">\n                        <div class=\"table-search\">\n                           <label>{{'table.th.statusAmount' | translate}}</label>\n                           <div class=\"searh-3\">\n                              <input class=\"width100px\" type=\"text\" [(ngModel)]=\"parameter.keyword\" (keyup.enter)=\"getListing()\" >\n                              <button *ngIf=\"parameter.keyword\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                           </div>\n                        </div>\n                     </th>\n                       <th style=\"width:10%;\" *ngIf=\"parameter.flag!=5\">\n                          <div class=\"table-search\">\n                             <label>{{'table.th.actions.label' | translate}}</label>\n                             <select [(ngModel)]=\"parameter.action_filter\" (change)=\"getListing()\">\n                                <option value=\"0\">{{'table.th.actions.all' | translate}}</option>\n                                <option value=\"3\">{{'table.th.actions.featured' | translate}}</option>\n                                <option value=\"1\">{{'table.th.actions.blocked' | translate}}</option>\n                                <option value=\"2\">{{'table.th.actions.unblocked' | translate}}</option>\n                             </select>\n                          </div>\n                       </th>\n                    </tr>\n              \n                    <tr *ngFor=\"let p of items | paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: total }; let i=index\">\n                     <td><span>{{p?.name ? p?.name : ('table.tr.td.NA' | translate)}}</span></td>\n                     <td><span>{{p?.name ? p?.name : ('table.tr.td.NA' | translate)}}</span></td>\n                     <td><span>{{p?.name ? p?.name : ('table.tr.td.NA' | translate)}}</span></td>\n                     <td><span>{{p?.name ? p?.name : ('table.tr.td.NA' | translate)}}</span></td>     \n                     <td class=\"cursor-pointer\" title=\"{{'table.title.clickToViewDetails' | translate}}\" (click)=\"viewPropertyDetails(p.id, p)\">\n                                <!-- routerLink=\"/dashboard/properties/details/{{p.id}}\" -->\n                             <strong>{{p?.building?.name?p?.building?.name: ('table.tr.td.NA' | translate)}}</strong>\n                             <div class=\"clearfix\"></div>\n                             <small *ngIf=\"p.quantity > 0\">\n                                {{p.quantity}} \n                                <span *ngIf=\"p.quantity == 1\">property</span>\n                                <span *ngIf=\"p.quantity > 1\">properties</span>\n                             </small>\n                          </td>\n                          <td><span>{{p?.building_towers ? p?.building_towers?.tower_name : ('table.tr.td.NA' | translate)}}</span></td>\n                          <td><span>{{p?.name ? p?.name : ('table.tr.td.NA' | translate)}}</span></td>\n                          <td>\n                             <app-property-configuration *ngIf=\"p.configuration\" [configuration]=\"p.configuration\"></app-property-configuration>\n                          </td>\n                          <td><span>{{p?.name ? p?.name : ('table.tr.td.NA' | translate)}}</span></td>\n                          <td><span>{{p.min_price | price}}</span></td>\n                          <td><span>\n                             <button (click)=\"editPricePopup(p, i)\" [disabled]=\"admin?.admin_acl['Property Management']?.can_update==0\" title=\"{{'table.title.editPrice' | translate}}\" class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></button>\n                          </span></td>\n                          <td><span>{{p.broker_commision | percentage}}</span></td>\n                          <td><span>\n                             <button (click)=\"editAgentCommissionPopup(p, i)\" [disabled]=\"admin?.admin_acl['Property Management']?.can_update==0\" title=\"{{'table.title.editPrice' | translate}}\" class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></button>\n                          </span></td>\n                          <td><span>{{p.lead_properties_count | numberWithCommas}}</span></td>\n                          \n                          <td *ngIf=\"parameter.flag==5\" class=\"cursor-pointer\" title=\"{{'table.title.viewSellerRequest' | translate}}\" (click)=\"showAllSellers(p?.id, i)\">\n                             <span class=\"green-color\"><span>{{'table.tr.td.view' | translate}}</span></span>\n                          </td>\n                          \n                          <td *ngIf=\"parameter.flag!=5\" class=\"cursor-pointer\" title=\"{{p?.selected_seller?.user?.name ? ('table.title.clickToChangeSeller' | translate) : ('table.title.clickToAddSeller' | translate)}}\" (click)=\"getAllSellers(p, '1', i)\">\n                             <span class=\"green-color\"><span>\n                                   {{p?.selected_seller?.user?.name ? p?.selected_seller?.user?.name : ('table.tr.td.add' | translate)}}\n                             </span></span>\n                          </td>\n                          \n                          <td *ngIf=\"parameter.flag!=5\" class=\"cursor-pointer\" (click)=\"getBothBroker(p, '')\">\n                             <span class=\"green-color\">\n                                <span title=\"{{p?.external_broker?.id ? ('table.title.clickToChange' | translate) : ('table.title.clickToAssign' | translate) }}\">{{p?.external_broker?.id ? ('table.tr.td.change' | translate) : ('table.tr.td.link' | translate)}}</span>\n                             </span>\n                          </td>\n                          <td *ngIf=\"parameter.flag!=5\" class=\"cursor-pointer\">\n                             <select (change)=\"changeSoldStatusPopup(p, i, $event)\">\n                                <option [selected]=\"p.for_sale==1\" value=\"1\">{{'table.th.buy' | translate}}</option>\n                                <option [selected]=\"p.for_rent==1\" value=\"2\">{{'table.th.rent' | translate}}</option>\n                                <option [selected]=\"p.for_hold==1\" value=\"3\">{{'table.th.inventory' | translate}}</option>\n                             </select>\n                          </td>\n                          <td *ngIf=\"parameter.flag!=5\">\n                             {{p?.is_property_sold ? ('table.th.yes' | translate) : ('table.th.no' | translate)}}\n                          </td>\n                          <td><span>{{p?.name ? p?.name : ('table.tr.td.NA' | translate)}}</span></td>\n                          <td><span>{{p?.name ? p?.name : ('table.tr.td.NA' | translate)}}</span></td>\n                          <td><span>{{p?.name ? p?.name : ('table.tr.td.NA' | translate)}}</span></td>\n                          <td *ngIf=\"parameter.flag!=5\">\n                          <div class=\"table-actions\">\n                             <button [disabled]=\"admin?.admin_acl['Property Management']?.can_update==0\" *ngIf=\"parameter?.flag!=3\" routerLink=\"../edit-property/{{p.id}}\" title=\"{{'table.title.editDetails' | translate}}\" class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></button>\n                             <button [disabled]=\"admin?.admin_acl['Property Management']?.can_update==0\" *ngIf=\"parameter?.flag==3\" routerLink=\"../edit-property/{{p.id}}/edit\" title=\"{{'table.title.editDetails' | translate}}\" class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></button>\n                             <button [disabled]=\"admin?.admin_acl['Property Management']?.can_delete==0\" *ngIf=\"!p.is_blocked\" (click)=\"blockUnblock(p, 1);\" class=\"action-icon\" title=\"{{'table.title.block' | translate}}\"><img src=\"assets/img/block.png\" alt=\"img\"></button>\n                             <button [disabled]=\"admin?.admin_acl['Property Management']?.can_delete==0\" *ngIf=\"p.is_blocked == true\" (click)=\"blockUnblock(p, 0);\" class=\"action-icon unblock-bg\" title=\"{{'table.title.unblock' | translate}}\"><img src=\"assets/img/unblock.png\" alt=\"img\"></button>\n                             \n                             <!-- unapprove -->\n                             <a style=\"display:none;\" #modalOpen data-toggle=\"modal\" data-target=\"#addPropertyReason\"></a>\n                             <button [disabled]=\"admin?.admin_acl['Property Management']?.can_update==0\" *ngIf=\"p.status == 3\" (click)=\"openCancellationModal(p, 4);\" class=\"action-icon\" title=\"{{'table.title.unapprove' | translate}}\"><img src=\"assets/img/ic_disapprove.png\" alt=\"img\"></button>\n\n                             <button [disabled]=\"admin?.admin_acl['Property Management']?.can_update==0\" *ngIf=\"p.status == 2\" (click)=\"changeStatus(p,3);\" class=\"action-icon\" title=\"{{'table.title.approve' | translate}}\"><img src=\"assets/img/tick.png\" alt=\"img\"></button>\n                             <button [disabled]=\"admin?.admin_acl['Property Management']?.can_update==0\" *ngIf=\"p.status == 3 && p.is_featured==0\" (click)=\"markPropertyFeatured(p,1);\" class=\"action-icon\" title=\"{{'table.title.markFeauture' | translate}}\"><img src=\"assets/img/ic_featured.png\" alt=\"img\"></button>\n                             <button [disabled]=\"admin?.admin_acl['Property Management']?.can_update==0\" *ngIf=\"p.status == 3 && p.is_featured==1\" (click)=\"markPropertyFeatured(p,0);\" class=\"action-icon\" title=\"{{'table.title.markUnfeauture' | translate}}\"><img src=\"assets/img/tick-selected.png\" alt=\"img\"></button>\n                             <!-- delete -->\n                             <button [disabled]=\"admin?.admin_acl['Property Management']?.can_purge==0\" (click)=\"deletePopup(p, i)\" class=\"action-icon\" \n                                title=\"{{'table.title.delete' | translate}}\"><img src=\"assets/img/ic_delete.png\" alt=\"img\"></button>\n                          </div>\n\n                          </td>\n                    </tr>\n                 </table>\n                 <div class=\"padding20 center\" *ngIf=\"total == 0\">\n                       <img src=\"assets/img/404-error.png\">\n                 </div>\n              </div>\n           </div>\n        </div>\n        <div class=\"tab-pane container fade\" id=\"seller\">{{'table.th.sellerTabOn' | translate}}</div>\n     </div>\n  </div>\n  \n<div class=\"btn-cont marginT15\" *ngIf=\"total\">\n     <div class=\"row\">\n         <div class=\"col-6\">\n             <div class=\"title-group\">\n                 <p>{{'table.pagination.showing' | translate}} {{items?.length}} {{'table.pagination.outof' | translate}} {{total}}</p>\n             </div>\n         </div>\n         <div class=\"col-6 text-right\">\n             <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n         </div>\n     </div>\n </div>\n</div>\n\n"

/***/ }),

/***/ "./src/app/layout/collections/collections.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/layout/collections/collections.component.ts ***!
  \*************************************************************/
/*! exports provided: CollectionsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CollectionsComponent", function() { return CollectionsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_services_property_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/property.service */ "./src/app/services/property.service.ts");
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








var CollectionsComponent = /** @class */ (function () {
    function CollectionsComponent(constant, admin, propertyService, spinner, route, router, translate) {
        this.constant = constant;
        this.admin = admin;
        this.propertyService = propertyService;
        this.spinner = spinner;
        this.route = route;
        this.router = router;
        this.translate = translate;
        this.parameter = {};
        this.location = {};
        this.items = [];
        this.total = 0;
        this.configurations = [];
        this.price_sort = 1;
        this.availability_sort = 1;
        this.lead_sort = 1;
        this.scrollbarOptions = { axis: 'y', theme: 'dark' };
    }
    CollectionsComponent.prototype.ngOnInit = function () {
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
        this.route.params.subscribe(function (params) {
            _this.parameter.project_id = params.project_id;
            console.log(params);
            if (params.type === 'agent') {
                _this.parameter.agent_id = params.id;
            }
            else if (params.type === 'agency') {
                _this.parameter.agency_id = params.id;
            }
        });
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        this.parameter.dash_flag = this.propertyService.dash_flag ? this.propertyService.dash_flag : this.constant.dash_flag;
        this.parameter.flag = 3;
        this.getCountries();
        this.getPropertyConfigurations();
        this.getListing();
    };
    CollectionsComponent.prototype.getListing = function () {
        var _this = this;
        this.spinner.show();
        var input = JSON.parse(JSON.stringify(this.parameter));
        if (this.parameter.min) {
            input.min = moment__WEBPACK_IMPORTED_MODULE_1__(this.parameter.min).format('YYYY-MM-DD');
        }
        else {
            delete input.min;
        }
        if (this.parameter.max) {
            input.max = moment__WEBPACK_IMPORTED_MODULE_1__(this.parameter.max).format('YYYY-MM-DD');
        }
        else {
            delete input.max;
        }
        if (this.parameter.agent_id) {
            input.agent_id = this.parameter.agent_id;
        }
        else {
            delete input.agent_id;
        }
        if (this.parameter.agency_id) {
            input.agency_id = this.parameter.agency_id;
        }
        else {
            delete input.agency_id;
        }
        delete input.seller_id;
        this.admin.postDataApi('propertyHome', input).subscribe(function (success) {
            _this.items = success.data;
            _this.total = success.total_count;
            _this.spinner.hide();
        }, function (error) {
            _this.spinner.hide();
        });
    };
    CollectionsComponent.prototype.getCountries = function () {
        var _this = this;
        this.admin.postDataApi('getCountryLocality', {}).subscribe(function (r) {
            _this.location.countries = r['data'];
        });
    };
    CollectionsComponent.prototype.getPropertyConfigurations = function () {
        var _this = this;
        this.admin.postDataApi('getPropertyConfigurations', {}).subscribe(function (r) {
            _this.configurations = r['data'];
        });
    };
    CollectionsComponent.prototype.onCountryChange = function (id) {
        this.parameter.country_id = id;
        this.location.states = [];
        this.parameter.state_id = '0';
        this.location.cities = [];
        this.parameter.city_id = '0';
        this.location.localities = [];
        this.parameter.locality_id = '0';
        this.parameter.buildings = [];
        this.parameter.building_id = '0';
        if (!id || id.toString() === '0') {
            return false;
        }
        this.parameter.country_id = id;
        var selectedCountry = this.location.countries.filter(function (x) { return x.id.toString() === id; });
        this.location.states = selectedCountry[0].states;
    };
    CollectionsComponent.prototype.onStateChange = function (id) {
        this.location.cities = [];
        this.parameter.city_id = '0';
        this.location.localities = [];
        this.parameter.locality_id = '0';
        this.parameter.buildings = [];
        this.parameter.building_id = '0';
        if (!id || id.toString() === '0') {
            return false;
        }
        this.parameter.state_id = id;
        var selectedState = this.location.states.filter(function (x) { return x.id.toString() === id; });
        this.location.cities = selectedState[0].cities;
    };
    CollectionsComponent.prototype.onCityChange = function (id) {
        this.location.localities = [];
        this.parameter.locality_id = '0';
        this.parameter.buildings = [];
        this.parameter.building_id = '0';
        if (!id || id.toString() === '0') {
            return false;
        }
        this.parameter.city_id = id;
        var selectedCountry = this.location.cities.filter(function (x) { return x.id.toString() === id; });
        this.location.localities = selectedCountry[0].localities;
    };
    CollectionsComponent.prototype.onLocalityChange = function (id) {
        this.parameter.buildings = [];
        this.parameter.building_id = '0';
        if (!id || id.toString() === '0') {
            return false;
        }
        this.parameter.locality_id = id;
    };
    CollectionsComponent.prototype.getLocalityBuildings = function (id) {
        var _this = this;
        if (!id || id.toString() === '0') {
            return false;
        }
        this.parameter.locality_id = id;
        this.spinner.show();
        this.admin.postDataApi('getLocalityBuildings', this.parameter)
            .subscribe(function (success) {
            _this.spinner.hide();
            _this.parameter.buildings = success.data;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    CollectionsComponent.prototype.setBuilding = function (building_id) {
        this.parameter.building_id = building_id;
    };
    CollectionsComponent.prototype.changeFlag = function (flag) {
        this.parameter.dash_flag = flag;
        this.propertyService.dash_flag = flag;
        if (flag === 5) {
            return false;
        }
        this.resetDates();
        this.getListing();
    };
    CollectionsComponent.prototype.changePropertyFlag = function (flag) {
        this.parameter.flag = flag;
        this.getListing();
    };
    CollectionsComponent.prototype.sort_by = function (sort_by) {
        if (this.parameter.sort_by !== sort_by) {
            this.parameter.sort_by = sort_by;
            this.parameter.sort_by_order = 1;
        }
        else {
            this.parameter.sort_by_order = this.parameter.sort_by_order ? 0 : 1;
        }
        this.getListing();
    };
    CollectionsComponent.prototype.getPage = function (page) {
        this.parameter.page = page;
        this.getListing();
    };
    CollectionsComponent.prototype.blockUnblock = function (item, flag) {
        var _this = this;
        switch (flag) {
            case 0:
                this.parameter.text = this.translate.instant('message.question.wantToUnblockProperty');
                this.parameter.successText = this.translate.instant('message.success.unblockedSuccessfully');
                break;
            case 1:
                this.parameter.text = this.translate.instant('message.question.wantToBlockProperty');
                this.parameter.successText = this.translate.instant('message.success.blockedSuccessfully');
                break;
        }
        swal({
            html: this.translate.instant('message.question.areYouSure') + '<br>' + this.parameter.text,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.blockProperty(item, flag);
            }
        });
    };
    CollectionsComponent.prototype.blockProperty = function (item, flag) {
        var _this = this;
        this.admin.postDataApi('blockProperty', { property_id: item.id, flag: flag })
            .subscribe(function (success) {
            swal(_this.translate.instant('swal.success'), _this.parameter.successText, 'success');
            item.is_blocked = flag;
            // this.items[this.parameter.index] = success.data;
        }, function (error) {
            swal(_this.translate.instant('swal.error'), error.error.message, 'error');
        });
    };
    CollectionsComponent.prototype.openCancellationModal = function (item, status) {
        this.item = item;
        this.parameter.status = status;
        this.modalOpen.nativeElement.click();
    };
    CollectionsComponent.prototype.closeModal = function () {
        this.modalClose.nativeElement.click();
    };
    CollectionsComponent.prototype.closeReasonModal = function () {
        this.rejectModalClose.nativeElement.click();
    };
    CollectionsComponent.prototype.changeStatus = function (item, status) {
        var _this = this;
        item.status = status;
        var input = { property_id: item.id, status_id: status, reason: '' };
        if (this.reason) {
            input.reason = this.reason;
        }
        this.admin.postDataApi('updatePropertyStatus', input).subscribe(function (r) {
            swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.propertyStatusChanged'), 'success');
            _this.closeModal();
        }, function (error) {
            swal(_this.translate.instant('swal.error'), error.error.message, 'error');
        });
    };
    CollectionsComponent.prototype.resetFilters = function () {
        this.location.countries = JSON.parse(JSON.stringify(this.location.countries));
        this.onCountryChange('0');
        this.parameter.is_selected = false;
        this.parameter.page = this.constant.p;
        this.parameter.dash_flag = 2;
        this.parameter.total = 0;
        this.parameter.count_flag = 1;
        this.resetDates();
        this.getListing();
    };
    CollectionsComponent.prototype.resetDates = function () {
        this.parameter.min = '';
        this.parameter.max = '';
    };
    CollectionsComponent.prototype.markPropertyFeatured = function (item, is_featured) {
        var _this = this;
        item.is_featured = is_featured;
        this.admin.postDataApi('markPropertyFeatured', { property_id: item.id, flag: is_featured }).subscribe(function (r) {
            var msg = is_featured === 1 ? _this.translate.instant('message.success.featuredSuccessfully') :
                _this.translate.instant('message.success.unfeaturedSuccessfully');
            swal(_this.translate.instant('swal.success'), msg, 'success');
        }, function (error) {
            swal(_this.translate.instant('swal.error'), error.error.message, 'error');
        });
    };
    CollectionsComponent.prototype.showAllSellers = function (property_id, index) {
        var _this = this;
        this.spinner.show();
        if (index !== '') {
            this.parameter.index = index;
        }
        this.admin.postDataApi('getSellerSelections', { property_id: property_id }).subscribe(function (r) {
            _this.spinner.hide();
            _this.linkSellerModal.nativeElement.click();
            _this.allSellers = r['data'];
            _this.selecter_seller = r['selecter_seller'];
        }, function (error) {
            _this.spinner.hide();
            swal(_this.translate.instant('swal.error'), error.error.message, 'error');
        });
    };
    CollectionsComponent.prototype.getAllSellers = function (property, keyword, index) {
        var _this = this;
        this.spinner.show();
        if (index !== '') {
            this.parameter.index = index;
        }
        if (property) {
            this.parameter.property_id = property.id;
            this.parameter.seller_id = property.selected_seller_id;
            this.admin.postDataApi('getSellerSelections', { property_id: property.id }).subscribe(function (r) {
                _this.allSellers = r['data'];
                _this.selecter_seller = r['selecter_seller'];
            });
        }
        var input = { name: '' };
        input.name = keyword !== '1' ? keyword : '';
        this.admin.postDataApi('getAllSellers', input).subscribe(function (r) {
            _this.spinner.hide();
            if (property) {
                _this.linkUserModal.nativeElement.click();
            }
            _this.allUsers = r['data'];
        }, function (error) {
            _this.spinner.hide();
            swal(_this.translate.instant('swal.error'), error.error.message, 'error');
        });
    };
    CollectionsComponent.prototype.linkSellerPopUp = function (property_id, user_id, status) {
        var _this = this;
        this.parameter.property_id = property_id;
        this.parameter.user_id = user_id;
        this.parameter.status = status;
        this.parameter.title = this.translate.instant('message.question.areYouSure');
        this.parameter.text = status === 1 ? this.translate.instant('message.question.wantToAccessThisRequest') :
            this.translate.instant('message.question.wantToRejectThisRequest');
        swal({
            html: this.parameter.title + '<br>' + this.parameter.text,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.changeStatusSellerSelection();
            }
        });
    };
    CollectionsComponent.prototype.showRejectSellerRequestModal = function (property_id, user_id, status) {
        this.parameter.property_id = property_id;
        this.parameter.user_id = user_id;
        this.parameter.status = status;
        this.closeLinkSellerModal.nativeElement.click();
        this.closeLinkUserModal.nativeElement.click();
        this.rejectModalOpen.nativeElement.click();
    };
    CollectionsComponent.prototype.changeStatusPopUp = function (property_id, user_id, name, status, type) {
        var _this = this;
        this.parameter.property_id = property_id;
        this.parameter.user_id = user_id;
        this.parameter.fullName = name;
        this.parameter.status = status;
        this.parameter.title = this.translate.instant('message.question.areYouSure');
        if (type === 'request') {
            this.parameter.text = status === 1 ? this.translate.instant('message.question.wantToAccessThisRequest') :
                this.translate.instant('message.question.wantToRejectThisRequest');
        }
        else {
            this.parameter.text = status === 1 ? this.translate.instant('message.question.wantToLinkSeller') :
                this.translate.instant('message.question.wantToUnLinkSeller');
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
                _this.changeStatusSellerSelection();
            }
        });
    };
    CollectionsComponent.prototype.changeStatusSellerSelection = function () {
        var _this = this;
        var input = { property_id: this.parameter.property_id, user_id: this.parameter.user_id, status: this.parameter.status, reason: '' };
        if (this.reason) {
            input.reason = this.reason;
        }
        this.admin.postDataApi('changeStatusSellerSelection', input).subscribe(function (r) {
            if (_this.parameter.status === 1) {
                _this.parameter.seller_id = _this.parameter.user_id;
                _this.items[_this.parameter.index].selected_seller_id = _this.parameter.user_id;
                var sel_user = {
                    user: { name: '' }
                };
                _this.items[_this.parameter.index].selected_seller = sel_user;
                _this.items[_this.parameter.index].selected_seller.user.name = _this.parameter.fullName;
            }
            // const text = this.parameter.status === 1 ? 'accepted' : 'rejected';
            swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.doneSuccessfully'), 'success');
            // accept => then close listing modal
            if (_this.parameter.status === 1) {
                _this.closeLinkSellerModal.nativeElement.click();
                _this.closeLinkUserModal.nativeElement.click();
            }
            // else reason modal
            _this.rejectModalClose.nativeElement.click();
        }, function (error) {
            swal(_this.translate.instant('swal.error'), error.error.message, 'error');
        });
    };
    CollectionsComponent.prototype.changeSoldStatusPopup = function (property, index, event) {
        var _this = this;
        swal({
            html: this.translate.instant('message.question.areYouSure') + '<br>' + this.translate.instant('message.question.wantToChangeStatus'),
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.changePropertySoldStatus(property, index, event.target.value);
            }
            else {
                if (property.for_sale === 1) {
                    event.target.value = 1;
                }
                else if (property.for_rent === 1) {
                    event.target.value = 2;
                }
                else {
                    event.target.value = 3;
                }
            }
        });
    };
    CollectionsComponent.prototype.changePropertySoldStatus = function (property, index, value) {
        var _this = this;
        this.property_status = value;
        this.items[index].for_sale = 0;
        this.items[index].for_rent = 0;
        this.items[index].for_hold = 0;
        var input = {
            property_id: property.id,
            for_hold: 0,
            for_sale: 0,
            for_rent: 0
        };
        if (value === '1') {
            this.items[index].for_sale = 1;
            input.for_sale = 1;
        }
        else if (value === '2') {
            this.items[index].for_rent = 1;
            input.for_rent = 1;
        }
        else {
            this.items[index].for_hold = 1;
            input.for_hold = 1;
        }
        this.admin.postDataApi('changePropertySoldStatus', input).subscribe(function (r) {
            swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.changedSuccessfully'), 'success');
        }, function (error) {
            swal(_this.translate.instant('swal.error'), error.error.message, 'error');
        });
    };
    CollectionsComponent.prototype.deletePopup = function (property, index) {
        var _this = this;
        swal({
            html: this.translate.instant('message.question.areYouSure') + '<br>' +
                this.translate.instant('message.question.wantToDeleteProperty'),
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.deleteProperty(property, index);
            }
        });
    };
    CollectionsComponent.prototype.deleteProperty = function (property, index) {
        var _this = this;
        this.admin.postDataApi('deleteProperty', { property_id: property.id }).subscribe(function (r) {
            swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.deletedSuccessfully'), 'success');
            _this.items.splice(index, 1);
        }, function (error) {
            swal(_this.translate.instant('swal.error'), error.error.message, 'error');
        });
    };
    CollectionsComponent.prototype.getBothBroker = function (property, keyword) {
        var _this = this;
        this.spinner.show();
        if (property) {
            this.property = property;
        }
        var input = { keyword: '' };
        input.keyword = keyword;
        this.admin.postDataApi('getBothBroker', input).subscribe(function (r) {
            _this.spinner.hide();
            if (property) {
                _this.linkExtBrokerModal.nativeElement.click();
            }
            _this.allExtBrokers = r['data'];
        }, function (error) {
            _this.spinner.hide();
            swal(_this.translate.instant('swal.error'), error.error.message, 'error');
        });
    };
    CollectionsComponent.prototype.attachExternalBrokerPopUp = function (broker, flag) {
        var _this = this;
        this.parameter.text = flag === 1 ? this.translate.instant('message.question.wantToLinkAgent') :
            this.translate.instant('message.question.wantToUnLinkAgent');
        swal({
            html: this.translate.instant('message.question.areYouSure') + '<br>' + this.parameter.text,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.attachExternalBroker(broker, flag);
            }
        });
    };
    CollectionsComponent.prototype.attachExternalBroker = function (broker, flag) {
        var _this = this;
        this.admin.postDataApi('attachExternalBroker', {
            property_id: this.property.id,
            broker_id: broker.id, flag: flag
        }).subscribe(function (r) {
            _this.closeExtBrokerModal.nativeElement.click();
            _this.property.external_broker = flag === 1 ? broker : null;
            var text = flag === 1 ? _this.translate.instant('message.success.linkedSuccessfully') :
                _this.translate.instant('message.success.unlinkedSuccessfully');
            swal(_this.translate.instant('swal.success'), text, 'success');
        }, function (error) {
            swal(_this.translate.instant('swal.error'), error.error.message, 'error');
        });
    };
    CollectionsComponent.prototype.editPricePopup = function (item, index) {
        var _this = this;
        this.parameter.title = this.translate.instant('message.question.areYouSure');
        swal({
            text: this.translate.instant('message.question.doYouWantToChangeThePrice'),
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                swal({
                    text: _this.translate.instant('message.question.pleaseEnterNewPropertyPrice'),
                    input: 'number',
                    showCancelButton: true,
                    confirmButtonColor: _this.constant.confirmButtonColor,
                    cancelButtonColor: _this.constant.cancelButtonColor,
                    confirmButtonText: 'Update',
                    inputValidator: function (value) {
                        if (!value) {
                            return _this.translate.instant('message.error.pleaseEnterNewPrice');
                        }
                    }
                }).then(function (r) {
                    if (r.value) {
                        _this.admin.postDataApi('updatePrice', { id: item.id, price: r.value }).subscribe(function (success) {
                            _this.items[index].min_price = r.value;
                            swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.updatedSuccessfully'), 'success');
                        }, function (error) {
                            swal(_this.translate.instant('swal.error'), error.error.message, 'error');
                        });
                    }
                });
            }
        });
    };
    CollectionsComponent.prototype.editAgentCommissionPopup = function (item, index) {
        var _this = this;
        this.parameter.title = this.translate.instant('message.question.areYouSure');
        swal({
            text: this.translate.instant('message.question.doYouWantToChangeTheCommission'),
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                swal({
                    text: _this.translate.instant('message.question.pleaseEnterNewCommission') + ' -',
                    input: 'number',
                    showCancelButton: true,
                    confirmButtonColor: _this.constant.confirmButtonColor,
                    cancelButtonColor: _this.constant.cancelButtonColor,
                    confirmButtonText: 'Update',
                    inputValidator: function (value) {
                        if (!value) {
                            return _this.translate.instant('message.question.pleaseEnterNewCommission');
                        }
                    }
                }).then(function (r) {
                    if (r.value) {
                        _this.admin.postDataApi('updateBrokerCommision', { id: item.id, broker_commision: r.value }).subscribe(function (success) {
                            _this.items[index].broker_commision = r.value;
                            swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.updatedSuccessfully'), 'success');
                        }, function (error) {
                            swal(_this.translate.instant('swal.error'), error.error.message, 'error');
                        });
                    }
                });
            }
        });
    };
    CollectionsComponent.prototype.viewPropertyDetails = function (property_id, data) {
        // this.propertyService.property = data;
        this.propertyService.setPropertyData(data);
        this.router.navigate(['/dashboard/properties/details', property_id]);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalOpen'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CollectionsComponent.prototype, "modalOpen", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CollectionsComponent.prototype, "modalClose", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('rejectModalOpen'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CollectionsComponent.prototype, "rejectModalOpen", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('rejectModalClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CollectionsComponent.prototype, "rejectModalClose", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('linkUserModal'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CollectionsComponent.prototype, "linkUserModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('closeLinkUserModal'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CollectionsComponent.prototype, "closeLinkUserModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('linkSellerModal'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CollectionsComponent.prototype, "linkSellerModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('closeLinkSellerModal'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CollectionsComponent.prototype, "closeLinkSellerModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('linkExtBrokerModal'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CollectionsComponent.prototype, "linkExtBrokerModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('closeExtBrokerModal'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CollectionsComponent.prototype, "closeExtBrokerModal", void 0);
    CollectionsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-collections',
            template: __webpack_require__(/*! ./collections.component.html */ "./src/app/layout/collections/collections.component.html"),
            styles: [__webpack_require__(/*! ./collections.component.css */ "./src/app/layout/collections/collections.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_common_constants__WEBPACK_IMPORTED_MODULE_3__["Constant"],
            src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_4__["AdminService"],
            src_app_services_property_service__WEBPACK_IMPORTED_MODULE_6__["PropertyService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_2__["NgxSpinnerService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateService"]])
    ], CollectionsComponent);
    return CollectionsComponent;
}());



/***/ }),

/***/ "./src/app/layout/collections/collections.module.ts":
/*!**********************************************************!*\
  !*** ./src/app/layout/collections/collections.module.ts ***!
  \**********************************************************/
/*! exports provided: CollectionsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CollectionsModule", function() { return CollectionsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");
/* harmony import */ var ng2_tel_input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ng2-tel-input */ "./node_modules/ng2-tel-input/ng2-tel-input.js");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var ng_lazyload_image__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng-lazyload-image */ "./node_modules/ng-lazyload-image/fesm5/ng-lazyload-image.js");
/* harmony import */ var ngx_malihu_scrollbar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-malihu-scrollbar */ "./node_modules/ngx-malihu-scrollbar/fesm5/ngx-malihu-scrollbar.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var src_app_modules_shared_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/modules/shared.module */ "./src/app/modules/shared.module.ts");
/* harmony import */ var primeng_primeng__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! primeng/primeng */ "./node_modules/primeng/primeng.js");
/* harmony import */ var primeng_primeng__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(primeng_primeng__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _add_edit_collection_add_edit_collection_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./add-edit-collection/add-edit-collection.component */ "./src/app/layout/collections/add-edit-collection/add-edit-collection.component.ts");
/* harmony import */ var _collections_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./collections.component */ "./src/app/layout/collections/collections.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// third party libraries















var routes = [
    // {
    //   path: 'view-collections', component: CollectionsComponent,
    //   canActivate: [AclUserGuard], data: { roles: ['Property Management', 'can_read', ''] }
    // }
    {
        path: 'view-collections', component: _collections_component__WEBPACK_IMPORTED_MODULE_14__["CollectionsComponent"]
    },
    {
        path: 'add-collection/:id', component: _add_edit_collection_add_edit_collection_component__WEBPACK_IMPORTED_MODULE_13__["AddEditCollectionComponent"]
    }
];
var CollectionsModule = /** @class */ (function () {
    function CollectionsModule() {
    }
    CollectionsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes),
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                ngx_spinner__WEBPACK_IMPORTED_MODULE_4__["NgxSpinnerModule"],
                _agm_core__WEBPACK_IMPORTED_MODULE_5__["AgmCoreModule"].forRoot({
                    apiKey: 'AIzaSyDykCJGMqHIwJluSmSiqKTJBVN2KauM_uQ',
                    libraries: ['drawing', 'places']
                }),
                ng2_tel_input__WEBPACK_IMPORTED_MODULE_6__["Ng2TelInputModule"],
                ngx_pagination__WEBPACK_IMPORTED_MODULE_7__["NgxPaginationModule"],
                primeng_primeng__WEBPACK_IMPORTED_MODULE_12__["CalendarModule"],
                src_app_modules_shared_module__WEBPACK_IMPORTED_MODULE_11__["SharedModule"],
                ng_lazyload_image__WEBPACK_IMPORTED_MODULE_8__["LazyLoadImageModule"],
                ngx_malihu_scrollbar__WEBPACK_IMPORTED_MODULE_9__["MalihuScrollbarModule"].forRoot(),
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__["TranslateModule"]
            ],
            declarations: [
                _collections_component__WEBPACK_IMPORTED_MODULE_14__["CollectionsComponent"],
                _add_edit_collection_add_edit_collection_component__WEBPACK_IMPORTED_MODULE_13__["AddEditCollectionComponent"]
            ]
        })
    ], CollectionsModule);
    return CollectionsModule;
}());



/***/ })

}]);
//# sourceMappingURL=collections-collections-module.js.map