"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = require("vue");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classNames2 = _interopRequireDefault(require("../_util/classNames"));

var _default2 = (0, _vue.defineComponent)({
  name: 'Notice',
  inheritAttrs: false,
  props: ['prefixCls', 'duration', 'updateMark', 'noticeKey', 'closeIcon', 'closable', 'props', 'onClick', 'onClose', 'holder', 'visible'],
  setup: function setup(props, _ref) {
    var attrs = _ref.attrs,
        slots = _ref.slots;
    var closeTimer;
    var duration = (0, _vue.computed)(function () {
      return props.duration === undefined ? 1.5 : props.duration;
    });

    var startCloseTimer = function startCloseTimer() {
      if (duration.value) {
        closeTimer = setTimeout(function () {
          close();
        }, duration.value * 1000);
      }
    };

    var clearCloseTimer = function clearCloseTimer() {
      if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = null;
      }
    };

    var close = function close(e) {
      if (e) {
        e.stopPropagation();
      }

      clearCloseTimer();
      var onClose = props.onClose,
          noticeKey = props.noticeKey;

      if (onClose) {
        onClose(noticeKey);
      }
    };

    var restartCloseTimer = function restartCloseTimer() {
      clearCloseTimer();
      startCloseTimer();
    };

    (0, _vue.onMounted)(function () {
      startCloseTimer();
    });
    (0, _vue.onUnmounted)(function () {
      clearCloseTimer();
    });
    (0, _vue.watch)([duration, function () {
      return props.updateMark;
    }, function () {
      return props.visible;
    }], function (_ref2, _ref3) {
      var _ref4 = (0, _slicedToArray2.default)(_ref2, 3),
          preDuration = _ref4[0],
          preUpdateMark = _ref4[1],
          preVisible = _ref4[2];

      var _ref5 = (0, _slicedToArray2.default)(_ref3, 3),
          newDuration = _ref5[0],
          newUpdateMark = _ref5[1],
          newVisible = _ref5[2];

      if (preDuration !== newDuration || preUpdateMark !== newUpdateMark || preVisible !== newVisible && newVisible) {
        restartCloseTimer();
      }
    }, {
      flush: 'post'
    });
    return function () {
      var _a, _b;

      var prefixCls = props.prefixCls,
          closable = props.closable,
          _props$closeIcon = props.closeIcon,
          closeIcon = _props$closeIcon === void 0 ? (_a = slots.closeIcon) === null || _a === void 0 ? void 0 : _a.call(slots) : _props$closeIcon,
          onClick = props.onClick,
          holder = props.holder;
      var className = attrs.class,
          style = attrs.style;
      var componentClass = "".concat(prefixCls, "-notice");
      var dataOrAriaAttributeProps = Object.keys(attrs).reduce(function (acc, key) {
        if (key.substr(0, 5) === 'data-' || key.substr(0, 5) === 'aria-' || key === 'role') {
          acc[key] = attrs[key];
        }

        return acc;
      }, {});
      var node = (0, _vue.createVNode)("div", (0, _objectSpread2.default)({
        "class": (0, _classNames2.default)(componentClass, className, (0, _defineProperty2.default)({}, "".concat(componentClass, "-closable"), closable)),
        "style": style,
        "onMouseenter": clearCloseTimer,
        "onMouseleave": startCloseTimer,
        "onClick": onClick
      }, dataOrAriaAttributeProps), [(0, _vue.createVNode)("div", {
        "class": "".concat(componentClass, "-content")
      }, [(_b = slots.default) === null || _b === void 0 ? void 0 : _b.call(slots)]), closable ? (0, _vue.createVNode)("a", {
        "tabindex": 0,
        "onClick": close,
        "class": "".concat(componentClass, "-close")
      }, [closeIcon || (0, _vue.createVNode)("span", {
        "class": "".concat(componentClass, "-close-x")
      }, null)]) : null]);

      if (holder) {
        return (0, _vue.createVNode)(_vue.Teleport, {
          "to": holder
        }, {
          default: function _default() {
            return node;
          }
        });
      }

      return node;
    };
  }
});

exports.default = _default2;