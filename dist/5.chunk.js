webpackJsonp([5],{

/***/ "../../../../../src/app/layout/projects/add-project/add-project.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".upload-cover-img{\n  background-size:100%;\n  background-repeat: no-repeat;\n}\nagm-map{height:300px;}\n\n.loc-tags-group li{\n  padding:0px;\n  background-color:transparent;\n  margin-right:0px;\n  margin-bottom: 3px;\n}\n.loc-tags-group li span{\n  background-color:rgba(223,223,223,0.5);\n  padding: 8px 10px 8px 16px;\n  border-radius:3px;\n  margin-right:3px;\n  display: inline-block;\n}\n.loc-tags-group li span b{\n  -webkit-filter:opacity(50%);\n          filter:opacity(50%);\n  cursor: pointer;\n}\n.loc-tags-group li span b:hover{\n  -webkit-filter:opacity(100%);\n          filter:opacity(100%);\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/projects/add-project/add-project.component.html":
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n\n<div class=\"container-fluid\">\n  <div class=\"white-bg\">\n    <div class=\"page-title\">\n      <h3>Manage Project</h3>\n    </div>\n\n    <div class=\"padding40 paddingT0\">\n\n      <form #f=\"ngForm\" name=\"add-project-form\" ngNativeValidate>\n        <div class=\"row\">\n          <div class=\"col-md-5 col-sm-12 col-12\">\n            <div class=\"form-group-3\">\n              <label>Add Images <span class=\"color-red\">*</span></label>\n              <div class=\"upload-cover-img\">\n                <img [src]=\"file1.image\" onerror=\"this.src='assets/img/placeholder.png'\" class=\"img-fluid\">\n                <!-- <img *ngIf=\"url\" [src]=\"url\" height=\"200\"> -->\n                <div *ngIf=\"!file1.image\" class=\"upload-caption\">\n                  <p class=\"green-color marginT30\">+Upload Cover image for the project</p>\n                  <p>JPG or PNG. Image size should be 1920 × 1080 pixels (for HiDPI displays).</p>\n                </div>\n                <input type=\"file\" name=\"cover_image\" accept=\"image/*\" (change)=\"file1.onSelectFile($event,true)\">\n              </div>\n            </div>\n            <div class=\"add-project-img-more\">\n              <img [src]=\"model.images[0]?.image\" onerror=\"this.src='assets/img/placeholder.png'\" class=\"img-fluid\">\n              <div class=\"upload-caption\">\n                <p *ngIf=\"model?.images?.length > 1\" class=\"number\" (click)=\"modelOpenFun()\">+{{model?.images?.length-1}}</p>\n                <p *ngIf=\"model?.images?.length <= 1\" class=\"green-color\"  (click)=\"modelOpenFun()\">+ Add more images</p>\n              </div>\n            </div>\n           </div>\n          <div class=\"col-md-7 col-sm-12 col-12\">\n            <div class=\"row\">\n              <div class=\"col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                  <label>Name of the Building <span class=\"color-red\">*</span></label>\n                  <input class=\"form-control\" type=\"text\" [(ngModel)]=\"model.name\" name=\"name\" placeholder=\"Enter name of building\" autocomplete=\"off\" required>\n                </div>\n              </div>\n              <div class=\"col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                  <label>Location <span class=\"color-red\">*</span></label>\n                  <input placeholder=\"search for location\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"off\" type=\"text\" class=\"form-control\" #search (input)=\"loadPlaces()\" name=\"address\" [(ngModel)]=\"model.address\" autocomplete=\"off\" required>\n                </div>\n              </div>\n            </div>\n            <div class=\"form-group-3\">\n              <label>Location Pin on Map <span class=\"color-red\">*</span></label>\n              <div style=\"width: 100%;\">\n                <agm-map [latitude]=\"latitude\" [longitude]=\"longitude\" [scrollwheel]=\"false\" (mapClick)=\"placeMarker($event)\" [zoom]=\"zoom\">\n                  <agm-marker [latitude]=\"latitude\" [longitude]=\"longitude\"></agm-marker>\n                </agm-map>\n              </div>\n            </div>\n            <div class=\"row\">\n              <div class=\"col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                  <label>Building Age (in yrs) <span class=\"color-red\">*</span></label>\n                  <input placeholder=\"Building Age\" min=\"0\" class=\"form-control\" [(ngModel)]=\"model.building_age\" type=\"number\" name=\"building_age\" required />\n                </div>\n              </div>\n              <div class=\"col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                  <label>Building Type <span class=\"color-red\">*</span></label>\n                  <select [(ngModel)]=\"model.building_type_id\" class=\"form-control\" name=\"building_type_id\" required>\n                    <option value=\"\" disabled>Choose Building type</option>      \n                    <option *ngFor=\"let s of all_building_types\" [value]=\"s.id\">\n                            {{s.name}}\n                          </option>\n                       </select>\n                </div>\n              </div>\n              <div class=\"col-12\">\n                <div class=\"form-group-3\">\n                  <label>Description <span class=\"color-red\">*</span></label>\n                  <textarea [(ngModel)]=\"model.description\" name=\"model_description\" class=\"form-control\" placeholder=\"Enter project description\">\n                       </textarea>\n                </div>\n              </div>\n              <div class=\"col-md-6 col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                  <label>Possession Status <span class=\"color-red\">*</span></label>\n                  <select [(ngModel)]=\"model.possession_status_id\" class=\"form-control\" name=\"possession_status_id\">\n                    <option value=\"\">Select status</option>\n                    <option *ngFor=\"let s of all_possession_statuses\" [value]=\"s.id\">\n                      {{s.name}}\n                    </option>\n                  </select>\n                </div>\n              </div>\n              <div class=\"col-md-6 col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                  <label>Floors <span class=\"color-red\">*</span></label>\n                  <input min=\"0\" class=\"form-control\" [(ngModel)]=\"model.floors\" type=\"number\" name=\"building_floors\" placeholder=\"Floors\" required>\n                </div>\n                \n              </div>\n              <div class=\"col-md-6 col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                  <label>Average Price <span class=\"color-red\">*</span></label>\n                  <input min=\"0\" class=\"form-control\" [(ngModel)]=\"model.avg_price\" type=\"number\" name=\"building_avg_price\" placeholder=\"Average price\" required>\n                </div>\n              </div>\n              <div class=\"col-md-6 col-sm-6 col-12\">\n                  <div class=\"form-group-3\">\n                    <label>Launch Date <span class=\"color-red\">*</span></label>\n                    <input class=\"form-control\" [ngModel]=\"model.launch_date  | date:'yyyy-MM-dd'\" (ngModelChange)=\"model.launch_date  = $event\" type=\"date\" name=\"building_launch_date\" placeholder=\"Launch date\">\n                  </div>\n                </div>\n\n              <div class=\"col-sm-12 col-12\">\n                <div class=\"form-group-3\">\n                  <label>Enter Custom Parameter and Value</label>\n                  <div class=\"row\">\n                      <div class=\"col-sm-5\">\n                        <input [(ngModel)]=\"new_custom.name\" class=\"form-control\" name=\"custom_name\" type=\"text\" placeholder=\"Parameter name\"/>\n                      </div>\n                      <div class=\"col-sm-5\">\n                        <input [(ngModel)]=\"new_custom.value\" class=\"form-control\" name=\"custom_value\" type=\"text\" placeholder=\"Parameter value\" />\n                      </div>\n                      <div class=\"col-sm-2\">\n                        <a (click)=\"addNewCustom()\" class=\"btn-third btn btn-green\" href=\"javascript://\">Add</a>\n                      </div>\n                    </div>\n                    <div class=\"row\" *ngFor=\"let c of model.custom_attributes ;let i=index;\">\n                        <div class=\"col-sm-5\">\n                            <div class=\"paramtext\">{{c.name}}</div>                        </div>\n                        <div class=\"col-sm-5\">\n                            <div class=\"paramtext\">{{c.value}}</div>\n                        </div>\n                        <div class=\"col-sm-2\">\n                            <div class=\"paramtext\"><a (click)=\"model.custom_attributes.splice(i,1)\"><img src=\"assets/img/remove-icon.png\" /></a></div>\n                        </div>\n                      </div>\n\n                </div>\n              </div>\n              <div class=\"spacer30\"></div>\n\n              <div class=\"col-12\">\n                <div class=\"form-group-3 marginB0\">\n                  <label>Amenities available <span class=\"color-red\">*</span></label>\n                  <ul class=\"loc-tags-group\">\n                    <li *ngFor=\"let a of all_amenities\">\n                      <span *ngIf=\"a.selected==true\">{{a.name}} \n                        <b (click)=\"a.selected = false\" title=\"remove\"><img src=\"assets/img/close-tag.png\" /></b>\n                      </span>\n                    </li>\n                  </ul>\n                </div>\n              </div>\n              <div class=\"col-12\">\n                <div class=\"form-group-3 marginT15\">\n                  <div class=\"btn-cont\">\n                    <a class=\"btn-third btn btn-block\" data-toggle=\"modal\" data-target=\"#amenities\" href=\"javascript://\">Add More</a>\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-12\">\n                <div class=\"form-group-3\" style=\"width: 100%;\">\n                  <label class=\"float-left marginB0\">Configuration <span class=\"color-red\">*</span></label>\n                  <div class=\"clearfix\"></div>\n                  <hr>\n                  <div *ngFor=\"let c of model.configurations; let index=index\" class=\"configur\">\n                    <div class=\"float-right marginB0\">\n                           <a (click)=\"editConfiguration(c, index)\" title=\"Edit\"><img src=\"assets/img/edit.png\" /></a>\n                           <a (click)=\"deleteConfiguration(index);\" title=\"Delete\"><img src=\"assets/img/delete-green.png\" /></a>\n                    </div>\n                    <div class=\"row\">\n                      <div class=\"col-md-6 col-12\">\n                        <p class=\"p18\">{{c?.config?.name}}</p>\n                        <label>Images <span class=\"color-red\">*</span></label>\n                        <!-- <div class=\"image-group\">\n                          <div class=\"fig-block\">\n                            <img class=\"img-fluid\" [src]=\"c.floor_map_image\" onerror='this.src=\"http://via.placeholder.com/48x48\"' alt=\"img\">\n                          </div>\n                        </div> -->\n                        <div class=\"image-group\">\n                            <div class=\"fig-block\">\n                                <img class=\"img-fluid\" [src]=\"c.floor_map_image\" onerror='this.src=\"http://via.placeholder.com/48x48\"' alt=\"img\">\n                            </div>\n                            <div *ngFor=\"let im of c.images\"  class=\"fig-block\">\n                               <img [src]=\"im.image\" onerror=\"this.src='http://via.placeholder.com/48x48'\" alt=\"img\">\n                            </div>\n                         </div>\n                      </div>\n     \n                      <div class=\"col-md-6 col-12\">\n                        <p class=\"p14 text-right\">Average Price <span class=\"color-red\">*</span></p>\n                        <h3 class=\"text-right\">{{c?.base_price}} per sq/ft.</h3>\n                      </div>\n                      <div class=\"col-12\">\n                        <hr>\n                      </div>\n                    </div>\n                  </div>\n\n                  <div>\n                    <div class=\"form-group-3 marginT15\">\n                      <div class=\"btn-cont\">\n                        <a (click)=\"openConfigPopupFun()\" class=\"btn-third btn btn-block\" href=\"javascript://\">Add New</a>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"row\">\n              <div class=\"col-12\">\n                <div class=\"page-title paddingL0\">\n                  <h3>Developer Info <span class=\"color-red\">*</span></h3>\n                </div>\n              </div>\n\n              <div class=\"col-md-6 col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                  <label>Name</label>\n                  <input [(ngModel)]=\"model.developer.name\" class=\"form-control\" type=\"text\" name=\"developer_name\" placeholder=\"Developer Name\" required>\n                </div>\n              </div>\n              <div class=\"col-md-6 col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                  <label>Email</label>\n                  <input [(ngModel)]=\"model.developer.email\" class=\"form-control\" type=\"email\" name=\"developer_email\" placeholder=\"Developer Email\" required pattern=\"^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$\" />\n                </div>\n              </div>\n              <div class=\"col-md-6 col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                  <label>Phone Number</label>\n                  <input minlength=\"6\" maxlength=\"16\" autocomplete=\"off\" type=\"number\" class=\"form-control\" id=\"phone\" placeholder=\"Phone Number\" required minlength=\"1\" [(ngModel)]=\"model.developer.phone\" name=\"phone\" ng2TelInput [ng2TelInputOptions]=\"initialCountry\" (countryChange)=\"onCountryChange($event)\"/>\n\n                </div>\n              </div>\n\n              <div class=\"col-12\">\n                <div class=\"form-group-3\">\n                  <label>Logo</label>\n\n                  <div class=\"add-project-img-more\">\n                    <input type=\"file\" accept=\"image/*\" name=\"sasdsda\" (change)=\"file5.onSelectFile($event, true);\">\n                    <img class=\"img-fluid\" *ngIf=\"file5.image\" [src]=\"file5.image\">\n                    <div *ngIf=\"!file5.image\"  class=\"upload-caption\">\n                      <p class=\"green-color\">+ Add more images</p>\n                    </div>\n                  </div>\n\n                </div>\n              </div>\n\n              <div class=\"col-12\">\n\n                <div class=\"btn-cont text-right\">\n                  <hr>\n                  <button [disabled]=\"!f.valid\" (click)=\"addProject()\" class=\"btn-primary btn\">Submit</button>\n                  <!-- <button  (click)=\"addProject()\" class=\"btn-primary btn\">Submit</button> -->\n                </div>\n\n              </div>\n\n\n\n            </div>\n          </div>\n        </div>\n      </form>\n    </div>\n\n  </div>\n</div>\n\n<!-- Amanities model -->\n<div class=\"modal\" id=\"amenities\" style=\"display: none;\" aria-hidden=\"true\">\n  <div class=\"modal-dialog\">\n    <div class=\"modal-content amenities-popup\">\n      <div class=\"modal-header popup-header\">\n        <h4 class=\"modal-title\">Amenities</h4>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\">×</button>\n      </div>\n      <div class=\"modal-body\">\n        <label *ngFor=\"let a of all_amenities; \" (click)=\"a.selected = !a.selected\" class=\"cust-check-bx2\">\n             {{a.name}}\n           <span *ngIf=\"a.selected==true\" class=\"checkmark open\"></span>\n           </label>\n\n      </div>\n      <div class=\"modal-footer\">\n        <div class=\"btn-cont\">\n          <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\">Close</button>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n\n<!-- Add More img -->\n<span data-target=\"#add-more-img\" data-toggle=\"modal\" #modalOpen></span>\n<div class=\"modal add-more-popup\" id=\"add-more-img\">\n  <div class=\"modal-dialog modal-lg\">\n    <div class=\"modal-content\">\n\n      <!-- Modal Header -->\n      <div class=\"modal-header\">\n        <h4 class=\"modal-title\">Images</h4>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #modalClose>&times;</button>\n      </div>\n\n      <!-- Modal body -->\n      <div class=\"modal-body\">\n        <div class=\"uploaded-img-block\">\n          <div class=\"uploaded-img\" *ngFor=\"let item of file2.files; let i=index\">\n            <a class=\"remove\" (click)=\"file2.remove(i)\"><img src=\"assets/img/remove-icon.png\" alt=\"img\"></a>\n            <img *ngIf=\"item\" class=\"u-img\" [src]=\"item.image\" alt=\"img\">\n            <img *ngIf=\"!item\" class=\"u-img\" src=\"http://via.placeholder.com/300x300\" alt=\"img\">\n          </div>\n        </div>\n        <div class=\"add-more-images\">\n          <input type=\"file\" name=\"add-more\" multiple max=\"6\" accept=\"image/*\" (change)=\"file2Select($event)\">\n          <span>+ Add more images</span>\n        </div>\n      </div>\n\n      <!-- Modal footer -->\n      <div class=\"modal-footer btn-cont\">\n        <button type=\"button\" (click)=\"saveImages()\" class=\"btn btn-primary\">Submit</button>\n      </div>\n\n    </div>\n  </div>\n</div>\n\n\n<a #openConfigPopup class=\"btn-third btn btn-block\" data-target=\"#add-config\" data-toggle=\"modal\"></a>\n<div class=\"modal\" id=\"add-config\">\n  <div class=\"modal-dialog modal-lg\">\n    <div class=\"modal-content add-config-popup\">\n      <form #addConfig >\n      <div class=\"modal-header popup-header\">\n        <h4 class=\"modal-title\">Add Configuration</h4>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #closeConfigPopup>×</button>\n      </div>\n      <div *ngIf=\"new_config\" class=\"modal-body\">\n        <div class=\"row\">\n          <div class=\"col-sm-6 col-12\">\n            <div class=\"form-group-3\">\n              <label>Title</label>\n              <select class=\"form-control\" [(ngModel)]=\"new_config.configuration_id\" (change)=\"selectConfiguration($event.target.value,new_config)\" name=\"config_name\">\n                  <option *ngFor=\"let c of all_configurations\" value=\"{{c.id}}\" daa-model=\"c\">{{c.name}}</option>\n              </select>\n            </div>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"col-sm-6 col-12\">\n            <div class=\"form-group-3\">\n              <label>Carpet area (sqft) <span class=\"color-red\">*</span></label>\n              <input min=\"0\" class=\"form-control\" [(ngModel)]=\"new_config.carpet_area\" type=\"number\" name=\"base_price\" required>\n            </div>\n          </div>\n          <div class=\"col-sm-6 col-12\">\n            <div class=\"form-group-3\">\n              <label>Average Price <span class=\"color-red\">*</span></label>\n              <input min=\"0\" class=\"form-control\" [(ngModel)]=\"new_config.base_price\" type=\"number\" name=\"base_price\" required>\n            </div>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"col-12\">\n            <div class=\"form-group-3\">\n              <label>Floor Plan Image <span class=\"color-red\">*</span></label>\n              <div class=\"upload-cover-img\" style=\"max-width: 400px; margin: 0px auto;height: 250px;\">\n                  <img class=\"img-fluid\" [src]=\"file3.image\" onerror='this.src=\"assets/img/placeholder.png\"' />\n                  <div *ngIf=\"!file3.image\" class=\"upload-caption\">\n                      <p class=\"green-color marginT30\">+Upload Cover image for the project</p>\n                      <p>JPG or PNG. Imae size should be 1920 × 1080 pixels (for HiDPI displays).</p>\n                  </div>\n                  <input type=\"file\" accept=\"image/*\" name=\"floor_map_image\" (change)=\"file3.onSelectFile($event)\">\n              </div>\n              <div class=\"spacer30\"></div>\n              <label>Other Images <span class=\"color-red\">*</span></label>\n              <div class=\"spacer30\"></div>\n              <div class=\"uploaded-img-block\">\n                <div class=\"uploaded-img\" *ngFor=\"let item of file4.files; let i=index\">\n                  <a class=\"remove\" (click)=\"file4.remove(i)\">\n                    <img src=\"assets/img/remove-icon.png\" alt=\"img\">\n                  </a>\n                  <img *ngIf=\"item.image\" class=\"u-img\" [src]=\"item.image\" alt=\"img\">\n                  <img *ngIf=\"!item.image\" class=\"u-img\" src=\"http://via.placeholder.com/300x300\" alt=\"img\">\n                </div>\n              </div>\n              \n              <div class=\"add-project-img-more\">\n                <input type=\"file\" name=\"add-more-images\" multiple max=\"6\" accept=\"image/*\" (change)=\"file4Select($event)\">\n                <div class=\"upload-caption\">\n                  <p class=\"green-color\">+ Add more images</p>\n                </div>\n              </div>\n          \n            </div>\n          </div>\n        </div>\n        <div class=\"modal-footer\">\n          <div class=\"btn-cont\">\n            <button [disabled]=\"!new_config.configuration_id\n            || !new_config.carpet_area\n            || !new_config.base_price\n            || !file3.image\" (click)=\"addNewConfig()\" type=\"button\" class=\"btn btn-primary\">Save</button>\n          </div>\n        </div>\n      </div>\n      </form>\n\n    </div>\n  </div>\n\n"

/***/ }),

/***/ "../../../../../src/app/layout/projects/add-project/add-project.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_addProject_model__ = __webpack_require__("../../../../../src/app/models/addProject.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__agm_core__ = __webpack_require__("../../../../@agm/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__common_fileUpload__ = __webpack_require__("../../../../../src/app/common/fileUpload.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddProjectComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var AddProjectComponent = /** @class */ (function () {
    function AddProjectComponent(model, admin, route, router, fb, sanitization, mapsAPILoader, ngZone, constant) {
        this.model = model;
        this.admin = admin;
        this.route = route;
        this.router = router;
        this.fb = fb;
        this.sanitization = sanitization;
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.constant = constant;
        this.parameter = {};
        this.url2 = [];
        this.amenityList = [];
        this.amen = '';
        this.bankList = [];
        this.bank = '';
        this.testMarital = [];
        this.imageEvent = [];
        this.showText = false;
        this.all_possession_statuses = [];
        this.all_building_types = [];
        this.all_amenities = [];
        this.all_configurations = [];
        this.selected_amenities = [];
        this.new_config = new __WEBPACK_IMPORTED_MODULE_5__models_addProject_model__["a" /* Configuration */];
        this.new_custom = { name: '', value: '' };
        this.FU = {};
        this.initialCountry = { initialCountry: 'mx' };
    }
    AddProjectComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.file1 = new __WEBPACK_IMPORTED_MODULE_8__common_fileUpload__["a" /* FileUpload */](true, this.admin);
        this.file2 = new __WEBPACK_IMPORTED_MODULE_8__common_fileUpload__["a" /* FileUpload */](false, this.admin);
        this.file3 = new __WEBPACK_IMPORTED_MODULE_8__common_fileUpload__["a" /* FileUpload */](true, this.admin);
        this.file4 = new __WEBPACK_IMPORTED_MODULE_8__common_fileUpload__["a" /* FileUpload */](false, this.admin);
        this.file5 = new __WEBPACK_IMPORTED_MODULE_8__common_fileUpload__["a" /* FileUpload */](true, this.admin);
        this.route.params.subscribe(function (params) {
            _this.id = params.id;
            if (_this.id) { /* if id exists edit mode */
                _this.parameter.loading = true;
                _this.admin.postDataApi('getProjectById', { building_id: _this.id }).subscribe(function (r) {
                    _this.parameter.loading = false;
                    _this.model = JSON.parse(JSON.stringify(r.data));
                    console.log(_this.model);
                    _this.file1.image = _this.model.main_image;
                    // this.model.configurations.map((item) => {
                    //   item.images = item.images.map(r1 => r1.image);
                    // });
                    _this.model.custom_attributes = _this.model.custom_values;
                    _this.file5.image = _this.model.developer.developer_image;
                    _this.admin.postDataApi('getAmenities', {}).subscribe(function (res) {
                        _this.all_amenities = res.data.map(function (item) { item.selected = false; return item; });
                        _this.selected_amenities = _this.all_amenities.map(function (item) {
                            if (_this.model.amenities.find(function (am) { return am.id === item.id; })) {
                                item.selected = true;
                            }
                            return item;
                        });
                    });
                }, function (error) {
                    _this.parameter.loading = false;
                });
            }
            else {
                _this.admin.postDataApi('getAmenities', {}).subscribe(function (res) {
                    _this.all_amenities = res.data.map(function (item) { item.selected = false; return item; });
                });
                _this.model.dev_countrycode = 'mx';
                _this.model.dev_dialcode = '+52';
            }
        });
        this.zoom = 4;
        this.setCurrentPosition();
        this.initForm();
        this.admin.postDataApi('getPossessionStatuses', {}).subscribe(function (r) {
            _this.all_possession_statuses = r.data;
        });
        this.admin.postDataApi('getBuildingTypes', {}).subscribe(function (r) {
            _this.all_building_types = r.data;
        });
        this.admin.postDataApi('getConfigurations', {}).subscribe(function (r) {
            _this.all_configurations = r.data;
        });
    };
    AddProjectComponent.prototype.modelOpenFun = function () {
        this.modalOpen.nativeElement.click();
        this.file2.backup(JSON.parse(JSON.stringify(this.model.images)));
    };
    AddProjectComponent.prototype.modelCloseFun = function () {
        this.modalClose.nativeElement.click();
    };
    AddProjectComponent.prototype.saveImages = function () {
        var _this = this;
        if (this.file2.files.length < 1) {
            swal('Error', 'Please select atleast one image', 'error');
            return false;
        }
        this.modalClose.nativeElement.click();
        this.file2.upload().then(function (r) {
            console.log('resolved');
            _this.model.images = _this.file2.files;
        });
    };
    AddProjectComponent.prototype.loadPlaces = function () {
        var _this = this;
        // console.log('--', this.searchElementRef.nativeElement);
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
                    // console.log(place);
                    _this.model.lat = _this.latitude;
                    _this.model.lng = _this.longitude;
                    if (place.formatted_address) {
                        _this.model.address = place.formatted_address;
                    }
                    _this.zoom = 16;
                    // console.log('----------', this.latitude, this.longitude, this.zoom);
                });
            });
        });
    };
    AddProjectComponent.prototype.setCurrentPosition = function () {
        var _this = this;
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                _this.latitude = position.coords.latitude;
                _this.longitude = position.coords.longitude;
                _this.zoom = 16;
            });
        }
    };
    AddProjectComponent.prototype.placeMarker = function ($event) {
        this.model.lat = this.latitude = $event.coords.lat;
        this.model.lng = this.longitude = $event.coords.lng;
        this.getGeoLocation(this.latitude, this.longitude);
        // console.log($event.coords.lat);
        // console.log($event);
    };
    AddProjectComponent.prototype.getGeoLocation = function (lat, lng) {
        var _this = this;
        if (navigator.geolocation) {
            var geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(lat, lng);
            var request = { latLng: latlng };
            geocoder.geocode(request, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    var result = results[0];
                    if (result != null) {
                        _this.model.address = result.formatted_address;
                    }
                    else {
                        _this.model.address = lat + ',' + lng;
                    }
                }
            });
        }
    };
    AddProjectComponent.prototype.formValidate = function () {
        return true;
    };
    AddProjectComponent.prototype.initForm = function () {
        this.myform = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormGroup"]({
            name: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('', [
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required
            ]),
            address: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('', [
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required
            ]),
            building_age: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('', [
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required
            ]),
            building_type: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('', [
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required
            ]),
            floors: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('', [
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required
            ]),
            avg_price: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('', [
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required
            ]),
            description: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('', [
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required
            ]),
            possession_status_id: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('', [
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required
            ])
        });
        this.myform2 = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormGroup"]({
            name: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('', [
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required
            ]),
            address: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('', [
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required
            ])
        });
    };
    AddProjectComponent.prototype.closeConfigPopUpFun = function () {
        this.closeConfigPopup.nativeElement.click();
        this.file4.reset();
    };
    AddProjectComponent.prototype.openConfigPopupFun = function () {
        this.openConfigPopup.nativeElement.click();
        console.log('open');
        this.addConfig.nativeElement.reset();
        this.new_config = new __WEBPACK_IMPORTED_MODULE_5__models_addProject_model__["a" /* Configuration */];
        this.new_config_edit = -1;
        this.file3.image = '';
        this.file4.files = [];
    };
    AddProjectComponent.prototype.selectConfiguration = function (id, parentModel) {
        var childModel = this.all_configurations.filter(function (r) { return r.id === id; });
        parentModel.config = childModel[0];
        // console.log(parentModel);
    };
    AddProjectComponent.prototype.editConfiguration = function (config, index) {
        var _this = this;
        // console.log(this.new_config);
        // console.log(config);
        this.new_config_edit = index;
        this.new_config = JSON.parse(JSON.stringify(config));
        console.log('EDIT', this.new_config);
        this.file3.image = config.floor_map_image;
        this.file4.files = [];
        config.images.forEach(function (item, index) {
            _this.file4.files.push(item);
        });
        this.openConfigPopup.nativeElement.click();
    };
    AddProjectComponent.prototype.deleteConfiguration = function (index) {
        var _this = this;
        swal({
            title: 'Are you sure?',
            text: 'Do you want to Delete?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes, Delete!'
        }).then(function (result) {
            if (result.value) {
                _this.model.configurations.splice(index, 1);
            }
        });
    };
    AddProjectComponent.prototype.addNewConfig = function () {
        var _this = this;
        if (this.file4.files.length < 1) {
            swal('Error', 'Please choose atleast one image for other images', 'error');
            return false;
        }
        this.closeConfigPopup.nativeElement.click();
        this.parameter.loading = true;
        this.file3.upload().then(function (r) {
            _this.file4.upload().then(function (r1) {
                _this.parameter.loading = false;
                _this.new_config.floor_map_image = _this.file3.image;
                console.log('===', _this.file4.files);
                _this.new_config.images = _this.file4.files;
                console.log(_this.new_config_edit, _this.new_config);
                if (_this.new_config_edit >= 0) {
                    _this.model.configurations[_this.new_config_edit] = _this.new_config;
                }
                else {
                    _this.model.configurations.push(_this.new_config);
                }
                console.log(_this.model.configurations);
            }, function (error) {
                _this.parameter.loading = false;
            });
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    AddProjectComponent.prototype.onCountryChange = function (obj) {
        this.model.dev_countrycode = obj.iso2;
        this.model.dev_dialcode = '+' + obj.dialCode;
    };
    AddProjectComponent.prototype.addProject = function () {
        var _this = this;
        var modelSave = JSON.parse(JSON.stringify(this.model));
        modelSave.cover_image = this.file1.image;
        modelSave.building_images = modelSave.images.map(function (r) { return r.image; });
        modelSave.images = modelSave.images.map(function (r) { return r.image; });
        modelSave.dev_name = modelSave.developer.name;
        modelSave.dev_email = modelSave.developer.email;
        modelSave.dev_phone = modelSave.developer.phone;
        modelSave.dev_logo = this.file5.image;
        modelSave.amenities = this.all_amenities.filter(function (op) { if (op.selected === true) {
            return op;
        } }).map(function (op) { return op.id; });
        modelSave.configurations.forEach(function (item) {
            item.images = item.images.map(function (x) { return x.image; });
        });
        /* remove fields for edit */
        if (!modelSave.name) {
            swal('Error', 'Please add building name', 'error');
            return false;
        }
        if (!modelSave.address) {
            swal('Error', 'Please add address', 'error');
            return false;
        }
        if (!modelSave.cover_image) {
            swal('Error', 'Please add cover image', 'error');
            return false;
        }
        if (!modelSave.cover_image) {
            swal('Error', 'Please add cover image', 'error');
            return false;
        }
        if (modelSave.building_images.length < 1) {
            swal('Error', 'Please add atleast one more building image', 'error');
            return false;
        }
        if (!modelSave.building_age) {
            swal('Error', 'Please add building age', 'error');
            return false;
        }
        if (!modelSave.building_type_id) {
            swal('Error', 'Please add building type', 'error');
            return false;
        }
        if (!modelSave.description) {
            swal('Error', 'Please add building description', 'error');
            return false;
        }
        if (!modelSave.possession_status_id) {
            swal('Error', 'Please add possession status', 'error');
            return false;
        }
        if (!modelSave.floors) {
            swal('Error', 'Please add floors', 'error');
            return false;
        }
        if (!modelSave.launch_date) {
            swal('Error', 'Please add building launch date', 'error');
            return false;
        }
        if (!modelSave.avg_price) {
            swal('Error', 'Please add building average price', 'error');
            return false;
        }
        if (modelSave.amenities.length < 1) {
            swal('Error', 'Please add amenities', 'error');
            return false;
        }
        if (modelSave.configurations.length < 1) {
            swal('Error', 'Please add building configuration', 'error');
            return false;
        }
        if (!this.id) {
            if (!modelSave.dev_name) {
                swal('Error', 'Please add developer name', 'error');
                return false;
            }
            if (!modelSave.dev_countrycode) {
                swal('Error', 'Please add developer country code', 'error');
                return false;
            }
            if (!modelSave.dev_email) {
                swal('Error', 'Please add developer email', 'error');
                return false;
            }
            if (!modelSave.dev_phone) {
                swal('Error', 'Please add developer phone', 'error');
                return false;
            }
            if (!modelSave.dev_logo) {
                swal('Error', 'Please add developer image', 'error');
                return false;
            }
        }
        console.log(modelSave);
        if (this.id) {
            modelSave.building_id = this.id;
            modelSave.developer_id = modelSave.developer.id;
            this.parameter.loading = true;
            this.admin.postDataApi('updateProject', modelSave).subscribe(function (success) {
                // console.log(success);
                _this.parameter.loading = false;
                swal('Success', success.message, 'success');
                _this.router.navigate(['/dashboard/projects/view-projects']);
            }, function (error) {
                console.log(error);
                _this.parameter.loading = false;
                swal('Error', error.message, 'error');
            });
        }
        else {
            delete modelSave.id;
            delete modelSave.building_id;
            this.parameter.loading = true;
            this.admin.postDataApi('addProject', modelSave).subscribe(function (success) {
                // console.log(success);
                _this.parameter.loading = false;
                swal('Success', success.message, 'success');
                _this.router.navigate(['/dashboard/projects/view-projects']);
            }, function (error) {
                console.log(error);
                _this.parameter.loading = false;
                swal('Error', error.message, 'error');
            });
        }
    };
    AddProjectComponent.prototype.file2Select = function ($event) {
        if ((this.file2.files.length + $event.target.files.length) > 6) {
            swal('Limit exceeded', 'You can upload maximum of 6 images', 'error');
            return false;
        }
        this.file2.onSelectFile($event);
    };
    AddProjectComponent.prototype.file4Select = function ($event) {
        if ((this.file4.files.length + $event.target.files.length) > 6) {
            swal('Limit exceeded', 'You can upload maximum of 6 images', 'error');
            return false;
        }
        this.file4.onSelectFile($event);
    };
    AddProjectComponent.prototype.addNewCustom = function () {
        if (!this.new_custom.name || !this.new_custom.value) {
            swal('Error', 'Please add parameter name and value', 'error');
            return false;
        }
        this.model.custom_attributes.unshift(this.new_custom);
        this.new_custom = { name: '', value: '' };
    };
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('modalClose'),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _a : Object)
    ], AddProjectComponent.prototype, "modalClose", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('modalOpen'),
        __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _b : Object)
    ], AddProjectComponent.prototype, "modalOpen", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('mapDiv'),
        __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _c : Object)
    ], AddProjectComponent.prototype, "mapDiv", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('search'),
        __metadata("design:type", typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _d : Object)
    ], AddProjectComponent.prototype, "searchElementRef", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('openConfigPopup'),
        __metadata("design:type", typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _e : Object)
    ], AddProjectComponent.prototype, "openConfigPopup", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('closeConfigPopup'),
        __metadata("design:type", typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _f : Object)
    ], AddProjectComponent.prototype, "closeConfigPopup", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('addConfig'),
        __metadata("design:type", typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _g : Object)
    ], AddProjectComponent.prototype, "addConfig", void 0);
    AddProjectComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-add-project',
            template: __webpack_require__("../../../../../src/app/layout/projects/add-project/add-project.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/projects/add-project/add-project.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_5__models_addProject_model__["b" /* AddProjectModel */], __WEBPACK_IMPORTED_MODULE_7__common_constants__["a" /* Constant */]]
        }),
        __metadata("design:paramtypes", [typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_5__models_addProject_model__["b" /* AddProjectModel */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__models_addProject_model__["b" /* AddProjectModel */]) === "function" ? _h : Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */]) === "function" ? _j : Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["ActivatedRoute"]) === "function" ? _k : Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["Router"]) === "function" ? _l : Object, typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"]) === "function" ? _m : Object, typeof (_o = typeof __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["DomSanitizer"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["DomSanitizer"]) === "function" ? _o : Object, typeof (_p = typeof __WEBPACK_IMPORTED_MODULE_6__agm_core__["b" /* MapsAPILoader */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__agm_core__["b" /* MapsAPILoader */]) === "function" ? _p : Object, typeof (_q = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]) === "function" ? _q : Object, typeof (_r = typeof __WEBPACK_IMPORTED_MODULE_7__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__common_constants__["a" /* Constant */]) === "function" ? _r : Object])
    ], AddProjectComponent);
    return AddProjectComponent;
}());

