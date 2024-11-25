import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import { createVNode as _createVNode } from "vue";

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

import { defineComponent } from 'vue';
import PropTypes from '../_util/vue-types';
import { getPropsSlot } from '../_util/props-util';
import DropDown from '../dropdown/dropdown';
import DownOutlined from "@ant-design/icons-vue/es/icons/DownOutlined";
import useConfigInject from '../_util/hooks/useConfigInject';
export var breadcrumbItemProps = function breadcrumbItemProps() {
  return {
    prefixCls: String,
    href: String,
    separator: PropTypes.any,
    overlay: PropTypes.any,
    onClick: Function
  };
};
export default defineComponent({
  name: 'ABreadcrumbItem',
  inheritAttrs: false,
  __ANT_BREADCRUMB_ITEM: true,
  props: breadcrumbItemProps(),
  // emits: ['click'],
  slots: ['separator', 'overlay'],
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        attrs = _ref.attrs;

    var _useConfigInject = useConfigInject('breadcrumb', props),
        prefixCls = _useConfigInject.prefixCls;
    /**
     * if overlay is have
     * Wrap a DropDown
     */


    var renderBreadcrumbNode = function renderBreadcrumbNode(breadcrumbItem, prefixCls) {
      var overlay = getPropsSlot(slots, props, 'overlay');

      if (overlay) {
        return _createVNode(DropDown, {
          "overlay": overlay,
          "placement": "bottom"
        }, {
          default: function _default() {
            return [_createVNode("span", {
              "class": "".concat(prefixCls, "-overlay-link")
            }, [breadcrumbItem, _createVNode(DownOutlined, null, null)])];
          }
        });
      }

      return breadcrumbItem;
    };

    return function () {
      var _a;

      var separator = (_a = getPropsSlot(slots, props, 'separator')) !== null && _a !== void 0 ? _a : '/';
      var children = getPropsSlot(slots, props);

      var cls = attrs.class,
          style = attrs.style,
          restAttrs = __rest(attrs, ["class", "style"]);

      var link;

      if (props.href !== undefined) {
        link = _createVNode("a", _objectSpread({
          "class": "".concat(prefixCls.value, "-link"),
          "onClick": props.onClick
        }, restAttrs), [children]);
      } else {
        link = _createVNode("span", _objectSpread({
          "class": "".concat(prefixCls.value, "-link"),
          "onClick": props.onClick
        }, restAttrs), [children]);
      } // wrap to dropDown


      link = renderBreadcrumbNode(link, prefixCls.value);

      if (children) {
        return _createVNode("span", {
          "class": cls,
          "style": style
        }, [link, separator && _createVNode("span", {
          "class": "".concat(prefixCls.value, "-separator")
        }, [separator])]);
      }

      return null;
    };
  }
});