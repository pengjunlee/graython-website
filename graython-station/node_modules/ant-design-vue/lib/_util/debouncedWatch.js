"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debounceFilter = debounceFilter;
exports.default = debouncedWatch;
exports.watchWithFilter = watchWithFilter;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _vue = require("vue");

// copy from https://github.dev/vueuse/vueuse
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var bypassFilter = function bypassFilter(invoke) {
  return invoke();
};
/**
 * Create an EventFilter that debounce the events
 *
 * @param ms
 */


function debounceFilter(ms) {
  var timer;

  var filter = function filter(invoke) {
    var duration = (0, _vue.unref)(ms);
    if (timer) clearTimeout(timer);
    if (duration <= 0) return invoke();
    timer = setTimeout(invoke, duration);
  };

  return filter;
}
/**
 * @internal
 */


function createFilterWrapper(filter, fn) {
  function wrapper() {
    var _this = this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    filter(function () {
      return fn.apply(_this, args);
    }, {
      fn: fn,
      thisArg: this,
      args: args
    });
  }

  return wrapper;
} // implementation


function watchWithFilter(source, cb) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var _options$eventFilter = options.eventFilter,
      eventFilter = _options$eventFilter === void 0 ? bypassFilter : _options$eventFilter,
      watchOptions = __rest(options, ["eventFilter"]);

  return (0, _vue.watch)(source, createFilterWrapper(eventFilter, cb), watchOptions);
} // implementation


function debouncedWatch(source, cb) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var _options$debounce = options.debounce,
      debounce = _options$debounce === void 0 ? 0 : _options$debounce,
      watchOptions = __rest(options, ["debounce"]);

  return watchWithFilter(source, cb, (0, _extends2.default)((0, _extends2.default)({}, watchOptions), {
    eventFilter: debounceFilter(debounce)
  }));
}