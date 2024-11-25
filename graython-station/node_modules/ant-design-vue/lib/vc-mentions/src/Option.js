"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.optionProps = exports.default = void 0;

var _vue = require("vue");

var optionProps = {
  value: String,
  disabled: Boolean,
  label: [String, Number, Function]
};
exports.optionProps = optionProps;

var _default = (0, _vue.defineComponent)({
  name: 'Option',
  props: optionProps,
  render: function render(_props, _ref) {
    var slots = _ref.slots;

    var _a;

    return (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots);
  }
});

exports.default = _default;