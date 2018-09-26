webpackJsonp([11],{

/***/ "../../../../../src/$$_gendir/app/layout/layout.module.ngfactory.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_layout_layout_module__ = __webpack_require__("../../../../../src/app/layout/layout.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_layout_layout_component__ = __webpack_require__("../../../../../src/app/layout/layout.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__layout_component_ngfactory__ = __webpack_require__("../../../../../src/$$_gendir/app/layout/layout.component.ngfactory.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dashboard_dashboard_component_ngfactory__ = __webpack_require__("../../../../../src/$$_gendir/app/layout/dashboard/dashboard.component.ngfactory.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__inhouse_users_inhouse_users_component_ngfactory__ = __webpack_require__("../../../../../src/$$_gendir/app/layout/inhouse-users/inhouse-users.component.ngfactory.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__settings_change_password_change_password_component_ngfactory__ = __webpack_require__("../../../../../src/$$_gendir/app/layout/settings/change-password/change-password.component.ngfactory.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__edit_template_edit_template_component_ngfactory__ = __webpack_require__("../../../../../src/$$_gendir/app/layout/edit-template/edit-template.component.ngfactory.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__generate_thumb_generate_thumb_component_ngfactory__ = __webpack_require__("../../../../../src/$$_gendir/app/layout/generate-thumb/generate-thumb.component.ngfactory.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__gendir_node_modules_ngx_bootstrap_modal_modal_backdrop_component_ngfactory__ = __webpack_require__("../../../../../src/$$_gendir/node_modules/ngx-bootstrap/modal/modal-backdrop.component.ngfactory.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__gendir_node_modules_ngx_bootstrap_modal_modal_container_component_ngfactory__ = __webpack_require__("../../../../../src/$$_gendir/node_modules/ngx-bootstrap/modal/modal-container.component.ngfactory.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__gendir_node_modules_ngx_mydatepicker_dist_ngx_my_date_picker_component_ngfactory__ = __webpack_require__("../../../../../src/$$_gendir/node_modules/ngx-mydatepicker/dist/ngx-my-date-picker.component.ngfactory.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_ngx_pagination__ = __webpack_require__("../../../../ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_ngx_bootstrap_positioning_positioning_service__ = __webpack_require__("../../../../ngx-bootstrap/positioning/positioning.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_ngx_bootstrap_component_loader_component_loader_factory__ = __webpack_require__("../../../../ngx-bootstrap/component-loader/component-loader.factory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_ngx_bootstrap_modal_bs_modal_service__ = __webpack_require__("../../../../ngx-bootstrap/modal/bs-modal.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_ngx_mydatepicker_dist_services_ngx_my_date_picker_config__ = __webpack_require__("../../../../ngx-mydatepicker/dist/services/ngx-my-date-picker.config.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_ngx_malihu_scrollbar_dist_lib_malihu_scrollbar_service__ = __webpack_require__("../../../../ngx-malihu-scrollbar/dist/lib/malihu-scrollbar.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__agm_core_utils_browser_globals__ = __webpack_require__("../../../../@agm/core/utils/browser-globals.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__agm_core_services_maps_api_loader_maps_api_loader__ = __webpack_require__("../../../../@agm/core/services/maps-api-loader/maps-api-loader.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__agm_core_services_maps_api_loader_lazy_maps_api_loader__ = __webpack_require__("../../../../@agm/core/services/maps-api-loader/lazy-maps-api-loader.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__app_services_http_interceptor__ = __webpack_require__("../../../../../src/app/services/http-interceptor.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__app_services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__app_models_login_model__ = __webpack_require__("../../../../../src/app/models/login.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__app_services_common_service__ = __webpack_require__("../../../../../src/app/services/common.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__app_services_auth_guard__ = __webpack_require__("../../../../../src/app/services/auth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__app_guards_acl_user_guard__ = __webpack_require__("../../../../../src/app/guards/acl-user.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__app_guards_inhouse_user_guard__ = __webpack_require__("../../../../../src/app/guards/inhouse-user.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__app_common_constants__ = __webpack_require__("../../../../../src/app/common/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__app_layout_layout_routing_module__ = __webpack_require__("../../../../../src/app/layout/layout-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__ngx_translate_core_index__ = __webpack_require__("../../../../@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35_ngx_bootstrap_modal_modal_module__ = __webpack_require__("../../../../ngx-bootstrap/modal/modal.module.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36_ngx_mydatepicker_dist_ngx_my_date_picker_module__ = __webpack_require__("../../../../ngx-mydatepicker/dist/ngx-my-date-picker.module.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37_ngx_malihu_scrollbar_dist_lib_malihu_scrollbar_module__ = __webpack_require__("../../../../ngx-malihu-scrollbar/dist/lib/malihu-scrollbar.module.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__agm_core_core_module__ = __webpack_require__("../../../../@agm/core/core.module.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39_ng2_tel_input_src_ng2_tel_input_module__ = __webpack_require__("../../../../ng2-tel-input/src/ng2-tel-input.module.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39_ng2_tel_input_src_ng2_tel_input_module___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_39_ng2_tel_input_src_ng2_tel_input_module__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40_angular_froala_wysiwyg_editor_editor_module__ = __webpack_require__("../../../../angular-froala-wysiwyg/editor/editor.module.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41_angular_froala_wysiwyg_view_view_module__ = __webpack_require__("../../../../angular-froala-wysiwyg/view/view.module.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__app_layout_dashboard_dashboard_component__ = __webpack_require__("../../../../../src/app/layout/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__app_layout_inhouse_users_inhouse_users_component__ = __webpack_require__("../../../../../src/app/layout/inhouse-users/inhouse-users.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__app_layout_settings_change_password_change_password_component__ = __webpack_require__("../../../../../src/app/layout/settings/change-password/change-password.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__app_layout_edit_template_edit_template_component__ = __webpack_require__("../../../../../src/app/layout/edit-template/edit-template.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__app_layout_generate_thumb_generate_thumb_component__ = __webpack_require__("../../../../../src/app/layout/generate-thumb/generate-thumb.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutModuleNgFactory", function() { return LayoutModuleNgFactory; });
/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
/* tslint:disable */















































var LayoutModuleNgFactory = __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵcmf"](__WEBPACK_IMPORTED_MODULE_1__app_layout_layout_module__["a" /* LayoutModule */], [__WEBPACK_IMPORTED_MODULE_2__app_layout_layout_component__["a" /* LayoutComponent */]], function (_l) {
    return __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmod"]([__WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵCodegenComponentFactoryResolver"], [[8, [__WEBPACK_IMPORTED_MODULE_3__layout_component_ngfactory__["a" /* LayoutComponentNgFactory */], __WEBPACK_IMPORTED_MODULE_4__dashboard_dashboard_component_ngfactory__["a" /* DashboardComponentNgFactory */], __WEBPACK_IMPORTED_MODULE_5__inhouse_users_inhouse_users_component_ngfactory__["a" /* InhouseUsersComponentNgFactory */],
                    __WEBPACK_IMPORTED_MODULE_6__settings_change_password_change_password_component_ngfactory__["a" /* ChangePasswordComponentNgFactory */], __WEBPACK_IMPORTED_MODULE_7__edit_template_edit_template_component_ngfactory__["a" /* EditTemplateComponentNgFactory */],
                    __WEBPACK_IMPORTED_MODULE_8__generate_thumb_generate_thumb_component_ngfactory__["a" /* GenerateThumbComponentNgFactory */], __WEBPACK_IMPORTED_MODULE_9__gendir_node_modules_ngx_bootstrap_modal_modal_backdrop_component_ngfactory__["a" /* ModalBackdropComponentNgFactory */],
                    __WEBPACK_IMPORTED_MODULE_10__gendir_node_modules_ngx_bootstrap_modal_modal_container_component_ngfactory__["a" /* ModalContainerComponentNgFactory */], __WEBPACK_IMPORTED_MODULE_11__gendir_node_modules_ngx_mydatepicker_dist_ngx_my_date_picker_component_ngfactory__["a" /* NgxMyDatePickerNgFactory */]]],
            [3, __WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"]], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModuleRef"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_12__angular_common__["a" /* NgLocalization */], __WEBPACK_IMPORTED_MODULE_12__angular_common__["b" /* NgLocaleLocalization */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["LOCALE_ID"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_13__angular_forms__["ɵi"], __WEBPACK_IMPORTED_MODULE_13__angular_forms__["ɵi"], []),
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_13__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_13__angular_forms__["FormBuilder"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_14_ngx_pagination__["a" /* PaginationService */], __WEBPACK_IMPORTED_MODULE_14_ngx_pagination__["a" /* PaginationService */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_15_ngx_bootstrap_positioning_positioning_service__["a" /* PositioningService */], __WEBPACK_IMPORTED_MODULE_15_ngx_bootstrap_positioning_positioning_service__["a" /* PositioningService */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_16_ngx_bootstrap_component_loader_component_loader_factory__["a" /* ComponentLoaderFactory */], __WEBPACK_IMPORTED_MODULE_16_ngx_bootstrap_component_loader_component_loader_factory__["a" /* ComponentLoaderFactory */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"], __WEBPACK_IMPORTED_MODULE_15_ngx_bootstrap_positioning_positioning_service__["a" /* PositioningService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationRef"]]),
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_17_ngx_bootstrap_modal_bs_modal_service__["a" /* BsModalService */], __WEBPACK_IMPORTED_MODULE_17_ngx_bootstrap_modal_bs_modal_service__["a" /* BsModalService */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["RendererFactory2"],
            __WEBPACK_IMPORTED_MODULE_16_ngx_bootstrap_component_loader_component_loader_factory__["a" /* ComponentLoaderFactory */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_18_ngx_mydatepicker_dist_services_ngx_my_date_picker_config__["a" /* NgxMyDatePickerConfig */], __WEBPACK_IMPORTED_MODULE_18_ngx_mydatepicker_dist_services_ngx_my_date_picker_config__["a" /* NgxMyDatePickerConfig */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_19_ngx_malihu_scrollbar_dist_lib_malihu_scrollbar_service__["a" /* MalihuScrollbarService */], __WEBPACK_IMPORTED_MODULE_19_ngx_malihu_scrollbar_dist_lib_malihu_scrollbar_service__["a" /* MalihuScrollbarService */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_20__agm_core_utils_browser_globals__["a" /* WindowRef */], __WEBPACK_IMPORTED_MODULE_20__agm_core_utils_browser_globals__["a" /* WindowRef */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_20__agm_core_utils_browser_globals__["b" /* DocumentRef */], __WEBPACK_IMPORTED_MODULE_20__agm_core_utils_browser_globals__["b" /* DocumentRef */], []),
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_21__agm_core_services_maps_api_loader_maps_api_loader__["a" /* MapsAPILoader */], __WEBPACK_IMPORTED_MODULE_22__agm_core_services_maps_api_loader_lazy_maps_api_loader__["a" /* LazyMapsAPILoader */], [__WEBPACK_IMPORTED_MODULE_22__agm_core_services_maps_api_loader_lazy_maps_api_loader__["b" /* LAZY_MAPS_API_CONFIG */],
            __WEBPACK_IMPORTED_MODULE_20__agm_core_utils_browser_globals__["a" /* WindowRef */], __WEBPACK_IMPORTED_MODULE_20__agm_core_utils_browser_globals__["b" /* DocumentRef */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_23__app_services_http_interceptor__["a" /* HttpInterceptor */], __WEBPACK_IMPORTED_MODULE_23__app_services_http_interceptor__["a" /* HttpInterceptor */], [__WEBPACK_IMPORTED_MODULE_24__angular_http__["f" /* XHRBackend */], __WEBPACK_IMPORTED_MODULE_24__angular_http__["g" /* RequestOptions */], __WEBPACK_IMPORTED_MODULE_24__angular_http__["i" /* Http */], __WEBPACK_IMPORTED_MODULE_25__angular_router__["a" /* Router */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_26__app_services_admin_service__["a" /* AdminService */], __WEBPACK_IMPORTED_MODULE_26__app_services_admin_service__["a" /* AdminService */], [__WEBPACK_IMPORTED_MODULE_23__app_services_http_interceptor__["a" /* HttpInterceptor */], __WEBPACK_IMPORTED_MODULE_27__app_models_login_model__["a" /* Login */], __WEBPACK_IMPORTED_MODULE_27__app_models_login_model__["b" /* AdminACL */]]),
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_28__app_services_common_service__["a" /* CommonService */], __WEBPACK_IMPORTED_MODULE_28__app_services_common_service__["a" /* CommonService */], [__WEBPACK_IMPORTED_MODULE_26__app_services_admin_service__["a" /* AdminService */], __WEBPACK_IMPORTED_MODULE_25__angular_router__["a" /* Router */]]),
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_29__app_services_auth_guard__["a" /* AuthGuard */], __WEBPACK_IMPORTED_MODULE_29__app_services_auth_guard__["a" /* AuthGuard */], [__WEBPACK_IMPORTED_MODULE_25__angular_router__["a" /* Router */], __WEBPACK_IMPORTED_MODULE_26__app_services_admin_service__["a" /* AdminService */], __WEBPACK_IMPORTED_MODULE_27__app_models_login_model__["a" /* Login */],
            __WEBPACK_IMPORTED_MODULE_27__app_models_login_model__["b" /* AdminACL */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_30__app_guards_acl_user_guard__["a" /* AclUserGuard */], __WEBPACK_IMPORTED_MODULE_30__app_guards_acl_user_guard__["a" /* AclUserGuard */], [__WEBPACK_IMPORTED_MODULE_26__app_services_admin_service__["a" /* AdminService */],
            __WEBPACK_IMPORTED_MODULE_12__angular_common__["d" /* Location */], __WEBPACK_IMPORTED_MODULE_25__angular_router__["a" /* Router */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_31__app_guards_inhouse_user_guard__["a" /* InhouseUserGuard */], __WEBPACK_IMPORTED_MODULE_31__app_guards_inhouse_user_guard__["a" /* InhouseUserGuard */], [__WEBPACK_IMPORTED_MODULE_26__app_services_admin_service__["a" /* AdminService */], __WEBPACK_IMPORTED_MODULE_12__angular_common__["d" /* Location */], __WEBPACK_IMPORTED_MODULE_25__angular_router__["a" /* Router */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_32__app_common_constants__["a" /* Constant */], __WEBPACK_IMPORTED_MODULE_32__app_common_constants__["a" /* Constant */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_12__angular_common__["h" /* CommonModule */], __WEBPACK_IMPORTED_MODULE_12__angular_common__["h" /* CommonModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_25__angular_router__["x" /* RouterModule */], __WEBPACK_IMPORTED_MODULE_25__angular_router__["x" /* RouterModule */], [[2, __WEBPACK_IMPORTED_MODULE_25__angular_router__["k" /* ɵa */]],
            [2, __WEBPACK_IMPORTED_MODULE_25__angular_router__["a" /* Router */]]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_33__app_layout_layout_routing_module__["a" /* LayoutRoutingModule */], __WEBPACK_IMPORTED_MODULE_33__app_layout_layout_routing_module__["a" /* LayoutRoutingModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_34__ngx_translate_core_index__["a" /* TranslateModule */], __WEBPACK_IMPORTED_MODULE_34__ngx_translate_core_index__["a" /* TranslateModule */], []),
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_13__angular_forms__["ɵba"], __WEBPACK_IMPORTED_MODULE_13__angular_forms__["ɵba"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_13__angular_forms__["FormsModule"], __WEBPACK_IMPORTED_MODULE_13__angular_forms__["FormsModule"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_13__angular_forms__["ReactiveFormsModule"], __WEBPACK_IMPORTED_MODULE_13__angular_forms__["ReactiveFormsModule"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_35_ngx_bootstrap_modal_modal_module__["a" /* ModalModule */], __WEBPACK_IMPORTED_MODULE_35_ngx_bootstrap_modal_modal_module__["a" /* ModalModule */], []),
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_14_ngx_pagination__["b" /* NgxPaginationModule */], __WEBPACK_IMPORTED_MODULE_14_ngx_pagination__["b" /* NgxPaginationModule */], []),
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_36_ngx_mydatepicker_dist_ngx_my_date_picker_module__["a" /* NgxMyDatePickerModule */], __WEBPACK_IMPORTED_MODULE_36_ngx_mydatepicker_dist_ngx_my_date_picker_module__["a" /* NgxMyDatePickerModule */], []),
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_37_ngx_malihu_scrollbar_dist_lib_malihu_scrollbar_module__["a" /* MalihuScrollbarModule */], __WEBPACK_IMPORTED_MODULE_37_ngx_malihu_scrollbar_dist_lib_malihu_scrollbar_module__["a" /* MalihuScrollbarModule */], []),
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_38__agm_core_core_module__["a" /* AgmCoreModule */], __WEBPACK_IMPORTED_MODULE_38__agm_core_core_module__["a" /* AgmCoreModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_39_ng2_tel_input_src_ng2_tel_input_module__["Ng2TelInputModule"], __WEBPACK_IMPORTED_MODULE_39_ng2_tel_input_src_ng2_tel_input_module__["Ng2TelInputModule"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_40_angular_froala_wysiwyg_editor_editor_module__["a" /* FroalaEditorModule */], __WEBPACK_IMPORTED_MODULE_40_angular_froala_wysiwyg_editor_editor_module__["a" /* FroalaEditorModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_41_angular_froala_wysiwyg_view_view_module__["a" /* FroalaViewModule */], __WEBPACK_IMPORTED_MODULE_41_angular_froala_wysiwyg_view_view_module__["a" /* FroalaViewModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_1__app_layout_layout_module__["a" /* LayoutModule */], __WEBPACK_IMPORTED_MODULE_1__app_layout_layout_module__["a" /* LayoutModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](1024, __WEBPACK_IMPORTED_MODULE_25__angular_router__["t" /* ROUTES */], function () {
            return [[{ path: 'dashboard', component: __WEBPACK_IMPORTED_MODULE_2__app_layout_layout_component__["a" /* LayoutComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_29__app_services_auth_guard__["a" /* AuthGuard */]],
                        children: [{ path: '', component: __WEBPACK_IMPORTED_MODULE_42__app_layout_dashboard_dashboard_component__["a" /* DashboardComponent */] }, { path: 'view-inhouse-users/:userType',
                                component: __WEBPACK_IMPORTED_MODULE_43__app_layout_inhouse_users_inhouse_users_component__["a" /* InhouseUsersComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_30__app_guards_acl_user_guard__["a" /* AclUserGuard */]],
                                data: { roles: ['', '', ''] } }, { path: 'change-password', component: __WEBPACK_IMPORTED_MODULE_44__app_layout_settings_change_password_change_password_component__["a" /* ChangePasswordComponent */] },
                            { path: 'notary', loadChildren: './notary/notary.module#NotaryModule' },
                            { path: 'banks', loadChildren: './banks/banks.module#BanksModule' },
                            { path: 'users', loadChildren: './users/users.module#UsersModule' },
                            { path: 'leads', loadChildren: './leads/leads.module#LeadsModule' },
                            { path: 'manual-leads', loadChildren: './manual-leads/manual-leads.module#ManualLeadsModule' },
                            { path: 'edit-template', component: __WEBPACK_IMPORTED_MODULE_45__app_layout_edit_template_edit_template_component__["a" /* EditTemplateComponent */],
                                canActivate: [__WEBPACK_IMPORTED_MODULE_30__app_guards_acl_user_guard__["a" /* AclUserGuard */]], data: { roles: ['Templates',
                                        'can_read', ''] } }, { path: 'generate-thumb', component: __WEBPACK_IMPORTED_MODULE_46__app_layout_generate_thumb_generate_thumb_component__["a" /* GenerateThumbComponent */] },
                            { path: 'reports', loadChildren: './reports/reports.module#ReportsModule' },
                            { path: 'access-control-mgt', loadChildren: './acl/acl.module#AclModule' },
                            { path: 'settings', loadChildren: './settings/settings.module#SettingsModule' },
                            { path: 'properties', loadChildren: './properties/properties.module#PropertiesModule' },
                            { path: 'projects', loadChildren: './projects/projects.module#ProjectsModule' }] }]];
        }, []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](256, __WEBPACK_IMPORTED_MODULE_22__agm_core_services_maps_api_loader_lazy_maps_api_loader__["b" /* LAZY_MAPS_API_CONFIG */], { apiKey: 'AIzaSyCYv_zELZGVo2Ehzgp8eh8UeSIidhMCmH8',
            libraries: ['drawing'] }, [])]);
});
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiL2hvbWUvY2JsMTAwMi9Eb2N1bWVudHMvcmVhbGVzdGF0ZS1hZG1pbi9zcmMvYXBwL2xheW91dC9sYXlvdXQubW9kdWxlLm5nZmFjdG9yeS50cyIsInZlcnNpb24iOjMsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5nOi8vL2hvbWUvY2JsMTAwMi9Eb2N1bWVudHMvcmVhbGVzdGF0ZS1hZG1pbi9zcmMvYXBwL2xheW91dC9sYXlvdXQubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIiAiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
//# sourceMappingURL=layout.module.ngfactory.js.map

/***/ })

});
//# sourceMappingURL=11.chunk.js.map