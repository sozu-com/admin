webpackJsonp([8],{

/***/ "../../../../../src/app/layout/templates/add-template/add-template.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/templates/add-template/add-template.component.html":
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<div  class=\"row\">\n    <div  class=\"col-md-6\">\n        <div  class=\"title-group\">\n            <h5>Templates</h5>\n        </div>\n    </div>\n    <div  class=\"col-md-6\">\n        <div class=\"btn-cont pull-right\">\n            <button *ngIf=\"!post.id\" (click)=\"submitAll()\" class=\"btn btn-primary\">Save</button>\n            <button *ngIf=\"post.id\" (click)=\"submitAll()\" class=\"btn btn-primary\">Update</button>\n        </div>\n    </div>\n</div>\n<hr/>\n<div class=\"white-bg padding20\">\n    <div class=\"row\" *ngIf=\"post.id\">\n        <div class=\"col-lg-12 col-md-12 col-sm-12 col-12\">\n            <div class=\"form-group-3\">\n            <p class=\"p16-two\">Slug</p>\n            </div>\n        </div>\n        <div class=\"col-lg-10 col-md-12 col-sm-12 col-12\">\n            <div class=\"form-group-3\">\n                <input [(ngModel)]=\"post.slug\" placeholder=\"Enter slug\" class=\"form-control\" type=\"text\" />\n            </div>\n        </div>\n        <div class=\"col-lg-2 col-md-12 col-sm-12 col-12\">\n            <a title=\"Preview\" target=\"_blank\" href=\"{{post.blog_url}}\" class=\"action-icon\"><img src=\"assets/img/viewfull.png\" alt=\"img\"></a>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\">\n            <div class=\"upload-cover-img white-bg\" style=\"height: 200px;\">\n                <img [src]=\"file1.image\" onerror=\"this.src='assets/img/placeholder.png'\" class=\"floor-plan\">\n                <div *ngIf=\"!file1.image\" class=\"upload-caption\">\n                    <p class=\"green-color marginT30\">+Upload Cover image for the post</p>\n                    <p>JPG or PNG. Image size should be 1920 × 1080 pixels (for HiDPI displays).</p>\n                </div>\n                <input type=\"file\" name=\"\" accept=\"image/*\" (change)=\"file1.onSelectFile($event,true)\">\n            </div>\n        </div>\n        <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\">\n            <div class=\"form-group-3\">\n                <p class=\"p16-two\">Publish Date<span class=\"color-red\">*</span></p>\n                <input class=\"form-control\" type=\"date\" [ngModel] =\"post.publish_date | date:'yyyy-MM-dd'\" (ngModelChange)=\"post.publish_date = $event\"/>\n            </div>\n            <div class=\"form-group-3\">\n                <p class=\"p16-two\">Post type<span class=\"color-red\">*</span></p>\n                <label class=\"cust-radio\">\n                    <input type=\"radio\" (change)=\"post.post_type=1\" value=\"1\" [checked]=\"post.post_type == '1' ? 'checked' : ''\" name=\"post_type\">\n                    <span class=\"checkmark\">Post</span>\n                </label>\n                <label class=\"cust-radio\">\n                    <input type=\"radio\" (change)=\"post.post_type=2\" value=\"2\" [checked]=\"post.post_type == '2' ? 'checked' : ''\" name=\"post_type\">\n                    <span class=\"checkmark\">Page</span>\n                </label>\n                <label class=\"cust-radio\">\n                    <input type=\"radio\" (change)=\"post.post_type=3\" value=\"3\" [checked]=\"post.post_type == '3' ? 'checked' : ''\" name=\"post_type\">\n                    <span class=\"checkmark\">News</span>\n                </label>\n            </div>\n            <div class=\"clearfix\"></div>\n            <div class=\"form-group-3\">\n                <p class=\"p16-two\">Post Status<span class=\"color-red\">*</span></p>\n                <label class=\"cust-radio\">\n                    <input type=\"radio\" (change)=\"post.status=1\" value=\"1\" [checked]=\"post.status == '1' ? 'checked' : ''\" name=\"post_status\">\n                    <span class=\"checkmark\">Draft</span>\n                </label>\n                <label class=\"cust-radio\">\n                    <input type=\"radio\" (change)=\"post.status=2\" value=\"2\" [checked]=\"post.status == '2' ? 'checked' : ''\" name=\"post_status\">\n                    <span class=\"checkmark\">Publish</span>\n                </label>\n    \n            </div>\n        </div>\n    </div>\n</div>\n<hr/>\n    \n<div class=\"cust-tabs\">\n    <div class=\"row flex-wrap-reverse\">\n        <div class=\"col-xl-10 col-lg-12 col-md-12 col-sm-12 col-12\">\n        <ul class=\"nav nav-tabs\">\n            <li class=\"nav-item\">\n                <a class=\"nav-link active show\" data-toggle=\"tab\" href=\"#english\">English</a>\n            </li>\n            <li class=\"nav-item\">\n                <a class=\"nav-link\" data-toggle=\"tab\" href=\"#spanish\">Spanish</a>\n            </li>\n        </ul>\n        </div>\n    </div>\n    <div class=\"tab-content\">\n        <div id=\"english\"  class=\"tab-pane white-bg padding20 active\">\n            <div class=\"row marginT20\">\n                <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\">\n                    <div class=\"form-group-3\">\n                        <label class=\"p16-two\">Enter title<span class=\"color-red\">*</span></label>\n                        <input [(ngModel)]=\"post.title_en\" placeholder=\"Enter title\" class=\"form-control\" type=\"text\" />\n                    </div>\n                </div>\n            </div>\n            <div [froalaEditor]=\"options\" [(froalaModel)]=\"post.description_en\"></div>\n            <div class=\"spacer30\"></div>\n            <div class=\"row\">\n                <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\">\n                    <div class=\"form-group-3\">\n                        <label class=\"p16-two\">Enter meta title<span class=\"color-red\">*</span></label>\n                        <input [(ngModel)]=\"post.meta_title_en\" placeholder=\"Enter meta title\" class=\"form-control\" type=\"text\" />\n                    </div>\n                </div>\n                <div class=\"col-lg-12 col-md-12 col-sm-12 col-12\">\n                    <div class=\"form-group-3\">\n                        <label class=\"p16-two\">Enter meta description<span class=\"color-red\">*</span></label>\n                        <textarea  [(ngModel)]=\"post.meta_description_en\" placeholder=\"Enter meta description\" class=\"form-control\"></textarea>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div id=\"spanish\"  class=\"tab-pane white-bg padding20\">\n            <div class=\"row marginT20\">\n                <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\">\n                    <div class=\"form-group-3\">\n                        <label class=\"p16-two\">Enter title<span class=\"color-red\">*</span></label>\n                        <input  [(ngModel)]=\"post.title_es\" placeholder=\"Enter title\" class=\"form-control\" type=\"text\" />\n                    </div>\n                </div>\n            </div>\n            <div [froalaEditor]=\"options\" [(froalaModel)]=\"post.description_es\"></div>\n            <div class=\"spacer30\"></div>\n            <div class=\"row\">\n                <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\">\n                    <div class=\"form-group-3\">\n                        <label class=\"p16-two\">Enter meta title<span class=\"color-red\">*</span></label>\n                        <input  [(ngModel)]=\"post.meta_title_es\" placeholder=\"Enter meta title\" class=\"form-control\" type=\"text\" />\n                    </div>\n                </div>\n                <div class=\"col-lg-12 col-md-12 col-sm-12 col-12\">\n                    <div class=\"form-group-3\">\n                        <label class=\"p16-two\">Enter meta description<span class=\"color-red\">*</span></label>\n                        <textarea  [(ngModel)]=\"post.meta_description_es\" placeholder=\"Enter meta description\" class=\"form-control\"></textarea>\n                    </div>\n                </div>\n            </div>\n        </div>\n \n</div>\n"

/***/ }),

