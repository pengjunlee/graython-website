import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _extends from "@babel/runtime/helpers/esm/extends";
import { createVNode as _createVNode, resolveDirective as _resolveDirective } from "vue";
import { defineComponent, ref, watch } from 'vue';
import { popupProps } from './interface';
import Mask from './Mask';
import MobilePopupInner from './MobilePopupInner';
import PopupInner from './PopupInner';
export default defineComponent({
  name: 'Popup',
  inheritAttrs: false,
  props: popupProps,
  setup: function setup(props, _ref) {
    var attrs = _ref.attrs,
        slots = _ref.slots,
        expose = _ref.expose;
    var innerVisible = ref(false);
    var inMobile = ref(false);
    var popupRef = ref();
    watch([function () {
      return props.visible;
    }, function () {
      return props.mobile;
    }], function () {
      innerVisible.value = props.visible;

      if (props.visible && props.mobile) {
        inMobile.value = true;
      }
    }, {
      immediate: true,
      flush: 'post'
    });
    expose({
      forceAlign: function forceAlign() {
        var _a;

        (_a = popupRef.value) === null || _a === void 0 ? void 0 : _a.forceAlign();
      },
      getElement: function getElement() {
        var _a;

        return (_a = popupRef.value) === null || _a === void 0 ? void 0 : _a.getElement();
      }
    });
    return function () {
      var cloneProps = _extends(_extends(_extends({}, props), attrs), {
        visible: innerVisible.value
      });

      var popupNode = inMobile.value ? _createVNode(MobilePopupInner, _objectSpread(_objectSpread({}, cloneProps), {}, {
        "mobile": props.mobile,
        "ref": popupRef
      }), {
        default: slots.default
      }) : _createVNode(PopupInner, _objectSpread(_objectSpread({}, cloneProps), {}, {
        "ref": popupRef
      }), {
        default: slots.default
      });
      return _createVNode("div", null, [_createVNode(Mask, cloneProps, null), popupNode]);
    };
  }
});