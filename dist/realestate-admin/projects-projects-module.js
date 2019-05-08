(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["projects-projects-module"],{

/***/ "./src/app/layout/projects/add-project/add-project.component.css":
/*!***********************************************************************!*\
  !*** ./src/app/layout/projects/add-project/add-project.component.css ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".upload-cover-img{\n  background-size:100%;\n  background-repeat: no-repeat;\n}\nagm-map{height:300px;}\n.loc-tags-group li{\n  padding:0px;\n  background-color:transparent;\n  margin-right:0px;\n  margin-bottom: 3px;\n}\n.loc-tags-group li span{\n  background-color:rgba(223,223,223,0.5);\n  padding: 8px 10px 8px 16px;\n  border-radius:3px;\n  margin-right:3px;\n  display: inline-block;\n}\n.loc-tags-group li span b{\n  -webkit-filter:opacity(50%);\n          filter:opacity(50%);\n  cursor: pointer;\n}\n.loc-tags-group li span b:hover{\n  -webkit-filter:opacity(100%);\n          filter:opacity(100%);\n}\n"

/***/ }),

/***/ "./src/app/layout/projects/add-project/add-project.component.html":
/*!************************************************************************!*\
  !*** ./src/app/layout/projects/add-project/add-project.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n\n<div class=\"container-fluid\">\n  <div class=\"white-bg\">\n    <div class=\"page-title\">\n      <h3>Add Project</h3>\n    </div>\n\n    <div class=\"padding40 paddingT0\">\n\n      <form #f=\"ngForm\" name=\"add-project-form\" ngNativeValidate>\n        <div class=\"row\">\n          <div class=\"col-md-5 col-sm-12 col-12\">\n            <div class=\"form-group-3\">\n              <label>Add Images</label>\n              <div class=\"upload-cover-img\">\n                <img [src]=\"file1.image\" onerror=\"this.src='assets/img/placeholder.png'\" class=\"img-fluid\">\n                <div *ngIf=\"!file1.image\" class=\"upload-caption\">\n                  <p class=\"green-color marginT30\">+Upload Cover image for the project</p>\n                  <p>JPG or PNG. Image size should be 1920 × 1080 pixels (for HiDPI displays).</p>\n                </div>\n                <input type=\"file\" name=\"cover_image\" accept=\"image/*\" (change)=\"file1.onSelectFile($event,true)\">\n              </div>\n            </div>\n\n            <!-- more images -->\n            <hr>\n            <div class=\"form-group-3\">\n              <label>Add More Images</label>\n              <div class=\"add-project-img-more marginT0\">\n                <img *ngIf=\"model.images?.length>0\" [src]=\"model.images[0]?.image\" onerror=\"this.src='assets/img/placeholder.png'\" class=\"img-fluid\">\n                <div class=\"upload-caption\">\n                  <p *ngIf=\"model?.images?.length > 1\" class=\"number\" (click)=\"modelOpenFun()\">+{{model?.images?.length-1}}</p>\n                  <p *ngIf=\"model?.images?.length <= 1\" class=\"green-color\"  (click)=\"modelOpenFun()\">+ Add more images</p>\n                </div>\n              </div>\n            </div>\n            <hr>\n            <div class=\"form-group-3\">\n              <label>Add 360<span>&#176;</span> Images</label>\n              <div class=\"add-project-img-more marginT0\">\n                <img *ngIf=\"model.images360?.length>0\" [src]=\"model.images360[0]?.image\" onerror=\"this.src='assets/img/placeholder.png'\" class=\"img-fluid\">\n                <div class=\"upload-caption\">\n                  <p *ngIf=\"model?.images360?.length > 1\" class=\"number\" (click)=\"modelOpen360ImgFun()\">+{{model?.images360?.length-1}}</p>\n                  <p *ngIf=\"model?.images360?.length <= 1\" class=\"green-color\"  (click)=\"modelOpen360ImgFun()\">+ Add more 360<span>&#176;</span> images</p>\n                </div>\n              </div>\n            </div>\n            <hr>\n            <div class=\"form-group-3\">\n              <label>Add Video</label>\n              <div class=\"add-project-img-more marginT0\">\n                <video style=\"width: 100%; height: 100%; display: none;\" onerror=\"this.src='assets/img/placeholder.png'\" src=\"{{videoSrc}}\" class=\"video55 floor-plan\" autoplay type=\"video/mp4\" controls></video>\n                \n                <!-- if want to give play option -->\n                <img *ngIf=\"model?.videos && model?.videos[0]\" class=\"ui bordered small image\" [src]=\"model?.videos[0]?.thumb\" onerror=\"this.src='assets/img/placeholder.png'\">\n                <!-- <img *ngIf=\"model.videoLoader==false\" class=\"vid-icon\" (click)=\"playVideo(i)\" src=\"assets/img/play-button.png\" /> -->\n  \n                <canvas width=\"800\" height=\"600\" id=\"canvas\"></canvas>\n                <div *ngIf=\"model.videoLoader\" class=\"loaderr\"></div>\n                <input type=\"file\" name=\"\" accept=\"video/*\" (change)=\"showCanvas($event)\">\n                <div class=\"upload-caption\">\n                  <p class=\"green-color marginT30\">+ Add Video</p>\n                </div>\n              </div>\n            </div>\n            \n           </div>\n          <div class=\"col-md-7 col-sm-12 col-12\">\n            <div class=\"row\">\n              <div class=\"col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                  <label>Name of the Building <span class=\"color-red\">*</span></label>\n                  <input class=\"form-control\" type=\"text\" [(ngModel)]=\"model.name\" name=\"name\" placeholder=\"Enter name of building\" autocomplete=\"off\" required>\n                </div>\n              </div>\n\n\n              \n\n\n              <div class=\"col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                  <label>Location\n                    <span class=\"color-red\">*</span>\n                  </label>\n                  <input placeholder=\"Search for location\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"off\" type=\"text\" class=\"form-control\" #search (input)=\"loadPlaces()\" name=\"address\" [(ngModel)]=\"model.address\" autocomplete=\"off\">\n                </div>\n              </div>\n            </div>\n            <div class=\"form-group-3\">\n              <label>Location Pin on Map\n                <!-- <span class=\"color-red\">*</span> -->\n              </label>\n              <div style=\"width: 100%;\">\n                <agm-map [latitude]=\"latitude\" [longitude]=\"longitude\" [scrollwheel]=\"false\" (mapClick)=\"placeMarker($event)\" [zoom]=\"zoom\">\n                  <agm-marker [latitude]=\"latitude\" [longitude]=\"longitude\"></agm-marker>\n                </agm-map>\n              </div>\n            </div>\n            <div class=\"row\">\n              <div class=\"col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                  <label>Building Age (in yrs)\n                    <!-- <span class=\"color-red\">*</span> -->\n                  </label>\n                  <input placeholder=\"Building age\" min=\"0\" class=\"form-control\" [(ngModel)]=\"model.building_age\" type=\"number\" name=\"building_age\"/>\n                </div>\n              </div>\n              <div class=\"col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                  <label>Building Type\n                    <!-- <span class=\"color-red\">*</span> -->\n                  </label>\n                  <select [(ngModel)]=\"model.building_type_id\" class=\"form-control\" name=\"building_type_id\">\n                    <option value=\"\" disabled>Choose Building type</option>      \n                    <option *ngFor=\"let s of all_building_types\" [value]=\"s.id\">\n                            {{s.name}}\n                          </option>\n                       </select>\n                </div>\n              </div>\n\n              <div class=\"col-12\">\n                <div class=\"form-group-3\">\n                  <label>Description\n                    <!-- <span class=\"color-red\">*</span> -->\n                  </label>\n                  <textarea [(ngModel)]=\"model.description\" name=\"model_description\" class=\"form-control\" placeholder=\"Enter project description\">\n                       </textarea>\n                </div>\n              </div>\n\n              <div class=\"col-md-6 col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                  <label>Possession Status\n                    <!-- <span class=\"color-red\">*</span> -->\n                  </label>\n                  <select [(ngModel)]=\"model.possession_status_id\" class=\"form-control\" name=\"possession_status_id\">\n                    <option value=\"\">Select status</option>\n                    <option *ngFor=\"let s of all_possession_statuses\" [value]=\"s.id\">\n                      {{s.name}}\n                    </option>\n                  </select>\n                </div>\n              </div>\n              <!-- <div class=\"col-md-6 col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                  <label>Floors\n                  </label>\n                  <input min=\"0\" class=\"form-control\" [(ngModel)]=\"model.floors\" type=\"number\" name=\"building_floors\" placeholder=\"Floors\">\n                </div>\n              </div> -->\n              <!-- <div class=\"col-md-6 col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                  <label>Average Price\n                  </label>\n                  <input min=\"0\" class=\"form-control\" [(ngModel)]=\"model.avg_price\" type=\"number\" name=\"building_avg_price\" placeholder=\"Average price\">\n                </div>\n              </div> -->\n              <div class=\"col-md-6 col-sm-6 col-12\">\n                <div class=\"form-group-3\">\n                  <label>Launch Date\n                    <!-- <span class=\"color-red\">*</span> -->\n                  </label>\n                  <input class=\"form-control\" [ngModel]=\"model.launch_date  | date:'yyyy-MM-dd'\" (ngModelChange)=\"model.launch_date  = $event\" type=\"date\" name=\"building_launch_date\" placeholder=\"Launch date\">\n                </div>\n              </div>\n\n              <div class=\"col-sm-12 col-12\">\n                <div class=\"form-group-3\">\n                  <label>Enter Custom Parameter and Value</label>\n                  <div class=\"row\">\n                      <div class=\"col-sm-5\">\n                        <input [(ngModel)]=\"new_custom.name\" class=\"form-control\" name=\"custom_name\" type=\"text\" placeholder=\"Parameter name\"/>\n                      </div>\n                      <div class=\"col-sm-5\">\n                        <input [(ngModel)]=\"new_custom.value\" class=\"form-control\" name=\"custom_value\" type=\"text\" placeholder=\"Parameter value\" />\n                      </div>\n                      <div class=\"col-sm-2\">\n                        <a (click)=\"addNewCustom()\" class=\"btn-third btn btn-green\" href=\"javascript://\">Add</a>\n                      </div>\n                    </div>\n                    <div class=\"row\" *ngFor=\"let c of model.custom_attributes ;let i=index;\">\n                        <div class=\"col-sm-5\">\n                            <div class=\"paramtext\">{{c.name}}</div>                        </div>\n                        <div class=\"col-sm-5\">\n                            <div class=\"paramtext\">{{c.value}}</div>\n                        </div>\n                        <div class=\"col-sm-2\">\n                            <div class=\"paramtext\"><a (click)=\"model.custom_attributes.splice(i,1)\"><img src=\"assets/img/remove-icon.png\" /></a></div>\n                        </div>\n                      </div>\n                </div>\n              </div>\n\n              <div class=\"spacer30\"></div>\n\n              <div class=\"col-12\">\n                <div class=\"form-group-3 marginB0\">\n                  <label>Amenities available\n                    <!-- <span class=\"color-red\">*</span> -->\n                  </label>\n                  <ul class=\"loc-tags-group\">\n                    <li *ngFor=\"let a of all_amenities; let i=index\" [ngClass]=\"a.selected==true ? 'width100' : ''\">\n                      <span *ngIf=\"a.selected==true\" class=\"width100 amen-img\">{{a.name}} \n                        <b class=\"pull-right\" (click)=\"a.selected = false\" title=\"Remove\"><img src=\"assets/img/close-tag.png\" /></b>\n                      </span>\n                      <div *ngIf=\"a.selected==true\" class=\"spacer30\"></div>\n                      \n                      <div *ngIf=\"a.selected==true\">\n                        <div class=\"uploaded-img-block\">\n                          <div class=\"uploaded-img2\">\n                            <img src=\"assets/img/placeholder.png\" class=\"u-img\" alt=\"img\">\n                            <div class=\"upload-caption\">\n                              <p class=\"green-color\" (click)=\"modelAmenityOpenFun(a, i)\">+ Add more images</p>\n                            </div>\n                          </div>\n                          <div class=\"uploaded-img2\" *ngFor=\"let item of a.images.slice(0,3); let j=index\">\n                            <img *ngIf=\"item && j<4\" onerror=\"this.src='assets/img/placeholder.png'\" class=\"u-img\" [src]=\"item.image\" alt=\"img\">\n                            <div class=\"upload-caption\">\n                              <p *ngIf=\"a.images?.length > 3 && j==2\" class=\"number\" (click)=\"modelAmenityOpenFun(a, i)\">+{{a?.images?.length-3}}</p>\n                            </div>\n                          </div>\n                        </div>\n                      </div>\n\n                    </li>\n                  </ul>\n                </div>\n              </div>\n              <div class=\"col-12\">\n                <div class=\"form-group-3 marginT15\">\n                  <div class=\"btn-cont\">\n                    <a class=\"btn-third btn btn-block\" data-toggle=\"modal\" data-target=\"#amenities\" href=\"javascript://\">Add More</a>\n                  </div>\n                </div>\n              </div>\n              \n              <div class=\"col-12\">\n                <div class=\"form-group-3\" style=\"width: 100%;\">\n                  <label class=\"float-left marginB0\">Configuration\n                    <!-- <span class=\"color-red\">*</span> -->\n                  </label>\n                  <div class=\"clearfix\"></div>\n                  <hr>\n                  <div *ngFor=\"let c of model.configurations; let index=index\" class=\"configur\">\n                    <div class=\"float-right marginB0\">\n                           <a (click)=\"editConfiguration(c, index)\" title=\"Edit\"><img src=\"assets/img/edit.png\" /></a>\n                           <a (click)=\"deleteConfiguration(index);\" title=\"Delete\"><img src=\"assets/img/delete-green.png\" /></a>\n                    </div>\n                    <div class=\"row\">\n                      <div class=\"col-md-6 col-12\">\n                        <p class=\"p18\">{{c?.config?.name}}</p>\n                        <label>Images\n                          <!-- <span class=\"color-red\">*</span> -->\n                        </label>\n                        <!-- <div class=\"image-group\">\n                          <div class=\"fig-block\">\n                            <img class=\"img-fluid\" [src]=\"c.floor_map_image\" onerror='this.src=\"http://via.placeholder.com/48x48\"' alt=\"img\">\n                          </div>\n                        </div> -->\n                        <div class=\"image-group\">\n                            <div class=\"fig-block\">\n                                <img class=\"img-fluid\" [src]=\"c.floor_map_image\" onerror='this.src=\"http://via.placeholder.com/48x48\"' alt=\"img\">\n                            </div>\n                            <div *ngFor=\"let im of c.images\"  class=\"fig-block\">\n                               <img [src]=\"im.image\" onerror=\"this.src='http://via.placeholder.com/48x48'\" alt=\"img\">\n                            </div>\n                         </div>\n                      </div>\n     \n                      <div class=\"col-md-6 col-12\">\n                        <p class=\"p14 text-right\">Name</p>\n                        <h3 class=\"text-right\">{{c?.name}}</h3>\n                      </div>\n                      <!-- <div class=\"col-md-6 col-12\">\n                        <p class=\"p14 text-right\">Average Price</p>\n                        <h3 class=\"text-right\">{{c?.base_price}} per sq/mt.</h3>\n                      </div> -->\n                      <div class=\"col-12\">\n                        <hr>\n                      </div>\n                    </div>\n                  </div>\n\n                  <div>\n                    <div class=\"form-group-3 marginT15\">\n                      <div class=\"btn-cont\">\n                        <a (click)=\"openConfigPopupFun()\" class=\"btn-third btn btn-block\" href=\"javascript://\">Add New</a>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n\n\n            <!-- Tower Section -->\n            <div class=\"row\">\n              <div class=\"col-12\">\n                <div class=\"page-title paddingL0 paddingR0\">\n                  <h3>Tower Details\n                    <span class=\"tower pull-right\" (click)=\"showAddBtn=false\" *ngIf=\"showAddBtn\">+Add New Tower</span>\n                    <span class=\"tower pull-right\" (click)=\"addNewTower()\" *ngIf=\"!showAddBtn\">Save Details</span>\n                  </h3>\n                </div>\n              </div>\n\n              <div class=\"row paddingLR20\" *ngIf=\"!showAddBtn\">\n                <div class=\"col-md-6 col-sm-6 col-12\">\n                  <div class=\"form-group-3\">\n                    <label>Name of the Tower</label>\n                    <input autocomplete=\"off\" [(ngModel)]=\"newTower.tower_name\" class=\"form-control\" type=\"text\" name=\"tower_name\" placeholder=\"Enter tower name\">\n                  </div>\n                </div>\n\n                <div class=\"col-md-6 col-sm-6 col-12\">\n                  <div class=\"form-group-3\">\n                    <label>Number of Floors</label>\n                    <input min=\"0\" autocomplete=\"off\" [(ngModel)]=\"newTower.num_of_floors\" class=\"form-control\" type=\"number\" name=\"num_of_floors\" placeholder=\"(0 for Ground Floor)\"/>\n                  </div>\n                </div>\n\n                <div class=\"col-md-6 col-sm-6 col-12\">\n                  <div class=\"form-group-3\">\n                    <label>Possession Status</label>\n                    <select [(ngModel)]=\"newTower.possession_status_id\" class=\"form-control\" name=\"possession_status_id\">\n                      <option value=\"\">Select status</option>\n                      <option *ngFor=\"let s of all_possession_statuses\" [value]=\"s.id\">\n                        {{s.name}}\n                      </option>\n                    </select>\n                  </div>\n                </div>\n\n                <div class=\"col-md-6 col-sm-6 col-12\">\n                  <div class=\"form-group-3\">\n                    <label>Launch date</label>\n                    <input class=\"form-control\" [ngModel]=\"newTower.launch_date  | date:'yyyy-MM-dd'\" (ngModelChange)=\"newTower.launch_date  = $event\" type=\"date\" name=\"launch_date\" placeholder=\"Launch date\">\n                  </div>\n                </div>\n\n                <div class=\"col-12\">\n                  <div class=\"form-group-3 marginB0\">\n                    <label>Amenities available</label>\n                    <!-- <ul class=\"loc-tags-group\">\n                      <li *ngFor=\"let at of allTowerAmenities\">\n                        <span *ngIf=\"at.selected==true\">{{at.name}} \n                          <b (click)=\"at.selected = false\" title=\"remove\"><img src=\"assets/img/close-tag.png\" /></b>\n                        </span>\n                      </li>\n                    </ul> -->\n\n                    <ul class=\"loc-tags-group\">\n                      <li *ngFor=\"let at of allTowerAmenities; let j=index\" [ngClass]=\"at.selected==true ? 'width100' : ''\">\n                        <span *ngIf=\"at.selected==true\" class=\"width100 amen-img\">{{at.name}} \n                          <b class=\"pull-right\" (click)=\"at.selected = false\" title=\"Remove\"><img src=\"assets/img/close-tag.png\" /></b>\n                        </span>\n                        <div *ngIf=\"at.selected==true\" class=\"spacer30\"></div>\n                        \n                        <div *ngIf=\"at.selected==true\">\n                          <div class=\"uploaded-img-block\">\n                            <div class=\"uploaded-img2\">\n                              <img src=\"assets/img/placeholder.png\" class=\"u-img\" alt=\"img\">\n                              <div class=\"upload-caption\">\n                                <p class=\"green-color\" (click)=\"modelTowerAmenityOpenFun(at, j)\">+ Add more images</p>\n                              </div>\n                            </div>\n                            <div class=\"uploaded-img2\" *ngFor=\"let item of at.images.slice(0,3); let j=index\">\n                              <img *ngIf=\"j<4\" onerror=\"this.src='assets/img/placeholder.png'\" class=\"u-img\" [src]=\"item.image\" alt=\"img\">\n                              <div class=\"upload-caption\">\n                                <p *ngIf=\"at.images?.length > 3 && j==2\" class=\"number\" (click)=\"modelTowerAmenityOpenFun(at, i)\">+{{at?.images?.length-3}}</p>\n                              </div>\n                            </div>\n                          </div>\n                        </div>\n                      </li>\n                    </ul>\n\n                  </div>\n                </div>\n\n                <div class=\"col-12\">\n                  <div class=\"form-group-3 marginT15\">\n                    <div class=\"btn-cont\">\n                      <a class=\"btn-third btn btn-block\" data-toggle=\"modal\" data-target=\"#towerAmenities\" href=\"javascript://\">Add More</a>\n                    </div>\n                  </div>\n                </div>\n                \n              </div>\n            </div>\n            <!-- End of Tower Section -->\n\n            <!-- listing of added towers -->\n            <div *ngIf=\"model?.building_towers?.length>0\">\n              <div class=\"row\" *ngFor=\"let btower of model?.building_towers; let i=index\">\n                <div class=\"col-12\">\n                  <div class=\"page-title paddingL0 paddingR0\">\n                    <h3>Tower {{i+1}}\n                      <span class=\"tower pull-right\" (click)=\"deleteTower(i)\">Delete</span>\n                      <span class=\"tower marginR15 pull-right\" title=\"Click to edit Tower{{i+1}}\" *ngIf=\"model?.building_tower_edit_index!=i\" (click)=\"editTower(btower, i)\">Edit</span>\n                      <span class=\"tower pull-right marginR15\" title=\"Click to save Tower{{i+1}}\" *ngIf=\"model?.building_tower_edit_index==i\" (click)=\"saveTower(btower, i)\">Save</span>\n                    </h3>\n                  </div>\n                </div>\n\n                <div class=\"col-md-6 col-sm-6 col-12\">\n                  <div class=\"form-group-3\">\n                    <label>Name of the Tower</label>\n                    <input autocomplete=\"off\" [disabled]=\"model?.building_tower_edit_index!=i\" [(ngModel)]=\"btower.tower_name\" class=\"form-control\" type=\"text\" name=\"tower_name{{i}}\" placeholder=\"Enter tower name\">\n                  </div>\n                </div>\n\n                <div class=\"col-md-6 col-sm-6 col-12\">\n                  <div class=\"form-group-3\">\n                    <label>Number of Floors</label>\n                    <input autocomplete=\"off\" [disabled]=\"model?.building_tower_edit_index!=i\" [(ngModel)]=\"btower.num_of_floors\" class=\"form-control\" type=\"number\" name=\"num_of_floors{{i}}\" placeholder=\"Enter number of floors\"/>\n                  </div>\n                </div>\n\n                <div class=\"col-md-6 col-sm-6 col-12\">\n                  <div class=\"form-group-3\">\n                    <label>Possession Status</label>\n                    <select [disabled]=\"model?.building_tower_edit_index!=i\" [(ngModel)]=\"btower.possession_status_id\" class=\"form-control\" name=\"possession_status_id{{i}}\">\n                      <option value=\"\">Select status</option>\n                      <option *ngFor=\"let s of all_possession_statuses\" [value]=\"s.id\">\n                        {{s.name}}\n                      </option>\n                    </select>\n                  </div>\n                </div>\n\n                <div class=\"col-md-6 col-sm-6 col-12\">\n                  <div class=\"form-group-3\">\n                    <label>Launch date</label>\n                    <input class=\"form-control\" [disabled]=\"model?.building_tower_edit_index!=i\" [ngModel]=\"btower.launch_date  | date:'yyyy-MM-dd'\" (ngModelChange)=\"newTower.launch_date  = $event\" type=\"date\" name=\"launch_date{{i}}\" placeholder=\"Launch date\">\n                  </div>\n                </div>\n\n                <div class=\"col-12\">\n                  <div class=\"form-group-3 marginB0\">\n                    <label>Amenities available</label>\n                    <ul class=\"loc-tags-group\" *ngIf=\"model?.building_tower_edit_index!=i\">\n                      <span *ngIf=\"btower.amenitiesCount==0\">No amenity added for this tower.</span>\n                      <li *ngFor=\"let a of btower?.amenities\">\n                        <span *ngIf=\"a.selected==true\">{{a.name}} \n                          <!-- <b (click)=\"a.selected = false\" title=\"Remove\"><img src=\"assets/img/close-tag.png\" /></b> -->\n                        </span>\n                      </li>\n                    </ul>\n\n                    <ul class=\"loc-tags-group\" *ngIf=\"model?.building_tower_edit_index==i\">\n                      <li *ngFor=\"let at of btower?.amenities; let j=index\" [ngClass]=\"at.selected==true ? 'width100' : ''\">\n                        <span *ngIf=\"at.selected==true\" class=\"width100 amen-img\">{{at.name}} \n                          <b class=\"pull-right\" (click)=\"at.selected = false\" title=\"Remove\"><img src=\"assets/img/close-tag.png\" /></b>\n                        </span>\n                        <div *ngIf=\"at.selected==true\" class=\"spacer30\"></div>\n                        \n                        <div *ngIf=\"at.selected==true\">\n                          <div class=\"uploaded-img-block\">\n                            <div class=\"uploaded-img2\">\n                              <img src=\"assets/img/placeholder.png\" class=\"u-img\" alt=\"img\">\n                              <div class=\"upload-caption\">\n                                <p class=\"green-color\" (click)=\"modelTowerAmenityOpenFun(at, j)\">+ Add more images</p>\n                              </div>\n                            </div>\n                            <div class=\"uploaded-img2\" *ngFor=\"let item of at.images.slice(0,3); let j=index\">\n                              <img *ngIf=\"j<4\" onerror=\"this.src='assets/img/placeholder.png'\" class=\"u-img\" [src]=\"item.image\" alt=\"img\">\n                              <div class=\"upload-caption\">\n                                <p *ngIf=\"at.images?.length > 3 && j==2\" class=\"number\" (click)=\"modelTowerAmenityOpenFun(at, i)\">+{{at?.images?.length-3}}</p>\n                              </div>\n                            </div>\n                          </div>\n                        </div>\n                      </li>\n                    </ul>\n\n                  </div>\n                </div>\n\n                <div class=\"col-12\">\n                  <div class=\"form-group-3 marginT15\">\n                    <div class=\"btn-cont\">\n                      <a style=\"display:none;\" #towerEditAmenitiesModal class=\"btn-third btn btn-block\" data-toggle=\"modal\" data-target=\"#towerEditAmenities\" href=\"javascript://\"></a>\n                      <a *ngIf=\"model?.building_tower_edit_index==i\" (click)=\"editTowerAmenity(btower?.amenities, i)\" class=\"btn-third btn btn-block\" href=\"javascript://\">Add More</a>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n            <!-- end of listing of added towers -->\n\n            <!-- Developer Info Section -->\n            <div class=\"row\">\n              <div class=\"col-12\">\n                <div class=\"page-title paddingL0 paddingR0\">\n                  <h3>Developer Info\n                    <!-- <span class=\"color-red\">*</span> -->\n                    <span class=\"tower pull-right\" (click)=\"selectDeveloper('')\">{{model?.developer?.id ? 'Change' : 'Select'}} Developer</span>\n                  </h3>\n                </div>\n              </div>\n            </div>\n\n\n              <div class=\"row\" *ngIf=\"model?.developer?.id\">\n\n              <!-- <div class=\"col-md-12 col-sm-12 col-12\">\n                <div class=\"form-group-3 pull-right\">\n                  <label class=\"green-color cursor-pointer\" (click)=\"selectDeveloper('')\">Select Developer</label>\n                </div>\n              </div> -->\n\n              <!-- <div class=\"col-md-6 col-sm-6 col-6\">\n                <div class=\"form-group-3\">\n                  <label class=\"green-color cursor-pointer\" (click)=\"addDeveloper()\">Add New Developer</label>\n                </div>\n              </div> -->\n\n                <div class=\"col-md-6 col-sm-6 col-12\">\n                  <div class=\"form-group-3\">\n                    <label>Name</label>\n                    <input autocomplete=\"off\" [disabled]=\"!canEditdeveloperInfo\" [(ngModel)]=\"model.developer.name\" class=\"form-control\" type=\"text\" name=\"developer_name\" placeholder=\"Developer Name\">\n                  </div>\n                </div>\n                <div class=\"col-md-6 col-sm-6 col-12\">\n                  <div class=\"form-group-3\">\n                    <label>Phone Number</label>\n                    <input autocomplete=\"off\" [disabled]=\"!canEditdeveloperInfo\" minlength=\"6\" maxlength=\"16\" autocomplete=\"off\" type=\"text\" class=\"form-control\" id=\"phone\" placeholder=\"Phone Number\" minlength=\"1\" [(ngModel)]=\"model.developer.phone\" name=\"phone\" ng2TelInput [ng2TelInputOptions]=\"initialCountry\" (countryChange)=\"onCountryChange($event)\"/>\n                  </div>\n                </div>\n                <div class=\"col-md-6 col-sm-6 col-12\">\n                  <div class=\"form-group-3\">\n                    <label>Email</label>\n                    <input autocomplete=\"off\" [disabled]=\"!canEditdeveloperInfo\" [(ngModel)]=\"model.developer.email\" class=\"form-control\" type=\"email\" name=\"developer_email\" placeholder=\"Developer Email\" pattern=\"^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$\" />\n                  </div>\n                </div>\n                <div class=\"col-md-6 col-sm-6 col-12\">\n                  <div class=\"form-group-3\">\n                    <label>Company Name</label>\n                    <input autocomplete=\"off\" [disabled]=\"!canEditdeveloperInfo\" [(ngModel)]=\"model.developer.developer_company\" class=\"form-control\" type=\"text\" name=\"developer_company\" placeholder=\"Company Name\"/>\n                  </div>\n                </div>\n                <!-- <div class=\"col-md-12 col-sm-12 col-12\">\n                  <div class=\"form-group-3\">\n                    <label>Description</label>\n                    <input autocomplete=\"off\" [disabled]=\"!canEditdeveloperInfo\" [(ngModel)]=\"model.developer.developer_desc\" class=\"form-control\" type=\"text\" name=\"developer_desc\" placeholder=\"Description\"/>\n                  </div>\n                </div> -->\n  \n                <div class=\"col-6\">\n                  <div class=\"form-group-3\">\n                    <label>Logo</label>\n                    <div class=\"add-project-img-more\">\n                      <input [disabled]=\"!canEditdeveloperInfo\" type=\"file\" accept=\"image/*\" name=\"sasdsda\" (change)=\"file5.onSelectFile($event, true);\">\n                      <img class=\"img-fluid\" *ngIf=\"file5.image\" [src]=\"file5.image\">\n                      <div *ngIf=\"!file5.image\"  class=\"upload-caption\">\n                        <p class=\"green-color\">+ Add logo</p>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n  \n                <div class=\"col-6\">\n                  <div class=\"form-group-3\">\n                    <label>Cover Image</label>\n                    <div class=\"add-project-img-more\">\n                      <input [disabled]=\"!canEditdeveloperInfo\" type=\"file\" accept=\"image/*\" name=\"developer_image\" (change)=\"file6.onSelectFile($event, true);\">\n                      <img class=\"img-fluid\" *ngIf=\"file6.image\" [src]=\"file6.image\">\n                      <div *ngIf=\"!file6.image\"  class=\"upload-caption\">\n                        <p class=\"green-color\">+ Add cover image</p>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"col-12\">\n                <div class=\"btn-cont text-right\">\n                  <button [disabled]=\"!f.valid\" (click)=\"addProject()\" class=\"btn-primary btn\">Submit</button>\n                  <!-- <button  (click)=\"addProject()\" class=\"btn-primary btn\">Submit</button> -->\n                </div>\n              </div>\n\n            <!-- End of Developer Info Section -->\n\n          </div>\n        </div>\n      </form>\n    </div>\n\n  </div>\n</div>\n\n<!-- Amenities model -->\n<div class=\"modal\" id=\"amenities\" style=\"display: none;\" aria-hidden=\"true\">\n  <div class=\"modal-dialog\">\n    <div class=\"modal-content amenities-popup\">\n      <div class=\"modal-header popup-header\">\n        <h4 class=\"modal-title\">Amenities</h4>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\">×</button>\n      </div>\n      <div class=\"modal-body\">\n        <!-- searching -->\n        <!-- <div class=\"row\">\n          <div class=\"col-md-8 col-6\">\n              <input style=\"max-width:200px\" [(ngModel)]=\"keyword\" class=\"form-control\" type=\"text\" name=\"keyword\" placeholder=\"Search\">\n          </div>\n          <div class=\"col-md-4 col-5 btn-cont\">\n              <a class=\"btn btn-primary pull-right\" href=\"javascript://\" (click)=\"getInhouseBroker('', keyword)\">Search</a>\n          </div>\n        </div>\n        <div class=\"spacer30\"></div> -->\n          \n        <div>\n          <label *ngFor=\"let a of all_amenities; \" (click)=\"a.selected = !a.selected\" class=\"cust-check-bx2\">\n            {{a.name}}\n          <span *ngIf=\"a.selected==true\" class=\"checkmark open\"></span>\n          </label>\n        </div>\n      </div>\n      <div class=\"modal-footer\">\n        <div class=\"btn-cont\">\n          <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\">Close</button>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!-- Tower Amenities model -->\n<div class=\"modal\" id=\"towerAmenities\" style=\"display: none;\" aria-hidden=\"true\">\n  <div class=\"modal-dialog\">\n    <div class=\"modal-content amenities-popup\">\n      <div class=\"modal-header popup-header\">\n        <h4 class=\"modal-title\">Amenities</h4>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\">×</button>\n      </div>\n      <div class=\"modal-body\">\n        <label *ngFor=\"let a of allTowerAmenities; \" (click)=\"a.selected = !a.selected\" class=\"cust-check-bx2\">\n             {{a.name}}\n           <span *ngIf=\"a.selected==true\" class=\"checkmark open\"></span>\n           </label>\n      </div>\n      <div class=\"modal-footer\">\n        <div class=\"btn-cont\">\n          <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\">Close</button>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n\n<!-- Tower Amenities edit model -->\n<div class=\"modal\" id=\"towerEditAmenities\" style=\"display: none;\" aria-hidden=\"true\">\n  <div class=\"modal-dialog\">\n    <div class=\"modal-content amenities-popup\">\n      <div class=\"modal-header popup-header\">\n        <h4 class=\"modal-title\">Amenities</h4>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\">×</button>\n      </div>\n      <div class=\"modal-body\">\n        <label *ngFor=\"let a of allTowerAmenityForEdit; let m=index \" (click)=\"setTowerAmenity(a, m)\" class=\"cust-check-bx2\">\n             {{a.name}}\n           <span *ngIf=\"a.selected==true\" class=\"checkmark open\"></span>\n           </label>\n      </div>\n      <div class=\"modal-footer\">\n        <div class=\"btn-cont\">\n          <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\">Close</button>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n\n<!-- Add More img -->\n<span data-target=\"#add-more-img\" data-toggle=\"modal\" #modalOpen></span>\n<div class=\"modal add-more-popup\" id=\"add-more-img\">\n  <div class=\"modal-dialog modal-lg\">\n    <div class=\"modal-content\">\n\n      <!-- Modal Header -->\n      <div class=\"modal-header\">\n        <h4 class=\"modal-title\">Images</h4>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #modalClose>&times;</button>\n      </div>\n\n      <!-- Modal body -->\n      <div class=\"modal-body\">\n        <div class=\"uploaded-img-block\">\n          <div class=\"uploaded-img\" *ngFor=\"let item of file2.files; let i=index\">\n            <a class=\"remove\" (click)=\"file2.remove(i)\"><img src=\"assets/img/remove-icon.png\" alt=\"img\"></a>\n            <img *ngIf=\"item\" class=\"u-img\" [src]=\"item.image\" alt=\"img\">\n            <img *ngIf=\"!item\" class=\"u-img\" src=\"http://via.placeholder.com/300x300\" alt=\"img\">\n          </div>\n        </div>\n        <div class=\"add-more-images\">\n          <input type=\"file\" name=\"add-more\" multiple max=\"6\" accept=\"image/*\" (change)=\"file2Select($event)\">\n          <span>+ Add more images</span>\n        </div>\n      </div>\n\n      <!-- Modal footer -->\n      <div class=\"modal-footer btn-cont\">\n        <button type=\"button\" (click)=\"saveImages()\" class=\"btn btn-primary\">Submit</button>\n      </div>\n\n    </div>\n  </div>\n</div>\n\n\n<!-- Add More 360 img -->\n<span data-target=\"#add-more-360-img\" data-toggle=\"modal\" #modal360ImageOpen></span>\n<div class=\"modal add-more-popup\" id=\"add-more-360-img\">\n  <div class=\"modal-dialog modal-lg\">\n    <div class=\"modal-content\">\n\n      <!-- Modal Header -->\n      <div class=\"modal-header\">\n        <h4 class=\"modal-title\">360<span>&#176;</span> Images</h4>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #modal360ImageClose>&times;</button>\n      </div>\n\n      <!-- Modal body -->\n      <div class=\"modal-body\">\n        <div class=\"uploaded-img-block\">\n          <div class=\"uploaded-img\" *ngFor=\"let item of file7.files; let i=index\">\n            <a class=\"remove\" (click)=\"file7.remove(i)\"><img src=\"assets/img/remove-icon.png\" alt=\"img\"></a>\n            <img *ngIf=\"item\" class=\"u-img\" [src]=\"item.image\" alt=\"img\">\n            <img *ngIf=\"!item\" class=\"u-img\" src=\"http://via.placeholder.com/300x300\" alt=\"img\">\n          </div>\n        </div>\n        <div class=\"add-more-images\">\n          <input type=\"file\" name=\"add-more\" multiple max=\"6\" accept=\"image/*\" (change)=\"file7Select($event)\">\n          <span>+ Add more 360<span>&#176;</span> images</span>\n        </div>\n      </div>\n\n      <!-- Modal footer -->\n      <div class=\"modal-footer btn-cont\">\n        <button type=\"button\" (click)=\"save360Images()\" class=\"btn btn-primary\">Submit</button>\n      </div>\n\n    </div>\n  </div>\n</div>\n\n\n<!-- Add amenities img -->\n<span data-target=\"#add-amenity-more-img\" data-toggle=\"modal\" #modalAmenOpen></span>\n<div class=\"modal add-more-popup\" id=\"add-amenity-more-img\">\n  <div class=\"modal-dialog modal-lg\">\n    <div class=\"modal-content\">\n\n      <!-- Modal Header -->\n      <div class=\"modal-header\">\n        <h4 class=\"modal-title\">{{amenity_obj?.name}} Images</h4>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #modalAmenClose>&times;</button>\n      </div>\n\n      <!-- Modal body -->\n      <div class=\"modal-body\">\n        <div class=\"uploaded-img-block\">\n          <div class=\"uploaded-img\" *ngFor=\"let item of file2.files; let i=index\">\n            <a class=\"remove\" (click)=\"file2.remove(i)\"><img src=\"assets/img/remove-icon.png\" alt=\"img\"></a>\n            <img *ngIf=\"item\" class=\"u-img\" [src]=\"item.image\" alt=\"img\">\n            <img *ngIf=\"!item\" class=\"u-img\" src=\"http://via.placeholder.com/300x300\" alt=\"img\">\n          </div>\n        </div>\n        <div class=\"add-more-images\">\n          <input type=\"file\" name=\"add-more\" multiple max=\"6\" accept=\"image/*\" (change)=\"file2Select($event)\">\n          <span>+ Add more images</span>\n        </div>\n      </div>\n\n      <!-- Modal footer -->\n      <div class=\"modal-footer btn-cont\">\n        <button type=\"button\" (click)=\"saveAmenityImages()\" class=\"btn btn-primary\">Submit</button>\n      </div>\n\n    </div>\n  </div>\n</div>\n\n\n<!-- Add tower amenities img -->\n<span data-target=\"#add-tower-amenity-more-img\" data-toggle=\"modal\" #modalTowerAmenOpen></span>\n<div class=\"modal add-more-popup\" id=\"add-tower-amenity-more-img\">\n  <div class=\"modal-dialog modal-lg\">\n    <div class=\"modal-content\">\n\n      <!-- Modal Header -->\n      <div class=\"modal-header\">\n        <h4 class=\"modal-title\">{{amenity_obj?.name}} Images</h4>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #modalTowerAmenClose>&times;</button>\n      </div>\n\n      <!-- Modal body -->\n      <div class=\"modal-body\">\n        <div class=\"uploaded-img-block\">\n          <div class=\"uploaded-img\" *ngFor=\"let item of file2.files; let i=index\">\n            <a class=\"remove\" (click)=\"file2.remove(i)\"><img src=\"assets/img/remove-icon.png\" alt=\"img\"></a>\n            <img *ngIf=\"item\" class=\"u-img\" [src]=\"item.image\" alt=\"img\">\n            <img *ngIf=\"!item\" class=\"u-img\" src=\"http://via.placeholder.com/300x300\" alt=\"img\">\n          </div>\n        </div>\n        <div class=\"add-more-images\">\n          <input type=\"file\" name=\"add-more\" multiple max=\"6\" accept=\"image/*\" (change)=\"file2Select($event)\">\n          <span>+ Add more images</span>\n        </div>\n      </div>\n\n      <!-- Modal footer -->\n      <div class=\"modal-footer btn-cont\">\n        <button type=\"button\" (click)=\"saveTowerAmenityImages()\" class=\"btn btn-primary\">Submit</button>\n      </div>\n\n    </div>\n  </div>\n</div>\n\n\n<a #openDeveloperListModel class=\"btn-third btn btn-block\" data-target=\"#developer-list\" data-toggle=\"modal\"></a>\n<div class=\"modal\" id=\"developer-list\">\n  <div class=\"modal-dialog\">\n    <div class=\"modal-content notary-avail\">\n        <div class=\"modal-header popup-header\">\n        <h4 class=\"modal-title\">Select Developer</h4>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #closeDeveloperListModel>&times;</button>\n        </div>\n        <div class=\"modal-body\">\n            <div class=\"row\">\n                <div class=\"col-md-8 col-6\">\n                    <input style=\"max-width:200px\" [(ngModel)]=\"name\" class=\"form-control\" type=\"text\" name=\"keyword\" placeholder=\"Search\">\n                </div>\n                <div class=\"col-md-4 col-5 btn-cont\">\n                  <a class=\"btn btn-primary pull-right\" href=\"javascript://\" (click)=\"selectDeveloper(name)\">Search</a>\n              </div>\n            </div>\n            <div class=\"spacer40\"></div>\n            <table class=\"table\">\n                <tr *ngFor=\"let item of all_developers\">\n                    <td *ngIf=\"item.is_blocked!=1\">\n                        <div class=\"n-avail-profile\">\n                        <img [src]=\"item.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\">\n                        <div class=\"n-avail-info\">\n                            <p class=\"p12\">{{item.name}}</p>\n                            <p class=\"p10\">Phone : {{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}</p>\n                        </div>\n                        </div>\n                    </td>\n                    <td *ngIf=\"item.is_blocked!=1\">\n                        <label class=\"cust-check-bx float-right\">\n                            <input type=\"radio\" name=\"notary_id\" (click)=\"setDeveloper(item)\">\n                            <span class=\"checkmark\"></span>\n                        </label>\n                    </td>\n                </tr>\n            </table>\n        </div>\n    </div>\n</div>\n</div>\n\n\n\n<a #openConfigPopup class=\"btn-third btn btn-block\" data-target=\"#add-config\" data-toggle=\"modal\"></a>\n<div class=\"modal\" id=\"add-config\">\n  <div class=\"modal-dialog modal-lg\">\n    <div class=\"modal-content add-config-popup\">\n      <form #addConfig >\n      <div class=\"modal-header popup-header\">\n        <h4 class=\"modal-title\">Add Configuration</h4>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #closeConfigPopup>×</button>\n      </div>\n      <div *ngIf=\"new_config\" class=\"modal-body\">\n        <div class=\"row\">\n          <div class=\"col-sm-6 col-12\">\n            <div class=\"form-group-3\">\n              <label>Title</label>\n              <select class=\"form-control\" [(ngModel)]=\"new_config.configuration_id\" (change)=\"selectConfiguration($event.target.value,new_config)\" name=\"config_name\">\n                <option value=\"\">Select</option>  \n                <option *ngFor=\"let c of all_configurations\" value=\"{{c.id}}\" daa-model=\"c\">{{c.name}}</option>\n              </select>\n            </div>\n          </div>\n          <div class=\"col-sm-6 col-12\">\n            <div class=\"form-group-3\">\n              <label>Name</label>\n              <input required class=\"form-control\" [(ngModel)]=\"new_config.name\" type=\"text\" name=\"name\">\n            </div>\n          </div>\n        </div>\n        <!-- <div class=\"row\">\n          <div class=\"col-sm-6 col-12\">\n            <div class=\"form-group-3\">\n              <label>Carpet area (sqmt)\n              </label>\n              <input min=\"0\" class=\"form-control\" [(ngModel)]=\"new_config.carpet_area\" type=\"number\" name=\"base_price\">\n            </div>\n          </div>\n          <div class=\"col-sm-6 col-12\">\n            <div class=\"form-group-3\">\n              <label>Average Price\n              </label>\n              <input min=\"0\" class=\"form-control\" [(ngModel)]=\"new_config.base_price\" type=\"number\" name=\"base_price\">\n            </div>\n          </div>\n        </div> -->\n        <div class=\"row\">\n          <div class=\"col-12\">\n            <div class=\"form-group-3\">\n              <label>Floor Plan Image\n              </label>\n              <div class=\"upload-cover-img\" style=\"max-width: 400px; margin: 0px auto;height: 250px;\">\n                  <img class=\"img-fluid\" [src]=\"file3.image\" onerror='this.src=\"assets/img/placeholder.png\"' />\n                  <div *ngIf=\"!file3.image\" class=\"upload-caption\">\n                      <p class=\"green-color marginT30\">+Upload Cover image for the project</p>\n                      <p>JPG or PNG. Imae size should be 1920 × 1080 pixels (for HiDPI displays).</p>\n                  </div>\n                  <input type=\"file\" accept=\"image/*\" name=\"floor_map_image\" (change)=\"file3.onSelectFile($event)\">\n              </div>\n              <div class=\"spacer30\"></div>\n              <label>Other Images\n              </label>\n              <div class=\"spacer30\"></div>\n              <div class=\"uploaded-img-block\">\n                <div class=\"uploaded-img\" *ngFor=\"let item of file4.files; let i=index\">\n                  <a class=\"remove\" (click)=\"file4.remove(i)\">\n                    <img src=\"assets/img/remove-icon.png\" alt=\"img\">\n                  </a>\n                  <img *ngIf=\"item.image\" class=\"u-img\" [src]=\"item.image\" alt=\"img\">\n                  <img *ngIf=\"!item.image\" class=\"u-img\" src=\"http://via.placeholder.com/300x300\" alt=\"img\">\n                </div>\n              </div>\n              \n              <div class=\"add-project-img-more\">\n                <input type=\"file\" name=\"add-more-images\" multiple max=\"6\" accept=\"image/*\" (change)=\"file4Select($event)\">\n                <div class=\"upload-caption\">\n                  <p class=\"green-color\">+ Add more images</p>\n                </div>\n              </div>\n          \n            </div>\n          </div>\n        </div>\n        <div class=\"modal-footer\">\n          <div class=\"btn-cont\">\n            <button [disabled]=\"!new_config.configuration_id\n            || !new_config.name\n            || !file3.image\" (click)=\"addNewConfig()\" type=\"button\" class=\"btn btn-primary\">Save</button>\n          </div>\n        </div>\n      </div>\n      </form>\n\n    </div>\n  </div>\n\n  "

/***/ }),

