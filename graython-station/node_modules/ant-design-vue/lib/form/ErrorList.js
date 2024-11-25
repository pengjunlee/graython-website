"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = require("vue");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _context = require("./context");

var _transition = require("../_util/transition");

var _useConfigInject2 = _interopRequireDefault(require("../_util/hooks/useConfigInject"));

var _collapseMotion = _interopRequireDefault(require("../_util/collapseMotion"));

var _default2 = (0, _vue.defineComponent)({
  name: 'ErrorList',
  props: ['errors', 'help', 'onDomErrorVisibleChange', 'helpStatus', 'warnings'],
  setup: function setup(props) {
    var _useConfigInject = (0, _useConfigInject2.default)('', props),
        rootPrefixCls = _useConfigInject.prefixCls;

    var _useInjectFormItemPre = (0, _context.useInjectFormItemPrefix)(),
        prefixCls = _useInjectFormItemPre.prefixCls,
        status = _useInjectFormItemPre.status;

    var baseClassName = (0, _vue.computed)(function () {
      return "".concat(prefixCls.value, "-item-explain");
    });
    var visible = (0, _vue.computed)(function () {
      return !!(props.errors && props.errors.length);
    });
    var innerStatus = (0, _vue.ref)(status.value); // Memo status in same visible

    (0, _vue.watch)([visible, status], function () {
      if (visible.value) {
        innerStatus.value = status.value;
      }
    });
    return function () {
      var _a, _b;

      var colMItem = (0, _collapseMotion.default)("".concat(rootPrefixCls.value, "-show-help-item"));
      var transitionGroupProps = (0, _transition.getTransitionGroupProps)("".concat(rootPrefixCls.value, "-show-help-item"), colMItem);
      transitionGroupProps.class = baseClassName.value;
      return ((_a = props.errors) === null || _a === void 0 ? void 0 : _a.length) ? (0, _vue.createVNode)(_transition.TransitionGroup, (0, _objectSpread2.default)((0, _objectSpread2.default)({}, transitionGroupProps), {}, {
        "tag": "div"
      }), {
        default: function _default() {
          return [(_b = props.errors) === null || _b === void 0 ? void 0 : _b.map(function (error, index) {
            return (0, _vue.createVNode)("div", {
              "key": index,
              "role": "alert",
              "class": innerStatus.value ? "".concat(baseClassName.value, "-").concat(innerStatus.value) : ''
            }, [error]);
          })];
        }
      }) : null;
    };
  }
});

exports.default = _default2;