/***/ "../../../../../src/app/layout/templates/add-template/add-template.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_http_interceptor__ = __webpack_require__("../../../../../src/app/services/http-interceptor.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_fileUpload__ = __webpack_require__("../../../../../src/app/common/fileUpload.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddTemplateComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AddTemplateComponent = /** @class */ (function () {
    function AddTemplateComponent(admin, route, http) {
        this.admin = admin;
        this.route = route;
        this.http = http;
        this.parameter = {};
        this.imageLink = {
            link: ''
        };
        this.post = {
            id: '',
            url: '',
            post_type: 'post',
            status: 'publish',
            title_en: '',
            title_es: '',
            description_en: '',
            description_es: '',
            meta_title_en: '',
            meta_title_es: '',
            meta_description_en: '',
            meta_description_es: '',
            image: '',
            publish_date: '',
        };
        this.editorContent = 'My Document\'s Title';
        // public imgObj: Object = {
        //   src: 'https://s3-us-west-2.amazonaws.com/testbagant/nequore/1533540803eRoUG6oE6q4noxtU10BqijCN6GJdBn.png'
        // };
        this.options = {
            charCounterCount: true,
            // Set the image upload parameter.
            imageUploadParam: 'image',
            // Set the image upload URL.
            imageUploadURL: this.admin.baseUrl + 'saveImageLink',
            // Additional upload params.
            // imageUploadParams: {id: 'my_editor'},
            // Set request type.
            imageUploadMethod: 'POST',
            // Set max image size to 5MB.
            // imageMaxSize: 5 * 1024 * 1024,
            // Allow to upload PNG and JPG.
            imageAllowedTypes: ['jpeg', 'jpg', 'png'],
            events: {
                'froalaEditor.initialized': function () {
                    console.log('initialized');
                },
                'froalaEditor.image.beforeUpload': function (e, editor, images) {
                    // Your code
                    // if  (images.length) {
                    //   console.log('image length');
                    //   // Create a File Reader.
                    //   const  reader  =  new  FileReader();
                    //   // Set the reader to insert images when they are loaded.
                    //   reader.onload  =  (ev)  =>  {
                    //     const  result  =  ev.target['result'];
                    //     const response = editor.image.insert(result,  null,  null,  editor.image.get());
                    //     // console.log(ev,  editor.image);
                    //     // console.log('result', result);
                    //     // console.log('response', response);
                    //   };
                    //   // Read image as base64.
                    //   reader.readAsDataURL(images[0]);
                    // }
                    // Stop default upload chain.
                    // return  false;
                },
                'froalaEditor.image.inserted': function (e, editor, file, response) {
                    // console.log('inserted');
                    // console.log('e', e);
                    // console.log('editor', editor);
                    // console.log('file', file);
                    // console.log('response', response);
                },
                'froalaEditor.image.uploaded': function (e, editor, response) {
                    // console.log('uploaded', JSON.parse(response));
                    // response = JSON.parse(response);
                    // this.imageLink = {link: response.data.image};
                    // console.log('new response', this.imageLink);
                },
                'froalaEditor.image.error': function (e, editor, error, response) {
                    // console.log('error');
                    // console.log('e', e);
                    // console.log('editor', editor);
                    // console.log('error', error);
                    // console.log('response', response);
                    swal('Error', error.message, 'error');
                    // if (error.code === 1) {
                    //   console.log('No link in upload response.');
                    //   swal('Error', 'No link in upload response.', 'error');
                    // }
                    // // No link in upload response.
                    // else if (error.code == 2) { console.log('no link'); }
                    // // Error during image upload.
                    // else if (error.code == 3) { ... }
                    // // Parsing response failed.
                    // else if (error.code == 4) { ... }
                    // // Image too text-large.
                    // else if (error.code == 5) { ... }
                    // // Invalid image type.
                    // else if (error.code == 6) { ... }
                    // // Image can be uploaded only to same domain in IE 8 and IE 9.
                    // else if (error.code == 7) { ... }
                }
            }
        };
    }
    AddTemplateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.http.loader.next({ value: false });
        this.file1 = new __WEBPACK_IMPORTED_MODULE_3__common_fileUpload__["a" /* FileUpload */](true, this.admin);
        this.route.params.subscribe(function (params) {
            _this.post.id = params.id;
            if (_this.post.id > 0) {
                _this.parameter.loading = true;
                _this.admin.postDataApi('getBlogById', { id: _this.post.id }).subscribe(function (r) {
                    _this.parameter.loading = false;
                    console.log(r);
                    _this.post = r['data'];
                    _this.file1.image = _this.post.image;
                }, function (error) {
                    _this.parameter.loading = false;
                    swal('Error', error, 'error');
                });
            }
            else {
                delete _this.post.id;
            }
        });
    };
    AddTemplateComponent.prototype.submitAll = function () {
        var _this = this;
        console.log(this.post);
        if (!this.post.post_type) {
            swal('Error', 'Please enter post type', 'error');
            return false;
        }
        if (!this.post.title_en) {
            swal('Error', 'Please enter title in english', 'error');
            return false;
        }
        if (!this.post.description_en && !this.post.description_es) {
            swal('Error', 'Please enter description', 'error');
            return false;
        }
        if (!this.post.meta_title_en && !this.post.meta_title_es) {
            swal('Error', 'Please enter post type', 'error');
            return false;
        }
        if (!this.post.meta_description_en && !this.post.meta_description_es) {
            swal('Error', 'Please enter post type', 'error');
            return false;
        }
        this.post.image = this.file1.image;
        if (this.post.id) {
            if (!this.post.slug) {
                swal('Error', 'Please enter slug', 'error');
                return false;
            }
            this.post.blog_id = this.post.id;
        }
        this.parameter.loading = true;
        this.admin.postDataApi('addBlog', this.post).subscribe(function (r) {
            _this.parameter.loading = false;
            console.log(r);
        }, function (error) {
            console.log('errorrrr', error);
            _this.parameter.loading = false;
            // swal('Error', error.message, 'error');
        });
    };
    var _a, _b, _c;
    AddTemplateComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-add-template',
            template: __webpack_require__("../../../../../src/app/layout/templates/add-template/add-template.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/templates/add-template/add-template.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" ? _a : Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_router__["ActivatedRoute"]) === "function" ? _b : Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_http_interceptor__["a" /* HttpInterceptor */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_http_interceptor__["a" /* HttpInterceptor */]) === "function" ? _c : Object])
    ], AddTemplateComponent);
    return AddTemplateComponent;
}());

