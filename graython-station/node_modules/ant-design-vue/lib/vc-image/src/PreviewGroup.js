"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.context = void 0;

var _vue = require("vue");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _Image = require("./Image");

var _Preview = _interopRequireDefault(require("./Preview"));

var _useMergedState3 = _interopRequireDefault(require("../../_util/hooks/useMergedState"));

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

var previewGroupContext = Symbol('previewGroupContext');
var context = {
  provide: function provide(val) {
    (0, _vue.provide)(previewGroupContext, val);
  },
  inject: function inject() {
    return (0, _vue.inject)(previewGroupContext, {
      isPreviewGroup: (0, _vue.ref)(false),
      previewUrls: (0, _vue.computed)(function () {
        return new Map();
      }),
      setPreviewUrls: function setPreviewUrls() {},
      current: (0, _vue.ref)(null),
      setCurrent: function setCurrent() {},
      setShowPreview: function setShowPreview() {},
      setMousePosition: function setMousePosition() {},
      registerImage: null,
      rootClassName: ''
    });
  }
};
exports.context = context;
var Group = (0, _vue.defineComponent)({
  name: 'PreviewGroup',
  inheritAttrs: false,
  props: {
    previewPrefixCls: String,
    preview: {
      type: [Boolean, Object],
      default: true
    },
    icons: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var preview = (0, _vue.computed)(function () {
      var defaultValues = {
        visible: undefined,
        onVisibleChange: function onVisibleChange() {},
        getContainer: undefined,
        current: 0
      };
      return (0, _typeof2.default)(props.preview) === 'object' ? (0, _Image.mergeDefaultValue)(props.preview, defaultValues) : defaultValues;
    });
    var previewUrls = (0, _vue.reactive)(new Map());
    var current = (0, _vue.ref)();
    var previewVisible = (0, _vue.computed)(function () {
      return preview.value.visible;
    });
    var getPreviewContainer = (0, _vue.computed)(function () {
      return preview.value.getContainer;
    });

    var onPreviewVisibleChange = function onPreviewVisibleChange(val, preval) {
      var _a, _b;

      (_b = (_a = preview.value).onVisibleChange) === null || _b === void 0 ? void 0 : _b.call(_a, val, preval);
    };

    var _useMergedState = (0, _useMergedState3.default)(!!previewVisible.value, {
      value: previewVisible,
      onChange: onPreviewVisibleChange
    }),
        _useMergedState2 = (0, _slicedToArray2.default)(_useMergedState, 2),
        isShowPreview = _useMergedState2[0],
        setShowPreview = _useMergedState2[1];

    var mousePosition = (0, _vue.ref)(null);
    var isControlled = (0, _vue.computed)(function () {
      return previewVisible.value !== undefined;
    });
    var previewUrlsKeys = (0, _vue.computed)(function () {
      return Array.from(previewUrls.keys());
    });
    var currentControlledKey = (0, _vue.computed)(function () {
      return previewUrlsKeys.value[preview.value.current];
    });
    var canPreviewUrls = (0, _vue.computed)(function () {
      return new Map(Array.from(previewUrls).filter(function (_ref2) {
        var _ref3 = (0, _slicedToArray2.default)(_ref2, 2),
            canPreview = _ref3[1].canPreview;

        return !!canPreview;
      }).map(function (_ref4) {
        var _ref5 = (0, _slicedToArray2.default)(_ref4, 2),
            id = _ref5[0],
            url = _ref5[1].url;

        return [id, url];
      }));
    });

    var setPreviewUrls = function setPreviewUrls(id, url) {
      var canPreview = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      previewUrls.set(id, {
        url: url,
        canPreview: canPreview
      });
    };

    var setCurrent = function setCurrent(val) {
      current.value = val;
    };

    var setMousePosition = function setMousePosition(val) {
      mousePosition.value = val;
    };

    var registerImage = function registerImage(id, url) {
      var canPreview = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      var unRegister = function unRegister() {
        previewUrls.delete(id);
      };

      previewUrls.set(id, {
        url: url,
        canPreview: canPreview
      });
      return unRegister;
    };

    var onPreviewClose = function onPreviewClose(e) {
      e === null || e === void 0 ? void 0 : e.stopPropagation();
      setShowPreview(false);
      setMousePosition(null);
    };

    (0, _vue.watch)(currentControlledKey, function (val) {
      setCurrent(val);
    }, {
      immediate: true,
      flush: 'post'
    });
    (0, _vue.watchEffect)(function () {
      if (!isShowPreview.value && isControlled.value) {
        setCurrent(currentControlledKey.value);
      }
    }, {
      flush: 'post'
    });
    context.provide({
      isPreviewGroup: (0, _vue.ref)(true),
      previewUrls: canPreviewUrls,
      setPreviewUrls: setPreviewUrls,
      current: current,
      setCurrent: setCurrent,
      setShowPreview: setShowPreview,
      setMousePosition: setMousePosition,
      registerImage: registerImage
    });
    return function () {
      var dialogProps = __rest(preview.value, []);

      return (0, _vue.createVNode)(_vue.Fragment, null, [slots.default && slots.default(), (0, _vue.createVNode)(_Preview.default, (0, _objectSpread2.default)((0, _objectSpread2.default)({}, dialogProps), {}, {
        "ria-hidden": !isShowPreview.value,
        "visible": isShowPreview.value,
        "prefixCls": props.previewPrefixCls,
        "onClose": onPreviewClose,
        "mousePosition": mousePosition.value,
        "src": canPreviewUrls.value.get(current.value),
        "icons": props.icons,
        "getContainer": getPreviewContainer.value
      }), null)]);
    };
  }
});
var _default2 = Group;
exports.default = _default2;