(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["properties-properties-module"],{

/***/ "./src/app/layout/properties/add-property/add-property.component.css":
/*!***************************************************************************!*\
  !*** ./src/app/layout/properties/add-property/add-property.component.css ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".upload-cover-img{\n    /* background-size: contain;background-repeat: no-repeat; */\n}\n.width100{\n    width: 100%;\n}\n.paddingleft0{\n    padding-left: 0px;\n}\nagm-map {\n    height: 300px;\n}\n.floor-plan{\n    -o-object-fit: cover;\n       object-fit: cover;\n    width: 100%;\n    height: auto;\n}\n.upload-cover-img{\n    display: flex;\n}"

/***/ }),

/***/ "./src/app/layout/properties/add-property/add-property.component.html":
/*!****************************************************************************!*\
  !*** ./src/app/layout/properties/add-property/add-property.component.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<div class=\"white-bg padding15\">\n  <div class=\"row\">\n    <div class=\"col-md-6\">\n      <div class=\"title-group\">\n        <h5 *ngIf=\"!editMode\"><a routerLink=\"/dashboard/properties/view-properties\" href=\"javascript://\"><i class=\"fa fa-angle-double-left\"></i> </a> &nbsp;&nbsp;Add New Property</h5>\n        <h5 *ngIf=\"editMode\"> <a routerLink=\"/dashboard/properties/view-properties\" href=\"javascript://\"><i class=\"fa fa-angle-double-left\"></i> </a> &nbsp;&nbsp;Edit Property {{name}}</h5>\n      </div>\n    </div>\n    <div class=\"col-md-6 btn-cont\">\n        <!-- <app-add-lead *ngIf=\"this.parameter?.property_id && editMode\"  [property_id]=\"parameter.property_id\"></app-add-lead> -->\n    </div>\n  </div>\n</div>\n\n<!-- <ngx-loading [show]=\"parameter.loading\"></ngx-loading> -->\n\n<div class=\"spacer10\"></div>\n\n<div class=\"white-bg add-property padding20\">\n  <div class=\"steps\">\n    <ul class=\"d-flex\">\n      <li [ngClass]=\"{'current': tab == 1}\"><span></span><a (click)=\"setTab(1)\">Create Draft</a></li>\n      <li [ngClass]=\"{'current': tab == 2}\"><span></span><a (click)=\"setTab(2)\">Additional Info</a></li>\n      <li [ngClass]=\"{'current': tab == 3}\"><span></span><a (click)=\"setTab(3)\">Preferable Buyers</a></li>\n      <li [ngClass]=\"{'current': tab == 4}\"><span></span><a (click)=\"setTab(4)\">Custom</a></li>\n      <li [ngClass]=\"{'current': tab == 5}\"><span></span><a (click)=\"setTab(5)\">Tag a Building</a></li>\n      <!-- <li [ngClass]=\"{'current': tab == 1}\" [ngClass]=\"{'selected': tab > 1}\"><span></span><a>Create Draft</a></li>\n      <li [ngClass]=\"{'current': tab == 2}\" [ngClass]=\"{'selected': tab > 2}\"><span></span><a>Additional Info</a></li>\n      <li [ngClass]=\"{'current': tab == 3}\" [ngClass]=\"{'selected': tab > 3}\"><span></span><a>Preferable Buyers</a></li>\n      <li [ngClass]=\"{'current': tab == 4}\" [ngClass]=\"{'selected': tab > 4}\"><span></span><a>Custom</a></li>\n      <li [ngClass]=\"{'current': tab == 5}\" [ngClass]=\"{'selected': tab > 5}\"><span></span><a>Tag a Building</a></li>\n      <li [ngClass]=\"{'current': tab == 6}\" [ngClass]=\"{'selected': tab > 6}\"><span></span><a>Submit</a></li> -->\n    </ul>\n  </div>\n</div>\n\n<div class=\"spacer10\"></div>\n\n<form ngNativeValidate #createDraft=\"ngForm\" (ngSubmit)=\"addProperty(createDraft, 2)\">\n\n  <!-- tab-1 -->\n  <div class=\"white-bg padding20\" *ngIf=\"tab==1\">\n    <div class=\"page-title\">\n      <h3>Create Draft</h3>\n    </div>\n    <div class=\"padding55 paddingT0\">\n    <div class=\"form-group-3\">\n      <label class=\"p16-two\">This Property is available for? <span class=\"color-red\">*</span></label>\n      <div class=\"clearfix\"></div>\n      <label class=\"cust-radio\">\n        <!-- <input type=\"checkbox\" value=\"{{model.for_sale}}\" name=\"for_sale\" checked=\"{{m.checked}}\"> -->\n        <input value=\"true\" name=\"for_sale\"  type=\"radio\" (change)=\"model.for_sale = true\" [checked]=\"model.for_sale == true ?'checked':''\">\n        <span class=\"checkmark\">Buy</span>\n      </label>\n      <label class=\"cust-radio\">\n        <input value=\"false\" name=\"for_sale\" type=\"radio\" (change)=\"model.for_sale = false\" [checked]=\"model.for_sale == false ?'checked':''\">\n        <span class=\"checkmark\">Rent</span>\n      </label>\n      <div class=\"clearfix\"></div>\n    </div>\n      <div class=\"spacer15\"></div>\n      <div class=\"row\">\n        <div class=\"col-lg-3 col-md-12 col-sm-12 col-12\">\n          <div class=\"form-group-3\">\n            <label class=\"p16-two\">Select Country <span class=\"color-red\">*</span></label>\n            <select title=\"Choose Country\" required class=\"form-control\" (change)=\"getStates($event.target.value)\">\n              <option value=\"\" disabled>Select Country</option>\n              <option *ngFor=\"let country of parameter.countries\" value=\"{{country.id}}\" [selected]=\"country.id == model.country_id\">{{country.name_en}}</option>\n            </select>\n            <!-- <select title=\"Choose Country\" required class=\"form-control\" name=\"country_id\" [(ngModel)]=\"model.country_id\">\n              <option value=\"\" disabled>Select Country</option>\n              <option *ngFor=\"let country of parameter.countries\" value=\"{{country.id}}\">{{country.name_en}}</option>\n            </select> -->\n          </div>\n        </div>\n        <div class=\"col-lg-3 col-md-12 col-sm-12 col-12\">\n          <div class=\"form-group-3\">\n            <label class=\"p16-two\">&nbsp;</label>\n            <select title=\"Choose State\" required class=\"form-control\" (change)=\"getCities($event.target.value)\">\n              <option value=\"\" >Select State</option>\n              <option *ngFor=\"let state of parameter.states\" value=\"{{state.id}}\" [selected]=\"state.id == model.state_id\">{{state.name_en}}</option>\n            </select>\n            <!-- <select title=\"Choose State\" required class=\"form-control\" name=\"state_id\" [(ngModel)]=\"model.state_id\">\n              <option value=\"\" disabled>Select State</option>\n              <option *ngFor=\"let state of parameter.states\" value=\"{{state.id}}\">{{state.name_en}}</option>\n            </select> -->\n          </div>\n        </div>\n        <div class=\"col-lg-3 col-md-12 col-sm-12 col-12\">\n          <div class=\"form-group-3\">\n            <label class=\"p16-two\">&nbsp;</label>\n            <select title=\"Choose City\" required class=\"form-control\" (change)=\"getLocalities($event.target.value)\">\n              <option value=\"\" >Select City</option>\n              <option *ngFor=\"let city of parameter.cities\" value=\"{{city.id}}\" [selected]=\"city.id == model.city_id\">{{city.name_en}}</option>\n            </select>\n            <!-- <select title=\"Choose City\" class=\"form-control\" name=\"city_id\" [(ngModel)]=\"model.city_id\">\n              <option value=\"\" disabled>Select City</option>\n              <option *ngFor=\"let city of parameter.cities\" value=\"{{city.id}}\">{{city.name_en}}</option>\n            </select> -->\n          </div>\n        </div>\n        <div class=\"col-lg-3 col-md-12 col-sm-12 col-12\">\n          <div class=\"form-group-3\">\n            <label class=\"p16-two\">&nbsp;</label>\n            <select title=\"Choose Locality\" required class=\"form-control\" (change)=\"setValue('locality_id', $event.target.value)\">\n              <option value=\"\" >Select Locality</option>\n              <option *ngFor=\"let locality of parameter.localities\" value=\"{{locality.id}}\" [selected]=\"locality.id == model.locality_id\">{{locality.name_en}}</option>\n            </select>\n            <!-- <select title=\"Choose Locality\" class=\"form-control\" name=\"locality_id\" [(ngModel)]=\"model.locality_id\">\n              <option value=\"\" disabled>Select Locality</option>\n              <option *ngFor=\"let locality of parameter.localities\" value=\"{{locality.id}}\">{{locality.name_en}}</option>\n            </select> -->\n          </div>\n        </div>\n      </div>\n    <div class=\"spacer15\"></div>\n\n    <div class=\"form-group-3\">\n      <label class=\"p16-two\">Select Configuration? <span class=\"color-red\">*</span></label>\n      <div class=\"clearfix\"></div>\n      <label class=\"cust-radio\" *ngFor=\"let configuration of parameter.items\">\n        <input type=\"radio\" required (change)=\"setValue('configuration_id', configuration.id)\" value=\"{{configuration.id}}\" [checked]=\"model.configuration_id == configuration.id ? 'checked' : ''\" name=\"configuration_id\">\n        <span class=\"checkmark\">{{configuration.name_en}}</span>\n      </label>\n      <div class=\"clearfix\"></div>\n    </div>\n    <div class=\"spacer15\"></div>\n\n    <div class=\"form-group-3\">\n      <label class=\"p16-two\">Select Property Type? <span class=\"color-red\">*</span></label>\n      <div class=\"clearfix\"></div>\n      <label class=\"cust-radio\" *ngFor=\"let propertyType of parameter.propertyTypes\">\n        <input type=\"radio\" (change)=\"setValue('property_type_id', propertyType.id)\" value=\"{{propertyType.id}}\" [checked]=\"model.property_type_id == propertyType.id ? 'checked' : ''\" name=\"property_type_id\">\n        <span class=\"checkmark\">{{propertyType.name_en}}</span>\n      </label>\n      <div class=\"clearfix\"></div>\n    </div>\n\n    <div class=\"spacer15\"></div>\n      <div class=\"row\">\n        \n        <div class=\"col-md-4 col-sm-12 col-12\">\n          <div class=\"form-group-3 eca\">\n            <label class=\"p16-two\">Enter Carpet Area <span class=\"color-red\">*</span></label>\n            <input class=\"form-control\" type=\"number\" name=\"area[{{c}}]\" placeholder=\"Area should be in Sq/ft.\" [(ngModel)]=\"newcarpet_area.area\">\n          </div>\n        </div>\n        <div class=\"col-md-4 col-sm-12 col-12\">\n          <div class=\"form-group-3 eap\">\n            <label class=\"p16-two\">Enter Average Price <span class=\"color-red\">*</span></label>\n            <input class=\"form-control\" type=\"number\" name=\"price[{{c}}]\" placeholder=\"Amount should be in $\" [(ngModel)]=\"newcarpet_area.price\">\n          </div>\n        </div>\n        <div class=\"col-md-2 col-sm-12 col-12\">\n            <a href=\"javascript://\" class=\"add-more btn\" (click)=\"addCarpetArea()\">Add More</a>\n        </div>\n      </div>\n\n      <div class=\"row\" *ngFor=\"let carpet_area of model.carpet_areas; let c = index;\">\n        <div class=\"col-md-4 col-sm-12 col-12\">\n          <div class=\"form-group-3 eca\">\n            <label class=\"p16-two\">Enter Carpet Area <span class=\"color-red\">*</span></label>\n            <input required class=\"form-control\" required type=\"number\" [value]=\"carpet_area.area\" disabled />\n          </div>\n        </div>\n        <div class=\"col-md-4 col-sm-12 col-12\">\n          <div class=\"form-group-3 eap\">\n            <label class=\"p16-two\">Enter Average Price <span class=\"color-red\">*</span></label>\n            <input required class=\"form-control\" required type=\"number\" [value]=\"carpet_area.price\" disabled />\n          </div>\n        </div>\n        <div class=\"col-md-2 col-sm-12 col-12\">\n          <div class=\"btn-cont form-group-3\">\n            <a href=\"javascript://\" class=\"btn delete-button marginT30\" (click)=\"model.carpet_areas.splice(c, 1)\">\n              <img src=\"assets/img/delete-button.png\" width=\"40\" style=\"width: 20px; margin-top: 10px;\">\n            </a>\n          </div>\n        </div>\n      </div>\n\n      \n      <div class=\"row\">\n        <div class=\"col-md-12\">\n          <div class=\"btn-cont text-right\">\n            <!-- <a class=\"btn-third btn\" [disabled]=\"addForm.invalid\" type=\"submit\" href=\"javascript://\" (click)=\"addProperty(addForm, 2)\">Next</a> -->\n            <button type=\"submit\" [disabled]=\"createDraft.invalid\" class=\"btn btn-primary\">Next</button>\n          </div>\n        </div>\n      </div>\n\n    </div>\n  </div>\n  </form>\n\n\n\n  <form  ngNativeValidate #additionalInfo=\"ngForm\" (ngSubmit)=\"addProperty(additionalInfo, 3)\">\n  <!-- tab-2 -->\n  <div class=\"white-bg\" *ngIf=\"tab==2\">\n    <div class=\"page-title\">\n      <h3>Additional Info</h3>\n    </div>\n    <div class=\"padding40\">\n      <div class=\"form-group-3\">\n      <label class=\"p16-two\">Add Images of your Property <span class=\"color-red\">*</span></label>\n        <div class=\"row\">\n          <div class=\"col-md-7 col-sm-12 col-12\">\n            <!-- <div class=\"upload-cover-img\" [style.background-image]=\"image1\"> -->\n            <div class=\"upload-cover-img\">\n\n              <img [src]=\"model.cover_image\" onerror=\"this.src='assets/img/placeholder.png'\" class=\"floor-plan\">\n              <div *ngIf=\"!model.cover_image\" class=\"upload-caption\">\n                <p class=\"green-color marginT30\">+Upload Cover image for the project</p>\n                <p>JPG or PNG. Image size should be 1920 × 1080 pixels (for HiDPI displays).</p>\n              </div>\n              <input type=\"file\" name=\"\" accept=\"image/*\" (change)=\"onSelectFile('cover_image', $event)\">\n            </div>\n          </div>\n          <div class=\"col-md-5 col-sm-12 col-12\">\n            <!-- <div class=\"upload-cover-img upload-cover-small\" [style.background-image]=\"image3\"> -->\n            <div class=\"upload-cover-img upload-cover-small\">\n              <img [src]=\"model.floor_plan\" onerror=\"this.src='assets/img/placeholder.png'\" class=\"floor-plan\">\n              <input type=\"file\" name=\"\" accept=\"image/*\" (change)=\"onSelectFile('floor_plan', $event)\">\n              <div *ngIf=\"!model.floor_plan\"class=\"upload-caption\">\n                <p class=\"green-color marginT30\">+ Add Floor plan</p>\n              </div>\n            </div>\n            <div class=\"upload-cover-img upload-cover-small\" >\n                <img [src]=\"model.images[0]?.image\" onerror=\"this.src='assets/img/placeholder-img.png'\" class=\"img-fluid\">\n                <div class=\"upload-caption\">\n                  <p *ngIf=\"model?.images?.length > 1\" class=\"number\" (click)=\"modelOpenFun()\">+{{model?.images?.length-1}}</p>\n                  <p *ngIf=\"model?.images?.length <= 1\" class=\"green-color\"  (click)=\"modelOpenFun()\">+ Add more images</p>\n                </div>\n            </div>\n\n          </div>\n        </div>\n      </div>\n\n    <div class=\"row\">\n      <!-- <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n        <div class=\"form-group-3\">\n          <label>Total Area</label>\n          <input class=\"form-control\" type=\"number\" name=\"\" placeholder=\"in sq.ft.\">\n        </div>\n      </div> -->\n      <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n        <div class=\"form-group-3\">\n          <label>Floors <span class=\"color-red\">*</span></label>\n          <input class=\"form-control\" min=\"1\" [(ngModel)]=\"model.floor\" type=\"number\" name=\"floor\" placeholder=\"in numbers\">\n        </div>\n      </div>\n\n      <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n        <div class=\"form-group-3\">\n          <label>Bedrooms <span class=\"color-red\">*</span></label>\n          <input class=\"form-control\" min=\"1\" [(ngModel)]=\"model.bedroom\" type=\"number\" name=\"bedroom\" placeholder=\"in numbers\">\n        </div>\n      </div>\n      <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n        <div class=\"form-group-3\">\n          <label>Bathrooms <span class=\"color-red\">*</span></label>\n          <input class=\"form-control\" min=\"1\" [(ngModel)]=\"model.bathroom\" type=\"number\" name=\"bathroom\" placeholder=\"in numbers\">\n        </div>\n      </div>\n    </div>\n    <div class=\"form-group-3\">\n      <label>Is Parking Available? <span class=\"color-red\">*</span></label>\n      <div class=\"clearfix\"></div>\n      <label class=\"cust-radio\">\n        <input type=\"radio\" (change)=\"setValue('parking', 1)\" value=\"1\" [checked]=\"model.parking == 1 ? 'checked' : ''\" name=\"parking\">\n        <span class=\"checkmark\">Yes</span>\n      </label>\n      <label class=\"cust-radio\">\n        <input type=\"radio\" (change)=\"setValue('parking', 0)\" value=\"0\" [checked]=\"model.parking == 0 ? 'checked' : ''\" name=\"parking\">\n        <span class=\"checkmark\">No</span>\n      </label>\n      <div class=\"clearfix\"></div>\n    </div>\n    <div class=\"spacer15\"></div>\n    <div class=\"form-group-3\">\n      <label>Is Property Furnished? <span class=\"color-red\">*</span></label>\n      <div class=\"clearfix\"></div>\n      <label class=\"cust-radio\">\n        <input type=\"radio\" (change)=\"setValue('furnished', 1)\" value=\"1\" [checked]=\"model.furnished == 1 ? 'checked' : ''\" name=\"furnished\">\n        <span class=\"checkmark\">Yes</span>\n      </label>\n      <label class=\"cust-radio\">\n        <input type=\"radio\" (change)=\"setValue('furnished', 0)\" value=\"0\" [checked]=\"model.furnished == 0 ? 'checked' : ''\" name=\"furnished\">\n        <span class=\"checkmark\">No</span>\n      </label>\n      <div class=\"clearfix\"></div>\n    </div>\n\n    <div class=\"form-group-3\">\n      <label>Description <span class=\"color-red\">*</span></label>\n      <textarea required [(ngModel)]=\"model.description\" placeholder=\"Enter description\" name=\"description\" class=\"form-control\"></textarea>\n    </div>\n\n    <div class=\"spacer15\"></div>\n    <div class=\"form-group-3\">\n      <label>How much quantity do you have? <span class=\"color-red\">*</span></label>\n      <div class=\"clearfix\"></div>\n      <!-- <label class=\"cust-radio\">\n        <input type=\"radio\" (change)=\"setValue('quantity', 1)\" [checked]=\"model.quantity == 1 ? 'checked': ''\" name=\"quantity\">\n        <span class=\"checkmark\">1</span>\n      </label>\n      <label class=\"cust-radio\">\n        <input type=\"radio\" (change)=\"setValue('quantity', 2)\" [checked]=\"model.quantity == 2 ? 'checked': ''\" name=\"quantity\">\n        <span class=\"checkmark\">2</span>\n      </label>\n      <label class=\"cust-radio\">\n        <input type=\"radio\" (change)=\"setValue('quantity', 3)\" [checked]=\"model.quantity == 3 ? 'checked': ''\" name=\"quantity\">\n        <span class=\"checkmark\">3</span>\n      </label> -->\n      <label class=\"cust-input\">\n        <input autocomplete=\"off\" type=\"number\" min=\"1\" [(ngModel)]=\"model.quantity\" (change)=\"setValue('quantity', $event.target.value)\" name=\"quantity\" placeholder=\"Enter\">\n      </label>\n      <button type=\"button\" *ngIf=\"model.quantity>1\" class=\"btn btn-link greenText\" (click)=\"propertyDetails='true'\">Add property details</button>\n      <div class=\"clearfix\"></div>\n    </div>\n\n   <div class=\"clearfix\"></div>\n\n   <div *ngIf=\"propertyDetails\" class=\"expand-collapes-section addpropertydetails\">\n      <div class=\"row\">\n         <div class=\"col-xl-3 col-lg-6 col-md-12 col-sm-6 col-12\">\n            <div class=\"form-group-3\">\n               <label>Floor number</label>\n               <input autocomplete=\"off\" [(ngModel)]=\"details.floor\" class=\"form-control\" type=\"number\" name=\"\" [ngModelOptions]=\"{standalone: true}\">\n            </div>\n         </div>\n       <div class=\"col-xl-3 col-lg-6 col-md-12 col-sm-6 col-12\">\n            <div class=\"form-group-3\">\n               <label>Area per Sqft.</label>\n               <input autocomplete=\"off\"  [(ngModel)]=\"details.area\"  class=\"form-control\" type=\"number\" name=\"\" [ngModelOptions]=\"{standalone: true}\" >\n            </div>\n         </div>\n        <div class=\"col-xl-3 col-lg-6 col-md-12 col-sm-6 col-12\">\n            <div class=\"form-group-3\">\n               <label>Price per Sqft.</label>\n               <input autocomplete=\"off\"  [(ngModel)]=\"details.price\"  class=\"form-control\" type=\"number\" name=\"\" [ngModelOptions]=\"{standalone: true}\">\n            </div>\n         </div>\n         <div class=\"col-xl-3 col-lg-6 col-md-12 col-sm-6 col-12\">\n            <div class=\"form-group-3\">\n               <label>Total price</label>\n               <input autocomplete=\"off\"  [(ngModel)]=\"details.total_price\"  class=\"form-control\" type=\"number\" name=\"\" [ngModelOptions]=\"{standalone: true}\">\n            </div>\n         </div>\n        <div class=\"col-xl-3 col-lg-6 col-md-12 col-sm-6 col-12\">\n            <div class=\"form-group-3\">\n               <label>Facing Direction</label>\n               <input autocomplete=\"off\"  [(ngModel)]=\"details.direction\"  class=\"form-control\" type=\"text\" name=\"\" [ngModelOptions]=\"{standalone: true}\">\n            </div>\n         </div>\n         <div class=\"col-xl-3 col-lg-6 col-md-12 col-sm-6 col-12\">\n            <div class=\"form-group-3\">\n               <label>Status</label>\n               <select class=\"form-control\"  [(ngModel)]=\"details.payment_status_id\" [ngModelOptions]=\"{standalone: true}\">\n                  <option *ngFor=\"let item of parameter.paymentStatuses\" [value]=\"item.id\">{{item.name}}</option>\n               </select>\n\n            </div>\n         </div>\n         <div class=\"col-xl-3 col-lg-6 col-md-12 col-sm-6 col-12\">\n            <div class=\"form-group-3\">\n               <label>Building Specific type</label>\n               <select class=\"form-control\" [(ngModel)]=\"details.building_specific_type_id\" [ngModelOptions]=\"{standalone: true}\">\n                  <option *ngFor=\"let item of parameter.buildingSpecificTypes\" [value]=\"item.id\">{{item.name}}</option>\n               </select>\n            </div>\n         </div>\n         <div class=\"col-xl-3 col-lg-6 col-md-12 col-sm-6 col-12\">\n            <div class=\"form-group-3\">\n               <label>Configuration Type</label>\n               <input autocomplete=\"off\" [(ngModel)]=\"details.conf_type\" class=\"form-control\" type=\"text\" name=\"\" [ngModelOptions]=\"{standalone: true}\">\n            </div>\n         </div>\n      </div>\n      <div class=\"btn-cont\">\n        <button (click)=\"addPropertyDetails()\" class=\"btn btn-primary whiteText\" [disabled]=\"\n        !details.floor\n        || !details.area\n        || !details.price\n        || !details.total_price\n        || !details.direction\n        || !details.payment_status_id\n        || !details.building_specific_type_id\n        || !details.conf_type\n        \">Add Details</button>\n      </div>\n   </div>\n   \n   <div class=\"spacer15\"></div>\n\n   <!-- <div *ngFor=\"let details of model.property_quantity_details;let i=index\" class=\"expand-collapes-section\">\n      <div class=\"row\">\n        <div class=\"col-md-10\">\n          <div class=\"row\">\n         <div class=\"col-xl-3 col-lg-6 col-md-12 col-sm-6 col-12\">\n            <div class=\"form-group-3\">\n               <label>Floor number</label>\n               <input autocomplete=\"off\" [(ngModel)]=\"details.floor\" class=\"form-control\" type=\"number\" name=\"\"  [ngModelOptions]=\"{standalone: true}\" disabled>\n            </div>\n         </div>\n       <div class=\"col-xl-3 col-lg-6 col-md-12 col-sm-6 col-12\">\n            <div class=\"form-group-3\">\n               <label>Area per Sqft.</label>\n               <input autocomplete=\"off\"  [(ngModel)]=\"details.area\"  class=\"form-control\" type=\"number\" name=\"\"  [ngModelOptions]=\"{standalone: true}\" disabled>\n            </div>\n         </div>\n        <div class=\"col-xl-3 col-lg-6 col-md-12 col-sm-6 col-12\">\n            <div class=\"form-group-3\">\n               <label>Price per Sqft.</label>\n               <input autocomplete=\"off\"  [(ngModel)]=\"details.price\"  class=\"form-control\" type=\"number\" name=\"\"  [ngModelOptions]=\"{standalone: true}\" disabled>\n            </div>\n         </div>\n         <div class=\"col-xl-3 col-lg-6 col-md-12 col-sm-6 col-12\">\n            <div class=\"form-group-3\">\n               <label>Total price</label>\n               <input autocomplete=\"off\"  [(ngModel)]=\"details.total_price\"  class=\"form-control\" type=\"number\" name=\"\"  [ngModelOptions]=\"{standalone: true}\" disabled>\n            </div>\n         </div>\n        <div class=\"col-xl-3 col-lg-6 col-md-12 col-sm-6 col-12\">\n            <div class=\"form-group-3\">\n               <label>Facing Direction</label>\n               <input autocomplete=\"off\"  [(ngModel)]=\"details.direction\"  class=\"form-control\" type=\"text\" name=\"\"  [ngModelOptions]=\"{standalone: true}\" disabled>\n            </div>\n         </div>\n         <div class=\"col-xl-3 col-lg-6 col-md-12 col-sm-6 col-12\">\n            <div class=\"form-group-3\">\n               <label>Status</label>\n               <select class=\"form-control\"  [(ngModel)]=\"details.payment_status_id\"  [ngModelOptions]=\"{standalone: true}\" disabled>\n                  <option *ngFor=\"let item of parameter.paymentStatuses\" [value]=\"item.id\">{{item.name}}</option>\n               </select>\n            </div>\n         </div>\n         <div class=\"col-xl-3 col-lg-6 col-md-12 col-sm-6 col-12\">\n            <div class=\"form-group-3\">\n               <label>Building Specific type</label>\n               <select class=\"form-control\" [(ngModel)]=\"details.building_specific_type_id\"  [ngModelOptions]=\"{standalone: true}\" disabled>\n                  <option *ngFor=\"let item of parameter.buildingSpecificTypes\" [value]=\"item.id\">{{item.name}}</option>\n               </select>\n            </div>\n         </div>\n         <div class=\"col-xl-3 col-lg-6 col-md-12 col-sm-6 col-12\">\n            <div class=\"form-group-3\">\n               <label>Configuration type</label>\n               <input autocomplete=\"off\" [(ngModel)]=\"details.conf_type\" class=\"form-control\" type=\"text\" name=\"\"  [ngModelOptions]=\"{standalone: true}\" disabled>\n            </div>\n         </div>\n         </div>\n         </div>\n         <div class=\"col-md-2\">\n          <a style=\"width: 45px;padding-top: 0px;\" (click)=\"removeDetails(i)\" class=\"btn delete-button\" href=\"javascript://\">\n            <img class=\"img-fluid\" src=\"assets/img/delete-button.png\" width=\"40\" >\n          </a>\n         </div>\n      </div>\n   </div> -->\n\n\n   <div class=\"tabel-section\" *ngIf=\"model?.property_quantity_details?.length > 0\">\n      <div class=\"table-responsive\">\n         <table class=\"table table-striped table-align-left\">\n            <tbody>\n              <tr>\n               <th>Floor Number</th>\n               <th>Area per Sqft.</th>\n               <th>Price per Sqft.</th>\n               <th>Facing Direction</th>\n               <th>Status</th>\n               <th>Building Specific Type</th>\n               <th>Configuration Type</th>\n               <th>Total Price</th>               \n              </tr>\n              <tr *ngFor=\"let details of model?.property_quantity_details;let i=index\" >\n               <td>{{details.floor}}</td>\n               <td>{{details.area}}</td>\n               <td>${{details.price}}</td>\n               <td>{{details.direction}}</td>\n               <td>\n                 <span *ngFor=\"let item of parameter.paymentStatuses | filterById: details.payment_status_id\">\n                 {{item.name}}\n                </span>\n                </td>\n               <td>\n                 <span *ngFor=\"let item of parameter.buildingSpecificTypes | filterById : details.building_specific_type_id\">\n                 {{item.name}}\n                 </span>\n               </td>\n               <td>{{details.conf_type}}</td>\n               <td>${{details.total_price}}</td>\n               <td>\n                 <a href=\"javascript://\" (click)=\"removeDetails(i)\" ><img src=\"assets/img/delete-green.png\" alt=\"img\"></a>\n               </td>\n             </tr>\n         </tbody></table>\n      </div>\n   </div>\n\n\n    <div class=\"spacer15\"></div>\n    <div class=\"form-group-3\">\n      <label>List of Amenities with this property (required) <span class=\"color-red\">*</span></label>\n\n      <div class=\"form-group-3 paddingleft0\">\n        <div class=\"row\">\n            <div class=\"col-12\">\n              <!-- <input type=\"text\" list=\"amenities\" (keyup.enter)=\"addAmenity(amen)\" name=\"amen\" [(ngModel)]=\"amen\">\n              <datalist id=\"amenities\">\n                <option *ngFor=\"let amenity of parameter.amenities\" value=\"{{amenity.name_en}}\">\n              </datalist> -->\n\n              <select style=\"max-width:50%\" title=\"Choose Amenity\" class=\"form-control\" name=\"amen\" [(ngModel)]=\"amen\" (click)=\"addAmenity(amen)\">\n                <option value=\"\">Select Amenity</option>\n                <option *ngFor=\"let amenity of parameter.amenities; let i=index\" [ngValue]=\"amenity\">{{amenity.name_en}}</option>\n              </select>\n              <!-- <button type=\"button\" class=\"add-btn\" (click)=\"addAmenity(amen,i)\"><img src=\"assets/img/add.png\" alt=\"img\"></button> -->\n\n              <div class=\"list-group-items\" *ngIf=\"amenityList\">\n                <ul>\n                  <li *ngFor=\"let a of amenityList; let aIndex=index;\">\n                    <a href=\"javascript://\" (click)=\"removeAmenity(a,aIndex)\" class=\"close\">&times;</a>\n                    <div class=\"fig-block\"><img class=\"width100\" src=\"{{a.icon}}\" alt=\"img\"></div>\n                    <p class=\"p13\">{{a.name_en}}</p>\n                  </li>\n                </ul>\n              </div>\n            </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"spacer15\"></div>\n    <div class=\"form-group-3\">\n      <label>List of Banks <span class=\"color-red\">*</span></label>\n      <div class=\"form-group-3 paddingleft0\">\n        <div class=\"row\">\n            <div class=\"col-12\">\n              <!-- <input type=\"text\" list=\"banks\" (keyup.enter)=\"addBank(bank)\" name=\"bank\" [(ngModel)]=\"bank\">\n              <datalist id=\"banks\">\n                <option *ngFor=\"let tBank of parameter.banks\" value=\"{{tBank.name}}\">\n              </datalist> -->\n              <select style=\"max-width:50%\" title=\"Choose Bank\" class=\"form-control\" name=\"bank\" [(ngModel)]=\"bank\" (change)=\"addBank(bank)\">\n                <option value=\"\">Select Bank</option>\n                <option *ngFor=\"let tBank of parameter.banks\" [ngValue]=\"tBank\">{{tBank.name}}</option>\n              </select>\n              <!-- <button type=\"button\" class=\"add-btn\" (click)=\"addBank(bank)\"><img src=\"assets/img/add.png\" alt=\"img\"></button> -->\n\n              <div class=\"list-group-items\" *ngIf=\"bankList\">\n                <ul>\n                  <li *ngFor=\"let b of bankList; let bIndex=index;\">\n                    <a href=\"javascript://\" (click)=\"removeBank(b,bIndex)\" class=\"close\">&times;</a>\n                    <div class=\"fig-block\">\n                      <img class=\"width100\" [src]=\"b.image\" onerror=\"this.src='assets/img/bank-building.png'\" alt=\"img\">\n                    </div>\n                    <p class=\"p13\">{{b.name}}</p>\n                    <p class=\"p13\">{{b.floating_int}} Floating</p>\n                  </li>\n                </ul>\n              </div>\n\n            </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <div class=\"btn-cont text-right\">\n          <!-- <a class=\"btn-third btn\" href=\"javascript://\" (click)=\"addProperty(addForm, 3)\">Next</a> -->\n          <button type=\"button\" class=\"btn btn-primary\" (click)=\"setTab(1)\">Previous</button>\n          <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"\n          additionalInfo.invalid\n          || !model.cover_image\n          || !model.floor_plan\n          || !model.floor\n          || !model.bedroom\n          || !model.bathroom\n          || model.quantity < 1\n          || model.amenities.length == 0\n          \">Next</button>\n        </div>\n      </div>\n    </div>\n\n  </div>\n</div>\n</form>\n\n\n<form  ngNativeValidate #preferableBuyer=\"ngForm\" (ngSubmit)=\"addProperty(preferableBuyer, 4)\">\n  <!-- tab-3 -->\n  <div class=\"white-bg\" *ngIf=\"tab==3\">\n      <div class=\"page-title\">\n        <h3>Preferable Buyers</h3>\n      </div>\n      <div class=\"padding40\">\n      <div class=\"form-group-3\">\n        <label class=\"p16-two\">Marital Status? <span class=\"color-red\">*</span></label>\n        <div class=\"clearfix\"></div>\n        <label class=\"cust-radio\" *ngFor=\"let m of testMarital; let mi=index\">\n          <input value=\"{{m.checked}}\" name=\"marital_status[{{mi}}]\" type=\"checkbox\" (click)=\"addMaritalStatus(m.checked, mi)\" [checked]=\"m.checked == true ? 'checked': ''\">\n          <span class=\"checkmark\">{{m.name}}</span>\n        </label>\n        <div class=\"clearfix\"></div>\n      </div>\n      <div class=\"spacer15\"></div>\n      <div class=\"form-group-3\">\n        <label class=\"p16-two\">Pets Allowed? <span class=\"color-red\">*</span></label>\n        <div class=\"clearfix\"></div>\n        <label class=\"cust-radio\">\n          <input type=\"radio\" (change)=\"setValue('pets', 1)\" value=\"1\" [checked]=\"model.pets == 1 ? 'checked' : ''\" name=\"pets\">\n          <span class=\"checkmark\">Allowed</span>\n        </label>\n        <label class=\"cust-radio\">\n          <input type=\"radio\" (change)=\"setValue('pets', 0)\" value=\"0\" [checked]=\"model.pets == 0 ? 'checked' : ''\" name=\"pets\">\n          <span class=\"checkmark\">Not Allowed</span>\n        </label>\n        <div class=\"clearfix\"></div>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-md-12\">\n          <div class=\"btn-cont text-right\">\n            <!-- <a class=\"btn-third btn\" href=\"javascript://\" (click)=\"addProperty(addForm, 4)\">Next</a> -->\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"setTab(2)\">Previous</button>\n            <button type=\"submit\" [disabled]=\"preferableBuyer.invalid\" class=\"btn btn-primary\">Next</button>\n          </div>\n        </div>\n      </div>\n\n    </div>\n  </div>\n</form>\n\n\n\n<form  ngNativeValidate #custom=\"ngForm\" (ngSubmit)=\"addProperty(custom, 5)\">\n  <!-- tab-4 -->\n  <div class=\"white-bg\" *ngIf=\"tab==4\">\n      <div class=\"page-title\">\n        <h3>Custom</h3>\n      </div>\n      <div class=\"padding40\">\n      <h5 class=\"marginB30\">Any information we missed, you want to add custom</h5>\n\n      <div class=\"row\">\n        <div class=\"col-md-4 col-sm-12 col-12\">\n          <div class=\"form-group-3\">\n            <label class=\"p16-two\">Enter Parameter</label>\n            <input autocomplete=\"off\" class=\"form-control\" type=\"text\" [(ngModel)]=\"newcustom_attribute.name\" name=\"name[{{c}}]\" placeholder=\"Enter parameter\">\n          </div>\n        </div>\n        <div class=\"col-md-4 col-sm-12 col-12\">\n          <div class=\"form-group-3\">\n            <label class=\"p16-two\">Enter Value</label>\n            <input autocomplete=\"off\" class=\"form-control\" type=\"text\" [(ngModel)]=\"newcustom_attribute.value\" name=\"value[{{c}}]\" placeholder=\"Enter value\">\n          </div>\n        </div>\n        <div class=\"col-md-2 btn-cont\">\n            <a href=\"javascript://\" class=\"add-more btn\" (click)=\"addCustomAttribute()\">Add More</a>\n        </div>\n      </div>\n\n      <div class=\"row\" *ngFor=\"let custom_attribute of model.custom_attributes; let c = index;\">\n        <div class=\"col-md-4 col-sm-12 col-12\">\n          <div class=\"form-group-3\">\n            <label class=\"p16-two\">Enter Parameter</label>\n            <input autocomplete=\"off\" class=\"form-control\" type=\"text\" [value]=\"custom_attribute.name\" disabled />\n          </div>\n        </div>\n        <div class=\"col-md-4 col-sm-12 col-12\">\n          <div class=\"form-group-3\">\n            <label class=\"p16-two\">Enter Value</label>\n            <input autocomplete=\"off\" class=\"form-control\" type=\"text\" [value]=\"custom_attribute.value\" disabled />\n          </div>\n        </div>\n        <div class=\"col-md-4 col-sm-12 col-12\">\n          <div class=\"btn-cont \">\n            <a href=\"javascript://\" class=\"btn delete-button marginT30\" (click)=\"model.custom_attributes.splice(c, 1)\">\n              <img src=\"assets/img/delete-button.png\" width=\"40\" style=\"width: 20px; margin-top: 10px;\"> \n            </a>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-md-12\">\n          <div class=\"btn-cont text-right\">\n            <!-- <a class=\"btn-third btn\" href=\"javascript://\" (click)=\"addProperty(addForm, 5)\">Next</a> -->\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"setTab(3)\">Previous</button>\n            <button type=\"submit\" class=\"btn btn-primary\">Next</button>\n          </div>\n        </div>\n      </div>\n\n    </div>\n  </div>\n</form>\n\n\n\n  <!-- tab-5 -->\n  <div class=\"white-bg\" *ngIf=\"tab==5\">\n    <div class=\"page-title\">\n      <h3>Tag a Building</h3>\n    </div>\n\n    <div class=\"padding20\" *ngIf=\"building.id && showSearch==false\">\n      <div class=\"row\">\n        <div class=\"col-sm-9 col-lg-9\">\n          <p class=\"p16\">Tagged Building Name</p>\n        </div>\n        <div class=\"col-sm-3 col-lg-3 btn-cont text-right\">\n          <button type=\"button\" class=\"btn btn-primary\" (click)=\"showSearchBox()\">Change</button>\n        </div>\n      </div>\n      <p><b>{{building.name}}</b></p>\n\n      <div class=\"row\">\n        <div class=\"col-md-12\">\n          <div class=\"btn-cont text-right\">\n            <button type=\"button\" (click)=\"tagBuilding()\" class=\"btn btn-primary\">Submit</button>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"padding40\" *ngIf=\"showSearch\">\n      <label class=\"p16-two\">Search your building in Our Database</label>\n      <div class=\"searh d-flex\">\n        <input class=\"border-right-0\" autocomplete=\"off\" type=\"text\" #buildingname (keyup.enter)=\"searchBuilding(buildingname.value)\" name=\"buildingName\" [(ngModel)]=\"buildingName\">\n        <button class=\"btn\" type=\"button\" (click)=\"searchBuilding(buildingname.value)\">Search</button>\n      </div>\n      <div class=\"spacer50\"></div>\n      <div *ngIf=\"buildingLoading\">\n        <img src=\"assets/img/loading_content.gif\" />\n      </div>\n      <div *ngIf=\"!buildingLoading && parameter.buildingCount != 0\" class=\"white-bg\">\n      <form  ngNativeValidate #tagABuilding=\"ngForm\" (ngSubmit)=\"tagBuilding()\">\n        <div class=\"tabel-section\">\n          <div class=\"table-responsive\">\n\n          <table class=\"table table-striped\">\n              <tr>\n                <th>Name</th>\n                <th>Choose Building</th>\n              </tr>\n\n              <tr *ngFor=\"let item of parameter.buildings; let i = index\">\n                <td class=\"text-left\">{{item.name}}</td>\n                <td>\n                  <input type=\"radio\" required name=\"building_id\" (change)=\"setBuildingId(item.id)\">\n                </td>\n              </tr>\n            </table>\n          </div>\n        </div>\n\n        <div class=\"row\">\n          <div class=\"col-md-12\">\n            <div class=\"btn-cont text-right\">\n              <!-- <a class=\"btn-third btn\" href=\"javascript://\" (click)=\"tagBuilding()\">Next</a> -->\n              <!-- <button type=\"button\" class=\"btn btn-primary\" (click)=\"setTab(4)\">Previous</button> -->\n              <button type=\"submit\" [disabled]=\"tagABuilding.invalid\" class=\"btn btn-primary\">Submit</button>\n            </div>\n          </div>\n        </div>\n        </form>\n    </div>\n\n    <p *ngIf=\"parameter.buildingCount == 0 && showText\" class=\"p18\">Didn’t Found your Building? <strong><span (click)=\"showBuildingDetails(true)\" class=\"green-color cursor-pointer\">Generate a Request to add a building by our Data collectors</span></strong></p>\n    <div *ngIf=\"showBuilding\" class=\"spacer50\"></div>\n\n      <form  ngNativeValidate #buildingRequestForm=\"ngForm\" (ngSubmit)=\"buildingRequest()\">\n        <div *ngIf=\"showBuilding\" class=\"row\">\n          <div class=\"col-lg-7 col-md-12 col-sm-12 col-12\">\n            <div class=\"row\">\n              <div class=\"col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                  <label>Name of Building</label>\n                  <input autocomplete=\"off\" required class=\"form-control\" type=\"text\" name=\"name\" [(ngModel)]=\"building.name\" placeholder=\"Enter name of building\">\n                </div>\n              </div>\n              <div class=\"col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                  <label>Where it is located?</label>\n                  <!-- <input class=\"form-control\" type=\"text\" name=\"address\" [(ngModel)]=\"building.address\" placeholder=\"Enter address\"> -->\n                  <input required placeholder=\"search for location\" autocorrect=\"off\" autocapitalize=\"off\"\n                    spellcheck=\"off\" type=\"text\" class=\"form-control\" #search (input)=\"loadPlaces()\"\n                    [formControl]=\"searchControl\" [(ngModel)]=\"building.address\" name=\"address\">\n                </div>\n              </div>\n            </div>\n            <label class=\"label-optional\">Developer Details (optional)</label>\n            <div class=\"row\">\n              <div class=\"col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                  <label>Name of Developer</label>\n                  <input autocomplete=\"off\" class=\"form-control\" type=\"text\" name=\"dev_name\" [(ngModel)]=\"building.dev_name\">\n                </div>\n              </div>\n              <div class=\"col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                  <label>Contact Number</label>\n                  <input minlength=\"6\" maxlength=\"16\" autocomplete=\"off\" type=\"text\" class=\"form-control\" id=\"dev_phone\" [(ngModel)]=\"building.dev_phone\" name=\"dev_phone\"\n                      ng2TelInput [ng2TelInputOptions]=\"initialCountry\" (countryChange)=\"onCountryChange($event)\" />\n                </div>\n              </div>\n            </div>\n            <div class=\"row\">\n              <div class=\"col-sm-12 col-12\">\n                <div class=\"form-group-3\">\n                  <label>Email Address</label>\n                  <input autocomplete=\"off\" class=\"form-control\" type=\"text\" name=\"dev_email\" [(ngModel)]=\"building.dev_email\">\n                </div>\n              </div>\n            </div>\n          </div>\n          <div class=\"col-lg-5 col-md-12 col-sm-12 col-12\">\n            <div class=\"form-group-3 mark-pin-map\">\n              <label>Mark Pin on Map</label>\n            </div>\n            <div>\n              <!-- <div id=\"mapDiv\" style=\"height: 250px; width: 100%;\" #mapDiv></div> -->\n              <agm-map [latitude]=\"latitude\" [longitude]=\"longitude\" [scrollwheel]=\"false\" (mapClick)=\"placeMarker($event)\"[zoom]=\"zoom\">\n                <agm-marker [latitude]=\"latitude\" [longitude]=\"longitude\"></agm-marker>\n              </agm-map>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"row\" *ngIf=\"showBuilding\">\n          <div class=\"col-md-12\">\n            <div class=\"btn-cont text-right\">\n              <!-- <a class=\"btn-third btn\" href=\"javascript://\" (click)=\"buildingRequest()\">Next</a> -->\n              <!-- <button type=\"button\" class=\"btn btn-primary\" (click)=\"setTab(5)\">Previous</button> -->\n              <button type=\"submit\" [disabled]=\"buildingRequestForm.invalid\" class=\"btn btn-primary\">Submit</button>\n            </div>\n          </div>\n        </div>\n\n      </form>\n      <div class=\"btn-cont text-right\">\n          <button type=\"button\" class=\"btn btn-primary\" (click)=\"setTab(4)\" style=\"margin: 20px 0px;\">Previous</button>\n        </div>\n    </div>\n\n  </div>\n\n\n<!-- Add More img -->\n<span data-target=\"#add-more-img\" data-toggle=\"modal\" #modalOpen></span>\n<div class=\"modal add-more-popup\" id=\"add-more-img\">\n  <div class=\"modal-dialog modal-lg\">\n    <div class=\"modal-content\">\n\n      <!-- Modal Header -->\n      <div class=\"modal-header\">\n        <h4 class=\"modal-title\">Images</h4>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #modalClose>&times;</button>\n      </div>\n\n      <!-- Modal body -->\n      <div class=\"modal-body\">\n        <div class=\"uploaded-img-block\">\n          <div class=\"uploaded-img\" *ngFor=\"let item of file2.files; let i=index\">\n            <a class=\"remove\" (click)=\"file2.remove(i)\"><img src=\"assets/img/remove-icon.png\" alt=\"img\"></a>\n            <img *ngIf=\"item\" class=\"u-img\" [src]=\"item.image\" alt=\"img\">\n            <img *ngIf=\"!item\" class=\"u-img\" src=\"http://via.placeholder.com/300x300\" alt=\"img\">\n          </div>\n        </div>\n\n        <div class=\"add-more-images\">\n          <input type=\"file\" name=\"add-more\" multiple max=\"6\" accept=\"image/*\" (change)=\"file2Select($event)\">\n          <span>+ Add more images</span>\n        </div>\n      </div>\n\n      <!-- Modal footer -->\n      <div class=\"modal-footer btn-cont\">\n        <button type=\"button\" (click)=\"saveImages()\" class=\"btn btn-primary\">Submit</button>\n      </div>\n\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/layout/properties/add-property/add-property.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/layout/properties/add-property/add-property.component.ts ***!
  \**************************************************************************/
