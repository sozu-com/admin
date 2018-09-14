webpackJsonp([6],{

/***/ "../../../../../src/app/layout/projects/add-project/add-project.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".upload-cover-img{\n  background-size:100%;\n  background-repeat: no-repeat;\n}\nagm-map{height:300px;}\n\n.loc-tags-group li{\n  padding:0px;\n  background-color:transparent;\n  margin-right:0px;\n}\n.loc-tags-group li span{\n  background-color:rgba(223,223,223,0.5);\n  padding:8px 10px;\n  border-radius:3px;\n  margin-right:3px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/projects/add-project/add-project.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- <ngx-loading [show]=\"parameter.loading\"></ngx-loading> -->\n\n<div class=\"container-fluid\">\n  <div class=\"white-bg\">\n    <div class=\"page-title\">\n      <h3>Manage Projects</h3>\n    </div>\n\n    <div class=\"padding40 paddingT0\">\n\n      <form #f=\"ngForm\" name=\"add-project-form\" ngNativeValidate>\n        <div class=\"row\">\n          <div class=\"col-md-5 col-sm-12 col-12\">\n            <div class=\"form-group-3\">\n              <label>Add Images</label>\n              <div class=\"upload-cover-img\" [style.background-image]=\"image1\">\n                <!-- <img *ngIf=\"url\" [src]=\"url\" height=\"200\"> -->\n                <div *ngIf=\"!image1\" class=\"upload-caption\">\n                  <p class=\"green-color marginT30\">+Upload Cover image for the project</p>\n                  <p>JPG or PNG. Image size should be 1920 × 1080 pixels (for HiDPI displays).</p>\n                </div>\n                <input type=\"file\" name=\"cover_image\" accept=\"image/*\" (change)=\"onSelectFile1($event)\">\n              </div>\n            </div>\n            <div class=\"add-project-img-more\" [style.background-image]=\"image2\">\n              <div class=\"upload-caption\">\n                <p class=\"green-color marginT30\" data-toggle=\"modal\" data-target=\"#add-more-img\">+ Add more images</p>\n              </div>\n            </div>\n          </div>\n          <div class=\"col-md-7 col-sm-12 col-12\">\n            <div class=\"row\">\n              <div class=\"col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                  <label>Name of Building</label>\n                  <input class=\"form-control\" type=\"text\" [(ngModel)]=\"model.name\" name=\"name\" placeholder=\"Enter name of building\" required>\n                </div>\n              </div>\n              <div class=\"col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                  <label>Where it is located?</label>\n                  <input placeholder=\"search for location\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"off\" type=\"text\" class=\"form-control\" #search (input)=\"loadPlaces()\" name=\"address\" [(ngModel)]=\"model.address\" required>\n                </div>\n              </div>\n            </div>\n            <div class=\"form-group-3\">\n              <label>Location Pin on Map</label>\n              <div style=\"width: 100%;\">\n                <agm-map [latitude]=\"latitude\" [longitude]=\"longitude\" [scrollwheel]=\"false\" (mapClick)=\"placeMarker($event)\" [zoom]=\"zoom\">\n                  <agm-marker [latitude]=\"latitude\" [longitude]=\"longitude\"></agm-marker>\n                </agm-map>\n              </div>\n              <p class=\"p13\">Verify these two details provided initially, Proceed further if correct or edit the details if wrong and then proceed ahead.</p>\n            </div>\n            <div class=\"row\">\n              <div class=\"col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                  <label>Building Age</label>\n                  <input class=\"form-control\" [(ngModel)]=\"model.building_age\" type=\"number\" name=\"building_age\" required />\n                </div>\n              </div>\n              <div class=\"col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                  <label>Building type</label>\n                  <select [(ngModel)]=\"model.building_type_id\" class=\"form-control\" name=\"building_type_id\" required>\n                          <option *ngFor=\"let s of all_building_types\" [value]=\"s.id\">\n                            {{s.name}}\n                          </option>\n                       </select>\n                </div>\n              </div>\n              <div class=\"col-12\">\n                <div class=\"form-group-3\">\n                  <label>Descriptuion</label>\n                  <textarea [(ngModel)]=\"model.description\" name=\"model_description\" class=\"form-control\">\n                       </textarea>\n                </div>\n              </div>\n              <div class=\"col-md-4 col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                  <label>Possession status</label>\n                  <select [(ngModel)]=\"model.possession_status_id\" class=\"form-control\" name=\"possession_status_id\">\n                          <option *ngFor=\"let s of all_possession_statuses\" [value]=\"s.id\">\n                            {{s.name}}\n                          </option>\n                       </select>\n                </div>\n              </div>\n              <div class=\"col-md-4 col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                  <label>Floors</label>\n                  <input class=\"form-control\" [ngModel]=\"model.floors\" type=\"number\" name=\"building_floors\" required>\n                </div>\n              </div>\n              <div class=\"col-md-4 col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                  <label>Average Price</label>\n                  <input class=\"form-control\" [ngModel]=\"model.avg_price\" type=\"number\" name=\"building_avg_price\" required>\n                </div>\n              </div>\n              <div class=\"col-sm-12 col-12\">\n                <div class=\"form-group-3\">\n                  <label>Enter Custom Parameter and Value</label>\n                  <table class=\"table-responsive\">\n                    <thead>\n                      <tr>\n                        <td style=\"width:43%\">Parameter Name</td>\n                        <td style=\"width:43%\">Parameter Value</td>\n                        <td style=\"width:20%\"></td>\n                      </tr>\n                    </thead>\n                    <tbody>\n                      <tr *ngFor=\"let c of model.custom_attributes ;let i=index;\">\n                        <td>\n                          <input [(ngModel)]=\"c.name\" class=\"form-control\" name=\"name[{{i}}]\" type=\"text\" required/>\n                        </td>\n                        <td>\n                          <input [(ngModel)]=\"c.value\" class=\"form-control\" name=\"value[{{i}}]\" type=\"text\" required />\n                        </td>\n                        <td>\n                          <a (click)=\"model.custom_attributes.splice(i,1)\"><img src=\"assets/img/remove-icon.png\" /></a>\n                        </td>\n                      </tr>\n\n                    </tbody>\n                  </table>\n                  <br/>\n                  <div class=\"btn-cont\">\n                    <a (click)=\"model.custom_attributes.push({name:'',value:''})\" class=\"btn-third btn\" href=\"javascript://\">Add</a>\n                  </div>\n                  <br/>\n\n                </div>\n              </div>\n\n              <div class=\"col-12\">\n                <div class=\"form-group-3 marginB0\">\n                  <label>Amenities available</label>\n                  <ul class=\"loc-tags-group\">\n                    <li *ngFor=\"let a of all_amenities\"><span *ngIf=\"a.selected==true\">{{a.name}}</span></li>\n                  </ul>\n                </div>\n              </div>\n              <div class=\"col-12\">\n                <div class=\"form-group-3 marginT15\">\n                  <div class=\"btn-cont\">\n                    <a class=\"btn-third btn btn-block\" data-toggle=\"modal\" data-target=\"#amenities\" href=\"javascript://\">Add More</a>\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-12\">\n                <div class=\"form-group-3\" style=\"width: 100%;\">\n                  <label class=\"float-left marginB0\">Configuration</label>\n                  <label class=\"float-right marginB0\"><a class=\"edit-del\" href=\"javascript://\">Edit/Delete</a></label>\n                  <div class=\"clearfix\"></div>\n                  <hr>\n                  <div *ngFor=\"let c of model.configurations; let index=index\" class=\"configur\">\n                    <div class=\"float-right marginB0\"><a class=\"edit-del\" href=\"javascript://\">\n                           <span (click)=\"editConfiguration(c)\">Edit</span>/\n                           <span (click)=\"deleteConfiguration(index);\">Delete</span></a>\n                    </div>\n                    <div class=\"row\">\n                      <div class=\"col-md-6 col-12\">\n                        <p class=\"p18\">{{c.config.name}}</p>\n                        <label>Images</label>\n                        <div class=\"image-group\">\n                          <div class=\"fig-block\">\n                            <img class=\"img-fluid\" [src]=\"c.floor_map_image\" onerror='this.src=\"http://via.placeholder.com/48x48\"' alt=\"img\">\n                          </div>\n                        </div>\n                      </div>\n                      <div class=\"col-md-6 col-12\">\n                        <p class=\"p14 text-right\">Average Price</p>\n                        <h3 class=\"text-right\">{{c.base_price}} per sq/ft.</h3>\n                      </div>\n                      <div class=\"col-12\">\n                        <hr>\n                      </div>\n                    </div>\n                  </div>\n\n                  <div>\n                    <div class=\"form-group-3 marginT15\">\n                      <div class=\"btn-cont\">\n                        <a (click)=\"openConfigPopupFun()\" class=\"btn-third btn btn-block\" href=\"javascript://\">Add New</a>\n                      </div>\n                    </div>\n                  </div>\n\n                </div>\n              </div>\n            </div>\n            <div class=\"row\">\n              <div class=\"col-12\">\n                <div class=\"page-title paddingL0\">\n                  <h3>Developer Info</h3>\n                </div>\n              </div>\n\n              <div class=\"col-md-6 col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                  <label>Name</label>\n                  <input [(ngModel)]=\"model.developer.name\" class=\"form-control\" type=\"text\" name=\"assaas\">\n                </div>\n              </div>\n              <div class=\"col-md-6 col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                  <label>Email</label>\n                  <input [(ngModel)]=\"model.developer.email\" class=\"form-control\" type=\"text\" name=\"assaas\">\n                </div>\n              </div>\n              <div class=\"col-md-6 col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                  <label>Phone Number</label>\n                  <input minlength=\"6\" maxlength=\"16\" autocomplete=\"off\" type=\"text\" class=\"form-control\" id=\"phone\" required minlength=\"1\" [(ngModel)]=\"model.developer.phone\" name=\"phone\" ng2TelInput [ng2TelInputOptions]=\"initialCountry\" (countryChange)=\"onCountryChange($event)\"\n                  />\n\n                </div>\n              </div>\n\n              <div class=\"col-12\">\n                <div class=\"form-group-3\">\n                  <label>Logo</label>\n\n                  <div class=\"add-project-img-more\">\n                    <input type=\"file\" name=\"sasdsda\" (change)=\"fileUploader($event,'dev_logo',model)\">\n                    <img class=\"img-fluid\" *ngIf=\"FU.dev_logo\" [src]=\"FU.dev_logo\">\n                    <div class=\"upload-caption\">\n                      <p class=\"green-color\">+ Add more images</p>\n                    </div>\n                  </div>\n\n                </div>\n              </div>\n\n              <div class=\"col-12\">\n\n                <div class=\"btn-cont text-right\">\n                  <hr>\n                  <button [disabled]=\"!f.valid\" (click)=\"addProject()\" class=\"btn-primary btn\">Submit</button>\n                </div>\n\n              </div>\n\n\n\n            </div>\n          </div>\n        </div>\n      </form>\n    </div>\n\n  </div>\n</div>\n\n<!-- Amanities model -->\n<div class=\"modal\" id=\"amenities\" style=\"display: none;\" aria-hidden=\"true\">\n  <div class=\"modal-dialog\">\n    <div class=\"modal-content amenities-popup\">\n      <div class=\"modal-header popup-header\">\n        <h4 class=\"modal-title\">Amenities</h4>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\">×</button>\n      </div>\n      <div class=\"modal-body\">\n        <label *ngFor=\"let a of all_amenities; \" (click)=\"a.selected = !a.selected\" class=\"cust-check-bx2\">\n             {{a.name}}\n           <span *ngIf=\"a.selected==true\" class=\"checkmark open\"></span>\n           </label>\n\n      </div>\n      <div class=\"modal-footer\">\n        <div class=\"btn-cont\">\n          <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\">Save</button>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n\n<!-- Add More img -->\n<div class=\"modal add-more-popup\" id=\"add-more-img\">\n  <div class=\"modal-dialog modal-lg\">\n    <div class=\"modal-content\">\n\n      <!-- Modal Header -->\n      <div class=\"modal-header\">\n        <h4 class=\"modal-title\">Images</h4>\n        <button type=\"button\" style=\"display: none;\" class=\"close\" data-dismiss=\"modal\" #modalClose>&times;</button>\n        <button type=\"button\" class=\"close\" (click)=\"closeModal()\">&times;</button>\n      </div>\n\n      <!-- Modal body -->\n      <div class=\"modal-body\">\n        <div class=\"uploaded-img-block\">\n          <div class=\"uploaded-img\" *ngFor=\"let imageUrl of url2; let iu=index\">\n            <a class=\"remove\" (click)=\"removeImage(iu)\">\n                    <img src=\"assets/img/remove-icon.png\" alt=\"img\">\n                  </a>\n            <img *ngIf=\"imageUrl\" class=\"u-img\" [src]=\"imageUrl\" alt=\"img\">\n            <img *ngIf=\"!imageUrl\" class=\"u-img\" src=\"http://via.placeholder.com/300x300\" alt=\"img\">\n          </div>\n        </div>\n        <div class=\"add-more-images\">\n          <input type=\"file\" name=\"add-more\" multiple max=\"6\" accept=\"image/*\" (change)=\"onSelectFile2($event)\">\n          <span>+ Add more images</span>\n        </div>\n\n      </div>\n\n      <!-- Modal footer -->\n      <div class=\"modal-footer btn-cont\">\n        <button type=\"button\" (click)=\"saveImages()\" class=\"btn btn-primary\" data-dismiss=\"modal\">Submit</button>\n      </div>\n\n    </div>\n  </div>\n</div>\n\n\n<a #openConfigPopup class=\"btn-third btn btn-block\" data-target=\"#add-config\" data-toggle=\"modal\"></a>\n<div class=\"modal\" id=\"add-config\">\n  <div class=\"modal-dialog modal-lg\">\n    <div class=\"modal-content add-config-popup\">\n\n      <div class=\"modal-header popup-header\">\n        <h4 class=\"modal-title\">Add Configuration</h4>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #closeConfigPopup>×</button>\n      </div>\n      <div *ngIf=\"new_config\" class=\"modal-body\">\n        <div class=\"row\">\n          <div class=\"col-sm-6 col-12\">\n            <div class=\"form-group-3\">\n              <label>Title</label>\n              <select class=\"form-control\" [(ngModel)]=\"new_config.configuration_id\" (change)=\"selectConfiguration($event.target.value,new_config)\" name=\"config_name\">\n                           <option *ngFor=\"let c of all_configurations\" value=\"{{c.id}}\" daa-model=\"c\">{{c.name}}</option>\n                        </select>\n            </div>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"col-sm-6 col-12\">\n            <div class=\"form-group-3\">\n              <label>Carpet area (sqft)</label>\n              <input class=\"form-control\" [(ngModel)]=\"new_config.carpet_area\" type=\"number\" name=\"base_price\">\n            </div>\n          </div>\n          <div class=\"col-sm-6 col-12\">\n            <div class=\"form-group-3\">\n              <label>Base Price</label>\n              <input class=\"form-control\" [(ngModel)]=\"new_config.base_price\" type=\"number\" name=\"base_price\">\n            </div>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"col-12\">\n\n\n            <div class=\"form-group-3\">\n              <label>Add Images</label>\n              <div class=\"upload-cover-img\">\n                <div class=\"upload-caption\">\n                  <div class=\"fig-block\">\n                    <img class=\"img-fluid\" *ngIf=\"new_config.floor_map_image\" [src]=\"new_config.floor_map_image\" onerror='this.src=\"assets/img/placeholder-img.png\"' />\n                    <p class=\"green-color marginT30\">+Upload Cover image for the project</p>\n                    <p>JPG or PNG. Imae size should be 1920 × 1080 pixels (for HiDPI displays).</p>\n                  </div>\n                  <input type=\"file\" name=\"floor_map_image\" (change)=\"fileUploader($event,'floor_map_image',new_config)\">\n                </div>\n              </div>\n\n              <div class=\"uploaded-img-block\">\n                <div class=\"uploaded-img\" *ngFor=\"let imageUrl of new_config.images_path; let iu=index\">\n                  <a class=\"remove\" (click)=\"removeImageMulti(iu)\">\n                               <img src=\"assets/img/remove-icon.png\" alt=\"img\">\n                             </a>\n                  <img *ngIf=\"imageUrl\" class=\"u-img\" [src]=\"imageUrl\" alt=\"img\">\n                  <img *ngIf=\"!imageUrl\" class=\"u-img\" src=\"http://via.placeholder.com/300x300\" alt=\"img\">\n                </div>\n              </div>\n\n              <div class=\"add-project-img-more\">\n                <input type=\"file\" name=\"add-more-images\" multiple max=\"6\" accept=\"image/*\" (change)=\"fileUploaderMulti($event)\">\n                <div class=\"upload-caption\">\n                  <p class=\"green-color\">+ Add more images</p>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class=\"modal-footer\">\n          <div class=\"btn-cont\">\n            <button (click)=\"addNewConfig()\" type=\"button\" class=\"btn btn-primary\">Save</button>\n          </div>\n        </div>\n\n      </div>\n    </div>\n  </div>\n"

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
        this.new_config_booleon = false;
        this.FU = {};
        this.initialCountry = { initialCountry: 'mx' };
    }
    AddProjectComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.id = params.id;
            if (_this.id) { /* if id exists edit mode */
                _this.admin.postDataApi('getProjectById', { building_id: _this.id }).subscribe(function (r) {
                    _this.model = JSON.parse(JSON.stringify(r.data));
                    console.log(_this.model);
                    _this.image1 = _this.sanitization.bypassSecurityTrustStyle("url(" + _this.model.main_image + ")");
                    _this.image2 = _this.sanitization.bypassSecurityTrustStyle("url(" + _this.model.images[0].image + ")");
                    _this.model.custom_attributes = _this.model.custom_values;
                    _this.FU.dev_logo = _this.model.developer.developer_image;
                    _this.admin.postDataApi('getAmenities', {}).subscribe(function (res) {
                        _this.all_amenities = res.data.map(function (item) { item.selected = false; return item; });
                        _this.selected_amenities = _this.all_amenities.map(function (item) {
                            if (_this.model.amenities.find(function (am) { return am.id === item.id; })) {
                                item.selected = true;
                            }
                            return item;
                        });
                    });
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
    AddProjectComponent.prototype.onSelectFile1 = function (event) {
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
                // this.parameter.loading = false;
            }
            // error => {
            //   console.log(error);
            //   this.parameter.loading = false;
            //   swal('Error', error.message, 'error');
            // }
            );
            // this.model.cover_image = event.target.files[0];
            reader.readAsDataURL(event.target.files[0]);
        }
    };
    AddProjectComponent.prototype.onSelectFile2 = function (event) {
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
    AddProjectComponent.prototype.closeModal = function () {
        this.modalClose.nativeElement.click();
        this.image2 = '';
        this.url2 = [];
        this.imageEvent = [];
        this.model.images = [];
    };
    AddProjectComponent.prototype.removeImage = function (index) {
        this.url2.splice(index, 1);
        this.imageEvent.splice(index, 1);
        this.model.images.splice(index, 1);
        console.log('----------', this.url2, this.imageEvent);
    };
    AddProjectComponent.prototype.removeImageMulti = function (index) {
        this.new_config.images_path.splice(index, 1);
        this.new_config.images.splice(index, 1);
    };
    AddProjectComponent.prototype.saveImages = function () {
        var _this = this;
        console.log('----------', this.url2, this.imageEvent);
        var input = new FormData();
        var _loop_2 = function (index) {
            input.append('image', this_1.imageEvent[index]);
            this_1.admin.postDataApi('saveImage', input)
                .subscribe(function (success) {
                console.log('successimage' + index, success);
                _this.model.images.push(success.data.image);
                _this.model.building_images.push(success.data.image);
                // this.parameter.loading = false;
            }
            // error => {
            //   console.log(error);
            //   this.parameter.loading = false;
            //   swal('Error', error.message, 'error');
            // }
            );
        };
        var this_1 = this;
        for (var index = 0; index < this.imageEvent.length; index++) {
            _loop_2(index);
        }
    };
    AddProjectComponent.prototype.fileUploader = function (event, key, model) {
        var _this = this;
        if (key === void 0) { key = '0'; }
        // this.parameter.loading = true;
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                _this.url = e.target.result;
            };
            var input = new FormData();
            input.append('image', event.target.files[0]);
            this.admin.postDataApi('saveImage', input)
                .subscribe(function (success) {
                console.log('successimage', success);
                // this.parameter.loading = false;
                _this.FU[key] = success.data.image;
                model[key] = success.data.image;
            }
            // error => {
            //   console.log(error);
            //   this.parameter.loading = false;
            //   swal('Error', error.message, 'error');
            // }
            );
            // this.model.images = event.target.files;
            reader.readAsDataURL(event.target.files[0]);
        }
    };
    AddProjectComponent.prototype.fileUploaderMulti = function (event) {
        var _this = this;
        if (event.target.files && event.target.files[0]) {
            if (this.new_config.images_path === 6 || event.target.files.length > 6) {
                swal('Limit exceeded', 'You can upload maximum of 6 images', 'error');
            }
            else {
                var _loop_3 = function (index) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        _this.new_config.images_files.push(event.target.files[index]);
                        _this.new_config.images_path.push(e.target.result);
                    };
                    reader.readAsDataURL(event.target.files[index]);
                };
                for (var index = 0; index < event.target.files.length; index++) {
                    _loop_3(index);
                }
            }
        }
    };
    AddProjectComponent.prototype.saveImagesConfig = function () {
        var _this = this;
        this.new_config.images = [];
        var input = new FormData();
        for (var index = 0; index < this.new_config.images_files.length; index++) {
            input.append('image', this.new_config.images_files[index]);
            // this.parameter.loading = true;
            this.admin.postDataApi('saveImage', input)
                .subscribe(function (success) {
                console.log(success.data.image);
                _this.new_config.images.push(success.data.image);
                // this.parameter.loading = false;
            }
            // error => {
            //   console.log(error);
            //   this.parameter.loading = false;
            //   swal('Error', error.message, 'error');
            // }
            );
        }
        delete this.new_config.images_files;
        delete this.new_config.images_path;
        // this.model.configurations.push(this.new_config);
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
                    console.log(place);
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
        this.latitude = $event.coords.lat;
        this.longitude = $event.coords.lng;
        this.getGeoLocation(this.latitude, this.longitude);
        console.log($event.coords.lat);
        console.log($event);
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
    AddProjectComponent.prototype.openConfigPopupFun = function () {
        this.openConfigPopup.nativeElement.click();
        this.new_config = new __WEBPACK_IMPORTED_MODULE_5__models_addProject_model__["a" /* Configuration */];
        this.new_config_booleon = true;
    };
    AddProjectComponent.prototype.selectConfiguration = function (id, parentModel) {
        var childModel = this.all_configurations.filter(function (r) { return r.id === id; });
        parentModel.config = childModel[0];
        console.log(parentModel);
    };
    AddProjectComponent.prototype.editConfiguration = function (config) {
        // console.log(this.new_config);
        console.log(config);
        this.new_config = config;
        // this.new_config.images = [];
        this.new_config.images_files = [];
        this.new_config.images_path = [];
        // for(let key in config){
        //   this.new_config[key] = config[key];
        // }
        this.openConfigPopup.nativeElement.click();
    };
    AddProjectComponent.prototype.deleteConfiguration = function (index) {
        this.model.configurations.splice(index, 1);
    };
    AddProjectComponent.prototype.addNewConfig = function () {
        this.closeConfigPopup.nativeElement.click();
        this.saveImagesConfig();
        console.log(this.new_config);
        // this.model.configurations.push(this.new_config);
        // this.new_config = new Configuration;
        if (this.new_config_booleon === true) {
            this.model.configurations.push(this.new_config);
            this.new_config_booleon = false;
        }
    };
    AddProjectComponent.prototype.onCountryChange = function (obj) {
        this.model.dev_countrycode = obj.iso2;
        this.model.dev_dialcode = '+' + obj.dialCode;
    };
    AddProjectComponent.prototype.addProject = function () {
        this.model.dev_name = this.model.developer.name;
        this.model.dev_email = this.model.developer.email;
        this.model.dev_phone = this.model.developer.phone;
        // this.model.dev_logo = this.model.developer.logo;
        // this.model.dev_countrycode = this.model.developer.name;
        this.model.amenities = this.all_amenities.filter(function (op) { if (op.selected === true) {
            return op;
        } }).map(function (op) { return op.id; });
        console.log(this.model);
        if (!this.id) {
            delete this.model.id;
        }
        // console.log(this.model);
        this.admin.postDataApi('addProject', this.model).subscribe(function (success) {
            console.log(success);
            swal('Success', success.message, 'success');
        }
        // error => {
        //   console.log(error);
        //   swal('Error', error.message, 'error');
        // }
        );
    };
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('modalClose'),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _a : Object)
    ], AddProjectComponent.prototype, "modalClose", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('mapDiv'),
        __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _b : Object)
    ], AddProjectComponent.prototype, "mapDiv", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('search'),
        __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _c : Object)
    ], AddProjectComponent.prototype, "searchElementRef", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('openConfigPopup'),
        __metadata("design:type", typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _d : Object)
    ], AddProjectComponent.prototype, "openConfigPopup", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('closeConfigPopup'),
        __metadata("design:type", typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" ? _e : Object)
    ], AddProjectComponent.prototype, "closeConfigPopup", void 0);
    AddProjectComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-add-project',
            template: __webpack_require__("../../../../../src/app/layout/projects/add-project/add-project.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/projects/add-project/add-project.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_5__models_addProject_model__["b" /* AddProjectModel */], __WEBPACK_IMPORTED_MODULE_7__common_constants__["a" /* Constant */]]
        }),
        __metadata("design:paramtypes", [typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_5__models_addProject_model__["b" /* AddProjectModel */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__models_addProject_model__["b" /* AddProjectModel */]) === "function" ? _f : Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */]) === "function" ? _g : Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* ActivatedRoute */]) === "function" ? _h : Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === "function" ? _j : Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"]) === "function" ? _k : Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["c" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["c" /* DomSanitizer */]) === "function" ? _l : Object, typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_6__agm_core__["b" /* MapsAPILoader */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__agm_core__["b" /* MapsAPILoader */]) === "function" ? _m : Object, typeof (_o = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]) === "function" ? _o : Object, typeof (_p = typeof __WEBPACK_IMPORTED_MODULE_7__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__common_constants__["a" /* Constant */]) === "function" ? _p : Object])
    ], AddProjectComponent);
    return AddProjectComponent;
}());

