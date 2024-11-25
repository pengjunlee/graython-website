"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = require("vue");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _button = _interopRequireDefault(require("../button"));

var _classNames = _interopRequireDefault(require("../_util/classNames"));

var _dropdown = _interopRequireDefault(require("./dropdown"));

var _propsUtil = require("../_util/props-util");

var _props = require("./props");

var _EllipsisOutlined = _interopRequireDefault(require("@ant-design/icons-vue/lib/icons/EllipsisOutlined"));

var _useConfigInject2 = _interopRequireDefault(require("../_util/hooks/useConfigInject"));

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var ButtonGroup = _button.default.Group;

var _default2 = (0, _vue.defineComponent)({
  name: 'ADropdownButton',
  inheritAttrs: false,
  __ANT_BUTTON: true,
  props: (0, _propsUtil.initDefaultProps)((0, _props.dropdownButtonProps)(), {
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

    var _useConfigInject = (0, _useConfigInject2.default)('dropdown-button', props),
        prefixCls = _useConfigInject.prefixCls,
        direction = _useConfigInject.direction,
        getPopupContainer = _useConfigInject.getPopupContainer;

    return function () {
      var _a, _b;

      var _c = (0, _extends2.default)((0, _extends2.default)({}, props), attrs),
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
          icon = _c$icon === void 0 ? ((_b = slots.icon) === null || _b === void 0 ? void 0 : _b.call(slots)) || (0, _vue.createVNode)(_EllipsisOutlined.default, null, null) : _c$icon,
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
      var leftButton = (0, _vue.createVNode)(_button.default, {
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
      var rightButton = (0, _vue.createVNode)(_button.default, {
        "type": type,
        "icon": icon
      }, null);
      return (0, _vue.createVNode)(ButtonGroup, (0, _objectSpread2.default)((0, _objectSpread2.default)({}, restProps), {}, {
        "class": (0, _classNames.default)(prefixCls.value, className)
      }), {
        default: function _default() {
          return [slots.leftButton ? slots.leftButton({
            button: leftButton
          }) : leftButton, (0, _vue.createVNode)(_dropdown.default, dropdownProps, {
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

exports.default = _default2;