/*! exports provided: AddPropertyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddPropertyComponent", function() { return AddPropertyComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_admin_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var _services_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var _common_fileUpload__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../../../common/fileUpload */ "./src/app/common/fileUpload.ts");
/* harmony import */ var _models_addProperty_model__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../models/addProperty.model */ "./src/app/models/addProperty.model.ts");
/* harmony import */ var _services_http_interceptor__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../services/http-interceptor */ "./src/app/services/http-interceptor.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var AddPropertyComponent = /** @class */ (function () {
    function AddPropertyComponent(model, us, cs, router, sanitization, mapsAPILoader, ngZone, building, constant, route, http) {
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
        this.parameter = {};
        this.url2 = [];
        this.showBuilding = false;
        this.amenityList = [];
        this.amen = '';
        this.bankList = [];
        this.bank = '';
        this.testMarital = [
            { id: 1,
                name: 'Married',
                checked: false },
            { id: 2,
                name: 'Unmarried',
                checked: false },
            { id: 3,
                name: 'Divorced',
                checked: false }
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
    }
    AddPropertyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.parameter.amenities = [];
        this.parameter.banks = [];
        this.http.loader.next({ value: true });
        this.details = new _models_addProperty_model__WEBPACK_IMPORTED_MODULE_9__["PropertyDetails"];
        this.file2 = new _common_fileUpload__WEBPACK_IMPORTED_MODULE_8__["FileUpload"](false, this.us);
        this.parameter.sub = this.route.params.subscribe(function (params) {
            if (params['seller_id'] !== '0') {
                _this.parameter.seller_id = params['seller_id'];
            }
            if (params['edit'] === 'edit') {
                _this.editMode = true;
            }
            _this.parameter.property_id = params['property_id'];
            if (_this.parameter.property_id === '0') {
                _this.parameter.property_id = '';
                _this.testMarital[0].checked = true;
                _this.model.marital_status = [1];
                _this.showSearch = true;
            }
            else {
                _this.getPropertyById(_this.parameter.property_id);
            }
            console.log(params);
        });
        this.parameter.buildingCount = 0;
        this.initialCountry = { initialCountry: this.constant.initialCountry };
        this.building.dev_countrycode = this.constant.dial_code;
        this.tab = 1;
        this.getCountries('');
        this.getConfigurations();
        this.getPropertyTypes();
        this.getAmenities();
        this.getBanks();
        this.getBuildingSpecificTypes();
        this.getPaymentStatuses();
        // set google maps defaults
        this.zoom = 4;
        // create search FormControl
        this.searchControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"]();
        // set current position
        this.setCurrentPosition();
        // console.log('propertyid', this.parameter.property_id);
    };
    AddPropertyComponent.prototype.getPropertyById = function (property_id) {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'getPropertyById';
        var input = new FormData();
        input.append('property_id', property_id);
        this.parameter.loading = true;
        this.us.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.parameter.loading = false;
            console.log(success);
            _this.parameter.loading = false;
            _this.parameter.propertyDetails = success['data'];
            _this.setModelData(success['data']);
            if (_this.parameter.propertyDetails.step < 5) {
                _this.tab = _this.parameter.propertyDetails.step;
            }
            _this.url2 = _this.parameter.propertyDetails.images.map(function (op) { return op.image; });
            if (_this.url2.length > 0) {
                _this.image2 = _this.url2[0];
            }
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    AddPropertyComponent.prototype.setModelData = function (data) {
        console.log(data);
        this.model.id = data.id;
        this.model.for_rent = data.for_rent === 1 ? true : false;
        this.model.for_sale = data.for_sale === 1 ? true : false;
        this.getStates(data.locality.city.state.country.id, '');
        this.getCities(data.locality.city.state.id, '');
        this.getLocalities(data.locality.city.id, '');
        this.model.locality_id = data.locality.id;
        this.model.city_id = data.locality.city.id;
        this.model.state_id = data.locality.city.state.id;
        this.model.country_id = data.locality.city.state.country.id;
        this.model.configuration_id = data.configuration.id;
        this.model.property_type_id = data.property_type.id;
        this.model.floor_plan = data.floor_plan;
        this.model.cover_image = data.image;
        this.model.description = data.description;
        this.model.quantity = data.quantity;
        this.model.floor = data.floor;
        this.model.bedroom = data.bedroom;
        this.model.bathroom = data.bathroom;
        this.model.parking = data.parking;
        this.model.furnished = data.furnished;
        this.model.property_quantity_details = data.details;
        this.model.images = data.images;
        this.building.id = data.building ? data.building.id : '';
        this.building.name = data.building ? data.building.name : '';
        if (this.building.id === '') {
            this.showSearch = true;
        }
        for (var index = 0; index < data.amenities.length; index++) {
            console.log(data.amenities[index]);
            this.addAmenity(data.amenities[index]);
        }
        for (var index = 0; index < data.banks.length; index++) {
            console.log(data.banks[index]);
            this.addBank(data.banks[index]);
        }
        for (var index = 0; index < this.testMarital.length; index++) {
            // console.log('data.marital_status', this.testMarital, data.marital_statuses);
            if (data.marital_statuses.length !== 0) {
                for (var i = 0; i < data.marital_statuses.length; i++) {
                    if (this.testMarital[index].name === data.marital_statuses[i].name_en) {
                        // console.log('check', this.testMarital, data.marital_statuses);
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
        }
        for (var index = 0; index < data.custom_values.length; index++) {
            var element = data.custom_values[index];
            this.model.custom_attributes[index] = { name: element.name, value: element.value };
        }
        console.log(this.showSearch, this.building.id);
    };
    AddPropertyComponent.prototype.setTab = function (tab) {
        var _this = this;
        swal({
            title: 'Are you sure?',
            text: 'Moving back can reset information entered on current tab.',
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
    AddPropertyComponent.prototype.showSearchBox = function () {
        this.showSearch = true;
    };
    AddPropertyComponent.prototype.onCountryChange = function (e) {
        this.building.dev_countrycode = e.dialCode;
        this.initialCountry = { initialCountry: e.iso2 };
    };
    AddPropertyComponent.prototype.getCountries = function (keyword) {
        var _this = this;
        this.parameter.url = 'getCountries';
        this.us.postDataApi(this.parameter.url, {})
            .subscribe(function (success) { _this.parameter.countries = success['data']; });
    };
    AddPropertyComponent.prototype.getStates = function (country_id, keyword) {
        var _this = this;
        // this.parameter.loading = true;
        this.parameter.url = 'country/getStates';
        this.model.country_id = country_id;
        this.model.state_id = '';
        this.model.city_id = '';
        this.model.locality_id = '';
        this.parameter.cities = [];
        this.parameter.localities = [];
        var input = new FormData();
        input.append('country_id', country_id);
        this.us.postDataApi(this.parameter.url, input).subscribe(function (success) {
            _this.parameter.states = success['data'];
            // this.parameter.loading = false;
        }, function (error) {
            // this.parameter.loading = false;
        });
    };
    AddPropertyComponent.prototype.getCities = function (state_id, keyword) {
        var _this = this;
        // this.parameter.loading = true;
        this.parameter.url = 'getCities';
        this.model.state_id = state_id;
        this.model.city_id = '';
        this.model.locality_id = '';
        this.parameter.localities = [];
        var input = new FormData();
        input.append('state_id', state_id);
        this.us.postDataApi(this.parameter.url, input).subscribe(function (success) {
            _this.parameter.cities = success['data'];
            // this.parameter.loading = false;
        }, function (error) {
            // this.parameter.loading = false;
        });
    };
    AddPropertyComponent.prototype.getLocalities = function (city_id, keyword) {
        var _this = this;
        if (keyword === void 0) { keyword = ''; }
        this.parameter.url = 'getLocalities';
        this.model.city_id = city_id;
        this.model.locality_id = '';
        var input = new FormData();
        input.append('city_id', city_id);
        if (keyword) {
            input.append('keyword', keyword);
        }
        this.us.postDataApi(this.parameter.url, input)
            .subscribe(function (success) { _this.parameter.localities = success['data']; });
    };
    AddPropertyComponent.prototype.setAmenity = function (id) {
        this.model.amenities = [id];
    };
    AddPropertyComponent.prototype.setValue = function (key, value) {
        this.model[key] = value;
    };
    AddPropertyComponent.prototype.getConfigurations = function () {
        var _this = this;
        this.parameter.url = 'getConfigurations';
        var input = new FormData();
        this.us.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.parameter.items = success['data'];
            if (_this.parameter.items.length !== 0 && _this.parameter.property_id === '') {
                _this.model.configuration_id = _this.parameter.items[0].id;
            }
        });
    };
    AddPropertyComponent.prototype.getPropertyTypes = function () {
        var _this = this;
        this.parameter.url = 'getPropertyTypes';
        var input = new FormData();
        this.us.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.parameter.propertyTypes = success['data'];
            if (_this.parameter.propertyTypes.length !== 0 && _this.parameter.property_id === '') {
                _this.model.property_type_id = _this.parameter.propertyTypes[0].id;
            }
        });
    };
    AddPropertyComponent.prototype.getAmenities = function () {
        var _this = this;
        this.parameter.url = 'getPropertyAmenities';
        var input = new FormData();
        this.us.postDataApi(this.parameter.url, input)
            .subscribe(function (success) { _this.parameter.amenities = success['data']; });
    };
    AddPropertyComponent.prototype.addAmenity = function (amen) {
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
    AddPropertyComponent.prototype.getSelectedAmenityByName = function (selectedName) {
        var r = this.amenityList.find(function (amenity) { return amenity.name_en === selectedName; });
        if (r) {
            return '';
        }
        else {
            return this.parameter.amenities.find(function (amenity) { return amenity.name_en === selectedName; });
        }
    };
    AddPropertyComponent.prototype.removeAmenity = function (amenity, index) {
        this.parameter.amenities.push(amenity);
        this.model.amenities.splice(index, 1);
        this.amenityList.splice(index, 1);
    };
    AddPropertyComponent.prototype.getBanks = function () {
        var _this = this;
        this.parameter.url = 'getBanks';
        var input = new FormData();
        this.us.postDataApi(this.parameter.url, input)
            .subscribe(function (success) { _this.parameter.banks = success['data']; });
    };
    AddPropertyComponent.prototype.getBuildingSpecificTypes = function () {
        var _this = this;
        this.parameter.url = 'getBuildingSpecificTypes';
        var input = new FormData();
        this.us.postDataApi(this.parameter.url, input)
            .subscribe(function (success) { _this.parameter.buildingSpecificTypes = success['data']; });
    };
    AddPropertyComponent.prototype.getPaymentStatuses = function () {
        var _this = this;
        this.parameter.url = 'getPaymentStatuses';
        var input = new FormData();
        this.us.postDataApi(this.parameter.url, input)
            .subscribe(function (success) { _this.parameter.paymentStatuses = success['data']; });
    };
    AddPropertyComponent.prototype.addBank = function (bank) {
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
    AddPropertyComponent.prototype.removeBank = function (bank, index) {
        this.parameter.banks.push(bank);
        this.model.banks.splice(index, 1);
        this.bankList.splice(index, 1);
    };
    AddPropertyComponent.prototype.addCarpetArea = function () {
        if (!this.newcarpet_area.area || !this.newcarpet_area.price) {
            swal('Error', 'Please fill carpet area fields', 'error');
        }
        else {
            this.model.carpet_areas.push(JSON.parse(JSON.stringify(this.newcarpet_area)));
            this.newcarpet_area = { area: '', price: '' };
        }
    };
    AddPropertyComponent.prototype.addCustomAttribute = function () {
        if (!this.newcustom_attribute.name || !this.newcustom_attribute.value) {
            swal('Error', 'Please fill custom attribute fields', 'error');
        }
        else {
            this.model.custom_attributes.push(this.newcustom_attribute);
            this.newcustom_attribute = { name: '', value: '' };
        }
    };
    AddPropertyComponent.prototype.getSelectedBankByName = function (selectedName) {
        var r = this.bankList.find(function (bank) { return bank.name === selectedName; });
        if (r) {
            return '';
        }
        else {
            return this.parameter.banks.find(function (bank) { return bank.name === selectedName; });
        }
    };
    AddPropertyComponent.prototype.searchBuilding = function (keyword) {
        var _this = this;
        if (!keyword) {
            swal('Error', 'Please enter some text.', 'error');
            return false;
        }
        this.showBuilding = false;
        this.buildingLoading = true;
        this.parameter.url = 'searchBuilding';
        var input = new FormData();
        input.append('keyword', keyword);
        this.us.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.parameter.buildings = success['data'];
            _this.parameter.buildingCount = success['data'].length;
            if (_this.parameter.buildingCount === 0) {
                _this.showText = true;
            }
            _this.buildingLoading = false;
        }, function (error) {
            _this.buildingLoading = true;
        });
    };
    AddPropertyComponent.prototype.showBuildingDetails = function (showBuilding) {
        this.showBuilding = showBuilding;
        this.buildingName = '';
        this.loadPlaces();
    };
    AddPropertyComponent.prototype.onSelectFile2 = function (event) {
        var _this = this;
        if (event.target.files && event.target.files[0]) {
            if ((this.url2.length + event.target.files.length) > 6 || event.target.files.length > 6) {
                swal('Limit exceeded', 'You can upload maximum of 6 images', 'error');
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
    AddPropertyComponent.prototype.onSelectFile = function (param, event) {
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
                // console.log(this.model);
            });
        }
    };
    AddPropertyComponent.prototype.modelOpenFun = function () {
        this.modalOpen.nativeElement.click();
        this.file2.backup(JSON.parse(JSON.stringify(this.model.images)));
    };
    AddPropertyComponent.prototype.modelCloseFun = function () {
        this.modalClose.nativeElement.click();
    };
    AddPropertyComponent.prototype.saveImages = function () {
        var _this = this;
        this.http.loader.next({ value: true });
        console.log('sss');
        if (this.file2.files.length < 1) {
            swal('Error', 'Please select atleast one image', 'error');
            return false;
        }
        this.modalClose.nativeElement.click();
        this.file2.upload().then(function (r) {
            console.log('resolved');
            _this.model.images = _this.file2.files;
            _this.http.loader.next({ value: false });
        });
    };
    AddPropertyComponent.prototype.file2Select = function ($event) {
        if ((this.file2.files.length + $event.target.files.length) > 6) {
            swal('Limit exceeded', 'You can upload maximum of 6 images', 'error');
            return false;
        }
        this.file2.onSelectFile($event);
    };
    AddPropertyComponent.prototype.onSelectFile3 = function (event) {
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
                .subscribe(function (success) { _this.model.floor_plan = success['data'].image; });
            reader.readAsDataURL(event.target.files[0]);
        }
    };
    AddPropertyComponent.prototype.addMaritalStatus = function (checked, i) {
        this.testMarital[i].checked = this.testMarital[i].checked === true ? false : true;
    };
    AddPropertyComponent.prototype.addProperty = function (formdata, tab) {
        var _this = this;
        this.model.marital_status = [];
        for (var index = 0; index < this.testMarital.length; index++) {
            if (this.testMarital[index].checked === true) {
                this.model.marital_status.push(this.testMarital[index].id);
            }
        }
        this.parameter.url = this.model.id !== '' ? 'addProperty' : 'addProperty';
        this.model.step = tab - 1;
        if (this.model.carpet_areas.length < 1 && this.tab == 1) {
            swal('Error', 'Please add carpet area.', 'error');
        }
        else if ((this.model.cover_image === null || this.model.cover_image === undefined) && (this.model.step == 2)) {
            swal('Error', 'Please choose cover image.', 'error');
        }
        else if ((this.model.floor_plan === null || this.model.floor_plan === undefined) && (this.model.step == 2)) {
            swal('Error', 'Please choose floor plan.', 'error');
        }
        else if ((this.model.amenities.length === 0) && (this.model.step == 2)) {
            swal('Error', 'Please choose amenity.', 'error');
        }
        else if ((this.model.marital_status.length === 0) && (this.model.step == 3)) {
            swal('Error', 'Please choose marital status.', 'error');
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
                input.append('for_sale', this.model.for_sale === true ? '1' : '0');
                input.append('for_rent', this.model.for_sale === true ? '0' : '1');
                input.append('country_id', this.model.country_id);
                input.append('state_id', this.model.state_id);
                input.append('city_id', this.model.city_id);
                input.append('locality_id', this.model.locality_id);
                input.append('configuration_id', this.model.configuration_id);
                input.append('carpet_areas', JSON.stringify(this.model.carpet_areas));
                input.append('property_type_id', this.model.property_type_id);
            }
            if (this.model.step === 2) {
                var imagesString = this.model.images.map(function (r) { return r.image; });
                input.append('images', JSON.stringify(imagesString));
                input.append('cover_image', this.model.cover_image);
                input.append('floor_plan', this.model.floor_plan);
                input.append('bedroom', this.model.bedroom.toString());
                input.append('bathroom', this.model.bathroom.toString());
                input.append('floor', this.model.floor.toString());
                input.append('parking', this.model.parking.toString());
                input.append('furnished', this.model.furnished.toString());
                input.append('description', this.model.description);
                input.append('quantity', this.model.quantity.toString());
                input.append('amenities', JSON.stringify(this.model.amenities));
                input.append('banks', JSON.stringify(this.model.banks));
                input.append('property_quantity_details', JSON.stringify(this.model.property_quantity_details));
            }
            if (this.model.step === 3) {
                input.append('pets', this.model.pets.toString());
                input.append('marital_status', JSON.stringify(this.model.marital_status));
            }
            if (this.model.step === 4) {
                input.append('custom_attributes', JSON.stringify(this.model.custom_attributes));
            }
            console.log('INPUT=>', input);
            this.parameter.loading = true;
            this.us.postDataApi(this.parameter.url, input)
                .subscribe(function (success) {
                _this.parameter.loading = false;
                console.log(success);
                _this.parameter.property_id = success['data'].id;
                _this.tab = tab;
            }, function (error) {
                _this.parameter.loading = false;
            });
        }
    };
    AddPropertyComponent.prototype.setBuildingId = function (building_id) {
        this.building.id = building_id;
    };
    AddPropertyComponent.prototype.tagBuilding = function () {
        var _this = this;
        this.parameter.url = 'tagBuilding';
        var input = new FormData();
        if (this.parameter.property_id) {
            input.append('property_id', this.parameter.property_id);
        }
        input.append('building_id', this.building.id);
        this.parameter.loading = true;
        this.us.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            _this.parameter.loading = false;
            swal('Submitted successfully.', 'You will be notified once your property will be reviewed by them, you can view status in your properties.', 'success');
            if (_this.router.url.indexOf('/dashboard/properties/edit-property') === -1) {
                _this.router.navigate(['/dashboard/properties/view-properties']);
            }
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    AddPropertyComponent.prototype.loadPlaces = function () {
        var _this = this;
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
    AddPropertyComponent.prototype.setCurrentPosition = function () {
        var _this = this;
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                _this.latitude = position.coords.latitude;
                _this.longitude = position.coords.longitude;
                _this.zoom = 12;
            });
        }
    };
    AddPropertyComponent.prototype.placeMarker = function ($event) {
        this.latitude = $event.coords.lat;
        this.longitude = $event.coords.lng;
        this.getGeoLocation(this.latitude, this.longitude);
    };
    AddPropertyComponent.prototype.getGeoLocation = function (lat, lng) {
        var _this = this;
        if (navigator.geolocation) {
            this.parameter.loading = true;
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
                _this.parameter.loading = false;
            });
        }
    };
    AddPropertyComponent.prototype.buildingRequest = function () {
        var _this = this;
        if (this.building.dev_name && (!this.building.dev_phone || !this.building.dev_email || !this.building.dev_countrycode)) {
            swal('Error', 'Please fill complete devloper information', 'error');
            return false;
        }
        this.parameter.url = 'buildingRequest';
        this.building.lat = this.latitude;
        this.building.lng = this.longitude;
        if (!this.building.lat || !this.building.lng) {
            swal('Error', 'Please select location', 'error');
            return false;
        }
        console.log(this.building);
        this.parameter.loading = true;
        this.us.postDataApi(this.parameter.url, this.building)
            .subscribe(function (success) {
            _this.parameter.loading = false;
            swal('Submitted successfully.', 'You will be notified once your property will be reviewed by them, you can view status in your properties.', 'success');
            if (_this.router.url.indexOf('/dashboard/properties/edit-property') === -1) {
                _this.router.navigate(['/dashboard/properties/view-properties']);
            }
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    AddPropertyComponent.prototype.addPropertyDetails = function () {
        this.model.property_quantity_details.push(JSON.parse(JSON.stringify(this.details)));
        this.details = new _models_addProperty_model__WEBPACK_IMPORTED_MODULE_9__["PropertyDetails"];
    };
    AddPropertyComponent.prototype.checkEmptyDetails = function () {
        for (var _i = 0, _a = this.details; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item == '') {
                return false;
            }
        }
        return true;
    };
    AddPropertyComponent.prototype.removeDetails = function (i) {
        this.model.property_quantity_details.splice(i, 1);
    };
    AddPropertyComponent.prototype.clickOnSale = function () {
        console.log(this.model.for_sale);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddPropertyComponent.prototype, "modalClose", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalOpen'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddPropertyComponent.prototype, "modalOpen", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('mapDiv'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddPropertyComponent.prototype, "mapDiv", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('search'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddPropertyComponent.prototype, "searchElementRef", void 0);
    AddPropertyComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-add-property',
            template: __webpack_require__(/*! ./add-property.component.html */ "./src/app/layout/properties/add-property/add-property.component.html"),
            styles: [__webpack_require__(/*! ./add-property.component.css */ "./src/app/layout/properties/add-property/add-property.component.css")],
            providers: [_models_addProperty_model__WEBPACK_IMPORTED_MODULE_9__["AddPropertyModel"], _models_addProperty_model__WEBPACK_IMPORTED_MODULE_9__["Building"], _common_constants__WEBPACK_IMPORTED_MODULE_7__["Constant"], _services_http_interceptor__WEBPACK_IMPORTED_MODULE_10__["HttpInterceptor"]]
        }),
        __metadata("design:paramtypes", [_models_addProperty_model__WEBPACK_IMPORTED_MODULE_9__["AddPropertyModel"], _services_admin_service__WEBPACK_IMPORTED_MODULE_1__["AdminService"], _services_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__["DomSanitizer"], _agm_core__WEBPACK_IMPORTED_MODULE_6__["MapsAPILoader"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"], _models_addProperty_model__WEBPACK_IMPORTED_MODULE_9__["Building"], _common_constants__WEBPACK_IMPORTED_MODULE_7__["Constant"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            _services_http_interceptor__WEBPACK_IMPORTED_MODULE_10__["HttpInterceptor"]])
    ], AddPropertyComponent);
    return AddPropertyComponent;
}());



