import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _extends from "@babel/runtime/helpers/esm/extends";
import { resolveDirective as _resolveDirective, createVNode as _createVNode } from "vue";

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
import Button from '../button';
import classNames from '../_util/classNames';
import Dropdown from './dropdown';
import { initDefaultProps } from '../_util/props-util';
import { dropdownButtonProps } from './props';
import EllipsisOutlined from "@ant-design/icons-vue/es/icons/EllipsisOutlined";
import useConfigInject from '../_util/hooks/useConfigInject';
var ButtonGroup = Button.Group;
export default defineComponent({
  name: 'ADropdownButton',
  inheritAttrs: false,
  __ANT_BUTTON: true,
  props: initDefaultProps(dropdownButtonProps(), {
    trigger: 'hover',
    placement: 'bottomRight',
    type: 'default'
  }),
  // emits: ['click', 'visibleChange', 'update:visible'],
  slots: ['icon', 'leftButton', 'rightButton', 'overlay'],
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        attrs = _ref.attrs,
        emit = _ref.emit;

    var handleVisibleChange = function handleVisibleChange(val) {
      emit('update:visible', val);
      emit('visibleChange', val);
    };

    var _useConfigInject = useConfigInject('dropdown-button', props),
        prefixCls = _useConfigInject.prefixCls,
        direction = _useConfigInject.direction,
        getPopupContainer = _useConfigInject.getPopupContainer;

    return function () {
      var _a, _b;

      var _c = _extends(_extends({}, props), attrs),
          _c$type = _c.type,
          type = _c$type === void 0 ? 'default' : _c$type,
          disabled = _c.disabled,
          loading = _c.loading,
          htmlType = _c.htmlType,
          _c$class = _c.class,
          className = _c$class === void 0 ? '' : _c$class,
          _c$overlay = _c.overlay,
          _overlay = _c$overlay === void 0 ? (_a = slots.overlay) === null || _a === void 0 ? void 0 : _a.call(slots) : _c$overlay,
          trigger = _c.trigger,
          align = _c.align,
          visible = _c.visible,
          _onVisibleChange = _c.onVisibleChange,
          _c$placement = _c.placement,
          placement = _c$placement === void 0 ? direction.value === 'rtl' ? 'bottomLeft' : 'bottomRight' : _c$placement,
          href = _c.href,
          title = _c.title,
          _c$icon = _c.icon,
          icon = _c$icon === void 0 ? ((_b = slots.icon) === null || _b === void 0 ? void 0 : _b.call(slots)) || _createVNode(EllipsisOutlined, null, null) : _c$icon,
          mouseEnterDelay = _c.mouseEnterDelay,
          mouseLeaveDelay = _c.mouseLeaveDelay,
          overlayClassName = _c.overlayClassName,
          overlayStyle = _c.overlayStyle,
          destroyPopupOnHide = _c.destroyPopupOnHide,
          onClick = _c.onClick,
          _updateVisible = _c['onUpdate:visible'],
          restProps = __rest(_c, ["type", "disabled", "loading", "htmlType", "class", "overlay", "trigger", "align", "visible", "onVisibleChange", "placement", "href", "title", "icon", "mouseEnterDelay", "mouseLeaveDelay", "overlayClassName", "overlayStyle", "destroyPopupOnHide", "onClick", 'onUpdate:visible']);

      var dropdownProps = {
        align: align,
        disabled: disabled,
        trigger: disabled ? [] : trigger,
        placement: placement,
        getPopupContainer: getPopupContainer.value,
        onVisibleChange: handleVisibleChange,
        mouseEnterDelay: mouseEnterDelay,
        mouseLeaveDelay: mouseLeaveDelay,
        visible: visible,
        overlayClassName: overlayClassName,
        overlayStyle: overlayStyle,
        destroyPopupOnHide: destroyPopupOnHide
      };

      var leftButton = _createVNode(Button, {
        "type": type,
        "disabled": disabled,
        "loading": loading,
        "onClick": onClick,
        "htmlType": htmlType,
        "href": href,
        "title": title
      }, {
        default: slots.default
      });

      var rightButton = _createVNode(Button, {
        "type": type,
        "icon": icon
      }, null);

      return _createVNode(ButtonGroup, _objectSpread(_objectSpread({}, restProps), {}, {
        "class": classNames(prefixCls.value, className)
      }), {
        default: function _default() {
          return [slots.leftButton ? slots.leftButton({
            button: leftButton
          }) : leftButton, _createVNode(Dropdown, dropdownProps, {
            default: function _default() {
              return [slots.rightButton ? slots.rightButton({
                button: rightButton
              }) : rightButton];
            },
            overlay: function overlay() {
              return _overlay;
            }
          })];
        }
      });
    };
  }
});