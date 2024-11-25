import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { createVNode as _createVNode } from "vue";
import { defineComponent, computed, ref } from 'vue';
import KeyCode from '../../../_util/KeyCode';
import classNames from '../../../_util/classNames';
export default defineComponent({
  name: 'TabNode',
  props: {
    id: {
      type: String
    },
    prefixCls: {
      type: String
    },
    tab: {
      type: Object
    },
    active: {
      type: Boolean
    },
    closable: {
      type: Boolean
    },
    editable: {
      type: Object
    },
    onClick: {
      type: Function
    },
    onResize: {
      type: Function
    },
    renderWrapper: {
      type: Function
    },
    removeAriaLabel: {
      type: String
    },
    // onRemove: { type: Function as PropType<() => void> },
    onFocus: {
      type: Function
    }
  },
  emits: ['click', 'resize', 'remove', 'focus'],
  setup: function setup(props, _ref) {
    var expose = _ref.expose,
        attrs = _ref.attrs;
    var domRef = ref();

    function onInternalClick(e) {
      var _a;

      if ((_a = props.tab) === null || _a === void 0 ? void 0 : _a.disabled) {
        return;
      }

      props.onClick(e);
    }

    expose({
      domRef: domRef
    }); // onBeforeUnmount(() => {
    //   props.onRemove();
    // });

    function onRemoveTab(event) {
      var _a;

      event.preventDefault();
      event.stopPropagation();
      props.editable.onEdit('remove', {
        key: (_a = props.tab) === null || _a === void 0 ? void 0 : _a.key,
        event: event
      });
    }

    var removable = computed(function () {
      var _a;

      return props.editable && props.closable !== false && !((_a = props.tab) === null || _a === void 0 ? void 0 : _a.disabled);
    });
    return function () {
      var _classNames;

      var _a;

      var prefixCls = props.prefixCls,
          id = props.id,
          active = props.active,
          _props$tab = props.tab,
          key = _props$tab.key,
          tab = _props$tab.tab,
          disabled = _props$tab.disabled,
          closeIcon = _props$tab.closeIcon,
          renderWrapper = props.renderWrapper,
          removeAriaLabel = props.removeAriaLabel,
          editable = props.editable,
          onFocus = props.onFocus;
      var tabPrefix = "".concat(prefixCls, "-tab");

      var node = _createVNode("div", {
        "key": key,
        "ref": domRef,
        "class": classNames(tabPrefix, (_classNames = {}, _defineProperty(_classNames, "".concat(tabPrefix, "-with-remove"), removable.value), _defineProperty(_classNames, "".concat(tabPrefix, "-active"), active), _defineProperty(_classNames, "".concat(tabPrefix, "-disabled"), disabled), _classNames)),
        "style": attrs.style,
        "onClick": onInternalClick
      }, [_createVNode("div", {
        "role": "tab",
        "aria-selected": active,
        "id": id && "".concat(id, "-tab-").concat(key),
        "class": "".concat(tabPrefix, "-btn"),
        "aria-controls": id && "".concat(id, "-panel-").concat(key),
        "aria-disabled": disabled,
        "tabindex": disabled ? null : 0,
        "onClick": function onClick(e) {
          e.stopPropagation();
          onInternalClick(e);
        },
        "onKeydown": function onKeydown(e) {
          if ([KeyCode.SPACE, KeyCode.ENTER].includes(e.which)) {
            e.preventDefault();
            onInternalClick(e);
          }
        },
        "onFocus": onFocus
      }, [typeof tab === 'function' ? tab() : tab]), removable.value && _createVNode("button", {
        "type": "button",
        "aria-label": removeAriaLabel || 'remove',
        "tabindex": 0,
        "class": "".concat(tabPrefix, "-remove"),
        "onClick": function onClick(e) {
          e.stopPropagation();
          onRemoveTab(e);
        }
      }, [(closeIcon === null || closeIcon === void 0 ? void 0 : closeIcon()) || ((_a = editable.removeIcon) === null || _a === void 0 ? void 0 : _a.call(editable)) || '×'])]);

      return renderWrapper ? renderWrapper(node) : node;
    };
  }
});