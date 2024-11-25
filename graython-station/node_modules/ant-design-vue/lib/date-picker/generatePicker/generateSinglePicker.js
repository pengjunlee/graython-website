"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateSinglePicker;

var _vue = require("vue");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _CalendarOutlined = _interopRequireDefault(require("@ant-design/icons-vue/lib/icons/CalendarOutlined"));

var _ClockCircleOutlined = _interopRequireDefault(require("@ant-design/icons-vue/lib/icons/ClockCircleOutlined"));

var _CloseCircleFilled = _interopRequireDefault(require("@ant-design/icons-vue/lib/icons/CloseCircleFilled"));

var _vcPicker = _interopRequireDefault(require("../../vc-picker"));

var _en_US = _interopRequireDefault(require("../locale/en_US"));

var _util = require("../util");

var _LocaleReceiver = require("../../locale-provider/LocaleReceiver");

var _ = require(".");

var _useConfigInject2 = _interopRequireDefault(require("../../_util/hooks/useConfigInject"));

var _classNames2 = _interopRequireDefault(require("../../_util/classNames"));

var _props2 = require("./props");

var _devWarning = _interopRequireDefault(require("../../vc-util/devWarning"));

var _FormItemContext = require("../../form/FormItemContext");

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

function generateSinglePicker(generateConfig, extraProps) {
  function getPicker(picker, displayName) {
    var comProps = (0, _extends2.default)((0, _extends2.default)((0, _extends2.default)({}, (0, _props2.commonProps)()), (0, _props2.datePickerProps)()), extraProps);
    return (0, _vue.defineComponent)({
      name: displayName,
      inheritAttrs: false,
      props: comProps,
      slots: ['suffixIcon', // 'clearIcon',
      'prevIcon', 'nextIcon', 'superPrevIcon', 'superNextIcon', // 'panelRender',
      'dateRender', 'renderExtraFooter', 'monthCellRender'],
      setup: function setup(_props, _ref) {
        var slots = _ref.slots,
            expose = _ref.expose,
            attrs = _ref.attrs,
            emit = _ref.emit;
        // 兼容 vue 3.2.7
        var props = _props;
        var formItemContext = (0, _FormItemContext.useInjectFormItemContext)();
        (0, _devWarning.default)(!(props.monthCellContentRender || slots.monthCellContentRender), 'DatePicker', '`monthCellContentRender` is deprecated. Please use `monthCellRender"` instead.');
        (0, _devWarning.default)(!attrs.getCalendarContainer, 'DatePicker', '`getCalendarContainer` is deprecated. Please use `getPopupContainer"` instead.');

        var _useConfigInject = (0, _useConfigInject2.default)('picker', props),
            prefixCls = _useConfigInject.prefixCls,
            direction = _useConfigInject.direction,
            getPopupContainer = _useConfigInject.getPopupContainer,
            size = _useConfigInject.size,
            rootPrefixCls = _useConfigInject.rootPrefixCls;

        var pickerRef = (0, _vue.ref)();
        expose({
          focus: function focus() {
            var _a;

            (_a = pickerRef.value) === null || _a === void 0 ? void 0 : _a.focus();
          },
          blur: function blur() {
            var _a;

            (_a = pickerRef.value) === null || _a === void 0 ? void 0 : _a.blur();
          }
        });

        var maybeToString = function maybeToString(date) {
          return props.valueFormat ? generateConfig.toString(date, props.valueFormat) : date;
        };

        var onChange = function onChange(date, dateString) {
          var value = maybeToString(date);
          emit('update:value', value);
          emit('change', value, dateString);
          formItemContext.onFieldChange();
        };

        var onOpenChange = function onOpenChange(open) {
          emit('update:open', open);
          emit('openChange', open);
        };

        var onFocus = function onFocus(e) {
          emit('focus', e);
        };

        var onBlur = function onBlur(e) {
          emit('blur', e);
          formItemContext.onFieldBlur();
        };

        var onPanelChange = function onPanelChange(date, mode) {
          var value = maybeToString(date);
          emit('panelChange', value, mode);
        };

        var onOk = function onOk(date) {
          var value = maybeToString(date);
          emit('ok', value);
        };

        var _useLocaleReceiver = (0, _LocaleReceiver.useLocaleReceiver)('DatePicker', _en_US.default),
            _useLocaleReceiver2 = (0, _slicedToArray2.default)(_useLocaleReceiver, 1),
            contextLocale = _useLocaleReceiver2[0];

        var value = (0, _vue.computed)(function () {
          if (props.value) {
            return props.valueFormat ? generateConfig.toDate(props.value, props.valueFormat) : props.value;
          }

          return props.value === '' ? undefined : props.value;
        });
        var defaultValue = (0, _vue.computed)(function () {
          if (props.defaultValue) {
            return props.valueFormat ? generateConfig.toDate(props.defaultValue, props.valueFormat) : props.defaultValue;
          }

          return props.defaultValue === '' ? undefined : props.defaultValue;
        });
        var defaultPickerValue = (0, _vue.computed)(function () {
          if (props.defaultPickerValue) {
            return props.valueFormat ? generateConfig.toDate(props.defaultPickerValue, props.valueFormat) : props.defaultPickerValue;
          }

          return props.defaultPickerValue === '' ? undefined : props.defaultPickerValue;
        });
        return function () {
          var _classNames;

          var _a, _b, _c, _d, _e, _f;

          var locale = (0, _extends2.default)((0, _extends2.default)({}, contextLocale.value), props.locale);
          var p = (0, _extends2.default)((0, _extends2.default)({}, props), attrs);

          var _p$bordered = p.bordered,
              bordered = _p$bordered === void 0 ? true : _p$bordered,
              placeholder = p.placeholder,
              _p$suffixIcon = p.suffixIcon,
              suffixIcon = _p$suffixIcon === void 0 ? (_a = slots.suffixIcon) === null || _a === void 0 ? void 0 : _a.call(slots) : _p$suffixIcon,
              _p$showToday = p.showToday,
              showToday = _p$showToday === void 0 ? true : _p$showToday,
              transitionName = p.transitionName,
              _p$allowClear = p.allowClear,
              allowClear = _p$allowClear === void 0 ? true : _p$allowClear,
              _p$dateRender = p.dateRender,
              dateRender = _p$dateRender === void 0 ? slots.dateRender : _p$dateRender,
              _p$renderExtraFooter = p.renderExtraFooter,
              renderExtraFooter = _p$renderExtraFooter === void 0 ? slots.renderExtraFooter : _p$renderExtraFooter,
              _p$monthCellRender = p.monthCellRender,
              monthCellRender = _p$monthCellRender === void 0 ? slots.monthCellRender || props.monthCellContentRender || slots.monthCellContentRender : _p$monthCellRender,
              _p$clearIcon = p.clearIcon,
              clearIcon = _p$clearIcon === void 0 ? (_b = slots.clearIcon) === null || _b === void 0 ? void 0 : _b.call(slots) : _p$clearIcon,
              _p$id = p.id,
              id = _p$id === void 0 ? formItemContext.id.value : _p$id,
              restProps = __rest(p, ["bordered", "placeholder", "suffixIcon", "showToday", "transitionName", "allowClear", "dateRender", "renderExtraFooter", "monthCellRender", "clearIcon", "id"]);

          var showTime = p.showTime === '' ? true : p.showTime;
          var format = p.format;
          var additionalOverrideProps = {};

          if (picker) {
            additionalOverrideProps.picker = picker;
          }

          var mergedPicker = picker || p.picker || 'date';
          additionalOverrideProps = (0, _extends2.default)((0, _extends2.default)((0, _extends2.default)({}, additionalOverrideProps), showTime ? (0, _.getTimeProps)((0, _extends2.default)({
            format: format,
            picker: mergedPicker
          }, (0, _typeof2.default)(showTime) === 'object' ? showTime : {})) : {}), mergedPicker === 'time' ? (0, _.getTimeProps)((0, _extends2.default)((0, _extends2.default)({
            format: format
          }, restProps), {
            picker: mergedPicker
          })) : {});
          var pre = prefixCls.value;
          return (0, _vue.createVNode)(_vcPicker.default, (0, _objectSpread2.default)((0, _objectSpread2.default)((0, _objectSpread2.default)({
            "monthCellRender": monthCellRender,
            "dateRender": dateRender,
            "renderExtraFooter": renderExtraFooter,
            "ref": pickerRef,
            "placeholder": (0, _util.getPlaceholder)(mergedPicker, locale, placeholder),
            "suffixIcon": suffixIcon || (mergedPicker === 'time' ? (0, _vue.createVNode)(_ClockCircleOutlined.default, null, null) : (0, _vue.createVNode)(_CalendarOutlined.default, null, null)),
            "clearIcon": clearIcon || (0, _vue.createVNode)(_CloseCircleFilled.default, null, null),
            "allowClear": allowClear,
            "transitionName": transitionName || "".concat(rootPrefixCls.value, "-slide-up")
          }, restProps), additionalOverrideProps), {}, {
            "id": id,
            "picker": mergedPicker,
            "value": value.value,
            "defaultValue": defaultValue.value,
            "defaultPickerValue": defaultPickerValue.value,
            "showToday": showToday,
            "locale": locale.lang,
            "class": (0, _classNames2.default)((_classNames = {}, (0, _defineProperty2.default)(_classNames, "".concat(pre, "-").concat(size.value), size.value), (0, _defineProperty2.default)(_classNames, "".concat(pre, "-borderless"), !bordered), _classNames), attrs.class),
            "prefixCls": pre,
            "getPopupContainer": attrs.getCalendarContainer || getPopupContainer.value,
            "generateConfig": generateConfig,
            "prevIcon": ((_c = slots.prevIcon) === null || _c === void 0 ? void 0 : _c.call(slots)) || (0, _vue.createVNode)("span", {
              "class": "".concat(pre, "-prev-icon")
            }, null),
            "nextIcon": ((_d = slots.nextIcon) === null || _d === void 0 ? void 0 : _d.call(slots)) || (0, _vue.createVNode)("span", {
              "class": "".concat(pre, "-next-icon")
            }, null),
            "superPrevIcon": ((_e = slots.superPrevIcon) === null || _e === void 0 ? void 0 : _e.call(slots)) || (0, _vue.createVNode)("span", {
              "class": "".concat(pre, "-super-prev-icon")
            }, null),
            "superNextIcon": ((_f = slots.superNextIcon) === null || _f === void 0 ? void 0 : _f.call(slots)) || (0, _vue.createVNode)("span", {
              "class": "".concat(pre, "-super-next-icon")
            }, null),
            "components": _.Components,
            "direction": direction.value,
            "onChange": onChange,
            "onOpenChange": onOpenChange,
            "onFocus": onFocus,
            "onBlur": onBlur,
            "onPanelChange": onPanelChange,
            "onOk": onOk
          }), null);
        };
      }
    });
  }

  var DatePicker = getPicker(undefined, 'ADatePicker');
  var WeekPicker = getPicker('week', 'AWeekPicker');
  var MonthPicker = getPicker('month', 'AMonthPicker');
  var YearPicker = getPicker('year', 'AYearPicker');
  var TimePicker = getPicker('time', 'TimePicker'); // 给独立组件 TimePicker 使用，此处名称不用更改

  var QuarterPicker = getPicker('quarter', 'AQuarterPicker');
  return {
    DatePicker: DatePicker,
    WeekPicker: WeekPicker,
    MonthPicker: MonthPicker,
    YearPicker: YearPicker,
    TimePicker: TimePicker,
    QuarterPicker: QuarterPicker
  };
}