//# sourceMappingURL=add-project.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/projects/project-details/project-details.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/projects/project-details/project-details.component.html":
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<div *ngIf=\"!project\" style=\"margin-top:120px;\" class=\"container\" >\n  <img style=\"width:100%\" src=\"assets/img/loading_content.gif\">\n</div>\n<div class=\"inner-page-wrapper details-page gray-bg-1\" *ngIf=\"project\">\n <div class=\"container\">\n\n    <div class=\"clearfix\"></div>\n    <div class=\"details-header marginB30\">\n       <div class=\"row\">\n          <div class=\"col-md-6 col-12\">\n             <h4>{{project.name}} <span *ngIf=\"project.building_type\" class=\"new-project\">{{project.building_type.name}}</span></h4>\n             <p class=\"p14\" *ngIf=\"project.developer\">By {{project.developer.name}}</p>\n             <p class=\"p18\">{{project.address}}</p>\n          </div>\n          {{fixed}}\n          <div class=\"col-md-6 col-12\">\n             <div class=\"header-details-right text-right\">\n                <p class=\"p18\">\n                  <span>{{ts.lang.Base_Price}}:</span>\n                  {{base_price_min|thousand}}\n                   <b *ngIf=\"base_price_max\">-</b>\n                   <b *ngIf=\"base_price_max\">{{base_price_max|thousand}}</b>\n                </p>\n                <p class=\"p16\">{{ts.lang.Price_on_Request}}</p>\n                <div class=\"btn-cont float-right\">\n                  <!-- <a [ngx-scroll-to]=\"'#bottomDetails'\" class=\"btn btn-primary btn-lg\" href=\"javascript://\">Contact Developer</a> -->\n                </div>\n             </div>\n          </div>\n       </div>\n    </div>\n    <div class=\"details-photos\">\n       <div class=\"row cust-row\">\n          <div class=\"col-md-8 cust-col\">\n             <!-- <img class=\"main-photo img-fluid\" [src]=\"project.main_image\" onerror='this.src=\"http://via.placeholder.com/770x416\"' alt=\"img\"> -->\n             <img class=\"main-photo img-fluid\" onerror='this.src=\"constant.propertyPlaceholder\"' [defaultImage]=\"property?.main_image| img:'thumb'\" [lazyLoad]=\"property?.main_image\">\n          </div>\n          <div class=\"col-md-4 cust-col\" *ngIf=\"project.images\">\n              <img *ngIf=\"project.images[0]\" class=\"secondary-photo img-fluid\" onerror='this.src=\"constant.propertyPlaceholder\"' [defaultImage]=\"project.images[0].image| img:'thumb'\" [lazyLoad]=\"project.images[0].image\">\n              <img *ngIf=\"project.images[1]\" class=\"secondary-photo img-fluid\" onerror='this.src=\"constant.propertyPlaceholder\"' [defaultImage]=\"project.images[1].image| img:'thumb'\" [lazyLoad]=\"project.images[1].image\">\n             <!-- <img *ngIf=\"project.images[0]\" class=\"secondary-photo img-fluid\" [src]=\"project.images[0].image\" onerror=\"this.src='http://via.placeholder.com/392x200'\" alt=\"img\">\n             <img *ngIf=\"project.images[1]\"class=\"secondary-photo img-fluid\" [src]=\"project.images[1].image\" onerror=\"this.src='http://via.placeholder.com/392x200'\" alt=\"img\"> -->\n          </div>\n       </div>\n\n       <!-- <a *ngIf=\"project.images.length > 2\" class=\"btn view-photos\" href=\"javascript://\">{{ts.lang.View_Photos}}</a> -->\n    </div>\n    <div class=\"img-des\">\n       <div class=\"row\">\n          <div class=\"col-md-3 col-sm-6 col-12 img-c\">\n             <div class=\"block\">\n                <p class=\"p18\">{{project.starting_price| thousand}}</p>\n                <p class=\"p13\">{{ts.lang.Min_Price_per_Sq_feet}}</p>\n             </div>\n          </div>\n          <div class=\"col-md-3 col-sm-6 col-12 img-c\">\n             <div class=\"block\">\n                <p class=\"p18\">{{config_string}}</p>\n                <p class=\"p13\">{{ts.lang.Configuration}}</p>\n             </div>\n          </div>\n          <div class=\"col-md-3 col-sm-6 col-12 img-c\">\n             <div class=\"block\">\n                <p *ngIf=\"project.launch_date\"class=\"p18\">{{project.launch_date| date:\"d MMM y\"}}</p>\n                <p *ngIf=\"!project.launch_date\" class=\"p18\">{{ts.lang.Not_available}}</p>\n                <p class=\"p13\">{{ts.lang.Possession_Date}}</p>\n             </div>\n          </div>\n          <div class=\"col-md-3 col-sm-6 col-12 img-c\">\n             <div *ngIf=\"configuration\" class=\"block\">\n                <p class=\"p18\">{{carpet_area_string}}</p>\n                <p class=\"p13\">{{ts.lang.Carpet_Area}} <i><img src=\"assets/img/info.png\" alt=\"img\"></i></p>\n             </div>\n          </div>\n       </div>\n    </div>\n </div>\n <div class=\"cust-tabs full-width-tabs marginT20\">\n    <hr id=\"bottomDetails\">\n    <div class=\"container\">\n       <ul class=\"nav nav-pills\">\n          <li class=\"nav-item {{active}}\">\n             <a class=\"nav-link\" data-toggle=\"pill\" href=\"#one\">{{ts.lang.Overview}}</a>\n          </li>\n          <li class=\"nav-item\">\n             <a class=\"nav-link\" data-toggle=\"pill\" (click)=\"active=''\" href=\"#two\">{{ts.lang.Configs}}</a>\n          </li>\n          <li class=\"nav-item\">\n             <a class=\"nav-link\" data-toggle=\"pill\" (click)=\"active=''\" href=\"#three\">{{ts.lang.Amenities}}</a>\n          </li>\n          <li class=\"nav-item\">\n             <a class=\"nav-link\" data-toggle=\"pill\" (click)=\"active=''\" href=\"#four\">{{ts.lang.Developer}}</a>\n          </li>\n\n       </ul>\n    </div>\n    <hr>\n    <div class=\"spacer30\"></div>\n    <div class=\"container\">\n       <div class=\"row\">\n          <div class=\"col-lg-7 col-md-12 col-sm-12 col-12\">\n             <div class=\"white-bg padding40\">\n                <div class=\"tab-content\">\n                   <div class=\"tab-pane active\" id=\"one\">\n                      <p class=\"p14\">{{ts.lang.Overview}}</p>\n                      <p class=\"newline\">{{project.description}}</p>\n\n                      <div class=\"row\">\n                        <div *ngIf=\"project.custom_values\" class=\"overview-table marginT15 col-6\">\n                          <table style=\"width: 100%\">\n                            <tbody>\n                               <tr *ngFor=\"let item of project.custom_values\">\n                                  <td><label>{{item.name}}:</label></td>\n                                  <td><label>{{item.value}}</label></td>\n                               </tr>\n                            </tbody>\n                         </table>\n                        </div>\n                      </div>\n\n                      <div class=\"map-3 marginT30\">\n                         <div style=\"height:200px;\" #mapListing>\n                         </div>\n                      </div>\n<!-- \n                      <div class=\"spacer30\"></div>\n\n                      <p *ngIf=\"project.configurations.length > 0\" class=\"p14\">{{ts.lang.Configs}}</p>\n                      <div *ngFor=\"let config of project.configurations\">\n                        <div class=\"config-table\">\n                           <table style=\"width:100%;\">\n                              <tbody>\n                                 <tr>\n                                    <th>{{ts.lang.Configuration_type}}</th>\n                                    <th>{{ts.lang.Carpet_Area}}</th>\n                                    <th>{{ts.lang.Base_Price}}</th>\n                                 </tr>\n                                 <tr>\n                                    <td>\n                                      <p class=\"p14 marginB0\">{{config.config.name}}</p>\n                                      <p></p>\n                                   </td>\n                                    <td>\n                                       <table style=\"width:100%;\">\n                                          <tbody>\n                                             <tr>\n                                                <td>{{config.carpet_area}} sqft</td>\n                                             </tr>\n\n                                          </tbody>\n                                       </table>\n                                    </td>\n                                    <td>\n                                       <table style=\"width:100%;\">\n                                          <tbody>\n                                             <tr>\n                                                <td>{{config.base_price | thousand}}</td>\n                                             </tr>\n                                          </tbody>\n                                       </table>\n                                    </td>\n                                 </tr>\n                              </tbody>\n                           </table>\n                        </div>\n                        <div class=\"fig-block padding40 text-center\">\n                           <img class=\"img-fluid\" [src]=\"config.floor_map_image\" alt=\"img\">\n                        </div>\n                      </div>\n\n\n                      <div class=\"spacer30\"></div>\n                      <p class=\"p14\">{{ts.lang.Amenities}}</p>\n                      <div class=\"icons-group\">\n                         <div *ngFor=\"let am of project.amenities\" class=\"icons-control\">\n                            <div class=\"fig-block\">\n                               <img  class=\"icon\" [src]=\"am.icon\" onerror='src=\"http://via.placeholder.com/24x24\"' alt=\"img\">\n                            </div>\n                            <p class=\"p13\">{{am.name}}</p>\n                         </div>\n                     </div>\n\n                     <div *ngIf=\"project.banks.length > 0\">\n                       <div class=\"row\">\n                           <div class=\"col-6\">\n                              <p class=\"p14\">{{ts.lang.Home_Loans}}</p>\n                           </div>\n                           <div class=\"col-6\" *ngIf=\"project.banks.length > 3 && bankClicked == false\">\n                              <div class=\"text-right\">\n                                 <a class=\"see-more\" (click)=\"bankLimit = 100; bankClicked = true;\" href=\"javascript://\"><span>+{{project.banks.length - 3}} more</span> <i class=\"fa fa-angle-right\"></i></a>\n                              </div>\n                           </div>\n                        </div>\n                        <div class=\"bank-blocks\">\n                          <div  *ngFor=\"let bank of project.banks | slice : 0 : bankLimit\"  class=\"block\">\n                             <div class=\"fig-block text-center\">\n                                <img class=\"img-fluid\" [src]=\"bank.image\" onerror=\"this.src='http://via.placeholder.com/152x48'\" alt=\"img\">\n                             </div>\n                             <div class=\"d-flex\">\n                                <p class=\"p13\">{{ts.lang.Fixed_Interest}}</p>\n                                <p class=\"p16\">{{bank.floating_int}}</p>\n                             </div>\n                          </div>\n                       </div>\n                     </div>\n\n                     <p *ngIf=\"project.developer\" class=\"p14 marginT30\">{{ts.lang.Contact_Developer}}</p>\n                     <div *ngIf=\"project.developer\" class=\"contact-developer white-bg\">\n                        <table class=\"table\">\n                           <tr>\n                              <td style=\"width:10%\">\n                                 <div class=\"fig-block\">\n                                    <img class=\"img-fluid\" [src]=\"project.developer.developer_image\" src=\"http://via.placeholder.com/56x56\" alt=\"img\">\n                                 </div>\n                              </td>\n                              <td style=\"width:50%\">\n                                 <p class=\"p11\">{{ts.lang.Developer}}</p>\n                                 <p class=\"p16\">{{project.developer.name}}</p>\n                                 <p class=\"p13\">{{project.developer.developer_title}}</p>\n                              </td>\n                              <td style=\"width:40%;\">\n                                 <p class=\"p16\">1</p>\n                                 <p class=\"p13\">{{ts.lang.Projects}}</p>\n                              </td>\n                           </tr>\n                           <tr>\n                              <td>\n                                 &nbsp;\n                              </td>\n                              <td>\n                                 <p class=\"p12\">{{ts.lang.Contact}}</p>\n                                 <p>{{project.developer.country_code}} {{project.developer.phone | numberex:2}}</p>\n                              </td>\n                              <td>\n                                 &nbsp;\n                              </td>\n                           </tr>\n                        </table>\n                     </div> -->\n\n                   </div>\n                   <div class=\"tab-pane\" id=\"two\">\n\n                     <p class=\"p14\">{{ts.lang.Configs}}</p>\n                     <div *ngFor=\"let config of project.configurations\">\n                       <div class=\"config-table\">\n                          <table style=\"width:100%;\">\n                             <tbody>\n                                <tr>\n                                   <th>Configuration type</th>\n                                   <th>Carpet Area</th>\n                                   <th>Base Price</th>\n                                </tr>\n                                <tr>\n                                   <td>\n                                      <p class=\"p14 marginB0\">{{config.config.name}}</p>\n\n                                   </td>\n                                   <td>\n                                      <table style=\"width:100%;\">\n                                         <tbody>\n                                            <tr>\n                                               <td>{{config.carpet_area}} sqft</td>\n                                            </tr>\n\n                                         </tbody>\n                                      </table>\n                                   </td>\n                                   <td>\n                                      <table style=\"width:100%;\">\n                                         <tbody>\n                                            <tr>\n                                               <td>{{config.base_price| thousand}}</td>\n                                            </tr>\n\n                                         </tbody>\n                                      </table>\n                                   </td>\n                                </tr>\n                             </tbody>\n                          </table>\n                       </div>\n                       <div class=\"fig-block padding40 text-center\">\n                          <img class=\"img-fluid\" onerror='this.src=\"constant.propertyPlaceholder\"' [defaultImage]=\"config.floor_map_image| img:'thumb'\" [lazyLoad]=\"config.floor_map_image\">\n                          <!-- <img class=\"img-fluid\" [src]=\"config.floor_map_image\" alt=\"img\"> -->\n                       </div>\n                     </div>\n\n                   </div>\n                   <div class=\"tab-pane\" id=\"three\">\n                     <p class=\"p14\">{{ts.lang.Aminities}}</p>\n                     <div class=\"icons-group\">\n                        <div *ngFor=\"let am of project.amenities\" class=\"icons-control\">\n                           <div class=\"fig-block\">\n                              <img class=\"icon\" [src]=\"am.icon\" onerror='src=\"http://via.placeholder.com/24x24\"' alt=\"img\">\n                           </div>\n                           <p class=\"p13\">{{am.name}}</p>\n                        </div>\n                    </div>\n                   </div>\n                   <div class=\"tab-pane\" id=\"four\">\n                     <p class=\"p14\">{{ts.lang.Contact_Developer}}</p>\n                     <div class=\"contact-developer white-bg\">\n                        <table class=\"table\">\n                           <tr>\n                              <td style=\"width:10%\">\n                                 <div class=\"fig-block\">\n                                    <img class=\"img-fluid\" [src]=\"project?.developer?.developer_image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\">\n                                 </div>\n                              </td>\n                              <td style=\"width:60%\">\n                                 <p class=\"p11\">{{ts.lang.Developer}}</p>\n                                 <p class=\"p16\">{{project?.developer?.name ? project?.developer?.name : 'NA'}}</p>\n                                 <p class=\"p13\">{{project?.developer?.developer_title ? project?.developer?.developer_title : 'NA'}}</p>\n                              </td>\n                              <td style=\"width:30%;\">\n                                 <p class=\"p16\">1</p>\n                                 <p class=\"p13\">Projects</p>\n                              </td>\n                           </tr>\n                           <tr>\n                              <td>\n                                 &nbsp;\n                              </td>\n                              <td>\n                                 <p class=\"p12\">{{ts.lang.Contact_Developer}}</p>\n                                 <p *ngIf=\"project?.developer?.country_code\">{{project?.developer?.country_code}} {{project.developer.phone | numberex:2}}</p>\n                              </td>\n                              <td>\n                                 &nbsp;\n                              </td>\n                           </tr>\n                        </table>\n                     </div>\n                   </div>\n                   <div class=\"tab-pane\" id=\"five\">\n\n                   </div>\n                </div>\n             </div>\n          </div>\n       </div>\n    </div>\n </div>\n  <div class=\"spacer60\"></div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/layout/projects/project-details/project-details.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__agm_core__ = __webpack_require__("../../../../@agm/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lang_translate_service__ = __webpack_require__("../../../../../src/app/lang/translate.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectDetailsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ProjectDetailsComponent = /** @class */ (function () {
    function ProjectDetailsComponent(loader, admin, route, ts, constant) {
        this.loader = loader;
        this.admin = admin;
        this.route = route;
        this.ts = ts;
        this.constant = constant;
        this.parameter = {};
        this.bankLimit = 3;
        this.bankClicked = false;
        this.active = 'active';
    }
    ProjectDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.id = params['project_id'];
            _this.getListing();
        });
    };
    ProjectDetailsComponent.prototype.getListing = function () {
        var _this = this;
        this.parameter.loading = true;
        this.admin.postDataApi('getProjectDetail', { project_id: this.id }).subscribe(function (res) {
            console.log(res);
            _this.parameter.loading = false;
            _this.project = res['data'].building;
            _this.properties = res['data'].properties;
            _this.configurations = _this.project.configurations;
            _this.configuration = _this.configurations[0];
            _this.config_string = _this.project.configurations.map(function (r) { return r.config.name; }).join(', ');
            var config_carpet_areas = _this.project.configurations.map(function (r) { return parseInt(r.carpet_area); });
            if (config_carpet_areas.length < 1) {
                _this.carpet_area_string = 'Not Available';
            }
            else if (config_carpet_areas.length === 1) {
                _this.carpet_area_string = config_carpet_areas[0] + ' sqft';
            }
            else {
                var min = Math.min.apply(null, config_carpet_areas);
                var max = Math.max.apply(null, config_carpet_areas);
                _this.carpet_area_string = min + ' sqft - ' + max + ' sqft';
            }
            var config_prices = _this.project.configurations.map(function (r) { return parseInt(r.base_price); });
            if (config_prices.length < 1) {
                _this.base_price_string = 'Not Available';
            }
            else if (config_prices.length === 1) {
                _this.base_price_min = config_prices[0];
            }
            else {
                _this.base_price_min = Math.min.apply(null, config_prices);
                _this.base_price_max = Math.max.apply(null, config_prices);
            }
            _this.initMapLocations();
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    ProjectDetailsComponent.prototype.initMapLocations = function () {
        var _this = this;
        this.loader.load().then(function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var map = new google.maps.Map(_this.mapListing.nativeElement, {
                        center: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        },
                        zoom: 15
                    });
                    var infowindow = new google.maps.InfoWindow();
                    var marker, i;
                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng(_this.project.lat, _this.project.lng),
                        map: map
                    });
                    google.maps.event.addListener(marker, 'click', (function (marker, i) {
                        return function () {
                            infowindow.setContent('<p>' + _this.project.name + '</p>');
                            infowindow.open(map, marker);
                        };
                    })(marker, i));
                    map.setCenter(marker.position);
                });
            }
        });
    };
    var _a, _b, _c, _d, _e, _f;
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('mapListing'),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _a : Object)
    ], ProjectDetailsComponent.prototype, "mapListing", void 0);
    ProjectDetailsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-project-details',
            template: __webpack_require__("../../../../../src/app/layout/projects/project-details/project-details.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/projects/project-details/project-details.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__agm_core__["b" /* MapsAPILoader */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__agm_core__["b" /* MapsAPILoader */]) === "function" ? _b : Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" ? _c : Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["ActivatedRoute"]) === "function" ? _d : Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__lang_translate_service__["a" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__lang_translate_service__["a" /* TranslateService */]) === "function" ? _e : Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_5__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__common_constants__["a" /* Constant */]) === "function" ? _f : Object])
    ], ProjectDetailsComponent);
    return ProjectDetailsComponent;
}());

