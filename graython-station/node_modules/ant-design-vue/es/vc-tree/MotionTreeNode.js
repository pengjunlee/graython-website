import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _extends from "@babel/runtime/helpers/esm/extends";
import { withDirectives as _withDirectives, vShow as _vShow, createVNode as _createVNode, resolveDirective as _resolveDirective } from "vue";

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

import TreeNode from './TreeNode';
import { useInjectTreeContext } from './contextTypes';
import { computed, nextTick, defineComponent, onBeforeUnmount, onMounted, ref, Transition, watch } from 'vue';
import { treeNodeProps } from './props';
import collapseMotion from '../_util/collapseMotion';
export default defineComponent({
  name: 'MotionTreeNode',
  inheritAttrs: false,
  props: _extends(_extends({}, treeNodeProps), {
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
    var visible = ref(true);
    var context = useInjectTreeContext();
    var motionedRef = ref(false);
    var transitionProps = computed(function () {
      if (props.motion) {
        return props.motion;
      } else {
        return collapseMotion();
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

    watch(function () {
      return props.motionNodes;
    }, function () {
      if (props.motionNodes && props.motionType === 'hide' && visible.value) {
        nextTick(function () {
          visible.value = false;
        });
      }
    }, {
      immediate: true,
      flush: 'post'
    });
    onMounted(function () {
      props.motionNodes && props.onMotionStart();
    });
    onBeforeUnmount(function () {
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
        return _createVNode(Transition, _objectSpread(_objectSpread({}, transitionProps.value), {}, {
          "appear": motionType === 'show',
          "onAfterAppear": function onAfterAppear(node) {
            return onMotionEnd(node, 'appear');
          },
          "onAfterLeave": function onAfterLeave(node) {
            return onMotionEnd(node, 'leave');
          }
        }), {
          default: function _default() {
            return [_withDirectives(_createVNode("div", {
              "class": "".concat(context.value.prefixCls, "-treenode-motion")
            }, [motionNodes.map(function (treeNode) {
              var restProps = __rest(treeNode.data, []),
                  title = treeNode.title,
                  key = treeNode.key,
                  isStart = treeNode.isStart,
                  isEnd = treeNode.isEnd;

              delete restProps.children;
              return _createVNode(TreeNode, _objectSpread(_objectSpread({}, restProps), {}, {
                "title": title,
                "active": active,
                "data": treeNode.data,
                "key": key,
                "eventKey": key,
                "isStart": isStart,
                "isEnd": isEnd
              }), slots);
            })]), [[_vShow, visible.value]])];
          }
        });
      }

      return _createVNode(TreeNode, _objectSpread(_objectSpread({
        "domRef": ref,
        "class": attrs.class,
        "style": attrs.style
      }, otherProps), {}, {
        "active": active,
        "eventKey": eventKey
      }), slots);
    };
  }
});