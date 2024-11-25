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

var _Input = _interopRequireDefault(require("./Input"));

var _SearchOutlined = _interopRequireDefault(require("@ant-design/icons-vue/lib/icons/SearchOutlined"));

var _inputProps = _interopRequireDefault(require("./inputProps"));

var _button = _interopRequireDefault(require("../button"));

var _vnode = require("../_util/vnode");

var _vueTypes = _interopRequireDefault(require("../_util/vue-types"));

var _isPlainObject = _interopRequireDefault(require("lodash/isPlainObject"));

var _useConfigInject2 = _interopRequireDefault(require("../_util/hooks/useConfigInject"));

var _omit = _interopRequireDefault(require("../_util/omit"));

var _isMobile = _interopRequireDefault(require("../_util/isMobile"));

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

var _default2 = (0, _vue.defineComponent)({
  name: 'AInputSearch',
  inheritAttrs: false,
  props: (0, _extends2.default)((0, _extends2.default)({}, (0, _inputProps.default)()), {
    inputPrefixCls: String,
    // 不能设置默认值 https://github.com/vueComponent/ant-design-vue/issues/1916
    enterButton: _vueTypes.default.any,
    onSearch: {
      type: Function
    }
  }),
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        attrs = _ref.attrs,
        expose = _ref.expose,
        emit = _ref.emit;
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

      if (!_isMobile.default.tablet) {
        inputRef.value.focus();
      }
    };

    var _useConfigInject = (0, _useConfigInject2.default)('input-search', props),
        prefixCls = _useConfigInject.prefixCls,
        getPrefixCls = _useConfigInject.getPrefixCls,
        direction = _useConfigInject.direction,
        size = _useConfigInject.size;

    var inputPrefixCls = (0, _vue.computed)(function () {
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
      var searchIcon = typeof enterButton === 'boolean' ? (0, _vue.createVNode)(_SearchOutlined.default, null, null) : null;
      var btnClassName = "".concat(prefixCls.value, "-button");
      var enterButtonAsElement = Array.isArray(enterButton) ? enterButton[0] : enterButton;
      var button;

      var isAntdButton = enterButtonAsElement.type && (0, _isPlainObject.default)(enterButtonAsElement.type) && enterButtonAsElement.type.__ANT_BUTTON;

      if (isAntdButton || enterButtonAsElement.tagName === 'button') {
        button = (0, _vnode.cloneElement)(enterButtonAsElement, (0, _extends2.default)({
          onMousedown: onMousedown,
          onClick: onSearch,
          key: 'enterButton'
        }, isAntdButton ? {
          class: btnClassName,
          size: size.value
        } : {}), false);
      } else {
        var iconOnly = searchIcon && !enterButton;
        button = (0, _vue.createVNode)(_button.default, {
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

      var cls = (0, _classNames2.default)(prefixCls.value, (_classNames = {}, (0, _defineProperty2.default)(_classNames, "".concat(prefixCls.value, "-rtl"), direction.value === 'rtl'), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls.value, "-").concat(size.value), !!size.value), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls.value, "-with-button"), !!enterButton), _classNames), attrs.class);
      return (0, _vue.createVNode)(_Input.default, (0, _objectSpread2.default)((0, _objectSpread2.default)((0, _objectSpread2.default)({
        "ref": inputRef
      }, (0, _omit.default)(restProps, ['onUpdate:value', 'onSearch', 'enterButton'])), attrs), {}, {
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

exports.default = _default2;