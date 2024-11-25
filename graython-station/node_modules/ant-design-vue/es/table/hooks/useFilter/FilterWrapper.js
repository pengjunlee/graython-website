import { createVNode as _createVNode } from "vue";

var FilterDropdownMenuWrapper = function FilterDropdownMenuWrapper(_props, _ref) {
  var slots = _ref.slots;

  var _a;

  return _createVNode("div", {
    "onClick": function onClick(e) {
      return e.stopPropagation();
    }
  }, [(_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)]);
};

export default FilterDropdownMenuWrapper;