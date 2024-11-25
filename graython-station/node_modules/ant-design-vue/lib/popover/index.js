"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.popoverProps = exports.default = void 0;

var _vue = require("vue");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _tooltip = _interopRequireDefault(require("../tooltip"));

var _abstractTooltipProps = _interopRequireDefault(require("../tooltip/abstractTooltipProps"));

var _vueTypes = _interopRequireDefault(require("../_util/vue-types"));

var _propsUtil = require("../_util/props-util");

var _type = require("../_util/type");

var _useConfigInject2 = _interopRequireDefault(require("../_util/hooks/useConfigInject"));

var _omit = _interopRequireDefault(require("../_util/omit"));

var _transition = require("../_util/transition");

var _Tooltip = require("../tooltip/Tooltip");

var popoverProps = function popoverProps() {
  return (0, _extends2.default)((0, _extends2.default)({}, (0, _abstractTooltipProps.default)()), {
    content: _vueTypes.default.any,
    title: _vueTypes.default.any
  });
};

exports.popoverProps = popoverProps;
var Popover = (0, _vue.defineComponent)({
  name: 'APopover',
  props: (0, _propsUtil.initDefaultProps)(popoverProps(), (0, _extends2.default)((0, _extends2.default)({}, (0, _Tooltip.tooltipDefaultProps)()), {
    trigger: 'hover',
    transitionName: 'zoom-big',
    placement: 'top',
    mouseEnterDelay: 0.1,
    mouseLeaveDelay: 0.1
  })),
  setup: function setup(props, _ref) {
    var expose = _ref.expose,
        slots = _ref.slots;
    var tooltipRef = (0, _vue.ref)();
    expose({
      getPopupDomNode: function getPopupDomNode() {
        var _a, _b;

        return (_b = (_a = tooltipRef.value) === null || _a === void 0 ? void 0 : _a.getPopupDomNode) === null || _b === void 0 ? void 0 : _b.call(_a);
      }
    });

    var _useConfigInject = (0, _useConfigInject2.default)('popover', props),
        prefixCls = _useConfigInject.prefixCls,
        configProvider = _useConfigInject.configProvider;

    var rootPrefixCls = (0, _vue.computed)(function () {
      return configProvider.getPrefixCls();
    });

    var getOverlay = function getOverlay() {
      var _a, _b;

      var _props$title = props.title,
          title = _props$title === void 0 ? (0, _propsUtil.filterEmpty)((_a = slots.title) === null || _a === void 0 ? void 0 : _a.call(slots)) : _props$title,
          _props$content = props.content,
          content = _props$content === void 0 ? (0, _propsUtil.filterEmpty)((_b = slots.content) === null || _b === void 0 ? void 0 : _b.call(slots)) : _props$content;
      var hasTitle = !!(Array.isArray(title) ? title.length : title);
      var hasContent = !!(Array.isArray(content) ? content.length : title);
      if (!hasTitle && !hasContent) return undefined;
      return (0, _vue.createVNode)(_vue.Fragment, null, [hasTitle && (0, _vue.createVNode)("div", {
        "class": "".concat(prefixCls.value, "-title")
      }, [title]), (0, _vue.createVNode)("div", {
        "class": "".concat(prefixCls.value, "-inner-content")
      }, [content])]);
    };

    return function () {
      return (0, _vue.createVNode)(_tooltip.default, (0, _objectSpread2.default)((0, _objectSpread2.default)({}, (0, _omit.default)(props, ['title', 'content'])), {}, {
        "prefixCls": prefixCls.value,
        "ref": tooltipRef,
        "transitionName": (0, _transition.getTransitionName)(rootPrefixCls.value, 'zoom-big', props.transitionName)
      }), {
        title: getOverlay,
        default: slots.default
      });
    };
  }
});

var _default = (0, _type.withInstall)(Popover);

exports.default = _default;