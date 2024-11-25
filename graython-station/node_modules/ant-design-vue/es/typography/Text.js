import _typeof from "@babel/runtime/helpers/esm/typeof";
import _extends from "@babel/runtime/helpers/esm/extends";
import { createVNode as _createVNode, resolveDirective as _resolveDirective } from "vue";
import omit from '../_util/omit';
import warning from '../_util/warning';
import Base, { baseProps } from './Base';
export var textProps = function textProps() {
  return _extends(_extends({}, omit(baseProps(), ['component'])), {
    ellipsis: {
      type: [Boolean, Object],
      default: undefined
    }
  });
};

var Text = function Text(props, _ref) {
  var slots = _ref.slots,
      attrs = _ref.attrs;
  var ellipsis = props.ellipsis;
  warning(_typeof(ellipsis) !== 'object' || !ellipsis || !('expandable' in ellipsis) && !('rows' in ellipsis), 'Typography.Text', '`ellipsis` do not support `expandable` or `rows` props.');

  var textProps = _extends(_extends(_extends({}, props), {
    ellipsis: ellipsis && _typeof(ellipsis) === 'object' ? omit(ellipsis, ['expandable', 'rows']) : ellipsis,
    component: 'span'
  }), attrs);

  return _createVNode(Base, textProps, slots);
};

Text.displayName = 'ATypographyText';
Text.inheritAttrs = false;
Text.props = textProps();
export default Text;