/***/ }),

/***/ "./src/app/layout/properties/properties.component.css":
/*!************************************************************!*\
  !*** ./src/app/layout/properties/properties.component.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/layout/properties/properties.component.html":
/*!*************************************************************!*\
  !*** ./src/app/layout/properties/properties.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<div class=\"container-fluid\">\n      <div class=\"row\">\n         <div class=\"col-md-4\">\n               <div class=\"form-group\">\n                  <p class=\"p16\">Manage Properties</p>\n               </div>\n         </div>\n      </div>\n      <div class=\"row\">\n         <div class=\"offset-md-4\"></div>\n         <div class=\"col-md-8 col-12\">\n               <div class=\"cust-tabs-2\">\n                  <ul class=\"nav nav-tabs float-right\">\n                     <li class=\"nav-item\">\n                        <a [ngClass]=\"{'active':parameter.dash_flag == 1}\" (click)=\"changeFlag(1)\" class=\"nav-link\" data-toggle=\"tab\" href=\"#tw\">This Week</a>\n                     </li>\n                     <li class=\"nav-item\">\n                        <a [ngClass]=\"{'active':parameter.dash_flag == 2}\" (click)=\"changeFlag(2)\" class=\"nav-link\" data-toggle=\"tab\" href=\"#tm\">This Month</a>\n                     </li>\n                     <li class=\"nav-item\">\n                        <a [ngClass]=\"{'active':parameter.dash_flag == 3}\" (click)=\"changeFlag(3)\" class=\"nav-link\" data-toggle=\"tab\" href=\"#lm\">Last Month</a>\n                     </li>\n                     <li class=\"nav-item\">\n                        <a [ngClass]=\"{'active':parameter.dash_flag == 4}\" (click)=\"changeFlag(4)\" class=\"nav-link\" data-toggle=\"tab\" href=\"#lt\">Lifetime</a>\n                     </li>\n                     <li class=\"nav-item\">\n                        <a [ngClass]=\"{'active':parameter.dash_flag == 5}\" (click)=\"changeFlag(5)\" class=\"nav-link\" data-toggle=\"tab\" href=\"#cust\">Custom</a>\n                     </li>\n                  </ul>\n               </div>\n         </div>\n      </div>\n   \n      <div class=\"row\">\n      <div class=\"col-12\">\n            <div *ngIf=\"parameter.dash_flag == 5\" class=\"row\">\n               <div class=\"offset-lg-7\"></div>\n               <div class=\"col-lg-2 col-md-2 col-sm-5 col-5\">\n               <div class=\"form-group marginB0\">\n                  <label>From:</label>\n                  <p-calendar showIcon=\"true\" [(ngModel)]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n               </div>\n               </div>\n               <div class=\"col-lg-2 col-md-2 col-sm-5 col-5\">\n               <div class=\"form-group marginB0\">\n                  <label>To:</label>\n                  <p-calendar showIcon=\"true\" [(ngModel)]=\"parameter.max\" [minDate]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n               </div>\n               </div>\n               <div class=\"col-lg-1 col-md-2 col-sm-2 col-6\">\n               <div class=\"form-group btn-cont\">\n                  <label class=\"addMT3\">&nbsp;</label>\n                  <button class=\"btn btn-calender\" href=\"javascript://\" (click)=\"getListing()\"\n                        [disabled]=\"!parameter.min || !parameter.max\">Apply</button>\n               </div>\n               </div>\n            </div>\n      </div>\n   </div>\n\n   <div class=\"row\">\n      <div class=\"col-lg-2 col-md-2\">\n            <div class=\"form-group\">\n            <label>Country</label>\n            <select class=\"form-control\" (change)=\"onCountryChange($event.target.value)\">\n               <option value=\"0\">All</option>\n               <option *ngFor=\"let item of location.countries\" [value]=\"item.id\">{{item.name}}</option>\n            </select>\n            </div>\n      </div>\n      <div class=\"col-lg-2 col-md-2\">\n            <div class=\"form-group\">\n            <label>State</label>\n            <select class=\"form-control\" (change)=\"onStateChange($event.target.value)\">\n               <option value=\"0\">All</option>\n               <option *ngFor=\"let item of location.states\" [value]=\"item.id\">{{item.name}}</option>\n            </select>\n            </div>\n      </div>\n      <div class=\"col-lg-2 col-md-2\">\n            <div class=\"form-group\">\n            <label>City</label>\n               <select class=\"form-control\" (change)=\"onCityChange($event.target.value)\">\n               <option value=\"0\">All</option>\n               <option *ngFor=\"let item of location.cities\" [value]=\"item.id\">{{item.name}}</option>\n               </select>\n            </div>\n      </div>\n\n      <div class=\"col-lg-2 col-md-2\">\n            <div class=\"form-group\">\n            <label>Locality</label>\n            <select class=\"form-control\" (change)=\"getLocalityBuildings($event.target.value)\">\n               <option value=\"0\">All</option>\n               <option *ngFor=\"let item of location.localities\" [value]=\"item.id\">{{item.name}}</option>\n            </select>\n            </div>\n      </div>\n\n      <div class=\"col-lg-2 col-md-2\">\n         <div class=\"form-group marginB0\">\n               <label>Building</label>\n               <select class=\"form-control\" (change)=\"setBuilding($event.target.value)\">\n               <option value=\"0\">All</option>\n               <option *ngFor=\"let building of parameter.buildings\" value=\"{{building.id}}\">{{building.name}}</option>\n               </select>\n         </div>\n      </div>\n      \n      <div class=\"col-lg-1 col-md-2\">\n            <div class=\"form-group btn-cont\">\n            <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n            <button type=\"button\" (click)=\"getListing()\" class=\"btn btn-primary-new width100P P86\">Apply</button>\n            </div>\n      </div>\n\n      <div class=\"col-lg-1 col-md-2\">\n            <div class=\"form-group btn-cont\">\n            <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n            <button type=\"button\" (click)=\"resetFilters()\" class=\"btn btn-primary-new width100P P86\">Reset</button>\n            </div>\n      </div>\n   </div>\n   <!-- <div class=\"row\">\n      <div class=\"col-md-4\">\n      <div class=\"form-group\">\n         <p class=\"p16\">Manage Properties</p>\n         </div>\n      </div>\n      <div class=\"col-md-2\">\n   <div class=\"form-group\">\n   <label>Country</label>\n      <select class=\"form-control\" (change)=\"onCountryChange($event.target.value)\">\n         <option value=\"0\">All</option>\n         <option *ngFor=\"let item of location.countries\" [value]=\"item.id\">{{item.name}}</option>\n      </select>\n   </div>\n   </div>\n   <div class=\"col-md-2\">\n   <div class=\"form-group\">\n   <label>State</label>\n      <select class=\"form-control\" (change)=\"onStateChange($event.target.value)\">\n         <option value=\"0\">All</option>\n         <option *ngFor=\"let item of location.states\" [value]=\"item.id\">{{item.name}}</option>\n      </select>\n   </div>\n   </div>\n   <div class=\"col-md-2\">\n      <div class=\"form-group\">\n      <label>City</label>\n         <select class=\"form-control\" (change)=\"onCityChange($event.target.value)\">\n         <option value=\"0\">All</option>\n         <option *ngFor=\"let item of location.cities\" [value]=\"item.id\">{{item.name}}</option>\n         </select>\n      </div>\n   </div>\n\n   <div class=\"col-md-2\">\n   <div class=\"form-group\">\n   <label>Locality</label>\n   <select class=\"form-control\" (change)=\"onLocalityChange($event.target.value)\">\n         <option value=\"0\">All</option>\n         <option *ngFor=\"let item of location.localities\" [value]=\"item.id\">{{item.name}}</option>\n      </select>\n   </div>\n   </div>\n   </div>\n\n   <div class=\"row\">\n         <div class=\"col-md-12\">\n            <div class=\"cust-tabs-2\">\n               <ul class=\"nav nav-tabs float-right\">\n                  <li class=\"nav-item\">\n                     <a [ngClass]=\"{'active':parameter.dash_flag == 1}\" (click)=\"parameter.dash_flag=1;getListing()\" class=\"nav-link\" data-toggle=\"tab\" href=\"#tw\">This Week</a>\n                  </li>\n                  <li class=\"nav-item\">\n                     <a [ngClass]=\"{'active':parameter.dash_flag == 2}\" (click)=\"parameter.dash_flag=2;getListing()\" class=\"nav-link\" data-toggle=\"tab\" href=\"#tm\">This Month</a>\n                  </li>\n                  <li class=\"nav-item\">\n                     <a [ngClass]=\"{'active':parameter.dash_flag == 3}\" (click)=\"parameter.dash_flag=3;getListing()\" class=\"nav-link\" data-toggle=\"tab\" href=\"#lm\">Last Month</a>\n                  </li>\n                  <li class=\"nav-item\">\n                     <a [ngClass]=\"{'active':parameter.dash_flag == 4}\" (click)=\"parameter.dash_flag=4;getListing()\" class=\"nav-link\" data-toggle=\"tab\" href=\"#lt\">Lifetime</a>\n                  </li>\n                  <li class=\"nav-item\">\n                     <a [ngClass]=\"{'active':parameter.dash_flag == 5}\" (click)=\"parameter.dash_flag=5\" class=\"nav-link\" data-toggle=\"tab\" href=\"#cust\">Custom</a>\n                  </li>\n               </ul>\n            </div>\n         </div>\n         <div class=\"col-12\">\n            <div *ngIf=\"parameter.dash_flag == 5\" class=\"pull-right row\">\n               <div class=\"col-lg-4 col-md-4 col-sm-5 col-5\">\n               <div class=\"form-group marginB0\">\n                     <label>From:</label>\n                     <p-calendar showIcon=\"true\" [(ngModel)]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n               </div>\n               </div>\n               <div class=\"col-lg-4 col-md-4 col-sm-5 col-5\">\n               <div class=\"form-group marginB0\">\n                     <label>To:</label>\n                     <p-calendar showIcon=\"true\" [(ngModel)]=\"parameter.max\" [minDate]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n               </div>\n               </div>\n               <div class=\"col-lg-4 col-md-4 col-sm-2 col-6\">\n               <div class=\"form-group btn-cont\">\n                     <label class=\"addMT3\">&nbsp;</label>\n                     <button class=\"btn btn-calender\" href=\"javascript://\" (click)=\"getListing()\"\n               [disabled]=\"!parameter.min || !parameter.max\">Apply</button>\n               </div>\n               </div>\n            </div>\n         </div>\n      </div> -->\n\n         <div class=\"cust-tabs\">\n         <div class=\"row flex-wrap-reverse\">\n            \n         <div class=\"col-xl-10 col-lg-12 col-md-12 col-sm-12 col-12\">\n         <ul class=\"nav nav-tabs\">\n            <li class=\"nav-item\">\n               <a [ngClass]=\"{'active':parameter.flag==3}\" (click)=\"changePropertyFlag(3)\" class=\"nav-link\" >Approved</a>\n            </li>\n            <li class=\"nav-item\">\n               <a [ngClass]=\"{'active':parameter.flag==4}\" (click)=\"changePropertyFlag(4)\" class=\"nav-link\" >Unapproved</a>\n            </li>\n               <li class=\"nav-item\">\n               <a [ngClass]=\"{'active':parameter.flag==2}\" (click)=\"changePropertyFlag(2)\" class=\"nav-link\" >Pending Review</a>\n            </li>\n               <li class=\"nav-item\">\n               <a [ngClass]=\"{'active':parameter.flag==1}\" (click)=\"changePropertyFlag(1)\" class=\"nav-link\" >In Draft</a>\n            </li>\n         </ul>\n         </div>\n         <div class=\"col-xl-2 col-lg-12 col-md-12 col-sm-12 col-12\"><div class=\"add-new text-left\">\n               <a *ngIf=\"admin?.admin_acl['Property Management']?.can_create==1\" class=\"btn\" href=\"javascript://\" routerLink=\"/dashboard/properties/add-property/0/0\">+Add New Property</a>\n            </div></div>\n            </div>\n         <div class=\"tab-content white-bg\">\n            <div class=\"tab-pane active\">\n               <div class=\"tabel-section\">\n                  <div class=\"table-responsive\">\n                     <table class=\"table table-striped table-align-left\">\n                        <tr>\n                           <th style=\"width:15%; text-align:left;\">\n                              <div class=\"table-search\">\n                                 <label>Name of Building</label>\n                                 <div class=\"searh-3\">\n                                    <input type=\"text\" [(ngModel)]=\"parameter.keyword\" (keyup.enter)=\"getListing()\" >\n                                    <button *ngIf=\"parameter.keyword\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                                 </div>\n                              </div>\n                           </th>\n                           <th style=\"width:20%; text-align:left;\">\n                              <div class=\"table-search\">\n                                 <label>Configuration</label>\n                                 <select [(ngModel)]=\"parameter.configuration_id\" (change)=\"getListing()\">\n                                    <option value=\"0\">All configuration</option>\n                                    <option *ngFor=\"let c of configurations\" value=\"{{c.id}}\" >\n                                       {{c.name}}\n                                    </option>\n                                 </select>\n                              </div>\n                           </th>\n                           <th style=\"width:15%;vertical-align:top;\">\n                              <div (click)=\"sort_by(1)\" class=\"d-flex table-search\">\n                                 <label>Price</label>\n                                 <a href=\"javascript://\"><img [ngClass]=\"{'upsidedown':parameter.sort_by==1 && parameter.sort_by_order==0}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a></div>\n                           </th>\n                           <th style=\"width:15%;vertical-align:top;\">\n                              <div (click)=\"sort_by(2)\" class=\"d-flex table-search\">\n                                 <label>Availability</label>\n                              <a href=\"javascript://\"><img [ngClass]=\"{'upsidedown':parameter.sort_by==2 && parameter.sort_by_order==0}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n                              </div>\n                           </th>\n                           <th style=\"width:15%;vertical-align:top;\">\n                              <div (click)=\"sort_by(3)\" class=\"d-flex table-search\">\n                                 <label>Leads</label>\n                                 <a href=\"javascript://\"><img [ngClass]=\"{'upsidedown':parameter.sort_by==3 && parameter.sort_by_order==0}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n                              </div>\n\n                              <!-- <div (click)=\"sort_by(3)\" class=\"-d-flex table-search\">\n                                 <label>Leads</label>\n                                 <a href=\"javascript://\"><img [ngClass]=\"{'upsidedown':parameter.sort_by==3 && parameter.sort_by_order==0}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a></div> -->\n                           </th>\n                           <th style=\"width:20%;\">&nbsp;</th>\n                        </tr>\n                  \n                        <tr *ngFor=\"let p of items | paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: total }\">\n                              <td class=\"cursor-pointer\" title=\"Click to view details\" routerLink=\"/dashboard/properties/details/{{p.id}}\">\n                              <strong>{{p?.building?.name?p?.building?.name:'NA'}}</strong>\n                              <div class=\"clearfix\"></div>\n                              <small *ngIf=\"p.quantity > 0\">\n                                 {{p.quantity}} \n                                 <span *ngIf=\"p.quantity == 1\">property</span>\n                                 <span *ngIf=\"p.quantity > 1\">properties</span>\n                              </small>                                     \n\n                              </td>\n                              <td><span *ngIf=\"p && p.configuration\">{{p.configuration?.name}}</span></td>\n                              <td><span>{{p.min_price}}</span></td>\n                              <td><span class=\"green-color\">\n                              <span *ngIf=\"p.for_sale\">Sell</span>\n                              <span *ngIf=\"p.for_rent\">Rent</span></span>\n                              </td>\n                              <td><span>{{p.lead_properties_count}}</span></td>\n                              <td>\n                              <div class=\"message\">\n                                 <button [disabled]=\"admin?.admin_acl['Property Management']?.can_update==0\" *ngIf=\"parameter?.flag!=3\" routerLink=\"../edit-property/{{p.id}}\" title=\"Edit Details\" class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></button>\n                                 <button [disabled]=\"admin?.admin_acl['Property Management']?.can_update==0\" *ngIf=\"parameter?.flag==3\" routerLink=\"../edit-property/{{p.id}}/edit\" title=\"Edit Details\" class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></button>\n                                 <button [disabled]=\"admin?.admin_acl['Property Management']?.can_delete==0\" *ngIf=\"!p.is_blocked\" (click)=\"block(p);\" class=\"action-icon\" title=\"Block\"><img src=\"assets/img/block.png\" alt=\"img\"></button>\n                                 <button [disabled]=\"admin?.admin_acl['Property Management']?.can_delete==0\" *ngIf=\"p.is_blocked == true\" (click)=\"unblock(p);\" class=\"action-icon unblock-bg\" title=\"UnBlock\"><img src=\"assets/img/unblock.png\" alt=\"img\"></button>\n                                 <button [disabled]=\"admin?.admin_acl['Property Management']?.can_update==0\" *ngIf=\"p.status == 3\" (click)=\"changeStatus(p,2);\" class=\"action-icon\" title=\"Unapprove\"><img src=\"assets/img/tick-selected.png\" alt=\"img\"></button>\n                                 <button [disabled]=\"admin?.admin_acl['Property Management']?.can_update==0\" *ngIf=\"p.status == 2\" (click)=\"changeStatus(p,3);\" class=\"action-icon\" title=\"Approve\"><img src=\"assets/img/tick.png\" alt=\"img\"></button>\n                                 <button [disabled]=\"admin?.admin_acl['Property Management']?.can_update==0\" *ngIf=\"p.status == 3 && p.is_featured==0\" (click)=\"markPropertyFeatured(p,1);\" class=\"action-icon\" title=\"Mark feature\"><img src=\"assets/img/tick.png\" alt=\"img\"></button>\n                                 <button [disabled]=\"admin?.admin_acl['Property Management']?.can_update==0\" *ngIf=\"p.status == 3 && p.is_featured==1\" (click)=\"markPropertyFeatured(p,0);\" class=\"action-icon\" title=\"Mark unfeature\"><img src=\"assets/img/tick-selected.png\" alt=\"img\"></button>\n                              </div>\n\n                              </td>\n                        </tr>\n                        <!-- <tr *ngIf=\"parameter.loading == false && total == 0\">\n                           <td colspan=\"10\">No result found</td>\n                           </tr> -->\n                     </table>\n                     <div class=\"padding20 center\" *ngIf=\"parameter.loading == false && total == 0\">\n                           <img src=\"assets/img/404-error.png\">\n                     </div>\n                  </div>\n               </div>\n            </div>\n            <div class=\"tab-pane container fade\" id=\"seller\">Seller tab on</div>\n         </div>\n      </div>\n      \n    <div class=\"btn-cont marginT15\" *ngIf=\"total\">\n         <div class=\"row\">\n             <div class=\"col-6\">\n                 <div class=\"title-group\">\n                     <p>Showing {{items?.length}} out of {{total}}</p>\n                 </div>\n             </div>\n             <div class=\"col-6 text-right\">\n                 <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n             </div>\n         </div>\n     </div>\n</div>"

/***/ }),

