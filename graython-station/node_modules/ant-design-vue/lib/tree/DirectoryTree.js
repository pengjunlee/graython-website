"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.directoryTreeProps = exports.default = void 0;

var _vue = require("vue");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _debounce = _interopRequireDefault(require("lodash/debounce"));

var _FolderOpenOutlined = _interopRequireDefault(require("@ant-design/icons-vue/lib/icons/FolderOpenOutlined"));

var _FolderOutlined = _interopRequireDefault(require("@ant-design/icons-vue/lib/icons/FolderOutlined"));

var _FileOutlined = _interopRequireDefault(require("@ant-design/icons-vue/lib/icons/FileOutlined"));

var _classNames2 = _interopRequireDefault(require("../_util/classNames"));

var _Tree = _interopRequireWildcard(require("./Tree"));

var _initDefaultProps = _interopRequireDefault(require("../_util/props-util/initDefaultProps"));

var _treeUtil = require("../vc-tree/utils/treeUtil");

var _util = require("../vc-tree/util");

var _dictUtil = require("./utils/dictUtil");

var _useConfigInject2 = _interopRequireDefault(require("../_util/hooks/useConfigInject"));

var _propsUtil = require("../_util/props-util");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var directoryTreeProps = function directoryTreeProps() {
  return (0, _extends2.default)((0, _extends2.default)({}, (0, _Tree.treeProps)()), {
    expandAction: {
      type: [Boolean, String]
    }
  });
};

exports.directoryTreeProps = directoryTreeProps;

function getIcon(props) {
  var isLeaf = props.isLeaf,
      expanded = props.expanded;

  if (isLeaf) {
    return (0, _vue.createVNode)(_FileOutlined.default, null, null);
  }

  return expanded ? (0, _vue.createVNode)(_FolderOpenOutlined.default, null, null) : (0, _vue.createVNode)(_FolderOutlined.default, null, null);
}

