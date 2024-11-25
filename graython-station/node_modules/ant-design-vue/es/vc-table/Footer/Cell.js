import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import { createVNode as _createVNode } from "vue";
import { defineComponent } from 'vue';
import Cell from '../Cell';
import { useInjectSummary } from '../context/SummaryContext';
import { useInjectTable } from '../context/TableContext';
import { getCellFixedInfo } from '../utils/fixUtil';
export default defineComponent({
  name: 'SummaryCell',
  props: ['index', 'colSpan', 'rowSpan', 'align'],
  setup: function setup(props, _ref) {
    var attrs = _ref.attrs,
        slots = _ref.slots;
    var tableContext = useInjectTable();
    var summaryContext = useInjectSummary();
    return function () {
      var index = props.index,
          _props$colSpan = props.colSpan,
          colSpan = _props$colSpan === void 0 ? 1 : _props$colSpan,
          rowSpan = props.rowSpan,
          align = props.align;
      var prefixCls = tableContext.prefixCls,
          direction = tableContext.direction;
      var scrollColumnIndex = summaryContext.scrollColumnIndex,
          stickyOffsets = summaryContext.stickyOffsets,
          flattenColumns = summaryContext.flattenColumns;
      var lastIndex = index + colSpan - 1;
      var mergedColSpan = lastIndex + 1 === scrollColumnIndex ? colSpan + 1 : colSpan;
      var fixedInfo = getCellFixedInfo(index, index + mergedColSpan - 1, flattenColumns, stickyOffsets, direction);
      return _createVNode(Cell, _objectSpread({
        "class": attrs.class,
        "index": index,
        "component": "td",
        "prefixCls": prefixCls,
        "record": null,
        "dataIndex": null,
        "align": align,
        "colSpan": mergedColSpan,
        "rowSpan": rowSpan,
        "customRender": function customRender() {
          var _a;

          return (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots);
        }
      }, fixedInfo), null);
    };
  }
});