//# sourceMappingURL=project-details.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/projects/projects.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/projects/projects.component.html":
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<div class=\"container-fluid\">\n    <div class=\"row\">\n        <div class=\"col-md-4\">\n            <div class=\"form-group\">\n                <p class=\"p16\">Manage Projects</p>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"offset-md-4\"></div>\n        <div class=\"col-md-8 col-12\">\n            <div class=\"cust-tabs-2\">\n                <ul class=\"nav nav-tabs float-right\">\n                    <li class=\"nav-item\">\n                      <a [ngClass]=\"{'active':parameter.dash_flag == 1}\" (click)=\"changeFlag(1)\" class=\"nav-link\" data-toggle=\"tab\" href=\"#tw\">This Week</a>\n                    </li>\n                    <li class=\"nav-item\">\n                      <a [ngClass]=\"{'active':parameter.dash_flag == 2}\" (click)=\"changeFlag(2)\" class=\"nav-link\" data-toggle=\"tab\" href=\"#tm\">This Month</a>\n                    </li>\n                    <li class=\"nav-item\">\n                      <a [ngClass]=\"{'active':parameter.dash_flag == 3}\" (click)=\"changeFlag(3)\" class=\"nav-link\" data-toggle=\"tab\" href=\"#lm\">Last Month</a>\n                    </li>\n                    <li class=\"nav-item\">\n                      <a [ngClass]=\"{'active':parameter.dash_flag == 4}\" (click)=\"changeFlag(4)\" class=\"nav-link\" data-toggle=\"tab\" href=\"#lt\">Lifetime</a>\n                    </li>\n                    <li class=\"nav-item\">\n                      <a [ngClass]=\"{'active':parameter.dash_flag == 5}\" (click)=\"changeFlag(5)\" class=\"nav-link\" data-toggle=\"tab\" href=\"#cust\">Custom</a>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-12\">\n            <div *ngIf=\"parameter.dash_flag == 5\" class=\"row\">\n                <div class=\"offset-lg-7\"></div>\n                <div class=\"col-lg-2 col-md-2 col-sm-5 col-5\">\n                <div class=\"form-group marginB0\">\n                    <label>From:</label>\n                    <p-calendar showIcon=\"true\" [(ngModel)]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n                </div>\n                </div>\n                <div class=\"col-lg-2 col-md-2 col-sm-5 col-5\">\n                <div class=\"form-group marginB0\">\n                    <label>To:</label>\n                    <p-calendar showIcon=\"true\" [(ngModel)]=\"parameter.max\" [minDate]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n                </div>\n                </div>\n                <div class=\"col-lg-1 col-md-2 col-sm-2 col-6\">\n                <div class=\"form-group btn-cont\">\n                    <label class=\"addMT3\">&nbsp;</label>\n                    <button class=\"btn btn-calender\" href=\"javascript://\" (click)=\"getListing()\"\n                        [disabled]=\"!parameter.min || !parameter.max\">Apply</button>\n                </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-md-2\">\n            <div class=\"form-group\">\n            <label>Country</label>\n            <select class=\"form-control\" (change)=\"onCountryChange($event.target.value)\">\n                <option value=\"0\" [selected]=\"parameter.country_id==0 ? 'true': 'false'\">All</option>\n                <option *ngFor=\"let item of location.countries\" [value]=\"item.id\">{{item.name}}</option>\n            </select>\n            </div>\n        </div>\n        <div class=\"col-md-2\">\n            <div class=\"form-group\">\n            <label>State</label>\n            <select class=\"form-control\" (change)=\"onStateChange($event.target.value)\">\n                <option value=\"0\">All</option>\n                <option *ngFor=\"let item of location.states\" [value]=\"item.id\">{{item.name}}</option>\n            </select>\n            </div>\n        </div>\n        <div class=\"col-md-2\">\n            <div class=\"form-group\">\n            <label>City</label>\n                <select class=\"form-control\" (change)=\"onCityChange($event.target.value)\">\n                <option value=\"0\">All</option>\n                <option *ngFor=\"let item of location.cities\" [value]=\"item.id\">{{item.name}}</option>\n                </select>\n            </div>\n        </div>\n\n        <div class=\"col-md-2\">\n            <div class=\"form-group\">\n            <label>Locality</label>\n            <select class=\"form-control\" (change)=\"onLocalityChange($event.target.value)\">\n                <option value=\"0\">All</option>\n                <option *ngFor=\"let item of location.localities\" [value]=\"item.id\">{{item.name}}</option>\n            </select>\n            </div>\n        </div>\n\n        <div class=\"col-md-2\">\n            <div class=\"form-group btn-cont\">\n            <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n            <button type=\"button\" (click)=\"getListing()\" class=\"btn btn-primary-new width100P\">Apply</button>\n            </div>\n        </div>\n\n        <div class=\"col-md-2\">\n            <div class=\"form-group btn-cont\">\n            <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n            <button type=\"button\" (click)=\"resetFilters()\" class=\"btn btn-primary-new width100P\">Reset</button>\n            </div>\n        </div>\n    </div>\n\n  <!-- <div class=\"row\">\n    <div class=\"col-md-4\">\n      <div class=\"form-group\">\n      <p class=\"p16\">Manage Projects</p>\n      </div>\n    </div>\n    <div class=\"col-md-2\">\n  <div class=\"form-group\">\n  <label>Country</label>\n    <select class=\"form-control\" (change)=\"onCountryChange($event.target.value)\">\n      <option value=\"0\">All</option>\n      <option *ngFor=\"let item of location.countries\" [value]=\"item.id\">{{item.name}}</option>\n    </select>\n  </div>\n  </div>\n  <div class=\"col-md-2\">\n  <div class=\"form-group\">\n  <label>State</label>\n    <select class=\"form-control\" (change)=\"onStateChange($event.target.value)\">\n      <option value=\"0\">All</option>\n      <option *ngFor=\"let item of location.states\" [value]=\"item.id\">{{item.name}}</option>\n    </select>\n  </div>\n  </div>\n  <div class=\"col-md-2\">\n    <div class=\"form-group\">\n    <label>City</label>\n      <select class=\"form-control\" (change)=\"onCityChange($event.target.value)\">\n        <option value=\"0\">All</option>\n        <option *ngFor=\"let item of location.cities\" [value]=\"item.id\">{{item.name}}</option>\n      </select>\n    </div>\n  </div>\n\n  <div class=\"col-md-2\">\n  <div class=\"form-group\">\n  <label>Locality</label>\n  <select class=\"form-control\" (change)=\"onLocalityChange($event.target.value)\">\n      <option value=\"0\">All</option>\n      <option *ngFor=\"let item of location.localities\" [value]=\"item.id\">{{item.name}}</option>\n    </select>\n  </div>\n  </div>\n  </div> -->\n\n  <!-- <div class=\"row\">\n        <div class=\"col-md-12\">\n            <div class=\"cust-tabs-2\">\n              <ul class=\"nav nav-tabs float-right\">\n                  <li class=\"nav-item\">\n                    <a [ngClass]=\"{'active':parameter.dash_flag == 1}\" (click)=\"parameter.dash_flag=1;getListing()\" class=\"nav-link\" data-toggle=\"tab\" href=\"#tw\">This Week</a>\n                  </li>\n                  <li class=\"nav-item\">\n                    <a [ngClass]=\"{'active':parameter.dash_flag == 2}\" (click)=\"parameter.dash_flag=2;getListing()\" class=\"nav-link\" data-toggle=\"tab\" href=\"#tm\">This Month</a>\n                  </li>\n                  <li class=\"nav-item\">\n                    <a [ngClass]=\"{'active':parameter.dash_flag == 3}\" (click)=\"parameter.dash_flag=3;getListing()\" class=\"nav-link\" data-toggle=\"tab\" href=\"#lm\">Last Month</a>\n                  </li>\n                  <li class=\"nav-item\">\n                    <a [ngClass]=\"{'active':parameter.dash_flag == 4}\" (click)=\"parameter.dash_flag=4;getListing()\" class=\"nav-link\" data-toggle=\"tab\" href=\"#lt\">Lifetime</a>\n                  </li>\n                  <li class=\"nav-item\">\n                    <a [ngClass]=\"{'active':parameter.dash_flag == 5}\" (click)=\"parameter.dash_flag=5\" class=\"nav-link\" data-toggle=\"tab\" href=\"#cust\">Custom</a>\n                  </li>\n              </ul>\n            </div>\n        </div>\n        <div class=\"col-12\">\n            <div *ngIf=\"parameter.dash_flag == 5\" class=\"pull-right row\">\n                <div class=\"col-lg-4 col-md-4 col-sm-5 col-5\">\n                <div class=\"form-group marginB0\">\n                    <label>From:</label>\n                    <p-calendar showIcon=\"true\" [(ngModel)]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n                </div>\n                </div>\n                <div class=\"col-lg-4 col-md-4 col-sm-5 col-5\">\n                <div class=\"form-group marginB0\">\n                    <label>To:</label>\n                    <p-calendar showIcon=\"true\" [(ngModel)]=\"parameter.max\" [minDate]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n                </div>\n                </div>\n                <div class=\"col-lg-4 col-md-4 col-sm-2 col-6\">\n                <div class=\"form-group btn-cont\">\n                    <label class=\"addMT3\">&nbsp;</label>\n                    <button class=\"btn btn-calender\" href=\"javascript://\" (click)=\"getListing()\"\n                [disabled]=\"!parameter.min || !parameter.max\">Apply</button>\n                </div>\n                </div>\n            </div>\n        </div>\n      </div> -->\n\n      <div class=\"cust-tabs\">\n      <div class=\"row flex-wrap-reverse\">\n          \n      <!-- <div class=\"col-xl-10 col-lg-12 col-md-12 col-sm-12 col-12\">\n        <ul class=\"nav nav-tabs\">\n            <li class=\"nav-item\">\n              <a [ngClass]=\"{'active':parameter.flag==3}\" (click)=\"changeFlag(3)\" class=\"nav-link\" >Approved</a>\n            </li>\n            <li class=\"nav-item\">\n              <a [ngClass]=\"{'active':parameter.flag==2}\" (click)=\"changeFlag(2)\" class=\"nav-link\" >Unapproved</a>\n            </li>\n            <li class=\"nav-item\">\n              <a [ngClass]=\"{'active':parameter.flag==4}\" (click)=\"changeFlag(4)\" class=\"nav-link\" >Pending Review</a>\n            </li>\n            <li class=\"nav-item\">\n              <a [ngClass]=\"{'active':parameter.flag==1}\" (click)=\"changeFlag(1)\" class=\"nav-link\" >In Draft</a>\n            </li>\n        </ul>\n        </div> -->\n\n        <div class=\"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12\"><div class=\"add-new pull-right\">\n              <a *ngIf=\"admin?.admin_acl['Building Management']?.can_create==1\" class=\"btn\" href=\"javascript://\" routerLink=\"/dashboard/projects/add-project\">+Add New Project</a>\n            </div></div>\n            </div>\n        <div class=\"tab-content white-bg\">\n            <div class=\"tab-pane active\">\n              <div class=\"tabel-section\">\n                  <div class=\"table-responsive\">\n                    <table class=\"table table-striped table-align-left\">\n                        <tr>\n                          <th style=\"vertical-align:top;width:6%\">\n                              <div class=\"d-flex table-search\">\n                                <label>Image</label>\n                              </div>\n                          </th>\n                          <th style=\"width:20%\">\n                              <div class=\"table-search\">\n                                  <label>Name of Building</label>\n                                  <div class=\"searh-3\">\n                                  <input type=\"text\" [(ngModel)]=\"parameter.keyword\" (keyup.enter)=\"getListing()\" >\n                                  <button *ngIf=\"parameter.keyword\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                                </div>\n                              </div>\n                            </th>\n                            <th style=\"width:25%\">\n                              <div class=\"table-search\">\n                                  <label>Address</label>\n                                  <div class=\"searh-3\">\n                                    <input type=\"text\" [(ngModel)]=\"parameter.address\" (keyup.enter)=\"getListing()\" >\n                                    <button *ngIf=\"parameter.address\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                                  </div>\n                                </div>\n                          </th>\n                          <th style=\"width:25%\">\n                              <div class=\"table-search\">\n                                  <label>Developer Email</label>\n                                  <div class=\"searh-3\">\n                                    <input type=\"text\" [(ngModel)]=\"parameter.email\" (keyup.enter)=\"getListing()\" >\n                                    <button *ngIf=\"parameter.email\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                                  </div>\n                                </div>\n                          </th>\n                          <th style=\"vertical-align:top;width:10%\">\n                              <div class=\"d-flex table-search\"><span><label>Avg Price</label></span></div>\n                          </th>\n                          \n                          <th style=\"vertical-align:top;width:100px;width:14%\">\n                            <div class=\"d-flex table-search\"><span><label>Actions</label></span>\n                            </div>\n                          </th>\n                        </tr>\n                  \n                        <tr *ngFor=\"let p of items | paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: total }; let i=index\">\n                            <td>\n                                <img class=\"rounded-circle\" onerror='this.src=\"constant.propertyPlaceholder\"' [defaultImage]=\"p.main_image| img:'thumb'\" [lazyLoad]=\"p.main_image\">\n                              <!-- <img [src]=\"p.main_image| img:'thumb'\" class=\"rounded-circle\" onerror='this.src=\"assets/img/placeholder-img.png\"' alt=\"img\"> -->\n                            </td>\n                            <td class=\"cursor-pointer\" title=\"Click to view details\" routerLink=\"/dashboard/projects/details/{{p.id}}\">\n                              <strong>{{p?.name}}</strong>\n                            </td>\n                            <td>\n                                <strong>{{p?.address}}</strong>\n                            </td>\n                            <td><span *ngIf=\"p.developer\">{{p?.developer?.email}}</span></td>\n                            <td><span>{{p.avg_price}}</span></td>\n                            <td>\n                              <div class=\"message\">\n                                <button [disabled]=\"admin?.admin_acl['Building Management']?.can_update==0\" routerLink=\"/dashboard/projects/edit-project/{{p.id}}\" title=\"Edit Details\" class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></button>\n                                <button [disabled]=\"admin?.admin_acl['Building Management']?.can_delete==0\" *ngIf=\"!p.is_blocked\" (click)=\"block(p);\" class=\"action-icon\" title=\"Block\"><img src=\"assets/img/block.png\" alt=\"img\"></button>\n                                <button [disabled]=\"admin?.admin_acl['Building Management']?.can_delete==0\" *ngIf=\"p.is_blocked == true\" (click)=\"unblock(p);\" class=\"action-icon unblock-bg\" title=\"UnBlock\"><img src=\"assets/img/unblock.png\" alt=\"img\"></button>\n                                <!-- unapprove -->\n                                <a style=\"display:none;\" #modalOpen data-toggle=\"modal\" data-target=\"#addNote\"></a>\n                                <button (click)=\"openCancellationModal(p, i)\" [disabled]=\"admin?.admin_acl['Building Management']?.can_update==0\" *ngIf=\"p.status == 1\" class=\"action-icon\" title=\"Unapprove\"><img src=\"assets/img/tick-selected.png\" alt=\"img\"></button>\n                                <!-- approve -->\n                                <button [disabled]=\"admin?.admin_acl['Building Management']?.can_update==0\" *ngIf=\"p.status == 2 || p.status == 4\"  (click)=\"approveProject(p, 1);\" class=\"action-icon\" title=\"Approve\"><img src=\"assets/img/tick.png\" alt=\"img\"></button>\n                              </div>\n\n                            </td>\n                        </tr>\n                        <!-- <tr *ngIf=\"parameter.loading == false && total == 0\">\n                          <td colspan=\"10\">\n                              <img src=\"./../../../assets/img/404-error.png\">\n                          </td>\n                        </tr> -->\n                        \n                    </table>\n                    <div class=\"padding20 center\" *ngIf=\"parameter.loading == false && total == 0\">\n                        <img src=\"./../../../assets/img/404-error.png\">\n                    </div>\n                  </div>\n              </div>\n              <!-- <div class=\"btn-cont text-right marginT15\">\n                  <button class=\"btn btn-secondary\">View All</button>\n              </div> -->\n              <!-- <div class=\"spacer30\"></div>\n\n              <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls> -->\n\n            </div>\n            <div class=\"tab-pane container fade\" id=\"seller\">Seller tab on</div>\n        </div>\n      </div>\n\n    <div class=\"btn-cont text-right marginT15\" *ngIf=\"total\">\n        <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n    </div>\n  </div>\n\n\n\n<div class=\"modal animated\" id=\"addNote\">\n  <div class=\"modal-dialog fadeIndown\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header modal-header-new\">\n          <h4 class=\"modal-title\">Add Reason</h4>\n          <button style=\"display: none;\" type=\"button\" class=\"close\" data-dismiss=\"modal\" #modalClose>&times;</button>\n          <button type=\"button\" class=\"close\" (click)=\"closeModal()\">&times;</button>\n      </div>\n\n      <form class=\"form-horizontal form-model0P form-model-newP\" role=\"form\" ngNativeValidate #addForm=\"ngForm\" (ngSubmit)=\"rejectProject(4); addForm.reset();\">\n        <div class=\"modal-body modal-body-new\">\n          <div class=\"row\">\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                  <div class=\"form-group\">\n                    <textarea rows=\"4\" required class=\"form-control note\" name=\"reason\" [(ngModel)]=\"reason\"></textarea>\n                </div>\n              </div>\n            </div>\n            <div class=\"col-12\">\n                <div class=\"btn-cont text-right\">\n                    <button type=\"submit\" [disabled]=\"!addForm.valid\" class=\"btn btn-primary\">Add</button>\n                </div>\n            </div>\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/layout/projects/projects.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProjectsComponent = /** @class */ (function () {
    function ProjectsComponent(constant, route, admin) {
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
    ProjectsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.parameter.data_collector_id = params.id;
        });
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        this.parameter.dash_flag = 2;
        this.getCountries();
        this.getPropertyConfigurations();
        this.getListing();
    };
    ProjectsComponent.prototype.getListing = function () {
        var _this = this;
        this.parameter.loading = true;
        var input = JSON.parse(JSON.stringify(this.parameter));
        if (this.parameter.min) {
            input.min = __WEBPACK_IMPORTED_MODULE_4_moment__(this.parameter.min).format('YYYY-MM-DD');
        }
        else {
            delete input.min;
        }
        if (this.parameter.max) {
            input.max = __WEBPACK_IMPORTED_MODULE_4_moment__(this.parameter.max).format('YYYY-MM-DD');
        }
        else {
            delete input.max;
        }
        this.admin.postDataApi('projectHome', input).subscribe(function (success) {
            _this.items = success.data;
            _this.total = success.total_count;
            _this.parameter.loading = false;
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    ProjectsComponent.prototype.getCountries = function () {
        var _this = this;
        this.admin.postDataApi('getCountryLocality', {}).subscribe(function (r) {
            _this.location.countries = r['data'];
        });
    };
    ProjectsComponent.prototype.getPropertyConfigurations = function () {
        var _this = this;
        this.admin.postDataApi('getConfigurations', {}).subscribe(function (r) {
            _this.configurations = r['data'];
        });
    };
    // onCountryChange(id) {
    //   this.location.cities = []; this.parameter.city_id = '0';
    //   this.location.localities = []; this.parameter.locality_id = '0';
    //   if (!id || id === 0) {
    //     this.parameter.state_id = '0';
    //     return false;
    //   }
    //   this.parameter.country_id = id;
    //   const selectedCountry = this.location.countries.filter(x => x.id == id);
    //   this.location.states = selectedCountry[0].states;
    // }
    // onStateChange(id) {
    //   this.location.localities = []; this.parameter.locality_id = '0';
    //   if (!id || id === 0) {
    //     this.parameter.city_id = '0';
    //     return false;
    //   }
    //   this.parameter.state_id = id;
    //   const selectedState = this.location.states.filter(x => x.id == id);
    //   this.location.cities = selectedState[0].cities;
    // }
    // onCityChange(id) {
    //   if (!id || id == 0) {
    //     this.parameter.locality_id = '0';
    //     return false;
    //   }
    //   this.parameter.city_id = id;
    //   const selectedCountry = this.location.cities.filter(x => x.id == id);
    //   this.location.localities = selectedCountry[0].localities;
    // }
    // onLocalityChange(id) {
    //   if (!id || id == 0) {
    //     return false;
    //   }
    //   this.parameter.locality_id = id;
    //   // let selectedLocation = this.location.localities.filter(x=>x.id == id);
    //   // this.location.locality = selectedLocation[0];
    // }
    ProjectsComponent.prototype.onCountryChange = function (id) {
        this.parameter.country_id = '0';
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
    ProjectsComponent.prototype.onStateChange = function (id) {
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
    ProjectsComponent.prototype.onCityChange = function (id) {
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
    ProjectsComponent.prototype.onLocalityChange = function (id) {
        if (!id || id === '0') {
            return false;
        }
        this.parameter.locality_id = id;
    };
    ProjectsComponent.prototype.changeFlag = function (flag) {
        this.parameter.dash_flag = flag;
        if (flag === 5) {
            return false;
        }
        this.resetDates();
        this.getListing();
    };
    ProjectsComponent.prototype.toggleAndSort = function (sort_by, sort_by_order) {
        if (this[sort_by_order] == 1) {
            this[sort_by_order] = 2;
        }
        else {
            this[sort_by_order] = 1;
        }
        this.parameter.sort_by = sort_by;
        this.parameter.sort_by_order = sort_by_order;
        this.getListing();
    };
    ProjectsComponent.prototype.getPage = function (page) {
        this.parameter.page = page;
        this.getListing();
    };
    ProjectsComponent.prototype.block = function (item) {
        item.is_blocked = true;
        this.admin.postDataApi('blockProject', { building_id: item.id, flag: 1 }).subscribe(function (r) {
            swal('Success', 'Project blocked successfully.', 'success');
        }, function (error) {
            swal('Error', error.error.message, 'error');
        });
    };
    ProjectsComponent.prototype.unblock = function (item) {
        item.is_blocked = false;
        this.admin.postDataApi('blockProject', { building_id: item.id, flag: 0 }).subscribe(function (r) {
            swal('Success', 'Project unblocked successfully.', 'success');
        }, function (error) {
            swal('Error', error.error.message, 'error');
        });
    };
    ProjectsComponent.prototype.approveProject = function (item, status) {
        item.status = status;
        this.admin.postDataApi('approveProject', { building_id: item.id }).subscribe(function (r) {
            console.log(r);
            swal('Success', 'Project approved successfully.', 'success');
        }, function (error) {
            swal('Error', error.error.message, 'error');
        });
    };
    ProjectsComponent.prototype.rejectProject = function (status) {
        var _this = this;
        this.items[this.parameter.index].status = status;
        this.admin.postDataApi('rejectProject', { building_id: this.parameter.building_id, reason: this.reason }).subscribe(function (r) {
            console.log(r);
            swal('Success', 'Project unapproved successfully.', 'success');
            _this.closeModal();
        }, function (error) {
            swal('Error', error.error.message, 'error');
        });
    };
    ProjectsComponent.prototype.openCancellationModal = function (item, index) {
        this.parameter.building_id = item.id;
        this.parameter.index = index;
        this.modalOpen.nativeElement.click();
    };
    ProjectsComponent.prototype.closeModal = function () {
        this.modalClose.nativeElement.click();
    };
    ProjectsComponent.prototype.resetFilters = function () {
        this.onCountryChange('0');
        // this.parameter.country_id = '0';
        // this.location.states = []; this.parameter.state_id = '0';
        // this.location.cities = []; this.parameter.city_id = '0';
        // this.location.localities = []; this.parameter.locality_id = '0';
        this.parameter.is_selected = false;
        this.parameter.page = this.constant.p;
        this.parameter.dash_flag = 2;
        this.parameter.total = 0;
        // this.selectedUser = '';
        this.parameter.keyword = '';
        this.parameter.count_flag = 1;
        this.resetDates();
        this.getListing();
    };
    ProjectsComponent.prototype.resetDates = function () {
        this.parameter.min = '';
        this.parameter.max = '';
    };
    var _a, _b, _c, _d, _e;
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('modalOpen'),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _a : Object)
    ], ProjectsComponent.prototype, "modalOpen", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('modalClose'),
        __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _b : Object)
    ], ProjectsComponent.prototype, "modalClose", void 0);
    ProjectsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-projects',
            template: __webpack_require__("../../../../../src/app/layout/projects/projects.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/projects/projects.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__common_constants__["a" /* Constant */]) === "function" ? _c : Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["ActivatedRoute"]) === "function" ? _d : Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" ? _e : Object])
    ], ProjectsComponent);
    return ProjectsComponent;
}());

