"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = require("vue");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _useMemo = _interopRequireDefault(require("../_util/hooks/useMemo"));

var _KeyCode = _interopRequireDefault(require("../_util/KeyCode"));

var _Tree = _interopRequireDefault(require("../vc-tree/Tree"));

var _valueUtil = require("./utils/valueUtil");

var _vcSelect = require("../vc-select");

var _LegacyContext = _interopRequireDefault(require("./LegacyContext"));

var _TreeSelectContext = _interopRequireDefault(require("./TreeSelectContext"));

var HIDDEN_STYLE = {
  width: 0,
  height: 0,
  display: 'flex',
  overflow: 'hidden',
  opacity: 0,
  border: 0,
  padding: 0,
  margin: 0
};

var _default = (0, _vue.defineComponent)({
  name: 'OptionList',
  inheritAttrs: false,
  slots: ['notFoundContent', 'menuItemSelectedIcon'],
  setup: function setup(_, _ref) {
    var slots = _ref.slots,
        expose = _ref.expose;
    var baseProps = (0, _vcSelect.useBaseProps)();
    var legacyContext = (0, _LegacyContext.default)();
    var context = (0, _TreeSelectContext.default)();
    var treeRef = (0, _vue.ref)();
    var memoTreeData = (0, _useMemo.default)(function () {
      return context.treeData;
    }, [function () {
      return baseProps.open;
    }, function () {
      return context.treeData;
    }], function (next) {
      return next[0];
    });
    var mergedCheckedKeys = (0, _vue.computed)(function () {
      var checkable = legacyContext.checkable,
          halfCheckedKeys = legacyContext.halfCheckedKeys,
          checkedKeys = legacyContext.checkedKeys;

      if (!checkable) {
        return null;
      }

      return {
        checked: checkedKeys,
        halfChecked: halfCheckedKeys
      };
    });
    (0, _vue.watch)(function () {
      return baseProps.open;
    }, function () {
      (0, _vue.nextTick)(function () {
        var _a;

        if (baseProps.open && !baseProps.multiple && legacyContext.checkedKeys.length) {
          (_a = treeRef.value) === null || _a === void 0 ? void 0 : _a.scrollTo({
            key: legacyContext.checkedKeys[0]
          });
        }
      });
    }, {
      immediate: true,
      flush: 'post'
    }); // ========================== Search ==========================

    var lowerSearchValue = (0, _vue.computed)(function () {
      return String(baseProps.searchValue).toLowerCase();
    });

    var filterTreeNode = function filterTreeNode(treeNode) {
      if (!lowerSearchValue.value) {
        return false;
      }

      return String(treeNode[legacyContext.treeNodeFilterProp]).toLowerCase().includes(lowerSearchValue.value);
    }; // =========================== Keys ===========================


    var expandedKeys = (0, _vue.shallowRef)(legacyContext.treeDefaultExpandedKeys);
    var searchExpandedKeys = (0, _vue.shallowRef)(null);
    (0, _vue.watch)(function () {
      return baseProps.searchValue;
    }, function () {
      if (baseProps.searchValue) {
        searchExpandedKeys.value = (0, _valueUtil.getAllKeys)((0, _vue.toRaw)(context.treeData), (0, _vue.toRaw)(context.fieldNames));
      }
    }, {
      immediate: true
    });
    var mergedExpandedKeys = (0, _vue.computed)(function () {
      if (legacyContext.treeExpandedKeys) {
        return legacyContext.treeExpandedKeys.slice();
      }

      return baseProps.searchValue ? searchExpandedKeys.value : expandedKeys.value;
    });

    var onInternalExpand = function onInternalExpand(keys) {
      var _a;

      expandedKeys.value = keys;
      searchExpandedKeys.value = keys;
      (_a = legacyContext.onTreeExpand) === null || _a === void 0 ? void 0 : _a.call(legacyContext, keys);
    }; // ========================== Events ==========================


    var onListMouseDown = function onListMouseDown(event) {
      event.preventDefault();
    };

    var onInternalSelect = function onInternalSelect(_, _ref2) {
      var node = _ref2.node;

      var _a, _b;

      var checkable = legacyContext.checkable,
          checkedKeys = legacyContext.checkedKeys;

      if (checkable && (0, _valueUtil.isCheckDisabled)(node)) {
        return;
      }

      (_a = context.onSelect) === null || _a === void 0 ? void 0 : _a.call(context, node.key, {
        selected: !checkedKeys.includes(node.key)
      });

      if (!baseProps.multiple) {
        (_b = baseProps.toggleOpen) === null || _b === void 0 ? void 0 : _b.call(baseProps, false);
      }
    }; // ========================= Keyboard =========================


    var activeKey = (0, _vue.ref)(null);
    var activeEntity = (0, _vue.computed)(function () {
      return legacyContext.keyEntities[activeKey.value];
    });

    var setActiveKey = function setActiveKey(key) {
      activeKey.value = key;
    };

    expose({
      scrollTo: function scrollTo() {
        var _b2;

        var _a, _b;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return (_b = (_a = treeRef.value) === null || _a === void 0 ? void 0 : _a.scrollTo) === null || _b === void 0 ? void 0 : (_b2 = _b).call.apply(_b2, [_a].concat(args));
      },
      onKeydown: function onKeydown(event) {
        var _a;

        var which = event.which;

        switch (which) {
          // >>> Arrow keys
          case _KeyCode.default.UP:
          case _KeyCode.default.DOWN:
          case _KeyCode.default.LEFT:
          case _KeyCode.default.RIGHT:
            (_a = treeRef.value) === null || _a === void 0 ? void 0 : _a.onKeydown(event);
            break;
          // >>> Select item

          case _KeyCode.default.ENTER:
            {
              if (activeEntity.value) {
                var _ref3 = activeEntity.value.node || {},
                    selectable = _ref3.selectable,
                    value = _ref3.value;

                if (selectable !== false) {
                  onInternalSelect(null, {
                    node: {
                      key: activeKey.value
                    },
                    selected: !legacyContext.checkedKeys.includes(value)
                  });
                }
              }

              break;
            }
          // >>> Close

          case _KeyCode.default.ESC:
            {
              baseProps.toggleOpen(false);
            }
        }
      },
      onKeyup: function onKeyup() {}
    });
    return function () {
      var _a;

      var prefixCls = baseProps.prefixCls,
          multiple = baseProps.multiple,
          searchValue = baseProps.searchValue,
          open = baseProps.open,
          _baseProps$notFoundCo = baseProps.notFoundContent,
          notFoundContent = _baseProps$notFoundCo === void 0 ? (_a = slots.notFoundContent) === null || _a === void 0 ? void 0 : _a.call(slots) : _baseProps$notFoundCo;
      var listHeight = context.listHeight,
          listItemHeight = context.listItemHeight,
          virtual = context.virtual;
      var checkable = legacyContext.checkable,
          treeDefaultExpandAll = legacyContext.treeDefaultExpandAll,
          treeIcon = legacyContext.treeIcon,
          showTreeIcon = legacyContext.showTreeIcon,
          switcherIcon = legacyContext.switcherIcon,
          treeLine = legacyContext.treeLine,
          loadData = legacyContext.loadData,
          treeLoadedKeys = legacyContext.treeLoadedKeys,
          treeMotion = legacyContext.treeMotion,
          onTreeLoad = legacyContext.onTreeLoad,
          checkedKeys = legacyContext.checkedKeys; // ========================== Render ==========================

      if (memoTreeData.value.length === 0) {
        return (0, _vue.createVNode)("div", {
          "role": "listbox",
          "class": "".concat(prefixCls, "-empty"),
          "onMousedown": onListMouseDown
        }, [notFoundContent]);
      }

      var treeProps = {
        fieldNames: context.fieldNames
      };

      if (treeLoadedKeys) {
        treeProps.loadedKeys = treeLoadedKeys;
      }

      if (mergedExpandedKeys.value) {
        treeProps.expandedKeys = mergedExpandedKeys.value;
      }

      return (0, _vue.createVNode)("div", {
        "onMousedown": onListMouseDown
      }, [activeEntity.value && open && (0, _vue.createVNode)("span", {
        "style": HIDDEN_STYLE,
        "aria-live": "assertive"
      }, [activeEntity.value.node.value]), (0, _vue.createVNode)(_Tree.default, (0, _objectSpread2.default)((0, _objectSpread2.default)({
        "ref": treeRef,
        "focusable": false,
        "prefixCls": "".concat(prefixCls, "-tree"),
        "treeData": memoTreeData.value,
        "height": listHeight,
        "itemHeight": listItemHeight,
        "virtual": virtual,
        "multiple": multiple,
        "icon": treeIcon,
        "showIcon": showTreeIcon,
        "switcherIcon": switcherIcon,
        "showLine": treeLine,
        "loadData": searchValue ? null : loadData,
        "motion": treeMotion,
        "activeKey": activeKey.value,
        "checkable": checkable,
        "checkStrictly": true,
        "checkedKeys": mergedCheckedKeys.value,
        "selectedKeys": !checkable ? checkedKeys : [],
        "defaultExpandAll": treeDefaultExpandAll
      }, treeProps), {}, {
        "onActiveChange": setActiveKey,
        "onSelect": onInternalSelect,
        "onCheck": onInternalSelect,
        "onExpand": onInternalExpand,
        "onLoad": onTreeLoad,
        "filterTreeNode": filterTreeNode
      }), (0, _extends2.default)((0, _extends2.default)({}, slots), {
        checkable: legacyContext.customSlots.treeCheckable
      }))]);
    };
  }
});

exports.default = _default;