/***/ "./src/app/layout/properties/properties.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/layout/properties/properties.component.ts ***!
  \***********************************************************/
/*! exports provided: PropertiesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertiesComponent", function() { return PropertiesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_admin_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PropertiesComponent = /** @class */ (function () {
    function PropertiesComponent(constant, admin) {
        this.constant = constant;
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
    PropertiesComponent.prototype.ngOnInit = function () {
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        this.parameter.dash_flag = 2;
        this.parameter.flag = 3;
        this.getCountries();
        this.getPropertyConfigurations();
        this.getListing();
    };
    PropertiesComponent.prototype.getListing = function () {
        var _this = this;
        this.parameter.loading = true;
        var input = JSON.parse(JSON.stringify(this.parameter));
        if (this.parameter.min) {
            input.min = moment__WEBPACK_IMPORTED_MODULE_3__(this.parameter.min).format('YYYY-MM-DD');
        }
        else {
            delete input.min;
        }
        if (this.parameter.max) {
            input.max = moment__WEBPACK_IMPORTED_MODULE_3__(this.parameter.max).format('YYYY-MM-DD');
        }
        else {
            delete input.max;
        }
        this.admin.postDataApi('propertyHome', input).subscribe(function (success) {
            _this.items = success.data;
            _this.total = success.total_count;
            _this.parameter.loading = false;
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    PropertiesComponent.prototype.getCountries = function () {
        var _this = this;
        this.admin.postDataApi('getCountryLocality', {}).subscribe(function (r) {
            _this.location.countries = r['data'];
        });
    };
    PropertiesComponent.prototype.getPropertyConfigurations = function () {
        var _this = this;
        this.admin.postDataApi('getPropertyConfigurations', {}).subscribe(function (r) {
            _this.configurations = r['data'];
        });
    };
    PropertiesComponent.prototype.onCountryChange = function (id) {
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
    PropertiesComponent.prototype.onStateChange = function (id) {
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
    PropertiesComponent.prototype.onCityChange = function (id) {
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
    PropertiesComponent.prototype.onLocalityChange = function (id) {
        this.parameter.buildings = [];
        this.parameter.building_id = '0';
        if (!id || id.toString() === '0') {
            return false;
        }
        this.parameter.locality_id = id;
        // let selectedLocation = this.location.localities.filter(x=>x.id == id);
        // this.location.locality = selectedLocation[0];
    };
    PropertiesComponent.prototype.getLocalityBuildings = function (id) {
        var _this = this;
        if (!id || id.toString() === '0') {
            return false;
        }
        this.parameter.locality_id = id;
        this.parameter.loading = true;
        this.admin.postDataApi('getLocalityBuildings', this.parameter)
            .subscribe(function (success) {
            _this.parameter.loading = false;
            _this.parameter.buildings = success.data;
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    PropertiesComponent.prototype.setBuilding = function (building_id) {
        this.parameter.building_id = building_id;
    };
    PropertiesComponent.prototype.changeFlag = function (flag) {
        this.parameter.dash_flag = flag;
        if (flag === 5) {
            return false;
        }
        this.resetDates();
        this.getListing();
    };
    PropertiesComponent.prototype.changePropertyFlag = function (flag) {
        this.parameter.flag = flag;
        this.getListing();
    };
    // toggleAndSort(sort_by, sort_by_order) {
    //   if (this[sort_by_order] == 1) {
    //     this[sort_by_order] = 0;
    //   }else {
    //     this[sort_by_order] = 1;
    //   }
    //   this.parameter.sort_by = sort_by;
    //   this.parameter.sort_by_order = sort_by_order;
    //   console.log(this.parameter);
    //   this.getListing();
    // }
    PropertiesComponent.prototype.sort_by = function (sort_by) {
        if (this.parameter.sort_by !== sort_by) {
            this.parameter.sort_by = sort_by;
            this.parameter.sort_by_order = 1;
        }
        else {
            this.parameter.sort_by_order = this.parameter.sort_by_order ? 0 : 1;
        }
        this.getListing();
    };
    PropertiesComponent.prototype.getPage = function (page) {
        this.parameter.page = page;
        this.getListing();
    };
    PropertiesComponent.prototype.block = function (item) {
        item.is_blocked = true;
        this.admin.postDataApi('blockProperty', { property_id: item.id, flag: 1 }).subscribe(function (r) {
            swal('Success', 'Property blocked successfully', 'success');
        }, function (error) {
            swal('Error', error.error.message, 'error');
        });
    };
    PropertiesComponent.prototype.unblock = function (item) {
        item.is_blocked = false;
        this.admin.postDataApi('blockProperty', { property_id: item.id, flag: 0 }).subscribe(function (r) {
            swal('Success', 'Property unblocked successfully', 'success');
        }, function (error) {
            swal('Error', error.error.message, 'error');
        });
    };
    PropertiesComponent.prototype.changeStatus = function (item, status) {
        item.status = status;
        this.admin.postDataApi('updatePropertyStatus', { property_id: item.id, status_id: status }).subscribe(function (r) {
            swal('Success', 'Property status changed', 'success');
        }, function (error) {
            swal('Error', error.error.message, 'error');
        });
    };
    PropertiesComponent.prototype.resetFilters = function () {
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
    PropertiesComponent.prototype.resetDates = function () {
        this.parameter.min = '';
        this.parameter.max = '';
    };
    PropertiesComponent.prototype.markPropertyFeatured = function (item, is_featured) {
        item.is_featured = is_featured;
        this.admin.postDataApi('markPropertyFeatured', { property_id: item.id, flag: is_featured }).subscribe(function (r) {
            var msg = is_featured === 1 ? 'Featured successfully.' : 'Unfeatured successfully.';
            swal('Success', msg, 'success');
        }, function (error) {
            swal('Error', error.error.message, 'error');
        });
    };
    PropertiesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-properties',
            template: __webpack_require__(/*! ./properties.component.html */ "./src/app/layout/properties/properties.component.html"),
            styles: [__webpack_require__(/*! ./properties.component.css */ "./src/app/layout/properties/properties.component.css")]
        }),
        __metadata("design:paramtypes", [_common_constants__WEBPACK_IMPORTED_MODULE_2__["Constant"],
            _services_admin_service__WEBPACK_IMPORTED_MODULE_1__["AdminService"]])
    ], PropertiesComponent);
    return PropertiesComponent;
}());



/***/ }),

/***/ "./src/app/layout/properties/properties.module.ts":
/*!********************************************************!*\
  !*** ./src/app/layout/properties/properties.module.ts ***!
  \********************************************************/
/*! exports provided: PropertiesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertiesModule", function() { return PropertiesModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_loading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-loading */ "./node_modules/ngx-loading/fesm5/ngx-loading.js");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");
/* harmony import */ var ng2_tel_input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ng2-tel-input */ "./node_modules/ng2-tel-input/ng2-tel-input.js");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var ng_lazyload_image__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng-lazyload-image */ "./node_modules/ng-lazyload-image/index.js");
/* harmony import */ var ng_lazyload_image__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(ng_lazyload_image__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _properties_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./properties.component */ "./src/app/layout/properties/properties.component.ts");
/* harmony import */ var _add_property_add_property_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./add-property/add-property.component */ "./src/app/layout/properties/add-property/add-property.component.ts");
/* harmony import */ var _property_details_property_details_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./property-details/property-details.component */ "./src/app/layout/properties/property-details/property-details.component.ts");
/* harmony import */ var _guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../guards/acl-user.guard */ "./src/app/guards/acl-user.guard.ts");
/* harmony import */ var _pipes_filter_by_id_pipe__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../pipes/filter-by-id.pipe */ "./src/app/pipes/filter-by-id.pipe.ts");
/* harmony import */ var _pipes_filter_by_name_pipe__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../pipes/filter-by-name.pipe */ "./src/app/pipes/filter-by-name.pipe.ts");
/* harmony import */ var _modules_shared_module__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../modules/shared.module */ "./src/app/modules/shared.module.ts");
/* harmony import */ var primeng_primeng__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! primeng/primeng */ "./node_modules/primeng/primeng.js");
/* harmony import */ var primeng_primeng__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(primeng_primeng__WEBPACK_IMPORTED_MODULE_16__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// third party libraries









// general components








var routes = [
    { path: 'details/:property_id', component: _property_details_property_details_component__WEBPACK_IMPORTED_MODULE_11__["PropertyDetailsComponent"] },
    // { path: 'details/:property_id', component: PropertyDetailsComponent,
    //   canActivate: [AclUserGuard], data: {roles: ['Property Management', 'can_read', '']}},
    { path: 'add-property/:property_id/:seller_id', component: _add_property_add_property_component__WEBPACK_IMPORTED_MODULE_10__["AddPropertyComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_12__["AclUserGuard"]], data: { roles: ['Property Management', 'can_create', 'can_csr_seller'] } },
    { path: 'edit-property/:property_id', component: _add_property_add_property_component__WEBPACK_IMPORTED_MODULE_10__["AddPropertyComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_12__["AclUserGuard"]], data: { roles: ['Property Management', 'can_update', 'can_csr_seller'] } },
    { path: 'edit-property/:property_id/:edit', component: _add_property_add_property_component__WEBPACK_IMPORTED_MODULE_10__["AddPropertyComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_12__["AclUserGuard"]], data: { roles: ['Property Management', 'can_update', 'can_csr_seller'] } },
    { path: 'view-properties', component: _properties_component__WEBPACK_IMPORTED_MODULE_9__["PropertiesComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_12__["AclUserGuard"]], data: { roles: ['Property Management', 'can_read', ''] } }
];
var PropertiesModule = /** @class */ (function () {
    function PropertiesModule() {
    }
    PropertiesModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes),
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                ngx_loading__WEBPACK_IMPORTED_MODULE_4__["NgxLoadingModule"].forRoot({
                    animationType: ngx_loading__WEBPACK_IMPORTED_MODULE_4__["ngxLoadingAnimationTypes"].rectangleBounce,
                    primaryColour: '#00B96F'
                }),
                _agm_core__WEBPACK_IMPORTED_MODULE_5__["AgmCoreModule"].forRoot({
                    apiKey: 'AIzaSyCYv_zELZGVo2Ehzgp8eh8UeSIidhMCmH8',
                    libraries: ['drawing', 'places']
                }),
                ng2_tel_input__WEBPACK_IMPORTED_MODULE_6__["Ng2TelInputModule"],
                ngx_pagination__WEBPACK_IMPORTED_MODULE_7__["NgxPaginationModule"],
                primeng_primeng__WEBPACK_IMPORTED_MODULE_16__["CalendarModule"],
                _modules_shared_module__WEBPACK_IMPORTED_MODULE_15__["SharedModule"],
                ng_lazyload_image__WEBPACK_IMPORTED_MODULE_8__["LazyLoadImageModule"]
            ],
            declarations: [
                _properties_component__WEBPACK_IMPORTED_MODULE_9__["PropertiesComponent"],
                _add_property_add_property_component__WEBPACK_IMPORTED_MODULE_10__["AddPropertyComponent"],
                _property_details_property_details_component__WEBPACK_IMPORTED_MODULE_11__["PropertyDetailsComponent"],
                _pipes_filter_by_id_pipe__WEBPACK_IMPORTED_MODULE_13__["FilterByIdPipe"],
                _pipes_filter_by_name_pipe__WEBPACK_IMPORTED_MODULE_14__["FilterByNamePipe"]
            ]
        })
    ], PropertiesModule);
    return PropertiesModule;
}());



/***/ }),

/***/ "./src/app/layout/properties/property-details/property-details.component.css":
/*!***********************************************************************************!*\
  !*** ./src/app/layout/properties/property-details/property-details.component.css ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/layout/properties/property-details/property-details.component.html":
/*!************************************************************************************!*\
  !*** ./src/app/layout/properties/property-details/property-details.component.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<div class=\"container-fluid\">\n  <div class=\"white-bg configuration-page\">\n      <div class=\"top-main-img-outer\">\n        <div class=\"avl\">Available for\n            <span *ngIf=\"property?.for_rent\">Rent</span>\n            <span *ngIf=\"property?.for_rent && property?.for_sale\">/</span>\n            <span *ngIf=\"property?.for_sale\">Sale</span>\n        </div>\n        <div class=\"fig-block\">\n            <!-- <img class=\"img-fluid top-main-img\" [src]=\"property?.image\" onerror='this.src=\"assets/img/loading_image_1.gif\"'> -->\n            <img class=\"img-fluid top-main-img\" onerror='this.src=\"constant.propertyPlaceholder\"' [defaultImage]=\"property?.image| img:'thumb'\" [lazyLoad]=\"property?.image\">\n      </div> \n      </div>\n      <div class=\"padding30\">\n        <div class=\"apart-info \">\n            <p *ngIf=\"property?.configuration\" class=\"p14\">{{property?.configuration.name}} {{property?.property_type.name}}</p>\n            <p class=\"p12\">{{property?.bedroom}} Bed, {{property?.bathroom}} Bath</p>\n\n            <h6 class=\"float-left\">{{property?.max_area}} sqft.</h6> <h6 class=\"float-right\">{{property?.max_price|thousand}}</h6>\n            <div class=\"clearfix\"></div>\n        </div> \n        <div class=\"building-name\">\n            <div class=\"float-left\">\n                <p *ngIf=\"property?.building\" class=\"p14\">{{property?.building?.name}}</p>\n                <p class=\"p12 marginB0\">Building</p>\n            </div>\n            <div class=\"float-right\"><a href=\"javascript://\">\n                <img src=\"assets/img/viewfull.png\" alt=\"img\"></a></div>\n            <!-- <div *ngIf=\"property.building\" class=\"float-right\" [routerLink]=\"['/project',property.building.id]\"><a href=\"javascript://\"><img src=\"assets/img/viewfull.png\" alt=\"img\"></a></div> -->\n            <div class=\"clearfix\"></div>\n        </div>\n\n        <div class=\"clearfix\"></div>\n        <div class=\"row\">\n            <div class=\"col-md-6 col-12\">\n                <h4>Description</h4>\n                <p class=\"p15 newline\">{{property?.description}}</p>\n\n                <h4>Area</h4>\n                <div class=\"area-table\" *ngIf=\"property?.carpet_areas\">\n                    <table class=\"table table-borderless\">\n                       <tbody><tr>\n                       <th>Carpet Area</th>\n                       <th>Base Price</th>\n                       </tr>\n                       <tr *ngFor=\"let area of property?.carpet_areas \" >\n                         <td>{{area.area}} sqft.</td>\n                         <td>{{area.price|thousand}}</td>\n                       </tr>\n\n                    </tbody></table>\n                 </div>\n\n                <h4>Specifications</h4>\n                <div class=\"spec-table\">\n                    <table class=\"table table-borderless\">\n                       <tbody><tr>\n                          <td>\n                          <label>Bedrooms</label>\n                          <span>{{property?.bedroom}}</span>\n                          </td>\n                          <td>\n                          <label>Bathrooms</label>\n                          <span>{{property?.bathroom}}</span>\n                          </td>\n                       </tr>\n                        <tr>\n                          <td>\n                          <label>Parking</label>\n                          <span>{{property?.parking?'Yes':'No'}}</span>\n                          </td>\n                          <td>\n                          <label>Furnished</label>\n                          <span>{{property?.furnished?'Yes':'No'}}</span>\n                          </td>\n                       </tr>\n                        <tr>\n                          <td>\n                          <label>Pets Allowed</label>\n                          <span>{{property?.pets?'Yes':'No'}}</span>\n                          </td>\n                          <td *ngIf=\"property?.marital_statuses\">\n                          <label>Available For</label>\n                          <span *ngFor=\"let ms of property.marital_statuses; let i=index\">\n                              {{ms.name}}\n                              <span *ngIf=\"i<property?.marital_statuses?.length-1\">,</span>\n                            </span>\n                          </td>\n\n                       </tr>\n                    </tbody></table>\n                </div>\n\n                <div *ngIf=\"property?.amenities?.length > 0\">\n                 <h4>Ameneties</h4>\n                 <ul class=\"green-icon-list\">\n                    <li *ngFor=\"let amenity of property?.amenities\">\n                      <span><img src=\"assets/img/green-icon.png\" alt=\"img\"></span>\n                      {{amenity.name}}\n                    </li>\n                 </ul>\n                </div>\n\n            </div>\n            <div class=\"col-md-6 col-12\">\n                <div class=\"fig-block text-center\">\n                    <!-- <img class=\"img-fluid\" [src]=\"property?.floor_plan\" alt=\"img\"> -->\n                    <img class=\"img-fluid\" onerror='this.src=\"constant.propertyPlaceholder\"' [defaultImage]=\"property?.floor_plan| img:'thumb'\" [lazyLoad]=\"property?.floor_plan\">\n                </div>\n            </div>\n\n\n        </div>\n      </div>\n      </div>\n</div>\n  "

/***/ }),

