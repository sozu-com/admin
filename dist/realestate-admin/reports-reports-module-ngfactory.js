(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["reports-reports-module-ngfactory"],{

/***/ "./node_modules/@swimlane/ngx-charts/release/bar-chart/bar-vertical-2d.component.ngfactory.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/@swimlane/ngx-charts/release/bar-chart/bar-vertical-2d.component.ngfactory.js ***!
  \****************************************************************************************************/
/*! exports provided: RenderType_BarVertical2DComponent, View_BarVertical2DComponent_0, View_BarVertical2DComponent_Host_0, BarVertical2DComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_BarVertical2DComponent", function() { return RenderType_BarVertical2DComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_BarVertical2DComponent_0", function() { return View_BarVertical2DComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_BarVertical2DComponent_Host_0", function() { return View_BarVertical2DComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BarVertical2DComponentNgFactory", function() { return BarVertical2DComponentNgFactory; });
/* harmony import */ var _common_base_chart_component_css_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/base-chart.component.css.ngstyle */ "./node_modules/@swimlane/ngx-charts/release/common/base-chart.component.css.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _common_axes_x_axis_component_ngfactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/axes/x-axis.component.ngfactory */ "./node_modules/@swimlane/ngx-charts/release/common/axes/x-axis.component.ngfactory.js");
/* harmony import */ var _common_axes_x_axis_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/axes/x-axis.component */ "./node_modules/@swimlane/ngx-charts/release/common/axes/x-axis.component.js");
/* harmony import */ var _common_axes_y_axis_component_ngfactory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/axes/y-axis.component.ngfactory */ "./node_modules/@swimlane/ngx-charts/release/common/axes/y-axis.component.ngfactory.js");
/* harmony import */ var _common_axes_y_axis_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/axes/y-axis.component */ "./node_modules/@swimlane/ngx-charts/release/common/axes/y-axis.component.js");
/* harmony import */ var _series_vertical_component_ngfactory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./series-vertical.component.ngfactory */ "./node_modules/@swimlane/ngx-charts/release/bar-chart/series-vertical.component.ngfactory.js");
/* harmony import */ var _series_vertical_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./series-vertical.component */ "./node_modules/@swimlane/ngx-charts/release/bar-chart/series-vertical.component.js");
/* harmony import */ var _common_charts_chart_component_ngfactory__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../common/charts/chart.component.ngfactory */ "./node_modules/@swimlane/ngx-charts/release/common/charts/chart.component.ngfactory.js");
/* harmony import */ var _common_tooltip_tooltip_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../common/tooltip/tooltip.service */ "./node_modules/@swimlane/ngx-charts/release/common/tooltip/tooltip.service.js");
/* harmony import */ var _common_tooltip_injection_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../common/tooltip/injection.service */ "./node_modules/@swimlane/ngx-charts/release/common/tooltip/injection.service.js");
/* harmony import */ var _common_charts_chart_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../common/charts/chart.component */ "./node_modules/@swimlane/ngx-charts/release/common/charts/chart.component.js");
/* harmony import */ var _common_grid_panel_series_component_ngfactory__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../common/grid-panel-series.component.ngfactory */ "./node_modules/@swimlane/ngx-charts/release/common/grid-panel-series.component.ngfactory.js");
/* harmony import */ var _common_grid_panel_series_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../common/grid-panel-series.component */ "./node_modules/@swimlane/ngx-charts/release/common/grid-panel-series.component.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _bar_vertical_2d_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./bar-vertical-2d.component */ "./node_modules/@swimlane/ngx-charts/release/bar-chart/bar-vertical-2d.component.js");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
















var styles_BarVertical2DComponent = [_common_base_chart_component_css_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_BarVertical2DComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 2, styles: styles_BarVertical2DComponent, data: { "animation": [{ type: 7, name: "animationState", definitions: [{ type: 1, expr: ":leave", animation: [{ type: 6, styles: { opacity: 1, transform: "*" }, offset: null }, { type: 4, styles: { type: 6, styles: { opacity: 0, transform: "scale(0)" }, offset: null }, timings: 500 }], options: null }], options: {} }] } });

function View_BarVertical2DComponent_1(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, ":svg:g", [["ngx-charts-x-axis", ""]], null, [[null, "dimensionsChanged"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("dimensionsChanged" === en)) {
        var pd_0 = (_co.updateXAxisHeight($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, _common_axes_x_axis_component_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_XAxisComponent_0"], _common_axes_x_axis_component_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_XAxisComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 573440, null, 0, _common_axes_x_axis_component__WEBPACK_IMPORTED_MODULE_3__["XAxisComponent"], [], { xScale: [0, "xScale"], dims: [1, "dims"], trimTicks: [2, "trimTicks"], maxTickLength: [3, "maxTickLength"], tickFormatting: [4, "tickFormatting"], showLabel: [5, "showLabel"], labelText: [6, "labelText"], ticks: [7, "ticks"], xAxisOffset: [8, "xAxisOffset"] }, { dimensionsChanged: "dimensionsChanged" })], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.groupScale; var currVal_1 = _co.dims; var currVal_2 = _co.trimXAxisTicks; var currVal_3 = _co.maxXAxisTickLength; var currVal_4 = _co.xAxisTickFormatting; var currVal_5 = _co.showXAxisLabel; var currVal_6 = _co.xAxisLabel; var currVal_7 = _co.xAxisTicks; var currVal_8 = _co.dataLabelMaxHeight.negative; _ck(_v, 1, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8); }, null); }
function View_BarVertical2DComponent_2(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, ":svg:g", [["ngx-charts-y-axis", ""]], null, [[null, "dimensionsChanged"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("dimensionsChanged" === en)) {
        var pd_0 = (_co.updateYAxisWidth($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, _common_axes_y_axis_component_ngfactory__WEBPACK_IMPORTED_MODULE_4__["View_YAxisComponent_0"], _common_axes_y_axis_component_ngfactory__WEBPACK_IMPORTED_MODULE_4__["RenderType_YAxisComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 573440, null, 0, _common_axes_y_axis_component__WEBPACK_IMPORTED_MODULE_5__["YAxisComponent"], [], { yScale: [0, "yScale"], dims: [1, "dims"], trimTicks: [2, "trimTicks"], maxTickLength: [3, "maxTickLength"], tickFormatting: [4, "tickFormatting"], ticks: [5, "ticks"], showGridLines: [6, "showGridLines"], showLabel: [7, "showLabel"], labelText: [8, "labelText"] }, { dimensionsChanged: "dimensionsChanged" })], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.valueScale; var currVal_1 = _co.dims; var currVal_2 = _co.trimYAxisTicks; var currVal_3 = _co.maxYAxisTickLength; var currVal_4 = _co.yAxisTickFormatting; var currVal_5 = _co.yAxisTicks; var currVal_6 = _co.showGridLines; var currVal_7 = _co.showYAxisLabel; var currVal_8 = _co.yAxisLabel; _ck(_v, 1, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8); }, null); }
function View_BarVertical2DComponent_3(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, ":svg:g", [["ngx-charts-series-vertical", ""]], [[24, "@animationState", 0], [1, "transform", 0]], [[null, "select"], [null, "activate"], [null, "deactivate"], [null, "dataLabelHeightChanged"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("select" === en)) {
        var pd_0 = (_co.onClick($event, _v.context.$implicit) !== false);
        ad = (pd_0 && ad);
    } if (("activate" === en)) {
        var pd_1 = (_co.onActivate($event, _v.context.$implicit) !== false);
        ad = (pd_1 && ad);
    } if (("deactivate" === en)) {
        var pd_2 = (_co.onDeactivate($event, _v.context.$implicit) !== false);
        ad = (pd_2 && ad);
    } if (("dataLabelHeightChanged" === en)) {
        var pd_3 = (_co.onDataLabelMaxHeightChanged($event, _v.context.index) !== false);
        ad = (pd_3 && ad);
    } return ad; }, _series_vertical_component_ngfactory__WEBPACK_IMPORTED_MODULE_6__["View_SeriesVerticalComponent_0"], _series_vertical_component_ngfactory__WEBPACK_IMPORTED_MODULE_6__["RenderType_SeriesVerticalComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 573440, null, 0, _series_vertical_component__WEBPACK_IMPORTED_MODULE_7__["SeriesVerticalComponent"], [], { dims: [0, "dims"], series: [1, "series"], xScale: [2, "xScale"], yScale: [3, "yScale"], colors: [4, "colors"], gradient: [5, "gradient"], activeEntries: [6, "activeEntries"], seriesName: [7, "seriesName"], tooltipDisabled: [8, "tooltipDisabled"], tooltipTemplate: [9, "tooltipTemplate"], roundEdges: [10, "roundEdges"], animations: [11, "animations"], showDataLabel: [12, "showDataLabel"], dataLabelFormatting: [13, "dataLabelFormatting"] }, { select: "select", activate: "activate", deactivate: "deactivate", dataLabelHeightChanged: "dataLabelHeightChanged" })], function (_ck, _v) { var _co = _v.component; var currVal_2 = _co.dims; var currVal_3 = _v.context.$implicit.series; var currVal_4 = _co.innerScale; var currVal_5 = _co.valueScale; var currVal_6 = _co.colors; var currVal_7 = _co.gradient; var currVal_8 = _co.activeEntries; var currVal_9 = _v.context.$implicit.name; var currVal_10 = _co.tooltipDisabled; var currVal_11 = _co.tooltipTemplate; var currVal_12 = _co.roundEdges; var currVal_13 = _co.animations; var currVal_14 = _co.showDataLabel; var currVal_15 = _co.dataLabelFormatting; _ck(_v, 1, 1, [currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9, currVal_10, currVal_11, currVal_12, currVal_13, currVal_14, currVal_15]); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = "active"; var currVal_1 = _co.groupTransform(_v.context.$implicit); _ck(_v, 0, 0, currVal_0, currVal_1); }); }
function View_BarVertical2DComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](2, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 16777216, null, null, 12, "ngx-charts-chart", [], null, [[null, "legendLabelActivate"], [null, "legendLabelDeactivate"], [null, "legendLabelClick"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("legendLabelActivate" === en)) {
        var pd_0 = (_co.onActivate($event) !== false);
        ad = (pd_0 && ad);
    } if (("legendLabelDeactivate" === en)) {
        var pd_1 = (_co.onDeactivate($event) !== false);
        ad = (pd_1 && ad);
    } if (("legendLabelClick" === en)) {
        var pd_2 = (_co.onClick($event) !== false);
        ad = (pd_2 && ad);
    } return ad; }, _common_charts_chart_component_ngfactory__WEBPACK_IMPORTED_MODULE_8__["View_ChartComponent_0"], _common_charts_chart_component_ngfactory__WEBPACK_IMPORTED_MODULE_8__["RenderType_ChartComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](512, null, _common_tooltip_tooltip_service__WEBPACK_IMPORTED_MODULE_9__["TooltipService"], _common_tooltip_tooltip_service__WEBPACK_IMPORTED_MODULE_9__["TooltipService"], [_common_tooltip_injection_service__WEBPACK_IMPORTED_MODULE_10__["InjectionService"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 573440, null, 0, _common_charts_chart_component__WEBPACK_IMPORTED_MODULE_11__["ChartComponent"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _common_tooltip_tooltip_service__WEBPACK_IMPORTED_MODULE_9__["TooltipService"]], { view: [0, "view"], showLegend: [1, "showLegend"], legendOptions: [2, "legendOptions"], activeEntries: [3, "activeEntries"], animations: [4, "animations"] }, { legendLabelClick: "legendLabelClick", legendLabelActivate: "legendLabelActivate", legendLabelDeactivate: "legendLabelDeactivate" }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](3, 2), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](4, 0, null, 0, 8, ":svg:g", [["class", "bar-chart chart"]], [[1, "transform", 0]], null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](5, 0, null, null, 1, ":svg:g", [["ngx-charts-grid-panel-series", ""], ["orient", "vertical"]], null, null, null, _common_grid_panel_series_component_ngfactory__WEBPACK_IMPORTED_MODULE_12__["View_GridPanelSeriesComponent_0"], _common_grid_panel_series_component_ngfactory__WEBPACK_IMPORTED_MODULE_12__["RenderType_GridPanelSeriesComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](6, 573440, null, 0, _common_grid_panel_series_component__WEBPACK_IMPORTED_MODULE_13__["GridPanelSeriesComponent"], [], { data: [0, "data"], dims: [1, "dims"], xScale: [2, "xScale"], yScale: [3, "yScale"], orient: [4, "orient"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_BarVertical2DComponent_1)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](8, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_14__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_BarVertical2DComponent_2)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](10, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_14__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_BarVertical2DComponent_3)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](12, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_14__["NgForOf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"]], { ngForOf: [0, "ngForOf"], ngForTrackBy: [1, "ngForTrackBy"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _ck(_v, 3, 0, _co.width, _co.height); var currVal_1 = _co.legend; var currVal_2 = _co.legendOptions; var currVal_3 = _co.activeEntries; var currVal_4 = _co.animations; _ck(_v, 2, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4); var currVal_6 = _co.results; var currVal_7 = _co.dims; var currVal_8 = _co.groupScale; var currVal_9 = _co.valueScale; var currVal_10 = "vertical"; _ck(_v, 6, 0, currVal_6, currVal_7, currVal_8, currVal_9, currVal_10); var currVal_11 = _co.xAxis; _ck(_v, 8, 0, currVal_11); var currVal_12 = _co.yAxis; _ck(_v, 10, 0, currVal_12); var currVal_13 = _co.results; var currVal_14 = _co.trackBy; _ck(_v, 12, 0, currVal_13, currVal_14); }, function (_ck, _v) { var _co = _v.component; var currVal_5 = _co.transform; _ck(_v, 4, 0, currVal_5); }); }
function View_BarVertical2DComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "ngx-charts-bar-vertical-2d", [], null, null, null, View_BarVertical2DComponent_0, RenderType_BarVertical2DComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 4898816, null, 1, _bar_vertical_2d_component__WEBPACK_IMPORTED_MODULE_15__["BarVertical2DComponent"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 1, { tooltipTemplate: 0 })], null, null); }
var BarVertical2DComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("ngx-charts-bar-vertical-2d", _bar_vertical_2d_component__WEBPACK_IMPORTED_MODULE_15__["BarVertical2DComponent"], View_BarVertical2DComponent_Host_0, { results: "results", view: "view", scheme: "scheme", schemeType: "schemeType", customColors: "customColors", animations: "animations", legend: "legend", legendTitle: "legendTitle", legendPosition: "legendPosition", xAxis: "xAxis", yAxis: "yAxis", showXAxisLabel: "showXAxisLabel", showYAxisLabel: "showYAxisLabel", xAxisLabel: "xAxisLabel", yAxisLabel: "yAxisLabel", tooltipDisabled: "tooltipDisabled", scaleType: "scaleType", gradient: "gradient", showGridLines: "showGridLines", activeEntries: "activeEntries", trimXAxisTicks: "trimXAxisTicks", trimYAxisTicks: "trimYAxisTicks", maxXAxisTickLength: "maxXAxisTickLength", maxYAxisTickLength: "maxYAxisTickLength", xAxisTickFormatting: "xAxisTickFormatting", yAxisTickFormatting: "yAxisTickFormatting", xAxisTicks: "xAxisTicks", yAxisTicks: "yAxisTicks", groupPadding: "groupPadding", barPadding: "barPadding", roundDomains: "roundDomains", roundEdges: "roundEdges", yScaleMax: "yScaleMax", showDataLabel: "showDataLabel", dataLabelFormatting: "dataLabelFormatting" }, { select: "select", activate: "activate", deactivate: "deactivate" }, []);



/***/ }),

/***/ "./node_modules/@swimlane/ngx-charts/release/common/grid-panel-series.component.ngfactory.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/@swimlane/ngx-charts/release/common/grid-panel-series.component.ngfactory.js ***!
  \***************************************************************************************************/
/*! exports provided: RenderType_GridPanelSeriesComponent, View_GridPanelSeriesComponent_0, View_GridPanelSeriesComponent_Host_0, GridPanelSeriesComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_GridPanelSeriesComponent", function() { return RenderType_GridPanelSeriesComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_GridPanelSeriesComponent_0", function() { return View_GridPanelSeriesComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_GridPanelSeriesComponent_Host_0", function() { return View_GridPanelSeriesComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GridPanelSeriesComponentNgFactory", function() { return GridPanelSeriesComponentNgFactory; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _grid_panel_component_ngfactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./grid-panel.component.ngfactory */ "./node_modules/@swimlane/ngx-charts/release/common/grid-panel.component.ngfactory.js");
/* harmony import */ var _grid_panel_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./grid-panel.component */ "./node_modules/@swimlane/ngx-charts/release/common/grid-panel.component.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _grid_panel_series_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./grid-panel-series.component */ "./node_modules/@swimlane/ngx-charts/release/common/grid-panel-series.component.js");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 





var styles_GridPanelSeriesComponent = [];
var RenderType_GridPanelSeriesComponent = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵcrt"]({ encapsulation: 2, styles: styles_GridPanelSeriesComponent, data: {} });

function View_GridPanelSeriesComponent_1(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](0, 0, null, null, 1, ":svg:g", [["ngx-charts-grid-panel", ""]], [[2, "grid-panel", null], [2, "odd", null], [2, "even", null]], null, null, _grid_panel_component_ngfactory__WEBPACK_IMPORTED_MODULE_1__["View_GridPanelComponent_0"], _grid_panel_component_ngfactory__WEBPACK_IMPORTED_MODULE_1__["RenderType_GridPanelComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdid"](1, 49152, null, 0, _grid_panel_component__WEBPACK_IMPORTED_MODULE_2__["GridPanelComponent"], [], { width: [0, "width"], height: [1, "height"], x: [2, "x"], y: [3, "y"] }, null)], function (_ck, _v) { var currVal_3 = _v.context.$implicit.width; var currVal_4 = _v.context.$implicit.height; var currVal_5 = _v.context.$implicit.x; var currVal_6 = _v.context.$implicit.y; _ck(_v, 1, 0, currVal_3, currVal_4, currVal_5, currVal_6); }, function (_ck, _v) { var currVal_0 = true; var currVal_1 = (_v.context.$implicit.class === "odd"); var currVal_2 = (_v.context.$implicit.class === "even"); _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2); }); }
function View_GridPanelSeriesComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵvid"](2, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵand"](16777216, null, null, 1, null, View_GridPanelSeriesComponent_1)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdid"](1, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["IterableDiffers"]], { ngForOf: [0, "ngForOf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.gridPanels; _ck(_v, 1, 0, currVal_0); }, null); }
function View_GridPanelSeriesComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](0, 0, null, null, 1, "g", [["ngx-charts-grid-panel-series", ""]], null, null, null, View_GridPanelSeriesComponent_0, RenderType_GridPanelSeriesComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdid"](1, 573440, null, 0, _grid_panel_series_component__WEBPACK_IMPORTED_MODULE_4__["GridPanelSeriesComponent"], [], null, null)], null, null); }
var GridPanelSeriesComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵccf"]("g[ngx-charts-grid-panel-series]", _grid_panel_series_component__WEBPACK_IMPORTED_MODULE_4__["GridPanelSeriesComponent"], View_GridPanelSeriesComponent_Host_0, { data: "data", dims: "dims", xScale: "xScale", yScale: "yScale", orient: "orient" }, {}, []);



/***/ }),

