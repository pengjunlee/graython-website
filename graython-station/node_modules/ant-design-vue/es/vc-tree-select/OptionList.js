import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _extends from "@babel/runtime/helpers/esm/extends";
import { resolveDirective as _resolveDirective, createVNode as _createVNode } from "vue";
import { computed, defineComponent, nextTick, ref, shallowRef, toRaw, watch } from 'vue';
import useMemo from '../_util/hooks/useMemo';
import KeyCode from '../_util/KeyCode';
import Tree from '../vc-tree/Tree';
import { getAllKeys, isCheckDisabled } from './utils/valueUtil';
import { useBaseProps } from '../vc-select';
import useInjectLegacySelectContext from './LegacyContext';
import useInjectSelectContext from './TreeSelectContext';
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
export default defineComponent({
  name: 'OptionList',
  inheritAttrs: false,
  slots: ['notFoundContent', 'menuItemSelectedIcon'],
  setup: function setup(_, _ref) {
    var slots = _ref.slots,
        expose = _ref.expose;
    var baseProps = useBaseProps();
    var legacyContext = useInjectLegacySelectContext();
    var context = useInjectSelectContext();
    var treeRef = ref();
    var memoTreeData = useMemo(function () {
      return context.treeData;
    }, [function () {
      return baseProps.open;
    }, function () {
      return context.treeData;
    }], function (next) {
      return next[0];
    });
    var mergedCheckedKeys = computed(function () {
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
    watch(function () {
      return baseProps.open;
    }, function () {
      nextTick(function () {
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

    var lowerSearchValue = computed(function () {
      return String(baseProps.searchValue).toLowerCase();
    });

    var filterTreeNode = function filterTreeNode(treeNode) {
      if (!lowerSearchValue.value) {
        return false;
      }

      return String(treeNode[legacyContext.treeNodeFilterProp]).toLowerCase().includes(lowerSearchValue.value);
    }; // =========================== Keys ===========================


    var expandedKeys = shallowRef(legacyContext.treeDefaultExpandedKeys);
    var searchExpandedKeys = shallowRef(null);
    watch(function () {
      return baseProps.searchValue;
    }, function () {
      if (baseProps.searchValue) {
        searchExpandedKeys.value = getAllKeys(toRaw(context.treeData), toRaw(context.fieldNames));
      }
    }, {
      immediate: true
    });
    var mergedExpandedKeys = computed(function () {
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

      if (checkable && isCheckDisabled(node)) {
        return;
      }

      (_a = context.onSelect) === null || _a === void 0 ? void 0 : _a.call(context, node.key, {
        selected: !checkedKeys.includes(node.key)
      });

      if (!baseProps.multiple) {
        (_b = baseProps.toggleOpen) === null || _b === void 0 ? void 0 : _b.call(baseProps, false);
      }
    }; // ========================= Keyboard =========================


    var activeKey = ref(null);
    var activeEntity = computed(function () {
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
          case KeyCode.UP:
          case KeyCode.DOWN:
          case KeyCode.LEFT:
          case KeyCode.RIGHT:
            (_a = treeRef.value) === null || _a === void 0 ? void 0 : _a.onKeydown(event);
            break;
          // >>> Select item

          case KeyCode.ENTER:
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

          case KeyCode.ESC:
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
        return _createVNode("div", {
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

      return _createVNode("div", {
        "onMousedown": onListMouseDown
      }, [activeEntity.value && open && _createVNode("span", {
        "style": HIDDEN_STYLE,
        "aria-live": "assertive"
      }, [activeEntity.value.node.value]), _createVNode(Tree, _objectSpread(_objectSpread({
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
      }), _extends(_extends({}, slots), {
        checkable: legacyContext.customSlots.treeCheckable
      }))]);
    };
  }
});