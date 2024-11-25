import { createVNode as _createVNode } from "vue";
import Summary from './Summary';
import SummaryRow from './Row';
import SummaryCell from './Cell';
import { computed, defineComponent, reactive, toRef } from 'vue';
import { useProvideSummary } from '../context/SummaryContext';
import { useInjectTable } from '../context/TableContext';
export default defineComponent({
  name: 'Footer',
  inheritAttrs: false,
  props: ['stickyOffsets', 'flattenColumns'],
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var tableContext = useInjectTable();
    useProvideSummary(reactive({
      stickyOffsets: toRef(props, 'stickyOffsets'),
      flattenColumns: toRef(props, 'flattenColumns'),
      scrollColumnIndex: computed(function () {
        var lastColumnIndex = props.flattenColumns.length - 1;
        var scrollColumn = props.flattenColumns[lastColumnIndex];
        return (scrollColumn === null || scrollColumn === void 0 ? void 0 : scrollColumn.scrollbar) ? lastColumnIndex : null;
      })
    }));
    return function () {
      var _a;

      var prefixCls = tableContext.prefixCls;
      return _createVNode("tfoot", {
        "class": "".concat(prefixCls, "-summary")
      }, [(_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)]);
    };
  }
});
export { SummaryRow, SummaryCell };
export var FooterComponents = Summary;