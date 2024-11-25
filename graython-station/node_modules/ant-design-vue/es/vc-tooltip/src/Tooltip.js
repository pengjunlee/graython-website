import _extends from "@babel/runtime/helpers/esm/extends";
import _typeof from "@babel/runtime/helpers/esm/typeof";
import { resolveDirective as _resolveDirective, createVNode as _createVNode } from "vue";

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

import PropTypes from '../../_util/vue-types';
import Trigger from '../../vc-trigger';
import { placements } from './placements';
import Content from './Content';
import { getPropsSlot } from '../../_util/props-util';
import { defineComponent, ref, watchEffect } from 'vue';

function noop() {}

export default defineComponent({
  name: 'Tooltip',
  inheritAttrs: false,
  props: {
    trigger: PropTypes.any.def(['hover']),
    defaultVisible: {
      type: Boolean,
      default: undefined
    },
    visible: {
      type: Boolean,
      default: undefined
    },
    placement: PropTypes.string.def('right'),
    transitionName: String,
    animation: PropTypes.any,
    afterVisibleChange: PropTypes.func.def(function () {}),
    overlayStyle: {
      type: Object,
      default: undefined
    },
    overlayClassName: String,
    prefixCls: PropTypes.string.def('rc-tooltip'),
    mouseEnterDelay: PropTypes.number.def(0.1),
    mouseLeaveDelay: PropTypes.number.def(0.1),
    getPopupContainer: Function,
    destroyTooltipOnHide: {
      type: Boolean,
      default: false
    },
    align: PropTypes.object.def(function () {
      return {};
    }),
    arrowContent: PropTypes.any.def(null),
    tipId: String,
    builtinPlacements: PropTypes.object,
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
    var triggerDOM = ref();

    var getPopupElement = function getPopupElement() {
      var prefixCls = props.prefixCls,
          tipId = props.tipId,
          overlayInnerStyle = props.overlayInnerStyle;
      return [_createVNode("div", {
        "class": "".concat(prefixCls, "-arrow"),
        "key": "arrow"
      }, [getPropsSlot(slots, props, 'arrowContent')]), _createVNode(Content, {
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
    var destroyTooltip = ref(false);
    var autoDestroy = ref(false);
    watchEffect(function () {
      var destroyTooltipOnHide = props.destroyTooltipOnHide;

      if (typeof destroyTooltipOnHide === 'boolean') {
        destroyTooltip.value = destroyTooltipOnHide;
      } else if (destroyTooltipOnHide && _typeof(destroyTooltipOnHide) === 'object') {
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

      var extraProps = _extends({}, restProps);

      if (props.visible !== undefined) {
        extraProps.popupVisible = props.visible;
      }

      var triggerProps = _extends(_extends(_extends({
        popupClassName: overlayClassName,
        prefixCls: prefixCls,
        action: trigger,
        builtinPlacements: placements,
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

      return _createVNode(Trigger, triggerProps, {
        default: slots.default
      });
    };
  }
});