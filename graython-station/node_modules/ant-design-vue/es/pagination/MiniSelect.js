import _extends from "@babel/runtime/helpers/esm/extends";
import { createVNode as _createVNode, resolveDirective as _resolveDirective } from "vue";
import { defineComponent } from 'vue';
import VcSelect, { selectProps } from '../select';
export default defineComponent({
  inheritAttrs: false,
  props: selectProps(),
  Option: VcSelect.Option,
  setup: function setup(props, _ref) {
    var attrs = _ref.attrs,
        slots = _ref.slots;
    return function () {
      var selelctProps = _extends(_extends(_extends({}, props), {
        size: 'small'
      }), attrs);

      return _createVNode(VcSelect, selelctProps, slots);
    };
  }
});