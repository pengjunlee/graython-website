import { resolveDirective as _resolveDirective, createVNode as _createVNode } from "vue";
import initDefaultProps from '../_util/props-util/initDefaultProps';
import SearchOutlined from "@ant-design/icons-vue/es/icons/SearchOutlined";
import Input from '../input';
import { defineComponent } from 'vue';
export var transferSearchProps = {
  prefixCls: String,
  placeholder: String,
  value: String,
  handleClear: Function,
  disabled: {
    type: Boolean,
    default: undefined
  },
  onChange: Function
};
export default defineComponent({
  name: 'Search',
  inheritAttrs: false,
  props: initDefaultProps(transferSearchProps, {
    placeholder: ''
  }),
  emits: ['change'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;

    var handleChange = function handleChange(e) {
      var _a;

      emit('change', e);

      if (e.target.value === '') {
        (_a = props.handleClear) === null || _a === void 0 ? void 0 : _a.call(props);
      }
    };

    return function () {
      var placeholder = props.placeholder,
          value = props.value,
          prefixCls = props.prefixCls,
          disabled = props.disabled;
      return _createVNode(Input, {
        "placeholder": placeholder,
        "class": prefixCls,
        "value": value,
        "onChange": handleChange,
        "disabled": disabled,
        "allowClear": true
      }, {
        prefix: function prefix() {
          return _createVNode(SearchOutlined, null, null);
        }
      });
    };
  }
});