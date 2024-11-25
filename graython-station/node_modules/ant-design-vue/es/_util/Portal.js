import { createVNode as _createVNode, resolveDirective as _resolveDirective } from "vue";
import PropTypes from './vue-types';
import { defineComponent, nextTick, onBeforeMount, onBeforeUnmount, onUpdated, Teleport, watch } from 'vue';
import { useInjectPortal } from '../vc-trigger/context';
export default defineComponent({
  name: 'Portal',
  inheritAttrs: false,
  props: {
    getContainer: PropTypes.func.isRequired,
    didUpdate: Function
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var isSSR = true; // getContainer 不会改变，不用响应式

    var container;

    var _useInjectPortal = useInjectPortal(),
        shouldRender = _useInjectPortal.shouldRender;

    onBeforeMount(function () {
      isSSR = false;

      if (shouldRender.value) {
        container = props.getContainer();
      }
    });
    var stopWatch = watch(shouldRender, function () {
      if (shouldRender.value && !container) {
        container = props.getContainer();
      }

      if (container) {
        stopWatch();
      }
    });
    onUpdated(function () {
      nextTick(function () {
        var _a;

        if (shouldRender.value) {
          (_a = props.didUpdate) === null || _a === void 0 ? void 0 : _a.call(props, props);
        }
      });
    });
    onBeforeUnmount(function () {
      if (container && container.parentNode) {
        container.parentNode.removeChild(container);
      }
    });
    return function () {
      var _a;

      if (!shouldRender.value) return null;

      if (isSSR) {
        return (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots);
      }

      return container ? _createVNode(Teleport, {
        "to": container
      }, slots) : null;
    };
  }
});