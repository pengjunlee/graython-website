import _extends from "@babel/runtime/helpers/esm/extends";

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

import { warning } from '../../vc-util/warning';
export var INTERNAL_COL_DEFINE = 'RC_TABLE_INTERNAL_COL_DEFINE';
export function getExpandableProps(props) {
  var expandable = props.expandable,
      legacyExpandableConfig = __rest(props, ["expandable"]);

  var config;

  if (props.expandable !== undefined) {
    config = _extends(_extends({}, legacyExpandableConfig), expandable);
  } else {
    if (process.env.NODE_ENV !== 'production' && ['indentSize', 'expandedRowKeys', 'defaultExpandedRowKeys', 'defaultExpandAllRows', 'expandedRowRender', 'expandRowByClick', 'expandIcon', 'onExpand', 'onExpandedRowsChange', 'expandedRowClassName', 'expandIconColumnIndex', 'showExpandColumn'].some(function (prop) {
      return prop in props;
    })) {
      warning(false, 'expanded related props have been moved into `expandable`.');
    }

    config = legacyExpandableConfig;
  }

  if (config.showExpandColumn === false) {
    config.expandIconColumnIndex = -1;
  }

  return config;
}
/**
 * Returns only data- and aria- key/value pairs
 * @param {object} props
 */

export function getDataAndAriaProps(props) {
  /* eslint-disable no-param-reassign */
  return Object.keys(props).reduce(function (memo, key) {
    if (key.substr(0, 5) === 'data-' || key.substr(0, 5) === 'aria-') {
      memo[key] = props[key];
    }

    return memo;
  }, {});
  /* eslint-enable */
}