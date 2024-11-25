import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import { createVNode as _createVNode } from "vue";

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

import { getTransitionGroupProps } from '../_util/transition';
import { createVNode, computed, defineComponent, ref, TransitionGroup, onMounted, render as vueRender } from 'vue';
import Notice from './Notice';
import ConfigProvider, { globalConfigForApi } from '../config-provider';
var seed = 0;
var now = Date.now();

function getUuid() {
  var id = seed;
  seed += 1;
  return "rcNotification_".concat(now, "_").concat(id);
}

var Notification = defineComponent({
  name: 'Notification',
  inheritAttrs: false,
  props: ['prefixCls', 'transitionName', 'animation', 'maxCount', 'closeIcon'],
  setup: function setup(props, _ref) {
    var attrs = _ref.attrs,
        expose = _ref.expose,
        slots = _ref.slots;
    var hookRefs = new Map();
    var notices = ref([]);
    var transitionProps = computed(function () {
      var prefixCls = props.prefixCls,
          _props$animation = props.animation,
          animation = _props$animation === void 0 ? 'fade' : _props$animation;
      var name = props.transitionName;

      if (!name && animation) {
        name = "".concat(prefixCls, "-").concat(animation);
      }

      return getTransitionGroupProps(name);
    });

    var add = function add(originNotice, holderCallback) {
      var key = originNotice.key || getUuid();

      var notice = _extends(_extends({}, originNotice), {
        key: key
      });

      var maxCount = props.maxCount;
      var noticeIndex = notices.value.map(function (v) {
        return v.notice.key;
      }).indexOf(key);
      var updatedNotices = notices.value.concat();

      if (noticeIndex !== -1) {
        updatedNotices.splice(noticeIndex, 1, {
          notice: notice,
          holderCallback: holderCallback
        });
      } else {
        if (maxCount && notices.value.length >= maxCount) {
          // XXX, use key of first item to update new added (let React to move exsiting
          // instead of remove and mount). Same key was used before for both a) external
          // manual control and b) internal react 'key' prop , which is not that good.
          // eslint-disable-next-line no-param-reassign
          // zombieJ: Not know why use `updateKey`. This makes Notice infinite loop in jest.
          // Change to `updateMark` for compare instead.
          // https://github.com/react-component/notification/commit/32299e6be396f94040bfa82517eea940db947ece
          notice.key = updatedNotices[0].notice.key;
          notice.updateMark = getUuid(); // zombieJ: That's why. User may close by key directly.
          // We need record this but not re-render to avoid upper issue
          // https://github.com/react-component/notification/issues/129

          notice.userPassKey = key;
          updatedNotices.shift();
        }

        updatedNotices.push({
          notice: notice,
          holderCallback: holderCallback
        });
      }

      notices.value = updatedNotices;
    };

    var remove = function remove(removeKey) {
      notices.value = notices.value.filter(function (_ref2) {
        var _ref2$notice = _ref2.notice,
            key = _ref2$notice.key,
            userPassKey = _ref2$notice.userPassKey;
        var mergedKey = userPassKey || key;
        return mergedKey !== removeKey;
      });
    };

    expose({
      add: add,
      remove: remove,
      notices: notices
    });
    return function () {
      var _className;

      var _a;

      var prefixCls = props.prefixCls,
          _props$closeIcon = props.closeIcon,
          closeIcon = _props$closeIcon === void 0 ? (_a = slots.closeIcon) === null || _a === void 0 ? void 0 : _a.call(slots, {
        prefixCls: prefixCls
      }) : _props$closeIcon;
      var noticeNodes = notices.value.map(function (_ref3, index) {
        var notice = _ref3.notice,
            holderCallback = _ref3.holderCallback;
        var updateMark = index === notices.value.length - 1 ? notice.updateMark : undefined;
        var key = notice.key,
            userPassKey = notice.userPassKey;
        var content = notice.content;

        var noticeProps = _extends(_extends(_extends({
          prefixCls: prefixCls,
          closeIcon: typeof closeIcon === 'function' ? closeIcon({
            prefixCls: prefixCls
          }) : closeIcon
        }, notice), notice.props), {
          key: key,
          noticeKey: userPassKey || key,
          updateMark: updateMark,
          onClose: function onClose(noticeKey) {
            var _a;

            remove(noticeKey);
            (_a = notice.onClose) === null || _a === void 0 ? void 0 : _a.call(notice);
          },
          onClick: notice.onClick
        });

        if (holderCallback) {
          return _createVNode("div", {
            "key": key,
            "class": "".concat(prefixCls, "-hook-holder"),
            "ref": function ref(div) {
              if (typeof key === 'undefined') {
                return;
              }

              if (div) {
                hookRefs.set(key, div);
                holderCallback(div, noticeProps);
              } else {
                hookRefs.delete(key);
              }
            }
          }, null);
        }

        return _createVNode(Notice, noticeProps, {
          default: function _default() {
            return [typeof content === 'function' ? content({
              prefixCls: prefixCls
            }) : content];
          }
        });
      });
      var className = (_className = {}, _defineProperty(_className, prefixCls, 1), _defineProperty(_className, attrs.class, !!attrs.class), _className);
      return _createVNode("div", {
        "class": className,
        "style": attrs.style || {
          top: '65px',
          left: '50%'
        }
      }, [_createVNode(TransitionGroup, _objectSpread({
        "tag": "div"
      }, transitionProps.value), {
        default: function _default() {
          return [noticeNodes];
        }
      })]);
    };
  }
});

