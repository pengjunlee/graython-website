import { createVNode as _createVNode } from "vue";
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'FooterRow',
  setup: function setup(_props, _ref) {
    var slots = _ref.slots;
    return function () {
      var _a;

      return _createVNode("tr", null, [(_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)]);
    };
  }
});