/***/ "./src/app/layout/properties/property-details/property-details.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/layout/properties/property-details/property-details.component.ts ***!
  \**********************************************************************************/
/*! exports provided: PropertyDetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyDetailsComponent", function() { return PropertyDetailsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_admin_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../common/constants */ "./src/app/common/constants.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PropertyDetailsComponent = /** @class */ (function () {
    function PropertyDetailsComponent(admin, route, constant) {
        this.admin = admin;
        this.route = route;
        this.constant = constant;
        this.parameter = {};
    }
    PropertyDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.getPropertyDetails(params.property_id);
        });
        // this.cs.propertyDetailsData$.subscribe(res => {
        //   console.log('ress', res);
        //   this.data = res;
        // });
    };
    PropertyDetailsComponent.prototype.getPropertyDetails = function (property_id) {
        var _this = this;
        this.parameter.loading = true;
        this.admin.postDataApi('getPropertyById', { property_id: property_id })
            .subscribe(function (success) {
            _this.parameter.loading = false;
            _this.property = success.data;
            // console.log('getPropertyById', this.property);
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    PropertyDetailsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-property-details',
            template: __webpack_require__(/*! ./property-details.component.html */ "./src/app/layout/properties/property-details/property-details.component.html"),
            styles: [__webpack_require__(/*! ./property-details.component.css */ "./src/app/layout/properties/property-details/property-details.component.css")]
        }),
        __metadata("design:paramtypes", [_services_admin_service__WEBPACK_IMPORTED_MODULE_1__["AdminService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _common_constants__WEBPACK_IMPORTED_MODULE_3__["Constant"]])
    ], PropertyDetailsComponent);
    return PropertyDetailsComponent;
}());



