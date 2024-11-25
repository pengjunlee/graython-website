"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = require("vue");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _TreeNode = _interopRequireDefault(require("./TreeNode"));

var _contextTypes = require("./contextTypes");

var _props = require("./props");

var _collapseMotion = _interopRequireDefault(require("../_util/collapseMotion"));

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

var _default2 = (0, _vue.defineComponent)({
  name: 'MotionTreeNode',
  inheritAttrs: false,
  props: (0, _extends2.default)((0, _extends2.default)({}, _props.treeNodeProps), {
    active: Boolean,
    motion: Object,
    motionNodes: {
      type: Array
    },
    onMotionStart: Function,
    onMotionEnd: Function,
    motionType: String
  }),
  slots: ['title', 'icon', 'switcherIcon', 'checkable'],
  setup: function setup(props, _ref) {
    var attrs = _ref.attrs,
        slots = _ref.slots;
    var visible = (0, _vue.ref)(true);
    var context = (0, _contextTypes.useInjectTreeContext)();
    var motionedRef = (0, _vue.ref)(false);
    var transitionProps = (0, _vue.computed)(function () {
      if (props.motion) {
        return props.motion;
      } else {
        return (0, _collapseMotion.default)();
      }
    });

    var onMotionEnd = function onMotionEnd(node, type) {
      var _a, _b, _c, _d;

      if (type === 'appear') {
        (_b = (_a = transitionProps.value) === null || _a === void 0 ? void 0 : _a.onAfterEnter) === null || _b === void 0 ? void 0 : _b.call(_a, node);
      } else if (type === 'leave') {
        (_d = (_c = transitionProps.value) === null || _c === void 0 ? void 0 : _c.onAfterLeave) === null || _d === void 0 ? void 0 : _d.call(_c, node);
      }

      if (!motionedRef.value) {
        props.onMotionEnd();
      }

      motionedRef.value = true;
    };

    (0, _vue.watch)(function () {
      return props.motionNodes;
    }, function () {
      if (props.motionNodes && props.motionType === 'hide' && visible.value) {
        (0, _vue.nextTick)(function () {
          visible.value = false;
        });
      }
    }, {
      immediate: true,
      flush: 'post'
    });
    (0, _vue.onMounted)(function () {
      props.motionNodes && props.onMotionStart();
    });
    (0, _vue.onBeforeUnmount)(function () {
      props.motionNodes && onMotionEnd();
    });
    return function () {
      var motion = props.motion,
          motionNodes = props.motionNodes,
          motionType = props.motionType,
          active = props.active,
          eventKey = props.eventKey,
          otherProps = __rest(props, ["motion", "motionNodes", "motionType", "active", "eventKey"]);

      if (motionNodes) {
        return (0, _vue.createVNode)(_vue.Transition, (0, _objectSpread2.default)((0, _objectSpread2.default)({}, transitionProps.value), {}, {
          "appear": motionType === 'show',
          "onAfterAppear": function onAfterAppear(node) {
            return onMotionEnd(node, 'appear');
          },
          "onAfterLeave": function onAfterLeave(node) {
            return onMotionEnd(node, 'leave');
          }
        }), {
          default: function _default() {
            return [(0, _vue.withDirectives)((0, _vue.createVNode)("div", {
              "class": "".concat(context.value.prefixCls, "-treenode-motion")
            }, [motionNodes.map(function (treeNode) {
              var restProps = __rest(treeNode.data, []),
                  title = treeNode.title,
                  key = treeNode.key,
                  isStart = treeNode.isStart,
                  isEnd = treeNode.isEnd;

              delete restProps.children;
              return (0, _vue.createVNode)(_TreeNode.default, (0, _objectSpread2.default)((0, _objectSpread2.default)({}, restProps), {}, {
                "title": title,
                "active": active,
                "data": treeNode.data,
                "key": key,
                "eventKey": key,
                "isStart": isStart,
                "isEnd": isEnd
              }), slots);
            })]), [[_vue.vShow, visible.value]])];
          }
        });
      }

      return (0, _vue.createVNode)(_TreeNode.default, (0, _objectSpread2.default)((0, _objectSpread2.default)({
        "domRef": _vue.ref,
        "class": attrs.class,
        "style": attrs.style
      }, otherProps), {}, {
        "active": active,
        "eventKey": eventKey
      }), slots);
    };
  }
});

exports.default = _default2;