//# sourceMappingURL=projects.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/projects/projects.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_loading__ = __webpack_require__("../../../../ngx-loading/ngx-loading/ngx-loading.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__agm_core__ = __webpack_require__("../../../../@agm/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ngx_pagination__ = __webpack_require__("../../../../ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_tel_input__ = __webpack_require__("../../../../ng2-tel-input/ng2-tel-input.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_tel_input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_ng2_tel_input__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng_lazyload_image__ = __webpack_require__("../../../../ng-lazyload-image/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng_lazyload_image___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_ng_lazyload_image__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__projects_component__ = __webpack_require__("../../../../../src/app/layout/projects/projects.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__add_project_add_project_component__ = __webpack_require__("../../../../../src/app/layout/projects/add-project/add-project.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__guards_acl_user_guard__ = __webpack_require__("../../../../../src/app/guards/acl-user.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__project_details_project_details_component__ = __webpack_require__("../../../../../src/app/layout/projects/project-details/project-details.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__modules_shared_module__ = __webpack_require__("../../../../../src/app/modules/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pipes_numberex_pipe__ = __webpack_require__("../../../../../src/app/pipes/numberex.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_primeng_primeng__ = __webpack_require__("../../../../primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_primeng_primeng__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectsModule", function() { return ProjectsModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// third party libraries









