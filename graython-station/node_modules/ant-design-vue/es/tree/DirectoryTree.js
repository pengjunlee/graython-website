import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
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

import { nextTick, onUpdated, ref, watch, defineComponent, computed } from 'vue';
import debounce from 'lodash-es/debounce';
import FolderOpenOutlined from "@ant-design/icons-vue/es/icons/FolderOpenOutlined";
import FolderOutlined from "@ant-design/icons-vue/es/icons/FolderOutlined";
import FileOutlined from "@ant-design/icons-vue/es/icons/FileOutlined";
import classNames from '../_util/classNames';
import Tree, { treeProps } from './Tree';
import initDefaultProps from '../_util/props-util/initDefaultProps';
import { convertDataToEntities, convertTreeToData, fillFieldNames } from '../vc-tree/utils/treeUtil';
import { conductExpandParent } from '../vc-tree/util';
import { calcRangeKeys, convertDirectoryKeysToNodes } from './utils/dictUtil';
import useConfigInject from '../_util/hooks/useConfigInject';
import { filterEmpty } from '../_util/props-util';
export var directoryTreeProps = function directoryTreeProps() {
  return _extends(_extends({}, treeProps()), {
    expandAction: {
      type: [Boolean, String]
    }
  });
};

function getIcon(props) {
  var isLeaf = props.isLeaf,
      expanded = props.expanded;

  if (isLeaf) {
    return _createVNode(FileOutlined, null, null);
  }

  return expanded ? _createVNode(FolderOpenOutlined, null, null) : _createVNode(FolderOutlined, null, null);
}

