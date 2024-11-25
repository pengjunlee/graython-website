import _extends from "@babel/runtime/helpers/esm/extends";
import { shallowRef, computed } from 'vue';
/**
 * Cache `value` related LabeledValue & options.
 */

export default (function (labeledValues, valueOptions) {
  var cacheRef = shallowRef({
    values: new Map(),
    options: new Map()
  });
  var filledLabeledValues = computed(function () {
    var _cacheRef$value = cacheRef.value,
        prevValueCache = _cacheRef$value.values,
        prevOptionCache = _cacheRef$value.options; // Fill label by cache

    var patchedValues = labeledValues.value.map(function (item) {
      var _a;

      if (item.label === undefined) {
        return _extends(_extends({}, item), {
          label: (_a = prevValueCache.get(item.value)) === null || _a === void 0 ? void 0 : _a.label
        });
      }

      return item;
    }); // Refresh cache

    var valueCache = new Map();
    var optionCache = new Map();
    patchedValues.forEach(function (item) {
      valueCache.set(item.value, item);
      optionCache.set(item.value, valueOptions.value.get(item.value) || prevOptionCache.get(item.value));
    });
    cacheRef.value.values = valueCache;
    cacheRef.value.options = optionCache;
    return patchedValues;
  });

  var getOption = function getOption(val) {
    return valueOptions.value.get(val) || cacheRef.value.options.get(val);
  };

  return [filledLabeledValues, getOption];
});