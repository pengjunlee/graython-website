import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import { resolveDirective as _resolveDirective, createVNode as _createVNode } from "vue";
import { watchEffect, ref, defineComponent, computed } from 'vue';
import classNames from '../_util/classNames';
import VcTree from '../vc-tree';
import PropTypes from '../_util/vue-types';
import { filterEmpty } from '../_util/props-util';
import initDefaultProps from '../_util/props-util/initDefaultProps';
import { treeProps as vcTreeProps } from '../vc-tree/props';
import useConfigInject from '../_util/hooks/useConfigInject';
import renderSwitcherIcon from './utils/iconUtil';
import dropIndicatorRender from './utils/dropIndicator';
import devWarning from '../vc-util/devWarning';
import { warning } from '../vc-util/warning';
import omit from '../_util/omit';
export var treeProps = function treeProps() {
  var baseTreeProps = vcTreeProps();
  return _extends(_extends({}, baseTreeProps), {
    showLine: {
      type: [Boolean, Object],
      default: undefined
    },

    /** 是否支持多选 */
    multiple: {
      type: Boolean,
      default: undefined
    },

    /** 是否自动展开父节点 */
    autoExpandParent: {
      type: Boolean,
      default: undefined
    },

    /** checkable状态下节点选择完全受控（父子节点选中状态不再关联）*/
    checkStrictly: {
      type: Boolean,
      default: undefined
    },

    /** 是否支持选中 */
    checkable: {
      type: Boolean,
      default: undefined
    },

    /** 是否禁用树 */
    disabled: {
      type: Boolean,
      default: undefined
    },

    /** 默认展开所有树节点 */
    defaultExpandAll: {
      type: Boolean,
      default: undefined
    },

    /** 默认展开对应树节点 */
    defaultExpandParent: {
      type: Boolean,
      default: undefined
    },

    /** 默认展开指定的树节点 */
    defaultExpandedKeys: {
      type: Array
    },

    /** （受控）展开指定的树节点 */
    expandedKeys: {
      type: Array
    },

    /** （受控）选中复选框的树节点 */
    checkedKeys: {
      type: [Array, Object]
    },

    /** 默认选中复选框的树节点 */
    defaultCheckedKeys: {
      type: Array
    },

    /** （受控）设置选中的树节点 */
    selectedKeys: {
      type: Array
    },

    /** 默认选中的树节点 */
    defaultSelectedKeys: {
      type: Array
    },
    selectable: {
      type: Boolean,
      default: undefined
    },
    loadedKeys: {
      type: Array
    },
    draggable: {
      type: Boolean,
      default: undefined
    },
    showIcon: {
      type: Boolean,
      default: undefined
    },
    icon: {
      type: Function
    },
    switcherIcon: PropTypes.any,
    prefixCls: String,

    /**
     * @default{title,key,children}
     * deprecated, please use `fieldNames` instead
     * 替换treeNode中 title,key,children字段为treeData中对应的字段
     */
    replaceFields: {
      type: Object
    },
    blockNode: {
      type: Boolean,
      default: undefined
    },
    openAnimation: PropTypes.any,
    onDoubleclick: baseTreeProps.onDblclick,
    'onUpdate:selectedKeys': Function,
    'onUpdate:checkedKeys': Function,
    'onUpdate:expandedKeys': Function
  });
};
export default defineComponent({
  name: 'ATree',
  inheritAttrs: false,
  props: initDefaultProps(treeProps(), {
    checkable: false,
    selectable: true,
    showIcon: false,
    blockNode: false
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
  // ],
  setup: function setup(props, _ref) {
    var attrs = _ref.attrs,
        expose = _ref.expose,
        emit = _ref.emit,
        slots = _ref.slots;
    warning(!(props.treeData === undefined && slots.default), '`children` of Tree is deprecated. Please use `treeData` instead.');

    var _useConfigInject = useConfigInject('tree', props),
        prefixCls = _useConfigInject.prefixCls,
        direction = _useConfigInject.direction,
        virtual = _useConfigInject.virtual;

    var treeRef = ref();

    var scrollTo = function scrollTo(scroll) {
      var _a;

      (_a = treeRef.value) === null || _a === void 0 ? void 0 : _a.scrollTo(scroll);
    };

    expose({
      treeRef: treeRef,
      onNodeExpand: function onNodeExpand() {
        var _a2;

        var _a;

        (_a = treeRef.value) === null || _a === void 0 ? void 0 : (_a2 = _a).onNodeExpand.apply(_a2, arguments);
      },
      scrollTo: scrollTo,
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
    watchEffect(function () {
      devWarning(props.replaceFields === undefined, 'Tree', '`replaceFields` is deprecated, please use fieldNames instead');
    });

    var handleCheck = function handleCheck(checkedObjOrKeys, eventObj) {
      emit('update:checkedKeys', checkedObjOrKeys);
      emit('check', checkedObjOrKeys, eventObj);
    };

    var handleExpand = function handleExpand(expandedKeys, eventObj) {
      emit('update:expandedKeys', expandedKeys);
      emit('expand', expandedKeys, eventObj);
    };

    var handleSelect = function handleSelect(selectedKeys, eventObj) {
      emit('update:selectedKeys', selectedKeys);
      emit('select', selectedKeys, eventObj);
    };

    return function () {
      var _classNames;

      var showIcon = props.showIcon,
          showLine = props.showLine,
          _props$switcherIcon = props.switcherIcon,
          _switcherIcon = _props$switcherIcon === void 0 ? slots.switcherIcon : _props$switcherIcon,
          _props$icon = props.icon,
          icon = _props$icon === void 0 ? slots.icon : _props$icon,
          blockNode = props.blockNode,
          checkable = props.checkable,
          selectable = props.selectable,
          _props$fieldNames = props.fieldNames,
          fieldNames = _props$fieldNames === void 0 ? props.replaceFields : _props$fieldNames,
          _props$motion = props.motion,
          motion = _props$motion === void 0 ? props.openAnimation : _props$motion,
          _props$itemHeight = props.itemHeight,
          itemHeight = _props$itemHeight === void 0 ? 28 : _props$itemHeight,
          onDoubleclick = props.onDoubleclick,
          onDblclick = props.onDblclick;

      var newProps = _extends(_extends(_extends({}, attrs), omit(props, ['onUpdate:checkedKeys', 'onUpdate:expandedKeys', 'onUpdate:selectedKeys', 'onDoubleclick'])), {
        showLine: Boolean(showLine),
        dropIndicatorRender: dropIndicatorRender,
        fieldNames: fieldNames,
        icon: icon,
        itemHeight: itemHeight
      });

      var children = slots.default ? filterEmpty(slots.default()) : undefined;
      return _createVNode(VcTree, _objectSpread(_objectSpread({}, newProps), {}, {
        "virtual": virtual.value,
        "motion": motion,
        "ref": treeRef,
        "prefixCls": prefixCls.value,
        "class": classNames((_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls.value, "-icon-hide"), !showIcon), _defineProperty(_classNames, "".concat(prefixCls.value, "-block-node"), blockNode), _defineProperty(_classNames, "".concat(prefixCls.value, "-unselectable"), !selectable), _defineProperty(_classNames, "".concat(prefixCls.value, "-rtl"), direction.value === 'rtl'), _classNames), attrs.class),
        "direction": direction.value,
        "checkable": checkable,
        "selectable": selectable,
        "switcherIcon": function switcherIcon(nodeProps) {
          return renderSwitcherIcon(prefixCls.value, _switcherIcon, showLine, nodeProps);
        },
        "onCheck": handleCheck,
        "onExpand": handleExpand,
        "onSelect": handleSelect,
        "onDblclick": onDblclick || onDoubleclick,
        "children": children
      }), _extends(_extends({}, slots), {
        checkable: function checkable() {
          return _createVNode("span", {
            "class": "".concat(prefixCls.value, "-checkbox-inner")
          }, null);
        }
      }));
    };
  }
});