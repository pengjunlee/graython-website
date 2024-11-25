import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { createVNode as _createVNode } from "vue";
import { defineComponent, ref, watchEffect } from 'vue';
import { collapsePanelProps } from './commonProps';
import classNames from '../_util/classNames';
export default defineComponent({
  name: 'PanelContent',
  props: collapsePanelProps(),
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var rendered = ref(false);
    watchEffect(function () {
      if (props.isActive || props.forceRender) {
        rendered.value = true;
      }
    });
    return function () {
      var _classNames;

      var _a;

      if (!rendered.value) return null;
      var prefixCls = props.prefixCls,
          isActive = props.isActive,
          role = props.role;
      return _createVNode("div", {
        "ref": ref,
        "class": classNames("".concat(prefixCls, "-content"), (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-content-active"), isActive), _defineProperty(_classNames, "".concat(prefixCls, "-content-inactive"), !isActive), _classNames)),
        "role": role
      }, [_createVNode("div", {
        "class": "".concat(prefixCls, "-content-box")
      }, [(_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)])]);
    };
  }
});