//# sourceMappingURL=add-template.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/templates/templates.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/templates/templates.component.html":
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"parameter.loading\"></ngx-loading>\n<div class=\"row\">\n    <div class=\"col-md-6\">\n      <div class=\"title-group\">\n          <h5>Templates</h5>\n      </div>\n    </div>\n    <div class=\"col-md-6\">\n      <div class=\"btn-cont text-right\">\n          <a *ngIf=\"admin?.admin_acl['Templates']?.can_create==1\" routerLink=\"/dashboard/templates/add-template/0\" class=\"btn btn-primary\" href=\"javascript://\">Add New</a>\n      </div>\n    </div>\n</div>\n\n<div class=\"cust-tabs\">\n    <div class=\"row flex-wrap-reverse\">\n       \n      <div class=\"col-xl-10 col-lg-12 col-md-12 col-sm-12 col-12\">\n        <ul class=\"nav nav-tabs\">\n          <li class=\"nav-item cursor-pointer\">\n              <a [ngClass]=\"{'active':parameter.post_type=='1'}\" (click)=\"changeFlag('1')\" class=\"nav-link\" >Post</a>\n          </li>\n          <li class=\"nav-item cursor-pointer\">\n              <a [ngClass]=\"{'active':parameter.post_type=='2'}\" (click)=\"changeFlag('2')\" class=\"nav-link\" >Page</a>\n          </li>\n          <!-- <li class=\"nav-item\">\n              <a [ngClass]=\"{'active':parameter.post_type=='3'}\" (click)=\"changeFlag('3')\" class=\"nav-link\" >News</a>\n          </li> -->\n        </ul>\n      </div>\n      </div>\n      <div class=\"tab-content\">\n         <div class=\"tab-pane active\">\n            <div class=\"tabel-section\">\n               <div class=\"table-responsive\">\n                  <table class=\"table table-striped table-align-left\">\n                     <tr>\n                        <th style=\"vertical-align:top; width: 6%;\"></th>\n                        <th style=\"width:20%; text-align:left;\">\n                           <div class=\"table-search\">\n                              <label>Title</label>\n                              <div class=\"searh-3\">\n                                <input type=\"text\" [(ngModel)]=\"parameter.name\" (keyup.enter)=\"getListing()\" >\n                                <button *ngIf=\"parameter.name\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                              </div>\n                           </div>\n                        </th>\n                        <th style=\"width:30%; text-align:left;\">\n                            <div class=\"table-search\">\n                               <label>Description</label>\n                               <div class=\"searh-3\">\n                                 <input type=\"text\" [(ngModel)]=\"parameter.keyword\" (keyup.enter)=\"getListing()\" >\n                                 <button *ngIf=\"parameter.keyword\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                               </div>\n                            </div>\n                         </th>\n                        <th style=\"width:15%;vertical-align:top;\">\n                            <div class=\"table-search\">\n                                <label>Status</label>\n                            </div>\n                        </th>\n                        <th style=\"width:15%;vertical-align:top;\">\n                           <div (click)=\"sort_by(1)\" class=\"d-flex table-search\">\n                             <label>Publish Date</label>\n                           <a href=\"javascript://\"><img [ngClass]=\"{'upsidedown':this.parameter.sort_by_order==0}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n                           </div>\n                        </th>\n                        <th style=\"width:4%;\">&nbsp;</th>\n                     </tr>\n                     <tr *ngFor=\"let item of items | paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: total }\">\n                        <td>\n                            <img class=\"rounded-circle\" [src]=\"item.image\" onerror=\"this.src='assets/img/default_img.png'\" alt=\"img\">\n                        </td>\n                        <td>\n                           <strong>{{item.title}}</strong>\n                         </td>\n                         <td><span>{{item.meta_description | slice:0:200}}</span></td>\n                         <td><span>{{status[item.status]}}</span></td>\n                         <td><span>{{item.publish_date|date:'shortDate'}}</span></td>\n                         <td>\n                           <div class=\"message\">\n                              <button [disabled]=\"admin?.admin_acl['Templates']?.can_update==0\" routerLink=\"/dashboard/templates/edit-template/{{item.id}}\" title=\"Edit Details\" class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></button>\n                           </div>\n                         </td>\n                     </tr>\n                  </table>\n                  <div class=\"padding20 center\" *ngIf=\"parameter.loading == false && total == 0\">\n                      <img src=\"./../../../assets/img/404-error.png\">\n                  </div>\n               </div>\n            </div>\n\n         </div>\n      </div>\n\n    <div class=\"btn-cont text-right marginT15\" *ngIf=\"parameter.total\">\n        <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/layout/templates/templates.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_http_interceptor__ = __webpack_require__("../../../../../src/app/services/http-interceptor.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TemplatesComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TemplatesComponent = /** @class */ (function () {
    function TemplatesComponent(admin, constant, http) {
        this.admin = admin;
        this.constant = constant;
        this.http = http;
        this.parameter = {};
        this.items = [];
        this.total = 0;
        this.status = {
            1: 'draft',
            2: 'publish'
        };
    }
    TemplatesComponent.prototype.ngOnInit = function () {
        this.http.loader.next({ value: false });
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        this.parameter.post_type = '1';
        this.getListing();
    };
    TemplatesComponent.prototype.getListing = function () {
        var _this = this;
        this.parameter.loading = true;
        this.admin.postDataApi('getBlogs', this.parameter).subscribe(function (success) {
            console.log('LIST', success);
            _this.items = success.data;
            _this.total = success.total_count;
            _this.parameter.loading = false;
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    TemplatesComponent.prototype.getPage = function (page) {
        this.parameter.page = page;
        this.getListing();
    };
    TemplatesComponent.prototype.changeFlag = function (post_type) {
        this.parameter.post_type = post_type;
        this.getListing();
    };
    TemplatesComponent.prototype.sort_by = function (sort_by_flag) {
        if (this.parameter.sort_by_flag !== sort_by_flag) {
            this.parameter.sort_by_flag = sort_by_flag;
            this.parameter.sort_by_order = 0;
        }
        else {
            this.parameter.sort_by_order = this.parameter.sort_by_order ? 0 : 1;
        }
        this.getListing();
    };
    var _a, _b, _c;
    TemplatesComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-templates',
            template: __webpack_require__("../../../../../src/app/layout/templates/templates.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/templates/templates.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" ? _a : Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__common_constants__["a" /* Constant */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__common_constants__["a" /* Constant */]) === "function" ? _b : Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_http_interceptor__["a" /* HttpInterceptor */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_http_interceptor__["a" /* HttpInterceptor */]) === "function" ? _c : Object])
    ], TemplatesComponent);
    return TemplatesComponent;
}());

