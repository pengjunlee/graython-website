"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof3 = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.autoCompleteProps = exports.AutoCompleteOption = exports.AutoCompleteOptGroup = void 0;

var _vue = require("vue");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _select = _interopRequireWildcard(require("../select"));

var _propsUtil = require("../_util/props-util");

var _warning = _interopRequireDefault(require("../_util/warning"));

var _Option = _interopRequireDefault(require("./Option"));

var _OptGroup = _interopRequireDefault(require("./OptGroup"));

var _omit = _interopRequireDefault(require("../_util/omit"));

var _useConfigInject2 = _interopRequireDefault(require("../_util/hooks/useConfigInject"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof3(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function isSelectOptionOrSelectOptGroup(child) {
  var _a, _b;

  return ((_a = child === null || child === void 0 ? void 0 : child.type) === null || _a === void 0 ? void 0 : _a.isSelectOption) || ((_b = child === null || child === void 0 ? void 0 : child.type) === null || _b === void 0 ? void 0 : _b.isSelectOptGroup);
}

var autoCompleteProps = function autoCompleteProps() {
  return (0, _extends2.default)((0, _extends2.default)({}, (0, _omit.default)((0, _select.selectProps)(), ['loading', 'mode', 'optionLabelProp', 'labelInValue'])), {
    dataSource: Array,
    dropdownMenuStyle: {
      type: Object,
      default: undefined
    },
    // optionLabelProp: String,
    dropdownMatchSelectWidth: {
      type: [Number, Boolean],
      default: true
    },
    prefixCls: String,
    showSearch: {
      type: Boolean,
      default: undefined
    },
    transitionName: String,
    choiceTransitionName: {
      type: String,
      default: 'zoom'
    },
    autofocus: {
      type: Boolean,
      default: undefined
    },
    backfill: {
      type: Boolean,
      default: undefined
    },
    // optionLabelProp: PropTypes.string.def('children'),
    filterOption: {
      type: [Boolean, Function],
      default: false
    },
    defaultActiveFirstOption: {
      type: Boolean,
      default: true
    }
  });
};

exports.autoCompleteProps = autoCompleteProps;
var AutoCompleteOption = _Option.default;
exports.AutoCompleteOption = AutoCompleteOption;
var AutoCompleteOptGroup = _OptGroup.default;
exports.AutoCompleteOptGroup = AutoCompleteOptGroup;
var AutoComplete = (0, _vue.defineComponent)({
  name: 'AAutoComplete',
  inheritAttrs: false,
  props: autoCompleteProps(),
  // emits: ['change', 'select', 'focus', 'blur'],
  slots: ['option'],
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        attrs = _ref.attrs,
        expose = _ref.expose;
    (0, _warning.default)(!('dataSource' in slots), 'AutoComplete', '`dataSource` slot is deprecated, please use props `options` instead.');
    (0, _warning.default)(!('options' in slots), 'AutoComplete', '`options` slot is deprecated, please use props `options` instead.');
    var selectRef = (0, _vue.ref)();

    var getInputElement = function getInputElement() {
      var _a;

      var children = (0, _propsUtil.flattenChildren)((_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots));
      var element = children.length ? children[0] : undefined;
      return element;
    };

    var focus = function focus() {
      var _a;

      (_a = selectRef.value) === null || _a === void 0 ? void 0 : _a.focus();
    };

    var blur = function blur() {
      var _a;

      (_a = selectRef.value) === null || _a === void 0 ? void 0 : _a.blur();
    };

    expose({
      focus: focus,
      blur: blur
    });

    var _useConfigInject = (0, _useConfigInject2.default)('select', props),
        prefixCls = _useConfigInject.prefixCls;

    return function () {
      var _cls;

      var _a, _b, _c;

      var size = props.size,
          dataSource = props.dataSource,
          _props$notFoundConten = props.notFoundContent,
          notFoundContent = _props$notFoundConten === void 0 ? (_a = slots.notFoundContent) === null || _a === void 0 ? void 0 : _a.call(slots) : _props$notFoundConten;
      var optionChildren;
      var className = attrs.class;
      var cls = (_cls = {}, (0, _defineProperty2.default)(_cls, className, !!className), (0, _defineProperty2.default)(_cls, "".concat(prefixCls.value, "-lg"), size === 'large'), (0, _defineProperty2.default)(_cls, "".concat(prefixCls.value, "-sm"), size === 'small'), (0, _defineProperty2.default)(_cls, "".concat(prefixCls.value, "-show-search"), true), (0, _defineProperty2.default)(_cls, "".concat(prefixCls.value, "-auto-complete"), true), _cls);

      if (props.options === undefined) {
        var childArray = ((_b = slots.dataSource) === null || _b === void 0 ? void 0 : _b.call(slots)) || ((_c = slots.options) === null || _c === void 0 ? void 0 : _c.call(slots)) || [];

        if (childArray.length && isSelectOptionOrSelectOptGroup(childArray[0])) {
          optionChildren = childArray;
        } else {
          optionChildren = dataSource ? dataSource.map(function (item) {
            if ((0, _propsUtil.isValidElement)(item)) {
              return item;
            }

            switch ((0, _typeof2.default)(item)) {
              case 'string':
                return (0, _vue.createVNode)(_Option.default, {
                  "key": item,
                  "value": item
                }, {
                  default: function _default() {
                    return [item];
                  }
                });

              case 'object':
                return (0, _vue.createVNode)(_Option.default, {
                  "key": item.value,
                  "value": item.value
                }, {
                  default: function _default() {
                    return [item.text];
                  }
                });

              default:
                throw new Error('AutoComplete[dataSource] only supports type `string[] | Object[]`.');
            }
          }) : [];
        }
      }

      var selectProps = (0, _omit.default)((0, _extends2.default)((0, _extends2.default)((0, _extends2.default)({}, props), attrs), {
        mode: _select.default.SECRET_COMBOBOX_MODE_DO_NOT_USE,
        // optionLabelProp,
        getInputElement: getInputElement,
        notFoundContent: notFoundContent,
        // placeholder: '',
        class: cls,
        ref: selectRef
      }), ['dataSource', 'loading']);
      return (0, _vue.createVNode)(_select.default, selectProps, (0, _objectSpread2.default)({
        default: function _default() {
          return [optionChildren];
        }
      }, (0, _omit.default)(slots, ['default', 'dataSource', 'options'])));
    };
  }
});
/* istanbul ignore next */

var _default2 = (0, _extends2.default)(AutoComplete, {
  Option: _Option.default,
  OptGroup: _OptGroup.default,
  install: function install(app) {
    app.component(AutoComplete.name, AutoComplete);
    app.component(_Option.default.displayName, _Option.default);
    app.component(_OptGroup.default.displayName, _OptGroup.default);
    return app;
  }
});

exports.default = _default2;