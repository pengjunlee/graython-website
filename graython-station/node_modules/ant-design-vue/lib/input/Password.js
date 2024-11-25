"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = require("vue");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classNames2 = _interopRequireDefault(require("../_util/classNames"));

var _propsUtil = require("../_util/props-util");

var _vnode = require("../_util/vnode");

var _Input = _interopRequireDefault(require("./Input"));

var _EyeOutlined = _interopRequireDefault(require("@ant-design/icons-vue/lib/icons/EyeOutlined"));

var _EyeInvisibleOutlined = _interopRequireDefault(require("@ant-design/icons-vue/lib/icons/EyeInvisibleOutlined"));

var _inputProps = _interopRequireDefault(require("./inputProps"));

var _useConfigInject2 = _interopRequireDefault(require("../_util/hooks/useConfigInject"));

var _omit = _interopRequireDefault(require("../_util/omit"));

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

var ActionMap = {
  click: 'onClick',
  hover: 'onMouseover'
};

var defaultIconRender = function defaultIconRender(visible) {
  return visible ? (0, _vue.createVNode)(_EyeOutlined.default, null, null) : (0, _vue.createVNode)(_EyeInvisibleOutlined.default, null, null);
};

var _default = (0, _vue.defineComponent)({
  name: 'AInputPassword',
  inheritAttrs: false,
  props: (0, _extends2.default)((0, _extends2.default)({}, (0, _inputProps.default)()), {
    prefixCls: String,
    inputPrefixCls: String,
    action: {
      type: String,
      default: 'click'
    },
    visibilityToggle: {
      type: Boolean,
      default: true
    },
    iconRender: Function
  }),
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        attrs = _ref.attrs,
        expose = _ref.expose;
    var visible = (0, _vue.ref)(false);

    var onVisibleChange = function onVisibleChange() {
      var disabled = props.disabled;

      if (disabled) {
        return;
      }

      visible.value = !visible.value;
    };

    var inputRef = (0, _vue.ref)();

    var focus = function focus() {
      var _a;

      (_a = inputRef.value) === null || _a === void 0 ? void 0 : _a.focus();
    };

    var blur = function blur() {
      var _a;

      (_a = inputRef.value) === null || _a === void 0 ? void 0 : _a.blur();
    };

    expose({
      focus: focus,
      blur: blur
    });

    var getIcon = function getIcon(prefixCls) {
      var _iconProps;

      var action = props.action,
          _props$iconRender = props.iconRender,
          iconRender = _props$iconRender === void 0 ? slots.iconRender || defaultIconRender : _props$iconRender;
      var iconTrigger = ActionMap[action] || '';
      var icon = iconRender(visible.value);
      var iconProps = (_iconProps = {}, (0, _defineProperty2.default)(_iconProps, iconTrigger, onVisibleChange), (0, _defineProperty2.default)(_iconProps, "class", "".concat(prefixCls, "-icon")), (0, _defineProperty2.default)(_iconProps, "key", 'passwordIcon'), (0, _defineProperty2.default)(_iconProps, "onMousedown", function onMousedown(e) {
        // Prevent focused state lost
        // https://github.com/ant-design/ant-design/issues/15173
        e.preventDefault();
      }), (0, _defineProperty2.default)(_iconProps, "onMouseup", function onMouseup(e) {
        // Prevent caret position change
        // https://github.com/ant-design/ant-design/issues/23524
        e.preventDefault();
      }), _iconProps);
      return (0, _vnode.cloneElement)((0, _propsUtil.isValidElement)(icon) ? icon : (0, _vue.createVNode)("span", null, [icon]), iconProps);
    };

    var _useConfigInject = (0, _useConfigInject2.default)('input-password', props),
        prefixCls = _useConfigInject.prefixCls,
        getPrefixCls = _useConfigInject.getPrefixCls;

    var inputPrefixCls = (0, _vue.computed)(function () {
      return getPrefixCls('input', props.inputPrefixCls);
    });

    var renderPassword = function renderPassword() {
      var size = props.size,
          visibilityToggle = props.visibilityToggle,
          restProps = __rest(props, ["size", "visibilityToggle"]);

      var suffixIcon = visibilityToggle && getIcon(prefixCls.value);
      var inputClassName = (0, _classNames2.default)(prefixCls.value, attrs.class, (0, _defineProperty2.default)({}, "".concat(prefixCls.value, "-").concat(size), !!size));
      var omittedProps = (0, _extends2.default)((0, _extends2.default)((0, _extends2.default)({}, (0, _omit.default)(restProps, ['suffix', 'iconRender', 'action'])), attrs), {
        type: visible.value ? 'text' : 'password',
        class: inputClassName,
        prefixCls: inputPrefixCls.value,
        suffix: suffixIcon
      });

      if (size) {
        omittedProps.size = size;
      }

      return (0, _vue.createVNode)(_Input.default, (0, _objectSpread2.default)({
        "ref": inputRef
      }, omittedProps), slots);
    };

    return function () {
      return renderPassword();
    };
  }
});

exports.default = _default;