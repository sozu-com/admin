webpackJsonp([0],{

/***/ "../../../../../src/app/common/fileUpload.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileUpload; });
var FileUpload = /** @class */ (function () {
    function FileUpload(single, us) {
        this.single = true;
        this.loading = false;
        this.us = us;
        this.single = single;
        if (this.single != true) {
            this.files = [];
        }
    }
    // upload = true means upload file just after reading
    FileUpload.prototype.onSelectFile = function (event, upload) {
        var _this = this;
        if (upload === void 0) { upload = false; }
        if (event.target.files && event.target.files[0]) {
            var total = event.target.files.length;
            var _loop_1 = function (index) {
                this_1.loading = true;
                var reader = new FileReader();
                reader.onload = function (e) {
                    // console.log('single',this.single,' index',index);
                    if (_this.single == true) {
                        _this.image = e.target.result;
                        _this.file = event.target.files[index];
                    }
                    else {
                        var model = {};
                        model.image = e.target.result;
                        model.file = event.target.files[index];
                        _this.files.push(model);
                        console.log(_this.files);
                    }
                    _this.loading = false;
                    // if(upload == true && index== (total-1)){
                    //   console.log('uploading');
                    //   this.upload();
                    // }
                    if (index == (event.target.files.length - 1) && upload == true) {
                        _this.upload().then(function (r) {
                            _this.loading = false;
                        });
                    }
                };
                reader.readAsDataURL(event.target.files[index]);
            };
            var this_1 = this;
            for (var index = 0; index < event.target.files.length; index++) {
                _loop_1(index);
            }
        }
    };
    FileUpload.prototype.getFile = function () {
        return this.file;
    };
    FileUpload.prototype.getFiles = function () {
        return this.files;
    };
    FileUpload.prototype.upload = function () {
        var _this = this;
        // console.log(this.single);
        return new Promise(function (resolve, reject) {
            if (_this.single == false) {
                var total_1 = _this.files.length;
                var i_1 = 1;
                _this.files.map(function (item) {
                    if (item.file) {
                        var formData = new FormData();
                        formData.append('image', item.file);
                        // console.log(item);
                        _this.us.postDataApi('saveImage', formData).subscribe(function (res) {
                            // console.log(res);
                            delete item.file;
                            item.image = res['data'].image;
                            if (i_1 == total_1) {
                                resolve();
                            } /* resolve on last loop */
                            i_1++;
                        }, function (error) {
                            if (i_1 === total_1) {
                                reject(error);
                            } /* reject on last loop */
                            i_1++;
                        });
                    }
                    else {
                        if (i_1 >= total_1) {
                            console.log(_this.files);
                            resolve();
                        }
                        i_1++;
                    }
                });
            }
            if (_this.single === true && _this.file) {
                var formData = new FormData();
                formData.append('image', _this.file);
                _this.us.postDataApi('saveImage', formData).subscribe(function (res) {
                    _this.file = '';
                    _this.image = res['data'].image;
                    resolve();
                }, function (error) {
                    reject(error);
                });
            }
            else {
                resolve();
            }
        });
    };
    FileUpload.prototype.remove = function (index) {
        this.files.splice(index, 1);
    };
    FileUpload.prototype.backup = function (files) {
        this.backupArray = files;
        this.files = files;
    };
    FileUpload.prototype.reset = function () {
        this.files = JSON.parse(JSON.stringify(this.backup));
    };
    return FileUpload;
}());

//# sourceMappingURL=fileUpload.js.map

/***/ }),

/***/ "../../../../../src/app/models/acl.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ACL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Permission; });
var ACL = /** @class */ (function () {
    function ACL() {
        this.admin_acl = [];
    }
    return ACL;
}());

var Permission = /** @class */ (function () {
    function Permission() {
    }
    return Permission;
}());

//# sourceMappingURL=acl.model.js.map

/***/ }),

/***/ "../../../../../src/app/models/users.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Users; });
var Users = /** @class */ (function () {
    function Users() {
    }
    return Users;
}());

//# sourceMappingURL=users.model.js.map

/***/ })

});
//# sourceMappingURL=0.chunk.js.map