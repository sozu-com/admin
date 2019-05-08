(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

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

/***/ "./src/app/models/addProject.model.ts":
/*!********************************************!*\
  !*** ./src/app/models/addProject.model.ts ***!
  \********************************************/
/*! exports provided: CarpetAreas, AddProjectModel, Configuration, Towers, AmenitiesShowObj */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CarpetAreas", function() { return CarpetAreas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddProjectModel", function() { return AddProjectModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Configuration", function() { return Configuration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Towers", function() { return Towers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AmenitiesShowObj", function() { return AmenitiesShowObj; });
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
        this.images360 = [];
        this.videos = [];
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
            image: '',
            developer_image: '',
            developer_company: '',
            developer_desc: ''
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
        this.name = '';
    }
    return Configuration;
}());

var Towers = /** @class */ (function () {
    function Towers() {
    }
    return Towers;
}());

var AmenitiesShowObj = /** @class */ (function () {
    function AmenitiesShowObj() {
    }
    return AmenitiesShowObj;
}());



/***/ }),

/***/ "./src/app/models/users.model.ts":
/*!***************************************!*\
  !*** ./src/app/models/users.model.ts ***!
  \***************************************/
/*! exports provided: Users */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Users", function() { return Users; });
var Users = /** @class */ (function () {
    function Users() {
    }
    return Users;
}());



/***/ })

}]);
//# sourceMappingURL=common.js.map