/***/ "./src/app/layout/projects/add-project/add-project.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/layout/projects/add-project/add-project.component.ts ***!
  \**********************************************************************/
/*! exports provided: AddProjectComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddProjectComponent", function() { return AddProjectComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _services_admin_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _models_addProject_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../../models/addProject.model */ "./src/app/models/addProject.model.ts");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../../../common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var _common_fileUpload__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../../../common/fileUpload */ "./src/app/common/fileUpload.ts");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var AddProjectComponent = /** @class */ (function () {
    function AddProjectComponent(model, admin, route, router, mapsAPILoader, ngZone, constant, cs, element) {
        this.model = model;
        this.admin = admin;
        this.route = route;
        this.router = router;
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.constant = constant;
        this.cs = cs;
        this.element = element;
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
        this.all_developers = [];
        this.selected_amenities = [];
        this.new_config = new _models_addProject_model__WEBPACK_IMPORTED_MODULE_4__["Configuration"];
        this.new_custom = { name: '', value: '' };
        this.FU = {};
        this.initialCountry = { initialCountry: 'mx' };
        this.allTowerAmenities = [];
        this.allTowerAmenityForEdit = [];
        this.selectedTowerAmenitiesId = [];
        this.selectedTowerAmenityObj = [];
        this.selected_amenity_for_tower = [];
        this.showAddBtn = true;
        this.towerAmenityIndex = 0;
        this.videoObj = {
            thumbnail: '',
            original: ''
        };
    }
    AddProjectComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.name = '';
        this.file1 = new _common_fileUpload__WEBPACK_IMPORTED_MODULE_7__["FileUpload"](true, this.admin);
        this.file2 = new _common_fileUpload__WEBPACK_IMPORTED_MODULE_7__["FileUpload"](false, this.admin);
        this.file3 = new _common_fileUpload__WEBPACK_IMPORTED_MODULE_7__["FileUpload"](true, this.admin);
        this.file4 = new _common_fileUpload__WEBPACK_IMPORTED_MODULE_7__["FileUpload"](false, this.admin);
        this.file5 = new _common_fileUpload__WEBPACK_IMPORTED_MODULE_7__["FileUpload"](true, this.admin);
        this.file6 = new _common_fileUpload__WEBPACK_IMPORTED_MODULE_7__["FileUpload"](true, this.admin);
        this.file7 = new _common_fileUpload__WEBPACK_IMPORTED_MODULE_7__["FileUpload"](false, this.admin);
        this.file8 = new _common_fileUpload__WEBPACK_IMPORTED_MODULE_7__["FileUpload"](false, this.admin);
        this.route.params.subscribe(function (params) {
            _this.id = params.id;
            _this.newTower = new _models_addProject_model__WEBPACK_IMPORTED_MODULE_4__["Towers"]();
            if (_this.id) {
                /* if id exists edit mode */
                _this.canEditdeveloperInfo = false;
                _this.parameter.loading = true;
                _this.admin.postDataApi('getProjectById', { building_id: _this.id }).subscribe(function (r) {
                    _this.parameter.loading = false;
                    _this.model = JSON.parse(JSON.stringify(r.data));
                    _this.model.building_tower_edit_index = '-1';
                    _this.model.floors = 0;
                    if (r.data.developer == null) {
                        _this.model.developer = {
                            id: '',
                            name: '',
                            email: '',
                            country_code: _this.constant.country_code,
                            dial_code: _this.constant.dial_code,
                            phone: '',
                            logo: '',
                            image: '',
                            developer_image: '',
                            developer_desc: '',
                            developer_company: ''
                        };
                        _this.model.developer.name = r.data.developer != null && r.data.developer.name ? r.data.developer.name : '';
                        _this.model.developer.email = r.data.developer != null && r.data.developer.email ? r.data.developer.email : '';
                        _this.model.developer.phone = r.data.developer != null && r.data.developer.phone ? r.data.developer.phone : '';
                    }
                    _this.file1.image = _this.model.main_image;
                    // this.model.configurations.map((item) => {
                    //   item.images = item.images.map(r1 => r1.image);
                    // });
                    _this.model.custom_attributes = _this.model.custom_values;
                    _this.file5.image = _this.model.developer.image;
                    _this.file6.image = _this.model.developer.developer_image;
                    _this.admin.postDataApi('getAmenities', {}).subscribe(function (res) {
                        _this.all_amenities = res.data.map(function (item) { item.selected = false; item.images = []; return item; });
                        _this.allTowerAmenities = JSON.parse(JSON.stringify(_this.all_amenities));
                        _this.allTowerAmenityForEdit = JSON.parse(JSON.stringify(_this.all_amenities));
                        // setting true to selected amenties
                        // this.selected_amenities = this.all_amenities.map(item => {
                        //   if (this.model.amenities.find(am => am.id === item.id)) {
                        //     item.selected = true;
                        //   }
                        //   return item;
                        // });
                        for (var index = 0; index < _this.all_amenities.length; index++) {
                            for (var i = 0; i < _this.model.amenities.length; i++) {
                                if (_this.model.amenities[i].id === _this.all_amenities[index].id) {
                                    _this.all_amenities[index].selected = true;
                                    var pivot = _this.model.amenities[i]['pivot'];
                                    _this.all_amenities[index].images = pivot.images ? pivot.images : [];
                                }
                            }
                        }
                        if (_this.model.building_towers && _this.model.building_towers.length > 0) {
                            // setting true to tower selected amenities
                            _this.model.building_towers.map(function (item) {
                                item.amenitiesCount = item.amenities.length;
                                item.amenities.map(function (i) { i.selected = true; return i; });
                            });
                            // tower amenitites id array only
                            _this.model.building_towers.forEach(function (element) {
                                // const ele_ame = JSON.parse(JSON.stringify(element.amenities));
                                element.amenitiesId = element.amenities.map(function (op) {
                                    var pivot = op['pivot'];
                                    op.images = pivot.images ? pivot.images : [];
                                    return op.id;
                                });
                            });
                        }
                        else {
                            _this.model.building_towers = [];
                        }
                    });
                }, function (error) {
                    _this.parameter.loading = false;
                });
            }
            else if (params.request_id) {
                /* if request_id exists, building request edit mode */
                _this.canEditdeveloperInfo = false;
                _this.parameter.loading = true;
                _this.admin.postDataApi('getBuildingRequest', { building_request_id: params.request_id }).subscribe(function (r) {
                    _this.parameter.loading = false;
                    _this.model = JSON.parse(JSON.stringify(r.data));
                    _this.model.building_tower_edit_index = '-1';
                    _this.model.floors = 0;
                    if (r.data.developer == null) {
                        _this.model.developer = {
                            id: '', name: '', email: '',
                            country_code: _this.constant.country_code,
                            dial_code: _this.constant.dial_code,
                            phone: '', logo: '', image: '', developer_image: '', developer_desc: '',
                            developer_company: ''
                        };
                        _this.model.building_request_id = params.request_id;
                        _this.model.developer.name = r.data.dev_name ? r.data.dev_name : '';
                        _this.model.developer.email = r.data.dev_email ? r.data.dev_email : '';
                        _this.model.developer.country_code = r.data.dev_countrycode ? r.data.dev_countrycode : '';
                        _this.model.developer.phone = r.data.dev_phone ? r.data.dev_phone : '';
                    }
                    _this.file1.image = _this.model.main_image;
                    // this.model.configurations.map((item) => {
                    //   item.images = item.images.map(r1 => r1.image);
                    // });
                    _this.model.custom_attributes = _this.model.custom_values;
                    _this.file5.image = _this.model.developer.image;
                    _this.file6.image = _this.model.developer.developer_image;
                    _this.admin.postDataApi('getAmenities', {}).subscribe(function (res) {
                        _this.all_amenities = res.data.map(function (item) { item.selected = false; return item; });
                        _this.allTowerAmenities = JSON.parse(JSON.stringify(_this.all_amenities));
                        _this.allTowerAmenityForEdit = JSON.parse(JSON.stringify(_this.all_amenities));
                        // setting true to selected amenties
                        // this.selected_amenities = this.all_amenities.map(item => {
                        //   if (this.model.amenities && this.model.amenities.find(am => am.id === item.id)) {
                        //     item.selected = true;
                        //   }
                        //   return item;
                        // });
                        for (var index = 0; index < _this.all_amenities.length; index++) {
                            for (var i = 0; i < _this.model.amenities.length; i++) {
                                if (_this.model.amenities[i].id === _this.all_amenities[index].id) {
                                    _this.all_amenities[index].selected = true;
                                    var pivot = _this.model.amenities[i]['pivot'];
                                    _this.all_amenities[index].images = pivot.images ? pivot.images : [];
                                }
                            }
                        }
                        if (_this.model.building_towers && _this.model.building_towers.length > 0) {
                            // setting true to tower selected amenities
                            _this.model.building_towers.map(function (item) {
                                item.amenitiesCount = item.amenities.length;
                                item.amenities.map(function (i) { i.selected = true; return i; });
                            });
                            // tower amenitites id array only
                            _this.model.building_towers.forEach(function (element) {
                                // const ele_ame = JSON.parse(JSON.stringify(element.amenities));
                                element.amenitiesId = element.amenities.map(function (op) {
                                    var pivot = op['pivot'];
                                    op.images = pivot.images ? pivot.images : [];
                                    return op.id;
                                });
                            });
                        }
                        else {
                            _this.model.building_towers = [];
                        }
                    });
                }, function (error) {
                    _this.parameter.loading = false;
                });
            }
            else {
                _this.model = new _models_addProject_model__WEBPACK_IMPORTED_MODULE_4__["AddProjectModel"]();
                _this.model.floors = 0;
                _this.model.building_towers = [];
                _this.model.building_tower_edit_index = '-1';
                _this.canEditdeveloperInfo = true;
                _this.admin.postDataApi('getAmenities', {}).subscribe(function (res) {
                    _this.all_amenities = res.data.map(function (item) { item.selected = false; item.images = []; return item; });
                    _this.allTowerAmenities = JSON.parse(JSON.stringify(_this.all_amenities));
                    _this.allTowerAmenityForEdit = JSON.parse(JSON.stringify(_this.all_amenities));
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
    AddProjectComponent.prototype.searchAmenity = function (keyword) {
        var _this = this;
        var input = { keyword: '' };
        input.keyword = keyword;
        this.admin.postDataApi('getAmenities', input).subscribe(function (res) {
            _this.all_amenities = res.data.map(function (item) { item.selected = false; item.images = []; return item; });
            _this.allTowerAmenities = JSON.parse(JSON.stringify(_this.all_amenities));
            _this.allTowerAmenityForEdit = JSON.parse(JSON.stringify(_this.all_amenities));
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
            _this.model.images = _this.file2.files;
        });
    };
    AddProjectComponent.prototype.modelOpen360ImgFun = function () {
        this.modal360ImageOpen.nativeElement.click();
        this.file7.backup(JSON.parse(JSON.stringify(this.model.images360)));
    };
    AddProjectComponent.prototype.modelClose360ImgFun = function () {
        this.modal360ImageClose.nativeElement.click();
    };
    AddProjectComponent.prototype.save360Images = function () {
        var _this = this;
        if (this.file7.files.length < 1) {
            swal('Error', 'Please select atleast one image', 'error');
            return false;
        }
        this.modal360ImageClose.nativeElement.click();
        this.file7.upload().then(function (r) {
            _this.model.images360 = _this.file7.files;
        });
    };
    AddProjectComponent.prototype.modelAmenityOpenFun = function (amenityObj, index) {
        this.amenity_index = index;
        this.amenity_obj = amenityObj;
        this.modalAmenOpen.nativeElement.click();
        this.file2.backup(JSON.parse(JSON.stringify(this.all_amenities[index].images)));
    };
    AddProjectComponent.prototype.modelAmenityCloseFun = function () {
        this.modalAmenClose.nativeElement.click();
    };
    AddProjectComponent.prototype.saveAmenityImages = function () {
        var _this = this;
        if (this.file2.files.length > 6) {
            swal('Error', 'You can choose maximum of 6 images.', 'error');
            return false;
        }
        if (this.file2.files.length < 1) {
            // swal('Error', 'Please select atleast one image', 'error'); return false;
            this.all_amenities[this.amenity_index].images = [];
            this.modalAmenClose.nativeElement.click();
            return false;
        }
        this.file2.upload().then(function (r) {
            console.log('img ', r, _this.file2.files);
            _this.all_amenities[_this.amenity_index].images = _this.file2.files;
        });
        console.log('img ', this.all_amenities[this.amenity_index].images);
        this.modalAmenClose.nativeElement.click();
    };
    AddProjectComponent.prototype.modelTowerAmenityOpenFun = function (amenityObj, index) {
        this.amenity_index = index;
        this.amenity_obj = amenityObj;
        this.allTowerAmenities[index] = amenityObj;
        // this.allTowerAmenityForEdit[index] = amenityObj;
        this.modalTowerAmenOpen.nativeElement.click();
        // console.log('allTowerAmenities', this.allTowerAmenities);
        this.file2.backup(JSON.parse(JSON.stringify(this.allTowerAmenities[index].images)));
    };
    AddProjectComponent.prototype.modelTowerAmenityCloseFun = function () {
        this.modalTowerAmenClose.nativeElement.click();
    };
    AddProjectComponent.prototype.saveTowerAmenityImages = function () {
        var _this = this;
        if (this.file2.files.length > 6) {
            swal('Error', 'You can choose maximum of 6 images.', 'error');
            return false;
        }
        if (this.file2.files.length < 1) {
            // swal('Error', 'Please select atleast one image', 'error'); return false;
            this.allTowerAmenities[this.amenity_index].images = [];
            // this.allTowerAmenityForEdit[this.amenity_index].images = [];
            this.modalTowerAmenClose.nativeElement.click();
            return false;
        }
        this.file2.upload().then(function (r) {
            console.log('img ', r, _this.file2.files);
            _this.allTowerAmenities[_this.amenity_index].images = _this.file2.files;
            // this.allTowerAmenityForEdit[this.amenity_index].images = this.file2.files;
        });
        console.log('img ', this.allTowerAmenities[this.amenity_index].images);
        this.modalTowerAmenClose.nativeElement.click();
    };
    AddProjectComponent.prototype.loadPlaces = function () {
        var _this = this;
        // load Places Autocomplete
        this.model.lat = '30.34';
        this.model.lng = '76.23';
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
                    _this.model.lat = _this.latitude;
                    _this.model.lng = _this.longitude;
                    if (place.formatted_address) {
                        _this.model.address = place.formatted_address;
                    }
                    _this.zoom = 16;
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
        this.myform = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', [
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required
            ]),
            address: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', [
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required
            ]),
            building_age: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', [
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required
            ]),
            building_type: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', [
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required
            ]),
            // floors: new FormControl('', [
            //   Validators.required
            // ]),
            // avg_price: new FormControl('', [
            //   Validators.required
            // ]),
            description: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', [
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required
            ]),
            possession_status_id: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', [
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required
            ])
        });
        this.myform2 = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', [
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required
            ]),
            address: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', [
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required
            ])
        });
    };
    AddProjectComponent.prototype.closeConfigPopUpFun = function () {
        this.closeConfigPopup.nativeElement.click();
        this.file4.reset();
    };
    AddProjectComponent.prototype.openConfigPopupFun = function () {
        this.openConfigPopup.nativeElement.click();
        this.addConfig.nativeElement.reset();
        this.new_config = new _models_addProject_model__WEBPACK_IMPORTED_MODULE_4__["Configuration"];
        this.new_config_edit = -1;
        this.file3.image = '';
        this.file4.files = [];
    };
    AddProjectComponent.prototype.selectConfiguration = function (id, parentModel) {
        var childModel = this.all_configurations.filter(function (r) { return r.id === id; });
        parentModel.config = childModel[0];
    };
    AddProjectComponent.prototype.editConfiguration = function (config, index) {
        var _this = this;
        this.new_config_edit = index;
        this.new_config = JSON.parse(JSON.stringify(config));
        this.file3.image = config.floor_map_image;
        this.file4.files = [];
        config.images.forEach(function (item, i) {
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
                _this.new_config.images = _this.file4.files;
                if (_this.new_config_edit >= 0) {
                    _this.model.configurations[_this.new_config_edit] = _this.new_config;
                }
                else {
                    _this.model.configurations.push(_this.new_config);
                }
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
        this.model.developer.dial_code = this.model.dev_dialcode;
        this.model.developer.country_code = this.model.dev_countrycode;
    };
    // addProject() {
    //   const modelSave = JSON.parse(JSON.stringify(this.model));
    //   modelSave.cover_image = this.file1.image;
    //   modelSave.building_images = modelSave.images.map(r => r.image);
    //   modelSave.images = modelSave.images.map(r => r.image);
    //   modelSave.dev_name = modelSave.developer.name;
    //   modelSave.dev_email = modelSave.developer.email;
    //   modelSave.dev_phone = modelSave.developer.phone;
    //   modelSave.dev_logo = this.file5.image;
    //   modelSave.amenities = this.all_amenities.filter(op => { if (op.selected === true) { return op; }}).map(op => op.id);
    //   modelSave.configurations.forEach(item => {
    //     item.images = item.images.map(x => x.image);
    //   });
    //   /* remove fields for edit */
    //   if (!modelSave.name) {swal('Error', 'Please add building name', 'error'); return false; }
    //   if (!modelSave.address) {swal('Error', 'Please add address', 'error'); return false; }
    //   if (!modelSave.cover_image) {swal('Error', 'Please add cover image', 'error'); return false; }
    //   if (!modelSave.cover_image) {swal('Error', 'Please add cover image', 'error'); return false; }
    //   if (modelSave.building_images.length < 1) {swal('Error', 'Please add atleast one more building image', 'error'); return false; }
    //   if (!modelSave.building_age) {swal('Error', 'Please add building age', 'error'); return false; }
    //   if (!modelSave.building_type_id) {swal('Error', 'Please add building type', 'error'); return false; }
    //   if (!modelSave.description) {swal('Error', 'Please add building description', 'error'); return false; }
    //   if (!modelSave.possession_status_id) {swal('Error', 'Please add possession status', 'error'); return false; }
    //   if (!modelSave.floors) {swal('Error', 'Please add floors', 'error'); return false; }
    //   if (!modelSave.launch_date) {swal('Error', 'Please add building launch date', 'error'); return false; }
    //   if (!modelSave.avg_price) {swal('Error', 'Please add building average price', 'error'); return false; }
    //   if (modelSave.amenities.length < 1) {swal('Error', 'Please add amenities', 'error'); return false; }
    //   if (modelSave.configurations.length < 1) {swal('Error', 'Please add building configuration', 'error'); return false; }
    //   if (!this.id) {
    //     if (!modelSave.dev_name) {swal('Error', 'Please add developer name', 'error'); return false; }
    //     if (!modelSave.dev_countrycode) {swal('Error', 'Please add developer country code', 'error'); return false; }
    //     if (!modelSave.dev_email) {swal('Error', 'Please add developer email', 'error'); return false; }
    //     if (!modelSave.dev_phone) {swal('Error', 'Please add developer phone', 'error'); return false; }
    //     if (!modelSave.dev_logo) {swal('Error', 'Please add developer image', 'error'); return false; }
    //   }
    //   if (this.id) {
    //     modelSave.building_id = this.id;
    //     modelSave.developer_id =  modelSave.developer.id;
    //     this.parameter.loading = true;
    //     this.admin.postDataApi('updateProject', modelSave).subscribe(success => {
    //       this.parameter.loading = false;
    //       swal('Success', success.message, 'success');
    //       this.router.navigate(['/dashboard/projects/view-projects']);
    //     }, error => {
    //       this.parameter.loading = false;
    //       swal('Error', error.message, 'error');
    //     });
    //   }else {
    //     delete modelSave.id;
    //     delete modelSave.building_id;
    //     this.parameter.loading = true;
    //     this.admin.postDataApi('addProject', modelSave).subscribe(success => {
    //       this.parameter.loading = false;
    //       swal('Success', success.message, 'success');
    //       this.router.navigate(['/dashboard/projects/view-projects']);
    //     }, error => {
    //       this.parameter.loading = false;
    //       swal('Error', error.message, 'error');
    //     });
    //   }
    // }
    AddProjectComponent.prototype.addProject = function () {
        var _this = this;
        var modelSave = JSON.parse(JSON.stringify(this.model));
        modelSave.is_completed = 0;
        modelSave.cover_image = this.file1.image;
        if (this.model.videoLoader) {
            swal('Error', 'Uploading video.', 'error');
            return;
        }
        if (modelSave.images) {
            modelSave.building_images = modelSave.images.map(function (r) { return r.image; });
        }
        if (modelSave.images360) {
            modelSave.images360 = modelSave.images360.map(function (r) { return r.image; });
        }
        modelSave.videos = modelSave.videos ? JSON.stringify(modelSave.videos) : JSON.stringify([]);
        modelSave.dev_name = modelSave.developer.name;
        modelSave.dev_email = modelSave.developer.email;
        modelSave.dev_phone = modelSave.developer.phone;
        modelSave.dev_countrycode = modelSave.developer.country_code ? modelSave.developer.country_code : this.constant.country_code;
        modelSave.dev_dialcode = modelSave.developer.dial_code ? modelSave.developer.dial_code : this.constant.dial_code;
        modelSave.dev_logo = this.file5.image;
        modelSave.developer_image = this.file6.image;
        modelSave.amenities = this.all_amenities.filter(function (op) { if (op.selected === true) {
            return op;
        } });
        if (modelSave.amenities && modelSave.amenities.length > 0) {
            modelSave.amenities.forEach(function (element) {
                var img = [];
                element.images.forEach(function (e) {
                    img.push(e.image);
                });
                element.images = img;
            });
        }
        if (modelSave.configurations && modelSave.configurations.length > 0) {
            modelSave.configurations.forEach(function (item) {
                item.images = item.images.map(function (x) { return x.image; });
            });
        }
        console.log('tower mamrn', modelSave.building_towers);
        modelSave.building_towers = this.model.building_towers;
        if (modelSave.building_towers && modelSave.building_towers.length > 0) {
            modelSave.building_towers.forEach(function (element1) {
                element1.amenities.forEach(function (element) {
                    var img = [];
                    element.images.forEach(function (e) {
                        img.push(e.image);
                    });
                    element.images = img;
                });
            });
        }
        console.log('tower mamrn', modelSave.building_towers);
        /* remove fields for edit */
        // if (!modelSave.name) {swal('Error', 'Please add building name', 'error'); return false; }
        // if (!modelSave.address) {swal('Error', 'Please add address', 'error'); return false; }
        // if (!modelSave.cover_image) {swal('Error', 'Please add cover image', 'error'); return false; }
        // if (!modelSave.cover_image) {swal('Error', 'Please add cover image', 'error'); return false; }
        // if (modelSave.building_images.length < 1) {swal('Error', 'Please add atleast one more building image', 'error'); return false; }
        // if (!modelSave.building_age) {swal('Error', 'Please add building age', 'error'); return false; }
        // if (!modelSave.building_type_id) {swal('Error', 'Please add building type', 'error'); return false; }
        // if (!modelSave.description) {swal('Error', 'Please add building description', 'error'); return false; }
        // if (!modelSave.possession_status_id) {swal('Error', 'Please add possession status', 'error'); return false; }
        // if (!modelSave.floors) {swal('Error', 'Please add floors', 'error'); return false; }
        // if (!modelSave.launch_date) {swal('Error', 'Please add building launch date', 'error'); return false; }
        // if (!modelSave.avg_price) {swal('Error', 'Please add building average price', 'error'); return false; }
        // if (modelSave.amenities.length < 1) {swal('Error', 'Please add amenities', 'error'); return false; }
        // if (modelSave.configurations.length < 1) {swal('Error', 'Please add building configuration', 'error'); return false; }
        // if (!this.id) {
        //   if (!modelSave.dev_name) {swal('Error', 'Please add developer name', 'error'); return false; }
        //   if (!modelSave.dev_countrycode) {swal('Error', 'Please add developer country code', 'error'); return false; }
        //   if (!modelSave.dev_email) {swal('Error', 'Please add developer email', 'error'); return false; }
        //   if (!modelSave.dev_phone) {swal('Error', 'Please add developer phone', 'error'); return false; }
        //   if (!modelSave.dev_logo) {swal('Error', 'Please add developer image', 'error'); return false; }
        // }
        if (modelSave.dev_email) {
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
        if (modelSave.name && modelSave.address && modelSave.address != null && modelSave.cover_image &&
            modelSave.building_images.length > 0 && modelSave.building_age && modelSave.building_age != null && modelSave.building_type_id &&
            modelSave.description && modelSave.description != null && modelSave.possession_status_id &&
            // modelSave.floors && modelSave.floors != null &&
            modelSave.launch_date && modelSave.launch_date != null &&
            // modelSave.avg_price && modelSave.avg_price != null &&
            modelSave.amenities.length > 0 &&
            modelSave.configurations.length > 0 && modelSave.dev_email && modelSave.dev_email != null
            && modelSave.dev_name && modelSave.dev_name != null
            && modelSave.dev_phone && modelSave.dev_phone != null && modelSave.dev_logo) {
            modelSave.is_completed = 1;
            // swal('Error', 'Please add building name', 'error');
            // return false;
        }
        // if (this.id) {
        //   if (modelSave.dev_name && modelSave.dev_countrycode && modelSave.dev_email && modelSave.dev_phone &&
        //     modelSave.dev_logo) {
        //       modelSave.is_completed = 1;
        //     // swal('Error', 'Please add developer name', 'error');
        //     // return false;
        //   }
        // }
        if (this.model.building_request_id) {
            modelSave.building_request_id = this.model.building_request_id;
        }
        if (this.id) {
            modelSave.building_id = this.id;
            modelSave.developer_id = modelSave.developer.id;
            this.parameter.loading = true;
            this.admin.postDataApi('updateProject', modelSave).subscribe(function (success) {
                _this.parameter.loading = false;
                swal('Success', 'Updated successfully.', 'success');
                // set model to avoid duplication creation of project
                _this.setProjectModel(success['data']);
                // this.router.navigate(['/dashboard/projects/view-projects']);
            }, function (error) {
                _this.parameter.loading = false;
                swal('Error', error.message, 'error');
            });
        }
        else {
            delete modelSave.id;
            delete modelSave.building_id;
            this.parameter.loading = true;
            this.admin.postDataApi('addProject', modelSave).subscribe(function (success) {
                _this.parameter.loading = false;
                swal('Success', 'Added successfully.', 'success');
                // set model to avoid duplication creation of project
                _this.id = success['data'].id;
                _this.setProjectModel(success['data']);
                // this.router.navigate(['/dashboard/projects/view-projects']);
            }, function (error) {
                _this.parameter.loading = false;
                swal('Error', error.message, 'error');
            });
        }
    };
    AddProjectComponent.prototype.file2Select = function ($event) {
        // if ((this.file2.files.length + $event.target.files.length) > 6) {
        //   swal('Limit exceeded', 'You can upload maximum of 6 images', 'error');
        //   return false;
        // }
        this.file2.onSelectFile($event);
    };
    AddProjectComponent.prototype.file4Select = function ($event) {
        // if ((this.file4.files.length + $event.target.files.length) > 6) {
        //   swal('Limit exceeded', 'You can upload maximum of 6 images', 'error');
        //   return false;
        // }
        this.file4.onSelectFile($event);
    };
    AddProjectComponent.prototype.file7Select = function ($event) {
        this.file7.onSelectFile($event);
    };
    AddProjectComponent.prototype.file8Select = function ($event) {
        var uu = this.file8.onSelectFile($event);
    };
    AddProjectComponent.prototype.addNewCustom = function () {
        if (!this.new_custom.name || !this.new_custom.value) {
            swal('Error', 'Please add parameter name and value', 'error');
            return false;
        }
        this.model.custom_attributes.unshift(this.new_custom);
        this.new_custom = { name: '', value: '' };
    };
    AddProjectComponent.prototype.setProjectModel = function (data) {
        var _this = this;
        this.model = JSON.parse(JSON.stringify(data));
        this.model.building_tower_edit_index = '-1';
        if (data.developer == null) {
            this.model.developer = {
                id: '', name: '', email: '',
                country_code: this.constant.country_code,
                dial_code: this.constant.dial_code,
                phone: '', logo: '', image: '',
                developer_image: '', developer_desc: '', developer_company: ''
            };
            this.model.developer.name = data.developer != null && data.developer.name ? data.developer.name : '';
            this.model.developer.email = data.developer != null && data.developer.email ? data.developer.email : '';
            this.model.developer.phone = data.developer != null && data.developer.phone ? data.developer.phone : '';
            this.model.developer.developer_company = data.developer != null &&
                data.developer.developer_company ? data.developer.developer_company : '';
            this.model.developer.developer_desc = data.developer != null && data.developer.developer_desc ? data.developer.developer_desc : '';
        }
        this.file1.image = this.model.main_image;
        // this.model.configurations.map((item) => {
        //   item.images = item.images.map(r1 => r1.image);
        // });
        this.model.custom_attributes = this.model.custom_values;
        this.file5.image = this.model.developer.image;
        this.file6.image = this.model.developer.developer_image;
        this.admin.postDataApi('getAmenities', {}).subscribe(function (res) {
            _this.all_amenities = res.data.map(function (item) { item.selected = false; item.images = []; return item; });
            _this.allTowerAmenities = JSON.parse(JSON.stringify(_this.all_amenities));
            _this.allTowerAmenityForEdit = JSON.parse(JSON.stringify(_this.all_amenities));
            // this.selected_amenities = this.all_amenities.map(item => {
            //   if (this.model.amenities.find(am => am.id === item.id)) {
            //     item.selected = true;
            //   }
            //   return item;
            // });
            for (var index = 0; index < _this.all_amenities.length; index++) {
                for (var i = 0; i < _this.model.amenities.length; i++) {
                    if (_this.model.amenities[i].id === _this.all_amenities[index].id) {
                        _this.all_amenities[index].selected = true;
                        var pivot = _this.model.amenities[i]['pivot'];
                        _this.all_amenities[index].images = pivot.images ? pivot.images : [];
                    }
                }
            }
        });
        if (this.model.building_towers && this.model.building_towers.length > 0) {
            // setting true to tower selected amenities
            this.model.building_towers.map(function (item) {
                item.amenitiesCount = item.amenities.length;
                item.amenities.map(function (i) { i.selected = true; return i; });
            });
            // tower amenitites id array only
            this.model.building_towers.forEach(function (element) {
                // const ele_ame = JSON.parse(JSON.stringify(element.amenities));
                element.amenitiesId = element.amenities.map(function (op) {
                    var pivot = op['pivot'];
                    op.images = pivot.images ? pivot.images : [];
                    return op.id;
                });
            });
        }
        else {
            this.model.building_towers = [];
        }
    };
    AddProjectComponent.prototype.selectDeveloper = function (name) {
        var _this = this;
        this.parameter.loading = true;
        this.admin.postDataApi('getDevelopersFrAdmin', { name: name }).subscribe(function (r) {
            _this.parameter.loading = false;
            _this.all_developers = r.data;
            if (!name) {
                _this.openDeveloperListModel.nativeElement.click();
            }
        });
    };
    AddProjectComponent.prototype.addDeveloper = function () {
        this.router.navigate(['/dashboard/developers/add-developer/0']);
        // this.canEditdeveloperInfo = true;
        // this.model.developer = {
        //   id: '',
        //   name: '',
        //   email: '',
        //   country_code: this.constant.country_code,
        //   dial_code: this.constant.dial_code,
        //   phone: '',
        //   logo: '',
        //   image: '',
        //   developer_image: ''
        // };
        // this.file5.image = '';
        // this.file6.image = '';
        // this.closeDeveloperListModel.nativeElement.click();
    };
    AddProjectComponent.prototype.setDeveloper = function (item) {
        this.canEditdeveloperInfo = false;
        this.model.developer = {
            id: '', name: '', email: '',
            country_code: this.constant.country_code,
            dial_code: this.constant.dial_code,
            phone: '', logo: '', image: '', developer_image: '',
            developer_company: '', developer_desc: ''
        };
        this.model.developer.id = item.id;
        this.model.developer_id = item.id;
        this.model.developer.name = item.name;
        this.model.developer.email = item.email;
        this.model.developer.phone = item.phone;
        this.model.developer.dial_code = item.dial_code;
        this.model.developer.country_code = item.country_code;
        this.model.developer.logo = item.image;
        this.model.developer.developer_company = item.developer_company;
        this.model.developer.developer_desc = item.developer_desc;
        this.file5.image = item.image;
        this.file6.image = item.developer_image;
        this.closeDeveloperListModel.nativeElement.click();
    };
    AddProjectComponent.prototype.addNewTower = function () {
        // if (this.model.building_tower_edit_index) {
        //   swal('First save the previous editted tower.');
        // }
        if (!this.newTower.tower_name) {
            swal('Error', 'Please enter tower name.', 'error');
            return false;
        }
        if (!this.newTower.num_of_floors && this.newTower.num_of_floors !== 0) {
            swal('Error', 'Please enter no. of floors.', 'error');
            return false;
        }
        if (!this.newTower.possession_status_id) {
            swal('Error', 'Please choose possession status.', 'error');
            return false;
        }
        if (!this.newTower.launch_date) {
            swal('Error', 'Please enter launch date.', 'error');
            return false;
        }
        var tempAmen = JSON.parse(JSON.stringify(this.allTowerAmenities));
        console.log('tempamane', tempAmen);
        this.selectedTowerAmenitiesId = tempAmen.filter(function (op) { if (op.selected === true) {
            return op;
        } });
        // this.selectedTowerAmenitiesId = tempAmen.filter(op => { if (op.selected === true) { return op; } }).map(op => op.id);
        this.selectedTowerAmenityObj = tempAmen.filter(function (op) { if (op.selected === true) {
            return op;
        } });
        console.log(this.selectedTowerAmenityObj);
        this.newTower.amenities = this.selectedTowerAmenityObj;
        this.newTower.amenitiesId = this.selectedTowerAmenitiesId;
        this.newTower.amenitiesCount = this.newTower.amenities.length;
        if (this.newTower.amenities.length < 1) {
            // swal('Error', 'Please choose tower amenities.', 'error'); return false;
            this.newTower.amenities = [];
        }
        this.model.building_towers.push(this.newTower);
        this.showAddBtn = true;
        console.log('this.model.building_towers', this.model.building_towers);
        // setting tower to empty
        this.newTower = new _models_addProject_model__WEBPACK_IMPORTED_MODULE_4__["Towers"]();
        this.allTowerAmenities.map(function (op) { op.selected = false; });
    };
    AddProjectComponent.prototype.editTower = function (btower, index) {
        console.log('edit', btower, index);
        if (this.model.building_tower_edit_index !== '-1') {
            swal('Warning', 'First save the previous editted tower.', 'warning');
            return;
        }
        this.model.building_tower_edit_index = index;
        // setting allTowerAmenityForEdit images
        for (var index1 = 0; index1 < this.allTowerAmenityForEdit.length; index1++) {
            for (var i = 0; i < btower.amenities.length; i++) {
                if (btower.amenities[i].id === this.allTowerAmenityForEdit[index1].id) {
                    this.allTowerAmenityForEdit[index1].selected = btower.amenities[i].selected;
                    var pivot = btower.amenities[i]['pivot'];
                    this.allTowerAmenityForEdit[index1].images = pivot.images ? pivot.images : [];
                }
            }
        }
        console.log('aaa222222222', this.allTowerAmenityForEdit);
    };
    AddProjectComponent.prototype.deleteTower = function (index) {
        var _this = this;
        swal({
            title: 'Are you sure?',
            text: 'Do you want to delete?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes, Delete!'
        }).then(function (result) {
            if (result.value) {
                var btid = _this.model.building_towers[index].id;
                _this.model.building_towers.splice(index, 1);
                if (btid) {
                    _this.admin.postDataApi('deleteTower', { building_towers_id: btid }).subscribe(function (res) {
                        // console.log('sss', res);
                    });
                }
            }
        });
    };
    AddProjectComponent.prototype.saveTower = function (btower, index) {
        // this.allTowerAmenityForEdit = btower.amenities;
        if (!this.model.building_towers[index].tower_name) {
            swal('Error', 'Please enter tower name.', 'error');
            return false;
        }
        if (!this.model.building_towers[index].num_of_floors) {
            swal('Error', 'Please enter no. of floors.', 'error');
            return false;
        }
        if (!this.model.building_towers[index].possession_status_id) {
            swal('Error', 'Please choose possession status.', 'error');
            return false;
        }
        if (!this.model.building_towers[index].launch_date) {
            swal('Error', 'Please enter launch date.', 'error');
            return false;
        }
        // this.selectedTowerAmenitiesId = btower.amenities.filter(op => { if (op.selected === true) { return op; } }).map(op => op.id);
        this.selectedTowerAmenitiesId = btower.amenities.filter(function (op) { if (op.selected === true) {
            return op;
        } });
        this.selectedTowerAmenityObj = btower.amenities.filter(function (op) { if (op.selected === true) {
            return op;
        } });
        this.model.building_towers[index].amenitiesId = this.selectedTowerAmenitiesId;
        this.model.building_towers[index].amenities = this.selectedTowerAmenityObj;
        if (this.model.building_towers[index].amenities.length < 1) {
            // swal('Error', 'Please choose tower amenities.', 'error'); return false;
            this.model.building_towers[index].amenities = [];
            this.allTowerAmenityForEdit.map(function (i) { i.selected = false; return i; });
        }
        console.log('aaaaaaaaa', this.model.building_towers);
        console.log('pppppppppp', this.allTowerAmenityForEdit);
        // btower.amenities.map(item => { item.images = []; return item; });
        this.model.building_towers[index].amenitiesCount = this.model.building_towers[index].amenities.length;
        this.model.building_tower_edit_index = '-1';
    };
    AddProjectComponent.prototype.editTowerAmenity = function (btoweramenity, index) {
        console.log('btoweramenity', btoweramenity);
        this.towerAmenityIndex = index;
        this.towerEditAmenitiesModal.nativeElement.click();
        // this.allTowerAmenityForEdit.map(item => { item.selected = false; return item; });
        btoweramenity = btoweramenity.filter(function (op) { if (op.selected === true) {
            return op;
        } });
        this.allTowerAmenityForEdit.map(function (item) {
            if (btoweramenity.find(function (am) { return am.id === item.id; })) {
                item.selected = true;
            }
            return item;
        });
        console.log('aaaaaa', this.allTowerAmenityForEdit);
    };
    AddProjectComponent.prototype.setTowerAmenity = function (a, m) {
        console.log('allTowerAmenityForEdit', this.allTowerAmenityForEdit);
        console.log('a', a);
        this.allTowerAmenityForEdit[m].selected = !this.allTowerAmenityForEdit[m].selected;
        this.model.building_towers[this.towerAmenityIndex].amenities =
            this.allTowerAmenityForEdit.filter(function (op) { if (op.selected === true) {
                return op;
            } });
        // this.model.building_towers[this.towerAmenityIndex].amenitiesId =
        // this.allTowerAmenityForEdit.filter(op => { if (op.selected === true) { return op; } }).map(op => op.id);
        this.model.building_towers[this.towerAmenityIndex].amenitiesId =
            this.allTowerAmenityForEdit.filter(function (op) { if (op.selected === true) {
                return op;
            } });
        this.model.building_towers[this.towerAmenityIndex].amenitiesCount = this.model.building_towers[this.towerAmenityIndex].amenities.length;
    };
    AddProjectComponent.prototype.showCanvas = function (event) {
        var _this = this;
        if (event.target.files[0].size > this.constant.fileSizeLimit) {
            swal('Error', this.constant.errorMsg.FILE_SIZE_EXCEEDS, 'error');
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
    AddProjectComponent.prototype.newcanvas = function (video, videoFile) {
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
    AddProjectComponent.prototype.dataURLtoFile = function (dataurl, filename) {
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
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddProjectComponent.prototype, "modalClose", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalOpen'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddProjectComponent.prototype, "modalOpen", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalAmenClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddProjectComponent.prototype, "modalAmenClose", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalAmenOpen'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddProjectComponent.prototype, "modalAmenOpen", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalTowerAmenClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddProjectComponent.prototype, "modalTowerAmenClose", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalTowerAmenOpen'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddProjectComponent.prototype, "modalTowerAmenOpen", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modal360ImageClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddProjectComponent.prototype, "modal360ImageClose", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modal360ImageOpen'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddProjectComponent.prototype, "modal360ImageOpen", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('mapDiv'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddProjectComponent.prototype, "mapDiv", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('search'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddProjectComponent.prototype, "searchElementRef", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('openConfigPopup'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddProjectComponent.prototype, "openConfigPopup", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('closeConfigPopup'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddProjectComponent.prototype, "closeConfigPopup", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('addConfig'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddProjectComponent.prototype, "addConfig", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('openDeveloperListModel'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddProjectComponent.prototype, "openDeveloperListModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('closeDeveloperListModel'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddProjectComponent.prototype, "closeDeveloperListModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('towerEditAmenitiesModal'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddProjectComponent.prototype, "towerEditAmenitiesModal", void 0);
    AddProjectComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-add-project',
            template: __webpack_require__(/*! ./add-project.component.html */ "./src/app/layout/projects/add-project/add-project.component.html"),
            styles: [__webpack_require__(/*! ./add-project.component.css */ "./src/app/layout/projects/add-project/add-project.component.css")],
            providers: [_models_addProject_model__WEBPACK_IMPORTED_MODULE_4__["AddProjectModel"], _common_constants__WEBPACK_IMPORTED_MODULE_6__["Constant"], _models_addProject_model__WEBPACK_IMPORTED_MODULE_4__["Towers"]]
        }),
        __metadata("design:paramtypes", [_models_addProject_model__WEBPACK_IMPORTED_MODULE_4__["AddProjectModel"],
            _services_admin_service__WEBPACK_IMPORTED_MODULE_2__["AdminService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _agm_core__WEBPACK_IMPORTED_MODULE_5__["MapsAPILoader"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"],
            _common_constants__WEBPACK_IMPORTED_MODULE_6__["Constant"],
            src_app_services_common_service__WEBPACK_IMPORTED_MODULE_8__["CommonService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]])
    ], AddProjectComponent);
    return AddProjectComponent;
}());



/***/ }),

/***/ "./src/app/layout/projects/project-details/project-details.component.css":
/*!*******************************************************************************!*\
  !*** ./src/app/layout/projects/project-details/project-details.component.css ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/layout/projects/project-details/project-details.component.html":
/*!********************************************************************************!*\
  !*** ./src/app/layout/projects/project-details/project-details.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<div *ngIf=\"!project\" style=\"margin-top:120px;\" class=\"container\" >\n  <img style=\"width:100%\" src=\"assets/img/loading_content.gif\">\n</div>\n<div class=\"inner-page-wrapper details-page gray-bg-1\" *ngIf=\"project\">\n <div class=\"container\">\n\n    <div class=\"clearfix\"></div>\n    <div class=\"details-header marginB30\">\n       <div class=\"row\">\n          <div class=\"col-md-6 col-12\">\n             <h4>{{project.name}} <span *ngIf=\"project.building_type\" class=\"new-project\">{{project.building_type.name}}</span></h4>\n             <p class=\"p14\" *ngIf=\"project.developer\">By {{project.developer.name}}</p>\n             <p class=\"p18\">{{project.address}}</p>\n          </div>\n          {{fixed}}\n          <div class=\"col-md-6 col-12\">\n             <div class=\"header-details-right text-right\">\n                <p class=\"p18\">\n                  <span>{{ts.lang.Base_Price}}:</span>\n                  {{base_price_min|thousand}}\n                   <b *ngIf=\"base_price_max\">-</b>\n                   <b *ngIf=\"base_price_max\">{{base_price_max|thousand}}</b>\n                </p>\n                <p class=\"p16\">{{ts.lang.Price_on_Request}}</p>\n                <div class=\"btn-cont float-right\">\n                  <!-- <a [ngx-scroll-to]=\"'#bottomDetails'\" class=\"btn btn-primary btn-lg\" href=\"javascript://\">Contact Developer</a> -->\n                </div>\n             </div>\n          </div>\n       </div>\n    </div>\n    <div class=\"details-photos\">\n       <div class=\"row cust-row\">\n          <div class=\"col-md-8 cust-col\">\n             <!-- <img class=\"main-photo img-fluid\" [src]=\"project.main_image\" onerror='this.src=\"http://via.placeholder.com/770x416\"' alt=\"img\"> -->\n             <img class=\"main-photo img-fluid\" onerror='this.src=\"assets/img/placeholder.png\"' [defaultImage]=\"project?.main_image| img:'thumb'\" [lazyLoad]=\"project?.main_image\">\n          </div>\n          <div class=\"col-md-4 cust-col\" *ngIf=\"project.images\">\n              <img *ngIf=\"project.images[0]\" class=\"secondary-photo img-fluid\" onerror='this.src=\"assets/img/placeholder.png\"' [defaultImage]=\"project.images[0].image| img:'thumb'\" [lazyLoad]=\"project.images[0].image\">\n              <img *ngIf=\"project.images[1]\" class=\"secondary-photo img-fluid\" onerror='this.src=\"assets/img/placeholder.png\"' [defaultImage]=\"project.images[1].image| img:'thumb'\" [lazyLoad]=\"project.images[1].image\">\n             <!-- <img *ngIf=\"project.images[0]\" class=\"secondary-photo img-fluid\" [src]=\"project.images[0].image\" onerror=\"this.src='http://via.placeholder.com/392x200'\" alt=\"img\">\n             <img *ngIf=\"project.images[1]\"class=\"secondary-photo img-fluid\" [src]=\"project.images[1].image\" onerror=\"this.src='http://via.placeholder.com/392x200'\" alt=\"img\"> -->\n          </div>\n       </div>\n\n       <!-- <a *ngIf=\"project.images.length > 2\" class=\"btn view-photos\" href=\"javascript://\">{{ts.lang.View_Photos}}</a> -->\n    </div>\n    <div class=\"img-des\">\n       <div class=\"row\">\n          <div class=\"col-md-3 col-sm-6 col-12 img-c\">\n             <div class=\"block\">\n                <p class=\"p18\">{{project.starting_price| thousand}}</p>\n                <p class=\"p13\">{{ts.lang.Min_Price_per_Sq_feet}}</p>\n             </div>\n          </div>\n          <div class=\"col-md-3 col-sm-6 col-12 img-c\">\n             <div class=\"block\">\n                <p class=\"p18\">{{config_string}}</p>\n                <p class=\"p13\">{{ts.lang.Configuration}}</p>\n             </div>\n          </div>\n          <div class=\"col-md-3 col-sm-6 col-12 img-c\">\n             <div class=\"block\">\n                <p *ngIf=\"project.launch_date\"class=\"p18\">{{project.launch_date| date:\"d MMM y\"}}</p>\n                <p *ngIf=\"!project.launch_date\" class=\"p18\">{{ts.lang.Not_available}}</p>\n                <p class=\"p13\">{{ts.lang.Possession_Date}}</p>\n             </div>\n          </div>\n          <div class=\"col-md-3 col-sm-6 col-12 img-c\">\n             <div *ngIf=\"configuration\" class=\"block\">\n                <p class=\"p18\">{{carpet_area_string}}</p>\n                <p class=\"p13\">{{ts.lang.Carpet_Area}} <i><img src=\"assets/img/info.png\" alt=\"img\"></i></p>\n             </div>\n          </div>\n       </div>\n    </div>\n </div>\n <div class=\"cust-tabs full-width-tabs marginT20\">\n    <hr id=\"bottomDetails\">\n    <div class=\"container\">\n       <ul class=\"nav nav-pills\">\n          <li class=\"nav-item {{active}}\">\n             <a class=\"nav-link\" data-toggle=\"pill\" href=\"#one\">{{ts.lang.Overview}}</a>\n          </li>\n          <li class=\"nav-item\">\n             <a class=\"nav-link\" data-toggle=\"pill\" (click)=\"active=''\" href=\"#two\">{{ts.lang.Configs}}</a>\n          </li>\n          <li class=\"nav-item\">\n             <a class=\"nav-link\" data-toggle=\"pill\" (click)=\"active=''\" href=\"#three\">{{ts.lang.Amenities}}</a>\n          </li>\n          <li class=\"nav-item\">\n             <a class=\"nav-link\" data-toggle=\"pill\" (click)=\"active=''\" href=\"#four\">{{ts.lang.Developer}}</a>\n          </li>\n\n       </ul>\n    </div>\n    <hr>\n    <div class=\"spacer30\"></div>\n    <div class=\"container\">\n       <div class=\"row\">\n          <div class=\"col-lg-7 col-md-12 col-sm-12 col-12\">\n             <div class=\"white-bg padding40\">\n                <div class=\"tab-content\">\n                   <div class=\"tab-pane active\" id=\"one\">\n                      <p class=\"p14\">{{ts.lang.Overview}}</p>\n                      <p class=\"newline\">{{project.description}}</p>\n\n                      <div class=\"row\">\n                        <div *ngIf=\"project.custom_values\" class=\"overview-table marginT15 col-6\">\n                          <table style=\"width: 100%\">\n                            <tbody>\n                               <tr *ngFor=\"let item of project.custom_values\">\n                                  <td><label>{{item.name}}:</label></td>\n                                  <td><label>{{item.value}}</label></td>\n                               </tr>\n                            </tbody>\n                         </table>\n                        </div>\n                      </div>\n\n                      <div class=\"map-3 marginT30\">\n                         <div style=\"height:200px;\" #mapListing>\n                         </div>\n                      </div>\n<!-- \n                      <div class=\"spacer30\"></div>\n\n                      <p *ngIf=\"project.configurations.length > 0\" class=\"p14\">{{ts.lang.Configs}}</p>\n                      <div *ngFor=\"let config of project.configurations\">\n                        <div class=\"config-table\">\n                           <table style=\"width:100%;\">\n                              <tbody>\n                                 <tr>\n                                    <th>{{ts.lang.Configuration_type}}</th>\n                                    <th>{{ts.lang.Carpet_Area}}</th>\n                                    <th>{{ts.lang.Base_Price}}</th>\n                                 </tr>\n                                 <tr>\n                                    <td>\n                                      <p class=\"p14 marginB0\">{{config.config.name}}</p>\n                                      <p></p>\n                                   </td>\n                                    <td>\n                                       <table style=\"width:100%;\">\n                                          <tbody>\n                                             <tr>\n                                                <td>{{config.carpet_area}} sqmt</td>\n                                             </tr>\n\n                                          </tbody>\n                                       </table>\n                                    </td>\n                                    <td>\n                                       <table style=\"width:100%;\">\n                                          <tbody>\n                                             <tr>\n                                                <td>{{config.base_price | thousand}}</td>\n                                             </tr>\n                                          </tbody>\n                                       </table>\n                                    </td>\n                                 </tr>\n                              </tbody>\n                           </table>\n                        </div>\n                        <div class=\"fig-block padding40 text-center\">\n                           <img class=\"img-fluid\" [src]=\"config.floor_map_image\" alt=\"img\">\n                        </div>\n                      </div>\n\n\n                      <div class=\"spacer30\"></div>\n                      <p class=\"p14\">{{ts.lang.Amenities}}</p>\n                      <div class=\"icons-group\">\n                         <div *ngFor=\"let am of project.amenities\" class=\"icons-control\">\n                            <div class=\"fig-block\">\n                               <img  class=\"icon\" [src]=\"am.icon\" onerror='src=\"http://via.placeholder.com/24x24\"' alt=\"img\">\n                            </div>\n                            <p class=\"p13\">{{am.name}}</p>\n                         </div>\n                     </div>\n\n                     <div *ngIf=\"project.banks.length > 0\">\n                       <div class=\"row\">\n                           <div class=\"col-6\">\n                              <p class=\"p14\">{{ts.lang.Home_Loans}}</p>\n                           </div>\n                           <div class=\"col-6\" *ngIf=\"project.banks.length > 3 && bankClicked == false\">\n                              <div class=\"text-right\">\n                                 <a class=\"see-more\" (click)=\"bankLimit = 100; bankClicked = true;\" href=\"javascript://\"><span>+{{project.banks.length - 3}} more</span> <i class=\"fa fa-angle-right\"></i></a>\n                              </div>\n                           </div>\n                        </div>\n                        <div class=\"bank-blocks\">\n                          <div  *ngFor=\"let bank of project.banks | slice : 0 : bankLimit\"  class=\"block\">\n                             <div class=\"fig-block text-center\">\n                                <img class=\"img-fluid\" [src]=\"bank.image\" onerror=\"this.src='http://via.placeholder.com/152x48'\" alt=\"img\">\n                             </div>\n                             <div class=\"d-flex\">\n                                <p class=\"p13\">{{ts.lang.Fixed_Interest}}</p>\n                                <p class=\"p16\">{{bank.floating_int}}</p>\n                             </div>\n                          </div>\n                       </div>\n                     </div>\n\n                     <p *ngIf=\"project.developer\" class=\"p14 marginT30\">{{ts.lang.Contact_Developer}}</p>\n                     <div *ngIf=\"project.developer\" class=\"contact-developer white-bg\">\n                        <table class=\"table\">\n                           <tr>\n                              <td style=\"width:10%\">\n                                 <div class=\"fig-block\">\n                                    <img class=\"img-fluid\" [src]=\"project.developer.developer_image\" src=\"http://via.placeholder.com/56x56\" alt=\"img\">\n                                 </div>\n                              </td>\n                              <td style=\"width:50%\">\n                                 <p class=\"p11\">{{ts.lang.Developer}}</p>\n                                 <p class=\"p16\">{{project.developer.name}}</p>\n                                 <p class=\"p13\">{{project.developer.developer_title}}</p>\n                              </td>\n                              <td style=\"width:40%;\">\n                                 <p class=\"p16\">1</p>\n                                 <p class=\"p13\">{{ts.lang.Projects}}</p>\n                              </td>\n                           </tr>\n                           <tr>\n                              <td>\n                                 &nbsp;\n                              </td>\n                              <td>\n                                 <p class=\"p12\">{{ts.lang.Contact}}</p>\n                                 <p>{{project.developer.country_code}} {{project.developer.phone | numberex:2}}</p>\n                              </td>\n                              <td>\n                                 &nbsp;\n                              </td>\n                           </tr>\n                        </table>\n                     </div> -->\n\n                   </div>\n                   <div class=\"tab-pane\" id=\"two\">\n\n                     <p class=\"p14\">{{ts.lang.Configs}}</p>\n                     <div *ngFor=\"let config of project.configurations\">\n                       <div class=\"config-table\">\n                          <table style=\"width:100%;\">\n                             <tbody>\n                                <tr>\n                                   <th>Configuration type</th>\n                                   <th>Carpet Area</th>\n                                   <th>Base Price</th>\n                                </tr>\n                                <tr>\n                                   <td>\n                                      <p class=\"p14 marginB0\">{{config.config.name}}</p>\n\n                                   </td>\n                                   <td>\n                                      <table style=\"width:100%;\">\n                                         <tbody>\n                                            <tr>\n                                               <td>{{config.carpet_area}} sqmt</td>\n                                            </tr>\n\n                                         </tbody>\n                                      </table>\n                                   </td>\n                                   <td>\n                                      <table style=\"width:100%;\">\n                                         <tbody>\n                                            <tr>\n                                               <td>{{config.base_price| thousand}}</td>\n                                            </tr>\n\n                                         </tbody>\n                                      </table>\n                                   </td>\n                                </tr>\n                             </tbody>\n                          </table>\n                       </div>\n                       <div class=\"fig-block padding40 text-center\">\n                          <img class=\"img-fluid\" onerror='this.src=\"assets/img/placeholder.png\"' [defaultImage]=\"config.floor_map_image| img:'thumb'\" [lazyLoad]=\"config.floor_map_image\">\n                          <!-- <img class=\"img-fluid\" [src]=\"config.floor_map_image\" alt=\"img\"> -->\n                       </div>\n                     </div>\n\n                   </div>\n                   <div class=\"tab-pane\" id=\"three\">\n                     <p class=\"p14\">{{ts.lang.Aminities}}</p>\n                     <div class=\"icons-group\">\n                        <div *ngFor=\"let am of project.amenities\" class=\"icons-control\">\n                           <div class=\"fig-block\">\n                              <img class=\"icon\" [src]=\"am.icon\" onerror='src=\"http://via.placeholder.com/24x24\"' alt=\"img\">\n                           </div>\n                           <p class=\"p13\">{{am.name}}</p>\n                        </div>\n                    </div>\n                   </div>\n                   <div class=\"tab-pane\" id=\"four\">\n                     <p class=\"p14\">{{ts.lang.Contact_Developer}}</p>\n                     <div class=\"contact-developer white-bg\">\n                        <table class=\"table\">\n                           <tr>\n                              <td style=\"width:10%\">\n                                 <div class=\"fig-block\">\n                                    <img class=\"img-fluid\" [src]=\"project?.developer?.developer_image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\">\n                                 </div>\n                              </td>\n                              <td style=\"width:60%\">\n                                 <p class=\"p11\">{{ts.lang.Developer}}</p>\n                                 <p class=\"p16\">{{project?.developer?.name ? project?.developer?.name : 'NA'}}</p>\n                                 <p class=\"p13\">{{project?.developer?.developer_title ? project?.developer?.developer_title : 'NA'}}</p>\n                              </td>\n                              <td style=\"width:30%;\">\n                                 <p class=\"p16\">1</p>\n                                 <p class=\"p13\">Projects</p>\n                              </td>\n                           </tr>\n                           <tr>\n                              <td>\n                                 &nbsp;\n                              </td>\n                              <td>\n                                 <p class=\"p12\">{{ts.lang.Contact_Developer}}</p>\n                                 <p *ngIf=\"project?.developer?.country_code\">{{project?.developer?.country_code}} {{project.developer.phone | numberex:2}}</p>\n                              </td>\n                              <td>\n                                 &nbsp;\n                              </td>\n                           </tr>\n                        </table>\n                     </div>\n                   </div>\n                   <div class=\"tab-pane\" id=\"five\">\n\n                   </div>\n                </div>\n             </div>\n          </div>\n       </div>\n    </div>\n </div>\n  <div class=\"spacer60\"></div>\n</div>\n"

/***/ }),

/***/ "./src/app/layout/projects/project-details/project-details.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/layout/projects/project-details/project-details.component.ts ***!
  \******************************************************************************/
/*! exports provided: ProjectDetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectDetailsComponent", function() { return ProjectDetailsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_admin_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _lang_translate_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../../lang/translate.service */ "./src/app/lang/translate.service.ts");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../common/constants */ "./src/app/common/constants.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
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
                _this.carpet_area_string = config_carpet_areas[0] + ' sqmt';
            }
            else {
                var min = Math.min.apply(null, config_carpet_areas);
                var max = Math.max.apply(null, config_carpet_areas);
                _this.carpet_area_string = min + ' sqmt - ' + max + ' sqmt';
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
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('mapListing'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], ProjectDetailsComponent.prototype, "mapListing", void 0);
    ProjectDetailsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-project-details',
            template: __webpack_require__(/*! ./project-details.component.html */ "./src/app/layout/projects/project-details/project-details.component.html"),
            styles: [__webpack_require__(/*! ./project-details.component.css */ "./src/app/layout/projects/project-details/project-details.component.css")]
        }),
        __metadata("design:paramtypes", [_agm_core__WEBPACK_IMPORTED_MODULE_2__["MapsAPILoader"],
            _services_admin_service__WEBPACK_IMPORTED_MODULE_1__["AdminService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            _lang_translate_service__WEBPACK_IMPORTED_MODULE_4__["TranslateService"],
            _common_constants__WEBPACK_IMPORTED_MODULE_5__["Constant"]])
    ], ProjectDetailsComponent);
    return ProjectDetailsComponent;
}());



