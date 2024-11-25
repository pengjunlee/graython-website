import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import { createVNode as _createVNode, resolveDirective as _resolveDirective } from "vue";

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

import Child from './DrawerChild';
import { initDefaultProps } from '../../_util/props-util';
import { defineComponent, ref } from 'vue';
import { drawerProps } from './IDrawerPropTypes';
import PortalWrapper from '../../_util/PortalWrapper';
var DrawerWrapper = defineComponent({
  inheritAttrs: false,
  props: initDefaultProps(drawerProps(), {
    prefixCls: 'drawer',
    placement: 'left',
    getContainer: 'body',
    level: 'all',
    duration: '.3s',
    ease: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',
    afterVisibleChange: function afterVisibleChange() {},
    showMask: true,
    maskClosable: true,
    maskStyle: {},
    wrapperClassName: '',
    keyboard: true,
    forceRender: false,
    autofocus: true
  }),
  emits: ['handleClick', 'close'],
  slots: ['handler'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var dom = ref(null);

    var onHandleClick = function onHandleClick(e) {
      emit('handleClick', e);
    };

    var onClose = function onClose(e) {
      emit('close', e);
    };

    return function () {
      var afterVisibleChange = props.afterVisibleChange,
          getContainer = props.getContainer,
          wrapperClassName = props.wrapperClassName,
          forceRender = props.forceRender,
          otherProps = __rest(props, ["afterVisibleChange", "getContainer", "wrapperClassName", "forceRender"]);

      var portal = null;

      if (!getContainer) {
        return _createVNode("div", {
          "class": wrapperClassName,
          "ref": dom
        }, [_createVNode(Child, _objectSpread(_objectSpread({}, otherProps), {}, {
          "open": props.open,
          "getContainer": function getContainer() {
            return dom.value;
          },
          "onClose": onClose,
          "onHandleClick": onHandleClick
        }), slots)]);
      } // 如果有 handler 为内置强制渲染；


      var $forceRender = !!slots.handler || forceRender;

      if ($forceRender || props.open || dom.value) {
        portal = _createVNode(PortalWrapper, {
          "visible": props.open,
          "forceRender": $forceRender,
          "getContainer": getContainer,
          "wrapperClassName": wrapperClassName
        }, {
          default: function _default(_a) {
            var visible = _a.visible,
                afterClose = _a.afterClose,
                rest = __rest(_a, ["visible", "afterClose"]);

            return _createVNode(Child, _objectSpread(_objectSpread(_objectSpread({
              "ref": dom
            }, otherProps), rest), {}, {
              "open": visible !== undefined ? visible : props.open,
              "afterVisibleChange": afterClose !== undefined ? afterClose : props.afterVisibleChange,
              "onClose": onClose,
              "onHandleClick": onHandleClick
            }), slots);
          }
        });
      }

      return portal;
    };
  }
});
export default DrawerWrapper;