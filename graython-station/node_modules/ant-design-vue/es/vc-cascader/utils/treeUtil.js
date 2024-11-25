import { SHOW_CHILD } from './commonUtil';
export function formatStrategyValues(pathKeys, keyPathEntities, showCheckedStrategy) {
  var valueSet = new Set(pathKeys);
  return pathKeys.filter(function (key) {
    var entity = keyPathEntities[key];
    var parent = entity ? entity.parent : null;
    var children = entity ? entity.children : null;
    return showCheckedStrategy === SHOW_CHILD ? !(children && children.some(function (child) {
      return child.key && valueSet.has(child.key);
    })) : !(parent && !parent.node.disabled && valueSet.has(parent.key));
  });
}
export function toPathOptions(valueCells, options, fieldNames) {
  var stringMode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  var _a;

  var currentList = options;
  var valueOptions = [];

  var _loop = function _loop(i) {
    var valueCell = valueCells[i];
    var foundIndex = currentList === null || currentList === void 0 ? void 0 : currentList.findIndex(function (option) {
      var val = option[fieldNames.value];
      return stringMode ? String(val) === String(valueCell) : val === valueCell;
    });
    var foundOption = foundIndex !== -1 ? currentList === null || currentList === void 0 ? void 0 : currentList[foundIndex] : null;
    valueOptions.push({
      value: (_a = foundOption === null || foundOption === void 0 ? void 0 : foundOption[fieldNames.value]) !== null && _a !== void 0 ? _a : valueCell,
      index: foundIndex,
      option: foundOption
    });
    currentList = foundOption === null || foundOption === void 0 ? void 0 : foundOption[fieldNames.children];
  };

  for (var i = 0; i < valueCells.length; i += 1) {
    _loop(i);
  }

  return valueOptions;
}