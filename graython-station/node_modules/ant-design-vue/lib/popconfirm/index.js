"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.popconfirmProps = exports.default = void 0;

var _vue = require("vue");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _tooltip = _interopRequireDefault(require("../tooltip"));

var _abstractTooltipProps = _interopRequireDefault(require("../tooltip/abstractTooltipProps"));

var _vueTypes = _interopRequireDefault(require("../_util/vue-types"));

var _propsUtil = require("../_util/props-util");

var _buttonTypes = require("../button/buttonTypes");

var _ExclamationCircleFilled = _interopRequireDefault(require("@ant-design/icons-vue/lib/icons/ExclamationCircleFilled"));

var _button = _interopRequireDefault(require("../button"));

var _LocaleReceiver = require("../locale-provider/LocaleReceiver");

var _default3 = _interopRequireDefault(require("../locale-provider/default"));

var _type = require("../_util/type");

var _useMergedState3 = _interopRequireDefault(require("../_util/hooks/useMergedState"));

var _devWarning = _interopRequireDefault(require("../vc-util/devWarning"));

var _KeyCode = _interopRequireDefault(require("../_util/KeyCode"));

var _useConfigInject2 = _interopRequireDefault(require("../_util/hooks/useConfigInject"));

var _classNames = _interopRequireDefault(require("../_util/classNames"));

var _transition = require("../_util/transition");

var _vnode = require("../_util/vnode");

var _omit = _interopRequireDefault(require("../_util/omit"));

var _Tooltip = require("../tooltip/Tooltip");

var _ActionButton = _interopRequireDefault(require("../_util/ActionButton"));

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

