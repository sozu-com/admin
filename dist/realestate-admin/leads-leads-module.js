(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["leads-leads-module"],{

/***/ "./node_modules/ng2-nouislider/ng2-nouislider.es5.js":
/*!***********************************************************!*\
  !*** ./node_modules/ng2-nouislider/ng2-nouislider.es5.js ***!
  \***********************************************************/
/*! exports provided: DefaultFormatter, NouisliderComponent, NouisliderModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultFormatter", function() { return DefaultFormatter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NouisliderComponent", function() { return NouisliderComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NouisliderModule", function() { return NouisliderModule; });
/* harmony import */ var nouislider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nouislider */ "./node_modules/nouislider/distribute/nouislider.js");
/* harmony import */ var nouislider__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nouislider__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");



var DefaultFormatter = (function () {
    function DefaultFormatter() {
    }
    /**
     * @param {?} value
     * @return {?}
     */
    DefaultFormatter.prototype.to = function (value) {
        // formatting with http://stackoverflow.com/a/26463364/478584
        return String(parseFloat(parseFloat(String(value)).toFixed(2)));
    };
    ;
    /**
     * @param {?} value
     * @return {?}
     */
    DefaultFormatter.prototype.from = function (value) {
        return parseFloat(value);
    };
    return DefaultFormatter;
}());
var NouisliderComponent = (function () {
    /**
     * @param {?} el
     * @param {?} renderer
     */
    function NouisliderComponent(el, renderer) {
        var _this = this;
        this.el = el;
        this.renderer = renderer;
        this.config = {};
        this.change = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"](true);
        this.update = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"](true);
        this.slide = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"](true);
        this.set = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"](true);
        this.start = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"](true);
        this.end = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"](true);
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
        this.eventHandler = function (emitter, values, handle, unencoded) {
            var /** @type {?} */ v = _this.toValues(values);
            var /** @type {?} */ emitEvents = false;
            if (_this.value === undefined) {
                _this.value = v;
                return;
            }
            if (Array.isArray(v) && _this.value[handle] != v[handle]) {
                emitEvents = true;
            }
            if (!Array.isArray(v) && _this.value != v) {
                emitEvents = true;
            }
            if (emitEvents) {
                emitter.emit(v);
                _this.onChange(v);
            }
            if (Array.isArray(v)) {
                _this.value[handle] = v[handle];
            }
            else {
                _this.value = v;
            }
        };
        this.defaultKeyHandler = function (e) {
            var /** @type {?} */ stepSize = _this.slider.steps();
            var /** @type {?} */ index = parseInt(((e.target)).getAttribute('data-handle'));
            var /** @type {?} */ sign = 1;
            var /** @type {?} */ multiplier = 1;
            var /** @type {?} */ step = 0;
            var /** @type {?} */ delta = 0;
            switch (e.which) {
                case 34:// PageDown
                    multiplier = _this.config.pageSteps;
                case 40: // ArrowDown
                case 37:// ArrowLeft
                    sign = -1;
                    step = stepSize[index][0];
                    e.preventDefault();
                    break;
                case 33:// PageUp
                    multiplier = _this.config.pageSteps;
                case 38: // ArrowUp
                case 39:// ArrowRight
                    step = stepSize[index][1];
                    e.preventDefault();
                    break;
                default:
                    break;
            }
            delta = sign * multiplier * step;
            var /** @type {?} */ newValue;
            if (Array.isArray(_this.value)) {
                newValue = [].concat(_this.value);
                newValue[index] = newValue[index] + delta;
            }
            else {
                newValue = _this.value + delta;
            }
            _this.slider.set(newValue);
        };
    }
    /**
     * @return {?}
     */
    NouisliderComponent.prototype.ngOnInit = function () {
        var _this = this;
        var /** @type {?} */ inputsConfig = JSON.parse(JSON.stringify({
            behaviour: this.behaviour,
            connect: this.connect,
            limit: this.limit,
            start: this.formControl !== undefined ? this.formControl.value : this.ngModel,
            step: this.step,
            pageSteps: this.pageSteps,
            keyboard: this.keyboard,
            onKeydown: this.onKeydown,
            range: this.range || this.config.range || { min: this.min, max: this.max },
            tooltips: this.tooltips,
            snap: this.snap,
            animate: this.animate
        }));
        inputsConfig.tooltips = this.tooltips || this.config.tooltips;
        inputsConfig.format = this.format || this.config.format || new DefaultFormatter();
        this.slider = Object(nouislider__WEBPACK_IMPORTED_MODULE_0__["create"])(this.el.nativeElement.querySelector('div'), Object.assign(this.config, inputsConfig));
        this.handles = [].slice.call(this.el.nativeElement.querySelectorAll('.noUi-handle'));
        if (this.config.keyboard) {
            if (this.config.pageSteps === undefined) {
                this.config.pageSteps = 10;
            }
            var _loop_1 = function (handle) {
                handle.setAttribute('tabindex', 0);
                handle.addEventListener('click', function () {
                    handle.focus();
                });
                if (this_1.config.onKeydown === undefined) {
                    handle.addEventListener('keydown', this_1.defaultKeyHandler);
                }
                else {
                    handle.addEventListener('keydown', this_1.config.onKeydown);
                }
            };
            var this_1 = this;
            for (var _i = 0, _a = this.handles; _i < _a.length; _i++) {
                var handle = _a[_i];
                _loop_1(/** @type {?} */ handle);
            }
        }
        this.slider.on('set', function (values, handle, unencoded) {
            _this.eventHandler(_this.set, values, handle, unencoded);
        });
        this.slider.on('update', function (values, handle, unencoded) {
            _this.update.emit(_this.toValues(values));
        });
        this.slider.on('change', function (values, handle, unencoded) {
            _this.change.emit(_this.toValues(values));
        });
        this.slider.on('slide', function (values, handle, unencoded) {
            _this.eventHandler(_this.slide, values, handle, unencoded);
        });
        this.slider.on('start', function (values, handle, unencoded) {
            _this.start.emit(_this.toValues(values));
        });
        this.slider.on('end', function (values, handle, unencoded) {
            _this.end.emit(_this.toValues(values));
        });
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NouisliderComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (this.slider && (changes.min || changes.max || changes.step || changes.range)) {
            setTimeout(function () {
                _this.slider.updateOptions({
                    range: Object.assign({}, {
                        min: _this.min,
                        max: _this.max
                    }, _this.range || {}),
                    step: _this.step
                });
            });
        }
    };
    /**
     * @param {?} values
     * @return {?}
     */
    NouisliderComponent.prototype.toValues = function (values) {
        var /** @type {?} */ v = values.map(this.config.format.from);
        return (v.length == 1 ? v[0] : v);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NouisliderComponent.prototype.writeValue = function (value) {
        var _this = this;
        if (this.slider) {
            setTimeout(function () {
                _this.slider.set(value);
            });
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NouisliderComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NouisliderComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    NouisliderComponent.prototype.setDisabledState = function (isDisabled) {
        isDisabled
            ? this.renderer.setAttribute(this.el.nativeElement.childNodes[0], 'disabled', 'true')
            : this.renderer.removeAttribute(this.el.nativeElement.childNodes[0], 'disabled');
    };
    return NouisliderComponent;
}());
NouisliderComponent.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                selector: 'nouislider',
                host: {
                    '[class.ng2-nouislider]': 'true'
                },
                template: '<div [attr.disabled]="disabled ? true : undefined"></div>',
                styles: ["\n    :host {\n      display: block;\n      margin-top: 1rem;\n      margin-bottom: 1rem;\n    }\n  "],
                providers: [
                    {
                        provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALUE_ACCESSOR"],
                        useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function () { return NouisliderComponent; }),
                        multi: true
                    }
                ]
            },] },
];
/**
 * @nocollapse
 */
NouisliderComponent.ctorParameters = function () { return [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], },
]; };
NouisliderComponent.propDecorators = {
    'disabled': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
    'behaviour': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
    'connect': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
    'limit': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
    'min': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
    'max': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
    'snap': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
    'animate': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
    'range': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
    'step': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
    'format': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
    'pageSteps': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
    'config': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
    'ngModel': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
    'keyboard': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
    'onKeydown': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
    'formControl': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
    'tooltips': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
    'change': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] },],
    'update': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] },],
    'slide': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] },],
    'set': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] },],
    'start': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] },],
    'end': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] },],
};
var NouisliderModule = (function () {
    function NouisliderModule() {
    }
    return NouisliderModule;
}());
NouisliderModule.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                exports: [NouisliderComponent],
                declarations: [NouisliderComponent],
            },] },
];
/**
 * @nocollapse
 */
NouisliderModule.ctorParameters = function () { return []; };
/**
 * Generated bundle index. Do not edit.
 */

//# sourceMappingURL=ng2-nouislider.es5.js.map


/***/ }),

/***/ "./node_modules/nouislider/distribute/nouislider.js":
/*!**********************************************************!*\
  !*** ./node_modules/nouislider/distribute/nouislider.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! nouislider - 11.1.0 - 2018-04-02 11:18:13 */

(function (factory) {

    if ( true ) {

        // AMD. Register as an anonymous module.
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

    } else {}

}(function( ){

	'use strict';

	var VERSION = '11.1.0';


	function isValidFormatter ( entry ) {
		return typeof entry === 'object' && typeof entry.to === 'function' && typeof entry.from === 'function';
	}

	function removeElement ( el ) {
		el.parentElement.removeChild(el);
	}

	function isSet ( value ) {
		return value !== null && value !== undefined;
	}

	// Bindable version
	function preventDefault ( e ) {
		e.preventDefault();
	}

	// Removes duplicates from an array.
	function unique ( array ) {
		return array.filter(function(a){
			return !this[a] ? this[a] = true : false;
		}, {});
	}

	// Round a value to the closest 'to'.
	function closest ( value, to ) {
		return Math.round(value / to) * to;
	}

	// Current position of an element relative to the document.
	function offset ( elem, orientation ) {

		var rect = elem.getBoundingClientRect();
		var doc = elem.ownerDocument;
		var docElem = doc.documentElement;
		var pageOffset = getPageOffset(doc);

		// getBoundingClientRect contains left scroll in Chrome on Android.
		// I haven't found a feature detection that proves this. Worst case
		// scenario on mis-match: the 'tap' feature on horizontal sliders breaks.
		if ( /webkit.*Chrome.*Mobile/i.test(navigator.userAgent) ) {
			pageOffset.x = 0;
		}

		return orientation ? (rect.top + pageOffset.y - docElem.clientTop) : (rect.left + pageOffset.x - docElem.clientLeft);
	}

	// Checks whether a value is numerical.
	function isNumeric ( a ) {
		return typeof a === 'number' && !isNaN( a ) && isFinite( a );
	}

	// Sets a class and removes it after [duration] ms.
	function addClassFor ( element, className, duration ) {
		if (duration > 0) {
		addClass(element, className);
			setTimeout(function(){
				removeClass(element, className);
			}, duration);
		}
	}

	// Limits a value to 0 - 100
	function limit ( a ) {
		return Math.max(Math.min(a, 100), 0);
	}

	// Wraps a variable as an array, if it isn't one yet.
	// Note that an input array is returned by reference!
	function asArray ( a ) {
		return Array.isArray(a) ? a : [a];
	}

	// Counts decimals
	function countDecimals ( numStr ) {
		numStr = String(numStr);
		var pieces = numStr.split(".");
		return pieces.length > 1 ? pieces[1].length : 0;
	}

	// http://youmightnotneedjquery.com/#add_class
	function addClass ( el, className ) {
		if ( el.classList ) {
			el.classList.add(className);
		} else {
			el.className += ' ' + className;
		}
	}

	// http://youmightnotneedjquery.com/#remove_class
	function removeClass ( el, className ) {
		if ( el.classList ) {
			el.classList.remove(className);
		} else {
			el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
		}
	}

	// https://plainjs.com/javascript/attributes/adding-removing-and-testing-for-classes-9/
	function hasClass ( el, className ) {
		return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
	}

	// https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY#Notes
	function getPageOffset ( doc ) {

		var supportPageOffset = window.pageXOffset !== undefined;
		var isCSS1Compat = ((doc.compatMode || "") === "CSS1Compat");
		var x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? doc.documentElement.scrollLeft : doc.body.scrollLeft;
		var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? doc.documentElement.scrollTop : doc.body.scrollTop;

		return {
			x: x,
			y: y
		};
	}

	// we provide a function to compute constants instead
	// of accessing window.* as soon as the module needs it
	// so that we do not compute anything if not needed
	function getActions ( ) {

		// Determine the events to bind. IE11 implements pointerEvents without
		// a prefix, which breaks compatibility with the IE10 implementation.
		return window.navigator.pointerEnabled ? {
			start: 'pointerdown',
			move: 'pointermove',
			end: 'pointerup'
		} : window.navigator.msPointerEnabled ? {
			start: 'MSPointerDown',
			move: 'MSPointerMove',
			end: 'MSPointerUp'
		} : {
			start: 'mousedown touchstart',
			move: 'mousemove touchmove',
			end: 'mouseup touchend'
		};
	}

	// https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
	// Issue #785
	function getSupportsPassive ( ) {

		var supportsPassive = false;

		try {

			var opts = Object.defineProperty({}, 'passive', {
				get: function() {
					supportsPassive = true;
				}
			});

			window.addEventListener('test', null, opts);

		} catch (e) {}

		return supportsPassive;
	}

	function getSupportsTouchActionNone ( ) {
		return window.CSS && CSS.supports && CSS.supports('touch-action', 'none');
	}


// Value calculation

	// Determine the size of a sub-range in relation to a full range.
	function subRangeRatio ( pa, pb ) {
		return (100 / (pb - pa));
	}

	// (percentage) How many percent is this value of this range?
	function fromPercentage ( range, value ) {
		return (value * 100) / ( range[1] - range[0] );
	}

	// (percentage) Where is this value on this range?
	function toPercentage ( range, value ) {
		return fromPercentage( range, range[0] < 0 ?
			value + Math.abs(range[0]) :
				value - range[0] );
	}

	// (value) How much is this percentage on this range?
	function isPercentage ( range, value ) {
		return ((value * ( range[1] - range[0] )) / 100) + range[0];
	}


// Range conversion

	function getJ ( value, arr ) {

		var j = 1;

		while ( value >= arr[j] ){
			j += 1;
		}

		return j;
	}

	// (percentage) Input a value, find where, on a scale of 0-100, it applies.
	function toStepping ( xVal, xPct, value ) {

		if ( value >= xVal.slice(-1)[0] ){
			return 100;
		}

		var j = getJ( value, xVal );
		var va = xVal[j-1];
		var vb = xVal[j];
		var pa = xPct[j-1];
		var pb = xPct[j];

		return pa + (toPercentage([va, vb], value) / subRangeRatio (pa, pb));
	}

	// (value) Input a percentage, find where it is on the specified range.
	function fromStepping ( xVal, xPct, value ) {

		// There is no range group that fits 100
		if ( value >= 100 ){
			return xVal.slice(-1)[0];
		}

		var j = getJ( value, xPct );
		var va = xVal[j-1];
		var vb = xVal[j];
		var pa = xPct[j-1];
		var pb = xPct[j];

		return isPercentage([va, vb], (value - pa) * subRangeRatio (pa, pb));
	}

	// (percentage) Get the step that applies at a certain value.
	function getStep ( xPct, xSteps, snap, value ) {

		if ( value === 100 ) {
			return value;
		}

		var j = getJ( value, xPct );
		var a = xPct[j-1];
		var b = xPct[j];

		// If 'snap' is set, steps are used as fixed points on the slider.
		if ( snap ) {

			// Find the closest position, a or b.
			if ((value - a) > ((b-a)/2)){
				return b;
			}

			return a;
		}

		if ( !xSteps[j-1] ){
			return value;
		}

		return xPct[j-1] + closest(
			value - xPct[j-1],
			xSteps[j-1]
		);
	}


// Entry parsing

	function handleEntryPoint ( index, value, that ) {

		var percentage;

		// Wrap numerical input in an array.
		if ( typeof value === "number" ) {
			value = [value];
		}

		// Reject any invalid input, by testing whether value is an array.
		if ( !Array.isArray(value) ){
			throw new Error("noUiSlider (" + VERSION + "): 'range' contains invalid value.");
		}

		// Covert min/max syntax to 0 and 100.
		if ( index === 'min' ) {
			percentage = 0;
		} else if ( index === 'max' ) {
			percentage = 100;
		} else {
			percentage = parseFloat( index );
		}

		// Check for correct input.
		if ( !isNumeric( percentage ) || !isNumeric( value[0] ) ) {
			throw new Error("noUiSlider (" + VERSION + "): 'range' value isn't numeric.");
		}

		// Store values.
		that.xPct.push( percentage );
		that.xVal.push( value[0] );

		// NaN will evaluate to false too, but to keep
		// logging clear, set step explicitly. Make sure
		// not to override the 'step' setting with false.
		if ( !percentage ) {
			if ( !isNaN( value[1] ) ) {
				that.xSteps[0] = value[1];
			}
		} else {
			that.xSteps.push( isNaN(value[1]) ? false : value[1] );
		}

		that.xHighestCompleteStep.push(0);
	}

	function handleStepPoint ( i, n, that ) {

		// Ignore 'false' stepping.
		if ( !n ) {
			return true;
		}

		// Factor to range ratio
		that.xSteps[i] = fromPercentage([that.xVal[i], that.xVal[i+1]], n) / subRangeRatio(that.xPct[i], that.xPct[i+1]);

		var totalSteps = (that.xVal[i+1] - that.xVal[i]) / that.xNumSteps[i];
		var highestStep = Math.ceil(Number(totalSteps.toFixed(3)) - 1);
		var step = that.xVal[i] + (that.xNumSteps[i] * highestStep);

		that.xHighestCompleteStep[i] = step;
	}


// Interface

	function Spectrum ( entry, snap, singleStep ) {

		this.xPct = [];
		this.xVal = [];
		this.xSteps = [ singleStep || false ];
		this.xNumSteps = [ false ];
		this.xHighestCompleteStep = [];

		this.snap = snap;

		var index;
		var ordered = []; // [0, 'min'], [1, '50%'], [2, 'max']

		// Map the object keys to an array.
		for ( index in entry ) {
			if ( entry.hasOwnProperty(index) ) {
				ordered.push([entry[index], index]);
			}
		}

		// Sort all entries by value (numeric sort).
		if ( ordered.length && typeof ordered[0][0] === "object" ) {
			ordered.sort(function(a, b) { return a[0][0] - b[0][0]; });
		} else {
			ordered.sort(function(a, b) { return a[0] - b[0]; });
		}


		// Convert all entries to subranges.
		for ( index = 0; index < ordered.length; index++ ) {
			handleEntryPoint(ordered[index][1], ordered[index][0], this);
		}

		// Store the actual step values.
		// xSteps is sorted in the same order as xPct and xVal.
		this.xNumSteps = this.xSteps.slice(0);

		// Convert all numeric steps to the percentage of the subrange they represent.
		for ( index = 0; index < this.xNumSteps.length; index++ ) {
			handleStepPoint(index, this.xNumSteps[index], this);
		}
	}

	Spectrum.prototype.getMargin = function ( value ) {

		var step = this.xNumSteps[0];

		if ( step && ((value / step) % 1) !== 0 ) {
			throw new Error("noUiSlider (" + VERSION + "): 'limit', 'margin' and 'padding' must be divisible by step.");
		}

		return this.xPct.length === 2 ? fromPercentage(this.xVal, value) : false;
	};

	Spectrum.prototype.toStepping = function ( value ) {

		value = toStepping( this.xVal, this.xPct, value );

		return value;
	};

	Spectrum.prototype.fromStepping = function ( value ) {

		return fromStepping( this.xVal, this.xPct, value );
	};

	Spectrum.prototype.getStep = function ( value ) {

		value = getStep(this.xPct, this.xSteps, this.snap, value );

		return value;
	};

	Spectrum.prototype.getNearbySteps = function ( value ) {

		var j = getJ(value, this.xPct);

		return {
			stepBefore: { startValue: this.xVal[j-2], step: this.xNumSteps[j-2], highestStep: this.xHighestCompleteStep[j-2] },
			thisStep: { startValue: this.xVal[j-1], step: this.xNumSteps[j-1], highestStep: this.xHighestCompleteStep[j-1] },
			stepAfter: { startValue: this.xVal[j-0], step: this.xNumSteps[j-0], highestStep: this.xHighestCompleteStep[j-0] }
		};
	};

	Spectrum.prototype.countStepDecimals = function () {
		var stepDecimals = this.xNumSteps.map(countDecimals);
		return Math.max.apply(null, stepDecimals);
	};

	// Outside testing
	Spectrum.prototype.convert = function ( value ) {
		return this.getStep(this.toStepping(value));
	};

/*	Every input option is tested and parsed. This'll prevent
	endless validation in internal methods. These tests are
	structured with an item for every option available. An
	option can be marked as required by setting the 'r' flag.
	The testing function is provided with three arguments:
		- The provided value for the option;
		- A reference to the options object;
		- The name for the option;

	The testing function returns false when an error is detected,
	or true when everything is OK. It can also modify the option
	object, to make sure all values can be correctly looped elsewhere. */

	var defaultFormatter = { 'to': function( value ){
		return value !== undefined && value.toFixed(2);
	}, 'from': Number };

	function validateFormat ( entry ) {

		// Any object with a to and from method is supported.
		if ( isValidFormatter(entry) ) {
			return true;
		}

		throw new Error("noUiSlider (" + VERSION + "): 'format' requires 'to' and 'from' methods.");
	}

	function testStep ( parsed, entry ) {

		if ( !isNumeric( entry ) ) {
			throw new Error("noUiSlider (" + VERSION + "): 'step' is not numeric.");
		}

		// The step option can still be used to set stepping
		// for linear sliders. Overwritten if set in 'range'.
		parsed.singleStep = entry;
	}

	function testRange ( parsed, entry ) {

		// Filter incorrect input.
		if ( typeof entry !== 'object' || Array.isArray(entry) ) {
			throw new Error("noUiSlider (" + VERSION + "): 'range' is not an object.");
		}

		// Catch missing start or end.
		if ( entry.min === undefined || entry.max === undefined ) {
			throw new Error("noUiSlider (" + VERSION + "): Missing 'min' or 'max' in 'range'.");
		}

		// Catch equal start or end.
		if ( entry.min === entry.max ) {
			throw new Error("noUiSlider (" + VERSION + "): 'range' 'min' and 'max' cannot be equal.");
		}

		parsed.spectrum = new Spectrum(entry, parsed.snap, parsed.singleStep);
	}

	function testStart ( parsed, entry ) {

		entry = asArray(entry);

		// Validate input. Values aren't tested, as the public .val method
		// will always provide a valid location.
		if ( !Array.isArray( entry ) || !entry.length ) {
			throw new Error("noUiSlider (" + VERSION + "): 'start' option is incorrect.");
		}

		// Store the number of handles.
		parsed.handles = entry.length;

		// When the slider is initialized, the .val method will
		// be called with the start options.
		parsed.start = entry;
	}

	function testSnap ( parsed, entry ) {

		// Enforce 100% stepping within subranges.
		parsed.snap = entry;

		if ( typeof entry !== 'boolean' ){
			throw new Error("noUiSlider (" + VERSION + "): 'snap' option must be a boolean.");
		}
	}

	function testAnimate ( parsed, entry ) {

		// Enforce 100% stepping within subranges.
		parsed.animate = entry;

		if ( typeof entry !== 'boolean' ){
			throw new Error("noUiSlider (" + VERSION + "): 'animate' option must be a boolean.");
		}
	}

	function testAnimationDuration ( parsed, entry ) {

		parsed.animationDuration = entry;

		if ( typeof entry !== 'number' ){
			throw new Error("noUiSlider (" + VERSION + "): 'animationDuration' option must be a number.");
		}
	}

	function testConnect ( parsed, entry ) {

		var connect = [false];
		var i;

		// Map legacy options
		if ( entry === 'lower' ) {
			entry = [true, false];
		}

		else if ( entry === 'upper' ) {
			entry = [false, true];
		}

		// Handle boolean options
		if ( entry === true || entry === false ) {

			for ( i = 1; i < parsed.handles; i++ ) {
				connect.push(entry);
			}

			connect.push(false);
		}

		// Reject invalid input
		else if ( !Array.isArray( entry ) || !entry.length || entry.length !== parsed.handles + 1 ) {
			throw new Error("noUiSlider (" + VERSION + "): 'connect' option doesn't match handle count.");
		}

		else {
			connect = entry;
		}

		parsed.connect = connect;
	}

	function testOrientation ( parsed, entry ) {

		// Set orientation to an a numerical value for easy
		// array selection.
		switch ( entry ){
			case 'horizontal':
				parsed.ort = 0;
				break;
			case 'vertical':
				parsed.ort = 1;
				break;
			default:
				throw new Error("noUiSlider (" + VERSION + "): 'orientation' option is invalid.");
		}
	}

	function testMargin ( parsed, entry ) {

		if ( !isNumeric(entry) ){
			throw new Error("noUiSlider (" + VERSION + "): 'margin' option must be numeric.");
		}

		// Issue #582
		if ( entry === 0 ) {
			return;
		}

		parsed.margin = parsed.spectrum.getMargin(entry);

		if ( !parsed.margin ) {
			throw new Error("noUiSlider (" + VERSION + "): 'margin' option is only supported on linear sliders.");
		}
	}

	function testLimit ( parsed, entry ) {

		if ( !isNumeric(entry) ){
			throw new Error("noUiSlider (" + VERSION + "): 'limit' option must be numeric.");
		}

		parsed.limit = parsed.spectrum.getMargin(entry);

		if ( !parsed.limit || parsed.handles < 2 ) {
			throw new Error("noUiSlider (" + VERSION + "): 'limit' option is only supported on linear sliders with 2 or more handles.");
		}
	}

	function testPadding ( parsed, entry ) {

		if ( !isNumeric(entry) && !Array.isArray(entry) ){
			throw new Error("noUiSlider (" + VERSION + "): 'padding' option must be numeric or array of exactly 2 numbers.");
		}

		if ( Array.isArray(entry) && !(entry.length === 2 || isNumeric(entry[0]) || isNumeric(entry[1])) ) {
			throw new Error("noUiSlider (" + VERSION + "): 'padding' option must be numeric or array of exactly 2 numbers.");
		}

		if ( entry === 0 ) {
			return;
		}

		if ( !Array.isArray(entry) ) {
			entry = [entry, entry];
		}

		// 'getMargin' returns false for invalid values.
		parsed.padding = [parsed.spectrum.getMargin(entry[0]), parsed.spectrum.getMargin(entry[1])];

		if ( parsed.padding[0] === false || parsed.padding[1] === false ) {
			throw new Error("noUiSlider (" + VERSION + "): 'padding' option is only supported on linear sliders.");
		}

		if ( parsed.padding[0] < 0 || parsed.padding[1] < 0 ) {
			throw new Error("noUiSlider (" + VERSION + "): 'padding' option must be a positive number(s).");
		}

		if ( parsed.padding[0] + parsed.padding[1] >= 100 ) {
			throw new Error("noUiSlider (" + VERSION + "): 'padding' option must not exceed 100% of the range.");
		}
	}

	function testDirection ( parsed, entry ) {

		// Set direction as a numerical value for easy parsing.
		// Invert connection for RTL sliders, so that the proper
		// handles get the connect/background classes.
		switch ( entry ) {
			case 'ltr':
				parsed.dir = 0;
				break;
			case 'rtl':
				parsed.dir = 1;
				break;
			default:
				throw new Error("noUiSlider (" + VERSION + "): 'direction' option was not recognized.");
		}
	}

	function testBehaviour ( parsed, entry ) {

		// Make sure the input is a string.
		if ( typeof entry !== 'string' ) {
			throw new Error("noUiSlider (" + VERSION + "): 'behaviour' must be a string containing options.");
		}

		// Check if the string contains any keywords.
		// None are required.
		var tap = entry.indexOf('tap') >= 0;
		var drag = entry.indexOf('drag') >= 0;
		var fixed = entry.indexOf('fixed') >= 0;
		var snap = entry.indexOf('snap') >= 0;
		var hover = entry.indexOf('hover') >= 0;

		if ( fixed ) {

			if ( parsed.handles !== 2 ) {
				throw new Error("noUiSlider (" + VERSION + "): 'fixed' behaviour must be used with 2 handles");
			}

			// Use margin to enforce fixed state
			testMargin(parsed, parsed.start[1] - parsed.start[0]);
		}

		parsed.events = {
			tap: tap || snap,
			drag: drag,
			fixed: fixed,
			snap: snap,
			hover: hover
		};
	}

	function testTooltips ( parsed, entry ) {

		if ( entry === false ) {
			return;
		}

		else if ( entry === true ) {

			parsed.tooltips = [];

			for ( var i = 0; i < parsed.handles; i++ ) {
				parsed.tooltips.push(true);
			}
		}

		else {

			parsed.tooltips = asArray(entry);

			if ( parsed.tooltips.length !== parsed.handles ) {
				throw new Error("noUiSlider (" + VERSION + "): must pass a formatter for all handles.");
			}

			parsed.tooltips.forEach(function(formatter){
				if ( typeof formatter !== 'boolean' && (typeof formatter !== 'object' || typeof formatter.to !== 'function') ) {
					throw new Error("noUiSlider (" + VERSION + "): 'tooltips' must be passed a formatter or 'false'.");
				}
			});
		}
	}

	function testAriaFormat ( parsed, entry ) {
		parsed.ariaFormat = entry;
		validateFormat(entry);
	}

	function testFormat ( parsed, entry ) {
		parsed.format = entry;
		validateFormat(entry);
	}

	function testCssPrefix ( parsed, entry ) {

		if ( typeof entry !== 'string' && entry !== false ) {
			throw new Error("noUiSlider (" + VERSION + "): 'cssPrefix' must be a string or `false`.");
		}

		parsed.cssPrefix = entry;
	}

	function testCssClasses ( parsed, entry ) {

		if ( typeof entry !== 'object' ) {
			throw new Error("noUiSlider (" + VERSION + "): 'cssClasses' must be an object.");
		}

		if ( typeof parsed.cssPrefix === 'string' ) {
			parsed.cssClasses = {};

			for ( var key in entry ) {
				if ( !entry.hasOwnProperty(key) ) { continue; }

				parsed.cssClasses[key] = parsed.cssPrefix + entry[key];
			}
		} else {
			parsed.cssClasses = entry;
		}
	}

	// Test all developer settings and parse to assumption-safe values.
	function testOptions ( options ) {

		// To prove a fix for #537, freeze options here.
		// If the object is modified, an error will be thrown.
		// Object.freeze(options);

		var parsed = {
			margin: 0,
			limit: 0,
			padding: 0,
			animate: true,
			animationDuration: 300,
			ariaFormat: defaultFormatter,
			format: defaultFormatter
		};

		// Tests are executed in the order they are presented here.
		var tests = {
			'step': { r: false, t: testStep },
			'start': { r: true, t: testStart },
			'connect': { r: true, t: testConnect },
			'direction': { r: true, t: testDirection },
			'snap': { r: false, t: testSnap },
			'animate': { r: false, t: testAnimate },
			'animationDuration': { r: false, t: testAnimationDuration },
			'range': { r: true, t: testRange },
			'orientation': { r: false, t: testOrientation },
			'margin': { r: false, t: testMargin },
			'limit': { r: false, t: testLimit },
			'padding': { r: false, t: testPadding },
			'behaviour': { r: true, t: testBehaviour },
			'ariaFormat': { r: false, t: testAriaFormat },
			'format': { r: false, t: testFormat },
			'tooltips': { r: false, t: testTooltips },
			'cssPrefix': { r: true, t: testCssPrefix },
			'cssClasses': { r: true, t: testCssClasses }
		};

		var defaults = {
			'connect': false,
			'direction': 'ltr',
			'behaviour': 'tap',
			'orientation': 'horizontal',
			'cssPrefix' : 'noUi-',
			'cssClasses': {
				target: 'target',
				base: 'base',
				origin: 'origin',
				handle: 'handle',
				handleLower: 'handle-lower',
				handleUpper: 'handle-upper',
				horizontal: 'horizontal',
				vertical: 'vertical',
				background: 'background',
				connect: 'connect',
				connects: 'connects',
				ltr: 'ltr',
				rtl: 'rtl',
				draggable: 'draggable',
				drag: 'state-drag',
				tap: 'state-tap',
				active: 'active',
				tooltip: 'tooltip',
				pips: 'pips',
				pipsHorizontal: 'pips-horizontal',
				pipsVertical: 'pips-vertical',
				marker: 'marker',
				markerHorizontal: 'marker-horizontal',
				markerVertical: 'marker-vertical',
				markerNormal: 'marker-normal',
				markerLarge: 'marker-large',
				markerSub: 'marker-sub',
				value: 'value',
				valueHorizontal: 'value-horizontal',
				valueVertical: 'value-vertical',
				valueNormal: 'value-normal',
				valueLarge: 'value-large',
				valueSub: 'value-sub'
			}
		};

		// AriaFormat defaults to regular format, if any.
		if ( options.format && !options.ariaFormat ) {
			options.ariaFormat = options.format;
		}

		// Run all options through a testing mechanism to ensure correct
		// input. It should be noted that options might get modified to
		// be handled properly. E.g. wrapping integers in arrays.
		Object.keys(tests).forEach(function( name ){

			// If the option isn't set, but it is required, throw an error.
			if ( !isSet(options[name]) && defaults[name] === undefined ) {

				if ( tests[name].r ) {
					throw new Error("noUiSlider (" + VERSION + "): '" + name + "' is required.");
				}

				return true;
			}

			tests[name].t( parsed, !isSet(options[name]) ? defaults[name] : options[name] );
		});

		// Forward pips options
		parsed.pips = options.pips;

		// All recent browsers accept unprefixed transform.
		// We need -ms- for IE9 and -webkit- for older Android;
		// Assume use of -webkit- if unprefixed and -ms- are not supported.
		// https://caniuse.com/#feat=transforms2d
		var d = document.createElement("div");
		var msPrefix = d.style.msTransform !== undefined;
		var noPrefix = d.style.transform !== undefined;

		parsed.transformRule = noPrefix ? 'transform' : (msPrefix ? 'msTransform' : 'webkitTransform');

		// Pips don't move, so we can place them using left/top.
		var styles = [['left', 'top'], ['right', 'bottom']];

		parsed.style = styles[parsed.dir][parsed.ort];

		return parsed;
	}


function scope ( target, options, originalOptions ){

	var actions = getActions();
	var supportsTouchActionNone = getSupportsTouchActionNone();
	var supportsPassive = supportsTouchActionNone && getSupportsPassive();

	// All variables local to 'scope' are prefixed with 'scope_'
	var scope_Target = target;
	var scope_Locations = [];
	var scope_Base;
	var scope_Handles;
	var scope_HandleNumbers = [];
	var scope_ActiveHandlesCount = 0;
	var scope_Connects;
	var scope_Spectrum = options.spectrum;
	var scope_Values = [];
	var scope_Events = {};
	var scope_Self;
	var scope_Pips;
	var scope_Document = target.ownerDocument;
	var scope_DocumentElement = scope_Document.documentElement;
	var scope_Body = scope_Document.body;


	// For horizontal sliders in standard ltr documents,
	// make .noUi-origin overflow to the left so the document doesn't scroll.
	var scope_DirOffset = (scope_Document.dir === 'rtl') || (options.ort === 1) ? 0 : 100;

/*! In this file: Construction of DOM elements; */

	// Creates a node, adds it to target, returns the new node.
	function addNodeTo ( addTarget, className ) {

		var div = scope_Document.createElement('div');

		if ( className ) {
			addClass(div, className);
		}

		addTarget.appendChild(div);

		return div;
	}

	// Append a origin to the base
	function addOrigin ( base, handleNumber ) {

		var origin = addNodeTo(base, options.cssClasses.origin);
		var handle = addNodeTo(origin, options.cssClasses.handle);

		handle.setAttribute('data-handle', handleNumber);

		// https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
		// 0 = focusable and reachable
		handle.setAttribute('tabindex', '0');
		handle.setAttribute('role', 'slider');
		handle.setAttribute('aria-orientation', options.ort ? 'vertical' : 'horizontal');

		if ( handleNumber === 0 ) {
			addClass(handle, options.cssClasses.handleLower);
		}

		else if ( handleNumber === options.handles - 1 ) {
			addClass(handle, options.cssClasses.handleUpper);
		}

		return origin;
	}

	// Insert nodes for connect elements
	function addConnect ( base, add ) {

		if ( !add ) {
			return false;
		}

		return addNodeTo(base, options.cssClasses.connect);
	}

	// Add handles to the slider base.
	function addElements ( connectOptions, base ) {

		var connectBase = addNodeTo(base, options.cssClasses.connects);

		scope_Handles = [];
		scope_Connects = [];

		scope_Connects.push(addConnect(connectBase, connectOptions[0]));

		// [::::O====O====O====]
		// connectOptions = [0, 1, 1, 1]

		for ( var i = 0; i < options.handles; i++ ) {
			// Keep a list of all added handles.
			scope_Handles.push(addOrigin(base, i));
			scope_HandleNumbers[i] = i;
			scope_Connects.push(addConnect(connectBase, connectOptions[i + 1]));
		}
	}

	// Initialize a single slider.
	function addSlider ( addTarget ) {

		// Apply classes and data to the target.
		addClass(addTarget, options.cssClasses.target);

		if ( options.dir === 0 ) {
			addClass(addTarget, options.cssClasses.ltr);
		} else {
			addClass(addTarget, options.cssClasses.rtl);
		}

		if ( options.ort === 0 ) {
			addClass(addTarget, options.cssClasses.horizontal);
		} else {
			addClass(addTarget, options.cssClasses.vertical);
		}

		scope_Base = addNodeTo(addTarget, options.cssClasses.base);
	}


	function addTooltip ( handle, handleNumber ) {

		if ( !options.tooltips[handleNumber] ) {
			return false;
		}

		return addNodeTo(handle.firstChild, options.cssClasses.tooltip);
	}

	// The tooltips option is a shorthand for using the 'update' event.
	function tooltips ( ) {

		// Tooltips are added with options.tooltips in original order.
		var tips = scope_Handles.map(addTooltip);

		bindEvent('update', function(values, handleNumber, unencoded) {

			if ( !tips[handleNumber] ) {
				return;
			}

			var formattedValue = values[handleNumber];

			if ( options.tooltips[handleNumber] !== true ) {
				formattedValue = options.tooltips[handleNumber].to(unencoded[handleNumber]);
			}

			tips[handleNumber].innerHTML = formattedValue;
		});
	}


	function aria ( ) {

		bindEvent('update', function ( values, handleNumber, unencoded, tap, positions ) {

			// Update Aria Values for all handles, as a change in one changes min and max values for the next.
			scope_HandleNumbers.forEach(function( index ){

				var handle = scope_Handles[index];

				var min = checkHandlePosition(scope_Locations, index, 0, true, true, true);
				var max = checkHandlePosition(scope_Locations, index, 100, true, true, true);

				var now = positions[index];
				var text = options.ariaFormat.to(unencoded[index]);

				handle.children[0].setAttribute('aria-valuemin', min.toFixed(1));
				handle.children[0].setAttribute('aria-valuemax', max.toFixed(1));
				handle.children[0].setAttribute('aria-valuenow', now.toFixed(1));
				handle.children[0].setAttribute('aria-valuetext', text);
			});
		});
	}


	function getGroup ( mode, values, stepped ) {

		// Use the range.
		if ( mode === 'range' || mode === 'steps' ) {
			return scope_Spectrum.xVal;
		}

		if ( mode === 'count' ) {

			if ( values < 2 ) {
				throw new Error("noUiSlider (" + VERSION + "): 'values' (>= 2) required for mode 'count'.");
			}

			// Divide 0 - 100 in 'count' parts.
			var interval = values - 1;
			var spread = ( 100 / interval );

			values = [];

			// List these parts and have them handled as 'positions'.
			while ( interval-- ) {
				values[ interval ] = ( interval * spread );
			}

			values.push(100);

			mode = 'positions';
		}

		if ( mode === 'positions' ) {

			// Map all percentages to on-range values.
			return values.map(function( value ){
				return scope_Spectrum.fromStepping( stepped ? scope_Spectrum.getStep( value ) : value );
			});
		}

		if ( mode === 'values' ) {

			// If the value must be stepped, it needs to be converted to a percentage first.
			if ( stepped ) {

				return values.map(function( value ){

					// Convert to percentage, apply step, return to value.
					return scope_Spectrum.fromStepping( scope_Spectrum.getStep( scope_Spectrum.toStepping( value ) ) );
				});

			}

			// Otherwise, we can simply use the values.
			return values;
		}
	}

	function generateSpread ( density, mode, group ) {

		function safeIncrement(value, increment) {
			// Avoid floating point variance by dropping the smallest decimal places.
			return (value + increment).toFixed(7) / 1;
		}

		var indexes = {};
		var firstInRange = scope_Spectrum.xVal[0];
		var lastInRange = scope_Spectrum.xVal[scope_Spectrum.xVal.length-1];
		var ignoreFirst = false;
		var ignoreLast = false;
		var prevPct = 0;

		// Create a copy of the group, sort it and filter away all duplicates.
		group = unique(group.slice().sort(function(a, b){ return a - b; }));

		// Make sure the range starts with the first element.
		if ( group[0] !== firstInRange ) {
			group.unshift(firstInRange);
			ignoreFirst = true;
		}

		// Likewise for the last one.
		if ( group[group.length - 1] !== lastInRange ) {
			group.push(lastInRange);
			ignoreLast = true;
		}

		group.forEach(function ( current, index ) {

			// Get the current step and the lower + upper positions.
			var step;
			var i;
			var q;
			var low = current;
			var high = group[index+1];
			var newPct;
			var pctDifference;
			var pctPos;
			var type;
			var steps;
			var realSteps;
			var stepsize;

			// When using 'steps' mode, use the provided steps.
			// Otherwise, we'll step on to the next subrange.
			if ( mode === 'steps' ) {
				step = scope_Spectrum.xNumSteps[ index ];
			}

			// Default to a 'full' step.
			if ( !step ) {
				step = high-low;
			}

			// Low can be 0, so test for false. If high is undefined,
			// we are at the last subrange. Index 0 is already handled.
			if ( low === false || high === undefined ) {
				return;
			}

			// Make sure step isn't 0, which would cause an infinite loop (#654)
			step = Math.max(step, 0.0000001);

			// Find all steps in the subrange.
			for ( i = low; i <= high; i = safeIncrement(i, step) ) {

				// Get the percentage value for the current step,
				// calculate the size for the subrange.
				newPct = scope_Spectrum.toStepping( i );
				pctDifference = newPct - prevPct;

				steps = pctDifference / density;
				realSteps = Math.round(steps);

				// This ratio represents the amount of percentage-space a point indicates.
				// For a density 1 the points/percentage = 1. For density 2, that percentage needs to be re-devided.
				// Round the percentage offset to an even number, then divide by two
				// to spread the offset on both sides of the range.
				stepsize = pctDifference/realSteps;

				// Divide all points evenly, adding the correct number to this subrange.
				// Run up to <= so that 100% gets a point, event if ignoreLast is set.
				for ( q = 1; q <= realSteps; q += 1 ) {

					// The ratio between the rounded value and the actual size might be ~1% off.
					// Correct the percentage offset by the number of points
					// per subrange. density = 1 will result in 100 points on the
					// full range, 2 for 50, 4 for 25, etc.
					pctPos = prevPct + ( q * stepsize );
					indexes[pctPos.toFixed(5)] = ['x', 0];
				}

				// Determine the point type.
				type = (group.indexOf(i) > -1) ? 1 : ( mode === 'steps' ? 2 : 0 );

				// Enforce the 'ignoreFirst' option by overwriting the type for 0.
				if ( !index && ignoreFirst ) {
					type = 0;
				}

				if ( !(i === high && ignoreLast)) {
					// Mark the 'type' of this point. 0 = plain, 1 = real value, 2 = step value.
					indexes[newPct.toFixed(5)] = [i, type];
				}

				// Update the percentage count.
				prevPct = newPct;
			}
		});

		return indexes;
	}

	function addMarking ( spread, filterFunc, formatter ) {

		var element = scope_Document.createElement('div');

		var valueSizeClasses = [
			options.cssClasses.valueNormal,
			options.cssClasses.valueLarge,
			options.cssClasses.valueSub
		];
		var markerSizeClasses = [
			options.cssClasses.markerNormal,
			options.cssClasses.markerLarge,
			options.cssClasses.markerSub
		];
		var valueOrientationClasses = [
			options.cssClasses.valueHorizontal,
			options.cssClasses.valueVertical
		];
		var markerOrientationClasses = [
			options.cssClasses.markerHorizontal,
			options.cssClasses.markerVertical
		];

		addClass(element, options.cssClasses.pips);
		addClass(element, options.ort === 0 ? options.cssClasses.pipsHorizontal : options.cssClasses.pipsVertical);

		function getClasses( type, source ){
			var a = source === options.cssClasses.value;
			var orientationClasses = a ? valueOrientationClasses : markerOrientationClasses;
			var sizeClasses = a ? valueSizeClasses : markerSizeClasses;

			return source + ' ' + orientationClasses[options.ort] + ' ' + sizeClasses[type];
		}

		function addSpread ( offset, values ){

			// Apply the filter function, if it is set.
			values[1] = (values[1] && filterFunc) ? filterFunc(values[0], values[1]) : values[1];

			// Add a marker for every point
			var node = addNodeTo(element, false);
				node.className = getClasses(values[1], options.cssClasses.marker);
				node.style[options.style] = offset + '%';

			// Values are only appended for points marked '1' or '2'.
			if ( values[1] ) {
				node = addNodeTo(element, false);
				node.className = getClasses(values[1], options.cssClasses.value);
				node.setAttribute('data-value', values[0]);
				node.style[options.style] = offset + '%';
				node.innerText = formatter.to(values[0]);
			}
		}

		// Append all points.
		Object.keys(spread).forEach(function(a){
			addSpread(a, spread[a]);
		});

		return element;
	}

	function removePips ( ) {
		if ( scope_Pips ) {
			removeElement(scope_Pips);
			scope_Pips = null;
		}
	}

	function pips ( grid ) {

		// Fix #669
		removePips();

		var mode = grid.mode;
		var density = grid.density || 1;
		var filter = grid.filter || false;
		var values = grid.values || false;
		var stepped = grid.stepped || false;
		var group = getGroup( mode, values, stepped );
		var spread = generateSpread( density, mode, group );
		var format = grid.format || {
			to: Math.round
		};

		scope_Pips = scope_Target.appendChild(addMarking(
			spread,
			filter,
			format
		));

		return scope_Pips;
	}

/*! In this file: Browser events (not slider events like slide, change); */

	// Shorthand for base dimensions.
	function baseSize ( ) {
		var rect = scope_Base.getBoundingClientRect();
		var alt = 'offset' + ['Width', 'Height'][options.ort];
		return options.ort === 0 ? (rect.width||scope_Base[alt]) : (rect.height||scope_Base[alt]);
	}

	// Handler for attaching events trough a proxy.
	function attachEvent ( events, element, callback, data ) {

		// This function can be used to 'filter' events to the slider.
		// element is a node, not a nodeList

		var method = function ( e ){

			e = fixEvent(e, data.pageOffset, data.target || element);

			// fixEvent returns false if this event has a different target
			// when handling (multi-) touch events;
			if ( !e ) {
				return false;
			}

			// doNotReject is passed by all end events to make sure released touches
			// are not rejected, leaving the slider "stuck" to the cursor;
			if ( scope_Target.hasAttribute('disabled') && !data.doNotReject ) {
				return false;
			}

			// Stop if an active 'tap' transition is taking place.
			if ( hasClass(scope_Target, options.cssClasses.tap) && !data.doNotReject ) {
				return false;
			}

			// Ignore right or middle clicks on start #454
			if ( events === actions.start && e.buttons !== undefined && e.buttons > 1 ) {
				return false;
			}

			// Ignore right or middle clicks on start #454
			if ( data.hover && e.buttons ) {
				return false;
			}

			// 'supportsPassive' is only true if a browser also supports touch-action: none in CSS.
			// iOS safari does not, so it doesn't get to benefit from passive scrolling. iOS does support
			// touch-action: manipulation, but that allows panning, which breaks
			// sliders after zooming/on non-responsive pages.
			// See: https://bugs.webkit.org/show_bug.cgi?id=133112
			if ( !supportsPassive ) {
				e.preventDefault();
			}

			e.calcPoint = e.points[ options.ort ];

			// Call the event handler with the event [ and additional data ].
			callback ( e, data );
		};

		var methods = [];

		// Bind a closure on the target for every event type.
		events.split(' ').forEach(function( eventName ){
			element.addEventListener(eventName, method, supportsPassive ? { passive: true } : false);
			methods.push([eventName, method]);
		});

		return methods;
	}

	// Provide a clean event with standardized offset values.
	function fixEvent ( e, pageOffset, eventTarget ) {

		// Filter the event to register the type, which can be
		// touch, mouse or pointer. Offset changes need to be
		// made on an event specific basis.
		var touch = e.type.indexOf('touch') === 0;
		var mouse = e.type.indexOf('mouse') === 0;
		var pointer = e.type.indexOf('pointer') === 0;

		var x;
		var y;

		// IE10 implemented pointer events with a prefix;
		if ( e.type.indexOf('MSPointer') === 0 ) {
			pointer = true;
		}

		// In the event that multitouch is activated, the only thing one handle should be concerned
		// about is the touches that originated on top of it.
		if ( touch ) {

			// Returns true if a touch originated on the target.
			var isTouchOnTarget = function (checkTouch) {
				return checkTouch.target === eventTarget || eventTarget.contains(checkTouch.target);
			};

			// In the case of touchstart events, we need to make sure there is still no more than one
			// touch on the target so we look amongst all touches.
			if (e.type === 'touchstart') {

				var targetTouches = Array.prototype.filter.call(e.touches, isTouchOnTarget);

				// Do not support more than one touch per handle.
				if ( targetTouches.length > 1 ) {
					return false;
				}

				x = targetTouches[0].pageX;
				y = targetTouches[0].pageY;

			} else {

				// In the other cases, find on changedTouches is enough.
				var targetTouch = Array.prototype.find.call(e.changedTouches, isTouchOnTarget);

				// Cancel if the target touch has not moved.
				if ( !targetTouch ) {
					return false;
				}

				x = targetTouch.pageX;
				y = targetTouch.pageY;
			}
		}

		pageOffset = pageOffset || getPageOffset(scope_Document);

		if ( mouse || pointer ) {
			x = e.clientX + pageOffset.x;
			y = e.clientY + pageOffset.y;
		}

		e.pageOffset = pageOffset;
		e.points = [x, y];
		e.cursor = mouse || pointer; // Fix #435

		return e;
	}

	// Translate a coordinate in the document to a percentage on the slider
	function calcPointToPercentage ( calcPoint ) {
		var location = calcPoint - offset(scope_Base, options.ort);
		var proposal = ( location * 100 ) / baseSize();

		// Clamp proposal between 0% and 100%
		// Out-of-bound coordinates may occur when .noUi-base pseudo-elements
		// are used (e.g. contained handles feature)
		proposal = limit(proposal);

		return options.dir ? 100 - proposal : proposal;
	}

	// Find handle closest to a certain percentage on the slider
	function getClosestHandle ( proposal ) {

		var closest = 100;
		var handleNumber = false;

		scope_Handles.forEach(function(handle, index){

			// Disabled handles are ignored
			if ( handle.hasAttribute('disabled') ) {
				return;
			}

			var pos = Math.abs(scope_Locations[index] - proposal);

			if ( pos < closest || (pos === 100 && closest === 100) ) {
				handleNumber = index;
				closest = pos;
			}
		});

		return handleNumber;
	}

	// Fire 'end' when a mouse or pen leaves the document.
	function documentLeave ( event, data ) {
		if ( event.type === "mouseout" && event.target.nodeName === "HTML" && event.relatedTarget === null ){
			eventEnd (event, data);
		}
	}

	// Handle movement on document for handle and range drag.
	function eventMove ( event, data ) {

		// Fix #498
		// Check value of .buttons in 'start' to work around a bug in IE10 mobile (data.buttonsProperty).
		// https://connect.microsoft.com/IE/feedback/details/927005/mobile-ie10-windows-phone-buttons-property-of-pointermove-event-always-zero
		// IE9 has .buttons and .which zero on mousemove.
		// Firefox breaks the spec MDN defines.
		if ( navigator.appVersion.indexOf("MSIE 9") === -1 && event.buttons === 0 && data.buttonsProperty !== 0 ) {
			return eventEnd(event, data);
		}

		// Check if we are moving up or down
		var movement = (options.dir ? -1 : 1) * (event.calcPoint - data.startCalcPoint);

		// Convert the movement into a percentage of the slider width/height
		var proposal = (movement * 100) / data.baseSize;

		moveHandles(movement > 0, proposal, data.locations, data.handleNumbers);
	}

	// Unbind move events on document, call callbacks.
	function eventEnd ( event, data ) {

		// The handle is no longer active, so remove the class.
		if ( data.handle ) {
			removeClass(data.handle, options.cssClasses.active);
			scope_ActiveHandlesCount -= 1;
		}

		// Unbind the move and end events, which are added on 'start'.
		data.listeners.forEach(function( c ) {
			scope_DocumentElement.removeEventListener(c[0], c[1]);
		});

		if ( scope_ActiveHandlesCount === 0 ) {
			// Remove dragging class.
			removeClass(scope_Target, options.cssClasses.drag);
			setZindex();

			// Remove cursor styles and text-selection events bound to the body.
			if ( event.cursor ) {
				scope_Body.style.cursor = '';
				scope_Body.removeEventListener('selectstart', preventDefault);
			}
		}

		data.handleNumbers.forEach(function(handleNumber){
			fireEvent('change', handleNumber);
			fireEvent('set', handleNumber);
			fireEvent('end', handleNumber);
		});
	}

	// Bind move events on document.
	function eventStart ( event, data ) {

		var handle;
		if ( data.handleNumbers.length === 1 ) {

			var handleOrigin = scope_Handles[data.handleNumbers[0]];

			// Ignore 'disabled' handles
			if ( handleOrigin.hasAttribute('disabled') ) {
				return false;
			}

			handle = handleOrigin.children[0];
			scope_ActiveHandlesCount += 1;

			// Mark the handle as 'active' so it can be styled.
			addClass(handle, options.cssClasses.active);
		}

		// A drag should never propagate up to the 'tap' event.
		event.stopPropagation();

		// Record the event listeners.
		var listeners = [];

		// Attach the move and end events.
		var moveEvent = attachEvent(actions.move, scope_DocumentElement, eventMove, {
			// The event target has changed so we need to propagate the original one so that we keep
			// relying on it to extract target touches.
			target: event.target,
			handle: handle,
			listeners: listeners,
			startCalcPoint: event.calcPoint,
			baseSize: baseSize(),
			pageOffset: event.pageOffset,
			handleNumbers: data.handleNumbers,
			buttonsProperty: event.buttons,
			locations: scope_Locations.slice()
		});

		var endEvent = attachEvent(actions.end, scope_DocumentElement, eventEnd, {
			target: event.target,
			handle: handle,
			listeners: listeners,
			doNotReject: true,
			handleNumbers: data.handleNumbers
		});

		var outEvent = attachEvent("mouseout", scope_DocumentElement, documentLeave, {
			target: event.target,
			handle: handle,
			listeners: listeners,
			doNotReject: true,
			handleNumbers: data.handleNumbers
		});

		// We want to make sure we pushed the listeners in the listener list rather than creating
		// a new one as it has already been passed to the event handlers.
		listeners.push.apply(listeners, moveEvent.concat(endEvent, outEvent));

		// Text selection isn't an issue on touch devices,
		// so adding cursor styles can be skipped.
		if ( event.cursor ) {

			// Prevent the 'I' cursor and extend the range-drag cursor.
			scope_Body.style.cursor = getComputedStyle(event.target).cursor;

			// Mark the target with a dragging state.
			if ( scope_Handles.length > 1 ) {
				addClass(scope_Target, options.cssClasses.drag);
			}

			// Prevent text selection when dragging the handles.
			// In noUiSlider <= 9.2.0, this was handled by calling preventDefault on mouse/touch start/move,
			// which is scroll blocking. The selectstart event is supported by FireFox starting from version 52,
			// meaning the only holdout is iOS Safari. This doesn't matter: text selection isn't triggered there.
			// The 'cursor' flag is false.
			// See: http://caniuse.com/#search=selectstart
			scope_Body.addEventListener('selectstart', preventDefault, false);
		}

		data.handleNumbers.forEach(function(handleNumber){
			fireEvent('start', handleNumber);
		});
	}

	// Move closest handle to tapped location.
	function eventTap ( event ) {

		// The tap event shouldn't propagate up
		event.stopPropagation();

		var proposal = calcPointToPercentage(event.calcPoint);
		var handleNumber = getClosestHandle(proposal);

		// Tackle the case that all handles are 'disabled'.
		if ( handleNumber === false ) {
			return false;
		}

		// Flag the slider as it is now in a transitional state.
		// Transition takes a configurable amount of ms (default 300). Re-enable the slider after that.
		if ( !options.events.snap ) {
			addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
		}

		setHandle(handleNumber, proposal, true, true);

		setZindex();

		fireEvent('slide', handleNumber, true);
		fireEvent('update', handleNumber, true);
		fireEvent('change', handleNumber, true);
		fireEvent('set', handleNumber, true);

		if ( options.events.snap ) {
			eventStart(event, { handleNumbers: [handleNumber] });
		}
	}

	// Fires a 'hover' event for a hovered mouse/pen position.
	function eventHover ( event ) {

		var proposal = calcPointToPercentage(event.calcPoint);

		var to = scope_Spectrum.getStep(proposal);
		var value = scope_Spectrum.fromStepping(to);

		Object.keys(scope_Events).forEach(function( targetEvent ) {
			if ( 'hover' === targetEvent.split('.')[0] ) {
				scope_Events[targetEvent].forEach(function( callback ) {
					callback.call( scope_Self, value );
				});
			}
		});
	}

	// Attach events to several slider parts.
	function bindSliderEvents ( behaviour ) {

		// Attach the standard drag event to the handles.
		if ( !behaviour.fixed ) {

			scope_Handles.forEach(function( handle, index ){

				// These events are only bound to the visual handle
				// element, not the 'real' origin element.
				attachEvent ( actions.start, handle.children[0], eventStart, {
					handleNumbers: [index]
				});
			});
		}

		// Attach the tap event to the slider base.
		if ( behaviour.tap ) {
			attachEvent (actions.start, scope_Base, eventTap, {});
		}

		// Fire hover events
		if ( behaviour.hover ) {
			attachEvent (actions.move, scope_Base, eventHover, { hover: true });
		}

		// Make the range draggable.
		if ( behaviour.drag ){

			scope_Connects.forEach(function( connect, index ){

				if ( connect === false || index === 0 || index === scope_Connects.length - 1 ) {
					return;
				}

				var handleBefore = scope_Handles[index - 1];
				var handleAfter = scope_Handles[index];
				var eventHolders = [connect];

				addClass(connect, options.cssClasses.draggable);

				// When the range is fixed, the entire range can
				// be dragged by the handles. The handle in the first
				// origin will propagate the start event upward,
				// but it needs to be bound manually on the other.
				if ( behaviour.fixed ) {
					eventHolders.push(handleBefore.children[0]);
					eventHolders.push(handleAfter.children[0]);
				}

				eventHolders.forEach(function( eventHolder ) {
					attachEvent ( actions.start, eventHolder, eventStart, {
						handles: [handleBefore, handleAfter],
						handleNumbers: [index - 1, index]
					});
				});
			});
		}
	}

/*! In this file: Slider events (not browser events); */

	// Attach an event to this slider, possibly including a namespace
	function bindEvent ( namespacedEvent, callback ) {
		scope_Events[namespacedEvent] = scope_Events[namespacedEvent] || [];
		scope_Events[namespacedEvent].push(callback);

		// If the event bound is 'update,' fire it immediately for all handles.
		if ( namespacedEvent.split('.')[0] === 'update' ) {
			scope_Handles.forEach(function(a, index){
				fireEvent('update', index);
			});
		}
	}

	// Undo attachment of event
	function removeEvent ( namespacedEvent ) {

		var event = namespacedEvent && namespacedEvent.split('.')[0];
		var namespace = event && namespacedEvent.substring(event.length);

		Object.keys(scope_Events).forEach(function( bind ){

			var tEvent = bind.split('.')[0];
			var tNamespace = bind.substring(tEvent.length);

			if ( (!event || event === tEvent) && (!namespace || namespace === tNamespace) ) {
				delete scope_Events[bind];
			}
		});
	}

	// External event handling
	function fireEvent ( eventName, handleNumber, tap ) {

		Object.keys(scope_Events).forEach(function( targetEvent ) {

			var eventType = targetEvent.split('.')[0];

			if ( eventName === eventType ) {
				scope_Events[targetEvent].forEach(function( callback ) {

					callback.call(
						// Use the slider public API as the scope ('this')
						scope_Self,
						// Return values as array, so arg_1[arg_2] is always valid.
						scope_Values.map(options.format.to),
						// Handle index, 0 or 1
						handleNumber,
						// Unformatted slider values
						scope_Values.slice(),
						// Event is fired by tap, true or false
						tap || false,
						// Left offset of the handle, in relation to the slider
						scope_Locations.slice()
					);
				});
			}
		});
	}

/*! In this file: Mechanics for slider operation */

	function toPct ( pct ) {
		return pct + '%';
	}

	// Split out the handle positioning logic so the Move event can use it, too
	function checkHandlePosition ( reference, handleNumber, to, lookBackward, lookForward, getValue ) {

		// For sliders with multiple handles, limit movement to the other handle.
		// Apply the margin option by adding it to the handle positions.
		if ( scope_Handles.length > 1 ) {

			if ( lookBackward && handleNumber > 0 ) {
				to = Math.max(to, reference[handleNumber - 1] + options.margin);
			}

			if ( lookForward && handleNumber < scope_Handles.length - 1 ) {
				to = Math.min(to, reference[handleNumber + 1] - options.margin);
			}
		}

		// The limit option has the opposite effect, limiting handles to a
		// maximum distance from another. Limit must be > 0, as otherwise
		// handles would be unmoveable.
		if ( scope_Handles.length > 1 && options.limit ) {

			if ( lookBackward && handleNumber > 0 ) {
				to = Math.min(to, reference[handleNumber - 1] + options.limit);
			}

			if ( lookForward && handleNumber < scope_Handles.length - 1 ) {
				to = Math.max(to, reference[handleNumber + 1] - options.limit);
			}
		}

		// The padding option keeps the handles a certain distance from the
		// edges of the slider. Padding must be > 0.
		if ( options.padding ) {

			if ( handleNumber === 0 ) {
				to = Math.max(to, options.padding[0]);
			}

			if ( handleNumber === scope_Handles.length - 1 ) {
				to = Math.min(to, 100 - options.padding[1]);
			}
		}

		to = scope_Spectrum.getStep(to);

		// Limit percentage to the 0 - 100 range
		to = limit(to);

		// Return false if handle can't move
		if ( to === reference[handleNumber] && !getValue ) {
			return false;
		}

		return to;
	}

	// Uses slider orientation to create CSS rules. a = base value;
	function inRuleOrder ( v, a ) {
		var o = options.ort;
		return (o?a:v) + ', ' + (o?v:a);
	}

	// Moves handle(s) by a percentage
	// (bool, % to move, [% where handle started, ...], [index in scope_Handles, ...])
	function moveHandles ( upward, proposal, locations, handleNumbers ) {

		var proposals = locations.slice();

		var b = [!upward, upward];
		var f = [upward, !upward];

		// Copy handleNumbers so we don't change the dataset
		handleNumbers = handleNumbers.slice();

		// Check to see which handle is 'leading'.
		// If that one can't move the second can't either.
		if ( upward ) {
			handleNumbers.reverse();
		}

		// Step 1: get the maximum percentage that any of the handles can move
		if ( handleNumbers.length > 1 ) {

			handleNumbers.forEach(function(handleNumber, o) {

				var to = checkHandlePosition(proposals, handleNumber, proposals[handleNumber] + proposal, b[o], f[o], false);

				// Stop if one of the handles can't move.
				if ( to === false ) {
					proposal = 0;
				} else {
					proposal = to - proposals[handleNumber];
					proposals[handleNumber] = to;
				}
			});
		}

		// If using one handle, check backward AND forward
		else {
			b = f = [true];
		}

		var state = false;

		// Step 2: Try to set the handles with the found percentage
		handleNumbers.forEach(function(handleNumber, o) {
			state = setHandle(handleNumber, locations[handleNumber] + proposal, b[o], f[o]) || state;
		});

		// Step 3: If a handle moved, fire events
		if ( state ) {
			handleNumbers.forEach(function(handleNumber){
				fireEvent('update', handleNumber);
				fireEvent('slide', handleNumber);
			});
		}
	}

	// Takes a base value and an offset. This offset is used for the connect bar size.
	// In the initial design for this feature, the origin element was 1% wide.
	// Unfortunately, a rounding bug in Chrome makes it impossible to implement this feature
	// in this manner: https://bugs.chromium.org/p/chromium/issues/detail?id=798223
	function transformDirection ( a, b ) {
		return options.dir ? 100 - a - b : a;
	}

	// Updates scope_Locations and scope_Values, updates visual state
	function updateHandlePosition ( handleNumber, to ) {

		// Update locations.
		scope_Locations[handleNumber] = to;

		// Convert the value to the slider stepping/range.
		scope_Values[handleNumber] = scope_Spectrum.fromStepping(to);

		var rule = 'translate(' + inRuleOrder(toPct(transformDirection(to, 0) - scope_DirOffset), '0') + ')';
		scope_Handles[handleNumber].style[options.transformRule] = rule;

		updateConnect(handleNumber);
		updateConnect(handleNumber + 1);
	}

	// Handles before the slider middle are stacked later = higher,
	// Handles after the middle later is lower
	// [[7] [8] .......... | .......... [5] [4]
	function setZindex ( ) {

		scope_HandleNumbers.forEach(function(handleNumber){
			var dir = (scope_Locations[handleNumber] > 50 ? -1 : 1);
			var zIndex = 3 + (scope_Handles.length + (dir * handleNumber));
			scope_Handles[handleNumber].style.zIndex = zIndex;
		});
	}

	// Test suggested values and apply margin, step.
	function setHandle ( handleNumber, to, lookBackward, lookForward ) {

		to = checkHandlePosition(scope_Locations, handleNumber, to, lookBackward, lookForward, false);

		if ( to === false ) {
			return false;
		}

		updateHandlePosition(handleNumber, to);

		return true;
	}

	// Updates style attribute for connect nodes
	function updateConnect ( index ) {

		// Skip connects set to false
		if ( !scope_Connects[index] ) {
			return;
		}

		var l = 0;
		var h = 100;

		if ( index !== 0 ) {
			l = scope_Locations[index - 1];
		}

		if ( index !== scope_Connects.length - 1 ) {
			h = scope_Locations[index];
		}

		// We use two rules:
		// 'translate' to change the left/top offset;
		// 'scale' to change the width of the element;
		// As the element has a width of 100%, a translation of 100% is equal to 100% of the parent (.noUi-base)
		var connectWidth = h - l;
		var translateRule = 'translate(' + inRuleOrder(toPct(transformDirection(l, connectWidth)), '0') + ')';
		var scaleRule = 'scale(' + inRuleOrder(connectWidth / 100, '1') + ')';

		scope_Connects[index].style[options.transformRule] = translateRule + ' ' + scaleRule;
	}

/*! In this file: All methods eventually exposed in slider.noUiSlider... */

	// Parses value passed to .set method. Returns current value if not parse-able.
	function resolveToValue ( to, handleNumber ) {

		// Setting with null indicates an 'ignore'.
		// Inputting 'false' is invalid.
		if ( to === null || to === false || to === undefined ) {
			return scope_Locations[handleNumber];
		}

		// If a formatted number was passed, attempt to decode it.
		if ( typeof to === 'number' ) {
			to = String(to);
		}

		to = options.format.from(to);
		to = scope_Spectrum.toStepping(to);

		// If parsing the number failed, use the current value.
		if ( to === false || isNaN(to) ) {
			return scope_Locations[handleNumber];
		}

		return to;
	}

	// Set the slider value.
	function valueSet ( input, fireSetEvent ) {

		var values = asArray(input);
		var isInit = scope_Locations[0] === undefined;

		// Event fires by default
		fireSetEvent = (fireSetEvent === undefined ? true : !!fireSetEvent);

		// Animation is optional.
		// Make sure the initial values were set before using animated placement.
		if ( options.animate && !isInit ) {
			addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
		}

		// First pass, without lookAhead but with lookBackward. Values are set from left to right.
		scope_HandleNumbers.forEach(function(handleNumber){
			setHandle(handleNumber, resolveToValue(values[handleNumber], handleNumber), true, false);
		});

		// Second pass. Now that all base values are set, apply constraints
		scope_HandleNumbers.forEach(function(handleNumber){
			setHandle(handleNumber, scope_Locations[handleNumber], true, true);
		});

		setZindex();

		scope_HandleNumbers.forEach(function(handleNumber){

			fireEvent('update', handleNumber);

			// Fire the event only for handles that received a new value, as per #579
			if ( values[handleNumber] !== null && fireSetEvent ) {
				fireEvent('set', handleNumber);
			}
		});
	}

	// Reset slider to initial values
	function valueReset ( fireSetEvent ) {
		valueSet(options.start, fireSetEvent);
	}

	// Get the slider value.
	function valueGet ( ) {

		var values = scope_Values.map(options.format.to);

		// If only one handle is used, return a single value.
		if ( values.length === 1 ){
			return values[0];
		}

		return values;
	}

	// Removes classes from the root and empties it.
	function destroy ( ) {

		for ( var key in options.cssClasses ) {
			if ( !options.cssClasses.hasOwnProperty(key) ) { continue; }
			removeClass(scope_Target, options.cssClasses[key]);
		}

		while (scope_Target.firstChild) {
			scope_Target.removeChild(scope_Target.firstChild);
		}

		delete scope_Target.noUiSlider;
	}

	// Get the current step size for the slider.
	function getCurrentStep ( ) {

		// Check all locations, map them to their stepping point.
		// Get the step point, then find it in the input list.
		return scope_Locations.map(function( location, index ){

			var nearbySteps = scope_Spectrum.getNearbySteps( location );
			var value = scope_Values[index];
			var increment = nearbySteps.thisStep.step;
			var decrement = null;

			// If the next value in this step moves into the next step,
			// the increment is the start of the next step - the current value
			if ( increment !== false ) {
				if ( value + increment > nearbySteps.stepAfter.startValue ) {
					increment = nearbySteps.stepAfter.startValue - value;
				}
			}


			// If the value is beyond the starting point
			if ( value > nearbySteps.thisStep.startValue ) {
				decrement = nearbySteps.thisStep.step;
			}

			else if ( nearbySteps.stepBefore.step === false ) {
				decrement = false;
			}

			// If a handle is at the start of a step, it always steps back into the previous step first
			else {
				decrement = value - nearbySteps.stepBefore.highestStep;
			}


			// Now, if at the slider edges, there is not in/decrement
			if ( location === 100 ) {
				increment = null;
			}

			else if ( location === 0 ) {
				decrement = null;
			}

			// As per #391, the comparison for the decrement step can have some rounding issues.
			var stepDecimals = scope_Spectrum.countStepDecimals();

			// Round per #391
			if ( increment !== null && increment !== false ) {
				increment = Number(increment.toFixed(stepDecimals));
			}

			if ( decrement !== null && decrement !== false ) {
				decrement = Number(decrement.toFixed(stepDecimals));
			}

			return [decrement, increment];
		});
	}

	// Updateable: margin, limit, padding, step, range, animate, snap
	function updateOptions ( optionsToUpdate, fireSetEvent ) {

		// Spectrum is created using the range, snap, direction and step options.
		// 'snap' and 'step' can be updated.
		// If 'snap' and 'step' are not passed, they should remain unchanged.
		var v = valueGet();

		var updateAble = ['margin', 'limit', 'padding', 'range', 'animate', 'snap', 'step', 'format'];

		// Only change options that we're actually passed to update.
		updateAble.forEach(function(name){
			if ( optionsToUpdate[name] !== undefined ) {
				originalOptions[name] = optionsToUpdate[name];
			}
		});

		var newOptions = testOptions(originalOptions);

		// Load new options into the slider state
		updateAble.forEach(function(name){
			if ( optionsToUpdate[name] !== undefined ) {
				options[name] = newOptions[name];
			}
		});

		scope_Spectrum = newOptions.spectrum;

		// Limit, margin and padding depend on the spectrum but are stored outside of it. (#677)
		options.margin = newOptions.margin;
		options.limit = newOptions.limit;
		options.padding = newOptions.padding;

		// Update pips, removes existing.
		if ( options.pips ) {
			pips(options.pips);
		}

		// Invalidate the current positioning so valueSet forces an update.
		scope_Locations = [];
		valueSet(optionsToUpdate.start || v, fireSetEvent);
	}

/*! In this file: Calls to functions. All other scope_ files define functions only; */

	// Create the base element, initialize HTML and set classes.
	// Add handles and connect elements.
	addSlider(scope_Target);
	addElements(options.connect, scope_Base);

	// Attach user events.
	bindSliderEvents(options.events);

	// Use the public value method to set the start values.
	valueSet(options.start);

	scope_Self = {
		destroy: destroy,
		steps: getCurrentStep,
		on: bindEvent,
		off: removeEvent,
		get: valueGet,
		set: valueSet,
		reset: valueReset,
		// Exposed for unit testing, don't use this in your application.
		__moveHandles: function(a, b, c) { moveHandles(a, b, scope_Locations, c); },
		options: originalOptions, // Issue #600, #678
		updateOptions: updateOptions,
		target: scope_Target, // Issue #597
		removePips: removePips,
		pips: pips // Issue #594
	};

	if ( options.pips ) {
		pips(options.pips);
	}

	if ( options.tooltips ) {
		tooltips();
	}

	aria();

	return scope_Self;

}


	// Run the standard initializer
	function initialize ( target, originalOptions ) {

		if ( !target || !target.nodeName ) {
			throw new Error("noUiSlider (" + VERSION + "): create requires a single element, got: " + target);
		}

		// Throw an error if the slider was already initialized.
		if ( target.noUiSlider ) {
			throw new Error("noUiSlider (" + VERSION + "): Slider was already initialized.");
		}

		// Test the options and create the slider environment;
		var options = testOptions( originalOptions, target );
		var api = scope( target, options, originalOptions );

		target.noUiSlider = api;

		return api;
	}

	// Use an object instead of a function for future expandability;
	return {
		version: VERSION,
		create: initialize
	};

}));

/***/ }),

/***/ "./src/app/layout/leads/collection-agent/collection-agent.component.css":
/*!******************************************************************************!*\
  !*** ./src/app/layout/leads/collection-agent/collection-agent.component.css ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9sZWFkcy9jb2xsZWN0aW9uLWFnZW50L2NvbGxlY3Rpb24tYWdlbnQuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/layout/leads/collection-agent/collection-agent.component.html":
/*!*******************************************************************************!*\
  !*** ./src/app/layout/leads/collection-agent/collection-agent.component.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container-fluid\">\n  <div class=\"row\">\n      <div class=\"col-md-4\">\n          <div class=\"form-group\">\n              <p class=\"p16\">{{'leads.CSRRenterLeads' | translate}}</p>\n          </div>\n      </div>\n  </div>\n  <div class=\"row\">\n      <div class=\"col-md-4\">\n          <div class=\"form-group\" *ngIf=\"admin?.admin_acl['Seller Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n              <div class=\"d-flex\">\n              <div class=\"autocomplete\">\n                  <input placeholder=\"{{'addForm.placeholder.searchCSRSeller' | translate}}\" style=\"max-width:200px\" list=\"amenities\" [(ngModel)]=\"parameter.keyword\" (input)=\"getCsrListing()\" class=\"form-control\" type=\"text\" name=\"keyword\" (focusout)=\"closeCsrListing()\">\n                  <div id=\"myInputautocomplete-list\" class=\"autocomplete-items\">\n                      <div *ngFor=\"let item of users\" (click)=\"selectCsrUser(item)\">{{item.email}}</div>\n                  </div>\n              </div>\n              </div>\n          </div>\n      </div>\n      <div class=\"col-md-8 col-12\">\n          <div class=\"cust-tabs-2\">\n              <ul class=\"nav nav-tabs\">\n              <li class=\"nav-item\">\n                  <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==1}\" (click)=\"changeFlag(1)\">{{'filters.time.thisWeek' | translate}}</a>\n              </li>\n              <li class=\"nav-item\">\n                  <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==2}\" (click)=\"changeFlag(2)\" >{{'filters.time.thisMonth' | translate}}</a>\n              </li>\n              <li class=\"nav-item\">\n                  <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==3}\" (click)=\"changeFlag(3)\" >{{'filters.time.lastMonth' | translate}}</a>\n              </li>\n              <li class=\"nav-item\">\n                  <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==4}\" (click)=\"changeFlag(4)\" >{{'filters.time.lifetime' | translate}}</a>\n              </li>\n              <li class=\"nav-item\">\n                  <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==5}\" (click)=\"parameter.flag=5\" >{{'filters.time.custom.label' | translate}}</a>\n              </li>\n              </ul>\n          </div>\n      </div>\n  </div>\n\n  <div class=\"row\">\n      <div class=\"col-12\">\n          <div *ngIf=\"parameter.flag == 5\" class=\"row\">\n              <div class=\"offset-lg-7\"></div>\n              <div class=\"col-lg-2 col-md-2 col-sm-5 col-5\">\n              <div class=\"form-group marginB0\">\n                  <label>{{'filters.time.custom.from' | translate}}:</label>\n                  <p-calendar showIcon=\"true\" [locale]=\"locale\" [(ngModel)]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2040\"></p-calendar>\n              </div>\n              </div>\n              <div class=\"col-lg-2 col-md-2 col-sm-5 col-5\">\n              <div class=\"form-group marginB0\">\n                  <label>{{'filters.time.custom.to' | translate}}:</label>\n                  <p-calendar showIcon=\"true\" [locale]=\"locale\" [(ngModel)]=\"parameter.max\" [minDate]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2040\"></p-calendar>\n              </div>\n              </div>\n              <div class=\"col-lg-1 col-md-2 col-sm-2 col-6\">\n              <div class=\"form-group btn-cont\">\n                  <label class=\"addMT3\">&nbsp;</label>\n                  <button class=\"btn btn-calender\" href=\"javascript://\" (click)=\"getListing(); getCSRDashBoardData();\"\n                      [disabled]=\"!parameter.min || !parameter.max\">{{'filters.time.custom.applyBtn' | translate}}</button>\n              </div>\n              </div>\n          </div>\n      </div>\n  </div>\n  <div class=\"listingResults\" >\n      <div class=\"row\" *ngIf=\"admin?.admin_acl['Seller Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n          <div class=\"col-md-2\">\n              <div class=\"form-group\">\n              <label>{{'filters.location.country' | translate}}</label>\n              <select class=\"form-control\" (change)=\"onCountryChange($event.target.value)\">\n                  <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n                  <option *ngFor=\"let item of location.countries\" [value]=\"item.id\">{{item.name}}</option>\n              </select>\n              </div>\n          </div>\n          <div class=\"col-md-2\">\n              <div class=\"form-group\">\n              <label>{{'filters.location.state' | translate}}</label>\n              <select class=\"form-control\" (change)=\"onStateChange($event.target.value)\">\n                  <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n                  <option *ngFor=\"let item of location.states\" [value]=\"item.id\">{{item.name}}</option>\n              </select>\n              </div>\n          </div>\n          <div class=\"col-md-2\">\n              <div class=\"form-group\">\n              <label>{{'filters.location.city' | translate}}</label>\n                  <select class=\"form-control\" (change)=\"onCityChange($event.target.value)\">\n                  <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n                  <option *ngFor=\"let item of location.cities\" [value]=\"item.id\">{{item.name}}</option>\n                  </select>\n              </div>\n          </div>\n  \n          <div class=\"col-md-2\">\n              <div class=\"form-group\">\n              <label>{{'filters.location.locality' | translate}}</label>\n              <select class=\"form-control\" (change)=\"onLocalityChange($event.target.value)\">\n                  <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n                  <option *ngFor=\"let item of location.localities\" [value]=\"item.id\">{{item.name}}</option>\n              </select>\n              </div>\n          </div>\n  \n          <div class=\"col-md-2\">\n              <div class=\"form-group btn-cont\">\n              <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n              <button type=\"button\" (click)=\"getListing(); getCSRDashBoardData();\" class=\"btn btn-primary-new width100P\">{{'filters.location.applyBtn' | translate}}</button>\n              </div>\n          </div>\n  \n          <div class=\"col-md-2\">\n              <div class=\"form-group btn-cont\">\n              <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n              <button type=\"button\" (click)=\"resetFilters()\" class=\"btn btn-primary-new width100P\">{{'filters.location.resetBtn' | translate}}</button>\n              </div>\n          </div>\n      </div>\n      <div *ngIf=\"selectedUser as item\" class=\"sigle-row-table\">\n      <table class=\"table table-striped\">\n      <tbody><tr>\n          <td>\n              <!-- <img class=\"rounded-circle\" [src]=\"item.image| img:'small'\" onerror='this.src=\"assets/img/default_img.png\"' alt=\"img\"> -->\n              <img *ngIf=\"item.image\" class=\"rounded-circle\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\"\n                            [defaultImage]=\"item.image| img:'thumb'\" [lazyLoad]=\"item.image\">\n              <img *ngIf=\"!item.image\" class=\"rounded-circle\" src=\"assets/img/default_img.png\" alt=\"img\">\n          </td>\n          <td class=\"text-left\">\n              <span class=\"name\">{{item.name | titlecase}}</span>\n          </td>\n          <td class=\"text-left\">{{item.phone}}</td>\n          <td class=\"text-left\">{{item.email}}</td>\n          <td>\n              <a (click)=\"removeCsrUser()\" href=\"javascript://\" class=\"icon-block edit-icon\"><img src=\"assets/img/remove-icon.png\" alt=\"remove\" title=\"{{'table.title.remove' | translate}}\" /></a>\n          </td>\n          </tr>\n      </tbody>\n      </table>\n</div>\n<div class=\"row\">\n   <div class=\"col-lg-8 col-md-12 col-sm-12 col-12\">\n      <div class=\"info-box all-leads\">\n         <div class=\"row\">\n            <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == 1}\" (click)=\"changeCountFlag(1)\">\n               <div class=\"one-row \">\n                  <div class=\"o-block\">\n                     <h5>{{'table.th.leads' | translate}}</h5>\n                     <small>{{'table.th.total' | translate}}</small>\n                  </div>\n                  <div class=\"o-block\">\n                     <a class=\"view-all\" href=\"javascript://\">{{'table.th.viewAll' | translate}}</a>\n                     <h4>{{dash?.lead_total || 0}}</h4>\n                  </div>\n               </div>\n            </div>\n            <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == 2}\" (click)=\"changeCountFlag(2)\">\n               <div class=\"one-row\">\n                  <div class=\"o-block\">\n                     <h5>{{'table.th.leads' | translate}}</h5>\n                     <small>{{'table.th.withoutProperty' | translate}}</small>\n                  </div>\n                  <div class=\"o-block\">\n                     <a class=\"view-all\" href=\"javascript://\">{{'table.th.viewAll' | translate}}</a>\n                     <h4>{{dash?.lead_without_property || 0}}</h4>\n                  </div>\n               </div>\n            </div>\n         </div>\n      </div>\n      <div class=\"info-box all-leads\">\n         <div class=\"row\">\n            <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == 3}\" (click)=\"changeCountFlag(3)\">\n               <div class=\"one-row \">\n                  <div class=\"o-block\">\n                     <h5>{{'table.th.leads' | translate}}</h5>\n                     <small>{{'table.th.withProperty' | translate}}</small>\n                  </div>\n                  <div class=\"o-block\">\n                     <a class=\"view-all\" href=\"javascript://\">{{'table.th.viewAll' | translate}}</a>\n                     <h4>{{dash?.lead_with_property || 0}}</h4>\n                  </div>\n               </div>\n            </div>\n            <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == 4}\" (click)=\"changeCountFlag(4)\">\n               <div class=\"one-row\">\n                  <div class=\"o-block\">\n                     <h5>{{'table.th.leads' | translate}}</h5>\n                     <small>{{'table.th.pendingProperties' | translate}}</small>\n                  </div>\n                  <div class=\"o-block\">\n                     <a class=\"view-all\" href=\"javascript://\">{{'table.th.viewAll' | translate}}</a>\n                     <h4>{{dash?.lead_property_pending || 0}}</h4>\n                  </div>\n               </div>\n            </div>\n         </div>\n      </div>\n\n   </div>\n   <div class=\"col-lg-4 col-md-12 col-sm-12 col-12\">\n      <div class=\"chat-msg all-leads\" style=\"padding:0px\">\n          <div class=\"padding20\" *ngIf=\"dash.lead_total == 0\">{{'message.error.noRecordFound' | translate}}</div>\n          <ngx-charts-pie-chart [results]=\"chartView\"></ngx-charts-pie-chart>\n      </div>\n   </div>\n</div>\n<div class=\"row\">\n   <div class=\"col-12\">\n      <div class=\"spacer40\"></div>\n   </div>\n\n</div>\n<div class=\"row\">\n   <div class=\"col-lg-6 col-md-6 col-6\">\n      <div class=\"title-group\">\n         <h5>{{'table.th.leads' | translate}} \n          <span *ngIf=\"parameter.count_flag == 1\">({{'table.th.total' | translate}})</span>\n          <span *ngIf=\"parameter.count_flag == 2\">({{'table.th.withoutProperty' | translate}})</span>\n          <span *ngIf=\"parameter.count_flag == 3\">({{'table.th.withProperty' | translate}})</span>\n          <span *ngIf=\"parameter.count_flag == 4\">({{'table.th.pendingProperties' | translate}})</span>\n         </h5>\n      </div>\n   </div>\n   <div class=\"col-lg-6 col-md-6 col-5\" *ngIf=\"admin?.admin_acl['Seller Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n      <div class=\"add-new text-right\">\n          <a class=\"btn\" (click)=\"bulkAssign()\" href=\"javascript://\">{{'table.th.bulkReassign' | translate}}</a>\n      </div>\n  </div>\n</div>\n<div class=\"white-bg\">\n   <div class=\"tabel-section\">\n      <div class=\"table-responsive\">\n         <table class=\"table table-striped border-0\">\n            <tbody>\n            <tr>\n              <th *ngIf=\"admin?.admin_acl['Seller Lead Management']?.can_read==1 && !this.parameter.assignee_id\" style=\"width:5%;\">\n                  <div class=\"table-search\">\n                      <label>{{'table.th.all' | translate}}</label>\n                      <div>\n                          <label class=\"cust-check-bx marginT0\">\n                              <input class=\"width1\" type=\"checkbox\" (click)=\"selectAll(parameter.is_selected)\" name=\"document\">\n                              <span class=\"checkmark\"></span>\n                          </label>\n                      </div>\n                  </div>\n              </th>\n              <th style=\"width:5%;\">\n                  <div class=\"table-search\">\n                          <label>{{'table.th.image' | translate}}</label>\n                  </div>\n              </th>\n              <th style=\"width:15%;\">\n                  <div class=\"table-search\">\n                          <label>{{'table.th.name' | translate}}</label>\n                     <div class=\"searh-3\">\n                      <input autocomplete=\"off\" type=\"text\" name=\"name\" [(ngModel)]=\"parameter.name\" (keyup.enter)=\"getListing()\">\n                      <button *ngIf=\"parameter.name\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                    </div>\n                  </div>\n              </th>\n              <th style=\"width:15%;\">\n                  <div class=\"table-search\">\n                          <label>{{'table.th.contactNumber' | translate}}</label>\n                     <div class=\"searh-3\">\n                          <input autocomplete=\"off\" type=\"text\" name=\"phone\" [(ngModel)]=\"parameter.phone\" (keyup.enter)=\"getListing()\">\n                          <button *ngIf=\"parameter.phone\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                      </div>\n                  </div>\n              </th>\n              <th style=\"width:20%;\">\n                  <div class=\"table-search\">\n                          <label>{{'table.th.emailAddress' | translate}}</label>\n                     <div class=\"searh-3\">\n                          <input autocomplete=\"off\" type=\"text\" name=\"email\" [(ngModel)]=\"parameter.email\" (keyup.enter)=\"getListing()\">\n                          <button *ngIf=\"parameter.email\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                     </div>\n                  </div>\n               </th>\n               <th style=\"width:10%;\">\n                  <div class=\"table-search\">\n                          <label>{{'table.th.assignee' | translate}}</label>\n                  </div>\n               </th>\n               <th style=\"width:5%;\">\n                  <div class=\"table-search\">\n                          <label>{{'table.th.chatWithSeller' | translate}}</label>\n                  </div>\n               </th>\n               <th style=\"width:5%;\">\n                  <div class=\"table-search\">\n                          <label>{{'table.th.chatWithAgent' | translate}}</label>\n                  </div>\n               </th>\n               <th style=\"width:5%;\">\n                  <div class=\"table-search\">\n                          <label>{{'table.th.properties' | translate}}</label>\n                  </div>\n                  <div class=\"ppties\">\n                      <a href=\"javascript://\" (click)=\"sort_by(3)\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"{{'table.title.Attracted' | translate}}\" data-original-title=\"Attracted\">A<img [ngClass]=\"{'upsidedown':parameter.sort_by_flag==3 && parameter.sort_by_order==0}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n                  </div>\n               </th>\n               <th style=\"width:5%;\">\n                 <label>&nbsp;</label>\n                <div class=\"ppties\">\n                   <a href=\"javascript://\" (click)=\"sort_by(4)\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"{{'table.title.Contacted' | translate}}\" data-original-title=\"Contacted\">C<img [ngClass]=\"{'upsidedown':parameter.sort_by_flag==4 && parameter.sort_by_order==0}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n                   </div>\n               </th>\n               <th style=\"width:5%;\">\n                <label>&nbsp;</label>\n                <div class=\"ppties\">\n                   <a href=\"javascript://\" (click)=\"sort_by(2)\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"{{'table.title.Scheduled' | translate}}\" data-original-title=\"Scheduled\">S<img [ngClass]=\"{'upsidedown':parameter.sort_by_flag==2 && parameter.sort_by_order==0}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n                   </div>\n               </th>\n               <th style=\"width:5%;\">\n                <label>&nbsp;</label>\n                <div class=\"ppties\">\n                   <a href=\"javascript://\" (click)=\"sort_by(1)\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"{{'table.title.Negotiating' | translate}}\" data-original-title=\"Negotiating\">N<img [ngClass]=\"{'upsidedown':parameter.sort_by_flag==1 && parameter.sort_by_order==0}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n                   </div>\n               </th>\n               <th style=\"width:5%;\">\n                <label>&nbsp;</label>\n                <div class=\"ppties\">\n                   <a href=\"javascript://\" (click)=\"sort_by(5)\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"{{'table.title.Layaway' | translate}}\" data-original-title=\"Layaway\">L<img [ngClass]=\"{'upsidedown':parameter.sort_by_flag==5 && parameter.sort_by_order==0}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n                   </div>\n               </th>\n               <th style=\"width:5%;\">\n                <label>&nbsp;</label>\n                <div class=\"ppties\">\n                   <a href=\"javascript://\" (click)=\"sort_by(1)\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"{{'table.title.Deal Done' | translate}}\" data-original-title=\"Deal Done\">D<img [ngClass]=\"{'upsidedown':parameter.sort_by_flag==1 && parameter.sort_by_order==0}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n                   </div>\n               </th>\n               <th style=\"width:5%;\">\n                <label>&nbsp;</label>\n                <div class=\"ppties\">\n                   <a href=\"javascript://\" (click)=\"sort_by(5)\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"{{'table.title.Lead Lost' | translate}}\" data-original-title=\"Lead Lost\">L<img [ngClass]=\"{'upsidedown':parameter.sort_by_flag==5 && parameter.sort_by_order==0}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n                   </div>\n               </th>\n            </tr>\n            <tr class=\"cursor-pointer\" title=\"{{'table.title.clickToViewDetails' | translate}}\" *ngFor=\"let item of items| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: parameter.total }\"\n            >\n              <td *ngIf=\"admin?.admin_acl['Seller Lead Management']?.can_read==1 && !this.parameter.assignee_id\" (click)=\"$event.stopPropagation()\">\n                  <label class=\"cust-check-bx marginT0\">\n                  <input type=\"checkbox\" [(ngModel)]=\"item.selected\" name=\"document\">\n                  <span class=\"checkmark\"></span>\n                  </label>\n                  <!-- <i class=\"fa\" [ngClass]=\"item.selected?'fa-check-square-o':'fa-square-o'\" (click)=\"item.selected = !item.selected\" aria-hidden=\"true\"></i> -->\n              </td>\n              <td routerLink=\"/dashboard/leads/csr-sellers/{{item.id}}\">\n                  <img class=\"rounded-circle\" *ngIf=\"item.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\"\n                            [defaultImage]=\"item.image| img:'thumb'\" [lazyLoad]=\"item.image\">\n                  <img class=\"rounded-circle\" *ngIf=\"!item.image\" src=\"assets/img/default_img.png\" alt=\"img\">\n              </td>\n              <td class=\"text-left\" routerLink=\"/dashboard/leads/csr-sellers/{{item.id}}\">\n                <span class=\"name\">{{item.name | titlecase}}</span>\n               </td>\n               <td routerLink=\"/dashboard/leads/csr-sellers/{{item.id}}\" class=\"text-left\" *ngIf=\"item.phone\">{{item.dial_code}}-{{item.phone.trim()}}</td>\n               <td routerLink=\"/dashboard/leads/csr-sellers/{{item.id}}\" class=\"text-left\" *ngIf=\"!item.phone\">{{'table.tr.td.NA' | translate}}</td>\n              <td routerLink=\"/dashboard/leads/csr-sellers/{{item.id}}\" class=\"text-left\">\n                  {{item.email}}\n              </td>\n               <td routerLink=\"/dashboard/leads/csr-sellers/{{item.id}}\" class=\"text-left\">{{item.csr_seller_name?item.csr_seller_name:('table.tr.td.NA' | translate)}}</td>\n               <td class=\"text-left\" (click)=\"getCSRSellerChat($event, 1, item.assigned_csr_seller_id, item.id)\">\n                   <a class=\"green-color fontW500\" href=\"javascript://\">{{'table.th.chatWithSeller' | translate}}</a>\n               </td>\n               <td class=\"text-left\" (click)=\"getCSRSellerChat($event, 2, item.assigned_csr_seller_id, item.id)\">\n                  <a class=\"green-color fontW500\" href=\"javascript://\">{{'table.th.chatWithAgent' | translate}}</a>\n              </td>\n               <td routerLink=\"/dashboard/leads/csr-sellers/{{item.id}}\">\n                {{item.approved_count}}\n               </td>\n               <td routerLink=\"/dashboard/leads/csr-sellers/{{item.id}}\">\n                {{item.rejected_count}}\n               </td>\n               <td routerLink=\"/dashboard/leads/csr-sellers/{{item.id}}\">\n                  {{item.pending_count}}\n               </td>\n               <td routerLink=\"/dashboard/leads/csr-sellers/{{item.id}}\">\n                  {{item.draft_count}}\n               </td>\n               <td routerLink=\"/dashboard/leads/csr-sellers/{{item.id}}\">\n                  {{item.total_count}}\n               </td>\n            </tr>\n         </tbody></table>\n         <div class=\"padding20 center\" *ngIf=\"parameter.noResultFound\">\n              <img src=\"assets/img/404-error.png\">\n          </div>\n      </div>\n   </div>\n\n</div>\n</div>\n\n  <div class=\"btn-cont marginT15\" *ngIf=\"parameter.total\">\n      <div class=\"row\">\n          <div class=\"col-6\">\n              <div class=\"title-group\">\n                      <p>{{'table.pagination.showing' | translate}} {{items?.length}} {{'table.pagination.outof' | translate}} {{parameter.total}}</p>\n              </div>\n          </div>\n          <div class=\"col-6 text-right\">\n              <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n          </div>\n      </div>\n  </div>\n</div>\n\n\n\n<!-- Assignment model -->\n<a data-toggle=\"modal\" data-target=\"#assign-model\" #openAssignModel></a>\n<div class=\"modal\" id=\"assign-model\">\n  <div class=\"modal-dialog \">\n      <div class=\"modal-content notary-avail\">\n          <div class=\"modal-header popup-header\">\n                  <h4 class=\"modal-title\">{{'leads.reAssignTo' | translate}}</h4>\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #closeAssignModel>&times;</button>\n          </div>\n          <div class=\"modal-body\">\n              <div class=\"row\">\n                  <div class=\"col-md-8 col-6\">\n                      <input style=\"max-width:200px\" list=\"amenities\" [(ngModel)]=\"assign.keyword\" (keyup.enter)=\"getAssignListing()\" class=\"form-control\" type=\"text\" name=\"keyword\" placeholder=\"{{'addForm.placeholder.search' | translate}}\">\n                  </div>\n                  <div class=\"col-md-4 col-5 btn-cont\">\n                      <a class=\"btn btn-primary pull-right\" href=\"javascript://\" (click)=\"assignNow()\">{{'leads.assign' | translate}}</a>\n                  </div>\n              </div>\n              <div class=\"spacer40\"></div>\n              <div class=\"modal-table-data\" malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\">\n                  <table class=\"table\">\n                      <tr *ngFor=\"let item of assign.items\">\n                          <td *ngIf=\"item.is_blocked!=1\">\n                              <div class=\"n-avail-profile\">\n                              <!-- <img [src]=\"item.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\"> -->\n                              <img *ngIf=\"item.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\"\n                                  [defaultImage]=\"item.image| img:'thumb'\" [lazyLoad]=\"item.image\">\n                              <img *ngIf=\"!item.image\" src=\"assets/img/default_img.png\" alt=\"img\">\n                              <div class=\"n-avail-info\">\n                                  <p class=\"p12\">{{item.name | titlecase}}</p>\n                                  <p class=\"p10\">{{'leads.phone' | translate}} : {{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}</p>\n                              </div>\n                              </div>\n                          </td>\n                          <td *ngIf=\"item.is_blocked!=1\">\n                              <label class=\"cust-check-bx float-right\">\n                                  <input type=\"radio\" name=\"notary_id\" (click)=\"assignItem = item\">\n                                  <span class=\"checkmark\"></span>\n                              </label>\n                          </td>\n                      </tr>\n                      <tr *ngIf=\"assign?.items?.length==0\">\n                          <p class=\"show-not-found\">{{'leads.noCSRSeller' | translate}}</p>\n                      </tr>\n                  </table>\n              </div>\n          </div>\n      </div>\n  </div>\n</div>\n  "

/***/ }),

/***/ "./src/app/layout/leads/collection-agent/collection-agent.component.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/layout/leads/collection-agent/collection-agent.component.ts ***!
  \*****************************************************************************/
/*! exports provided: CollectionAgentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CollectionAgentComponent", function() { return CollectionAgentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var src_app_services_leads_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/leads.service */ "./src/app/services/leads.service.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var CollectionAgentComponent = /** @class */ (function () {
    function CollectionAgentComponent(admin, leadsService, constant, route, router, spinner, translate) {
        this.admin = admin;
        this.leadsService = leadsService;
        this.constant = constant;
        this.route = route;
        this.router = router;
        this.spinner = spinner;
        this.translate = translate;
        this.scrollbarOptions = { axis: 'y', theme: 'dark' };
        this.parameter = {};
        this.location = {};
        this.assign = {};
        this.items = [];
        this.today = new Date();
        this.users = [];
        this.initSelection = false;
        this.dash = {
            lead_total: 0,
            lead_property_pending: 0,
            lead_with_property: 0,
            lead_without_property: 0
        };
        this.chartView = [];
    }
    CollectionAgentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.locale = {
            firstDayOfWeek: 0,
            dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
            dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
            dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
            monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
            monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun',
                'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
            today: 'Hoy',
            clear: 'Clara',
            dateFormat: 'mm/dd/yy',
            weekHeader: 'Wk'
        };
        this.parameter.is_selected = false;
        this.parameter.keyword = '';
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        this.parameter.flag = this.leadsService.sellerLeadsFlag ? this.leadsService.sellerLeadsFlag : this.constant.flag;
        this.parameter.total = 0;
        this.parameter.count_flag = this.leadsService.sellerLeadsCountFlag ? this.leadsService.sellerLeadsCountFlag : this.constant.count_flag;
        this.route.params.subscribe(function (params) {
            _this.parameter.assignee_id = params.id;
        });
        this.getCountries();
        this.getListing();
        this.getCSRDashBoardData();
        Object.assign(this, this.chartView);
    };
    CollectionAgentComponent.prototype.getCountries = function () {
        var _this = this;
        this.admin.postDataApi('getCountryLocality', {}).subscribe(function (r) {
            _this.location.countries = r['data'];
        });
    };
    CollectionAgentComponent.prototype.onCountryChange = function (id) {
        this.parameter.country_id = id;
        this.location.states = [];
        this.parameter.state_id = '0';
        this.location.cities = [];
        this.parameter.city_id = '0';
        this.location.localities = [];
        this.parameter.locality_id = '0';
        if (!id || id === '0') {
            return false;
        }
        this.parameter.country_id = id;
        var selectedCountry = this.location.countries.filter(function (x) { return x.id.toString() === id; });
        this.location.states = selectedCountry[0].states;
    };
    CollectionAgentComponent.prototype.onStateChange = function (id) {
        this.location.cities = [];
        this.parameter.city_id = '0';
        this.location.localities = [];
        this.parameter.locality_id = '0';
        if (!id || id === '0') {
            return false;
        }
        this.parameter.state_id = id;
        var selectedState = this.location.states.filter(function (x) { return x.id.toString() === id; });
        this.location.cities = selectedState[0].cities;
    };
    CollectionAgentComponent.prototype.onCityChange = function (id) {
        this.location.localities = [];
        this.parameter.locality_id = '0';
        if (!id || id === '0') {
            return false;
        }
        this.parameter.city_id = id;
        var selectedCountry = this.location.cities.filter(function (x) { return x.id.toString() === id; });
        this.location.localities = selectedCountry[0].localities;
    };
    CollectionAgentComponent.prototype.onLocalityChange = function (id) {
        if (!id || id === '0') {
            return false;
        }
        this.parameter.locality_id = id;
        // this.getCsrListing();
    };
    CollectionAgentComponent.prototype.changeFlag = function (flag) {
        this.parameter.flag = flag;
        this.leadsService.sellerLeadsFlag = flag;
        this.parameter.count_flag = 1;
        this.resetDates();
        this.getListing();
        this.getCSRDashBoardData();
    };
    CollectionAgentComponent.prototype.changeFilter = function (key, value) {
        this.parameter[key] = value;
        this.getListing();
    };
    CollectionAgentComponent.prototype.changeCountFlag = function (flag) {
        this.parameter.count_flag = flag;
        this.leadsService.sellerLeadsCountFlag = flag;
        this.getListing();
    };
    CollectionAgentComponent.prototype.getCsrListing = function () {
        var _this = this;
        this.initSelection = true;
        this.users = [];
        var input = new FormData();
        if (this.parameter.keyword) {
            input.append('keyword', this.parameter.keyword);
        }
        this.admin.postDataApi('getCsrSellers', input).subscribe(function (success) {
            _this.users = success.data;
        });
    };
    CollectionAgentComponent.prototype.resetFilters = function () {
        this.location.countries = JSON.parse(JSON.stringify(this.location.countries));
        this.onCountryChange('0');
        this.parameter.is_selected = false;
        this.parameter.page = this.constant.p;
        this.parameter.flag = 2;
        this.parameter.total = 0;
        // this.selectedUser = '';
        this.parameter.keyword = '';
        this.parameter.count_flag = 1;
        this.resetDates();
        this.getListing();
        this.getCSRDashBoardData();
    };
    CollectionAgentComponent.prototype.resetDates = function () {
        this.parameter.min = '';
        this.parameter.max = '';
    };
    CollectionAgentComponent.prototype.closeCsrListing = function () {
        var _this = this;
        setTimeout(function () {
            _this.users = [];
        }, 200);
    };
    CollectionAgentComponent.prototype.selectCsrUser = function (user) {
        this.selectedUser = user;
        this.users = [];
        this.parameter.keyword = '';
        this.initSelection = false;
        this.getListing();
        this.getCSRDashBoardData();
    };
    CollectionAgentComponent.prototype.removeCsrUser = function () {
        this.selectedUser = '';
        this.parameter.keyword = '';
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        // this.parameter.flag = 2;
        this.parameter.total = 0;
        this.parameter.count_flag = 1;
        this.getListing();
        this.getCSRDashBoardData();
    };
    CollectionAgentComponent.prototype.getCSRDashBoardData = function () {
        var _this = this;
        // const input = new FormData();
        // if (this.selectedUser) {
        //   input.append('assignee_id', this.selectedUser.id);
        // } else if (this.parameter.assignee_id) {
        //   input.append('assignee_id', this.parameter.assignee_id);
        // }
        // if (this.parameter.flag) {
        //   input.append('flag', this.parameter.flag.toString());
        // }
        var input = JSON.parse(JSON.stringify(this.parameter));
        if (this.parameter.min) {
            input.min = moment__WEBPACK_IMPORTED_MODULE_2__(this.parameter.min).format('YYYY-MM-DD');
        }
        else {
            delete input.min;
        }
        if (this.parameter.max) {
            input.max = moment__WEBPACK_IMPORTED_MODULE_2__(this.parameter.max).format('YYYY-MM-DD');
        }
        else {
            delete input.max;
        }
        if (this.selectedUser) {
            input.assignee_id = this.selectedUser.id;
        }
        else if (this.parameter.assignee_id) {
            input.assignee_id = this.parameter.assignee_id;
        }
        this.admin.postDataApi('leads/csr-seller-dash-count', input).subscribe(function (r) {
            _this.dash = []; // r.data;
            _this.chartView = [
                {
                    'name': _this.translate.instant('leads.propertyPending'),
                    'value': 0 // parseInt(this.dash.lead_property_pending, 10)
                },
                {
                    'name': _this.translate.instant('leads.leadWithProperty'),
                    'value': 0 // parseInt(this.dash.lead_with_property, 10)
                },
                {
                    'name': _this.translate.instant('leads.leadWithoutProperty'),
                    'value': 0 //parseInt(this.dash.lead_without_property, 10)
                }
            ];
        });
    };
    CollectionAgentComponent.prototype.getListing = function () {
        var _this = this;
        this.items = [];
        this.parameter.noResultFound = false;
        var input = JSON.parse(JSON.stringify(this.parameter));
        if (this.parameter.min) {
            input.min = moment__WEBPACK_IMPORTED_MODULE_2__(this.parameter.min).format('YYYY-MM-DD');
        }
        else {
            delete input.min;
        }
        if (this.parameter.max) {
            input.max = moment__WEBPACK_IMPORTED_MODULE_2__(this.parameter.max).format('YYYY-MM-DD');
        }
        else {
            delete input.max;
        }
        if (this.selectedUser) {
            input.assignee_id = this.selectedUser.id;
        }
        else if (this.parameter.assignee_id) {
            input.assignee_id = this.parameter.assignee_id;
        }
        this.spinner.show();
        this.admin.postDataApi('leads/csr-seller', input).subscribe(function (success) {
            _this.spinner.hide();
            _this.items = []; // success.data;
            if (_this.items.length <= 0) {
                _this.parameter.noResultFound = true;
            }
            _this.parameter.total = 0; //success.total_count;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    CollectionAgentComponent.prototype.getPage = function (page) {
        this.parameter.page = page;
        this.getListing();
    };
    CollectionAgentComponent.prototype.sort_by = function (sort_by_flag) {
        if (this.parameter.sort_by_flag !== sort_by_flag) {
            this.parameter.sort_by_flag = sort_by_flag;
            this.parameter.sort_by_order = 0;
        }
        else {
            this.parameter.sort_by_order = this.parameter.sort_by_order ? 0 : 1;
        }
        this.getListing();
    };
    CollectionAgentComponent.prototype.selectAll = function (is_selected) {
        var _this = this;
        this.parameter.is_selected = !is_selected;
        this.items.forEach(function (item) {
            item.selected = _this.parameter.is_selected;
        });
    };
    CollectionAgentComponent.prototype.bulkAssign = function () {
        var leads_ids = this.items.filter(function (x) { return x.selected; }).map(function (y) { return y.id; });
        if (leads_ids.length === 0) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseAtleast1Lead'), 'error');
            return false;
        }
        if (!this.assign.items) {
            this.getAssignListing();
        }
        this.openAssignModel.nativeElement.click();
    };
    CollectionAgentComponent.prototype.getAssignListing = function () {
        var _this = this;
        var input = {
            keyword: this.assign.keyword
        };
        this.spinner.show();
        this.admin.postDataApi('getCsrSellers', input).subscribe(function (success) {
            _this.spinner.hide();
            _this.assign.items = []; // success.data;
        });
    };
    CollectionAgentComponent.prototype.assignNow = function () {
        var _this = this;
        var leads_ids = this.items.filter(function (x) { return x.selected; }).map(function (y) { return y.id; });
        var input = {
            csr_seller_id: this.assignItem.id,
            leads: leads_ids
        };
        this.spinner.show();
        this.admin.postDataApi('leads/bulkAssignSeller', input).subscribe(function (r) {
            _this.spinner.hide();
            swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.assignedSuccessfully'), 'success');
            _this.closeAssignModel.nativeElement.click();
            _this.getListing();
        }, function (error) {
            _this.spinner.hide();
            _this.closeAssignModel.nativeElement.click();
            swal(_this.translate.instant('swal.error'), error.error.message, 'error');
        });
    };
    CollectionAgentComponent.prototype.getCSRSellerChat = function ($event, chat_with, csr_seller_id, lead_id) {
        // chat_with = 1 means chat with seller, 2 means chat with agent
        if (csr_seller_id) {
            this.router.navigate(['/dashboard/leads/chat-with-seller', chat_with, csr_seller_id, lead_id]);
        }
        else {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.noCSRSellerAssigned'), 'error');
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('openAssignModel'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CollectionAgentComponent.prototype, "openAssignModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('closeAssignModel'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CollectionAgentComponent.prototype, "closeAssignModel", void 0);
    CollectionAgentComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-collection-agent',
            template: __webpack_require__(/*! ./collection-agent.component.html */ "./src/app/layout/leads/collection-agent/collection-agent.component.html"),
            styles: [__webpack_require__(/*! ./collection-agent.component.css */ "./src/app/layout/leads/collection-agent/collection-agent.component.css")],
            providers: [src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["Constant"]]
        }),
        __metadata("design:paramtypes", [src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_5__["AdminService"],
            src_app_services_leads_service__WEBPACK_IMPORTED_MODULE_6__["LeadsService"],
            src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["Constant"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateService"]])
    ], CollectionAgentComponent);
    return CollectionAgentComponent;
}());



/***/ }),

/***/ "./src/app/layout/leads/credit-agent/credit-agent.component.css":
/*!**********************************************************************!*\
  !*** ./src/app/layout/leads/credit-agent/credit-agent.component.css ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n.action-icon img{\n    width: 25px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L2xlYWRzL2NyZWRpdC1hZ2VudC9jcmVkaXQtYWdlbnQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0E7SUFDSSxZQUFZO0NBQ2YiLCJmaWxlIjoic3JjL2FwcC9sYXlvdXQvbGVhZHMvY3JlZGl0LWFnZW50L2NyZWRpdC1hZ2VudC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXG4uYWN0aW9uLWljb24gaW1ne1xuICAgIHdpZHRoOiAyNXB4O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/layout/leads/credit-agent/credit-agent.component.html":
/*!***********************************************************************!*\
  !*** ./src/app/layout/leads/credit-agent/credit-agent.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container-fluid\">\n  <div class=\"row\">\n      <div class=\"col-md-4\">\n          <div class=\"form-group\">\n              <p class=\"p16\">{{'leads.CreditAgentLeads' | translate}}</p>\n          </div>\n      </div>\n  </div>\n  <div class=\"row\">\n      <div class=\"col-md-4\">\n          <div class=\"form-group\" *ngIf=\"admin?.admin_acl['Credit Agent Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n              <div class=\"d-flex\">\n              <div class=\"autocomplete\">\n                  <input placeholder=\"{{'addForm.placeholder.searchCSRSeller' | translate}}\" style=\"max-width:200px\" list=\"amenities\" [(ngModel)]=\"parameter.keyword\" (input)=\"getCsrListing()\" class=\"form-control\" type=\"text\" name=\"keyword\" (focusout)=\"closeCsrListing()\">\n                  <div id=\"myInputautocomplete-list\" class=\"autocomplete-items\">\n                      <div *ngFor=\"let item of users\" (click)=\"selectCsrUser(item)\">{{item.email}}</div>\n                  </div>\n              </div>\n              </div>\n          </div>\n      </div>\n      <div class=\"col-md-8 col-12\">\n          <div class=\"cust-tabs-2\">\n              <ul class=\"nav nav-tabs\">\n              <li class=\"nav-item\">\n                  <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==1}\" (click)=\"changeFlag(1)\">{{'filters.time.thisWeek' | translate}}</a>\n              </li>\n              <li class=\"nav-item\">\n                  <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==2}\" (click)=\"changeFlag(2)\" >{{'filters.time.thisMonth' | translate}}</a>\n              </li>\n              <li class=\"nav-item\">\n                  <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==3}\" (click)=\"changeFlag(3)\" >{{'filters.time.lastMonth' | translate}}</a>\n              </li>\n              <li class=\"nav-item\">\n                  <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==4}\" (click)=\"changeFlag(4)\" >{{'filters.time.lifetime' | translate}}</a>\n              </li>\n              <li class=\"nav-item\">\n                  <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==5}\" (click)=\"parameter.flag=5\" >{{'filters.time.custom.label' | translate}}</a>\n              </li>\n              </ul>\n          </div>\n      </div>\n  </div>\n\n  <div class=\"row\">\n      <div class=\"col-12\">\n          <div *ngIf=\"parameter.flag == 5\" class=\"row\">\n              <div class=\"offset-lg-7\"></div>\n              <div class=\"col-lg-2 col-md-2 col-sm-5 col-5\">\n              <div class=\"form-group marginB0\">\n                  <label>{{'filters.time.custom.from' | translate}}:</label>\n                  <p-calendar showIcon=\"true\" [locale]=\"locale\" [(ngModel)]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2040\"></p-calendar>\n              </div>\n              </div>\n              <div class=\"col-lg-2 col-md-2 col-sm-5 col-5\">\n              <div class=\"form-group marginB0\">\n                  <label>{{'filters.time.custom.to' | translate}}:</label>\n                  <p-calendar showIcon=\"true\" [locale]=\"locale\" [(ngModel)]=\"parameter.max\" [minDate]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2040\"></p-calendar>\n              </div>\n              </div>\n              <div class=\"col-lg-1 col-md-2 col-sm-2 col-6\">\n              <div class=\"form-group btn-cont\">\n                  <label class=\"addMT3\">&nbsp;</label>\n                  <button class=\"btn btn-calender\" href=\"javascript://\" (click)=\"getListing(); getCSRDashBoardData();\"\n                      [disabled]=\"!parameter.min || !parameter.max\">{{'filters.time.custom.applyBtn' | translate}}</button>\n              </div>\n              </div>\n          </div>\n      </div>\n  </div>\n  <div class=\"listingResults\" >\n      <div class=\"row\" *ngIf=\"admin?.admin_acl['Credit Agent Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n          <div class=\"col-md-2\">\n              <div class=\"form-group\">\n              <label>{{'filters.location.country' | translate}}</label>\n              <select class=\"form-control\" (change)=\"onCountryChange($event.target.value)\">\n                  <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n                  <option *ngFor=\"let item of location.countries\" [value]=\"item.id\">{{item.name}}</option>\n              </select>\n              </div>\n          </div>\n          <div class=\"col-md-2\">\n              <div class=\"form-group\">\n              <label>{{'filters.location.state' | translate}}</label>\n              <select class=\"form-control\" (change)=\"onStateChange($event.target.value)\">\n                  <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n                  <option *ngFor=\"let item of location.states\" [value]=\"item.id\">{{item.name}}</option>\n              </select>\n              </div>\n          </div>\n          <div class=\"col-md-2\">\n              <div class=\"form-group\">\n              <label>{{'filters.location.city' | translate}}</label>\n                  <select class=\"form-control\" (change)=\"onCityChange($event.target.value)\">\n                  <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n                  <option *ngFor=\"let item of location.cities\" [value]=\"item.id\">{{item.name}}</option>\n                  </select>\n              </div>\n          </div>\n  \n          <div class=\"col-md-2\">\n              <div class=\"form-group\">\n              <label>{{'filters.location.locality' | translate}}</label>\n              <select class=\"form-control\" (change)=\"onLocalityChange($event.target.value)\">\n                  <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n                  <option *ngFor=\"let item of location.localities\" [value]=\"item.id\">{{item.name}}</option>\n              </select>\n              </div>\n          </div>\n  \n          <div class=\"col-md-2\">\n              <div class=\"form-group btn-cont\">\n              <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n              <button type=\"button\" (click)=\"getListing(); getCSRDashBoardData();\" class=\"btn btn-primary-new width100P\">{{'filters.location.applyBtn' | translate}}</button>\n              </div>\n          </div>\n  \n          <div class=\"col-md-2\">\n              <div class=\"form-group btn-cont\">\n              <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n              <button type=\"button\" (click)=\"resetFilters()\" class=\"btn btn-primary-new width100P\">{{'filters.location.resetBtn' | translate}}</button>\n              </div>\n          </div>\n      </div>\n      <div *ngIf=\"selectedUser as item\" class=\"sigle-row-table\">\n      <table class=\"table table-striped\">\n      <tbody><tr>\n          <td>\n              <!-- <img class=\"rounded-circle\" [src]=\"item.image| img:'small'\" onerror='this.src=\"assets/img/default_img.png\"' alt=\"img\"> -->\n              <img *ngIf=\"item.image\" class=\"rounded-circle\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\"\n                            [defaultImage]=\"item.image| img:'thumb'\" [lazyLoad]=\"item.image\">\n              <img *ngIf=\"!item.image\" class=\"rounded-circle\" src=\"assets/img/default_img.png\" alt=\"img\">\n          </td>\n          <td class=\"text-left\">\n              <span class=\"name\">{{item.name | titlecase}}</span>\n          </td>\n          <td class=\"text-left\">{{item.phone}}</td>\n          <td class=\"text-left\">{{item.email}}</td>\n          <td>\n              <a (click)=\"removeCsrUser()\" href=\"javascript://\" class=\"icon-block edit-icon\"><img src=\"assets/img/remove-icon.png\" alt=\"remove\" title=\"{{'table.title.remove' | translate}}\" /></a>\n          </td>\n          </tr>\n      </tbody>\n      </table>\n</div>\n<div class=\"row\">\n   <div class=\"col-lg-8 col-md-12 col-sm-12 col-12\">\n      <div class=\"info-box all-leads\">\n         <div class=\"row\">\n            <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == 1}\" (click)=\"changeCountFlag(1)\">\n               <div class=\"one-row \">\n                  <div class=\"o-block\">\n                     <h5>{{'table.th.leads' | translate}}</h5>\n                     <small>{{'table.th.total' | translate}}</small>\n                  </div>\n                  <div class=\"o-block\">\n                     <a class=\"view-all\" href=\"javascript://\">{{'table.th.viewAll' | translate}}</a>\n                     <h4>{{dash?.lead_total || 0}}</h4>\n                  </div>\n               </div>\n            </div>\n            <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == 2}\" (click)=\"changeCountFlag(2)\">\n               <div class=\"one-row\">\n                  <div class=\"o-block\">\n                     <h5>{{'table.th.leads' | translate}}</h5>\n                     <small>{{'leads.leadsOpen' | translate}}</small>\n                  </div>\n                  <div class=\"o-block\">\n                     <a class=\"view-all\" href=\"javascript://\">{{'table.th.viewAll' | translate}}</a>\n                     <h4>{{dash?.lead_open || 0}}</h4>\n                  </div>\n               </div>\n            </div>\n         </div>\n      </div>\n      <div class=\"info-box all-leads\">\n         <div class=\"row\">\n            <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == 3}\" (click)=\"changeCountFlag(3)\">\n               <div class=\"one-row \">\n                  <div class=\"o-block\">\n                     <h5>{{'table.th.leads' | translate}}</h5>\n                     <small>{{'leads.leadsClosed' | translate}}</small>\n                  </div>\n                  <div class=\"o-block\">\n                     <a class=\"view-all\" href=\"javascript://\">{{'table.th.viewAll' | translate}}</a>\n                     <h4>{{dash?.lead_close || 0}}</h4>\n                  </div>\n               </div>\n            </div>\n            <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == 4}\" (click)=\"changeCountFlag(4)\">\n               <div class=\"one-row\">\n                  <div class=\"o-block\">\n                     <h5>{{'table.th.leads' | translate}}</h5>\n                     <small>{{'leads.leadsLost' | translate}}</small>\n                  </div>\n                  <div class=\"o-block\">\n                     <a class=\"view-all\" href=\"javascript://\">{{'table.th.viewAll' | translate}}</a>\n                     <h4>{{dash?.lead_lost || 0}}</h4>\n                  </div>\n               </div>\n            </div>\n         </div>\n      </div>\n\n   </div>\n   <div class=\"col-lg-4 col-md-12 col-sm-12 col-12\">\n      <div class=\"chat-msg all-leads\" style=\"padding:0px\">\n          <div class=\"padding20\" *ngIf=\"dash.lead_total == 0\">{{'message.error.noRecordFound' | translate}}</div>\n          <ngx-charts-pie-chart [results]=\"chartView\"></ngx-charts-pie-chart>\n      </div>\n   </div>\n</div>\n<div class=\"row\">\n   <div class=\"col-12\">\n      <div class=\"spacer40\"></div>\n   </div>\n\n</div>\n<div class=\"row\">\n   <div class=\"col-lg-6 col-md-6 col-6\">\n      <div class=\"title-group\">\n         <h5>{{'table.th.leads' | translate}} \n          <span *ngIf=\"parameter.count_flag == 1\">({{'table.th.total' | translate}})</span>\n          <span *ngIf=\"parameter.count_flag == 2\">({{'table.th.withoutProperty' | translate}})</span>\n          <span *ngIf=\"parameter.count_flag == 3\">({{'table.th.withProperty' | translate}})</span>\n          <span *ngIf=\"parameter.count_flag == 4\">({{'table.th.pendingProperties' | translate}})</span>\n         </h5>\n      </div>\n   </div>\n   <div class=\"col-lg-6 col-md-6 col-5\" *ngIf=\"admin?.admin_acl['Credit Agent Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n      <div class=\"add-new text-right\">\n          <a class=\"btn\" (click)=\"bulkAssign()\" href=\"javascript://\">{{'table.th.bulkReassign' | translate}}</a>\n      </div>\n  </div>\n</div>\n<div class=\"white-bg\">\n   <div class=\"tabel-section\">\n      <div class=\"table-responsive\">\n         <table class=\"table table-striped border-0\">\n            <tbody>\n            <tr>\n              <!-- <th *ngIf=\"admin?.admin_acl['Credit Agent Lead Management']?.can_read==1 && !this.parameter.assignee_id\" style=\"width:5%;\">\n                  <div class=\"table-search\">\n                      <label>{{'table.th.all' | translate}}</label>\n                      <div>\n                          <label class=\"cust-check-bx marginT0\">\n                              <input class=\"width1\" type=\"checkbox\" (click)=\"selectAll(parameter.is_selected)\" name=\"document\">\n                              <span class=\"checkmark\"></span>\n                          </label>\n                      </div>\n                  </div>\n              </th> -->\n              <th style=\"width:5%;\">\n                  <div class=\"table-search\">\n                          <label>{{'table.th.image' | translate}}</label>\n                  </div>\n              </th>\n              <th style=\"width:10%;\">\n                  <div class=\"table-search\">\n                          <label>{{'table.th.name' | translate}}</label>\n                     <div class=\"searh-3\">\n                      <input autocomplete=\"off\" type=\"text\" name=\"name\" [(ngModel)]=\"parameter.name\" (keyup.enter)=\"getListing()\">\n                      <button *ngIf=\"parameter.name\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                    </div>\n                  </div>\n              </th>\n              <th style=\"width:10%;\">\n                  <div class=\"table-search\">\n                          <label>{{'table.th.firstSurname' | translate}}</label>\n                          <div class=\"searh-3\">\n                            <input autocomplete=\"off\" type=\"text\" name=\"first_surname\" [(ngModel)]=\"parameter.first_surname\" (keyup.enter)=\"getListing()\">\n                            <button *ngIf=\"parameter.first_surname\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                          </div>\n                  </div>\n              </th>\n              <th style=\"width:10%;\">\n                  <div class=\"table-search\">\n                          <label>{{'table.th.secondSurname' | translate}}</label>\n                          <div class=\"searh-3\">\n                            <input autocomplete=\"off\" type=\"text\" name=\"second_surname\" [(ngModel)]=\"parameter.second_surname\" (keyup.enter)=\"getListing()\">\n                            <button *ngIf=\"parameter.second_surname\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                          </div>\n                  </div>\n              </th>\n              <th style=\"width:10%;\">\n                  <div class=\"table-search\">\n                          <label>{{'table.th.contactNumber' | translate}}</label>\n                     <div class=\"searh-3\">\n                          <input autocomplete=\"off\" type=\"text\" name=\"phone\" [(ngModel)]=\"parameter.phone\" (keyup.enter)=\"getListing()\">\n                          <button *ngIf=\"parameter.phone\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                      </div>\n                  </div>\n              </th>\n              <th style=\"width:20%;\">\n                  <div class=\"table-search\">\n                          <label>{{'table.th.emailAddress' | translate}}</label>\n                     <div class=\"searh-3\">\n                          <input autocomplete=\"off\" type=\"text\" name=\"email\" [(ngModel)]=\"parameter.email\" (keyup.enter)=\"getListing()\">\n                          <button *ngIf=\"parameter.email\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                     </div>\n                  </div>\n               </th>\n               <th style=\"width:10%;\">\n                  <div class=\"table-search\">\n                          <label>{{'table.th.price' | translate}}</label>\n                  </div>\n               </th>\n               <th style=\"width:10%;\">\n                  <div class=\"table-search\">\n                          <label>{{'table.th.mortgageLoanType' | translate}}</label>\n                  </div>\n               </th>\n               <th style=\"width:10%;\">\n                  <div class=\"table-search\">\n                          <label>{{'table.th.assignee' | translate}}</label>\n                  </div>\n               </th>\n               <th style=\"width:15%;\">\n                <label>&nbsp;</label>\n               </th>\n            </tr>\n            <tr class=\"cursor-pointer\" title=\"{{'table.title.clickToViewDetails' | translate}}\" *ngFor=\"let item of items| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: parameter.total }; let i =index\"\n            >\n              <!-- <td *ngIf=\"admin?.admin_acl['Credit Agent Lead Management']?.can_read==1 && !this.parameter.assignee_id\" (click)=\"$event.stopPropagation()\">\n                  <label class=\"cust-check-bx marginT0\">\n                  <input type=\"checkbox\" [(ngModel)]=\"item.selected\" name=\"document\">\n                  <span class=\"checkmark\"></span>\n                  </label>\n              </td> -->\n              <td >\n                  <img class=\"rounded-circle\" *ngIf=\"item.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\"\n                            [defaultImage]=\"item.image| img:'thumb'\" [lazyLoad]=\"item.image\">\n                  <img class=\"rounded-circle\" *ngIf=\"!item.image\" src=\"assets/img/default_img.png\" alt=\"img\">\n              </td>\n              <td class=\"text-left\">\n                <span class=\"name\">{{item.name | titlecase}}</span>\n               </td>\n               <td class=\"text-left\">\n                 <span class=\"name\">{{item.first_surname | titlecase}}</span>\n                </td>\n                <td class=\"text-left\">\n                  <span class=\"name\">{{item.second_surname | titlecase}}</span>\n                 </td>\n               <td class=\"text-left\" *ngIf=\"item.phone\">{{item.dial_code}}-{{item.phone.trim()}}</td>\n               <td class=\"text-left\" *ngIf=\"!item.phone\">{{'table.tr.td.NA' | translate}}</td>\n              <td class=\"text-left\">\n                  {{item.email}}\n              </td>\n              <td class=\"text-left\">\n                {{(item.price || 0) | currency}}\n            </td>\n            <td>\n                <span *ngFor=\"let m of item?.mortgage_loan_types; let j=index\">{{m.name_es}} <span *ngIf=\"j<item?.mortgage_loan_types?.length-1\">, </span> </span>\n            </td>\n               <td class=\"text-left\">{{item?.admin ? item?.admin?.name:('table.tr.td.NA' | translate)}}</td>\n               <td>\n                  \n                <button *ngIf=\"item.lead_status_agent==1\" [disabled]=\"admin?.admin_acl['Credit Agent Lead Management']?.can_update==0\"\n                title=\"{{'table.title.openLeads' | translate}}\" (click)=\"changeLeadStatus(0, item.id, i)\"\n                class=\"action-icon\"><img src=\"assets/img/open-lock.png\" alt=\"img\"></button>\n                \n                <button *ngIf=\"!item.lead_status_agent || item.lead_status_agent==2\" [disabled]=\"admin?.admin_acl['Manage Collections']?.can_update==0\"\n                (click)=\"changeLeadStatus(1, item.id, i)\" title=\"{{'table.title.closeLeads' | translate}}\" \n                class=\"action-icon\"><img src=\"assets/img/locked-padlock.png\" alt=\"img\"></button>  \n                \n                <button *ngIf=\"!item.lead_status_agent\" [disabled]=\"admin?.admin_acl['Manage Collections']?.can_update==0\"\n                (click)=\"changeLeadStatus(2, item.id, i)\" title=\"{{'table.title.lostLeads' | translate}}\" \n                class=\"action-icon\"><img src=\"assets/img/lost-items.png\" alt=\"img\"></button>  \n                \n                <button [disabled]=\"admin?.admin_acl['Manage Collections']?.can_purge==0\"\n                (click)=\"deletePopup(item, i)\" title=\"{{'table.title.delete' | translate}}\" \n                class=\"action-icon\"><img src=\"assets/img/ic_delete.png\" alt=\"img\"></button>  \n\n               </td>\n            </tr>\n         </tbody></table>\n         <div class=\"padding20 center\" *ngIf=\"parameter.noResultFound\">\n              <img src=\"assets/img/404-error.png\">\n          </div>\n      </div>\n   </div>\n\n</div>\n</div>\n\n  <div class=\"btn-cont marginT15\" *ngIf=\"parameter.total\">\n      <div class=\"row\">\n          <div class=\"col-6\">\n              <div class=\"title-group\">\n                      <p>{{'table.pagination.showing' | translate}} {{items?.length}} {{'table.pagination.outof' | translate}} {{parameter.total}}</p>\n              </div>\n          </div>\n          <div class=\"col-6 text-right\">\n              <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n          </div>\n      </div>\n  </div>\n</div>\n\n\n\n<!-- Assignment model -->\n<a data-toggle=\"modal\" data-target=\"#assign-model\" #openAssignModel></a>\n<div class=\"modal\" id=\"assign-model\">\n  <div class=\"modal-dialog \">\n      <div class=\"modal-content notary-avail\">\n          <div class=\"modal-header popup-header\">\n                  <h4 class=\"modal-title\">{{'leads.reAssignTo' | translate}}</h4>\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #closeAssignModel>&times;</button>\n          </div>\n          <div class=\"modal-body\">\n              <div class=\"row\">\n                  <div class=\"col-md-8 col-6\">\n                      <input style=\"max-width:200px\" list=\"amenities\" [(ngModel)]=\"assign.keyword\" (keyup.enter)=\"getAssignListing()\" class=\"form-control\" type=\"text\" name=\"keyword\" placeholder=\"{{'addForm.placeholder.search' | translate}}\">\n                  </div>\n                  <div class=\"col-md-4 col-5 btn-cont\">\n                      <a class=\"btn btn-primary pull-right\" href=\"javascript://\" (click)=\"assignNow()\">{{'leads.assign' | translate}}</a>\n                  </div>\n              </div>\n              <div class=\"spacer40\"></div>\n              <div class=\"modal-table-data\" malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\">\n                  <table class=\"table\">\n                      <tr *ngFor=\"let item of assign.items\">\n                          <td *ngIf=\"item.is_blocked!=1\">\n                              <div class=\"n-avail-profile\">\n                              <!-- <img [src]=\"item.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\"> -->\n                              <img *ngIf=\"item.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\"\n                                  [defaultImage]=\"item.image| img:'thumb'\" [lazyLoad]=\"item.image\">\n                              <img *ngIf=\"!item.image\" src=\"assets/img/default_img.png\" alt=\"img\">\n                              <div class=\"n-avail-info\">\n                                  <p class=\"p12\">{{item.name | titlecase}}</p>\n                                  <p class=\"p10\">{{'leads.phone' | translate}} : {{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}</p>\n                              </div>\n                              </div>\n                          </td>\n                          <td *ngIf=\"item.is_blocked!=1\">\n                              <label class=\"cust-check-bx float-right\">\n                                  <input type=\"radio\" name=\"notary_id\" (click)=\"assignItem = item\">\n                                  <span class=\"checkmark\"></span>\n                              </label>\n                          </td>\n                      </tr>\n                      <tr *ngIf=\"assign?.items?.length==0\">\n                          <p class=\"show-not-found\">{{'leads.noCSRSeller' | translate}}</p>\n                      </tr>\n                  </table>\n              </div>\n          </div>\n      </div>\n  </div>\n</div>\n  "

/***/ }),

/***/ "./src/app/layout/leads/credit-agent/credit-agent.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/layout/leads/credit-agent/credit-agent.component.ts ***!
  \*********************************************************************/
/*! exports provided: CreditAgentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreditAgentComponent", function() { return CreditAgentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var src_app_services_leads_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/leads.service */ "./src/app/services/leads.service.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var CreditAgentComponent = /** @class */ (function () {
    function CreditAgentComponent(admin, leadsService, constant, route, router, spinner, translate) {
        this.admin = admin;
        this.leadsService = leadsService;
        this.constant = constant;
        this.route = route;
        this.router = router;
        this.spinner = spinner;
        this.translate = translate;
        this.scrollbarOptions = { axis: 'y', theme: 'dark' };
        this.parameter = {};
        this.location = {};
        this.assign = {};
        this.items = [];
        this.today = new Date();
        this.users = [];
        this.initSelection = false;
        this.dash = {
            lead_total: 0,
            lead_property_pending: 0,
            lead_with_property: 0,
            lead_without_property: 0
        };
        this.chartView = [];
    }
    CreditAgentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.locale = {
            firstDayOfWeek: 0,
            dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
            dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
            dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
            monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
            monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun',
                'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
            today: 'Hoy',
            clear: 'Clara',
            dateFormat: 'mm/dd/yy',
            weekHeader: 'Wk'
        };
        this.parameter.is_selected = false;
        this.parameter.keyword = '';
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        this.parameter.flag = this.leadsService.sellerLeadsFlag ? this.leadsService.sellerLeadsFlag : this.constant.flag;
        this.parameter.total = 0;
        this.parameter.count_flag = this.leadsService.sellerLeadsCountFlag ? this.leadsService.sellerLeadsCountFlag : this.constant.count_flag;
        this.route.params.subscribe(function (params) {
            _this.parameter.assignee_id = params.id;
        });
        this.getCountries();
        this.getListing();
        this.getCSRDashBoardData();
        Object.assign(this, this.chartView);
    };
    CreditAgentComponent.prototype.getCountries = function () {
        var _this = this;
        this.admin.postDataApi('getCountryLocality', {}).subscribe(function (r) {
            _this.location.countries = r['data'];
        });
    };
    CreditAgentComponent.prototype.onCountryChange = function (id) {
        this.parameter.country_id = id;
        this.location.states = [];
        this.parameter.state_id = '0';
        this.location.cities = [];
        this.parameter.city_id = '0';
        this.location.localities = [];
        this.parameter.locality_id = '0';
        if (!id || id === '0') {
            return false;
        }
        this.parameter.country_id = id;
        var selectedCountry = this.location.countries.filter(function (x) { return x.id.toString() === id; });
        this.location.states = selectedCountry[0].states;
    };
    CreditAgentComponent.prototype.onStateChange = function (id) {
        this.location.cities = [];
        this.parameter.city_id = '0';
        this.location.localities = [];
        this.parameter.locality_id = '0';
        if (!id || id === '0') {
            return false;
        }
        this.parameter.state_id = id;
        var selectedState = this.location.states.filter(function (x) { return x.id.toString() === id; });
        this.location.cities = selectedState[0].cities;
    };
    CreditAgentComponent.prototype.onCityChange = function (id) {
        this.location.localities = [];
        this.parameter.locality_id = '0';
        if (!id || id === '0') {
            return false;
        }
        this.parameter.city_id = id;
        var selectedCountry = this.location.cities.filter(function (x) { return x.id.toString() === id; });
        this.location.localities = selectedCountry[0].localities;
    };
    CreditAgentComponent.prototype.onLocalityChange = function (id) {
        if (!id || id === '0') {
            return false;
        }
        this.parameter.locality_id = id;
        // this.getCsrListing();
    };
    CreditAgentComponent.prototype.changeFlag = function (flag) {
        this.parameter.flag = flag;
        this.leadsService.sellerLeadsFlag = flag;
        this.parameter.count_flag = 1;
        this.resetDates();
        this.getListing();
        this.getCSRDashBoardData();
    };
    // changeFilter = (key: string, value: any): void => {
    //   this.parameter[key] = value;
    //   this.getListing();
    // }
    CreditAgentComponent.prototype.changeCountFlag = function (flag) {
        this.parameter.count_flag = flag;
        this.leadsService.sellerLeadsCountFlag = flag;
        // this.getListing();
    };
    CreditAgentComponent.prototype.getCsrListing = function () {
        var _this = this;
        this.initSelection = true;
        this.users = [];
        var input = new FormData();
        if (this.parameter.keyword) {
            input.append('keyword', this.parameter.keyword);
        }
        this.admin.postDataApi('getCsrSellers', input).subscribe(function (success) {
            _this.users = success.data;
        });
    };
    CreditAgentComponent.prototype.resetFilters = function () {
        this.location.countries = JSON.parse(JSON.stringify(this.location.countries));
        this.onCountryChange('0');
        this.parameter.is_selected = false;
        this.parameter.page = this.constant.p;
        this.parameter.flag = 2;
        this.parameter.total = 0;
        // this.selectedUser = '';
        this.parameter.keyword = '';
        this.parameter.count_flag = 1;
        this.resetDates();
        this.getListing();
        this.getCSRDashBoardData();
    };
    CreditAgentComponent.prototype.resetDates = function () {
        this.parameter.min = '';
        this.parameter.max = '';
    };
    CreditAgentComponent.prototype.closeCsrListing = function () {
        var _this = this;
        setTimeout(function () {
            _this.users = [];
        }, 200);
    };
    CreditAgentComponent.prototype.selectCsrUser = function (user) {
        this.selectedUser = user;
        this.users = [];
        this.parameter.keyword = '';
        this.initSelection = false;
        this.getListing();
        this.getCSRDashBoardData();
    };
    CreditAgentComponent.prototype.removeCsrUser = function () {
        this.selectedUser = '';
        this.parameter.keyword = '';
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        // this.parameter.flag = 2;
        this.parameter.total = 0;
        this.parameter.count_flag = 1;
        this.getListing();
        this.getCSRDashBoardData();
    };
    CreditAgentComponent.prototype.getCSRDashBoardData = function () {
        var _this = this;
        // const input = new FormData();
        // if (this.selectedUser) {
        //   input.append('assignee_id', this.selectedUser.id);
        // } else if (this.parameter.assignee_id) {
        //   input.append('assignee_id', this.parameter.assignee_id);
        // }
        // if (this.parameter.flag) {
        //   input.append('flag', this.parameter.flag.toString());
        // }
        var input = JSON.parse(JSON.stringify(this.parameter));
        if (this.parameter.min) {
            input.min = moment__WEBPACK_IMPORTED_MODULE_2__(this.parameter.min).format('YYYY-MM-DD');
        }
        else {
            delete input.min;
        }
        if (this.parameter.max) {
            input.max = moment__WEBPACK_IMPORTED_MODULE_2__(this.parameter.max).format('YYYY-MM-DD');
        }
        else {
            delete input.max;
        }
        if (this.selectedUser) {
            input.assignee_id = this.selectedUser.id;
        }
        else if (this.parameter.assignee_id) {
            input.assignee_id = this.parameter.assignee_id;
        }
        this.admin.postDataApi('leads/credit-agent-dash-count', input).subscribe(function (r) {
            _this.dash = r.data;
            _this.chartView = [
                {
                    'name': _this.translate.instant('leads.leadsOpen'),
                    'value': parseInt(_this.dash.lead_open, 10)
                },
                {
                    'name': _this.translate.instant('leads.leadsClosed'),
                    'value': parseInt(_this.dash.lead_close, 10)
                },
                {
                    'name': _this.translate.instant('leads.leadsLost'),
                    'value': parseInt(_this.dash.lead_lost, 10)
                }
            ];
        });
    };
    CreditAgentComponent.prototype.getListing = function () {
        var _this = this;
        this.items = [];
        this.parameter.noResultFound = false;
        var input = JSON.parse(JSON.stringify(this.parameter));
        if (this.parameter.min) {
            input.min = moment__WEBPACK_IMPORTED_MODULE_2__(this.parameter.min).format('YYYY-MM-DD');
        }
        else {
            delete input.min;
        }
        if (this.parameter.max) {
            input.max = moment__WEBPACK_IMPORTED_MODULE_2__(this.parameter.max).format('YYYY-MM-DD');
        }
        else {
            delete input.max;
        }
        if (this.selectedUser) {
            input.assignee_id = this.selectedUser.id;
        }
        else if (this.parameter.assignee_id) {
            input.assignee_id = this.parameter.assignee_id;
        }
        this.spinner.show();
        this.admin.postDataApi('leads/credit-agent', input).subscribe(function (success) {
            _this.spinner.hide();
            _this.items = success.data;
            if (_this.items.length <= 0) {
                _this.parameter.noResultFound = true;
            }
            _this.parameter.total = success.total_count;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    CreditAgentComponent.prototype.getPage = function (page) {
        this.parameter.page = page;
        this.getListing();
    };
    CreditAgentComponent.prototype.sort_by = function (sort_by_flag) {
        if (this.parameter.sort_by_flag !== sort_by_flag) {
            this.parameter.sort_by_flag = sort_by_flag;
            this.parameter.sort_by_order = 0;
        }
        else {
            this.parameter.sort_by_order = this.parameter.sort_by_order ? 0 : 1;
        }
        this.getListing();
    };
    CreditAgentComponent.prototype.selectAll = function (is_selected) {
        var _this = this;
        this.parameter.is_selected = !is_selected;
        this.items.forEach(function (item) {
            item.selected = _this.parameter.is_selected;
        });
    };
    CreditAgentComponent.prototype.bulkAssign = function () {
        var leads_ids = this.items.filter(function (x) { return x.selected; }).map(function (y) { return y.id; });
        if (leads_ids.length === 0) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseAtleast1Lead'), 'error');
            return false;
        }
        if (!this.assign.items) {
            this.getAssignListing();
        }
        this.openAssignModel.nativeElement.click();
    };
    CreditAgentComponent.prototype.getAssignListing = function () {
        var _this = this;
        var input = {
            keyword: this.assign.keyword
        };
        this.spinner.show();
        this.admin.postDataApi('getCsrSellers', input).subscribe(function (success) {
            _this.spinner.hide();
            _this.assign.items = []; // success.data;
        });
    };
    CreditAgentComponent.prototype.assignNow = function () {
        var _this = this;
        var leads_ids = this.items.filter(function (x) { return x.selected; }).map(function (y) { return y.id; });
        var input = {
            csr_seller_id: this.assignItem.id,
            leads: leads_ids
        };
        this.spinner.show();
        this.admin.postDataApi('leads/bulkAssignSeller', input).subscribe(function (r) {
            _this.spinner.hide();
            swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.assignedSuccessfully'), 'success');
            _this.closeAssignModel.nativeElement.click();
            _this.getListing();
        }, function (error) {
            _this.spinner.hide();
            _this.closeAssignModel.nativeElement.click();
            swal(_this.translate.instant('swal.error'), error.error.message, 'error');
        });
    };
    CreditAgentComponent.prototype.getCSRSellerChat = function ($event, chat_with, csr_seller_id, lead_id) {
        // chat_with = 1 means chat with seller, 2 means chat with agent
        if (csr_seller_id) {
            this.router.navigate(['/dashboard/leads/chat-with-seller', chat_with, csr_seller_id, lead_id]);
        }
        else {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.noCSRSellerAssigned'), 'error');
        }
    };
    CreditAgentComponent.prototype.changeLeadStatus = function (status, id, index) {
        var _this = this;
        swal({
            html: this.translate.instant('message.error.areYouSure') + '<br>' +
                this.translate.instant('message.error.wantToChangeStatus'),
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.admin.postDataApi('leads/changeLeadStatus', { status: status, id: id })
                    .subscribe(function (success) {
                    _this.items[index]['lead_status_agent'] = status;
                });
            }
        });
    };
    CreditAgentComponent.prototype.deletePopup = function (item, index) {
        var _this = this;
        swal({
            html: this.translate.instant('message.error.areYouSure') + '<br>' +
                this.translate.instant('message.error.wantToDeleteLead'),
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.delete(item, index);
            }
        });
    };
    CreditAgentComponent.prototype.delete = function (item, index) {
        var _this = this;
        this.admin.postDataApi('leads/deleteCreditLead', { id: item.id }).subscribe(function (r) {
            swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.deletedSuccessfully'), 'success');
            _this.items.splice(index, 1);
        }, function (error) {
            swal(_this.translate.instant('swal.error'), error.error.message, 'error');
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('openAssignModel'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CreditAgentComponent.prototype, "openAssignModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('closeAssignModel'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CreditAgentComponent.prototype, "closeAssignModel", void 0);
    CreditAgentComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-credit-agent',
            template: __webpack_require__(/*! ./credit-agent.component.html */ "./src/app/layout/leads/credit-agent/credit-agent.component.html"),
            styles: [__webpack_require__(/*! ./credit-agent.component.css */ "./src/app/layout/leads/credit-agent/credit-agent.component.css")],
            providers: [src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["Constant"]]
        }),
        __metadata("design:paramtypes", [src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_5__["AdminService"],
            src_app_services_leads_service__WEBPACK_IMPORTED_MODULE_6__["LeadsService"],
            src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["Constant"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateService"]])
    ], CreditAgentComponent);
    return CreditAgentComponent;
}());



/***/ }),

/***/ "./src/app/layout/leads/csr-buyer/csr-buyer.component.css":
/*!****************************************************************!*\
  !*** ./src/app/layout/leads/csr-buyer/csr-buyer.component.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9sZWFkcy9jc3ItYnV5ZXIvY3NyLWJ1eWVyLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/layout/leads/csr-buyer/csr-buyer.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/layout/leads/csr-buyer/csr-buyer.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n    <div class=\"row\">\n        <div class=\"col-md-4\">\n            <div class=\"form-group\">\n                <p class=\"p16\">{{'leads.CSRBuyerLeads' | translate}}</p>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-md-4\">\n            <div class=\"form-group\"\n                *ngIf=\"admin?.admin_acl['Buyer Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n                <div class=\"d-flex\">\n                    <div class=\"autocomplete\">\n                        <input placeholder=\"{{'addForm.placeholder.searchCSRBuyer' | translate}}\"\n                            style=\"max-width:200px\" list=\"amenities\" [(ngModel)]=\"parameter.keyword\"\n                            (input)=\"getCsrListing()\" class=\"form-control\" type=\"text\" name=\"keyword\"\n                            (focusout)=\"closeCsrListing()\">\n                        <div id=\"myInputautocomplete-list\" class=\"autocomplete-items\">\n                            <div *ngFor=\"let item of users\" (click)=\"selectCsrUser(item)\">{{item.email}}</div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-md-8 col-12\">\n            <div class=\"cust-tabs-2\">\n                <ul class=\"nav nav-tabs\">\n                    <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==1}\"\n                            (click)=\"changeFlag(1)\">{{'filters.time.thisWeek' | translate}}</a>\n                    </li>\n                    <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==2}\"\n                            (click)=\"changeFlag(2)\">{{'filters.time.thisMonth' | translate}}</a>\n                    </li>\n                    <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==3}\"\n                            (click)=\"changeFlag(3)\">{{'filters.time.lastMonth' | translate}}</a>\n                    </li>\n                    <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==4}\"\n                            (click)=\"changeFlag(4)\">{{'filters.time.lifetime' | translate}}</a>\n                    </li>\n                    <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==5}\"\n                            (click)=\"parameter.flag=5\">{{'filters.time.custom.label' | translate}}</a>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-12\">\n            <div *ngIf=\"parameter.flag == 5\" class=\"row\">\n                <div class=\"offset-lg-7\"></div>\n                <div class=\"col-lg-2 col-md-2 col-sm-5 col-5\">\n                    <div class=\"form-group marginB0\">\n                        <label>{{'filters.time.custom.from' | translate}}:</label>\n                        <p-calendar showIcon=\"true\" [locale]=\"locale\" [(ngModel)]=\"parameter.min\" [maxDate]=\"today\"\n                            showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2040\">\n                        </p-calendar>\n                    </div>\n                </div>\n                <div class=\"col-lg-2 col-md-2 col-sm-5 col-5\">\n                    <div class=\"form-group marginB0\">\n                        <label>{{'filters.time.custom.to' | translate}}:</label>\n                        <p-calendar showIcon=\"true\" [locale]=\"locale\" [(ngModel)]=\"parameter.max\"\n                            [minDate]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\"\n                            [yearNavigator]=\"true\" yearRange=\"2000:2040\"></p-calendar>\n                    </div>\n                </div>\n                <div class=\"col-lg-1 col-md-2 col-sm-2 col-6\">\n                    <div class=\"form-group btn-cont\">\n                        <label class=\"addMT3\">&nbsp;</label>\n                        <button class=\"btn btn-calender\" href=\"javascript://\"\n                            (click)=\"getListing(); getCSRDashBoardData();\"\n                            [disabled]=\"!parameter.min || !parameter.max\">{{'filters.time.custom.applyBtn' |\n                            translate}}</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"listingResults\">\n        <div class=\"row\" *ngIf=\"admin?.admin_acl['Buyer Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n            <div class=\"col-md-2\">\n                <div class=\"form-group\">\n                    <label>{{'filters.location.country' | translate}}</label>\n                    <select class=\"form-control\" (change)=\"onCountryChange($event.target.value)\">\n                        <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n                        <option *ngFor=\"let item of location.countries\" [value]=\"item.id\">{{item.name}}</option>\n                    </select>\n                </div>\n            </div>\n            <div class=\"col-md-2\">\n                <div class=\"form-group\">\n                    <label>{{'filters.location.state' | translate}}</label>\n                    <select class=\"form-control\" (change)=\"onStateChange($event.target.value)\">\n                        <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n                        <option *ngFor=\"let item of location.states\" [value]=\"item.id\">{{item.name}}</option>\n                    </select>\n                </div>\n            </div>\n            <div class=\"col-md-2\">\n                <div class=\"form-group\">\n                    <label>{{'filters.location.city' | translate}}</label>\n                    <select class=\"form-control\" (change)=\"onCityChange($event.target.value)\">\n                        <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n                        <option *ngFor=\"let item of location.cities\" [value]=\"item.id\">{{item.name}}</option>\n                    </select>\n                </div>\n            </div>\n\n            <div class=\"col-md-2\">\n                <div class=\"form-group\">\n                    <label>{{'filters.location.locality' | translate}}</label>\n                    <select class=\"form-control\" (change)=\"onLocalityChange($event.target.value)\">\n                        <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n                        <option *ngFor=\"let item of location.localities\" [value]=\"item.id\">{{item.name}}</option>\n                    </select>\n                </div>\n            </div>\n\n            <div class=\"col-md-2\">\n                <div class=\"form-group btn-cont\">\n                    <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n                    <button type=\"button\" (click)=\"getListing(); getCSRDashBoardData();\"\n                        class=\"btn btn-primary-new width100P\">{{'filters.location.applyBtn' | translate}}</button>\n                </div>\n            </div>\n\n            <div class=\"col-md-2\">\n                <div class=\"form-group btn-cont\">\n                    <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n                    <button type=\"button\" (click)=\"resetFilters()\"\n                        class=\"btn btn-primary-new width100P\">{{'filters.location.resetBtn' | translate}}</button>\n                </div>\n            </div>\n        </div>\n\n        <div *ngIf=\"selectedUser as item\" class=\"sigle-row-table\">\n            <table class=\"table table-striped\">\n                <tbody>\n                    <tr>\n                        <td><img class=\"rounded-circle\" [src]=\"item.image| img:'small'\"\n                                onerror='this.src=\"assets/img/default_img.png\"' alt=\"img\"></td>\n                        <td class=\"text-left\">\n                            <span class=\"name\">{{item.name | titlecase}}</span>\n                        </td>\n                        <td class=\"text-left\">{{item.phone}}</td>\n                        <td class=\"text-left\">{{item.email}}</td>\n                        <td>\n                            <a (click)=\"removeCsrUser()\" href=\"javascript://\" class=\"icon-block edit-icon\">\n                                <img src=\"assets/img/remove-icon.png\" alt=\"remove\"\n                                    title=\"{{'table.title.remove' | translate}}\" /></a>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-lg-8 col-md-12 col-sm-12 col-12\">\n                <div class=\"info-box all-leads\">\n                    <div class=\"row\">\n                        <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == 1}\"\n                            (click)=\"changeCountFlag(1)\">\n                            <div class=\"one-row \">\n                                <div class=\"o-block\">\n                                    <h5>{{'table.th.leads' | translate}}</h5>\n                                    <small>{{'table.th.total' | translate}}</small>\n                                </div>\n                                <div class=\"o-block\">\n                                    <a class=\"view-all\" href=\"javascript://\">{{'table.th.viewAll' | translate}}</a>\n                                    <h4>{{dash?.lead_total}}</h4>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == 2}\"\n                            (click)=\"changeCountFlag(2)\">\n                            <div class=\"one-row\">\n                                <div class=\"o-block\">\n                                    <h5>{{'table.th.leads' | translate}}</h5>\n                                    <small>{{'table.th.withoutAgent' | translate}}</small>\n                                </div>\n                                <div class=\"o-block\">\n                                    <a class=\"view-all\" href=\"javascript://\">{{'table.th.viewAll' | translate}}</a>\n                                    <h4>{{dash?.lead_without_broker}}</h4>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"info-box all-leads\">\n                    <div class=\"row\">\n                        <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == 3}\"\n                            (click)=\"changeCountFlag(3)\">\n                            <div class=\"one-row \">\n                                <div class=\"o-block\">\n                                    <h5>{{'table.th.leads' | translate}}</h5>\n                                    <small>{{'table.th.infoFilled' | translate}}</small>\n                                </div>\n                                <div class=\"o-block\">\n                                    <a class=\"view-all\" href=\"javascript://\">{{'table.th.viewAll' | translate}}</a>\n                                    <h4>{{dash?.lead_information_filled}}</h4>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == 4}\"\n                            (click)=\"changeCountFlag(4)\">\n                            <div class=\"one-row\">\n                                <div class=\"o-block\">\n                                    <h5>{{'table.th.leads' | translate}}</h5>\n                                    <small>{{'table.th.agentAssigned' | translate}}</small>\n                                </div>\n                                <div class=\"o-block\">\n                                    <a class=\"view-all\" href=\"javascript://\">{{'table.th.viewAll' | translate}}</a>\n                                    <h4>{{dash?.lead_broker_assigned}}</h4>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"col-lg-4 col-md-12 col-sm-12 col-12\">\n                <div class=\"chat-msg all-leads\" style=\"padding:0px\">\n                    <div class=\"padding20\" *ngIf=\"dash?.lead_total == 0\">{{'message.error.noRecordFound' | translate}}\n                    </div>\n                    <ngx-charts-pie-chart [results]=\"chartView\"></ngx-charts-pie-chart>\n                </div>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-12\">\n                <div class=\"spacer40\"></div>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-lg-6 col-md-6 col-6\">\n                <div class=\"title-group\">\n                    <h5>{{'table.th.leads' | translate}}\n                        <span *ngIf=\"parameter.count_flag == 1\">({{'table.th.total' | translate}})</span>\n                        <span *ngIf=\"parameter.count_flag == 2\">({{'table.th.withoutAgent' | translate}})</span>\n                        <span *ngIf=\"parameter.count_flag == 3\">({{'table.th.infoFilled' | translate}})</span>\n                        <span *ngIf=\"parameter.count_flag == 4\">({{'table.th.agentAssigned' | translate}})</span>\n                    </h5>\n                </div>\n            </div>\n            <div class=\"col-lg-6 col-md-6 col-5\"\n                *ngIf=\"admin?.admin_acl['Buyer Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n                <div class=\"add-new text-right\">\n                    <a class=\"btn\" (click)=\"bulkAssign()\" href=\"javascript://\">{{'table.th.bulkReassign' |\n                        translate}}</a>\n                </div>\n            </div>\n        </div>\n        <div class=\"white-bg\">\n            <div class=\"tabel-section\">\n                <div class=\"table-responsive\">\n                    <table class=\"table table-striped table-align-left vertical-align-top\">\n                        <tr>\n                            <th *ngIf=\"admin?.admin_acl['Buyer Lead Management']?.can_read==1 && !this.parameter.assignee_id\"\n                                style=\"width:6%\">\n                                <div class=\"table-search\">\n                                    <label>{{'table.th.all' | translate}}</label>\n                                    <div>\n                                        <label class=\"cust-check-bx\">\n                                            <input class=\"width1\" type=\"checkbox\" [(ngModel)]=\"allSelected\"\n                                                (click)=\"selectAll(parameter.is_selected)\" name=\"document\">\n                                            <span class=\"checkmark\"></span>\n                                        </label>\n                                    </div>\n                                </div>\n                            </th>\n                            <th style=\"width:6%\">\n                                <div class=\"table-search\"><label>{{'table.th.image' | translate}}</label></div>\n                            </th>\n                            <th style=\"width:15%\">\n                                <div class=\"table-search\">\n                                    <label>{{'table.th.name' | translate}}</label>\n                                    <div class=\"searh-3\">\n                                        <input autocomplete=\"off\" type=\"text\" [(ngModel)]=\"parameter.name\"\n                                            (keyup.enter)=\"changeFilter('name',$event.target.value)\" name=\"\">\n                                        <button *ngIf=\"parameter.name\" (click)=\"changeFilter('name', parameter.name)\"><i\n                                                class=\"fa fa-search\"></i></button>\n                                    </div>\n                                </div>\n                            </th>\n                            <th style=\"width:15%;\">\n                                <div class=\"table-search\">\n                                    <label>{{'table.th.firstSurname' | translate}}</label>\n                                    <div class=\"searh-3\">\n                                        <input autocomplete=\"off\" type=\"text\" [(ngModel)]=\"parameter.first_surname\"\n                                            (keyup.enter)=\"changeFilter('first_surname',$event.target.value)\" name=\"\">\n                                        <button *ngIf=\"parameter.first_surname\" (click)=\"changeFilter('first_surname', parameter.first_surname)\"><i\n                                                class=\"fa fa-search\"></i></button>\n                                    </div>\n                                </div>\n                            </th>\n                            <th style=\"width:15%;\">\n                                <div class=\"table-search\">\n                                    <label>{{'table.th.secondSurname' | translate}}</label>\n                                    <div class=\"searh-3\">\n                                        <input autocomplete=\"off\" type=\"text\" [(ngModel)]=\"parameter.second_surname\"\n                                            (keyup.enter)=\"changeFilter('second_surname',$event.target.value)\" name=\"\">\n                                        <button *ngIf=\"parameter.second_surname\" (click)=\"changeFilter('second_surname', parameter.second_surname)\"><i\n                                                class=\"fa fa-search\"></i></button>\n                                    </div>\n                                </div>\n                            </th>\n                            <th style=\"width:19%; text-align:left;\">\n                                <div class=\"table-search\">\n                                    <label>{{'table.th.contactNumber' | translate}}</label>\n                                    <div class=\"searh-3\">\n                                        <input autocomplete=\"off\" type=\"text\" [(ngModel)]=\"parameter.phone\"\n                                            (keyup.enter)=\"changeFilter('phone',$event.target.value)\" name=\"\">\n                                        <button *ngIf=\"parameter.phone\"\n                                            (click)=\"changeFilter('phone', parameter.phone)\"><i\n                                                class=\"fa fa-search\"></i></button>\n                                    </div>\n                                </div>\n                            </th>\n                            <th style=\"width:20%\">\n                                <div class=\"table-search\">\n                                    <label>{{'table.th.emailAddress' | translate}}</label>\n                                    <div class=\"searh-3\">\n                                        <input autocomplete=\"off\" type=\"text\" [(ngModel)]=\"parameter.email\"\n                                            (keyup.enter)=\"changeFilter('email',$event.target.value)\" name=\"\">\n                                        <button *ngIf=\"parameter.email\"\n                                            (click)=\"changeFilter('email', parameter.email)\"><i\n                                                class=\"fa fa-search\"></i></button>\n                                    </div>\n                                </div>\n                            </th>\n                            <th style=\"width:24%\">\n                                <div class=\"table-search\">\n                                    <label>{{'table.th.interestedIn' | translate}}</label>\n                                </div>\n                            </th>\n                            <th style=\"width:10%\">\n                                <div class=\"table-search\">\n                                    <label>{{'table.th.assignee' | translate}}</label>\n                                </div>\n                            </th>\n                            <th style=\"width:6%\">\n                                <div class=\"table-search\">\n                                    <label>{{'table.th.propertyFor' | translate}}</label>\n                                </div>\n                            </th>\n                        </tr>\n                        <tr class=\"cursor-pointer\" title=\"{{'table.title.clickToViewDetails' | translate}}\"\n                            *ngFor=\"let item of items| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: parameter.total }\"\n                            (click)=\"viewLeadDetails(item.id, item)\">\n                            <!-- routerLink=\"/dashboard/leads/csr-buyers/{{item.id}}\" -->\n                            <td *ngIf=\"admin?.admin_acl['Buyer Lead Management']?.can_read==1 && !this.parameter.assignee_id\"\n                                (click)=\"$event.stopPropagation()\">\n                                <label class=\"cust-check-bx\">\n                                    <input type=\"checkbox\" [(ngModel)]=\"item.selected\" name=\"document\">\n                                    <span class=\"checkmark\"></span>\n                                </label>\n                                <!-- <i class=\"fa\" [ngClass]=\"item.selected?'fa-check-square-o':'fa-square-o'\" (click)=\"item.selected = !item.selected\" aria-hidden=\"true\"></i> -->\n                            </td>\n                            <td>\n                                <img [src]=\"item?.user?.image ? item?.user?.image : item?.image| img:'small'\"\n                                    class=\"rounded-circle\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\">\n                            </td>\n                            <td class=\"text-left\">\n                                <span *ngIf=\"item.name\" class=\"name\">{{item?.user?.name ? item?.user?.name : item?.name\n                                    | titlecase}}</span>\n                                <span class=\"name\" *ngIf=\"!item.name\">{{'table.tr.td.NA' | translate}}</span>\n                            </td>\n                            <td class=\"text-left\">\n                                <span class=\"name\">{{item.first_surname | titlecase}}</span>\n                            </td>\n                            <td class=\"text-left\">\n                                <span class=\"name\">{{item.second_surname | titlecase}}</span>\n                            </td>\n                            <td class=\"text-left\" *ngIf=\"item?.phone\">\n                                {{item?.dial_code ? item?.dial_code : constant.dial_code}}-{{item?.user?.phone ?\n                                item?.user?.phone : item.phone}}</td>\n                            <td class=\"text-left\" *ngIf=\"!item.phone\">{{'table.tr.td.NA' | translate}}</td>\n                            <td class=\"text-left\" *ngIf=\"item.email\">{{item?.user?.email ? item?.user?.email :\n                                item.email}}</td>\n                            <td class=\"text-left\" *ngIf=\"!item.email\">{{'table.tr.td.NA' | translate}}</td>\n                            <td>\n                                <span *ngFor=\"let conf of item.configuration; let ii=index\">\n                                    <app-property-configuration [configuration]=\"conf\"></app-property-configuration>\n                                    <span *ngIf=\"ii<item?.configuration?.length-1\"> | </span> <br>\n                                </span>\n                                <span *ngIf=\"item.configuration?.length==0\">{{'table.tr.td.NA' | translate}}</span>\n                            </td>\n                            <td class=\"text-left\" title=\"{{'table.title.CSRBuyer' | translate}}\">{{item?.admin?.name ?\n                                item?.admin?.name : ('table.tr.td.NA' | translate)}}</td>\n                            <td class=\"text-left\" *ngIf=\"item.sale_rent\">{{item.sale_rent==1 ? ('leadDetails.buy' |\n                                translate) : ('table.tr.td.rent' | translate)}}</td>\n                        </tr>\n                    </table>\n                    <div class=\"padding20 center\" *ngIf=\"parameter.noResultFound\">\n                        <img src=\"assets/img/404-error.png\" alt=\"Not found\">\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"btn-cont marginT15\" *ngIf=\"parameter.total\">\n        <div class=\"row\">\n            <div class=\"col-6\">\n                <div class=\"title-group\">\n                    <p>{{'table.pagination.showing' | translate}} {{items?.length}} {{'table.pagination.outof' |\n                        translate}} {{parameter.total}}</p>\n                </div>\n            </div>\n            <div class=\"col-6 text-right\">\n                <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n            </div>\n        </div>\n    </div>\n</div>\n\n<!-- Assignment model -->\n<a data-toggle=\"modal\" data-target=\"#assign-model\" #openAssignModel></a>\n<div class=\"modal\" id=\"assign-model\">\n    <div class=\"modal-dialog \">\n        <div class=\"modal-content notary-avail\">\n            <div class=\"modal-header popup-header\">\n                <h4 class=\"modal-title\">{{'leads.reAssignTo' | translate}}</h4>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #closeAssignModel>&times;</button>\n            </div>\n            <div class=\"modal-body\">\n                <div class=\"row\">\n                    <div class=\"col-md-8 col-6\">\n                        <input title=\"{{'table.title.clickEnterForSearch' | translate}}\" style=\"max-width:200px\"\n                            list=\"amenities\" [(ngModel)]=\"assign.keyword\" (keyup.enter)=\"getAssignListing()\"\n                            class=\"form-control\" type=\"text\" name=\"keyword\"\n                            placeholder=\"{{'addForm.placeholder.search' | translate}}\">\n                    </div>\n                    <div class=\"col-md-4 col-5 btn-cont\">\n                        <a class=\"btn btn-primary pull-right\" href=\"javascript://\"\n                            (click)=\"assignNow()\">{{'leads.assign' | translate}}</a>\n                    </div>\n                </div>\n                <div class=\"spacer40\"></div>\n                <div *ngIf=\"showSearchText\">\n                    <p class=\"show-not-found\">{{'leads.searchCSRBuyer' | translate}}</p>\n                </div>\n                <div class=\"modal-table-data\" malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\">\n                    <table class=\"table\">\n                        <tr *ngFor=\"let item of assign.items\">\n                            <td *ngIf=\"item.is_blocked!=1\">\n                                <div class=\"n-avail-profile\">\n                                    <img [src]=\"item.image| img:'small'\" onerror='src=\"assets/img/default_img.png\"'\n                                        alt=\"img\">\n                                    <div class=\"n-avail-info\">\n                                        <p class=\"p12\">{{item.name | titlecase}}</p>\n                                        <p class=\"p10\">{{'leads.phone' | translate}} :\n                                            {{item.dial_code ? item.dial_code :\n                                            constant.dial_code}}-{{item.phone.trim()}}\n                                        </p>\n                                    </div>\n                                </div>\n                            </td>\n                            <td *ngIf=\"item.is_blocked!=1\">\n                                <label class=\"cust-check-bx float-right\">\n                                    <input type=\"radio\" name=\"notary_id\" (click)=\"assignItem = item\">\n                                    <span class=\"checkmark\"></span>\n                                </label>\n                            </td>\n                        </tr>\n                        <tr *ngIf=\"assign?.items?.length==0\">\n                            <p class=\"show-not-found\">{{'leads.noCSRBuyer' | translate}}</p>\n                        </tr>\n                    </table>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/layout/leads/csr-buyer/csr-buyer.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/layout/leads/csr-buyer/csr-buyer.component.ts ***!
  \***************************************************************/
/*! exports provided: CsrBuyerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CsrBuyerComponent", function() { return CsrBuyerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var src_app_services_leads_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/leads.service */ "./src/app/services/leads.service.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var CsrBuyerComponent = /** @class */ (function () {
    function CsrBuyerComponent(admin, constant, route, spinner, leadsService, router, translate) {
        var _this = this;
        this.admin = admin;
        this.constant = constant;
        this.route = route;
        this.spinner = spinner;
        this.leadsService = leadsService;
        this.router = router;
        this.translate = translate;
        this.parameter = {};
        this.location = {};
        this.assign = {};
        this.items = [];
        this.today = new Date();
        this.users = [];
        this.initSelection = false;
        this.dash = {
            lead_total: 0,
            lead_without_broker: 0,
            lead_information_filled: 0,
            lead_broker_assigned: 0
        };
        this.chartView = [];
        this.allSelected = false;
        this.scrollbarOptions = { axis: 'y', theme: 'dark' };
        this.changeFilter = function (key, value) {
            _this.parameter[key] = value;
            _this.getListing();
        };
    }
    CsrBuyerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.locale = {
            firstDayOfWeek: 0,
            dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
            dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
            dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
            monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
            monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun',
                'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
            today: 'Hoy',
            clear: 'Clara',
            dateFormat: 'mm/dd/yy',
            weekHeader: 'Wk'
        };
        this.showSearchText = true;
        this.parameter.is_selected = false;
        this.parameter.keyword = '';
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        this.parameter.flag = this.leadsService.buyerLeadsFlag ? this.leadsService.buyerLeadsFlag : this.constant.flag;
        this.parameter.total = 0;
        this.parameter.count_flag = this.leadsService.buyerLeadsCountFlag ? this.leadsService.buyerLeadsCountFlag : this.constant.count_flag;
        this.route.params.subscribe(function (params) {
            _this.parameter.assignee_id = params.id;
        });
        this.getCountries();
        this.getListing();
        this.getCSRDashBoardData();
        Object.assign(this, this.chartView);
    };
    CsrBuyerComponent.prototype.getCountries = function () {
        var _this = this;
        this.admin.postDataApi('getCountryLocality', {}).subscribe(function (r) {
            _this.location.countries = r['data'];
        });
    };
    CsrBuyerComponent.prototype.onCountryChange = function (id) {
        this.parameter.country_id = id;
        this.location.states = [];
        this.parameter.state_id = '0';
        this.location.cities = [];
        this.parameter.city_id = '0';
        this.location.localities = [];
        this.parameter.locality_id = '0';
        if (!id || id === '0') {
            return false;
        }
        var selectedCountry = this.location.countries.filter(function (x) { return x.id.toString() === id; });
        this.location.states = selectedCountry[0].states;
    };
    CsrBuyerComponent.prototype.onStateChange = function (id) {
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
    CsrBuyerComponent.prototype.onCityChange = function (id) {
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
    CsrBuyerComponent.prototype.onLocalityChange = function (id) {
        if (!id || id === '0') {
            return false;
        }
        this.parameter.locality_id = id;
    };
    CsrBuyerComponent.prototype.changeFlag = function (flag) {
        this.parameter.flag = flag;
        this.parameter.count_flag = 1;
        this.leadsService.buyerLeadsFlag = flag;
        this.resetDates();
        this.getListing();
        this.getCSRDashBoardData();
    };
    CsrBuyerComponent.prototype.changeCountFlag = function (flag) {
        this.parameter.count_flag = flag;
        this.leadsService.buyerLeadsCountFlag = flag;
        this.getListing();
    };
    CsrBuyerComponent.prototype.getCsrListing = function () {
        var _this = this;
        this.initSelection = true;
        this.users = [];
        var input = new FormData();
        if (this.parameter.keyword) {
            input.append('keyword', this.parameter.keyword);
        }
        this.admin.postDataApi('getCsrBuyers', input).subscribe(function (success) {
            _this.users = success.data;
        });
    };
    CsrBuyerComponent.prototype.resetFilters = function () {
        this.location.countries = JSON.parse(JSON.stringify(this.location.countries));
        this.onCountryChange('0');
        this.parameter.is_selected = false;
        this.parameter.page = this.constant.p;
        this.parameter.flag = 2;
        this.parameter.total = 0;
        this.parameter.keyword = '';
        this.parameter.count_flag = 1;
        this.resetDates();
        this.getListing();
        this.getCSRDashBoardData();
    };
    CsrBuyerComponent.prototype.resetDates = function () {
        this.parameter.min = '';
        this.parameter.max = '';
    };
    CsrBuyerComponent.prototype.closeCsrListing = function () {
        var _this = this;
        setTimeout(function () {
            _this.users = [];
        }, 200);
    };
    CsrBuyerComponent.prototype.selectCsrUser = function (user) {
        this.selectedUser = user;
        this.users = [];
        this.parameter.keyword = '';
        this.initSelection = false;
        this.getListing();
        this.getCSRDashBoardData();
    };
    CsrBuyerComponent.prototype.removeCsrUser = function () {
        this.selectedUser = '';
        this.parameter.keyword = '';
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        // this.parameter.flag = 2;
        this.parameter.total = 0;
        this.parameter.count_flag = 1;
        this.getListing();
        this.getCSRDashBoardData();
    };
    CsrBuyerComponent.prototype.getCSRDashBoardData = function () {
        var _this = this;
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
        if (this.selectedUser) {
            input.assignee_id = this.selectedUser.id;
        }
        else if (this.parameter.assignee_id) {
            input.assignee_id = this.parameter.assignee_id;
        }
        this.admin.postDataApi('leads/csr-buyer-dash-count', input).subscribe(function (r) {
            _this.dash = r.data;
            _this.chartView = [
                {
                    'name': _this.translate.instant('leads.infoFilled'),
                    'value': parseInt(_this.dash.lead_information_filled, 10)
                },
                {
                    'name': _this.translate.instant('leads.withAgentAssigned'),
                    'value': parseInt(_this.dash.lead_broker_assigned, 10)
                },
                {
                    'name': _this.translate.instant('leads.withoutAgentAssigned'),
                    'value': parseInt(_this.dash.lead_without_broker, 10)
                }
            ];
        });
    };
    CsrBuyerComponent.prototype.getListing = function () {
        var _this = this;
        this.items = [];
        this.parameter.noResultFound = false;
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
        if (this.selectedUser) {
            input.assignee_id = this.selectedUser.id;
        }
        else if (this.parameter.assignee_id) {
            input.assignee_id = this.parameter.assignee_id;
        }
        this.spinner.show();
        this.admin.postDataApi('leads/csr-buyer', input).subscribe(function (success) {
            _this.spinner.hide();
            _this.items = success.data;
            if (_this.items.length <= 0) {
                _this.parameter.noResultFound = true;
            }
            _this.parameter.total = success.total_count;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    CsrBuyerComponent.prototype.getPage = function (page) {
        this.parameter.page = page;
        this.getListing();
    };
    CsrBuyerComponent.prototype.sort_by = function (sort_by_flag) {
        if (this.parameter.sort_by_flag !== sort_by_flag) {
            this.parameter.sort_by_flag = sort_by_flag;
            this.parameter.sort_by_order = 0;
        }
        else {
            this.parameter.sort_by_order = this.parameter.sort_by_order ? 0 : 1;
        }
        this.getListing();
    };
    CsrBuyerComponent.prototype.selectAll = function (is_selected) {
        var _this = this;
        this.parameter.is_selected = !is_selected;
        this.items.forEach(function (item) {
            item.selected = _this.parameter.is_selected;
        });
    };
    CsrBuyerComponent.prototype.bulkAssign = function () {
        this.showSearchText = false;
        var leads_ids = this.items.filter(function (x) { return x.selected; }).map(function (y) { return y.id; });
        if (leads_ids.length === 0) {
            this.showSearchText = true;
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseAtleast1Lead'), 'error');
            return false;
        }
        if (!this.assign.items) {
            this.getAssignListing();
        }
        this.openAssignModel.nativeElement.click();
    };
    CsrBuyerComponent.prototype.getAssignListing = function () {
        var _this = this;
        var input = {
            keyword: this.assign.keyword
        };
        this.spinner.show();
        this.admin.postDataApi('getCsrBuyers', input).subscribe(function (success) {
            _this.spinner.hide();
            _this.assign.items = success.data;
        });
    };
    CsrBuyerComponent.prototype.assignNow = function () {
        var _this = this;
        var leads_ids = this.items.filter(function (x) { return x.selected; }).map(function (y) { return y.id; });
        var users_ids = this.items.filter(function (x) { return x.selected; }).map(function (y) { return y.admin.id; });
        var input = {
            csr_buyer_id: this.assignItem.id,
            leads: leads_ids,
            users: users_ids
        };
        this.spinner.show();
        this.admin.postDataApi('leads/bulkAssignBuyer', input).subscribe(function (r) {
            _this.spinner.hide();
            swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.assignedSuccessfully'), 'success');
            _this.closeAssignModel.nativeElement.click();
            _this.getListing();
            _this.allSelected = false;
        }, function (error) {
            _this.spinner.hide();
            _this.closeAssignModel.nativeElement.click();
            swal(_this.translate.instant('swal.error'), error.error.message, 'error');
        });
    };
    CsrBuyerComponent.prototype.viewLeadDetails = function (lead_id, data) {
        this.leadsService.setLeadDetailData(data);
        this.router.navigate(['/dashboard/leads/csr-buyers', lead_id]);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('openAssignModel'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CsrBuyerComponent.prototype, "openAssignModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('closeAssignModel'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CsrBuyerComponent.prototype, "closeAssignModel", void 0);
    CsrBuyerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-csr-buyer',
            template: __webpack_require__(/*! ./csr-buyer.component.html */ "./src/app/layout/leads/csr-buyer/csr-buyer.component.html"),
            styles: [__webpack_require__(/*! ./csr-buyer.component.css */ "./src/app/layout/leads/csr-buyer/csr-buyer.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_1__["AdminService"],
            src_app_common_constants__WEBPACK_IMPORTED_MODULE_2__["Constant"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerService"],
            src_app_services_leads_service__WEBPACK_IMPORTED_MODULE_6__["LeadsService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateService"]])
    ], CsrBuyerComponent);
    return CsrBuyerComponent;
}());



/***/ }),

/***/ "./src/app/layout/leads/csr-closer/csr-closer-detail/csr-closer-detail.component.css":
/*!*******************************************************************************************!*\
  !*** ./src/app/layout/leads/csr-closer/csr-closer-detail/csr-closer-detail.component.css ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9sZWFkcy9jc3ItY2xvc2VyL2Nzci1jbG9zZXItZGV0YWlsL2Nzci1jbG9zZXItZGV0YWlsLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/layout/leads/csr-closer/csr-closer-detail/csr-closer-detail.component.html":
/*!********************************************************************************************!*\
  !*** ./src/app/layout/leads/csr-closer/csr-closer-detail/csr-closer-detail.component.html ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n<div class=\"white-bg padding15\">\n    <div class=\"row\">\n        <div class=\"col-lg-3 col-md-12 col-sm-6 col-12\">\n            <div class=\"df-profile\">\n            <a routerLink=\"../\"><i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i></a>\n            \n            <img *ngIf=\"leadData?.user?.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\"\n                    [defaultImage]=\"leadData?.user?.image| img:'thumb'\" [lazyLoad]=\"leadData?.user?.image\">\n            <img *ngIf=\"!leadData?.user?.image\" src=\"assets/img/default_img.png\" alt=\"img\">\n    \n                    <div class=\"df-info\" *ngIf=\"leadData?.user\">\n                <p class=\"p14 text-ellipsis120\">{{leadData.user.name | titlecase}}</p>\n                <!-- <p class=\"p12\">Status: Open</p> -->\n                <p class=\"p12\">\n                    {{leadData?.user?.dial_code ? leadData?.user?.dial_code : leadData?.dial_code}}-{{leadData?.user?.phone ? leadData?.user?.phone : leadData?.phone}}\n                </p>\n            </div>\n            </div>\n        </div>\n        <div class=\"col-lg-7 col-md-12 col-sm-6 col-12\">\n            <div class=\"profile-list\">\n            <ul>\n                <li>\n                    <div class=\"df-info\">\n                        <p class=\"p14 marginB0\" *ngIf=\"leadData?.admin\">{{leadData.admin.name | titlecase}}</p>\n                        <p class=\"p12\">{{'leadDetails.CSRBuyer' | translate}}</p>\n                    </div>\n                </li>\n                <li>\n                    <div class=\"df-info\" *ngIf=\"leadData?.broker\">\n                        <p class=\"p14 marginB0\">{{leadData.broker.name | titlecase}}</p>\n                        <p class=\"p12\">{{leadData?.broker?.is_external_agent==1 ? ('leadDetails.outsideAgent' | translate) : ('leadDetails.inhouseAgent' | translate)}}</p>\n                    </div>\n                </li>\n                <li>\n                    <div class=\"df-info\" *ngIf=\"leadData?.closer\">\n                        <p class=\"p14 marginB0\">{{leadData.closer.name | titlecase}}</p>\n                        <p class=\"p12\">{{'leadDetails.CSRClosure' | translate}}</p>\n                    </div>\n                </li>\n            </ul>\n            </div>\n        </div>\n        <div class=\"col-lg-2 col-md-12 col-sm-12 col-12\">\n            <div class=\"row\">\n                <div class=\"col-sm-12 btn-cont text-right\">\n                    <a *ngIf=\"leadData?.lead_status_closer!=1 &&\n                    (admin?.admin_acl['Closer Lead Management']?.can_update==1 || admin?.permissions?.can_csr_closer==1)\" (click)=\"markLeadClose()\" class=\"btn btn-fourth\" href=\"javascript://\">\n                    {{'leadDetails.closeLead' | translate}}\n                    </a>\n                    <a *ngIf=\"leadData?.lead_status_closer==1\" style=\"cursor: auto;\" class=\"btn btn-fourth\" href=\"javascript://\">\n                    {{'leadDetails.leadClosed' | translate}}\n                    </a>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class=\"spacer30\"></div>\n<div class=\"row\">\n    <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\">\n        <div class=\"white-bg padding30\">\n            <div class=\"row\">\n            <div class=\"col-md-6\">\n                <h6>{{'leadDetails.details' | translate}}</h6>\n            </div>\n            <!-- <div class=\"col-md-6\">\n                <div class=\"edit text-right\"><a href=\"javascript://\">Edit</a></div>\n            </div> -->\n            </div>\n            <div class=\"details-table\">\n            <table class=\"table\">\n                <tr>\n                    <td style=\"padding-left:0\"><label>{{'leadDetails.fullName' | translate}}</label></td>\n                    <td colspan=\"2\" *ngIf=\"leadData?.name\">{{leadData.user.name | titlecase}}</td>\n                </tr>\n                <tr>\n                    <td style=\"padding-left:0\"><label>{{'leadDetails.contactNumber' | translate}}</label></td>\n                    <td colspan=\"2\" *ngIf=\"leadData?.phone\">{{leadData.user.dial_code ? leadData.user.dial_code : constant.dial_code}}-{{leadData.user.phone}}</td>\n                </tr>\n                <tr>\n                    <td style=\"padding-left:0\"><label>{{'leadDetails.emailAddress' | translate}}</label></td>\n                    <td colspan=\"2\" *ngIf=\"leadData?.email\">{{leadData.user.email}}</td>\n                </tr>\n                <tr>\n                    <td style=\"padding-left:0\"><label>{{'leadDetails.interestedIn' | translate}}</label></td>\n                    <td *ngIf=\"leadData?.configuration\">\n                        <span *ngFor=\"let conf of leadData?.configuration; let ii=index\">\n                            <app-property-configuration *ngIf=\"conf\" [configuration]=\"conf\"></app-property-configuration>\n                            <span *ngIf=\"ii<leadData?.configuration?.length-1\"> | </span><br>\n                        </span>\n                        <span *ngIf=\"leadData?.configuration?.length==0\">{{'leadDetails.NA' | translate}}</span>\n                    </td>\n                </tr>\n                <tr>\n                    <td style=\"padding-left:0\"><label><strong>{{'leadDetails.propertySelected' | translate}}</strong></label></td>\n                    <td *ngIf=\"leadData?.selected_properties?.length!=0\">\n                        <p class=\"p14 marginB0\">\n                            <app-property-configuration *ngIf=\"leadData?.selected_properties[0]?.property?.configuration\" [configuration]=\"leadData?.selected_properties[0]?.property?.configuration\"></app-property-configuration>\n                        </p>\n                        <p title=\"{{'table.title.building' | translate}}\" class=\"p12 marginB0\"><strong>{{leadData?.selected_properties[0]?.property?.building?.name}}</strong></p>\n                        <p title=\"{{'table.title.developer' | translate}}\" class=\"p11\"><i>{{leadData?.selected_properties[0]?.property?.building?.developer?.name | titlecase}}</i></p>\n                        <p class=\"marginB0\" *ngIf=\"leadData?.selected_properties?.length!=0\">\n                            <a class=\"view-all-2\" href=\"javascript://\" (click)=\"viewPropertyDetails(leadData?.selected_properties[0])\"> {{'leadDetails.viewProperty' | translate}}</a>\n                        </p>\n                    </td>\n                    <!-- <td *ngIf=\"leadData?.selected_properties?.length!=0\">\n                        <a class=\"view-all-2\" href=\"javascript://\" (click)=\"viewPropertyDetails(leadData?.selected_properties[0])\"> View Property</a>\n                    </td> -->\n                </tr>\n                \n                <!-- Notary Availabilities -->\n                <tr *ngIf=\"leadData?.sale_rent==1\">\n                    <td  style=\"padding-left:0\"><label><strong>{{'leadDetails.notaryAvailabilities' | translate}}</strong></label></td>\n                    <td colspan=\"2\" *ngIf=\"leadData?.selected_properties[0]?.selected_noatary && leadData?.selected_properties[0]?.selected_noatary[0]?.noatary_availability?.length!=0; else noAvailability3\">\n                        <p *ngFor=\"let na of leadData?.selected_properties[0]?.selected_noatary[0]?.noatary_availability; let m=index\" class=\"date\">\n                            <span *ngIf=\"m<2\">{{na.date_time | moment}}</span>\n                        </p>\n                        <span class=\"read-more\" *ngIf=\"leadData?.selected_properties[0]?.selected_noatary[0]?.noatary_availability.length>2\" data-toggle=\"modal\" data-target=\"#get-availability1\">Read more</span>\n                    </td>\n                    <ng-template #noAvailability3>\n                        <td colspan=\"2\"><p>{{'leadDetails.noAvailabilityGivenbyNotaryYet' | translate}}</p></td>\n                    </ng-template>\n                </tr>\n\n                <!-- Meeting Schedule -->\n                <tr *ngIf=\"leadData?.sale_rent==1\">\n                    <td  style=\"padding-left:0\"><label><strong>{{'leadDetails.meetingSchedule' | translate}}</strong></label></td>\n                    <td colspan=\"2\" class=\"cursor-pointer\">\n                        <p class=\"date\" *ngIf=\"scheduleMeeting.appointment_date; else noAvailability4\" data-toggle=\"modal\" data-target=\"#get-availability2\">\n                            <span title=\"{{'table.title.rescheduleMeeting' | translate}}\">{{scheduleMeeting.appointment_date | moment}}</span>\n                        </p>\n                        <ng-template #noAvailability4>\n                            <p title=\"{{'table.title.scheduleMeeting' | translate}}\" data-toggle=\"modal\" data-target=\"#get-availability2\">{{'leadDetails.meetingNotSchedule' | translate}}</p>\n                        </ng-template>\n                    </td>\n                </tr>\n\n            </table>\n            </div>\n        </div>\n\n        <!-- notes start -->\n        <app-notes *ngIf=\"parameter?.lead_id\" [sent_as]=\"parameter.sent_as\" [lead_id]=\"parameter.lead_id\"></app-notes>\n        <!-- notes end -->\n\n        <!-- <div class=\"spacer15\"></div> -->\n        <div *ngIf=\"leadData?.sale_rent==1\" class=\"bank-assigned-now white-bg\">\n            <div class=\"row\">\n                <div class=\"col-md-6 col-sm-6 col-12 b-left\">\n                <p class=\"p13\" *ngIf=\"selectedProperties?.noataries && selectedProperties.noataries.length==0\">{{'leadDetails.noNotaryAssigned' | translate}}</p>\n                \n                <!-- Assign notary -->\n                <a style=\"display:none;\" #showNotaries href=\"javascript://\" class=\"green green-color\" data-toggle=\"modal\" data-target=\"#notary-avail\">{{'leadDetails.assignNow' | translate}}</a>\n                <a *ngIf=\"selectedProperties?.noataries && selectedProperties.noataries.length==0 && (admin?.admin_acl['Closer Lead Management']?.can_update==1 || admin?.permissions?.can_csr_closer==1); else noNotaryPermission\"\n                    href=\"javascript://\" class=\"green-color green\" (click)=\"getNotaries(selectedProperties.property_id, '', 1)\">{{'leadDetails.assignNow' | translate}}</a>\n                \n                <ng-template *ngIf=\"selectedProperties?.noataries && selectedProperties.noataries.length==0\" #noNotaryPermission>\n                    <a class=\"green-color green\">{{'leadDetails.assignNow' | translate}}</a>\n                </ng-template>\n\n                <div class=\"d-flex\" *ngIf=\"selectedProperties?.noataries && selectedProperties.noataries.length!=0\">\n                    \n                    <!-- <img [src]=\"selectedProperties?.noataries && selectedProperties.noataries[0].image\" onerror='src=\"assets/img/house.png\"' alt=\"img\"> -->\n\n                    <img *ngIf=\"selectedProperties.noataries[0].image\" onerror='src=\"assets/img/house.png\"' alt=\"img\"\n                            [defaultImage]=\"selectedProperties.noataries[0].image| img:'thumb'\" [lazyLoad]=\"selectedProperties.noataries[0].image\">\n                    <img *ngIf=\"!selectedProperties.noataries[0].image\" src=\"assets/img/house.png\" alt=\"img\">\n                    \n                    <div class=\"bank-info\">\n                        <p title=\"{{'table.title.notary' | translate}}\" class=\"p14\">{{selectedProperties.noataries[0].name | titlecase}}</p>\n                        <p class=\"p11 marginB10\">{{selectedProperties.noataries[0].dial_code ? selectedProperties.noataries[0].dial_code : constant.dial_code}}-{{selectedProperties.noataries[0].phone}}</p>\n                        \n                        <!-- change notary -->\n                        <a href=\"javascript://\" #showNotaries style=\"display: none;\" data-toggle=\"modal\" data-target=\"#notary-avail\" class=\"green-color green\">{{'leadDetails.change' | translate}}</a>\n                        <a *ngIf=\"(admin?.admin_acl['Closer Lead Management']?.can_update==1 || admin?.permissions?.can_csr_closer==1); else noNotaryChangePermission\" href=\"javascript://\" class=\"green-color green\" (click)=\"getNotaries(selectedProperties.property_id, '', 1)\">Change</a>\n                        <ng-template #noNotaryChangePermission>\n                            <a href=\"javascript://\" class=\"green-color green\">{{'leadDetails.change' | translate}}</a>\n                        </ng-template>\n                    </div>\n                    </div>\n                </div>\n                <div class=\"col-md-6 col-sm-6 col-12 b-right\">\n                <p class=\"p13\" *ngIf=\"selectedProperties?.banks && selectedProperties.banks.length==0\">{{'leadDetails.noBankAssigned' | translate}}</p>\n                \n                <!-- Assign bank -->\n                <a style=\"display:none;\" #showBanks href=\"javascript://\" class=\"green green-color\" data-toggle=\"modal\" data-target=\"#bank-listing\">{{'leadDetails.assignNow' | translate}}</a>\n                <a *ngIf=\"selectedProperties?.banks && selectedProperties.banks.length==0 && (admin?.admin_acl['Closer Lead Management']?.can_update==1 || admin?.permissions?.can_csr_closer==1); else noBankPermission\"\n                href=\"javascript://\" class=\"green-color green\" (click)=\"getBanks(selectedProperties.property_id, '', 1)\">{{'leadDetails.assignNow' | translate}}</a>\n                \n                <ng-template *ngIf=\"selectedProperties?.banks && selectedProperties.banks.length==0\" #noBankPermission>\n                    <a href=\"javascript://\" class=\"green-color green\">{{'leadDetails.assignNow' | translate}}</a>\n                </ng-template>\n\n                <div class=\"d-flex\" *ngIf=\"selectedProperties?.banks && selectedProperties.banks.length!=0\">\n                    \n                    <!-- <img [src]=\"selectedProperties?.banks && selectedProperties.banks[0].image\" onerror='src=\"assets/img/bank-building.png\"' alt=\"img\"> -->\n\n                    <img *ngIf=\"selectedProperties.banks[0].image\" onerror='src=\"assets/img/house.png\"' alt=\"img\"\n                            [defaultImage]=\"selectedProperties.banks[0].image| img:'thumb'\" [lazyLoad]=\"selectedProperties.banks[0].image\">\n                    <img *ngIf=\"!selectedProperties.banks[0].image\" src=\"assets/img/house.png\" alt=\"img\">\n\n                    <div class=\"bank-info\">\n                        <p title=\"{{'table.title.bank' | translate}}\" class=\"p14\">{{selectedProperties.banks[0].name | titlecase}}</p>\n                        <p class=\"p11 marginB10\">{{selectedProperties?.banks[0]?.branch ? selectedProperties?.banks[0]?.branch : ('leadDetails.NA' | translate)}}</p>\n                        \n                        <!-- change bank -->\n                        <a href=\"javascript://\" #showBanks style=\"display: none;\" data-toggle=\"modal\" data-target=\"#bank-listing\" class=\"green-color green\">{{'leadDetails.change' | translate}}</a>\n                        <a *ngIf=\"(admin?.admin_acl['Closer Lead Management']?.can_update==1 || admin?.permissions?.can_csr_closer==1); else noBankChangePermission\" href=\"javascript://\" class=\"green-color green\" (click)=\"getBanks(selectedProperties.property_id, '', 1)\">{{'leadDetails.change' | translate}}</a>\n                        <ng-template #noBankChangePermission>\n                            <a href=\"javascript://\" class=\"green-color green\">{{'leadDetails.change' | translate}}</a>\n                        </ng-template>\n                    </div>\n                </div>\n                </div>\n            </div>\n        </div>\n\n        <!-- <div class=\"spacer15\"></div> -->\n        <!-- *ngIf=\"leadData?.sale_rent==1\" -->\n        <div class=\"payment-status-table white-bg\">\n            <div class=\"page-title-2 marginB0 border-0\">\n                <div class=\"row\">\n                <div class=\"col-md-6 col-sm-6 col-12\">\n                    <h4>{{'leadDetails.paymentStatus' | translate}}</h4>\n                </div>\n                    <div class=\"col-md-6 col-sm-6 col-12\">\n                    <div class=\"grand-total\">${{selectedProperties.total_amount}}</div>\n                </div>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-12\">\n                <table class=\"table\">\n                    <tr>\n                        <td style=\"width:40%\"><label>{{'leadDetails.tokenAmount' | translate}}</label></td>\n                        <td style=\"width:40%\"><strong>${{selectedProperties.token_money}}</strong></td>\n                        <td class=\"text-right\" style=\"width:20%\">\n                            <div class=\"pending-status\">{{selectedProperties.status==1 ? ('leadDetails.paid' | translate) : ('leadDetails.pending' | translate)}}</div>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td style=\"width:40%\"><label>{{'leadDetails.commissionInPerc' | translate}}</label></td>\n                        <td style=\"width:40%\"><strong>{{selectedProperties.commision}}%</strong></td>\n                        <td style=\"width:20%\">&nbsp;</td>\n                    </tr>\n                    <tr>\n                        <td style=\"width:40%\">\n                            <label>{{'leadDetails.pendingAmount' | translate}}</label>\n                            <small>({{'leadDetails.fullProperty' | translate}})</small>\n                        </td>\n                        <td style=\"width:40%\">\n                            <strong *ngIf=\"!showInput && selectedProperties.pending_amount==null\">${{selectedProperties.total_amount - selectedProperties.token_money}}</strong>\n                            <strong *ngIf=\"!showInput && selectedProperties.pending_amount!=null\">${{selectedProperties.pending_amount}}</strong>\n                            <input style=\"width: 90%;\" [(ngModel)]=\"pen_amount\" *ngIf=\"showInput\" type=\"number\" value=\"{{selectedProperties.total_amount - selectedProperties.token_money}}\">\n                        </td>\n                        <td style=\"width:20%\">\n                            <a *ngIf=\"!showInput\" title=\"{{'table.title.editAmount' | translate}}\" (click)=\"showInput=true\" class=\"green-color fontW500\" href=\"javascript://\">{{'leadDetails.edit' | translate}}</a>\n                            <a *ngIf=\"showInput\" title=\"{{'table.title.saveAmount' | translate}}\" (click)=\"updatePropertyAmount()\" class=\"green-color fontW500\" href=\"javascript://\">{{'leadDetails.save' | translate}}</a>\n                            <!-- <button *ngIf=\"!showInput\" title=\"Edit Amount\" (click)=\"showInput=true\">\n                                <img src=\"assets/img/edit.png\" alt=\"img\">\n                            </button>\n                            <button *ngIf=\"showInput\" (click)=\"updatePropertyAmount()\">Save</button> -->\n                        </td>\n                    </tr>\n                </table>\n                </div>\n            </div>\n\n        </div>\n    </div>\n\n\n\n    <!-- chatting -->\n    <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\">\n        <!-- <div class=\"white-bg move-below\">\n            <div class=\"page-title-3 marginB0\">\n                <h4><i><img src=\"assets/img/chat-icon.png\" alt=\"img\"></i> Chat</h4>\n            </div>\n            <div class=\"cust-tabs-4\">\n                <app-chat-tabs *ngIf=\"leadData?.user\" [lead_id]=\"parameter.lead_id\" [sent_as]=\"parameter.sent_as\"\n                    [user_id]=\"parameter.user_id\" [admin_id]=\"parameter.admin_id\" [leadData]=\"leadData\">\n                </app-chat-tabs>\n            </div>\n        </div> -->\n        \n        <div class=\"white-bg move-below\">\n            <div class=\"page-title-3 marginB0\">\n                <h4><i><img src=\"assets/img/chat-icon.png\" alt=\"img\"></i> {{'leadDetails.chat' | translate}}</h4>\n            </div>\n            <div class=\"cust-tabs-4\">\n                <ul class=\"nav nav-tabs\">\n                <li class=\"nav-item\">\n                    <a [ngClass]=\"{'active':chat_admin_sent_as==constant.userType.user_buyer}\" (click)=\"getLeadConversation(constant.userType.user_buyer, true)\" class=\"nav-link\">{{'leadDetails.buyer' | translate}}</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a [ngClass]=\"{'active':chat_admin_sent_as==constant.userType.user_seller_dev}\" (click)=\"getLeadConversation(constant.userType.user_seller_dev, true)\" class=\"nav-link\">{{'leadDetails.seller' | translate}}</a>\n                </li>\n                <li class=\"nav-item\" *ngIf=\"selectedProperties.noataries && selectedProperties.noataries.length!=0 && leadData?.sale_rent==1\">\n                    <a [ngClass]=\"{'active':chat_admin_sent_as==constant.userType.notary}\" (click)=\"getLeadConversation(constant.userType.notary, true)\" class=\"nav-link\">{{'leadDetails.notary' | translate}}</a>\n                </li>\n                <li class=\"nav-item\" *ngIf=\"selectedProperties.banks && selectedProperties.banks.length!=0 && leadData?.sale_rent==1\">\n                    <a [ngClass]=\"{'active':chat_admin_sent_as==constant.userType.bank}\" (click)=\"getLeadConversation(constant.userType.bank, true)\" class=\"nav-link\">{{'leadDetails.bank' | translate}}</a>\n                </li>\n                </ul>\n                \n                <div class=\"tab-content\">\n                    <div class=\"chat-window white-bg\">\n                    <div class=\"chat-top\">\n                        <a href=\"javascript://\">\n                        <div class=\"profile\">\n                            <div class=\"fig-block\">\n                            \n                            <!-- <img [src]=\"chat_admin?.image\" onerror=\"this.src='assets/img/default_img.png'\" alt=\"img\" /> -->\n                            <img *ngIf=\"chat_admin?.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\"\n                                    [defaultImage]=\"chat_admin?.image| img:'thumb'\" [lazyLoad]=\"chat_admin?.image\">\n                            <img *ngIf=\"!chat_admin?.image\" src=\"assets/img/default_img.png\" alt=\"img\">\n                            \n                            </div>\n                            <div class=\"profile-info\">\n                            <h6>{{chat_admin?.name | titlecase}}</h6>\n                            <p *ngIf=\"chat_admin_sent_as == 3\" class=\"p12\">{{'leadDetails.CSRClosure' | translate}}</p>\n                            <p *ngIf=\"chat_admin_sent_as == 6\" class=\"p12\">{{'leadDetails.notary' | translate}}</p>\n                            <p *ngIf=\"chat_admin_sent_as == 5\" class=\"p12\">{{'leadDetails.bank' | translate}}</p>\n                            </div>\n                        </div>\n                        </a>\n                    </div>\n                    <div malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\" class=\"chat-area scrollbox\" #chatWin>\n                        <div *ngFor=\"let m of messages; let i=index\" [ngClass]=\"m.conversation_user.admin_id == parameter.admin_id ? 'chat-user-one' :'chat-user-two'\" class=\"chat-user\">\n                            <p *ngIf=\"m.message_type == 1\" style=\"word-wrap: break-word;\">\n                                <span>{{m.message}}</span>\n                            </p>\n\n                            <a *ngIf=\"m.message_type == 2\" href=\"{{m.image}}\" data-lightbox=\"image\">\n                                <span *ngIf=\"!m.loading\">\n                                    <img class=\"ui bordered small image\" src=\"{{m.image}}\">\n                                </span>\n                                <span *ngIf=\"m.loading\" class=\"m-loader\">\n                                    <img src=\"assets/img/loading_image_1.gif\">\n                                </span>\n                            </a>\n                            \n                            <div class=\"chat-vid\" *ngIf=\"m.message_type == 3 && !m.play\">\n                                <span>\n                                    <div *ngIf=\"m.loading\" class=\"loaderr\"></div>\n                                    <img *ngIf=\"m.image\" class=\"ui bordered small image\" src=\"{{m.image}}\">\n                                    <img *ngIf=\"!m.loading\" class=\"vid-icon\" (click)=\"playVideo(i)\" src=\"assets/img/play-button.png\" />\n                                    <div class=\"clearfix\"></div>\n                                </span>\n                            </div>\n                            <video *ngIf=\"m.message_type == 3 && m.play\" src=\"{{m.video}}\" autoplay type=\"video/mp4\" controls></video>\n                            \n                            <div class=\"chat-shared-file\" *ngIf=\"m.message_type == 4\">\n                                <p *ngIf=\"m.loading\" class=\"m-loader\">\n                                    <img class=\"text-message\" src=\"assets/img/loading-p.gif\">\n                                </p>\n                                <span *ngIf=\"!m.loading\">\n                                    <a href=\"javascript://\" target=\"_blank\" href=\"{{m.attachment}}\"><span>{{m.attachment_name}}</span></a>\n                                </span>\n                            </div>\n\n                            <a *ngIf=\"m.message_type == 5\" href=\"{{m.property_url}}\" target=\"_blank\" title=\"{{'table.title.propertyImage' | translate}}\" >\n                                <span>\n                                    <img class=\"ui bordered small image\" src=\"{{m.image}}\">\n                                    <div *ngIf=\"m.loading\" class=\"loaderr\"></div>\n                                </span>\n                                <h5>{{m.message}}</h5>\n                            </a>\n            \n                            <span class=\"time\" *ngIf=\"m.id\">{{m.updated_at| moment}}</span>\n                            <span class=\"time\" *ngIf=\"!m.id\">{{m.updated_at|date:'h:mm a'|lowercase}}, {{m.updated_at|date: 'MMM d y'}}</span>\n                            \n                        </div>                \n                    </div>\n                                            \n                    <div style=\"position: absolute; z-index: 1; margin: 0px; padding: 0px; other: block; left: 581px; top: 91px;\"><div class=\"enscroll-track track3\" style=\"position: relative; height: 367px;\"><a href=\"\" class=\"handle3\" style=\"position: absolute; z-index: 1; height: 199.244px; top: 0px;\"><div class=\"top\"></div><div class=\"bottom\"></div></a></div></div>\n    \n                    <div class=\"chat-text\">\n                        <div class=\"dropdown attach-items\">\n                            <a *ngIf=\"(admin?.admin_acl['Closer Lead Management']?.can_update==1 || admin?.permissions?.can_csr_closer==1); else noPermissiom\" href=\"javascript://\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" #optionsButton>\n                                <i class=\"fa fa-paperclip\" aria-hidden=\"true\"></i>\n                            </a>\n\n                            <ng-template #noPermissiom>\n                                <a><i class=\"fa fa-paperclip\" aria-hidden=\"true\"></i></a>\n                            </ng-template>\n                            <div class=\"dropdown-menu\">\n                            <div class=\"dropdown-item\">\n                                <input type=\"file\" name=\"image\" accept=\"image/*\" (change)=\"onSelectFile('image', $event)\">\n                                <i class=\"fa fa-camera\" aria-hidden=\"true\"></i>\n                                <span>{{'leadDetails.photo' | translate}}</span>\n                            </div>\n                            <a class=\"dropdown-item\"> \n                                <input type=\"file\" name=\"video1\" accept=\"video/mp4,video/x-m4v,video/*\" (change)=\"showCanvas($event)\">\n                                <i class=\"fa fa-video-camera\" aria-hidden=\"true\"></i>\n                                <span>{{'leadDetails.video' | translate}}</span>\n                            </a>\n                            <a class=\"dropdown-item\">    \n                                <input type=\"file\" name=\"attachment\" accept=\".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf\" (change)=\"saveAttachment($event)\">\n                                <i class=\"fa fa-file\" aria-hidden=\"true\"></i>\n                                <span>{{'leadDetails.document' | translate}}</span>\n                            </a>\n                            <a class=\"dropdown-item cursor-pointer\" (click)=\"blockGetProperty.showModal()\">    \n                                <i class=\"fa fa-file\" aria-hidden=\"true\"></i>\n                                <span>{{'leadDetails.property' | translate}}</span>\n                            </a>\n                            </div>\n                        </div>\n                        <input id=\"message\" #msgInput autocomplete=\"off\" [(ngModel)]=\"textMessage\" (keyup.enter)=\"setText()\" class=\"chat-input\" type=\"text\" name=\"message\" placeholder=\"Type your message here …\">\n                        <video style=\"width: 100%; height: 100%;\" src=\"{{videoSrc}}\" class=\"video55\" type=\"video/mp4\" controls></video>\n                        <canvas style=\"display: none;\" width=\"800\" height=\"600\" id=\"canvas\"></canvas>\n    \n                        <button [disabled]=\"(admin?.admin_acl['Closer Lead Management']?.can_update==0 || admin?.permissions?.can_csr_closer==0)\" (click)=\"setText()\" class=\"btn\">{{'leadDetails.send' | translate}}</button>\n                        \n                    </div>\n                </div>\n    \n            </div>\n        </div>\n    </div>\n\n\n<app-block-get-property #blockGetProperty (itemSelect)=\"sendProperty($event)\"></app-block-get-property>\n\n\n    <div class=\"clearfix\"></div>\n    <div *ngIf=\"leadData?.sale_rent==1\" class=\"upload-document-block white-bg\">\n        <div class=\"page-title-2 border-0\">\n            <div class=\"row\">\n                <div class=\"col-9\">\n                <h4>{{'leadDetails.documents' | translate}}</h4>\n                </div>\n                <div class=\"col-3\">\n                <a *ngIf=\"(admin?.admin_acl['Closer Lead Management']?.can_update==1 || admin?.permissions?.can_csr_closer==1); else noDocumentPermission\" class=\"view pull-right\" href=\"javascript://\" (click)=\"updateDocumentChecklist()\">Save</a>\n                <ng-template #noDocumentPermission>\n                    <a class=\"view pull-right\" href=\"javascript://\">{{'leadDetails.save' | translate}}</a>\n                </ng-template>\n                </div>\n            </div>\n            <table class=\"table\">\n                <tr *ngFor=\"let document of selectedProperties.allDocuments; let i=index\">\n                <td>\n                    <label class=\"cust-check-bx\">{{document.name}}\n                    <input type=\"checkbox\" (click)=\"setValue(i)\" [checked]=\"document.is_selected == 1 ? 'checked' : ''\" name=\"document\">\n                    <span class=\"checkmark\"></span>\n                    </label>\n                </td>\n                </tr>\n            </table>\n        </div>\n    </div>\n    <div *ngIf=\"leadData?.sale_rent==1\" class=\"all-document-block white-bg\">\n        <div class=\"page-title-2 border-0\">\n        <div class=\"row\">\n        <div class=\"col-9\">\n            <h4>{{'leadDetails.save' | translate}}</h4>\n            <p class=\"p11 marginB0\">{{'leadDetails.fromBothSellerAndBuyer' | translate}}</p>\n\n            </div>\n            <div class=\"col-3 text-right\">\n                <a *ngIf=\"selectedProperties?.uploaded_documents?.length==0\" (click)=\"noDocumentUploaded()\" class=\"view\" href=\"javascript://\" >{{'leadDetails.view' | translate}}</a>\n                <a *ngIf=\"selectedProperties?.uploaded_documents?.length!=0\" class=\"view\" data-toggle=\"modal\" data-target=\"#uploaded-documents\" href=\"javascript://\" >{{'leadDetails.view' | translate}}</a>\n            </div>\n        </div>\n        </div>\n    </div>\n    </div>\n</div>\n</div>\n\n\n<div class=\"modal\" id=\"uploaded-documents\">\n    <div class=\"modal-dialog \">\n    <div class=\"modal-content notary-avail\">\n        <!-- <div class=\"modal-header modal-header-new\"> -->\n            <div class=\"modal-header modal-header-new\">\n            <h4 class=\"modal-title\">{{'leadDetails.uploadedDocuments' | translate}}</h4>\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n        </div>\n        <div class=\"modal-body\">\n            <table class=\"table\">\n                <tr *ngFor=\"let upDocument of selectedProperties.uploaded_documents\">\n                <td>\n                    <div class=\"n-avail-profile\">\n                        <div class=\"n-avail-info\">\n                            <p class=\"p14 marginB0\" *ngIf=\"upDocument.attachment_name\">{{upDocument.attachment_name}}</p>\n                            <!-- <p class=\"p12\" *ngIf=\"!upDocument.attachment_name\">{{upDocument.attachment.substring(upDocument.attachment.lastIndexOf('/'), upDocument.attachment.length)}}</p> -->\n                            <p class=\"p14 marginB0\" *ngIf=\"!upDocument.attachment_name\">{{'leadDetails.noName' | translate}}</p>\n                        </div>\n                    </div>\n                </td>\n                <td class=\"text-right\">\n                    <a class=\"green-color\" target=\"_blank\" href=\"{{upDocument.attachment}}\">{{'leadDetails.download' | translate}}</a>\n                </td>\n                </tr>\n            </table>\n        </div>\n    </div>\n    </div>\n</div>\n\n<div class=\"modal\" id=\"bank-listing\">\n    <div class=\"modal-dialog \">\n    <div class=\"modal-content notary-avail\">\n        <div class=\"modal-header popup-header\">\n            <h4 class=\"modal-title\">{{'leadDetails.banksAvailable' | translate}}</h4>\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #hideBanks>&times;</button>\n        </div>\n        <div class=\"modal-body\">\n\n            <div class=\"spacer30\"></div>\n            <div class=\"row\">\n                <div class=\"col-md-8 col-6\">\n                    <input style=\"max-width:200px\" (keyup.enter)=\"getBanks('', keyword, 2)\" [(ngModel)]=\"keyword\" class=\"form-control\" type=\"text\" name=\"keyword\" placeholder=\"Search\">\n                </div>\n                <div class=\"col-md-4 col-5 btn-cont\">\n                    <a class=\"btn btn-primary pull-right\" href=\"javascript://\" (click)=\"getBanks('', keyword, 2)\">{{'leadDetails.search' | translate}}</a>\n                </div>\n            </div>\n            <div class=\"spacer30\"></div>\n            <div class=\"modal-data\">\n                <table class=\"table\">\n                    <tr *ngFor=\"let bank of parameter.banks\">\n                    <td>\n                        <div class=\"n-avail-profile\">\n                            <!-- <img [src]=\"bank.image\" onerror='src=\"assets/img/bank.png\"' alt=\"img\"> -->\n                            \n                            <img *ngIf=\"bank.image\" onerror='src=\"assets/img/bank.png\"' alt=\"img\"\n                                    [defaultImage]=\"bank.image| img:'thumb'\" [lazyLoad]=\"bank.image\">\n                            <img *ngIf=\"!bank.image\" src=\"assets/img/bank.png\" alt=\"img\">\n\n                            <div class=\"n-avail-info\">\n                                <p class=\"p12\">{{bank.name | titlecase}}</p>\n                                <p class=\"p10\">{{'leadDetails.branch' | translate}} : {{bank.branch ? bank.branch : ('leadDetails.NA' | translate)}}</p>\n                            </div>\n                        </div>\n                    </td>\n                    <td>\n                        <label class=\"cust-check-bx float-right\">\n                        <input type=\"radio\" name=\"bank_id\" (click)=\"assignBank(bank)\">\n                        <span class=\"checkmark\"></span>\n                        </label>\n                    </td>\n                    </tr>\n                    <div  *ngIf=\"parameter.banks?.length==0\" class=\"write-note white-bg\">\n                        <p class=\"show-not-found\">\n                            {{'leadDetails.noBankAvailable' | translate}}\n                        </p>\n                    </div>\n                </table>\n            </div>\n        </div>\n    </div>\n    </div>\n</div>\n\n<div class=\"modal\" id=\"notary-avail\">\n    <div class=\"modal-dialog \">\n        <div class=\"modal-content notary-avail\">\n            <div class=\"modal-header popup-header\">\n            <h4 class=\"modal-title\">Notaries available</h4>\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #hideNotaries>&times;</button>\n            </div>\n            <div class=\"modal-body\">\n                \n               <div class=\"spacer30\"></div>\n                <div class=\"row\">\n                    <div class=\"col-md-8 col-6\">\n                        <input style=\"max-width:200px\" (keyup.enter)=\"getNotaries('', keyword, 2)\" [(ngModel)]=\"keyword\" class=\"form-control\" type=\"text\" name=\"keyword\" placeholder=\"Search\">\n                    </div>\n                    <div class=\"col-md-4 col-5 btn-cont\">\n                        <a class=\"btn btn-primary pull-right\" href=\"javascript://\" (click)=\"getNotaries('', keyword, 2)\">Search</a>\n                    </div>\n                </div>\n                <div class=\"spacer30\"></div>\n                <div class=\"modal-data\">\n                    <table class=\"table\">\n                        <tr *ngFor=\"let item of parameter.items\">\n                            <td>\n                                <div class=\"n-avail-profile\">\n                                <!-- <img [src]=\"item.image\" onerror='src=\"assets/img/house.png\"' alt=\"img\"> -->\n                                \n                                <img *ngIf=\"item.image\" onerror='src=\"assets/img/house.png\"' alt=\"img\"\n                                    [defaultImage]=\"item.image| img:'thumb'\" [lazyLoad]=\"item.image\">\n                                <img *ngIf=\"!item.image\" src=\"assets/img/house.png\" alt=\"img\">\n                                \n                                <div class=\"n-avail-info\">\n                                    <p class=\"p12\">{{item.name | titlecase}}</p>\n                                    <p class=\"p10\">Phone : {{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}</p>\n                                </div>\n                                </div>\n                            </td>\n                            <td>\n                                <label class=\"cust-check-bx float-right\">\n                                    <input type=\"radio\" name=\"notary_id\" (click)=\"assignNoatary(item)\">\n                                    <span class=\"checkmark\"></span>\n                                </label>\n                            </td>\n                        </tr>\n                        <div  *ngIf=\"parameter?.items?.length==0\" class=\"write-note white-bg\">\n                            <p class=\"show-not-found\">\n                                No notary is available.\n                            </p>\n                        </div>\n                    </table>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n\n<div class=\"modal animated\" id=\"get-availability1\">\n    <div class=\"modal-dialog fadeIndown\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header modal-header-new\">\n                <h4 class=\"modal-title\">Notary Availabilities</h4>\n                <button type=\"button\" style=\"display: none;\" class=\"close\" data-dismiss=\"modal\" #modalClose1>&times;</button>\n                <button type=\"button\" class=\"close\" (click)=\"closeModal1()\">&times;</button>\n            </div>\n    \n            <div class=\"modal-body modal-body-new\">\n                <div class=\"row\" *ngIf=\"leadData?.selected_properties && leadData?.selected_properties[0]?.selected_noatary\">\n                    <div class=\"col-6\" *ngFor=\"let d of leadData?.selected_properties[0]?.selected_noatary[0]?.noatary_availability; let j=index\">\n                        <label class=\"notary-ava\">{{d.date_time | moment}}</label>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n\n<div class=\"modal animated\" id=\"get-availability2\">\n    <div class=\"modal-dialog fadeIndown\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header modal-header-new\">\n                <h4 class=\"modal-title\">Schedule Meeting</h4>\n                <button type=\"button\" style=\"display: none;\" class=\"close\" data-dismiss=\"modal\" #modalClose2>&times;</button>\n                <button type=\"button\" class=\"close\" (click)=\"closeModal2()\">&times;</button>\n            </div>\n    \n            <div class=\"modal-body modal-body-new\">\n                <table class=\"table\" *ngIf=\"leadData?.selected_properties[0]?.selected_noatary\">\n                    <tr *ngFor=\"let d of leadData?.selected_properties[0]?.selected_noatary[0]?.noatary_availability; let j=index\">\n                        <td>\n                            <label class=\"notary-ava\">{{d.date_time | moment}}</label>\n                        </td>\n                        <td>\n                            <label class=\"cust-check-bx float-right\">\n                                <input [checked]=\"d.date_time==scheduleMeeting.appointment_date\" type=\"radio\" name=\"notary_id\" (click)=\"addAppointment(d)\">\n                                <span class=\"checkmark\"></span>\n                            </label>\n                        </td>\n                    </tr>\n                    <div *ngIf=\"leadData?.selected_properties[0]?.selected_noatary[0]?.noatary_availability==null\" class=\"write-note white-bg\">\n                        <p class=\"show-not-found\">\n                            No availability given by notary yet.\n                        </p>\n                    </div>\n                </table>\n            </div>\n    \n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/layout/leads/csr-closer/csr-closer-detail/csr-closer-detail.component.ts":
/*!******************************************************************************************!*\
  !*** ./src/app/layout/leads/csr-closer/csr-closer-detail/csr-closer-detail.component.ts ***!
  \******************************************************************************************/
/*! exports provided: CsrCloserDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CsrCloserDetailComponent", function() { return CsrCloserDetailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/lib/index.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var src_app_models_chat_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/chat.model */ "./src/app/models/chat.model.ts");
/* harmony import */ var src_app_models_leads_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/models/leads.model */ "./src/app/models/leads.model.ts");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var src_app_services_leads_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/services/leads.service */ "./src/app/services/leads.service.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var CsrCloserDetailComponent = /** @class */ (function () {
    function CsrCloserDetailComponent(route, router, admin, cs, constant, selectedProperties, scheduleMeeting, bankModel, notaryModel, model, element, spinner, leadsService, translate) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.admin = admin;
        this.cs = cs;
        this.constant = constant;
        this.selectedProperties = selectedProperties;
        this.scheduleMeeting = scheduleMeeting;
        this.bankModel = bankModel;
        this.notaryModel = notaryModel;
        this.model = model;
        this.element = element;
        this.spinner = spinner;
        this.leadsService = leadsService;
        this.translate = translate;
        this.parameter = {};
        // meetingDate: any = {
        //   appointment_date: '',
        //   id: ''
        // };
        this.show = false;
        this.conversations = [];
        this.messages = [];
        this.loadingMessages = false;
        this.loadingConversation = false;
        /**************/
        this.editModel = false;
        this.seconds = true;
        this.isActive = true;
        this.imgObj = {
            thumbnail: '',
            original: ''
        };
        this.imgArray = [];
        this.durationInSec = 0;
        this.showVideo = true;
        this.videoObj = {
            thumbnail: '',
            original: ''
        };
        this.chat_admin_sent_as = this.constant.userType.user_buyer;
        this.loadmore = true;
        this.loadmoring = false;
        this.pen_amount = 0;
        this.scrollbarOptions = { axis: 'y', theme: 'dark' };
        this.admin.loginData$.subscribe(function (success) {
            _this.parameter.admin_id = success['id'];
        });
    }
    CsrCloserDetailComponent.prototype.closeModal1 = function () {
        this.modalClose1.nativeElement.click();
    };
    CsrCloserDetailComponent.prototype.closeModal2 = function () {
        this.modalClose2.nativeElement.click();
    };
    CsrCloserDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this.msgInput.nativeElement.focus();
        this.keyword = '';
        this.leadData = new src_app_models_leads_model__WEBPACK_IMPORTED_MODULE_5__["Leads"]();
        // this.leadsService.leadData = this.leadsService.leadData;
        this.leadData.selected_properties = [new src_app_models_leads_model__WEBPACK_IMPORTED_MODULE_5__["SelectedProperties"]()];
        this.parameter.sent_as = this.constant.userType.csr_closer;
        this.route.params.subscribe(function (params) {
            _this.parameter.lead_id = params.id;
            _this.spinner.show();
            _this.admin.postDataApi('leads/details', { lead_id: _this.parameter.lead_id, sent_as: _this.parameter.sent_as }).subscribe(function (r) {
                _this.spinner.hide();
                _this.leadData = r.data.lead;
                _this.getDocumentOptions();
                _this.selectedProperties = r.data.lead.selected_properties[0];
                _this.pen_amount = _this.selectedProperties.pending_amount ?
                    _this.selectedProperties.pending_amount :
                    (_this.selectedProperties.total_amount - _this.selectedProperties.token_money);
                _this.parameter.user_id = _this.leadData.user.id;
                if (_this.leadData.appointments.length !== 0) {
                    _this.scheduleMeeting = _this.leadData.appointments[0];
                }
                // if (this.leadData.appointments && this.leadData.appointments.length !== 0) {
                //   for (let index = 0; index < this.leadData.appointments.length; index++) {
                //     const element = this.leadData.appointments[index];
                //     if (element.sent_as === this.constant.userType.csr_closer) {
                //       this.meetingDate = {
                //         appointment_date: element.appointment_date,
                //         id: element.id
                //       };
                //       this.scheduleMeeting = this.meetingDate;
                //     }
                //   }
                // }
                // chatting
                _this.chat_buyer = r.data.lead.user;
                _this.chat_seller = r.data.lead.selected_properties[0].property.creator;
                _this.chat_notary = r.data.lead.selected_properties[0].selected_noatary[0] ?
                    r.data.lead.selected_properties[0].selected_noatary[0].noatary : [];
                _this.chat_bank = r.data.lead.selected_properties[0].banks ? r.data.lead.selected_properties[0].banks[0] : [];
                _this.getLeadConversation(_this.constant.userType.user_buyer, false);
                // this.chat_bank = r.data.lead.banks[0];
                // this.lead.all_documents.map(item=>{
                //   if(this.lead_property.selected_documents.find(f=>item.id == f.id)){
                //     item.selected = true;
                //   }else{
                //     item.selected = false;
                //   }
                // });
            }, function (error) {
                _this.spinner.hide();
            });
        });
    };
    CsrCloserDetailComponent.prototype.ngOnDestroy = function () {
        // this.parameter.subscriber.uns
    };
    CsrCloserDetailComponent.prototype.getNotaries = function (property_id, keyword, type) {
        var _this = this;
        if (property_id) {
            this.notaryModel.property_id = property_id;
        }
        this.notaryModel.lead_id = this.parameter.lead_id;
        var input = { keyword: '' };
        if (keyword) {
            input.keyword = keyword;
        }
        this.spinner.show();
        this.admin.postDataApi('getNoataries', input).subscribe(function (r) {
            _this.spinner.hide();
            if (type === 1) {
                _this.showNotaries.nativeElement.click();
            }
            _this.parameter.items = r.data;
            for (var index = 0; index < _this.parameter.items.length; index++) {
                var element = _this.parameter.items[index];
                var id = _this.selectedProperties.noataries[0] ? _this.selectedProperties.noataries[0].id : 0;
                if (id !== 0 && element.id === id) {
                    _this.parameter.items.splice(index, 1);
                }
            }
        });
    };
    CsrCloserDetailComponent.prototype.assignNoatary = function (notary) {
        var _this = this;
        this.notaryModel.noatary_id = notary.id;
        this.parameter.text = this.translate.instant('message.error.wantToAssignNotary');
        swal({
            html: this.translate.instant('message.error.areYouSure') + '<br>' + this.parameter.text,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.spinner.show();
                _this.selectedProperties.noataries = [notary];
                _this.chat_notary = notary;
                // this.chat_notary = r.data.lead.selected_properties[0].selected_noatary[0] ?
                // r.data.lead.selected_properties[0].selected_noatary[0].noatary : [];
                // this.chat_bank = r.data.lead.selected_properties[0].banks ? r.data.lead.selected_properties[0].banks[0] : [];
                _this.admin.postDataApi('leads/assignNoatary', _this.notaryModel).subscribe(function (r) {
                    _this.spinner.hide();
                    swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.notaryAssignedSuccessfully'), 'success');
                    _this.notaryModel = new src_app_models_leads_model__WEBPACK_IMPORTED_MODULE_5__["NotaryAssigned"]();
                    _this.hideNotaries.nativeElement.click();
                }, function (error) {
                    _this.spinner.hide();
                });
            }
            else if (result.dismiss === 'cancel') {
                // alert('c');
            }
            else {
                // alert('ca');
            }
        }, function (dismiss) {
            // alert('csfd');
        }
        // if(dismiss == 'cancel'){
        //     // function when cancel button is clicked
        // }
        );
    };
    CsrCloserDetailComponent.prototype.getBanks = function (property_id, keyword, type) {
        var _this = this;
        if (property_id) {
            this.bankModel.property_id = property_id;
        }
        this.bankModel.lead_id = this.parameter.lead_id;
        var input = { keyword: '' };
        if (keyword) {
            input.keyword = keyword;
        }
        this.spinner.show();
        this.admin.postDataApi('getBanks', input).subscribe(function (r) {
            _this.spinner.hide();
            if (type === 1) {
                _this.showBanks.nativeElement.click();
            }
            _this.parameter.banks = r.data;
            for (var index = 0; index < _this.parameter.banks.length; index++) {
                var element = _this.parameter.banks[index];
                var selectedBankId = _this.selectedProperties.banks[0] ? _this.selectedProperties.banks[0].id : 0;
                if (selectedBankId !== 0 && element.id === selectedBankId) {
                    _this.parameter.banks.splice(index, 1);
                }
            }
        });
    };
    CsrCloserDetailComponent.prototype.assignBank = function (bank) {
        var _this = this;
        this.bankModel.bank_id = bank.id;
        this.parameter.text = this.translate.instant('message.error.wantToAssignBank');
        swal({
            html: this.translate.instant('message.error.areYouSure') + '<br>' + this.parameter.text,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.spinner.show();
                _this.selectedProperties.banks = [bank];
                _this.chat_bank = bank;
                _this.admin.postDataApi('leads/assignBank', _this.bankModel).subscribe(function (r) {
                    _this.spinner.hide();
                    swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.bankAssignedSuccessfully'), 'success');
                    _this.bankModel = new src_app_models_leads_model__WEBPACK_IMPORTED_MODULE_5__["BankAssigned"]();
                    _this.hideBanks.nativeElement.click();
                }, function (error) {
                    _this.spinner.hide();
                });
            }
        });
    };
    CsrCloserDetailComponent.prototype.setValue = function (i) {
        this.selectedProperties.allDocuments[i].is_selected =
            this.selectedProperties.allDocuments[i].is_selected && this.selectedProperties.allDocuments[i].is_selected === 1 ? 0 : 1;
    };
    CsrCloserDetailComponent.prototype.getDocumentOptions = function () {
        var _this = this;
        this.admin.postDataApi('getDocumentOptions', {}).subscribe(function (r) {
            _this.selectedProperties.allDocuments = r.data;
            _this.selectedProperties.allDocuments.forEach(function (element) {
                _this.selectedProperties.selected_documents.forEach(function (pt) {
                    if (pt.id === element.id) {
                        element.is_selected = 1;
                    }
                });
            });
        });
    };
    CsrCloserDetailComponent.prototype.blockThisLead = function () {
        this.admin.postDataApi('conversation/block', { lead_id: this.id }).subscribe(function (r) {
        });
    };
    CsrCloserDetailComponent.prototype.updateDocumentChecklist = function () {
        var _this = this;
        var ids = this.selectedProperties.allDocuments.filter(function (d) { return d.is_selected === 1; });
        var documents_ids = ids.map(function (d) { return d.id; });
        var input = {
            lead_id: this.parameter.lead_id,
            property_id: this.selectedProperties.property_id,
            documents: documents_ids
        };
        this.admin.postDataApi('leads/updateDocumentChecklist', input).subscribe(function (r) {
            swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.updatedSuccessfully'), 'success');
        });
    };
    CsrCloserDetailComponent.prototype.noDocumentUploaded = function () {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.noDocumentUploadedYet'), 'error');
    };
    CsrCloserDetailComponent.prototype.viewPropertyDetails = function (property) {
        this.cs.setPropertyDetails(property);
        this.router.navigate(['/dashboard/properties/details/' + property.property_id]);
    };
    CsrCloserDetailComponent.prototype.markLeadClose = function () {
        var _this = this;
        this.parameter.text = this.translate.instant('message.error.wantTocloseLead');
        swal({
            html: this.translate.instant('message.error.areYouSure') + '<br>' + this.parameter.text,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.admin.postDataApi('leads/closer-mark-lead-closed', { lead_id: _this.parameter.lead_id }).subscribe(function (r) {
                    _this.leadData.lead_status_closer = 1;
                    swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.leadClosedSuccessfully'), 'success');
                });
            }
        });
    };
    CsrCloserDetailComponent.prototype.selectConversation = function (conversation) {
        var _this = this;
        this.conversations.map(function (con) {
            con.selected = false;
            if (con === conversation) {
                con.selected = true;
                _this.conversation_id = con.id;
            }
        });
        this.conversation = conversation;
        var data = {
            conversation_id: this.conversation_id
        };
        this.loadingMessages = true;
        this.admin.postDataApi('conversation/getMessages', data).subscribe(function (res) {
            _this.messages = res['data'];
            _this.loadingMessages = false;
            setTimeout(function () {
                _this.scrollToBottom();
            }, 200);
        }, function (error) {
            _this.loadingMessages = false;
        });
    };
    CsrCloserDetailComponent.prototype.initSocket = function () {
        var _this = this;
        this.socket = socket_io_client__WEBPACK_IMPORTED_MODULE_2__["connect"](this.admin.socketUrl);
        // this.parameter.socket.on('connect', fun => {
        //   this.parameter.socket_id = this.parameter.socket.id;
        //   this.parameter.connected = this.parameter.socket.connected;
        //   const data = {
        //     admin_id: this.parameter.admin_id,
        //     socket_id: this.parameter.socket_id,
        //     device_id: this.admin.deviceId + '_' + this.parameter.admin_id
        //   };
        //   if (this.parameter.connected) {
        //     this.parameter.socket.emit('add-admin', data, (res: any) => {
        //     });
        //     this.parameter.socket.on('message', (response: any) => {
        //       if (response.data.conversation_id === this.parameter.conversation_id) {
        //         this.scrollToBottom();
        //         this.parameter.messages.push(response.data);
        //       }
        //     });
        //   }
        // });
        this.socket.on('connect', function (fun) {
            _this.socket_id = _this.socket.id;
            _this.connected = _this.socket.connected;
            var data = {
                admin_id: _this.parameter.admin_id,
                socket_id: _this.socket_id,
                device_id: _this.admin.deviceId + '_' + _this.parameter.admin_id
            };
            if (_this.connected) {
                _this.socket.emit('add-admin', data, function (res) {
                    // console.log('res', res);
                });
                _this.socket.on('message', function (response) {
                    if (response.data.conversation_id === _this.conversation_id) {
                        _this.messages.push(response.data);
                        setTimeout(function () {
                            _this.scrollToBottom();
                        }, 200);
                    }
                });
            }
        });
    };
    CsrCloserDetailComponent.prototype.scrollToBottom = function () {
        if (this.chatWin) {
            $('.chat-area').mCustomScrollbar('scrollTo', 'bottom', { scrollInertia: 0 });
        }
    };
    CsrCloserDetailComponent.prototype.onSelectFile = function (param, event) {
        var _this = this;
        this.optionsButton.nativeElement.click();
        if (event.target.files[0].size > this.constant.fileSizeLimit) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.fileSizeExceeds'), 'error');
            return false;
        }
        var model = new src_app_models_chat_model__WEBPACK_IMPORTED_MODULE_4__["Chat"];
        model.message = this.textMessage;
        model.message_type = 2;
        model.loading = true;
        // model.uid = Math.random().toString(36).substr(2, 15);
        model.conversation_id = this.conversation_id;
        model.conversation_user = { admin_id: this.parameter.admin_id };
        model.updated_at = new Date();
        this.messages.push(model);
        setTimeout(function () {
            _this.scrollToBottom();
        }, 100);
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                _this.image = e.target.result;
                model[param] = e.target.result;
                setTimeout(function () {
                    _this.scrollToBottom();
                }, 100);
                _this.cs.saveImage(event.target.files[0]).subscribe(function (success) {
                    model.image = success['data'].image;
                    _this.sendMessage(model);
                });
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };
    CsrCloserDetailComponent.prototype.saveAttachment = function (event) {
        var _this = this;
        this.optionsButton.nativeElement.click();
        if (event.target.files[0].size > this.constant.fileSizeLimit) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.fileSizeExceeds'), 'error');
            return false;
        }
        var model = new src_app_models_chat_model__WEBPACK_IMPORTED_MODULE_4__["Chat"];
        model.message = this.textMessage;
        model.message_type = 4;
        model.loading = true;
        model.uid = Math.random().toString(36).substr(2, 15);
        model.conversation_id = this.conversation_id;
        model.conversation_user = { admin_id: this.parameter.admin_id };
        model.attachment_name = event.target.files[0].name;
        var date = new Date();
        model.updated_at = date;
        this.messages.push(model);
        setTimeout(function () {
            _this.scrollToBottom();
        }, 100);
        this.cs.saveAttachment(event.target.files[0]).subscribe(function (success) {
            model.attachment = success['data'].name;
            _this.sendMessage(model);
        });
    };
    CsrCloserDetailComponent.prototype.playVideo = function (i) {
        this.messages[i].play = true;
    };
    CsrCloserDetailComponent.prototype.showCanvas = function (event) {
        var _this = this;
        this.optionsButton.nativeElement.click();
        if (event.target.files[0].size > this.constant.fileSizeLimit) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.fileSizeExceeds'), 'error');
            return false;
        }
        this.showVideo = true;
        var model = new src_app_models_chat_model__WEBPACK_IMPORTED_MODULE_4__["Chat"];
        model.message = this.textMessage;
        model.message_type = 3;
        model.loading = true;
        model.uid = Math.random().toString(36).substr(2, 15);
        model.conversation_id = this.conversation_id;
        model.conversation_user = { admin_id: this.parameter.admin_id };
        var date = new Date();
        model.updated_at = date;
        this.messages.push(model);
        setTimeout(function () {
            _this.scrollToBottom();
        }, 100);
        setTimeout(function () {
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
                        _this.durationInSec = videoTest.duration.toFixed(0);
                        // setTimeout(() => {
                        //   // create canvas at middle of video
                        //   this.newcanvas(videoTest, event.target.files[0], model);
                        // }, (this.durationInSec / 2).toFixed(0));
                        setTimeout(function () {
                            // create canvas at middle of video
                            _this.newcanvas(videoTest, event.target.files[0], model);
                        }, 3000);
                        clearInterval(timer);
                    }
                }, 1000);
            }.bind(_this);
            reader.readAsDataURL(event.target.files[0]);
            // setTimeout(() => {
            //   this.newcanvas(videoTest, event.target.files[0]);
            // }, 4000);
        }, 1000);
    };
    CsrCloserDetailComponent.prototype.newcanvas = function (video, videoFile, model) {
        var _this = this;
        var canvas = document.getElementById('canvas');
        var ss = canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, canvas.width, canvas.height);
        var ImageURL = canvas.toDataURL('image/jpeg');
        model.image = ImageURL;
        var fileToUpload = this.dataURLtoFile(ImageURL, 'tempFile.png');
        this.cs.saveVideo(videoFile, fileToUpload).subscribe(function (success) {
            model.video = success['data'].video;
            model.image = success['data'].thumb;
            _this.sendMessage(model);
        });
    };
    CsrCloserDetailComponent.prototype.dataURLtoFile = function (dataurl, filename) {
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
    CsrCloserDetailComponent.prototype.setText = function () {
        var _this = this;
        if (!this.textMessage || !this.textMessage.trim()) {
            return false;
        }
        else if ((Object.keys(this.admin.admin_acl).length !== 0 && this.admin.admin_acl['Closer Lead Management'].can_update === 0)
            || this.admin.permissions.can_csr_closer === 0) {
            return false;
        }
        else {
            var model = new src_app_models_chat_model__WEBPACK_IMPORTED_MODULE_4__["Chat"];
            model.message = this.textMessage;
            model.message_type = 1;
            model.loading = true;
            model.uid = Math.random().toString(36).substr(2, 15);
            model.conversation_id = this.conversation_id;
            model.conversation_user = { admin_id: this.parameter.admin_id };
            var d = new Date();
            model.updated_at = d.toUTCString();
            this.messages.push(model);
            this.textMessage = '';
            setTimeout(function () {
                _this.scrollToBottom();
            }, 100);
            this.sendMessage(model);
            // const model = new Chat;
            // model.message = this.textMessage;
            // model.message_type = 1;
            // model.conversation_id =  this.conversation_id;
            // model.conversation_user = {admin_id: this.admin_id};
            // model.updated_at = new Date();
            // this.messages.push(model);
            // // model.loading = true;
            // this.textMessage = '';
            // this.sendMessage(model);
        }
    };
    CsrCloserDetailComponent.prototype.sendMessage = function (model) {
        var _this = this;
        model.sent_as = this.parameter.sent_as;
        if (model.message_type === 1 && !model.message) {
            swal(this.translate.instant('swal.error'), 'Please enter some text.', 'error');
        }
        else {
            // setTimeout(() => {
            //   this.scrollToBottom();
            // }, 100);
            this.admin.postDataApi('conversation/sendMessage', model).subscribe(function (r) {
                if (model.loading === true) {
                    model.loading = false;
                }
                setTimeout(function () {
                    _this.scrollToBottom();
                }, 100);
            });
        }
    };
    CsrCloserDetailComponent.prototype.uploadDocument = function (event) {
        var _this = this;
        var file = event.target.files[0];
        var input = new FormData();
        input.append('lead_id', this.params.lead_id);
        input.append('property_id', this.params.property_id);
        input.append('attachment', file);
        input.append('attachment_name', file.name);
        this.admin.postDataApi('uploadDealDocument', input).subscribe(function (r) {
            swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.uploadedSuccessfully'), 'success');
        });
    };
    CsrCloserDetailComponent.prototype.getLeadConversation = function (admin_sent_as, showLoader) {
        var _this = this;
        this.chat_admin_sent_as = admin_sent_as;
        if (admin_sent_as === this.constant.userType.user_buyer) {
            this.chat_admin = this.chat_buyer;
        }
        if (admin_sent_as === this.constant.userType.user_seller_dev) {
            this.chat_admin = this.chat_seller;
        }
        if (admin_sent_as === this.constant.userType.notary) {
            this.chat_admin = this.chat_notary;
        }
        if (admin_sent_as === this.constant.userType.bank) {
            this.chat_admin = this.chat_bank;
        }
        var data = {
            lead_id: this.parameter.lead_id,
            other_sent_as: admin_sent_as,
            other_id: this.chat_admin.id,
            sent_as: this.constant.userType.csr_closer
        };
        if (showLoader) {
            this.spinner.show();
        }
        this.admin.postDataApi('conversation/getLeadConversation', data).subscribe(function (r) {
            _this.spinner.hide();
            if (r['data']) {
                _this.conversation_id = r['data'][0].id;
                _this.initSocket();
                _this.model.conversation_id = _this.conversation_id;
                _this.messages = r['data'][0].messages;
                setTimeout(function () {
                    _this.scrollToBottom();
                }, 100);
            }
        }, function (error) {
            _this.spinner.hide();
        });
    };
    CsrCloserDetailComponent.prototype.loadMore = function () {
        var _this = this;
        this.loadmoring = true;
        var data = {
            sent_as: this.constant.userType.csr_closer,
            conversation_id: this.conversation_id,
            lead_id: this.parameter.lead_id,
            last_message_id: this.messages[0].id
        };
        this.admin.postDataApi('conversation/getMessages', data).subscribe(function (res) {
            _this.loadmoring = false;
            if (res['data'].length < 30) {
                _this.loadmore = false;
            }
            _this.messages = res['data'].concat(_this.messages);
        });
    };
    CsrCloserDetailComponent.prototype.sendProperty = function (property) {
        var model = new src_app_models_chat_model__WEBPACK_IMPORTED_MODULE_4__["Chat"];
        model.message = property.name + ' ' + this.translate.instant('commonBlock.with') + ' ';
        if (property.configuration.bedroom) {
            model.message += property.configuration.bedroom + ' ' + this.translate.instant('commonBlock.bed') + ' ';
        }
        if (property.configuration.bathroom) {
            model.message += this.constant.middleDot + property.configuration.bathroom + ' ' + this.translate.instant('commonBlock.bath') + ' ';
        }
        if (property.configuration.half_bathroom) {
            model.message += this.constant.middleDot + property.configuration.half_bathroom + ' ' +
                this.translate.instant('commonBlock.halfBath') + ' ';
        }
        if (property.property_type.name) {
            model.message += this.constant.middleDot + property.property_type.name;
        }
        model.message += ' ' + this.translate.instant('commonBlock.in') + ' ' + property.building.name;
        model.message_type = 5;
        model.property_id = property.id;
        model.image = property.image;
        model.property_url = property.property_url;
        model.loading = true;
        model.updated_at = new Date();
        model.uid = Math.random().toString(36).substr(2, 15);
        model.conversation_id = this.conversation_id;
        model.conversation_user = { admin_id: this.parameter.admin_id };
        this.messages.push(model);
        this.sendMessage(model);
    };
    CsrCloserDetailComponent.prototype.addAppointment = function (item) {
        var _this = this;
        this.parameter.text = this.translate.instant('message.error.wantToScheduleMeeting');
        swal({
            html: this.translate.instant('message.error.areYouSure') + '<br>' + this.parameter.text,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.scheduleMeeting.lead_id = _this.parameter.lead_id;
                _this.scheduleMeeting.property_id = _this.selectedProperties.property_id;
                _this.scheduleMeeting.appointment_date = item.date_time;
                _this.scheduleMeeting.sent_as = _this.constant.userType.csr_closer;
                if (_this.scheduleMeeting.appointment_date) {
                    _this.scheduleMeeting.id = _this.scheduleMeeting.id;
                }
                _this.admin.postDataApi('leads/addAppointment', _this.scheduleMeeting).subscribe(function (r) {
                    _this.scheduleMeeting = r.data;
                    _this.closeModal2();
                    swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.meetingScheduledSuccessfully'), 'success');
                });
            }
        });
    };
    CsrCloserDetailComponent.prototype.updatePropertyAmount = function () {
        var _this = this;
        if (this.pen_amount > this.selectedProperties.total_amount && this.pen_amount < 0) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.incorrectAmountEntered'), 'error');
            return false;
        }
        var input = {
            lead_id: this.parameter.lead_id,
            property_id: this.selectedProperties.property_id,
            pending_amount: this.pen_amount
        };
        this.admin.postDataApi('leads/updatePropertyAmount', input).subscribe(function (r) {
            _this.showInput = false;
            _this.selectedProperties.pending_amount = _this.pen_amount;
            // this.leadData.lead_status_closer = 1;
            swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.amountUpdatedSuccessfully'), 'success');
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalClose1'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CsrCloserDetailComponent.prototype, "modalClose1", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalClose2'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CsrCloserDetailComponent.prototype, "modalClose2", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('showBanks'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CsrCloserDetailComponent.prototype, "showBanks", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('hideBanks'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CsrCloserDetailComponent.prototype, "hideBanks", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('showNotaries'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CsrCloserDetailComponent.prototype, "showNotaries", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('hideNotaries'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CsrCloserDetailComponent.prototype, "hideNotaries", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('msgInput'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CsrCloserDetailComponent.prototype, "msgInput", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('chatWin'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CsrCloserDetailComponent.prototype, "chatWin", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('optionsButton'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CsrCloserDetailComponent.prototype, "optionsButton", void 0);
    CsrCloserDetailComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-csr-closer-detail',
            template: __webpack_require__(/*! ./csr-closer-detail.component.html */ "./src/app/layout/leads/csr-closer/csr-closer-detail/csr-closer-detail.component.html"),
            styles: [__webpack_require__(/*! ./csr-closer-detail.component.css */ "./src/app/layout/leads/csr-closer/csr-closer-detail/csr-closer-detail.component.css")],
            providers: [src_app_models_leads_model__WEBPACK_IMPORTED_MODULE_5__["SelectedProperties"], src_app_models_leads_model__WEBPACK_IMPORTED_MODULE_5__["BankAssigned"], src_app_models_leads_model__WEBPACK_IMPORTED_MODULE_5__["NotaryAssigned"], src_app_models_chat_model__WEBPACK_IMPORTED_MODULE_4__["Chat"], src_app_models_leads_model__WEBPACK_IMPORTED_MODULE_5__["ScheduleMeeting"]]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_6__["AdminService"],
            src_app_services_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"],
            src_app_common_constants__WEBPACK_IMPORTED_MODULE_8__["Constant"],
            src_app_models_leads_model__WEBPACK_IMPORTED_MODULE_5__["SelectedProperties"],
            src_app_models_leads_model__WEBPACK_IMPORTED_MODULE_5__["ScheduleMeeting"],
            src_app_models_leads_model__WEBPACK_IMPORTED_MODULE_5__["BankAssigned"],
            src_app_models_leads_model__WEBPACK_IMPORTED_MODULE_5__["NotaryAssigned"],
            src_app_models_chat_model__WEBPACK_IMPORTED_MODULE_4__["Chat"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerService"],
            src_app_services_leads_service__WEBPACK_IMPORTED_MODULE_9__["LeadsService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__["TranslateService"]])
    ], CsrCloserDetailComponent);
    return CsrCloserDetailComponent;
}());



/***/ }),

/***/ "./src/app/layout/leads/csr-closer/csr-closer.component.css":
/*!******************************************************************!*\
  !*** ./src/app/layout/leads/csr-closer/csr-closer.component.css ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9sZWFkcy9jc3ItY2xvc2VyL2Nzci1jbG9zZXIuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/layout/leads/csr-closer/csr-closer.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/layout/leads/csr-closer/csr-closer.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container-fluid\">\n    <div class=\"row\">\n        <div class=\"col-md-4\">\n            <div class=\"form-group\">\n                <p class=\"p16\">{{'leads.CSRClosureLeads' | translate}}</p>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-md-4\">\n            <div class=\"form-group\" *ngIf=\"admin?.admin_acl['Closer Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n                <div class=\"d-flex\">\n                <!-- <button (click)=\"removeCsrUser()\" class=\"all-btn\">All</button> -->\n                <div class=\"autocomplete\">\n                <input placeholder=\"{{'addForm.placeholder.searchCSRClosure' | translate}}\" style=\"max-width:200px\" list=\"amenities\" [(ngModel)]=\"parameter.keyword\" (input)=\"getCsrListing()\" class=\"form-control\" type=\"text\" name=\"keyword\" (focusout)=\"closeCsrListing()\">\n                <div id=\"myInputautocomplete-list\" class=\"autocomplete-items\">\n                    <div *ngFor=\"let item of users\" (click)=\"selectCsrUser(item)\">{{item.email}}</div>\n                </div>\n                </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-md-8 col-12\">\n            <div class=\"cust-tabs-2\">\n                <ul class=\"nav nav-tabs\">\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==1}\" (click)=\"changeFlag(1)\" >{{'filters.time.thisWeek' | translate}}</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==2}\" (click)=\"changeFlag(2)\" >{{'filters.time.thisMonth' | translate}}</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==3}\" (click)=\"changeFlag(3)\" >{{'filters.time.lastMonth' | translate}}</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==4}\" (click)=\"changeFlag(4)\" >{{'filters.time.lifetime' | translate}}</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==5}\" (click)=\"parameter.flag=5\" >{{'filters.time.custom.label' | translate}}</a>\n                </li>\n                </ul>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-12\">\n            <div *ngIf=\"parameter.flag == 5\" class=\"row\">\n                <div class=\"offset-lg-7\"></div>\n                <div class=\"col-lg-2 col-md-2 col-sm-5 col-5\">\n                <div class=\"form-group marginB0\">\n                    <label>{{'filters.time.custom.from' | translate}}:</label>\n                    <p-calendar showIcon=\"true\" [locale]=\"locale\" [(ngModel)]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2040\"></p-calendar>\n                </div>\n                </div>\n                <div class=\"col-lg-2 col-md-2 col-sm-5 col-5\">\n                <div class=\"form-group marginB0\">\n                    <label>{{'filters.time.custom.to' | translate}}:</label>\n                    <p-calendar showIcon=\"true\" [locale]=\"locale\" [(ngModel)]=\"parameter.max\" [minDate]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2040\"></p-calendar>\n                </div>\n                </div>\n                <div class=\"col-lg-1 col-md-2 col-sm-2 col-6\">\n                <div class=\"form-group btn-cont\">\n                    <label class=\"addMT3\">&nbsp;</label>\n                    <button class=\"btn btn-calender\" href=\"javascript://\" (click)=\"getListing(); getCSRDashBoardData();\"\n                        [disabled]=\"!parameter.min || !parameter.max\">{{'filters.time.custom.applyBtn' | translate}}</button>\n                </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"listingResults\" >\n      <div class=\"row\" *ngIf=\"admin?.admin_acl['Closer Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n            <div class=\"col-md-2\">\n                <div class=\"form-group\">\n                <label>{{'filters.location.country' | translate}}</label>\n                <select class=\"form-control\" (change)=\"onCountryChange($event.target.value)\">\n                    <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n                    <option *ngFor=\"let item of location.countries\" [value]=\"item.id\">{{item.name}}</option>\n                </select>\n                </div>\n            </div>\n            <div class=\"col-md-2\">\n                <div class=\"form-group\">\n                <label>{{'filters.location.state' | translate}}</label>\n                <select class=\"form-control\" (change)=\"onStateChange($event.target.value)\">\n                    <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n                    <option *ngFor=\"let item of location.states\" [value]=\"item.id\">{{item.name}}</option>\n                </select>\n                </div>\n            </div>\n            <div class=\"col-md-2\">\n                <div class=\"form-group\">\n                <label>{{'filters.location.city' | translate}}</label>\n                    <select class=\"form-control\" (change)=\"onCityChange($event.target.value)\">\n                    <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n                    <option *ngFor=\"let item of location.cities\" [value]=\"item.id\">{{item.name}}</option>\n                    </select>\n                </div>\n            </div>\n    \n            <div class=\"col-md-2\">\n                <div class=\"form-group\">\n                <label>{{'filters.location.locality' | translate}}</label>\n                <select class=\"form-control\" (change)=\"onLocalityChange($event.target.value)\">\n                    <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n                    <option *ngFor=\"let item of location.localities\" [value]=\"item.id\">{{item.name}}</option>\n                </select>\n                </div>\n            </div>\n    \n            <div class=\"col-md-2\">\n                <div class=\"form-group btn-cont\">\n                <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n                <button type=\"button\" (click)=\"getListing(); getCSRDashBoardData();\" class=\"btn btn-primary-new width100P\">{{'filters.location.applyBtn' | translate}}</button>\n                </div>\n            </div>\n    \n            <div class=\"col-md-2\">\n                <div class=\"form-group btn-cont\">\n                <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n                <button type=\"button\" (click)=\"resetFilters()\" class=\"btn btn-primary-new width100P\">{{'filters.location.resetBtn' | translate}}</button>\n                </div>\n            </div>\n      </div>\n      <div *ngIf=\"selectedUser as item\" class=\"sigle-row-table\">\n            <table class=\"table table-striped\">\n            <tbody><tr>\n                <td><img class=\"rounded-circle\" [src]=\"item.image| img:'small'\" onerror='this.src=\"assets/img/default_img.png\"' alt=\"img\"></td>\n                <td class=\"text-left\">\n                    <span class=\"name\">{{item.name | titlecase}}</span>\n                </td>\n                <td class=\"text-left\">\n                    {{item.phone}}\n                </td>\n                <td class=\"text-left\">\n                    {{item.email}}\n                </td>\n                <td>\n                    <a (click)=\"removeCsrUser()\" href=\"javascript://\" class=\"icon-block edit-icon\"><img src=\"assets/img/remove-icon.png\" alt=\"remove\" title=\"{{'table.title.remove' | translate}}\" /></a>\n                </td>\n                </tr>\n            </tbody>\n            </table>\n      </div>\n      <div class=\"row\">\n         <div class=\"col-lg-8 col-md-12 col-sm-12 col-12\">\n            <div class=\"info-box all-leads\">\n               <div class=\"row\">\n                  <div class=\"col-md-6 col-sm-6 col-12 bdr-right\" [ngClass]=\"{'active':parameter.count_flag == 1}\" (click)=\"changeCountFlag(1)\">\n                     <div class=\"one-row \">\n                        <div class=\"o-block\">\n                           <h5>{{'table.th.leads' | translate}}</h5>\n                           <small>{{'table.th.total' | translate}}</small>\n                        </div>\n                        <div class=\"o-block\">\n                           <a class=\"view-all\" href=\"javascript://\">{{'table.th.viewAll' | translate}}</a>\n                           <h4>{{dash?.lead_total}}</h4>\n                        </div>\n                     </div>\n                  </div>\n                  <div class=\"col-md-6 col-sm-6 col-12 paddingL0\">\n                    <div class=\"two-block\">\n                        <div class=\"d-flex\">\n                            <div class=\"f-block\" [ngClass]=\"{'active':parameter.count_flag == 2}\" (click)=\"changeCountFlag(2)\">\n                                <h5>{{'table.th.notary' | translate}}</h5>\n                                <small>{{'table.th.notAssigned' | translate}}</small>\n                                <h3>{{dash?.noatary_pending}}</h3>\n                            </div>\n                            <div class=\"f-block\" [ngClass]=\"{'active':parameter.count_flag == 3}\" (click)=\"changeCountFlag(3)\">\n                                <h5>{{'table.th.bank' | translate}}</h5>\n                                <small>{{'table.th.notAssigned' | translate}}</small>\n                                <h3>{{dash?.bank_pending}}</h3>\n                            </div>\n                        </div>\n                        \n                        </div>\n                  </div>\n               </div>\n            </div>\n            <div class=\"info-box all-leads\">\n               <div class=\"row\">\n                  <div class=\"col-md-6 col-sm-6 col-12 bdr-right\" [ngClass]=\"{'active':parameter.count_flag == 4}\" (click)=\"changeCountFlag(4)\">\n                     <div class=\"one-row \">\n                        <div class=\"o-block\">\n                           <h5>{{'table.th.leads' | translate}}</h5>\n                           <small>{{'table.th.open' | translate}}</small>\n                        </div>\n                        <div class=\"o-block\">\n                           <a class=\"view-all\" href=\"javascript://\">{{'table.th.viewAll' | translate}}</a>\n                           <h4>{{dash?.lead_open}}</h4>\n                        </div>\n                     </div>\n                  </div>\n                  <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == 5}\" (click)=\"changeCountFlag(5)\">\n                     <div class=\"one-row\">\n                        <div class=\"o-block\">\n                           <h5>{{'table.th.leads' | translate}}</h5>\n                           <small>{{'table.th.closed' | translate}}</small>\n                        </div>\n                        <div class=\"o-block\">\n                           <a class=\"view-all\" href=\"javascript://\">{{'table.th.viewAll' | translate}}</a>\n                           <h4>{{dash?.lead_closed}}</h4>\n                        </div>\n                     </div>\n                  </div>\n               </div>\n            </div>\n    \n         </div>\n         <div class=\"col-lg-4 col-md-12 col-sm-12 col-12\">\n            <div class=\"chat-msg all-leads\" style=\"padding:0px\">\n                    <div class=\"padding20\" *ngIf=\"dash.lead_total == 0\">{{'message.error.noRecordFound' | translate}}</div>\n                    <ngx-charts-pie-chart [results]=\"chartView\"></ngx-charts-pie-chart>\n            </div>\n         </div>\n      </div>\n      <div class=\"row\">\n         <div class=\"col-12\">\n            <div class=\"spacer40\"></div>\n         </div>\n    \n      </div>\n      <div class=\"row\">\n         <div class=\"col-lg-6 col-md-6 col-6\">\n            <div class=\"title-group\">\n               <h5>{{'table.th.leads' | translate}} \n                <span *ngIf=\"parameter.count_flag == 1\">({{'table.th.total' | translate}})</span>\n                <span *ngIf=\"parameter.count_flag == 2\">({{'table.th.notaryNotAssigned' | translate}})</span>\n                <span *ngIf=\"parameter.count_flag == 3\">({{'table.th.bankNotAsigned' | translate}})</span>\n                <span *ngIf=\"parameter.count_flag == 4\">({{'table.th.open' | translate}})</span>\n                <span *ngIf=\"parameter.count_flag == 5\">({{'table.th.closed' | translate}})</span>\n               </h5>\n               <p>\n                   <!-- Showing {{parameter.page}} out of {{parameter.total_count}} -->\n                </p>\n            </div>\n         </div>\n         <!-- only inhouse users can do this -->\n         <div class=\"col-lg-6 col-md-6 col-5\" *ngIf=\"admin?.admin_acl['Closer Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n            <div class=\"add-new text-right\">\n                <a class=\"btn\" (click)=\"bulkAssign()\" href=\"javascript://\">{{'table.th.bulkReassign' | translate}}</a>\n            </div>\n        </div>\n      </div>\n      <div class=\"white-bg\">\n         <div class=\"tabel-section\">\n            <div class=\"table-responsive\">\n                <table class=\"table table-striped\">\n                    <tr>\n                <!-- only inhouse users can do this -->\n                    <th *ngIf=\"admin?.admin_acl['Closer Lead Management']?.can_read==1 && !this.parameter.assignee_id\" style=\"width:6%\">\n                        <div class=\"table-search\">\n                                <label>{{'table.th.all' | translate}}</label>\n                            <div>\n                                <label class=\"cust-check-bx\" >\n                                    <input class=\"width1\" type=\"checkbox\" (click)=\"selectAll(parameter.is_selected)\" name=\"document\">\n                                    <span class=\"checkmark\"></span>\n                                </label>\n                            </div>\n                        </div>\n                    </th>\n                    <!-- <th style=\"width:6%\">&nbsp;</th> -->\n                    <th style=\"width:6%\">\n                        <div class=\"table-search\">\n                                <label>{{'table.th.image' | translate}}</label>\n                            <div class=\"searh-3\">\n                                <!-- <input type=\"Search here\" name=\"name\" [(ngModel)]=\"parameter.name\" (keyup.enter)=\"getListing()\">\n                                <button *ngIf=\"parameter.name\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button> -->\n                            </div>\n                        </div>\n                    </th>\n                    <th style=\"width:18%\">\n                        <div class=\"table-search\">\n                                <label>{{'table.th.name' | translate}}</label>\n                            <div class=\"searh-3\">\n                                <input autocomplete=\"off\" type=\"text\" [(ngModel)]=\"parameter.name\" (keyup.enter)=\"changeFilter('name',$event.target.value)\" name=\"\">\n                                <button *ngIf=\"parameter.name\" (click)=\"changeFilter('name', parameter.name)\"><i class=\"fa fa-search\"></i></button>\n                            </div>\n                        </div>\n                    </th>\n                    <th style=\"width:20%; text-align:left;\">\n                        <div class=\"table-search\">\n                                <label>{{'table.th.contactNumber' | translate}}</label>\n                            <div class=\"searh-3\">\n                                <input autocomplete=\"off\" type=\"text\" [(ngModel)]=\"parameter.phone\" (keyup.enter)=\"changeFilter('phone',$event.target.value)\" name=\"\">\n                                <button *ngIf=\"parameter.phone\" (click)=\"changeFilter('phone', parameter.phone)\"><i class=\"fa fa-search\"></i></button>\n                            </div>\n                        </div>\n                    </th>\n                    <th style=\"width:30%\" class=\"border-top-0\">\n                        <div class=\"table-search\">\n                                <label>{{'table.th.property' | translate}}</label>\n                            <!-- <div class=\"searh-3\">\n                                <input type=\"text\" [(ngModel)]=\"parameter.email\" (keyup.enter)=\"changeFilter('email',$event.target.value)\" name=\"\">\n                                <button *ngIf=\"parameter.email\" (click)=\"changeFilter('email', parameter.email)\"><i class=\"fa fa-search\"></i></button>\n                            </div> -->\n                        </div>\n                    </th>\n                    <th style=\"width:10%\" class=\"border-top-0\">\n                        <div class=\"table-search\">\n                                <label>{{'table.th.assignee' | translate}}</label>\n                            <div class=\"searh-3\"></div>\n                        </div>\n                    </th>\n                    <th style=\"width:10%\">\n                        <div class=\"table-search\">\n                                <label>{{'table.th.propertyFor' | translate}}</label>\n                        </div>\n                    </th>\n                    <!-- <th style=\"width:14%\">\n                        &nbsp;\n                    </th> -->\n                </tr>\n                <tr class=\"cursor-pointer\" title=\"{{'table.title.clickToViewDetails' | translate}}\" *ngFor=\"let item of items| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: parameter.total }\"\n                    (click)=\"viewLeadDetails(item.id, item)\">\n                    <!-- routerLink=\"/dashboard/leads/csr-closers/{{item.id}}\"  -->\n                    <!-- only inhouse users can do this -->\n                    <td *ngIf=\"admin?.admin_acl['Closer Lead Management']?.can_read==1 && !this.parameter.assignee_id\" (click)=\"$event.stopPropagation()\">\n                        <label class=\"cust-check-bx\" >\n                        <input type=\"checkbox\" [(ngModel)]=\"item.selected\" name=\"document\">\n                        <span class=\"checkmark\"></span>\n                        </label>\n                        <!-- <i class=\"fa\" [ngClass]=\"item.selected?'fa-check-square-o':'fa-square-o'\" (click)=\"item.selected = !item.selected\" aria-hidden=\"true\"></i> -->\n                    </td>\n                    <td>\n                        <img class=\"rounded-circle\" *ngIf=\"item?.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\"\n                              [defaultImage]=\"item?.image| img:'thumb'\" [lazyLoad]=\"item?.image\">\n                        <img class=\"rounded-circle\" *ngIf=\"!item?.image\" src=\"assets/img/default_img.png\" alt=\"img\">\n                    </td>\n                    <td class=\"text-left\">\n                        <span class=\"name\">{{item.name | titlecase}}</span>\n                    </td>\n                    <td class=\"text-left\">\n                    {{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}<br>\n                    {{item.email}}\n                    </td>\n                    <td class=\"text-left\">\n                    <div class=\"property-selected\">\n                        <p class=\"p14 marginB0\">\n                            <app-property-configuration *ngIf=\"item?.selected_properties[0]?.property?.configuration\" [configuration]=\"item?.selected_properties[0]?.property?.configuration\"></app-property-configuration>\n                        </p>\n                        <p class=\"p12 marginB0\"><strong>{{item?.selected_properties[0]?.property?.building?.name}}</strong></p>\n                        <p class=\"p11\"><i>{{item?.selected_properties[0]?.property?.building?.developer?.name}}</i></p>\n                    </div>\n                    </td>\n                    <td class=\"text-left\" title=\"{{'table.title.CSRClosure' | translate}}\">\n                        {{item.closer.name | titlecase}}\n                    </td>\n                    <td class=\"text-left\" *ngIf=\"item.sale_rent\">{{item.sale_rent==1 ? ('leadDetails.buy' | translate) : ('table.tr.td.rent' | translate)}}</td>\n                    <!-- <td>\n                        <a href=\"javascript://\" title=\"View Details\" routerLink=\"/dashboard/leads/csr-closers/{{item.id}}\" class=\"icon-block edit-icon\"><img src=\"assets/img/viewfull.png\" alt=\"img\"></a>\n                    </td> -->\n                </tr>\n            </table>\n            <div class=\"padding20 center\" *ngIf=\"parameter.noResultFound\">\n                <img src=\"assets/img/404-error.png\">\n            </div>\n            </div>\n         </div>\n    \n      </div>\n      </div>\n\n\n    <div class=\"btn-cont marginT15\" *ngIf=\"parameter.total\">\n        <div class=\"row\">\n            <div class=\"col-6\">\n                <div class=\"title-group\">\n                        <p>{{'table.pagination.showing' | translate}} {{items?.length}} {{'table.pagination.outof' | translate}} {{parameter.total}}</p>\n                </div>\n            </div>\n            <div class=\"col-6 text-right\">\n                <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n            </div>\n        </div>\n    </div>\n    </div>\n    \n\n    <!-- Assignment model -->\n<a data-toggle=\"modal\" data-target=\"#assign-model\" #openAssignModel></a>\n<div class=\"modal\" id=\"assign-model\">\n        <div class=\"modal-dialog \">\n            <div class=\"modal-content notary-avail\">\n                <div class=\"modal-header popup-header\">\n                <h4 class=\"modal-title\">{{'leads.reAssignTo' | translate}}</h4>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #closeAssignModel>&times;</button>\n                </div>\n                <div class=\"modal-body\">\n                    <div class=\"row\">\n                        <div class=\"col-md-8 col-6\">\n                            <input style=\"max-width:200px\" list=\"amenities\" [(ngModel)]=\"assign.keyword\" (keyup.enter)=\"getAssignListing()\" class=\"form-control\" type=\"text\" name=\"keyword\" placeholder=\"{{'addForm.placeholder.search' | translate}}\">\n                        </div>\n                        <div class=\"col-md-4 col-5 btn-cont\">\n                            <a class=\"btn btn-primary pull-right\" href=\"javascript://\" (click)=\"assignNow()\">{{'leads.assign' | translate}}</a>\n                        </div>\n                    </div>\n                    <div class=\"spacer40\"></div>\n                    <div class=\"modal-table-data\" malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\">\n                        <table class=\"table\">\n                            <tr *ngFor=\"let item of assign.items\">\n                                <td *ngIf=\"item.is_blocked!=1\">\n                                    <div class=\"n-avail-profile\">\n                                    <img *ngIf=\"item?.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\"\n                                        [defaultImage]=\"item?.image| img:'thumb'\" [lazyLoad]=\"item?.image\">\n                                    <img *ngIf=\"!item?.image\" src=\"assets/img/default_img.png\" alt=\"img\">\n                                    <div class=\"n-avail-info\">\n                                        <p class=\"p12\">{{item.name | titlecase}}</p>\n                                        <p class=\"p10\">{{'leads.phone' | translate}} : {{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}</p>\n                                    </div>\n                                    </div>\n                                </td>\n                                <td *ngIf=\"item.is_blocked!=1\">\n                                    <label class=\"cust-check-bx float-right\">\n                                        <input type=\"radio\" name=\"notary_id\" (click)=\"assignItem = item\">\n                                        <span class=\"checkmark\"></span>\n                                    </label>\n                                </td>\n                            </tr>\n                            <tr *ngIf=\"assign?.items?.length==0\">\n                                <p class=\"show-not-found\">{{'leads.noCSRClosure' | translate}}</p>\n                            </tr>\n                        </table>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>"

/***/ }),

/***/ "./src/app/layout/leads/csr-closer/csr-closer.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/layout/leads/csr-closer/csr-closer.component.ts ***!
  \*****************************************************************/
/*! exports provided: CsrCloserComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CsrCloserComponent", function() { return CsrCloserComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var src_app_services_leads_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/leads.service */ "./src/app/services/leads.service.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var CsrCloserComponent = /** @class */ (function () {
    function CsrCloserComponent(admin, constant, route, spinner, leadsService, router, translate) {
        this.admin = admin;
        this.constant = constant;
        this.route = route;
        this.spinner = spinner;
        this.leadsService = leadsService;
        this.router = router;
        this.translate = translate;
        this.scrollbarOptions = { axis: 'y', theme: 'dark' };
        this.parameter = {};
        this.location = {};
        this.assign = {};
        this.items = [];
        this.today = new Date();
        this.users = [];
        this.initSelection = false;
        this.dash = {
            lead_total: 0,
            noatary_pending: 0,
            bank_pending: 0,
            lead_open: 0,
            lead_closed: 0
        };
        this.chartView = [];
    }
    CsrCloserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.locale = {
            firstDayOfWeek: 0,
            dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
            dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
            dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
            monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
            monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun',
                'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
            today: 'Hoy',
            clear: 'Clara',
            dateFormat: 'mm/dd/yy',
            weekHeader: 'Wk'
        };
        this.parameter.is_selected = false;
        this.parameter.keyword = '';
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        this.parameter.flag = this.leadsService.closureLeadsFlag ? this.leadsService.closureLeadsFlag : this.constant.flag;
        this.parameter.total = 0;
        this.parameter.count_flag = this.leadsService.closureLeadsCountFlag ?
            this.leadsService.closureLeadsCountFlag : this.constant.count_flag;
        this.route.params.subscribe(function (params) {
            _this.parameter.assignee_id = params.id;
        });
        this.getCountries();
        this.getListing();
        this.getCSRDashBoardData();
        Object.assign(this, this.chartView);
    };
    CsrCloserComponent.prototype.getCountries = function () {
        var _this = this;
        this.admin.postDataApi('getCountryLocality', {}).subscribe(function (r) {
            _this.location.countries = r['data'];
        });
    };
    CsrCloserComponent.prototype.onCountryChange = function (id) {
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
    CsrCloserComponent.prototype.onStateChange = function (id) {
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
    CsrCloserComponent.prototype.onCityChange = function (id) {
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
    CsrCloserComponent.prototype.onLocalityChange = function (id) {
        if (!id || id === '0') {
            return false;
        }
        this.parameter.locality_id = id;
        // this.getCsrListing();
    };
    CsrCloserComponent.prototype.changeFlag = function (flag) {
        this.parameter.flag = flag;
        this.leadsService.closureLeadsFlag = flag;
        this.parameter.count_flag = 1;
        this.resetDates();
        this.getListing();
        this.getCSRDashBoardData();
    };
    CsrCloserComponent.prototype.changeFilter = function (key, value) {
        this.parameter[key] = value;
        this.getListing();
    };
    CsrCloserComponent.prototype.changeCountFlag = function (flag) {
        this.parameter.count_flag = flag;
        this.leadsService.closureLeadsCountFlag = flag;
        this.getListing();
    };
    CsrCloserComponent.prototype.getCsrListing = function () {
        var _this = this;
        this.initSelection = true;
        this.users = [];
        var input = new FormData();
        if (this.parameter.keyword) {
            input.append('keyword', this.parameter.keyword);
        }
        // if (this.parameter.country_id && this.parameter.country_id !== '-1') {
        //   input.append('countries', JSON.stringify([this.parameter.country_id]));
        // }
        // if (this.parameter.state_id && this.parameter.state_id !== '-1') {
        //   input.append('states', JSON.stringify([this.parameter.state_id]));
        // }
        // if (this.parameter.city_id && this.parameter.city_id !== '-1') {
        //   input.append('cities', JSON.stringify([this.parameter.city_id]));
        // }
        // if (this.parameter.locality_id && this.parameter.locality_id !== '-1') {
        //   input.append('localities', JSON.stringify([this.parameter.locality_id]));
        // }
        this.admin.postDataApi('getCsrClosers', input).subscribe(function (success) {
            _this.users = success.data;
        });
    };
    CsrCloserComponent.prototype.resetFilters = function () {
        this.location.countries = JSON.parse(JSON.stringify(this.location.countries));
        this.onCountryChange('0');
        this.parameter.is_selected = false;
        this.parameter.page = this.constant.p;
        this.parameter.flag = 2;
        this.parameter.total = 0;
        // this.selectedUser = '';
        this.parameter.keyword = '';
        this.parameter.count_flag = 1;
        this.resetDates();
        this.getListing();
        this.getCSRDashBoardData();
    };
    CsrCloserComponent.prototype.resetDates = function () {
        this.parameter.min = '';
        this.parameter.max = '';
    };
    CsrCloserComponent.prototype.closeCsrListing = function () {
        var _this = this;
        setTimeout(function () {
            _this.users = [];
        }, 200);
    };
    CsrCloserComponent.prototype.selectCsrUser = function (user) {
        this.selectedUser = user;
        this.users = [];
        this.parameter.keyword = '';
        this.initSelection = false;
        this.getListing();
        this.getCSRDashBoardData();
    };
    CsrCloserComponent.prototype.removeCsrUser = function () {
        this.selectedUser = '';
        this.parameter.keyword = '';
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        // this.parameter.flag = 2;
        this.parameter.total = 0;
        this.parameter.count_flag = 1;
        this.getListing();
        this.getCSRDashBoardData();
    };
    CsrCloserComponent.prototype.getCSRDashBoardData = function () {
        var _this = this;
        // const input = new FormData();
        // if (this.selectedUser) {
        //   input.append('assignee_id', this.selectedUser.id);
        // } else if (this.parameter.assignee_id) {
        //   input.append('assignee_id', this.parameter.assignee_id);
        // }
        // if (this.parameter.flag) {
        //   input.append('flag', this.parameter.flag.toString());
        // }
        var input = JSON.parse(JSON.stringify(this.parameter));
        if (this.parameter.min) {
            input.min = moment__WEBPACK_IMPORTED_MODULE_2__(this.parameter.min).format('YYYY-MM-DD');
        }
        else {
            delete input.min;
        }
        if (this.parameter.max) {
            input.max = moment__WEBPACK_IMPORTED_MODULE_2__(this.parameter.max).format('YYYY-MM-DD');
        }
        else {
            delete input.max;
        }
        if (this.selectedUser) {
            input.assignee_id = this.selectedUser.id;
        }
        else if (this.parameter.assignee_id) {
            input.assignee_id = this.parameter.assignee_id;
        }
        this.admin.postDataApi('leads/csr-closer-dash-count', input).subscribe(function (r) {
            _this.dash = r.data;
            _this.chartView = [
                {
                    'name': _this.translate.instant('leads.notaryNotAssigned'),
                    'value': parseInt(_this.dash.noatary_pending, 10)
                },
                {
                    'name': _this.translate.instant('leads.notaryNotAssigned'),
                    'value': parseInt(_this.dash.bank_pending, 10)
                },
                {
                    'name': _this.translate.instant('leads.leadsOpen'),
                    'value': parseInt(_this.dash.lead_open, 10)
                },
                {
                    'name': _this.translate.instant('leads.leadsClosed'),
                    'value': parseInt(_this.dash.lead_closed, 10)
                }
            ];
        });
    };
    CsrCloserComponent.prototype.getListing = function () {
        var _this = this;
        this.users = [];
        this.parameter.noResultFound = false;
        var input = JSON.parse(JSON.stringify(this.parameter));
        if (this.parameter.min) {
            input.min = moment__WEBPACK_IMPORTED_MODULE_2__(this.parameter.min).format('YYYY-MM-DD');
        }
        else {
            delete input.min;
        }
        if (this.parameter.max) {
            input.max = moment__WEBPACK_IMPORTED_MODULE_2__(this.parameter.max).format('YYYY-MM-DD');
        }
        else {
            delete input.max;
        }
        if (this.selectedUser) {
            input.assignee_id = this.selectedUser.id;
        }
        else if (this.parameter.assignee_id) {
            input.assignee_id = this.parameter.assignee_id;
        }
        this.spinner.show();
        this.admin.postDataApi('leads/csr-closer', input).subscribe(function (success) {
            _this.spinner.hide();
            _this.items = success.data;
            if (_this.items.length <= 0) {
                _this.parameter.noResultFound = true;
            }
            _this.parameter.total = success.total_count;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    CsrCloserComponent.prototype.getPage = function (page) {
        this.parameter.page = page;
        this.getListing();
    };
    CsrCloserComponent.prototype.sort_by = function (sort_by_flag) {
        if (this.parameter.sort_by_flag !== sort_by_flag) {
            this.parameter.sort_by_flag = sort_by_flag;
            this.parameter.sort_by_order = 0;
        }
        else {
            this.parameter.sort_by_order = this.parameter.sort_by_order ? 0 : 1;
        }
        this.getListing();
    };
    CsrCloserComponent.prototype.selectAll = function (is_selected) {
        var _this = this;
        this.parameter.is_selected = !is_selected;
        this.items.forEach(function (item) {
            item.selected = _this.parameter.is_selected;
        });
    };
    CsrCloserComponent.prototype.bulkAssign = function () {
        var leads_ids = this.items.filter(function (x) { return x.selected; }).map(function (y) { return y.id; });
        if (leads_ids.length === 0) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseAtleast1Lead'), 'error');
            return false;
        }
        if (!this.assign.items) {
            this.getAssignListing();
        }
        this.openAssignModel.nativeElement.click();
    };
    CsrCloserComponent.prototype.getAssignListing = function () {
        var _this = this;
        var input = {
            keyword: this.assign.keyword
        };
        this.spinner.show();
        this.admin.postDataApi('getCsrClosers', input).subscribe(function (success) {
            _this.spinner.hide();
            _this.assign.items = success.data;
        });
    };
    CsrCloserComponent.prototype.assignNow = function () {
        var _this = this;
        var leads_ids = this.items.filter(function (x) { return x.selected; }).map(function (y) { return y.id; });
        var input = {
            closer_id: this.assignItem.id,
            leads: leads_ids
        };
        this.admin.postDataApi('leads/bulkAssignCloser', input).subscribe(function (r) {
            swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.assignedSuccessfully'), 'success');
            _this.closeAssignModel.nativeElement.click();
            _this.getListing();
        }, function (error) {
            _this.closeAssignModel.nativeElement.click();
            swal(_this.translate.instant('swal.error'), error.error.message, 'error');
        });
    };
    CsrCloserComponent.prototype.viewLeadDetails = function (lead_id, data) {
        this.leadsService.setLeadDetailData(data);
        this.router.navigate(['/dashboard/leads/csr-closers', lead_id]);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('openAssignModel'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CsrCloserComponent.prototype, "openAssignModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('closeAssignModel'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CsrCloserComponent.prototype, "closeAssignModel", void 0);
    CsrCloserComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-csr-closer',
            template: __webpack_require__(/*! ./csr-closer.component.html */ "./src/app/layout/leads/csr-closer/csr-closer.component.html"),
            styles: [__webpack_require__(/*! ./csr-closer.component.css */ "./src/app/layout/leads/csr-closer/csr-closer.component.css")],
            providers: [src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["Constant"]]
        }),
        __metadata("design:paramtypes", [src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_5__["AdminService"],
            src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["Constant"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerService"],
            src_app_services_leads_service__WEBPACK_IMPORTED_MODULE_6__["LeadsService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateService"]])
    ], CsrCloserComponent);
    return CsrCloserComponent;
}());



/***/ }),

/***/ "./src/app/layout/leads/csr-renter/csr-renter.component.css":
/*!******************************************************************!*\
  !*** ./src/app/layout/leads/csr-renter/csr-renter.component.css ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9sZWFkcy9jc3ItcmVudGVyL2Nzci1yZW50ZXIuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/layout/leads/csr-renter/csr-renter.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/layout/leads/csr-renter/csr-renter.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container-fluid\">\n  <div class=\"row\">\n      <div class=\"col-md-4\">\n          <div class=\"form-group\">\n              <p class=\"p16\">{{'leads.CSRRenterLeads' | translate}}</p>\n          </div>\n      </div>\n  </div>\n  <div class=\"row\">\n      <div class=\"col-md-4\">\n          <div class=\"form-group\" *ngIf=\"admin?.admin_acl['Renter Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n              <div class=\"d-flex\">\n              <div class=\"autocomplete\">\n                  <input placeholder=\"{{'addForm.placeholder.searchCSRSeller' | translate}}\" style=\"max-width:200px\" list=\"amenities\" [(ngModel)]=\"parameter.keyword\" (input)=\"getCsrListing()\" class=\"form-control\" type=\"text\" name=\"keyword\" (focusout)=\"closeCsrListing()\">\n                  <div id=\"myInputautocomplete-list\" class=\"autocomplete-items\">\n                      <div *ngFor=\"let item of users\" (click)=\"selectCsrUser(item)\">{{item.email}}</div>\n                  </div>\n              </div>\n              </div>\n          </div>\n      </div>\n      <div class=\"col-md-8 col-12\">\n          <div class=\"cust-tabs-2\">\n              <ul class=\"nav nav-tabs\">\n              <li class=\"nav-item\">\n                  <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==1}\" (click)=\"changeFlag(1)\">{{'filters.time.thisWeek' | translate}}</a>\n              </li>\n              <li class=\"nav-item\">\n                  <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==2}\" (click)=\"changeFlag(2)\" >{{'filters.time.thisMonth' | translate}}</a>\n              </li>\n              <li class=\"nav-item\">\n                  <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==3}\" (click)=\"changeFlag(3)\" >{{'filters.time.lastMonth' | translate}}</a>\n              </li>\n              <li class=\"nav-item\">\n                  <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==4}\" (click)=\"changeFlag(4)\" >{{'filters.time.lifetime' | translate}}</a>\n              </li>\n              <li class=\"nav-item\">\n                  <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==5}\" (click)=\"parameter.flag=5\" >{{'filters.time.custom.label' | translate}}</a>\n              </li>\n              </ul>\n          </div>\n      </div>\n  </div>\n\n  <div class=\"row\">\n      <div class=\"col-12\">\n          <div *ngIf=\"parameter.flag == 5\" class=\"row\">\n              <div class=\"offset-lg-7\"></div>\n              <div class=\"col-lg-2 col-md-2 col-sm-5 col-5\">\n              <div class=\"form-group marginB0\">\n                  <label>{{'filters.time.custom.from' | translate}}:</label>\n                  <p-calendar showIcon=\"true\" [locale]=\"locale\" [(ngModel)]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2040\"></p-calendar>\n              </div>\n              </div>\n              <div class=\"col-lg-2 col-md-2 col-sm-5 col-5\">\n              <div class=\"form-group marginB0\">\n                  <label>{{'filters.time.custom.to' | translate}}:</label>\n                  <p-calendar showIcon=\"true\" [locale]=\"locale\" [(ngModel)]=\"parameter.max\" [minDate]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2040\"></p-calendar>\n              </div>\n              </div>\n              <div class=\"col-lg-1 col-md-2 col-sm-2 col-6\">\n              <div class=\"form-group btn-cont\">\n                  <label class=\"addMT3\">&nbsp;</label>\n                  <button class=\"btn btn-calender\" href=\"javascript://\" (click)=\"getListing(); getCSRDashBoardData();\"\n                      [disabled]=\"!parameter.min || !parameter.max\">{{'filters.time.custom.applyBtn' | translate}}</button>\n              </div>\n              </div>\n          </div>\n      </div>\n  </div>\n  <div class=\"listingResults\" >\n      <div class=\"row\" *ngIf=\"admin?.admin_acl['Renter Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n          <div class=\"col-md-2\">\n              <div class=\"form-group\">\n              <label>{{'filters.location.country' | translate}}</label>\n              <select class=\"form-control\" (change)=\"onCountryChange($event.target.value)\">\n                  <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n                  <option *ngFor=\"let item of location.countries\" [value]=\"item.id\">{{item.name}}</option>\n              </select>\n              </div>\n          </div>\n          <div class=\"col-md-2\">\n              <div class=\"form-group\">\n              <label>{{'filters.location.state' | translate}}</label>\n              <select class=\"form-control\" (change)=\"onStateChange($event.target.value)\">\n                  <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n                  <option *ngFor=\"let item of location.states\" [value]=\"item.id\">{{item.name}}</option>\n              </select>\n              </div>\n          </div>\n          <div class=\"col-md-2\">\n              <div class=\"form-group\">\n              <label>{{'filters.location.city' | translate}}</label>\n                  <select class=\"form-control\" (change)=\"onCityChange($event.target.value)\">\n                  <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n                  <option *ngFor=\"let item of location.cities\" [value]=\"item.id\">{{item.name}}</option>\n                  </select>\n              </div>\n          </div>\n  \n          <div class=\"col-md-2\">\n              <div class=\"form-group\">\n              <label>{{'filters.location.locality' | translate}}</label>\n              <select class=\"form-control\" (change)=\"onLocalityChange($event.target.value)\">\n                  <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n                  <option *ngFor=\"let item of location.localities\" [value]=\"item.id\">{{item.name}}</option>\n              </select>\n              </div>\n          </div>\n  \n          <div class=\"col-md-2\">\n              <div class=\"form-group btn-cont\">\n              <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n              <button type=\"button\" (click)=\"getListing(); getCSRDashBoardData();\" class=\"btn btn-primary-new width100P\">{{'filters.location.applyBtn' | translate}}</button>\n              </div>\n          </div>\n  \n          <div class=\"col-md-2\">\n              <div class=\"form-group btn-cont\">\n              <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n              <button type=\"button\" (click)=\"resetFilters()\" class=\"btn btn-primary-new width100P\">{{'filters.location.resetBtn' | translate}}</button>\n              </div>\n          </div>\n      </div>\n      <div *ngIf=\"selectedUser as item\" class=\"sigle-row-table\">\n      <table class=\"table table-striped\">\n      <tbody><tr>\n          <td>\n              <!-- <img class=\"rounded-circle\" [src]=\"item.image| img:'small'\" onerror='this.src=\"assets/img/default_img.png\"' alt=\"img\"> -->\n              <img *ngIf=\"item.image\" class=\"rounded-circle\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\"\n                            [defaultImage]=\"item.image| img:'thumb'\" [lazyLoad]=\"item.image\">\n              <img *ngIf=\"!item.image\" class=\"rounded-circle\" src=\"assets/img/default_img.png\" alt=\"img\">\n          </td>\n          <td class=\"text-left\">\n              <span class=\"name\">{{item.name | titlecase}}</span>\n          </td>\n          <td class=\"text-left\">{{item.phone}}</td>\n          <td class=\"text-left\">{{item.email}}</td>\n          <td>\n              <a (click)=\"removeCsrUser()\" href=\"javascript://\" class=\"icon-block edit-icon\"><img src=\"assets/img/remove-icon.png\" alt=\"remove\" title=\"{{'table.title.remove' | translate}}\" /></a>\n          </td>\n          </tr>\n      </tbody>\n      </table>\n</div>\n<div class=\"row\">\n   <div class=\"col-lg-8 col-md-12 col-sm-12 col-12\">\n      <div class=\"info-box all-leads\">\n         <div class=\"row\">\n            <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == 1}\" (click)=\"changeCountFlag(1)\">\n               <div class=\"one-row \">\n                  <div class=\"o-block\">\n                     <h5>{{'table.th.leads' | translate}}</h5>\n                     <small>{{'table.th.total' | translate}}</small>\n                  </div>\n                  <div class=\"o-block\">\n                     <a class=\"view-all\" href=\"javascript://\">{{'table.th.viewAll' | translate}}</a>\n                     <h4>{{dash?.lead_total || 0}}</h4>\n                  </div>\n               </div>\n            </div>\n            <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == 2}\" (click)=\"changeCountFlag(2)\">\n               <div class=\"one-row\">\n                  <div class=\"o-block\">\n                     <h5>{{'table.th.leads' | translate}}</h5>\n                     <small>{{'table.th.withoutProperty' | translate}}</small>\n                  </div>\n                  <div class=\"o-block\">\n                     <a class=\"view-all\" href=\"javascript://\">{{'table.th.viewAll' | translate}}</a>\n                     <h4>{{dash?.lead_without_property || 0}}</h4>\n                  </div>\n               </div>\n            </div>\n         </div>\n      </div>\n      <div class=\"info-box all-leads\">\n         <div class=\"row\">\n            <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == 3}\" (click)=\"changeCountFlag(3)\">\n               <div class=\"one-row \">\n                  <div class=\"o-block\">\n                     <h5>{{'table.th.leads' | translate}}</h5>\n                     <small>{{'table.th.withProperty' | translate}}</small>\n                  </div>\n                  <div class=\"o-block\">\n                     <a class=\"view-all\" href=\"javascript://\">{{'table.th.viewAll' | translate}}</a>\n                     <h4>{{dash?.lead_with_property || 0}}</h4>\n                  </div>\n               </div>\n            </div>\n            <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == 4}\" (click)=\"changeCountFlag(4)\">\n               <div class=\"one-row\">\n                  <div class=\"o-block\">\n                     <h5>{{'table.th.leads' | translate}}</h5>\n                     <small>{{'table.th.pendingProperties' | translate}}</small>\n                  </div>\n                  <div class=\"o-block\">\n                     <a class=\"view-all\" href=\"javascript://\">{{'table.th.viewAll' | translate}}</a>\n                     <h4>{{dash?.lead_property_pending || 0}}</h4>\n                  </div>\n               </div>\n            </div>\n         </div>\n      </div>\n\n   </div>\n   <div class=\"col-lg-4 col-md-12 col-sm-12 col-12\">\n      <div class=\"chat-msg all-leads\" style=\"padding:0px\">\n          <div class=\"padding20\" *ngIf=\"dash.lead_total == 0\">{{'message.error.noRecordFound' | translate}}</div>\n          <ngx-charts-pie-chart [results]=\"chartView\"></ngx-charts-pie-chart>\n      </div>\n   </div>\n</div>\n<div class=\"row\">\n   <div class=\"col-12\">\n      <div class=\"spacer40\"></div>\n   </div>\n\n</div>\n<div class=\"row\">\n   <div class=\"col-lg-6 col-md-6 col-6\">\n      <div class=\"title-group\">\n         <h5>{{'table.th.leads' | translate}} \n          <span *ngIf=\"parameter.count_flag == 1\">({{'table.th.total' | translate}})</span>\n          <span *ngIf=\"parameter.count_flag == 2\">({{'table.th.withoutProperty' | translate}})</span>\n          <span *ngIf=\"parameter.count_flag == 3\">({{'table.th.withProperty' | translate}})</span>\n          <span *ngIf=\"parameter.count_flag == 4\">({{'table.th.pendingProperties' | translate}})</span>\n         </h5>\n      </div>\n   </div>\n   <div class=\"col-lg-6 col-md-6 col-5\" *ngIf=\"admin?.admin_acl['Renter Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n      <div class=\"add-new text-right\">\n          <a class=\"btn\" (click)=\"bulkAssign()\" href=\"javascript://\">{{'table.th.bulkReassign' | translate}}</a>\n      </div>\n  </div>\n</div>\n<div class=\"white-bg\">\n   <div class=\"tabel-section\">\n      <div class=\"table-responsive\">\n         <table class=\"table table-striped border-0\">\n            <tbody>\n            <tr>\n              <th *ngIf=\"admin?.admin_acl['Renter Lead Management']?.can_read==1 && !this.parameter.assignee_id\" style=\"width:5%;\">\n                  <div class=\"table-search\">\n                      <label>{{'table.th.all' | translate}}</label>\n                      <div>\n                          <label class=\"cust-check-bx marginT0\">\n                              <input class=\"width1\" type=\"checkbox\" (click)=\"selectAll(parameter.is_selected)\" name=\"document\">\n                              <span class=\"checkmark\"></span>\n                          </label>\n                      </div>\n                  </div>\n              </th>\n              <th style=\"width:5%;\">\n                  <div class=\"table-search\">\n                          <label>{{'table.th.image' | translate}}</label>\n                  </div>\n              </th>\n              <th style=\"width:15%;\">\n                  <div class=\"table-search\">\n                          <label>{{'table.th.name' | translate}}</label>\n                     <div class=\"searh-3\">\n                      <input autocomplete=\"off\" type=\"text\" name=\"name\" [(ngModel)]=\"parameter.name\" (keyup.enter)=\"getListing()\">\n                      <button *ngIf=\"parameter.name\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                    </div>\n                  </div>\n              </th>\n              <th style=\"width:15%;\">\n                  <div class=\"table-search\">\n                          <label>{{'table.th.contactNumber' | translate}}</label>\n                     <div class=\"searh-3\">\n                          <input autocomplete=\"off\" type=\"text\" name=\"phone\" [(ngModel)]=\"parameter.phone\" (keyup.enter)=\"getListing()\">\n                          <button *ngIf=\"parameter.phone\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                      </div>\n                  </div>\n              </th>\n              <th style=\"width:20%;\">\n                  <div class=\"table-search\">\n                          <label>{{'table.th.emailAddress' | translate}}</label>\n                     <div class=\"searh-3\">\n                          <input autocomplete=\"off\" type=\"text\" name=\"email\" [(ngModel)]=\"parameter.email\" (keyup.enter)=\"getListing()\">\n                          <button *ngIf=\"parameter.email\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                     </div>\n                  </div>\n               </th>\n               <th style=\"width:10%;\">\n                  <div class=\"table-search\">\n                          <label>{{'table.th.assignee' | translate}}</label>\n                  </div>\n               </th>\n               <th style=\"width:5%;\">\n                  <div class=\"table-search\">\n                          <label>{{'table.th.chatWithSeller' | translate}}</label>\n                  </div>\n               </th>\n               <th style=\"width:5%;\">\n                  <div class=\"table-search\">\n                          <label>{{'table.th.chatWithAgent' | translate}}</label>\n                  </div>\n               </th>\n               <th style=\"width:5%;\">\n                  <div class=\"table-search\">\n                          <label>{{'table.th.properties' | translate}}</label>\n                  </div>\n                  <div class=\"ppties\">\n                      <a href=\"javascript://\" (click)=\"sort_by(3)\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"{{'table.title.Attracted' | translate}}\" data-original-title=\"Attracted\">A<img [ngClass]=\"{'upsidedown':parameter.sort_by_flag==3 && parameter.sort_by_order==0}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n                  </div>\n               </th>\n               <th style=\"width:5%;\">\n                 <label>&nbsp;</label>\n                <div class=\"ppties\">\n                   <a href=\"javascript://\" (click)=\"sort_by(4)\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"{{'table.title.Contacted' | translate}}\" data-original-title=\"Contacted\">C<img [ngClass]=\"{'upsidedown':parameter.sort_by_flag==4 && parameter.sort_by_order==0}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n                   </div>\n               </th>\n               <th style=\"width:5%;\">\n                <label>&nbsp;</label>\n                <div class=\"ppties\">\n                   <a href=\"javascript://\" (click)=\"sort_by(2)\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"{{'table.title.Scheduled' | translate}}\" data-original-title=\"Scheduled\">S<img [ngClass]=\"{'upsidedown':parameter.sort_by_flag==2 && parameter.sort_by_order==0}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n                   </div>\n               </th>\n               <th style=\"width:5%;\">\n                <label>&nbsp;</label>\n                <div class=\"ppties\">\n                   <a href=\"javascript://\" (click)=\"sort_by(1)\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"{{'table.title.Negotiating' | translate}}\" data-original-title=\"Negotiating\">N<img [ngClass]=\"{'upsidedown':parameter.sort_by_flag==1 && parameter.sort_by_order==0}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n                   </div>\n               </th>\n               <th style=\"width:5%;\">\n                <label>&nbsp;</label>\n                <div class=\"ppties\">\n                   <a href=\"javascript://\" (click)=\"sort_by(5)\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"{{'table.title.Layaway' | translate}}\" data-original-title=\"Layaway\">L<img [ngClass]=\"{'upsidedown':parameter.sort_by_flag==5 && parameter.sort_by_order==0}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n                   </div>\n               </th>\n               <th style=\"width:5%;\">\n                <label>&nbsp;</label>\n                <div class=\"ppties\">\n                   <a href=\"javascript://\" (click)=\"sort_by(1)\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"{{'table.title.Deal Done' | translate}}\" data-original-title=\"Deal Done\">D<img [ngClass]=\"{'upsidedown':parameter.sort_by_flag==1 && parameter.sort_by_order==0}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n                   </div>\n               </th>\n               <th style=\"width:5%;\">\n                <label>&nbsp;</label>\n                <div class=\"ppties\">\n                   <a href=\"javascript://\" (click)=\"sort_by(5)\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"{{'table.title.Lead Lost' | translate}}\" data-original-title=\"Lead Lost\">L<img [ngClass]=\"{'upsidedown':parameter.sort_by_flag==5 && parameter.sort_by_order==0}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n                   </div>\n               </th>\n            </tr>\n            <tr class=\"cursor-pointer\" title=\"{{'table.title.clickToViewDetails' | translate}}\" *ngFor=\"let item of items| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: parameter.total }\"\n            >\n              <td *ngIf=\"admin?.admin_acl['Renter Lead Management']?.can_read==1 && !this.parameter.assignee_id\" (click)=\"$event.stopPropagation()\">\n                  <label class=\"cust-check-bx marginT0\">\n                  <input type=\"checkbox\" [(ngModel)]=\"item.selected\" name=\"document\">\n                  <span class=\"checkmark\"></span>\n                  </label>\n                  <!-- <i class=\"fa\" [ngClass]=\"item.selected?'fa-check-square-o':'fa-square-o'\" (click)=\"item.selected = !item.selected\" aria-hidden=\"true\"></i> -->\n              </td>\n              <td routerLink=\"/dashboard/leads/csr-sellers/{{item.id}}\">\n                  <img class=\"rounded-circle\" *ngIf=\"item.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\"\n                            [defaultImage]=\"item.image| img:'thumb'\" [lazyLoad]=\"item.image\">\n                  <img class=\"rounded-circle\" *ngIf=\"!item.image\" src=\"assets/img/default_img.png\" alt=\"img\">\n              </td>\n              <td class=\"text-left\" routerLink=\"/dashboard/leads/csr-sellers/{{item.id}}\">\n                <span class=\"name\">{{item.name | titlecase}}</span>\n               </td>\n               <td routerLink=\"/dashboard/leads/csr-sellers/{{item.id}}\" class=\"text-left\" *ngIf=\"item.phone\">{{item.dial_code}}-{{item.phone.trim()}}</td>\n               <td routerLink=\"/dashboard/leads/csr-sellers/{{item.id}}\" class=\"text-left\" *ngIf=\"!item.phone\">{{'table.tr.td.NA' | translate}}</td>\n              <td routerLink=\"/dashboard/leads/csr-sellers/{{item.id}}\" class=\"text-left\">\n                  {{item.email}}\n              </td>\n               <td routerLink=\"/dashboard/leads/csr-sellers/{{item.id}}\" class=\"text-left\">{{item.csr_seller_name?item.csr_seller_name:('table.tr.td.NA' | translate)}}</td>\n               <td class=\"text-left\" (click)=\"getCSRSellerChat($event, 1, item.assigned_csr_seller_id, item.id)\">\n                   <a class=\"green-color fontW500\" href=\"javascript://\">{{'table.th.chatWithSeller' | translate}}</a>\n               </td>\n               <td class=\"text-left\" (click)=\"getCSRSellerChat($event, 2, item.assigned_csr_seller_id, item.id)\">\n                  <a class=\"green-color fontW500\" href=\"javascript://\">{{'table.th.chatWithAgent' | translate}}</a>\n              </td>\n               <td routerLink=\"/dashboard/leads/csr-sellers/{{item.id}}\">\n                {{item.approved_count}}\n               </td>\n               <td routerLink=\"/dashboard/leads/csr-sellers/{{item.id}}\">\n                {{item.rejected_count}}\n               </td>\n               <td routerLink=\"/dashboard/leads/csr-sellers/{{item.id}}\">\n                  {{item.pending_count}}\n               </td>\n               <td routerLink=\"/dashboard/leads/csr-sellers/{{item.id}}\">\n                  {{item.draft_count}}\n               </td>\n               <td routerLink=\"/dashboard/leads/csr-sellers/{{item.id}}\">\n                  {{item.total_count}}\n               </td>\n            </tr>\n         </tbody></table>\n         <div class=\"padding20 center\" *ngIf=\"parameter.noResultFound\">\n              <img src=\"assets/img/404-error.png\">\n          </div>\n      </div>\n   </div>\n\n</div>\n</div>\n\n  <div class=\"btn-cont marginT15\" *ngIf=\"parameter.total\">\n      <div class=\"row\">\n          <div class=\"col-6\">\n              <div class=\"title-group\">\n                      <p>{{'table.pagination.showing' | translate}} {{items?.length}} {{'table.pagination.outof' | translate}} {{parameter.total}}</p>\n              </div>\n          </div>\n          <div class=\"col-6 text-right\">\n              <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n          </div>\n      </div>\n  </div>\n</div>\n\n\n\n<!-- Assignment model -->\n<a data-toggle=\"modal\" data-target=\"#assign-model\" #openAssignModel></a>\n<div class=\"modal\" id=\"assign-model\">\n  <div class=\"modal-dialog \">\n      <div class=\"modal-content notary-avail\">\n          <div class=\"modal-header popup-header\">\n                  <h4 class=\"modal-title\">{{'leads.reAssignTo' | translate}}</h4>\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #closeAssignModel>&times;</button>\n          </div>\n          <div class=\"modal-body\">\n              <div class=\"row\">\n                  <div class=\"col-md-8 col-6\">\n                      <input style=\"max-width:200px\" list=\"amenities\" [(ngModel)]=\"assign.keyword\" (keyup.enter)=\"getAssignListing()\" class=\"form-control\" type=\"text\" name=\"keyword\" placeholder=\"{{'addForm.placeholder.search' | translate}}\">\n                  </div>\n                  <div class=\"col-md-4 col-5 btn-cont\">\n                      <a class=\"btn btn-primary pull-right\" href=\"javascript://\" (click)=\"assignNow()\">{{'leads.assign' | translate}}</a>\n                  </div>\n              </div>\n              <div class=\"spacer40\"></div>\n              <div class=\"modal-table-data\" malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\">\n                  <table class=\"table\">\n                      <tr *ngFor=\"let item of assign.items\">\n                          <td *ngIf=\"item.is_blocked!=1\">\n                              <div class=\"n-avail-profile\">\n                              <!-- <img [src]=\"item.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\"> -->\n                              <img *ngIf=\"item.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\"\n                                  [defaultImage]=\"item.image| img:'thumb'\" [lazyLoad]=\"item.image\">\n                              <img *ngIf=\"!item.image\" src=\"assets/img/default_img.png\" alt=\"img\">\n                              <div class=\"n-avail-info\">\n                                  <p class=\"p12\">{{item.name | titlecase}}</p>\n                                  <p class=\"p10\">{{'leads.phone' | translate}} : {{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}</p>\n                              </div>\n                              </div>\n                          </td>\n                          <td *ngIf=\"item.is_blocked!=1\">\n                              <label class=\"cust-check-bx float-right\">\n                                  <input type=\"radio\" name=\"notary_id\" (click)=\"assignItem = item\">\n                                  <span class=\"checkmark\"></span>\n                              </label>\n                          </td>\n                      </tr>\n                      <tr *ngIf=\"assign?.items?.length==0\">\n                          <p class=\"show-not-found\">{{'leads.noCSRSeller' | translate}}</p>\n                      </tr>\n                  </table>\n              </div>\n          </div>\n      </div>\n  </div>\n</div>\n  "

/***/ }),

/***/ "./src/app/layout/leads/csr-renter/csr-renter.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/layout/leads/csr-renter/csr-renter.component.ts ***!
  \*****************************************************************/
/*! exports provided: CsrRenterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CsrRenterComponent", function() { return CsrRenterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var src_app_services_leads_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/leads.service */ "./src/app/services/leads.service.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var CsrRenterComponent = /** @class */ (function () {
    function CsrRenterComponent(admin, leadsService, constant, route, router, spinner, translate) {
        this.admin = admin;
        this.leadsService = leadsService;
        this.constant = constant;
        this.route = route;
        this.router = router;
        this.spinner = spinner;
        this.translate = translate;
        this.scrollbarOptions = { axis: 'y', theme: 'dark' };
        this.parameter = {};
        this.location = {};
        this.assign = {};
        this.items = [];
        this.today = new Date();
        this.users = [];
        this.initSelection = false;
        this.dash = {
            lead_total: 0,
            lead_property_pending: 0,
            lead_with_property: 0,
            lead_without_property: 0
        };
        this.chartView = [];
    }
    CsrRenterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.locale = {
            firstDayOfWeek: 0,
            dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
            dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
            dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
            monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
            monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun',
                'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
            today: 'Hoy',
            clear: 'Clara',
            dateFormat: 'mm/dd/yy',
            weekHeader: 'Wk'
        };
        this.parameter.is_selected = false;
        this.parameter.keyword = '';
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        this.parameter.flag = this.leadsService.sellerLeadsFlag ? this.leadsService.sellerLeadsFlag : this.constant.flag;
        this.parameter.total = 0;
        this.parameter.count_flag = this.leadsService.sellerLeadsCountFlag ? this.leadsService.sellerLeadsCountFlag : this.constant.count_flag;
        this.route.params.subscribe(function (params) {
            _this.parameter.assignee_id = params.id;
        });
        this.getCountries();
        this.getListing();
        this.getCSRDashBoardData();
        Object.assign(this, this.chartView);
    };
    CsrRenterComponent.prototype.getCountries = function () {
        var _this = this;
        this.admin.postDataApi('getCountryLocality', {}).subscribe(function (r) {
            _this.location.countries = r['data'];
        });
    };
    CsrRenterComponent.prototype.onCountryChange = function (id) {
        this.parameter.country_id = id;
        this.location.states = [];
        this.parameter.state_id = '0';
        this.location.cities = [];
        this.parameter.city_id = '0';
        this.location.localities = [];
        this.parameter.locality_id = '0';
        if (!id || id === '0') {
            return false;
        }
        this.parameter.country_id = id;
        var selectedCountry = this.location.countries.filter(function (x) { return x.id.toString() === id; });
        this.location.states = selectedCountry[0].states;
    };
    CsrRenterComponent.prototype.onStateChange = function (id) {
        this.location.cities = [];
        this.parameter.city_id = '0';
        this.location.localities = [];
        this.parameter.locality_id = '0';
        if (!id || id === '0') {
            return false;
        }
        this.parameter.state_id = id;
        var selectedState = this.location.states.filter(function (x) { return x.id.toString() === id; });
        this.location.cities = selectedState[0].cities;
    };
    CsrRenterComponent.prototype.onCityChange = function (id) {
        this.location.localities = [];
        this.parameter.locality_id = '0';
        if (!id || id === '0') {
            return false;
        }
        this.parameter.city_id = id;
        var selectedCountry = this.location.cities.filter(function (x) { return x.id.toString() === id; });
        this.location.localities = selectedCountry[0].localities;
    };
    CsrRenterComponent.prototype.onLocalityChange = function (id) {
        if (!id || id === '0') {
            return false;
        }
        this.parameter.locality_id = id;
        // this.getCsrListing();
    };
    CsrRenterComponent.prototype.changeFlag = function (flag) {
        this.parameter.flag = flag;
        this.leadsService.sellerLeadsFlag = flag;
        this.parameter.count_flag = 1;
        this.resetDates();
        this.getListing();
        this.getCSRDashBoardData();
    };
    CsrRenterComponent.prototype.changeFilter = function (key, value) {
        this.parameter[key] = value;
        this.getListing();
    };
    CsrRenterComponent.prototype.changeCountFlag = function (flag) {
        this.parameter.count_flag = flag;
        this.leadsService.sellerLeadsCountFlag = flag;
        this.getListing();
    };
    CsrRenterComponent.prototype.getCsrListing = function () {
        var _this = this;
        this.initSelection = true;
        this.users = [];
        var input = new FormData();
        if (this.parameter.keyword) {
            input.append('keyword', this.parameter.keyword);
        }
        this.admin.postDataApi('getCsrSellers', input).subscribe(function (success) {
            _this.users = success.data;
        });
    };
    CsrRenterComponent.prototype.resetFilters = function () {
        this.location.countries = JSON.parse(JSON.stringify(this.location.countries));
        this.onCountryChange('0');
        this.parameter.is_selected = false;
        this.parameter.page = this.constant.p;
        this.parameter.flag = 2;
        this.parameter.total = 0;
        // this.selectedUser = '';
        this.parameter.keyword = '';
        this.parameter.count_flag = 1;
        this.resetDates();
        this.getListing();
        this.getCSRDashBoardData();
    };
    CsrRenterComponent.prototype.resetDates = function () {
        this.parameter.min = '';
        this.parameter.max = '';
    };
    CsrRenterComponent.prototype.closeCsrListing = function () {
        var _this = this;
        setTimeout(function () {
            _this.users = [];
        }, 200);
    };
    CsrRenterComponent.prototype.selectCsrUser = function (user) {
        this.selectedUser = user;
        this.users = [];
        this.parameter.keyword = '';
        this.initSelection = false;
        this.getListing();
        this.getCSRDashBoardData();
    };
    CsrRenterComponent.prototype.removeCsrUser = function () {
        this.selectedUser = '';
        this.parameter.keyword = '';
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        // this.parameter.flag = 2;
        this.parameter.total = 0;
        this.parameter.count_flag = 1;
        this.getListing();
        this.getCSRDashBoardData();
    };
    CsrRenterComponent.prototype.getCSRDashBoardData = function () {
        var _this = this;
        // const input = new FormData();
        // if (this.selectedUser) {
        //   input.append('assignee_id', this.selectedUser.id);
        // } else if (this.parameter.assignee_id) {
        //   input.append('assignee_id', this.parameter.assignee_id);
        // }
        // if (this.parameter.flag) {
        //   input.append('flag', this.parameter.flag.toString());
        // }
        var input = JSON.parse(JSON.stringify(this.parameter));
        if (this.parameter.min) {
            input.min = moment__WEBPACK_IMPORTED_MODULE_2__(this.parameter.min).format('YYYY-MM-DD');
        }
        else {
            delete input.min;
        }
        if (this.parameter.max) {
            input.max = moment__WEBPACK_IMPORTED_MODULE_2__(this.parameter.max).format('YYYY-MM-DD');
        }
        else {
            delete input.max;
        }
        if (this.selectedUser) {
            input.assignee_id = this.selectedUser.id;
        }
        else if (this.parameter.assignee_id) {
            input.assignee_id = this.parameter.assignee_id;
        }
        this.admin.postDataApi('leads/csr-seller-dash-count', input).subscribe(function (r) {
            _this.dash = []; // r.data;
            _this.chartView = [
                {
                    'name': _this.translate.instant('leads.propertyPending'),
                    'value': 0 // parseInt(this.dash.lead_property_pending, 10)
                },
                {
                    'name': _this.translate.instant('leads.leadWithProperty'),
                    'value': 0 // parseInt(this.dash.lead_with_property, 10)
                },
                {
                    'name': _this.translate.instant('leads.leadWithoutProperty'),
                    'value': 0 //parseInt(this.dash.lead_without_property, 10)
                }
            ];
        });
    };
    CsrRenterComponent.prototype.getListing = function () {
        var _this = this;
        this.items = [];
        this.parameter.noResultFound = false;
        var input = JSON.parse(JSON.stringify(this.parameter));
        if (this.parameter.min) {
            input.min = moment__WEBPACK_IMPORTED_MODULE_2__(this.parameter.min).format('YYYY-MM-DD');
        }
        else {
            delete input.min;
        }
        if (this.parameter.max) {
            input.max = moment__WEBPACK_IMPORTED_MODULE_2__(this.parameter.max).format('YYYY-MM-DD');
        }
        else {
            delete input.max;
        }
        if (this.selectedUser) {
            input.assignee_id = this.selectedUser.id;
        }
        else if (this.parameter.assignee_id) {
            input.assignee_id = this.parameter.assignee_id;
        }
        this.spinner.show();
        this.admin.postDataApi('leads/csr-seller', input).subscribe(function (success) {
            _this.spinner.hide();
            _this.items = []; // success.data;
            if (_this.items.length <= 0) {
                _this.parameter.noResultFound = true;
            }
            _this.parameter.total = 0; //success.total_count;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    CsrRenterComponent.prototype.getPage = function (page) {
        this.parameter.page = page;
        this.getListing();
    };
    CsrRenterComponent.prototype.sort_by = function (sort_by_flag) {
        if (this.parameter.sort_by_flag !== sort_by_flag) {
            this.parameter.sort_by_flag = sort_by_flag;
            this.parameter.sort_by_order = 0;
        }
        else {
            this.parameter.sort_by_order = this.parameter.sort_by_order ? 0 : 1;
        }
        this.getListing();
    };
    CsrRenterComponent.prototype.selectAll = function (is_selected) {
        var _this = this;
        this.parameter.is_selected = !is_selected;
        this.items.forEach(function (item) {
            item.selected = _this.parameter.is_selected;
        });
    };
    CsrRenterComponent.prototype.bulkAssign = function () {
        var leads_ids = this.items.filter(function (x) { return x.selected; }).map(function (y) { return y.id; });
        if (leads_ids.length === 0) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseAtleast1Lead'), 'error');
            return false;
        }
        if (!this.assign.items) {
            this.getAssignListing();
        }
        this.openAssignModel.nativeElement.click();
    };
    CsrRenterComponent.prototype.getAssignListing = function () {
        var _this = this;
        var input = {
            keyword: this.assign.keyword
        };
        this.spinner.show();
        this.admin.postDataApi('getCsrSellers', input).subscribe(function (success) {
            _this.spinner.hide();
            _this.assign.items = []; // success.data;
        });
    };
    CsrRenterComponent.prototype.assignNow = function () {
        var _this = this;
        var leads_ids = this.items.filter(function (x) { return x.selected; }).map(function (y) { return y.id; });
        var input = {
            csr_seller_id: this.assignItem.id,
            leads: leads_ids
        };
        this.spinner.show();
        this.admin.postDataApi('leads/bulkAssignSeller', input).subscribe(function (r) {
            _this.spinner.hide();
            swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.assignedSuccessfully'), 'success');
            _this.closeAssignModel.nativeElement.click();
            _this.getListing();
        }, function (error) {
            _this.spinner.hide();
            _this.closeAssignModel.nativeElement.click();
            swal(_this.translate.instant('swal.error'), error.error.message, 'error');
        });
    };
    CsrRenterComponent.prototype.getCSRSellerChat = function ($event, chat_with, csr_seller_id, lead_id) {
        // chat_with = 1 means chat with seller, 2 means chat with agent
        if (csr_seller_id) {
            this.router.navigate(['/dashboard/leads/chat-with-seller', chat_with, csr_seller_id, lead_id]);
        }
        else {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.noCSRSellerAssigned'), 'error');
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('openAssignModel'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CsrRenterComponent.prototype, "openAssignModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('closeAssignModel'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CsrRenterComponent.prototype, "closeAssignModel", void 0);
    CsrRenterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-csr-renter',
            template: __webpack_require__(/*! ./csr-renter.component.html */ "./src/app/layout/leads/csr-renter/csr-renter.component.html"),
            styles: [__webpack_require__(/*! ./csr-renter.component.css */ "./src/app/layout/leads/csr-renter/csr-renter.component.css")],
            providers: [src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["Constant"]]
        }),
        __metadata("design:paramtypes", [src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_5__["AdminService"],
            src_app_services_leads_service__WEBPACK_IMPORTED_MODULE_6__["LeadsService"],
            src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["Constant"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateService"]])
    ], CsrRenterComponent);
    return CsrRenterComponent;
}());



/***/ }),

/***/ "./src/app/layout/leads/csr-seller/csr-seller-detail/csr-seller-detail.component.css":
/*!*******************************************************************************************!*\
  !*** ./src/app/layout/leads/csr-seller/csr-seller-detail/csr-seller-detail.component.css ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9sZWFkcy9jc3Itc2VsbGVyL2Nzci1zZWxsZXItZGV0YWlsL2Nzci1zZWxsZXItZGV0YWlsLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/layout/leads/csr-seller/csr-seller-detail/csr-seller-detail.component.html":
/*!********************************************************************************************!*\
  !*** ./src/app/layout/leads/csr-seller/csr-seller-detail/csr-seller-detail.component.html ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-md-4\">\n      <div class=\"form-group\">\n      <p class=\"p16\">{{'leadDetails.manageProperties' | translate}}</p>\n      <!-- <div class=\"d-flex\">\n      <button class=\"all-btn\">All</button>\n      <input style=\"max-width:200px\" class=\"form-control\" type=\"text\" name=\"\">\n      </div> -->\n      </div>\n    </div>\n    <div class=\"col-md-2\">\n  <div class=\"form-group\">\n  <label>{{'filters.location.country' | translate}}</label>\n    <select class=\"form-control\" (change)=\"onCountryChange($event.target.value)\">\n      <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n      <option *ngFor=\"let item of location.countries\" [value]=\"item.id\">{{item.name}}</option>\n    </select>\n  </div>\n  </div>\n  <div class=\"col-md-2\">\n  <div class=\"form-group\">\n  <label>{{'filters.location.state' | translate}}</label>\n    <select class=\"form-control\" (change)=\"onStateChange($event.target.value)\">\n      <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n      <option *ngFor=\"let item of location.states\" [value]=\"item.id\">{{item.name}}</option>\n    </select>\n  </div>\n  </div>\n  <div class=\"col-md-2\">\n    <div class=\"form-group\">\n    <label>{{'filters.location.city' | translate}}</label>\n      <select class=\"form-control\" (change)=\"onCityChange($event.target.value)\">\n        <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n        <option *ngFor=\"let item of location.cities\" [value]=\"item.id\">{{item.name}}</option>\n      </select>\n    </div>\n  </div>\n\n  <div class=\"col-md-2\">\n  <div class=\"form-group\">\n  <label>{{'filters.location.locality' | translate}}</label>\n  <select class=\"form-control\" (change)=\"onLocalityChange($event.target.value)\">\n      <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n      <option *ngFor=\"let item of location.localities\" [value]=\"item.id\">{{item.name}}</option>\n    </select>\n  </div>\n  </div>\n  </div>\n\n  <div class=\"row\">\n        <div class=\"col-md-12\">\n            <div class=\"cust-tabs-2\">\n              <ul class=\"nav nav-tabs float-right\">\n                  <li class=\"nav-item\">\n                    <a [ngClass]=\"{'active':parameter.dash_flag == 1}\" (click)=\"parameter.dash_flag=1;getListing()\" class=\"nav-link\" data-toggle=\"tab\" href=\"#tw\">{{'filters.time.thisWeek' | translate}}</a>\n                  </li>\n                  <li class=\"nav-item\">\n                    <a [ngClass]=\"{'active':parameter.dash_flag == 2}\" (click)=\"parameter.dash_flag=2;getListing()\" class=\"nav-link\" data-toggle=\"tab\" href=\"#tm\">{{'filters.time.thisMonth' | translate}}</a>\n                  </li>\n                  <li class=\"nav-item\">\n                    <a [ngClass]=\"{'active':parameter.dash_flag == 3}\" (click)=\"parameter.dash_flag=3;getListing()\" class=\"nav-link\" data-toggle=\"tab\" href=\"#lm\">{{'filters.time.lastMonth' | translate}}</a>\n                  </li>\n                  <li class=\"nav-item\">\n                    <a [ngClass]=\"{'active':parameter.dash_flag == 4}\" (click)=\"parameter.dash_flag=4;getListing()\" class=\"nav-link\" data-toggle=\"tab\" href=\"#lt\">{{'filters.time.lifetime' | translate}}</a>\n                  </li>\n                  <li class=\"nav-item\">\n                    <a [ngClass]=\"{'active':parameter.dash_flag == 5}\" (click)=\"parameter.dash_flag=5;getListing()\" class=\"nav-link\" data-toggle=\"tab\" href=\"#cust\">{{'filters.time.custom.label' | translate}}</a>\n                  </li>\n              </ul>\n            </div>\n        </div>\n        <div class=\"col-12\">\n            <hr style=\"margin-top:0;\">\n        </div>\n      </div>\n\n      <div class=\"cust-tabs\">\n      <div class=\"row flex-wrap-reverse\">\n          \n      <div class=\"col-xl-10 col-lg-12 col-md-12 col-sm-12 col-12\">\n        <ul class=\"nav nav-tabs\">\n            <li class=\"nav-item\">\n              <a [ngClass]=\"{'active':parameter.flag==3}\" (click)=\"changeFlag(3)\" class=\"nav-link\" >{{'filters.flag.approved' | translate}}</a>\n            </li>\n            <li class=\"nav-item\">\n              <a [ngClass]=\"{'active':parameter.flag==4}\" (click)=\"changeFlag(4)\" class=\"nav-link\" >{{'filters.flag.unapproved' | translate}}</a>\n            </li>\n            <li class=\"nav-item\">\n              <a [ngClass]=\"{'active':parameter.flag==2}\" (click)=\"changeFlag(2)\" class=\"nav-link\" >{{'filters.flag.pendingReview' | translate}}</a>\n            </li>\n            <li class=\"nav-item\">\n              <a [ngClass]=\"{'active':parameter.flag==1}\" (click)=\"changeFlag(1)\" class=\"nav-link\" >{{'filters.flag.inDraft' | translate}}</a>\n            </li>\n        </ul>\n        </div>\n        <div class=\"col-xl-2 col-lg-12 col-md-12 col-sm-12 col-12\"><div class=\"add-new text-left\">\n              <a *ngIf=\"admin?.admin_acl['Seller Lead Management']?.can_create==1 || admin?.permissions?.can_csr_seller==1\" class=\"btn\" href=\"javascript://\" routerLink=\"/dashboard/properties/add-property/0/{{parameter.seller_id}}\">{{'leadDetails.addNewProperty' | translate}}</a>\n            </div></div>\n            </div>\n        <div class=\"tab-content white-bg\">\n            <div class=\"tab-pane active\">\n              <div class=\"tabel-section\">\n                  <div class=\"table-responsive\">\n                    <table class=\"table table-striped table-align-left\">\n                        <tr>\n                          <th style=\"width:20%; text-align:left;\">\n                              <div class=\"table-search\">\n                                <label>{{'table.th.nameOfBuilding' | translate}}</label>\n                                <div class=\"searh-3\">\n                                  <input type=\"text\" [(ngModel)]=\"parameter.keyword\" (keyup.enter)=\"getListing()\" >\n                                  <button *ngIf=\"parameter.keyword\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                                </div>\n                              </div>\n                          </th>\n                          <th style=\"width:15%; text-align:left;\">\n                              <div class=\"table-search\">\n                                <label>{{'table.th.configuration' | translate}}</label>\n                                <select [(ngModel)]=\"parameter.configuration_id\" (change)=\"getListing()\">\n                                  <option value=\"0\">{{'table.th.allConfiguration' | translate}}</option>\n                                  <option *ngFor=\"let c of configurations\" value=\"{{c.id}}\">\n                                    <app-property-configuration *ngIf=\"c\" [configuration]=\"c\"></app-property-configuration>\n                                  </option>\n                                </select>\n                              </div>\n                          </th>\n                          <th style=\"width:20%; text-align:left;\">\n                              <div class=\"table-search\">\n                                  <label>{{'table.th.address' | translate}}</label>\n                                  <div class=\"searh-3\">\n                                    <input type=\"text\" [(ngModel)]=\"parameter.address\" (keyup.enter)=\"getListing()\" >\n                                    <button *ngIf=\"parameter.address\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                                  </div>\n                              </div>\n                          </th>\n                          <th style=\"width:10%; text-align:left;\">\n                              <div class=\"table-search\">\n                                <label>{{'table.th.sellRent' | translate}}</label>\n                                <select [(ngModel)]=\"parameter.property_for\" (change)=\"getListing()\" style=\"width:100px;\">\n                                  <option value=\"\">{{'table.th.all' | translate}}</option>\n                                  <option value=\"1\">{{'table.th.buy' | translate}}</option>\n                                  <option value=\"2\">{{'table.th.rent' | translate}}</option>\n                                  <option value=\"3\">{{'table.th.inventory' | translate}}</option>\n                                </select>\n                              </div>\n                          </th>\n                          <th style=\"width:6%; vertical-align:top;\">\n                              <div (click)=\"sort_by(1)\" class=\"d-flex pointer\"><span>{{'table.th.price' | translate}}</span>\n                              <a href=\"javascript://\"><img [ngClass]=\"{'upsidedown':parameter.sort_by==1 && parameter.sort_by_order==1}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a></div>\n                          </th>\n                          <th style=\"width:6%; vertical-align:top;\">\n                              <div (click)=\"sort_by(2)\" class=\"d-flex pointer\"><span>{{'table.th.availability' | translate}}</span>\n                              <a href=\"javascript://\"><img [ngClass]=\"{'upsidedown':parameter.sort_by==2 && parameter.sort_by_order==1}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n                              </div>\n                          </th>\n                          <th style=\"width:6%; vertical-align:top;\">\n                              <div (click)=\"sort_by(3)\" class=\"d-flex pointer\"><span>{{'table.th.leads' | translate}}</span>\n                              <a href=\"javascript://\"><img [ngClass]=\"{'upsidedown':parameter.sort_by==3 && parameter.sort_by_order==1}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a></div>\n                          </th>\n                          <th style=\"width:17%\">&nbsp;</th>\n                        </tr>\n                  \n                        <tr *ngFor=\"let p of items | paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: total }\">\n                            <td>\n                              <strong>{{p?.building?.name ? p?.building?.name : ('table.tr.td.NA' | translate)}}</strong>\n                              <div class=\"clearfix\"></div>\n                              <small *ngIf=\"p.quantity > 0\">\n                              {{p.quantity}} \n                              <span *ngIf=\"p.quantity == 1\">{{'table.th.property' | translate}}</span>\n                              <span *ngIf=\"p.quantity > 1\">{{'table.th.properties' | translate}}</span>\n                            </small>                                     \n\n                            </td>\n                            <td><span *ngIf=\"p && p.configuration\">\n                              <app-property-configuration *ngIf=\"p.configuration\" [configuration]=\"p.configuration\"></app-property-configuration>\n                            </span></td>\n                            <td><span>{{p?.building?.address ? p?.building?.address : ('table.tr.td.NA' | translate)}}</span></td>\n                            <td>\n                              <span *ngIf=\"p.for_sale\">{{'table.th.buy' | translate}}</span>\n                              <span *ngIf=\"p.for_rent\">{{'table.th.rent' | translate}}</span>\n                              <span *ngIf=\"p.for_hold\">{{'table.th.inventory' | translate}}</span>\n                            </td>\n                            <td><span>{{p.min_price|price}}</span></td>\n                            <td><span class=\"green-color\">\n                              <span *ngIf=\"p.for_sale\">{{'table.th.buy' | translate}}</span>\n                              <span *ngIf=\"p.for_rent\">{{'table.th.rent' | translate}}</span>\n                              <span *ngIf=\"p.for_hold\">{{'table.th.inventory' | translate}}</span></span>\n                            </td>\n                            <td><span>{{p.lead_properties_count}}</span></td>\n                            <td>\n                              <div class=\"message\">\n                                  <!-- admin?.admin_acl['Property Management']?.can_update!=1 ||  -->\n                                <!-- <button [disabled]=\"true\" routerLink=\"/dashboard/properties/edit-property/{{p.id}}\" title=\"Edit Details\" class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></button> -->\n                                <button [disabled]=\"admin?.admin_acl['Seller Lead Management']?.can_update==0 || admin?.permissions?.can_csr_seller==0\" \n                                    *ngIf=\"parameter?.flag!=3\" routerLink=\"/dashboard/properties/edit-property/{{p.id}}\" title=\"{{'table.title.editPrice' | translate}}\" class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></button>\n                                <button [disabled]=\"admin?.admin_acl['Seller Lead Management']?.can_update==0 || admin?.permissions?.can_csr_seller==0\" \n                                    *ngIf=\"parameter?.flag==3\" routerLink=\"/dashboard/properties/edit-property/{{p.id}}/edit\" title=\"{{'table.title.editPrice' | translate}}\" class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></button>\n                                <button [disabled]=\"admin?.admin_acl['Seller Lead Management']?.can_update==0 || admin?.permissions?.can_csr_seller==0\" \n                                    *ngIf=\"!p.is_blocked\" (click)=\"block(p);\" class=\"action-icon\" title=\"{{'table.title.block' | translate}}\"><img src=\"assets/img/block.png\" alt=\"img\"></button>\n                                <button [disabled]=\"admin?.admin_acl['Seller Lead Management']?.can_update==0 || admin?.permissions?.can_csr_seller==0\" \n                                    *ngIf=\"p.is_blocked == true\" (click)=\"unblock(p);\" class=\"action-icon unblock-bg\" title=\"{{'table.title.unblock' | translate}}\"><img src=\"assets/img/unblock.png\" alt=\"img\"></button>\n                                <button [disabled]=\"admin?.admin_acl['Seller Lead Management']?.can_update==0 || admin?.permissions?.can_csr_seller==0\" \n                                    *ngIf=\"p.status == 3\" (click)=\"changeStatus(p,2);\" class=\"action-icon\" title=\"{{'table.title.unapprove' | translate}}\"><img src=\"assets/img/ic_disapprove.png\" alt=\"img\"></button>\n                                <button [disabled]=\"admin?.admin_acl['Seller Lead Management']?.can_update==0 || admin?.permissions?.can_csr_seller==0\" \n                                    *ngIf=\"p.status == 2\" (click)=\"changeStatus(p,3);\" class=\"action-icon\" title=\"{{'table.title.approve' | translate}}\"><img src=\"assets/img/tick.png\" alt=\"img\"></button>\n                              </div>\n\n                            </td>\n                        </tr>\n                        <!-- <tr *ngIf=\"total == 0\">\n                          <td colspan=\"10\">\n                            <img src=\"assets/img/404-error.png\">\n                          </td>\n                        </tr> -->\n                    </table>\n                    <div class=\"padding20 center\" *ngIf=\"total == 0\">\n                      <img src=\"assets/img/404-error.png\">\n                    </div>\n                  </div>\n              </div>\n              <!-- <div class=\"btn-cont text-right marginT15\">\n                  <button class=\"btn btn-secondary\">View All</button>\n              </div> -->\n              <!-- <div class=\"spacer30\"></div>\n\n              <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls> -->\n\n\n            </div>\n            <div class=\"tab-pane container fade\" id=\"seller\">{{'table.th.sellerTabOn' | translate}}</div>\n        </div>\n      </div>\n      <div class=\"btn-cont text-right marginT15\" *ngIf=\"parameter.total\">\n          <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n      </div>\n  </div>"

/***/ }),

/***/ "./src/app/layout/leads/csr-seller/csr-seller-detail/csr-seller-detail.component.ts":
/*!******************************************************************************************!*\
  !*** ./src/app/layout/leads/csr-seller/csr-seller-detail/csr-seller-detail.component.ts ***!
  \******************************************************************************************/
/*! exports provided: CsrSellerDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CsrSellerDetailComponent", function() { return CsrSellerDetailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CsrSellerDetailComponent = /** @class */ (function () {
    function CsrSellerDetailComponent(constant, route, admin, spinner, translate) {
        this.constant = constant;
        this.route = route;
        this.admin = admin;
        this.spinner = spinner;
        this.translate = translate;
        this.parameter = {};
        this.location = {};
        this.items = [];
        this.total = 0;
        this.configurations = [];
        this.price_sort = 1;
        this.availability_sort = 1;
        this.lead_sort = 1;
    }
    CsrSellerDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.parameter.seller_id = params.id;
            _this.parameter.itemsPerPage = _this.constant.itemsPerPage;
            _this.parameter.page = _this.constant.p;
            _this.parameter.dash_flag = 2;
            _this.parameter.flag = 3;
            _this.parameter.property_for = '';
            _this.getCountries();
            _this.getPropertyConfigurations();
            _this.getListing();
        });
    };
    CsrSellerDetailComponent.prototype.getListing = function () {
        var _this = this;
        this.spinner.show();
        this.items = [];
        this.parameter.noResultFound = false;
        this.admin.postDataApi('propertyHome', this.parameter).subscribe(function (success) {
            _this.items = success.data;
            if (_this.items.length <= 0) {
                _this.parameter.noResultFound = true;
            }
            _this.total = success.total_count;
            _this.spinner.hide();
        }, function (error) {
            _this.spinner.hide();
        });
    };
    CsrSellerDetailComponent.prototype.getCountries = function () {
        var _this = this;
        this.admin.postDataApi('getCountryLocality', {}).subscribe(function (r) {
            _this.location.countries = r['data'];
        });
    };
    CsrSellerDetailComponent.prototype.getPropertyConfigurations = function () {
        var _this = this;
        this.admin.postDataApi('getPropertyConfigurations', {}).subscribe(function (r) {
            _this.configurations = r['data'];
        });
    };
    CsrSellerDetailComponent.prototype.onCountryChange = function (id) {
        this.location.states = [];
        this.parameter.state_id = '0';
        this.location.cities = [];
        this.parameter.city_id = '0';
        this.location.localities = [];
        this.parameter.locality_id = '0';
        this.parameter.state_id = '';
        if (!id || id === '0') {
            this.parameter.state_id = '0';
            this.location.states = [];
            return false;
        }
        this.parameter.country_id = id;
        var selectedCountry = this.location.countries.filter(function (x) { return x.id.toString() === id; });
        this.location.states = selectedCountry[0].states;
    };
    CsrSellerDetailComponent.prototype.onStateChange = function (id) {
        this.location.cities = [];
        this.parameter.city_id = '0';
        this.location.localities = [];
        this.parameter.locality_id = '0';
        this.parameter.city_id = '';
        if (!id || id === '0') {
            this.parameter.city_id = '0';
            this.location.cities = [];
            return false;
        }
        this.parameter.state_id = id;
        var selectedState = this.location.states.filter(function (x) { return x.id.toString() === id; });
        this.location.cities = selectedState[0].cities;
    };
    CsrSellerDetailComponent.prototype.onCityChange = function (id) {
        this.location.localities = [];
        this.parameter.locality_id = '0';
        this.parameter.locality_id = '';
        if (!id || id === '0') {
            this.parameter.locality_id = '0';
            return false;
        }
        this.parameter.city_id = id;
        var selectedCountry = this.location.cities.filter(function (x) { return x.id.toString() === id; });
        this.location.localities = selectedCountry[0].localities;
    };
    CsrSellerDetailComponent.prototype.onLocalityChange = function (id) {
        if (!id || id === '0') {
            return false;
        }
        this.parameter.locality_id = id;
        this.getListing();
    };
    CsrSellerDetailComponent.prototype.changeFlag = function (flag) {
        this.parameter.flag = flag;
        this.getListing();
    };
    CsrSellerDetailComponent.prototype.sort_by = function (sort_by) {
        if (this.parameter.sort_by !== sort_by) {
            this.parameter.sort_by = sort_by;
            this.parameter.sort_by_order = 0;
        }
        else {
            this.parameter.sort_by_order = this.parameter.sort_by_order ? 0 : 1;
        }
        this.getListing();
    };
    CsrSellerDetailComponent.prototype.getPage = function (page) {
        this.parameter.page = page;
        this.getListing();
    };
    CsrSellerDetailComponent.prototype.block = function (item) {
        var _this = this;
        item.is_blocked = true;
        this.admin.postDataApi('blockProperty', { property_id: item.id, flag: 1 }).subscribe(function (r) {
            swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.propertyBlockedSuccessfully'), 'success');
        }, function (error) {
            swal(_this.translate.instant('swal.error'), error.error.message, 'error');
        });
    };
    CsrSellerDetailComponent.prototype.unblock = function (item) {
        var _this = this;
        item.is_blocked = false;
        this.admin.postDataApi('blockProperty', { property_id: item.id, flag: 0 }).subscribe(function (r) {
            swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.propertyUnblockedSuccessfully'), 'success');
        }, function (error) {
            swal(_this.translate.instant('swal.error'), error.error.message, 'error');
        });
    };
    CsrSellerDetailComponent.prototype.changeStatus = function (item, status) {
        var _this = this;
        item.status = status;
        this.admin.postDataApi('updatePropertyStatus', { property_id: item.id, status_id: status }).subscribe(function (r) {
            swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.propertyStatusChanged'), 'success');
        }, function (error) {
            swal(_this.translate.instant('swal.error'), error.error.message, 'error');
        });
    };
    CsrSellerDetailComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-csr-seller-detail',
            template: __webpack_require__(/*! ./csr-seller-detail.component.html */ "./src/app/layout/leads/csr-seller/csr-seller-detail/csr-seller-detail.component.html"),
            styles: [__webpack_require__(/*! ./csr-seller-detail.component.css */ "./src/app/layout/leads/csr-seller/csr-seller-detail/csr-seller-detail.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_common_constants__WEBPACK_IMPORTED_MODULE_3__["Constant"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_4__["AdminService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_2__["NgxSpinnerService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__["TranslateService"]])
    ], CsrSellerDetailComponent);
    return CsrSellerDetailComponent;
}());



/***/ }),

/***/ "./src/app/layout/leads/csr-seller/csr-seller-detail/seller-chat/seller-chat.component.css":
/*!*************************************************************************************************!*\
  !*** ./src/app/layout/leads/csr-seller/csr-seller-detail/seller-chat/seller-chat.component.css ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9sZWFkcy9jc3Itc2VsbGVyL2Nzci1zZWxsZXItZGV0YWlsL3NlbGxlci1jaGF0L3NlbGxlci1jaGF0LmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/layout/leads/csr-seller/csr-seller-detail/seller-chat/seller-chat.component.html":
/*!**************************************************************************************************!*\
  !*** ./src/app/layout/leads/csr-seller/csr-seller-detail/seller-chat/seller-chat.component.html ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"row\">\n    <div class=\"col-lg-4 col-md-4 col-sm-12 col-12\">\n      <div malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\" class=\"chat-name-list white-bg\">\n         <div *ngIf=\"loadingConversation\" class=\"chat-window white-bg\"><img style=\"width:100%\" src=\"assets/img/loading_content.gif\"></div>\n         <div *ngIf=\"!loadingConversation && conversations.length == 0\" class=\"padding20\">No conversation found</div>\n         <a *ngFor=\"let con of conversations\" [ngClass]=\"{'active':con.selected == true}\" href=\"javascript://\">\n            <div class=\"profile\" (click)=\"selectConversation(con, '')\">\n               <div class=\"fig-block\">\n                  <!-- <img [src]=\"con.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\" /> -->\n                  <img *ngIf=\"con?.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\"\n                              [defaultImage]=\"con?.image| img:'thumb'\" [lazyLoad]=\"con?.image\">\n                  <img *ngIf=\"!con?.image\" src=\"assets/img/default_img.png\" alt=\"img\">\n               </div>\n               <div class=\"profile-info\">\n                  <h6>{{con.name | titlecase}}</h6>\n                  <!-- <p class=\"p12\">{{con.phone}}</p> -->\n                  <p class=\"p12\">{{con.phone}}</p>\n                  <i class=\"fa fa-angle-right float-right\"></i>\n               </div>\n            </div>\n         </a>\n      </div>\n   </div>\n\n   <div class=\"col-lg-8 col-md-8 col-sm-12 col-12 move-below\">\n      <div *ngIf=\"loadingMessages\" class=\"chat-window white-bg\"><img style=\"width:100%\" src=\"assets/img/loading_content.gif\"></div>\n      <div *ngIf=\"conversation && !loadingMessages\" class=\"chat-window white-bg\">\n         <div class=\"chat-top\">\n             <a href=\"javascript://\">\n               <div class=\"profile\">\n                  <div class=\"fig-block\">\n                     <!-- <img [src]=\"parameter.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\"> -->\n                      <img *ngIf=\"parameter.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\"\n                              [defaultImage]=\"parameter.image| img:'thumb'\" [lazyLoad]=\"parameter.image\">\n                      <img *ngIf=\"!parameter.image\" src=\"assets/img/default_img.png\" alt=\"img\">\n                  </div>\n                  <div class=\"profile-info\">\n                     <h6>{{parameter.name | titlecase}}</h6>\n                     <!-- <p class=\"p12\">{{conversation.other.phone}}</p> -->\n                     <p class=\"p12\">{{parameter.phone}}</p>\n                  </div>\n               </div>\n            </a>\n  \n         </div>\n  \n         <div *ngIf=\"messages\" malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\" class=\"chat-area scrollbox\" #chatWin>\n          <div *ngIf=\"loadmore\" class=\"chat-load-more\" (click)=\"loadMore()\" >\n            Previous Messages <img *ngIf=\"loadmoring\" src=\"assets/img/loading-p.gif\">\n          </div> \n          <div *ngFor=\"let m of messages;let i = index\" [ngClass]=\"m?.conversation_user?.admin_id == admin_id ? 'chat-user-one' :'chat-user-two'\" class=\"chat-user\">\n            <p *ngIf=\"m.message_type == 1\" style=\"word-wrap: break-word;\">\n              <!-- <span *ngIf=\"m.loading\" class=\"m-loader\"><img src=\"assets/img/loading-p.gif\"></span> -->\n              <span>{{m.message}}</span>\n            </p>\n  \n            <!-- <a class=\"btn btn-sm btn-danger\" [group]=\"group\" ng-box href=\"{{lastReport.image.original}}\">View</a> -->\n            <!-- <a *ngIf=\"m.message_type == 2\" ng-box width=\"800\" height=\"800\" target=\"_blank\" href=\"{{m.image}}\">\n                <img src=\"{{m.image}}\">\n            </a> -->\n            <a *ngIf=\"m.message_type == 2\" href=\"{{m.image}}\" data-lightbox=\"image\" title=\"{{'table.title.image' | translate}}\" >\n              <span>\n                <img class=\"ui bordered small image\" src=\"{{m.image}}\">\n                <div *ngIf=\"m.loading\" class=\"loaderr\"></div>\n              </span>\n            </a>\n            <!-- <a *ngIf=\"m.message_type == 2\" href=\"{{m.image}}\" data-lightbox=\"image\" data-title=\"My caption\">\n              <img class=\"ui bordered small image\" src=\"{{m.image}}\">\n              \n            </a> -->\n            <!-- <a *ngIf=\"m.message_type == 3\" href=\"{{m.video}}\" title=\"Video\" class=\"chat-vid\">\n              <span >\n                <img class=\"ui bordered small image\" src=\"{{m.image}}\">\n                <img *ngIf=\"!m.loading\" class=\"vid-icon\" (click)=\"playVideo(i)\" src=\"assets/img/play-button.png\" />\n                <div *ngIf=\"m.loading\" class=\"loaderr\"></div>\n              </span>\n            </a> -->\n            \n            <div class=\"chat-vid\" *ngIf=\"m.message_type == 3 && !m.play\">\n              <span>\n                  <img class=\"ui bordered small image\" src=\"{{m.image}}\" onerror=\"this.src='assets/img/placeholder.png'\">\n                  <img *ngIf=\"!m.loading\" class=\"vid-icon\" (click)=\"playVideo(i)\" src=\"assets/img/play-button.png\" />\n                  <div *ngIf=\"m.loading\" class=\"loaderr\"></div>\n                  <div class=\"clearfix\"></div>\n            </span>\n            </div>\n            <video *ngIf=\"m.message_type == 3 && m.play\" src=\"{{m.video}}\" autoplay type=\"video/mp4\" controls></video>\n            \n            <!-- <div class=\"chat-vid\" *ngIf=\"m.message_type == 3 && !m.play\">\n              <span>\n                <img class=\"vid-img\" src=\"{{m.image}}\">\n                <img class=\"vid-icon\" (click)=\"playVideo(i)\" src=\"assets/img/play-button (2).png\"/>\n                <div class=\"clearfix\"></div>\n            </span>\n            </div> -->\n            <!-- <video *ngIf=\"m.message_type == 3 && m.play\" src=\"{{m.video}}\" autoplay type=\"video/mp4\" controls></video> -->\n            \n            <div class=\"chat-shared-file\" *ngIf=\"m.message_type == 4\">\n              <span *ngIf=\"m.loading\" class=\"m-loader\">\n                <img class=\"ui bordered small image\" src='assets/img/placeholder.png'>\n                <div *ngIf=\"m.loading\" class=\"loaderr\"></div>\n              </span>\n              <span *ngIf=\"!m.loading\">\n                <a href=\"javascript://\" target=\"_blank\" href=\"{{m.attachment}}\"><span>{{m.attachment_name}} <img class=\"viewfull\" src=\"assets/img/viewfull.png\"></span>\n                </a>\n              </span>\n            </div>\n              \n            <a *ngIf=\"m.message_type == 5\" href=\"{{m.property_url}}\" target=\"_blank\" title=\"{{'table.title.image' | translate}}\" >\n              <span>\n                <img class=\"ui bordered small image\" src=\"{{m.image}}\">\n                <div *ngIf=\"m.loading\" class=\"loaderr\"></div>\n              </span>\n              <h5>{{m.message}}</h5>\n            </a>\n            \n            <div class=\"time clearfix\" *ngIf=\"m.updated_at && !m.uid\">{{m.updated_at| moment}}</div>\n            <div class=\"time clearfix\" *ngIf=\"m.updated_at && m.uid\">\n                {{m.updated_at|date:'h:mm a, MMM d y'}}\n            </div>\n  \n           </div>\n  \n         </div>\n  \n         <div style=\"position: absolute; z-index: 1; margin: 0px; padding: 0px; other: block; left: 581px; top: 91px;\"><div class=\"enscroll-track track3\" style=\"position: relative; height: 367px;\"><a href=\"\" class=\"handle3\" style=\"position: absolute; z-index: 1; height: 199.244px; top: 0px;\"><div class=\"top\"></div><div class=\"bottom\"></div></a></div></div>\n  \n         <div class=\"chat-text\">\n          <div class=\"dropdown attach-items\">\n            <a href=\"javascript://\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" #optionsButton>\n              <i class=\"fa fa-paperclip\" aria-hidden=\"true\"></i>\n            </a>\n            <div class=\"dropdown-menu\">\n              <div class=\"dropdown-item\">\n                <input type=\"file\" name=\"image\" accept=\"image/*\" (change)=\"onSelectFile('image', $event)\">\n                <i class=\"fa fa-camera\" aria-hidden=\"true\"></i>\n                <span>Photo</span>\n              </div>\n              <a class=\"dropdown-item\"> \n                <!-- <input type=\"file\" name=\"video\" id=\"videoFileObject\" name=\"video\" accept=\"video/mp4,video/x-m4v,video/*\" (change)=\"showCanvas($event)\"> -->\n                <input type=\"file\" name=\"video1\" accept=\"video/mp4,video/x-m4v,video/*\" (change)=\"showCanvas($event)\">\n                <i class=\"fa fa-video-camera\" aria-hidden=\"true\"></i>\n                <span>Video</span>\n              </a>\n              <a class=\"dropdown-item\">    \n                  <input type=\"file\" name=\"attachment\" accept=\".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf\" (change)=\"saveAttachment($event)\">\n                <i class=\"fa fa-file\" aria-hidden=\"true\"></i>\n                <span>Document</span>\n              </a>\n              <a class=\"dropdown-item cursor-pointer\" (click)=\"blockGetProperty.showModal()\">    \n                <i class=\"fa fa-file\" aria-hidden=\"true\"></i>\n                <span>Property</span>\n              </a>\n            </div>\n          </div>\n          <input id=\"message\" #msgInput autocomplete=\"off\" [(ngModel)]=\"textMessage\" (keyup.enter)=\"setText()\" class=\"chat-input\" type=\"text\" name=\"message\" placeholder=\"Type your message here …\">\n          \n          <!-- <div class=\"chat-attached-file\" *ngIf=\"model.message_type == 2\">\n            <div class=\"attached-inner\">\n              <a href=\"javascript://\" (click)=\"updateModel('image')\" class=\"close\">&times;</a>\n              <div class=\"fig-block\"><img class=\"img-fluid\" src=\"{{model.image}}\" alt=\"img\"></div>\n            </div>\n          </div>\n          <div class=\"chat-attached-file\">\n            <div class=\"attached-inner\">\n              <a href=\"javascript://\" (click)=\"updateModel('video')\" class=\"close\">&times;</a>\n              <div class=\"fig-block\">\n                  <video style=\"width: 100%; height: 100%;\" src=\"{{model.video}}\" class=\"video55\" autoplay type=\"video/mp4\" controls></video>\n              </div>\n            </div>\n          </div>\n          <div class=\"chat-attached-file\" *ngIf=\"model.message_type == 4\">\n            <div class=\"attached-inner\">\n              <a href=\"javascript://\" (click)=\"updateModel('video')\" class=\"close\">&times;</a>\n              <div class=\"fig-block\">\n                <div class=\"chat-shared-file\">\n                  <a href=\"javascript://\"><span>{{model.attachment_name}}</span>\n                    <i class=\"fa fa-times\" (click)=\"updateModel('attachment')\" aria-hidden=\"true\"></i>\n                  </a>\n                </div>\n              </div>\n            </div>\n          </div> -->\n          <video style=\"width: 100%; height: 100%;\" src=\"{{videoSrc}}\" class=\"video55\" type=\"video/mp4\" controls></video>\n          <canvas style=\"display: none;\" width=\"800\" height=\"600\" id=\"canvas\"></canvas>\n  \n          <button (click)=\"setText()\" class=\"btn\">Send</button>\n          \n         </div>\n  \n      </div>\n      </div>\n    </div>\n  \n    <app-block-get-property #blockGetProperty (itemSelect)=\"sendProperty($event)\"></app-block-get-property>"

/***/ }),

/***/ "./src/app/layout/leads/csr-seller/csr-seller-detail/seller-chat/seller-chat.component.ts":
/*!************************************************************************************************!*\
  !*** ./src/app/layout/leads/csr-seller/csr-seller-detail/seller-chat/seller-chat.component.ts ***!
  \************************************************************************************************/
/*! exports provided: SellerChatComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SellerChatComponent", function() { return SellerChatComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/lib/index.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var src_app_models_chat_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/models/chat.model */ "./src/app/models/chat.model.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var SellerChatComponent = /** @class */ (function () {
    function SellerChatComponent(element, admin, cs, constant, route, spinner, translate) {
        this.element = element;
        this.admin = admin;
        this.cs = cs;
        this.constant = constant;
        this.route = route;
        this.spinner = spinner;
        this.translate = translate;
        this.parameter = {};
        this.conversations = [];
        this.messages = [];
        this.loadingMessages = false;
        this.loadingConversation = false;
        this.editModel = false;
        this.seconds = true;
        this.isActive = true;
        this.imgObj = {
            thumbnail: '',
            original: ''
        };
        this.imgArray = [];
        this.durationInSec = 0;
        this.showVideo = true;
        this.videoObj = {
            thumbnail: '',
            original: ''
        };
        this.loadmore = true;
        this.loadmoring = false;
        this.scrollbarOptions = { axis: 'y', theme: 'dark' };
    }
    SellerChatComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this.msgInput.nativeElement.focus();
        this.loginData$$ = this.admin.loginData$.subscribe(function (success) {
            _this.admin_id = success['id'];
        });
        this.loadingConversation = true;
        this.route.params.subscribe(function (params) {
            _this.chat_with = params['chat_with'];
            _this.csr_seller_id = params.assigned_csr_seller_id;
            _this.lead_id = params.seller_id; // lead_id is basically seller id here for csr_seller
            _this.parameter.url = params['chat_with'] === '1' ? 'leads/sellers' : 'leads/seller-broker';
            _this.admin.postDataApi(_this.parameter.url, { csr_seller_id: _this.csr_seller_id }).subscribe(function (r) {
                _this.conversations = r['data'];
                if (_this.conversations.length > 0) {
                    _this.initSocket();
                    for (var index = 0; index < _this.conversations.length; index++) {
                        if (_this.chat_with === '1') {
                            if (_this.conversations[index].id.toString() === _this.lead_id) {
                                _this.selectConversation(_this.conversations[index], _this.lead_id);
                            }
                        }
                        else {
                            if (_this.conversations[index].id.toString() === _this.csr_seller_id) {
                                _this.selectConversation(_this.conversations[index], _this.lead_id);
                            }
                        }
                    }
                }
                _this.loadingConversation = false;
            });
        });
    };
    SellerChatComponent.prototype.selectConversation = function (conversation, user_id) {
        var _this = this;
        this.parameter.name = conversation.name;
        this.parameter.image = conversation.image;
        this.parameter.dialCode = conversation.dial_code;
        this.parameter.phone = conversation.phone;
        var data1 = {
            lead_id: this.lead_id,
            other_id: conversation.id,
            other_sent_as: this.chat_with === '1' ? this.constant.userType.user_seller_dev : this.constant.userType.inhouse_broker,
            sent_as: this.constant.userType.csr_seller
        };
        this.spinner.show();
        this.admin.postDataApi('conversation/getLeadConversation', data1).subscribe(function (res) {
            _this.spinner.hide();
            if (res.data) {
                _this.conversation = res.data;
                _this.conversation_id = res.data[0].id;
                _this.loadmore = true;
                _this.conversations.map(function (con) {
                    con.selected = false;
                    if (con === conversation) {
                        con.selected = true;
                        // this.conversation_id = con.id;
                    }
                });
                var data = {
                    sent_as: _this.constant.userType.csr_seller,
                    // lead_id: this.lead_id,
                    conversation_id: _this.conversation_id
                };
                _this.loadingMessages = true;
                _this.admin.postDataApi('conversation/getMessages', data).subscribe(function (r) {
                    _this.messages = r.data[0].messages;
                    // this.messages.map(r=>{
                    //   r.loading = true;
                    //   return r;
                    // });
                    if (_this.messages.length < 30) {
                        _this.loadmore = false;
                    }
                    _this.loadingMessages = false;
                    setTimeout(function () {
                        _this.scrollToBottom();
                    }, 200);
                });
            }
        }, function (error) {
            _this.spinner.hide();
        });
    };
    SellerChatComponent.prototype.initSocket = function () {
        var _this = this;
        // this.socket = io.connect(environment.socket_url,{
        //   extraHeaders: {
        //     Authorization: "Bearer authorization_token_here"
        //   }
        // });
        this.socket = socket_io_client__WEBPACK_IMPORTED_MODULE_2__["connect"](this.admin.socketUrl);
        this.socket.on('connect', function (fun) {
            _this.socket_id = _this.socket.id;
            _this.connected = _this.socket.connected;
            var data = {
                admin_id: _this.admin_id,
                socket_id: _this.socket_id,
                device_id: _this.admin.deviceId + '_' + _this.admin_id
            };
            if (_this.connected) {
                _this.socket.emit('add-admin', data, function (res) {
                    // console.log('res', res);
                });
                _this.socket.on('message', function (response) {
                    if (response.data.conversation_id === _this.conversation_id) {
                        _this.messages.push(response.data);
                        setTimeout(function () {
                            _this.scrollToBottom();
                        }, 200);
                    }
                });
            }
        });
    };
    SellerChatComponent.prototype.scrollToBottom = function () {
        if (this.chatWin) {
            $('.chat-area').mCustomScrollbar('scrollTo', 'bottom', { scrollInertia: 0 });
        }
    };
    SellerChatComponent.prototype.onSelectFile = function (param, event) {
        var _this = this;
        this.optionsButton.nativeElement.click();
        if (event.target.files[0].size > this.constant.fileSizeLimit) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.fileSizeExceeds'), 'error');
            return false;
        }
        var model = new src_app_models_chat_model__WEBPACK_IMPORTED_MODULE_7__["Chat"];
        model.message = this.textMessage;
        model.message_type = 2;
        model.loading = true;
        model.uid = Math.random().toString(36).substr(2, 15);
        model.conversation_id = this.conversation_id;
        model.conversation_user = { admin_id: this.admin_id };
        var d = new Date();
        model.updated_at = d.toUTCString();
        this.messages.push(model);
        setTimeout(function () {
            _this.scrollToBottom();
        }, 100);
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                _this.image = e.target.result;
                model[param] = e.target.result;
                _this.cs.saveImage(event.target.files[0]).subscribe(function (success) {
                    model.image = success['data'].image;
                    _this.sendMessage(model);
                });
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };
    SellerChatComponent.prototype.saveAttachment = function (event) {
        var _this = this;
        this.optionsButton.nativeElement.click();
        if (event.target.files[0].size > this.constant.fileSizeLimit) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.fileSizeExceeds'), 'error');
            return false;
        }
        var model = new src_app_models_chat_model__WEBPACK_IMPORTED_MODULE_7__["Chat"];
        model.message = this.textMessage;
        model.message_type = 4;
        model.loading = true;
        model.uid = Math.random().toString(36).substr(2, 15);
        model.conversation_id = this.conversation_id;
        model.conversation_user = { admin_id: this.admin_id };
        model.attachment_name = event.target.files[0].name;
        var d = new Date();
        model.updated_at = d.toUTCString();
        this.messages.push(model);
        setTimeout(function () {
            _this.scrollToBottom();
        }, 100);
        this.cs.saveAttachment(event.target.files[0]).subscribe(function (success) {
            model.attachment = success['data'].name;
            _this.sendMessage(model);
        });
    };
    SellerChatComponent.prototype.playVideo = function (i) {
        this.messages[i].play = true;
    };
    SellerChatComponent.prototype.showCanvas = function (event) {
        var _this = this;
        this.optionsButton.nativeElement.click();
        if (event.target.files[0].size > this.constant.fileSizeLimit) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.fileSizeExceeds'), 'error');
            return false;
        }
        this.showVideo = true;
        var model = new src_app_models_chat_model__WEBPACK_IMPORTED_MODULE_7__["Chat"];
        model.message = this.textMessage;
        model.message_type = 3;
        model.loading = true;
        model.uid = Math.random().toString(36).substr(2, 15);
        model.conversation_id = this.conversation_id;
        model.conversation_user = { admin_id: this.admin_id };
        var d = new Date();
        model.updated_at = d.toUTCString();
        this.messages.push(model);
        setTimeout(function () {
            _this.scrollToBottom();
        }, 100);
        setTimeout(function () {
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
                        _this.durationInSec = videoTest.duration.toFixed(0);
                        setTimeout(function () {
                            // create canvas at middle of video
                            _this.newcanvas(videoTest, event.target.files[0], model);
                        }, 3000);
                        // setTimeout(() => {
                        //   // create canvas at middle of video
                        //   this.newcanvas(videoTest, event.target.files[0], model);
                        // }, (this.durationInSec / 2).toFixed(0));
                        clearInterval(timer);
                    }
                }, 1000);
            }.bind(_this);
            reader.readAsDataURL(event.target.files[0]);
            // setTimeout(() => {
            //   this.newcanvas(videoTest, event.target.files[0]);
            // }, 4000);
        }, 1000);
    };
    SellerChatComponent.prototype.newcanvas = function (video, videoFile, model) {
        var _this = this;
        var canvas = document.getElementById('canvas');
        var ss = canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, canvas.width, canvas.height);
        var ImageURL = canvas.toDataURL('image/jpeg');
        model.image = ImageURL;
        var fileToUpload = this.dataURLtoFile(ImageURL, 'tempFile.png');
        this.cs.saveVideo(videoFile, fileToUpload).subscribe(function (success) {
            model.video = success['data'].video;
            model.image = success['data'].thumb;
            _this.sendMessage(model);
        });
    };
    SellerChatComponent.prototype.dataURLtoFile = function (dataurl, filename) {
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
    SellerChatComponent.prototype.setText = function () {
        if (!this.textMessage || !this.textMessage.trim()) {
            return false;
        }
        else if ((Object.keys(this.admin.admin_acl).length !== 0 && this.admin.admin_acl['Inhouse Agent Lead Management'].can_update === 0) ||
            this.admin.permissions.can_in_house_broker === 0) {
            return false;
        }
        else {
            var model = new src_app_models_chat_model__WEBPACK_IMPORTED_MODULE_7__["Chat"];
            model.message = this.textMessage;
            model.message_type = 1;
            model.loading = true;
            model.uid = Math.random().toString(36).substr(2, 15);
            model.conversation_id = this.conversation_id;
            model.conversation_user = { admin_id: this.admin_id };
            var d = new Date();
            model.updated_at = d.toUTCString();
            this.messages.push(model);
            this.textMessage = '';
            this.sendMessage(model);
        }
    };
    SellerChatComponent.prototype.sendMessage = function (model) {
        var _this = this;
        model.sent_as = this.constant.userType.csr_seller;
        if (model.message_type === 1 && !model.message) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterText'), 'error');
        }
        else {
            setTimeout(function () {
                _this.scrollToBottom();
            }, 100);
            this.admin.postDataApi('conversation/sendMessage', model).subscribe(function (r) {
                if (model.loading === true) {
                    model.loading = false;
                    var foundIndex = _this.messages.findIndex(function (x) { return x.uid == model.uid; });
                    _this.messages[foundIndex] = r['data'];
                }
                setTimeout(function () {
                    _this.scrollToBottom();
                }, 100);
            });
        }
    };
    SellerChatComponent.prototype.loadMore = function () {
        var _this = this;
        this.loadmoring = true;
        var data = {
            sent_as: this.constant.userType.csr_seller,
            conversation_id: this.conversation_id,
            lead_id: this.lead_id,
            last_message_id: this.messages[0].id
        };
        this.admin.postDataApi('conversation/getMessages', data).subscribe(function (res) {
            _this.loadmoring = false;
            if (res['data'].length < 30) {
                _this.loadmore = false;
            }
            _this.messages = res['data'].concat(_this.messages);
        });
    };
    SellerChatComponent.prototype.sendProperty = function (property) {
        var model = new src_app_models_chat_model__WEBPACK_IMPORTED_MODULE_7__["Chat"];
        model.message = property.name + ' ' + this.translate.instant('commonBlock.with') + ' ';
        if (property.configuration.bedroom) {
            model.message += property.configuration.bedroom + ' ' + this.translate.instant('commonBlock.bed') + ' ';
        }
        if (property.configuration.bathroom) {
            model.message += this.constant.middleDot + property.configuration.bathroom + ' ' + this.translate.instant('commonBlock.bath') + ' ';
        }
        if (property.configuration.half_bathroom) {
            model.message += this.constant.middleDot + property.configuration.half_bathroom + ' ' +
                this.translate.instant('commonBlock.halfBath') + ' ';
        }
        if (property.property_type.name) {
            model.message += this.constant.middleDot + property.property_type.name;
        }
        model.message += ' ' + this.translate.instant('commonBlock.in') + ' ' + property.building.name;
        model.message_type = 5;
        model.property_id = property.id;
        model.image = property.image;
        model.property_url = property.property_url;
        model.loading = true;
        model.updated_at = new Date();
        model.uid = Math.random().toString(36).substr(2, 15);
        model.conversation_id = this.conversation_id;
        model.conversation_user = { admin_id: this.admin_id };
        this.messages.push(model);
        this.sendMessage(model);
    };
    SellerChatComponent.prototype.onDestroy = function () {
        if (this.loginData$$) {
            this.loginData$$.unsubscribe();
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('chatWin'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], SellerChatComponent.prototype, "chatWin", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('optionsButton'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], SellerChatComponent.prototype, "optionsButton", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('msgInput'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], SellerChatComponent.prototype, "msgInput", void 0);
    SellerChatComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-seller-chat',
            template: __webpack_require__(/*! ./seller-chat.component.html */ "./src/app/layout/leads/csr-seller/csr-seller-detail/seller-chat/seller-chat.component.html"),
            styles: [__webpack_require__(/*! ./seller-chat.component.css */ "./src/app/layout/leads/csr-seller/csr-seller-detail/seller-chat/seller-chat.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"],
            src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_4__["AdminService"],
            src_app_services_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"],
            src_app_common_constants__WEBPACK_IMPORTED_MODULE_6__["Constant"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__["TranslateService"]])
    ], SellerChatComponent);
    return SellerChatComponent;
}());



/***/ }),

/***/ "./src/app/layout/leads/csr-seller/csr-seller.component.css":
/*!******************************************************************!*\
  !*** ./src/app/layout/leads/csr-seller/csr-seller.component.css ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9sZWFkcy9jc3Itc2VsbGVyL2Nzci1zZWxsZXIuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/layout/leads/csr-seller/csr-seller.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/layout/leads/csr-seller/csr-seller.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n    <div class=\"row\">\n        <div class=\"col-md-4\">\n            <div class=\"form-group\">\n                <p class=\"p16\">{{'leads.CSRSellerLeads' | translate}}</p>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-md-4\">\n            <div class=\"form-group\"\n                *ngIf=\"admin?.admin_acl['Seller Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n                <div class=\"d-flex\">\n                    <div class=\"autocomplete\">\n                        <input placeholder=\"{{'addForm.placeholder.searchCSRSeller' | translate}}\"\n                            style=\"max-width:200px\" list=\"amenities\" [(ngModel)]=\"parameter.keyword\"\n                            (input)=\"getCsrListing()\" class=\"form-control\" type=\"text\" name=\"keyword\"\n                            (focusout)=\"closeCsrListing()\">\n                        <div id=\"myInputautocomplete-list\" class=\"autocomplete-items\">\n                            <div *ngFor=\"let item of users\" (click)=\"selectCsrUser(item)\">{{item.email}}</div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-md-8 col-12\">\n            <div class=\"cust-tabs-2\">\n                <ul class=\"nav nav-tabs\">\n                    <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==1}\"\n                            (click)=\"changeFlag(1)\">{{'filters.time.thisWeek' | translate}}</a>\n                    </li>\n                    <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==2}\"\n                            (click)=\"changeFlag(2)\">{{'filters.time.thisMonth' | translate}}</a>\n                    </li>\n                    <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==3}\"\n                            (click)=\"changeFlag(3)\">{{'filters.time.lastMonth' | translate}}</a>\n                    </li>\n                    <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==4}\"\n                            (click)=\"changeFlag(4)\">{{'filters.time.lifetime' | translate}}</a>\n                    </li>\n                    <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==5}\"\n                            (click)=\"parameter.flag=5\">{{'filters.time.custom.label' | translate}}</a>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-12\">\n            <div *ngIf=\"parameter.flag == 5\" class=\"row\">\n                <div class=\"offset-lg-7\"></div>\n                <div class=\"col-lg-2 col-md-2 col-sm-5 col-5\">\n                    <div class=\"form-group marginB0\">\n                        <label>{{'filters.time.custom.from' | translate}}:</label>\n                        <p-calendar showIcon=\"true\" [locale]=\"locale\" [(ngModel)]=\"parameter.min\" [maxDate]=\"today\"\n                            showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2040\">\n                        </p-calendar>\n                    </div>\n                </div>\n                <div class=\"col-lg-2 col-md-2 col-sm-5 col-5\">\n                    <div class=\"form-group marginB0\">\n                        <label>{{'filters.time.custom.to' | translate}}:</label>\n                        <p-calendar showIcon=\"true\" [locale]=\"locale\" [(ngModel)]=\"parameter.max\"\n                            [minDate]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\"\n                            [yearNavigator]=\"true\" yearRange=\"2000:2040\"></p-calendar>\n                    </div>\n                </div>\n                <div class=\"col-lg-1 col-md-2 col-sm-2 col-6\">\n                    <div class=\"form-group btn-cont\">\n                        <label class=\"addMT3\">&nbsp;</label>\n                        <button class=\"btn btn-calender\" href=\"javascript://\"\n                            (click)=\"getListing(); getCSRDashBoardData();\"\n                            [disabled]=\"!parameter.min || !parameter.max\">{{'filters.time.custom.applyBtn' |\n                            translate}}</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"listingResults\">\n        <div class=\"row\" *ngIf=\"admin?.admin_acl['Seller Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n            <div class=\"col-md-2\">\n                <div class=\"form-group\">\n                    <label>{{'filters.location.country' | translate}}</label>\n                    <select class=\"form-control\" (change)=\"onCountryChange($event.target.value)\">\n                        <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n                        <option *ngFor=\"let item of location.countries\" [value]=\"item.id\">{{item.name}}</option>\n                    </select>\n                </div>\n            </div>\n            <div class=\"col-md-2\">\n                <div class=\"form-group\">\n                    <label>{{'filters.location.state' | translate}}</label>\n                    <select class=\"form-control\" (change)=\"onStateChange($event.target.value)\">\n                        <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n                        <option *ngFor=\"let item of location.states\" [value]=\"item.id\">{{item.name}}</option>\n                    </select>\n                </div>\n            </div>\n            <div class=\"col-md-2\">\n                <div class=\"form-group\">\n                    <label>{{'filters.location.city' | translate}}</label>\n                    <select class=\"form-control\" (change)=\"onCityChange($event.target.value)\">\n                        <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n                        <option *ngFor=\"let item of location.cities\" [value]=\"item.id\">{{item.name}}</option>\n                    </select>\n                </div>\n            </div>\n\n            <div class=\"col-md-2\">\n                <div class=\"form-group\">\n                    <label>{{'filters.location.locality' | translate}}</label>\n                    <select class=\"form-control\" (change)=\"onLocalityChange($event.target.value)\">\n                        <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n                        <option *ngFor=\"let item of location.localities\" [value]=\"item.id\">{{item.name}}</option>\n                    </select>\n                </div>\n            </div>\n\n            <div class=\"col-md-2\">\n                <div class=\"form-group btn-cont\">\n                    <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n                    <button type=\"button\" (click)=\"getListing(); getCSRDashBoardData();\"\n                        class=\"btn btn-primary-new width100P\">{{'filters.location.applyBtn' | translate}}</button>\n                </div>\n            </div>\n\n            <div class=\"col-md-2\">\n                <div class=\"form-group btn-cont\">\n                    <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n                    <button type=\"button\" (click)=\"resetFilters()\"\n                        class=\"btn btn-primary-new width100P\">{{'filters.location.resetBtn' | translate}}</button>\n                </div>\n            </div>\n        </div>\n        <div *ngIf=\"selectedUser as item\" class=\"sigle-row-table\">\n            <table class=\"table table-striped\">\n                <tbody>\n                    <tr>\n                        <td>\n                            <!-- <img class=\"rounded-circle\" [src]=\"item.image| img:'small'\" onerror='this.src=\"assets/img/default_img.png\"' alt=\"img\"> -->\n                            <img *ngIf=\"item.image\" class=\"rounded-circle\" onerror='src=\"assets/img/default_img.png\"'\n                                alt=\"img\" [defaultImage]=\"item.image| img:'thumb'\" [lazyLoad]=\"item.image\">\n                            <img *ngIf=\"!item.image\" class=\"rounded-circle\" src=\"assets/img/default_img.png\" alt=\"img\">\n                        </td>\n                        <td class=\"text-left\">\n                            <span class=\"name\">{{item.name | titlecase}}</span>\n                        </td>\n                        <td class=\"text-left\">{{item.phone}}</td>\n                        <td class=\"text-left\">{{item.email}}</td>\n                        <td>\n                            <a (click)=\"removeCsrUser()\" href=\"javascript://\" class=\"icon-block edit-icon\"><img\n                                    src=\"assets/img/remove-icon.png\" alt=\"remove\"\n                                    title=\"{{'table.title.remove' | translate}}\" /></a>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-lg-8 col-md-12 col-sm-12 col-12\">\n                <div class=\"info-box all-leads\">\n                    <div class=\"row\">\n                        <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == 1}\"\n                            (click)=\"changeCountFlag(1)\">\n                            <div class=\"one-row \">\n                                <div class=\"o-block\">\n                                    <h5>{{'table.th.leads' | translate}}</h5>\n                                    <small>{{'table.th.total' | translate}}</small>\n                                </div>\n                                <div class=\"o-block\">\n                                    <a class=\"view-all\" href=\"javascript://\">{{'table.th.viewAll' | translate}}</a>\n                                    <h4>{{dash?.lead_total}}</h4>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == 2}\"\n                            (click)=\"changeCountFlag(2)\">\n                            <div class=\"one-row\">\n                                <div class=\"o-block\">\n                                    <h5>{{'table.th.leads' | translate}}</h5>\n                                    <small>{{'table.th.withoutProperty' | translate}}</small>\n                                </div>\n                                <div class=\"o-block\">\n                                    <a class=\"view-all\" href=\"javascript://\">{{'table.th.viewAll' | translate}}</a>\n                                    <h4>{{dash?.lead_without_property}}</h4>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"info-box all-leads\">\n                    <div class=\"row\">\n                        <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == 3}\"\n                            (click)=\"changeCountFlag(3)\">\n                            <div class=\"one-row \">\n                                <div class=\"o-block\">\n                                    <h5>{{'table.th.leads' | translate}}</h5>\n                                    <small>{{'table.th.withProperty' | translate}}</small>\n                                </div>\n                                <div class=\"o-block\">\n                                    <a class=\"view-all\" href=\"javascript://\">{{'table.th.viewAll' | translate}}</a>\n                                    <h4>{{dash?.lead_with_property}}</h4>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == 4}\"\n                            (click)=\"changeCountFlag(4)\">\n                            <div class=\"one-row\">\n                                <div class=\"o-block\">\n                                    <h5>{{'table.th.leads' | translate}}</h5>\n                                    <small>{{'table.th.pendingProperties' | translate}}</small>\n                                </div>\n                                <div class=\"o-block\">\n                                    <a class=\"view-all\" href=\"javascript://\">{{'table.th.viewAll' | translate}}</a>\n                                    <h4>{{dash?.lead_property_pending}}</h4>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n            </div>\n            <div class=\"col-lg-4 col-md-12 col-sm-12 col-12\">\n                <div class=\"chat-msg all-leads\" style=\"padding:0px\">\n                    <div class=\"padding20\" *ngIf=\"dash.lead_total == 0\">{{'message.error.noRecordFound' | translate}}\n                    </div>\n                    <ngx-charts-pie-chart [results]=\"chartView\"></ngx-charts-pie-chart>\n                </div>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-12\">\n                <div class=\"spacer40\"></div>\n            </div>\n\n        </div>\n        <div class=\"row\">\n            <div class=\"col-lg-6 col-md-6 col-6\">\n                <div class=\"title-group\">\n                    <h5>{{'table.th.leads' | translate}}\n                        <span *ngIf=\"parameter.count_flag == 1\">({{'table.th.total' | translate}})</span>\n                        <span *ngIf=\"parameter.count_flag == 2\">({{'table.th.withoutProperty' | translate}})</span>\n                        <span *ngIf=\"parameter.count_flag == 3\">({{'table.th.withProperty' | translate}})</span>\n                        <span *ngIf=\"parameter.count_flag == 4\">({{'table.th.pendingProperties' | translate}})</span>\n                    </h5>\n                </div>\n            </div>\n            <div class=\"col-lg-6 col-md-6 col-5\"\n                *ngIf=\"admin?.admin_acl['Seller Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n                <div class=\"add-new text-right\">\n                    <a class=\"btn\" (click)=\"bulkAssign()\" href=\"javascript://\">{{'table.th.bulkReassign' |\n                        translate}}</a>\n                </div>\n            </div>\n        </div>\n        <div class=\"white-bg\">\n            <div class=\"tabel-section\">\n                <div class=\"table-responsive\">\n                    <table class=\"table table-striped border-0\">\n                        <tbody>\n                            <tr>\n                                <th *ngIf=\"admin?.admin_acl['Seller Lead Management']?.can_read==1 && !this.parameter.assignee_id\"\n                                    style=\"width:5%;\">\n                                    <div class=\"table-search\">\n                                        <label>{{'table.th.all' | translate}}</label>\n                                        <div>\n                                            <label class=\"cust-check-bx marginT0\">\n                                                <input class=\"width1\" type=\"checkbox\" [(ngModel)]=\"allSelected\"\n                                                    (click)=\"selectAll(parameter.is_selected)\" name=\"document\">\n                                                <span class=\"checkmark\"></span>\n                                            </label>\n                                        </div>\n                                    </div>\n                                </th>\n                                <th style=\"width:5%;\">\n                                    <div class=\"table-search\">\n                                        <label>{{'table.th.image' | translate}}</label>\n                                    </div>\n                                </th>\n                                <th style=\"width:15%;\">\n                                    <div class=\"table-search\">\n                                        <label>{{'table.th.name' | translate}}</label>\n                                        <div class=\"searh-3\">\n                                            <input autocomplete=\"off\" type=\"text\" name=\"name\"\n                                                [(ngModel)]=\"parameter.name\" (keyup.enter)=\"getListing()\">\n                                            <button *ngIf=\"parameter.name\" (click)=\"getListing()\"><i\n                                                    class=\"fa fa-search\"></i></button>\n                                        </div>\n                                    </div>\n                                </th>\n                                <th style=\"width:15%;\">\n                                    <div class=\"table-search\">\n                                        <label>{{'table.th.firstSurname' | translate}}</label>\n                                        <div class=\"searh-3\">\n                                            <input autocomplete=\"off\" type=\"text\" name=\"first_surname\"\n                                                [(ngModel)]=\"parameter.first_surname\" (keyup.enter)=\"getListing()\">\n                                            <button *ngIf=\"parameter.first_surname\" (click)=\"getListing()\"><i\n                                                    class=\"fa fa-search\"></i></button>\n                                        </div>\n                                    </div>\n                                </th>\n                                <th style=\"width:15%;\">\n                                    <div class=\"table-search\">\n                                        <label>{{'table.th.secondSurname' | translate}}</label>\n                                        <div class=\"searh-3\">\n                                            <input autocomplete=\"off\" type=\"text\" name=\"second_surname\"\n                                                [(ngModel)]=\"parameter.second_surname\" (keyup.enter)=\"getListing()\">\n                                            <button *ngIf=\"parameter.second_surname\" (click)=\"getListing()\"><i\n                                                    class=\"fa fa-search\"></i></button>\n                                        </div>\n                                    </div>\n                                </th>\n                                <th style=\"width:15%;\">\n                                    <div class=\"table-search\">\n                                        <label>{{'table.th.contactNumber' | translate}}</label>\n                                        <div class=\"searh-3\">\n                                            <input autocomplete=\"off\" type=\"text\" name=\"phone\"\n                                                [(ngModel)]=\"parameter.phone\" (keyup.enter)=\"getListing()\">\n                                            <button *ngIf=\"parameter.phone\" (click)=\"getListing()\"><i\n                                                    class=\"fa fa-search\"></i></button>\n                                        </div>\n                                    </div>\n                                </th>\n                                <th style=\"width:20%;\">\n                                    <div class=\"table-search\">\n                                        <label>{{'table.th.emailAddress' | translate}}</label>\n                                        <div class=\"searh-3\">\n                                            <input autocomplete=\"off\" type=\"text\" name=\"email\"\n                                                [(ngModel)]=\"parameter.email\" (keyup.enter)=\"getListing()\">\n                                            <button *ngIf=\"parameter.email\" (click)=\"getListing()\"><i\n                                                    class=\"fa fa-search\"></i></button>\n                                        </div>\n                                    </div>\n                                </th>\n                                <th style=\"width:10%;\">\n                                    <div class=\"table-search\">\n                                        <label>{{'table.th.assignee' | translate}}</label>\n                                    </div>\n                                </th>\n                                <th style=\"width:5%;\">\n                                    <div class=\"table-search\">\n                                        <label>{{'table.th.chatWithSeller' | translate}}</label>\n                                    </div>\n                                </th>\n                                <th style=\"width:5%;\">\n                                    <div class=\"table-search\">\n                                        <label>{{'table.th.chatWithAgent' | translate}}</label>\n                                    </div>\n                                </th>\n                                <th style=\"width:5%;\">\n                                    <div class=\"table-search\">\n                                        <label>{{'table.th.properties' | translate}}</label>\n                                    </div>\n                                    <div class=\"ppties\">\n                                        <a href=\"javascript://\" (click)=\"sort_by(3)\" data-toggle=\"tooltip\"\n                                            data-placement=\"top\" title=\"{{'table.title.approved' | translate}}\"\n                                            data-original-title=\"Coming soon\">A<img\n                                                [ngClass]=\"{'upsidedown':parameter.sort_by_flag==3 && parameter.sort_by_order==0}\"\n                                                src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n                                    </div>\n                                </th>\n                                <th style=\"width:5%;\">\n                                    <label>&nbsp;</label>\n                                    <div class=\"ppties\">\n                                        <a href=\"javascript://\" (click)=\"sort_by(4)\" data-toggle=\"tooltip\"\n                                            data-placement=\"top\" title=\"{{'table.title.unapproved' | translate}}\"\n                                            data-original-title=\"Coming soon\">U<img\n                                                [ngClass]=\"{'upsidedown':parameter.sort_by_flag==4 && parameter.sort_by_order==0}\"\n                                                src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n                                    </div>\n                                </th>\n                                <th style=\"width:5%;\">\n                                    <label>&nbsp;</label>\n                                    <div class=\"ppties\">\n                                        <a href=\"javascript://\" (click)=\"sort_by(2)\" data-toggle=\"tooltip\"\n                                            data-placement=\"top\" title=\"{{'table.title.pendingReview' | translate}}\"\n                                            data-original-title=\"Coming soon\">P<img\n                                                [ngClass]=\"{'upsidedown':parameter.sort_by_flag==2 && parameter.sort_by_order==0}\"\n                                                src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n                                    </div>\n                                </th>\n                                <th style=\"width:5%;\">\n                                    <label>&nbsp;</label>\n                                    <div class=\"ppties\">\n                                        <a href=\"javascript://\" (click)=\"sort_by(1)\" data-toggle=\"tooltip\"\n                                            data-placement=\"top\" title=\"{{'table.title.inDraft' | translate}}\"\n                                            data-original-title=\"In Draft\">D<img\n                                                [ngClass]=\"{'upsidedown':parameter.sort_by_flag==1 && parameter.sort_by_order==0}\"\n                                                src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n                                    </div>\n                                </th>\n                                <th style=\"width:5%;\">\n                                    <label>&nbsp;</label>\n                                    <div class=\"ppties\">\n                                        <a href=\"javascript://\" (click)=\"sort_by(5)\" data-toggle=\"tooltip\"\n                                            data-placement=\"top\" title=\"{{'table.title.total' | translate}}\"\n                                            data-original-title=\"Coming soon\">T<img\n                                                [ngClass]=\"{'upsidedown':parameter.sort_by_flag==5 && parameter.sort_by_order==0}\"\n                                                src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n                                    </div>\n                                </th>\n                            </tr>\n                            <tr class=\"cursor-pointer\" title=\"{{'table.title.clickToViewDetails' | translate}}\"\n                                *ngFor=\"let item of items| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: parameter.total }\">\n                                <td *ngIf=\"admin?.admin_acl['Seller Lead Management']?.can_read==1 && !this.parameter.assignee_id\"\n                                    (click)=\"$event.stopPropagation()\">\n                                    <label class=\"cust-check-bx marginT0\">\n                                        <input type=\"checkbox\" [(ngModel)]=\"item.selected\" name=\"document\">\n                                        <span class=\"checkmark\"></span>\n                                    </label>\n                                    <!-- <i class=\"fa\" [ngClass]=\"item.selected?'fa-check-square-o':'fa-square-o'\" (click)=\"item.selected = !item.selected\" aria-hidden=\"true\"></i> -->\n                                </td>\n                                <td routerLink=\"/dashboard/leads/csr-sellers/{{item.id}}\">\n                                    <img class=\"rounded-circle\" *ngIf=\"item.image\"\n                                        onerror='src=\"assets/img/default_img.png\"' alt=\"img\"\n                                        [defaultImage]=\"item.image| img:'thumb'\" [lazyLoad]=\"item.image\">\n                                    <img class=\"rounded-circle\" *ngIf=\"!item.image\" src=\"assets/img/default_img.png\"\n                                        alt=\"img\">\n                                </td>\n                                <td class=\"text-left\" routerLink=\"/dashboard/leads/csr-sellers/{{item.id}}\">\n                                    <span class=\"name\">{{item.name | titlecase}}</span>\n                                </td>\n                                <td class=\"text-left\" routerLink=\"/dashboard/leads/csr-sellers/{{item.id}}\">\n                                    <span class=\"name\">{{item.first_surname | titlecase}}</span>\n                                </td>\n                                <td class=\"text-left\" routerLink=\"/dashboard/leads/csr-sellers/{{item.id}}\">\n                                    <span class=\"name\">{{item.second_surname | titlecase}}</span>\n                                </td>\n                                <td routerLink=\"/dashboard/leads/csr-sellers/{{item.id}}\" class=\"text-left\"\n                                    *ngIf=\"item.phone\">{{item.dial_code}}-{{item.phone.trim()}}</td>\n                                <td routerLink=\"/dashboard/leads/csr-sellers/{{item.id}}\" class=\"text-left\"\n                                    *ngIf=\"!item.phone\">{{'table.tr.td.NA' | translate}}</td>\n                                <td routerLink=\"/dashboard/leads/csr-sellers/{{item.id}}\" class=\"text-left\">\n                                    {{item.email}}\n                                </td>\n                                <td routerLink=\"/dashboard/leads/csr-sellers/{{item.id}}\" class=\"text-left\">\n                                    {{item.csr_seller_name?item.csr_seller_name:('table.tr.td.NA' | translate)}}</td>\n                                <td class=\"text-left\"\n                                    (click)=\"getCSRSellerChat($event, 1, item.assigned_csr_seller_id, item.id)\">\n                                    <a class=\"green-color fontW500\" href=\"javascript://\">{{'table.th.chatWithSeller' |\n                                        translate}}</a>\n                                </td>\n                                <td class=\"text-left\"\n                                    (click)=\"getCSRSellerChat($event, 2, item.assigned_csr_seller_id, item.id)\">\n                                    <a class=\"green-color fontW500\" href=\"javascript://\">{{'table.th.chatWithAgent' |\n                                        translate}}</a>\n                                </td>\n                                <td routerLink=\"/dashboard/leads/csr-sellers/{{item.id}}\">\n                                    {{item.approved_count}}\n                                </td>\n                                <td routerLink=\"/dashboard/leads/csr-sellers/{{item.id}}\">\n                                    {{item.rejected_count}}\n                                </td>\n                                <td routerLink=\"/dashboard/leads/csr-sellers/{{item.id}}\">\n                                    {{item.pending_count}}\n                                </td>\n                                <td routerLink=\"/dashboard/leads/csr-sellers/{{item.id}}\">\n                                    {{item.draft_count}}\n                                </td>\n                                <td routerLink=\"/dashboard/leads/csr-sellers/{{item.id}}\">\n                                    {{item.total_count}}\n                                </td>\n                            </tr>\n                        </tbody>\n                    </table>\n                    <div class=\"padding20 center\" *ngIf=\"parameter.noResultFound\">\n                        <img src=\"assets/img/404-error.png\">\n                    </div>\n                </div>\n            </div>\n\n        </div>\n    </div>\n\n    <div class=\"btn-cont marginT15\" *ngIf=\"parameter.total\">\n        <div class=\"row\">\n            <div class=\"col-6\">\n                <div class=\"title-group\">\n                    <p>{{'table.pagination.showing' | translate}} {{items?.length}} {{'table.pagination.outof' |\n                        translate}} {{parameter.total}}</p>\n                </div>\n            </div>\n            <div class=\"col-6 text-right\">\n                <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n            </div>\n        </div>\n    </div>\n</div>\n\n\n\n<!-- Assignment model -->\n<a data-toggle=\"modal\" data-target=\"#assign-model\" #openAssignModel></a>\n<div class=\"modal\" id=\"assign-model\">\n    <div class=\"modal-dialog \">\n        <div class=\"modal-content notary-avail\">\n            <div class=\"modal-header popup-header\">\n                <h4 class=\"modal-title\">{{'leads.reAssignTo' | translate}}</h4>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #closeAssignModel>&times;</button>\n            </div>\n            <div class=\"modal-body\">\n                <div class=\"row\">\n                    <div class=\"col-md-8 col-6\">\n                        <input style=\"max-width:200px\" list=\"amenities\" [(ngModel)]=\"assign.keyword\"\n                            (keyup.enter)=\"getAssignListing()\" class=\"form-control\" type=\"text\" name=\"keyword\"\n                            placeholder=\"{{'addForm.placeholder.search' | translate}}\">\n                    </div>\n                    <div class=\"col-md-4 col-5 btn-cont\">\n                        <a class=\"btn btn-primary pull-right\" href=\"javascript://\"\n                            (click)=\"assignNow()\">{{'leads.assign' | translate}}</a>\n                    </div>\n                </div>\n                <div class=\"spacer40\"></div>\n                <div class=\"modal-table-data\" malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\">\n                    <table class=\"table\">\n                        <tr *ngFor=\"let item of assign.items\">\n                            <td *ngIf=\"item.is_blocked!=1\">\n                                <div class=\"n-avail-profile\">\n                                    <!-- <img [src]=\"item.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\"> -->\n                                    <img *ngIf=\"item.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\"\n                                        [defaultImage]=\"item.image| img:'thumb'\" [lazyLoad]=\"item.image\">\n                                    <img *ngIf=\"!item.image\" src=\"assets/img/default_img.png\" alt=\"img\">\n                                    <div class=\"n-avail-info\">\n                                        <p class=\"p12\">{{item.name | titlecase}}</p>\n                                        <p class=\"p10\">{{'leads.phone' | translate}} : {{item.dial_code ? item.dial_code\n                                            : constant.dial_code}}-{{item.phone}}</p>\n                                    </div>\n                                </div>\n                            </td>\n                            <td *ngIf=\"item.is_blocked!=1\">\n                                <label class=\"cust-check-bx float-right\">\n                                    <input type=\"radio\" name=\"notary_id\" (click)=\"assignItem = item\">\n                                    <span class=\"checkmark\"></span>\n                                </label>\n                            </td>\n                        </tr>\n                        <tr *ngIf=\"assign?.items?.length==0\">\n                            <p class=\"show-not-found\">{{'leads.noCSRSeller' | translate}}</p>\n                        </tr>\n                    </table>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/layout/leads/csr-seller/csr-seller.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/layout/leads/csr-seller/csr-seller.component.ts ***!
  \*****************************************************************/
/*! exports provided: CsrSellerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CsrSellerComponent", function() { return CsrSellerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var src_app_services_leads_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/leads.service */ "./src/app/services/leads.service.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var CsrSellerComponent = /** @class */ (function () {
    function CsrSellerComponent(admin, leadsService, constant, route, router, spinner, translate) {
        this.admin = admin;
        this.leadsService = leadsService;
        this.constant = constant;
        this.route = route;
        this.router = router;
        this.spinner = spinner;
        this.translate = translate;
        this.scrollbarOptions = { axis: 'y', theme: 'dark' };
        this.parameter = {};
        this.location = {};
        this.assign = {};
        this.items = [];
        this.today = new Date();
        this.users = [];
        this.initSelection = false;
        this.allSelected = false;
        this.dash = {
            lead_total: 0,
            lead_property_pending: 0,
            lead_with_property: 0,
            lead_without_property: 0
        };
        this.chartView = [];
    }
    CsrSellerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.locale = {
            firstDayOfWeek: 0,
            dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
            dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
            dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
            monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
            monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun',
                'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
            today: 'Hoy',
            clear: 'Clara',
            dateFormat: 'mm/dd/yy',
            weekHeader: 'Wk'
        };
        this.parameter.is_selected = false;
        this.parameter.keyword = '';
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        this.parameter.flag = this.leadsService.sellerLeadsFlag ? this.leadsService.sellerLeadsFlag : this.constant.flag;
        this.parameter.total = 0;
        this.parameter.count_flag = this.leadsService.sellerLeadsCountFlag ? this.leadsService.sellerLeadsCountFlag : this.constant.count_flag;
        this.route.params.subscribe(function (params) {
            _this.parameter.assignee_id = params.id;
        });
        this.getCountries();
        this.getListing();
        this.getCSRDashBoardData();
        Object.assign(this, this.chartView);
    };
    CsrSellerComponent.prototype.getCountries = function () {
        var _this = this;
        this.admin.postDataApi('getCountryLocality', {}).subscribe(function (r) {
            _this.location.countries = r['data'];
        });
    };
    CsrSellerComponent.prototype.onCountryChange = function (id) {
        this.parameter.country_id = id;
        this.location.states = [];
        this.parameter.state_id = '0';
        this.location.cities = [];
        this.parameter.city_id = '0';
        this.location.localities = [];
        this.parameter.locality_id = '0';
        if (!id || id === '0') {
            return false;
        }
        this.parameter.country_id = id;
        var selectedCountry = this.location.countries.filter(function (x) { return x.id.toString() === id; });
        this.location.states = selectedCountry[0].states;
    };
    CsrSellerComponent.prototype.onStateChange = function (id) {
        this.location.cities = [];
        this.parameter.city_id = '0';
        this.location.localities = [];
        this.parameter.locality_id = '0';
        if (!id || id === '0') {
            return false;
        }
        this.parameter.state_id = id;
        var selectedState = this.location.states.filter(function (x) { return x.id.toString() === id; });
        this.location.cities = selectedState[0].cities;
    };
    CsrSellerComponent.prototype.onCityChange = function (id) {
        this.location.localities = [];
        this.parameter.locality_id = '0';
        if (!id || id === '0') {
            return false;
        }
        this.parameter.city_id = id;
        var selectedCountry = this.location.cities.filter(function (x) { return x.id.toString() === id; });
        this.location.localities = selectedCountry[0].localities;
    };
    CsrSellerComponent.prototype.onLocalityChange = function (id) {
        if (!id || id === '0') {
            return false;
        }
        this.parameter.locality_id = id;
        // this.getCsrListing();
    };
    CsrSellerComponent.prototype.changeFlag = function (flag) {
        this.parameter.flag = flag;
        this.leadsService.sellerLeadsFlag = flag;
        this.parameter.count_flag = 1;
        this.resetDates();
        this.getListing();
        this.getCSRDashBoardData();
    };
    // changeFilter = (key: string, value: any): void => {
    //   this.parameter[key] = value;
    //   this.getListing();
    // }
    CsrSellerComponent.prototype.changeCountFlag = function (flag) {
        this.parameter.count_flag = flag;
        this.leadsService.sellerLeadsCountFlag = flag;
        this.getListing();
    };
    CsrSellerComponent.prototype.getCsrListing = function () {
        var _this = this;
        this.initSelection = true;
        this.users = [];
        var input = new FormData();
        if (this.parameter.keyword) {
            input.append('keyword', this.parameter.keyword);
        }
        // if (this.parameter.country_id && this.parameter.country_id !== '-1') {
        //   input.append('countries', JSON.stringify([this.parameter.country_id]));
        // }
        // if (this.parameter.state_id && this.parameter.state_id !== '-1') {
        //   input.append('states', JSON.stringify([this.parameter.state_id]));
        // }
        // if (this.parameter.city_id && this.parameter.city_id !== '-1') {
        //   input.append('cities', JSON.stringify([this.parameter.city_id]));
        // }
        // if (this.parameter.locality_id && this.parameter.locality_id !== '-1') {
        //   input.append('localities', JSON.stringify([this.parameter.locality_id]));
        // }
        this.admin.postDataApi('getCsrSellers', input).subscribe(function (success) {
            _this.users = success.data;
        });
    };
    CsrSellerComponent.prototype.resetFilters = function () {
        this.location.countries = JSON.parse(JSON.stringify(this.location.countries));
        this.onCountryChange('0');
        this.parameter.is_selected = false;
        this.parameter.page = this.constant.p;
        this.parameter.flag = 2;
        this.parameter.total = 0;
        // this.selectedUser = '';
        this.parameter.keyword = '';
        this.parameter.count_flag = 1;
        this.resetDates();
        this.getListing();
        this.getCSRDashBoardData();
    };
    CsrSellerComponent.prototype.resetDates = function () {
        this.parameter.min = '';
        this.parameter.max = '';
    };
    CsrSellerComponent.prototype.closeCsrListing = function () {
        var _this = this;
        setTimeout(function () {
            _this.users = [];
        }, 200);
    };
    CsrSellerComponent.prototype.selectCsrUser = function (user) {
        this.selectedUser = user;
        this.users = [];
        this.parameter.keyword = '';
        this.initSelection = false;
        this.getListing();
        this.getCSRDashBoardData();
    };
    CsrSellerComponent.prototype.removeCsrUser = function () {
        this.selectedUser = '';
        this.parameter.keyword = '';
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        // this.parameter.flag = 2;
        this.parameter.total = 0;
        this.parameter.count_flag = 1;
        this.getListing();
        this.getCSRDashBoardData();
    };
    CsrSellerComponent.prototype.getCSRDashBoardData = function () {
        var _this = this;
        // const input = new FormData();
        // if (this.selectedUser) {
        //   input.append('assignee_id', this.selectedUser.id);
        // } else if (this.parameter.assignee_id) {
        //   input.append('assignee_id', this.parameter.assignee_id);
        // }
        // if (this.parameter.flag) {
        //   input.append('flag', this.parameter.flag.toString());
        // }
        var input = JSON.parse(JSON.stringify(this.parameter));
        if (this.parameter.min) {
            input.min = moment__WEBPACK_IMPORTED_MODULE_2__(this.parameter.min).format('YYYY-MM-DD');
        }
        else {
            delete input.min;
        }
        if (this.parameter.max) {
            input.max = moment__WEBPACK_IMPORTED_MODULE_2__(this.parameter.max).format('YYYY-MM-DD');
        }
        else {
            delete input.max;
        }
        if (this.selectedUser) {
            input.assignee_id = this.selectedUser.id;
        }
        else if (this.parameter.assignee_id) {
            input.assignee_id = this.parameter.assignee_id;
        }
        this.admin.postDataApi('leads/csr-seller-dash-count', input).subscribe(function (r) {
            console.log('pie chart data ', r);
            _this.dash = r.data;
            _this.chartView = [
                {
                    'name': _this.translate.instant('leads.propertyPending'),
                    'value': parseInt(_this.dash.lead_property_pending, 10)
                },
                {
                    'name': _this.translate.instant('leads.leadWithProperty'),
                    'value': parseInt(_this.dash.lead_with_property, 10)
                },
                {
                    'name': _this.translate.instant('leads.leadWithoutProperty'),
                    'value': parseInt(_this.dash.lead_without_property, 10)
                }
            ];
        });
    };
    CsrSellerComponent.prototype.getListing = function () {
        var _this = this;
        this.items = [];
        this.parameter.noResultFound = false;
        var input = JSON.parse(JSON.stringify(this.parameter));
        if (this.parameter.min) {
            input.min = moment__WEBPACK_IMPORTED_MODULE_2__(this.parameter.min).format('YYYY-MM-DD');
        }
        else {
            delete input.min;
        }
        if (this.parameter.max) {
            input.max = moment__WEBPACK_IMPORTED_MODULE_2__(this.parameter.max).format('YYYY-MM-DD');
        }
        else {
            delete input.max;
        }
        if (this.selectedUser) {
            input.assignee_id = this.selectedUser.id;
        }
        else if (this.parameter.assignee_id) {
            input.assignee_id = this.parameter.assignee_id;
        }
        this.spinner.show();
        this.admin.postDataApi('leads/csr-seller-v2', input).subscribe(function (success) {
            _this.spinner.hide();
            _this.items = success.data;
            if (_this.items.length <= 0) {
                _this.parameter.noResultFound = true;
            }
            _this.parameter.total = success.total_count;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    CsrSellerComponent.prototype.getPage = function (page) {
        this.parameter.page = page;
        this.getListing();
    };
    CsrSellerComponent.prototype.sort_by = function (sort_by_flag) {
        if (this.parameter.sort_by_flag !== sort_by_flag) {
            this.parameter.sort_by_flag = sort_by_flag;
            this.parameter.sort_by_order = 0;
        }
        else {
            this.parameter.sort_by_order = this.parameter.sort_by_order ? 0 : 1;
        }
        this.getListing();
    };
    CsrSellerComponent.prototype.selectAll = function (is_selected) {
        var _this = this;
        this.parameter.is_selected = !is_selected;
        this.items.forEach(function (item) {
            item.selected = _this.parameter.is_selected;
        });
    };
    CsrSellerComponent.prototype.bulkAssign = function () {
        var leads_ids = this.items.filter(function (x) { return x.selected; }).map(function (y) { return y.id; });
        if (leads_ids.length === 0) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseAtleast1Lead'), 'error');
            return false;
        }
        if (!this.assign.items) {
            this.getAssignListing();
        }
        this.openAssignModel.nativeElement.click();
    };
    CsrSellerComponent.prototype.getAssignListing = function () {
        var _this = this;
        var input = {
            keyword: this.assign.keyword
        };
        this.spinner.show();
        this.admin.postDataApi('getCsrSellers', input).subscribe(function (success) {
            _this.spinner.hide();
            _this.assign.items = success.data;
        });
    };
    CsrSellerComponent.prototype.assignNow = function () {
        var _this = this;
        var leads_ids = this.items.filter(function (x) { return x.selected; }).map(function (y) { return y.id; });
        var users_ids = this.items.filter(function (x) { return x.selected; }).map(function (y) { return y.admin.id; });
        var input = {
            csr_seller_id: this.assignItem.id,
            leads: leads_ids,
            users: users_ids
        };
        this.spinner.show();
        this.admin.postDataApi('leads/bulkAssignSeller', input).subscribe(function (r) {
            _this.spinner.hide();
            swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.assignedSuccessfully'), 'success');
            _this.closeAssignModel.nativeElement.click();
            _this.getListing();
            _this.allSelected = false;
        }, function (error) {
            _this.spinner.hide();
            _this.closeAssignModel.nativeElement.click();
            swal(_this.translate.instant('swal.error'), error.error.message, 'error');
        });
    };
    CsrSellerComponent.prototype.getCSRSellerChat = function ($event, chat_with, csr_seller_id, lead_id) {
        // chat_with = 1 means chat with seller, 2 means chat with agent
        if (csr_seller_id) {
            this.router.navigate(['/dashboard/leads/chat-with-seller', chat_with, csr_seller_id, lead_id]);
        }
        else {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.noCSRSellerAssigned'), 'error');
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('openAssignModel'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CsrSellerComponent.prototype, "openAssignModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('closeAssignModel'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CsrSellerComponent.prototype, "closeAssignModel", void 0);
    CsrSellerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-csr-seller',
            template: __webpack_require__(/*! ./csr-seller.component.html */ "./src/app/layout/leads/csr-seller/csr-seller.component.html"),
            styles: [__webpack_require__(/*! ./csr-seller.component.css */ "./src/app/layout/leads/csr-seller/csr-seller.component.css")],
            providers: [src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["Constant"]]
        }),
        __metadata("design:paramtypes", [src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_5__["AdminService"],
            src_app_services_leads_service__WEBPACK_IMPORTED_MODULE_6__["LeadsService"],
            src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["Constant"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateService"]])
    ], CsrSellerComponent);
    return CsrSellerComponent;
}());



/***/ }),

/***/ "./src/app/layout/leads/data-collector/data-collector.component.css":
/*!**************************************************************************!*\
  !*** ./src/app/layout/leads/data-collector/data-collector.component.css ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9sZWFkcy9kYXRhLWNvbGxlY3Rvci9kYXRhLWNvbGxlY3Rvci5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/layout/leads/data-collector/data-collector.component.html":
/*!***************************************************************************!*\
  !*** ./src/app/layout/leads/data-collector/data-collector.component.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n\n<div class=\"container-fluid\">\n    <div class=\"row\">\n        <div class=\"col-md-4\">\n            <div class=\"form-group\">\n                    <p class=\"p16\">{{'leads.dataCollectorLeads' | translate}}</p>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-md-4\">\n            <div class=\"form-group\" *ngIf=\"admin?.admin_acl['Data Collector Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n                <div class=\"d-flex\">\n                <!-- <button (click)=\"removeCsrUser()\" class=\"all-btn\">All</button> -->\n                <div class=\"autocomplete\">\n                    <input placeholder=\"{{'addForm.placeholder.searchDataCollector' | translate}}\" style=\"max-width:200px\" list=\"amenities\" [(ngModel)]=\"parameter.keyword\" (input)=\"getCsrListing()\" class=\"form-control\" type=\"text\" name=\"keyword\" (focusout)=\"closeCsrListing()\">\n                    <div id=\"myInputautocomplete-list\" class=\"autocomplete-items\">\n                        <div *ngFor=\"let item of users\" (click)=\"selectCsrUser(item)\">{{item.email}}</div>\n                    </div>\n                </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-md-8 col-12\">\n            <div class=\"cust-tabs-2\">\n                <ul class=\"nav nav-tabs\">\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==1}\" (click)=\"changeFlag(1)\" >{{'filters.time.thisWeek' | translate}}</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==2}\" (click)=\"changeFlag(2)\" >{{'filters.time.thisMonth' | translate}}</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==3}\" (click)=\"changeFlag(3)\" >{{'filters.time.lastMonth' | translate}}</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==4}\" (click)=\"changeFlag(4)\" >{{'filters.time.lifetime' | translate}}</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==5}\" (click)=\"parameter.flag=5\" >{{'filters.time.custom.label' | translate}}</a>\n                </li>\n                </ul>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-12\">\n            <div *ngIf=\"parameter.flag == 5\" class=\"row\">\n                <div class=\"offset-lg-7\"></div>\n                <div class=\"col-lg-2 col-md-2 col-sm-5 col-5\">\n                <div class=\"form-group marginB0\">\n                        <label>{{'filters.time.custom.from' | translate}}:</label>\n                    <p-calendar showIcon=\"true\" [locale]=\"locale\" [(ngModel)]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2040\"></p-calendar>\n                </div>\n                </div>\n                <div class=\"col-lg-2 col-md-2 col-sm-5 col-5\">\n                <div class=\"form-group marginB0\">\n                        <label>{{'filters.time.custom.to' | translate}}:</label>\n                    <p-calendar showIcon=\"true\" [locale]=\"locale\" [(ngModel)]=\"parameter.max\" [minDate]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2040\"></p-calendar>\n                </div>\n                </div>\n                <div class=\"col-lg-1 col-md-2 col-sm-2 col-6\">\n                <div class=\"form-group btn-cont\">\n                    <label class=\"addMT3\">&nbsp;</label>\n                    <button class=\"btn btn-calender\" href=\"javascript://\" (click)=\"getListing(); getCSRDashBoardData();\"\n                        [disabled]=\"!parameter.min || !parameter.max\">{{'filters.time.custom.applyBtn' | translate}}</button>\n                </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-md-2\">\n            <div class=\"form-group\">\n                    <label>{{'filters.location.country' | translate}}</label>\n            <select class=\"form-control\" (change)=\"onCountryChange($event.target.value)\">\n                    <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n                <option *ngFor=\"let item of location.countries\" [value]=\"item.id\">{{item.name}}</option>\n            </select>\n            </div>\n        </div>\n        <div class=\"col-md-2\">\n            <div class=\"form-group\">\n                    <label>{{'filters.location.state' | translate}}</label>\n            <select class=\"form-control\" (change)=\"onStateChange($event.target.value)\">\n                    <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n                <option *ngFor=\"let item of location.states\" [value]=\"item.id\">{{item.name}}</option>\n            </select>\n            </div>\n        </div>\n        <div class=\"col-md-2\">\n            <div class=\"form-group\">\n                    <label>{{'filters.location.city' | translate}}</label>\n                <select class=\"form-control\" (change)=\"onCityChange($event.target.value)\">\n                        <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n                <option *ngFor=\"let item of location.cities\" [value]=\"item.id\">{{item.name}}</option>\n                </select>\n            </div>\n        </div>\n\n        <div class=\"col-md-2\">\n            <div class=\"form-group\">\n                    <label>{{'filters.location.locality' | translate}}</label>\n            <select class=\"form-control\" (change)=\"onLocalityChange($event.target.value)\">\n                    <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n                <option *ngFor=\"let item of location.localities\" [value]=\"item.id\">{{item.name}}</option>\n            </select>\n            </div>\n        </div>\n\n        <div class=\"col-md-2\">\n            <div class=\"form-group btn-cont\">\n            <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n            <button type=\"button\" (click)=\"getListing(); getCSRDashBoardData();\" class=\"btn btn-primary-new width100P\">{{'filters.location.applyBtn' | translate}}</button>\n            </div>\n        </div>\n\n        <div class=\"col-md-2\">\n            <div class=\"form-group btn-cont\">\n            <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n            <button type=\"button\" (click)=\"resetFilters()\" class=\"btn btn-primary-new width100P\">{{'filters.location.resetBtn' | translate}}</button>\n            </div>\n        </div>\n    </div>\n\n    <div *ngIf=\"selectedUser as item\" class=\"sigle-row-table\">\n        <table class=\"table table-striped\">\n        <tbody><tr>\n            <td><img class=\"rounded-circle\" [src]=\"item.image| img:'small'\" onerror='this.src=\"assets/img/default_img.png\"' alt=\"img\"></td>\n            <td class=\"text-left\">\n                <span class=\"name\">{{item.name | titlecase}}</span>\n            </td>\n            <td class=\"text-left\">\n                {{item.phone}}\n            </td>\n            <td class=\"text-left\">\n                {{item.email}}\n            </td>\n            <td>\n                <a (click)=\"removeCsrUser()\" href=\"javascript://\" class=\"icon-block edit-icon\"><img src=\"assets/img/remove-icon.png\" alt=\"remove\" title=\"{{'table.title.remove' | translate}}\" /></a>\n            </td>\n            </tr>\n        </tbody>\n        </table>\n  </div>\n\n  <div class=\"row\">\n      <div class=\"col-lg-4 col-md-12 col-sm-12 col-12\">\n        <div class=\"info-box\">\n            <div class=\"one-row\" [ngClass]=\"{'active':parameter.count_flag == 1}\" (click)=\"changeCountFlag(1)\">\n              <div class=\"o-block\">\n                  <h5>{{'table.th.buildings' | translate}}</h5>\n                  <small>{{'table.th.requestsPending' | translate}}</small>\n              </div>\n              <div class=\"o-block\">\n                  <a class=\"view-all\" href=\"javascript://\">{{'table.th.viewAll' | translate}}</a>\n                  <h4>{{dash.request_pending_total}}</h4>\n              </div>\n            </div>\n            <div class=\"three-row\">\n              <!-- <div class=\"t-block\" [ngClass]=\"{'active':parameter.count_flag == '2'}\" (click)=\"changeCountFlag(2)\">\n                  <p><strong>{{dash.request_pending_admin}}</strong></p>\n                  <p>Admin</p>\n              </div> -->\n              <div class=\"t-block\" [ngClass]=\"{'active':parameter.count_flag == 2}\" (click)=\"changeCountFlag(2)\">\n                  <p><strong>{{dash.request_pending_admin}}</strong></p>\n                  <p>{{'table.th.adminDataCollector' | translate}}</p>\n              </div>\n              <div class=\"t-block\" [ngClass]=\"{'active':parameter.count_flag == 3}\" (click)=\"changeCountFlag(3)\">\n                  <p><strong>{{dash.request_pending_user}}</strong></p>\n                  <p>{{'table.th.user' | translate}}</p>\n              </div>\n            </div>\n        </div>\n      </div>\n    <div class=\"col-lg-4 col-md-12 col-sm-12 col-12\">\n        <div class=\"four-block\">\n            <div class=\"d-flex\">\n              <div class=\"f-block approved\" [ngClass]=\"{'active':parameter.count_flag == 4}\" (click)=\"changeCountFlagForBuilding(4)\">\n                  <h5>{{'table.th.approved' | translate}}</h5>\n                  <h3>{{dash.building_approved}}</h3>\n              </div>\n              <div class=\"f-block unapproved\" [ngClass]=\"{'active':parameter.count_flag == 5}\" (click)=\"changeCountFlagForBuilding(5)\">\n                  <h5>{{'table.th.unapproved' | translate}}</h5>\n                  <h3>{{dash.building_unapproved}}</h3>\n              </div>\n            </div>\n            <div class=\"d-flex\">\n              <div class=\"f-block pending\" [ngClass]=\"{'active':parameter.count_flag == 6}\" (click)=\"changeCountFlagForBuilding(6)\">\n                  <h5>{{'filters.flag.pendingReview' | translate}}</h5>\n                  <h3>{{dash.building_pending}}</h3>\n              </div>\n              <div class=\"f-block unapproved\" [ngClass]=\"{'active':parameter.count_flag == 7}\" (click)=\"changeCountFlagForBuilding(7)\">\n                  <h5>{{'table.th.inDraft' | translate}}</h5>\n                  <h3>{{dash.building_draft}}</h3>\n              </div>\n            </div>\n        </div>\n      </div>\n      <div class=\"col-lg-4 col-md-12 col-sm-12 col-12\">\n            <div class=\"chat-msg all-leads\" style=\"padding:0px;height:185px;\">\n                <div class=\"padding20\" *ngIf=\"dash?.request_pending_total == 0\">{{'message.error.noRecordFound' | translate}}</div>\n                <ngx-charts-pie-chart [results]=\"chartView\"></ngx-charts-pie-chart>\n            </div>\n      </div>\n  </div>\n\n  <div class=\"row\">\n      <div class=\"col-12\">\n        <div class=\"spacer40\"></div>\n      </div>\n      <div class=\"col-lg-6 col-md-6 col-6\">\n        <div class=\"title-group\">\n            <h5>{{'table.th.leads' | translate}}\n                <span *ngIf=\"parameter.count_flag == 1\">({{'table.th.totalRequest' | translate}})</span>\n                <span *ngIf=\"parameter.count_flag == 2\">({{'table.th.adminRequest' | translate}})</span>\n                <span *ngIf=\"parameter.count_flag == 3\">({{'table.th.userRequest' | translate}})</span>\n                <span *ngIf=\"parameter.count_flag == 4\">({{'table.th.approved' | translate}})</span>\n                <span *ngIf=\"parameter.count_flag == 5\">({{'table.th.unapproved' | translate}})</span>\n                <span *ngIf=\"parameter.count_flag == 6\">({{'table.th.pending' | translate}})</span>\n                <span *ngIf=\"parameter.count_flag == 7\">({{'table.th.inDraft' | translate}})</span>\n            </h5>\n            <p>\n            <!-- Showing {{parameter.page}} out of {{parameter.total_count}} -->\n            </p>\n        </div>\n      </div>\n      <div class=\"col-lg-6 col-md-6 col-5\" *ngIf=\"admin?.admin_acl['Data Collector Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n            <div class=\"add-new text-right\">\n                <a class=\"btn\" (click)=\"bulkAssign()\" href=\"javascript://\">{{'table.th.bulkReassign' | translate}}</a>\n            </div>\n        </div>\n  </div>\n\n  <div class=\"white-bg\">\n        <div class=\"tabel-section\">\n           <div class=\"table-responsive\">\n              <table class=\"table table-striped table-align-left vertical-align-top border-0\">\n                 <tr>\n                        <!-- class=\"border-top-0\" -->\n                    <th *ngIf=\"admin?.admin_acl['Data Collector Lead Management']?.can_read==1 && !this.parameter.assignee_id\" style=\"width:6%\">\n                        <div class=\"table-search\">\n                                <label>{{'table.th.all' | translate}}</label>\n                            <div>\n                                <label class=\"cust-check-bx\" >\n                                    <input class=\"width1\" type=\"checkbox\" (click)=\"selectAll(parameter.is_selected)\" name=\"document\">\n                                    <span class=\"checkmark\"></span>\n                                </label>\n                            </div>\n                        </div>\n                    </th>\n\n                    <!-- <th>Image</th> -->\n                    <th style=\"width:15%\">\n                        <div class=\"table-search\">\n                                <label>{{'table.th.nameOfBuilding' | translate}}</label>\n                        <div class=\"searh-3\">\n                            <input autocomplete=\"off\" type=\"text\" name=\"name\" [(ngModel)]=\"parameter.name\" (keyup.enter)=\"getListing()\">\n                            <button *ngIf=\"parameter.name\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                        </div>\n                        </div>\n                    </th>\n                    <th style=\"width:20%; text-align:left;\">\n                        <div class=\"table-search\">\n                                <label>{{'table.th.address' | translate}}</label>\n                        <div class=\"searh-3\">\n                            <input autocomplete=\"off\" type=\"text\" name=\"name\" [(ngModel)]=\"parameter.location\" (keyup.enter)=\"getListing()\">\n                            <button *ngIf=\"parameter.address\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                        </div>\n                        </div>\n                    </th>\n                    <th style=\"width:15%\">\n                        <div class=\"table-search\">\n                                <label>{{'table.th.developer' | translate}}</label>\n                        <div class=\"searh-3\">\n                            <input autocomplete=\"off\" type=\"text\" name=\"name\" [(ngModel)]=\"parameter.developer\" (keyup.enter)=\"getListing()\">\n                            <button *ngIf=\"parameter.email\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                        </div>\n                        </div>\n                    </th>\n                    <th style=\"width:20%;\">\n                        <div class=\"table-search\">\n                                <label>{{'table.th.emailAddress' | translate}}</label>\n                        </div>\n                    </th>\n                    <!-- show collector name in case of 1,2,3 -->\n                    <th style=\"width:14%\" *ngIf=\"parameter.count_flag==1 || parameter.count_flag==2 || parameter.count_flag==3\">\n                        <div class=\"table-search\">\n                            <label>{{'table.th.assignee' | translate}}</label>\n                        </div>\n                    </th>\n                    <!-- mark complete only when it is request - 1,2,3 -->\n                    <th style=\"width:15%\" *ngIf=\"parameter.count_flag==1 || parameter.count_flag==2 || parameter.count_flag==3\">\n                        <div class=\"table-search\">\n                            <label>{{'table.th.markComplete' | translate}}</label>\n                        </div>\n                    </th>\n                    <!-- use request details to create project -->\n                    <th style=\"width:4%\" *ngIf=\"parameter.count_flag==1 || parameter.count_flag==2 || parameter.count_flag==3\">\n                        <div class=\"table-search\">\n                            <label>{{'table.th.useTemplate' | translate}}</label>\n                        </div>\n                    </th>\n                    <th style=\"width:9%\" *ngIf=\"parameter.count_flag==4 || parameter.count_flag==5 || parameter.count_flag==6 || parameter.count_flag==7\">\n                        <div class=\"table-search\">\n                            <label>{{'table.th.editDetails' | translate}}</label>\n                        </div>\n                    </th>\n                 </tr>\n                 <tr *ngFor=\"let item of items| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: parameter.total }; let i=index\">\n                    <!-- <td>\n                        <a href=\"javascript://\"><img *ngIf=\"item.image\" class=\"rounded-circle\" [src]=\"item.image\" alt=\"img\">\n                        <img *ngIf=\"!item.image\" class=\"rounded-circle\" src=\"assets/img/default_img.png\" alt=\"img\">\n                        </a>\n                    </td> -->\n                    <td *ngIf=\"admin?.admin_acl['Data Collector Lead Management']?.can_read==1 && !this.parameter.assignee_id\" (click)=\"$event.stopPropagation()\">\n                        <label class=\"cust-check-bx\">\n                        <input type=\"checkbox\" [(ngModel)]=\"item.selected\" name=\"document\">\n                        <span class=\"checkmark\"></span>\n                        </label>\n                    </td>\n                    <td><strong>{{item?.name | titlecase}}</strong></td>\n                    <td>{{item?.address}}</td>\n                    <!-- dev name -->\n                    <td *ngIf=\"parameter.count_flag==1 || parameter.count_flag==2 || parameter.count_flag==3\">\n                        <span>{{item?.dev_name}}</span>\n                        <span *ngIf=\"!item?.dev_name\" >{{'table.tr.td.NA' | translate}}</span>\n                    </td>\n                    <td *ngIf=\"parameter.count_flag==4 || parameter.count_flag==5 || parameter.count_flag==6 || parameter.count_flag==7\">\n                        <span>{{item?.developer?.name | titlecase}}</span>\n                        <span *ngIf=\"!item?.developer?.name\" >{{'table.tr.td.NA' | translate}}</span>\n                    </td>\n                    <!-- dev phone & email -->\n                    <td *ngIf=\"parameter.count_flag==1 || parameter.count_flag==2 || parameter.count_flag==3\">\n                        <span *ngIf=\"item.dev_phone\">{{item?.dev_countrycode ? item.dev_countrycode : constant.dial_code}}-{{item?.dev_phone}}</span>\n                        <span *ngIf=\"!item.dev_phone\">{{'table.tr.td.NA' | translate}}</span>\n                        <br>\n                        <span *ngIf=\"item.dev_email\">{{item?.dev_email}}</span>\n                        <span *ngIf=\"!item.dev_email\">{{'table.tr.td.NA' | translate}}</span>\n                    </td>\n                    <td *ngIf=\"parameter.count_flag==4 || parameter.count_flag==5 || parameter.count_flag==6 || parameter.count_flag==7\">\n                        <span *ngIf=\"item?.developer?.phone\">{{item?.developer?.dial_code ? item?.developer?.dial_code : constant.dial_code}}-{{item?.developer?.phone}}</span>\n                        <span *ngIf=\"!item?.developer?.phone\">{{'table.tr.td.NA' | translate}}</span>\n                        <br>\n                        <span *ngIf=\"item?.developer?.email\">{{item?.developer?.email}}</span>\n                        <span *ngIf=\"!item?.developer?.email\">{{'table.tr.td.NA' | translate}}</span>\n                    </td>\n                    <!-- show collector name in case of 1,2,3 -->\n                    <td *ngIf=\"parameter.count_flag==1 || parameter.count_flag==2 || parameter.count_flag==3\">\n                        {{item?.collector?.name | titlecase}}\n                    </td>\n                    <td style=\"vertical-align:middle;\" *ngIf=\"parameter.count_flag==1 || parameter.count_flag==2 || parameter.count_flag==3\">\n                        <a title=\"{{'table.title.completed' | translate}}\" *ngIf=\"item.status==1\" style=\"cursor:auto;\" class=\"green-color fontW500\" href=\"javascript://\">Completed</a>\n                        <a style=\"cursor:auto;\" *ngIf=\"admin?.admin_acl['Data Collector Lead Management']?.can_update==0 || admin?.permissions?.can_data_collector==0\" class=\"green-color fontW500\" href=\"javascript://\">Mark Complete</a>\n                        <a title=\"{{'table.title.markComplete' | translate}}\" *ngIf=\"item.status==0 && (admin?.admin_acl['Data Collector Lead Management']?.can_update==1 || admin?.permissions?.can_data_collector==1)\" class=\"green-color fontW500\" (click)=\"changeStatus(item, 1)\" href=\"javascript://\">Mark Complete</a>\n                    </td>\n                    <!-- add project - use request details as template -->\n                    <td *ngIf=\"parameter.count_flag==1 || parameter.count_flag==2 || parameter.count_flag==3\">\n                        <button [disabled]=\"admin?.admin_acl['Data Collector Lead Management']?.can_update==0 || admin?.permissions?.can_data_collector==0\" routerLink=\"/dashboard/projects/edit-building-request/{{item.id}}\" title=\"{{'table.title.createProject' | translate}}\" class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></button>\n                    </td>\n                    <!-- edit project in case of 4,5,6,7 -->\n                    <td *ngIf=\"parameter.count_flag==4 || parameter.count_flag==5 || parameter.count_flag==6 || parameter.count_flag==7\">\n                        <!-- unapprove => when status=2(pending), 1(approved) && not in draft-->\n                        <a style=\"display:none;\" #modalOpen data-toggle=\"modal\" data-target=\"#addNote\"></a>\n                        <button (click)=\"openCancellationModal(item, i)\" [disabled]=\"admin?.admin_acl['Data Collector Lead Management']?.can_update==0\" \n                        *ngIf=\"(item.status == 1 || item.status==2) && parameter.count_flag!=7\" class=\"action-icon\" title=\"{{'table.title.unapprove' | translate}}\"><img src=\"assets/img/ic_disapprove.png\" alt=\"img\"></button>\n                        <!-- approve => when status=2(pending), 4(rejected) && not in draft-->\n                        <button [disabled]=\"admin?.admin_acl['Data Collector Lead Management']?.can_update==0\" \n                        *ngIf=\"(item.status == 2 || item.status == 4) && parameter.count_flag!=7\" (click)=\"approveProject(item, 1);\" class=\"action-icon\" title=\"{{'table.title.approve' | translate}}\"><img src=\"assets/img/tick.png\" alt=\"img\"></button>\n                        <button [disabled]=\"admin?.admin_acl['Data Collector Lead Management']?.can_update==0 || admin?.permissions?.can_data_collector==0\" routerLink=\"/dashboard/projects/edit-project/{{item.id}}\" title=\"{{'table.title.editDetails' | translate}}\" class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></button>\n                    </td>\n                 </tr>\n              </table>\n                <div class=\"padding20 center\" *ngIf=\"parameter.noResultFound\">\n                    <img src=\"assets/img/404-error.png\">\n                </div>\n           </div>\n        </div>\n     </div>\n\n    \n    <div class=\"btn-cont marginT15\" *ngIf=\"parameter.total\">\n        <div class=\"row\">\n            <div class=\"col-6\">\n                <div class=\"title-group\">\n                        <p>{{'table.pagination.showing' | translate}} {{items?.length}} {{'table.pagination.outof' | translate}} {{parameter.total}}</p>\n                </div>\n            </div>\n            <div class=\"col-6 text-right\">\n                <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n            </div>\n        </div>\n    </div>\n</div>\n\n\n<!-- Assignment model -->\n<a data-toggle=\"modal\" data-target=\"#assign-model\" #openAssignModel></a>\n<div class=\"modal\" id=\"assign-model\">\n        <div class=\"modal-dialog \">\n            <div class=\"modal-content notary-avail\">\n                <div class=\"modal-header popup-header\">\n                <h4 class=\"modal-title\">{{'leads.reAssignTo' | translate}}</h4>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #closeAssignModel>&times;</button>\n                </div>\n                <div class=\"modal-body\">\n                    <div class=\"row\">\n                        <div class=\"col-md-8 col-6\">\n                            <input style=\"max-width:200px\" list=\"amenities\" [(ngModel)]=\"assign.keyword\" (keyup.enter)=\"getAssignListing()\" class=\"form-control\" type=\"text\" name=\"keyword\" placeholder=\"{{'addForm.placeholder.search' | translate}}\">\n                        </div>\n                        <div class=\"col-md-4 col-6 btn-cont\">\n                            <a class=\"btn btn-primary pull-right\" href=\"javascript://\" (click)=\"assignNow()\">{{'leads.assign' | translate}}</a>\n                        </div>\n                    </div>\n                    <div class=\"spacer40\"></div>\n                    <div class=\"modal-table-data\" malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\">\n                        <table class=\"table\">\n                            <tr *ngFor=\"let item of assign.items\">\n                                <td *ngIf=\"item.is_blocked!=1\">\n                                    <div class=\"n-avail-profile\">\n                                    <img [src]=\"item.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\">\n                                    <div class=\"n-avail-info\">\n                                        <p class=\"p12\">{{item.name | titlecase}}</p>\n                                        <p class=\"p10\">{{'leads.phone' | translate}} : {{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}</p>\n                                    </div>\n                                    </div>\n                                </td>\n                                <td *ngIf=\"item.is_blocked!=1\">\n                                    <label class=\"cust-check-bx float-right\">\n                                        <input type=\"radio\" name=\"notary_id\" (click)=\"assignItem = item\">\n                                        <span class=\"checkmark\"></span>\n                                    </label>\n                                </td>\n                            </tr>\n                            <tr *ngIf=\"assign?.items?.length==0\">\n                                <p class=\"show-not-found\">{{'leads.noDataCollector' | translate}}</p>\n                            </tr>\n                        </table>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n\n\n<div class=\"modal animated\" id=\"addNote\">\n    <div class=\"modal-dialog fadeIndown\">\n        <div class=\"modal-content\">\n        <div class=\"modal-header modal-header-new\">\n            <h4 class=\"modal-title\">{{'leads.addReason' | translate}}</h4>\n            <button style=\"display: none;\" type=\"button\" class=\"close\" data-dismiss=\"modal\" #modalClose>&times;</button>\n            <button type=\"button\" class=\"close\" (click)=\"closeModal()\">&times;</button>\n        </div>\n    \n        <form class=\"form-horizontal form-model0P form-model-newP\" role=\"form\" ngNativeValidate #addForm=\"ngForm\" (ngSubmit)=\"rejectProject(4); addForm.reset();\">\n            <div class=\"modal-body modal-body-new\">\n            <div class=\"row\">\n                <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                    <div class=\"form-group\">\n                        <textarea rows=\"4\" required class=\"form-control note\" name=\"reason\" [(ngModel)]=\"reason\"></textarea>\n                    </div>\n                </div>\n                </div>\n                <div class=\"col-12\">\n                    <div class=\"btn-cont text-right\">\n                        <button type=\"submit\" [disabled]=\"!addForm.valid\" class=\"btn btn-primary\">{{'leads.add' | translate}}</button>\n                    </div>\n                </div>\n            </div>\n            </div>\n        </form>\n        </div>\n    </div>\n    </div>"

/***/ }),

/***/ "./src/app/layout/leads/data-collector/data-collector.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/layout/leads/data-collector/data-collector.component.ts ***!
  \*************************************************************************/
/*! exports provided: DataCollectorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataCollectorComponent", function() { return DataCollectorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var src_app_services_leads_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/leads.service */ "./src/app/services/leads.service.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var DataCollectorComponent = /** @class */ (function () {
    function DataCollectorComponent(admin, leadsService, constant, spinner, translate) {
        this.admin = admin;
        this.leadsService = leadsService;
        this.constant = constant;
        this.spinner = spinner;
        this.translate = translate;
        this.scrollbarOptions = { axis: 'y', theme: 'dark' };
        this.parameter = {};
        this.location = {};
        this.assign = {};
        // items: Array<Users> = [];
        this.items = [];
        this.today = new Date();
        this.users = [];
        this.initSelection = false;
        this.dash = {
            request_pending_total: 0,
            request_pending_admin: 0,
            request_pending_csr: 0,
            request_pending_user: 0,
            building_approved: 0,
            building_draft: 0,
            building_pending: 0,
            building_unapproved: 0
        };
        this.chartView = [];
    }
    DataCollectorComponent.prototype.ngOnInit = function () {
        this.locale = {
            firstDayOfWeek: 0,
            dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
            dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
            dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
            monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
            monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun',
                'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
            today: 'Hoy',
            clear: 'Clara',
            dateFormat: 'mm/dd/yy',
            weekHeader: 'Wk'
        };
        this.parameter.is_selected = false;
        this.parameter.keyword = '';
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        this.parameter.flag = this.leadsService.dataCollectorLeadsFlag ? this.leadsService.dataCollectorLeadsFlag : this.constant.flag;
        this.parameter.total = 0;
        this.parameter.count_flag = this.leadsService.dataCollectorLeadsCountFlag ?
            this.leadsService.dataCollectorLeadsCountFlag : this.constant.count_flag;
        this.getCountries();
        this.getListing();
        this.getCSRDashBoardData();
        Object.assign(this, this.chartView);
    };
    DataCollectorComponent.prototype.getCountries = function () {
        var _this = this;
        this.admin.postDataApi('getCountryLocality', {}).subscribe(function (r) {
            _this.location.countries = r['data'];
        });
    };
    DataCollectorComponent.prototype.onCountryChange = function (id) {
        this.parameter.country_id = id;
        this.location.states = [];
        this.parameter.state_id = '0';
        this.location.cities = [];
        this.parameter.city_id = '0';
        this.location.localities = [];
        this.parameter.locality_id = '0';
        if (!id || id === '0') {
            // this.parameter.state_id = '0';
            return false;
        }
        this.parameter.country_id = id;
        var selectedCountry = this.location.countries.filter(function (x) { return x.id.toString() === id; });
        this.location.states = selectedCountry[0].states;
    };
    DataCollectorComponent.prototype.onStateChange = function (id) {
        this.location.cities = [];
        this.parameter.city_id = '0';
        this.location.localities = [];
        this.parameter.locality_id = '0';
        if (!id || id === '0') {
            // this.parameter.city_id = '0';
            return false;
        }
        this.parameter.state_id = id;
        var selectedState = this.location.states.filter(function (x) { return x.id.toString() === id; });
        this.location.cities = selectedState[0].cities;
    };
    DataCollectorComponent.prototype.onCityChange = function (id) {
        this.location.localities = [];
        this.parameter.locality_id = '0';
        if (!id || id === '0') {
            // this.parameter.locality_id = '0';
            return false;
        }
        this.parameter.city_id = id;
        var selectedCountry = this.location.cities.filter(function (x) { return x.id.toString() === id; });
        this.location.localities = selectedCountry[0].localities;
    };
    DataCollectorComponent.prototype.onLocalityChange = function (id) {
        if (!id || id === '0') {
            return false;
        }
        this.parameter.locality_id = id;
        // this.getCsrListing();
    };
    DataCollectorComponent.prototype.changeFlag = function (flag) {
        this.parameter.flag = flag;
        this.leadsService.dataCollectorLeadsFlag = flag;
        this.parameter.count_flag = 1;
        this.resetDates();
        this.getListing();
        this.getCSRDashBoardData();
    };
    DataCollectorComponent.prototype.changeFilter = function (key, value) {
        this.parameter[key] = value;
        this.getListing();
    };
    DataCollectorComponent.prototype.changeCountFlag = function (flag) {
        this.parameter.count_flag = flag;
        this.leadsService.dataCollectorLeadsCountFlag = flag;
        this.getListing();
    };
    DataCollectorComponent.prototype.changeCountFlagForBuilding = function (flag) {
        this.parameter.count_flag = flag;
        this.getListingForBuildings();
    };
    DataCollectorComponent.prototype.getCsrListing = function () {
        var _this = this;
        this.initSelection = true;
        this.users = [];
        var input = new FormData();
        if (this.parameter.keyword) {
            input.append('keyword', this.parameter.keyword);
        }
        // if (this.parameter.country_id && this.parameter.country_id !== '-1') {
        //   input.append('countries', JSON.stringify([this.parameter.country_id]));
        // }
        // if (this.parameter.state_id && this.parameter.state_id !== '-1') {
        //   input.append('states', JSON.stringify([this.parameter.state_id]));
        // }
        // if (this.parameter.city_id && this.parameter.city_id !== '-1') {
        //   input.append('cities', JSON.stringify([this.parameter.city_id]));
        // }
        // if (this.parameter.locality_id && this.parameter.locality_id !== '-1') {
        //   input.append('localities', JSON.stringify([this.parameter.locality_id]));
        // }
        this.admin.postDataApi('getDataCollectors', input).subscribe(function (success) {
            _this.users = success.data;
        });
    };
    DataCollectorComponent.prototype.resetFilters = function () {
        this.location.countries = JSON.parse(JSON.stringify(this.location.countries));
        this.onCountryChange('0');
        this.parameter.is_selected = false;
        this.parameter.page = this.constant.p;
        this.parameter.flag = 2;
        this.parameter.total = 0;
        // this.selectedUser = '';
        this.parameter.keyword = '';
        this.parameter.count_flag = 1;
        this.resetDates();
        this.getListing();
        this.getCSRDashBoardData();
    };
    DataCollectorComponent.prototype.resetDates = function () {
        this.parameter.min = '';
        this.parameter.max = '';
    };
    DataCollectorComponent.prototype.closeCsrListing = function () {
        var _this = this;
        setTimeout(function () {
            _this.users = [];
        }, 200);
    };
    DataCollectorComponent.prototype.selectCsrUser = function (user) {
        this.selectedUser = user;
        this.users = [];
        this.parameter.keyword = '';
        this.initSelection = false;
        this.getListing();
        this.getCSRDashBoardData();
    };
    DataCollectorComponent.prototype.removeCsrUser = function () {
        this.selectedUser = '';
        this.parameter.keyword = '';
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        // this.parameter.flag = 2;
        this.parameter.total = 0;
        this.parameter.count_flag = 1;
        this.getListing();
        this.getCSRDashBoardData();
    };
    DataCollectorComponent.prototype.getCSRDashBoardData = function () {
        var _this = this;
        // const input = new FormData();
        // if (this.selectedUser) {
        //   input.append('assignee_id', this.selectedUser.id);
        // }
        // if (this.parameter.flag) {
        //   input.append('flag', this.parameter.flag.toString());
        // }
        var input = JSON.parse(JSON.stringify(this.parameter));
        if (this.parameter.min) {
            input.min = moment__WEBPACK_IMPORTED_MODULE_1__(this.parameter.min).format('YYYY-MM-DD');
        }
        else {
            delete input.min;
        }
        if (this.parameter.max) {
            input.max = moment__WEBPACK_IMPORTED_MODULE_1__(this.parameter.max).format('YYYY-MM-DD');
        }
        else {
            delete input.max;
        }
        if (this.selectedUser) {
            input.assignee_id = this.selectedUser.id;
        }
        else if (this.parameter.assignee_id) {
            input.assignee_id = this.parameter.assignee_id;
        }
        this.admin.postDataApi('leads/data-collector-dash-count', input).subscribe(function (r) {
            _this.dash = r.data;
            _this.chartView = [
                {
                    'name': _this.translate.instant('leads.infoFilled'),
                    'value': parseInt(_this.dash.request_pending_admin, 10)
                },
                {
                    'name': _this.translate.instant('leads.withAgentAssigned'),
                    'value': parseInt(_this.dash.request_pending_csr, 10)
                },
                {
                    'name': _this.translate.instant('leads.withoutAgentAssigned'),
                    'value': parseInt(_this.dash.request_pending_user, 10)
                }
            ];
        });
    };
    DataCollectorComponent.prototype.getListing = function () {
        var _this = this;
        this.items = [];
        this.parameter.noResultFound = false;
        var input = JSON.parse(JSON.stringify(this.parameter));
        if (this.parameter.min) {
            input.min = moment__WEBPACK_IMPORTED_MODULE_1__(this.parameter.min).format('YYYY-MM-DD');
        }
        else {
            delete input.min;
        }
        if (this.parameter.max) {
            input.max = moment__WEBPACK_IMPORTED_MODULE_1__(this.parameter.max).format('YYYY-MM-DD');
        }
        else {
            delete input.max;
        }
        if (this.selectedUser) {
            input.assignee_id = this.selectedUser.id;
        }
        this.spinner.show();
        this.admin.postDataApi('leads/data-collector', input).subscribe(function (success) {
            _this.spinner.hide();
            _this.items = success.data;
            if (_this.items.length <= 0) {
                _this.parameter.noResultFound = true;
            }
            _this.parameter.total = success.total_count;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    DataCollectorComponent.prototype.getListingForBuildings = function () {
        var _this = this;
        this.items = [];
        this.parameter.noResultFound = false;
        var input = JSON.parse(JSON.stringify(this.parameter));
        if (this.parameter.min) {
            input.min = moment__WEBPACK_IMPORTED_MODULE_1__(this.parameter.min).format('YYYY-MM-DD');
        }
        else {
            delete input.min;
        }
        if (this.parameter.max) {
            input.max = moment__WEBPACK_IMPORTED_MODULE_1__(this.parameter.max).format('YYYY-MM-DD');
        }
        else {
            delete input.max;
        }
        if (this.selectedUser) {
            input.assignee_id = this.selectedUser.id;
        }
        this.spinner.show();
        this.admin.postDataApi('leads/data-collector-buildings', input).subscribe(function (success) {
            _this.spinner.hide();
            _this.items = success.data;
            if (_this.items.length <= 0) {
                _this.parameter.noResultFound = true;
            }
            _this.parameter.total = success.total_count;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    DataCollectorComponent.prototype.getPage = function (page) {
        this.parameter.page = page;
        this.getListing();
    };
    DataCollectorComponent.prototype.sort_by = function (sort_by_flag) {
        if (this.parameter.sort_by_flag !== sort_by_flag) {
            this.parameter.sort_by_flag = sort_by_flag;
            this.parameter.sort_by_order = 0;
        }
        else {
            this.parameter.sort_by_order = this.parameter.sort_by_order ? 0 : 1;
        }
        this.getListing();
    };
    DataCollectorComponent.prototype.changeStatus = function (item) {
        var _this = this;
        this.spinner.show();
        this.admin.postDataApi('leads/markBuildingRequestComplete', { id: item.id }).subscribe(function (r) {
            _this.spinner.hide();
            item.status = 1;
        }, function (error) {
            _this.spinner.hide();
            swal(_this.translate.instant('swal.error'), error.error.message, 'error');
        });
    };
    DataCollectorComponent.prototype.selectAll = function (is_selected) {
        var _this = this;
        this.parameter.is_selected = !is_selected;
        this.items.forEach(function (item) {
            item.selected = _this.parameter.is_selected;
        });
    };
    DataCollectorComponent.prototype.bulkAssign = function () {
        // this.assign.keyword = '';
        var leads_ids = this.items.filter(function (x) { return x.selected; }).map(function (y) { return y.id; });
        if (leads_ids.length === 0) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseAtleast1Lead'), 'error');
            return false;
        }
        if (!this.assign.items) {
            this.getAssignListing();
        }
        this.openAssignModel.nativeElement.click();
    };
    DataCollectorComponent.prototype.getAssignListing = function () {
        var _this = this;
        // this.assign.items = [];
        var input = {
            keyword: this.assign.keyword
        };
        this.spinner.show();
        this.admin.postDataApi('getDataCollectors ', input).subscribe(function (success) {
            _this.spinner.hide();
            _this.assign.items = success.data;
        });
    };
    DataCollectorComponent.prototype.assignNow = function () {
        var _this = this;
        var leads_ids = this.items.filter(function (x) { return x.selected; }).map(function (y) { return y.id; });
        var input = {
            data_collector_id: this.assignItem.id,
            leads: leads_ids
        };
        this.spinner.show();
        this.admin.postDataApi('leads/bulkAssignCollector', input).subscribe(function (r) {
            _this.spinner.hide();
            swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.assignedSuccessfully'), 'success');
            _this.closeAssignModel.nativeElement.click();
            _this.getListing();
        }, function (error) {
            _this.spinner.hide();
            _this.closeAssignModel.nativeElement.click();
            swal(_this.translate.instant('swal.error'), error.error.message, 'error');
        });
    };
    DataCollectorComponent.prototype.openCancellationModal = function (item, index) {
        this.parameter.building_id = item.id;
        this.parameter.index = index;
        this.modalOpen.nativeElement.click();
    };
    DataCollectorComponent.prototype.approveProject = function (item, status) {
        var _this = this;
        if (item.is_completed !== 1) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.cannotApproveBuilding'), 'error');
            return false;
        }
        item.status = status;
        this.admin.postDataApi('approveProject', { building_id: item.id }).subscribe(function (r) {
            _this.getCSRDashBoardData();
            swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.projectApprovedSuccessfully'), 'success');
        }, function (error) {
            swal(_this.translate.instant('swal.error'), error.error.message, 'error');
        });
    };
    DataCollectorComponent.prototype.rejectProject = function (status) {
        var _this = this;
        this.items[this.parameter.index].status = status;
        this.admin.postDataApi('rejectProject', { building_id: this.parameter.building_id, reason: this.reason }).subscribe(function (r) {
            swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.projectUnapprovedSuccessfully'), 'success');
            _this.getCSRDashBoardData();
            _this.closeModal();
        }, function (error) {
            swal(_this.translate.instant('swal.error'), error.error.message, 'error');
        });
    };
    DataCollectorComponent.prototype.closeModal = function () {
        this.modalClose.nativeElement.click();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalOpen'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], DataCollectorComponent.prototype, "modalOpen", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], DataCollectorComponent.prototype, "modalClose", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('openAssignModel'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], DataCollectorComponent.prototype, "openAssignModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('closeAssignModel'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], DataCollectorComponent.prototype, "closeAssignModel", void 0);
    DataCollectorComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-data-collector',
            template: __webpack_require__(/*! ./data-collector.component.html */ "./src/app/layout/leads/data-collector/data-collector.component.html"),
            styles: [__webpack_require__(/*! ./data-collector.component.css */ "./src/app/layout/leads/data-collector/data-collector.component.css")],
            providers: [src_app_common_constants__WEBPACK_IMPORTED_MODULE_3__["Constant"]]
        }),
        __metadata("design:paramtypes", [src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_4__["AdminService"],
            src_app_services_leads_service__WEBPACK_IMPORTED_MODULE_5__["LeadsService"],
            src_app_common_constants__WEBPACK_IMPORTED_MODULE_3__["Constant"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_2__["NgxSpinnerService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__["TranslateService"]])
    ], DataCollectorComponent);
    return DataCollectorComponent;
}());



/***/ }),

/***/ "./src/app/layout/leads/inhouse-broker/inhouse-broker-detail/inhouse-broker-detail.component.css":
/*!*******************************************************************************************************!*\
  !*** ./src/app/layout/leads/inhouse-broker/inhouse-broker-detail/inhouse-broker-detail.component.css ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9sZWFkcy9pbmhvdXNlLWJyb2tlci9pbmhvdXNlLWJyb2tlci1kZXRhaWwvaW5ob3VzZS1icm9rZXItZGV0YWlsLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/layout/leads/inhouse-broker/inhouse-broker-detail/inhouse-broker-detail.component.html":
/*!********************************************************************************************************!*\
  !*** ./src/app/layout/leads/inhouse-broker/inhouse-broker-detail/inhouse-broker-detail.component.html ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container-fluid\">\n  <div class=\"white-bg padding15\">\n     <div class=\"row\">\n      <div class=\"col-lg-3 col-md-12 col-sm-12 col-12\">\n         <div class=\"df-profile\">\n            <a routerLink=\"../\"><i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i></a>\n            <img [src]=\"leadData?.user?.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\">\n            <div class=\"df-info\">\n                <p class=\"p14 text-ellipsis120\">{{leadData?.user?.name ? leadData?.user?.name : leadData?.name}}</p>\n                <p class=\"p12\">\n                    {{leadData?.user?.dial_code ? leadData?.user?.dial_code : leadData?.dial_code}}-{{leadData?.user?.phone ? leadData?.user?.phone : leadData?.phone}}\n                </p>\n            </div>\n        </div>\n      </div>\n      <div class=\"col-lg-7 col-md-12 col-sm-6 col-12\">\n          <div class=\"profile-list\">\n          <ul>\n              <li>\n                  <div class=\"df-info\">\n                      <p class=\"p14 marginB0\" *ngIf=\"leadData?.admin\">{{leadData.admin.name | titlecase}}</p>\n                      <p class=\"p12\">{{'leadDetails.CSRBuyer' | translate}}</p>\n                  </div>\n              </li>\n              <li>\n                  <div class=\"df-info\" *ngIf=\"leadData?.broker\">\n                      <p class=\"p14 marginB0\">{{leadData.broker.name | titlecase}}</p>\n                      <p class=\"p12\">{{leadData?.broker?.is_external_agent==1 ? ('leadDetails.outsideAgent' | translate) : ('leadDetails.inhouseAgent' | translate)}}</p>\n                  </div>\n              </li>\n              <li>\n                  <div class=\"df-info\" *ngIf=\"leadData?.closer\">\n                      <p class=\"p14 marginB0\">{{leadData?.closer?.name | titlecase}}</p>\n                      <p class=\"p12\">{{'leadDetails.CSRClosure' | translate}}</p>\n                  </div>\n              </li>\n          </ul>\n          </div>\n      </div>\n      \n\n      <!-- <div class=\"col-lg-4 col-md-12 col-sm-12 col-12\">\n            <div class=\"row\">\n                <div class=\"col-sm-7 col-6 btn-cont\">\n                    <a *ngIf=\"is_deal_finalised\" style=\"cursor: auto;\" class=\"btn btn-fourth\" href=\"javascript://\">Deal Finalized</a>\n                </div>\n                <div class=\"col-sm-5 col-6 btn-cont\">\n                    <a (click)=\"getInvoice()\" class=\"btn btn-fourth\" href=\"javascript://\">Invoice</a>\n                </div>\n            </div>\n        </div> -->\n    \n\n    <div class=\"col-lg-2 col-md-12 col-sm-12 col-12\">\n        <div class=\"row\">\n            <div class=\"col-sm-12 col-6 btn-cont\">\n                <a (click)=\"getInvoice()\" class=\"btn btn-fourth\" href=\"javascript://\">{{'leadDetails.invoice' | translate}}</a>\n                <!-- <button type=\"button\" class=\"btn btn-primary-new dropdown-toggle\" data-toggle=\"dropdown\">\n                 Action\n               </button>\n               <div class=\"dropdown-menu dropdown-menu-right\">\n                 <a *ngIf=\"is_deal_finalised\" (click)=\"getInvoice()\" class=\"dropdown-item\" href=\"javascript://\">Download Invoice</a>\n               </div> -->\n            </div>\n        </div>\n    </div>\n\n     </div>\n  </div>\n  <div class=\"spacer30\"></div>\n  <div class=\"row\">\n     <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\">\n        <div class=\"white-bg padding30\">\n           <div class=\"row\">\n              <div class=\"col-md-6\">\n                 <h6>{{'leadDetails.details' | translate}}</h6>\n              </div>\n              <div class=\"col-md-6\">\n                <h6 class=\"pull-right greenh6\" *ngIf=\"is_deal_finalised\">{{'leadDetails.dealFinalized' | translate}}</h6>\n                    <!-- <div class=\"btn-cont\">\n                        <a *ngIf=\"is_deal_finalised\" style=\"cursor: auto;\" class=\"btn btn-fourth\" href=\"javascript://\">Deal Finalized</a>\n                    </div> -->\n                 <!-- <div class=\"edit text-right\"><a href=\"javascript://\">Edit</a></div> -->\n              </div>\n           </div>\n           <div class=\"details-table\">\n             <table class=\"table\">\n                <tbody><tr>\n                   <td style=\"padding-left:0\"><label>{{'leadDetails.fullName' | translate}}</label></td>\n                   <td *ngIf=\"leadData?.name\">{{leadData.user.name | titlecase}}</td>\n                </tr>\n                <tr>\n                   <td style=\"padding-left:0\"><label>{{'leadDetails.contactNumber' | translate}}</label></td>\n                   <td *ngIf=\"leadData?.phone\">{{leadData.user.dial_code ? leadData.user.dial_code : constant.dial_code}}-{{leadData.phone}}</td>\n                </tr>\n                <tr>\n                   <td style=\"padding-left:0\"><label>{{'leadDetails.emailAddress' | translate}}</label></td>\n                   <td *ngIf=\"leadData?.email\">{{leadData.user.email}}</td>\n                </tr>\n                <tr>\n                   <td style=\"padding-left:0\"><label>{{'leadDetails.interestedIn' | translate}}</label></td>\n                   <td *ngIf=\"leadData?.configuration\">\n                     <span *ngFor=\"let conf of leadData.configuration; let ii=index\">\n                        <app-property-configuration *ngIf=\"conf\" [configuration]=\"conf\"></app-property-configuration>\n                        <span *ngIf=\"ii<leadData?.configuration?.length-1\"> | </span> <br>\n                     </span>\n                     <span *ngIf=\"leadData.configuration?.length==0\">{{'leadDetails.NA' | translate}}</span>\n                   </td>\n                </tr>\n                <tr>\n                   <td style=\"padding-left:0\"><label>{{'leadDetails.favoriteProperties' | translate}}</label></td>\n                   <td>{{parameter.fav_properties_count}} \n                      <a style=\"display: none;\" data-toggle=\"modal\" #showPropertyModal data-target=\"#view-fav-property\" class=\"view-all\" href=\"javascript://\">View All</a>\n                      <a *ngIf=\"parameter.fav_properties_count\" class=\"view-all\" href=\"javascript://\" (click)=\"viewFavProperties()\">{{'leadDetails.viewAll' | translate}}</a>\n                    </td>\n                </tr>\n\n                <!-- Meeting Schedule -->\n                <tr *ngIf=\"leadData?.sale_rent==1\">\n                    <td  style=\"padding-left:0\"><label><strong>{{'leadDetails.meetingSchedule' | translate}}</strong></label></td>\n                    <td colspan=\"2\">\n                        <p style=\"display:none;\" class=\"date\" #modalOpen data-toggle=\"modal\" data-target=\"#set_appointment\">Click to Schedule</p>\n                        <p class=\"date cursor-pointer\" (click)=\"openModal()\">{{'leadDetails.clickToSchedule' | translate}}</p>\n                        <p *ngFor=\"let na of data; let m=index\" class=\"date\">\n                            <span *ngIf=\"m<2\">{{na.appointment_date | moment}}</span>\n                        </p>\n                        <span class=\"read-more\" *ngIf=\"data.length>2\" data-toggle=\"modal\" data-target=\"#get-availability1\">{{'leadDetails.viewAll' | translate}}</span>\n                    </td>\n                    <!-- <ng-template #noAvailability1>\n                        <td colspan=\"2\"><p>No meeting scheduled by you.</p></td>\n                    </ng-template> -->\n                </tr>\n\n                <!-- <tr *ngIf=\"leadData?.sale_rent==1\">\n                    <td  style=\"padding-left:0\"><label><strong>Meeting Schedule</strong></label></td>\n                    <td colspan=\"2\" class=\"cursor-pointer\">\n                        <p style=\"display:none;\" class=\"date\" #modalOpen data-toggle=\"modal\" data-target=\"#set_appointment\">Click to Schedule</p>\n                        <p class=\"date\" (click)=\"openModal()\">Click to Schedule</p>\n                    </td>\n                </tr> -->\n              </tbody>\n             </table>\n           </div>\n        </div>\n\n        <div class=\"spacer30\"></div>\n        <div>\n            <div class=\"white-bg move-below\">\n                <div class=\"page-title-3 marginB0\">\n                    <h4><i><img src=\"assets/img/chat-icon.png\" alt=\"img\"></i> {{'leadDetails.chat' | translate}}</h4>\n                </div>\n                <div class=\"cust-tabs-4\">\n                    <app-chat-tabs *ngIf=\"leadData?.user\" [lead_id]=\"parameter.lead_id\" [sent_as]=\"parameter.sent_as\"\n                        [user_id]=\"parameter.user_id\" [admin_id]=\"parameter.admin_id\" [leadData]=\"leadData\">\n                    </app-chat-tabs>\n                </div>\n            </div>\n        </div>\n\n     </div>\n     <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\">\n        <!-- chat with developer -->\n        <div class=\"white-bg chat-with-developer padding15\">\n           <i class=\"float-left marginR15\"><img src=\"assets/img/chat-icon.png\" alt=\"img\"></i>\n           <a href=\"javascript://\" routerLink=\"/dashboard/leads/chat-list/1/{{parameter.lead_id}}\">{{'leadDetails.chatWithSeller' | translate}} <i class=\"fa fa-angle-right\"></i></a>\n        </div>\n\n        <!-- chat with csr seller -->\n        <div class=\"white-bg chat-with-developer padding15\">\n            <i class=\"float-left marginR15\"><img src=\"assets/img/chat-icon.png\" alt=\"img\"></i>\n            <a href=\"javascript://\" routerLink=\"/dashboard/leads/chat-list/2/{{parameter.lead_id}}\">{{'leadDetails.chatWithCSRSeller' | translate}}<i class=\"fa fa-angle-right\"></i></a>\n        </div>\n        \n        <!-- <app-fill-information [sent_as]=\"parameter.sent_as\" [fillInfo]=\"fillInfo\" [lead_id]=\"parameter.lead_id\"></app-fill-information> -->\n        <app-fill-information [sent_as]=\"parameter.sent_as\" [leadData]=\"leadData\"\n                [selectedAmenities]=\"selectedAmenities\" [allAmenities]=\"allAmenities\"\n                [lead_id]=\"parameter.lead_id\" [showOtherTextBox]=\"showOtherTextBox\">\n        </app-fill-information>\n        \n        <app-notes [sent_as]=\"parameter.sent_as\" [lead_id]=\"parameter.lead_id\"></app-notes>\n\n        <!-- <div class=\"spacer30\"></div>\n        <div class=\"white-bg padding15\">\n            <p class=\"p16 marginB0\">Chat with CSR Buyer</p>\n        </div>\n        <hr class=\"margin0\">\n        <div *ngIf=\"leadData?.user\">\n            <app-chat [lead_id]=\"parameter.lead_id\" [sent_as]=\"parameter.sent_as\" [user_id]=\"parameter.user_id\" [admin_id]=\"parameter.admin_id\"></app-chat>\n        </div> -->\n     </div>\n  </div>\n\n  <!-- Interested Properties start -->\n  <!-- <app-interested-property (deal_finalised_success)=\"dealFinalisedReceived(v)\" [is_deal_finalised]=\"is_deal_finalised\" [selected_properties]=\"leadData?.selected_properties\" [lead_id]=\"parameter.lead_id\" [interested_properties]=\"parameter.interested_properties\" [sent_as]=\"parameter.sent_as\"></app-interested-property> -->\n  <app-interested-property [is_deal_finalised]=\"is_deal_finalised\" [selected_properties]=\"leadData?.selected_properties\" [lead_id]=\"parameter.lead_id\" [interested_properties]=\"parameter.interested_properties\" [sent_as]=\"parameter.sent_as\"></app-interested-property>\n  <!-- Interested Properties end -->\n\n  <!-- viewed property or projects start -->\n  <app-viewed-property [user_id]=\"leadData?.user_id\" [viewed_properties]=\"parameter.viewed_properties\"></app-viewed-property>\n  <!-- viewed property or projects end -->\n\n  <!-- viewed projects start -->\n  <app-viewed-projects [user_id]=\"leadData?.user_id\" [viewed_projects]=\"parameter.viewed_projects\"></app-viewed-projects>\n  <!-- viewed projects end -->\n</div>\n\n\n<!-- show fav properties -->\n<div class=\"modal\" id=\"view-fav-property\">\n    <div class=\"modal-dialog  modal-lg\">\n        <div class=\"modal-content\">\n        <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n        </div>\n        <div class=\"modal-body\">\n            <h3>{{'leadDetails.favoriteProperties' | translate}}</h3>\n            <hr>\n            <pagination-controls id=\"page2\" class=\"my-pagination\" (pageChange)=\"getPage2($event)\"></pagination-controls>\n    \n            <div class=\"scrollbox fav-prop\" malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\">\n            <div class=\"row\">\n                <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\"\n                *ngFor=\"let x of parameter.favorites| paginate: { id: 'page2', itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page2, totalItems: parameter.total2 }; let in=index\">\n                <div class=\"project-des-bx white-bg-2\">\n                    <div class=\"price\" *ngIf=\"x\">\n                    <p class=\"p10\">{{x.for_sale==1 ? ('leadDetails.buy' | translate) : ('leadDetails.rent' | translate)}}</p>\n                    </div>\n                    <div class=\"fig-block\">\n                    <img [src]=\"x.image| img:'thumb'\" onerror='src=\"assets/img/bank.png\"' alt=\"img\">\n                    </div>\n                    <div class=\"project-des-content\">\n                        <small title=\"{{'table.title.apartment' | translate}}\">{{x?.name}}</small>\n                    <a title=\"{{'table.title.building' | translate}}\" routerLink=\"/dashboard/properties/details/{{x?.id}}\">\n                        <h5>{{x?.building?.name.slice(0, 15)}}</h5>\n                    </a>\n                    <p class=\"p12\">{{x.building.address.slice(0, 40)}}</p>\n                    <p class=\"p13\" *ngIf=\"x\">\n                        <app-property-configuration *ngIf=\"x.configuration\" [configuration]=\"x.configuration\"></app-property-configuration>\n                        <span>&middot; {{x.property_type.name}}</span>\n                    </p>\n                    <p class=\"p13\">\n                        {{x.min_price | price}}\n                    </p>\n                    </div>\n                </div>\n                </div>\n            </div>\n            </div>\n        </div>\n        </div>\n    </div>\n</div>\n\n\n<!-- add inhouse user modal -->\n<div class=\"modal animated\" id=\"set_appointment\">\n    <!-- <div class=\"modal-dialog fadeIndown\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header modal-header-new\">\n                <h4 class=\"modal-title\">Schedule Appointment</h4>\n                <button type=\"button\" style=\"display: none;\" class=\"close\" data-dismiss=\"modal\" #modalClose>&times;</button>\n                <button type=\"button\" class=\"close\" (click)=\"closeModal()\">&times;</button>\n            </div>\n    \n            <form class=\"form-horizontal form-model0P\" role=\"form\" ngNativeValidate #addForm=\"ngForm\" (ngSubmit)=\"add()\">\n            <div class=\"modal-body modal-body-new\">\n                <div class=\"row\">\n                    <div class=\"col-10\">\n                        <p-calendar title=\"Click to add\" name=\"app\" [(ngModel)]=\"appointment.appointment_date\" [minDate]=\"today\" showButtonBar=\"true\" showTime=\"true\" hourFormat=\"12\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2040\"></p-calendar>\n                    </div>\n                    <div class=\"col-2\">\n                        <div class=\"form-group-2\">\n                            <a *ngIf=\"!appointment.id && appointment.appointment_date\" class=\"green-color fontW500\" (click)=\"add()\" href=\"javascript://\">Save</a>\n                            <a *ngIf=\"appointment.id\" class=\"green-color fontW500\" (click)=\"add()\" href=\"javascript://\">Edit</a>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            </form>\n        </div>\n    </div> -->\n    <div class=\"modal-dialog fadeIndown\">\n        <div class=\"modal-dialog fadeIndown\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header modal-header-new\">\n                        <h4 class=\"modal-title\">{{'leadDetails.scheduleMeeting' | translate}}</h4>\n                    <button type=\"button\" style=\"display: none;\" class=\"close\" data-dismiss=\"modal\" #modalClose>&times;</button>\n                    <button type=\"button\" class=\"close\" (click)=\"closeModal()\">&times;</button>\n                </div>\n        \n                <form class=\"form-horizontal form-model0P\" role=\"form\" ngNativeValidate #addForm=\"ngForm\" (ngSubmit)=\"add()\">\n                <div class=\"modal-body padding0\">\n                    <div class=\"row\">\n                        <div class=\"col-8\">\n                            <label>{{'leadDetails.chooseDateTime' | translate}}</label>\n                            <p-calendar [locale]=\"locale\" title=\"{{'table.title.clickToAdd' | translate}}\" name=\"app\" [(ngModel)]=\"date\" [minDate]=\"today\" showButtonBar=\"true\" showTime=\"true\" hourFormat=\"12\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2040\"></p-calendar>\n                        </div>\n                        <div class=\"col-2\">\n                            <div class=\"form-group-2\">\n                                <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n                                <a class=\"green-color fontW500\" href=\"javascript://\" (click)=\"addDateTime()\">{{'leadDetails.add' | translate}}</a>\n                            </div>\n                        </div>\n                    </div>\n                    <!-- <div class=\"row\" *ngFor=\"let d of data; let j=index\">\n                        <div class=\"col-8\">\n                            <label class=\"notary-ava\">{{d.appointment_date | moment}}</label>\n                        </div>\n                        <div class=\"col-2\">\n                            <a class=\"green-color fontW500\" (click)=\"deleteAppointment(d.id, j)\" href=\"javascript://\">\n                                Remove\n                            </a>\n                        </div>\n                    </div> -->\n                    <div class=\"row\" *ngFor=\"let a of appointment.appointment_date_array; let i=index\">\n                        <div class=\"col-8\">\n                            <label class=\"notary-ava\">{{a|date:'h:mm a'|lowercase}}, {{a|date: 'MMM d y'}}</label>\n                        </div>\n                        <div class=\"col-2\">\n                            <a class=\"green-color fontW500\" (click)=\"removeAppointment(i)\" href=\"javascript://\">\n                                {{'leadDetails.remove' | translate}}\n                            </a>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-8\"></div>\n                        <div class=\"col-2\">\n                            <div class=\"btn-cont text-right\">\n                                <button type=\"submit\" class=\"btn btn-primary-new\">{{'leadDetails.save' | translate}}</button>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                </form>\n        \n            </div>\n        </div>\n    </div>\n</div>\n\n\n<div class=\"modal animated\" id=\"get-availability1\">\n    <div class=\"modal-dialog fadeIndown\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header modal-header-new\">\n                <h4 class=\"modal-title\">{{'leadDetails.chooseDateTime' | translate}}</h4>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #modalClose>&times;</button>\n                <!-- <button type=\"button\" class=\"close\" (click)=\"closeModal()\">&times;</button> -->\n            </div>\n    \n            <div class=\"modal-body modal-body-new\">\n                <div class=\"row\">\n                    <div class=\"col-6\" *ngFor=\"let d of data; let j=index\">\n                        <label class=\"notary-ava\">{{d.appointment_date | moment}}</label>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/layout/leads/inhouse-broker/inhouse-broker-detail/inhouse-broker-detail.component.ts":
/*!******************************************************************************************************!*\
  !*** ./src/app/layout/leads/inhouse-broker/inhouse-broker-detail/inhouse-broker-detail.component.ts ***!
  \******************************************************************************************************/
/*! exports provided: InhouseBrokerDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InhouseBrokerDetailComponent", function() { return InhouseBrokerDetailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var src_app_models_leads_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/models/leads.model */ "./src/app/models/leads.model.ts");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var InhouseBrokerDetailComponent = /** @class */ (function () {
    function InhouseBrokerDetailComponent(route, admin, constant, http, appointment, spinner, translate) {
        var _this = this;
        this.route = route;
        this.admin = admin;
        this.constant = constant;
        this.http = http;
        this.appointment = appointment;
        this.spinner = spinner;
        this.translate = translate;
        this.allAmenities = [];
        this.selectedAmenities = [];
        this.data = [];
        this.parameter = {};
        this.selected_prop_ids = [];
        this.today = new Date();
        this.scrollbarOptions = { axis: 'y', theme: 'dark' };
        this.admin.loginData$.subscribe(function (success) {
            _this.parameter.admin_id = success['id'];
        });
    }
    InhouseBrokerDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.locale = {
            firstDayOfWeek: 0,
            dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
            dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
            dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
            monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
            monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun',
                'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
            today: 'Hoy',
            clear: 'Clara',
            dateFormat: 'mm/dd/yy',
            weekHeader: 'Wk'
        };
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page2 = this.constant.p;
        this.parameter.total2 = 0;
        // Initialising
        this.leadData = new src_app_models_leads_model__WEBPACK_IMPORTED_MODULE_6__["Leads"]();
        this.leadData.prefs = new src_app_models_leads_model__WEBPACK_IMPORTED_MODULE_6__["Prefs"]();
        this.parameter.sent_as = this.constant.userType.inhouse_broker;
        this.route.params.subscribe(function (params) {
            _this.parameter.lead_id = params.id;
            _this.spinner.show();
            _this.admin.postDataApi('leads/details', { lead_id: _this.parameter.lead_id, sent_as: _this.parameter.sent_as }).subscribe(function (r) {
                _this.spinner.hide();
                _this.leadData = r.data.lead;
                _this.setFillInformationData(_this.leadData);
                if (r.data.lead.appointments.length !== 0) {
                    // this.appointment = r.data.lead.appointments;
                    // this.app_date = this.appointment.appointment_date;
                    // this.appointment.appointment_date =
                    // new Date(moment(this.appointment.appointment_date).utc(true).local().format('YYYY-MM-DD, h:mm a'));
                    _this.data = r.data.lead.appointments;
                    // r.data.lead.appointments.forEach(element1 => {
                    //   this.data.push(moment(this.appointment.appointment_date).utc(true).local().format('YYYY-MM-DD, h:mm a'));
                    // });
                }
                _this.parameter.favorites = r.data.favorites;
                _this.parameter.fav_properties_count = r.data.fav_properties_count;
                _this.parameter.interested_properties = r.data.interested_properties;
                _this.is_deal_finalised = _this.leadData.selected_properties.length !== 0 ? true : false;
                _this.parameter.viewed_properties = r.data.viewed_properties;
                _this.parameter.viewed_projects = r.data.viewed_projects;
                _this.parameter.user_id = _this.leadData.user.id;
            }, function (error) {
                _this.spinner.hide();
            });
        });
    };
    InhouseBrokerDetailComponent.prototype.getPage2 = function (page) {
        this.parameter.page2 = page;
        this.viewFavProperties();
    };
    InhouseBrokerDetailComponent.prototype.setFillInformationData = function (leadData) {
        var _this = this;
        this.allAmenities = leadData.buyer_amenities;
        leadData.buyer_amenities.forEach(function (element) {
            if (element.is_selected) {
                _this.selectedAmenities.push(element);
            }
        });
        if (leadData.prefs) {
            this.showOtherTextBox = leadData.prefs.proximity_other ? true : false;
            if (leadData.prefs.planning_to_buy !== null) {
                this.leadData.prefs.planning_to_buy = moment__WEBPACK_IMPORTED_MODULE_4__["utc"](leadData.prefs.planning_to_buy).toDate();
                // this.fillInfo.planning_to_buy = moment.utc(leadData.prefs.planning_to_buy).toDate();
            }
        }
        else {
            this.leadData.prefs = new src_app_models_leads_model__WEBPACK_IMPORTED_MODULE_6__["Prefs"]();
            this.leadData.prefs.looking_for = 1;
            this.leadData.prefs.min_price = 0;
            this.leadData.prefs.max_price = 0;
            this.showOtherTextBox = false;
        }
    };
    // setFillInformationData(r) {
    //   this.admin.postDataApi('leads/getPrefOptions', {lead_id: this.parameter.lead_id}).subscribe(res => {
    //     this.fillInfo.lead_id = this.parameter.lead_id;
    //     this.fillInfo.proximity_places_array = res.data.proximity_places;
    //     this.fillInfo.car_types = res.data.car_types;
    //     this.fillInfo.property_types_array = res.data.property_types;
    //     this.fillInfo.configurations_array = res.data.configurations;
    //     this.fillInfo.configurations = [];
    //     this.fillInfo.proximity_place_ids = [];
    //     this.fillInfo.property_types = [];
    //     this.fillInfo.proximity_places_array.forEach(element => {
    //       r.data.lead.proximity_places.forEach(p => {
    //         if (p.id === element.id) {
    //           element.is_selected = 1;
    //         }
    //       });
    //     });
    //     this.fillInfo.car_types.forEach(element => {
    //       element.is_selected = (r.data.lead.prefs != null) &&
    //       r.data.lead.prefs.car_type_id && (r.data.lead.prefs.car_type_id === element.id) ? 1 : 0;
    //     });
    //     this.fillInfo.property_types_array.forEach(element => {
    //       r.data.lead.property_types.forEach(pt => {
    //         if (pt.id === element.id) {
    //           element.is_selected = 1;
    //         }
    //       });
    //     });
    //     this.fillInfo.configurations_array.forEach(element => {
    //       r.data.lead.configuration.forEach(c => {
    //         if (c.id === element.id) {
    //           element.is_selected = 1;
    //         }
    //       });
    //     });
    //   });
    //   if (r.data.lead.prefs !== null) {
    //     this.fillInfo.family_size = r.data.lead.prefs.family_size;
    //     this.fillInfo.pets = r.data.lead.prefs.pets;
    //     this.fillInfo.kid_count = r.data.lead.prefs.kid_count;
    //     this.fillInfo.min_price = r.data.lead.min_price;
    //     this.fillInfo.max_price = r.data.lead.max_price;
    //     this.fillInfo.price_range = [r.data.lead.prefs.min_price, r.data.lead.prefs.max_price];
    //     if (r.data.lead.prefs.planning_to_buy !== null) {
    //       this.fillInfo.planning_to_buy = moment.utc(r.data.lead.prefs.planning_to_buy).toDate();
    //       // this.fillInfo.planning_to_buy = new ChatTimePipe().transform(r.data.lead.prefs.planning_to_buy, 'YYYY-MM-DD H:m:s', 4);
    //     }
    //     // this.fillInfo.configuration = r.data.lead.configuration;
    //     // this.parameter.prefs = r.data.lead.prefs;
    //   } else {
    //     this.fillInfo.family_size = 1;
    //     this.fillInfo.pets = '';
    //     this.fillInfo.kid_count = '';
    //     this.fillInfo.min_price = this.constant.minValue;
    //     this.fillInfo.max_price = this.constant.maxValue;
    //     this.fillInfo.price_range = [this.constant.minValue, this.constant.maxValue];
    //     // this.parameter.prefs = new FillInformation();
    //   }
    // }
    InhouseBrokerDetailComponent.prototype.viewFavProperties = function () {
        var _this = this;
        this.spinner.show();
        this.admin.postDataApi('leads/favoriteProperties', { lead_id: this.parameter.lead_id, page: this.parameter.page2 }).subscribe(function (r) {
            _this.spinner.hide();
            _this.parameter.favorites = r.data;
            _this.parameter.total2 = r.total;
            if (_this.parameter.page2 === 1) {
                _this.showPropertyModal.nativeElement.click();
            }
        }, function (error) {
            _this.spinner.hide();
        });
    };
    InhouseBrokerDetailComponent.prototype.getInvoice = function () {
        var _this = this;
        this.parameter.url = 'getInvoicePdf/' + this.parameter.lead_id;
        this.spinner.show();
        this.admin.getInvoicePdf(this.parameter.url).subscribe(function (r) {
            _this.spinner.hide();
            if (r) {
                Object(file_saver__WEBPACK_IMPORTED_MODULE_2__["saveAs"])(r, 'Invoice_' + moment__WEBPACK_IMPORTED_MODULE_4__(new Date()).format('DD MMM YYYY, h:mm a') + '.pdf');
            }
        }, function (error) {
            _this.spinner.hide();
            swal(_this.translate.instant('swal.error'), _this.translate.instant('message.error.dealIsNotFinalised'), 'error');
        });
    };
    InhouseBrokerDetailComponent.prototype.addDateTime = function () {
        if (this.date) {
            this.appointment.appointment_date_array.push(this.date);
            this.date = '';
        }
    };
    InhouseBrokerDetailComponent.prototype.addOld = function () {
        // const d: any = new Date(this.appointment.appointment_date);
        // const f = moment(d).utc().format('YYYY-MM-DD HH:mm:ss');
        // this.input = {
        //   lead_id: this.parameter.lead_id,
        //   // property_id: this.leadData.selected_properties[0].property_id,
        //   appointment_date: f,
        //   sent_as: this.parameter.sent_as
        // };
        // if (this.appointment.id) {
        //   this.input.id = this.appointment.id;
        // }
        // this.spinner.show();
        // this.admin.postDataApi('leads/addAppointment', this.input)
        //   .subscribe(
        //     success => {
        //       this.appointment = success.data;
        //       this.app_date = this.appointment.appointment_date;
        //       this.appointment.appointment_date =
        //       new Date(moment(this.appointment.appointment_date).utc(true).local().format('YYYY-MM-DD, h:mm a'));
        //       this.spinner.hide();
        //       this.closeModal();
        //       swal(this.translate.instant('swal.success'), 'Appointment scheduled successfully.', 'success');
        //     }, error => {
        //       this.spinner.hide();
        //     }
        //   );
    };
    InhouseBrokerDetailComponent.prototype.add = function () {
        var _this = this;
        this.appointment.appointment_date_array.forEach(function (element) {
            var d = new Date(element);
            var f = moment__WEBPACK_IMPORTED_MODULE_4__(d).utc().format('YYYY-MM-DD HH:mm:ss');
            _this.appointment.appointment_date.push(f);
        });
        if (this.appointment.appointment_date.length === 0) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseAtleastOneDate'), 'error');
            return false;
        }
        this.spinner.show();
        this.admin.postDataApi('leads/addAppointmentMultiple', this.appointment)
            .subscribe(function (success) {
            _this.data.push.apply(_this.data, success.data);
            // this.app_date = this.appointment.appointment_date;
            // this.appointment.appointment_date =
            // new Date(moment(this.appointment.appointment_date).utc(true).local().format('YYYY-MM-DD, h:mm a'));
            _this.spinner.hide();
            _this.closeModal();
            swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.appointmentScheduledSuccessfully'), 'success');
        }, function (error) {
            _this.spinner.hide();
        });
    };
    InhouseBrokerDetailComponent.prototype.openModal = function () {
        this.appointment = new src_app_models_leads_model__WEBPACK_IMPORTED_MODULE_6__["AddAppointmentMultiple"]();
        this.appointment.lead_id = this.parameter.lead_id;
        this.appointment.property_id = this.leadData.selected_properties[0] && this.leadData.selected_properties[0].property_id ?
            this.leadData.selected_properties[0].property_id : '';
        this.appointment.sent_as = this.constant.userType.inhouse_broker;
        this.modalOpen.nativeElement.click();
    };
    InhouseBrokerDetailComponent.prototype.closeModal = function () {
        this.modalClose.nativeElement.click();
    };
    InhouseBrokerDetailComponent.prototype.dealFinalisedReceived = function (e, response) {
        this.is_deal_finalised = true;
        this.leadData.selected_properties[0].property_id = response.property_id;
    };
    InhouseBrokerDetailComponent.prototype.deleteAppointment = function (id, j) {
        var _this = this;
        this.admin.postDataApi('leads/deleteAppointment', { id: id })
            .subscribe(function (success) {
            _this.data.splice(j, 1);
            // this.items = success.data;
            // this.parameter.total = success.total_count;
        });
    };
    InhouseBrokerDetailComponent.prototype.removeAppointment = function (i) {
        this.appointment.appointment_date_array.splice(i, 1);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalOpen'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], InhouseBrokerDetailComponent.prototype, "modalOpen", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], InhouseBrokerDetailComponent.prototype, "modalClose", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('showPropertyModal'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], InhouseBrokerDetailComponent.prototype, "showPropertyModal", void 0);
    InhouseBrokerDetailComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-inhouse-broker-detail',
            template: __webpack_require__(/*! ./inhouse-broker-detail.component.html */ "./src/app/layout/leads/inhouse-broker/inhouse-broker-detail/inhouse-broker-detail.component.html"),
            styles: [__webpack_require__(/*! ./inhouse-broker-detail.component.css */ "./src/app/layout/leads/inhouse-broker/inhouse-broker-detail/inhouse-broker-detail.component.css")],
            providers: [src_app_models_leads_model__WEBPACK_IMPORTED_MODULE_6__["DealFinalize"], src_app_models_leads_model__WEBPACK_IMPORTED_MODULE_6__["AddAppointment"], src_app_models_leads_model__WEBPACK_IMPORTED_MODULE_6__["AddAppointmentMultiple"]]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_7__["AdminService"],
            src_app_common_constants__WEBPACK_IMPORTED_MODULE_8__["Constant"],
            _angular_http__WEBPACK_IMPORTED_MODULE_3__["Http"],
            src_app_models_leads_model__WEBPACK_IMPORTED_MODULE_6__["AddAppointmentMultiple"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__["TranslateService"]])
    ], InhouseBrokerDetailComponent);
    return InhouseBrokerDetailComponent;
}());



/***/ }),

/***/ "./src/app/layout/leads/inhouse-broker/inhouse-broker-detail/my-chat/my-chat.component.css":
/*!*************************************************************************************************!*\
  !*** ./src/app/layout/leads/inhouse-broker/inhouse-broker-detail/my-chat/my-chat.component.css ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9sZWFkcy9pbmhvdXNlLWJyb2tlci9pbmhvdXNlLWJyb2tlci1kZXRhaWwvbXktY2hhdC9teS1jaGF0LmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/layout/leads/inhouse-broker/inhouse-broker-detail/my-chat/my-chat.component.html":
/*!**************************************************************************************************!*\
  !*** ./src/app/layout/leads/inhouse-broker/inhouse-broker-detail/my-chat/my-chat.component.html ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"row\">\n    <div class=\"col-lg-4 col-md-4 col-sm-12 col-12\">\n      <div malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\" class=\"chat-name-list white-bg\">\n         <div *ngIf=\"loadingConversation\" class=\"chat-window white-bg\"><img style=\"width:100%\" src=\"assets/img/loading_content.gif\"></div>\n         <div *ngIf=\"!loadingConversation && conversations.length == 0\" class=\"padding20\">No conversation found</div>\n         <a *ngFor=\"let con of conversations\" [ngClass]=\"{'active':con.selected == true}\" href=\"javascript://\">\n            <div class=\"profile\" (click)=\"selectConversation(con)\">\n               <div class=\"fig-block\">\n                  <img [src]=\"con.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\" />\n               </div>\n               <div class=\"profile-info\">\n                  <h6>{{con.name | titlecase}}</h6>\n                  <!-- <p class=\"p12\">{{con.phone}}</p> -->\n                  <p class=\"p12\">\n                    {{con?.dialCode ? con?.dialCode : con.dial_code}}-{{con?.phone}}\n                  </p>\n                  <p *ngIf=\"type==1\" class=\"p13\">({{con?.is_developer==1 ? 'Developer' : 'Seller'}})</p>\n                  <i class=\"fa fa-angle-right float-right\"></i>\n               </div>\n            </div>\n         </a>\n      </div>\n   </div>\n   \n   <div class=\"col-lg-8 col-md-8 col-sm-12 col-12 move-below\">\n      <div *ngIf=\"loadingMessages\" class=\"chat-window white-bg\"><img style=\"width:100%\" src=\"assets/img/loading_content.gif\"></div>\n      <div *ngIf=\"conversation && !loadingMessages\" class=\"chat-window white-bg\">\n         <div class=\"chat-top\">\n             <a href=\"javascript://\">\n               <div class=\"profile\">\n                  <div class=\"fig-block\">\n                     <img [src]=\"parameter.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\">\n                  </div>\n                  <div class=\"profile-info\">\n                     <h6>{{parameter.name | titlecase}}</h6>\n                     <!-- <p class=\"p12\">{{conversation.other.phone}}</p> -->\n                     <p class=\"p12\">\n                       <!-- {{parameter.phone}} -->\n                       {{parameter?.dialCode ? parameter?.dialCode : constant.dial_code}}-{{parameter?.phone}}\n                      </p>\n                  </div>\n               </div>\n            </a>\n  \n         </div>\n  \n         <div *ngIf=\"messages\" malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\" class=\"chat-area scrollbox\" #chatWin>\n          <div *ngIf=\"loadmore\" class=\"chat-load-more\" (click)=\"loadMore()\" >\n            Previous Messages <img *ngIf=\"loadmoring\" src=\"assets/img/loading-p.gif\">\n          </div> \n          <div *ngFor=\"let m of messages;let i = index\" [ngClass]=\"m?.conversation_user?.admin_id == admin_id ? 'chat-user-one' :'chat-user-two'\" class=\"chat-user\">\n            <p *ngIf=\"m.message_type == 1\" style=\"word-wrap: break-word;\">\n              <!-- <span *ngIf=\"m.loading\" class=\"m-loader\"><img src=\"assets/img/loading-p.gif\"></span> -->\n              <span>{{m.message}}</span>\n            </p>\n  \n            <!-- <a class=\"btn btn-sm btn-danger\" [group]=\"group\" ng-box href=\"{{lastReport.image.original}}\">View</a> -->\n            <!-- <a *ngIf=\"m.message_type == 2\" ng-box width=\"800\" height=\"800\" target=\"_blank\" href=\"{{m.image}}\">\n                <img src=\"{{m.image}}\">\n            </a> -->\n            <a *ngIf=\"m.message_type == 2\" href=\"{{m.image}}\" data-lightbox=\"image\" title=\"{{'table.title.image' | translate}}\" >\n              <span>\n                <img class=\"ui bordered small image\" src=\"{{m.image}}\">\n                <div *ngIf=\"m.loading\" class=\"loaderr\"></div>\n              </span>\n            </a>\n            <!-- <a *ngIf=\"m.message_type == 2\" href=\"{{m.image}}\" data-lightbox=\"image\" data-title=\"My caption\">\n              <img class=\"ui bordered small image\" src=\"{{m.image}}\">\n              \n            </a> -->\n            <!-- <a *ngIf=\"m.message_type == 3\" href=\"{{m.video}}\" title=\"Video\" class=\"chat-vid\">\n              <span >\n                <img class=\"ui bordered small image\" src=\"{{m.image}}\">\n                <img *ngIf=\"!m.loading\" class=\"vid-icon\" (click)=\"playVideo(i)\" src=\"assets/img/play-button.png\" />\n                <div *ngIf=\"m.loading\" class=\"loaderr\"></div>\n              </span>\n            </a> -->\n            \n            <div class=\"chat-vid\" *ngIf=\"m.message_type == 3 && !m.play\">\n              <span>\n                  <img class=\"ui bordered small image\" src=\"{{m.image}}\" onerror=\"this.src='assets/img/placeholder.png'\">\n                  <img *ngIf=\"!m.loading\" class=\"vid-icon\" (click)=\"playVideo(i)\" src=\"assets/img/play-button.png\" />\n                  <div *ngIf=\"m.loading\" class=\"loaderr\"></div>\n                  <div class=\"clearfix\"></div>\n            </span>\n            </div>\n            <video *ngIf=\"m.message_type == 3 && m.play\" src=\"{{m.video}}\" autoplay type=\"video/mp4\" controls></video>\n            \n            <!-- <div class=\"chat-vid\" *ngIf=\"m.message_type == 3 && !m.play\">\n              <span>\n                <img class=\"vid-img\" src=\"{{m.image}}\">\n                <img class=\"vid-icon\" (click)=\"playVideo(i)\" src=\"assets/img/play-button (2).png\"/>\n                <div class=\"clearfix\"></div>\n            </span>\n            </div> -->\n            <!-- <video *ngIf=\"m.message_type == 3 && m.play\" src=\"{{m.video}}\" autoplay type=\"video/mp4\" controls></video> -->\n            \n            <div class=\"chat-shared-file\" *ngIf=\"m.message_type == 4\">\n              <span *ngIf=\"m.loading\" class=\"m-loader\">\n                <img class=\"ui bordered small image\" src='assets/img/placeholder.png'>\n                <div *ngIf=\"m.loading\" class=\"loaderr\"></div>\n              </span>\n              <span *ngIf=\"!m.loading\">\n                <a href=\"javascript://\" target=\"_blank\" href=\"{{m.attachment}}\"><span>{{m.attachment_name}} <img class=\"viewfull\" src=\"assets/img/viewfull.png\"></span>\n                </a>\n              </span>\n            </div>\n              \n            <a *ngIf=\"m.message_type == 5\" href=\"{{m.property_url}}\" target=\"_blank\" title=\"{{'table.title.image' | translate}}\" >\n              <span>\n                <img class=\"ui bordered small image\" src=\"{{m.image}}\">\n                <div *ngIf=\"m.loading\" class=\"loaderr\"></div>\n              </span>\n              <h5>{{m.message}}</h5>\n            </a>\n            \n            <div class=\"time clearfix\" *ngIf=\"m.updated_at && !m.uid\">{{m.updated_at| moment}}</div>\n            <div class=\"time clearfix\" *ngIf=\"m.updated_at && m.uid\">\n                {{m.updated_at|date:'h:mm a, MMM d y'}}\n            </div>\n  \n           </div>\n  \n         </div>\n  \n         <div style=\"position: absolute; z-index: 1; margin: 0px; padding: 0px; other: block; left: 581px; top: 91px;\"><div class=\"enscroll-track track3\" style=\"position: relative; height: 367px;\"><a href=\"\" class=\"handle3\" style=\"position: absolute; z-index: 1; height: 199.244px; top: 0px;\"><div class=\"top\"></div><div class=\"bottom\"></div></a></div></div>\n  \n         <div class=\"chat-text\">\n          <div class=\"dropdown attach-items\">\n            <a href=\"javascript://\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" #optionsButton>\n              <i class=\"fa fa-paperclip\" aria-hidden=\"true\"></i>\n            </a>\n            <div class=\"dropdown-menu\">\n              <div class=\"dropdown-item\">\n                <input type=\"file\" name=\"image\" accept=\"image/*\" (change)=\"onSelectFile('image', $event)\">\n                <i class=\"fa fa-camera\" aria-hidden=\"true\"></i>\n                <span>Photo</span>\n              </div>\n              <a class=\"dropdown-item\"> \n                <!-- <input type=\"file\" name=\"video\" id=\"videoFileObject\" name=\"video\" accept=\"video/mp4,video/x-m4v,video/*\" (change)=\"showCanvas($event)\"> -->\n                <input type=\"file\" name=\"video1\" accept=\"video/mp4,video/x-m4v,video/*\" (change)=\"showCanvas($event)\">\n                <i class=\"fa fa-video-camera\" aria-hidden=\"true\"></i>\n                <span>Video</span>\n              </a>\n              <a class=\"dropdown-item\">    \n                  <input type=\"file\" name=\"attachment\" accept=\".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf\" (change)=\"saveAttachment($event)\">\n                <i class=\"fa fa-file\" aria-hidden=\"true\"></i>\n                <span>Document</span>\n              </a>\n              <a class=\"dropdown-item cursor-pointer\" (click)=\"blockGetProperty.showModal()\">    \n                <i class=\"fa fa-file\" aria-hidden=\"true\"></i>\n                <span>Property</span>\n              </a>\n            </div>\n          </div>\n          <input id=\"message\" #msgInput1 autocomplete=\"off\" [(ngModel)]=\"textMessage\" (keyup.enter)=\"setText()\" class=\"chat-input\" type=\"text\" name=\"message\" placeholder=\"Type your message here …\">\n          \n          <!-- <div class=\"chat-attached-file\" *ngIf=\"model.message_type == 2\">\n            <div class=\"attached-inner\">\n              <a href=\"javascript://\" (click)=\"updateModel('image')\" class=\"close\">&times;</a>\n              <div class=\"fig-block\"><img class=\"img-fluid\" src=\"{{model.image}}\" alt=\"img\"></div>\n            </div>\n          </div>\n          <div class=\"chat-attached-file\">\n            <div class=\"attached-inner\">\n              <a href=\"javascript://\" (click)=\"updateModel('video')\" class=\"close\">&times;</a>\n              <div class=\"fig-block\">\n                  <video style=\"width: 100%; height: 100%;\" src=\"{{model.video}}\" class=\"video55\" autoplay type=\"video/mp4\" controls></video>\n              </div>\n            </div>\n          </div>\n          <div class=\"chat-attached-file\" *ngIf=\"model.message_type == 4\">\n            <div class=\"attached-inner\">\n              <a href=\"javascript://\" (click)=\"updateModel('video')\" class=\"close\">&times;</a>\n              <div class=\"fig-block\">\n                <div class=\"chat-shared-file\">\n                  <a href=\"javascript://\"><span>{{model.attachment_name}}</span>\n                    <i class=\"fa fa-times\" (click)=\"updateModel('attachment')\" aria-hidden=\"true\"></i>\n                  </a>\n                </div>\n              </div>\n            </div>\n          </div> -->\n          <video style=\"width: 100%; height: 100%;\" src=\"{{videoSrc}}\" class=\"video55\" type=\"video/mp4\" controls></video>\n          <canvas style=\"display: none;\" width=\"800\" height=\"600\" id=\"canvas\"></canvas>\n  \n          <button (click)=\"setText()\" class=\"btn\">Send</button>\n          \n         </div>\n  \n      </div>\n      </div>\n    </div>\n  \n    <app-block-get-property #blockGetProperty (itemSelect)=\"sendProperty($event)\"></app-block-get-property>"

/***/ }),

/***/ "./src/app/layout/leads/inhouse-broker/inhouse-broker-detail/my-chat/my-chat.component.ts":
/*!************************************************************************************************!*\
  !*** ./src/app/layout/leads/inhouse-broker/inhouse-broker-detail/my-chat/my-chat.component.ts ***!
  \************************************************************************************************/
/*! exports provided: MyChatComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyChatComponent", function() { return MyChatComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/lib/index.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var src_app_models_chat_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/chat.model */ "./src/app/models/chat.model.ts");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var MyChatComponent = /** @class */ (function () {
    function MyChatComponent(element, admin, cs, constant, route, spinner, translate) {
        this.element = element;
        this.admin = admin;
        this.cs = cs;
        this.constant = constant;
        this.route = route;
        this.spinner = spinner;
        this.translate = translate;
        this.parameter = {};
        this.conversations = [];
        this.messages = [];
        this.loadingMessages = false;
        this.loadingConversation = false;
        this.editModel = false;
        this.seconds = true;
        this.isActive = true;
        this.imgObj = {
            thumbnail: '',
            original: ''
        };
        this.imgArray = [];
        this.durationInSec = 0;
        this.showVideo = true;
        this.videoObj = {
            thumbnail: '',
            original: ''
        };
        this.loadmore = true;
        this.loadmoring = false;
        this.scrollbarOptions = { axis: 'y', theme: 'dark' };
    }
    MyChatComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loginData$$ = this.admin.loginData$.subscribe(function (success) {
            _this.admin_id = success['id'];
        });
        this.route.params.subscribe(function (params) {
            _this.lead_id = params.id;
            _this.type = params.type;
            _this.loadingConversation = true;
            // chat with seller
            if (_this.type === '1') {
                _this.admin.postDataApi('leads/developers', { lead_id: _this.lead_id }).subscribe(function (r) {
                    _this.conversations = r['data'];
                    if (_this.conversations.length > 0) {
                        _this.initSocket();
                        for (var index = 0; index < _this.conversations.length; index++) {
                            if (_this.conversations[index].id.toString() === _this.lead_id) {
                                _this.selectConversation(_this.conversations[index]);
                            }
                        }
                    }
                    _this.loadingConversation = false;
                });
            }
            else {
                // chat with csr seller
                _this.admin.postDataApi('leads/leadCsrSellers', { lead_id: _this.lead_id }).subscribe(function (r) {
                    _this.conversations = r['data'];
                    if (_this.conversations.length > 0) {
                        _this.initSocket();
                        _this.selectConversation(_this.conversations[0]);
                    }
                    _this.loadingConversation = false;
                });
            }
        });
        // setTimeout(() => {
        // this.msgInput1.nativeElement.focus();
        // }, 1000);
    };
    MyChatComponent.prototype.selectConversation = function (conversation) {
        var _this = this;
        this.parameter.name = conversation.name;
        this.parameter.image = conversation.image;
        this.parameter.dialCode = conversation.dial_code;
        this.parameter.phone = conversation.phone;
        var data1 = {
            lead_id: this.lead_id,
            other_id: conversation.id,
            other_sent_as: this.type === '1' ? this.constant.userType.user_seller_dev : this.constant.userType.csr_seller,
            sent_as: this.constant.userType.inhouse_broker
        };
        this.spinner.show();
        this.admin.postDataApi('conversation/getLeadConversation', data1).subscribe(function (res) {
            _this.spinner.hide();
            if (res.data) {
                _this.conversation = res.data;
                _this.conversation_id = res.data[0].id;
                _this.loadmore = true;
                _this.conversations.map(function (con) {
                    con.selected = false;
                    if (con === conversation) {
                        con.selected = true;
                        // this.conversation_id = con.id;
                    }
                });
                var data = {
                    sent_as: _this.constant.userType.inhouse_broker,
                    lead_id: _this.lead_id,
                    conversation_id: _this.conversation_id
                };
                _this.loadingMessages = true;
                _this.admin.postDataApi('conversation/getMessages', data).subscribe(function (r) {
                    _this.messages = r.data[0].messages;
                    // this.messages.map(r=>{
                    //   r.loading = true;
                    //   return r;
                    // });
                    if (_this.messages.length < 30) {
                        _this.loadmore = false;
                    }
                    _this.loadingMessages = false;
                    setTimeout(function () {
                        _this.scrollToBottom();
                    }, 200);
                });
            }
        }, function (error) {
            _this.spinner.hide();
        });
    };
    MyChatComponent.prototype.initSocket = function () {
        var _this = this;
        // this.socket = io.connect(environment.socket_url,{
        //   extraHeaders: {
        //     Authorization: "Bearer authorization_token_here"
        //   }
        // });
        this.socket = socket_io_client__WEBPACK_IMPORTED_MODULE_2__["connect"](this.admin.socketUrl);
        this.socket.on('connect', function (fun) {
            _this.socket_id = _this.socket.id;
            _this.connected = _this.socket.connected;
            var data = {
                admin_id: _this.admin_id,
                socket_id: _this.socket_id,
                device_id: _this.admin.deviceId + '_' + _this.admin_id
            };
            if (_this.connected) {
                // console.log('Socket Connected', this.socket_id, data);
                _this.socket.emit('add-admin', data, function (res) {
                    // console.log('res', res);
                });
                _this.socket.on('message', function (response) {
                    if (response.data.conversation_id === _this.conversation_id) {
                        _this.messages.push(response.data);
                        setTimeout(function () {
                            _this.scrollToBottom();
                        }, 200);
                    }
                });
            }
        });
    };
    MyChatComponent.prototype.scrollToBottom = function () {
        if (this.chatWin) {
            $('.chat-area').mCustomScrollbar('scrollTo', 'bottom', { scrollInertia: 0 });
        }
    };
    MyChatComponent.prototype.onSelectFile = function (param, event) {
        var _this = this;
        this.optionsButton.nativeElement.click();
        if (event.target.files[0].size > this.constant.fileSizeLimit) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.fileSizeExceeds'), 'error');
            return false;
        }
        var model = new src_app_models_chat_model__WEBPACK_IMPORTED_MODULE_4__["Chat"];
        model.message = this.textMessage;
        model.message_type = 2;
        model.loading = true;
        model.uid = Math.random().toString(36).substr(2, 15);
        model.conversation_id = this.conversation_id;
        model.conversation_user = { admin_id: this.admin_id };
        var d = new Date();
        model.updated_at = d.toUTCString();
        this.messages.push(model);
        setTimeout(function () {
            _this.scrollToBottom();
        }, 100);
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                _this.image = e.target.result;
                model[param] = e.target.result;
                _this.cs.saveImage(event.target.files[0]).subscribe(function (success) {
                    model.image = success['data'].image;
                    _this.sendMessage(model);
                });
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };
    MyChatComponent.prototype.saveAttachment = function (event) {
        var _this = this;
        this.optionsButton.nativeElement.click();
        if (event.target.files[0].size > this.constant.fileSizeLimit) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.fileSizeExceeds'), 'error');
            return false;
        }
        var model = new src_app_models_chat_model__WEBPACK_IMPORTED_MODULE_4__["Chat"];
        model.message = this.textMessage;
        model.message_type = 4;
        model.loading = true;
        model.uid = Math.random().toString(36).substr(2, 15);
        model.conversation_id = this.conversation_id;
        model.conversation_user = { admin_id: this.admin_id };
        model.attachment_name = event.target.files[0].name;
        var d = new Date();
        model.updated_at = d.toUTCString();
        this.messages.push(model);
        setTimeout(function () {
            _this.scrollToBottom();
        }, 100);
        this.cs.saveAttachment(event.target.files[0]).subscribe(function (success) {
            model.attachment = success['data'].name;
            _this.sendMessage(model);
        });
    };
    MyChatComponent.prototype.playVideo = function (i) {
        this.messages[i].play = true;
    };
    MyChatComponent.prototype.showCanvas = function (event) {
        var _this = this;
        this.optionsButton.nativeElement.click();
        if (event.target.files[0].size > this.constant.fileSizeLimit) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.fileSizeExceeds'), 'error');
            return false;
        }
        this.showVideo = true;
        var model = new src_app_models_chat_model__WEBPACK_IMPORTED_MODULE_4__["Chat"];
        model.message = this.textMessage;
        model.message_type = 3;
        model.loading = true;
        model.uid = Math.random().toString(36).substr(2, 15);
        model.conversation_id = this.conversation_id;
        model.conversation_user = { admin_id: this.admin_id };
        var d = new Date();
        model.updated_at = d.toUTCString();
        this.messages.push(model);
        setTimeout(function () {
            _this.scrollToBottom();
        }, 100);
        setTimeout(function () {
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
                        _this.durationInSec = videoTest.duration.toFixed(0);
                        setTimeout(function () {
                            // create canvas at middle of video
                            _this.newcanvas(videoTest, event.target.files[0], model);
                        }, 3000);
                        // setTimeout(() => {
                        //   // create canvas at middle of video
                        //   this.newcanvas(videoTest, event.target.files[0], model);
                        // }, (this.durationInSec / 2).toFixed(0));
                        clearInterval(timer);
                    }
                }, 1000);
            }.bind(_this);
            reader.readAsDataURL(event.target.files[0]);
        }, 1000);
    };
    MyChatComponent.prototype.newcanvas = function (video, videoFile, model) {
        var _this = this;
        var canvas = document.getElementById('canvas');
        var ss = canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, canvas.width, canvas.height);
        var ImageURL = canvas.toDataURL('image/jpeg');
        model.image = ImageURL;
        var fileToUpload = this.dataURLtoFile(ImageURL, 'tempFile.png');
        this.cs.saveVideo(videoFile, fileToUpload).subscribe(function (success) {
            model.video = success['data'].video;
            model.image = success['data'].thumb;
            _this.sendMessage(model);
        });
    };
    MyChatComponent.prototype.dataURLtoFile = function (dataurl, filename) {
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
    MyChatComponent.prototype.setText = function () {
        if (!this.textMessage || !this.textMessage.trim()) {
            return false;
        }
        else if ((Object.keys(this.admin.admin_acl).length !== 0 && this.admin.admin_acl['Inhouse Agent Lead Management'].can_update === 0) ||
            this.admin.permissions.can_in_house_broker === 0) {
            return false;
        }
        else {
            var model = new src_app_models_chat_model__WEBPACK_IMPORTED_MODULE_4__["Chat"];
            model.message = this.textMessage;
            model.message_type = 1;
            model.loading = true;
            model.uid = Math.random().toString(36).substr(2, 15);
            model.conversation_id = this.conversation_id;
            model.conversation_user = { admin_id: this.admin_id };
            var d = new Date();
            model.updated_at = d.toUTCString();
            this.messages.push(model);
            this.textMessage = '';
            this.sendMessage(model);
        }
    };
    MyChatComponent.prototype.sendMessage = function (model) {
        var _this = this;
        model.sent_as = this.constant.userType.inhouse_broker;
        if (model.message_type === 1 && !model.message) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterText'), 'error');
        }
        else {
            setTimeout(function () {
                _this.scrollToBottom();
            }, 100);
            this.admin.postDataApi('conversation/sendMessage', model).subscribe(function (r) {
                if (model.loading == true) {
                    model.loading = false;
                    var foundIndex = _this.messages.findIndex(function (x) { return x.uid == model.uid; });
                    _this.messages[foundIndex] = r['data'];
                }
                setTimeout(function () {
                    _this.scrollToBottom();
                }, 100);
            });
        }
    };
    MyChatComponent.prototype.loadMore = function () {
        var _this = this;
        this.loadmoring = true;
        var data = {
            sent_as: this.constant.userType.inhouse_broker,
            conversation_id: this.conversation_id,
            lead_id: this.lead_id,
            last_message_id: this.messages[0].id
        };
        this.admin.postDataApi('conversation/getMessages', data).subscribe(function (res) {
            _this.loadmoring = false;
            if (res['data'].length < 30) {
                _this.loadmore = false;
            }
            _this.messages = res['data'].concat(_this.messages);
        });
    };
    MyChatComponent.prototype.sendProperty = function (property) {
        var model = new src_app_models_chat_model__WEBPACK_IMPORTED_MODULE_4__["Chat"];
        model.message = property.name + ' ' + this.translate.instant('commonBlock.with') + ' ';
        if (property.configuration.bedroom) {
            model.message += property.configuration.bedroom + ' ' + this.translate.instant('commonBlock.bed') + ' ';
        }
        if (property.configuration.bathroom) {
            model.message += this.constant.middleDot + property.configuration.bathroom + ' ' + this.translate.instant('commonBlock.bath') + ' ';
        }
        if (property.configuration.half_bathroom) {
            model.message += this.constant.middleDot + property.configuration.half_bathroom + ' ' +
                this.translate.instant('commonBlock.halfBath') + ' ';
        }
        if (property.property_type.name) {
            model.message += this.constant.middleDot + property.property_type.name;
        }
        model.message += ' ' + this.translate.instant('commonBlock.in') + ' ' + property.building.name;
        model.message_type = 5;
        model.property_id = property.id;
        model.image = property.image;
        model.property_url = property.property_url;
        model.loading = true;
        model.updated_at = new Date();
        model.uid = Math.random().toString(36).substr(2, 15);
        model.conversation_id = this.conversation_id;
        model.conversation_user = { admin_id: this.admin_id };
        this.messages.push(model);
        this.sendMessage(model);
    };
    MyChatComponent.prototype.onDestroy = function () {
        if (this.loginData$$) {
            this.loginData$$.unsubscribe();
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('chatWin'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], MyChatComponent.prototype, "chatWin", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('optionsButton'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], MyChatComponent.prototype, "optionsButton", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('msgInput1'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], MyChatComponent.prototype, "msgInput1", void 0);
    MyChatComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-my-chat',
            template: __webpack_require__(/*! ./my-chat.component.html */ "./src/app/layout/leads/inhouse-broker/inhouse-broker-detail/my-chat/my-chat.component.html"),
            styles: [__webpack_require__(/*! ./my-chat.component.css */ "./src/app/layout/leads/inhouse-broker/inhouse-broker-detail/my-chat/my-chat.component.css")],
            providers: [src_app_models_chat_model__WEBPACK_IMPORTED_MODULE_4__["Chat"], src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["Constant"]]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"],
            src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_6__["AdminService"],
            src_app_services_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"],
            src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["Constant"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__["TranslateService"]])
    ], MyChatComponent);
    return MyChatComponent;
}());



/***/ }),

/***/ "./src/app/layout/leads/inhouse-broker/inhouse-broker.component.css":
/*!**************************************************************************!*\
  !*** ./src/app/layout/leads/inhouse-broker/inhouse-broker.component.css ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9sZWFkcy9pbmhvdXNlLWJyb2tlci9pbmhvdXNlLWJyb2tlci5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/layout/leads/inhouse-broker/inhouse-broker.component.html":
/*!***************************************************************************!*\
  !*** ./src/app/layout/leads/inhouse-broker/inhouse-broker.component.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container-fluid\">\n    <div class=\"row\">\n        <div class=\"col-md-4\">\n            <div class=\"form-group\">\n                    <p class=\"p16\">{{'leads.inhouseAgentLeads' | translate}}</p>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-md-4\">\n            <div class=\"form-group\" *ngIf=\"admin?.admin_acl['Inhouse Agent Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n                <div class=\"d-flex\">\n                <!-- <button (click)=\"removeCsrUser()\" class=\"all-btn\">All</button> -->\n                <div class=\"autocomplete\">\n                    <input placeholder=\"{{'addForm.placeholder.searchInhouseAgent' | translate}}\" style=\"max-width:200px\" list=\"amenities\" [(ngModel)]=\"parameter.keyword\" (input)=\"getCsrListing()\" class=\"form-control\" type=\"text\" name=\"keyword\" (focusout)=\"closeCsrListing()\">\n                    <div id=\"myInputautocomplete-list\" class=\"autocomplete-items\">\n                        <div *ngFor=\"let item of users\" (click)=\"selectCsrUser(item)\">{{item.email}}</div>\n                    </div>\n                </div>\n                \n                </div>\n            </div>\n        </div>\n        <div class=\"col-md-8 col-12\">\n            <div class=\"cust-tabs-2\">\n                <ul class=\"nav nav-tabs\">\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==1}\" (click)=\"changeFlag(1)\" >{{'filters.time.thisWeek' | translate}}</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==2}\" (click)=\"changeFlag(2)\" >{{'filters.time.thisMonth' | translate}}</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==3}\" (click)=\"changeFlag(3)\" >{{'filters.time.lastMonth' | translate}}</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==4}\" (click)=\"changeFlag(4)\" >{{'filters.time.lifetime' | translate}}</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==5}\" (click)=\"parameter.flag=5\" >{{'filters.time.custom.label' | translate}}</a>\n                </li>\n                </ul>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-12\">\n            <div *ngIf=\"parameter.flag == 5\" class=\"row\">\n                <div class=\"offset-lg-7\"></div>\n                <div class=\"col-lg-2 col-md-2 col-sm-5 col-5\">\n                <div class=\"form-group marginB0\">\n                    <label>{{'filters.time.custom.from' | translate}}:</label>\n                    <p-calendar [locale]=\"locale\" showIcon=\"true\" [(ngModel)]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2040\"></p-calendar>\n                </div>\n                </div>\n                <div class=\"col-lg-2 col-md-2 col-sm-5 col-5\">\n                <div class=\"form-group marginB0\">\n                    <label>{{'filters.time.custom.to' | translate}}:</label>\n                    <p-calendar [locale]=\"locale\" showIcon=\"true\" [(ngModel)]=\"parameter.max\" [minDate]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2040\"></p-calendar>\n                </div>\n                </div>\n                <div class=\"col-lg-1 col-md-2 col-sm-2 col-6\">\n                <div class=\"form-group btn-cont\">\n                    <label class=\"addMT3\">&nbsp;</label>\n                    <button class=\"btn btn-calender\" href=\"javascript://\" (click)=\"getListing(); getCSRDashBoardData();\"\n                        [disabled]=\"!parameter.min || !parameter.max\">{{'filters.time.custom.applyBtn' | translate}}</button>\n                </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"listingResults\" >\n        <div class=\"row\" *ngIf=\"admin?.admin_acl['Inhouse Agent Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n            <div class=\"col-md-2\">\n                <div class=\"form-group\">\n                    <label>{{'filters.location.country' | translate}}</label>\n                    <select class=\"form-control\" (change)=\"onCountryChange($event.target.value)\">\n                        <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n                        <option *ngFor=\"let item of location.countries\" [value]=\"item.id\">{{item.name}}</option>\n                    </select>\n                </div>\n            </div>\n            <div class=\"col-md-2\">\n                <div class=\"form-group\">\n                <label>{{'filters.location.state' | translate}}</label>\n                <select class=\"form-control\" (change)=\"onStateChange($event.target.value)\">\n                    <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n                    <option *ngFor=\"let item of location.states\" [value]=\"item.id\">{{item.name}}</option>\n                </select>\n                </div>\n            </div>\n            <div class=\"col-md-2\">\n                <div class=\"form-group\">\n                <label>{{'filters.location.city' | translate}}</label>\n                    <select class=\"form-control\" (change)=\"onCityChange($event.target.value)\">\n                    <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n                    <option *ngFor=\"let item of location.cities\" [value]=\"item.id\">{{item.name}}</option>\n                    </select>\n                </div>\n            </div>\n        \n            <div class=\"col-md-2\">\n                <div class=\"form-group\">\n                <label>{{'filters.location.locality' | translate}}</label>\n                <select class=\"form-control\" (change)=\"onLocalityChange($event.target.value)\">\n                    <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n                    <option *ngFor=\"let item of location.localities\" [value]=\"item.id\">{{item.name}}</option>\n                </select>\n                </div>\n            </div>\n            <div class=\"col-md-2\">\n                <div class=\"form-group btn-cont\">\n                <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n                <button type=\"button\" (click)=\"getListing(); getCSRDashBoardData();\" class=\"btn btn-primary-new width100P\">{{'filters.location.applyBtn' | translate}}</button>\n                </div>\n            </div>\n    \n            <div class=\"col-md-2\">\n                <div class=\"form-group btn-cont\">\n                <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n                <button type=\"button\" (click)=\"resetFilters()\" class=\"btn btn-primary-new width100P\">{{'filters.location.resetBtn' | translate}}</button>\n                </div>\n            </div>\n        </div>\n\n        <div *ngIf=\"selectedUser as item\" class=\"sigle-row-table\">\n            <table class=\"table table-striped\">\n                <tbody>\n                    <tr>\n                        <td> <img class=\"rounded-circle\" [src]=\"item.image\" onerror='this.src=\"assets/img/default_img.png\"' alt=\"img\"></td>\n                        <td class=\"text-left\">\n                            <span class=\"name\">{{item.name | titlecase}}</span>\n                        </td>\n                        <td class=\"text-left\">\n                            {{item.phone}}\n                        </td>\n                        <td class=\"text-left\">\n                            {{item.email}}\n                        </td>\n                        <td>\n                            <a (click)=\"removeCsrUser()\" href=\"javascript://\" class=\"icon-block edit-icon\"><img src=\"assets/img/remove-icon.png\" alt=\"remove\" title=\"{{'table.title.remove' | translate}}\" /></a>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-lg-8 col-md-12 col-sm-12 col-12\">\n                <div class=\"info-box all-leads\">\n                <div class=\"row\">\n                    <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == 1}\" (click)=\"changeCountFlag(1)\">\n                        <div class=\"one-row \">\n                            <div class=\"o-block\">\n                            <h5>{{'table.th.leads' | translate}}</h5>\n                            <small>{{'table.th.total' | translate}}</small>\n                            </div>\n                            <div class=\"o-block\">\n                            <a class=\"view-all\" href=\"javascript://\">{{'table.th.viewAll' | translate}}</a>\n                            <h4>{{dash?.lead_total}}</h4>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == 2}\" (click)=\"changeCountFlag(2)\">\n                        <div class=\"one-row\">\n                            <div class=\"o-block\">\n                            <h5>{{'table.th.properties' | translate}}</h5>\n                            <small>{{'table.th.dealingIn' | translate}}</small>\n                            </div>\n                            <div class=\"o-block\">\n                            <a class=\"view-all\" href=\"javascript://\">{{'table.th.viewAll' | translate}}</a>\n                            <h4>{{dash?.lead_properties}}</h4>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                </div>\n                <div class=\"info-box all-leads\">\n                <div class=\"row\">\n                    <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == 3}\" (click)=\"changeCountFlag(3)\">\n                        <div class=\"one-row \">\n                            <div class=\"o-block\">\n                            <h5>{{'table.th.leads' | translate}}</h5>\n                            <small>{{'table.th.open' | translate}}</small>\n                            </div>\n                            <div class=\"o-block\">\n                            <a class=\"view-all\" href=\"javascript://\">{{'table.th.viewAll' | translate}}</a>\n                            <h4>{{dash?.lead_open}}</h4>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == 4}\" (click)=\"changeCountFlag(4)\">\n                        <div class=\"one-row\">\n                            <div class=\"o-block\">\n                            <h5>{{'table.th.leads' | translate}}</h5>\n                            <small>{{'table.th.dealFinalized' | translate}}</small>\n                            </div>\n                            <div class=\"o-block\">\n                            <a class=\"view-all\" href=\"javascript://\">{{'table.th.viewAll' | translate}}</a>\n                            <h4>{{dash?.lead_closed}}</h4>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                </div>\n        \n            </div>\n            <div class=\"col-lg-4 col-md-12 col-sm-12 col-12\">\n                <div class=\"chat-msg all-leads\" style=\"padding:0px\">\n                    <div class=\"padding20\" *ngIf=\"dash.lead_total == 0\">{{'message.error.noRecordFound' | translate}}</div>\n                    <ngx-charts-pie-chart [results]=\"chartView\"></ngx-charts-pie-chart>\n                </div>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-12\">\n                <div class=\"spacer40\"></div>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-lg-6 col-md-6 col-6\">\n                <div class=\"title-group\">\n                <h5>{{'table.th.leads' | translate}}\n                    <span *ngIf=\"parameter.count_flag == 1\">({{'table.th.total' | translate}})</span>\n                    <span *ngIf=\"parameter.count_flag == 2\">({{'table.th.propertyDealingIn' | translate}})</span>\n                    <span *ngIf=\"parameter.count_flag == 3\">({{'table.th.open' | translate}})</span>\n                    <span *ngIf=\"parameter.count_flag == 4\">({{'table.th.dealFinalized' | translate}})</span>\n                </h5>\n                </div>\n            </div>\n            <div class=\"col-lg-6 col-md-6 col-5\" *ngIf=\"admin?.admin_acl['Inhouse Agent Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n                <div class=\"add-new text-right\">\n                    <a class=\"btn\" (click)=\"bulkAssign()\" href=\"javascript://\">{{'table.th.bulkReassign' | translate}}</a>\n                </div>\n            </div>\n        </div>\n        <div class=\"white-bg\">\n            <div class=\"tabel-section\">\n                <div class=\"table-responsive\">\n                    <table class=\"table table-striped table-align-left vertical-align-top\">\n                        <tr>\n                            <th *ngIf=\"admin?.admin_acl['Inhouse Agent Lead Management']?.can_read==1 && !this.parameter.assignee_id\" style=\"width:6%\">\n                                <div class=\"table-search\">\n                                        <label>{{'table.th.all' | translate}}</label>\n                                    <div>\n                                        <label class=\"cust-check-bx\" >\n                                            <input class=\"width1\" type=\"checkbox\" (click)=\"selectAll(parameter.is_selected)\" name=\"document\">\n                                            <span class=\"checkmark\"></span>\n                                        </label>\n                                    </div>\n                                </div>\n                            </th>\n\n                            <th style=\"width:6%\">\n                                <div class=\"table-search\"></div>\n                            </th>\n                            <th style=\"width:15%\">\n                                <div class=\"table-search\">\n                                        <label>{{'table.th.name' | translate}}</label>\n                                    <div class=\"searh-3\">\n                                        <input autocomplete=\"off\" type=\"text\" [(ngModel)]=\"parameter.name\" (keyup.enter)=\"changeFilter('name',$event.target.value)\" name=\"\">\n                                        <button *ngIf=\"parameter.name\" (click)=\"changeFilter('name', parameter.name)\"><i class=\"fa fa-search\"></i></button>\n                                    </div>\n                                </div>\n                            </th>\n                            <th style=\"width:15%; text-align:left;\">\n                                <div class=\"table-search\">\n                                        <label>{{'table.th.contactNumber' | translate}}</label>\n                                    <div class=\"searh-3\">\n                                        <input autocomplete=\"off\" type=\"text\" [(ngModel)]=\"parameter.phone\" (keyup.enter)=\"changeFilter('phone',$event.target.value)\" name=\"\">\n                                        <button *ngIf=\"parameter.phone\" (click)=\"changeFilter('phone', parameter.phone)\"><i class=\"fa fa-search\"></i></button>\n                                    </div>\n                                </div>\n                            </th>\n                            <th style=\"width:20%\">\n                                <div class=\"table-search\">\n                                        <label>{{'table.th.emailAddress' | translate}}</label>\n                                    <div class=\"searh-3\">\n                                        <input autocomplete=\"off\" type=\"text\" [(ngModel)]=\"parameter.email\" (keyup.enter)=\"changeFilter('email',$event.target.value)\" name=\"\">\n                                        <button *ngIf=\"parameter.email\" (click)=\"changeFilter('email', parameter.email)\"><i class=\"fa fa-search\"></i></button>\n                                    </div>\n                                </div>\n                            </th>\n                            <th style=\"width:10%\">\n                                <div class=\"table-search\">\n                                        <label>{{'table.th.interestedIn' | translate}}</label>\n                                </div>\n                            </th>\n                            <th style=\"width:10%\">\n                                <div class=\"table-search\">\n                                        <label>{{'table.th.assignee' | translate}}</label>\n                                </div>\n                            </th>\n                            <th style=\"width:5%\">\n                                <div class=\"table-search\">\n                                        <label>{{'table.th.userChoice' | translate}}</label>\n                                </div>\n                            </th>\n                            <th style=\"width:10%\">\n                                <div class=\"table-search\">\n                                    <label>{{'table.th.changePropertyFor' | translate}}</label>\n                                </div>\n                            </th>\n                            <!-- <th style=\"width:4%\"></th> -->\n                        </tr>\n                        <tr class=\"cursor-pointer\" title=\"{{'table.title.clickToViewDetails' | translate}}\" *ngFor=\"let item of items| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: parameter.total }; let in=index\"\n                            routerLink=\"/dashboard/leads/inhouse-broker/{{item.id}}\">\n                        <td *ngIf=\"admin?.admin_acl['Inhouse Agent Lead Management']?.can_read==1 && !this.parameter.assignee_id\" (click)=\"$event.stopPropagation()\">\n                            <label class=\"cust-check-bx\" >\n                            <input type=\"checkbox\" [(ngModel)]=\"item.selected\" name=\"document\">\n                            <span class=\"checkmark\"></span>\n                            </label>\n                            <!-- <i class=\"fa\" [ngClass]=\"item.selected?'fa-check-square-o':'fa-square-o'\" (click)=\"item.selected = !item.selected\" aria-hidden=\"true\"></i> -->\n                        </td>\n                        <td>\n                            <img [src]=\"item?.user?.image ? item?.user?.image : item?.image| img:'small'\" class=\"rounded-circle\"\n                                    onerror='src=\"assets/img/default_img.png\"' alt=\"img\">\n                        </td>\n                        <td class=\"text-left\">\n                            <span class=\"name\">{{item.name | titlecase}}</span>\n                        </td>\n                        <td class=\"text-left\" *ngIf=\"item.phone\">{{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}</td>\n                        <td class=\"text-left\" *ngIf=\"!item.phone\">{{'table.tr.td.NA' | translate}}</td>\n                        <td class=\"text-left\">{{item.email}}</td>\n                        <td>\n                            <span *ngFor=\"let conf of item.configuration; let ii=index\">\n                                <app-property-configuration *ngIf=\"conf\" [configuration]=\"conf\"></app-property-configuration>\n                                <span *ngIf=\"ii<item?.configuration?.length-1\"> | </span> <br>\n                            </span>\n                            <span *ngIf=\"item.configuration?.length==0\">{{'table.tr.td.NA' | translate}}</span>\n                        </td>\n                        <td class=\"text-left\" title=\"{{'table.title.inhouseAgent' | translate}}\" *ngIf=\"item?.admin?.name\">{{item.broker.name | titlecase}}</td>\n                        <td class=\"text-left\" *ngIf=\"!item?.admin?.name\">{{'table.tr.td.notAssigned' | translate}}</td>\n                        <td class=\"text-left\" *ngIf=\"item.sale_rent\">{{item.sale_rent==1 ? ('leadDetails.buy' | translate) : ('table.tr.td.rent' | translate)}}</td>\n                        <td class=\"text-left\">\n                            <a *ngIf=\"admin?.admin_acl['Inhouse Agent Lead Management']?.can_update==0\" class=\"green-color fontW500\" href=\"javascript://\">\n                                {{'table.tr.td.changeTo' | translate}} {{item.sale_rent==1 ? ('table.tr.td.rent' | translate) : ('leadDetails.buy' | translate)}}\n                            </a>\n                            <a *ngIf=\"admin?.admin_acl['Inhouse Agent Lead Management']?.can_update==1\" class=\"green-color fontW500\" (click)=\"updateLeadType($event, item.sale_rent==1?'2':'1', item.id, in)\" href=\"javascript://\">\n                                {{'table.tr.td.changeTo' | translate}} {{item.sale_rent==1 ? ('table.tr.td.rent' | translate) : ('leadDetails.buy' | translate)}}\n                            </a>\n                        </td>\n                        <!-- <td>\n                            <a href=\"javascript://\" title=\"View Details\" routerLink=\"/dashboard/leads/inhouse-broker/{{item.id}}\" class=\"icon-block edit-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></a>\n                        </td> -->\n                        </tr>\n                    </table>\n                    <div class=\"padding20 center\" *ngIf=\"parameter.noResultFound\">\n                            <img src=\"assets/img/404-error.png\">\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"btn-cont marginT15\" *ngIf=\"parameter.total\">\n        <div class=\"row\">\n            <div class=\"col-6\">\n                <div class=\"title-group\">\n                        <p>{{'table.pagination.showing' | translate}} {{items?.length}} {{'table.pagination.outof' | translate}} {{parameter.total}}</p>\n                </div>\n            </div>\n            <div class=\"col-6 text-right\">\n                <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n            </div>\n        </div>\n    </div>\n</div>\n\n\n\n<!-- Assignment model -->\n<a data-toggle=\"modal\" data-target=\"#assign-model\" #openAssignModel></a>\n<div class=\"modal\" id=\"assign-model\">\n        <div class=\"modal-dialog \">\n            <div class=\"modal-content notary-avail\">\n                <div class=\"modal-header popup-header\">\n                <h4 class=\"modal-title\">{{'leads.reAssignTo' | translate}}</h4>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #closeAssignModel>&times;</button>\n                </div>\n                <div class=\"modal-body\">\n                    <div class=\"row\">\n                        <div class=\"col-md-8 col-6\">\n                            <input style=\"max-width:200px\" list=\"amenities\" [(ngModel)]=\"assign.keyword\" (keyup.enter)=\"getAssignListing()\" class=\"form-control\" type=\"text\" name=\"keyword\" placeholder=\"{{'addForm.placeholder.search' | translate}}\">\n                        </div>\n                        <div class=\"col-md-4 col-5 btn-cont\">\n                            <a class=\"btn btn-primary pull-right\" href=\"javascript://\" (click)=\"assignNow()\">{{'leads.assign' | translate}}</a>\n                        </div>\n                    </div>\n                    <div class=\"spacer40\"></div>\n                    <div class=\"modal-table-data\" malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\">\n                        <table class=\"table\">\n                            <tr *ngFor=\"let item of assign.items\">\n                                <td *ngIf=\"item.is_blocked!=1\">\n                                    <div class=\"n-avail-profile\">\n                                    <img [src]=\"item.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\">\n                                    <div class=\"n-avail-info\">\n                                        <p class=\"p12\">{{item.name | titlecase}}</p>\n                                        <p class=\"p10\">{{'leads.phone' | translate}} : {{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}</p>\n                                    </div>\n                                    </div>\n                                </td>\n                                <td *ngIf=\"item.is_blocked!=1\">\n                                    <label class=\"cust-check-bx float-right\">\n                                        <input type=\"radio\" name=\"notary_id\" (click)=\"assignItem = item\">\n                                        <span class=\"checkmark\"></span>\n                                    </label>\n                                </td>\n                            </tr>\n                            <tr *ngIf=\"assign?.items?.length==0\">\n                                <p class=\"show-not-found\">{{'leads.noInhouseAgent' | translate}}</p>\n                            </tr>\n                        </table>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    "

/***/ }),

/***/ "./src/app/layout/leads/inhouse-broker/inhouse-broker.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/layout/leads/inhouse-broker/inhouse-broker.component.ts ***!
  \*************************************************************************/
/*! exports provided: InhouseBrokerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InhouseBrokerComponent", function() { return InhouseBrokerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var src_app_services_leads_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/leads.service */ "./src/app/services/leads.service.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var InhouseBrokerComponent = /** @class */ (function () {
    function InhouseBrokerComponent(admin, leadsService, constant, route, spinner, translate) {
        this.admin = admin;
        this.leadsService = leadsService;
        this.constant = constant;
        this.route = route;
        this.spinner = spinner;
        this.translate = translate;
        this.scrollbarOptions = { axis: 'y', theme: 'dark' };
        this.parameter = {};
        this.location = {};
        this.assign = {};
        this.items = [];
        this.today = new Date();
        this.users = [];
        this.initSelection = false;
        this.dash = {
            lead_total: 0,
            lead_lead_properties: 0,
            lead_open: 0,
            lead_closed: 0
        };
        this.chartView = [];
    }
    InhouseBrokerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.locale = {
            firstDayOfWeek: 0,
            dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
            dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
            dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
            monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
            monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun',
                'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
            today: 'Hoy',
            clear: 'Clara',
            dateFormat: 'mm/dd/yy',
            weekHeader: 'Wk'
        };
        this.parameter.is_selected = false;
        this.parameter.keyword = '';
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        this.parameter.flag = this.leadsService.inhouseAgentLeadsFlag ? this.leadsService.inhouseAgentLeadsFlag : this.constant.flag;
        this.parameter.total = 0;
        this.parameter.count_flag = this.leadsService.inhouseAgentLeadsCountFlag ?
            this.leadsService.inhouseAgentLeadsCountFlag : this.constant.count_flag;
        this.route.params.subscribe(function (params) {
            _this.parameter.assignee_id = params.id;
        });
        this.getCountries();
        this.getListing();
        this.getCSRDashBoardData();
        Object.assign(this, this.chartView);
    };
    InhouseBrokerComponent.prototype.getCountries = function () {
        var _this = this;
        this.admin.postDataApi('getCountryLocality', {}).subscribe(function (r) {
            _this.location.countries = r['data'];
        });
    };
    InhouseBrokerComponent.prototype.onCountryChange = function (id) {
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
    InhouseBrokerComponent.prototype.onStateChange = function (id) {
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
    InhouseBrokerComponent.prototype.onCityChange = function (id) {
        if (!id || id === '0') {
            this.parameter.locality_id = '0';
            return false;
        }
        this.parameter.city_id = id;
        var selectedCountry = this.location.cities.filter(function (x) { return x.id.toString() === id; });
        this.location.localities = selectedCountry[0].localities;
    };
    InhouseBrokerComponent.prototype.onLocalityChange = function (id) {
        if (!id || id === '0') {
            return false;
        }
        this.parameter.locality_id = id;
        // this.getCsrListing();
    };
    InhouseBrokerComponent.prototype.changeFlag = function (flag) {
        this.parameter.flag = flag;
        this.leadsService.inhouseAgentLeadsFlag = flag;
        this.parameter.count_flag = 1;
        this.resetDates();
        this.getListing();
        this.getCSRDashBoardData();
    };
    InhouseBrokerComponent.prototype.changeFilter = function (key, value) {
        this.parameter[key] = value;
        this.getListing();
    };
    InhouseBrokerComponent.prototype.changeCountFlag = function (flag) {
        this.parameter.count_flag = flag;
        this.leadsService.inhouseAgentLeadsCountFlag = flag;
        this.getListing();
    };
    InhouseBrokerComponent.prototype.getCsrListing = function () {
        var _this = this;
        this.initSelection = true;
        this.users = [];
        var input = new FormData();
        if (this.parameter.keyword) {
            input.append('keyword', this.parameter.keyword);
        }
        // if (this.parameter.country_id && this.parameter.country_id !== '-1') {
        //   input.append('countries', JSON.stringify([this.parameter.country_id]));
        // }
        // if (this.parameter.state_id && this.parameter.state_id !== '-1') {
        //   input.append('states', JSON.stringify([this.parameter.state_id]));
        // }
        // if (this.parameter.city_id && this.parameter.city_id !== '-1') {
        //   input.append('cities', JSON.stringify([this.parameter.city_id]));
        // }
        // if (this.parameter.locality_id && this.parameter.locality_id !== '-1') {
        //   input.append('localities', JSON.stringify([this.parameter.locality_id]));
        // }
        this.admin.postDataApi('getInhouseBroker', input).subscribe(function (success) {
            _this.users = success.data;
        });
    };
    InhouseBrokerComponent.prototype.resetFilters = function () {
        this.location.countries = JSON.parse(JSON.stringify(this.location.countries));
        this.onCountryChange('0');
        this.parameter.is_selected = false;
        this.parameter.page = this.constant.p;
        this.parameter.flag = 2;
        this.parameter.total = 0;
        // this.selectedUser = '';
        this.parameter.keyword = '';
        this.parameter.count_flag = 1;
        this.getListing();
        this.resetDates();
        this.getCSRDashBoardData();
    };
    InhouseBrokerComponent.prototype.resetDates = function () {
        this.parameter.min = '';
        this.parameter.max = '';
    };
    InhouseBrokerComponent.prototype.closeCsrListing = function () {
        var _this = this;
        setTimeout(function () {
            _this.users = [];
        }, 200);
    };
    InhouseBrokerComponent.prototype.selectCsrUser = function (user) {
        this.selectedUser = user;
        this.users = [];
        this.parameter.keyword = '';
        this.initSelection = false;
        this.getListing();
        this.getCSRDashBoardData();
    };
    InhouseBrokerComponent.prototype.removeCsrUser = function () {
        this.selectedUser = '';
        this.parameter.keyword = '';
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        // this.parameter.flag = 2;
        this.parameter.total = 0;
        this.parameter.count_flag = 1;
        this.getListing();
        this.getCSRDashBoardData();
    };
    InhouseBrokerComponent.prototype.getCSRDashBoardData = function () {
        var _this = this;
        // const input = new FormData();
        // if (this.selectedUser) {
        //   input.append('assignee_id', this.selectedUser.id);
        // } else if (this.parameter.assignee_id) {
        //   input.append('assignee_id', this.parameter.assignee_id);
        // }
        // if (this.parameter.flag) {
        //   input.append('flag', this.parameter.flag.toString());
        // }
        var input = JSON.parse(JSON.stringify(this.parameter));
        if (this.parameter.min) {
            input.min = moment__WEBPACK_IMPORTED_MODULE_2__(this.parameter.min).format('YYYY-MM-DD');
        }
        else {
            delete input.min;
        }
        if (this.parameter.max) {
            input.max = moment__WEBPACK_IMPORTED_MODULE_2__(this.parameter.max).format('YYYY-MM-DD');
        }
        else {
            delete input.max;
        }
        if (this.selectedUser) {
            input.assignee_id = this.selectedUser.id;
        }
        else if (this.parameter.assignee_id) {
            input.assignee_id = this.parameter.assignee_id;
        }
        this.admin.postDataApi('leads/in-house-broker-dash-count', input).subscribe(function (r) {
            _this.dash = r.data;
            _this.chartView = [
                // {
                //   'name': 'Total Leads',
                //   'value': parseInt(this.dash.lead_total, 10)
                // },
                {
                    'name': _this.translate.instant('leads.properties'),
                    'value': parseInt(_this.dash.lead_properties, 10)
                },
                {
                    'name': _this.translate.instant('leads.leadsOpen'),
                    'value': parseInt(_this.dash.lead_open, 10)
                },
                {
                    'name': _this.translate.instant('leads.dealFinalised'),
                    'value': parseInt(_this.dash.lead_closed, 10)
                }
            ];
        });
    };
    InhouseBrokerComponent.prototype.getListing = function () {
        var _this = this;
        this.items = [];
        this.parameter.noResultFound = false;
        var input = JSON.parse(JSON.stringify(this.parameter));
        if (this.parameter.min) {
            input.min = moment__WEBPACK_IMPORTED_MODULE_2__(this.parameter.min).format('YYYY-MM-DD');
        }
        if (this.parameter.max) {
            input.max = moment__WEBPACK_IMPORTED_MODULE_2__(this.parameter.max).format('YYYY-MM-DD');
        }
        if (this.selectedUser) {
            input.assignee_id = this.selectedUser.id;
        }
        else if (this.parameter.assignee_id) {
            input.assignee_id = this.parameter.assignee_id;
        }
        this.spinner.show();
        this.admin.postDataApi('leads/in-house-broker', input).subscribe(function (success) {
            _this.spinner.hide();
            _this.items = success.data;
            if (_this.items.length <= 0) {
                _this.parameter.noResultFound = true;
            }
            _this.parameter.total = success.total_count;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    InhouseBrokerComponent.prototype.getPage = function (page) {
        this.parameter.page = page;
        this.getListing();
    };
    InhouseBrokerComponent.prototype.sort_by = function (sort_by_flag) {
        if (this.parameter.sort_by_flag !== sort_by_flag) {
            this.parameter.sort_by_flag = sort_by_flag;
            this.parameter.sort_by_order = 0;
        }
        else {
            this.parameter.sort_by_order = this.parameter.sort_by_order ? 0 : 1;
        }
        this.getListing();
    };
    InhouseBrokerComponent.prototype.updateLeadType = function ($event, sale_rent, lead_id, index) {
        var _this = this;
        $event.stopPropagation();
        this.parameter.url = 'leads/updateLeadType';
        swal({
            html: this.translate.instant('message.error.areYouSure') + '<br>' +
                this.translate.instant('message.error.wantToChangeAvailablity'),
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.spinner.show();
                _this.admin.postDataApi(_this.parameter.url, { sale_rent: sale_rent, lead_id: lead_id })
                    .subscribe(function (success) {
                    _this.spinner.hide();
                    _this.items[index].sale_rent = sale_rent;
                    swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.availablityChangedSuccessfully'), 'success');
                }, function (error) {
                    _this.spinner.hide();
                });
            }
        });
    };
    InhouseBrokerComponent.prototype.selectAll = function (is_selected) {
        var _this = this;
        this.parameter.is_selected = !is_selected;
        this.items.forEach(function (item) {
            item.selected = _this.parameter.is_selected;
        });
    };
    InhouseBrokerComponent.prototype.bulkAssign = function () {
        // this.assign.keyword = '';
        var leads_ids = this.items.filter(function (x) { return x.selected; }).map(function (y) { return y.id; });
        if (leads_ids.length === 0) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseAtleast1Lead'), 'error');
            return false;
        }
        if (!this.assign.items) {
            this.getAssignListing();
        }
        this.openAssignModel.nativeElement.click();
    };
    InhouseBrokerComponent.prototype.getAssignListing = function () {
        var _this = this;
        // this.assign.items = [];
        var input = {
            keyword: this.assign.keyword
        };
        this.spinner.show();
        this.admin.postDataApi('getInhouseBroker', input).subscribe(function (success) {
            _this.spinner.hide();
            _this.assign.items = success.data;
        });
    };
    InhouseBrokerComponent.prototype.assignNow = function () {
        var _this = this;
        var leads_ids = this.items.filter(function (x) { return x.selected; }).map(function (y) { return y.id; });
        var input = {
            broker_id: this.assignItem.id,
            leads: leads_ids
        };
        this.spinner.show();
        this.admin.postDataApi('leads/bulkAssignBroker', input).subscribe(function (r) {
            _this.spinner.hide();
            swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.assignedSuccessfully'), 'success');
            _this.closeAssignModel.nativeElement.click();
            _this.getListing();
        }, function (error) {
            _this.spinner.hide();
            _this.closeAssignModel.nativeElement.click();
            swal(_this.translate.instant('swal.error'), error.error.message, 'error');
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('openAssignModel'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], InhouseBrokerComponent.prototype, "openAssignModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('closeAssignModel'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], InhouseBrokerComponent.prototype, "closeAssignModel", void 0);
    InhouseBrokerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-inhouse-broker',
            template: __webpack_require__(/*! ./inhouse-broker.component.html */ "./src/app/layout/leads/inhouse-broker/inhouse-broker.component.html"),
            styles: [__webpack_require__(/*! ./inhouse-broker.component.css */ "./src/app/layout/leads/inhouse-broker/inhouse-broker.component.css")],
            providers: [src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["Constant"]]
        }),
        __metadata("design:paramtypes", [src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_5__["AdminService"],
            src_app_services_leads_service__WEBPACK_IMPORTED_MODULE_6__["LeadsService"],
            src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["Constant"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateService"]])
    ], InhouseBrokerComponent);
    return InhouseBrokerComponent;
}());



/***/ }),

/***/ "./src/app/layout/leads/leads.component.css":
/*!**************************************************!*\
  !*** ./src/app/layout/leads/leads.component.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9sZWFkcy9sZWFkcy5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/layout/leads/leads.component.html":
/*!***************************************************!*\
  !*** ./src/app/layout/leads/leads.component.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/layout/leads/leads.component.ts":
/*!*************************************************!*\
  !*** ./src/app/layout/leads/leads.component.ts ***!
  \*************************************************/
/*! exports provided: LeadsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LeadsComponent", function() { return LeadsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LeadsComponent = /** @class */ (function () {
    function LeadsComponent() {
    }
    LeadsComponent.prototype.ngOnInit = function () { };
    LeadsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-leads',
            template: __webpack_require__(/*! ./leads.component.html */ "./src/app/layout/leads/leads.component.html"),
            styles: [__webpack_require__(/*! ./leads.component.css */ "./src/app/layout/leads/leads.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], LeadsComponent);
    return LeadsComponent;
}());



/***/ }),

/***/ "./src/app/layout/leads/leads.module.ts":
/*!**********************************************!*\
  !*** ./src/app/layout/leads/leads.module.ts ***!
  \**********************************************/
/*! exports provided: LeadsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LeadsModule", function() { return LeadsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ng2_tel_input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng2-tel-input */ "./node_modules/ng2-tel-input/ng2-tel-input.js");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var ngx_malihu_scrollbar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-malihu-scrollbar */ "./node_modules/ngx-malihu-scrollbar/fesm5/ngx-malihu-scrollbar.js");
/* harmony import */ var ng2_nouislider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng2-nouislider */ "./node_modules/ng2-nouislider/ng2-nouislider.es5.js");
/* harmony import */ var ng_multiselect_dropdown__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ng-multiselect-dropdown */ "./node_modules/ng-multiselect-dropdown/fesm5/ng-multiselect-dropdown.js");
/* harmony import */ var ng_lazyload_image__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ng-lazyload-image */ "./node_modules/ng-lazyload-image/fesm5/ng-lazyload-image.js");
/* harmony import */ var _swimlane_ngx_charts__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @swimlane/ngx-charts */ "./node_modules/@swimlane/ngx-charts/release/esm.js");
/* harmony import */ var primeng_primeng__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! primeng/primeng */ "./node_modules/primeng/primeng.js");
/* harmony import */ var primeng_primeng__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(primeng_primeng__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _pipes_remove_comma_pipe__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./../../pipes/remove-comma.pipe */ "./src/app/pipes/remove-comma.pipe.ts");
/* harmony import */ var _leads_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./leads.component */ "./src/app/layout/leads/leads.component.ts");
/* harmony import */ var _data_collector_data_collector_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./data-collector/data-collector.component */ "./src/app/layout/leads/data-collector/data-collector.component.ts");
/* harmony import */ var _csr_seller_csr_seller_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./csr-seller/csr-seller.component */ "./src/app/layout/leads/csr-seller/csr-seller.component.ts");
/* harmony import */ var _csr_buyer_csr_buyer_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./csr-buyer/csr-buyer.component */ "./src/app/layout/leads/csr-buyer/csr-buyer.component.ts");
/* harmony import */ var _inhouse_broker_inhouse_broker_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./inhouse-broker/inhouse-broker.component */ "./src/app/layout/leads/inhouse-broker/inhouse-broker.component.ts");
/* harmony import */ var _csr_closer_csr_closer_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./csr-closer/csr-closer.component */ "./src/app/layout/leads/csr-closer/csr-closer.component.ts");
/* harmony import */ var _csr_buyer_csr_buyer_detail_csr_buyer_detail_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./csr-buyer/csr-buyer-detail/csr-buyer-detail.component */ "./src/app/layout/leads/csr-buyer/csr-buyer-detail/csr-buyer-detail.component.ts");
/* harmony import */ var _inhouse_broker_inhouse_broker_detail_inhouse_broker_detail_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./inhouse-broker/inhouse-broker-detail/inhouse-broker-detail.component */ "./src/app/layout/leads/inhouse-broker/inhouse-broker-detail/inhouse-broker-detail.component.ts");
/* harmony import */ var _csr_closer_csr_closer_detail_csr_closer_detail_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./csr-closer/csr-closer-detail/csr-closer-detail.component */ "./src/app/layout/leads/csr-closer/csr-closer-detail/csr-closer-detail.component.ts");
/* harmony import */ var _inhouse_broker_inhouse_broker_detail_my_chat_my_chat_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./inhouse-broker/inhouse-broker-detail/my-chat/my-chat.component */ "./src/app/layout/leads/inhouse-broker/inhouse-broker-detail/my-chat/my-chat.component.ts");
/* harmony import */ var _guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../guards/acl-user.guard */ "./src/app/guards/acl-user.guard.ts");
/* harmony import */ var _modules_shared_module__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../../modules/shared.module */ "./src/app/modules/shared.module.ts");
/* harmony import */ var _csr_seller_csr_seller_detail_csr_seller_detail_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./csr-seller/csr-seller-detail/csr-seller-detail.component */ "./src/app/layout/leads/csr-seller/csr-seller-detail/csr-seller-detail.component.ts");
/* harmony import */ var _csr_seller_csr_seller_detail_seller_chat_seller_chat_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./csr-seller/csr-seller-detail/seller-chat/seller-chat.component */ "./src/app/layout/leads/csr-seller/csr-seller-detail/seller-chat/seller-chat.component.ts");
/* harmony import */ var _outside_broker_outside_broker_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./outside-broker/outside-broker.component */ "./src/app/layout/leads/outside-broker/outside-broker.component.ts");
/* harmony import */ var _outside_broker_outside_broker_detail_outside_broker_detail_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./outside-broker/outside-broker-detail/outside-broker-detail.component */ "./src/app/layout/leads/outside-broker/outside-broker-detail/outside-broker-detail.component.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _csr_renter_csr_renter_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./csr-renter/csr-renter.component */ "./src/app/layout/leads/csr-renter/csr-renter.component.ts");
/* harmony import */ var _credit_agent_credit_agent_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./credit-agent/credit-agent.component */ "./src/app/layout/leads/credit-agent/credit-agent.component.ts");
/* harmony import */ var _collection_agent_collection_agent_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./collection-agent/collection-agent.component */ "./src/app/layout/leads/collection-agent/collection-agent.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// third party libraries













// general components





















var routes = [
    {
        path: 'data-collectors', component: _data_collector_data_collector_component__WEBPACK_IMPORTED_MODULE_15__["DataCollectorComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_24__["AclUserGuard"]], data: { roles: ['Data Collector Lead Management', 'can_read', 'can_data_collector'] }
    },
    {
        path: 'csr-renters', component: _csr_renter_csr_renter_component__WEBPACK_IMPORTED_MODULE_31__["CsrRenterComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_24__["AclUserGuard"]], data: { roles: ['Renter Lead Management', 'can_read', 'can_csr_renter'] }
    },
    {
        path: 'credit-agents', component: _credit_agent_credit_agent_component__WEBPACK_IMPORTED_MODULE_32__["CreditAgentComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_24__["AclUserGuard"]], data: { roles: ['Credit Agent Lead Management', 'can_read', 'can_credit_agent'] }
    },
    // lead wrt credit-agents
    {
        path: 'credit-agents-leads/:id', component: _credit_agent_credit_agent_component__WEBPACK_IMPORTED_MODULE_32__["CreditAgentComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_24__["AclUserGuard"]], data: { roles: ['Credit Agent Lead Management', 'can_read', 'can_credit_agent'] }
    },
    {
        path: 'collection-agents', component: _csr_renter_csr_renter_component__WEBPACK_IMPORTED_MODULE_31__["CsrRenterComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_24__["AclUserGuard"]], data: { roles: ['Renter Lead Management', 'can_read', 'can_csr_renter'] }
    },
    {
        path: 'csr-sellers', component: _csr_seller_csr_seller_component__WEBPACK_IMPORTED_MODULE_16__["CsrSellerComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_24__["AclUserGuard"]], data: { roles: ['Seller Lead Management', 'can_read', 'can_csr_seller'] }
    },
    // lead wrt seller
    {
        path: 'csr-sellers-leads/:id', component: _csr_seller_csr_seller_component__WEBPACK_IMPORTED_MODULE_16__["CsrSellerComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_24__["AclUserGuard"]], data: { roles: ['Seller Lead Management', 'can_read', 'can_csr_seller'] }
    },
    // lead details
    {
        path: 'csr-sellers/:id', component: _csr_seller_csr_seller_detail_csr_seller_detail_component__WEBPACK_IMPORTED_MODULE_26__["CsrSellerDetailComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_24__["AclUserGuard"]], data: { roles: ['Seller Lead Management', 'can_read', 'can_csr_seller'] }
    },
    {
        path: 'chat-with-seller/:chat_with/:assigned_csr_seller_id/:seller_id', component: _csr_seller_csr_seller_detail_seller_chat_seller_chat_component__WEBPACK_IMPORTED_MODULE_27__["SellerChatComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_24__["AclUserGuard"]], data: { roles: ['Seller Lead Management', 'can_read', 'can_csr_seller'] }
    },
    {
        path: 'csr-buyers', component: _csr_buyer_csr_buyer_component__WEBPACK_IMPORTED_MODULE_17__["CsrBuyerComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_24__["AclUserGuard"]], data: { roles: ['Buyer Lead Management', 'can_read', 'can_csr_buyer'] }
    },
    // lead wrt buyer
    {
        path: 'csr-buyers-leads/:id', component: _csr_buyer_csr_buyer_component__WEBPACK_IMPORTED_MODULE_17__["CsrBuyerComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_24__["AclUserGuard"]], data: { roles: ['Buyer Lead Management', 'can_read', 'can_csr_buyer'] }
    },
    // lead details
    {
        path: 'csr-buyers/:id', component: _csr_buyer_csr_buyer_detail_csr_buyer_detail_component__WEBPACK_IMPORTED_MODULE_20__["CsrBuyerDetailComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_24__["AclUserGuard"]], data: { roles: ['Buyer Lead Management', 'can_read', 'can_csr_buyer'] }
    },
    {
        path: 'inhouse-broker', component: _inhouse_broker_inhouse_broker_component__WEBPACK_IMPORTED_MODULE_18__["InhouseBrokerComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_24__["AclUserGuard"]], data: { roles: ['Inhouse Agent Lead Management', 'can_read', 'can_in_house_broker'] }
    },
    // leads wrt inhouse broker
    {
        path: 'inhouse-broker-leads/:id', component: _inhouse_broker_inhouse_broker_component__WEBPACK_IMPORTED_MODULE_18__["InhouseBrokerComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_24__["AclUserGuard"]], data: { roles: ['Inhouse Agent Lead Management', 'can_read', 'can_in_house_broker'] }
    },
    // lead details
    {
        path: 'inhouse-broker/:id', component: _inhouse_broker_inhouse_broker_detail_inhouse_broker_detail_component__WEBPACK_IMPORTED_MODULE_21__["InhouseBrokerDetailComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_24__["AclUserGuard"]], data: { roles: ['Inhouse Agent Lead Management', 'can_read', 'can_in_house_broker'] }
    },
    {
        path: 'chat-list/:type/:id', component: _inhouse_broker_inhouse_broker_detail_my_chat_my_chat_component__WEBPACK_IMPORTED_MODULE_23__["MyChatComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_24__["AclUserGuard"]], data: { roles: ['Inhouse Agent Lead Management', 'can_read', 'can_in_house_broker'] }
    },
    // {
    //   path: 'chat-with-csr-seller/:type/:id', component: MyChatComponent,
    //   canActivate: [AclUserGuard], data: { roles: ['Inhouse Agent Lead Management', 'can_read', 'can_in_house_broker'] }
    // },
    {
        path: 'outside-broker', component: _outside_broker_outside_broker_component__WEBPACK_IMPORTED_MODULE_28__["OutsideBrokerComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_24__["AclUserGuard"]], data: { roles: ['Outside Agent Lead Management', 'can_read', 'can_in_house_broker'] }
    },
    // leads wrt inhouse broker
    {
        path: 'outside-broker-leads/:id', component: _outside_broker_outside_broker_component__WEBPACK_IMPORTED_MODULE_28__["OutsideBrokerComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_24__["AclUserGuard"]], data: { roles: ['Outside Agent Lead Management', 'can_read', 'can_in_house_broker'] }
    },
    // lead details
    {
        path: 'outside-broker/:id', component: _outside_broker_outside_broker_detail_outside_broker_detail_component__WEBPACK_IMPORTED_MODULE_29__["OutsideBrokerDetailComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_24__["AclUserGuard"]], data: { roles: ['Outside Agent Lead Management', 'can_read', 'can_in_house_broker'] }
    },
    {
        path: 'csr-closers', component: _csr_closer_csr_closer_component__WEBPACK_IMPORTED_MODULE_19__["CsrCloserComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_24__["AclUserGuard"]], data: { roles: ['Closer Lead Management', 'can_read', 'can_csr_closer'] }
    },
    // leads wrt closure
    {
        path: 'csr-closers-leads/:id', component: _csr_closer_csr_closer_component__WEBPACK_IMPORTED_MODULE_19__["CsrCloserComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_24__["AclUserGuard"]], data: { roles: ['Closer Lead Management', 'can_read', 'can_csr_closer'] }
    },
    // lead details
    {
        path: 'csr-closers/:id', component: _csr_closer_csr_closer_detail_csr_closer_detail_component__WEBPACK_IMPORTED_MODULE_22__["CsrCloserDetailComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_24__["AclUserGuard"]], data: { roles: ['Closer Lead Management', 'can_read', 'can_csr_closer'] }
    }
];
var LeadsModule = /** @class */ (function () {
    function LeadsModule() {
    }
    LeadsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes),
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerModule"],
                ngx_pagination__WEBPACK_IMPORTED_MODULE_6__["NgxPaginationModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
                ng2_tel_input__WEBPACK_IMPORTED_MODULE_5__["Ng2TelInputModule"],
                ngx_malihu_scrollbar__WEBPACK_IMPORTED_MODULE_7__["MalihuScrollbarModule"].forRoot(),
                ng_lazyload_image__WEBPACK_IMPORTED_MODULE_10__["LazyLoadImageModule"],
                ng2_nouislider__WEBPACK_IMPORTED_MODULE_8__["NouisliderModule"],
                ng_multiselect_dropdown__WEBPACK_IMPORTED_MODULE_9__["NgMultiSelectDropDownModule"].forRoot(),
                _swimlane_ngx_charts__WEBPACK_IMPORTED_MODULE_11__["NgxChartsModule"],
                _modules_shared_module__WEBPACK_IMPORTED_MODULE_25__["SharedModule"],
                primeng_primeng__WEBPACK_IMPORTED_MODULE_12__["CalendarModule"],
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_30__["TranslateModule"]
                // LayoutModule
                // NgBoxModule
            ],
            declarations: [
                _leads_component__WEBPACK_IMPORTED_MODULE_14__["LeadsComponent"],
                _data_collector_data_collector_component__WEBPACK_IMPORTED_MODULE_15__["DataCollectorComponent"],
                _csr_seller_csr_seller_component__WEBPACK_IMPORTED_MODULE_16__["CsrSellerComponent"],
                _csr_seller_csr_seller_detail_csr_seller_detail_component__WEBPACK_IMPORTED_MODULE_26__["CsrSellerDetailComponent"],
                _csr_buyer_csr_buyer_component__WEBPACK_IMPORTED_MODULE_17__["CsrBuyerComponent"],
                _inhouse_broker_inhouse_broker_component__WEBPACK_IMPORTED_MODULE_18__["InhouseBrokerComponent"],
                _csr_closer_csr_closer_component__WEBPACK_IMPORTED_MODULE_19__["CsrCloserComponent"],
                //CsrBuyerDetailComponent,
                _inhouse_broker_inhouse_broker_detail_inhouse_broker_detail_component__WEBPACK_IMPORTED_MODULE_21__["InhouseBrokerDetailComponent"],
                _csr_closer_csr_closer_detail_csr_closer_detail_component__WEBPACK_IMPORTED_MODULE_22__["CsrCloserDetailComponent"],
                // InterestedPropertyComponent,
                //ViewedPropertyComponent,
                //ViewedProjectsComponent,
                _pipes_remove_comma_pipe__WEBPACK_IMPORTED_MODULE_13__["RemoveCommaPipe"],
                //FillInformationComponent,
                _inhouse_broker_inhouse_broker_detail_my_chat_my_chat_component__WEBPACK_IMPORTED_MODULE_23__["MyChatComponent"],
                _csr_seller_csr_seller_detail_seller_chat_seller_chat_component__WEBPACK_IMPORTED_MODULE_27__["SellerChatComponent"],
                _outside_broker_outside_broker_component__WEBPACK_IMPORTED_MODULE_28__["OutsideBrokerComponent"],
                _outside_broker_outside_broker_detail_outside_broker_detail_component__WEBPACK_IMPORTED_MODULE_29__["OutsideBrokerDetailComponent"],
                _csr_renter_csr_renter_component__WEBPACK_IMPORTED_MODULE_31__["CsrRenterComponent"],
                _credit_agent_credit_agent_component__WEBPACK_IMPORTED_MODULE_32__["CreditAgentComponent"],
                _collection_agent_collection_agent_component__WEBPACK_IMPORTED_MODULE_33__["CollectionAgentComponent"]
            ],
        })
    ], LeadsModule);
    return LeadsModule;
}());



/***/ }),

/***/ "./src/app/layout/leads/outside-broker/outside-broker-detail/outside-broker-detail.component.css":
/*!*******************************************************************************************************!*\
  !*** ./src/app/layout/leads/outside-broker/outside-broker-detail/outside-broker-detail.component.css ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9sZWFkcy9vdXRzaWRlLWJyb2tlci9vdXRzaWRlLWJyb2tlci1kZXRhaWwvb3V0c2lkZS1icm9rZXItZGV0YWlsLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/layout/leads/outside-broker/outside-broker-detail/outside-broker-detail.component.html":
/*!********************************************************************************************************!*\
  !*** ./src/app/layout/leads/outside-broker/outside-broker-detail/outside-broker-detail.component.html ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  outside-broker-detail works!\n</p>\n"

/***/ }),

/***/ "./src/app/layout/leads/outside-broker/outside-broker-detail/outside-broker-detail.component.ts":
/*!******************************************************************************************************!*\
  !*** ./src/app/layout/leads/outside-broker/outside-broker-detail/outside-broker-detail.component.ts ***!
  \******************************************************************************************************/
/*! exports provided: OutsideBrokerDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OutsideBrokerDetailComponent", function() { return OutsideBrokerDetailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var OutsideBrokerDetailComponent = /** @class */ (function () {
    function OutsideBrokerDetailComponent() {
    }
    OutsideBrokerDetailComponent.prototype.ngOnInit = function () {
    };
    OutsideBrokerDetailComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-outside-broker-detail',
            template: __webpack_require__(/*! ./outside-broker-detail.component.html */ "./src/app/layout/leads/outside-broker/outside-broker-detail/outside-broker-detail.component.html"),
            styles: [__webpack_require__(/*! ./outside-broker-detail.component.css */ "./src/app/layout/leads/outside-broker/outside-broker-detail/outside-broker-detail.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], OutsideBrokerDetailComponent);
    return OutsideBrokerDetailComponent;
}());



/***/ }),

/***/ "./src/app/layout/leads/outside-broker/outside-broker.component.css":
/*!**************************************************************************!*\
  !*** ./src/app/layout/leads/outside-broker/outside-broker.component.css ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9sZWFkcy9vdXRzaWRlLWJyb2tlci9vdXRzaWRlLWJyb2tlci5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/layout/leads/outside-broker/outside-broker.component.html":
/*!***************************************************************************!*\
  !*** ./src/app/layout/leads/outside-broker/outside-broker.component.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container-fluid\">\n    <div class=\"row\">\n        <div class=\"col-md-4\">\n            <div class=\"form-group\">\n                    <p class=\"p16\">{{'leads.outsideAgentLeads' | translate}}</p>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-md-4\">\n            <div class=\"form-group\" *ngIf=\"admin?.admin_acl['Outside Agent Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n                <div class=\"d-flex\">\n                <!-- <button (click)=\"removeCsrUser()\" class=\"all-btn\">All</button> -->\n                <div class=\"autocomplete\">\n                    <input placeholder=\"{{'addForm.placeholder.searchOutsideAgent' | translate}}\" style=\"max-width:200px\" list=\"amenities\" [(ngModel)]=\"parameter.keyword\" (input)=\"getCsrListing()\" class=\"form-control\" type=\"text\" name=\"keyword\" (focusout)=\"closeCsrListing()\">\n                    <div id=\"myInputautocomplete-list\" class=\"autocomplete-items\">\n                        <div *ngFor=\"let item of users\" (click)=\"selectCsrUser(item)\">{{item.email}}</div>\n                    </div>\n                </div>\n                \n                </div>\n            </div>\n        </div>\n        <div class=\"col-md-8 col-12\">\n            <div class=\"cust-tabs-2\">\n                <ul class=\"nav nav-tabs\">\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==1}\" (click)=\"changeFlag(1)\" >{{'filters.time.thisWeek' | translate}}</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==2}\" (click)=\"changeFlag(2)\" >{{'filters.time.thisMonth' | translate}}</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==3}\" (click)=\"changeFlag(3)\" >{{'filters.time.lastMonth' | translate}}</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==4}\" (click)=\"changeFlag(4)\" >{{'filters.time.lifetime' | translate}}</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==5}\" (click)=\"parameter.flag=5\" >{{'filters.time.custom.label' | translate}}</a>\n                </li>\n                </ul>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-12\">\n            <div *ngIf=\"parameter.flag == 5\" class=\"row\">\n                <div class=\"offset-lg-7\"></div>\n                <div class=\"col-lg-2 col-md-2 col-sm-5 col-5\">\n                <div class=\"form-group marginB0\">\n                        <label>{{'filters.time.custom.from' | translate}}:</label>\n                    <p-calendar [locale]=\"locale\" showIcon=\"true\" [(ngModel)]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2040\"></p-calendar>\n                </div>\n                </div>\n                <div class=\"col-lg-2 col-md-2 col-sm-5 col-5\">\n                <div class=\"form-group marginB0\">\n                        <label>{{'filters.time.custom.to' | translate}}:</label>\n                    <p-calendar [locale]=\"locale\" showIcon=\"true\" [(ngModel)]=\"parameter.max\" [minDate]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2040\"></p-calendar>\n                </div>\n                </div>\n                <div class=\"col-lg-1 col-md-2 col-sm-2 col-6\">\n                <div class=\"form-group btn-cont\">\n                    <label class=\"addMT3\">&nbsp;</label>\n                    <button class=\"btn btn-calender\" href=\"javascript://\" (click)=\"getListing(); getCSRDashBoardData();\"\n                        [disabled]=\"!parameter.min || !parameter.max\">{{'filters.time.custom.applyBtn' | translate}}</button>\n                </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"listingResults\" >\n        <div class=\"row\" *ngIf=\"admin?.admin_acl['Outside Agent Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n            <div class=\"col-md-2\">\n                <div class=\"form-group\">\n                        <label>{{'filters.location.country' | translate}}</label>\n                    <select class=\"form-control\" (change)=\"onCountryChange($event.target.value)\">\n                            <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n                        <option *ngFor=\"let item of location.countries\" [value]=\"item.id\">{{item.name}}</option>\n                    </select>\n                </div>\n            </div>\n            <div class=\"col-md-2\">\n                <div class=\"form-group\">\n                        <label>{{'filters.location.state' | translate}}</label>\n                <select class=\"form-control\" (change)=\"onStateChange($event.target.value)\">\n                        <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n                    <option *ngFor=\"let item of location.states\" [value]=\"item.id\">{{item.name}}</option>\n                </select>\n                </div>\n            </div>\n            <div class=\"col-md-2\">\n                <div class=\"form-group\">\n                        <label>{{'filters.location.city' | translate}}</label>\n                    <select class=\"form-control\" (change)=\"onCityChange($event.target.value)\">\n                            <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n                    <option *ngFor=\"let item of location.cities\" [value]=\"item.id\">{{item.name}}</option>\n                    </select>\n                </div>\n            </div>\n        \n            <div class=\"col-md-2\">\n                <div class=\"form-group\">\n                        <label>{{'filters.location.locality' | translate}}</label>\n                <select class=\"form-control\" (change)=\"onLocalityChange($event.target.value)\">\n                        <option value=\"0\">{{'filters.location.allOption' | translate}}</option>\n                    <option *ngFor=\"let item of location.localities\" [value]=\"item.id\">{{item.name}}</option>\n                </select>\n                </div>\n            </div>\n            <div class=\"col-md-2\">\n                <div class=\"form-group btn-cont\">\n                <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n                <button type=\"button\" (click)=\"getListing(); getCSRDashBoardData();\" class=\"btn btn-primary-new width100P\">{{'filters.location.applyBtn' | translate}}</button>\n                </div>\n            </div>\n    \n            <div class=\"col-md-2\">\n                <div class=\"form-group btn-cont\">\n                <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n                <button type=\"button\" (click)=\"resetFilters()\" class=\"btn btn-primary-new width100P\">{{'filters.location.resetBtn' | translate}}</button>\n                </div>\n            </div>\n        </div>\n\n        <div *ngIf=\"selectedUser as item\" class=\"sigle-row-table\">\n            <table class=\"table table-striped\">\n                <tbody>\n                    <tr>\n                        <td> <img class=\"rounded-circle\" [src]=\"item.image\" onerror='this.src=\"assets/img/default_img.png\"' alt=\"img\"></td>\n                        <td class=\"text-left\">\n                            <span class=\"name\">{{item.name | titlecase}}</span>\n                        </td>\n                        <td class=\"text-left\">\n                            {{item.phone}}\n                        </td>\n                        <td class=\"text-left\">\n                            {{item.email}}\n                        </td>\n                        <td>\n                            <a (click)=\"removeCsrUser()\" href=\"javascript://\" class=\"icon-block edit-icon\"><img src=\"assets/img/remove-icon.png\" alt=\"remove\" title=\"{{'table.title.remove' | translate}}\" /></a>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-lg-8 col-md-12 col-sm-12 col-12\">\n                <div class=\"info-box all-leads\">\n                <div class=\"row\">\n                    <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == 1}\" (click)=\"changeCountFlag(1)\">\n                        <div class=\"one-row \">\n                            <div class=\"o-block\">\n                            <h5>{{'table.th.leads' | translate}}</h5>\n                            <small>{{'table.th.total' | translate}}</small>\n                            </div>\n                            <div class=\"o-block\">\n                            <a class=\"view-all\" href=\"javascript://\">{{'table.th.viewAll' | translate}}</a>\n                            <h4>{{dash?.lead_total}}</h4>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == 2}\" (click)=\"changeCountFlag(2)\">\n                        <div class=\"one-row\">\n                            <div class=\"o-block\">\n                            <h5>{{'table.th.properties' | translate}}</h5>\n                            <small>{{'table.th.dealingIn' | translate}}</small>\n                            </div>\n                            <div class=\"o-block\">\n                            <a class=\"view-all\" href=\"javascript://\">{{'table.th.viewAll' | translate}}</a>\n                            <h4>{{dash?.lead_properties}}</h4>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                </div>\n                <div class=\"info-box all-leads\">\n                <div class=\"row\">\n                    <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == 3}\" (click)=\"changeCountFlag(3)\">\n                        <div class=\"one-row \">\n                            <div class=\"o-block\">\n                            <h5>{{'table.th.leads' | translate}}</h5>\n                            <small>{{'table.th.open' | translate}}</small>\n                            </div>\n                            <div class=\"o-block\">\n                            <a class=\"view-all\" href=\"javascript://\">{{'table.th.viewAll' | translate}}</a>\n                            <h4>{{dash?.lead_open}}</h4>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == 4}\" (click)=\"changeCountFlag(4)\">\n                        <div class=\"one-row\">\n                            <div class=\"o-block\">\n                            <h5>{{'table.th.leads' | translate}}</h5>\n                            <small>{{'table.th.dealFinalized' | translate}}</small>\n                            </div>\n                            <div class=\"o-block\">\n                            <a class=\"view-all\" href=\"javascript://\">{{'table.th.viewAll' | translate}}</a>\n                            <h4>{{dash?.lead_closed}}</h4>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                </div>\n        \n            </div>\n            <div class=\"col-lg-4 col-md-12 col-sm-12 col-12\">\n                <div class=\"chat-msg all-leads\" style=\"padding:0px\">\n                    <div class=\"padding20\" *ngIf=\"dash.lead_total == 0\">{{'message.error.noRecordFound' | translate}}</div>\n                    <ngx-charts-pie-chart [results]=\"chartView\"></ngx-charts-pie-chart>\n                </div>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-12\">\n                <div class=\"spacer40\"></div>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-lg-6 col-md-6 col-6\">\n                <div class=\"title-group\">\n                <h5>{{'table.th.leads' | translate}}\n                    <span *ngIf=\"parameter.count_flag == 1\">({{'table.th.total' | translate}})</span>\n                    <span *ngIf=\"parameter.count_flag == 2\">({{'table.th.propertyDealingIn' | translate}})</span>\n                    <span *ngIf=\"parameter.count_flag == 3\">({{'table.th.open' | translate}})</span>\n                    <span *ngIf=\"parameter.count_flag == 4\">({{'table.th.dealFinalized' | translate}})</span>\n                </h5>\n                </div>\n            </div>\n            <div class=\"col-lg-6 col-md-6 col-5\" *ngIf=\"admin?.admin_acl['Outside Agent Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n                <div class=\"add-new text-right\">\n                    <a class=\"btn\" (click)=\"bulkAssign()\" href=\"javascript://\">{{'table.th.bulkReassign' | translate}}</a>\n                </div>\n            </div>\n        </div>\n        <div class=\"white-bg\">\n            <div class=\"tabel-section\">\n                <div class=\"table-responsive\">\n                    <table class=\"table table-striped table-align-left vertical-align-top\">\n                        <tr>\n                            <th *ngIf=\"admin?.admin_acl['Outside Agent Lead Management']?.can_read==1 && !this.parameter.assignee_id\" style=\"width:6%\">\n                                <div class=\"table-search\">\n                                        <label>{{'table.th.all' | translate}}</label>\n                                    <div>\n                                        <label class=\"cust-check-bx\" >\n                                            <input class=\"width1\" type=\"checkbox\" (click)=\"selectAll(parameter.is_selected)\" name=\"document\">\n                                            <span class=\"checkmark\"></span>\n                                        </label>\n                                    </div>\n                                </div>\n                            </th>\n\n                            <th style=\"width:6%\">\n                                <div class=\"table-search\"></div>\n                            </th>\n                            <th style=\"width:15%\">\n                                <div class=\"table-search\">\n                                        <label>{{'table.th.name' | translate}}</label>\n                                    <div class=\"searh-3\">\n                                        <input autocomplete=\"off\" type=\"text\" [(ngModel)]=\"parameter.name\" (keyup.enter)=\"changeFilter('name',$event.target.value)\" name=\"\">\n                                        <button *ngIf=\"parameter.name\" (click)=\"changeFilter('name', parameter.name)\"><i class=\"fa fa-search\"></i></button>\n                                    </div>\n                                </div>\n                            </th>\n                            <th style=\"width:15%; text-align:left;\">\n                                <div class=\"table-search\">\n                                        <label>{{'table.th.contactNumber' | translate}}</label>\n                                    <div class=\"searh-3\">\n                                        <input autocomplete=\"off\" type=\"text\" [(ngModel)]=\"parameter.phone\" (keyup.enter)=\"changeFilter('phone',$event.target.value)\" name=\"\">\n                                        <button *ngIf=\"parameter.phone\" (click)=\"changeFilter('phone', parameter.phone)\"><i class=\"fa fa-search\"></i></button>\n                                    </div>\n                                </div>\n                            </th>\n                            <th style=\"width:20%\">\n                                <div class=\"table-search\">\n                                        <label>{{'table.th.emailAddress' | translate}}</label>\n                                    <div class=\"searh-3\">\n                                        <input autocomplete=\"off\" type=\"text\" [(ngModel)]=\"parameter.email\" (keyup.enter)=\"changeFilter('email',$event.target.value)\" name=\"\">\n                                        <button *ngIf=\"parameter.email\" (click)=\"changeFilter('email', parameter.email)\"><i class=\"fa fa-search\"></i></button>\n                                    </div>\n                                </div>\n                            </th>\n                            <th style=\"width:10%\">\n                                <div class=\"table-search\">\n                                        <label>{{'table.th.interestedIn' | translate}}</label>\n                                </div>\n                            </th>\n                            <th style=\"width:10%\">\n                                <div class=\"table-search\">\n                                        <label>{{'table.th.assignee' | translate}}</label>\n                                </div>\n                            </th>\n                            <th style=\"width:10%\">\n                                <div class=\"table-search\">\n                                        <label>{{'table.th.userChoice' | translate}}</label>\n                                </div>\n                            </th>\n                            <th style=\"width:10%\">\n                                <div class=\"table-search\">\n                                        <label>{{'table.th.changePropertyFor' | translate}}</label>\n                                </div>\n                            </th>\n                            <!-- <th style=\"width:4%\"></th> -->\n                        </tr>\n                        <tr class=\"cursor-pointer\" title=\"{{'table.title.clickToViewDetails' | translate}}\" *ngFor=\"let item of items| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: parameter.total }; let in=index\"\n                            routerLink=\"/dashboard/leads/inhouse-broker/{{item.id}}\">\n                        <td *ngIf=\"admin?.admin_acl['Outside Agent Lead Management']?.can_read==1 && !this.parameter.assignee_id\" (click)=\"$event.stopPropagation()\">\n                            <label class=\"cust-check-bx\" >\n                            <input type=\"checkbox\" [(ngModel)]=\"item.selected\" name=\"document\">\n                            <span class=\"checkmark\"></span>\n                            </label>\n                            <!-- <i class=\"fa\" [ngClass]=\"item.selected?'fa-check-square-o':'fa-square-o'\" (click)=\"item.selected = !item.selected\" aria-hidden=\"true\"></i> -->\n                        </td>\n                        <td>\n                            <img [src]=\"item?.user?.image ? item?.user?.image : item?.image| img:'small'\" class=\"rounded-circle\"\n                                    onerror='src=\"assets/img/default_img.png\"' alt=\"img\">\n                        </td>\n                        <td class=\"text-left\">\n                            <span class=\"name\">{{item.name | titlecase}}</span>\n                        </td>\n                        <td class=\"text-left\" *ngIf=\"item.phone\">{{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}</td>\n                        <td class=\"text-left\" *ngIf=\"!item.phone\">{{'table.tr.td.NA' | translate}}</td>\n                        <td class=\"text-left\">{{item.email}}</td>\n                        <td>\n                            <span *ngFor=\"let conf of item.configuration; let ii=index\">\n                                <app-property-configuration *ngIf=\"conf\" [configuration]=\"conf\"></app-property-configuration>\n                                <span *ngIf=\"ii<item?.configuration?.length-1\"> | </span> <br>\n                            </span>\n                            <span *ngIf=\"item.configuration?.length==0\">{{'table.tr.td.NA' | translate}}</span>\n                        </td>\n                        <td class=\"text-left\" title=\"{{'table.title.outsideAgent' | translate}}\" *ngIf=\"item?.broker?.name\">{{item.broker.name | titlecase}}</td>\n                        <td class=\"text-left\" *ngIf=\"!item?.admin?.name\">{{'table.tr.td.notAssigned' | translate}}</td>\n                        <td class=\"text-left\" *ngIf=\"item.sale_rent\">{{item.sale_rent==1 ? ('leadDetails.buy' | translate) : 'Rent'}}</td>\n                        <td class=\"text-left\">\n                            <a *ngIf=\"admin?.admin_acl['Outside Agent Lead Management']?.can_update==0\" class=\"green-color fontW500\" href=\"javascript://\">\n                                {{'table.tr.td.changeTo' | translate}} {{item.sale_rent==1 ? ('table.tr.td.rent' | translate) : ('leadDetails.buy' | translate)}}\n                            </a>\n                            <a *ngIf=\"admin?.admin_acl['Outside Agent Lead Management']?.can_update==1\" class=\"green-color fontW500\" (click)=\"updateLeadType($event, item.sale_rent==1?'2':'1', item.id, in)\" href=\"javascript://\">\n                                {{'table.tr.td.changeTo' | translate}} {{item.sale_rent==1 ? ('table.tr.td.rent' | translate) : ('leadDetails.buy' | translate)}}\n                            </a>\n                        </td>\n                        <!-- <td>\n                            <a href=\"javascript://\" title=\"View Details\" routerLink=\"/dashboard/leads/inhouse-broker/{{item.id}}\" class=\"icon-block edit-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></a>\n                        </td> -->\n                        </tr>\n                    </table>\n                    <div class=\"padding20 center\" *ngIf=\"parameter.noResultFound\">\n                            <img src=\"assets/img/404-error.png\">\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"btn-cont marginT15\" *ngIf=\"parameter.total\">\n        <div class=\"row\">\n            <div class=\"col-6\">\n                <div class=\"title-group\">\n                        <p>{{'table.pagination.showing' | translate}} {{items?.length}} {{'table.pagination.outof' | translate}} {{parameter.total}}</p>\n                </div>\n            </div>\n            <div class=\"col-6 text-right\">\n                <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n            </div>\n        </div>\n    </div>\n</div>\n\n\n\n<!-- Assignment model -->\n<a data-toggle=\"modal\" data-target=\"#assign-model\" #openAssignModel></a>\n<div class=\"modal\" id=\"assign-model\">\n        <div class=\"modal-dialog \">\n            <div class=\"modal-content notary-avail\">\n                <div class=\"modal-header popup-header\">\n                        <h4 class=\"modal-title\">{{'leads.reAssignTo' | translate}}</h4>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #closeAssignModel>&times;</button>\n                </div>\n                <div class=\"modal-body\">\n                    <div class=\"row\">\n                        <div class=\"col-md-8 col-6\">\n                            <input style=\"max-width:200px\" list=\"amenities\" [(ngModel)]=\"assign.keyword\" (keyup.enter)=\"getAssignListing()\" class=\"form-control\" type=\"text\" name=\"keyword\" placeholder=\"{{'addForm.placeholder.search' | translate}}\">\n                        </div>\n                        <div class=\"col-md-4 col-5 btn-cont\">\n                            <a class=\"btn btn-primary pull-right\" href=\"javascript://\" (click)=\"assignNow()\">{{'leads.assign' | translate}}</a>\n                        </div>\n                    </div>\n                    <div class=\"spacer40\"></div>\n                    <div class=\"modal-table-data\" malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\">\n                        <table class=\"table\">\n                            <tr *ngFor=\"let item of assign.items\">\n                                <td *ngIf=\"item.is_blocked!=1\">\n                                    <div class=\"n-avail-profile\">\n                                    <img [src]=\"item.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\">\n                                    <div class=\"n-avail-info\">\n                                        <p class=\"p12\">{{item.name | titlecase}}</p>\n                                        <p class=\"p10\">{{'leads.phone' | translate}} : {{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}</p>\n                                    </div>\n                                    </div>\n                                </td>\n                                <td *ngIf=\"item.is_blocked!=1\">\n                                    <label class=\"cust-check-bx float-right\">\n                                        <input type=\"radio\" name=\"notary_id\" (click)=\"assignItem = item\">\n                                        <span class=\"checkmark\"></span>\n                                    </label>\n                                </td>\n                            </tr>\n                            <tr *ngIf=\"assign?.items?.length==0\">\n                                    <p class=\"show-not-found\">{{'leads.noOutsideAgent' | translate}}</p>\n                            </tr>\n                        </table>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    "

/***/ }),

/***/ "./src/app/layout/leads/outside-broker/outside-broker.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/layout/leads/outside-broker/outside-broker.component.ts ***!
  \*************************************************************************/
/*! exports provided: OutsideBrokerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OutsideBrokerComponent", function() { return OutsideBrokerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var src_app_services_leads_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/leads.service */ "./src/app/services/leads.service.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var OutsideBrokerComponent = /** @class */ (function () {
    function OutsideBrokerComponent(admin, leadsService, constant, route, spinner, translate) {
        this.admin = admin;
        this.leadsService = leadsService;
        this.constant = constant;
        this.route = route;
        this.spinner = spinner;
        this.translate = translate;
        this.scrollbarOptions = { axis: 'y', theme: 'dark' };
        this.parameter = {};
        this.location = {};
        this.assign = {};
        this.items = [];
        this.today = new Date();
        this.users = [];
        this.initSelection = false;
        this.dash = {
            lead_total: 0,
            lead_lead_properties: 0,
            lead_open: 0,
            lead_closed: 0
        };
        this.chartView = [];
    }
    OutsideBrokerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.locale = {
            firstDayOfWeek: 0,
            dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
            dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
            dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
            monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
            monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun',
                'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
            today: 'Hoy',
            clear: 'Clara',
            dateFormat: 'mm/dd/yy',
            weekHeader: 'Wk'
        };
        this.parameter.is_selected = false;
        this.parameter.keyword = '';
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        this.parameter.flag = this.leadsService.outsideAgentLeadsFlag ? this.leadsService.outsideAgentLeadsFlag : this.constant.flag;
        this.parameter.total = 0;
        this.parameter.count_flag = this.leadsService.outsideAgentLeadsCountFlag ?
            this.leadsService.outsideAgentLeadsCountFlag : this.constant.count_flag;
        this.route.params.subscribe(function (params) {
            _this.parameter.assignee_id = params.id;
        });
        this.getCountries();
        this.getListing();
        this.getCSRDashBoardData();
        Object.assign(this, this.chartView);
    };
    OutsideBrokerComponent.prototype.getCountries = function () {
        var _this = this;
        this.admin.postDataApi('getCountryLocality', {}).subscribe(function (r) {
            _this.location.countries = r['data'];
        });
    };
    OutsideBrokerComponent.prototype.onCountryChange = function (id) {
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
    OutsideBrokerComponent.prototype.onStateChange = function (id) {
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
    OutsideBrokerComponent.prototype.onCityChange = function (id) {
        if (!id || id === '0') {
            this.parameter.locality_id = '0';
            return false;
        }
        this.parameter.city_id = id;
        var selectedCountry = this.location.cities.filter(function (x) { return x.id.toString() === id; });
        this.location.localities = selectedCountry[0].localities;
    };
    OutsideBrokerComponent.prototype.onLocalityChange = function (id) {
        if (!id || id === '0') {
            return false;
        }
        this.parameter.locality_id = id;
        // this.getCsrListing();
    };
    OutsideBrokerComponent.prototype.changeFlag = function (flag) {
        this.parameter.flag = flag;
        this.leadsService.outsideAgentLeadsFlag = flag;
        this.parameter.count_flag = 1;
        this.resetDates();
        this.getListing();
        this.getCSRDashBoardData();
    };
    OutsideBrokerComponent.prototype.changeFilter = function (key, value) {
        this.parameter[key] = value;
        this.getListing();
    };
    OutsideBrokerComponent.prototype.changeCountFlag = function (flag) {
        this.parameter.count_flag = flag;
        this.leadsService.outsideAgentLeadsCountFlag = flag;
        this.getListing();
    };
    OutsideBrokerComponent.prototype.getCsrListing = function () {
        var _this = this;
        this.initSelection = true;
        this.users = [];
        var input = new FormData();
        input.append('is_external_agent', '1');
        if (this.parameter.keyword) {
            input.append('keyword', this.parameter.keyword);
        }
        this.admin.postDataApi('getExternalBroker', input).subscribe(function (success) {
            _this.users = success.data;
        });
    };
    OutsideBrokerComponent.prototype.resetFilters = function () {
        this.location.countries = JSON.parse(JSON.stringify(this.location.countries));
        this.onCountryChange('0');
        this.parameter.is_selected = false;
        this.parameter.page = this.constant.p;
        this.parameter.flag = 2;
        this.parameter.total = 0;
        // this.selectedUser = '';
        this.parameter.keyword = '';
        this.parameter.count_flag = 1;
        this.getListing();
        this.resetDates();
        this.getCSRDashBoardData();
    };
    OutsideBrokerComponent.prototype.resetDates = function () {
        this.parameter.min = '';
        this.parameter.max = '';
    };
    OutsideBrokerComponent.prototype.closeCsrListing = function () {
        var _this = this;
        setTimeout(function () {
            _this.users = [];
        }, 200);
    };
    OutsideBrokerComponent.prototype.selectCsrUser = function (user) {
        this.selectedUser = user;
        this.users = [];
        this.parameter.keyword = '';
        this.initSelection = false;
        this.getListing();
        this.getCSRDashBoardData();
    };
    OutsideBrokerComponent.prototype.removeCsrUser = function () {
        this.selectedUser = '';
        this.parameter.keyword = '';
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        // this.parameter.flag = 2;
        this.parameter.total = 0;
        this.parameter.count_flag = 1;
        this.getListing();
        this.getCSRDashBoardData();
    };
    OutsideBrokerComponent.prototype.getCSRDashBoardData = function () {
        var _this = this;
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
        if (this.selectedUser) {
            input.assignee_id = this.selectedUser.id;
        }
        else if (this.parameter.assignee_id) {
            input.assignee_id = this.parameter.assignee_id;
        }
        input.is_external_agent = 1;
        this.admin.postDataApi('leads/in-house-broker-dash-count', input).subscribe(function (r) {
            _this.dash = r.data;
            _this.chartView = [
                // {
                //   'name': 'Total Leads',
                //   'value': parseInt(this.dash.lead_total, 10)
                // },
                {
                    'name': _this.translate.instant('leads.properties'),
                    'value': parseInt(_this.dash.lead_properties, 10)
                },
                {
                    'name': _this.translate.instant('leads.leadsOpen'),
                    'value': parseInt(_this.dash.lead_open, 10)
                },
                {
                    'name': _this.translate.instant('leads.dealFinalised'),
                    'value': parseInt(_this.dash.lead_closed, 10)
                }
            ];
        });
    };
    OutsideBrokerComponent.prototype.getListing = function () {
        var _this = this;
        this.items = [];
        this.parameter.noResultFound = false;
        var input = JSON.parse(JSON.stringify(this.parameter));
        if (this.parameter.min) {
            input.min = moment__WEBPACK_IMPORTED_MODULE_4__(this.parameter.min).format('YYYY-MM-DD');
        }
        if (this.parameter.max) {
            input.max = moment__WEBPACK_IMPORTED_MODULE_4__(this.parameter.max).format('YYYY-MM-DD');
        }
        if (this.selectedUser) {
            input.assignee_id = this.selectedUser.id;
        }
        else if (this.parameter.assignee_id) {
            input.assignee_id = this.parameter.assignee_id;
        }
        input.is_external_agent = 1;
        this.spinner.show();
        this.admin.postDataApi('leads/in-house-broker', input).subscribe(function (success) {
            _this.spinner.hide();
            _this.items = success.data;
            if (_this.items.length <= 0) {
                _this.parameter.noResultFound = true;
            }
            _this.parameter.total = success.total_count;
        }, function (error) {
            _this.spinner.hide();
        });
    };
    OutsideBrokerComponent.prototype.getPage = function (page) {
        this.parameter.page = page;
        this.getListing();
    };
    OutsideBrokerComponent.prototype.sort_by = function (sort_by_flag) {
        if (this.parameter.sort_by_flag !== sort_by_flag) {
            this.parameter.sort_by_flag = sort_by_flag;
            this.parameter.sort_by_order = 0;
        }
        else {
            this.parameter.sort_by_order = this.parameter.sort_by_order ? 0 : 1;
        }
        this.getListing();
    };
    OutsideBrokerComponent.prototype.updateLeadType = function ($event, sale_rent, lead_id, index) {
        var _this = this;
        $event.stopPropagation();
        this.parameter.url = 'leads/updateLeadType';
        swal({
            html: this.translate.instant('message.error.areYouSure') + '<br>' +
                this.translate.instant('message.error.wantToChangeAvailablity'),
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.spinner.show();
                _this.admin.postDataApi(_this.parameter.url, { sale_rent: sale_rent, lead_id: lead_id })
                    .subscribe(function (success) {
                    _this.spinner.hide();
                    _this.items[index].sale_rent = sale_rent;
                    swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.availablityChangedSuccessfully'), 'success');
                }, function (error) {
                    _this.spinner.hide();
                });
            }
        });
    };
    OutsideBrokerComponent.prototype.selectAll = function (is_selected) {
        var _this = this;
        this.parameter.is_selected = !is_selected;
        this.items.forEach(function (item) {
            item.selected = _this.parameter.is_selected;
        });
    };
    OutsideBrokerComponent.prototype.bulkAssign = function () {
        // this.assign.keyword = '';
        var leads_ids = this.items.filter(function (x) { return x.selected; }).map(function (y) { return y.id; });
        if (leads_ids.length === 0) {
            swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseAtleast1Lead'), 'error');
            return false;
        }
        if (!this.assign.items) {
            this.getAssignListing();
        }
        this.openAssignModel.nativeElement.click();
    };
    OutsideBrokerComponent.prototype.getAssignListing = function () {
        var _this = this;
        // this.assign.items = [];
        var input = {
            keyword: this.assign.keyword,
            is_external_agent: 1
        };
        this.spinner.show();
        this.admin.postDataApi('getInhouseBroker', input).subscribe(function (success) {
            _this.spinner.hide();
            _this.assign.items = success.data;
        });
    };
    OutsideBrokerComponent.prototype.assignNow = function () {
        var _this = this;
        var leads_ids = this.items.filter(function (x) { return x.selected; }).map(function (y) { return y.id; });
        var input = {
            broker_id: this.assignItem.id,
            leads: leads_ids
        };
        this.spinner.show();
        this.admin.postDataApi('leads/bulkAssignBroker', input).subscribe(function (r) {
            _this.spinner.hide();
            swal(_this.translate.instant('swal.success'), _this.translate.instant('message.success.assignedSuccessfully'), 'success');
            _this.closeAssignModel.nativeElement.click();
            _this.getListing();
        }, function (error) {
            _this.spinner.hide();
            _this.closeAssignModel.nativeElement.click();
            swal(_this.translate.instant('swal.error'), error.error.message, 'error');
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('openAssignModel'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], OutsideBrokerComponent.prototype, "openAssignModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('closeAssignModel'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], OutsideBrokerComponent.prototype, "closeAssignModel", void 0);
    OutsideBrokerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-outside-broker',
            template: __webpack_require__(/*! ./outside-broker.component.html */ "./src/app/layout/leads/outside-broker/outside-broker.component.html"),
            styles: [__webpack_require__(/*! ./outside-broker.component.css */ "./src/app/layout/leads/outside-broker/outside-broker.component.css")],
            providers: [src_app_common_constants__WEBPACK_IMPORTED_MODULE_2__["Constant"]]
        }),
        __metadata("design:paramtypes", [src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_1__["AdminService"],
            src_app_services_leads_service__WEBPACK_IMPORTED_MODULE_6__["LeadsService"],
            src_app_common_constants__WEBPACK_IMPORTED_MODULE_2__["Constant"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateService"]])
    ], OutsideBrokerComponent);
    return OutsideBrokerComponent;
}());



/***/ }),

/***/ "./src/app/pipes/remove-comma.pipe.ts":
/*!********************************************!*\
  !*** ./src/app/pipes/remove-comma.pipe.ts ***!
  \********************************************/
/*! exports provided: RemoveCommaPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RemoveCommaPipe", function() { return RemoveCommaPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var RemoveCommaPipe = /** @class */ (function () {
    function RemoveCommaPipe() {
    }
    RemoveCommaPipe.prototype.transform = function (value, args) {
        return null;
    };
    RemoveCommaPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'removeComma'
        })
    ], RemoveCommaPipe);
    return RemoveCommaPipe;
}());



/***/ })

}]);
//# sourceMappingURL=leads-leads-module.js.map