var _default = (0, _vue.defineComponent)({
  name: 'ADirectoryTree',
  inheritAttrs: false,
  props: (0, _initDefaultProps.default)(directoryTreeProps(), {
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


    var treeData = (0, _vue.ref)(props.treeData || (0, _treeUtil.convertTreeToData)((0, _propsUtil.filterEmpty)((_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots))));
    (0, _vue.watch)(function () {
      return props.treeData;
    }, function () {
      treeData.value = props.treeData;
    });
    (0, _vue.onUpdated)(function () {
      (0, _vue.nextTick)(function () {
        var _a;

        if (props.treeData === undefined && slots.default) {
          treeData.value = (0, _treeUtil.convertTreeToData)((0, _propsUtil.filterEmpty)((_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)));
        }
      });
    }); // Shift click usage

    var lastSelectedKey = (0, _vue.ref)();
    var cachedSelectedKeys = (0, _vue.ref)();
    var treeRef = (0, _vue.ref)();
    expose({
      selectedKeys: (0, _vue.computed)(function () {
        var _a;

        return (_a = treeRef.value) === null || _a === void 0 ? void 0 : _a.selectedKeys;
      }),
      checkedKeys: (0, _vue.computed)(function () {
        var _a;

        return (_a = treeRef.value) === null || _a === void 0 ? void 0 : _a.checkedKeys;
      }),
      halfCheckedKeys: (0, _vue.computed)(function () {
        var _a;

        return (_a = treeRef.value) === null || _a === void 0 ? void 0 : _a.halfCheckedKeys;
      }),
      loadedKeys: (0, _vue.computed)(function () {
        var _a;

        return (_a = treeRef.value) === null || _a === void 0 ? void 0 : _a.loadedKeys;
      }),
      loadingKeys: (0, _vue.computed)(function () {
        var _a;

        return (_a = treeRef.value) === null || _a === void 0 ? void 0 : _a.loadingKeys;
      }),
      expandedKeys: (0, _vue.computed)(function () {
        var _a;

        return (_a = treeRef.value) === null || _a === void 0 ? void 0 : _a.expandedKeys;
      })
    });

    var getInitExpandedKeys = function getInitExpandedKeys() {
      var _convertDataToEntitie = (0, _treeUtil.convertDataToEntities)(treeData.value),
          keyEntities = _convertDataToEntitie.keyEntities;

      var initExpandedKeys; // Expanded keys

      if (props.defaultExpandAll) {
        initExpandedKeys = Object.keys(keyEntities);
      } else if (props.defaultExpandParent) {
        initExpandedKeys = (0, _util.conductExpandParent)(props.expandedKeys || props.defaultExpandedKeys || [], keyEntities);
      } else {
        initExpandedKeys = props.expandedKeys || props.defaultExpandedKeys;
      }

      return initExpandedKeys;
    };

    var selectedKeys = (0, _vue.ref)(props.selectedKeys || props.defaultSelectedKeys || []);
    var expandedKeys = (0, _vue.ref)(getInitExpandedKeys());
    (0, _vue.watch)(function () {
      return props.selectedKeys;
    }, function () {
      if (props.selectedKeys !== undefined) {
        selectedKeys.value = props.selectedKeys;
      }
    }, {
      immediate: true
    });
    (0, _vue.watch)(function () {
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

    var onDebounceExpand = (0, _debounce.default)(expandFolderNode, 200, {
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

    var fieldNames = (0, _vue.computed)(function () {
      return (0, _treeUtil.fillFieldNames)(props.fieldNames);
    });

    var onSelect = function onSelect(keys, event) {
      var multiple = props.multiple;
      var node = event.node,
          nativeEvent = event.nativeEvent;
      var key = node[fieldNames.value.key]; // const newState: DirectoryTreeState = {};
      // We need wrap this event since some value is not same

      var newEvent = (0, _extends2.default)((0, _extends2.default)({}, event), {
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
        newEvent.selectedNodes = (0, _dictUtil.convertDirectoryKeysToNodes)(treeData.value, newSelectedKeys, fieldNames.value);
      } else if (multiple && shiftPick) {
        // Shift click
        newSelectedKeys = Array.from(new Set([].concat((0, _toConsumableArray2.default)(cachedSelectedKeys.value || []), (0, _toConsumableArray2.default)((0, _dictUtil.calcRangeKeys)({
          treeData: treeData.value,
          expandedKeys: expandedKeys.value,
          startKey: key,
          endKey: lastSelectedKey.value,
          fieldNames: fieldNames.value
        })))));
        newEvent.selectedNodes = (0, _dictUtil.convertDirectoryKeysToNodes)(treeData.value, newSelectedKeys, fieldNames.value);
      } else {
        // Single click
        newSelectedKeys = [key];
        lastSelectedKey.value = key;
        cachedSelectedKeys.value = newSelectedKeys;
        newEvent.selectedNodes = (0, _dictUtil.convertDirectoryKeysToNodes)(treeData.value, newSelectedKeys, fieldNames.value);
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

    var _useConfigInject = (0, _useConfigInject2.default)('tree', props),
        prefixCls = _useConfigInject.prefixCls,
        direction = _useConfigInject.direction;

    return function () {
      var connectClassName = (0, _classNames2.default)("".concat(prefixCls.value, "-directory"), (0, _defineProperty2.default)({}, "".concat(prefixCls.value, "-directory-rtl"), direction.value === 'rtl'), attrs.class);

      var _props$icon = props.icon,
          icon = _props$icon === void 0 ? slots.icon : _props$icon,
          _props$blockNode = props.blockNode,
          blockNode = _props$blockNode === void 0 ? true : _props$blockNode,
          otherProps = __rest(props, ["icon", "blockNode"]);

      return (0, _vue.createVNode)(_Tree.default, (0, _objectSpread2.default)((0, _objectSpread2.default)((0, _objectSpread2.default)({}, attrs), {}, {
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

exports.default = _default;