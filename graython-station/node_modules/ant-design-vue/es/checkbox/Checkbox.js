import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
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

import { watchEffect, onMounted, defineComponent, inject, onBeforeUnmount, ref } from 'vue';
import classNames from '../_util/classNames';
import VcCheckbox from '../vc-checkbox/Checkbox';
import { flattenChildren } from '../_util/props-util';
import warning from '../_util/warning';
import { useInjectFormItemContext } from '../form/FormItemContext';
import useConfigInject from '../_util/hooks/useConfigInject';
import { CheckboxGroupContextKey, checkboxProps } from './interface';
export default defineComponent({
  name: 'ACheckbox',
  inheritAttrs: false,
  __ANT_CHECKBOX: true,
  props: checkboxProps(),
  // emits: ['change', 'update:checked'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        attrs = _ref.attrs,
        slots = _ref.slots,
        expose = _ref.expose;
    var formItemContext = useInjectFormItemContext();

    var _useConfigInject = useConfigInject('checkbox', props),
        prefixCls = _useConfigInject.prefixCls,
        direction = _useConfigInject.direction;

    var checkboxGroup = inject(CheckboxGroupContextKey, undefined);
    var uniId = Symbol('checkboxUniId');
    watchEffect(function () {
      if (!props.skipGroup && checkboxGroup) {
        checkboxGroup.registerValue(uniId, props.value);
      }
    });
    onBeforeUnmount(function () {
      if (checkboxGroup) {
        checkboxGroup.cancelValue(uniId);
      }
    });
    onMounted(function () {
      warning(props.checked !== undefined || checkboxGroup || props.value === undefined, 'Checkbox', '`value` is not validate prop, do you mean `checked`?');
    });

    var handleChange = function handleChange(event) {
      var targetChecked = event.target.checked;
      emit('update:checked', targetChecked);
      emit('change', event);
    };

    var checkboxRef = ref();

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

      var children = flattenChildren((_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots));

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

      var checkboxProps = _extends(_extends(_extends({}, restProps), {
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

      var classString = classNames((_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls.value, "-wrapper"), true), _defineProperty(_classNames, "".concat(prefixCls.value, "-rtl"), direction.value === 'rtl'), _defineProperty(_classNames, "".concat(prefixCls.value, "-wrapper-checked"), checkboxProps.checked), _defineProperty(_classNames, "".concat(prefixCls.value, "-wrapper-disabled"), checkboxProps.disabled), _classNames), className);
      var checkboxClass = classNames(_defineProperty({}, "".concat(prefixCls.value, "-indeterminate"), indeterminate));
      return _createVNode("label", {
        "class": classString,
        "style": style,
        "onMouseenter": onMouseenter,
        "onMouseleave": onMouseleave
      }, [_createVNode(VcCheckbox, _objectSpread(_objectSpread({}, checkboxProps), {}, {
        "class": checkboxClass,
        "ref": checkboxRef
      }), null), children.length ? _createVNode("span", null, [children]) : null]);
    };
  }
});