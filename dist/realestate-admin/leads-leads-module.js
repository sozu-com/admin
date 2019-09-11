(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["leads-leads-module"],{

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = $getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  var args = [];
  for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    ReflectApply(this.listener, this.target, args);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}


/***/ }),

/***/ "./node_modules/file-saver/dist/FileSaver.min.js":
/*!*******************************************************!*\
  !*** ./node_modules/file-saver/dist/FileSaver.min.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(a,b){if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (b),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {}})(this,function(){"use strict";function b(a,b){return"undefined"==typeof b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(b,c,d){var e=new XMLHttpRequest;e.open("GET",b),e.responseType="blob",e.onload=function(){a(e.response,c,d)},e.onerror=function(){console.error("could not download file")},e.send()}function d(a){var b=new XMLHttpRequest;b.open("HEAD",a,!1);try{b.send()}catch(a){}return 200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"))}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b)}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof global&&global.global===global?global:void 0,a=f.saveAs||("object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href)},4E4),setTimeout(function(){e(j)},0))}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else{var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i)})}}:function(a,b,d,e){if(e=e||open("","_blank"),e&&(e.document.title=e.document.body.innerText="downloading..."),"string"==typeof a)return c(a,b,d);var g="application/octet-stream"===a.type,h=/constructor/i.test(f.HTMLElement)||f.safari,i=/CriOS\/[\d]+/.test(navigator.userAgent);if((i||g&&h)&&"object"==typeof FileReader){var j=new FileReader;j.onloadend=function(){var a=j.result;a=i?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),e?e.location.href=a:location=a,e=null},j.readAsDataURL(a)}else{var k=f.URL||f.webkitURL,l=k.createObjectURL(a);e?e.location=l:location.href=l,e=null,setTimeout(function(){k.revokeObjectURL(l)},4E4)}});f.saveAs=a.saveAs=a,"undefined"!=typeof module&&(module.exports=a)});

//# sourceMappingURL=FileSaver.min.js.map

/***/ }),

/***/ "./node_modules/ng-multiselect-dropdown/fesm5/ng-multiselect-dropdown.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/ng-multiselect-dropdown/fesm5/ng-multiselect-dropdown.js ***!
  \*******************************************************************************/
/*! exports provided: MultiSelectComponent, NgMultiSelectDropDownModule, ɵb, ɵc, ɵa */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultiSelectComponent", function() { return MultiSelectComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgMultiSelectDropDownModule", function() { return NgMultiSelectDropDownModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵb", function() { return ClickOutsideDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵc", function() { return ListFilterPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return DROPDOWN_CONTROL_VALUE_ACCESSOR; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");




/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ListItem = /** @class */ (function () {
    function ListItem(source) {
        if (typeof source === 'string') {
            this.id = this.text = source;
        }
        if (typeof source === 'object') {
            this.id = source.id;
            this.text = source.text;
        }
    }
    return ListItem;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ DROPDOWN_CONTROL_VALUE_ACCESSOR = {
    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALUE_ACCESSOR"],
    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function () { return MultiSelectComponent; }),
    multi: true
};
var /** @type {?} */ noop = function () { };
var MultiSelectComponent = /** @class */ (function () {
    function MultiSelectComponent(cdr) {
        this.cdr = cdr;
        this._data = [];
        this.selectedItems = [];
        this.isDropdownOpen = true;
        this._placeholder = 'Select';
        this.filter = new ListItem(this.data);
        this.defaultSettings = {
            singleSelection: false,
            idField: 'id',
            textField: 'text',
            enableCheckAll: true,
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            allowSearchFilter: false,
            limitSelection: -1,
            clearSearchFilter: true,
            maxHeight: 197,
            itemsShowLimit: 999999999999,
            searchPlaceholderText: 'Search',
            noDataAvailablePlaceholderText: 'No data available',
            closeDropDownOnSelection: false,
            showSelectedItemsAtTop: false,
            defaultOpen: false
        };
        this.disabled = false;
        this.onFilterChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onDropDownClose = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onDeSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onSelectAll = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onDeSelectAll = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    Object.defineProperty(MultiSelectComponent.prototype, "placeholder", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this._placeholder = value;
            }
            else {
                this._placeholder = 'Select';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "settings", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this._settings = Object.assign(this.defaultSettings, value);
            }
            else {
                this._settings = Object.assign(this.defaultSettings);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "data", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            if (!value) {
                this._data = [];
            }
            else {
                // const _items = value.filter((item: any) => {
                //   if (typeof item === 'string' || (typeof item === 'object' && item && item[this._settings.idField] && item[this._settings.textField])) {
                //     return item;
                //   }
                // });
                this._data = value.map(function (item) {
                    return typeof item === 'string'
                        ? new ListItem(item)
                        : new ListItem({
                            id: item[_this._settings.idField],
                            text: item[_this._settings.textField]
                        });
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} $event
     * @return {?}
     */
    MultiSelectComponent.prototype.onFilterTextChange = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.onFilterChange.emit($event);
    };
    /**
     * @param {?} $event
     * @param {?} item
     * @return {?}
     */
    MultiSelectComponent.prototype.onItemClick = /**
     * @param {?} $event
     * @param {?} item
     * @return {?}
     */
    function ($event, item) {
        if (this.disabled) {
            return false;
        }
        var /** @type {?} */ found = this.isSelected(item);
        var /** @type {?} */ allowAdd = this._settings.limitSelection === -1 ||
            (this._settings.limitSelection > 0 &&
                this.selectedItems.length < this._settings.limitSelection);
        if (!found) {
            if (allowAdd) {
                this.addSelected(item);
            }
        }
        else {
            this.removeSelected(item);
        }
        if (this._settings.singleSelection &&
            this._settings.closeDropDownOnSelection) {
            this.closeDropdown();
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    MultiSelectComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        if (value !== undefined && value !== null && value.length > 0) {
            if (this._settings.singleSelection) {
                try {
                    if (value.length >= 1) {
                        var /** @type {?} */ firstItem = value[0];
                        this.selectedItems = [
                            typeof firstItem === 'string'
                                ? new ListItem(firstItem)
                                : new ListItem({
                                    id: firstItem[this._settings.idField],
                                    text: firstItem[this._settings.textField]
                                })
                        ];
                    }
                }
                catch (/** @type {?} */ e) {
                    // console.error(e.body.msg);
                }
            }
            else {
                var /** @type {?} */ _data = value.map(function (item) {
                    return typeof item === 'string'
                        ? new ListItem(item)
                        : new ListItem({
                            id: item[_this._settings.idField],
                            text: item[_this._settings.textField]
                        });
                });
                if (this._settings.limitSelection > 0) {
                    this.selectedItems = _data.splice(0, this._settings.limitSelection);
                }
                else {
                    this.selectedItems = _data;
                }
            }
        }
        else {
            this.selectedItems = [];
        }
        this.onChangeCallback(value);
    };
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    MultiSelectComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChangeCallback = fn;
    };
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    MultiSelectComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @return {?}
     */
    MultiSelectComponent.prototype.onTouched = /**
     * @return {?}
     */
    function () {
        this.closeDropdown();
        this.onTouchedCallback();
    };
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    MultiSelectComponent.prototype.trackByFn = /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    function (index, item) {
        return item.id;
    };
    /**
     * @param {?} clickedItem
     * @return {?}
     */
    MultiSelectComponent.prototype.isSelected = /**
     * @param {?} clickedItem
     * @return {?}
     */
    function (clickedItem) {
        var /** @type {?} */ found = false;
        this.selectedItems.forEach(function (item) {
            if (clickedItem.id === item.id) {
                found = true;
            }
        });
        return found;
    };
    /**
     * @return {?}
     */
    MultiSelectComponent.prototype.isLimitSelectionReached = /**
     * @return {?}
     */
    function () {
        return this._settings.limitSelection === this.selectedItems.length;
    };
    /**
     * @return {?}
     */
    MultiSelectComponent.prototype.isAllItemsSelected = /**
     * @return {?}
     */
    function () {
        return this._data.length === this.selectedItems.length;
    };
    /**
     * @return {?}
     */
    MultiSelectComponent.prototype.showButton = /**
     * @return {?}
     */
    function () {
        if (!this._settings.singleSelection) {
            if (this._settings.limitSelection > 0) {
                return false;
            }
            // this._settings.enableCheckAll = this._settings.limitSelection === -1 ? true : false;
            return true; // !this._settings.singleSelection && this._settings.enableCheckAll && this._data.length > 0;
        }
        else {
            // should be disabled in single selection mode
            return false;
        }
    };
    /**
     * @return {?}
     */
    MultiSelectComponent.prototype.itemShowRemaining = /**
     * @return {?}
     */
    function () {
        return this.selectedItems.length - this._settings.itemsShowLimit;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    MultiSelectComponent.prototype.addSelected = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (this._settings.singleSelection) {
            this.selectedItems = [];
            this.selectedItems.push(item);
        }
        else {
            this.selectedItems.push(item);
        }
        this.onChangeCallback(this.emittedValue(this.selectedItems));
        this.onSelect.emit(this.emittedValue(item));
    };
    /**
     * @param {?} itemSel
     * @return {?}
     */
    MultiSelectComponent.prototype.removeSelected = /**
     * @param {?} itemSel
     * @return {?}
     */
    function (itemSel) {
        var _this = this;
        this.selectedItems.forEach(function (item) {
            if (itemSel.id === item.id) {
                _this.selectedItems.splice(_this.selectedItems.indexOf(item), 1);
            }
        });
        this.onChangeCallback(this.emittedValue(this.selectedItems));
        this.onDeSelect.emit(this.emittedValue(itemSel));
    };
    /**
     * @param {?} val
     * @return {?}
     */
    MultiSelectComponent.prototype.emittedValue = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        var _this = this;
        var /** @type {?} */ selected = [];
        if (Array.isArray(val)) {
            val.map(function (item) {
                if (item.id === item.text) {
                    selected.push(item.text);
                }
                else {
                    selected.push(_this.objectify(item));
                }
            });
        }
        else {
            if (val) {
                if (val.id === val.text) {
                    return val.text;
                }
                else {
                    return this.objectify(val);
                }
            }
        }
        return selected;
    };
    /**
     * @param {?} val
     * @return {?}
     */
    MultiSelectComponent.prototype.objectify = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        var /** @type {?} */ obj = {};
        obj[this._settings.idField] = val.id;
        obj[this._settings.textField] = val.text;
        return obj;
    };
    /**
     * @param {?} evt
     * @return {?}
     */
    MultiSelectComponent.prototype.toggleDropdown = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        evt.preventDefault();
        if (this.disabled && this._settings.singleSelection) {
            return;
        }
        this._settings.defaultOpen = !this._settings.defaultOpen;
        if (!this._settings.defaultOpen) {
            this.onDropDownClose.emit();
        }
    };
    /**
     * @return {?}
     */
    MultiSelectComponent.prototype.closeDropdown = /**
     * @return {?}
     */
    function () {
        this._settings.defaultOpen = false;
        // clear search text
        if (this._settings.clearSearchFilter) {
            this.filter.text = '';
        }
        this.onDropDownClose.emit();
    };
    /**
     * @return {?}
     */
    MultiSelectComponent.prototype.toggleSelectAll = /**
     * @return {?}
     */
    function () {
        if (this.disabled) {
            return false;
        }
        if (!this.isAllItemsSelected()) {
            this.selectedItems = this._data.slice();
            this.onSelectAll.emit(this.emittedValue(this.selectedItems));
        }
        else {
            this.selectedItems = [];
            this.onDeSelectAll.emit(this.emittedValue(this.selectedItems));
        }
        this.onChangeCallback(this.emittedValue(this.selectedItems));
    };
    MultiSelectComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'ng-multiselect-dropdown',
                    template: "<div tabindex=\"=0\" (blur)=\"onTouched()\" class=\"multiselect-dropdown\" (clickOutside)=\"closeDropdown()\">\n  <div [class.disabled]=\"disabled\">\n    <span tabindex=\"-1\" class=\"dropdown-btn\" (click)=\"toggleDropdown($event)\">\n      <span *ngIf=\"selectedItems.length == 0\">{{_placeholder}}</span>\n      <span class=\"selected-item\" *ngFor=\"let item of selectedItems;trackBy: trackByFn;let k = index\" [hidden]=\"k > _settings.itemsShowLimit-1\">\n        {{item.text}}\n        <a style=\"padding-top:2px;padding-left:2px;color:white\" (click)=\"onItemClick($event,item)\">x</a>\n      </span>\n      <span style=\"float:right !important;padding-right:4px\">\n        <span style=\"padding-right: 6px;\" *ngIf=\"itemShowRemaining()>0\">+{{itemShowRemaining()}}</span>\n        <span [ngClass]=\"_settings.defaultOpen ? 'dropdown-up' : 'dropdown-down'\"></span>\n      </span>\n    </span>\n  </div>\n  <div class=\"dropdown-list\" [hidden]=\"!_settings.defaultOpen\">\n    <ul class=\"item1\">\n      <li (click)=\"toggleSelectAll()\" *ngIf=\"_data.length > 0 && !_settings.singleSelection && _settings.enableCheckAll && _settings.limitSelection===-1\" class=\"multiselect-item-checkbox\" style=\"border-bottom: 1px solid #ccc;padding:10px\">\n        <input type=\"checkbox\" aria-label=\"multiselect-select-all\" [checked]=\"isAllItemsSelected()\" [disabled]=\"disabled || isLimitSelectionReached()\" />\n        <div>{{!isAllItemsSelected() ? _settings.selectAllText : _settings.unSelectAllText}}</div>\n      </li>\n      <li class=\"filter-textbox\" *ngIf=\"_data.length>0 && _settings.allowSearchFilter\">\n        <input type=\"text\" aria-label=\"multiselect-search\" [readOnly]=\"disabled\" [placeholder]=\"_settings.searchPlaceholderText\" [(ngModel)]=\"filter.text\" (ngModelChange)=\"onFilterTextChange($event)\">\n      </li>\n    </ul>\n    <ul class=\"item2\" [style.maxHeight]=\"_settings.maxHeight+'px'\">\n      <li *ngFor=\"let item of _data | ng2ListFilter:filter; let i = index;\" (click)=\"onItemClick($event,item)\" class=\"multiselect-item-checkbox\">\n        <input type=\"checkbox\" aria-label=\"multiselect-item\" [checked]=\"isSelected(item)\" [disabled]=\"disabled || (isLimitSelectionReached() && !isSelected(item))\" />\n        <div>{{item.text}}</div>\n      </li>\n      <li class='no-data' *ngIf=\"_data.length == 0\">\n        <h5>{{_settings.noDataAvailablePlaceholderText}}</h5>\n      </li>\n    </ul>\n  </div>\n</div>",
                    styles: [".multiselect-dropdown{position:relative;width:100%;font-size:inherit;font-family:inherit}.multiselect-dropdown .dropdown-btn{display:inline-block;border:1px solid #adadad;width:100%;padding:6px 12px;margin-bottom:0;font-weight:400;line-height:1.52857143;text-align:left;vertical-align:middle;cursor:pointer;background-image:none;border-radius:4px}.multiselect-dropdown .dropdown-btn .selected-item{border:1px solid #337ab7;margin-right:4px;background:#337ab7;padding:0 5px;color:#fff;border-radius:2px;float:left}.multiselect-dropdown .dropdown-btn .selected-item a{text-decoration:none}.multiselect-dropdown .dropdown-btn .selected-item:hover{box-shadow:1px 1px #959595}.multiselect-dropdown .dropdown-btn .dropdown-down{display:inline-block;top:10px;width:0;height:0;border-top:10px solid #adadad;border-left:10px solid transparent;border-right:10px solid transparent}.multiselect-dropdown .dropdown-btn .dropdown-up{display:inline-block;width:0;height:0;border-bottom:10px solid #adadad;border-left:10px solid transparent;border-right:10px solid transparent}.multiselect-dropdown .disabled>span{background-color:#eceeef}.dropdown-list{position:absolute;padding-top:6px;width:100%;z-index:9999;border:1px solid #ccc;border-radius:3px;background:#fff;margin-top:10px;box-shadow:0 1px 5px #959595}.dropdown-list ul{padding:0;list-style:none;overflow:auto;margin:0}.dropdown-list li{padding:6px 10px;cursor:pointer;text-align:left}.dropdown-list .filter-textbox{border-bottom:1px solid #ccc;position:relative;padding:10px}.dropdown-list .filter-textbox input{border:0;width:100%;padding:0 0 0 26px}.dropdown-list .filter-textbox input:focus{outline:0}.multiselect-item-checkbox input[type=checkbox]{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.multiselect-item-checkbox input[type=checkbox]:focus+div:before,.multiselect-item-checkbox input[type=checkbox]:hover+div:before{border-color:#337ab7;background-color:#f2f2f2}.multiselect-item-checkbox input[type=checkbox]:active+div:before{transition-duration:0s}.multiselect-item-checkbox input[type=checkbox]+div{position:relative;padding-left:2em;vertical-align:middle;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;margin:0;color:#000}.multiselect-item-checkbox input[type=checkbox]+div:before{box-sizing:content-box;content:'';color:#337ab7;position:absolute;top:50%;left:0;width:14px;height:14px;margin-top:-9px;border:2px solid #337ab7;text-align:center;transition:all .4s ease}.multiselect-item-checkbox input[type=checkbox]+div:after{box-sizing:content-box;content:'';position:absolute;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:50%;transform-origin:50%;transition:-webkit-transform .2s ease-out;transition:transform .2s ease-out;transition:transform .2s ease-out,-webkit-transform .2s ease-out;background-color:transparent;top:50%;left:4px;width:8px;height:3px;margin-top:-4px;border-style:solid;border-color:#fff;border-width:0 0 3px 3px;-o-border-image:none;border-image:none;-webkit-transform:rotate(-45deg) scale(0);transform:rotate(-45deg) scale(0)}.multiselect-item-checkbox input[type=checkbox]:disabled+div:before{border-color:#ccc}.multiselect-item-checkbox input[type=checkbox]:disabled:focus+div:before .multiselect-item-checkbox input[type=checkbox]:disabled:hover+div:before{background-color:inherit}.multiselect-item-checkbox input[type=checkbox]:disabled:checked+div:before{background-color:#ccc}.multiselect-item-checkbox input[type=checkbox]:checked+div:after{content:'';transition:-webkit-transform .2s ease-out;transition:transform .2s ease-out;transition:transform .2s ease-out,-webkit-transform .2s ease-out;-webkit-transform:rotate(-45deg) scale(1);transform:rotate(-45deg) scale(1)}.multiselect-item-checkbox input[type=checkbox]:checked+div:before{-webkit-animation:.2s ease-in borderscale;animation:.2s ease-in borderscale;background:#337ab7}@-webkit-keyframes borderscale{50%{box-shadow:0 0 0 2px #337ab7}}@keyframes borderscale{50%{box-shadow:0 0 0 2px #337ab7}}"],
                    providers: [DROPDOWN_CONTROL_VALUE_ACCESSOR],
                    changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush
                },] },
    ];
    /** @nocollapse */
    MultiSelectComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"], },
    ]; };
    MultiSelectComponent.propDecorators = {
        "placeholder": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "disabled": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "settings": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "data": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "onFilterChange": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"], args: ['onFilterChange',] },],
        "onDropDownClose": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"], args: ['onDropDownClose',] },],
        "onSelect": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"], args: ['onSelect',] },],
        "onDeSelect": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"], args: ['onDeSelect',] },],
        "onSelectAll": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"], args: ['onSelectAll',] },],
        "onDeSelectAll": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"], args: ['onDeSelectAll',] },],
        "onTouched": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['blur',] },],
    };
    return MultiSelectComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ClickOutsideDirective = /** @class */ (function () {
    function ClickOutsideDirective(_elementRef) {
        this._elementRef = _elementRef;
        this.clickOutside = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    /**
     * @param {?} event
     * @param {?} targetElement
     * @return {?}
     */
    ClickOutsideDirective.prototype.onClick = /**
     * @param {?} event
     * @param {?} targetElement
     * @return {?}
     */
    function (event, targetElement) {
        if (!targetElement) {
            return;
        }
        var /** @type {?} */ clickedInside = this._elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.clickOutside.emit(event);
        }
    };
    ClickOutsideDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{
                    selector: '[clickOutside]'
                },] },
    ];
    /** @nocollapse */
    ClickOutsideDirective.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], },
    ]; };
    ClickOutsideDirective.propDecorators = {
        "clickOutside": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
        "onClick": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['document:click', ['$event', '$event.target'],] },],
    };
    return ClickOutsideDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ListFilterPipe = /** @class */ (function () {
    function ListFilterPipe() {
    }
    /**
     * @param {?} items
     * @param {?} filter
     * @return {?}
     */
    ListFilterPipe.prototype.transform = /**
     * @param {?} items
     * @param {?} filter
     * @return {?}
     */
    function (items, filter) {
        var _this = this;
        if (!items || !filter) {
            return items;
        }
        return items.filter(function (item) { return _this.applyFilter(item, filter); });
    };
    /**
     * @param {?} item
     * @param {?} filter
     * @return {?}
     */
    ListFilterPipe.prototype.applyFilter = /**
     * @param {?} item
     * @param {?} filter
     * @return {?}
     */
    function (item, filter) {
        return !(filter.text && item.text && item.text.toLowerCase().indexOf(filter.text.toLowerCase()) === -1);
    };
    ListFilterPipe.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"], args: [{
                    name: 'ng2ListFilter',
                    pure: false
                },] },
    ];
    return ListFilterPipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgMultiSelectDropDownModule = /** @class */ (function () {
    function NgMultiSelectDropDownModule() {
    }
    /**
     * @return {?}
     */
    NgMultiSelectDropDownModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: NgMultiSelectDropDownModule
        };
    };
    NgMultiSelectDropDownModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"]],
                    declarations: [MultiSelectComponent, ClickOutsideDirective, ListFilterPipe],
                    exports: [MultiSelectComponent]
                },] },
    ];
    return NgMultiSelectDropDownModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctbXVsdGlzZWxlY3QtZHJvcGRvd24uanMubWFwIiwic291cmNlcyI6WyJuZzovL25nLW11bHRpc2VsZWN0LWRyb3Bkb3duL211bHRpc2VsZWN0Lm1vZGVsLnRzIiwibmc6Ly9uZy1tdWx0aXNlbGVjdC1kcm9wZG93bi9tdWx0aXNlbGVjdC5jb21wb25lbnQudHMiLCJuZzovL25nLW11bHRpc2VsZWN0LWRyb3Bkb3duL2NsaWNrLW91dHNpZGUuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZy1tdWx0aXNlbGVjdC1kcm9wZG93bi9saXN0LWZpbHRlci5waXBlLnRzIiwibmc6Ly9uZy1tdWx0aXNlbGVjdC1kcm9wZG93bi9uZy1tdWx0aXNlbGVjdC1kcm9wZG93bi5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBJRHJvcGRvd25TZXR0aW5ncyB7XHJcbiAgc2luZ2xlU2VsZWN0aW9uPzogYm9vbGVhbjtcclxuICBpZEZpZWxkPzogc3RyaW5nO1xyXG4gIHRleHRGaWVsZD86IHN0cmluZztcclxuICBlbmFibGVDaGVja0FsbD86IGJvb2xlYW47XHJcbiAgc2VsZWN0QWxsVGV4dD86IHN0cmluZztcclxuICB1blNlbGVjdEFsbFRleHQ/OiBzdHJpbmc7XHJcbiAgYWxsb3dTZWFyY2hGaWx0ZXI/OiBib29sZWFuO1xyXG4gIGNsZWFyU2VhcmNoRmlsdGVyPzogYm9vbGVhbjtcclxuICBtYXhIZWlnaHQ/OiBudW1iZXI7XHJcbiAgaXRlbXNTaG93TGltaXQ/OiBudW1iZXI7XHJcbiAgbGltaXRTZWxlY3Rpb24/OiBudW1iZXI7XHJcbiAgc2VhcmNoUGxhY2Vob2xkZXJUZXh0Pzogc3RyaW5nO1xyXG4gIG5vRGF0YUF2YWlsYWJsZVBsYWNlaG9sZGVyVGV4dD86IHN0cmluZztcclxuICBjbG9zZURyb3BEb3duT25TZWxlY3Rpb24/OiBib29sZWFuO1xyXG4gIHNob3dTZWxlY3RlZEl0ZW1zQXRUb3A/OiBib29sZWFuO1xyXG4gIGRlZmF1bHRPcGVuPzogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIExpc3RJdGVtIHtcclxuICBpZDogU3RyaW5nO1xyXG4gIHRleHQ6IFN0cmluZztcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHNvdXJjZTogYW55KSB7XHJcbiAgICBpZiAodHlwZW9mIHNvdXJjZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgdGhpcy5pZCA9IHRoaXMudGV4dCA9IHNvdXJjZTtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2Ygc291cmNlID09PSAnb2JqZWN0Jykge1xyXG4gICAgICB0aGlzLmlkID0gc291cmNlLmlkO1xyXG4gICAgICB0aGlzLnRleHQgPSBzb3VyY2UudGV4dDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIGZvcndhcmRSZWYsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDaGFuZ2VEZXRlY3RvclJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IExpc3RJdGVtLCBJRHJvcGRvd25TZXR0aW5ncyB9IGZyb20gJy4vbXVsdGlzZWxlY3QubW9kZWwnO1xyXG5cclxuZXhwb3J0IGNvbnN0IERST1BET1dOX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcclxuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNdWx0aVNlbGVjdENvbXBvbmVudCksXHJcbiAgbXVsdGk6IHRydWVcclxufTtcclxuY29uc3Qgbm9vcCA9ICgpID0+IHt9O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZy1tdWx0aXNlbGVjdC1kcm9wZG93bicsXHJcbiAgdGVtcGxhdGU6IGA8ZGl2IHRhYmluZGV4PVwiPTBcIiAoYmx1cik9XCJvblRvdWNoZWQoKVwiIGNsYXNzPVwibXVsdGlzZWxlY3QtZHJvcGRvd25cIiAoY2xpY2tPdXRzaWRlKT1cImNsb3NlRHJvcGRvd24oKVwiPlxyXG4gIDxkaXYgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkXCI+XHJcbiAgICA8c3BhbiB0YWJpbmRleD1cIi0xXCIgY2xhc3M9XCJkcm9wZG93bi1idG5cIiAoY2xpY2spPVwidG9nZ2xlRHJvcGRvd24oJGV2ZW50KVwiPlxyXG4gICAgICA8c3BhbiAqbmdJZj1cInNlbGVjdGVkSXRlbXMubGVuZ3RoID09IDBcIj57e19wbGFjZWhvbGRlcn19PC9zcGFuPlxyXG4gICAgICA8c3BhbiBjbGFzcz1cInNlbGVjdGVkLWl0ZW1cIiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBzZWxlY3RlZEl0ZW1zO3RyYWNrQnk6IHRyYWNrQnlGbjtsZXQgayA9IGluZGV4XCIgW2hpZGRlbl09XCJrID4gX3NldHRpbmdzLml0ZW1zU2hvd0xpbWl0LTFcIj5cclxuICAgICAgICB7e2l0ZW0udGV4dH19XHJcbiAgICAgICAgPGEgc3R5bGU9XCJwYWRkaW5nLXRvcDoycHg7cGFkZGluZy1sZWZ0OjJweDtjb2xvcjp3aGl0ZVwiIChjbGljayk9XCJvbkl0ZW1DbGljaygkZXZlbnQsaXRlbSlcIj54PC9hPlxyXG4gICAgICA8L3NwYW4+XHJcbiAgICAgIDxzcGFuIHN0eWxlPVwiZmxvYXQ6cmlnaHQgIWltcG9ydGFudDtwYWRkaW5nLXJpZ2h0OjRweFwiPlxyXG4gICAgICAgIDxzcGFuIHN0eWxlPVwicGFkZGluZy1yaWdodDogNnB4O1wiICpuZ0lmPVwiaXRlbVNob3dSZW1haW5pbmcoKT4wXCI+K3t7aXRlbVNob3dSZW1haW5pbmcoKX19PC9zcGFuPlxyXG4gICAgICAgIDxzcGFuIFtuZ0NsYXNzXT1cIl9zZXR0aW5ncy5kZWZhdWx0T3BlbiA/ICdkcm9wZG93bi11cCcgOiAnZHJvcGRvd24tZG93bidcIj48L3NwYW4+XHJcbiAgICAgIDwvc3Bhbj5cclxuICAgIDwvc3Bhbj5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwiZHJvcGRvd24tbGlzdFwiIFtoaWRkZW5dPVwiIV9zZXR0aW5ncy5kZWZhdWx0T3BlblwiPlxyXG4gICAgPHVsIGNsYXNzPVwiaXRlbTFcIj5cclxuICAgICAgPGxpIChjbGljayk9XCJ0b2dnbGVTZWxlY3RBbGwoKVwiICpuZ0lmPVwiX2RhdGEubGVuZ3RoID4gMCAmJiAhX3NldHRpbmdzLnNpbmdsZVNlbGVjdGlvbiAmJiBfc2V0dGluZ3MuZW5hYmxlQ2hlY2tBbGwgJiYgX3NldHRpbmdzLmxpbWl0U2VsZWN0aW9uPT09LTFcIiBjbGFzcz1cIm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3hcIiBzdHlsZT1cImJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjY2NjO3BhZGRpbmc6MTBweFwiPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBhcmlhLWxhYmVsPVwibXVsdGlzZWxlY3Qtc2VsZWN0LWFsbFwiIFtjaGVja2VkXT1cImlzQWxsSXRlbXNTZWxlY3RlZCgpXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkIHx8IGlzTGltaXRTZWxlY3Rpb25SZWFjaGVkKClcIiAvPlxyXG4gICAgICAgIDxkaXY+e3shaXNBbGxJdGVtc1NlbGVjdGVkKCkgPyBfc2V0dGluZ3Muc2VsZWN0QWxsVGV4dCA6IF9zZXR0aW5ncy51blNlbGVjdEFsbFRleHR9fTwvZGl2PlxyXG4gICAgICA8L2xpPlxyXG4gICAgICA8bGkgY2xhc3M9XCJmaWx0ZXItdGV4dGJveFwiICpuZ0lmPVwiX2RhdGEubGVuZ3RoPjAgJiYgX3NldHRpbmdzLmFsbG93U2VhcmNoRmlsdGVyXCI+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgYXJpYS1sYWJlbD1cIm11bHRpc2VsZWN0LXNlYXJjaFwiIFtyZWFkT25seV09XCJkaXNhYmxlZFwiIFtwbGFjZWhvbGRlcl09XCJfc2V0dGluZ3Muc2VhcmNoUGxhY2Vob2xkZXJUZXh0XCIgWyhuZ01vZGVsKV09XCJmaWx0ZXIudGV4dFwiIChuZ01vZGVsQ2hhbmdlKT1cIm9uRmlsdGVyVGV4dENoYW5nZSgkZXZlbnQpXCI+XHJcbiAgICAgIDwvbGk+XHJcbiAgICA8L3VsPlxyXG4gICAgPHVsIGNsYXNzPVwiaXRlbTJcIiBbc3R5bGUubWF4SGVpZ2h0XT1cIl9zZXR0aW5ncy5tYXhIZWlnaHQrJ3B4J1wiPlxyXG4gICAgICA8bGkgKm5nRm9yPVwibGV0IGl0ZW0gb2YgX2RhdGEgfCBuZzJMaXN0RmlsdGVyOmZpbHRlcjsgbGV0IGkgPSBpbmRleDtcIiAoY2xpY2spPVwib25JdGVtQ2xpY2soJGV2ZW50LGl0ZW0pXCIgY2xhc3M9XCJtdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94XCI+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGFyaWEtbGFiZWw9XCJtdWx0aXNlbGVjdC1pdGVtXCIgW2NoZWNrZWRdPVwiaXNTZWxlY3RlZChpdGVtKVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZCB8fCAoaXNMaW1pdFNlbGVjdGlvblJlYWNoZWQoKSAmJiAhaXNTZWxlY3RlZChpdGVtKSlcIiAvPlxyXG4gICAgICAgIDxkaXY+e3tpdGVtLnRleHR9fTwvZGl2PlxyXG4gICAgICA8L2xpPlxyXG4gICAgICA8bGkgY2xhc3M9J25vLWRhdGEnICpuZ0lmPVwiX2RhdGEubGVuZ3RoID09IDBcIj5cclxuICAgICAgICA8aDU+e3tfc2V0dGluZ3Mubm9EYXRhQXZhaWxhYmxlUGxhY2Vob2xkZXJUZXh0fX08L2g1PlxyXG4gICAgICA8L2xpPlxyXG4gICAgPC91bD5cclxuICA8L2Rpdj5cclxuPC9kaXY+YCxcclxuICBzdHlsZXM6IFtgLm11bHRpc2VsZWN0LWRyb3Bkb3due3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjEwMCU7Zm9udC1zaXplOmluaGVyaXQ7Zm9udC1mYW1pbHk6aW5oZXJpdH0ubXVsdGlzZWxlY3QtZHJvcGRvd24gLmRyb3Bkb3duLWJ0bntkaXNwbGF5OmlubGluZS1ibG9jaztib3JkZXI6MXB4IHNvbGlkICNhZGFkYWQ7d2lkdGg6MTAwJTtwYWRkaW5nOjZweCAxMnB4O21hcmdpbi1ib3R0b206MDtmb250LXdlaWdodDo0MDA7bGluZS1oZWlnaHQ6MS41Mjg1NzE0Mzt0ZXh0LWFsaWduOmxlZnQ7dmVydGljYWwtYWxpZ246bWlkZGxlO2N1cnNvcjpwb2ludGVyO2JhY2tncm91bmQtaW1hZ2U6bm9uZTtib3JkZXItcmFkaXVzOjRweH0ubXVsdGlzZWxlY3QtZHJvcGRvd24gLmRyb3Bkb3duLWJ0biAuc2VsZWN0ZWQtaXRlbXtib3JkZXI6MXB4IHNvbGlkICMzMzdhYjc7bWFyZ2luLXJpZ2h0OjRweDtiYWNrZ3JvdW5kOiMzMzdhYjc7cGFkZGluZzowIDVweDtjb2xvcjojZmZmO2JvcmRlci1yYWRpdXM6MnB4O2Zsb2F0OmxlZnR9Lm11bHRpc2VsZWN0LWRyb3Bkb3duIC5kcm9wZG93bi1idG4gLnNlbGVjdGVkLWl0ZW0gYXt0ZXh0LWRlY29yYXRpb246bm9uZX0ubXVsdGlzZWxlY3QtZHJvcGRvd24gLmRyb3Bkb3duLWJ0biAuc2VsZWN0ZWQtaXRlbTpob3Zlcntib3gtc2hhZG93OjFweCAxcHggIzk1OTU5NX0ubXVsdGlzZWxlY3QtZHJvcGRvd24gLmRyb3Bkb3duLWJ0biAuZHJvcGRvd24tZG93bntkaXNwbGF5OmlubGluZS1ibG9jazt0b3A6MTBweDt3aWR0aDowO2hlaWdodDowO2JvcmRlci10b3A6MTBweCBzb2xpZCAjYWRhZGFkO2JvcmRlci1sZWZ0OjEwcHggc29saWQgdHJhbnNwYXJlbnQ7Ym9yZGVyLXJpZ2h0OjEwcHggc29saWQgdHJhbnNwYXJlbnR9Lm11bHRpc2VsZWN0LWRyb3Bkb3duIC5kcm9wZG93bi1idG4gLmRyb3Bkb3duLXVwe2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOjA7aGVpZ2h0OjA7Ym9yZGVyLWJvdHRvbToxMHB4IHNvbGlkICNhZGFkYWQ7Ym9yZGVyLWxlZnQ6MTBweCBzb2xpZCB0cmFuc3BhcmVudDtib3JkZXItcmlnaHQ6MTBweCBzb2xpZCB0cmFuc3BhcmVudH0ubXVsdGlzZWxlY3QtZHJvcGRvd24gLmRpc2FibGVkPnNwYW57YmFja2dyb3VuZC1jb2xvcjojZWNlZWVmfS5kcm9wZG93bi1saXN0e3Bvc2l0aW9uOmFic29sdXRlO3BhZGRpbmctdG9wOjZweDt3aWR0aDoxMDAlO3otaW5kZXg6OTk5OTtib3JkZXI6MXB4IHNvbGlkICNjY2M7Ym9yZGVyLXJhZGl1czozcHg7YmFja2dyb3VuZDojZmZmO21hcmdpbi10b3A6MTBweDtib3gtc2hhZG93OjAgMXB4IDVweCAjOTU5NTk1fS5kcm9wZG93bi1saXN0IHVse3BhZGRpbmc6MDtsaXN0LXN0eWxlOm5vbmU7b3ZlcmZsb3c6YXV0bzttYXJnaW46MH0uZHJvcGRvd24tbGlzdCBsaXtwYWRkaW5nOjZweCAxMHB4O2N1cnNvcjpwb2ludGVyO3RleHQtYWxpZ246bGVmdH0uZHJvcGRvd24tbGlzdCAuZmlsdGVyLXRleHRib3h7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgI2NjYztwb3NpdGlvbjpyZWxhdGl2ZTtwYWRkaW5nOjEwcHh9LmRyb3Bkb3duLWxpc3QgLmZpbHRlci10ZXh0Ym94IGlucHV0e2JvcmRlcjowO3dpZHRoOjEwMCU7cGFkZGluZzowIDAgMCAyNnB4fS5kcm9wZG93bi1saXN0IC5maWx0ZXItdGV4dGJveCBpbnB1dDpmb2N1c3tvdXRsaW5lOjB9Lm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF17Ym9yZGVyOjA7Y2xpcDpyZWN0KDAgMCAwIDApO2hlaWdodDoxcHg7bWFyZ2luOi0xcHg7b3ZlcmZsb3c6aGlkZGVuO3BhZGRpbmc6MDtwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDoxcHh9Lm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF06Zm9jdXMrZGl2OmJlZm9yZSwubXVsdGlzZWxlY3QtaXRlbS1jaGVja2JveCBpbnB1dFt0eXBlPWNoZWNrYm94XTpob3ZlcitkaXY6YmVmb3Jle2JvcmRlci1jb2xvcjojMzM3YWI3O2JhY2tncm91bmQtY29sb3I6I2YyZjJmMn0ubXVsdGlzZWxlY3QtaXRlbS1jaGVja2JveCBpbnB1dFt0eXBlPWNoZWNrYm94XTphY3RpdmUrZGl2OmJlZm9yZXt0cmFuc2l0aW9uLWR1cmF0aW9uOjBzfS5tdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdK2Rpdntwb3NpdGlvbjpyZWxhdGl2ZTtwYWRkaW5nLWxlZnQ6MmVtO3ZlcnRpY2FsLWFsaWduOm1pZGRsZTstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmU7Y3Vyc29yOnBvaW50ZXI7bWFyZ2luOjA7Y29sb3I6IzAwMH0ubXVsdGlzZWxlY3QtaXRlbS1jaGVja2JveCBpbnB1dFt0eXBlPWNoZWNrYm94XStkaXY6YmVmb3Jle2JveC1zaXppbmc6Y29udGVudC1ib3g7Y29udGVudDonJztjb2xvcjojMzM3YWI3O3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7bGVmdDowO3dpZHRoOjE0cHg7aGVpZ2h0OjE0cHg7bWFyZ2luLXRvcDotOXB4O2JvcmRlcjoycHggc29saWQgIzMzN2FiNzt0ZXh0LWFsaWduOmNlbnRlcjt0cmFuc2l0aW9uOmFsbCAuNHMgZWFzZX0ubXVsdGlzZWxlY3QtaXRlbS1jaGVja2JveCBpbnB1dFt0eXBlPWNoZWNrYm94XStkaXY6YWZ0ZXJ7Ym94LXNpemluZzpjb250ZW50LWJveDtjb250ZW50OicnO3Bvc2l0aW9uOmFic29sdXRlOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKDApO3RyYW5zZm9ybTpzY2FsZSgwKTstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46NTAlO3RyYW5zZm9ybS1vcmlnaW46NTAlO3RyYW5zaXRpb246LXdlYmtpdC10cmFuc2Zvcm0gLjJzIGVhc2Utb3V0O3RyYW5zaXRpb246dHJhbnNmb3JtIC4ycyBlYXNlLW91dDt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMnMgZWFzZS1vdXQsLXdlYmtpdC10cmFuc2Zvcm0gLjJzIGVhc2Utb3V0O2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQ7dG9wOjUwJTtsZWZ0OjRweDt3aWR0aDo4cHg7aGVpZ2h0OjNweDttYXJnaW4tdG9wOi00cHg7Ym9yZGVyLXN0eWxlOnNvbGlkO2JvcmRlci1jb2xvcjojZmZmO2JvcmRlci13aWR0aDowIDAgM3B4IDNweDstby1ib3JkZXItaW1hZ2U6bm9uZTtib3JkZXItaW1hZ2U6bm9uZTstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoLTQ1ZGVnKSBzY2FsZSgwKTt0cmFuc2Zvcm06cm90YXRlKC00NWRlZykgc2NhbGUoMCl9Lm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF06ZGlzYWJsZWQrZGl2OmJlZm9yZXtib3JkZXItY29sb3I6I2NjY30ubXVsdGlzZWxlY3QtaXRlbS1jaGVja2JveCBpbnB1dFt0eXBlPWNoZWNrYm94XTpkaXNhYmxlZDpmb2N1cytkaXY6YmVmb3JlIC5tdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdOmRpc2FibGVkOmhvdmVyK2RpdjpiZWZvcmV7YmFja2dyb3VuZC1jb2xvcjppbmhlcml0fS5tdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdOmRpc2FibGVkOmNoZWNrZWQrZGl2OmJlZm9yZXtiYWNrZ3JvdW5kLWNvbG9yOiNjY2N9Lm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF06Y2hlY2tlZCtkaXY6YWZ0ZXJ7Y29udGVudDonJzt0cmFuc2l0aW9uOi13ZWJraXQtdHJhbnNmb3JtIC4ycyBlYXNlLW91dDt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMnMgZWFzZS1vdXQ7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjJzIGVhc2Utb3V0LC13ZWJraXQtdHJhbnNmb3JtIC4ycyBlYXNlLW91dDstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoLTQ1ZGVnKSBzY2FsZSgxKTt0cmFuc2Zvcm06cm90YXRlKC00NWRlZykgc2NhbGUoMSl9Lm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF06Y2hlY2tlZCtkaXY6YmVmb3Jley13ZWJraXQtYW5pbWF0aW9uOi4ycyBlYXNlLWluIGJvcmRlcnNjYWxlO2FuaW1hdGlvbjouMnMgZWFzZS1pbiBib3JkZXJzY2FsZTtiYWNrZ3JvdW5kOiMzMzdhYjd9QC13ZWJraXQta2V5ZnJhbWVzIGJvcmRlcnNjYWxlezUwJXtib3gtc2hhZG93OjAgMCAwIDJweCAjMzM3YWI3fX1Aa2V5ZnJhbWVzIGJvcmRlcnNjYWxlezUwJXtib3gtc2hhZG93OjAgMCAwIDJweCAjMzM3YWI3fX1gXSxcclxuICBwcm92aWRlcnM6IFtEUk9QRE9XTl9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTXVsdGlTZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XHJcbiAgcHVibGljIF9zZXR0aW5nczogSURyb3Bkb3duU2V0dGluZ3M7XHJcbiAgcHVibGljIF9kYXRhOiBBcnJheTxMaXN0SXRlbT4gPSBbXTtcclxuICBwdWJsaWMgc2VsZWN0ZWRJdGVtczogQXJyYXk8TGlzdEl0ZW0+ID0gW107XHJcbiAgcHVibGljIGlzRHJvcGRvd25PcGVuID0gdHJ1ZTtcclxuICBfcGxhY2Vob2xkZXIgPSAnU2VsZWN0JztcclxuICBmaWx0ZXI6IExpc3RJdGVtID0gbmV3IExpc3RJdGVtKHRoaXMuZGF0YSk7XHJcbiAgZGVmYXVsdFNldHRpbmdzOiBJRHJvcGRvd25TZXR0aW5ncyA9IHtcclxuICAgIHNpbmdsZVNlbGVjdGlvbjogZmFsc2UsXHJcbiAgICBpZEZpZWxkOiAnaWQnLFxyXG4gICAgdGV4dEZpZWxkOiAndGV4dCcsXHJcbiAgICBlbmFibGVDaGVja0FsbDogdHJ1ZSxcclxuICAgIHNlbGVjdEFsbFRleHQ6ICdTZWxlY3QgQWxsJyxcclxuICAgIHVuU2VsZWN0QWxsVGV4dDogJ1VuU2VsZWN0IEFsbCcsXHJcbiAgICBhbGxvd1NlYXJjaEZpbHRlcjogZmFsc2UsXHJcbiAgICBsaW1pdFNlbGVjdGlvbjogLTEsXHJcbiAgICBjbGVhclNlYXJjaEZpbHRlcjogdHJ1ZSxcclxuICAgIG1heEhlaWdodDogMTk3LFxyXG4gICAgaXRlbXNTaG93TGltaXQ6IDk5OTk5OTk5OTk5OSxcclxuICAgIHNlYXJjaFBsYWNlaG9sZGVyVGV4dDogJ1NlYXJjaCcsXHJcbiAgICBub0RhdGFBdmFpbGFibGVQbGFjZWhvbGRlclRleHQ6ICdObyBkYXRhIGF2YWlsYWJsZScsXHJcbiAgICBjbG9zZURyb3BEb3duT25TZWxlY3Rpb246IGZhbHNlLFxyXG4gICAgc2hvd1NlbGVjdGVkSXRlbXNBdFRvcDogZmFsc2UsXHJcbiAgICBkZWZhdWx0T3BlbjogZmFsc2VcclxuICB9O1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHB1YmxpYyBzZXQgcGxhY2Vob2xkZXIodmFsdWU6IHN0cmluZykge1xyXG4gICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuX3BsYWNlaG9sZGVyID0gdmFsdWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9wbGFjZWhvbGRlciA9ICdTZWxlY3QnO1xyXG4gICAgfVxyXG4gIH1cclxuICBASW5wdXQoKVxyXG4gIGRpc2FibGVkID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgcHVibGljIHNldCBzZXR0aW5ncyh2YWx1ZTogSURyb3Bkb3duU2V0dGluZ3MpIHtcclxuICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICB0aGlzLl9zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24odGhpcy5kZWZhdWx0U2V0dGluZ3MsIHZhbHVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX3NldHRpbmdzID0gT2JqZWN0LmFzc2lnbih0aGlzLmRlZmF1bHRTZXR0aW5ncyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIHB1YmxpYyBzZXQgZGF0YSh2YWx1ZTogQXJyYXk8YW55Pikge1xyXG4gICAgaWYgKCF2YWx1ZSkge1xyXG4gICAgICB0aGlzLl9kYXRhID0gW107XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBjb25zdCBfaXRlbXMgPSB2YWx1ZS5maWx0ZXIoKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICAvLyAgIGlmICh0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZycgfHwgKHR5cGVvZiBpdGVtID09PSAnb2JqZWN0JyAmJiBpdGVtICYmIGl0ZW1bdGhpcy5fc2V0dGluZ3MuaWRGaWVsZF0gJiYgaXRlbVt0aGlzLl9zZXR0aW5ncy50ZXh0RmllbGRdKSkge1xyXG4gICAgICAvLyAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICAgIC8vICAgfVxyXG4gICAgICAvLyB9KTtcclxuICAgICAgdGhpcy5fZGF0YSA9IHZhbHVlLm1hcChcclxuICAgICAgICAoaXRlbTogYW55KSA9PlxyXG4gICAgICAgICAgdHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnXHJcbiAgICAgICAgICAgID8gbmV3IExpc3RJdGVtKGl0ZW0pXHJcbiAgICAgICAgICAgIDogbmV3IExpc3RJdGVtKHtcclxuICAgICAgICAgICAgICAgIGlkOiBpdGVtW3RoaXMuX3NldHRpbmdzLmlkRmllbGRdLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogaXRlbVt0aGlzLl9zZXR0aW5ncy50ZXh0RmllbGRdXHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBPdXRwdXQoJ29uRmlsdGVyQ2hhbmdlJylcclxuICBvbkZpbHRlckNoYW5nZTogRXZlbnRFbWl0dGVyPExpc3RJdGVtPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIEBPdXRwdXQoJ29uRHJvcERvd25DbG9zZScpXHJcbiAgb25Ecm9wRG93bkNsb3NlOiBFdmVudEVtaXR0ZXI8TGlzdEl0ZW0+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gIEBPdXRwdXQoJ29uU2VsZWN0JylcclxuICBvblNlbGVjdDogRXZlbnRFbWl0dGVyPExpc3RJdGVtPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICBAT3V0cHV0KCdvbkRlU2VsZWN0JylcclxuICBvbkRlU2VsZWN0OiBFdmVudEVtaXR0ZXI8TGlzdEl0ZW0+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gIEBPdXRwdXQoJ29uU2VsZWN0QWxsJylcclxuICBvblNlbGVjdEFsbDogRXZlbnRFbWl0dGVyPEFycmF5PExpc3RJdGVtPj4gPSBuZXcgRXZlbnRFbWl0dGVyPEFycmF5PGFueT4+KCk7XHJcblxyXG4gIEBPdXRwdXQoJ29uRGVTZWxlY3RBbGwnKVxyXG4gIG9uRGVTZWxlY3RBbGw6IEV2ZW50RW1pdHRlcjxBcnJheTxMaXN0SXRlbT4+ID0gbmV3IEV2ZW50RW1pdHRlcjxBcnJheTxhbnk+PigpO1xyXG5cclxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gbm9vcDtcclxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xyXG5cclxuICBvbkZpbHRlclRleHRDaGFuZ2UoJGV2ZW50KSB7XHJcbiAgICB0aGlzLm9uRmlsdGVyQ2hhbmdlLmVtaXQoJGV2ZW50KTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge31cclxuXHJcbiAgb25JdGVtQ2xpY2soJGV2ZW50OiBhbnksIGl0ZW06IExpc3RJdGVtKSB7XHJcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZm91bmQgPSB0aGlzLmlzU2VsZWN0ZWQoaXRlbSk7XHJcbiAgICBjb25zdCBhbGxvd0FkZCA9XHJcbiAgICAgIHRoaXMuX3NldHRpbmdzLmxpbWl0U2VsZWN0aW9uID09PSAtMSB8fFxyXG4gICAgICAodGhpcy5fc2V0dGluZ3MubGltaXRTZWxlY3Rpb24gPiAwICYmXHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aCA8IHRoaXMuX3NldHRpbmdzLmxpbWl0U2VsZWN0aW9uKTtcclxuICAgIGlmICghZm91bmQpIHtcclxuICAgICAgaWYgKGFsbG93QWRkKSB7XHJcbiAgICAgICAgdGhpcy5hZGRTZWxlY3RlZChpdGVtKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5yZW1vdmVTZWxlY3RlZChpdGVtKTtcclxuICAgIH1cclxuICAgIGlmIChcclxuICAgICAgdGhpcy5fc2V0dGluZ3Muc2luZ2xlU2VsZWN0aW9uICYmXHJcbiAgICAgIHRoaXMuX3NldHRpbmdzLmNsb3NlRHJvcERvd25PblNlbGVjdGlvblxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XHJcbiAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGlmICh0aGlzLl9zZXR0aW5ncy5zaW5nbGVTZWxlY3Rpb24pIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA+PSAxKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0SXRlbSA9IHZhbHVlWzBdO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBbXHJcbiAgICAgICAgICAgICAgdHlwZW9mIGZpcnN0SXRlbSA9PT0gJ3N0cmluZydcclxuICAgICAgICAgICAgICAgID8gbmV3IExpc3RJdGVtKGZpcnN0SXRlbSlcclxuICAgICAgICAgICAgICAgIDogbmV3IExpc3RJdGVtKHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogZmlyc3RJdGVtW3RoaXMuX3NldHRpbmdzLmlkRmllbGRdLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IGZpcnN0SXRlbVt0aGlzLl9zZXR0aW5ncy50ZXh0RmllbGRdXHJcbiAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgLy8gY29uc29sZS5lcnJvcihlLmJvZHkubXNnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgX2RhdGEgPSB2YWx1ZS5tYXAoXHJcbiAgICAgICAgICAoaXRlbTogYW55KSA9PlxyXG4gICAgICAgICAgICB0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZydcclxuICAgICAgICAgICAgICA/IG5ldyBMaXN0SXRlbShpdGVtKVxyXG4gICAgICAgICAgICAgIDogbmV3IExpc3RJdGVtKHtcclxuICAgICAgICAgICAgICAgICAgaWQ6IGl0ZW1bdGhpcy5fc2V0dGluZ3MuaWRGaWVsZF0sXHJcbiAgICAgICAgICAgICAgICAgIHRleHQ6IGl0ZW1bdGhpcy5fc2V0dGluZ3MudGV4dEZpZWxkXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICApO1xyXG4gICAgICAgIGlmICh0aGlzLl9zZXR0aW5ncy5saW1pdFNlbGVjdGlvbiA+IDApIHtcclxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IF9kYXRhLnNwbGljZSgwLCB0aGlzLl9zZXR0aW5ncy5saW1pdFNlbGVjdGlvbik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IF9kYXRhO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gW107XHJcbiAgICB9XHJcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcclxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcclxuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xyXG4gIH1cclxuXHJcbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XHJcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XHJcbiAgfVxyXG5cclxuICAvLyBTZXQgdG91Y2hlZCBvbiBibHVyXHJcbiAgQEhvc3RMaXN0ZW5lcignYmx1cicpXHJcbiAgcHVibGljIG9uVG91Y2hlZCgpIHtcclxuICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xyXG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xyXG4gIH1cclxuXHJcbiAgdHJhY2tCeUZuKGluZGV4LCBpdGVtKSB7XHJcbiAgICByZXR1cm4gaXRlbS5pZDtcclxuICB9XHJcblxyXG4gIGlzU2VsZWN0ZWQoY2xpY2tlZEl0ZW06IExpc3RJdGVtKSB7XHJcbiAgICBsZXQgZm91bmQgPSBmYWxzZTtcclxuICAgIHRoaXMuc2VsZWN0ZWRJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICBpZiAoY2xpY2tlZEl0ZW0uaWQgPT09IGl0ZW0uaWQpIHtcclxuICAgICAgICBmb3VuZCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGZvdW5kO1xyXG4gIH1cclxuXHJcbiAgaXNMaW1pdFNlbGVjdGlvblJlYWNoZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3MubGltaXRTZWxlY3Rpb24gPT09IHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGg7XHJcbiAgfVxyXG5cclxuICBpc0FsbEl0ZW1zU2VsZWN0ZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGF0YS5sZW5ndGggPT09IHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGg7XHJcbiAgfVxyXG5cclxuICBzaG93QnV0dG9uKCk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKCF0aGlzLl9zZXR0aW5ncy5zaW5nbGVTZWxlY3Rpb24pIHtcclxuICAgICAgaWYgKHRoaXMuX3NldHRpbmdzLmxpbWl0U2VsZWN0aW9uID4gMCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICAvLyB0aGlzLl9zZXR0aW5ncy5lbmFibGVDaGVja0FsbCA9IHRoaXMuX3NldHRpbmdzLmxpbWl0U2VsZWN0aW9uID09PSAtMSA/IHRydWUgOiBmYWxzZTtcclxuICAgICAgcmV0dXJuIHRydWU7IC8vICF0aGlzLl9zZXR0aW5ncy5zaW5nbGVTZWxlY3Rpb24gJiYgdGhpcy5fc2V0dGluZ3MuZW5hYmxlQ2hlY2tBbGwgJiYgdGhpcy5fZGF0YS5sZW5ndGggPiAwO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gc2hvdWxkIGJlIGRpc2FibGVkIGluIHNpbmdsZSBzZWxlY3Rpb24gbW9kZVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpdGVtU2hvd1JlbWFpbmluZygpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGggLSB0aGlzLl9zZXR0aW5ncy5pdGVtc1Nob3dMaW1pdDtcclxuICB9XHJcblxyXG4gIGFkZFNlbGVjdGVkKGl0ZW06IExpc3RJdGVtKSB7XHJcbiAgICBpZiAodGhpcy5fc2V0dGluZ3Muc2luZ2xlU2VsZWN0aW9uKSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IFtdO1xyXG4gICAgICB0aGlzLnNlbGVjdGVkSXRlbXMucHVzaChpdGVtKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcy5wdXNoKGl0ZW0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMuZW1pdHRlZFZhbHVlKHRoaXMuc2VsZWN0ZWRJdGVtcykpO1xyXG4gICAgdGhpcy5vblNlbGVjdC5lbWl0KHRoaXMuZW1pdHRlZFZhbHVlKGl0ZW0pKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZVNlbGVjdGVkKGl0ZW1TZWw6IExpc3RJdGVtKSB7XHJcbiAgICB0aGlzLnNlbGVjdGVkSXRlbXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgaWYgKGl0ZW1TZWwuaWQgPT09IGl0ZW0uaWQpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMuc3BsaWNlKHRoaXMuc2VsZWN0ZWRJdGVtcy5pbmRleE9mKGl0ZW0pLCAxKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy5lbWl0dGVkVmFsdWUodGhpcy5zZWxlY3RlZEl0ZW1zKSk7XHJcbiAgICB0aGlzLm9uRGVTZWxlY3QuZW1pdCh0aGlzLmVtaXR0ZWRWYWx1ZShpdGVtU2VsKSk7XHJcbiAgfVxyXG5cclxuICBlbWl0dGVkVmFsdWUodmFsOiBhbnkpOiBhbnkge1xyXG4gICAgY29uc3Qgc2VsZWN0ZWQgPSBbXTtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcclxuICAgICAgdmFsLm1hcChpdGVtID0+IHtcclxuICAgICAgICBpZiAoaXRlbS5pZCA9PT0gaXRlbS50ZXh0KSB7XHJcbiAgICAgICAgICBzZWxlY3RlZC5wdXNoKGl0ZW0udGV4dCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHNlbGVjdGVkLnB1c2godGhpcy5vYmplY3RpZnkoaXRlbSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodmFsKSB7XHJcbiAgICAgICAgaWYgKHZhbC5pZCA9PT0gdmFsLnRleHQpIHtcclxuICAgICAgICAgIHJldHVybiB2YWwudGV4dDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMub2JqZWN0aWZ5KHZhbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2VsZWN0ZWQ7XHJcbiAgfVxyXG5cclxuICBvYmplY3RpZnkodmFsOiBMaXN0SXRlbSkge1xyXG4gICAgY29uc3Qgb2JqID0ge307XHJcbiAgICBvYmpbdGhpcy5fc2V0dGluZ3MuaWRGaWVsZF0gPSB2YWwuaWQ7XHJcbiAgICBvYmpbdGhpcy5fc2V0dGluZ3MudGV4dEZpZWxkXSA9IHZhbC50ZXh0O1xyXG4gICAgcmV0dXJuIG9iajtcclxuICB9XHJcblxyXG4gIHRvZ2dsZURyb3Bkb3duKGV2dCkge1xyXG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBpZiAodGhpcy5kaXNhYmxlZCAmJiB0aGlzLl9zZXR0aW5ncy5zaW5nbGVTZWxlY3Rpb24pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fc2V0dGluZ3MuZGVmYXVsdE9wZW4gPSAhdGhpcy5fc2V0dGluZ3MuZGVmYXVsdE9wZW47XHJcbiAgICBpZiAoIXRoaXMuX3NldHRpbmdzLmRlZmF1bHRPcGVuKSB7XHJcbiAgICAgIHRoaXMub25Ecm9wRG93bkNsb3NlLmVtaXQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNsb3NlRHJvcGRvd24oKSB7XHJcbiAgICB0aGlzLl9zZXR0aW5ncy5kZWZhdWx0T3BlbiA9IGZhbHNlO1xyXG4gICAgLy8gY2xlYXIgc2VhcmNoIHRleHRcclxuICAgIGlmICh0aGlzLl9zZXR0aW5ncy5jbGVhclNlYXJjaEZpbHRlcikge1xyXG4gICAgICB0aGlzLmZpbHRlci50ZXh0ID0gJyc7XHJcbiAgICB9XHJcbiAgICB0aGlzLm9uRHJvcERvd25DbG9zZS5lbWl0KCk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVTZWxlY3RBbGwoKSB7XHJcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMuaXNBbGxJdGVtc1NlbGVjdGVkKCkpIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gdGhpcy5fZGF0YS5zbGljZSgpO1xyXG4gICAgICB0aGlzLm9uU2VsZWN0QWxsLmVtaXQodGhpcy5lbWl0dGVkVmFsdWUodGhpcy5zZWxlY3RlZEl0ZW1zKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBbXTtcclxuICAgICAgdGhpcy5vbkRlU2VsZWN0QWxsLmVtaXQodGhpcy5lbWl0dGVkVmFsdWUodGhpcy5zZWxlY3RlZEl0ZW1zKSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy5lbWl0dGVkVmFsdWUodGhpcy5zZWxlY3RlZEl0ZW1zKSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbY2xpY2tPdXRzaWRlXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIENsaWNrT3V0c2lkZURpcmVjdGl2ZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XHJcbiAgICB9XHJcblxyXG4gICAgQE91dHB1dCgpXHJcbiAgICBwdWJsaWMgY2xpY2tPdXRzaWRlID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQnLCAnJGV2ZW50LnRhcmdldCddKVxyXG4gICAgcHVibGljIG9uQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQsIHRhcmdldEVsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0YXJnZXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGNsaWNrZWRJbnNpZGUgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY29udGFpbnModGFyZ2V0RWxlbWVudCk7XHJcbiAgICAgICAgaWYgKCFjbGlja2VkSW5zaWRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpY2tPdXRzaWRlLmVtaXQoZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBMaXN0SXRlbSB9IGZyb20gJy4vbXVsdGlzZWxlY3QubW9kZWwnO1xyXG5cclxuQFBpcGUoe1xyXG4gICAgbmFtZTogJ25nMkxpc3RGaWx0ZXInLFxyXG4gICAgcHVyZTogZmFsc2VcclxufSlcclxuZXhwb3J0IGNsYXNzIExpc3RGaWx0ZXJQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgICB0cmFuc2Zvcm0oaXRlbXM6IExpc3RJdGVtW10sIGZpbHRlcjogTGlzdEl0ZW0pOiBMaXN0SXRlbVtdIHtcclxuICAgICAgICBpZiAoIWl0ZW1zIHx8ICFmaWx0ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW1zO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXRlbXMuZmlsdGVyKChpdGVtOiBMaXN0SXRlbSkgPT4gdGhpcy5hcHBseUZpbHRlcihpdGVtLCBmaWx0ZXIpKTtcclxuICAgIH1cclxuXHJcbiAgICBhcHBseUZpbHRlcihpdGVtOiBMaXN0SXRlbSwgZmlsdGVyOiBMaXN0SXRlbSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAhKGZpbHRlci50ZXh0ICYmIGl0ZW0udGV4dCAmJiBpdGVtLnRleHQudG9Mb3dlckNhc2UoKS5pbmRleE9mKGZpbHRlci50ZXh0LnRvTG93ZXJDYXNlKCkpID09PSAtMSk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IE11bHRpU2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnLi9tdWx0aXNlbGVjdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDbGlja091dHNpZGVEaXJlY3RpdmUgfSBmcm9tICcuL2NsaWNrLW91dHNpZGUuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgTGlzdEZpbHRlclBpcGUgfSBmcm9tICcuL2xpc3QtZmlsdGVyLnBpcGUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbTXVsdGlTZWxlY3RDb21wb25lbnQsIENsaWNrT3V0c2lkZURpcmVjdGl2ZSwgTGlzdEZpbHRlclBpcGVdLFxyXG4gIGV4cG9ydHM6IFtNdWx0aVNlbGVjdENvbXBvbmVudF1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBOZ011bHRpU2VsZWN0RHJvcERvd25Nb2R1bGUge1xyXG4gICAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgbmdNb2R1bGU6IE5nTXVsdGlTZWxlY3REcm9wRG93bk1vZHVsZVxyXG4gICAgICB9O1xyXG4gICAgfVxyXG59XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQW1CQSxJQUFBO3NCQUlxQixNQUFXO1FBQzVCLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO1lBQzlCLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7U0FDOUI7UUFDRCxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtZQUM5QixJQUFJLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ3pCOzttQkE5Qkw7SUFnQ0MsQ0FBQTs7Ozs7O0FDaENELHFCQWFhLCtCQUErQixHQUFRO0lBQ2xELE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsb0JBQW9CLEdBQUEsQ0FBQztJQUNuRCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFDRixxQkFBTSxJQUFJLEdBQUcsZUFBUSxDQUFDOztJQXVJcEIsOEJBQW9CLEdBQXNCO1FBQXRCLFFBQUcsR0FBSCxHQUFHLENBQW1CO3FCQTFGVixFQUFFOzZCQUNNLEVBQUU7OEJBQ2xCLElBQUk7NEJBQ2IsUUFBUTtzQkFDSixJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDOytCQUNMO1lBQ25DLGVBQWUsRUFBRSxLQUFLO1lBQ3RCLE9BQU8sRUFBRSxJQUFJO1lBQ2IsU0FBUyxFQUFFLE1BQU07WUFDakIsY0FBYyxFQUFFLElBQUk7WUFDcEIsYUFBYSxFQUFFLFlBQVk7WUFDM0IsZUFBZSxFQUFFLGNBQWM7WUFDL0IsaUJBQWlCLEVBQUUsS0FBSztZQUN4QixjQUFjLEVBQUUsQ0FBQyxDQUFDO1lBQ2xCLGlCQUFpQixFQUFFLElBQUk7WUFDdkIsU0FBUyxFQUFFLEdBQUc7WUFDZCxjQUFjLEVBQUUsWUFBWTtZQUM1QixxQkFBcUIsRUFBRSxRQUFRO1lBQy9CLDhCQUE4QixFQUFFLG1CQUFtQjtZQUNuRCx3QkFBd0IsRUFBRSxLQUFLO1lBQy9CLHNCQUFzQixFQUFFLEtBQUs7WUFDN0IsV0FBVyxFQUFFLEtBQUs7U0FDbkI7d0JBV1UsS0FBSzs4QkFrQ3lCLElBQUksWUFBWSxFQUFPOytCQUV0QixJQUFJLFlBQVksRUFBTzt3QkFHOUIsSUFBSSxZQUFZLEVBQU87MEJBR3JCLElBQUksWUFBWSxFQUFPOzJCQUdmLElBQUksWUFBWSxFQUFjOzZCQUc1QixJQUFJLFlBQVksRUFBYztpQ0FFckMsSUFBSTtnQ0FDQyxJQUFJO0tBTUg7MEJBakVuQyw2Q0FBVzs7Ozs7a0JBQUMsS0FBYTtZQUNsQyxJQUFJLEtBQUssRUFBRTtnQkFDVCxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQzthQUMzQjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQzthQUM5Qjs7Ozs7MEJBTVEsMENBQVE7Ozs7O2tCQUFDLEtBQXdCO1lBQzFDLElBQUksS0FBSyxFQUFFO2dCQUNULElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQzdEO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7YUFDdEQ7Ozs7OzBCQUlRLHNDQUFJOzs7OztrQkFBQyxLQUFpQjs7WUFDL0IsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDVixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQzthQUNqQjtpQkFBTTs7Ozs7O2dCQU1MLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FDcEIsVUFBQyxJQUFTO29CQUNSLE9BQUEsT0FBTyxJQUFJLEtBQUssUUFBUTswQkFDcEIsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDOzBCQUNsQixJQUFJLFFBQVEsQ0FBQzs0QkFDWCxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDOzRCQUNoQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO3lCQUNyQyxDQUFDO2lCQUFBLENBQ1QsQ0FBQzthQUNIOzs7Ozs7Ozs7SUF1QkgsaURBQWtCOzs7O0lBQWxCLFVBQW1CLE1BQU07UUFDdkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDbEM7Ozs7OztJQUlELDBDQUFXOzs7OztJQUFYLFVBQVksTUFBVyxFQUFFLElBQWM7UUFDckMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxxQkFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxxQkFBTSxRQUFRLEdBQ1osSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEtBQUssQ0FBQyxDQUFDO2FBQ25DLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxHQUFHLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLElBQUksUUFBUSxFQUFFO2dCQUNaLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDeEI7U0FDRjthQUFNO1lBQ0wsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMzQjtRQUNELElBQ0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlO1lBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsd0JBQ2pCLEVBQUU7WUFDQSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDdEI7S0FDRjs7Ozs7SUFFRCx5Q0FBVTs7OztJQUFWLFVBQVcsS0FBVTtRQUFyQixpQkFzQ0M7UUFyQ0MsSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDN0QsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRTtnQkFDbEMsSUFBSTtvQkFDRixJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO3dCQUNyQixxQkFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMzQixJQUFJLENBQUMsYUFBYSxHQUFHOzRCQUNuQixPQUFPLFNBQVMsS0FBSyxRQUFRO2tDQUN6QixJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUM7a0NBQ3ZCLElBQUksUUFBUSxDQUFDO29DQUNYLEVBQUUsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7b0NBQ3JDLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7aUNBQzFDLENBQUM7eUJBQ1AsQ0FBQztxQkFDSDtpQkFDRjtnQkFBQyx3QkFBTyxDQUFDLEVBQUU7O2lCQUVYO2FBQ0Y7aUJBQU07Z0JBQ0wscUJBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQ3JCLFVBQUMsSUFBUztvQkFDUixPQUFBLE9BQU8sSUFBSSxLQUFLLFFBQVE7MEJBQ3BCLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQzswQkFDbEIsSUFBSSxRQUFRLENBQUM7NEJBQ1gsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQzs0QkFDaEMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQzt5QkFDckMsQ0FBQztpQkFBQSxDQUNULENBQUM7Z0JBQ0YsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsR0FBRyxDQUFDLEVBQUU7b0JBQ3JDLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQztpQkFDckU7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7aUJBQzVCO2FBQ0Y7U0FDRjthQUFNO1lBQ0wsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7U0FDekI7UUFDRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDOUI7Ozs7OztJQUdELCtDQUFnQjs7OztJQUFoQixVQUFpQixFQUFPO1FBQ3RCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7S0FDNUI7Ozs7OztJQUdELGdEQUFpQjs7OztJQUFqQixVQUFrQixFQUFPO1FBQ3ZCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7S0FDN0I7Ozs7SUFJTSx3Q0FBUzs7OztRQUNkLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzs7Ozs7OztJQUczQix3Q0FBUzs7Ozs7SUFBVCxVQUFVLEtBQUssRUFBRSxJQUFJO1FBQ25CLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztLQUNoQjs7Ozs7SUFFRCx5Q0FBVTs7OztJQUFWLFVBQVcsV0FBcUI7UUFDOUIscUJBQUksS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNsQixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7WUFDN0IsSUFBSSxXQUFXLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxFQUFFLEVBQUU7Z0JBQzlCLEtBQUssR0FBRyxJQUFJLENBQUM7YUFDZDtTQUNGLENBQUMsQ0FBQztRQUNILE9BQU8sS0FBSyxDQUFDO0tBQ2Q7Ozs7SUFFRCxzREFBdUI7OztJQUF2QjtRQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEtBQUssSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7S0FDcEU7Ozs7SUFFRCxpREFBa0I7OztJQUFsQjtRQUNFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7S0FDeEQ7Ozs7SUFFRCx5Q0FBVTs7O0lBQVY7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLEVBQUU7WUFDbkMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3JDLE9BQU8sS0FBSyxDQUFDO2FBQ2Q7O1lBRUQsT0FBTyxJQUFJLENBQUM7U0FDYjthQUFNOztZQUVMLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7S0FDRjs7OztJQUVELGdEQUFpQjs7O0lBQWpCO1FBQ0UsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQztLQUNsRTs7Ozs7SUFFRCwwQ0FBVzs7OztJQUFYLFVBQVksSUFBYztRQUN4QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxFQUFFO1lBQ2xDLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQy9CO2FBQU07WUFDTCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMvQjtRQUNELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztLQUM3Qzs7Ozs7SUFFRCw2Q0FBYzs7OztJQUFkLFVBQWUsT0FBaUI7UUFBaEMsaUJBUUM7UUFQQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7WUFDN0IsSUFBSSxPQUFPLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxFQUFFLEVBQUU7Z0JBQzFCLEtBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ2hFO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0tBQ2xEOzs7OztJQUVELDJDQUFZOzs7O0lBQVosVUFBYSxHQUFRO1FBQXJCLGlCQW9CQztRQW5CQyxxQkFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN0QixHQUFHLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSTtnQkFDVixJQUFJLElBQUksQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLElBQUksRUFBRTtvQkFDekIsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzFCO3FCQUFNO29CQUNMLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2lCQUNyQzthQUNGLENBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxJQUFJLEdBQUcsRUFBRTtnQkFDUCxJQUFJLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxDQUFDLElBQUksRUFBRTtvQkFDdkIsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDO2lCQUNqQjtxQkFBTTtvQkFDTCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQzVCO2FBQ0Y7U0FDRjtRQUNELE9BQU8sUUFBUSxDQUFDO0tBQ2pCOzs7OztJQUVELHdDQUFTOzs7O0lBQVQsVUFBVSxHQUFhO1FBQ3JCLHFCQUFNLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDZixHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQ3JDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDekMsT0FBTyxHQUFHLENBQUM7S0FDWjs7Ozs7SUFFRCw2Q0FBYzs7OztJQUFkLFVBQWUsR0FBRztRQUNoQixHQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDckIsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxFQUFFO1lBQ25ELE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7UUFDekQsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFO1lBQy9CLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDN0I7S0FDRjs7OztJQUVELDRDQUFhOzs7SUFBYjtRQUNFLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQzs7UUFFbkMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFO1lBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztTQUN2QjtRQUNELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDN0I7Ozs7SUFFRCw4Q0FBZTs7O0lBQWY7UUFDRSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsRUFBRTtZQUM5QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDeEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztTQUM5RDthQUFNO1lBQ0wsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztTQUNoRTtRQUNELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0tBQzlEOztnQkFsVkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx5QkFBeUI7b0JBQ25DLFFBQVEsRUFBRSw0NkVBa0NMO29CQUNMLE1BQU0sRUFBRSxDQUFDLHUvSEFBdS9ILENBQUM7b0JBQ2pnSSxTQUFTLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQztvQkFDNUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzs7O2dCQXBEQyxpQkFBaUI7OztnQ0ErRWhCLEtBQUs7NkJBUUwsS0FBSzs2QkFHTCxLQUFLO3lCQVNMLEtBQUs7bUNBc0JMLE1BQU0sU0FBQyxnQkFBZ0I7b0NBRXZCLE1BQU0sU0FBQyxpQkFBaUI7NkJBR3hCLE1BQU0sU0FBQyxVQUFVOytCQUdqQixNQUFNLFNBQUMsWUFBWTtnQ0FHbkIsTUFBTSxTQUFDLGFBQWE7a0NBR3BCLE1BQU0sU0FBQyxlQUFlOzhCQXdGdEIsWUFBWSxTQUFDLE1BQU07OytCQXZPdEI7Ozs7Ozs7QUNBQTtJQU1JLCtCQUFvQixXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTs0QkFJckIsSUFBSSxZQUFZLEVBQWM7S0FIbkQ7Ozs7OztJQU1NLHVDQUFPOzs7OztjQUFDLEtBQWlCLEVBQUUsYUFBMEI7UUFDeEQsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNoQixPQUFPO1NBQ1Y7UUFFRCxxQkFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzdFLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDakM7OztnQkFuQlIsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxnQkFBZ0I7aUJBQzdCOzs7O2dCQUprQixVQUFVOzs7aUNBU3hCLE1BQU07NEJBR04sWUFBWSxTQUFDLGdCQUFnQixFQUFFLENBQUMsUUFBUSxFQUFFLGVBQWUsQ0FBQzs7Z0NBWi9EOzs7Ozs7O0FDQUE7Ozs7Ozs7O0lBU0ksa0NBQVM7Ozs7O0lBQVQsVUFBVSxLQUFpQixFQUFFLE1BQWdCO1FBQTdDLGlCQUtDO1FBSkcsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNuQixPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFDLElBQWMsSUFBSyxPQUFBLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFBLENBQUMsQ0FBQztLQUMzRTs7Ozs7O0lBRUQsb0NBQVc7Ozs7O0lBQVgsVUFBWSxJQUFjLEVBQUUsTUFBZ0I7UUFDeEMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMzRzs7Z0JBZEosSUFBSSxTQUFDO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixJQUFJLEVBQUUsS0FBSztpQkFDZDs7eUJBUEQ7Ozs7Ozs7QUNBQTs7Ozs7O0lBY1csbUNBQU87OztJQUFkO1FBQ0UsT0FBTztZQUNMLFFBQVEsRUFBRSwyQkFBMkI7U0FDdEMsQ0FBQztLQUNIOztnQkFYSixRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQztvQkFDcEMsWUFBWSxFQUFFLENBQUMsb0JBQW9CLEVBQUUscUJBQXFCLEVBQUUsY0FBYyxDQUFDO29CQUMzRSxPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztpQkFDaEM7O3NDQVhEOzs7Ozs7Ozs7Ozs7Ozs7In0=

/***/ }),

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

/***/ "./src/app/layout/common-blocks/fill-information/fill-information.component.css":
/*!**************************************************************************************!*\
  !*** ./src/app/layout/common-blocks/fill-information/fill-information.component.css ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/layout/common-blocks/fill-information/fill-information.component.html":
/*!***************************************************************************************!*\
  !*** ./src/app/layout/common-blocks/fill-information/fill-information.component.html ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"white-bg padding15\">\n    <p class=\"p16 marginB0\">Fill in Information</p>\n</div>\n\n<hr class=\"margin0\" *ngIf=\"leadData\">\n\n<!-- <div class=\"white-bg padding40 fill-info\" malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\"> -->\n        <div class=\"white-bg padding40 fill-info\" malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\">\n\n    <div class=\"form-group-5\">\n        <label>What your are looking for?</label>\n        <div class=\"clearfix\"></div>\n        <label class=\"cust-radio\">\n            <input name=\"looking_for\" type=\"radio\" (change)=\"leadData.prefs.looking_for = 1\"\n                [checked]=\"leadData.prefs.looking_for == 1 ?'checked':''\">\n            <span class=\"checkmark\">{{ts.lang.Buy}}</span>\n        </label>\n        <label class=\"cust-radio\">\n            <input name=\"looking_for\" type=\"radio\" (change)=\"leadData.prefs.looking_for = 2\"\n                [checked]=\"leadData.prefs.looking_for == 2 ?'checked':''\">\n            <span class=\"checkmark\">Rent</span>\n        </label>\n        <div class=\"clearfix\"></div>\n    </div>\n\n    <div class=\"form-group-5 marginT20\">\n        <label>Configuration</label>\n        <div class=\"clearfix\"></div>\n        <p class=\"p10\">I would like to know more about</p>\n\n        <p class=\"p11\">Bedroom</p>\n        <label class=\"cust-radio\" *ngFor=\"let count of configurationCount\">\n            <input name=\"bedroom\" type=\"radio\" (change)=\"setPrefValue('bedroom', count)\"\n                [checked]=\"leadData.prefs.bedroom == count ?'checked':''\">\n            <span class=\"checkmark\">{{count}}</span>\n        </label>\n        <div class=\"clearfix\"></div>\n\n        <p class=\"p11\">Bathroom</p>\n        <label class=\"cust-radio\" *ngFor=\"let count of configurationCount\">\n            <input name=\"bathroom\" type=\"radio\" (change)=\"setPrefValue('bathroom', count)\"\n                [checked]=\"leadData.prefs.bathroom == count ?'checked':''\">\n            <span class=\"checkmark\">{{count}}</span>\n        </label>\n        <div class=\"clearfix\"></div>\n\n        <p class=\"p11\">Half Bathroom</p>\n        <label class=\"cust-radio\" *ngFor=\"let count of configurationCount\">\n            <input name=\"half_bathroom\" type=\"radio\" (change)=\"setPrefValue('half_bathroom', count)\"\n                [checked]=\"leadData.prefs.half_bathroom == count ?'checked':''\">\n            <span class=\"checkmark\">{{count}}</span>\n        </label>\n        <div class=\"clearfix\"></div>\n    </div>\n\n    <div class=\"form-group-4 marginT20\">\n        <label>Price expectations</label>\n        <div class=\"row\">\n            <div class=\"col-md-4 col-sm-12 col-12\">\n                <!-- <div class=\"form-group-3 eca\">\n                    <span class=\"input-group-addon\">$</span>\n                    <input class=\"form-control\" type=\"number\" name=\"min_price\" [(ngModel)]=\"leadData.prefs.min_price\">\n                </div> -->\n                <div class=\"input-group m-b\">\n                    <span class=\"input-group-addon marginR2\">$</span>\n                    <input class=\"form-control\" type=\"number\" name=\"min_price\" [(ngModel)]=\"leadData.prefs.min_price\">\n                </div>\n            </div>\n            <div class=\"col-md-2 col-sm-12 col-12\">\n                To\n            </div>\n            <div class=\"col-md-4 col-sm-12 col-12\">\n                <div class=\"input-group m-b\">\n                    <span class=\"input-group-addon marginR2\">$</span>\n                    <input class=\"form-control\" type=\"number\" name=\"max_price\" [(ngModel)]=\"leadData.prefs.max_price\">\n                </div>\n                <!-- <div class=\"form-group-3 eap\">\n                    <span class=\"input-group-addon\">$</span>\n                    <input class=\"form-control\" type=\"number\" name=\"max_price\" [(ngModel)]=\"leadData.prefs.max_price\">\n                </div> -->\n            </div>\n        </div>\n    </div>\n\n    <div class=\"form-group-5 marginT20\">\n        <label>What type of property you are looking for?</label>\n        <div class=\"clearfix\"></div>\n        <label class=\"cust-radio\" *ngFor=\"let property_type of leadData.buyer_property_type; let i=index\">\n            <input type=\"checkbox\" (click)=\"setValue('buyer_property_type', i)\"\n                [checked]=\"property_type.is_selected == 0 ? '' : 'checked'\" name=\"radio1\">\n            <span class=\"checkmark\">{{property_type.name}}</span>\n        </label>\n        <div class=\"clearfix\"></div>\n    </div>\n\n    <div class=\"form-group-5 marginT20\">\n        <label>Amenities that you are expecting</label>\n        <div class=\"clearfix\"></div>\n        \n        <ng-multiselect-dropdown class=\"section-section2\" *ngIf=\"leadData.buyer_amenities\"\n            [placeholder]=\"'Choose Amenities'\"\n            [data]=\"allAmenities\"\n            [(ngModel)]=\"selectedAmenities\"\n            [settings]=\"dropdownSettings\"\n            (onDeSelect)=\"onItemDeSelect($event)\"\n            (onSelect)=\"onItemSelect($event)\"\n            (onSelectAll)=\"onSelectAll($event)\">\n        </ng-multiselect-dropdown>\n        <div class=\"clearfix\"></div>\n    </div>\n\n    <div class=\"form-group-5 marginT20\">\n        <label>Close proximity needed to</label>\n        <div class=\"clearfix\"></div>\n        <label class=\"cust-radio\" *ngFor=\"let proximity_place of leadData.buyer_proximity; let i=index\">\n            <input type=\"checkbox\" (click)=\"setValue('buyer_proximity', i)\"\n                [checked]=\"proximity_place.is_selected == 0 ? '' : 'checked'\" name=\"radio3\">\n            <span class=\"checkmark\">{{proximity_place.name}}</span>\n        </label>\n        <label class=\"cust-radio\">\n            <input type=\"checkbox\" (click)=\"setProximityValue($event, showOtherTextBox ? false : true)\"\n                [checked]=\"showOtherTextBox ? 'checked' : ''\" name=\"radio3\">\n            <span class=\"checkmark\">Other</span>\n        </label>\n        <textarea *ngIf=\"showOtherTextBox\" [(ngModel)]=\"leadData.prefs.proximity_other\" class=\"form-control\" rows=\"3\" name=\"proximity_other\">{{leadData.prefs.proximity_other}}</textarea>\n        <div class=\"clearfix\"></div>\n    </div>\n\n    <div class=\"form-group-5 marginT20\">\n        <label>How many cars do you have?</label>\n        <div class=\"clearfix\"></div>\n        <label class=\"cust-radio\" *ngFor=\"let car_type of leadData.buyer_car_type; let i=index\">\n            <input type=\"radio\" (click)=\"setCarType(car_type.id)\"\n                [checked]=\"car_type.is_selected == 0 ? '' : 'checked'\" name=\"radio4\">\n            <span class=\"checkmark\">{{car_type.name}}</span>\n        </label>\n        <div class=\"clearfix\"></div>\n    </div>\n\n    <div class=\"form-group-5 marginT20\">\n        <label>Family Size</label> <br>\n        <label class=\"cust-radio\" *ngFor=\"let count of configurationCount\">\n            <input name=\"family_size\" type=\"radio\" (change)=\"setPrefValue('family_size', count)\"\n                [checked]=\"leadData.prefs.family_size == count ?'checked':''\">\n            <span class=\"checkmark\">{{count}}</span>\n        </label>\n        <div class=\"clearfix\"></div>\n    </div>\n\n    <div class=\"inline-form-group-2 marginT20\">\n        <div class=\"row\">\n            <div class=\"col-6\"><label class=\"float-left\">Do you have pets?</label></div>\n            <div class=\"col-5\">\n                <label class=\"cust-check-bx\">\n                    <input type=\"checkbox\" value=\"{{leadData.prefs.pets == 1 ? 'true' : 'false'}}\" [(ngModel)]=\"leadData.prefs.pets\"\n                        name=\"pets\">\n                    <span class=\"checkmark\"></span>\n                </label>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"inline-form-group-2 marginT20\">\n        <div class=\"row\">\n            <div class=\"col-6\"><label class=\"float-left\">Do you have kids?</label></div>\n            <div class=\"col-5\">\n                <label class=\"cust-check-bx\">\n                    <input type=\"checkbox\" value=\"{{leadData.prefs.kid_count == 1 ? 'true' : 'false'}}\"\n                        [(ngModel)]=\"leadData.prefs.kid_count\" name=\"kid_count\">\n                    <span class=\"checkmark\"></span>\n                </label>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"form-group-5 date-picker marginT20\">\n        <label>How soon are you planning to buy/rent</label>\n        <div class=\"clearfix\"></div>\n        <p-calendar showIcon=\"true\" (onSelect)=\"onSelect($event)\" [(ngModel)]=\"leadData.prefs.planning_to_buy\"\n            showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n        <div class=\"clearfix\"></div>\n    </div>\n\n    <!-- <div class=\"form-group-5 marginT20\" *ngIf=\"leadData.prefs.looking_for==1\">\n        <label>How do you plan to do your payment?</label>\n        <div class=\"clearfix\"></div>\n        <label class=\"cust-radio\" *ngFor=\"let payment_mode of leadData.payment_modes; let i=index\">\n            <input type=\"radio\" (click)=\"setPaymentMode(payment_mode.id)\"\n                [checked]=\"payment_mode.is_selected == 0 ? '' : 'checked'\" name=\"radio3\">\n            <span class=\"checkmark\">{{payment_mode.name}}</span>\n        </label>\n        <div class=\"clearfix\"></div>\n    </div> -->\n\n    <div class=\"form-group-5 marginT20\" *ngIf=\"leadData.prefs.looking_for==1\">\n        <label>You are looking for</label>\n        <div class=\"clearfix\"></div>\n        <label class=\"cust-radio\" *ngFor=\"let property_purpose of leadData.property_purposes; let i=index\">\n            <input type=\"checkbox\" (click)=\"setValue('property_purposes', i)\"\n                [checked]=\"property_purpose.is_selected == 0 ? '' : 'checked'\" name=\"radio3\">\n            <span class=\"checkmark\">{{property_purpose.name}}</span>\n        </label>\n        <div class=\"clearfix\"></div>\n    </div>\n    \n    \n    <div class=\"btn-cont text-right\">\n        <button [disabled]=\"(sent_as==constant.userType.csr_buyer && (admin?.admin_acl['Buyer Lead Management']?.can_update==0 || admin?.permissions?.can_csr_buyer==0)) ||\n                            (sent_as==constant.userType.inhouse_broker && (admin?.admin_acl['Broker Lead Management']?.can_update==0 || admin?.permissions?.can_in_house_broker==0))\"\n            type=\"button\" class=\"btn btn-primary\" (click)=\"addPreferences()\">Save</button>\n    </div>\n</div>\n\n\n\n\n\n<!-- <div class=\"white-bg padding15\">\n    <p class=\"p16 marginB0\">Fill in Information</p>\n</div>\n<hr class=\"margin0\" *ngIf=\"leadData\">\n<div class=\"white-bg padding40 fill-info\" malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\">\n    <div class=\"form-group-4\">\n        <label>Close proximity needed to</label>\n        <div class=\"clearfix\"></div>\n        <label class=\"cust-radio\" *ngFor=\"let proximity_place of leadData.proximity_places_array; let i=index\">\n            <input type=\"checkbox\" (click)=\"setValue('proximity_places_array', i)\"\n                [checked]=\"proximity_place.is_selected == 0 ? '' : 'checked'\" name=\"radio3\">\n            <span class=\"checkmark\">{{proximity_place.name}}</span>\n        </label>\n        <div class=\"clearfix\"></div>\n    </div>\n    <div class=\"form-group-4 marginT20\"></div>\n    <div class=\"row\">\n        <div class=\"col-sm-12 col-12\">\n            <div class=\"form-group-4\">\n                <label>Family Size</label>\n                <input min=\"1\" class=\"form-control\" [(ngModel)]=\"leadData.family_size\" type=\"number\" name=\"family_size\">\n            </div>\n        </div>\n    </div>\n    <div class=\"inline-form-group-2 marginT20\">\n        <div class=\"row\">\n            <div class=\"col-6\"><label class=\"float-left\">Do you have pets?</label></div>\n            <div class=\"col-5\">\n                <label class=\"cust-check-bx\">\n                    <input type=\"checkbox\" value=\"{{leadData.pets == 1 ? 'true' : 'false'}}\" [(ngModel)]=\"leadData.pets\"\n                        name=\"pets\">\n                    <span class=\"checkmark\"></span>\n                </label>\n            </div>\n        </div>\n    </div>\n    <div class=\"inline-form-group-2 marginT20\">\n        <div class=\"row\">\n            <div class=\"col-6\"><label class=\"float-left\">Do you have kids?</label></div>\n            <div class=\"col-5\">\n                <label class=\"cust-check-bx\">\n                    <input type=\"checkbox\" value=\"{{leadData.kid_count == 1 ? 'true' : 'false'}}\"\n                        [(ngModel)]=\"leadData.kid_count\" name=\"kid_count\">\n                    <span class=\"checkmark\"></span>\n                </label>\n            </div>\n        </div>\n    </div>\n    <div class=\"form-group-4 marginT20\">\n        <div class=\"row\">\n            <div class=\"col-sm-12 col-12\">\n                <div class=\"form-group-4\">\n                    <label>Price range</label>\n                    <nouislider *ngIf=\"leadData.price_range\" name=\"price_range\" [connect]=\"true\"\n                        [min]=\"constant.minValue\" [max]=\"constant.maxValue\" [step]=\"constant.steps\" [tooltips]=\"true\"\n                        [(ngModel)]=\"leadData.price_range\"></nouislider>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"form-group-4 date-picker marginT20\">\n        <label>How soon planning to buy/rent</label>\n        <div class=\"clearfix\"></div>\n        <p-calendar showIcon=\"true\" (onSelect)=\"onSelect($event)\" [(ngModel)]=\"leadData.planning_to_buy\"\n            showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n        <div class=\"clearfix\"></div>\n    </div>\n    <div class=\"form-group-4 marginT20\">\n        <label>Number of Cars</label>\n        <div class=\"clearfix\"></div>\n        <label class=\"cust-radio\" *ngFor=\"let car_type of leadData.car_types; let i=index\">\n            <input type=\"radio\" (click)=\"setCarType('car_types', i, car_type.id)\"\n                [checked]=\"car_type.is_selected == 0 ? '' : 'checked'\" name=\"radio4\">\n            <span class=\"checkmark\">{{car_type.name}}</span>\n        </label>\n        <div class=\"clearfix\"></div>\n    </div>\n    <div class=\"form-group-4 marginT20\">\n        <label>Configuration</label>\n        <div class=\"clearfix\"></div>\n        <label class=\"cust-radio\" *ngFor=\"let configuration of leadData.configurations_array; let i=index\">\n            <input type=\"checkbox\" (click)=\"setValue('configurations_array', i)\"\n                [checked]=\"configuration.is_selected == 0 ? '' : 'checked'\" name=\"radio2\">\n            <span class=\"checkmark\">{{configuration.name}}</span>\n        </label>\n        <div class=\"clearfix\"></div>\n    </div>\n    <div class=\"form-group-4 marginT20\">\n        <label>Property Type</label>\n        <div class=\"clearfix\"></div>\n        <label class=\"cust-radio\" *ngFor=\"let property_type of leadData.property_types_array; let i=index\">\n            <input type=\"checkbox\" (click)=\"setValue('property_types_array', i)\"\n                [checked]=\"property_type.is_selected == 0 ? '' : 'checked'\" name=\"radio1\">\n            <span class=\"checkmark\">{{property_type.name}}</span>\n        </label>\n        <div class=\"clearfix\"></div>\n    </div>\n\n\n    <div class=\"btn-cont text-right\">\n\n        <button\n            [disabled]=\"(sent_as==constant.userType.csr_buyer && (admin?.admin_acl['Buyer Lead Management']?.can_update==0 || admin?.permissions?.can_csr_buyer==0)) ||\n                            (sent_as==constant.userType.inhouse_broker && (admin?.admin_acl['Broker Lead Management']?.can_update==0 || admin?.permissions?.can_in_house_broker==0))\"\n            type=\"button\" class=\"btn btn-primary\" (click)=\"addPreferences()\">Save</button>\n    </div>\n\n</div> -->"

/***/ }),

/***/ "./src/app/layout/common-blocks/fill-information/fill-information.component.ts":
/*!*************************************************************************************!*\
  !*** ./src/app/layout/common-blocks/fill-information/fill-information.component.ts ***!
  \*************************************************************************************/
/*! exports provided: FillInformationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FillInformationComponent", function() { return FillInformationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var src_app_models_leads_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/leads.model */ "./src/app/models/leads.model.ts");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var src_app_lang_translate_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/lang/translate.service */ "./src/app/lang/translate.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var FillInformationComponent = /** @class */ (function () {
    function FillInformationComponent(admin, constant, spinner, ts) {
        this.admin = admin;
        this.constant = constant;
        this.spinner = spinner;
        this.ts = ts;
        this.parameter = {};
        this.scrollbarOptions = { axis: 'y', theme: 'dark', scrollbarPosition: 'inside' };
    }
    FillInformationComponent.prototype.ngOnInit = function () {
        this.today = new Date();
        this.configurationCount = ['1', '2', '3', '4', '5+'];
        this.dropdownSettings = {
            singleSelection: false,
            idField: 'id',
            textField: 'name',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            // itemsShowLimit: 3,
            allowSearchFilter: true
        };
        // if (this.leadData.planning_to_buy) {
        //   this.leadData.planning_to_buy = moment.utc(this.leadData.planning_to_buy).toDate();
        // }
        // this.getPrefOptions();
        $('.section-section2').scroll(function (e) {
            e.stopPropagation();
        });
    };
    FillInformationComponent.prototype.getPrefOptions = function () {
        var _this = this;
        this.admin.postDataApi('leads/getPrefOptions', { lead_id: this.lead_id }).subscribe(function (r) {
            _this.parameter.proximity_places = r.data.proximity_places;
            _this.parameter.car_types = r.data.car_types;
        });
    };
    FillInformationComponent.prototype.onSelect = function (e) {
        // this.leadData.planning_to_buy = e;
    };
    FillInformationComponent.prototype.setCarType = function (id) {
        this.leadData.buyer_car_type.forEach(function (element) {
            if (element.id === id) {
                element.is_selected = 1;
            }
            else {
                element.is_selected = 0;
            }
        });
    };
    FillInformationComponent.prototype.setPaymentMode = function (id) {
        this.leadData.payment_modes.forEach(function (element) {
            if (element.id === id) {
                element.is_selected = 1;
            }
            else {
                element.is_selected = 0;
            }
        });
    };
    FillInformationComponent.prototype.setValue = function (param, i) {
        this.leadData[param][i].is_selected = this.leadData[param][i].is_selected === 1 ? 0 : 1;
    };
    FillInformationComponent.prototype.setProximityValue = function (value, showOtherTextBox) {
        this.showOtherTextBox = showOtherTextBox;
    };
    FillInformationComponent.prototype.setPrefValue = function (param, value) {
        this.leadData.prefs[param] = value;
    };
    FillInformationComponent.prototype.onItemDeSelect = function (amenity) {
        this.allAmenities.push(amenity);
    };
    FillInformationComponent.prototype.onItemSelect = function (amenity) {
        this.selectedAmenities.push(amenity);
    };
    FillInformationComponent.prototype.onSelectAll = function (amenity) {
    };
    FillInformationComponent.prototype.addPreferences = function () {
        var _this = this;
        if (this.leadData.prefs.min_price > this.leadData.prefs.max_price) {
            swal('Error', 'Maximum price should be greater than minimum price.', 'error');
            return false;
        }
        this.model = new src_app_models_leads_model__WEBPACK_IMPORTED_MODULE_2__["AddPrefrences"]();
        this.model.property_types = [];
        this.model.amenities = [];
        this.model.proximity_place_ids = [];
        this.model.property_purpose = [];
        // this.model.payment_plans = [];
        this.model.lead_id = this.lead_id;
        this.model.looking_for = this.leadData.prefs.looking_for;
        this.model.bedroom = this.leadData.prefs.bedroom;
        this.model.bathroom = this.leadData.prefs.bathroom;
        this.model.half_bathroom = this.leadData.prefs.half_bathroom;
        this.model.min_price = this.leadData.prefs.min_price;
        this.model.max_price = this.leadData.prefs.max_price;
        this.leadData.buyer_property_type.forEach(function (element) {
            if (element.is_selected === 1) {
                _this.model.property_types.push(element.id);
            }
        });
        this.selectedAmenities.forEach(function (element) {
            _this.model.amenities.push(element.id);
        });
        this.leadData.buyer_proximity.forEach(function (element) {
            if (element.is_selected === 1) {
                _this.model.proximity_place_ids.push(element.id);
            }
        });
        this.leadData.buyer_car_type.forEach(function (element) {
            if (element.is_selected === 1) {
                _this.model.car_type_id = element.id;
            }
        });
        this.model.proximity_other = this.showOtherTextBox ? this.leadData.prefs.proximity_other : '';
        this.leadData.prefs.proximity_other = this.showOtherTextBox ? this.leadData.prefs.proximity_other : '';
        this.model.family_size = this.leadData.prefs.family_size;
        this.model.kid_count = this.leadData.prefs.kid_count;
        this.model.pets = this.leadData.prefs.pets;
        if (this.leadData.prefs.planning_to_buy) {
            this.model.planning_to_buy = moment__WEBPACK_IMPORTED_MODULE_1__["utc"](this.leadData.prefs.planning_to_buy).toDate();
            // this.leadData.planning_to_buy = new ChatTimePipe().transform(this.leadData.planning_to_buy, 'YYYY-MM-DD HH:MM:SS', 3);
        }
        if (this.model.looking_for === 1) {
            this.leadData.property_purposes.forEach(function (element) {
                if (element.is_selected === 1) {
                    _this.model.property_purpose.push(element.id);
                }
            });
            // this.leadData.payment_modes.forEach(element => {
            //   if (element.is_selected === 1) {
            //     this.model.payment_plans.push(element.id);
            //   }
            // });
        }
        else {
            this.model.property_purpose = [];
            // this.model.payment_plans = [];
        }
        this.spinner.show();
        this.admin.postDataApi('leads/addPreferences', this.model).subscribe(function (r) {
            _this.spinner.hide();
            swal('Success', _this.constant.successMsg.DETAILS_UPDATED_SUCCESSFULLY, 'success');
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('lead_id'),
        __metadata("design:type", String)
    ], FillInformationComponent.prototype, "lead_id", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('leadData'),
        __metadata("design:type", src_app_models_leads_model__WEBPACK_IMPORTED_MODULE_2__["Leads"])
    ], FillInformationComponent.prototype, "leadData", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('allAmenities'),
        __metadata("design:type", Array)
    ], FillInformationComponent.prototype, "allAmenities", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('selectedAmenities'),
        __metadata("design:type", Array)
    ], FillInformationComponent.prototype, "selectedAmenities", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('sent_as'),
        __metadata("design:type", Number)
    ], FillInformationComponent.prototype, "sent_as", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('showOtherTextBox'),
        __metadata("design:type", Boolean)
    ], FillInformationComponent.prototype, "showOtherTextBox", void 0);
    FillInformationComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-fill-information',
            template: __webpack_require__(/*! ./fill-information.component.html */ "./src/app/layout/common-blocks/fill-information/fill-information.component.html"),
            styles: [__webpack_require__(/*! ./fill-information.component.css */ "./src/app/layout/common-blocks/fill-information/fill-information.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_3__["AdminService"], src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["Constant"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerService"],
            src_app_lang_translate_service__WEBPACK_IMPORTED_MODULE_6__["TranslateService"]])
    ], FillInformationComponent);
    return FillInformationComponent;
}());



/***/ }),

/***/ "./src/app/layout/common-blocks/interested-property/interested-property.component.css":
/*!********************************************************************************************!*\
  !*** ./src/app/layout/common-blocks/interested-property/interested-property.component.css ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".has-error{\n    color: red;\n    border-bottom: 1px solid red;\n}\nlabel{\n    /* color: brown; */\n}"

/***/ }),

/***/ "./src/app/layout/common-blocks/interested-property/interested-property.component.html":
/*!*********************************************************************************************!*\
  !*** ./src/app/layout/common-blocks/interested-property/interested-property.component.html ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"spacer30\"></div>\n<div class=\"row\">\n  <div class=\"col-6\">\n    <p class=\"p16\">Interested Properties</p>\n  </div>\n  <div class=\"col-6\">\n    <div class=\"btn-cont text-right\">\n      <!-- add -->\n      <a style=\"display: none;\" #showPropertyModal href=\"javascript://\" data-toggle=\"modal\"\n        data-target=\"#add-property-popup\">Add</a>\n      <a style=\"margin-right:10px;\"\n        *ngIf=\"(sent_as==constant.userType.csr_buyer && (admin?.admin_acl['Buyer Lead Management']?.can_update==1 || admin?.permissions?.can_csr_buyer==1)) ||\n          sent_as==constant.userType.inhouse_broker && (admin?.admin_acl['Broker Lead Management']?.can_update==1 || admin?.permissions?.can_in_house_broker==1); else noAddPermission\"\n        class=\"btn btn-fourth\" href=\"javascript://\" (click)=\"getCountries(lead_id)\">Add</a>\n\n      <ng-template #noAddPermission>\n        <a class=\"btn btn-fourth\" href=\"javascript://\">Add</a>\n      </ng-template>\n\n      <!-- view  -->\n      <a style=\"display: none;\" data-toggle=\"modal\" #showInterestedProperty data-target=\"#view-all-property\"\n        class=\"btn btn-fourth\" href=\"javascript://\">View All</a>\n      <a *ngIf=\"interested_properties?.length>1\" class=\"btn btn-fourth\" href=\"javascript://\"\n        (click)=\"viewProperties(interested_properties, 1)\">View All</a>\n    </div>\n  </div>\n</div>\n\n<div class=\"spacer15\"></div>\n<div class=\"row\" *ngIf=\"interested_properties?.length>0\">\n  <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\" *ngFor=\"let data of interested_properties; let in=index\">\n\n    <div *ngIf=\"data.property.building && data && in<2\" class=\"project-des-bx white-bg\">\n      <div class=\"price\">\n        <p class=\"p10\">{{data.property.for_sale == 1 ? ts.lang.Buy : 'Rent'}}</p>\n      </div>\n      <div class=\"fig-block\">\n        <img [src]=\"data.property.image| img:'thumb'\" onerror='src=\"assets/img/placeholder-img.png\"' alt=\"img\">\n      </div>\n      <div class=\"project-des-content\">\n          <small title=\"Apartment\">{{data?.property?.name}}</small>\n        <!-- <small>{{data?.property?.building?.developer?.name | titlecase}}</small> -->\n        <a title=\"Building\" routerLink=\"/dashboard/properties/details/{{data.property.id}}\">\n          <h5>{{data?.property?.building?.name.slice(0, 35)}}</h5>\n        </a>\n        <p class=\"p12\">{{data.property.building.address.slice(0, 90)}}</p>\n        <p class=\"p13\" *ngIf=\"data && data.property\">\n          <app-property-configuration *ngIf=\"data.property.configuration\" [configuration]=\"data.property.configuration\"></app-property-configuration>\n          <span>&middot; {{data.property.property_type.name}}</span>\n        </p>\n        <!-- <p class=\"p13\" *ngIf=\"data && data.property\">{{data.property.configuration.name}}, {{data.property.property_type.name}}</p> -->\n        <!-- <p class=\"p13\" title=\"Property Type\" *ngIf=\"data && data.property\">{{data.property.property_type.name}}</p> -->\n        <p class=\"p13\"><strong>\n            {{data.property.min_price| price}}\n          </strong></p>\n        <div class=\"dropdown threeDots\">\n          <button type=\"button\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n            ...\n          </button>\n          <div class=\"dropdown-menu\">\n            <a style=\"display: none;\" class=\"dropdown-item\" href=\"javascript://\" #modalOpen data-toggle=\"modal\"\n              data-target=\"#dealFinalize\">Deal Finalized</a>\n\n            <!-- deal finalised -->\n            <a *ngIf=\"!is_deal_finalised && sent_as==constant.userType.inhouse_broker && (admin?.admin_acl['Broker Lead Management']?.can_update==1 || admin?.permissions?.can_in_house_broker==1)\"\n              class=\"dropdown-item\" href=\"javascript://\" (click)=\"openModal(data.property.id, data.lead_id)\">Deal\n              Finalized</a>\n\n            <!-- Remove from in-property -->\n            <a *ngIf=\"(sent_as==constant.userType.csr_buyer && (admin?.admin_acl['Buyer Lead Management']?.can_update==1 || admin?.permissions?.can_csr_buyer==1)) ||\n            sent_as==constant.userType.inhouse_broker && (admin?.admin_acl['Broker Lead Management']?.can_update==1 || admin?.permissions?.can_in_house_broker==1); else noRemovePermission\"\n              class=\"dropdown-item\" (click)=\"deleteLeadInterestedProperty(data.property.id, data.lead_id, in)\">Remove\n              Property</a>\n\n            <ng-template #noRemovePermission>\n              <a class=\"dropdown-item\">Remove Property</a>\n            </ng-template>\n          </div>\n        </div>\n      </div>\n    </div>\n\n  </div>\n</div>\n<div *ngIf=\"interested_properties?.length == 0\">\n  <p class=\"show-not-found\">\n    {{constant.errorMsg.NO_INTERESTED_PROPERTY_FOUND}}\n  </p>\n</div>\n\n\n\n<!-- add property to interested_properties -->\n<div class=\"modal\" id=\"add-property-popup\">\n  <div class=\"modal-dialog modal-lg\">\n    <div class=\"modal-content notary-avail\">\n      <div class=\"modal-header popup-header\">\n        <h4 class=\"modal-title\">Properties available</h4>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #hidePropertyModal>&times;</button>\n      </div>\n      <div class=\"modal-body\">\n        <div class=\"row\">\n          <div class=\"col-md-3\">\n            <div class=\"form-group\">\n              <label>Country</label>\n              <select class=\"form-control\" (change)=\"onCountryChange($event.target.value)\">\n                <option value=\"0\">All</option>\n                <option *ngFor=\"let item of location.countries\" [value]=\"item.id\">{{item.name}}</option>\n              </select>\n            </div>\n          </div>\n          <div class=\"col-md-3\">\n            <div class=\"form-group\">\n              <label>State</label>\n              <select class=\"form-control\" (change)=\"onStateChange($event.target.value)\">\n                <option value=\"0\">All</option>\n                <option *ngFor=\"let item of location.states\" [value]=\"item.id\">{{item.name}}</option>\n              </select>\n            </div>\n          </div>\n          <div class=\"col-md-3\">\n            <div class=\"form-group\">\n              <label>City</label>\n              <select class=\"form-control\" (change)=\"onCityChange($event.target.value)\">\n                <option value=\"0\">All</option>\n                <option *ngFor=\"let item of location.cities\" [value]=\"item.id\">{{item.name}}</option>\n              </select>\n            </div>\n          </div>\n          <div class=\"col-md-3\">\n            <div class=\"form-group\">\n              <label>Locality</label>\n              <select class=\"form-control\" (change)=\"onLocalityChange($event.target.value)\">\n                <option value=\"0\">All</option>\n                <option *ngFor=\"let item of location.localities\" [value]=\"item.id\">{{item.name}}</option>\n              </select>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"row\">\n          <div class=\"col-md-3\">\n            <div class=\"form-group btn-cont\">\n              <button class=\"btn btn-primary\" (click)=\"propertySearch()\">View Properties</button>\n            </div>\n          </div>\n          <div class=\"col-md-9 pull-right\">\n            <pagination-controls id=\"page1\" *ngIf=\"parameter.total>constant.p\" class=\"my-pagination\"\n              (pageChange)=\"getPage($event)\"></pagination-controls>\n          </div>\n          <!-- <div class=\"col-md-3\">\n                  <div class=\"form-group btn-cont\">\n                  <button class=\"btn btn-primary\" (click)=\"addPropertyToInterest()\">Add Properties</button>\n                  </div>\n              </div> -->\n        </div>\n\n        <table class=\"table\" *ngIf=\"parameter?.items?.length!=0\">\n          <tbody>\n            <tr\n              *ngFor=\"let item of parameter.items| paginate: { id:'page1', itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: parameter.total }; let i=index\">\n              <td>\n                <div class=\"n-avail-profile\">\n                  <img [src]=\"item.image| img:'thumb'\" onerror='src=\"assets/img/house.png\"' alt=\"img\">\n                  <div class=\"n-avail-info\">\n                    <p title=\"Apartment\" class=\"p12\">{{item.name}}</p>\n                    <p class=\"p13\">{{item.building.name}} &middot; {{item.building_towers.tower_name}} &middot;\n                      {{item.building_towers.num_of_floors == 0 ? 'Ground Floor' : 'Floor ' + item.building_towers.num_of_floors}}\n                    </p>\n                    <!-- <p class=\"p10 marginB0\">{{item.building.address ? item.building.address : 'NA'}}</p> -->\n                    <p class=\"p10\">\n                      <app-property-configuration *ngIf=\"item.configuration\" [configuration]=\"item.configuration\"></app-property-configuration>\n                      <span>&middot; {{item.property_type.name}}</span>\n                    </p>\n                    <!-- <p class=\"p10\">{{item.configuration.name}}</p> -->\n                  </div>\n                </div>\n              </td>\n              <td>\n                <!-- <label class=\"cust-check-bx float-right\">\n                      <input type=\"radio\" name=\"bank_id1\" (click)=\"addLeadInterestedProperty(item.id)\">\n                      <span class=\"checkmark\"></span>\n                      </label> -->\n                <label class=\"cust-check-bx float-right\">\n                  <input [checked]=\"item.checked == true ? 'checked': ''\" type=\"checkbox\" name=\"bank_id1\"\n                    (click)=\"addLeadInterestedProperty(item.id)\">\n                  <span class=\"checkmark\"></span>\n                </label>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n        <div *ngIf=\"parameter?.items?.length==0 && parameter.noResultFound\">\n          <p class=\"show-not-found\">No property found for selected filters.</p>\n        </div>\n        <div *ngIf=\"!parameter.noResultFound && parameter?.items?.length==0\">\n          <p class=\"show-not-found\">Select filters to view properties.</p>\n        </div>\n\n        <div *ngIf=\"property_ids.length>0\" class=\"row pull-right\">\n          <div class=\"form-group btn-cont\">\n            <button class=\"btn btn-primary\" (click)=\"addPropertyToInterest()\">Add Properties</button>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!-- deal finalize modal -->\n<div class=\"modal animated\" id=\"dealFinalize\">\n  <div class=\"modal-dialog fadeIndown\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button style=\"display: none;\" type=\"button\" class=\"close\" data-dismiss=\"modal\" #modalClose>&times;</button>\n        <button type=\"button\" class=\"close\" (click)=\"closeModal()\">&times;</button>\n      </div>\n\n      <form class=\"form-horizontal form-model0P\" role=\"form\" ngNativeValidate #addForm=\"ngForm\"\n        (ngSubmit)=\"attachProperty(addForm)\">\n        <div class=\"modal-body\">\n          <div class=\"row\">\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label for=\"token_amount\">Amount to be paid by user</label>\n                <div class=\"form-group\">\n                  <input id=\"token_amount\" #token_amount=ngModel autocomplete=\"off\" name=\"token_amount\"\n                    [(ngModel)]=\"model.token_amount\" type=\"number\" class=\"form-control\" required>\n                </div>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>Commission (in %)</label>\n                <div class=\"form-group\">\n                  <input autocomplete=\"off\" min=\"0\" max=\"100\" type=\"number\" name=\"commision\"\n                    [(ngModel)]=\"model.commision\" class=\"form-control\" required>\n                </div>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"form-group-2\">\n                <label>Total Amount</label>\n                <div class=\"form-group\">\n                  <input autocomplete=\"off\" name=\"total_amount\" [(ngModel)]=\"model.total_amount\" type=\"number\"\n                    class=\"form-control\" required>\n                </div>\n              </div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"spacer40\"></div>\n            </div>\n            <div class=\"col-12\">\n              <div class=\"btn-cont text-right\">\n                <button style=\"width: 100%;\" type=\"submit\" class=\"btn btn-primary\">Finalize Deal</button>\n              </div>\n            </div>\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n</div>\n\n\n<!-- show interested_properties -->\n<div class=\"modal\" id=\"view-all-property\">\n  <div class=\"modal-dialog  modal-lg\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n      </div>\n      <div class=\"modal-body\">\n        <h3>Interested Properties</h3>\n        <hr>\n        <pagination-controls id=\"page2\" class=\"my-pagination\" (pageChange)=\"getPage2($event)\"></pagination-controls>\n\n        <div class=\"scrollbox fav-prop\" malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\">\n          <div class=\"row\">\n            <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\"\n              *ngFor=\"let x of parameter.interested_properties| paginate: { id: 'page2', itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page2, totalItems: parameter.total2 }; let in=index\">\n              <div class=\"project-des-bx white-bg-2\">\n                <div class=\"price\" *ngIf=\"x && x.property\">\n                  <p class=\"p10\">{{x.property.for_sale==1 ? ts.lang.Buy : 'Rent'}}</p>\n                </div>\n                <div class=\"fig-block\">\n                  <img [src]=\"x.property.image| img:'thumb'\" onerror='src=\"assets/img/bank.png\"' alt=\"img\">\n                </div>\n                <div class=\"project-des-content\">\n                    <small title=\"Apartment\">{{x.property?.name}}</small>\n                  <!-- <small>{{x.property?.building?.developer?.name | titlecase}}</small> -->\n                  <a title=\"Building\" routerLink=\"/dashboard/properties/details/{{x.property.id}}\">\n                    <h5>{{x.property?.building?.name.slice(0, 15)}}</h5>\n                  </a>\n                  <p class=\"p12\">{{x.property.building.address.slice(0, 40)}}</p>\n                  <p class=\"p13\" *ngIf=\"x && x.property\">\n                    <app-property-configuration *ngIf=\"x.property.configuration\" [configuration]=\"x.property.configuration\"></app-property-configuration>\n                    <span>&middot; {{x.property.property_type.name}}</span>\n                  </p>\n                  <!-- <p class=\"p13\" *ngIf=\"x && x.property\">{{x.property.configuration.name}}, {{x.property.property_type.name}}</p> -->\n                  <!-- <p class=\"p13\" *ngIf=\"!x && !x.property\">NA</p>\n                        <p class=\"p13\" *ngIf=\"x && x.property\">{{x.property.property_type.name}}</p> -->\n                  <p class=\"p13\">\n                    {{x.property.min_price | price}}\n                  </p>\n                  <div class=\"dropdown threeDots\">\n                    <button type=\"button\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n                      ...\n                    </button>\n                    <div class=\"dropdown-menu\">\n                      <a style=\"display: none;\" *ngIf=\"sent_as==2\" class=\"dropdown-item\" href=\"javascript://\" #modalOpen\n                        data-toggle=\"modal\" data-target=\"#dealFinalize\">Deal Finalized</a>\n                      <!-- dela finalised -->\n                      <a *ngIf=\"!is_deal_finalised && sent_as==constant.userType.inhouse_broker && (admin?.admin_acl['Broker Lead Management']?.can_update==1 || admin?.permissions?.can_in_house_broker==1)\"\n                        class=\"dropdown-item\" href=\"javascript://\" (click)=\"openModal(x.property.id, x.lead_id)\">Deal\n                        Finalized</a>\n\n                      <!-- remove -->\n                      <a *ngIf=\"(sent_as==constant.userType.csr_buyer && (admin?.admin_acl['Buyer Lead Management']?.can_update==1 || admin?.permissions?.can_csr_buyer==1)) ||\n                            sent_as==constant.userType.inhouse_broker && (admin?.admin_acl['Broker Lead Management']?.can_update==1 || admin?.permissions?.can_in_house_broker==1); else noRemovePermission\"\n                        class=\"dropdown-item\"\n                        (click)=\"deleteLeadInterestedProperty(x.property.id, x.lead_id, in)\">Remove Property</a>\n\n                      <ng-template #noRemovePermission>\n                        <a class=\"dropdown-item\">Remove Property</a>\n                      </ng-template>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/layout/common-blocks/interested-property/interested-property.component.ts":
/*!*******************************************************************************************!*\
  !*** ./src/app/layout/common-blocks/interested-property/interested-property.component.ts ***!
  \*******************************************************************************************/
/*! exports provided: InterestedPropertyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InterestedPropertyComponent", function() { return InterestedPropertyComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_models_leads_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/models/leads.model */ "./src/app/models/leads.model.ts");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var src_app_lang_translate_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/lang/translate.service */ "./src/app/lang/translate.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var InterestedPropertyComponent = /** @class */ (function () {
    function InterestedPropertyComponent(model, admin, constant, spinner, ts) {
        this.model = model;
        this.admin = admin;
        this.constant = constant;
        this.spinner = spinner;
        this.ts = ts;
        this.deal_finalised_success = new events__WEBPACK_IMPORTED_MODULE_4__["EventEmitter"]();
        this.parameter = {};
        this.location = {};
        this.property_ids = [];
        this.scrollbarOptions = { axis: 'y', theme: 'dark', scrollbarPosition: 'inside' };
    }
    InterestedPropertyComponent.prototype.ngOnInit = function () {
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        this.parameter.page2 = this.constant.p;
        this.parameter.total = 0;
        this.parameter.total2 = 0;
    };
    InterestedPropertyComponent.prototype.openModal = function (property_id, lead_id) {
        this.model.property_id = property_id;
        this.model.lead_id = lead_id;
        this.modalOpen.nativeElement.click();
    };
    InterestedPropertyComponent.prototype.closeModal = function () {
        this.modalClose.nativeElement.click();
    };
    InterestedPropertyComponent.prototype.getPage = function (page) {
        this.parameter.page = page;
        this.propertySearch();
    };
    InterestedPropertyComponent.prototype.getPage2 = function (page) {
        this.parameter.page2 = page;
        this.viewProperties('', page);
    };
    InterestedPropertyComponent.prototype.attachProperty = function (formdata) {
        var _this = this;
        if (this.model.total_amount < this.model.token_amount) {
            swal('Error', 'Total amount must be greater than token amount.', 'error');
            return false;
        }
        this.modalClose.nativeElement.click();
        this.spinner.show();
        this.admin.postDataApi('leads/attach-property', this.model)
            .subscribe(function (success) {
            formdata.reset();
            _this.spinner.hide();
            _this.is_deal_finalised = true;
            _this.modalClose.nativeElement.click();
            swal('Success', 'Deal has been finalized successfully.', 'success');
            _this.deal_finalised_success.emit('true');
        }, function (error) {
            _this.spinner.hide();
        });
    };
    InterestedPropertyComponent.prototype.deleteLeadInterestedProperty = function (property_id, lead_id, index) {
        var _this = this;
        var test = this.selected_properties.map(function (i) { return i.property_id === property_id; });
        if (test[0]) {
            swal('Error', 'You cannot remove this property as this is finalized property.', 'error');
        }
        else {
            swal({
                html: this.constant.title.ARE_YOU_SURE + '<br>' + 'You want to remove this property?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: this.constant.confirmButtonColor,
                cancelButtonColor: this.constant.cancelButtonColor,
                confirmButtonText: 'Yes'
            }).then(function (result) {
                if (result.value) {
                    var input = { property_id: property_id, lead_id: _this.lead_id };
                    _this.admin.postDataApi('leads/deleteLeadInterestedProperty', { property_id: [property_id], lead_id: lead_id })
                        .subscribe(function (success) {
                        _this.parameter.interested_properties.splice(index, 1);
                        _this.interested_properties = _this.parameter.interested_properties;
                        swal('Success', 'Interested property removed successfully.', 'success');
                    });
                }
            });
        }
    };
    InterestedPropertyComponent.prototype.showModal = function () {
        this.showPropertyModal.nativeElement.click();
    };
    InterestedPropertyComponent.prototype.addLeadInterestedProperty = function (property_id) {
        var ids = this.interested_properties.map(function (d) { return d.property.id; });
        var ff = ids.filter(function (p) { return p === property_id; });
        if (ff.length !== 0) {
            swal('Error', 'This property is already added in your interests.', 'error');
        }
        else {
            var check_id = this.property_ids.indexOf(property_id);
            if (check_id === -1) {
                this.property_ids.push(property_id);
            }
            else {
                this.property_ids.splice(check_id, 1);
            }
        }
    };
    InterestedPropertyComponent.prototype.addPropertyToInterest = function () {
        var _this = this;
        if (this.property_ids.length > 0) {
            swal({
                html: this.constant.title.ARE_YOU_SURE + '<br>' + 'You want to add selected properties to your interested properties?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: this.constant.confirmButtonColor,
                cancelButtonColor: this.constant.cancelButtonColor,
                confirmButtonText: 'Yes'
            }).then(function (result) {
                if (result.value) {
                    var input = { property_id: _this.property_ids, lead_id: _this.parameter.lead_id };
                    _this.admin.postDataApi('leads/addLeadInterestedProperty', input).subscribe(function (r) {
                        _this.showPropertyModal.nativeElement.click();
                        _this.property_ids = [];
                        swal('Success', 'Added Successfully', 'success');
                        _this.interested_properties.push(r.data);
                    });
                }
            });
        }
        else {
            swal('Error', 'Please choose any property.', 'error');
        }
    };
    InterestedPropertyComponent.prototype.checkIfAlreadyExist = function () {
        var ids = this.interested_properties.map(function (d) { return d.property.id; });
        // const ff = ids.filter(p => p === property_id);
    };
    InterestedPropertyComponent.prototype.checkIfExist = function (id) {
        return this.selected_properties.find(function (i) { return i.property_id === id; });
    };
    InterestedPropertyComponent.prototype.viewProperties = function (data, page) {
        var _this = this;
        // this.parameter.interested_properties = data;
        this.spinner.show();
        this.admin.postDataApi('leads/getLeadInterestedProperty', { lead_id: this.lead_id, page: page }).subscribe(function (r) {
            _this.spinner.hide();
            _this.parameter.interested_properties = r['data'];
            _this.parameter.total2 = r.total;
            if (page === 1) {
                _this.showInterestedProperty.nativeElement.click();
            }
        }, function (error) {
            _this.spinner.hide();
        });
    };
    InterestedPropertyComponent.prototype.getCountries = function (lead_id) {
        var _this = this;
        this.location.cities = [];
        this.parameter.city_id = '0';
        this.location.localities = [];
        this.parameter.locality_id = '0';
        this.location.states = [];
        this.parameter.state_id = '0';
        this.parameter.items = [];
        this.parameter.total = 0;
        this.parameter.noResultFound = false;
        this.parameter.lead_id = lead_id;
        this.showPropertyModal.nativeElement.click();
        this.admin.postDataApi('getCountryLocality', {}).subscribe(function (r) {
            _this.location.countries = r['data'];
        });
    };
    InterestedPropertyComponent.prototype.onCountryChange = function (id) {
        this.location.states = [];
        this.parameter.state_id = '0';
        this.location.cities = [];
        this.parameter.city_id = '0';
        this.location.localities = [];
        this.parameter.locality_id = '0';
        if (!id || id.toString() === '0') {
            this.parameter.state_id = '0';
            return false;
        }
        this.parameter.country_id = id;
        var selectedCountry = this.location.countries.filter(function (x) { return x.id.toString() === id; });
        this.location.states = selectedCountry[0].states;
    };
    InterestedPropertyComponent.prototype.onStateChange = function (id) {
        this.location.cities = [];
        this.parameter.city_id = '0';
        this.location.localities = [];
        this.parameter.locality_id = '0';
        if (!id || id.toString() === '0') {
            this.parameter.city_id = '0';
            return false;
        }
        this.parameter.state_id = id;
        var selectedState = this.location.states.filter(function (x) { return x.id.toString() === id; });
        this.location.cities = selectedState[0].cities;
    };
    InterestedPropertyComponent.prototype.onCityChange = function (id) {
        this.location.localities = [];
        this.parameter.locality_id = '0';
        if (!id || id.toString() === '0') {
            this.parameter.locality_id = '0';
            return false;
        }
        this.parameter.city_id = id;
        var selectedCountry = this.location.cities.filter(function (x) { return x.id.toString() === id; });
        this.location.localities = selectedCountry[0].localities;
    };
    InterestedPropertyComponent.prototype.onLocalityChange = function (id) {
        if (!id || id.toString() === '0') {
            return false;
        }
        this.parameter.locality_id = id;
    };
    InterestedPropertyComponent.prototype.propertySearch = function () {
        var _this = this;
        this.spinner.show();
        this.admin.postDataApi('propertySearch', this.parameter).subscribe(function (r) {
            _this.spinner.hide();
            _this.parameter.items = r.data;
            if (_this.property_ids.length > 0) {
                _this.parameter.items.forEach(function (element) {
                    var check_id = _this.property_ids.indexOf(element.id);
                    if (check_id !== -1) {
                        element.checked = true;
                    }
                });
            }
            _this.parameter.total = r.total;
            if (_this.parameter.items.length <= 0) {
                _this.parameter.noResultFound = true;
            }
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], InterestedPropertyComponent.prototype, "deal_finalised_success", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('data'),
        __metadata("design:type", Object)
    ], InterestedPropertyComponent.prototype, "data", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('lead_id'),
        __metadata("design:type", Object)
    ], InterestedPropertyComponent.prototype, "lead_id", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('sent_as'),
        __metadata("design:type", Object)
    ], InterestedPropertyComponent.prototype, "sent_as", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('interested_properties'),
        __metadata("design:type", Object)
    ], InterestedPropertyComponent.prototype, "interested_properties", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('selected_properties'),
        __metadata("design:type", Object)
    ], InterestedPropertyComponent.prototype, "selected_properties", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('is_deal_finalised'),
        __metadata("design:type", Object)
    ], InterestedPropertyComponent.prototype, "is_deal_finalised", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalOpen'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], InterestedPropertyComponent.prototype, "modalOpen", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], InterestedPropertyComponent.prototype, "modalClose", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('showPropertyModal'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], InterestedPropertyComponent.prototype, "showPropertyModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('hidePropertyModal'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], InterestedPropertyComponent.prototype, "hidePropertyModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('showInterestedProperty'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], InterestedPropertyComponent.prototype, "showInterestedProperty", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('hideInterestedProperty'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], InterestedPropertyComponent.prototype, "hideInterestedProperty", void 0);
    InterestedPropertyComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-interested-property',
            template: __webpack_require__(/*! ./interested-property.component.html */ "./src/app/layout/common-blocks/interested-property/interested-property.component.html"),
            styles: [__webpack_require__(/*! ./interested-property.component.css */ "./src/app/layout/common-blocks/interested-property/interested-property.component.css")],
            providers: [src_app_models_leads_model__WEBPACK_IMPORTED_MODULE_1__["DealFinalize"]]
        }),
        __metadata("design:paramtypes", [src_app_models_leads_model__WEBPACK_IMPORTED_MODULE_1__["DealFinalize"], src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_2__["AdminService"], src_app_common_constants__WEBPACK_IMPORTED_MODULE_3__["Constant"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerService"],
            src_app_lang_translate_service__WEBPACK_IMPORTED_MODULE_6__["TranslateService"]])
    ], InterestedPropertyComponent);
    return InterestedPropertyComponent;
}());



/***/ }),

/***/ "./src/app/layout/common-blocks/viewed-projects/viewed-projects.component.css":
/*!************************************************************************************!*\
  !*** ./src/app/layout/common-blocks/viewed-projects/viewed-projects.component.css ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/layout/common-blocks/viewed-projects/viewed-projects.component.html":
/*!*************************************************************************************!*\
  !*** ./src/app/layout/common-blocks/viewed-projects/viewed-projects.component.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"spacer30\"></div>\n<div class=\"row\">\n  <div class=\"col-6\">\n    <p class=\"p16\">Viewed Projects</p>\n  </div>\n  <div class=\"col-6\">\n    <div class=\"btn-cont text-right\">\n      <a style=\"display: none;\" data-toggle=\"modal\" #showProjectModal data-target=\"#view-viewed-projects\"\n        class=\"btn btn-fourth\" href=\"javascript://\">View All</a>\n      <a *ngIf=\"viewed_projects?.length>1\" class=\"btn btn-fourth\" href=\"javascript://\"\n        (click)=\"viewProjects(viewed_properties, 1, user_id)\">View All</a>\n    </div>\n  </div>\n</div>\n\n<div class=\"spacer15\"></div>\n<div class=\"row\" *ngIf=\"viewed_projects?.length>0\">\n  <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\" *ngFor=\"let data of viewed_projects; let in=index\">\n\n    <div *ngIf=\"data && in<2\" class=\"project-des-bx white-bg\">\n      <!-- <div class=\"price\">{{data.starting_price|thousand}}+</div> -->\n      <div class=\"fig-block\">\n        <img [src]=\"data.main_image| img:'thumb'\" onerror='src=\"assets/img/placeholder-img.png\"' alt=\"img\">\n      </div>\n      <div class=\"project-des-content\">\n        <small title=\"Developer\">{{data?.developer?.name ? data?.developer?.name : 'NA'}}</small>\n        <a title=\"Building Name\" routerLink=\"/dashboard/projects/details/{{data.id}}\">\n          <h5>{{data.name.slice(0, 35)}}</h5>\n        </a>\n        <p class=\"p12\">{{data.address.slice(0, 90)}}</p>\n\n        <p class=\"p13\" title=\"Configurations\">\n          <span *ngFor=\"let conf1 of data.configurations; let k=index\">\n            <!-- {{conf1.config.name}} -->\n            {{conf1?.name ? conf1?.name : conf1?.config?.name}}\n            <span *ngIf=\"k<data?.configurations?.length-1\">,</span>\n          </span>\n          <span *ngIf=\"data.configurations?.length==0\">NA</span>\n        </p>\n        <p class=\"p13\"><strong>{{data.starting_price|price}}</strong></p>\n      </div>\n    </div>\n\n  </div>\n</div>\n<div *ngIf=\"viewed_projects?.length == 0\">\n  <p class=\"show-not-found\">\n    {{constant.errorMsg.NO_VIEWED_PROPERTY_FOUND}}\n  </p>\n</div>\n\n\n<!-- show viewed_projects -->\n<div class=\"modal\" id=\"view-viewed-projects\">\n  <div class=\"modal-dialog  modal-lg\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n      </div>\n      <div class=\"modal-body\">\n        <h3>Viewed Projects</h3>\n        <hr>\n        <pagination-controls id=\"v-projects-1\" class=\"my-pagination\" (pageChange)=\"getPage($event)\">\n        </pagination-controls>\n        <div class=\"scrollbox fav-prop\" malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\">\n          <div class=\"row\">\n            <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\"\n              *ngFor=\"let x of parameter.viewed_projects| paginate: {id:'v-projects-1', itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: parameter.total }; let in=index\">\n              <div class=\"project-des-bx white-bg-2\">\n                <!-- <div class=\"price\">{{x.starting_price|thousand}}+</div> -->\n                <div class=\"fig-block\">\n                  <img [src]=\"x.main_image| img:'thumb'\" onerror='src=\"assets/img/bank.png\"' alt=\"img\">\n                </div>\n                <div class=\"project-des-content\">\n                  <small title=\"Developer\">{{x?.developer?.name ? x?.developer?.name : 'NA'}}</small>\n                  <a title=\"Building Name\" routerLink=\"/dashboard/projects/details/{{x.id}}\">\n                    <h5>{{x.name.slice(0, 15)}}</h5>\n                  </a>\n                  <p class=\"p12\">{{x.address.slice(0, 45)}}</p>\n                  <p class=\"p13\">\n                    <span *ngFor=\"let conf of x.configurations; let ii=index\">\n                      {{conf.name ? conf.name : conf.config.name}}<span *ngIf=\"ii<x?.configurations?.length-1\">,</span>\n                    </span>\n                    <span *ngIf=\"x.configurations?.length==0\">NA</span>\n                  </p>\n                  <p class=\"p13\">{{x.starting_price|price}}</p>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/layout/common-blocks/viewed-projects/viewed-projects.component.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/layout/common-blocks/viewed-projects/viewed-projects.component.ts ***!
  \***********************************************************************************/
/*! exports provided: ViewedProjectsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewedProjectsComponent", function() { return ViewedProjectsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ViewedProjectsComponent = /** @class */ (function () {
    function ViewedProjectsComponent(constant, admin, spinner) {
        this.constant = constant;
        this.admin = admin;
        this.spinner = spinner;
        this.parameter = {};
        this.scrollbarOptions = { axis: 'y', theme: 'dark', scrollbarPosition: 'inside' };
    }
    ViewedProjectsComponent.prototype.ngOnInit = function () {
        this.parameter.page = this.constant.p;
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
    };
    ViewedProjectsComponent.prototype.getPage = function (page) {
        this.parameter.page = page;
        this.viewProjects('', this.parameter.page, this.user_id);
    };
    ViewedProjectsComponent.prototype.viewProjects = function (data, page, user_id) {
        var _this = this;
        this.spinner.show();
        this.admin.postDataApi('leads/viewedProjects', { user_id: user_id, page: page }).subscribe(function (r) {
            _this.spinner.hide();
            _this.parameter.total = r.total;
            _this.parameter.viewed_projects = r.data;
            if (_this.parameter.page === 1) {
                _this.showProjectModal.nativeElement.click();
            }
        }, function (error) {
            _this.spinner.hide();
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('viewed_projects'),
        __metadata("design:type", Object)
    ], ViewedProjectsComponent.prototype, "viewed_projects", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('user_id'),
        __metadata("design:type", Object)
    ], ViewedProjectsComponent.prototype, "user_id", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('showProjectModal'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], ViewedProjectsComponent.prototype, "showProjectModal", void 0);
    ViewedProjectsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-viewed-projects',
            template: __webpack_require__(/*! ./viewed-projects.component.html */ "./src/app/layout/common-blocks/viewed-projects/viewed-projects.component.html"),
            styles: [__webpack_require__(/*! ./viewed-projects.component.css */ "./src/app/layout/common-blocks/viewed-projects/viewed-projects.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_common_constants__WEBPACK_IMPORTED_MODULE_2__["Constant"], src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_3__["AdminService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_1__["NgxSpinnerService"]])
    ], ViewedProjectsComponent);
    return ViewedProjectsComponent;
}());



/***/ }),

/***/ "./src/app/layout/common-blocks/viewed-property/viewed-property.component.css":
/*!************************************************************************************!*\
  !*** ./src/app/layout/common-blocks/viewed-property/viewed-property.component.css ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".has-error{\n    color: red;\n    border-bottom: 1px solid red;\n}\nlabel{\n    /* color: brown; */\n}"

/***/ }),

/***/ "./src/app/layout/common-blocks/viewed-property/viewed-property.component.html":
/*!*************************************************************************************!*\
  !*** ./src/app/layout/common-blocks/viewed-property/viewed-property.component.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"spacer30\"></div>\n<div class=\"row\">\n  <div class=\"col-6\">\n    <p class=\"p16\">Viewed Properties</p>\n  </div>\n  <div class=\"col-6\">\n    <div class=\"btn-cont text-right\">\n      <a style=\"display: none;\" data-toggle=\"modal\" #showPropertyModal data-target=\"#view-viewed-property\"\n        class=\"btn btn-fourth\" href=\"javascript://\">View All</a>\n      <a *ngIf=\"viewed_properties?.length>1\" class=\"btn btn-fourth\" href=\"javascript://\"\n        (click)=\"viewProperties(viewed_properties, user_id, 1)\">View All</a>\n    </div>\n  </div>\n</div>\n\n<div class=\"spacer15\"></div>\n<div class=\"row\" *ngIf=\"viewed_properties?.length>0\">\n  <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\" *ngFor=\"let data of viewed_properties; let in=index\">\n\n    <div *ngIf=\"data.building && data && in<2\" class=\"project-des-bx white-bg\">\n      <div class=\"price\">\n        <p class=\"p10\">\n          {{data.for_sale == 1 ? ts.lang.Buy : 'Rent'}}\n        </p>\n      </div>\n      <div class=\"fig-block\">\n        <img [src]=\"data.image| img:'thumb'\" onerror='src=\"assets/img/placeholder-img.png\"' alt=\"img\">\n      </div>\n      <div class=\"project-des-content\">\n        <small title=\"Apartment\">\n          {{data?.name ? data?.name : 'NA'}}\n          <!-- {{data?.building?.developer?.name ? data?.building?.developer?.name : 'NA'}} -->\n        </small>\n        <a title=\"Building\" routerLink=\"/dashboard/properties/details/{{data.id}}\">\n          <h5>{{data.building.name.slice(0, 35)}}</h5>\n        </a>\n        <p class=\"p12\">{{data.building.address.slice(0, 90)}}</p>\n        <!-- \n      <p class=\"p13\" *ngIf=\"data\">\n        {{data.configuration.name}}, {{data.property_type.name}}\n      </p> -->\n        <p class=\"p13\" *ngIf=\"data\">\n          <app-property-configuration *ngIf=\"data.configuration\" [configuration]=\"data.configuration\"></app-property-configuration>\n          <span>&middot; {{data.property_type.name}}</span>\n        </p>\n        <!-- <p class=\"p13\" title=\"Configuration\" *ngIf=\"!data\">NA</p> -->\n        <!-- <p class=\"p13\" title=\"Property Type\" *ngIf=\"data\">{{data.property_type.name}}</p> -->\n        <p class=\"p13\" title=\"Type\"><strong>\n            {{data.min_price|price}}</strong></p>\n      </div>\n    </div>\n\n  </div>\n</div>\n<div *ngIf=\"viewed_properties?.length == 0\">\n  <p class=\"show-not-found\">\n    {{constant.errorMsg.NO_VIEWED_PROPERTY_FOUND}}\n  </p>\n</div>\n\n\n<!-- show viewed_properties -->\n<div class=\"modal\" id=\"view-viewed-property\">\n  <div class=\"modal-dialog  modal-lg\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n      </div>\n      <div class=\"modal-body\">\n        <h3>Viewed Properties</h3>\n\n        <hr>\n        <pagination-controls id=\"v-property-1\" class=\"my-pagination\" (pageChange)=\"getPageForViewedProperty($event)\">\n        </pagination-controls>\n\n        <div class=\"scrollbox fav-prop\" malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\">\n          <div class=\"row\">\n            <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\"\n              *ngFor=\"let x of parameter.viewed_properties| paginate: { id:'v-property-1', itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: parameter.total }; let in=index\">\n              <div class=\"project-des-bx white-bg-2\">\n                <div class=\"price\">\n                  <p class=\"p10\">{{x.for_sale==1 ? ts.lang.Buy : 'Rent'}}</p>\n                </div>\n                <div class=\"fig-block\">\n                  <img [src]=\"x.image| img:'thumb'\" onerror='src=\"assets/img/bank.png\"' alt=\"img\">\n                </div>\n                <div class=\"project-des-content\">\n                  <!-- <small>{{x.building?.developer?.name ? x.building?.developer?.name : 'NA'}}</small> -->\n                  <small title=\"Apartment\">{{x.name ? x.name : 'NA'}}</small>\n                  <a title=\"Building\" routerLink=\"/dashboard/properties/details/{{x.id}}\">\n                    <h5>{{x.building?.name.slice(0, 15)}}</h5>\n                  </a>\n                  <p class=\"p12\">{{x.building.address.slice(0, 45)}}</p>\n                  <!-- <p class=\"p13\" *ngIf=\"x\">{{x.configuration.name}}, {{x.property_type.name}}</p> -->\n                  <p class=\"p13\" *ngIf=\"x\">\n                    <app-property-configuration *ngIf=\"x.configuration\" [configuration]=\"x.configuration\"></app-property-configuration>\n                    <span>&middot; {{x.property_type.name}}</span>\n                  </p>\n                  <!-- <p class=\"p13\" *ngIf=\"!x\">NA</p>\n                        <p class=\"p13\" *ngIf=\"x\">{{x.property_type.name}}</p> -->\n                  <p class=\"p13\" *ngIf=\"x\">\n                    {{x.min_price|price}}</p>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/layout/common-blocks/viewed-property/viewed-property.component.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/layout/common-blocks/viewed-property/viewed-property.component.ts ***!
  \***********************************************************************************/
/*! exports provided: ViewedPropertyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewedPropertyComponent", function() { return ViewedPropertyComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var src_app_lang_translate_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/lang/translate.service */ "./src/app/lang/translate.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ViewedPropertyComponent = /** @class */ (function () {
    function ViewedPropertyComponent(constant, admin, spinner, ts) {
        this.constant = constant;
        this.admin = admin;
        this.spinner = spinner;
        this.ts = ts;
        this.parameter = {};
        this.scrollbarOptions = { axis: 'y', theme: 'dark', scrollbarPosition: 'inside' };
    }
    ViewedPropertyComponent.prototype.ngOnInit = function () {
        this.parameter.page = this.constant.p;
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
    };
    ViewedPropertyComponent.prototype.getPageForViewedProperty = function (page) {
        this.parameter.page = page;
        this.viewProperties('', this.user_id, this.parameter.page);
    };
    ViewedPropertyComponent.prototype.viewProperties = function (data, user_id, page) {
        var _this = this;
        // this.parameter.viewed_properties = data;
        // this.showPropertyModal.nativeElement.click();
        this.spinner.show();
        this.admin.postDataApi('leads/viewedProperties', { user_id: user_id, page: page }).subscribe(function (r) {
            _this.spinner.hide();
            _this.parameter.viewed_properties = r.data;
            _this.parameter.total = r.total;
            if (_this.parameter.page === 1) {
                _this.showPropertyModal.nativeElement.click();
            }
        }, function (error) {
            _this.spinner.hide();
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('viewed_properties'),
        __metadata("design:type", Object)
    ], ViewedPropertyComponent.prototype, "viewed_properties", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('user_id'),
        __metadata("design:type", Object)
    ], ViewedPropertyComponent.prototype, "user_id", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('showPropertyModal'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], ViewedPropertyComponent.prototype, "showPropertyModal", void 0);
    ViewedPropertyComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-viewed-property',
            template: __webpack_require__(/*! ./viewed-property.component.html */ "./src/app/layout/common-blocks/viewed-property/viewed-property.component.html"),
            styles: [__webpack_require__(/*! ./viewed-property.component.css */ "./src/app/layout/common-blocks/viewed-property/viewed-property.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_common_constants__WEBPACK_IMPORTED_MODULE_2__["Constant"], src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_3__["AdminService"], ngx_spinner__WEBPACK_IMPORTED_MODULE_1__["NgxSpinnerService"],
            src_app_lang_translate_service__WEBPACK_IMPORTED_MODULE_4__["TranslateService"]])
    ], ViewedPropertyComponent);
    return ViewedPropertyComponent;
}());



/***/ }),

/***/ "./src/app/layout/leads/csr-buyer/csr-buyer-detail/csr-buyer-detail.component.css":
/*!****************************************************************************************!*\
  !*** ./src/app/layout/leads/csr-buyer/csr-buyer-detail/csr-buyer-detail.component.css ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/layout/leads/csr-buyer/csr-buyer-detail/csr-buyer-detail.component.html":
/*!*****************************************************************************************!*\
  !*** ./src/app/layout/leads/csr-buyer/csr-buyer-detail/csr-buyer-detail.component.html ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n    <div class=\"white-bg padding15\">\n        <div class=\"row\">\n            <div class=\"col-lg-3 col-md-12 col-sm-12 col-12\">\n                <div class=\"df-profile\">\n                    <a routerLink=\"../\"><i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i></a>\n                    <img [src]=\"leadData?.user?.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\">\n                    <div class=\"df-info\">\n                        <p class=\"p14 text-ellipsis120\">{{leadData?.user?.name ? leadData?.user?.name : leadData?.name}}\n                        </p>\n                        <p class=\"p12\">\n                            {{leadData?.user?.dial_code?leadData?.user?.dial_code:leadData?.dial_code}}-{{leadData?.user?.phone ? leadData?.user?.phone:leadData?.phone}}\n                        </p>\n                    </div>\n                </div>\n            </div>\n            <div class=\"col-lg-7 col-md-12 col-sm-6 col-12\">\n                <div class=\"profile-list\">\n                    <ul>\n                        <li>\n                            <div class=\"df-info\">\n                                <p class=\"p14 marginB0\" *ngIf=\"leadData?.admin\">{{leadData.admin.name | titlecase}}</p>\n                                <p class=\"p12\">CSR Buyer</p>\n                            </div>\n                        </li>\n                        <li>\n                            <div class=\"df-info\" *ngIf=\"leadData?.broker\">\n                                <p class=\"p14 marginB0\">{{leadData.broker.name | titlecase}}</p>\n                                <p class=\"p12\">\n                                    {{leadData?.broker?.is_external_agent==1 ? 'Outside Agent' : 'Inhouse Agent'}}</p>\n                            </div>\n                        </li>\n                        <li>\n                            <div class=\"df-info\" *ngIf=\"leadData?.closer\">\n                                <p class=\"p14 marginB0\">{{leadData.closer.name | titlecase}}</p>\n                                <p class=\"p12\">CSR Closure</p>\n                            </div>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n\n            <div class=\"col-lg-2 col-md-12 col-sm-12 col-12\"\n                *ngIf=\"admin?.admin_acl['Buyer Lead Management']?.can_update==1 || admin?.permissions?.can_csr_buyer==1\">\n                <div *ngIf=\"!leadData?.broker && leadData?.user && (admin?.admin_acl['Buyer Lead Management']?.can_update==1 || admin?.permissions?.can_csr_buyer==1)\"\n                    class=\"form-group d-flex marginT10 float-right right-side\">\n                    <div class=\"dropdown btn-cont\">\n                        <a (click)=\"assignToBroker()\" class=\"btn btn-primary\" href=\"javascript://\">Assign to agent</a>\n                        <!-- <button type=\"button\" class=\"btn btn-primary dropdown-toggle\" data-toggle=\"dropdown\">\n                 Action\n               </button>\n               <div class=\"dropdown-menu dropdown-menu-right\">\n                 <a (click)=\"assignToBroker()\" *ngIf=\"!leadData?.broker && leadData?.user\" class=\"dropdown-item\" href=\"javascript://\">Assign to broker</a>\n                 <a (click)=\"blockThisLead()\" class=\"dropdown-item\" href=\"javascript://\">Block</a>\n               </div> -->\n                    </div>\n                </div>\n                <div *ngIf=\"is_deal_finalised\" class=\"row\">\n                    <div class=\"col-sm-7 btn-cont text-right\">\n                        <a style=\"cursor: auto;\" class=\"btn btn-fourth\" href=\"javascript://\">Deal Finalized</a>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n    </div>\n\n    <div class=\"spacer30\"></div>\n    <div class=\"row\">\n        <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\">\n            <div class=\"white-bg padding30\">\n\n                <div class=\"row\">\n                    <div class=\"col-md-6\">\n                        <h6>Details</h6>\n                    </div>\n                    <!-- <div class=\"col-md-6\">\n                 <div class=\"edit text-right\"><a href=\"javascript://\">Edit</a></div>\n              </div> -->\n                </div>\n                <div class=\"details-table\">\n                    <table class=\"table\">\n                        <tbody>\n                            <tr>\n                                <td style=\"padding-left:0\"><label>Full Name</label></td>\n                                <td *ngIf=\"leadData?.name\">\n                                    {{leadData?.user?.name ? leadData?.user?.name : leadData?.name}}</td>\n                            </tr>\n                            <tr>\n                                <td style=\"padding-left:0\"><label>Contact Number</label></td>\n                                <td *ngIf=\"leadData?.phone\">\n                                    {{leadData?.user?.dial_code ? leadData?.user?.dial_code : leadData?.dial_code}} -\n                                    {{leadData?.user?.phone ? leadData?.user?.phone : leadData?.phone}}</td>\n                            </tr>\n                            <tr>\n                                <td style=\"padding-left:0\"><label>Email address</label></td>\n                                <td *ngIf=\"leadData?.email\">\n                                    {{leadData?.user?.email ? leadData?.user?.email : leadData?.email}}</td>\n                            </tr>\n                            <tr>\n                                <td style=\"padding-left:0\"><label>Interested In</label></td>\n                                <td *ngIf=\"leadData?.configuration\">\n                                    <span *ngFor=\"let conf of leadData.configuration; let ii=index\">\n                                        <app-property-configuration *ngIf=\"conf\" [configuration]=\"conf\"></app-property-configuration>\n                                        <span *ngIf=\"ii<leadData?.configuration?.length-1\"> | </span><br>\n                                    </span>\n                                    <span *ngIf=\"leadData.configuration?.length==0\">NA</span>\n                                </td>\n                            </tr>\n                            <tr>\n                                <td style=\"padding-left:0\"><label>Favorite Properties</label></td>\n                                <td>{{parameter.fav_properties_count}}\n                                    <a style=\"display: none;\" data-toggle=\"modal\" #showPropertyModal\n                                        data-target=\"#view-fav-property\" class=\"view-all\" href=\"javascript://\">View\n                                        All</a>\n                                    <a *ngIf=\"parameter.fav_properties_count\" class=\"view-all\" href=\"javascript://\"\n                                        (click)=\"viewFavProperties()\">View All</a>\n                                </td>\n                            </tr>\n\n                            <!-- Meeting Schedule -->\n                            <tr *ngIf=\"leadData?.sale_rent==1\">\n                                <td style=\"padding-left:0\"><label><strong>Meeting Schedule</strong></label></td>\n                                <td colspan=\"2\">\n                                    <p style=\"display:none;\" class=\"date\" #modalOpen data-toggle=\"modal\"\n                                        data-target=\"#set_appointment\">Click to Schedule</p>\n                                    <p class=\"date cursor-pointer\" (click)=\"openModal()\">Click to Schedule</p>\n                                    <p *ngFor=\"let na of data; let m=index\" class=\"date\">\n                                        <span *ngIf=\"m<2\">{{na.appointment_date | moment}}</span>\n                                    </p>\n                                    <span class=\"read-more\" *ngIf=\"data.length>2\" data-toggle=\"modal\"\n                                        data-target=\"#get-availability1\">View all</span>\n                                </td>\n                            </tr>\n\n                        </tbody>\n                    </table>\n                </div>\n            </div>\n            <div class=\"spacer30\"></div>\n\n            <!-- fill information start -->\n            <app-fill-information *ngIf=\"leadData\" [sent_as]=\"parameter.sent_as\" [leadData]=\"leadData\"\n                [selectedAmenities]=\"selectedAmenities\" [allAmenities]=\"allAmenities\" [lead_id]=\"parameter.lead_id\"\n                [showOtherTextBox]=\"showOtherTextBox\">\n            </app-fill-information>\n            <!-- fill information end -->\n\n        </div>\n        <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\">\n            <div *ngIf=\"!leadData?.user\" class=\"white-bg padding20\">\n                User is not registered.\n            </div>\n\n            <!-- chat start -->\n            <div *ngIf=\"leadData?.user\">\n                <!-- <app-chat [lead_id]=\"parameter.lead_id\" [sent_as]=\"parameter.sent_as\" [user_id]=\"parameter.user_id\"\n                    [admin_id]=\"parameter.admin_id\"></app-chat> -->\n                <div class=\"white-bg move-below\">\n                    <div class=\"page-title-3 marginB0\">\n                        <h4><i><img src=\"assets/img/chat-icon.png\" alt=\"img\"></i> Chat</h4>\n                    </div>\n                    <div class=\"cust-tabs-4\">\n                        <app-chat-tabs *ngIf=\"leadData?.user\" [lead_id]=\"parameter.lead_id\"\n                            [sent_as]=\"parameter.sent_as\" [user_id]=\"parameter.user_id\" [admin_id]=\"parameter.admin_id\"\n                            [leadData]=\"leadData\">\n                        </app-chat-tabs>\n                    </div>\n                </div>\n            </div>\n            <!-- chat end -->\n\n            <!-- notes start -->\n            <app-notes *ngIf=\"parameter?.lead_id\" [sent_as]=\"parameter.sent_as\" [lead_id]=\"parameter.lead_id\"></app-notes>\n            <!-- notes end -->\n\n        </div>\n    </div>\n\n    <!-- Interested Properties start -->\n    <app-interested-property *ngIf=\"parameter?.lead_id\" [is_deal_finalised]=\"false\" [selected_properties]=\"leadData?.selected_properties\"\n        [lead_id]=\"parameter.lead_id\" [interested_properties]=\"parameter.interested_properties\"\n        [sent_as]=\"parameter.sent_as\"></app-interested-property>\n    <!-- Interested Properties end -->\n\n    <!-- viewed property start -->\n    <app-viewed-property *ngIf=\"parameter?.lead_id\" [user_id]=\"leadData?.user_id\" [viewed_properties]=\"parameter.viewed_properties\">\n    </app-viewed-property>\n    <!-- viewed property end -->\n\n    <!-- viewed projects start -->\n    <app-viewed-projects *ngIf=\"parameter?.lead_id\" [user_id]=\"leadData?.user_id\" [viewed_projects]=\"parameter.viewed_projects\">\n    </app-viewed-projects>\n    <!-- viewed projects end -->\n</div>\n\n\n\n<!-- show fav properties -->\n<div class=\"modal\" id=\"view-fav-property\">\n    <div class=\"modal-dialog  modal-lg\">\n        <div class=\"modal-content\">\n        <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n        </div>\n        <div class=\"modal-body\">\n            <h3>Favorite Properties</h3>\n            <hr>\n            <pagination-controls id=\"page2\" class=\"my-pagination\" (pageChange)=\"getPage2($event)\"></pagination-controls>\n    \n            <div class=\"scrollbox fav-prop\" malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\">\n            <div class=\"row\">\n                <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\"\n                *ngFor=\"let x of parameter.favorites| paginate: { id: 'page2', itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page2, totalItems: parameter.total2 }; let in=index\">\n                <div class=\"project-des-bx white-bg-2\">\n                    <div class=\"price\" *ngIf=\"x\">\n                    <p class=\"p10\">{{x.for_sale==1 ? ts.lang.Buy : 'Rent'}}</p>\n                    </div>\n                    <div class=\"fig-block\">\n                    <img [src]=\"x.image| img:'thumb'\" onerror='src=\"assets/img/bank.png\"' alt=\"img\">\n                    </div>\n                    <div class=\"project-des-content\">\n                        <small title=\"Apartment\">{{x?.name}}</small>\n                    <a title=\"Building\" routerLink=\"/dashboard/properties/details/{{x?.id}}\">\n                        <h5>{{x?.building?.name.slice(0, 15)}}</h5>\n                    </a>\n                    <p class=\"p12\">{{x.building.address.slice(0, 40)}}</p>\n                    <p class=\"p13\" *ngIf=\"x\">\n                        <app-property-configuration *ngIf=\"x.configuration\" [configuration]=\"x.configuration\"></app-property-configuration>\n                        <span>&middot; {{x.property_type.name}}</span>\n                    </p>\n                    <p class=\"p13\">\n                        {{x.min_price | price}}\n                    </p>\n                    </div>\n                </div>\n                </div>\n            </div>\n            </div>\n        </div>\n        </div>\n    </div>\n</div>\n\n<!-- add inhouse user modal -->\n<div class=\"modal animated\" id=\"set_appointment\">\n    <!-- <div class=\"modal-dialog fadeIndown\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header modal-header-new\">\n                <h4 class=\"modal-title\">Schedule Appointment</h4>\n                <button type=\"button\" style=\"display: none;\" class=\"close\" data-dismiss=\"modal\" #modalClose>&times;</button>\n                <button type=\"button\" class=\"close\" (click)=\"closeModal()\">&times;</button>\n            </div>\n    \n            <form class=\"form-horizontal form-model0P\" role=\"form\" ngNativeValidate #addForm=\"ngForm\" (ngSubmit)=\"add()\">\n            <div class=\"modal-body modal-body-new\">\n                <div class=\"row\">\n                    <div class=\"col-10\">\n                        <p-calendar title=\"Click to add\" name=\"app\" [(ngModel)]=\"appointment.appointment_date\" [minDate]=\"today\" showButtonBar=\"true\" showTime=\"true\" hourFormat=\"12\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n                    </div>\n                    <div class=\"col-2\">\n                        <div class=\"form-group-2\">\n                            <a *ngIf=\"!appointment.id && appointment.appointment_date\" class=\"green-color fontW500\" (click)=\"add()\" href=\"javascript://\">Save</a>\n                            <a *ngIf=\"appointment.id\" class=\"green-color fontW500\" (click)=\"add()\" href=\"javascript://\">Edit</a>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            </form>\n        </div>\n    </div> -->\n    <div class=\"modal-dialog fadeIndown\">\n        <div class=\"modal-dialog fadeIndown\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header modal-header-new\">\n                    <h4 class=\"modal-title\">Schedule Meeting</h4>\n                    <button type=\"button\" style=\"display: none;\" class=\"close\" data-dismiss=\"modal\"\n                        #modalClose>&times;</button>\n                    <button type=\"button\" class=\"close\" (click)=\"closeModal()\">&times;</button>\n                </div>\n\n                <form class=\"form-horizontal form-model0P\" role=\"form\" ngNativeValidate #addForm=\"ngForm\"\n                    (ngSubmit)=\"add()\">\n                    <div class=\"modal-body padding0\">\n                        <div class=\"row\">\n                            <div class=\"col-8\">\n                                <label>Choose Date & Time</label>\n                                <p-calendar autocomplete=\"off\" title=\"Click to add\" name=\"app\" [(ngModel)]=\"date\" [minDate]=\"today\"\n                                    showButtonBar=\"true\" showTime=\"true\" hourFormat=\"12\" [monthNavigator]=\"true\"\n                                    [yearNavigator]=\"true\" yearRange=\"2000:2030\" hideOnDateTimeSelect=\"true\"></p-calendar>\n                            </div>\n                            <div class=\"col-2\">\n                                <div class=\"form-group-2\">\n                                    <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n                                    <a class=\"green-color fontW500\" href=\"javascript://\" (click)=\"addDateTime()\">Add</a>\n                                </div>\n                            </div>\n                        </div>\n                        <!-- <div class=\"row\" *ngFor=\"let d of data; let j=index\">\n                        <div class=\"col-8\">\n                            <label class=\"notary-ava\">{{d.appointment_date | moment}}</label>\n                        </div>\n                        <div class=\"col-2\">\n                            <a class=\"green-color fontW500\" (click)=\"deleteAppointment(d.id, j)\" href=\"javascript://\">\n                                Remove\n                            </a>\n                        </div>\n                    </div> -->\n                        <div class=\"row\" *ngFor=\"let a of appointment.appointment_date_array; let i=index\">\n                            <div class=\"col-8\">\n                                <label class=\"notary-ava\">{{a|date:'h:mm a'|lowercase}}, {{a|date: 'MMM d y'}}</label>\n                            </div>\n                            <div class=\"col-2\">\n                                <a class=\"green-color fontW500\" (click)=\"removeAppointment(i)\" href=\"javascript://\">\n                                    Remove\n                                </a>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-8\"></div>\n                            <div class=\"col-2\">\n                                <div class=\"btn-cont text-right\">\n                                    <button type=\"submit\" class=\"btn btn-primary-new\">Save</button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </form>\n\n            </div>\n        </div>\n    </div>\n</div>\n\n\n<div class=\"modal animated\" id=\"get-availability1\">\n    <div class=\"modal-dialog fadeIndown\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header modal-header-new\">\n                <h4 class=\"modal-title\">Meeting Scheduled</h4>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #modalClose>&times;</button>\n                <!-- <button type=\"button\" class=\"close\" (click)=\"closeModal()\">&times;</button> -->\n            </div>\n\n            <div class=\"modal-body modal-body-new\">\n                <div class=\"row\">\n                    <div class=\"col-6\" *ngFor=\"let d of data; let j=index\">\n                        <label class=\"notary-ava\">{{d.appointment_date | moment}}</label>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/layout/leads/csr-buyer/csr-buyer-detail/csr-buyer-detail.component.ts":
/*!***************************************************************************************!*\
  !*** ./src/app/layout/leads/csr-buyer/csr-buyer-detail/csr-buyer-detail.component.ts ***!
  \***************************************************************************************/
/*! exports provided: CsrBuyerDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CsrBuyerDetailComponent", function() { return CsrBuyerDetailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var src_app_models_leads_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/leads.model */ "./src/app/models/leads.model.ts");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var src_app_services_leads_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/leads.service */ "./src/app/services/leads.service.ts");
/* harmony import */ var src_app_lang_translate_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/lang/translate.service */ "./src/app/lang/translate.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var CsrBuyerDetailComponent = /** @class */ (function () {
    function CsrBuyerDetailComponent(route, admin, constant, appointment, spinner, leadsService, ts) {
        var _this = this;
        this.route = route;
        this.admin = admin;
        this.constant = constant;
        this.appointment = appointment;
        this.spinner = spinner;
        this.leadsService = leadsService;
        this.ts = ts;
        this.parameter = {};
        this.today = new Date();
        this.data = [];
        this.selected_prop_ids = [];
        this.allAmenities = [];
        this.selectedAmenities = [];
        this.scrollbarOptions = { axis: 'y', theme: 'dark' };
        this.admin.loginData$.subscribe(function (success) {
            _this.parameter.admin_id = success['id'];
        });
    }
    CsrBuyerDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page2 = this.constant.p;
        this.parameter.total2 = 0;
        // Initialising
        this.leadData = new src_app_models_leads_model__WEBPACK_IMPORTED_MODULE_4__["Leads"]();
        this.leadData.prefs = new src_app_models_leads_model__WEBPACK_IMPORTED_MODULE_4__["Prefs"]();
        this.parameter.sent_as = this.constant.userType.csr_buyer;
        this.route.params.subscribe(function (params) {
            _this.parameter.lead_id = params.id;
            _this.spinner.show();
            _this.admin.postDataApi('leads/details', { lead_id: _this.parameter.lead_id, sent_as: _this.parameter.sent_as }).subscribe(function (r) {
                _this.spinner.hide();
                _this.leadData = r.data.lead;
                _this.leadData.broker = r.data.lead.broker;
                if (r.data.lead.appointments.length !== 0) {
                    _this.data = r.data.lead.appointments;
                    // this.appointment = r.data.lead.appointments[0];
                }
                _this.parameter.favorites = r.data.favorites;
                _this.parameter.fav_properties_count = r.data.fav_properties_count;
                _this.setFillInformationData(_this.leadData);
                _this.parameter.proximity_places = r.data.lead.proximity_places;
                _this.parameter.interested_properties = r.data.interested_properties;
                _this.is_deal_finalised = _this.leadData.selected_properties.length !== 0 ? true : false;
                _this.parameter.viewed_properties = r.data.viewed_properties;
                _this.parameter.viewed_projects = r.data.viewed_projects;
                _this.parameter.user_id = _this.leadData.user ? _this.leadData.user.id : 0;
            }, function (error) {
                _this.spinner.hide();
            });
        });
    };
    CsrBuyerDetailComponent.prototype.getPage2 = function (page) {
        this.parameter.page2 = page;
        this.viewFavProperties();
    };
    CsrBuyerDetailComponent.prototype.setFillInformationData = function (leadData) {
        var _this = this;
        this.allAmenities = leadData.buyer_amenities;
        leadData.buyer_amenities.forEach(function (element) {
            if (element.is_selected) {
                _this.selectedAmenities.push(element);
            }
        });
        if (leadData.prefs !== null) {
            this.showOtherTextBox = leadData.prefs.proximity_other ? true : false;
            if (leadData.prefs.planning_to_buy !== null) {
                this.leadData.prefs.planning_to_buy = moment__WEBPACK_IMPORTED_MODULE_2__["utc"](leadData.prefs.planning_to_buy).toDate();
                // this.fillInfo.planning_to_buy = moment.utc(leadData.prefs.planning_to_buy).toDate();
            }
        }
        else {
            this.leadData.prefs = new src_app_models_leads_model__WEBPACK_IMPORTED_MODULE_4__["Prefs"]();
            this.leadData.prefs.looking_for = 1;
            this.leadData.prefs.min_price = 0;
            this.leadData.prefs.max_price = 0;
            this.showOtherTextBox = false;
        }
    };
    CsrBuyerDetailComponent.prototype.assignToBroker = function () {
        var _this = this;
        this.spinner.show();
        this.admin.postDataApi('conversation/assignBroker', { lead_id: this.parameter.lead_id }).subscribe(function (r) {
            _this.spinner.hide();
            _this.leadData.user = r.data['user'];
            _this.leadData.broker = r.data['broker'];
            _this.leadData.admin = r.data['admin'];
            swal('Success', 'Agent assigned successfully', 'success');
        }, function (error) {
            swal('Error', 'No Agent is available', 'error');
        });
    };
    CsrBuyerDetailComponent.prototype.blockThisLead = function () {
        this.admin.postDataApi('conversation/block', { lead_id: this.parameter.lead_id }).subscribe(function (r) {
            // console.log('conversation/block', r);
        });
    };
    CsrBuyerDetailComponent.prototype.viewFavProperties = function () {
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
    CsrBuyerDetailComponent.prototype.dealFinalisedReceived = function (value) {
        // console.log(value);
    };
    CsrBuyerDetailComponent.prototype.addDateTime = function () {
        if (this.date) {
            this.appointment.appointment_date_array.push(this.date);
            this.date = '';
        }
    };
    CsrBuyerDetailComponent.prototype.add = function () {
        var _this = this;
        this.appointment.appointment_date_array.forEach(function (element) {
            var d = new Date(element);
            var f = moment__WEBPACK_IMPORTED_MODULE_2__(d).utc().format('YYYY-MM-DD HH:mm:ss');
            _this.appointment.appointment_date.push(f);
        });
        if (this.appointment.appointment_date.length === 0) {
            swal('Error', 'Choose atleast one date.', 'error');
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
            swal('Success', 'Appointment scheduled successfully.', 'success');
        }, function (error) {
            _this.spinner.hide();
        });
    };
    CsrBuyerDetailComponent.prototype.openModal = function () {
        this.appointment = new src_app_models_leads_model__WEBPACK_IMPORTED_MODULE_4__["AddAppointmentMultiple"]();
        this.appointment.lead_id = this.parameter.lead_id;
        this.appointment.property_id = this.leadData.selected_properties[0] &&
            this.leadData.selected_properties[0].property_id ?
            this.leadData.selected_properties[0].property_id : '';
        this.appointment.sent_as = this.constant.userType.csr_buyer;
        this.modalOpen.nativeElement.click();
    };
    CsrBuyerDetailComponent.prototype.closeModal = function () {
        this.modalClose.nativeElement.click();
    };
    CsrBuyerDetailComponent.prototype.deleteAppointment = function (id, j) {
        var _this = this;
        this.admin.postDataApi('leads/deleteAppointment', { id: id })
            .subscribe(function (success) {
            _this.data.splice(j, 1);
            // this.items = success.data;
            // this.parameter.total = success.total_count;
        });
    };
    CsrBuyerDetailComponent.prototype.removeAppointment = function (i) {
        this.appointment.appointment_date_array.splice(i, 1);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('showPropertyModal'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CsrBuyerDetailComponent.prototype, "showPropertyModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalOpen'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CsrBuyerDetailComponent.prototype, "modalOpen", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalClose'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], CsrBuyerDetailComponent.prototype, "modalClose", void 0);
    CsrBuyerDetailComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-csr-buyer-detail',
            template: __webpack_require__(/*! ./csr-buyer-detail.component.html */ "./src/app/layout/leads/csr-buyer/csr-buyer-detail/csr-buyer-detail.component.html"),
            styles: [__webpack_require__(/*! ./csr-buyer-detail.component.css */ "./src/app/layout/leads/csr-buyer/csr-buyer-detail/csr-buyer-detail.component.css")],
            providers: [src_app_models_leads_model__WEBPACK_IMPORTED_MODULE_4__["AddAppointmentMultiple"]]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_5__["AdminService"],
            src_app_common_constants__WEBPACK_IMPORTED_MODULE_6__["Constant"],
            src_app_models_leads_model__WEBPACK_IMPORTED_MODULE_4__["AddAppointmentMultiple"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerService"],
            src_app_services_leads_service__WEBPACK_IMPORTED_MODULE_7__["LeadsService"],
            src_app_lang_translate_service__WEBPACK_IMPORTED_MODULE_8__["TranslateService"]])
    ], CsrBuyerDetailComponent);
    return CsrBuyerDetailComponent;
}());



/***/ }),

/***/ "./src/app/layout/leads/csr-buyer/csr-buyer.component.css":
/*!****************************************************************!*\
  !*** ./src/app/layout/leads/csr-buyer/csr-buyer.component.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/layout/leads/csr-buyer/csr-buyer.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/layout/leads/csr-buyer/csr-buyer.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n    <div class=\"row\">\n        <div class=\"col-md-4\">\n            <div class=\"form-group\">\n                <p class=\"p16\">Manage CSR Buyer's Lead</p>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-md-4\">\n            <div class=\"form-group\"\n                *ngIf=\"admin?.admin_acl['Buyer Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n                <div class=\"d-flex\">\n                    <div class=\"autocomplete\">\n                        <input placeholder=\"Search CSR Buyer\" style=\"max-width:200px\" list=\"amenities\"\n                            [(ngModel)]=\"parameter.keyword\" (input)=\"getCsrListing()\" class=\"form-control\" type=\"text\"\n                            name=\"keyword\" (focusout)=\"closeCsrListing()\">\n                        <div id=\"myInputautocomplete-list\" class=\"autocomplete-items\">\n                            <div *ngFor=\"let item of users\" (click)=\"selectCsrUser(item)\">{{item.email}}</div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-md-8 col-12\">\n            <div class=\"cust-tabs-2\">\n                <ul class=\"nav nav-tabs\">\n                    <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==1}\"\n                            (click)=\"changeFlag(1)\">This Week</a>\n                    </li>\n                    <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==2}\"\n                            (click)=\"changeFlag(2)\">This Month</a>\n                    </li>\n                    <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==3}\"\n                            (click)=\"changeFlag(3)\">Last Month</a>\n                    </li>\n                    <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==4}\"\n                            (click)=\"changeFlag(4)\">Lifetime</a>\n                    </li>\n                    <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==5}\"\n                            (click)=\"parameter.flag=5\">Custom</a>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-12\">\n            <div *ngIf=\"parameter.flag == 5\" class=\"row\">\n                <div class=\"offset-lg-7\"></div>\n                <div class=\"col-lg-2 col-md-2 col-sm-5 col-5\">\n                    <div class=\"form-group marginB0\">\n                        <label>From:</label>\n                        <p-calendar showIcon=\"true\" [(ngModel)]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\"\n                            [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n                    </div>\n                </div>\n                <div class=\"col-lg-2 col-md-2 col-sm-5 col-5\">\n                    <div class=\"form-group marginB0\">\n                        <label>To:</label>\n                        <p-calendar showIcon=\"true\" [(ngModel)]=\"parameter.max\" [minDate]=\"parameter.min\"\n                            [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\"\n                            yearRange=\"2000:2030\"></p-calendar>\n                    </div>\n                </div>\n                <div class=\"col-lg-1 col-md-2 col-sm-2 col-6\">\n                    <div class=\"form-group btn-cont\">\n                        <label class=\"addMT3\">&nbsp;</label>\n                        <button class=\"btn btn-calender\" href=\"javascript://\"\n                            (click)=\"getListing(); getCSRDashBoardData();\"\n                            [disabled]=\"!parameter.min || !parameter.max\">Apply</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"listingResults\">\n        <div class=\"row\" *ngIf=\"admin?.admin_acl['Buyer Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n            <div class=\"col-md-2\">\n                <div class=\"form-group\">\n                    <label>Country</label>\n                    <select class=\"form-control\" (change)=\"onCountryChange($event.target.value)\">\n                        <option value=\"0\">All</option>\n                        <option *ngFor=\"let item of location.countries\" [value]=\"item.id\">{{item.name}}</option>\n                    </select>\n                </div>\n            </div>\n            <div class=\"col-md-2\">\n                <div class=\"form-group\">\n                    <label>State</label>\n                    <select class=\"form-control\" (change)=\"onStateChange($event.target.value)\">\n                        <option value=\"0\">All</option>\n                        <option *ngFor=\"let item of location.states\" [value]=\"item.id\">{{item.name}}</option>\n                    </select>\n                </div>\n            </div>\n            <div class=\"col-md-2\">\n                <div class=\"form-group\">\n                    <label>City</label>\n                    <select class=\"form-control\" (change)=\"onCityChange($event.target.value)\">\n                        <option value=\"0\">All</option>\n                        <option *ngFor=\"let item of location.cities\" [value]=\"item.id\">{{item.name}}</option>\n                    </select>\n                </div>\n            </div>\n\n            <div class=\"col-md-2\">\n                <div class=\"form-group\">\n                    <label>Locality</label>\n                    <select class=\"form-control\" (change)=\"onLocalityChange($event.target.value)\">\n                        <option value=\"0\">All</option>\n                        <option *ngFor=\"let item of location.localities\" [value]=\"item.id\">{{item.name}}</option>\n                    </select>\n                </div>\n            </div>\n\n            <div class=\"col-md-2\">\n                <div class=\"form-group btn-cont\">\n                    <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n                    <button type=\"button\" (click)=\"getListing(); getCSRDashBoardData();\"\n                        class=\"btn btn-primary-new width100P\">Apply</button>\n                </div>\n            </div>\n\n            <div class=\"col-md-2\">\n                <div class=\"form-group btn-cont\">\n                    <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n                    <button type=\"button\" (click)=\"resetFilters()\" class=\"btn btn-primary-new width100P\">Reset</button>\n                </div>\n            </div>\n        </div>\n\n        <div *ngIf=\"selectedUser as item\" class=\"sigle-row-table\">\n            <table class=\"table table-striped\">\n                <tbody>\n                    <tr>\n                        <td><img class=\"rounded-circle\" [src]=\"item.image| img:'small'\"\n                                onerror='this.src=\"assets/img/default_img.png\"' alt=\"img\"></td>\n                        <td class=\"text-left\">\n                            <span class=\"name\">{{item.name | titlecase}}</span>\n                        </td>\n                        <td class=\"text-left\">{{item.phone}}</td>\n                        <td class=\"text-left\">{{item.email}}</td>\n                        <td>\n                            <a (click)=\"removeCsrUser()\" href=\"javascript://\" class=\"icon-block edit-icon\">\n                                <img src=\"assets/img/remove-icon.png\" alt=\"remove\" title=\"remove\" /></a>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-lg-8 col-md-12 col-sm-12 col-12\">\n                <div class=\"info-box all-leads\">\n                    <div class=\"row\">\n                        <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == '1'}\"\n                            (click)=\"changeCountFlag(1)\">\n                            <div class=\"one-row \">\n                                <div class=\"o-block\">\n                                    <h5>Leads</h5>\n                                    <small>Total</small>\n                                </div>\n                                <div class=\"o-block\">\n                                    <a class=\"view-all\" href=\"javascript://\">View All</a>\n                                    <h4>{{dash?.lead_total}}</h4>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == '2'}\"\n                            (click)=\"changeCountFlag(2)\">\n                            <div class=\"one-row\">\n                                <div class=\"o-block\">\n                                    <h5>Leads</h5>\n                                    <small>Without Agent</small>\n                                </div>\n                                <div class=\"o-block\">\n                                    <a class=\"view-all\" href=\"javascript://\">View All</a>\n                                    <h4>{{dash?.lead_without_broker}}</h4>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"info-box all-leads\">\n                    <div class=\"row\">\n                        <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == '3'}\"\n                            (click)=\"changeCountFlag(3)\">\n                            <div class=\"one-row \">\n                                <div class=\"o-block\">\n                                    <h5>Leads</h5>\n                                    <small>Information Filled</small>\n                                </div>\n                                <div class=\"o-block\">\n                                    <a class=\"view-all\" href=\"javascript://\">View All</a>\n                                    <h4>{{dash?.lead_information_filled}}</h4>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == '4'}\"\n                            (click)=\"changeCountFlag(4)\">\n                            <div class=\"one-row\">\n                                <div class=\"o-block\">\n                                    <h5>Leads</h5>\n                                    <small>Agent Assigned</small>\n                                </div>\n                                <div class=\"o-block\">\n                                    <a class=\"view-all\" href=\"javascript://\">View All</a>\n                                    <h4>{{dash?.lead_broker_assigned}}</h4>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"col-lg-4 col-md-12 col-sm-12 col-12\">\n                <div class=\"chat-msg all-leads\" style=\"padding:0px\">\n                    <div class=\"padding20\" *ngIf=\"dash?.lead_total == 0\">No records found</div>\n                    <ngx-charts-pie-chart [results]=\"chartView\"></ngx-charts-pie-chart>\n                </div>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-12\">\n                <div class=\"spacer40\"></div>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-lg-6 col-md-6 col-6\">\n                <div class=\"title-group\">\n                    <h5>Leads\n                        <span *ngIf=\"parameter.count_flag == 1\">(Total)</span>\n                        <span *ngIf=\"parameter.count_flag == 2\">(Without Agent)</span>\n                        <span *ngIf=\"parameter.count_flag == 3\">(Information Filled)</span>\n                        <span *ngIf=\"parameter.count_flag == 4\">(Agent Assigned)</span>\n                    </h5>\n                </div>\n            </div>\n            <div class=\"col-lg-6 col-md-6 col-5\"\n                *ngIf=\"admin?.admin_acl['Buyer Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n                <div class=\"add-new text-right\">\n                    <a class=\"btn\" (click)=\"bulkAssign()\" href=\"javascript://\">Bulk Re-assign</a>\n                </div>\n            </div>\n        </div>\n        <div class=\"white-bg\">\n            <div class=\"tabel-section\">\n                <div class=\"table-responsive\">\n                    <table class=\"table table-striped table-align-left vertical-align-top\">\n                        <tr>\n                            <th *ngIf=\"admin?.admin_acl['Buyer Lead Management']?.can_read==1 && !this.parameter.assignee_id\"\n                                style=\"width:6%\">\n                                <div class=\"table-search\">\n                                    <label>All</label>\n                                    <div>\n                                        <label class=\"cust-check-bx\">\n                                            <input class=\"width1\" type=\"checkbox\"\n                                                (click)=\"selectAll(parameter.is_selected)\" name=\"document\">\n                                            <span class=\"checkmark\"></span>\n                                        </label>\n                                    </div>\n                                </div>\n                            </th>\n                            <th style=\"width:6%\">\n                                <div class=\"table-search\"><label>Image</label></div>\n                            </th>\n                            <th style=\"width:15%\">\n                                <div class=\"table-search\">\n                                    <label>Name</label>\n                                    <div class=\"searh-3\">\n                                        <input autocomplete=\"off\" type=\"text\" [(ngModel)]=\"parameter.name\"\n                                            (keyup.enter)=\"changeFilter('name',$event.target.value)\" name=\"\">\n                                        <button *ngIf=\"parameter.name\" (click)=\"changeFilter('name', parameter.name)\"><i\n                                                class=\"fa fa-search\"></i></button>\n                                    </div>\n                                </div>\n                            </th>\n                            <th style=\"width:19%; text-align:left;\">\n                                <div class=\"table-search\">\n                                    <label>Contact Number</label>\n                                    <div class=\"searh-3\">\n                                        <input autocomplete=\"off\" type=\"text\" [(ngModel)]=\"parameter.phone\"\n                                            (keyup.enter)=\"changeFilter('phone',$event.target.value)\" name=\"\">\n                                        <button *ngIf=\"parameter.phone\"\n                                            (click)=\"changeFilter('phone', parameter.phone)\"><i\n                                                class=\"fa fa-search\"></i></button>\n                                    </div>\n                                </div>\n                            </th>\n                            <th style=\"width:20%\">\n                                <div class=\"table-search\">\n                                    <label>Email</label>\n                                    <div class=\"searh-3\">\n                                        <input autocomplete=\"off\" type=\"text\" [(ngModel)]=\"parameter.email\"\n                                            (keyup.enter)=\"changeFilter('email',$event.target.value)\" name=\"\">\n                                        <button *ngIf=\"parameter.email\"\n                                            (click)=\"changeFilter('email', parameter.email)\"><i\n                                                class=\"fa fa-search\"></i></button>\n                                    </div>\n                                </div>\n                            </th>\n                            <th style=\"width:24%\">\n                                <div class=\"table-search\">\n                                    <label>Interested In</label>\n                                </div>\n                            </th>\n                            <th style=\"width:10%\">\n                                <div class=\"table-search\">\n                                    <label>Assignee</label>\n                                </div>\n                            </th>\n                            <th style=\"width:6%\">\n                                <div class=\"table-search\">\n                                    <label>Property For</label>\n                                </div>\n                            </th>\n                        </tr>\n                        <tr class=\"cursor-pointer\" title=\"Click to view details\"\n                            *ngFor=\"let item of items| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: parameter.total }\"\n                            (click)=\"viewLeadDetails(item.id, item)\">\n                            <!-- routerLink=\"/dashboard/leads/csr-buyers/{{item.id}}\" -->\n                            <td *ngIf=\"admin?.admin_acl['Buyer Lead Management']?.can_read==1 && !this.parameter.assignee_id\"\n                                (click)=\"$event.stopPropagation()\">\n                                <label class=\"cust-check-bx\">\n                                    <input type=\"checkbox\" [(ngModel)]=\"item.selected\" name=\"document\">\n                                    <span class=\"checkmark\"></span>\n                                </label>\n                                <!-- <i class=\"fa\" [ngClass]=\"item.selected?'fa-check-square-o':'fa-square-o'\" (click)=\"item.selected = !item.selected\" aria-hidden=\"true\"></i> -->\n                            </td>\n                            <td>\n                                <img [src]=\"item?.user?.image ? item?.user?.image : item?.image| img:'small'\" class=\"rounded-circle\"\n                                    onerror='src=\"assets/img/default_img.png\"' alt=\"img\">\n                            </td>\n                            <td class=\"text-left\">\n                                <span *ngIf=\"item.name\" class=\"name\">{{item?.user?.name ? item?.user?.name : item?.name | titlecase}}</span>\n                                <span class=\"name\" *ngIf=\"!item.name\">NA</span>\n                            </td>\n                            <td class=\"text-left\" *ngIf=\"item?.phone\">\n                                {{item?.dial_code ? item?.dial_code : constant.dial_code}}-{{item?.user?.phone ? item?.user?.phone : item.phone}}</td>\n                            <td class=\"text-left\" *ngIf=\"!item.phone\">NA</td>\n                            <td class=\"text-left\" *ngIf=\"item.email\">{{item?.user?.email ? item?.user?.email : item.email}}</td>\n                            <td class=\"text-left\" *ngIf=\"!item.email\">NA</td>\n                            <td>\n                                <span *ngFor=\"let conf of item.configuration; let ii=index\">\n                                    <app-property-configuration [configuration]=\"conf\"></app-property-configuration>\n                                    <span *ngIf=\"ii<item?.configuration?.length-1\"> | </span> <br>\n                                </span>\n                                <span *ngIf=\"item.configuration?.length==0\">NA</span>\n                            </td>\n                            <td class=\"text-left\" title=\"CSR Buyer\">{{item?.admin?.name ? item?.admin?.name : 'NA'}}</td>\n                            <td class=\"text-left\" *ngIf=\"item.sale_rent\">{{item.sale_rent==1 ? ts.lang.Buy : 'Rent'}}</td>\n                        </tr>\n                    </table>\n                    <div class=\"padding20 center\" *ngIf=\"parameter.noResultFound\">\n                        <img src=\"assets/img/404-error.png\" alt=\"Not found\">\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"btn-cont marginT15\" *ngIf=\"parameter.total\">\n        <div class=\"row\">\n            <div class=\"col-6\">\n                <div class=\"title-group\">\n                    <p>Showing {{items?.length}} out of {{parameter.total}}</p>\n                </div>\n            </div>\n            <div class=\"col-6 text-right\">\n                <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n            </div>\n        </div>\n    </div>\n</div>\n\n<!-- Assignment model -->\n<a data-toggle=\"modal\" data-target=\"#assign-model\" #openAssignModel></a>\n<div class=\"modal\" id=\"assign-model\">\n    <div class=\"modal-dialog \">\n        <div class=\"modal-content notary-avail\">\n            <div class=\"modal-header popup-header\">\n                <h4 class=\"modal-title\">Re Assign to</h4>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #closeAssignModel>&times;</button>\n            </div>\n            <div class=\"modal-body\">\n                <div class=\"row\">\n                    <div class=\"col-md-8 col-6\">\n                        <input title=\"Click enter for search\" style=\"max-width:200px\" list=\"amenities\" [(ngModel)]=\"assign.keyword\"\n                            (keyup.enter)=\"getAssignListing()\" class=\"form-control\" type=\"text\" name=\"keyword\"\n                            placeholder=\"Search\">\n                    </div>\n                    <div class=\"col-md-4 col-5 btn-cont\">\n                        <a class=\"btn btn-primary pull-right\" href=\"javascript://\" (click)=\"assignNow()\">Assign</a>\n                    </div>\n                </div>\n                <div class=\"spacer40\"></div>\n                <div *ngIf=\"showSearchText\">\n                    <p class=\"show-not-found\">Search the CSR Buyer you want to assign.</p>\n                </div>\n                <div class=\"modal-table-data\" malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\">\n                    <table class=\"table\">\n                        <tr *ngFor=\"let item of assign.items\">\n                            <td *ngIf=\"item.is_blocked!=1\">\n                                <div class=\"n-avail-profile\">\n                                    <img [src]=\"item.image| img:'small'\" onerror='src=\"assets/img/default_img.png\"'\n                                        alt=\"img\">\n                                    <div class=\"n-avail-info\">\n                                        <p class=\"p12\">{{item.name | titlecase}}</p>\n                                        <p class=\"p10\">Phone :\n                                            {{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone.trim()}}\n                                        </p>\n                                    </div>\n                                </div>\n                            </td>\n                            <td *ngIf=\"item.is_blocked!=1\">\n                                <label class=\"cust-check-bx float-right\">\n                                    <input type=\"radio\" name=\"notary_id\" (click)=\"assignItem = item\">\n                                    <span class=\"checkmark\"></span>\n                                </label>\n                            </td>\n                        </tr>\n                        <tr *ngIf=\"assign?.items?.length==0\">\n                            <p class=\"show-not-found\">No CSR Buyer found.</p>\n                        </tr>\n                    </table>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

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
/* harmony import */ var src_app_lang_translate_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/lang/translate.service */ "./src/app/lang/translate.service.ts");
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
    function CsrBuyerComponent(admin, constant, route, spinner, leadsService, router, ts) {
        this.admin = admin;
        this.constant = constant;
        this.route = route;
        this.spinner = spinner;
        this.leadsService = leadsService;
        this.router = router;
        this.ts = ts;
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
        this.scrollbarOptions = { axis: 'y', theme: 'dark' };
    }
    CsrBuyerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.showSearchText = true;
        this.parameter.is_selected = false;
        this.parameter.keyword = '';
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        this.parameter.flag = 2;
        this.parameter.total = 0;
        this.parameter.count_flag = 1;
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
        this.resetDates();
        this.getListing();
        this.getCSRDashBoardData();
    };
    CsrBuyerComponent.prototype.changeFilter = function (key, value) {
        this.parameter[key] = value;
        this.getListing();
    };
    CsrBuyerComponent.prototype.changeCountFlag = function (flag) {
        this.parameter.count_flag = flag;
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
                    'name': 'Leads (Information filled)',
                    'value': parseInt(_this.dash.lead_information_filled, 10)
                },
                {
                    'name': 'Leads (With agent assigned)',
                    'value': parseInt(_this.dash.lead_broker_assigned, 10)
                },
                {
                    'name': 'Leads (Without agent assigned)',
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
            swal('Error', 'Please choose atleast one lead.', 'error');
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
        var input = {
            csr_buyer_id: this.assignItem.id,
            leads: leads_ids
        };
        this.spinner.show();
        this.admin.postDataApi('leads/bulkAssignBuyer', input).subscribe(function (r) {
            _this.spinner.hide();
            swal('Success', 'Assigned successfully', 'success');
            _this.closeAssignModel.nativeElement.click();
            _this.getListing();
        }, function (error) {
            _this.spinner.hide();
            _this.closeAssignModel.nativeElement.click();
            swal('Error', error.error.message, 'error');
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
            src_app_lang_translate_service__WEBPACK_IMPORTED_MODULE_7__["TranslateService"]])
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

module.exports = ""

/***/ }),

/***/ "./src/app/layout/leads/csr-closer/csr-closer-detail/csr-closer-detail.component.html":
/*!********************************************************************************************!*\
  !*** ./src/app/layout/leads/csr-closer/csr-closer-detail/csr-closer-detail.component.html ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n<div class=\"white-bg padding15\">\n    <div class=\"row\">\n        <div class=\"col-lg-3 col-md-12 col-sm-6 col-12\">\n            <div class=\"df-profile\">\n            <a routerLink=\"../\"><i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i></a>\n            \n            <img *ngIf=\"leadData?.user?.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\"\n                    [defaultImage]=\"leadData?.user?.image| img:'thumb'\" [lazyLoad]=\"leadData?.user?.image\">\n            <img *ngIf=\"!leadData?.user?.image\" src=\"assets/img/default_img.png\" alt=\"img\">\n    \n                    <div class=\"df-info\" *ngIf=\"leadData?.user\">\n                <p class=\"p14 text-ellipsis120\">{{leadData.user.name | titlecase}}</p>\n                <!-- <p class=\"p12\">Status: Open</p> -->\n                <p class=\"p12\">\n                    {{leadData?.user?.dial_code ? leadData?.user?.dial_code : leadData?.dial_code}}-{{leadData?.user?.phone ? leadData?.user?.phone : leadData?.phone}}\n                </p>\n            </div>\n            </div>\n        </div>\n        <div class=\"col-lg-7 col-md-12 col-sm-6 col-12\">\n            <div class=\"profile-list\">\n            <ul>\n                <li>\n                    <div class=\"df-info\">\n                        <p class=\"p14 marginB0\" *ngIf=\"leadData?.admin\">{{leadData.admin.name | titlecase}}</p>\n                        <p class=\"p12\">CSR Buyer</p>\n                    </div>\n                </li>\n                <li>\n                    <div class=\"df-info\" *ngIf=\"leadData?.broker\">\n                        <p class=\"p14 marginB0\">{{leadData.broker.name | titlecase}}</p>\n                        <p class=\"p12\">{{leadData?.broker?.is_external_agent==1 ? 'Outside Agent' : 'Inhouse Agent'}}</p>\n                    </div>\n                </li>\n                <li>\n                    <div class=\"df-info\" *ngIf=\"leadData?.closer\">\n                        <p class=\"p14 marginB0\">{{leadData.closer.name | titlecase}}</p>\n                        <p class=\"p12\">CSR Closure</p>\n                    </div>\n                </li>\n            </ul>\n            </div>\n        </div>\n        <div class=\"col-lg-2 col-md-12 col-sm-12 col-12\">\n            <div class=\"row\">\n                <div class=\"col-sm-12 btn-cont text-right\">\n                    <a *ngIf=\"leadData?.lead_status_closer!=1 &&\n                    (admin?.admin_acl['Closer Lead Management']?.can_update==1 || admin?.permissions?.can_csr_closer==1)\" (click)=\"markLeadClose()\" class=\"btn btn-fourth\" href=\"javascript://\">\n                        Close Lead\n                    </a>\n                    <a *ngIf=\"leadData?.lead_status_closer==1\" style=\"cursor: auto;\" class=\"btn btn-fourth\" href=\"javascript://\">\n                        Lead Closed\n                    </a>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class=\"spacer30\"></div>\n<div class=\"row\">\n    <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\">\n        <div class=\"white-bg padding30\">\n            <div class=\"row\">\n            <div class=\"col-md-6\">\n                <h6>Details</h6>\n            </div>\n            <!-- <div class=\"col-md-6\">\n                <div class=\"edit text-right\"><a href=\"javascript://\">Edit</a></div>\n            </div> -->\n            </div>\n            <div class=\"details-table\">\n            <table class=\"table\">\n                <tr>\n                    <td style=\"padding-left:0\"><label>Full Name</label></td>\n                    <td colspan=\"2\" *ngIf=\"leadData?.name\">{{leadData.user.name | titlecase}}</td>\n                </tr>\n                <tr>\n                    <td style=\"padding-left:0\"><label>Contact Number</label></td>\n                    <td colspan=\"2\" *ngIf=\"leadData?.phone\">{{leadData.user.dial_code ? leadData.user.dial_code : constant.dial_code}}-{{leadData.user.phone}}</td>\n                </tr>\n                <tr>\n                    <td style=\"padding-left:0\"><label>Email address</label></td>\n                    <td colspan=\"2\" *ngIf=\"leadData?.email\">{{leadData.user.email}}</td>\n                </tr>\n                <tr>\n                    <td style=\"padding-left:0\"><label>Interested In</label></td>\n                    <td *ngIf=\"leadData?.configuration\">\n                        <span *ngFor=\"let conf of leadData?.configuration; let ii=index\">\n                            <app-property-configuration *ngIf=\"conf\" [configuration]=\"conf\"></app-property-configuration>\n                            <span *ngIf=\"ii<leadData?.configuration?.length-1\"> | </span><br>\n                        </span>\n                        <span *ngIf=\"leadData?.configuration?.length==0\">NA</span>\n                    </td>\n                </tr>\n                <tr>\n                    <td style=\"padding-left:0\"><label><strong>Property Selected</strong></label></td>\n                    <td *ngIf=\"leadData?.selected_properties?.length!=0\">\n                        <p class=\"p14 marginB0\">\n                            <app-property-configuration *ngIf=\"leadData?.selected_properties[0]?.property?.configuration\" [configuration]=\"leadData?.selected_properties[0]?.property?.configuration\"></app-property-configuration>\n                        </p>\n                        <p title=\"Building\" class=\"p12 marginB0\"><strong>{{leadData?.selected_properties[0]?.property?.building?.name}}</strong></p>\n                        <p title=\"Developer\" class=\"p11\"><i>{{leadData?.selected_properties[0]?.property?.building?.developer?.name | titlecase}}</i></p>\n                        <p class=\"marginB0\" *ngIf=\"leadData?.selected_properties?.length!=0\">\n                            <a class=\"view-all-2\" href=\"javascript://\" (click)=\"viewPropertyDetails(leadData?.selected_properties[0])\"> View Property</a>\n                        </p>\n                    </td>\n                    <!-- <td *ngIf=\"leadData?.selected_properties?.length!=0\">\n                        <a class=\"view-all-2\" href=\"javascript://\" (click)=\"viewPropertyDetails(leadData?.selected_properties[0])\"> View Property</a>\n                    </td> -->\n                </tr>\n                \n                <!-- Notary Availabilities -->\n                <tr *ngIf=\"leadData?.sale_rent==1\">\n                    <td  style=\"padding-left:0\"><label><strong>Notary Availabilities</strong></label></td>\n                    <td colspan=\"2\" *ngIf=\"leadData?.selected_properties[0]?.selected_noatary && leadData?.selected_properties[0]?.selected_noatary[0]?.noatary_availability?.length!=0; else noAvailability3\">\n                        <p *ngFor=\"let na of leadData?.selected_properties[0]?.selected_noatary[0]?.noatary_availability; let m=index\" class=\"date\">\n                            <span *ngIf=\"m<2\">{{na.date_time | moment}}</span>\n                        </p>\n                        <span class=\"read-more\" *ngIf=\"leadData?.selected_properties[0]?.selected_noatary[0]?.noatary_availability.length>2\" data-toggle=\"modal\" data-target=\"#get-availability1\">Read more</span>\n                    </td>\n                    <ng-template #noAvailability3>\n                        <td colspan=\"2\"><p>No availability given by notary yet.</p></td>\n                    </ng-template>\n                </tr>\n\n                <!-- Meeting Schedule -->\n                <tr *ngIf=\"leadData?.sale_rent==1\">\n                    <td  style=\"padding-left:0\"><label><strong>Meeting Schedule</strong></label></td>\n                    <td colspan=\"2\" class=\"cursor-pointer\">\n                        <p class=\"date\" *ngIf=\"scheduleMeeting.appointment_date; else noAvailability4\" data-toggle=\"modal\" data-target=\"#get-availability2\">\n                            <span title=\"Reschedule meeting\">{{scheduleMeeting.appointment_date | moment}}</span>\n                        </p>\n                        <ng-template #noAvailability4>\n                            <p title=\"Schedule meeting\" data-toggle=\"modal\" data-target=\"#get-availability2\">Meeting not scheduled.</p>\n                        </ng-template>\n                    </td>\n                </tr>\n\n            </table>\n            </div>\n        </div>\n\n        <!-- notes start -->\n        <app-notes *ngIf=\"parameter?.lead_id\" [sent_as]=\"parameter.sent_as\" [lead_id]=\"parameter.lead_id\"></app-notes>\n        <!-- notes end -->\n\n        <!-- <div class=\"spacer15\"></div> -->\n        <div *ngIf=\"leadData?.sale_rent==1\" class=\"bank-assigned-now white-bg\">\n            <div class=\"row\">\n                <div class=\"col-md-6 col-sm-6 col-12 b-left\">\n                <p class=\"p13\" *ngIf=\"selectedProperties?.noataries && selectedProperties.noataries.length==0\">No Notary assigned yet </p>\n                \n                <!-- Assign notary -->\n                <a style=\"display:none;\" #showNotaries href=\"javascript://\" class=\"green green-color\" data-toggle=\"modal\" data-target=\"#notary-avail\">Assign Now</a>\n                <a *ngIf=\"selectedProperties?.noataries && selectedProperties.noataries.length==0 && (admin?.admin_acl['Closer Lead Management']?.can_update==1 || admin?.permissions?.can_csr_closer==1); else noNotaryPermission\"\n                    href=\"javascript://\" class=\"green-color green\" (click)=\"getNotaries(selectedProperties.property_id, '', 1)\">Assign Now</a>\n                \n                <ng-template *ngIf=\"selectedProperties?.noataries && selectedProperties.noataries.length==0\" #noNotaryPermission>\n                    <a class=\"green-color green\">Assign Now</a>\n                </ng-template>\n\n                <div class=\"d-flex\" *ngIf=\"selectedProperties?.noataries && selectedProperties.noataries.length!=0\">\n                    \n                    <!-- <img [src]=\"selectedProperties?.noataries && selectedProperties.noataries[0].image\" onerror='src=\"assets/img/house.png\"' alt=\"img\"> -->\n\n                    <img *ngIf=\"selectedProperties.noataries[0].image\" onerror='src=\"assets/img/house.png\"' alt=\"img\"\n                            [defaultImage]=\"selectedProperties.noataries[0].image| img:'thumb'\" [lazyLoad]=\"selectedProperties.noataries[0].image\">\n                    <img *ngIf=\"!selectedProperties.noataries[0].image\" src=\"assets/img/house.png\" alt=\"img\">\n                    \n                    <div class=\"bank-info\">\n                        <p title=\"Notary\" class=\"p14\">{{selectedProperties.noataries[0].name | titlecase}}</p>\n                        <p class=\"p11 marginB10\">{{selectedProperties.noataries[0].dial_code ? selectedProperties.noataries[0].dial_code : constant.dial_code}}-{{selectedProperties.noataries[0].phone}}</p>\n                        \n                        <!-- change notary -->\n                        <a href=\"javascript://\" #showNotaries style=\"display: none;\" data-toggle=\"modal\" data-target=\"#notary-avail\" class=\"green-color green\">Change</a>\n                        <a *ngIf=\"(admin?.admin_acl['Closer Lead Management']?.can_update==1 || admin?.permissions?.can_csr_closer==1); else noNotaryChangePermission\" href=\"javascript://\" class=\"green-color green\" (click)=\"getNotaries(selectedProperties.property_id, '', 1)\">Change</a>\n                        <ng-template #noNotaryChangePermission>\n                            <a href=\"javascript://\" class=\"green-color green\">Change</a>\n                        </ng-template>\n                    </div>\n                    </div>\n                </div>\n                <div class=\"col-md-6 col-sm-6 col-12 b-right\">\n                <p class=\"p13\" *ngIf=\"selectedProperties?.banks && selectedProperties.banks.length==0\">No Bank assigned yet </p>\n                \n                <!-- Assign bank -->\n                <a style=\"display:none;\" #showBanks href=\"javascript://\" class=\"green green-color\" data-toggle=\"modal\" data-target=\"#bank-listing\">Assign Now</a>\n                <a *ngIf=\"selectedProperties?.banks && selectedProperties.banks.length==0 && (admin?.admin_acl['Closer Lead Management']?.can_update==1 || admin?.permissions?.can_csr_closer==1); else noBankPermission\"\n                href=\"javascript://\" class=\"green-color green\" (click)=\"getBanks(selectedProperties.property_id, '', 1)\">Assign Now</a>\n                \n                <ng-template *ngIf=\"selectedProperties?.banks && selectedProperties.banks.length==0\" #noBankPermission>\n                    <a href=\"javascript://\" class=\"green-color green\">Assign Now</a>\n                </ng-template>\n\n                <div class=\"d-flex\" *ngIf=\"selectedProperties?.banks && selectedProperties.banks.length!=0\">\n                    \n                    <!-- <img [src]=\"selectedProperties?.banks && selectedProperties.banks[0].image\" onerror='src=\"assets/img/bank-building.png\"' alt=\"img\"> -->\n\n                    <img *ngIf=\"selectedProperties.banks[0].image\" onerror='src=\"assets/img/house.png\"' alt=\"img\"\n                            [defaultImage]=\"selectedProperties.banks[0].image| img:'thumb'\" [lazyLoad]=\"selectedProperties.banks[0].image\">\n                    <img *ngIf=\"!selectedProperties.banks[0].image\" src=\"assets/img/house.png\" alt=\"img\">\n\n                    <div class=\"bank-info\">\n                        <p title=\"Bank\" class=\"p14\">{{selectedProperties.banks[0].name | titlecase}}</p>\n                        <p class=\"p11 marginB10\">{{selectedProperties?.banks[0]?.branch ? selectedProperties?.banks[0]?.branch : 'NA'}}</p>\n                        \n                        <!-- change bank -->\n                        <a href=\"javascript://\" #showBanks style=\"display: none;\" data-toggle=\"modal\" data-target=\"#bank-listing\" class=\"green-color green\">Change</a>\n                        <a *ngIf=\"(admin?.admin_acl['Closer Lead Management']?.can_update==1 || admin?.permissions?.can_csr_closer==1); else noBankChangePermission\" href=\"javascript://\" class=\"green-color green\" (click)=\"getBanks(selectedProperties.property_id, '', 1)\">Change</a>\n                        <ng-template #noBankChangePermission>\n                            <a href=\"javascript://\" class=\"green-color green\">Change</a>\n                        </ng-template>\n                    </div>\n                </div>\n                </div>\n            </div>\n        </div>\n\n        <!-- <div class=\"spacer15\"></div> -->\n        <!-- *ngIf=\"leadData?.sale_rent==1\" -->\n        <div class=\"payment-status-table white-bg\">\n            <div class=\"page-title-2 marginB0 border-0\">\n                <div class=\"row\">\n                <div class=\"col-md-6 col-sm-6 col-12\">\n                    <h4>Payment Status</h4>\n                </div>\n                    <div class=\"col-md-6 col-sm-6 col-12\">\n                    <div class=\"grand-total\">${{selectedProperties.total_amount}}</div>\n                </div>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-12\">\n                <table class=\"table\">\n                    <tr>\n                        <td style=\"width:40%\"><label>Token Amount</label></td>\n                        <td style=\"width:40%\"><strong>${{selectedProperties.token_money}}</strong></td>\n                        <td class=\"text-right\" style=\"width:20%\">\n                            <div class=\"pending-status\">{{selectedProperties.status==1?'Paid':'Pending'}}</div>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td style=\"width:40%\"><label>Commission (in %)</label></td>\n                        <td style=\"width:40%\"><strong>{{selectedProperties.commision}}%</strong></td>\n                        <td style=\"width:20%\">&nbsp;</td>\n                    </tr>\n                    <tr>\n                        <td style=\"width:40%\">\n                            <label>Pending Amount</label>\n                            <small>(Full property)</small>\n                        </td>\n                        <td style=\"width:40%\">\n                            <strong *ngIf=\"!showInput && selectedProperties.pending_amount==null\">${{selectedProperties.total_amount - selectedProperties.token_money}}</strong>\n                            <strong *ngIf=\"!showInput && selectedProperties.pending_amount!=null\">${{selectedProperties.pending_amount}}</strong>\n                            <input style=\"width: 90%;\" [(ngModel)]=\"pen_amount\" *ngIf=\"showInput\" type=\"number\" value=\"{{selectedProperties.total_amount - selectedProperties.token_money}}\">\n                        </td>\n                        <td style=\"width:20%\">\n                            <a *ngIf=\"!showInput\" title=\"Edit Amount\" (click)=\"showInput=true\" class=\"green-color fontW500\" href=\"javascript://\">Edit</a>\n                            <a *ngIf=\"showInput\" title=\"Save Amount\" (click)=\"updatePropertyAmount()\" class=\"green-color fontW500\" href=\"javascript://\">Save</a>\n                            <!-- <button *ngIf=\"!showInput\" title=\"Edit Amount\" (click)=\"showInput=true\">\n                                <img src=\"assets/img/edit.png\" alt=\"img\">\n                            </button>\n                            <button *ngIf=\"showInput\" (click)=\"updatePropertyAmount()\">Save</button> -->\n                        </td>\n                    </tr>\n                </table>\n                </div>\n            </div>\n\n        </div>\n    </div>\n\n\n\n    <!-- chatting -->\n    <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\">\n        <!-- <div class=\"white-bg move-below\">\n            <div class=\"page-title-3 marginB0\">\n                <h4><i><img src=\"assets/img/chat-icon.png\" alt=\"img\"></i> Chat</h4>\n            </div>\n            <div class=\"cust-tabs-4\">\n                <app-chat-tabs *ngIf=\"leadData?.user\" [lead_id]=\"parameter.lead_id\" [sent_as]=\"parameter.sent_as\"\n                    [user_id]=\"parameter.user_id\" [admin_id]=\"parameter.admin_id\" [leadData]=\"leadData\">\n                </app-chat-tabs>\n            </div>\n        </div> -->\n        \n        <div class=\"white-bg move-below\">\n            <div class=\"page-title-3 marginB0\">\n                <h4><i><img src=\"assets/img/chat-icon.png\" alt=\"img\"></i> Chat</h4>\n            </div>\n            <div class=\"cust-tabs-4\">\n                <ul class=\"nav nav-tabs\">\n                <li class=\"nav-item\">\n                    <a [ngClass]=\"{'active':chat_admin_sent_as==constant.userType.user_buyer}\" (click)=\"getLeadConversation(constant.userType.user_buyer, true)\" class=\"nav-link\">Buyer</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a [ngClass]=\"{'active':chat_admin_sent_as==constant.userType.user_seller_dev}\" (click)=\"getLeadConversation(constant.userType.user_seller_dev, true)\" class=\"nav-link\">Seller</a>\n                </li>\n                <li class=\"nav-item\" *ngIf=\"selectedProperties.noataries && selectedProperties.noataries.length!=0 && leadData?.sale_rent==1\">\n                    <a [ngClass]=\"{'active':chat_admin_sent_as==constant.userType.notary}\" (click)=\"getLeadConversation(constant.userType.notary, true)\" class=\"nav-link\">Notary</a>\n                </li>\n                <li class=\"nav-item\" *ngIf=\"selectedProperties.banks && selectedProperties.banks.length!=0 && leadData?.sale_rent==1\">\n                    <a [ngClass]=\"{'active':chat_admin_sent_as==constant.userType.bank}\" (click)=\"getLeadConversation(constant.userType.bank, true)\" class=\"nav-link\">Bank</a>\n                </li>\n                </ul>\n                \n                <div class=\"tab-content\">\n                    <div class=\"chat-window white-bg\">\n                    <div class=\"chat-top\">\n                        <a href=\"javascript://\">\n                        <div class=\"profile\">\n                            <div class=\"fig-block\">\n                            \n                            <!-- <img [src]=\"chat_admin?.image\" onerror=\"this.src='assets/img/default_img.png'\" alt=\"img\" /> -->\n                            <img *ngIf=\"chat_admin?.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\"\n                                    [defaultImage]=\"chat_admin?.image| img:'thumb'\" [lazyLoad]=\"chat_admin?.image\">\n                            <img *ngIf=\"!chat_admin?.image\" src=\"assets/img/default_img.png\" alt=\"img\">\n                            \n                            </div>\n                            <div class=\"profile-info\">\n                            <h6>{{chat_admin?.name | titlecase}}</h6>\n                            <p *ngIf=\"chat_admin_sent_as == 3\" class=\"p12\">CSR Closure</p>\n                            <p *ngIf=\"chat_admin_sent_as == 6\" class=\"p12\">Notary</p>\n                            <p *ngIf=\"chat_admin_sent_as == 5\" class=\"p12\">Bank</p>\n                            </div>\n                        </div>\n                        </a>\n                    </div>\n                    <div malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\" class=\"chat-area scrollbox\" #chatWin>\n                        <div *ngFor=\"let m of messages; let i=index\" [ngClass]=\"m.conversation_user.admin_id == parameter.admin_id ? 'chat-user-one' :'chat-user-two'\" class=\"chat-user\">\n                            <p *ngIf=\"m.message_type == 1\" style=\"word-wrap: break-word;\">\n                                <span>{{m.message}}</span>\n                            </p>\n\n                            <a *ngIf=\"m.message_type == 2\" href=\"{{m.image}}\" data-lightbox=\"image\">\n                                <span *ngIf=\"!m.loading\">\n                                    <img class=\"ui bordered small image\" src=\"{{m.image}}\">\n                                </span>\n                                <span *ngIf=\"m.loading\" class=\"m-loader\">\n                                    <img src=\"assets/img/loading_image_1.gif\">\n                                </span>\n                            </a>\n                            \n                            <div class=\"chat-vid\" *ngIf=\"m.message_type == 3 && !m.play\">\n                                <span>\n                                    <div *ngIf=\"m.loading\" class=\"loaderr\"></div>\n                                    <img *ngIf=\"m.image\" class=\"ui bordered small image\" src=\"{{m.image}}\">\n                                    <img *ngIf=\"!m.loading\" class=\"vid-icon\" (click)=\"playVideo(i)\" src=\"assets/img/play-button.png\" />\n                                    <div class=\"clearfix\"></div>\n                                </span>\n                            </div>\n                            <video *ngIf=\"m.message_type == 3 && m.play\" src=\"{{m.video}}\" autoplay type=\"video/mp4\" controls></video>\n                            \n                            <div class=\"chat-shared-file\" *ngIf=\"m.message_type == 4\">\n                                <p *ngIf=\"m.loading\" class=\"m-loader\">\n                                    <img class=\"text-message\" src=\"assets/img/loading-p.gif\">\n                                </p>\n                                <span *ngIf=\"!m.loading\">\n                                    <a href=\"javascript://\" target=\"_blank\" href=\"{{m.attachment}}\"><span>{{m.attachment_name}}</span></a>\n                                </span>\n                            </div>\n\n                            <a *ngIf=\"m.message_type == 5\" href=\"{{m.property_url}}\" target=\"_blank\" title=\"Property Image\" >\n                                <span>\n                                    <img class=\"ui bordered small image\" src=\"{{m.image}}\">\n                                    <div *ngIf=\"m.loading\" class=\"loaderr\"></div>\n                                </span>\n                                <h5>{{m.message}}</h5>\n                            </a>\n            \n                            <span class=\"time\" *ngIf=\"m.id\">{{m.updated_at| moment}}</span>\n                            <span class=\"time\" *ngIf=\"!m.id\">{{m.updated_at|date:'h:mm a'|lowercase}}, {{m.updated_at|date: 'MMM d y'}}</span>\n                            \n                        </div>                \n                    </div>\n                                            \n                    <div style=\"position: absolute; z-index: 1; margin: 0px; padding: 0px; other: block; left: 581px; top: 91px;\"><div class=\"enscroll-track track3\" style=\"position: relative; height: 367px;\"><a href=\"\" class=\"handle3\" style=\"position: absolute; z-index: 1; height: 199.244px; top: 0px;\"><div class=\"top\"></div><div class=\"bottom\"></div></a></div></div>\n    \n                    <div class=\"chat-text\">\n                        <div class=\"dropdown attach-items\">\n                            <a *ngIf=\"(admin?.admin_acl['Closer Lead Management']?.can_update==1 || admin?.permissions?.can_csr_closer==1); else noPermissiom\" href=\"javascript://\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" #optionsButton>\n                                <i class=\"fa fa-paperclip\" aria-hidden=\"true\"></i>\n                            </a>\n\n                            <ng-template #noPermissiom>\n                                <a><i class=\"fa fa-paperclip\" aria-hidden=\"true\"></i></a>\n                            </ng-template>\n                            <div class=\"dropdown-menu\">\n                            <div class=\"dropdown-item\">\n                                <input type=\"file\" name=\"image\" accept=\"image/*\" (change)=\"onSelectFile('image', $event)\">\n                                <i class=\"fa fa-camera\" aria-hidden=\"true\"></i>\n                                <span>Photo</span>\n                            </div>\n                            <a class=\"dropdown-item\"> \n                                <input type=\"file\" name=\"video1\" accept=\"video/mp4,video/x-m4v,video/*\" (change)=\"showCanvas($event)\">\n                                <i class=\"fa fa-video-camera\" aria-hidden=\"true\"></i>\n                                <span>Video</span>\n                            </a>\n                            <a class=\"dropdown-item\">    \n                                <input type=\"file\" name=\"attachment\" accept=\".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf\" (change)=\"saveAttachment($event)\">\n                                <i class=\"fa fa-file\" aria-hidden=\"true\"></i>\n                                <span>Document</span>\n                            </a>\n                            <a class=\"dropdown-item cursor-pointer\" (click)=\"blockGetProperty.showModal()\">    \n                                <i class=\"fa fa-file\" aria-hidden=\"true\"></i>\n                                <span>Property</span>\n                            </a>\n                            </div>\n                        </div>\n                        <input id=\"message\" #msgInput autocomplete=\"off\" [(ngModel)]=\"textMessage\" (keyup.enter)=\"setText()\" class=\"chat-input\" type=\"text\" name=\"message\" placeholder=\"Type your message here …\">\n                        <video style=\"width: 100%; height: 100%;\" src=\"{{videoSrc}}\" class=\"video55\" autoplay type=\"video/mp4\" controls></video>\n                        <canvas style=\"display: none;\" width=\"800\" height=\"600\" id=\"canvas\"></canvas>\n    \n                        <button [disabled]=\"(admin?.admin_acl['Closer Lead Management']?.can_update==0 || admin?.permissions?.can_csr_closer==0)\" (click)=\"setText()\" class=\"btn\">Send</button>\n                        \n                    </div>\n                </div>\n    \n            </div>\n        </div>\n    </div>\n\n\n<app-block-get-property #blockGetProperty (itemSelect)=\"sendProperty($event)\"></app-block-get-property>\n\n\n    <div class=\"clearfix\"></div>\n    <div *ngIf=\"leadData?.sale_rent==1\" class=\"upload-document-block white-bg\">\n        <div class=\"page-title-2 border-0\">\n            <div class=\"row\">\n                <div class=\"col-9\">\n                <h4>Documents</h4>\n                </div>\n                <div class=\"col-3\">\n                <a *ngIf=\"(admin?.admin_acl['Closer Lead Management']?.can_update==1 || admin?.permissions?.can_csr_closer==1); else noDocumentPermission\" class=\"view pull-right\" href=\"javascript://\" (click)=\"updateDocumentChecklist()\">Save</a>\n                <ng-template #noDocumentPermission>\n                    <a class=\"view pull-right\" href=\"javascript://\">Save</a>\n                </ng-template>\n                </div>\n            </div>\n            <table class=\"table\">\n                <tr *ngFor=\"let document of selectedProperties.allDocuments; let i=index\">\n                <td>\n                    <label class=\"cust-check-bx\">{{document.name}}\n                    <input type=\"checkbox\" (click)=\"setValue(i)\" [checked]=\"document.is_selected == 1 ? 'checked' : ''\" name=\"document\">\n                    <span class=\"checkmark\"></span>\n                    </label>\n                </td>\n                </tr>\n            </table>\n        </div>\n    </div>\n    <div *ngIf=\"leadData?.sale_rent==1\" class=\"all-document-block white-bg\">\n        <div class=\"page-title-2 border-0\">\n        <div class=\"row\">\n        <div class=\"col-9\">\n            <h4>All Documents</h4>\n            <p class=\"p11 marginB0\">From both seller and buyer</p>\n\n            </div>\n            <div class=\"col-3 text-right\">\n                <a *ngIf=\"selectedProperties?.uploaded_documents?.length==0\" (click)=\"noDocumentUploaded()\" class=\"view\" href=\"javascript://\" >View</a>\n                <a *ngIf=\"selectedProperties?.uploaded_documents?.length!=0\" class=\"view\" data-toggle=\"modal\" data-target=\"#uploaded-documents\" href=\"javascript://\" >View</a>\n            </div>\n        </div>\n        </div>\n    </div>\n    </div>\n</div>\n</div>\n\n\n<div class=\"modal\" id=\"uploaded-documents\">\n    <div class=\"modal-dialog \">\n    <div class=\"modal-content notary-avail\">\n        <!-- <div class=\"modal-header modal-header-new\"> -->\n            <div class=\"modal-header modal-header-new\">\n            <h4 class=\"modal-title\">Uploaded Documents</h4>\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n        </div>\n        <div class=\"modal-body\">\n            <table class=\"table\">\n                <tr *ngFor=\"let upDocument of selectedProperties.uploaded_documents\">\n                <td>\n                    <div class=\"n-avail-profile\">\n                        <div class=\"n-avail-info\">\n                            <p class=\"p14 marginB0\" *ngIf=\"upDocument.attachment_name\">{{upDocument.attachment_name}}</p>\n                            <!-- <p class=\"p12\" *ngIf=\"!upDocument.attachment_name\">{{upDocument.attachment.substring(upDocument.attachment.lastIndexOf('/'), upDocument.attachment.length)}}</p> -->\n                            <p class=\"p14 marginB0\" *ngIf=\"!upDocument.attachment_name\">No name</p>\n                        </div>\n                    </div>\n                </td>\n                <td class=\"text-right\">\n                    <a class=\"green-color\" target=\"_blank\" href=\"{{upDocument.attachment}}\">Download</a>\n                </td>\n                </tr>\n            </table>\n        </div>\n    </div>\n    </div>\n</div>\n\n<div class=\"modal\" id=\"bank-listing\">\n    <div class=\"modal-dialog \">\n    <div class=\"modal-content notary-avail\">\n        <div class=\"modal-header popup-header\">\n            <h4 class=\"modal-title\">Banks available</h4>\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #hideBanks>&times;</button>\n        </div>\n        <div class=\"modal-body\">\n\n            <div class=\"spacer30\"></div>\n            <div class=\"row\">\n                <div class=\"col-md-8 col-6\">\n                    <input style=\"max-width:200px\" (keyup.enter)=\"getBanks('', keyword, 2)\" [(ngModel)]=\"keyword\" class=\"form-control\" type=\"text\" name=\"keyword\" placeholder=\"Search\">\n                </div>\n                <div class=\"col-md-4 col-5 btn-cont\">\n                    <a class=\"btn btn-primary pull-right\" href=\"javascript://\" (click)=\"getBanks('', keyword, 2)\">Search</a>\n                </div>\n            </div>\n            <div class=\"spacer30\"></div>\n            <div class=\"modal-data\">\n                <table class=\"table\">\n                    <tr *ngFor=\"let bank of parameter.banks\">\n                    <td>\n                        <div class=\"n-avail-profile\">\n                            <!-- <img [src]=\"bank.image\" onerror='src=\"assets/img/bank.png\"' alt=\"img\"> -->\n                            \n                            <img *ngIf=\"bank.image\" onerror='src=\"assets/img/bank.png\"' alt=\"img\"\n                                    [defaultImage]=\"bank.image| img:'thumb'\" [lazyLoad]=\"bank.image\">\n                            <img *ngIf=\"!bank.image\" src=\"assets/img/bank.png\" alt=\"img\">\n\n                            <div class=\"n-avail-info\">\n                                <p class=\"p12\">{{bank.name | titlecase}}</p>\n                                <p class=\"p10\">Branch : {{bank.branch ? bank.branch : 'NA'}}</p>\n                            </div>\n                        </div>\n                    </td>\n                    <td>\n                        <label class=\"cust-check-bx float-right\">\n                        <input type=\"radio\" name=\"bank_id\" (click)=\"assignBank(bank)\">\n                        <span class=\"checkmark\"></span>\n                        </label>\n                    </td>\n                    </tr>\n                    <div  *ngIf=\"parameter.banks?.length==0\" class=\"write-note white-bg\">\n                        <p class=\"show-not-found\">\n                            No bank is available.\n                        </p>\n                    </div>\n                </table>\n            </div>\n        </div>\n    </div>\n    </div>\n</div>\n\n<div class=\"modal\" id=\"notary-avail\">\n    <div class=\"modal-dialog \">\n        <div class=\"modal-content notary-avail\">\n            <div class=\"modal-header popup-header\">\n            <h4 class=\"modal-title\">Notaries available</h4>\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #hideNotaries>&times;</button>\n            </div>\n            <div class=\"modal-body\">\n                \n               <div class=\"spacer30\"></div>\n                <div class=\"row\">\n                    <div class=\"col-md-8 col-6\">\n                        <input style=\"max-width:200px\" (keyup.enter)=\"getNotaries('', keyword, 2)\" [(ngModel)]=\"keyword\" class=\"form-control\" type=\"text\" name=\"keyword\" placeholder=\"Search\">\n                    </div>\n                    <div class=\"col-md-4 col-5 btn-cont\">\n                        <a class=\"btn btn-primary pull-right\" href=\"javascript://\" (click)=\"getNotaries('', keyword, 2)\">Search</a>\n                    </div>\n                </div>\n                <div class=\"spacer30\"></div>\n                <div class=\"modal-data\">\n                    <table class=\"table\">\n                        <tr *ngFor=\"let item of parameter.items\">\n                            <td>\n                                <div class=\"n-avail-profile\">\n                                <!-- <img [src]=\"item.image\" onerror='src=\"assets/img/house.png\"' alt=\"img\"> -->\n                                \n                                <img *ngIf=\"item.image\" onerror='src=\"assets/img/house.png\"' alt=\"img\"\n                                    [defaultImage]=\"item.image| img:'thumb'\" [lazyLoad]=\"item.image\">\n                                <img *ngIf=\"!item.image\" src=\"assets/img/house.png\" alt=\"img\">\n                                \n                                <div class=\"n-avail-info\">\n                                    <p class=\"p12\">{{item.name | titlecase}}</p>\n                                    <p class=\"p10\">Phone : {{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}</p>\n                                </div>\n                                </div>\n                            </td>\n                            <td>\n                                <label class=\"cust-check-bx float-right\">\n                                    <input type=\"radio\" name=\"notary_id\" (click)=\"assignNoatary(item)\">\n                                    <span class=\"checkmark\"></span>\n                                </label>\n                            </td>\n                        </tr>\n                        <div  *ngIf=\"parameter?.items?.length==0\" class=\"write-note white-bg\">\n                            <p class=\"show-not-found\">\n                                No notary is available.\n                            </p>\n                        </div>\n                    </table>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n\n<div class=\"modal animated\" id=\"get-availability1\">\n    <div class=\"modal-dialog fadeIndown\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header modal-header-new\">\n                <h4 class=\"modal-title\">Notary Availabilities</h4>\n                <button type=\"button\" style=\"display: none;\" class=\"close\" data-dismiss=\"modal\" #modalClose1>&times;</button>\n                <button type=\"button\" class=\"close\" (click)=\"closeModal1()\">&times;</button>\n            </div>\n    \n            <div class=\"modal-body modal-body-new\">\n                <div class=\"row\" *ngIf=\"leadData?.selected_properties && leadData?.selected_properties[0]?.selected_noatary\">\n                    <div class=\"col-6\" *ngFor=\"let d of leadData?.selected_properties[0]?.selected_noatary[0]?.noatary_availability; let j=index\">\n                        <label class=\"notary-ava\">{{d.date_time | moment}}</label>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n\n<div class=\"modal animated\" id=\"get-availability2\">\n    <div class=\"modal-dialog fadeIndown\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header modal-header-new\">\n                <h4 class=\"modal-title\">Schedule Meeting</h4>\n                <button type=\"button\" style=\"display: none;\" class=\"close\" data-dismiss=\"modal\" #modalClose2>&times;</button>\n                <button type=\"button\" class=\"close\" (click)=\"closeModal2()\">&times;</button>\n            </div>\n    \n            <div class=\"modal-body modal-body-new\">\n                <table class=\"table\" *ngIf=\"leadData?.selected_properties[0]?.selected_noatary\">\n                    <tr *ngFor=\"let d of leadData?.selected_properties[0]?.selected_noatary[0]?.noatary_availability; let j=index\">\n                        <td>\n                            <label class=\"notary-ava\">{{d.date_time | moment}}</label>\n                        </td>\n                        <td>\n                            <label class=\"cust-check-bx float-right\">\n                                <input [checked]=\"d.date_time==scheduleMeeting.appointment_date\" type=\"radio\" name=\"notary_id\" (click)=\"addAppointment(d)\">\n                                <span class=\"checkmark\"></span>\n                            </label>\n                        </td>\n                    </tr>\n                    <div *ngIf=\"leadData?.selected_properties[0]?.selected_noatary[0]?.noatary_availability==null\" class=\"write-note white-bg\">\n                        <p class=\"show-not-found\">\n                            No availability given by notary yet.\n                        </p>\n                    </div>\n                </table>\n            </div>\n    \n        </div>\n    </div>\n</div>"

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
    function CsrCloserDetailComponent(route, router, admin, cs, constant, selectedProperties, scheduleMeeting, bankModel, notaryModel, model, element, spinner, leadsService) {
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
        swal({
            html: this.constant.title.ARE_YOU_SURE + '<br>' + 'You want to assign this notary?',
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
                    swal('Success', 'Notary is assigned successfully.', 'success');
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
        swal({
            html: this.constant.title.ARE_YOU_SURE + '<br>' + 'You want to assign this bank?',
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
                    swal('Success', 'Bank is assigned successfully.', 'success');
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
        var ids = this.selectedProperties.allDocuments.filter(function (d) { return d.is_selected === 1; });
        var documents_ids = ids.map(function (d) { return d.id; });
        var input = {
            lead_id: this.parameter.lead_id,
            property_id: this.selectedProperties.property_id,
            documents: documents_ids
        };
        this.admin.postDataApi('leads/updateDocumentChecklist', input).subscribe(function (r) {
            swal('Success', 'Updated successfully.', 'success');
        });
    };
    CsrCloserDetailComponent.prototype.noDocumentUploaded = function () {
        swal('Error', 'No document uploaded yet.', 'error');
    };
    CsrCloserDetailComponent.prototype.viewPropertyDetails = function (property) {
        this.cs.setPropertyDetails(property);
        this.router.navigate(['/dashboard/properties/details/' + property.property_id]);
    };
    CsrCloserDetailComponent.prototype.markLeadClose = function () {
        var _this = this;
        swal({
            html: this.constant.title.ARE_YOU_SURE + '<br>' + 'You want to close this lead?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.value) {
                _this.admin.postDataApi('leads/closer-mark-lead-closed', { lead_id: _this.parameter.lead_id }).subscribe(function (r) {
                    _this.leadData.lead_status_closer = 1;
                    swal('Success', 'Lead closed successfully.', 'success');
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
            swal('Error', this.constant.errorMsg.FILE_SIZE_EXCEEDS, 'error');
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
            swal('Error', this.constant.errorMsg.FILE_SIZE_EXCEEDS, 'error');
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
            swal('Error', this.constant.errorMsg.FILE_SIZE_EXCEEDS, 'error');
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
            swal('Error', 'Please enter some text.', 'error');
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
        var file = event.target.files[0];
        var input = new FormData();
        input.append('lead_id', this.params.lead_id);
        input.append('property_id', this.params.property_id);
        input.append('attachment', file);
        input.append('attachment_name', file.name);
        this.admin.postDataApi('uploadDealDocument', input).subscribe(function (r) {
            swal('Success', 'Successfully uploaded the document', 'success');
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
        model.message = property.name + ' with ';
        if (property.configuration.bedroom) {
            model.message += property.configuration.bedroom + ' Bed ';
        }
        if (property.configuration.bathroom) {
            model.message += this.constant.middleDot + property.configuration.bathroom + ' Bath';
        }
        if (property.configuration.half_bathroom) {
            model.message += this.constant.middleDot + property.configuration.half_bathroom + ' Half Bath';
        }
        if (property.property_type.name) {
            model.message += this.constant.middleDot + property.property_type.name;
        }
        model.message += ' in ' + property.building.name;
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
        swal({
            html: this.constant.title.ARE_YOU_SURE + '<br>' + 'You want to schedule this time for meeting?',
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
                    swal('Success', 'Meeting scheduled successfully.', 'success');
                });
            }
        });
    };
    CsrCloserDetailComponent.prototype.updatePropertyAmount = function () {
        var _this = this;
        if (this.pen_amount > this.selectedProperties.total_amount && this.pen_amount < 0) {
            swal('Error', 'Incorrect amount entered', 'error');
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
            swal('Success', 'Amount updated successfully.', 'success');
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
            src_app_services_leads_service__WEBPACK_IMPORTED_MODULE_9__["LeadsService"]])
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

module.exports = ""

/***/ }),

/***/ "./src/app/layout/leads/csr-closer/csr-closer.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/layout/leads/csr-closer/csr-closer.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container-fluid\">\n    <div class=\"row\">\n        <div class=\"col-md-4\">\n            <div class=\"form-group\">\n                <p class=\"p16\">Manage CSR Closure's Lead</p>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-md-4\">\n            <div class=\"form-group\" *ngIf=\"admin?.admin_acl['Closer Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n                <div class=\"d-flex\">\n                <!-- <button (click)=\"removeCsrUser()\" class=\"all-btn\">All</button> -->\n                <div class=\"autocomplete\">\n                <input placeholder=\"Search CSR Closure\" style=\"max-width:200px\" list=\"amenities\" [(ngModel)]=\"parameter.keyword\" (input)=\"getCsrListing()\" class=\"form-control\" type=\"text\" name=\"keyword\" (focusout)=\"closeCsrListing()\">\n                <div id=\"myInputautocomplete-list\" class=\"autocomplete-items\">\n                    <div *ngFor=\"let item of users\" (click)=\"selectCsrUser(item)\">{{item.email}}</div>\n                </div>\n                </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-md-8 col-12\">\n            <div class=\"cust-tabs-2\">\n                <ul class=\"nav nav-tabs\">\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==1}\" (click)=\"changeFlag(1)\" >This Week</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==2}\" (click)=\"changeFlag(2)\" >This Month</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==3}\" (click)=\"changeFlag(3)\" >Last Month</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==4}\" (click)=\"changeFlag(4)\" >Lifetime</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==5}\" (click)=\"parameter.flag=5\" >Custom</a>\n                </li>\n                </ul>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-12\">\n            <div *ngIf=\"parameter.flag == 5\" class=\"row\">\n                <div class=\"offset-lg-7\"></div>\n                <div class=\"col-lg-2 col-md-2 col-sm-5 col-5\">\n                <div class=\"form-group marginB0\">\n                    <label>From:</label>\n                    <p-calendar showIcon=\"true\" [(ngModel)]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n                </div>\n                </div>\n                <div class=\"col-lg-2 col-md-2 col-sm-5 col-5\">\n                <div class=\"form-group marginB0\">\n                    <label>To:</label>\n                    <p-calendar showIcon=\"true\" [(ngModel)]=\"parameter.max\" [minDate]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n                </div>\n                </div>\n                <div class=\"col-lg-1 col-md-2 col-sm-2 col-6\">\n                <div class=\"form-group btn-cont\">\n                    <label class=\"addMT3\">&nbsp;</label>\n                    <button class=\"btn btn-calender\" href=\"javascript://\" (click)=\"getListing(); getCSRDashBoardData();\"\n                        [disabled]=\"!parameter.min || !parameter.max\">Apply</button>\n                </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"listingResults\" >\n      <div class=\"row\" *ngIf=\"admin?.admin_acl['Closer Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n            <div class=\"col-md-2\">\n                <div class=\"form-group\">\n                <label>Country</label>\n                <select class=\"form-control\" (change)=\"onCountryChange($event.target.value)\">\n                    <option value=\"0\">All</option>\n                    <option *ngFor=\"let item of location.countries\" [value]=\"item.id\">{{item.name}}</option>\n                </select>\n                </div>\n            </div>\n            <div class=\"col-md-2\">\n                <div class=\"form-group\">\n                <label>State</label>\n                <select class=\"form-control\" (change)=\"onStateChange($event.target.value)\">\n                    <option value=\"0\">All</option>\n                    <option *ngFor=\"let item of location.states\" [value]=\"item.id\">{{item.name}}</option>\n                </select>\n                </div>\n            </div>\n            <div class=\"col-md-2\">\n                <div class=\"form-group\">\n                <label>City</label>\n                    <select class=\"form-control\" (change)=\"onCityChange($event.target.value)\">\n                    <option value=\"0\">All</option>\n                    <option *ngFor=\"let item of location.cities\" [value]=\"item.id\">{{item.name}}</option>\n                    </select>\n                </div>\n            </div>\n    \n            <div class=\"col-md-2\">\n                <div class=\"form-group\">\n                <label>Locality</label>\n                <select class=\"form-control\" (change)=\"onLocalityChange($event.target.value)\">\n                    <option value=\"0\">All</option>\n                    <option *ngFor=\"let item of location.localities\" [value]=\"item.id\">{{item.name}}</option>\n                </select>\n                </div>\n            </div>\n    \n            <div class=\"col-md-2\">\n                <div class=\"form-group btn-cont\">\n                <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n                <button type=\"button\" (click)=\"getListing(); getCSRDashBoardData();\" class=\"btn btn-primary-new width100P\">Apply</button>\n                </div>\n            </div>\n    \n            <div class=\"col-md-2\">\n                <div class=\"form-group btn-cont\">\n                <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n                <button type=\"button\" (click)=\"resetFilters()\" class=\"btn btn-primary-new width100P\">Reset</button>\n                </div>\n            </div>\n      </div>\n      <div *ngIf=\"selectedUser as item\" class=\"sigle-row-table\">\n            <table class=\"table table-striped\">\n            <tbody><tr>\n                <td><img class=\"rounded-circle\" [src]=\"item.image| img:'small'\" onerror='this.src=\"assets/img/default_img.png\"' alt=\"img\"></td>\n                <td class=\"text-left\">\n                    <span class=\"name\">{{item.name | titlecase}}</span>\n                </td>\n                <td class=\"text-left\">\n                    {{item.phone}}\n                </td>\n                <td class=\"text-left\">\n                    {{item.email}}\n                </td>\n                <td>\n                    <a (click)=\"removeCsrUser()\" href=\"javascript://\" class=\"icon-block edit-icon\"><img src=\"assets/img/remove-icon.png\" alt=\"remove\" title=\"remove\" /></a>\n                </td>\n                </tr>\n            </tbody>\n            </table>\n      </div>\n      <div class=\"row\">\n         <div class=\"col-lg-8 col-md-12 col-sm-12 col-12\">\n            <div class=\"info-box all-leads\">\n               <div class=\"row\">\n                  <div class=\"col-md-6 col-sm-6 col-12 bdr-right\" [ngClass]=\"{'active':parameter.count_flag == '1'}\" (click)=\"changeCountFlag(1)\">\n                     <div class=\"one-row \">\n                        <div class=\"o-block\">\n                           <h5>All Leads</h5>\n                           <small>Total</small>\n                        </div>\n                        <div class=\"o-block\">\n                           <a class=\"view-all\" href=\"javascript://\">View All</a>\n                           <h4>{{dash?.lead_total}}</h4>\n                        </div>\n                     </div>\n                  </div>\n                  <div class=\"col-md-6 col-sm-6 col-12 paddingL0\">\n                    <div class=\"two-block\">\n                        <div class=\"d-flex\">\n                            <div class=\"f-block\" [ngClass]=\"{'active':parameter.count_flag == '2'}\" (click)=\"changeCountFlag(2)\">\n                                <h5>Notary</h5>\n                                <small>Not Assigned</small>\n                                <h3>{{dash?.noatary_pending}}</h3>\n                            </div>\n                            <div class=\"f-block\" [ngClass]=\"{'active':parameter.count_flag == '3'}\" (click)=\"changeCountFlag(3)\">\n                                <h5>Bank</h5>\n                                <small>Not Assigned</small>\n                                <h3>{{dash?.bank_pending}}</h3>\n                            </div>\n                        </div>\n                        \n                        </div>\n                  </div>\n               </div>\n            </div>\n            <div class=\"info-box all-leads\">\n               <div class=\"row\">\n                  <div class=\"col-md-6 col-sm-6 col-12 bdr-right\" [ngClass]=\"{'active':parameter.count_flag == '4'}\" (click)=\"changeCountFlag(4)\">\n                     <div class=\"one-row \">\n                        <div class=\"o-block\">\n                           <h5>Leads</h5>\n                           <small>Open</small>\n                        </div>\n                        <div class=\"o-block\">\n                           <a class=\"view-all\" href=\"javascript://\">View All</a>\n                           <h4>{{dash?.lead_open}}</h4>\n                        </div>\n                     </div>\n                  </div>\n                  <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == '5'}\" (click)=\"changeCountFlag(5)\">\n                     <div class=\"one-row\">\n                        <div class=\"o-block\">\n                           <h5>Leads</h5>\n                           <small>Closed</small>\n                        </div>\n                        <div class=\"o-block\">\n                           <a class=\"view-all\" href=\"javascript://\">View All</a>\n                           <h4>{{dash?.lead_closed}}</h4>\n                        </div>\n                     </div>\n                  </div>\n               </div>\n            </div>\n    \n         </div>\n         <div class=\"col-lg-4 col-md-12 col-sm-12 col-12\">\n            <div class=\"chat-msg all-leads\" style=\"padding:0px\">\n                    <div class=\"padding20\" *ngIf=\"dash.lead_total == 0\">No records found</div>\n                    <ngx-charts-pie-chart [results]=\"chartView\"></ngx-charts-pie-chart>\n            </div>\n         </div>\n      </div>\n      <div class=\"row\">\n         <div class=\"col-12\">\n            <div class=\"spacer40\"></div>\n         </div>\n    \n      </div>\n      <div class=\"row\">\n         <div class=\"col-lg-6 col-md-6 col-6\">\n            <div class=\"title-group\">\n               <h5>Leads \n                <span *ngIf=\"parameter.count_flag == 1\">(Total)</span>\n                <span *ngIf=\"parameter.count_flag == 2\">(Notary Not Assigned)</span>\n                <span *ngIf=\"parameter.count_flag == 3\">(Bank Not Assigned)</span>\n                <span *ngIf=\"parameter.count_flag == 4\">(Open)</span>\n                <span *ngIf=\"parameter.count_flag == 5\">(Closed)</span>\n               </h5>\n               <p>\n                   <!-- Showing {{parameter.page}} out of {{parameter.total_count}} -->\n                </p>\n            </div>\n         </div>\n         <!-- only inhouse users can do this -->\n         <div class=\"col-lg-6 col-md-6 col-5\" *ngIf=\"admin?.admin_acl['Closer Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n            <div class=\"add-new text-right\">\n                <a class=\"btn\" (click)=\"bulkAssign()\" href=\"javascript://\">Bulk Re-assign</a>\n            </div>\n        </div>\n      </div>\n      <div class=\"white-bg\">\n         <div class=\"tabel-section\">\n            <div class=\"table-responsive\">\n                <table class=\"table table-striped\">\n                    <tr>\n                <!-- only inhouse users can do this -->\n                    <th *ngIf=\"admin?.admin_acl['Closer Lead Management']?.can_read==1 && !this.parameter.assignee_id\" style=\"width:6%\">\n                        <div class=\"table-search\">\n                            <label>All</label>\n                            <div>\n                                <label class=\"cust-check-bx\" >\n                                    <input class=\"width1\" type=\"checkbox\" (click)=\"selectAll(parameter.is_selected)\" name=\"document\">\n                                    <span class=\"checkmark\"></span>\n                                </label>\n                            </div>\n                        </div>\n                    </th>\n                    <!-- <th style=\"width:6%\">&nbsp;</th> -->\n                    <th style=\"width:6%\">\n                        <div class=\"table-search\">\n                            <label>Image</label>\n                            <div class=\"searh-3\">\n                                <!-- <input type=\"Search here\" name=\"name\" [(ngModel)]=\"parameter.name\" (keyup.enter)=\"getListing()\">\n                                <button *ngIf=\"parameter.name\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button> -->\n                            </div>\n                        </div>\n                    </th>\n                    <th style=\"width:18%\">\n                        <div class=\"table-search\">\n                            <label>Name</label>\n                            <div class=\"searh-3\">\n                                <input autocomplete=\"off\" type=\"text\" [(ngModel)]=\"parameter.name\" (keyup.enter)=\"changeFilter('name',$event.target.value)\" name=\"\">\n                                <button *ngIf=\"parameter.name\" (click)=\"changeFilter('name', parameter.name)\"><i class=\"fa fa-search\"></i></button>\n                            </div>\n                        </div>\n                    </th>\n                    <th style=\"width:20%; text-align:left;\">\n                        <div class=\"table-search\">\n                            <label>Contact Number</label>\n                            <div class=\"searh-3\">\n                                <input autocomplete=\"off\" type=\"text\" [(ngModel)]=\"parameter.phone\" (keyup.enter)=\"changeFilter('phone',$event.target.value)\" name=\"\">\n                                <button *ngIf=\"parameter.phone\" (click)=\"changeFilter('phone', parameter.phone)\"><i class=\"fa fa-search\"></i></button>\n                            </div>\n                        </div>\n                    </th>\n                    <th style=\"width:30%\" class=\"border-top-0\">\n                        <div class=\"table-search\">\n                            <label>Property</label>\n                            <!-- <div class=\"searh-3\">\n                                <input type=\"text\" [(ngModel)]=\"parameter.email\" (keyup.enter)=\"changeFilter('email',$event.target.value)\" name=\"\">\n                                <button *ngIf=\"parameter.email\" (click)=\"changeFilter('email', parameter.email)\"><i class=\"fa fa-search\"></i></button>\n                            </div> -->\n                        </div>\n                    </th>\n                    <th style=\"width:10%\" class=\"border-top-0\">\n                        <div class=\"table-search\">\n                            <label>Assignee</label>\n                            <div class=\"searh-3\"></div>\n                        </div>\n                    </th>\n                    <th style=\"width:10%\">\n                        <div class=\"table-search\">\n                            <label>Property For</label>\n                        </div>\n                    </th>\n                    <!-- <th style=\"width:14%\">\n                        &nbsp;\n                    </th> -->\n                </tr>\n                <tr class=\"cursor-pointer\" title=\"Click to view details\" *ngFor=\"let item of items| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: parameter.total }\"\n                    (click)=\"viewLeadDetails(item.id, item)\">\n                    <!-- routerLink=\"/dashboard/leads/csr-closers/{{item.id}}\"  -->\n                    <!-- only inhouse users can do this -->\n                    <td *ngIf=\"admin?.admin_acl['Closer Lead Management']?.can_read==1 && !this.parameter.assignee_id\" (click)=\"$event.stopPropagation()\">\n                        <label class=\"cust-check-bx\" >\n                        <input type=\"checkbox\" [(ngModel)]=\"item.selected\" name=\"document\">\n                        <span class=\"checkmark\"></span>\n                        </label>\n                        <!-- <i class=\"fa\" [ngClass]=\"item.selected?'fa-check-square-o':'fa-square-o'\" (click)=\"item.selected = !item.selected\" aria-hidden=\"true\"></i> -->\n                    </td>\n                    <td>\n                        <img class=\"rounded-circle\" *ngIf=\"item?.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\"\n                              [defaultImage]=\"item?.image| img:'thumb'\" [lazyLoad]=\"item?.image\">\n                        <img class=\"rounded-circle\" *ngIf=\"!item?.image\" src=\"assets/img/default_img.png\" alt=\"img\">\n                    </td>\n                    <td class=\"text-left\">\n                        <span class=\"name\">{{item.name | titlecase}}</span>\n                    </td>\n                    <td class=\"text-left\">\n                    {{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}<br>\n                    {{item.email}}\n                    </td>\n                    <td class=\"text-left\">\n                    <div class=\"property-selected\">\n                        <p class=\"p14 marginB0\">\n                            <app-property-configuration *ngIf=\"item?.selected_properties[0]?.property?.configuration\" [configuration]=\"item?.selected_properties[0]?.property?.configuration\"></app-property-configuration>\n                        </p>\n                        <p class=\"p12 marginB0\"><strong>{{item?.selected_properties[0]?.property?.building?.name}}</strong></p>\n                        <p class=\"p11\"><i>{{item?.selected_properties[0]?.property?.building?.developer?.name}}</i></p>\n                    </div>\n                    </td>\n                    <td class=\"text-left\" title=\"CSR Closer\">\n                        {{item.closer.name | titlecase}}\n                    </td>\n                    <td class=\"text-left\" *ngIf=\"item.sale_rent\">{{item.sale_rent==1 ? ts.lang.Buy : 'Rent'}}</td>\n                    <!-- <td>\n                        <a href=\"javascript://\" title=\"View Details\" routerLink=\"/dashboard/leads/csr-closers/{{item.id}}\" class=\"icon-block edit-icon\"><img src=\"assets/img/viewfull.png\" alt=\"img\"></a>\n                    </td> -->\n                </tr>\n            </table>\n            <div class=\"padding20 center\" *ngIf=\"parameter.noResultFound\">\n                <img src=\"assets/img/404-error.png\">\n            </div>\n            </div>\n         </div>\n    \n      </div>\n      </div>\n\n\n    <div class=\"btn-cont marginT15\" *ngIf=\"parameter.total\">\n        <div class=\"row\">\n            <div class=\"col-6\">\n                <div class=\"title-group\">\n                    <p>Showing {{items?.length}} out of {{parameter.total}}</p>\n                </div>\n            </div>\n            <div class=\"col-6 text-right\">\n                <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n            </div>\n        </div>\n    </div>\n    </div>\n    \n\n    <!-- Assignment model -->\n<a data-toggle=\"modal\" data-target=\"#assign-model\" #openAssignModel></a>\n<div class=\"modal\" id=\"assign-model\">\n        <div class=\"modal-dialog \">\n            <div class=\"modal-content notary-avail\">\n                <div class=\"modal-header popup-header\">\n                <h4 class=\"modal-title\">Re Assign to</h4>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #closeAssignModel>&times;</button>\n                </div>\n                <div class=\"modal-body\">\n                    <div class=\"row\">\n                        <div class=\"col-md-8 col-6\">\n                            <input style=\"max-width:200px\" list=\"amenities\" [(ngModel)]=\"assign.keyword\" (keyup.enter)=\"getAssignListing()\" class=\"form-control\" type=\"text\" name=\"keyword\" placeholder=\"Search\">\n                        </div>\n                        <div class=\"col-md-4 col-5 btn-cont\">\n                            <a class=\"btn btn-primary pull-right\" href=\"javascript://\" (click)=\"assignNow()\">Assign</a>\n                        </div>\n                    </div>\n                    <div class=\"spacer40\"></div>\n                    <div class=\"modal-table-data\" malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\">\n                        <table class=\"table\">\n                            <tr *ngFor=\"let item of assign.items\">\n                                <td *ngIf=\"item.is_blocked!=1\">\n                                    <div class=\"n-avail-profile\">\n                                    <img *ngIf=\"item?.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\"\n                                        [defaultImage]=\"item?.image| img:'thumb'\" [lazyLoad]=\"item?.image\">\n                                    <img *ngIf=\"!item?.image\" src=\"assets/img/default_img.png\" alt=\"img\">\n                                    <div class=\"n-avail-info\">\n                                        <p class=\"p12\">{{item.name | titlecase}}</p>\n                                        <p class=\"p10\">Phone : {{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}</p>\n                                    </div>\n                                    </div>\n                                </td>\n                                <td *ngIf=\"item.is_blocked!=1\">\n                                    <label class=\"cust-check-bx float-right\">\n                                        <input type=\"radio\" name=\"notary_id\" (click)=\"assignItem = item\">\n                                        <span class=\"checkmark\"></span>\n                                    </label>\n                                </td>\n                            </tr>\n                            <tr *ngIf=\"assign?.items?.length==0\">\n                                <p class=\"show-not-found\">No CSR Closure found.</p>\n                            </tr>\n                        </table>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>"

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
/* harmony import */ var src_app_lang_translate_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/lang/translate.service */ "./src/app/lang/translate.service.ts");
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
    function CsrCloserComponent(admin, constant, route, spinner, leadsService, router, ts) {
        this.admin = admin;
        this.constant = constant;
        this.route = route;
        this.spinner = spinner;
        this.leadsService = leadsService;
        this.router = router;
        this.ts = ts;
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
        this.parameter.is_selected = false;
        this.parameter.keyword = '';
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        this.parameter.flag = 2;
        this.parameter.total = 0;
        this.parameter.count_flag = 1;
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
                    'name': 'Noatary (Not assigned)',
                    'value': parseInt(_this.dash.noatary_pending, 10)
                },
                {
                    'name': 'Bank (Not assigned)',
                    'value': parseInt(_this.dash.bank_pending, 10)
                },
                {
                    'name': 'Lead (Open)',
                    'value': parseInt(_this.dash.lead_open, 10)
                },
                {
                    'name': 'Lead (Closed)',
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
            swal('Error', 'Please choose atleast one lead.', 'error');
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
            swal('Success', 'Assigned successfully', 'success');
            _this.closeAssignModel.nativeElement.click();
            _this.getListing();
        }, function (error) {
            _this.closeAssignModel.nativeElement.click();
            swal('Error', error.error.message, 'error');
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
            src_app_lang_translate_service__WEBPACK_IMPORTED_MODULE_7__["TranslateService"]])
    ], CsrCloserComponent);
    return CsrCloserComponent;
}());



/***/ }),

/***/ "./src/app/layout/leads/csr-seller/csr-seller-detail/csr-seller-detail.component.css":
/*!*******************************************************************************************!*\
  !*** ./src/app/layout/leads/csr-seller/csr-seller-detail/csr-seller-detail.component.css ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/layout/leads/csr-seller/csr-seller-detail/csr-seller-detail.component.html":
/*!********************************************************************************************!*\
  !*** ./src/app/layout/leads/csr-seller/csr-seller-detail/csr-seller-detail.component.html ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-md-4\">\n      <div class=\"form-group\">\n      <p class=\"p16\">Manage Properties</p>\n      <!-- <div class=\"d-flex\">\n      <button class=\"all-btn\">All</button>\n      <input style=\"max-width:200px\" class=\"form-control\" type=\"text\" name=\"\">\n      </div> -->\n      </div>\n    </div>\n    <div class=\"col-md-2\">\n  <div class=\"form-group\">\n  <label>Country</label>\n    <select class=\"form-control\" (change)=\"onCountryChange($event.target.value)\">\n      <option value=\"0\">All</option>\n      <option *ngFor=\"let item of location.countries\" [value]=\"item.id\">{{item.name}}</option>\n    </select>\n  </div>\n  </div>\n  <div class=\"col-md-2\">\n  <div class=\"form-group\">\n  <label>State</label>\n    <select class=\"form-control\" (change)=\"onStateChange($event.target.value)\">\n      <option value=\"0\">All</option>\n      <option *ngFor=\"let item of location.states\" [value]=\"item.id\">{{item.name}}</option>\n    </select>\n  </div>\n  </div>\n  <div class=\"col-md-2\">\n    <div class=\"form-group\">\n    <label>City</label>\n      <select class=\"form-control\" (change)=\"onCityChange($event.target.value)\">\n        <option value=\"0\">All</option>\n        <option *ngFor=\"let item of location.cities\" [value]=\"item.id\">{{item.name}}</option>\n      </select>\n    </div>\n  </div>\n\n  <div class=\"col-md-2\">\n  <div class=\"form-group\">\n  <label>Locality</label>\n  <select class=\"form-control\" (change)=\"onLocalityChange($event.target.value)\">\n      <option value=\"0\">All</option>\n      <option *ngFor=\"let item of location.localities\" [value]=\"item.id\">{{item.name}}</option>\n    </select>\n  </div>\n  </div>\n  </div>\n\n  <div class=\"row\">\n        <div class=\"col-md-12\">\n            <div class=\"cust-tabs-2\">\n              <ul class=\"nav nav-tabs float-right\">\n                  <li class=\"nav-item\">\n                    <a [ngClass]=\"{'active':parameter.dash_flag == 1}\" (click)=\"parameter.dash_flag=1;getListing()\" class=\"nav-link\" data-toggle=\"tab\" href=\"#tw\">This Week</a>\n                  </li>\n                  <li class=\"nav-item\">\n                    <a [ngClass]=\"{'active':parameter.dash_flag == 2}\" (click)=\"parameter.dash_flag=2;getListing()\" class=\"nav-link\" data-toggle=\"tab\" href=\"#tm\">This Month</a>\n                  </li>\n                  <li class=\"nav-item\">\n                    <a [ngClass]=\"{'active':parameter.dash_flag == 3}\" (click)=\"parameter.dash_flag=3;getListing()\" class=\"nav-link\" data-toggle=\"tab\" href=\"#lm\">Last Month</a>\n                  </li>\n                  <li class=\"nav-item\">\n                    <a [ngClass]=\"{'active':parameter.dash_flag == 4}\" (click)=\"parameter.dash_flag=4;getListing()\" class=\"nav-link\" data-toggle=\"tab\" href=\"#lt\">Lifetime</a>\n                  </li>\n                  <li class=\"nav-item\">\n                    <a [ngClass]=\"{'active':parameter.dash_flag == 5}\" (click)=\"parameter.dash_flag=5;getListing()\" class=\"nav-link\" data-toggle=\"tab\" href=\"#cust\">Custom</a>\n                  </li>\n              </ul>\n            </div>\n        </div>\n        <div class=\"col-12\">\n            <hr style=\"margin-top:0;\">\n        </div>\n      </div>\n\n      <div class=\"cust-tabs\">\n      <div class=\"row flex-wrap-reverse\">\n          \n      <div class=\"col-xl-10 col-lg-12 col-md-12 col-sm-12 col-12\">\n        <ul class=\"nav nav-tabs\">\n            <li class=\"nav-item\">\n              <a [ngClass]=\"{'active':parameter.flag==3}\" (click)=\"changeFlag(3)\" class=\"nav-link\" >Approved</a>\n            </li>\n            <li class=\"nav-item\">\n              <a [ngClass]=\"{'active':parameter.flag==4}\" (click)=\"changeFlag(4)\" class=\"nav-link\" >Unapproved</a>\n            </li>\n            <li class=\"nav-item\">\n              <a [ngClass]=\"{'active':parameter.flag==2}\" (click)=\"changeFlag(2)\" class=\"nav-link\" >Pending Review</a>\n            </li>\n            <li class=\"nav-item\">\n              <a [ngClass]=\"{'active':parameter.flag==1}\" (click)=\"changeFlag(1)\" class=\"nav-link\" >In Draft</a>\n            </li>\n        </ul>\n        </div>\n        <div class=\"col-xl-2 col-lg-12 col-md-12 col-sm-12 col-12\"><div class=\"add-new text-left\">\n              <a *ngIf=\"admin?.admin_acl['Seller Lead Management']?.can_create==1 || admin?.permissions?.can_csr_seller==1\" class=\"btn\" href=\"javascript://\" routerLink=\"/dashboard/properties/add-property/0/{{parameter.seller_id}}\">+Add New Property</a>\n            </div></div>\n            </div>\n        <div class=\"tab-content white-bg\">\n            <div class=\"tab-pane active\">\n              <div class=\"tabel-section\">\n                  <div class=\"table-responsive\">\n                    <table class=\"table table-striped table-align-left\">\n                        <tr>\n                          <th style=\"width:20%; text-align:left;\">\n                              <div class=\"table-search\">\n                                <label>Name of Building</label>\n                                <div class=\"searh-3\">\n                                  <input type=\"text\" [(ngModel)]=\"parameter.keyword\" (keyup.enter)=\"getListing()\" >\n                                  <button *ngIf=\"parameter.keyword\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                                </div>\n                              </div>\n                          </th>\n                          <th style=\"width:15%; text-align:left;\">\n                              <div class=\"table-search\">\n                                <label>Configuration</label>\n                                <select [(ngModel)]=\"parameter.configuration_id\" (change)=\"getListing()\">\n                                  <option value=\"0\">All configuration</option>\n                                  <option *ngFor=\"let c of configurations\" value=\"{{c.id}}\">\n                                    <app-property-configuration *ngIf=\"c\" [configuration]=\"c\"></app-property-configuration>\n                                  </option>\n                                </select>\n                              </div>\n                          </th>\n                          <th style=\"width:20%; text-align:left;\">\n                              <div class=\"table-search\">\n                                  <label>Address</label>\n                                  <div class=\"searh-3\">\n                                    <input type=\"text\" [(ngModel)]=\"parameter.address\" (keyup.enter)=\"getListing()\" >\n                                    <button *ngIf=\"parameter.address\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                                  </div>\n                              </div>\n                          </th>\n                          <th style=\"width:10%; text-align:left;\">\n                              <div class=\"table-search\">\n                                <label>Sell / Rent</label>\n                                <select [(ngModel)]=\"parameter.property_for\" (change)=\"getListing()\" style=\"width:100px;\">\n                                  <option value=\"\">All</option>\n                                  <option value=\"1\">Sell</option>\n                                  <option value=\"2\">Rent</option>\n                                </select>\n                              </div>\n                          </th>\n                          <th style=\"width:6%; vertical-align:top;\">\n                              <div (click)=\"sort_by(1)\" class=\"d-flex pointer\"><span>Price</span>\n                              <a href=\"javascript://\"><img [ngClass]=\"{'upsidedown':parameter.sort_by==1 && parameter.sort_by_order==1}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a></div>\n                          </th>\n                          <th style=\"width:6%; vertical-align:top;\">\n                              <div (click)=\"sort_by(2)\" class=\"d-flex pointer\"><span>Availability</span>\n                              <a href=\"javascript://\"><img [ngClass]=\"{'upsidedown':parameter.sort_by==2 && parameter.sort_by_order==1}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n                              </div>\n                          </th>\n                          <th style=\"width:6%; vertical-align:top;\">\n                              <div (click)=\"sort_by(3)\" class=\"d-flex pointer\"><span>Leads</span>\n                              <a href=\"javascript://\"><img [ngClass]=\"{'upsidedown':parameter.sort_by==3 && parameter.sort_by_order==1}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a></div>\n                          </th>\n                          <th style=\"width:17%\">&nbsp;</th>\n                        </tr>\n                  \n                        <tr *ngFor=\"let p of items | paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: total }\">\n                            <td>\n                              <strong>{{p?.building?.name ? p?.building?.name : 'NA'}}</strong>\n                              <div class=\"clearfix\"></div>\n                              <small *ngIf=\"p.quantity > 0\">\n                              {{p.quantity}} \n                              <span *ngIf=\"p.quantity == 1\">property</span>\n                              <span *ngIf=\"p.quantity > 1\">properties</span>\n                            </small>                                     \n\n                            </td>\n                            <td><span *ngIf=\"p && p.configuration\">\n                              <app-property-configuration *ngIf=\"p.configuration\" [configuration]=\"p.configuration\"></app-property-configuration>\n                            </span></td>\n                            <td><span>{{p?.building?.address ? p?.building?.address : 'NA'}}</span></td>\n                            <td>\n                              <span *ngIf=\"p.for_sale\">Sell</span>\n                              <span *ngIf=\"p.for_rent\">Rent</span>\n                            </td>\n                            <td><span>{{p.min_price|price}}</span></td>\n                            <td><span class=\"green-color\">\n                              <span *ngIf=\"p.for_sale\">Sell</span>\n                              <span *ngIf=\"p.for_rent\">Rent</span></span>\n                            </td>\n                            <td><span>{{p.lead_properties_count}}</span></td>\n                            <td>\n                              <div class=\"message\">\n                                  <!-- admin?.admin_acl['Property Management']?.can_update!=1 ||  -->\n                                <!-- <button [disabled]=\"true\" routerLink=\"/dashboard/properties/edit-property/{{p.id}}\" title=\"Edit Details\" class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></button> -->\n                                <button [disabled]=\"admin?.admin_acl['Seller Lead Management']?.can_update==0 || admin?.permissions?.can_csr_seller==0\" \n                                    *ngIf=\"parameter?.flag!=3\" routerLink=\"/dashboard/properties/edit-property/{{p.id}}\" title=\"Edit Details\" class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></button>\n                                <button [disabled]=\"admin?.admin_acl['Seller Lead Management']?.can_update==0 || admin?.permissions?.can_csr_seller==0\" \n                                    *ngIf=\"parameter?.flag==3\" routerLink=\"/dashboard/properties/edit-property/{{p.id}}/edit\" title=\"Edit Details\" class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></button>\n                                <button [disabled]=\"admin?.admin_acl['Seller Lead Management']?.can_update==0 || admin?.permissions?.can_csr_seller==0\" \n                                    *ngIf=\"!p.is_blocked\" (click)=\"block(p);\" class=\"action-icon\" title=\"Block\"><img src=\"assets/img/block.png\" alt=\"img\"></button>\n                                <button [disabled]=\"admin?.admin_acl['Seller Lead Management']?.can_update==0 || admin?.permissions?.can_csr_seller==0\" \n                                    *ngIf=\"p.is_blocked == true\" (click)=\"unblock(p);\" class=\"action-icon unblock-bg\" title=\"UnBlock\"><img src=\"assets/img/unblock.png\" alt=\"img\"></button>\n                                <button [disabled]=\"admin?.admin_acl['Seller Lead Management']?.can_update==0 || admin?.permissions?.can_csr_seller==0\" \n                                    *ngIf=\"p.status == 3\" (click)=\"changeStatus(p,2);\" class=\"action-icon\" title=\"Unapprove\"><img src=\"assets/img/ic_disapprove.png\" alt=\"img\"></button>\n                                <button [disabled]=\"admin?.admin_acl['Seller Lead Management']?.can_update==0 || admin?.permissions?.can_csr_seller==0\" \n                                    *ngIf=\"p.status == 2\" (click)=\"changeStatus(p,3);\" class=\"action-icon\" title=\"Approve\"><img src=\"assets/img/tick.png\" alt=\"img\"></button>\n                              </div>\n\n                            </td>\n                        </tr>\n                        <!-- <tr *ngIf=\"total == 0\">\n                          <td colspan=\"10\">\n                            <img src=\"assets/img/404-error.png\">\n                          </td>\n                        </tr> -->\n                    </table>\n                    <div class=\"padding20 center\" *ngIf=\"total == 0\">\n                      <img src=\"assets/img/404-error.png\">\n                    </div>\n                  </div>\n              </div>\n              <!-- <div class=\"btn-cont text-right marginT15\">\n                  <button class=\"btn btn-secondary\">View All</button>\n              </div> -->\n              <!-- <div class=\"spacer30\"></div>\n\n              <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls> -->\n\n\n            </div>\n            <div class=\"tab-pane container fade\" id=\"seller\">Seller tab on</div>\n        </div>\n      </div>\n      <div class=\"btn-cont text-right marginT15\" *ngIf=\"parameter.total\">\n          <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n      </div>\n  </div>"

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
    function CsrSellerDetailComponent(constant, route, admin, spinner) {
        this.constant = constant;
        this.route = route;
        this.admin = admin;
        this.spinner = spinner;
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
        item.is_blocked = true;
        this.admin.postDataApi('blockProperty', { property_id: item.id, flag: 1 }).subscribe(function (r) {
            swal('Success', 'Property blocked successfully', 'success');
        }, function (error) {
            swal('Error', error.error.message, 'error');
        });
    };
    CsrSellerDetailComponent.prototype.unblock = function (item) {
        item.is_blocked = false;
        this.admin.postDataApi('blockProperty', { property_id: item.id, flag: 0 }).subscribe(function (r) {
            swal('Success', 'Property unblocked successfully', 'success');
        }, function (error) {
            swal('Error', error.error.message, 'error');
        });
    };
    CsrSellerDetailComponent.prototype.changeStatus = function (item, status) {
        item.status = status;
        this.admin.postDataApi('updatePropertyStatus', { property_id: item.id, status_id: status }).subscribe(function (r) {
            swal('Success', 'Property status changed', 'success');
        }, function (error) {
            swal('Error', error.error.message, 'error');
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
            ngx_spinner__WEBPACK_IMPORTED_MODULE_2__["NgxSpinnerService"]])
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

module.exports = ""

/***/ }),

/***/ "./src/app/layout/leads/csr-seller/csr-seller-detail/seller-chat/seller-chat.component.html":
/*!**************************************************************************************************!*\
  !*** ./src/app/layout/leads/csr-seller/csr-seller-detail/seller-chat/seller-chat.component.html ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"row\">\n    <div class=\"col-lg-4 col-md-4 col-sm-12 col-12\">\n      <div malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\" class=\"chat-name-list white-bg\">\n         <div *ngIf=\"loadingConversation\" class=\"chat-window white-bg\"><img style=\"width:100%\" src=\"assets/img/loading_content.gif\"></div>\n         <div *ngIf=\"!loadingConversation && conversations.length == 0\" class=\"padding20\">No conversation found</div>\n         <a *ngFor=\"let con of conversations\" [ngClass]=\"{'active':con.selected == true}\" href=\"javascript://\">\n            <div class=\"profile\" (click)=\"selectConversation(con, '')\">\n               <div class=\"fig-block\">\n                  <!-- <img [src]=\"con.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\" /> -->\n                  <img *ngIf=\"con?.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\"\n                              [defaultImage]=\"con?.image| img:'thumb'\" [lazyLoad]=\"con?.image\">\n                  <img *ngIf=\"!con?.image\" src=\"assets/img/default_img.png\" alt=\"img\">\n               </div>\n               <div class=\"profile-info\">\n                  <h6>{{con.name | titlecase}}</h6>\n                  <!-- <p class=\"p12\">{{con.phone}}</p> -->\n                  <p class=\"p12\">{{con.phone}}</p>\n                  <i class=\"fa fa-angle-right float-right\"></i>\n               </div>\n            </div>\n         </a>\n      </div>\n   </div>\n\n   <div class=\"col-lg-8 col-md-8 col-sm-12 col-12 move-below\">\n      <div *ngIf=\"loadingMessages\" class=\"chat-window white-bg\"><img style=\"width:100%\" src=\"assets/img/loading_content.gif\"></div>\n      <div *ngIf=\"conversation && !loadingMessages\" class=\"chat-window white-bg\">\n         <div class=\"chat-top\">\n             <a href=\"javascript://\">\n               <div class=\"profile\">\n                  <div class=\"fig-block\">\n                     <!-- <img [src]=\"parameter.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\"> -->\n                      <img *ngIf=\"parameter.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\"\n                              [defaultImage]=\"parameter.image| img:'thumb'\" [lazyLoad]=\"parameter.image\">\n                      <img *ngIf=\"!parameter.image\" src=\"assets/img/default_img.png\" alt=\"img\">\n                  </div>\n                  <div class=\"profile-info\">\n                     <h6>{{parameter.name | titlecase}}</h6>\n                     <!-- <p class=\"p12\">{{conversation.other.phone}}</p> -->\n                     <p class=\"p12\">{{parameter.phone}}</p>\n                  </div>\n               </div>\n            </a>\n  \n         </div>\n  \n         <div *ngIf=\"messages\" malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\" class=\"chat-area scrollbox\" #chatWin>\n          <div *ngIf=\"loadmore\" class=\"chat-load-more\" (click)=\"loadMore()\" >\n            Previous Messages <img *ngIf=\"loadmoring\" src=\"assets/img/loading-p.gif\">\n          </div> \n          <div *ngFor=\"let m of messages;let i = index\" [ngClass]=\"m?.conversation_user?.admin_id == admin_id ? 'chat-user-one' :'chat-user-two'\" class=\"chat-user\">\n            <p *ngIf=\"m.message_type == 1\" style=\"word-wrap: break-word;\">\n              <!-- <span *ngIf=\"m.loading\" class=\"m-loader\"><img src=\"assets/img/loading-p.gif\"></span> -->\n              <span>{{m.message}}</span>\n            </p>\n  \n            <!-- <a class=\"btn btn-sm btn-danger\" [group]=\"group\" ng-box href=\"{{lastReport.image.original}}\">View</a> -->\n            <!-- <a *ngIf=\"m.message_type == 2\" ng-box width=\"800\" height=\"800\" target=\"_blank\" href=\"{{m.image}}\">\n                <img src=\"{{m.image}}\">\n            </a> -->\n            <a *ngIf=\"m.message_type == 2\" href=\"{{m.image}}\" data-lightbox=\"image\" title=\"image\" >\n              <span>\n                <img class=\"ui bordered small image\" src=\"{{m.image}}\">\n                <div *ngIf=\"m.loading\" class=\"loaderr\"></div>\n              </span>\n            </a>\n            <!-- <a *ngIf=\"m.message_type == 2\" href=\"{{m.image}}\" data-lightbox=\"image\" data-title=\"My caption\">\n              <img class=\"ui bordered small image\" src=\"{{m.image}}\">\n              \n            </a> -->\n            <!-- <a *ngIf=\"m.message_type == 3\" href=\"{{m.video}}\" title=\"Video\" class=\"chat-vid\">\n              <span >\n                <img class=\"ui bordered small image\" src=\"{{m.image}}\">\n                <img *ngIf=\"!m.loading\" class=\"vid-icon\" (click)=\"playVideo(i)\" src=\"assets/img/play-button.png\" />\n                <div *ngIf=\"m.loading\" class=\"loaderr\"></div>\n              </span>\n            </a> -->\n            \n            <div class=\"chat-vid\" *ngIf=\"m.message_type == 3 && !m.play\">\n              <span>\n                  <img class=\"ui bordered small image\" src=\"{{m.image}}\" onerror=\"this.src='assets/img/placeholder.png'\">\n                  <img *ngIf=\"!m.loading\" class=\"vid-icon\" (click)=\"playVideo(i)\" src=\"assets/img/play-button.png\" />\n                  <div *ngIf=\"m.loading\" class=\"loaderr\"></div>\n                  <div class=\"clearfix\"></div>\n            </span>\n            </div>\n            <video *ngIf=\"m.message_type == 3 && m.play\" src=\"{{m.video}}\" autoplay type=\"video/mp4\" controls></video>\n            \n            <!-- <div class=\"chat-vid\" *ngIf=\"m.message_type == 3 && !m.play\">\n              <span>\n                <img class=\"vid-img\" src=\"{{m.image}}\">\n                <img class=\"vid-icon\" (click)=\"playVideo(i)\" src=\"assets/img/play-button (2).png\"/>\n                <div class=\"clearfix\"></div>\n            </span>\n            </div> -->\n            <!-- <video *ngIf=\"m.message_type == 3 && m.play\" src=\"{{m.video}}\" autoplay type=\"video/mp4\" controls></video> -->\n            \n            <div class=\"chat-shared-file\" *ngIf=\"m.message_type == 4\">\n              <span *ngIf=\"m.loading\" class=\"m-loader\">\n                <img class=\"ui bordered small image\" src='assets/img/placeholder.png'>\n                <div *ngIf=\"m.loading\" class=\"loaderr\"></div>\n              </span>\n              <span *ngIf=\"!m.loading\">\n                <a href=\"javascript://\" target=\"_blank\" href=\"{{m.attachment}}\"><span>{{m.attachment_name}} <img class=\"viewfull\" src=\"assets/img/viewfull.png\"></span>\n                </a>\n              </span>\n            </div>\n              \n            <a *ngIf=\"m.message_type == 5\" href=\"{{m.property_url}}\" target=\"_blank\" title=\"image\" >\n              <span>\n                <img class=\"ui bordered small image\" src=\"{{m.image}}\">\n                <div *ngIf=\"m.loading\" class=\"loaderr\"></div>\n              </span>\n              <h5>{{m.message}}</h5>\n            </a>\n            \n            <div class=\"time clearfix\" *ngIf=\"m.updated_at && !m.uid\">{{m.updated_at| moment}}</div>\n            <div class=\"time clearfix\" *ngIf=\"m.updated_at && m.uid\">\n                {{m.updated_at|date:'h:mm a, MMM d y'}}\n            </div>\n  \n           </div>\n  \n         </div>\n  \n         <div style=\"position: absolute; z-index: 1; margin: 0px; padding: 0px; other: block; left: 581px; top: 91px;\"><div class=\"enscroll-track track3\" style=\"position: relative; height: 367px;\"><a href=\"\" class=\"handle3\" style=\"position: absolute; z-index: 1; height: 199.244px; top: 0px;\"><div class=\"top\"></div><div class=\"bottom\"></div></a></div></div>\n  \n         <div class=\"chat-text\">\n          <div class=\"dropdown attach-items\">\n            <a href=\"javascript://\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" #optionsButton>\n              <i class=\"fa fa-paperclip\" aria-hidden=\"true\"></i>\n            </a>\n            <div class=\"dropdown-menu\">\n              <div class=\"dropdown-item\">\n                <input type=\"file\" name=\"image\" accept=\"image/*\" (change)=\"onSelectFile('image', $event)\">\n                <i class=\"fa fa-camera\" aria-hidden=\"true\"></i>\n                <span>Photo</span>\n              </div>\n              <a class=\"dropdown-item\"> \n                <!-- <input type=\"file\" name=\"video\" id=\"videoFileObject\" name=\"video\" accept=\"video/mp4,video/x-m4v,video/*\" (change)=\"showCanvas($event)\"> -->\n                <input type=\"file\" name=\"video1\" accept=\"video/mp4,video/x-m4v,video/*\" (change)=\"showCanvas($event)\">\n                <i class=\"fa fa-video-camera\" aria-hidden=\"true\"></i>\n                <span>Video</span>\n              </a>\n              <a class=\"dropdown-item\">    \n                  <input type=\"file\" name=\"attachment\" accept=\".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf\" (change)=\"saveAttachment($event)\">\n                <i class=\"fa fa-file\" aria-hidden=\"true\"></i>\n                <span>Document</span>\n              </a>\n              <a class=\"dropdown-item cursor-pointer\" (click)=\"blockGetProperty.showModal()\">    \n                <i class=\"fa fa-file\" aria-hidden=\"true\"></i>\n                <span>Property</span>\n              </a>\n            </div>\n          </div>\n          <input id=\"message\" #msgInput autocomplete=\"off\" [(ngModel)]=\"textMessage\" (keyup.enter)=\"setText()\" class=\"chat-input\" type=\"text\" name=\"message\" placeholder=\"Type your message here …\">\n          \n          <!-- <div class=\"chat-attached-file\" *ngIf=\"model.message_type == 2\">\n            <div class=\"attached-inner\">\n              <a href=\"javascript://\" (click)=\"updateModel('image')\" class=\"close\">&times;</a>\n              <div class=\"fig-block\"><img class=\"img-fluid\" src=\"{{model.image}}\" alt=\"img\"></div>\n            </div>\n          </div>\n          <div class=\"chat-attached-file\">\n            <div class=\"attached-inner\">\n              <a href=\"javascript://\" (click)=\"updateModel('video')\" class=\"close\">&times;</a>\n              <div class=\"fig-block\">\n                  <video style=\"width: 100%; height: 100%;\" src=\"{{model.video}}\" class=\"video55\" autoplay type=\"video/mp4\" controls></video>\n              </div>\n            </div>\n          </div>\n          <div class=\"chat-attached-file\" *ngIf=\"model.message_type == 4\">\n            <div class=\"attached-inner\">\n              <a href=\"javascript://\" (click)=\"updateModel('video')\" class=\"close\">&times;</a>\n              <div class=\"fig-block\">\n                <div class=\"chat-shared-file\">\n                  <a href=\"javascript://\"><span>{{model.attachment_name}}</span>\n                    <i class=\"fa fa-times\" (click)=\"updateModel('attachment')\" aria-hidden=\"true\"></i>\n                  </a>\n                </div>\n              </div>\n            </div>\n          </div> -->\n          <video style=\"width: 100%; height: 100%;\" src=\"{{videoSrc}}\" class=\"video55\" autoplay type=\"video/mp4\" controls></video>\n          <canvas style=\"display: none;\" width=\"800\" height=\"600\" id=\"canvas\"></canvas>\n  \n          <button (click)=\"setText()\" class=\"btn\">Send</button>\n          \n         </div>\n  \n      </div>\n      </div>\n    </div>\n  \n    <app-block-get-property #blockGetProperty (itemSelect)=\"sendProperty($event)\"></app-block-get-property>"

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
    function SellerChatComponent(element, admin, cs, constant, route, spinner) {
        this.element = element;
        this.admin = admin;
        this.cs = cs;
        this.constant = constant;
        this.route = route;
        this.spinner = spinner;
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
            swal('Error', this.constant.errorMsg.FILE_SIZE_EXCEEDS, 'error');
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
            swal('Error', this.constant.errorMsg.FILE_SIZE_EXCEEDS, 'error');
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
            swal('Error', this.constant.errorMsg.FILE_SIZE_EXCEEDS, 'error');
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
        else if ((Object.keys(this.admin.admin_acl).length !== 0 && this.admin.admin_acl['Broker Lead Management'].can_update === 0) ||
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
            swal('Error', 'Please enter some text.', 'error');
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
        model.message = property.name + ' with ';
        if (property.configuration.bedroom) {
            model.message += property.configuration.bedroom + ' Bed ';
        }
        if (property.configuration.bathroom) {
            model.message += this.constant.middleDot + property.configuration.bathroom + ' Bath';
        }
        if (property.configuration.half_bathroom) {
            model.message += this.constant.middleDot + property.configuration.half_bathroom + ' Half Bath';
        }
        if (property.property_type.name) {
            model.message += this.constant.middleDot + property.property_type.name;
        }
        model.message += ' in ' + property.building.name;
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
            ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerService"]])
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

module.exports = ""

/***/ }),

/***/ "./src/app/layout/leads/csr-seller/csr-seller.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/layout/leads/csr-seller/csr-seller.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container-fluid\">\n    <div class=\"row\">\n        <div class=\"col-md-4\">\n            <div class=\"form-group\">\n                <p class=\"p16\">Manage CSR Seller's Lead</p>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-md-4\">\n            <div class=\"form-group\" *ngIf=\"admin?.admin_acl['Seller Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n                <div class=\"d-flex\">\n                <div class=\"autocomplete\">\n                    <input placeholder=\"Search CSR Seller\" style=\"max-width:200px\" list=\"amenities\" [(ngModel)]=\"parameter.keyword\" (input)=\"getCsrListing()\" class=\"form-control\" type=\"text\" name=\"keyword\" (focusout)=\"closeCsrListing()\">\n                    <div id=\"myInputautocomplete-list\" class=\"autocomplete-items\">\n                        <div *ngFor=\"let item of users\" (click)=\"selectCsrUser(item)\">{{item.email}}</div>\n                    </div>\n                </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-md-8 col-12\">\n            <div class=\"cust-tabs-2\">\n                <ul class=\"nav nav-tabs\">\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==1}\" (click)=\"changeFlag(1)\" >This Week</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==2}\" (click)=\"changeFlag(2)\" >This Month</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==3}\" (click)=\"changeFlag(3)\" >Last Month</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==4}\" (click)=\"changeFlag(4)\" >Lifetime</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==5}\" (click)=\"parameter.flag=5\" >Custom</a>\n                </li>\n                </ul>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-12\">\n            <div *ngIf=\"parameter.flag == 5\" class=\"row\">\n                <div class=\"offset-lg-7\"></div>\n                <div class=\"col-lg-2 col-md-2 col-sm-5 col-5\">\n                <div class=\"form-group marginB0\">\n                    <label>From:</label>\n                    <p-calendar showIcon=\"true\" [(ngModel)]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n                </div>\n                </div>\n                <div class=\"col-lg-2 col-md-2 col-sm-5 col-5\">\n                <div class=\"form-group marginB0\">\n                    <label>To:</label>\n                    <p-calendar showIcon=\"true\" [(ngModel)]=\"parameter.max\" [minDate]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n                </div>\n                </div>\n                <div class=\"col-lg-1 col-md-2 col-sm-2 col-6\">\n                <div class=\"form-group btn-cont\">\n                    <label class=\"addMT3\">&nbsp;</label>\n                    <button class=\"btn btn-calender\" href=\"javascript://\" (click)=\"getListing(); getCSRDashBoardData();\"\n                        [disabled]=\"!parameter.min || !parameter.max\">Apply</button>\n                </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"listingResults\" >\n        <div class=\"row\" *ngIf=\"admin?.admin_acl['Seller Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n            <div class=\"col-md-2\">\n                <div class=\"form-group\">\n                <label>Country</label>\n                <select class=\"form-control\" (change)=\"onCountryChange($event.target.value)\">\n                    <option value=\"0\">All</option>\n                    <option *ngFor=\"let item of location.countries\" [value]=\"item.id\">{{item.name}}</option>\n                </select>\n                </div>\n            </div>\n            <div class=\"col-md-2\">\n                <div class=\"form-group\">\n                <label>State</label>\n                <select class=\"form-control\" (change)=\"onStateChange($event.target.value)\">\n                    <option value=\"0\">All</option>\n                    <option *ngFor=\"let item of location.states\" [value]=\"item.id\">{{item.name}}</option>\n                </select>\n                </div>\n            </div>\n            <div class=\"col-md-2\">\n                <div class=\"form-group\">\n                <label>City</label>\n                    <select class=\"form-control\" (change)=\"onCityChange($event.target.value)\">\n                    <option value=\"0\">All</option>\n                    <option *ngFor=\"let item of location.cities\" [value]=\"item.id\">{{item.name}}</option>\n                    </select>\n                </div>\n            </div>\n    \n            <div class=\"col-md-2\">\n                <div class=\"form-group\">\n                <label>Locality</label>\n                <select class=\"form-control\" (change)=\"onLocalityChange($event.target.value)\">\n                    <option value=\"0\">All</option>\n                    <option *ngFor=\"let item of location.localities\" [value]=\"item.id\">{{item.name}}</option>\n                </select>\n                </div>\n            </div>\n    \n            <div class=\"col-md-2\">\n                <div class=\"form-group btn-cont\">\n                <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n                <button type=\"button\" (click)=\"getListing(); getCSRDashBoardData();\" class=\"btn btn-primary-new width100P\">Apply</button>\n                </div>\n            </div>\n    \n            <div class=\"col-md-2\">\n                <div class=\"form-group btn-cont\">\n                <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n                <button type=\"button\" (click)=\"resetFilters()\" class=\"btn btn-primary-new width100P\">Reset</button>\n                </div>\n            </div>\n        </div>\n        <div *ngIf=\"selectedUser as item\" class=\"sigle-row-table\">\n        <table class=\"table table-striped\">\n        <tbody><tr>\n            <td>\n                <!-- <img class=\"rounded-circle\" [src]=\"item.image| img:'small'\" onerror='this.src=\"assets/img/default_img.png\"' alt=\"img\"> -->\n                <img *ngIf=\"item.image\" class=\"rounded-circle\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\"\n                              [defaultImage]=\"item.image| img:'thumb'\" [lazyLoad]=\"item.image\">\n                <img *ngIf=\"!item.image\" class=\"rounded-circle\" src=\"assets/img/default_img.png\" alt=\"img\">\n            </td>\n            <td class=\"text-left\">\n                <span class=\"name\">{{item.name | titlecase}}</span>\n            </td>\n            <td class=\"text-left\">{{item.phone}}</td>\n            <td class=\"text-left\">{{item.email}}</td>\n            <td>\n                <a (click)=\"removeCsrUser()\" href=\"javascript://\" class=\"icon-block edit-icon\"><img src=\"assets/img/remove-icon.png\" alt=\"remove\" title=\"remove\" /></a>\n            </td>\n            </tr>\n        </tbody>\n        </table>\n  </div>\n  <div class=\"row\">\n     <div class=\"col-lg-8 col-md-12 col-sm-12 col-12\">\n        <div class=\"info-box all-leads\">\n           <div class=\"row\">\n              <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == '1'}\" (click)=\"changeCountFlag(1)\">\n                 <div class=\"one-row \">\n                    <div class=\"o-block\">\n                       <h5>Leads</h5>\n                       <small>Total</small>\n                    </div>\n                    <div class=\"o-block\">\n                       <a class=\"view-all\" href=\"javascript://\">View All</a>\n                       <h4>{{dash?.lead_total}}</h4>\n                    </div>\n                 </div>\n              </div>\n              <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == '2'}\" (click)=\"changeCountFlag(2)\">\n                 <div class=\"one-row\">\n                    <div class=\"o-block\">\n                       <h5>Leads</h5>\n                       <small>Without Properties</small>\n                    </div>\n                    <div class=\"o-block\">\n                       <a class=\"view-all\" href=\"javascript://\">View All</a>\n                       <h4>{{dash?.lead_without_property}}</h4>\n                    </div>\n                 </div>\n              </div>\n           </div>\n        </div>\n        <div class=\"info-box all-leads\">\n           <div class=\"row\">\n              <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == '3'}\" (click)=\"changeCountFlag(3)\">\n                 <div class=\"one-row \">\n                    <div class=\"o-block\">\n                       <h5>Leads</h5>\n                       <small>With Properties</small>\n                    </div>\n                    <div class=\"o-block\">\n                       <a class=\"view-all\" href=\"javascript://\">View All</a>\n                       <h4>{{dash?.lead_with_property}}</h4>\n                    </div>\n                 </div>\n              </div>\n              <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == '4'}\" (click)=\"changeCountFlag(4)\">\n                 <div class=\"one-row\">\n                    <div class=\"o-block\">\n                       <h5>Leads</h5>\n                       <small>Pending Properties (in Draft)</small>\n                    </div>\n                    <div class=\"o-block\">\n                       <a class=\"view-all\" href=\"javascript://\">View All</a>\n                       <h4>{{dash?.lead_property_pending}}</h4>\n                    </div>\n                 </div>\n              </div>\n           </div>\n        </div>\n\n     </div>\n     <div class=\"col-lg-4 col-md-12 col-sm-12 col-12\">\n        <div class=\"chat-msg all-leads\" style=\"padding:0px\">\n            <div class=\"padding20\" *ngIf=\"dash.lead_total == 0\">No records found</div>\n            <ngx-charts-pie-chart [results]=\"chartView\"></ngx-charts-pie-chart>\n        </div>\n     </div>\n  </div>\n  <div class=\"row\">\n     <div class=\"col-12\">\n        <div class=\"spacer40\"></div>\n     </div>\n\n  </div>\n  <div class=\"row\">\n     <div class=\"col-lg-6 col-md-6 col-6\">\n        <div class=\"title-group\">\n           <h5>Leads \n            <span *ngIf=\"parameter.count_flag == 1\">(Total)</span>\n            <span *ngIf=\"parameter.count_flag == 2\">(Without Properties)</span>\n            <span *ngIf=\"parameter.count_flag == 3\">(With Properties)</span>\n            <span *ngIf=\"parameter.count_flag == 4\">(Pending Properties)</span>\n           </h5>\n        </div>\n     </div>\n     <div class=\"col-lg-6 col-md-6 col-5\" *ngIf=\"admin?.admin_acl['Seller Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n        <div class=\"add-new text-right\">\n            <a class=\"btn\" (click)=\"bulkAssign()\" href=\"javascript://\">Bulk Re-assign</a>\n        </div>\n    </div>\n  </div>\n  <div class=\"white-bg\">\n     <div class=\"tabel-section\">\n        <div class=\"table-responsive\">\n           <table class=\"table table-striped border-0\">\n              <tbody>\n              <tr>\n                <th *ngIf=\"admin?.admin_acl['Seller Lead Management']?.can_read==1 && !this.parameter.assignee_id\" style=\"width:5%;\">\n                    <div class=\"table-search\">\n                        <label>All</label>\n                        <div>\n                            <label class=\"cust-check-bx marginT0\">\n                                <input class=\"width1\" type=\"checkbox\" (click)=\"selectAll(parameter.is_selected)\" name=\"document\">\n                                <span class=\"checkmark\"></span>\n                            </label>\n                        </div>\n                    </div>\n                </th>\n                <th style=\"width:5%;\">\n                    <div class=\"table-search\">\n                        <label>Image</label>\n                    </div>\n                </th>\n                <th style=\"width:15%;\">\n                    <div class=\"table-search\">\n                       <label>Name</label>\n                       <div class=\"searh-3\">\n                        <input autocomplete=\"off\" type=\"text\" name=\"name\" [(ngModel)]=\"parameter.name\" (keyup.enter)=\"getListing()\">\n                        <button *ngIf=\"parameter.name\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                      </div>\n                    </div>\n                </th>\n                <th style=\"width:15%;\">\n                    <div class=\"table-search\">\n                       <label>Contact Number</label>\n                       <div class=\"searh-3\">\n                            <input autocomplete=\"off\" type=\"text\" name=\"phone\" [(ngModel)]=\"parameter.phone\" (keyup.enter)=\"getListing()\">\n                            <button *ngIf=\"parameter.phone\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                        </div>\n                    </div>\n                </th>\n                <th style=\"width:20%;\">\n                    <div class=\"table-search\">\n                       <label>Email Address</label>\n                       <div class=\"searh-3\">\n                            <input autocomplete=\"off\" type=\"text\" name=\"email\" [(ngModel)]=\"parameter.email\" (keyup.enter)=\"getListing()\">\n                            <button *ngIf=\"parameter.email\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                       </div>\n                    </div>\n                 </th>\n                 <th style=\"width:10%;\">\n                    <div class=\"table-search\">\n                        <label>Assignee</label>\n                    </div>\n                 </th>\n                 <th style=\"width:5%;\">\n                    <div class=\"table-search\">\n                        <label>Chat with Seller</label>\n                    </div>\n                 </th>\n                 <th style=\"width:5%;\">\n                    <div class=\"table-search\">\n                        <label>Chat with Agent</label>\n                    </div>\n                 </th>\n                 <th style=\"width:5%;\">\n                    <div class=\"table-search\">\n                        <label>Properties</label>\n                    </div>\n                    <div class=\"ppties\">\n                        <a href=\"javascript://\" (click)=\"sort_by(3)\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Approved\" data-original-title=\"Coming soon\">A<img [ngClass]=\"{'upsidedown':parameter.sort_by_flag==3 && parameter.sort_by_order==0}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n                    </div>\n                 </th>\n                 <th style=\"width:5%;\">\n                   <label>&nbsp;</label>\n                  <div class=\"ppties\">\n                     <a href=\"javascript://\" (click)=\"sort_by(4)\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Unapproved\" data-original-title=\"Coming soon\">U<img [ngClass]=\"{'upsidedown':parameter.sort_by_flag==4 && parameter.sort_by_order==0}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n                     </div>\n                 </th>\n                 <th style=\"width:5%;\">\n                  <label>&nbsp;</label>\n                  <div class=\"ppties\">\n                     <a href=\"javascript://\" (click)=\"sort_by(2)\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Pending Review\" data-original-title=\"Coming soon\">P<img [ngClass]=\"{'upsidedown':parameter.sort_by_flag==2 && parameter.sort_by_order==0}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n                     </div>\n                 </th>\n                 <th style=\"width:5%;\">\n                  <label>&nbsp;</label>\n                  <div class=\"ppties\">\n                     <a href=\"javascript://\" (click)=\"sort_by(1)\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"In Draft\" data-original-title=\"In Draft\">D<img [ngClass]=\"{'upsidedown':parameter.sort_by_flag==1 && parameter.sort_by_order==0}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n                     </div>\n                 </th>\n                 <th style=\"width:5%;\">\n                  <label>&nbsp;</label>\n                  <div class=\"ppties\">\n                     <a href=\"javascript://\" (click)=\"sort_by(5)\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Total\" data-original-title=\"Coming soon\">T<img [ngClass]=\"{'upsidedown':parameter.sort_by_flag==5 && parameter.sort_by_order==0}\" src=\"assets/img/top-arrow.png\" alt=\"img\"></a>\n                     </div>\n                 </th>\n              </tr>\n              <tr class=\"cursor-pointer\" title=\"Click to view details\" *ngFor=\"let item of items| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: parameter.total }\">\n                <td *ngIf=\"admin?.admin_acl['Seller Lead Management']?.can_read==1 && !this.parameter.assignee_id\" (click)=\"$event.stopPropagation()\">\n                    <label class=\"cust-check-bx marginT0\">\n                    <input type=\"checkbox\" [(ngModel)]=\"item.selected\" name=\"document\">\n                    <span class=\"checkmark\"></span>\n                    </label>\n                    <!-- <i class=\"fa\" [ngClass]=\"item.selected?'fa-check-square-o':'fa-square-o'\" (click)=\"item.selected = !item.selected\" aria-hidden=\"true\"></i> -->\n                </td>\n                <td routerLink=\"{{item.id}}\">\n                    <img class=\"rounded-circle\" *ngIf=\"item.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\"\n                              [defaultImage]=\"item.image| img:'thumb'\" [lazyLoad]=\"item.image\">\n                    <img class=\"rounded-circle\" *ngIf=\"!item.image\" src=\"assets/img/default_img.png\" alt=\"img\">\n                </td>\n                <td class=\"text-left\" routerLink=\"{{item.id}}\">\n                  <span class=\"name\">{{item.name | titlecase}}</span>\n                 </td>\n                 <td routerLink=\"{{item.id}}\" class=\"text-left\" *ngIf=\"item.phone\">{{item.dial_code}}-{{item.phone.trim()}}</td>\n                 <td routerLink=\"{{item.id}}\" class=\"text-left\" *ngIf=\"!item.phone\">NA</td>\n                <td routerLink=\"{{item.id}}\" class=\"text-left\">\n                    {{item.email}}\n                </td>\n                 <td routerLink=\"{{item.id}}\" class=\"text-left\">{{item.csr_seller_name?item.csr_seller_name:'NA'}}</td>\n                 <td class=\"text-left\" (click)=\"getCSRSellerChat($event, 1, item.assigned_csr_seller_id, item.id)\">\n                     <a class=\"green-color fontW500\" href=\"javascript://\">Chat with <br>Seller</a>\n                 </td>\n                 <td class=\"text-left\" (click)=\"getCSRSellerChat($event, 2, item.assigned_csr_seller_id, item.id)\">\n                    <a class=\"green-color fontW500\" href=\"javascript://\">Chat with <br>Agent</a>\n                </td>\n                 <td routerLink=\"{{item.id}}\">\n                  {{item.approved_count}}\n                 </td>\n                 <td routerLink=\"{{item.id}}\">\n                  {{item.rejected_count}}\n                 </td>\n                 <td routerLink=\"{{item.id}}\">\n                    {{item.pending_count}}\n                 </td>\n                 <td routerLink=\"{{item.id}}\">\n                    {{item.draft_count}}\n                 </td>\n                 <td routerLink=\"{{item.id}}\">\n                    {{item.total_count}}\n                 </td>\n              </tr>\n           </tbody></table>\n           <div class=\"padding20 center\" *ngIf=\"parameter.noResultFound\">\n                <img src=\"assets/img/404-error.png\">\n            </div>\n        </div>\n     </div>\n\n  </div>\n  </div>\n\n    <div class=\"btn-cont marginT15\" *ngIf=\"parameter.total\">\n        <div class=\"row\">\n            <div class=\"col-6\">\n                <div class=\"title-group\">\n                    <p>Showing {{items?.length}} out of {{parameter.total}}</p>\n                </div>\n            </div>\n            <div class=\"col-6 text-right\">\n                <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n            </div>\n        </div>\n    </div>\n</div>\n\n\n\n<!-- Assignment model -->\n<a data-toggle=\"modal\" data-target=\"#assign-model\" #openAssignModel></a>\n<div class=\"modal\" id=\"assign-model\">\n    <div class=\"modal-dialog \">\n        <div class=\"modal-content notary-avail\">\n            <div class=\"modal-header popup-header\">\n            <h4 class=\"modal-title\">Re Assign to</h4>\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #closeAssignModel>&times;</button>\n            </div>\n            <div class=\"modal-body\">\n                <div class=\"row\">\n                    <div class=\"col-md-8 col-6\">\n                        <input style=\"max-width:200px\" list=\"amenities\" [(ngModel)]=\"assign.keyword\" (keyup.enter)=\"getAssignListing()\" class=\"form-control\" type=\"text\" name=\"keyword\" placeholder=\"Search\">\n                    </div>\n                    <div class=\"col-md-4 col-5 btn-cont\">\n                        <a class=\"btn btn-primary pull-right\" href=\"javascript://\" (click)=\"assignNow()\">Assign</a>\n                    </div>\n                </div>\n                <div class=\"spacer40\"></div>\n                <div class=\"modal-table-data\" malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\">\n                    <table class=\"table\">\n                        <tr *ngFor=\"let item of assign.items\">\n                            <td *ngIf=\"item.is_blocked!=1\">\n                                <div class=\"n-avail-profile\">\n                                <!-- <img [src]=\"item.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\"> -->\n                                <img *ngIf=\"item.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\"\n                                    [defaultImage]=\"item.image| img:'thumb'\" [lazyLoad]=\"item.image\">\n                                <img *ngIf=\"!item.image\" src=\"assets/img/default_img.png\" alt=\"img\">\n                                <div class=\"n-avail-info\">\n                                    <p class=\"p12\">{{item.name | titlecase}}</p>\n                                    <p class=\"p10\">Phone : {{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}</p>\n                                </div>\n                                </div>\n                            </td>\n                            <td *ngIf=\"item.is_blocked!=1\">\n                                <label class=\"cust-check-bx float-right\">\n                                    <input type=\"radio\" name=\"notary_id\" (click)=\"assignItem = item\">\n                                    <span class=\"checkmark\"></span>\n                                </label>\n                            </td>\n                        </tr>\n                        <tr *ngIf=\"assign?.items?.length==0\">\n                            <p class=\"show-not-found\">No CSR Seller found.</p>\n                        </tr>\n                    </table>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n    "

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
    function CsrSellerComponent(admin, constant, route, router, spinner) {
        this.admin = admin;
        this.constant = constant;
        this.route = route;
        this.router = router;
        this.spinner = spinner;
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
    CsrSellerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.parameter.is_selected = false;
        this.parameter.keyword = '';
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        this.parameter.flag = 2;
        this.parameter.total = 0;
        this.parameter.count_flag = 1;
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
        this.parameter.count_flag = 1;
        this.resetDates();
        this.getListing();
        this.getCSRDashBoardData();
    };
    CsrSellerComponent.prototype.changeFilter = function (key, value) {
        this.parameter[key] = value;
        this.getListing();
    };
    CsrSellerComponent.prototype.changeCountFlag = function (flag) {
        this.parameter.count_flag = flag;
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
            _this.dash = r.data;
            _this.chartView = [
                {
                    'name': 'Lead Property pending',
                    'value': parseInt(_this.dash.lead_property_pending, 10)
                },
                {
                    'name': 'Lead with Property',
                    'value': parseInt(_this.dash.lead_with_property, 10)
                },
                {
                    'name': 'Lead without Property',
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
        this.admin.postDataApi('leads/csr-seller', input).subscribe(function (success) {
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
            swal('Error', 'Please choose atleast one lead.', 'error');
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
        var input = {
            csr_seller_id: this.assignItem.id,
            leads: leads_ids
        };
        this.spinner.show();
        this.admin.postDataApi('leads/bulkAssignSeller', input).subscribe(function (r) {
            _this.spinner.hide();
            swal('Success', 'Assigned successfully', 'success');
            _this.closeAssignModel.nativeElement.click();
            _this.getListing();
        }, function (error) {
            _this.spinner.hide();
            _this.closeAssignModel.nativeElement.click();
            swal('Error', error.error.message, 'error');
        });
    };
    CsrSellerComponent.prototype.getCSRSellerChat = function ($event, chat_with, csr_seller_id, lead_id) {
        // chat_with = 1 means chat with seller, 2 means chat with agent
        if (csr_seller_id) {
            this.router.navigate(['/dashboard/leads/chat-with-seller', chat_with, csr_seller_id, lead_id]);
        }
        else {
            swal('Error', 'No CSR Seller is assigned.', 'error');
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
            src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["Constant"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerService"]])
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

module.exports = ""

/***/ }),

/***/ "./src/app/layout/leads/data-collector/data-collector.component.html":
/*!***************************************************************************!*\
  !*** ./src/app/layout/leads/data-collector/data-collector.component.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n\n<div class=\"container-fluid\">\n    <div class=\"row\">\n        <div class=\"col-md-4\">\n            <div class=\"form-group\">\n                <p class=\"p16\">Manage Data Collector's Leads</p>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-md-4\">\n            <div class=\"form-group\" *ngIf=\"admin?.admin_acl['Data Collector Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n                <div class=\"d-flex\">\n                <!-- <button (click)=\"removeCsrUser()\" class=\"all-btn\">All</button> -->\n                <div class=\"autocomplete\">\n                    <input placeholder=\"Search Data Collector\" style=\"max-width:200px\" list=\"amenities\" [(ngModel)]=\"parameter.keyword\" (input)=\"getCsrListing()\" class=\"form-control\" type=\"text\" name=\"keyword\" (focusout)=\"closeCsrListing()\">\n                    <div id=\"myInputautocomplete-list\" class=\"autocomplete-items\">\n                        <div *ngFor=\"let item of users\" (click)=\"selectCsrUser(item)\">{{item.email}}</div>\n                    </div>\n                </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-md-8 col-12\">\n            <div class=\"cust-tabs-2\">\n                <ul class=\"nav nav-tabs\">\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==1}\" (click)=\"changeFlag(1)\" >This Week</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==2}\" (click)=\"changeFlag(2)\" >This Month</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==3}\" (click)=\"changeFlag(3)\" >Last Month</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==4}\" (click)=\"changeFlag(4)\" >Lifetime</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==5}\" (click)=\"parameter.flag=5\" >Custom</a>\n                </li>\n                </ul>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-12\">\n            <div *ngIf=\"parameter.flag == 5\" class=\"row\">\n                <div class=\"offset-lg-7\"></div>\n                <div class=\"col-lg-2 col-md-2 col-sm-5 col-5\">\n                <div class=\"form-group marginB0\">\n                    <label>From:</label>\n                    <p-calendar showIcon=\"true\" [(ngModel)]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n                </div>\n                </div>\n                <div class=\"col-lg-2 col-md-2 col-sm-5 col-5\">\n                <div class=\"form-group marginB0\">\n                    <label>To:</label>\n                    <p-calendar showIcon=\"true\" [(ngModel)]=\"parameter.max\" [minDate]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n                </div>\n                </div>\n                <div class=\"col-lg-1 col-md-2 col-sm-2 col-6\">\n                <div class=\"form-group btn-cont\">\n                    <label class=\"addMT3\">&nbsp;</label>\n                    <button class=\"btn btn-calender\" href=\"javascript://\" (click)=\"getListing(); getCSRDashBoardData();\"\n                        [disabled]=\"!parameter.min || !parameter.max\">Apply</button>\n                </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-md-2\">\n            <div class=\"form-group\">\n            <label>Country</label>\n            <select class=\"form-control\" (change)=\"onCountryChange($event.target.value)\">\n                <option value=\"0\">All</option>\n                <option *ngFor=\"let item of location.countries\" [value]=\"item.id\">{{item.name}}</option>\n            </select>\n            </div>\n        </div>\n        <div class=\"col-md-2\">\n            <div class=\"form-group\">\n            <label>State</label>\n            <select class=\"form-control\" (change)=\"onStateChange($event.target.value)\">\n                <option value=\"0\">All</option>\n                <option *ngFor=\"let item of location.states\" [value]=\"item.id\">{{item.name}}</option>\n            </select>\n            </div>\n        </div>\n        <div class=\"col-md-2\">\n            <div class=\"form-group\">\n            <label>City</label>\n                <select class=\"form-control\" (change)=\"onCityChange($event.target.value)\">\n                <option value=\"0\">All</option>\n                <option *ngFor=\"let item of location.cities\" [value]=\"item.id\">{{item.name}}</option>\n                </select>\n            </div>\n        </div>\n\n        <div class=\"col-md-2\">\n            <div class=\"form-group\">\n            <label>Locality</label>\n            <select class=\"form-control\" (change)=\"onLocalityChange($event.target.value)\">\n                <option value=\"0\">All</option>\n                <option *ngFor=\"let item of location.localities\" [value]=\"item.id\">{{item.name}}</option>\n            </select>\n            </div>\n        </div>\n\n        <div class=\"col-md-2\">\n            <div class=\"form-group btn-cont\">\n            <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n            <button type=\"button\" (click)=\"getListing(); getCSRDashBoardData();\" class=\"btn btn-primary-new width100P\">Apply</button>\n            </div>\n        </div>\n\n        <div class=\"col-md-2\">\n            <div class=\"form-group btn-cont\">\n            <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n            <button type=\"button\" (click)=\"resetFilters()\" class=\"btn btn-primary-new width100P\">Reset</button>\n            </div>\n        </div>\n    </div>\n\n    <div *ngIf=\"selectedUser as item\" class=\"sigle-row-table\">\n        <table class=\"table table-striped\">\n        <tbody><tr>\n            <td><img class=\"rounded-circle\" [src]=\"item.image| img:'small'\" onerror='this.src=\"assets/img/default_img.png\"' alt=\"img\"></td>\n            <td class=\"text-left\">\n                <span class=\"name\">{{item.name | titlecase}}</span>\n            </td>\n            <td class=\"text-left\">\n                {{item.phone}}\n            </td>\n            <td class=\"text-left\">\n                {{item.email}}\n            </td>\n            <td>\n                <a (click)=\"removeCsrUser()\" href=\"javascript://\" class=\"icon-block edit-icon\"><img src=\"assets/img/remove-icon.png\" alt=\"remove\" title=\"remove\" /></a>\n            </td>\n            </tr>\n        </tbody>\n        </table>\n  </div>\n\n  <div class=\"row\">\n      <div class=\"col-lg-4 col-md-12 col-sm-12 col-12\">\n        <div class=\"info-box\">\n            <div class=\"one-row\" [ngClass]=\"{'active':parameter.count_flag == '1'}\" (click)=\"changeCountFlag(1)\">\n              <div class=\"o-block\">\n                  <h5>Buildings</h5>\n                  <small>Requests Pending</small>\n              </div>\n              <div class=\"o-block\">\n                  <a class=\"view-all\" href=\"javascript://\">View All</a>\n                  <h4>{{dash.request_pending_total}}</h4>\n              </div>\n            </div>\n            <div class=\"three-row\">\n              <!-- <div class=\"t-block\" [ngClass]=\"{'active':parameter.count_flag == '2'}\" (click)=\"changeCountFlag(2)\">\n                  <p><strong>{{dash.request_pending_admin}}</strong></p>\n                  <p>Admin</p>\n              </div> -->\n              <div class=\"t-block\" [ngClass]=\"{'active':parameter.count_flag == '2'}\" (click)=\"changeCountFlag(2)\">\n                  <p><strong>{{dash.request_pending_admin}}</strong></p>\n                  <p>Admin/Data Collector</p>\n              </div>\n              <div class=\"t-block\" [ngClass]=\"{'active':parameter.count_flag == '3'}\" (click)=\"changeCountFlag(3)\">\n                  <p><strong>{{dash.request_pending_user}}</strong></p>\n                  <p>User</p>\n              </div>\n            </div>\n        </div>\n      </div>\n    <div class=\"col-lg-4 col-md-12 col-sm-12 col-12\">\n        <div class=\"four-block\">\n            <div class=\"d-flex\">\n              <div class=\"f-block approved\" [ngClass]=\"{'active':parameter.count_flag == '4'}\" (click)=\"changeCountFlagForBuilding(4)\">\n                  <h5>Approved</h5>\n                  <h3>{{dash.building_approved}}</h3>\n              </div>\n              <div class=\"f-block unapproved\" [ngClass]=\"{'active':parameter.count_flag == '5'}\" (click)=\"changeCountFlagForBuilding(5)\">\n                  <h5>Unapproved</h5>\n                  <h3>{{dash.building_unapproved}}</h3>\n              </div>\n            </div>\n            <div class=\"d-flex\">\n              <div class=\"f-block pending\" [ngClass]=\"{'active':parameter.count_flag == '6'}\" (click)=\"changeCountFlagForBuilding(6)\">\n                  <h5>Pending</h5>\n                  <h3>{{dash.building_pending}}</h3>\n              </div>\n              <div class=\"f-block unapproved\" [ngClass]=\"{'active':parameter.count_flag == '7'}\" (click)=\"changeCountFlagForBuilding(7)\">\n                  <h5>In Draft</h5>\n                  <h3>{{dash.building_draft}}</h3>\n              </div>\n            </div>\n        </div>\n      </div>\n      <div class=\"col-lg-4 col-md-12 col-sm-12 col-12\">\n            <div class=\"chat-msg all-leads\" style=\"padding:0px;height:185px;\">\n                <div class=\"padding20\" *ngIf=\"dash?.request_pending_total == 0\">No records found</div>\n                <ngx-charts-pie-chart [results]=\"chartView\"></ngx-charts-pie-chart>\n            </div>\n      </div>\n  </div>\n\n  <div class=\"row\">\n      <div class=\"col-12\">\n        <div class=\"spacer40\"></div>\n      </div>\n      <div class=\"col-lg-6 col-md-6 col-6\">\n        <div class=\"title-group\">\n            <h5>Leads\n                <span *ngIf=\"parameter.count_flag == 1\">(Total Request)</span>\n                <span *ngIf=\"parameter.count_flag == 2\">(Admin Request)</span>\n                <span *ngIf=\"parameter.count_flag == 3\">(User Request)</span>\n                <span *ngIf=\"parameter.count_flag == 4\">(Approved)</span>\n                <span *ngIf=\"parameter.count_flag == 5\">(Unapproved)</span>\n                <span *ngIf=\"parameter.count_flag == 6\">(Pending)</span>\n                <span *ngIf=\"parameter.count_flag == 7\">(In Draft)</span>\n            </h5>\n            <p>\n            <!-- Showing {{parameter.page}} out of {{parameter.total_count}} -->\n            </p>\n        </div>\n      </div>\n      <div class=\"col-lg-6 col-md-6 col-5\" *ngIf=\"admin?.admin_acl['Data Collector Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n            <div class=\"add-new text-right\">\n                <a class=\"btn\" (click)=\"bulkAssign()\" href=\"javascript://\">Bulk Re-assign</a>\n            </div>\n        </div>\n  </div>\n\n  <div class=\"white-bg\">\n        <div class=\"tabel-section\">\n           <div class=\"table-responsive\">\n              <table class=\"table table-striped table-align-left vertical-align-top border-0\">\n                 <tr>\n                        <!-- class=\"border-top-0\" -->\n                    <th *ngIf=\"admin?.admin_acl['Data Collector Lead Management']?.can_read==1 && !this.parameter.assignee_id\" style=\"width:6%\">\n                        <div class=\"table-search\">\n                            <label>All</label>\n                            <div>\n                                <label class=\"cust-check-bx\" >\n                                    <input class=\"width1\" type=\"checkbox\" (click)=\"selectAll(parameter.is_selected)\" name=\"document\">\n                                    <span class=\"checkmark\"></span>\n                                </label>\n                            </div>\n                        </div>\n                    </th>\n\n                    <!-- <th>Image</th> -->\n                    <th style=\"width:15%\">\n                        <div class=\"table-search\">\n                        <label>Name of Building</label>\n                        <div class=\"searh-3\">\n                            <input autocomplete=\"off\" type=\"text\" name=\"name\" [(ngModel)]=\"parameter.name\" (keyup.enter)=\"getListing()\">\n                            <button *ngIf=\"parameter.name\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                        </div>\n                        </div>\n                    </th>\n                    <th style=\"width:20%; text-align:left;\">\n                        <div class=\"table-search\">\n                        <label>Address</label>\n                        <div class=\"searh-3\">\n                            <input autocomplete=\"off\" type=\"text\" name=\"name\" [(ngModel)]=\"parameter.location\" (keyup.enter)=\"getListing()\">\n                            <button *ngIf=\"parameter.address\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                        </div>\n                        </div>\n                    </th>\n                    <th style=\"width:15%\">\n                        <div class=\"table-search\">\n                        <label>Developer</label>\n                        <div class=\"searh-3\">\n                            <input autocomplete=\"off\" type=\"text\" name=\"name\" [(ngModel)]=\"parameter.developer\" (keyup.enter)=\"getListing()\">\n                            <button *ngIf=\"parameter.email\" (click)=\"getListing()\"><i class=\"fa fa-search\"></i></button>\n                        </div>\n                        </div>\n                    </th>\n                    <th style=\"width:20%;\">\n                        <div class=\"table-search\">\n                            <label>Contact <br>Email</label>\n                        </div>\n                    </th>\n                    <!-- show collector name in case of 1,2,3 -->\n                    <th style=\"width:14%\" *ngIf=\"parameter.count_flag==1 || parameter.count_flag==2 || parameter.count_flag==3\">\n                        <div class=\"table-search\">\n                            <label>Assignee</label>\n                        </div>\n                    </th>\n                    <!-- mark complete only when it is request - 1,2,3 -->\n                    <th style=\"width:15%\" *ngIf=\"parameter.count_flag==1 || parameter.count_flag==2 || parameter.count_flag==3\">\n                        <div class=\"table-search\">\n                            <label>Mark<br>Complete</label>\n                        </div>\n                    </th>\n                    <!-- use request details to create project -->\n                    <th style=\"width:4%\" *ngIf=\"parameter.count_flag==1 || parameter.count_flag==2 || parameter.count_flag==3\">\n                        <div class=\"table-search\">\n                            <label>Use template</label>\n                        </div>\n                    </th>\n                    <th style=\"width:9%\" *ngIf=\"parameter.count_flag==4 || parameter.count_flag==5 || parameter.count_flag==6 || parameter.count_flag==7\">\n                        <div class=\"table-search\">\n                            <label>Edit<br>Details</label>\n                        </div>\n                    </th>\n                 </tr>\n                 <tr *ngFor=\"let item of items| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: parameter.total }; let i=index\">\n                    <!-- <td>\n                        <a href=\"javascript://\"><img *ngIf=\"item.image\" class=\"rounded-circle\" [src]=\"item.image\" alt=\"img\">\n                        <img *ngIf=\"!item.image\" class=\"rounded-circle\" src=\"assets/img/default_img.png\" alt=\"img\">\n                        </a>\n                    </td> -->\n                    <td *ngIf=\"admin?.admin_acl['Data Collector Lead Management']?.can_read==1 && !this.parameter.assignee_id\" (click)=\"$event.stopPropagation()\">\n                        <label class=\"cust-check-bx\">\n                        <input type=\"checkbox\" [(ngModel)]=\"item.selected\" name=\"document\">\n                        <span class=\"checkmark\"></span>\n                        </label>\n                    </td>\n                    <td><strong>{{item?.name | titlecase}}</strong></td>\n                    <td>{{item?.address}}</td>\n                    <!-- dev name -->\n                    <td *ngIf=\"parameter.count_flag==1 || parameter.count_flag==2 || parameter.count_flag==3\">\n                        <span>{{item?.dev_name}}</span>\n                        <span *ngIf=\"!item?.dev_name\" >NA</span>\n                    </td>\n                    <td *ngIf=\"parameter.count_flag==4 || parameter.count_flag==5 || parameter.count_flag==6 || parameter.count_flag==7\">\n                        <span>{{item?.developer?.name | titlecase}}</span>\n                        <span *ngIf=\"!item?.developer?.name\" >NA</span>\n                    </td>\n                    <!-- dev phone & email -->\n                    <td *ngIf=\"parameter.count_flag==1 || parameter.count_flag==2 || parameter.count_flag==3\">\n                        <span *ngIf=\"item.dev_phone\">{{item?.dev_countrycode ? item.dev_countrycode : constant.dial_code}}-{{item?.dev_phone}}</span>\n                        <span *ngIf=\"!item.dev_phone\">NA</span>\n                        <br>\n                        <span *ngIf=\"item.dev_email\">{{item?.dev_email}}</span>\n                        <span *ngIf=\"!item.dev_email\">NA</span>\n                    </td>\n                    <td *ngIf=\"parameter.count_flag==4 || parameter.count_flag==5 || parameter.count_flag==6 || parameter.count_flag==7\">\n                        <span *ngIf=\"item?.developer?.phone\">{{item?.developer?.dial_code ? item?.developer?.dial_code : constant.dial_code}}-{{item?.developer?.phone}}</span>\n                        <span *ngIf=\"!item?.developer?.phone\">NA</span>\n                        <br>\n                        <span *ngIf=\"item?.developer?.email\">{{item?.developer?.email}}</span>\n                        <span *ngIf=\"!item?.developer?.email\">NA</span>\n                    </td>\n                    <!-- show collector name in case of 1,2,3 -->\n                    <td *ngIf=\"parameter.count_flag==1 || parameter.count_flag==2 || parameter.count_flag==3\">\n                        {{item?.collector?.name | titlecase}}\n                    </td>\n                    <td style=\"vertical-align:middle;\" *ngIf=\"parameter.count_flag==1 || parameter.count_flag==2 || parameter.count_flag==3\">\n                        <a title=\"Completed\" *ngIf=\"item.status==1\" style=\"cursor:auto;\" class=\"green-color fontW500\" href=\"javascript://\">Completed</a>\n                        <a style=\"cursor:auto;\" *ngIf=\"admin?.admin_acl['Data Collector Lead Management']?.can_update==0 || admin?.permissions?.can_data_collector==0\" class=\"green-color fontW500\" href=\"javascript://\">Mark Complete</a>\n                        <a title=\"Mark Complete\" *ngIf=\"item.status==0 && (admin?.admin_acl['Data Collector Lead Management']?.can_update==1 || admin?.permissions?.can_data_collector==1)\" class=\"green-color fontW500\" (click)=\"changeStatus(item, 1)\" href=\"javascript://\">Mark Complete</a>\n                    </td>\n                    <!-- add project - use request details as template -->\n                    <td *ngIf=\"parameter.count_flag==1 || parameter.count_flag==2 || parameter.count_flag==3\">\n                        <button [disabled]=\"admin?.admin_acl['Data Collector Lead Management']?.can_update==0 || admin?.permissions?.can_data_collector==0\" routerLink=\"/dashboard/projects/edit-building-request/{{item.id}}\" title=\"Create Project\" class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></button>\n                    </td>\n                    <!-- edit project in case of 4,5,6,7 -->\n                    <td *ngIf=\"parameter.count_flag==4 || parameter.count_flag==5 || parameter.count_flag==6 || parameter.count_flag==7\">\n                        <!-- unapprove => when status=2(pending), 1(approved) && not in draft-->\n                        <a style=\"display:none;\" #modalOpen data-toggle=\"modal\" data-target=\"#addNote\"></a>\n                        <button (click)=\"openCancellationModal(item, i)\" [disabled]=\"admin?.admin_acl['Data Collector Lead Management']?.can_update==0\" \n                        *ngIf=\"(item.status == 1 || item.status==2) && parameter.count_flag!=7\" class=\"action-icon\" title=\"Unapprove\"><img src=\"assets/img/ic_disapprove.png\" alt=\"img\"></button>\n                        <!-- approve => when status=2(pending), 4(rejected) && not in draft-->\n                        <button [disabled]=\"admin?.admin_acl['Data Collector Lead Management']?.can_update==0\" \n                        *ngIf=\"(item.status == 2 || item.status == 4) && parameter.count_flag!=7\" (click)=\"approveProject(item, 1);\" class=\"action-icon\" title=\"Approve\"><img src=\"assets/img/tick.png\" alt=\"img\"></button>\n                        <button [disabled]=\"admin?.admin_acl['Data Collector Lead Management']?.can_update==0 || admin?.permissions?.can_data_collector==0\" routerLink=\"/dashboard/projects/edit-project/{{item.id}}\" title=\"Edit Details\" class=\"action-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></button>\n                    </td>\n                 </tr>\n              </table>\n                <div class=\"padding20 center\" *ngIf=\"parameter.noResultFound\">\n                    <img src=\"assets/img/404-error.png\">\n                </div>\n           </div>\n        </div>\n     </div>\n\n    \n    <div class=\"btn-cont marginT15\" *ngIf=\"parameter.total\">\n        <div class=\"row\">\n            <div class=\"col-6\">\n                <div class=\"title-group\">\n                    <p>Showing {{items?.length}} out of {{parameter.total}}</p>\n                </div>\n            </div>\n            <div class=\"col-6 text-right\">\n                <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n            </div>\n        </div>\n    </div>\n</div>\n\n\n<!-- Assignment model -->\n<a data-toggle=\"modal\" data-target=\"#assign-model\" #openAssignModel></a>\n<div class=\"modal\" id=\"assign-model\">\n        <div class=\"modal-dialog \">\n            <div class=\"modal-content notary-avail\">\n                <div class=\"modal-header popup-header\">\n                <h4 class=\"modal-title\">Re Assign to</h4>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #closeAssignModel>&times;</button>\n                </div>\n                <div class=\"modal-body\">\n                    <div class=\"row\">\n                        <div class=\"col-md-8 col-6\">\n                            <input style=\"max-width:200px\" list=\"amenities\" [(ngModel)]=\"assign.keyword\" (keyup.enter)=\"getAssignListing()\" class=\"form-control\" type=\"text\" name=\"keyword\" placeholder=\"Search\">\n                        </div>\n                        <div class=\"col-md-4 col-6 btn-cont\">\n                            <a class=\"btn btn-primary pull-right\" href=\"javascript://\" (click)=\"assignNow()\">Assign</a>\n                        </div>\n                    </div>\n                    <div class=\"spacer40\"></div>\n                    <div class=\"modal-table-data\" malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\">\n                        <table class=\"table\">\n                            <tr *ngFor=\"let item of assign.items\">\n                                <td *ngIf=\"item.is_blocked!=1\">\n                                    <div class=\"n-avail-profile\">\n                                    <img [src]=\"item.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\">\n                                    <div class=\"n-avail-info\">\n                                        <p class=\"p12\">{{item.name | titlecase}}</p>\n                                        <p class=\"p10\">Phone : {{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}</p>\n                                    </div>\n                                    </div>\n                                </td>\n                                <td *ngIf=\"item.is_blocked!=1\">\n                                    <label class=\"cust-check-bx float-right\">\n                                        <input type=\"radio\" name=\"notary_id\" (click)=\"assignItem = item\">\n                                        <span class=\"checkmark\"></span>\n                                    </label>\n                                </td>\n                            </tr>\n                            <tr *ngIf=\"assign?.items?.length==0\">\n                                <p class=\"show-not-found\">No Data Collector found.</p>\n                            </tr>\n                        </table>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n\n\n<div class=\"modal animated\" id=\"addNote\">\n    <div class=\"modal-dialog fadeIndown\">\n        <div class=\"modal-content\">\n        <div class=\"modal-header modal-header-new\">\n            <h4 class=\"modal-title\">Add Reason</h4>\n            <button style=\"display: none;\" type=\"button\" class=\"close\" data-dismiss=\"modal\" #modalClose>&times;</button>\n            <button type=\"button\" class=\"close\" (click)=\"closeModal()\">&times;</button>\n        </div>\n    \n        <form class=\"form-horizontal form-model0P form-model-newP\" role=\"form\" ngNativeValidate #addForm=\"ngForm\" (ngSubmit)=\"rejectProject(4); addForm.reset();\">\n            <div class=\"modal-body modal-body-new\">\n            <div class=\"row\">\n                <div class=\"col-12\">\n                <div class=\"form-group-2\">\n                    <div class=\"form-group\">\n                        <textarea rows=\"4\" required class=\"form-control note\" name=\"reason\" [(ngModel)]=\"reason\"></textarea>\n                    </div>\n                </div>\n                </div>\n                <div class=\"col-12\">\n                    <div class=\"btn-cont text-right\">\n                        <button type=\"submit\" [disabled]=\"!addForm.valid\" class=\"btn btn-primary\">Add</button>\n                    </div>\n                </div>\n            </div>\n            </div>\n        </form>\n        </div>\n    </div>\n    </div>"

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
    function DataCollectorComponent(admin, constant, spinner) {
        this.admin = admin;
        this.constant = constant;
        this.spinner = spinner;
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
        this.parameter.is_selected = false;
        this.parameter.keyword = '';
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        this.parameter.flag = 2;
        this.parameter.total = 0;
        this.parameter.count_flag = 1;
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
                    'name': 'Leads (Information filled)',
                    'value': parseInt(_this.dash.request_pending_admin, 10)
                },
                {
                    'name': 'Leads (With agent assigned)',
                    'value': parseInt(_this.dash.request_pending_csr, 10)
                },
                {
                    'name': 'Leads (Without agent assigned)',
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
            swal('Error', error.error.message, 'error');
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
            swal('Error', 'Please choose atleast one lead.', 'error');
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
            swal('Success', 'Assigned successfully', 'success');
            _this.closeAssignModel.nativeElement.click();
            _this.getListing();
        }, function (error) {
            _this.spinner.hide();
            _this.closeAssignModel.nativeElement.click();
            swal('Error', error.error.message, 'error');
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
            swal('Error', 'You cannot approve the building as some of details are missing.', 'error');
            return false;
        }
        item.status = status;
        this.admin.postDataApi('approveProject', { building_id: item.id }).subscribe(function (r) {
            _this.getCSRDashBoardData();
            swal('Success', 'Project approved successfully.', 'success');
        }, function (error) {
            swal('Error', error.error.message, 'error');
        });
    };
    DataCollectorComponent.prototype.rejectProject = function (status) {
        var _this = this;
        this.items[this.parameter.index].status = status;
        this.admin.postDataApi('rejectProject', { building_id: this.parameter.building_id, reason: this.reason }).subscribe(function (r) {
            swal('Success', 'Project unapproved successfully.', 'success');
            _this.getCSRDashBoardData();
            _this.closeModal();
        }, function (error) {
            swal('Error', error.error.message, 'error');
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
            src_app_common_constants__WEBPACK_IMPORTED_MODULE_3__["Constant"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_2__["NgxSpinnerService"]])
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

module.exports = ""

/***/ }),

/***/ "./src/app/layout/leads/inhouse-broker/inhouse-broker-detail/inhouse-broker-detail.component.html":
/*!********************************************************************************************************!*\
  !*** ./src/app/layout/leads/inhouse-broker/inhouse-broker-detail/inhouse-broker-detail.component.html ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container-fluid\">\n  <div class=\"white-bg padding15\">\n     <div class=\"row\">\n      <div class=\"col-lg-3 col-md-12 col-sm-12 col-12\">\n         <div class=\"df-profile\">\n            <a routerLink=\"../\"><i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i></a>\n            <img [src]=\"leadData?.user?.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\">\n            <div class=\"df-info\">\n                <p class=\"p14 text-ellipsis120\">{{leadData?.user?.name ? leadData?.user?.name : leadData?.name}}</p>\n                <p class=\"p12\">\n                    {{leadData?.user?.dial_code ? leadData?.user?.dial_code : leadData?.dial_code}}-{{leadData?.user?.phone ? leadData?.user?.phone : leadData?.phone}}\n                </p>\n            </div>\n        </div>\n      </div>\n      <div class=\"col-lg-7 col-md-12 col-sm-6 col-12\">\n          <div class=\"profile-list\">\n          <ul>\n              <li>\n                  <div class=\"df-info\">\n                      <p class=\"p14 marginB0\" *ngIf=\"leadData?.admin\">{{leadData.admin.name | titlecase}}</p>\n                      <p class=\"p12\">CSR Buyer</p>\n                  </div>\n              </li>\n              <li>\n                  <div class=\"df-info\" *ngIf=\"leadData?.broker\">\n                      <p class=\"p14 marginB0\">{{leadData.broker.name | titlecase}}</p>\n                      <p class=\"p12\">{{leadData?.broker?.is_external_agent==1 ? 'Outside Agent' : 'Inhouse Agent'}}</p>\n                  </div>\n              </li>\n              <li>\n                  <div class=\"df-info\" *ngIf=\"leadData?.closer\">\n                      <p class=\"p14 marginB0\">{{leadData?.closer?.name | titlecase}}</p>\n                      <p class=\"p12\">CSR Closure</p>\n                  </div>\n              </li>\n          </ul>\n          </div>\n      </div>\n      \n\n      <!-- <div class=\"col-lg-4 col-md-12 col-sm-12 col-12\">\n            <div class=\"row\">\n                <div class=\"col-sm-7 col-6 btn-cont\">\n                    <a *ngIf=\"is_deal_finalised\" style=\"cursor: auto;\" class=\"btn btn-fourth\" href=\"javascript://\">Deal Finalized</a>\n                </div>\n                <div class=\"col-sm-5 col-6 btn-cont\">\n                    <a (click)=\"getInvoice()\" class=\"btn btn-fourth\" href=\"javascript://\">Invoice</a>\n                </div>\n            </div>\n        </div> -->\n    \n\n    <div class=\"col-lg-2 col-md-12 col-sm-12 col-12\">\n        <div class=\"row\">\n            <div class=\"col-sm-12 col-6 btn-cont\">\n                <a (click)=\"getInvoice()\" class=\"btn btn-fourth\" href=\"javascript://\">Invoice</a>\n                <!-- <button type=\"button\" class=\"btn btn-primary-new dropdown-toggle\" data-toggle=\"dropdown\">\n                 Action\n               </button>\n               <div class=\"dropdown-menu dropdown-menu-right\">\n                 <a *ngIf=\"is_deal_finalised\" (click)=\"getInvoice()\" class=\"dropdown-item\" href=\"javascript://\">Download Invoice</a>\n               </div> -->\n            </div>\n        </div>\n    </div>\n\n     </div>\n  </div>\n  <div class=\"spacer30\"></div>\n  <div class=\"row\">\n     <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\">\n        <div class=\"white-bg padding30\">\n           <div class=\"row\">\n              <div class=\"col-md-6\">\n                 <h6>Details</h6>\n              </div>\n              <div class=\"col-md-6\">\n                <h6 class=\"pull-right greenh6\" *ngIf=\"is_deal_finalised\">Deal Finalized</h6>\n                    <!-- <div class=\"btn-cont\">\n                        <a *ngIf=\"is_deal_finalised\" style=\"cursor: auto;\" class=\"btn btn-fourth\" href=\"javascript://\">Deal Finalized</a>\n                    </div> -->\n                 <!-- <div class=\"edit text-right\"><a href=\"javascript://\">Edit</a></div> -->\n              </div>\n           </div>\n           <div class=\"details-table\">\n             <table class=\"table\">\n                <tbody><tr>\n                   <td style=\"padding-left:0\"><label>Full Name</label></td>\n                   <td *ngIf=\"leadData?.name\">{{leadData.user.name | titlecase}}</td>\n                </tr>\n                <tr>\n                   <td style=\"padding-left:0\"><label>Contact Number</label></td>\n                   <td *ngIf=\"leadData?.phone\">{{leadData.user.dial_code ? leadData.user.dial_code : constant.dial_code}}-{{leadData.phone}}</td>\n                </tr>\n                <tr>\n                   <td style=\"padding-left:0\"><label>Email address</label></td>\n                   <td *ngIf=\"leadData?.email\">{{leadData.user.email}}</td>\n                </tr>\n                <tr>\n                   <td style=\"padding-left:0\"><label>Interested In</label></td>\n                   <td *ngIf=\"leadData?.configuration\">\n                     <span *ngFor=\"let conf of leadData.configuration; let ii=index\">\n                        <app-property-configuration *ngIf=\"conf\" [configuration]=\"conf\"></app-property-configuration>\n                        <span *ngIf=\"ii<leadData?.configuration?.length-1\"> | </span> <br>\n                     </span>\n                     <span *ngIf=\"leadData.configuration?.length==0\">NA</span>\n                   </td>\n                </tr>\n                <tr>\n                   <td style=\"padding-left:0\"><label>Favorite Properties</label></td>\n                   <td>{{parameter.fav_properties_count}} \n                      <a style=\"display: none;\" data-toggle=\"modal\" #showPropertyModal data-target=\"#view-fav-property\" class=\"view-all\" href=\"javascript://\">View All</a>\n                      <a *ngIf=\"parameter.fav_properties_count\" class=\"view-all\" href=\"javascript://\" (click)=\"viewFavProperties()\">View All</a>\n                    </td>\n                </tr>\n\n                <!-- Meeting Schedule -->\n                <tr *ngIf=\"leadData?.sale_rent==1\">\n                    <td  style=\"padding-left:0\"><label><strong>Meeting Schedule</strong></label></td>\n                    <td colspan=\"2\">\n                        <p style=\"display:none;\" class=\"date\" #modalOpen data-toggle=\"modal\" data-target=\"#set_appointment\">Click to Schedule</p>\n                        <p class=\"date cursor-pointer\" (click)=\"openModal()\">Click to Schedule</p>\n                        <p *ngFor=\"let na of data; let m=index\" class=\"date\">\n                            <span *ngIf=\"m<2\">{{na.appointment_date | moment}}</span>\n                        </p>\n                        <span class=\"read-more\" *ngIf=\"data.length>2\" data-toggle=\"modal\" data-target=\"#get-availability1\">View all</span>\n                    </td>\n                    <!-- <ng-template #noAvailability1>\n                        <td colspan=\"2\"><p>No meeting scheduled by you.</p></td>\n                    </ng-template> -->\n                </tr>\n\n                <!-- <tr *ngIf=\"leadData?.sale_rent==1\">\n                    <td  style=\"padding-left:0\"><label><strong>Meeting Schedule</strong></label></td>\n                    <td colspan=\"2\" class=\"cursor-pointer\">\n                        <p style=\"display:none;\" class=\"date\" #modalOpen data-toggle=\"modal\" data-target=\"#set_appointment\">Click to Schedule</p>\n                        <p class=\"date\" (click)=\"openModal()\">Click to Schedule</p>\n                    </td>\n                </tr> -->\n              </tbody>\n             </table>\n           </div>\n        </div>\n\n        <div class=\"spacer30\"></div>\n        <div>\n            <div class=\"white-bg move-below\">\n                <div class=\"page-title-3 marginB0\">\n                    <h4><i><img src=\"assets/img/chat-icon.png\" alt=\"img\"></i> Chat</h4>\n                </div>\n                <div class=\"cust-tabs-4\">\n                    <app-chat-tabs *ngIf=\"leadData?.user\" [lead_id]=\"parameter.lead_id\" [sent_as]=\"parameter.sent_as\"\n                        [user_id]=\"parameter.user_id\" [admin_id]=\"parameter.admin_id\" [leadData]=\"leadData\">\n                    </app-chat-tabs>\n                </div>\n            </div>\n        </div>\n\n     </div>\n     <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\">\n        <!-- chat with developer -->\n        <div class=\"white-bg chat-with-developer padding15\">\n           <i class=\"float-left marginR15\"><img src=\"assets/img/chat-icon.png\" alt=\"img\"></i>\n           <a href=\"javascript://\" routerLink=\"/dashboard/leads/chat-list/1/{{parameter.lead_id}}\">Chat with Seller <i class=\"fa fa-angle-right\"></i></a>\n        </div>\n\n        <!-- chat with csr seller -->\n        <div class=\"white-bg chat-with-developer padding15\">\n            <i class=\"float-left marginR15\"><img src=\"assets/img/chat-icon.png\" alt=\"img\"></i>\n            <a href=\"javascript://\" routerLink=\"/dashboard/leads/chat-list/2/{{parameter.lead_id}}\">Chat with CSR Seller<i class=\"fa fa-angle-right\"></i></a>\n        </div>\n        \n        <!-- <app-fill-information [sent_as]=\"parameter.sent_as\" [fillInfo]=\"fillInfo\" [lead_id]=\"parameter.lead_id\"></app-fill-information> -->\n        <app-fill-information [sent_as]=\"parameter.sent_as\" [leadData]=\"leadData\"\n                [selectedAmenities]=\"selectedAmenities\" [allAmenities]=\"allAmenities\"\n                [lead_id]=\"parameter.lead_id\" [showOtherTextBox]=\"showOtherTextBox\">\n        </app-fill-information>\n        \n        <app-notes [sent_as]=\"parameter.sent_as\" [lead_id]=\"parameter.lead_id\"></app-notes>\n\n        <!-- <div class=\"spacer30\"></div>\n        <div class=\"white-bg padding15\">\n            <p class=\"p16 marginB0\">Chat with CSR Buyer</p>\n        </div>\n        <hr class=\"margin0\">\n        <div *ngIf=\"leadData?.user\">\n            <app-chat [lead_id]=\"parameter.lead_id\" [sent_as]=\"parameter.sent_as\" [user_id]=\"parameter.user_id\" [admin_id]=\"parameter.admin_id\"></app-chat>\n        </div> -->\n     </div>\n  </div>\n\n  <!-- Interested Properties start -->\n  <!-- <app-interested-property (deal_finalised_success)=\"dealFinalisedReceived(v)\" [is_deal_finalised]=\"is_deal_finalised\" [selected_properties]=\"leadData?.selected_properties\" [lead_id]=\"parameter.lead_id\" [interested_properties]=\"parameter.interested_properties\" [sent_as]=\"parameter.sent_as\"></app-interested-property> -->\n  <app-interested-property [is_deal_finalised]=\"is_deal_finalised\" [selected_properties]=\"leadData?.selected_properties\" [lead_id]=\"parameter.lead_id\" [interested_properties]=\"parameter.interested_properties\" [sent_as]=\"parameter.sent_as\"></app-interested-property>\n  <!-- Interested Properties end -->\n\n  <!-- viewed property or projects start -->\n  <app-viewed-property [user_id]=\"leadData?.user_id\" [viewed_properties]=\"parameter.viewed_properties\"></app-viewed-property>\n  <!-- viewed property or projects end -->\n\n  <!-- viewed projects start -->\n  <app-viewed-projects [user_id]=\"leadData?.user_id\" [viewed_projects]=\"parameter.viewed_projects\"></app-viewed-projects>\n  <!-- viewed projects end -->\n</div>\n\n\n<!-- show fav properties -->\n<div class=\"modal\" id=\"view-fav-property\">\n    <div class=\"modal-dialog  modal-lg\">\n        <div class=\"modal-content\">\n        <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n        </div>\n        <div class=\"modal-body\">\n            <h3>Favorite Properties</h3>\n            <hr>\n            <pagination-controls id=\"page2\" class=\"my-pagination\" (pageChange)=\"getPage2($event)\"></pagination-controls>\n    \n            <div class=\"scrollbox fav-prop\" malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\">\n            <div class=\"row\">\n                <div class=\"col-lg-6 col-md-12 col-sm-12 col-12\"\n                *ngFor=\"let x of parameter.favorites| paginate: { id: 'page2', itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page2, totalItems: parameter.total2 }; let in=index\">\n                <div class=\"project-des-bx white-bg-2\">\n                    <div class=\"price\" *ngIf=\"x\">\n                    <p class=\"p10\">{{x.for_sale==1 ? ts.lang.Buy : 'Rent'}}</p>\n                    </div>\n                    <div class=\"fig-block\">\n                    <img [src]=\"x.image| img:'thumb'\" onerror='src=\"assets/img/bank.png\"' alt=\"img\">\n                    </div>\n                    <div class=\"project-des-content\">\n                        <small title=\"Apartment\">{{x?.name}}</small>\n                    <a title=\"Building\" routerLink=\"/dashboard/properties/details/{{x?.id}}\">\n                        <h5>{{x?.building?.name.slice(0, 15)}}</h5>\n                    </a>\n                    <p class=\"p12\">{{x.building.address.slice(0, 40)}}</p>\n                    <p class=\"p13\" *ngIf=\"x\">\n                        <app-property-configuration *ngIf=\"x.configuration\" [configuration]=\"x.configuration\"></app-property-configuration>\n                        <span>&middot; {{x.property_type.name}}</span>\n                    </p>\n                    <p class=\"p13\">\n                        {{x.min_price | price}}\n                    </p>\n                    </div>\n                </div>\n                </div>\n            </div>\n            </div>\n        </div>\n        </div>\n    </div>\n</div>\n\n\n<!-- add inhouse user modal -->\n<div class=\"modal animated\" id=\"set_appointment\">\n    <!-- <div class=\"modal-dialog fadeIndown\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header modal-header-new\">\n                <h4 class=\"modal-title\">Schedule Appointment</h4>\n                <button type=\"button\" style=\"display: none;\" class=\"close\" data-dismiss=\"modal\" #modalClose>&times;</button>\n                <button type=\"button\" class=\"close\" (click)=\"closeModal()\">&times;</button>\n            </div>\n    \n            <form class=\"form-horizontal form-model0P\" role=\"form\" ngNativeValidate #addForm=\"ngForm\" (ngSubmit)=\"add()\">\n            <div class=\"modal-body modal-body-new\">\n                <div class=\"row\">\n                    <div class=\"col-10\">\n                        <p-calendar title=\"Click to add\" name=\"app\" [(ngModel)]=\"appointment.appointment_date\" [minDate]=\"today\" showButtonBar=\"true\" showTime=\"true\" hourFormat=\"12\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n                    </div>\n                    <div class=\"col-2\">\n                        <div class=\"form-group-2\">\n                            <a *ngIf=\"!appointment.id && appointment.appointment_date\" class=\"green-color fontW500\" (click)=\"add()\" href=\"javascript://\">Save</a>\n                            <a *ngIf=\"appointment.id\" class=\"green-color fontW500\" (click)=\"add()\" href=\"javascript://\">Edit</a>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            </form>\n        </div>\n    </div> -->\n    <div class=\"modal-dialog fadeIndown\">\n        <div class=\"modal-dialog fadeIndown\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header modal-header-new\">\n                        <h4 class=\"modal-title\">Schedule Meeting</h4>\n                    <button type=\"button\" style=\"display: none;\" class=\"close\" data-dismiss=\"modal\" #modalClose>&times;</button>\n                    <button type=\"button\" class=\"close\" (click)=\"closeModal()\">&times;</button>\n                </div>\n        \n                <form class=\"form-horizontal form-model0P\" role=\"form\" ngNativeValidate #addForm=\"ngForm\" (ngSubmit)=\"add()\">\n                <div class=\"modal-body padding0\">\n                    <div class=\"row\">\n                        <div class=\"col-8\">\n                            <label>Choose Date & Time</label>\n                            <p-calendar title=\"Click to add\" name=\"app\" [(ngModel)]=\"date\" [minDate]=\"today\" showButtonBar=\"true\" showTime=\"true\" hourFormat=\"12\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n                        </div>\n                        <div class=\"col-2\">\n                            <div class=\"form-group-2\">\n                                <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n                                <a class=\"green-color fontW500\" href=\"javascript://\" (click)=\"addDateTime()\">Add</a>\n                            </div>\n                        </div>\n                    </div>\n                    <!-- <div class=\"row\" *ngFor=\"let d of data; let j=index\">\n                        <div class=\"col-8\">\n                            <label class=\"notary-ava\">{{d.appointment_date | moment}}</label>\n                        </div>\n                        <div class=\"col-2\">\n                            <a class=\"green-color fontW500\" (click)=\"deleteAppointment(d.id, j)\" href=\"javascript://\">\n                                Remove\n                            </a>\n                        </div>\n                    </div> -->\n                    <div class=\"row\" *ngFor=\"let a of appointment.appointment_date_array; let i=index\">\n                        <div class=\"col-8\">\n                            <label class=\"notary-ava\">{{a|date:'h:mm a'|lowercase}}, {{a|date: 'MMM d y'}}</label>\n                        </div>\n                        <div class=\"col-2\">\n                            <a class=\"green-color fontW500\" (click)=\"removeAppointment(i)\" href=\"javascript://\">\n                                Remove\n                            </a>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-8\"></div>\n                        <div class=\"col-2\">\n                            <div class=\"btn-cont text-right\">\n                                <button type=\"submit\" class=\"btn btn-primary-new\">Save</button>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                </form>\n        \n            </div>\n        </div>\n    </div>\n</div>\n\n\n<div class=\"modal animated\" id=\"get-availability1\">\n    <div class=\"modal-dialog fadeIndown\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header modal-header-new\">\n                <h4 class=\"modal-title\">Meeting Scheduled</h4>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #modalClose>&times;</button>\n                <!-- <button type=\"button\" class=\"close\" (click)=\"closeModal()\">&times;</button> -->\n            </div>\n    \n            <div class=\"modal-body modal-body-new\">\n                <div class=\"row\">\n                    <div class=\"col-6\" *ngFor=\"let d of data; let j=index\">\n                        <label class=\"notary-ava\">{{d.appointment_date | moment}}</label>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n"

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
/* harmony import */ var src_app_lang_translate_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/lang/translate.service */ "./src/app/lang/translate.service.ts");
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
    function InhouseBrokerDetailComponent(route, admin, constant, http, appointment, spinner, ts) {
        var _this = this;
        this.route = route;
        this.admin = admin;
        this.constant = constant;
        this.http = http;
        this.appointment = appointment;
        this.spinner = spinner;
        this.ts = ts;
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
            swal('Error', 'Deal is not finalised.', 'error');
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
        //       swal('Success', 'Appointment scheduled successfully.', 'success');
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
            swal('Error', 'Choose atleast one date.', 'error');
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
            swal('Success', 'Appointment scheduled successfully.', 'success');
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
            src_app_lang_translate_service__WEBPACK_IMPORTED_MODULE_9__["TranslateService"]])
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

module.exports = ""

/***/ }),

/***/ "./src/app/layout/leads/inhouse-broker/inhouse-broker-detail/my-chat/my-chat.component.html":
/*!**************************************************************************************************!*\
  !*** ./src/app/layout/leads/inhouse-broker/inhouse-broker-detail/my-chat/my-chat.component.html ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"row\">\n    <div class=\"col-lg-4 col-md-4 col-sm-12 col-12\">\n      <div malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\" class=\"chat-name-list white-bg\">\n         <div *ngIf=\"loadingConversation\" class=\"chat-window white-bg\"><img style=\"width:100%\" src=\"assets/img/loading_content.gif\"></div>\n         <div *ngIf=\"!loadingConversation && conversations.length == 0\" class=\"padding20\">No conversation found</div>\n         <a *ngFor=\"let con of conversations\" [ngClass]=\"{'active':con.selected == true}\" href=\"javascript://\">\n            <div class=\"profile\" (click)=\"selectConversation(con)\">\n               <div class=\"fig-block\">\n                  <img [src]=\"con.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\" />\n               </div>\n               <div class=\"profile-info\">\n                  <h6>{{con.name | titlecase}}</h6>\n                  <!-- <p class=\"p12\">{{con.phone}}</p> -->\n                  <p class=\"p12\">\n                    {{con?.dialCode ? con?.dialCode : con.dial_code}}-{{con?.phone}}\n                  </p>\n                  <p *ngIf=\"type==1\" class=\"p13\">({{con?.is_developer==1 ? 'Developer' : 'Seller'}})</p>\n                  <i class=\"fa fa-angle-right float-right\"></i>\n               </div>\n            </div>\n         </a>\n      </div>\n   </div>\n   \n   <div class=\"col-lg-8 col-md-8 col-sm-12 col-12 move-below\">\n      <div *ngIf=\"loadingMessages\" class=\"chat-window white-bg\"><img style=\"width:100%\" src=\"assets/img/loading_content.gif\"></div>\n      <div *ngIf=\"conversation && !loadingMessages\" class=\"chat-window white-bg\">\n         <div class=\"chat-top\">\n             <a href=\"javascript://\">\n               <div class=\"profile\">\n                  <div class=\"fig-block\">\n                     <img [src]=\"parameter.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\">\n                  </div>\n                  <div class=\"profile-info\">\n                     <h6>{{parameter.name | titlecase}}</h6>\n                     <!-- <p class=\"p12\">{{conversation.other.phone}}</p> -->\n                     <p class=\"p12\">\n                       <!-- {{parameter.phone}} -->\n                       {{parameter?.dialCode ? parameter?.dialCode : constant.dial_code}}-{{parameter?.phone}}\n                      </p>\n                  </div>\n               </div>\n            </a>\n  \n         </div>\n  \n         <div *ngIf=\"messages\" malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\" class=\"chat-area scrollbox\" #chatWin>\n          <div *ngIf=\"loadmore\" class=\"chat-load-more\" (click)=\"loadMore()\" >\n            Previous Messages <img *ngIf=\"loadmoring\" src=\"assets/img/loading-p.gif\">\n          </div> \n          <div *ngFor=\"let m of messages;let i = index\" [ngClass]=\"m?.conversation_user?.admin_id == admin_id ? 'chat-user-one' :'chat-user-two'\" class=\"chat-user\">\n            <p *ngIf=\"m.message_type == 1\" style=\"word-wrap: break-word;\">\n              <!-- <span *ngIf=\"m.loading\" class=\"m-loader\"><img src=\"assets/img/loading-p.gif\"></span> -->\n              <span>{{m.message}}</span>\n            </p>\n  \n            <!-- <a class=\"btn btn-sm btn-danger\" [group]=\"group\" ng-box href=\"{{lastReport.image.original}}\">View</a> -->\n            <!-- <a *ngIf=\"m.message_type == 2\" ng-box width=\"800\" height=\"800\" target=\"_blank\" href=\"{{m.image}}\">\n                <img src=\"{{m.image}}\">\n            </a> -->\n            <a *ngIf=\"m.message_type == 2\" href=\"{{m.image}}\" data-lightbox=\"image\" title=\"image\" >\n              <span>\n                <img class=\"ui bordered small image\" src=\"{{m.image}}\">\n                <div *ngIf=\"m.loading\" class=\"loaderr\"></div>\n              </span>\n            </a>\n            <!-- <a *ngIf=\"m.message_type == 2\" href=\"{{m.image}}\" data-lightbox=\"image\" data-title=\"My caption\">\n              <img class=\"ui bordered small image\" src=\"{{m.image}}\">\n              \n            </a> -->\n            <!-- <a *ngIf=\"m.message_type == 3\" href=\"{{m.video}}\" title=\"Video\" class=\"chat-vid\">\n              <span >\n                <img class=\"ui bordered small image\" src=\"{{m.image}}\">\n                <img *ngIf=\"!m.loading\" class=\"vid-icon\" (click)=\"playVideo(i)\" src=\"assets/img/play-button.png\" />\n                <div *ngIf=\"m.loading\" class=\"loaderr\"></div>\n              </span>\n            </a> -->\n            \n            <div class=\"chat-vid\" *ngIf=\"m.message_type == 3 && !m.play\">\n              <span>\n                  <img class=\"ui bordered small image\" src=\"{{m.image}}\" onerror=\"this.src='assets/img/placeholder.png'\">\n                  <img *ngIf=\"!m.loading\" class=\"vid-icon\" (click)=\"playVideo(i)\" src=\"assets/img/play-button.png\" />\n                  <div *ngIf=\"m.loading\" class=\"loaderr\"></div>\n                  <div class=\"clearfix\"></div>\n            </span>\n            </div>\n            <video *ngIf=\"m.message_type == 3 && m.play\" src=\"{{m.video}}\" autoplay type=\"video/mp4\" controls></video>\n            \n            <!-- <div class=\"chat-vid\" *ngIf=\"m.message_type == 3 && !m.play\">\n              <span>\n                <img class=\"vid-img\" src=\"{{m.image}}\">\n                <img class=\"vid-icon\" (click)=\"playVideo(i)\" src=\"assets/img/play-button (2).png\"/>\n                <div class=\"clearfix\"></div>\n            </span>\n            </div> -->\n            <!-- <video *ngIf=\"m.message_type == 3 && m.play\" src=\"{{m.video}}\" autoplay type=\"video/mp4\" controls></video> -->\n            \n            <div class=\"chat-shared-file\" *ngIf=\"m.message_type == 4\">\n              <span *ngIf=\"m.loading\" class=\"m-loader\">\n                <img class=\"ui bordered small image\" src='assets/img/placeholder.png'>\n                <div *ngIf=\"m.loading\" class=\"loaderr\"></div>\n              </span>\n              <span *ngIf=\"!m.loading\">\n                <a href=\"javascript://\" target=\"_blank\" href=\"{{m.attachment}}\"><span>{{m.attachment_name}} <img class=\"viewfull\" src=\"assets/img/viewfull.png\"></span>\n                </a>\n              </span>\n            </div>\n              \n            <a *ngIf=\"m.message_type == 5\" href=\"{{m.property_url}}\" target=\"_blank\" title=\"image\" >\n              <span>\n                <img class=\"ui bordered small image\" src=\"{{m.image}}\">\n                <div *ngIf=\"m.loading\" class=\"loaderr\"></div>\n              </span>\n              <h5>{{m.message}}</h5>\n            </a>\n            \n            <div class=\"time clearfix\" *ngIf=\"m.updated_at && !m.uid\">{{m.updated_at| moment}}</div>\n            <div class=\"time clearfix\" *ngIf=\"m.updated_at && m.uid\">\n                {{m.updated_at|date:'h:mm a, MMM d y'}}\n            </div>\n  \n           </div>\n  \n         </div>\n  \n         <div style=\"position: absolute; z-index: 1; margin: 0px; padding: 0px; other: block; left: 581px; top: 91px;\"><div class=\"enscroll-track track3\" style=\"position: relative; height: 367px;\"><a href=\"\" class=\"handle3\" style=\"position: absolute; z-index: 1; height: 199.244px; top: 0px;\"><div class=\"top\"></div><div class=\"bottom\"></div></a></div></div>\n  \n         <div class=\"chat-text\">\n          <div class=\"dropdown attach-items\">\n            <a href=\"javascript://\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" #optionsButton>\n              <i class=\"fa fa-paperclip\" aria-hidden=\"true\"></i>\n            </a>\n            <div class=\"dropdown-menu\">\n              <div class=\"dropdown-item\">\n                <input type=\"file\" name=\"image\" accept=\"image/*\" (change)=\"onSelectFile('image', $event)\">\n                <i class=\"fa fa-camera\" aria-hidden=\"true\"></i>\n                <span>Photo</span>\n              </div>\n              <a class=\"dropdown-item\"> \n                <!-- <input type=\"file\" name=\"video\" id=\"videoFileObject\" name=\"video\" accept=\"video/mp4,video/x-m4v,video/*\" (change)=\"showCanvas($event)\"> -->\n                <input type=\"file\" name=\"video1\" accept=\"video/mp4,video/x-m4v,video/*\" (change)=\"showCanvas($event)\">\n                <i class=\"fa fa-video-camera\" aria-hidden=\"true\"></i>\n                <span>Video</span>\n              </a>\n              <a class=\"dropdown-item\">    \n                  <input type=\"file\" name=\"attachment\" accept=\".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf\" (change)=\"saveAttachment($event)\">\n                <i class=\"fa fa-file\" aria-hidden=\"true\"></i>\n                <span>Document</span>\n              </a>\n              <a class=\"dropdown-item cursor-pointer\" (click)=\"blockGetProperty.showModal()\">    \n                <i class=\"fa fa-file\" aria-hidden=\"true\"></i>\n                <span>Property</span>\n              </a>\n            </div>\n          </div>\n          <input id=\"message\" #msgInput1 autocomplete=\"off\" [(ngModel)]=\"textMessage\" (keyup.enter)=\"setText()\" class=\"chat-input\" type=\"text\" name=\"message\" placeholder=\"Type your message here …\">\n          \n          <!-- <div class=\"chat-attached-file\" *ngIf=\"model.message_type == 2\">\n            <div class=\"attached-inner\">\n              <a href=\"javascript://\" (click)=\"updateModel('image')\" class=\"close\">&times;</a>\n              <div class=\"fig-block\"><img class=\"img-fluid\" src=\"{{model.image}}\" alt=\"img\"></div>\n            </div>\n          </div>\n          <div class=\"chat-attached-file\">\n            <div class=\"attached-inner\">\n              <a href=\"javascript://\" (click)=\"updateModel('video')\" class=\"close\">&times;</a>\n              <div class=\"fig-block\">\n                  <video style=\"width: 100%; height: 100%;\" src=\"{{model.video}}\" class=\"video55\" autoplay type=\"video/mp4\" controls></video>\n              </div>\n            </div>\n          </div>\n          <div class=\"chat-attached-file\" *ngIf=\"model.message_type == 4\">\n            <div class=\"attached-inner\">\n              <a href=\"javascript://\" (click)=\"updateModel('video')\" class=\"close\">&times;</a>\n              <div class=\"fig-block\">\n                <div class=\"chat-shared-file\">\n                  <a href=\"javascript://\"><span>{{model.attachment_name}}</span>\n                    <i class=\"fa fa-times\" (click)=\"updateModel('attachment')\" aria-hidden=\"true\"></i>\n                  </a>\n                </div>\n              </div>\n            </div>\n          </div> -->\n          <video style=\"width: 100%; height: 100%;\" src=\"{{videoSrc}}\" class=\"video55\" autoplay type=\"video/mp4\" controls></video>\n          <canvas style=\"display: none;\" width=\"800\" height=\"600\" id=\"canvas\"></canvas>\n  \n          <button (click)=\"setText()\" class=\"btn\">Send</button>\n          \n         </div>\n  \n      </div>\n      </div>\n    </div>\n  \n    <app-block-get-property #blockGetProperty (itemSelect)=\"sendProperty($event)\"></app-block-get-property>"

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
    function MyChatComponent(element, admin, cs, constant, route, spinner) {
        this.element = element;
        this.admin = admin;
        this.cs = cs;
        this.constant = constant;
        this.route = route;
        this.spinner = spinner;
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
            swal('Error', this.constant.errorMsg.FILE_SIZE_EXCEEDS, 'error');
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
            swal('Error', this.constant.errorMsg.FILE_SIZE_EXCEEDS, 'error');
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
            swal('Error', this.constant.errorMsg.FILE_SIZE_EXCEEDS, 'error');
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
        else if ((Object.keys(this.admin.admin_acl).length !== 0 && this.admin.admin_acl['Broker Lead Management'].can_update === 0) ||
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
            swal('Error', 'Please enter some text.', 'error');
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
        model.message = property.name + ' with ';
        if (property.configuration.bedroom) {
            model.message += property.configuration.bedroom + ' Bed ';
        }
        if (property.configuration.bathroom) {
            model.message += this.constant.middleDot + property.configuration.bathroom + ' Bath';
        }
        if (property.configuration.half_bathroom) {
            model.message += this.constant.middleDot + property.configuration.half_bathroom + ' Half Bath';
        }
        if (property.property_type.name) {
            model.message += this.constant.middleDot + property.property_type.name;
        }
        model.message += ' in ' + property.building.name;
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
            ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerService"]])
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

module.exports = ""

/***/ }),

/***/ "./src/app/layout/leads/inhouse-broker/inhouse-broker.component.html":
/*!***************************************************************************!*\
  !*** ./src/app/layout/leads/inhouse-broker/inhouse-broker.component.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container-fluid\">\n    <div class=\"row\">\n        <div class=\"col-md-4\">\n            <div class=\"form-group\">\n                <p class=\"p16\">Manage Inhouse Agent's Lead</p>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-md-4\">\n            <div class=\"form-group\" *ngIf=\"admin?.admin_acl['Broker Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n                <div class=\"d-flex\">\n                <!-- <button (click)=\"removeCsrUser()\" class=\"all-btn\">All</button> -->\n                <div class=\"autocomplete\">\n                    <input placeholder=\"Search Inhouse Agent\" style=\"max-width:200px\" list=\"amenities\" [(ngModel)]=\"parameter.keyword\" (input)=\"getCsrListing()\" class=\"form-control\" type=\"text\" name=\"keyword\" (focusout)=\"closeCsrListing()\">\n                    <div id=\"myInputautocomplete-list\" class=\"autocomplete-items\">\n                        <div *ngFor=\"let item of users\" (click)=\"selectCsrUser(item)\">{{item.email}}</div>\n                    </div>\n                </div>\n                \n                </div>\n            </div>\n        </div>\n        <div class=\"col-md-8 col-12\">\n            <div class=\"cust-tabs-2\">\n                <ul class=\"nav nav-tabs\">\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==1}\" (click)=\"changeFlag(1)\" >This Week</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==2}\" (click)=\"changeFlag(2)\" >This Month</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==3}\" (click)=\"changeFlag(3)\" >Last Month</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==4}\" (click)=\"changeFlag(4)\" >Lifetime</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==5}\" (click)=\"parameter.flag=5\" >Custom</a>\n                </li>\n                </ul>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-12\">\n            <div *ngIf=\"parameter.flag == 5\" class=\"row\">\n                <div class=\"offset-lg-7\"></div>\n                <div class=\"col-lg-2 col-md-2 col-sm-5 col-5\">\n                <div class=\"form-group marginB0\">\n                    <label>From:</label>\n                    <p-calendar showIcon=\"true\" [(ngModel)]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n                </div>\n                </div>\n                <div class=\"col-lg-2 col-md-2 col-sm-5 col-5\">\n                <div class=\"form-group marginB0\">\n                    <label>To:</label>\n                    <p-calendar showIcon=\"true\" [(ngModel)]=\"parameter.max\" [minDate]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n                </div>\n                </div>\n                <div class=\"col-lg-1 col-md-2 col-sm-2 col-6\">\n                <div class=\"form-group btn-cont\">\n                    <label class=\"addMT3\">&nbsp;</label>\n                    <button class=\"btn btn-calender\" href=\"javascript://\" (click)=\"getListing(); getCSRDashBoardData();\"\n                        [disabled]=\"!parameter.min || !parameter.max\">Apply</button>\n                </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"listingResults\" >\n        <div class=\"row\" *ngIf=\"admin?.admin_acl['Broker Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n            <div class=\"col-md-2\">\n                <div class=\"form-group\">\n                    <label>Country</label>\n                    <select class=\"form-control\" (change)=\"onCountryChange($event.target.value)\">\n                        <option value=\"0\">All</option>\n                        <option *ngFor=\"let item of location.countries\" [value]=\"item.id\">{{item.name}}</option>\n                    </select>\n                </div>\n            </div>\n            <div class=\"col-md-2\">\n                <div class=\"form-group\">\n                <label>State</label>\n                <select class=\"form-control\" (change)=\"onStateChange($event.target.value)\">\n                    <option value=\"0\">All</option>\n                    <option *ngFor=\"let item of location.states\" [value]=\"item.id\">{{item.name}}</option>\n                </select>\n                </div>\n            </div>\n            <div class=\"col-md-2\">\n                <div class=\"form-group\">\n                <label>City</label>\n                    <select class=\"form-control\" (change)=\"onCityChange($event.target.value)\">\n                    <option value=\"0\">All</option>\n                    <option *ngFor=\"let item of location.cities\" [value]=\"item.id\">{{item.name}}</option>\n                    </select>\n                </div>\n            </div>\n        \n            <div class=\"col-md-2\">\n                <div class=\"form-group\">\n                <label>Locality</label>\n                <select class=\"form-control\" (change)=\"onLocalityChange($event.target.value)\">\n                    <option value=\"0\">All</option>\n                    <option *ngFor=\"let item of location.localities\" [value]=\"item.id\">{{item.name}}</option>\n                </select>\n                </div>\n            </div>\n            <div class=\"col-md-2\">\n                <div class=\"form-group btn-cont\">\n                <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n                <button type=\"button\" (click)=\"getListing(); getCSRDashBoardData();\" class=\"btn btn-primary-new width100P\">Apply</button>\n                </div>\n            </div>\n    \n            <div class=\"col-md-2\">\n                <div class=\"form-group btn-cont\">\n                <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n                <button type=\"button\" (click)=\"resetFilters()\" class=\"btn btn-primary-new width100P\">Reset</button>\n                </div>\n            </div>\n        </div>\n\n        <div *ngIf=\"selectedUser as item\" class=\"sigle-row-table\">\n            <table class=\"table table-striped\">\n                <tbody>\n                    <tr>\n                        <td> <img class=\"rounded-circle\" [src]=\"item.image\" onerror='this.src=\"assets/img/default_img.png\"' alt=\"img\"></td>\n                        <td class=\"text-left\">\n                            <span class=\"name\">{{item.name | titlecase}}</span>\n                        </td>\n                        <td class=\"text-left\">\n                            {{item.phone}}\n                        </td>\n                        <td class=\"text-left\">\n                            {{item.email}}\n                        </td>\n                        <td>\n                            <a (click)=\"removeCsrUser()\" href=\"javascript://\" class=\"icon-block edit-icon\"><img src=\"assets/img/remove-icon.png\" alt=\"remove\" title=\"remove\" /></a>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-lg-8 col-md-12 col-sm-12 col-12\">\n                <div class=\"info-box all-leads\">\n                <div class=\"row\">\n                    <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == '1'}\" (click)=\"changeCountFlag(1)\">\n                        <div class=\"one-row \">\n                            <div class=\"o-block\">\n                            <h5>Leads</h5>\n                            <small>Total</small>\n                            </div>\n                            <div class=\"o-block\">\n                            <a class=\"view-all\" href=\"javascript://\">View All</a>\n                            <h4>{{dash?.lead_total}}</h4>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == '2'}\" (click)=\"changeCountFlag(2)\">\n                        <div class=\"one-row\">\n                            <div class=\"o-block\">\n                            <h5>Properties</h5>\n                            <small>Dealing In</small>\n                            </div>\n                            <div class=\"o-block\">\n                            <a class=\"view-all\" href=\"javascript://\">View All</a>\n                            <h4>{{dash?.lead_properties}}</h4>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                </div>\n                <div class=\"info-box all-leads\">\n                <div class=\"row\">\n                    <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == '3'}\" (click)=\"changeCountFlag(3)\">\n                        <div class=\"one-row \">\n                            <div class=\"o-block\">\n                            <h5>Leads</h5>\n                            <small>Open</small>\n                            </div>\n                            <div class=\"o-block\">\n                            <a class=\"view-all\" href=\"javascript://\">View All</a>\n                            <h4>{{dash?.lead_open}}</h4>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == '4'}\" (click)=\"changeCountFlag(4)\">\n                        <div class=\"one-row\">\n                            <div class=\"o-block\">\n                            <h5>Leads</h5>\n                            <small>Deal Finalized</small>\n                            </div>\n                            <div class=\"o-block\">\n                            <a class=\"view-all\" href=\"javascript://\">View All</a>\n                            <h4>{{dash?.lead_closed}}</h4>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                </div>\n        \n            </div>\n            <div class=\"col-lg-4 col-md-12 col-sm-12 col-12\">\n                <div class=\"chat-msg all-leads\" style=\"padding:0px\">\n                    <div class=\"padding20\" *ngIf=\"dash.lead_total == 0\">No records found</div>\n                    <ngx-charts-pie-chart [results]=\"chartView\"></ngx-charts-pie-chart>\n                </div>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-12\">\n                <div class=\"spacer40\"></div>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-lg-6 col-md-6 col-6\">\n                <div class=\"title-group\">\n                <h5>Leads \n                    <span *ngIf=\"parameter.count_flag == 1\">(Total)</span>\n                    <span *ngIf=\"parameter.count_flag == 2\">(Properties Dealing In)</span>\n                    <span *ngIf=\"parameter.count_flag == 3\">(Open)</span>\n                    <span *ngIf=\"parameter.count_flag == 4\">(Deal Finalized)</span>\n                </h5>\n                </div>\n            </div>\n            <div class=\"col-lg-6 col-md-6 col-5\" *ngIf=\"admin?.admin_acl['Broker Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n                <div class=\"add-new text-right\">\n                    <a class=\"btn\" (click)=\"bulkAssign()\" href=\"javascript://\">Bulk Re-assign</a>\n                </div>\n            </div>\n        </div>\n        <div class=\"white-bg\">\n            <div class=\"tabel-section\">\n                <div class=\"table-responsive\">\n                    <table class=\"table table-striped table-align-left vertical-align-top\">\n                        <tr>\n                            <th *ngIf=\"admin?.admin_acl['Broker Lead Management']?.can_read==1 && !this.parameter.assignee_id\" style=\"width:6%\">\n                                <div class=\"table-search\">\n                                    <label>All</label>\n                                    <div>\n                                        <label class=\"cust-check-bx\" >\n                                            <input class=\"width1\" type=\"checkbox\" (click)=\"selectAll(parameter.is_selected)\" name=\"document\">\n                                            <span class=\"checkmark\"></span>\n                                        </label>\n                                    </div>\n                                </div>\n                            </th>\n\n                            <th style=\"width:6%\">\n                                <div class=\"table-search\"></div>\n                            </th>\n                            <th style=\"width:15%\">\n                                <div class=\"table-search\">\n                                    <label>Name</label>\n                                    <div class=\"searh-3\">\n                                        <input autocomplete=\"off\" type=\"text\" [(ngModel)]=\"parameter.name\" (keyup.enter)=\"changeFilter('name',$event.target.value)\" name=\"\">\n                                        <button *ngIf=\"parameter.name\" (click)=\"changeFilter('name', parameter.name)\"><i class=\"fa fa-search\"></i></button>\n                                    </div>\n                                </div>\n                            </th>\n                            <th style=\"width:15%; text-align:left;\">\n                                <div class=\"table-search\">\n                                    <label>Contact Number</label>\n                                    <div class=\"searh-3\">\n                                        <input autocomplete=\"off\" type=\"text\" [(ngModel)]=\"parameter.phone\" (keyup.enter)=\"changeFilter('phone',$event.target.value)\" name=\"\">\n                                        <button *ngIf=\"parameter.phone\" (click)=\"changeFilter('phone', parameter.phone)\"><i class=\"fa fa-search\"></i></button>\n                                    </div>\n                                </div>\n                            </th>\n                            <th style=\"width:20%\">\n                                <div class=\"table-search\">\n                                    <label>Email</label>\n                                    <div class=\"searh-3\">\n                                        <input autocomplete=\"off\" type=\"text\" [(ngModel)]=\"parameter.email\" (keyup.enter)=\"changeFilter('email',$event.target.value)\" name=\"\">\n                                        <button *ngIf=\"parameter.email\" (click)=\"changeFilter('email', parameter.email)\"><i class=\"fa fa-search\"></i></button>\n                                    </div>\n                                </div>\n                            </th>\n                            <th style=\"width:10%\">\n                                <div class=\"table-search\">\n                                    <label>Interested In</label>\n                                </div>\n                            </th>\n                            <th style=\"width:10%\">\n                                <div class=\"table-search\">\n                                    <label>Assignee</label>\n                                </div>\n                            </th>\n                            <th style=\"width:5%\">\n                                <div class=\"table-search\">\n                                    <label>User Choice</label>\n                                </div>\n                            </th>\n                            <th style=\"width:10%\">\n                                <div class=\"table-search\">\n                                    <label>Change Property For</label>\n                                </div>\n                            </th>\n                            <!-- <th style=\"width:4%\"></th> -->\n                        </tr>\n                        <tr class=\"cursor-pointer\" title=\"Click to view details\" *ngFor=\"let item of items| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: parameter.total }; let in=index\"\n                            routerLink=\"/dashboard/leads/inhouse-broker/{{item.id}}\">\n                        <td *ngIf=\"admin?.admin_acl['Broker Lead Management']?.can_read==1 && !this.parameter.assignee_id\" (click)=\"$event.stopPropagation()\">\n                            <label class=\"cust-check-bx\" >\n                            <input type=\"checkbox\" [(ngModel)]=\"item.selected\" name=\"document\">\n                            <span class=\"checkmark\"></span>\n                            </label>\n                            <!-- <i class=\"fa\" [ngClass]=\"item.selected?'fa-check-square-o':'fa-square-o'\" (click)=\"item.selected = !item.selected\" aria-hidden=\"true\"></i> -->\n                        </td>\n                        <td>\n                            <img [src]=\"item?.user?.image ? item?.user?.image : item?.image| img:'small'\" class=\"rounded-circle\"\n                                    onerror='src=\"assets/img/default_img.png\"' alt=\"img\">\n                        </td>\n                        <td class=\"text-left\">\n                            <span class=\"name\">{{item.name | titlecase}}</span>\n                        </td>\n                        <td class=\"text-left\" *ngIf=\"item.phone\">{{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}</td>\n                        <td class=\"text-left\" *ngIf=\"!item.phone\">NA</td>\n                        <td class=\"text-left\">{{item.email}}</td>\n                        <td>\n                            <span *ngFor=\"let conf of item.configuration; let ii=index\">\n                                <app-property-configuration *ngIf=\"conf\" [configuration]=\"conf\"></app-property-configuration>\n                                <span *ngIf=\"ii<item?.configuration?.length-1\"> | </span> <br>\n                            </span>\n                            <span *ngIf=\"item.configuration?.length==0\">NA</span>\n                        </td>\n                        <td class=\"text-left\" title=\"Inhouse Agent\" *ngIf=\"item?.admin?.name\">{{item.broker.name | titlecase}}</td>\n                        <td class=\"text-left\" *ngIf=\"!item?.admin?.name\">Not Assigned</td>\n                        <td class=\"text-left\" *ngIf=\"item.sale_rent\">{{item.sale_rent==1 ? ts.lang.Buy : 'Rent'}}</td>\n                        <td class=\"text-left\">\n                            <a *ngIf=\"admin?.admin_acl['Broker Lead Management']?.can_update==0\" class=\"green-color fontW500\" href=\"javascript://\">\n                                Change to {{item.sale_rent==1 ? 'Rent' : ts.lang.Buy}}\n                            </a>\n                            <a *ngIf=\"admin?.admin_acl['Broker Lead Management']?.can_update==1\" class=\"green-color fontW500\" (click)=\"updateLeadType($event, item.sale_rent==1?'2':'1', item.id, in)\" href=\"javascript://\">\n                                Change to {{item.sale_rent==1 ? 'Rent' : ts.lang.Buy}}\n                            </a>\n                        </td>\n                        <!-- <td>\n                            <a href=\"javascript://\" title=\"View Details\" routerLink=\"/dashboard/leads/inhouse-broker/{{item.id}}\" class=\"icon-block edit-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></a>\n                        </td> -->\n                        </tr>\n                    </table>\n                    <div class=\"padding20 center\" *ngIf=\"parameter.noResultFound\">\n                            <img src=\"assets/img/404-error.png\">\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"btn-cont marginT15\" *ngIf=\"parameter.total\">\n        <div class=\"row\">\n            <div class=\"col-6\">\n                <div class=\"title-group\">\n                    <p>Showing {{items?.length}} out of {{parameter.total}}</p>\n                </div>\n            </div>\n            <div class=\"col-6 text-right\">\n                <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n            </div>\n        </div>\n    </div>\n</div>\n\n\n\n<!-- Assignment model -->\n<a data-toggle=\"modal\" data-target=\"#assign-model\" #openAssignModel></a>\n<div class=\"modal\" id=\"assign-model\">\n        <div class=\"modal-dialog \">\n            <div class=\"modal-content notary-avail\">\n                <div class=\"modal-header popup-header\">\n                <h4 class=\"modal-title\">Re Assign to</h4>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #closeAssignModel>&times;</button>\n                </div>\n                <div class=\"modal-body\">\n                    <div class=\"row\">\n                        <div class=\"col-md-8 col-6\">\n                            <input style=\"max-width:200px\" list=\"amenities\" [(ngModel)]=\"assign.keyword\" (keyup.enter)=\"getAssignListing()\" class=\"form-control\" type=\"text\" name=\"keyword\" placeholder=\"Search\">\n                        </div>\n                        <div class=\"col-md-4 col-5 btn-cont\">\n                            <a class=\"btn btn-primary pull-right\" href=\"javascript://\" (click)=\"assignNow()\">Assign</a>\n                        </div>\n                    </div>\n                    <div class=\"spacer40\"></div>\n                    <div class=\"modal-table-data\" malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\">\n                        <table class=\"table\">\n                            <tr *ngFor=\"let item of assign.items\">\n                                <td *ngIf=\"item.is_blocked!=1\">\n                                    <div class=\"n-avail-profile\">\n                                    <img [src]=\"item.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\">\n                                    <div class=\"n-avail-info\">\n                                        <p class=\"p12\">{{item.name | titlecase}}</p>\n                                        <p class=\"p10\">Phone : {{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}</p>\n                                    </div>\n                                    </div>\n                                </td>\n                                <td *ngIf=\"item.is_blocked!=1\">\n                                    <label class=\"cust-check-bx float-right\">\n                                        <input type=\"radio\" name=\"notary_id\" (click)=\"assignItem = item\">\n                                        <span class=\"checkmark\"></span>\n                                    </label>\n                                </td>\n                            </tr>\n                            <tr *ngIf=\"assign?.items?.length==0\">\n                                <p class=\"show-not-found\">No Inhouse Agent found.</p>\n                            </tr>\n                        </table>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    "

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
/* harmony import */ var src_app_lang_translate_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/lang/translate.service */ "./src/app/lang/translate.service.ts");
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
    function InhouseBrokerComponent(admin, constant, route, spinner, ts) {
        this.admin = admin;
        this.constant = constant;
        this.route = route;
        this.spinner = spinner;
        this.ts = ts;
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
        this.parameter.is_selected = false;
        this.parameter.keyword = '';
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        this.parameter.flag = 2;
        this.parameter.total = 0;
        this.parameter.count_flag = 1;
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
                    'name': 'Lead (Properties)',
                    'value': parseInt(_this.dash.lead_properties, 10)
                },
                {
                    'name': 'Lead (Open)',
                    'value': parseInt(_this.dash.lead_open, 10)
                },
                {
                    'name': 'Leads (Deal finalized)',
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
            html: this.constant.title.ARE_YOU_SURE + '<br>' + 'You want to change availability for this property?',
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
                    swal('Success', 'Availability for this property changed successfully.', 'success');
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
            swal('Error', 'Please choose atleast one lead.', 'error');
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
            swal('Success', 'Assigned successfully', 'success');
            _this.closeAssignModel.nativeElement.click();
            _this.getListing();
        }, function (error) {
            _this.spinner.hide();
            _this.closeAssignModel.nativeElement.click();
            swal('Error', error.error.message, 'error');
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
            src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["Constant"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerService"],
            src_app_lang_translate_service__WEBPACK_IMPORTED_MODULE_6__["TranslateService"]])
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

module.exports = ""

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
/* harmony import */ var _pipes_remove_comma_pipe__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./../../pipes/remove-comma.pipe */ "./src/app/pipes/remove-comma.pipe.ts");
/* harmony import */ var _leads_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./leads.component */ "./src/app/layout/leads/leads.component.ts");
/* harmony import */ var _data_collector_data_collector_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./data-collector/data-collector.component */ "./src/app/layout/leads/data-collector/data-collector.component.ts");
/* harmony import */ var _csr_seller_csr_seller_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./csr-seller/csr-seller.component */ "./src/app/layout/leads/csr-seller/csr-seller.component.ts");
/* harmony import */ var _csr_buyer_csr_buyer_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./csr-buyer/csr-buyer.component */ "./src/app/layout/leads/csr-buyer/csr-buyer.component.ts");
/* harmony import */ var _inhouse_broker_inhouse_broker_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./inhouse-broker/inhouse-broker.component */ "./src/app/layout/leads/inhouse-broker/inhouse-broker.component.ts");
/* harmony import */ var _csr_closer_csr_closer_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./csr-closer/csr-closer.component */ "./src/app/layout/leads/csr-closer/csr-closer.component.ts");
/* harmony import */ var _csr_buyer_csr_buyer_detail_csr_buyer_detail_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./csr-buyer/csr-buyer-detail/csr-buyer-detail.component */ "./src/app/layout/leads/csr-buyer/csr-buyer-detail/csr-buyer-detail.component.ts");
/* harmony import */ var _inhouse_broker_inhouse_broker_detail_inhouse_broker_detail_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./inhouse-broker/inhouse-broker-detail/inhouse-broker-detail.component */ "./src/app/layout/leads/inhouse-broker/inhouse-broker-detail/inhouse-broker-detail.component.ts");
/* harmony import */ var _csr_closer_csr_closer_detail_csr_closer_detail_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./csr-closer/csr-closer-detail/csr-closer-detail.component */ "./src/app/layout/leads/csr-closer/csr-closer-detail/csr-closer-detail.component.ts");
/* harmony import */ var _common_blocks_interested_property_interested_property_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./../common-blocks/interested-property/interested-property.component */ "./src/app/layout/common-blocks/interested-property/interested-property.component.ts");
/* harmony import */ var _common_blocks_viewed_property_viewed_property_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./../common-blocks/viewed-property/viewed-property.component */ "./src/app/layout/common-blocks/viewed-property/viewed-property.component.ts");
/* harmony import */ var _common_blocks_fill_information_fill_information_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./../common-blocks/fill-information/fill-information.component */ "./src/app/layout/common-blocks/fill-information/fill-information.component.ts");
/* harmony import */ var _inhouse_broker_inhouse_broker_detail_my_chat_my_chat_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./inhouse-broker/inhouse-broker-detail/my-chat/my-chat.component */ "./src/app/layout/leads/inhouse-broker/inhouse-broker-detail/my-chat/my-chat.component.ts");
/* harmony import */ var _guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../../guards/acl-user.guard */ "./src/app/guards/acl-user.guard.ts");
/* harmony import */ var _modules_shared_module__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../../modules/shared.module */ "./src/app/modules/shared.module.ts");
/* harmony import */ var _csr_seller_csr_seller_detail_csr_seller_detail_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./csr-seller/csr-seller-detail/csr-seller-detail.component */ "./src/app/layout/leads/csr-seller/csr-seller-detail/csr-seller-detail.component.ts");
/* harmony import */ var _swimlane_ngx_charts__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @swimlane/ngx-charts */ "./node_modules/@swimlane/ngx-charts/release/esm.js");
/* harmony import */ var _common_blocks_viewed_projects_viewed_projects_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ../common-blocks/viewed-projects/viewed-projects.component */ "./src/app/layout/common-blocks/viewed-projects/viewed-projects.component.ts");
/* harmony import */ var primeng_primeng__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! primeng/primeng */ "./node_modules/primeng/primeng.js");
/* harmony import */ var primeng_primeng__WEBPACK_IMPORTED_MODULE_30___default = /*#__PURE__*/__webpack_require__.n(primeng_primeng__WEBPACK_IMPORTED_MODULE_30__);
/* harmony import */ var _csr_seller_csr_seller_detail_seller_chat_seller_chat_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./csr-seller/csr-seller-detail/seller-chat/seller-chat.component */ "./src/app/layout/leads/csr-seller/csr-seller-detail/seller-chat/seller-chat.component.ts");
/* harmony import */ var _outside_broker_outside_broker_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./outside-broker/outside-broker.component */ "./src/app/layout/leads/outside-broker/outside-broker.component.ts");
/* harmony import */ var _outside_broker_outside_broker_detail_outside_broker_detail_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./outside-broker/outside-broker-detail/outside-broker-detail.component */ "./src/app/layout/leads/outside-broker/outside-broker-detail/outside-broker-detail.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


































var routes = [
    {
        path: 'data-collectors', component: _data_collector_data_collector_component__WEBPACK_IMPORTED_MODULE_13__["DataCollectorComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_25__["AclUserGuard"]], data: { roles: ['Data Collector Lead Management', 'can_read', 'can_data_collector'] }
    },
    {
        path: 'csr-sellers', component: _csr_seller_csr_seller_component__WEBPACK_IMPORTED_MODULE_14__["CsrSellerComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_25__["AclUserGuard"]], data: { roles: ['Seller Lead Management', 'can_read', 'can_csr_seller'] }
    },
    // lead wrt seller
    {
        path: 'csr-sellers-leads/:id', component: _csr_seller_csr_seller_component__WEBPACK_IMPORTED_MODULE_14__["CsrSellerComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_25__["AclUserGuard"]], data: { roles: ['Seller Lead Management', 'can_read', 'can_csr_seller'] }
    },
    // lead details
    {
        path: 'csr-sellers/:id', component: _csr_seller_csr_seller_detail_csr_seller_detail_component__WEBPACK_IMPORTED_MODULE_27__["CsrSellerDetailComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_25__["AclUserGuard"]], data: { roles: ['Seller Lead Management', 'can_read', 'can_csr_seller'] }
    },
    {
        path: 'chat-with-seller/:chat_with/:assigned_csr_seller_id/:seller_id', component: _csr_seller_csr_seller_detail_seller_chat_seller_chat_component__WEBPACK_IMPORTED_MODULE_31__["SellerChatComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_25__["AclUserGuard"]], data: { roles: ['Seller Lead Management', 'can_read', 'can_csr_seller'] }
    },
    {
        path: 'csr-buyers', component: _csr_buyer_csr_buyer_component__WEBPACK_IMPORTED_MODULE_15__["CsrBuyerComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_25__["AclUserGuard"]], data: { roles: ['Buyer Lead Management', 'can_read', 'can_csr_buyer'] }
    },
    // lead wrt buyer
    {
        path: 'csr-buyers-leads/:id', component: _csr_buyer_csr_buyer_component__WEBPACK_IMPORTED_MODULE_15__["CsrBuyerComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_25__["AclUserGuard"]], data: { roles: ['Buyer Lead Management', 'can_read', 'can_csr_buyer'] }
    },
    // lead details
    {
        path: 'csr-buyers/:id', component: _csr_buyer_csr_buyer_detail_csr_buyer_detail_component__WEBPACK_IMPORTED_MODULE_18__["CsrBuyerDetailComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_25__["AclUserGuard"]], data: { roles: ['Buyer Lead Management', 'can_read', 'can_csr_buyer'] }
    },
    {
        path: 'inhouse-broker', component: _inhouse_broker_inhouse_broker_component__WEBPACK_IMPORTED_MODULE_16__["InhouseBrokerComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_25__["AclUserGuard"]], data: { roles: ['Broker Lead Management', 'can_read', 'can_in_house_broker'] }
    },
    // leads wrt inhouse broker
    {
        path: 'inhouse-broker-leads/:id', component: _inhouse_broker_inhouse_broker_component__WEBPACK_IMPORTED_MODULE_16__["InhouseBrokerComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_25__["AclUserGuard"]], data: { roles: ['Broker Lead Management', 'can_read', 'can_in_house_broker'] }
    },
    // lead details
    {
        path: 'inhouse-broker/:id', component: _inhouse_broker_inhouse_broker_detail_inhouse_broker_detail_component__WEBPACK_IMPORTED_MODULE_19__["InhouseBrokerDetailComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_25__["AclUserGuard"]], data: { roles: ['Broker Lead Management', 'can_read', 'can_in_house_broker'] }
    },
    {
        path: 'chat-list/:type/:id', component: _inhouse_broker_inhouse_broker_detail_my_chat_my_chat_component__WEBPACK_IMPORTED_MODULE_24__["MyChatComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_25__["AclUserGuard"]], data: { roles: ['Broker Lead Management', 'can_read', 'can_in_house_broker'] }
    },
    // {
    //   path: 'chat-with-csr-seller/:type/:id', component: MyChatComponent,
    //   canActivate: [AclUserGuard], data: { roles: ['Broker Lead Management', 'can_read', 'can_in_house_broker'] }
    // },
    {
        path: 'outside-broker', component: _outside_broker_outside_broker_component__WEBPACK_IMPORTED_MODULE_32__["OutsideBrokerComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_25__["AclUserGuard"]], data: { roles: ['Outside Broker Lead Management', 'can_read', 'can_in_house_broker'] }
    },
    // leads wrt inhouse broker
    {
        path: 'outside-broker-leads/:id', component: _outside_broker_outside_broker_component__WEBPACK_IMPORTED_MODULE_32__["OutsideBrokerComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_25__["AclUserGuard"]], data: { roles: ['Outside Broker Lead Management', 'can_read', 'can_in_house_broker'] }
    },
    // lead details
    {
        path: 'outside-broker/:id', component: _outside_broker_outside_broker_detail_outside_broker_detail_component__WEBPACK_IMPORTED_MODULE_33__["OutsideBrokerDetailComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_25__["AclUserGuard"]], data: { roles: ['Outside Broker Lead Management', 'can_read', 'can_in_house_broker'] }
    },
    {
        path: 'csr-closers', component: _csr_closer_csr_closer_component__WEBPACK_IMPORTED_MODULE_17__["CsrCloserComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_25__["AclUserGuard"]], data: { roles: ['Closer Lead Management', 'can_read', 'can_csr_closer'] }
    },
    // leads wrt closure
    {
        path: 'csr-closers-leads/:id', component: _csr_closer_csr_closer_component__WEBPACK_IMPORTED_MODULE_17__["CsrCloserComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_25__["AclUserGuard"]], data: { roles: ['Closer Lead Management', 'can_read', 'can_csr_closer'] }
    },
    // lead details
    {
        path: 'csr-closers/:id', component: _csr_closer_csr_closer_detail_csr_closer_detail_component__WEBPACK_IMPORTED_MODULE_20__["CsrCloserDetailComponent"],
        canActivate: [_guards_acl_user_guard__WEBPACK_IMPORTED_MODULE_25__["AclUserGuard"]], data: { roles: ['Closer Lead Management', 'can_read', 'can_csr_closer'] }
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
                _swimlane_ngx_charts__WEBPACK_IMPORTED_MODULE_28__["NgxChartsModule"],
                _modules_shared_module__WEBPACK_IMPORTED_MODULE_26__["SharedModule"],
                primeng_primeng__WEBPACK_IMPORTED_MODULE_30__["CalendarModule"]
                // LayoutModule
                // NgBoxModule
            ],
            declarations: [
                _leads_component__WEBPACK_IMPORTED_MODULE_12__["LeadsComponent"],
                _data_collector_data_collector_component__WEBPACK_IMPORTED_MODULE_13__["DataCollectorComponent"],
                _csr_seller_csr_seller_component__WEBPACK_IMPORTED_MODULE_14__["CsrSellerComponent"],
                _csr_seller_csr_seller_detail_csr_seller_detail_component__WEBPACK_IMPORTED_MODULE_27__["CsrSellerDetailComponent"],
                _csr_buyer_csr_buyer_component__WEBPACK_IMPORTED_MODULE_15__["CsrBuyerComponent"],
                _inhouse_broker_inhouse_broker_component__WEBPACK_IMPORTED_MODULE_16__["InhouseBrokerComponent"],
                _csr_closer_csr_closer_component__WEBPACK_IMPORTED_MODULE_17__["CsrCloserComponent"],
                _csr_buyer_csr_buyer_detail_csr_buyer_detail_component__WEBPACK_IMPORTED_MODULE_18__["CsrBuyerDetailComponent"],
                _inhouse_broker_inhouse_broker_detail_inhouse_broker_detail_component__WEBPACK_IMPORTED_MODULE_19__["InhouseBrokerDetailComponent"],
                _csr_closer_csr_closer_detail_csr_closer_detail_component__WEBPACK_IMPORTED_MODULE_20__["CsrCloserDetailComponent"],
                _common_blocks_interested_property_interested_property_component__WEBPACK_IMPORTED_MODULE_21__["InterestedPropertyComponent"],
                _common_blocks_viewed_property_viewed_property_component__WEBPACK_IMPORTED_MODULE_22__["ViewedPropertyComponent"],
                _common_blocks_viewed_projects_viewed_projects_component__WEBPACK_IMPORTED_MODULE_29__["ViewedProjectsComponent"],
                _pipes_remove_comma_pipe__WEBPACK_IMPORTED_MODULE_11__["RemoveCommaPipe"],
                _common_blocks_fill_information_fill_information_component__WEBPACK_IMPORTED_MODULE_23__["FillInformationComponent"],
                _inhouse_broker_inhouse_broker_detail_my_chat_my_chat_component__WEBPACK_IMPORTED_MODULE_24__["MyChatComponent"],
                _csr_seller_csr_seller_detail_seller_chat_seller_chat_component__WEBPACK_IMPORTED_MODULE_31__["SellerChatComponent"],
                _outside_broker_outside_broker_component__WEBPACK_IMPORTED_MODULE_32__["OutsideBrokerComponent"],
                _outside_broker_outside_broker_detail_outside_broker_detail_component__WEBPACK_IMPORTED_MODULE_33__["OutsideBrokerDetailComponent"]
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

module.exports = ""

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

module.exports = ""

/***/ }),

/***/ "./src/app/layout/leads/outside-broker/outside-broker.component.html":
/*!***************************************************************************!*\
  !*** ./src/app/layout/leads/outside-broker/outside-broker.component.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container-fluid\">\n    <div class=\"row\">\n        <div class=\"col-md-4\">\n            <div class=\"form-group\">\n                <p class=\"p16\">Manage Outside Agent's Lead</p>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-md-4\">\n            <div class=\"form-group\" *ngIf=\"admin?.admin_acl['Outside Broker Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n                <div class=\"d-flex\">\n                <!-- <button (click)=\"removeCsrUser()\" class=\"all-btn\">All</button> -->\n                <div class=\"autocomplete\">\n                    <input placeholder=\"Search Outside Agent\" style=\"max-width:200px\" list=\"amenities\" [(ngModel)]=\"parameter.keyword\" (input)=\"getCsrListing()\" class=\"form-control\" type=\"text\" name=\"keyword\" (focusout)=\"closeCsrListing()\">\n                    <div id=\"myInputautocomplete-list\" class=\"autocomplete-items\">\n                        <div *ngFor=\"let item of users\" (click)=\"selectCsrUser(item)\">{{item.email}}</div>\n                    </div>\n                </div>\n                \n                </div>\n            </div>\n        </div>\n        <div class=\"col-md-8 col-12\">\n            <div class=\"cust-tabs-2\">\n                <ul class=\"nav nav-tabs\">\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==1}\" (click)=\"changeFlag(1)\" >This Week</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==2}\" (click)=\"changeFlag(2)\" >This Month</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==3}\" (click)=\"changeFlag(3)\" >Last Month</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==4}\" (click)=\"changeFlag(4)\" >Lifetime</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"javascript://\" [ngClass]=\"{'active':parameter.flag==5}\" (click)=\"parameter.flag=5\" >Custom</a>\n                </li>\n                </ul>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-12\">\n            <div *ngIf=\"parameter.flag == 5\" class=\"row\">\n                <div class=\"offset-lg-7\"></div>\n                <div class=\"col-lg-2 col-md-2 col-sm-5 col-5\">\n                <div class=\"form-group marginB0\">\n                    <label>From:</label>\n                    <p-calendar showIcon=\"true\" [(ngModel)]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n                </div>\n                </div>\n                <div class=\"col-lg-2 col-md-2 col-sm-5 col-5\">\n                <div class=\"form-group marginB0\">\n                    <label>To:</label>\n                    <p-calendar showIcon=\"true\" [(ngModel)]=\"parameter.max\" [minDate]=\"parameter.min\" [maxDate]=\"today\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\"></p-calendar>\n                </div>\n                </div>\n                <div class=\"col-lg-1 col-md-2 col-sm-2 col-6\">\n                <div class=\"form-group btn-cont\">\n                    <label class=\"addMT3\">&nbsp;</label>\n                    <button class=\"btn btn-calender\" href=\"javascript://\" (click)=\"getListing(); getCSRDashBoardData();\"\n                        [disabled]=\"!parameter.min || !parameter.max\">Apply</button>\n                </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"listingResults\" >\n        <div class=\"row\" *ngIf=\"admin?.admin_acl['Outside Broker Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n            <div class=\"col-md-2\">\n                <div class=\"form-group\">\n                    <label>Country</label>\n                    <select class=\"form-control\" (change)=\"onCountryChange($event.target.value)\">\n                        <option value=\"0\">All</option>\n                        <option *ngFor=\"let item of location.countries\" [value]=\"item.id\">{{item.name}}</option>\n                    </select>\n                </div>\n            </div>\n            <div class=\"col-md-2\">\n                <div class=\"form-group\">\n                <label>State</label>\n                <select class=\"form-control\" (change)=\"onStateChange($event.target.value)\">\n                    <option value=\"0\">All</option>\n                    <option *ngFor=\"let item of location.states\" [value]=\"item.id\">{{item.name}}</option>\n                </select>\n                </div>\n            </div>\n            <div class=\"col-md-2\">\n                <div class=\"form-group\">\n                <label>City</label>\n                    <select class=\"form-control\" (change)=\"onCityChange($event.target.value)\">\n                    <option value=\"0\">All</option>\n                    <option *ngFor=\"let item of location.cities\" [value]=\"item.id\">{{item.name}}</option>\n                    </select>\n                </div>\n            </div>\n        \n            <div class=\"col-md-2\">\n                <div class=\"form-group\">\n                <label>Locality</label>\n                <select class=\"form-control\" (change)=\"onLocalityChange($event.target.value)\">\n                    <option value=\"0\">All</option>\n                    <option *ngFor=\"let item of location.localities\" [value]=\"item.id\">{{item.name}}</option>\n                </select>\n                </div>\n            </div>\n            <div class=\"col-md-2\">\n                <div class=\"form-group btn-cont\">\n                <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n                <button type=\"button\" (click)=\"getListing(); getCSRDashBoardData();\" class=\"btn btn-primary-new width100P\">Apply</button>\n                </div>\n            </div>\n    \n            <div class=\"col-md-2\">\n                <div class=\"form-group btn-cont\">\n                <label style=\"display: block; margin-top: 3px;\">&nbsp;</label>\n                <button type=\"button\" (click)=\"resetFilters()\" class=\"btn btn-primary-new width100P\">Reset</button>\n                </div>\n            </div>\n        </div>\n\n        <div *ngIf=\"selectedUser as item\" class=\"sigle-row-table\">\n            <table class=\"table table-striped\">\n                <tbody>\n                    <tr>\n                        <td> <img class=\"rounded-circle\" [src]=\"item.image\" onerror='this.src=\"assets/img/default_img.png\"' alt=\"img\"></td>\n                        <td class=\"text-left\">\n                            <span class=\"name\">{{item.name | titlecase}}</span>\n                        </td>\n                        <td class=\"text-left\">\n                            {{item.phone}}\n                        </td>\n                        <td class=\"text-left\">\n                            {{item.email}}\n                        </td>\n                        <td>\n                            <a (click)=\"removeCsrUser()\" href=\"javascript://\" class=\"icon-block edit-icon\"><img src=\"assets/img/remove-icon.png\" alt=\"remove\" title=\"remove\" /></a>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-lg-8 col-md-12 col-sm-12 col-12\">\n                <div class=\"info-box all-leads\">\n                <div class=\"row\">\n                    <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == '1'}\" (click)=\"changeCountFlag(1)\">\n                        <div class=\"one-row \">\n                            <div class=\"o-block\">\n                            <h5>Leads</h5>\n                            <small>Total</small>\n                            </div>\n                            <div class=\"o-block\">\n                            <a class=\"view-all\" href=\"javascript://\">View All</a>\n                            <h4>{{dash?.lead_total}}</h4>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == '2'}\" (click)=\"changeCountFlag(2)\">\n                        <div class=\"one-row\">\n                            <div class=\"o-block\">\n                            <h5>Properties</h5>\n                            <small>Dealing In</small>\n                            </div>\n                            <div class=\"o-block\">\n                            <a class=\"view-all\" href=\"javascript://\">View All</a>\n                            <h4>{{dash?.lead_properties}}</h4>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                </div>\n                <div class=\"info-box all-leads\">\n                <div class=\"row\">\n                    <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == '3'}\" (click)=\"changeCountFlag(3)\">\n                        <div class=\"one-row \">\n                            <div class=\"o-block\">\n                            <h5>Leads</h5>\n                            <small>Open</small>\n                            </div>\n                            <div class=\"o-block\">\n                            <a class=\"view-all\" href=\"javascript://\">View All</a>\n                            <h4>{{dash?.lead_open}}</h4>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"col-md-6 col-sm-6 col-12\" [ngClass]=\"{'active':parameter.count_flag == '4'}\" (click)=\"changeCountFlag(4)\">\n                        <div class=\"one-row\">\n                            <div class=\"o-block\">\n                            <h5>Leads</h5>\n                            <small>Deal Finalized</small>\n                            </div>\n                            <div class=\"o-block\">\n                            <a class=\"view-all\" href=\"javascript://\">View All</a>\n                            <h4>{{dash?.lead_closed}}</h4>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                </div>\n        \n            </div>\n            <div class=\"col-lg-4 col-md-12 col-sm-12 col-12\">\n                <div class=\"chat-msg all-leads\" style=\"padding:0px\">\n                    <div class=\"padding20\" *ngIf=\"dash.lead_total == 0\">No records found</div>\n                    <ngx-charts-pie-chart [results]=\"chartView\"></ngx-charts-pie-chart>\n                </div>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-12\">\n                <div class=\"spacer40\"></div>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-lg-6 col-md-6 col-6\">\n                <div class=\"title-group\">\n                <h5>Leads \n                    <span *ngIf=\"parameter.count_flag == 1\">(Total)</span>\n                    <span *ngIf=\"parameter.count_flag == 2\">(Properties Dealing In)</span>\n                    <span *ngIf=\"parameter.count_flag == 3\">(Open)</span>\n                    <span *ngIf=\"parameter.count_flag == 4\">(Deal Finalized)</span>\n                </h5>\n                </div>\n            </div>\n            <div class=\"col-lg-6 col-md-6 col-5\" *ngIf=\"admin?.admin_acl['Outside Broker Lead Management']?.can_read==1 && !this.parameter.assignee_id\">\n                <div class=\"add-new text-right\">\n                    <a class=\"btn\" (click)=\"bulkAssign()\" href=\"javascript://\">Bulk Re-assign</a>\n                </div>\n            </div>\n        </div>\n        <div class=\"white-bg\">\n            <div class=\"tabel-section\">\n                <div class=\"table-responsive\">\n                    <table class=\"table table-striped table-align-left vertical-align-top\">\n                        <tr>\n                            <th *ngIf=\"admin?.admin_acl['Outside Broker Lead Management']?.can_read==1 && !this.parameter.assignee_id\" style=\"width:6%\">\n                                <div class=\"table-search\">\n                                    <label>All</label>\n                                    <div>\n                                        <label class=\"cust-check-bx\" >\n                                            <input class=\"width1\" type=\"checkbox\" (click)=\"selectAll(parameter.is_selected)\" name=\"document\">\n                                            <span class=\"checkmark\"></span>\n                                        </label>\n                                    </div>\n                                </div>\n                            </th>\n\n                            <th style=\"width:6%\">\n                                <div class=\"table-search\"></div>\n                            </th>\n                            <th style=\"width:15%\">\n                                <div class=\"table-search\">\n                                    <label>Name</label>\n                                    <div class=\"searh-3\">\n                                        <input autocomplete=\"off\" type=\"text\" [(ngModel)]=\"parameter.name\" (keyup.enter)=\"changeFilter('name',$event.target.value)\" name=\"\">\n                                        <button *ngIf=\"parameter.name\" (click)=\"changeFilter('name', parameter.name)\"><i class=\"fa fa-search\"></i></button>\n                                    </div>\n                                </div>\n                            </th>\n                            <th style=\"width:15%; text-align:left;\">\n                                <div class=\"table-search\">\n                                    <label>Contact Number</label>\n                                    <div class=\"searh-3\">\n                                        <input autocomplete=\"off\" type=\"text\" [(ngModel)]=\"parameter.phone\" (keyup.enter)=\"changeFilter('phone',$event.target.value)\" name=\"\">\n                                        <button *ngIf=\"parameter.phone\" (click)=\"changeFilter('phone', parameter.phone)\"><i class=\"fa fa-search\"></i></button>\n                                    </div>\n                                </div>\n                            </th>\n                            <th style=\"width:20%\">\n                                <div class=\"table-search\">\n                                    <label>Email</label>\n                                    <div class=\"searh-3\">\n                                        <input autocomplete=\"off\" type=\"text\" [(ngModel)]=\"parameter.email\" (keyup.enter)=\"changeFilter('email',$event.target.value)\" name=\"\">\n                                        <button *ngIf=\"parameter.email\" (click)=\"changeFilter('email', parameter.email)\"><i class=\"fa fa-search\"></i></button>\n                                    </div>\n                                </div>\n                            </th>\n                            <th style=\"width:10%\">\n                                <div class=\"table-search\">\n                                    <label>Interested In</label>\n                                </div>\n                            </th>\n                            <th style=\"width:10%\">\n                                <div class=\"table-search\">\n                                    <label>Assignee</label>\n                                </div>\n                            </th>\n                            <th style=\"width:10%\">\n                                <div class=\"table-search\">\n                                    <label>User Choice</label>\n                                </div>\n                            </th>\n                            <th style=\"width:10%\">\n                                <div class=\"table-search\">\n                                    <label>Change Property For</label>\n                                </div>\n                            </th>\n                            <!-- <th style=\"width:4%\"></th> -->\n                        </tr>\n                        <tr class=\"cursor-pointer\" title=\"Click to view details\" *ngFor=\"let item of items| paginate: { itemsPerPage: parameter.itemsPerPage, currentPage: parameter.page, totalItems: parameter.total }; let in=index\"\n                            routerLink=\"/dashboard/leads/inhouse-broker/{{item.id}}\">\n                        <td *ngIf=\"admin?.admin_acl['Outside Broker Lead Management']?.can_read==1 && !this.parameter.assignee_id\" (click)=\"$event.stopPropagation()\">\n                            <label class=\"cust-check-bx\" >\n                            <input type=\"checkbox\" [(ngModel)]=\"item.selected\" name=\"document\">\n                            <span class=\"checkmark\"></span>\n                            </label>\n                            <!-- <i class=\"fa\" [ngClass]=\"item.selected?'fa-check-square-o':'fa-square-o'\" (click)=\"item.selected = !item.selected\" aria-hidden=\"true\"></i> -->\n                        </td>\n                        <td>\n                            <img [src]=\"item?.user?.image ? item?.user?.image : item?.image| img:'small'\" class=\"rounded-circle\"\n                                    onerror='src=\"assets/img/default_img.png\"' alt=\"img\">\n                        </td>\n                        <td class=\"text-left\">\n                            <span class=\"name\">{{item.name | titlecase}}</span>\n                        </td>\n                        <td class=\"text-left\" *ngIf=\"item.phone\">{{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}</td>\n                        <td class=\"text-left\" *ngIf=\"!item.phone\">NA</td>\n                        <td class=\"text-left\">{{item.email}}</td>\n                        <td>\n                            <span *ngFor=\"let conf of item.configuration; let ii=index\">\n                                <app-property-configuration *ngIf=\"conf\" [configuration]=\"conf\"></app-property-configuration>\n                                <span *ngIf=\"ii<item?.configuration?.length-1\"> | </span> <br>\n                            </span>\n                            <span *ngIf=\"item.configuration?.length==0\">NA</span>\n                        </td>\n                        <td class=\"text-left\" title=\"Outside Broker\" *ngIf=\"item?.broker?.name\">{{item.broker.name | titlecase}}</td>\n                        <td class=\"text-left\" *ngIf=\"!item?.admin?.name\">Not Assigned</td>\n                        <td class=\"text-left\" *ngIf=\"item.sale_rent\">{{item.sale_rent==1 ? ts.lang.Buy : 'Rent'}}</td>\n                        <td class=\"text-left\">\n                            <a *ngIf=\"admin?.admin_acl['Outside Broker Lead Management']?.can_update==0\" class=\"green-color fontW500\" href=\"javascript://\">\n                                Change to {{item.sale_rent==1 ? 'Rent' : ts.lang.Buy}}\n                            </a>\n                            <a *ngIf=\"admin?.admin_acl['Outside Broker Lead Management']?.can_update==1\" class=\"green-color fontW500\" (click)=\"updateLeadType($event, item.sale_rent==1?'2':'1', item.id, in)\" href=\"javascript://\">\n                                Change to {{item.sale_rent==1 ? 'Rent' : ts.lang.Buy}}\n                            </a>\n                        </td>\n                        <!-- <td>\n                            <a href=\"javascript://\" title=\"View Details\" routerLink=\"/dashboard/leads/inhouse-broker/{{item.id}}\" class=\"icon-block edit-icon\"><img src=\"assets/img/edit.png\" alt=\"img\"></a>\n                        </td> -->\n                        </tr>\n                    </table>\n                    <div class=\"padding20 center\" *ngIf=\"parameter.noResultFound\">\n                            <img src=\"assets/img/404-error.png\">\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"btn-cont marginT15\" *ngIf=\"parameter.total\">\n        <div class=\"row\">\n            <div class=\"col-6\">\n                <div class=\"title-group\">\n                    <p>Showing {{items?.length}} out of {{parameter.total}}</p>\n                </div>\n            </div>\n            <div class=\"col-6 text-right\">\n                <pagination-controls class=\"my-pagination\" (pageChange)=\"getPage($event)\"></pagination-controls>\n            </div>\n        </div>\n    </div>\n</div>\n\n\n\n<!-- Assignment model -->\n<a data-toggle=\"modal\" data-target=\"#assign-model\" #openAssignModel></a>\n<div class=\"modal\" id=\"assign-model\">\n        <div class=\"modal-dialog \">\n            <div class=\"modal-content notary-avail\">\n                <div class=\"modal-header popup-header\">\n                <h4 class=\"modal-title\">Re Assign to</h4>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" #closeAssignModel>&times;</button>\n                </div>\n                <div class=\"modal-body\">\n                    <div class=\"row\">\n                        <div class=\"col-md-8 col-6\">\n                            <input style=\"max-width:200px\" list=\"amenities\" [(ngModel)]=\"assign.keyword\" (keyup.enter)=\"getAssignListing()\" class=\"form-control\" type=\"text\" name=\"keyword\" placeholder=\"Search\">\n                        </div>\n                        <div class=\"col-md-4 col-5 btn-cont\">\n                            <a class=\"btn btn-primary pull-right\" href=\"javascript://\" (click)=\"assignNow()\">Assign</a>\n                        </div>\n                    </div>\n                    <div class=\"spacer40\"></div>\n                    <div class=\"modal-table-data\" malihu-scrollbar [scrollbarOptions]=\"scrollbarOptions\">\n                        <table class=\"table\">\n                            <tr *ngFor=\"let item of assign.items\">\n                                <td *ngIf=\"item.is_blocked!=1\">\n                                    <div class=\"n-avail-profile\">\n                                    <img [src]=\"item.image\" onerror='src=\"assets/img/default_img.png\"' alt=\"img\">\n                                    <div class=\"n-avail-info\">\n                                        <p class=\"p12\">{{item.name | titlecase}}</p>\n                                        <p class=\"p10\">Phone : {{item.dial_code ? item.dial_code : constant.dial_code}}-{{item.phone}}</p>\n                                    </div>\n                                    </div>\n                                </td>\n                                <td *ngIf=\"item.is_blocked!=1\">\n                                    <label class=\"cust-check-bx float-right\">\n                                        <input type=\"radio\" name=\"notary_id\" (click)=\"assignItem = item\">\n                                        <span class=\"checkmark\"></span>\n                                    </label>\n                                </td>\n                            </tr>\n                            <tr *ngIf=\"assign?.items?.length==0\">\n                                <p class=\"show-not-found\">No Outside Agent found.</p>\n                            </tr>\n                        </table>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    "

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
/* harmony import */ var src_app_lang_translate_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/lang/translate.service */ "./src/app/lang/translate.service.ts");
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
    function OutsideBrokerComponent(admin, constant, route, spinner, ts) {
        this.admin = admin;
        this.constant = constant;
        this.route = route;
        this.spinner = spinner;
        this.ts = ts;
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
        this.parameter.is_selected = false;
        this.parameter.keyword = '';
        this.parameter.itemsPerPage = this.constant.itemsPerPage;
        this.parameter.page = this.constant.p;
        this.parameter.flag = 2;
        this.parameter.total = 0;
        this.parameter.count_flag = 1;
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
                    'name': 'Lead (Properties)',
                    'value': parseInt(_this.dash.lead_properties, 10)
                },
                {
                    'name': 'Lead (Open)',
                    'value': parseInt(_this.dash.lead_open, 10)
                },
                {
                    'name': 'Leads (Deal finalized)',
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
            html: this.constant.title.ARE_YOU_SURE + '<br>' + 'You want to change availability for this property?',
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
                    swal('Success', 'Availability for this property changed successfully.', 'success');
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
            swal('Error', 'Please choose atleast one lead.', 'error');
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
            swal('Success', 'Assigned successfully', 'success');
            _this.closeAssignModel.nativeElement.click();
            _this.getListing();
        }, function (error) {
            _this.spinner.hide();
            _this.closeAssignModel.nativeElement.click();
            swal('Error', error.error.message, 'error');
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
            src_app_common_constants__WEBPACK_IMPORTED_MODULE_2__["Constant"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerService"],
            src_app_lang_translate_service__WEBPACK_IMPORTED_MODULE_6__["TranslateService"]])
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