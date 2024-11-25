"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FIX_LABEL = void 0;
exports.default = Column;

var _vue = require("vue");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _commonUtil = require("../utils/commonUtil");

var _Checkbox = _interopRequireDefault(require("./Checkbox"));

var _useSearchOptions = require("../hooks/useSearchOptions");

var _context = require("../context");

var FIX_LABEL = '__cascader_fix_label__';
exports.FIX_LABEL = FIX_LABEL;

function Column(_ref) {
  var prefixCls = _ref.prefixCls,
      multiple = _ref.multiple,
      options = _ref.options,
      activeValue = _ref.activeValue,
      prevValuePath = _ref.prevValuePath,
      onToggleOpen = _ref.onToggleOpen,
      onSelect = _ref.onSelect,
      onActive = _ref.onActive,
      checkedSet = _ref.checkedSet,
      halfCheckedSet = _ref.halfCheckedSet,
      loadingKeys = _ref.loadingKeys,
      isSelectable = _ref.isSelectable;

  var _a, _b, _c, _d, _e, _f;

  var menuPrefixCls = "".concat(prefixCls, "-menu");
  var menuItemPrefixCls = "".concat(prefixCls, "-menu-item");

  var _useInjectCascader = (0, _context.useInjectCascader)(),
      fieldNames = _useInjectCascader.fieldNames,
      changeOnSelect = _useInjectCascader.changeOnSelect,
      expandTrigger = _useInjectCascader.expandTrigger,
      expandIconRef = _useInjectCascader.expandIcon,
      loadingIconRef = _useInjectCascader.loadingIcon,
      dropdownMenuColumnStyle = _useInjectCascader.dropdownMenuColumnStyle,
      customSlots = _useInjectCascader.customSlots;

  var expandIcon = (_a = expandIconRef.value) !== null && _a !== void 0 ? _a : (_c = (_b = customSlots.value).expandIcon) === null || _c === void 0 ? void 0 : _c.call(_b);
  var loadingIcon = (_d = loadingIconRef.value) !== null && _d !== void 0 ? _d : (_f = (_e = customSlots.value).loadingIcon) === null || _f === void 0 ? void 0 : _f.call(_e);
  var hoverOpen = expandTrigger.value === 'hover'; // ============================ Render ============================

  return (0, _vue.createVNode)("ul", {
    "class": menuPrefixCls,
    "role": "menu"
  }, [options.map(function (option) {
    var _ref2;

    var _a;

    var disabled = option.disabled;
    var searchOptions = option[_useSearchOptions.SEARCH_MARK];
    var label = (_a = option[FIX_LABEL]) !== null && _a !== void 0 ? _a : option[fieldNames.value.label];
    var value = option[fieldNames.value.value];
    var isMergedLeaf = (0, _commonUtil.isLeaf)(option, fieldNames.value); // Get real value of option. Search option is different way.

    var fullPath = searchOptions ? searchOptions.map(function (opt) {
      return opt[fieldNames.value.value];
    }) : [].concat((0, _toConsumableArray2.default)(prevValuePath), [value]);
    var fullPathKey = (0, _commonUtil.toPathKey)(fullPath);
    var isLoading = loadingKeys.includes(fullPathKey); // >>>>> checked

    var checked = checkedSet.has(fullPathKey); // >>>>> halfChecked

    var halfChecked = halfCheckedSet.has(fullPathKey); // >>>>> Open

    var triggerOpenPath = function triggerOpenPath() {
      if (!disabled && (!hoverOpen || !isMergedLeaf)) {
        onActive(fullPath);
      }
    }; // >>>>> Selection


    var triggerSelect = function triggerSelect() {
      if (isSelectable(option)) {
        onSelect(fullPath, isMergedLeaf);
      }
    }; // >>>>> Title


    var title;

    if (typeof option.title === 'string') {
      title = option.title;
    } else if (typeof label === 'string') {
      title = label;
    } // >>>>> Render


    return (0, _vue.createVNode)("li", {
      "key": fullPathKey,
      "class": [menuItemPrefixCls, (_ref2 = {}, (0, _defineProperty2.default)(_ref2, "".concat(menuItemPrefixCls, "-expand"), !isMergedLeaf), (0, _defineProperty2.default)(_ref2, "".concat(menuItemPrefixCls, "-active"), activeValue === value), (0, _defineProperty2.default)(_ref2, "".concat(menuItemPrefixCls, "-disabled"), disabled), (0, _defineProperty2.default)(_ref2, "".concat(menuItemPrefixCls, "-loading"), isLoading), _ref2)],
      "style": dropdownMenuColumnStyle.value,
      "role": "menuitemcheckbox",
      "title": title,
      "aria-checked": checked,
      "data-path-key": fullPathKey,
      "onClick": function onClick() {
        triggerOpenPath();

        if (!multiple || isMergedLeaf) {
          triggerSelect();
        }
      },
      "onDblclick": function onDblclick() {
        if (changeOnSelect.value) {
          onToggleOpen(false);
        }
      },
      "onMouseenter": function onMouseenter() {
        if (hoverOpen) {
          triggerOpenPath();
        }
      },
      "onMousedown": function onMousedown(e) {
        // Prevent selector from blurring
        e.preventDefault();
      }
    }, [multiple && (0, _vue.createVNode)(_Checkbox.default, {
      "prefixCls": "".concat(prefixCls, "-checkbox"),
      "checked": checked,
      "halfChecked": halfChecked,
      "disabled": disabled,
      "onClick": function onClick(e) {
        e.stopPropagation();
        triggerSelect();
      }
    }, null), (0, _vue.createVNode)("div", {
      "class": "".concat(menuItemPrefixCls, "-content")
    }, [label]), !isLoading && expandIcon && !isMergedLeaf && (0, _vue.createVNode)("div", {
      "class": "".concat(menuItemPrefixCls, "-expand-icon")
    }, [expandIcon]), isLoading && loadingIcon && (0, _vue.createVNode)("div", {
      "class": "".concat(menuItemPrefixCls, "-loading-icon")
    }, [loadingIcon])]);
  })]);
}

Column.props = ['prefixCls', 'multiple', 'options', 'activeValue', 'prevValuePath', 'onToggleOpen', 'onSelect', 'onActive', 'checkedSet', 'halfCheckedSet', 'loadingKeys', 'isSelectable'];
Column.displayName = 'Column';
Column.inheritAttrs = false;