/***/ "./node_modules/@swimlane/ngx-charts/release/common/grid-panel.component.ngfactory.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/@swimlane/ngx-charts/release/common/grid-panel.component.ngfactory.js ***!
  \********************************************************************************************/
/*! exports provided: RenderType_GridPanelComponent, View_GridPanelComponent_0, View_GridPanelComponent_Host_0, GridPanelComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_GridPanelComponent", function() { return RenderType_GridPanelComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_GridPanelComponent_0", function() { return View_GridPanelComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_GridPanelComponent_Host_0", function() { return View_GridPanelComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GridPanelComponentNgFactory", function() { return GridPanelComponentNgFactory; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _grid_panel_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./grid-panel.component */ "./node_modules/@swimlane/ngx-charts/release/common/grid-panel.component.js");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 


var styles_GridPanelComponent = [];
var RenderType_GridPanelComponent = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵcrt"]({ encapsulation: 2, styles: styles_GridPanelComponent, data: {} });

function View_GridPanelComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵvid"](2, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](0, 0, null, null, 0, ":svg:rect", [["class", "gridpanel"], ["stroke", "none"]], [[1, "height", 0], [1, "width", 0], [1, "x", 0], [1, "y", 0]], null, null, null, null))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.height; var currVal_1 = _co.width; var currVal_2 = _co.x; var currVal_3 = _co.y; _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2, currVal_3); }); }
function View_GridPanelComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](0, 0, null, null, 1, "g", [["ngx-charts-grid-panel", ""]], null, null, null, View_GridPanelComponent_0, RenderType_GridPanelComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdid"](1, 49152, null, 0, _grid_panel_component__WEBPACK_IMPORTED_MODULE_1__["GridPanelComponent"], [], null, null)], null, null); }
var GridPanelComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵccf"]("g[ngx-charts-grid-panel]", _grid_panel_component__WEBPACK_IMPORTED_MODULE_1__["GridPanelComponent"], View_GridPanelComponent_Host_0, { path: "path", width: "width", height: "height", x: "x", y: "y" }, {}, []);



/***/ }),

/***/ "./src/app/layout/reports/bank/bank.component.css.shim.ngstyle.js":
/*!************************************************************************!*\
  !*** ./src/app/layout/reports/bank/bank.component.css.shim.ngstyle.js ***!
  \************************************************************************/
/*! exports provided: styles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = [""];



/***/ }),

/***/ "./src/app/layout/reports/bank/bank.component.ngfactory.js":
/*!*****************************************************************!*\
  !*** ./src/app/layout/reports/bank/bank.component.ngfactory.js ***!
  \*****************************************************************/
/*! exports provided: RenderType_BankComponent, View_BankComponent_0, View_BankComponent_Host_0, BankComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_BankComponent", function() { return RenderType_BankComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_BankComponent_0", function() { return View_BankComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_BankComponent_Host_0", function() { return View_BankComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BankComponentNgFactory", function() { return BankComponentNgFactory; });
/* harmony import */ var _bank_component_css_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bank.component.css.shim.ngstyle */ "./src/app/layout/reports/bank/bank.component.css.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _node_modules_ngx_loading_ngx_loading_ngfactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/ngx-loading/ngx-loading.ngfactory */ "./node_modules/ngx-loading/ngx-loading.ngfactory.js");
/* harmony import */ var ngx_loading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-loading */ "./node_modules/ngx-loading/fesm5/ngx-loading.js");
/* harmony import */ var _node_modules_primeng_components_calendar_calendar_ngfactory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../node_modules/primeng/components/calendar/calendar.ngfactory */ "./node_modules/primeng/components/calendar/calendar.ngfactory.js");
/* harmony import */ var primeng_components_dom_domhandler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primeng/components/dom/domhandler */ "./node_modules/primeng/components/dom/domhandler.js");
/* harmony import */ var primeng_components_dom_domhandler__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(primeng_components_dom_domhandler__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var primeng_components_calendar_calendar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primeng/components/calendar/calendar */ "./node_modules/primeng/components/calendar/calendar.js");
/* harmony import */ var primeng_components_calendar_calendar__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(primeng_components_calendar_calendar__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _node_modules_swimlane_ngx_charts_release_bar_chart_bar_vertical_2d_component_ngfactory__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../node_modules/@swimlane/ngx-charts/release/bar-chart/bar-vertical-2d.component.ngfactory */ "./node_modules/@swimlane/ngx-charts/release/bar-chart/bar-vertical-2d.component.ngfactory.js");
/* harmony import */ var _swimlane_ngx_charts_release_bar_chart_bar_vertical_2d_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @swimlane/ngx-charts/release/bar-chart/bar-vertical-2d.component */ "./node_modules/@swimlane/ngx-charts/release/bar-chart/bar-vertical-2d.component.js");
/* harmony import */ var _bank_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./bank.component */ "./src/app/layout/reports/bank/bank.component.ts");
/* harmony import */ var _services_admin_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../services/admin.service */ "./src/app/services/admin.service.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 












var styles_BankComponent = [_bank_component_css_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_BankComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_BankComponent, data: {} });

