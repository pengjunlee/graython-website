import _extends from "@babel/runtime/helpers/esm/extends";
import { createVNode as _createVNode } from "vue";
import { defineComponent, inject } from 'vue';
import Radio, { radioProps } from './Radio';
import useConfigInject from '../_util/hooks/useConfigInject';
export default defineComponent({
  name: 'ARadioButton',
  props: radioProps(),
  setup: function setup(props, _ref) {
    var slots = _ref.slots;

    var _useConfigInject = useConfigInject('radio-button', props),
        prefixCls = _useConfigInject.prefixCls;

    var radioGroupContext = inject('radioGroupContext', undefined);
    return function () {
      var _a;

      var rProps = _extends(_extends({}, props), {
        prefixCls: prefixCls.value
      });

      if (radioGroupContext) {
        rProps.onChange = radioGroupContext.onRadioChange;
        rProps.checked = rProps.value === radioGroupContext.stateValue.value;
        rProps.disabled = rProps.disabled || radioGroupContext.props.disabled;
      }

      return _createVNode(Radio, rProps, {
        default: function _default() {
          return [(_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)];
        }
      });
    };
  }
});