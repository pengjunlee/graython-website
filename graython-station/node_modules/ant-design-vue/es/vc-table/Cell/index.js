import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _typeof from "@babel/runtime/helpers/esm/typeof";
import { createVNode as _createVNode } from "vue";

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

import classNames from '../../_util/classNames';
import { filterEmpty, flattenChildren, isValidElement, parseStyleText } from '../../_util/props-util';
import { Text, computed, defineComponent, isVNode, renderSlot } from 'vue';
import { getPathValue, validateValue } from '../utils/valueUtil';
import { useInjectSlots } from '../../table/context';
import { INTERNAL_COL_DEFINE } from '../utils/legacyUtil';
import { useInjectHover } from '../context/HoverContext';
import { useInjectSticky } from '../context/StickyContext';
import { warning } from '../../vc-util/warning';
import eagerComputed from '../../_util/eagerComputed';
/** Check if cell is in hover range */

function inHoverRange(cellStartRow, cellRowSpan, startRow, endRow) {
  var cellEndRow = cellStartRow + cellRowSpan - 1;
  return cellStartRow <= endRow && cellEndRow >= startRow;
}

function isRenderCell(data) {
  return data && _typeof(data) === 'object' && !Array.isArray(data) && !isVNode(data);
}

export default defineComponent({
  name: 'Cell',
  props: ['prefixCls', 'record', 'index', 'renderIndex', 'dataIndex', 'customRender', 'component', 'colSpan', 'rowSpan', 'fixLeft', 'fixRight', 'firstFixLeft', 'lastFixLeft', 'firstFixRight', 'lastFixRight', 'appendNode', 'additionalProps', 'ellipsis', 'align', 'rowType', 'isSticky', 'column', 'cellType', 'transformCellText'],
  slots: ['appendNode'],
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var contextSlots = useInjectSlots();

    var _useInjectHover = useInjectHover(),
        onHover = _useInjectHover.onHover,
        startRow = _useInjectHover.startRow,
        endRow = _useInjectHover.endRow;

    var colSpan = computed(function () {
      var _a, _b, _c, _d;

      return (_c = (_a = props.colSpan) !== null && _a !== void 0 ? _a : (_b = props.additionalProps) === null || _b === void 0 ? void 0 : _b.colSpan) !== null && _c !== void 0 ? _c : (_d = props.additionalProps) === null || _d === void 0 ? void 0 : _d.colspan;
    });
    var rowSpan = computed(function () {
      var _a, _b, _c, _d;

      return (_c = (_a = props.rowSpan) !== null && _a !== void 0 ? _a : (_b = props.additionalProps) === null || _b === void 0 ? void 0 : _b.rowSpan) !== null && _c !== void 0 ? _c : (_d = props.additionalProps) === null || _d === void 0 ? void 0 : _d.rowspan;
    });
    var hovering = eagerComputed(function () {
      var index = props.index;
      return inHoverRange(index, rowSpan.value || 1, startRow.value, endRow.value);
    });
    var supportSticky = useInjectSticky(); // ====================== Hover =======================

    var _onMouseenter = function onMouseenter(event, mergedRowSpan) {
      var _a;

      var record = props.record,
          index = props.index,
          additionalProps = props.additionalProps;

      if (record) {
        onHover(index, index + mergedRowSpan - 1);
      }

      (_a = additionalProps === null || additionalProps === void 0 ? void 0 : additionalProps.onMouseenter) === null || _a === void 0 ? void 0 : _a.call(additionalProps, event);
    };

    var onMouseleave = function onMouseleave(event) {
      var _a;

      var record = props.record,
          additionalProps = props.additionalProps;

      if (record) {
        onHover(-1, -1);
      }

      (_a = additionalProps === null || additionalProps === void 0 ? void 0 : additionalProps.onMouseleave) === null || _a === void 0 ? void 0 : _a.call(additionalProps, event);
    };

    var getTitle = function getTitle(vnodes) {
      var vnode = filterEmpty(vnodes)[0];

      if (isVNode(vnode)) {
        if (vnode.type === Text) {
          return vnode.children;
        } else {
          return Array.isArray(vnode.children) ? getTitle(vnode.children) : undefined;
        }
      } else {
        return vnode;
      }
    };

    return function () {
      var _classNames;

      var _a, _b, _c, _d, _e, _f;

      var prefixCls = props.prefixCls,
          record = props.record,
          index = props.index,
          renderIndex = props.renderIndex,
          dataIndex = props.dataIndex,
          customRender = props.customRender,
          _props$component = props.component,
          Component = _props$component === void 0 ? 'td' : _props$component,
          fixLeft = props.fixLeft,
          fixRight = props.fixRight,
          firstFixLeft = props.firstFixLeft,
          lastFixLeft = props.lastFixLeft,
          firstFixRight = props.firstFixRight,
          lastFixRight = props.lastFixRight,
          _props$appendNode = props.appendNode,
          appendNode = _props$appendNode === void 0 ? (_a = slots.appendNode) === null || _a === void 0 ? void 0 : _a.call(slots) : _props$appendNode,
          _props$additionalProp = props.additionalProps,
          additionalProps = _props$additionalProp === void 0 ? {} : _props$additionalProp,
          ellipsis = props.ellipsis,
          align = props.align,
          rowType = props.rowType,
          isSticky = props.isSticky,
          _props$column = props.column,
          column = _props$column === void 0 ? {} : _props$column,
          cellType = props.cellType;
      var cellPrefixCls = "".concat(prefixCls, "-cell"); // ==================== Child Node ====================

      var cellProps;
      var childNode;
      var children = (_b = slots.default) === null || _b === void 0 ? void 0 : _b.call(slots);

      if (validateValue(children) || cellType === 'header') {
        childNode = children;
      } else {
        var value = getPathValue(record, dataIndex); // Customize render node

        childNode = value;

        if (customRender) {
          var renderData = customRender({
            text: value,
            value: value,
            record: record,
            index: index,
            renderIndex: renderIndex,
            column: column.__originColumn__
          });

          if (isRenderCell(renderData)) {
            if (process.env.NODE_ENV !== 'production') {
              warning(false, '`columns.customRender` return cell props is deprecated with perf issue, please use `customCell` instead.');
            }

            childNode = renderData.children;
            cellProps = renderData.props;
          } else {
            childNode = renderData;
          }
        }

        if (!(INTERNAL_COL_DEFINE in column) && cellType === 'body' && contextSlots.value.bodyCell && !((_c = column.slots) === null || _c === void 0 ? void 0 : _c.customRender)) {
          var child = renderSlot(contextSlots.value, 'bodyCell', {
            text: value,
            value: value,
            record: record,
            index: index,
            column: column.__originColumn__
          }, function () {
            var fallback = childNode === undefined ? value : childNode;
            return [_typeof(fallback) === 'object' && isValidElement(fallback) || _typeof(fallback) !== 'object' ? fallback : null];
          });
          childNode = flattenChildren(child);
        }
        /** maybe we should @deprecated */


        if (props.transformCellText) {
          childNode = props.transformCellText({
            text: childNode,
            record: record,
            index: index,
            column: column.__originColumn__
          });
        }
      } // Not crash if final `childNode` is not validate VueNode


      if (_typeof(childNode) === 'object' && !Array.isArray(childNode) && !isVNode(childNode)) {
        childNode = null;
      }

      if (ellipsis && (lastFixLeft || firstFixRight)) {
        var _childNode = function () {
          return childNode;
        }();

        childNode = _createVNode("span", {
          "class": "".concat(cellPrefixCls, "-content")
        }, [childNode]);
      }

      if (Array.isArray(childNode) && childNode.length === 1) {
        childNode = childNode[0];
      }

      var _g = cellProps || {},
          cellColSpan = _g.colSpan,
          cellRowSpan = _g.rowSpan,
          cellStyle = _g.style,
          cellClassName = _g.class,
          restCellProps = __rest(_g, ["colSpan", "rowSpan", "style", "class"]);

      var mergedColSpan = (_d = cellColSpan !== undefined ? cellColSpan : colSpan.value) !== null && _d !== void 0 ? _d : 1;
      var mergedRowSpan = (_e = cellRowSpan !== undefined ? cellRowSpan : rowSpan.value) !== null && _e !== void 0 ? _e : 1;

      if (mergedColSpan === 0 || mergedRowSpan === 0) {
        return null;
      } // ====================== Fixed =======================


      var fixedStyle = {};
      var isFixLeft = typeof fixLeft === 'number' && supportSticky.value;
      var isFixRight = typeof fixRight === 'number' && supportSticky.value;

      if (isFixLeft) {
        fixedStyle.position = 'sticky';
        fixedStyle.left = "".concat(fixLeft, "px");
      }

      if (isFixRight) {
        fixedStyle.position = 'sticky';
        fixedStyle.right = "".concat(fixRight, "px");
      } // ====================== Align =======================


      var alignStyle = {};

      if (align) {
        alignStyle.textAlign = align;
      } // ====================== Render ======================


      var title;
      var ellipsisConfig = ellipsis === true ? {
        showTitle: true
      } : ellipsis;

      if (ellipsisConfig && (ellipsisConfig.showTitle || rowType === 'header')) {
        if (typeof childNode === 'string' || typeof childNode === 'number') {
          title = childNode.toString();
        } else if (isVNode(childNode)) {
          title = getTitle([childNode]);
        }
      }

      var componentProps = _extends(_extends(_extends({
        title: title
      }, restCellProps), additionalProps), {
        colSpan: mergedColSpan !== 1 ? mergedColSpan : null,
        rowSpan: mergedRowSpan !== 1 ? mergedRowSpan : null,
        class: classNames(cellPrefixCls, (_classNames = {}, _defineProperty(_classNames, "".concat(cellPrefixCls, "-fix-left"), isFixLeft && supportSticky.value), _defineProperty(_classNames, "".concat(cellPrefixCls, "-fix-left-first"), firstFixLeft && supportSticky.value), _defineProperty(_classNames, "".concat(cellPrefixCls, "-fix-left-last"), lastFixLeft && supportSticky.value), _defineProperty(_classNames, "".concat(cellPrefixCls, "-fix-right"), isFixRight && supportSticky.value), _defineProperty(_classNames, "".concat(cellPrefixCls, "-fix-right-first"), firstFixRight && supportSticky.value), _defineProperty(_classNames, "".concat(cellPrefixCls, "-fix-right-last"), lastFixRight && supportSticky.value), _defineProperty(_classNames, "".concat(cellPrefixCls, "-ellipsis"), ellipsis), _defineProperty(_classNames, "".concat(cellPrefixCls, "-with-append"), appendNode), _defineProperty(_classNames, "".concat(cellPrefixCls, "-fix-sticky"), (isFixLeft || isFixRight) && isSticky && supportSticky.value), _defineProperty(_classNames, "".concat(cellPrefixCls, "-row-hover"), !cellProps && hovering.value), _classNames), additionalProps.class, cellClassName),
        onMouseenter: function onMouseenter(e) {
          _onMouseenter(e, mergedRowSpan);
        },
        onMouseleave: onMouseleave,
        style: _extends(_extends(_extends(_extends({}, parseStyleText(additionalProps.style)), alignStyle), fixedStyle), cellStyle)
      });

      return _createVNode(Component, componentProps, {
        default: function _default() {
          return [appendNode, childNode, (_f = slots.dragHandle) === null || _f === void 0 ? void 0 : _f.call(slots)];
        }
      });
    };
  }
});