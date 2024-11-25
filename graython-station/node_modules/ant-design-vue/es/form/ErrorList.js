import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import { createVNode as _createVNode } from "vue";
import { useInjectFormItemPrefix } from './context';
import { computed, defineComponent, ref, watch } from 'vue';
import { getTransitionGroupProps, TransitionGroup } from '../_util/transition';
import useConfigInject from '../_util/hooks/useConfigInject';
import collapseMotion from '../_util/collapseMotion';
export default defineComponent({
  name: 'ErrorList',
  props: ['errors', 'help', 'onDomErrorVisibleChange', 'helpStatus', 'warnings'],
  setup: function setup(props) {
    var _useConfigInject = useConfigInject('', props),
        rootPrefixCls = _useConfigInject.prefixCls;

    var _useInjectFormItemPre = useInjectFormItemPrefix(),
        prefixCls = _useInjectFormItemPre.prefixCls,
        status = _useInjectFormItemPre.status;

    var baseClassName = computed(function () {
      return "".concat(prefixCls.value, "-item-explain");
    });
    var visible = computed(function () {
      return !!(props.errors && props.errors.length);
    });
    var innerStatus = ref(status.value); // Memo status in same visible

    watch([visible, status], function () {
      if (visible.value) {
        innerStatus.value = status.value;
      }
    });
    return function () {
      var _a, _b;

      var colMItem = collapseMotion("".concat(rootPrefixCls.value, "-show-help-item"));
      var transitionGroupProps = getTransitionGroupProps("".concat(rootPrefixCls.value, "-show-help-item"), colMItem);
      transitionGroupProps.class = baseClassName.value;
      return ((_a = props.errors) === null || _a === void 0 ? void 0 : _a.length) ? _createVNode(TransitionGroup, _objectSpread(_objectSpread({}, transitionGroupProps), {}, {
        "tag": "div"
      }), {
        default: function _default() {
          return [(_b = props.errors) === null || _b === void 0 ? void 0 : _b.map(function (error, index) {
            return _createVNode("div", {
              "key": index,
              "role": "alert",
              "class": innerStatus.value ? "".concat(baseClassName.value, "-").concat(innerStatus.value) : ''
            }, [error]);
          })];
        }
      }) : null;
    };
  }
});