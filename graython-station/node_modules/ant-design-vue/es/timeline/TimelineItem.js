import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { createVNode as _createVNode } from "vue";
import { defineComponent } from 'vue';
import classNames from '../_util/classNames';
import PropTypes from '../_util/vue-types';
import initDefaultProps from '../_util/props-util/initDefaultProps';
import { tuple } from '../_util/type';
import useConfigInject from '../_util/hooks/useConfigInject';
export var timelineItemProps = function timelineItemProps() {
  return {
    prefixCls: String,
    color: String,
    dot: PropTypes.any,
    pending: {
      type: Boolean,
      default: undefined
    },
    position: PropTypes.oneOf(tuple('left', 'right', '')).def(''),
    label: PropTypes.any
  };
};
export default defineComponent({
  name: 'ATimelineItem',
  props: initDefaultProps(timelineItemProps(), {
    color: 'blue',
    pending: false
  }),
  slots: ['dot', 'label'],
  setup: function setup(props, _ref) {
    var slots = _ref.slots;

    var _useConfigInject = useConfigInject('timeline', props),
        prefixCls = _useConfigInject.prefixCls;

    return function () {
      var _classNames, _classNames2;

      var _a, _b, _c;

      var _props$color = props.color,
          color = _props$color === void 0 ? '' : _props$color,
          pending = props.pending,
          _props$label = props.label,
          label = _props$label === void 0 ? (_a = slots.label) === null || _a === void 0 ? void 0 : _a.call(slots) : _props$label,
          _props$dot = props.dot,
          dot = _props$dot === void 0 ? (_b = slots.dot) === null || _b === void 0 ? void 0 : _b.call(slots) : _props$dot;
      var itemClassName = classNames((_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls.value, "-item"), true), _defineProperty(_classNames, "".concat(prefixCls.value, "-item-pending"), pending), _classNames));
      var dotClassName = classNames((_classNames2 = {}, _defineProperty(_classNames2, "".concat(prefixCls.value, "-item-head"), true), _defineProperty(_classNames2, "".concat(prefixCls.value, "-item-head-custom"), dot), _defineProperty(_classNames2, "".concat(prefixCls.value, "-item-head-").concat(color), true), _classNames2));
      var customColor = /blue|red|green|gray/.test(color || '') ? undefined : color;
      return _createVNode("li", {
        "class": itemClassName
      }, [label && _createVNode("div", {
        "class": "".concat(prefixCls.value, "-item-label")
      }, [label]), _createVNode("div", {
        "class": "".concat(prefixCls.value, "-item-tail")
      }, null), _createVNode("div", {
        "class": dotClassName,
        "style": {
          borderColor: customColor,
          color: customColor
        }
      }, [dot]), _createVNode("div", {
        "class": "".concat(prefixCls.value, "-item-content")
      }, [(_c = slots.default) === null || _c === void 0 ? void 0 : _c.call(slots)])]);
    };
  }
});