function View_BankComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "ngx-loading", [], null, null, null, _node_modules_ngx_loading_ngx_loading_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_NgxLoadingComponent_0"], _node_modules_ngx_loading_ngx_loading_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_NgxLoadingComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 114688, null, 0, ngx_loading__WEBPACK_IMPORTED_MODULE_3__["NgxLoadingComponent"], [ngx_loading__WEBPACK_IMPORTED_MODULE_3__["NgxLoadingService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]], { show: [0, "show"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](2, 0, null, null, 65, "div", [["class", "container-fluid"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, null, 4, "div", [["class", "row"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](4, 0, null, null, 3, "div", [["class", "col-12"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](5, 0, null, null, 2, "div", [["class", "title-group"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](6, 0, null, null, 1, "h5", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Report - Bank"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](8, 0, null, null, 59, "div", [["class", "white-bg marginT15 padding15"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](9, 0, null, null, 2, "div", [["class", "page-title-4"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](10, 0, null, null, 1, "h3", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Stats and Trend Analytics"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](12, 0, null, null, 33, "div", [["class", "row"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](13, 0, null, null, 0, "div", [["class", "col-lg-4 col-md-4 col-sm-4 col-12"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](14, 0, null, null, 31, "div", [["class", "col-lg-8 col-md-8 col-sm-8 col-12"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](15, 0, null, null, 30, "div", [["class", "pull-right row"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](16, 0, null, null, 11, "div", [["class", "col-lg-4 col-md-4 col-sm-5 col-5"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](17, 0, null, null, 10, "div", [["class", "form-group marginB0"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](18, 0, null, null, 1, "label", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["From:"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](20, 0, null, null, 7, "p-calendar", [["showButtonBar", "true"], ["showIcon", "true"], ["yearRange", "2000:2030"]], [[2, "ui-inputwrapper-filled", null], [2, "ui-inputwrapper-focus", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ngModelChange" === en)) {
        var pd_0 = ((_co.parameter.min = $event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_primeng_components_calendar_calendar_ngfactory__WEBPACK_IMPORTED_MODULE_4__["View_Calendar_0"], _node_modules_primeng_components_calendar_calendar_ngfactory__WEBPACK_IMPORTED_MODULE_4__["RenderType_Calendar"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](512, null, primeng_components_dom_domhandler__WEBPACK_IMPORTED_MODULE_5__["DomHandler"], primeng_components_dom_domhandler__WEBPACK_IMPORTED_MODULE_5__["DomHandler"], []), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](22, 13877248, null, 1, primeng_components_calendar_calendar__WEBPACK_IMPORTED_MODULE_6__["Calendar"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], primeng_components_dom_domhandler__WEBPACK_IMPORTED_MODULE_5__["DomHandler"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]], { showIcon: [0, "showIcon"], monthNavigator: [1, "monthNavigator"], yearNavigator: [2, "yearNavigator"], yearRange: [3, "yearRange"], showButtonBar: [4, "showButtonBar"], maxDate: [5, "maxDate"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 1, { templates: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [primeng_components_calendar_calendar__WEBPACK_IMPORTED_MODULE_6__["Calendar"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](25, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgModel"], [[8, null], [8, null], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NG_VALUE_ACCESSOR"]]], { model: [0, "model"] }, { update: "ngModelChange" }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgModel"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](27, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgControl"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](28, 0, null, null, 11, "div", [["class", "col-lg-4 col-md-4 col-sm-5 col-5"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](29, 0, null, null, 10, "div", [["class", "form-group marginB0"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](30, 0, null, null, 1, "label", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["To:"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](32, 0, null, null, 7, "p-calendar", [["showButtonBar", "true"], ["showIcon", "true"], ["yearRange", "2000:2030"]], [[2, "ui-inputwrapper-filled", null], [2, "ui-inputwrapper-focus", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ngModelChange" === en)) {
        var pd_0 = ((_co.parameter.max = $event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_primeng_components_calendar_calendar_ngfactory__WEBPACK_IMPORTED_MODULE_4__["View_Calendar_0"], _node_modules_primeng_components_calendar_calendar_ngfactory__WEBPACK_IMPORTED_MODULE_4__["RenderType_Calendar"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](512, null, primeng_components_dom_domhandler__WEBPACK_IMPORTED_MODULE_5__["DomHandler"], primeng_components_dom_domhandler__WEBPACK_IMPORTED_MODULE_5__["DomHandler"], []), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](34, 13877248, null, 1, primeng_components_calendar_calendar__WEBPACK_IMPORTED_MODULE_6__["Calendar"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], primeng_components_dom_domhandler__WEBPACK_IMPORTED_MODULE_5__["DomHandler"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]], { showIcon: [0, "showIcon"], monthNavigator: [1, "monthNavigator"], yearNavigator: [2, "yearNavigator"], yearRange: [3, "yearRange"], showButtonBar: [4, "showButtonBar"], minDate: [5, "minDate"], maxDate: [6, "maxDate"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 2, { templates: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [primeng_components_calendar_calendar__WEBPACK_IMPORTED_MODULE_6__["Calendar"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](37, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgModel"], [[8, null], [8, null], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NG_VALUE_ACCESSOR"]]], { model: [0, "model"] }, { update: "ngModelChange" }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgModel"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](39, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgControl"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](40, 0, null, null, 5, "div", [["class", "col-lg-4 col-md-4 col-sm-2 col-5"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](41, 0, null, null, 4, "div", [["class", "form-group btn-cont"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](42, 0, null, null, 1, "label", [["class", "addMT3"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["\u00A0"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](44, 0, null, null, 1, "button", [["class", "btn btn-calender"], ["href", "javascript://"]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.getReportData() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Apply"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](46, 0, null, null, 17, "div", [["class", "row report-data"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](47, 0, null, null, 4, "div", [["class", "col-sm-5"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](48, 0, null, null, 1, "p", [["class", "report-data-title"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](49, null, ["Total ", " On Platform"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](50, 0, null, null, 1, "p", [["class", "report-data-value"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](51, null, ["", ""])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](52, 0, null, null, 11, "div", [["class", "col-sm-7"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](53, 0, null, null, 10, "div", [["class", "row"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](54, 0, null, null, 4, "div", [["class", "col-sm-6"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](55, 0, null, null, 1, "span", [["class", "report-label report-red"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["\u00A0"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](57, 0, null, null, 1, "span", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](58, null, [" Sign Up (", ")"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](59, 0, null, null, 4, "div", [["class", "col-sm-6"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](60, 0, null, null, 1, "span", [["class", "report-label report-yellow"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["\u00A0"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](62, 0, null, null, 1, "span", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](63, null, [" Properties (", ")"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](64, 0, null, null, 3, "div", [["class", "graph-area"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](65, 0, null, null, 2, "ngx-charts-bar-vertical-2d", [], null, [[null, "select"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("select" === en)) {
        var pd_0 = (_co.onSelect($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_swimlane_ngx_charts_release_bar_chart_bar_vertical_2d_component_ngfactory__WEBPACK_IMPORTED_MODULE_8__["View_BarVertical2DComponent_0"], _node_modules_swimlane_ngx_charts_release_bar_chart_bar_vertical_2d_component_ngfactory__WEBPACK_IMPORTED_MODULE_8__["RenderType_BarVertical2DComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](66, 4898816, null, 1, _swimlane_ngx_charts_release_bar_chart_bar_vertical_2d_component__WEBPACK_IMPORTED_MODULE_9__["BarVertical2DComponent"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]], { results: [0, "results"], scheme: [1, "scheme"], animations: [2, "animations"], legend: [3, "legend"], xAxis: [4, "xAxis"], yAxis: [5, "yAxis"], gradient: [6, "gradient"], groupPadding: [7, "groupPadding"], barPadding: [8, "barPadding"] }, { select: "select" }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 3, { tooltipTemplate: 0 })], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.parameter.loading; _ck(_v, 1, 0, currVal_0); var currVal_10 = "true"; var currVal_11 = true; var currVal_12 = true; var currVal_13 = "2000:2030"; var currVal_14 = "true"; var currVal_15 = _co.today; _ck(_v, 22, 0, currVal_10, currVal_11, currVal_12, currVal_13, currVal_14, currVal_15); var currVal_16 = _co.parameter.min; _ck(_v, 25, 0, currVal_16); var currVal_26 = "true"; var currVal_27 = true; var currVal_28 = true; var currVal_29 = "2000:2030"; var currVal_30 = "true"; var currVal_31 = _co.parameter.min; var currVal_32 = _co.today; _ck(_v, 34, 0, currVal_26, currVal_27, currVal_28, currVal_29, currVal_30, currVal_31, currVal_32); var currVal_33 = _co.parameter.max; _ck(_v, 37, 0, currVal_33); var currVal_39 = _co.chartView; var currVal_40 = _co.colorScheme; var currVal_41 = true; var currVal_42 = false; var currVal_43 = true; var currVal_44 = true; var currVal_45 = false; var currVal_46 = 4; var currVal_47 = 2; _ck(_v, 66, 0, currVal_39, currVal_40, currVal_41, currVal_42, currVal_43, currVal_44, currVal_45, currVal_46, currVal_47); }, function (_ck, _v) { var _co = _v.component; var currVal_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 22).filled; var currVal_2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 22).focus; var currVal_3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).ngClassUntouched; var currVal_4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).ngClassTouched; var currVal_5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).ngClassPristine; var currVal_6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).ngClassDirty; var currVal_7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).ngClassValid; var currVal_8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).ngClassInvalid; var currVal_9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).ngClassPending; _ck(_v, 20, 0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9); var currVal_17 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 34).filled; var currVal_18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 34).focus; var currVal_19 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39).ngClassUntouched; var currVal_20 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39).ngClassTouched; var currVal_21 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39).ngClassPristine; var currVal_22 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39).ngClassDirty; var currVal_23 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39).ngClassValid; var currVal_24 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39).ngClassInvalid; var currVal_25 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39).ngClassPending; _ck(_v, 32, 0, currVal_17, currVal_18, currVal_19, currVal_20, currVal_21, currVal_22, currVal_23, currVal_24, currVal_25); var currVal_34 = (!_co.parameter.min || !_co.parameter.max); _ck(_v, 44, 0, currVal_34); var currVal_35 = ((_co.parameter.total > 0) ? "Banks" : "Bank"); _ck(_v, 49, 0, currVal_35); var currVal_36 = _co.parameter.total; _ck(_v, 51, 0, currVal_36); var currVal_37 = _co.totalSignUpCount; _ck(_v, 58, 0, currVal_37); var currVal_38 = _co.totalPropertyCount; _ck(_v, 63, 0, currVal_38); }); }
function View_BankComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "app-bank", [], null, null, null, View_BankComponent_0, RenderType_BankComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 114688, null, 0, _bank_component__WEBPACK_IMPORTED_MODULE_10__["BankComponent"], [_services_admin_service__WEBPACK_IMPORTED_MODULE_11__["AdminService"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var BankComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("app-bank", _bank_component__WEBPACK_IMPORTED_MODULE_10__["BankComponent"], View_BankComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/layout/reports/bank/bank.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/layout/reports/bank/bank.component.ts ***!
  \*******************************************************/
/*! exports provided: BankComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BankComponent", function() { return BankComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_admin_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);



var BankComponent = /** @class */ (function () {
    function BankComponent(admin) {
        this.admin = admin;
        this.parameter = {};
        this.today = new Date();
        this.chartView = [];
        this.colorScheme = {
            domain: ['#ee7b7c', '#f5d05c']
        };
        // Object.assign(this, this.chartView);
    }
    BankComponent.prototype.onSelect = function (event) { };
    BankComponent.prototype.ngOnInit = function () {
        var date = new Date();
        // this.parameter.min = new Date(date.getFullYear() + '-' + '01' + '-' + '01');
        // this.parameter.max = date;
        // this.parameter.min = moment(date.getFullYear() + '-' + '01' + '-' + '01').format('YYYY-MM-DD');
        // this.parameter.max = moment().format('YYYY-MM-DD');
        this.parameter.min = moment__WEBPACK_IMPORTED_MODULE_2__().subtract(12, 'months').toDate();
        this.parameter.max = moment__WEBPACK_IMPORTED_MODULE_2__().toDate();
        this.getReportData();
    };
    BankComponent.prototype.getReportData = function () {
        var _this = this;
        this.totalSignUpCount = 0;
        this.totalPropertyCount = 0;
        // const input = {start_date: this.parameter.min, end_date: this.parameter.max};
        var input = { start_date: moment__WEBPACK_IMPORTED_MODULE_2__(this.parameter.min).format('YYYY-MM-DD'), end_date: moment__WEBPACK_IMPORTED_MODULE_2__(this.parameter.max).format('YYYY-MM-DD') };
        this.parameter.loading = true;
        this.admin.postDataApi('reports/bank', input).subscribe(function (r) {
            _this.parameter.loading = false;
            _this.parameter.items = r.data;
            var data = [];
            _this.parameter.items.forEach(function (element) {
                _this.totalSignUpCount = _this.totalSignUpCount + element.signup_count;
                _this.totalPropertyCount = _this.totalPropertyCount + element.property_count;
                data.push({
                    'name': element.month_name + ', ' + element.year,
                    'series': [
                        {
                            'name': 'Sign Up',
                            'value': element.signup_count
                        }, {
                            'name': 'Properties',
                            'value': element.property_count
                        }
                    ]
                });
            });
            _this.parameter.total = _this.totalSignUpCount + _this.totalPropertyCount;
            _this.chartView = data;
            // Object.assign(this, this.chartView);
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    return BankComponent;
}());



/***/ }),

/***/ "./src/app/layout/reports/buyer/buyer.component.css.shim.ngstyle.js":
/*!**************************************************************************!*\
  !*** ./src/app/layout/reports/buyer/buyer.component.css.shim.ngstyle.js ***!
  \**************************************************************************/
/*! exports provided: styles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = [""];



/***/ }),

/***/ "./src/app/layout/reports/buyer/buyer.component.ngfactory.js":
/*!*******************************************************************!*\
  !*** ./src/app/layout/reports/buyer/buyer.component.ngfactory.js ***!
  \*******************************************************************/
/*! exports provided: RenderType_BuyerComponent, View_BuyerComponent_0, View_BuyerComponent_Host_0, BuyerComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_BuyerComponent", function() { return RenderType_BuyerComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_BuyerComponent_0", function() { return View_BuyerComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_BuyerComponent_Host_0", function() { return View_BuyerComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BuyerComponentNgFactory", function() { return BuyerComponentNgFactory; });
/* harmony import */ var _buyer_component_css_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buyer.component.css.shim.ngstyle */ "./src/app/layout/reports/buyer/buyer.component.css.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _node_modules_ngx_loading_ngx_loading_ngfactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/ngx-loading/ngx-loading.ngfactory */ "./node_modules/ngx-loading/ngx-loading.ngfactory.js");
/* harmony import */ var ngx_loading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-loading */ "./node_modules/ngx-loading/fesm5/ngx-loading.js");
/* harmony import */ var _node_modules_primeng_components_calendar_calendar_ngfactory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../node_modules/primeng/components/calendar/calendar.ngfactory */ "./node_modules/primeng/components/calendar/calendar.ngfactory.js");
/* harmony import */ var primeng_components_dom_domhandler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primeng/components/dom/domhandler */ "./node_modules/primeng/components/dom/domhandler.js");
/* harmony import */ var primeng_components_dom_domhandler__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(primeng_components_dom_domhandler__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var primeng_components_calendar_calendar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primeng/components/calendar/calendar */ "./node_modules/primeng/components/calendar/calendar.js");
/* harmony import */ var primeng_components_calendar_calendar__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(primeng_components_calendar_calendar__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _node_modules_swimlane_ngx_charts_release_bar_chart_bar_vertical_2d_component_ngfactory__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../node_modules/@swimlane/ngx-charts/release/bar-chart/bar-vertical-2d.component.ngfactory */ "./node_modules/@swimlane/ngx-charts/release/bar-chart/bar-vertical-2d.component.ngfactory.js");
/* harmony import */ var _swimlane_ngx_charts_release_bar_chart_bar_vertical_2d_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @swimlane/ngx-charts/release/bar-chart/bar-vertical-2d.component */ "./node_modules/@swimlane/ngx-charts/release/bar-chart/bar-vertical-2d.component.js");
/* harmony import */ var _buyer_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./buyer.component */ "./src/app/layout/reports/buyer/buyer.component.ts");
/* harmony import */ var _services_admin_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../services/admin.service */ "./src/app/services/admin.service.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 












var styles_BuyerComponent = [_buyer_component_css_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_BuyerComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_BuyerComponent, data: {} });

function View_BuyerComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "ngx-loading", [], null, null, null, _node_modules_ngx_loading_ngx_loading_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_NgxLoadingComponent_0"], _node_modules_ngx_loading_ngx_loading_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_NgxLoadingComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 114688, null, 0, ngx_loading__WEBPACK_IMPORTED_MODULE_3__["NgxLoadingComponent"], [ngx_loading__WEBPACK_IMPORTED_MODULE_3__["NgxLoadingService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]], { show: [0, "show"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](2, 0, null, null, 76, "div", [["class", "container-fluid"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, null, 4, "div", [["class", "row"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](4, 0, null, null, 3, "div", [["class", "col-12"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](5, 0, null, null, 2, "div", [["class", "title-group"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](6, 0, null, null, 1, "h5", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Report - Buyer"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](8, 0, null, null, 70, "div", [["class", "white-bg marginT15 padding15"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](9, 0, null, null, 2, "div", [["class", "page-title-4"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](10, 0, null, null, 1, "h3", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Stats and Trend Analytics"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](12, 0, null, null, 33, "div", [["class", "row"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](13, 0, null, null, 0, "div", [["class", "col-lg-4 col-md-4 col-sm-4 col-12"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](14, 0, null, null, 31, "div", [["class", "col-lg-8 col-md-8 col-sm-8 col-12"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](15, 0, null, null, 30, "div", [["class", "pull-right row"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](16, 0, null, null, 11, "div", [["class", "col-lg-4 col-md-4 col-sm-5 col-5"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](17, 0, null, null, 10, "div", [["class", "form-group marginB0"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](18, 0, null, null, 1, "label", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["From:"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](20, 0, null, null, 7, "p-calendar", [["showButtonBar", "true"], ["showIcon", "true"], ["yearRange", "2000:2030"]], [[2, "ui-inputwrapper-filled", null], [2, "ui-inputwrapper-focus", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ngModelChange" === en)) {
        var pd_0 = ((_co.parameter.min = $event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_primeng_components_calendar_calendar_ngfactory__WEBPACK_IMPORTED_MODULE_4__["View_Calendar_0"], _node_modules_primeng_components_calendar_calendar_ngfactory__WEBPACK_IMPORTED_MODULE_4__["RenderType_Calendar"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](512, null, primeng_components_dom_domhandler__WEBPACK_IMPORTED_MODULE_5__["DomHandler"], primeng_components_dom_domhandler__WEBPACK_IMPORTED_MODULE_5__["DomHandler"], []), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](22, 13877248, null, 1, primeng_components_calendar_calendar__WEBPACK_IMPORTED_MODULE_6__["Calendar"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], primeng_components_dom_domhandler__WEBPACK_IMPORTED_MODULE_5__["DomHandler"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]], { showIcon: [0, "showIcon"], monthNavigator: [1, "monthNavigator"], yearNavigator: [2, "yearNavigator"], yearRange: [3, "yearRange"], showButtonBar: [4, "showButtonBar"], maxDate: [5, "maxDate"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 1, { templates: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [primeng_components_calendar_calendar__WEBPACK_IMPORTED_MODULE_6__["Calendar"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](25, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgModel"], [[8, null], [8, null], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NG_VALUE_ACCESSOR"]]], { model: [0, "model"] }, { update: "ngModelChange" }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgModel"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](27, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgControl"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](28, 0, null, null, 11, "div", [["class", "col-lg-4 col-md-4 col-sm-5 col-5"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](29, 0, null, null, 10, "div", [["class", "form-group marginB0"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](30, 0, null, null, 1, "label", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["To:"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](32, 0, null, null, 7, "p-calendar", [["showButtonBar", "true"], ["showIcon", "true"], ["yearRange", "2000:2030"]], [[2, "ui-inputwrapper-filled", null], [2, "ui-inputwrapper-focus", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ngModelChange" === en)) {
        var pd_0 = ((_co.parameter.max = $event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_primeng_components_calendar_calendar_ngfactory__WEBPACK_IMPORTED_MODULE_4__["View_Calendar_0"], _node_modules_primeng_components_calendar_calendar_ngfactory__WEBPACK_IMPORTED_MODULE_4__["RenderType_Calendar"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](512, null, primeng_components_dom_domhandler__WEBPACK_IMPORTED_MODULE_5__["DomHandler"], primeng_components_dom_domhandler__WEBPACK_IMPORTED_MODULE_5__["DomHandler"], []), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](34, 13877248, null, 1, primeng_components_calendar_calendar__WEBPACK_IMPORTED_MODULE_6__["Calendar"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], primeng_components_dom_domhandler__WEBPACK_IMPORTED_MODULE_5__["DomHandler"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]], { showIcon: [0, "showIcon"], monthNavigator: [1, "monthNavigator"], yearNavigator: [2, "yearNavigator"], yearRange: [3, "yearRange"], showButtonBar: [4, "showButtonBar"], minDate: [5, "minDate"], maxDate: [6, "maxDate"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 2, { templates: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [primeng_components_calendar_calendar__WEBPACK_IMPORTED_MODULE_6__["Calendar"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](37, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgModel"], [[8, null], [8, null], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NG_VALUE_ACCESSOR"]]], { model: [0, "model"] }, { update: "ngModelChange" }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgModel"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](39, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgControl"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](40, 0, null, null, 5, "div", [["class", "col-lg-4 col-md-4 col-sm-2 col-5"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](41, 0, null, null, 4, "div", [["class", "form-group btn-cont"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](42, 0, null, null, 1, "label", [["class", "addMT3"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["\u00A0"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](44, 0, null, null, 1, "button", [["class", "btn btn-calender"], ["href", "javascript://"]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.getReportData() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Apply"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](46, 0, null, null, 28, "div", [["class", "row report-data"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](47, 0, null, null, 4, "div", [["class", "col-sm-5"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](48, 0, null, null, 1, "p", [["class", "report-data-title"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](49, null, ["Total ", " On Platform"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](50, 0, null, null, 1, "p", [["class", "report-data-value"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](51, null, ["", ""])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](52, 0, null, null, 22, "div", [["class", "col-sm-7"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](53, 0, null, null, 10, "div", [["class", "row"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](54, 0, null, null, 4, "div", [["class", "col-sm-6"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](55, 0, null, null, 1, "span", [["class", "report-label report-green"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["\u00A0"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](57, 0, null, null, 1, "span", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](58, null, [" Sign Up (", ")"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](59, 0, null, null, 4, "div", [["class", "col-sm-6"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](60, 0, null, null, 1, "span", [["class", "report-label report-blue"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["\u00A0"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](62, 0, null, null, 1, "span", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](63, null, [" Added Information (", ")"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](64, 0, null, null, 10, "div", [["class", "row marginT15"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](65, 0, null, null, 4, "div", [["class", "col-sm-6"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](66, 0, null, null, 1, "span", [["class", "report-label report-red"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["\u00A0"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](68, 0, null, null, 1, "span", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](69, null, [" Brokers Assigned (", ")"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](70, 0, null, null, 4, "div", [["class", "col-sm-6"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](71, 0, null, null, 1, "span", [["class", "report-label report-yellow"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["\u00A0"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](73, 0, null, null, 1, "span", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](74, null, [" Sold (", ")"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](75, 0, null, null, 3, "div", [["class", "graph-area"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](76, 0, null, null, 2, "ngx-charts-bar-vertical-2d", [], null, [[null, "select"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("select" === en)) {
        var pd_0 = (_co.onSelect($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_swimlane_ngx_charts_release_bar_chart_bar_vertical_2d_component_ngfactory__WEBPACK_IMPORTED_MODULE_8__["View_BarVertical2DComponent_0"], _node_modules_swimlane_ngx_charts_release_bar_chart_bar_vertical_2d_component_ngfactory__WEBPACK_IMPORTED_MODULE_8__["RenderType_BarVertical2DComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](77, 4898816, null, 1, _swimlane_ngx_charts_release_bar_chart_bar_vertical_2d_component__WEBPACK_IMPORTED_MODULE_9__["BarVertical2DComponent"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]], { results: [0, "results"], scheme: [1, "scheme"], animations: [2, "animations"], legend: [3, "legend"], xAxis: [4, "xAxis"], yAxis: [5, "yAxis"], gradient: [6, "gradient"], groupPadding: [7, "groupPadding"], barPadding: [8, "barPadding"] }, { select: "select" }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 3, { tooltipTemplate: 0 })], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.parameter.loading; _ck(_v, 1, 0, currVal_0); var currVal_10 = "true"; var currVal_11 = true; var currVal_12 = true; var currVal_13 = "2000:2030"; var currVal_14 = "true"; var currVal_15 = _co.today; _ck(_v, 22, 0, currVal_10, currVal_11, currVal_12, currVal_13, currVal_14, currVal_15); var currVal_16 = _co.parameter.min; _ck(_v, 25, 0, currVal_16); var currVal_26 = "true"; var currVal_27 = true; var currVal_28 = true; var currVal_29 = "2000:2030"; var currVal_30 = "true"; var currVal_31 = _co.parameter.min; var currVal_32 = _co.today; _ck(_v, 34, 0, currVal_26, currVal_27, currVal_28, currVal_29, currVal_30, currVal_31, currVal_32); var currVal_33 = _co.parameter.max; _ck(_v, 37, 0, currVal_33); var currVal_41 = _co.chartView; var currVal_42 = _co.colorScheme; var currVal_43 = true; var currVal_44 = false; var currVal_45 = true; var currVal_46 = true; var currVal_47 = false; var currVal_48 = 4; var currVal_49 = 2; _ck(_v, 77, 0, currVal_41, currVal_42, currVal_43, currVal_44, currVal_45, currVal_46, currVal_47, currVal_48, currVal_49); }, function (_ck, _v) { var _co = _v.component; var currVal_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 22).filled; var currVal_2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 22).focus; var currVal_3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).ngClassUntouched; var currVal_4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).ngClassTouched; var currVal_5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).ngClassPristine; var currVal_6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).ngClassDirty; var currVal_7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).ngClassValid; var currVal_8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).ngClassInvalid; var currVal_9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).ngClassPending; _ck(_v, 20, 0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9); var currVal_17 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 34).filled; var currVal_18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 34).focus; var currVal_19 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39).ngClassUntouched; var currVal_20 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39).ngClassTouched; var currVal_21 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39).ngClassPristine; var currVal_22 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39).ngClassDirty; var currVal_23 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39).ngClassValid; var currVal_24 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39).ngClassInvalid; var currVal_25 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39).ngClassPending; _ck(_v, 32, 0, currVal_17, currVal_18, currVal_19, currVal_20, currVal_21, currVal_22, currVal_23, currVal_24, currVal_25); var currVal_34 = (!_co.parameter.min || !_co.parameter.max); _ck(_v, 44, 0, currVal_34); var currVal_35 = ((_co.parameter.total > 0) ? "Buyers" : "Buyer"); _ck(_v, 49, 0, currVal_35); var currVal_36 = _co.parameter.total; _ck(_v, 51, 0, currVal_36); var currVal_37 = _co.totalSignUpCount; _ck(_v, 58, 0, currVal_37); var currVal_38 = _co.totalInfoCount; _ck(_v, 63, 0, currVal_38); var currVal_39 = _co.totalBrokerCount; _ck(_v, 69, 0, currVal_39); var currVal_40 = _co.totalSold; _ck(_v, 74, 0, currVal_40); }); }
function View_BuyerComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "app-buyer", [], null, null, null, View_BuyerComponent_0, RenderType_BuyerComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 114688, null, 0, _buyer_component__WEBPACK_IMPORTED_MODULE_10__["BuyerComponent"], [_services_admin_service__WEBPACK_IMPORTED_MODULE_11__["AdminService"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var BuyerComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("app-buyer", _buyer_component__WEBPACK_IMPORTED_MODULE_10__["BuyerComponent"], View_BuyerComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/layout/reports/buyer/buyer.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/layout/reports/buyer/buyer.component.ts ***!
  \*********************************************************/
/*! exports provided: BuyerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BuyerComponent", function() { return BuyerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_admin_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);



var BuyerComponent = /** @class */ (function () {
    function BuyerComponent(admin) {
        this.admin = admin;
        this.parameter = {};
        this.today = new Date();
        this.chartView = [];
        this.colorScheme = {
            domain: ['#4eb96f', '#4a85ff', '#ee7b7c', '#f5d05c']
        };
        // Object.assign(this, this.chartView);
    }
    BuyerComponent.prototype.onSelect = function (event) { };
    BuyerComponent.prototype.ngOnInit = function () {
        var date = new Date();
        // this.parameter.min = new Date(date.getFullYear() + '-' + '01' + '-' + '01');
        // this.parameter.max = date;
        // this.parameter.min = moment(date.getFullYear() + '-' + '01' + '-' + '01').format('YYYY-MM-DD');
        // this.parameter.max = moment().format('YYYY-MM-DD');
        this.parameter.min = moment__WEBPACK_IMPORTED_MODULE_2__().subtract(12, 'months').toDate();
        this.parameter.max = moment__WEBPACK_IMPORTED_MODULE_2__().toDate();
        this.getReportData();
    };
    BuyerComponent.prototype.getReportData = function () {
        var _this = this;
        this.totalSignUpCount = 0;
        this.totalInfoCount = 0;
        this.totalBrokerCount = 0;
        this.totalSold = 0;
        // const input = {start_date: this.parameter.min, end_date: this.parameter.max};
        var input = { start_date: moment__WEBPACK_IMPORTED_MODULE_2__(this.parameter.min).format('YYYY-MM-DD'), end_date: moment__WEBPACK_IMPORTED_MODULE_2__(this.parameter.max).format('YYYY-MM-DD') };
        this.parameter.loading = true;
        this.admin.postDataApi('reports/buyers', input).subscribe(function (r) {
            _this.parameter.loading = false;
            _this.parameter.items = r.data;
            var data = [];
            _this.parameter.items.forEach(function (element) {
                _this.totalSignUpCount = _this.totalSignUpCount + element.signup_count;
                _this.totalInfoCount = _this.totalInfoCount + element.info_count;
                _this.totalBrokerCount = _this.totalBrokerCount + element.broker_count;
                _this.totalSold = _this.totalSold + element.property_sold;
                data.push({
                    'name': element.month_name + ', ' + element.year,
                    'series': [
                        {
                            'name': 'Sign Up',
                            'value': element.signup_count
                        }, {
                            'name': 'Added Information',
                            'value': element.info_count
                        }, {
                            'name': 'Brokers Assigned',
                            'value': element.broker_count
                        }, {
                            'name': 'Sold',
                            'value': element.property_sold
                        }
                    ]
                });
            });
            _this.parameter.total = _this.totalSignUpCount + _this.totalInfoCount + _this.totalBrokerCount + _this.totalSold;
            _this.chartView = data;
            // Object.assign(this, this.chartView);
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    return BuyerComponent;
}());



/***/ }),

/***/ "./src/app/layout/reports/notary/notary.component.css.shim.ngstyle.js":
/*!****************************************************************************!*\
  !*** ./src/app/layout/reports/notary/notary.component.css.shim.ngstyle.js ***!
  \****************************************************************************/
/*! exports provided: styles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = [""];



/***/ }),

/***/ "./src/app/layout/reports/notary/notary.component.ngfactory.js":
/*!*********************************************************************!*\
  !*** ./src/app/layout/reports/notary/notary.component.ngfactory.js ***!
  \*********************************************************************/
/*! exports provided: RenderType_NotaryComponent, View_NotaryComponent_0, View_NotaryComponent_Host_0, NotaryComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_NotaryComponent", function() { return RenderType_NotaryComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_NotaryComponent_0", function() { return View_NotaryComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_NotaryComponent_Host_0", function() { return View_NotaryComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotaryComponentNgFactory", function() { return NotaryComponentNgFactory; });
/* harmony import */ var _notary_component_css_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./notary.component.css.shim.ngstyle */ "./src/app/layout/reports/notary/notary.component.css.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _node_modules_ngx_loading_ngx_loading_ngfactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/ngx-loading/ngx-loading.ngfactory */ "./node_modules/ngx-loading/ngx-loading.ngfactory.js");
/* harmony import */ var ngx_loading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-loading */ "./node_modules/ngx-loading/fesm5/ngx-loading.js");
/* harmony import */ var _node_modules_primeng_components_calendar_calendar_ngfactory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../node_modules/primeng/components/calendar/calendar.ngfactory */ "./node_modules/primeng/components/calendar/calendar.ngfactory.js");
/* harmony import */ var primeng_components_dom_domhandler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primeng/components/dom/domhandler */ "./node_modules/primeng/components/dom/domhandler.js");
/* harmony import */ var primeng_components_dom_domhandler__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(primeng_components_dom_domhandler__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var primeng_components_calendar_calendar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primeng/components/calendar/calendar */ "./node_modules/primeng/components/calendar/calendar.js");
/* harmony import */ var primeng_components_calendar_calendar__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(primeng_components_calendar_calendar__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _node_modules_swimlane_ngx_charts_release_bar_chart_bar_vertical_2d_component_ngfactory__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../node_modules/@swimlane/ngx-charts/release/bar-chart/bar-vertical-2d.component.ngfactory */ "./node_modules/@swimlane/ngx-charts/release/bar-chart/bar-vertical-2d.component.ngfactory.js");
/* harmony import */ var _swimlane_ngx_charts_release_bar_chart_bar_vertical_2d_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @swimlane/ngx-charts/release/bar-chart/bar-vertical-2d.component */ "./node_modules/@swimlane/ngx-charts/release/bar-chart/bar-vertical-2d.component.js");
/* harmony import */ var _notary_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./notary.component */ "./src/app/layout/reports/notary/notary.component.ts");
/* harmony import */ var _services_admin_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../services/admin.service */ "./src/app/services/admin.service.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 












var styles_NotaryComponent = [_notary_component_css_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_NotaryComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_NotaryComponent, data: {} });

function View_NotaryComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "ngx-loading", [], null, null, null, _node_modules_ngx_loading_ngx_loading_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_NgxLoadingComponent_0"], _node_modules_ngx_loading_ngx_loading_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_NgxLoadingComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 114688, null, 0, ngx_loading__WEBPACK_IMPORTED_MODULE_3__["NgxLoadingComponent"], [ngx_loading__WEBPACK_IMPORTED_MODULE_3__["NgxLoadingService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]], { show: [0, "show"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](2, 0, null, null, 65, "div", [["class", "container-fluid"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, null, 4, "div", [["class", "row"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](4, 0, null, null, 3, "div", [["class", "col-12"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](5, 0, null, null, 2, "div", [["class", "title-group"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](6, 0, null, null, 1, "h5", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Report - Notary"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](8, 0, null, null, 59, "div", [["class", "white-bg marginT15 padding15"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](9, 0, null, null, 2, "div", [["class", "page-title-4"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](10, 0, null, null, 1, "h3", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Stats and Trend Analytics"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](12, 0, null, null, 33, "div", [["class", "row"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](13, 0, null, null, 0, "div", [["class", "col-lg-4 col-md-4 col-sm-4 col-12"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](14, 0, null, null, 31, "div", [["class", "col-lg-8 col-md-8 col-sm-8 col-12"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](15, 0, null, null, 30, "div", [["class", "pull-right row"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](16, 0, null, null, 11, "div", [["class", "col-lg-4 col-md-4 col-sm-5 col-5"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](17, 0, null, null, 10, "div", [["class", "form-group marginB0"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](18, 0, null, null, 1, "label", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["From:"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](20, 0, null, null, 7, "p-calendar", [["showButtonBar", "true"], ["showIcon", "true"], ["yearRange", "2000:2030"]], [[2, "ui-inputwrapper-filled", null], [2, "ui-inputwrapper-focus", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ngModelChange" === en)) {
        var pd_0 = ((_co.parameter.min = $event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_primeng_components_calendar_calendar_ngfactory__WEBPACK_IMPORTED_MODULE_4__["View_Calendar_0"], _node_modules_primeng_components_calendar_calendar_ngfactory__WEBPACK_IMPORTED_MODULE_4__["RenderType_Calendar"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](512, null, primeng_components_dom_domhandler__WEBPACK_IMPORTED_MODULE_5__["DomHandler"], primeng_components_dom_domhandler__WEBPACK_IMPORTED_MODULE_5__["DomHandler"], []), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](22, 13877248, null, 1, primeng_components_calendar_calendar__WEBPACK_IMPORTED_MODULE_6__["Calendar"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], primeng_components_dom_domhandler__WEBPACK_IMPORTED_MODULE_5__["DomHandler"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]], { showIcon: [0, "showIcon"], monthNavigator: [1, "monthNavigator"], yearNavigator: [2, "yearNavigator"], yearRange: [3, "yearRange"], showButtonBar: [4, "showButtonBar"], maxDate: [5, "maxDate"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 1, { templates: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [primeng_components_calendar_calendar__WEBPACK_IMPORTED_MODULE_6__["Calendar"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](25, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgModel"], [[8, null], [8, null], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NG_VALUE_ACCESSOR"]]], { model: [0, "model"] }, { update: "ngModelChange" }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgModel"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](27, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgControl"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](28, 0, null, null, 11, "div", [["class", "col-lg-4 col-md-4 col-sm-5 col-5"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](29, 0, null, null, 10, "div", [["class", "form-group marginB0"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](30, 0, null, null, 1, "label", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["To:"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](32, 0, null, null, 7, "p-calendar", [["showButtonBar", "true"], ["showIcon", "true"], ["yearRange", "2000:2030"]], [[2, "ui-inputwrapper-filled", null], [2, "ui-inputwrapper-focus", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ngModelChange" === en)) {
        var pd_0 = ((_co.parameter.max = $event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_primeng_components_calendar_calendar_ngfactory__WEBPACK_IMPORTED_MODULE_4__["View_Calendar_0"], _node_modules_primeng_components_calendar_calendar_ngfactory__WEBPACK_IMPORTED_MODULE_4__["RenderType_Calendar"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](512, null, primeng_components_dom_domhandler__WEBPACK_IMPORTED_MODULE_5__["DomHandler"], primeng_components_dom_domhandler__WEBPACK_IMPORTED_MODULE_5__["DomHandler"], []), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](34, 13877248, null, 1, primeng_components_calendar_calendar__WEBPACK_IMPORTED_MODULE_6__["Calendar"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], primeng_components_dom_domhandler__WEBPACK_IMPORTED_MODULE_5__["DomHandler"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]], { showIcon: [0, "showIcon"], monthNavigator: [1, "monthNavigator"], yearNavigator: [2, "yearNavigator"], yearRange: [3, "yearRange"], showButtonBar: [4, "showButtonBar"], minDate: [5, "minDate"], maxDate: [6, "maxDate"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 2, { templates: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [primeng_components_calendar_calendar__WEBPACK_IMPORTED_MODULE_6__["Calendar"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](37, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgModel"], [[8, null], [8, null], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NG_VALUE_ACCESSOR"]]], { model: [0, "model"] }, { update: "ngModelChange" }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgModel"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](39, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgControl"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](40, 0, null, null, 5, "div", [["class", "col-lg-4 col-md-4 col-sm-2 col-5"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](41, 0, null, null, 4, "div", [["class", "form-group btn-cont"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](42, 0, null, null, 1, "label", [["class", "addMT3"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["\u00A0"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](44, 0, null, null, 1, "button", [["class", "btn btn-calender"], ["href", "javascript://"]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.getReportData() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Apply"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](46, 0, null, null, 17, "div", [["class", "row report-data"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](47, 0, null, null, 4, "div", [["class", "col-sm-5"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](48, 0, null, null, 1, "p", [["class", "report-data-title"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](49, null, ["Total ", " On Platform"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](50, 0, null, null, 1, "p", [["class", "report-data-value"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](51, null, ["", ""])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](52, 0, null, null, 11, "div", [["class", "col-sm-7"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](53, 0, null, null, 10, "div", [["class", "row"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](54, 0, null, null, 4, "div", [["class", "col-sm-6"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](55, 0, null, null, 1, "span", [["class", "report-label report-green"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["\u00A0"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](57, 0, null, null, 1, "span", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](58, null, [" Sign Up (", ")"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](59, 0, null, null, 4, "div", [["class", "col-sm-6"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](60, 0, null, null, 1, "span", [["class", "report-label report-blue"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["\u00A0"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](62, 0, null, null, 1, "span", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](63, null, [" Properties (", ")"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](64, 0, null, null, 3, "div", [["class", "graph-area"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](65, 0, null, null, 2, "ngx-charts-bar-vertical-2d", [], null, [[null, "select"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("select" === en)) {
        var pd_0 = (_co.onSelect($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_swimlane_ngx_charts_release_bar_chart_bar_vertical_2d_component_ngfactory__WEBPACK_IMPORTED_MODULE_8__["View_BarVertical2DComponent_0"], _node_modules_swimlane_ngx_charts_release_bar_chart_bar_vertical_2d_component_ngfactory__WEBPACK_IMPORTED_MODULE_8__["RenderType_BarVertical2DComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](66, 4898816, null, 1, _swimlane_ngx_charts_release_bar_chart_bar_vertical_2d_component__WEBPACK_IMPORTED_MODULE_9__["BarVertical2DComponent"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]], { results: [0, "results"], scheme: [1, "scheme"], animations: [2, "animations"], legend: [3, "legend"], xAxis: [4, "xAxis"], yAxis: [5, "yAxis"], gradient: [6, "gradient"], groupPadding: [7, "groupPadding"], barPadding: [8, "barPadding"] }, { select: "select" }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 3, { tooltipTemplate: 0 })], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.parameter.loading; _ck(_v, 1, 0, currVal_0); var currVal_10 = "true"; var currVal_11 = true; var currVal_12 = true; var currVal_13 = "2000:2030"; var currVal_14 = "true"; var currVal_15 = _co.today; _ck(_v, 22, 0, currVal_10, currVal_11, currVal_12, currVal_13, currVal_14, currVal_15); var currVal_16 = _co.parameter.min; _ck(_v, 25, 0, currVal_16); var currVal_26 = "true"; var currVal_27 = true; var currVal_28 = true; var currVal_29 = "2000:2030"; var currVal_30 = "true"; var currVal_31 = _co.parameter.min; var currVal_32 = _co.today; _ck(_v, 34, 0, currVal_26, currVal_27, currVal_28, currVal_29, currVal_30, currVal_31, currVal_32); var currVal_33 = _co.parameter.max; _ck(_v, 37, 0, currVal_33); var currVal_39 = _co.chartView; var currVal_40 = _co.colorScheme; var currVal_41 = true; var currVal_42 = false; var currVal_43 = true; var currVal_44 = true; var currVal_45 = false; var currVal_46 = 4; var currVal_47 = 2; _ck(_v, 66, 0, currVal_39, currVal_40, currVal_41, currVal_42, currVal_43, currVal_44, currVal_45, currVal_46, currVal_47); }, function (_ck, _v) { var _co = _v.component; var currVal_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 22).filled; var currVal_2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 22).focus; var currVal_3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).ngClassUntouched; var currVal_4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).ngClassTouched; var currVal_5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).ngClassPristine; var currVal_6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).ngClassDirty; var currVal_7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).ngClassValid; var currVal_8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).ngClassInvalid; var currVal_9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).ngClassPending; _ck(_v, 20, 0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9); var currVal_17 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 34).filled; var currVal_18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 34).focus; var currVal_19 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39).ngClassUntouched; var currVal_20 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39).ngClassTouched; var currVal_21 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39).ngClassPristine; var currVal_22 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39).ngClassDirty; var currVal_23 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39).ngClassValid; var currVal_24 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39).ngClassInvalid; var currVal_25 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39).ngClassPending; _ck(_v, 32, 0, currVal_17, currVal_18, currVal_19, currVal_20, currVal_21, currVal_22, currVal_23, currVal_24, currVal_25); var currVal_34 = (!_co.parameter.min || !_co.parameter.max); _ck(_v, 44, 0, currVal_34); var currVal_35 = ((_co.parameter.total > 0) ? "Notaries" : "Notary"); _ck(_v, 49, 0, currVal_35); var currVal_36 = _co.parameter.total; _ck(_v, 51, 0, currVal_36); var currVal_37 = _co.totalSignUpCount; _ck(_v, 58, 0, currVal_37); var currVal_38 = _co.totalPropertyCount; _ck(_v, 63, 0, currVal_38); }); }
function View_NotaryComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "app-notary", [], null, null, null, View_NotaryComponent_0, RenderType_NotaryComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 114688, null, 0, _notary_component__WEBPACK_IMPORTED_MODULE_10__["NotaryComponent"], [_services_admin_service__WEBPACK_IMPORTED_MODULE_11__["AdminService"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var NotaryComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("app-notary", _notary_component__WEBPACK_IMPORTED_MODULE_10__["NotaryComponent"], View_NotaryComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/layout/reports/notary/notary.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/layout/reports/notary/notary.component.ts ***!
  \***********************************************************/
/*! exports provided: NotaryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotaryComponent", function() { return NotaryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_admin_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);



var NotaryComponent = /** @class */ (function () {
    function NotaryComponent(admin) {
        this.admin = admin;
        this.parameter = {};
        this.today = new Date();
        this.chartView = [];
        this.colorScheme = {
            domain: ['#4eb96f', '#4a85ff']
        };
        // Object.assign(this, this.chartView);
    }
    NotaryComponent.prototype.onSelect = function (event) { };
    NotaryComponent.prototype.ngOnInit = function () {
        var date = new Date();
        // this.parameter.min = new Date(date.getFullYear() + '-' + '01' + '-' + '01');
        // this.parameter.max = date;
        // this.parameter.min = moment(date.getFullYear() + '-' + '01' + '-' + '01').format('YYYY-MM-DD');
        // this.parameter.max = moment().format('YYYY-MM-DD');
        this.parameter.min = moment__WEBPACK_IMPORTED_MODULE_2__().subtract(12, 'months').toDate();
        this.parameter.max = moment__WEBPACK_IMPORTED_MODULE_2__().toDate();
        this.getReportData();
    };
    NotaryComponent.prototype.getReportData = function () {
        var _this = this;
        this.totalSignUpCount = 0;
        this.totalPropertyCount = 0;
        // const input = {start_date: this.parameter.min, end_date: this.parameter.max};
        var input = { start_date: moment__WEBPACK_IMPORTED_MODULE_2__(this.parameter.min).format('YYYY-MM-DD'), end_date: moment__WEBPACK_IMPORTED_MODULE_2__(this.parameter.max).format('YYYY-MM-DD') };
        this.parameter.loading = true;
        this.admin.postDataApi('reports/noatary', input).subscribe(function (r) {
            _this.parameter.loading = false;
            _this.parameter.items = r.data;
            var data = [];
            _this.parameter.items.forEach(function (element) {
                _this.totalSignUpCount = _this.totalSignUpCount + element.signup_count;
                _this.totalPropertyCount = _this.totalPropertyCount + element.property_count;
                data.push({
                    'name': element.month_name + ', ' + element.year,
                    'series': [
                        {
                            'name': 'Sign Up',
                            'value': element.signup_count
                        }, {
                            'name': 'Properties',
                            'value': element.property_count
                        }
                    ]
                });
            });
            _this.parameter.total = _this.totalSignUpCount + _this.totalPropertyCount;
            _this.chartView = data;
            // Object.assign(this, this.chartView);
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    return NotaryComponent;
}());



/***/ }),

/***/ "./src/app/layout/reports/reports.module.ngfactory.js":
/*!************************************************************!*\
  !*** ./src/app/layout/reports/reports.module.ngfactory.js ***!
  \************************************************************/
/*! exports provided: ReportsModuleNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportsModuleNgFactory", function() { return ReportsModuleNgFactory; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _reports_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reports.module */ "./src/app/layout/reports/reports.module.ts");
/* harmony import */ var _node_modules_angular_router_router_ngfactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/@angular/router/router.ngfactory */ "./node_modules/@angular/router/router.ngfactory.js");
/* harmony import */ var _node_modules_swimlane_ngx_charts_release_common_tooltip_tooltip_component_ngfactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/@swimlane/ngx-charts/release/common/tooltip/tooltip.component.ngfactory */ "./node_modules/@swimlane/ngx-charts/release/common/tooltip/tooltip.component.ngfactory.js");
/* harmony import */ var _seller_seller_component_ngfactory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./seller/seller.component.ngfactory */ "./src/app/layout/reports/seller/seller.component.ngfactory.js");
/* harmony import */ var _buyer_buyer_component_ngfactory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./buyer/buyer.component.ngfactory */ "./src/app/layout/reports/buyer/buyer.component.ngfactory.js");
/* harmony import */ var _notary_notary_component_ngfactory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./notary/notary.component.ngfactory */ "./src/app/layout/reports/notary/notary.component.ngfactory.js");
/* harmony import */ var _bank_bank_component_ngfactory__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./bank/bank.component.ngfactory */ "./src/app/layout/reports/bank/bank.component.ngfactory.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _swimlane_ngx_charts_release_common_tooltip_injection_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @swimlane/ngx-charts/release/common/tooltip/injection.service */ "./node_modules/@swimlane/ngx-charts/release/common/tooltip/injection.service.js");
/* harmony import */ var _swimlane_ngx_charts_release_common_tooltip_tooltip_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @swimlane/ngx-charts/release/common/tooltip/tooltip.service */ "./node_modules/@swimlane/ngx-charts/release/common/tooltip/tooltip.service.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_loading__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ngx-loading */ "./node_modules/ngx-loading/fesm5/ngx-loading.js");
/* harmony import */ var _swimlane_ngx_charts_release_common_axes_axes_module__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @swimlane/ngx-charts/release/common/axes/axes.module */ "./node_modules/@swimlane/ngx-charts/release/common/axes/axes.module.js");
/* harmony import */ var _swimlane_ngx_charts_release_common_tooltip_tooltip_module__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @swimlane/ngx-charts/release/common/tooltip/tooltip.module */ "./node_modules/@swimlane/ngx-charts/release/common/tooltip/tooltip.module.js");
/* harmony import */ var _swimlane_ngx_charts_release_common_chart_common_module__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @swimlane/ngx-charts/release/common/chart-common.module */ "./node_modules/@swimlane/ngx-charts/release/common/chart-common.module.js");
/* harmony import */ var _swimlane_ngx_charts_release_area_chart_area_chart_module__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @swimlane/ngx-charts/release/area-chart/area-chart.module */ "./node_modules/@swimlane/ngx-charts/release/area-chart/area-chart.module.js");
/* harmony import */ var _swimlane_ngx_charts_release_bar_chart_bar_chart_module__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @swimlane/ngx-charts/release/bar-chart/bar-chart.module */ "./node_modules/@swimlane/ngx-charts/release/bar-chart/bar-chart.module.js");
/* harmony import */ var _swimlane_ngx_charts_release_bubble_chart_bubble_chart_module__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @swimlane/ngx-charts/release/bubble-chart/bubble-chart.module */ "./node_modules/@swimlane/ngx-charts/release/bubble-chart/bubble-chart.module.js");
/* harmony import */ var _swimlane_ngx_charts_release_force_directed_graph_force_directed_graph_module__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @swimlane/ngx-charts/release/force-directed-graph/force-directed-graph.module */ "./node_modules/@swimlane/ngx-charts/release/force-directed-graph/force-directed-graph.module.js");
/* harmony import */ var _swimlane_ngx_charts_release_heat_map_heat_map_module__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @swimlane/ngx-charts/release/heat-map/heat-map.module */ "./node_modules/@swimlane/ngx-charts/release/heat-map/heat-map.module.js");
/* harmony import */ var _swimlane_ngx_charts_release_line_chart_line_chart_module__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @swimlane/ngx-charts/release/line-chart/line-chart.module */ "./node_modules/@swimlane/ngx-charts/release/line-chart/line-chart.module.js");
/* harmony import */ var _swimlane_ngx_charts_release_pie_chart_pie_chart_module__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @swimlane/ngx-charts/release/pie-chart/pie-chart.module */ "./node_modules/@swimlane/ngx-charts/release/pie-chart/pie-chart.module.js");
/* harmony import */ var _swimlane_ngx_charts_release_polar_chart_polar_chart_module__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @swimlane/ngx-charts/release/polar-chart/polar-chart.module */ "./node_modules/@swimlane/ngx-charts/release/polar-chart/polar-chart.module.js");
/* harmony import */ var _swimlane_ngx_charts_release_number_card_number_card_module__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @swimlane/ngx-charts/release/number-card/number-card.module */ "./node_modules/@swimlane/ngx-charts/release/number-card/number-card.module.js");
/* harmony import */ var _swimlane_ngx_charts_release_tree_map_tree_map_module__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @swimlane/ngx-charts/release/tree-map/tree-map.module */ "./node_modules/@swimlane/ngx-charts/release/tree-map/tree-map.module.js");
/* harmony import */ var _swimlane_ngx_charts_release_gauge_gauge_module__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @swimlane/ngx-charts/release/gauge/gauge.module */ "./node_modules/@swimlane/ngx-charts/release/gauge/gauge.module.js");
/* harmony import */ var _swimlane_ngx_charts_release_ngx_charts_module__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @swimlane/ngx-charts/release/ngx-charts.module */ "./node_modules/@swimlane/ngx-charts/release/ngx-charts.module.js");
/* harmony import */ var ng2_tel_input_src_ng2_tel_input_module__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ng2-tel-input/src/ng2-tel-input.module */ "./node_modules/ng2-tel-input/src/ng2-tel-input.module.js");
/* harmony import */ var primeng_components_button_button__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! primeng/components/button/button */ "./node_modules/primeng/components/button/button.js");
/* harmony import */ var primeng_components_button_button__WEBPACK_IMPORTED_MODULE_31___default = /*#__PURE__*/__webpack_require__.n(primeng_components_button_button__WEBPACK_IMPORTED_MODULE_31__);
/* harmony import */ var primeng_components_common_shared__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! primeng/components/common/shared */ "./node_modules/primeng/components/common/shared.js");
/* harmony import */ var primeng_components_common_shared__WEBPACK_IMPORTED_MODULE_32___default = /*#__PURE__*/__webpack_require__.n(primeng_components_common_shared__WEBPACK_IMPORTED_MODULE_32__);
/* harmony import */ var primeng_components_calendar_calendar__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! primeng/components/calendar/calendar */ "./node_modules/primeng/components/calendar/calendar.js");
/* harmony import */ var primeng_components_calendar_calendar__WEBPACK_IMPORTED_MODULE_33___default = /*#__PURE__*/__webpack_require__.n(primeng_components_calendar_calendar__WEBPACK_IMPORTED_MODULE_33__);
/* harmony import */ var _seller_seller_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./seller/seller.component */ "./src/app/layout/reports/seller/seller.component.ts");
/* harmony import */ var _guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ../../guards/acl-user.guard */ "./src/app/guards/acl-user.guard.ts");
/* harmony import */ var _buyer_buyer_component__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./buyer/buyer.component */ "./src/app/layout/reports/buyer/buyer.component.ts");
/* harmony import */ var _notary_notary_component__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./notary/notary.component */ "./src/app/layout/reports/notary/notary.component.ts");
/* harmony import */ var _bank_bank_component__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./bank/bank.component */ "./src/app/layout/reports/bank/bank.component.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 







































var ReportsModuleNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵcmf"](_reports_module__WEBPACK_IMPORTED_MODULE_1__["ReportsModule"], [], function (_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmod"]([_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵCodegenComponentFactoryResolver"], [[8, [_node_modules_angular_router_router_ngfactory__WEBPACK_IMPORTED_MODULE_2__["ɵEmptyOutletComponentNgFactory"], _node_modules_swimlane_ngx_charts_release_common_tooltip_tooltip_component_ngfactory__WEBPACK_IMPORTED_MODULE_3__["TooltipContentComponentNgFactory"], _seller_seller_component_ngfactory__WEBPACK_IMPORTED_MODULE_4__["SellerComponentNgFactory"], _buyer_buyer_component_ngfactory__WEBPACK_IMPORTED_MODULE_5__["BuyerComponentNgFactory"], _notary_notary_component_ngfactory__WEBPACK_IMPORTED_MODULE_6__["NotaryComponentNgFactory"], _bank_bank_component_ngfactory__WEBPACK_IMPORTED_MODULE_7__["BankComponentNgFactory"]]], [3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"]], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModuleRef"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgLocalization"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgLocaleLocalization"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["LOCALE_ID"], [2, _angular_common__WEBPACK_IMPORTED_MODULE_8__["ɵangular_packages_common_common_a"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, ngx_pagination__WEBPACK_IMPORTED_MODULE_9__["PaginationService"], ngx_pagination__WEBPACK_IMPORTED_MODULE_9__["PaginationService"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_forms__WEBPACK_IMPORTED_MODULE_10__["ɵangular_packages_forms_forms_i"], _angular_forms__WEBPACK_IMPORTED_MODULE_10__["ɵangular_packages_forms_forms_i"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_forms__WEBPACK_IMPORTED_MODULE_10__["FormBuilder"], _angular_forms__WEBPACK_IMPORTED_MODULE_10__["FormBuilder"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _swimlane_ngx_charts_release_common_tooltip_injection_service__WEBPACK_IMPORTED_MODULE_11__["InjectionService"], _swimlane_ngx_charts_release_common_tooltip_injection_service__WEBPACK_IMPORTED_MODULE_11__["InjectionService"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ApplicationRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _swimlane_ngx_charts_release_common_tooltip_tooltip_service__WEBPACK_IMPORTED_MODULE_12__["TooltipService"], _swimlane_ngx_charts_release_common_tooltip_tooltip_service__WEBPACK_IMPORTED_MODULE_12__["TooltipService"], [_swimlane_ngx_charts_release_common_tooltip_injection_service__WEBPACK_IMPORTED_MODULE_11__["InjectionService"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_common__WEBPACK_IMPORTED_MODULE_8__["LocationStrategy"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["PathLocationStrategy"], [_angular_common__WEBPACK_IMPORTED_MODULE_8__["PlatformLocation"], [2, _angular_common__WEBPACK_IMPORTED_MODULE_8__["APP_BASE_HREF"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_common__WEBPACK_IMPORTED_MODULE_8__["Location"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["Location"], [_angular_common__WEBPACK_IMPORTED_MODULE_8__["LocationStrategy"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_router__WEBPACK_IMPORTED_MODULE_13__["RouterModule"], _angular_router__WEBPACK_IMPORTED_MODULE_13__["RouterModule"], [[2, _angular_router__WEBPACK_IMPORTED_MODULE_13__["ɵangular_packages_router_router_a"]], [2, _angular_router__WEBPACK_IMPORTED_MODULE_13__["Router"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_common__WEBPACK_IMPORTED_MODULE_8__["CommonModule"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["CommonModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, ngx_loading__WEBPACK_IMPORTED_MODULE_14__["NgxLoadingModule"], ngx_loading__WEBPACK_IMPORTED_MODULE_14__["NgxLoadingModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, ngx_pagination__WEBPACK_IMPORTED_MODULE_9__["NgxPaginationModule"], ngx_pagination__WEBPACK_IMPORTED_MODULE_9__["NgxPaginationModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_forms__WEBPACK_IMPORTED_MODULE_10__["ɵangular_packages_forms_forms_bb"], _angular_forms__WEBPACK_IMPORTED_MODULE_10__["ɵangular_packages_forms_forms_bb"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_forms__WEBPACK_IMPORTED_MODULE_10__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_10__["FormsModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_forms__WEBPACK_IMPORTED_MODULE_10__["ReactiveFormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_10__["ReactiveFormsModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _swimlane_ngx_charts_release_common_axes_axes_module__WEBPACK_IMPORTED_MODULE_15__["AxesModule"], _swimlane_ngx_charts_release_common_axes_axes_module__WEBPACK_IMPORTED_MODULE_15__["AxesModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _swimlane_ngx_charts_release_common_tooltip_tooltip_module__WEBPACK_IMPORTED_MODULE_16__["TooltipModule"], _swimlane_ngx_charts_release_common_tooltip_tooltip_module__WEBPACK_IMPORTED_MODULE_16__["TooltipModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _swimlane_ngx_charts_release_common_chart_common_module__WEBPACK_IMPORTED_MODULE_17__["ChartCommonModule"], _swimlane_ngx_charts_release_common_chart_common_module__WEBPACK_IMPORTED_MODULE_17__["ChartCommonModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _swimlane_ngx_charts_release_area_chart_area_chart_module__WEBPACK_IMPORTED_MODULE_18__["AreaChartModule"], _swimlane_ngx_charts_release_area_chart_area_chart_module__WEBPACK_IMPORTED_MODULE_18__["AreaChartModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _swimlane_ngx_charts_release_bar_chart_bar_chart_module__WEBPACK_IMPORTED_MODULE_19__["BarChartModule"], _swimlane_ngx_charts_release_bar_chart_bar_chart_module__WEBPACK_IMPORTED_MODULE_19__["BarChartModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _swimlane_ngx_charts_release_bubble_chart_bubble_chart_module__WEBPACK_IMPORTED_MODULE_20__["BubbleChartModule"], _swimlane_ngx_charts_release_bubble_chart_bubble_chart_module__WEBPACK_IMPORTED_MODULE_20__["BubbleChartModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _swimlane_ngx_charts_release_force_directed_graph_force_directed_graph_module__WEBPACK_IMPORTED_MODULE_21__["ForceDirectedGraphModule"], _swimlane_ngx_charts_release_force_directed_graph_force_directed_graph_module__WEBPACK_IMPORTED_MODULE_21__["ForceDirectedGraphModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _swimlane_ngx_charts_release_heat_map_heat_map_module__WEBPACK_IMPORTED_MODULE_22__["HeatMapModule"], _swimlane_ngx_charts_release_heat_map_heat_map_module__WEBPACK_IMPORTED_MODULE_22__["HeatMapModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _swimlane_ngx_charts_release_line_chart_line_chart_module__WEBPACK_IMPORTED_MODULE_23__["LineChartModule"], _swimlane_ngx_charts_release_line_chart_line_chart_module__WEBPACK_IMPORTED_MODULE_23__["LineChartModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _swimlane_ngx_charts_release_pie_chart_pie_chart_module__WEBPACK_IMPORTED_MODULE_24__["PieChartModule"], _swimlane_ngx_charts_release_pie_chart_pie_chart_module__WEBPACK_IMPORTED_MODULE_24__["PieChartModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _swimlane_ngx_charts_release_polar_chart_polar_chart_module__WEBPACK_IMPORTED_MODULE_25__["PolarChartModule"], _swimlane_ngx_charts_release_polar_chart_polar_chart_module__WEBPACK_IMPORTED_MODULE_25__["PolarChartModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _swimlane_ngx_charts_release_number_card_number_card_module__WEBPACK_IMPORTED_MODULE_26__["NumberCardModule"], _swimlane_ngx_charts_release_number_card_number_card_module__WEBPACK_IMPORTED_MODULE_26__["NumberCardModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _swimlane_ngx_charts_release_tree_map_tree_map_module__WEBPACK_IMPORTED_MODULE_27__["TreeMapModule"], _swimlane_ngx_charts_release_tree_map_tree_map_module__WEBPACK_IMPORTED_MODULE_27__["TreeMapModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _swimlane_ngx_charts_release_gauge_gauge_module__WEBPACK_IMPORTED_MODULE_28__["GaugeModule"], _swimlane_ngx_charts_release_gauge_gauge_module__WEBPACK_IMPORTED_MODULE_28__["GaugeModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _swimlane_ngx_charts_release_ngx_charts_module__WEBPACK_IMPORTED_MODULE_29__["NgxChartsModule"], _swimlane_ngx_charts_release_ngx_charts_module__WEBPACK_IMPORTED_MODULE_29__["NgxChartsModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, ng2_tel_input_src_ng2_tel_input_module__WEBPACK_IMPORTED_MODULE_30__["Ng2TelInputModule"], ng2_tel_input_src_ng2_tel_input_module__WEBPACK_IMPORTED_MODULE_30__["Ng2TelInputModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, primeng_components_button_button__WEBPACK_IMPORTED_MODULE_31__["ButtonModule"], primeng_components_button_button__WEBPACK_IMPORTED_MODULE_31__["ButtonModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, primeng_components_common_shared__WEBPACK_IMPORTED_MODULE_32__["SharedModule"], primeng_components_common_shared__WEBPACK_IMPORTED_MODULE_32__["SharedModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, primeng_components_calendar_calendar__WEBPACK_IMPORTED_MODULE_33__["CalendarModule"], primeng_components_calendar_calendar__WEBPACK_IMPORTED_MODULE_33__["CalendarModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _reports_module__WEBPACK_IMPORTED_MODULE_1__["ReportsModule"], _reports_module__WEBPACK_IMPORTED_MODULE_1__["ReportsModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1024, _angular_router__WEBPACK_IMPORTED_MODULE_13__["ROUTES"], function () { return [[{ path: "seller", component: _seller_seller_component__WEBPACK_IMPORTED_MODULE_34__["SellerComponent"], canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_35__["AclUserGuard"]], data: _reports_module__WEBPACK_IMPORTED_MODULE_1__["ɵ0"] }, { path: "buyer", component: _buyer_buyer_component__WEBPACK_IMPORTED_MODULE_36__["BuyerComponent"], canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_35__["AclUserGuard"]], data: _reports_module__WEBPACK_IMPORTED_MODULE_1__["ɵ1"] }, { path: "notary", component: _notary_notary_component__WEBPACK_IMPORTED_MODULE_37__["NotaryComponent"], canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_35__["AclUserGuard"]], data: _reports_module__WEBPACK_IMPORTED_MODULE_1__["ɵ2"] }, { path: "bank", component: _bank_bank_component__WEBPACK_IMPORTED_MODULE_38__["BankComponent"], canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_35__["AclUserGuard"]], data: _reports_module__WEBPACK_IMPORTED_MODULE_1__["ɵ3"] }]]; }, []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](256, "loadingConfig", { animationType: "rectangle-bounce", primaryColour: "#00B96F" }, [])]); });



/***/ }),

/***/ "./src/app/layout/reports/reports.module.ts":
/*!**************************************************!*\
  !*** ./src/app/layout/reports/reports.module.ts ***!
  \**************************************************/
/*! exports provided: ReportsModule, ɵ0, ɵ1, ɵ2, ɵ3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportsModule", function() { return ReportsModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵ0", function() { return ɵ0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵ1", function() { return ɵ1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵ2", function() { return ɵ2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵ3", function() { return ɵ3; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _seller_seller_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./seller/seller.component */ "./src/app/layout/reports/seller/seller.component.ts");
/* harmony import */ var _buyer_buyer_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./buyer/buyer.component */ "./src/app/layout/reports/buyer/buyer.component.ts");
/* harmony import */ var _notary_notary_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./notary/notary.component */ "./src/app/layout/reports/notary/notary.component.ts");
/* harmony import */ var _bank_bank_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./bank/bank.component */ "./src/app/layout/reports/bank/bank.component.ts");
/* harmony import */ var _guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../guards/acl-user.guard */ "./src/app/guards/acl-user.guard.ts");






var ɵ0 = { roles: ['Reports', 'can_read', ''] }, ɵ1 = { roles: ['Reports', 'can_read', ''] }, ɵ2 = { roles: ['Reports', 'can_read', ''] }, ɵ3 = { roles: ['Reports', 'can_read', ''] };
var routes = [
    { path: 'seller', component: _seller_seller_component__WEBPACK_IMPORTED_MODULE_1__["SellerComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_5__["AclUserGuard"]], data: ɵ0 },
    { path: 'buyer', component: _buyer_buyer_component__WEBPACK_IMPORTED_MODULE_2__["BuyerComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_5__["AclUserGuard"]], data: ɵ1 },
    { path: 'notary', component: _notary_notary_component__WEBPACK_IMPORTED_MODULE_3__["NotaryComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_5__["AclUserGuard"]], data: ɵ2 },
    { path: 'bank', component: _bank_bank_component__WEBPACK_IMPORTED_MODULE_4__["BankComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_5__["AclUserGuard"]], data: ɵ3 }
];
var ReportsModule = /** @class */ (function () {
    function ReportsModule() {
    }
    return ReportsModule;
}());




/***/ }),

/***/ "./src/app/layout/reports/seller/seller.component.css.shim.ngstyle.js":
/*!****************************************************************************!*\
  !*** ./src/app/layout/reports/seller/seller.component.css.shim.ngstyle.js ***!
  \****************************************************************************/
/*! exports provided: styles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = [""];



/***/ }),

/***/ "./src/app/layout/reports/seller/seller.component.ngfactory.js":
/*!*********************************************************************!*\
  !*** ./src/app/layout/reports/seller/seller.component.ngfactory.js ***!
  \*********************************************************************/
/*! exports provided: RenderType_SellerComponent, View_SellerComponent_0, View_SellerComponent_Host_0, SellerComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_SellerComponent", function() { return RenderType_SellerComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_SellerComponent_0", function() { return View_SellerComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_SellerComponent_Host_0", function() { return View_SellerComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SellerComponentNgFactory", function() { return SellerComponentNgFactory; });
/* harmony import */ var _seller_component_css_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./seller.component.css.shim.ngstyle */ "./src/app/layout/reports/seller/seller.component.css.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _node_modules_ngx_loading_ngx_loading_ngfactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/ngx-loading/ngx-loading.ngfactory */ "./node_modules/ngx-loading/ngx-loading.ngfactory.js");
/* harmony import */ var ngx_loading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-loading */ "./node_modules/ngx-loading/fesm5/ngx-loading.js");
/* harmony import */ var _node_modules_primeng_components_calendar_calendar_ngfactory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../node_modules/primeng/components/calendar/calendar.ngfactory */ "./node_modules/primeng/components/calendar/calendar.ngfactory.js");
/* harmony import */ var primeng_components_dom_domhandler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primeng/components/dom/domhandler */ "./node_modules/primeng/components/dom/domhandler.js");
/* harmony import */ var primeng_components_dom_domhandler__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(primeng_components_dom_domhandler__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var primeng_components_calendar_calendar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primeng/components/calendar/calendar */ "./node_modules/primeng/components/calendar/calendar.js");
/* harmony import */ var primeng_components_calendar_calendar__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(primeng_components_calendar_calendar__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _node_modules_swimlane_ngx_charts_release_bar_chart_bar_vertical_2d_component_ngfactory__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../node_modules/@swimlane/ngx-charts/release/bar-chart/bar-vertical-2d.component.ngfactory */ "./node_modules/@swimlane/ngx-charts/release/bar-chart/bar-vertical-2d.component.ngfactory.js");
/* harmony import */ var _swimlane_ngx_charts_release_bar_chart_bar_vertical_2d_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @swimlane/ngx-charts/release/bar-chart/bar-vertical-2d.component */ "./node_modules/@swimlane/ngx-charts/release/bar-chart/bar-vertical-2d.component.js");
/* harmony import */ var _seller_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./seller.component */ "./src/app/layout/reports/seller/seller.component.ts");
/* harmony import */ var _services_admin_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../services/admin.service */ "./src/app/services/admin.service.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 












var styles_SellerComponent = [_seller_component_css_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_SellerComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_SellerComponent, data: {} });

function View_SellerComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "ngx-loading", [], null, null, null, _node_modules_ngx_loading_ngx_loading_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_NgxLoadingComponent_0"], _node_modules_ngx_loading_ngx_loading_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_NgxLoadingComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 114688, null, 0, ngx_loading__WEBPACK_IMPORTED_MODULE_3__["NgxLoadingComponent"], [ngx_loading__WEBPACK_IMPORTED_MODULE_3__["NgxLoadingService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]], { show: [0, "show"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](2, 0, null, null, 76, "div", [["class", "container-fluid"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, null, 4, "div", [["class", "row"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](4, 0, null, null, 3, "div", [["class", "col-12"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](5, 0, null, null, 2, "div", [["class", "title-group"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](6, 0, null, null, 1, "h5", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Report - Seller"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](8, 0, null, null, 70, "div", [["class", "white-bg marginT15 padding15"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](9, 0, null, null, 2, "div", [["class", "page-title-4"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](10, 0, null, null, 1, "h3", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Stats and Trend Analytics"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](12, 0, null, null, 33, "div", [["class", "row"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](13, 0, null, null, 0, "div", [["class", "col-lg-4 col-md-4 col-sm-4 col-12"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](14, 0, null, null, 31, "div", [["class", "col-lg-8 col-md-8 col-sm-8 col-12"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](15, 0, null, null, 30, "div", [["class", "pull-right row"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](16, 0, null, null, 11, "div", [["class", "col-lg-4 col-md-4 col-sm-5 col-5"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](17, 0, null, null, 10, "div", [["class", "form-group marginB0"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](18, 0, null, null, 1, "label", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["From:"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](20, 0, null, null, 7, "p-calendar", [["showButtonBar", "true"], ["showIcon", "true"], ["yearRange", "2000:2030"]], [[2, "ui-inputwrapper-filled", null], [2, "ui-inputwrapper-focus", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ngModelChange" === en)) {
        var pd_0 = ((_co.parameter.min = $event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_primeng_components_calendar_calendar_ngfactory__WEBPACK_IMPORTED_MODULE_4__["View_Calendar_0"], _node_modules_primeng_components_calendar_calendar_ngfactory__WEBPACK_IMPORTED_MODULE_4__["RenderType_Calendar"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](512, null, primeng_components_dom_domhandler__WEBPACK_IMPORTED_MODULE_5__["DomHandler"], primeng_components_dom_domhandler__WEBPACK_IMPORTED_MODULE_5__["DomHandler"], []), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](22, 13877248, null, 1, primeng_components_calendar_calendar__WEBPACK_IMPORTED_MODULE_6__["Calendar"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], primeng_components_dom_domhandler__WEBPACK_IMPORTED_MODULE_5__["DomHandler"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]], { showIcon: [0, "showIcon"], monthNavigator: [1, "monthNavigator"], yearNavigator: [2, "yearNavigator"], yearRange: [3, "yearRange"], showButtonBar: [4, "showButtonBar"], maxDate: [5, "maxDate"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 1, { templates: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [primeng_components_calendar_calendar__WEBPACK_IMPORTED_MODULE_6__["Calendar"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](25, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgModel"], [[8, null], [8, null], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NG_VALUE_ACCESSOR"]]], { model: [0, "model"] }, { update: "ngModelChange" }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgModel"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](27, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgControl"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](28, 0, null, null, 11, "div", [["class", "col-lg-4 col-md-4 col-sm-5 col-5"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](29, 0, null, null, 10, "div", [["class", "form-group marginB0"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](30, 0, null, null, 1, "label", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["To:"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](32, 0, null, null, 7, "p-calendar", [["showButtonBar", "true"], ["showIcon", "true"], ["yearRange", "2000:2030"]], [[2, "ui-inputwrapper-filled", null], [2, "ui-inputwrapper-focus", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ngModelChange" === en)) {
        var pd_0 = ((_co.parameter.max = $event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_primeng_components_calendar_calendar_ngfactory__WEBPACK_IMPORTED_MODULE_4__["View_Calendar_0"], _node_modules_primeng_components_calendar_calendar_ngfactory__WEBPACK_IMPORTED_MODULE_4__["RenderType_Calendar"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](512, null, primeng_components_dom_domhandler__WEBPACK_IMPORTED_MODULE_5__["DomHandler"], primeng_components_dom_domhandler__WEBPACK_IMPORTED_MODULE_5__["DomHandler"], []), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](34, 13877248, null, 1, primeng_components_calendar_calendar__WEBPACK_IMPORTED_MODULE_6__["Calendar"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], primeng_components_dom_domhandler__WEBPACK_IMPORTED_MODULE_5__["DomHandler"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]], { showIcon: [0, "showIcon"], monthNavigator: [1, "monthNavigator"], yearNavigator: [2, "yearNavigator"], yearRange: [3, "yearRange"], showButtonBar: [4, "showButtonBar"], minDate: [5, "minDate"], maxDate: [6, "maxDate"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 2, { templates: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [primeng_components_calendar_calendar__WEBPACK_IMPORTED_MODULE_6__["Calendar"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](37, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgModel"], [[8, null], [8, null], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NG_VALUE_ACCESSOR"]]], { model: [0, "model"] }, { update: "ngModelChange" }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgModel"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](39, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgControl"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](40, 0, null, null, 5, "div", [["class", "col-lg-4 col-md-4 col-sm-2 col-5"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](41, 0, null, null, 4, "div", [["class", "form-group btn-cont"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](42, 0, null, null, 1, "label", [["class", "addMT3"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["\u00A0"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](44, 0, null, null, 1, "button", [["class", "btn btn-calender"], ["href", "javascript://"]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.getReportData() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Apply"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](46, 0, null, null, 28, "div", [["class", "row report-data"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](47, 0, null, null, 4, "div", [["class", "col-sm-5"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](48, 0, null, null, 1, "p", [["class", "report-data-title"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](49, null, ["Total ", " On Platform"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](50, 0, null, null, 1, "p", [["class", "report-data-value"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](51, null, ["", ""])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](52, 0, null, null, 22, "div", [["class", "col-sm-7"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](53, 0, null, null, 10, "div", [["class", "row"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](54, 0, null, null, 4, "div", [["class", "col-sm-6"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](55, 0, null, null, 1, "span", [["class", "report-label report-green"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["\u00A0"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](57, 0, null, null, 1, "span", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](58, null, [" Sign Up (", ")"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](59, 0, null, null, 4, "div", [["class", "col-sm-6"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](60, 0, null, null, 1, "span", [["class", "report-label report-blue"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["\u00A0"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](62, 0, null, null, 1, "span", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](63, null, [" Added Property (", ")"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](64, 0, null, null, 10, "div", [["class", "row marginT15"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](65, 0, null, null, 4, "div", [["class", "col-sm-6"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](66, 0, null, null, 1, "span", [["class", "report-label report-red"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["\u00A0"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](68, 0, null, null, 1, "span", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](69, null, [" Approved (", ")"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](70, 0, null, null, 4, "div", [["class", "col-sm-6"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](71, 0, null, null, 1, "span", [["class", "report-label report-yellow"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["\u00A0"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](73, 0, null, null, 1, "span", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](74, null, [" Sold (", ")"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](75, 0, null, null, 3, "div", [["class", "graph-area"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](76, 0, null, null, 2, "ngx-charts-bar-vertical-2d", [], null, [[null, "select"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("select" === en)) {
        var pd_0 = (_co.onSelect($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_swimlane_ngx_charts_release_bar_chart_bar_vertical_2d_component_ngfactory__WEBPACK_IMPORTED_MODULE_8__["View_BarVertical2DComponent_0"], _node_modules_swimlane_ngx_charts_release_bar_chart_bar_vertical_2d_component_ngfactory__WEBPACK_IMPORTED_MODULE_8__["RenderType_BarVertical2DComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](77, 4898816, null, 1, _swimlane_ngx_charts_release_bar_chart_bar_vertical_2d_component__WEBPACK_IMPORTED_MODULE_9__["BarVertical2DComponent"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]], { results: [0, "results"], scheme: [1, "scheme"], animations: [2, "animations"], legend: [3, "legend"], xAxis: [4, "xAxis"], yAxis: [5, "yAxis"], gradient: [6, "gradient"], groupPadding: [7, "groupPadding"], barPadding: [8, "barPadding"] }, { select: "select" }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 3, { tooltipTemplate: 0 })], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.parameter.loading; _ck(_v, 1, 0, currVal_0); var currVal_10 = "true"; var currVal_11 = true; var currVal_12 = true; var currVal_13 = "2000:2030"; var currVal_14 = "true"; var currVal_15 = _co.today; _ck(_v, 22, 0, currVal_10, currVal_11, currVal_12, currVal_13, currVal_14, currVal_15); var currVal_16 = _co.parameter.min; _ck(_v, 25, 0, currVal_16); var currVal_26 = "true"; var currVal_27 = true; var currVal_28 = true; var currVal_29 = "2000:2030"; var currVal_30 = "true"; var currVal_31 = _co.parameter.min; var currVal_32 = _co.today; _ck(_v, 34, 0, currVal_26, currVal_27, currVal_28, currVal_29, currVal_30, currVal_31, currVal_32); var currVal_33 = _co.parameter.max; _ck(_v, 37, 0, currVal_33); var currVal_41 = _co.chartView; var currVal_42 = _co.colorScheme; var currVal_43 = true; var currVal_44 = false; var currVal_45 = true; var currVal_46 = true; var currVal_47 = false; var currVal_48 = 4; var currVal_49 = 2; _ck(_v, 77, 0, currVal_41, currVal_42, currVal_43, currVal_44, currVal_45, currVal_46, currVal_47, currVal_48, currVal_49); }, function (_ck, _v) { var _co = _v.component; var currVal_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 22).filled; var currVal_2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 22).focus; var currVal_3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).ngClassUntouched; var currVal_4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).ngClassTouched; var currVal_5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).ngClassPristine; var currVal_6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).ngClassDirty; var currVal_7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).ngClassValid; var currVal_8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).ngClassInvalid; var currVal_9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).ngClassPending; _ck(_v, 20, 0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9); var currVal_17 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 34).filled; var currVal_18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 34).focus; var currVal_19 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39).ngClassUntouched; var currVal_20 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39).ngClassTouched; var currVal_21 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39).ngClassPristine; var currVal_22 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39).ngClassDirty; var currVal_23 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39).ngClassValid; var currVal_24 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39).ngClassInvalid; var currVal_25 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39).ngClassPending; _ck(_v, 32, 0, currVal_17, currVal_18, currVal_19, currVal_20, currVal_21, currVal_22, currVal_23, currVal_24, currVal_25); var currVal_34 = (!_co.parameter.min || !_co.parameter.max); _ck(_v, 44, 0, currVal_34); var currVal_35 = ((_co.parameter.total > 0) ? "Sellers" : "Seller"); _ck(_v, 49, 0, currVal_35); var currVal_36 = _co.parameter.total; _ck(_v, 51, 0, currVal_36); var currVal_37 = _co.totalSignUpCount; _ck(_v, 58, 0, currVal_37); var currVal_38 = _co.totalAddedProperty; _ck(_v, 63, 0, currVal_38); var currVal_39 = _co.totalApproved; _ck(_v, 69, 0, currVal_39); var currVal_40 = _co.totalSold; _ck(_v, 74, 0, currVal_40); }); }
function View_SellerComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "app-seller", [], null, null, null, View_SellerComponent_0, RenderType_SellerComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 114688, null, 0, _seller_component__WEBPACK_IMPORTED_MODULE_10__["SellerComponent"], [_services_admin_service__WEBPACK_IMPORTED_MODULE_11__["AdminService"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var SellerComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("app-seller", _seller_component__WEBPACK_IMPORTED_MODULE_10__["SellerComponent"], View_SellerComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/layout/reports/seller/seller.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/layout/reports/seller/seller.component.ts ***!
  \***********************************************************/
/*! exports provided: SellerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SellerComponent", function() { return SellerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_admin_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);



var SellerComponent = /** @class */ (function () {
    function SellerComponent(admin) {
        this.admin = admin;
        this.parameter = {};
        this.today = new Date();
        this.chartView = [];
        this.colorScheme = {
            domain: ['#4eb96f', '#4a85ff', '#ee7b7c', '#f5d05c']
        };
        // Object.assign(this, this.chartView);
    }
    SellerComponent.prototype.onSelect = function (event) { };
    SellerComponent.prototype.ngOnInit = function () {
        var date = new Date();
        // this.parameter.min = new Date(date.getFullYear() + '-' + '01' + '-' + '01');
        // this.parameter.max = date;
        // this.parameter.min = moment(date.getFullYear() + '-' + '01' + '-' + '01').format('YYYY-MM-DD');
        // this.parameter.max = moment().format('YYYY-MM-DD');
        this.parameter.min = moment__WEBPACK_IMPORTED_MODULE_2__().subtract(12, 'months').toDate();
        this.parameter.max = moment__WEBPACK_IMPORTED_MODULE_2__().toDate();
        this.getReportData();
    };
    SellerComponent.prototype.getReportData = function () {
        var _this = this;
        this.totalSignUpCount = 0;
        this.totalAddedProperty = 0;
        this.totalApproved = 0;
        this.totalSold = 0;
        // const input = {start_date: this.parameter.min, end_date: this.parameter.max};
        var input = { start_date: moment__WEBPACK_IMPORTED_MODULE_2__(this.parameter.min).format('YYYY-MM-DD'), end_date: moment__WEBPACK_IMPORTED_MODULE_2__(this.parameter.max).format('YYYY-MM-DD') };
        this.parameter.loading = true;
        this.admin.postDataApi('reports/sellers', input).subscribe(function (r) {
            _this.parameter.loading = false;
            _this.parameter.items = r.data;
            var data = [];
            _this.parameter.items.forEach(function (element) {
                _this.totalSignUpCount = _this.totalSignUpCount + element.signup_count;
                _this.totalAddedProperty = _this.totalAddedProperty + element.property_count;
                _this.totalApproved = _this.totalApproved + element.property_approved;
                _this.totalSold = _this.totalSold + element.property_sold;
                data.push({
                    'name': element.month_name + ', ' + element.year,
                    'series': [
                        {
                            'name': 'Sign Up',
                            'value': element.signup_count
                        }, {
                            'name': 'Added Property',
                            'value': element.property_count
                        }, {
                            'name': 'Approved',
                            'value': element.property_approved
                        }, {
                            'name': 'Sold',
                            'value': element.property_sold
                        }
                    ]
                });
            });
            _this.parameter.total = _this.totalSignUpCount + _this.totalAddedProperty + _this.totalApproved + _this.totalSold;
            _this.chartView = data;
            // Object.assign(this, this.chartView);
        }, function (error) {
            _this.parameter.loading = false;
        });
    };
    return SellerComponent;
}());



/***/ })

}]);
//# sourceMappingURL=reports-reports-module-ngfactory.js.map