/***/ }),

/***/ "./src/app/models/addProperty.model.ts":
/*!*********************************************!*\
  !*** ./src/app/models/addProperty.model.ts ***!
  \*********************************************/
/*! exports provided: CarpetAreas, AddPropertyModel, Building, PropertyDetails */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CarpetAreas", function() { return CarpetAreas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddPropertyModel", function() { return AddPropertyModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Building", function() { return Building; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyDetails", function() { return PropertyDetails; });
var CarpetAreas = /** @class */ (function () {
    function CarpetAreas() {
        this.carpet_areas = [
            {
                area: 0,
                price: 0
            }
        ];
    }
    return CarpetAreas;
}());

var AddPropertyModel = /** @class */ (function () {
    function AddPropertyModel() {
        this.id = '';
        this.step = 0;
        this.for_rent = false;
        this.for_sale = true;
        // for_rent: any = '0';
        // for_sale: any = '1';
        this.country_id = '';
        this.state_id = '';
        this.city_id = '';
        this.locality_id = '';
        this.configuration_id = '';
        this.property_type_id = '';
        // carpet_areas: any = [
        //     {
        //         area: '',
        //         price: ''
        //     }
        // ];
        this.carpet_areas = [];
        this.property_id = '';
        this.images = [];
        this.bedroom = 1;
        this.bathroom = 1;
        this.floor = 1;
        this.parking = 1;
        this.furnished = 1;
        this.description = '';
        this.quantity = 1;
        this.amenities = [];
        this.banks = [];
        this.pets = 1;
        this.marital_status = [1];
        // custom_attributes: any = [
        //     {
        //         name: '',
        //         value: ''
        //     }
        // ];
        this.custom_attributes = [];
        this.property_quantity_details = [];
    }
    return AddPropertyModel;
}());

