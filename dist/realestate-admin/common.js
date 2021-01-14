(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./src/app/common/excelDownload.ts":
/*!*****************************************!*\
  !*** ./src/app/common/excelDownload.ts ***!
  \*****************************************/
/*! exports provided: ExcelDownload */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExcelDownload", function() { return ExcelDownload; });
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var xlsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! xlsx */ "./node_modules/xlsx/xlsx.js");
/* harmony import */ var xlsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(xlsx__WEBPACK_IMPORTED_MODULE_1__);
// excel download


var EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
var EXCEL_EXTENSION = '.xlsx';
var ExcelDownload = /** @class */ (function () {
    function ExcelDownload() {
    }
    ExcelDownload.prototype.exportAsExcelFile = function (json, excelFileName) {
        var worksheet = xlsx__WEBPACK_IMPORTED_MODULE_1__["utils"].json_to_sheet(json);
        var workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        var excelBuffer = xlsx__WEBPACK_IMPORTED_MODULE_1__["write"](workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, excelFileName);
    };
    ExcelDownload.prototype.saveAsExcelFile = function (buffer, fileName) {
        var data = new Blob([buffer], { type: EXCEL_TYPE });
        var today = new Date();
        var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear() + '_' + today.getHours() + '_' + today.getMinutes() + '_' + today.getSeconds();
        fileName = fileName + '_export_' + date;
        file_saver__WEBPACK_IMPORTED_MODULE_0__["saveAs"](data, fileName + EXCEL_EXTENSION);
    };
    return ExcelDownload;
}());



/***/ }),

/***/ "./src/app/common/videoUpload.ts":
/*!***************************************!*\
  !*** ./src/app/common/videoUpload.ts ***!
  \***************************************/
/*! exports provided: VideoUpload */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoUpload", function() { return VideoUpload; });
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
var VideoUpload = /** @class */ (function () {
    function VideoUpload(single, us) {
        this.single = true;
        this.loading = false;
        this.us = us;
        this.single = single;
        if (this.single != true) {
            this.files = [];
        }
    }
    // upload = true means upload file just after reading
    VideoUpload.prototype.onSelectFile = function (event, upload) {
        var _this = this;
        if (upload === void 0) { upload = false; }
        if (event.target.files && event.target.files[0]) {
            var total = event.target.files.length;
            var _loop_1 = function (index) {
                this_1.loading = true;
                var reader = new FileReader();
                reader.onload = function (e) {
                    var src = e.target['result'];
                    // videoTest.src = src;
                    var timer = setInterval(function () {
                        // find duration of video only of video is in ready state
                        // if (videoTest.readyState === 4) {
                        //   setTimeout(() => {
                        //     // create canvas at middle of video
                        //     this.newcanvas(videoTest, event.target.files[0]);
                        //   }, 3000);
                        //   clearInterval(timer);
                        // }
                    }, 100);
                    if (_this.single == true) {
                        _this.image = e.target.result;
                        _this.file = event.target.files[index];
                    }
                    else {
                        var model = {};
                        model.image = e.target.result;
                        model.video = event.target.files[index];
                        model.thumb = event.target.files[index];
                        model.loading = false;
                        _this.files.push(model);
                    }
                    _this.loading = false;
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
    VideoUpload.prototype.newcanvas = function (video, videoFile) {
        var canvas = document.getElementById('canvas');
        var ss = canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, canvas.width, canvas.height);
        var ImageURL = canvas.toDataURL('image/jpeg');
        // model.image = ImageURL;
        var fileToUpload = this.dataURLtoFile(ImageURL, 'tempFile.png');
        this.us.saveVideo(videoFile, fileToUpload).subscribe(function (success) {
            // const videoObj = {
            //   video: '', thumb: ''
            // };
            // videoObj.video = success['data'].video;
            // videoObj.thumb = success['data'].thumb;
            // this.model.videos = [videoObj];
        }, function (error) {
            // console.log(error);
        });
    };
    VideoUpload.prototype.dataURLtoFile = function (dataurl, filename) {
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
    VideoUpload.prototype.getFile = function () {
        return this.file;
    };
    VideoUpload.prototype.getFiles = function () {
        return this.files;
    };
    VideoUpload.prototype.upload = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.single == false) {
                var total_1 = _this.files.length;
                var i_1 = 1;
                _this.files.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                    var formData;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!item.fileToUpload) return [3 /*break*/, 2];
                                formData = new FormData();
                                formData.append('video', item);
                                // formData.append('thumb', item.fileToUpload);
                                item.loading = true;
                                return [4 /*yield*/, this.us.postDataApi('saveVideo', formData).subscribe(function (res) {
                                        delete item.fileToUpload;
                                        item.video = res['data'].video;
                                        item.thumb = res['data'].thumb;
                                        item.loading = false;
                                        if (i_1 == total_1) {
                                            resolve();
                                        } /* resolve on last loop */
                                        i_1++;
                                    }, function (error) {
                                        if (i_1 === total_1) {
                                            reject(error);
                                        } /* reject on last loop */
                                        i_1++;
                                    })];
                            case 1:
                                _a.sent();
                                return [3 /*break*/, 3];
                            case 2:
                                if (i_1 >= total_1) {
                                    resolve();
                                }
                                i_1++;
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
            }
            if (_this.single === true && _this.file) {
                // const formData = new FormData();
                // formData.append('video', this.file);
                // formData.append('thumb', this.file);
                // this.image.loading = true;
                // this.us.postDataApi('saveImage', formData).subscribe(res => {
                //   this.file = '';
                //   this.image = res['data'].image;
                //   this.image.loading = false;
                //   resolve();
                // },
                //   error => {
                //     reject(error);
                //   });
            }
            else {
                resolve();
            }
        });
    };
    VideoUpload.prototype.remove = function (index) {
        this.files.splice(index, 1);
    };
    VideoUpload.prototype.backup = function (files) {
        this.backupArray = files;
        this.files = files;
    };
    VideoUpload.prototype.reset = function () {
        this.files = JSON.parse(JSON.stringify(this.backup));
    };
    return VideoUpload;
}());



