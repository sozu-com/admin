webpackJsonp([2],{

/***/ "../../../../../src/app/layout/properties/add-property/add-property.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".upload-cover-img{\n    background-size: contain;background-repeat: no-repeat;\n}\n.width100{\n    width: 100%;\n}\n.paddingleft0{\n    padding-left: 0px;\n}\nagm-map {\n    height: 300px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/properties/add-property/add-property.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container-fluid\">\n  <div class=\"white-bg padding15\">\n    <div class=\"row\">\n      <div class=\"col-md-6\">\n        <div class=\"title-group\">\n          <h5>Add New Property</h5>\n        </div>\n      </div>\n      <!-- <div class=\"col-md-6\">\n        <div class=\"btn-cont text-right\">\n          <a class=\"btn-third btn\" href=\"javascript://\" (click)=\"setTab(tab+1)\" *ngIf=\"tab != 3\">Next</a>\n          <a class=\"btn-third btn\" href=\"javascript://\" *ngIf=\"tab == 3\">Submitt</a>\n        </div>\n      </div> -->\n    </div>\n  </div>\n  \n  <ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n\n  <div class=\"spacer10\"></div>\n  \n  <div class=\"white-bg padding15\">\n    <div class=\"steps\">\n      <ul class=\"d-flex\">\n        <!-- <li [ngClass]=\"{'current': tab == 1}\"><span></span><a (click)=\"setTab(1)\">Create Draft</a></li>\n        <li [ngClass]=\"{'current': tab == 2}\"><span></span><a (click)=\"setTab(2)\">Additional Info</a></li>\n        <li [ngClass]=\"{'current': tab == 3}\"><span></span><a (click)=\"setTab(3)\">Preferable Buyers</a></li>\n        <li [ngClass]=\"{'current': tab == 4}\"><span></span><a (click)=\"setTab(4)\">Custom</a></li>\n        <li [ngClass]=\"{'current': tab == 5}\"><span></span><a (click)=\"setTab(5)\">Tag a Building</a></li>\n        <li [ngClass]=\"{'current': tab == 6}\"><span></span><a (click)=\"setTab(6)\">Submit</a></li> -->\n        <li [ngClass]=\"{'current': tab == 1}\" [ngClass]=\"{'selected': tab > 1}\"><span></span><a>Create Draft</a></li>\n        <li [ngClass]=\"{'current': tab == 2}\" [ngClass]=\"{'selected': tab > 2}\"><span></span><a>Additional Info</a></li>\n        <li [ngClass]=\"{'current': tab == 3}\" [ngClass]=\"{'selected': tab > 3}\"><span></span><a>Preferable Buyers</a></li>\n        <li [ngClass]=\"{'current': tab == 4}\" [ngClass]=\"{'selected': tab > 4}\"><span></span><a>Custom</a></li>\n        <li [ngClass]=\"{'current': tab == 5}\" [ngClass]=\"{'selected': tab > 5}\"><span></span><a>Tag a Building</a></li>\n        <li [ngClass]=\"{'current': tab == 6}\" [ngClass]=\"{'selected': tab > 6}\"><span></span><a>Submit</a></li>\n      </ul>\n    </div>\n  </div>\n\n  <div class=\"spacer10\"></div>\n\n  <form  ngNativeValidate #addForm=\"ngForm\">\n    \n    <!-- tab-1 -->\n    <div class=\"white-bg\" *ngIf=\"tab==1\">\n      <div class=\"page-title\">\n        <h3>Create Draft</h3>\n      </div>\n      <div class=\"padding40\">\n      <div class=\"form-group-3\">\n        <label>This Property is available for?</label>\n        <div class=\"clearfix\"></div>\n        <label class=\"cust-radio\">\n          <input [(ngModel)]=\"model.for_sale\" name=\"for_sale\" type=\"checkbox\" checked=\"model.for_sale == 1 ? checked: ''\">\n          <span class=\"checkmark\">Buy</span>\n        </label>\n        <label class=\"cust-radio\"> \n          <input [(ngModel)]=\"model.for_rent\" name=\"for_rent\" type=\"checkbox\" checked=\"model.for_rent == 1 ? checked: ''\">\n          <span class=\"checkmark\">Rent</span>\n        </label>\n        <div class=\"clearfix\"></div>\n      </div>\n        <div class=\"spacer15\"></div>\n        <div class=\"row\">\n          <div class=\"col-lg-3 col-md-12 col-sm-12 col-12\">\n            <div class=\"form-group-3\">\n              <label>Select Country</label>\n              <select title=\"Choose Country\" class=\"form-control\" (change)=\"getStates($event.target.value)\">\n                <option value=\"\" [selected]=\"model.country_id == ''\" disabled>Select Country</option>\n                <option *ngFor=\"let country of parameter.countries\" value=\"{{country.id}}\" [selected]=\"country.id == model.country_id\">{{country.name_en}}</option>\n              </select>\n            </div>   \n          </div>\n          <div class=\"col-lg-3 col-md-12 col-sm-12 col-12\">\n            <div class=\"form-group-3\">\n              <label>&nbsp;</label>\n              <select title=\"Choose State\" class=\"form-control\" (change)=\"getCities($event.target.value)\">\n                <option value=\"\" [selected]=\"model.state_id == ''\" disabled>Select State</option>\n                <option *ngFor=\"let state of parameter.states\" value=\"{{state.id}}\" [selected]=\"state.id == model.state_id\">{{state.name_en}}</option>\n              </select>\n            </div>   \n          </div>\n          <div class=\"col-lg-3 col-md-12 col-sm-12 col-12\">\n            <div class=\"form-group-3\">\n              <label>&nbsp;</label>\n              <select title=\"Choose City\" class=\"form-control\" (change)=\"getLocalities($event.target.value)\">\n                <option value=\"\" [selected]=\"model.city_id == ''\" disabled>Select City</option>\n                <option *ngFor=\"let city of parameter.cities\" value=\"{{city.id}}\" [selected]=\"city.id == model.city_id\">{{city.name_en}}</option>\n              </select>\n            </div>   \n          </div>\n          <div class=\"col-lg-3 col-md-12 col-sm-12 col-12\">\n            <div class=\"form-group-3\">\n              <label>&nbsp;</label>\n              <select title=\"Choose Locality\" class=\"form-control\" (change)=\"setLocality($event.target.value)\">\n                <option value=\"\" [selected]=\"model.locality_id == ''\" disabled>Select Locality</option>\n                <option *ngFor=\"let locality of parameter.localities\" value=\"{{locality.id}}\" [selected]=\"locality.id == model.locality_id\">{{locality.name_en}}</option>\n              </select>\n            </div>   \n          </div>\n        </div>\n      <div class=\"spacer15\"></div>\n\n      <div class=\"form-group-3\">\n        <label>Select Configuration?</label>\n        <div class=\"clearfix\"></div>\n        <label class=\"cust-radio\" *ngFor=\"let configuration of parameter.items\">\n          <input type=\"radio\" (change)=\"setConfiguration(configuration.id)\" value=\"{{configuration.id}}\" checked=\"model.configuration_id == configuration.id ? checked : ''\" name=\"configuration_id\">\n          <span class=\"checkmark\">{{configuration.name_en}}</span>\n        </label>\n        <div class=\"clearfix\"></div>\n      </div>\n      <div class=\"spacer15\"></div>\n\n      <div class=\"form-group-3\">\n        <label>Select Property Type?</label>\n        <div class=\"clearfix\"></div>\n        <label class=\"cust-radio\" *ngFor=\"let propertyType of parameter.propertyTypes\">\n          <input type=\"radio\" (change)=\"setPropertyType(propertyType.id)\" value=\"{{propertyType.id}}\" checked=\"model.property_type_id == propertyType.id ? checked : ''\" name=\"property_type_id\">\n          <span class=\"checkmark\">{{propertyType.name_en}}</span>\n        </label>\n        <div class=\"clearfix\"></div>\n      </div>\n\n      <div class=\"spacer15\"></div>\n        <div class=\"row\" *ngFor=\"let carpet_area of model.carpet_areas; let c = index;\">\n          <div class=\"col-md-4 col-sm-12 col-12\">\n            <div class=\"form-group-3\">\n              <label>Enter Carpet Area</label>\n              <input class=\"form-control\" required type=\"text\" name=\"area[{{c}}]\" placeholder=\"Area should be in Sq/ft.\" [(ngModel)]=\"carpet_area.area\">\n            </div> \n          </div>\n          <div class=\"col-md-4 col-sm-12 col-12\">\n            <div class=\"form-group-3\">\n              <label>Enter Average Price</label>\n              <input class=\"form-control\" required type=\"text\" name=\"price[{{c}}]\" placeholder=\"Amount should be in $\" [(ngModel)]=\"carpet_area.price\">\n            </div> \n          </div>\n          <div class=\"col-md-4 col-sm-12 col-12\" *ngIf=\"c>0\">\n            <div class=\"btn-cont form-group-3\">\n              <a href=\"javascript://\" class=\"btn delete-button\" (click)=\"model.carpet_areas.splice(c, 1)\">\n                <img src=\"assets/img/delete-button.png\" width=\"40\">\n              </a>\n            </div> \n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"col-md-4 btn-cont\">\n              <a href=\"javascript://\" class=\"btn-third btn\" (click)=\"model.carpet_areas.push({area: '', price: ''})\">Add More</a>\n          </div>\n        </div>\n      \n        <div class=\"row\">\n          <div class=\"col-md-12\">\n            <div class=\"btn-cont text-right\">\n              <a class=\"btn-third btn\" href=\"javascript://\" (click)=\"addProperty(addForm, 2)\">Next</a>\n            </div>\n          </div>\n        </div>\n\n      </div>\n    </div>\n\n\n    <!-- tab-2 -->\n    <div class=\"white-bg\" *ngIf=\"tab==2\">\n      <div class=\"page-title\">\n        <h3>Additional Info</h3>\n      </div>\n      <div class=\"padding40\">\n        <div class=\"form-group-3\">\n        <label>Add Images of your Property</label>\n          <div class=\"row\">\n            <div class=\"col-md-7 col-sm-12 col-12\">\n              <div class=\"upload-cover-img\" [style.background-image]=\"image1\">\n                <!-- <img *ngIf=\"url\" [src]=\"url\" height=\"200\"> -->\n                <div class=\"upload-caption\">\n                  <div class=\"fig-block\"> \n                    <img src=\"assets/img/placeholder-img.png\" alt=\"img\">\n                  </div>\n                  <p class=\"green-color marginT30\">+Upload Cover image for the project</p>\n                  <p>JPG or PNG. Image size should be 1920 × 1080 pixels (for HiDPI displays).</p>\n                </div>  \n                <input type=\"file\" name=\"\" accept=\"image/*\" (change)=\"onSelectFile1($event)\">\n              </div>\n            </div>\n            <div class=\"col-md-5 col-sm-12 col-12\">\n              <div class=\"upload-cover-img upload-cover-small\" [style.background-image]=\"image3\">\n                <input type=\"file\" name=\"\" accept=\"image/*\" (change)=\"onSelectFile3($event)\">\n                <div class=\"upload-caption\">\n                  <p class=\"green-color marginT30\">+ Add Floor plan</p>\n                </div> \n              </div>\n\n              <div class=\"upload-cover-img upload-cover-small\" [style.background-image]=\"image2\">\n                <!-- <input type=\"file\" name=\"\" accept=\"image/*\" (change)=\"onSelectFile2($event)\"> -->\n                <div class=\"upload-caption\">\n                  <!-- <p class=\"green-color marginT30\">+ Add more image</p> -->\n                  <p class=\"green-color marginT30\" data-toggle=\"modal\" data-target=\"#add-more-img\">+ Add more images</p>\n                </div> \n              </div>\n            </div>\n          </div>\n        </div> \n\n      <div class=\"row\">\n        <!-- <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n          <div class=\"form-group-3\">\n            <label>Total Area</label>\n            <input class=\"form-control\" type=\"number\" name=\"\" placeholder=\"in sq.ft.\">\n          </div>   \n        </div> -->\n        <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n          <div class=\"form-group-3\">\n            <label>Floors</label>\n            <input class=\"form-control\" min=\"1\" [(ngModel)]=\"model.floor\" type=\"number\" name=\"floor\" placeholder=\"in numbers\">\n          </div>   \n        </div>\n\n        <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n          <div class=\"form-group-3\">\n            <label>Bedrooms</label>\n            <input class=\"form-control\" min=\"1\" [(ngModel)]=\"model.bedroom\" type=\"number\" name=\"bedroom\" placeholder=\"in numbers\">\n          </div>   \n        </div>\n        <div class=\"col-lg-3 col-md-6 col-sm-6 col-12\">\n          <div class=\"form-group-3\">\n            <label>Bathrooms</label>\n            <input class=\"form-control\" min=\"1\" [(ngModel)]=\"model.bathroom\" type=\"number\" name=\"bathroom\" placeholder=\"in numbers\">\n          </div>   \n        </div>\n      </div>\n      <div class=\"form-group-3\">\n        <label>Is Parking Available?</label>\n        <div class=\"clearfix\"></div>\n        <label class=\"cust-radio\">\n          <input type=\"radio\" value=\"1\" [(ngModel)]=\"model.parking\" checked=\"model.parking == 1 ? checked: ''\" name=\"parking\">\n          <span class=\"checkmark\">Yes</span>\n        </label>\n        <label class=\"cust-radio\"> \n          <input type=\"radio\" value=\"0\" [(ngModel)]=\"model.parking\" checked=\"model.parking == 0 ? checked: ''\" name=\"parking\">\n          <span class=\"checkmark\">No</span>\n        </label>\n        <div class=\"clearfix\"></div>\n      </div>\n      <div class=\"spacer15\"></div>\n      <div class=\"form-group-3\">\n        <label>Is Property Furnished?</label>\n        <div class=\"clearfix\"></div>\n        <label class=\"cust-radio\">\n          <input type=\"radio\" value=\"1\" name=\"furnished\" [(ngModel)]=\"model.furnished\" checked=\"model.furnished == 1 ? checked: ''\">\n          <span class=\"checkmark\">Yes</span>\n        </label>\n        <label class=\"cust-radio\"> \n          <input type=\"radio\" value=\"0\" name=\"furnished\" [(ngModel)]=\"model.furnished\" checked=\"model.furnished == 0 ? checked: ''\">\n          <span class=\"checkmark\">No</span>\n        </label>\n        <div class=\"clearfix\"></div>\n      </div>\n\n      <div class=\"form-group-3\">\n        <label>Description</label>\n        <textarea [(ngModel)]=\"model.description\" placeholder=\"Enter description\" name=\"description\" class=\"form-control\"></textarea>\n      </div>\n\n      <div class=\"spacer15\"></div>\n      <div class=\"form-group-3\">\n        <label>How much quantity do you have?</label>\n        <div class=\"clearfix\"></div>\n        <label class=\"cust-radio\">\n          <input type=\"radio\" checked=\"model.quantity == '1' ? checked: ''\" name=\"quantity\">\n          <span class=\"checkmark\">1</span>\n        </label>\n        <label class=\"cust-radio\"> \n          <input type=\"radio\" checked=\"model.quantity == '2' ? checked: ''\" name=\"quantity\">\n          <span class=\"checkmark\">2</span>\n        </label>\n        <label class=\"cust-radio\">\n          <input type=\"radio\" checked=\"model.quantity == '3' ? checked: ''\" name=\"quantity\">\n          <span class=\"checkmark\">3</span>\n        </label>\n        <label class=\"cust-input\">\n          <input type=\"text\" min=\"4\" [(ngModel)]=\"model.quantity\" name=\"quantity\" placeholder=\"Enter\">\n        </label>\n        <div class=\"clearfix\"></div>\n      </div>\n\n      <div class=\"spacer15\"></div>\n      <div class=\"form-group-3\">\n        <label>List of Amenties with this property</label>\n        <!-- <div class=\"list-group-items\">\n          <ul>\n            <li *ngFor=\"let amenity of parameter.amenities\" (click)=\"setAmenity(amenity.id)\">\n              <div class=\"fig-block\"><img [src]=\"amenity.icon\" alt=\"img\" class=\"width100\"></div>\n              <p class=\"p13\">{{amenity.name_en}}</p>\n            </li>\n          </ul>\n        </div> -->\n\n        <div class=\"inline-form-group form-group-3 paddingleft0\">\n          <div class=\"row\">\n              <!-- <div class=\"col-md-4\">\n                <label>Property Configuration</label>\n              </div> -->\n              <div class=\"col-md-8\">\n                <input type=\"text\" list=\"amenities\" name=\"amen\" [(ngModel)]=\"amen\">\n                <datalist id=\"amenities\">\n                  <option *ngFor=\"let amenity of parameter.amenities\" value=\"{{amenity.name_en}}\">\n                </datalist>\n                <button class=\"add-btn\" (click)=\"addAmenity(amen)\"><img src=\"assets/img/add.png\" alt=\"img\"></button>\n                \n                <!-- <span class=\"tag\" *ngFor=\"let a of amenityList; let aIndex=index;\">\n                <a href=\"javascript://\" (click)=\"removeAmenity(aIndex)\">\n                  <img src=\"assets/img/close-tag.png\" alt=\"img\"></a>\n                {{a.name_en}}\n                </span> -->\n                \n                <div class=\"list-group-items\" *ngIf=\"amenityList\">\n                  <ul>\n                    <li *ngFor=\"let a of amenityList; let aIndex=index;\">\n                      <a href=\"javascript://\" (click)=\"removeAmenity(aIndex)\" class=\"close\">&times;</a>\n                      <div class=\"fig-block\"><img class=\"width100\" src=\"{{a.icon}}\" alt=\"img\"></div>\n                      <p class=\"p13\">{{a.name_en}}</p>\n                    </li>\n                  </ul>\n                </div>\n              </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"spacer15\"></div>\n      <div class=\"form-group-3\">\n        <label>List of Banks</label>\n        <div class=\"inline-form-group form-group-3 paddingleft0\">\n          <div class=\"row\">\n              <!-- <div class=\"col-md-4\">\n                <label>Property Configuration</label>\n              </div> -->\n              <div class=\"col-md-8\">\n                <input type=\"text\" list=\"banks\" name=\"bank\" [(ngModel)]=\"bank\">\n                <datalist id=\"banks\">\n                  <option *ngFor=\"let tBank of parameter.banks\" value=\"{{tBank.name}}\">\n                </datalist>\n                <button class=\"add-btn\" (click)=\"addBank(bank)\"><img src=\"assets/img/add.png\" alt=\"img\"></button>\n                <!-- <span class=\"tag\" *ngFor=\"let b of bankList; let bIndex=index;\">\n                <a href=\"javascript://\" (click)=\"removeBank(bIndex)\"><img src=\"assets/img/close-tag.png\" alt=\"img\"></a>\n                {{b.name}}\n                </span> -->\n\n                <div class=\"list-group-items\" *ngIf=\"bankList\">\n                  <ul>\n                    <li *ngFor=\"let b of bankList; let bIndex=index;\">\n                      <a href=\"javascript://\" (click)=\"removeBank(bIndex)\" class=\"close\">&times;</a>\n                      <div class=\"fig-block\"><img class=\"width100\" src=\"{{b.image}}\" alt=\"img\"></div>\n                      <p class=\"p13\">{{b.name}}</p>\n                    </li>\n                  </ul>\n                </div>\n\n              </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-md-12\">\n          <div class=\"btn-cont text-right\">\n            <a class=\"btn-third btn\" href=\"javascript://\" (click)=\"addProperty(addForm, 3)\">Next</a>\n          </div>\n        </div>\n      </div>\n      \n    </div>\n  </div>\n\n\n\n\n    <!-- tab-3 -->\n    <div class=\"white-bg\" *ngIf=\"tab==3\">\n        <div class=\"page-title\">\n          <h3>Preferable Buyers</h3>\n        </div>\n        <div class=\"padding40\">\n        <div class=\"form-group-3\">\n          <label>Marital Status?</label>\n          <div class=\"clearfix\"></div>\n          <label class=\"cust-radio\" *ngFor=\"let m of testMarital; let mi=index\">\n            <input type=\"checkbox\" value=\"{{m.id}}\" name=\"marital_status\" (click)=\"addMaritalStatus(m.id, mi)\" checked=\"{{m.checked}}\">\n            <span class=\"checkmark\">{{m.name}}</span>\n          </label>\n          <!-- <label class=\"cust-radio\"> \n            <input type=\"checkbox\" value=\"2\" name=\"marital_status\" [(ngModel)]=\"model.marital_status\" checked=\"model.marital_status == 2 ? checked: ''\">\n            <span class=\"checkmark\">Unmarried</span>\n          </label>\n          <label class=\"cust-radio\"> \n            <input type=\"checkbox\" value=\"3\" name=\"marital_status\" [(ngModel)]=\"model.marital_status\" checked=\"model.marital_status == 3 ? checked: ''\">\n            <span class=\"checkmark\">Divorced</span>\n          </label> -->\n          <div class=\"clearfix\"></div>\n        </div>\n        <div class=\"spacer15\"></div>\n        <div class=\"form-group-3\">\n          <label>Pets Allowed?</label>\n          <div class=\"clearfix\"></div>\n          <label class=\"cust-radio\">\n            <input type=\"radio\" value=\"1\" [(ngModel)]=\"model.pets\" checked=\"model.pets == 1 ? checked: ''\" name=\"pets\">\n            <span class=\"checkmark\">Allowed</span>\n          </label>\n          <label class=\"cust-radio\"> \n            <input type=\"radio\" value=\"0\" [(ngModel)]=\"model.pets\" checked=\"model.pets == 0 ? checked: ''\" name=\"pets\">\n            <span class=\"checkmark\">Not Allowed</span>\n          </label>\n          <div class=\"clearfix\"></div>\n        </div>\n\n        <div class=\"row\">\n          <div class=\"col-md-12\">\n            <div class=\"btn-cont text-right\">\n              <a class=\"btn-third btn\" href=\"javascript://\" (click)=\"addProperty(addForm, 4)\">Next</a>\n            </div>\n          </div>\n        </div>\n        \n      </div>\n    </div>\n\n\n\n    <!-- tab-4 -->\n    <div class=\"white-bg\" *ngIf=\"tab==4\">\n        <div class=\"page-title\">\n          <h3>Custom</h3>\n        </div>\n        <div class=\"padding40\">\n        <h5>Any information we missed, you want to add custom</h5>\n        <div class=\"row\" *ngFor=\"let custom_attribute of model.custom_attributes; let c = index;\">\n          <div class=\"col-md-4 col-sm-12 col-12\">\n            <div class=\"form-group-3\">\n              <label>Enter Parameter</label>\n              <input class=\"form-control\" required type=\"text\" [(ngModel)]=\"custom_attribute.name\" name=\"name\" placeholder=\"Enter parameter\">\n            </div> \n          </div>\n          <div class=\"col-md-4 col-sm-12 col-12\">\n            <div class=\"form-group-3\">\n              <label>Enter Value</label>\n              <input class=\"form-control\" required type=\"text\" [(ngModel)]=\"custom_attribute.value\" name=\"value\" placeholder=\"Enter value\">\n            </div> \n          </div>\n          <div class=\"col-md-4 col-sm-12 col-12\" *ngIf=\"c>0\">\n            <div class=\"btn-cont \">\n              <a href=\"javascript://\" class=\"btn delete-button\" (click)=\"model.custom_attributes.splice(c, 1)\">\n                <img src=\"assets/img/delete-button.png\" width=\"40\">\n              </a>\n            </div> \n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"col-md-4 btn-cont\">\n              <a href=\"javascript://\" class=\"btn-third btn\" (click)=\"model.custom_attributes.push({name: '', value: ''})\">Add More</a>\n          </div>\n        </div>\n\n        <div class=\"row\">\n          <div class=\"col-md-12\">\n            <div class=\"btn-cont text-right\">\n              <a class=\"btn-third btn\" href=\"javascript://\" (click)=\"addProperty(addForm, 5)\">Next</a>\n            </div>\n          </div>\n        </div>\n        \n      </div>\n    </div>\n\n    \n\n    <!-- tab-5 -->\n    <div class=\"white-bg\" *ngIf=\"tab==5\">\n      <div class=\"page-title\">\n        <h3>Tag a Building</h3>\n      </div>\n      <div class=\"padding40\">\n        <p class=\"p16\">Search your building in Our Database</p>\n        <div class=\"searh\">\n          <input type=\"text\" #buildingname name=\"buildingName\" [(ngModel)]=\"buildingName\">\n          <button (click)=\"searchBuilding(buildingname.value)\">Search</button>\n        </div>\n        <div class=\"spacer50\"></div>\n        \n        <div *ngIf=\"parameter.buildingCount != 0\" class=\"white-bg\">\n          <div class=\"tabel-section\">\n            <div class=\"table-responsive\">\n    \n            <table class=\"table table-striped\">\n                <tr>\n                  <th>Name</th>\n                  <th>Choose Building</th>\n                </tr>\n\n                <tr *ngFor=\"let item of parameter.buildings; let i = index\">\n                  <td class=\"text-left\">{{item.name}}</td>\n                  <td>\n                    <input type=\"radio\" name=\"building_id\" (change)=\"setBuildingId(item.id)\">                      \n                  </td>\n                </tr>\n              </table>\n            </div>\n          </div>\n    \n          <div class=\"row\">\n            <div class=\"col-md-12\">\n              <div class=\"btn-cont text-right\">\n                <a class=\"btn-third btn\" href=\"javascript://\" (click)=\"tagBuilding()\">Next</a>\n              </div>\n            </div>\n          </div>\n      </div>\n\n        <p *ngIf=\"parameter.buildingCount == 0 && showText\" class=\"p18\">Didn’t Found your Building? <strong><span (click)=\"showBuildingDetails(true)\" class=\"green-color cursor-pointer\">Generate a Request to add a building by our Data collectors</span></strong></p>\n        <div *ngIf=\"showBuilding\" class=\"spacer50\"></div>\n\n        <div *ngIf=\"showBuilding\" class=\"row\">\n          <div class=\"col-lg-7 col-md-12 col-sm-12 col-12\">\n            <div class=\"row\">\n              <div class=\"col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                  <label>Name of Building</label>\n                  <input required class=\"form-control\" type=\"text\" name=\"name\" [(ngModel)]=\"building.name\" placeholder=\"Enter name of building\">\n                </div>\n              </div>\n              <div class=\"col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                  <label>Where it is located?</label>\n                  <!-- <input class=\"form-control\" type=\"text\" name=\"address\" [(ngModel)]=\"building.address\" placeholder=\"Enter address\"> -->\n                  <input required placeholder=\"search for location\" autocorrect=\"off\" autocapitalize=\"off\" \n                    spellcheck=\"off\" type=\"text\" class=\"form-control\" #search (input)=\"loadPlaces()\"\n                    [formControl]=\"searchControl\" [(ngModel)]=\"building.address\" name=\"address\">\n                </div>\n              </div>\n            </div>\n            <label class=\"label-optional\">Developer Details (optional)</label>\n            <div class=\"row\">\n              <div class=\"col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                  <label>Name of Developer</label>\n                  <input class=\"form-control\" type=\"text\" name=\"dev_name\" [(ngModel)]=\"building.dev_name\">\n                </div>\n              </div>\n              <div class=\"col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                  <label>Contact Number</label>\n                  <input minlength=\"6\" maxlength=\"16\" autocomplete=\"off\" type=\"text\" class=\"form-control\" id=\"dev_phone\" required [(ngModel)]=\"building.dev_phone\" name=\"dev_phone\"\n                      ng2TelInput [ng2TelInputOptions]=\"initialCountry\" (countryChange)=\"onCountryChange($event)\" />\n                </div>\n              </div>\n            </div>\n            <div class=\"row\">\n              <div class=\"col-sm-12 col-12\">\n                <div class=\"form-group-3\">\n                  <label>Email Address</label>\n                  <input class=\"form-control\" type=\"text\" name=\"dev_email\" [(ngModel)]=\"building.dev_email\">\n                </div>\n              </div>\n            </div>\n          </div>\n          <div class=\"col-lg-5 col-md-12 col-sm-12 col-12\">\n            <div class=\"form-group-3 mark-pin-map\">\n              <label>Mark Pin on Map</label>\n              <!-- <input placeholder=\"search for location\" autocorrect=\"off\" autocapitalize=\"off\" \n              spellcheck=\"off\" type=\"text\" class=\"form-control\" #search (input)=\"loadPlaces()\"\n              [formControl]=\"searchControl\"> -->\n            </div>\n            <div>\n              <!-- <div id=\"mapDiv\" style=\"height: 250px; width: 100%;\" #mapDiv></div> -->\n              <agm-map [latitude]=\"latitude\" [longitude]=\"longitude\" [scrollwheel]=\"false\" (mapClick)=\"placeMarker($event)\"[zoom]=\"zoom\">\n                <agm-marker [latitude]=\"latitude\" [longitude]=\"longitude\"></agm-marker>\n              </agm-map>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"row\" *ngIf=\"showBuilding\">\n          <div class=\"col-md-12\">\n            <div class=\"btn-cont text-right\">\n              <a class=\"btn-third btn\" href=\"javascript://\" (click)=\"buildingRequest()\">Next</a>\n            </div>\n          </div>\n        </div>\n        \n      </div>\n    </div>\n  \n  </form>\n\n<!-- Add More img -->\n<div class=\"modal add-more-popup\" id=\"add-more-img\">\n    <div class=\"modal-dialog modal-lg\">\n      <div class=\"modal-content\">\n  \n        <!-- Modal Header -->\n        <div class=\"modal-header\">\n          <h4 class=\"modal-title\">Images</h4>\n          <button type=\"button\" style=\"display: none;\" class=\"close\" data-dismiss=\"modal\" #modalClose>&times;</button>\n          <button type=\"button\" class=\"close\" (click)=\"closeModal()\">&times;</button>\n        </div>\n  \n        <!-- Modal body -->\n        <div class=\"modal-body\">\n          <div class=\"uploaded-img-block\">\n            <div class=\"uploaded-img\" *ngFor=\"let imageUrl of url2; let iu=index\">\n                  <a class=\"remove\" (click)=\"removeImage(iu)\">\n                    <img src=\"assets/img/remove-icon.png\" alt=\"img\">\n                  </a>\n                  <img *ngIf=\"imageUrl\" class=\"u-img\" [src]=\"imageUrl\" alt=\"img\">\n                  <img *ngIf=\"!imageUrl\" class=\"u-img\" src=\"http://via.placeholder.com/300x300\" alt=\"img\">\n            </div>\n          </div> \n          <div class=\"add-more-images\">\n              <input type=\"file\" name=\"\" multiple max=\"6\" accept=\"image/*\" (change)=\"onSelectFile2($event)\">\n              <span>+ Add more images</span>\n          </div>\n        </div>\n  \n        <!-- Modal footer -->\n        <div class=\"modal-footer btn-cont\">\n          <button type=\"button\" class=\"btn btn-primary\" (click)=\"saveImages()\" data-dismiss=\"modal\">Submit</button>\n        </div>\n  \n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/layout/properties/add-property/add-property.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_addProperty_model__ = __webpack_require__("../../../../../src/app/models/addProperty.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__agm_core__ = __webpack_require__("../../../../@agm/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddPropertyComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var AddPropertyComponent = /** @class */ (function () {
    function AddPropertyComponent(model, admin, router, sanitization, mapsAPILoader, ngZone, building, constant) {
        this.model = model;
        this.admin = admin;
        this.router = router;
        this.sanitization = sanitization;
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.building = building;
        this.constant = constant;
        this.parameter = {};
        this.url2 = [];
        this.showBuilding = false;
        this.amenityList = [];
        this.amen = '';
        this.bankList = [];
        this.bank = '';
        this.testMarital = [];
        this.imageEvent = [];
        this.showText = false;
        this.buildingName = '';
    }
    AddPropertyComponent.prototype.ngOnInit = function () {
        this.parameter.buildingCount = 0;
        this.testMarital = [
            { id: 1,
                name: 'Married',
                checked: '' },
            { id: 2,
                name: 'Unmarried',
                checked: '' },
            { id: 3,
                name: 'Divorced',
                checked: '' }
        ];
        this.model.marital_status = [1];
        this.initialCountry = { initialCountry: this.constant.initialCountry };
        this.tab = 1;
        this.getCountries('');
        this.getConfigurations();
        this.getPropertyTypes();
        this.getAmenities();
        this.getBanks();
        // set google maps defaults
        this.zoom = 4;
        // this.latitude = 39.8282;
        // this.longitude = -98.5795;
        // create search FormControl
        this.searchControl = new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["e" /* FormControl */]();
        // set current position
        this.setCurrentPosition();
    };
    AddPropertyComponent.prototype.setTab = function (tab) {
        this.tab = tab;
    };
    AddPropertyComponent.prototype.onCountryChange = function (e) {
        console.log('eeee', e);
        this.building.dev_countrycode = e.dialCode;
        this.initialCountry = { initialCountry: e.iso2 };
    };
    AddPropertyComponent.prototype.getCountries = function (keyword) {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'getCountries';
        var input = new FormData();
        if (keyword) {
            input.append('keyword', keyword);
        }
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('countries', success);
            _this.parameter.loading = false;
            _this.parameter.countries = success.data;
        }, function (error) {
            _this.parameter.loading = false;
            if (error.statusCode === 401) {
                swal('Error', error.message, 'error');
                // this.swal.warning({
                //   title: 'Error',
                //   text: error.message,
                // });
                _this.router.navigate(['']);
            }
            else {
                swal('Error', error.message, 'error');
            }
        });
    };
    AddPropertyComponent.prototype.getStates = function (country_id, keyword) {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'country/getStates';
        this.model.country_id = country_id;
        this.model.state_id = '';
        this.model.city_id = '';
        this.model.locality_id = '';
        var input = new FormData();
        input.append('country_id', country_id);
        if (keyword) {
            input.append('keyword', keyword);
        }
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('states', success);
            _this.parameter.loading = false;
            _this.parameter.states = success.data;
        }, function (error) {
            console.log(error);
            _this.parameter.loading = false;
            if (error.statusCode === 401) {
                _this.router.navigate(['']);
            }
            else {
                swal('Error', error.message, 'error');
            }
        });
    };
    AddPropertyComponent.prototype.getCities = function (state_id, keyword) {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'getCities';
        this.model.state_id = state_id;
        this.model.city_id = '';
        this.model.locality_id = '';
        var input = new FormData();
        input.append('state_id', state_id);
        if (keyword) {
            input.append('keyword', keyword);
        }
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('cities', success);
            _this.parameter.loading = false;
            _this.parameter.cities = success.data;
        }, function (error) {
            console.log(error);
            _this.parameter.loading = false;
            if (error.statusCode === 401) {
                _this.router.navigate(['']);
            }
            else {
                swal('Error', error.message, 'error');
            }
        });
    };
    AddPropertyComponent.prototype.getLocalities = function (city_id, keyword) {
        var _this = this;
        if (keyword === void 0) { keyword = ''; }
        this.parameter.loading = true;
        this.parameter.url = 'getLocalities';
        this.model.city_id = city_id;
        this.model.locality_id = '';
        var input = new FormData();
        input.append('city_id', city_id);
        if (keyword) {
            input.append('keyword', keyword);
        }
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('Localities', success);
            _this.parameter.loading = false;
            _this.parameter.localities = success.data;
        }, function (error) {
            console.log(error);
            _this.parameter.loading = false;
            if (error.statusCode === 401) {
                _this.router.navigate(['']);
            }
            else {
                swal('Error', error.message, 'error');
            }
        });
    };
    AddPropertyComponent.prototype.setLocality = function (locality_id) {
        this.model.locality_id = locality_id;
    };
    AddPropertyComponent.prototype.setConfiguration = function (id) {
        this.model.configuration_id = id;
    };
    AddPropertyComponent.prototype.setPropertyType = function (id) {
        this.model.property_type_id = id;
    };
    AddPropertyComponent.prototype.setAmenity = function (id) {
        this.model.amenities = [id];
    };
    AddPropertyComponent.prototype.getConfigurations = function () {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'getConfigurations';
        var input = new FormData();
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('getConfigurations', success);
            _this.parameter.loading = false;
            _this.parameter.items = success.data;
            _this.parameter.total = success.data.length;
        }, function (error) {
            console.log(error);
            _this.parameter.loading = false;
            if (error.statusCode === 401) {
                _this.router.navigate(['']);
            }
            else {
                swal('Error', error.message, 'error');
            }
        });
    };
    AddPropertyComponent.prototype.getPropertyTypes = function () {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'getPropertyTypes';
        var input = new FormData();
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('getPropertyTypes', success);
            _this.parameter.loading = false;
            _this.parameter.propertyTypes = success.data;
            _this.parameter.propertyTypesCount = success.data.length;
        }, function (error) {
            console.log(error);
            _this.parameter.loading = false;
            if (error.statusCode === 401) {
                _this.router.navigate(['']);
            }
            else {
                swal('Error', error.message, 'error');
            }
        });
    };
    AddPropertyComponent.prototype.getAmenities = function () {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'getPropertyAmenities';
        var input = new FormData();
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('getPropertyAmenities', success);
            _this.parameter.loading = false;
            _this.parameter.amenities = success.data;
            _this.parameter.amenitiesCount = success.data.length;
        }, function (error) {
            console.log(error);
            _this.parameter.loading = false;
            if (error.statusCode === 401) {
                _this.router.navigate(['']);
            }
            else {
                swal('Error', error.message, 'error');
            }
        });
    };
    AddPropertyComponent.prototype.addAmenity = function (a) {
        var tt = this.getSelectedAmenityByName(a);
        if (tt) {
            this.amenityList.push(tt);
            this.model.amenities.push(tt.id);
        }
        this.amen = '';
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
    AddPropertyComponent.prototype.removeAmenity = function (index) {
        this.model.amenities.splice(index, 1);
        this.amenityList.splice(index, 1);
    };
    AddPropertyComponent.prototype.getBanks = function () {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'getBanks';
        var input = new FormData();
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('getBanks', success);
            _this.parameter.loading = false;
            _this.parameter.banks = success.data;
            _this.parameter.bankCount = success.data.length;
        }, function (error) {
            console.log(error);
            _this.parameter.loading = false;
            if (error.statusCode === 401) {
                _this.router.navigate(['']);
            }
            else {
                swal('Error', error.message, 'error');
            }
        });
    };
    AddPropertyComponent.prototype.addBank = function (a) {
        var tt = this.getSelectedBankByName(a);
        if (tt) {
            this.bankList.push(tt);
            this.model.banks.push(tt.id);
        }
        this.bank = '';
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
    AddPropertyComponent.prototype.removeBank = function (index) {
        this.model.banks.splice(index, 1);
        this.bankList.splice(index, 1);
    };
    AddPropertyComponent.prototype.searchBuilding = function (keyword) {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'searchBuilding';
        var input = new FormData();
        input.append('keyword', keyword);
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('searchBuilding', success);
            _this.parameter.loading = false;
            _this.parameter.buildings = success.data;
            _this.parameter.buildingCount = success.data.length;
            if (_this.parameter.buildingCount === 0) {
                _this.showText = true;
            }
        }, function (error) {
            console.log(error);
            _this.parameter.loading = false;
            if (error.statusCode === 401) {
                _this.router.navigate(['']);
            }
            else {
                swal('Error', error.message, 'error');
            }
        });
    };
    AddPropertyComponent.prototype.showBuildingDetails = function (showBuilding) {
        this.showBuilding = showBuilding;
        this.buildingName = '';
        this.loadPlaces();
    };
    AddPropertyComponent.prototype.onSelectFile1 = function (event) {
        var _this = this;
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                _this.url = e.target.result;
                _this.image1 = _this.sanitization.bypassSecurityTrustStyle("url(" + _this.url + ")");
                console.log('this.url, this.image1', _this.url, _this.image1);
            };
            var input = new FormData();
            input.append('image', event.target.files[0]);
            this.admin.postDataApi('saveImage', input)
                .subscribe(function (success) {
                console.log('successimage', success);
                _this.model.cover_image = success.data.image;
                _this.parameter.loading = false;
            }, function (error) {
                console.log(error);
                _this.parameter.loading = false;
                swal('Error', error.message, 'error');
            });
            // this.model.cover_image = event.target.files[0];
            reader.readAsDataURL(event.target.files[0]);
        }
    };
    AddPropertyComponent.prototype.onSelectFile2 = function (event) {
        var _this = this;
        if (event.target.files && event.target.files[0]) {
            console.log('url2', this.url2);
            if (this.url2.length === 6 || event.target.files.length > 6) {
                swal('Limit exceeded', 'You can upload maximum of 6 images', 'error');
            }
            else {
                var _loop_1 = function (index) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        _this.imageEvent.push(event.target.files[index]);
                        _this.url2.push(e.target.result);
                        var tempurl = e.target.result;
                        _this.image2 = _this.sanitization.bypassSecurityTrustStyle("url(" + tempurl + ")");
                    };
                    reader.readAsDataURL(event.target.files[index]);
                };
                for (var index = 0; index < event.target.files.length; index++) {
                    _loop_1(index);
                }
            }
        }
    };
    AddPropertyComponent.prototype.closeModal = function () {
        this.modalClose.nativeElement.click();
        this.image2 = '';
        this.url2 = [];
        this.imageEvent = [];
        this.model.images = [];
    };
    AddPropertyComponent.prototype.removeImage = function (index) {
        this.url2.splice(index, 1);
        this.imageEvent.splice(index, 1);
        this.model.images.splice(index, 1);
        console.log('----------', this.url2, this.imageEvent);
    };
    AddPropertyComponent.prototype.saveImages = function () {
        var _this = this;
        console.log('----------', this.url2, this.imageEvent);
        var input = new FormData();
        var _loop_2 = function (index) {
            input.append('image', this_1.imageEvent[index]);
            this_1.admin.postDataApi('saveImage', input)
                .subscribe(function (success) {
                console.log('successimage' + index, success);
                _this.model.images.push(success.data.image);
                _this.parameter.loading = false;
            }, function (error) {
                console.log(error);
                _this.parameter.loading = false;
                swal('Error', error.message, 'error');
            });
        };
        var this_1 = this;
        for (var index = 0; index < this.imageEvent.length; index++) {
            _loop_2(index);
        }
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
            this.admin.postDataApi('saveImage', input)
                .subscribe(function (success) {
                console.log('successimage', success);
                _this.model.floor_plan = success.data.image;
                _this.parameter.loading = false;
            }, function (error) {
                console.log(error);
                _this.parameter.loading = false;
                swal('Error', error.message, 'error');
            });
            // this.model.images = event.target.files;
            reader.readAsDataURL(event.target.files[0]);
        }
    };
    AddPropertyComponent.prototype.addMaritalStatus = function (id, i) {
        this.testMarital[i].checked = this.testMarital[i].checked === '' ? 'checked' : '';
    };
    AddPropertyComponent.prototype.addProperty = function (formdata, tab) {
        var _this = this;
        console.log('formdata', formdata);
        console.log('api', this.model);
        this.tab = tab;
        for (var index = 0; index < this.testMarital.length; index++) {
            if (this.testMarital[index].checked === 'checked') {
                var r = this.model.marital_status.indexOf(this.testMarital[index]);
                if (r === -1) {
                    this.model.marital_status.push(this.testMarital[index].id);
                }
            }
        }
        this.parameter.loading = true;
        this.parameter.url = this.model.id !== '' ? 'addProperty' : 'addProperty';
        this.model.step = tab - 1;
        var input = new FormData();
        // this.parameter.property_id = '44';
        if (this.parameter.property_id) {
            input.append('property_id', this.parameter.property_id);
        }
        input.append('step', this.model.step.toString());
        if (this.model.step === 1) {
            input.append('for_rent', this.model.for_rent === true ? '1' : '0');
            input.append('for_sale', this.model.for_sale === true ? '1' : '0');
            input.append('country_id', this.model.country_id);
            input.append('state_id', this.model.state_id);
            input.append('city_id', this.model.city_id);
            input.append('locality_id', this.model.locality_id);
            input.append('configuration_id', this.model.configuration_id);
            input.append('carpet_areas', JSON.stringify(this.model.carpet_areas));
            input.append('property_type_id', this.model.property_type_id);
        }
        if (this.model.step === 2) {
            input.append('cover_image', this.model.cover_image);
            input.append('images', JSON.stringify(this.model.images));
            input.append('floor_plan', this.model.floor_plan);
            input.append('bedroom', this.model.bedroom);
            input.append('bathroom', this.model.bathroom);
            input.append('floor', this.model.floor);
            input.append('parking', this.model.parking);
            input.append('furnished', this.model.furnished);
            input.append('description', this.model.description);
            input.append('quantity', this.model.quantity);
            input.append('amenities', JSON.stringify(this.model.amenities));
            input.append('banks', JSON.stringify(this.model.banks));
        }
        if (this.model.step === 3) {
            input.append('pets', this.model.pets);
            input.append('marital_status', JSON.stringify(this.model.marital_status));
        }
        if (this.model.step === 4) {
            input.append('custom_attributes', JSON.stringify(this.model.custom_attributes));
        }
        this.parameter.loading = false;
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('success', success);
            _this.parameter.property_id = success.data.id;
            _this.parameter.loading = false;
        }, function (error) {
            _this.parameter.loading = false;
            swal('Error', error.message, 'error');
        });
    };
    AddPropertyComponent.prototype.setBuildingId = function (building_id) {
        this.parameter.building_id = building_id;
    };
    AddPropertyComponent.prototype.tagBuilding = function () {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'tagBuilding';
        var input = new FormData();
        if (this.parameter.property_id) {
            input.append('property_id', this.parameter.property_id);
        }
        input.append('building_id', this.parameter.building_id);
        this.admin.postDataApi(this.parameter.url, input)
            .subscribe(function (success) {
            console.log('tagBuilding', success);
            _this.parameter.loading = false;
            swal('Property submitted successfully.', 'You will be notified once your property will be reviewed by them, you can view status in your properties.', 'success');
            _this.router.navigate(['/dashboard/properties/view-properties']);
        }, function (error) {
            _this.parameter.loading = false;
            swal('Error', error.message, 'error');
        });
    };
    AddPropertyComponent.prototype.loadPlaces = function () {
        var _this = this;
        console.log('--', this.searchElementRef.nativeElement);
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
        console.log($event.coords.lat);
        console.log($event);
    };
    AddPropertyComponent.prototype.getGeoLocation = function (lat, lng) {
        var _this = this;
        if (navigator.geolocation) {
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
            });
        }
    };
    AddPropertyComponent.prototype.buildingRequest = function () {
        var _this = this;
        this.parameter.loading = true;
        this.parameter.url = 'buildingRequest';
        this.building.lat = this.latitude;
        this.building.lng = this.longitude;
        // const input = new FormData();
        // input.append('name', this.building.name);
        // input.append('address', this.building.address);
        // input.append('lat', this.building.lat.toString());
        // input.append('lng', this.building.lng.toString());
        // if (this.building.dev_name) {input.append('dev_name', this.building.dev_name); }
        // if (this.building.dev_phone) {input.append('dev_name', this.building.dev_phone); }
        // if (this.building.dev_countrycode) {input.append('dev_name', this.building.dev_countrycode); }
        // if (this.building.dev_email) {input.append('dev_name', this.building.dev_email); }
        this.admin.postDataApi(this.parameter.url, this.building)
            .subscribe(function (success) {
            console.log('buildingRequest', success);
            _this.parameter.loading = false;
            // Your Property is submitted to our Team.
            swal('Property submitted successfully.', 'You will be notified once your property will be reviewed by them, you can view status in your properties.', 'success');
            _this.router.navigate(['/dashboard/properties/view-properties']);
        }, function (error) {
            _this.parameter.loading = false;
            swal('Error', error.message, 'error');
        });
    };
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('modalClose'),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _a : Object)
    ], AddPropertyComponent.prototype, "modalClose", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('mapDiv'),
        __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _b : Object)
    ], AddPropertyComponent.prototype, "mapDiv", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('search'),
        __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _c : Object)
    ], AddPropertyComponent.prototype, "searchElementRef", void 0);
    AddPropertyComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-add-property',
            template: __webpack_require__("../../../../../src/app/layout/properties/add-property/add-property.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/properties/add-property/add-property.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_4__models_addProperty_model__["a" /* AddPropertyModel */], __WEBPACK_IMPORTED_MODULE_4__models_addProperty_model__["b" /* Building */], __WEBPACK_IMPORTED_MODULE_7__common_constants__["a" /* Constant */]]
        }),
        __metadata("design:paramtypes", [typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__models_addProperty_model__["a" /* AddPropertyModel */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__models_addProperty_model__["a" /* AddPropertyModel */]) === "function" ? _d : Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" ? _e : Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" ? _f : Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["c" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["c" /* DomSanitizer */]) === "function" ? _g : Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_6__agm_core__["b" /* MapsAPILoader */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__agm_core__["b" /* MapsAPILoader */]) === "function" ? _h : Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]) === "function" ? _j : Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_4__models_addProperty_model__["b" /* Building */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__models_addProperty_model__["b" /* Building */]) === "function" ? _k : Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_7__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__common_constants__["a" /* Constant */]) === "function" ? _l : Object])
    ], AddPropertyComponent);
    return AddPropertyComponent;
}());