Notification.newInstance = function newNotificationInstance(properties, callback) {
  var _a = properties || {},
      _a$name = _a.name,
      name = _a$name === void 0 ? 'notification' : _a$name,
      getContainer = _a.getContainer,
      appContext = _a.appContext,
      customizePrefixCls = _a.prefixCls,
      customRootPrefixCls = _a.rootPrefixCls,
      customTransitionName = _a.transitionName,
      hasTransitionName = _a.hasTransitionName,
      props = __rest(_a, ["name", "getContainer", "appContext", "prefixCls", "rootPrefixCls", "transitionName", "hasTransitionName"]);

  var div = document.createElement('div');

  if (getContainer) {
    var root = getContainer();
    root.appendChild(div);
  } else {
    document.body.appendChild(div);
  }

  var Wrapper = defineComponent({
    name: 'NotificationWrapper',
    setup: function setup(_props, _ref4) {
      var attrs = _ref4.attrs;
      var notiRef = ref();
      onMounted(function () {
        callback({
          notice: function notice(noticeProps) {
            var _a;

            (_a = notiRef.value) === null || _a === void 0 ? void 0 : _a.add(noticeProps);
          },
          removeNotice: function removeNotice(key) {
            var _a;

            (_a = notiRef.value) === null || _a === void 0 ? void 0 : _a.remove(key);
          },
          destroy: function destroy() {
            vueRender(null, div);

            if (div.parentNode) {
              div.parentNode.removeChild(div);
            }
          },
          component: notiRef
        });
      });
      return function () {
        var global = globalConfigForApi;
        var prefixCls = global.getPrefixCls(name, customizePrefixCls);
        var rootPrefixCls = global.getRootPrefixCls(customRootPrefixCls, prefixCls);
        var transitionName = hasTransitionName ? customTransitionName : "".concat(rootPrefixCls, "-").concat(customTransitionName);
        return _createVNode(ConfigProvider, _objectSpread(_objectSpread({}, global), {}, {
          "notUpdateGlobalConfig": true,
          "prefixCls": rootPrefixCls
        }), {
          default: function _default() {
            return [_createVNode(Notification, _objectSpread(_objectSpread({
              "ref": notiRef
            }, attrs), {}, {
              "prefixCls": prefixCls,
              "transitionName": transitionName
            }), null)];
          }
        });
      };
    }
  });
  var vm = createVNode(Wrapper, props);
  vm.appContext = appContext || vm.appContext;
  vueRender(vm, div);
};

export default Notification;