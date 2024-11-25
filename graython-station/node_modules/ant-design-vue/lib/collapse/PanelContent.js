"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = require("vue");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _commonProps = require("./commonProps");

var _classNames2 = _interopRequireDefault(require("../_util/classNames"));

var _default = (0, _vue.defineComponent)({
  name: 'PanelContent',
  props: (0, _commonProps.collapsePanelProps)(),
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var rendered = (0, _vue.ref)(false);
    (0, _vue.watchEffect)(function () {
      if (props.isActive || props.forceRender) {
        rendered.value = true;
      }
    });
    return function () {
      var _classNames;

      var _a;

      if (!rendered.value) return null;
      var prefixCls = props.prefixCls,
          isActive = props.isActive,
          role = props.role;
      return (0, _vue.createVNode)("div", {
        "ref": _vue.ref,
        "class": (0, _classNames2.default)("".concat(prefixCls, "-content"), (_classNames = {}, (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-content-active"), isActive), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-content-inactive"), !isActive), _classNames)),
        "role": role
      }, [(0, _vue.createVNode)("div", {
        "class": "".concat(prefixCls, "-content-box")
      }, [(_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)])]);
    };
  }
});

exports.default = _default;