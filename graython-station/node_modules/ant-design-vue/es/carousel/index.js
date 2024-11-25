import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { createVNode as _createVNode, resolveDirective as _resolveDirective } from "vue";

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

import { ref, computed, watchEffect, defineComponent } from 'vue';
import PropTypes from '../_util/vue-types';
import warning from '../_util/warning';
import classNames from '../_util/classNames';
import SlickCarousel from '../vc-slick';
import { withInstall } from '../_util/type';
import useConfigInject from '../_util/hooks/useConfigInject'; // Carousel

export var carouselProps = function carouselProps() {
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
    nextArrow: PropTypes.any,
    prevArrow: PropTypes.any,
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
var Carousel = defineComponent({
  name: 'ACarousel',
  inheritAttrs: false,
  props: carouselProps(),
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        attrs = _ref.attrs,
        expose = _ref.expose;
    var slickRef = ref();

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
      innerSlider: computed(function () {
        var _a;

        return (_a = slickRef.value) === null || _a === void 0 ? void 0 : _a.innerSlider;
      })
    });
    watchEffect(function () {
      warning(props.vertical === undefined, 'Carousel', '`vertical` is deprecated, please use `dotPosition` instead.');
    });

    var _useConfigInject = useConfigInject('carousel', props),
        prefixCls = _useConfigInject.prefixCls,
        direction = _useConfigInject.direction;

    var dotPosition = computed(function () {
      if (props.dotPosition) return props.dotPosition;
      if (props.vertical !== undefined) return props.vertical ? 'right' : 'bottom';
      return 'bottom';
    });
    var vertical = computed(function () {
      return dotPosition.value === 'left' || dotPosition.value === 'right';
    });
    var dsClass = computed(function () {
      var _classNames;

      var dotsClass = 'slick-dots';
      return classNames((_classNames = {}, _defineProperty(_classNames, dotsClass, true), _defineProperty(_classNames, "".concat(dotsClass, "-").concat(dotPosition.value), true), _defineProperty(_classNames, "".concat(props.dotsClass), !!props.dotsClass), _classNames));
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
      var className = classNames(prefixCls.value, (_classNames2 = {}, _defineProperty(_classNames2, "".concat(prefixCls.value, "-rtl"), direction.value === 'rtl'), _defineProperty(_classNames2, "".concat(prefixCls.value, "-vertical"), vertical.value), _defineProperty(_classNames2, "".concat(cls), !!cls), _classNames2));
      return _createVNode("div", {
        "class": className,
        "style": style
      }, [_createVNode(SlickCarousel, _objectSpread(_objectSpread(_objectSpread({
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
export default withInstall(Carousel);