/***/ }),

/***/ "./src/app/layout/projects/projects.component.css":
/*!********************************************************!*\
  !*** ./src/app/layout/projects/projects.component.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/layout/projects/projects.component.html":
/*!*********************************************************!*\
  !*** ./src/app/layout/projects/projects.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<div class=\"container-fluid\">\n    <div class=\"row\">\n        <div class=\"col-md-4\">\n            <div class=\"form-group\">\n                <p class=\"p16\">Manage Projects</p>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"offset-md-4\"></div>\n        <div class=\"col-md-8 col-12\">\n            <div class=\"cust-tabs-2\">\n                <ul class=\"nav nav-tabs float-right\">\n                    <li class=\"nav-item\">\n                      <a [ngClass]=\"{'active':parameter.dash_flag == 1}\" (click)=\"changeFlag(1)\" class=\"nav-link\" data-toggle=\"tab\" href=\"#tw\">This Week</a>\n                    </li>\n                    <li class=\"nav-item\">\n                      <a [ngClass]=\"{'active':parameter.dash_flag == 2}\" (click)=\"changeFlag(2)\" class=\"nav-link\" data-toggle=\"tab\" href=\"#tm\">This Month</a>\n                    </li>\n                    <li class=\"nav-item\">\n                      <a [ngClass]=\"{'active':parameter.dash_flag == 3}\" (click)=\"changeFlag(3)\" class=\"nav-link\" data-toggle=\"tab\" href=\"#lm\">Last Month</a>\n                    </li>\n                    <li class=\"nav-item\">\n                      <a [ngClass]=\"{'active':parameter.dash_flag == 4}\" (click)=\"changeFlag(4)\" class=\"nav-link\" data-toggle=\"tab\" href=\"#lt\">Lifetime</a>\n                    </li>\n                    <li class=\"nav-item\">\n                      <a [ngClass]=\"{'active':parameter.dash_flag == 5}\" (click)=\"changeFlag(5)\" class=\"nav-link\" data-toggle=\"tab\" href=\"#cust\">Custom</a>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-12\">\n            <div *ngIf=\"parameter.dash_flag == 5\" class=\"row\">\n                <div class=\"offset-lg-7\"></div>\n                <div class=\"col-lg-2 col-md-2 col-sm-5 col-5\">\n                <div class=\"form-group marginB0\">\n                    <label>From:</label>\n                    <p-calendar showIcon=\"true\" [(ngModel)]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n                </div>\n                </div>\n                <div class=\"col-lg-2 col-md-2 col-sm-5 col-5\">\n                <div class=\"form-group marginB0\">\n                    <label>To:</label>\n                    <p-calendar showIcon=\"true\" [(ngModel)]=\"parameter.max\" [minDate]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n                </div>\n                </div>\n                <div class=\"col-lg-1 col-md-2 col-sm-2 col-6\">\n                <div class=\"form-group btn-cont\">\n                    <label class=\"addMT3\">&nbsp;</label>\n                    <button class=\"btn btn-calender\" href=\"javascript://\" (click)=\"getListing()\"\n                        [disabled]=\"!parameter.min || !parameter.max\">Apply</button>\n                </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-md-2\">\n            <div class=\"form-group\">\n            <label>Country</label>\n            <select class=\"form-control\" (change)=\"onCountryChange($event.target.value)\">\n                <option value=\"0\">All</option>\n                <option *ngFor=\"let item of location.countries\" [value]=\"item.id\">{{item.name}}</option>\n            </select>\n            </div>\n        </div>\n        <div class=\"col-md-2\">\n            <div class=\"form-group\">\n            <label>State</label>\n            <select class=\"form-control\" (change)=\"onStateChange($event.target.value)\">\n                <option value=\"0\">All</option>\n                <option *ngFor=\"let item of location.states\" [value]=\"item.id\">{{item.name}}</option>\n            </select>\n            </div>\n        </div>\n        <div class=\"col-md-2\">\n            <div class=\"form-group\">\n            <label>City</label>\n                <select class=\"form-control\" (change)=\"onCityChange($event.target.value)\">\n                <option value=\"0\">All</option>\n                <option *ngFor=\"let item of location.cities\" [value]=\"item.id\">{{item.name}}</option>\n                </select>\n            </div>\n        </div>\n\n        <div class=\"col-md-2\">\n            <div class=\"form-group\">\n            <label>Locality</label>\n            <select class=\"form-control\" (change)=\"onLocalityChange($event.target.value)\">\n                <option value=\"0\">All</option>\n                <option *ngFor=\"let item of location.localities\" [value]=\"item.id\">{{item.name}}</option>\n            </select>\n            </div>\n        </div>\n\n        <div class=\"col-md-2\">\n            <div class=\"form-group btn-cont\">\n            <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n            <button type=\"button\" (click)=\"getListing()\" class=\"btn btn-primary-new width100P\">Apply</button>\n            </div>\n        </div>\n\n        <div class=\"col-md-2\">\n            <div class=\"form-group btn-cont\">\n            <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n            <button type=\"button\" (click)=\"resetFilters()\" class=\"btn btn-primary-new width100P\">Reset</button>\n            </div>\n        </div>\n    </div>\n\n  <!-- <div class=\"row\">\n    <div class=\"col-md-4\">\n      <div class=\"form-group\">\n      <p class=\"p16\">Manage Projects</p>\n      </div>\n    </div>\n    <div class=\"col-md-2\">\n  <div class=\"form-group\">\n  <label>Country</label>\n    <select class=\"form-control\" (change)=\"onCountryChange($event.target.value)\">\n      <option value=\"0\">All</option>\n      <option *ngFor=\"let item of location.countries\" [value]=\"item.id\">{{item.name}}</option>\n    </select>\n  </div>\n  </div>\n  <div class=\"col-md-2\">\n  <div class=\"form-group\">\n  <label>State</label>\n    <select class=\"form-control\" (change)=\"onStateChange($event.target.value)\">\n      <option value=\"0\">All</option>\n      <option *ngFor=\"let item of location.states\" [value]=\"item.id\">{{item.name}}</option>\n    </select>\n  </div>\n  </div>\n  <div class=\"col-md-2\">\n    <div class=\"form-group\">\n    <label>City</label>\n      <select class=\"form-control\" (change)=\"onCityChange($event.target.value)\">\n        <option value=\"0\">All</option>\n        <option *ngFor=\"let item of location.cities\" [value]=\"item.id\">{{item.name}}</option>\n      </select>\n    </div>\n  </div>\n\n  <div class=\"col-md-2\">\n  <div class=\"form-group\">\n  <label>Locality</label>\n  <select class=\"form-control\" (change)=\"onLocalityChange($event.target.value)\">\n      <option value=\"0\">All</option>\n      <option *ngFor=\"let item of location.localities\" [value]=\"item.id\">{{item.name}}</option>\n    </select>\n  </div>\n  </div>\n  </div> -->\n\n  <!-- <div class=\"row\">\n        <div class=\"col-md-12\">\n            <div class=\"cust-tabs-2\">\n              <ul class=\"nav nav-tabs float-right\">\n                  <li class=\"nav-item\">\n                    <a [ngClass]=\"{'active':parameter.dash_flag == 1}\" (click)=\"parameter.dash_flag=1;getListing()\" class=\"nav-link\" data-toggle=\"tab\" href=\"#tw\">This Week</a>\n                  </li>\n                  <li class=\"nav-item\">\n                    <a [ngClass]=\"{'active':parameter.dash_flag == 2}\" (click)=\"parameter.dash_flag=2;getListing()\" class=\"nav-link\" data-toggle=\"tab\" href=\"#tm\">This Month</a>\n                  </li>\n                  <li class=\"nav-item\">\n                    <a [ngClass]=\"{'active':parameter.dash_flag == 3}\" (click)=\"parameter.dash_flag=3;getListing()\" class=\"nav-link\" data-toggle=\"tab\" href=\"#lm\">Last Month</a>\n                  </li>\n                  <li class=\"nav-item\">\n                    <a [ngClass]=\"{'active':parameter.dash_flag == 4}\" (click)=\"parameter.dash_flag=4;getListing()\" class=\"nav-link\" data-toggle=\"tab\" href=\"#lt\">Lifetime</a>\n                  </li>\n                  <li class=\"nav-item\">\n                    <a [ngClass]=\"{'active':parameter.dash_flag == 5}\" (click)=\"parameter.dash_flag=5\" class=\"nav-link\" data-toggle=\"tab\" href=\"#cust\">Custom</a>\n                  </li>\n              </ul>\n            </div>\n        </div>\n        <div class=\"col-12\">\n            <div *ngIf=\"parameter.dash_flag == 5\" class=\"pull-right row\">\n                <div class=\"col-lg-4 col-md-4 col-sm-5 col-5\">\n                <div class=\"form-group marginB0\">\n                    <label>From:</label>\n                    <p-calendar showIcon=\"true\" [(ngModel)]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n                </div>\n                </div>\n                <div class=\"col-lg-4 col-md-4 col-sm-5 col-5\">\n                <div class=\"form-group marginB0\">\n                    <label>To:</label>\n                    <p-calendar showIcon=\"true\" [(ngModel)]=\"parameter.max\" [minDate]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n                </div>\n                </div>\n                <div class=\"col-lg-4 col-md-4 col-sm-2 col-6\">\n                <div class=\"form-group btn-cont\">\n                    <label class=\"addMT3\">&nbsp;</label>\n                    <button class=\"btn btn-calender\" href=\"javascript://\" (click)=\"getListing()\"\n                [disabled]=\"!parameter.min || !parameter.max\">Apply</button>\n                </div>\n                </div>\n            </div>\n        </div>\n      </div> -->\n\n      <div class=\"cust-tabs\">\n      <div class=\"row flex-wrap-reverse\">\n          \n      <!-- <div class=\"col-xl-10 col-lg-12 col-md-12 col-sm-12 col-12\">\n        <ul class=\"nav nav-tabs\">\n            <li class=\"nav-item\">\n              <a [ngClass]=\"{'active':parameter.flag==3}\" (click)=\"changeFlag(3)\" class=\"nav-link\" >Approved</a>\n            </li>\n            <li class=\"nav-item\">\n              <a [ngClass]=\"{'active':parameter.flag==2}\" (click)=\"changeFlag(2)\" class=\"nav-link\" >Unapproved</a>\n            </li>\n            <li class=\"nav-item\">\n              <a [ngClass]=\"{'active':parameter.flag==4}\" (click)=\"changeFlag(4)\" class=\"nav-link\" >Pending Review</a>\n            </li>\n            <li class=\"nav-item\">\n              <a [ngClass]=\"{'active':parameter.flag==1}\" (click)=\"changeFlag(1)\" class=\"nav-link\" >In Draft</a>\n            </li>\n        </ul>\n        </div> -->\n\n        <div class=\"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12\"><div class=\"add-new pull-right\">\n              <a *ngIf=\"admin?.admin_acl['Building Management']?.can_create==1\" class=\"btn\" href=\"javascript://\" routerLink=\"/dashboard/projects/add-project\">+Add New Project</a>\n            </div></div>\n            </div>\n        <div class=\"tab-content white-bg\">\n            <div class=\"tab-pane active\">\n              <div class=\"tabel-section\">\n                  <div class=\"table-responsive\">\n                    <table class=\"table table-striped table-align-left\">\n                        <tr>\n                          <th style=\"vertical-align:top;width:6%\">\n                              <div class=\"d-flex table-search\">\n                                <label>Image</label>\n                              </div>\n                          </th>\n                          <th style=\"width:15%\">\n                              <div class=\"table-search\">\n                                  <label>Name of Building</label>\n                                  <div class=\"searh-3\">\n                                  <input type=\"text\" [(ngModel)]=\"parameter.keyword\" (keyup.enter)=\"getListing()\" >\n                                  <button *ngIf=\"parameter.keyword\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                                </div>\n                              </div>\n                            </th>\n                            <th style=\"width:20%\">\n                              <div class=\"table-search\">\n                                  <label>Address</label>\n                                  <div class=\"searh-3\">\n                                    <input type=\"text\" [(ngModel)]=\"parameter.address\" (keyup.enter)=\"getListing()\" >\n                                    <button *ngIf=\"parameter.address\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                                  </div>\n                                </div>\n                          </th>\n                          <th style=\"width:25%\">\n                              <div class=\"table-search\">\n                                  <label>Developer Email</label>\n                                  <div class=\"searh-3\">\n                                    <input type=\"text\" [(ngModel)]=\"parameter.email\" (keyup.enter)=\"getListing()\" >\n                                    <button *ngIf=\"parameter.email\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                                  </div>\n                                </div>\n                          </th>\n                          <th style=\"vertical-align:top;width:10%\">\n                              <div class=\"d-flex table-search\"><span><label>Avg Price</label></span></div>\n                          </th>\n                          \n                          <th style=\"vertical-align:top;width:100px;width:24%\">\n                            <div class=\"d-flex table-search\"><span><label>Actions</label></span>\n                            </div>\n                          </th>\n                        </tr>\n                  \n                        <tr *ngFor=\"let p of items | paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: total }; let i=index\">\n                            <td>\n                                <img class=\"rounded-circle\" onerror='this.src=\"assets/img/placeholder-img.png\"' [defaultImage]=\"p.main_image| img:'thumb'\" [lazyLoad]=\"p.main_image\">\n                              <!-- <img [src]=\"p.main_image| img:'thumb'\" class=\"rounded-circle\" onerror='this.src=\"assets/img/placeholder-img.png\"' alt=\"img\"> -->\n                            </td>\n                            <td class=\"cursor-pointer\" title=\"Click to view details\" routerLink=\"/dashboard/projects/details/{{p.id}}\">\n                              <strong>{{p?.name}}</strong>\n                            </td>\n                            <td>\n                                <strong>{{p.address?p.address:'NA'}}</strong>\n                            </td>\n                            <td><span *ngIf=\"p.developer\">{{p?.developer?.email}}</span></td>\n                            <td><span>{{p.avg_price}}</span></td>\n                            <td>\n                              <div class=\"message\">\n                                <button [disabled]=\"admin?.admin_acl['Building Management']?.can_update==0\" routerLink=\"/dashboard/projects/edit-project/{{p.id}}\" title=\"Edit Details\" class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></button>\n                                <button [disabled]=\"admin?.admin_acl['Building Management']?.can_delete==0\" *ngIf=\"!p.is_blocked\" (click)=\"block(p);\" class=\"action-icon\" title=\"Block\"><img src=\"assets/img/block.png\" alt=\"img\"></button>\n                                <button [disabled]=\"admin?.admin_acl['Building Management']?.can_delete==0\" *ngIf=\"p.is_blocked == true\" (click)=\"unblock(p);\" class=\"action-icon unblock-bg\" title=\"UnBlock\"><img src=\"assets/img/unblock.png\" alt=\"img\"></button>\n                                <!-- unapprove => when status=2(pending), 1(approved)-->\n                                <a style=\"display:none;\" #modalOpen data-toggle=\"modal\" data-target=\"#addNote\"></a>\n                                <button (click)=\"openCancellationModal(p, i)\" [disabled]=\"admin?.admin_acl['Building Management']?.can_update==0\" *ngIf=\"p.status == 1 || p.status==2\" class=\"action-icon\" title=\"Unapprove\"><img src=\"assets/img/ic_disapprove.png\" alt=\"img\"></button>\n                                <!-- approve => when status=2(pending), 4(rejected)-->\n                                <button [disabled]=\"admin?.admin_acl['Building Management']?.can_update==0\" *ngIf=\"p.status == 2 || p.status == 4\"  (click)=\"approveProject(p, 1);\" class=\"action-icon\" title=\"Approve\"><img src=\"assets/img/tick.png\" alt=\"img\"></button>\n                                <!-- delete project -->\n                                <button [disabled]=\"admin?.admin_acl['Building Management']?.can_purge==0\" (click)=\"deletePopup(p, i);\" class=\"action-icon\" title=\"Delete Project\"><img src=\"assets/img/ic_delete.png\" alt=\"img\"></button>\n                              </div>\n\n                            </td>\n                        </tr>\n                        <!-- <tr *ngIf=\"parameter.loading == false && total == 0\">\n                          <td colspan=\"10\">\n                              <img src=\"./../../../assets/img/404-error.png\">\n                          </td>\n                        </tr> -->\n                        \n                    </table>\n                    <div class=\"padding20 center\" *ngIf=\"parameter.loading == false && total == 0\">\n                        <img src=\"./../../../assets/img/404-error.png\">\n                    </div>\n                  </div>\n              </div>\n            </div>\n            <div class=\"tab-pane container fade\" id=\"seller\">Seller tab on</div>\n        </div>\n      </div>\n\n      <div class=\"btn-cont marginT15\" *ngIf=\"total\">\n          <div class=\"row\">\n              <div class=\"col-6\">\n                  <div class=\"title-group\">\n                      <p>Showing {{items?.length}} out of {{total}}</p>\n                  </div>\n              </div>\n              <div class=\"col-6 text-right\">\n                  <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n              </div>\n          </div>\n      </div>\n  </div>\n\n\n\n<div class=\"modal animated\" id=\"addNote\">\n  <div class=\"modal-dialog fadeIndown\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header modal-header-new\">\n          <h4 class=\"modal-title\">Add Reason</h4>\n          <button style=\"display: none;\" type=\"button\" class=\"close\" data-dismiss=\"modal\" #modalClose>&times;</button>\n          <button type=\"button\" class=\"close\" (click)=\"closeModal()\">&times;</button>\n      </div>\n\n      <form class=\"form-horizontal form-model0P form-model-newP\" role=\"form\" ngNativeValidate #addForm=\"ngForm\" (ngSubmit)=\"rejectProject(4); addForm.reset();\">\n        <div class=\"modal-body modal-body-new\">\n          <div class=\"row\">\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                  <div class=\"form-group\">\n                    <textarea rows=\"4\" required class=\"form-control note\" name=\"reason\" [(ngModel)]=\"reason\"></textarea>\n                </div>\n              </div>\n            </div>\n            <div class=\"col-12\">\n                <div class=\"btn-cont text-right\">\n                    <button type=\"submit\" [disabled]=\"!addForm.valid\" class=\"btn btn-primary\">Add</button>\n                </div>\n            </div>\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/layout/projects/projects.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/layout/projects/projects.component.ts ***!
  \*******************************************************/