export default defineComponent({
  name: 'ADirectoryTree',
  inheritAttrs: false,
  props: initDefaultProps(directoryTreeProps(), {
    showIcon: true,
    expandAction: 'click'
  }),
  slots: ['icon', 'title', 'switcherIcon', 'titleRender'],
  // emits: [
  //   'update:selectedKeys',
  //   'update:checkedKeys',
  //   'update:expandedKeys',
  //   'expand',
  //   'select',
  //   'check',
  //   'doubleclick',
  //   'dblclick',
  //   'click',
  // ],
  setup: function setup(props, _ref) {
    var attrs = _ref.attrs,
        slots = _ref.slots,
        emit = _ref.emit,
        expose = _ref.expose;

    var _a; // convertTreeToData 兼容 a-tree-node 历史写法，未来a-tree-node移除后，删除相关代码，不要再render中调用 treeData，否则死循环


    var treeData = ref(props.treeData || convertTreeToData(filterEmpty((_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots))));
    watch(function () {
      return props.treeData;
    }, function () {
      treeData.value = props.treeData;
    });
    onUpdated(function () {
      nextTick(function () {
        var _a;

        if (props.treeData === undefined && slots.default) {
          treeData.value = convertTreeToData(filterEmpty((_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)));
        }
      });
    }); // Shift click usage

    var lastSelectedKey = ref();
    var cachedSelectedKeys = ref();
    var treeRef = ref();
    expose({
      selectedKeys: computed(function () {
        var _a;

        return (_a = treeRef.value) === null || _a === void 0 ? void 0 : _a.selectedKeys;
      }),
      checkedKeys: computed(function () {
        var _a;

        return (_a = treeRef.value) === null || _a === void 0 ? void 0 : _a.checkedKeys;
      }),
      halfCheckedKeys: computed(function () {
        var _a;

        return (_a = treeRef.value) === null || _a === void 0 ? void 0 : _a.halfCheckedKeys;
      }),
      loadedKeys: computed(function () {
        var _a;

        return (_a = treeRef.value) === null || _a === void 0 ? void 0 : _a.loadedKeys;
      }),
      loadingKeys: computed(function () {
        var _a;

        return (_a = treeRef.value) === null || _a === void 0 ? void 0 : _a.loadingKeys;
      }),
      expandedKeys: computed(function () {
        var _a;

        return (_a = treeRef.value) === null || _a === void 0 ? void 0 : _a.expandedKeys;
      })
    });

    var getInitExpandedKeys = function getInitExpandedKeys() {
      var _convertDataToEntitie = convertDataToEntities(treeData.value),
          keyEntities = _convertDataToEntitie.keyEntities;

      var initExpandedKeys; // Expanded keys

      if (props.defaultExpandAll) {
        initExpandedKeys = Object.keys(keyEntities);
      } else if (props.defaultExpandParent) {
        initExpandedKeys = conductExpandParent(props.expandedKeys || props.defaultExpandedKeys || [], keyEntities);
      } else {
        initExpandedKeys = props.expandedKeys || props.defaultExpandedKeys;
      }

      return initExpandedKeys;
    };

    var selectedKeys = ref(props.selectedKeys || props.defaultSelectedKeys || []);
    var expandedKeys = ref(getInitExpandedKeys());
    watch(function () {
      return props.selectedKeys;
    }, function () {
      if (props.selectedKeys !== undefined) {
        selectedKeys.value = props.selectedKeys;
      }
    }, {
      immediate: true
    });
    watch(function () {
      return props.expandedKeys;
    }, function () {
      if (props.expandedKeys !== undefined) {
        expandedKeys.value = props.expandedKeys;
      }
    }, {
      immediate: true
    });

    var expandFolderNode = function expandFolderNode(event, node) {
      var isLeaf = node.isLeaf;

      if (isLeaf || event.shiftKey || event.metaKey || event.ctrlKey) {
        return;
      } // Call internal rc-tree expand function
      // https://github.com/ant-design/ant-design/issues/12567


      treeRef.value.onNodeExpand(event, node);
    };

    var onDebounceExpand = debounce(expandFolderNode, 200, {
      leading: true
    });

    var onExpand = function onExpand(keys, info) {
      if (props.expandedKeys === undefined) {
        expandedKeys.value = keys;
      } // Call origin function


      emit('update:expandedKeys', keys);
      emit('expand', keys, info);
    };

    var onClick = function onClick(event, node) {
      var expandAction = props.expandAction; // Expand the tree

      if (expandAction === 'click') {
        onDebounceExpand(event, node);
      }

      emit('click', event, node);
    };

    var onDoubleClick = function onDoubleClick(event, node) {
      var expandAction = props.expandAction; // Expand the tree

      if (expandAction === 'dblclick' || expandAction === 'doubleclick') {
        onDebounceExpand(event, node);
      }

      emit('doubleclick', event, node);
      emit('dblclick', event, node);
    };

    var fieldNames = computed(function () {
      return fillFieldNames(props.fieldNames);
    });

    var onSelect = function onSelect(keys, event) {
      var multiple = props.multiple;
      var node = event.node,
          nativeEvent = event.nativeEvent;
      var key = node[fieldNames.value.key]; // const newState: DirectoryTreeState = {};
      // We need wrap this event since some value is not same

      var newEvent = _extends(_extends({}, event), {
        selected: true
      }); // Windows / Mac single pick


      var ctrlPick = (nativeEvent === null || nativeEvent === void 0 ? void 0 : nativeEvent.ctrlKey) || (nativeEvent === null || nativeEvent === void 0 ? void 0 : nativeEvent.metaKey);
      var shiftPick = nativeEvent === null || nativeEvent === void 0 ? void 0 : nativeEvent.shiftKey; // Generate new selected keys

      var newSelectedKeys;

      if (multiple && ctrlPick) {
        // Control click
        newSelectedKeys = keys;
        lastSelectedKey.value = key;
        cachedSelectedKeys.value = newSelectedKeys;
        newEvent.selectedNodes = convertDirectoryKeysToNodes(treeData.value, newSelectedKeys, fieldNames.value);
      } else if (multiple && shiftPick) {
        // Shift click
        newSelectedKeys = Array.from(new Set([].concat(_toConsumableArray(cachedSelectedKeys.value || []), _toConsumableArray(calcRangeKeys({
          treeData: treeData.value,
          expandedKeys: expandedKeys.value,
          startKey: key,
          endKey: lastSelectedKey.value,
          fieldNames: fieldNames.value
        })))));
        newEvent.selectedNodes = convertDirectoryKeysToNodes(treeData.value, newSelectedKeys, fieldNames.value);
      } else {
        // Single click
        newSelectedKeys = [key];
        lastSelectedKey.value = key;
        cachedSelectedKeys.value = newSelectedKeys;
        newEvent.selectedNodes = convertDirectoryKeysToNodes(treeData.value, newSelectedKeys, fieldNames.value);
      }

      emit('update:selectedKeys', newSelectedKeys);
      emit('select', newSelectedKeys, newEvent);

      if (props.selectedKeys === undefined) {
        selectedKeys.value = newSelectedKeys;
      }
    };

    var onCheck = function onCheck(checkedObjOrKeys, eventObj) {
      emit('update:checkedKeys', checkedObjOrKeys);
      emit('check', checkedObjOrKeys, eventObj);
    };

    var _useConfigInject = useConfigInject('tree', props),
        prefixCls = _useConfigInject.prefixCls,
        direction = _useConfigInject.direction;

    return function () {
      var connectClassName = classNames("".concat(prefixCls.value, "-directory"), _defineProperty({}, "".concat(prefixCls.value, "-directory-rtl"), direction.value === 'rtl'), attrs.class);

      var _props$icon = props.icon,
          icon = _props$icon === void 0 ? slots.icon : _props$icon,
          _props$blockNode = props.blockNode,
          blockNode = _props$blockNode === void 0 ? true : _props$blockNode,
          otherProps = __rest(props, ["icon", "blockNode"]);

      return _createVNode(Tree, _objectSpread(_objectSpread(_objectSpread({}, attrs), {}, {
        "icon": icon || getIcon,
        "ref": treeRef,
        "blockNode": blockNode
      }, otherProps), {}, {
        "prefixCls": prefixCls.value,
        "class": connectClassName,
        "expandedKeys": expandedKeys.value,
        "selectedKeys": selectedKeys.value,
        "onSelect": onSelect,
        "onClick": onClick,
        "onDblclick": onDoubleClick,
        "onExpand": onExpand,
        "onCheck": onCheck
      }), slots);
    };
  }
});