//# sourceMappingURL=templates.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/templates/templates.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_loading__ = __webpack_require__("../../../../ngx-loading/ngx-loading/ngx-loading.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ngx_bootstrap_modal__ = __webpack_require__("../../../../ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__guards_acl_user_guard__ = __webpack_require__("../../../../../src/app/guards/acl-user.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__add_template_add_template_component__ = __webpack_require__("../../../../../src/app/layout/templates/add-template/add-template.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__templates_component__ = __webpack_require__("../../../../../src/app/layout/templates/templates.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ngx_pagination__ = __webpack_require__("../../../../ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angular_froala_wysiwyg__ = __webpack_require__("../../../../angular-froala-wysiwyg/index.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TemplatesModule", function() { return TemplatesModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var routes = [
    { path: 'view-all', component: __WEBPACK_IMPORTED_MODULE_9__templates_component__["a" /* TemplatesComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_7__guards_acl_user_guard__["a" /* AclUserGuard */]], data: { roles: ['Templates', 'can_read', ''] } },
    { path: 'add-template/:id', component: __WEBPACK_IMPORTED_MODULE_8__add_template_add_template_component__["a" /* AddTemplateComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_7__guards_acl_user_guard__["a" /* AclUserGuard */]], data: { roles: ['Templates', 'can_create', ''] } },
    { path: 'edit-template/:id', component: __WEBPACK_IMPORTED_MODULE_8__add_template_add_template_component__["a" /* AddTemplateComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_7__guards_acl_user_guard__["a" /* AclUserGuard */]], data: { roles: ['Templates', 'can_update', ''] } }
];
var TemplatesModule = /** @class */ (function () {
    function TemplatesModule() {
    }
    TemplatesModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_9__templates_component__["a" /* TemplatesComponent */],
                __WEBPACK_IMPORTED_MODULE_8__add_template_add_template_component__["a" /* AddTemplateComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_6__angular_router__["RouterModule"].forChild(routes),
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["a" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["ReactiveFormsModule"],
                __WEBPACK_IMPORTED_MODULE_5_ngx_bootstrap_modal__["a" /* ModalModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_4_ngx_loading__["a" /* LoadingModule */].forRoot({
                    animationType: __WEBPACK_IMPORTED_MODULE_4_ngx_loading__["b" /* ANIMATION_TYPES */].rectangleBounce,
                    primaryColour: '#00B96F'
                }),
                __WEBPACK_IMPORTED_MODULE_10_ngx_pagination__["a" /* NgxPaginationModule */],
                __WEBPACK_IMPORTED_MODULE_11_angular_froala_wysiwyg__["a" /* FroalaEditorModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_11_angular_froala_wysiwyg__["b" /* FroalaViewModule */].forRoot()
            ],
            exports: [__WEBPACK_IMPORTED_MODULE_6__angular_router__["RouterModule"]]
        })
    ], TemplatesModule);
    return TemplatesModule;
}());

//# sourceMappingURL=templates.module.js.map

/***/ })

});
//# sourceMappingURL=8.chunk.js.map