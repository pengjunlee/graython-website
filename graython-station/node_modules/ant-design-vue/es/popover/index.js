import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _extends from "@babel/runtime/helpers/esm/extends";
import { resolveDirective as _resolveDirective, createVNode as _createVNode, Fragment as _Fragment } from "vue";
import { computed, defineComponent, ref } from 'vue';
import Tooltip from '../tooltip';
import abstractTooltipProps from '../tooltip/abstractTooltipProps';
import PropTypes from '../_util/vue-types';
import { filterEmpty, initDefaultProps } from '../_util/props-util';
import { withInstall } from '../_util/type';
import useConfigInject from '../_util/hooks/useConfigInject';
import omit from '../_util/omit';
import { getTransitionName } from '../_util/transition';
import { tooltipDefaultProps } from '../tooltip/Tooltip';
export var popoverProps = function popoverProps() {
  return _extends(_extends({}, abstractTooltipProps()), {
    content: PropTypes.any,
    title: PropTypes.any
  });
};
var Popover = defineComponent({
  name: 'APopover',
  props: initDefaultProps(popoverProps(), _extends(_extends({}, tooltipDefaultProps()), {
    trigger: 'hover',
    transitionName: 'zoom-big',
    placement: 'top',
    mouseEnterDelay: 0.1,
    mouseLeaveDelay: 0.1
  })),
  setup: function setup(props, _ref) {
    var expose = _ref.expose,
        slots = _ref.slots;
    var tooltipRef = ref();
    expose({
      getPopupDomNode: function getPopupDomNode() {
        var _a, _b;

        return (_b = (_a = tooltipRef.value) === null || _a === void 0 ? void 0 : _a.getPopupDomNode) === null || _b === void 0 ? void 0 : _b.call(_a);
      }
    });

    var _useConfigInject = useConfigInject('popover', props),
        prefixCls = _useConfigInject.prefixCls,
        configProvider = _useConfigInject.configProvider;

    var rootPrefixCls = computed(function () {
      return configProvider.getPrefixCls();
    });

    var getOverlay = function getOverlay() {
      var _a, _b;

      var _props$title = props.title,
          title = _props$title === void 0 ? filterEmpty((_a = slots.title) === null || _a === void 0 ? void 0 : _a.call(slots)) : _props$title,
          _props$content = props.content,
          content = _props$content === void 0 ? filterEmpty((_b = slots.content) === null || _b === void 0 ? void 0 : _b.call(slots)) : _props$content;
      var hasTitle = !!(Array.isArray(title) ? title.length : title);
      var hasContent = !!(Array.isArray(content) ? content.length : title);
      if (!hasTitle && !hasContent) return undefined;
      return _createVNode(_Fragment, null, [hasTitle && _createVNode("div", {
        "class": "".concat(prefixCls.value, "-title")
      }, [title]), _createVNode("div", {
        "class": "".concat(prefixCls.value, "-inner-content")
      }, [content])]);
    };

    return function () {
      return _createVNode(Tooltip, _objectSpread(_objectSpread({}, omit(props, ['title', 'content'])), {}, {
        "prefixCls": prefixCls.value,
        "ref": tooltipRef,
        "transitionName": getTransitionName(rootPrefixCls.value, 'zoom-big', props.transitionName)
      }), {
        title: getOverlay,
        default: slots.default
      });
    };
  }
});
export default withInstall(Popover);