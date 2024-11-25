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

var _classNames3 = _interopRequireDefault(require("../_util/classNames"));

var _Checkbox = _interopRequireDefault(require("../vc-checkbox/Checkbox"));

var _propsUtil = require("../_util/props-util");

var _warning = _interopRequireDefault(require("../_util/warning"));

var _FormItemContext = require("../form/FormItemContext");

var _useConfigInject2 = _interopRequireDefault(require("../_util/hooks/useConfigInject"));

var _interface = require("./interface");

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

var _default = (0, _vue.defineComponent)({
  name: 'ACheckbox',
  inheritAttrs: false,
  __ANT_CHECKBOX: true,
  props: (0, _interface.checkboxProps)(),
  // emits: ['change', 'update:checked'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        attrs = _ref.attrs,
        slots = _ref.slots,
        expose = _ref.expose;
    var formItemContext = (0, _FormItemContext.useInjectFormItemContext)();

    var _useConfigInject = (0, _useConfigInject2.default)('checkbox', props),
        prefixCls = _useConfigInject.prefixCls,
        direction = _useConfigInject.direction;

    var checkboxGroup = (0, _vue.inject)(_interface.CheckboxGroupContextKey, undefined);
    var uniId = Symbol('checkboxUniId');
    (0, _vue.watchEffect)(function () {
      if (!props.skipGroup && checkboxGroup) {
        checkboxGroup.registerValue(uniId, props.value);
      }
    });
    (0, _vue.onBeforeUnmount)(function () {
      if (checkboxGroup) {
        checkboxGroup.cancelValue(uniId);
      }
    });
    (0, _vue.onMounted)(function () {
      (0, _warning.default)(props.checked !== undefined || checkboxGroup || props.value === undefined, 'Checkbox', '`value` is not validate prop, do you mean `checked`?');
    });

    var handleChange = function handleChange(event) {
      var targetChecked = event.target.checked;
      emit('update:checked', targetChecked);
      emit('change', event);
    };

    var checkboxRef = (0, _vue.ref)();

    var focus = function focus() {
      var _a;

      (_a = checkboxRef.value) === null || _a === void 0 ? void 0 : _a.focus();
    };

    var blur = function blur() {
      var _a;

      (_a = checkboxRef.value) === null || _a === void 0 ? void 0 : _a.blur();
    };

    expose({
      focus: focus,
      blur: blur
    });
    return function () {
      var _classNames;

      var _a;

      var children = (0, _propsUtil.flattenChildren)((_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots));

      var indeterminate = props.indeterminate,
          skipGroup = props.skipGroup,
          _props$id = props.id,
          id = _props$id === void 0 ? formItemContext.id.value : _props$id,
          restProps = __rest(props, ["indeterminate", "skipGroup", "id"]);

      var onMouseenter = attrs.onMouseenter,
          onMouseleave = attrs.onMouseleave,
          onInput = attrs.onInput,
          className = attrs.class,
          style = attrs.style,
          restAttrs = __rest(attrs, ["onMouseenter", "onMouseleave", "onInput", "class", "style"]);

      var checkboxProps = (0, _extends2.default)((0, _extends2.default)((0, _extends2.default)({}, restProps), {
        id: id,
        prefixCls: prefixCls.value
      }), restAttrs);

      if (checkboxGroup && !skipGroup) {
        checkboxProps.onChange = function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          emit.apply(void 0, ['change'].concat(args));
          checkboxGroup.toggleOption({
            label: children,
            value: props.value
          });
        };

        checkboxProps.name = checkboxGroup.name.value;
        checkboxProps.checked = checkboxGroup.mergedValue.value.indexOf(props.value) !== -1;
        checkboxProps.disabled = props.disabled || checkboxGroup.disabled.value;
        checkboxProps.indeterminate = indeterminate;
      } else {
        checkboxProps.onChange = handleChange;
      }

      var classString = (0, _classNames3.default)((_classNames = {}, (0, _defineProperty2.default)(_classNames, "".concat(prefixCls.value, "-wrapper"), true), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls.value, "-rtl"), direction.value === 'rtl'), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls.value, "-wrapper-checked"), checkboxProps.checked), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls.value, "-wrapper-disabled"), checkboxProps.disabled), _classNames), className);
      var checkboxClass = (0, _classNames3.default)((0, _defineProperty2.default)({}, "".concat(prefixCls.value, "-indeterminate"), indeterminate));
      return (0, _vue.createVNode)("label", {
        "class": classString,
        "style": style,
        "onMouseenter": onMouseenter,
        "onMouseleave": onMouseleave
      }, [(0, _vue.createVNode)(_Checkbox.default, (0, _objectSpread2.default)((0, _objectSpread2.default)({}, checkboxProps), {}, {
        "class": checkboxClass,
        "ref": checkboxRef
      }), null), children.length ? (0, _vue.createVNode)("span", null, [children]) : null]);
    };
  }
});

exports.default = _default;