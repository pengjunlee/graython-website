import _extends from "@babel/runtime/helpers/esm/extends";
import { provide, defineComponent, reactive, watch } from 'vue';
import warning from '../_util/warning';
import { withInstall } from '../_util/type';
export var ANT_MARK = 'internalMark';
var LocaleProvider = defineComponent({
  name: 'ALocaleProvider',
  props: {
    locale: {
      type: Object
    },
    ANT_MARK__: String
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    warning(props.ANT_MARK__ === ANT_MARK, 'LocaleProvider', '`LocaleProvider` is deprecated. Please use `locale` with `ConfigProvider` instead');
    var state = reactive({
      antLocale: _extends(_extends({}, props.locale), {
        exist: true
      }),
      ANT_MARK__: ANT_MARK
    });
    provide('localeData', state);
    watch(function () {
      return props.locale;
    }, function () {
      state.antLocale = _extends(_extends({}, props.locale), {
        exist: true
      });
    }, {
      immediate: true
    });
    return function () {
      var _a;

      return (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots);
    };
  }
});
/* istanbul ignore next */

LocaleProvider.install = function (app) {
  app.component(LocaleProvider.name, LocaleProvider);
  return app;
};

export default withInstall(LocaleProvider);