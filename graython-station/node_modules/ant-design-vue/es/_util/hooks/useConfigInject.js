import { computed, inject } from 'vue';
import { defaultConfigProvider } from '../../config-provider';
export default (function (name, props) {
  var configProvider = inject('configProvider', defaultConfigProvider);
  var prefixCls = computed(function () {
    return configProvider.getPrefixCls(name, props.prefixCls);
  });
  var direction = computed(function () {
    var _a;

    return (_a = props.direction) !== null && _a !== void 0 ? _a : configProvider.direction;
  });
  var rootPrefixCls = computed(function () {
    return configProvider.getPrefixCls();
  });
  var autoInsertSpaceInButton = computed(function () {
    return configProvider.autoInsertSpaceInButton;
  });
  var renderEmpty = computed(function () {
    return configProvider.renderEmpty;
  });
  var space = computed(function () {
    return configProvider.space;
  });
  var pageHeader = computed(function () {
    return configProvider.pageHeader;
  });
  var form = computed(function () {
    return configProvider.form;
  });
  var getTargetContainer = computed(function () {
    return props.getTargetContainer || configProvider.getTargetContainer;
  });
  var getPopupContainer = computed(function () {
    return props.getPopupContainer || configProvider.getPopupContainer;
  });
  var dropdownMatchSelectWidth = computed(function () {
    var _a;

    return (_a = props.dropdownMatchSelectWidth) !== null && _a !== void 0 ? _a : configProvider.dropdownMatchSelectWidth;
  });
  var virtual = computed(function () {
    return (props.virtual === undefined ? configProvider.virtual !== false : props.virtual !== false) && dropdownMatchSelectWidth.value !== false;
  });
  var size = computed(function () {
    return props.size || configProvider.componentSize;
  });
  var autocomplete = computed(function () {
    var _a;

    return props.autocomplete || ((_a = configProvider.input) === null || _a === void 0 ? void 0 : _a.autocomplete);
  });
  var csp = computed(function () {
    return configProvider.csp;
  });
  return {
    configProvider: configProvider,
    prefixCls: prefixCls,
    direction: direction,
    size: size,
    getTargetContainer: getTargetContainer,
    getPopupContainer: getPopupContainer,
    space: space,
    pageHeader: pageHeader,
    form: form,
    autoInsertSpaceInButton: autoInsertSpaceInButton,
    renderEmpty: renderEmpty,
    virtual: virtual,
    dropdownMatchSelectWidth: dropdownMatchSelectWidth,
    rootPrefixCls: rootPrefixCls,
    getPrefixCls: configProvider.getPrefixCls,
    autocomplete: autocomplete,
    csp: csp
  };
});