/*! exports provided: ProjectsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectsComponent", function() { return ProjectsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_admin_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
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
            input.min = moment__WEBPACK_IMPORTED_MODULE_4__(this.parameter.min).format('YYYY-MM-DD');
        }
        else {
            delete input.min;
        }
        if (this.parameter.max) {
            input.max = moment__WEBPACK_IMPORTED_MODULE_4__(this.parameter.max).format('YYYY-MM-DD');
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
        this.parameter.country_id = id;
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
        if (flag.toString() === '5') {
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
        if (item.is_completed !== 1) {
            swal('Error', 'You cannot approve the building as some of details are missing.', 'error');
            return false;
        }
        item.status = status;
        this.admin.postDataApi('approveProject', { building_id: item.id }).subscribe(function (r) {
            swal('Success', 'Project approved successfully.', 'success');
        }, function (error) {
            swal('Error', error.error.message, 'error');
        });
    };
    ProjectsComponent.prototype.rejectProject = function (status) {
        var _this = this;
        this.items[this.parameter.index].status = status;
        this.admin.postDataApi('rejectProject', { building_id: this.parameter.building_id, reason: this.reason }).subscribe(function (r) {
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
        this.location.countries = JSON.parse(JSON.stringify(this.location.countries));
        this.onCountryChange('0');
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
    ProjectsComponent.prototype.deletePopup = function (item, index) {
        var _this = this;
        this.parameter.title = this.constant.title.ARE_YOU_SURE;
        this.parameter.text = 'You want to delete this project?';
        swal({
            html: this.parameter.title + '<br>' + this.parameter.text,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.deleteProject(item, index);
            }
        });
    };
    ProjectsComponent.prototype.deleteProject = function (item, index) {
        var _this = this;
        this.admin.postDataApi('deleteProject', { building_id: item.id }).subscribe(function (r) {
            swal('Success', 'Deleted successfully.', 'success');
            _this.items.splice(index, 1);
        }, function (error) {
            swal('Error', error.error.message, 'error');
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalOpen'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], ProjectsComponent.prototype, "modalOpen", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], ProjectsComponent.prototype, "modalClose", void 0);
    ProjectsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-projects',
            template: __webpack_require__(/*! ./projects.component.html */ "./src/app/layout/projects/projects.component.html"),
            styles: [__webpack_require__(/*! ./projects.component.css */ "./src/app/layout/projects/projects.component.css")]
        }),
        __metadata("design:paramtypes", [_common_constants__WEBPACK_IMPORTED_MODULE_3__["Constant"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _services_admin_service__WEBPACK_IMPORTED_MODULE_1__["AdminService"]])
    ], ProjectsComponent);
    return ProjectsComponent;
}());