var popconfirmProps = function popconfirmProps() {
  return (0, _extends2.default)((0, _extends2.default)({}, (0, _abstractTooltipProps.default)()), {
    prefixCls: String,
    content: _vueTypes.default.any,
    title: _vueTypes.default.any,
    okType: {
      type: String,
      default: 'primary'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    okText: _vueTypes.default.any,
    cancelText: _vueTypes.default.any,
    icon: _vueTypes.default.any,
    okButtonProps: {
      type: Object,
      default: undefined
    },
    cancelButtonProps: {
      type: Object,
      default: undefined
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    onConfirm: Function,
    onCancel: Function
  });
};

exports.popconfirmProps = popconfirmProps;
var Popconfirm = (0, _vue.defineComponent)({
  name: 'APopconfirm',
  props: (0, _propsUtil.initDefaultProps)(popconfirmProps(), (0, _extends2.default)((0, _extends2.default)({}, (0, _Tooltip.tooltipDefaultProps)()), {
    trigger: 'click',
    transitionName: 'zoom-big',
    placement: 'top',
    mouseEnterDelay: 0.1,
    mouseLeaveDelay: 0.1,
    arrowPointAtCenter: false,
    autoAdjustOverflow: true,
    okType: 'primary',
    disabled: false
  })),
  slots: ['title', 'content', 'okText', 'icon', 'cancelText', 'cancelButton', 'okButton'],
  emits: ['update:visible', 'visibleChange'],
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        emit = _ref.emit,
        expose = _ref.expose;
    (0, _vue.onMounted)(function () {
      (0, _devWarning.default)(props.defaultVisible === undefined, 'Popconfirm', "'defaultVisible' is deprecated, please use 'v-model:visible'");
    });
    var tooltipRef = (0, _vue.ref)();
    expose({
      getPopupDomNode: function getPopupDomNode() {
        var _a, _b;

        return (_b = (_a = tooltipRef.value) === null || _a === void 0 ? void 0 : _a.getPopupDomNode) === null || _b === void 0 ? void 0 : _b.call(_a);
      }
    });

    var _useMergedState = (0, _useMergedState3.default)(false, {
      value: (0, _vue.toRef)(props, 'visible'),
      defaultValue: props.defaultVisible
    }),
        _useMergedState2 = (0, _slicedToArray2.default)(_useMergedState, 2),
        visible = _useMergedState2[0],
        setVisible = _useMergedState2[1];

    var settingVisible = function settingVisible(value, e) {
      if (props.visible === undefined) {
        setVisible(value);
      }

      emit('update:visible', value);
      emit('visibleChange', value, e);
    };

    var close = function close(e) {
      settingVisible(false, e);
    };

    var onConfirm = function onConfirm(e) {
      var _a;

      return (_a = props.onConfirm) === null || _a === void 0 ? void 0 : _a.call(props, e);
    };

    var onCancel = function onCancel(e) {
      var _a;

      settingVisible(false, e);
      (_a = props.onCancel) === null || _a === void 0 ? void 0 : _a.call(props, e);
    };

    var onKeyDown = function onKeyDown(e) {
      if (e.keyCode === _KeyCode.default.ESC && visible) {
        settingVisible(false, e);
      }
    };

    var onVisibleChange = function onVisibleChange(value) {
      var disabled = props.disabled;

      if (disabled) {
        return;
      }

      settingVisible(value);
    };

    var _useConfigInject = (0, _useConfigInject2.default)('popconfirm', props),
        prefixClsConfirm = _useConfigInject.prefixCls,
        getPrefixCls = _useConfigInject.getPrefixCls;

    var rootPrefixCls = (0, _vue.computed)(function () {
      return getPrefixCls();
    });
    var popoverPrefixCls = (0, _vue.computed)(function () {
      return getPrefixCls('popover');
    });
    var btnPrefixCls = (0, _vue.computed)(function () {
      return getPrefixCls('btn');
    });

    var _useLocaleReceiver = (0, _LocaleReceiver.useLocaleReceiver)('Popconfirm', _default3.default.Popconfirm),
        _useLocaleReceiver2 = (0, _slicedToArray2.default)(_useLocaleReceiver, 1),
        popconfirmLocale = _useLocaleReceiver2[0];

    var renderOverlay = function renderOverlay() {
      var _a, _b, _c, _d;

      var okButtonProps = props.okButtonProps,
          cancelButtonProps = props.cancelButtonProps,
          _props$title = props.title,
          title = _props$title === void 0 ? (_a = slots.title) === null || _a === void 0 ? void 0 : _a.call(slots) : _props$title,
          _props$cancelText = props.cancelText,
          cancelText = _props$cancelText === void 0 ? (_b = slots.cancel) === null || _b === void 0 ? void 0 : _b.call(slots) : _props$cancelText,
          _props$okText = props.okText,
          okText = _props$okText === void 0 ? (_c = slots.okText) === null || _c === void 0 ? void 0 : _c.call(slots) : _props$okText,
          okType = props.okType,
          _props$icon = props.icon,
          icon = _props$icon === void 0 ? (_d = slots.icon) === null || _d === void 0 ? void 0 : _d.call(slots) : _props$icon,
          _props$showCancel = props.showCancel,
          showCancel = _props$showCancel === void 0 ? true : _props$showCancel;
      var cancelButton = slots.cancelButton,
          okButton = slots.okButton;
      var cancelProps = (0, _extends2.default)({
        onClick: onCancel,
        size: 'small'
      }, cancelButtonProps);
      var okProps = (0, _extends2.default)((0, _extends2.default)((0, _extends2.default)({
        onClick: onConfirm
      }, (0, _buttonTypes.convertLegacyProps)(okType)), {
        size: 'small'
      }), okButtonProps);
      return (0, _vue.createVNode)("div", {
        "class": "".concat(popoverPrefixCls.value, "-inner-content")
      }, [(0, _vue.createVNode)("div", {
        "class": "".concat(popoverPrefixCls.value, "-message")
      }, [icon || (0, _vue.createVNode)(_ExclamationCircleFilled.default, null, null), (0, _vue.createVNode)("div", {
        "class": "".concat(popoverPrefixCls.value, "-message-title")
      }, [title])]), (0, _vue.createVNode)("div", {
        "class": "".concat(popoverPrefixCls.value, "-buttons")
      }, [showCancel ? cancelButton ? cancelButton(cancelProps) : (0, _vue.createVNode)(_button.default, cancelProps, {
        default: function _default() {
          return [cancelText || popconfirmLocale.value.cancelText];
        }
      }) : null, okButton ? okButton(okProps) : (0, _vue.createVNode)(_ActionButton.default, {
        "buttonProps": (0, _extends2.default)((0, _extends2.default)({
          size: 'small'
        }, (0, _buttonTypes.convertLegacyProps)(okType)), okButtonProps),
        "actionFn": onConfirm,
        "close": close,
        "prefixCls": btnPrefixCls.value,
        "quitOnNullishReturnValue": true,
        "emitEvent": true
      }, {
        default: function _default() {
          return [okText || popconfirmLocale.value.okText];
        }
      })])]);
    };

    return function () {
      var _a;

      var placement = props.placement,
          overlayClassName = props.overlayClassName,
          restProps = __rest(props, ["placement", "overlayClassName"]);

      var otherProps = (0, _omit.default)(restProps, ['title', 'content', 'cancelText', 'okText', 'onUpdate:visible', 'onConfirm', 'onCancel']);
      var overlayClassNames = (0, _classNames.default)(prefixClsConfirm.value, overlayClassName);
      return (0, _vue.createVNode)(_tooltip.default, (0, _objectSpread2.default)((0, _objectSpread2.default)({}, otherProps), {}, {
        "prefixCls": popoverPrefixCls.value,
        "placement": placement,
        "onVisibleChange": onVisibleChange,
        "visible": visible.value,
        "overlayClassName": overlayClassNames,
        "transitionName": (0, _transition.getTransitionName)(rootPrefixCls.value, 'zoom-big', props.transitionName),
        "ref": tooltipRef
      }), {
        default: function _default() {
          return [(0, _vnode.cloneVNodes)(((_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)) || [], {
            onKeydown: function onKeydown(e) {
              onKeyDown(e);
            }
          }, false)];
        },
        title: renderOverlay
      });
    };
  }
});

var _default2 = (0, _type.withInstall)(Popconfirm);

exports.default = _default2;