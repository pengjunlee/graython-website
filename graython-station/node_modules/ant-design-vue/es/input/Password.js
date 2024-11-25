import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
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

import classNames from '../_util/classNames';
import { isValidElement } from '../_util/props-util';
import { cloneElement } from '../_util/vnode';
import Input from './Input';
import EyeOutlined from "@ant-design/icons-vue/es/icons/EyeOutlined";
import EyeInvisibleOutlined from "@ant-design/icons-vue/es/icons/EyeInvisibleOutlined";
import inputProps from './inputProps';
import { computed, defineComponent, ref } from 'vue';
import useConfigInject from '../_util/hooks/useConfigInject';
import omit from '../_util/omit';
var ActionMap = {
  click: 'onClick',
  hover: 'onMouseover'
};

var defaultIconRender = function defaultIconRender(visible) {
  return visible ? _createVNode(EyeOutlined, null, null) : _createVNode(EyeInvisibleOutlined, null, null);
};

export default defineComponent({
  name: 'AInputPassword',
  inheritAttrs: false,
  props: _extends(_extends({}, inputProps()), {
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
    var visible = ref(false);

    var onVisibleChange = function onVisibleChange() {
      var disabled = props.disabled;

      if (disabled) {
        return;
      }

      visible.value = !visible.value;
    };

    var inputRef = ref();

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
      var iconProps = (_iconProps = {}, _defineProperty(_iconProps, iconTrigger, onVisibleChange), _defineProperty(_iconProps, "class", "".concat(prefixCls, "-icon")), _defineProperty(_iconProps, "key", 'passwordIcon'), _defineProperty(_iconProps, "onMousedown", function onMousedown(e) {
        // Prevent focused state lost
        // https://github.com/ant-design/ant-design/issues/15173
        e.preventDefault();
      }), _defineProperty(_iconProps, "onMouseup", function onMouseup(e) {
        // Prevent caret position change
        // https://github.com/ant-design/ant-design/issues/23524
        e.preventDefault();
      }), _iconProps);
      return cloneElement(isValidElement(icon) ? icon : _createVNode("span", null, [icon]), iconProps);
    };

    var _useConfigInject = useConfigInject('input-password', props),
        prefixCls = _useConfigInject.prefixCls,
        getPrefixCls = _useConfigInject.getPrefixCls;

    var inputPrefixCls = computed(function () {
      return getPrefixCls('input', props.inputPrefixCls);
    });

    var renderPassword = function renderPassword() {
      var size = props.size,
          visibilityToggle = props.visibilityToggle,
          restProps = __rest(props, ["size", "visibilityToggle"]);

      var suffixIcon = visibilityToggle && getIcon(prefixCls.value);
      var inputClassName = classNames(prefixCls.value, attrs.class, _defineProperty({}, "".concat(prefixCls.value, "-").concat(size), !!size));

      var omittedProps = _extends(_extends(_extends({}, omit(restProps, ['suffix', 'iconRender', 'action'])), attrs), {
        type: visible.value ? 'text' : 'password',
        class: inputClassName,
        prefixCls: inputPrefixCls.value,
        suffix: suffixIcon
      });

      if (size) {
        omittedProps.size = size;
      }

      return _createVNode(Input, _objectSpread({
        "ref": inputRef
      }, omittedProps), slots);
    };

    return function () {
      return renderPassword();
    };
  }
});