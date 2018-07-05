var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", '@angular/core', 'lodash'], function (require, exports, core_1, lodash_1) {
    "use strict";
    var win = typeof window !== 'undefined' && window || {};
    var SweetAlertService = (function () {
        function SweetAlertService() {
        }
        SweetAlertService.prototype.swal = function () {
            return win.Sweetalert2.apply(win, Array.from(arguments));
        };
        SweetAlertService.prototype.prompt = function (options) {
            var baseOptions = {
                showCancelButton: true,
                confirmButtonText: 'Submit',
                input: 'text'
            };
            return win.Sweetalert2(lodash_1.assign(baseOptions, options));
        };
        SweetAlertService.prototype.confirm = function (options) {
            var baseOptions = {
                showCancelButton: true,
                confirmButtonText: 'Confirm',
                type: 'warning'
            };
            return win.Sweetalert2(lodash_1.assign(baseOptions, options));
        };
        SweetAlertService.prototype.alert = function (options) {
            var baseOptions = {
                confirmButtonText: 'OK',
                type: 'info'
            };
            return win.Sweetalert2(lodash_1.assign(baseOptions, options));
        };
        SweetAlertService.prototype.question = function (options) {
            return this.alert(lodash_1.assign({ type: 'question' }, options));
        };
        SweetAlertService.prototype.success = function (options) {
            return this.alert(lodash_1.assign({ type: 'success' }, options));
        };
        SweetAlertService.prototype.error = function (options) {
            return this.alert(lodash_1.assign({ type: 'error' }, options));
        };
        SweetAlertService.prototype.warning = function (options) {
            return this.alert(lodash_1.assign({ type: 'warning' }, options));
        };
        SweetAlertService.prototype.info = function (options) {
            return this.alert(lodash_1.assign({ type: 'info' }, options));
        };
        SweetAlertService = __decorate([
            core_1.Injectable(), 
            __metadata('design:paramtypes', [])
        ], SweetAlertService);
        return SweetAlertService;
    }());
    exports.SweetAlertService = SweetAlertService;
});
//# sourceMappingURL=index.js.map