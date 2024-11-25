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

import { computed, ref, defineComponent } from 'vue';
import classNames from '../_util/classNames';
import Input from './Input';
import SearchOutlined from "@ant-design/icons-vue/es/icons/SearchOutlined";
import inputProps from './inputProps';
import Button from '../button';
import { cloneElement } from '../_util/vnode';
import PropTypes from '../_util/vue-types';
import isPlainObject from 'lodash-es/isPlainObject';
import useConfigInject from '../_util/hooks/useConfigInject';
import omit from '../_util/omit';
import isMobile from '../_util/isMobile';
export default defineComponent({
  name: 'AInputSearch',
  inheritAttrs: false,
  props: _extends(_extends({}, inputProps()), {
    inputPrefixCls: String,
    // 不能设置默认值 https://github.com/vueComponent/ant-design-vue/issues/1916
    enterButton: PropTypes.any,
    onSearch: {
      type: Function
    }
  }),
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        attrs = _ref.attrs,
        expose = _ref.expose,
        emit = _ref.emit;
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

    var onChange = function onChange(e) {
      emit('update:value', e.target.value);

      if (e && e.target && e.type === 'click') {
        emit('search', e.target.value, e);
      }

      emit('change', e);
    };

    var onMousedown = function onMousedown(e) {
      var _a;

      if (document.activeElement === ((_a = inputRef.value) === null || _a === void 0 ? void 0 : _a.input)) {
        e.preventDefault();
      }
    };

    var onSearch = function onSearch(e) {
      var _a;

      emit('search', (_a = inputRef.value) === null || _a === void 0 ? void 0 : _a.stateValue, e);

      if (!isMobile.tablet) {
        inputRef.value.focus();
      }
    };

    var _useConfigInject = useConfigInject('input-search', props),
        prefixCls = _useConfigInject.prefixCls,
        getPrefixCls = _useConfigInject.getPrefixCls,
        direction = _useConfigInject.direction,
        size = _useConfigInject.size;

    var inputPrefixCls = computed(function () {
      return getPrefixCls('input', props.inputPrefixCls);
    });
    return function () {
      var _classNames;

      var _a, _b, _c, _d;

      var disabled = props.disabled,
          loading = props.loading,
          _props$addonAfter = props.addonAfter,
          addonAfter = _props$addonAfter === void 0 ? (_a = slots.addonAfter) === null || _a === void 0 ? void 0 : _a.call(slots) : _props$addonAfter,
          _props$suffix = props.suffix,
          suffix = _props$suffix === void 0 ? (_b = slots.suffix) === null || _b === void 0 ? void 0 : _b.call(slots) : _props$suffix,
          restProps = __rest(props, ["disabled", "loading", "addonAfter", "suffix"]);

      var _props$enterButton = props.enterButton,
          enterButton = _props$enterButton === void 0 ? (_d = (_c = slots.enterButton) === null || _c === void 0 ? void 0 : _c.call(slots)) !== null && _d !== void 0 ? _d : false : _props$enterButton;
      enterButton = enterButton || enterButton === '';
      var searchIcon = typeof enterButton === 'boolean' ? _createVNode(SearchOutlined, null, null) : null;
      var btnClassName = "".concat(prefixCls.value, "-button");
      var enterButtonAsElement = Array.isArray(enterButton) ? enterButton[0] : enterButton;
      var button;

      var isAntdButton = enterButtonAsElement.type && isPlainObject(enterButtonAsElement.type) && enterButtonAsElement.type.__ANT_BUTTON;

      if (isAntdButton || enterButtonAsElement.tagName === 'button') {
        button = cloneElement(enterButtonAsElement, _extends({
          onMousedown: onMousedown,
          onClick: onSearch,
          key: 'enterButton'
        }, isAntdButton ? {
          class: btnClassName,
          size: size.value
        } : {}), false);
      } else {
        var iconOnly = searchIcon && !enterButton;
        button = _createVNode(Button, {
          "class": btnClassName,
          "type": enterButton ? 'primary' : undefined,
          "size": size.value,
          "disabled": disabled,
          "key": "enterButton",
          "onMousedown": onMousedown,
          "onClick": onSearch,
          "loading": loading,
          "icon": iconOnly ? searchIcon : null
        }, {
          default: function _default() {
            return [iconOnly ? null : searchIcon || enterButton];
          }
        });
      }

      if (addonAfter) {
        button = [button, addonAfter];
      }

      var cls = classNames(prefixCls.value, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls.value, "-rtl"), direction.value === 'rtl'), _defineProperty(_classNames, "".concat(prefixCls.value, "-").concat(size.value), !!size.value), _defineProperty(_classNames, "".concat(prefixCls.value, "-with-button"), !!enterButton), _classNames), attrs.class);
      return _createVNode(Input, _objectSpread(_objectSpread(_objectSpread({
        "ref": inputRef
      }, omit(restProps, ['onUpdate:value', 'onSearch', 'enterButton'])), attrs), {}, {
        "onPressEnter": onSearch,
        "size": size.value,
        "prefixCls": inputPrefixCls.value,
        "addonAfter": button,
        "suffix": suffix,
        "onChange": onChange,
        "class": cls,
        "disabled": disabled
      }), slots);
    };
  }
});