var Building = /** @class */ (function () {
    function Building() {
    }
    return Building;
}());

var PropertyDetails = /** @class */ (function () {
    function PropertyDetails() {
    }
    return PropertyDetails;
}());



/***/ }),

/***/ "./src/app/pipes/filter-by-id.pipe.ts":
/*!********************************************!*\
  !*** ./src/app/pipes/filter-by-id.pipe.ts ***!
  \********************************************/
/*! exports provided: FilterByIdPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterByIdPipe", function() { return FilterByIdPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var FilterByIdPipe = /** @class */ (function () {
    function FilterByIdPipe() {
    }
    FilterByIdPipe.prototype.transform = function (value, args) {
        if (value === void 0) { value = []; }
        if (args) {
            return value.filter(function (data) {
                console.log(data);
                if (data.id == args) {
                    return data;
                }
            });
        }
        return value;
    };
    FilterByIdPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'filterById'
        })
    ], FilterByIdPipe);
    return FilterByIdPipe;
}());



/***/ }),

/***/ "./src/app/pipes/filter-by-name.pipe.ts":
/*!**********************************************!*\
  !*** ./src/app/pipes/filter-by-name.pipe.ts ***!
  \**********************************************/
/*! exports provided: FilterByNamePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterByNamePipe", function() { return FilterByNamePipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var FilterByNamePipe = /** @class */ (function () {
    function FilterByNamePipe() {
    }
    FilterByNamePipe.prototype.transform = function (items, text) {
        if (items === void 0) { items = []; }
        if (text) {
            if (text.length < 1) {
                return items;
            }
            return items.filter(function (item) {
                if (item.name) {
                    return item.name.toLowerCase().indexOf(text.toLowerCase()) !== -1;
                }
            });
        }
        return items;
    };
    FilterByNamePipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'filterByName'
        })
    ], FilterByNamePipe);
    return FilterByNamePipe;
}());



/***/ })

}]);
//# sourceMappingURL=properties-properties-module.js.map