// general components







// import { ImgPipe } from '../../pipes/img.pipe';
var routes = [
    { path: 'details/:project_id', component: __WEBPACK_IMPORTED_MODULE_12__project_details_project_details_component__["a" /* ProjectDetailsComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_11__guards_acl_user_guard__["a" /* AclUserGuard */]], data: { roles: ['Building Management', 'can_read', ''] } },
    { path: 'view-projects', component: __WEBPACK_IMPORTED_MODULE_9__projects_component__["a" /* ProjectsComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_11__guards_acl_user_guard__["a" /* AclUserGuard */]], data: { roles: ['Building Management', 'can_read', ''] } },
    { path: 'view-projects/:id', component: __WEBPACK_IMPORTED_MODULE_9__projects_component__["a" /* ProjectsComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_11__guards_acl_user_guard__["a" /* AclUserGuard */]], data: { roles: ['Building Management', 'can_read', ''] } },
    { path: 'add-project', component: __WEBPACK_IMPORTED_MODULE_10__add_project_add_project_component__["a" /* AddProjectComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_11__guards_acl_user_guard__["a" /* AclUserGuard */]], data: { roles: ['Building Management', 'can_create', ''] } },
    { path: 'edit-project/:id', component: __WEBPACK_IMPORTED_MODULE_10__add_project_add_project_component__["a" /* AddProjectComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_11__guards_acl_user_guard__["a" /* AclUserGuard */]], data: { roles: ['Building Management', 'can_update', ''] } }
];
var ProjectsModule = /** @class */ (function () {
    function ProjectsModule() {
    }
    ProjectsModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_router__["RouterModule"].forChild(routes),
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["ReactiveFormsModule"],
                __WEBPACK_IMPORTED_MODULE_4_ngx_loading__["a" /* LoadingModule */].forRoot({
                    animationType: __WEBPACK_IMPORTED_MODULE_4_ngx_loading__["b" /* ANIMATION_TYPES */].rectangleBounce,
                    primaryColour: '#00B96F'
                }),
                __WEBPACK_IMPORTED_MODULE_5__agm_core__["a" /* AgmCoreModule */].forRoot({
                    apiKey: 'AIzaSyCYv_zELZGVo2Ehzgp8eh8UeSIidhMCmH8',
                    libraries: ['drawing', 'places']
                }),
                __WEBPACK_IMPORTED_MODULE_7_ng2_tel_input__["Ng2TelInputModule"],
                __WEBPACK_IMPORTED_MODULE_6_ngx_pagination__["a" /* NgxPaginationModule */],
                __WEBPACK_IMPORTED_MODULE_15_primeng_primeng__["CalendarModule"],
                __WEBPACK_IMPORTED_MODULE_13__modules_shared_module__["a" /* SharedModule */],
                __WEBPACK_IMPORTED_MODULE_8_ng_lazyload_image__["LazyLoadImageModule"]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_9__projects_component__["a" /* ProjectsComponent */],
                __WEBPACK_IMPORTED_MODULE_10__add_project_add_project_component__["a" /* AddProjectComponent */],
                __WEBPACK_IMPORTED_MODULE_12__project_details_project_details_component__["a" /* ProjectDetailsComponent */],
                __WEBPACK_IMPORTED_MODULE_14__pipes_numberex_pipe__["a" /* NumberexPipe */],
            ]
        })
    ], ProjectsModule);
    return ProjectsModule;
}());

