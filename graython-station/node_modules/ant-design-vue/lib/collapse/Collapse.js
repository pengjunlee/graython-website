"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "collapseProps", {
  enumerable: true,
  get: function get() {
    return _commonProps.collapseProps;
  }
});
exports.default = void 0;

var _vue = require("vue");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _propsUtil = require("../_util/props-util");

var _vnode = require("../_util/vnode");

var _commonProps = require("./commonProps");

var _util = require("../_util/util");

var _RightOutlined = _interopRequireDefault(require("@ant-design/icons-vue/lib/icons/RightOutlined"));

var _firstNotUndefined = _interopRequireDefault(require("../_util/firstNotUndefined"));

var _classNames2 = _interopRequireDefault(require("../_util/classNames"));

var _useConfigInject2 = _interopRequireDefault(require("../_util/hooks/useConfigInject"));

var _collapseMotion = _interopRequireDefault(require("../_util/collapseMotion"));

function getActiveKeysArray(activeKey) {
  var currentActiveKey = activeKey;

  if (!Array.isArray(currentActiveKey)) {
    var activeKeyType = (0, _typeof2.default)(currentActiveKey);
    currentActiveKey = activeKeyType === 'number' || activeKeyType === 'string' ? [currentActiveKey] : [];
  }

  return currentActiveKey.map(function (key) {
    return String(key);
  });
}

var _default = (0, _vue.defineComponent)({
  name: 'ACollapse',
  inheritAttrs: false,
  props: (0, _propsUtil.initDefaultProps)((0, _commonProps.collapseProps)(), {
    accordion: false,
    destroyInactivePanel: false,
    bordered: true,
    openAnimation: (0, _collapseMotion.default)('ant-motion-collapse', false),
    expandIconPosition: 'left'
  }),
  slots: ['expandIcon'],
  // emits: ['change', 'update:activeKey'],
  setup: function setup(props, _ref) {
    var attrs = _ref.attrs,
        slots = _ref.slots,
        emit = _ref.emit;
    var stateActiveKey = (0, _vue.ref)(getActiveKeysArray((0, _firstNotUndefined.default)([props.activeKey, props.defaultActiveKey])));
    (0, _vue.watch)(function () {
      return props.activeKey;
    }, function () {
      stateActiveKey.value = getActiveKeysArray(props.activeKey);
    }, {
      deep: true
    });

    var _useConfigInject = (0, _useConfigInject2.default)('collapse', props),
        prefixCls = _useConfigInject.prefixCls,
        direction = _useConfigInject.direction;

    var iconPosition = (0, _vue.computed)(function () {
      var expandIconPosition = props.expandIconPosition;

      if (expandIconPosition !== undefined) {
        return expandIconPosition;
      }

      return direction.value === 'rtl' ? 'right' : 'left';
    });

    var renderExpandIcon = function renderExpandIcon(panelProps) {
      var _props$expandIcon = props.expandIcon,
          expandIcon = _props$expandIcon === void 0 ? slots.expandIcon : _props$expandIcon;
      var icon = expandIcon ? expandIcon(panelProps) : (0, _vue.createVNode)(_RightOutlined.default, {
        "rotate": panelProps.isActive ? 90 : undefined
      }, null);
      return (0, _vue.createVNode)("div", null, [(0, _propsUtil.isValidElement)(Array.isArray(expandIcon) ? icon[0] : icon) ? (0, _vnode.cloneElement)(icon, {
        class: "".concat(prefixCls.value, "-arrow")
      }, false) : icon]);
    };

    var setActiveKey = function setActiveKey(activeKey) {
      if (props.activeKey === undefined) {
        stateActiveKey.value = activeKey;
      }

      var newKey = props.accordion ? activeKey[0] : activeKey;
      emit('update:activeKey', newKey);
      emit('change', newKey);
    };

    var onClickItem = function onClickItem(key) {
      var activeKey = stateActiveKey.value;

      if (props.accordion) {
        activeKey = activeKey[0] === key ? [] : [key];
      } else {
        activeKey = (0, _toConsumableArray2.default)(activeKey);
        var index = activeKey.indexOf(key);
        var isActive = index > -1;

        if (isActive) {
          // remove active state
          activeKey.splice(index, 1);
        } else {
          activeKey.push(key);
        }
      }

      setActiveKey(activeKey);
    };

    var getNewChild = function getNewChild(child, index) {
      var _a, _b, _c;

      if ((0, _propsUtil.isEmptyElement)(child)) return;
      var activeKey = stateActiveKey.value;
      var accordion = props.accordion,
          destroyInactivePanel = props.destroyInactivePanel,
          collapsible = props.collapsible,
          openAnimation = props.openAnimation; // If there is no key provide, use the panel order as default key

      var key = String((_a = child.key) !== null && _a !== void 0 ? _a : index);

      var _ref2 = child.props || {},
          _ref2$header = _ref2.header,
          header = _ref2$header === void 0 ? (_c = (_b = child.children) === null || _b === void 0 ? void 0 : _b.header) === null || _c === void 0 ? void 0 : _c.call(_b) : _ref2$header,
          headerClass = _ref2.headerClass,
          childCollapsible = _ref2.collapsible,
          disabled = _ref2.disabled;

      var isActive = false;

      if (accordion) {
        isActive = activeKey[0] === key;
      } else {
        isActive = activeKey.indexOf(key) > -1;
      }

      var mergeCollapsible = childCollapsible !== null && childCollapsible !== void 0 ? childCollapsible : collapsible; // legacy 2.x

      if (disabled || disabled === '') {
        mergeCollapsible = 'disabled';
      }

      var newProps = {
        key: key,
        panelKey: key,
        header: header,
        headerClass: headerClass,
        isActive: isActive,
        prefixCls: prefixCls.value,
        destroyInactivePanel: destroyInactivePanel,
        openAnimation: openAnimation,
        accordion: accordion,
        onItemClick: mergeCollapsible === 'disabled' ? null : onClickItem,
        expandIcon: renderExpandIcon,
        collapsible: mergeCollapsible
      };
      return (0, _vnode.cloneElement)(child, newProps);
    };

    var getItems = function getItems() {
      var _a;

      return (0, _propsUtil.flattenChildren)((_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)).map(getNewChild);
    };

    return function () {
      var _classNames;

      var accordion = props.accordion,
          bordered = props.bordered,
          ghost = props.ghost;
      var collapseClassName = (0, _classNames2.default)((_classNames = {}, (0, _defineProperty2.default)(_classNames, prefixCls.value, true), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls.value, "-borderless"), !bordered), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls.value, "-icon-position-").concat(iconPosition.value), true), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls.value, "-rtl"), direction.value === 'rtl'), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls.value, "-ghost"), !!ghost), (0, _defineProperty2.default)(_classNames, attrs.class, !!attrs.class), _classNames));
      return (0, _vue.createVNode)("div", (0, _objectSpread2.default)((0, _objectSpread2.default)({
        "class": collapseClassName
      }, (0, _util.getDataAndAriaProps)(attrs)), {}, {
        "style": attrs.style,
        "role": accordion ? 'tablist' : null
      }), [getItems()]);
    };
  }
});

exports.default = _default;