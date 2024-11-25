import _extends from "@babel/runtime/helpers/esm/extends";
import { ref, watchEffect } from 'vue';
var DEFAULT_SIZE = {
  width: 0,
  height: 0,
  left: 0,
  top: 0
};
export default function useOffsets(tabs, tabSizes) {
  var offsetMap = ref(new Map());
  watchEffect(function () {
    var _a, _b;

    var map = new Map();
    var tabsValue = tabs.value;
    var lastOffset = tabSizes.value.get((_a = tabsValue[0]) === null || _a === void 0 ? void 0 : _a.key) || DEFAULT_SIZE;
    var rightOffset = lastOffset.left + lastOffset.width;

    for (var i = 0; i < tabsValue.length; i += 1) {
      var key = tabsValue[i].key;
      var data = tabSizes.value.get(key); // Reuse last one when not exist yet

      if (!data) {
        data = tabSizes.value.get((_b = tabsValue[i - 1]) === null || _b === void 0 ? void 0 : _b.key) || DEFAULT_SIZE;
      }

      var entity = map.get(key) || _extends({}, data); // Right


      entity.right = rightOffset - entity.left - entity.width; // Update entity

      map.set(key, entity);
    }

    offsetMap.value = new Map(map);
  });
  return offsetMap;
}