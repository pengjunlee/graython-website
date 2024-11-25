import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { createVNode as _createVNode } from "vue";

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

import PropTypes from '../_util/vue-types';
import { filterEmpty } from '../_util/props-util';
import { cloneElement } from '../_util/vnode';
import { defineComponent } from 'vue';
import classNames from '../_util/classNames';
export default defineComponent({
  name: 'Steps',
  props: {
    type: PropTypes.string.def('default'),
    prefixCls: PropTypes.string.def('vc-steps'),
    iconPrefix: PropTypes.string.def('vc'),
    direction: PropTypes.string.def('horizontal'),
    labelPlacement: PropTypes.string.def('horizontal'),
    status: PropTypes.string.def('process'),
    size: PropTypes.string.def(''),
    progressDot: PropTypes.oneOfType([PropTypes.looseBool, PropTypes.func]).def(undefined),
    initial: PropTypes.number.def(0),
    current: PropTypes.number.def(0),
    icons: PropTypes.shape({
      finish: PropTypes.any,
      error: PropTypes.any
    }).loose,
    stepIcon: Function
  },
  slots: ['stepIcon', 'progressDot'],
  emits: ['change'],
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        emit = _ref.emit;

    var onStepClick = function onStepClick(next) {
      var current = props.current;

      if (current !== next) {
        emit('change', next);
      }
    };

    return function () {
      var _classNames;

      var _a;

      var prefixCls = props.prefixCls,
          direction = props.direction,
          type = props.type,
          labelPlacement = props.labelPlacement,
          iconPrefix = props.iconPrefix,
          status = props.status,
          size = props.size,
          current = props.current,
          _props$progressDot = props.progressDot,
          progressDot = _props$progressDot === void 0 ? slots.progressDot : _props$progressDot,
          initial = props.initial,
          icons = props.icons,
          _props$stepIcon = props.stepIcon,
          stepIcon = _props$stepIcon === void 0 ? slots.stepIcon : _props$stepIcon;
      var isNav = type === 'navigation';
      var adjustedLabelPlacement = progressDot ? 'vertical' : labelPlacement;
      var classString = classNames(prefixCls, "".concat(prefixCls, "-").concat(direction), (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-").concat(size), size), _defineProperty(_classNames, "".concat(prefixCls, "-label-").concat(adjustedLabelPlacement), direction === 'horizontal'), _defineProperty(_classNames, "".concat(prefixCls, "-dot"), !!progressDot), _defineProperty(_classNames, "".concat(prefixCls, "-navigation"), isNav), _classNames));
      var children = filterEmpty((_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots));
      return _createVNode("div", {
        "class": classString
      }, [children.map(function (child, index) {
        // description: PropTypes.any,
        // icon: PropTypes.any,
        // status: PropTypes.oneOf(tuple('wait', 'process', 'finish', 'error')),
        // disabled: { type: Boolean, default: undefined },
        // title: PropTypes.any,
        // subTitle: PropTypes.any,
        var _a = child.props || {},
            _a$prefixCls = _a.prefixCls,
            pre = _a$prefixCls === void 0 ? prefixCls : _a$prefixCls,
            restProps = __rest(_a, ["prefixCls"]);

        var stepNumber = initial + index;

        var stepProps = _extends(_extends({}, restProps), {
          stepNumber: stepNumber + 1,
          stepIndex: stepNumber,
          key: stepNumber,
          prefixCls: pre,
          iconPrefix: iconPrefix,
          progressDot: progressDot,
          icons: icons,
          stepIcon: stepIcon,
          onStepClick: onStepClick
        }); // fix tail color


        if (status === 'error' && index === current - 1) {
          stepProps.class = "".concat(prefixCls, "-next-error");
        }

        if (!restProps.status) {
          if (stepNumber === current) {
            stepProps.status = status;
          } else if (stepNumber < current) {
            stepProps.status = 'finish';
          } else {
            stepProps.status = 'wait';
          }
        }

        stepProps.active = stepNumber === current;
        return cloneElement(child, stepProps);
      })]);
    };
  }
});