/***/ }),

/***/ "./src/app/models/acl.model.ts":
/*!*************************************!*\
  !*** ./src/app/models/acl.model.ts ***!
  \*************************************/
/*! exports provided: ACL, Permission, NewAddress */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACL", function() { return ACL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Permission", function() { return Permission; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewAddress", function() { return NewAddress; });
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

var NewAddress = /** @class */ (function () {
    function NewAddress() {
    }
    return NewAddress;
}());



/***/ }),

/***/ "./src/app/models/company.model.ts":
/*!*****************************************!*\
  !*** ./src/app/models/company.model.ts ***!
  \*****************************************/
/*! exports provided: Company, Manager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Company", function() { return Company; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Manager", function() { return Manager; });
var Company = /** @class */ (function () {
    function Company() {
    }
    return Company;
}());

var Manager = /** @class */ (function () {
    function Manager() {
    }
    return Manager;
}());



/***/ }),

/***/ "./src/app/models/document.model.ts":
/*!******************************************!*\
  !*** ./src/app/models/document.model.ts ***!
  \******************************************/
/*! exports provided: Document */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Document", function() { return Document; });
var Document = /** @class */ (function () {
    function Document() {
    }
    return Document;
}());



/***/ }),

/***/ "./src/app/models/legalEntity.model.ts":
/*!*********************************************!*\
  !*** ./src/app/models/legalEntity.model.ts ***!
  \*********************************************/
/*! exports provided: LegalEntity, Banks, LegalRepresentative */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LegalEntity", function() { return LegalEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Banks", function() { return Banks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LegalRepresentative", function() { return LegalRepresentative; });
var LegalEntity = /** @class */ (function () {
    function LegalEntity() {
    }
    return LegalEntity;
}());

var Banks = /** @class */ (function () {
    function Banks() {
    }
    return Banks;
}());

var LegalRepresentative = /** @class */ (function () {
    function LegalRepresentative() {
    }
    return LegalRepresentative;
}());



/***/ })

}]);
//# sourceMappingURL=common.js.map