//# sourceMappingURL=add-property.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/properties/properties.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/properties/properties.component.html":
/***/ (function(module, exports) {

module.exports = "\n               <div class=\"container-fluid\">\n                  <div class=\"row\">\n                     <div class=\"col-md-6\">\n                     <div class=\"form-group\">\n                  <label>Manage Properties</label>\n                  <div class=\"d-flex\">\n                  <button class=\"all-btn\">All</button>\n                  <input style=\"max-width:200px\" class=\"form-control\" type=\"text\" name=\"\">\n                  </div>\n                  </div>\n                   </div>\n                   <div class=\"col-md-2\">\n                  <div class=\"form-group\">\n                  <label>Country</label>\n                   <select class=\"form-control\">\n                      <option>All</option>\n                      <option>All</option>\n                      <option>All</option>\n                   </select>\n                  </div>\n                  </div>\n                  <div class=\"col-md-2\">\n                  <div class=\"form-group\">\n                  <label>City</label>\n                   <select class=\"form-control\">\n                      <option>All</option>\n                      <option>All</option>\n                      <option>All</option>\n                   </select>\n                  </div>\n                  </div>\n   \n                  <div class=\"col-md-2\">\n                  <div class=\"form-group\">\n                  <label>Neighbourhood</label>\n                   <select class=\"form-control\">\n                      <option>All</option>\n                      <option>All</option>\n                      <option>All</option>\n                   </select>\n                  </div>\n                  </div>\n                  </div>\n   \n                  <div class=\"row\">\n                        <div class=\"col-md-12\">\n                           <div class=\"cust-tabs-2\">\n                              <ul class=\"nav nav-tabs float-left\">\n                                 <li class=\"nav-item\">\n                                    <a class=\"nav-link\" data-toggle=\"tab\" href=\"#tw\">This Week</a>\n                                 </li>\n                                 <li class=\"nav-item\">\n                                    <a class=\"nav-link\" data-toggle=\"tab\" href=\"#tm\">This Month</a>\n                                 </li>\n                                 <li class=\"nav-item\">\n                                    <a class=\"nav-link active\" data-toggle=\"tab\" href=\"#lm\">Last Month</a>\n                                 </li>\n                                 <li class=\"nav-item\">\n                                    <a class=\"nav-link\" data-toggle=\"tab\" href=\"#lt\">Lifetime</a>\n                                 </li>\n                                 <li class=\"nav-item\">\n                                    <a class=\"nav-link\" data-toggle=\"tab\" href=\"#cust\">Custom</a>\n                                 </li>\n                              </ul>\n                           </div>\n                        </div>\n                        <div class=\"col-12\">\n                           <hr style=\"margin-top:0;\">\n                        </div>\n                     </div>\n                \n                     <div class=\"row\">\n                        <div class=\"col-lg-4 col-md-12 col-sm-12 col-12\">\n                           <div class=\"info-box-2\">\n                              <div class=\"one-row\">\n                                 <div class=\"o-block\">\n                                    <h5>Properties</h5>\n                                    <small>Requests Pending</small>\n                                 </div>\n                                 <div class=\"o-block\">\n                                    <a class=\"view-all\" href=\"javascript://\">View All</a>\n                                    <h4>15</h4>\n                                 </div>\n                              </div>\n                                <div class=\"one-row\">\n                                 <div class=\"o-block\">\n                                    <h5>Buildings</h5>\n                                    <small>Total Available</small>\n                                 </div>\n                                 <div class=\"o-block\">\n                                    <span class=\"view-all\">&nbsp;</span>\n                                    <h4>15</h4>\n                                 </div>\n                              </div>\n                             \n                           </div>\n                        </div>\n                       <div class=\"col-lg-4 col-md-12 col-sm-12 col-12\">\n                           <div class=\"four-block\">\n                              <div class=\"d-flex\">\n                                 <div class=\"f-block approved\">\n                                    <h5>Approved</h5>\n                                    <h3>25</h3>\n                                 </div>\n                                 <div class=\"f-block unapproved\">\n                                    <h5>Unapproved</h5>\n                                    <h3>02</h3>\n                                 </div>\n                              </div>\n                              <div class=\"d-flex\">\n                                 <div class=\"f-block pending active\">\n                                    <h5>Pending</h5>\n                                    <h3>01</h3>\n                                 </div>\n                                 <div class=\"f-block unapproved\">\n                                    <h5>In Draft</h5>\n                                    <h3>02</h3>\n                                 </div>\n                              </div>\n                           </div>\n                        </div>\n                        <div class=\"col-lg-4 col-md-12 col-sm-12 col-12\">\n                           <div class=\"chat-msg\">\n                              <div class=\"row\">\n                                 <div class=\"col-6\">\n                                    <h5>Chat</h5>\n                                 </div>\n                                 <div class=\"col-6 text-right\"><a class=\"msg\" href=\"javascript://\">Message</a></div>\n                              </div>\n                              <p>Waiting for response</p>\n                              <p>\n                                 <strong>Mario Hudson</strong>\n                                 When you are free to have a meeting \n                                 with interested customers?\n                              </p>\n                              <p>\n                                 <strong>Rosie Benson</strong>\n                                 Is there any availability in the localities\n                                 I was asking you tomorrow and also p…\n                              </p>\n                           </div>\n                        </div>\n                     </div>\n                     <div class=\"spacer50\"></div>\n                      <div class=\"cust-tabs\">\n                      <div class=\"row flex-wrap-reverse\">\n                         \n                      <div class=\"col-xl-10 col-lg-12 col-md-12 col-sm-12 col-12\">\n                        <ul class=\"nav nav-tabs\">\n                           <li class=\"nav-item\">\n                              <a class=\"nav-link active\" data-toggle=\"tab\" href=\"#approved\">Approved</a>\n                           </li>\n                           <li class=\"nav-item\">\n                              <a class=\"nav-link\" data-toggle=\"tab\" href=\"#unapproved\">Unapproved</a>\n                           </li>\n                            <li class=\"nav-item\">\n                              <a class=\"nav-link\" data-toggle=\"tab\" href=\"#pending-review\">Pending Review</a>\n                           </li>\n                            <li class=\"nav-item\">\n                              <a class=\"nav-link\" data-toggle=\"tab\" href=\"#in-draft\">In Draft</a>\n                           </li>\n                        </ul>\n                        </div>\n\n                        <div class=\"col-xl-2 col-lg-12 col-md-12 col-sm-12 col-12\"><div class=\"add-new text-left\">\n                              <a class=\"btn\" href=\"javascript://\" routerLink=\"/dashboard/properties/add-property\">+Add New Property</a>\n                           </div></div>\n                           </div>\n                        <div class=\"tab-content\">\n                           <div class=\"tab-pane active\">\n                              <div class=\"tabel-section\">\n                                 <div class=\"table-responsive\">\n                                    <table class=\"table table-striped table-align-left\">\n                                       <tr>\n                                          <th>\n                                             <div class=\"table-search\">\n                                                <label>Name of Building</label>\n                                                <input type=\"Search here\" name=\"\">\n                                             </div>\n                                          </th>\n                                          <th>\n                                             <div class=\"table-search\">\n                                                <label>Configuration</label>\n                                                <input type=\"Search here\" name=\"\">\n                                             </div>\n                                          </th>\n                                          <th style=\"vertical-align:top;\">\n                                             <div class=\"d-flex\"><span>Price</span><a href=\"javascript://\"><img src=\"./../../../assets/img/top-arrow.png\" alt=\"img\"></a></div>\n                                          </th>\n                                         <th style=\"vertical-align:top;\">\n                                             <div class=\"d-flex\"><span>Availability</span>\n                                             <a href=\"javascript://\"><img src=\"./../../../assets/img/top-arrow.png\" alt=\"img\"></a>\n                                             </div>\n                                          </th>\n                                          <th style=\"vertical-align:top;\">\n                                             <div class=\"-d-flex\"><span>Leads</span><a href=\"javascript://\"><img src=\"./../../../assets/img/top-arrow.png\" alt=\"img\"></a></div>\n                                          </th>\n                                          <th>&nbsp;</th>\n                                       </tr>\n                                 \n                                       <tr>\n                                           <td>\n                                             <strong>Home Land Towers</strong>\n                                             <div class=\"clearfix\"></div>\n                                             <small>3 Properties</small>                                     \n   \n                                           </td>\n                                           <td>4 BHK</td>\n                                           <td>570 Balistreri Mews Apt. 293</td>\n                                           <td><span class=\"green-color\">3</span></td>\n                                           <td>14</td>\n                                           <td>\n                                             <div class=\"message\">\n                                             <span></span>\n                                             <i class=\"fa fa-envelope\" aria-hidden=\"true\"></i>\n   \n                                             </div>\n   \n                                           </td>\n                                       </tr>\n                                        <tr>\n                                           <td>\n                                             &nbsp; \n                                              </td>\n                                           <td>4 BHK</td>\n                                           <td>$56.6k</td>\n                                          <td><span class=\"green-color\">1</span></td>\n                                           <td>14</td>\n                                           <td>\n                                             <div class=\"message\">\n                                             <span></span>\n                                             <i class=\"fa fa-envelope\" aria-hidden=\"true\"></i>\n   \n                                             </div>\n                                       </tr>\n                                        <tr>\n                                           <td>\n                                             &nbsp; \n                                              </td>\n                                           <td>4 BHK</td>\n                                           <td>570 Balistreri Mews Apt. 293</td>\n                                           <td><span class=\"red-color\">0</span></td>\n                                           <td>14</td>\n                                          <td>\n                                             <div class=\"message\">\n                                           \n                                             <i class=\"fa fa-envelope\" aria-hidden=\"true\"></i>\n   \n                                             </div>\n                                       </tr>\n                                        <tr>\n                                           <td>\n                                             <strong>Home Land Towers</strong>\n                                             <div class=\"clearfix\"></div>\n                                             <small>3 Properties</small>                                     \n   \n                                           </td>\n                                           <td>Sell Only</td>\n                                           <td>$56.6k</td>\n                                              <td><span class=\"green-color\">2</span></td>\n   \n                                           <td>14</td>\n                                        <td>\n                                             <div class=\"message\">\n                                              \n                                             <i class=\"fa fa-envelope\" aria-hidden=\"true\"></i>\n   \n                                             </div>\n                                       </tr>\n                                        <tr>\n                                           <td>\n                                             &nbsp; \n                                              </td>\n                                           <td>4 BHK</td>\n                                           <td>570 Balistreri Mews Apt. 293</td>\n                                              <td><span class=\"green-color\">2</span></td>\n   \n                                           <td>14</td>\n                                           <td>\n                                             <div class=\"message\">\n                                             <span></span>\n                                             <i class=\"fa fa-envelope\" aria-hidden=\"true\"></i>\n   \n                                             </div>\n                                       </tr>\n                                        <tr>\n                                           <td>\n                                             &nbsp; \n                                              </td>\n                                           <td>4 BHK</td>\n                                           <td>570 Balistreri Mews Apt. 293</td>\n                                              <td><span class=\"green-color\">1</span></td>\n   \n                                           <td>14</td>\n                                          <td>\n                                             <div class=\"message\">\n                                             \n                                             <i class=\"fa fa-envelope\" aria-hidden=\"true\"></i>\n   \n                                             </div>\n                                       </tr>\n                                    </table>\n                                 </div>\n                              </div>\n                              <div class=\"btn-cont text-right marginT15\">\n                                 <button class=\"btn btn-secondary\">View All</button>\n                              </div>\n                           </div>\n                           <div class=\"tab-pane container fade\" id=\"seller\">Seller tab on</div>\n                        </div>\n                     </div>\n                     \n                  </div>"

/***/ }),

