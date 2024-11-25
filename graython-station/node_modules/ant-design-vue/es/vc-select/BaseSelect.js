import _typeof from "@babel/runtime/helpers/esm/typeof";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import { resolveDirective as _resolveDirective, createTextVNode as _createTextVNode, createVNode as _createVNode } from "vue";

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

import { getSeparatedContent } from './utils/valueUtil';
import SelectTrigger from './SelectTrigger';
import Selector from './Selector';
import useSelectTriggerControl from './hooks/useSelectTriggerControl';
import useDelayReset from './hooks/useDelayReset';
import TransBtn from './TransBtn';
import useLock from './hooks/useLock';
import { useProvideBaseSelectProps } from './hooks/useBaseProps';
import { computed, defineComponent, getCurrentInstance, onBeforeUnmount, onMounted, provide, ref, toRefs, watch, watchEffect } from 'vue';
import PropTypes from '../_util/vue-types';
import { initDefaultProps, isValidElement } from '../_util/props-util';
import isMobile from '../vc-util/isMobile';
import KeyCode from '../_util/KeyCode';
import { toReactive } from '../_util/toReactive';
import classNames from '../_util/classNames';
import createRef from '../_util/createRef';
import useInjectLegacySelectContext from '../vc-tree-select/LegacyContext';
import { cloneElement } from '../_util/vnode';
var DEFAULT_OMIT_PROPS = ['value', 'onChange', 'removeIcon', 'placeholder', 'autofocus', 'maxTagCount', 'maxTagTextLength', 'maxTagPlaceholder', 'choiceTransitionName', 'onInputKeyDown', 'onPopupScroll', 'tabindex', 'OptionList', 'notFoundContent'];

var baseSelectPrivateProps = function baseSelectPrivateProps() {
  return {
    prefixCls: String,
    id: String,
    omitDomProps: Array,
    // >>> Value
    displayValues: Array,
    onDisplayValuesChange: Function,
    // >>> Active

    /** Current dropdown list active item string value */
    activeValue: String,

    /** Link search input with target element */
    activeDescendantId: String,
    onActiveValueChange: Function,
    // >>> Search
    searchValue: String,

    /** Trigger onSearch, return false to prevent trigger open event */
    onSearch: Function,

    /** Trigger when search text match the `tokenSeparators`. Will provide split content */
    onSearchSplit: Function,
    maxLength: Number,
    OptionList: PropTypes.any,

    /** Tell if provided `options` is empty */
    emptyOptions: Boolean
  };
};

export var baseSelectPropsWithoutPrivate = function baseSelectPropsWithoutPrivate() {
  return {
    showSearch: {
      type: Boolean,
      default: undefined
    },
    tagRender: {
      type: Function
    },
    optionLabelRender: {
      type: Function
    },
    direction: {
      type: String
    },
    // MISC
    tabindex: Number,
    autofocus: Boolean,
    notFoundContent: PropTypes.any,
    placeholder: PropTypes.any,
    onClear: Function,
    choiceTransitionName: String,
    // >>> Mode
    mode: String,
    // >>> Status
    disabled: {
      type: Boolean,
      default: undefined
    },
    loading: {
      type: Boolean,
      default: undefined
    },
    // >>> Open
    open: {
      type: Boolean,
      default: undefined
    },
    defaultOpen: {
      type: Boolean,
      default: undefined
    },
    onDropdownVisibleChange: {
      type: Function
    },
    // >>> Customize Input

    /** @private Internal usage. Do not use in your production. */
    getInputElement: {
      type: Function
    },

    /** @private Internal usage. Do not use in your production. */
    getRawInputElement: {
      type: Function
    },
    // >>> Selector
    maxTagTextLength: Number,
    maxTagCount: {
      type: [String, Number]
    },
    maxTagPlaceholder: PropTypes.any,
    // >>> Search
    tokenSeparators: {
      type: Array
    },
    // >>> Icons
    allowClear: {
      type: Boolean,
      default: undefined
    },
    showArrow: {
      type: Boolean,
      default: undefined
    },
    inputIcon: PropTypes.any,

    /** Clear all icon */
    clearIcon: PropTypes.any,

    /** Selector remove icon */
    removeIcon: PropTypes.any,
    // >>> Dropdown
    animation: String,
    transitionName: String,
    dropdownStyle: {
      type: Object
    },
    dropdownClassName: String,
    dropdownMatchSelectWidth: {
      type: [Boolean, Number],
      default: undefined
    },
    dropdownRender: {
      type: Function
    },
    dropdownAlign: Object,
    placement: {
      type: String
    },
    getPopupContainer: {
      type: Function
    },
    // >>> Focus
    showAction: {
      type: Array
    },
    onBlur: {
      type: Function
    },
    onFocus: {
      type: Function
    },
    // >>> Rest Events
    onKeyup: Function,
    onKeydown: Function,
    onMousedown: Function,
    onPopupScroll: Function,
    onInputKeyDown: Function,
    onMouseenter: Function,
    onMouseleave: Function,
    onClick: Function
  };
};