//# sourceMappingURL=add-project.component.js.map

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

module.exports = "<p>\n  projects works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/layout/projects/projects.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
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
    function ProjectsComponent() {
    }
    ProjectsComponent.prototype.ngOnInit = function () {
    };
    ProjectsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-projects',
            template: __webpack_require__("../../../../../src/app/layout/projects/projects.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/projects/projects.component.css")]
        }),
        __metadata("design:paramtypes", [])
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__projects_component__ = __webpack_require__("../../../../../src/app/layout/projects/projects.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__add_project_add_project_component__ = __webpack_require__("../../../../../src/app/layout/projects/add-project/add-project.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ngx_loading__ = __webpack_require__("../../../../ngx-loading/ngx-loading/ngx-loading.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__agm_core__ = __webpack_require__("../../../../@agm/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_tel_input__ = __webpack_require__("../../../../ng2-tel-input/ng2-tel-input.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_tel_input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_ng2_tel_input__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectsModule", function() { return ProjectsModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var routes = [
    { path: 'view-projects', component: __WEBPACK_IMPORTED_MODULE_2__projects_component__["a" /* ProjectsComponent */] },
    { path: 'add-project', component: __WEBPACK_IMPORTED_MODULE_4__add_project_add_project_component__["a" /* AddProjectComponent */] },
    { path: 'edit-project/:id', component: __WEBPACK_IMPORTED_MODULE_4__add_project_add_project_component__["a" /* AddProjectComponent */] }
];
var ProjectsModule = /** @class */ (function () {
    function ProjectsModule() {
    }
    ProjectsModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* RouterModule */].forChild(routes),
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["h" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["ReactiveFormsModule"],
                __WEBPACK_IMPORTED_MODULE_6_ngx_loading__["a" /* LoadingModule */].forRoot({
                    animationType: __WEBPACK_IMPORTED_MODULE_6_ngx_loading__["b" /* ANIMATION_TYPES */].rectangleBounce,
                    primaryColour: '#00B96F'
                }),
                __WEBPACK_IMPORTED_MODULE_7__agm_core__["a" /* AgmCoreModule */].forRoot({
                    apiKey: 'AIzaSyCYv_zELZGVo2Ehzgp8eh8UeSIidhMCmH8',
                    libraries: ['drawing', 'places']
                }),
                __WEBPACK_IMPORTED_MODULE_8_ng2_tel_input__["Ng2TelInputModule"]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__projects_component__["a" /* ProjectsComponent */],
                __WEBPACK_IMPORTED_MODULE_4__add_project_add_project_component__["a" /* AddProjectComponent */]
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
        this.custom_attributes = [
            {
                name: '',
                value: ''
            }
        ];
        this.custom_values = [
            {
                name: '',
                value: ''
            }
        ];
        this.configurations = [];
        this.developer = {
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

/***/ })

});
//# sourceMappingURL=6.chunk.js.map