import _extends from "@babel/runtime/helpers/esm/extends";
import Table, { tableProps } from './Table';
import Column from './Column';
import ColumnGroup from './ColumnGroup';
import { defineComponent } from 'vue';
import { EXPAND_COLUMN, Summary, SummaryCell, SummaryRow } from '../vc-table';
import { SELECTION_ALL, SELECTION_INVERT, SELECTION_NONE, SELECTION_COLUMN } from './hooks/useSelection';
var TableSummaryRow = defineComponent(_extends(_extends({}, SummaryRow), {
  name: 'ATableSummaryRow'
}));
var TableSummaryCell = defineComponent(_extends(_extends({}, SummaryCell), {
  name: 'ATableSummaryCell'
}));

var TableSummary = _extends(Summary, {
  Cell: TableSummaryCell,
  Row: TableSummaryRow,
  name: 'ATableSummary'
});
/* istanbul ignore next */


export { tableProps, TableSummary, TableSummaryRow, TableSummaryCell, Column as TableColumn, ColumnGroup as TableColumnGroup };
export default _extends(Table, {
  SELECTION_ALL: SELECTION_ALL,
  SELECTION_INVERT: SELECTION_INVERT,
  SELECTION_NONE: SELECTION_NONE,
  SELECTION_COLUMN: SELECTION_COLUMN,
  EXPAND_COLUMN: EXPAND_COLUMN,
  Column: Column,
  ColumnGroup: ColumnGroup,
  Summary: TableSummary,
  install: function install(app) {
    app.component(TableSummary.name, TableSummary);
    app.component(TableSummaryCell.name, TableSummaryCell);
    app.component(TableSummaryRow.name, TableSummaryRow);
    app.component(Table.name, Table);
    app.component(Column.name, Column);
    app.component(ColumnGroup.name, ColumnGroup);
    return app;
  }
});