"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _vue = require("vue");

var _raf = _interopRequireDefault(require("../../_util/raf"));

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var StatusQueue = ['measure', 'align', null, 'motion'];

var _default = function _default(visible, doMeasure) {
  var status = (0, _vue.ref)(null);
  var rafRef = (0, _vue.ref)();
  var destroyRef = (0, _vue.ref)(false);

  function setStatus(nextStatus) {
    if (!destroyRef.value) {
      status.value = nextStatus;
    }
  }

  function cancelRaf() {
    _raf.default.cancel(rafRef.value);
  }

  function goNextStatus(callback) {
    cancelRaf();
    rafRef.value = (0, _raf.default)(function () {
      // Only align should be manually trigger
      var newStatus = status.value;

      switch (status.value) {
        case 'align':
          newStatus = 'motion';
          break;

        case 'motion':
          newStatus = 'stable';
          break;

        default:
      }

      setStatus(newStatus);
      callback === null || callback === void 0 ? void 0 : callback();
    });
  }

  (0, _vue.watch)(visible, function () {
    setStatus('measure');
  }, {
    immediate: true,
    flush: 'post'
  });
  (0, _vue.onMounted)(function () {
    // Go next status
    (0, _vue.watch)(status, function () {
      switch (status.value) {
        case 'measure':
          doMeasure();
          break;

        default:
      }

      if (status.value) {
        rafRef.value = (0, _raf.default)(function () {
          return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_regenerator.default.mark(function _callee() {
            var index, nextStatus;
            return _regenerator.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    index = StatusQueue.indexOf(status.value);
                    nextStatus = StatusQueue[index + 1];

                    if (nextStatus && index !== -1) {
                      setStatus(nextStatus);
                    }

                  case 3:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));
        });
      }
    }, {
      immediate: true,
      flush: 'post'
    });
  });
  (0, _vue.onBeforeUnmount)(function () {
    destroyRef.value = true;
    cancelRaf();
  });
  return [status, goNextStatus];
};

exports.default = _default;