/***/ }),

/***/ "./src/app/layout/projects/projects.module.ts":
/*!****************************************************!*\
  !*** ./src/app/layout/projects/projects.module.ts ***!
  \****************************************************/
/*! exports provided: ProjectsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectsModule", function() { return ProjectsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_loading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-loading */ "./node_modules/ngx-loading/fesm5/ngx-loading.js");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var ng2_tel_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng2-tel-input */ "./node_modules/ng2-tel-input/ng2-tel-input.js");
/* harmony import */ var ng_lazyload_image__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng-lazyload-image */ "./node_modules/ng-lazyload-image/index.js");
/* harmony import */ var _projects_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./projects.component */ "./src/app/layout/projects/projects.component.ts");
/* harmony import */ var _add_project_add_project_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./add-project/add-project.component */ "./src/app/layout/projects/add-project/add-project.component.ts");
/* harmony import */ var _guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../guards/acl-user.guard */ "./src/app/guards/acl-user.guard.ts");
/* harmony import */ var _project_details_project_details_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./project-details/project-details.component */ "./src/app/layout/projects/project-details/project-details.component.ts");
/* harmony import */ var _modules_shared_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../modules/shared.module */ "./src/app/modules/shared.module.ts");
/* harmony import */ var _pipes_numberex_pipe__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../pipes/numberex.pipe */ "./src/app/pipes/numberex.pipe.ts");
/* harmony import */ var primeng_primeng__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! primeng/primeng */ "./node_modules/primeng/primeng.js");
/* harmony import */ var primeng_primeng__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(primeng_primeng__WEBPACK_IMPORTED_MODULE_15__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// third party libraries









// general components







// import { ImgPipe } from '../../pipes/img.pipe';
var routes = [
    { path: 'details/:project_id', component: _project_details_project_details_component__WEBPACK_IMPORTED_MODULE_12__["ProjectDetailsComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_11__["AclUserGuard"]], data: { roles: ['Building Management', 'can_read', ''] } },
    { path: 'view-projects', component: _projects_component__WEBPACK_IMPORTED_MODULE_9__["ProjectsComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_11__["AclUserGuard"]], data: { roles: ['Building Management', 'can_read', ''] } },
    { path: 'view-projects/:id', component: _projects_component__WEBPACK_IMPORTED_MODULE_9__["ProjectsComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_11__["AclUserGuard"]], data: { roles: ['Building Management', 'can_read', ''] } },
    { path: 'add-project', component: _add_project_add_project_component__WEBPACK_IMPORTED_MODULE_10__["AddProjectComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_11__["AclUserGuard"]], data: { roles: ['Building Management', 'can_create', ''] } },
    { path: 'edit-project/:id', component: _add_project_add_project_component__WEBPACK_IMPORTED_MODULE_10__["AddProjectComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_11__["AclUserGuard"]], data: { roles: ['Building Management', 'can_update', 'can_data_collector'] } },
    { path: 'edit-building-request/:request_id', component: _add_project_add_project_component__WEBPACK_IMPORTED_MODULE_10__["AddProjectComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_11__["AclUserGuard"]], data: { roles: ['Building Management', 'can_update', 'can_data_collector'] } }
];
var ProjectsModule = /** @class */ (function () {
    function ProjectsModule() {
    }
    ProjectsModule = __decorate([
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
                    apiKey: 'AIzaSyDykCJGMqHIwJluSmSiqKTJBVN2KauM_uQ',
                    libraries: ['drawing', 'places']
                }),
                ng2_tel_input__WEBPACK_IMPORTED_MODULE_7__["Ng2TelInputModule"],
                ngx_pagination__WEBPACK_IMPORTED_MODULE_6__["NgxPaginationModule"],
                primeng_primeng__WEBPACK_IMPORTED_MODULE_15__["CalendarModule"],
                _modules_shared_module__WEBPACK_IMPORTED_MODULE_13__["SharedModule"],
                ng_lazyload_image__WEBPACK_IMPORTED_MODULE_8__["LazyLoadImageModule"]
            ],
            declarations: [
                _projects_component__WEBPACK_IMPORTED_MODULE_9__["ProjectsComponent"],
                _add_project_add_project_component__WEBPACK_IMPORTED_MODULE_10__["AddProjectComponent"],
                _project_details_project_details_component__WEBPACK_IMPORTED_MODULE_12__["ProjectDetailsComponent"],
                _pipes_numberex_pipe__WEBPACK_IMPORTED_MODULE_14__["NumberexPipe"],
            ]
        })
    ], ProjectsModule);
    return ProjectsModule;
}());



/***/ }),

/***/ "./src/app/pipes/numberex.pipe.ts":
/*!****************************************!*\
  !*** ./src/app/pipes/numberex.pipe.ts ***!
  \****************************************/
/*! exports provided: NumberexPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NumberexPipe", function() { return NumberexPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
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
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'numberex'
        })
    ], NumberexPipe);
    return NumberexPipe;
}());



/***/ })

}]);
//# sourceMappingURL=projects-projects-module.js.map