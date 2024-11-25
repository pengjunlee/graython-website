"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.menuItemGroupProps = exports.default = void 0;

var _vue = require("vue");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _propsUtil = require("../../_util/props-util");

var _vueTypes = _interopRequireDefault(require("../../_util/vue-types"));

var _useMenuContext = require("./hooks/useMenuContext");

var _useKeyPath = require("./hooks/useKeyPath");

var menuItemGroupProps = function menuItemGroupProps() {
  return {
    title: _vueTypes.default.any
  };
};

exports.menuItemGroupProps = menuItemGroupProps;

var _default = (0, _vue.defineComponent)({
  name: 'AMenuItemGroup',
  inheritAttrs: false,
  props: menuItemGroupProps(),
  slots: ['title'],
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        attrs = _ref.attrs;

    var _useInjectMenu = (0, _useMenuContext.useInjectMenu)(),
        prefixCls = _useInjectMenu.prefixCls;

    var groupPrefixCls = (0, _vue.computed)(function () {
      return "".concat(prefixCls.value, "-item-group");
    });
    var isMeasure = (0, _useKeyPath.useMeasure)();
    return function () {
      var _a, _b;

      if (isMeasure) return (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots);
      return (0, _vue.createVNode)("li", (0, _objectSpread2.default)((0, _objectSpread2.default)({}, attrs), {}, {
        "onClick": function onClick(e) {
          return e.stopPropagation();
        },
        "class": groupPrefixCls.value
      }), [(0, _vue.createVNode)("div", {
        "title": typeof props.title === 'string' ? props.title : undefined,
        "class": "".concat(groupPrefixCls.value, "-title")
      }, [(0, _propsUtil.getPropsSlot)(slots, props, 'title')]), (0, _vue.createVNode)("ul", {
        "class": "".concat(groupPrefixCls.value, "-list")
      }, [(_b = slots.default) === null || _b === void 0 ? void 0 : _b.call(slots)])]);
    };
  }
});

exports.default = _default;