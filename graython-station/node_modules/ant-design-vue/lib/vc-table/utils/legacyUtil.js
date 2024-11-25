"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.INTERNAL_COL_DEFINE = void 0;
exports.getDataAndAriaProps = getDataAndAriaProps;
exports.getExpandableProps = getExpandableProps;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _warning = require("../../vc-util/warning");

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

var INTERNAL_COL_DEFINE = 'RC_TABLE_INTERNAL_COL_DEFINE';
exports.INTERNAL_COL_DEFINE = INTERNAL_COL_DEFINE;

function getExpandableProps(props) {
  var expandable = props.expandable,
      legacyExpandableConfig = __rest(props, ["expandable"]);

  var config;

  if (props.expandable !== undefined) {
    config = (0, _extends2.default)((0, _extends2.default)({}, legacyExpandableConfig), expandable);
  } else {
    if (process.env.NODE_ENV !== 'production' && ['indentSize', 'expandedRowKeys', 'defaultExpandedRowKeys', 'defaultExpandAllRows', 'expandedRowRender', 'expandRowByClick', 'expandIcon', 'onExpand', 'onExpandedRowsChange', 'expandedRowClassName', 'expandIconColumnIndex', 'showExpandColumn'].some(function (prop) {
      return prop in props;
    })) {
      (0, _warning.warning)(false, 'expanded related props have been moved into `expandable`.');
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


function getDataAndAriaProps(props) {
  /* eslint-disable no-param-reassign */
  return Object.keys(props).reduce(function (memo, key) {
    if (key.substr(0, 5) === 'data-' || key.substr(0, 5) === 'aria-') {
      memo[key] = props[key];
    }

    return memo;
  }, {});
  /* eslint-enable */
}