var baseSelectProps = function baseSelectProps() {
  return _extends(_extends({}, baseSelectPrivateProps()), baseSelectPropsWithoutPrivate());
};

export function isMultiple(mode) {
  return mode === 'tags' || mode === 'multiple';
}
export default defineComponent({
  name: 'BaseSelect',
  inheritAttrs: false,
  props: initDefaultProps(baseSelectProps(), {
    showAction: [],
    notFoundContent: 'Not Found'
  }),
  setup: function setup(props, _ref) {
    var attrs = _ref.attrs,
        expose = _ref.expose,
        slots = _ref.slots;
    var multiple = computed(function () {
      return isMultiple(props.mode);
    });
    var mergedShowSearch = computed(function () {
      return props.showSearch !== undefined ? props.showSearch : multiple.value || props.mode === 'combobox';
    });
    var mobile = ref(false);
    onMounted(function () {
      mobile.value = isMobile();
    });
    var legacyTreeSelectContext = useInjectLegacySelectContext(); // ============================== Refs ==============================

    var containerRef = ref(null);
    var selectorDomRef = createRef();
    var triggerRef = ref(null);
    var selectorRef = ref(null);
    var listRef = ref(null);
    /** Used for component focused management */

    var _useDelayReset = useDelayReset(),
        _useDelayReset2 = _slicedToArray(_useDelayReset, 3),
        mockFocused = _useDelayReset2[0],
        setMockFocused = _useDelayReset2[1],
        cancelSetMockFocused = _useDelayReset2[2];

    var focus = function focus() {
      var _a;

      (_a = selectorRef.value) === null || _a === void 0 ? void 0 : _a.focus();
    };

    var blur = function blur() {
      var _a;

      (_a = selectorRef.value) === null || _a === void 0 ? void 0 : _a.blur();
    };

    expose({
      focus: focus,
      blur: blur,
      scrollTo: function scrollTo(arg) {
        var _a;

        return (_a = listRef.value) === null || _a === void 0 ? void 0 : _a.scrollTo(arg);
      }
    });
    var mergedSearchValue = computed(function () {
      var _a;

      if (props.mode !== 'combobox') {
        return props.searchValue;
      }

      var val = (_a = props.displayValues[0]) === null || _a === void 0 ? void 0 : _a.value;
      return typeof val === 'string' || typeof val === 'number' ? String(val) : '';
    }); // ============================== Open ==============================

    var initOpen = props.open !== undefined ? props.open : props.defaultOpen;
    var innerOpen = ref(initOpen);
    var mergedOpen = ref(initOpen);

    var setInnerOpen = function setInnerOpen(val) {
      innerOpen.value = props.open !== undefined ? props.open : val;
      mergedOpen.value = innerOpen.value;
    };

    watch(function () {
      return props.open;
    }, function () {
      setInnerOpen(props.open);
    }); // Not trigger `open` in `combobox` when `notFoundContent` is empty

    var emptyListContent = computed(function () {
      return !props.notFoundContent && props.emptyOptions;
    });
    watchEffect(function () {
      mergedOpen.value = innerOpen.value;

      if (props.disabled || emptyListContent.value && mergedOpen.value && props.mode === 'combobox') {
        mergedOpen.value = false;
      }
    });
    var triggerOpen = computed(function () {
      return emptyListContent.value ? false : mergedOpen.value;
    });

    var onToggleOpen = function onToggleOpen(newOpen) {
      var nextOpen = newOpen !== undefined ? newOpen : !mergedOpen.value;

      if (innerOpen.value !== nextOpen && !props.disabled) {
        setInnerOpen(nextOpen);

        if (props.onDropdownVisibleChange) {
          props.onDropdownVisibleChange(nextOpen);
        }
      }
    };

    var tokenWithEnter = computed(function () {
      return (props.tokenSeparators || []).some(function (tokenSeparator) {
        return ['\n', '\r\n'].includes(tokenSeparator);
      });
    });

    var onInternalSearch = function onInternalSearch(searchText, fromTyping, isCompositing) {
      var _a, _b;

      var ret = true;
      var newSearchText = searchText;
      (_a = props.onActiveValueChange) === null || _a === void 0 ? void 0 : _a.call(props, null); // Check if match the `tokenSeparators`

      var patchLabels = isCompositing ? null : getSeparatedContent(searchText, props.tokenSeparators); // Ignore combobox since it's not split-able

      if (props.mode !== 'combobox' && patchLabels) {
        newSearchText = '';
        (_b = props.onSearchSplit) === null || _b === void 0 ? void 0 : _b.call(props, patchLabels); // Should close when paste finish

        onToggleOpen(false); // Tell Selector that break next actions

        ret = false;
      }

      if (props.onSearch && mergedSearchValue.value !== newSearchText) {
        props.onSearch(newSearchText, {
          source: fromTyping ? 'typing' : 'effect'
        });
      }

      return ret;
    }; // Only triggered when menu is closed & mode is tags
    // If menu is open, OptionList will take charge
    // If mode isn't tags, press enter is not meaningful when you can't see any option


    var onInternalSearchSubmit = function onInternalSearchSubmit(searchText) {
      var _a; // prevent empty tags from appearing when you click the Enter button


      if (!searchText || !searchText.trim()) {
        return;
      }

      (_a = props.onSearch) === null || _a === void 0 ? void 0 : _a.call(props, searchText, {
        source: 'submit'
      });
    }; // Close will clean up single mode search text


    watch(mergedOpen, function () {
      if (!mergedOpen.value && !multiple.value && props.mode !== 'combobox') {
        onInternalSearch('', false, false);
      }
    }, {
      immediate: true,
      flush: 'post'
    }); // ============================ Disabled ============================
    // Close dropdown & remove focus state when disabled change

    watch(function () {
      return props.disabled;
    }, function () {
      if (innerOpen.value && !!props.disabled) {
        setInnerOpen(false);
      }
    }, {
      immediate: true
    }); // ============================ Keyboard ============================

    /**
     * We record input value here to check if can press to clean up by backspace
     * - null: Key is not down, this is reset by key up
     * - true: Search text is empty when first time backspace down
     * - false: Search text is not empty when first time backspace down
     */

    var _useLock = useLock(),
        _useLock2 = _slicedToArray(_useLock, 2),
        getClearLock = _useLock2[0],
        setClearLock = _useLock2[1]; // KeyDown


    var onInternalKeyDown = function onInternalKeyDown(event) {
      var _a2;

      var _a;

      var clearLock = getClearLock();
      var which = event.which;

      if (which === KeyCode.ENTER) {
        // Do not submit form when type in the input
        if (props.mode !== 'combobox') {
          event.preventDefault();
        } // We only manage open state here, close logic should handle by list component


        if (!mergedOpen.value) {
          onToggleOpen(true);
        }
      }

      setClearLock(!!mergedSearchValue.value); // Remove value by `backspace`

      if (which === KeyCode.BACKSPACE && !clearLock && multiple.value && !mergedSearchValue.value && props.displayValues.length) {
        var cloneDisplayValues = _toConsumableArray(props.displayValues);

        var removedDisplayValue = null;

        for (var i = cloneDisplayValues.length - 1; i >= 0; i -= 1) {
          var current = cloneDisplayValues[i];

          if (!current.disabled) {
            cloneDisplayValues.splice(i, 1);
            removedDisplayValue = current;
            break;
          }
        }

        if (removedDisplayValue) {
          props.onDisplayValuesChange(cloneDisplayValues, {
            type: 'remove',
            values: [removedDisplayValue]
          });
        }
      }

      for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        rest[_key - 1] = arguments[_key];
      }

      if (mergedOpen.value && listRef.value) {
        var _listRef$value;

        (_listRef$value = listRef.value).onKeydown.apply(_listRef$value, [event].concat(rest));
      }

      (_a = props.onKeydown) === null || _a === void 0 ? void 0 : (_a2 = _a).call.apply(_a2, [props, event].concat(rest));
    }; // KeyUp


    var onInternalKeyUp = function onInternalKeyUp(event) {
      for (var _len2 = arguments.length, rest = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        rest[_key2 - 1] = arguments[_key2];
      }

      if (mergedOpen.value && listRef.value) {
        var _listRef$value2;

        (_listRef$value2 = listRef.value).onKeyup.apply(_listRef$value2, [event].concat(rest));
      }

      if (props.onKeyup) {
        props.onKeyup.apply(props, [event].concat(rest));
      }
    }; // ============================ Selector ============================


    var onSelectorRemove = function onSelectorRemove(val) {
      var newValues = props.displayValues.filter(function (i) {
        return i !== val;
      });
      props.onDisplayValuesChange(newValues, {
        type: 'remove',
        values: [val]
      });
    }; // ========================== Focus / Blur ==========================

    /** Record real focus status */


    var focusRef = ref(false);

    var onContainerFocus = function onContainerFocus() {
      setMockFocused(true);

      if (!props.disabled) {
        if (props.onFocus && !focusRef.value) {
          props.onFocus.apply(props, arguments);
        } // `showAction` should handle `focus` if set


        if (props.showAction && props.showAction.includes('focus')) {
          onToggleOpen(true);
        }
      }

      focusRef.value = true;
    };

    var onContainerBlur = function onContainerBlur() {
      setMockFocused(false, function () {
        focusRef.value = false;
        onToggleOpen(false);
      });

      if (props.disabled) {
        return;
      }

      var searchVal = mergedSearchValue.value;

      if (searchVal) {
        // `tags` mode should move `searchValue` into values
        if (props.mode === 'tags') {
          props.onSearch(searchVal, {
            source: 'submit'
          });
        } else if (props.mode === 'multiple') {
          // `multiple` mode only clean the search value but not trigger event
          props.onSearch('', {
            source: 'blur'
          });
        }
      }

      if (props.onBlur) {
        props.onBlur.apply(props, arguments);
      }
    };

    provide('VCSelectContainerEvent', {
      focus: onContainerFocus,
      blur: onContainerBlur
    }); // Give focus back of Select

    var activeTimeoutIds = [];
    onMounted(function () {
      activeTimeoutIds.forEach(function (timeoutId) {
        return clearTimeout(timeoutId);
      });
      activeTimeoutIds.splice(0, activeTimeoutIds.length);
    });
    onBeforeUnmount(function () {
      activeTimeoutIds.forEach(function (timeoutId) {
        return clearTimeout(timeoutId);
      });
      activeTimeoutIds.splice(0, activeTimeoutIds.length);
    });

    var onInternalMouseDown = function onInternalMouseDown(event) {
      var _b2;

      var _a, _b;

      var target = event.target;
      var popupElement = (_a = triggerRef.value) === null || _a === void 0 ? void 0 : _a.getPopupElement(); // We should give focus back to selector if clicked item is not focusable

      if (popupElement && popupElement.contains(target)) {
        var timeoutId = setTimeout(function () {
          var _a;

          var index = activeTimeoutIds.indexOf(timeoutId);

          if (index !== -1) {
            activeTimeoutIds.splice(index, 1);
          }

          cancelSetMockFocused();

          if (!mobile.value && !popupElement.contains(document.activeElement)) {
            (_a = selectorRef.value) === null || _a === void 0 ? void 0 : _a.focus();
          }
        });
        activeTimeoutIds.push(timeoutId);
      }

      for (var _len3 = arguments.length, restArgs = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        restArgs[_key3 - 1] = arguments[_key3];
      }

      (_b = props.onMousedown) === null || _b === void 0 ? void 0 : (_b2 = _b).call.apply(_b2, [props, event].concat(restArgs));
    }; // ============================= Dropdown ==============================


    var containerWidth = ref(null);
    var instance = getCurrentInstance();

    var onPopupMouseEnter = function onPopupMouseEnter() {
      // We need force update here since popup dom is render async
      instance.update();
    };

    onMounted(function () {
      watch(triggerOpen, function () {
        var _a;

        if (triggerOpen.value) {
          var newWidth = Math.ceil((_a = containerRef.value) === null || _a === void 0 ? void 0 : _a.offsetWidth);

          if (containerWidth.value !== newWidth && !Number.isNaN(newWidth)) {
            containerWidth.value = newWidth;
          }
        }
      }, {
        immediate: true,
        flush: 'post'
      });
    }); // Close when click on non-select element

    useSelectTriggerControl([containerRef, triggerRef], triggerOpen, onToggleOpen);
    useProvideBaseSelectProps(toReactive(_extends(_extends({}, toRefs(props)), {
      open: mergedOpen,
      triggerOpen: triggerOpen,
      showSearch: mergedShowSearch,
      multiple: multiple,
      toggleOpen: onToggleOpen
    })));
    return function () {
      var _classNames2;

      var _a = _extends(_extends({}, props), attrs),
          prefixCls = _a.prefixCls,
          id = _a.id,
          open = _a.open,
          defaultOpen = _a.defaultOpen,
          mode = _a.mode,
          showSearch = _a.showSearch,
          searchValue = _a.searchValue,
          onSearch = _a.onSearch,
          allowClear = _a.allowClear,
          clearIcon = _a.clearIcon,
          showArrow = _a.showArrow,
          inputIcon = _a.inputIcon,
          disabled = _a.disabled,
          loading = _a.loading,
          getInputElement = _a.getInputElement,
          getPopupContainer = _a.getPopupContainer,
          placement = _a.placement,
          animation = _a.animation,
          transitionName = _a.transitionName,
          dropdownStyle = _a.dropdownStyle,
          dropdownClassName = _a.dropdownClassName,
          dropdownMatchSelectWidth = _a.dropdownMatchSelectWidth,
          dropdownRender = _a.dropdownRender,
          dropdownAlign = _a.dropdownAlign,
          showAction = _a.showAction,
          direction = _a.direction,
          tokenSeparators = _a.tokenSeparators,
          tagRender = _a.tagRender,
          optionLabelRender = _a.optionLabelRender,
          onPopupScroll = _a.onPopupScroll,
          onDropdownVisibleChange = _a.onDropdownVisibleChange,
          onFocus = _a.onFocus,
          onBlur = _a.onBlur,
          onKeyup = _a.onKeyup,
          onKeydown = _a.onKeydown,
          onMousedown = _a.onMousedown,
          onClear = _a.onClear,
          omitDomProps = _a.omitDomProps,
          getRawInputElement = _a.getRawInputElement,
          displayValues = _a.displayValues,
          onDisplayValuesChange = _a.onDisplayValuesChange,
          emptyOptions = _a.emptyOptions,
          activeDescendantId = _a.activeDescendantId,
          activeValue = _a.activeValue,
          OptionList = _a.OptionList,
          restProps = __rest(_a, ["prefixCls", "id", "open", "defaultOpen", "mode", "showSearch", "searchValue", "onSearch", "allowClear", "clearIcon", "showArrow", "inputIcon", "disabled", "loading", "getInputElement", "getPopupContainer", "placement", "animation", "transitionName", "dropdownStyle", "dropdownClassName", "dropdownMatchSelectWidth", "dropdownRender", "dropdownAlign", "showAction", "direction", "tokenSeparators", "tagRender", "optionLabelRender", "onPopupScroll", "onDropdownVisibleChange", "onFocus", "onBlur", "onKeyup", "onKeydown", "onMousedown", "onClear", "omitDomProps", "getRawInputElement", "displayValues", "onDisplayValuesChange", "emptyOptions", "activeDescendantId", "activeValue", "OptionList"]); // ============================= Input ==============================
      // Only works in `combobox`


      var customizeInputElement = mode === 'combobox' && getInputElement && getInputElement() || null; // Used for customize replacement for `vc-cascader`

      var customizeRawInputElement = typeof getRawInputElement === 'function' && getRawInputElement();

      var domProps = _extends({}, restProps); // Used for raw custom input trigger


      var onTriggerVisibleChange;

      if (customizeRawInputElement) {
        onTriggerVisibleChange = function onTriggerVisibleChange(newOpen) {
          onToggleOpen(newOpen);
        };
      }

      DEFAULT_OMIT_PROPS.forEach(function (propName) {
        delete domProps[propName];
      });
      omitDomProps === null || omitDomProps === void 0 ? void 0 : omitDomProps.forEach(function (propName) {
        delete domProps[propName];
      }); // ============================= Arrow ==============================

      var mergedShowArrow = showArrow !== undefined ? showArrow : loading || !multiple.value && mode !== 'combobox';
      var arrowNode;

      if (mergedShowArrow) {
        arrowNode = _createVNode(TransBtn, {
          "class": classNames("".concat(prefixCls, "-arrow"), _defineProperty({}, "".concat(prefixCls, "-arrow-loading"), loading)),
          "customizeIcon": inputIcon,
          "customizeIconProps": {
            loading: loading,
            searchValue: mergedSearchValue.value,
            open: mergedOpen.value,
            focused: mockFocused.value,
            showSearch: mergedShowSearch.value
          }
        }, null);
      } // ============================= Clear ==============================


      var clearNode;

      var onClearMouseDown = function onClearMouseDown() {
        onClear === null || onClear === void 0 ? void 0 : onClear();
        onDisplayValuesChange([], {
          type: 'clear',
          values: displayValues
        });
        onInternalSearch('', false, false);
      };

      if (!disabled && allowClear && (displayValues.length || mergedSearchValue.value)) {
        clearNode = _createVNode(TransBtn, {
          "class": "".concat(prefixCls, "-clear"),
          "onMousedown": onClearMouseDown,
          "customizeIcon": clearIcon
        }, {
          default: function _default() {
            return [_createTextVNode("\xD7")];
          }
        });
      } // =========================== OptionList ===========================


      var optionList = _createVNode(OptionList, {
        "ref": listRef
      }, _extends(_extends({}, legacyTreeSelectContext.customSlots), {
        option: slots.option
      })); // ============================= Select =============================


      var mergedClassName = classNames(prefixCls, attrs.class, (_classNames2 = {}, _defineProperty(_classNames2, "".concat(prefixCls, "-focused"), mockFocused.value), _defineProperty(_classNames2, "".concat(prefixCls, "-multiple"), multiple.value), _defineProperty(_classNames2, "".concat(prefixCls, "-single"), !multiple.value), _defineProperty(_classNames2, "".concat(prefixCls, "-allow-clear"), allowClear), _defineProperty(_classNames2, "".concat(prefixCls, "-show-arrow"), mergedShowArrow), _defineProperty(_classNames2, "".concat(prefixCls, "-disabled"), disabled), _defineProperty(_classNames2, "".concat(prefixCls, "-loading"), loading), _defineProperty(_classNames2, "".concat(prefixCls, "-open"), mergedOpen.value), _defineProperty(_classNames2, "".concat(prefixCls, "-customize-input"), customizeInputElement), _defineProperty(_classNames2, "".concat(prefixCls, "-show-search"), mergedShowSearch.value), _classNames2)); // >>> Selector

      var selectorNode = _createVNode(SelectTrigger, {
        "ref": triggerRef,
        "disabled": disabled,
        "prefixCls": prefixCls,
        "visible": triggerOpen.value,
        "popupElement": optionList,
        "containerWidth": containerWidth.value,
        "animation": animation,
        "transitionName": transitionName,
        "dropdownStyle": dropdownStyle,
        "dropdownClassName": dropdownClassName,
        "direction": direction,
        "dropdownMatchSelectWidth": dropdownMatchSelectWidth,
        "dropdownRender": dropdownRender,
        "dropdownAlign": dropdownAlign,
        "placement": placement,
        "getPopupContainer": getPopupContainer,
        "empty": emptyOptions,
        "getTriggerDOMNode": function getTriggerDOMNode() {
          return selectorDomRef.current;
        },
        "onPopupVisibleChange": onTriggerVisibleChange,
        "onPopupMouseEnter": onPopupMouseEnter
      }, {
        default: function _default() {
          return customizeRawInputElement ? isValidElement(customizeRawInputElement) && cloneElement(customizeRawInputElement, {
            ref: selectorDomRef
          }, false, true) : _createVNode(Selector, _objectSpread(_objectSpread({}, props), {}, {
            "domRef": selectorDomRef,
            "prefixCls": prefixCls,
            "inputElement": customizeInputElement,
            "ref": selectorRef,
            "id": id,
            "showSearch": mergedShowSearch.value,
            "mode": mode,
            "activeDescendantId": activeDescendantId,
            "tagRender": tagRender,
            "optionLabelRender": optionLabelRender,
            "values": displayValues,
            "open": mergedOpen.value,
            "onToggleOpen": onToggleOpen,
            "activeValue": activeValue,
            "searchValue": mergedSearchValue.value,
            "onSearch": onInternalSearch,
            "onSearchSubmit": onInternalSearchSubmit,
            "onRemove": onSelectorRemove,
            "tokenWithEnter": tokenWithEnter.value
          }), null);
        }
      }); // >>> Render


      var renderNode; // Render raw

      if (customizeRawInputElement) {
        renderNode = selectorNode;
      } else {
        renderNode = _createVNode("div", _objectSpread(_objectSpread({}, domProps), {}, {
          "class": mergedClassName,
          "ref": containerRef,
          "onMousedown": onInternalMouseDown,
          "onKeydown": onInternalKeyDown,
          "onKeyup": onInternalKeyUp
        }), [mockFocused.value && !mergedOpen.value && _createVNode("span", {
          "style": {
            width: 0,
            height: 0,
            display: 'flex',
            overflow: 'hidden',
            opacity: 0
          },
          "aria-live": "polite"
        }, ["".concat(displayValues.map(function (_ref2) {
          var label = _ref2.label,
              value = _ref2.value;
          return ['number', 'string'].includes(_typeof(label)) ? label : value;
        }).join(', '))]), selectorNode, arrowNode, clearNode]);
      }

      return renderNode;
    };
  }
});