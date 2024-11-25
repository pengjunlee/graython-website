import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _extends from "@babel/runtime/helpers/esm/extends";
import { withDirectives as _withDirectives, vShow as _vShow, createVNode as _createVNode } from "vue";
import { computed, ref, defineComponent, nextTick } from 'vue';
import Transition, { getTransitionProps } from '../_util/transition';
import dialogPropTypes from './IDialogPropTypes';
import { offset } from './util';
var sentinelStyle = {
  width: 0,
  height: 0,
  overflow: 'hidden',
  outline: 'none'
};
export default defineComponent({
  name: 'Content',
  inheritAttrs: false,
  props: _extends(_extends({}, dialogPropTypes()), {
    motionName: String,
    ariaId: String,
    onVisibleChanged: Function,
    onMousedown: Function,
    onMouseup: Function
  }),
  setup: function setup(props, _ref) {
    var expose = _ref.expose,
        slots = _ref.slots,
        attrs = _ref.attrs;
    var sentinelStartRef = ref();
    var sentinelEndRef = ref();
    var dialogRef = ref();
    expose({
      focus: function focus() {
        var _a;

        (_a = sentinelStartRef.value) === null || _a === void 0 ? void 0 : _a.focus();
      },
      changeActive: function changeActive(next) {
        var _document = document,
            activeElement = _document.activeElement;

        if (next && activeElement === sentinelEndRef.value) {
          sentinelStartRef.value.focus();
        } else if (!next && activeElement === sentinelStartRef.value) {
          sentinelEndRef.value.focus();
        }
      }
    });
    var transformOrigin = ref();
    var contentStyleRef = computed(function () {
      var width = props.width,
          height = props.height;
      var contentStyle = {};

      if (width !== undefined) {
        contentStyle.width = typeof width === 'number' ? "".concat(width, "px") : width;
      }

      if (height !== undefined) {
        contentStyle.height = typeof height === 'number' ? "".concat(height, "px") : height;
      }

      if (transformOrigin.value) {
        contentStyle.transformOrigin = transformOrigin.value;
      }

      return contentStyle;
    });

    var onPrepare = function onPrepare() {
      nextTick(function () {
        if (dialogRef.value) {
          var elementOffset = offset(dialogRef.value);
          transformOrigin.value = props.mousePosition ? "".concat(props.mousePosition.x - elementOffset.left, "px ").concat(props.mousePosition.y - elementOffset.top, "px") : '';
        }
      });
    };

    var onVisibleChanged = function onVisibleChanged(visible) {
      props.onVisibleChanged(visible);
    };

    return function () {
      var _a, _b, _c, _d;

      var prefixCls = props.prefixCls,
          _props$footer = props.footer,
          footer = _props$footer === void 0 ? (_a = slots.footer) === null || _a === void 0 ? void 0 : _a.call(slots) : _props$footer,
          _props$title = props.title,
          title = _props$title === void 0 ? (_b = slots.title) === null || _b === void 0 ? void 0 : _b.call(slots) : _props$title,
          ariaId = props.ariaId,
          closable = props.closable,
          _props$closeIcon = props.closeIcon,
          closeIcon = _props$closeIcon === void 0 ? (_c = slots.closeIcon) === null || _c === void 0 ? void 0 : _c.call(slots) : _props$closeIcon,
          onClose = props.onClose,
          bodyStyle = props.bodyStyle,
          bodyProps = props.bodyProps,
          onMousedown = props.onMousedown,
          onMouseup = props.onMouseup,
          visible = props.visible,
          _props$modalRender = props.modalRender,
          modalRender = _props$modalRender === void 0 ? slots.modalRender : _props$modalRender,
          destroyOnClose = props.destroyOnClose,
          motionName = props.motionName;
      var footerNode;

      if (footer) {
        footerNode = _createVNode("div", {
          "class": "".concat(prefixCls, "-footer")
        }, [footer]);
      }

      var headerNode;

      if (title) {
        headerNode = _createVNode("div", {
          "class": "".concat(prefixCls, "-header")
        }, [_createVNode("div", {
          "class": "".concat(prefixCls, "-title"),
          "id": ariaId
        }, [title])]);
      }

      var closer;

      if (closable) {
        closer = _createVNode("button", {
          "type": "button",
          "onClick": onClose,
          "aria-label": "Close",
          "class": "".concat(prefixCls, "-close")
        }, [closeIcon || _createVNode("span", {
          "class": "".concat(prefixCls, "-close-x")
        }, null)]);
      }

      var content = _createVNode("div", {
        "class": "".concat(prefixCls, "-content")
      }, [closer, headerNode, _createVNode("div", _objectSpread({
        "class": "".concat(prefixCls, "-body"),
        "style": bodyStyle
      }, bodyProps), [(_d = slots.default) === null || _d === void 0 ? void 0 : _d.call(slots)]), footerNode]);

      var transitionProps = getTransitionProps(motionName);
      return _createVNode(Transition, _objectSpread(_objectSpread({}, transitionProps), {}, {
        "onBeforeEnter": onPrepare,
        "onAfterEnter": function onAfterEnter() {
          return onVisibleChanged(true);
        },
        "onAfterLeave": function onAfterLeave() {
          return onVisibleChanged(false);
        }
      }), {
        default: function _default() {
          return [visible || !destroyOnClose ? _withDirectives(_createVNode("div", _objectSpread(_objectSpread({}, attrs), {}, {
            "ref": dialogRef,
            "key": "dialog-element",
            "role": "document",
            "style": [contentStyleRef.value, attrs.style],
            "class": [prefixCls, attrs.class],
            "onMousedown": onMousedown,
            "onMouseup": onMouseup
          }), [_createVNode("div", {
            "tabindex": 0,
            "ref": sentinelStartRef,
            "style": sentinelStyle,
            "aria-hidden": "true"
          }, null), modalRender ? modalRender({
            originVNode: content
          }) : content, _createVNode("div", {
            "tabindex": 0,
            "ref": sentinelEndRef,
            "style": sentinelStyle,
            "aria-hidden": "true"
          }, null)]), [[_vShow, visible]]) : null];
        }
      });
    };
  }
});