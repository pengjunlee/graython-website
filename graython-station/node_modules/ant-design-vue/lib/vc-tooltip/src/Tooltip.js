"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = require("vue");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _vueTypes = _interopRequireDefault(require("../../_util/vue-types"));

var _vcTrigger = _interopRequireDefault(require("../../vc-trigger"));

var _placements = require("./placements");

var _Content = _interopRequireDefault(require("./Content"));

var _propsUtil = require("../../_util/props-util");

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

function noop() {}

var _default = (0, _vue.defineComponent)({
  name: 'Tooltip',
  inheritAttrs: false,
  props: {
    trigger: _vueTypes.default.any.def(['hover']),
    defaultVisible: {
      type: Boolean,
      default: undefined
    },
    visible: {
      type: Boolean,
      default: undefined
    },
    placement: _vueTypes.default.string.def('right'),
    transitionName: String,
    animation: _vueTypes.default.any,
    afterVisibleChange: _vueTypes.default.func.def(function () {}),
    overlayStyle: {
      type: Object,
      default: undefined
    },
    overlayClassName: String,
    prefixCls: _vueTypes.default.string.def('rc-tooltip'),
    mouseEnterDelay: _vueTypes.default.number.def(0.1),
    mouseLeaveDelay: _vueTypes.default.number.def(0.1),
    getPopupContainer: Function,
    destroyTooltipOnHide: {
      type: Boolean,
      default: false
    },
    align: _vueTypes.default.object.def(function () {
      return {};
    }),
    arrowContent: _vueTypes.default.any.def(null),
    tipId: String,
    builtinPlacements: _vueTypes.default.object,
    overlayInnerStyle: {
      type: Object,
      default: undefined
    },
    popupVisible: {
      type: Boolean,
      default: undefined
    },
    onVisibleChange: Function,
    onPopupAlign: Function
  },
  slots: ['arrowContent', 'overlay'],
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        attrs = _ref.attrs,
        expose = _ref.expose;
    var triggerDOM = (0, _vue.ref)();

    var getPopupElement = function getPopupElement() {
      var prefixCls = props.prefixCls,
          tipId = props.tipId,
          overlayInnerStyle = props.overlayInnerStyle;
      return [(0, _vue.createVNode)("div", {
        "class": "".concat(prefixCls, "-arrow"),
        "key": "arrow"
      }, [(0, _propsUtil.getPropsSlot)(slots, props, 'arrowContent')]), (0, _vue.createVNode)(_Content.default, {
        "key": "content",
        "prefixCls": prefixCls,
        "id": tipId,
        "overlayInnerStyle": overlayInnerStyle
      }, {
        overlay: slots.overlay
      })];
    };

    var getPopupDomNode = function getPopupDomNode() {
      return triggerDOM.value.getPopupDomNode();
    };

    expose({
      getPopupDomNode: getPopupDomNode,
      triggerDOM: triggerDOM,
      forcePopupAlign: function forcePopupAlign() {
        var _a;

        return (_a = triggerDOM.value) === null || _a === void 0 ? void 0 : _a.forcePopupAlign();
      }
    });
    var destroyTooltip = (0, _vue.ref)(false);
    var autoDestroy = (0, _vue.ref)(false);
    (0, _vue.watchEffect)(function () {
      var destroyTooltipOnHide = props.destroyTooltipOnHide;

      if (typeof destroyTooltipOnHide === 'boolean') {
        destroyTooltip.value = destroyTooltipOnHide;
      } else if (destroyTooltipOnHide && (0, _typeof2.default)(destroyTooltipOnHide) === 'object') {
        var keepParent = destroyTooltipOnHide.keepParent;
        destroyTooltip.value = keepParent === true;
        autoDestroy.value = keepParent === false;
      }
    });
    return function () {
      var overlayClassName = props.overlayClassName,
          trigger = props.trigger,
          mouseEnterDelay = props.mouseEnterDelay,
          mouseLeaveDelay = props.mouseLeaveDelay,
          overlayStyle = props.overlayStyle,
          prefixCls = props.prefixCls,
          afterVisibleChange = props.afterVisibleChange,
          transitionName = props.transitionName,
          animation = props.animation,
          placement = props.placement,
          align = props.align,
          destroyTooltipOnHide = props.destroyTooltipOnHide,
          defaultVisible = props.defaultVisible,
          restProps = __rest(props, ["overlayClassName", "trigger", "mouseEnterDelay", "mouseLeaveDelay", "overlayStyle", "prefixCls", "afterVisibleChange", "transitionName", "animation", "placement", "align", "destroyTooltipOnHide", "defaultVisible"]);

      var extraProps = (0, _extends2.default)({}, restProps);

      if (props.visible !== undefined) {
        extraProps.popupVisible = props.visible;
      }

      var triggerProps = (0, _extends2.default)((0, _extends2.default)((0, _extends2.default)({
        popupClassName: overlayClassName,
        prefixCls: prefixCls,
        action: trigger,
        builtinPlacements: _placements.placements,
        popupPlacement: placement,
        popupAlign: align,
        afterPopupVisibleChange: afterVisibleChange,
        popupTransitionName: transitionName,
        popupAnimation: animation,
        defaultPopupVisible: defaultVisible,
        destroyPopupOnHide: destroyTooltip.value,
        autoDestroy: autoDestroy.value,
        mouseLeaveDelay: mouseLeaveDelay,
        popupStyle: overlayStyle,
        mouseEnterDelay: mouseEnterDelay
      }, extraProps), attrs), {
        onPopupVisibleChange: props.onVisibleChange || noop,
        onPopupAlign: props.onPopupAlign || noop,
        ref: triggerDOM,
        popup: getPopupElement()
      });
      return (0, _vue.createVNode)(_vcTrigger.default, triggerProps, {
        default: slots.default
      });
    };
  }
});

exports.default = _default;