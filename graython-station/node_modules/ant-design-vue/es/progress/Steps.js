import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import { createVNode as _createVNode } from "vue";
import { computed, defineComponent } from 'vue';
import { progressProps } from './props';
export var stepsProps = function stepsProps() {
  return _extends(_extends({}, progressProps()), {
    steps: Number,
    size: {
      type: String
    },
    strokeColor: String,
    trailColor: String
  });
};
export default defineComponent({
  name: 'Steps',
  props: stepsProps(),
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var current = computed(function () {
      return Math.round(props.steps * ((props.percent || 0) / 100));
    });
    var stepWidth = computed(function () {
      return props.size === 'small' ? 2 : 14;
    });
    var styledSteps = computed(function () {
      var steps = props.steps,
          _props$strokeWidth = props.strokeWidth,
          strokeWidth = _props$strokeWidth === void 0 ? 8 : _props$strokeWidth,
          strokeColor = props.strokeColor,
          trailColor = props.trailColor,
          prefixCls = props.prefixCls;
      var temp = [];

      for (var i = 0; i < steps; i += 1) {
        var _cls;

        var cls = (_cls = {}, _defineProperty(_cls, "".concat(prefixCls, "-steps-item"), true), _defineProperty(_cls, "".concat(prefixCls, "-steps-item-active"), i <= current.value - 1), _cls);
        temp.push(_createVNode("div", {
          "key": i,
          "class": cls,
          "style": {
            backgroundColor: i <= current.value - 1 ? strokeColor : trailColor,
            width: "".concat(stepWidth.value, "px"),
            height: "".concat(strokeWidth, "px")
          }
        }, null));
      }

      return temp;
    });
    return function () {
      var _a;

      return _createVNode("div", {
        "class": "".concat(props.prefixCls, "-steps-outer")
      }, [styledSteps.value, (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)]);
    };
  }
});