import { createVNode as _createVNode } from "vue";
import Menu, { Item as MenuItem } from '../../menu';
import { onBeforeUnmount, defineComponent, inject, ref } from 'vue';
import MentionsContextKey from './MentionsContext';
import Spin from '../../spin';

function noop() {}

export default defineComponent({
  name: 'DropdownMenu',
  props: {
    prefixCls: String,
    options: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  slots: ['notFoundContent', 'option'],
  setup: function setup(props, _ref) {
    var slots = _ref.slots;

    var _inject = inject(MentionsContextKey, {
      activeIndex: ref(),
      loading: ref(false)
    }),
        activeIndex = _inject.activeIndex,
        setActiveIndex = _inject.setActiveIndex,
        selectOption = _inject.selectOption,
        _inject$onFocus = _inject.onFocus,
        onFocus = _inject$onFocus === void 0 ? noop : _inject$onFocus,
        loading = _inject.loading;

    var timeoutId;

    var onMousedown = function onMousedown(e) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(function () {
        onFocus(e);
      });
    };

    onBeforeUnmount(function () {
      clearTimeout(timeoutId);
    });
    return function () {
      var _a;

      var prefixCls = props.prefixCls,
          options = props.options;
      var activeOption = options[activeIndex.value] || {};
      return _createVNode(Menu, {
        "prefixCls": "".concat(prefixCls, "-menu"),
        "activeKey": activeOption.value,
        "onSelect": function onSelect(_ref2) {
          var key = _ref2.key;
          var option = options.find(function (_ref3) {
            var value = _ref3.value;
            return value === key;
          });
          selectOption(option);
        },
        "onMousedown": onMousedown
      }, {
        default: function _default() {
          return [!loading.value && options.map(function (option, index) {
            var _a, _b;

            var value = option.value,
                disabled = option.disabled,
                _option$label = option.label,
                label = _option$label === void 0 ? option.value : _option$label;
            return _createVNode(MenuItem, {
              "key": value,
              "disabled": disabled,
              "onMouseenter": function onMouseenter() {
                setActiveIndex(index);
              }
            }, {
              default: function _default() {
                return [(_b = (_a = slots.option) === null || _a === void 0 ? void 0 : _a.call(slots, option)) !== null && _b !== void 0 ? _b : typeof label === 'function' ? label({
                  value: value,
                  disabled: disabled
                }) : label];
              }
            });
          }), !loading.value && options.length === 0 ? _createVNode(MenuItem, {
            "key": "notFoundContent",
            "disabled": true
          }, {
            default: function _default() {
              return [(_a = slots.notFoundContent) === null || _a === void 0 ? void 0 : _a.call(slots)];
            }
          }) : null, loading.value && _createVNode(MenuItem, {
            "key": "loading",
            "disabled": true
          }, {
            default: function _default() {
              return [_createVNode(Spin, {
                "size": "small"
              }, null)];
            }
          })];
        }
      });
    };
  }
});