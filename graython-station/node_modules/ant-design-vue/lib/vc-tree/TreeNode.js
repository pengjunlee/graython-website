"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = require("vue");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _contextTypes = require("./contextTypes");

var _Indent = _interopRequireDefault(require("./Indent"));

var _treeUtil = require("./utils/treeUtil");

var _props = require("./props");

var _classNames2 = _interopRequireDefault(require("../_util/classNames"));

var _warning = require("../vc-util/warning");

var _pickAttrs = _interopRequireDefault(require("../_util/pickAttrs"));

var _eagerComputed = _interopRequireDefault(require("../_util/eagerComputed"));

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

var ICON_OPEN = 'open';
var ICON_CLOSE = 'close';
var defaultTitle = '---';

var _default = (0, _vue.defineComponent)({
  name: 'TreeNode',
  inheritAttrs: false,
  props: _props.treeNodeProps,
  isTreeNode: 1,
  slots: ['title', 'icon', 'switcherIcon'],
  setup: function setup(props, _ref) {
    var attrs = _ref.attrs,
        slots = _ref.slots,
        expose = _ref.expose;
    (0, _warning.warning)(!('slots' in props.data), "treeData slots is deprecated, please use ".concat(Object.keys(props.data.slots || {}).map(function (key) {
      return '`v-slot:' + key + '` ';
    }), "instead"));
    var dragNodeHighlight = (0, _vue.ref)(false);
    var context = (0, _contextTypes.useInjectTreeContext)();

    var _useInjectKeysState = (0, _contextTypes.useInjectKeysState)(),
        expandedKeysSet = _useInjectKeysState.expandedKeysSet,
        selectedKeysSet = _useInjectKeysState.selectedKeysSet,
        loadedKeysSet = _useInjectKeysState.loadedKeysSet,
        loadingKeysSet = _useInjectKeysState.loadingKeysSet,
        checkedKeysSet = _useInjectKeysState.checkedKeysSet,
        halfCheckedKeysSet = _useInjectKeysState.halfCheckedKeysSet;

    var _context$value = context.value,
        dragOverNodeKey = _context$value.dragOverNodeKey,
        dropPosition = _context$value.dropPosition,
        keyEntities = _context$value.keyEntities;
    var mergedTreeNodeProps = (0, _vue.computed)(function () {
      return (0, _treeUtil.getTreeNodeProps)(props.eventKey, {
        expandedKeysSet: expandedKeysSet.value,
        selectedKeysSet: selectedKeysSet.value,
        loadedKeysSet: loadedKeysSet.value,
        loadingKeysSet: loadingKeysSet.value,
        checkedKeysSet: checkedKeysSet.value,
        halfCheckedKeysSet: halfCheckedKeysSet.value,
        dragOverNodeKey: dragOverNodeKey,
        dropPosition: dropPosition,
        keyEntities: keyEntities
      });
    });
    var expanded = (0, _eagerComputed.default)(function () {
      return mergedTreeNodeProps.value.expanded;
    });
    var selected = (0, _eagerComputed.default)(function () {
      return mergedTreeNodeProps.value.selected;
    });
    var checked = (0, _eagerComputed.default)(function () {
      return mergedTreeNodeProps.value.checked;
    });
    var loaded = (0, _eagerComputed.default)(function () {
      return mergedTreeNodeProps.value.loaded;
    });
    var loading = (0, _eagerComputed.default)(function () {
      return mergedTreeNodeProps.value.loading;
    });
    var halfChecked = (0, _eagerComputed.default)(function () {
      return mergedTreeNodeProps.value.halfChecked;
    });
    var dragOver = (0, _eagerComputed.default)(function () {
      return mergedTreeNodeProps.value.dragOver;
    });
    var dragOverGapTop = (0, _eagerComputed.default)(function () {
      return mergedTreeNodeProps.value.dragOverGapTop;
    });
    var dragOverGapBottom = (0, _eagerComputed.default)(function () {
      return mergedTreeNodeProps.value.dragOverGapBottom;
    });
    var pos = (0, _eagerComputed.default)(function () {
      return mergedTreeNodeProps.value.pos;
    });
    var selectHandle = (0, _vue.ref)();
    var hasChildren = (0, _vue.computed)(function () {
      var eventKey = props.eventKey;
      var keyEntities = context.value.keyEntities;

      var _ref2 = keyEntities[eventKey] || {},
          children = _ref2.children;

      return !!(children || []).length;
    });
    var isLeaf = (0, _vue.computed)(function () {
      var isLeaf = props.isLeaf;
      var loadData = context.value.loadData;
      var has = hasChildren.value;

      if (isLeaf === false) {
        return false;
      }

      return isLeaf || !loadData && !has || loadData && loaded.value && !has;
    });
    var nodeState = (0, _vue.computed)(function () {
      if (isLeaf.value) {
        return null;
      }

      return expanded.value ? ICON_OPEN : ICON_CLOSE;
    });
    var isDisabled = (0, _vue.computed)(function () {
      var disabled = props.disabled;
      var treeDisabled = context.value.disabled;
      return !!(treeDisabled || disabled);
    });
    var isCheckable = (0, _vue.computed)(function () {
      var checkable = props.checkable;
      var treeCheckable = context.value.checkable; // Return false if tree or treeNode is not checkable

      if (!treeCheckable || checkable === false) return false;
      return treeCheckable;
    });
    var isSelectable = (0, _vue.computed)(function () {
      var selectable = props.selectable;
      var treeSelectable = context.value.selectable; // Ignore when selectable is undefined or null

      if (typeof selectable === 'boolean') {
        return selectable;
      }

      return treeSelectable;
    });
    var renderArgsData = (0, _vue.computed)(function () {
      var data = props.data,
          active = props.active,
          checkable = props.checkable,
          disableCheckbox = props.disableCheckbox,
          disabled = props.disabled,
          selectable = props.selectable;
      return (0, _extends2.default)((0, _extends2.default)({
        active: active,
        checkable: checkable,
        disableCheckbox: disableCheckbox,
        disabled: disabled,
        selectable: selectable
      }, data), {
        dataRef: data,
        data: data,
        isLeaf: isLeaf.value,
        checked: checked.value,
        expanded: expanded.value,
        loading: loading.value,
        selected: selected.value,
        halfChecked: halfChecked.value
      });
    });
    var instance = (0, _vue.getCurrentInstance)();
    var eventData = (0, _vue.computed)(function () {
      var eventKey = props.eventKey;
      var keyEntities = context.value.keyEntities;

      var _ref3 = keyEntities[eventKey] || {},
          parent = _ref3.parent;

      return (0, _extends2.default)((0, _extends2.default)({}, (0, _treeUtil.convertNodePropsToEventData)((0, _extends2.default)({}, props, mergedTreeNodeProps.value))), {
        parent: parent
      });
    });
    var dragNodeEvent = (0, _vue.reactive)({
      eventData: eventData,
      eventKey: (0, _vue.computed)(function () {
        return props.eventKey;
      }),
      selectHandle: selectHandle,
      pos: pos,
      key: instance.vnode.key
    });
    expose(dragNodeEvent);

    var onSelectorDoubleClick = function onSelectorDoubleClick(e) {
      var onNodeDoubleClick = context.value.onNodeDoubleClick;
      onNodeDoubleClick(e, eventData.value);
    };

    var onSelect = function onSelect(e) {
      if (isDisabled.value) return;
      var onNodeSelect = context.value.onNodeSelect;
      e.preventDefault();
      onNodeSelect(e, eventData.value);
    };

    var onCheck = function onCheck(e) {
      if (isDisabled.value) return;
      var disableCheckbox = props.disableCheckbox;
      var onNodeCheck = context.value.onNodeCheck;
      if (!isCheckable.value || disableCheckbox) return;
      e.preventDefault();
      var targetChecked = !checked.value;
      onNodeCheck(e, eventData.value, targetChecked);
    };

    var onSelectorClick = function onSelectorClick(e) {
      // Click trigger before select/check operation
      var onNodeClick = context.value.onNodeClick;
      onNodeClick(e, eventData.value);

      if (isSelectable.value) {
        onSelect(e);
      } else {
        onCheck(e);
      }
    };

    var onMouseEnter = function onMouseEnter(e) {
      var onNodeMouseEnter = context.value.onNodeMouseEnter;
      onNodeMouseEnter(e, eventData.value);
    };

    var onMouseLeave = function onMouseLeave(e) {
      var onNodeMouseLeave = context.value.onNodeMouseLeave;
      onNodeMouseLeave(e, eventData.value);
    };

    var onContextmenu = function onContextmenu(e) {
      var onNodeContextMenu = context.value.onNodeContextMenu;
      onNodeContextMenu(e, eventData.value);
    };

    var onDragStart = function onDragStart(e) {
      var onNodeDragStart = context.value.onNodeDragStart;
      e.stopPropagation();
      dragNodeHighlight.value = true;
      onNodeDragStart(e, dragNodeEvent);

      try {
        // ie throw error
        // firefox-need-it
        e.dataTransfer.setData('text/plain', '');
      } catch (error) {// empty
      }
    };

    var onDragEnter = function onDragEnter(e) {
      var onNodeDragEnter = context.value.onNodeDragEnter;
      e.preventDefault();
      e.stopPropagation();
      onNodeDragEnter(e, dragNodeEvent);
    };

    var onDragOver = function onDragOver(e) {
      var onNodeDragOver = context.value.onNodeDragOver;
      e.preventDefault();
      e.stopPropagation();
      onNodeDragOver(e, dragNodeEvent);
    };

    var onDragLeave = function onDragLeave(e) {
      var onNodeDragLeave = context.value.onNodeDragLeave;
      e.stopPropagation();
      onNodeDragLeave(e, dragNodeEvent);
    };

    var onDragEnd = function onDragEnd(e) {
      var onNodeDragEnd = context.value.onNodeDragEnd;
      e.stopPropagation();
      dragNodeHighlight.value = false;
      onNodeDragEnd(e, dragNodeEvent);
    };

    var onDrop = function onDrop(e) {
      var onNodeDrop = context.value.onNodeDrop;
      e.preventDefault();
      e.stopPropagation();
      dragNodeHighlight.value = false;
      onNodeDrop(e, dragNodeEvent);
    }; // Disabled item still can be switch


    var onExpand = function onExpand(e) {
      var onNodeExpand = context.value.onNodeExpand;
      if (loading.value) return;
      onNodeExpand(e, eventData.value);
    };

    var isDraggable = function isDraggable() {
      var data = props.data;
      var draggable = context.value.draggable;
      return !!(draggable && (!draggable.nodeDraggable || draggable.nodeDraggable(data)));
    }; // ==================== Render: Drag Handler ====================


    var renderDragHandler = function renderDragHandler() {
      var _context$value2 = context.value,
          draggable = _context$value2.draggable,
          prefixCls = _context$value2.prefixCls;
      return (draggable === null || draggable === void 0 ? void 0 : draggable.icon) ? (0, _vue.createVNode)("span", {
        "class": "".concat(prefixCls, "-draggable-icon")
      }, [draggable.icon]) : null;
    };

    var renderSwitcherIconDom = function renderSwitcherIconDom() {
      var _a, _b, _c;

      var _props$switcherIcon = props.switcherIcon,
          switcherIconFromProps = _props$switcherIcon === void 0 ? slots.switcherIcon || ((_a = context.value.slots) === null || _a === void 0 ? void 0 : _a[(_c = (_b = props.data) === null || _b === void 0 ? void 0 : _b.slots) === null || _c === void 0 ? void 0 : _c.switcherIcon]) : _props$switcherIcon;
      var switcherIconFromCtx = context.value.switcherIcon;
      var switcherIcon = switcherIconFromProps || switcherIconFromCtx; // if switcherIconDom is null, no render switcher span

      if (typeof switcherIcon === 'function') {
        return switcherIcon(renderArgsData.value);
      }

      return switcherIcon;
    }; // Load data to avoid default expanded tree without data


    var syncLoadData = function syncLoadData() {
      //const { expanded, loading, loaded } = props;
      var _context$value3 = context.value,
          loadData = _context$value3.loadData,
          onNodeLoad = _context$value3.onNodeLoad;

      if (loading.value) {
        return;
      } // read from state to avoid loadData at same time


      if (loadData && expanded.value && !isLeaf.value) {
        // We needn't reload data when has children in sync logic
        // It's only needed in node expanded
        if (!hasChildren.value && !loaded.value) {
          onNodeLoad(eventData.value);
        }
      }
    };

    (0, _vue.onMounted)(function () {
      syncLoadData();
    });
    (0, _vue.onUpdated)(function () {
      // https://github.com/vueComponent/ant-design-vue/issues/4835
      syncLoadData();
    }); // Switcher

    var renderSwitcher = function renderSwitcher() {
      var prefixCls = context.value.prefixCls; // if switcherIconDom is null, no render switcher span

      var switcherIconDom = renderSwitcherIconDom();

      if (isLeaf.value) {
        return switcherIconDom !== false ? (0, _vue.createVNode)("span", {
          "class": (0, _classNames2.default)("".concat(prefixCls, "-switcher"), "".concat(prefixCls, "-switcher-noop"))
        }, [switcherIconDom]) : null;
      }

      var switcherCls = (0, _classNames2.default)("".concat(prefixCls, "-switcher"), "".concat(prefixCls, "-switcher_").concat(expanded.value ? ICON_OPEN : ICON_CLOSE));
      return switcherIconDom !== false ? (0, _vue.createVNode)("span", {
        "onClick": onExpand,
        "class": switcherCls
      }, [switcherIconDom]) : null;
    }; // Checkbox


    var renderCheckbox = function renderCheckbox() {
      var _a, _b;

      var disableCheckbox = props.disableCheckbox;
      var prefixCls = context.value.prefixCls;
      var disabled = isDisabled.value;
      var checkable = isCheckable.value;
      if (!checkable) return null;
      return (0, _vue.createVNode)("span", {
        "class": (0, _classNames2.default)("".concat(prefixCls, "-checkbox"), checked.value && "".concat(prefixCls, "-checkbox-checked"), !checked.value && halfChecked.value && "".concat(prefixCls, "-checkbox-indeterminate"), (disabled || disableCheckbox) && "".concat(prefixCls, "-checkbox-disabled")),
        "onClick": onCheck
      }, [(_b = (_a = context.value).customCheckable) === null || _b === void 0 ? void 0 : _b.call(_a)]);
    };

    var renderIcon = function renderIcon() {
      var prefixCls = context.value.prefixCls;
      return (0, _vue.createVNode)("span", {
        "class": (0, _classNames2.default)("".concat(prefixCls, "-iconEle"), "".concat(prefixCls, "-icon__").concat(nodeState.value || 'docu'), loading.value && "".concat(prefixCls, "-icon_loading"))
      }, null);
    };

    var renderDropIndicator = function renderDropIndicator() {
      var disabled = props.disabled,
          eventKey = props.eventKey;
      var _context$value4 = context.value,
          draggable = _context$value4.draggable,
          dropLevelOffset = _context$value4.dropLevelOffset,
          dropPosition = _context$value4.dropPosition,
          prefixCls = _context$value4.prefixCls,
          indent = _context$value4.indent,
          dropIndicatorRender = _context$value4.dropIndicatorRender,
          dragOverNodeKey = _context$value4.dragOverNodeKey,
          direction = _context$value4.direction;
      var rootDraggable = draggable !== false; // allowDrop is calculated in Tree.tsx, there is no need for calc it here

      var showIndicator = !disabled && rootDraggable && dragOverNodeKey === eventKey;
      return showIndicator ? dropIndicatorRender({
        dropPosition: dropPosition,
        dropLevelOffset: dropLevelOffset,
        indent: indent,
        prefixCls: prefixCls,
        direction: direction
      }) : null;
    }; // Icon + Title


    var renderSelector = function renderSelector() {
      var _a, _b, _c, _d, _e, _f;

      var _props$icon = props.icon,
          icon = _props$icon === void 0 ? slots.icon : _props$icon,
          data = props.data;
      var title = slots.title || ((_a = context.value.slots) === null || _a === void 0 ? void 0 : _a[(_c = (_b = props.data) === null || _b === void 0 ? void 0 : _b.slots) === null || _c === void 0 ? void 0 : _c.title]) || ((_d = context.value.slots) === null || _d === void 0 ? void 0 : _d.title) || props.title;
      var _context$value5 = context.value,
          prefixCls = _context$value5.prefixCls,
          showIcon = _context$value5.showIcon,
          treeIcon = _context$value5.icon,
          loadData = _context$value5.loadData;
      var disabled = isDisabled.value;
      var wrapClass = "".concat(prefixCls, "-node-content-wrapper"); // Icon - Still show loading icon when loading without showIcon

      var $icon;

      if (showIcon) {
        var currentIcon = icon || ((_e = context.value.slots) === null || _e === void 0 ? void 0 : _e[(_f = data === null || data === void 0 ? void 0 : data.slots) === null || _f === void 0 ? void 0 : _f.icon]) || treeIcon;
        $icon = currentIcon ? (0, _vue.createVNode)("span", {
          "class": (0, _classNames2.default)("".concat(prefixCls, "-iconEle"), "".concat(prefixCls, "-icon__customize"))
        }, [typeof currentIcon === 'function' ? currentIcon(renderArgsData.value) : currentIcon]) : renderIcon();
      } else if (loadData && loading.value) {
        $icon = renderIcon();
      } // Title


      var titleNode;

      if (typeof title === 'function') {
        titleNode = title(renderArgsData.value); // } else if (contextSlots.titleRender) {
        //   titleNode = contextSlots.titleRender(renderArgsData.value);
      } else {
        titleNode = title;
      }

      titleNode = titleNode === undefined ? defaultTitle : titleNode;
      var $title = (0, _vue.createVNode)("span", {
        "class": "".concat(prefixCls, "-title")
      }, [titleNode]);
      return (0, _vue.createVNode)("span", {
        "ref": selectHandle,
        "title": typeof title === 'string' ? title : '',
        "class": (0, _classNames2.default)("".concat(wrapClass), "".concat(wrapClass, "-").concat(nodeState.value || 'normal'), !disabled && (selected.value || dragNodeHighlight.value) && "".concat(prefixCls, "-node-selected")),
        "onMouseenter": onMouseEnter,
        "onMouseleave": onMouseLeave,
        "onContextmenu": onContextmenu,
        "onClick": onSelectorClick,
        "onDblclick": onSelectorDoubleClick
      }, [$icon, $title, renderDropIndicator()]);
    };

    return function () {
      var _classNames;

      var _a = (0, _extends2.default)((0, _extends2.default)({}, props), attrs),
          eventKey = _a.eventKey,
          isLeaf = _a.isLeaf,
          isStart = _a.isStart,
          isEnd = _a.isEnd,
          domRef = _a.domRef,
          active = _a.active,
          data = _a.data,
          onMousemove = _a.onMousemove,
          selectable = _a.selectable,
          otherProps = __rest(_a, ["eventKey", "isLeaf", "isStart", "isEnd", "domRef", "active", "data", "onMousemove", "selectable"]);

      var _context$value6 = context.value,
          prefixCls = _context$value6.prefixCls,
          filterTreeNode = _context$value6.filterTreeNode,
          keyEntities = _context$value6.keyEntities,
          dropContainerKey = _context$value6.dropContainerKey,
          dropTargetKey = _context$value6.dropTargetKey,
          draggingNodeKey = _context$value6.draggingNodeKey;
      var disabled = isDisabled.value;
      var dataOrAriaAttributeProps = (0, _pickAttrs.default)(otherProps, {
        aria: true,
        data: true
      });

      var _ref4 = keyEntities[eventKey] || {},
          level = _ref4.level;

      var isEndNode = isEnd[isEnd.length - 1];
      var mergedDraggable = isDraggable();
      var draggableWithoutDisabled = !disabled && mergedDraggable;
      var dragging = draggingNodeKey === eventKey;
      var ariaSelected = selectable !== undefined ? {
        'aria-selected': !!selectable
      } : undefined; // console.log(1);

      return (0, _vue.createVNode)("div", (0, _objectSpread2.default)((0, _objectSpread2.default)({
        "ref": domRef,
        "class": (0, _classNames2.default)(attrs.class, "".concat(prefixCls, "-treenode"), (_classNames = {}, (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-treenode-disabled"), disabled), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-treenode-switcher-").concat(expanded.value ? 'open' : 'close'), !isLeaf), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-treenode-checkbox-checked"), checked.value), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-treenode-checkbox-indeterminate"), halfChecked.value), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-treenode-selected"), selected.value), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-treenode-loading"), loading.value), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-treenode-active"), active), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-treenode-leaf-last"), isEndNode), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-treenode-draggable"), draggableWithoutDisabled), (0, _defineProperty2.default)(_classNames, "dragging", dragging), (0, _defineProperty2.default)(_classNames, 'drop-target', dropTargetKey === eventKey), (0, _defineProperty2.default)(_classNames, 'drop-container', dropContainerKey === eventKey), (0, _defineProperty2.default)(_classNames, 'drag-over', !disabled && dragOver.value), (0, _defineProperty2.default)(_classNames, 'drag-over-gap-top', !disabled && dragOverGapTop.value), (0, _defineProperty2.default)(_classNames, 'drag-over-gap-bottom', !disabled && dragOverGapBottom.value), (0, _defineProperty2.default)(_classNames, 'filter-node', filterTreeNode && filterTreeNode(eventData.value)), _classNames)),
        "style": attrs.style,
        "draggable": draggableWithoutDisabled,
        "aria-grabbed": dragging,
        "onDragstart": draggableWithoutDisabled ? onDragStart : undefined,
        "onDragenter": mergedDraggable ? onDragEnter : undefined,
        "onDragover": mergedDraggable ? onDragOver : undefined,
        "onDragleave": mergedDraggable ? onDragLeave : undefined,
        "onDrop": mergedDraggable ? onDrop : undefined,
        "onDragend": mergedDraggable ? onDragEnd : undefined,
        "onMousemove": onMousemove
      }, ariaSelected), dataOrAriaAttributeProps), [(0, _vue.createVNode)(_Indent.default, {
        "prefixCls": prefixCls,
        "level": level,
        "isStart": isStart,
        "isEnd": isEnd
      }, null), renderDragHandler(), renderSwitcher(), renderCheckbox(), renderSelector()]);
    };
  }
});

exports.default = _default;