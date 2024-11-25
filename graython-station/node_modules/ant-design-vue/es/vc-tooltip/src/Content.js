import { createVNode as _createVNode } from "vue";
import { defineComponent } from 'vue';
import PropTypes from '../../_util/vue-types';
var tooltipContentProps = {
  prefixCls: String,
  id: String,
  overlayInnerStyle: PropTypes.any
};
export default defineComponent({
  name: 'Content',
  props: tooltipContentProps,
  slots: ['overlay'],
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    return function () {
      var _a;

      return _createVNode("div", {
        "class": "".concat(props.prefixCls, "-inner"),
        "id": props.id,
        "role": "tooltip",
        "style": props.overlayInnerStyle
      }, [(_a = slots.overlay) === null || _a === void 0 ? void 0 : _a.call(slots)]);
    };
  }
});