var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};

// src/normalize.ts
function isObject(v) {
  return typeof v === "object" && v !== null;
}
function normalizeOptions(options, globalOptions) {
  options = isObject(options) ? options : /* @__PURE__ */ Object.create(null);
  return new Proxy(options, {
    get(target, key, receiver) {
      return Reflect.get(target, key, receiver) || Reflect.get(globalOptions, key, receiver);
    }
  });
}

// src/pick.ts
function get(state, path) {
  return path.reduce((obj, p) => {
    return obj == null ? void 0 : obj[p];
  }, state);
}
function set(state, path, val) {
  return path.slice(0, -1).reduce((obj, p) => {
    if (!/^(__proto__)$/.test(p))
      return obj[p] = obj[p] || {};
    else
      return {};
  }, state)[path[path.length - 1]] = val, state;
}
function pick(baseState, paths) {
  return paths.reduce((substate, path) => {
    const pathArray = path.split(".");
    return set(substate, pathArray, get(baseState, pathArray));
  }, {});
}

// src/plugin.ts
function createPersistedState(factoryOptions = {}) {
  return function(context) {
    const {
      options: { persist },
      store
    } = context;
    if (!persist)
      return;
    const {
      storage = localStorage,
      beforeRestore = null,
      afterRestore = null,
      serializer = {
        serialize: JSON.stringify,
        deserialize: JSON.parse
      },
      key = store.$id,
      paths = null
    } = normalizeOptions(persist, factoryOptions);
    beforeRestore == null ? void 0 : beforeRestore(context);
    try {
      const fromStorage = storage.getItem(key);
      if (fromStorage)
        store.$patch(serializer.deserialize(fromStorage));
    } catch (_error) {
    }
    afterRestore == null ? void 0 : afterRestore(context);
    store.$subscribe((_mutation, state) => {
      try {
        const toStore = Array.isArray(paths) ? pick(state, paths) : state;
        storage.setItem(key, serializer.serialize(toStore));
      } catch (_error) {
      }
    }, { detached: true });
  };
}
function createNuxtPersistedState(useCookie, factoryOptions) {
  return createPersistedState(__spreadValues({
    storage: {
      getItem: (key) => {
        return useCookie(key, __spreadValues({
          encode: encodeURIComponent,
          decode: decodeURIComponent
        }, factoryOptions == null ? void 0 : factoryOptions.cookieOptions)).value;
      },
      setItem: (key, value) => {
        useCookie(key, __spreadValues({
          encode: encodeURIComponent,
          decode: decodeURIComponent
        }, factoryOptions == null ? void 0 : factoryOptions.cookieOptions)).value = value;
      }
    }
  }, factoryOptions));
}
var persistedState = createPersistedState();
export {
  createNuxtPersistedState,
  createPersistedState,
  persistedState as default
};