/***/ "../../../../../src/app/layout/properties/properties.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PropertiesComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PropertiesComponent = /** @class */ (function () {
    function PropertiesComponent() {
    }
    PropertiesComponent.prototype.ngOnInit = function () {
    };
    PropertiesComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-properties',
            template: __webpack_require__("../../../../../src/app/layout/properties/properties.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/properties/properties.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], PropertiesComponent);
    return PropertiesComponent;
}());

//# sourceMappingURL=properties.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/properties/properties.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__properties_component__ = __webpack_require__("../../../../../src/app/layout/properties/properties.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__add_property_add_property_component__ = __webpack_require__("../../../../../src/app/layout/properties/add-property/add-property.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ngx_loading__ = __webpack_require__("../../../../ngx-loading/ngx-loading/ngx-loading.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__agm_core__ = __webpack_require__("../../../../@agm/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_tel_input__ = __webpack_require__("../../../../ng2-tel-input/ng2-tel-input.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_tel_input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_ng2_tel_input__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertiesModule", function() { return PropertiesModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var routes = [
    { path: 'add-property', component: __WEBPACK_IMPORTED_MODULE_4__add_property_add_property_component__["a" /* AddPropertyComponent */] },
    { path: 'view-properties', component: __WEBPACK_IMPORTED_MODULE_2__properties_component__["a" /* PropertiesComponent */] }
];
var PropertiesModule = /** @class */ (function () {
    function PropertiesModule() {
    }
    PropertiesModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* RouterModule */].forChild(routes),
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["h" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["b" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_6_ngx_loading__["a" /* LoadingModule */].forRoot({
                    animationType: __WEBPACK_IMPORTED_MODULE_6_ngx_loading__["b" /* ANIMATION_TYPES */].rectangleBounce,
                    primaryColour: '#00B96F'
                }),
                __WEBPACK_IMPORTED_MODULE_7__agm_core__["a" /* AgmCoreModule */].forRoot({
                    apiKey: 'AIzaSyCYv_zELZGVo2Ehzgp8eh8UeSIidhMCmH8',
                    libraries: ['drawing', 'places']
                }),
                __WEBPACK_IMPORTED_MODULE_8_ng2_tel_input__["Ng2TelInputModule"],
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__properties_component__["a" /* PropertiesComponent */],
                __WEBPACK_IMPORTED_MODULE_4__add_property_add_property_component__["a" /* AddPropertyComponent */]
            ]
        })
    ], PropertiesModule);
    return PropertiesModule;
}());

//# sourceMappingURL=properties.module.js.map

/***/ }),

/***/ "../../../../../src/app/models/addProperty.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export CarpetAreas */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddPropertyModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Building; });
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
        this.country_id = '';
        this.state_id = '';
        this.city_id = '';
        this.locality_id = '';
        this.configuration_id = '';
        this.carpet_areas = [
            {
                area: '',
                price: ''
            }
        ];
        this.property_type_id = '';
        this.property_id = '';
        this.images = [];
        this.bedroom = '1';
        this.bathroom = '1';
        this.floor = '1';
        this.parking = '0';
        this.furnished = '0';
        this.description = '';
        this.quantity = '1';
        this.amenities = [];
        this.banks = [];
        this.pets = '1';
        this.marital_status = [
            1
        ];
        this.custom_attributes = [
            {
                name: '',
                value: ''
            }
        ];
    }
    return AddPropertyModel;
}());

var Building = /** @class */ (function () {
    function Building() {
    }
    return Building;
}());

//# sourceMappingURL=addProperty.model.js.map

/***/ })

});
//# sourceMappingURL=2.chunk.js.map