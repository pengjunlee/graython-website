import _extends from "@babel/runtime/helpers/esm/extends";
import { watch, toRaw, computed, shallowRef } from 'vue';
/**
 * This function will try to call requestIdleCallback if available to save performance.
 * No need `getLabel` here since already fetch on `rawLabeledValue`.
 */

export default (function (values) {
  var cacheRef = shallowRef({
    valueLabels: new Map()
  });
  var mergedValues = shallowRef();
  watch(values, function () {
    mergedValues.value = toRaw(values.value);
  }, {
    immediate: true
  });
  var newFilledValues = computed(function () {
    var valueLabels = cacheRef.value.valueLabels;
    var valueLabelsCache = new Map();
    var filledValues = mergedValues.value.map(function (item) {
      var _a;

      var value = item.value;
      var mergedLabel = (_a = item.label) !== null && _a !== void 0 ? _a : valueLabels.get(value); // Save in cache

      valueLabelsCache.set(value, mergedLabel);
      return _extends(_extends({}, item), {
        label: mergedLabel
      });
    });
    cacheRef.value.valueLabels = valueLabelsCache;
    return filledValues;
  });
  return [newFilledValues];
});