//# sourceMappingURL=projects.module.js.map

/***/ }),

/***/ "../../../../../src/app/models/addProject.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export CarpetAreas */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AddProjectModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Configuration; });
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

var AddProjectModel = /** @class */ (function () {
    function AddProjectModel() {
        this.id = '';
        this.building_id = '';
        this.name = '';
        this.for_rent = false;
        this.for_sale = true;
        this.floors = '';
        this.address = '';
        this.avg_price = '';
        this.images = [];
        this.building_images = [];
        this.description = '';
        this.amenities = [];
        this.lat = '';
        this.lng = '';
        this.custom_attributes = [];
        this.custom_values = [];
        this.configurations = [];
        this.developer = {
            id: '',
            name: '',
            email: '',
            country_code: '',
            dial_code: '',
            phone: '',
            logo: '',
            developer_image: ''
        };
        this.dev_countrycode = '';
        this.dev_dialcode = '';
        this.dev_email = '';
        this.dev_phone = '';
        this.dev_name = '';
        this.dev_logo = '';
        this.building_age = '';
        this.building_type = '';
        this.building_type_id = '';
        this.possession_status_id = '';
        this.launch_date = '';
        this.main_image = '';
    }
    return AddProjectModel;
}());

var Configuration = /** @class */ (function () {
    function Configuration() {
        this.base_price = '';
        this.building_id = '';
        this.carpet_area = '';
        this.config = {
            created_at: '',
            created_by: '',
            id: '',
            name: '',
            name_en: '',
            name_es: '',
            status: '',
            updated_at: ''
        };
        this.configuration_id = '';
        this.created_at = '';
        this.created_by = '';
        this.floor_map_image = '';
        this.id = '';
        this.other_images = [];
        this.images_files = [];
        this.images_path = [];
        this.images = [];
        this.updated_at = '';
    }
    return Configuration;
}());

//# sourceMappingURL=addProject.model.js.map

/***/ }),

/***/ "../../../../../src/app/pipes/numberex.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NumberexPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var NumberexPipe = /** @class */ (function () {
    function NumberexPipe() {
    }
    NumberexPipe.prototype.transform = function (value, args) {
        return 'XXX-XXX-XXXX';
    };
    NumberexPipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'numberex'
        })
    ], NumberexPipe);
    return NumberexPipe;
}());

//# sourceMappingURL=numberex.pipe.js.map

/***/ })

});
//# sourceMappingURL=5.chunk.js.map