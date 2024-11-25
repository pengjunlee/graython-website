import { defineComponent } from 'vue';
export var optionProps = {
  value: String,
  disabled: Boolean,
  label: [String, Number, Function]
};
export default defineComponent({
  name: 'Option',
  props: optionProps,
  render: function render(_props, _ref) {
    var slots = _ref.slots;

    var _a;

    return (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots);
  }
});