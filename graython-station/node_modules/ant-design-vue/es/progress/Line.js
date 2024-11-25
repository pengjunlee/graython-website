import _extends from "@babel/runtime/helpers/esm/extends";
import { createVNode as _createVNode, Fragment as _Fragment } from "vue";

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

import { presetPrimaryColors } from '@ant-design/colors';
import { computed, defineComponent } from 'vue';
import { progressProps } from './props';
import { getSuccessPercent, validProgress } from './utils';
export var lineProps = function lineProps() {
  return _extends(_extends({}, progressProps()), {
    prefixCls: String,
    direction: {
      type: String
    }
  });
};
/**
 * {
 *   '0%': '#afc163',
 *   '75%': '#009900',
 *   '50%': 'green',     ====>     '#afc163 0%, #66FF00 25%, #00CC00 50%, #009900 75%, #ffffff 100%'
 *   '25%': '#66FF00',
 *   '100%': '#ffffff'
 * }
 */

export var sortGradient = function sortGradient(gradients) {
  var tempArr = [];
  Object.keys(gradients).forEach(function (key) {
    var formattedKey = parseFloat(key.replace(/%/g, ''));

    if (!isNaN(formattedKey)) {
      tempArr.push({
        key: formattedKey,
        value: gradients[key]
      });
    }
  });
  tempArr = tempArr.sort(function (a, b) {
    return a.key - b.key;
  });
  return tempArr.map(function (_ref) {
    var key = _ref.key,
        value = _ref.value;
    return "".concat(value, " ").concat(key, "%");
  }).join(', ');
};
/**
 * Then this man came to realize the truth: Besides six pence, there is the moon. Besides bread and
 * butter, there is the bug. And... Besides women, there is the code.
 *
 * @example
 *   {
 *     "0%": "#afc163",
 *     "25%": "#66FF00",
 *     "50%": "#00CC00", // ====>  linear-gradient(to right, #afc163 0%, #66FF00 25%,
 *     "75%": "#009900", //        #00CC00 50%, #009900 75%, #ffffff 100%)
 *     "100%": "#ffffff"
 *   }
 */

export var handleGradient = function handleGradient(strokeColor, directionConfig) {
  var _strokeColor$from = strokeColor.from,
      from = _strokeColor$from === void 0 ? presetPrimaryColors.blue : _strokeColor$from,
      _strokeColor$to = strokeColor.to,
      to = _strokeColor$to === void 0 ? presetPrimaryColors.blue : _strokeColor$to,
      _strokeColor$directio = strokeColor.direction,
      direction = _strokeColor$directio === void 0 ? directionConfig === 'rtl' ? 'to left' : 'to right' : _strokeColor$directio,
      rest = __rest(strokeColor, ["from", "to", "direction"]);

  if (Object.keys(rest).length !== 0) {
    var sortedGradients = sortGradient(rest);
    return {
      backgroundImage: "linear-gradient(".concat(direction, ", ").concat(sortedGradients, ")")
    };
  }

  return {
    backgroundImage: "linear-gradient(".concat(direction, ", ").concat(from, ", ").concat(to, ")")
  };
};
export default defineComponent({
  name: 'Line',
  props: lineProps(),
  setup: function setup(props, _ref2) {
    var slots = _ref2.slots;
    var backgroundProps = computed(function () {
      var strokeColor = props.strokeColor,
          direction = props.direction;
      return strokeColor && typeof strokeColor !== 'string' ? handleGradient(strokeColor, direction) : {
        background: strokeColor
      };
    });
    var trailStyle = computed(function () {
      return props.trailColor ? {
        backgroundColor: props.trailColor
      } : undefined;
    });
    var percentStyle = computed(function () {
      var percent = props.percent,
          strokeWidth = props.strokeWidth,
          strokeLinecap = props.strokeLinecap,
          size = props.size;
      return _extends({
        width: "".concat(validProgress(percent), "%"),
        height: "".concat(strokeWidth || (size === 'small' ? 6 : 8), "px"),
        borderRadius: strokeLinecap === 'square' ? 0 : ''
      }, backgroundProps.value);
    });
    var successPercent = computed(function () {
      return getSuccessPercent(props);
    });
    var successPercentStyle = computed(function () {
      var strokeWidth = props.strokeWidth,
          size = props.size,
          strokeLinecap = props.strokeLinecap,
          success = props.success;
      return {
        width: "".concat(validProgress(successPercent.value), "%"),
        height: "".concat(strokeWidth || (size === 'small' ? 6 : 8), "px"),
        borderRadius: strokeLinecap === 'square' ? 0 : '',
        backgroundColor: success === null || success === void 0 ? void 0 : success.strokeColor
      };
    });
    return function () {
      var _a;

      return _createVNode(_Fragment, null, [_createVNode("div", {
        "class": "".concat(props.prefixCls, "-outer")
      }, [_createVNode("div", {
        "class": "".concat(props.prefixCls, "-inner"),
        "style": trailStyle.value
      }, [_createVNode("div", {
        "class": "".concat(props.prefixCls, "-bg"),
        "style": percentStyle.value
      }, null), successPercent.value !== undefined ? _createVNode("div", {
        "class": "".concat(props.prefixCls, "-success-bg"),
        "style": successPercentStyle.value
      }, null) : null])]), (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)]);
    };
  }
});