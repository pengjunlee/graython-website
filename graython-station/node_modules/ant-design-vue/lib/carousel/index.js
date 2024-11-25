"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.carouselProps = void 0;

var _vue = require("vue");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _vueTypes = _interopRequireDefault(require("../_util/vue-types"));

var _warning = _interopRequireDefault(require("../_util/warning"));

var _classNames3 = _interopRequireDefault(require("../_util/classNames"));

var _vcSlick = _interopRequireDefault(require("../vc-slick"));

var _type = require("../_util/type");

var _useConfigInject2 = _interopRequireDefault(require("../_util/hooks/useConfigInject"));

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

// Carousel
var carouselProps = function carouselProps() {
  return {
    effect: String,
    dots: {
      type: Boolean,
      default: true
    },
    vertical: {
      type: Boolean,
      default: undefined
    },
    autoplay: {
      type: Boolean,
      default: undefined
    },
    easing: String,
    beforeChange: Function,
    afterChange: Function,
    // style: PropTypes.React.CSSProperties,
    prefixCls: String,
    accessibility: {
      type: Boolean,
      default: undefined
    },
    nextArrow: _vueTypes.default.any,
    prevArrow: _vueTypes.default.any,
    pauseOnHover: {
      type: Boolean,
      default: undefined
    },
    // className: String,
    adaptiveHeight: {
      type: Boolean,
      default: undefined
    },
    arrows: {
      type: Boolean,
      default: false
    },
    autoplaySpeed: Number,
    centerMode: {
      type: Boolean,
      default: undefined
    },
    centerPadding: String,
    cssEase: String,
    dotsClass: String,
    draggable: {
      type: Boolean,
      default: false
    },
    fade: {
      type: Boolean,
      default: undefined
    },
    focusOnSelect: {
      type: Boolean,
      default: undefined
    },
    infinite: {
      type: Boolean,
      default: undefined
    },
    initialSlide: Number,
    lazyLoad: String,
    rtl: {
      type: Boolean,
      default: undefined
    },
    slide: String,
    slidesToShow: Number,
    slidesToScroll: Number,
    speed: Number,
    swipe: {
      type: Boolean,
      default: undefined
    },
    swipeToSlide: {
      type: Boolean,
      default: undefined
    },
    swipeEvent: Function,
    touchMove: {
      type: Boolean,
      default: undefined
    },
    touchThreshold: Number,
    variableWidth: {
      type: Boolean,
      default: undefined
    },
    useCSS: {
      type: Boolean,
      default: undefined
    },
    slickGoTo: Number,
    responsive: Array,
    dotPosition: {
      type: String,
      default: undefined
    },
    verticalSwiping: {
      type: Boolean,
      default: false
    }
  };
};

exports.carouselProps = carouselProps;
var Carousel = (0, _vue.defineComponent)({
  name: 'ACarousel',
  inheritAttrs: false,
  props: carouselProps(),
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        attrs = _ref.attrs,
        expose = _ref.expose;
    var slickRef = (0, _vue.ref)();

    var goTo = function goTo(slide) {
      var dontAnimate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var _a;

      (_a = slickRef.value) === null || _a === void 0 ? void 0 : _a.slickGoTo(slide, dontAnimate);
    };

    expose({
      goTo: goTo,
      autoplay: function autoplay(palyType) {
        var _a, _b;

        (_b = (_a = slickRef.value) === null || _a === void 0 ? void 0 : _a.innerSlider) === null || _b === void 0 ? void 0 : _b.handleAutoPlay(palyType);
      },
      prev: function prev() {
        var _a;

        (_a = slickRef.value) === null || _a === void 0 ? void 0 : _a.slickPrev();
      },
      next: function next() {
        var _a;

        (_a = slickRef.value) === null || _a === void 0 ? void 0 : _a.slickNext();
      },
      innerSlider: (0, _vue.computed)(function () {
        var _a;

        return (_a = slickRef.value) === null || _a === void 0 ? void 0 : _a.innerSlider;
      })
    });
    (0, _vue.watchEffect)(function () {
      (0, _warning.default)(props.vertical === undefined, 'Carousel', '`vertical` is deprecated, please use `dotPosition` instead.');
    });

    var _useConfigInject = (0, _useConfigInject2.default)('carousel', props),
        prefixCls = _useConfigInject.prefixCls,
        direction = _useConfigInject.direction;

    var dotPosition = (0, _vue.computed)(function () {
      if (props.dotPosition) return props.dotPosition;
      if (props.vertical !== undefined) return props.vertical ? 'right' : 'bottom';
      return 'bottom';
    });
    var vertical = (0, _vue.computed)(function () {
      return dotPosition.value === 'left' || dotPosition.value === 'right';
    });
    var dsClass = (0, _vue.computed)(function () {
      var _classNames;

      var dotsClass = 'slick-dots';
      return (0, _classNames3.default)((_classNames = {}, (0, _defineProperty2.default)(_classNames, dotsClass, true), (0, _defineProperty2.default)(_classNames, "".concat(dotsClass, "-").concat(dotPosition.value), true), (0, _defineProperty2.default)(_classNames, "".concat(props.dotsClass), !!props.dotsClass), _classNames));
    });
    return function () {
      var _classNames2;

      var dots = props.dots,
          arrows = props.arrows,
          draggable = props.draggable,
          effect = props.effect;

      var cls = attrs.class,
          style = attrs.style,
          restAttrs = __rest(attrs, ["class", "style"]);

      var fade = effect === 'fade' ? true : props.fade;
      var className = (0, _classNames3.default)(prefixCls.value, (_classNames2 = {}, (0, _defineProperty2.default)(_classNames2, "".concat(prefixCls.value, "-rtl"), direction.value === 'rtl'), (0, _defineProperty2.default)(_classNames2, "".concat(prefixCls.value, "-vertical"), vertical.value), (0, _defineProperty2.default)(_classNames2, "".concat(cls), !!cls), _classNames2));
      return (0, _vue.createVNode)("div", {
        "class": className,
        "style": style
      }, [(0, _vue.createVNode)(_vcSlick.default, (0, _objectSpread2.default)((0, _objectSpread2.default)((0, _objectSpread2.default)({
        "ref": slickRef
      }, props), restAttrs), {}, {
        "dots": !!dots,
        "dotsClass": dsClass.value,
        "arrows": arrows,
        "draggable": draggable,
        "fade": fade,
        "vertical": vertical.value
      }), slots)]);
    };
  }
});

var _default = (0, _type.withInstall)(Carousel);

exports.default = _default;