import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _extends from "@babel/runtime/helpers/esm/extends";
import { resolveDirective as _resolveDirective, createVNode as _createVNode, Fragment as _Fragment } from "vue";
import LoadingOutlined from "@ant-design/icons-vue/es/icons/LoadingOutlined";
import CloseCircleFilled from "@ant-design/icons-vue/es/icons/CloseCircleFilled";
import CheckCircleFilled from "@ant-design/icons-vue/es/icons/CheckCircleFilled";
import ExclamationCircleFilled from "@ant-design/icons-vue/es/icons/ExclamationCircleFilled";
import Col from '../grid/Col';
import { useProvideForm, useInjectForm, useProvideFormItemPrefix } from './context';
import ErrorList from './ErrorList';
import classNames from '../_util/classNames';
import { computed, defineComponent } from 'vue';
var iconMap = {
  success: CheckCircleFilled,
  warning: ExclamationCircleFilled,
  error: CloseCircleFilled,
  validating: LoadingOutlined
};
var FormItemInput = defineComponent({
  slots: ['help', 'extra', 'errors'],
  inheritAttrs: false,
  props: ['prefixCls', 'errors', 'hasFeedback', 'onDomErrorVisibleChange', 'wrapperCol', 'help', 'extra', 'status'],
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var formContext = useInjectForm();
    var contextWrapperCol = formContext.wrapperCol; // Pass to sub FormItem should not with col info

    var subFormContext = _extends({}, formContext);

    delete subFormContext.labelCol;
    delete subFormContext.wrapperCol;
    useProvideForm(subFormContext);
    useProvideFormItemPrefix({
      prefixCls: computed(function () {
        return props.prefixCls;
      }),
      status: computed(function () {
        return props.status;
      })
    });
    return function () {
      var _a, _b, _c;

      var prefixCls = props.prefixCls,
          wrapperCol = props.wrapperCol,
          _props$help = props.help,
          help = _props$help === void 0 ? (_a = slots.help) === null || _a === void 0 ? void 0 : _a.call(slots) : _props$help,
          _props$errors = props.errors,
          errors = _props$errors === void 0 ? (_b = slots.errors) === null || _b === void 0 ? void 0 : _b.call(slots) : _props$errors,
          hasFeedback = props.hasFeedback,
          status = props.status,
          _props$extra = props.extra,
          extra = _props$extra === void 0 ? (_c = slots.extra) === null || _c === void 0 ? void 0 : _c.call(slots) : _props$extra;
      var baseClassName = "".concat(prefixCls, "-item");
      var mergedWrapperCol = wrapperCol || (contextWrapperCol === null || contextWrapperCol === void 0 ? void 0 : contextWrapperCol.value) || {};
      var className = classNames("".concat(baseClassName, "-control"), mergedWrapperCol.class); // Should provides additional icon if `hasFeedback`

      var IconNode = status && iconMap[status];
      return _createVNode(Col, _objectSpread(_objectSpread({}, mergedWrapperCol), {}, {
        "class": className
      }), {
        default: function _default() {
          var _a;

          return _createVNode(_Fragment, null, [_createVNode("div", {
            "class": "".concat(baseClassName, "-control-input")
          }, [_createVNode("div", {
            "class": "".concat(baseClassName, "-control-input-content")
          }, [(_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)]), hasFeedback && IconNode ? _createVNode("span", {
            "class": "".concat(baseClassName, "-children-icon")
          }, [_createVNode(IconNode, null, null)]) : null]), _createVNode(ErrorList, {
            "errors": errors,
            "help": help,
            "class": "".concat(baseClassName, "-explain-connected")
          }, null), extra ? _createVNode("div", {
            "class": "".concat(baseClassName, "-extra")
          }, [extra]) : null]);
        }
      });
    };
  }
});
export default FormItemInput;