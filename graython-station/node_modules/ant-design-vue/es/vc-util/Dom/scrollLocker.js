import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import getScrollBarSize from '../../_util/getScrollBarSize';
import setStyle from '../../_util/setStyle';
var locks = [];
var scrollingEffectClassName = 'ant-scrolling-effect';
var scrollingEffectClassNameReg = new RegExp("".concat(scrollingEffectClassName), 'g');
var uuid = 0; // https://github.com/ant-design/ant-design/issues/19340
// https://github.com/ant-design/ant-design/issues/19332

var cacheStyle = new Map();

var ScrollLocker = /*#__PURE__*/_createClass(function ScrollLocker(options) {
  var _this = this;

  _classCallCheck(this, ScrollLocker);

  this.getContainer = function () {
    var _a;

    return (_a = _this.options) === null || _a === void 0 ? void 0 : _a.container;
  }; // if options change...


  this.reLock = function (options) {
    var findLock = locks.find(function (_ref) {
      var target = _ref.target;
      return target === _this.lockTarget;
    });

    if (findLock) {
      _this.unLock();
    }

    _this.options = options;

    if (findLock) {
      findLock.options = options;

      _this.lock();
    }
  };

  this.lock = function () {
    var _a; // If lockTarget exist return


    if (locks.some(function (_ref2) {
      var target = _ref2.target;
      return target === _this.lockTarget;
    })) {
      return;
    } // If same container effect, return


    if (locks.some(function (_ref3) {
      var options = _ref3.options;

      var _a;

      return (options === null || options === void 0 ? void 0 : options.container) === ((_a = _this.options) === null || _a === void 0 ? void 0 : _a.container);
    })) {
      locks = [].concat(_toConsumableArray(locks), [{
        target: _this.lockTarget,
        options: _this.options
      }]);
      return;
    }

    var scrollBarSize = 0;
    var container = ((_a = _this.options) === null || _a === void 0 ? void 0 : _a.container) || document.body;

    if (container === document.body && window.innerWidth - document.documentElement.clientWidth > 0 || container.scrollHeight > container.clientHeight) {
      scrollBarSize = getScrollBarSize();
    }

    var containerClassName = container.className;

    if (locks.filter(function (_ref4) {
      var options = _ref4.options;

      var _a;

      return (options === null || options === void 0 ? void 0 : options.container) === ((_a = _this.options) === null || _a === void 0 ? void 0 : _a.container);
    }).length === 0) {
      cacheStyle.set(container, setStyle({
        width: scrollBarSize !== 0 ? "calc(100% - ".concat(scrollBarSize, "px)") : undefined,
        overflow: 'hidden',
        overflowX: 'hidden',
        overflowY: 'hidden'
      }, {
        element: container
      }));
    } // https://github.com/ant-design/ant-design/issues/19729


    if (!scrollingEffectClassNameReg.test(containerClassName)) {
      var addClassName = "".concat(containerClassName, " ").concat(scrollingEffectClassName);
      container.className = addClassName.trim();
    }

    locks = [].concat(_toConsumableArray(locks), [{
      target: _this.lockTarget,
      options: _this.options
    }]);
  };

  this.unLock = function () {
    var _a;

    var findLock = locks.find(function (_ref5) {
      var target = _ref5.target;
      return target === _this.lockTarget;
    });
    locks = locks.filter(function (_ref6) {
      var target = _ref6.target;
      return target !== _this.lockTarget;
    });

    if (!findLock || locks.some(function (_ref7) {
      var options = _ref7.options;

      var _a;

      return (options === null || options === void 0 ? void 0 : options.container) === ((_a = findLock.options) === null || _a === void 0 ? void 0 : _a.container);
    })) {
      return;
    } // Remove Effect


    var container = ((_a = _this.options) === null || _a === void 0 ? void 0 : _a.container) || document.body;
    var containerClassName = container.className;
    if (!scrollingEffectClassNameReg.test(containerClassName)) return;
    setStyle(cacheStyle.get(container), {
      element: container
    });
    cacheStyle.delete(container);
    container.className = container.className.replace(scrollingEffectClassNameReg, '').trim();
  }; // eslint-disable-next-line no-plusplus


  this.lockTarget = uuid++;
  this.options = options;
});

export { ScrollLocker as default };