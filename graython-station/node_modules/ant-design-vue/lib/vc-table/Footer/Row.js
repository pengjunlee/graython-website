"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = require("vue");

var _default = (0, _vue.defineComponent)({
  name: 'FooterRow',
  setup: function setup(_props, _ref) {
    var slots = _ref.slots;
    return function () {
      var _a;

      return (0, _vue.createVNode)("tr", null, [(_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)]);
    };
  }
});

exports.default = _default;